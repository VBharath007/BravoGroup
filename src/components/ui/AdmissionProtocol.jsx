import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, FileText, ClipboardCheck, Award } from 'lucide-react';

const AdmissionProtocol = ({ themeAccent = "#00D4FF", bgColor = "#030814" }) => {
  const eligibility = [
    { title: 'Academic Requirement', desc: ' Minimum 50% in Physics, Chemistry, and Biology (PCB) as per NMC guidelines.' },
    { title: 'NEET Qualification', desc: ' Candidates must have qualified  NEET- UG   in the current or previous two years, as per NMC regulations.' },
    { title: 'Age Requirement', desc: 'Applicants must be at least 17 years old.' },
  ];

  const dossier = [
    { title: 'Identity Documents ', items: [' Valid Passport', 'Aadhar card', ' Passport-size Photographs'] },
    {
      title: 'Academic Documents ', items: ['10th Marksheet', '12th Marksheet', 'NEET Score Card', 'Medical Fitness Certificate if needed'],


    },

  ];

  return (
    <section className="py-16 md:py-32 relative overflow-hidden" style={{ backgroundColor: bgColor }}>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-24" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Admission <span style={{ color: themeAccent }}>Requirements</span>
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
          <div className="p-6 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl relative overflow-hidden" data-aos="fade-left">
            <div className="absolute top-0 right-0 w-64 h-64 blur-[120px] rounded-full pointer-events-none opacity-20" style={{ background: themeAccent }} />

            <div className="flex items-center gap-4 mb-8 md:mb-12">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10">
                <FileText className="w-5 h-5 md:w-6 md:h-6" style={{ color: themeAccent }} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Required Documents Scanned and Originals </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {dossier.map((group, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: themeAccent }} />
                    <span className="text-xs md:text-sm font-black uppercase tracking-widest text-white/40">{group.title}</span>
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
            <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 flex gap-4 items-start">
              <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-1" style={{ color: themeAccent }} />
              <div className="space-y-1">
                <h4 className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">Note</h4>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  All documents must be notarized and apostilled as per international admission requirements. <br className="hidden sm:block" />
                  Our counseling team provides complete guidance throughout the admission and documentation process.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdmissionProtocol;