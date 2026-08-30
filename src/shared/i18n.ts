// ─── Darshan Assist i18n (Internationalization) ──────────────────────────────
export type Language = 'en' | 'te' | 'ta' | 'hi';

export interface Translations {
  // Navigation & Shell
  appName: string;
  appSubtitle: string;
  dashboard: string;
  pilgrims: string;
  releaseCalendar: string;
  bookingHistory: string;
  tripPlanner: string;
  staysTravels: string;
  notifications: string;
  analytics: string;
  settings: string;
  trekkingGuide: string;
  aiPlanner: string;
  nearbyTemples: string;

  // Dashboard
  welcomeGreeting: string;
  nextRelease: string;
  quickLinks: string;
  savedPilgrims: string;
  upcomingReleases: string;
  totalBookings: string;
  tripsPlanned: string;
  tryFreeDemo: string;
  freeDemoSubtitle: string;
  freeDemoButton: string;
  freeDemoUsed: string;
  freeDemoLimitReached: string;
  subscribeToContinue: string;
  demoTitle: string;

  // Stays & Travels Directory
  directoryTitle: string;
  directorySubtitle: string;
  hotelsTab: string;
  travelsTab: string;
  searchPlaceholder: string;
  unlockedBadge: string;
  lockDirectoryBtn: string;
  unlockDirectoryBtn: string;
  officialComplianceNotice: string;
  complianceText: string;
  distanceFromTemple: string;
  amenities: string;
  pilgrimBenefits: string;
  contactDetails: string;
  phone: string;
  email: string;
  lockedTitle: string;
  lockedDesc: string;
  payToUnlock: string;

  // Trekking Guide
  trekkingTitle: string;
  trekkingSubtitle: string;
  alipiriRoute: string;
  srivariMettuRoute: string;
  steps: string;
  km: string;
  duration: string;
  difficulty: string;
  checkpoints: string;
  tips: string;

  // Buttons & Labels
  openTTDPortal: string;
  setReminder: string;
  viewAll: string;
  noBookings: string;
  language: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'Darshan Assist',
    appSubtitle: 'TTD Booking Assistant',
    dashboard: 'Dashboard',
    pilgrims: 'Pilgrims',
    releaseCalendar: 'Release Calendar',
    bookingHistory: 'Booking History',
    tripPlanner: 'Trip Planner',
    staysTravels: 'Stays & Travels',
    notifications: 'Notifications',
    analytics: 'Analytics',
    settings: 'Settings',
    trekkingGuide: 'Trekking Guide',
    welcomeGreeting: 'Jai Tirumala Venkateswara! 🙏',
    nextRelease: 'Next TTD Release',
    quickLinks: 'Quick Links',
    savedPilgrims: 'Saved Pilgrims',
    upcomingReleases: 'Upcoming Releases',
    totalBookings: 'Total Bookings',
    tripsPlanned: 'Trips Planned',
    tryFreeDemo: '⚡ Try Free Autofill Demo',
    freeDemoSubtitle: 'Watch how we fill 6 pilgrim details in 2 seconds! Free trial: 3 uses.',
    freeDemoButton: 'Start Free Demo →',
    freeDemoUsed: 'Free demos used',
    freeDemoLimitReached: '🔒 3 Free Demos Used!',
    subscribeToContinue: 'Subscribe ₹399/yr to unlock unlimited autofill for all pilgrim profiles.',
    demoTitle: '🎬 Autofill Demo — Watch 2-Second Fill in Action',
    directoryTitle: '📍 Stays & Travel Directory',
    directorySubtitle: 'Verified cottage guest houses, TTD complexes, and local travels near Tirumala (41+ Places)',
    hotelsTab: '🏨 Hotels & Stays',
    travelsTab: '🚌 Tours & Travels',
    searchPlaceholder: 'Search stays, travels...',
    unlockedBadge: 'Premium Unlocked',
    lockDirectoryBtn: 'Lock Directory (Reset)',
    unlockDirectoryBtn: 'Unlock 41+ Stays & Tours (₹399/yr)',
    officialComplianceNotice: 'Official TTD Compliance Notice:',
    complianceText: 'All booking transactions, ticket issues, room allotments, and Sevas are handled exclusively by Tirumala Tirupati Devasthanams (TTD) via their official portal (ttdevasthanams.ap.gov.in). Darshan Assist provides helper tools, autofill, and quota alerts to assist devotees without bypassing TTD policies.',
    distanceFromTemple: 'from main Tirumala Temple',
    amenities: 'Key Amenities',
    pilgrimBenefits: 'Pilgrim Benefits',
    contactDetails: 'Verified Contact Details',
    phone: 'Phone',
    email: 'Email',
    lockedTitle: 'Details & Contacts Locked',
    lockedDesc: 'Unlock real hotel/travel operator names, original photos, verified booking phone numbers.',
    payToUnlock: 'Pay ₹399 & Unlock Directory',
    trekkingTitle: '🥾 Tirumala Trekking Guide',
    trekkingSubtitle: 'Complete guide to Alipiri and Srivari Mettu footpaths for pilgrims',
    alipiriRoute: 'Alipiri Footpath',
    srivariMettuRoute: 'Srivari Mettu',
    steps: 'Steps',
    km: 'km',
    duration: 'Duration',
    difficulty: 'Difficulty',
    checkpoints: 'Checkpoints',
    tips: 'Important Tips',
    openTTDPortal: 'Open TTD Portal',
    setReminder: 'Set Reminder',
    viewAll: 'View All',
    noBookings: 'No bookings yet',
    language: 'Language',
    aiPlanner: 'AI Trip Planner',
    nearbyTemples: 'Nearby Temples',
  },

  te: {
    appName: 'దర్శన్ అసిస్ట్',
    appSubtitle: 'TTD బుకింగ్ అసిస్టెంట్',
    dashboard: 'డాష్‌బోర్డ్',
    pilgrims: 'యాత్రికులు',
    releaseCalendar: 'రిలీజ్ క్యాలెండర్',
    bookingHistory: 'బుకింగ్ చరిత్ర',
    tripPlanner: 'ట్రిప్ ప్లానర్',
    staysTravels: 'వసతి & ప్రయాణం',
    notifications: 'నోటిఫికేషన్లు',
    analytics: 'విశ్లేషణలు',
    settings: 'సెట్టింగ్‌లు',
    trekkingGuide: 'ట్రెక్కింగ్ గైడ్',
    welcomeGreeting: 'జై తిరుమల వేంకటేశ్వరా! 🙏',
    nextRelease: 'తదుపరి TTD రిలీజ్',
    quickLinks: 'శీఘ్ర లింకులు',
    savedPilgrims: 'సేవ్ చేసిన యాత్రికులు',
    upcomingReleases: 'రాబోయే రిలీజ్‌లు',
    totalBookings: 'మొత్తం బుకింగ్‌లు',
    tripsPlanned: 'ప్లాన్ చేసిన ట్రిప్‌లు',
    tryFreeDemo: '⚡ ఉచిత ఆటోఫిల్ డెమో',
    freeDemoSubtitle: '2 సెకన్లలో 6 యాత్రికుల వివరాలు నింపడం చూడండి! ఉచిత ట్రయల్: 3 సార్లు.',
    freeDemoButton: 'డెమో ప్రారంభించండి →',
    freeDemoUsed: 'ఉపయోగించిన ఉచిత డెమోలు',
    freeDemoLimitReached: '🔒 3 ఉచిత డెమోలు ముగిశాయి!',
    subscribeToContinue: 'అన్ని ప్రొఫైల్‌లకు అపరిమిత ఆటోఫిల్ అన్‌లాక్ చేయడానికి ₹399/సంవత్సరం సబ్‌స్క్రయిబ్ చేయండి.',
    demoTitle: '🎬 ఆటోఫిల్ డెమో — 2 సెకన్ల ఫిల్ చూడండి',
    directoryTitle: '📍 వసతి & ప్రయాణ డైరెక్టరీ',
    directorySubtitle: 'తిరుమల సమీపంలోని ధృవీకరించబడిన కాటేజ్ గెస్ట్ హౌస్‌లు, TTD కాంప్లెక్స్‌లు మరియు స్థానిక ప్రయాణాలు (41+ స్థలాలు)',
    hotelsTab: '🏨 హోటళ్లు & వసతి',
    travelsTab: '🚌 టూర్స్ & ట్రావెల్స్',
    searchPlaceholder: 'వసతి, ట్రావెల్స్ వెతకండి...',
    unlockedBadge: 'ప్రీమియం అన్‌లాక్ అయింది',
    lockDirectoryBtn: 'డైరెక్టరీ లాక్ చేయండి',
    unlockDirectoryBtn: '41+ వసతి & ట్రావెల్స్ అన్‌లాక్ (₹399/సంవత్సరం)',
    officialComplianceNotice: 'అధికారిక TTD నిబంధనల గమనిక:',
    complianceText: 'అన్ని బుకింగ్ లావాదేవీలు, టిక్కెట్ జారీలు, రూమ్ కేటాయింపులు మరియు సేవలు కేవలం తిరుమల తిరుపతి దేవస్థానాలు (TTD) తమ అధికారిక పోర్టల్ (ttdevasthanams.ap.gov.in) ద్వారా మాత్రమే నిర్వహిస్తాయి.',
    distanceFromTemple: 'ముఖ్య తిరుమల ఆలయం నుండి',
    amenities: 'ముఖ్య సౌకర్యాలు',
    pilgrimBenefits: 'యాత్రికుల ప్రయోజనాలు',
    contactDetails: 'ధృవీకరించబడిన సంప్రదింపు వివరాలు',
    phone: 'ఫోన్',
    email: 'ఈమెయిల్',
    lockedTitle: 'వివరాలు & కాంటాక్ట్‌లు లాక్ చేయబడ్డాయి',
    lockedDesc: 'నిజమైన హోటల్/ట్రావెల్ పేర్లు, ఒరిజినల్ ఫోటోలు, బుకింగ్ ఫోన్ నంబర్‌లను అన్‌లాక్ చేయండి.',
    payToUnlock: '₹399 చెల్లించి డైరెక్టరీని అన్‌లాక్ చేయండి',
    trekkingTitle: '🥾 తిరుమల ట్రెక్కింగ్ గైడ్',
    trekkingSubtitle: 'అలిపిరి మరియు శ్రీవారి మెట్టు పాదమార్గాల పూర్తి గైడ్',
    alipiriRoute: 'అలిపిరి పాదమార్గం',
    srivariMettuRoute: 'శ్రీవారి మెట్టు',
    steps: 'మెట్లు',
    km: 'కి.మీ',
    duration: 'వ్యవధి',
    difficulty: 'కష్టం',
    checkpoints: 'చెక్‌పాయింట్లు',
    tips: 'ముఖ్యమైన చిట్కాలు',
    openTTDPortal: 'TTD పోర్టల్ తెరవండి',
    setReminder: 'రిమైండర్ సెట్ చేయండి',
    viewAll: 'అన్నీ చూడండి',
    noBookings: 'ఇంకా బుకింగ్‌లు లేవు',
    language: 'భాష',
    aiPlanner: 'AI ట్రిప్ ప్లానర్',
    nearbyTemples: 'సమీప దేవాలయాలు',
  },

  ta: {
    appName: 'தர்சன் அசிஸ்ட்',
    appSubtitle: 'TTD முன்பதிவு உதவியாளர்',
    dashboard: 'டாஷ்போர்டு',
    pilgrims: 'யாத்திரிகர்கள்',
    releaseCalendar: 'வெளியீட்டு நாட்காட்டி',
    bookingHistory: 'முன்பதிவு வரலாறு',
    tripPlanner: 'பயண திட்டமிடல்',
    staysTravels: 'தங்குமிடம் & பயணம்',
    notifications: 'அறிவிப்புகள்',
    analytics: 'பகுப்பாய்வு',
    settings: 'அமைப்புகள்',
    trekkingGuide: 'ட்ரெக்கிங் வழிகாட்டி',
    welcomeGreeting: 'ஜெய் திருமல வேங்கடேஸ்வரா! 🙏',
    nextRelease: 'அடுத்த TTD வெளியீடு',
    quickLinks: 'விரைவு இணைப்புகள்',
    savedPilgrims: 'சேமிக்கப்பட்ட யாத்திரிகர்கள்',
    upcomingReleases: 'வரவிருக்கும் வெளியீடுகள்',
    totalBookings: 'மொத்த முன்பதிவுகள்',
    tripsPlanned: 'திட்டமிட்ட பயணங்கள்',
    tryFreeDemo: '⚡ இலவச ஆட்டோஃபில் டெமோ',
    freeDemoSubtitle: '2 வினாடிகளில் 6 யாத்திரிகர் விவரங்களை நிரப்புவதை பாருங்கள்! இலவச சோதனை: 3 முறை.',
    freeDemoButton: 'டெமோ தொடங்கு →',
    freeDemoUsed: 'பயன்படுத்திய இலவச டெமோக்கள்',
    freeDemoLimitReached: '🔒 3 இலவச டெமோக்கள் முடிந்தன!',
    subscribeToContinue: 'அனைத்து சுயவிவரங்களுக்கும் வரம்பற்ற ஆட்டோஃபிலை திறக்க ₹399/ஆண்டு சந்தா செலுத்துங்கள்.',
    demoTitle: '🎬 ஆட்டோஃபில் டெமோ — 2 வினாடி நிரப்புதலை பாருங்கள்',
    directoryTitle: '📍 தங்குமிடம் & பயண அடைவு',
    directorySubtitle: 'திருமலைக்கு அருகிலுள்ள சரிபார்க்கப்பட்ட தங்குமிடங்கள் & உள்ளூர் பயணங்கள் (41+ இடங்கள்)',
    hotelsTab: '🏨 ஹோட்டல்கள் & தங்குமிடம்',
    travelsTab: '🚌 சுற்றுலா & பயணம்',
    searchPlaceholder: 'தங்குமிடம், பயணங்களை தேடுங்கள்...',
    unlockedBadge: 'பிரீமியம் திறக்கப்பட்டது',
    lockDirectoryBtn: 'அடைவை பூட்டு',
    unlockDirectoryBtn: '41+ தங்குமிடம் திறக்கவும் (₹399/ஆண்டு)',
    officialComplianceNotice: 'அதிகாரப்பூர்வ TTD அறிவிப்பு:',
    complianceText: 'அனைத்து முன்பதிவுகளும் திருமலை திருப்பதி தேவஸ்தானம் (TTD) அதன் அதிகாரப்பூர்வ தளம் (ttdevasthanams.ap.gov.in) வழியாக மட்டுமே செய்யப்படுகின்றன.',
    distanceFromTemple: 'முக்கிய திருமலை கோவிலில் இருந்து',
    amenities: 'முக்கிய வசதிகள்',
    pilgrimBenefits: 'யாத்ரீகர் நன்மைகள்',
    contactDetails: 'சரிபார்க்கப்பட்ட தொடர்பு விவரங்கள்',
    phone: 'தொலைபேசி',
    email: 'மின்னஞ்சல்',
    lockedTitle: 'விவரங்கள் பூட்டப்பட்டுள்ளன',
    lockedDesc: 'உண்மையான ஹோட்டல் பெயர்கள், புகைப்படங்கள், தொலைபேசி எண்களை திறக்கவும்.',
    payToUnlock: '₹399 செலுத்தி அடைவை திறக்கவும்',
    trekkingTitle: '🥾 திருமல ட்ரெக்கிங் வழிகாட்டி',
    trekkingSubtitle: 'யாத்திரிகர்களுக்கான அலிபிரி மற்றும் ஸ்ரீவாரி மேட்டு பாதைகளுக்கான முழுமையான வழிகாட்டி',
    alipiriRoute: 'அலிபிரி பாதை',
    srivariMettuRoute: 'ஸ்ரீவாரி மேட்டு',
    steps: 'படிகள்',
    km: 'கி.மீ',
    duration: 'கால அளவு',
    difficulty: 'கஷ்டம்',
    checkpoints: 'சோதனை புள்ளிகள்',
    tips: 'முக்கியமான குறிப்புகள்',
    openTTDPortal: 'TTD போர்டல் திற',
    setReminder: 'நினைவூட்டல் அமை',
    viewAll: 'அனைத்தையும் பார்',
    noBookings: 'இன்னும் முன்பதிவுகள் இல்லை',
    language: 'மொழி',
    aiPlanner: 'AI பயண திட்டமிடல்',
    nearbyTemples: 'அருகிலுள்ள கோவில்கள்',
  },

  hi: {
    appName: 'दर्शन असिस्ट',
    appSubtitle: 'TTD बुकिंग सहायक',
    dashboard: 'डैशबोर्ड',
    pilgrims: 'तीर्थयात्री',
    releaseCalendar: 'रिलीज़ कैलेंडर',
    bookingHistory: 'बुकिंग इतिहास',
    tripPlanner: 'यात्रा योजनाकार',
    staysTravels: 'आवास & यात्रा',
    notifications: 'सूचनाएं',
    analytics: 'विश्लेषण',
    settings: 'सेटिंग्स',
    trekkingGuide: 'ट्रेकिंग गाइड',
    welcomeGreeting: 'जय तिरुमला वेंकटेश्वरा! 🙏',
    nextRelease: 'अगला TTD रिलीज़',
    quickLinks: 'त्वरित लिंक',
    savedPilgrims: 'सहेजे गए तीर्थयात्री',
    upcomingReleases: 'आगामी रिलीज़',
    totalBookings: 'कुल बुकिंग',
    tripsPlanned: 'नियोजित यात्राएं',
    tryFreeDemo: '⚡ मुफ्त ऑटोफिल डेमो आज़माएं',
    freeDemoSubtitle: '2 सेकंड में 6 तीर्थयात्रियों का विवरण भरते देखें! मुफ्त परीक्षण: 3 बार।',
    freeDemoButton: 'डेमो शुरू करें →',
    freeDemoUsed: 'उपयोग किए गए मुफ्त डेमो',
    freeDemoLimitReached: '🔒 3 मुफ्त डेमो समाप्त!',
    subscribeToContinue: 'सभी प्रोफाइल के लिए असीमित ऑटोफिल अनलॉक करने के लिए ₹399/वर्ष सब्सक्राइब करें।',
    demoTitle: '🎬 ऑटोफिल डेमो — 2 सेकंड फिल देखें',
    directoryTitle: '📍 आवास & यात्रा निर्देशिका',
    directorySubtitle: 'तिरुमला के पास सत्यापित कॉटेज गेस्ट हाउस, TTD परिसर और स्थानीय यात्राएं (41+ स्थान)',
    hotelsTab: '🏨 होटल & आवास',
    travelsTab: '🚌 टूर & ट्रैवल्स',
    searchPlaceholder: 'होटल, ट्रैवल्स खोजें...',
    unlockedBadge: 'प्रीमियम अनलॉक',
    lockDirectoryBtn: 'डायरेक्टरी लॉक करें',
    unlockDirectoryBtn: '41+ आवास अनलॉक करें (₹399/वर्ष)',
    officialComplianceNotice: 'आधिकारिक TTD अनुपालन नोटिस:',
    complianceText: 'सभी बुकिंग लेनदेन, टिकट और कमरे आवंटन केवल तिरुमला तिरुपति देवस्थानम (TTD) द्वारा उनके आधिकारिक पोर्टल (ttdevasthanams.ap.gov.in) के माध्यम से नियंत्रित किए जाते हैं।',
    distanceFromTemple: 'मुख्य तिरुमला मंदिर से',
    amenities: 'प्रमुख सुविधाएं',
    pilgrimBenefits: 'तीर्थयात्री लाभ',
    contactDetails: 'सत्यापित संपर्क विवरण',
    phone: 'फोन',
    email: 'ईमेल',
    lockedTitle: 'विवरण & संपर्क लॉक हैं',
    lockedDesc: 'वास्तविक होटल/ट्रैवल नाम, मूल फोटो और सत्यापित फोन नंबर अनलॉक करें।',
    payToUnlock: '₹399 भुगतान करें और अनलॉक करें',
    trekkingTitle: '🥾 तिरुमला ट्रेकिंग गाइड',
    trekkingSubtitle: 'तीर्थयात्रियों के लिए अलिपिरी और श्रीवारी मेट्टु मार्गों की पूर्ण गाइड',
    alipiriRoute: 'अलिपिरी पैदल मार्ग',
    srivariMettuRoute: 'श्रीवारी मेट्टु',
    steps: 'सीढ़ियाँ',
    km: 'कि.मी.',
    duration: 'अवधि',
    difficulty: 'कठिनाई',
    checkpoints: 'चेकपॉइंट्स',
    tips: 'महत्वपूर्ण सुझाव',
    openTTDPortal: 'TTD पोर्टल खोलें',
    setReminder: 'रिमाइंडर सेट करें',
    viewAll: 'सभी देखें',
    noBookings: 'अभी तक कोई बुकिंग नहीं',
    language: 'भाषा',
    aiPlanner: 'AI यात्रा योजनाकार',
    nearbyTemples: 'पास के मंदिर',
  },
};

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: '🇬🇧 English',
  te: '🇮🇳 తెలుగు',
  ta: '🇮🇳 தமிழ்',
  hi: '🇮🇳 हिंदी',
};

export function getStoredLanguage(): Language {
  try {
    const lang = localStorage.getItem('da_language') as Language;
    return lang && TRANSLATIONS[lang] ? lang : 'en';
  } catch {
    return 'en';
  }
}

export function storeLanguage(lang: Language): void {
  localStorage.setItem('da_language', lang);
}
