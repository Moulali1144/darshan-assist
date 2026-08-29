import React, { useState } from 'react';
import { ExternalLink, Hotel, Train, Plane, Tag } from 'lucide-react';

// ─── MakeMyTrip Affiliate Config ──────────────────────────────────────────────
const MMT_AFFILIATE_LINK = 'https://bitli.in/sLSXr5T';

// Deep-link builder for MakeMyTrip with affiliate tracking
function buildMMTHotelLink(checkin?: string, checkout?: string): string {
  const base = 'https://www.makemytrip.com/hotels/hotel-listing/';
  if (checkin && checkout) {
    const params = new URLSearchParams({
      checkin,
      checkout,
      city: 'Tirupati',
      country: 'IN',
      roomCount: '1',
      adultsCount: '2',
    });
    // Wrap with affiliate link for commission tracking
    return `${MMT_AFFILIATE_LINK}?redirect=${encodeURIComponent(`${base}?${params.toString()}`)}`;
  }
  return MMT_AFFILIATE_LINK;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface MMTWidgetProps {
  variant?: 'banner' | 'card' | 'button' | 'inline';
  checkin?: string;
  checkout?: string;
  title?: string;
  subtitle?: string;
}

// ─── MMT Banner (full-width, used in StaysTravels header) ────────────────────
function MMTBanner({ checkin, checkout }: { checkin?: string; checkout?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={buildMMTHotelLink(checkin, checkout)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 20px',
        borderRadius: '14px',
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,90,0,0.18), rgba(255,140,0,0.12))'
          : 'linear-gradient(135deg, rgba(255,90,0,0.1), rgba(255,140,0,0.07))',
        border: `1.5px solid ${hovered ? 'rgba(255,100,0,0.5)' : 'rgba(255,100,0,0.25)'}`,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? '0 6px 24px rgba(255,90,0,0.2)' : '0 2px 8px rgba(255,90,0,0.08)',
      }}
    >
      {/* Left: Logo + Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #FF5A00, #FF8C00)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(255,90,0,0.35)',
          fontSize: '18px',
        }}>
          🏨
        </div>
        <div>
          <div style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            color: 'var(--color-text)',
            lineHeight: 1.3,
          }}>
            Book Hotels Near Tirupati
          </div>
          <div style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            marginTop: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <Tag size={10} />
            Best prices via MakeMyTrip • Verified hotels
          </div>
        </div>
      </div>

      {/* Right: CTA */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'linear-gradient(135deg, #FF5A00, #FF8C00)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        boxShadow: '0 3px 10px rgba(255,90,0,0.35)',
        fontFamily: "'Inter', sans-serif",
      }}>
        Check Prices
        <ExternalLink size={12} />
      </div>
    </a>
  );
}

// ─── MMT Card (for Dashboard Quick Links grid) ────────────────────────────────
function MMTCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={MMT_AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px 12px',
        borderRadius: '14px',
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,90,0,0.15), rgba(255,140,0,0.08))'
          : 'var(--color-card)',
        border: `1px solid ${hovered ? 'rgba(255,100,0,0.4)' : 'var(--color-border)'}`,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-3px) scale(1.02)' : 'none',
        boxShadow: hovered ? '0 8px 28px rgba(255,90,0,0.2)' : 'var(--shadow-card)',
        textAlign: 'center',
      }}
    >
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #FF5A00, #FF8C00)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        boxShadow: '0 4px 14px rgba(255,90,0,0.3)',
      }}>
        🏨
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: '11px',
        color: 'var(--color-text)',
        lineHeight: 1.3,
      }}>
        Hotels via
      </div>
      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        color: '#FF5A00',
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: '0.3px',
      }}>
        MakeMyTrip
      </div>
    </a>
  );
}

// ─── MMT Button (inline, post-paywall) ───────────────────────────────────────
function MMTButton({ title, subtitle }: { title?: string; subtitle?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={MMT_AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 18px',
        borderRadius: '12px',
        background: hovered
          ? 'linear-gradient(135deg, #FF5A00, #FF8C00)'
          : 'linear-gradient(135deg, rgba(255,90,0,0.12), rgba(255,140,0,0.08))',
        border: `1.5px solid ${hovered ? '#FF5A00' : 'rgba(255,100,0,0.3)'}`,
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        color: hovered ? 'white' : 'var(--color-text)',
        boxShadow: hovered ? '0 6px 20px rgba(255,90,0,0.35)' : 'none',
      }}
    >
      <span style={{ fontSize: '20px' }}>🏨</span>
      <div>
        <div style={{
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
        }}>
          {title || 'Find Hotels via MakeMyTrip'}
        </div>
        <div style={{
          fontSize: '11px',
          opacity: 0.75,
          fontFamily: "'Inter', sans-serif",
          marginTop: '1px',
        }}>
          {subtitle || 'Best deals for pilgrims near Tirupati'}
        </div>
      </div>
      <ExternalLink size={14} style={{ marginLeft: 'auto', flexShrink: 0 }} />
    </a>
  );
}

// ─── MMT Inline Strip (tiny horizontal, for planner results) ─────────────────
function MMTInline() {
  return (
    <a
      href={MMT_AFFILIATE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 12px',
        borderRadius: '100px',
        background: 'linear-gradient(135deg, rgba(255,90,0,0.12), rgba(255,140,0,0.08))',
        border: '1px solid rgba(255,100,0,0.25)',
        textDecoration: 'none',
        cursor: 'pointer',
        color: '#FF5A00',
        fontSize: '11px',
        fontWeight: 700,
        fontFamily: "'Inter', sans-serif",
        transition: 'all 0.2s',
      }}
    >
      🏨 Book on MakeMyTrip
      <ExternalLink size={10} />
    </a>
  );
}

// ─── Multi-Service Affiliate Section (Hotels + Flights + Trains) ─────────────
export function MMTServiceStrip() {
  const services = [
    {
      icon: <Hotel size={16} />,
      emoji: '🏨',
      label: 'Hotels',
      sub: 'Near Tirupati',
      link: MMT_AFFILIATE_LINK,
      gradient: 'linear-gradient(135deg, #FF5A00, #FF8C00)',
    },
    {
      icon: <Train size={16} />,
      emoji: '🚂',
      label: 'Trains',
      sub: 'To Tirupati',
      link: 'https://www.makemytrip.com/railways/',
      gradient: 'linear-gradient(135deg, #0057B8, #0080FF)',
    },
    {
      icon: <Plane size={16} />,
      emoji: '✈️',
      label: 'Flights',
      sub: 'Renigunta Airport',
      link: 'https://www.makemytrip.com/flights/',
      gradient: 'linear-gradient(135deg, #8B0000, #C8860A)',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {services.map((s) => (
        <a
          key={s.label}
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '14px 8px',
            borderRadius: '12px',
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = '';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow-card)';
          }}
        >
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: s.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
          }}>
            {s.emoji}
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '12px', color: 'var(--color-text)' }}>
            {s.label}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
            {s.sub}
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Main Export — renders chosen variant ────────────────────────────────────
export default function MMTWidget({ variant = 'banner', checkin, checkout, title, subtitle }: MMTWidgetProps): JSX.Element {
  switch (variant) {
    case 'card':   return <MMTCard />;
    case 'button': return <MMTButton title={title} subtitle={subtitle} />;
    case 'inline': return <MMTInline />;
    case 'banner':
    default:       return <MMTBanner checkin={checkin} checkout={checkout} />;
  }
}
