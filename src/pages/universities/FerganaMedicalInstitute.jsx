import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Stethoscope, Microscope, Globe2, ShieldCheck, ArrowRight, MapPin, ChevronDown, ActivitySquare, TestTube, BadgeCheck, BookOpen } from 'lucide-react';
import AdmissionProtocol from '../../components/ui/AdmissionProtocol';
import LazyImage from '../../components/Lazyimage';

// Assets are now served from the public/assets directory
const bgImg = '/assets/fergonna2.webp';
const bgImg1 = '/assets/fer3.webp';
const campus1 = '/assets/FerganLibrary.webp';
const campus2 = '/assets/ferganaclassroom.webp';
const campus3 = '/assets/FerganamedicalPracticals2.webp';
const campus4 = '/assets/Ferganamedicalpractice.webp';

// ── Cyan Tech Particles ──────────────────────────────────────────────────────
// ── Cyan Tech Particles with Burst ──────────────────────────────────────────
function TechParticles({ burst }) {
  const ref = useRef();
  const count = 2200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
  }
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.06;
      ref.current.rotation.x = Math.cos(s.clock.elapsedTime * 0.015) * 0.15;
      const scale = burst ? 1.4 + Math.sin(s.clock.elapsedTime * 15) * 0.2 : 1;
      ref.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#06b6d4" size={0.022} sizeAttenuation depthWrite={false} opacity={0.5} />
    </Points>
  );
}

function FloatingIcon({ icon: Icon, delay = 0, x = "0%", y = "0%", size = "w-12 h-12" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1], y: ["0px", "-30px", "0px"] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute ${size} text-[#06b6d4]/10 pointer-events-none z-0`}
      style={{ left: x, top: y }}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  );
}

function BurstFlare({ active }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={active ? { opacity: [0, 0.6, 0], scale: [0, 2, 2.5] } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_70%)]"
    />
  );
}

function MouseGlow({ mouse }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-20"
      animate={{
        background: `radial-gradient(circle 400px at ${mouse.x}% ${mouse.y}%, rgba(6,182,212,0.15) 0%, transparent 70%)`
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
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
    <div ref={ref} data-aos="flip-up" className="text-center p-8 rounded-2xl bg-[#001a1e]/60 border border-[#06b6d4]/20 hover:border-[#06b6d4]/50 transition-all hover:bg-[#06b6d4]/5 group">
      <div className="text-5xl font-black text-[#06b6d4] mb-2 group-hover:scale-110 transition-transform">{count.toLocaleString()}{suffix}</div>
      <div className="text-[#4a9aaa] text-sm uppercase tracking-widest font-semibold">{label}</div>
    </div>
  );
}


const FerganaMedicalInstitute = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 180]);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    // AOS initialized globally
    window.scrollTo(0, 0);

    let timeoutId;
    const interval = setInterval(() => {
      setBurst(true);
      timeoutId = setTimeout(() => setBurst(false), 1500);
    }, 5000);
    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);


  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, []);

  return (
    <div className="bg-[#010c0e] text-white overflow-x-hidden font-sans selection:bg-[#06b6d4]/30">
      <MouseGlow mouse={mouse} />

      {/* ═══ SECTION 1: TECH CYAN HERO — FULL BG + RIGHT FLOAT IMAGE ════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove}>
        <BurstFlare active={burst} />

        {/* Floating Background Icons */}
        <FloatingIcon icon={Stethoscope} x="10%" y="15%" delay={0} />
        <FloatingIcon icon={Microscope} x="85%" y="20%" delay={1} />
        <FloatingIcon icon={ActivitySquare} x="75%" y="70%" delay={2} />
        <FloatingIcon icon={TestTube} x="15%" y="80%" delay={3} />

        <div className="absolute inset-0 z-0 opacity-35">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <TechParticles burst={burst} />
          </Canvas>
        </div>


        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <LazyImage src={bgImg} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#010c0e] via-[#010c0e]/85 to-[#010c0e]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(6,182,212,0.1)_0%,transparent_60%)]" />
        </motion.div>

        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(circle 500px at ${mouse.x}% ${mouse.y}%, rgba(6,182,212,0.07) 0%, transparent 70%)` }} />

        {/* Left content */}
        <div className="relative z-10 px-6 md:px-16 max-w-3xl pt-28">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#06b6d4]/40 bg-[#06b6d4]/10 backdrop-blur-md mb-8">
            <MapPin className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-[#06b6d4] text-sm font-bold uppercase tracking-[0.25em]">Fergana — Gateway to Innovation</span>
          </motion.div>

          <div className="mb-8">
            {['Fergana Medical', 'Institute of', 'Public Health'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
                  style={{ color: i === 1 ? '#06b6d4' : 'white' }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }}
            className="text-xl text-[#60a8b8] max-w-xl mb-12 leading-relaxed font-light">
            Central Asia's rising hub for public health innovation. Where EU-partnered research meets intensive clinical methodology — forging tomorrow's global health leaders.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap gap-4">
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Fergana Medical Institute of Public Health' }))}>
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(6,182,212,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#0369a1] to-[#06b6d4] text-white font-bold text-lg uppercase tracking-widest overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center gap-3">Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
            </button>
          </motion.div>


        </div>

        {/* Right — floating doctor images */}

        <div className="absolute right-0 bottom-0 top-0 w-[45%] hidden lg:flex flex-col items-end justify-end z-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[80%] w-auto"
          >
            <LazyImage
              src={bgImg}
              alt=""
              className="h-full w-auto object-cover rounded-xl shadow-2xl skew-y-[-5deg] rotate-[5deg] translate-x-12 translate-y-12"
            />
          </motion.div>
        </div>


      </section>

      {/* ═══ SECTION 2: STORY — Full-Width Immersive Banner ════════════════ */}
      <section className="relative py-32 bg-[#010c0e] overflow-hidden">
        <FloatingIcon icon={BookOpen} x="90%" y="40%" delay={1} size="w-16 h-16" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 items-center">
            {/* 3-col content */}
            <div className="lg:col-span-3" data-aos="fade-right" data-aos-duration="1200">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block px-4 py-1.5 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/25 text-[#06b6d4] text-xs font-bold uppercase tracking-widest mb-6"
              >
                Europe's Medical Partner in Fergana
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                The Future of <span className="text-[#06b6d4]">Public Health</span><br />Starts Here
              </h2>
              <p className="text-[#4a9aaa] text-lg leading-loose mb-6" data-aos="fade-up" data-aos-delay="100">
                Fergana Medical Institute of Public Health occupies a unique position in the medical world: it is the only institution in Uzbekistan specifically built around the disciplines of public health, preventive medicine, and epidemiology — backed by direct collaboration with European medical universities.
              </p>
              <p className="text-[#4a9aaa] text-lg leading-loose" data-aos="fade-up" data-aos-delay="200">
                Indian students here find themselves not just studying medicine — they're immersed in a globally connected research ecosystem, working alongside faculty who have published in The Lancet, BMJ, and WHO's own technical bulletins. This is medicine at its most ambitious level.
              </p>
            </div>
            {/* 2-col image */}
            <div className="lg:col-span-2" data-aos="zoom-in-left" data-aos-delay="150">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#0369a1]/20 to-[#06b6d4]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <LazyImage src={bgImg1} alt="" className="relative w-full max-w-[420px] h-[480px] object-cover rounded-3xl mx-auto border border-[#06b6d4]/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:scale-[1.02] transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: WHY FMIPH — Icon Grid with Animated Borders ════════ */}
      <section className="relative py-32 bg-gradient-to-b from-[#010c0e] to-[#001a1e] overflow-hidden">
        <FloatingIcon icon={BadgeCheck} x="5%" y="60%" delay={2} size="w-20 h-20" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20" data-aos="fade-down">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why <span className="text-[#06b6d4]">FMIPH?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0369a1] to-[#06b6d4] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ActivitySquare, title: 'Public Health Specialization', desc: 'The only Uzbekistan institution purpose-built around public health, prevention, and epidemiology.', aos: 'fade-up-right' },
              { icon: BadgeCheck, title: 'EU Academic Partnerships', desc: 'Active academic partnerships with European medical schools for joint electives and research.', aos: 'fade-up' },
              { icon: TestTube, title: 'State-of-the-Art Diagnostics', desc: 'Next-generation molecular biology, PCR diagnostics, and public health laboratory systems.', aos: 'fade-up-left' },
              { icon: BookOpen, title: 'Research-First Culture', desc: 'Faculty publish in WHO bulletins, The Lancet, and BMJ. Students co-author from Year 2.', aos: 'fade-down-right' },
              { icon: Globe2, title: 'Global Health Vision', desc: 'Curriculum designed for physicians who want to serve at WHO, UN, and international health NGOs.', aos: 'fade-down' },
              { icon: ShieldCheck, title: 'NMC / WHO Listed', desc: 'Full global recognition. Pursue licensing in India, USA, UK, EU, Canada — anywhere.', aos: 'fade-down-left' },
            ].map(({ icon: Icon, title, desc, aos }, i) => (
              <motion.div key={title}
                data-aos={aos}
                data-aos-delay={i * 100}
                whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(6,182,212,0.2)' }}
                className="group p-8 rounded-2xl bg-[#001a1e] border border-white/5 hover:border-[#06b6d4]/40 transition-all duration-500 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#06b6d4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0369a1]/30 to-[#06b6d4]/10 flex items-center justify-center mb-6 group-hover:rotate-[360deg] transition-transform duration-1000">
                  <Icon className="w-7 h-7 text-[#06b6d4]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#06b6d4] transition-colors">{title}</h3>
                <p className="text-[#2a6a7a] leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ SECTION 4: CAMPUS GALLERY — Coverflow ══════════════════════════ */}
      <section className="py-32 bg-[#001a1e] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The <span className="text-[#06b6d4]">Fergana</span> Campus</h2>
          <p className="text-[#2a6a7a] max-w-xl mx-auto">Where innovation thrives in a city that bridges ancient traditions and a bold medical future.</p>
        </div>
        <Swiper effect="coverflow" grabCursor centeredSlides slidesPerView="auto"
          coverflowEffect={{ rotate: 25, stretch: 0, depth: 220, modifier: 1.5, slideShadows: true }}
          autoplay={{ delay: 2800, disableOnInteraction: false }} loop
          modules={[EffectCoverflow, Autoplay, Pagination]} pagination={{ clickable: true }}
          className="w-full py-12 [&_.swiper-slide]:max-w-[420px]">
          {[bgImg, campus1, campus2, campus3, campus4].map((src, i) => (
            <SwiperSlide key={i}>
              <motion.div whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-3xl group cursor-pointer">
                <LazyImage src={src} alt={`Campus ${i + 1}`} className="w-full h-[360px] object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010c0e]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-[#06b6d4]/0 group-hover:border-[#06b6d4]/40 rounded-3xl transition-all duration-500 shadow-[inset_0_0_40px_rgba(6,182,212,0)] group-hover:shadow-[inset_0_0_40px_rgba(6,182,212,0.08)]" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ═══ SECTION 5: STUDENT JOURNEY — horizontal cards ══════════════════ */}
      <section className="py-32 bg-[#010c0e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Your Path at <span className="text-[#06b6d4]">FMIPH</span></h2>
            <p className="text-[#2a6a7a]">Four transformational phases that take you from aspiration to global medical leadership.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '1', icon: '🌐', color: '#06b6d4', title: 'Global Aspiration', desc: 'You see medicine as more than a career — it\'s your calling to transform public health. We understand that vision.', aos: 'fade-up' },
              { num: '2', icon: '📝', color: '#0369a1', title: 'Seamless Admission', desc: 'Our FMIPH specialists process your application, visa, and pre-arrival support from start to finish.', aos: 'fade-down' },
              { num: '3', icon: '🔬', color: '#06b6d4', title: 'EU-Grade Research', desc: 'Join labs where faculty publish in The Lancet. Contribute to real public health research from Year 2.', aos: 'fade-up' },
              { num: '4', icon: '🌍', color: '#0369a1', title: 'Global Health Leader', desc: 'Graduate with credentials that open doors at WHO, UN, and international health bodies worldwide.', aos: 'fade-down' },
            ].map(({ num, icon, color, title, desc, aos }, i) => (
              <motion.div key={num}
                data-aos={aos}
                data-aos-delay={i * 150}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 rounded-2xl bg-[#001a1e] border border-white/5 hover:border-[#06b6d4]/30 transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                <div className="text-4xl mb-5 group-hover:scale-125 transition-transform duration-500">{icon}</div>
                <div className="text-[#06b6d4]/60 text-xs font-bold uppercase tracking-widest mb-3">Phase {num}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#06b6d4] transition-colors">{title}</h3>
                <p className="text-[#2a6a7a] text-sm leading-relaxed">{desc}</p>
                <div className="absolute -bottom-2 -right-2 text-6xl font-black text-white/5 group-hover:text-[#06b6d4]/10 transition-colors">{num}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ SECTION 6: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#06b6d4" />

      {/* ═══ COUNTERS ════════════════════════════════════════════════════════ */}


      <section className="py-16 md:py-24 bg-[#001a1e] border-y border-white/5">

        <div className="max-w-5xl mx-auto px-4 md:px-6 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
    gap-6 md:gap-8 text-center">

          <Counter target={2800} label="Students Placed" suffix="+" />
          <Counter target={12} label="EU Partner Schools" suffix="+" />
          <Counter target={30} label="Global Countries" suffix="+" />
          <Counter target={94} label="Clinical Pass Rate" suffix="%" />

        </div>

      </section>



      {/* ═══ FINAL CTA ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-40 bg-[#010c0e] flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]" />

        <BurstFlare active={burst} />

        <div className="relative z-10 px-4 md:px-6 max-w-3xl mx-auto" data-aos="zoom-in-up">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight">
            Heal the World-
            <br className="hidden sm:block" />
            <span className="text-[#06b6d4]">From Fergana.</span>
          </h2>

          {/* Paragraph */}
          <p
            className="text-[#60a8b8] text-sm sm:text-base md:text-xl mb-8 md:mb-14 font-light px-2 sm:px-0"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Fergana Medical Institute of Public Health — where your medical journey becomes a global movement.
          </p>

          {/* Button */}
          <button onClick={() => setIsFormOpen(true)}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(6,182,212,0.5)' }}
              whileTap={{ scale: 0.96 }}
              className="group relative 
          px-8 sm:px-10 md:px-14 
          py-3 md:py-5 
          rounded-full 
          bg-gradient-to-r from-[#0369a1] to-[#06b6d4] 
          text-white 
          font-bold md:font-black 
          text-sm sm:text-base md:text-xl 
          uppercase 
          tracking-wide md:tracking-widest 
          overflow-hidden 
          shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >

              {/* Shine */}
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", skewX: -12 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.7 }}
              />

              {/* Content */}
              <span className="relative flex items-center justify-center gap-2 md:gap-3">
                Apply to FMIPH
                <ArrowRight className="w-4 h-4 md:w-7 md:h-7 group-hover:translate-x-2 md:group-hover:translate-x-3 transition-transform duration-500" />
              </span>

              {/* Ping animation only for desktop */}
              <span className="hidden md:block absolute inset-0 rounded-full border-4 border-[#06b6d4]/20 animate-ping" />

            </motion.button>
          </button>

        </div>
      </section>



    </div>
  );
};

export default FerganaMedicalInstitute;
