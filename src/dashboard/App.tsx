import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/Dashboard';
import ProfilesPage from './pages/Profiles';
import CalendarPage from './pages/Calendar';
import HistoryPage from './pages/History';
import TripPlannerPage from './pages/TripPlanner';
import StaysTravelsPage from './pages/StaysTravels';
import TrekkingGuidePage from './pages/TrekkingGuide';
import NotificationsPage from './pages/Notifications';
import AnalyticsPage from './pages/Analytics';
import SettingsPage from './pages/Settings';
import LoadingScreen from './components/LoadingScreen';
import { LANGUAGE_NAMES, Language } from '../shared/i18n';
import { Globe } from 'lucide-react';

// ─── App Shell ───────────────────────────────────────────────────────────────

function AppShell(): JSX.Element {
  const { loading, settings } = useApp();
  const { lang: currentLang, setLang } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Apply dark mode class to <html>
  useEffect(() => {
    const theme = settings?.theme;
    const root  = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefersDark ? root.classList.add('dark') : root.classList.remove('dark');
    }
  }, [settings?.theme]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="dashboard-layout">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <main className="main-content animate-fade-in" style={{ position: 'relative' }}>
        
        {/* Global Language Selector Header Pill */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '24px',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '100px',
          padding: '4px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          <Globe size={14} color="#F59E0B" />
          <select
            value={currentLang}
            onChange={(e) => setLang(e.target.value as Language)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {(Object.keys(LANGUAGE_NAMES) as Language[]).map((langKey) => (
              <option key={langKey} value={langKey} style={{ background: '#1A1A1A', color: 'white' }}>
                {LANGUAGE_NAMES[langKey]}
              </option>
            ))}
          </select>
        </div>

        <Routes>
          <Route path="/"              element={<DashboardPage />} />
          <Route path="/profiles"      element={<ProfilesPage />} />
          <Route path="/calendar"      element={<CalendarPage />} />
          <Route path="/history"       element={<HistoryPage />} />
          <Route path="/trip-planner"  element={<TripPlannerPage />} />
          <Route path="/stays-travels" element={<StaysTravelsPage />} />
          <Route path="/trekking-guide"element={<TrekkingGuidePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/analytics"     element={<AnalyticsPage />} />
          <Route path="/settings"      element={<SettingsPage />} />
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App(): JSX.Element {
  return (
    <AppProvider>
      <LanguageProvider>
        <HashRouter>
          <AppShell />
        </HashRouter>
      </LanguageProvider>
    </AppProvider>
  );
}
