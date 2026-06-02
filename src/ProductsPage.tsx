import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from './assets/brands/image.png';
import lockImg from './assets/products/1. lock.webp';
import doorHandleImg from './assets/products/2.Door Handles.webp';
import hingesImg from './assets/products/3.Hinges.webp';
import towerBoltImg from './assets/products/4.Tower bolt.webp';
import plywoodImg from './assets/products/5.Plywood.webp';
import laminatesImg from './assets/products/6.Laminates.webp';
import flushDoorsImg from './assets/products/7.Flush Doors.webp';
import mdfBoardsImg from './assets/products/8.MDF Boards.webp';
import chimneyImg from './assets/products/9.Chimney.webp';
import drawerSystemsImg from './assets/products/10.Drawer Systems.webp';
import drawerChannelsImg from './assets/products/11. drawer channels.webp';
import cabinetAccessoriesImg from './assets/products/12.Cabinet Accessories.webp';
import slidingDoorImg from './assets/products/21.Sliding Door Systems.webp';
import windowSystemsImg from './assets/products/22.Window Systems.webp';
import tracksImg from './assets/products/23.Tracks.webp';
import rollersImg from './assets/products/24. aluminium-roller.webp';

const CATEGORIES = [
  {
    name: 'Door Hardware',
    items: [
      {
        name: 'Locks',
        image: lockImg,
        description: 'Durable and secure locks for homes, offices, commercial spaces',
      },
      {
        name: 'Door Handles',
        image: doorHandleImg,
        description: 'High-quality handles for easy grip, comfort, and everyday use',
      },
      {
        name: 'Hinges',
        image: hingesImg,
        description: 'High-quality hinges built for strength, stability, and seamless use',
      },
      {
        name: 'Tower Bolt',
        image: towerBoltImg,
        description: 'Strong and reliable tower bolts for secure and easy door locking',
      },
    ],
  },
  {
    name: 'Plywood & Boards',
    items: [
      {
        name: 'Plywood',
        image: plywoodImg,
        description: 'Wide range of plywood including marine, and waterproof grades',
      },
      {
        name: 'Laminates',
        image: laminatesImg,
        description: 'High-quality laminates for long-lasting surface design',
      },
      {
        name: 'Flush Doors',
        image: flushDoorsImg,
        description: 'High-quality flush doors for modern interiors and reliable use',
      },
      {
        name: 'MDF Boards',
        image: mdfBoardsImg,
        description: 'High-quality MDF boards for furniture, interiors, detailed work',
      },
    ],
  },
  {
    name: 'Kitchen Fittings',
    items: [
      {
        name: 'Chimney',
        image: chimneyImg,
        description: 'Upgrade your kitchen with elegant chimney design',
      },
      {
        name: 'Drawer Systems',
        image: drawerSystemsImg,
        description: 'High-quality drawer systems and efficient storage solutions',
      },
      {
        name: 'Drawer Channels',
        image: drawerChannelsImg,
        description: 'High-quality channels for stable and easy drawer operation',
      },
      {
        name: 'Cabinet Accessories',
        image: cabinetAccessoriesImg,
        description: 'Practical accessories to organize and maximize cabinet storage',
      },
    ],
  },
  {
    name: 'Sliding & Aluminium Systems',
    items: [
      {
        name: 'Sliding Door Systems',
        image: slidingDoorImg,
        description: 'High-quality sliding systems for easy space-saving door solutions',
      },
      {
        name: 'Window Systems',
        image: windowSystemsImg,
        description: 'Sliding and window systems for residential and commercial use',
      },
      {
        name: 'Tracks',
        image: tracksImg,
        description: 'Wide tracks for sliding doors, windows, and partition systems',
      },
      {
        name: 'Rollers',
        image: rollersImg,
        description: 'High-quality wheels for sliding door smooth and silent operation',
      },
    ],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function ProductsPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);
    const scrollToHash = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Attempt immediately, then again after render in case the element is not yet in DOM.
    scrollToHash();
    const timeout = window.setTimeout(scrollToHash, 100);

    return () => window.clearTimeout(timeout);
  }, [location.hash]);

  return (
    <div className="relative min-h-screen bg-[#F6F1EA] text-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-40 h-[420px] w-[420px] rounded-full bg-[#C8A96B]/15 blur-[120px]"></div>
        <div className="absolute top-1/3 -left-32 h-[360px] w-[360px] rounded-full bg-[#7E8FA5]/20 blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#B56B4E]/10 blur-[120px]"></div>
      </div>

      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center font-serif text-2xl sm:text-3xl tracking-tight text-black select-none hover:opacity-85 transition-opacity"
          >
            <img src={logoImg} alt="Logo" className="h-8 mr-2" />
            Swastik &amp; Company
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-black/70 hover:text-black transition-colors"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-black/50 font-semibold">
              Product Categories
            </span>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-black leading-tight">
              Everything you need for every space
            </h1>
            <p className="mt-4 text-sm sm:text-base text-black/60 max-w-2xl">
              Explore curated categories with trusted products for residential, commercial, and industrial
              requirements.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <a
                  key={category.name}
                  href={`#${slugify(category.name)}`}
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/70 transition-all hover:border-black/30 hover:text-black"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-black/10 bg-white/80 p-8 shadow-sm">
              <div className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                Trusted range
              </div>
              <div className="mt-3 font-serif text-3xl text-black">
                24 essential product lines
              </div>
              <p className="mt-3 text-sm text-black/60">
                From fittings to tools, explore a depth of inventory ready for immediate sourcing.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[#917646]"></div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/60">
                  Updated weekly
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20 flex flex-col gap-14">
        {CATEGORIES.map((category) => (
          <div key={category.name} id={slugify(category.name)}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-black">
                  {category.name}
                </h2>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-black/40">
                  Curated essentials for daily builds
                </div>
              </div>
              <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs uppercase tracking-[0.25em] text-black/50 font-semibold">
                {category.items.length} items
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="product-card group rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-3 hover:shadow-xl"
                >
                  <div className="h-36 flex items-center justify-center rounded-2xl bg-[#FAF7F2] transition-colors duration-300 group-hover:bg-[#F1E7DA]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-lg font-semibold text-black">{item.name}</div>

                    <div className="mt-2 text-xs text-black/55 leading-relaxed">
                      {item.description}
                    </div>
<Link to="/#enquiry" className="mt-4 block inline-flex items-center justify-center rounded-full px-4 py-2 text-base font-semibold uppercase tracking-[0.25em] text-white bg-[#917646] transition-all hover:scale-[1.03] relative z-10">Enquire Now</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProductsPage;
