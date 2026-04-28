import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './LeadPopup.css';
// Assets are now served from the public/assets directory
const logo = '/assets/bgremovedlogo-small.webp';
const bgMap = '/assets/bg-map.webp';

// Reduce particles for better performance
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 3,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 4,
  dur: 5 + Math.random() * 4,
}));

const LeadPopup = () => {
  const [phase, setPhase] = useState('hidden');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    altPhone: '', // optional number
    neetMark: '',
    //  cutOff: '',
    university: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const timerRef = useRef(null);
  const location = useLocation();

  const open = useCallback(() => {
    setPhase('entering');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('visible'));
    });
  }, []);

  const close = useCallback(() => {
    setPhase('leaving');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPhase('hidden'), 520);
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setPhase(current => {
        if (current === 'hidden') {
          open();
        }
        return current;
      });
    }, 3000); // Delayed to let page load first

    const handleTrigger = (e) => {
      setSubmitted(false);
      if (e.detail) {
        setFormData(prev => ({ ...prev, university: typeof e.detail === 'string' ? e.detail : '' }));
      }
      open();
    };
    window.addEventListener('openLeadPopup', handleTrigger);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('openLeadPopup', handleTrigger);
    };
  }, [location.pathname, open]);

  // Prevent background scroll when popup is open
  useEffect(() => {
    if (phase === 'visible') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);



  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // Manual validation fallback
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'neetMark'];
    const isFormValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');

    if (!isFormValid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const msg =
      `*New Admission Application*%0A%0A` +
      `*University:* ${formData.university || 'General Inquiry'}%0A` +
      `*Name:* ${formData.fullName}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Alt Phone:* ${formData.altPhone || 'N/A'}%0A` +
      `*Address:* ${formData.address}%0A` +
      `*NEET Mark:* ${formData.neetMark}%0A` +

      window.open(`https://wa.me/918838071494?text=${msg}`, '_blank');
    setSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(close, 2200);
  }, [formData, close]);

  if (phase === 'hidden') return null;

  const overlayClass = `lp-overlay ${phase === 'visible' ? 'lp-overlay--in' : ''} ${phase === 'leaving' ? 'lp-overlay--out' : ''}`;
  const boxClass = `lp-box ${phase === 'visible' ? 'lp-box--in' : ''} ${phase === 'leaving' ? 'lp-box--out' : ''}`;

  return (
    <div className={overlayClass} onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="lp-orb lp-orb--blue" />
      <div className="" />

      <div className={boxClass} role="dialog" aria-modal="true">
        <button className="lp-close" onClick={close} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* LEFT PANEL */}
        <div className="lp-left">
          <div className="lp-particles" aria-hidden="true">
            {PARTICLES.map(p => (
              <span
                key={p.id}
                className="lp-particle"
                style={{
                  width: p.size, height: p.size,
                  left: `${p.x}%`, top: `${p.y}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.dur}s`,
                }}
              />
            ))}
          </div>

          <div className="lp-left-inner">

            <img
              src={logo}
              alt="Bravo Groups"
              className="lp-logo"
              width="125"
              height="125"
              loading="lazy"
            />

            <div className="lp-left-badge">
              <span className="lp-badge-dot" />
              Trusted Since 2022 · Vellore
            </div>

            <h3 className="lp-left-headline">
              Dream of a<br />
              <span className="lp-left-headline--accent">Medical Career</span><br />
              Abroad?
            </h3>

            <p className="lp-left-sub">
              <strong>Bravo Groups</strong> has guided 100s of students to world-class universities.
            </p>

            <div className="lp-chips">
              {['Top Universities', 'Budget-Friendly', 'Full Support'].map(c => (
                <span key={c} className="lp-chip">{c}</span>
              ))}
            </div>

            <div className="lp-country-list">
              {['🇷🇺 Russia', '🇬🇪 Georgia', '🇺🇿 Uzbekistan', '🇰🇬 Kyrgyzstan'].map((c, i) => (
                <span key={i} className="lp-country-pill">{c}</span>
              ))}
            </div>

            <div className="lp-map-wrap">
              <img src={bgMap} alt="Map" className="lp-map-img" loading="lazy" />
              <div className="lp-map-overlay" />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lp-right">
          {submitted ? (
            <div className="lp-success">
              <div className="lp-success-ring">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="lp-success-title">You're all set! 🎉</h3>
              <p className="lp-success-text">Opening WhatsApp now. We'll connect shortly!</p>
            </div>
          ) : (
            <>
              <div className="lp-right-header">
                <h2 className="lp-right-title">Start Your MBBS<br />Journey Abroad</h2>
                <div className="lp-admission-status">
                  <span className="lp-pulse-dot"></span>
                  2026-2027 ADMISSION OPEN
                </div>
                <p className="lp-right-sub">Get a response within 24 hours.</p>
              </div>

              <form className="lp-form" onSubmit={handleSubmit}>
                <div className="lp-form-row">
                  <div className={`lp-field ${focused === 'fullName' ? 'lp-field--focused' : ''} ${formData.fullName ? 'lp-field--filled' : ''}`}>
                    <label htmlFor="fullName" className="lp-label">Full Name</label>
                    <input
                      id="fullName" type="text" autoComplete="name" required
                      placeholder="e.g. Arjun Kumar"
                      value={formData.fullName}
                      onChange={handleChange}
                      onFocus={() => setFocused('fullName')}
                      onBlur={() => setFocused(null)}
                      className="lp-input"
                    />
                    <span className="lp-field-line" />
                  </div>

                  <div className={`lp-field ${focused === 'email' ? 'lp-field--focused' : ''} ${formData.email ? 'lp-field--filled' : ''}`}>
                    <label htmlFor="email" className="lp-label">Email</label>
                    <input
                      id="email" type="email" autoComplete="email" required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className="lp-input"
                    />
                    <span className="lp-field-line" />
                  </div>
                </div>

                <div className="lp-form-row">
                  <div className={`lp-field ${focused === 'phone' ? 'lp-field--focused' : ''} ${formData.phone ? 'lp-field--filled' : ''}`}>
                    <label htmlFor="phone" className="lp-label">Phone</label>
                    <input
                      id="phone" type="tel" autoComplete="tel" required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      className="lp-input"
                    />
                    <span className="lp-field-line" />
                  </div>

                  <div className={`lp-field ${focused === 'altPhone' ? 'lp-field--focused' : ''} ${formData.altPhone ? 'lp-field--filled' : ''}`}>
                    <label htmlFor="altPhone" className="lp-label">Alt Phone</label>
                    <input
                      id="altPhone" type="tel"
                      placeholder="Secondary Number"
                      value={formData.altPhone}
                      onChange={handleChange}
                      onFocus={() => setFocused('altPhone')}
                      onBlur={() => setFocused(null)}
                      className="lp-input"
                    />
                    <span className="lp-field-line" />
                  </div>
                </div>

                <div className={`lp-field ${focused === 'address' ? 'lp-field--focused' : ''} ${formData.address ? 'lp-field--filled' : ''}`}>
                  <label htmlFor="address" className="lp-label">Permanent Address</label>
                  <textarea
                    id="address" required
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setFocused('address')}
                    onBlur={() => setFocused(null)}
                    className="lp-input"
                    rows="2"
                    style={{ resize: 'none' }}
                  />
                  <span className="lp-field-line" />
                </div>

                <div className="lp-form-row">
                  <div className={`lp-field ${focused === 'neetMark' ? 'lp-field--focused' : ''} ${formData.neetMark ? 'lp-field--filled' : ''}`}>
                    <label htmlFor="neetMark" className="lp-label">NEET Mark</label>
                    <input
                      id="neetMark" type="number" required
                      placeholder="e.g. 520"
                      value={formData.neetMark}
                      onChange={handleChange}
                      onFocus={() => setFocused('neetMark')}
                      onBlur={() => setFocused(null)}
                      className="lp-input"
                    />
                    <span className="lp-field-line" />
                  </div>


                </div>

                <button type="submit" className="lp-submit">
                  <span className="lp-submit-text">Get Free Counseling</span>
                  <span className="lp-submit-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.17 3.27A2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    via WhatsApp
                  </span>
                  <div className="lp-submit-shine" />
                </button>

                <p className="lp-terms">🔒 100% private. No spam.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LeadPopup);
