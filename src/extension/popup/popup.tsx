import React, { useEffect, useState, useCallback } from 'react';
import { ExternalLink, Bell, Users, Clock, ChevronRight, Zap, Calendar } from 'lucide-react';
import type { PilgrimProfile, ReleaseEvent, CountdownState } from '../../shared/types';
import { getCountdown, pad2 } from '../../shared/utils/countdown';
import { DARSHAN_TYPE_LABELS } from '../../shared/utils/releaseCalendar';

// ─── Types ───────────────────────────────────────────────────────────────────

interface PopupState {
  pilgrims:        PilgrimProfile[];
  releases:        ReleaseEvent[];
  nextRelease:     ReleaseEvent | null;
  countdown:       CountdownState | null;
  notifHistory:    { id: string; title: string; firedAt: string }[];
  loading:         boolean;
}

// ─── Popup Component ─────────────────────────────────────────────────────────

export default function Popup(): JSX.Element {
  const [state, setState] = useState<PopupState>({
    pilgrims: [], releases: [], nextRelease: null,
    countdown: null, notifHistory: [], loading: true,
  });
  const [selectedPilgrim, setSelectedPilgrim] = useState<string | null>(null);
  const [autofillStatus,  setAutofillStatus]  = useState<string>('');

  // Load data from storage
  useEffect(() => {
    chrome.storage.local.get(
      ['da_pilgrims', 'da_releases', 'da_notif_history'],
      (data) => {
        const pilgrims:     PilgrimProfile[] = data['da_pilgrims']      || [];
        const releases:     ReleaseEvent[]   = data['da_releases']      || [];
        const notifHistory                   = data['da_notif_history'] || [];

        // Migrate old URLs to new TTD portal
        let migrated = false;
        const updatedReleases = releases.map((release) => {
          if (release.bookingUrl && release.bookingUrl.includes('ttdsevaonline.com')) {
            release.bookingUrl = 'https://ttdevasthanams.ap.gov.in';
            migrated = true;
          }
          return release;
        });

        if (migrated) {
          chrome.storage.local.set({ 'da_releases': updatedReleases });
        }

        const now         = new Date().toISOString();
        const upcoming    = updatedReleases
          .filter((r) => !r.isCompleted && r.releaseDate > now)
          .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
        const nextRelease = upcoming[0] || null;
        const countdown   = nextRelease
          ? getCountdown(nextRelease.releaseDate, nextRelease.title)
          : null;

        setState({ pilgrims, releases: updatedReleases, nextRelease, countdown, notifHistory, loading: false });
        if (pilgrims.length > 0) setSelectedPilgrim(pilgrims[0].id);
      },
    );
  }, []);

  // Live countdown tick
  useEffect(() => {
    if (!state.nextRelease) return;
    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        countdown: prev.nextRelease
          ? getCountdown(prev.nextRelease.releaseDate, prev.nextRelease.title)
          : null,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [state.nextRelease]);

  const openDashboard = useCallback(() => {
    chrome.runtime.sendMessage({ type: 'OPEN_DASHBOARD' });
  }, []);

  const openTTD = useCallback(() => {
    chrome.tabs.create({ url: 'https://ttdevasthanams.ap.gov.in' });
  }, []);

  const handleAutofill = useCallback(() => {
    const pilgrim = state.pilgrims.find((p) => p.id === selectedPilgrim);
    if (!pilgrim) {
      setAutofillStatus('No profile selected');
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;
      chrome.tabs.sendMessage(
        tab.id,
        { type: 'AUTOFILL_PILGRIM', payload: pilgrim },
        (res) => {
          if (res?.filledCount) {
            setAutofillStatus(`Filled ${res.filledCount} fields`);
          } else {
            setAutofillStatus('No form detected on this page');
          }
          setTimeout(() => setAutofillStatus(''), 3000);
        },
      );
    });
  }, [state.pilgrims, selectedPilgrim]);

  if (state.loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'200px' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:'32px', marginBottom:'8px' }}>🙏</div>
          <div style={{ color:'#888', fontSize:'13px' }}>Loading...</div>
        </div>
      </div>
    );
  }

  const { countdown, nextRelease, pilgrims, notifHistory } = state;

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'560px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A00 0%, #2D1500 100%)',
        padding: '16px 16px 0',
        borderBottom: '1px solid rgba(200,134,10,0.2)',
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{
              width:'36px', height:'36px', borderRadius:'10px',
              background:'linear-gradient(135deg,#C8860A,#F59E0B)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'18px', boxShadow:'0 2px 10px rgba(200,134,10,0.4)',
            }}>🙏</div>
            <div>
              <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:'15px', color:'#F5F5F0' }}>
                Darshan Assist
              </div>
              <div style={{ fontSize:'10px', color:'#C8860A', fontWeight:500 }}>
                TTD Booking Assistant
              </div>
            </div>
          </div>
          <button
            onClick={openDashboard}
            style={{
              background:'rgba(200,134,10,0.15)', border:'1px solid rgba(200,134,10,0.3)',
              color:'#C8860A', borderRadius:'8px', padding:'6px 10px',
              fontSize:'11px', fontWeight:600, cursor:'pointer',
              display:'flex', alignItems:'center', gap:'4px',
            }}
          >
            Dashboard <ExternalLink size={11} />
          </button>
        </div>

        {/* Countdown Strip */}
        {countdown && nextRelease && !countdown.isExpired ? (
          <div style={{
            background:'rgba(200,134,10,0.08)',
            borderRadius:'12px 12px 0 0',
            padding:'12px 14px',
            borderTop:'1px solid rgba(200,134,10,0.15)',
          }}>
            <div style={{ fontSize:'10px', color:'#888', marginBottom:'6px', textTransform:'uppercase', letterSpacing:'0.5px' }}>
              Next Release: {DARSHAN_TYPE_LABELS[nextRelease.darshanType] || nextRelease.darshanType}
            </div>
            <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
              {[
                { label:'Days',  val: countdown.days    },
                { label:'Hours', val: countdown.hours   },
                { label:'Min',   val: countdown.minutes },
                { label:'Sec',   val: countdown.seconds },
              ].map(({ label, val }) => (
                <div key={label} style={{ textAlign:'center' }}>
                  <div style={{
                    fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:'22px', color:'#F59E0B',
                    lineHeight:1, minWidth:'38px',
                    textShadow:'0 0 12px rgba(245,158,11,0.4)',
                  }}>
                    {pad2(val)}
                  </div>
                  <div style={{ fontSize:'9px', color:'#888', marginTop:'2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            background:'rgba(34,197,94,0.1)', borderRadius:'12px 12px 0 0',
            padding:'10px 14px', borderTop:'1px solid rgba(34,197,94,0.2)',
          }}>
            <div style={{ fontSize:'12px', color:'#22C55E', fontWeight:600 }}>
              🎟️ Tickets Released! Open TTD website now.
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ flex:1, padding:'14px', display:'flex', flexDirection:'column', gap:'12px' }}>

        {/* Autofill Section */}
        <div style={{
          background:'rgba(200,134,10,0.06)', border:'1px solid rgba(200,134,10,0.15)',
          borderRadius:'14px', padding:'14px',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'10px' }}>
            <Zap size={14} color='#C8860A' />
            <span style={{ fontSize:'12px', fontWeight:600, color:'#C8860A' }}>Smart Autofill</span>
          </div>

          {pilgrims.length === 0 ? (
            <div style={{ fontSize:'12px', color:'#888', textAlign:'center', padding:'8px 0' }}>
              No profiles yet.{' '}
              <span
                onClick={openDashboard}
                style={{ color:'#C8860A', cursor:'pointer', textDecoration:'underline' }}
              >
                Add pilgrims
              </span>
            </div>
          ) : (
            <>
              <select
                value={selectedPilgrim || ''}
                onChange={(e) => setSelectedPilgrim(e.target.value)}
                style={{
                  width:'100%', background:'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(200,134,10,0.2)', borderRadius:'8px',
                  color:'#F5F5F0', padding:'7px 10px', fontSize:'12px',
                  marginBottom:'8px', cursor:'pointer', outline:'none',
                }}
              >
                {pilgrims.map((p) => (
                  <option key={p.id} value={p.id} style={{ background:'#FFFFFF', color: '#0F172A' }}>
                    {p.name} ({p.relationship})
                  </option>
                ))}
              </select>

              <button
                onClick={handleAutofill}
                style={{
                  width:'100%', background:'linear-gradient(135deg,#C8860A,#F59E0B)',
                  border:'none', borderRadius:'10px', color:'white',
                  padding:'10px', fontSize:'13px', fontWeight:700,
                  cursor:'pointer', display:'flex', alignItems:'center',
                  justifyContent:'center', gap:'6px',
                  boxShadow:'0 2px 10px rgba(200,134,10,0.35)',
                }}
              >
                <Zap size={14} /> Autofill Form
              </button>

              {autofillStatus && (
                <div style={{ fontSize:'11px', color:'#22C55E', textAlign:'center', marginTop:'6px' }}>
                  {autofillStatus}
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Links */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {[
            { icon: '🎟️', label:'Book Darshan',  url:'https://ttdevasthanams.ap.gov.in' },
            { icon: '🏨', label:'Accommodation', url:'https://ttdevasthanams.ap.gov.in' },
            { icon: '🪔', label:'Seva Booking',  url:'https://ttdevasthanams.ap.gov.in' },
            { icon: '💛', label:'Srivani Trust', url:'https://ttdevasthanams.ap.gov.in' },
          ].map(({ icon, label, url }) => (
            <button
              key={label}
              onClick={() => chrome.tabs.create({ url })}
              style={{
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:'10px', padding:'10px 8px', color:'#F5F5F0',
                fontSize:'11px', fontWeight:500, cursor:'pointer',
                display:'flex', flexDirection:'column', alignItems:'center', gap:'4px',
              }}
            >
              <span style={{ fontSize:'18px' }}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px' }}>
          {[
            { icon: <Users size={14} />, val: pilgrims.length, label:'Profiles' },
            { icon: <Calendar size={14} />, val: state.releases.filter((r) => !r.isCompleted).length, label:'Upcoming' },
            { icon: <Bell size={14} />, val: notifHistory.length, label:'Alerts' },
          ].map(({ icon, val, label }) => (
            <div key={label} style={{
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'10px', padding:'10px 6px', textAlign:'center',
            }}>
              <div style={{ color:'#C8860A', display:'flex', justifyContent:'center', marginBottom:'4px' }}>
                {icon}
              </div>
              <div style={{ fontFamily:'Poppins,sans-serif', fontWeight:700, fontSize:'18px', color:'#F59E0B' }}>
                {val}
              </div>
              <div style={{ fontSize:'10px', color:'#888' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Recent Notifications */}
        {notifHistory.length > 0 && (
          <div>
            <div style={{ fontSize:'11px', color:'#888', marginBottom:'6px', display:'flex', alignItems:'center', gap:'4px' }}>
              <Bell size={11} /> Recent Alerts
            </div>
            {notifHistory.slice(0, 2).map((n) => (
              <div key={n.id} style={{
                background:'rgba(255,255,255,0.03)', borderRadius:'8px',
                padding:'8px 10px', marginBottom:'4px',
                borderLeft:'2px solid #C8860A',
              }}>
                <div style={{ fontSize:'11px', color:'#F5F5F0', fontWeight:500 }}>{n.title}</div>
                <div style={{ fontSize:'10px', color:'#888', marginTop:'2px' }}>
                  {new Date(n.firedAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding:'12px 16px',
        borderTop:'1px solid rgba(255,255,255,0.06)',
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <button
          onClick={openTTD}
          style={{
            background:'none', border:'1px solid rgba(200,134,10,0.3)',
            borderRadius:'8px', color:'#C8860A', padding:'8px 14px',
            fontSize:'12px', fontWeight:600, cursor:'pointer',
            display:'flex', alignItems:'center', gap:'4px',
          }}
        >
          <ExternalLink size={12} /> Open TTD
        </button>
        <button
          onClick={openDashboard}
          style={{
            background:'linear-gradient(135deg,#C8860A,#F59E0B)',
            border:'none', borderRadius:'8px', color:'white',
            padding:'8px 14px', fontSize:'12px', fontWeight:700,
            cursor:'pointer', display:'flex', alignItems:'center', gap:'4px',
          }}
        >
          Full Dashboard <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
