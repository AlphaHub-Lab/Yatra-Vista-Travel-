import React from 'react';
import { ShieldCheck, Award, Star, Compass, Anchor, Mountain, HeartHandshake } from 'lucide-react';

export default function MarqueeTrust() {
  const partners = [
    { title: "Ministry of Tourism Govt. of India", icon: Award, label: "Incredible India Partner" },
    { title: "IATO National Tourism Member", icon: ShieldCheck, label: "Accredited Tour Operator" },
    { title: "UIAA Certified Alpine Standards", icon: Mountain, label: "Himalayan Expedition Safety" },
    { title: "Luxury Heritage Hotels of India", icon: Compass, label: "Palace Preferred Partner" },
    { title: "TripAdvisor Travelers' Choice 2026", icon: Star, label: "Top 1% Worldwide" },
    { title: "Indian Board of Marine Expeditions", icon: Anchor, label: "Coastal & Reef Certified" },
    { title: "Char Dham Shrine Board Protocol", icon: HeartHandshake, label: "Authorized Priority Darshan" }
  ];

  return (
    <div className="relative py-7 bg-[var(--card-surface)] border-y border-[var(--border-subtle)] overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 mb-3 text-center">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--text-secondary)]">
          Recognized By Sovereign & Global Aviation Authorities
        </span>
      </div>

      <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex items-center gap-6 py-2 pr-6">
          {partners.concat(partners).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] shrink-0 hover:border-[var(--nature-border)] transition-all duration-300"
              >
                <div 
                  className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-[2500ms]"
                  style={{ background: 'var(--nature-soft)', borderColor: 'var(--nature-border)', color: 'var(--nature-primary)' }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-[var(--text-primary)] tracking-tight">{item.title}</span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-medium">{item.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
