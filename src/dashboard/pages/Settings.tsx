import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SettingsPage(): JSX.Element {
  const { settings, updateSettings, pilgrims, bookings, releases, trips } = useApp();
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importFile,    setImportFile]    = useState<File | null>(null);
  const [importStatus,  setImportStatus]  = useState('');

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-card)', border: '1px solid var(--color-border)',
    borderRadius: '16px', padding: '24px', boxShadow: 'var(--shadow-card)',
    marginBottom: '20px',
  };

  const sectionTitle: React.CSSProperties = {
    fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px',
    color: 'var(--color-text)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px',
  };

  const settingRow: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 0', borderBottom: '1px solid var(--color-border)',
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: '48px', height: '26px', borderRadius: '100px', border: 'none',
        background: value ? 'linear-gradient(135deg,#C8860A,#F59E0B)' : 'rgba(107,114,128,0.3)',
        cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', background: 'white',
        position: 'absolute', top: '3px',
        left: value ? '25px' : '3px',
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }} />
    </button>
  );

  const handleExport = () => {
    const data = { version: 1, exportDate: new Date().toISOString(), pilgrims, bookings, releases, trips };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `darshan-assist-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  const handleImport = async () => {
    if (!importFile) return;
    try {
      const text = await importFile.text();
      const data = JSON.parse(text);
      if (!data.version || !data.pilgrims) throw new Error('Invalid backup file');
      setImportStatus(`✅ Found ${data.pilgrims?.length || 0} pilgrims, ${data.bookings?.length || 0} bookings. Import functionality coming in next update.`);
    } catch {
      setImportStatus('❌ Invalid backup file. Please select a valid Darshan Assist backup.');
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '28px', margin: '0 0 6px' }}>
          ⚙️ Settings
        </h1>
        <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '15px' }}>
          Customize your Darshan Assist experience
        </p>
      </div>

      {/* Appearance */}
      <div style={cardStyle}>
        <div style={sectionTitle}>🎨 Appearance</div>
        <div style={settingRow}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Theme</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Choose light, dark, or system default</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['light','dark','system'] as const).map((t) => (
              <button
                key={t}
                onClick={() => updateSettings({ theme: t })}
                style={{
                  padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  border: settings.theme === t ? '1.5px solid #C8860A' : '1px solid rgba(107,114,128,0.3)',
                  background: settings.theme === t ? 'rgba(200,134,10,0.12)' : 'transparent',
                  color: settings.theme === t ? '#C8860A' : 'var(--color-text-muted)',
                }}
              >
                {t === 'light' ? '☀️ Light' : t === 'dark' ? '🌙 Dark' : '🖥️ System'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={cardStyle}>
        <div style={sectionTitle}>🔔 Notifications</div>
        <div style={settingRow}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Enable Notifications</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Receive alerts before ticket releases</div>
          </div>
          <Toggle value={settings.notificationsEnabled} onChange={(v) => updateSettings({ notificationsEnabled: v })} />
        </div>
        <div style={{ ...settingRow, borderBottom: 'none' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Auto Backup</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Automatically backup data weekly</div>
          </div>
          <Toggle value={settings.autoBackupEnabled} onChange={(v) => updateSettings({ autoBackupEnabled: v })} />
        </div>
      </div>

      {/* Security */}
      <div style={cardStyle}>
        <div style={sectionTitle}>🔐 Security & Privacy</div>
        <div style={settingRow}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Encrypt Sensitive Data</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>AES-256 encrypt ID numbers and contact info</div>
          </div>
          <Toggle value={settings.encryptionEnabled} onChange={(v) => updateSettings({ encryptionEnabled: v })} />
        </div>
        <div style={{ ...settingRow, borderBottom: 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>Local-First Storage</div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              All your data is stored locally in your browser. No personal data is sent to any server.
            </div>
          </div>
          <span className="badge badge-green">✅ Local Storage Only</span>
        </div>
      </div>

      {/* Data Management */}
      <div style={cardStyle}>
        <div style={sectionTitle}>💾 Data Management</div>

        {/* Export */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>Export Backup</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            Download all your profiles, bookings, and trip data as a JSON file.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={handleExport} className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '10px' }}>
              📥 Export Backup
            </button>
            {exportSuccess && <span style={{ color: '#22C55E', fontSize: '13px', fontWeight: 600 }}>✅ Backup downloaded!</span>}
          </div>
        </div>

        {/* Import */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>Import Backup</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            Restore from a previously exported backup file.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="file"
              accept=".json"
              onChange={(e) => setImportFile(e.target.files?.[0] || null)}
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,134,10,0.2)',
                borderRadius: '10px', padding: '8px 14px', fontSize: '13px', color: 'inherit',
                cursor: 'pointer',
              }}
            />
            {importFile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={handleImport} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '10px' }}>
                  📤 Import File
                </button>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{importFile.name}</span>
              </div>
            )}
            {importStatus && (
              <div style={{ fontSize: '13px', color: importStatus.startsWith('✅') ? '#22C55E' : '#EF4444', marginTop: '4px' }}>
                {importStatus}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(200,134,10,0.08), rgba(245,158,11,0.03))', borderColor: 'rgba(200,134,10,0.2)' }}>
        <div style={sectionTitle}>🙏 About Darshan Assist</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
          <div><strong style={{ color: 'var(--color-text)' }}>Version:</strong> 1.0.0</div>
          <div><strong style={{ color: 'var(--color-text)' }}>Purpose:</strong> Help devotees book TTD Darshan tickets faster</div>
          <div><strong style={{ color: 'var(--color-text)' }}>Policy:</strong> This extension does not bypass TTD policies or automate booking.</div>
          <div style={{ marginTop: '8px', padding: '10px 14px', background: 'rgba(34,197,94,0.08)', borderRadius: '8px', borderLeft: '3px solid #22C55E' }}>
            🛡️ All data stays local. No accounts, no servers, no tracking.
          </div>
        </div>
      </div>
    </div>
  );
}
