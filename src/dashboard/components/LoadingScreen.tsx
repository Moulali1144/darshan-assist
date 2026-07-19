import React from 'react';

export default function LoadingScreen(): JSX.Element {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0F0F0F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        zIndex: 9999,
      }}
    >
      {/* Ambient glow backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(200,134,10,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo + Spinner Container */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer spinning ring */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#C8860A',
            borderRightColor: 'rgba(200,134,10,0.3)',
            animation: 'da-spin 1.2s linear infinite',
          }}
        />
        {/* Inner spinning ring (counter) */}
        <div
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid transparent',
            borderBottomColor: '#F59E0B',
            borderLeftColor: 'rgba(245,158,11,0.2)',
            animation: 'da-spin-reverse 1.8s linear infinite',
          }}
        />

        {/* Golden circle logo */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 0 40px rgba(200,134,10,0.5), 0 0 80px rgba(200,134,10,0.15)',
            animation: 'da-pulse 2s ease-in-out infinite',
          }}
        >
          🙏
        </div>
      </div>

      {/* Text section */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: '28px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          Darshan Assist
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            margin: 0,
            letterSpacing: '0.5px',
            animation: 'da-blink 1.5s ease-in-out infinite',
          }}
        >
          Loading Darshan Assist...
        </p>
      </div>

      {/* Dot progress indicators */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#C8860A',
              animation: `da-dot-bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Keyframe styles injected */}
      <style>{`
        @keyframes da-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes da-spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes da-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(200,134,10,0.5), 0 0 80px rgba(200,134,10,0.15); }
          50%       { box-shadow: 0 0 60px rgba(200,134,10,0.7), 0 0 120px rgba(200,134,10,0.25); }
        }
        @keyframes da-blink {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes da-dot-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%           { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
