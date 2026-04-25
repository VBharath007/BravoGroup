import React, { useEffect, useCallback, useState, useMemo, memo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { CosmicParallaxBg } from '../components/ui/parallax-cosmic-background';


// ── UNIVERSITIES DATA ─────────────────────────────────────────────────────
const universities = [
  { id: 'osh-state-university', name: 'Osh State University - International Medical Faculty', image: '/assets/Kyrgyzstan.webp', badge: 'Premier Choice', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.3)', desc: 'One of the oldest and most popular universities in Kyrgyzstan, offering high-standard clinical training and a vibrant student life.', details: ['NMC & WHO Approved', 'Clinical focus', 'Affordable structure', 'Indian food available'], fees: '₹2.8 – 3.5L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'ihsm-bishkek', name: 'International Higher School of Medicine', image: '/assets/Kyrgyzstan 2.webp', badge: 'Elite Institution', badgeColor: 'from-cyan-500 to-blue-400', glowColor: 'rgba(6,182,212,0.3)', desc: 'Bishkek-based institution specialized in training international medical students with global standards.', details: ['Modern infrastructure', 'English medium', 'Experienced faculty', 'Safe environment'], fees: '₹3.2 – 3.8L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'jasu-kyrgyzstan', name: 'Jalal Abad State University', image: '/assets/Kyrgyzstan 3.webp', badge: 'Quality Education', badgeColor: 'from-purple-500 to-indigo-400', glowColor: 'rgba(168,85,247,0.3)', desc: 'Renowned for its practical approach and community-based medical programs.', details: ['Government approved', 'Low living costs', 'High FMGE success', 'Qualified staff'], fees: '₹2.5 – 3.2L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'jaiu-medical', name: 'Jalal Abad International University', image: '/assets/Kyrgyzstan 4.webp', badge: 'Global Perspective', badgeColor: 'from-emerald-500 to-teal-400', glowColor: 'rgba(16,185,129,0.3)', desc: 'A growing hub for medical education with emphasis on global research and diagnostic skills.', details: ['Interactive sessions', 'Advanced labs', 'Direct admission', 'WHO listed'], fees: '₹2.6 – 3.3L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'bau-batumi', name: 'BAU International University Batumi', image: '/assets/Georgia 1.webp', badge: 'European Standard', badgeColor: 'from-amber-500 to-orange-400', glowColor: 'rgba(245,158,11,0.3)', desc: 'A state-of-the-art university in the coastal city of Batumi, providing global standard medical curricula.', details: ['ECTS compatible', 'USMLE prep support', 'Beachfront campus', 'Global faculty'], fees: '₹4.5 – 5.5L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'caucasus-university', name: 'Caucasus University', image: '/assets/georgia2.webp', badge: 'Top Ranked', badgeColor: 'from-rose-500 to-red-400', glowColor: 'rgba(244,63,94,0.3)', desc: 'One of the most prestigious multi-disciplinary universities in Georgia with a leading medical school.', details: ['Accredited by WFME', 'Modern diagnostic center', 'European exchange', 'Vibrant student life'], fees: '₹4.2 – 5.2L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'avicenna-batumi', name: 'Avicenna Batumi Medical University', image: '/assets/Georgia 3.webp', badge: 'Clinical Excellence', badgeColor: 'from-indigo-600 to-purple-400', glowColor: 'rgba(79,70,229,0.3)', desc: 'Focused on modern medical practice and clinical rotations in large hospitals.', details: ['Modern lab setup', 'Affordable luxury', 'English medium', 'Highly secure'], fees: '₹4.0 – 5.0L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'seu-tbilisi', name: 'Georgian National University SEU', image: '/assets/Georgia 4.webp', badge: 'Massive Campus', badgeColor: 'from-violet-500 to-fuchsia-400', glowColor: 'rgba(139,92,246,0.3)', desc: 'Features one of the most advanced medical campuses in Tbilisi with ultra-modern simulation centers.', details: ['Largest private campus', 'Robotic labs', 'International team', 'High pass rates'], fees: '₹4.3 – 5.4L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'uga-georgia', name: 'The University of Georgia', image: '/assets/Georgia 5.webp', badge: 'Pioneer Unit', badgeColor: 'from-blue-700 to-blue-500', glowColor: 'rgba(29,78,216,0.3)', desc: 'A leader in research and high-quality education in Tbilisi with global recognitions.', details: ['High NMC success', 'Premium hostels', 'Research oriented', 'Global alumni'], fees: '₹4.6 – 5.8L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'kazan-federal', name: 'Kazan Federal University', image: '/assets/rasia 1.webp', badge: 'Top 10 Russia', badgeColor: 'from-red-600 to-rose-400', glowColor: 'rgba(220,38,38,0.3)', desc: 'A legendary university with a rich history of scientific medical discoveries.', details: ['Federal status', 'Heritage buildings', 'Global research hub', 'Modern clinics'], fees: '₹4.0 – 5.0L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'pirogov-moscow', name: 'Pirogov Russian National Research Medical University', image: '/assets/rasia 2.webp', badge: 'Research Giant', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.3)', desc: 'Moscow-based medical university focusing on high-end clinical and theoretical research.', details: ['Moscow location', 'Premier faculty', 'Clinical priority', 'Advanced biology'], fees: '₹5.5 – 7.0L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'bashkir-state', name: 'Bashkir State Medical University', image: '/assets/rasia 3.webp', badge: 'Popular Choice', badgeColor: 'from-green-600 to-teal-400', glowColor: 'rgba(22,163,74,0.3)', desc: 'Ufa-based university renowned for its strong robotic surgery department and large student mess.', details: ['Robotic surgery', 'Indian mess available', 'Supportive faculty', 'Safe city'], fees: '₹3.5 – 4.2L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'tver-state', name: 'Tver State Medical University', image: '/assets/rasia 4.webp', badge: 'Legacy Institution', badgeColor: 'from-purple-600 to-pink-400', glowColor: 'rgba(147,51,234,0.3)', desc: 'One of the oldest medical colleges in Russia with an excellent alumni network in India.', details: ['Strong alumni base', 'Classic pedagogy', 'Central location', 'Clinical expertise'], fees: '₹3.8 – 4.5L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'volgograd-state', name: 'Volgograd State Medical University', image: '/assets/rasia 5.webp', badge: 'Heritage Campus', badgeColor: 'from-amber-600 to-yellow-400', glowColor: 'rgba(217,119,6,0.3)', desc: 'Consistently ranked among the top medical schools in Russia for international students.', details: ['Excellent clinics', 'Proven track record', 'Student centered', 'WHO recognized'], fees: '₹3.6 – 4.4L / yr', duration: '6 Years', country: 'Russia' },
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
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20 flex-shrink-0">{uni.country}</span>
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
        <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6">{uni.desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-7">
          {uni.details.map((d, di) => (
            <motion.div key={di} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 text-xs sm:text-sm text-gray-700 font-medium"
              style={{ background: `linear-gradient(135deg, ${uni.glowColor.replace('0.3', '0.06')}, transparent)` }}
            >
              <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${uni.badgeColor} flex items-center justify-center text-white text-[9px] font-black flex-shrink-0`}>✓</span>
              {d}
            </motion.div>
          ))}
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
  const [filterCountry, setFilterCountry] = useState('All');

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

  const countries = useMemo(() => ['All', 'Kyrgyzstan', 'Georgia', 'Russia'], []);
  const filteredUniversities = useMemo(() =>
    filterCountry === 'All' ? universities : universities.filter(u => u.country === filterCountry),
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
            All institutions are NMC-approved, offering world-class medical education with 6-year MBBS programs in English.
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
          {filteredUniversities.map((uni) => (
            <UniCard key={uni.id} uni={uni} navigate={navigate} />
          ))}
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