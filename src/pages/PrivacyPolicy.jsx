import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="privacy-policy-page overflow-x-hidden bg-white">
      {/* ── HERO SECTION ── */}
      <section className="relative py-24 bg-[#04080F] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40" />
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 0.5px,transparent 0.5px)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Legal Information</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tight mb-6"
          >
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Policy</span>
          </motion.h1>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full shadow-lg shadow-blue-600/20"
          />
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="py-24 bg-white relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Intro */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <p className="text-2xl font-bold leading-relaxed text-neutral-800 tracking-tight">
                At <span className="text-blue-600">Zenova Consultants</span>, we value your privacy and are committed to protecting your personal information.
              </p>
            </motion.div>

            {/* Information Collection */}
            <motion.div variants={itemVariants} className="p-8 md:p-12 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <i className="fa-solid fa-shield-halved text-9xl text-blue-600" />
              </div>
              
              <div className="relative z-10">
                <p className="text-lg text-neutral-600 leading-relaxed mb-10 font-medium">
                  Any information collected through our website, Meta lead forms, or counselling enquiries will be used only for educational guidance, admission support, counselling communication, and related services.
                </p>
                
                <h3 className="text-xl font-black text-neutral-900 mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xs">
                    <i className="fa-solid fa-list-check" />
                  </span>
                  Information we may collect:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Name',
                    'Phone Number',
                    'Email Address',
                    'Educational Details',
                    'Preferred Country for MBBS'
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5, backgroundColor: '#fff' }}
                      className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-blue-50 transition-all duration-300 shadow-sm"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/40" />
                      <span className="font-bold text-neutral-800 tracking-tight">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Commitment */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 py-8 border-y border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-3xl flex-shrink-0">
                <i className="fa-solid fa-handshake-angle" />
              </div>
              <p className="text-xl font-black text-neutral-900 tracking-tight">
                We do not sell, rent, or share your personal information with unauthorized third parties.
              </p>
            </motion.div>

            {/* Usage */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-black text-neutral-900 mb-8 tracking-tighter">How we use your details:</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  'Contact you regarding MBBS abroad admissions',
                  'Provide counselling support',
                  'Share university details and admission updates',
                  'Assist with application procedures'
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="flex items-start gap-5 p-6 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="mt-1 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 text-[10px] shadow-lg shadow-green-500/20">
                      <i className="fa-solid fa-check" />
                    </div>
                    <span className="text-lg font-semibold text-neutral-700 tracking-tight">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Final Statement */}
            <motion.div 
              variants={itemVariants}
              className="p-10 md:p-14 rounded-[3rem] text-center relative overflow-hidden shadow-2xl shadow-blue-500/5"
              style={{ background: 'linear-gradient(135deg,#f8faff 0%,#ffffff 100%)', border: '1px solid #e2e8f0' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-blue-600 rounded-b-full shadow-lg shadow-blue-600/40" />
              
              <div className="max-w-2xl mx-auto space-y-8">
                <p className="text-lg text-neutral-600 font-medium leading-relaxed">
                  We take reasonable measures to protect your information and maintain data security.
                </p>
                <div className="h-px bg-slate-100 mx-auto w-24" />
                <p className="text-lg text-neutral-600 font-medium leading-relaxed">
                  By submitting your information through our forms or website, you agree to our privacy policy and consent to being contacted by <span className="font-bold text-blue-600">Zenova Consultants</span>.
                </p>
                
                <div className="pt-8">
                  <p className="text-neutral-500 font-bold text-sm uppercase tracking-widest mb-6">Have questions?</p>
                  <a 
                    href="/contact" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-neutral-900/10 hover:shadow-blue-600/20 group"
                  >
                    Contact Official Support
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
