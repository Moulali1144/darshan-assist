import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { PilgrimProfile, BookingRecord, ReleaseEvent, TripPlan, NotificationRule, AppSettings } from '../../shared/types';
import { getSettings, saveSettings } from '../../shared/storage/chromeStorage';
import { getAllPilgrims, savePilgrim, deletePilgrim, getAllBookings, saveBooking, getAllReleases, saveRelease, getAllTrips, saveTrip } from '../../shared/storage/db';
import { generateSeedReleases } from '../../shared/utils/releaseCalendar';

// ─── Context Type ─────────────────────────────────────────────────────────────

interface AppContextType {
  // Data
  pilgrims:       PilgrimProfile[];
  bookings:       BookingRecord[];
  releases:       ReleaseEvent[];
  trips:          TripPlan[];
  settings:       AppSettings | null;
  // Loading
  loading:        boolean;
  // Actions
  refreshPilgrims:  () => Promise<void>;
  refreshBookings:  () => Promise<void>;
  refreshReleases:  () => Promise<void>;
  refreshTrips:     () => Promise<void>;
  addPilgrim:       (p: PilgrimProfile)   => Promise<void>;
  updatePilgrim:    (p: PilgrimProfile)   => Promise<void>;
  removePilgrim:    (id: string)          => Promise<void>;
  addBooking:       (b: BookingRecord)    => Promise<void>;
  updateBooking:    (b: BookingRecord)    => Promise<void>;
  addTrip:          (t: TripPlan)         => Promise<void>;
  updateSettings:   (s: Partial<AppSettings>) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [pilgrims, setPilgrims] = useState<PilgrimProfile[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [releases, setReleases] = useState<ReleaseEvent[]>([]);
  const [trips,    setTrips]    = useState<TripPlan[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading,  setLoading]  = useState(true);

  const refreshPilgrims = useCallback(async () => {
    setPilgrims(await getAllPilgrims());
  }, []);

  const refreshBookings = useCallback(async () => {
    setBookings(await getAllBookings());
  }, []);

  const refreshReleases = useCallback(async () => {
    const rel = await getAllReleases();
    setReleases(rel);
  }, []);

  const refreshTrips = useCallback(async () => {
    setTrips(await getAllTrips());
  }, []);

  // Bootstrap: load everything on mount
  useEffect(() => {
    (async () => {
      try {
        const [p, b, r, t, s] = await Promise.all([
          getAllPilgrims(),
          getAllBookings(),
          getAllReleases(),
          getAllTrips(),
          getSettings(),
        ]);

        // Seed releases if none exist
        let seedReleases = r;
        if (r.length === 0) {
          const seeds = generateSeedReleases();
          await Promise.all(seeds.map(saveRelease));
          seedReleases = seeds;
        } else {
          // Migration: Update old URLs to use new TTD unified portal
          let migrated = false;
          const updatedReleases = r.map((release) => {
            if (release.bookingUrl && release.bookingUrl.includes('ttdsevaonline.com')) {
              release.bookingUrl = 'https://ttdevasthanams.ap.gov.in';
              migrated = true;
            }
            return release;
          });
          if (migrated) {
            await Promise.all(updatedReleases.map(saveRelease));
            seedReleases = updatedReleases;
          }
        }

        setPilgrims(p);
        setBookings(b);
        setReleases(seedReleases);
        setTrips(t);
        setSettings(s);
      } catch (err) {
        console.error('[AppContext] Boot error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addPilgrim = useCallback(async (p: PilgrimProfile) => {
    await savePilgrim(p);
    await refreshPilgrims();
  }, [refreshPilgrims]);

  const updatePilgrim = useCallback(async (p: PilgrimProfile) => {
    await savePilgrim(p);
    await refreshPilgrims();
  }, [refreshPilgrims]);

  const removePilgrim = useCallback(async (id: string) => {
    await deletePilgrim(id);
    await refreshPilgrims();
  }, [refreshPilgrims]);

  const addBooking = useCallback(async (b: BookingRecord) => {
    await saveBooking(b);
    await refreshBookings();
  }, [refreshBookings]);

  const updateBooking = useCallback(async (b: BookingRecord) => {
    await saveBooking(b);
    await refreshBookings();
  }, [refreshBookings]);

  const addTrip = useCallback(async (t: TripPlan) => {
    await saveTrip(t);
    await refreshTrips();
  }, [refreshTrips]);

  const updateSettingsFn = useCallback(async (s: Partial<AppSettings>) => {
    await saveSettings(s);
    setSettings((prev) => prev ? { ...prev, ...s } : null);
  }, []);

  return (
    <AppContext.Provider value={{
      pilgrims, bookings, releases, trips, settings, loading,
      refreshPilgrims, refreshBookings, refreshReleases, refreshTrips,
      addPilgrim, updatePilgrim, removePilgrim,
      addBooking, updateBooking, addTrip,
      updateSettings: updateSettingsFn,
    }}>
      {children}
    </AppContext.Provider>
  );
}
