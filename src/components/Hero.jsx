import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, Users, MapPin, Sparkles, ArrowUpRight, ShieldCheck, Star, Compass, Flame, Waves, Mountain, Trees } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ onSearchSubmit, openCustomPlanner }) {
  const { currentBiome, theme } = useTheme();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState('All');

  const tabsContainerRef = useRef(null);
  const [glidingTab, setGlidingTab] = useState({ left: 0, width: 0, opacity: 0 });

  const updateTabIndicator = (target) => {
    if (!target || !tabsContainerRef.current) return;
    const containerRect = tabsContainerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setGlidingTab({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      opacity: 1
    });
  };

  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeEl = tabsContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        updateTabIndicator(activeEl);
      }
    }
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({
      search: selectedDestination,
      category: activeTab !== 'All' ? activeTab : selectedCategory,
      month: selectedMonth,
      travelers
    });
    const el = document.getElementById('expeditions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { label: 'All Expeditions', value: 'All' },
    { label: 'Himalayan Heli-Yatra', value: 'Spiritual' },
    { label: 'Royal Palaces', value: 'Royal Heritage' },
    { label: 'Alpine Treks', value: 'Himalayan Treks' },
    { label: 'Ayurveda & Lagoons', value: 'Wellness & Luxury' }
  ];

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden">
      {/* Background Imagery with cinematic dynamic nature atmosphere */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
          alt="Majestic mountains, lush forests and pristine waters of India"
          className="w-full h-full object-cover object-center animate-kenburns scale-105 filter brightness-[0.78] dark:brightness-[0.52] contrast-[1.08] transition-all duration-700"
        />
        {/* Dynamic theme-aware atmospheric overlay allowing liquid glass navbar transparency */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/55 to-[#F6F8FC] dark:from-transparent dark:via-[#060810]/65 dark:to-[#060810] transition-colors duration-500" />
        
        {/* Glowing Prismatic Aurora directly behind the floating liquid glass menubar */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-36 rounded-full blur-[90px] transition-all duration-[3000ms] opacity-65 dark:opacity-45 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${currentBiome.primary} 30%, ${currentBiome.secondary} 70%, transparent 100%)`
          }}
        />

        {/* Organic Nature Glow Orbs refracting through liquid glass menubar */}
        <div
          className="absolute -top-20 left-1/4 w-[650px] h-[350px] rounded-full blur-[130px] transition-all duration-[3000ms] opacity-35 dark:opacity-45 pointer-events-none"
          style={{ backgroundColor: currentBiome.primary }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[160px] transition-all duration-[3000ms] opacity-20 dark:opacity-30 pointer-events-none"
          style={{ backgroundColor: currentBiome.secondary }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center relative z-10">
        {/* Eyebrow Micro-Badge with dynamic nature pulse */}
        <div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/80 dark:bg-white/[0.06] backdrop-blur-md mb-4 sm:mb-6 border transition-all duration-1000 shadow-md max-w-full truncate"
          style={{
            borderColor: currentBiome.border,
            boxShadow: `0 0 24px ${currentBiome.soft}`
          }}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: currentBiome.primary }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: currentBiome.primary }}
            />
          </span>
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-zinc-800 dark:text-white/90 truncate">
            Living Nature: {currentBiome.name} · {currentBiome.tag}
          </span>
        </div>

        {/* 2-Line High-Impact Display Headline */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.12] sm:leading-[1.08] text-balance">
            Grand Expeditions & Sacred Odysseys Across{' '}
            <span
              className="inline-block transition-all duration-[2500ms] pb-1"
              style={{
                backgroundImage: theme === 'dark'
                  ? `linear-gradient(135deg, #FFFFFF 10%, ${currentBiome.primary} 65%, ${currentBiome.secondary} 100%)`
                  : `linear-gradient(135deg, #047857 0%, ${currentBiome.primary} 55%, #0284C7 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Incredible India
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="mt-3 sm:mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed text-pretty">
          From chartered Himalayan helicopter pilgrimages to Rajasthan palace citadels and Kerala backwater sanctuaries, handcrafted for the discerning explorer.
        </p>

        {/* Action CTAs: Full-width stacked on mobile, inline-flex on tablet/desktop */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none">
          <a
            href="#expeditions"
            className="pl-6 sm:pl-7 pr-2 py-2.5 sm:py-2 rounded-full text-white font-bold text-xs sm:text-sm flex items-center justify-between sm:justify-start gap-3 group transition-all duration-500 shadow-xl cursor-pointer hover:brightness-110 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
              boxShadow: `0 4px 20px ${currentBiome.glow}`
            }}
          >
            <span>Explore Curated Expeditions</span>
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </span>
          </a>
          <button
            onClick={openCustomPlanner}
            className="px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/[0.06] text-zinc-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
          >
            <Sparkles
              className="w-4 h-4 transition-colors duration-1000 shrink-0"
              style={{ color: currentBiome.primary }}
            />
            <span>Design Bespoke Odyssey</span>
          </button>
        </div>

        {/* Floating Verified Trust Stats */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-6 text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
            <span>100% Authorized Priority Darshan</span>
          </span>
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span>4.98/5 Rating by 9,800+ Explorers</span>
          </span>
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-black/10 dark:border-white/10 shadow-sm">
            <Compass
              className="w-3.5 h-3.5 transition-colors duration-1000 shrink-0"
              style={{ color: currentBiome.primary }}
            />
            <span>Pan-India Aviation & Luxury Fleet</span>
          </span>
        </div>

        {/* Interactive Search Dock with Apple Liquid Glass / Double-Bezel Architecture */}
        <div className="mt-8 sm:mt-10 w-full max-w-4xl double-bezel text-left">
          <div className="double-bezel-inner p-3.5 sm:p-5">
            {/* Quick Travel Style Tabs with Sticky Apple Liquid Morphing Pill */}
            <div
              ref={tabsContainerRef}
              className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-black/10 dark:border-white/10 no-scrollbar touch-pan-x -mx-1 px-1 relative"
            >
              {/* Gliding Liquid Glass Pill Indicator */}
              <div
                className="absolute top-0 bottom-3 rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  left: `${glidingTab.left}px`,
                  width: `${glidingTab.width}px`,
                  opacity: glidingTab.opacity,
                  background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
                  boxShadow: `0 4px 14px ${currentBiome.glow}, inset 0 1px 1.5px rgba(255, 255, 255, 0.45)`
                }}
              />

              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  data-active={activeTab === tab.value}
                  onClick={(e) => {
                    setActiveTab(tab.value);
                    if (tab.value !== 'All') setSelectedCategory(tab.value);
                    updateTabIndicator(e.currentTarget);
                  }}
                  className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    activeTab === tab.value
                      ? 'text-white'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Fields Form */}
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 items-center"
            >
              {/* Destination Selector */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-colors">
                <MapPin
                  className="w-4 h-4 shrink-0 transition-colors duration-1000"
                  style={{ color: currentBiome.primary }}
                />
                <div className="w-full">
                  <span className="block text-[9.5px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                    Destination
                  </span>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-100 outline-none cursor-pointer"
                  >
                    <option value="" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">All Subcontinent</option>
                    <option value="Uttarakhand" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Uttarakhand (Char Dham)</option>
                    <option value="Ladakh" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Ladakh (Zanskar & Chadar)</option>
                    <option value="Rajasthan" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Rajasthan (Palaces & Desert)</option>
                    <option value="Kerala" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Kerala (Ayurveda & Lagoons)</option>
                    <option value="Meghalaya" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Meghalaya (Rainforest Bridges)</option>
                    <option value="Kashmir" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Kashmir (Gulmarg & Dal)</option>
                    <option value="Varanasi" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Varanasi (Ganga & Kashi)</option>
                  </select>
                </div>
              </div>

              {/* Theme/Category Selector */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-colors">
                <Sparkles
                  className="w-4 h-4 shrink-0 transition-colors duration-1000"
                  style={{ color: currentBiome.secondary }}
                />
                <div className="w-full">
                  <span className="block text-[9.5px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                    Expedition Style
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setActiveTab(e.target.value || 'All');
                    }}
                    className="w-full bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-100 outline-none cursor-pointer"
                  >
                    <option value="" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">All Styles</option>
                    <option value="Spiritual" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Spiritual & Jyotirlinga</option>
                    <option value="Himalayan Treks" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Himalayan Alpine Expeditions</option>
                    <option value="Royal Heritage" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Royal Heritage & Palaces</option>
                    <option value="Wellness & Luxury" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Wellness & Ayurveda</option>
                    <option value="Eco-Culture" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Rainforests & Botanical</option>
                  </select>
                </div>
              </div>

              {/* Travel Season / Month */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-colors">
                <Calendar
                  className="w-4 h-4 shrink-0 transition-colors duration-1000"
                  style={{ color: currentBiome.primary }}
                />
                <div className="w-full">
                  <span className="block text-[9.5px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                    Departure Season
                  </span>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-zinc-800 dark:text-zinc-100 outline-none cursor-pointer"
                  >
                    <option value="" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Flexible Season</option>
                    <option value="Summer" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Summer (May – June)</option>
                    <option value="Monsoon" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Monsoon (July – Aug)</option>
                    <option value="Autumn" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Autumn (Sept – Nov)</option>
                    <option value="Winter" className="bg-white text-zinc-800 dark:bg-[#0B101D] dark:text-white">Winter (Dec – Feb)</option>
                  </select>
                </div>
              </div>

              {/* Submit Search Button */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md hover:brightness-110 active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
                    boxShadow: `0 4px 16px ${currentBiome.glow}`
                  }}
                >
                  <Search className="w-4 h-4" />
                  <span>Discover Journeys</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
