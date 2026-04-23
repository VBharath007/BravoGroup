import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from '../components/ui/spline';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './AboutPage.css';


// Reusing assets
import serviceStudent from '../assets/service_student.webp';

// ── STATISTIC COUNTER COMPONENT ──
function StatisticCounter({ target, suffix = "+", duration = 2000, step = 1 }) {
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const elementRef = useRef(null);

  // Adjusted calculated interval based on number of steps to reach target
  const stepsCount = target / step;
  const interval = duration / stepsCount;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
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

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
}

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="about-page">

      {/* ── DYNAMIC 3D HERO SECTION ── */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row bg-black overflow-x-hidden pt-24 lg:pt-0">

        {/* Left Side: 50% Content */}
        <div className="w-full lg:w-1/2 min-h-[60vh] lg:min-h-screen flex flex-col justify-center text-left px-6 lg:pl-20 xl:pl-32 lg:pr-12 relative z-20 pb-16 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-6 pt-10 lg:pt-0"
          >
            <span className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black tracking-[0.2em] uppercase backdrop-blur-md inline-block">
              Empowering Medical Dreams
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-white tracking-tight mb-8 leading-[1.1] drop-shadow-2xl"
          >
            Trusted Overseas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Guidance
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative overflow-hidden group max-w-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <p className="text-neutral-300 text-base lg:text-lg leading-relaxed mb-8 relative z-10">
              <strong>Bravo Groups</strong> is dedicated to guiding aspiring medical students to achieve their dreams of studying MBBS abroad. We specialize in admissions to top government medical universities in Uzbekistan, offering transparent, affordable, and reliable services. From counseling to visa, travel, and post-arrival support, we ensure a smooth journey for every student.
            </p>
            <button
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 relative z-10"
              onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
            >
              Get Counseling Now
            </button>
          </motion.div>
        </div>

        {/* Right Side: 3D Spline Interactive Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute inset-0 top-0 lg:static w-full lg:w-1/2 h-[500px] lg:h-[700px] z-0 lg:z-10 pointer-events-none opacity-40 lg:opacity-100 flex items-center justify-center overflow-hidden"
        >
          {/* Optional ambient glow behind the 3D model */}
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <SplineScene
            scene="https://prod.spline.design/kV92xg9CLEcxBYA3/scene.splinecode"
            className="w-full h-full relative z-10 block pointer-events-none"
          />
        </motion.div>
        {/* Mission & Vision 3D Glass Cards */}

      </section>

      {/* ── TRANSITION STATS BAR (Blue Background) ── */}
      <section className="stats-bar-blue relative z-30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            className="stats-grid-horizontal"
          >
            {[
              { target: 100, step: 10, label: "Students Placed" },
              { target: 7, step: 1, label: "Partner Universities" },
              { target: 100, step: 20, suffix: "%", label: "Visa Success Rate" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 100 }}
                className="stat-pill shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all"
              >
                <div className="stat-num">
                  <StatisticCounter target={stat.target} step={stat.step} suffix={stat.suffix} />
                </div>
                <div className="stat-lbl">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES & TRUST SECTION (Tailwind Redesign) ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              {/* Founded Block */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
                  Our Origins
                </div>
                <h3 className="text-3xl font-extrabold text-neutral-900 mb-4 tracking-tight">
                  Founded in Vellore
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  <span className="font-bold text-neutral-900">BRAVO GROUPS PRIVATE LIMITED</span> was established in <span className="font-semibold text-blue-600">2022 in Vellore, Tamil Nadu</span>, with a clear vision to make <span className="font-medium italic text-neutral-800">MBBS abroad accessible, affordable, and transparent</span> for Indian students.
                </p>
              </div>

              {/* Story Block */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-6 tracking-tight">
                  Our Story
                </h2>
                <div className="space-y-4">
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    BRAVO GROUPS was founded with the aim of solving a common problem—students struggling with <span className="font-semibold text-neutral-800">lack of proper guidance, high costs, and unclear admission processes</span> in medical education abroad.
                  </p>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Starting with a small group of aspiring doctors, we focused on providing <span className="font-semibold text-blue-600">honest counseling and reliable support</span>, helping students choose the right universities based on their goals and budget.
                  </p>
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Over time, our commitment to <span className="font-semibold text-neutral-800">transparency, trust, and student success</span> has helped us grow steadily. Today, BRAVO GROUPS has successfully guided <span className="font-bold text-blue-600">100+ students</span> toward their dream of studying MBBS abroad across multiple countries.
                  </p>
                </div>
              </div>

              {/* Services List */}
              <div className="mb-12">
                <h2 className="text-2xl font-extrabold text-neutral-900 mb-4 tracking-tight">Premium Services</h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  From counseling to accommodation, we provide complete end-to-end support for your MBBS journey.
                </p>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {[
                    "Counseling Process", "Visa Assistance", "University Selection",
                    "Bank Loan Assistance", "Admission Guidance", "Travel Assistance",
                    "Documentation", "Airport Pickup", "Accommodation"
                  ].map((service, idx) => (
                    <motion.li
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4 } }
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/60 font-semibold text-sm text-neutral-700 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-default"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      </div>
                      {service}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Belief Block */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-50/50 border border-blue-100/80 shadow-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-indigo-600" />
                <h3 className="text-xl font-extrabold text-neutral-900 mb-3 tracking-tight">
                  Our Belief
                </h3>
                <blockquote className="text-xl font-medium text-blue-700 italic mb-4">
                  "Your dream is our responsibility."
                </blockquote>
                <p className="text-neutral-600 leading-relaxed">
                  We believe every student deserves the right guidance and a clear path to achieve their medical career goals without confusion or hidden processes.
                </p>
              </div>
            </motion.div>

            {/* Right Visuals */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative w-full aspect-[4/5] rounded-[2.5rem] z-10 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-3xl group-hover:blur-2xl transition-all duration-500" />
                <img
                  src={serviceStudent}
                  alt="Student Reading Brochure"
                  className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


    </div>
  );
}