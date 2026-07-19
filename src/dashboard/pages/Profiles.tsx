import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { PilgrimProfile, Gender, Relationship, IDType } from '../../shared/types';

const uuid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const STATES = [
  'Andhra Pradesh','Telangana','Tamil Nadu','Karnataka','Kerala','Maharashtra',
  'Delhi','Uttar Pradesh','Gujarat','Rajasthan','Madhya Pradesh','West Bengal',
  'Bihar','Odisha','Punjab','Haryana','Himachal Pradesh','Uttarakhand',
  'Jharkhand','Chhattisgarh','Assam','Other',
];

const ID_TYPES: { value: IDType; label: string }[] = [
  { value: 'aadhaar',        label: 'Aadhaar Card' },
  { value: 'pan',            label: 'PAN Card' },
  { value: 'passport',       label: 'Passport' },
  { value: 'voter',          label: 'Voter ID' },
  { value: 'driving_license',label: 'Driving Licence' },
  { value: 'ration_card',    label: 'Ration Card' },
];

interface PilgrimFormData {
  name: string; gender: Gender; dateOfBirth: string;
  mobile: string; email: string; address: string; city: string;
  state: string; pincode: string; idType: IDType; idNumber: string;
  relationship: Relationship; emergencyContact: string; emergencyPhone: string;
}

const EMPTY_FORM: PilgrimFormData = {
  name:'', gender:'male', dateOfBirth:'', mobile:'', email:'',
  address:'', city:'', state:'Andhra Pradesh', pincode:'',
  idType:'aadhaar', idNumber:'', relationship:'self',
  emergencyContact:'', emergencyPhone:'',
};

function getAge(dob: string): number {
  if (!dob) return 0;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function Avatar({ name, size = 48 }: { name: string; size?: number }): JSX.Element {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontFamily: 'Poppins, sans-serif',
      fontWeight: 700, fontSize: size * 0.38,
      flexShrink: 0, boxShadow: '0 2px 10px rgba(200,134,10,0.3)',
    }}>
      {name ? name.charAt(0).toUpperCase() : '?'}
    </div>
  );
}

function PilgrimModal({
  pilgrim, onSave, onClose,
}: {
  pilgrim?: PilgrimProfile;
  onSave: (p: PilgrimProfile) => void;
  onClose: () => void;
}): JSX.Element {
  const [form, setForm] = useState<PilgrimFormData>(
    pilgrim
      ? {
          name: pilgrim.name, gender: pilgrim.gender, dateOfBirth: pilgrim.dateOfBirth,
          mobile: pilgrim.mobile, email: pilgrim.email, address: pilgrim.address,
          city: pilgrim.city, state: pilgrim.state, pincode: pilgrim.pincode,
          idType: pilgrim.idType, idNumber: pilgrim.idNumber,
          relationship: pilgrim.relationship,
          emergencyContact: pilgrim.emergencyContact || '',
          emergencyPhone: pilgrim.emergencyPhone || '',
        }
      : EMPTY_FORM,
  );

  const set = (k: keyof PilgrimFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.dateOfBirth) return;
    const now = new Date().toISOString();
    onSave({
      id:        pilgrim?.id || uuid(),
      ...form,
      emergencyContact: form.emergencyContact || undefined,
      emergencyPhone:   form.emergencyPhone   || undefined,
      createdAt: pilgrim?.createdAt || now,
      updatedAt: now,
    } as PilgrimProfile);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,134,10,0.2)', borderRadius: '10px',
    padding: '10px 14px', fontSize: '14px', color: 'inherit',
    fontFamily: 'Inter, sans-serif',
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 600, color: '#C8860A',
    marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px',
  };
  const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--color-card)', borderRadius: '20px', width: '100%', maxWidth: '620px',
        maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: '1px solid rgba(200,134,10,0.2)',
      }}>
        {/* Modal header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(200,134,10,0.15), rgba(245,158,11,0.05))',
          padding: '20px 24px', borderBottom: '1px solid rgba(200,134,10,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '18px', margin: 0, color: 'var(--color-text)' }}>
              {pilgrim ? 'Edit Pilgrim' : 'Add Pilgrim'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', margin: '4px 0 0' }}>
              {pilgrim ? 'Update pilgrim information' : 'Add a new family member to your profiles'}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px',
            width: '32px', height: '32px', cursor: 'pointer', color: 'var(--color-text-muted)',
            fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Personal Info */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-muted)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Personal Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Enter full name" required />
              </div>
              <div style={row}>
                <div>
                  <label style={labelStyle}>Gender</label>
                  <select style={inputStyle} value={form.gender} onChange={set('gender')}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Date of Birth *</label>
                  <input style={inputStyle} type="date" value={form.dateOfBirth} onChange={set('dateOfBirth')} required />
                </div>
              </div>
              <div style={row}>
                <div>
                  <label style={labelStyle}>Relationship</label>
                  <select style={inputStyle} value={form.relationship} onChange={set('relationship')}>
                    {(['self','spouse','child','parent','sibling','other'] as Relationship[]).map((r) => (
                      <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Mobile *</label>
                  <input style={inputStyle} value={form.mobile} onChange={set('mobile')} placeholder="+91 XXXXXXXXXX" required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-muted)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Address
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={labelStyle}>Street Address</label>
                <input style={inputStyle} value={form.address} onChange={set('address')} placeholder="Door/Flat No., Street, Colony" />
              </div>
              <div style={row}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input style={inputStyle} value={form.city} onChange={set('city')} placeholder="City" />
                </div>
                <div>
                  <label style={labelStyle}>Pincode</label>
                  <input style={inputStyle} value={form.pincode} onChange={set('pincode')} placeholder="500001" />
                </div>
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <select style={inputStyle} value={form.state} onChange={set('state')}>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ID Proof */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-muted)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ID Proof
            </h3>
            <div style={row}>
              <div>
                <label style={labelStyle}>ID Type</label>
                <select style={inputStyle} value={form.idType} onChange={set('idType')}>
                  {ID_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>ID Number</label>
                <input style={inputStyle} value={form.idNumber} onChange={set('idNumber')} placeholder="Enter ID number" />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-muted)', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Emergency Contact (Optional)
            </h3>
            <div style={row}>
              <div>
                <label style={labelStyle}>Contact Name</label>
                <input style={inputStyle} value={form.emergencyContact} onChange={set('emergencyContact')} placeholder="Name" />
              </div>
              <div>
                <label style={labelStyle}>Contact Phone</label>
                <input style={inputStyle} value={form.emergencyPhone} onChange={set('emergencyPhone')} placeholder="+91 XXXXXXXXXX" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '8px' }}>
            <button type="button" onClick={onClose} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', padding: '10px 24px', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', color: 'var(--color-text-muted)',
            }}>Cancel</button>
            <button type="submit" style={{
              background: 'linear-gradient(135deg,#C8860A,#F59E0B)', border: 'none',
              borderRadius: '10px', padding: '10px 28px', fontSize: '14px', fontWeight: 700,
              cursor: 'pointer', color: 'white', boxShadow: '0 2px 12px rgba(200,134,10,0.4)',
            }}>
              {pilgrim ? 'Update Pilgrim' : 'Add Pilgrim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProfilesPage(): JSX.Element {
  const { pilgrims, addPilgrim, updatePilgrim, removePilgrim } = useApp();
  const [showModal,     setShowModal]     = useState(false);
  const [editingPilgrim, setEditingPilgrim] = useState<PilgrimProfile | undefined>();
  const [deleteConfirm,  setDeleteConfirm]  = useState<string | null>(null);
  const [searchQuery,    setSearchQuery]    = useState('');

  const filtered = pilgrims.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.relationship.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSave = async (p: PilgrimProfile) => {
    if (editingPilgrim) await updatePilgrim(p);
    else await addPilgrim(p);
    setShowModal(false);
    setEditingPilgrim(undefined);
  };

  const handleEdit = (p: PilgrimProfile) => {
    setEditingPilgrim(p);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    await removePilgrim(id);
    setDeleteConfirm(null);
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-card)', border: '1px solid var(--color-border)',
    borderRadius: '16px', padding: '20px', display: 'flex',
    gap: '16px', alignItems: 'flex-start',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: 'var(--shadow-card)',
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '28px', margin: '0 0 6px', color: 'var(--color-text)' }}>
            👨‍👩‍👧‍👦 Family Profiles
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '15px' }}>
            Manage pilgrim information for fast, accurate autofill
          </p>
        </div>
        <button
          onClick={() => { setEditingPilgrim(undefined); setShowModal(true); }}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span style={{ fontSize: '18px' }}>+</span> Add Pilgrim
        </button>
      </div>

      {/* Search */}
      {pilgrims.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍  Search pilgrims by name or relationship..."
            style={{
              width: '100%', maxWidth: '400px',
              background: 'var(--color-card)', border: '1px solid var(--color-border)',
              borderRadius: '12px', padding: '12px 16px', fontSize: '14px',
              color: 'var(--color-text)', fontFamily: 'Inter,sans-serif',
            }}
          />
        </div>
      )}

      {/* Profile Grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: 'var(--color-card)', borderRadius: '20px',
          border: '2px dashed rgba(200,134,10,0.3)',
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>👨‍👩‍👧</div>
          <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '20px', marginBottom: '8px', color: 'var(--color-text)' }}>
            {pilgrims.length === 0 ? 'No Pilgrims Yet' : 'No Results'}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '14px' }}>
            {pilgrims.length === 0
              ? 'Add your family members for quick autofill during TTD booking.'
              : 'Try a different search term.'}
          </p>
          {pilgrims.length === 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px', borderRadius: '12px' }}
            >
              Add First Pilgrim
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px' }}>
          {filtered.map((p) => (
            <div key={p.id} style={cardStyle}>
              <Avatar name={p.name} size={52} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--color-text)' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      {p.gender.charAt(0).toUpperCase() + p.gender.slice(1)} · Age {getAge(p.dateOfBirth)}
                    </div>
                  </div>
                  <span className="badge badge-saffron" style={{ marginLeft: '8px', flexShrink: 0 }}>
                    {p.relationship}
                  </span>
                </div>

                {/* Info Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {p.mobile && (
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      📱 {p.mobile}
                    </span>
                  )}
                  {p.idType && (
                    <span className="badge" style={{ background: 'rgba(139,92,246,0.12)', color: '#7C3AED', fontSize: '11px' }}>
                      {p.idType.replace('_', ' ').toUpperCase()}
                    </span>
                  )}
                  {p.state && (
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      📍 {p.city ? `${p.city}, ` : ''}{p.state}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(p)}
                    style={{
                      background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)',
                      borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                      color: '#C8860A', cursor: 'pointer',
                    }}
                  >
                    ✏️ Edit
                  </button>
                  {deleteConfirm === p.id ? (
                    <>
                      <button
                        onClick={() => handleDelete(p.id)}
                        style={{
                          background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                          borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                          color: '#EF4444', cursor: 'pointer',
                        }}
                      >
                        Confirm Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        style={{
                          background: 'rgba(107,114,128,0.1)', border: '1px solid rgba(107,114,128,0.2)',
                          borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                          color: 'var(--color-text-muted)', cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(p.id)}
                      style={{
                        background: 'transparent', border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: '8px', padding: '6px 14px', fontSize: '12px', fontWeight: 600,
                        color: '#EF4444', cursor: 'pointer',
                      }}
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Count */}
      {pilgrims.length > 0 && (
        <div style={{ marginTop: '20px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
          {filtered.length} of {pilgrims.length} pilgrim{pilgrims.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <PilgrimModal
          pilgrim={editingPilgrim}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingPilgrim(undefined); }}
        />
      )}
    </div>
  );
}
