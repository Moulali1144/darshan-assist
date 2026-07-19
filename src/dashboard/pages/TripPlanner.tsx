import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { TripPlan, TripSegment } from '../../shared/types';

const uuid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const QUICK_RESOURCES = [
  { category: '🏨 Hotels near Tirupati', items: [
    { label: 'TTD Guest Houses',       url: 'https://ttdevasthanams.ap.gov.in' },
    { label: 'Srinivasam',             url: 'https://ttdevasthanams.ap.gov.in' },
    { label: 'Bliss Hotel',            url: 'https://maps.google.com/?q=Bliss+Hotel+Tirupati' },
  ]},
  { category: '🚌 Transport', items: [
    { label: 'APSRTC Online Booking',  url: 'https://www.apsrtconline.in' },
    { label: 'IRCTC Rail Booking',     url: 'https://www.irctc.co.in' },
    { label: 'Tirupati Airport',       url: 'https://maps.google.com/?q=Tirupati+Airport' },
  ]},
  { category: '⛩️ Temple Info', items: [
    { label: 'Temple Timings',         url: 'https://ttdevasthanams.ap.gov.in' },
    { label: 'Google Maps – Tirumala', url: 'https://goo.gl/maps/tirumala' },
    { label: 'Laddu Booking',          url: 'https://ttdevasthanams.ap.gov.in' },
  ]},
  { category: '🆘 Emergency', items: [
    { label: 'TTD Help Desk: 1800-425-5505', url: 'tel:18004255505' },
    { label: 'Tirupati Police: 0877-2252270', url: 'tel:08772252270' },
    { label: 'Tirupati Hospital',       url: 'https://maps.google.com/?q=SVIMS+Tirupati' },
  ]},
];

const SEGMENT_TYPES = [
  { value: 'travel',   label: '✈️ Travel',   icon: '✈️' },
  { value: 'stay',     label: '🏨 Stay',     icon: '🏨' },
  { value: 'darshan',  label: '🙏 Darshan',  icon: '🙏' },
  { value: 'activity', label: '🎭 Activity', icon: '🎭' },
];

export default function TripPlannerPage(): JSX.Element {
  const { trips, addTrip, pilgrims } = useApp();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTrip,   setSelectedTrip]   = useState<TripPlan | null>(null);
  const [newSegmentType, setNewSegmentType] = useState<TripSegment['type']>('travel');

  // Create form state
  const [tripTitle,  setTripTitle]  = useState('');
  const [startDate,  setStartDate]  = useState('');
  const [endDate,    setEndDate]    = useState('');
  const [pilgsIds,   setPilgIds]    = useState<string[]>([]);
  const [segments,   setSegments]   = useState<TripSegment[]>([]);
  const [segTitle,   setSegTitle]   = useState('');
  const [segDate,    setSegDate]    = useState('');
  const [segNotes,   setSegNotes]   = useState('');

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-card)', border: '1px solid var(--color-border)',
    borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-card)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,134,10,0.2)', borderRadius: '10px',
    padding: '10px 14px', fontSize: '14px', color: 'inherit', fontFamily: 'Inter,sans-serif',
  };

  const addSegment = () => {
    if (!segTitle || !segDate) return;
    const seg: TripSegment = {
      id: uuid(), type: newSegmentType, title: segTitle,
      date: segDate, notes: segNotes,
    };
    setSegments((s) => [...s, seg]);
    setSegTitle(''); setSegDate(''); setSegNotes('');
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripTitle || !startDate || !endDate) return;
    const now = new Date().toISOString();
    const trip: TripPlan = {
      id: uuid(), title: tripTitle, pilgrimIds: pilgsIds,
      startDate, endDate, segments, notes: '',
      createdAt: now, updatedAt: now,
    };
    await addTrip(trip);
    setShowCreateForm(false);
    setTripTitle(''); setStartDate(''); setEndDate('');
    setPilgIds([]); setSegments([]);
  };

  const getDuration = (start: string, end: string) => {
    const days = Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <div style={{ maxWidth: '960px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '28px', margin: '0 0 6px' }}>
            🗺️ Trip Planner
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '15px' }}>
            Plan your pilgrimage from arrival to departure
          </p>
        </div>
        <button onClick={() => setShowCreateForm(true)} className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          + Plan Trip
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Left: Trips list */}
        <div>
          {trips.length === 0 && !showCreateForm ? (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '60px 20px', border: '2px dashed rgba(200,134,10,0.3)' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🗺️</div>
              <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '20px', marginBottom: '8px' }}>
                No Trips Planned
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>
                Start planning your Tirumala pilgrimage with hotels, transport, and darshan timings.
              </p>
              <button onClick={() => setShowCreateForm(true)} className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '12px' }}>
                Plan My Trip
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  style={{
                    ...cardStyle, cursor: 'pointer',
                    borderColor: selectedTrip?.id === trip.id ? 'rgba(200,134,10,0.5)' : 'var(--color-border)',
                    boxShadow: selectedTrip?.id === trip.id ? '0 0 0 2px rgba(200,134,10,0.3)' : 'var(--shadow-card)',
                  }}
                  onClick={() => setSelectedTrip(selectedTrip?.id === trip.id ? null : trip)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>
                        {trip.title}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                        {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' → '}
                        {new Date(trip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}
                        {getDuration(trip.startDate, trip.endDate)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span className="badge badge-saffron">{trip.pilgrimIds.length} pilgrim{trip.pilgrimIds.length !== 1 ? 's' : ''}</span>
                      <span className="badge badge-blue">{trip.segments.length} stops</span>
                    </div>
                  </div>

                  {selectedTrip?.id === trip.id && trip.segments.length > 0 && (
                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '14px', marginTop: '4px' }}>
                      {trip.segments.map((seg, i) => (
                        <div key={seg.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', paddingBottom: '10px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                            <div style={{
                              width: '28px', height: '28px', borderRadius: '50%',
                              background: 'rgba(200,134,10,0.15)', border: '2px solid rgba(200,134,10,0.3)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px',
                            }}>
                              {SEGMENT_TYPES.find((t) => t.value === seg.type)?.icon || '📍'}
                            </div>
                            {i < trip.segments.length - 1 && (
                              <div style={{ width: '2px', height: '20px', background: 'rgba(200,134,10,0.2)', marginTop: '2px' }} />
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '13px' }}>{seg.title}</div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                              {new Date(seg.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              {seg.notes && ` · ${seg.notes}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Create Trip Form */}
          {showCreateForm && (
            <div style={{ ...cardStyle, marginTop: trips.length > 0 ? '20px' : '0', border: '1px solid rgba(200,134,10,0.25)' }}>
              <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '20px', color: '#C8860A' }}>
                ✈️ Plan New Trip
              </div>
              <form onSubmit={handleCreateTrip} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#C8860A', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Trip Title
                  </label>
                  <input style={inputStyle} value={tripTitle} onChange={(e) => setTripTitle(e.target.value)} placeholder="e.g., Tirumala Pilgrimage Aug 2026" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#C8860A', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Start Date
                    </label>
                    <input style={inputStyle} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#C8860A', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      End Date
                    </label>
                    <input style={inputStyle} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                  </div>
                </div>

                {pilgrims.length > 0 && (
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#C8860A', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Select Pilgrims
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {pilgrims.map((p) => (
                        <button
                          key={p.id} type="button"
                          onClick={() => setPilgIds((ids) => ids.includes(p.id) ? ids.filter((x) => x !== p.id) : [...ids, p.id])}
                          style={{
                            padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                            border: pilgsIds.includes(p.id) ? '1.5px solid #C8860A' : '1px solid rgba(107,114,128,0.3)',
                            background: pilgsIds.includes(p.id) ? 'rgba(200,134,10,0.12)' : 'transparent',
                            color: pilgsIds.includes(p.id) ? '#C8860A' : 'var(--color-text-muted)',
                          }}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Segments */}
                <div style={{ background: 'rgba(200,134,10,0.04)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(200,134,10,0.12)' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '10px', color: '#C8860A' }}>
                    Add Trip Stops (Optional)
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {SEGMENT_TYPES.map((t) => (
                      <button key={t.value} type="button"
                        onClick={() => setNewSegmentType(t.value as TripSegment['type'])}
                        style={{
                          padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                          border: newSegmentType === t.value ? '1.5px solid #C8860A' : '1px solid rgba(107,114,128,0.3)',
                          background: newSegmentType === t.value ? 'rgba(200,134,10,0.12)' : 'transparent',
                          color: newSegmentType === t.value ? '#C8860A' : 'var(--color-text-muted)',
                        }}
                      >{t.label}</button>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'flex-start' }}>
                    <input style={{ ...inputStyle, fontSize: '13px', padding: '8px 12px' }} value={segTitle} onChange={(e) => setSegTitle(e.target.value)} placeholder="Stop title (e.g., Board APSRTC from Hyderabad)" />
                    <input style={{ ...inputStyle, fontSize: '13px', padding: '8px 12px', width: '140px' }} type="date" value={segDate} onChange={(e) => setSegDate(e.target.value)} />
                    <button type="button" onClick={addSegment} style={{
                      background: 'rgba(200,134,10,0.15)', border: '1px solid rgba(200,134,10,0.3)',
                      borderRadius: '10px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, color: '#C8860A', cursor: 'pointer', whiteSpace: 'nowrap',
                    }}>+ Add</button>
                  </div>
                  {segments.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {segments.map((s, i) => (
                        <div key={s.id} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '8px 12px', background: 'rgba(200,134,10,0.06)', borderRadius: '8px', fontSize: '12px',
                        }}>
                          <span>{SEGMENT_TYPES.find((t) => t.value === s.type)?.icon} {s.title} · {new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                          <button type="button" onClick={() => setSegments((seg) => seg.filter((_, j) => j !== i))}
                            style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px' }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowCreateForm(false)} style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px', padding: '10px 24px', fontSize: '14px', fontWeight: 600,
                    cursor: 'pointer', color: 'var(--color-text-muted)',
                  }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ padding: '10px 28px', fontSize: '14px', borderRadius: '10px' }}>
                    Save Trip Plan
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right: Resources */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {QUICK_RESOURCES.map((res) => (
            <div key={res.category} style={{ ...cardStyle, padding: '16px' }}>
              <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '13px', color: '#C8860A', marginBottom: '10px' }}>
                {res.category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {res.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '7px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                      color: 'var(--color-text)', textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,134,10,0.08)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ''; }}
                  >
                    <span style={{ color: '#C8860A', fontSize: '10px' }}>↗</span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
