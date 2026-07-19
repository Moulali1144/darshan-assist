import { openDB, type IDBPDatabase } from 'idb';
import type { PilgrimProfile, BookingRecord, ReleaseEvent, TripPlan, NotificationRule } from '../types';

const DB_NAME = 'DarshanAssistDB';
const DB_VERSION = 1;

type DarshanAssistDB = {
  pilgrims: {
    key: string;
    value: PilgrimProfile;
    indexes: { 'by-name': string };
  };
  bookings: {
    key: string;
    value: BookingRecord;
    indexes: { 'by-date': string; 'by-status': string };
  };
  releases: {
    key: string;
    value: ReleaseEvent;
    indexes: { 'by-release-date': string; 'by-type': string };
  };
  trips: {
    key: string;
    value: TripPlan;
    indexes: { 'by-start-date': string };
  };
  notificationRules: {
    key: string;
    value: NotificationRule;
  };
};

let dbInstance: IDBPDatabase<DarshanAssistDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<DarshanAssistDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<DarshanAssistDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Pilgrims store
      if (!db.objectStoreNames.contains('pilgrims')) {
        const pilgrimsStore = db.createObjectStore('pilgrims', { keyPath: 'id' });
        pilgrimsStore.createIndex('by-name', 'name');
      }

      // Bookings store
      if (!db.objectStoreNames.contains('bookings')) {
        const bookingsStore = db.createObjectStore('bookings', { keyPath: 'id' });
        bookingsStore.createIndex('by-date', 'darshanDate');
        bookingsStore.createIndex('by-status', 'status');
      }

      // Release calendar store
      if (!db.objectStoreNames.contains('releases')) {
        const releasesStore = db.createObjectStore('releases', { keyPath: 'id' });
        releasesStore.createIndex('by-release-date', 'releaseDate');
        releasesStore.createIndex('by-type', 'darshanType');
      }

      // Trip plans store
      if (!db.objectStoreNames.contains('trips')) {
        const tripsStore = db.createObjectStore('trips', { keyPath: 'id' });
        tripsStore.createIndex('by-start-date', 'startDate');
      }

      // Notification rules store
      if (!db.objectStoreNames.contains('notificationRules')) {
        db.createObjectStore('notificationRules', { keyPath: 'id' });
      }
    },
  });

  return dbInstance;
}

// ─── Pilgrim CRUD ─────────────────────────────────────────────────────────────

export async function getAllPilgrims(): Promise<PilgrimProfile[]> {
  const db = await getDB();
  return db.getAll('pilgrims');
}

export async function getPilgrim(id: string): Promise<PilgrimProfile | undefined> {
  const db = await getDB();
  return db.get('pilgrims', id);
}

export async function savePilgrim(pilgrim: PilgrimProfile): Promise<void> {
  const db = await getDB();
  await db.put('pilgrims', pilgrim);
}

export async function deletePilgrim(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('pilgrims', id);
}

// ─── Booking CRUD ─────────────────────────────────────────────────────────────

export async function getAllBookings(): Promise<BookingRecord[]> {
  const db = await getDB();
  const bookings = await db.getAll('bookings');
  return bookings.sort((a, b) => b.darshanDate.localeCompare(a.darshanDate));
}

export async function saveBooking(booking: BookingRecord): Promise<void> {
  const db = await getDB();
  await db.put('bookings', booking);
}

export async function deleteBooking(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('bookings', id);
}

// ─── Release Events CRUD ──────────────────────────────────────────────────────

export async function getAllReleases(): Promise<ReleaseEvent[]> {
  const db = await getDB();
  const releases = await db.getAll('releases');
  return releases.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
}

export async function saveRelease(release: ReleaseEvent): Promise<void> {
  const db = await getDB();
  await db.put('releases', release);
}

export async function deleteRelease(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('releases', id);
}

// ─── Trip Plans CRUD ──────────────────────────────────────────────────────────

export async function getAllTrips(): Promise<TripPlan[]> {
  const db = await getDB();
  const trips = await db.getAll('trips');
  return trips.sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export async function saveTrip(trip: TripPlan): Promise<void> {
  const db = await getDB();
  await db.put('trips', trip);
}

export async function deleteTrip(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('trips', id);
}

// ─── Notification Rules CRUD ──────────────────────────────────────────────────

export async function getAllNotificationRules(): Promise<NotificationRule[]> {
  const db = await getDB();
  return db.getAll('notificationRules');
}

export async function saveNotificationRule(rule: NotificationRule): Promise<void> {
  const db = await getDB();
  await db.put('notificationRules', rule);
}

export async function deleteNotificationRule(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('notificationRules', id);
}

// ─── Bulk export / import ─────────────────────────────────────────────────────

export async function exportAllData(): Promise<object> {
  const [pilgrims, bookings, releases, trips, notificationRules] = await Promise.all([
    getAllPilgrims(),
    getAllBookings(),
    getAllReleases(),
    getAllTrips(),
    getAllNotificationRules(),
  ]);
  return {
    version: 1,
    exportDate: new Date().toISOString(),
    pilgrims,
    bookings,
    releases,
    trips,
    notificationRules,
  };
}
