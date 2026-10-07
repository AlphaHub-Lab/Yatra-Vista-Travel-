import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, Send, ShieldCheck, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[var(--bg-main)] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs transition-colors duration-500">
      {/* Newsletter Pre-Footer Banner with Double-Bezel Architecture */}
      <div className="border-b border-[var(--border-subtle)] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="double-bezel shadow-2xl">
            <div className="double-bezel-inner p-5 sm:p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
              <div className="max-w-xl text-left">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase nature-gradient-text block mb-2">
                  The Sovereign India Dispatch
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight text-balance">
                  Receive Private Flight Schedules & Festival Chronicles
                </h3>
                <p className="mt-2 text-xs text-[var(--text-secondary)]">
                  Join 140,000+ patrons. Seasonal temple opening calendars, chartered helicopter release dates, and insider retreat invites.
                </p>
              </div>

              <div className="w-full lg:max-w-md">
                {subscribed ? (
                  <div 
                    className="p-4 rounded-2xl border text-xs flex items-center gap-2"
                    style={{ background: 'var(--nature-soft)', borderColor: 'var(--nature-border)', color: 'var(--nature-primary)' }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Welcome to YatraVista Chronicles. Check your inbox for our 2026 Sovereign Guide.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 sm:gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your personal email..."
                      className="flex-1 px-4 py-3 rounded-full bg-[var(--card-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--nature-primary)] transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold primary-btn flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <span>Subscribe</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand Col */}
          <div className="sm:col-span-2 lg:col-span-2 text-left">
            <a href="#" className="flex items-center gap-2.5 group">
              <div 
                className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-md transition-all duration-[2500ms]"
                style={{ background: 'linear-gradient(135deg, var(--nature-primary), var(--nature-secondary))', boxShadow: '0 4px 16px var(--nature-glow)' }}
              >
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                Yatra<span style={{ color: 'var(--nature-primary)' }}>Vista</span>
              </span>
            </a>
            <p className="mt-4 text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              YatraVista is India's preeminent bespoke expedition house, synthesizing sacred spiritual routes, extreme alpine mountaineering, royal palace hospitality, and pristine coastal wellness into one seamless journey.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 shrink-0" style={{ color: 'var(--nature-primary)' }} />
                <span>Headquarters: DLF CyberCity, Gurugram & Nariman Point, Mumbai</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--nature-primary)' }} />
                <span>24/7 Dedicated Concierge: +91 99180 01088</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--nature-primary)' }} />
                <span>concierge@yatravista.com</span>
              </div>
            </div>
          </div>

          {/* Expeditions */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Expedition Portfolios
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#expeditions" className="hover:text-[var(--nature-primary)] transition-colors">Char Dham Helicopter Yatra</a></li>
              <li><a href="#expeditions" className="hover:text-[var(--nature-primary)] transition-colors">Chadar Zanskar Ice Trek</a></li>
              <li><a href="#expeditions" className="hover:text-[var(--nature-primary)] transition-colors">Rajputana Palace & Desert Trail</a></li>
              <li><a href="#expeditions" className="hover:text-[var(--nature-primary)] transition-colors">Kerala Ayurveda & Houseboats</a></li>
              <li><a href="#expeditions" className="hover:text-[var(--nature-primary)] transition-colors">Meghalaya Living Root Bridges</a></li>
              <li><a href="#expeditions" className="hover:text-[var(--nature-primary)] transition-colors">Spiti Snow Leopard Expedition</a></li>
            </ul>
          </div>

          {/* Regions */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Subcontinent Regions
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#regions" className="hover:text-[var(--nature-primary)] transition-colors">Ladakh & Kashmir Valley</a></li>
              <li><a href="#regions" className="hover:text-[var(--nature-primary)] transition-colors">Uttarakhand Sacred Shrines</a></li>
              <li><a href="#regions" className="hover:text-[var(--nature-primary)] transition-colors">Rajasthan Royal Citadels</a></li>
              <li><a href="#regions" className="hover:text-[var(--nature-primary)] transition-colors">Kerala Malabar Coast</a></li>
              <li><a href="#regions" className="hover:text-[var(--nature-primary)] transition-colors">Northeast Seven Sisters</a></li>
              <li><a href="#regions" className="hover:text-[var(--nature-primary)] transition-colors">Andaman Coral Archipelagos</a></li>
            </ul>
          </div>

          {/* Standards & Trust */}
          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
              Integrity & Standards
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#faq" className="hover:text-[var(--nature-primary)] transition-colors">UIAA Alpine Safety Code</a></li>
              <li><a href="#faq" className="hover:text-[var(--nature-primary)] transition-colors">VIP Darshan Protocols</a></li>
              <li><a href="#faq" className="hover:text-[var(--nature-primary)] transition-colors">Senior Traveler Care</a></li>
              <li><a href="#faq" className="hover:text-[var(--nature-primary)] transition-colors">Responsible Eco-Tourism</a></li>
              <li><a href="#planner" className="hover:text-[var(--nature-primary)] transition-colors">Custom Aircraft Charters</a></li>
              <li><a href="#reviews" className="hover:text-[var(--nature-primary)] transition-colors">Guest Trust & Feedback</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-secondary)] opacity-80 text-center sm:text-left">
          <p>© 2026 YatraVista Sovereign Journeys Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
            <span>IATO Active Member</span>
            <span>Ministry of Tourism Approved</span>
            <span>ISO 9001:2015 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
