// ─── Pilgrim / Family ────────────────────────────────────────────────────────

export type Gender = 'male' | 'female' | 'other';
export type Relationship = 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
export type IDType = 'aadhaar' | 'pan' | 'passport' | 'voter' | 'driving_license' | 'ration_card';

export interface PilgrimProfile {
  id: string;
  name: string;
  gender: Gender;
  dateOfBirth: string;           // ISO date string YYYY-MM-DD
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  idType: IDType;
  idNumber: string;              // AES encrypted
  relationship: Relationship;
  photoBase64?: string;          // Optional profile photo
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Booking ─────────────────────────────────────────────────────────────────

export type DarshanType =
  | 'ssd_300'          // Special Seegra Darshan ₹300
  | 'accommodation'    // TTD Guest House
  | 'srivani'         // Srivani Trust
  | 'seva'            // Sevas
  | 'special_entry'   // Special Entry Darshan
  | 'vip'             // VIP
  | 'festival';       // Festival special tickets

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'expired';

export interface BookingRecord {
  id: string;
  bookingDate: string;           // When was the booking made
  darshanDate: string;           // Darshan date
  darshanTime?: string;          // Morning / Afternoon / Evening
  darshanType: DarshanType;
  pilgrimIds: string[];          // Reference to PilgrimProfile ids
  ticketNumber?: string;
  totalAmount?: number;
  status: BookingStatus;
  journeyNotes?: string;
  ticketFileBase64?: string;     // Downloaded ticket PDF/image
  createdAt: string;
  updatedAt: string;
}

// ─── Release Calendar ─────────────────────────────────────────────────────────

export type SlotPeriod = 'morning' | 'afternoon' | 'evening' | 'full_day';

export interface ReleaseEvent {
  id: string;
  title: string;
  darshanType: DarshanType;
  releaseDate: string;           // When tickets are released
  darshanDateStart: string;      // Darshan from date
  darshanDateEnd: string;        // Darshan to date
  slots?: SlotPeriod[];
  totalTickets?: number;
  price?: number;
  bookingUrl: string;
  isCompleted: boolean;
  notes?: string;
}

// ─── Notification Rules ───────────────────────────────────────────────────────

export type NotificationTiming =
  | '1_day'
  | '12_hours'
  | '6_hours'
  | '1_hour'
  | '30_minutes'
  | '15_minutes'
  | '10_minutes'
  | '5_minutes'
  | '1_minute';

export type NotificationChannel = 'desktop' | 'browser' | 'telegram' | 'email';

export interface NotificationRule {
  id: string;
  name: string;
  enabled: boolean;
  darshanTypes: DarshanType[];
  preferredMonths?: number[];    // 1-12
  preferredDates?: string[];     // ISO date strings
  preferredSlots?: SlotPeriod[];
  preferWeekends?: boolean;
  preferWeekdays?: boolean;
  timings: NotificationTiming[];
  channels: NotificationChannel[];
  telegramChatId?: string;
  email?: string;
  createdAt: string;
}

// ─── Trip Plan ───────────────────────────────────────────────────────────────

export type TransportMode = 'bus' | 'train' | 'flight' | 'car' | 'auto';

export interface TripSegment {
  id: string;
  type: 'travel' | 'stay' | 'darshan' | 'activity';
  title: string;
  date: string;
  time?: string;
  location?: string;
  notes?: string;
  transportMode?: TransportMode;
  bookingReference?: string;
  cost?: number;
}

export interface TripPlan {
  id: string;
  title: string;
  pilgrimIds: string[];
  startDate: string;
  endDate: string;
  bookingId?: string;
  segments: TripSegment[];
  totalBudget?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── App Settings ─────────────────────────────────────────────────────────────

export type AppTheme = 'light' | 'dark' | 'system';
export type AppLanguage = 'en' | 'te' | 'hi' | 'ta' | 'kn';

export interface AppSettings {
  theme: AppTheme;
  language: AppLanguage;
  notificationsEnabled: boolean;
  autoBackupEnabled: boolean;
  encryptionEnabled: boolean;
  pinHash?: string;              // Hashed PIN for local security
  lastBackupDate?: string;
  onboardingCompleted: boolean;
  defaultDarshanType?: DarshanType;
  quickLinksCustom?: QuickLink[];
}

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  isCustom: boolean;
}

// ─── Countdown ────────────────────────────────────────────────────────────────

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  targetDate: string;
  targetLabel: string;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  SETTINGS:       'da_settings',
  ENCRYPTION_KEY: 'da_enc_key',
  PILGRIMS:       'da_pilgrims',
  BOOKINGS:       'da_bookings',
  RELEASES:       'da_releases',
  TRIPS:          'da_trips',
  NOTIF_RULES:    'da_notif_rules',
  NOTIF_HISTORY:  'da_notif_history',
} as const;

// ─── Message Types (Extension ↔ Background) ───────────────────────────────────

export type MessageType =
  | 'AUTOFILL_PILGRIM'
  | 'GET_PILGRIMS'
  | 'GET_SETTINGS'
  | 'AVAILABILITY_DETECTED'
  | 'OPEN_DASHBOARD'
  | 'TRIGGER_NOTIFICATION';

export interface ExtensionMessage<T = unknown> {
  type: MessageType;
  payload?: T;
}
