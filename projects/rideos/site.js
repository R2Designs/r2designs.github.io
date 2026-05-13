const CONTACT_EMAIL = "abhishekraj4300@gmail.com";
const LANGUAGE_KEY = "rideos.siteLanguage";

const translations = {
  en: {
    meta_title: "RideOS | Booking, tracking, and ops for local ride services",
    meta_description: "A cleaner way for airport cabs, hotel transfers, shuttle teams, and local fleets to handle booking, live trip tracking, and day-to-day operations.",
    meta_og_description: "A cleaner way to run bookings, live trips, and everyday dispatch for your own service.",
    brand_subtitle: "Booking, tracking, ops",
    nav_platform: "Platform",
    nav_operators: "Operators",
    nav_onboarding: "Onboarding",
    nav_contact: "Contact",
    cta_book_demo: "Book demo",
    cta_contact_us: "Contact us",
    hero_eyebrow: "Built for fleets, airports, hotels, and shuttle operators",
    hero_title: "Your brand. Your bookings. Your rides.",
    hero_body: "Riders can book without confusion. Your team can see what is moving. And the whole thing can look like your service instead of somebody else's app with your logo taped on top.",
    trusted_label: "Trusted mobility platform",
    operator_airport_cabs: "Airport cabs",
    operator_ev_fleets: "EV fleets",
    operator_corporate_shuttles: "Corporate shuttles",
    operator_hotel_transfers: "Hotel transfers",
    operator_city_operators: "City operators",
    operator_premium_chauffeur: "Premium chauffeur",
    metric_1_title: "See every trip clearly",
    metric_1_body: "From booking to pickup to drop-off, the status stays easy to follow.",
    metric_2_title: "Make it feel like your company",
    metric_2_body: "Your name, your pricing, your vehicles, your support number.",
    metric_3_title: "Keep the day in one place",
    metric_3_body: "Recent rides, live counts, and the basics your team looks for first.",
    metric_4_title: "Start without a huge setup",
    metric_4_body: "You do not need a giant rollout plan just to get your first version live.",
    platform_label: "What people actually use",
    platform_title: "The key screens are simple: book, track, and keep the day moving.",
    platform_body: "Instead of stacking giant screenshots on top of each other, here are the main entry points people interact with most. The rider sees a clean booking flow and clear updates. Your team gets a straightforward ops view.",
    platform_list_1: "Booking with fare preview, vehicle choice, and phone verification",
    platform_list_2: "Trip tracking with driver details, map, and ETA",
    platform_list_3: "Ops screen with live ride counts and recent activity",
    platform_list_4: "Branding and service details that match the operator using it",
    carousel_booking: "Booking",
    carousel_tracking: "Tracking",
    carousel_ops: "Ops",
    booking_label: "Booking",
    booking_title: "A booking page that feels familiar right away.",
    booking_body: "Pickup, airport, vehicle choice, fare estimate, and phone verification are all easy to scan without feeling crowded.",
    tracking_label: "Tracking",
    tracking_title: "Riders know what is happening without calling support.",
    tracking_body: "The trip page keeps the driver, map, ETA, and pickup details in one calm place.",
    ops_label: "Ops",
    ops_title: "Your team sees the basics first, not a wall of noise.",
    ops_body: "Live rides, completed trips, booked value, recent requests, and setup details are all there when dispatch opens the day.",
    operators_label: "Why operators choose this",
    operators_title: "Less dispatch chaos. Better rider confidence. A brand that looks like yours.",
    operators_body: "This is for teams running real cars and real schedules. Airport operators need dependable pickups. Hotel desks need something they can send to guests without apologizing for it. Local fleets need software that helps the day run smoother, not something that adds another layer of work.",
    value_1_title: "Airport and station transfers",
    value_1_body: "Pre-scheduled trips, flight references, and premium pickup experience.",
    value_2_title: "EV and city fleets",
    value_2_body: "Vehicle tiers, live tracking, and cleaner day-of operations.",
    value_3_title: "Hotels and concierge teams",
    value_3_body: "Brand-ready booking pages that feel polished enough to share with guests.",
    value_4_title: "Corporate and shuttle operators",
    value_4_body: "Tenant-scoped pricing, support details, and a foundation for account billing later.",
    brand_label: "Make it yours",
    brand_title: "It should feel like your service, not ours.",
    brand_body: "If you run airport cars, hotel transfers, a shuttle desk, or a local fleet, the customer should see your name, your support line, your vehicle choices, and your way of working.",
    brand_list_1: "Your name, logo, colors, and support details",
    brand_list_2: "Your fares, airport settings, and vehicle lineup",
    brand_list_3: "Your service type, whether that is cabs, shuttles, hotel rides, or EV trips",
    brand_list_4: "A setup that can start simple and get more sophisticated later",
    cap_1_kicker: "Branding",
    cap_1_body: "Change the look, tone, and support details for each service.",
    cap_2_kicker: "Pricing",
    cap_2_body: "Set up fares and vehicle types in a way that matches how you already work.",
    cap_3_kicker: "Day one",
    cap_3_body: "Start with a simpler setup first instead of overbuilding from the beginning.",
    cap_4_kicker: "Growth",
    cap_4_body: "Add more regions, more operators, or more service types when you are ready.",
    start_label: "How teams usually start",
    start_title: "You do not need to roll out everything on day one.",
    start_body: "Most teams begin with one city, one route type, or one part of the business. Get the basics right, let people use it, then expand from there.",
    step_1_title: "Pick the first service to launch",
    step_1_body: "Airport pickup, hotel transfer, local cab booking, or staff shuttle. Start with one clear use case.",
    step_2_title: "Put your brand and rules on it",
    step_2_body: "Add your name, fares, support number, vehicles, and the details riders should actually see.",
    step_3_title: "Bring in the team",
    step_3_body: "Add drivers, vehicles, dispatch notes, and the handful of things your operation needs to function every day.",
    step_4_title: "Go live and learn from real trips",
    step_4_body: "Once the first version is working well, expand to more routes, more operators, or more regions.",
    faq_title: "Common questions from operators.",
    faq_1_q: "Can this be branded for our company?",
    faq_1_a: "Yes. The booking flow, trip page, and ops view can all carry your name, colors, support details, fares, and service setup.",
    faq_2_q: "Do we need to adopt expensive infrastructure on day one?",
    faq_2_a: "No. Start with a simpler setup first. If the operation grows, the underlying services can grow with it.",
    faq_3_q: "Who is this best suited for right now?",
    faq_3_a: "Airport taxi operators, EV fleets, hotel transfer teams, concierge transport desks, local city fleets, and branded shuttle services.",
    faq_4_q: "Can we request custom flows for our operation?",
    faq_4_a: "Yes. If your team handles bookings, vehicles, support, or dispatch in a specific way, that can be shaped around your operation.",
    contact_label: "Book a conversation",
    contact_title: "See what this could look like for your own service.",
    contact_body: "We can walk through the product, talk about how you run today, and show what a cleaner version could look like with your branding on it.",
    form_name: "Name",
    form_name_placeholder: "Your name",
    form_company: "Company",
    form_company_placeholder: "Company or fleet name",
    form_email: "Email",
    form_email_placeholder: "you@company.com",
    form_launching: "What are you launching?",
    form_choose_one: "Choose one",
    usecase_airport: "Airport taxi service",
    usecase_ev: "EV fleet",
    usecase_hotel: "Hotel transfers",
    usecase_corporate: "Corporate shuttle",
    usecase_city: "City ride-hailing",
    usecase_other: "Other mobility service",
    form_notes: "Notes",
    form_notes_placeholder: "Tell us what you need.",
    form_submit: "Request demo",
    form_note: "Submitting opens an email draft so your team can route the inquiry however you like.",
    footer_body: "Booking, trip tracking, and ops software for teams running real rides in the real world.",
    footer_link_booking: "Contact us",
    footer_link_tracking: "Back to portfolio",
    footer_link_ops: "Contact",
    mail_subject_prefix: "Demo request from",
    mail_label_name: "Name",
    mail_label_company: "Company",
    mail_label_email: "Email",
    mail_label_usecase: "Use case",
    mail_label_notes: "Notes"
  },
  hi: {
    meta_title: "RideOS | लोकल राइड सेवाओं के लिए बुकिंग, ट्रैकिंग और ऑप्स",
    meta_description: "एयरपोर्ट कैब, होटल ट्रांसफर, शटल टीमों और लोकल फ्लीट्स के लिए बुकिंग, लाइव ट्रिप ट्रैकिंग और रोज़मर्रा के ऑपरेशन्स संभालने का आसान तरीका।",
    meta_og_description: "अपनी सेवा के लिए बुकिंग, लाइव ट्रिप और रोज़ की डिस्पैच को बेहतर ढंग से चलाने का आसान तरीका।",
    brand_subtitle: "बुकिंग, ट्रैकिंग, ऑप्स",
    nav_platform: "प्लेटफ़ॉर्म",
    nav_operators: "ऑपरेटर",
    nav_onboarding: "शुरुआत",
    nav_contact: "संपर्क",
    cta_book_demo: "डेमो बुक करें",
    cta_contact_us: "संपर्क करें",
    hero_eyebrow: "फ्लीट, एयरपोर्ट, होटल और शटल ऑपरेटरों के लिए",
    hero_title: "आपका ब्रांड। आपकी बुकिंग। आपकी राइड्स।",
    hero_body: "राइडर बिना उलझन के बुक कर सकें। आपकी टीम साफ़ देख सके कि क्या चल रहा है। और पूरा अनुभव आपकी अपनी सेवा जैसा लगे, किसी और के ऐप पर आपका लोगो चिपकाया हुआ नहीं।",
    trusted_label: "भरोसेमंद मोबिलिटी प्लेटफ़ॉर्म",
    operator_airport_cabs: "एयरपोर्ट कैब",
    operator_ev_fleets: "ईवी फ्लीट",
    operator_corporate_shuttles: "कॉर्पोरेट शटल",
    operator_hotel_transfers: "होटल ट्रांसफर",
    operator_city_operators: "सिटी ऑपरेटर",
    operator_premium_chauffeur: "प्रीमियम चौफ़र",
    metric_1_title: "हर ट्रिप साफ़ दिखाई दे",
    metric_1_body: "बुकिंग से लेकर पिकअप और ड्रॉप तक, स्टेटस आसानी से समझ आता है।",
    metric_2_title: "यह आपकी कंपनी जैसा लगे",
    metric_2_body: "आपका नाम, आपकी कीमतें, आपके वाहन, आपका सपोर्ट नंबर।",
    metric_3_title: "दिनभर की चीज़ें एक ही जगह रखें",
    metric_3_body: "हाल की राइड्स, लाइव काउंट और वही चीज़ें जिन्हें आपकी टीम सबसे पहले देखती है।",
    metric_4_title: "बिना भारी सेटअप के शुरू करें",
    metric_4_body: "पहला वर्ज़न लाइव करने के लिए आपको बहुत बड़ा रोलआउट प्लान नहीं चाहिए।",
    platform_label: "लोग वास्तव में क्या इस्तेमाल करते हैं",
    platform_title: "मुख्य स्क्रीनें सीधी हैं: बुक करें, ट्रैक करें और दिन को चलते रहने दें।",
    platform_body: "बड़ी-बड़ी स्क्रीनशॉट्स को एक के ऊपर एक रखने के बजाय, यहाँ वे मुख्य एंट्री पॉइंट हैं जिन्हें लोग सबसे ज़्यादा इस्तेमाल करते हैं। राइडर को साफ़ बुकिंग फ्लो और स्पष्ट अपडेट मिलते हैं। आपकी टीम को सीधा-सादा ऑप्स व्यू मिलता है।",
    platform_list_1: "किराया प्रीव्यू, वाहन चयन और फोन वेरिफिकेशन के साथ बुकिंग",
    platform_list_2: "ड्राइवर डिटेल, मैप और ETA के साथ ट्रिप ट्रैकिंग",
    platform_list_3: "लाइव राइड काउंट और हाल की एक्टिविटी वाला ऑप्स स्क्रीन",
    platform_list_4: "ऐसी ब्रांडिंग और सेवा डिटेल्स जो ऑपरेटर से मेल खाएँ",
    carousel_booking: "बुकिंग",
    carousel_tracking: "ट्रैकिंग",
    carousel_ops: "ऑप्स",
    booking_label: "बुकिंग",
    booking_title: "ऐसा बुकिंग पेज जो पहली नज़र में ही परिचित लगे।",
    booking_body: "पिकअप, एयरपोर्ट, वाहन चयन, किराया अनुमान और फोन वेरिफिकेशन सब कुछ बिना भीड़भाड़ के साफ़ दिखता है।",
    tracking_label: "ट्रैकिंग",
    tracking_title: "राइडर को सपोर्ट पर कॉल किए बिना पता रहता है कि क्या हो रहा है।",
    tracking_body: "ट्रिप पेज ड्राइवर, मैप, ETA और पिकअप डिटेल्स को एक शांत, साफ़ जगह पर रखता है।",
    ops_label: "ऑप्स",
    ops_title: "आपकी टीम को पहले ज़रूरी बातें दिखती हैं, शोर नहीं।",
    ops_body: "लाइव राइड्स, पूरी हुई ट्रिप्स, बुक्ड वैल्यू, नई रिक्वेस्ट्स और सेटअप डिटेल्स सब वहीं होते हैं जहाँ दिन की शुरुआत में डिस्पैच देखता है।",
    operators_label: "ऑपरेटर इसे क्यों चुनते हैं",
    operators_title: "कम डिस्पैच झंझट। राइडर को ज़्यादा भरोसा। और एक ऐसा ब्रांड जो आपका लगे।",
    operators_body: "यह उन टीमों के लिए है जो सच में गाड़ियाँ और शेड्यूल चलाती हैं। एयरपोर्ट ऑपरेटरों को भरोसेमंद पिकअप चाहिए। होटल डेस्क को ऐसा लिंक चाहिए जिसे वे मेहमानों को बिना झिझक भेज सकें। लोकल फ्लीट्स को ऐसा सॉफ़्टवेयर चाहिए जो दिन को आसान बनाए, काम और न बढ़ाए।",
    value_1_title: "एयरपोर्ट और स्टेशन ट्रांसफर",
    value_1_body: "पहले से तय ट्रिप्स, फ्लाइट रेफरेंस और बेहतर पिकअप अनुभव।",
    value_2_title: "ईवी और सिटी फ्लीट्स",
    value_2_body: "वाहन टियर, लाइव ट्रैकिंग और साफ़-सुथरे रोज़मर्रा के ऑपरेशन्स।",
    value_3_title: "होटल और कंसीयर्ज टीम्स",
    value_3_body: "ऐसे ब्रांडेड बुकिंग पेज जो मेहमानों के साथ आत्मविश्वास से साझा किए जा सकें।",
    value_4_title: "कॉर्पोरेट और शटल ऑपरेटर",
    value_4_body: "टेनेंट-आधारित प्राइसिंग, सपोर्ट डिटेल्स और आगे चलकर अकाउंट बिलिंग की नींव।",
    brand_label: "इसे अपना बनाइए",
    brand_title: "यह आपकी सेवा जैसा लगे, हमारी नहीं।",
    brand_body: "अगर आप एयरपोर्ट कार, होटल ट्रांसफर, शटल डेस्क या लोकल फ्लीट चलाते हैं, तो ग्राहक को आपका नाम, आपका सपोर्ट नंबर, आपके वाहन विकल्प और आपका काम करने का तरीका दिखना चाहिए।",
    brand_list_1: "आपका नाम, लोगो, रंग और सपोर्ट डिटेल्स",
    brand_list_2: "आपकी कीमतें, एयरपोर्ट सेटिंग्स और वाहन लाइनअप",
    brand_list_3: "आपकी सेवा का प्रकार, चाहे वह कैब हो, शटल हो, होटल राइड हो या ईवी ट्रिप",
    brand_list_4: "ऐसा सेटअप जो पहले सरल रहे और बाद में आगे बढ़ सके",
    cap_1_kicker: "ब्रांडिंग",
    cap_1_body: "हर सेवा के लिए लुक, टोन और सपोर्ट डिटेल्स बदलिए।",
    cap_2_kicker: "प्राइसिंग",
    cap_2_body: "किराया और वाहन प्रकार उसी तरह सेट करें जैसे आप पहले से काम करते हैं।",
    cap_3_kicker: "पहला दिन",
    cap_3_body: "शुरुआत में ज़रूरत से ज़्यादा बनाने के बजाय पहले सरल सेटअप से शुरू करें।",
    cap_4_kicker: "विकास",
    cap_4_body: "जब आप तैयार हों तब और क्षेत्र, और ऑपरेटर या और सेवा प्रकार जोड़ें।",
    start_label: "टीमें आम तौर पर कैसे शुरू करती हैं",
    start_title: "पहले दिन सब कुछ रोलआउट करने की ज़रूरत नहीं है।",
    start_body: "ज़्यादातर टीमें एक शहर, एक रूट टाइप या बिज़नेस के एक हिस्से से शुरू करती हैं। पहले बेसिक्स सही कीजिए, लोगों से इस्तेमाल करवाइए, फिर आगे बढ़ाइए।",
    step_1_title: "पहली सेवा चुनें जिसे लॉन्च करना है",
    step_1_body: "एयरपोर्ट पिकअप, होटल ट्रांसफर, लोकल कैब बुकिंग या स्टाफ शटल। एक साफ़ उपयोग केस से शुरू करें।",
    step_2_title: "अपना ब्रांड और नियम जोड़ें",
    step_2_body: "अपना नाम, किराया, सपोर्ट नंबर, वाहन और वही डिटेल्स जोड़ें जो राइडर को सच में दिखनी चाहिए।",
    step_3_title: "टीम को शामिल करें",
    step_3_body: "ड्राइवर, वाहन, डिस्पैच नोट्स और वे ज़रूरी चीज़ें जोड़ें जिनसे आपका ऑपरेशन रोज़ चलता है।",
    step_4_title: "लाइव जाएँ और असली ट्रिप्स से सीखें",
    step_4_body: "जब पहला वर्ज़न सही चलने लगे, तो और रूट, और ऑपरेटर या और क्षेत्र जोड़ें।",
    faq_title: "ऑपरेटरों के आम सवाल।",
    faq_1_q: "क्या इसे हमारी कंपनी के लिए ब्रांड किया जा सकता है?",
    faq_1_a: "हाँ। बुकिंग फ्लो, ट्रिप पेज और ऑप्स व्यू सब आपके नाम, रंग, सपोर्ट डिटेल्स, किरायों और सेवा सेटअप के साथ चल सकते हैं।",
    faq_2_q: "क्या पहले दिन ही महँगा इंफ्रास्ट्रक्चर लेना पड़ेगा?",
    faq_2_a: "नहीं। पहले सरल सेटअप से शुरू करें। जैसे-जैसे ऑपरेशन बढ़ेगा, नीचे की सेवाएँ भी बढ़ सकती हैं।",
    faq_3_q: "अभी यह किन लोगों के लिए सबसे सही है?",
    faq_3_a: "एयरपोर्ट टैक्सी ऑपरेटर, ईवी फ्लीट्स, होटल ट्रांसफर टीम्स, कंसीयर्ज ट्रांसपोर्ट डेस्क, लोकल सिटी फ्लीट्स और ब्रांडेड शटल सेवाएँ।",
    faq_4_q: "क्या हम अपने ऑपरेशन के हिसाब से कस्टम फ्लो माँग सकते हैं?",
    faq_4_a: "हाँ। अगर आपकी टीम बुकिंग, वाहन, सपोर्ट या डिस्पैच को किसी खास तरीके से संभालती है, तो उसे आपके ऑपरेशन के हिसाब से ढाला जा सकता है।",
    contact_label: "बातचीत बुक करें",
    contact_title: "देखिए यह आपकी अपनी सेवा के लिए कैसा दिख सकता है।",
    contact_body: "हम प्रोडक्ट दिखा सकते हैं, आपकी मौजूदा प्रक्रिया समझ सकते हैं और यह दिखा सकते हैं कि आपकी ब्रांडिंग के साथ इसका साफ़-सुथरा वर्ज़न कैसा लगेगा।",
    form_name: "नाम",
    form_name_placeholder: "आपका नाम",
    form_company: "कंपनी",
    form_company_placeholder: "कंपनी या फ्लीट का नाम",
    form_email: "ईमेल",
    form_email_placeholder: "you@company.com",
    form_launching: "आप क्या लॉन्च कर रहे हैं?",
    form_choose_one: "एक चुनें",
    usecase_airport: "एयरपोर्ट टैक्सी सेवा",
    usecase_ev: "ईवी फ्लीट",
    usecase_hotel: "होटल ट्रांसफर",
    usecase_corporate: "कॉर्पोरेट शटल",
    usecase_city: "सिटी राइड-हेलिंग",
    usecase_other: "अन्य मोबिलिटी सेवा",
    form_notes: "नोट्स",
    form_notes_placeholder: "हमें बताइए आपको क्या चाहिए।",
    form_submit: "डेमो माँगें",
    form_note: "सबमिट करने पर ईमेल ड्राफ्ट खुलेगा ताकि आपकी टीम पूछताछ को अपने तरीके से संभाल सके।",
    footer_body: "असली दुनिया में राइड चलाने वाली टीमों के लिए बुकिंग, ट्रिप ट्रैकिंग और ऑप्स सॉफ़्टवेयर।",
    footer_link_booking: "संपर्क करें",
    footer_link_tracking: "पोर्टफोलियो पर वापस",
    footer_link_ops: "संपर्क",
    mail_subject_prefix: "डेमो अनुरोध",
    mail_label_name: "नाम",
    mail_label_company: "कंपनी",
    mail_label_email: "ईमेल",
    mail_label_usecase: "उपयोग",
    mail_label_notes: "नोट्स"
  }
};

function safeStorage() {
  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
}

function getPreferredLanguage() {
  const stored = safeStorage() ? safeStorage().getItem(LANGUAGE_KEY) : null;
  return stored === "en" ? "en" : "hi";
}

function applyLanguage(lang) {
  const copy = translations[lang] || translations.en;
  document.documentElement.lang = lang;
  document.title = copy.meta_title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", copy.meta_description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", copy.meta_title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", copy.meta_og_description);

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.getAttribute("data-i18n");
    if (!key || !(key in copy)) return;
    el.textContent = copy[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    const key = el.getAttribute("data-i18n-placeholder");
    if (!key || !(key in copy)) return;
    el.setAttribute("placeholder", copy[key]);
  });

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    const isActive = button.getAttribute("data-lang") === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  const storage = safeStorage();
  if (storage) storage.setItem(LANGUAGE_KEY, lang);
}

document.addEventListener("DOMContentLoaded", function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const initialLanguage = getPreferredLanguage();
  applyLanguage(initialLanguage);

  document.querySelectorAll("[data-lang]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.getAttribute("data-lang"));
    });
  });

  const slideButtons = Array.from(document.querySelectorAll("[data-slide-target]"));
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  if (slideButtons.length && slides.length) {
    function setSlide(nextId) {
      slideButtons.forEach(function (button) {
        const isActive = button.getAttribute("data-slide-target") === nextId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      slides.forEach(function (slide) {
        const isActive = slide.getAttribute("data-slide") === nextId;
        slide.classList.toggle("is-active", isActive);
      });
    }

    slideButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setSlide(button.getAttribute("data-slide-target"));
      });
    });
  }

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const lang = getPreferredLanguage();
      const copy = translations[lang] || translations.en;
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const company = String(data.get("company") || "").trim();
      const email = String(data.get("email") || "").trim();
      const usecase = String(data.get("usecase") || "").trim();
      const notes = String(data.get("notes") || "").trim();

      const subject = encodeURIComponent(`${copy.mail_subject_prefix} ${company || name}`);
      const body = encodeURIComponent(
        [
          `${copy.mail_label_name}: ${name}`,
          `${copy.mail_label_company}: ${company}`,
          `${copy.mail_label_email}: ${email}`,
          `${copy.mail_label_usecase}: ${usecase}`,
          "",
          `${copy.mail_label_notes}:`,
          notes || "-"
        ].join("\n")
      );

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!("IntersectionObserver" in window) || !revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
});
