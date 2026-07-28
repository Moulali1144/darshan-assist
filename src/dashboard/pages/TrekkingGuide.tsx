import React, { useState } from 'react';
import { MapPin, Compass, ShieldCheck, Clock, Award, Footprints, AlertTriangle } from 'lucide-react';
import { getStoredLanguage, TRANSLATIONS } from '../../shared/i18n';

interface Checkpoint {
  step: number;
  name: string;
  facilities: string[];
  description: string;
}

const ALIPIRI_CHECKPOINTS: Checkpoint[] = [
  { step: 1, name: 'Alipiri Padala Mandapam (Garuda Statue)', facilities: ['Luggage Counter', 'Free Water', 'Footwear Storage'], description: 'Starting point of Alipiri footpath. Submit main luggage at TTD free counter — it will be delivered to Tirumala hills for free!' },
  { step: 500, name: 'Gali Gopuram Ascent (Steep Initial Steps)', facilities: ['Rest Benches', 'Shaded Canopy'], description: 'Initial steep climb of around 500 steps. Take slow, steady steps.' },
  { step: 1200, name: 'Gali Gopuram Tower (Major Landmark)', facilities: ['Divya Darshan Counter', 'Snacks & Milk', 'Medical Post'], description: 'Flat area atop first hill. Free Divya Darshan token scan checkpoint.' },
  { step: 2000, name: 'Deer Park (Maanava Teertham)', facilities: ['Drinking Water', 'Rest Chairs', 'Toilet Complex'], description: 'Scenic park with wild deer. Very peaceful resting point for families.' },
  { step: 2850, name: 'Mokalla Parvatham (Steep Knee-Breaker Hill)', facilities: ['First Aid Post', 'Energy Drinks'], description: 'Famous steep climb where devotees pray on knees. Takes around 20-30 mins.' },
  { step: 3550, name: 'Sri Bedi Anjaneya Swamy Temple (Tirumala Peak)', facilities: ['Luggage Collection', 'Laddu Counters', 'Rest Halls'], description: 'Trek complete! Collect your deposited luggage at counter #3 near temple.' }
];

const METTU_CHECKPOINTS: Checkpoint[] = [
  { step: 1, name: 'Srivari Mettu Base (Chandragiri Road)', facilities: ['Divya Darshan Counter', 'Free Parking', 'Luggage Desk'], description: 'Traditional historic footpath used by Sri Venkateswara Swamy. Open 6:00 AM to 5:00 PM.' },
  { step: 500, name: 'Initial Shaded Steps', facilities: ['Drinking Water', 'Benches'], description: 'Covered roofing entire way protecting from rain and sun.' },
  { step: 1200, name: 'Midway Pavilion (Rest Stop)', facilities: ['Toilets', 'Medical Help', 'Refreshment Stall'], description: 'Halfway point. Great spot to catch breath and drink water.' },
  { step: 2388, name: 'Tirumala Mettu Entrance', facilities: ['Luggage Pick-up', 'Laddu Counters'], description: 'Fastest footpath trek complete in 1.5 to 2 hours!' }
];

export default function TrekkingGuidePage(): JSX.Element {
  const [selectedRoute, setSelectedRoute] = useState<'alipiri' | 'mettu'>('alipiri');
  const lang = getStoredLanguage();
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const checkpoints = selectedRoute === 'alipiri' ? ALIPIRI_CHECKPOINTS : METTU_CHECKPOINTS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      
      <div style={{ background: 'linear-gradient(135deg, rgba(200,134,10,0.15), rgba(245,158,11,0.05))', border: '1px solid rgba(200,134,10,0.3)', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Footprints size={28} color='#F59E0B' />
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 700, margin: 0 }}>
            {t.trekkingTitle}
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-muted)', maxWidth: '650px' }}>
          {t.trekkingSubtitle}
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            onClick={() => setSelectedRoute('alipiri')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: selectedRoute === 'alipiri' ? '1px solid #F59E0B' : '1px solid var(--color-border)',
              background: selectedRoute === 'alipiri' ? 'linear-gradient(135deg, #C8860A, #F59E0B)' : 'rgba(255,255,255,0.05)',
              color: selectedRoute === 'alipiri' ? 'white' : 'var(--color-text-muted)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <Compass size={16} /> Alipiri Footpath (3,550 Steps)
          </button>

          <button
            onClick={() => setSelectedRoute('mettu')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: selectedRoute === 'mettu' ? '1px solid #F59E0B' : '1px solid var(--color-border)',
              background: selectedRoute === 'mettu' ? 'linear-gradient(135deg, #C8860A, #F59E0B)' : 'rgba(255,255,255,0.05)',
              color: selectedRoute === 'mettu' ? 'white' : 'var(--color-text-muted)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            <MapPin size={16} /> Srivari Mettu (2,388 Steps)
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Footprints size={24} color='#F59E0B' />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total Steps</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>
              {selectedRoute === 'alipiri' ? '3,550 Steps' : '2,388 Steps'}
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Clock size={24} color='#3B82F6' />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Est. Duration</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>
              {selectedRoute === 'alipiri' ? '3.5 - 4.5 Hours' : '1.5 - 2.5 Hours'}
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Award size={24} color='#22C55E' />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Free Laddu Token</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>1 Free Laddu</div>
          </div>
        </div>

        <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={24} color='#EAB308' />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Luggage Delivery</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>Free TTD Van</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 20px', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📍 Footpath Milestones & Facilities Timeline
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {checkpoints.map((cp, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '72px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(200,134,10,0.12)',
                border: '1px solid rgba(200,134,10,0.3)',
                color: '#F59E0B',
                fontWeight: 700,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                Step {cp.step}
              </div>

              <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>
                  {cp.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '8px', lineHeight: '1.4' }}>
                  {cp.description}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cp.facilities.map((fac, i) => (
                    <span key={i} className='badge badge-saffron' style={{ fontSize: '10.5px' }}>
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '14px', padding: '18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <AlertTriangle size={20} color='#EF4444' style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
          <strong style={{ color: '#EF4444', display: 'block', marginBottom: '4px' }}>Important TTD Footpath Rules:</strong>
          • Traditional dress code is mandatory for Divya Darshan token holders.<br />
          • Free Divya Darshan tokens are issued on first-come, first-served basis at Alipiri / Srivari Mettu counters.<br />
          • Deposit luggage at the base counters early in the morning for prompt delivery at Tirumala hills.
        </div>
      </div>

    </div>
  );
}
