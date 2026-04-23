import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSocials from "./components/FloatingSocials";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lazy load all pages
const Home = lazy(() => import("./pages/HomePage"));
const About = lazy(() => import("./pages/AboutPage"));
const Countries = lazy(() => import("./pages/Countries"));
const Apply = lazy(() => import("./pages/Apply"));
const Contact = lazy(() => import("./pages/Contact"));
const Universities = lazy(() => import("./pages/Universities"));
const UzbekistanMBBS = lazy(() => import("./pages/Countries")); // Redirect to Countries
const KyrgyzstanMBBS = lazy(() => import("./pages/Countries")); // Redirect to Countries
const RussiaMBBS = lazy(() => import("./pages/Countries")); // Redirect to Countries
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Gallery = lazy(() => import("./pages/GalleryPage"));
const VideoGallery = lazy(() => import("./pages/VideoGallery"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Login = lazy(() => import("./pages/Contact")); // Redirect to Contact
const Register = lazy(() => import("./pages/Contact")); // Redirect to Contact

// Lazy load university pages
const TashkentMedicalAcademy = lazy(() => import("./pages/universities/TashkentMedicalAcademy"));
const SamarkandStateMedicalUniversity = lazy(() => import("./pages/universities/SamarkandStateMedicalUniversity"));
const BukharaStateMedicalInstitute = lazy(() => import("./pages/universities/BukharaStateMedicalInstitute"));
const AndijanStateMedicalInstitute = lazy(() => import("./pages/universities/AndijanStateMedicalInstitute"));
const FerganaMedicalInstitute = lazy(() => import("./pages/universities/FerganaMedicalInstitute"));

// Lazy load components
const LeadPopup = lazy(() => import("./components/LeadPopup"));

// Optimized loading fallback
const PageLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"
        style={{ borderWidth: '3px' }} />
      <p className="text-gray-600 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense fallback={null}>
        <LeadPopup />
      </Suspense>

      <Navbar />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/mbbs-in-uzbekistan" element={<UzbekistanMBBS />} />
          <Route path="/mbbs-in-kyrgyzstan" element={<KyrgyzstanMBBS />} />
          <Route path="/mbbs-in-russia" element={<RussiaMBBS />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/video-gallery" element={<VideoGallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* University Routes */}
          <Route path="/university/tashkent-medical-academy" element={<TashkentMedicalAcademy />} />
          <Route path="/university/samarkand-state-medical-university" element={<SamarkandStateMedicalUniversity />} />
          <Route path="/university/bukhara-state-medical-institute" element={<BukharaStateMedicalInstitute />} />
          <Route path="/university/andijan-state-medical-institute" element={<AndijanStateMedicalInstitute />} />
          <Route path="/university/fergana-medical-institute" element={<FerganaMedicalInstitute />} />

          {/* Generic University Routes */}
          <Route path="/university/osh-state-university" element={<Universities />} />
          <Route path="/university/ihsm-bishkek" element={<Universities />} />
          <Route path="/university/jasu-kyrgyzstan" element={<Universities />} />
          <Route path="/university/jaiu-medical" element={<Universities />} />
          <Route path="/university/bau-batumi" element={<Universities />} />
          <Route path="/university/caucasus-university" element={<Universities />} />
          <Route path="/university/avicenna-batumi" element={<Universities />} />
          <Route path="/university/seu-tbilisi" element={<Universities />} />
          <Route path="/university/uga-georgia" element={<Universities />} />
          <Route path="/university/kazan-federal" element={<Universities />} />
          <Route path="/university/pirogov-moscow" element={<Universities />} />
          <Route path="/university/bashkir-state" element={<Universities />} />
          <Route path="/university/tver-state" element={<Universities />} />
          <Route path="/university/volgograd-state" element={<Universities />} />
        </Routes>
      </Suspense>

      <Footer />
      <FloatingSocials />
    </BrowserRouter>
  );
}

export default App;
