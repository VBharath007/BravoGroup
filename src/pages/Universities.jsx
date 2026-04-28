import React, { useEffect, useCallback, useState, useMemo, memo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { CosmicParallaxBg } from '../components/ui/parallax-cosmic-background';
import ScrollStack, { ScrollStackItem } from '../components/ui/ScrollStack';


// ── UNIVERSITIES DATA ─────────────────────────────────────────────────────
const universities = [






  // Uzbekistan
  // Uzbekistan

  // Kyrgyzstan
  { id: 'osh-state-university', name: 'OSH STATE UNIVERSITY - INTERNATIONAL MEDICAL FACULTY', image: '/assets/Kyrgyzstan.webp', badge: 'Premier Choice', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.3)', desc: 'Top government university with strong academic standards, affordable education, and a comfortable environment for Indian students.', details: ['**Clinical Exposure:** Well-equipped hospitals & practical training', '**Indian Food:** Available for students', '**Hostel:** Separate for Boys & Girls', '**International Students:** High Indian student ratio'], fees: ' Approx. ₹3.0L / yr', duration: '6 Years (Including Internship) ', country: 'Kyrgyzstan', location: 'Osh, Kyrgyzstan' },
  { id: 'ihsm-bishkek', name: 'INTERNATIONAL HIGHER SCHOOL OF MEDICINE', image: '/assets/Kyrgyzstan 2.webp', badge: 'Elite Institution', badgeColor: 'from-cyan-500 to-blue-400', glowColor: 'rgba(6,182,212,0.3)', desc: 'MBBS program designed to meet global medical standards with a strong focus on clinical skills and practical learning.', details: ['Cost-effective tuition with quality education', '**Early clinical exposure:** in affiliated hospitals', '**Safe campus:** with modern hostel facilities', '**Supportive environment:** for international students'], fees: 'Approx. ₹3.0L / yr', duration: '6 Years', country: 'Kyrgyzstan', location: 'Bishkek, Kyrgyzstan' },
  { id: 'jasu-kyrgyzstan', name: 'JALAL-ABAD STATE UNIVERSITY', image: '/assets/Kyrgyzstan 3.webp', badge: 'Quality Education', badgeColor: 'from-purple-500 to-indigo-400', glowColor: 'rgba(168,85,247,0.3)', desc: 'A globally aligned MBBS program focused on building strong medical knowledge with practical hospital-based training. **The Advantage:** A reliable option for students seeking quality medical education abroad with affordability and a supportive academic environment. ', details: ['**Hands-on clinical exposure:** in government hospitals', '**Budget-friendly fee structure**', '**Comfortable hostel & student facilities**', '**High FMGE success rate**'], fees: 'Approx. ₹2.5L / yr', duration: '6 Years Program 5 years academics+ 1 year internship ', country: 'Kyrgyzstan', location: 'Jalal-Abad, Kyrgyzstan' },
  { id: 'jaiu-medical', name: 'JALAL-ABAD INTERNATIONAL UNIVERSITY', image: '/assets/Kyrgyzstan 4.webp', badge: 'Global Perspective', badgeColor: 'from-emerald-500 to-teal-400', glowColor: 'rgba(16,185,129,0.3)', desc: 'A structured **6-year MBBS program** (including internship) designed to deliver strong academic foundations with integrated clinical training. **Why Choose This University:** An emerging destination for MBBS abroad, offering quality education at an economical cost with a focus on clinical competence and global medical standards.', details: ['**Practical training:** in affiliated teaching hospitals', '**Student-friendly campus:** with modern facilities', '**Safe and supportive environment:** for Indian students'], fees: 'Approx. ₹2.5L / yr', duration: '6 Years (Including Internship)', country: 'Kyrgyzstan', location: 'Jalal-Abad, Kyrgyzstan' },

  // Georgia
  { id: 'bau-batumi', name: 'BAU INTERNATIONAL UNIVERSITY BATUMI', image: '/assets/Georgia 1.webp', badge: 'European Standard', badgeColor: 'from-amber-500 to-orange-400', glowColor: 'rgba(245,158,11,0.3)', desc: '6-year MD/MBBS (including clinical internship) aligned with international standards. **Why Choose:** European-standard education with strong clinical exposure and global recognition', details: ['**Fully English-medium program**', '**Indian food available** | Modern hostels', '**Advanced hospital training**', 'Opportunities After MBBS FMGE/NExT (India), USMLE (USA), PLAB (UK) eligibility '], fees: 'Approx. ₹4.0 – 5.0L / yr', duration: '6 Years (Including Internship)', country: 'Georgia', location: 'Batumi, Georgia' },
  { id: 'caucasus-university', name: 'CAUCASUS UNIVERSITY', image: '/assets/georgia2.webp', badge: 'Top Ranked', badgeColor: 'from-rose-500 to-red-400', glowColor: 'rgba(244,63,94,0.3)', desc: '6-year globally structured medical program. **Why Choose:** Well-established university with strong academic environment and international exposure', details: ['**Indian food options** | Comfortable hostel', '**Modern campus**', '**Opportunities After MBBS :** FMGE, USMLE, PLAB eligibility'], fees: 'Approx. ₹5.0 – 6.0L / yr', duration: '6 Years', country: 'Georgia', location: 'Tbilisi, Georgia' },
  { id: 'avicenna-batumi', name: 'AVICENNA BATUMI MEDICAL UNIVERSITY', image: '/assets/Georgia 3.webp', badge: 'Clinical Excellence', badgeColor: 'from-indigo-600 to-purple-400', glowColor: 'rgba(79,70,229,0.3)', desc: '6-year MBBS with early clinical exposure. **Why Choose:** New-age medical university with modern infrastructure and practical-focused training', details: ['**Indian mess available** | Modern hostel', '**Own hospital network**', '**Global Licensing:** Eligible for exams & higher studies'], fees: 'Approx. ₹3.5 – 4.5L / yr', duration: '6 Years', country: 'Georgia', location: 'Batumi, Georgia' },
  { id: 'seu-tbilisi', name: 'GEORGIAN NATIONAL UNIVERSITY SEU', image: '/assets/Georgia 4.webp', badge: 'Massive Campus', badgeColor: 'from-violet-500 to-fuchsia-400', glowColor: 'rgba(139,92,246,0.3)', desc: '6-year internationally recognized MD program. **Why Choose:** One of the most preferred universities for Indian students with strong academic support', details: ['**Indian food** | Well-equipped hostels', '**Digital learning environment**', '**Opportunities After MBBS** FMGE/NExT, USMLE, PLAB'], fees: 'Approx. ₹5.0 – 6.0L / yr', duration: '6 Years', country: 'Georgia', location: 'Tbilisi, Georgia' },
  { id: 'uga-georgia', name: 'THE UNIVERSITY OF GEORGIA', image: '/assets/Georgia 5.webp', badge: 'Pioneer Unit', badgeColor: 'from-blue-700 to-blue-500', glowColor: 'rgba(29,78,216,0.3)', desc: '6-year MD program with integrated clinical training. **Why Choose:** Top-ranked private university with high-quality infrastructure and international exposure', details: ['**Indian food available** | Premium hostels', '**Advanced labs & hospitals**', '**Global career options** through licensing exams'], fees: 'Approx. ₹5.0 – 7.0L / yr', duration: '6 Years', country: 'Georgia', location: 'Tbilisi, Georgia' },

  // Russia
  { id: 'kazan-federal', name: 'KAZAN FEDERAL UNIVERSITY', image: '/assets/rasia 1.webp', badge: 'Top 10 Russia', badgeColor: 'from-red-600 to-rose-400', glowColor: 'rgba(220,38,38,0.3)', desc: 'Advanced **6-year medical degree** integrating academic excellence with clinical training. **Why Choose:** A prestigious university known for strong academics, global recognition, and research excellence', details: ['Indian food', ' Government hostel', 'International campus', 'Clinical Russian exposure'], fees: 'Approx. ₹4.5 – 5.5L / yr', duration: '6 Years', country: 'Russia', location: 'Kazan, Russia' },
  { id: 'pirogov-moscow', name: 'PIROGOV RUSSIAN NATIONAL RESEARCH MEDICAL UNIVERSITY', image: '/assets/rasia 2.webp', badge: 'Research Giant', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.3)', desc: 'Structured **6-year MBBS** with extensive hospital-based clinical rotations. **Why Choose:** Highly reputed institution offering top-level clinical exposure and international career opportunities', details: ['Modern infrastructure', 'Indian food options', ' Premium hostels', 'Clinical Russian interaction'], fees: 'Approx. ₹5.0 – 6.5L / yr', duration: '6 Years', country: 'Russia', location: 'Moscow, Russia' },
  { id: 'bashkir-state', name: 'BASHKIR STATE MEDICAL UNIVERSITY', image: '/assets/rasia 3.webp', badge: 'Popular Choice', badgeColor: 'from-green-600 to-teal-400', glowColor: 'rgba(22,163,74,0.3)', desc: 'Comprehensive **6-year program** focused on practical and patient-centered learning. **Why Choose:** A popular choice among Indian students for affordability and consistent clinical exposure', details: ['Indian mess', ' Budget-friendly hostel', 'Supportive campus', 'Russian introduced for clinical practice'], fees: 'Approx. ₹4.0 – 5.0L / yr', duration: '6 Years', country: 'Russia', location: 'Ufa, Russia' },
  { id: 'tver-state', name: 'TVER STATE MEDICAL UNIVERSITY', image: '/assets/rasia 4.webp', badge: 'Legacy Institution', badgeColor: 'from-purple-600 to-pink-400', glowColor: 'rgba(147,51,234,0.3)', desc: 'Established **6-year MBBS program** with early hospital exposure. **Why Choose:** One of the oldest institutions offering reliable medical education at a reasonable cost', details: ['Indian food', ' Government hostel', 'Safe environment',], fees: 'Approx. ₹3.0 – 4.0L / yr', duration: '6 Years', country: 'Russia', location: 'Tver, Russia' },
  { id: 'volgograd-state', name: 'VOLGOGRAD STATE MEDICAL UNIVERSITY', image: '/assets/rasia 5.webp', badge: 'Heritage Campus', badgeColor: 'from-amber-600 to-yellow-400', glowColor: 'rgba(217,119,6,0.3)', desc: 'Globally recognized **6-year MBBS** with strong clinical integration. **Why Choose:** Well-established university combining affordability with solid clinical training', details: ['Indian food*', 'Hostel accommodation', 'Diverse student base'], fees: 'Approx. ₹3.5 – 4.5L / yr', duration: '6 Years', country: 'Russia', location: 'Volgograd, Russia' },

  // Kazakhstan
  { id: 'asfendiyarov-kazakh', name: 'ASFENDIYAROV KAZAKH NATIONAL MEDICAL UNIVERSITY', image: '/assets/Kazakstan1.webp', badge: 'National Rank #1', badgeColor: 'from-teal-600 to-emerald-500', glowColor: 'rgba(20,184,166,0.3)', desc: 'A leading government medical university known for its strong academic heritage, modern infrastructure, and international student-friendly environment. **MD/MBBS Equivalent**', details: ['International Medical Bodies ', '**Clinical Training:** Advanced hospitals with early patient exposure'], fees: '₹4.2 – 5.0L / yr', duration: '6 Years', country: 'Kazakhstan', location: 'Almaty, Kazakhstan' },
  { id: 'astana-medical', name: 'ASTANA MEDICAL UNIVERSITY', image: '/assets/Kazakstan2.webp', badge: 'Capital City', badgeColor: 'from-sky-600 to-blue-400', glowColor: 'rgba(14,165,233,0.3)', desc: 'Located in the capital city, it offers modern education, advanced medical technologies, and excellent exposure to clinical practice.', details: ['**Clinical Practice:** Attached multi-specialty hospitals',], fees: '₹4.0 – 4.8L / yr', duration: '6 Years', country: 'Kazakhstan', location: 'Astana, Kazakhstan' },
  { id: 'kazakhstan-medical', name: 'KARAGANDA MEDICAL UNIVERSITY', image: '/assets/Kazakstan3.webp', badge: 'Clinical Leader', badgeColor: 'from-blue-600 to-indigo-500', glowColor: 'rgba(37,99,235,0.3)', desc: 'Renowned for its research-oriented approach and high-quality clinical training facilities.', details: ['**Hands-on Training:** Strong practical-based learning system ',], fees: '₹3.8 – 4.6L / yr', duration: '6 Years', country: 'Kazakhstan', location: 'Karaganda, Kazakhstan' },
  { id: 'semey-medical', name: 'SEMEY MEDICAL UNIVERSITY', image: '/assets/Kazakstan4.webp', badge: 'Historical Hub', badgeColor: 'from-cyan-600 to-teal-500', glowColor: 'rgba(6,182,212,0.3)', desc: 'One of the oldest medical institutions in Kazakhstan, offering strong fundamentals and affordable education.', details: ['**Clinical Exposure:** Government hospitals with real-time patient interaction ',], fees: '₹3.5 – 4.2L / yr', duration: '6 Years', country: 'Kazakhstan', location: 'Semey, Kazakhstan' },
  { id: 'south-kazakhstan', name: 'SOUTH KAZAKHSTAN MEDICAL ACADEMY', image: '/assets/Kazakstan5.webp', badge: 'Quality Choice', badgeColor: 'from-emerald-600 to-green-500', glowColor: 'rgba(16,185,129,0.3)', desc: 'Known for budget-friendly fees, comfortable hostels, and a supportive environment for international students.', details: ['**Clinical Training:** Modern labs & affiliated hospitals ', ' Budget-friendly fees', 'Comfortable hostels', 'Supportive environment for international students'], fees: '₹3.6 – 4.3L / yr', duration: '5–6 Years', country: 'Kazakhstan', location: 'Shymkent, Kazakhstan' },

  // Tajikistan
  { id: 'avicenna-tajik', name: 'AVICENNA TAJIK STATE MEDICAL UNIVERSITY', image: '/assets/Tajikistan1.webp', badge: 'Top Govt Institution', badgeColor: 'from-purple-600 to-pink-500', glowColor: 'rgba(147,51,234,0.3)', desc: 'A premier medical university in Tajikistan, widely preferred by international students for its structured curriculum, experienced faculty, and strong clinical foundation. **MD (MBBS Equivalent)**', details: ['**Clinical Exposure:** Major government hospitals',], fees: '₹3.0 – 3.6L / yr', duration: '6 Years', country: 'Tajikistan', location: 'Dushanbe, Tajikistan' },
  { id: 'tajik-national', name: 'TAJIK NATIONAL UNIVERSITY (FACULTY OF MEDICINE)', image: '/assets/Tajikistan2.webp', badge: 'Academic Giant', badgeColor: 'from-indigo-600 to-blue-500', glowColor: 'rgba(79,70,229,0.3)', desc: 'One of the country’s top national universities offering medical education with a balanced focus on academics, research, and practical exposure.', details: ['**English / Bilingual**', '**Facilities:** Modern labs & classrooms'], fees: '₹3.2 – 3.8L / yr', duration: '6 Years', country: 'Tajikistan', location: 'Dushanbe, Tajikistan' },
  { id: 'khujand-state', name: 'KHUJAND STATE UNIVERSITY (FACULTY OF MEDICINE)', image: '/assets/Tajikistan3.webp', badge: 'Cultural Capital', badgeColor: 'from-blue-500 to-cyan-400', glowColor: 'rgba(59,130,246,0.3)', desc: 'A well-established institution providing quality medical education in a peaceful and student-friendly city.', details: ['**Recognized Internationally**', '**Clinical Training:** Local teaching hospitals'], fees: '₹2.8 – 3.4L / yr', duration: '6 Years', country: 'Tajikistan', location: 'Khujand, Tajikistan' },
  { id: 'kulyab-state', name: 'KULYAB STATE UNIVERSITY (MEDICAL FACULTY)', image: '/assets/tajikistan4.webp', badge: 'Affordable Hub', badgeColor: 'from-teal-500 to-emerald-400', glowColor: 'rgba(20,184,166,0.3)', desc: 'An emerging choice for MBBS aspirants looking for cost-effective education with essential clinical training facilities.', details: ['**Environment:** Safe campus with affordable living'], fees: '₹2.5 – 3.0L / yr', duration: '6 Years', country: 'Tajikistan', location: 'Kulyab, Tajikistan' },
  { id: 'sugd-state', name: 'SUGD STATE UNIVERSITY (MEDICAL FACULTY)', image: '/assets/Tajikistan5.webp', badge: 'Modern Education', badgeColor: 'from-rose-500 to-pink-400', glowColor: 'rgba(244,63,94,0.3)', desc: 'Offers a supportive academic environment with growing popularity among international medical students.', details: ['**Training:** Hospital-based practical learning'], fees: '₹2.7 – 3.3L / yr', duration: '6 Years', country: 'Tajikistan', location: 'Khujand Region, Tajikistan' },

  // Vietnam
  // Vietnam
  { id: 'hanoi-medical', name: 'HANOI MEDICAL UNIVERSITY', image: '/assets/vietnam1.webp', badge: 'Oldest Pioneer', badgeColor: 'from-red-600 to-yellow-500', glowColor: 'rgba(239,68,68,0.3)', desc: 'Study in one of Vietnam’s oldest and most prestigious medical institutions. **Best For:** Students who want strong academics with a legacy of excellence.', details: ['**Top-tier hospitals** with real patient exposure', '**Hanoi – The Heart of Vietnam**'], fees: 'Approx. ₹3.8 – 4.5L / yr', duration: '6 Years', country: 'Vietnam', location: 'Hanoi, Vietnam' },
  { id: 'hcmc-medical', name: 'UNIVERSITY OF MEDICINE AND PHARMACY HO CHI MINH CITY', image: '/assets/vietnam2.webp', badge: 'Premier Choice', badgeColor: 'from-blue-600 to-red-500', glowColor: 'rgba(37,99,235,0.3)', desc: 'Located in the global city of Ho Chi Minh, offering advanced labs and innovative teaching methods. **Best For:** Students looking for Big-city exposure and modern education.', details: ['**Internationally listed & respected**', '**High patient flow** for better practical training', '**Modern labs & innovative methods**'], fees: 'Approx. ₹3.8 – 4.8L / yr', duration: '6 Years', country: 'Vietnam', location: 'Ho Chi Minh City, Vietnam' },
  { id: 'hue-medical', name: 'HUE UNIVERSITY OF MEDICINE AND PHARMACY', image: '/assets/vietnam3.webp', badge: 'Heritage Education', badgeColor: 'from-emerald-500 to-green-600', glowColor: 'rgba(16,185,129,0.3)', desc: 'Offering high-quality medical education in the cultural city of Hue. **Best For:** Peaceful study environment with quality education.', details: ['**Clinical Practice:** Government hospitals with structured rotations ', '**Environment:** Calm, focused, and student-friendly'], fees: 'Approx. ₹3.5 – 4.2L / yr', duration: '6 Years', country: 'Vietnam', location: 'Hue, Vietnam' },
  { id: 'hai-phong-medical', name: 'HAI PHONG UNIVERSITY OF MEDICINE AND PHARMACY', image: '/assets/vietnam4.webp', badge: 'Coastal Campus', badgeColor: 'from-blue-500 to-indigo-400', glowColor: 'rgba(59,130,246,0.3)', desc: 'Specialized in training future doctors with focus on maritime and general medicine. **Best For:** Practical skills with a balanced lifestyle.', details: ['**Facilities:** Modern labs & practical training', '**Recognition:** Globally listed institutions ', '**Exposure:** Strong hospital affiliations '], fees: 'Approx. ₹3.6 – 4.4L / yr', duration: '6 Years', country: 'Vietnam', location: 'Hai Phong, Vietnam' },
  { id: 'thai-binh-medical', name: 'THAI BINH UNIVERSITY OF MEDICINE AND PHARMACY', image: '/assets/vietnam5.webp', badge: 'Budget Pioneer', badgeColor: 'from-orange-600 to-yellow-500', glowColor: 'rgba(234,179,8,0.3)', desc: 'One of the most affordable options in Vietnam for international medical students. **Best For:** Budget-friendly education without compromising quality.', details: ['**Hands-on clinical experience**', '**Affordable tuition & living costs**'], fees: 'Approx. ₹3.2 – 4.0L / yr', duration: '6 Years', country: 'Vietnam', location: 'Thai Binh, – Focused Academic Hub, Vietnam' },

  // Philippines
  { id: 'up-manila', name: 'UNIVERSITY OF THE PHILIPPINES MANILA – COLLEGE OF MEDICINE', image: '/assets/Philippines1.webp', badge: 'Top Tier', badgeColor: 'from-blue-700 to-blue-500', glowColor: 'rgba(29,78,216,0.3)', desc: 'Top-ranked government medical school in the Philippines with a US-based curriculum. **Ideal for:** High-achieving students aiming for top-tier medical education.', details: ['**Teaching Style:** US-based curriculum', '**Clinical Training:** Premier hospitals with advanced case exposure ', '**Manila – National Capital Region**'], fees: 'Approx. ₹5.0 – 6.5L / yr', duration: '~5.5–6 Years', country: 'Philippines', location: 'Manila, National Capital Region,Philippines' },
  { id: 'west-visayas-state', name: 'WEST VISAYAS STATE UNIVERSITY – COLLEGE OF MEDICINE', image: '/assets/Philippines2.webp', badge: 'Excellence Hub', badgeColor: 'from-indigo-600 to-purple-500', glowColor: 'rgba(79,70,229,0.3)', desc: 'Consistently strong board exam performance with 100% English medium instruction. **Ideal for:** Students focused on licensing exam success and practical skills.', details: ['**Pre-med + MD Program**', '**Medium:** 100% English', '**Clinical Exposure:** Government hospital training', '**Iloilo City**'], fees: 'Approx. ₹4.5 – 5.5L / yr', duration: '6 Years', country: 'Philippines', location: 'Iloilo City, Philippines' },
  { id: 'mindanao-state', name: 'MINDANAO STATE UNIVERSITY – COLLEGE OF MEDICINE', image: '/assets/Philippines3.webp', badge: 'National Pioneer', badgeColor: 'from-emerald-600 to-teal-500', glowColor: 'rgba(16,185,129,0.3)', desc: 'American pattern education system with globally accepted medical listings. **Ideal for:** Students seeking affordable education with solid clinical experience.', details: ['**Education System:** American pattern', '**Training:** Hands-on hospital rotations'], fees: 'Approx. ₹4.2 – 5.2L / yr', duration: '~6 Years (BS + MD) ', country: 'Philippines', location: 'Mindanao Region, Philippines' },
  { id: 'northern-philippines', name: 'UNIVERSITY OF NORTHERN PHILIPPINES – COLLEGE OF MEDICINE', image: '/assets/Philippines4.webp', badge: 'Legacy Choice', badgeColor: 'from-amber-600 to-orange-500', glowColor: 'rgba(217,119,6,0.3)', desc: 'Budget-friendly option providing accessible and high-quality medical education. **Ideal for:** Students looking for cost-effective MBBS abroad options.', details: ['**Course:** BS + MD Program', '**Affordability:** Budget-friendly', '**Clinical Practice:** Local teaching hospitals'], fees: 'Approx. ₹4.0 – 5.0L / yr', duration: '6 Years', country: 'Philippines', location: 'Ilocos Sur, Philippines' },
  { id: 'cagayan-state', name: 'CAGAYAN STATE UNIVERSITY – COLLEGE OF MEDICINE', image: '/assets/Philippines5.webp', badge: 'Coastal Excellence', badgeColor: 'from-cyan-600 to-blue-500', glowColor: 'rgba(6,182,212,0.3)', desc: 'US-based medical education with a commitment to public healthcare and practical-focused learning. **Ideal for:** Students wanting balanced academics and campus life.', details: ['**Duration:** ~6 Years', '**Curriculum:** US-based medical education ', '**Environment:** Safe & student-friendly', '**Training:** Practical-focused learning'], fees: 'Approx. ₹4.1 – 5.1L / yr', duration: '~6 Years', country: 'Philippines', location: 'Cagayan Valley, Philippines' },
];

// ── UNI CARD ──────────────────────────────────────────────────────────────
const UniCard = memo(({ uni, navigate }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref} id={uni.id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.14)' }}
      className="group relative mb-8 sm:mb-10 md:mb-12 rounded-2xl sm:rounded-[1.75rem] md:rounded-[2rem] overflow-hidden bg-white border border-gray-100/80"
      style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.08)', willChange: 'transform' }}
    >
      <div className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[380px] overflow-hidden">
        <img src={uni.image} alt={uni.name} loading="lazy" decoding="async" width="1200" height="380"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${uni.badgeColor}`} />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-7 flex items-end justify-between gap-3 z-10">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${uni.badgeColor} text-white text-[9px] sm:text-[10px] font-black tracking-wide shadow-lg mb-2`}>{uni.badge}</span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight drop-shadow-2xl">{uni.name}</h2>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20 flex-shrink-0">{uni.location || uni.country}</span>
        </div>
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {[
            { text: uni.duration, style: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
            { text: uni.fees, style: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
            { text: 'NMC Approved', style: 'bg-blue-50 border-blue-200 text-blue-700' },
            { text: 'WHO Recognised', style: 'bg-purple-50 border-purple-200 text-purple-700' },
            { text: 'English Medium', style: 'bg-gray-50 border-gray-200 text-gray-600' },
          ].map((tag, ti) => (
            <span key={ti} className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide border ${tag.style}`}>{tag.text}</span>
          ))}
        </div>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6">
          {uni.desc.split(/(\*\*.*?\*\*)/g).map((part, i) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={i} className="font-bold text-gray-800">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-7">
          {uni.details.map((d, di) => {
            const parts = d.split(/(\*\*.*?\*\*)/g);
            return (
              <motion.div key={di} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 text-xs sm:text-sm text-gray-700 font-medium"
                style={{ background: `linear-gradient(135deg, ${uni.glowColor.replace('0.3', '0.06')}, transparent)` }}
              >
                <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${uni.badgeColor} flex items-center justify-center text-white text-[9px] font-black flex-shrink-0`}>✓</span>
                <span>
                  {parts.map((part, i) =>
                    part.startsWith('**') && part.endsWith('**')
                      ? <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>
                      : part
                  )}
                </span>
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${uni.glowColor}` }} whileTap={{ scale: 0.97 }}
            onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
            className={`px-6 sm:px-8 py-3 bg-gradient-to-r ${uni.badgeColor} text-white rounded-full font-bold text-xs sm:text-sm shadow-lg w-full sm:w-auto`}
          >Apply for Admission →</motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/contact')}
            className="px-6 sm:px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-bold text-xs sm:text-sm shadow-sm w-full sm:w-auto hover:bg-gray-50"
          >Contact Us</motion.button>
        </div>
      </div>
    </motion.div>
  );
});

// ── MAIN ──────────────────────────────────────────────────────────────────
const Universities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filterCountry, setFilterCountry] = useState('Kyrgyzstan');

  const handleScrollToSection = useCallback(() => {
    const path = location.pathname;
    const idToScroll = path.includes('/university/') ? path.split('/').pop() : '';
    if (idToScroll) {
      const targetUni = universities.find(u => u.id === idToScroll);
      if (targetUni) setFilterCountry(targetUni.country);
      const rafId = requestAnimationFrame(() => {
        const el = document.getElementById(idToScroll);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      });
      return rafId;
    }
    return null;
  }, [location.pathname]);

  useEffect(() => {
    const rafId = handleScrollToSection();
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [location.pathname, handleScrollToSection]);

  const countries = useMemo(() => ['Kyrgyzstan', 'Georgia', 'Russia', 'Kazakhstan', 'Tajikistan', 'Vietnam', 'Philippines'], []);

  // Handle ?country= query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const countryQuery = params.get('country');
    if (countryQuery && countries.includes(countryQuery)) {
      setFilterCountry(countryQuery);
      setTimeout(() => {
        const el = document.getElementById('explore');
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }, 100);
    }
  }, [location.search, countries]);
  const filteredUniversities = useMemo(() =>
    universities.filter(u => u.country === filterCountry),
    [filterCountry]
  );

  return (
    <div className="bg-[#020c1b]" style={{ transform: 'translateZ(0)' }}>

      {/* ── HERO — Cosmic Parallax ── */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        <CosmicParallaxBg
          head="Elite Medical"
          text="Education, Global, Excellence"
          loop={true}
        >
          <div className="flex flex-col items-center">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                🎓 GLOBAL MEDICAL INSTITUTIONS
              </span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
              className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-2xl"
            >
              Partnering with top-tier NMC-approved universities globally. Join a community of future doctors with 100% visa success.
            </motion.p>


            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10 w-full">
              {[
                { val: '15+', label: 'Global Partners', gradient: 'from-blue-500 to-cyan-400' },
                { val: 'WHO', label: 'Recognised', gradient: 'from-emerald-500 to-teal-400' },
                { val: '100%', label: 'Visa Success', gradient: 'from-purple-500 to-pink-400' },
                { val: 'NMC', label: 'Approved', gradient: 'from-orange-500 to-amber-400' },
              ].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1, type: 'spring' }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className={`relative overflow-hidden rounded-2xl p-4 md:p-5 bg-gradient-to-br ${s.gradient} shadow-lg cursor-default`}
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                  <div className="relative z-10 flex flex-col items-center text-center gap-1">
                    <span className="text-2xl md:text-3xl font-black text-white">{s.val}</span>
                    <span className="text-[9px] md:text-[10px] text-white/90 font-bold uppercase tracking-wider leading-tight">{s.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(6,182,212,0.5)' }} whileTap={{ scale: 0.97 }}
                onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-sm w-full sm:w-auto shadow-lg"
              >Start Your Journey</motion.button>
              <motion.a href="#explore" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <button className="w-full px-10 py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold text-sm backdrop-blur-md flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  Explore Institutions
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                  </svg>
                </button>
              </motion.a>
            </motion.div>
          </div>
        </CosmicParallaxBg>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-6 right-10 hidden md:flex flex-col items-center gap-3 z-20"
        >
          <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
          <motion.div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>


      {/* ── SECTION HEADER ── */}
      <section className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 bg-white relative overflow-hidden z-30">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-4"
          >Our Partner Institutions</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"
          >
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dream University</span>
          </motion.h2>
          <motion.div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            All institutions are NMC-approved, offering world-class medical universities with 6-year MBBS programs in English.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER + CARDS ── */}
      <section className="py-12 sm:py-16 md:py-20 bg-neutral-50" id="explore">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10 sm:mb-14">
            {countries.map((c) => (
              <motion.button key={c} onClick={() => setFilterCountry(c)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 ${filterCountry === c ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                  }`}
              >{c}</motion.button>
            ))}
          </div>

          {/* Tajikistan Header Text */}
          {filterCountry === 'Tajikistan' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10 px-4"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2 leading-tight">
                Study MBBS in <span className="text-blue-600">Tajikistan</span>
              </h2>
              <p className="text-slate-500 font-bold text-sm sm:text-base tracking-tight uppercase opacity-80">
                Affordable. Recognized. Career-Focused Medical Education.
              </p>
              <div className="w-12 h-1 bg-blue-600/20 mx-auto mt-4 rounded-full" />
            </motion.div>
          )}

          {/* Vietnam Header Text */}
          {filterCountry === 'Vietnam' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10 px-4"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2 leading-tight">
                Discover Your Medical Future in <span className="text-red-600">Vietnam</span>
              </h2>
              <p className="text-slate-500 font-bold text-sm sm:text-base tracking-tight uppercase opacity-80 italic">
                Where Tradition Meets Modern Medicine
              </p>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm font-medium">
                Vietnam is quickly emerging as a <span className="text-gray-900 font-bold">smart choice for MBBS abroad</span>, combining academic excellence, rich culture, and globally respected medical training.
              </p>
              <div className="w-12 h-1 bg-red-600/20 mx-auto mt-6 rounded-full" />
            </motion.div>
          )}

          {/* Philippines Header Text */}
          {filterCountry === 'Philippines' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10 px-4"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2 leading-tight">
                MBBS in <span className="text-blue-600">Philippines</span>
              </h2>
              <p className="text-slate-500 font-bold text-sm sm:text-base tracking-tight uppercase opacity-80">
                US-Based Medical Education | High FMGE/NExT Success Potential
              </p>
              <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-xs sm:text-sm font-medium">
                The Philippines offers a <span className="text-gray-900 font-bold">unique American-style medical system</span>, making it one of the most preferred destinations for Indian students aiming for strong clinical knowledge.
              </p>
              <div className="w-12 h-1 bg-blue-600/20 mx-auto mt-6 rounded-full" />
            </motion.div>
          )}
          {filteredUniversities.map((uni) => (
            <UniCard key={uni.id} uni={uni} navigate={navigate} />
          ))}

          {/* Special Info Box for Philippines */}
          {filterCountry === 'Philippines' && (
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-16 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border border-blue-500/30 text-white shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-700" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-3"
                      >Why Students Prefer</motion.span>
                      <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                        💡 Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Philippines</span>?
                      </h3>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20">
                        🇵🇭
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { text: 'American-based medical curriculum', icon: '🇺🇸' },
                      { text: 'Entire course taught in English', icon: '🗣️' },
                      { text: 'High success rate in FMGE/NExT', icon: '🏆' },
                      { text: 'Early clinical exposure', icon: '🏥' },
                      { text: 'Affordable Western-standard education', icon: '💰' },
                      { text: 'No language barrier for Indians', icon: '🇮🇳' }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group/item"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg group-hover/item:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <span className="text-sm font-bold text-blue-50/90 leading-snug">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Journey Timeline for Philippines */}
              <section className="py-20 md:py-32 bg-[#020c1b] rounded-[3rem] mt-12 overflow-hidden relative border border-white/5 shadow-inner">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
                  <div className="text-center mb-16 md:mb-24">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-6"
                    >
                      Your Future Starts Here
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                      Take the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase italic">First Step</span> Toward Your Dream
                    </h2>
                    <p className="text-blue-100/60 max-w-2xl mx-auto text-sm md:text-base">
                      Join thousands of successful medical graduates with <span className="text-blue-400 font-bold">Bravo Groups Educational Consultancy</span> in Philippines.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {[
                      { icon: '🎯', step: '01', title: 'Complete Admission Support', desc: 'Secure your medical seat with 100% assistance in documentation and university application handling.' },
                      { icon: '✈️', step: '02', title: 'Visa & Travel Assistance', desc: 'Expert visa processing and end-to-end travel support for a seamless journey to the Philippines.' },
                      { icon: '🏨', step: '03', title: 'Accommodation Guidance', desc: 'Premium hostel recommendations and settling-in support to ensure a comfortable stay.' },
                    ].map(({ icon, step, title, desc }, idx) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        className="bg-[#0b1b36]/80 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-md flex flex-col items-center text-center hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-4xl mb-6 shadow-inner">
                          {icon}
                        </div>
                        <div className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3">Phase {step}</div>
                        <h3 className="text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
                        <p className="text-blue-100/60 leading-relaxed text-sm">{desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-12">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6,182,212,0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
                      className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-black text-sm uppercase tracking-widest shadow-xl"
                    >Apply for Philippines Now</motion.button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Special Info Box for Vietnam */}
          {filterCountry === 'Vietnam' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border border-red-500/30 text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none group-hover:bg-red-600/20 transition-colors duration-700" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] pointer-events-none group-hover:bg-orange-600/20 transition-colors duration-700" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black tracking-widest uppercase mb-3"
                    >National Highlights</motion.span>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                      🌟 Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">Vietnam</span> Stands Out
                    </h3>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center text-3xl shadow-lg shadow-red-500/20">
                      🇻🇳
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { text: 'Globally recognized universities', icon: '🌍' },
                    { text: 'Cost-effective education', icon: '💰' },
                    { text: 'Strong clinical exposure from early years', icon: '🏥' },
                    { text: 'Safe, welcoming environment', icon: '🛡️' },
                    { text: 'Growing popularity among Indians', icon: '📈' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-red-400/30 transition-all duration-300 group/item"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-lg group-hover/item:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-sm font-bold text-blue-50/90 leading-snug">{item.text}</span>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 bg-gradient-to-r from-red-600/20 to-orange-500/20 p-5 rounded-2xl backdrop-blur-md border border-red-400/40 hover:from-red-600/30 hover:to-orange-500/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <span className="text-sm font-black text-red-300 uppercase tracking-tighter">Premier Choice</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Special Info Box for Tajikistan */}
          {filterCountry === 'Tajikistan' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border border-blue-500/30 text-white shadow-2xl relative overflow-hidden group"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-700" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] pointer-events-none group-hover:bg-purple-600/20 transition-colors duration-700" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-3"
                    >Exclusive Guide</motion.span>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                      Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tajikistan</span> for MBBS?
                    </h3>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20">
                      🌟
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { text: 'Budget-friendly tuition fees', icon: '💰' },
                    { text: 'Globally recognized medical degrees', icon: '🌍' },
                    { text: 'Simple admission process', icon: '📝' },
                    { text: 'Comfortable lifestyle for international students', icon: '🏠' },
                    { text: 'Increasing demand among Indian students', icon: '📈' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group/item"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg group-hover/item:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-sm font-bold text-blue-50/90 leading-snug">{item.text}</span>
                    </motion.div>
                  ))}

                  {/* Final CTA-like feature */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 p-5 rounded-2xl backdrop-blur-md border border-blue-400/40 hover:from-blue-600/30 hover:to-cyan-500/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-900 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <span className="text-sm font-black text-cyan-300 uppercase tracking-tighter">Verified Excellence</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Journey Timeline for Tajikistan */}
          {filterCountry === 'Tajikistan' && (
            <section className="py-20 md:py-32 bg-[#020c1b] rounded-[3rem] mt-12 overflow-hidden relative border border-white/5 shadow-inner">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
              <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-6"
                  >
                    Your Future Starts Here
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 uppercase italic">Dream</span> to Doctor
                  </h2>
                  <p className="text-blue-100/60 max-w-2xl mx-auto text-sm md:text-base">
                    Take the next step towards becoming a doctor with <span className="text-blue-400 font-bold">Bravo Groups Educational Consultancy</span> in Tajikistan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {[
                      { icon: '✨', step: '01', title: 'Admission Assistance', desc: 'Secure your seat in top-tier Tajikistan universities with expert guidance and seamless application handling.' },
                      { icon: '📋', step: '02', title: 'Visa Processing', desc: 'Hassle-free documentation and priority visa stamping managed entirely by our professional team.' },
                      { icon: '✈️', step: '03', title: 'Travel & Accommodation', desc: 'Complete arrival support including airport pickup, university orientation, and premium hostel allocation.' },
                    ].map(({ icon, step, title, desc }, idx) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        className="bg-[#0b1b36]/80 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-md flex flex-col items-center text-center hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-300"
                      >
                        <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-4xl mb-6 shadow-inner">
                          {icon}
                        </div>
                        <div className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-3">Step {step}</div>
                        <h3 className="text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
                        <p className="text-cyan-100/60 leading-relaxed text-sm">{desc}</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center,rgba(6,182,212,0.12),transparent 70%)' }} />
        {[...Array(3)].map((_, i) => (
          <motion.div key={i} className="absolute h-px w-full opacity-10 pointer-events-none"
            style={{ top: `${25 + i * 25}%`, background: 'linear-gradient(90deg,transparent,rgba(6,182,212,0.6),transparent)' }}
            animate={{ x: ['-100%', '100%'] }} transition={{ duration: 5 + i, repeat: Infinity, delay: i * 1.5, ease: 'linear' }}
          />
        ))}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to Begin Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Medical Journey?</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Book a free session with our expert counselors today. 100% admission and visa success guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(6,182,212,0.4)' }} whileTap={{ scale: 0.97 }}
                onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
                className="px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-sm sm:text-base w-full sm:w-auto shadow-lg"
              >Book Free Counseling</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold text-sm sm:text-base backdrop-blur-md w-full sm:w-auto hover:bg-white/10 transition-colors"
              >Contact Us</motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Universities;