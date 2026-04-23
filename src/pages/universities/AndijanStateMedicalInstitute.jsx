import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { Globe2, ShieldCheck, CheckCircle2, ArrowRight, MapPin, ChevronDown, BookOpen, Users, Library, BedDouble, Target, Zap, Compass, Layout, Star, Microscope, Smartphone } from 'lucide-react';
import Footer from '../../components/Footer';
import AdmissionProtocol from '../../components/ui/AdmissionProtocol';

import LazyImage from '../../components/Lazyimage';

import bgImg from '../../assets/andijan1.webp';
import campus1 from '../../assets/uni4.webp';
import campus2 from '../../assets/andijan1.webp';
import campus3 from '../../assets/andijan2.webp';
import campus4 from '../../assets/andijan3.webp';



// ── Violet Cosmic Particles ──────────────────────────────────────────────────
function CosmicParticles() {
  const ref = useRef();
  const count = 2000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.05;
      ref.current.rotation.z = s.clock.elapsedTime * 0.02;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#a855f7" size={0.03} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

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
    <div ref={ref} className="text-center p-8 rounded-2xl bg-[#0e0518]/60 border border-[#a855f7]/20 hover:border-[#a855f7]/50 transition-all">
      <div className="text-5xl font-black text-[#a855f7] mb-2">{count.toLocaleString()}{suffix}</div>
      <div className="text-[#8a6aaa] text-sm uppercase tracking-widest font-semibold">{label}</div>
    </div>
  );
}

const AndijanStateMedicalInstitute = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 160]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, []);

  return (
    <div className="bg-[#07030f] text-white overflow-x-hidden font-sans selection:bg-[#a855f7]/30">

      {/* ═══ SECTION 1: COSMIC HERO — CENTERED GLASS ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" onMouseMove={handleMouseMove}>
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <CosmicParticles />
          </Canvas>
        </div>

        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <LazyImage src={bgImg} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07030f]/70 via-[#07030f]/60 to-[#07030f]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,transparent_60%)]" />
        </motion.div>

        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(circle 450px at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.08) 0%, transparent 70%)` }} />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-28">
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'backOut' }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#a855f7]/40 bg-[#a855f7]/10 backdrop-blur-md mb-8">
            <MapPin className="w-4 h-4 text-[#a855f7]" />
            <span className="text-[#a855f7] text-sm font-bold uppercase tracking-[0.25em]">Andijan — Fergana Valley, Uzbekistan</span>
          </motion.div>

          {/* Word-by-word drop in */}
          <div className="mb-8">
            {['Andijan State', 'Medical', 'Institute'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%', rotateX: -90 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
                  style={{ color: i === 1 ? '#a855f7' : 'white' }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}
            className="text-xl text-[#9a80bb] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Nestled in the fertile Fergana Valley, ASMI is where deep-rooted academic heritage fuses with tomorrow's clinical vision. A place where every aspiring doctor finds their true calling.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Andijan State Medical Institute' }))}>
              <motion.button whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(168,85,247,0.5)' }} whileTap={{ scale: 0.97 }}
                className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white font-bold text-lg uppercase tracking-widest overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative flex items-center gap-3">Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
            </button>


          </motion.div>


        </div>
      </section>

      {/* ═══ SECTION 2: STORY — Three column glass panels ═══════════════════ */}
      <section className="py-32 bg-[#07030f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              “ Where Your Medical Dream  <br /><span className="text-[#a855f7]">  Meets the World ”  </span>
            </h2>
          </div>
          {/* Three panel layout */}
          <div className="grid md:grid-cols-3 gap-6">
            <div data-aos="fade-up" data-aos-delay="0" className="col-span-2 relative overflow-hidden rounded-3xl min-h-[380px] flex flex-col justify-end p-10">
              <LazyImage src={bgImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07030f] via-[#07030f]/50 to-transparent" />
              <div className="absolute inset-0 border border-[#a855f7]/20 rounded-3xl" />
              <div className="relative z-10">
                <div className="text-[#a855f7] font-bold text-sm uppercase tracking-widest mb-3">The ASMI Legacy</div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  For decades, ASMI has produced physicians who serve Uzbekistan's most critical healthcare needs — and beyond. Its faculty of globally published researchers produces students who don't just pass exams, they outthink their peers on hospital floors around the world.
                </p>
              </div>
            </div>


            <div className="flex flex-col gap-6 items-center">

              <div
                data-aos="fade-up"
                data-aos-delay="100"
                className="w-full max-w-sm p-6 md:p-8 rounded-3xl bg-white/5 border border-[#a855f7]/20 backdrop-blur-xl hover:border-[#a855f7]/40 transition-all flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">📚</div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  Research Excellence
                </h3>

                <p className="text-[#7a5aaa] text-sm leading-relaxed">
                  Faculty of globally published researchers. Undergrads co-author papers from Year 2.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                className="w-full max-w-sm p-6 md:p-8 rounded-3xl bg-white/5 border border-[#a855f7]/20 backdrop-blur-xl hover:border-[#a855f7]/40 transition-all flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">🏡</div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  World-Class Hostel
                </h3>

                <p className="text-[#7a5aaa] text-sm leading-relaxed">
                  Purpose-built, air-conditioned student dormitories with 24/7 security, cafeteria, and Wi-Fi.
                </p>
              </div>

            </div>


          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: WHY ASMI — 3D Floating Cards ═══════════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[#07030f] to-[#0e0518] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose <span className="text-[#a855f7]">ASMI?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Research-First Faculty', desc: 'Globally published professors who have trained doctors serving in 35+ countries.' },
              { icon: ShieldCheck, title: 'NMC / WHO Recognized', desc: 'Your degree is globally portable. Pursue PG residency or licensing anywhere.' },
              { icon: Library, title: 'State-of-the-Art Library', desc: 'Medical research library with 100,000+ books, digital resources, and journal access.' },
              { icon: BedDouble, title: 'Premium Dormitories', desc: 'Fully furnished, climate-controlled rooms with international safety standards.' },
              { icon: Users, title: 'Direct Admission', desc: 'No entrance exam. We handle everything from application to your first day on campus.' },
              { icon: Globe2, title: 'Global Community', desc: '20+ nationalities. Build lifelong professional networks that span the entire world.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(168,85,247,0.12)' }}
                className="group p-8 rounded-2xl bg-[#0e0518] border border-white/5 hover:border-[#a855f7]/30 transition-all duration-500 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed]/30 to-[#a855f7]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                  <Icon className="w-7 h-7 text-[#a855f7]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-[#8a6aaa] leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ SECTION 4: CAMPUS GALLERY ══════════════════════════════════════ */}
      <section className="relative py-40 bg-[#0e0518] overflow-hidden">
        {/* Three.js VFX Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <CosmicParticles />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0518] via-transparent to-[#0e0518]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Life at <span className="text-[#a855f7]">ASMI</span></h2>
          <p className="text-[#6a4a9a] max-w-xl mx-auto">The Fergana Valley's most beautiful campus — where academic rigor and cultural richness coexist in perfect harmony.</p>
        </div>

        <div className="relative z-10 flex justify-center items-center px-6" data-aos="zoom-in">
          {/* Subtle Glow Behind the Swiper */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7]/10 rounded-full blur-[100px] pointer-events-none" />

          <Swiper
            effect="cards"
            grabCursor={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            modules={[EffectCards, Autoplay, Pagination]}
            pagination={{ clickable: true }}
            className="w-full max-w-[500px] h-[350px] md:h-[450px] [&_.swiper-slide]:rounded-3xl [&_.swiper-slide]:shadow-[0_0_50px_rgba(168,85,247,0.3)]"
          >
            {[bgImg, campus1, campus2, campus3, campus4].map((src, i) => (
              <SwiperSlide key={i} className="relative overflow-hidden border-2 border-[#a855f7]/40 group">
                <LazyImage src={src} alt={`ASMI Campus ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0518] via-[#0e0518]/20 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0e0518]/60 border border-[#a855f7]/50 backdrop-blur-xl mb-3 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] animate-pulse" />
                    <span className="text-white text-xs font-black uppercase tracking-[0.2em]">ASMI View {i + 1}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ═══ SECTION 5: STUDENT JOURNEY — Alternating vertical timeline ═════ */}



      <section className="py-20 md:py-32 bg-[#07030f]">
        <div className="max-w-5xl mx-auto px-4 md:px-6">

          <div className="text-center mb-12 md:mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              From <span className="text-[#a855f7]">Dream</span> to Doctor
            </h2>
          </div>

          <div className="relative">

            {/* Center line (hide in mobile) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#a855f7]/0 via-[#a855f7]/40 to-[#a855f7]/0" />

            {[
              { icon: '✨', step: '01', title: 'The Aspiration', desc: 'You dream of becoming a doctor. ASMI has guided thousands of Indians just like you — through counseling, application, and beyond.', side: 'left' },
              { icon: '📋', step: '02', title: 'The Admission', desc: 'Fully supported document processing, visa stamping, and offer letter from ASMI — handled end to end by our consultancy.', side: 'right' },
              { icon: '🏛️', step: '03', title: 'Campus Arrival', desc: 'Land in Andijan to a warm welcome. Orientation, dormitory allocation, and campus tour on Day 1.', side: 'left' },
              { icon: '🩺', step: '04', title: 'Graduate as a Physician', desc: 'Walk out with an ASMI MBBS degree — recognized by NMC, WHO, and medical licensing boards across the globe.', side: 'right' },
            ].map(({ icon, step, title, desc, side }, i) => (

              <motion.div
                key={step}
                initial={{ opacity: 0, x: side === 'left' ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}

                className={`
            relative flex mb-10 md:mb-16
            justify-center md:${side === 'left' ? 'justify-start' : 'justify-end'}
          `}
              >

                {/* Dot (hide mobile) */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.8)] z-10" />

                <div
                  className={`
              w-full md:w-[44%]
              p-6 md:p-8
              rounded-2xl bg-[#0e0518]
              border border-white/5
              hover:border-[#a855f7]/30
              transition-all duration-300
              
              text-center md:${side === 'right' ? 'text-right' : 'text-left'}
            `}
                >
                  <div className="text-3xl md:text-4xl mb-3">{icon}</div>
                  <div className="text-[#a855f7]/60 text-xs font-bold uppercase tracking-widest mb-2">
                    Step {step}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-[#6a4a9a] leading-relaxed text-sm md:text-base">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ SECTION 6: INSTITUIONAL LEGACY & VISION — REPLACES COUNTERS ═══ */}


      <section className="py-20 md:py-40 bg-[#0e0518] border-y border-white/5 relative overflow-hidden">

        {/* Background animation (smaller in mobile) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      w-[400px] h-[400px] md:w-[1000px] md:h-[1000px] 
      border border-white rounded-full animate-ping" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

          {/* Grid fix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-8 md:space-y-12 text-center lg:text-left">

              <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6">
                <div className="w-10 md:w-16 h-px bg-white/20" />
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-white italic">
                  Institutional Essence
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-[1.2]">
                The Vision of <br />
                <span className="text-[#a855f7]">Educational Supremacy</span>
              </h2>

              <p className="text-base sm:text-lg md:text-2xl text-white font-light italic leading-relaxed tracking-tight 
          border-l-0 lg:border-l-4 pl-0 lg:pl-12 border-white/10 text-center lg:text-left">
                "Nestled in the fertile Fergana Valley, ASMI is where deep-rooted academic heritage fuses with tomorrow's clinical vision. A place where every aspiring doctor finds their true calling."
              </p>

            </div>

            {/* RIGHT CONTENT */}
            <div className="grid grid-cols-1 gap-4 md:gap-6">

              <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white text-center lg:text-left">
                Core Admission Benefits
              </h4>

              {["Direct Doctor Mentorship", "FMGE Preparation Track", "State Examination Prep", "Clinical Hands-on Mastery"].map((benefit, i) => (

                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] 
              bg-white/[0.03] border border-white/5 
              hover:border-white/20 transition-all 
              group backdrop-blur-xl 
              flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0 text-center sm:text-left"
                >

                  <div className="flex items-center gap-4 md:gap-6">

                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 
                flex items-center justify-center text-[8px] md:text-[10px] font-black 
                group-hover:scale-110 transition-transform text-[#a855f7]">
                      0{i + 1}
                    </div>

                    <span className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide md:tracking-widest text-white">
                      {benefit}
                    </span>

                  </div>

                  <CheckCircle2 className="opacity-40 sm:opacity-20 group-hover:opacity-100 transition-opacity text-[#a855f7]" />

                </motion.div>
              ))}

            </div>

          </div>
        </div>
      </section>



      {/* ═══ SECTION 7: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#a855f7" />

      {/* ═══ FINAL CTA: KYRGYZSTAN ADMISSIONS ══════════════════════════════════════ */}


      <section className="relative py-20 md:py-40 bg-[#07030f] flex items-center justify-center text-center overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto" data-aos="zoom-in">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Your Medical Journey Starts In <br className="hidden sm:block" />
            <span className="text-[#a855f7]">Uzbekistan</span>
          </h2>

          {/* Paragraph */}
          <p className="text-[#9a80bb] text-sm sm:text-base md:text-xl mb-8 md:mb-14 font-light max-w-xl md:max-w-2xl mx-auto">
            Join thousands of international students at top-ranked universities like OSH and IHSM.
            World-class education, global recognition, and a vibrant student life await.
          </p>

          {/* Button */}
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(168,85,247,0.4)' }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-8 sm:px-10 md:px-14 py-3 md:py-5 rounded-full 
        bg-gradient-to-r from-[#7c3aed] to-[#a855f7] 
        text-white font-bold md:font-black 
        text-sm sm:text-base md:text-xl 
        uppercase tracking-wide md:tracking-widest 
        overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >

              {/* Shine */}
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                Explore Universities
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>

              {/* Ping (reduce in mobile) */}
              <span className="hidden md:block absolute inset-0 rounded-full border-2 border-[#a855f7]/40 animate-ping" />
            </motion.button>
          </Link>

        </div>
      </section>



    </div>
  );
};

export default AndijanStateMedicalInstitute;