import React, { useState, useEffect, useRef } from 'react';
import { Compass, Heart, Phone, Sparkles, Menu, X, ArrowUpRight, Sun, Moon, Trees, Waves, Mountain, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({
  currency,
  setCurrency,
  wishlistCount,
  openWishlist,
  openCustomPlanner
}) {
  const { theme, toggleTheme, currentBiome, biomes, setBiomeIndex } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const currencyMenuRef = useRef(null);
  const navPillRef = useRef(null);
  const navContainerRef = useRef(null);
  const [glidingPill, setGlidingPill] = useState({ left: 0, width: 0, opacity: 0 });

  const handleLinkEnter = (e) => {
    const el = e.currentTarget;
    if (!el || !navContainerRef.current) return;
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setGlidingPill({
      left: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1
    });
  };

  const handleNavLeave = () => {
    setGlidingPill((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleNavMouseMove = (e) => {
    if (!navPillRef.current) return;
    const rect = navPillRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    navPillRef.current.style.setProperty('--mouse-x', `${x}px`);
    navPillRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 25);
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close currency dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
        setCurrencyMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Expeditions', href: '#expeditions' },
    { label: 'Archetypes', href: '#archetypes' },
    { label: 'Regions & Weather', href: '#regions' },
    { label: 'Bespoke Estimator', href: '#planner' },
    { label: 'Guest Chronicles', href: '#reviews' }
  ];

  const getCurrencySymbol = (curr) => {
    if (curr === 'USD') return '$';
    if (curr === 'EUR') return '€';
    if (curr === 'GBP') return '£';
    return '₹';
  };

  return (
    <>
      {/* Top Reading Progress Bar connected to dynamic Nature Color */}
      <div
        className="fixed top-0 left-0 h-[2.5px] z-[60] transition-all duration-300 ease-out shadow-sm"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, ${currentBiome.primary}, ${currentBiome.secondary})`,
          boxShadow: `0 0 10px ${currentBiome.glow}`
        }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled ? 'py-2 px-2.5 sm:px-6' : 'py-3 sm:py-4 px-3 sm:px-8'
        }`}
      >
        {/* Apple iPhone / visionOS Liquid Glass Container */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div
            ref={navPillRef}
            onMouseMove={handleNavMouseMove}
            className="apple-liquid-glass rounded-full pl-3.5 sm:pl-7 lg:pl-8 pr-2.5 sm:pr-7 lg:pr-8 py-1.5 sm:py-2 w-full flex items-center justify-between gap-1.5 sm:gap-4 shadow-2xl relative"
          >
            {/* Brand Identity */}
            <a href="#" className="flex items-center gap-2 group shrink-0 pl-0.5">
              <div
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
                  boxShadow: `0 4px 14px ${currentBiome.glow}`
                }}
              >
                <Compass className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white transform group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight flex items-center gap-0.5">
                  <span className="text-foreground">Yatra</span>
                  <span
                    className="transition-colors duration-1000"
                    style={{ color: currentBiome.primary }}
                  >
                    Vista
                  </span>
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-400 font-medium hidden sm:inline">
                  Nature Ateliers
                </span>
              </div>
            </a>

            {/* Apple Liquid Morphing Sliding Navigation Links */}
            <nav
              ref={navContainerRef}
              onMouseLeave={handleNavLeave}
              className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.08] backdrop-blur-md relative"
            >
              {/* Sticky Liquid Sliding Capsule Indicator */}
              <div
                className="absolute top-1 bottom-1 rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  left: `${glidingPill.left}px`,
                  width: `${glidingPill.width}px`,
                  opacity: glidingPill.opacity,
                  background:
                    theme === 'dark'
                      ? 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.10) 100%)'
                      : 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.80) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(0, 0, 0, 0.10)',
                  boxShadow:
                    theme === 'dark'
                      ? `0 6px 20px -2px rgba(0,0,0,0.4), inset 0 1.5px 1.5px rgba(255,255,255,0.65), 0 0 16px ${currentBiome.glow}`
                      : '0 6px 18px -2px rgba(0,0,0,0.08), inset 0 1.5px 1.5px rgba(255,255,255,1)',
                  transform: glidingPill.opacity ? 'scale(1)' : 'scale(0.95)'
                }}
              />

              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={handleLinkEnter}
                  className="relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Interactive Controls - Adapts smoothly for 320px to 4K displays */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 pr-0.5 sm:pr-2">
              {/* Dynamic Nature Biome Selector Pill */}
              <button
                onClick={() => setBiomeIndex((prev) => (prev + 1) % biomes.length)}
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border cursor-pointer apple-nav-pill"
                style={{
                  backgroundColor: currentBiome.soft,
                  borderColor: currentBiome.border,
                  color: currentBiome.primary
                }}
                title="Cycles nature biomes every 5-6 seconds. Click to advance manually!"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-ping"
                  style={{ backgroundColor: currentBiome.primary }}
                />
                <span className="capitalize">{currentBiome.name.split(' ')[0]} Nature</span>
              </button>

              {/* Light / Dark Mode Toggle Button (Apple Glass) */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-all duration-300 apple-nav-pill cursor-pointer"
                aria-label="Toggle Light and Dark Mode"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 transform hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 transform hover:-rotate-45 transition-transform duration-500" />
                )}
              </button>

              {/* Sleek Apple Liquid Glass Currency Dropdown (Visible on Tablet & Desktop; on mobile accessible directly in drawer) */}
              <div className="relative hidden sm:block" ref={currencyMenuRef}>
                <button
                  type="button"
                  onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                  className="apple-nav-pill flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-200 border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] cursor-pointer"
                  title="Change Currency"
                >
                  <span className="font-bold" style={{ color: currentBiome.primary }}>
                    {getCurrencySymbol(currency)}
                  </span>
                  <span>{currency}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 opacity-60 ${currencyMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {currencyMenuOpen && (
                  <div className="liquid-glass-dropdown absolute right-0 mt-2 py-1.5 px-1 rounded-2xl w-36 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                    {[
                      { code: 'INR', symbol: '₹', label: 'INR (₹)' },
                      { code: 'USD', symbol: '$', label: 'USD ($)' },
                      { code: 'EUR', symbol: '€', label: 'EUR (€)' },
                      { code: 'GBP', symbol: '£', label: 'GBP (£)' }
                    ].map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setCurrency(item.code);
                          setCurrencyMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                          currency === item.code
                            ? 'text-white font-bold'
                            : 'text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10'
                        }`}
                        style={currency === item.code ? { backgroundColor: currentBiome.primary } : {}}
                      >
                        <span>{item.label}</span>
                        {currency === item.code && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Wishlist Saved Expeditions */}
              <button
                onClick={openWishlist}
                className="relative p-1.5 sm:p-2 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white apple-nav-pill cursor-pointer"
                aria-label="View Saved Expeditions"
              >
                <Heart
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 active:scale-125 ${
                    wishlistCount > 0 ? 'fill-emerald-400 text-emerald-400' : ''
                  }`}
                  style={wishlistCount > 0 ? { fill: currentBiome.primary, color: currentBiome.primary } : {}}
                />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md animate-in zoom-in"
                    style={{ backgroundColor: currentBiome.primary }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* "Call Us" Button: Displayed on 2xl to preserve maximum room on laptops */}
              <a
                href="tel:+919918001088"
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-200 apple-nav-pill hover:border-emerald-400/40"
                title="Speak directly with Senior Travel Concierge"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Us</span>
              </a>

              {/* Primary Kinetic CTA: Comfortably nestled INSIDE menubar on tablets & desktop */}
              <button
                onClick={openCustomPlanner}
                className="apple-cta-liquid relative hidden sm:inline-flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer group shrink-0 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
                  boxShadow: `0 4px 16px ${currentBiome.glow}, inset 0 1px 1.5px rgba(255, 255, 255, 0.45)`
                }}
              >
                {/* Continuous Fluid Liquid Sheen Sweep */}
                <span className="absolute inset-0 -translate-x-full liquid-sheen-sweep bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                <span className="whitespace-nowrap font-bold tracking-wide">Plan Odyssey</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 dark:bg-white/20 flex items-center justify-center group-hover:rotate-45 group-hover:scale-110 group-hover:bg-white/35 transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </span>
              </button>

              {/* Mobile Drawer Trigger with comfortable touch area */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-full border border-black/10 dark:border-white/10 text-zinc-800 dark:text-white cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Liquid Glass Morphism and smooth scrollable viewport */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 dark:bg-[#060810]/98 backdrop-blur-3xl lg:hidden pt-20 px-5 sm:px-8 pb-6 flex flex-col justify-between overflow-y-auto max-h-[100dvh] animate-in fade-in duration-300">
          <div className="flex flex-col gap-4">
            {/* Top theme and currency switcher */}
            <div className="flex items-center justify-between pb-3.5 border-b border-black/10 dark:border-white/10">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Appearance</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 text-xs font-semibold cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-600" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-black/10 dark:border-white/10">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Currency</span>
              <div className="flex gap-1.5 flex-wrap">
                {['INR', 'USD', 'EUR', 'GBP'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currency === curr
                        ? 'text-white'
                        : 'bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300'
                    }`}
                    style={currency === curr ? { backgroundColor: currentBiome.primary } : {}}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex flex-col gap-1 text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-200">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-black/5 dark:border-white/[0.06] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-5 mt-4 border-t border-black/10 dark:border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCustomPlanner();
              }}
              className="w-full py-3.5 rounded-full text-center text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tailor-Made Journey</span>
            </button>
            <a
              href="tel:+919918001088"
              className="w-full py-3 rounded-full text-center text-xs sm:text-sm font-semibold border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/[0.06] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Us: +91 99180 01088</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
