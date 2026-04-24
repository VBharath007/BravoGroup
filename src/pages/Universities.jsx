import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SplineScene } from '../components/ui/spline';
import LazyImage from '../components/Lazyimage';
import { useInView } from "react-intersection-observer";

const universitiesData = [
  { id: 'osh-state-university', name: 'Osh State University - International Medical Faculty', image: '/assets/Kyrgyzstan.webp', badge: 'Premier Choice', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.1)', desc: 'One of the oldest and most popular universities in Kyrgyzstan, offering high-standard clinical training and a vibrant student life.', details: ['NMC & WHO Approved', 'Clinical focus', 'Affordable structure', 'Indian food available'], fees: '₹2.8 – 3.5L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'ihsm-bishkek', name: 'International Higher School of Medicine', image: '/assets/Kyrgyzstan 2.webp', badge: 'Elite Institution', badgeColor: 'from-cyan-500 to-blue-400', glowColor: 'rgba(6,182,212,0.1)', desc: 'Bishkek-based institution specialized in training international medical students with global standards.', details: ['Modern infrastructure', 'English medium', 'Experienced faculty', 'Safe environment'], fees: '₹3.2 – 3.8L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'jasu-kyrgyzstan', name: 'Jalal Abad State University', image: '/assets/Kyrgyzstan 3.webp', badge: 'Quality Education', badgeColor: 'from-purple-500 to-indigo-400', glowColor: 'rgba(168,85,247,0.1)', desc: 'Renowned for its practical approach and community-based medical programs.', details: ['Government approved', 'Low living costs', 'High FMGE success', 'Qualified staff'], fees: '₹2.5 – 3.2L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'jaiu-medical', name: 'Jalal Abad International University', image: '/assets/Kyrgyzstan 4.webp', badge: 'Global Perspective', badgeColor: 'from-emerald-500 to-teal-400', glowColor: 'rgba(16,185,129,0.1)', desc: 'A growing hub for medical education with emphasis on global research and diagnostic skills.', details: ['Interactive sessions', 'Advanced labs', 'Direct admission', 'WHO listed'], fees: '₹2.6 – 3.3L / yr', duration: '6 Years', country: 'Kyrgyzstan' },
  { id: 'bau-batumi', name: 'BAU International University Batumi', image: '/assets/Georgia 1.webp', badge: 'European Standard', badgeColor: 'from-amber-500 to-orange-400', glowColor: 'rgba(245,158,11,0.1)', desc: 'A state-of-the-art university in the coastal city of Batumi, providing global standard medical curricula.', details: ['ECTS compatible', 'USMLE prep support', 'Beachfront campus', 'Global faculty'], fees: '₹4.5 – 5.5L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'caucasus-university', name: 'Caucasus University', image: '/assets/georgia2.webp', badge: 'Top Ranked', badgeColor: 'from-rose-500 to-red-400', glowColor: 'rgba(244,63,94,0.1)', desc: 'One of the most prestigious multi-disciplinary universities in Georgia with a leading medical school.', details: ['Accredited by WFME', 'Modern diagnostic center', 'European exchange', 'Vibrant student life'], fees: '₹4.2 – 5.2L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'seu-tbilisi', name: 'Georgian National University SEU', image: '/assets/Georgia 4.webp', badge: 'Massive Campus', badgeColor: 'from-violet-500 to-fuchsia-400', glowColor: 'rgba(139,92,246,0.1)', desc: 'Features one of the most advanced medical campuses in Tbilisi with ultra-modern simulation centers.', details: ['Largest private campus', 'Robotic labs', 'International team', 'High pass rates'], fees: '₹4.3 – 5.4L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'uga-georgia', name: 'The University of Georgia', image: '/assets/Georgia 5.webp', badge: 'Pioneer Unit', badgeColor: 'from-blue-700 to-blue-500', glowColor: 'rgba(29,78,216,0.1)', desc: 'A leader in research and high-quality education in Tbilisi with global recognitions.', details: ['High NMC success', 'Premium hostels', 'Research oriented', 'Global alumni'], fees: '₹4.6 – 5.8L / yr', duration: '6 Years', country: 'Georgia' },
  { id: 'kazan-federal', name: 'Kazan Federal University', image: '/assets/rasia 1.webp', badge: 'Top 10 Russia', badgeColor: 'from-red-600 to-rose-400', glowColor: 'rgba(220,38,38,0.1)', desc: 'A legendary university with a rich history of scientific medical discoveries.', details: ['Federal status', 'Heritage buildings', 'Global research hub', 'Modern clinics'], fees: '₹4.0 – 5.0L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'pirogov-moscow', name: 'Pirogov Russian National Research Medical University', image: '/assets/rasia 2.webp', badge: 'Research Giant', badgeColor: 'from-blue-600 to-indigo-400', glowColor: 'rgba(37,99,235,0.1)', desc: 'Moscow-based medical university focusing on high-end clinical and theoretical research.', details: ['Moscow location', 'Premier faculty', 'Clinical priority', 'Advanced biology'], fees: '₹5.5 – 7.0L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'bashkir-state', name: 'Bashkir State Medical University', image: '/assets/rasia 3.webp', badge: 'Popular Choice', badgeColor: 'from-green-600 to-teal-400', glowColor: 'rgba(22,163,74,0.1)', desc: 'Ufa-based university renowned for its strong robotic surgery department and large student mess.', details: ['Robotic surgery', 'Indian mess available', 'Supportive faculty', 'Safe city'], fees: '₹3.5 – 4.2L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'tver-state', name: 'Tver State Medical University', image: '/assets/rasia 4.webp', badge: 'Legacy Institution', badgeColor: 'from-purple-600 to-pink-400', glowColor: 'rgba(147,51,234,0.1)', desc: 'One of the oldest medical colleges in Russia with an excellent alumni network in India.', details: ['Strong alumni base', 'Classic pedagogy', 'Central location', 'Clinical expertise'], fees: '₹3.8 – 4.5L / yr', duration: '6 Years', country: 'Russia' },
  { id: 'volgograd-state', name: 'Volgograd State Medical University', image: '/assets/rasia 5.webp', badge: 'Heritage Campus', badgeColor: 'from-amber-600 to-yellow-400', glowColor: 'rgba(217,119,6,0.1)', desc: 'Consistently ranked among the top medical schools in Russia for international students.', details: ['Excellent clinics', 'Proven track record', 'Student centered', 'WHO recognized'], fees: '₹3.6 – 4.4L / yr', duration: '6 Years', country: 'Russia' },
];

function LazySection({ children, height = "400px" }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div ref={ref} style={{ minHeight: inView ? 'auto' : height }}>
      {inView ? children : null}
    </div>
  );
}

const UniversityCard = React.memo(({ uni, navigate }) => (
  <div id={uni.id} className="group relative mb-12 rounded-[2rem] overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
    <div className="relative h-64 md:h-96 overflow-hidden">
      <LazyImage src={uni.image} alt={uni.name} width={800} height={450} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:left-8 z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${uni.badgeColor} text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg mb-2 sm:mb-4`}>
            {uni.badge}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight">{uni.name}</h3>
        </div>
        <div className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[10px] sm:text-sm uppercase tracking-widest" style={{ WebkitBackdropFilter: "blur(20px)" }}>
          {uni.country}
        </div>
      </div>
    </div>

    <div className="p-8 lg:p-12">
      <div className="flex flex-wrap gap-2 mb-8">
        {[uni.duration, uni.fees, 'NMC Approved', 'WHO Recognized'].map((tag, i) => (
          <span key={i} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest">
            {tag}
          </span>
        ))}
      </div>
      
      <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-4xl">
        {uni.desc}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {uni.details.map((d, i) => (
          <div key={i} className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 group/item">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${uni.badgeColor} flex items-center justify-center text-white text-[10px] font-black`}>
              ✓
            </div>
            <span className="text-slate-700 font-bold">{d}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
          className={`px-10 py-5 bg-gradient-to-r ${uni.badgeColor} text-white font-black uppercase tracking-widest rounded-full shadow-2xl hover:-translate-y-1 transition-all active:scale-95`}
        >
          Apply Now — Admissions Open
        </button>
        <button 
          onClick={() => navigate('/contact')}
          className="px-10 py-5 bg-white text-slate-700 border border-slate-200 font-black uppercase tracking-widest rounded-full hover:bg-slate-50 transition-all active:scale-95"
        >
          Talk to Advisor
        </button>
      </div>
    </div>
  </div>
));

const Universities = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filterCountry, setFilterCountry] = useState('All');

  useEffect(() => {
    const idToScroll = location.pathname.includes('/university/') ? location.pathname.split('/').pop() : '';
    let timeoutId;
    
    if (idToScroll) {
      const targetUni = universitiesData.find(u => u.id === idToScroll);
      if (targetUni) setFilterCountry(targetUni.country);
      
      timeoutId = setTimeout(() => {
        const element = document.getElementById(idToScroll);
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  const countries = useMemo(() => ['All', 'Kyrgyzstan', 'Georgia', 'Russia'], []);
  const filteredUniversities = useMemo(() =>
    filterCountry === 'All' ? universitiesData : universitiesData.filter(u => u.country === filterCountry),
    [filterCountry]
  );

  const memoizedHero = useMemo(() => (
    <section className="relative w-full min-h-[70vh] py-20 flex items-center justify-center overflow-hidden bg-[#020c1b]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full opacity-40 lg:opacity-100">
          <SplineScene scene="/assets/universities.splinecode" className="w-full h-full" />
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020c1b] via-[#020c1b]/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020c1b] via-transparent to-[#020c1b]/80" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="max-w-3xl">
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 inline-block">
            Premium Medical Institutions
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8">
            Your Future in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Global Medicine
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
            Partnering with top-tier NMC-approved universities globally. Guaranteed admission guidance for aspiring doctors.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button onClick={() => document.getElementById('explore').scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-full shadow-2xl hover:bg-blue-500 transition-all">
              Explore Universities
            </button>
          </div>
        </div>
      </div>
    </section>
  ), []);

  const memoizedExplore = useMemo(() => (
    <section id="explore" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">World-Class Medical Schools</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {countries.map((c) => (
              <button 
                key={c} 
                onClick={() => setFilterCountry(c)}
                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${filterCountry === c ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {filteredUniversities.map((uni) => (
            <UniversityCard key={uni.id} uni={uni} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  ), [countries, filterCountry, filteredUniversities, navigate]);

  const memoizedCTA = useMemo(() => (
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Begin Your Medical Career Today</h2>
        <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
          Get expert counseling for 100% transparent admission and visa processing.
        </p>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
          className="px-12 py-6 bg-white text-blue-600 font-black uppercase tracking-widest rounded-full shadow-2xl hover:-translate-y-1 transition-all"
        >
          Book Free Counseling
        </button>
      </div>
    </section>
  ), []);

  return (
    <div className="bg-[#020c1b] min-h-screen">
      {memoizedHero}
      <LazySection height="1200px">{memoizedExplore}</LazySection>
      <LazySection height="600px">{memoizedCTA}</LazySection>
    </div>
  );
};

export default Universities;
