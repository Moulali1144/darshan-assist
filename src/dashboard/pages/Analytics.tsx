import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Users, BookOpen, Map, Bell, TrendingUp, Activity } from 'lucide-react';
import { DARSHAN_TYPE_LABELS } from '../../shared/utils/releaseCalendar';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

// ─── Color Palette ────────────────────────────────────────────────────────────

const CHART_COLORS = ['#C8860A', '#F59E0B', '#8B0000', '#22C55E', '#3B82F6', '#A78BFA', '#FB923C'];

const STATUS_META: Record<string, { color: string; label: string; emoji: string }> = {
  confirmed:  { color: '#22C55E', label: 'Confirmed', emoji: '✅' },
  pending:    { color: '#EAB308', label: 'Pending',   emoji: '⏳' },
  cancelled:  { color: '#EF4444', label: 'Cancelled', emoji: '❌' },
  completed:  { color: '#3B82F6', label: 'Completed', emoji: '🎉' },
  expired:    { color: '#6B7280', label: 'Expired',   emoji: '🕐' },
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1A1A1A', border: '1px solid rgba(200,134,10,0.3)', borderRadius: '10px', padding: '10px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <p style={{ color: '#F59E0B', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '13px', margin: '0 0 4px' }}>{label}</p>
      <p style={{ color: '#F5F5F0', fontFamily: "'Inter', sans-serif", fontSize: '13px', margin: 0 }}>{payload[0].value} booking{payload[0].value !== 1 ? 's' : ''}</p>
    </div>
  );
}

function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1A1A1A', border: '1px solid rgba(200,134,10,0.3)', borderRadius: '10px', padding: '10px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <p style={{ color: '#F59E0B', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '13px', margin: '0 0 4px' }}>{payload[0].name}</p>
      <p style={{ color: '#F5F5F0', fontFamily: "'Inter', sans-serif", fontSize: '13px', margin: 0 }}>{payload[0].value} booking{payload[0].value !== 1 ? 's' : ''}</p>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color, sub }: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px',
        padding: '20px', display: 'flex', alignItems: 'center', gap: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)', transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'; }}
    >
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={22} color="#fff" />
      </div>
      <div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '28px', color: '#F5F5F0', lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{label}</div>
        {sub && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '2px' }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── Section Card wrapper ─────────────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
      <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '16px', color: '#F5F5F0', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Analytics(): JSX.Element {
  const { pilgrims, bookings, trips } = useApp();

  // ── Bookings per month ──────────────────────────────────────────────────────
  const bookingsPerMonth = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => {
      const d = new Date(b.darshanDate);
      const key = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
      map[key] = (map[key] ?? 0) + 1;
    });
    // Return sorted by date
    return Object.entries(map)
      .map(([month, count]) => ({ month, count }))
      .slice(-8); // last 8 months
  }, [bookings]);

  // ── Darshan type distribution ───────────────────────────────────────────────
  const typeDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => {
      map[b.darshanType] = (map[b.darshanType] ?? 0) + 1;
    });
    return Object.entries(map).map(([type, count]) => ({
      name: DARSHAN_TYPE_LABELS[type] ?? type,
      value: count,
    }));
  }, [bookings]);

  // ── Status breakdown ────────────────────────────────────────────────────────
  const statusBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => {
      map[b.status] = (map[b.status] ?? 0) + 1;
    });
    return Object.entries(map).map(([status, count]) => ({ status, count, pct: bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0 }));
  }, [bookings]);

  // ── Recent activity ─────────────────────────────────────────────────────────
  const recentActivity = useMemo(() => {
    return [...bookings]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);
  }, [bookings]);

  const upcomingTrips = trips.filter((t) => new Date(t.startDate) >= new Date()).length;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>

      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '28px', margin: '0 0 6px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          📊 Analytics
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", fontSize: '14px', margin: 0 }}>
          Insights and statistics for your pilgrimage journey
        </p>
      </div>

      {/* ── Stats Row ─────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard icon={Users}     label="Total Pilgrims"    value={pilgrims.length}    color="linear-gradient(135deg, #C8860A, #F59E0B)" />
        <StatCard icon={BookOpen}  label="Total Bookings"    value={bookings.length}    color="linear-gradient(135deg, #7C3AED, #A855F7)" />
        <StatCard icon={Map}       label="Upcoming Trips"    value={upcomingTrips}      color="linear-gradient(135deg, #059669, #10B981)" />
        <StatCard icon={Bell}      label="Notifications Sent" value={0}                 color="linear-gradient(135deg, #2563EB, #3B82F6)" sub="Coming soon" />
      </div>

      {/* ── Charts Row ────────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '28px' }}>

        {/* Bar Chart: Bookings per month */}
        <SectionCard title="Bookings per Month" icon="📈">
          {bookingsPerMonth.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
              No booking data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bookingsPerMonth} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: "'Inter', sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: "'Inter', sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(200,134,10,0.06)' }} />
                <Bar dataKey="count" fill="#C8860A" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {bookingsPerMonth.map((_, i) => (
                    <Cell key={i} fill={i === bookingsPerMonth.length - 1 ? '#F59E0B' : '#C8860A'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </SectionCard>

        {/* Pie Chart: Darshan type distribution */}
        <SectionCard title="Darshan Type Distribution" icon="🥧">
          {typeDistribution.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🥧</div>
              No data to display
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {typeDistribution.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif", fontSize: '11px' }}>{value}</span>
                  )}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </SectionCard>
      </div>

      {/* ── Bottom Row: Status breakdown + Timeline ───────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>

        {/* Status breakdown */}
        <SectionCard title="Status Breakdown" icon="📋">
          {statusBreakdown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>No bookings yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {statusBreakdown.map(({ status, count, pct }) => {
                const meta = STATUS_META[status] ?? { color: '#6B7280', label: status, emoji: '' };
                return (
                  <div key={status}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                        {meta.emoji} {meta.label}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 700, color: meta.color }}>{count}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{pct}%</span>
                      </div>
                    </div>
                    <div style={{ height: '6px', borderRadius: '100px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: meta.color,
                          borderRadius: '100px',
                          transition: 'width 1s ease',
                          boxShadow: `0 0 8px ${meta.color}60`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* Recent activity timeline */}
        <SectionCard title="Recent Activity" icon="⚡">
          {recentActivity.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Inter', sans-serif", fontSize: '13px' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎟️</div>
              No recent activity
            </div>
          ) : (
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(180deg, #C8860A, rgba(200,134,10,0.1))' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {recentActivity.map((booking, i) => {
                  const meta = STATUS_META[booking.status] ?? { color: '#6B7280', label: booking.status, emoji: '' };
                  return (
                    <div key={booking.id} style={{ position: 'relative', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      {/* Dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-20px',
                          top: '4px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: i === 0 ? '#F59E0B' : '#1E1E1E',
                          border: `2px solid ${i === 0 ? '#F59E0B' : 'rgba(200,134,10,0.3)'}`,
                          boxShadow: i === 0 ? '0 0 8px rgba(245,158,11,0.6)' : 'none',
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '13px', color: '#F5F5F0', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {DARSHAN_TYPE_LABELS[booking.darshanType] ?? booking.darshanType}
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                            {new Date(booking.darshanDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                          <span style={{ padding: '1px 8px', borderRadius: '100px', background: `${meta.color}18`, color: meta.color, fontSize: '10px', fontWeight: 600 }}>
                            {meta.emoji} {meta.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
