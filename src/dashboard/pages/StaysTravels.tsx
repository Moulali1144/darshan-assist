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
  image: string; // Real CDN Unsplash photo representing the property/travels
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
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop&q=80'
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
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop&q=80'
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
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop&q=80'
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
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&q=80'
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
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h6',
    name: 'Kousthubham Rest House',
    type: 'guesthouse',
    rating: 4.2,
    reviews: 8210,
    priceLevel: '₹',
    description: 'Centrally located TTD guest house with easy access to central reception office. Highly recommended for couples and small families.',
    distance: '0.5 km from main Tirumala Temple',
    amenities: ['Parking', 'Hot Water', 'Drinking Water', 'AC Rooms'],
    benefits: ['Near TTD main enquiry desk', 'Biometric validation counters on ground floor', 'Fast allocation processing'],
    contactPhone: '+91 877 226 3133',
    contactEmail: 'kousthubham.booking@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h7',
    name: 'Padmavathi Guest House',
    type: 'guesthouse',
    rating: 4.1,
    reviews: 5420,
    priceLevel: '₹',
    description: 'Well-ventilated guest house managed by TTD. Known for its quiet surroundings and proximity to natural parks.',
    distance: '0.9 km from main Tirumala Temple',
    amenities: ['Garden', 'Parking', '24/7 Water', 'Canteen'],
    benefits: ['Quiet forest view surrounding', 'Less crowded allotment block', 'Close to Outer Ring Road'],
    contactPhone: '+91 877 226 3221',
    contactEmail: 'padmavathigh@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h8',
    name: 'Varahaswamy Guest House',
    type: 'guesthouse',
    rating: 4.0,
    reviews: 3190,
    priceLevel: '₹',
    description: 'Located right next to the sacred Varahaswamy Temple. Offers standard rooms at highly subsidized TTD prices.',
    distance: '0.4 km from main Tirumala Temple',
    amenities: ['Parking', 'Subsidized Canteen', 'Luggage Room'],
    benefits: ['Next to Pushkarini (holy temple tank)', 'Easiest access to Varahaswamy darshan', 'Walking path directly to temple queue'],
    contactPhone: '+91 877 226 3244',
    contactEmail: 'varahagh@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1606046604972-77cc76aee944?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h9',
    name: 'Srinivasam Complex (TTD)',
    type: 'guesthouse',
    rating: 4.1,
    reviews: 25420,
    priceLevel: '₹',
    description: 'A massive transit lodging complex run by TTD in Tirupati town. Ideal for fresh-up and overnight stays before climbing the hills.',
    distance: '20.5 km from Tirumala (Near Tirupati Railway Station)',
    amenities: ['AC Rooms', 'Locker Facility', 'Bus Stand Access', 'Pure Veg Canteen'],
    benefits: ['Direct TTD ticket counters inside complex', 'Walkable from Railway Station', 'Free shuttle boarding point'],
    contactPhone: '+91 877 228 7771',
    contactEmail: 'srinivasam.allot@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h10',
    name: 'Vishnu Nivasam (TTD)',
    type: 'guesthouse',
    rating: 4.2,
    reviews: 20120,
    priceLevel: '₹',
    description: 'Directly opposite Tirupati Railway Station. Renders quick accommodation facilities and locker services for transit pilgrims.',
    distance: '20.2 km from Tirumala (Opposite Railway Station)',
    amenities: ['Locker Rooms', 'Elevators', 'Canteen', 'Transport Desk'],
    benefits: ['Right in front of Tirupati main station exit', 'Instant allotment check-in available', 'APSRTC booking counter inside'],
    contactPhone: '+91 877 228 7775',
    contactEmail: 'vishnunivasam@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h11',
    name: 'Madhavam Guest House (TTD)',
    type: 'guesthouse',
    rating: 4.3,
    reviews: 4102,
    priceLevel: '₹₹',
    description: 'Premium TTD guest house in Tirupati featuring fully air-conditioned deluxe suites and a modern dining lounge.',
    distance: '20.8 km from Tirumala (Tirupati Bypass)',
    amenities: ['Central AC', 'Deluxe Suites', 'Parking', 'Room Service'],
    benefits: ['Extremely clean and premium interiors', 'Online pre-booking allowed via official site', 'Peaceful garden area'],
    contactPhone: '+91 877 228 7780',
    contactEmail: 'madhavam@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h12',
    name: 'Gokulam Rest House',
    type: 'guesthouse',
    rating: 4.2,
    reviews: 8500,
    priceLevel: '₹',
    description: 'Spacious TTD residential block adjacent to the main administrative buildings in Tirumala. Safe environment for single lady pilgrims.',
    distance: '0.7 km from main Tirumala Temple',
    amenities: ['Parking', '24/7 Security', 'Locker Room'],
    benefits: ['Strict biometric security gate', 'Close to central TTD administrative office', 'Clean vegetarian dining nearby'],
    contactPhone: '+91 877 226 3311',
    contactEmail: 'gokulam@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h13',
    name: 'Sapthagiri Chatrams',
    type: 'guesthouse',
    rating: 3.9,
    reviews: 6112,
    priceLevel: '₹',
    description: 'Traditional TTD free/subsidized locker rooms and hall systems. Best suited for single travelers and backpacker pilgrims.',
    distance: '0.2 km from main Tirumala Temple',
    amenities: ['Free Lockers', 'Common Bathrooms', 'Drinking Water'],
    benefits: ['Closest possible accommodation to main queue line', 'Virtually free boarding options', 'Direct queue updates audible'],
    contactPhone: '+91 877 226 3345',
    contactEmail: 'sapthagirichatram@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h14',
    name: 'Vakula Mata Rest House',
    type: 'guesthouse',
    rating: 4.0,
    reviews: 1540,
    priceLevel: '₹',
    description: 'Standard guest house named after Mother Vakula Devi. Known for its quiet, non-commercial atmosphere.',
    distance: '1.1 km from main Tirumala Temple',
    amenities: ['Parking', 'Hot Water', 'Purified Water'],
    benefits: ['Spacious surroundings', 'Close to peaceful woodland paths', 'Easy parking for outstation private cars'],
    contactPhone: '+91 877 226 3390',
    contactEmail: 'vakulamata@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h15',
    name: 'Alipiri Guest House (TTD)',
    type: 'guesthouse',
    rating: 4.0,
    reviews: 2110,
    priceLevel: '₹',
    description: 'TTD reception guest house located right at the starting point of Alipiri walk path. Perfect for midnight trek starters.',
    distance: '18.5 km from Tirumala Temple (Tirupati Foothills)',
    amenities: ['Parking', 'Luggage Desk', 'Footpath Access'],
    benefits: ['At the start of the 3550 steps walking path', 'Locker options to store excess luggage', 'Medical first-aid counter nearby'],
    contactPhone: '+91 877 228 3400',
    contactEmail: 'alipirigh@ttd.gov.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h16',
    name: 'Fortune Select Grand Ridge',
    type: 'hotel',
    rating: 4.5,
    reviews: 8921,
    priceLevel: '₹₹₹',
    description: 'Upscale hotel situated near the Bypass road. Renders a luxury gateway experience with pure vegetarian fine dining.',
    distance: '21.5 km from Tirumala Temple (Tirupati Bypass)',
    amenities: ['Pool', 'Wi-Fi', 'Gym', 'Vegetarian Canteen', 'Spa'],
    benefits: ['Award-winning multi-cuisine veg dining', 'Custom temple sightseeing assistance', 'Express check-in/out'],
    contactPhone: '+91 877 228 5555',
    contactEmail: 'reservations.gr@fortunehotels.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h17',
    name: 'Marasa Sarovar Premiere',
    type: 'hotel',
    rating: 4.4,
    reviews: 6510,
    priceLevel: '₹₹₹',
    description: 'Tirupati first theme hotel inspired by the 10 avatars of Lord Vishnu. Spectacular design elements and premium pool stays.',
    distance: '19.5 km from Tirumala Temple (Alipiri Road)',
    amenities: ['Infinity Pool', 'Wi-Fi', 'Bar', 'Gym', 'Kids Zone'],
    benefits: ['Theme architecture inspired by traditional mythology', 'Closest private luxury hotel to Alipiri Footpath', 'Premium ayurvedic spa services'],
    contactPhone: '+91 877 666 0000',
    contactEmail: 'mtp@sarovarhotels.com',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h18',
    name: 'Hotel Bliss',
    type: 'hotel',
    rating: 4.1,
    reviews: 8410,
    priceLevel: '₹₹',
    description: 'Renowned 3-star luxury hotel in the heart of Tirupati. Renowned for its traditional South Indian food and rooftop banquet halls.',
    distance: '20.6 km from Tirumala (Ramanuja Circle)',
    amenities: ['Wi-Fi', 'AC Rooms', 'Rooftop dining', 'Parking'],
    benefits: ['Legendary traditional pure veg restaurant on-site', 'Central location close to local bazaars', 'Complimentary railway station shuttle'],
    contactPhone: '+91 877 223 7773',
    contactEmail: 'reservations@hotelbliss.in',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h19',
    name: 'Minerva Grand Tirupati',
    type: 'hotel',
    rating: 4.2,
    reviews: 5610,
    priceLevel: '₹₹',
    description: 'A boutique business hotel providing luxury rooms, multi-cuisine restaurants, and excellent travel desk services.',
    distance: '20.4 km from Tirumala (Renigunta Road)',
    amenities: ['Business Center', 'Wi-Fi', 'Gym', 'Fine Dine Veg'],
    benefits: ['Excellent travel concierge to arrange tickets', 'Located close to local shopping centers', 'Fast airport connectivity access'],
    contactPhone: '+91 877 228 6161',
    contactEmail: 'reservations.tpt@minervagrand.com',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 'h20',
    name: 'Ramee Guestline Tirupati',
    type: 'hotel',
    rating: 4.0,
    reviews: 4230,
    priceLevel: '₹₹',
    description: 'A quiet resort-style hotel featuring spacious lawn areas, large swimming pool, and comfortable family cottages.',
    distance: '19.0 km from Tirumala (Karakambadi Road)',
    amenities: ['Swimming Pool', 'Large Lawns', 'Wi-Fi', 'AC Cottages'],
    benefits: ['Spacious garden walks for elderly pilgrims', 'Away from heavy city noise and traffic', 'Kids playground area'],
    contactPhone: '+91 877 228 0800',
    contactEmail: 'guestline.tirupati@rameehotels.com',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop&q=80'
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
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&q=80'
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
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'Sri Venkatadri Cabs',
    type: 'travels',
    rating: 4.7,
    reviews: 980,
    priceLevel: '₹₹',
    description: 'Affordable local cab service with a fleet of modern, clean sedans and SUVs. Renders direct airport transits.',
    distance: 'Tirupati Station & Bypass pick-up available',
    amenities: ['Clean Sedans', 'Toll Fees Included', 'Mobile Charger'],
    benefits: ['No hidden charges (tolls and hill permit included)', 'Uniformed, polite drivers', 'GPS tracked vehicles'],
    contactPhone: '+91 94412 34567',
    contactEmail: 'bookings@venkatadricabs.com',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 't4',
    name: 'Seven Hills Pilgrimage Tours',
    type: 'travels',
    rating: 4.5,
    reviews: 750,
    priceLevel: '₹₹',
    description: 'Provides customized heritage walk guides and shared transport vehicles to all major sightseeing areas in Tirumala hills.',
    distance: 'Tirumala central bus station desk',
    amenities: ['Shared Coach', 'Local Guides', 'Traditional Wear Help'],
    benefits: ['Guided sightseeing of Srivari Padalu, Papavinasanam, and Akasa Ganga', 'Free traditional dress consultation', 'Assistance with tonsure (head shaving) slots'],
    contactPhone: '+91 98480 98765',
    contactEmail: 'guidance@sevenhillstours.com',
    website: 'https://ttdevasthanams.ap.gov.in',
    image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=400&h=300&fit=crop&q=80'
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

  // Helper to format generic/obfuscated titles for locked states
  const getObfuscatedName = (place: PlaceItem) => {
    if (isUnlocked) return place.name;
    
    // Generic display when locked
    const typeLabel = place.type === 'hotel' ? 'Premium Hotel Stay' : place.type === 'guesthouse' ? 'TTD Allotment Rest House' : 'Verified Taxi & Travels';
    const match = place.distance.match(/^([\d.]+)\s*km/);
    const distText = match ? `${match[1]} km` : 'Near Temple';
    return `🔒 ${typeLabel} (${distText})`;
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
            Verified cottage guest houses, TTD complexes, and local travels near Tirumala (25+ Places)
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
            <Lock size={14} /> Unlock 25+ Stays & Tours (₹399/yr)
          </button>
        )}
      </div>

      {/* Main Split Layout */}
      <div style={{ display: 'flex', flex: 1, gap: '16px', overflow: 'hidden' }}>
        
        {/* Left column - List (40% width) */}
        <div style={{
          width: '390px',
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
                placeholder={isUnlocked ? "Search 25+ hotels, travels..." : "Search locked stays & travels..."}
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
                🏨 Hotels & Stays ({PLACES_DATA.filter(p => p.type !== 'travels').length})
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
                🚌 Tours & Travels ({PLACES_DATA.filter(p => p.type === 'travels').length})
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
                    {/* Real Image of Hotel / Travels (or Blurred version if locked) */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img
                        src={place.image}
                        alt="place thumbnail"
                        style={{
                          width: '84px',
                          height: '84px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          filter: isUnlocked ? 'none' : 'blur(5px) grayscale(50%)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                          transition: 'filter 0.3s'
                        }}
                      />
                      {!isUnlocked && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Lock size={12} color="white" />
                        </div>
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        margin: '0 0 2px',
                        color: isSelected ? '#F59E0B' : 'var(--color-text)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {getObfuscatedName(place)}
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
                        {place.type === 'guesthouse' ? 'TTD Rest House' : place.type === 'travels' ? 'Private Travels' : 'Premium Hotel'} · {place.priceLevel}
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
            height: '220px',
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
                📍 {isUnlocked ? selectedPlace.name : 'Selected Spot'}
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
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            overflowY: 'auto'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    margin: '0 0 4px',
                    color: 'var(--color-text)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {getObfuscatedName(selectedPlace)}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-saffron" style={{ textTransform: 'capitalize' }}>
                      {selectedPlace.type === 'guesthouse' ? 'TTD Rest House' : selectedPlace.type === 'travels' ? 'Verified Travels' : 'Private Hotel'}
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      📍 {selectedPlace.distance}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{selectedPlace.rating}</span>
                  </div>
                  <span style={{ fontSize: '10.5px', color: 'var(--color-text-muted)' }}>({selectedPlace.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: 0 }} />

            {/* Real Full-size image preview */}
            <div style={{ height: '140px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative', flexShrink: 0 }}>
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isUnlocked ? 'none' : 'blur(8px) brightness(60%)',
                  transition: 'filter 0.3s'
                }}
              />
              {!isUnlocked && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'rgba(0,0,0,0.7)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Lock size={12} color="#F59E0B" />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>Original Photo Hidden</span>
                  </div>
                </div>
              )}
            </div>

            {/* Details Pane with Paywall Filter */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              filter: isUnlocked ? 'none' : 'blur(4px)',
              pointerEvents: isUnlocked ? 'auto' : 'none',
              opacity: isUnlocked ? 1 : 0.35,
              transition: 'all 0.3s'
            }}>
              {/* Description */}
              <div>
                <h3 style={{ fontSize: '11.5px', fontWeight: 700, color: '#C8860A', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Overview & Location
                </h3>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                  {selectedPlace.description}
                </p>
              </div>

              {/* Dynamic Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Pilgrim Benefits */}
                <div>
                  <h3 style={{ fontSize: '11.5px', fontWeight: 700, color: '#C8860A', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    🎁 Pilgrim Benefits
                  </h3>
                  <ul style={{ paddingLeft: '14px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {selectedPlace.benefits.map((benefit, i) => (
                      <li key={i} style={{ fontSize: '11.5px', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Amenities */}
                <div>
                  <h3 style={{ fontSize: '11.5px', fontWeight: 700, color: '#C8860A', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    ⚙️ Amenities & Facilities
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {selectedPlace.amenities.map((amenity, i) => (
                      <span key={i} style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--color-border)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '10.5px',
                        color: 'var(--color-text)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Contact Directory */}
              <div>
                <h3 style={{ fontSize: '11.5px', fontWeight: 700, color: '#C8860A', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📞 Verified Contact Directory
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Phone Number</div>
                    <a href={`tel:${selectedPlace.contactPhone}`} style={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Phone size={12} /> {selectedPlace.contactPhone}
                    </a>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Support Email</div>
                    <div style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '12px', wordBreak: 'break-all' }}>
                      {selectedPlace.contactEmail}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Paywall Overlay */}
            {!isUnlocked && (
              <div style={{
                position: 'absolute',
                left: '20px',
                right: '20px',
                bottom: '20px',
                top: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(15,15,15,0.1)',
                zIndex: 10
              }}>
                <div style={{
                  background: 'rgba(30,30,30,0.95)',
                  border: '1.5px solid rgba(200,134,10,0.35)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  textAlign: 'center',
                  maxWidth: '440px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(3px)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Lock size={14} color="#F59E0B" />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>Details & Contacts Locked</span>
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                    Unlock real hotel/travel operator names, original photos, verified booking phone numbers, and direct reservation links.
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
                    ⚡ Unlock 25+ Stays for ₹399/yr
                  </button>
                </div>
              </div>
            )}

            {/* Direct Booking Link (Visible only if unlocked) */}
            {isUnlocked && (
              <button
                onClick={() => window.open(selectedPlace.website, '_blank')}
                className="btn-secondary"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  marginTop: 'auto',
                  flexShrink: 0
                }}
              >
                Open Official Reservation Portal <ExternalLink size={12} />
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
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
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
                    <div style={{ fontSize: '11px', color: '#F59E0B', marginTop: '2px', fontWeight: 600 }}>1-Year Active Subscription</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#F59E0B' }}>₹399</div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Per Year</div>
                  </div>
                </div>

                {/* Subscription Notice Warning */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.06)',
                  border: '1px solid rgba(239, 68, 68, 0.15)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start'
                }}>
                  <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#EF4444' }}>Important Policy Info:</div>
                    <p style={{ margin: '2px 0 0', fontSize: '10px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>
                      All pilgrim data and license details are stored locally. If you uninstall the extension, this premium license status will be permanently reset.
                    </p>
                  </div>
                </div>

                {/* Simulated UPI Selection */}
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#C8860A', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                    Select UPI App (Instant sandbox)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                          padding: '10px 14px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          background: selectedUpiApp === app.id ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.01)',
                          border: selectedUpiApp === app.id ? `1.5px solid ${app.color}` : '1.5px solid rgba(255,255,255,0.05)',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: app.color
                          }} />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'white' }}>{app.name}</span>
                        </div>
                        <span style={{ fontSize: '8px', background: `${app.color}20`, color: app.color, padding: '2px 5px', borderRadius: '3px', textTransform: 'uppercase', fontWeight: 700 }}>
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
                  gap: '12px',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {/* Mock QR SVG */}
                  <svg width="48" height="48" viewBox="0 0 64 64" style={{ background: 'white', padding: '4px', borderRadius: '6px', flexShrink: 0 }}>
                    <path d="M4,4h16v16H4V4z M8,8v8h8V8H8z M44,4h16v16H44V4z M48,8v8h8V8H48z M4,44h16v16H4V44z M8,48v8h8v-8H8z M28,4h8v8h-8V4z M28,24h8v8h-8v-8z M24,44h8v8h-8v-8z M44,44h8v8h-8v-8z" fill="#000" />
                    <rect x="12" y="12" width="4" height="4" fill="#000" />
                    <rect x="48" y="12" width="4" height="4" fill="#000" />
                    <rect x="12" y="48" width="4" height="4" fill="#000" />
                    <rect x="28" y="52" width="8" height="8" fill="#F59E0B" />
                    <rect x="52" y="52" width="4" height="4" fill="#000" />
                  </svg>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'white' }}>Scan QR Code</div>
                    <div style={{ fontSize: '9.5px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Valid for all standard UPI applications in India.</div>
                  </div>
                </div>

                {/* Simulate Button */}
                <button
                  onClick={handleSimulatePayment}
                  className="btn-primary"
                  style={{
                    padding: '11px',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(245,158,11, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Unlock size={14} /> Pay ₹399 & Unlock Directory
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
