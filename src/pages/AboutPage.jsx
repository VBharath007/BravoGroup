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

      {/* ── SERVICES & TRUST SECTION (Matching Screenshot) ── */}
      <section className="about-services-section relative overflow-hidden">
        <div className="container">
          <div className="services-row-flex flex flex-col     lg:flex-row gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="services-content-left"
            >
              <div className="mb-10">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-blue-600 mb-4">
                  <span className="text-3xl">🏢</span> Founded in Vellore
                </h3>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  <span className="font-bold text-neutral-900">BRAVO GROUPS PRIVATE LIMITED</span> was established in <span className="font-bold text-blue-600">2022 in Vellore, Tamil Nadu</span>, with a clear vision to make <span className="font-bold italic">MBBS abroad accessible, affordable, and transparent</span> for Indian students.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold text-neutral-900 mb-6">
                  <span className="text-4xl">📖</span> Our Story
                </h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  BRAVO GROUPS was founded with the aim of solving a common problem—students struggling with <span className="font-semibold text-neutral-800">lack of proper guidance, high costs, and unclear admission processes</span> in medical education abroad.
                </p>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  Starting with a small group of aspiring doctors, we focused on providing <span className="font-semibold text-blue-600">honest counseling and reliable support</span>, helping students choose the right universities based on their goals and budget.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Over time, our commitment to <span className="font-semibold text-neutral-800">transparency, trust, and student success</span> has helped us grow steadily. Today, BRAVO GROUPS has successfully guided <span className="font-bold text-blue-600">100+ students</span> toward their dream of studying MBBS abroad across multiple countries.
                </p>
              </div>

              {/* Restored Services List */}
              <div className="mb-12">
                <h2 className="section-title text-3xl font-extrabold mb-6">Our Premium Services</h2>
                <p className="services-intro text-lg text-neutral-600 mb-8 leading-relaxed">
                  From counseling to accommodation, we provide complete end-to-end support for your MBBS journey. Our services ensure a smooth, secure, and successful experience.
                </p>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="services-grid-list grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {[
                    "COUNSELING PROCESS", "VISA ASSISTANCE", "UNIVERSITY SELECTION",
                    "BANK LOAN ASSISTANCE", "ADMISSION GUIDANCE", "TRAVEL ASSISTANCE",
                    "DOCUMENTATION", "AIRPORT PICKUP", "ACCOMMODATION"
                  ].map((service, idx) => (
                    <motion.li
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { type: "spring", bounce: 0.4 } }
                      }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 font-bold text-sm md:text-base text-neutral-800 cursor-pointer"
                    >
                      <span className="check-icon text-blue-600 text-xl"><i className="fa-solid fa-circle-check"></i></span>
                      {service}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <i className="fa-solid fa-quote-right text-6xl text-blue-600"></i>
                </div>
                <h3 className="flex items-center gap-3 text-2xl font-bold text-neutral-900 mb-4">
                  <span className="text-3xl">🌟</span> Our Belief
                </h3>
                <blockquote className="text-xl font-medium text-blue-700 italic mb-4">
                  “Your dream is our responsibility.”
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
              className="services-visual-right relative"
            >
              <div className="services-image-main relative">
                {/* Glowing Abstract Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-[2.5rem] blur-3xl opacity-20 animate-pulse" />

                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  src={serviceStudent}
                  alt="Student Reading Brochure"
                  className="relative z-10 w-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white/50"
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      {/* <section className="section our-process">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-tag">Simplified Journey</div>
            <h2 className="section-title">Our Transparent Process</h2>
            <div className="gold-line" />
          </div>
          <div className="process-grid">
            <div className="process-card" data-aos="fade-up">
              <div className="process-icon-box">
                <span className="p-icon">🤝</span>
                <span className="process-number">01</span>
              </div>
              <div className="process-content">
                <h3>Consulting</h3>
                <p>We begin with a personalized consultation to capture your vision and needs.</p>
              </div>
              <span className="line-1"></span><span className="line-2"></span><span className="line-3"></span><span className="line-4"></span>
            </div>

            <div className="process-card" data-aos="fade-up">
              <div className="process-icon-box">
                <span className="p-icon">✈️</span>
                <span className="process-number">02</span>
              </div>
              <div className="process-content">
                <h3>Travel</h3>
                <p>Our experts craft a detailed plan with eco-friendly practices for your approval.</p>
              </div>
              <span className="line-1"></span><span className="line-2"></span><span className="line-3"></span><span className="line-4"></span>
            </div>

            <div className="process-card" data-aos="fade-up">
              <div className="process-icon-box">
                <span className="p-icon">✅</span>
                <span className="process-number">03</span>
              </div>
              <div className="process-content">
                <h3>Execute</h3>
                <p>Our skilled team transforms your medical journey with precision and care.</p>
              </div>
              <span className="line-1"></span><span className="line-2"></span><span className="line-3"></span><span className="line-4"></span>
            </div>
          </div>
        </div> 
      </section> */}

      {/* ── OUR STORY ── */}
      {/* <section className="section story">
        <div className="container">
          <div className="story-grid">
            <div className="story-image" data-aos="fade-right">
              <LazyImage src={aboutMain} alt="Our Journey" />
              <div className="experience-badge">
                <span>4+</span>
                <p>Years of Excellence</p>
              </div>
            </div>
            <div className="story-text" data-aos="fade-left">
              <div className="section-tag">Our Legacy</div>
              <h2 className="section-title">The Story Behind bravogroup Overseas</h2>
              <div className="gold-line" />
              <p>
                Founded in 2024, bravogroup Overseas was born from a simple yet powerful goal:
                to bridge the gap between talented aspiring doctors in India and the
                world-class medical institutions in Uzbekistan.
              </p>
              <p>
                What started as a small counseling office has now grown into a premier
                international education consultancy. We have successfully guided
                hundreds of students through the complex process of securing admission,
                navigating visas, and settling into a new culture.
              </p>
              <div className="story-stats">
                <div className="stat-item">
                  <h3>100+</h3>
                  <p>Students Placed</p>
                </div>
                <div className="stat-item">
                  <h3>7+</h3>
                  <p>Partner Universities</p>
                </div>
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Visa Success</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section vision-mission">
        <div className="container">
          <div className="vm-grid">
            <div className="vm-card mission" data-aos="fade-up">
              <div className="vm-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                Creating a seamless, ethical, and transparent journey for Indian students
                pursuing MBBS in Uzbekistan. We aim to eliminate the hurdles of overseas
                education through expert guidance and local support, ensuring every
                student can focus solely on becoming an exceptional doctor.
              </p>
            </div>
            <div className="vm-card vision" data-aos="fade-up" data-aos-delay="200">
              <div className="vm-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted name in international medical education,
                recognized for our unwavering commitment to student success, integrity,
                and the long-term impact we create in the global healthcare workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section student-gallery-ticker">
        <div className="container">
          <div className="gallery-ticker-header">
            <div className="gallery-header-left" data-aos="fade-right">
              <h2 className="section-title">Student Success Gallery</h2>
              <p className="gallery-header-desc">Get a glimpse of the dynamic and enriching student life at universities across Uzbekistan.</p>
            </div>
            <div className="gallery-controls" data-aos="fade-left">
              <button className="gallery-arrow prev" onClick={() => scrollTicker('left')} aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
              </button>
              <button className="gallery-arrow next" onClick={() => scrollTicker('right')} aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="ticker-wrapper" data-aos="fade-up">
          <div className="ticker-inner" ref={tickerRef}>
            <div className="ticker-track">
              {studentImages.map((img, idx) => (
                <div className="ticker-item" key={idx}>
                  <LazyImage src={img} alt={`Student Image ${idx + 1}`} />
                  <div className="ticker-overlay"></div>
                </div>
              ))}
              
              {studentImages.map((img, idx) => (
                <div className="ticker-item" key={`dup-${idx}`}>
                  <LazyImage src={img} alt={`Student Image Duplicated ${idx + 1}`} />
                  <div className="ticker-overlay"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="section our-office">
        <div className="container">
          <div className="office-grid">
            <div className="office-content" data-aos="fade-right">
              <div className="section-tag">Direct Access</div>
              <h2 className="section-title">Our Physical Presence</h2>
              <div className="gold-line" />
              <p>
                While we operate internationally, we believe in the transparency of a
                local presence. Our headquarters in Vellore serves as a hub for student
                counseling, document verification, and parent-teacher meetings.
              </p>
              <div className="office-address">
                <div className="address-icon">📍</div>
                <div className="address-text">
                  RTJ Complex, 13th Street, Phase 2,<br />
                  Sathuvacheri, Vellore, Tamil Nadu 632009
                </div>
              </div>
              <button className="visit-btn">Schedule a Visit</button>
            </div>
            <div className="office-image" data-aos="fade-left">
              <div className="office-placeholder-img">
                <LazyImage src={whyChooseUs1} alt="Our Office" />
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
}
