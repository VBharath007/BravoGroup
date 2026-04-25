import React, { useEffect, useRef, useState, useMemo, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { countryData } from '../components/data/countryData';
import LazyImage from '../components/Lazyimage';

// ── FLAG IMAGES ───────────────────────────────────────────────────────────
const uzbekFlag = '/assets/uzbekistan.webp';
const russiaFlag = '/assets/russia.webp';
const georgiaFlag = '/assets/georgia.webp';
const kyrgyzFlag = '/assets/krygyzstan.webp';
const kazakhFlag = '/assets/kazakhstan.webp';
const philFlag = '/assets/philipines.webp';
const vietnamFlag = '/assets/viatnam.webp';
const tajikFlag = '/assets/tajikistan.webp';

const ACCENTS = {
    uzbekistan: { from: '#3b82f6', to: '#06b6d4', glow: 'rgba(59,130,246,0.35)' },
    kyrgyzstan: { from: '#06b6d4', to: '#6366f1', glow: 'rgba(6,182,212,0.35)' },
    georgia: { from: '#f59e0b', to: '#ef4444', glow: 'rgba(245,158,11,0.35)' },
    russia: { from: '#ef4444', to: '#f97316', glow: 'rgba(239,68,68,0.35)' },
    kazakhstan: { from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.35)' },
    tajikistan: { from: '#8b5cf6', to: '#ec4899', glow: 'rgba(139,92,246,0.35)' },
    vietnam: { from: '#ef4444', to: '#fbbf24', glow: 'rgba(239,68,68,0.35)' },
    philippines: { from: '#f59e0b', to: '#3b82f6', glow: 'rgba(245,158,11,0.35)' },
};

const FLAGS = {
    russia: russiaFlag, georgia: georgiaFlag, kyrgyzstan: kyrgyzFlag,
    kazakhstan: kazakhFlag, philippines: philFlag, vietnam: vietnamFlag,
    tajikistan: tajikFlag, uzbekistan: uzbekFlag,
};

const UNIVERSITIES = {
    uzbekistan: ['Tashkent State Medical University', 'Samarkand State Medical University', 'Bukhara State Medical Institute', 'Andijan State Medical University', 'Fergana State Medical Institute', 'Gulistan State Medical University', 'Tashkent State Pharmaceutical & Medical University', 'Namangan State Medical Institute'],
    kyrgyzstan: ['Osh State University', 'International Higher School of Medicine', 'Jalal-Abad State University', 'Jalal-Abad International University'],
    russia: ['Kazan Federal University', 'Pirogov Russian National Research Medical University', 'Bashkir State Medical University', 'Tver State Medical University', 'Volgograd State Medical University'],
    kazakhstan: ['Asfendiyarov Kazakh National Medical University', 'Astana Medical University', 'Karaganda Medical University', 'Semey Medical University', 'South Kazakhstan Medical Academy'],
    georgia: ['BAU International University Batumi', 'Caucasus University', 'Avicenna Batumi Medical University', 'Georgian National University SEU', 'The University of Georgia'],
    tajikistan: ['Avicenna Tajik State Medical University', 'Tajik National University – Medicine', 'Khujand State University', 'Kulyab State University', 'Sugd State University'],
    vietnam: ['Hanoi Medical University', 'University of Medicine & Pharmacy HCMC', 'Hue University of Medicine', 'Hai Phong University of Medicine', 'Thai Binh University of Medicine'],
    philippines: ['University of the Philippines Manila', 'West Visayas State University', 'Mindanao State University', 'University of Northern Philippines', 'Cagayan State University'],
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const SectionLabel = memo(({ text, accent }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-current" style={{ color: accent.from }} />
        <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: accent.from }}>{text}</span>
        <div className="h-px flex-1 bg-gradient-to-r from-current to-transparent opacity-20" style={{ color: accent.from }} />
    </div>
));

const FeatureCard = memo(({ text, accent, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay, duration: 0.6 }}
        className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all group"
    >
        <p className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">{text}</p>
    </motion.div>
));

// ── VIDEO HERO — replaces legacy animation (zero load, zero CLS) ────────────
const VideoHero = memo(() => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ contain: 'layout style paint' }}
        >
            <div className="absolute inset-0 bg-[#020c1b]" />
            {!loaded && (
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute inset-0 opacity-15" style={{
                        background: 'linear-gradient(90deg,transparent,rgba(59,130,246,0.25),transparent)',
                        animation: 'heroSweep 1.8s ease-in-out infinite',
                    }} />
                </div>
            )}
            <video
                autoPlay loop muted playsInline preload="metadata"
                onCanPlay={() => setLoaded(true)}
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                    willChange: 'opacity',
                    transform: 'translateZ(0)',
                }}
                src="/assets/nervous system.mp4"
            />
            <style>{`
                @keyframes heroSweep {
                    0%{transform:translateX(-100%)} 100%{transform:translateX(100%)}
                }
            `}</style>
        </div>
    );
});


// ── MAIN ──────────────────────────────────────────────────────────────────
const Countries = () => {
    const location = useLocation();
    const [activeId, setActiveId] = useState('uzbekistan');
    const scrollContainerRef = useRef(null);

    // Layout stability improvements
    const scrollToDetails = () => setTimeout(() => {
        const section = document.getElementById('expert-insights');
        if (section) {
            const pos = section.getBoundingClientRect().top + window.pageYOffset - 156;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        }
    }, 150);

    useEffect(() => {
        const hash = location.hash.replace('#', '').toLowerCase();
        let timer;
        if (hash && countryData[hash]) {
            setActiveId(hash);
            timer = scrollToDetails();
        }
        return () => { if (timer) clearTimeout(timer); };
    }, [location.hash]);

    const activeCountry = countryData[activeId];
    const accent = ACCENTS[activeId] || ACCENTS.uzbekistan;

    const countries = useMemo(() => {
        const order = ['uzbekistan', 'kyrgyzstan', 'georgia', 'russia', 'kazakhstan', 'tajikistan', 'vietnam', 'philippines'];
        return order.map(id => [id, countryData[id]]).filter(e => e[1]);
    }, []);

    const scrollLeft = () => scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    const scrollRight = () => scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

    return (
        <div className="bg-[#020c1b] text-white selection:bg-cyan-500/30 overflow-x-hidden min-h-screen">
            <style>{`
                .glass        { background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.06); }
                .glass-strong { background:rgba(255,255,255,0.06); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.08); }
                .no-scroll::-webkit-scrollbar { display:none; }
            `}</style>

            {/* ══ HERO — Video-based, no legacy animations ══ */}
            <section
                className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden mt-28"
                style={{ contain: 'layout style' }}
            >
                {/* Video Hero — instant render, zero network overhead */}
                <VideoHero />


                {/* Overlays */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#020c1b]/40 via-transparent to-[#020c1b]" />
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#020c1b]/80 via-[#020c1b]/20 to-[#020c1b]/80" />
                <div className="absolute inset-0 z-10 pointer-events-none transition-colors duration-1000"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${accent.glow}, transparent 70%)`, opacity: 0.15 }} />

                {/* Hero Content */}
                <div className="relative z-20 text-center px-6 max-w-4xl pt-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="inline-block px-5 py-2 rounded-full glass border border-white/10 text-cyan-400 text-[10px] font-black tracking-[0.4em] uppercase mb-8">
                            Premium Destinations 2025/26
                        </span>
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.02] tracking-tighter mb-8 italic">
                            Medical <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500" style={{ padding: '12px' }}>
                                Excellence
                            </span>
                        </h1>
                        <p className="text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                            Explore world-class MBBS degrees in top-ranked destinations. Verified by WHO, approved by NMC, and guided by Bravo Groups.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex justify-center gap-4 mt-12"
                    >
                        {['Insta', 'FB', 'YT', 'WA'].map((name) => (
                            <motion.button key={name} whileHover={{ y: -5, scale: 1.1 }}
                                className="w-12 h-12 rounded-2xl glass-strong flex items-center justify-center text-xs font-bold border border-white/10 hover:border-white/20 transition-all"
                            >{name[0]}</motion.button>
                        ))}
                    </motion.div>
                </div>

                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
                    <span className="text-[10px] text-neutral-500 tracking-[0.3em] font-bold uppercase">Explore</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                        className="w-[1.5px] h-12 bg-gradient-to-b from-cyan-400 to-transparent"
                    />
                </div>
            </section>

            {/* ══ DESTINATION SCROLLER ══ */}
            <section className="relative py-20 bg-gradient-to-b from-[#020c1b] to-[#040e1e]">
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <h2 className="text-3xl font-black text-white">Choose Destination</h2>
                    <p className="text-neutral-500 text-sm mt-1">Select a country to reveal the dashboard</p>
                </div>

                <div className="relative group/scroller">
                    <button onClick={scrollLeft}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover/scroller:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={scrollRight}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover/scroller:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div ref={scrollContainerRef}
                        className="flex gap-6 px-6 lg:px-[10%] pb-12 overflow-x-auto no-scroll snap-x snap-mandatory"
                    >
                        {countries.map(([id, data]) => {
                            const acc = ACCENTS[id];
                            const isActive = activeId === id;
                            return (
                                <motion.button key={id}
                                    onClick={() => { setActiveId(id); scrollToDetails(); }}
                                    whileHover={{ y: -8 }}
                                    // Fixed w+h prevents image CLS on cards
                                    className={`relative flex-shrink-0 w-[240px] h-[320px] rounded-[2.5rem] overflow-hidden snap-center transition-all duration-500 ${isActive ? 'scale-105 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]' : 'opacity-40 grayscale-[0.5] hover:opacity-100 hover:grayscale-0'}`}
                                    style={{ '--accent-from': acc.from, '--glow-rgba': acc.glow, border: isActive ? `1px solid ${acc.from}` : '1px solid rgba(255,255,255,0.05)' }}
                                >
                                    {/* img with explicit dimensions prevents CLS */}
                                    <img
                                        src={data.heroImage} alt={id}
                                        width="240" height="320"
                                        loading="lazy" decoding="async"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${isActive ? 'from-black/90' : 'from-black/60'} via-transparent to-transparent`} />
                                    <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl glass-strong flex items-center justify-center shadow-xl overflow-hidden border border-white/10">
                                        {/* Flag: fixed size container prevents shift */}
                                        <img src={FLAGS[id]} alt="" width="48" height="48" loading="lazy" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 block" style={{ color: acc.from }}>Destination</span>
                                        <h3 className="text-2xl font-black text-white leading-tight">{data.name}</h3>
                                        {isActive && (
                                            <motion.div layoutId="activeDot" className="w-8 h-1 rounded-full mt-3" style={{ background: acc.from }} />
                                        )}
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ COUNTRY DASHBOARD ══ */}
            <section id="country-detail" className="relative min-h-screen pb-32">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 -right-1/4 w-full h-[800px] blur-[160px] opacity-20 transition-colors duration-1000"
                        style={{ background: `radial-gradient(circle, ${accent.from}, transparent)` }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeId}
                            variants={staggerContainer} initial="hidden" animate="visible"
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
                        >
                            {/* Left */}
                            <div className="lg:col-span-7">
                                <motion.div variants={fadeUp} id="expert-insights">
                                    <SectionLabel text={`Expert Insights: MBBS in ${activeCountry?.name}`} accent={accent} />
                                    <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                        Modern <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg,${accent.from},${accent.to})` }}>Medicine</span><br /> Meets Global Tradition.
                                    </h2>
                                    <p className="text-neutral-400 text-lg leading-relaxed mb-10 border-l-2 border-white/5 pl-8 italic">
                                        "{activeCountry?.aboutQuote}"
                                    </p>
                                    <p className="text-neutral-300 leading-relaxed text-[17px] mb-12">
                                        {activeCountry?.aboutDescription}
                                    </p>
                                </motion.div>

                                <motion.div variants={fadeUp} className="mb-16">
                                    <SectionLabel text="Career Opportunities" accent={accent} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {activeCountry?.careerOpportunities?.map((op, i) => (
                                            <div key={i} className="p-6 rounded-[2rem] glass-strong flex items-center gap-4 group cursor-default">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🎯</div>
                                                <span className="text-sm font-bold text-neutral-300">{op}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div variants={fadeUp}
                                    className="p-10 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
                                    style={{ background: `linear-gradient(135deg,${accent.from}22,${accent.to}11)`, border: `1px solid ${accent.from}44` }}
                                >
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-black text-white mb-2">Start Application</h3>
                                        <p className="text-neutral-400 text-sm">Secure your seat in {activeCountry?.name} today.</p>
                                    </div>
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: activeCountry?.name }))}
                                        className="px-10 py-4 rounded-full font-black text-sm text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                                        style={{ background: `linear-gradient(135deg,${accent.from},${accent.to})`, boxShadow: `0 20px 40px -10px ${accent.glow}` }}
                                    >Apply Now →</button>
                                </motion.div>
                            </div>

                            {/* Right */}
                            <div className="lg:col-span-5 pt-12">
                                <motion.div variants={fadeUp} className="mb-12">
                                    <SectionLabel text="University Rankings" accent={accent} />
                                    <div className="space-y-3">
                                        {UNIVERSITIES[activeId]?.map((uni, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 rounded-2xl glass hover:bg-white/5 transition-all">
                                                <span className="text-sm font-bold text-neutral-200">{uni}</span>
                                                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Rank #{i + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div variants={fadeUp} className="space-y-3">
                                    <SectionLabel text="Elite Features" accent={accent} />
                                    {activeCountry?.features?.slice(0, 5).map((f, i) => (
                                        <FeatureCard key={i} text={f} accent={accent} delay={i * 0.05} />
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default Countries;