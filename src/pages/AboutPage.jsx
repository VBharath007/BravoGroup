import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import './AboutPage.css';

const serviceStudent = '/assets/service_student.webp';

// ── FIXED PARTICLES — no Math.random() prevents hydration CLS ────────────
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

// ── DNA VIDEO — contain prevents reflow leaking out ───────────────────────
const DNAVideoBackground = memo(() => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ contain: 'layout style paint' }}>
      {/* Always-visible dark base — no layout shift */}
      <div className="absolute inset-0 bg-[#04080F]" />

      {/* Skeleton shimmer — only while video loads */}
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 opacity-20" style={{
            background: 'linear-gradient(90deg,transparent,rgba(59,130,246,0.2),transparent)',
            animation: 'skeletonSweep 1.8s ease-in-out infinite',
          }} />
        </div>
      )}

      {/* Video — GPU layer, willChange:opacity prevents layout recalc */}
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

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  /*
    CLS FIXES (CLS was 1.00):
    1. REMOVED heroReady + skeleton swap → content renders immediately
    2. REMOVED useScroll parallax (heroY/heroScale) → no continuous reflow
    3. REMOVED Math.random() particles → fixed PARTICLES array above
    4. Added contain:'layout style paint' on heavy sections
    5. Video: willChange:'opacity' + transform:'translateZ(0)' → GPU only
    6. Image: explicit width/height attrs → browser reserves space upfront
  */
  return (
    <div className="about-page overflow-x-hidden">


      {/* ── HERO ── */}
      <section
        className="relative w-full min-h-[650px] lg:h-[650px] flex flex-col lg:flex-row bg-black overflow-hidden"
        style={{ contain: 'layout style' }}
      >

        <DNAVideoBackground />

        {/* Particles — fixed positions, no layout impact */}
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

        {/* Left — renders immediately, no skeleton */}
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
              <strong className="text-white font-semibold">Bravo Groups</strong> is dedicated to guiding aspiring medical students to achieve their dreams of studying MBBS abroad. We specialize in admissions to top government medical universities in Uzbekistan, offering transparent, affordable, and reliable services. From counseling to visa, travel, and post-arrival support, we ensure a smooth journey for every student.
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

        {/* Right — DNA helix */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 h-[260px] lg:h-full relative z-10 flex items-center justify-center pointer-events-none"
        >
          <DNAHelixIcon />
        </motion.div>


        {/* Scroll hint */}
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
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-sm font-bold text-blue-700 uppercase tracking-widest">Established 2022</span>
              </div>

              <div className="mb-12">
                <h3 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 tracking-tight leading-tight">
                  Founded in <span className="text-blue-600">Vellore, Tamil Nadu</span>
                </h3>
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
                  <span className="text-neutral-900 font-bold">BRAVO GROUPS PRIVATE LIMITED</span> was established with a clear vision: to make <span className="text-blue-600 italic">MBBS abroad accessible, affordable, and transparent</span> for every Indian student.
                </p>
              </div>

              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter">Our Story</h2>
                  <div className="h-px flex-grow bg-neutral-100" />
                </div>
                <div className="space-y-6">
                  {[
                    'BRAVO GROUPS was founded to solve a critical challenge: students struggling with lack of proper guidance, high hidden costs, and unclear admission processes in medical education abroad.',
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
                  {/* aspectRatio reserves space before image loads → prevents CLS */}
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
    </div>
  );
}