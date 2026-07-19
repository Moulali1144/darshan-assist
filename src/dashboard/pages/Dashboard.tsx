import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, BookOpen, Map, CalendarDays, ExternalLink, Bell, TrendingUp, Clock } from 'lucide-react';
import { DARSHAN_TYPE_LABELS, TTD_QUICK_LINKS } from '../../shared/utils/releaseCalendar';
import CountdownTimer from '../components/CountdownTimer';

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

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  confirmed:  { bg: 'rgba(34,197,94,0.12)',  color: '#22C55E' },
  pending:    { bg: 'rgba(234,179,8,0.12)',  color: '#EAB308' },
  cancelled:  { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  completed:  { bg: 'rgba(59,130,246,0.12)',color: '#3B82F6' },
  expired:    { bg: 'rgba(107,114,128,0.12)',color: '#6B7280' },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function formatReleaseDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div
      style={{
        background: '#1E1E1E',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={22} color="#fff" />
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '26px',
            color: '#F5F5F0',
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Dashboard(): JSX.Element {
  const { pilgrims, bookings, releases, trips } = useApp();

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // Filter releases: upcoming (not completed, release date in future or recent)
  const upcomingReleases = releases
    .filter((r) => !r.isCompleted)
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));

  const nextRelease = upcomingReleases[0];
  const next3Releases = upcomingReleases.slice(0, 3);

  // Recent bookings (last 2)
  const recentBookings = [...bookings]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 2);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <div
        style={{
          marginBottom: '32px',
          padding: '32px 36px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1A1207 0%, #1E1E1E 50%, #0F0F1A 100%)',
          border: '1px solid rgba(200,134,10,0.2)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(200,134,10,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px' }}>🙏</span>
            <div>
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: '26px',
                  color: '#F5F5F0',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {getGreeting()}, Pilgrim!
              </h1>
              <p
                style={{
                  background: 'linear-gradient(90deg, #C8860A, #F59E0B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  margin: '2px 0 0',
                  letterSpacing: '0.3px',
                }}
              >
                Jai Tirumala Venkateswara 🕉️
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              marginTop: '12px',
            }}
          >
            <Clock size={13} />
            {today}
          </div>
        </div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <StatCard icon={Users}        label="Saved Pilgrims"     value={pilgrims.length}         color="linear-gradient(135deg, #C8860A, #F59E0B)" />
        <StatCard icon={CalendarDays} label="Upcoming Releases"  value={upcomingReleases.length}  color="linear-gradient(135deg, #7C3AED, #A855F7)" />
        <StatCard icon={BookOpen}     label="Bookings Logged"    value={bookings.length}          color="linear-gradient(135deg, #059669, #10B981)" />
        <StatCard icon={Map}          label="Trip Plans"          value={trips.length}             color="linear-gradient(135deg, #2563EB, #3B82F6)" />
      </div>

      {/* ── Next Release Countdown ────────────────────────────────────────── */}
      {nextRelease && (
        <div
          style={{
            marginBottom: '32px',
            padding: '32px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(200,134,10,0.08), rgba(30,30,30,1))',
            border: '1.5px solid rgba(200,134,10,0.35)',
            boxShadow: '0 0 40px rgba(200,134,10,0.08), 0 8px 40px rgba(0,0,0,0.4)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top border gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #C8860A, #F59E0B, #C8860A, transparent)',
            }}
          />

          <div style={{ marginBottom: '6px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 14px',
                borderRadius: '100px',
                background: 'rgba(200,134,10,0.12)',
                border: '1px solid rgba(200,134,10,0.3)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                color: '#C8860A',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              ⏰ Next Release
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '20px',
              color: '#F5F5F0',
              margin: '12px 0 4px',
            }}
          >
            {nextRelease.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: "'Inter', sans-serif", margin: '0 0 28px' }}>
            Releases on {formatReleaseDateTime(nextRelease.releaseDate)}
          </p>

          <CountdownTimer
            releaseDate={nextRelease.releaseDate}
            title={nextRelease.title}
            size="lg"
          />

          {nextRelease.bookingUrl && (
            <a
              href={nextRelease.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '28px',
                padding: '11px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(200,134,10,0.4)',
                transition: 'all 0.2s',
              }}
            >
              <ExternalLink size={15} />
              Open Booking Page
            </a>
          )}
        </div>
      )}

      {/* ── Two column: Upcoming Releases + Quick Links ───────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Upcoming Releases */}
        <div
          style={{
            background: '#1E1E1E',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                color: '#F5F5F0',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CalendarDays size={18} color="#C8860A" />
              Upcoming Releases
            </h2>
          </div>

          {next3Releases.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
              No upcoming releases
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {next3Releases.map((release) => {
                const dtColor = DARSHAN_TYPE_COLORS[release.darshanType] ?? { bg: 'rgba(200,134,10,0.1)', color: '#C8860A' };
                return (
                  <div
                    key={release.id}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px', color: '#F5F5F0', marginBottom: '4px' }}>
                          {release.title}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
                          📅 {formatReleaseDateTime(release.releaseDate)}
                        </div>
                      </div>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: '100px',
                          background: dtColor.bg,
                          color: dtColor.color,
                          fontSize: '10px',
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {DARSHAN_TYPE_LABELS[release.darshanType] ?? release.darshanType}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <button
                        onClick={() => alert('Notification set! You will be reminded before this release.')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '5px 12px',
                          borderRadius: '8px',
                          background: 'rgba(200,134,10,0.08)',
                          border: '1px solid rgba(200,134,10,0.2)',
                          color: '#C8860A',
                          fontSize: '11px',
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          cursor: 'pointer',
                        }}
                      >
                        <Bell size={12} /> Set Reminder
                      </button>
                      {release.price && (
                        <span style={{ color: '#4ADE80', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '12px' }}>
                          ₹{release.price}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* TTD Quick Links */}
        <div
          style={{
            background: '#1E1E1E',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              color: '#F5F5F0',
              margin: '0 0 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ExternalLink size={18} color="#C8860A" />
            TTD Quick Links
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
            }}
          >
            {TTD_QUICK_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '14px 8px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(200,134,10,0.08)';
                  el.style.border = '1px solid rgba(200,134,10,0.25)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.border = '1px solid rgba(255,255,255,0.05)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '22px' }}>{link.icon}</span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {link.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Bookings ────────────────────────────────────────────────── */}
      <div
        style={{
          background: '#1E1E1E',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '16px',
              color: '#F5F5F0',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <TrendingUp size={18} color="#C8860A" />
            Recent Bookings
          </h2>
        </div>

        {recentBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎟️</div>
            <p style={{ margin: 0, fontFamily: "'Inter', sans-serif" }}>No bookings yet. Add your first booking from the History page.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentBookings.map((booking) => {
              const dtColor = DARSHAN_TYPE_COLORS[booking.darshanType] ?? { bg: 'rgba(200,134,10,0.1)', color: '#C8860A' };
              const stColor = STATUS_COLORS[booking.status] ?? { bg: 'rgba(107,114,128,0.12)', color: '#6B7280' };
              return (
                <div
                  key={booking.id}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px', color: '#F5F5F0', marginBottom: '4px' }}>
                      {DARSHAN_TYPE_LABELS[booking.darshanType] ?? booking.darshanType}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                      📅 {formatDate(booking.darshanDate)} · {booking.pilgrimIds.length} pilgrim{booking.pilgrimIds.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: dtColor.bg,
                        color: dtColor.color,
                        fontSize: '11px',
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {DARSHAN_TYPE_LABELS[booking.darshanType]}
                    </span>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '100px',
                        background: stColor.bg,
                        color: stColor.color,
                        fontSize: '11px',
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        textTransform: 'capitalize',
                      }}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
