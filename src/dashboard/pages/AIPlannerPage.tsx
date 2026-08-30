import React, { useState, useRef } from 'react';
import { Sparkles, Send, Download, RefreshCw, AlertCircle, Key, ChevronDown, ChevronUp, MapPin, Clock, Users, Star } from 'lucide-react';
import MMTWidget, { MMTServiceStrip } from '../components/MMTWidget';

// ─── Types ────────────────────────────────────────────────────────────────────
interface TripFormData {
  startCity: string;
  duration: string;
  groupType: string;
  groupSize: string;
  darshanType: string;
  budget: string;
  travelMode: string;
  specialNeeds: string;
}

const INITIAL_FORM: TripFormData = {
  startCity:   'Hyderabad',
  duration:    '2',
  groupType:   'family',
  groupSize:   '4',
  darshanType: '300_darshan',
  budget:      'mid',
  travelMode:  'road',
  specialNeeds: '',
};

const START_CITIES = ['Hyderabad', 'Chennai', 'Bangalore', 'Vijayawada', 'Mumbai', 'Delhi', 'Kolkata', 'Coimbatore', 'Kochi', 'Other'];
const DARSHAN_TYPES = [
  { value: '300_darshan', label: '₹300 SSD Darshan (General)' },
  { value: 'srivani',     label: 'Srivani Trust Darshan (₹1,000)' },
  { value: 'vip',         label: 'VIP Break Darshan (VVIP)' },
  { value: 'accommodation',label: 'With Accommodation (TTD Rooms)' },
];
const TRAVEL_MODES = [
  { value: 'road',  label: '🚗 Road (Car/Bus)' },
  { value: 'train', label: '🚂 Train to Tirupati' },
  { value: 'flight',label: '✈️ Flight to Renigunta' },
];
const BUDGET_OPTS = [
  { value: 'budget', label: '💰 Budget (₹1,000–1,500/day/person)' },
  { value: 'mid',    label: '💳 Mid-range (₹2,000–3,500/day/person)' },
  { value: 'luxury', label: '👑 Luxury (₹5,000+/day/person)' },
];

// ─── Gemini Prompt Builder ────────────────────────────────────────────────────
function buildPrompt(form: TripFormData): string {
  const darshanLabel = DARSHAN_TYPES.find(d => d.value === form.darshanType)?.label || form.darshanType;
  const budgetLabel  = BUDGET_OPTS.find(b => b.value === form.budget)?.label || form.budget;
  const modeLabel    = TRAVEL_MODES.find(m => m.value === form.travelMode)?.label || form.travelMode;

  return `You are a knowledgeable Tirumala Tirupati pilgrimage travel expert. Create a detailed, practical ${form.duration}-day trip itinerary for a ${form.groupType} group of ${form.groupSize} people traveling from ${form.startCity} to Tirupati/Tirumala.

Details:
- Darshan type: ${darshanLabel}
- Budget: ${budgetLabel}
- Travel mode: ${modeLabel}
- Special needs: ${form.specialNeeds || 'None'}

Format your response as a beautiful day-by-day itinerary with these exact sections:

## 🗓️ Trip Overview
Brief 2-line summary of the trip plan.

## 💰 Estimated Budget Breakdown
| Expense | Amount |
|---------|--------|
[Fill 5-7 rows with realistic INR estimates]
**Total Estimate: ₹XXXX per person**

## 📅 Day-by-Day Itinerary
For each day, use this format:
### Day X: [Day Title]
- **[Time]**: [Activity with specific details and tips]
(List 5-7 time slots per day)

## 🏨 Recommended Stays
List 2-3 hotels near Tirupati with price range and brief note. Include a line: "📱 Compare & Book on MakeMyTrip for best prices"

## ⚠️ Important TTD Rules & Tips
5 bullet points of practical advice specific to this darshan type.

## 🛕 Nearby Temples to Visit
3-4 temples near Tirupati with brief description.

Keep language warm, practical, and devotee-friendly. Include realistic timings. Mention TTD dress code (no shorts, no sleeveless). Be specific about Tirumala hill roads, token systems, and queue management.`;
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function AIPlannerPage(): JSX.Element {
  const [apiKey, setApiKey]     = useState(() => localStorage.getItem('da_gemini_key') || '');
  const [showKey, setShowKey]   = useState(false);
  const [form, setForm]         = useState<TripFormData>(INITIAL_FORM);
  const [loading, setLoading]   = useState(false);
  const [itinerary, setItinerary] = useState<string>('');
  const [error, setError]       = useState<string>('');
  const [showForm, setShowForm] = useState(true);
  const resultRef               = useRef<HTMLDivElement>(null);

  const saveKey = (k: string) => {
    setApiKey(k);
    localStorage.setItem('da_gemini_key', k);
  };

  const updateForm = (field: keyof TripFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ─── Call Gemini API ──────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API Key in Settings or the field above.');
      return;
    }
    setLoading(true);
    setError('');
    setItinerary('');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: buildPrompt(form) }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 3000,
            },
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) throw new Error('Empty response from Gemini. Please try again.');

      setItinerary(text);
      setShowForm(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error. Please check your API key.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ─── Download as text ────────────────────────────────────────────────────
  const handleDownload = () => {
    const blob = new Blob([itinerary], { type: 'text/plain;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `Tirupati_Trip_Plan_${form.duration}days.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Render markdown-ish text ─────────────────────────────────────────────
  const renderItinerary = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '17px',
            fontWeight: 700,
            color: '#F59E0B',
            margin: '24px 0 10px',
            paddingBottom: '6px',
            borderBottom: '1px solid rgba(245,158,11,0.2)',
          }}>
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: '16px 0 6px',
          }}>
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('| ') && line.endsWith('|')) {
        // Parse table cells
        const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
        // Skip separator rows: | --- | :---: | ----: | etc.
        if (cells.every(c => /^:?-{2,}:?$/.test(c))) return null;
        // Detect header: next line is a separator row
        const nextLine = lines[i + 1] || '';
        const nextCells = nextLine.split('|').map(c => c.trim()).filter(c => c !== '');
        const isHeader = nextCells.length > 0 && nextCells.every(c => /^:?-{2,}:?$/.test(c));
        return (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
            gap: '1px',
            background: 'rgba(200,134,10,0.15)',
          }}>
            {cells.map((cell, j) => {
              // Remove ** bold markers, preserve ₹ and other symbols
              const cleaned = cell.replace(/\*\*/g, '').trim();
              return (
                <div key={j} style={{
                  padding: '8px 14px',
                  background: isHeader ? 'rgba(200,134,10,0.12)' : 'var(--color-card)',
                  fontSize: '13px',
                  fontWeight: isHeader ? 700 : 400,
                  color: isHeader ? '#C8860A' : 'var(--color-text)',
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.4,
                }}>
                  {cleaned}
                </div>
              );
            })}
          </div>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const content = line.slice(2);
        return (
          <div key={i} style={{
            display: 'flex',
            gap: '8px',
            margin: '4px 0',
            fontSize: '13px',
            color: 'var(--color-text)',
            fontFamily: "'Inter', sans-serif",
          }}>
            <span style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={i} style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '13px',
            color: '#F59E0B',
            margin: '8px 0 4px',
          }}>
            {line.replace(/\*\*/g, '')}
          </div>
        );
      }
      if (line.includes('MakeMyTrip')) {
        return (
          <div key={i} style={{ margin: '10px 0' }}>
            <MMTWidget variant="button" title="Compare & Book Hotels on MakeMyTrip" subtitle="Best deals for Tirupati pilgrims" />
          </div>
        );
      }
      if (line.trim() === '') return <div key={i} style={{ height: '4px' }} />;

      return (
        <p key={i} style={{
          fontSize: '13px',
          color: 'var(--color-text)',
          fontFamily: "'Inter', sans-serif",
          margin: '4px 0',
          lineHeight: 1.6,
        }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
        />
      );
    }).filter(Boolean);
  };

  // ─── Field Styles ─────────────────────────────────────────────────────────
  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    background: 'var(--color-card)',
    border: '1.5px solid var(--color-border)',
    color: 'var(--color-text)',
    fontSize: '13px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    fontFamily: "'Inter', sans-serif",
    marginBottom: '6px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={{ maxWidth: '860px', paddingBottom: '40px' }}>

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', boxShadow: '0 4px 16px rgba(200,134,10,0.4)',
          }}>
            🤖
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '26px', fontWeight: 800,
              background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', margin: 0, lineHeight: 1.2,
            }}>
              AI Trip Planner
            </h1>
            <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '13px' }}>
              Powered by Google Gemini • Personalized Tirumala Darshan itineraries in seconds
            </p>
          </div>
        </div>

        {/* Powered by badge */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
          {[
            { icon: '🤖', text: 'Gemini 1.5 Flash AI' },
            { icon: '🗺️', text: 'Day-by-Day Itinerary' },
            { icon: '💰', text: 'Budget Breakdown' },
            { icon: '🏨', text: 'Hotel Suggestions' },
          ].map(b => (
            <span key={b.text} style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 10px', borderRadius: '100px',
              background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)',
              fontSize: '11px', fontWeight: 600, color: '#F59E0B',
              fontFamily: "'Inter', sans-serif",
            }}>
              {b.icon} {b.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── API Key Setup ────────────────────────────────────────────────────── */}
      {!apiKey && (
        <div style={{
          padding: '16px 20px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(200,134,10,0.1), rgba(245,158,11,0.05))',
          border: '1.5px solid rgba(200,134,10,0.3)',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <Key size={18} color="#F59E0B" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--color-text)' }}>
                Free Gemini API Key Required
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '3px' }}>
                Get your free key in 2 minutes at{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#F59E0B', fontWeight: 600 }}>
                  aistudio.google.com
                </a>
                {' '}→ "Create API Key". Free tier: 1,500 requests/day. Stored locally only.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="Paste your Gemini API Key here (AIzaSy...)"
              value={apiKey}
              onChange={(e) => saveKey(e.target.value)}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: '10px',
                background: 'var(--color-card)', border: '1.5px solid var(--color-border)',
                color: 'var(--color-text)', fontSize: '13px',
                fontFamily: "'Inter', sans-serif", outline: 'none',
              }}
            />
            <button onClick={() => setShowKey(s => !s)} style={{
              padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
              background: 'rgba(200,134,10,0.1)', border: '1.5px solid rgba(200,134,10,0.2)',
              color: '#F59E0B', fontSize: '12px', fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
            }}>
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      )}

      {/* ── Travel Form ──────────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '18px',
        overflow: 'hidden',
        marginBottom: '20px',
        boxShadow: 'var(--shadow-card)',
      }}>
        {/* Form Header */}
        <button
          onClick={() => setShowForm(s => !s)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: showForm ? '1px solid var(--color-border)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="#F59E0B" />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '15px', color: 'var(--color-text)' }}>
              Plan My Tirumala Trip
            </span>
          </div>
          {showForm ? <ChevronUp size={18} color="var(--color-text-muted)" /> : <ChevronDown size={18} color="var(--color-text-muted)" />}
        </button>

        {showForm && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

              {/* Starting City */}
              <div style={fieldStyle}>
                <label style={labelStyle}>🏠 Starting City</label>
                <select style={selectStyle} value={form.startCity} onChange={e => updateForm('startCity', e.target.value)}>
                  {START_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Duration */}
              <div style={fieldStyle}>
                <label style={labelStyle}>📅 Trip Duration</label>
                <select style={selectStyle} value={form.duration} onChange={e => updateForm('duration', e.target.value)}>
                  {['1', '2', '3', '4', '5'].map(d => (
                    <option key={d} value={d}>{d} Day{d !== '1' ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              {/* Group Type */}
              <div style={fieldStyle}>
                <label style={labelStyle}>👥 Group Type</label>
                <select style={selectStyle} value={form.groupType} onChange={e => updateForm('groupType', e.target.value)}>
                  <option value="solo">Solo Pilgrim</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                  <option value="large_group">Large Group / Tour</option>
                  <option value="senior">Senior Citizens</option>
                </select>
              </div>

              {/* Group Size */}
              <div style={fieldStyle}>
                <label style={labelStyle}>🔢 Group Size</label>
                <select style={selectStyle} value={form.groupSize} onChange={e => updateForm('groupSize', e.target.value)}>
                  {['1', '2', '3', '4', '5', '6', '8', '10', '15', '20+'].map(n => (
                    <option key={n} value={n}>{n} {parseInt(n) === 1 ? 'person' : 'people'}</option>
                  ))}
                </select>
              </div>

              {/* Darshan Type */}
              <div style={fieldStyle}>
                <label style={labelStyle}>🛕 Darshan Type</label>
                <select style={selectStyle} value={form.darshanType} onChange={e => updateForm('darshanType', e.target.value)}>
                  {DARSHAN_TYPES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>

              {/* Budget */}
              <div style={fieldStyle}>
                <label style={labelStyle}>💰 Budget Level</label>
                <select style={selectStyle} value={form.budget} onChange={e => updateForm('budget', e.target.value)}>
                  {BUDGET_OPTS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>

              {/* Travel Mode */}
              <div style={fieldStyle}>
                <label style={labelStyle}>🚌 Travel Mode</label>
                <select style={selectStyle} value={form.travelMode} onChange={e => updateForm('travelMode', e.target.value)}>
                  {TRAVEL_MODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>

              {/* Special Needs */}
              <div style={fieldStyle}>
                <label style={labelStyle}>♿ Special Needs (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., wheelchair, elderly, infant..."
                  value={form.specialNeeds}
                  onChange={e => updateForm('specialNeeds', e.target.value)}
                  style={{
                    ...selectStyle,
                    appearance: 'none',
                  }}
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '20px',
                padding: '14px 24px',
                borderRadius: '12px',
                background: loading
                  ? 'rgba(200,134,10,0.3)'
                  : 'linear-gradient(135deg, #C8860A, #F59E0B)',
                border: 'none',
                color: 'white',
                fontSize: '15px',
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: loading ? 'none' : '0 6px 20px rgba(200,134,10,0.4)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Generating your personalized itinerary...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate My Trip Plan with AI ✨
                  <Send size={16} />
                </>
              )}
            </button>

            {/* Error */}
            {error && (
              <div style={{
                marginTop: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
              }}>
                <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div style={{ fontSize: '13px', color: '#EF4444', fontFamily: "'Inter', sans-serif" }}>
                  {error}
                  {error.includes('API') && (
                    <div style={{ marginTop: '6px' }}>
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                        style={{ color: '#F59E0B', fontWeight: 600, fontSize: '12px' }}>
                        → Get your free Gemini API key here
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Travel Services Widget ────────────────────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '10px',
          fontFamily: "'Inter', sans-serif",
        }}>
          🏨 Book Your Travel
        </div>
        <MMTServiceStrip />
      </div>

      {/* ── Generated Itinerary ───────────────────────────────────────────────── */}
      {itinerary && (
        <div ref={resultRef} style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* Result Header */}
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(200,134,10,0.06), rgba(245,158,11,0.03))',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Star size={18} color="#F59E0B" />
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '15px', color: 'var(--color-text)' }}>
                  Your AI-Generated Trip Plan
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px', display: 'flex', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <MapPin size={10} /> {form.startCity} → Tirupati
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={10} /> {form.duration} Days
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Users size={10} /> {form.groupSize} People
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setShowForm(true); setItinerary(''); }} style={{
                padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
                background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)',
                color: '#F59E0B', fontSize: '12px', fontWeight: 600,
                fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <RefreshCw size={12} /> Regenerate
              </button>
              <button onClick={handleDownload} style={{
                padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
                background: 'linear-gradient(135deg, #C8860A, #F59E0B)', border: 'none',
                color: 'white', fontSize: '12px', fontWeight: 600,
                fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '5px',
                boxShadow: '0 3px 10px rgba(200,134,10,0.35)',
              }}>
                <Download size={12} /> Download
              </button>
            </div>
          </div>

          {/* Itinerary Content */}
          <div style={{ padding: '24px', lineHeight: 1.7 }}>
            {renderItinerary(itinerary)}

            {/* MMT Banner at the bottom of result */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
              <MMTWidget variant="banner" />
            </div>
          </div>
        </div>
      )}

      {/* ── Spin animation ────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
