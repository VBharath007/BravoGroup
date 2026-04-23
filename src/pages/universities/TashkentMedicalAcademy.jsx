import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import { Stethoscope, Microscope, FlaskConical, Globe2, GraduationCap, BookOpen, ShieldCheck, Users, ArrowRight, MapPin, Star } from 'lucide-react';
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
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-[#00D4FF] mb-2">{count.toLocaleString()}{suffix}</div>
      <div className="text-gray-300 text-sm uppercase tracking-widest font-semibold">{label}</div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
const TashkentMedicalAcademy = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef();

  useEffect(() => {
    // AOS initialized globally
    window.scrollTo(0, 0);
  }, []);

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
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/10 backdrop-blur-md mb-8"
          >
            <MapPin className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-[#00D4FF] text-sm font-bold uppercase tracking-[0.25em]">Tashkent, Uzbekistan · Est. 1920</span>
          </motion.div>

          {/* Staggered title */}
          <div className="overflow-hidden mb-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-wrap justify-center gap-x-4 gap-y-2"
            >
              {['Tashkent', 'Medical', 'Academy'].map((word, wi) => (
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-xl text-[#a8c8e8] max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            A century of forging physicians. The oldest, most decorated medical institution in Central Asia — where legends of healing were born.
          </motion.p>

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/20 mb-6">
              <Star className="w-4 h-4 text-[#FFD700]" />
              <span className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest">A Century of Excellence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Where Medical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A66C2] to-[#00D4FF]">Legends Begin</span>
            </h2>
            <p className="text-[#8ba8c4] text-lg leading-loose mb-6">
              Founded in 1920, Tashkent Medical Academy carries the weight of a century and the ambition of tomorrow. Long before Central Asia's medical landscape modernized, TMA was already shaping surgeons, researchers, and public health champions who would go on to serve continents — not just countries.
            </p>
            <p className="text-[#8ba8c4] text-lg leading-loose">
              Today, thousands of Indian students walk its corridors, immersed in a globally recognized, WHO-listed curriculum taught in English, surrounded by the cultural richness of Uzbekistan's dynamic capital. This isn't just an institution — it's an origin story for the world's best physicians.
            </p>
            <div className="mt-10 flex gap-4 flex-wrap">
              {[{ icon: ShieldCheck, text: 'WHO Listed' }, { icon: Globe2, text: 'NMC Approved' }, { icon: GraduationCap, text: 'English Medium' }].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2]/15 border border-[#0A66C2]/20">
                  <Icon className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-sm font-semibold text-white">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: WHY TMA — Animated Icon Grid ════════════════════════ */}
      <section className="py-32 relative bg-[#040c1a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,102,194,0.1)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why Tashkent Medical <span className="text-[#00D4FF]">Academy?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0A66C2] to-[#00D4FF] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, title: 'Clinical from Day One', desc: 'Live patient interaction begins in the very first semester alongside senior physicians.', delay: 0 },
              { icon: Globe2, title: 'Global Recognition', desc: 'TMA graduates practice in 50+ countries. Degree valid across Europe, Asia, USA licensing exams.', delay: 100 },
              { icon: Microscope, title: 'Research Powerhouse', desc: 'State-of-the-art labs producing breakthrough publications in immunology and oncology.', delay: 200 },
              { icon: Users, title: '40+ Nationalities', desc: 'A diverse international campus—learn medicine while building a global professional network.', delay: 300 },
              { icon: BookOpen, title: 'English-Medium', desc: 'Full 6-year curriculum delivered in English with local language support modules.', delay: 400 },
              { icon: FlaskConical, title: 'Advanced Diagnostics', desc: 'Modern pathology, radiology, and histology units rivaling European medical campuses.', delay: 500 },
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

      {/* ═══ SECTION 4: CAMPUS GALLERY — Coverflow Swiper ═══════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[#040c1a] to-[#030814] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Campus <span className="text-[#00D4FF]">Experience</span>
          </h2>
          <p className="text-[#6a8faa] max-w-xl mx-auto">Immerse yourself in the world-class infrastructure that defines TMA — from its historic facades to its cutting-edge labs.</p>
        </div>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 200, modifier: 1.5, slideShadows: true }}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          loop
          modules={[EffectCoverflow, Autoplay, Pagination]}
          pagination={{ clickable: true }}
          className="w-full py-12 [&_.swiper-slide]:max-w-[420px]"
        >
          {[bgImg, cityImg, campusImg, campus2, campus3].map((src, i) => (
            <SwiperSlide key={i}>
              <motion.div whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-3xl group cursor-pointer">
                <LazyImage src={src} alt={`Campus ${i + 1}`} className="w-full h-[300px] lg:h-[400px] object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030814]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white font-bold text-lg">TMA – Tashkent Campus {i + 1}</div>
                </div>
                <div className="absolute inset-0 border-2 border-[#00D4FF]/0 group-hover:border-[#00D4FF]/40 rounded-3xl transition-all duration-500 shadow-[inset_0_0_30px_rgba(0,212,255,0)] group-hover:shadow-[inset_0_0_30px_rgba(0,212,255,0.1)]" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ═══ SECTION 5: STUDENT JOURNEY — Timeline ═══════════════════════════ */}

      <section className="py-20 md:py-32 relative bg-[#030814]">

        <div className="max-w-5xl mx-auto px-4 md:px-6">

          {/* Heading */}
          <div className="text-center mb-12 md:mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Your Journey at <span className="text-[#00D4FF]">TMA</span>
            </h2>
            <p className="text-[#6a8faa] text-sm md:text-base">
              From aspiring student to world-class physician — each step crafted by decades of excellence.
            </p>
          </div>

          <div className="relative">

            {/* Vertical line → desktop only */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF]/0 via-[#00D4FF]/40 to-[#00D4FF]/0" />

            {[
              { step: '01', emoji: '🌟', title: 'The Dream', desc: 'You decide to pursue MBBS. We guide you through the entire selection process specifically designed for TMA applicants.' },
              { step: '02', emoji: '📋', title: 'Admission', desc: 'Streamlined documentation, visa support, and pre-departure orientation – fully handled by our expert counselors.' },
              { step: '03', emoji: '🏛️', title: 'Campus Life', desc: 'Arrive into a world-class campus. World-class hostel facilities, cafeterias, and a vibrant international community await.' },
              { step: '04', emoji: '🩺', title: 'You Are a Doctor', desc: 'Graduate with a globally recognized MBBS degree and step confidently into the medical world, ready to serve.' },
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



      {/* ═══ SECTION 6: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#00D4FF" />

      {/* ═══ TRUST COUNTERS ═════════════════════════════════════════════════ */}



      <section className="py-16 md:py-24 bg-[#040c1a] border-y border-white/5">

        <div className="max-w-5xl mx-auto px-4 md:px-6 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
    gap-6 md:gap-12 text-center">

          <Counter target={5000} label="Students Placed" suffix="+" />
          <Counter target={104} label="Years of Legacy" suffix="+" />
          <Counter target={50} label="Countries Served" suffix="+" />
          <Counter target={97} label="Success Rate %" suffix="%" />

        </div>

      </section>


      {/* ═══ FINAL CTA ══════════════════════════════════════════════════════ */}

      <section className="relative py-20 md:py-40 bg-[#030814] flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.07)_0%,transparent_70%)]" />

        <div className="relative z-10 px-4 md:px-6 max-w-3xl mx-auto" data-aos="zoom-in">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Start Your Journey
            <span className="text-[#00D4FF]"> Today</span>
          </h2>

          {/* Paragraph */}
          <p className="text-[#8ba8c4] text-sm sm:text-base md:text-xl mb-8 md:mb-14 font-light leading-relaxed px-2 sm:px-0">
            Your medical legacy is waiting. Join thousands of students who chose TMA and never looked back.
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
                Apply To TMA
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
