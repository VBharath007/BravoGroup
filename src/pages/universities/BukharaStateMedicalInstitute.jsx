import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Stethoscope, Microscope, Globe2, ShieldCheck, ArrowRight, MapPin, ChevronDown, FlaskConical, RefreshCcw, UserCheck, Syringe, Building2, Banknote, GraduationCap, BookOpen, Languages } from 'lucide-react';




import AdmissionProtocol from '../../components/ui/AdmissionProtocol';
import LazyImage from '../../components/Lazyimage';





// Assets are now served from the public/assets directory
const bgImg = '/assets/bukharanewimages/bukharauniversityfrontimages.jpeg';

const campus1 = '/assets/bukharanewimages/bukhara2.jpeg';
const campus2 = '/assets/bukharanewimages/bukhara3.jpeg';
const campus3 = '/assets/bukharanewimages/bukhara5.jpeg';
const campus4 = '/assets/bukharanewimages/bukharauniversityfrontimages.jpeg';



// ── Amber Ember Particles (Scroll-Synced) ────────────────────────────────────
function EmberParticles({ scrollProgress }) {
  const ref = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 800 : 2500;

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
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;


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
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden" onMouseMove={handleMouseMove} style={{ perspective: '1200px' }}>
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <EmberParticles scrollProgress={scrollYProgress} />
          </Canvas>
        </div>

        <motion.div style={{ y: heroY, rotateX: heroRotate, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0800] via-[#0e0800]/85 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(245,158,11,0.15)_0%,transparent_60%)]" />
        </motion.div>



        <motion.div
          className="fixed inset-0 z-50 pointer-events-none mix-blend-screen opacity-30"
          animate={{ background: `radial-gradient(circle 500px at ${mouse.x}% ${mouse.y}%, rgba(245,158,11,0.12) 0%, transparent 70%)` }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />


        {/* Content — Centered Alignment */}
        <div className="relative z-10 px-6 md:px-16 max-w-5xl pt-20 md:pt-28 text-center mx-auto">


          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 backdrop-blur-md mb-8">
            <MapPin className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-[#f59e0b] text-[10px] md:text-sm font-bold uppercase tracking-[0.25em]">Bukhara — The Holy City of Central Asia</span>
          </motion.div>

          <div className="mb-8">
            {['Bukhara State', 'Medical', 'Institute'].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
                  style={{ color: i === 1 ? '#f59e0b' : 'white' }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl text-[#c4a572] max-w-2xl mb-12 leading-relaxed font-light mx-auto">

            A trusted destination for future doctors, combining rich heritage with modern medical
            education. The institute offers NMC & WHO recognized MBBS programs, strong clinical
            training, and a safe, student-friendly environment for international students.
          </motion.p>


          {/* Badges — Centered Alignment */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4 mb-10">

            <div className="group flex items-center gap-3 px-6 py-3 rounded-xl sm:rounded-2xl border border-white/10 md:border-[#f59e0b]/30 bg-[#f59e0b]/5 backdrop-blur-xl hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]/60 transition-all shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#f59e0b] font-black uppercase tracking-tighter opacity-70">Location</span>
                <span className="text-white text-sm font-bold max-w-[200px] leading-tight">1, A.Navoi street, BUKHARA, Uzbekistan</span>
              </div>
            </div>

            <div className="group flex items-center gap-3 px-6 py-3 rounded-xl sm:rounded-2xl border border-white/10 md:border-[#f59e0b]/30 bg-[#f59e0b]/5 backdrop-blur-xl hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]/60 transition-all shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-[#f59e0b] font-black uppercase tracking-tighter opacity-70">Established</span>
                <span className="text-white text-sm font-bold">1990</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}
            className="flex justify-center mb-6">

            <p className="text-[#f59e0b] text-[10px] md:text-sm font-bold uppercase tracking-[0.2em]">
              Start your medical journey with confidence.
            </p>
          </motion.div>

        </div>

        {/* Right side doctor image partial */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="absolute right-0 bottom-0 h-[90%] w-auto z-0 hidden lg:block pointer-events-none"
        >
        </motion.div>

      </section>

      {/* ═══ SECTION 2: STORY — 3D PARALLAX STORYTELLING ═══════════════════ */}



      <section className="py-16 md:py-32 bg-[#0e0800] relative overflow-hidden" style={{ perspective: '1500px' }}>


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
              Where practical skills are developed alongside <br className="hidden md:block" />
              <span className="text-[#f59e0b]">academic excellence from day one</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">

            {/* LEFT CARD — Separated Image and Text */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              data-aos="fade-right"
              className="lg:w-1/2 flex flex-col rounded-3xl overflow-hidden border border-[#2a1a00] shadow-2xl bg-[#1a0f00]"
            >
              {/* Image Container */}
              <div className="h-72 relative overflow-hidden group">
                <LazyImage
                  src={bgImg}
                  alt="Bukhara State Medical Institute"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f00] via-transparent to-transparent" />
              </div>

              {/* Text Content Container (Separate from Image) */}
              <div className="p-8 sm:p-10 flex flex-col justify-center bg-gradient-to-br from-[#1a0f00] to-[#0e0800]">
                <div className="text-[#f59e0b] text-6xl sm:text-7xl font-black mb-4 select-none opacity-80">
                  BSMI
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-white mb-6 tracking-tight">
                  The Avicenna Legacy
                </h3>

                <p className="text-[#c4a572] text-sm sm:text-base leading-relaxed font-light">
                  At Bukhara State Medical Institute, we carry forward the legacy of Avicenna, one of the
                  greatest physicians in history. Inspired by his timeless work, The Canon of Medicine,
                  the institute blends classical medical knowledge with modern scientific advancements to
                  prepare the next generation of global doctors.
                </p>

              </div>
            </motion.div>


            {/* RIGHT CARDS */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              {[
                {
                  title: 'The Clinical Promise',
                  desc: 'Early hands-on clinical exposure from Year 1, guided by experienced medical specialists.'
                },
                {
                  title: 'Global Exchange',
                  desc: 'Opportunities for international exposure through academic partnerships, research programs, and clinical rotations.'
                },
                {
                  title: 'Student Safety First',
                  desc: 'A safe, secure, and student-friendly environment in the historic city of Bukhara.'
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

                  <p className="text-white/70 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </section>



      {/* ═══ SECTION 3: WHY BSMI — 3D INTERACTIVE CARDS ════════════════════ */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-[#0e0800] to-[#1a0f00] overflow-hidden" style={{ perspective: '1200px' }}>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter"
            >
              Why choose <span className="text-[#f59e0b] relative">
                BUKHARA STATE MEDICAL INSTITUTE
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#b45309] to-[#f59e0b] rounded-full"
                />
              </span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Stethoscope, title: 'Early Clinical Exposure', desc: 'Start hands-on clinical training from the first year, gaining real hospital experience under expert supervision.' },
              { icon: Globe2, title: 'Globally Recognized Degree', desc: 'The MBBS degree is recognized by major international bodies, making graduates eligible for licensing exams and postgraduate opportunities worldwide.' },
              { icon: RefreshCcw, title: 'International Exposure', desc: 'Benefit from academic collaborations and exchange programs with leading European institutions, offering global learning.' },
              { icon: FlaskConical, title: 'Advanced Medical Laboratories', desc: 'Modern laboratories equipped for biochemistry, pathology, and molecular studies ensure strong practical learning.' },
              { icon: UserCheck, title: 'Simple Admission Process', desc: 'A smooth and transparent admission procedure with no local entrance exam, making it easier to secure your seat.' },
              { icon: ShieldCheck, title: 'Safe & Student-Friendly Environment', desc: 'Located in the historic city of Bukhara, the institute offers a safe, secure atmosphere with 24/7 student support.' },
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
                className="group p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-[#1a0f00] border border-white/5 md:border-white/10 hover:border-[#f59e0b]/40 transition-all duration-300 relative overflow-hidden cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#b45309]/30 to-[#f59e0b]/10 flex items-center justify-center mb-6 md:mb-8 border border-[#f59e0b]/20 group-hover:rotate-[360deg] transition-transform duration-1000">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-[#f59e0b]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-[#f59e0b] transition-colors">{title}</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center" data-aos="fade-up">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Bukhara State Medical Institute' }))}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(245,158,11,0.4)' }}
                whileTap={{ scale: 0.96 }}
                className="group relative inline-flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 rounded-full bg-gradient-to-r from-[#b45309] to-[#f59e0b] text-[#0e0800] font-black text-base md:text-xl uppercase tracking-[0.2em] overflow-hidden shadow-[0_20px_40px_rgba(180,83,9,0.2)]"
              >
                <motion.span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative flex items-center gap-2 md:gap-3">
                  Apply Now
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </motion.button>
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3.5: PROGRAM DETAILS ═══════════════════════════════════ */}
      <section className="py-24 bg-[#0e0800] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">Program <span className="text-[#f59e0b]">Details</span></h2>
            <p className="text-[#c4a572] uppercase tracking-widest text-sm font-bold">Academic Structure & Investment</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, label: 'Academic Program', value: '6 Years MBBS Program' },
              { icon: BookOpen, label: 'Program Structure', value: '(5 Years Academic + 1 Year Internship)' },
              { icon: Languages, label: 'Medium of Instruction', value: 'ENGLISH' },
              { icon: Banknote, label: 'FEES', value: '2.5 LAKHS PER YEAR' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/5 md:border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-[#f59e0b]/30 transition-all text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <p className="text-[10px] text-[#f59e0b] font-black uppercase tracking-widest mb-2 opacity-70">{item.label}</p>
                <p className="text-white font-bold text-sm sm:text-base">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION: ADMISSION PROTOCOL ══════════════════════════════════════ */}
      <AdmissionProtocol themeAccent="#f59e0b" bgColor="#0e0800" />

      {/* ═══ SECTION 4: CAMPUS GALLERY — Swiper Coverflow ══════════════════ */}
      <section className="py-16 md:py-32 bg-[#1a0f00] overflow-hidden relative">


        <div className="max-w-7xl mx-auto px-6 mb-16 text-center" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Inside <span className="text-[#f59e0b]">Bukhara</span></h2>
          <p className="text-[#c4a572] max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Where ancient heritage meets modern medical education in a world-class academic environment.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[bgImg, campus1, campus2, campus3].map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={isMobile ? {} : { y: -12 }} 
              className="relative overflow-hidden rounded-[2rem] aspect-[4/5] group cursor-pointer border border-white/10 shadow-2xl bg-[#1a0f00]"
            >
              <LazyImage 
                src={src} 
                alt={`Campus Image ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0800]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Border Highlight */}
              <div className="absolute inset-0 border-2 border-[#f59e0b]/0 group-hover:border-[#f59e0b]/30 rounded-[2rem] transition-all duration-500" />
            </motion.div>
          ))}
        </div>



      </section>

      {/* ═══ SECTION 5: JOURNEY — 3D PARALLAX STEPPER ═══════════════════════ */}
      <section className="py-32 bg-[#0e0800] relative overflow-hidden" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase">Your Transformation at <span className="text-[#f59e0b]">BSMI</span></h2>
            <p className="text-[#c4a572] uppercase tracking-widest text-sm font-bold">The Roadmap to Becoming a Doctor</p>
          </div>

          <div className="grid md:grid-cols-4 gap-0 relative mb-20">
            <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent" />
            {[
              { icon: '💡', title: 'Vision & Admission Guidance', desc: 'Our counselling team guides you through the complete admission process—from eligibility assessment to receiving your official offer letter.' },
              { icon: '✈️', title: 'Travel & Arrival Support', desc: 'Assistance with visa process, travel coordination, and airport pickup ensures a smooth transition to campus life.' },
              { icon: '🏥', title: 'Learn by Doing', desc: 'Begin early clinical exposure with simulation-based training, lab practice, and supervised patient interaction under experienced faculty.' },
              { icon: '👨‍⚕️', title: 'Become a Global Doctor', desc: 'Complete a recognized MBBS program accepted for licensing exams such as NMC screening and other international medical pathways.' },
            ].map(({ icon, title, desc }, i) => (
              <motion.div key={i}
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
                <div className="text-[#f59e0b]/60 text-xs uppercase tracking-widest font-bold mb-2">PHASE {i + 1}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f59e0b] transition-colors leading-tight">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center" data-aos="fade-up">
            <motion.p
              className="text-[#f59e0b] text-xl md:text-2xl font-bold italic max-w-4xl mx-auto leading-relaxed"
            >
              {"A structured journey designed to transform students into confident, globally competent doctors.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </div>
      </section>



      {/* ═══ COUNTERS ════════════════════════════════════════════════════════ */}

      <section className="py-16 sm:py-20 md:py-24 bg-[#1a0f00] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 
    gap-6 md:gap-8 text-center">
          <Counter target={4500} label="Students prepared for international medical practice" suffix="+" />
          <Counter target={40} label="Countries connected through academic partnerships" suffix="+" />
          <Counter target={15} label="European exchange & clinical collaboration programs" suffix="+" />
          <Counter target={96} label="Success rate in NMC licensing examinations" suffix="%" />
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
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 tracking-tight md:tracking-tighter leading-tight uppercase">
              Begin in <span className="text-[#f59e0b] drop-shadow-[0_0_20px_rgba(245,158,11,0.5)] md:drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">Bukhara.</span>
              <br className="hidden sm:block" />
              Lead the World.
            </h2>

            {/* Paragraph */}
            <p className="text-[#c4a572] text-xs sm:text-sm md:text-lg lg:text-xl mb-10 md:mb-16 font-light max-w-xl md:max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              A structured pathway from medical student to globally recognized doctor—built on
              academic excellence, clinical experience, and international opportunities.
            </p>

            {/* Button */}
            <button onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: 'Bukhara State Medical Institute' }))}>
              <motion.button
                whileHover={{ scale: 1.05, rotateY: 5, boxShadow: '0 0 60px rgba(245,158,11,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-6 sm:px-8 md:px-12 py-2 md:py-4 rounded-full bg-gradient-to-r from-[#b45309] to-[#f59e0b] text-[#0e0800] font-bold md:font-black text-xs sm:text-sm md:text-lg uppercase tracking-wide md:tracking-widest overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.4)]"
              >
                {/* Shine */}
                <motion.span
                  className="absolute inset-0 bg-white/25"
                  initial={{ x: "-100%", skewX: -12 }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7 }}
                />

                {/* Content */}
                <span className="relative flex items-center justify-center gap-2 md:gap-3">
                  APPLY NOW
                  <ArrowRight className="w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-500" />
                </span>

                {/* Ping → desktop only */}
                <span className="hidden md:block absolute inset-0 rounded-full border-4 border-[#f59e0b]/20 animate-ping" />
              </motion.button>
            </button>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default BukharaStateMedicalInstitute;

