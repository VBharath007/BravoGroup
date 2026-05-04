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
            className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl p-5 md:p-7 mb-35 rounded-3xl shadow-2xl relative overflow-hidden group w-full max-w-xl"
            whileHover={{ borderColor: 'rgba(255,255,255,0.15)' }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 opacity-30 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right,rgba(59,130,246,0.4),transparent 70%)' }} />
            <div className="text-neutral-300 text-sm lg:text-base leading-relaxed mb-6 relative z-10 space-y-4" style={{ letterSpacing: '0.01em' }}>
              <p>
                <strong className="text-white font-semibold">Zenova Groups Educational Consultants PVT LTD</strong> is a professionally managed educational consultancy company, established in 2022 in Vellore, Tamil Nadu, India, with a strong commitment to helping Indian students achieve their dream of becoming doctors through MBBS abroad programs.
              </p>
              <p>
                In today’s competitive environment—where medical seats in India are limited and expensive—Zenova GROUPS stands as a <span className="text-blue-400 italic">trusted bridge between students and globally recognized medical universities</span>.
              </p>
              <p>
                With a foundation built on <span className="text-blue-400 italic">transparency, ethics, and student success</span>, we have already guided <strong className="text-white">100+ students</strong> toward their medical careers across multiple countries.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-blue-900/30 border border-blue-500/20 inline-block">
                <span className="text-white font-medium italic tracking-wide">✨ "We don’t just guide students—we shape future doctors."</span>
              </div>
            </div>

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
                  <span className="text-neutral-900 font-bold">Zenova Groups Educational Consultants PVT LTD</span> was established with a clear vision: to make <span className="text-blue-600 italic">MBBS abroad accessible, affordable, and transparent</span> for every Indian student.
                </p>
              </div>

              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter">Our Story</h2>
                  <div className="h-px flex-grow bg-neutral-100" />
                </div>
                <div className="space-y-6">
                  {[
                    'The idea behind Zenova GROUPS was born from a real problem faced by thousands of Indian students every year.',
                    'Recognizing this gap, Zenova GROUPS was founded with a mission to provide: Honest guidance, Affordable options, Verified universities, and Complete clarity in process.',
                    'Starting with a small group of students, we focused on building trust rather than just business. Today, that trust has grown into a strong network of students, parents, and international partners.',
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

      {/* ── OUR JOURNEY & PURPOSE ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <SectionLabel text="Our Journey & Purpose" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tighter mb-6 leading-tight max-w-4xl mx-auto"
            >
              The idea behind <span className="text-blue-600">Zenova GROUPS</span> was born from a real problem faced by thousands of Indian students every year.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Col - Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="p-8 md:p-10 rounded-[2rem] bg-red-50/50 border border-red-100"
            >
              <h3 className="text-2xl font-black text-red-500 mb-8 flex items-center gap-3">
                <i className="fa-solid fa-ban text-2xl" /> The Challenges Students Face
              </h3>
              <ul className="space-y-5">
                {[
                  'Extremely high donation fees in private medical colleges',
                  'Limited government MBBS seats in India',
                  'Lack of accurate guidance for studying abroad',
                  'Fear of fraud consultancies and hidden charges',
                  'Confusion about NMC rules and university recognition'
                ].map((challenge, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0 shadow-sm">
                      <i className="fa-solid fa-xmark text-xs" />
                    </div>
                    <span className="text-lg text-neutral-700 font-medium leading-snug">{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Col - Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 md:p-10 rounded-[2rem] bg-green-50/50 border border-green-100"
            >
              <h3 className="text-2xl font-black text-green-600 mb-4 flex items-center gap-3">
                <i className="fa-solid fa-check-double text-2xl" /> Recognizing this gap
              </h3>
              <p className="text-lg text-neutral-600 mb-8 font-medium">
                Zenova GROUPS was founded with a mission to provide:
              </p>
              <ul className="space-y-6 mb-8">
                {[
                  'Honest guidance',
                  'Affordable options',
                  'Verified universities',
                  'Complete clarity in process'
                ].map((solution, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-600 shadow-sm flex-shrink-0">
                      <i className="fa-solid fa-check text-sm" />
                    </div>
                    <span className="text-xl font-bold text-neutral-800">{solution}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 p-8 md:p-10 rounded-3xl bg-blue-50 border border-blue-100 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right,#2563eb,transparent)' }} />
            <p className="text-xl md:text-2xl text-blue-900 font-medium leading-relaxed italic relative z-10">
              Starting with a small group of students, we focused on <strong className="font-black text-blue-700">building trust rather than just business</strong>. Today, that trust has grown into a strong network of students, parents, and international partners.
            </p>
          </motion.div>

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
              Our Global Presence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed"
            >
              We provide MBBS admissions in multiple countries with <span className="italic text-blue-600 font-bold">on-ground support systems</span>.
            </motion.p>
          </div>

          {/* Core Countries */}
          <div className="mb-10">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4 text-center flex justify-center items-center gap-2"
            >
              <span className="text-xl">🌟</span> Core Countries (High Student Volume)
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
              className="text-sm font-black uppercase tracking-[0.2em] text-neutral-500 mb-4 text-center flex justify-center items-center gap-2"
            >
              <span className="text-xl">🌐</span> Expanding Destinations
            </motion.p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {['Kazakhstan', 'Philippines', 'Tajikistan', 'Vietnam', 'Russia', 'Georgia'].map((c, i) => (
                <CountryCard key={c} country={c} isCore={false} idx={i + 2} />
              ))}
            </div>
          </div>

          {/* Support pillars */}
          <div className="mt-16 text-center">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-2xl font-black text-neutral-800 mb-8"
            >
              Our presence includes:
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'fa-earth-asia', title: 'Local representatives abroad' },
                { icon: 'fa-handshake', title: 'Strong university collaborations' },
                { icon: 'fa-user-graduate', title: 'Dedicated student support teams' },
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
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 inline-block shadow-sm"
            >
              <p className="text-lg md:text-xl text-blue-900 font-medium leading-relaxed">
                This ensures students feel <span className="italic text-blue-700 font-black">secure, guided, and comfortable</span> even in a foreign country.
              </p>
            </motion.div>
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
                Our <span className="text-blue-600">University</span> Network
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg text-neutral-600 leading-relaxed font-medium mb-10"
              >
                We proudly maintain <span className="italic text-blue-600 font-bold">direct partnerships</span> with leading government medical universities, including:
              </motion.p>

              <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 mb-5 flex items-center gap-2">
                  <span>✔️</span> Why This Matters:
                </h3>
                <ul className="space-y-4">
                  {[
                    'No middle agents',
                    'Authentic admission letters',
                    'Faster processing',
                    'Genuine fee structure'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                        <i className="fa-solid fa-check text-xs" />
                      </div>
                      <span className="font-semibold text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recognition badges */}
              <div className="mb-8 lg:mb-0">
                <p className="text-sm font-bold text-neutral-500 mb-4">All universities are recognized by:</p>
                <div className="flex gap-4 flex-col sm:flex-row flex-wrap">
                  {[
                    { label: 'NMC (National Medical Commission)', icon: 'fa-shield-halved', color: 'blue' },
                    { label: 'WHO (World Health Organization)', icon: 'fa-earth-asia', color: 'green' },
                  ].map((badge, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm ${badge.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-green-50 border-green-200 text-green-700'}`}
                    >
                      <i className={`fa-solid ${badge.icon} text-sm`} />
                      {badge.label}
                    </motion.div>
                  ))}
                </div>
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
                className="mt-8 p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-start sm:items-center gap-5 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-500/20">
                  <i className="fa-solid fa-user-doctor text-lg" />
                </div>
                <p className="text-lg md:text-xl text-blue-900 font-medium leading-relaxed">
                  Ensuring eligibility for <span className="italic text-blue-700 font-black">FMGE/NEXT and global medical careers</span>.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT WE DO (SERVICE MODEL) ── */}
      <section className="py-28 bg-neutral-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container relative z-10 mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SectionLabel text="Our Complete Service Model" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-6 leading-tight"
            >
              What We Do
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-neutral-600 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              At Zenova GROUPS, we follow a <span className="italic text-blue-600 font-black">360° student support system</span>.
            </motion.p>
          </div>

          <motion.h3
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-2xl font-black text-center text-neutral-800 mb-12 flex items-center justify-center gap-3"
          >
            <span className="text-3xl">🧭</span> Step-by-Step Support:
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {[
              { num: 1, title: 'Career Counseling', items: ['Free one-on-one consultation', 'Country & university comparison', 'Budget-based planning'] },
              { num: 2, title: 'Admission Assistance', items: ['University selection', 'Application processing', 'Admission confirmation'] },
              { num: 3, title: 'Documentation & Visa', items: ['Complete document verification', 'Visa application support', 'Interview preparation'] },
              { num: 4, title: 'Financial & Travel Support', items: ['Education loan guidance', 'Forex assistance', 'Flight ticket booking'] },
              { num: 5, title: 'Pre-Departure Preparation', items: ['Orientation sessions', 'Packing guidance', 'Cultural awareness'] },
              { num: 6, title: 'Post-Arrival Support', items: ['Airport pickup', 'Hostel allocation', 'Local SIM & basic setup'] },
              { num: 7, title: 'Continuous Support Till Graduation', items: ['Academic guidance', 'University coordination', 'Emergency support'], colSpan: 'lg:col-span-2 xl:col-span-1' },
            ].map((step, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`flex flex-col p-8 rounded-3xl bg-white border border-neutral-100 shadow-xl shadow-neutral-200/40 relative overflow-hidden ${step.colSpan || ''}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none" style={{ background: 'radial-gradient(circle at top right,#2563eb,transparent)' }} />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-lg shadow-md flex-shrink-0">
                    {step.num}
                  </div>
                  <h4 className="font-black text-neutral-900 text-lg leading-tight">{step.title}</h4>
                </div>
                <ul className="space-y-3 relative z-10 flex-grow">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-neutral-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
            className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-700 text-center relative overflow-hidden shadow-2xl shadow-blue-900/20 max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center,white 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed relative z-10 flex flex-col md:flex-row items-center justify-center gap-3">
              <span className="text-3xl mb-2 md:mb-0">💡</span>
              <span>We stay connected with students <span className="italic font-black text-blue-200">throughout their MBBS journey</span>, not just admission</span>
            </p>
          </motion.div>
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
              className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8"
            >
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Zenova GROUPS</span> is Different
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-2xl font-black text-white flex items-center justify-center gap-3"
            >
              <span className="text-3xl">🔥</span> Our Core Strengths
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-lg md:text-xl text-neutral-300 font-medium max-w-3xl mx-auto leading-relaxed italic border border-white/10 bg-white/5 py-5 px-8 rounded-full backdrop-blur-sm shadow-xl">
              We focus on <span className="font-bold text-white">quality over quantity</span>, ensuring each student gets <strong className="text-blue-400 font-black">individual attention</strong>.
            </p>
          </motion.div>
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
                <span className="text-3xl mb-3 block">🎯</span>
                <p className="text-sm font-bold text-blue-800 leading-relaxed">
                  Our goal is not just MBBS admission—but <span className="italic text-blue-600 font-black">successful medical licensing in India</span>.
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
                FMGE / NEXT Focused Guidance
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg text-neutral-600 leading-relaxed font-medium mb-8"
              >
                We understand the importance of clearing <span className="italic font-bold">FMGE (Foreign Medical Graduate Examination)</span> / NEXT for Indian students.
              </motion.p>

              <div className="mb-6">
                <h3 className="text-xl font-black text-neutral-900 mb-5 flex items-center gap-3">
                  <span className="text-2xl">📚</span> Our Approach:
                </h3>
                <div className="space-y-4">
                  {[
                    'Suggesting academically strong universities',
                    'Guiding students toward concept-based learning',
                    'Providing updates on NMC guidelines',
                    'Supporting students in planning exam preparation strategies',
                  ].map((step, i) => (
                    <StepCard key={i} step={step} idx={i} />
                  ))}
                </div>
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
              className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-5 flex items-center justify-center gap-3"
            >
              <span className="text-3xl">🛡️</span> Trust, Legal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Transparency</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {[
              { icon: 'fa-building', label: 'Registered Company: Zenova GROUPS PRIVATE LIMITED' },
              { icon: 'fa-gavel', label: 'Legally compliant operations' },
              { icon: 'fa-file-contract', label: 'Clear written agreements' },
              { icon: 'fa-heart', label: 'Ethical counseling practices' },
              { icon: 'fa-ban', label: 'No false promises' },
            ].map((item, i) => <TrustBadge key={i} item={item} idx={i} />)}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-16"
          >
            <p className="text-lg md:text-xl text-neutral-300 font-medium max-w-3xl mx-auto leading-relaxed border border-white/10 bg-white/5 py-5 px-8 rounded-full backdrop-blur-sm shadow-xl">
              We maintain <span className="italic font-bold text-white">complete transparency at every stage</span>, ensuring parents feel confident and secure.
            </p>
          </motion.div>

          {/* Why Students & Parents Trust Us */}
          <div className="pt-16 border-t border-white/10">
            <div className="text-center mb-12">
              <motion.h3
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl font-black text-white tracking-tight mb-5"
              >
                Why Students & Parents Trust Us
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-lg text-neutral-400 font-medium max-w-xl mx-auto"
              >
                Because we believe in <span className="italic font-bold text-white">responsibility, not just consultancy</span>.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center shadow-2xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-6 border border-blue-500/20 shadow-inner">
                  <i className="fa-solid fa-user-graduate" />
                </div>
                <h4 className="text-xl font-bold text-white mb-6">We treat every student as:</h4>
                <ul className="space-y-4 text-left w-full max-w-xs mx-auto">
                  {[
                    'A future doctor',
                    'A family responsibility',
                    'A long-term relationship'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-neutral-300 font-medium">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-check text-blue-400 text-[10px]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center shadow-2xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-6 border border-cyan-500/20 shadow-inner">
                  <i className="fa-solid fa-shield-heart" />
                </div>
                <h4 className="text-xl font-bold text-white mb-6">Parents trust us because:</h4>
                <ul className="space-y-4 text-left w-full max-w-xs mx-auto">
                  {[
                    'We provide honest advice',
                    'We stay connected even after admission',
                    'We ensure student safety abroad'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-neutral-300 font-medium">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-check text-cyan-400 text-[10px]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
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
                className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-6 leading-tight flex items-center gap-3"
              >
                <span className="text-4xl">🎯</span> Our Vision
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-10"
              >
                <p className="text-lg text-neutral-600 leading-relaxed font-medium mb-5">
                  To become one of India’s <span className="italic font-bold text-blue-600">most trusted and student-centric MBBS abroad consultancies</span>, known for:
                </p>
                <ul className="space-y-3 pl-2">
                  {[
                    'Excellence in guidance',
                    'Strong global partnerships',
                    'High student success rate'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                      <span className="text-neutral-700 font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Future goals */}
              <div className="mb-6 lg:mb-0">
                <h3 className="text-2xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🚀</span> Future Goals:
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: 'fa-map-location-dot', goal: 'Expand to more countries' },
                    { icon: 'fa-trophy', goal: 'Partner with top-ranked universities' },
                    { icon: 'fa-briefcase-medical', goal: 'Introduce guidance for other healthcare courses' },
                    { icon: 'fa-earth-asia', goal: 'Build a global student support ecosystem' },
                  ].map(({ icon, goal }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50/60 to-white border border-blue-100/60 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                        <i className={`fa-solid ${icon} text-sm`} />
                      </div>
                      <p className="text-neutral-800 font-bold text-[15px] leading-relaxed pt-2.5">{goal}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative p-8 md:p-10 rounded-[2rem] border border-neutral-100 shadow-2xl shadow-neutral-200/60 overflow-hidden mb-8"
                style={{ background: 'linear-gradient(135deg,#f8faff,#ffffff)' }}
              >
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle,#2563eb,transparent)' }} />
                <h3 className="text-2xl font-black text-neutral-900 tracking-tight mb-8 flex items-center gap-3">
                  <span className="text-3xl">📊</span> Our Achievements & Milestones
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: 'fa-user-graduate', label: 'Successfully guided 100+ students abroad', color: 'blue' },
                    { icon: 'fa-earth-asia', label: 'Built network in 8+ countries', color: 'indigo' },
                    { icon: 'fa-handshake', label: 'Established direct international partnerships', color: 'purple' },
                    { icon: 'fa-building', label: 'Opened official office in Vellore, Tamil Nadu', color: 'blue' },
                    { icon: 'fa-arrow-trend-up', label: 'Growing reputation through word-of-mouth trust', color: 'amber' },
                    { icon: 'fa-comments', label: 'Positive testimonials from students & parents', color: 'green' },
                  ].map(({ icon, label, color }, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow-sm ${color === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                        color === 'indigo' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                          color === 'purple' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                            color === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                              'bg-green-50 text-green-600 border border-green-100'
                        }`}>
                        <i className={`fa-solid ${icon}`} />
                      </div>
                      <span className="text-sm md:text-[15px] font-bold text-neutral-800 leading-snug">{label}</span>
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
            className="mb-16 pb-16 border-b border-white/10"
          >
            <h3 className="text-3xl font-black text-white mb-6">Our Promise</h3>
            <p className="text-xl text-blue-200 font-medium mb-8">With Zenova GROUPS, you will get:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Clear guidance',
                'Genuine universities',
                'Affordable solutions',
                'Complete support',
                'Peace of mind'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                  <i className="fa-solid fa-check text-blue-400" />
                  <span className="text-white font-semibold text-lg">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-8 leading-tight flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-5xl md:text-6xl">📞</span>
              <span>Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Medical Journey</span> With Us</span>
            </h2>

            <p className="text-xl text-blue-200 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
              Your dream of becoming a doctor deserves the <span className="italic font-bold text-white">right guidance and the right partner</span>.
            </p>

            <div className="mb-12 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 max-w-3xl mx-auto shadow-2xl backdrop-blur-sm">
              <p className="text-lg md:text-xl text-white font-medium flex flex-col sm:flex-row items-center justify-center gap-4 leading-relaxed">
                <span className="text-3xl">👉</span>
                <span>Choose <strong className="font-black text-cyan-300 tracking-wide">Zenova GROUPS PRIVATE LIMITED</strong> and take your first step toward a successful medical career.</span>
              </p>
            </div>

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