import React, { useEffect, useRef, useState, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ── WORDS PULL UP ─────────────────────────────────────────────────────────
const WordsPullUp = memo(({ text, className = '', showAsterisk = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(' ');
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', marginRight: i < words.length - 1 ? '0.25em' : 0 }}
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
          )}
        </motion.span>
      ))}
    </span>
  );
});

// ── VIDEO HERO — CLS FIXES APPLIED ───────────────────────────────────────
// FIX 1: src had a leading space " /assets/service.mp4" → video never loaded → CLS
// FIX 2: AnimatePresence exit animation on skeleton → caused layout shift
// FIX 3: preload="auto" → "metadata" (faster first paint, less blocking)
// FIX 4: willChange:'opacity' + transform:'translateZ(0)' → GPU only, no reflow
const VideoHero = memo(() => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]"
      style={{ contain: 'layout style paint' }}
    >
      {/* Dark base always visible — prevents white flash */}
      <div className="absolute inset-0 bg-[#020c1b]" />

      {/* Skeleton shimmer — CSS only, no AnimatePresence (was causing shift) */}
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(90deg,transparent,rgba(6,182,212,0.3),transparent)',
              animation: 'sweep 1.8s ease-in-out infinite',
            }}
          />
        </div>
      )}

      <video
        autoPlay loop muted playsInline
        preload="metadata"
        onCanPlay={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          // opacity-only transition — GPU composited, zero layout impact
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
        src="/assets/service.mp4"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(6,182,212,0.08) 0%, transparent 60%)' }} />
    </div>
  );
});

// ── SERVICE CARD ──────────────────────────────────────────────────────────
const ServiceCard = memo(({ service, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative p-6 rounded-2xl bg-white border border-gray-100 overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.12),0 0 0 1px rgba(99,102,241,0.2)' : '0 2px 16px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.3s ease',
        contain: 'layout style paint',
      }}
    >
      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ background: `linear-gradient(135deg,rgba(${service.rgb},0.05),transparent 60%)` }}
        transition={{ duration: 0.3 }}
      />
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: `inset 0 0 0 1px rgba(${service.rgb},0.3)` }}
      />
      <motion.div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 shadow-md`}
        whileHover={{ scale: 1.12, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {service.icon}
      </motion.div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
      <motion.div
        className="mt-4 flex items-center gap-1 text-xs font-bold"
        style={{ color: `rgb(${service.rgb})` }}
        initial={{ opacity: 0, x: -8 }}
        animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.25 }}
      >
      </motion.div>
    </motion.div>
  );
});

// ── STAT BADGE ────────────────────────────────────────────────────────────
const StatBadge = memo(({ val, label, i }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
    whileHover={{ scale: 1.06, y: -3 }}
    className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md"
    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
  >
    <span className="text-sm font-bold text-white">{val}</span>
    <span className="text-[9px] text-white/50 font-semibold uppercase tracking-wider">{label}</span>
  </motion.div>
));

// ── SECTION HEADER ────────────────────────────────────────────────────────
const SectionHeader = memo(() => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center mb-16">
      <motion.span
        initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-black tracking-widest uppercase inline-block mb-5"
      >Our Core Services</motion.span>
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '100%', opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-gray-900 mb-6 leading-tight"
        >
          We don’t just send students abroad…<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">we take responsibility for their future.</span>
        </motion.h2>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-gray-500 text-lg max-w-2xl mx-auto"
      >From initial counseling to your first day at university — we manage it all.</motion.p>
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-6 h-1 w-24 rounded-full"
        style={{ background: 'linear-gradient(90deg,#3b82f6,#a78bfa)', transformOrigin: 'center' }}
      />
    </div>
  );
});

// ── SERVICES DATA ─────────────────────────────────────────────────────────
const servicesList = [
  { title: 'We Shape Your MBBS Journey', desc: 'From NEET score to final admission—we guide your complete path to becoming a doctor.', rgb: '59,130,246', color: 'from-blue-500 to-indigo-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
  { title: '🏫 Right University, Not Just Any University', desc: 'We carefully match you with the best MBBS universities based on your profile, goals, and budget.', rgb: '168,85,247', color: 'from-purple-500 to-pink-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { title: '🌍 Best Country Selection Strategy', desc: 'We help you choose the safest, most affordable, and most suitable country for your medical studies.', rgb: '20,184,166', color: 'from-teal-500 to-cyan-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> },
  { title: '📝 Zero Stress Admission Process', desc: 'We handle the entire admission process so you can focus only on your dream.', rgb: '16,185,129', color: 'from-emerald-500 to-teal-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> },
  { title: '📄 Perfect Documentation Handling', desc: 'Every document is checked, verified, and processed to avoid rejection or delays.', rgb: '249,115,22', color: 'from-orange-500 to-amber-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg> },
  { title: '💰 Clear Budget Planning', desc: 'We explain total cost transparently—no confusion, no hidden surprises.', rgb: '234,179,8', color: 'from-yellow-500 to-orange-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg> },
  { title: '🛂 Strong Visa Support System', desc: 'We guide you step-by-step to increase your chances of visa approval.', rgb: '244,63,94', color: 'from-rose-500 to-pink-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="5" width="22" height="14" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
  { title: '✈️ Smooth Departure Experience', desc: 'From flight planning to travel preparation—we make your journey easy and safe.', rgb: '99,102,241', color: 'from-indigo-500 to-blue-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5L5.3 6.7c-1.1-.2-2.1.3-2.4 1.3c-.3 1 1.2 2.3 2.1 3l6.5 4.5l-4.5 4.5c-.7.7-1 1.7-.7 2.6c.3.9 1.2 1.4 2.1 1.4c.5 0 1-.2 1.4-.6l4.5-4.5l4.5 6.5c.7.9 2 2.4 3 2.1c1-.3 1.5-1.3 1.3-2.4z" /></svg> },
  { title: '🏠 Comfortable Stay Arrangement', desc: 'We ensure safe and student-friendly accommodation abroad.', rgb: '14,165,233', color: 'from-sky-500 to-blue-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { title: '🚖 Safe Landing Support', desc: 'Our support continues even after you land in a new country.', rgb: '34,197,94', color: 'from-green-500 to-emerald-500', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="10" width="22" height="9" rx="2" /><path d="M7 10l3-4h4l3 4" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="19" r="2" /></svg> },
  { title: '🌐 You Are Never Alone Abroad', desc: 'Local support teams help you whenever you need assistance.', rgb: '99,102,241', color: 'from-indigo-600 to-purple-600', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
  { title: '📚 Future Doctor Support System', desc: 'We guide you even after MBBS for FMGE / NExT preparation pathways.', rgb: '217,70,239', color: 'from-fuchsia-500 to-purple-600', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg> },
  { title: '👨‍👩‍👧 Parents Stay Fully Updated', desc: 'Regular communication so parents feel confident and stress-free.', rgb: '59,130,246', color: 'from-blue-600 to-indigo-700', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg> },
];

// Fixed particles — no Math.random (CLS fix)
const HERO_PARTICLES = [
  { w: 3, h: 3, l: '12%', t: '20%', c: 'rgba(6,182,212,0.7)', d: 0 },
  { w: 4, h: 4, l: '26%', t: '40%', c: 'rgba(167,139,250,0.7)', d: 0.4 },
  { w: 3, h: 3, l: '40%', t: '22%', c: 'rgba(6,182,212,0.7)', d: 1.2 },
  { w: 5, h: 5, l: '54%', t: '60%', c: 'rgba(167,139,250,0.7)', d: 0.8 },
  { w: 3, h: 3, l: '68%', t: '30%', c: 'rgba(6,182,212,0.7)', d: 0.2 },
  { w: 4, h: 4, l: '82%', t: '50%', c: 'rgba(167,139,250,0.7)', d: 1.6 },
];

// ── MAIN ──────────────────────────────────────────────────────────────────
const Services = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#020c1b] overflow-hidden">
      <style>{`
        @keyframes sweep {
          0%  { transform: translateX(-100%); }
          100%{ transform: translateX(100%);  }
        }
      `}</style>

      {/* ── HERO ── */}
      <section
        className="relative w-full h-screen overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]"
        style={{ contain: 'layout style' }}
      >
        <VideoHero />

        {/* Fixed particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
          {HERO_PARTICLES.map((p, i) => (
            <motion.div key={i}
              className="absolute rounded-full"
              style={{ width: p.w, height: p.h, left: p.l, top: p.t, background: p.c }}
              animate={{ y: [-10, 10, -10], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: p.d }}
            />
          ))}
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 sm:px-10 md:px-20 pb-12 md:pb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-md">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              🌟 WHAT WE DO
            </span>
          </motion.div>

          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-bold leading-[0.9] tracking-[-0.05em] text-white">
                <div className="text-[14vw] sm:text-[12vw] lg:text-[9vw] xl:text-[8vw]">
                  <WordsPullUp text="Turning Your" />
                </div>
                <div className="text-[12vw] sm:text-[10vw] lg:text-[8vw] xl:text-[7.5vw] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  <WordsPullUp text="MBBS Dream Into Reality" showAsterisk />
                </div>
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 md:pb-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-md"
              >
                From counseling to accommodation — we handle every step of your MBBS journey abroad so you can focus entirely on becoming a doctor.
              </motion.p>

              <div className="flex flex-wrap gap-3">
                {[
                  { val: '100+', label: 'Students Placed' },
                  { val: '100%', label: 'Visa Success' },
                  { val: '15+', label: 'Partner Universities' },
                ].map((s, i) => <StatBadge key={i} {...s} i={i} />)}
              </div>

              <motion.button
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(6,182,212,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-3 self-start rounded-full bg-cyan-600 py-1 pl-6 pr-1 text-sm font-bold text-white hover:bg-cyan-500 shadow-xl shadow-cyan-500/20 transition-colors"
                onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
              >
                Book Free Counseling
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-5 w-5 text-cyan-600" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 right-10 hidden md:flex flex-col items-center gap-3 z-20"
        >
          <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</span>
          <motion.div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#f8faff 0%,#f0f4ff 50%,#faf8ff 100%)' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse,#6366f1 0%,transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {servicesList.map((service, idx) => (
              <ServiceCard key={idx} service={service} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center,rgba(6,182,212,0.12) 0%,transparent 65%)' }} />
        {[0, 1, 2].map((i) => (
          <motion.div key={i}
            className="absolute h-px w-full opacity-10 pointer-events-none"
            style={{ top: `${25 + i * 25}%`, background: 'linear-gradient(90deg,transparent,rgba(6,182,212,0.6),transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 1.2, ease: 'linear' }}
          />
        ))}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to Start Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                MBBS Journey?
              </span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Book a free counseling session today. 100% admission and visa success guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6,182,212,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
                className="px-10 py-4 rounded-full font-bold text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg,#06b6d4,#2563eb)' }}
              >Book Free Counseling</motion.button>
              <motion.button
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.location.href = '/contact'}
                className="px-10 py-4 rounded-full font-bold text-white backdrop-blur-md"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
              >Contact Us</motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;