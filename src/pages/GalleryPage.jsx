import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AOS from 'aos';
import './GalleryPage.css';
import LazyImage from '../components/Lazyimage';

import img1 from '../assets/1 (1).webp';
import img2 from '../assets/1 (2).webp';
import img3 from '../assets/1 (3).webp';
import img4 from '../assets/1 (4).webp';
import img5 from '../assets/1 (5).webp';
import img6 from '../assets/1 (6).webp';
import img7 from '../assets/1 (7).webp';
import img8 from '../assets/1 (8).webp';
import img9 from '../assets/1 (9).webp';
import img10 from '../assets/1 (10).webp';
import img11 from '../assets/1 (11).webp';

const photos = [
  { id: 1, url: img1, title: 'Student Life', subtitle: 'Campus Interactions' },
  { id: 2, url: img2, title: 'Clinical Training', subtitle: 'Practical Learning' },
  { id: 3, url: img3, title: 'Global Exposure', subtitle: 'International Friends' },
  { id: 4, url: img4, title: 'Medical Library', subtitle: '24/7 Access' },
  { id: 5, url: img5, title: 'Labs & Research', subtitle: 'High-Tech Equipment' },
  { id: 6, url: img6, title: 'Cultural Fest', subtitle: 'Celebrating Our Roots' },
  { id: 7, url: img7, title: 'Campus Life', subtitle: 'Vibrant Community' },
  { id: 8, url: img8, title: 'Orientation Day', subtitle: 'Welcome to Your Future' },
  { id: 9, url: img9, title: 'Clinical Rounds', subtitle: 'Real Hospital Experience' },
  { id: 10, url: img10, title: 'Study Sessions', subtitle: 'Guided Learning' },
  { id: 11, url: img11, title: 'Graduation Moments', subtitle: 'Dreams Fulfilled' },
];

function TiltPhotoCard({ photo, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="photo-tilt-card group"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(photo)}
      data-aos="fade-up"
    >
      <div className="pt-card-inner">
        <LazyImage className="pt-img" src={photo.url} alt={photo.title} loading="lazy" />

        {/* Interactive Overlay */}
        <div className="pt-overlay" style={{ transform: "translateZ(30px)" }}>
          <div className="pt-zoom-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <div className="pt-info">
            <h3 className="pt-title">{photo.title}</h3>
            <p className="pt-subtitle">{photo.subtitle}</p>
          </div>
        </div>

        {/* Optical Glare */}
        <div className="pt-glare" />
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="photo-gallery-page">
      {/* ─── Hero Section ─── */}
      <section className="pg-hero">
        <div className="pg-bg-glow"></div>
        <div className="pg-hero-content" data-aos="zoom-out-up">
          <span className="pg-eyebrow">A Glimpse of Excellence</span>
          <h1 className="pg-title">
            Our <span className="pg-title-accent">Visual</span> Journey
          </h1>
          <p className="pg-subtitle">
            Explore authentic moments from our campus, sophisticated medical labs, and the vibrant life our students enjoy everyday.
          </p>
        </div>
      </section>

      {/* ─── Masonry Grid Section ─── */}
      <section className="pg-grid-section">
        <div className="pg-container">
          <div className="pg-masonry-grid">
            {photos.map((photo) => (
              <TiltPhotoCard key={photo.id} photo={photo} onClick={setActivePhoto} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Lightbox Modal ─── */}
      {activePhoto && (
        <div className="pg-lightbox-overlay" onClick={() => setActivePhoto(null)}>
          <button className="pg-lightbox-close" onClick={() => setActivePhoto(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="pg-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <LazyImage src={activePhoto.url} alt={activePhoto.title} />
            <div className="pg-lightbox-info">
              <h2>{activePhoto.title}</h2>
              <p>{activePhoto.subtitle}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
