import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Star,
  Mountain,
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  Phone,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export default function ItineraryModal({
  pkg,
  isOpen,
  onClose,
  currency,
  onOpenBooking
}) {
  if (!isOpen || !pkg) return null;

  const [activeTab, setActiveTab] = useState('itinerary');

  const formatPrice = (p) => {
    if (currency === 'USD') return `$${p.priceUSD.toLocaleString()}`;
    if (currency === 'EUR') return `€${Math.round(p.priceUSD * 0.92).toLocaleString()}`;
    if (currency === 'GBP') return `£${Math.round(p.priceUSD * 0.79).toLocaleString()}`;
    return `₹${p.priceINR.toLocaleString('en-IN')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] bg-[var(--card-surface)] border border-[var(--border-apple)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col backdrop-blur-xl">
        {/* Modal Top Bar */}
        <div className="relative h-44 sm:h-56 md:h-64 w-full overflow-hidden shrink-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover filter brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--card-surface)] hover:bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Close Itinerary Modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Title & Badge Overlay */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-6 sm:left-6 sm:right-6">
            <span 
              className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-white mb-1.5 sm:mb-2 shadow-md"
              style={{ backgroundColor: 'var(--nature-primary)', boxShadow: '0 4px 14px var(--nature-glow)' }}
            >
              {pkg.badge} · {pkg.category}
            </span>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] leading-tight line-clamp-2">
              {pkg.title}
            </h2>
            <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--nature-primary)' }} />
                {pkg.state}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--nature-primary)' }} />
                {pkg.duration}
              </span>
              {pkg.altitude && (
                <span className="flex items-center gap-1">
                  <Mountain className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  {pkg.altitude}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                {pkg.rating} ({pkg.reviewsCount})
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation with smooth mobile touch scrolling */}
        <div className="flex items-center border-b border-[var(--border-subtle)] px-3 sm:px-6 bg-[var(--card-surface)] shrink-0 overflow-x-auto no-scrollbar touch-pan-x whitespace-nowrap">
          <button
            onClick={() => setActiveTab('itinerary')}
            style={activeTab === 'itinerary' ? { borderColor: 'var(--nature-primary)', color: 'var(--nature-primary)' } : {}}
            className={`py-2.5 sm:py-3.5 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'itinerary'
                ? ''
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Day-by-Day Journey
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            style={activeTab === 'inclusions' ? { borderColor: 'var(--nature-primary)', color: 'var(--nature-primary)' } : {}}
            className={`py-2.5 sm:py-3.5 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'inclusions'
                ? ''
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Inclusions & Stays
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            style={activeTab === 'highlights' ? { borderColor: 'var(--nature-primary)', color: 'var(--nature-primary)' } : {}}
            className={`py-2.5 sm:py-3.5 px-3 sm:px-4 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'highlights'
                ? ''
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Key Highlights
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs sm:text-sm text-[var(--text-secondary)] space-y-4 sm:space-y-6">
          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] flex items-start gap-3">
                <Sparkles className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--nature-primary)' }} />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {pkg.subtitle} All transfers are private, and high-altitude health protocols are strictly monitored daily.
                </p>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-subtle)]">
                {pkg.itinerary.map((step) => (
                  <div key={step.day} className="relative">
                    {/* Timeline Node */}
                    <div 
                      className="absolute -left-[27px] top-1 w-5 h-5 rounded-full text-white text-[10px] font-extrabold flex items-center justify-center ring-4 ring-[var(--card-surface)]"
                      style={{ backgroundColor: 'var(--nature-primary)' }}
                    >
                      {step.day}
                    </div>

                    <div className="rounded-2xl p-4 bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] hover:border-[var(--nature-border)] transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-[var(--text-primary)] text-base">
                          Day {step.day}: {step.title}
                        </h4>
                        {step.altitude && (
                          <span 
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full border"
                            style={{ color: 'var(--nature-primary)', background: 'var(--nature-soft)', borderColor: 'var(--nature-border)' }}
                          >
                            {step.altitude}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] text-[var(--text-secondary)]">
                        <span>
                          <strong className="text-[var(--text-primary)]">Stay:</strong> {step.stay}
                        </span>
                        <span>
                          <strong className="text-[var(--text-primary)]">Meals:</strong> {step.meals}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="p-5 rounded-2xl bg-[var(--card-surface-hover)] border border-emerald-500/20">
                <h4 className="font-bold text-emerald-400 text-sm mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  What is Included
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {pkg.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="p-5 rounded-2xl bg-[var(--card-surface-hover)] border border-rose-500/20">
                <h4 className="font-bold text-rose-400 text-sm mb-4 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  What is Excluded
                </h4>
                <ul className="space-y-2.5 text-xs">
                  {pkg.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)] opacity-80">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'highlights' && (
            <div className="space-y-4">
              <h4 className="font-bold text-[var(--text-primary)] text-base">Key Journey Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] flex items-start gap-3"
                  >
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--nature-primary)' }} />
                    <span className="text-xs text-[var(--text-primary)]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 mt-6">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200">
                  <strong className="block font-bold">Comprehensive Safety Standard</strong>
                  All mountain routes are backed by 24/7 telemetry monitoring, satellite SOS transmitters, and doctor-on-call coverage.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-3.5 sm:p-6 border-t border-[var(--border-subtle)] bg-[var(--card-surface)] shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <span className="text-[9.5px] uppercase font-bold text-[var(--text-secondary)] block">
              Investment per guest
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                {formatPrice(pkg)}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold" style={{ color: 'var(--nature-primary)' }}>
                ({pkg.discountPercent}% Saving Applied)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/919918001088?text=Hello%20YatraVista!%20I%20am%20interested%20in%20${encodeURIComponent(
                pkg.title
              )}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full text-xs font-semibold secondary-btn flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Phone className="w-3.5 h-3.5" style={{ color: 'var(--nature-primary)' }} />
              <span>WhatsApp Inquiry</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenBooking(pkg);
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold primary-btn flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <span>Instant Reservation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
