import React, { useState, useEffect } from 'react';
import { Compass, Heart, Phone, Sparkles, Menu, X, ArrowUpRight, Sun, Moon, Trees, Waves, Mountain } from 'lucide-react';
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

  const navLinks = [
    { label: 'Expeditions', href: '#expeditions' },
    { label: 'Archetypes', href: '#archetypes' },
    { label: 'Regions & Weather', href: '#regions' },
    { label: 'Bespoke Estimator', href: '#planner' },
    { label: 'Guest Chronicles', href: '#reviews' }
  ];

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
          scrolled ? 'py-3 px-3 sm:px-6' : 'py-5 px-4 sm:px-8'
        }`}
      >
        {/* Apple iPhone Liquid Glass Container */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="apple-liquid-glass rounded-full px-4 sm:px-6 py-2.5 w-full flex items-center justify-between gap-3 shadow-2xl">
            {/* Brand Identity */}
            <a href="#" className="flex items-center gap-2.5 group shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-500 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
                  boxShadow: `0 4px 14px ${currentBiome.glow}`
                }}
              >
                <Compass className="w-5 h-5 text-white transform group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-0.5">
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

            {/* Apple Mouse Hover Spotlight Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.08]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="apple-nav-pill px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-200 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Interactive Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Dynamic Nature Biome Selector Pill (shows 5-6s live nature transition) */}
              <button
                onClick={() => setBiomeIndex((prev) => (prev + 1) % biomes.length)}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-semibold transition-all border cursor-pointer apple-nav-pill"
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
                className="p-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-200 hover:text-white transition-all duration-300 apple-nav-pill cursor-pointer"
                aria-label="Toggle Light and Dark Mode"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 transform hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-600 transform hover:-rotate-45 transition-transform duration-500" />
                )}
              </button>

              {/* Currency Selector Pill */}
              <div className="hidden sm:inline-flex items-center bg-black/5 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 rounded-full p-0.5 text-xs font-medium">
                {['INR', 'USD', 'EUR', 'GBP'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                      currency === curr
                        ? 'text-white shadow-sm'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                    style={
                      currency === curr
                        ? { backgroundColor: currentBiome.primary }
                        : {}
                    }
                  >
                    {curr === 'INR' ? '₹' : curr === 'USD' ? '$' : curr === 'EUR' ? '€' : '£'} {curr}
                  </button>
                ))}
              </div>

              {/* Wishlist Saved Expeditions */}
              <button
                onClick={openWishlist}
                className="relative p-2 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-200 apple-nav-pill cursor-pointer"
                aria-label="View Saved Expeditions"
              >
                <Heart
                  className={`w-4 h-4 transition-transform duration-300 active:scale-125 ${
                    wishlistCount > 0 ? 'fill-emerald-400 text-emerald-400' : ''
                  }`}
                  style={wishlistCount > 0 ? { fill: currentBiome.primary, color: currentBiome.primary } : {}}
                />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 text-white text-[9.5px] font-bold rounded-full flex items-center justify-center shadow-md animate-in zoom-in"
                    style={{ backgroundColor: currentBiome.primary }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* "Call Us" Button (Replaces raw phone number as requested) */}
              <a
                href="tel:+919918001088"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/[0.06] text-zinc-800 dark:text-zinc-200 apple-nav-pill hover:border-emerald-400/40"
                title="Speak directly with Senior Travel Concierge"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Us</span>
              </a>

              {/* Primary Kinetic CTA */}
              <button
                onClick={openCustomPlanner}
                className="hidden md:inline-flex items-center gap-2 pl-4 pr-1.5 py-1 rounded-full text-white text-xs font-bold transition-all duration-300 shadow-md cursor-pointer hover:brightness-105 active:scale-95 group"
                style={{
                  background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
                  boxShadow: `0 4px 14px ${currentBiome.glow}`
                }}
              >
                <span>Plan Odyssey</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full border border-black/10 dark:border-white/10 text-zinc-800 dark:text-white"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Liquid Glass Morphism */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-[#060810]/95 backdrop-blur-3xl lg:hidden pt-24 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-300">
          <div className="flex flex-col gap-5">
            {/* Top theme and currency switcher */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Appearance</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 text-xs font-semibold"
                >
                  {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-600" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Currency</span>
              <div className="flex gap-1.5">
                {['INR', 'USD', 'EUR', 'GBP'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
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

            <nav className="flex flex-col gap-3 text-lg font-medium text-zinc-800 dark:text-zinc-200">
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

          <div className="flex flex-col gap-3 pt-6 border-t border-black/10 dark:border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCustomPlanner();
              }}
              className="w-full py-3.5 rounded-full text-center text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tailor-Made Journey</span>
            </button>
            <a
              href="tel:+919918001088"
              className="w-full py-3 rounded-full text-center text-sm font-semibold border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/[0.06] flex items-center justify-center gap-2"
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
