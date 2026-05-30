import { useEffect, useState } from 'react';
import showroomImg from './assets/showroom.png';
import './App.css';

// SVG Category Icons
const DoorHardwareIcon = () => (
  <svg className="w-8 h-8 text-[#000000]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5M3 9h18M3 15h18M5.25 5.25A2.25 2.25 0 0 1 7.5 3h9a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-9a2.25 2.25 0 0 1-2.25-2.25V5.25Z" />
  </svg>
);

const PlywoodIcon = () => (
  <svg className="w-8 h-8 text-[#000000]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v16.5M20.25 3v16.5M3.75 5.25h16.5M3.75 9.75h16.5M3.75 14.25h16.5M3.75 18.75h16.5" />
  </svg>
);

const KitchenIcon = () => (
  <svg className="w-8 h-8 text-[#000000]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6ZM3.75 12h16.5M12 3.75v16.5" />
  </svg>
);

const BathroomIcon = () => (
  <svg className="w-8 h-8 text-[#000000]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25a3 3 0 0 0-3-3h-9a3 3 0 0 0-3 3v6.75c0 3.722 2.766 6.8 6.375 7.427V21.75h1.5v-2.323c3.609-.627 6.375-3.705 6.375-7.427V5.25ZM9 8.25h6" />
  </svg>
);

const ToolsIcon = () => (
  <svg className="w-8 h-8 text-[#000000]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.83-5.83m0 0a2.999 2.999 0 0 0-4.14-4.14m4.14 4.14L12 11.42M14.438 7.078a2.121 2.121 0 1 1 3 3m-9.563-3a2.121 2.121 0 1 0-3 3M7.5 7.5l-5.83 5.83A2.652 2.652 0 0 0 5.42 17.25l5.83-5.83m0 0a2.999 2.999 0 0 0 4.14-4.14" />
  </svg>
);

const SlidingIcon = () => (
  <svg className="w-8 h-8 text-[#000000]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h3a2.25 2.25 0 0 1 2.25 2.25V9M3 9h18M3 15h18M3 9v9a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V9" />
  </svg>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0);

  // Quote Form State
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Elegant fade in of showroom background on mount
    const timer = setTimeout(() => setBgOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', message: '' });
      }, 5000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* 1. HERO & BACKGROUND LAYER CONTAINER */}
      <div id="home" className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background showroom layer (z-0) with Ken Burns motion */}
        <div 
          className="absolute z-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none transition-opacity duration-[1500ms]" 
          style={{ top: '300px', inset: 'auto 0 0 0', opacity: bgOpacity }}
        >
          <img
            src={showroomImg}
            alt="Swastik & Company Hardware Showroom"
            className="w-full h-full object-cover animate-ken-burns"
          />
          {/* White tint overlay to soften the image details and increase contrast for text */}
          <div className="absolute inset-0 bg-white/45 pointer-events-none"></div>
          {/* Gradient overlays positioned over the image to blend top header and keep bottom clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 via-white/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Navigation Bar (z-10) */}
        <header className="relative z-20">
          <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
              className="font-serif text-3xl tracking-tight text-[#000000] select-none hover:opacity-85 transition-opacity"
            >
              Swastik & Co.<sup className="text-xs font-sans align-super ml-0.5 select-none text-[#6F6F6F]">®</sup>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-sm font-medium text-[#000000] hover:opacity-75 transition-opacity cursor-pointer">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors cursor-pointer">
                About Us
              </button>
              <button onClick={() => scrollToSection('products')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors cursor-pointer">
                Our Products
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors cursor-pointer">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000] transition-colors cursor-pointer">
                Contact Us
              </button>
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
              <button onClick={() => scrollToSection('products')} className="text-left text-base font-medium text-[#6F6F6F] hover:text-[#000000] py-2 border-b border-black/5">
                Our Products
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-left text-base font-medium text-[#6F6F6F] hover:text-[#000000] py-2 border-b border-black/5">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-base font-medium text-[#6F6F6F] hover:text-[#000000] py-2">
                Contact Us
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
          style={{ paddingTop: 'calc(8rem - 75px)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center animate-fade-rise">
            {/* Headline */}
            <h1 className="font-serif font-normal text-5xl sm:text-7xl md:text-8xl text-[#111111] leading-[0.95] tracking-[-2.46px]">
              All Your <span className="italic text-[#917646]">Hardware Needs</span> in One <span className="italic text-[#917646]">Place.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#333333] max-w-2xl mt-8 leading-relaxed">
              Trusted Hardware, Plywood, Laminates, Kitchen &amp; Industrial Solutions Since 1991. Erode's landmark destination for builders and homeowners.
            </p>

            {/* Highlights Bar */}
            <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-4xl px-4">
              {['30+ Years Experience', '250+ Happy Clients', '5000+ Products Available', 'Wholesale & Retail'].map((hl, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#333333] bg-black/[0.02] border border-black/10 hover:border-black/20 transition-all duration-300 select-none"
                >
                  {hl}
                </span>
              ))}
            </div>

            {/* Hero CTA Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="rounded-full px-14 py-5 text-base font-medium bg-[#000000] text-white hover:scale-[1.03] transition-transform duration-300 ease-out active:scale-[0.98] mt-12 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 cursor-pointer"
            >
              Get a Quote Today
            </button>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-10 w-full flex justify-center pb-6">
          <button 
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-[#6F6F6F] hover:text-black transition-colors group cursor-pointer"
            aria-label="Scroll down"
          >
            <span className="text-xs uppercase tracking-widest font-semibold select-none mb-1 opacity-60 group-hover:opacity-100 transition-opacity">Discover More</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. COMPANY OVERVIEW SECTION */}
      <section id="about" className="relative z-10 bg-white border-t border-black/5 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">ESTABLISHED 1991</span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#000000] leading-tight tracking-tight mt-4">
                30+ Years of Crafting Trusted Partnerships
              </h2>
              <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed mt-8">
                Swastik &amp; Company is a trusted hardware and building materials supplier based in Erode, Tamil Nadu. Established in 1991, we have been serving homeowners, contractors, architects, builders, dealers, and interior designers for more than three decades.
              </p>
              <p className="text-base sm:text-lg text-[#6F6F6F] leading-relaxed mt-4">
                We specialize in hardware solutions, plywood, laminates, modular kitchen fittings, bathroom fixtures, industrial tools, and architectural aluminium systems. With a massive catalog of over 5,000 products, we provide both retail and bulk wholesale supply solutions.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-black/[0.02] border border-black/5">
                <h3 className="font-serif text-2xl font-semibold text-black">Our Vision</h3>
                <p className="text-[#6F6F6F] mt-3 leading-relaxed">
                  To become the most trusted and preferred hardware and plywood partner in Tamil Nadu, recognized for our extensive collection and unwavering commitment to quality.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-black/[0.02] border border-black/5">
                <h3 className="font-serif text-2xl font-semibold text-black">Our Mission</h3>
                <p className="text-[#6F6F6F] mt-3 leading-relaxed">
                  To provide top-tier, long-lasting hardware products, excellent personal service, and exceptional value to every customer and project we support.
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { val: '30+', label: 'Years of Experience', desc: 'Serving builders and homeowners since 1991' },
              { val: '250+', label: 'Happy Professional Clients', desc: 'Repeat builders, contractors, and interior teams' },
              { val: '5000+', label: 'Products Available', desc: 'Massive inventory under one convenient roof' },
            ].map((stat, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-black/5 text-center bg-white hover:shadow-md transition-shadow duration-300">
                <div className="font-serif text-5xl font-normal text-black">{stat.val}</div>
                <div className="text-sm font-semibold uppercase tracking-wider text-black mt-2">{stat.label}</div>
                <div className="text-xs text-[#6F6F6F] mt-2 leading-relaxed">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCTS & OFFERINGS SECTION */}
      <section id="products" className="relative z-10 bg-black/[0.01] border-t border-black/5 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">OUR SPECIALTIES</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#000000] mt-4">
              What Swastik &amp; Company Offers
            </h2>
            <p className="text-base text-[#6F6F6F] mt-4">
              Explore our comprehensive range of high-quality materials and fixtures selected for durability and premium aesthetics.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Door Hardware',
                icon: <DoorHardwareIcon />,
                items: ['Designer Locks & Smart Handles', 'Premium Pull Handles', 'Durable Hinges & Stays', 'Security & Safe Fittings', 'Architectural Brass Hardware'],
              },
              {
                title: 'Plywood & Laminates',
                icon: <PlywoodIcon />,
                items: ['Waterproof Premium Plywood', 'Decorative Luxury Laminates', 'MDF & HDF Boards', 'Particle & Prelam Boards', 'Aesthetic Interior Wall Panels'],
              },
              {
                title: 'Modular Kitchen Fittings',
                icon: <KitchenIcon />,
                items: ['Stainless Steel Kitchen Accessories', 'Smart Cabinet Storage Systems', 'Corner Cabinet Drawer Hardware', 'Tandem Drawers & Runners', 'Functional Pantry Shelves'],
              },
              {
                title: 'Bathroom & Glass Fittings',
                icon: <BathroomIcon />,
                items: ['Bathroom Fixtures & Accessories', 'Glass Door Locks & Hinges', 'Premium Shower Enclosure Fittings', 'Modern Sanitary Hardware'],
              },
              {
                title: 'Tools & Industrial Hardware',
                icon: <ToolsIcon />,
                items: ['Professional Power Tools', 'Hand Tools & Toolsets', 'Heavy-Duty Hardware Fittings', 'Industrial Bolts & Fasteners'],
              },
              {
                title: 'Sliding & Aluminium Systems',
                icon: <SlidingIcon />,
                items: ['Sliding Door Roller Systems', 'Aluminium Profiles & Gaskets', 'Wardrobe Sliding Track Solutions', 'Architectural Aluminium Fittings'],
              },
            ].map((prod, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-white border border-black/5 hover:border-black/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-black/[0.03] w-fit rounded-xl mb-6">
                    {prod.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-black mb-4">{prod.title}</h3>
                  <ul className="space-y-2.5">
                    {prod.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-sm text-[#6F6F6F] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-black font-semibold">Available in Store</span>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, message: `Hello, I'm interested in ${prod.title} products.` }));
                      scrollToSection('contact');
                    }}
                    className="text-xs text-[#6F6F6F] hover:text-black underline cursor-pointer"
                  >
                    Inquire Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US & WHO WE SERVE SECTION */}
      <section className="relative z-10 bg-white border-t border-black/5 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Why Choose Us */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">OUR EDGE</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#000000] mt-4 mb-8">
                Why Choose Swastik &amp; Company
              </h2>
              <div className="space-y-6">
                {[
                  { title: '30+ Years of Professional Heritage', desc: 'Serving clients in Erode with reliable, professional expertise since 1991.' },
                  { title: 'Wholesale & Retail Solutions', desc: 'Best competitive bulk pricing for commercial projects and detailed retail attention for home projects.' },
                  { title: 'Over 5,000 Products in Catalog', desc: 'Providing an enormous catalog containing everything from structural screws to luxury door handles.' },
                  { title: 'Trusted Quality & Durability', desc: 'We only partner with top-tier, reliable manufacturing brands for guaranteed long-term performance.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold mt-1">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-lg">{item.title}</h4>
                      <p className="text-[#6F6F6F] text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who We Serve */}
            <div className="flex flex-col justify-center bg-black/[0.01] border border-black/5 p-8 sm:p-12 rounded-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">OUR CLIENTS</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-black mt-4 mb-6">
                Who We Partner With
              </h2>
              <p className="text-sm text-[#6F6F6F] leading-relaxed mb-8">
                We supply materials to a diverse network of trade professionals and private individuals. No project is too large or too specific for our team.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Homeowners', 'Contractors', 'Builders', 'Architects', 
                  'Local Dealers', 'Interior Designers', 'Commercial Projects', 'Industrial Projects'
                ].map((client, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white border border-black/5 rounded-xl text-sm font-medium">
                    <svg className="w-4 h-4 text-black flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {client}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section id="testimonials" className="relative z-10 bg-black/[0.01] border-t border-black/5 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">CLIENT VOICES</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#000000] mt-4">
              Trusted by Hundreds in Tamil Nadu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Got kitchen and wardrobe fittings in one place with reasonable pricing. Highly satisfied with the staff guidance.",
                author: "Priya S.",
                role: "Homeowner, Erode"
              },
              {
                quote: "Purchased premium door fittings and waterproof plywood. Excellent product quality and very helpful customer staff.",
                author: "Ramesh Kumar",
                role: "Architect, Coimbatore"
              },
              {
                quote: "Consistent product quality and quick deliveries for all our residential projects. Highly recommend Swastik for builders.",
                author: "Arun Builders",
                role: "Contractor, Erode"
              }
            ].map((t, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white border border-black/5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <p className="text-sm sm:text-base italic text-[#6F6F6F] leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-8 pt-6 border-t border-black/5">
                  <div className="font-serif text-lg font-bold text-black">{t.author}</div>
                  <div className="text-xs text-[#6F6F6F] uppercase tracking-wider mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT & FORM SECTION */}
      <section id="contact" className="relative z-10 bg-white border-t border-black/5 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact details */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#6F6F6F]">GET IN TOUCH</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#000000] mt-4 mb-8">
                Visit Swastik &amp; Company
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-1">Our Showroom Address</h4>
                  <p className="text-black leading-relaxed">
                    102, Nehru Street,<br />
                    Erode Fort, Erode,<br />
                    Tamil Nadu – 638001
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Swastik+and+Company+102+Nehru+Street+Erode" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-black underline font-semibold mt-2 hover:opacity-75 transition-opacity"
                  >
                    <span>View on Google Maps</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-1">Call Us Directly</h4>
                    <a href="tel:+919442466631" className="text-black font-semibold text-lg hover:underline">
                      +91 94424 66631
                    </a>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-1">Email Queries</h4>
                    <a href="mailto:swastikandco@gmail.com" className="text-black font-semibold text-lg hover:underline break-words">
                      swastikandco@gmail.com
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-2">Business Operating Hours</h4>
                  <div className="p-4 bg-black/[0.02] border border-black/5 rounded-xl max-w-sm">
                    <div className="flex justify-between text-sm py-1">
                      <span className="font-semibold text-black">Monday – Sunday</span>
                      <span className="text-[#6F6F6F]">10:00 AM – 09:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Quote Request Form */}
            <div className="bg-black/[0.01] border border-black/5 p-8 sm:p-12 rounded-3xl">
              <h3 className="font-serif text-3xl text-black mb-2">Request a Quote</h3>
              <p className="text-[#6F6F6F] text-sm mb-8">
                Send us your requirements or material list, and our specialists will generate a quote for you.
              </p>

              {isSubmitted ? (
                <div className="bg-black text-white p-6 rounded-2xl text-center animate-fade-rise">
                  <svg className="w-12 h-12 mx-auto text-white mb-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h4 className="font-serif text-xl font-bold mb-2">Quote Request Sent!</h4>
                  <p className="text-xs opacity-80 leading-relaxed">
                    Thank you, {formData.name}. Our expert team will review your query and contact you at {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white border border-black/10 focus:border-black/40 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-white border border-black/10 focus:border-black/40 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#6F6F6F] mb-2">Requirements / Message</label>
                    <textarea 
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-white border border-black/10 focus:border-black/40 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                      placeholder="Specify product types, quantities, or general inquiries"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-black text-white rounded-full py-4 text-sm font-semibold hover:scale-[1.01] active:scale-[0.99] transition-transform duration-200 cursor-pointer"
                  >
                    Submit Quote Query
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/50 py-12 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-serif text-2xl text-white select-none">Swastik &amp; Co.</span>
            <p className="text-xs mt-1">© 1991–2026 Swastik &amp; Company. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xs text-white/40">
            <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Back to Top</button>
            <span>•</span>
            <a href="https://wa.me/919442466631" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
