import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SplineScene } from '../components/ui/spline';

// Images
import kyrgyzUni1 from '../assets/Kyrgyzstan.webp';
import kyrgyzUni2 from '../assets/Kyrgyzstan 2.webp';
import kyrgyzUni3 from '../assets/Kyrgyzstan 3.webp';
import kyrgyzUni4 from '../assets/Kyrgyzstan 4.webp';
import georgiaUni1 from '../assets/Georgia 1.webp';
import georgiaUni2 from '../assets/georgia2.webp';
import georgiaUni3 from '../assets/Georgia 3.webp';
import georgiaUni4 from '../assets/Georgia 4.webp';
import georgiaUni5 from '../assets/Georgia 5.webp';
import russiaUni1 from '../assets/rasia 1.webp';
import russiaUni2 from '../assets/rasia 2.webp';
import russiaUni3 from '../assets/rasia 3.webp';
import russiaUni4 from '../assets/rasia 4.webp';
import russiaUni5 from '../assets/rasia 5.webp';

const universities = [
  { id: 'osh-state-university', name: 'Osh State University - International Medical Faculty', image: kyrgyzUni1, badge: 'Premier Choice', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.3)', desc: 'One of the oldest and most popular universities in Kyrgyzstan, offering high-standard clinical training and a vibrant student life.', details: ['NMC & WHO Approved', 'Clinical focus', 'Affordable structure', 'Indian food available'], fees: '₹2.8 – 3.5L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'ihsm-bishkek', name: 'International Higher School of Medicine', image: kyrgyzUni2, badge: 'Elite Institution', badgeColor: 'from-cyan-500 to-blue-400', glowColor: 'rgba(6,182,212,0.3)', desc: 'Bishkek-based institution specialized in training international medical students with global standards.', details: ['Modern infrastructure', 'English medium', 'Experienced faculty', 'Safe environment'], fees: '₹3.2 – 3.8L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'jasu-kyrgyzstan', name: 'Jalal Abad State University', image: kyrgyzUni3, badge: 'Quality Education', badgeColor: 'from-purple-500 to-indigo-400', glowColor: 'rgba(168,85,247,0.3)', desc: 'Renowned for its practical approach and community-based medical programs.', details: ['Government approved', 'Low living costs', 'High FMGE success', 'Qualified staff'], fees: '₹2.5 – 3.2L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'jaiu-medical', name: 'Jalal Abad International University', image: kyrgyzUni4, badge: 'Global Perspective', badgeColor: 'from-emerald-500 to-teal-400', glowColor: 'rgba(16,185,129,0.3)', desc: 'A growing hub for medical education with emphasis on global research and diagnostic skills.', details: ['Interactive sessions', 'Advanced labs', 'Direct admission', 'WHO listed'], fees: '₹2.6 – 3.3L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'bau-batumi', name: 'BAU International University Batumi', image: georgiaUni1, badge: 'European Standard', badgeColor: 'from-amber-500 to-orange-400', glowColor: 'rgba(245,158,11,0.3)', desc: 'A state-of-the-art university in the coastal city of Batumi, providing global standard medical curricula.', details: ['ECTS compatible', 'USMLE prep support', 'Beachfront campus', 'Global faculty'], fees: '₹4.5 – 5.5L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'caucasus-university', name: 'Caucasus University', image: georgiaUni2, badge: 'Top Ranked', badgeColor: 'from-rose-500 to-red-400', glowColor: 'rgba(244,63,94,0.3)', desc: 'One of the most prestigious multi-disciplinary universities in Georgia with a leading medical school.', details: ['Accredited by WFME', 'Modern diagnostic center', 'European exchange', 'Vibrant student life'], fees: '₹4.2 – 5.2L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'avicenna-batumi', name: 'Avicenna Batumi Medical University', image: georgiaUni3, badge: 'Clinical Excellence', badgeColor: 'from-indigo-600 to-purple-400', glowColor: 'rgba(79,70,229,0.3)', desc: 'Focused on modern medical practice and clinical rotations in large hospitals.', details: ['Modern lab setup', 'Affordable luxury', 'English medium', 'Highly secure'], fees: '₹4.0 – 5.0L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'seu-tbilisi', name: 'Georgian National University SEU', image: georgiaUni4, badge: 'Massive Campus', badgeColor: 'from-violet-500 to-fuchsia-400', glowColor: 'rgba(139,92,246,0.3)', desc: 'Features one of the most advanced medical campuses in Tbilisi with ultra-modern simulation centers.', details: ['Largest private campus', 'Robotic labs', 'International team', 'High pass rates'], fees: '₹4.3 – 5.4L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'uga-georgia', name: 'The University of Georgia', image: georgiaUni5, badge: 'Pioneer Unit', badgeColor: 'from-blue-700 to-blue-500', glowColor: 'rgba(29,78,216,0.3)', desc: 'A leader in research and high-quality education in Tbilisi with global recognitions.', details: ['High NMC success', 'Premium hostels', 'Research oriented', 'Global alumni'], fees: '₹4.6 – 5.8L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'kazan-federal', name: 'Kazan Federal University', image: russiaUni1, badge: 'Top 10 Russia', badgeColor: 'from-red-600 to-rose-400', glowColor: 'rgba(220,38,38,0.3)', desc: 'A legendary university with a rich history of scientific medical discoveries.', details: ['Federal status', 'Heritage buildings', 'Global research hub', 'Modern clinics'], fees: '₹4.0 – 5.0L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'pirogov-moscow', name: 'Pirogov Russian National Research Medical University', image: russiaUni2, badge: 'Research Giant', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.3)', desc: 'Moscow-based medical university focusing on high-end clinical and theoretical research.', details: ['Moscow location', 'Premier faculty', 'Clinical priority', 'Advanced biology'], fees: '₹5.5 – 7.0L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'bashkir-state', name: 'Bashkir State Medical University', image: russiaUni3, badge: 'Popular Choice', badgeColor: 'from-green-600 to-teal-400', glowColor: 'rgba(22,163,74,0.3)', desc: 'Ufa-based university renowned for its strong robotic surgery department and large student mess.', details: ['Robotic surgery', 'Indian mess available', 'Supportive faculty', 'Safe city'], fees: '₹3.5 – 4.2L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'tver-state', name: 'Tver State Medical University', image: russiaUni4, badge: 'Legacy Institution', badgeColor: 'from-purple-600 to-pink-400', glowColor: 'rgba(147,51,234,0.3)', desc: 'One of the oldest medical colleges in Russia with an excellent alumni network in India.', details: ['Strong alumni base', 'Classic pedagogy', 'Central location', 'Clinical expertise'], fees: '₹3.8 – 4.5L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'volgograd-state', name: 'Volgograd State Medical University', image: russiaUni5, badge: 'Heritage Campus', badgeColor: 'from-amber-600 to-yellow-400', glowColor: 'rgba(217,119,6,0.3)', desc: 'Consistently ranked among the top medical schools in Russia for international students.', details: ['Excellent clinics', 'Proven track record', 'Student centered', 'WHO recognized'], fees: '₹3.6 – 4.4L / yr', duration: '6 Years', country: 'Russia' },
];

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
      requestAnimationFrame(() => {
        const element = document.getElementById(idToScroll);
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    }
  }, [location.pathname]);

  useEffect(() => { handleScrollToSection(); }, [location.pathname, handleScrollToSection]);

  const countries = useMemo(() => ['All', 'Kyrgyzstan', 'Georgia', 'Russia'], []);
  const filteredUniversities = useMemo(() =>
    filterCountry === 'All' ? universities : universities.filter(u => u.country === filterCountry),
    [filterCountry]
  );

  return (
    <div className="bg-[#020c1b]" style={{ willChange: 'scroll-position', transform: 'translateZ(0)' }}>
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#020c1b]" style={{ minHeight: '-webkit-fill-available', height: '100dvh', contain: 'layout style paint', transform: 'translateZ(0)' }}>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020c1b]">
          <div className="w-full h-full opacity-30 md:opacity-100" style={{ transform: 'translateZ(0) scale(1.3)', willChange: 'transform' }}>
            <SplineScene scene="https://prod.spline.design/GF44GSF0i-dPoyNP/scene.splinecode" className="w-full h-full" />
          </div>
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#020c1b]/98 via-[#020c1b]/70 to-transparent" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#020c1b] via-transparent to-[#020c1b]/60" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="max-w-3xl">
            <div className="mb-4"><span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-md inline-block">🎓 GLOBAL MEDICAL INSTITUTIONS</span></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">Elite Medical <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Education</span><br /><span className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Across the Globe</span></h1>
            <p className="text-white text-sm md:text-base leading-relaxed mb-6 max-w-xl">Partnering with top-tier NMC-approved universities globally. Join a community of future doctors with 100% visa success.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[{ val: '15+', label: 'Global Partners', gradient: 'from-blue-500 to-cyan-400' }, { val: 'WHO', label: 'Recognised', gradient: 'from-emerald-500 to-teal-400' }, { val: '100%', label: 'Visa Success', gradient: 'from-purple-500 to-pink-400' }, { val: 'NMC', label: 'Approved', gradient: 'from-orange-500 to-amber-400' }].map((s, i) => (
                <div key={i} className={`relative overflow-hidden rounded-2xl p-4 md:p-5 bg-gradient-to-br ${s.gradient} shadow-lg`} style={{ transform: 'translateZ(0)', transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" /><div className="relative z-10 flex flex-col items-center text-center gap-1.5"><span className="text-2xl md:text-3xl font-black text-white">{s.val}</span><span className="text-[9px] md:text-[10px] text-white/90 font-bold uppercase tracking-wider leading-tight">{s.label}</span></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))} className="px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-sm w-full sm:w-auto" style={{ transform: 'translateZ(0)', transition: 'all 0.15s ease', willChange: 'transform' }}>Start Your Journey</button>
              <a href="#explore" className="w-full sm:w-auto"><button className="w-full px-7 py-3.5 bg-white/5 border border-white/20 text-white rounded-full font-bold text-sm backdrop-blur-md flex items-center justify-center gap-2" style={{ transform: 'translateZ(0)', transition: 'all 0.15s ease', willChange: 'transform' }}>Explore Institutions <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" /></svg></button></a>
            </div>
          </div>
        </div>
      </section>

      <section id="universities" className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 bg-white relative overflow-hidden z-30" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px', contain: 'layout style paint', transform: 'translateZ(0)' }}>
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-[9px] sm:text-[10px] md:text-xs font-black tracking-widest uppercase mb-3 sm:mb-4 md:mb-5">Our Partner Institutions</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 md:mb-5 leading-tight px-2">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dream University</span></h2>
          <div className="w-14 sm:w-16 md:w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-3 sm:mb-4 md:mb-5" />
          <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed px-2">All institutions are NMC-approved, offering world-class medical education with 6-year MBBS programs in English.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-neutral-50" id="explore" style={{ contain: 'layout style paint', transform: 'translateZ(0)', willChange: 'scroll-position' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3 justify-center mb-10 sm:mb-12 md:mb-14">
            {countries.map((c, i) => (
              <button key={`${c}-${i}`} onClick={() => setFilterCountry(c)} className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold ${filterCountry === c ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 border border-gray-100'}`} style={{ transform: 'translateZ(0)', transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)', willChange: 'transform' }}>{c}</button>
            ))}
          </div>

          {filteredUniversities.map((uni) => (
            <div key={uni.id} id={uni.id} className="group relative mb-8 sm:mb-10 md:mb-12 rounded-2xl sm:rounded-[1.75rem] md:rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-white border border-gray-100/80" style={{ transform: 'translateZ(0)', contain: 'layout style paint', contentVisibility: 'auto', containIntrinsicSize: '0 600px', transition: 'box-shadow 0.2s ease', willChange: 'transform' }}>
              <div className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[380px] overflow-hidden">
                <img src={uni.image} alt={uni.name} loading="lazy" decoding="async" width="1200" height="380" className="w-full h-full object-cover" style={{ transform: 'translateZ(0)', transition: 'transform 0.3s ease' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col sm:flex-row items-start sm:items-end justify-between z-10 gap-2 sm:gap-3">
                  <div className="flex-1"><span className={`inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${uni.badgeColor} text-white text-[9px] sm:text-[10px] md:text-xs font-black tracking-wide shadow-lg mb-2`}>{uni.badge}</span><h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight drop-shadow-2xl">{uni.name}</h2></div>
                  <span className="px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-md text-white text-[10px] sm:text-xs md:text-sm font-bold border border-white/20">{uni.country}</span>
                </div>
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${uni.badgeColor} opacity-80`} />
              </div>
              <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                  {[{ text: uni.duration, style: 'bg-indigo-50 border-indigo-200 text-indigo-700' }, { text: uni.fees, style: 'bg-emerald-50 border-emerald-200 text-emerald-700' }, { text: 'NMC Approved', style: 'bg-blue-50 border-blue-200 text-blue-700' }, { text: 'WHO Recognised', style: 'bg-purple-50 border-purple-200 text-purple-700' }, { text: 'English Medium', style: 'bg-gray-50 border-gray-200 text-gray-600' }].map((tag, ti) => (
                    <span key={ti} className={`px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wide border ${tag.style}`}>{tag.text}</span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6">{uni.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 mb-5 sm:mb-6 md:mb-7">
                  {uni.details.map((d, di) => (
                    <div key={di} className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${uni.badgeColor}/5 border border-gray-100 text-[10px] sm:text-xs md:text-sm text-gray-700 font-medium`} style={{ transform: 'translateZ(0)', background: `linear-gradient(135deg, ${uni.glowColor.replace('0.3', '0.06')}, transparent)` }}>
                      <span className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r ${uni.badgeColor} flex items-center justify-center text-white text-[8px] sm:text-[9px] md:text-[10px] font-black flex-shrink-0`}>✓</span>{d}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 items-stretch sm:items-center">
                  <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))} className={`px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r ${uni.badgeColor} text-white rounded-full font-bold text-xs sm:text-sm shadow-lg w-full sm:w-auto`} style={{ transform: 'translateZ(0)', transition: 'transform 0.15s ease', willChange: 'transform' }}>Apply for Admission →</button>
                  <button onClick={() => navigate('/contact')} className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 bg-white border border-gray-200 text-gray-700 rounded-full font-bold text-xs sm:text-sm shadow-sm w-full sm:w-auto" style={{ transform: 'translateZ(0)', transition: 'all 0.15s ease', willChange: 'transform' }}>Contact Us</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" style={{ contain: 'layout style paint', transform: 'translateZ(0)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.15),_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-5 md:mb-6 leading-tight px-2">Ready to Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Medical Journey?</span></h2>
          <p className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">Book a free session with our expert counselors today. 100% admission and visa success guaranteed.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))} className="px-7 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-sm sm:text-base w-full sm:w-auto" style={{ transform: 'translateZ(0)', transition: 'all 0.15s ease', willChange: 'transform' }}>Book Free Counseling</button>
            <button onClick={() => navigate('/contact')} className="px-7 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold text-sm sm:text-base backdrop-blur-md w-full sm:w-auto" style={{ transform: 'translateZ(0)', transition: 'all 0.15s ease', willChange: 'transform' }}>Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;