import { Link } from 'react-router-dom';
import { uzbekistanRegions } from '../data/universityLinks';

const logo = '/assets/bgremovedlogo-small.webp';
const uzbekistanUniversities = uzbekistanRegions.flatMap(r => r.links);

const navigationLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Latest Blogs', href: '/blog' },
  { name: 'Our Services', href: '/services' }
];

export default function Footer() {
  return (
    <footer className="relative bg-[#020c1b] text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Decorative ambient blobs - simplified for mobile performance */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group no-underline">
              <img
                src={logo}
                alt="Bravo Groups"
                className="w-14 h-14 object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <span className="text-2xl font-black tracking-tight text-white no-underline">
                Bravo <span className="text-blue-500">Groups</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm border-l-2 border-blue-600 pl-4 py-1">
              Empowering the next generation of global healthcare leaders through
              excellence in international medical education consultancy.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'fa-facebook-f', href: '#', label: 'Facebook' },
                { icon: 'fa-instagram', href: '#', label: 'Instagram' },
                { icon: 'fa-youtube', href: '#', label: 'YouTube' },
                { icon: 'fa-whatsapp', href: 'https://wa.me/918838071494', label: 'WhatsApp' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <i className={`fa-brands ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Universities Column */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 border-b border-blue-600 w-fit pb-1">
              Uzbekistan
            </h3>
            <ul className="space-y-3 p-0 list-none">
              {uzbekistanUniversities.slice(0, 5).map((uni) => {
                const name = typeof uni === 'object' ? uni.name : uni;
                const id = typeof uni === 'object' ? uni.id : uni.split(' (')[0].toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={name}>
                    <Link to={`/university/${id}`} className="text-gray-400 hover:text-white text-sm transition-colors duration-200 block no-underline hover:translate-x-1 transform transition-transform">
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* MBBS Abroad Column */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 border-b border-blue-600 w-fit pb-1">
              MBBS Abroad
            </h3>
            <ul className="space-y-3 p-0 list-none">
              <li><Link to="/universities?country=Kyrgyzstan" className="text-gray-400 hover:text-white text-sm transition-colors no-underline block hover:translate-x-1 transform">MBBS in Kyrgyzstan</Link></li>
              <li><Link to="/universities?country=Georgia" className="text-gray-400 hover:text-white text-sm transition-colors no-underline block hover:translate-x-1 transform">MBBS in Georgia</Link></li>
              <li><Link to="/universities?country=Russia" className="text-gray-400 hover:text-white text-sm transition-colors no-underline block hover:translate-x-1 transform">MBBS in Russia</Link></li>
              <li><Link to="/universities?country=Uzbekistan" className="text-gray-400 hover:text-white text-sm transition-colors no-underline block hover:translate-x-1 transform">MBBS in Uzbekistan</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 border-b border-blue-600 w-fit pb-1">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <i className="fa-solid fa-location-dot text-blue-500 mt-1"></i>
                <span className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
                  RTJ Complex, 13th Street, Phase 2, Sathuvacheri, Vellore, Tamil Nadu 632009
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <i className="fa-solid fa-phone text-blue-500"></i>
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">+91 88380 71494</span>
              </div>
              <div className="flex items-center gap-3 group">
                <i className="fa-solid fa-envelope text-blue-500"></i>
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">bravogroups.edu@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-600/20 active:scale-95 transition-all duration-300"
          >
            Get Free Counseling Now
          </button>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest m-0">
              © 2026 Bravo Groups Educational Consultancy. All rights reserved.
            </p>
            <p className="text-gray-600 text-[9px] m-0">
              Designed for Excellence & Speed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
