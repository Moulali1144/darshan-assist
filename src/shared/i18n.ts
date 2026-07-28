// Darshan Assist i18n
export type Language = 'en' | 'te' | 'ta' | 'hi';

export interface Translations {
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
  premiumUnlocked: string;
  lockDirectory: string;
  unlockBtn: string;
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
    premiumUnlocked: 'Premium Unlocked',
    lockDirectory: 'Lock Directory (Reset)',
    unlockBtn: 'Unlock 41+ Stays & Tours (₹399/yr)',
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
    premiumUnlocked: 'ప్రీమియం అన్‌లాక్ అయింది',
    lockDirectory: 'డైరెక్టరీ లాక్ చేయండి',
    unlockBtn: '41+ వసతి & ట్రావెల్స్ అన్‌లాక్ (₹399/సంవత్సరం)',
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
    premiumUnlocked: 'பிரீமியம் திறக்கப்பட்டது',
    lockDirectory: 'அடைவை பூட்டு',
    unlockBtn: '41+ தங்குமிடம் & பயணம் திறக்கவும் (₹399/ஆண்டு)',
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
    premiumUnlocked: 'प्रीमियम अनलॉक',
    lockDirectory: 'डायरेक्टरी लॉक करें',
    unlockBtn: '41+ आवास अनलॉक करें (₹399/वर्ष)',
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
