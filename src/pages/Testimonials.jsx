import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "Deepika Sharma",
    location: "Chennai, Tamil Nadu",
    university: "Tashkent Medical Academy",
    rating: 5,
    text: "Thanks to Bravo Groups, I got into a top medical university in Uzbekistan. They were honest, responsive, and treated me like family throughout the journey. The documentation process was incredibly smooth.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    initials: "DS"
  },
  {
    id: 2,
    name: "Faizan M.",
    location: "Hyderabad, Telangana",
    university: "Samarkand State Medical University",
    rating: 5,
    text: "Bravo Groups made the entire admission process stress-free. From selecting the university to getting my visa approved, everything was handled professionally and on time.",
    gradient: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
    initials: "FM"
  },
  {
    id: 3,
    name: "Ravi Kumar",
    location: "Coimbatore, Tamil Nadu",
    university: "Bukhara State Medical Institute",
    rating: 5,
    text: "I had no clue where to start, but they guided me step-by-step. Their support with documents, visa, and travel was excellent. Highly recommend them to any medical aspirant!",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    initials: "RK"
  },
  {
    id: 4,
    name: "Sameera J.",
    location: "Bangalore, Karnataka",
    university: "Kyrgyz State Medical Academy",
    rating: 5,
    text: "The team is incredibly professional. They helped me with bank loans as well, making the financial part of my MBBS journey much easier to manage.",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    initials: "SJ"
  },
  {
    id: 5,
    name: "Manoj Kumar",
    location: "Salem, Tamil Nadu",
    university: "Andijan State Medical Institute",
    rating: 5,
    text: "I was worried about the language barrier, but Bravo Groups provided great preparatory sessions. I'm now studying at a top university with total confidence.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    initials: "MK"
  },
  {
    id: 6,
    name: "Preeti M.",
    location: "Madurai, Tamil Nadu",
    university: "Osh State University",
    rating: 5,
    text: "From airport pickup to hostel settlement, Bravo Groups was there on the ground for me. I never felt alone in a new country thanks to their local team support.",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    initials: "PM"
  }
];

export default function Testimonials() {
  const listRef = useRef(null);

  useEffect(() => {
    // AOS initialized globally
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      gsap.utils.toArray(".review-card").forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: (index % 3) * 0.1, // Stagger rows
            ease: "power3.out"
          }
        );
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="testimonials-page">
      {/* ─── Hero Section ─── */}
      <section className="tm-hero">
        <div className="tm-quote-bg">“</div>
        <div className="tm-hero-content" data-aos="fade-up">
          <span className="tm-eyebrow">Real Stories. Real Success.</span>
          <h1 className="tm-title">Voices of <span className="tm-title-accent">Trust</span></h1>
          <p className="tm-subtitle">
            Don't just take our word for it. Hear directly from the hundreds of students who successfully started their medical journey with Bravo Groups.
          </p>
        </div>
      </section>

      {/* ─── Stats Banner ─── */}
      <section className="tm-stats-banner" data-aos="fade-up">
        <div className="tm-stat-item">
          <h2>100+</h2>
          <p>Students Placed</p>
        </div>
        <div className="tm-stat-divider" />
        <div className="tm-stat-item">
          <h2>4.9/5</h2>
          <p>Average Rating</p>
        </div>
        <div className="tm-stat-divider" />
        <div className="tm-stat-item">
          <h2>100%</h2>
          <p>Visa Success Rate</p>
        </div>
      </section>

      {/* ─── Masonry Grid ─── */}
      <section className="tm-grid-section" ref={listRef}>
        <div className="tm-container">
          <div className="tm-masonry-grid">
            {testimonialsData.map((review) => (
              <div key={review.id} className="review-card">
                <div className="rc-quote-icon">“</div>
                
                <div className="rc-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                <p className="rc-text">{review.text}</p>
                
                <div className="rc-footer">
                  <div className="rc-avatar" style={{ background: review.gradient }}>
                    {review.initials}
                  </div>
                  <div className="rc-info">
                    <h4 className="rc-name">{review.name}</h4>
                    <p className="rc-university">{review.university}</p>
                    <p className="rc-location">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
