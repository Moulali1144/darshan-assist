/**
 * Darshan Assist – Availability Detector Content Script
 *
 * Passively monitors TTD booking pages for ticket availability signals.
 * When availability is detected, notifies the background service worker
 * so it can fire a desktop notification.
 * Does NOT automate any booking actions.
 */

const AVAILABILITY_KEYWORDS = [
  'tickets available',
  'book now',
  'select date',
  'darshan available',
  'slots available',
  'available dates',
];

const SOLD_OUT_KEYWORDS = [
  'sold out',
  'not available',
  'no slots',
  'housefull',
  'tickets exhausted',
  'fully booked',
];

let lastStatus: 'available' | 'sold_out' | 'unknown' = 'unknown';
let statusBadge: HTMLElement | null = null;

// ─── Detection ────────────────────────────────────────────────────────────────

function detectAvailability(): 'available' | 'sold_out' | 'unknown' {
  const pageText = document.body.innerText.toLowerCase();
  const pageHTML = document.body.innerHTML.toLowerCase();

  // Check for availability keywords
  const hasAvailability = AVAILABILITY_KEYWORDS.some(
    (kw) => pageText.includes(kw) || pageHTML.includes(kw),
  );

  // Check for sold-out keywords
  const isSoldOut = SOLD_OUT_KEYWORDS.some(
    (kw) => pageText.includes(kw) || pageHTML.includes(kw),
  );

  // Check for enabled booking buttons (strong signal of availability)
  const bookingButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement | HTMLInputElement>(
      'button, input[type="submit"], input[type="button"]',
    ),
  ).filter((btn) => {
    const text = (btn.textContent || btn.value || '').toLowerCase();
    return (
      text.includes('book') ||
      text.includes('proceed') ||
      text.includes('continue')
    ) && !btn.disabled;
  });

  if (bookingButtons.length > 0 && hasAvailability) return 'available';
  if (isSoldOut) return 'sold_out';
  if (hasAvailability) return 'available';
  return 'unknown';
}

function getPageTicketType(): string {
  const url = window.location.href.toLowerCase();
  if (url.includes('darshan'))     return '₹300 Special Darshan';
  if (url.includes('accommodation')) return 'Accommodation';
  if (url.includes('seva'))        return 'Seva Booking';
  if (url.includes('srivanitrust')) return 'Srivani Trust';
  return 'Darshan Tickets';
}

// ─── Badge Injection ──────────────────────────────────────────────────────────

function createStatusBadge(status: 'available' | 'sold_out' | 'unknown'): HTMLElement {
  const badge = document.createElement('div');
  badge.id    = 'da-status-badge';

  const config = {
    available: { color: '#22C55E', icon: '✅', label: 'Tickets Available' },
    sold_out:  { color: '#EF4444', icon: '❌', label: 'Sold Out'          },
    unknown:   { color: '#6B7280', icon: '⏳', label: 'Monitoring...'     },
  };

  const { color, icon, label } = config[status];

  badge.innerHTML = `
    <div style="
      position:fixed;top:80px;right:16px;z-index:999999;
      background:white;border:2px solid ${color};
      border-radius:12px;padding:10px 16px;
      font-family:'Inter',sans-serif;font-size:13px;font-weight:600;
      box-shadow:0 4px 20px rgba(0,0,0,0.15);
      display:flex;align-items:center;gap:8px;
      animation:fadeIn 0.3s ease-out;
    ">
      <span>${icon}</span>
      <div>
        <div style="color:${color};font-size:12px;font-weight:700">${label}</div>
        <div style="color:#888;font-size:11px">Darshan Assist</div>
      </div>
    </div>
  `;
  return badge;
}

function updateBadge(status: 'available' | 'sold_out' | 'unknown'): void {
  const existing = document.getElementById('da-status-badge');
  if (existing) existing.remove();

  statusBadge = createStatusBadge(status);
  document.body.appendChild(statusBadge);
}

// ─── Monitor ─────────────────────────────────────────────────────────────────

function runCheck(): void {
  const status = detectAvailability();

  if (status !== lastStatus) {
    lastStatus = status;
    updateBadge(status);

    if (status === 'available') {
      const ticketType = getPageTicketType();
      chrome.runtime.sendMessage({
        type:    'AVAILABILITY_DETECTED',
        payload: { ticketType, url: window.location.href },
      });
    }
  }
}

// Initial check
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runCheck);
} else {
  runCheck();
}

// Watch for dynamic page changes (AJAX booking systems)
const observer = new MutationObserver(() => {
  clearTimeout((window as unknown as { _daCheckTimeout?: ReturnType<typeof setTimeout> })._daCheckTimeout);
  (window as unknown as { _daCheckTimeout?: ReturnType<typeof setTimeout> })._daCheckTimeout =
    setTimeout(runCheck, 1500);
});

observer.observe(document.body, {
  childList: true,
  subtree:   true,
  characterData: true,
});

// Poll every 30 seconds as backup
setInterval(runCheck, 30000);
