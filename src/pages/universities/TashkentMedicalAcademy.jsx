import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Stethoscope, Microscope, FlaskConical, Globe2, GraduationCap, BookOpen, ShieldCheck, Users, ArrowRight, MapPin, Star, Plane, Utensils, Home, HeartHandshake, ClipboardCheck } from 'lucide-react';
import AdmissionProtocol from '../../components/ui/AdmissionProtocol';
import LazyImage from '../../components/Lazyimage';

// Assets are now served from the public/assets directory
const bgImg = '/assets/TASHKENT-MEDICAL-ACADEMY.webp';
const cityImg = '/assets/takshnet5.webp';
const campusImg = '/assets/takshnet1.webp';
const campus2 = '/assets/takshnet2.webp';
const campus3 = '/assets/tashkent_city.webp';


import Footer from '../../components/Footer';


// ── Floating Particle Field (Three.js) ──────────────────────────────────
function ParticlesField() {
  const ref = useRef();
  const positions = new Float32Array(2000 * 3);
  for (let i = 0; i < 2000; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.04;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00D4FF" size={0.03} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

// ── Animated Counter ──────────────────────────────────────────────────────
function Counter({ target, label, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);
  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl font-black text-[#00D4FF] mb-3 group-hover:scale-110 transition-transform duration-300">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[#a8c8e8] text-xs md:text-sm leading-relaxed font-medium max-w-[180px] mx-auto">
        {label}
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
const TashkentMedicalAcademy = () => {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef();

  useEffect(() => {
    // AOS initialized globally
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    setMouse({ x: ((clientX - left) / width) * 100, y: ((clientY - top) / height) * 100 });
  }, []);

  return (
    <div className="bg-[#030814] text-white overflow-x-hidden font-sans">

      {/* ═══ SECTION 1: CINEMATIC HERO ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Three.js particle canvas */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ParticlesField />
          </Canvas>
        </div>

        {/* Parallax background image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <LazyImage src={bgImg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030814]/70 via-[#030814]/50 to-[#030814]" />
        </motion.div>

        {/* Mouse-follow spotlight */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 400px at ${mouse.x}% ${mouse.y}%, rgba(0,212,255,0.08) 0%, transparent 60%)`
          }}
        />

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-28">

          {/* Staggered title */}
          <div className="overflow-hidden mb-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-wrap justify-center gap-x-4 gap-y-2"
            >
              {['Tashkent', 'State', 'Medical', 'University'].map((word, wi) => (
                <span key={wi} className="overflow-hidden block">
                  <motion.span
                    variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
                    className="block text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
                    style={{ color: wi === 1 ? '#00D4FF' : 'white' }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-[#00D4FF] mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase tracking-tighter mb-1">Address</p>
                <p className="text-sm font-medium text-white">Farabi 2 Tashkent UZ, 100109, Uzbekistan</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Star className="w-5 h-5 text-[#00D4FF] mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase tracking-tighter mb-1">Established</p>
                <p className="text-sm font-medium text-white">1920 </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Globe2 className="w-5 h-5 text-[#00D4FF] mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase tracking-tighter mb-1">Location</p>
                <p className="text-sm font-medium text-white">Capital City Campus</p>
              </div>
            </div>

            <p className="text-xl text-white font-semibold mb-6 leading-relaxed">
              Located in the capital city of Uzbekistan with advanced hospital access and clinical exposure.
            </p>

            <p className="text-lg text-[#a8c8e8] leading-relaxed font-light">
              A historic university with over a century of excellence in medical education in Central Asia.
              The university is known for its strong academic foundation and extensive clinical training,
              producing qualified medical professionals for global healthcare systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Tashkent Medical Academy' }))}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,212,255,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#0A66C2] to-[#00D4FF] text-white font-bold text-lg uppercase tracking-widest overflow-hidden shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative flex items-center gap-3">Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
            </button>

          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-22 left-1/2 -translate-x-1/2"
          >

          </motion.div>
        </motion.div>
      </section>

      {/* ═══ SECTION 2: STORY-DRIVEN OVERVIEW (Split Screen) ════════════════ */}
      <section className="relative py-32 bg-gradient-to-b from-[#030814] to-[#040c1a]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <div className="relative" data-aos="fade-right">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0A66C2]/20 to-[#00D4FF]/20 rounded-3xl blur-xl" />
            <LazyImage src={cityImg} alt="Tashkent City" className="relative w-full h-[500px] object-cover rounded-3xl border border-white/5" />
            {/* Floating badge */}

          </div>

          {/* Text side */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 mb-4">
              <Star className="w-4 h-4 text-[#FFD700]" />
              <span className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest">A Century of Excellence in Medical Education</span>
            </div>
            <h3 className="text-2xl font-bold text-white/90 mb-6 tracking-tight">Tashkent State Medical University</h3>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Where Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A66C2] to-[#00D4FF]">Legends Begin</span>
            </h2>

            <div className="space-y-6 mb-10">
              <p className="text-[#8ba8c4] text-lg leading-loose">
                Established in 1920, Tashkent State Medical University is one of the oldest and most established medical university in Central Asia, with a long tradition of training qualified healthcare professionals. Over the years, the university has contributed to medical education and healthcare development by producing graduates who serve in various healthcare systems worldwide.
              </p>
              <p className="text-[#8ba8c4] text-lg leading-loose">
                Today, it offers a structured medical program designed for international students, including a significant number of Indian students, with English-medium instruction and a focus on both theoretical knowledge and clinical training. Students benefit from academic exposure in a culturally rich and developing healthcare environment in Uzbekistan’s capital city.
              </p>
            </div>

            <div className="mb-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <Star className="w-5 h-5 text-[#FFD700]" />
                Key Highlights:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'English-Medium Instruction',
                  'Recognized as per NMC eligibility guidelines',
                  'International Student-Friendly Environment',
                  'Strong Clinical Training Exposure'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-[#00D4FF] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(0,212,255,0.5)]" />
                    <span className="text-[#a8c8e8] text-base group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: WHY TMA — Animated Icon Grid ════════════════════════ */}
      <section className="py-32 relative bg-[#040c1a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,102,194,0.1)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Choose Tashkent State  <span className="text-[#00D4FF]">  Medical University?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0A66C2] to-[#00D4FF] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, title: 'Early Clinical Exposure', desc: 'Students are introduced to clinical environments at an early stage, gaining supervised exposure to patient care alongside academic learning.', delay: 0 },
              { icon: Globe2, title: 'International Career Pathways', desc: 'Graduates pursue medical careers and licensing pathways in multiple countries, including India and other regions, subject to respective regulatory requirements.', delay: 100 },
              { icon: Microscope, title: 'Strong Academic & Research Focus', desc: 'The university promotes research-oriented learning with access to modern laboratories and academic support in key medical disciplines.', delay: 200 },
              { icon: Users, title: 'Diverse International Environment', desc: 'A multicultural campus with students from various countries helps build global communication and professional skills.', delay: 300 },
              { icon: BookOpen, title: 'English-Medium Instruction', desc: 'The MBBS program is delivered in English for international students, with additional language support where required.', delay: 400 },
              { icon: FlaskConical, title: 'Modern Clinical Training Facilities', desc: 'Students train in affiliated hospitals and clinical departments equipped for practical medical education and diagnostics.', delay: 500 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: delay / 1000 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0,212,255,0.15)' }}
                className="group p-8 rounded-2xl bg-[#040c1a] border border-white/5 hover:border-[#00D4FF]/30 transition-all duration-500 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A66C2]/30 to-[#00D4FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-[#00D4FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-[#6a8faa] leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION: PROGRAM DETAILS ═══════════════════════════════════════ */}
      <section className="py-20 relative bg-[#030814] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Program <span className="text-[#00D4FF]">Details</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0A66C2] to-[#00D4FF] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Duration */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl bg-[#040c1a] border border-white/5 hover:border-[#00D4FF]/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8 text-[#00D4FF]" />
              </div>
              <h3 className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-3 font-bold">Program Duration</h3>
              <p className="text-2xl font-black text-white">6 Years MBBS</p>
              <div className="mt-4 px-4 py-1.5 rounded-full bg-[#00D4FF]/5 border border-[#00D4FF]/10 inline-block">
                <span className="text-sm text-[#00D4FF] font-medium">5 Years Academic + 1 Year Internship</span>
              </div>
            </motion.div>

            {/* Medium */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl bg-[#040c1a] border border-white/5 hover:border-[#00D4FF]/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Globe2 className="w-8 h-8 text-[#00D4FF]" />
              </div>
              <h3 className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-3 font-bold">Medium of Instruction</h3>
              <p className="text-2xl font-black text-white">ENGLISH</p>
              <div className="mt-4 px-4 py-1.5 rounded-full bg-[#00D4FF]/5 border border-[#00D4FF]/10 inline-block">
                <span className="text-sm text-[#00D4FF] font-medium">Full English Curriculum</span>
              </div>
            </motion.div>

            {/* Fees */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl bg-[#040c1a] border border-white/5 hover:border-[#00D4FF]/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3 className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-3 font-bold">Annual Tuition Fees</h3>
              <p className="text-2xl font-black text-white">₹ 3 LAKHS</p>
              <div className="mt-4 px-4 py-1.5 rounded-full bg-[#FFD700]/5 border border-[#FFD700]/10 inline-block">
                <span className="text-sm text-[#FFD700] font-medium">Approx. Per Year</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* ═══ SECTION 6: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#00D4FF" />

      {/* ═══ SECTION: STUDENT JOURNEY — Timeline ═══════════════════════════ */}
      <section className="py-20 md:py-32 relative bg-[#030814]">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Your Journey at <span className="text-[#00D4FF]">TSMU</span>
            </h2>
            <p className="text-[#6a8faa] text-sm md:text-base">
              From aspiring student to world-class physician — each step crafted by decades of excellence.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line → desktop only */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF]/0 via-[#00D4FF]/40 to-[#00D4FF]/0" />

            {[
              { step: '01', emoji: '🌟', title: 'The Dream', desc: 'You decide to pursue an MBBS degree. We guide you through the eligibility assessment and application process for admission.  .' },
              { step: '02', emoji: '📋', title: 'Admission', desc: '    Assistance with documentation, admission process, visa guidance, and pre-departure briefing provided by our support team. .' },
              { step: '03', emoji: '🏛️', title: 'Campus Life', desc: '  Experience a structured academic environment with student hostels, campus facilities, and a multicultural international student community.' },
              { step: '04', emoji: '🩺', title: 'You Are a Doctor', desc: '  Complete your MBBS program and graduate with a recognized medical degree, opening pathways for licensing exams and global medical careers.' },
            ].map(({ step, emoji, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`
                  relative flex mb-10 md:mb-16
                  justify-center md:${i % 2 === 0 ? 'justify-start' : 'justify-end'}
                `}
              >
                {/* Dot → desktop only */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-5 h-5 rounded-full bg-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.8)] z-10" />

                {/* Card */}
                <div
                  className={`
                    w-full md:w-[45%]
                    p-6 md:p-8
                    rounded-2xl
                    bg-[#040c1a]
                    border border-white/5
                    hover:border-[#00D4FF]/30
                    transition-all duration-300
                    text-center md:${i % 2 !== 0 ? 'text-right' : 'text-left'}
                  `}
                >
                  <div className="text-3xl md:text-4xl mb-3">{emoji}</div>
                  <div className="text-[#00D4FF]/60 text-xs font-bold uppercase tracking-widest mb-2">
                    Step {step}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-[#6a8faa] leading-relaxed text-sm md:text-base">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION: CAMPUS GALLERY — Coverflow Swiper ═══════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[#040c1a] to-[#030814] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Campus <span className="text-[#00D4FF]">Experience</span>
          </h2>
          <p className="text-[#6a8faa] max-w-xl mx-auto">A balanced academic environment where historic medical education meets modern teaching and laboratory facilities</p>
        </div>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 200, modifier: 1.5, slideShadows: true }}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          watchSlidesProgress
          className="w-full py-12 [&_.swiper-slide]:max-w-[420px]"
        >
          {[bgImg, cityImg, campusImg, campus2, campus3].map((src, i) => (
            <SwiperSlide key={i}>
              <motion.div whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-3xl group cursor-pointer">
                <img 
                  src={src} 
                  alt={`Campus ${i + 1}`} 
                  loading="lazy"
                  className="w-full h-[300px] lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 border-2 border-[#00D4FF]/0 group-hover:border-[#00D4FF]/40 rounded-3xl transition-all duration-500 shadow-[inset_0_0_30px_rgba(0,212,255,0)] group-hover:shadow-[inset_0_0_30px_rgba(0,212,255,0.1)]" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ═══ SECTION: STUDENT SUPPORT SERVICES ═══════════════════════════════ */}
      <section className="py-16 md:py-32 relative bg-[#040c1a] border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Student Support <span className="text-[#00D4FF]">Services</span>
            </h2>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-[#0A66C2] to-[#00D4FF] mx-auto mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: ShieldCheck, title: 'Admission Guidance & documentation support', desc: 'Expert assistance with application forms and comprehensive documentation support for a hassle-free process.' },
              { icon: Globe2, title: 'Visa Assistance', desc: 'Complete guidance for student visa application and documentation.' },
              { icon: Plane, title: 'Pre-Departure Briefing', desc: 'Thorough orientation covering travel, local culture, and essential preparations before you fly.' },
              { icon: HeartHandshake, title: 'Airport Pickup assistance', desc: 'Safe and reliable airport reception and transfer to the campus upon your arrival in Uzbekistan.' },
              { icon: Home, title: 'Hostel Arrangement Support', desc: 'Priority support in securing comfortable and secure on-campus or nearby accommodation.' },
              { icon: Utensils, title: 'Indian Food availability guidances', desc: 'Orientation on local Indian mess facilities, grocery availability, and authentic dining options.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:y-[-10px] hover:bg-white/10"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#0A66C2]/20 to-[#00D4FF]/10 flex items-center justify-center mb-5 md:mb-6">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#00D4FF]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 leading-tight">{title}</h3>
                <p className="text-[#a8c8e8] text-xs md:text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST COUNTERS ═════════════════════════════════════════════════ */}



      <section className="py-20 md:py-32 bg-[#040c1a] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,212,255,0.03)_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { target: 5000, suffix: '+', label: 'International Students Trained across various medical programs' },
              { target: 100, suffix: '+', label: 'Years of Academic Legacy in medical education (Est. 1920)' },
              { target: 50, suffix: '+', label: 'Countries contributing to a diverse learning environment' },
              { label: 'Strong Academic & Clinical Outcomes with high success rates in licensing pathways such as FMGE/NEXT (as applicable)' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(0,212,255,0.3)' }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] text-center"
              >
                {stat.target ? (
                  <Counter
                    target={stat.target}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                ) : (
                  <div className="text-[#a8c8e8] text-xs md:text-sm leading-relaxed font-medium">
                    {stat.label}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════════════ */}
      {/* ═══ TASHKENT STATE PHARMACEUTICAL AND MEDICAL UNIVERSITY ═════════════ */}
      {/* ════════════════════════════════════════════════════════════════════════ */}
      
      <div id="tspmu" className="w-full h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-30 mt-10 mb-20" />

      <section className="relative py-20 bg-[#030814] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 mb-6">
            <Star className="w-4 h-4 text-[#FFD700]" />
            <span className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest">A Center of Excellence</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Tashkent State Pharmaceutical <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A66C2] to-[#00D4FF]">And Medical University</span>
          </h2>
          
          <p className="text-xl text-white font-semibold mb-8">Shape Your Future in Global Healthcare</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-[#00D4FF]" />
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-tighter">Location</p>
                <p className="text-sm font-medium text-white">Tashkent, Uzbekistan</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center gap-3">
              <Star className="w-5 h-5 text-[#00D4FF]" />
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-tighter">Established</p>
                <p className="text-sm font-medium text-white">1937</p>
              </div>
            </div>
          </div>

          <p className="text-[#8ba8c4] text-lg max-w-4xl mx-auto leading-relaxed font-light mb-6">
            A prestigious university at the heart of Central Asia, Tashkent State Pharmaceutical and Medical University stands as a center of excellence in both medical and pharmaceutical education.
          </p>
          <p className="text-[#8ba8c4] text-lg max-w-4xl mx-auto leading-relaxed font-light">
            With a legacy of innovation, advanced research infrastructure, and globally aligned curriculum, the university prepares students to become highly competent doctors and healthcare professionals worldwide.
          </p>
        </div>
      </section>

      {/* Legacy & Why Choose */}
      <section className="py-20 bg-gradient-to-b from-[#030814] to-[#040c1a]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
              A Legacy That Builds <br/><span className="text-[#00D4FF]">Doctors, Innovators & Leaders</span>
            </h3>
            <p className="text-[#8ba8c4] text-lg leading-loose mb-6">
              For over 85 years, the university has been a driving force in shaping the future of healthcare education.
            </p>
            <p className="text-[#8ba8c4] text-lg leading-loose">
              Blending <strong className="text-white text-xl">medical science with pharmaceutical expertise</strong>, it offers a unique academic environment where students gain both theoretical depth and hands-on clinical experience. Its graduates are now practicing across multiple countries, contributing to global healthcare systems.
            </p>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm" data-aos="fade-left">
            <h4 className="text-white font-bold text-2xl mb-8 flex items-center gap-3">
              <ClipboardCheck className="w-6 h-6 text-[#00D4FF]" />
              Why Students Choose Us
            </h4>
            <div className="space-y-4">
              {[
                'Globally recognized degree (WHO & NMC aligned)',
                'Dual strength in Medicine & Pharmaceutical Sciences',
                'Affordable MBBS with high-quality education',
                'English-medium programs for international students',
                'Advanced labs & modern research facilities',
                'Strong hospital tie-ups for real clinical exposure',
                'Safe, developed capital city environment',
                'Indian food, hostels & student support available'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <ShieldCheck className="w-5 h-5 text-[#00D4FF] mt-0.5 shrink-0" />
                  <span className="text-[#a8c8e8] text-base group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 relative bg-[#030814] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Program <span className="text-[#00D4FF]">Overview</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0A66C2] to-[#00D4FF] mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: 'Degree', value: 'MBBS (General Medicine)' },
              { icon: Globe2, title: 'Duration', value: '6 Years (Incl. Internship)' },
              { icon: BookOpen, title: 'Medium', value: 'English' },
              { icon: Star, title: 'Annual Tuition Fees', value: '₹3 Lakhs' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-[#040c1a] border border-white/5 hover:border-[#00D4FF]/30 transition-all text-center">
                <div className="w-14 h-14 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center mb-5 mx-auto">
                  <item.icon className="w-7 h-7 text-[#00D4FF]" />
                </div>
                <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">{item.title}</h3>
                <p className="text-xl font-black text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Made Simple */}
      <section className="py-20 bg-[#040c1a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-black text-white mb-4">Admission <span className="text-[#00D4FF]">Made Simple</span></h2>
            <p className="text-[#6a8faa]">Start your journey with a smooth and guided admission process</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 rounded-3xl bg-[#030814] border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Eligibility Criteria</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#00D4FF] font-bold mb-2">Academic Requirement</h4>
                  <p className="text-[#8ba8c4] text-sm">Minimum <strong className="text-white">50% in Physics, Chemistry, and Biology (PCB)</strong> as per NMC guidelines.</p>
                </div>
                <div>
                  <h4 className="text-[#00D4FF] font-bold mb-2">NEET Qualification</h4>
                  <p className="text-[#8ba8c4] text-sm">Candidates must have qualified NEET-UG in the current or previous two years, as per NMC regulations.</p>
                </div>
                <div>
                  <h4 className="text-[#00D4FF] font-bold mb-2">Age Requirement</h4>
                  <p className="text-[#8ba8c4] text-sm">Applicants must be at least 17 years old.</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-3xl bg-[#030814] border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Required Documents</h3>
              <p className="text-xs text-[#00D4FF] mb-6 uppercase tracking-wider font-bold">Both scanned and originals</p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#00D4FF] font-bold mb-2">Identity Documents</h4>
                  <ul className="text-[#8ba8c4] text-sm list-disc list-inside space-y-1">
                    <li>Valid Passport</li>
                    <li>Aadhar card</li>
                    <li>Passport-size photographs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#00D4FF] font-bold mb-2">Academic Documents</h4>
                  <ul className="text-[#8ba8c4] text-sm list-disc list-inside space-y-1">
                    <li>10th Marksheet</li>
                    <li>12th Marksheet</li>
                    <li>NEET Scorecard</li>
                    <li>Medical Fitness Certificate if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-[#00D4FF]/5 border border-[#00D4FF]/20 text-center">
            <p className="text-[#a8c8e8] text-sm leading-relaxed">
              <strong>Note:</strong> All documents must be notarized and apostilled as per international admission requirements. <br/>
              Our counseling team provides complete guidance throughout the admission and documentation process.
            </p>
          </div>
        </div>
      </section>

      {/* Your Journey */}
      <section className="py-20 relative bg-[#030814]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Your Journey – Step Into <span className="text-[#00D4FF]">Your Medical Career</span>
            </h2>
            <p className="text-[#6a8faa]">From application to arrival — everything is streamlined for your success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { step: '1', title: 'Apply & Submit Documents' },
              { step: '2', title: 'Get Admission Letter' },
              { step: '3', title: 'Complete Visa Process' },
              { step: '4', title: 'Fly to Uzbekistan' },
              { step: '5', title: 'Join University & Orientation' },
              { step: '6', title: 'Begin Your MBBS Journey' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#040c1a] border border-white/5 relative overflow-hidden group hover:border-[#00D4FF]/30 transition-all">
                <div className="absolute -right-4 -top-4 text-7xl font-black text-white/5 group-hover:text-[#00D4FF]/10 transition-colors">{item.step}</div>
                <div className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest mb-3">Step {item.step}</div>
                <h3 className="text-lg font-bold text-white relative z-10">{item.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#040c1a] to-[#030814] border border-white/5 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Complete Student Support by our team</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'End-to-end admission assistance',
                'Visa & documentation guidance',
                'Pre-departure briefing',
                'Airport pickup & accommodation support',
                'Continuous student assistance abroad'
              ].map((item, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#a8c8e8] text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Life in Tashkent */}
      <section className="py-20 bg-[#040c1a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Experience Life in <span className="text-[#00D4FF]">Tashkent</span></h2>
            <p className="text-[#6a8faa]">Studying in Tashkent means living in one of the most developed and student-friendly cities in Central Asia.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4" data-aos="fade-right">
              <img src={campusImg} alt="" className="rounded-2xl w-full h-48 object-cover" />
              <img src={campus2} alt="" className="rounded-2xl w-full h-48 object-cover" />
              <img src={cityImg} alt="" className="rounded-2xl w-full h-48 object-cover col-span-2" />
            </div>
            <div className="space-y-4" data-aos="fade-left">
              {[
                'Modern infrastructure & safe environment',
                'Comfortable hostel accommodations',
                'Indian & international food options',
                'Multicultural student community',
                'Advanced labs, libraries & learning spaces',
                'Balanced academic & lifestyle experience'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                  <span className="text-[#a8c8e8] font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-20 md:py-32 bg-[#030814] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Our <span className="text-[#00D4FF]">Global Impact</span></h2>
            <p className="text-[#6a8faa] mb-2">A strong track record that builds confidence and trust.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { target: 5000, suffix: '+', label: 'Students successfully placed worldwide' },
              { target: 50, suffix: '+', label: 'Countries represented on campus' },
              { target: 30, suffix: '+', label: 'Clinical training hospitals' },
              { target: 92, suffix: '%', label: 'FMGE Passing Success Rate' },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center flex flex-col justify-center min-h-[180px]">
                <Counter target={stat.target} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Take the First Step */}
      <section className="relative py-20 bg-[#040c1a] text-center overflow-hidden border-t border-white/5">
        <div className="relative z-10 px-6 max-w-4xl mx-auto" data-aos="zoom-in">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Take the First Step Toward <span className="text-[#00D4FF]">Your Dream</span>
          </h2>
          <p className="text-[#8ba8c4] text-lg mb-8 font-light">
            Your ambition deserves the right platform. <br className="hidden md:block"/>
            Tashkent State Pharmaceutical and Medical University gives you the knowledge, exposure, and global recognition to succeed.
          </p>
          <div className="space-y-4">
            <p className="text-white text-xl md:text-2xl font-black italic leading-relaxed">
              “The future doctor you dream of becoming starts here.”
            </p>
            <p className="text-[#00D4FF] text-lg md:text-xl font-bold italic opacity-90">
              “One decision today can define your entire medical career.”
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-30 mt-10 mb-20" />


      {/* ═══ FINAL CTA ══════════════════════════════════════════════════════ */}


      <section className="relative py-20 md:py-40 bg-[#030814] flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 px-4 md:px-6 max-w-3xl mx-auto" data-aos="zoom-in">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Start Your  Medical Journey
            <span className="text-[#00D4FF]"> Today</span>
          </h2>

          {/* Paragraph */}
          <p className="text-[#8ba8c4] text-sm sm:text-base md:text-xl mb-8 md:mb-14 font-light leading-relaxed px-2 sm:px-0">
            Begin your medical education at Tashkent State Medical University and take the first step toward an international medical career
          </p>

          {/* Button */}
          <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Tashkent Medical Academy' }))}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,212,255,0.5)' }}
              whileTap={{ scale: 0.96 }}
              className="group relative 
          px-8 sm:px-10 md:px-14 
          py-3 md:py-5 
          rounded-full 
          bg-gradient-to-r from-[#0A66C2] to-[#00D4FF] 
          text-white 
          font-bold md:font-black 
          text-sm sm:text-base md:text-xl 
          uppercase 
          tracking-wide md:tracking-widest 
          overflow-hidden 
          shadow-[0_0_30px_rgba(0,212,255,0.3)]"
            >

              {/* Shine */}
              <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

              {/* Content */}
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                Apply To TSMU
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>

              {/* Ping only desktop */}
              <span className="hidden md:block absolute inset-0 rounded-full border-2 border-[#00D4FF]/40 animate-ping" />

            </motion.button>
          </button>

        </div>
      </section>



    </div>
  );
};

export default TashkentMedicalAcademy;
