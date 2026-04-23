import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Stethoscope, Globe2, ShieldCheck, ArrowRight, MapPin, HeartPulse, Wind, BookOpen } from 'lucide-react';
import AdmissionProtocol from '../../components/ui/AdmissionProtocol';
import LazyImage from '../../components/Lazyimage';


import Footer from '../../components/Footer';


// Assets are now served from the public/assets directory
const bgImg = '/assets/samarkand1.webp';
const campus1 = '/assets/samarkandnet3.webp';
const campus2 = '/assets/samarkand3.webp';
const campus3 = '/assets/samarkand4.webp';
const campus4 = '/assets/samarkand2.webp';
const campus7 = '/assets/samarkand-college.webp';


// ── Silk Road Particles ──────────────────────────────────────────────────────
function SilkParticles() {
  const ref = useRef();
  const count = 1500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.03;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.01) * 0.2;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#FFD700" size={0.025} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

// ── Counter ──────────────────────────────────────────────────────────────────
function Counter({ target, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(t);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-center p-8 rounded-2xl bg-[#0d1a0a]/60 border border-[#22c55e]/20 hover:border-[#22c55e]/50 transition-all">
      <div className="text-5xl font-black text-[#22c55e] mb-2">{count.toLocaleString()}{suffix}</div>
      <div className="text-[#a0c4a0] text-sm uppercase tracking-widest font-semibold">{label}</div>
    </div>
  );
}

const SamarkandStateMedicalUniversity = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 180]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.08]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  // 2026 Section Logic
  const containerRef = useRef(null);
  const { scrollYProgress: sectionScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const sectionY1 = useTransform(sectionScroll, [0, 1], [0, -100]);
  const sectionY2 = useTransform(sectionScroll, [0, 1], [0, 100]);

  useEffect(() => {
    // AOS initialized globally
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, []);

  return (
    <div className="bg-[#050e05] text-white overflow-x-hidden font-sans selection:bg-[#22c55e]/30">

      {/* ═══ SECTION 1: EMERALD SILK ROAD HERO ══════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" onMouseMove={handleMouseMove}>
        {/* Three.js Gold particles */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <SilkParticles />
          </Canvas>
        </div>

        {/* Parallax BG */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <LazyImage src={bgImg} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050e05]/60 via-[#050e05]/55 to-[#050e05]" />
          {/* Emerald gradient pulse overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(34,197,94,0.12)_0%,transparent_60%)]" />
        </motion.div>

        {/* Mouse glow */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(circle 500px at ${mouse.x}% ${mouse.y}%, rgba(34,197,94,0.07) 0%, transparent 70%)` }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-28">
          {/* Animated badge */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#22c55e]/40 bg-[#22c55e]/10 backdrop-blur-md mb-8">
            <MapPin className="w-4 h-4 text-[#22c55e]" />
            <span className="text-[#22c55e] text-sm font-bold uppercase tracking-[0.25em]">Samarkand – The Silk Road Capital</span>
          </motion.div>

          {/* Title with stagger — RIGHT-to-LEFT reveal */}
          <div className="mb-8 overflow-hidden">
            {[
              { text: 'Samarkand State', color: 'white' },
              { text: 'Medical', color: '#22c55e' },
              { text: 'University', color: 'white' },
            ].map(({ text, color }, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
                  style={{ color }}
                >
                  {text}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }}
            className="text-xl text-[#a0c4a0] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Where ancient Silk Road wisdom meets 21st-century medicine. The most internationally diverse medical campus in all of Central Asia.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Samarkand State Medical University' }))}>
              <motion.button whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(34,197,94,0.45)' }} whileTap={{ scale: 0.97 }}
                className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white font-bold text-lg uppercase tracking-widest overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.35)]">
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative flex items-center gap-3">Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
            </button>


          </motion.div>

        </div>
      </section>

      {/* ═══ SECTION 2: 2026 HYPER-MINIMALIST STORY ═════════════════════════ */}
      <section ref={containerRef} className="relative py-32 bg-[#050e05] overflow-hidden selection:bg-[#22c55e] selection:text-black">
        {/* Background Decorative Mesh - 2026 Gradient Style */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#22c55e]/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Modern Asymmetrical Image Composition */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[600px]">
            <motion.div style={{ y: sectionY1 }} className="relative z-20 w-4/5 aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 ring-1 ring-white/10 shadow-2xl">
              <LazyImage src={bgImg} alt="SSMU Main" className="w-full h-full object-cover scale-105" />
            </motion.div>

            <motion.div
              style={{ y: sectionY2 }}
              className="absolute -right-4 bottom-12 z-30 w-1/2 aspect-square rounded-[2rem] overflow-hidden border-4 border-[#050e05] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <LazyImage src={campus7} alt="Detail" className="w-full h-full object-cover" />
            </motion.div>

            {/* Floating Stats Badge */}

          </div>

          {/* Right Side: High-Contrast Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="h-[1px] w-8 bg-[#22c55e]" />
                <span className="text-[#22c55e] text-sm font-bold tracking-[0.2em] uppercase">
                  First Medical University in Uzbekistan
                </span>
              </motion.div>

              <h2 className="text-3xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
                "Training the hands that will heal  <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#4ade80]">
                  the world "
                </span>
              </h2>
            </div>

            <div className="space-y-6 max-w-xl">
              <p className="text-white/70 text-lg font-light leading-relaxed">
                Samarkand State Medical University carries a distinction no other institution can claim: <span className="text-white font-medium">it was the very first.</span> Established at the crossroads of civilization, we produce physicians for every continent on Earth.
              </p>

              <p className="text-white/50 text-base leading-relaxed italic border-l-2 border-[#22c55e]/30 pl-6">
                Indian students discover modern simulation centers rivaling European academies and a curriculum laser-focused on FMGE performance.
              </p>
            </div>

            {/* Minimalist Bento Tags */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {['WHO Listed', 'NMC Approved', 'FMGE-Focused', '60+ Nationalities'].map((t, i) => (
                <div key={i} className="group cursor-default p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#22c55e]/40 transition-colors">
                  <span className="text-white/80 text-sm font-medium group-hover:text-[#22c55e] transition-colors">{t}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ═══ SECTION 3: WHY SSMU — Horizontal Scroll Visual ════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[#050e05] to-[#0a1a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose <span className="text-[#22c55e]">SSMU?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#16a34a] to-[#22c55e] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, title: 'Simulation Labs', desc: 'Europe-grade clinical simulation suits — practice on human patient simulators before hospital exposure.' },
              { icon: Globe2, title: 'Silk Road Diversity', desc: '60+ nationalities create a unique multicultural lens for every student\'s medical education.' },
              { icon: HeartPulse, title: 'FMGE Champion Rate', desc: 'Year-on-year, SSMU graduates outperform national FMGE averages by a significant margin.' },
              { icon: BookOpen, title: 'English First', desc: 'Entire 6-year program delivered in English. No language barrier, full academic freedom.' },
              { icon: Wind, title: 'Iconic City Life', desc: 'Samarkand\'s UNESCO heritage sites surround your academic life — culture and medicine intertwined.' },
              { icon: ShieldCheck, title: 'Fully Recognized', desc: 'Degree recognized in India, USA, UK, Europe and beyond for licensing and postgraduate equivalency.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(34,197,94,0.12)' }}
                className="group p-8 rounded-2xl bg-[#0a1a0a] border border-white/5 hover:border-[#22c55e]/30 transition-all duration-500 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16a34a]/30 to-[#22c55e]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-[#22c55e]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-[#5a8a5a] leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: CAMPUS GALLERY — Fade Swiper with Overlays ═════════ */}
      <section id="campus" className="py-32 bg-[#0a1a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The <span className="text-[#22c55e]">Samarkand</span> Campus</h2>
          <p className="text-[#5a8a5a] max-w-xl mx-auto">From its Silk Road architecture to ultramodern medical facilities, every corner of this campus is designed to inspire.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto px-6">
          {[campus1, campus2, campus3, campus4].map((src, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl group cursor-pointer h-[280px]"
            >
              <LazyImage src={src} alt={`Campus ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050e05]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-[#22c55e]/0 group-hover:border-[#22c55e]/40 rounded-3xl transition-all duration-500 shadow-[inset_0_0_30px_rgba(34,197,94,0)] group-hover:shadow-[inset_0_0_30px_rgba(34,197,94,0.08)]" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-white font-bold text-lg">SSMU Campus View {i + 1}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 5: STUDENT JOURNEY — Horizontal Motion Cards ══════════ */}
      <section className="py-32 bg-[#050e05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Your Path to Becoming a <span className="text-[#22c55e]">Physician</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: '1', icon: '✨', title: 'Dream & Decide', desc: 'You choose MBBS. We counsel you with full clarity on SSMU\'s admission process, timeline, and campus life.' },
              { num: '2', icon: '📁', title: 'Secure Admission', desc: 'Letter of acceptance, visa processing, medical insurance — all handled by our Samarkand specialists.' },
              { num: '3', icon: '🏛️', title: 'Arrive & Thrive', desc: 'Step onto a UNESCO Silk Road campus. Orientation, hostel, and academic induction await you.' },
              { num: '4', icon: '🩺', title: 'Graduate a Doctor', desc: 'Walk out with an SSMU MBBS — globally recognized, FMGE-proven, and world-ready.' },
            ].map(({ num, icon, title, desc }, i) => (
              <motion.div key={num}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl bg-[#0a1a0a] border border-white/5 hover:border-[#22c55e]/30 transition-all duration-500 group"
              >
                {i < 3 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-[#22c55e]/30 z-10" />}
                <div className="text-4xl mb-4">{icon}</div>
                <div className="text-[#22c55e]/50 text-xs font-bold uppercase tracking-widest mb-2">Phase {num}</div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-[#5a8a5a] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#22c55e" />

      {/* ═══ COUNTERS ════════════════════════════════════════════════════════ */}

      <section className="py-16 md:py-24 bg-[#0a1a0a] border-y border-white/5">

        <div className="max-w-5xl mx-auto px-4 md:px-6 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
    gap-6 md:gap-8 text-center">

          <Counter target={6000} label="Students Placed" suffix="+" />
          <Counter target={60} label="Nationalities" suffix="+" />
          <Counter target={98} label="FMGE Pass Rate" suffix="%" />
          <Counter target={45} label="Years Global Impact" />

        </div>

      </section>



      {/* ═══ FINAL CTA ══════════════════════════════════════════════════════ */}

      <section className="relative py-20 md:py-40 bg-[#050e05] flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 px-4 md:px-6 max-w-3xl mx-auto" data-aos="zoom-in">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Walk the Silk Road
            <br className="hidden sm:block" />
            <span className="text-[#22c55e]"> Conquer Medicine</span>
          </h2>

          {/* Paragraph */}
          <p className="text-[#a0c4a0] text-sm sm:text-base md:text-xl mb-8 md:mb-14 font-light px-2 sm:px-0">
            Join thousands of doctors who started their journey in Samarkand and practice today across 45+ countries.
          </p>

          {/* Button */}
          <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Samarkand State Medical University' }))}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(34,197,94,0.45)' }}
              whileTap={{ scale: 0.96 }}
              className="group relative 
          px-8 sm:px-10 md:px-14 
          py-3 md:py-5 
          rounded-full 
          bg-gradient-to-r from-[#16a34a] to-[#22c55e] 
          text-white 
          font-bold md:font-black 
          text-sm sm:text-base md:text-xl 
          uppercase 
          tracking-wide md:tracking-widest 
          overflow-hidden 
          shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >

              {/* Shine */}
              <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

              {/* Content */}
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                Apply to SSMU
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>

              {/* Ping animation only desktop */}
              <span className="hidden md:block absolute inset-0 rounded-full border-2 border-[#22c55e]/40 animate-ping" />

            </motion.button>
          </button>

        </div>
      </section>





    </div>
  );
};

export default SamarkandStateMedicalUniversity;
