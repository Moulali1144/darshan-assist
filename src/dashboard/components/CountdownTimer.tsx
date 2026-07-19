import React, { useState, useEffect } from 'react';
import { getCountdown, pad2 } from '../../shared/utils/countdown';

interface CountdownTimerProps {
  releaseDate: string;
  title: string;
  size?: 'sm' | 'lg';
}

export default function CountdownTimer({ releaseDate, title, size = 'lg' }: CountdownTimerProps): JSX.Element {
  const [countdown, setCountdown] = useState(() => getCountdown(releaseDate, title));

  useEffect(() => {
    setCountdown(getCountdown(releaseDate, title));
    const interval = setInterval(() => {
      setCountdown(getCountdown(releaseDate, title));
    }, 1000);
    return () => clearInterval(interval);
  }, [releaseDate, title]);

  if (countdown.isExpired) {
    if (size === 'sm') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 10px',
            borderRadius: '100px',
            background: 'rgba(139,0,0,0.15)',
            color: '#EF4444',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          🔴 Released!
        </span>
      );
    }
    return (
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
        <p style={{ color: '#F59E0B', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '18px', margin: 0 }}>
          Tickets Released!
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: '4px 0 0' }}>Booking is now open</p>
      </div>
    );
  }

  const units = [
    { label: 'Days',    value: countdown.days },
    { label: 'Hours',   value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  // ── Small / inline size ──────────────────────────────────────────────────────
  if (size === 'sm') {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(200,134,10,0.08)',
          border: '1px solid rgba(200,134,10,0.2)',
          borderRadius: '8px',
          padding: '5px 10px',
        }}
      >
        {units.map(({ label, value }, idx) => (
          <React.Fragment key={label}>
            {idx > 0 && (
              <span style={{ color: 'rgba(200,134,10,0.5)', fontWeight: 700, fontSize: '13px' }}>:</span>
            )}
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#F59E0B',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {pad2(value)}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '9px',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {label[0]}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  // ── Large size ───────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {units.map(({ label, value }, idx) => (
        <React.Fragment key={label}>
          {idx > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingBottom: '24px',
                color: 'rgba(200,134,10,0.5)',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: '28px',
                lineHeight: 1,
              }}
            >
              :
            </div>
          )}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {/* Digit box */}
            <div
              style={{
                width: '72px',
                height: '72px',
                background: 'rgba(200,134,10,0.1)',
                border: '1.5px solid rgba(200,134,10,0.3)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 0 20px rgba(200,134,10,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
                overflow: 'hidden',
              }}
            >
              {/* Subtle top highlight */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(200,134,10,0.4), transparent)',
                }}
              />
              <span
                className="countdown-digit"
                style={{
                  fontSize: '32px',
                  color: '#F59E0B',
                  textShadow: '0 0 20px rgba(245,158,11,0.5)',
                }}
              >
                {pad2(value)}
              </span>
            </div>
            {/* Label */}
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
              }}
            >
              {label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
