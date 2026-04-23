import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
import { Stethoscope, Microscope, Globe2, ShieldCheck, ArrowRight, MapPin, ChevronDown, FlaskConical, RefreshCcw, UserCheck, Syringe } from 'lucide-react';
import AdmissionProtocol from '../../components/ui/AdmissionProtocol';
import Footer from '../../components/Footer';
import LazyImage from '../../components/Lazyimage';



// Assets are now served from the public/assets directory
const bgImg = '/assets/BUKHARA-STATE-MEDICAL-UNIVERSITY.webp';
const studImg = '/assets/dr_vikram.webp';
const campus1 = '/assets/Bukharanet1.webp';
const campus2 = '/assets/bukahranet2.webp';
const campus3 = '/assets/bukaranet4.webp';
const campus4 = '/assets/bukharanet3.webp';

// ── Amber Ember Particles (Scroll-Synced) ────────────────────────────────────
function EmberParticles({ scrollProgress }) {
  const ref = useRef();
  const count = 2500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return pos;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      const scroll = scrollProgress ? scrollProgress.get() : 0;
      ref.current.rotation.y = s.clock.elapsedTime * 0.05 + scroll * 2;
      ref.current.rotation.z = s.clock.elapsedTime * 0.03 + scroll * 1.5;
      ref.current.position.z = Math.sin(s.clock.elapsedTime * 0.5) * 0.5 + scroll * 4;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#f59e0b" size={0.03} sizeAttenuation depthWrite={false} opacity={0.6} />
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
    <div ref={ref} className="text-center p-8 rounded-2xl bg-[#1a0f00]/60 border border-[#f59e0b]/20 hover:border-[#f59e0b]/50 transition-all">
      <div className="text-5xl font-black text-[#f59e0b] mb-2">{count.toLocaleString()}{suffix}</div>
      <div className="text-[#b8965a] text-sm uppercase tracking-widest font-semibold">{label}</div>
    </div>
  );
}

const BukharaStateMedicalInstitute = () => {

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 250]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.4], [0, 10]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);
  const storyRotate = useTransform(scrollYProgress, [0.1, 0.5], [5, 0]);
  const storyOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

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
    <div className="bg-[#0e0800] text-white overflow-x-hidden font-sans selection:bg-[#f59e0b]/30">

      {/* ═══ SECTION 1: AMBER HERO — DIAGONAL SPLIT ════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove} style={{ perspective: '1200px' }}>
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <EmberParticles scrollProgress={scrollYProgress} />
          </Canvas>
        </div>

        <motion.div style={{ y: heroY, rotateX: heroRotate, scale: heroScale }} className="absolute inset-0 z-0">
          <LazyImage src={bgImg} alt="" className="w-full h-full object-cover opacity-35 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0800] via-[#0e0800]/85 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(245,158,11,0.15)_0%,transparent_60%)]" />
        </motion.div>

        <motion.div
          className="fixed inset-0 z-50 pointer-events-none mix-blend-screen opacity-30"
          animate={{ background: `radial-gradient(circle 500px at ${mouse.x}% ${mouse.y}%, rgba(245,158,11,0.12) 0%, transparent 70%)` }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />


        {/* Content — LEFT ALIGNED */}
        <div className="relative z-10 px-6 md:px-16 max-w-4xl pt-28">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 backdrop-blur-md mb-8">
            <MapPin className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-[#f59e0b] text-sm font-bold uppercase tracking-[0.25em]">Bukhara — The Holy City of Central Asia</span>
          </motion.div>

          <div className="mb-8">
            {['Bukhara State', 'Medical', 'Institute'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
                  style={{ color: i === 1 ? '#f59e0b' : 'white' }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="text-xl text-[#c4a572] max-w-xl mb-12 leading-relaxed font-light">
            In the shadow of minarets and the scent of ancient spice markets — a modern medical powerhouse rises. Clinical-first, globally competitive, deeply human.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap gap-4">
            <button onClick={() => setIsFormOpen(true)}>
              <motion.button whileHover={{ scale: 1.06, boxShadow: '0 0 60px rgba(245,158,11,0.45)' }} whileTap={{ scale: 0.97 }}
                className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-[#b45309] to-[#f59e0b] text-[#0e0800] font-bold text-lg uppercase tracking-widest overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative flex items-center gap-3">Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </motion.button>
            </button>

          </motion.div>

        </div>

        {/* Right side doctor image partial */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="absolute right-0 bottom-0 h-[90%] w-auto z-0 hidden lg:block pointer-events-none"
        >
          <LazyImage src={studImg} alt="" className="h-full w-auto object-contain" />
        </motion.div>
      </section>

      {/* ═══ SECTION 2: STORY — 3D PARALLAX STORYTELLING ═══════════════════ */}



      <section className="py-32 bg-[#0e0800] relative overflow-hidden" style={{ perspective: '1500px' }}>

        {/* Ambient background (no opacity, pure gradient fade) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#2a1a00_0%,#0e0800_70%)] pointer-events-none" />

        <motion.div
          style={{ rotateX: storyRotate }} // removed opacity completely
          className="max-w-7xl mx-auto px-6 relative z-10"
        >

          {/* HEADER */}
          <div className="text-center mb-20" data-aos="fade-down">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a1200] border border-[#f59e0b] text-[#f59e0b] text-xs font-bold uppercase tracking-widest mb-6">
              A Clinical-First Institution
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Where Hands Heal Before <span className="text-[#f59e0b]">Books Close</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">

            {/* LEFT CARD */}
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              data-aos="fade-right"
              className="lg:w-1/2 relative p-10 rounded-3xl overflow-hidden min-h-[450px] flex flex-col justify-end border border-[#2a1a00] shadow-2xl bg-[#1a0f00]"
            >

              {/* Background Image (no opacity, use blend instead) */}
              <LazyImage
                src={bgImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover "
              />

              {/* Strong gradient overlay (no opacity usage) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0800] via-[#0e0800] to-transparent" />

              {/* CONTENT */}
              <div className="relative z-10">
                <div className="text-[#f59e0b] text-7xl font-black mb-4 select-none">
                  BSMI
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  The Avicenna Legacy
                </h3>

                <p className="text-[#c4a572] text-lg leading-relaxed">
                  Bukhara State Medical Institute is the spiritual successor to Abu Ali ibn Sino (Avicenna), whose "Canon of Medicine" guided doctors for centuries. Today, we fuse that ancient wisdom with modern molecular research.
                </p>
              </div>
            </motion.div>

            {/* RIGHT CARDS */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              {[
                {
                  title: 'The Clinical Promise',
                  desc: 'Direct patient interaction from Year 1, mentored by the nation\'s top specialists.'
                },
                {
                  title: 'Global Exchange',
                  desc: 'MoUs with European hubs provide access to international research and rotation opportunities.'
                },
                {
                  title: 'Student Safety First',
                  desc: 'Study in Central Asia\'s safest and most welcoming historical city environment.'
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  data-aos="fade-left"
                  data-aos-delay={idx * 150}
                  whileHover={{
                    x: 15,
                    scale: 1.02,
                    backgroundColor: '#221400'
                  }}
                  className="p-8 rounded-2xl bg-[#1a0f00] border border-[#2a1a00] hover:border-[#f59e0b] transition-all cursor-default"
                >
                  <h3 className="text-2xl font-bold text-[#f59e0b] mb-4">
                    {card.title}
                  </h3>

                  <p className="text-[#9a7a4a] leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </section>



      {/* ═══ SECTION 3: WHY BSMI — 3D INTERACTIVE CARDS ════════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[#0e0800] to-[#1a0f00] overflow-hidden" style={{ perspective: '1200px' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20" data-aos="fade-down">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Why <span className="text-[#f59e0b]">BSMI?</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#b45309] to-[#f59e0b] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Stethoscope, title: 'Year-1 Clinical Access', desc: 'Bedside training from semester one. No waiting — direct hands-on patient interaction.' },
              { icon: RefreshCcw, title: 'EU Exchange Programs', desc: 'Study rotations in European hospitals through active institutional partnerships.' },
              { icon: FlaskConical, title: 'High-End Tech Labs', desc: 'Cutting-edge biochemistry, pathology, and molecular biology labs on campus.' },
              { icon: Globe2, title: 'Global Recognition', desc: 'Degree accepted in India, EU, UK, US, Australia for licensing and postgrad programs.' },
              { icon: UserCheck, title: 'Direct Admission', desc: 'No entrance exam in Uzbekistan. Streamlined process — apply, get accepted, arrive.' },
              { icon: ShieldCheck, title: 'Safest Campus', desc: 'Bukhara is Central Asia\'s most welcoming city. 24/7 campus security and support.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                data-aos={i % 2 === 0 ? "zoom-in-right" : "zoom-in-left"}
                data-aos-delay={i * 100}
                whileHover={{
                  rotateY: (mouse.x - 50) * 0.2,
                  rotateX: (mouse.y - 50) * -0.2,
                  translateZ: 20,
                  boxShadow: '0 25px 80px rgba(245,158,11,0.2)'
                }}
                className="group p-8 rounded-3xl bg-[#1a0f00] border border-white/5 hover:border-[#f59e0b]/40 transition-all duration-300 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#b45309]/30 to-[#f59e0b]/10 flex items-center justify-center mb-8 border border-[#f59e0b]/20 group-hover:rotate-[360deg] transition-transform duration-1000">
                  <Icon className="w-8 h-8 text-[#f59e0b]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#f59e0b] transition-colors">{title}</h3>
                <p className="text-[#a88a5a] leading-relaxed line-clamp-3">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ SECTION 4: CAMPUS GALLERY — Swiper Coverflow ══════════════════ */}
      <section className="py-32 bg-[#1a0f00] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Inside <span className="text-[#f59e0b]">Bukhara</span></h2>
          <p className="text-[#7a5e30] max-w-xl mx-auto">Ancient meet futuristic — BSMI's state-of-the-art facilities sit within one of Central Asia's most historically rich cities.</p>
        </div>
        <Swiper effect="coverflow" grabCursor centeredSlides slidesPerView="auto"
          coverflowEffect={{ rotate: 30, stretch: 0, depth: 200, modifier: 1.5, slideShadows: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }} loop
          modules={[EffectCoverflow, Autoplay, Pagination]} pagination={{ clickable: true }}
          className="w-full py-12 [&_.swiper-slide]:max-w-[420px]">
          {[bgImg, campus1, campus2, campus3, campus4].map((src, i) => (
            <SwiperSlide key={i}>
              <motion.div whileHover={{ scale: 1.03 }} className="relative overflow-hidden rounded-3xl group cursor-pointer">
                <LazyImage src={src} alt={`Campus ${i + 1}`} className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0800]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-[#f59e0b]/0 group-hover:border-[#f59e0b]/40 rounded-3xl transition-all duration-500" />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ═══ SECTION 5: JOURNEY — 3D PARALLAX STEPPER ═══════════════════════ */}
      <section className="py-32 bg-[#0e0800] relative overflow-hidden" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Your Transformation at <span className="text-[#f59e0b]">BSMI</span></h2>
            <p className="text-[#7a5e30] uppercase tracking-widest text-sm font-bold">The Roadmap to Excellence</p>
          </div>

          <div className="grid md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent" />
            {[
              { icon: '💡', step: '1', title: 'Vision & Apply', desc: 'Our counselors map out your BSMI admission pathway — from eligibility to your offer letter.' },
              { icon: '✈️', step: '2', title: 'Fly & Land', desc: 'Visa, flight assistance, airport pickup — we handle everything until you step on campus.' },
              { icon: '🏥', step: '3', title: 'Learn by Doing', desc: 'Immediate clinical exposure, simulation labs, and senior-mentored patient interaction.' },
              { icon: '👨‍⚕️', step: '4', title: 'Become a Doctor', desc: 'BSMI MBBS — recognized by NMC, WHO, and medical boards across 40+ countries.' },
            ].map(({ icon, step, title, desc }, i) => (
              <motion.div key={step}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                whileHover={{ y: -15, scale: 1.05 }}
                className="flex flex-col items-center text-center p-8 relative z-10 group"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#b45309]/30 to-[#f59e0b]/20 flex items-center justify-center text-4xl mb-6 border border-[#f59e0b]/20 shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] transition-all"
                >
                  {icon}
                </motion.div>
                <div className="text-[#f59e0b]/60 text-xs uppercase tracking-widest font-bold mb-2">Phase {step}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f59e0b] transition-colors">{title}</h3>
                <p className="text-[#7a5e30] text-sm leading-relaxed">{desc}</p>

                {/* Parallax background number */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-black text-white/[0.03] pointer-events-none group-hover:text-[#f59e0b]/10 transition-colors">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: ADMISSION PROTOCOL — ELIGIBILITY & DOSSIER ══════════ */}
      <AdmissionProtocol themeAccent="#f59e0b" />

      {/* ═══ COUNTERS ════════════════════════════════════════════════════════ */}

      <section className="py-16 sm:py-20 md:py-24 bg-[#1a0f00] border-y border-white/5">

        <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 
    gap-6 md:gap-8 text-center">

          <Counter target={4500} label="Students Placed" suffix="+" />
          <Counter target={40} label="Partner Countries" suffix="+" />
          <Counter target={15} label="EU Exchange Schools" suffix="+" />
          <Counter target={96} label="NMC Success Rate" suffix="%" />

        </div>

      </section>



      {/* ═══ FINAL CTA — 3D GLOW PORTAL ═════════════════════════════════════ */}


      <section className="relative py-24 md:py-40 lg:py-52 bg-[#0e0800] flex items-center justify-center text-center overflow-hidden" style={{ perspective: '1200px' }}>

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)]" />

        {/* Rings (responsive size) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] border border-[#f59e0b]/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] border border-[#f59e0b]/5 rounded-full"
        />

        <div className="relative z-10 px-4 md:px-6 max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 tracking-tight md:tracking-tighter leading-tight">
              Begin in <span className="text-[#f59e0b] drop-shadow-[0_0_20px_rgba(245,158,11,0.5)] md:drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">Bukhara.</span>
              <br className="hidden sm:block" />
              Lead the World.
            </h2>

            {/* Paragraph */}
            <p className="text-[#c4a572] text-sm sm:text-base md:text-xl lg:text-2xl mb-10 md:mb-16 font-light max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Where 1,000-year-old healing wisdom meets cutting-edge clinical science. Your destination for a global medical career.
            </p>

            {/* Button */}
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Bukhara State Medical Institute' }))}>
              <motion.button
                whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 0 60px rgba(245,158,11,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="group relative 
            px-8 sm:px-10 md:px-14 lg:px-16 
            py-3 md:py-5 lg:py-6 
            rounded-full 
            bg-gradient-to-r from-[#b45309] to-[#f59e0b] 
            text-[#0e0800] 
            font-bold md:font-black 
            text-sm sm:text-base md:text-xl lg:text-2xl 
            uppercase 
            tracking-wide md:tracking-widest lg:tracking-[0.2em] 
            overflow-hidden 
            shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >

                {/* Shine */}
                <motion.span
                  className="absolute inset-0 bg-white/25"
                  initial={{ x: "-100%", skewX: -12 }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7 }}
                />

                {/* Content */}
                <span className="relative flex items-center justify-center gap-2 md:gap-3 lg:gap-4">
                  Apply to BSMI
                  <ArrowRight className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 group-hover:translate-x-2 md:group-hover:translate-x-3 transition-transform duration-500" />
                </span>

                {/* Ping → desktop only */}
                <span className="hidden md:block absolute inset-0 rounded-full border-4 border-[#f59e0b]/20 animate-ping" />

              </motion.button>
            </button>

          </motion.div>
        </div>
      </section>


      <div className="bg-[#0e0800]"><Footer /></div>
    </div>
  );
};

export default BukharaStateMedicalInstitute;
