import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Star,
  Wifi,
  Wind,
  Compass,
  Car,
  Lock,
  Unlock,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Phone,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';

interface PlaceItem {
  id: string;
  name: string;
  type: 'hotel' | 'guesthouse' | 'travels';
  rating: number;
  reviews: number;
  priceLevel: string;
  description: string;
  distance: string;
  amenities: string[];
  benefits: string[];
  contactPhone: string;
  contactEmail: string;
  website: string;
  imageColor: string;
  svgIcon: string;
}

const PLACES_DATA: PlaceItem[] = [
  {
    id: 'h1',
    name: 'Hill View Cottage (HVC)',
    type: 'hotel',
    rating: 4.3,
    reviews: 4457,
    priceLevel: '₹₹₹',
    description: 'Beautiful 3-star property offering scenic balcony views of the lush green Tirumala hills. Located at a serene spot away from main crowds.',
    distance: '1.2 km from main Tirumala Temple',
    amenities: ['Wi-Fi', 'Air Conditioning', 'Parking', 'Room Service'],
    benefits: ['Free early morning temple shuttle', 'Guided traditional dress assistance', 'Complimentary traditional breakfast'],
    contactPhone: '+91 94403 89812',
    contactEmail: 'bookings@hillviewcottages.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    imageColor: 'linear-gradient(135deg, #FF9933 0%, #FF5500 100%)',
    svgIcon: 'cottage'
  },
  {
    id: 'h2',
    name: 'Rambagicha Rest Houses',
    type: 'guesthouse',
    rating: 4.4,
    reviews: 7595,
    priceLevel: '₹',
    description: 'Managed directly by TTD. Extremely popular among family pilgrims due to its proximity to the temple and main laddu counters.',
    distance: '0.3 km from main Tirumala Temple',
    amenities: ['Parking', 'Hot Water', 'Purified Water', 'Luggage Room'],
    benefits: ['Closest walking distance to temple entrance', 'Very economical rates', '24/7 TTD support counter access'],
    contactPhone: '+91 877 226 3120',
    contactEmail: 'rambagicha.help@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    imageColor: 'linear-gradient(135deg, #C8860A 0%, #E5A93C 100%)',
    svgIcon: 'temple'
  },
  {
    id: 'h3',
    name: 'Sri Venkateswara Guest House',
    type: 'guesthouse',
    rating: 4.3,
    reviews: 1036,
    priceLevel: '₹',
    description: 'A spacious and historical TTD guest house featuring green garden courtyards and large halls suitable for family groups.',
    distance: '0.6 km from main Tirumala Temple',
    amenities: ['Wi-Fi', 'Parking', 'Canteen', 'Garden Area'],
    benefits: ['Peaceful and spacious corridors', 'Direct booking verification desk on-site', 'Close to daily cultural programs'],
    contactPhone: '+91 877 226 3000',
    contactEmail: 'svgh.booking@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    imageColor: 'linear-gradient(135deg, #8B0000 0%, #D32F2F 100%)',
    svgIcon: 'palace'
  },
  {
    id: 'h4',
    name: 'Panchajanyam Guest House',
    type: 'hotel',
    rating: 4.1,
    reviews: 17586,
    priceLevel: '₹₹',
    description: 'Modern 3-star TTD accommodation complex equipped with lift facilities, central dining hall, and multi-tier security.',
    distance: '0.8 km from main Tirumala Temple',
    amenities: ['Elevator', 'Parking', 'Pure Veg Canteen', 'Air Conditioning'],
    benefits: ['Direct biometric registration desk', 'Instant allotment check-in', 'Spacious car parking area'],
    contactPhone: '+91 877 227 7777',
    contactEmail: 'panchajanyam.mgr@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    imageColor: 'linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%)',
    svgIcon: 'building'
  },
  {
    id: 'h5',
    name: 'Taj Tirupati',
    type: 'hotel',
    rating: 4.7,
    reviews: 3124,
    priceLevel: '₹₹₹₹',
    description: 'World-class 5-star luxury at the foothill of Tirumala. Spectacular architectural designs inspired by Tirupati temple pillars and traditional motifs.',
    distance: '20 km from Tirumala Temple (Tirupati Town)',
    amenities: ['Pool', 'Wi-Fi', 'Gym', 'Vegetarian Kitchen', 'Spa', 'Valet'],
    benefits: ['Infinity pool viewing Tirumala hills', 'Private VIP temple darshan coordinator', 'Luxury private pickup/drop services'],
    contactPhone: '+91 877 668 0000',
    contactEmail: 'reservations.tirupati@tajhotels.com',
    website: 'https://ttdevasthanams.ap.gov.in',
    imageColor: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
    svgIcon: 'luxury'
  },
  {
    id: 't1',
    name: 'Tirumala Balaji Travels',
    type: 'travels',
    rating: 4.8,
    reviews: 2410,
    priceLevel: '₹₹',
    description: 'The highest-rated local car rental and tour service. Specializes in custom pick-ups from Renigunta Airport and Tirupati Railway Station.',
    distance: 'Available at Airport, Station & Alipiri Toll Gate',
    amenities: ['AC Vehicles', 'Local Drivers', '24/7 Dispatch', 'Custom Packages'],
    benefits: ['Verified local English/Telugu/Tamil speaking drivers', 'Smooth drop at Alipiri / Srivani Mettu walking steps', 'Covers Kalahasti & Kanipakam temples in single trip'],
    contactPhone: '+91 98850 12345',
    contactEmail: 'info@balajitravels.co.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    imageColor: 'linear-gradient(135deg, #3E2723 0%, #5D4037 100%)',
    svgIcon: 'car'
  },
  {
    id: 't2',
    name: 'Srinivasa Darshan Tours',
    type: 'travels',
    rating: 4.6,
    reviews: 1850,
    priceLevel: '₹₹₹',
    description: 'Well-established daily package tour specialist operating safe, comfortable Volvo AC multi-axle buses from Bangalore, Chennai, and Hyderabad.',
    distance: 'Pickup hubs in major South Indian cities',
    amenities: ['Volvo Sleeper', 'Guide On-board', 'Food Included', 'AC'],
    benefits: ['Experienced tour guide handles darshan queue guidance', 'Assistance with TTD laddu collection', 'Includes premium room for fresh-up in Tirupati'],
    contactPhone: '+91 99630 67890',
    contactEmail: 'contact@srinivasatours.com',
    website: 'https://ttdevasthanams.ap.gov.in',
    imageColor: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
    svgIcon: 'bus'
  }
];

export default function StaysTravelsPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'stays' | 'travels'>('stays');
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem>(PLACES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'options' | 'simulating' | 'success'>('options');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay');

  // Load premium state
  useEffect(() => {
    const unlocked = localStorage.getItem('da_premium_unlocked') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  // Filter places based on active tab and search query
  const filteredPlaces = PLACES_DATA.filter((place) => {
    const matchesTab = activeTab === 'stays' ? place.type !== 'travels' : place.type === 'travels';
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.distance.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Keep selected place valid after changing tab
  useEffect(() => {
    if (filteredPlaces.length > 0 && !filteredPlaces.find((p) => p.id === selectedPlace.id)) {
      setSelectedPlace(filteredPlaces[0]);
    }
  }, [activeTab]);

  const handleSimulatePayment = () => {
    setPaymentStep('simulating');
    setTimeout(() => {
      setPaymentStep('success');
      localStorage.setItem('da_premium_unlocked', 'true');
      setIsUnlocked(true);
    }, 2000);
  };

  const resetPremiumState = () => {
    localStorage.removeItem('da_premium_unlocked');
    setIsUnlocked(false);
    setPaymentStep('options');
  };

  // Helper to render icon based on type
  const renderSvgPlaceholder = (color: string, icon: string) => {
    let emoji = '🏨';
    if (icon === 'temple') emoji = '⛩️';
    if (icon === 'palace') emoji = '🏛️';
    if (icon === 'building') emoji = '🏢';
    if (icon === 'luxury') emoji = '👑';
    if (icon === 'car') emoji = '🚗';
    if (icon === 'bus') emoji = '🚌';
    if (icon === 'cottage') emoji = '🏡';

    return (
      <div style={{
        width: '84px',
        height: '84px',
        borderRadius: '12px',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        flexShrink: 0,
        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
      }}>
        {emoji}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', gap: '16px', overflow: 'hidden' }}>
      
      {/* Top Banner Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '26px', fontWeight: 700, margin: '0 0 4px', color: 'var(--color-text)' }}>
            📍 Stays & Travel Directory
          </h1>
          <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--color-text-muted)' }}>
            Google Maps verified stays, cottage houses, and local operators near Tirumala
          </p>
        </div>

        {isUnlocked ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', fontSize: '12px' }}>
              <ShieldCheck size={14} /> Premium Unlocked
            </span>
            <button
              onClick={resetPremiumState}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Lock Directory (Reset)
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setPaymentStep('options');
              setShowPaymentModal(true);
            }}
            className="btn-primary"
            style={{
              padding: '10px 18px',
              fontSize: '13px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}
          >
            <Lock size={14} /> Unlock Directory (₹399)
          </button>
        )}
      </div>

      {/* Main Split Layout */}
      <div style={{ display: 'flex', flex: 1, gap: '16px', overflow: 'hidden' }}>
        
        {/* Left column - List (40% width) */}
        <div style={{
          width: '380px',
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0
        }}>
          {/* Header search + tabs */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: 'rgba(255,255,255,0.3)' }} />
              <input
                type="text"
                placeholder="Search hotels, cottages, travels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '9px 12px 9px 36px',
                  fontSize: '13px',
                  color: 'inherit',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            {/* Toggle tabs */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '3px', border: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setActiveTab('stays')}
                style={{
                  flex: 1,
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'stays' ? 'linear-gradient(135deg,#C8860A,#F59E0B)' : 'transparent',
                  color: activeTab === 'stays' ? 'white' : 'var(--color-text-muted)',
                  transition: 'all 0.2s'
                }}
              >
                🏨 Hotels & Stays
              </button>
              <button
                onClick={() => setActiveTab('travels')}
                style={{
                  flex: 1,
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'travels' ? 'linear-gradient(135deg,#C8860A,#F59E0B)' : 'transparent',
                  color: activeTab === 'travels' ? 'white' : 'var(--color-text-muted)',
                  transition: 'all 0.2s'
                }}
              >
                🚌 Tours & Travels
              </button>
            </div>
          </div>

          {/* List area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {filteredPlaces.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--color-text-muted)' }}>
                <Compass size={32} style={{ color: 'rgba(200,134,10,0.4)', marginBottom: '8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 600 }}>No results found</div>
                <div style={{ fontSize: '11px', marginTop: '4px' }}>Try a different keyword</div>
              </div>
            ) : (
              filteredPlaces.map((place) => {
                const isSelected = selectedPlace.id === place.id;
                return (
                  <div
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid rgba(200,134,10,0.4)' : '1px solid transparent',
                      background: isSelected ? 'rgba(200,134,10,0.06)' : 'transparent',
                      transition: 'all 0.15s',
                      marginBottom: '4px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {renderSvgPlaceholder(place.imageColor, place.svgIcon)}

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontSize: '13.5px',
                        fontWeight: 700,
                        margin: '0 0 2px',
                        color: 'var(--color-text)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {place.name}
                      </h3>

                      {/* Rating block */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text)' }}>{place.rating}</span>
                        <div style={{ display: 'flex', gap: '1px' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              fill={i < Math.floor(place.rating) ? '#F59E0B' : 'transparent'}
                              color="#F59E0B"
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>({place.reviews})</span>
                      </div>

                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        {place.type === 'guesthouse' ? 'Guest house' : place.type === 'travels' ? 'Taxi operator' : '3-star hotel'} · {place.priceLevel}
                      </div>

                      {/* Distance pill */}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '2px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        color: '#FBBF24'
                      }}>
                        <MapPin size={10} />
                        {place.distance.split('(')[0]}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column - Detail & Map Pane (60% width) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflow: 'hidden'
        }}>
          {/* Top: Mock Interactive Map */}
          <div style={{
            height: '240px',
            background: 'radial-gradient(circle at center, #1E1E1E 0%, #141414 100%)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            {/* Styled Map Background Grid */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }} />

            {/* Simulated Roads */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.25 }}>
              <path d="M 0,100 Q 150,120 300,100 T 600,150 T 900,80" fill="none" stroke="#FFF" strokeWidth="4" />
              <path d="M 120,0 L 150,240" fill="none" stroke="#FFF" strokeWidth="3" />
              <path d="M 450,0 Q 400,120 480,240" fill="none" stroke="#FFF" strokeWidth="3" />
            </svg>

            {/* Central Temple Pin */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '48%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 5
            }}>
              <div style={{
                background: '#EF4444',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                whiteSpace: 'nowrap'
              }}>
                🕉️ Tirumala Temple
              </div>
              <div style={{ width: '8px', height: '8px', background: '#EF4444', borderRadius: '50%', margin: '4px auto 0', boxShadow: '0 0 8px #EF4444' }} />
            </div>

            {/* Active Place Marker */}
            <div style={{
              position: 'absolute',
              top: '60%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 6,
              animation: 'bounce 2s infinite'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                boxShadow: '0 4px 10px rgba(200,134,10, 0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}>
                📍 {selectedPlace.name}
              </div>
              <div style={{ width: '8px', height: '8px', background: '#F59E0B', borderRadius: '50%', margin: '4px auto 0', boxShadow: '0 0 8px #F59E0B' }} />
            </div>

            {/* Map Controls */}
            <div style={{ position: 'absolute', right: '12px', bottom: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {['+', '−'].map((ctrl) => (
                <button
                  key={ctrl}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: '#1E1E1E',
                    border: '1px solid var(--color-border)',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {ctrl}
                </button>
              ))}
            </div>

            {/* GPS Compass Label */}
            <div style={{
              position: 'absolute',
              left: '12px',
              bottom: '12px',
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid var(--color-border)',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Compass size={12} /> Live GPS Coordinates (Tirumala Hills)
            </div>
          </div>

          {/* Bottom: Place Detail card */}
          <div style={{
            flex: 1,
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowY: 'auto'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 700, margin: '0 0 4px', color: 'var(--color-text)' }}>
                    {selectedPlace.name}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-saffron" style={{ textTransform: 'capitalize' }}>
                      {selectedPlace.type === 'guesthouse' ? 'TTD Rest House' : selectedPlace.type === 'travels' ? 'Verified Travels' : 'Private Hotel'}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      📍 {selectedPlace.distance}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <Star size={16} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: '15px', fontWeight: 700 }}>{selectedPlace.rating}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>({selectedPlace.reviews} Google reviews)</span>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

            {/* Description */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#C8860A', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Overview
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                {selectedPlace.description}
              </p>
            </div>

            {/* Dynamic Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Pilgrim Benefits */}
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#C8860A', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🎁 Pilgrim Benefits
                </h3>
                <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedPlace.benefits.map((benefit, i) => (
                    <li key={i} style={{ fontSize: '12.5px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Amenities */}
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#C8860A', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ⚙️ Amenities & Facilities
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedPlace.amenities.map((amenity, i) => (
                    <span key={i} style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--color-border)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '11.5px',
                      color: 'var(--color-text)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {amenity === 'Wi-Fi' && <Wifi size={12} />}
                      {amenity === 'Air Conditioning' && <Wind size={12} />}
                      {amenity === 'AC Vehicles' && <Car size={12} />}
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

            {/* Contact Details with paywall block */}
            <div style={{ position: 'relative' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#C8860A', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📞 Verified Contact Directory
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                filter: isUnlocked ? 'none' : 'blur(4px)',
                pointerEvents: isUnlocked ? 'auto' : 'none',
                opacity: isUnlocked ? 1 : 0.4,
                transition: 'filter 0.3s'
              }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Phone Number</div>
                  <a href={`tel:${selectedPlace.contactPhone}`} style={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} /> {selectedPlace.contactPhone}
                  </a>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Support Email</div>
                  <div style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '13.5px', wordBreak: 'break-all' }}>
                    {selectedPlace.contactEmail}
                  </div>
                </div>
              </div>

              {/* Paywall Overlay */}
              {!isUnlocked && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  padding: '8px'
                }}>
                  <div style={{
                    background: 'rgba(30,30,30,0.85)',
                    border: '1.5px solid rgba(200,134,10,0.3)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    textAlign: 'center',
                    maxWidth: '480px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Lock size={14} color="#F59E0B" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>Contact Directory Locked</span>
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: '11.5px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                      Unlock official phone numbers, direct reservation links, WhatsApp travel guides, and TTD recommendation letter drafts.
                    </p>
                    <button
                      onClick={() => {
                        setPaymentStep('options');
                        setShowPaymentModal(true);
                      }}
                      className="btn-primary"
                      style={{
                        padding: '8px 18px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(200,134,10,0.4)'
                      }}
                    >
                      ⚡ Unlock for ₹399
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Booking Link (Visible only if unlocked) */}
            {isUnlocked && (
              <button
                onClick={() => window.open(selectedPlace.website, '_blank')}
                className="btn-secondary"
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginTop: 'auto'
                }}
              >
                Open Official Reservation Portal <ExternalLink size={14} />
              </button>
            )}

          </div>
        </div>

      </div>

      {/* 💳 MOCK UPI / RAZORPAY PAYMENT GATEWAY MODAL */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }} onClick={(e) => e.target === e.currentTarget && setShowPaymentModal(false)}>
          
          <div style={{
            background: '#181818',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '440px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
          }}>
            
            {/* Header */}
            <div style={{
              background: '#0F0F0F',
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, #C8860A, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                    🙏
                  </div>
                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'white', fontFamily: 'Poppins, sans-serif' }}>
                    Darshan Assist Secure Pay
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* Body */}
            {paymentStep === 'options' && (
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Product details */}
                <div style={{
                  background: 'rgba(200,134,10,0.06)',
                  border: '1px solid rgba(200,134,10,0.15)',
                  padding: '16px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>Premium Stay & Travel Pack</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Verified Directory + Offline Assistance</div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#F59E0B' }}>₹399</div>
                </div>

                {/* Simulated UPI Selection */}
                <div>
                  <label style={{ fontSize: '11.5px', fontWeight: 600, color: '#C8860A', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                    Select UPI App (Instant Sandbox Simulation)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { id: 'gpay', name: 'Google Pay', color: '#1A73E8', badge: '⚡ instant check' },
                      { id: 'phonepe', name: 'PhonePe', color: '#5F259F', badge: 'popular' },
                      { id: 'paytm', name: 'Paytm Wallet', color: '#00B9F5', badge: 'wallet' },
                      { id: 'bhim', name: 'BHIM UPI', color: '#F5A623', badge: 'government secure' }
                    ].map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedUpiApp(app.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          background: selectedUpiApp === app.id ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.01)',
                          border: selectedUpiApp === app.id ? `1.5px solid ${app.color}` : '1.5px solid rgba(255,255,255,0.05)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: app.color
                          }} />
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{app.name}</span>
                        </div>
                        <span style={{ fontSize: '9px', background: `${app.color}20`, color: app.color, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700 }}>
                          {app.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment QR Code Simulation */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {/* Mock QR SVG */}
                  <svg width="64" height="64" viewBox="0 0 64 64" style={{ background: 'white', padding: '4px', borderRadius: '6px' }}>
                    <path d="M4,4h16v16H4V4z M8,8v8h8V8H8z M44,4h16v16H44V4z M48,8v8h8V8H48z M4,44h16v16H4V44z M8,48v8h8v-8H8z M28,4h8v8h-8V4z M28,24h8v8h-8v-8z M24,44h8v8h-8v-8z M44,44h8v8h-8v-8z" fill="#000" />
                    <rect x="12" y="12" width="4" height="4" fill="#000" />
                    <rect x="48" y="12" width="4" height="4" fill="#000" />
                    <rect x="12" y="48" width="4" height="4" fill="#000" />
                    <rect x="28" y="52" width="8" height="8" fill="#F59E0B" />
                    <rect x="52" y="52" width="4" height="4" fill="#000" />
                  </svg>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>Or scan static QR code</div>
                    <div style={{ fontSize: '10.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Supported by all BHIM/UPI apps for instant booking checks.</div>
                  </div>
                </div>

                {/* Simulate Button */}
                <button
                  onClick={handleSimulatePayment}
                  className="btn-primary"
                  style={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(245,158,11, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Unlock size={16} /> Simulate Success Payment
                </button>
              </div>
            )}

            {/* Simulating Loader */}
            {paymentStep === 'simulating' && (
              <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '3px solid rgba(245,158,11,0.2)',
                  borderTop: '3px solid #F59E0B',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>Connecting to UPI Gateway...</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Simulating payment verification for ₹399.00</div>
                </div>
              </div>
            )}

            {/* Success Splash */}
            {paymentStep === 'success' && (
              <div style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(34,197,94,0.12)',
                  border: '2px solid #22C55E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#22C55E',
                  animation: 'scaleIn 0.3s ease-out'
                }}>
                  <Check size={32} strokeWidth={3} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#22C55E' }}>Payment Successful!</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Verified Stay & Travel Directory unlocked.</div>
                </div>

                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="btn-primary"
                  style={{
                    padding: '10px 24px',
                    fontSize: '13px',
                    borderRadius: '8px',
                    background: '#22C55E',
                    border: 'none',
                    color: 'white',
                    fontWeight: 700,
                    width: '100%'
                  }}
                >
                  Start Accessing Directory
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

    </div>
  );
}
