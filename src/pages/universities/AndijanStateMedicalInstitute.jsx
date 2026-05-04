import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Globe2, ShieldCheck, CheckCircle2, ArrowRight, MapPin, ChevronDown, BookOpen, Users, Library, BedDouble, Target, Zap, Compass, Layout, Star, Microscope, Smartphone, GraduationCap, Languages, Banknote, Sparkles } from 'lucide-react';
import Footer from '../../components/Footer';
import AdmissionProtocol from '../../components/ui/AdmissionProtocol';

import LazyImage from '../../components/Lazyimage';

// Assets are now served from the public/assets directory
const bgImg = '/assets/aandijannewimage/andijannewimage3.jpeg';
const campus1 = '/assets/andijanfront.jpeg';

const campus2 = '/assets/aandijannewimage/andigroupimage.jpeg';
const campus4 = '/assets/aandijannewimage/aandifootball.jpeg';
const campus3 = '/assets/aandijannewimage/aandioperation.jpeg';
const campus5 = '/assets/aandijannewimage/andilegacyimage.jpeg';


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
    AOS.init({
      duration: 1000,
      once: true,
    });
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
          <LazyImage src={bgImg} alt="" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07030f]/70 via-[#07030f]/60 to-[#07030f]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,transparent_60%)]" />
        </motion.div>

        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(circle 450px at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.08) 0%, transparent 70%)` }} />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-28">
          {/* Word-by-word drop in */}
          <div className="mb-8">
            {['Andijan State', 'Medical', 'university'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%', rotateX: -90 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight"
                  style={{ color: i === 1 ? '#a855f7' : 'white' }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1, ease: 'backOut' }}
            className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full border border-[#a855f7]/40 bg-[#a855f7]/10 backdrop-blur-md mb-12 max-w-full">

            <div className="flex items-center gap-2 md:gap-3">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#a855f7] shrink-0" />

              <div className="flex flex-col items-center">
                <span className="text-[#a855f7] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.25em] leading-relaxed block">
                  Yu. Otabekov 1, Andijan City,
                </span>
                <span className="text-[#a855f7] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.25em] leading-relaxed block">
                  Uzbekistan.
                </span>

                <span className="block text-white/90 normal-case tracking-normal text-[9px] sm:text-xl font-semibold 
    drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] mt-0.5">
                  Established in 1955
                </span>
              </div>
            </div>
          </motion.div>

          <div className="text-xl text-[#9a80bb] max-w-2xl mx-auto mb-12 leading-relaxed font-light min-h-[3.5rem]">
            {`“ A legacy of medical excellence in the heart of Fergana Valley, shaping future global doctors ”`.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.2,
                  delay: 1.5 + i * 0.03,
                  ease: "easeOut"
                }}
                className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 4 }}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-5xl font-black text-white mb-6 leading-tight">
              {"“ Where Your Medical Dreams ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.1, delay: i * 0.04 }}
                >
                  {char}
                </motion.span>
              ))}
              <br className="md:hidden" />
              <span className="text-[#a855f7]">
                {"Meet the World ”".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.1, delay: (29 + i) * 0.04 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h2>
          </motion.div>
          {/* Three panel layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 relative overflow-hidden rounded-[2rem] md:rounded-3xl min-h-[350px] md:min-h-[380px] flex flex-col justify-end p-6 md:p-10"
            >
              <LazyImage src={campus5} alt="" className="absolute inset-0 w-full h-full object-cover opacity-120" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07030f] via-[#07030f]/60 to-transparent" />
              <div className="absolute inset-0 border border-[#a855f7]/20 rounded-[2rem] md:rounded-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] mb-4 md:mb-6 border border-white/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff] animate-pulse" />
                  <span className="font-black text-[9px] md:text-xs uppercase tracking-[0.2em]">The ASMU Legacy</span>
                </div>
                <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
                  Andijan State Medical university has a strong legacy in medical education in Uzbekistan with decades of academic excellence.
                  <br className="hidden md:block" />
                  It is one of the oldest and most reputed government medical university in the region, The university has trained thousands of Doctors ,serving across different Countries.It is  Known for its consistent Focus on Clinical Practice and Research based Learning
                  ASMU continues to grow as a trusted destination for international MBBS students, especially from India.
                </p>
              </div>
            </motion.div>


            <div className="flex flex-col gap-6 items-center">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="w-full max-w-sm p-6 md:p-8 rounded-3xl bg-white/5 border border-[#a855f7]/20 backdrop-blur-xl hover:border-[#a855f7]/40 transition-all flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">📚</div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  Research Excellence
                </h3>

                <p className="text-[#7a5aaa] text-sm leading-relaxed">
                  Andijan State Medical University offers a strong research culture with expert faculty and
                  student involvement in scientific work
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-sm p-6 md:p-8 rounded-3xl bg-white/5 border border-[#a855f7]/20 backdrop-blur-xl hover:border-[#a855f7]/40 transition-all flex flex-col items-center text-center"
              >
                <div className="text-3xl mb-4">🏡</div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                  World-Class Hostel Facilities
                </h3>

                <p className="text-[#7a5aaa] text-sm leading-relaxed">

                  Andijan State Medical university offers well-maintained hostels with secure 24/7 security and
                  hygienic food facilities, ensuring safe and comfortable living for students.
                </p>
              </motion.div>

            </div>


          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: WHY ASMU — 3D Floating Cards ═══════════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[#07030f] to-[#0e0518] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose <span className="text-[#a855f7]">ASMU?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] mx-auto rounded-full" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Research-Driven Faculty', desc: '  Globally experienced professors with strong academic and research backgrounds guiding future doctors.' },
              { icon: ShieldCheck, title: ' NMC & WHO Recognition  ', desc: '  Internationally recognized degree, enabling graduates to pursue licensing and PG opportunities worldwide. ' },
              { icon: Library, title: 'Modern Medical Library', desc: 'Well-equipped library with extensive medical books, digital resources, and international journal access.' },
              { icon: BedDouble, title: 'Comfortable Hostel Facilities ', desc: 'Fully furnished, safe, and well-maintained dormitories designed for international students.' },
              { icon: Users, title: 'Simple Admission Process ', desc: ' No entrance exam required. Complete admission support from application to campus arrival.' },
              { icon: Globe2, title: 'Global Student Community', desc: ' A diverse environment with students from multiple countries, building global medical connections.' },
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

      {/* ═══ PROGRAM DETAILS — Glassmorphism Cards ═══════════════════════ */}
      <section className="py-24 bg-[#0e0518] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Program <span className="text-[#a855f7]">Details</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Duration Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-3xl bg-[#07030f]/50 border border-white/10 hover:border-[#a855f7]/50 backdrop-blur-xl group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 to-[#a855f7]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#a855f7]/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <GraduationCap className="w-8 h-8 text-[#a855f7]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">6 Years MBBS</h3>
              <p className="text-[#a855f7] font-semibold text-sm tracking-wider uppercase mb-4">Program Duration</p>
              <p className="text-[#8a6aaa] leading-relaxed">
                5 Years of Academic Excellence + 1 Year of Intensive Clinical Internship.
              </p>
            </motion.div>

            {/* Medium of Instruction Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-3xl bg-[#07030f]/50 border border-white/10 hover:border-[#a855f7]/50 backdrop-blur-xl group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed]/20 to-[#a855f7]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-[#a855f7]/20 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <Languages className="w-8 h-8 text-[#a855f7]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">English</h3>
              <p className="text-[#a855f7] font-semibold text-sm tracking-wider uppercase mb-4">Medium of Instruction</p>
              <p className="text-[#8a6aaa] leading-relaxed">
                Entire curriculum is taught strictly in English, tailored for international students.
              </p>
            </motion.div>

            {/* Fees Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-[#7c3aed]/10 to-[#07030f] border border-[#a855f7]/30 hover:border-[#a855f7] backdrop-blur-xl group overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7]/20 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                <Banknote className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-3xl font-black text-white mb-1">₹ 2.5 LAKHS</h3>
              <p className="text-[#a855f7] font-bold text-sm tracking-widest uppercase mb-4">Per Year</p>
              <p className="text-white/70 leading-relaxed font-medium">
                Highly affordable tuition fees with premium educational facilities.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 bg-white/5 px-4 py-2 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#a855f7]" /> Highly Affordable
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══ SECTION 7: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#a855f7" />

      {/* ═══ SECTION 5: STUDENT JOURNEY — ENHANCED PREMIUM TIMELINE ═════ */}
      <section className="py-20 md:py-24 bg-[#07030f] relative overflow-hidden">
        {/* Background VFX: Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#a855f7]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              From <span className="text-[#a855f7]">Dream</span> to Doctor
            </h2>
            <div className="flex justify-center">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                viewport={{ once: true }}
                className="h-1.5 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full"
              />
            </div>
            <p className="mt-8 text-[#9a80bb] text-sm md:text-base font-bold tracking-[0.3em] uppercase">
              Journey at Andijan State Medical University
            </p>
          </motion.div>

          <div className="relative">
            {/* 🌟 Glowing Path Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#a855f7]/30 to-transparent hidden md:block" />

            {[
              { icon: '✨', step: '01', title: 'Aspiration', desc: 'You begin your journey with a dream to become a doctor. Thousands of students are guided through counseling, application, and admission support.', side: 'left' },
              { icon: '📋', step: '02', title: 'Admission', desc: 'Complete assistance is provided for documentation, admission letter, and visa process to ensure a smooth transition.', side: 'right' },
              { icon: '🏛️', step: '03', title: 'Campus Arrival', desc: 'Students are welcomed in Andijan with orientation, hostel allocation, and a guided campus introduction.', side: 'left' },
              { icon: '🩺', step: '04', title: 'Graduation', desc: 'Graduate with an internationally recognized MBBS degree, opening pathways for global medical careers and licensing exams.', side: 'right' },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-center justify-center md:justify-between ${i === 3 ? 'mb-0' : 'mb-24 md:mb-32'} ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>

                {/* Timeline Node */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 rounded-full bg-[#07030f] border-2 border-[#a855f7] flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  >
                    <div className="w-3 h-3 rounded-full bg-[#a855f7] animate-pulse" />
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: item.side === 'left' ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className={`w-full md:w-[45%] group relative`}
                >
                  {/* Step Number Background */}
                  <div className={`absolute -top-12 ${item.side === 'left' ? 'right-0' : 'left-0'} text-8xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-[#a855f7]/10 transition-colors duration-500`}>
                    {item.step}
                  </div>

                  <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-[#0e0518] border border-white/5 hover:border-[#a855f7]/40 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.1)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex flex-col gap-6 relative z-10">
                      <div className="text-5xl group-hover:scale-125 transition-transform duration-500 origin-left">{item.icon}</div>

                      <div>
                        <div className="text-[#a855f7] text-xs font-black uppercase tracking-[0.3em] mb-4">Step {item.step}</div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-[#a855f7] transition-colors">{item.title}</h3>
                        <p className="text-[#9a80bb] leading-relaxed text-base md:text-lg font-light group-hover:text-white/90 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className={`absolute top-0 ${item.side === 'left' ? 'right-0' : 'left-0'} w-24 h-24 bg-gradient-to-br from-[#a855f7]/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                </motion.div>

                {/* Empty spacer */}
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ SECTION 4: CAMPUS GALLERY — BENTO STYLE ══════════════════════════ */}
      <section className="relative py-12 md:py-16 bg-[#0e0518] overflow-hidden">
        {/* Three.js VFX Background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <CosmicParticles />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0518] via-transparent to-[#0e0518]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-6 mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Life at <span className="text-[#a855f7]">ASMU</span></h2>
          <p className="text-[#6a4a9a] max-w-xl mx-auto">
            A balanced student life combining quality medical education, cultural diversity, and safe
            campus living in the heart of Uzbekistan.
          </p>
        </motion.div>



        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          {/* ═══ EXTRA GALLERY: DYNAMIC MASS SHOWCASE (Merged) ══════════════════════════ */}
          <div className="mt-16">
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              className="pb-20 !overflow-visible"
            >
              {[
                '/assets/aandijannewimage/aandioperation.jpeg',
                '/assets/aandijannewimage/andigroupimage.jpeg',
                '/assets/aandijannewimage/andigruopimage2.jpeg',
                '/assets/aandijannewimage/aandifootball.jpeg',
                '/assets/aandijannewimage/andijannewimage3.jpeg',
              ].map((src, idx) => (
                <SwiperSlide key={idx} className="!w-[300px] sm:!w-[450px]">
                  <motion.div
                    whileHover={{ y: -15, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#a855f7]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group relative h-[350px] md:h-[500px] cursor-grab active:cursor-grabbing"
                  >
                    {/* Cinematic overlay without blur */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    <LazyImage src={src} alt={`ASMU Campus ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-[1.15] transition-all duration-700 ease-out" />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: INSTITUIONAL LEGACY & VISION — REPLACES COUNTERS ═══ */}
      <section className="py-12 md:py-16 bg-[#0e0518] border-y border-white/5 relative overflow-hidden">

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
                Vision of <br />
                <span className="text-[#a855f7]"> Medical Excellence </span>
              </h2>

              <p className="text-base sm:text-lg md:text-2xl text-white font-light italic leading-relaxed tracking-tight 
          border-l-0 lg:border-l-4 pl-0 lg:pl-12 border-white/10 text-center lg:text-left">
                "Nestled in the fertile Fergana Valley, Andijan State Medical university combines strong academic tradition with modern medical training, shaping future-ready doctors for global healthcare."
              </p>

            </div>

            {/* RIGHT CONTENT */}
            <div className="grid grid-cols-1 gap-4 md:gap-6">

              <h4 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white text-center lg:text-left">
                Core Admission Benefits
              </h4>

              {["DIRECT FACULTY MENTORSHIP", "FMGE/NExT PREPARATION SUPPORT", "CLINICAL & EXAM TRAINING", "HANDS-ON  CLINICAL EXPOSURE"].map((benefit, i) => (

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

                    <span className="text-sm sm:text-base md:text-lg font-bold tracking-wide md:tracking-widest text-white">
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


      {/* ═══ SECTION 8: GLOBAL RECOGNITION — VFX ENHANCED ══════════════════ */}
      <section className="py-12 md:py-16 bg-[#07030f] border-y border-white/5 relative overflow-hidden">
        {/* Deep Cosmic Background VFX */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#a855f7]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7c3aed]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe2,
                title: "International Student Community",
                desc: "Representing multiple countries worldwide with a diverse cultural blend."
              },
              {
                icon: Microscope,
                title: "Clinical Training Network",
                desc: "Extensive hands-on experience through our vast network of affiliated teaching hospitals."
              },
              {
                icon: Compass,
                title: "Global Academic Exposure",
                desc: "World-class curriculum structured medical education system."
              },
              {
                icon: ShieldCheck,
                title: "Strong Licensing Success",
                desc: "Exceptional success rates in global licensing exams including NMC (India)."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative p-10 rounded-[2.5rem] bg-[#0e0518]/80 border border-white/10 hover:border-[#a855f7]/60 transition-all duration-500 group overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              >
                {/* 🌟 VFX: SHINE BAR ANIMATION */}
                <div className="absolute inset-0 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-20" />

                {/* 🌟 VFX: GLOWING ORB BEHIND ICON */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-[#a855f7]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container with Neo-Glass Style */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#1a0b2e] to-[#0e0518] border border-[#a855f7]/30 flex items-center justify-center mb-8 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:rotate-[360deg] transition-all duration-700 relative z-10">
                  <item.icon className="w-10 h-10 text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                </div>

                {/* Highly Visible Typography */}
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight leading-tight group-hover:text-[#a855f7] transition-colors">
                  {item.title}
                </h3>

                <p className="text-white/80 text-base leading-relaxed font-medium transition-colors duration-300 relative z-10">
                  {item.desc}
                </p>

                {/* 🌟 VFX: BOTTOM NEON LINE */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] group-hover:w-full transition-all duration-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══ FINAL CTA: KYRGYZSTAN ADMISSIONS ══════════════════════════════════════ */}


      <section className="relative py-20 md:py-40 bg-[#07030f] flex items-center justify-center text-center overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Start Your MBBS Journey Today <br className="hidden sm:block" />
              <motion.span
                animate={{ textShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 30px rgba(168,85,247,0.8)", "0 0 0px rgba(168,85,247,0)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#a855f7]"
              >
                In Uzbekistan
              </motion.span>
            </h2>
          </motion.div>

          {/* Paragraph */}
          <p className="text-[#9a80bb] text-sm sm:text-base md:text-xl mb-8 md:mb-14 font-light max-w-xl md:max-w-2xl mx-auto">
            Secure your admission at Andijan State Medical university with complete guidance from application to arrival, Limited seats available for international students.
          </p>

          {/* Button */}
          <Link to="/universities">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative inline-block cursor-pointer group"
            >
              {/* The Badge Body */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#7c3aed]/40 backdrop-blur-xl text-white px-5 py-3 md:px-8 md:py-4 rounded-full flex items-center gap-2 md:gap-4 shadow-[0_15px_35px_rgba(124,58,237,0.3)] border border-white/20 relative z-10 overflow-hidden"
              >
                {/* 🌟 Shimmer Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20"
                  />
                </div>

                <Sparkles className="w-4 h-4 md:w-5 md:h-5 fill-white shrink-0" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap">
                  Explore More Universities
                </span>
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </motion.div>

              {/* Subtle Outer Glow */}
              <div className="absolute inset-0 bg-[#7c3aed]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </Link>

        </div>
      </section>



    </div>
  );
};

export default AndijanStateMedicalInstitute;
