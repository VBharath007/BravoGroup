import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import AOS from 'aos';
import './VideoGallery.css';

import { videos } from '../data/videoData';

function TiltVideoCard({ video, onClick }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
      className="video-tilt-card group"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(video)}
      data-aos="fade-up"
    >
      <div className="vt-card-inner" style={{ transform: "translateZ(50px)" }}>
        <div className="vt-thumbnail">
          <img
            className="vt-thumbnail-img"
            src={video.thumb}
            alt={video.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div className="vt-play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="vt-content">
          <span className="vt-badge">{video.badge}</span>
          <h3 className="vt-title">{video.title}</h3>
          <p className="vt-desc">{video.desc}</p>
        </div>
        {/* Glow Element */}
        <div className="vt-glow" />
      </div>
    </motion.div>
  );
}

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    // AOS initialized globally
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="video-gallery-page">
      {/* ─── Hero Section ─── */}
      <section className="vg-hero">
        <div className="vg-hero-bg">
          <div className="vg-orb orb-1" />
          <div className="vg-orb orb-2" />
        </div>
        <div className="vg-hero-content" data-aos="zoom-out-up">
          <span className="vg-hero-eyebrow">Through Their Eyes</span>
          <h1 className="vg-hero-title">
            Our <span className="vg-title-accent">Cinematic</span> Journey
          </h1>
          <p className="vg-hero-subtitle">
            Immerse yourself in authentic student experiences, campus tours, and medical breakthroughs documented natively in 4K.
          </p>
        </div>
      </section>

      {/* ─── 3D Grid Section ─── */}
      <section className="vg-grid-section">
        <div className="vg-container">
          <div className="vg-grid">
            {videos.map((video) => (
              <TiltVideoCard key={video.id} video={video} onClick={setActiveVideo} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Video Modal ─── */}
      {activeVideo && (
        <div className="vg-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="vg-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="vg-modal-close" onClick={() => setActiveVideo(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="vg-iframe-wrapper">
              <iframe
                src={`${activeVideo.url}?autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="vg-modal-info">
              <h2>{activeVideo.title}</h2>
              <p>{activeVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
