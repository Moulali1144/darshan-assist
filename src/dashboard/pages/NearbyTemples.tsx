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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tirumala_temple.jpg/480px-Tirumala_temple.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Varahaswamy_temple_Tirumala.jpg/480px-Varahaswamy_temple_Tirumala.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Akasa_Ganga_Tirumala.jpg/480px-Akasa_Ganga_Tirumala.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Padmavati_Ammavaru_temple_Tiruchanur.jpg/480px-Padmavati_Ammavaru_temple_Tiruchanur.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Govindarajaswamy_temple_Tirupati.jpg/480px-Govindarajaswamy_temple_Tirupati.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Kodanda_Ramaswamy_Temple_Tirupati.jpg/480px-Kodanda_Ramaswamy_Temple_Tirupati.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Kapileswara_Tirupati.jpg/480px-Kapileswara_Tirupati.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kalyana_Venkateswara_temple_Srinivasa_Mangapuram.jpg/480px-Kalyana_Venkateswara_temple_Srinivasa_Mangapuram.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sri_Kalahastisvara_temple.jpg/480px-Sri_Kalahastisvara_temple.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Kanipakam_temple.jpg/480px-Kanipakam_temple.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Silathoranam_Tirumala.jpg/480px-Silathoranam_Tirumala.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/ISKCON_Tirupati.jpg/480px-ISKCON_Tirupati.jpg',
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

// ─── Zone gradient fallback colors ──────────────────────────────────────────
const ZONE_GRADIENTS: Record<string, string> = {
  tirumala: 'linear-gradient(135deg, #C8860A 0%, #F59E0B 50%, #78350F 100%)',
  tirupati: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 50%, #1E3A8A 100%)',
  nearby:   'linear-gradient(135deg, #059669 0%, #10B981 50%, #065F46 100%)',
  regional: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #4C1D95 100%)',
};

// ─── Temple Image with no-flicker fallback ────────────────────────────────────
function TempleImage({ temple }: { temple: Temple }) {
  const [failed, setFailed] = useState(false);
  const zone = ZONE_LABELS[temple.zone];

  if (failed) {
    return (
      <div style={{
        width: '100%', height: '130px',
        background: ZONE_GRADIENTS[temple.zone] || ZONE_GRADIENTS.tirumala,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '6px',
      }}>
        <div style={{ fontSize: '38px' }}>🛕</div>
        <div style={{
          fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.9)',
          fontFamily: "'Inter', sans-serif", textAlign: 'center',
          padding: '0 10px',
        }}>
          {temple.name.replace('Sri ', '')}
        </div>
      </div>
    );
  }

  return (
    <img
      src={temple.image}
      alt={temple.name}
      style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
      onError={() => setFailed(true)}
    />
  );
}

// ─── Car/Cab Options ─────────────────────────────────────────────────────────
const CAB_OPTIONS = [
  { name: 'OLA Cabs', icon: '🟢', type: 'App', contact: 'ola.com / OLA App', note: 'Auto + Cab available in Tirupati city' },
  { name: 'Uber', icon: '⚫', type: 'App', contact: 'uber.com / Uber App', note: 'Limited availability — use in Tirupati town' },
  { name: 'TTD Pilgrim Vehicles', icon: '🛕', type: 'Official', contact: '0877-2264444', note: 'Dedicated TTD buses & sharing vehicles to Tirumala' },
  { name: 'Tirupati Cab Service', icon: '🚗', type: 'Local', contact: '+91 98857 00099', note: 'Local operators — full-day car hire to Srikalahasti, Kanipakam' },
  { name: 'APSRTC Buses', icon: '🚌', type: 'State Bus', contact: '0877-2225099', note: 'Buses to Tirumala, Srikalahasti, Kanipakam (cheapest option)' },
  { name: 'Red Taxi (Tirupati)', icon: '🚕', type: 'Local', contact: '+91 94403 08444', note: 'City taxis with fixed meter. Ask for pilgrim circuits.' },
];

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
      {/* Header Image — state-based fallback, no flicker */}
      <div style={{ position: 'relative', height: '130px', overflow: 'hidden' }}>
        <TempleImage temple={temple} />
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
const PLAN_SCHEDULES: Record<string, { day: string; activities: string[] }[]> = {
  plan1: [
    { day: 'Day 1 — Arrival', activities: ['5:00 AM — Sri Padmavathi Temple (Tiruchanur, 1–2 hrs)', '8:00 AM — Sri Govindarajaswamy Temple (Tirupati, 45 min)', '11:00 AM — Alipiri / Bus to Tirumala', '1:00 PM — Sri Varahaswamy darshan first (mandatory)', '2:00 PM — Main Temple Darshan (3–5 hrs)', 'Evening — Tirumala Prasadam & Rest'] },
  ],
  plan2: [
    { day: 'Day 1 — Tirupati', activities: ['6:00 AM — Kapileswara Temple (Alipiri waterfall, 1 hr)', '8:30 AM — Sri Govindarajaswamy Temple (1 hr)', '10:30 AM — Sri Kodandarama Temple (45 min)', '12:00 PM — ISKCON Tirupati Lunch + Darshan', '3:00 PM — Sri Padmavathi Temple, Tiruchanur (1.5 hrs)', '5:30 PM — Rest at hotel'] },
    { day: 'Day 2 — Tirumala + Mangapuram', activities: ['5:00 AM — Travel to Tirumala (bus/ghat road)', '6:00 AM — Varahaswamy + Main Darshan', 'Afternoon — Akasa Ganga spring', '4:00 PM — Kalyana Venkateswara Temple (Srinivasa Mangapuram, 15 km)', '6:30 PM — Return to Tirupati'] },
  ],
  plan3: [
    { day: 'Day 1 — Tirupati Town', activities: ['6:00 AM — Kapileswara Shiva Temple', '8:00 AM — Govindarajaswamy Temple', '10:00 AM — Kodandarama Temple', '11:30 AM — ISKCON Tirupati (lunch)', '3:00 PM — Padmavathi Temple, Tiruchanur'] },
    { day: 'Day 2 — Tirumala Full Day', activities: ['5:00 AM — Alipiri foot trek OR bus to Tirumala', '7:00 AM — Varahaswamy Temple (mandatory first)', '8:00 AM — Main Venkateswara Darshan', 'Afternoon — Silathoranam rock arch (1 km trek)', '4:00 PM — Akasa Ganga holy spring'] },
    { day: 'Day 3 — Nearby Circuits', activities: ['7:00 AM — Kalyana Venkateswara, Mangapuram (15 km)', '10:00 AM — Srikalahasti Temple (36 km, Rahu-Ketu pooja)', '2:00 PM — River Swarnamukhi walk', '4:00 PM — Return to Tirupati / Depart'] },
  ],
  plan4: [
    { day: 'Day 1 — Tirupati Town', activities: ['6:00 AM — Kapileswara Temple', '8:00 AM — Govindarajaswamy Temple', '10:00 AM — Kodandarama Temple + ISKCON', '3:00 PM — Padmavathi Temple, Tiruchanur'] },
    { day: 'Day 2 — Tirumala Full Day', activities: ['5:00 AM — Bus/Cab to Tirumala', '7:00 AM — Varahaswamy + Main Darshan', 'Afternoon — Silathoranam + Akasa Ganga'] },
    { day: 'Day 3 — Srikalahasti Circuit', activities: ['7:00 AM — Kalyana Venkateswara, Mangapuram', '11:00 AM — Srikalahasti Temple (Rahu-Ketu pooja)', 'Evening — Return to Tirupati'] },
    { day: 'Day 4 — Kanipakam (70 km)', activities: ['6:00 AM — Drive to Kanipakam Vinayaka Temple (1.5 hrs)', '8:00 AM — Kanipakam Ganesha Darshan (2 hrs)', '11:00 AM — Return journey + Tirupati shopping', 'Afternoon — Depart'] },
  ],
};

const PLAN_COSTS: Record<string, { item: string; est: string }[]> = {
  plan1: [
    { item: 'Cab (1 day, within city + Tirumala)', est: '₹800–1,500' },
    { item: 'TTD Darshan Ticket (₹300 / Srivani)', est: '₹300–1,000/person' },
    { item: 'Accommodation (1 night)', est: '₹800–2,500' },
    { item: 'Food & Prasadam', est: '₹300–600' },
  ],
  plan2: [
    { item: 'Cab (2 days)', est: '₹1,500–2,500' },
    { item: 'TTD Darshan Ticket', est: '₹300–1,000/person' },
    { item: 'Accommodation (2 nights)', est: '₹1,600–5,000' },
    { item: 'Meals (2 days)', est: '₹600–1,200' },
  ],
  plan3: [
    { item: 'Cab (3-day full hire)', est: '₹3,000–5,000' },
    { item: 'TTD Darshan Ticket', est: '₹300–1,000/person' },
    { item: 'Srikalahasti Pooja', est: '₹500–2,000' },
    { item: 'Accommodation (3 nights)', est: '₹2,400–7,500' },
    { item: 'Meals (3 days)', est: '₹900–1,800' },
  ],
  plan4: [
    { item: 'Cab (4-day full hire incl. Kanipakam)', est: '₹4,500–7,500' },
    { item: 'TTD Darshan + Poojas', est: '₹1,000–3,000/person' },
    { item: 'Accommodation (4 nights)', est: '₹3,200–10,000' },
    { item: 'Kanipakam entry + pooja', est: '₹200–500' },
    { item: 'Meals (4 days)', est: '₹1,200–2,400' },
  ],
};

function TripPlanCard({ plan }: { plan: typeof TRIP_PLANS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const temples = TEMPLES.filter(t => plan.templeIds.includes(t.id));
  const schedule = PLAN_SCHEDULES[plan.id] || [];
  const costs = PLAN_COSTS[plan.id] || [];

  return (
    <div style={{
      background: 'var(--color-card)',
      border: `2px solid ${plan.color}30`,
      borderRadius: '16px', padding: '18px',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* Header */}
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

      {/* Temple chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
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

      {/* Tip */}
      <div style={{
        padding: '10px 12px', borderRadius: '10px',
        background: `${plan.color}08`, borderLeft: `3px solid ${plan.color}`,
        fontSize: '12px', color: 'var(--color-text)',
        fontFamily: "'Inter', sans-serif", lineHeight: 1.5,
        marginBottom: '10px',
      }}>
        💡 <strong>Tip:</strong> {plan.tips}
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(s => !s)}
        style={{
          width: '100%', padding: '8px', borderRadius: '8px', cursor: 'pointer',
          background: expanded ? `${plan.color}15` : 'var(--color-bg)',
          border: `1px solid ${plan.color}30`,
          color: plan.color, fontSize: '12px', fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
        }}
      >
        {expanded ? '▲ Hide Full Plan' : '▼ Show Day-by-Day Plan + Car Hire Info'}
      </button>

      {expanded && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Day-by-day schedule */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: plan.color, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: "'Inter', sans-serif" }}>
              📅 Day-by-Day Schedule
            </div>
            {schedule.map((day, di) => (
              <div key={di} style={{ marginBottom: '12px' }}>
                <div style={{
                  fontSize: '12px', fontWeight: 700, color: 'var(--color-text)',
                  fontFamily: "'Poppins', sans-serif", marginBottom: '5px',
                  background: `${plan.color}10`, padding: '5px 10px',
                  borderRadius: '6px', borderLeft: `3px solid ${plan.color}`,
                }}>
                  {day.day}
                </div>
                {day.activities.map((act, ai) => (
                  <div key={ai} style={{
                    display: 'flex', gap: '6px', marginBottom: '3px',
                    fontSize: '11px', color: 'var(--color-text)',
                    fontFamily: "'Inter', sans-serif", paddingLeft: '4px',
                  }}>
                    <span style={{ color: plan.color, flexShrink: 0 }}>›</span> {act}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Cost estimate */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: "'Inter', sans-serif" }}>
              💰 Estimated Cost (per group)
            </div>
            <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              {costs.map((cost, ci) => (
                <div key={ci} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px',
                  background: ci % 2 === 0 ? 'var(--color-bg)' : 'var(--color-card)',
                  fontSize: '12px', fontFamily: "'Inter', sans-serif",
                }}>
                  <span style={{ color: 'var(--color-text)' }}>{cost.item}</span>
                  <span style={{ fontWeight: 700, color: '#059669' }}>{cost.est}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Car Hire / Travellers section */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#C8860A', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: "'Inter', sans-serif" }}>
              🚗 Car & Travel Options from Tirupati
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CAB_OPTIONS.map((cab, ci) => (
                <div key={ci} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px',
                  background: 'var(--color-bg)', border: '1px solid var(--color-border)',
                }}>
                  <span style={{ fontSize: '18px', flexShrink: 0 }}>{cab.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text)', fontFamily: "'Inter', sans-serif" }}>
                        {cab.name}
                      </span>
                      <span style={{
                        fontSize: '9px', fontWeight: 700,
                        color: cab.type === 'Official' ? '#C8860A' : cab.type === 'App' ? '#1D4ED8' : '#059669',
                        background: cab.type === 'Official' ? 'rgba(200,134,10,0.1)' : cab.type === 'App' ? 'rgba(29,78,216,0.1)' : 'rgba(5,150,105,0.1)',
                        padding: '1px 6px', borderRadius: '100px',
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {cab.type}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#C8860A', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: '2px' }}>
                      📞 {cab.contact}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontFamily: "'Inter', sans-serif" }}>
                      {cab.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '10px', padding: '10px 12px', borderRadius: '10px',
              background: 'rgba(200,134,10,0.06)', border: '1px solid rgba(200,134,10,0.2)',
              fontSize: '11px', color: 'var(--color-text-muted)',
              fontFamily: "'Inter', sans-serif", lineHeight: 1.6,
            }}>
              💡 <strong>Pro Tip:</strong> For multi-day circuits (Srikalahasti + Kanipakam), negotiate a <strong>full-day car hire ₹2,500–4,000/day</strong> with local cabs. They know all the temple routes and can wait while you complete darshan.
            </div>
          </div>
        </div>
      )}
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
