import type { CountdownState } from '../types';

/**
 * Calculates countdown to a target date.
 */
export function getCountdown(targetDate: string, targetLabel: string): CountdownState {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0, hours: 0, minutes: 0, seconds: 0,
      isExpired: true, targetDate, targetLabel,
    };
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false, targetDate, targetLabel };
}

/**
 * Returns how many milliseconds until a target date.
 */
export function msUntil(targetDate: string): number {
  return Math.max(0, new Date(targetDate).getTime() - Date.now());
}

/**
 * Convert NotificationTiming string to ms before release.
 */
export function notificationTimingToMs(timing: string): number {
  const map: Record<string, number> = {
    '1_minute':   60 * 1000,
    '5_minutes':  5 * 60 * 1000,
    '10_minutes': 10 * 60 * 1000,
    '15_minutes': 15 * 60 * 1000,
    '30_minutes': 30 * 60 * 1000,
    '1_hour':     60 * 60 * 1000,
    '6_hours':    6 * 60 * 60 * 1000,
    '12_hours':   12 * 60 * 60 * 1000,
    '1_day':      24 * 60 * 60 * 1000,
  };
  return map[timing] ?? 0;
}

/**
 * Formats a countdown into a human-readable string.
 */
export function formatCountdown(state: CountdownState): string {
  if (state.isExpired) return 'Released!';
  if (state.days > 0) {
    return `${state.days}d ${state.hours}h ${state.minutes}m`;
  }
  if (state.hours > 0) {
    return `${state.hours}h ${state.minutes}m ${state.seconds}s`;
  }
  return `${state.minutes}m ${state.seconds}s`;
}

/**
 * Pads a number to 2 digits.
 */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
