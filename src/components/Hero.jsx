import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, Sparkles, ArrowUpRight, ShieldCheck, Star, Compass, Flame, Waves, Mountain, Trees } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ onSearchSubmit, openCustomPlanner }) {
  const { currentBiome, theme } = useTheme();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState('All');

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
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden">
      {/* Background Imagery with cinematic dynamic nature atmosphere */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
          alt="Majestic mountains, lush forests and pristine waters of India"
          className="w-full h-full object-cover object-center animate-kenburns scale-105 filter brightness-[0.4] dark:brightness-[0.38] contrast-[1.1]"
        />
        {/* Multilayered radial mesh gradients transitioning with nature biomes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 dark:from-[#060810]/90 dark:via-[#060810]/40 dark:to-[#060810]" />
        
        {/* Organic Nature Glow Orbs shifting every 5-6s */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[160px] transition-all duration-[3000ms] opacity-40"
          style={{ backgroundColor: currentBiome.primary }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-[160px] transition-all duration-[3000ms] opacity-30"
          style={{ backgroundColor: currentBiome.secondary }}
        />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_0%,rgba(6,8,16,0.85)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center relative z-10">
        {/* Eyebrow Micro-Badge with dynamic nature pulse */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill mb-6 border transition-all duration-1000 shadow-lg"
          style={{
            borderColor: currentBiome.border,
            boxShadow: `0 0 24px ${currentBiome.soft}`
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: currentBiome.primary }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: currentBiome.primary }}
            />
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
            Living Nature: {currentBiome.name} · {currentBiome.tag}
          </span>
        </div>

        {/* 2-Line High-Impact Display Headline */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06] text-balance">
            Grand Expeditions & Sacred Odysseys Across{' '}
            <span
              className="transition-all duration-[2500ms]"
              style={{
                background: `linear-gradient(135deg, #FFFFFF 0%, ${currentBiome.primary} 70%, ${currentBiome.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: `0 2px 30px ${currentBiome.glow}`
              }}
            >
              Incredible India
            </span>
          </h1>
        </div>

        {/* Subtext strictly under 25 words */}
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-200 font-normal leading-relaxed text-pretty">
          From chartered Himalayan helicopter pilgrimages to Rajasthan palace citadels and Kerala backwater sanctuaries, handcrafted for the discerning explorer.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#expeditions"
            className="pl-7 pr-2 py-2 rounded-full text-white font-bold text-sm flex items-center gap-3 group transition-all duration-500 shadow-xl cursor-pointer hover:brightness-110 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
              boxShadow: `0 4px 20px ${currentBiome.glow}`
            }}
          >
            <span>Explore Curated Expeditions</span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </span>
          </a>
          <button
            onClick={openCustomPlanner}
            className="px-7 py-3 rounded-full text-sm font-semibold glass-pill text-white hover:bg-white/10 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles
              className="w-4 h-4 transition-colors duration-1000"
              style={{ color: currentBiome.primary }}
            />
            <span>Design Bespoke Odyssey</span>
          </button>
        </div>

        {/* Floating Verified Trust Stats */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-200">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 dark:bg-white/[0.04] backdrop-blur-md border border-white/10">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Authorized Priority Darshan Slips</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 dark:bg-white/[0.04] backdrop-blur-md border border-white/10">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.98/5 Rating by 9,800+ Explorers</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 dark:bg-white/[0.04] backdrop-blur-md border border-white/10">
            <Compass
              className="w-3.5 h-3.5 transition-colors duration-1000"
              style={{ color: currentBiome.primary }}
            />
            <span>Pan-India Aircraft & Luxury Villa Fleet</span>
          </span>
        </div>

        {/* Interactive Search Dock with Apple Liquid Glass / Double-Bezel Architecture */}
        <div className="mt-10 w-full max-w-4xl double-bezel text-left">
          <div className="double-bezel-inner p-4 sm:p-5">
            {/* Quick Travel Style Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-white/10 dark:border-white/10 no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.value);
                    if (tab.value !== 'All') setSelectedCategory(tab.value);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.value
                      ? 'text-white shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  style={
                    activeTab === tab.value
                      ? {
                          backgroundColor: currentBiome.primary,
                          boxShadow: `0 2px 10px ${currentBiome.glow}`
                        }
                      : {}
                  }
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
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/20 dark:bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors">
                <MapPin
                  className="w-4 h-4 shrink-0 transition-colors duration-1000"
                  style={{ color: currentBiome.primary }}
                />
                <div className="w-full">
                  <span className="block text-[9.5px] uppercase font-bold tracking-wider text-zinc-400">
                    Destination
                  </span>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-white outline-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0B101D] text-white">All Subcontinent</option>
                    <option value="Uttarakhand" className="bg-[#0B101D] text-white">Uttarakhand (Char Dham)</option>
                    <option value="Ladakh" className="bg-[#0B101D] text-white">Ladakh (Zanskar & Chadar)</option>
                    <option value="Rajasthan" className="bg-[#0B101D] text-white">Rajasthan (Palaces & Desert)</option>
                    <option value="Kerala" className="bg-[#0B101D] text-white">Kerala (Ayurveda & Lagoons)</option>
                    <option value="Meghalaya" className="bg-[#0B101D] text-white">Meghalaya (Rainforest Bridges)</option>
                    <option value="Kashmir" className="bg-[#0B101D] text-white">Kashmir (Gulmarg & Dal)</option>
                    <option value="Varanasi" className="bg-[#0B101D] text-white">Varanasi (Ganga & Kashi)</option>
                  </select>
                </div>
              </div>

              {/* Theme/Category Selector */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/20 dark:bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors">
                <Sparkles
                  className="w-4 h-4 shrink-0 transition-colors duration-1000"
                  style={{ color: currentBiome.secondary }}
                />
                <div className="w-full">
                  <span className="block text-[9.5px] uppercase font-bold tracking-wider text-zinc-400">
                    Expedition Style
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setActiveTab(e.target.value || 'All');
                    }}
                    className="w-full bg-transparent text-xs font-semibold text-white outline-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0B101D] text-white">All Styles</option>
                    <option value="Spiritual" className="bg-[#0B101D] text-white">Spiritual & Jyotirlinga</option>
                    <option value="Himalayan Treks" className="bg-[#0B101D] text-white">Himalayan Alpine Expeditions</option>
                    <option value="Royal Heritage" className="bg-[#0B101D] text-white">Royal Heritage & Palaces</option>
                    <option value="Wellness & Luxury" className="bg-[#0B101D] text-white">Wellness & Ayurveda</option>
                    <option value="Eco-Culture" className="bg-[#0B101D] text-white">Rainforests & Botanical</option>
                  </select>
                </div>
              </div>

              {/* Travel Season / Month */}
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/20 dark:bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors">
                <Calendar
                  className="w-4 h-4 shrink-0 transition-colors duration-1000"
                  style={{ color: currentBiome.primary }}
                />
                <div className="w-full">
                  <span className="block text-[9.5px] uppercase font-bold tracking-wider text-zinc-400">
                    Departure Season
                  </span>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-white outline-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0B101D] text-white">Flexible Season</option>
                    <option value="Summer" className="bg-[#0B101D] text-white">Summer (May – June)</option>
                    <option value="Monsoon" className="bg-[#0B101D] text-white">Monsoon (July – Aug)</option>
                    <option value="Autumn" className="bg-[#0B101D] text-white">Autumn (Sept – Nov)</option>
                    <option value="Winter" className="bg-[#0B101D] text-white">Winter (Dec – Feb)</option>
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
