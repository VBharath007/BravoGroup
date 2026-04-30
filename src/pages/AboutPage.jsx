import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import './AboutPage.css';

const serviceStudent = '/assets/service_student.webp';

// ── FIXED PARTICLES ───────────────────────────────────────────────────────
const PARTICLES = [
  { w: 4, h: 4, l: '10%', t: '20%', c: 'rgba(99,179,237,0.6)', d: 0 },
  { w: 3, h: 3, l: '21%', t: '45%', c: 'rgba(167,139,250,0.6)', d: 0.3 },
  { w: 5, h: 5, l: '32%', t: '22%', c: 'rgba(99,179,237,0.6)', d: 0.8 },
  { w: 3, h: 3, l: '43%', t: '68%', c: 'rgba(167,139,250,0.6)', d: 1.2 },
  { w: 4, h: 4, l: '54%', t: '30%', c: 'rgba(99,179,237,0.6)', d: 0.6 },
  { w: 3, h: 3, l: '65%', t: '55%', c: 'rgba(167,139,250,0.6)', d: 1.5 },
  { w: 5, h: 5, l: '76%', t: '25%', c: 'rgba(99,179,237,0.6)', d: 0.4 },
  { w: 3, h: 3, l: '87%', t: '70%', c: 'rgba(167,139,250,0.6)', d: 1.0 },
];

// ── DNA VIDEO ─────────────────────────────────────────────────────────────
const DNAVideoBackground = memo(() => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ contain: 'layout style paint' }}>
      <div className="absolute inset-0 bg-[#04080F]" />
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 opacity-20" style={{
            background: 'linear-gradient(90deg,transparent,rgba(59,130,246,0.2),transparent)',
            animation: 'skeletonSweep 1.8s ease-in-out infinite',
          }} />
        </div>
      )}
      <video autoPlay loop muted playsInline preload="metadata"
        onCanPlay={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 0.5 : 0,
          transition: 'opacity 0.8s ease',
          mixBlendMode: 'screen',
          filter: 'hue-rotate(200deg) saturate(1.6) brightness(1.3)',
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
        src="/assets/Dna.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.7) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
});

// ── DNA HELIX ─────────────────────────────────────────────────────────────
const DNAHelixIcon = memo(() => {
  const strands = Array.from({ length: 14 });
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none" style={{ contain: 'layout style paint' }}>
      <div className="absolute w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)', animation: 'dnaPulse 4s ease-in-out infinite' }} />
      <div className="absolute w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle,rgba(167,139,250,0.08) 0%,transparent 70%)', animation: 'dnaPulse 4s ease-in-out 2s infinite' }} />
      <div className="relative flex flex-col justify-between items-center" style={{ width: 80, height: 240, gap: 0 }}>
        {strands.map((_, i) => {
          const d = i * 0.13;
          return (
            <div key={i} className="relative flex justify-center items-center" style={{ width: '100%', height: 2, marginBottom: i < 13 ? 20 : 0 }}>
              <div className="absolute rounded-full" style={{ width: 12, height: 12, background: 'rgba(99,179,237,0.95)', boxShadow: '0 0 12px rgba(99,179,237,0.8)', animation: `dnaSwing 2.6s ease-in-out ${d}s infinite`, left: '50%', transform: 'translateX(-50%)' }} />
              <div className="absolute rounded-full" style={{ width: 12, height: 12, background: 'rgba(167,139,250,0.95)', boxShadow: '0 0 12px rgba(167,139,250,0.8)', animation: `dnaSwingR 2.6s ease-in-out ${d}s infinite`, left: '50%', transform: 'translateX(-50%)' }} />
              <div style={{ position: 'absolute', height: 2, width: 72, background: 'linear-gradient(90deg,rgba(99,179,237,0.6),rgba(167,139,250,0.6))', animation: `dnaBar 2.6s ease-in-out ${d}s infinite`, borderRadius: 2 }} />
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes dnaSwing  {0%,100%{transform:translateX(-34px)}50%{transform:translateX(34px)}}
        @keyframes dnaSwingR {0%,100%{transform:translateX(34px)}50%{transform:translateX(-34px)}}
        @keyframes dnaBar    {0%,100%{opacity:.25;transform:scaleX(.45)}50%{opacity:1;transform:scaleX(1)}}
        @keyframes dnaPulse  {0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.2);opacity:1}}
        @keyframes skeletonSweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
      `}</style>
    </div>
  );
});

// ── SPLIT TEXT ────────────────────────────────────────────────────────────
const SplitTextReveal = memo(({ text, className, delay = 0, tag = 'h1' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const Tag = tag;
  return (
    <Tag ref={ref} className={className} style={{ overflow: 'hidden' }}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          <motion.span style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: delay + wi * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >{word}</motion.span>
        </span>
      ))}
    </Tag>
  );
});

// ── CHAR REVEAL ───────────────────────────────────────────────────────────
const CharReveal = memo(({ text, className, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <span ref={ref} className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span key={i} style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: 'easeOut' }}
        >{char}</motion.span>
      ))}
    </span>
  );
});

// ── STAT COUNTER ──────────────────────────────────────────────────────────
const StatisticCounter = memo(({ target, suffix = '+', duration = 2000, step = 1 }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const interval = duration / (target / step);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || count >= target) return;
    const t = setTimeout(() => setCount(p => Math.min(p + step, target)), interval);
    return () => clearTimeout(t);
  }, [count, target, visible, interval, step]);
  return <span ref={ref}>{count}{suffix}</span>;
});

// ── STAT CARD ─────────────────────────────────────────────────────────────
const PremiumStatCard = memo(({ stat, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: i * 0.15, type: 'spring', stiffness: 80 }}
      whileHover={{ y: -8, scale: 1.04 }}
      className="relative flex flex-col items-center justify-center p-8 rounded-3xl backdrop-blur-xl border border-white/10 group cursor-pointer overflow-hidden"
      style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))', contain: 'layout style paint' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%,rgba(59,130,246,0.15),transparent 80%)' }} />
      <motion.div className="w-16 h-16 mb-6 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-3xl text-blue-400 group-hover:bg-blue-500/20 transition-all duration-500"
        animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
      >
        <i className={`fa-solid ${stat.icon}`} />
      </motion.div>
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
        <StatisticCounter target={stat.target} step={stat.step} suffix={stat.suffix ?? '+'} />
      </div>
      <div className="text-sm font-bold text-blue-200/60 uppercase tracking-[0.2em] text-center">{stat.label}</div>
      <motion.div className="absolute bottom-0 left-0 right-0 h-[3px]"
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: i * 0.2 + 0.4 }}
        style={{ background: 'linear-gradient(90deg,transparent,#3b82f6,transparent)', transformOrigin: 'center' }}
      />
    </motion.div>
  );
});

// ── SERVICE ITEM ──────────────────────────────────────────────────────────
const ServiceItem = memo(({ service, idx }) => (
  <motion.li
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.05 } },
    }}
    whileHover={{ y: -5, backgroundColor: 'rgba(59,130,246,0.03)', borderColor: 'rgba(59,130,246,0.2)' }}
    className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-100/80 transition-all duration-300 group cursor-default"
  >
    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
      <i className="fa-solid fa-check text-sm" />
    </div>
    <span className="font-bold text-sm md:text-[0.95rem] text-neutral-800 tracking-tight leading-none">{service}</span>
  </motion.li>
));

// ── COUNTRY CARD ──────────────────────────────────────────────────────────
const CountryCard = memo(({ country, isCore, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="relative flex flex-col items-center gap-3 p-6 rounded-2xl border cursor-default overflow-hidden group transition-all duration-300"
      style={{
        background: isCore
          ? 'linear-gradient(135deg,rgba(37,99,235,0.08),rgba(99,179,237,0.04))'
          : 'linear-gradient(135deg,rgba(255,255,255,0.7),rgba(248,250,255,0.9))',
        borderColor: isCore ? 'rgba(37,99,235,0.2)' : 'rgba(226,232,240,0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {isCore && (
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest">
          Core
        </div>
      )}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: isCore ? 'rgba(37,99,235,0.1)' : 'rgba(241,245,249,1)' }}>
        <i className={`fa-solid fa-globe ${isCore ? 'text-blue-600' : 'text-slate-400'}`} />
      </div>
      <span className={`font-black text-sm tracking-tight text-center ${isCore ? 'text-blue-700' : 'text-neutral-700'}`}>
        {country}
      </span>
      <motion.div className="absolute bottom-0 left-0 right-0 h-[2px]"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
        style={{
          background: isCore
            ? 'linear-gradient(90deg,transparent,#2563eb,transparent)'
            : 'linear-gradient(90deg,transparent,#94a3b8,transparent)',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  );
});

// ── UNIVERSITY CARD ───────────────────────────────────────────────────────
const UniversityCard = memo(({ name, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      whileHover={{ x: 6, backgroundColor: 'rgba(37,99,235,0.04)' }}
      className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 bg-white/60 backdrop-blur-sm transition-all duration-300 group cursor-default"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
        <i className="fa-solid fa-building-columns text-sm" />
      </div>
      <span className="font-bold text-sm text-neutral-800 leading-snug">{name}</span>
    </motion.div>
  );
});

// ── STRENGTH CARD ─────────────────────────────────────────────────────────
const StrengthCard = memo(({ item, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.07 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative flex items-start gap-4 p-5 rounded-2xl border border-white/60 backdrop-blur-md group cursor-default overflow-hidden"
      style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.8),rgba(248,250,255,0.6))' }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 50%,rgba(37,99,235,0.06),transparent 70%)' }} />
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-500/20">
        <i className="fa-solid fa-check text-xs" />
      </div>
      <span className="font-semibold text-sm text-neutral-800 leading-snug pt-1">{item}</span>
    </motion.div>
  );
});

// ── STEP CARD (for FMGE section) ──────────────────────────────────────────
const StepCard = memo(({ step, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white/50 border border-blue-100/60 backdrop-blur-sm"
    >
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0 mt-0.5">
        {idx + 1}
      </div>
      <p className="text-neutral-700 font-medium text-sm leading-relaxed">{step}</p>
    </motion.div>
  );
});

// ── TRUST BADGE ───────────────────────────────────────────────────────────
const TrustBadge = memo(({ item, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl text-center border border-white/20 backdrop-blur-md cursor-default"
      style={{ background: 'rgba(255,255,255,0.05)' }}
    >
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl text-blue-300">
        <i className={`fa-solid ${item.icon}`} />
      </div>
      <span className="text-white/80 font-semibold text-sm leading-snug">{item.label}</span>
    </motion.div>
  );
});

// ── SECTION LABEL ─────────────────────────────────────────────────────────
const SectionLabel = ({ text, dark = false }) => (
  <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-8 ${dark
    ? 'bg-white/5 border-white/10 text-blue-300'
    : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
    <span className={`w-2 h-2 rounded-full animate-pulse ${dark ? 'bg-blue-400' : 'bg-blue-600'}`} />
    <span className="text-xs font-black uppercase tracking-widest">{text}</span>
  </div>
);

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="about-page overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[650px] lg:h-[650px] flex flex-col lg:flex-row bg-black overflow-hidden"
        style={{ contain: 'layout style' }}
      >
        <DNAVideoBackground />

        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <motion.div key={i}
              className="absolute rounded-full"
              style={{ width: p.w, height: p.h, left: p.l, top: p.t, background: p.c }}
              animate={{ y: [-12, 12, -12], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: p.d }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 min-h-[400px] lg:h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 lg:pl-20 xl:pl-32 lg:pr-12 relative z-20 py-12 lg:py-0"
        >
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black tracking-[0.25em] uppercase backdrop-blur-md">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-purple-400" animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Empowering Medical Dreams
            </span>
          </motion.div>

          <div className="mb-3">
            <SplitTextReveal text="Trusted Educational" delay={0.15}
              className="text-[2.2rem] md:text-[3rem] lg:text-[3.2rem] font-extrabold text-white tracking-tight leading-[1.05] drop-shadow-2xl"
            />
          </div>
          <div className="mb-8">
            <SplitTextReveal text="Consultancy" delay={0.3}
              className="text-white text-[2.2rem] md:text-[3rem] lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.05]"
            />
            {' '}
            <span className="inline-block whitespace-nowrap">
              <CharReveal text="Guidance" delay={0.5}
                className="text-[2.2rem] text-white md:text-[3rem] lg:text-[3.2rem] font-extrabold tracking-tight leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              />
            </span>
          </div>

          <motion.div
            className="h-[2px] mb-8 rounded-full"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#a78bfa,#ec4899)', width: '100%', maxWidth: 280 }}
            initial={{ scaleX: 0, transformOrigin: 'center lg:left' }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl p-5 md:p-7 rounded-3xl shadow-2xl relative overflow-hidden group w-full max-w-xl"
            whileHover={{ borderColor: 'rgba(255,255,255,0.15)' }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right,rgba(59,130,246,0.4),transparent 70%)' }} />
            <p className="text-neutral-300 text-base lg:text-lg leading-relaxed mb-5 relative z-10" style={{ letterSpacing: '0.01em' }}>
              <strong className="text-white font-semibold">Zenova Groups</strong> is dedicated to guiding aspiring medical students to achieve their dreams of studying MBBS abroad. We specialize in admissions to top government medical universities in Uzbekistan, offering transparent, affordable, and reliable services. From counseling to visa, travel, and post-arrival support, we ensure a smooth journey for every student.
            </p>
            <motion.button
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-colors relative z-10"
              style={{ boxShadow: '0 0 20px rgba(37,99,235,0.3)' }}
              whileHover={{ boxShadow: '0 0 35px rgba(37,99,235,0.6)', scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
            >
              <span className="flex items-center gap-2">
                Get Counseling Now
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 h-[260px] lg:h-full relative z-10 flex items-center justify-center pointer-events-none"
        >
          <DNAHelixIcon />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="relative py-24 bg-[#020617] overflow-hidden" style={{ contain: 'layout style paint' }}>
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15),transparent_50%)]" />
          <motion.div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[120px]"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ background: 'radial-gradient(circle,#3b82f6 0%,transparent 70%)', willChange: 'transform' }}
          />
          <motion.div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
            animate={{ x: [0, -40, 0], y: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{ background: 'radial-gradient(circle,#8b5cf6 0%,transparent 70%)', willChange: 'transform' }}
          />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 0.5px,transparent 0.5px)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { target: 100, step: 10, label: 'Students Placed', icon: 'fa-user-graduate', suffix: '+' },
              { target: 15, step: 1, label: 'Partner Universities', icon: 'fa-building-columns', suffix: '+' },
              { target: 100, step: 20, label: 'Visa Success Rate', icon: 'fa-passport', suffix: '%' },
            ].map((stat, i) => <PremiumStatCard key={i} stat={stat} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#3b82f6 0%,transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.03] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#8b5cf6 0%,transparent 70%)' }} />

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-20 items-start">

            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:w-7/12"
            >
              <SectionLabel text="Established 2022" />

              <div className="mb-12">
                <h3 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 tracking-tight leading-tight">
                  Founded in <span className="text-blue-600">Vellore, Tamil Nadu</span>
                </h3>
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
                  <span className="text-neutral-900 font-bold">Zenova Groups Educational Consultants PVT LTD </span> was established with a clear vision: to make <span className="text-blue-600 italic">MBBS abroad accessible, affordable, and transparent</span> for every Indian student.
                </p>
              </div>

              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter">Our Story</h2>
                  <div className="h-px flex-grow bg-neutral-100" />
                </div>
                <div className="space-y-6">
                  {[
                    'Zenova Groups was founded to solve a critical challenge: students struggling with lack of proper guidance, high hidden costs, and unclear admission processes in medical education abroad.',
                    'Starting with a dedicated team, we focused on providing honest counseling and reliable support, helping students choose the right universities based on their unique goals and budget.',
                    'Today, our commitment to transparency and student success has helped us guide 100+ students toward their dream of becoming doctors.',
                  ].map((text, i) => (
                    <motion.p key={i}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="text-lg text-neutral-600 leading-relaxed font-medium"
                    >{text}</motion.p>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-black text-neutral-900 mb-8 tracking-tight">Our Premium Services</h2>
                <motion.ul
                  initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 list-none p-0"
                >
                  {['COUNSELING PROCESS', 'VISA ASSISTANCE', 'UNIVERSITY SELECTION', 'BANK LOAN ASSISTANCE', 'ADMISSION GUIDANCE', 'TRAVEL ASSISTANCE', 'DOCUMENTATION', 'AIRPORT PICKUP', 'ACCOMMODATION']
                    .map((s, i) => <ServiceItem key={i} service={s} idx={i} />)}
                </motion.ul>
                <p className="text-neutral-500 font-bold text-sm tracking-wide flex items-center gap-2">
                  <i className="fa-solid fa-circle-info text-blue-500" />
                  Complete end-to-end support for your medical journey.
                </p>
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="relative p-10 rounded-[2rem] overflow-hidden border border-blue-100 shadow-2xl shadow-blue-500/5"
                style={{ background: 'linear-gradient(135deg,#f8faff 0%,#ffffff 100%)' }}
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <i className="fa-solid fa-quote-right text-9xl text-blue-600" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm mb-6 flex items-center gap-3">
                    <span className="w-10 h-px bg-blue-600" />Our Belief
                  </h4>
                  <blockquote className="text-2xl md:text-3xl font-black text-neutral-900 leading-tight mb-6 italic tracking-tight">
                    "Your dream is our <span className="text-blue-600">responsibility.</span>"
                  </blockquote>
                  <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                    We believe every student deserves the right guidance and a clear path to achieve their medical career goals without confusion or hidden processes.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right image */}
            <div className="lg:w-5/12 sticky top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative rounded-[3rem] overflow-hidden border-[8px] border-white shadow-2xl">
                  <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                    <motion.img
                      src={serviceStudent} alt="Success Story"
                      className="w-full h-full object-cover"
                      width="600" height="750"
                      loading="lazy"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>

                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-8 right-8 px-6 py-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/20 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><i className="fa-solid fa-award" /></div>
                    <div>
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">WHO Recognised</div>
                      <div className="text-sm font-black text-neutral-900">Top Universities</div>
                    </div>
                  </motion.div>

                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-8 left-8 px-6 py-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/20 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white"><i className="fa-solid fa-users" /></div>
                    <div>
                      <div className="text-[10px] font-black text-green-600 uppercase tracking-widest">Success Rate</div>
                      <div className="text-sm font-black text-neutral-900">100+ Students</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#f8faff 0%,#eef2ff 50%,#f0f9ff 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 0.8px,transparent 0.8px)', backgroundSize: '28px 28px' }} />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SectionLabel text="Global Presence" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-5"
            >
              We Are Present in <span className="text-blue-600">8+ Countries</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-neutral-500 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              With on-ground support systems, local representatives, and dedicated student teams abroad — we ensure students feel secure and guided in every destination.
            </motion.p>
          </div>

          {/* Core Countries */}
          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-4 text-center"
            >
              ⭐ Core Destinations — High Student Volume
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 max-w-sm mx-auto">
              {['Uzbekistan', 'Kyrgyzstan'].map((c, i) => (
                <CountryCard key={c} country={c} isCore={true} idx={i} />
              ))}
            </div>
          </div>

          {/* Expanding */}
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.3em] text-neutral-400 mb-4 text-center"
            >
              🌐 Expanding Destinations
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Kazakhstan', 'Philippines', 'Tajikistan', 'Vietnam', 'Russia', 'Georgia'].map((c, i) => (
                <CountryCard key={c} country={c} isCore={false} idx={i + 2} />
              ))}
            </div>
          </div>

          {/* Support pillars */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'fa-location-dot', title: 'Local Representatives', desc: 'On-ground support in every destination country for quick assistance.' },
              { icon: 'fa-handshake', title: 'University Collaborations', desc: 'Strong direct partnerships — no middle agents, authentic admissions.' },
              { icon: 'fa-headset', title: 'Dedicated Student Teams', desc: 'Round-the-clock support teams ensuring students feel at home abroad.' },
            ].map((pillar, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-white border border-blue-100/60 shadow-lg shadow-blue-500/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-600/30">
                  <i className={`fa-solid ${pillar.icon}`} />
                </div>
                <h4 className="font-black text-neutral-900 text-base tracking-tight">{pillar.title}</h4>
                <p className="text-sm text-neutral-500 leading-relaxed font-medium">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIVERSITY NETWORK ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#2563eb 0%,transparent 70%)' }} />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            <div className="lg:w-5/12">
              <SectionLabel text="University Network" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-6 leading-tight"
              >
                Direct <span className="text-blue-600">University</span> Partnerships
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg text-neutral-600 leading-relaxed font-medium mb-10"
              >
                We maintain direct collaborations with leading government medical universities — no middlemen, authentic admission letters, faster processing, and genuine fee structures.
              </motion.p>

              {/* Recognition badges */}
              <div className="flex gap-4 flex-wrap">
                {[
                  { label: 'NMC Recognised', icon: 'fa-shield-halved', color: 'blue' },
                  { label: 'WHO Listed', icon: 'fa-earth-asia', color: 'green' },
                  { label: 'FMGE Eligible', icon: 'fa-stethoscope', color: 'purple' },
                ].map((badge, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm ${badge.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                      badge.color === 'green' ? 'bg-green-50 border-green-200 text-green-700' :
                        'bg-purple-50 border-purple-200 text-purple-700'
                      }`}
                  >
                    <i className={`fa-solid ${badge.icon} text-xs`} />
                    {badge.label}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="space-y-4">
                {[
                  'Tashkent State Medical University',
                  'Andijan State Medical University',
                  'Tashkent State Pharmaceutical & Medical University',
                  'Bukhara State Medical Institute',
                  'Gulistan State Medical University',
                ].map((name, i) => (
                  <UniversityCard key={i} name={name} idx={i} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                  <i className="fa-solid fa-circle-info text-sm" />
                </div>
                <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                  All partner universities are fully recognised by <strong className="text-blue-700">NMC (National Medical Commission)</strong> and listed by the <strong className="text-blue-700">World Health Organization</strong>, ensuring eligibility for FMGE/NEXT and global medical careers.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY BRAVO GROUPS ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)' }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#818cf8 0.6px,transparent 0.6px)', backgroundSize: '24px 24px' }} />
        <motion.div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 8, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle,#3b82f6,transparent)' }}
        />
        <motion.div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.15, 0.3] }} transition={{ duration: 10, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle,#8b5cf6,transparent)' }}
        />

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SectionLabel text="Why Choose Us" dark />
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-5"
            >
              What Makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Zenova Groups</span> Different
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-neutral-400 font-medium max-w-xl mx-auto leading-relaxed"
            >
              We focus on quality over quantity — ensuring each student receives individual attention and genuine support from start to graduation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              'Direct University Partnerships',
              '100% Transparent Process',
              'No Hidden Charges',
              'Free Career Counseling',
              'Personalized Student Guidance',
              'High Visa Success Rate',
              'Strong Parent Communication',
              'Safe & Trusted Destinations',
              'Dedicated Indian Student Support Abroad',
              'End-to-End Service (Start to Graduation)',
            ].map((item, i) => (
              <StrengthCard key={i} item={item} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FMGE / NEXT SECTION ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#8b5cf6 0%,transparent 70%)' }} />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="lg:w-5/12 flex flex-col items-center"
            >
              <div className="relative w-72 h-72 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(from 0deg,#2563eb,#8b5cf6,#ec4899,#2563eb)', opacity: 0.15 }} />
                <div className="absolute inset-4 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center gap-2">
                  <i className="fa-solid fa-stethoscope text-5xl text-blue-600" />
                  <span className="font-black text-2xl text-neutral-900">FMGE</span>
                  <span className="text-sm font-bold text-neutral-400">/ NEXT Ready</span>
                </div>
                {/* Orbiting badges */}
                {[
                  { label: 'NMC', angle: 0 },
                  { label: 'Exam Prep', angle: 120 },
                  { label: 'Licensing', angle: 240 },
                ].map(({ label, angle }) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 130;
                  const y = Math.sin(rad) * 130;
                  return (
                    <motion.div key={label}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      style={{ position: 'absolute', left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 14px)` }}
                      className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black shadow-lg whitespace-nowrap"
                    >
                      {label}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-10 p-6 rounded-2xl text-center border border-blue-100 bg-blue-50 max-w-xs"
              >
                <i className="fa-solid fa-bullseye text-blue-600 text-2xl mb-3 block" />
                <p className="text-sm font-bold text-blue-800 leading-relaxed">
                  Our goal is not just MBBS admission — but <span className="text-blue-600">successful medical licensing in India.</span>
                </p>
              </motion.div>
            </motion.div>

            <div className="lg:w-7/12">
              <SectionLabel text="FMGE / NEXT Focused" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-6 leading-tight"
              >
                Built for <span className="text-blue-600">Exam Success</span>,<br />Not Just Admission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg text-neutral-600 leading-relaxed font-medium mb-10"
              >
                We understand the critical importance of clearing FMGE / NEXT for Indian students returning from abroad. Our guidance is designed with this end-goal in mind.
              </motion.p>
              <div className="space-y-4">
                {[
                  'Suggesting academically strong universities known for high FMGE pass rates',
                  'Guiding students toward concept-based learning approaches from Day 1',
                  'Providing regular updates on latest NMC guidelines and policy changes',
                  'Supporting students in planning dedicated exam preparation strategies',
                ].map((step, i) => (
                  <StepCard key={i} step={step} idx={i} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TRUST & TRANSPARENCY ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0f172a 0%,#172554 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#60a5fa 0.6px,transparent 0.6px)', backgroundSize: '20px 20px' }} />

        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SectionLabel text="Trust & Legal" dark />
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-5"
            >
              Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Transparency</span> at Every Stage
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-neutral-400 font-medium max-w-xl mx-auto"
            >
              ZENOVA GROUPS EDUCATIONAL CONSULTANTS PRIVATE LIMITED operates with full legal compliance and ethical counseling practices — because parents deserve confidence and peace of mind.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {[
              { icon: 'fa-building', label: 'Registered Company' },
              { icon: 'fa-gavel', label: 'Legally Compliant Operations' },
              { icon: 'fa-file-contract', label: 'Clear Written Agreements' },
              { icon: 'fa-heart', label: 'Ethical Counseling' },
              { icon: 'fa-ban', label: 'No False Promises' },
            ].map((item, i) => <TrustBadge key={i} item={item} idx={i} />)}
          </div>

          {/* Why parents trust */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'fa-comments', title: 'Honest Advice', desc: 'We provide straightforward guidance without exaggerating or misleading students or parents about any aspect of studying abroad.' },
              { icon: 'fa-link', title: 'Stay Connected Always', desc: 'Our relationship does not end at admission. We stay in touch with students throughout their entire MBBS journey and beyond.' },
              { icon: 'fa-shield-halved', title: 'Student Safety Assured', desc: 'With on-ground representatives in every destination, we ensure every student feels safe, secure, and supported abroad.' },
            ].map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -5 }}
                className="flex flex-col gap-5 p-8 rounded-3xl border border-white/10 backdrop-blur-md"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center text-blue-400 text-xl">
                  <i className={`fa-solid ${card.icon}`} />
                </div>
                <h4 className="font-black text-white text-lg tracking-tight">{card.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION & FUTURE GOALS ── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle,#2563eb 0%,transparent 70%)' }} />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            <div className="lg:w-1/2">
              <SectionLabel text="Our Vision" />
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-6 leading-tight"
              >
                Building India's Most <span className="text-blue-600">Student-Centric</span> MBBS Consultancy
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg text-neutral-600 leading-relaxed font-medium mb-10"
              >
                Our vision is to become one of India's most trusted MBBS abroad consultancies — known for excellence in guidance, strong global partnerships, and high student success rates.
              </motion.p>

              {/* Future goals */}
              <div className="space-y-4">
                {[
                  { icon: 'fa-map-location-dot', goal: 'Expand to more countries with new on-ground support networks' },
                  { icon: 'fa-trophy', goal: 'Partner with top-ranked medical universities globally' },
                  { icon: 'fa-briefcase-medical', goal: 'Introduce guidance for other healthcare courses beyond MBBS' },
                  { icon: 'fa-earth-asia', goal: 'Build a global student support ecosystem for Indian medical graduates' },
                ].map(({ icon, goal }, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 to-white border border-blue-100/60"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      <i className={`fa-solid ${icon} text-sm`} />
                    </div>
                    <p className="text-neutral-700 font-semibold text-sm leading-relaxed pt-2">{goal}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative p-10 rounded-[2rem] border border-neutral-100 shadow-2xl shadow-neutral-200/60 overflow-hidden mb-8"
                style={{ background: 'linear-gradient(135deg,#f8faff,#ffffff)' }}
              >
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle,#2563eb,transparent)' }} />
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight mb-8 flex items-center gap-3">
                  <i className="fa-solid fa-chart-line text-blue-600" />
                  Our Milestones
                </h3>
                <div className="space-y-5">
                  {[
                    { icon: 'fa-user-graduate', label: 'Successfully guided 100+ students abroad', color: 'blue' },
                    { icon: 'fa-earth-asia', label: 'Built network across 8+ countries worldwide', color: 'indigo' },
                    { icon: 'fa-handshake', label: 'Established direct international university partnerships', color: 'purple' },
                    { icon: 'fa-building', label: 'Opened official registered office in Vellore, Tamil Nadu', color: 'blue' },
                    { icon: 'fa-star', label: 'Growing reputation through word-of-mouth trust', color: 'amber' },
                    { icon: 'fa-comments', label: 'Positive testimonials from students & parents nationwide', color: 'green' },
                  ].map(({ icon, label, color }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                          color === 'purple' ? 'bg-purple-50 text-purple-600' :
                            color === 'amber' ? 'bg-amber-50 text-amber-600' :
                              'bg-green-50 text-green-600'
                        }`}>
                        <i className={`fa-solid ${icon}`} />
                      </div>
                      <span className="text-sm font-semibold text-neutral-700 leading-snug">{label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1d4ed8 0%,#312e81 50%,#1e1b4b 100%)' }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 0.5px,transparent 0.5px)', backgroundSize: '24px 24px' }} />
        <motion.div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle,#60a5fa,transparent)' }}
        />

        <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-black tracking-[0.25em] uppercase backdrop-blur-md mb-8">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-blue-300" animate={{ scale: [1, 1.8, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              Start Your Journey Today
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
              Your Dream of Becoming<br />a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Doctor Awaits</span>
            </h2>

            <p className="text-xl text-blue-200 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
              With ZENOVA GROUPS, you get clear guidance, genuine universities, affordable solutions, complete support, and total peace of mind — from admission to graduation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 bg-white text-blue-700 rounded-full font-black text-base tracking-tight shadow-2xl"
                onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
              >
                <span className="flex items-center gap-2 justify-center">
                  <i className="fa-solid fa-phone" />
                  Get Free Counseling
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.6)' }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 bg-transparent text-white border-2 border-white/30 rounded-full font-black text-base tracking-tight"
                onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
              >
                <span className="flex items-center gap-2 justify-center">
                  <i className="fa-solid fa-arrow-right" />
                  Explore Universities
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}