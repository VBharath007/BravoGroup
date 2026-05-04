import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';


// Using centralized data
import { blogPosts } from '../data/blogData';

// Assets are now served from the public/assets directory
const logo = '/assets/logo.jpeg';
const aboutHeroBg = '/assets/about.webp';

function BlogCard({ post, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

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

  const themes = [
    'linear-gradient(135deg, rgba(37, 99, 235, 0.5), rgba(49, 46, 129, 0.7))',
    'linear-gradient(135deg, rgba(16, 185, 129, 0.5), rgba(20, 83, 45, 0.7))',
    'linear-gradient(135deg, rgba(245, 158, 11, 0.5), rgba(124, 45, 18, 0.7))',
    'linear-gradient(135deg, rgba(244, 63, 94, 0.5), rgba(153, 27, 27, 0.7))',
    'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(76, 29, 149, 0.7))',
  ];
  const theme = themes[index % themes.length];

  return (
    <motion.div
      className="group relative overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-sm transition-all duration-500 hover:shadow-[0_20px_45px_rgba(47,77,255,0.15)]"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/blog/${post.slug || post.title.toLowerCase().replace(/\s+/g, '-')}`} className="block no-underline">
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="relative z-10 w-full h-full flex flex-col">

          {/* Visual Area */}
          <div className="relative h-[240px] w-full overflow-hidden rounded-t-[24px]">
            {/* Dynamic Overlay */}
            <div
              className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: theme, mixBlendMode: 'multiply' }}
            />

            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15, rotate: 2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />

            {/* Hover Logo Badge - Glassmorphism Effect */}
            <div className="absolute top-[15px] left-[15px] bg-white/10 backdrop-blur-[12px] p-[8px] rounded-xl z-[2] flex items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-white/30 transform-gpu transition-all duration-500 group-hover:-translate-y-1">
              <img src={logo} alt="Zenova Logo" className="h-[45px] w-[45px] object-contain drop-shadow-md" />
            </div>

            {/* Flare Effect */}
            <motion.div
              className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/40 to-transparent -rotate-45 z-[3] pointer-events-none"
              initial={{ left: '-150%', top: '-150%' }}
              whileHover={{ left: '150%', top: '150%' }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </div>

          {/* Content Area */}
          <div className="p-7 relative bg-white flex-1 rounded-b-[24px] flex flex-col" style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.65rem] font-extrabold text-[#2F4DFF] tracking-widest uppercase bg-[#2F4DFF]/10 px-2.5 py-1.5 rounded-md">
                {post.category || 'Education'}
              </span>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <div className="text-[0.75rem] text-slate-500 font-bold uppercase tracking-wide">{post.date}</div>
            </div>

            <h3 className="text-[1.2rem] font-extrabold text-[#000b33] mb-3 leading-snug group-hover:text-[#2F4DFF] transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-[0.9rem] text-[#64748b] leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="mt-auto pt-5 border-t border-slate-100/80 flex items-center justify-between">
              <span className="text-[#2F4DFF] font-extrabold text-[0.85rem] inline-flex items-center tracking-wide group-hover:text-blue-800 transition-colors">
                Read Full Story
                <div className="flex items-center justify-center overflow-hidden w-8 h-8 ml-2">
                  <span className="transform text-lg transition-all duration-500 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 -translate-x-6">→</span>
                </div>
              </span>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}


const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-dm text-[#333] bg-[#f8fafc] overflow-x-hidden pt-[110px]">


      {/* ── HERO SECTION ── */}
      <section
        className="h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center relative bg-fixed overflow-hidden"
        style={{ backgroundImage: `url(${aboutHeroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b33]/90 via-[#000b33]/70 to-[#000b33]/90 z-[1] backdrop-blur-[2px]"></div>

        {/* Decorative 3D Orbs */}
        <motion.div
          className="absolute -top-[100px] -right-[50px] w-[350px] h-[350px] bg-blue-600/30 rounded-full blur-[90px] z-[1]"
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] bg-purple-600/30 rounded-full blur-[90px] z-[1]"
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative z-[2] text-center px-4 max-w-[800px] mx-auto" data-aos="zoom-in" data-aos-duration="1000">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span>
            <span className="text-white/90 text-[0.75rem] font-extrabold tracking-[0.2em] uppercase">Latest Updates</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-white text-[2.5rem] md:text-[4rem] font-extrabold m-0 tracking-tight drop-shadow-2xl text-balance leading-tight"
          >
            Medical News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Insights</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-white/70 mt-6 text-[1rem] md:text-[1.1rem] max-w-[600px] mx-auto font-medium"
          >
            Stay updated with the latest regulations, success stories, and expert guidance for your MBBS journey abroad.
          </motion.p>
        </div>
      </section>

      {/* ── BLOG LIST ── */}
      <section className="py-24 relative bg-[#f4f7fe]">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/50 to-transparent z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-purple-50/50 to-transparent z-0 pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12" style={{ perspective: "1500px" }}>
            {blogPosts.map((post, idx) => (
              <BlogCard key={post.id || idx} post={post} index={idx} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
