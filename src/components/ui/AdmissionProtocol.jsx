import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, FileText, ClipboardCheck, Award } from 'lucide-react';

const AdmissionProtocol = ({ themeAccent = "#00D4FF" }) => {
  const eligibility = [
    { title: 'Academic Excellence', desc: 'Minimum 50% in PCB (Physics, Chemistry, Biology) for General category; 40% for Reserved categories.' },
    { title: 'NEET Qualification', desc: 'Must have qualified NEET-UG in the current or previous two years as per NMC regulations.' },
    { title: 'Age Requirement', desc: 'Applicants must be at least 17 years old by December 31st of the admission year.' },
  ];

  const dossier = [
    { title: 'Identity Evidence', items: ['Original Passport', 'Birth Certificate (English)', '10 Passport Photos'] },
    { title: 'Academic Records', items: ['10th Marksheet', '12th Marksheet/Passing Certificate', 'NEET Score Card'] },
    { title: 'Legal & Health', items: ['Medical Fitness Certificate', 'HIV Report', 'Authorization Letter'] },
  ];

  return (
    <section className="py-32 relative bg-[#030814] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24" data-aos="fade-up">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
          >
            <ShieldCheck className="w-4 h-4" style={{ color: themeAccent }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">NMC & WHO Compliance</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Admission <span style={{ color: themeAccent }}>Protocol</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(to r, transparent, ${themeAccent}, transparent)` }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Eligibility Column */}
          <div className="space-y-8" data-aos="fade-right">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10" style={{ boxShadow: `0 0 20px ${themeAccent}20` }}>
                <Award className="w-6 h-6" style={{ color: themeAccent }} />
              </div>
              <h3 className="text-2xl font-bold text-white">Eligibility Criteria</h3>
            </div>

            <div className="space-y-4">
              {eligibility.map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group"
                >
                  <div className="flex gap-5">
                    <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" style={{ color: themeAccent }} />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dossier Column */}
          <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl relative overflow-hidden" data-aos="fade-left">
            <div className="absolute top-0 right-0 w-64 h-64 blur-[120px] rounded-full pointer-events-none opacity-20" style={{ background: themeAccent }} />
            
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                <FileText className="w-6 h-6" style={{ color: themeAccent }} />
              </div>
              <h3 className="text-2xl font-bold text-white">Required Dossier</h3>
            </div>

            <div className="grid sm:grid-cols-1 gap-8">
              {dossier.map((group, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: themeAccent }} />
                    <span className="text-sm font-black uppercase tracking-widest text-white/40">{group.title}</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Tip */}
            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4 items-center">
              <ClipboardCheck className="w-6 h-6 shrink-0" style={{ color: themeAccent }} />
              <p className="text-xs text-white/60 leading-relaxed">
                <strong className="text-white">Note:</strong> All documents must be notarized and apostilled. Our counseling team will assist you with the entire legal process.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdmissionProtocol;
