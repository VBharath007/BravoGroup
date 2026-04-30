import './Footer.css';
const logo = '/assets/logo.jpeg';
import { Link } from 'react-router-dom';
import {
  uzbekistanRegions
} from '../data/universityLinks';

const uzbekistanUniversities = uzbekistanRegions.flatMap(r => r.links);

const navigationLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Latest Blogs', href: '/blog' },
  { name: 'Our Services', href: '/services' }
];

export default function Footer() {
  return (
    <footer className="footer" style={{ transform: "translateZ(0)", contain: "layout style paint" }}>
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">
            <img
              src={logo}
              alt="Bravo Groups Logo"
              className="footer-logo-img"
              width="69"
              height="69"
              loading="lazy"
            />
            Zenova <span>Groups</span>
          </span>
          <p className="footer-desc">
            Empowering the next generation of global healthcare leaders through
            excellence in international medical educational consultants.
          </p>
          <p className="footer-slogan">
            Dream Medical Career Abroad?<br />
            Zenova Groups Make it Happens
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/share/1B4gYpAW5H/" target="_blank" rel="noopener noreferrer" title="Facebook" style={{ transform: 'translateZ(0)' }}>
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/zenova_consultants?igsh=MTgzeXU1OThvcnVlZA==" target="_blank" rel="noopener noreferrer" title="Instagram" style={{ transform: 'translateZ(0)' }}>
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="javascript:void(0)" title="YouTube" style={{ transform: 'translateZ(0)' }}>
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://wa.me/918838071494" target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{ transform: 'translateZ(0)' }}>
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Universities in Uzbekistan</div>
          <ul className="footer-links">
            {uzbekistanUniversities.slice(0, 6).map((uni) => {
              const name = typeof uni === 'object' ? uni.name : uni;
              const id = typeof uni === 'object' ? uni.id : uni.split(' (')[0].toLowerCase().replace(/\s+/g, '-');
              return (
                <li key={name}>
                  <Link to={`/university/${id}`}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="footer-col-title">MBBS Abroad</div>
          <ul className="footer-links">
            <li><Link to="/universities?country=Kyrgyzstan">MBBS in Kyrgyzstan</Link></li>
            <li><Link to="/universities?country=Georgia">MBBS in Georgia</Link></li>
            <li><Link to="/universities?country=Russia">MBBS in Russia</Link></li>
            <li><Link to="/universities?country=Kazakhstan">MBBS in Kazakhstan</Link></li>
            <li><Link to="/universities?country=Philippines">MBBS in Philippines</Link></li>
            <li><Link to="/universities?country=Vietnam">MBBS in Vietnam</Link></li>
            <li><Link to="/universities?country=Tajikistan">MBBS in Tajikistan</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Navigation</div>
          <ul className="footer-links">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact">
          <div className="footer-col-title">Contact Us</div>
          <div className="footer-contact-item">
            <span className="icon"><i className="fa-solid fa-envelope"></i></span> bravogroups.edu@gmail.com
          </div>
          <div className="footer-contact-item">
            <span className="icon"><i className="fa-solid fa-phone"></i></span> +91 88380 71494
          </div>
          <div className="footer-contact-item">
            <span className="icon"><i className="fa-solid fa-location-dot"></i></span> No: 265, Regional Transport Office Rd, opp. to Bombay Anandha, Phase II, Sathuvachari,<br /> Vellore, Tamil Nadu 632009,<br /> India.
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-cta-container">
          <button className="footer-cta-btn" onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))} style={{ transform: 'translateZ(0)' }}>
            GET FREE COUNSELING NOW
          </button>
        </div>
        <span>© 2026 Zenova Groups. All rights reserved.</span>
      </div>
    </footer>
  );
}
