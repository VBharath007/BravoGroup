import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { countryData } from '../components/data/countryData';
import { SplineScene } from '../components/ui/spline';
import LazyImage from '../components/Lazyimage';

const uzbekFlag = '/assets/uzbekistan.webp';
const russiaFlag = '/assets/russia.webp';
const georgiaFlag = '/assets/georgia.webp';
const kyrgyzFlag = '/assets/krygyzstan.webp';
const kazakhFlag = '/assets/kazakhstan.webp';
const philFlag = '/assets/philipines.webp';
const vietnamFlag = '/assets/viatnam.webp';
const tajikFlag = '/assets/tajikistan.webp';

const ACCENTS = {
    uzbekistan: { from: '#3b82f6', to: '#06b6d4', glow: 'rgba(59,130,246,0.15)', emoji: '🇺🇿' },
    kyrgyzstan: { from: '#06b6d4', to: '#6366f1', glow: 'rgba(6,182,212,0.15)', emoji: '🇰🇬' },
    georgia: { from: '#f59e0b', to: '#ef4444', glow: 'rgba(245,158,11,0.15)', emoji: '🇬🇪' },
    russia: { from: '#ef4444', to: '#f97316', glow: 'rgba(239,68,68,0.15)', emoji: '🇷🇺' },
    kazakhstan: { from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.15)', emoji: '🇰🇿' },
    tajikistan: { from: '#8b5cf6', to: '#ec4899', glow: 'rgba(139,92,246,0.15)', emoji: '🇹🇯' },
    vietnam: { from: '#ef4444', to: '#fbbf24', glow: 'rgba(239,68,68,0.15)', emoji: '🇻🇳' },
    philippines: { from: '#f59e0b', to: '#3b82f6', glow: 'rgba(245,158,11,0.15)', emoji: '🇵🇭' },
};

const FLAGS = {
    russia: russiaFlag, georgia: georgiaFlag, kyrgyzstan: kyrgyzFlag,
    kazakhstan: kazakhFlag, philippines: philFlag, vietnam: vietnamFlag,
    tajikistan: tajikFlag, uzbekistan: uzbekFlag,
};

const UNIVERSITIES = {
    uzbekistan: ['Tashkent state Medical University', 'Samarkand State Medical University', 'Bukhara State Medical Institute', 'Andijan State Medical University', 'Fergana Institute', 'Namangan Institute'],
    kyrgyzstan: ['Osh State University', 'International Higher School of Medicine', 'Jalal-Abad State University'],
    russia: ['Kazan Federal University', 'Pirogov National Research Medical University', 'Bashkir State Medical University'],
    kazakhstan: ['Asfendiyarov Kazakh National Medical University', 'Astana Medical University', 'Karaganda Medical University'],
    georgia: ['BAU International University Batumi', 'Caucasus University', 'The University of Georgia'],
    tajikistan: ['Avicenna Tajik State Medical University', 'Tajik National University – Medicine'],
    vietnam: ['Hanoi Medical University', 'University of Medicine & Pharmacy HCMC'],
    philippines: ['University of the Philippines Manila', 'West Visayas State University'],
};

const SectionLabel = React.memo(({ text, accent }) => (
    <div className="flex items-center gap-3 mb-6">
        <div className="h-px w-8" style={{ background: `linear-gradient(to right, transparent, ${accent.from})` }} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accent.from }}>{text}</span>
        <div className="h-px flex-1 bg-white/5" />
    </div>
));

const FeatureCard = React.memo(({ text, accent }) => (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent.from }} />
        <p className="text-sm font-bold text-neutral-300 group-hover:text-white transition-colors">{text}</p>
    </div>
));

const Countries = () => {
    const location = useLocation();
    const [activeId, setActiveId] = useState('uzbekistan');
    const scrollContainerRef = useRef(null);

    const activeCountry = useMemo(() => countryData[activeId], [activeId]);
    const accent = useMemo(() => ACCENTS[activeId] || ACCENTS.uzbekistan, [activeId]);

    const countriesList = useMemo(() => {
        const order = ['uzbekistan', 'kyrgyzstan', 'georgia', 'russia', 'kazakhstan', 'tajikistan', 'vietnam', 'philippines'];
        return order.map(id => ({ id, data: countryData[id] })).filter(item => item.data);
    }, []);

    const scrollToDetails = useCallback(() => {
        const section = document.getElementById('expert-insights');
        if (section) {
            const navbarHeight = 120;
            const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        const hash = location.hash.replace('#', '').toLowerCase();
        let timeoutId;
        if (hash && countryData[hash]) {
            setActiveId(hash);
            timeoutId = setTimeout(scrollToDetails, 200);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [location.hash, scrollToDetails]);

    const scroll = useCallback((direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, []);

    const { scrollYProgress } = useScroll();
    const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.4]);


    const memoizedHero = useMemo(() => (
        <section className="relative w-full h-[85vh] lg:h-[95vh] flex items-center justify-center overflow-hidden">
            <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 z-0">
                <div className="w-full h-full scale-[2] lg:scale-100">
                    <SplineScene scene="/assets/earth.splinecode" className="w-full h-full" />
                </div>
            </motion.div>

            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#020c1b]/20 to-[#020c1b]" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,var(--accent-glow),transparent_70%)] transition-colors duration-1000" style={{ '--accent-glow': accent.glow }} />

            <div className="relative z-20 text-center px-6 max-w-4xl mt-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <span className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8">
                        Global Medical Education 2026
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8">
                        World Class <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">
                            Destinations
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Verified medical universities approved by NMC & WHO. Start your global career with Bravo Groups.
                    </p>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 opacity-50">
                <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-blue-500 to-transparent" />
            </div>
        </section>
    ), [bgOpacity, accent.glow]);

    const memoizedDestinations = useMemo(() => (
        <section className="py-20 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-2xl font-black text-white mb-2">Choose Destination</h2>
                <div className="w-12 h-1 bg-blue-600 rounded-full" />
            </div>

            <div className="relative group">
                <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto px-6 lg:px-[10%] no-scroll snap-x snap-mandatory pb-10">
                    {countriesList.map(({ id, data }) => {
                        const isActive = activeId === id;
                        return (
                            <button
                                key={id}
                                onClick={() => { setActiveId(id); scrollToDetails(); }}
                                className={`relative flex-shrink-0 w-60 h-80 rounded-[2.5rem] overflow-hidden snap-center transition-all duration-500 ${isActive ? 'ring-2 ring-blue-500 scale-105' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                            >
                                <LazyImage src={data.heroImage} alt={id} width={240} height={320} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-xl">
                                    <LazyImage src={FLAGS[id]} alt="" width={40} height={40} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 text-left">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 block mb-1">Explore</span>
                                    <h3 className="text-xl font-black text-white leading-tight">{data.name}</h3>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    ), [countriesList, activeId, scrollToDetails]);

    const memoizedInsights = useMemo(() => (
        <section id="expert-insights" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16"
                    >
                        <div className="lg:col-span-7">
                            <SectionLabel text={`Expert Insights: ${activeCountry?.name}`} accent={accent} />
                            <h2 className="text-4xl lg:text-7xl font-black text-white leading-[1.1] mb-8">
                                Medical <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}>Excellence</span> <br /> Simplified.
                            </h2>
                            <p className="text-blue-400 text-lg italic mb-10 border-l-2 border-blue-500/30 pl-6">
                                "{activeCountry?.aboutQuote}"
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed mb-12">
                                {activeCountry?.aboutDescription}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                                {activeCountry?.careerOpportunities?.map((op, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4 group">
                                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-300">{op}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 rounded-[3rem] bg-slate-900 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-black text-white mb-2">Secure Your Seat</h3>
                                    <p className="text-gray-500 text-sm">Applications are open for 2026 session in {activeCountry?.name}.</p>
                                </div>
                                <button
                                    onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: activeCountry?.name }))}
                                    className="px-10 py-4 rounded-full bg-blue-600 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-500 shadow-2xl transition-all"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <SectionLabel text="Top Ranked Institutions" accent={accent} />
                                <div className="space-y-3">
                                    {UNIVERSITIES[activeId]?.map((uni, i) => (
                                        <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                                            <span className="text-sm font-bold text-gray-200">{uni}</span>
                                            <span className="text-[10px] text-gray-600 group-hover:text-blue-500">↗</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <SectionLabel text="Elite Benefits" accent={accent} />
                                {activeCountry?.features?.slice(0, 5).map((f, i) => (
                                    <FeatureCard key={i} text={f} accent={accent} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    ), [activeId, activeCountry, accent, scrollToDetails]);

    return (
        <div className="bg-[#020c1b] text-white selection:bg-blue-500/30 overflow-x-hidden min-h-screen">
            {memoizedHero}
            {memoizedDestinations}
            {memoizedInsights}
        </div>
    );
};

export default Countries;
