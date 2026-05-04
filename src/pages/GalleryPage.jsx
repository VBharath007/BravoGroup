import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import './GalleryPage.css';
import LazyImage from '../components/Lazyimage';

// Assets are now served from the public/assets/gallery directory
const photos = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  url: `/assets/gallery/gallery${i + 1}.jpeg`
}));

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8, rotate: -2 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotate: 0,
    transition: { type: 'spring', bounce: 0.5, duration: 1 } 
  }
};

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
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(photo)}
    >
      <div className="pt-card-inner">
        <LazyImage className="pt-img" src={photo.url} alt={`Gallery Image ${photo.id}`} loading="lazy" />

        {/* Interactive Overlay */}
        <div className="pt-overlay" style={{ transform: "translateZ(30px)" }}>
          <div className="pt-zoom-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
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
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="photo-gallery-page">
      {/* ─── Hero Section ─── */}
      <section className="pg-hero">
        <div className="pg-bg-glow"></div>
        <div className="pg-hero-content">
          <motion.span 
            className="pg-eyebrow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >A Glimpse of Excellence</motion.span>
          <motion.h1 
            className="pg-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.3 }}
          >
            Our <span className="pg-title-accent">Visual</span> Journey
          </motion.h1>
          <motion.p 
            className="pg-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore authentic moments from our campus, sophisticated medical labs, and the vibrant life our students enjoy everyday.
          </motion.p>
        </div>
      </section>

      {/* ─── Masonry Grid Section ─── */}
      <section className="pg-grid-section">
        <div className="pg-container">
          <motion.div 
            className="pg-masonry-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {photos.map((photo) => (
              <TiltPhotoCard key={photo.id} photo={photo} onClick={setActivePhoto} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Lightbox Modal ─── */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div 
            className="pg-lightbox-overlay" 
            onClick={() => setActivePhoto(null)}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            <button className="pg-lightbox-close" onClick={() => setActivePhoto(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <motion.div 
              className="pg-lightbox-content" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5, opacity: 0, y: 100, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100, rotateX: -20 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <LazyImage src={activePhoto.url} alt={`Gallery Image ${activePhoto.id}`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
