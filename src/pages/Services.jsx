import React, { useEffect } from 'react';
import { SplineScene } from '../components/ui/spline';


const servicesList = [
  { title: "Your Complete Journey", desc: "From consultation to campus arrival — we handle everything.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, color: 'from-blue-500 to-indigo-500' },
  { title: "University Selection", desc: "NMC-approved universities that match your budget and goals.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, color: 'from-purple-500 to-pink-500' },
  { title: "Country Strategy", desc: "Navigate visa rules, climate, cost, and culture.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>, color: 'from-teal-500 to-cyan-500' },
  { title: "Admission Process", desc: "Application, documentation, and acceptance letters — fully managed.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>, color: 'from-emerald-500 to-teal-500' },
  { title: "Documentation Support", desc: "Transcripts, certifications, police clearance — zero errors.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>, color: 'from-orange-500 to-amber-500' },
  { title: "Budget Planning", desc: "Transparent fee breakdowns and scholarship guidance.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>, color: 'from-yellow-500 to-orange-500' },
  { title: "Visa Assistance", desc: "Interview prep, file compilation, and embassy coordination.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="5" width="22" height="14" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>, color: 'from-rose-500 to-pink-500' },
  { title: "Pre-Departure Briefing", desc: "Travel, accommodation, and cultural orientation sessions.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5L5.3 6.7c-1.1-.2-2.1.3-2.4 1.3c-.3 1 1.2 2.3 2.1 3l6.5 4.5l-4.5 4.5c-.7.7-1 1.7-.7 2.6c.3.9 1.2 1.4 2.1 1.4c.5 0 1-.2 1.4-.6l4.5-4.5l4.5 6.5c.7.9 2 2.4 3 2.1c1-.3 1.5-1.3 1.3-2.4c-.2-1.1-.3-1.1-.3-1.1z" /></svg>, color: 'from-indigo-500 to-blue-500' },
  { title: "Hostel & Stay", desc: "Safe, vetted hostels booked before you land.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, color: 'from-sky-500 to-blue-500' },
  { title: "Airport Reception", desc: "Local team meets you at arrival — no confusion.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="10" width="22" height="9" rx="2" /><path d="M7 10l3-4h4l3 4" /><circle cx="7" cy="19" r="2" /><circle cx="17" cy="19" r="2" /></svg>, color: 'from-green-500 to-emerald-500' },
  { title: "Not Alone Abroad", desc: "24/7 local support for any academic or personal issues.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, color: 'from-indigo-600 to-purple-600' },
  { title: "Future Doctor Coaching", desc: "FMGE/NExT prep coaching and mentorship programs.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>, color: 'from-fuchsia-500 to-purple-600' },
  { title: "Parent Updates", desc: "Monthly progress reports and direct access to our team.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, color: 'from-blue-600 to-indigo-700' },
];

const Services = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-[#020c1b] overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020c1b]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020c1b]">
          <div className="w-full h-full opacity-40 md:opacity-100">
            <SplineScene scene="/assets/Dna.splinecode" className="w-full h-full" />
          </div>
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#020c1b]/95 via-[#020c1b]/60 to-transparent" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#020c1b]/90 via-transparent to-[#020c1b]/50" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-md inline-block">
                🌟 WHAT WE DO
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
              Turning Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                MBBS Dream
              </span>
              <br />Into Reality
            </h1>
            <p className="text-white text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              From counseling to accommodation — we handle every step of your MBBS journey abroad so you can focus entirely on becoming a doctor.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              {[
                { val: '100+', label: 'Students Placed' },
                { val: '100%', label: 'Visa Success' },
                { val: '7+', label: 'Partner Universities' }
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <span className="text-base md:text-lg font-bold text-white">{s.val}</span>
                  <span className="text-[10px] text-white font-medium uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="px-4 py-2 rounded-full bg-blue-100 border border-blue-300 text-blue-700 text-xs font-black tracking-widest uppercase inline-block mb-4">
              Our Core Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
              Everything You Need,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                All in One Place
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From initial counseling to your first day at university — we manage it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {servicesList.map((service, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-150 ease-in-out"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.15),_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Start Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              MBBS Journey?
            </span>
          </h2>
          <p className="text-white text-lg mb-10 max-w-2xl mx-auto">
            Book a free counseling session today. 100% admission and visa success guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150 ease-in-out"
            >
              Book Free Counseling
            </button>
            <button
              onClick={() => window.location.href = '/contact'}
              className="px-10 py-4 bg-white/5 border border-white/20 text-white rounded-full font-bold backdrop-blur-md hover:bg-white/10 active:scale-95 transition-all duration-150 ease-in-out"
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
