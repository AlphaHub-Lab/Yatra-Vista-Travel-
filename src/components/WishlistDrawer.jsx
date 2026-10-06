import React from 'react';
import { X, Heart, Trash2, ArrowUpRight, Compass } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  packages,
  currency,
  toggleWishlist,
  onOpenBooking
}) {
  if (!isOpen) return null;

  const savedPackages = packages.filter((p) => wishlist.includes(p.id));

  const formatPrice = (pkg) => {
    if (currency === 'USD') return `$${pkg.priceUSD.toLocaleString()}`;
    if (currency === 'EUR') return `€${Math.round(pkg.priceUSD * 0.92).toLocaleString()}`;
    if (currency === 'GBP') return `£${Math.round(pkg.priceUSD * 0.79).toLocaleString()}`;
    return `₹${pkg.priceINR.toLocaleString('en-IN')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md h-full bg-[var(--card-surface)] border-l border-[var(--border-subtle)] p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 backdrop-blur-2xl">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" style={{ color: 'var(--nature-primary)', fill: 'var(--nature-primary)' }} />
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Saved Expeditions ({savedPackages.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[var(--card-surface-hover)] hover:bg-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer border border-[var(--border-subtle)]"
              aria-label="Close Wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="mt-6 space-y-4 overflow-y-auto max-h-[70vh] pr-1">
            {savedPackages.length > 0 ? (
              savedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-3.5 rounded-2xl bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] flex gap-3.5 items-center justify-between hover:border-[var(--nature-border)] transition-colors"
                >
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold block uppercase tracking-wider" style={{ color: 'var(--nature-primary)' }}>
                      {pkg.state} · {pkg.duration}
                    </span>
                    <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
                      {pkg.title}
                    </h4>
                    <span className="text-xs font-extrabold text-[var(--text-primary)] mt-1 block">
                      {formatPrice(pkg)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => onOpenBooking(pkg)}
                      style={{ backgroundColor: 'var(--nature-primary)' }}
                      className="p-2 rounded-xl text-white text-xs font-semibold flex items-center justify-center transition-opacity hover:opacity-90 cursor-pointer shadow-md"
                      title="Book Expedition"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(pkg.id)}
                      className="p-2 rounded-xl bg-[var(--card-surface)] hover:bg-rose-500/20 text-[var(--text-secondary)] hover:text-rose-400 text-xs flex items-center justify-center transition-colors cursor-pointer border border-[var(--border-subtle)]"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-[var(--text-secondary)] space-y-3">
                <Compass className="w-10 h-10 mx-auto opacity-50" style={{ color: 'var(--nature-primary)' }} />
                <p className="text-xs">No journeys bookmarked yet.</p>
                <p className="text-[11px] text-[var(--text-secondary)] opacity-70">
                  Tap the heart icon on any expedition card to curate your private travel portfolio.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {savedPackages.length > 0 && (
          <div className="pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => {
                onClose();
                const el = document.getElementById('planner');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-full text-xs font-bold primary-btn flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Combine Into Multi-Destination Trip</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
