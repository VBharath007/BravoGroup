import React, { useEffect, useMemo } from 'react';
import { SplineScene } from '../components/ui/spline';

const servicesData = [
  { title: "Your Complete Journey", desc: "From consultation to campus arrival — we handle everything.", icon: <i className="fa-solid fa-person-walking-luggage"></i>, color: 'from-blue-500 to-indigo-500' },
  { title: "University Selection", desc: "NMC-approved universities that match your budget and goals.", icon: <i className="fa-solid fa-building-columns"></i>, color: 'from-purple-500 to-pink-500' },
  { title: "Country Strategy", desc: "Navigate visa rules, climate, cost, and culture.", icon: <i className="fa-solid fa-earth-americas"></i>, color: 'from-teal-500 to-cyan-500' },
  { title: "Admission Process", desc: "Application, documentation, and acceptance letters — fully managed.", icon: <i className="fa-solid fa-file-signature"></i>, color: 'from-emerald-500 to-teal-500' },
  { title: "Documentation Support", desc: "Transcripts, certifications, police clearance — zero errors.", icon: <i className="fa-solid fa-passport"></i>, color: 'from-orange-500 to-amber-500' },
  { title: "Budget Planning", desc: "Transparent fee breakdowns and scholarship guidance.", icon: <i className="fa-solid fa-wallet"></i>, color: 'from-yellow-500 to-orange-500' },
  { title: "Visa Assistance", desc: "Interview prep, file compilation, and embassy coordination.", icon: <i className="fa-solid fa-id-card"></i>, color: 'from-rose-500 to-pink-500' },
  { title: "Pre-Departure Briefing", desc: "Travel, accommodation, and cultural orientation sessions.", icon: <i className="fa-solid fa-plane-departure"></i>, color: 'from-indigo-500 to-blue-500' },
  { title: "Hostel & Stay", desc: "Safe, vetted hostels booked before you land.", icon: <i className="fa-solid fa-hotel"></i>, color: 'from-sky-500 to-blue-500' },
  { title: "Airport Reception", desc: "Local team meets you at arrival — no confusion.", icon: <i className="fa-solid fa-shuttle-van"></i>, color: 'from-green-500 to-emerald-500' },
  { title: "Not Alone Abroad", desc: "24/7 local support for any academic or personal issues.", icon: <i className="fa-solid fa-hand-holding-medical"></i>, color: 'from-indigo-600 to-purple-600' },
  { title: "Future Doctor Coaching", desc: "FMGE/NExT prep coaching and mentorship programs.", icon: <i className="fa-solid fa-user-doctor"></i>, color: 'from-fuchsia-500 to-purple-600' },
  { title: "Parent Updates", desc: "Monthly progress reports and direct access to our team.", icon: <i className="fa-solid fa-house-user"></i>, color: 'from-blue-600 to-indigo-700' },
];

const Services = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  const renderedServices = useMemo(() => (
    servicesData.map((service, idx) => (
      <div
        key={idx}
        className="group relative p-8 rounded-3xl bg-white border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-xl">{service.icon}</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {service.desc}
        </p>
      </div>
    ))
  ), []);

  return (
    <div className="bg-[#020c1b] overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#020c1b]">
        {/* Optimized Spline Scene for Mobile */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020c1b]">
          <div className="w-full h-full opacity-40 lg:opacity-100">
            <SplineScene scene="/assets/Dna.splinecode" className="w-full h-full" />
          </div>
        </div>
        
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#020c1b] via-[#020c1b]/60 to-transparent" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#020c1b] via-transparent to-[#020c1b]/80" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center lg:items-start lg:text-left text-center">
          <div className="max-w-3xl">
            <div className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase backdrop-blur-md inline-block">
                Professional Consultancy
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8">
              Expert <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                Medical Journey
              </span>
              <br />Guidance
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              Bravo Groups handles every complexity—from documentation to campus arrival—so you can focus entirely on becoming a world-class doctor.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {[
                { val: '100+', label: 'Students' },
                { val: '100%', label: 'Visa Success' },
                { val: '15+', label: 'Partner Unis' }
              ].map((s, i) => (
                <div key={i} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                  <span className="block text-2xl font-black text-white">{s.val}</span>
                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[150px]"></div>
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-[10px] font-black tracking-widest uppercase inline-block mb-6">
              Our Core Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
              End-to-End <br />
              <span className="text-blue-600">Professional Services</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We manage the entire lifecycle of your international medical education with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {renderedServices}
          </div>
        </div>
      </section>

      {/* Simplified CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
            Begin Your MBBS Journey With Experts
          </h2>
          <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto">
            Get 100% transparent counseling and guaranteed admission guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
              className="px-10 py-5 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest shadow-2xl hover:-translate-y-1 transition-all active:scale-95"
            >
              Book Free Counseling
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-10 py-5 bg-blue-700 text-white border border-blue-500 rounded-full font-black uppercase tracking-widest hover:bg-blue-800 transition-all active:scale-95"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
