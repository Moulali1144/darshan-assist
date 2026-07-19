import type { ReleaseEvent } from '../types';

/**
 * Generates seed TTD release events for the next 6 months.
 * Based on typical TTD booking patterns.
 */
export function generateSeedReleases(): ReleaseEvent[] {
  const now = new Date();
  const releases: ReleaseEvent[] = [];

  // Generate for next 6 months
  for (let m = 0; m < 6; m++) {
    const month = new Date(now.getFullYear(), now.getMonth() + m, 1);
    const year  = month.getFullYear();
    const mon   = month.getMonth();

    // SSD ₹300 – released on 1st of each month for next month
    const ssdRelease = new Date(year, mon, 1, 10, 0, 0);
    if (ssdRelease > now) {
      releases.push({
        id: `ssd_${year}_${mon + 1}`,
        title: `₹300 Special Darshan – ${formatMonthYear(new Date(year, mon + 1, 1))}`,
        darshanType: 'ssd_300',
        releaseDate: ssdRelease.toISOString(),
        darshanDateStart: new Date(year, mon + 1, 1).toISOString().split('T')[0],
        darshanDateEnd:   new Date(year, mon + 1, 28).toISOString().split('T')[0],
        slots: ['morning', 'afternoon', 'evening'],
        price: 300,
        bookingUrl: 'https://ttdevasthanams.ap.gov.in',
        isCompleted: false,
        notes: 'Special Seegra Darshan tickets. Released on 1st of previous month at 10:00 AM.',
      });
    }

    // Accommodation – released 60 days in advance, 10th of each month
    const accoRelease = new Date(year, mon, 10, 9, 0, 0);
    if (accoRelease > now) {
      releases.push({
        id: `acco_${year}_${mon + 1}`,
        title: `TTD Accommodation – ${formatMonthYear(new Date(year, mon + 2, 1))}`,
        darshanType: 'accommodation',
        releaseDate: accoRelease.toISOString(),
        darshanDateStart: new Date(year, mon + 2, 1).toISOString().split('T')[0],
        darshanDateEnd:   new Date(year, mon + 2, 28).toISOString().split('T')[0],
        bookingUrl: 'https://ttdevasthanams.ap.gov.in',
        isCompleted: false,
        notes: 'Guest house and cottage bookings. Released 60 days in advance.',
      });
    }

    // Srivani – monthly release on 15th
    const srivaniRelease = new Date(year, mon, 15, 10, 0, 0);
    if (srivaniRelease > now) {
      releases.push({
        id: `srivani_${year}_${mon + 1}`,
        title: `Srivani Trust – ${formatMonthYear(new Date(year, mon + 1, 1))}`,
        darshanType: 'srivani',
        releaseDate: srivaniRelease.toISOString(),
        darshanDateStart: new Date(year, mon + 1, 1).toISOString().split('T')[0],
        darshanDateEnd:   new Date(year, mon + 1, 28).toISOString().split('T')[0],
        price: 1000,
        bookingUrl: 'https://ttdevasthanams.ap.gov.in',
        isCompleted: false,
        notes: 'Srivani Trust donation-based darshan. ₹1000 minimum donation.',
      });
    }

    // Seva – released on 20th of each month for next month
    const sevaRelease = new Date(year, mon, 20, 9, 0, 0);
    if (sevaRelease > now) {
      releases.push({
        id: `seva_${year}_${mon + 1}`,
        title: `Seva Booking – ${formatMonthYear(new Date(year, mon + 1, 1))}`,
        darshanType: 'seva',
        releaseDate: sevaRelease.toISOString(),
        darshanDateStart: new Date(year, mon + 1, 1).toISOString().split('T')[0],
        darshanDateEnd:   new Date(year, mon + 1, 28).toISOString().split('T')[0],
        bookingUrl: 'https://ttdevasthanams.ap.gov.in',
        isCompleted: false,
        notes: 'Arjitha Sevas including Suprabhatam, Thomala, Archana, etc.',
      });
    }
  }

  return releases.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

export const DARSHAN_TYPE_LABELS: Record<string, string> = {
  ssd_300:      '₹300 Special Darshan',
  accommodation:'Accommodation',
  srivani:      'Srivani Trust',
  seva:         'Seva Booking',
  special_entry:'Special Entry',
  vip:          'VIP Darshan',
  festival:     'Festival Tickets',
};

export const DARSHAN_TYPE_COLORS: Record<string, string> = {
  ssd_300:      'saffron',
  accommodation:'blue',
  srivani:      'purple',
  seva:         'green',
  special_entry:'orange',
  vip:          'gold',
  festival:     'crimson',
};

export const TTD_QUICK_LINKS = [
  { id: 'home',    title: 'TTD Official',       url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '🏛️' },
  { id: 'darshan', title: '₹300 Darshan',        url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '🎟️' },
  { id: 'acco',    title: 'Accommodation',        url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '🏨' },
  { id: 'seva',    title: 'Seva Booking',         url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '🪔' },
  { id: 'srivani', title: 'Srivani Trust',        url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '💛' },
  { id: 'donate',  title: 'Donation',             url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '🙏' },
  { id: 'timing',  title: 'Temple Timings',       url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '🕐' },
  { id: 'map',     title: 'Maps & Directions',    url: 'https://goo.gl/maps/tirupati',                                     icon: '📍' },
  { id: 'help',    title: 'Help Center',          url: 'https://ttdevasthanams.ap.gov.in',                                   icon: '❓' },
];

export function uuid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
