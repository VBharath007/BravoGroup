import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from '../components/ui/spline';

const serviceStudent = '/assets/service_student.webp';

const StatisticCounter = React.memo(({ target, suffix = "+", duration = 2000, step = 1 }) => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);

  const interval = useMemo(() => duration / (target / step), [duration, target, step]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (count < target) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + step, target));
      }, interval);
      return () => clearTimeout(timer);
    }
  }, [count, target, visible, interval, step]);

  return <span ref={elementRef}>{count}{suffix}</span>;
});

const AboutPage = () => {
  const stats = useMemo(() => [
    { target: 100, step: 5, label: "Students Placed" },
    { target: 15, step: 1, label: "Partner Universities" },
    { target: 100, step: 10, suffix: "%", label: "Visa Success" }
  ], []);

  const services = useMemo(() => [
    "Counseling", "Visa Assistance", "University Selection",
    "Bank Loan", "Admission Guidance", "Travel Help",
    "Documentation", "Airport Pickup", "Accommodation"
  ], []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const memoizedHero = useMemo(() => (
    <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 lg:opacity-100">
         <SplineScene scene="/assets/scene.splinecode" className="w-full h-full" />
      </div>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#020c1b] via-[#020c1b]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#020c1b] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center lg:items-start text-center lg:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 inline-block">
            Since 2022
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8">
            Trusted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              Medical Legacy
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            Bravo Groups is dedicated to guiding aspiring medical students to achieve their dreams of studying MBBS abroad with transparency and excellence.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
            className="px-10 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-full shadow-2xl hover:bg-blue-500 transition-all hover:-translate-y-1"
          >
            Start Your Story
          </button>
        </motion.div>
      </div>
    </section>
  ), []);

  const memoizedStats = useMemo(() => (
    <section className="relative z-30 py-12 bg-blue-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-4xl md:text-6xl font-black text-white mb-2">
                <StatisticCounter target={stat.target} step={stat.step} suffix={stat.suffix} />
              </span>
              <span className="text-blue-100 font-black text-xs uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  ), [stats]);

  const memoizedContent = useMemo(() => (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
          <div className="order-2 lg:order-1">
             <div className="mb-12">
               <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-4 block">Our Roots</span>
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Founded in Vellore</h2>
               <p className="text-slate-600 text-lg leading-relaxed mb-6">
                 <strong>BRAVO GROUPS PRIVATE LIMITED</strong> was established in <strong>2022 in Vellore, Tamil Nadu</strong>, with a clear vision to make <strong>MBBS abroad accessible, affordable, and transparent</strong> for Indian students.
               </p>
               
               <div className="h-px w-full bg-slate-100 my-10" />

               <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Our Story</h2>
               <div className="space-y-6 text-slate-500 text-base leading-relaxed">
                 <p>
                   Bravo Groups was founded with the aim of solving a common problem—students struggling with <strong>lack of proper guidance, high costs, and unclear admission processes</strong> in medical education abroad.
                 </p>
                 <p>
                   Starting with a small group of aspiring doctors, we focused on providing <strong>honest counseling and reliable support</strong>, helping students choose the right universities based on their goals and budget.
                 </p>
                 <p>
                   Over time, our commitment to <strong>transparency, trust, and student success</strong> has helped us grow steadily. Today, Bravo Groups has successfully guided <strong>100+ students</strong> toward their dream of studying MBBS abroad across multiple countries.
                 </p>
               </div>
             </div>

             <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group" style={{ WebkitBackdropFilter: "blur(20px)" }}>
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-quote-right text-6xl"></i>
                </div>
                <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-4 block">Our Belief</span>
                <h3 className="text-2xl font-black mb-4 italic text-blue-400">"Your dream is our responsibility."</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We believe every student deserves the right guidance and a clear path to achieve their medical career goals without confusion or hidden processes.
                </p>
             </div>
          </div>

          <div className="order-1 lg:order-2 sticky top-28">
             <div className="relative group">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl group-hover:opacity-20 transition-opacity" />
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                   <img src={serviceStudent} alt="Student" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" fetchpriority="high" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden sm:block">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl">
                         <i className="fa-solid fa-graduation-cap"></i>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Success</p>
                         <p className="text-lg font-black text-slate-900">100+ Placements</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 cursor-default">
              <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-check text-xs"></i>
              </div>
              <span className="font-bold text-sm">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  ), [services]);

  const memoizedCTA = useMemo(() => (
    <section className="py-24 bg-[#020c1b] relative overflow-hidden text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
         <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Ready to Join 100+ Successful Students?</h2>
         <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Get personalized guidance from the most trusted medical consultancy in Vellore. Your global medical career starts here.
         </p>
         <button 
           onClick={() => window.location.href = '/contact'}
           className="px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.5)] transition-all active:scale-95"
         >
           Contact Our Experts
         </button>
      </div>
    </section>
  ), []);

  return (
    <div className="bg-[#020c1b] overflow-hidden min-h-screen">
      {memoizedHero}
      {memoizedStats}
      {memoizedContent}
      {memoizedCTA}
    </div>
  );
};

export default AboutPage;
