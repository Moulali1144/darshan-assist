import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar as CalendarIcon, List, Filter, ExternalLink, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { DARSHAN_TYPE_LABELS } from '../../shared/utils/releaseCalendar';
import type { ReleaseEvent, DarshanType } from '../../shared/types';
import CountdownTimer from '../components/CountdownTimer';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DARSHAN_TYPE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  ssd_300:       { bg: 'rgba(200,134,10,0.15)',  color: '#F59E0B', border: 'rgba(200,134,10,0.35)' },
  accommodation: { bg: 'rgba(59,130,246,0.15)',  color: '#60A5FA', border: 'rgba(59,130,246,0.35)' },
  srivani:       { bg: 'rgba(139,92,246,0.15)',  color: '#A78BFA', border: 'rgba(139,92,246,0.35)' },
  seva:          { bg: 'rgba(34,197,94,0.15)',   color: '#4ADE80', border: 'rgba(34,197,94,0.35)' },
  special_entry: { bg: 'rgba(249,115,22,0.15)',  color: '#FB923C', border: 'rgba(249,115,22,0.35)' },
  vip:           { bg: 'rgba(200,134,10,0.2)',   color: '#FBBF24', border: 'rgba(200,134,10,0.4)' },
  festival:      { bg: 'rgba(139,0,0,0.18)',     color: '#F87171', border: 'rgba(139,0,0,0.35)' },
};

const FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: 'All Types',       value: 'all' },
  { label: '₹300 Darshan',    value: 'ssd_300' },
  { label: 'Accommodation',   value: 'accommodation' },
  { label: 'Srivani Trust',   value: 'srivani' },
  { label: 'Seva Booking',    value: 'seva' },
  { label: 'Special Entry',   value: 'special_entry' },
  { label: 'VIP Darshan',     value: 'vip' },
  { label: 'Festival',        value: 'festival' },
];

function formatReleaseDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── List View ────────────────────────────────────────────────────────────────

function ReleaseListCard({ release }: { release: ReleaseEvent }) {
  const dtColor = DARSHAN_TYPE_COLORS[release.darshanType] ?? { bg: 'rgba(200,134,10,0.1)', color: '#C8860A', border: 'rgba(200,134,10,0.2)' };
  return (
    <div
      style={{
        background: '#1E1E1E',
        border: `1px solid ${dtColor.border}`,
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'all 0.2s',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              color: '#F5F5F0',
              margin: '0 0 6px',
            }}
          >
            {release.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
              📅 {formatReleaseDateTime(release.releaseDate)}
            </span>
            {release.price && (
              <>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
                <span style={{ color: '#4ADE80', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px' }}>
                  ₹{release.price}
                </span>
              </>
            )}
          </div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            padding: '4px 12px',
            borderRadius: '100px',
            background: dtColor.bg,
            color: dtColor.color,
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            border: `1px solid ${dtColor.border}`,
            flexShrink: 0,
          }}
        >
          {DARSHAN_TYPE_LABELS[release.darshanType] ?? release.darshanType}
        </span>
      </div>

      {/* Countdown */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <CountdownTimer releaseDate={release.releaseDate} title={release.title} size="sm" />
        <a
          href={release.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            color: '#fff',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '12px',
            textDecoration: 'none',
            boxShadow: '0 3px 12px rgba(200,134,10,0.35)',
            transition: 'all 0.2s',
          }}
        >
          <ExternalLink size={13} />
          Open Booking Page
        </a>
      </div>

      {/* Notes */}
      {release.notes && (
        <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif", fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
          ℹ️ {release.notes}
        </p>
      )}

      {/* Darshan date range */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          Darshan: <span style={{ color: 'rgba(255,255,255,0.55)' }}>{formatDateShort(release.darshanDateStart)}</span>
          {' – '}
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{formatDateShort(release.darshanDateEnd)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Monthly Calendar View ────────────────────────────────────────────────────

function MonthlyView({ releases }: { releases: ReleaseEvent[] }) {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthName = viewDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build a map of day -> releases
  const releasesByDay = useMemo(() => {
    const map: Record<number, ReleaseEvent[]> = {};
    releases.forEach((r) => {
      const d = new Date(r.releaseDate);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(r);
      }
    });
    return map;
  }, [releases, year, month]);

  const selectedReleases = selectedDay ? (releasesByDay[selectedDay] ?? []) : [];

  const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      {/* Month navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button
          onClick={() => { setViewDate(new Date(year, month - 1, 1)); setSelectedDay(null); }}
          style={{
            padding: '8px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'Inter', sans-serif", fontSize: '13px',
          }}
        >
          <ChevronLeft size={16} /> Prev
        </button>
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '18px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}
        >
          {monthName}
        </h3>
        <button
          onClick={() => { setViewDate(new Date(year, month + 1, 1)); setSelectedDay(null); }}
          style={{
            padding: '8px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'Inter', sans-serif", fontSize: '13px',
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
        {DAY_LABELS.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', padding: '6px 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {/* Empty cells for offset */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} style={{ height: '52px' }} />
        ))}
        {/* Day cells */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const hasReleases = !!releasesByDay[day];
          const isSelected = selectedDay === day;
          const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
          return (
            <div
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              style={{
                height: '52px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                cursor: hasReleases ? 'pointer' : 'default',
                background: isSelected
                  ? 'rgba(200,134,10,0.2)'
                  : isToday
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? '1.5px solid rgba(200,134,10,0.5)'
                  : isToday
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: isToday ? 700 : 400,
                  fontSize: '13px',
                  color: isSelected ? '#F59E0B' : isToday ? '#F59E0B' : 'rgba(255,255,255,0.6)',
                }}
              >
                {day}
              </span>
              {hasReleases && (
                <div style={{ display: 'flex', gap: '2px' }}>
                  {(releasesByDay[day] ?? []).slice(0, 3).map((r) => {
                    const c = DARSHAN_TYPE_COLORS[r.darshanType]?.color ?? '#C8860A';
                    return <div key={r.id} style={{ width: '5px', height: '5px', borderRadius: '50%', background: c }} />;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Popover for selected day */}
      {selectedDay && selectedReleases.length > 0 && (
        <div
          style={{
            marginTop: '20px',
            background: 'rgba(200,134,10,0.05)',
            border: '1.5px solid rgba(200,134,10,0.25)',
            borderRadius: '16px',
            padding: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '15px', color: '#F59E0B', margin: 0 }}>
              {selectedDay} {viewDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </h4>
            <button onClick={() => setSelectedDay(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
              <X size={16} />
            </button>
          </div>
          {selectedReleases.map((r) => {
            const dtColor = DARSHAN_TYPE_COLORS[r.darshanType] ?? { bg: 'rgba(200,134,10,0.1)', color: '#C8860A', border: 'rgba(200,134,10,0.2)' };
            return (
              <div key={r.id} style={{ padding: '12px', borderRadius: '10px', background: '#1E1E1E', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: '#F5F5F0', fontSize: '14px' }}>{r.title}</span>
                  <span style={{ padding: '2px 8px', borderRadius: '100px', background: dtColor.bg, color: dtColor.color, fontSize: '10px', fontWeight: 600 }}>
                    {DARSHAN_TYPE_LABELS[r.darshanType]}
                  </span>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                  🕐 {formatReleaseDateTime(r.releaseDate)} {r.price && `· ₹${r.price}`}
                </div>
                <a href={r.bookingUrl} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: '12px', color: '#F59E0B', fontFamily: "'Inter', sans-serif", textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ExternalLink size={12} /> Open Booking Page
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Add Custom Release Modal ─────────────────────────────────────────────────

function AddReleaseModal({ onClose, onAdd }: { onClose: () => void; onAdd: (r: ReleaseEvent) => void }) {
  const [form, setForm] = useState({
    title: '',
    darshanType: 'ssd_300' as DarshanType,
    releaseDate: '',
    darshanDateStart: '',
    darshanDateEnd: '',
    price: '',
    bookingUrl: '',
    notes: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const now = new Date().toISOString();
    onAdd({
      id: `custom_${Date.now()}`,
      title: form.title,
      darshanType: form.darshanType,
      releaseDate: new Date(form.releaseDate).toISOString(),
      darshanDateStart: form.darshanDateStart,
      darshanDateEnd: form.darshanDateEnd,
      price: form.price ? Number(form.price) : undefined,
      bookingUrl: form.bookingUrl || 'https://ttdevasthanams.ap.gov.in',
      isCompleted: false,
      notes: form.notes || undefined,
    });
    onClose();
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#F5F5F0',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    boxSizing: 'border-box',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: '#1A1A1A', border: '1px solid rgba(200,134,10,0.25)',
          borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '500px',
          maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '18px', color: '#F5F5F0', margin: 0 }}>
            ➕ Add Custom Release
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Title *</label>
            <input required style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Release title" />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Darshan Type *</label>
            <select required style={inputStyle} value={form.darshanType} onChange={(e) => setForm({ ...form, darshanType: e.target.value as DarshanType })}>
              {Object.entries(DARSHAN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Release Date & Time *</label>
            <input required type="datetime-local" style={inputStyle} value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Darshan From *</label>
              <input required type="date" style={inputStyle} value={form.darshanDateStart} onChange={(e) => setForm({ ...form, darshanDateStart: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Darshan To *</label>
              <input required type="date" style={inputStyle} value={form.darshanDateEnd} onChange={(e) => setForm({ ...form, darshanDateEnd: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Price (₹)</label>
              <input type="number" style={inputStyle} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Optional" />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Booking URL</label>
              <input type="url" style={inputStyle} value={form.bookingUrl} onChange={(e) => setForm({ ...form, bookingUrl: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Notes</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes..." />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" style={{ padding: '10px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #C8860A, #F59E0B)', border: 'none', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(200,134,10,0.4)' }}>
              Add Release
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Calendar(): JSX.Element {
  const { releases, addBooking } = useApp();
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredReleases = useMemo(() => {
    const sorted = [...releases].sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
    if (filter === 'all') return sorted;
    return sorted.filter((r) => r.darshanType === filter);
  }, [releases, filter]);

  // For adding custom releases we need the context action
  const { releases: ctxReleases } = useApp();
  // Note: We'll use refreshReleases from context if needed. For now, addBooking is placeholder.
  // We use the releases from context which auto-refreshes.

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: '28px',
              margin: '0 0 6px',
              background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            📅 Release Calendar
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>
            Track TTD darshan, seva, and accommodation ticket releases
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            border: 'none', color: '#fff',
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(200,134,10,0.35)',
          }}
        >
          <Plus size={16} /> Add Custom
        </button>
      </div>

      {/* Controls Row */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* View Toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '3px', gap: '2px' }}>
          {(['list', 'month'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '9px',
                background: viewMode === mode ? 'rgba(200,134,10,0.2)' : 'transparent',
                border: viewMode === mode ? '1px solid rgba(200,134,10,0.3)' : '1px solid transparent',
                color: viewMode === mode ? '#F59E0B' : 'rgba(255,255,255,0.4)',
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {mode === 'list' ? <><List size={14} /> List View</> : <><CalendarIcon size={14} /> Monthly View</>}
            </button>
          ))}
        </div>

        {/* Filter by type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <Filter size={14} color="rgba(255,255,255,0.4)" />
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              style={{
                padding: '5px 12px', borderRadius: '100px',
                background: filter === opt.value ? 'rgba(200,134,10,0.15)' : 'rgba(255,255,255,0.04)',
                border: filter === opt.value ? '1px solid rgba(200,134,10,0.4)' : '1px solid rgba(255,255,255,0.07)',
                color: filter === opt.value ? '#F59E0B' : 'rgba(255,255,255,0.45)',
                fontFamily: "'Inter', sans-serif", fontWeight: filter === opt.value ? 600 : 400, fontSize: '12px',
                cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          background: '#1E1E1E',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        {filteredReleases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📅</div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>No releases found for this filter.</p>
          </div>
        ) : viewMode === 'list' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredReleases.map((release) => (
              <ReleaseListCard key={release.id} release={release} />
            ))}
          </div>
        ) : (
          <MonthlyView releases={filteredReleases} />
        )}
      </div>

      {showAddModal && (
        <AddReleaseModal
          onClose={() => setShowAddModal(false)}
          onAdd={(r) => {
            // Note: In production this should go through a context action
            console.log('[Calendar] Custom release added:', r);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
