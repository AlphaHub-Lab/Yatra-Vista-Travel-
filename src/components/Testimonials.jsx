import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials({ reviews }) {
  return (
    <section id="reviews" className="py-24 md:py-36 bg-[var(--bg-main)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-500">
      {/* Subtle ambient lighting synced with nature biome */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none transition-all duration-[2500ms]"
        style={{ background: 'var(--nature-soft)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-[11px] font-bold tracking-[0.22em] uppercase nature-gradient-text block mb-2">
            Verified Guest Chronicle
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Stories From Fellow Voyagers
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)]">
            Over 9,800 pilgrims, adventurers, and couples have entrusted their milestones to our sovereign travel atelier.
          </p>
        </div>

        {/* Testimonials Grid with Double-Bezel Framing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="double-bezel group flex flex-col justify-between"
            >
              <div className="double-bezel-inner p-6 flex flex-col justify-between h-full">
                <div>
                  {/* Rating stars & Quote mark */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[var(--border-apple)] group-hover:text-[var(--nature-primary)] transition-colors" />
                  </div>

                  {/* Quote (strictly concise) */}
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-normal italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author & Expedition Info */}
                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--nature-border)] shrink-0"
                  />
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1">
                      <span className="truncate">{rev.author}</span>
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--nature-primary)' }} />
                    </span>
                    <span className="text-[10px] font-semibold truncate" style={{ color: 'var(--nature-primary)' }}>
                      {rev.trip}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] opacity-80">
                      {rev.location} · {rev.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
