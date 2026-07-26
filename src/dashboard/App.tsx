import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/Dashboard';
import ProfilesPage from './pages/Profiles';
import CalendarPage from './pages/Calendar';
import HistoryPage from './pages/History';
import TripPlannerPage from './pages/TripPlanner';
import StaysTravelsPage from './pages/StaysTravels';
import NotificationsPage from './pages/Notifications';
import AnalyticsPage from './pages/Analytics';
import SettingsPage from './pages/Settings';
import LoadingScreen from './components/LoadingScreen';

// ─── App Shell ───────────────────────────────────────────────────────────────

function AppShell(): JSX.Element {
  const { loading, settings } = useApp();
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
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefersDark ? root.classList.add('dark') : root.classList.remove('dark');
    }
  }, [settings?.theme]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="dashboard-layout">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />
      <main className="main-content animate-fade-in">
        <Routes>
          <Route path="/"              element={<DashboardPage />} />
          <Route path="/profiles"      element={<ProfilesPage />} />
          <Route path="/calendar"      element={<CalendarPage />} />
          <Route path="/history"       element={<HistoryPage />} />
          <Route path="/trip-planner"  element={<TripPlannerPage />} />
          <Route path="/stays-travels" element={<StaysTravelsPage />} />
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
      <HashRouter>
        <AppShell />
      </HashRouter>
    </AppProvider>
  );
}
