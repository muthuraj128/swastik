import { useEffect, useRef, useState } from 'react';
import facadeImg from './assets/facade.jpg';
import './App.css';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);

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

  // IntersectionObserver for scroll-driven animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    const target = document.getElementById('about');
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
        console.error("Video loop restart failed:", err);
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
              className={`lg:col-span-5 lg:row-span-2 bento-card bento-card-lift overflow-hidden flex flex-col justify-between group min-h-[400px] md:min-h-[460px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
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
                <div className="text-[9px] tracking-widest text-[#917646] uppercase font-bold">ஸ்வஸ்திக் &amp; கம்பனி</div>
                <h4 className="font-serif text-base font-bold text-black mt-0.5">Swastik &amp; Company</h4>
                <p className="text-xs text-black/50 mt-1 leading-relaxed">
                  102, Nehru Street, Erode Fort, Tamil Nadu - 638001
                </p>
                <div className="mt-3 pt-3 border-t border-black/5 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider text-black/40 font-bold">Erode HQ 📍</span>
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
              className={`lg:col-span-7 bento-card bento-card-lift p-6 md:p-8 flex flex-col justify-between min-h-[200px] md:min-h-[220px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
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
              className={`lg:col-span-3 bento-card bento-card-lift p-6 flex flex-col justify-between min-h-[200px] md:min-h-[220px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
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
              className={`lg:col-span-4 bento-card bento-card-lift p-6 flex flex-col justify-between min-h-[200px] md:min-h-[220px] transition-all duration-[900ms] cubic-bezier(0.16, 1, 0.3, 1) transform ${
                isAboutVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
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
