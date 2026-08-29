import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Key, CheckCircle2, ExternalLink, Trash2 } from 'lucide-react';

export default function SettingsPage(): JSX.Element {
  const { settings, updateSettings, pilgrims, bookings, releases, trips } = useApp();
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importFile,    setImportFile]    = useState<File | null>(null);
  const [importStatus,  setImportStatus]  = useState('');
  const [geminiKey,     setGeminiKey]     = useState(() => localStorage.getItem('da_gemini_key') || '');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [keySaved,      setKeySaved]      = useState(false);

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
                  border: settings.theme === t ? '1.5px solid #C8860A' : '1px solid var(--color-border)',
                  background: settings.theme === t ? 'rgba(200,134,10,0.12)' : 'var(--color-card)',
                  color: settings.theme === t ? '#C8860A' : 'var(--color-text)',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize'
                }}
              >
                {t === 'light' ? '☀️ Light' : t === 'dark' ? '🌙 Dark' : '💻 System'}
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

      {/* AI & Integrations */}
      <div style={cardStyle}>
        <div style={sectionTitle}>🤖 AI &amp; Integrations</div>

        {/* Gemini API Key */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Key size={15} color="#F59E0B" />
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text)' }}>
              Google Gemini API Key
            </div>
            {geminiKey && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                fontSize: '10px', fontWeight: 700,
                color: '#22C55E', background: 'rgba(34,197,94,0.1)',
                padding: '2px 8px', borderRadius: '100px',
                border: '1px solid rgba(34,197,94,0.25)',
              }}>
                <CheckCircle2 size={10} /> Saved
              </span>
            )}
          </div>

          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
            Required for the <strong style={{ color: 'var(--color-text)' }}>AI Trip Planner</strong> feature.
            Get your <strong>free</strong> API key (1,500 requests/day) at{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#F59E0B', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
            >
              aistudio.google.com <ExternalLink size={10} />
            </a>
            {' '}→ Click <strong style={{ color: 'var(--color-text)' }}>"Create API Key"</strong> → Copy &amp; paste below.
            <br />
            <span style={{ color: '#22C55E', fontWeight: 600 }}>🛡️ Stored locally only — never sent to any server.</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type={showGeminiKey ? 'text' : 'password'}
              placeholder="Paste your Gemini API Key here (AIzaSy...)"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              style={{
                flex: 1, minWidth: '200px',
                padding: '10px 14px', borderRadius: '10px',
                background: geminiKey
                  ? 'rgba(34,197,94,0.06)'
                  : 'var(--color-card)',
                border: geminiKey
                  ? '1.5px solid rgba(34,197,94,0.4)'
                  : '1.5px solid var(--color-border)',
                color: 'var(--color-text)', fontSize: '13px',
                fontFamily: "'Inter', sans-serif", outline: 'none',
                transition: 'border 0.2s',
              }}
            />
            <button
              onClick={() => setShowGeminiKey(s => !s)}
              style={{
                padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
                background: 'rgba(200,134,10,0.08)',
                border: '1px solid rgba(200,134,10,0.2)',
                color: '#F59E0B', fontSize: '12px', fontWeight: 600,
                fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
              }}
            >
              {showGeminiKey ? '🙈 Hide' : '👁️ Show'}
            </button>
            <button
              onClick={() => {
                localStorage.setItem('da_gemini_key', geminiKey);
                setKeySaved(true);
                setTimeout(() => setKeySaved(false), 2500);
              }}
              style={{
                padding: '10px 18px', borderRadius: '10px', cursor: 'pointer',
                background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
                border: 'none', color: 'white',
                fontSize: '12px', fontWeight: 700,
                fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
                boxShadow: '0 3px 10px rgba(200,134,10,0.35)',
              }}
            >
              💾 Save Key
            </button>
            {geminiKey && (
              <button
                onClick={() => {
                  localStorage.removeItem('da_gemini_key');
                  setGeminiKey('');
                }}
                title="Remove API Key"
                style={{
                  padding: '10px 12px', borderRadius: '10px', cursor: 'pointer',
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: '#EF4444', fontSize: '12px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <Trash2 size={13} /> Remove
              </button>
            )}
          </div>

          {keySaved && (
            <div style={{
              marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px',
              color: '#22C55E', fontSize: '13px', fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
            }}>
              <CheckCircle2 size={15} /> API Key saved! AI Trip Planner is ready to use.
            </div>
          )}
        </div>

        {/* MakeMyTrip Affiliate Info */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '16px' }}>🏨</span>
            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--color-text)' }}>
              MakeMyTrip Affiliate
            </div>
            <span style={{
              fontSize: '10px', fontWeight: 700, color: '#FF5A00',
              background: 'rgba(255,90,0,0.1)', padding: '2px 8px',
              borderRadius: '100px', border: '1px solid rgba(255,90,0,0.2)',
            }}>
              Active ✓
            </span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Your MakeMyTrip affiliate link is embedded across the extension — in the Dashboard, Stays &amp; Travels, and AI Trip Planner.
            Every hotel booking made by your users through these links earns you <strong style={{ color: 'var(--color-text)' }}>3–5% commission</strong>.
          </div>
          <a
            href="https://bitli.in/sLSXr5T"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(255,90,0,0.12), rgba(255,140,0,0.08))',
              border: '1px solid rgba(255,100,0,0.25)', textDecoration: 'none',
              color: '#FF5A00', fontSize: '12px', fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            🔗 Preview Your Affiliate Link <ExternalLink size={11} />
          </a>
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
