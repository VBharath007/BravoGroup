import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { GlassButton } from '../components/ui/glass-button';
import LazyImage from '../components/Lazyimage';

// Using centralized data
import { blogPosts } from '../data/blogData';

// Image assets mapping
import logo from '../assets/bgremovedlogo.webp';
import uni1 from '../assets/uni1.webp';
import uni2 from '../assets/uni2.webp';
import uni3 from '../assets/uni3.webp';
import aboutHeroBg from '../assets/about.webp';

const imageMap = {
  "/assets/uni1.webp": uni1,
  "/assets/uni2.webp": uni2,
  "/assets/uni3.webp": uni3,
};

const BlogPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);

    const foundPost = blogPosts.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-primary hover:underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] font-dm pt-[100px] md:pt-[75px]">


      {/* ── HERO SECTION ── */}
      <section
        className="h-[250px] bg-cover bg-center flex items-center relative bg-fixed text-white"
        style={{ backgroundImage: `url(${aboutHeroBg})` }}
      >
        <div className="absolute inset-0 bg-[#000b33]/70 z-[1]"></div>
        <div className="max-w-[1210px] mx-auto px-6 relative z-[2] w-full" data-aos="fade-up">
          <div className="flex items-center gap-4 justify-start mb-5">
            <span className="bg-primary px-[15px] py-1.25 rounded-md text-[0.7rem] font-extrabold uppercase tracking-wide">Education</span>
            <span className="text-[0.65rem] font-semibold opacity-100">{post.date}</span>
          </div>
          <h1 className="text-[1.2rem] md:text-[1.5rem] font-extrabold leading-tight max-w-[900px] m-0 drop-shadow-lg">{post.title}</h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-10">
        <div className="max-w-[1210px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-5">

            {/* Main Column */}
            <div className="lg:flex-[2]" data-aos="fade-right">
              <div className="relative rounded-[15px] overflow-hidden mb-5 bg-white shadow-sm">
                <LazyImage src={imageMap[post.image] || post.image} alt={post.title} className="w-full h-[300px] lg:h-[380px] object-cover" />
                <div className="absolute top-[15px] left-[15px] bg-white/90 p-[8px_12px] rounded-lg z-[2] flex items-center justify-center shadow-md">
                  <LazyImage src={logo} alt="bravogroup Logo" className="h-[50px] w-[50px] object-contain" />
                </div>
              </div>

              <div className="bg-white p-5 lg:p-10 rounded-[15px] text-[#334155] leading-relaxed shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose-content" />


              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:flex-[1]" data-aos="fade-left">
              <div className="bg-white p-6 lg:p-[25px] rounded-[15px] shadow-sm mb-[30px]">
                {/* <h3 className="text-[1.2rem] font-extrabold mb-5 pb-4 border-b-2 border-gray-100">Related Insights</h3>
                <div className="flex flex-col gap-5">
                  {relatedPosts.map((rPost, idx) => (
                    <Link to={`/blog/${rPost.slug}`} key={idx} className="flex gap-4 group no-underline text-inherit">
                      <div className="shrink-0 w-20 h-15 rounded-lg overflow-hidden">
                        <LazyImage src={imageMap[rPost.image] || rPost.image} alt={rPost.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[0.75rem]  text-[#1e293b] mb-1 line-clamp-2 leading-tight group-hover:text-primary">{rPost.title}</h4>
                        <span className="text-[0.55rem] text-[#94a3b8] font-semibold">{rPost.date}</span>
                      </div>
                    </Link>
                  ))}
                </div> */}
              </div>

              <div className="bg-[#00155E] p-6 lg:p-[25px] rounded-[15px] text-white text-center shadow-lg">
                <h3 className="text-[1.1rem] font-bold mb-4">Start Your Journey Today</h3>
                <p className="text-[0.85rem] mb-6 opacity-90 leading-relaxed">Join 500+ students who achieved their medical dreams with us.</p>
                <GlassButton
                  className="w-full"
                  size="lg"
                  onClick={() => window.dispatchEvent(new CustomEvent('openLeadPopup'))}
                >
                  Apply Now
                </GlassButton>
              </div>
            </aside>

          </div>
        </div>
      </section>




      {/* Basic content styles if prose is not available */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .prose-content h3 { font-size: 1rem; font-weight: 800; color: #1a2035; margin: 30px 0 15px; }
        .prose-content p { margin-bottom: 0.9rem; font-size: 0.95rem; line-height: 1.8; }
        .prose-content ul { margin-bottom: 0.9rem; padding-left: 1.5rem; list-style-type: disc; }
        .prose-content li { margin-bottom: 0.9rem; font-size: 0.95rem; }
        .prose-content blockquote { border-left: 4px solid #2F4DFF; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #1e293b; font-weight: 600; }
      `}} />
    </div>
  );
};

export default BlogPost;
