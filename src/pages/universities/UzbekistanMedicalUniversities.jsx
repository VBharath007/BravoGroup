import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { MapPin, Star, GraduationCap, Globe2, BookOpen, ArrowRight, ShieldCheck, ClipboardCheck, CheckCircle2, HeartPulse, Building2, Plane, Utensils, Users, Microscope, Award, FileText } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Assets (Using existing ones)
const campusImg = '/assets/takshnet1.webp';
const campus2 = '/assets/takshnet2.webp';
const cityImg = '/assets/takshnet5.webp';

const StatCard = ({ label, value, theme }) => (
  <div
    className="p-5 sm:p-8 rounded-3xl bg-white/5 border border-white/10 text-center transition-all backdrop-blur-sm group hover:bg-white/[0.08]"
    style={{ borderColor: theme?.primary ? `${theme.primary}33` : 'rgba(255, 255, 255, 0.1)' }}
  >
    <p
      className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform"
      style={{ color: theme?.primary || '#00D4FF' }}
    >
      {value}
    </p>
    <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 font-bold tracking-widest uppercase">{label}</p>
  </div>
);

const VfxLayer = ({ theme }) => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.5 + 3) % 98}%`,
    top: `${(i * 11.3 + 5) % 95}%`,
    size: (i % 3) * 1.5 + 1.5,
    duration: 4 + (i % 5),
    delay: (i % 6) * 0.6,
  }));
  return (
    <>
      <style>{`
        @keyframes vfx-blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(50px,-40px) scale(1.12)} 66%{transform:translate(-30px,25px) scale(0.94)} }
        @keyframes vfx-blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-60px,35px) scale(1.08)} 66%{transform:translate(40px,-50px) scale(0.90)} }
        @keyframes vfx-blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,50px) scale(1.15)} }
        @keyframes vfx-float { 0%,100%{transform:translateY(0px) scale(1);opacity:0.35} 50%{transform:translateY(-22px) scale(1.3);opacity:1} }
        @keyframes vfx-scan { 0%{top:-2px;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0} }
      `}</style>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', filter: 'blur(130px)', background: theme.primary, opacity: 0.13, top: '-180px', left: '-120px', animation: 'vfx-blob1 9s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(110px)', background: theme.secondary, opacity: 0.11, bottom: '-120px', right: '-100px', animation: 'vfx-blob2 11s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', filter: 'blur(90px)', background: theme.primary, opacity: 0.07, top: '40%', left: '45%', animation: 'vfx-blob3 13s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: `linear-gradient(${theme.primary} 1px, transparent 1px), linear-gradient(90deg, ${theme.primary} 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent 0%, ${theme.primary}80 40%, ${theme.primary} 50%, ${theme.primary}80 60%, transparent 100%)`, filter: 'blur(1.5px)', animation: 'vfx-scan 5s linear infinite' }} />
        {particles.map(p => (
          <div key={p.id} style={{ position: 'absolute', left: p.left, top: p.top, width: p.size + 'px', height: p.size + 'px', borderRadius: '50%', background: theme.primary, boxShadow: `0 0 ${p.size * 4}px ${p.size * 2}px ${theme.primary}60`, animation: `vfx-float ${p.duration}s ease-in-out infinite ${p.delay}s` }} />
        ))}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: `1px solid ${theme.primary}25` }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: `1px solid ${theme.primary}18` }} />
      </div>
    </>
  );
};

const UniversitySection = ({ uni, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const theme = uni.theme || {
    primary: '#00D4FF',
    secondary: '#00D4FF',
    bg: uni.heroBg ? '#020a1a' : (index % 2 === 0 ? '#030814' : '#040c1a'),
    textMuted: '#8ba8c4',
    glow: 'rgba(0, 212, 255, 0.3)'
  };

  return (
    <section
      id={uni.id}
      ref={ref}
      className={`py-16 sm:py-24 md:py-40 border-y border-white/5 scroll-mt-24 overflow-hidden relative`}
      style={{ backgroundColor: theme.bg }}
    >
      {/* ✨ VFX Special Effect Layer */}
      {uni.vfx && <VfxLayer theme={theme} />}

      {/* 🌟 Premium Background Image Implementation 🌟 */}
      {uni.heroBg && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={uni.heroBg}
            alt=""
            className="w-full h-full object-cover opacity-30 md:opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020a1a] via-[#020a1a]/50 to-[#020a1a] md:via-transparent" />
          <div className="absolute inset-0 bg-[#020a1a]/60 md:bg-[#020a1a]/40" />
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-[300px] md:w-[500px] h-[300px] md:h-[500px] blur-[80px] md:blur-[120px] rounded-full -translate-y-1/2 opacity-50 z-0`} style={{ backgroundColor: theme.primary }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ── HEADER ── */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="relative inline-block text-3xl sm:text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
            <span className={uni.id === 'gulistan' ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D4FF] to-white bg-[length:200%_auto] animate-pulse" : "text-white"}>
              {uni.name.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  className="inline-block mr-[0.2em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            {uni.id === 'gulistan' && (
              <motion.div
                className="absolute inset-0 blur-[30px] md:blur-[40px] rounded-full -z-10"
                style={{ backgroundColor: theme.primary }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
          </h2>
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-5 h-5" style={{ color: theme.primary }} />
              <span className="text-lg font-medium">{uni.location}</span>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
              style={{ backgroundColor: `${theme.primary}1A`, borderColor: `${theme.primary}33` }}
            >
              <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700]" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.primary }}>Established {uni.established}</span>
            </motion.div>
          </div>
          {uni.tagline && (
            <h3
              className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight text-transparent bg-clip-text animate-pulse"
              style={{ backgroundImage: 'linear-gradient(to right, #ef4444, #eab308, #22c55e, #06b6d4, #8b5cf6)' }}
            >
              {uni.tagline}
            </h3>
          )}
          <p className="text-xl max-w-4xl mx-auto leading-relaxed font-light" style={{ color: theme.textMuted }}>
            {uni.intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
          {/* ── LEGACY & WHY CHOOSE ── */}
          <div data-aos="fade-right">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-4 uppercase leading-tight">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}>
                <HeartPulse />
              </div>
              THE LEGACY OF {uni.name}
            </h3>
            <p className="text-lg leading-relaxed mb-12" style={{ color: theme.textMuted }}>
              {uni.legacy}
            </p>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <div className="mb-8">
                <h4 className="text-white font-bold text-xl mb-2 flex items-center justify-center gap-3">
                  <ShieldCheck className="w-6 h-6" style={{ color: theme.primary }} />
                  {uni.whyChooseTitle || 'Why Choose This University?'}
                </h4>
                {uni.whyChooseDesc && (
                  <p className="text-sm font-medium" style={{ color: theme.textMuted }}>
                    {uni.whyChooseDesc}
                  </p>
                )}
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="flex flex-wrap justify-center gap-4"
              >
                {uni.whyChoose.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      show: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 100 }
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: `${theme.primary}0D`,
                      borderColor: `${theme.primary}66`,
                      boxShadow: `0 0 20px ${theme.primary}1A`
                    }}
                    className="flex items-center gap-3 group bg-white/5 px-5 py-3 rounded-full border border-white/10 transition-all cursor-default"
                  >
                    <CheckCircle2 className="w-5 h-5 group-hover:text-primary transition-colors shrink-0" style={{ color: `${theme.primary}66` }} />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── PROGRAM & IMPACT ── */}
          <div data-aos="fade-left">
            <div className="rounded-3xl border border-white/5 p-5 sm:p-8 mb-8" style={{ backgroundColor: uni.theme?.card || '#030814' }}>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
                <GraduationCap className="w-6 h-6" style={{ color: theme.primary }} />
                Program Details
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: 'Course', value: uni.program.course, icon: BookOpen },
                  { label: 'Duration', value: uni.program.duration, icon: HeartPulse },
                  { label: 'Medium', value: uni.program.medium, icon: Globe2 },
                  { label: 'Annual Fees', value: uni.program.fees, icon: Award, highlight: true }
                ].map((p, pi) => (
                  <motion.div
                    key={pi}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 20 },
                      show: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 100, delay: pi * 0.1 }
                      }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow: `0 10px 40px ${theme.primary}4D`,
                      borderColor: theme.primary,
                      backgroundColor: `${theme.primary}1A`
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-default relative overflow-hidden group/card ${p.highlight ? '' : 'bg-white/5 border-white/5'}`}
                    style={p.highlight ? { backgroundColor: `${theme.primary}1A`, borderColor: `${theme.primary}33` } : {}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                      <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-black leading-none group-hover/card:text-white/70 transition-colors" style={p.highlight ? { color: theme.primary } : {}}>{p.label}</p>
                    </div>
                    <p className="text-sm sm:text-lg font-bold text-white leading-tight relative z-10">{p.value}</p>
                  </motion.div>
                ))}
              </div>
              {uni.program.subtext && (
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p
                    className="text-gray-400 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: uni.program.subtext.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}
                  />
                </div>
              )}
            </div>

            {/* Custom Image to fill the space below Program Details */}
            {uni.id === 'karakalpakstan' && (
              <div className="mt-8 rounded-3xl overflow-hidden relative group border border-white/5" style={{ backgroundColor: theme.card }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#020a1a] via-transparent to-transparent z-10 opacity-80" />
                <img
                  src="/assets/karakalpakstan-student.png"
                  alt="Medical Student"
                  className="w-full h-[350px] object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            {uni.careerPath && (
              <div className="mt-8 p-6 rounded-2xl border" style={{ backgroundColor: `${theme.primary}0D`, borderColor: `${theme.primary}1A` }}>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-4" style={{ color: theme.primary }}>Global Career Pathways</h4>
                <div className="flex flex-wrap gap-3">
                  {uni.careerPath.map((path, i) => (
                    <div key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                      <span className="text-xs font-bold text-white">{path.exam}</span>
                      <span className="text-[10px] text-gray-500">({path.region})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── ADMISSION REQUIREMENTS (NEW PREMIUM UI) ── */}
        <div className="mb-24" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Admission <span style={{ color: theme.primary }}>Requirements</span>
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Eligibility Column */}
            <div className="space-y-8" data-aos="fade-right">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <Award className="w-6 h-6" style={{ color: theme.primary }} />
                </div>
                <h3 className="text-2xl font-bold text-white">Eligibility Criteria</h3>
              </div>

              <div className="space-y-4">
                <motion.div whileHover={{ x: 10 }} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all group" style={{ borderColor: `${theme.primary}1A` }}>
                  <div className="flex gap-5">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" style={{ color: theme.primary }} />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Academic Requirement</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{uni.admission.academic}</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all group" style={{ borderColor: `${theme.primary}1A` }}>
                  <div className="flex gap-5">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" style={{ color: theme.primary }} />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">NEET Qualification</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{uni.admission.neet}</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all group" style={{ borderColor: `${theme.primary}1A` }}>
                  <div className="flex gap-5">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" style={{ color: theme.primary }} />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Age Requirement</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{uni.admission.age}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Dossier Column */}
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl relative overflow-hidden" data-aos="fade-left">
              <div className="absolute top-0 right-0 w-64 h-64 blur-[120px] rounded-full pointer-events-none opacity-20" style={{ backgroundColor: theme.primary }} />

              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <FileText className="w-5 h-5 md:w-6 md:h-6" style={{ color: theme.primary }} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Required Documents Scanned and Originals</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                    <span className="text-xs md:text-sm font-black uppercase tracking-widest" style={{ color: `${theme.primary}CC` }}>Identity Documents</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {uni.admission.documents.identity.map((doc, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${theme.primary}80` }} />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primary }} />
                    <span className="text-xs md:text-sm font-black uppercase tracking-widest" style={{ color: `${theme.primary}CC` }}>Academic Documents</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {uni.admission.documents.academic.map((doc, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${theme.primary}80` }} />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Tip */}
              <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-2xl border flex gap-4 items-start" style={{ backgroundColor: `${theme.primary}0D`, borderColor: `${theme.primary}33` }}>
                <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-1" style={{ color: theme.primary }} />
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest" style={{ color: theme.primary }}>Note</h4>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    All documents must be notarized and apostilled as per international admission requirements. <br className="hidden sm:block" />
                    Our counseling team provides complete guidance throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── YOUR JOURNEY (PREMIUM ALTERNATING TIMELINE) ── */}
        <div className="mb-32 relative" data-aos="fade-up">
          <div className="text-center mb-24">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">YOUR JOURNEY at {uni.abbr}</h3>
            <div className="flex justify-center">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "120px" }} viewport={{ once: true }} className="h-1.5 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)` }} />
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4">
            {/* Glowing Path Line */}
            <div className="absolute left-[36px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, transparent, ${theme.primary}4D, transparent)` }} />

            <div className="space-y-8 md:space-y-16">
              {uni.journey.map((step, i) => (
                <div key={i} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">

                  {/* Timeline Node (Center for Desktop, Left for Mobile) */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20 top-4 md:top-auto">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#030814] border-2 flex items-center justify-center font-black text-lg md:text-2xl transition-all duration-300"
                      style={{ borderColor: `${theme.primary}80`, color: theme.primary, boxShadow: `0 0 20px ${theme.primary}4D` }}
                      whileHover={{ backgroundColor: theme.primary, color: '#030814' }}
                    >
                      {step.step}
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`p-6 sm:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md group relative overflow-hidden ml-16 md:ml-0 ${i % 2 !== 0 ? 'md:col-start-2 text-left' : 'md:col-start-1 text-left md:text-right'}`}
                    whileHover={{ borderColor: `${theme.primary}4D` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${theme.primary}1A, transparent)` }} />

                    <h5 className="text-xl md:text-2xl font-bold text-white mb-3 transition-colors relative z-10" style={{ '--hover-color': theme.primary }}>{step.title}</h5>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed relative z-10">{step.desc}</p>
                  </motion.div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LIFE AT UNIVERSITY ── */}
        <div className="mb-32">
          <div className="text-center mb-16" data-aos="fade-up">
            <h3 className="text-4xl font-black text-white mb-4">{uni.lifeTitle || `Life at ${uni.name.split(' ')[0]}`}</h3>
            <p className="text-gray-400">{uni.lifeIntro || `Life at ${uni.name.split(' ')[0]} offers a perfect balance of academics and comfort.`}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4" data-aos="fade-right">
              <img src={uni.images ? uni.images[0] : campusImg} alt="" className="rounded-3xl w-full h-48 object-cover shadow-2xl border border-white/10" />
              <img src={uni.images ? uni.images[1] : campus2} alt="" className="rounded-3xl w-full h-48 object-cover shadow-2xl border border-white/10 mt-8" />
              <img src={uni.images ? uni.images[2] : cityImg} alt="" className="rounded-3xl w-full h-48 object-cover shadow-2xl border border-white/10 col-span-2" />
            </div>
            <div className="grid gap-4" data-aos="fade-left">
              {uni.life.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 transition-all hover:bg-white/[0.08]" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.primary}1A`, color: theme.primary }}>
                    {i === 0 ? <Building2 size={20} /> : i === 2 ? <Utensils size={20} /> : i === 3 ? <Users size={20} /> : <Microscope size={20} />}
                  </div>
                  <span className="text-gray-300 font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CAREER OPPORTUNITIES ── */}
        {uni.careerOpportunities && (
          <div className="mb-32">
            <div className="text-center mb-16" data-aos="fade-up">
              <h3 className="text-4xl font-black text-white mb-4">
                Career Path <span style={{ color: theme.primary }}>After Graduation</span>
              </h3>
              <p className="text-gray-400 text-lg">Graduates from the institute can pursue global opportunities such as:</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12 px-4">
              {uni.careerOpportunities.exams.map((exam, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: `0 20px 40px ${theme.primary}33`,
                    borderColor: theme.primary
                  }}
                  className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group text-center flex flex-col items-center justify-center min-h-[160px] cursor-default"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${theme.primary}33 0%, transparent 70%)` }} />
                  <div className="relative z-10">
                    <h4 className="text-2xl font-black text-white mb-2">{exam.title}</h4>
                    {exam.region && <p className="text-sm font-bold uppercase tracking-widest" style={{ color: theme.primary }}>{exam.region}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto p-6 mx-4 md:mx-auto rounded-2xl border text-center relative overflow-hidden"
              style={{ backgroundColor: `${theme.primary}1A`, borderColor: `${theme.primary}4D` }}
            >
              <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <p
                className="text-lg md:text-xl font-medium text-gray-300 relative z-10"
                dangerouslySetInnerHTML={{ __html: uni.careerOpportunities.subtext.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black">$1</strong>') }}
              />
            </motion.div>
          </div>
        )}

        {/* ── OUR IMPACT ── */}
        {uni.impact && uni.impact.length > 0 && (
          <div className="mb-32">
            <div className="text-center mb-12" data-aos="fade-up">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 uppercase">Our <span style={{ color: theme.primary }}>Impact</span></h3>
              <p className="text-gray-400 text-sm sm:text-base">A strong track record that builds confidence and trust.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="100">
              {uni.impact.map((stat, i) => (
                <StatCard key={i} label={stat.label} value={stat.value} theme={theme} />
              ))}
            </div>
          </div>
        )}

        {/* ── FINAL CTA & QUOTES ── */}
        <div className="max-w-4xl mx-auto text-center py-20 rounded-[40px] bg-gradient-to-b from-white/5 to-transparent border border-white/10" data-aos="zoom-in">
          {uni.quotes && (
            <div className="mb-12 space-y-4">
              {uni.quotes.heading && (
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                  {uni.quotes.heading}
                </h2>
              )}
              {uni.quotes.intro && (
                <div className="mb-8">
                  {uni.quotes.intro.map((line, i) => (
                    <p key={i} className="text-lg md:text-xl font-light mb-2" style={{ color: theme.textMuted }}>{line}</p>
                  ))}
                </div>
              )}
              {uni.quotes.main && (
                <p className="text-gray-300 text-lg md:text-xl px-4 leading-relaxed max-w-3xl mx-auto">
                  {uni.quotes.main}
                </p>
              )}
              {uni.quotes.sub && (
                <p
                  className="text-xl md:text-2xl font-black mt-6"
                  style={{ color: theme.primary }}
                  dangerouslySetInnerHTML={{ __html: uni.quotes.sub.replace(/\*\*(.*?)\*\*/g, '<span>$1</span>') }}
                />
              )}
            </div>
          )}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup', { detail: uni.name }))}
            className="px-14 py-6 rounded-full text-white font-black text-xl uppercase tracking-widest transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(90deg, ${theme.secondary}, ${theme.primary})`,
              boxShadow: `0 0 50px ${theme.primary}4D`
            }}
          >
            {uni.ctaText || `Apply To ${uni.name.split(' ')[0]}`}
          </button>
        </div>
      </div>
    </section>
  );
};

const UzbekistanMedicalUniversities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  const universities = [
    {
      id: 'gulistan',
      name: 'Gulistan State Medical University',
      abbr: 'GSMU',
      heroBg: '/assets/medical_hero_bg.webp',
      location: 'Gulistan City, Syrdarya Region, Uzbekistan',
      established: '1965',
      intro: 'Gulistan State Medical University is a growing medical university in Uzbekistan known for its quality education and modern teaching approach. It attracts international students seeking affordable and reliable MBBS education in Central Asia.',
      legacy: 'Gulistan State Medical University has built a reputation for delivering consistent medical education aligned with global healthcare standards. With decades of academic excellence, the university has contributed to producing skilled doctors serving across various countries. Its focus on innovation, discipline, and clinical training continues to strengthen its legacy.',
      whyChoose: [
        'Recognized by WHO & NMC guidelines',
        'Affordable tuition fees',
        'English-medium MBBS program',
        'Strong clinical exposure',
        'Safe environment',
        'Indian food & hostel facilities',
        'Experienced faculty',
        'High licensing exam success rate'
      ],
      program: {
        course: 'MBBS',
        duration: '6 Years (Including Internship)',
        medium: 'English',
        fees: '₹2.5 Lakhs per year'
      },
      admission: {
        academic: 'Minimum 50% in Physics, Chemistry, and Biology (PCB) as per NMC guidelines.',
        neet: 'Candidates must have qualified NEET-UG in the current or previous two years, as per NMC regulations.',
        age: 'Applicants must be at least 17 years old',
        documents: {
          identity: ['Valid Passport', 'Aadhar card', 'Passport-size photographs'],
          academic: ['10th Marksheet', '12th Marksheet', 'NEET Scorecard', 'Medical Fitness Certificate if needed']
        }
      },
      journey: [
        { step: '1', title: 'Apply Online', desc: 'Submit your application with academic documents' },
        { step: '2', title: 'Admission Confirmation', desc: 'Receive your admission letter from the university' },
        { step: '3', title: 'Documentation & Visa Process', desc: 'Complete visa formalities with expert guidance' },
        { step: '4', title: 'Travel to Uzbekistan', desc: 'Fly to your dream destination for MBBS' },
        { step: '5', title: 'University Enrollment', desc: 'Begin your academic journey with orientation' },
        { step: '6', title: 'Start Your Medical Career Path', desc: 'Experience world-class education & clinical training' }
      ],
      life: [
        'Safe and peaceful city environment',
        'Fully equipped hostels for boys & girls',
        'Indian mess & international food options',
        'Cultural diversity with international students',
        'Modern classrooms & laboratories',
        'Extracurricular activities & student support'
      ],
      impact: [
        { label: 'Students Placed', value: '3,500+' },
        { label: 'Countries', value: '40+' },
        { label: 'Hospitals', value: '20+' },
        { label: 'FMGE Passing Rate', value: '85–90%' }
      ],
      images: ['/assets/gulistan1.webp', '/assets/gulistan2.webp', '/assets/gulistan3.webp'],
      quotes: {
        heading: 'START YOUR JOURNEY TODAY',
        intro: [
          'Your dream of becoming a doctor starts here.',
          'Take the first step towards a global medical career with Gulistan State Medical University.'
        ],
        main: '“Don’t just dream of becoming a doctor — become one.”',
        sub: '“Your white coat journey begins with a single decision today.”'
      }
    },
    {
      id: 'namangan',
      name: 'Namangan State Medical University',
      abbr: 'NSMU',
      theme: {
        primary: '#f59e0b',
        secondary: '#b45309',
        bg: '#0e0800',
        card: '#1a0f00',
        textMuted: '#9a7a4a',
        glow: 'rgba(245, 158, 11, 0.3)'
      },
      location: 'Namangan, Uzbekistan',
      established: '1942',
      intro: 'Namangan State Medical University is a government medical university in Uzbekistan known for its structured MBBS program, modern clinical training, and affordable education for international students. The university focuses on producing skilled medical professionals with strong practical and theoretical knowledge.',
      legacy: 'With a history dating back to 1942, Namangan State Medical University has established itself as a cornerstone of medical education in Uzbekistan. As a government-recognized institution, it upholds the highest standards of academic integrity and clinical practice, training generations of doctors who serve globally.',
      whyChoose: [
        'Government-recognized medical university',
        'NMC & WHO guideline-aligned MBBS program',
        'English-medium instruction for international students',
        'Strong clinical exposure in affiliated hospitals',
        'Affordable tuition fees for MBBS abroad',
        'Safe and student-friendly environment',
        'Indian food and hostel facilities available'
      ],
      program: {
        course: '6 Years MBBS Program',
        duration: '(5 Years Academic + 1 Year Internship)',
        medium: 'ENGLISH',
        fees: '3 LAKHS PER YEAR'
      },
      admission: {
        academic: 'Minimum 50% in Physics, Chemistry, and Biology (PCB) as per NMC guidelines.',
        neet: 'Candidates must have qualified NEET-UG in the current or previous two years, as per NMC regulations.',
        age: 'Applicants must be at least 17 years old',
        documents: {
          identity: ['Valid Passport', 'Aadhar card', 'Passport-size photographs'],
          academic: ['10th Marksheet', '12th Marksheet', 'NEET Scorecard', 'Medical Fitness Certificate if needed']
        }
      },
      images: [
        '/assets/Namangan1.webp',
        '/assets/Namangan2.webp',
        '/assets/Namangan3.webp'
      ],
      journey: [
        { step: '1', title: 'Consultation', desc: 'Expert guidance on the admission process' },
        { step: '2', title: 'Application', desc: 'Submit your scanned documents for review' },
        { step: '3', title: 'Admission', desc: 'Receive your official university admission letter' },
        { step: '4', title: 'Visa', desc: 'Fast-track student visa processing' },
        { step: '5', title: 'Departure', desc: 'Pre-departure briefing and flight to Uzbekistan' },
        { step: '6', title: 'Enrollment', desc: 'Start your classes at Namangan' }
      ],
      lifeIntro: 'Namangan offers a peaceful and focused academic environment ideal for medical studies.',
      life: [
        'Peaceful and focused academic atmosphere',
        'Comfortable student hostels',
        'Multicultural student community',
        'Modern classrooms and learning spaces',
        'Supportive faculty and clinical mentors',
        'Vibrant city life in Namangan'
      ],
      quotes: {
        heading: 'Start Your Medical Journey',
        intro: [
          'Take the next step toward your dream of becoming a doctor.',
          'Choose a university that offers quality education, global recognition, and affordable fees.'
        ],
        main: '“Your medical career starts with the right decision today.”'
      }
    },
    {
      id: 'karakalpakstan',
      name: 'Karakalpakstan Medical Institute',
      abbr: 'KMI',
      vfx: true,
      theme: {
        primary: '#38bdf8',
        secondary: '#0369a1',
        bg: '#020b1a',
        card: '#051525',
        textMuted: '#e2e8f0',
        glow: 'rgba(56, 189, 248, 0.35)'
      },
      location: 'Nukus, Uzbekistan',
      established: '1991',
      tagline: 'A Smart Choice for Affordable MBBS Abroad',
      intro: 'Karakalpakstan Medical Institute is a government medical institution in Uzbekistan offering quality MBBS education with strong clinical exposure and affordable tuition fees. It is designed for international students who want a safe, structured, and cost-effective pathway to becoming a doctor with global career opportunities.',
      legacy: 'Karakalpakstan Medical Institute is focused on both theoretical knowledge and real hospital training, preparing students for global medical licensing exams and building a strong foundation for their medical career.',
      whyChooseTitle: 'Why Students and Parents Prefer This Institute',
      whyChooseDesc: 'Instead of just studying medicine, students here build a strong foundation for their medical career.',
      whyChoose: [
        'Government-recognized medical institute',
        'NMC & WHO guideline-aligned curriculum',
        'English-medium MBBS program',
        'Early clinical exposure in hospitals',
        'Budget-friendly education in Uzbekistan',
        'Safe, disciplined student environment',
        'Hostel and Indian food availability'
      ],
      program: {
        course: 'MBBS (General Medicine)',
        duration: '6 Years (5 Years Academic + 1 Year Internship)',
        medium: 'English',
        fees: '₹2.5 Lakhs per year',
        subtext: 'Focused on both **theoretical knowledge and real hospital training**, preparing students for global medical licensing exams'
      },
      admission: {
        academic: 'Minimum 50% in Physics, Chemistry, and Biology (PCB) as per NMC guidelines.',
        neet: 'Candidates must have qualified NEET-UG in the current or previous two years, as per NMC regulations.',
        age: 'Applicants must be at least 17 years old',
        documents: {
          identity: ['Valid Passport', 'Aadhar card', 'Passport-size photographs'],
          academic: ['10th Marksheet', '12th Marksheet', 'NEET Scorecard', 'Medical Fitness Certificate if needed']
        }
      },
      journey: [
        { step: '1', title: 'Registration', desc: 'Secure your seat with initial documentation' },
        { step: '2', title: 'Verification', desc: 'University reviews your academic eligibility' },
        { step: '3', title: 'Invitation', desc: 'Receive your formal study invitation' },
        { step: '4', title: 'Visa', desc: 'Expert assistance with your student visa' },
        { step: '5', title: 'Travel', desc: 'Safe travel arrangements to Nukus' },
        { step: '6', title: 'Career Start', desc: 'Commence your medical education' }
      ],
      lifeTitle: 'Student Life in Nukus',
      lifeIntro: 'Nukus offers a calm and focused academic atmosphere, ideal for medical studies.',
      images: [
        '/assets/karakalpakstan1.webp',
        '/assets/karakalpakstan2.webp',
        '/assets/asmu_hostel.jpg'
      ],
      life: [
        'Peaceful and safe city environment',
        'Comfortable hostel facilities',
        'Multicultural international student community',
        'Supportive academic system',
        'Practical hospital-based learning',
        'Balanced student lifestyle'
      ],
      careerOpportunities: {
        exams: [
          { title: 'FMGE / NExT', region: '(India)' },
          { title: 'USMLE', region: '(USA)' },
          { title: 'PLAB', region: '(UK)' },
          { title: 'International Exams', region: '(Global)' }
        ],
        subtext: 'This makes it a **strong foundation for global medical careers**.'
      },
      quotes: {
        heading: 'Start Your Journey Today',
        main: 'Your dream of becoming a doctor begins with the right decision — not just a university, but a direction for your future.',
        sub: '**A small step today can shape your entire medical career tomorrow.**'
      },
      ctaText: 'Apply Now'
    }
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure layout is calculated
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="bg-[#030814] text-white min-h-screen font-sans overflow-x-hidden pt-20">
      {/* ── UNIVERSITY SECTIONS ── */}
      {universities.map((uni, index) => (
        <UniversitySection key={uni.id} uni={uni} index={index} />
      ))}
    </div>
  );
};

export default UzbekistanMedicalUniversities;
