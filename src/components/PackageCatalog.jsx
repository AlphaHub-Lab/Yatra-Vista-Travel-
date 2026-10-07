import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Compass,
  Star,
  Clock,
  MapPin,
  Mountain,
  Heart,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Filter,
  Check,
  Search,
  X,
  Trees,
  Waves,
  Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function PackageCatalog({
  packages,
  currency,
  wishlist,
  toggleWishlist,
  onOpenItinerary,
  onOpenBooking,
  searchFilter
}) {
  const { currentBiome, theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState(searchFilter?.category || 'All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState(searchFilter?.search || '');
  const [sortBy, setSortBy] = useState('featured');

  const catContainerRef = useRef(null);
  const [glidingCat, setGlidingCat] = useState({ left: 0, width: 0, opacity: 0 });

  const updateCatIndicator = (target) => {
    if (!target || !catContainerRef.current) return;
    const containerRect = catContainerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setGlidingCat({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      opacity: 1
    });
  };

  useEffect(() => {
    if (catContainerRef.current) {
      const activeEl = catContainerRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        updateCatIndicator(activeEl);
      }
    }
  }, [activeCategory]);

  const categories = [
    'All',
    'Spiritual',
    'Himalayan Treks',
    'Royal Heritage',
    'Wellness & Luxury',
    'Eco-Culture',
    'Celebrations'
  ];

  const regions = ['All', 'North', 'West', 'South', 'East & Northeast'];

  // Helper to get natural biome for each package
  const getPackageBiome = (pkg) => {
    if (pkg.category === 'Eco-Culture') {
      return {
        name: 'Rainforest',
        accent: '#10B981',
        sub: '#047857',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
      };
    }
    if (pkg.category === 'Wellness & Luxury') {
      return {
        name: 'Coastal Beach',
        accent: '#06B6D4',
        sub: '#0284C7',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
      };
    }
    if (pkg.category === 'Himalayan Treks') {
      return {
        name: 'Alpine Peak',
        accent: '#38BDF8',
        sub: '#475569',
        badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30'
      };
    }
    if (pkg.category === 'Royal Heritage') {
      return {
        name: 'Desert Dunes',
        accent: '#F59E0B',
        sub: '#D97706',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
      };
    }
    return {
      name: 'Sacred Shrines',
      accent: '#F97316',
      sub: '#EA580C',
      badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-400/30'
    };
  };

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    let list = [...packages];

    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (selectedRegion !== 'All') {
      list = list.filter((p) => p.region.toLowerCase() === selectedRegion.toLowerCase());
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceINR - a.priceINR);
    } else if (sortBy === 'duration') {
      list.sort((a, b) => a.durationDays - b.durationDays);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [packages, activeCategory, selectedRegion, searchQuery, sortBy]);

  const formatPrice = (pkg) => {
    if (currency === 'USD') return `$${pkg.priceUSD.toLocaleString()}`;
    if (currency === 'EUR') return `€${Math.round(pkg.priceUSD * 0.92).toLocaleString()}`;
    if (currency === 'GBP') return `£${Math.round(pkg.priceUSD * 0.79).toLocaleString()}`;
    return `₹${pkg.priceINR.toLocaleString('en-IN')}`;
  };

  return (
    <section id="expeditions" className="py-16 sm:py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
          <div>
            <span
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase block mb-2 transition-colors duration-1000"
              style={{ color: currentBiome.primary }}
            >
              Curated Nature Expeditions
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Master Travel Portfolios
            </h2>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
              Each expedition is led by verified local scholars, high-altitude alpine guides, or royal palace concierges with guaranteed VIP access.
            </p>
          </div>

          {/* Quick Search & Sort Bar: Stacks on mobile, inline on tablet/desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <div className="relative w-full sm:w-52 md:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination, style..."
                className="w-full pl-9 pr-8 py-2 text-xs rounded-full bg-black/5 dark:bg-white/[0.05] border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 text-xs rounded-full bg-white dark:bg-[#0A0F1E] border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 focus:outline-none cursor-pointer shadow-sm"
            >
              <option value="featured" className="bg-white text-zinc-900 dark:bg-[#0B101D] dark:text-white">Featured Expeditions</option>
              <option value="rating" className="bg-white text-zinc-900 dark:bg-[#0B101D] dark:text-white">Highest Rated</option>
              <option value="price-asc" className="bg-white text-zinc-900 dark:bg-[#0B101D] dark:text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-white text-zinc-900 dark:bg-[#0B101D] dark:text-white">Price: High to Low</option>
              <option value="duration" className="bg-white text-zinc-900 dark:bg-[#0B101D] dark:text-white">Duration</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills with Sticky Apple Liquid Morphing Capsule */}
        <div
          ref={catContainerRef}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 sm:mb-6 no-scrollbar touch-pan-x -mx-3.5 px-3.5 sm:mx-0 sm:px-0 relative"
        >
          {/* Gliding Liquid Glass Pill Indicator */}
          <div
            className="absolute top-0 bottom-4 rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              left: `${glidingCat.left}px`,
              width: `${glidingCat.width}px`,
              opacity: glidingCat.opacity,
              background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`,
              boxShadow: `0 4px 16px ${currentBiome.glow}, inset 0 1px 1.5px rgba(255, 255, 255, 0.45)`
            }}
          />

          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                data-active={isActive}
                onClick={(e) => {
                  setActiveCategory(cat);
                  updateCatIndicator(e.currentTarget);
                }}
                className={`relative z-10 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer border ${
                  isActive
                    ? 'text-white border-transparent'
                    : 'border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Expeditions' : cat}
              </button>
            );
          })}
        </div>

        {/* Region Sub-Filter */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 text-xs">
          <span className="text-zinc-400 uppercase tracking-wider font-semibold mr-1">Region:</span>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-2.5 sm:px-3 py-1 rounded-full transition-colors cursor-pointer text-xs ${
                selectedRegion === reg
                  ? 'font-bold underline underline-offset-4'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-foreground'
              }`}
              style={selectedRegion === reg ? { color: currentBiome.primary } : {}}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Package Grid with Double-Bezel Framing & Biome Nature Themes */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {filteredPackages.map((pkg) => {
              const isWishlisted = wishlist.includes(pkg.id);
              const b = getPackageBiome(pkg);
              return (
                <div
                  key={pkg.id}
                  className="double-bezel group flex flex-col justify-between"
                  style={{
                    borderColor: b.accent + '25'
                  }}
                >
                  <div className="double-bezel-inner overflow-hidden flex flex-col justify-between h-full">
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out filter brightness-[0.75] group-hover:brightness-[0.85]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 dark:from-[#0B101D] dark:via-transparent dark:to-black/40" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between">
                        <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold backdrop-blur-md border ${b.badgeBg}`}>
                          {pkg.badge} · {b.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(pkg.id);
                          }}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-90"
                          aria-label="Save to Wishlist"
                        >
                          <Heart
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            style={isWishlisted ? { fill: b.accent, color: b.accent } : {}}
                          />
                        </button>
                      </div>

                      {/* Bottom Metadata bar on image */}
                      <div className="absolute bottom-2.5 sm:bottom-3 left-3.5 sm:left-4 right-3.5 sm:right-4 flex items-center justify-between text-xs text-white">
                        <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
                          <MapPin className="w-3.5 h-3.5" style={{ color: b.accent }} />
                          {pkg.state}
                        </span>
                        {pkg.altitude && (
                          <span className="flex items-center gap-1 font-medium bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10 text-[10px] sm:text-[11px]">
                            <Mountain className="w-3 h-3 text-cyan-300" />
                            {pkg.altitude}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between text-left">
                      <div>
                        {/* Rating & Duration */}
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                          <span className="flex items-center gap-1 font-semibold text-foreground text-[11px] sm:text-xs">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {pkg.rating} ({pkg.reviewsCount})
                          </span>
                          <span className="flex items-center gap-1 font-medium text-zinc-500 dark:text-zinc-300 text-[11px] sm:text-xs">
                            <Clock className="w-3.5 h-3.5" style={{ color: b.accent }} />
                            {pkg.duration}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h3
                          onClick={() => onOpenItinerary(pkg)}
                          className="text-base sm:text-lg font-bold text-foreground transition-colors cursor-pointer line-clamp-1"
                        >
                          {pkg.title}
                        </h3>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {pkg.subtitle}
                        </p>

                        {/* Curated Highlights with Biome Checkmark */}
                        <div className="mt-3.5 space-y-1.5 border-t border-black/10 dark:border-white/10 pt-3">
                          {pkg.highlights.slice(0, 2).map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-600 dark:text-zinc-300">
                              <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: b.accent }} />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Dual Action Buttons */}
                      <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-col text-left">
                          <span className="text-[9.5px] uppercase font-bold tracking-wider text-zinc-400">
                            All-Inclusive
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg sm:text-xl font-extrabold text-foreground">
                              {formatPrice(pkg)}
                            </span>
                            <span className="text-[10px] text-zinc-400">/ person</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onOpenItinerary(pkg)}
                            className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-semibold secondary-btn cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onOpenBooking(pkg)}
                            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-md transition-all hover:brightness-110 active:scale-95"
                            style={{
                              background: `linear-gradient(135deg, ${b.accent}, ${b.sub})`
                            }}
                          >
                            <span>Book</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-3xl p-8 max-w-md mx-auto">
            <Compass className="w-10 h-10 mx-auto mb-3 animate-spin [animation-duration:8s]" style={{ color: currentBiome.primary }} />
            <h4 className="text-base font-bold text-foreground">No expeditions found</h4>
            <p className="text-xs text-zinc-400 mt-1">
              Try adjusting your search criteria or explore our bespoke trip estimator.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSelectedRegion('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold text-white cursor-pointer shadow-md"
              style={{
                background: `linear-gradient(135deg, ${currentBiome.primary}, ${currentBiome.secondary})`
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
