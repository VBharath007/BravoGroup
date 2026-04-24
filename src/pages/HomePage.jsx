import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, GraduationCap, Globe, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useInView } from "react-intersection-observer";
import HorizonHeroSection from '../components/ui/horizon-hero-section.tsx';
import LazyImage from '../components/Lazyimage';
import { GlassButton } from '../components/ui/glass-button';
import { GlassBlogCard } from '../components/ui/glass-blog-card-shadcnui';

// Assets are now served from the public/assets directory
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

const img1 = "/assets/1 (1).webp";
const img2 = "/assets/1 (2).webp";
const img3 = "/assets/1 (3).webp";
const img4 = "/assets/1 (4).webp";
const img5 = "/assets/1 (5).webp";
const img6 = "/assets/1 (6).webp";
const img7 = "/assets/1 (7).webp";
const img8 = "/assets/1 (8).webp";
const img9 = "/assets/1 (9).webp";
const img10 = "/assets/1 (10).webp";
const img11 = "/assets/1 (11).webp";





import { videos as centralVideos } from '../data/videoData';

gsap.registerPlugin(ScrollTrigger);


const destinations = [
  { id: 'tashkent-medical-academy', name: 'Tashkent State Medical University', image: uni1, sub: 'The leading medical institution in Central Asia with global recognition.', theme: 'linear-gradient(135deg, rgba(37, 99, 235, 0.5), rgba(49, 46, 129, 0.8))' },
  { id: 'samarkand-state-medical-university', name: 'Samarkand State Medical University', image: uni2, sub: 'Traditional excellence meet modern medical technology in historical Samarkand.', theme: 'linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(20, 83, 45, 0.8))' },
  { id: 'bukhara-state-medical-institute', name: 'Bukhara State Medical Institute', image: uni3, sub: 'Renowned for high clinical exposure and international student community.', theme: 'linear-gradient(135deg, rgba(245, 158, 11, 0.5), rgba(124, 45, 18, 0.8))' },
  { id: 'andijan-state-medical-institute', name: 'Andijan State Medical University', image: uni4, sub: 'High-quality education with focus on practical bedside clinical training.', theme: 'linear-gradient(135deg, rgba(244, 63, 94, 0.5), rgba(153, 27, 27, 0.8))' },
  { id: 'fergana-medical-institute', name: 'Fergana Medical Institute', image: uni5, sub: 'A fast-growing hub for public health and specialized medical research.', theme: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(76, 29, 149, 0.8))' },
];

const kyrgyzstanUnis = [
  { id: 'osh-state-university', name: 'Osh State University - International Medical Faculty', image: pUni1, sub: 'Distinguished for its high academic standards and vibrant international student community.', theme: 'linear-gradient(135deg, rgba(14, 165, 233, 0.5), rgba(30, 58, 138, 0.8))' },
  { id: 'ihsm-bishkek', name: 'International Higher School of Medicine', image: pUni2, sub: 'A premium institution focused on high-quality medical training and global research standards.', theme: 'linear-gradient(135deg, rgba(217, 70, 239, 0.5), rgba(112, 26, 117, 0.8))' },
  { id: 'jasu-kyrgyzstan', name: 'Jalal Abad State University', image: pUni3, sub: 'Providing extensive clinical exposure with modern medical facilities in Kyrgyzstan.', theme: 'linear-gradient(135deg, rgba(132, 204, 22, 0.5), rgba(54, 83, 20, 0.8))' },
  { id: 'jaiu-medical', name: 'Jalal Abad International University', image: pUni4, sub: 'Offering state-of-the-art medical programs tailored for aspiring global doctors.', theme: 'linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(21, 94, 117, 0.8))' },
];

const georgiaUnis = [
  { id: 'bau-batumi', name: 'BAU International University Batumi', image: pUni5, sub: 'Combining global educational standards with high-end clinical practice in Georgia.', theme: 'linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(159, 18, 57, 0.8))' },
  { id: 'caucasus-university', name: 'Caucasus University', image: pUni6, sub: 'Known for its rigorous curriculum and diverse academic environment.', theme: 'linear-gradient(135deg, rgba(100, 116, 139, 0.5), rgba(15, 23, 42, 0.8))' },
  { id: 'avicenna-batumi', name: 'Avicenna Batumi Medical University', image: pUni7, sub: 'Dedicated to medical excellence through innovative teaching and clinical research.', theme: 'linear-gradient(135deg, rgba(20, 184, 166, 0.5), rgba(17, 94, 89, 0.8))' },
  { id: 'seu-tbilisi', name: 'Georgian National University SEU', image: wUni1, sub: 'One of the leading private universities in Georgia with cutting-edge medical labs.', theme: 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(49, 46, 129, 0.8))' },
  { id: 'uga-georgia', name: 'The University of Georgia', image: wUni2, sub: 'A top-tier research university offering world-class medical programs.', theme: 'linear-gradient(135deg, rgba(249, 115, 22, 0.5), rgba(154, 52, 18, 0.8))' },
];

const russiaUnis = [
  { id: 'kazan-federal', name: 'Kazan Federal University', image: wUni3, sub: 'One of Russia\'s oldest and most prestigious universities with historical medical excellence.', theme: 'linear-gradient(135deg, rgba(30, 64, 175, 0.5), rgba(15, 23, 42, 0.8))' },
  { id: 'pirogov-moscow', name: 'Pirogov Russian National Research Medical University', image: wUni4, sub: 'A premier medical institution in Russia specializing in advanced research and clinical training.', theme: 'linear-gradient(135deg, rgba(185, 28, 28, 0.5), rgba(69, 10, 10, 0.8))' },
  { id: 'bashkir-state', name: 'Bashkir State Medical University', image: wUni5, sub: 'A hub for medical innovation and high-quality surgery and research programs.', theme: 'linear-gradient(135deg, rgba(21, 128, 61, 0.5), rgba(6, 78, 59, 0.8))' },
  { id: 'tver-state', name: 'Tver State Medical University', image: wUni6, sub: 'Respected globally for its dedicated faculty and robust clinical practice infrastructure.', theme: 'linear-gradient(135deg, rgba(161, 98, 7, 0.5), rgba(120, 53, 15, 0.8))' },
  { id: 'volgograd-state', name: 'Volgograd State Medical University', image: wUni7, sub: 'Providing high-end medical education with a focus on practical hospital-based training.', theme: 'linear-gradient(135deg, rgba(21, 94, 117, 0.5), rgba(22, 78, 99, 0.8))' },
];

const whyReasons = [
  { icon: 'fa-solid fa-building-columns', title: 'Smart University Matching', desc: 'We don’t just suggest—we match the right university to your profile, budget, and career goals.' },
  { icon: 'fa-solid fa-user-doctor', title: 'Career-Focused Approach', desc: 'Guidance not just for admission, but for your future as a doctor.' },
  { icon: 'fa-solid fa-earth-americas', title: 'Strong Global Connections', desc: 'Direct coordination with universities for faster and smoother processing.' },
  { icon: 'fa-solid fa-user-check', title: 'Student-First Strategy', desc: 'Every decision is made keeping your success and comfort in mind.' },
  { icon: 'fa-solid fa-plane-departure', title: 'Hassle-Free Journey', desc: 'We simplify complex admission and visa procedures into an easy process.' },
  { icon: 'fa-solid fa-headset', title: 'Real-Time Support System', desc: 'Quick response and continuous support at every stage of your journey.' },
  { icon: 'fa-solid fa-suitcase-rolling', title: 'Abroad Life Preparation', desc: 'We prepare you for real student life—not just academics.' },
  { icon: 'fa-solid fa-users', title: 'Trusted Guidance for Parents', desc: 'Clear communication and regular updates for complete peace of mind.' },
  { icon: 'fa-solid fa-handshake-angle', title: 'Long-Term Relationship', desc: 'Support doesn’t end after admission—we stay connected throughout your journey.' },
  { icon: 'fa-solid fa-scale-balanced', title: 'Ethical & Honest Practices', desc: 'No false promises—only genuine and reliable guidance.' },
  { icon: 'fa-solid fa-shield-alt', title: 'Confidence Building Support', desc: 'We help students step into a new country with confidence and clarity.' },
  { icon: 'fa-solid fa-chart-line', title: 'Future-Ready Guidance', desc: 'Support for licensing exams and career pathways after MBBS.' },
];



const helpServices = [
  { title: "Your Complete Journey", desc: "From consultation to campus arrival — we handle everything." },
  { title: "University Selection", desc: "NMC-approved universities that match your budget and goals." },
  { title: "Country Strategy", desc: "Navigate visa rules, climate, cost, and culture." },
  { title: "Admission Process", desc: "Application, documentation, and acceptance letters — fully managed." },
  { title: "Documentation Support", desc: "Transcripts, certifications, police clearance — zero errors." },
  { title: "Budget Planning", desc: "Transparent fee breakdowns and scholarship guidance." },
  { title: "Visa Assistance", desc: "Interview prep, file compilation, and embassy coordination." },
  { title: "Pre-Departure Briefing", desc: "Travel, accommodation, and cultural orientation sessions." },
  { title: "Hostel & Stay", desc: "Safe, vetted hostels booked before you land." },
  { title: "Airport Reception", desc: "Local team meets you at arrival — no confusion." },
  { title: "Not Alone Abroad", desc: "24/7 local support for any academic or personal issues." },
  { title: "Future Doctor Coaching", desc: "FMGE/NExT prep coaching and mentorship programs." },
  { title: "Parent Updates", desc: "Monthly progress reports and direct access to our team." }
];

const blogs = [
  {
    slug: 'is-mbbs-abroad-approved-by-nmc',
    image: uni1,
    date: 'April 17, 2026',
    title: 'Is MBBS Abroad Approved by NMC?',
    excerpt: 'Understand the critical NMC rules and guidelines that determine if your MBBS degree from abroad will be valid for practice in India.'
  },
  {
    slug: 'fmge-next-required-after-mbbs-abroad',
    image: uni3,
    date: 'April 17, 2026',
    title: 'Is FMGE / NExT Required After MBBS Abroad?',
    excerpt: 'One of the most critical steps after completing your medical degree abroad is clearing the licensing exam in India.'
  },
  {
    slug: 'do-indian-embassies-help-students-abroad',
    image: uni2,
    date: 'April 17, 2026',
    title: 'Do Indian Embassies Help Students Abroad?',
    excerpt: 'Learn about the scope and limitations of the support Indian embassies provide to medical students studying in foreign countries.'
  },
  {
    slug: 'is-it-safe-for-indian-students-abroad',
    image: uni3,
    date: 'April 17, 2026',
    title: 'Is It Safe for Indian Students Abroad?',
    excerpt: 'One of the biggest questions parents ask is about safety and community support in major destinations.'
  },
  {
    slug: 'best-countries-for-indian-students-to-study-mbbs',
    image: uni2,
    date: 'April 17, 2026',
    title: 'Which Countries are Best for Study MBBS?',
    excerpt: 'Compare top locations like Uzbekistan, Russia, and more to find your perfect fit.'
  },
];

const galleryPhotos = [
  { id: 1, url: img1 },
  { id: 2, url: img2 },
  { id: 3, url: img3 },
  { id: 4, url: img4 },
  { id: 5, url: img5 },
  { id: 6, url: img6 },
  { id: 7, url: img7 },
  { id: 8, url: img8 },
  { id: 9, url: img9 },
  { id: 10, url: img10 },
  { id: 11, url: img11 }
];

const galleryVideos = centralVideos.slice(0, 4);





const gpuStyle = {
  transform: 'translateZ(0)',
  willChange: 'scroll-position',
};

const sectionGpuStyle = {
  ...gpuStyle,
  contain: 'layout style paint'
};

const cardGpuStyle = {
  ...gpuStyle,
  backfaceVisibility: 'hidden'
};

const galleryStyleSheet = `
  .carousel-row { width: 100%; position: relative; display: flex; overflow: hidden; padding: 1rem 0; }
  .carousel-track { display: flex; gap: 1.5rem; width: max-content; }
  .carousel-item { flex-shrink: 0; width: 300px; aspect-ratio: 16/9; border-radius: 1.5rem; overflow: hidden; position: relative; border: 1px solid rgba(255,255,255,0.1); transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
  .carousel-item:hover { transform: scale(1.05) translateY(-5px); border-color: rgba(59, 130, 246, 0.5); box-shadow: 0 20px 40px rgba(0,0,0,0.4); z-index: 10; }
  .animate-scroll-left { animation: scroll-left var(--carousel-speed, 60s) linear infinite; }
  .animate-scroll-right { animation: scroll-right var(--carousel-speed, 60s) linear infinite; }
  @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 0.75rem)); } }
  @keyframes scroll-right { 0% { transform: translateX(calc(-50% - 0.75rem)); } 100% { transform: translateX(0); } }
  .no-scroll::-webkit-scrollbar { display: none; }
  .no-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  
  .card-shine { position: relative; overflow: hidden; }
  .card-shine::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent); transform: rotate(45deg); transition: 0.7s; }
  .card-shine:hover::before { left: 100%; }
`;



function VideoCard({ video, idx, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="video-card-premium group relative aspect-video w-[280px] sm:w-[360px] md:w-[420px] flex-shrink-0 rounded-[24px] md:rounded-[32px] overflow-hidden cursor-pointer bg-slate-900 border border-white/5 transition-all duration-700 hover:shadow-2xl"
      onClick={() => onClick(video)}
    >
      <div className="absolute inset-0 z-0">
        <LazyImage
          src={video.thumbnail || video.thumb}
          alt={video.title}
          width={400}
          height={225}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-80" />
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center transition-all group-hover:bg-blue-600">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563eb"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-20">
        <h3 className="text-white text-lg font-bold leading-tight line-clamp-1">{video.title}</h3>
      </div>
    </motion.div>
  );
}

// ─── UniversityCard — 3D Cinematic Tilt & Glassmorphism ───────────────────────────
function UniversityCard({ data, index, onUniClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-[280px] sm:w-[320px] flex-shrink-0"
    >
      <Card
        className="group relative h-full overflow-hidden rounded-[24px] md:rounded-[32px] border-white/10 bg-slate-900/40 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
        style={{ WebkitBackdropFilter: "blur(20px)" }}
        onClick={() => onUniClick(data.id)}
      >
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={data.image}
            alt={data.name}
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
          {/* Gradient & Hover Overlay combined */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          <div className="absolute inset-0 flex items-center justify-center bg-blue-600/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-xl"
            >
              <BookOpen className="h-4 w-4" />
              View University
            </motion.button>
          </div>

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-blue-600/80 backdrop-blur-md border-none text-[9px] font-black uppercase tracking-widest">
              Govt Approved
            </Badge>
            {data.tags?.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-white/10 backdrop-blur-md border-white/10 text-[9px] text-white">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Medical Excellence</span>
            </div>
            <h3 className="text-xl font-black leading-tight text-white transition-colors group-hover:text-blue-400">
              {data.name}
            </h3>
            <p className="line-clamp-2 text-xs text-gray-400 leading-relaxed">
              {data.sub}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Duration: <span className="text-white">6 Years</span></span>
            </div>

            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs group-hover:translate-x-1 transition-transform">
              Explore <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── UniversitySection — Optimized Layout ───────────────────────
function UniversitySection({ tag, title, unis, onUniClick, className, style }) {
  const scrollRef = useRef(null);

  const renderedUnis = useMemo(() => (
    unis.map((uni, idx) => (
      <UniversityCard key={uni.id} data={uni} index={idx} onUniClick={onUniClick} />
    ))
  ), [unis, onUniClick]);

  return (
    <section className={`py-24 bg-slate-950 relative overflow-hidden ${className || ""}`} style={style}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 transition-all hover:bg-blue-500/20 cursor-default">
            {tag}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">{title}</h2>
          <div className="w-20 h-1.5 bg-blue-600 mt-6 rounded-full" />
        </motion.header>

        <div className="relative overflow-x-auto pb-12 no-scroll snap-x snap-mandatory" ref={scrollRef}>
          <div className="flex gap-8 min-w-max">
            {renderedUnis}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 text-gray-500 text-[10px] font-black uppercase tracking-widest md:hidden animate-pulse">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          <span>Slide to discover</span>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}

function LazySection({ children, height = "400px" }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div ref={ref} style={{ minHeight: inView ? 'auto' : height }}>
      {inView ? children : null}
    </div>
  );
}

export default function HomePage() {
  const parentRef = useRef(null);
  const asideRef = useRef(null);
  const listRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();

  const handleUniClick = useCallback((id) => {
    navigate(`/university/${id}`);
  }, [navigate]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Optimized Scroll Animation logic
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (parentRef.current && asideRef.current) {
          ScrollTrigger.create({
            trigger: parentRef.current,
            start: "top 100px",
            end: () => `bottom ${asideRef.current.offsetHeight + 100}px`,
            pin: asideRef.current,
            pinSpacing: false,
          });
        }
      });

      // Simple stagger for help items
      gsap.fromTo(".help-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".help-list",
            start: "top 85%",
          },
          ease: "power2.out"
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const memoizedHero = useMemo(() => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={isMobile ? "mobile-hero-view" : "desktop-hero-view"}
      style={gpuStyle}
    >
      <HorizonHeroSection />
    </motion.div>
  ), [isMobile]);

  const memoizedAbout = useMemo(() => (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-stretch gap-8">

            {/* Video - medium on mobile/tablet */}
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 aspect-video">
                <video src={aboutVideo} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
              </div>
              <div className="hidden md:flex absolute -bottom-4 -right-4 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex-col items-center z-10">
                <span className="text-3xl font-black text-blue-600 leading-none">100+</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 text-center leading-tight mt-1">Global<br />Placements</span>
              </div>
            </div>

            {/* Belief Card */}
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-5">
                <i className="fa-solid fa-star text-sm"></i>
              </div>
              <h3 className="text-lg font-black text-white mb-2 italic">Our Belief</h3>
              <p className="text-slate-300 text-base leading-relaxed font-medium italic mb-4">
                "Your dream is our responsibility."
              </p>
              <div className="h-0.5 w-10 bg-blue-600 rounded-full mb-4" />
              <p className="text-slate-500 text-sm leading-relaxed">
                We believe every student deserves the right guidance and a clear path to achieve their medical career goals without confusion or hidden processes.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-10 lg:pt-10">
            <div>
              <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.25em] inline-block mb-6">
                The Bravo Groups Legacy
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-8">
                Founded in <span className="text-blue-600">Vellore</span>,<br />
                Built for the World.
              </h2>

              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 mb-8 relative hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-blue-600 rounded-full" />
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-bold pl-2">
                  Bravo Groups Private Limited was established in 2022 in Vellore, Tamil Nadu, with a clear vision to make MBBS abroad accessible, affordable, and transparent for Indian students.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-black text-slate-900 whitespace-nowrap">Our Story</h3>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>
                <div className="space-y-4 text-slate-500 text-base sm:text-lg leading-relaxed">
                  <p>Bravo Groups was founded to solve a common problem—students struggling with <span className="text-slate-900 font-bold">lack of proper guidance, high costs, and unclear admission processes</span> in medical education abroad.</p>
                  <p>Starting with a small group of aspiring doctors, we focused on providing honest counseling and reliable support, helping students choose the right universities based on their goals and budget.</p>
                  <p>Our commitment to <span className="text-blue-600 font-black">transparency, trust, and student success</span> has helped us guide <span className="text-slate-900 font-black underline decoration-blue-600 decoration-4 underline-offset-4">100+ students</span> toward their dream of studying MBBS abroad.</p>
                </div>
              </div>

              <div className="pt-10">
                <Link to="/contact">
                  <button className="inline-flex items-center px-7 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors duration-200 group">
                    Start Your Story With Us
                    <i className="fa-solid fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  ), []);
  const memoizedWhyChoose = useMemo(() => (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">The Bravo Groups Advantage</h2>
          <p className="text-slate-500 text-lg">We provide reliable guidance from free counseling to securing admission in top government medical universities abroad.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyReasons.map((reason, idx) => (
            <motion.div
              key={reason.title}
              className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-6">
                <i className={reason.icon}></i>
              </div>
              <h3 className="text-slate-900 text-lg font-bold mb-3">{reason.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  ), []);


  const memoizedUniversities = useMemo(() => (
    <div className="bg-slate-950 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
            Global Reach
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Choose Your <span className="text-blue-600">Future Destination</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore world-class medical universities across top destinations. We help you choose the best fit for your medical career.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <UniversitySection tag="Elite Uzbekistan" title="Uzbekistan" unis={destinations} onUniClick={handleUniClick} className="!bg-transparent !py-12" />
        <div className="max-w-7xl mx-auto px-6"><div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" /></div>

        <UniversitySection tag="Kyrgyzstan Choice" title="Kyrgyzstan" unis={kyrgyzstanUnis} onUniClick={handleUniClick} className="!bg-transparent !py-12" />
        <div className="max-w-7xl mx-auto px-6"><div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" /></div>

        <UniversitySection tag="Georgia Standard" title="Georgia" unis={georgiaUnis} onUniClick={handleUniClick} className="!bg-transparent !py-12" />
        <div className="max-w-7xl mx-auto px-6"><div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" /></div>

        <UniversitySection tag="Russian Heritage" title="Russia" unis={russiaUnis} onUniClick={handleUniClick} className="!bg-transparent !py-12" />
      </div>
    </div>
  ), [handleUniClick]);

  const renderedHelpServices = useMemo(() => (
    helpServices.map((s, idx) => (
      <motion.div
        key={s.title}
        className="help-item group flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.05 }}
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <span className="text-lg font-black">{String(idx + 1).padStart(2, '0')}</span>
        </div>
        <div className="flex-grow">
          <h3 className="text-white text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors">{s.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
        </div>
        <div className="flex-shrink-0 text-gray-600 group-hover:text-blue-500 transform group-hover:translate-x-2 transition-all">
          <i className="fa-solid fa-chevron-right text-xs"></i>
        </div>
      </motion.div>
    ))
  ), []);

  const memoizedServices = useMemo(() => (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight uppercase tracking-tighter mb-4">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-8" />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            We provide end-to-end support for your medical education journey, ensuring transparency and excellence at every step.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-20" ref={parentRef}>
          <aside className="lg:w-1/3" ref={asideRef}>
            <motion.div
              className="sticky top-32 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  Professional<br />
                  <span className="text-blue-600">Guidance</span>
                </h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                We take over every step — counseling, documentation, visa, and beyond, ensuring a smooth path to your future.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-blue-500/50 transition-colors">
                  <span className="block text-2xl font-black text-white group-hover:text-blue-400 transition-colors">100+</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Students Placed</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-blue-500/50 transition-colors">
                  <span className="block text-2xl font-black text-white group-hover:text-blue-400 transition-colors">15+</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Partners</span>
                </div>
              </div>
              <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-2xl italic text-blue-400 text-sm shadow-xl shadow-blue-600/5">
                "We don't just send students abroad… we take responsibility for their future."
              </div>
            </motion.div>
          </aside>

          <div className="lg:w-2/3 help-list grid gap-4">
            {renderedHelpServices}
          </div>
        </div>
      </div>
    </section>
  ), [renderedHelpServices]);

  const memoizedGallery = useMemo(() => (
    <section className="py-24 bg-slate-900 overflow-hidden" style={sectionGpuStyle}>
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6 w-fit mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            Visualizing Success
          </span>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-6">Our Student Community</h2>
          <p className="text-white text-lg max-w-2xl mx-auto">A glimpse into the life of our students pursuing their medical dreams across the globe.</p>
        </motion.div>
      </div>

      <div className="space-y-8">
        {/* Row 1 — scrolls left */}
        <div className="carousel-row">
          <div className="carousel-track animate-scroll-left" style={{ '--carousel-speed': '80s' }}>
            {[...galleryPhotos, ...galleryPhotos].map((photo, idx) => (
              <div className="carousel-item" key={`r1-${idx}`}>
                <LazyImage src={photo.url} alt={`Gallery ${photo.id}`} width={300} height={200} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="carousel-row">
          <div className="carousel-track animate-scroll-right" style={{ '--carousel-speed': '100s' }}>
            {[...galleryPhotos, ...galleryPhotos].map((photo, idx) => (
              <div className="carousel-item" key={`r2-${idx}`}>
                <LazyImage src={photo.url} alt={`Gallery ${photo.id}`} width={300} height={200} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex justify-center pt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/gallery">
            <GlassButton size="lg" className="shadow-2xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-shadow">
              Explore Full Gallery <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
            </GlassButton>
          </Link>
        </motion.div>
      </div>
    </section>
  ), []);

  const memoizedVideoGallery = useMemo(() => (
    <section className="py-32 bg-slate-950 relative overflow-hidden" ref={parentRef}>
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-20">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              Direct From Campus
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
              Cinematic<br />
              <span className="text-blue-600">Moments</span>
            </h2>
          </motion.div>

          <motion.div
            className="lg:w-1/3 text-left lg:text-left"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Experience the vibrant culture, academic life, and student journey through our lens.
            </p>
            <Link to="/video-gallery">
              <GlassButton size="lg" contentClassName="flex items-center gap-3">
                Explore Full Archive
                <ChevronRight className="w-4 h-4" />
              </GlassButton>
            </Link>
          </motion.div>
        </div>

        {/* Video Scrolling Container */}
        <div className="relative -mx-6 px-6 overflow-x-auto no-scroll snap-x snap-mandatory pb-20">
          <div className="flex gap-10 min-w-max">
            {galleryVideos && galleryVideos.length > 0 ? (
              galleryVideos.map((video, idx) => (
                <div key={video.id} className="snap-center">
                  <VideoCard video={video} idx={idx} onClick={setActiveVideo} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-40 bg-white/5 rounded-[40px] border border-white/5 border-dashed">
                <span className="text-gray-600 font-black uppercase tracking-widest">Awaiting Footage...</span>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Progress / Navigation hint */}
        <div className="flex items-center justify-center gap-4 text-gray-700">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-gray-800" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Swipe to navigate</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-gray-800" />
        </div>
      </div>
    </section>
  ), [galleryVideos, setActiveVideo]);

  const memoizedTestimonials = useMemo(() => (
    <section className="section testimonials-premium py-24" style={sectionGpuStyle}>
      <div className="testimonials-container max-w-7xl mx-auto px-6" >
        <motion.div
          className="testimonials-header text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="testimonials-eyebrow inline-block px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">Student Success Stories</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6">Voices of Trust & Achievement</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Real students, real journeys — hear from those who made their MBBS dreams a reality with Bravo Groups.</p>
        </motion.div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20" >
          {/* Card 1 - Video */}
          <motion.div
            className="testimonial-card video-card bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            style={cardGpuStyle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="testimonial-media relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-video overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/EhrRTJqBqfc"
                title="Student Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Student Story
              </div>
            </div>
            <div className="testimonial-body p-8 flex-grow flex flex-col">
              <div className="text-blue-600/20 mb-4 transform group-hover:scale-110 transition-transform origin-left">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 italic flex-grow">"Bravo Groups made my MBBS journey smooth from day one. Their support in documentation and visa was exceptional."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black">DS</div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Deepika Sharma</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MBBS • Tashkent Medical Academy</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Image */}
          <motion.div
            className="testimonial-card image-card bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="testimonial-media aspect-[3/4] sm:aspect-[4/3] lg:aspect-video overflow-hidden relative">
              <LazyImage src={g2} alt="Student testimonial" width={400} height={533} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="testimonial-body p-8 flex-grow flex flex-col">
              <div className="text-blue-600/20 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 italic flex-grow">"From counseling to campus settlement, they were with me at every step. Truly grateful for their guidance."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-black">RK</div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Ravi Kumar</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MBBS • Samarkand State Medical</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Image */}
          <motion.div
            className="testimonial-card image-card bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="testimonial-media aspect-[3/4] sm:aspect-[4/3] lg:aspect-video overflow-hidden relative">
              <LazyImage src={g3} alt="Student testimonial" width={400} height={533} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="testimonial-body p-8 flex-grow flex flex-col">
              <div className="text-blue-600/20 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 italic flex-grow">"Best decision I made was choosing Bravo Groups. Their transparency and local support in Vellore made all the difference."</p>
              <div className="testimonial-author flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-black">PM</div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">Priya Menon</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MBBS • Bukhara State Medical</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="testimonials-footer text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="trust-stats flex flex-wrap justify-center items-center gap-12 bg-white/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-lg">
            <div className="trust-stat text-center"><span className="block text-3xl font-black text-slate-900">100+</span><span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Success Stories</span></div>
            <div className="hidden md:block w-[1px] h-12 bg-slate-200"></div>
            <div className="trust-stat text-center"><span className="block text-3xl font-black text-slate-900">4.9/5</span><span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Average Rating</span></div>
            <div className="hidden md:block w-[1px] h-12 bg-slate-200"></div>
            <div className="trust-stat text-center"><span className="block text-3xl font-black text-slate-900">100%</span><span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Visa Success</span></div>
          </div>
        </motion.div>

        <div className="flex justify-center mt-16">
          <Link to="/testimonials" className="no-underline">
            <GlassButton size="lg" contentClassName="flex items-center gap-2">
              View All Reviews
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </GlassButton>
          </Link>
        </div>
      </div>
    </section>
  ), []);

  const memoizedBlogs = useMemo(() => (
    <section className="section blogs py-24 bg-slate-50">
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div
          className="blog-section-header text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6">Latest Medical Education Blogs</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
        </motion.div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((b, idx) => (
            <GlassBlogCard
              key={b.title}
              title={b.title}
              excerpt={b.excerpt}
              image={b.image}
              date={b.date}
              tags={["MBBS", "Study Abroad"]}
              author={{
                name: "Bravo Team",
                avatar: "/assets/bgremovedlogo.webp"
              }}
              readTime="4 min read"
              className="max-w-none"
            />
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/blog" className="no-underline">
            <GlassButton size="lg" contentClassName="flex items-center gap-2">
              View All Blogs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </GlassButton>
          </Link>
        </motion.div>
      </div>
    </section>
  ), []);

  return (
    <>
      <style>{galleryStyleSheet}</style>

      {memoizedHero}
      {memoizedAbout}
      {memoizedWhyChoose}
      {memoizedUniversities}
      {memoizedServices}
      <LazySection height="600px">{memoizedGallery}</LazySection>
      <LazySection height="800px">{memoizedVideoGallery}</LazySection>

      {/* Video Modal */}
      {activeVideo && (
        <div className="vg-modal-overlay" onClick={() => setActiveVideo(null)} style={{ zIndex: 10000 }}>
          <div className="vg-modal-content w-[95%] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button className="vg-modal-close" onClick={() => setActiveVideo(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="vg-iframe-wrapper">
              <iframe
                src={`${activeVideo.url.replace('watch?v=', 'embed/')}?autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="vg-modal-info">
              <h2 className="text-white text-xl font-bold mb-2">{activeVideo.title}</h2>
              <p className="text-gray-400 text-sm">{activeVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

      <LazySection height="600px">{memoizedTestimonials}</LazySection>
      <LazySection height="600px">{memoizedBlogs}</LazySection>
    </>
  );
}
