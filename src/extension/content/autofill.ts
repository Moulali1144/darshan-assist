/**
 * Darshan Assist – Express Tatkal Smart Autofill Content Script
 *
 * Provides ultra-fast form filling, multi-pilgrim batch filling,
 * keyboard shortcut triggers (Alt+A), slot pre-highlighting,
 * and automatic cursor focus onto the CAPTCHA input field.
 */

import type { PilgrimProfile } from '../../shared/types';

interface FieldMapping {
  keys: string[];
  profileField: keyof PilgrimProfile;
  transform?: (val: string) => string;
}

const FIELD_MAPPINGS: FieldMapping[] = [
  { keys: ['name', 'full name', 'pilgrim name', 'applicant name', 'devotee name', 'passenger name'], profileField: 'name' },
  { keys: ['dob', 'date of birth', 'birth date', 'birthdate', 'age'], profileField: 'dateOfBirth' },
  { keys: ['gender', 'sex'], profileField: 'gender' },
  { keys: ['mobile', 'phone', 'cell', 'contact number', 'mobile no'], profileField: 'mobile' },
  { keys: ['email', 'e-mail', 'mail id', 'email address'], profileField: 'email' },
  { keys: ['address', 'street', 'residence', 'door no', 'flat'], profileField: 'address' },
  { keys: ['city', 'town', 'district'], profileField: 'city' },
  { keys: ['state', 'province'], profileField: 'state' },
  { keys: ['pincode', 'pin code', 'zip', 'postal code', 'zipcode'], profileField: 'pincode' },
  { keys: ['id number', 'id no', 'aadhar', 'aadhaar', 'pan', 'passport number', 'id proof number'], profileField: 'idNumber' },
  { keys: ['id type', 'id proof type', 'select id', 'identity card'], profileField: 'idType' },
];

let currentPilgrimsList: PilgrimProfile[] = [];
let injectedButton: HTMLElement | null = null;

// ─── Field Detection ──────────────────────────────────────────────────────────

function getFieldHints(el: HTMLInputElement | HTMLSelectElement): string {
  const hints: string[] = [];
  if (el.name) hints.push(el.name.toLowerCase());
  if (el.id) hints.push(el.id.toLowerCase());
  const placeholder = (el as HTMLInputElement).placeholder;
  if (placeholder) hints.push(placeholder.toLowerCase());
  if (el.getAttribute('aria-label')) hints.push(el.getAttribute('aria-label')!.toLowerCase());

  const label = el.id
    ? document.querySelector<HTMLLabelElement>(`label[for="${el.id}"]`)
    : el.closest('label') ?? el.parentElement?.querySelector('label');
  if (label) hints.push(label.textContent?.toLowerCase().trim() ?? '');

  // Check parent cell or container header text
  const tableCell = el.closest('td, th, .form-group');
  if (tableCell) hints.push(tableCell.textContent?.toLowerCase().trim() ?? '');

  return hints.join(' ');
}

function detectMapping(el: HTMLInputElement | HTMLSelectElement): FieldMapping | null {
  const hints = getFieldHints(el);
  for (const mapping of FIELD_MAPPINGS) {
    if (mapping.keys.some((k) => hints.includes(k))) {
      return mapping;
    }
  }
  return null;
}

// ─── Express Autofill Logic ───────────────────────────────────────────────────

function autofillSingleProfile(container: HTMLElement | Document, pilgrim: PilgrimProfile): number {
  let filledCount = 0;
  const inputs = container.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), select',
  );

  inputs.forEach((el) => {
    // Skip captcha inputs
    if (isCaptchaField(el)) return;

    const mapping = detectMapping(el);
    if (!mapping) return;

    const rawValue = pilgrim[mapping.profileField];
    if (rawValue === undefined || rawValue === null) return;

    const value = mapping.transform ? mapping.transform(String(rawValue)) : String(rawValue);

    if (el.tagName === 'SELECT') {
      const select = el as HTMLSelectElement;
      const opt = Array.from(select.options).find(
        (o) =>
          o.value.toLowerCase().includes(value.toLowerCase()) ||
          o.text.toLowerCase().includes(value.toLowerCase()),
      );
      if (opt) {
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        highlightField(el);
        filledCount++;
      }
    } else {
      const input = el as HTMLInputElement;
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (nativeSetter) {
        nativeSetter.call(input, value);
      } else {
        input.value = value;
      }
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      highlightField(input);
      filledCount++;
    }
  });

  return filledCount;
}

/**
 * Express Batch Fill: Fills multiple pilgrim rows across tables/lists at once.
 */
function autofillAllPilgrims(pilgrims: PilgrimProfile[]): number {
  if (!pilgrims.length) return 0;

  let totalFilled = 0;
  // Look for multi-row passenger tables or repeated form containers
  const rows = document.querySelectorAll('tr:has(input), .passenger-row, .devotee-row, .pilgrim-card');

  if (rows.length > 0 && pilgrims.length > 1) {
    rows.forEach((row, index) => {
      if (index < pilgrims.length) {
        const filled = autofillSingleProfile(row as HTMLElement, pilgrims[index]);
        totalFilled += filled;
      }
    });
  } else {
    // Fallback: fill single main form with first pilgrim
    totalFilled = autofillSingleProfile(document, pilgrims[0]);
  }

  // After autofilling, automatically focus on CAPTCHA input
  focusCaptchaBox();

  return totalFilled;
}

function isCaptchaField(el: HTMLInputElement | HTMLSelectElement): boolean {
  const hints = getFieldHints(el).toLowerCase();
  return (
    hints.includes('captcha') ||
    hints.includes('security code') ||
    hints.includes('verif') ||
    el.id.toLowerCase().includes('captcha') ||
    el.name.toLowerCase().includes('captcha')
  );
}

function focusCaptchaBox(): void {
  setTimeout(() => {
    const captchaInputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="text"]')).filter(isCaptchaField);
    if (captchaInputs.length > 0) {
      const captchaInput = captchaInputs[0];
      captchaInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      captchaInput.focus();
      captchaInput.style.outline = '3px solid #22C55E';
      captchaInput.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.6)';
      showToast('⚡ Form Filled! Cursor is inside CAPTCHA box. Type & hit Enter!', 'success');
    }
  }, 300);
}

function highlightField(el: HTMLElement): void {
  const originalBorder = el.style.border;
  el.style.border = '2px solid #C8860A';
  el.style.background = 'rgba(200, 134, 10, 0.08)';
  setTimeout(() => {
    el.style.border = originalBorder;
    el.style.background = '';
  }, 2500);
}

// ─── Floating Tatkal Bar ──────────────────────────────────────────────────────

function createAutofillButton(): HTMLElement {
  const btn = document.createElement('div');
  btn.id = 'da-autofill-btn';
  btn.innerHTML = `
    <div style="
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: linear-gradient(135deg, #1A0800 0%, #3D1C00 100%);
      border: 1.5px solid #C8860A;
      color: white;
      border-radius: 50px;
      padding: 10px 18px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 15px rgba(200,134,10,0.4);
      display: flex;
      align-items: center;
      gap: 10px;
      transition: transform 0.2s, box-shadow 0.2s;
      user-select: none;
    " id="da-autofill-inner">
      <span style="font-size:18px">🙏</span>
      <div style="display:flex;flex-direction:column">
        <span style="color:#F59E0B;font-weight:700;font-size:13px">Tatkal Express Fill</span>
        <span style="font-size:10px;color:#AAA">Press Alt + A</span>
      </div>
      <span style="
        background: linear-gradient(135deg, #C8860A, #F59E0B);
        color: white;
        border-radius: 12px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 700;
      ">⚡ FILL ALL</span>
    </div>
  `;

  const inner = btn.querySelector<HTMLElement>('#da-autofill-inner')!;
  inner.addEventListener('mouseenter', () => {
    inner.style.transform = 'translateY(-2px) scale(1.02)';
    inner.style.boxShadow = '0 12px 35px rgba(200,134,10,0.6)';
  });
  inner.addEventListener('mouseleave', () => {
    inner.style.transform = '';
    inner.style.boxShadow = '0 8px 30px rgba(0,0,0,0.5), 0 0 15px rgba(200,134,10,0.4)';
  });
  inner.addEventListener('click', handleExpressAutofill);

  return btn;
}

async function handleExpressAutofill(): Promise<void> {
  chrome.runtime.sendMessage({ type: 'GET_PILGRIMS' }, async (response) => {
    const pilgrims: PilgrimProfile[] = response?.pilgrims || [];
    if (!pilgrims.length) {
      showToast('⚠️ No family profiles saved. Open Darshan Assist to add pilgrims!', 'warning');
      return;
    }

    currentPilgrimsList = pilgrims;
    const count = autofillAllPilgrims(pilgrims);
    if (count > 0) {
      showToast(`⚡ Filled ${count} fields for ${pilgrims.length} pilgrims!`, 'success');
    } else {
      showPilgrimSelector(pilgrims);
    }
  });
}

function showPilgrimSelector(pilgrims: PilgrimProfile[]): void {
  const existing = document.getElementById('da-pilgrim-selector');
  if (existing) existing.remove();

  const selector = document.createElement('div');
  selector.id = 'da-pilgrim-selector';
  selector.innerHTML = `
    <div style="
      position: fixed;
      bottom: 90px;
      right: 24px;
      z-index: 999999;
      background: #1E1E1E;
      border: 1px solid rgba(200,134,10,0.3);
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.6);
      padding: 16px;
      min-width: 280px;
      color: white;
      font-family: 'Inter', sans-serif;
    ">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div style="font-weight:700;font-size:13px;color:#F59E0B;">
          🙏 Select Pilgrim
        </div>
        <button id="da-fill-all-btn" style="
          background:linear-gradient(135deg,#C8860A,#F59E0B);
          border:none;color:white;border-radius:8px;padding:4px 8px;
          font-size:11px;font-weight:700;cursor:pointer;
        ">⚡ Fill All (${pilgrims.length})</button>
      </div>
      ${pilgrims
        .map(
          (p) => `
        <div class="da-pilgrim-opt" data-id="${p.id}" style="
          padding:10px 12px;
          border-radius:10px;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:6px;
          transition:background 0.15s;
          border:1px solid rgba(255,255,255,0.08);
          background:rgba(255,255,255,0.03);
        ">
          <div style="
            width:32px;height:32px;border-radius:50%;
            background:linear-gradient(135deg,#C8860A,#F59E0B);
            display:flex;align-items:center;justify-content:center;
            color:white;font-weight:700;font-size:13px;
          ">${p.name.charAt(0).toUpperCase()}</div>
          <div>
            <div style="font-weight:600;font-size:13px;color:#F5F5F0">${p.name}</div>
            <div style="font-size:11px;color:#888">${p.relationship}</div>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;

  document.body.appendChild(selector);

  // Bind Fill All
  selector.querySelector('#da-fill-all-btn')?.addEventListener('click', () => {
    autofillAllPilgrims(pilgrims);
    selector.remove();
  });

  // Bind individual click
  selector.querySelectorAll('.da-pilgrim-opt').forEach((opt) => {
    const el = opt as HTMLElement;
    el.addEventListener('mouseenter', () => {
      el.style.background = 'rgba(200,134,10,0.15)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.background = 'rgba(255,255,255,0.03)';
    });
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      const p = pilgrims.find((x) => x.id === id);
      if (p) {
        const count = autofillSingleProfile(document, p);
        focusCaptchaBox();
        showToast(`✅ Filled ${count} fields for ${p.name}`, 'success');
      }
      selector.remove();
    });
  });

  setTimeout(() => selector?.remove(), 15000);
}

function showToast(message: string, type: 'success' | 'warning' | 'error'): void {
  const existing = document.getElementById('da-toast');
  if (existing) existing.remove();

  const colors = {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  };

  const toast = document.createElement('div');
  toast.id = 'da-toast';
  toast.style.cssText = `
    position:fixed;top:24px;right:24px;z-index:9999999;
    background:${colors[type]};color:white;
    border-radius:12px;padding:12px 20px;
    font-family:'Inter',sans-serif;font-size:13px;font-weight:700;
    box-shadow:0 8px 30px rgba(0,0,0,0.3);
    animation:slideIn 0.3s ease-out;
    max-width:400px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

// ─── Keyboard Shortcut Trigger (Alt + A) ──────────────────────────────────────

window.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.altKey && (e.key === 'a' || e.key === 'A')) {
    e.preventDefault();
    handleExpressAutofill();
  }
});

// ─── Init & DOM Watcher ───────────────────────────────────────────────────────

function init(): void {
  const forms = document.querySelectorAll('form, input:not([type="hidden"])');
  if (forms.length > 0 && !document.getElementById('da-autofill-btn')) {
    injectedButton = createAutofillButton();
    document.body.appendChild(injectedButton);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const observer = new MutationObserver(() => {
  if (!document.getElementById('da-autofill-btn')) {
    const forms = document.querySelectorAll('form, input:not([type="hidden"])');
    if (forms.length > 0) {
      injectedButton = createAutofillButton();
      document.body.appendChild(injectedButton);
    }
  }
});
observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'AUTOFILL_PILGRIM' && message.payload) {
    const count = autofillSingleProfile(document, message.payload as PilgrimProfile);
    focusCaptchaBox();
    sendResponse({ filledCount: count });
  }
  return true;
});
