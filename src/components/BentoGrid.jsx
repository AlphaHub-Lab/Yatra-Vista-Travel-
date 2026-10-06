import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Compass, ShieldCheck, Flame, Mountain, Sparkles, Waves, Trees, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function BentoGrid({ onSelectPackage, packages }) {
  const { theme } = useTheme();
  const [pulsePhase, setPulsePhase] = useState(0);

  // Gentle cinematic movie color breathing across nature cards every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const archetypes = [
    {
      id: "pkg-meghalaya-clouds",
      biome: "forest",
      biomeTitle: "Forest & Rainforest Kingdom",
      title: "Living Root Bridges & Rainforest Sanctuaries",
      tagline: "Cherrapunji Waterfalls & Sacred Khasi Forests",
      desc: "Venture through ancient bio-engineered ficus elastica root bridges, emerald canopy waterfalls, and living botanical kingdoms preserved by indigenous tribes.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
      category: "Rainforest & Eco-Culture",
      region: "Meghalaya & Western Ghats",
      badge: "Deep Forest Ecosystem",
      colSpan: "col-span-12 lg:col-span-7",
      minHeight: "min-h-[440px]",
      icon: Trees,
      colors: {
        accent: "#10B981",
        secondary: "#047857",
        olive: "#4D7C0F",
        glow: "rgba(16, 185, 129, 0.4)",
        gradient: "from-emerald-950/90 via-emerald-900/40 to-transparent",
        badgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
      }
    },
    {
      id: "pkg-kerala-ayurveda-houseboat",
      biome: "ocean",
      biomeTitle: "Beach & Coastal Sanctuary",
      title: "Emerald Lagoons, Backwaters & Coastal Serenity",
      tagline: "Vembanad Waterways & Arabian Sea Swells",
      desc: "Glide along silent coconut canals on private luxury houseboats, refreshed by certified Panchakarma masters and pristine tropical sea air.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
      category: "Beach & Wellness",
      region: "Kerala & Andaman Reefs",
      badge: "Coastal Waters & Lagoons",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-5",
      minHeight: "min-h-[440px]",
      icon: Waves,
      colors: {
        accent: "#06B6D4",
        secondary: "#0284C7",
        olive: "#0D9488",
        glow: "rgba(6, 182, 212, 0.4)",
        gradient: "from-sky-950/90 via-cyan-900/40 to-transparent",
        badgeBg: "bg-sky-950/80 text-cyan-300 border-cyan-500/30"
      }
    },
    {
      id: "pkg-chadar-frozen-river",
      biome: "mountain",
      biomeTitle: "Alpine Mountains & Glaciers",
      title: "High-Altitude Himalayan & Frozen River Treks",
      tagline: "Chadar Ice Trails & Trans-Himalayan Peaks",
      desc: "Walk across shimmering turquoise ice sheets, frost-bound gorges, and 14,000-ft snowy passes escorted by certified alpine mountaineers.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
      category: "Himalayan Alpine",
      region: "Ladakh & Zanskar",
      badge: "High-Altitude Glaciers",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      minHeight: "min-h-[380px]",
      icon: Mountain,
      colors: {
        accent: "#38BDF8",
        secondary: "#64748B",
        olive: "#475569",
        glow: "rgba(56, 189, 248, 0.4)",
        gradient: "from-slate-950/90 via-slate-900/40 to-transparent",
        badgeBg: "bg-slate-950/80 text-sky-300 border-sky-500/30"
      }
    },
    {
      id: "pkg-rajputana-citadels",
      biome: "desert",
      biomeTitle: "Desert Dunes & Sunset Haveli",
      title: "Golden Thar Dunes & Royal Sandstone Palaces",
      tagline: "Jaisalmer Starlit Sands & Lake Pichola Stays",
      desc: "Private luxury desert tent camps under unpolluted Milky Way skies, sunset camel caravans across golden dunes, and royal palace hospitality.",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
      category: "Desert & Heritage",
      region: "Rajasthan Thar Desert",
      badge: "Sunlit Sandstone Desert",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      minHeight: "min-h-[380px]",
      icon: Sun,
      colors: {
        accent: "#F59E0B",
        secondary: "#D97706",
        olive: "#B45309",
        glow: "rgba(245, 158, 11, 0.4)",
        gradient: "from-amber-950/90 via-amber-900/40 to-transparent",
        badgeBg: "bg-amber-950/80 text-amber-300 border-amber-500/30"
      }
    },
    {
      id: "pkg-chardham-heli",
      biome: "spiritual",
      biomeTitle: "Sacred Alpine Dawn & Shrines",
      title: "Sacred Himalayan Shrines & Helicopter Charters",
      tagline: "Kedarnath & Badrinath Sanctum Access",
      desc: "Fly above snowbound crests directly to ancient stone sanctums, accompanied by private pandits and heated luxury mountain suites.",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80",
      category: "Sacred Alpine Shrines",
      region: "Uttarakhand Garhwal",
      badge: "Priority Temple Aviation",
      colSpan: "col-span-12 md:col-span-12 lg:col-span-4",
      minHeight: "min-h-[380px]",
      icon: Sparkles,
      colors: {
        accent: "#F97316",
        secondary: "#E11D48",
        olive: "#EA580C",
        glow: "rgba(249, 115, 22, 0.4)",
        gradient: "from-orange-950/90 via-rose-950/40 to-transparent",
        badgeBg: "bg-orange-950/80 text-orange-300 border-orange-500/30"
      }
    }
  ];

  return (
    <section id="archetypes" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background ambient lighting transition like a cinematic movie */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none transition-all duration-[4000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none transition-all duration-[4000ms]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-emerald-400">
              The Living Landscapes of India
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Nature's Five Sovereign Biomes
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl">
            Each section reflects the raw elemental soul of its biome — from emerald rainforest canopies and turquoise coastal tides to snowbound trans-Himalayan summits.
          </p>
        </div>

        {/* Asymmetrical Bento Grid with Biome Nature Styling */}
        <div className="grid grid-cols-12 gap-5 grid-flow-dense">
          {archetypes.map((item) => {
            const Icon = item.icon;
            const fullPkg = packages.find((p) => p.id === item.id) || packages[0];
            return (
              <div
                key={item.id}
                onClick={() => onSelectPackage(fullPkg)}
                className={`double-bezel group cursor-pointer ${item.colSpan}`}
                style={{
                  boxShadow: `0 14px 45px -10px ${item.colors.glow}`
                }}
              >
                <div
                  className={`double-bezel-inner relative overflow-hidden flex flex-col justify-end p-6 sm:p-8 h-full transition-all duration-700 ${item.minHeight}`}
                  style={{
                    borderColor: item.colors.accent + '35'
                  }}
                >
                  {/* Background Image with hover zoom */}
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out filter brightness-[0.5] group-hover:brightness-[0.62]"
                    />
                    {/* Natural Biome Gradient Wash */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${item.colors.gradient}`}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Top Badge & Biome Identity */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${item.colors.badgeBg}`}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: item.colors.accent }} />
                      <span>{item.badge}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-white/90 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                      {item.region}
                    </span>
                  </div>

                  {/* Bottom Content Block */}
                  <div className="relative z-10 pt-24 text-left">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider block"
                      style={{ color: item.colors.accent }}
                    >
                      {item.tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1 group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-200 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Interactive Reveal CTA */}
                    <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/15">
                      <span
                        className="text-xs font-semibold flex items-center gap-1 group-hover:underline"
                        style={{ color: item.colors.accent }}
                      >
                        <span>Explore {item.biomeTitle}</span>
                      </span>
                      <span
                        className="w-8 h-8 rounded-full text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                        style={{
                          backgroundColor: item.colors.accent
                        }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
