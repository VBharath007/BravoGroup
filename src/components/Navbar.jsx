import { useState } from 'react';
import logo from '../assets/bgremovedlogo.webp';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import universitiesData from '../data/universitiesData';
import {
  uzbekistanRegions,
  kyrgyzstanLinks,
  georgiaLinks,
  russiaLinks
} from '../data/universityLinks';




const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  {
    label: 'MBBS in Abroad',
    href: '/countries',
    dropdown: [
      { label: 'MBBS In Uzbekistan', href: '/countries#uzbekistan' },
      { label: 'MBBS In Kyrgyzstan', href: '/countries#kyrgyzstan' },
      { label: 'MBBS In Georgia', href: '/countries#georgia' },
      { label: 'MBBS In Russia', href: '/countries#russia' },
      { label: 'MBBS In Kazakhstan', href: '/countries#kazakhstan' },
      { label: 'MBBS In Philippines', href: '/countries#philippines' },
      { label: 'MBBS In Vietnam', href: '/countries#vietnam' },
      { label: 'MBBS In Tajikistan', href: '/countries#tajikistan' },
    ]
  },
  { label: 'Universities', href: '/universities', mega: true },
  {
    label: 'Gallery',
    href: '/gallery',
    dropdown: [
      { label: 'Photo Gallery', href: '/gallery' },
      { label: 'Video Gallery', href: '/video-gallery' }
    ]
  },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];


function UniLink({ item }) {
  const isObject = typeof item === 'object';
  const formatLabel = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const name = isObject ? formatLabel(item.name) : formatLabel(item);

  // Directly route to the individual university page
  const path = isObject
    ? `/university/${item.id}`
    : `/university/${item.split(' (')[0].toLowerCase().replace(/\s+/g, '-')}`;

  const handleClick = (e) => {
    // Sparkle effect logic
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.left = `${e.clientX}px`;
    sparkleContainer.style.top = `${e.clientY}px`;
    document.body.appendChild(sparkleContainer);

    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-particle';
      sparkle.style.setProperty('--x', `${(Math.random() - 0.5) * 100}px`);
      sparkle.style.setProperty('--y', `${(Math.random() - 0.5) * 100}px`);
      sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
      sparkleContainer.appendChild(sparkle);
    }

    setTimeout(() => sparkleContainer.remove(), 1000);
  };

  return (
    <li>
      <Link to={path} onClick={handleClick}>{name}</Link>
    </li>
  );
}

function MegaDropdown() {
  return (
    <div className="mega-dropdown">
      <div className="mega-dropdown-inner">

        {/* ── COLUMN 1: Uzbekistan (All Regions) ── */}
        <div className="mega-col">
          <div className="mega-header">
            <span className="mega-icon">🇺🇿</span>
            <h4 className="mega-region">{"Uzbekistan".toUpperCase()}</h4>
          </div>
          {uzbekistanRegions.map((region) => (
            <div className="mega-sub-section" key={region.key} style={{ marginBottom: '15px' }}>
              <div className="mega-sub-header">
                <span className="mega-sub-dot"></span>
                <span className="mega-sub-title">{region.key.toUpperCase()}</span>
              </div>
              <ul className="mega-list">
                {region.links.map((item) => (
                  <UniLink key={item.id} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── COLUMN 2: Kyrgyzstan ── */}
        <div className="mega-col">
          <div className="mega-header">
            <span className="mega-icon">🇰🇬</span>
            <h4 className="mega-region">{"Kyrgyzstan Universities".toUpperCase()}</h4>
          </div>
          <ul className="mega-list">
            {kyrgyzstanLinks.map((item) => (
              <UniLink key={item.id} item={item} />
            ))}
          </ul>
        </div>

        {/* ── COLUMN 3: Georgia ── */}
        <div className="mega-col">
          <div className="mega-header">
            <span className="mega-icon">🇬🇪</span>
            <h4 className="mega-region">{"Georgia Universities".toUpperCase()}</h4>
          </div>
          <ul className="mega-list">
            {georgiaLinks.map((item) => (
              <UniLink key={item.id} item={item} />
            ))}
          </ul>
        </div>

        {/* ── COLUMN 4: Russia ── */}
        <div className="mega-col">
          <div className="mega-header">
            <span className="mega-icon">🇷🇺</span>
            <h4 className="mega-region">{"Russian Universities".toUpperCase()}</h4>
          </div>
          <ul className="mega-list">
            {russiaLinks.map((item) => (
              <UniLink key={item.id} item={item} />
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Top Bar */}
      <div className="nav-topbar">
        <div className="nav-topbar-inner">
          <div className="nav-topbar-left">
            <a
              href="https://www.google.com/maps/search/?api=1&query=RTO+Office+Road,+Sathuvacheri,+Vellore,+Tamil+Nadu+632009"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-topbar-item nav-topbar-link"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              RTJ Complex (RTO Office Road), Sathuvacheri, Vellore, Tamil Nadu 632009
            </a>
          </div>
          <div className="nav-topbar-right">
            <a href="tel:+918838071494" className="nav-topbar-item nav-topbar-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              +91 88380 71494
            </a>
            <div className="nav-topbar-emails flex gap-4">
              <a href="mailto:bravogroups@gmail.com" className="nav-topbar-item nav-topbar-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                bravogroups@gmail.com
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Logo" />
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className={link.mega ? 'mega-trigger' : link.dropdown ? 'mega-trigger' : ''}
            >
              <Link to={link.href || "#"} >
                {link.label}
                {(link.mega || link.dropdown) && (
                  <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                )}
              </Link>
              {link.mega && <MegaDropdown data={universitiesData} />}
              {link.dropdown && (
                <ul className="sub-dropdown country-grid-dropdown">
                  {link.dropdown.map((item) => {
                    const formatLabel = (str) => {
                      if (!str) return '';
                      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                    };
                    return (
                      <li key={item.label} className="dropdown-item-with-dash">
                        <Link to={item.href} onClick={() => setMenuOpen(false)}>
                          <span className="dropdown-chevron">›</span>
                          {formatLabel(item.label)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          Get Counseling
        </button>

        <button
          className={`nav-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`nav-mobile-overlay ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`nav-mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <img src={logo} alt="Logo" className="mobile-drawer-logo" />
          <button className="drawer-close" onClick={() => setMenuOpen(false)}>&times;</button>
        </div>

        <div className="mobile-drawer-links">
          {navLinks.map((link, lIdx) => (
            <div key={`${link.label}-${lIdx}`} className="mobile-nav-item">
              <Link to={link.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
              {(link.mega || link.dropdown) && (
                <div className="mobile-accordion-content expanded">
                  {link.mega && Object.entries(universitiesData).map(([region, unis]) => (
                    <div key={region} className="mobile-region-group">
                      <div className="mobile-region-name">{region.toUpperCase()}</div>
                      {unis.map(uni => {
                        const isObject = typeof uni === 'object';
                        const formatLabel = (str) => {
                          if (!str) return '';
                          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
                        };
                        const name = isObject ? formatLabel(uni.name) : formatLabel(uni);
                        const id = isObject ? uni.id : uni.split(' (')[0].toLowerCase().replace(/\s+/g, '-');

                        return (
                          <Link
                            key={id}
                            to={`/university/${id}`}
                            className="mobile-uni-link"
                            onClick={() => setMenuOpen(false)}
                          >
                            {name}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                  {link.dropdown && link.dropdown.map(item => (
                    <Link key={item.label} to={item.href} className="mobile-uni-link" onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mobile-drawer-footer">
          <button className="nav-cta w-full" onClick={() => { window.dispatchEvent(new CustomEvent('openLeadPopup')); setMenuOpen(false); }}>
            Get Counseling
          </button>
        </div>
      </div>
    </>
  );
}