import { useEffect, useRef, useState, memo, lazy, Suspense, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { GlassButton } from '../components/ui/glass-button';
import 'aos/dist/aos.css';
import './HomePage.css';
import HorizonHeroSection from '../components/ui/horizon-hero-section.tsx';
import LazyImage from '../components/Lazyimage';
import { videos as centralVideos } from '../data/videoData';

gsap.registerPlugin(ScrollTrigger);

// ── ASSETS ────────────────────────────────────────────────────────────────
const uni1 = '/assets/TASHKENT-MEDICAL-ACADEMY.webp';
const uni2 = '/assets/samarkand-college.webp';
const uni3 = '/assets/BUKHARA-STATE-MEDICAL-UNIVERSITY.webp';
const uni4 = '/assets/andijan1.webp';
const uni5 = '/assets/fergana.webp';
const aboutVideo = '/assets/aboutvideo1.mp4';
const g1 = '/assets/stud1.webp';
const g2 = '/assets/stud2.webp';
const g3 = '/assets/stud3.webp';
const pUni1 = '/assets/Kyrgyzstan.webp';
const pUni2 = '/assets/Kyrgyzstan 2.webp';
const pUni3 = '/assets/Kyrgyzstan 3.webp';
const pUni4 = '/assets/Kyrgyzstan 4.webp';
const pUni5 = '/assets/Georgia 1.webp';
const pUni6 = '/assets/georgia2.webp';
const pUni7 = '/assets/Georgia 3.webp';
const wUni1 = '/assets/Georgia 4.webp';
const wUni2 = '/assets/Georgia 5.webp';
const wUni3 = '/assets/rasia 1.webp';
const wUni4 = '/assets/rasia 2.webp';
const wUni5 = '/assets/rasia 3.webp';
const wUni6 = '/assets/rasia 4.webp';
const wUni7 = '/assets/rasia 5.webp';
const img1 = '/assets/1 (1).webp', img2 = '/assets/1 (2).webp', img3 = '/assets/1 (3).webp';
const img4 = '/assets/1 (4).webp', img5 = '/assets/1 (5).webp', img6 = '/assets/1 (6).webp';
const img7 = '/assets/1 (7).webp', img8 = '/assets/1 (8).webp', img9 = '/assets/1 (9).webp';
const img10 = '/assets/1 (10).webp', img11 = '/assets/1 (11).webp';

// ── STATIC DATA (outside component — no re-create on render) ──────────────
const destinations = [
  { id: 'tashkent-medical-academy', name: 'Tashkent State Medical University', image: uni1, sub: 'The leading medical institution in Central Asia with global recognition.', theme: 'linear-gradient(135deg,rgba(37,99,235,0.5),rgba(49,46,129,0.8))' },
  { id: 'samarkand-state-medical-university', name: 'Samarkand State Medical University', image: uni2, sub: 'Traditional excellence meets modern medical technology in historical Samarkand.', theme: 'linear-gradient(135deg,rgba(16,185,129,0.5),rgba(20,83,45,0.8))' },
  { id: 'bukhara-state-medical-institute', name: 'Bukhara State Medical Institute', image: uni3, sub: 'Renowned for high clinical exposure and international student community.', theme: 'linear-gradient(135deg,rgba(245,158,11,0.5),rgba(124,45,18,0.8))' },
  { id: 'andijan-state-medical-institute', name: 'Andijan State Medical University', image: uni4, sub: 'High-quality education with focus on practical bedside clinical training.', theme: 'linear-gradient(135deg,rgba(244,63,94,0.5),rgba(153,27,27,0.8))' },
  { id: 'fergana-medical-institute', name: 'Fergana Medical Institute', image: uni5, sub: 'A fast-growing hub for public health and specialized medical research.', theme: 'linear-gradient(135deg,rgba(139,92,246,0.5),rgba(76,29,149,0.8))' },
];
const kyrgyzstanUnis = [
  { id: 'osh-state-university', name: 'Osh State University - International Medical Faculty', image: pUni1, sub: 'Distinguished for its high academic standards and vibrant international student community.', theme: 'linear-gradient(135deg,rgba(14,165,233,0.5),rgba(30,58,138,0.8))' },
  { id: 'ihsm-bishkek', name: 'International Higher School of Medicine', image: pUni2, sub: 'A premium institution focused on high-quality medical training and global research standards.', theme: 'linear-gradient(135deg,rgba(217,70,239,0.5),rgba(112,26,117,0.8))' },
  { id: 'jasu-kyrgyzstan', name: 'Jalal Abad State University', image: pUni3, sub: 'Providing extensive clinical exposure with modern medical facilities in Kyrgyzstan.', theme: 'linear-gradient(135deg,rgba(132,204,22,0.5),rgba(54,83,20,0.8))' },
  { id: 'jaiu-medical', name: 'Jalal Abad International University', image: pUni4, sub: 'Offering state-of-the-art medical programs tailored for aspiring global doctors.', theme: 'linear-gradient(135deg,rgba(6,182,212,0.5),rgba(21,94,117,0.8))' },
];
const georgiaUnis = [
  { id: 'bau-batumi', name: 'BAU International University Batumi', image: pUni5, sub: 'Combining global educational standards with high-end clinical practice in Georgia.', theme: 'linear-gradient(135deg,rgba(236,72,153,0.5),rgba(159,18,57,0.8))' },
  { id: 'caucasus-university', name: 'Caucasus University', image: pUni6, sub: 'Known for its rigorous curriculum and diverse academic environment.', theme: 'linear-gradient(135deg,rgba(100,116,139,0.5),rgba(15,23,42,0.8))' },
  { id: 'avicenna-batumi', name: 'Avicenna Batumi Medical University', image: pUni7, sub: 'Dedicated to medical excellence through innovative teaching and clinical research.', theme: 'linear-gradient(135deg,rgba(20,184,166,0.5),rgba(17,94,89,0.8))' },
  { id: 'seu-tbilisi', name: 'Georgian National University SEU', image: wUni1, sub: 'One of the leading private universities in Georgia with cutting-edge medical labs.', theme: 'linear-gradient(135deg,rgba(99,102,241,0.5),rgba(49,46,129,0.8))' },
  { id: 'uga-georgia', name: 'The University of Georgia', image: wUni2, sub: 'A top-tier research university offering world-class medical programs.', theme: 'linear-gradient(135deg,rgba(249,115,22,0.5),rgba(154,52,18,0.8))' },
];
const russiaUnis = [
  { id: 'kazan-federal', name: 'Kazan Federal University', image: wUni3, sub: "One of Russia's oldest and most prestigious universities with historical medical excellence.", theme: 'linear-gradient(135deg,rgba(30,64,175,0.5),rgba(15,23,42,0.8))' },
  { id: 'pirogov-moscow', name: 'Pirogov Russian National Research Medical University', image: wUni4, sub: 'A premier medical institution in Russia specializing in advanced research and clinical training.', theme: 'linear-gradient(135deg,rgba(185,28,28,0.5),rgba(69,10,10,0.8))' },
  { id: 'bashkir-state', name: 'Bashkir State Medical University', image: wUni5, sub: 'A hub for medical innovation and high-quality surgery and research programs.', theme: 'linear-gradient(135deg,rgba(21,128,61,0.5),rgba(6,78,59,0.8))' },
  { id: 'tver-state', name: 'Tver State Medical University', image: wUni6, sub: 'Respected globally for its dedicated faculty and robust clinical practice infrastructure.', theme: 'linear-gradient(135deg,rgba(161,98,7,0.5),rgba(120,53,15,0.8))' },
  { id: 'volgograd-state', name: 'Volgograd State Medical University', image: wUni7, sub: 'Providing high-end medical education with a focus on practical hospital-based training.', theme: 'linear-gradient(135deg,rgba(21,94,117,0.5),rgba(22,78,99,0.8))' },
];
const whyReasons = [
  { icon: 'fa-solid fa-building-columns', title: 'Smart University Matching', desc: "We don't just suggest—we match the right university to your profile, budget, and career goals." },
  { icon: 'fa-solid fa-user-doctor', title: 'Career-Focused Approach', desc: 'Guidance not just for admission, but for your future as a doctor.' },
  { icon: 'fa-solid fa-earth-americas', title: 'Strong Global Connections', desc: 'Direct coordination with universities for faster and smoother processing.' },
  { icon: 'fa-solid fa-user-check', title: 'Student-First Strategy', desc: 'Every decision is made keeping your success and comfort in mind.' },
  { icon: 'fa-solid fa-plane-departure', title: 'Hassle-Free Journey', desc: 'We simplify complex admission and visa procedures into an easy process.' },
  { icon: 'fa-solid fa-headset', title: 'Real-Time Support System', desc: 'Quick response and continuous support at every stage of your journey.' },
  { icon: 'fa-solid fa-suitcase-rolling', title: 'Abroad Life Preparation', desc: 'We prepare you for real student life—not just academics.' },
  { icon: 'fa-solid fa-users', title: 'Trusted Guidance for Parents', desc: 'Clear communication and regular updates for complete peace of mind.' },
  { icon: 'fa-solid fa-handshake-angle', title: 'Long-Term Relationship', desc: "Support doesn't end after admission—we stay connected throughout your journey." },
  { icon: 'fa-solid fa-scale-balanced', title: 'Ethical & Honest Practices', desc: 'No false promises—only genuine and reliable guidance.' },
  { icon: 'fa-solid fa-shield-alt', title: 'Confidence Building Support', desc: 'We help students step into a new country with confidence and clarity.' },
  { icon: 'fa-solid fa-chart-line', title: 'Future-Ready Guidance', desc: 'Support for licensing exams and career pathways after MBBS.' },
];
const helpServices = [
  { title: 'Your Complete Journey', desc: 'From consultation to campus arrival — we handle everything.' },
  { title: 'University Selection', desc: 'NMC-approved universities that match your budget and goals.' },
  { title: 'Country Strategy', desc: 'Navigate visa rules, climate, cost, and culture.' },
  { title: 'Admission Process', desc: 'Application, documentation, and acceptance letters — fully managed.' },
  { title: 'Documentation Support', desc: 'Transcripts, certifications, police clearance — zero errors.' },
  { title: 'Budget Planning', desc: 'Transparent fee breakdowns and scholarship guidance.' },
  { title: 'Visa Assistance', desc: 'Interview prep, file compilation, and embassy coordination.' },
  { title: 'Pre-Departure Briefing', desc: 'Travel, accommodation, and cultural orientation sessions.' },
  { title: 'Hostel & Stay', desc: 'Safe, vetted hostels booked before you land.' },
  { title: 'Airport Reception', desc: 'Local team meets you at arrival — no confusion.' },
  { title: 'Not Alone Abroad', desc: '24/7 local support for any academic or personal issues.' },
  { title: 'Future Doctor Coaching', desc: 'FMGE/NExT prep coaching and mentorship programs.' },
  { title: 'Parent Updates', desc: 'Monthly progress reports and direct access to our team.' },
];
const blogs = [
  { slug: 'is-mbbs-abroad-approved-by-nmc', image: uni1, date: 'April 17, 2026', title: 'Is MBBS Abroad Approved by NMC?', excerpt: 'Understand the critical NMC rules and guidelines that determine if your MBBS degree from abroad will be valid for practice in India.' },
  { slug: 'fmge-next-required-after-mbbs-abroad', image: uni3, date: 'April 17, 2026', title: 'Is FMGE / NExT Required After MBBS Abroad?', excerpt: 'One of the most critical steps after completing your medical degree abroad is clearing the licensing exam in India.' },
  { slug: 'do-indian-embassies-help-students-abroad', image: uni2, date: 'April 17, 2026', title: 'Do Indian Embassies Help Students Abroad?', excerpt: 'Learn about the scope and limitations of the support Indian embassies provide to medical students studying in foreign countries.' },
  { slug: 'is-it-safe-for-indian-students-abroad', image: uni3, date: 'April 17, 2026', title: 'Is It Safe for Indian Students Abroad?', excerpt: 'One of the biggest questions parents ask is about safety and community support in major destinations.' },
  { slug: 'best-countries-for-indian-students-to-study-mbbs', image: uni2, date: 'April 17, 2026', title: 'Which Countries are Best for Study MBBS?', excerpt: 'Compare top locations like Uzbekistan, Russia, and more to find your perfect fit.' },
];
const galleryPhotos = [
  { id: 1, url: img1 }, { id: 2, url: img2 }, { id: 3, url: img3 }, { id: 4, url: img4 }, { id: 5, url: img5 },
  { id: 6, url: img6 }, { id: 7, url: img7 }, { id: 8, url: img8 }, { id: 9, url: img9 }, { id: 10, url: img10 }, { id: 11, url: img11 },
];
const helpIcons = [
  <svg key={0} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  <svg key={1} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  <svg key={2} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  <svg key={3} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  <svg key={4} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  <svg key={5} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  <svg key={6} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="5" width="22" height="14" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
  <svg key={7} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5L5.3 6.7c-1.1-.2-2.1.3-2.4 1.3c-.3 1 1.2 2.3 2.1 3l6.5 4.5l-4.5 4.5c-.7.7-1 1.7-.7 2.6c.3.9 1.2 1.4 2.1 1.4c.5 0 1-.2 1.4-.6l4.5-4.5l4.5 6.5c.7.9 2 2.4 3 2.1c1-.3 1.5-1.3 1.3-2.4z" /></svg>,
  <svg key={8} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  <svg key={9} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="10" width="22" height="9" rx="2" /><path d="M7 10l3-4h4l3 4" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="19" r="2" /></svg>,
  <svg key={10} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key={11} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
  <svg key={12} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
];

// ── GPU STYLES ────────────────────────────────────────────────────────────
const gpuStyle = { transform: 'translateZ(0)', willChange: 'scroll-position', backfaceVisibility: 'hidden' };
const cardGpuStyle = { transform: 'translateZ(0)', contain: 'layout style paint', willChange: 'transform', backfaceVisibility: 'hidden', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)' };
const sectionGpuStyle = { ...gpuStyle, contain: 'layout style paint' };

// ── SECTION FADE WRAPPER — unique entrance animation ─────────────────────
const FadeSection = memo(({ children, className, style, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
});

// ── VIDEO CARD — memo ─────────────────────────────────────────────────────
const VideoCard = memo(({ video, idx, onClick }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-5%' });

  return (
    <motion.div ref={cardRef}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="video-card"
    >
      <div className="video-card-shine" />
      <div className="video-wrapper cursor-pointer" onClick={() => onClick(video)}>
        <LazyImage src={video.thumb} alt={video.title} className="w-full h-full object-cover" style={{ height: '240px' }} />
        <div className="video-play-icon">
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="38" stroke={`url(#pg-${idx})`} strokeWidth="1.5" fill="none" />
            <polygon points="32,26 58,40 32,54" fill="#fff" fillOpacity="0.92" />
            <defs><linearGradient id={`pg-${idx}`} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse"><stop stopColor="#818cf8" /><stop offset="1" stopColor="#8b5cf6" /></linearGradient></defs>
          </svg>
        </div>
      </div>
      <div className="video-info">
        <div className="video-info-tag">
          <svg width="7" height="7" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4" /></svg>
          Student Story
        </div>
        <h4>{video.title}</h4>
        <p>{video.desc}</p>
        <div className="video-info-line" />
      </div>
    </motion.div>
  );
});

// ── UNIVERSITY CARD — memo + 3D tilt ─────────────────────────────────────
const UniversityCard = memo(({ data, index, onUniClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div ref={ref}
      className="dest-card group"
      style={{ rotateX: window.innerWidth >= 1024 ? rotateX : 0, rotateY: window.innerWidth >= 1024 ? rotateY : 0, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 48, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onUniClick(data.id)}
    >
      <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{ background: data.theme }} />
      <div className="relative z-10 h-full flex flex-col" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
        <div className="dest-image-container">
          <motion.img src={data.image} alt={data.name} className="dest-img" whileHover={{ scale: 1.12 }} transition={{ duration: 0.8 }} />
          <div className="dest-overlay-glass" />
        </div>
        <div className="dest-card-content flex-grow flex flex-col p-6 lg:p-8" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="dest-name text-lg lg:text-xl font-bold text-white leading-snug group-hover:text-blue-300 transition-colors">{data.name}</h3>
            <span className="text-[10px] font-black text-white/20 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">{`0${index + 1}`}</span>
          </div>
          <p className="dest-sub text-sm text-white/60 line-clamp-3 mb-6">{data.sub}</p>
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
            <span className="text-sm font-bold uppercase">Explore University</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14m-7-7l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// ── UNIVERSITY SECTION — memo ─────────────────────────────────────────────
const UniversitySection = memo(({ tag, title, unis, onUniClick, className, style }) => {
  const scrollRef = useRef(null);
  return (
    <section className={`section destinations ${className || ''}`} style={style}>
      <div className="container">
        <motion.header className="dest-header"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="section-tag">{tag}</div>
          <h2 className="section-title">{title}</h2>
        </motion.header>
        <div className="dest-scroll-wrapper" ref={scrollRef}>
          <div className="dest-grid">
            {unis.map((uni, idx) => (
              <UniversityCard key={uni.id} data={uni} index={idx} onUniClick={onUniClick} />
            ))}
          </div>
        </div>
        <div className="dest-scroll-hint mobile-only">
          <span className="scroll-hint-text">Slide to discover</span>
          <div className="scroll-hint-bar">
            <motion.div className="scroll-hint-progress" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
          </div>
        </div>
      </div>
    </section>
  );
});

// ── WHY CARD — memo + unique stagger-in animation ─────────────────────────
const WhyCard = memo(({ reason, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const col = idx % 3;
  const row = Math.floor(idx / 3);
  return (
    <motion.div ref={ref} className="why-new-card"
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: col * 0.08 + row * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(37,99,235,0.12)' }}
    >
      <div className="why-new-icon-box">
        <i className={`${reason.icon} why-new-fa-icon`}></i>
      </div>
      <h3 className="why-new-title">{reason.title}</h3>
      <p className="why-new-desc">{reason.desc}</p>
    </motion.div>
  );
});

// ── HELP ITEM — memo ──────────────────────────────────────────────────────
const HelpItem = memo(({ s, idx }) => (
  <div className="help-item gpu-boost">
    <div className="help-item-index"><span>{String(idx + 1).padStart(2, '0')}</span></div>
    <div className="help-item-icon-wrap">
      <div className="help-item-icon">{helpIcons[idx]}</div>
    </div>
    <div className="help-item-body">
      <h3 className="help-item-title">{s.title}</h3>
      <p className="help-item-desc">{s.desc}</p>
    </div>
    <div className="help-item-arrow">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
    </div>
  </div>
));

// ── BLOG CARD — memo ──────────────────────────────────────────────────────
const BlogCard = memo(({ b, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/blog/${b.slug}`} className="blog-card no-underline" style={{ display: 'block' }}>
        <div className="blog-card-visual">
          <LazyImage src={b.image} alt={b.title} />
          <div className="blog-card-date">{b.date}</div>
        </div>
        <div className="blog-card-info">
          <h3 className="blog-card-title">{b.title}</h3>
          <p className="blog-card-excerpt">{b.excerpt}</p>
          <div className="blog-card-footer">
            <span className="blog-read-more">Read Full Story</span>
            <span className="blog-arrow-icon">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

// ── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const parentRef = useRef(null);
  const asideRef = useRef(null);
  const listRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();
  const galleryVideos = centralVideos.slice(0, 4);

  const handleUniClick = useCallback((id) => { navigate(`/university/${id}`); }, [navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: parentRef.current,
          start: 'top 100px',
          end: () => `bottom ${asideRef.current.offsetHeight + 100}px`,
          pin: asideRef.current,
          pinSpacing: false,
        });
      });
      gsap.utils.toArray('.help-item').forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, x: 40 },
          { scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' }, opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', force3D: true }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO — unchanged ── */}
      {isMobile ? (
        <div className="mobile-hero-view" style={gpuStyle}><HorizonHeroSection /></div>
      ) : (
        <div className="desktop-hero-view" style={gpuStyle}><HorizonHeroSection /></div>
      )}

      {/* ── ABOUT — lazy load in viewport ── */}
      <FadeSection className="about-bravogroup" style={sectionGpuStyle}>
        <div className="about-bravogroup-container">
          <div className="about-bravogroup-visual">
            <div className="about-blob-bg" />
            <video src={aboutVideo} className="about-img" autoPlay loop muted playsInline width="1920" height="1080" style={{ aspectRatio: '16/9', objectFit: 'cover' }} />
            <div className="about-float-badge" data-aos="fade-up">
              <div className="badge-year">4+</div>
              <div className="badge-label">Years of Professional Expertise</div>
            </div>
          </div>
          <div className="about-bravogroup-content" data-aos="fade-up">
            <div className="section-tag-blue">About bravogroup's Educational Consultancy</div>
            <h2 className="section-h2">The Most Trusted Gateway to Global Medical Excellence</h2>
            <div className="about-story-block">
              <h3 className="about-sub-h3"> Founded in Vellore</h3>
              <p className="about-text"><strong>BRAVO GROUPS PRIVATE LIMITED</strong> was established in <strong>2022 in Vellore, Tamil Nadu</strong>, with a clear vision to make <strong>MBBS abroad accessible, affordable, and transparent</strong> for Indian students.</p>
            </div>
            <div className="about-story-block">
              <h3 className="about-sub-h3">Our Story</h3>
              <p className="about-text" style={{ marginBottom: '1rem' }}>BRAVO GROUPS was founded with the aim of solving a common problem—students struggling with <strong>lack of proper guidance, high costs, and unclear admission processes</strong> in medical education abroad.</p>
              <p className="about-text" style={{ marginBottom: '1rem' }}>Starting with a small group of aspiring doctors, we focused on providing <strong>honest counseling and reliable support</strong>, helping students choose the right universities based on their goals and budget.</p>
              <p className="about-text">Over time, our commitment to <strong>transparency, trust, and student success</strong> has helped us grow steadily. Today, BRAVO GROUPS has successfully guided <strong>100+ students</strong> toward their dream of studying MBBS abroad across multiple countries.</p>
            </div>
            <div className="about-belief-card">
              <h3 className="about-sub-h3">Our Belief</h3>
              <blockquote className="about-quote-box">Your dream is our responsibility.</blockquote>
              <p className="about-text" style={{ marginBottom: 0 }}>We believe every student deserves the right guidance and a clear path to achieve their medical career goals without confusion or hidden processes.</p>
            </div>

            <Link to="/about" className="btn-elegant-story">
              Start your story with us
              <i className="fa-solid fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </FadeSection>

      {/* ── WHY CHOOSE US — staggered grid animation ── */}
      <FadeSection className="section why-new">
        <div className="container">
          <div className="why-new-header" data-aos="fade-up">
            <h2 className="section-h2">Why Bravo Groups ? stands out </h2>
            <p className="about-text" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
              We provide you with all the right reasons to choose us, from free counseling to securing admission in top government medical universities abroad.
            </p>
          </div>
          <div className="why-new-grid">
            {whyReasons.map((reason, idx) => (
              <WhyCard key={reason.title} reason={reason} idx={idx} />
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── UNIVERSITIES — lazy per-card animation ── */}
      <UniversitySection tag="Elite Uzbekistan University" title="Top Medical Universities — Uzbekistan" unis={destinations} onUniClick={handleUniClick} className="section-uzbekistan" style={sectionGpuStyle} />
      <UniversitySection tag="Kyrgyzstan University" title="Top Medical Universities — Kyrgyzstan" unis={kyrgyzstanUnis} onUniClick={handleUniClick} className="section-kyrgyzstan" style={sectionGpuStyle} />
      <UniversitySection tag="Georgia University" title="Top Medical Universities — Georgia" unis={georgiaUnis} onUniClick={handleUniClick} className="section-georgia" style={sectionGpuStyle} />
      <UniversitySection tag="Russian University" title="Top Medical Universities — Russia" unis={russiaUnis} onUniClick={handleUniClick} className="section-russia" style={sectionGpuStyle} />

      {/* ── WHAT WE HELP YOU WITH ── */}
      <section className="section help-you">
        <div className="help-bg-blob help-blob-1 gpu-boost" />
        <div className="help-bg-blob help-blob-2 gpu-boost" />
        <div className="help-bg-grid" />
        <div className="help-inner" ref={parentRef}>
          <aside className="help-aside" ref={asideRef}>
            <div className="help-aside-sticky-content">
              <span className="help-aside-tag">Our Services</span>
              <h2 className="help-aside-title">
                🩺 Our Services<br />
                <span className="help-aside-title-accent">BRAVO GROUPS CONSULTANCY</span>
              </h2>
              <p className="help-aside-desc">From the moment you decide to pursue medicine internationally, we take over every step — counseling, documentation, visa, and beyond.</p>
              <div className="help-aside-stats-grid">
                <div className="help-stat-card"><span className="help-stat-num">100+</span><span className="help-stat-label">Students Placed</span></div>
                <div className="help-stat-card"><span className="help-stat-num">4+</span><span className="help-stat-label">Years Experience</span></div>
                <div className="help-stat-card"><span className="help-stat-num">15</span><span className="help-stat-label">Partner Universities</span></div>
              </div>
              <div className="help-aside-badge-wrapper">
                <div className="help-aside-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  NMC Approved Partner
                </div>
              </div>
              <div className="help-aside-quote-box">
                <p className="help-aside-quote">"We don't just send students abroad… we take responsibility for their future."</p>
              </div>
            </div>
          </aside>
          <div className="help-list" ref={listRef}>
            {helpServices.map((s, idx) => <HelpItem key={s.title} s={s} idx={idx} />)}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY — lazy carousel ── */}
      <FadeSection className="home-gallery" style={sectionGpuStyle}>
        <div className="gallery-section-header" data-aos="fade-up" data-aos-duration="800">
          <div className="gallery-eyebrow"><span className="gallery-eyebrow-dot" />Student Life</div>
          <h2 className="gallery-main-title">Our <span className="gallery-title-accent">Photo Gallery</span></h2>
          <p className="gallery-subtitle">Peek into the life, culture, and milestones of our students studying at top medical universities across the globe.</p>
        </div>
        <div className="carousel-wrapper">
          {[
            { dir: 'left', speed: undefined },
            { dir: 'right', speed: undefined },
            { dir: 'left', speed: '100s' },
          ].map((row, ri) => (
            <div key={ri} className={`carousel-row ${row.dir}`} style={row.speed ? { '--carousel-speed': row.speed } : {}}>
              <div className="carousel-track" style={row.speed ? { animationDuration: row.speed } : {}}>
                {[...galleryPhotos, ...galleryPhotos].map((photo, idx) => (
                  <div className="carousel-item" key={`r${ri}-${idx}`}>
                    <LazyImage src={photo.url} alt={`Gallery moment ${photo.id}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-cta flex justify-center w-full" data-aos="fade-up" data-aos-delay="100">
          <Link to="/gallery" className="no-underline">
            <GlassButton size="lg" contentClassName="flex items-center gap-2">
              View Full Gallery
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </GlassButton>
          </Link>
        </div>
      </FadeSection>

      {/* ── VIDEO GALLERY ── */}
      <FadeSection className="home-video-gallery" style={sectionGpuStyle}>
        <div className="video-section-header" data-aos="fade-up" data-aos-duration="800">
          <div className="video-eyebrow">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            Student Stories
          </div>
          <h2 className="video-main-title">Our <span className="video-title-accent">Video Gallery</span></h2>
          <p className="video-subtitle">Watch real moments — cultural events, clinical rotations, and academic excellence from campuses around the world.</p>
        </div>
        <div className="video-grid">
          {galleryVideos?.length > 0
            ? galleryVideos.map((video, idx) => <VideoCard key={video.id} video={video} idx={idx} onClick={setActiveVideo} />)
            : <p style={{ color: 'rgba(200,210,240,0.6)', textAlign: 'center', padding: '40px' }}>No videos available</p>
          }
        </div>
        {activeVideo && (
          <div className="vg-modal-overlay" onClick={() => setActiveVideo(null)} style={{ zIndex: 10000 }}>
            <div className="vg-modal-content" onClick={e => e.stopPropagation()}>
              <button className="vg-modal-close" onClick={() => setActiveVideo(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
              <div className="vg-iframe-wrapper">
                <iframe src={`${activeVideo.url.replace('watch?v=', 'embed/')}?autoplay=1`} title={activeVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <div className="vg-modal-info">
                <h2 className="text-white text-xl font-bold mb-2">{activeVideo.title}</h2>
                <p className="text-gray-400 text-sm">{activeVideo.desc}</p>
              </div>
            </div>
          </div>
        )}
        <div className="gallery-cta flex justify-center w-full" data-aos="fade-up" data-aos-delay="100">
          <Link to="/video-gallery" className="no-underline">
            <GlassButton size="lg" contentClassName="flex items-center gap-2">
              View All Videos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </GlassButton>
          </Link>
        </div>
      </FadeSection>

      {/* ── TESTIMONIALS ── */}
      <FadeSection className="section testimonials-premium" style={sectionGpuStyle}>
        <div className="testimonials-container">
          <div className="testimonials-header" data-aos="fade-up">
            <span className="testimonials-eyebrow">Student Success Stories</span>
            <h2 className="testimonials-title">Voices of Trust & Achievement</h2>
            <p className="testimonials-subtitle">Real students, real journeys — hear from those who made their MBBS dreams a reality with Bravo Groups.</p>
          </div>
          <div className="testimonials-grid">
            {[
              { delay: 0, type: 'video', media: <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EhrRTJqBqfc" title="Student Story" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ border: 'none' }} />, text: '"Bravo Groups made my MBBS journey smooth from day one. Their support in documentation and visa was exceptional."', initials: 'DS', name: 'Deepika Sharma', meta: 'MBBS • Tashkent Medical Academy', gradient: '135deg,#667eea 0%,#764ba2 100%' },
              { delay: .1, type: 'image', media: <LazyImage src={g2} alt="Student testimonial" />, text: '"From counseling to campus settlement, they were with me at every step. Truly grateful for their guidance."', initials: 'RK', name: 'Ravi Kumar', meta: 'MBBS • Samarkand State Medical', gradient: '135deg,#f093fb 0%,#f5576c 100%' },
              { delay: .2, type: 'image', media: <LazyImage src={g3} alt="Student testimonial" />, text: '"Best decision I made was choosing Bravo Groups. Their transparency and local support in Vellore made all the difference."', initials: 'PM', name: 'Priya Menon', meta: 'MBBS • Bukhara State Medical', gradient: '135deg,#4facfe 0%,#00f2fe 100%' },
            ].map((t, i) => (
              <motion.div key={i} className={`testimonial-card ${t.type}-card`}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: t.delay, ease: [0.16, 1, 0.3, 1] }}
                style={cardGpuStyle}
              >
                <div className="testimonial-media">
                  {t.media}
                  {t.type === 'video'
                    ? <div className="media-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg> Student Story</div>
                    : <div className="media-overlay" />
                  }
                </div>
                <div className="testimonial-body">
                  <div className="testimonial-quote"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.15"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></svg></div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar" style={{ background: `linear-gradient(${t.gradient})` }}><span>{t.initials}</span></div>
                    <div className="author-info">
                      <h4 className="author-name">{t.name}</h4>
                      <p className="author-meta">{t.meta}</p>
                      <div className="author-rating">{'★'.repeat(5)}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="testimonials-footer" data-aos="fade-up">
            <div className="trust-stats">
              {[{ num: '100+', label: 'Success Stories' }, { num: '4.9/5', label: 'Average Rating' }, { num: '100%', label: 'Visa Success' }].map((s, i) => (
                <div key={i} className="trust-stat" style={{ display: 'contents' }}>
                  {i > 0 && <div className="trust-divider" />}
                  <div className="trust-stat"><span className="trust-number">{s.num}</span><span className="trust-label">{s.label}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="gallery-cta flex justify-center w-full" data-aos="fade-up" data-aos-delay="100">
            <Link to="/testimonials" className="no-underline">
              <GlassButton size="lg" contentClassName="flex items-center gap-2">
                View All Reviews
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </GlassButton>
            </Link>
          </div>
        </div>
      </FadeSection>

      {/* ── BLOGS ── */}
      <FadeSection className="section blogs">
        <div className="container">
          <div className="blog-section-header">
            <h2 className="section-title">Latest Medical Education Blogs</h2>
            <div className="gold-line" />
          </div>
          <div className="blog-grid">
            {blogs.map((b, idx) => <BlogCard key={b.slug} b={b} idx={idx} />)}
          </div>
          <div className="gallery-cta flex justify-center w-full" data-aos="fade-up" data-aos-delay="100">
            <Link to="/blog" className="no-underline">
              <GlassButton size="lg" contentClassName="flex items-center gap-2">
                View All Blogs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </GlassButton>
            </Link>
          </div>
        </div>
      </FadeSection>
    </>
  );
} 