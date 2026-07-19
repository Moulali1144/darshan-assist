import React from 'react';
import { Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import type { PilgrimProfile } from '../../shared/types';

interface PilgrimCardProps {
  pilgrim: PilgrimProfile;
  onEdit: () => void;
  onDelete: () => void;
  onSelect?: () => void;
  selected?: boolean;
}

const RELATIONSHIP_LABELS: Record<string, string> = {
  self:    'Self',
  spouse:  'Spouse',
  child:   'Child',
  parent:  'Parent',
  sibling: 'Sibling',
  other:   'Other',
};

const ID_TYPE_LABELS: Record<string, string> = {
  aadhaar:         'Aadhaar',
  pan:             'PAN Card',
  passport:        'Passport',
  voter:           'Voter ID',
  driving_license: 'Driving License',
  ration_card:     'Ration Card',
};

const GENDER_ICONS: Record<string, string> = {
  male:   '♂',
  female: '♀',
  other:  '⚧',
};

function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getAvatarGradient(name: string): string {
  const gradients = [
    'linear-gradient(135deg, #C8860A, #F59E0B)',
    'linear-gradient(135deg, #8B0000, #C0392B)',
    'linear-gradient(135deg, #7C3AED, #A855F7)',
    'linear-gradient(135deg, #059669, #10B981)',
    'linear-gradient(135deg, #2563EB, #3B82F6)',
    'linear-gradient(135deg, #D97706, #FBBF24)',
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  return gradients[idx];
}

export default function PilgrimCard({ pilgrim, onEdit, onDelete, onSelect, selected }: PilgrimCardProps): JSX.Element {
  const age = calculateAge(pilgrim.dateOfBirth);
  const initials = pilgrim.name.trim().split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div
      onClick={onSelect}
      style={{
        background: '#1E1E1E',
        border: selected
          ? '1.5px solid rgba(200,134,10,0.7)'
          : '1.5px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '20px',
        cursor: onSelect ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        position: 'relative',
        boxShadow: selected
          ? '0 0 0 3px rgba(200,134,10,0.15), 0 4px 24px rgba(0,0,0,0.4)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        overflow: 'hidden',
      }}
    >
      {/* Selected glow overlay */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(200,134,10,0.04), transparent)',
            pointerEvents: 'none',
            borderRadius: '16px',
          }}
        />
      )}

      {/* Selected check badge */}
      {selected && (
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <CheckCircle2 size={18} color="#F59E0B" />
        </div>
      )}

      {/* Top row: Avatar + Info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
        {/* Avatar */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: getAvatarGradient(pilgrim.name),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 16px rgba(200,134,10,0.25)',
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '18px',
            color: '#fff',
          }}
        >
          {initials}
        </div>

        {/* Name + basic info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              color: '#F5F5F0',
              margin: '0 0 4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {pilgrim.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
              {GENDER_ICONS[pilgrim.gender]} {pilgrim.gender.charAt(0).toUpperCase() + pilgrim.gender.slice(1)}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
              Age {age}
            </span>
          </div>
          {pilgrim.city && (
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: "'Inter', sans-serif", marginTop: '2px' }}>
              📍 {pilgrim.city}, {pilgrim.state}
            </div>
          )}
        </div>
      </div>

      {/* Badges row */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {/* Relationship badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 10px',
            borderRadius: '100px',
            background: 'rgba(200,134,10,0.12)',
            color: '#C8860A',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            border: '1px solid rgba(200,134,10,0.25)',
          }}
        >
          {RELATIONSHIP_LABELS[pilgrim.relationship] ?? pilgrim.relationship}
        </span>
        {/* ID type badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 10px',
            borderRadius: '100px',
            background: 'rgba(59,130,246,0.1)',
            color: '#60A5FA',
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            border: '1px solid rgba(59,130,246,0.2)',
          }}
        >
          🪪 {ID_TYPE_LABELS[pilgrim.idType] ?? pilgrim.idType}
        </span>
      </div>

      {/* Contact info */}
      {pilgrim.mobile && (
        <div
          style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '11px',
            fontFamily: "'Inter', sans-serif",
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          📱 {pilgrim.mobile}
        </div>
      )}

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '12px' }} />

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '7px 14px',
            borderRadius: '8px',
            background: 'rgba(200,134,10,0.1)',
            border: '1px solid rgba(200,134,10,0.25)',
            color: '#C8860A',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,134,10,0.2)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,134,10,0.1)';
          }}
        >
          <Pencil size={13} />
          Edit
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '7px 14px',
            borderRadius: '8px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#EF4444',
            fontSize: '12px',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.18)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)';
          }}
        >
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
}
