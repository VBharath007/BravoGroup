import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Stethoscope, Globe2, ShieldCheck, ArrowRight, MapPin, HeartPulse, Wind, BookOpen, CalendarDays, BadgeCheck, Utensils, Users, Home } from 'lucide-react';


import AdmissionProtocol from '../../components/ui/AdmissionProtocol';
import LazyImage from '../../components/Lazyimage';


import Footer from '../../components/Footer';


// Assets are now served from the public/assets directory
const bgImg = '/assets/samrkandfront.webp';

const campus1 = '/assets/samaruni/entrance.jpeg';
const campus2 = '/assets/samaruni/samar2.jpeg';
const campus3 = '/assets//samaruni/samar3.jpeg';
const campus4 = '/assets//samaruni/samar4.jpeg';
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
          <LazyImage src={bgImg} alt="Samarkand State Medical University" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050e05]/40 via-[#050e05]/50 to-[#050e05]" />

          {/* Emerald gradient pulse overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(34,197,94,0.12)_0%,transparent_60%)]" />
        </motion.div>

        {/* Mouse glow */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(circle 500px at ${mouse.x}% ${mouse.y}%, rgba(34,197,94,0.07) 0%, transparent 70%)` }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-28">
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
            className="text-xl text-[#a0c4a0] max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Samarkand State Medical University is one of the oldest and most prestigious government
            medical universities in Uzbekistan. It is known for its strong academic system, modern
            clinical training, and internationally aligned MBBS program designed for global medical
            careers.
          </motion.p>

          {/* Badges moved here — above Apply Now */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap gap-4 justify-center mb-10">
            <div className="group flex items-center gap-3 px-6 py-3 rounded-2xl border border-[#22c55e]/30 bg-[#22c55e]/5 backdrop-blur-xl hover:bg-[#22c55e]/10 hover:border-[#22c55e]/60 transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#22c55e] font-black uppercase tracking-tighter opacity-70">Location</span>
                <span className="text-white text-sm font-bold">Samarkand, Uzbekistan</span>
              </div>
            </div>

            <div className="group flex items-center gap-3 px-6 py-3 rounded-2xl border border-[#22c55e]/30 bg-[#22c55e]/5 backdrop-blur-xl hover:bg-[#22c55e]/10 hover:border-[#22c55e]/60 transition-all shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CalendarDays className="w-5 h-5 text-[#22c55e]" />

              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#22c55e] font-black uppercase tracking-tighter opacity-70">Established</span>
                <span className="text-white text-sm font-bold">1930</span>
              </div>
            </div>

          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
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



      {/* ═══ SECTION 3: WHY SSMU — Horizontal Scroll Visual ════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[#050e05] to-[#0a1a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose <span className="text-[#22c55e]">This University</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#16a34a] to-[#22c55e] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: 'Government  medical university with strong reputation.', desc: 'A prestigious government medical university with a strong reputation and decades of academic excellence.' },
              { icon: BadgeCheck, title: 'Recognized as per WHO & NMC guidelines', desc: 'Fully recognized as per WHO and NMC guidelines, ensuring global validity of your medical degree.' },
              { icon: Globe2, title: 'English-medium MBBS program for international students', desc: '100% English-medium program for international students, ensuring seamless learning and communication.' },
              { icon: Stethoscope, title: 'Excellent clinical exposure in multi-specialty hospitals', desc: 'Excellent clinical training and exposure in multi-specialty hospitals with advanced medical infrastructure.' },
              { icon: HeartPulse, title: 'Affordable Fee structure compared to global standards', desc: 'Highly competitive and affordable fee structure compared to global standards, making quality education accessible.' },
              { icon: Users, title: 'Safe and culturally rich student environment', desc: 'A secure and multicultural campus fostering academic growth and personal safety in Samarkand.' },
              { icon: Utensils, title: 'Indian Food and Hostel facilities available', desc: 'Dedicated Indian mess and comfortable hostel accommodations tailored for international students.' },
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

      {/* ═══ SECTION 5: PROGRAM DETAILS ══════════════════ */}
      <section className="py-20 md:py-32 bg-[#050e05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">Program <span className="text-[#22c55e]">Details</span></h2>
            <p className="text-[#5a8a5a] text-sm md:text-base">Comprehensive MBBS program designed for global medical standards.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', icon: '🎓', color: '#22c55e', title: 'Academic Program', desc: 'MBBS (General Medicine) — A comprehensive clinical degree program fully aligned with international medical standards.', aos: 'fade-up' },
              { num: '02', icon: '⏳', color: '#16a34a', title: 'Course Duration', desc: '6 Years (5 Years Academic + 1 Year Internship) in government-affiliated hospitals.', aos: 'fade-down' },
              { num: '03', icon: '🗣️', color: '#22c55e', title: 'Medium of Instruction', desc: '100% ENGLISH curriculum, ensuring seamless comprehension for international medical aspirants.', aos: 'fade-up' },
              { num: '04', icon: '💰', color: '#16a34a', title: '₹ 3.5 LAKHS', desc: 'Highly competitive tuition fee per annum, offering premium education at an accessible value.', aos: 'fade-down' },
            ].map(({ num, icon, color, title, desc, aos }, i) => (
              <motion.div key={num}
                data-aos={aos}
                data-aos-delay={i * 150}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 rounded-3xl bg-[#0a1a0a]/40 border border-white/5 hover:border-[#22c55e]/40 transition-all duration-500 group overflow-hidden backdrop-blur-sm"
              >
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:bg-[#22c55e]/10 transition-all duration-500">{icon}</div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#22c55e] transition-colors leading-tight">{title}</h3>
                <p className="text-[#5a8a5a] text-sm leading-relaxed font-medium">{desc}</p>
                <div className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.03] group-hover:text-[#22c55e]/10 transition-all duration-700 pointer-events-none">{num}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#22c55e" />

      {/* ═══ SECTION 4: LIFE AT SAMARKAND — GALLERY ═════════ */}
      <section id="campus" className="py-20 md:py-32 bg-[#0a1a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Life at <span className="text-[#22c55e]">Samarkand</span></h2>
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
        {/* Neater, More Professional Description */}
        <div className="max-w-4xl mx-auto mt-20 px-6" data-aos="fade-up">
          <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-[#0d1a0a]/40 border border-[#22c55e]/10 backdrop-blur-sm overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center shrink-0">
                <Globe2 className="w-8 h-8 text-[#22c55e]" />
              </div>
              <p className="text-[#a0c4a0] text-lg md:text-xl font-medium leading-relaxed text-center md:text-left">
                Students experience a balanced academic environment in one of Uzbekistan’s most historic
                and student-friendly cities. The university provides <span className="text-white">modern classrooms</span>,
                <span className="text-white"> comfortable hostels</span>, and a <span className="text-white">supportive international student community</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: STUDENT JOURNEY — Horizontal Motion Cards ══════════ */}
      <section className="py-32 bg-[#050e05]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase tracking-tight">
              The Strategic Roadmap to <span className="text-[#22c55e]">Medical Excellence</span>
            </h2>
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







      {/* ═══ FINAL CTA ══════════════════════════════════════════════════════ */}

      <section className="relative py-20 md:py-40 bg-[#050e05] flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 px-4 md:px-6 max-w-3xl mx-auto" data-aos="zoom-in">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight uppercase tracking-tight">
            Start Your <span className="text-[#22c55e]">Medical Journey</span>
          </h2>

          {/* Paragraph */}
          <div className="space-y-4 mb-8 md:mb-14" data-aos="fade-up" data-aos-delay="200">
            <p className="text-[#a0c4a0] text-sm sm:text-base md:text-xl font-light px-2 sm:px-0">
              Choose a university that combines tradition, quality education, and global opportunities. <br className="hidden md:block" />
              Your path to becoming a doctor begins here.
            </p>
            <p className="text-white text-base md:text-2xl font-bold italic tracking-wide">
              "Study with confidence. Build your medical future globally."
            </p>
          </div>

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
                Apply now
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
