import React, { useState } from 'react';
import { MapPin, Clock, Star, Navigation, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

// ─── Temple Data ──────────────────────────────────────────────────────────────
// Sourced from TTD official info, AP Tourism, and pilgrimage guides

interface Temple {
  id: string;
  name: string;
  deity: string;
  distance: string;        // from Tirupati town
  distanceKm: number;      // for sorting
  zone: 'tirumala' | 'tirupati' | 'nearby' | 'regional';
  timings: string;
  type: string;            // deity type
  significance: string;   // short one-liner
  description: string;
  highlights: string[];
  howToReach: string;
  bestTime: string;
  dressCode: string;
  rating: number;
  mapLink: string;
  image: string;
  ttdManaged: boolean;
  freeEntry: boolean;
  suggestedDuration: string;
}

const TEMPLES: Temple[] = [
  // ── ZONE 1: Tirumala Hilltop ──
  {
    id: 't1',
    name: 'Sri Venkateswara Swamy Temple',
    deity: 'Lord Venkateswara (Balaji)',
    distance: '11 km uphill from Tirupati',
    distanceKm: 11,
    zone: 'tirumala',
    timings: '2:30 AM – 1:00 AM (21hrs daily)',
    type: '⭐ Main Temple',
    significance: 'Richest & most visited temple in the world — 50,000+ pilgrims daily',
    description: 'The divine abode of Lord Venkateswara atop Tirumala Hills at 853m elevation. Considered the most sacred Vaishnavite shrine, it receives 70,000–1,00,000 devotees on peak days. The idol of Lord Venkateswara is considered Swayambhu (self-manifested).',
    highlights: [
      'Brahmotsavam festival (Sep–Oct) — most spectacular event',
      'Golden Vimana Gopuram visible for miles',
      'Sacred Pushkarani tank for ritual bath',
      'Kapila Theertham and Akasa Ganga holy springs nearby',
      'Laddu prasadam — world famous, 3 lakh distributed daily',
    ],
    howToReach: 'Foot trek via Alipiri (3,550 steps) or Srivari Mettu (2,388 steps). TTD buses from Alipiri every 10 min. Cab via Alipiri Ghat Road.',
    bestTime: 'Weekday mornings (4–7 AM) for shortest queues. Avoid Saturdays, public holidays.',
    dressCode: 'Men: Dhoti or pants + shirt (no shorts/bermuda). Women: Saree or churidar (no sleeveless tops, no jeans).',
    rating: 5.0,
    mapLink: 'https://maps.google.com/maps?q=Tirumala+Venkateswara+Temple',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=350&fit=crop&q=80',
    ttdManaged: true,
    freeEntry: false,
    suggestedDuration: '3–6 hours (queue dependent)',
  },
  {
    id: 't2',
    name: 'Sri Varahaswamy Temple',
    deity: 'Lord Varaha (Boar Avatar of Vishnu)',
    distance: '50 m from main temple',
    distanceKm: 11.05,
    zone: 'tirumala',
    timings: '6:00 AM – 12:00 PM, 3:00 PM – 8:00 PM',
    type: '🛕 Ancient Temple',
    significance: 'Devotees must first seek Varahaswamy\'s permission before entering main temple',
    description: 'Ancient temple dedicated to Lord Varaha, considered the "land lord" of Tirumala. According to tradition, Lord Venkateswara resides on Tirumala as a tenant of Lord Varaha and pays rent in the form of a portion of the offerings.',
    highlights: [
      'Mandatory first visit before main temple darshan',
      'One of the oldest shrines on Tirumala hill',
      'Unique Varaha (Boar) iconography',
      'No queue — usually peaceful darshan',
    ],
    howToReach: 'Located at the entrance to the main temple complex on Tirumala.',
    bestTime: 'Early morning 6–8 AM.',
    dressCode: 'Same as main Tirumala temple dress code.',
    rating: 4.8,
    mapLink: 'https://maps.google.com/maps?q=Varahaswamy+Temple+Tirumala',
    image: 'https://images.unsplash.com/photo-1605649461784-23c6f8f76c94?w=500&h=350&fit=crop&q=80',
    ttdManaged: true,
    freeEntry: true,
    suggestedDuration: '30 minutes',
  },
  {
    id: 't3',
    name: 'Akasa Ganga Theertham',
    deity: 'Sacred spring — Lord Venkateswara\'s divine water',
    distance: '3 km from Tirumala temple',
    distanceKm: 14,
    zone: 'tirumala',
    timings: '6:00 AM – 6:00 PM',
    type: '💧 Sacred Spring',
    significance: 'Natural spring water believed to flow from Lord\'s feet — used for temple rituals',
    description: 'A beautiful perennial spring at the base of Tirumala Hills where sacred water continuously flows. The water is collected and used for abhishekam (ritual bathing) of Lord Venkateswara. Pilgrims take a holy dip here. During Brahmotsavam, the Lord is brought here in a procession.',
    highlights: [
      'Natural waterfall on the hillside',
      'Water used daily for Lord\'s abhishekam',
      'Scenic forest surroundings',
      'Free entry — no TTD ticket required',
    ],
    howToReach: 'Located on the Alipiri footpath, about 3 km below Tirumala main temple.',
    bestTime: 'Year-round. Especially beautiful during monsoon (Jul–Sep).',
    dressCode: 'Casual — modest clothing recommended.',
    rating: 4.6,
    mapLink: 'https://maps.google.com/maps?q=Akasa+Ganga+Tirumala',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=500&h=350&fit=crop&q=80',
    ttdManaged: true,
    freeEntry: true,
    suggestedDuration: '1 hour',
  },

  // ── ZONE 2: Tirupati Town ──
  {
    id: 't4',
    name: 'Sri Padmavathi Ammavari Temple',
    deity: 'Goddess Padmavathi (Lakshmi)',
    distance: '5 km from Tirupati',
    distanceKm: 5,
    zone: 'tirupati',
    timings: '6:00 AM – 8:00 PM',
    type: '🌸 Goddess Temple',
    significance: 'Consort of Lord Venkateswara — considered equally important to visit',
    description: 'Located in Tiruchanur (also called Padmavathi Nagaram), this temple is dedicated to Goddess Padmavathi, the divine consort of Lord Venkateswara. According to legend, Lord Venkateswara married Padmavathi here before settling in Tirumala. Visiting Padmavathi before Tirumala is considered auspicious.',
    highlights: [
      'Tiruchanur Brahmotsavam festival (Sep) — grand celebration',
      'Beautiful golden idol of Goddess Padmavathi',
      'Pushkarini (holy tank) for ritual bath',
      'Easier and faster darshan than Tirumala',
      'Managed by TTD — laddu prasadam available',
    ],
    howToReach: 'Auto/cab from Tirupati Railway Station (15 min). TTD buses available from Tirupati Bus Stand.',
    bestTime: 'Early morning 6–9 AM for quick darshan.',
    dressCode: 'Same as Tirumala — traditional attire required.',
    rating: 4.9,
    mapLink: 'https://maps.google.com/maps?q=Padmavathi+Temple+Tiruchanur',
    image: 'https://images.unsplash.com/photo-1609766955699-f31e5efb7c2f?w=500&h=350&fit=crop&q=80',
    ttdManaged: true,
    freeEntry: false,
    suggestedDuration: '1–2 hours',
  },
  {
    id: 't5',
    name: 'Sri Govindarajaswamy Temple',
    deity: 'Lord Govindaraja (Reclining Vishnu)',
    distance: '1 km from Tirupati Railway Station',
    distanceKm: 1,
    zone: 'tirupati',
    timings: '6:30 AM – 12:30 PM, 4:30 PM – 8:30 PM',
    type: '🛕 Ancient Divya Desam',
    significance: '1 of 108 Divya Desams (sacred Vaishnava temples) — must-visit for devotees',
    description: 'An ancient temple in the heart of Tirupati town dedicated to Lord Govindaraja (Vishnu in reclining posture). Considered one of the 108 Divya Desams praised by Alvars. The temple architecture is stunning Dravidian style with a majestic 7-tier Rajagopuram. Tradition says Lord Venkateswara\'s elder brother resides here.',
    highlights: [
      'One of 108 Divya Desams of Vaishnavism',
      'Beautiful Reclining Vishnu (Shayana Kolam) idol',
      'Majestic 7-tiered Rajagopuram',
      'Central Tirupati location — easy to visit',
      'No long queues — peaceful experience',
    ],
    howToReach: 'Walk from Tirupati Railway Station (10 min) or auto (5 min).',
    bestTime: 'Morning 7–10 AM or evening 5–8 PM.',
    dressCode: 'Traditional clothing preferred. No shorts.',
    rating: 4.7,
    mapLink: 'https://maps.google.com/maps?q=Govindarajaswamy+Temple+Tirupati',
    image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=500&h=350&fit=crop&q=80',
    ttdManaged: false,
    freeEntry: true,
    suggestedDuration: '1 hour',
  },
  {
    id: 't6',
    name: 'Sri Kodandarama Swamy Temple',
    deity: 'Lord Rama, Sita, Lakshmana & Hanuman',
    distance: '2 km from Tirupati town centre',
    distanceKm: 2,
    zone: 'tirupati',
    timings: '6:00 AM – 12:00 PM, 4:00 PM – 8:30 PM',
    type: '🏹 Rama Temple',
    significance: 'Ancient temple where Lord Rama\'s consecration ceremony was performed',
    description: 'A beautiful ancient temple dedicated to Lord Rama. The presiding deity is Kodanda Rama (Rama holding his bow — Kodanda). The temple is closely associated with the Ramayana and is believed to be one of the places where Rama rested during his search for Sita.',
    highlights: [
      'Sri Rama Navami festival — 9-day grand celebration',
      'Beautiful sculptures depicting Ramayana scenes',
      'Peaceful, less crowded than Tirumala',
      'Evening prayers (Harati) very serene',
    ],
    howToReach: 'Auto or walk from Tirupati town centre.',
    bestTime: 'Evening 5–8 PM for beautiful prayers.',
    dressCode: 'Modest traditional attire.',
    rating: 4.5,
    mapLink: 'https://maps.google.com/maps?q=Kodandarama+Temple+Tirupati',
    image: 'https://images.unsplash.com/photo-1609766878971-c893c53a0d67?w=500&h=350&fit=crop&q=80',
    ttdManaged: false,
    freeEntry: true,
    suggestedDuration: '45 minutes',
  },
  {
    id: 't7',
    name: 'Sri Kapileswara Swamy Temple',
    deity: 'Lord Kapileswara (Shiva)',
    distance: '3 km from Tirupati town',
    distanceKm: 3,
    zone: 'tirupati',
    timings: '5:30 AM – 1:00 PM, 3:00 PM – 9:00 PM',
    type: '🔱 Shiva Temple',
    significance: 'Ancient Shiva temple at Kapila Theertham waterfall — Shiva watches over Venkateswara',
    description: 'Located at the base of Tirumala Hills at Kapila Theertham, this is the only Shiva temple on the Tirumala-Tirupati complex. A beautiful natural waterfall (active in monsoon) is adjacent to the temple. Legend says Lord Shiva resides here as the protector of Lord Venkateswara.',
    highlights: [
      'Natural Kapila Theertham waterfall nearby',
      'Beautiful scenic location at hill base',
      'Maha Shivaratri — massive celebrations',
      'Starting point of Alipiri trekking path',
      'Rare Shiva temple in Vaishnava pilgrimage complex',
    ],
    howToReach: 'Auto from Tirupati (10 min). At Alipiri footpath entrance.',
    bestTime: 'Morning 6–9 AM, especially beautiful after rains.',
    dressCode: 'Modest clothing. Men traditionally enter without shirt (dhoti only) for some rituals.',
    rating: 4.6,
    mapLink: 'https://maps.google.com/maps?q=Kapileswara+Temple+Tirupati',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&h=350&fit=crop&q=80',
    ttdManaged: false,
    freeEntry: true,
    suggestedDuration: '1 hour',
  },

  // ── ZONE 3: Nearby (15–70 km) ──
  {
    id: 't8',
    name: 'Sri Kalyana Venkateswara Temple',
    deity: 'Lord Kalyana Venkateswara (Wedding form)',
    distance: '15 km from Tirupati',
    distanceKm: 15,
    zone: 'nearby',
    timings: '6:00 AM – 8:00 PM',
    type: '💍 Wedding Vishnu Temple',
    significance: 'Where Lord Venkateswara married Goddess Padmavathi — couples seek blessings here',
    description: 'Located in Srinivasa Mangapuram, this temple depicts Lord Venkateswara in his wedding form (Kalyana Kolam) with Goddess Padmavathi. Newlywed couples and those praying for marriage traditionally visit this temple. The idol shows Lord Venkateswara in wedding attire — extremely rare and beautiful.',
    highlights: [
      'Lord depicted in wedding attire — unique in India',
      'Famous for couples seeking marriage blessings',
      'Kalyanam (celestial wedding) performed daily',
      'Beautiful temple architecture',
      'Much less crowded than Tirumala',
    ],
    howToReach: 'Cab/auto from Tirupati (30 min). APSRTC buses available from Tirupati Bus Stand.',
    bestTime: 'Morning 7–11 AM.',
    dressCode: 'Traditional attire. Same as Tirumala standards.',
    rating: 4.7,
    mapLink: 'https://maps.google.com/maps?q=Kalyana+Venkateswara+Temple+Srinivasa+Mangapuram',
    image: 'https://images.unsplash.com/photo-1622836454484-f6af68d25fcd?w=500&h=350&fit=crop&q=80',
    ttdManaged: true,
    freeEntry: false,
    suggestedDuration: '1.5 hours',
  },
  {
    id: 't9',
    name: 'Sri Kalahastiswara Temple',
    deity: 'Lord Kalahastiswara (Shiva) & Jnana Prasunamba',
    distance: '36 km from Tirupati',
    distanceKm: 36,
    zone: 'nearby',
    timings: '6:00 AM – 8:00 PM',
    type: '🔱 Famous Shiva Temple',
    significance: 'Vayusthalasthambha (Shiva of Air element) — one of 5 Panchabhoota Stalas',
    description: 'One of the most important Shiva temples in South India, part of the Panchabhoota Stalas (5 temples representing 5 elements — this one is Air/Vayu). The temple is famous for Rahu-Ketu Pooja performed to remove astrological doshas. Built on the banks of River Swarnamukhi with stunning Dravidian architecture.',
    highlights: [
      'One of 5 Panchabhoota Sthala temples',
      'Famous Rahu-Ketu Sarpa Dosha Nivarana Pooja',
      'Beautiful Swarna Mukhi River embankment',
      'Stunning rock-cut architecture',
      'Maha Shivaratri — one of the grandest in South India',
    ],
    howToReach: 'Cab from Tirupati (1 hour, 36 km). APSRTC buses from Tirupati every hour.',
    bestTime: 'Weekday mornings. Avoid Rahu kalam and Mondays (very crowded).',
    dressCode: 'Men: Dhoti only for entering main sanctum. Women: Traditional attire.',
    rating: 4.8,
    mapLink: 'https://maps.google.com/maps?q=Srikalahasti+Temple',
    image: 'https://images.unsplash.com/photo-1605649461784-23c6f8f76c94?w=500&h=350&fit=crop&q=80',
    ttdManaged: false,
    freeEntry: false,
    suggestedDuration: '2–3 hours',
  },
  {
    id: 't10',
    name: 'Sri Kanipakam Vinayaka Temple',
    deity: 'Lord Vinayaka (Swayambhu Ganesha)',
    distance: '70 km from Tirupati',
    distanceKm: 70,
    zone: 'nearby',
    timings: '5:00 AM – 9:00 PM',
    type: '🐘 Ganesha Temple',
    significance: 'Swayambhu (self-manifested) growing Ganesha idol — one of most powerful Vinayaka temples',
    description: 'One of the most powerful and famous Ganesha temples in India. The unique feature is that the idol of Lord Vinayaka is Swayambhu (self-emerged) and is said to be still growing in size over centuries. The idol is submerged in a sacred tank and only the head and shoulders are visible. Remarkable miraculous stories are associated with this temple.',
    highlights: [
      'Self-manifested (Swayambhu) Ganesha idol — still growing!',
      'Brahmotsavam — elaborate 11-day festival',
      'Idol partially submerged in sacred pond',
      'Vinayaka Chaturthi — 50,000+ devotees annually',
      'Associated with miraculous stories of justice and prayer',
    ],
    howToReach: 'Cab from Tirupati (1.5 hours, 70 km via Chittoor). APSRTC buses available.',
    bestTime: 'Early morning. Avoid Vinayaka Chaturthi (extremely crowded).',
    dressCode: 'Modest traditional attire.',
    rating: 4.8,
    mapLink: 'https://maps.google.com/maps?q=Kanipakam+Vinayaka+Temple',
    image: 'https://images.unsplash.com/photo-1618085219724-c59ba48e08cd?w=500&h=350&fit=crop&q=80',
    ttdManaged: false,
    freeEntry: false,
    suggestedDuration: '2 hours',
  },
  {
    id: 't11',
    name: 'Sri Venkateswara Temple (Sila Thoranam)',
    deity: 'Natural Rock Arch — divine formation',
    distance: '1 km from Tirumala temple',
    distanceKm: 12,
    zone: 'tirumala',
    timings: 'Open sunrise to sunset',
    type: '🪨 Natural Marvel',
    significance: 'Only known natural arch formation in Asia — shaped like a Serpent hood (Adi Sesha)',
    description: 'Silathoranam is a unique natural rock arch on Tirumala hills, formed over millions of years. The arch resembles a serpent hood (Adi Sesha) under which Lord Venkateswara is believed to rest. The Geological Survey of India considers it a rare natural formation. It is considered sacred and is located in a beautiful forest area.',
    highlights: [
      'Only natural arch formation of its kind in Asia',
      'Resembles Adi Sesha (divine serpent) hood',
      'Surrounded by pristine Tirumala forest',
      'Declared a protected geological site by GSI',
      'Peaceful, off-the-beaten-path spot',
    ],
    howToReach: 'From Tirumala temple complex — 1 km trek through forest path.',
    bestTime: 'Morning 7–11 AM.',
    dressCode: 'Comfortable walking clothes.',
    rating: 4.5,
    mapLink: 'https://maps.google.com/maps?q=Silathoranam+Tirumala',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop&q=80',
    ttdManaged: true,
    freeEntry: true,
    suggestedDuration: '1 hour',
  },
  {
    id: 't12',
    name: 'Iskon Temple Tirupati',
    deity: 'Lord Krishna & Radha',
    distance: '3 km from Tirupati town',
    distanceKm: 3,
    zone: 'tirupati',
    timings: '4:30 AM – 8:30 PM',
    type: '🪷 Radha Krishna Temple',
    significance: 'Beautiful modern ISKCON temple — serene spiritual atmosphere',
    description: 'A magnificent ISKCON temple dedicated to Sri Sri Radha Govinda. The temple complex is clean, beautiful, and serene. Famous for their Vedic cultural programs and delicious prasadam (meals). Many pilgrims visiting Tirupati include this in their itinerary for a different spiritual experience.',
    highlights: [
      'Beautiful gilded gopuram and architecture',
      'Free Vedic meals (prasadam) for all devotees',
      'Cultural programs and Bhajans daily',
      'Book shop with Vedic literature',
      'Accommodation available for pilgrims',
    ],
    howToReach: 'Auto from Tirupati Bus Stand or Railway Station (15 min).',
    bestTime: 'Morning 7–10 AM (beautiful aarti) or evening 6–8 PM.',
    dressCode: 'Modest clothing. Sleeveless not allowed.',
    rating: 4.6,
    mapLink: 'https://maps.google.com/maps?q=ISKCON+Temple+Tirupati',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=350&fit=crop&q=80',
    ttdManaged: false,
    freeEntry: true,
    suggestedDuration: '1.5 hours',
  },
];

// ─── Trip Combinations ────────────────────────────────────────────────────────
const TRIP_PLANS = [
  {
    id: 'plan1',
    title: '1-Day Tirupati Darshan',
    icon: '⚡',
    color: '#C8860A',
    duration: '1 Day',
    templeIds: ['t4', 't5', 't1', 't2'],
    description: 'Cover the most essential temples in one day',
    tips: 'Start at 5 AM with Padmavathi Temple, then proceed to Tirumala by noon for Darshan.',
  },
  {
    id: 'plan2',
    title: '2-Day Complete Circuit',
    icon: '🌟',
    color: '#8B0000',
    duration: '2 Days',
    templeIds: ['t5', 't7', 't4', 't6', 't1', 't2', 't3', 't8'],
    description: 'Full Tirupati town + Tirumala experience',
    tips: 'Day 1: Tirupati town temples. Day 2: Tirumala darshan + Srinivasa Mangapuram.',
  },
  {
    id: 'plan3',
    title: '3-Day Grand Pilgrimage',
    icon: '👑',
    color: '#1D4ED8',
    duration: '3 Days',
    templeIds: ['t5', 't6', 't7', 't12', 't4', 't8', 't1', 't2', 't3', 't11', 't9'],
    description: 'Complete pilgrim circuit covering 10+ temples',
    tips: 'Day 1: Tirupati town. Day 2: Tirumala + Srinivasa Mangapuram. Day 3: Srikalahasti.',
  },
  {
    id: 'plan4',
    title: '4-Day Mega Circuit',
    icon: '🏆',
    color: '#059669',
    duration: '4 Days',
    templeIds: ['t5', 't6', 't7', 't12', 't4', 't8', 't1', 't2', 't3', 't11', 't9', 't10'],
    description: 'All major temples including Kanipakam Ganesha',
    tips: 'Day 4: Drive to Kanipakam (70km). All 12 temples covered. Book cab for Day 3–4.',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ZONE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  tirumala: { label: '🏔️ Tirumala Hilltop', color: '#C8860A',  bg: 'rgba(200,134,10,0.1)' },
  tirupati: { label: '🏙️ Tirupati Town',    color: '#1D4ED8',  bg: 'rgba(29,78,216,0.1)' },
  nearby:   { label: '📍 Nearby (15–70km)', color: '#059669',  bg: 'rgba(5,150,105,0.1)' },
  regional: { label: '🗺️ Regional',          color: '#7C3AED',  bg: 'rgba(124,58,237,0.1)' },
};

// ─── Temple Card ──────────────────────────────────────────────────────────────
function TempleCard({ temple }: { temple: Temple }) {
  const [expanded, setExpanded] = useState(false);
  const zone = ZONE_LABELS[temple.zone];

  return (
    <div style={{
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = 'var(--shadow-card)';
        el.style.transform = '';
      }}
    >
      {/* Header Image */}
      <div style={{ position: 'relative', height: '130px', overflow: 'hidden' }}>
        <img
          src={temple.image}
          alt={temple.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1605649461784-23c6f8f76c94?w=500&h=350&fit=crop&q=80'; }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        }} />
        {/* Zone badge */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: 'rgba(255,255,255,0.9)',
          color: zone.color,
          border: `1px solid ${zone.color}40`,
          padding: '3px 10px', borderRadius: '100px',
          fontSize: '11px', fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          backdropFilter: 'blur(8px)',
        }}>
          {zone.label}
        </div>
        {/* Distance badge */}
        <div style={{
          position: 'absolute', bottom: '10px', right: '10px',
          background: 'rgba(0,0,0,0.75)',
          color: 'white', padding: '3px 10px',
          borderRadius: '100px', fontSize: '10px', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: '4px',
          fontFamily: "'Inter', sans-serif",
        }}>
          <Navigation size={9} /> {temple.distance}
        </div>
        {/* Rating */}
        <div style={{
          position: 'absolute', bottom: '10px', left: '10px',
          display: 'flex', alignItems: 'center', gap: '3px',
          background: 'rgba(0,0,0,0.75)', color: '#F59E0B',
          padding: '3px 8px', borderRadius: '100px',
          fontSize: '11px', fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
        }}>
          <Star size={10} fill="#F59E0B" /> {temple.rating.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px' }}>
        {/* Type badge + Free/Paid */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, color: '#C8860A',
            fontFamily: "'Inter', sans-serif",
          }}>
            {temple.type}
          </span>
          <span style={{
            fontSize: '10px', fontWeight: 700,
            color: temple.freeEntry ? '#22C55E' : '#6B7280',
            background: temple.freeEntry ? 'rgba(34,197,94,0.1)' : 'rgba(107,114,128,0.1)',
            padding: '2px 8px', borderRadius: '100px',
            border: `1px solid ${temple.freeEntry ? 'rgba(34,197,94,0.3)' : 'rgba(107,114,128,0.2)'}`,
            fontFamily: "'Inter', sans-serif",
          }}>
            {temple.freeEntry ? '✓ Free Entry' : 'Ticket Req.'}
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700, fontSize: '14px',
          color: 'var(--color-text)', margin: '0 0 4px', lineHeight: 1.3,
        }}>
          {temple.name}
        </h3>
        <div style={{
          fontSize: '12px', color: '#C8860A', fontWeight: 600,
          fontFamily: "'Inter', sans-serif", marginBottom: '6px',
        }}>
          🙏 {temple.deity}
        </div>

        {/* Significance */}
        <p style={{
          fontSize: '12px', color: 'var(--color-text-muted)',
          fontFamily: "'Inter', sans-serif", margin: '0 0 10px',
          lineHeight: 1.5,
        }}>
          {temple.significance}
        </p>

        {/* Timings + Duration */}
        <div style={{
          display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            fontSize: '11px', color: 'var(--color-text-muted)',
            fontFamily: "'Inter', sans-serif",
          }}>
            <Clock size={11} color="#F59E0B" /> {temple.timings}
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(s => !s)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '5px', padding: '8px', borderRadius: '8px',
            background: 'var(--color-bg)', border: '1px solid var(--color-border)',
            cursor: 'pointer', fontSize: '12px', fontWeight: 600,
            color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif",
            transition: 'all 0.15s',
          }}
        >
          {expanded ? <><ChevronUp size={13} /> Hide Details</> : <><ChevronDown size={13} /> View Details</>}
        </button>

        {/* Expanded details */}
        {expanded && (
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Description */}
            <p style={{
              fontSize: '12px', color: 'var(--color-text)',
              fontFamily: "'Inter', sans-serif", lineHeight: 1.7, margin: 0,
              padding: '12px', background: 'var(--color-bg)',
              borderRadius: '10px', borderLeft: '3px solid #C8860A',
            }}>
              {temple.description}
            </p>

            {/* Highlights */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#C8860A', marginBottom: '6px', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ✨ Highlights
              </div>
              {temple.highlights.map((h, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '6px', marginBottom: '4px',
                  fontSize: '12px', color: 'var(--color-text)',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  <span style={{ color: '#C8860A', flexShrink: 0 }}>•</span> {h}
                </div>
              ))}
            </div>

            {/* Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { icon: '🚗', label: 'How to Reach', value: temple.howToReach },
                { icon: '⏰', label: 'Best Time', value: temple.bestTime },
                { icon: '👘', label: 'Dress Code', value: temple.dressCode },
                { icon: '⏱️', label: 'Suggested Duration', value: temple.suggestedDuration },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '10px 12px', borderRadius: '10px',
                  background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.4px', fontFamily: "'Inter', sans-serif" }}>
                    {item.icon} {item.label}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text)', lineHeight: 1.4, fontFamily: "'Inter', sans-serif" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {temple.ttdManaged && (
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#C8860A', background: 'rgba(200,134,10,0.1)', padding: '3px 8px', borderRadius: '100px', border: '1px solid rgba(200,134,10,0.25)', fontFamily: "'Inter', sans-serif" }}>
                  🛕 TTD Managed
                </span>
              )}
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#1D4ED8', background: 'rgba(29,78,216,0.1)', padding: '3px 8px', borderRadius: '100px', border: '1px solid rgba(29,78,216,0.25)', fontFamily: "'Inter', sans-serif" }}>
                📍 {temple.distanceKm} km from Tirupati
              </span>
            </div>

            {/* Map Link */}
            <a
              href={temple.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '6px', padding: '9px', borderRadius: '10px',
                background: 'rgba(29,78,216,0.08)', border: '1px solid rgba(29,78,216,0.2)',
                textDecoration: 'none', color: '#1D4ED8',
                fontSize: '12px', fontWeight: 700, fontFamily: "'Inter', sans-serif",
              }}
            >
              <MapPin size={13} /> View on Google Maps <ExternalLink size={11} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Trip Plan Card ───────────────────────────────────────────────────────────
function TripPlanCard({ plan }: { plan: typeof TRIP_PLANS[0] }) {
  const temples = TEMPLES.filter(t => plan.templeIds.includes(t.id));

  return (
    <div style={{
      background: 'var(--color-card)',
      border: `2px solid ${plan.color}30`,
      borderRadius: '16px', padding: '18px',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: `${plan.color}20`,
          border: `1.5px solid ${plan.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', flexShrink: 0,
        }}>
          {plan.icon}
        </div>
        <div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--color-text)' }}>
            {plan.title}
          </div>
          <div style={{ fontSize: '11px', color: plan.color, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
            {plan.duration} • {plan.templeIds.length} Temples
          </div>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: '0 0 10px', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
        {plan.description}
      </p>
      {/* Temple list */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
        {temples.map(t => (
          <span key={t.id} style={{
            fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)',
            background: 'var(--color-bg)', border: '1px solid var(--color-border)',
            padding: '3px 8px', borderRadius: '100px',
            fontFamily: "'Inter', sans-serif",
          }}>
            {t.name.replace('Sri ', '').split(' ').slice(0, 2).join(' ')}
          </span>
        ))}
      </div>
      <div style={{
        padding: '10px 12px', borderRadius: '10px',
        background: `${plan.color}08`, borderLeft: `3px solid ${plan.color}`,
        fontSize: '12px', color: 'var(--color-text)',
        fontFamily: "'Inter', sans-serif", lineHeight: 1.5,
      }}>
        💡 <strong>Tip:</strong> {plan.tips}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NearbyTemplesPage(): JSX.Element {
  const [activeZone, setActiveZone] = useState<'all' | 'tirumala' | 'tirupati' | 'nearby'>('all');
  const [activeView, setActiveView] = useState<'temples' | 'plans'>('temples');

  const filteredTemples = activeZone === 'all'
    ? TEMPLES
    : TEMPLES.filter(t => t.zone === activeZone);

  const zones: { key: 'all' | 'tirumala' | 'tirupati' | 'nearby'; label: string; count: number }[] = [
    { key: 'all',      label: 'All Temples',       count: TEMPLES.length },
    { key: 'tirumala', label: '🏔️ Tirumala Hill',   count: TEMPLES.filter(t => t.zone === 'tirumala').length },
    { key: 'tirupati', label: '🏙️ Tirupati Town',   count: TEMPLES.filter(t => t.zone === 'tirupati').length },
    { key: 'nearby',   label: '📍 Nearby (15–70km)', count: TEMPLES.filter(t => t.zone === 'nearby').length },
  ];

  return (
    <div style={{ maxWidth: '900px', paddingBottom: '40px' }}>

      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', boxShadow: '0 4px 16px rgba(200,134,10,0.4)',
          }}>
            🛕
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif", fontSize: '26px', fontWeight: 800,
              background: 'linear-gradient(135deg, #C8860A, #F59E0B)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', margin: 0, lineHeight: 1.2,
            }}>
              Nearby Temples Guide
            </h1>
            <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '13px' }}>
              {TEMPLES.length} sacred temples near Tirupati • Complete visit guide with timings & tips
            </p>
          </div>
        </div>

        {/* Feature badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          {[
            { icon: '🗺️', text: `${TEMPLES.length} Temples Mapped` },
            { icon: '⏰', text: 'Live Timings' },
            { icon: '📅', text: 'Trip Plans Included' },
            { icon: '💡', text: 'Local Tips & Dress Code' },
          ].map(b => (
            <span key={b.text} style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 10px', borderRadius: '100px',
              background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.2)',
              fontSize: '11px', fontWeight: 600, color: '#C8860A',
              fontFamily: "'Inter', sans-serif",
            }}>
              {b.icon} {b.text}
            </span>
          ))}
        </div>
      </div>

      {/* ── View Toggle ──────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[
          { key: 'temples' as const, label: '🛕 Temple Directory' },
          { key: 'plans' as const, label: '📅 Ready-Made Trip Plans' },
        ].map(v => (
          <button
            key={v.key}
            onClick={() => setActiveView(v.key)}
            style={{
              padding: '10px 20px', borderRadius: '10px', cursor: 'pointer',
              background: activeView === v.key ? 'linear-gradient(135deg, #C8860A, #F59E0B)' : 'var(--color-card)',
              border: activeView === v.key ? 'none' : '1px solid var(--color-border)',
              color: activeView === v.key ? 'white' : 'var(--color-text)',
              fontSize: '13px', fontWeight: 700, fontFamily: "'Poppins', sans-serif",
              boxShadow: activeView === v.key ? '0 4px 14px rgba(200,134,10,0.4)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* ── Temple Directory View ─────────────────────────────────────────────── */}
      {activeView === 'temples' && (
        <>
          {/* Zone Filter */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {zones.map(z => (
              <button
                key={z.key}
                onClick={() => setActiveZone(z.key)}
                style={{
                  padding: '7px 16px', borderRadius: '100px', cursor: 'pointer',
                  background: activeZone === z.key ? 'rgba(200,134,10,0.15)' : 'var(--color-card)',
                  border: activeZone === z.key ? '2px solid #C8860A' : '1px solid var(--color-border)',
                  color: activeZone === z.key ? '#C8860A' : 'var(--color-text-muted)',
                  fontSize: '12px', fontWeight: 600, fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.15s',
                }}
              >
                {z.label}
                <span style={{
                  marginLeft: '6px', background: activeZone === z.key ? '#C8860A' : 'var(--color-border)',
                  color: activeZone === z.key ? 'white' : 'var(--color-text-muted)',
                  padding: '1px 7px', borderRadius: '100px', fontSize: '10px', fontWeight: 700,
                }}>
                  {z.count}
                </span>
              </button>
            ))}
          </div>

          {/* Temples Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {filteredTemples.map(temple => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        </>
      )}

      {/* ── Trip Plans View ───────────────────────────────────────────────────── */}
      {activeView === 'plans' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {TRIP_PLANS.map(plan => (
            <TripPlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}
