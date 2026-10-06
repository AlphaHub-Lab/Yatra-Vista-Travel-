import React, { useState } from 'react';
import { MapPin, Sun, CloudRain, Wind, Calendar, ArrowUpRight, Compass, Sparkles, Trees, Waves, Mountain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function RegionShowcase({ destinations, onSelectRegion }) {
  const [activeTab, setActiveTab] = useState(0);
  const current = destinations[activeTab] || destinations[0];

  // Map each destination to its nature biome styling
  const regionBiomes = {
    "dest-north": {
      name: "Alpine Mountains & Snow Pass",
      icon: Mountain,
      accent: "#38BDF8",
      sub: "#64748B",
      glow: "rgba(56, 189, 248, 0.35)",
      bgGradient: "from-slate-900/90 via-sky-950/40 to-transparent",
      badgeClass: "bg-sky-500/20 text-sky-300 border-sky-400/30"
    },
    "dest-west": {
      name: "Desert Sandstone & Royal Dunes",
      icon: Sun,
      accent: "#F59E0B",
      sub: "#B45309",
      glow: "rgba(245, 158, 11, 0.35)",
      bgGradient: "from-amber-950/90 via-orange-950/40 to-transparent",
      badgeClass: "bg-amber-500/20 text-amber-300 border-amber-400/30"
    },
    "dest-south": {
      name: "Coastal Lagoons & Tropical Sea",
      icon: Waves,
      accent: "#06B6D4",
      sub: "#0284C7",
      glow: "rgba(6, 182, 212, 0.35)",
      bgGradient: "from-teal-950/90 via-cyan-950/40 to-transparent",
      badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
    },
    "dest-east": {
      name: "Living Rainforests & Cloud Canopies",
      icon: Trees,
      accent: "#10B981",
      sub: "#047857",
      glow: "rgba(16, 185, 129, 0.35)",
      bgGradient: "from-emerald-950/90 via-emerald-900/40 to-transparent",
      badgeClass: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
    }
  };

  const activeBiome = regionBiomes[current.id] || regionBiomes["dest-north"];
  const BiomeIcon = activeBiome.icon;

  return (
    <section id="regions" className="py-24 md:py-36 relative overflow-hidden transition-all duration-1000">
      {/* Background ambient natural light following the active region */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000 opacity-25"
        style={{ backgroundColor: activeBiome.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeBiome.accent }}
            />
            <span
              className="text-[11px] font-bold tracking-[0.22em] uppercase transition-colors duration-700"
              style={{ color: activeBiome.accent }}
            >
              Geographic Portfolios & Climate
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Explore All Across the Indian Subcontinent
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
            From the frozen trans-Himalayan desert to the tropical Malabar coast, each quadrant of India holds an entirely distinct biosphere, heritage, and climate.
          </p>
        </div>

        {/* Region Tabs with Apple Liquid Glass Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-black/10 dark:border-white/[0.08]">
          {destinations.map((dest, idx) => {
            const isTabActive = activeTab === idx;
            const b = regionBiomes[dest.id] || regionBiomes["dest-north"];
            const TabIcon = b.icon;
            return (
              <button
                key={dest.id}
                onClick={() => setActiveTab(idx)}
                className={`apple-nav-pill px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-500 flex items-center gap-2 cursor-pointer border ${
                  isTabActive
                    ? 'text-white shadow-lg'
                    : 'bg-black/5 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 border-black/5 dark:border-white/10'
                }`}
                style={
                  isTabActive
                    ? {
                        backgroundColor: b.accent,
                        borderColor: b.accent,
                        boxShadow: `0 4px 18px ${b.glow}`
                      }
                    : {}
                }
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{dest.name.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Region Display with Smooth Cinematic Movie Blend */}
        {current && (
          <div
            className="double-bezel shadow-2xl transition-all duration-700"
            style={{
              boxShadow: `0 16px 50px -12px ${activeBiome.glow}`
            }}
          >
            <div className="double-bezel-inner overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-700">
              {/* Visual Column */}
              <div className="relative lg:col-span-6 min-h-[360px] lg:min-h-[500px] overflow-hidden">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover filter brightness-[0.75] transition-transform duration-1000 hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${activeBiome.bgGradient} transition-all duration-1000`}
                />
                
                {/* Weather & Climate Floating Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-md">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Climate: {current.weather}</span>
                </div>

                {/* Biome classification chip */}
                <div className="absolute bottom-6 left-6 right-6 hidden sm:block">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${activeBiome.badgeClass}`}
                  >
                    <BiomeIcon className="w-3.5 h-3.5" />
                    <span>{activeBiome.name}</span>
                  </span>
                </div>
              </div>

              {/* Info Column */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: activeBiome.accent }}
                    />
                    <span
                      className="text-xs uppercase font-bold tracking-wider transition-colors duration-700"
                      style={{ color: activeBiome.accent }}
                    >
                      {current.packageCount} Handcrafted Expeditions Active
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground mt-1">
                    {current.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-300 mt-2 font-medium leading-relaxed">
                    {current.tagline}
                  </p>

                  {/* States Covered */}
                  <div className="mt-6">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 block mb-2.5">
                      States & Territories Included:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {current.states.map((st) => (
                        <span
                          key={st}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-200"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Landmarks */}
                  <div className="mt-6">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 block mb-2.5">
                      Signature Sanctuaries & Highlights:
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {current.topAttractions.map((att) => (
                        <div
                          key={att}
                          className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300"
                        >
                          <MapPin
                            className="w-3.5 h-3.5 shrink-0 transition-colors duration-700"
                            style={{ color: activeBiome.accent }}
                          />
                          <span className="truncate">{att}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best Season Card */}
                  <div className="mt-6 p-4 rounded-2xl bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: activeBiome.accent + '20',
                        borderColor: activeBiome.accent + '40',
                        color: activeBiome.accent
                      }}
                    >
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <span className="text-zinc-400 block font-medium">Optimal Travel Window:</span>
                      <strong className="text-foreground text-sm">{current.bestTime}</strong>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => onSelectRegion(current.name)}
                    className="pl-6 pr-2 py-2 rounded-full text-xs font-bold text-white flex items-center gap-3 cursor-pointer group shadow-lg transition-all duration-300 hover:brightness-110 active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${activeBiome.accent}, ${activeBiome.sub})`,
                      boxShadow: `0 4px 18px ${activeBiome.glow}`
                    }}
                  >
                    <span>View Expeditions in {current.states[0]}</span>
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
