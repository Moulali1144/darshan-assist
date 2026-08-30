import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Download, Plus, X, Filter } from 'lucide-react';
import { DARSHAN_TYPE_LABELS } from '../../shared/utils/releaseCalendar';
import type { BookingRecord, BookingStatus, DarshanType } from '../../shared/types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const DARSHAN_TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  ssd_300:       { bg: 'rgba(200,134,10,0.15)',  color: '#F59E0B' },
  accommodation: { bg: 'rgba(59,130,246,0.15)',  color: '#60A5FA' },
  srivani:       { bg: 'rgba(139,92,246,0.15)',  color: '#A78BFA' },
  seva:          { bg: 'rgba(34,197,94,0.15)',   color: '#4ADE80' },
  special_entry: { bg: 'rgba(249,115,22,0.15)',  color: '#FB923C' },
  vip:           { bg: 'rgba(200,134,10,0.2)',   color: '#FBBF24' },
  festival:      { bg: 'rgba(139,0,0,0.18)',     color: '#F87171' },
};

const STATUS_META: Record<BookingStatus, { bg: string; color: string; label: string; emoji: string }> = {
  confirmed:  { bg: 'rgba(34,197,94,0.12)',  color: '#22C55E', label: 'Confirmed', emoji: '✅' },
  pending:    { bg: 'rgba(234,179,8,0.12)',  color: '#EAB308', label: 'Pending',   emoji: '⏳' },
  cancelled:  { bg: 'rgba(239,68,68,0.12)', color: '#EF4444', label: 'Cancelled', emoji: '❌' },
  completed:  { bg: 'rgba(59,130,246,0.12)',color: '#3B82F6', label: 'Completed', emoji: '🎉' },
  expired:    { bg: 'rgba(107,114,128,0.12)',color: '#6B7280', label: 'Expired',  emoji: '🕐' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Add Booking Modal ────────────────────────────────────────────────────────

function AddBookingModal({ onClose, onAdd, pilgrims }: {
  onClose: () => void;
  onAdd: (b: BookingRecord) => void;
  pilgrims: { id: string; name: string }[];
}) {
  const [form, setForm] = useState({
    darshanDate: '',
    darshanTime: '',
    darshanType: 'ssd_300' as DarshanType,
    status: 'confirmed' as BookingStatus,
    ticketNumber: '',
    totalAmount: '',
    journeyNotes: '',
    pilgrimIds: [] as string[],
  });

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const now = new Date().toISOString();
    onAdd({
      id: `booking_${Date.now()}`,
      bookingDate: now,
      darshanDate: form.darshanDate,
      darshanTime: form.darshanTime || undefined,
      darshanType: form.darshanType,
      pilgrimIds: form.pilgrimIds,
      ticketNumber: form.ticketNumber || undefined,
      totalAmount: form.totalAmount ? Number(form.totalAmount) : undefined,
      status: form.status,
      journeyNotes: form.journeyNotes || undefined,
      createdAt: now,
      updatedAt: now,
    });
    onClose();
  }

  function togglePilgrim(id: string) {
    setForm((prev) => ({
      ...prev,
      pilgrimIds: prev.pilgrimIds.includes(id)
        ? prev.pilgrimIds.filter((p) => p !== id)
        : [...prev.pilgrimIds, id],
    }));
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '18px', color: '#0F172A', margin: 0 }}>🎟️ Add Booking</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Darshan Date *</label>
              <input required type="date" style={inputStyle} value={form.darshanDate} onChange={(e) => setForm({ ...form, darshanDate: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Time Slot</label>
              <select style={inputStyle} value={form.darshanTime} onChange={(e) => setForm({ ...form, darshanTime: e.target.value })}>
                <option value="">Any</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Darshan Type *</label>
            <select required style={inputStyle} value={form.darshanType} onChange={(e) => setForm({ ...form, darshanType: e.target.value as DarshanType })}>
              {Object.entries(DARSHAN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Status *</label>
            <select required style={inputStyle} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as BookingStatus })}>
              {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Ticket Number</label>
              <input style={inputStyle} value={form.ticketNumber} onChange={(e) => setForm({ ...form, ticketNumber: e.target.value })} placeholder="Optional" />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Total Amount (₹)</label>
              <input type="number" style={inputStyle} value={form.totalAmount} onChange={(e) => setForm({ ...form, totalAmount: e.target.value })} placeholder="Optional" />
            </div>
          </div>

          {pilgrims.length > 0 && (
            <div>
              <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', fontWeight: 500 }}>Select Pilgrims</label>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {pilgrims.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePilgrim(p.id)}
                    style={{
                      padding: '5px 12px', borderRadius: '100px',
                      background: form.pilgrimIds.includes(p.id) ? 'rgba(200,134,10,0.2)' : 'rgba(255,255,255,0.04)',
                      border: form.pilgrimIds.includes(p.id) ? '1px solid rgba(200,134,10,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      color: form.pilgrimIds.includes(p.id) ? '#F59E0B' : 'rgba(255,255,255,0.5)',
                      fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500 }}>Journey Notes</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.journeyNotes} onChange={(e) => setForm({ ...form, journeyNotes: e.target.value })} placeholder="Travel details, accommodation notes, etc." />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '10px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #C8860A, #F59E0B)', border: 'none', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(200,134,10,0.4)' }}>Save Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function History(): JSX.Element {
  const { bookings, pilgrims, addBooking } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  const stats = useMemo(() => ({
    total:     bookings.length,
    upcoming:  bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  }), [bookings]);

  const filtered = useMemo(() => {
    return bookings
      .filter((b) => {
        const q = search.toLowerCase();
        const matchSearch = !q || b.ticketNumber?.toLowerCase().includes(q) || b.darshanType.toLowerCase().includes(q) || b.journeyNotes?.toLowerCase().includes(q);
        const matchStatus = statusFilter === 'all' || b.status === statusFilter;
        const matchType = typeFilter === 'all' || b.darshanType === typeFilter;
        return matchSearch && matchStatus && matchType;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [bookings, search, statusFilter, typeFilter]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '28px', margin: '0 0 6px',
              background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            🎟️ Booking History
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>
            Track all your TTD darshan bookings
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => downloadJSON(filtered, `darshan_bookings_${Date.now()}.json`)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '10px 18px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px', cursor: 'pointer',
            }}
          >
            <Download size={15} /> Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #C8860A, #F59E0B)', border: 'none', color: '#fff',
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(200,134,10,0.35)',
            }}
          >
            <Plus size={16} /> Add Booking
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Bookings', value: stats.total, color: 'rgba(200,134,10,0.8)' },
          { label: 'Upcoming',       value: stats.upcoming, color: '#22C55E' },
          { label: 'Completed',      value: stats.completed, color: '#3B82F6' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '30px', color, marginBottom: '4px' }}>{value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket number, type, notes..."
            style={{
              width: '100%', padding: '10px 14px 10px 36px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#F5F5F0', fontFamily: "'Inter', sans-serif", fontSize: '13px', boxSizing: 'border-box',
            }}
          />
        </div>
        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: '13px', cursor: 'pointer' }}
        >
          <option value="all">All Status</option>
          {Object.entries(STATUS_META).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}
        </select>
        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter', sans-serif", fontSize: '13px', cursor: 'pointer' }}
        >
          <option value="all">All Types</option>
          {Object.entries(DARSHAN_TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      {/* Results count */}
      {bookings.length > 0 && (
        <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter', sans-serif", fontSize: '12px', marginBottom: '16px' }}>
          Showing {filtered.length} of {bookings.length} bookings
        </p>
      )}

      {/* Empty state */}
      {bookings.length === 0 ? (
        <div
          style={{
            background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px',
            padding: '64px 32px', textAlign: 'center',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎟️</div>
          <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '18px', color: '#F5F5F0', margin: '0 0 8px' }}>
            No bookings yet
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: '0 0 24px' }}>
            Start tracking your TTD darshan journey by adding your first booking.
          </p>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #C8860A, #F59E0B)', border: 'none', color: '#fff',
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(200,134,10,0.4)',
            }}
          >
            <Plus size={18} /> Add First Booking
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>No bookings match your search. Try adjusting the filters.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map((booking) => {
            const dtColor = DARSHAN_TYPE_COLORS[booking.darshanType] ?? { bg: 'rgba(200,134,10,0.1)', color: '#C8860A' };
            const stMeta = STATUS_META[booking.status] ?? { bg: 'rgba(107,114,128,0.1)', color: '#6B7280', label: booking.status, emoji: '' };
            const pilgrimNames = booking.pilgrimIds.map((id) => pilgrims.find((p) => p.id === id)?.name ?? 'Unknown').join(', ');
            return (
              <div
                key={booking.id}
                style={{
                  background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px',
                  padding: '20px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Left info */}
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '15px', color: '#F5F5F0', margin: 0 }}>
                        {DARSHAN_TYPE_LABELS[booking.darshanType] ?? booking.darshanType}
                      </h3>
                      <span style={{ padding: '2px 10px', borderRadius: '100px', background: dtColor.bg, color: dtColor.color, fontSize: '11px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                        {DARSHAN_TYPE_LABELS[booking.darshanType]}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
                        📅 {formatDate(booking.darshanDate)} {booking.darshanTime && `· ${booking.darshanTime}`}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
                        👥 {booking.pilgrimIds.length} pilgrim{booking.pilgrimIds.length !== 1 ? 's' : ''}
                        {pilgrimNames ? ` (${pilgrimNames})` : ''}
                      </span>
                    </div>
                    {booking.ticketNumber && (
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif", fontSize: '12px', marginTop: '4px' }}>
                        🎟️ {booking.ticketNumber}
                      </div>
                    )}
                    {booking.journeyNotes && (
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter', sans-serif", fontSize: '12px', marginTop: '6px', lineHeight: 1.4, fontStyle: 'italic' }}>
                        {booking.journeyNotes}
                      </div>
                    )}
                  </div>

                  {/* Right: Status + Amount */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ padding: '5px 14px', borderRadius: '100px', background: stMeta.bg, color: stMeta.color, fontSize: '12px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                      {stMeta.emoji} {stMeta.label}
                    </span>
                    {booking.totalAmount && (
                      <span style={{ color: '#4ADE80', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '16px' }}>
                        ₹{booking.totalAmount.toLocaleString('en-IN')}
                      </span>
                    )}
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Inter', sans-serif", fontSize: '11px' }}>
                      Added {formatDate(booking.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <AddBookingModal
          onClose={() => setShowModal(false)}
          onAdd={addBooking}
          pilgrims={pilgrims}
        />
      )}
    </div>
  );
}
