/**
 * Darshan Assist – Background Service Worker
 * Handles alarms, notifications, and message passing for the Chrome Extension.
 */

import type { ReleaseEvent, NotificationRule } from '../../shared/types';
import { notificationTimingToMs } from '../../shared/utils/countdown';

const ALARM_PREFIX = 'da_release_';
const CHECK_INTERVAL_ALARM = 'da_check_interval';

// ─── Extension Install / Startup ──────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('[DarshanAssist] Extension installed!');
    // Open onboarding page
    chrome.tabs.create({ url: chrome.runtime.getURL('src/dashboard/index.html') });
  }
  await scheduleAllAlarms();
});

chrome.runtime.onStartup.addListener(async () => {
  await scheduleAllAlarms();
});

// ─── Alarm Handling ───────────────────────────────────────────────────────────

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log('[DarshanAssist] Alarm fired:', alarm.name);

  if (alarm.name === CHECK_INTERVAL_ALARM) {
    await checkAndRefreshAlarms();
    return;
  }

  if (alarm.name.startsWith(ALARM_PREFIX)) {
    const parts   = alarm.name.split('_');
    const eventId = parts.slice(2, -1).join('_');
    const timing  = parts[parts.length - 1];
    await fireReleaseNotification(eventId, timing);
  }
});

async function scheduleAllAlarms(): Promise<void> {
  // Schedule a periodic check every 6 hours
  await chrome.alarms.create(CHECK_INTERVAL_ALARM, {
    periodInMinutes: 360,
  });
  await checkAndRefreshAlarms();
}

async function checkAndRefreshAlarms(): Promise<void> {
  const data = await chrome.storage.local.get(['da_releases', 'da_notif_rules']);
  const releases: ReleaseEvent[]      = data['da_releases'] || [];
  const rules:    NotificationRule[]  = data['da_notif_rules'] || [];

  if (!rules.some((r) => r.enabled)) return;

  const now = Date.now();

  for (const release of releases) {
    if (release.isCompleted) continue;
    const releaseMs = new Date(release.releaseDate).getTime();
    if (releaseMs < now) continue;

    // Find matching rules
    const matchingRules = rules.filter(
      (r) => r.enabled && r.darshanTypes.includes(release.darshanType),
    );
    if (!matchingRules.length) continue;

    // Collect unique timings
    const timings = [...new Set(matchingRules.flatMap((r) => r.timings))];

    for (const timing of timings) {
      const alarmMs   = releaseMs - notificationTimingToMs(timing);
      const alarmName = `${ALARM_PREFIX}${release.id}_${timing}`;

      if (alarmMs > now) {
        // Clear existing alarm and re-schedule
        await chrome.alarms.clear(alarmName);
        await chrome.alarms.create(alarmName, { when: alarmMs });
        console.log(`[DarshanAssist] Alarm set: ${alarmName} at ${new Date(alarmMs).toLocaleString()}`);
      }
    }
  }
}

async function fireReleaseNotification(eventId: string, timing: string): Promise<void> {
  const data     = await chrome.storage.local.get('da_releases');
  const releases: ReleaseEvent[] = data['da_releases'] || [];
  const event    = releases.find((r) => r.id === eventId);
  if (!event) return;

  const timingLabel = timingToLabel(timing);
  const title       = `🙏 ${event.title}`;
  const message     = `Tickets release ${timingLabel}! Open the TTD website and be ready.`;

  chrome.notifications.create(`notif_${eventId}_${timing}`, {
    type:     'basic',
    iconUrl:  chrome.runtime.getURL('icons/icon128.png'),
    title,
    message,
    buttons:  [{ title: 'Open TTD Website' }],
    priority: 2,
    requireInteraction: timing === '1_minute' || timing === '5_minutes',
  });

  // Save notification to history
  const histData   = await chrome.storage.local.get('da_notif_history');
  const history    = histData['da_notif_history'] || [];
  history.unshift({
    id:        `${eventId}_${timing}_${Date.now()}`,
    title,
    message,
    eventId,
    firedAt:   new Date().toISOString(),
    timing,
  });
  // Keep last 100
  await chrome.storage.local.set({ 'da_notif_history': history.slice(0, 100) });
}

// ─── Notification click → open booking page ───────────────────────────────────

chrome.notifications.onButtonClicked.addListener(async (notifId) => {
  const eventId    = notifId.replace('notif_', '').split('_')[0];
  const data       = await chrome.storage.local.get('da_releases');
  const releases: ReleaseEvent[] = data['da_releases'] || [];
  const event      = releases.find((r) => r.id === eventId);

  if (event?.bookingUrl) {
    chrome.tabs.create({ url: event.bookingUrl });
  }
  chrome.notifications.clear(notifId);
});

chrome.notifications.onClicked.addListener((notifId) => {
  chrome.tabs.create({ url: 'https://ttdevasthanams.ap.gov.in' });
  chrome.notifications.clear(notifId);
});

// ─── Message Passing ──────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    switch (message.type) {
      case 'GET_PILGRIMS': {
        const data = await chrome.storage.local.get('da_pilgrims');
        sendResponse({ pilgrims: data['da_pilgrims'] || [] });
        break;
      }
      case 'GET_SETTINGS': {
        const data = await chrome.storage.sync.get('da_settings');
        sendResponse({ settings: data['da_settings'] || {} });
        break;
      }
      case 'OPEN_DASHBOARD': {
        chrome.tabs.create({ url: chrome.runtime.getURL('src/dashboard/index.html') });
        sendResponse({ ok: true });
        break;
      }
      case 'AVAILABILITY_DETECTED': {
        const { ticketType, date } = message.payload || {};
        chrome.notifications.create(`avail_${Date.now()}`, {
          type:     'basic',
          iconUrl:  chrome.runtime.getURL('icons/icon128.png'),
          title:    '🎟️ Availability Detected!',
          message:  `${ticketType || 'Darshan'} slots may be available${date ? ` for ${date}` : ''}. Check now!`,
          priority: 2,
          requireInteraction: true,
          buttons:  [{ title: 'Open TTD Website' }],
        });
        sendResponse({ ok: true });
        break;
      }
      case 'REFRESH_ALARMS': {
        await checkAndRefreshAlarms();
        sendResponse({ ok: true });
        break;
      }
      default:
        sendResponse({ error: 'Unknown message type' });
    }
  })();
  return true; // Keep message channel open for async response
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timingToLabel(timing: string): string {
  const map: Record<string, string> = {
    '1_minute':   'in 1 minute',
    '5_minutes':  'in 5 minutes',
    '10_minutes': 'in 10 minutes',
    '15_minutes': 'in 15 minutes',
    '30_minutes': 'in 30 minutes',
    '1_hour':     'in 1 hour',
    '6_hours':    'in 6 hours',
    '12_hours':   'in 12 hours',
    '1_day':      'tomorrow',
  };
  return map[timing] || 'soon';
}
