import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { NotificationRule, DarshanType, NotificationTiming } from '../../shared/types';
import { DARSHAN_TYPE_LABELS } from '../../shared/utils/releaseCalendar';

const uuid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const ALL_TIMINGS: { value: NotificationTiming; label: string }[] = [
  { value: '1_day',      label: '1 Day before'    },
  { value: '12_hours',   label: '12 Hours before' },
  { value: '6_hours',    label: '6 Hours before'  },
  { value: '1_hour',     label: '1 Hour before'   },
  { value: '30_minutes', label: '30 Min before'   },
  { value: '15_minutes', label: '15 Min before'   },
  { value: '10_minutes', label: '10 Min before'   },
  { value: '5_minutes',  label: '5 Min before'    },
  { value: '1_minute',   label: '1 Min before'    },
];

const ALL_DARSHAN_TYPES: { value: DarshanType; label: string; color: string }[] = [
  { value: 'ssd_300',       label: '₹300 Special Darshan', color: '#C8860A' },
  { value: 'accommodation', label: 'Accommodation',         color: '#2563EB' },
  { value: 'srivani',       label: 'Srivani Trust',         color: '#7C3AED' },
  { value: 'seva',          label: 'Seva Booking',          color: '#16A34A' },
  { value: 'special_entry', label: 'Special Entry',         color: '#EA580C' },
  { value: 'festival',      label: 'Festival Tickets',      color: '#8B0000' },
];

export default function NotificationsPage(): JSX.Element {
  const { releases } = useApp();
  const [rules, setRules] = useState<NotificationRule[]>(() => {
    try {
      const raw = localStorage.getItem('da_notif_rules');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [editRule, setEditRule] = useState<NotificationRule | null>(null);

  // Form state
  const [ruleName,    setRuleName]    = useState('');
  const [selTypes,    setSelTypes]    = useState<DarshanType[]>(['ssd_300']);
  const [selTimings,  setSelTimings]  = useState<NotificationTiming[]>(['1_day','1_hour','15_minutes']);

  const saveRules = (updated: NotificationRule[]) => {
    setRules(updated);
    localStorage.setItem('da_notif_rules', JSON.stringify(updated));
    // Also sync to Chrome storage if available
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ 'da_notif_rules': updated });
      chrome.runtime.sendMessage({ type: 'REFRESH_ALARMS' }).catch(() => {});
    }
  };

  const toggleType = (type: DarshanType) =>
    setSelTypes((t) => t.includes(type) ? t.filter((x) => x !== type) : [...t, type]);

  const toggleTiming = (timing: NotificationTiming) =>
    setSelTimings((t) => t.includes(timing) ? t.filter((x) => x !== timing) : [...t, timing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const rule: NotificationRule = {
      id:          editRule?.id || uuid(),
      name:        ruleName || 'My Notification Rule',
      enabled:     true,
      darshanTypes: selTypes,
      timings:     selTimings,
      channels:    ['desktop'],
      createdAt:   editRule?.createdAt || now,
    };
    const updated = editRule
      ? rules.map((r) => r.id === editRule.id ? rule : r)
      : [...rules, rule];
    saveRules(updated);
    setShowForm(false);
    setEditRule(null);
    setRuleName('');
    setSelTypes(['ssd_300']);
    setSelTimings(['1_day','1_hour','15_minutes']);
  };

  const toggleRule = (id: string) => {
    const updated = rules.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r);
    saveRules(updated);
  };

  const deleteRule = (id: string) => {
    saveRules(rules.filter((r) => r.id !== id));
  };

  const upcomingReleases = releases.filter((r) => !r.isCompleted && new Date(r.releaseDate) > new Date());

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-card)', border: '1px solid var(--color-border)',
    borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-card)',
  };

  const toggleStyle = (active: boolean, color = '#C8860A'): React.CSSProperties => ({
    padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
    border: `1px solid ${active ? color : 'rgba(107,114,128,0.3)'}`,
    background: active ? `${color}22` : 'transparent',
    color: active ? color : 'var(--color-text-muted)',
    transition: 'all 0.15s',
  });

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '28px', margin: '0 0 6px' }}>
            🔔 Notifications
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '15px' }}>
            Configure alerts before ticket releases
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={async () => {
              const title = '🙏 Darshan Assist - TTD Quota Alert';
              const message = '₹300 Special Entry Darshan tickets release in 15 minutes! Open portal to prepare Tatkal autofill.';
              if (typeof chrome !== 'undefined' && chrome.notifications) {
                chrome.notifications.create({
                  type: 'basic',
                  iconUrl: 'icons/icon128.png',
                  title,
                  message,
                  priority: 2,
                });
                alert('✅ Live Chrome Desktop Notification sent! Check your system tray.');
              } else if ('Notification' in window) {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                  new Notification(title, { body: message });
                  alert('✅ Live Desktop Notification sent!');
                } else {
                  alert('⚠️ Please enable notifications in your browser settings.');
                }
              } else {
                alert('ℹ️ Notification triggered: ' + message);
              }
            }}
            style={{
              padding: '12px 18px',
              fontSize: '13.5px',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'rgba(200,134,10,0.12)',
              border: '1px solid rgba(200,134,10,0.3)',
              color: '#F59E0B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            🔔 Test Live Notification
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            + Add Rule
          </button>
        </div>
      </div>

      {/* Upcoming Releases Preview */}
      {upcomingReleases.length > 0 && (
        <div style={{ ...cardStyle, marginBottom: '24px', background: 'rgba(200,134,10,0.05)', borderColor: 'rgba(200,134,10,0.2)' }}>
          <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#C8860A', marginBottom: '12px' }}>
            🎟️ Upcoming Releases ({upcomingReleases.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {upcomingReleases.slice(0, 3).map((r) => (
              <div key={r.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', background: 'rgba(200,134,10,0.08)',
                borderRadius: '10px', gap: '12px',
              }}>
                <div style={{ fontWeight: 500, fontSize: '14px' }}>{r.title}</div>
                <div style={{ fontSize: '12px', color: '#C8860A', fontWeight: 600, flexShrink: 0 }}>
                  {new Date(r.releaseDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules List */}
      {rules.length === 0 && !showForm ? (
        <div style={{
          ...cardStyle, textAlign: 'center', padding: '60px 20px',
          border: '2px dashed rgba(200,134,10,0.3)',
        }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔔</div>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '20px', marginBottom: '8px' }}>
            No Notification Rules
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            Create a rule to receive desktop alerts before TTD ticket releases.
          </p>
          <button onClick={() => setShowForm(true)} className="btn-primary" style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '12px' }}>
            Create First Rule
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {rules.map((rule) => (
            <div key={rule.id} style={{
              ...cardStyle,
              borderLeft: `4px solid ${rule.enabled ? '#C8860A' : '#6B7280'}`,
              opacity: rule.enabled ? 1 : 0.7,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px' }}>
                      {rule.name}
                    </div>
                    <span className={`badge ${rule.enabled ? 'badge-green' : ''}`} style={
                      !rule.enabled ? { background:'rgba(107,114,128,0.15)', color:'#6B7280' } : {}
                    }>
                      {rule.enabled ? '● Active' : '○ Paused'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {rule.darshanTypes.map((t) => (
                      <span key={t} className="badge badge-saffron" style={{ fontSize: '11px' }}>
                        {DARSHAN_TYPE_LABELS[t] || t}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Alerts: {rule.timings.map((t) => ALL_TIMINGS.find((x) => x.value === t)?.label).join(' · ')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    style={{
                      ...toggleStyle(rule.enabled, '#22C55E'),
                      fontSize: '12px',
                    }}
                  >
                    {rule.enabled ? 'Pause' : 'Enable'}
                  </button>
                  <button
                    onClick={() => deleteRule(rule.id)}
                    style={{
                      background: 'transparent', border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '8px', padding: '6px 12px', fontSize: '12px',
                      fontWeight: 600, color: '#EF4444', cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Rule Form */}
      {showForm && (
        <div style={{ ...cardStyle, marginTop: '24px', border: '1px solid rgba(200,134,10,0.25)' }}>
          <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '20px', color: '#C8860A' }}>
            ➕ Create Notification Rule
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#C8860A', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Rule Name
              </label>
              <input
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="e.g., SSD Darshan Alerts"
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(200,134,10,0.2)', borderRadius: '10px',
                  padding: '10px 14px', fontSize: '14px', color: 'inherit', fontFamily: 'Inter,sans-serif',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#C8860A', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Darshan Types
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ALL_DARSHAN_TYPES.map((t) => (
                  <button key={t.value} type="button" onClick={() => toggleType(t.value)} style={toggleStyle(selTypes.includes(t.value), t.color)}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#C8860A', display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Alert Timings
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ALL_TIMINGS.map((t) => (
                  <button key={t.value} type="button" onClick={() => toggleTiming(t.value)} style={toggleStyle(selTimings.includes(t.value))}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', padding: '10px 24px', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', color: 'var(--color-text-muted)',
              }}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ padding: '10px 28px', fontSize: '14px', borderRadius: '10px' }}>
                Create Rule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Instructions */}
      <div style={{ ...cardStyle, marginTop: '24px', background: 'rgba(59,130,246,0.05)', borderColor: 'rgba(59,130,246,0.15)' }}>
        <div style={{ fontWeight: 700, fontSize: '14px', color: '#2563EB', marginBottom: '8px' }}>
          ℹ️ How Notifications Work
        </div>
        <ul style={{ color: 'var(--color-text-muted)', fontSize: '13px', paddingLeft: '18px', lineHeight: '1.8', margin: 0 }}>
          <li>Desktop notifications fire automatically at your selected times before each release.</li>
          <li>Clicking a notification opens the TTD booking page directly.</li>
          <li>Extension must be installed and Chrome must be running for notifications to work.</li>
          <li>You complete the booking manually — the assistant only reminds and autofills.</li>
        </ul>
      </div>
    </div>
  );
}
