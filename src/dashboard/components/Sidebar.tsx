import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  Map,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { to: '/',              icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/profiles',      icon: Users,           label: 'Pilgrims' },
  { to: '/calendar',      icon: Calendar,        label: 'Release Calendar' },
  { to: '/history',       icon: BookOpen,        label: 'Booking History' },
  { to: '/trip-planner',  icon: Map,             label: 'Trip Planner' },
  { to: '/notifications', icon: Bell,            label: 'Notifications' },
  { to: '/analytics',     icon: BarChart3,       label: 'Analytics' },
  { to: '/settings',      icon: Settings,        label: 'Settings' },
];

export default function Sidebar({ open, onToggle }: SidebarProps): JSX.Element {
  return (
    <aside
      className="sidebar"
      style={{
        width: open ? '260px' : '72px',
        minHeight: '100vh',
        background: '#0F0F0F',
        borderRight: '1px solid rgba(200,134,10,0.15)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        flexShrink: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: open ? '28px 20px 24px' : '28px 0 24px',
          borderBottom: '1px solid rgba(200,134,10,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: open ? 'flex-start' : 'center',
          transition: 'padding 0.25s',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0,
            boxShadow: '0 4px 16px rgba(200,134,10,0.35)',
          }}
        >
          🙏
        </div>
        {open && (
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '16px',
                background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
              }}
            >
              Darshan Assist
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                color: 'rgba(255,255,255,0.35)',
                whiteSpace: 'nowrap',
                marginTop: '2px',
                letterSpacing: '0.4px',
              }}
            >
              TTD Booking Assistant
            </div>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: open ? '11px 20px' : '11px 0',
              justifyContent: open ? 'flex-start' : 'center',
              textDecoration: 'none',
              borderRadius: '0',
              position: 'relative',
              transition: 'background 0.15s, color 0.15s',
              background: isActive
                ? 'linear-gradient(90deg, rgba(200,134,10,0.2) 0%, rgba(200,134,10,0.08) 100%)'
                : 'transparent',
              color: isActive ? '#F59E0B' : 'rgba(255,255,255,0.55)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: isActive ? 600 : 400,
              fontSize: '13.5px',
            })}
            className="sidebar-nav-link"
          >
            {({ isActive }) => (
              <>
                {/* Active left border indicator */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      background: 'linear-gradient(180deg, #C8860A, #F59E0B)',
                      borderRadius: '0 3px 3px 0',
                    }}
                  />
                )}
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  style={{
                    flexShrink: 0,
                    color: isActive ? '#F59E0B' : 'rgba(255,255,255,0.45)',
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(245,158,11,0.5))' : 'none',
                  }}
                />
                {open && (
                  <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Toggle + Version */}
      <div
        style={{
          padding: '16px 0',
          borderTop: '1px solid rgba(200,134,10,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Toggle button */}
        <button
          onClick={onToggle}
          style={{
            width: open ? 'calc(100% - 32px)' : '40px',
            height: '36px',
            background: 'rgba(200,134,10,0.08)',
            border: '1px solid rgba(200,134,10,0.2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(200,134,10,0.7)',
            transition: 'all 0.2s',
            gap: '6px',
          }}
          title={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          {open && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
              Collapse
            </span>
          )}
        </button>

        {open && (
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.5px',
            }}
          >
            Version 1.0.0
          </div>
        )}
      </div>

      {/* Hover style injected */}
      <style>{`
        .sidebar-nav-link:hover {
          background: rgba(200,134,10,0.1) !important;
          color: rgba(255,255,255,0.8) !important;
        }
      `}</style>
    </aside>
  );
}
