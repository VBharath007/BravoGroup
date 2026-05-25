import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: "SARVESH",
    location: "Krishnagiri, Tamil Nadu",
    university: "Andijan State Medical University, Uzbekistan",
    rating: 5,
    text: `“Zenova made my MBBS dream possible!”\nFrom admission to visa, everything was smooth\nNo confusion, no stress\nToday, I’m studying MBBS in Uzbekistan 🇺🇿`,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    initials: "S",
    media: <video src="/assets/Student testimonial.mp4" controls playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    id: 2,
    name: "DEVIKA",
    location: "Kerala",
    university: "Andijan State Medical University, Uzbekistan",
    rating: 5,
    text: `Feels like home here in Uzbekistan\nSafe, hygienic and very comfortable, good faculty\nSouth Indian food makes it even better\nThanks to Zenova Groups for making everything easy`,
    gradient: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
    initials: "D",
    media: <video src="/assets/testimonial 2.mp4" controls playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  },
  {
    id: 3,
    name: "ASHWIN",
    location: "Tirupur",
    university: "Andijan State medical university",
    rating: 5,
    text: `Velinaatula MBBS padikanum nu dream ah?\nInga college life, hostel, food ellam comfortable ah irukku\nQuality education & safe environment 💯\n🎓 Zenova Groups oda support la\nTop universities in Uzbekistan la padikka chance!\nAdmission open – unga doctor dream ah start pannunga\nIppo  than join pannunga & seat secure pannunga`,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    initials: "A",
    media: <video src="/assets/instagram_testimonial.mp4" poster="/assets/instagram_testimonial_thumb.jpg" controls playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }
];

import axios from 'axios';

export default function Testimonials() {
  const listRef = useRef(null);
  const [dynamicTestimonials, setDynamicTestimonials] = React.useState([]);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://zenovagroupsbackend-production.up.railway.app';

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/testimonials`);
        if (response.data.success) {
          setDynamicTestimonials(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
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
  }, [dynamicTestimonials]);

  const allTestimonials = [
    ...testimonialsData.map(t => ({ ...t, initials: t.initials || t.name.split(' ').map(n => n[0]).join('') })),
    ...dynamicTestimonials.map(t => ({
      id: t._id,
      name: t.name,
      location: t.location || "Student",
      university: t.designation || t.university || "Medical University",
      rating: t.rating || 5,
      text: t.message || t.text,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      initials: t.name.split(' ').map(n => n[0]).join(''),
      media: t.videoUrl ? (
        <iframe width="100%" height="100%" src={t.videoUrl.replace('watch?v=', 'embed/')} title={t.name} frameBorder="0" allowFullScreen style={{ border: 'none' }} />
      ) : t.image ? (
        <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : null
    }))
  ];

  return (
    <div className="testimonials-page">
      {/* ─── Hero Section ─── */}
      <section className="tm-hero">
        <div className="tm-quote-bg">“</div>
        <div className="tm-hero-content" data-aos="fade-up">
          <span className="tm-eyebrow">Real Stories. Real Success.</span>
          <h1 className="tm-title">Voices of <span className="tm-title-accent">Trust</span></h1>
          <p className="tm-subtitle">
            Don't just take our word for it. Hear directly from the hundreds of students who successfully started their medical journey with Zenova Groups.
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
            {allTestimonials.map((review) => (
              <div key={review.id} className="review-card">
                <div className="rc-quote-icon">“</div>

                <div className="rc-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {review.media && (
                  <div className="rc-media" style={{ marginBottom: '1.5rem', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/10', background: 'rgba(0,0,0,0.2)' }}>
                    {review.media}
                  </div>
                )}

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
