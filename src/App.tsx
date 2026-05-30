import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
  User,
  Users,
  Layers,
} from 'lucide-react';
import facadeImg from './assets/facade.jpg';
import bathroomGlassImg from './assets/products/Bathroom & Glass Fittings.png';
import doorHardwareImg from './assets/products/door hardware.png';
import modularKitchenImg from './assets/products/Modular Kitchen Fittings.png';
import plywoodLaminatesImg from './assets/products/Plywood & Laminates.png';
import slidingAluminiumImg from './assets/products/Sliding & Aluminium Systems.png';
import toolsIndustrialImg from './assets/products/Tools & Industrial Hardware.png';
import './App.css';

const brandModules = import.meta.glob('./assets/brands/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const brandLogos = Object.values(brandModules).sort();

const IMAGES = [
  {
    name: 'Door Hardware',
    src: doorHardwareImg,
    bg: '#B56B4E',
  },
  {
    name: 'Plywood & Laminates',
    src: plywoodLaminatesImg,
    bg: '#C8A96B',
    lift: '-35%',
  },
  {
    name: 'Modular Kitchen Fittings',
    src: modularKitchenImg,
    bg: '#7E8FA5',
  },
  {
    name: 'Bathroom & Glass Fittings',
    src: bathroomGlassImg,
    bg: '#7BA6AD',
  },
  {
    name: 'Tools & Industrial Hardware',
    src: toolsIndustrialImg,
    bg: '#6C6A68',
  },
  {
    name: 'Sliding & Aluminium Systems',
    src: slidingAluminiumImg,
    bg: '#8C9AA5',
  },
];

const GRAIN_SVG =
  'data:image/svg+xml;utf8,%3Csvg%20width=%27200%27%20height=%27200%27%20viewBox=%270%200%20200%20200%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27%20numOctaves=%274%27%20stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect%20width=%27200%27%20height=%27200%27%20filter=%27url(%23n)%27%20opacity=%270.08%27/%3E%3C/svg%3E';

const TESTIMONIALS = [
  {
    name: 'Ramesh Kumar',
    quote:
      'I purchased door fittings and plywood from Swastik & Company. The quality is really good and the staff guided me properly. Highly recommended for all hardware needs.',
  },
  {
    name: 'Arun Builders',
    quote:
      'As a contractor, I regularly buy materials from here. They provide consistent quality and fast service. Very reliable store in Erode.',
  },
  {
    name: 'Priya S',
    quote:
      'No need to visit multiple shops. I got everything for my kitchen and wardrobe fittings here. Pricing is also very reasonable compared to other stores.',
  },
];

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isEnquiryVisible, setIsEnquiryVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Slow down video playback to 0.75x speed
    video.playbackRate = 0.75;

    let animationFrameId: number;

    const updateOpacity = () => {
      const current = video.currentTime;
      const duration = video.duration;

      if (duration && !isNaN(duration)) {
        let opacity = 1;
        const fadeDuration = 0.5; // 0.5s fade in/out

        if (current < fadeDuration) {
          // Fade in at the start (opacity 0 to 1)
          opacity = current / fadeDuration;
        } else if (duration - current < fadeDuration) {
          // Fade out before the end (opacity 1 to 0)
          opacity = (duration - current) / fadeDuration;
        }

        // Clamp opacity
        opacity = Math.max(0, Math.min(1, opacity));
        video.style.opacity = opacity.toString();
      } else {
        video.style.opacity = '0';
      }

      animationFrameId = requestAnimationFrame(updateOpacity);
    };

    animationFrameId = requestAnimationFrame(updateOpacity);

    // Initial play trigger
    video.play().catch((err) => {
      console.warn("Autoplay was blocked or failed, waiting for user interaction.", err);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    IMAGES.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver for scroll-driven animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboutVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    const target = document.getElementById('about');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTestimonialsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    const target = document.getElementById('testimonials');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsEnquiryVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    const target = document.getElementById('enquiry');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    // On ended event: set opacity to 0, wait 100ms, reset currentTime = 0, then play() again
    video.style.opacity = '0';

    setTimeout(() => {
      video.currentTime = 0;
      video.playbackRate = 0.75; // Keep video slowed down on loop restart
      video.play().catch((err) => {
        console.error('Video loop restart failed:', err);
      });
    }, 100);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;

    setIsAnimating(true);
    const total = IMAGES.length;
    setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % total : (prev - 1 + total) % total));

    setTimeout(() => setIsAnimating(false), 650);
  };

  const totalItems = IMAGES.length;
  const centerIndex = activeIndex;
  const leftIndex = (activeIndex - 1 + totalItems) % totalItems;
  const rightIndex = (activeIndex + 1) % totalItems;
  const backIndex = (activeIndex + 2) % totalItems;
  const activeProduct = IMAGES[activeIndex].name;
  const ghostFontSize =
    activeProduct.length > 22 ? 'clamp(44px, 12vw, 190px)' : 'clamp(60px, 16vw, 240px)';

  const brandRows = [0, 1, 2].map((rowIndex) =>
    brandLogos.filter((_, index) => index % 3 === rowIndex)
  );

  return (
    <div className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION (100vh) */}
      <div id="home" className="relative h-screen w-full flex flex-col justify-between bg-white">
        
        {/* Background showroom video layer (z-0) */}
        <div 
          className="absolute z-0 left-0 right-0 top-0 bottom-0 overflow-hidden pointer-events-none" 
        >
          <video
            ref={videoRef}
            src="/showroom.mp4"
            className="w-full h-full object-cover object-bottom"
            muted
            playsInline
            autoPlay
            onEnded={handleEnded}
            style={{ opacity: 0 }}
          />
          {/* Soft top-down white gradient overlay to fade the top half into the white page background */}
          <div 
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-[1]"
            style={{ height: '55vh' }}
          ></div>
        </div>

        {/* Navigation Bar (z-20) */}
        <header className="relative z-20">
          <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
              className="font-serif text-3xl tracking-tight text-[#000000] select-none hover:opacity-85 transition-opacity"
            >
              Swastik &amp; Co.<sup className="text-xs font-sans align-super ml-0.5 select-none text-[#6F6F6F]">®</sup>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-sm font-medium text-[#000000] hover:opacity-75 transition-opacity cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors cursor-pointer">
                About Us
              </button>
              <a href="https://wa.me/919442466631" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors">
                Contact Our Team
              </a>
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <a 
                href="https://wa.me/919442466631" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block rounded-full px-6 py-2.5 text-sm font-medium bg-[#000000] text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-out"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </nav>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 mx-4 p-6 rounded-2xl glassmorphism z-30 flex flex-col space-y-4 animate-fade-rise">
              <button onClick={() => scrollToSection('home')} className="text-left text-base font-medium text-[#000000] py-2 border-b border-black/5">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left text-base font-medium text-[#6F6F6F] hover:text-[#000000] py-2 border-b border-black/5">
                About Us
              </button>
              <a 
                href="https://wa.me/919442466631" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center rounded-full py-3.5 text-base font-medium bg-[#000000] text-white hover:scale-[1.02] active:scale-[0.98] transition-transform mt-4"
              >
                WhatsApp Us Now
              </a>
            </div>
          )}
        </header>

        {/* Hero Content Section (z-10) */}
        <main 
          className="relative z-10 flex-grow flex flex-col items-center justify-start text-center px-6"
          style={{ paddingTop: 'calc(6.5rem - 75px)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center animate-fade-rise">
            {/* Headline */}
            <h1 className="font-serif font-normal text-5xl sm:text-7xl md:text-8xl text-[#000000] leading-[0.95] tracking-[-2.46px]">
              All Your <span className="italic text-[#6F6F6F]">Hardware Needs</span> <br className="hidden sm:inline" /> in One <span className="italic text-[#6F6F6F]">Place.</span>
            </h1>

            {/* Hero CTA Button */}
            <button 
              onClick={() => scrollToSection('about')}
              className="rounded-full px-14 py-5 text-base font-medium bg-[#000000] text-white hover:scale-[1.03] transition-transform duration-300 ease-out active:scale-[0.98] mt-12 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 cursor-pointer"
            >
              Discover Swastik &amp; Co.
            </button>
          </div>
        </main>

        {/* Floating Highlights Bar at the very bottom of Hero */}
        <div className="relative z-10 w-full flex justify-center pb-8 animate-fade-rise-delay-2">
          <div className="glassmorphism rounded-full px-8 py-3.5 flex flex-wrap gap-x-6 gap-y-2 items-center justify-center max-w-4xl border border-white/20 shadow-xl">
            <span className="text-xs font-semibold text-black/70">30+ Years Experience</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-black/20"></span>
            <span className="text-xs font-semibold text-black/70">250+ Happy Clients</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-black/20"></span>
            <span className="text-xs font-semibold text-black/70">5000+ Products Available</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-black/20"></span>
            <span className="text-xs font-semibold text-black/70">Wholesale &amp; Retail</span>
          </div>
        </div>
      </div>

      {/* Infinite scrolling marquee text ticker */}
      <div className="relative z-10 w-full overflow-hidden bg-[#FAF9F6] py-3.5 border-y border-black/5 select-none">
        <div className="animate-marquee whitespace-nowrap flex text-black/40 text-[10px] font-bold uppercase tracking-widest gap-12">
          <span>Swastik &amp; Company • Architectural Hardware • Premium Plywood • Designer Laminates • Modular Kitchens • Estd 1991 • Swastik &amp; Company • Architectural Hardware • Premium Plywood • Designer Laminates • Modular Kitchens • Estd 1991 • </span>
          <span>Swastik &amp; Company • Architectural Hardware • Premium Plywood • Designer Laminates • Modular Kitchens • Estd 1991 • Swastik &amp; Company • Architectural Hardware • Premium Plywood • Designer Laminates • Modular Kitchens • Estd 1991 • </span>
        </div>
      </div>

      {/* 2. COMPACT & PROFESSIONAL BENTO LIGHT ABOUT US SECTION */}
      <section 
        id="about" 
        className="relative bg-[#FAF9F6] py-8 md:py-10 px-6 sm:px-8 border-t border-black/5 z-10 dot-pattern overflow-hidden min-h-fit flex items-center"
      >
        {/* Subtle mesh gradients in background for visual depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#917646]/[0.015] via-transparent to-[#C5A880]/[0.02] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[#917646]/5 blur-[120px] pointer-events-none z-0 animate-pulse-glow"></div>

        <div className="w-full max-w-7xl mx-auto z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Bento Card 1: The Facade Card (Tall, spans 5 columns, takes 2 rows on desktop) */}
            <div 
              className={`about-card lg:col-span-5 lg:row-span-2 bento-card bento-card-lift overflow-hidden flex flex-col justify-between group min-h-[400px] md:min-h-[460px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {/* Facade Image wrapper */}
              <div className="relative w-full flex-grow overflow-hidden bg-zinc-100 min-h-[220px] md:min-h-[280px]">
                <img 
                  src={facadeImg} 
                  alt="Swastik & Company Facade" 
                  className="w-full h-full object-cover object-[center_35%] transform scale-100 group-hover:scale-103 transition-transform duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-[800ms]"></div>
                
                {/* Thin-stroke rotating badge stamp overlay */}
              </div>

              {/* Address Details & Google Maps action */}
              <div className="p-5 bg-white border-t border-black/5">
                <div className="text-[11px] tracking-widest text-[#917646] uppercase font-bold">ஸ்வஸ்திக் &amp; கம்பனி</div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-black mt-1">Swastik &amp; Company</h4>
                <p className="text-sm text-black/55 mt-1.5 leading-relaxed">
                  102, Nehru Street, Erode Fort, Tamil Nadu - 638001
                </p>
                <div className="mt-3.5 pt-3 border-t border-black/5 flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-wider text-black/45 font-bold">Erode HQ 📍</span>
                  <a 
                    href="https://maps.google.com/?q=Swastik+and+Company+102+Nehru+Street+Erode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#917646] hover:text-black transition-colors"
                  >
                    Open Maps
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bento Card 2: The Story Card (Wide, spans 7 columns) */}
            <div 
              className={`about-card lg:col-span-7 bento-card bento-card-lift p-6 md:p-8 flex flex-col justify-between min-h-[200px] md:min-h-[220px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="space-y-3">
                {/* Premium Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest text-[#917646] bg-[#917646]/[0.06] border border-[#917646]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#917646]"></span>
                  OUR LEGACY
                </div>
                {/* Heading */}
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black font-normal tracking-tight leading-tight">
                  Three Decades of Premium Materials &amp; <br className="hidden md:inline" />
                  <span className="text-gradient-gold italic font-light">Architectural Trust.</span>
                </h2>
                {/* Narrative */}
                <p className="text-black/80 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                  Since 1991, Swastik &amp; Company has curated the finest architectural hardware, premium plywood, designer laminates, and modular kitchens for Erode's premium builders and designers. We bridge the gap between design vision and physical durability.
                </p>
              </div>

              {/* Horizontal CTA Row */}
              <div className="pt-4 mt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[11px] text-black/40 font-medium">Have a project? Let's connect on WhatsApp.</span>
                <a 
                  href="https://wa.me/919442466631" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold bg-[#000000] text-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-sm"
                >
                  WhatsApp Us Now
                </a>
              </div>
            </div>

            {/* Bento Card 3: Key Metrics Card (Spans 3 columns) */}
            <div 
              className={`about-card lg:col-span-3 bento-card bento-card-lift p-6 flex flex-col justify-between min-h-[200px] md:min-h-[220px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Metrics</span>
              <div className="space-y-4 my-auto">
                {/* Legacy Metric */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#917646]/5 rounded-xl text-[#917646] shrink-0"></div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-serif font-normal text-black leading-none tracking-tight">30+</div>
                    <div className="text-[12px] text-black/50 font-bold uppercase tracking-wider mt-0.5">Years Legacy</div>
                  </div>
                </div>

                {/* Products Metric */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#917646]/5 rounded-xl text-[#917646] shrink-0"></div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-serif font-normal text-black leading-none tracking-tight">5K+</div>
                    <div className="text-[12px] text-black/50 font-bold uppercase tracking-wider mt-0.5">Products</div>
                  </div>
                </div>

                {/* Happy Clients Metric */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#917646]/5 rounded-xl text-[#917646] shrink-0"></div>
                  <div>
                    <div className="text-4xl sm:text-5xl font-serif font-normal text-black leading-none tracking-tight">250+</div>
                    <div className="text-[12px] text-black/50 font-bold uppercase tracking-wider mt-0.5">Happy Clients</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-black/5 pt-2">
                <span className="text-[10px] text-black/40">Established in 1991</span>
              </div>
            </div>

            {/* Bento Card 4: Brand Pillars Card (Spans 4 columns) */}
            <div 
              className={`about-card lg:col-span-4 bento-card bento-card-lift p-6 flex flex-col justify-between min-h-[200px] md:min-h-[220px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'is-visible' : ''
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Curations</span>
              <div className="space-y-3 my-auto">
                {/* Pillar 1 */}
                <div className={`flex items-center gap-3.5 py-1 border-b border-black/5 ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
                  <div className="w-5 h-5"></div>
                  <div>
                    <div className="text-sm text-[#917646] font-bold font-serif leading-none">01</div>
                    <span className="text-base sm:text-lg font-bold text-black/80 mt-0.5 block">Architectural Hardware</span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className={`flex items-center gap-3.5 py-1 border-b border-black/5 ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
                  <div className="w-5 h-5"></div>
                  <div>
                    <div className="text-sm text-[#917646] font-bold font-serif leading-none">02</div>
                    <span className="text-base sm:text-lg font-bold text-black/80 mt-0.5 block">Plywood &amp; Laminates</span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className={`flex items-center gap-3.5 py-1 ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
                  <div className="w-5 h-5"></div>
                  <div>
                    <div className="text-sm text-[#917646] font-bold font-serif leading-none">03</div>
                    <span className="text-base sm:text-lg font-bold text-black/80 mt-0.5 block">Modular Kitchen Systems</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-black/5 pt-2">
                <span className="text-[10px] text-black/40">Premium standards</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="testimonials" className="relative w-full bg-[#FAF7F2] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col gap-3 text-center items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-black/50 font-semibold">
              Real stories from our happy customers
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-black">
              Trusted quality, honest service, and satisfied projects.
            </h3>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className={`testimonial-card rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 ${
                  isTestimonialsVisible ? 'is-visible' : ''
                }`}
              >
                <div className="text-[#917646] text-sm tracking-[0.3em]">★★★★★</div>
                <p className="mt-3 text-sm text-black/70 leading-relaxed">{item.quote}</p>
                <div className="mt-5 text-sm font-semibold text-black">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: IMAGES[activeIndex].bg,
          transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div className="relative w-full" style={{ height: '100vh', overflow: 'hidden' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 50,
              backgroundImage: `url("${GRAIN_SVG}")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
              opacity: 0.4,
            }}
          />

          <div
            className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
            style={{
              zIndex: 2,
              top: '18%',
              fontFamily: "'Anton', sans-serif",
              fontSize: ghostFontSize,
              fontWeight: 900,
              color: '#FFFFFF',
              opacity: 1,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              whiteSpace: 'normal',
              maxWidth: '92vw',
              textAlign: 'center',
              padding: '0 6vw',
            }}
          >
            {activeProduct}
          </div>

          <div
            className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
            style={{ zIndex: 60, color: '#FFFFFF', opacity: 0.9, letterSpacing: '0.18em' }}
          >
            PRODUCT CATEGORIES
          </div>

          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            {IMAGES.map((item, index) => {
              const role =
                index === centerIndex
                  ? 'center'
                  : index === leftIndex
                    ? 'left'
                    : index === rightIndex
                      ? 'right'
                      : index === backIndex
                        ? 'back'
                        : 'hidden';

              const baseStyles: CSSProperties = {
                position: 'absolute',
                aspectRatio: '0.6 / 1',
                transform: 'translateX(-50%) scale(1)',
                filter: 'blur(0px) drop-shadow(0 22px 38px rgba(0,0,0,0.25))',
                opacity: 1,
                left: '50%',
                bottom: 0,
                height: isMobile ? '20%' : '30%',
                zIndex: 5,
                transition:
                  'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)',
                willChange: 'transform, filter, opacity',
              };

              const roleStyles: Record<string, CSSProperties> = {
                center: {
                  transform: `translate(-50%, -50%) translateY(${item.lift ?? '0%'}) scale(${isMobile ? 1.2 : 1.5})`,
                  filter: 'blur(0px) drop-shadow(0 22px 38px rgba(0,0,0,0.25))',
                  opacity: 1,
                  zIndex: 20,
                  left: '50%',
                  height: isMobile ? '78%' : '92%',
                  top: '50%',
                  bottom: 'auto',
                },
                left: {
                  transform: `translateX(-50%) translateY(${item.lift ?? '0%'}) scale(1)`,
                  filter: 'blur(2px) drop-shadow(0 14px 26px rgba(0,0,0,0.2))',
                  opacity: 0.85,
                  zIndex: 10,
                  left: isMobile ? '20%' : '30%',
                  height: isMobile ? '20%' : '32%',
                  bottom: isMobile ? '38%' : '18%',
                },
                right: {
                  transform: `translateX(-50%) translateY(${item.lift ?? '0%'}) scale(1)`,
                  filter: 'blur(2px) drop-shadow(0 14px 26px rgba(0,0,0,0.2))',
                  opacity: 0.85,
                  zIndex: 10,
                  left: isMobile ? '80%' : '70%',
                  height: isMobile ? '20%' : '32%',
                  bottom: isMobile ? '38%' : '18%',
                },
                back: {
                  transform: `translateX(-50%) translateY(${item.lift ?? '0%'}) scale(1)`,
                  filter: 'blur(4px) drop-shadow(0 10px 20px rgba(0,0,0,0.18))',
                  opacity: 1,
                  zIndex: 5,
                  left: '50%',
                  height: isMobile ? '18%' : '26%',
                  bottom: isMobile ? '38%' : '18%',
                },
                hidden: {
                  transform: `translateX(-50%) translateY(${item.lift ?? '0%'}) scale(0.7)`,
                  filter: 'blur(6px)',
                  opacity: 0,
                  zIndex: 1,
                  left: '50%',
                  height: isMobile ? '10%' : '16%',
                  bottom: isMobile ? '32%' : '12%',
                },
              };

              return (
                <div key={item.src} style={{ ...baseStyles, ...roleStyles[role] }}>
                  <img
                    src={item.src}
                    alt={item.name}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
            style={{ zIndex: 60, maxWidth: '320px' }}
          >
            <p
              className="mb-2 sm:mb-3 text-base sm:text-[22px] font-bold uppercase"
              style={{ color: '#FFFFFF', opacity: 0.95, letterSpacing: '0.02em' }}
            >
              {activeProduct}
            </p>
            <p
              className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
              style={{ color: '#FFFFFF', opacity: 0.85, lineHeight: 1.6 }}
            >
              Curated selections for builders, designers, and homeowners. Durable finishes, premium
              materials, and a range that brings every space together.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('prev')}
                className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white text-white transition-transform"
                style={{
                  backgroundColor: 'transparent',
                  transition: 'transform 150ms, background-color 150ms',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = 'scale(1.08)';
                  event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = 'scale(1)';
                  event.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Previous character"
              >
                <ArrowLeft size={26} strokeWidth={2.25} />
              </button>
              <button
                type="button"
                onClick={() => navigate('next')}
                className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white text-white transition-transform"
                style={{
                  backgroundColor: 'transparent',
                  transition: 'transform 150ms, background-color 150ms',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = 'scale(1.08)';
                  event.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = 'scale(1)';
                  event.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Next character"
              >
                <ArrowRight size={26} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          <a
            href="#"
            className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-3"
            style={{
              zIndex: 60,
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              color: '#FFFFFF',
              opacity: 0.95,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 200ms',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.opacity = '0.95';
            }}
          >
            DISCOVER PRODUCTS
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>

      </section>

      <section className="relative w-full bg-[#F6F2EC] py-16 sm:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col gap-2 text-center items-center">
              <span className="text-3xl sm:text-4xl uppercase tracking-[0.3em] text-black/60 font-extrabold">
                Our Trusted Brands
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-black">
                Partners that define quality
              </h3>
              <p className="text-sm sm:text-base text-black/60 max-w-2xl">
                A curated lineup of brands we trust every day for durability, finish, and long-term
                performance.
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              {brandRows.map((row, rowIndex) => {
                const marqueeClass =
                  rowIndex === 1 ? 'brands-track brands-track-right' : 'brands-track brands-track-left';

                const track = row.length > 1 ? [...row, ...row] : row;

                return (
                  <div key={`brands-row-${rowIndex}`} className="brands-marquee">
                    <div className={marqueeClass}>
                      {track.map((logo, index) => (
                        <div key={`${logo}-${index}`} className="brands-item">
                          <img src={logo} alt="Brand logo" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="relative w-full bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-black/50 font-semibold">
              Send an Enquiry
            </span>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-black">
              Tell us what you need
            </h3>
            <p className="mt-2 max-w-xl text-sm sm:text-base text-black/60">
              Share your requirements and we will respond with the right products, pricing, and
              availability.
            </p>
          </div>
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch transition-all duration-700 ${
              isEnquiryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="w-full h-full">
              <div className="h-full rounded-3xl border border-black/10 overflow-hidden bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="h-[320px] sm:h-[420px]">
                  <iframe
                    title="Swastik & Company map"
                    src="https://www.google.com/maps?q=Swastik%20and%20Company%20102%20Nehru%20Street%20Erode&output=embed"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-black/50 font-semibold">
                    <MapPin className="h-4 w-4 text-[#917646]" />
                    Our Location
                  </div>
                  <div className="mt-2 text-sm text-black/70">
                    102, Nehru Street, Erode Fort, Tamil Nadu - 638001
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex flex-col">
              <form className="h-full rounded-3xl border border-black/10 bg-[#FAF7F2] p-6 sm:p-8 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="flex flex-col gap-2 text-sm text-black/60">
                    Your name *
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                      <input
                        type="text"
                        placeholder="Ex. Ramesh Kumar"
                        className="w-full rounded-2xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#917646]/30"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-black/60">
                    Phone Number *
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full rounded-2xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#917646]/30"
                      />
                    </div>
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-black/60">
                    Product category *
                    <div className="relative">
                      <Layers className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                      <select className="w-full appearance-none rounded-2xl border border-black/10 bg-white py-3 pl-11 pr-9 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#917646]/30">
                        <option value="">Select Category</option>
                        {IMAGES.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-black/60">
                    Customer type
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                      <select className="w-full appearance-none rounded-2xl border border-black/10 bg-white py-3 pl-11 pr-9 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#917646]/30">
                        <option value="">Homeowner</option>
                        <option value="builder">Builder</option>
                        <option value="architect">Architect / Designer</option>
                        <option value="contractor">Contractor</option>
                        <option value="dealer">Dealer</option>
                      </select>
                    </div>
                  </label>
                </div>

                <label className="mt-5 flex flex-col gap-2 text-sm text-black/60">
                  Message / Requirement
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-black/40" />
                    <textarea
                      rows={5}
                      placeholder="Enter Message...."
                      className="w-full rounded-2xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#917646]/30"
                    />
                  </div>
                </label>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    <Send className="h-4 w-4" />
                    Submit Now
                  </button>
                  <a
                    href="https://wa.me/919442466631"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="#25D366"
                        d="M12.05 2.02c-5.52 0-10 4.48-10 10 0 1.73.45 3.42 1.31 4.92L2 22l5.22-1.37c1.45.79 3.08 1.2 4.79 1.2 5.52 0 10-4.48 10-10 0-5.52-4.48-10-9.96-10zm5.93 14.54c-.25.7-1.23 1.28-1.93 1.38-.48.08-1.09.12-3.56-.76-3.16-1.11-5.2-4.35-5.36-4.57-.16-.22-1.3-1.74-1.3-3.32 0-1.58.82-2.35 1.11-2.67.29-.32.63-.4.84-.4h.6c.19 0 .44-.07.69.53.25.6.86 2.08.94 2.23.08.16.13.35.02.57-.11.22-.17.35-.33.54-.16.19-.35.42-.5.56-.16.14-.32.3-.14.6.19.3.84 1.38 1.8 2.24 1.24 1.1 2.29 1.44 2.62 1.6.32.16.52.14.71-.08.19-.22.82-.95 1.04-1.28.22-.33.44-.27.74-.16.3.11 1.9.9 2.23 1.06.33.16.55.24.63.37.08.13.08.74-.17 1.44z"
                      />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/50 py-16 px-8 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif text-5xl text-white select-none">ஸ்வஸ்திக் &amp; கம்பனி</span>
            <p className="text-xs mt-1">© 1991–2026 Swastik &amp; Company. All rights reserved.</p>
            <p className="text-[10px] text-white/30 mt-1">Erode Fort, Tamil Nadu, India</p>
          </div>
          <div className="flex gap-6 text-xs text-white/40">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors cursor-pointer">Back to Top</button>
            <span>•</span>
            <a href="tel:+919442466631" className="hover:text-white transition-colors">Call Us</a>
            <span>•</span>
            <a href="https://wa.me/919442466631" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
