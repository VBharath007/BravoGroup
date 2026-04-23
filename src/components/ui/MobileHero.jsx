import React from 'react';
import './MobileHero.css';
const heroImg = '/assets/uzbekistan_mbbs_hero.webp';

import { useNavigate } from 'react-router-dom';

const MobileHero = () => {
    const navigate = useNavigate();

    const triggerLeadPopup = () => {
        window.dispatchEvent(new CustomEvent('openLeadPopup'));
    };

    return (
        <section className="mobile-hero">
            <div className="mobile-hero-container">
                <div className="mobile-hero-visual" data-aos="fade-in">
                    <img src={heroImg} alt="Study MBBS in Uzbekistan" className="mobile-hero-img" />
                    <div className="mobile-hero-overlay"></div>
                </div>
                
                <div className="mobile-hero-content" data-aos="fade-up" data-aos-delay="200">
                    <div className="mobile-hero-badge">
                        <span className="dot"></span>
                        Bravo Groups 
                    </div>
                    <h1 className="mobile-hero-title">
                        Empowering Every <br />
                        <span className="accent-text">Medical Dream</span>
                    </h1>
                    <p className="mobile-hero-subtitle">
                        Most Trusted Bravo Groups Education Consultancy PVT LTD in Vellore. 
                        Start your global journey today.
                    </p>
                    <div className="mobile-hero-btns">
                        <button className="mobile-btn-primary" onClick={triggerLeadPopup}>Apply Now</button>
                        <button className="mobile-btn-outline" onClick={() => navigate('/universities')}>Browse Universities</button>
                    </div>
                </div>
            </div>
            
            {/* Elegant bottom wave or curve for transition */}
            
        </section>
    );
};

export default MobileHero;
