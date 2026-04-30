import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Animation Variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ───────────────────────────────────────────────── */
const services = [
  'MBBS Abroad Admission Guidance', 'Country & University Selection Support',
  'NEET-Based Eligibility Counseling', 'Complete Application Processing',
  'Visa & Documentation Assistance', 'Education Loan & Budget Guidance',
  'Pre-Departure Student Training', 'Airport Pickup & Abroad Support',
  'Hostel & Accommodation Assistance', 'FMGE / NExT Exam Guidance',
  'Parent Support & Regular Updates', 'Post-Arrival Student Care',
];

const quickActions = [
  { icon: '📞', label: 'Call Now', href: 'tel:+919150484747', color: 'from-blue-500 to-blue-600' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/919150484747', color: 'from-green-500 to-green-600' },
  { icon: '📧', label: 'Send Email', href: 'mailto:bravogroups@gmail.com', color: 'from-purple-500 to-purple-600' },
  { icon: '🌍', label: 'Visit Office', href: 'https://maps.google.com/?q=No:+265,+Regional+Transport+Office+Rd,+Sathuvachari,+Vellore', color: 'from-orange-500 to-orange-600' },
];

/* ─── Component ──────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', query: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, email, query } = formData;
    const message = `Hello Zenova Groups, I have a query.%0A%0A` +
      `*Name:* ${firstName} ${lastName}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Email:* ${email}%0A` +
      `*Query:* ${query}`;
    window.open(`https://wa.me/919150484747?text=${message}`, '_blank');
    setSubmitted(true);
    const timerId = setTimeout(() => setSubmitted(false), 4000);
    return () => clearTimeout(timerId);
  };

  return (
    <div className="bg-white font-sans">



      {/* ══════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-gradient-to-br from-[#020818] via-[#0a1628] to-[#1a0a2e]">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/15 text-blue-400 text-xs font-black tracking-[0.25em] uppercase backdrop-blur-md mb-6"
          >
            📞 Let's Build Your Medical Career Together
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Zenova Groups Educational Consultants PVT LTD
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Have questions about MBBS abroad? Our expert counselors are here to guide you step-by-step.
            Get free guidance and make the right decision for your future.
          </motion.p>

          {/* Quick action buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-wrap gap-4 justify-center"
          >
            {quickActions.map((action, i) => (
              <motion.a
                key={i}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1, type: 'spring', bounce: 0.5 } } }}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${action.color} text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all`}
              >
                <span>{action.icon}</span> {action.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT DETAILS + MAP
      ══════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.05),_transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Contact Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={slideLeft}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-black tracking-widest uppercase mb-5">
                📍 Find Us
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                Our Office{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Details
                </span>
              </h2>

              {/* Info Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-5"
              >
                {[
                  {
                    icon: '🏢', label: 'Office Address',
                    content: 'Zenova Groups Educational Consultants PVT LTD\nNo: 265, Regional Transport Office Rd, opp. to Bombay Anandha, Phase II, Sathuvachari, Vellore, Tamil Nadu 632009, India',
                    color: 'from-blue-500 to-cyan-400',
                  },
                  {
                    icon: '📱', label: 'Phone / WhatsApp',
                    content: '+91 91504 84747\nInstant WhatsApp Support Available',
                    href: 'tel:+91 91504 84747',
                    color: 'from-green-500 to-teal-400',
                  },
                  {
                    icon: '📧', label: 'Email Address',
                    content: 'bravogroups@gmail.com',
                    href: 'mailto:bravogroups@gmail.com',
                    color: 'from-purple-500 to-pink-400',
                  },
                  {
                    icon: '🕒', label: 'Working Hours',
                    content: 'Monday – Saturday\n9:00 AM – 6:00 PM',
                    color: 'from-orange-500 to-yellow-400',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.4 } } }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] group cursor-default"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-gray-800 font-semibold text-sm leading-relaxed whitespace-pre-line hover:text-blue-600 transition-colors">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex items-center gap-4"
              >
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Follow Us:</span>
                {[
                  { icon: 'fab fa-instagram', href: 'https://www.instagram.com/zenova_consultants?igsh=MTgzeXU1OThvcnVlZA==', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
                  { icon: 'fab fa-facebook-f', href: 'https://www.facebook.com/share/1B4gYpAW5H/', color: 'hover:bg-blue-600' },
                  { icon: 'fab fa-youtube', href: '#', color: 'hover:bg-red-600' },
                  { icon: 'fab fa-whatsapp', href: 'https://wa.me/919150484747', color: 'hover:bg-green-500' },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 ${s.color} hover:text-white hover:border-transparent transition-all duration-300 shadow-sm`}
                  >
                    <i className={`${s.icon} text-base`} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Google Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={slideRight}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-[2rem] blur-3xl opacity-10 scale-105" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white h-[480px]">



                <div className="w-full h-[400px] rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3888.6020862001656!2d79.1515397!3d12.933277!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad39007b7611f5%3A0x3b7413f7e9d0c2f5!2sZenova%20groups%20educational%20counsultants%20pvt.ltd!5e0!3m2!1sen!2sin!4v1777544328269!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zenova Groups Location - Vellore"
                  />
                </div>

              </div>
              {/* Floating address card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 left-6 right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 flex items-center gap-4 z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg flex-shrink-0">📍</div>
                <div>
                  <p className="font-extrabold text-gray-900 text-sm">Zenova Groups – Vellore Office</p>
                  <p className="text-gray-400 text-xs">No: 265, Regional Transport Office Rd, opp. to Bombay Anandha, Phase II, Sathuvachari, Vellore 632009, India.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT WE OFFER
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#f7faff] to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.05),_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-black tracking-widest uppercase mb-5">
              🧠 What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Complete{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                End-to-End Support
              </span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {services.map((svc, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', bounce: 0.4 } } }}
                whileHover={{ y: -6, scale: 1.03, boxShadow: '0 20px 40px rgba(99,102,241,0.15)', transition: { duration: 0.3 } }}
                className="group flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-default font-semibold text-gray-700 text-sm"
              >
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-black flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  ✓
                </span>
                {svc}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT FORM + DESCRIPTION
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">

            {/* Left: Description */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={slideLeft}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-black tracking-widest uppercase mb-5">
                💎 Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Vellore Student{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Support Hub
                </span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-base">
                At <strong>Zenova Groups</strong>, our presence in <strong>Vellore</strong> reflects our commitment to supporting students from Tamil Nadu in achieving their dream of studying MBBS abroad. Known for its strong educational culture and medical institutions, Vellore serves as a key location where we provide dedicated guidance and personalized counseling to aspiring medical students.
              </p>
              <p className="text-gray-500 leading-relaxed mb-10 text-base">
                Through our growing network in <strong>Vellore</strong>, we ensure that students receive complete assistance—from career counseling and university selection to admission processing and visa support. Our local mentors and support team are always accessible, making the entire journey smooth, transparent, and stress-free.
              </p>

              {/* Trust Quote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-[#020818] to-[#1a0a2e] text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.3),_transparent_70%)]" />
                <div className="relative z-10">
                  <div className="text-5xl text-blue-400 font-black leading-none mb-4">"</div>
                  <p className="text-lg font-semibold leading-relaxed italic mb-4">
                    Your dream of becoming a doctor starts with the right guidance.
                  </p>
                  <p className="text-neutral-400 text-sm">
                    Zenova Groups is with you from admission to your medical career journey.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-1 bg-blue-500 rounded-full" />
                    <span className="text-blue-400 text-xs font-black tracking-widest uppercase">Zenova Groups</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={slideRight}
            >
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-8 lg:p-10 sticky top-28">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Send a Message</h3>
                <p className="text-gray-400 text-sm mb-8">We'll get back to you within 24 hours.</p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'firstName', label: 'First Name', placeholder: 'Rahul', icon: '👤' },
                      { name: 'lastName', label: 'Last Name', placeholder: 'Kumar', icon: '👤' },
                    ].map((f) => (
                      <div key={f.name} className="flex flex-col gap-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <span>{f.icon}</span> {f.label}
                        </label>
                        <input
                          name={f.name} type="text" placeholder={f.placeholder}
                          value={formData[f.name]} onChange={handleChange} required
                          className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)] transition-all duration-300 placeholder:text-gray-300"
                        />
                      </div>
                    ))}
                  </div>

                  {[
                    { name: 'phone', label: 'Phone / WhatsApp', placeholder: '+91 91504 84747', icon: '📱', type: 'tel' },
                    { name: 'email', label: 'Email Address', placeholder: 'you@gmail.com', icon: '📧', type: 'email' },
                  ].map((f) => (
                    <div key={f.name} className="flex flex-col gap-2">
                      <label className="text-xs font-black text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <span>{f.icon}</span> {f.label}
                      </label>
                      <input
                        name={f.name} type={f.type} placeholder={f.placeholder}
                        value={formData[f.name]} onChange={handleChange} required
                        className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)] transition-all duration-300 placeholder:text-gray-300"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-wider">💬 Your Query</label>
                    <textarea
                      name="query" rows="4" placeholder="How can we help you with your MBBS journey?"
                      value={formData.query} onChange={handleChange} required
                      className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl text-sm bg-gray-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.08)] transition-all duration-300 placeholder:text-gray-300 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-3"
                  >
                    {submitted ? (
                      <><span>✅</span> Message Sent!</>
                    ) : (
                      <><span>📲</span> Submit via WhatsApp</>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-gray-400 mt-2">
                    By submitting, you agree to be contacted by Zenova Groups for MBBS guidance.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DARK CTA BANNER
      ══════════════════════════════════════════════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.3),_transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-neutral-400 text-sm font-black tracking-widest uppercase mb-4">
            🔥 Zenova Groups – Your Trusted MBBS Abroad Guidance Partner
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Begin Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Medical Dream?
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a free consultation with our expert counselors today.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex gap-4 justify-center flex-wrap">
            {[
              { label: '🎯 Get Free Counseling', href: '#', primary: true },
              { label: '📋 Apply Now for MBBS Abroad', href: '/apply', primary: false },
              { label: '💬 Talk to Expert', href: 'https://wa.me/9150484747', primary: false },
            ].map((btn, i) => (
              <motion.a
                key={i}
                href={btn.href}
                target={btn.href.startsWith('http') ? '_blank' : undefined}
                onClick={btn.href === '#' ? (e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openLeadPopup')); } : undefined}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`px-8 py-4 rounded-full font-bold text-sm transition-all ${btn.primary
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_50px_rgba(99,102,241,0.8)]'
                  : 'bg-white/5 border border-white/20 text-white backdrop-blur-md hover:bg-white/10'
                  }`}
              >
                {btn.label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
};

export default Contact;
