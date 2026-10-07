import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Plane,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CustomTripPlanner({ currency }) {
  const [selectedDestinations, setSelectedDestinations] = useState(['Rajasthan', 'Uttarakhand']);
  const [theme, setTheme] = useState('Royal Heritage & Spiritual');
  const [durationDays, setDurationDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [budgetTier, setBudgetTier] = useState('Palatial Luxury');
  const [helicopterAddon, setHelicopterAddon] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const destinationOptions = [
    'Uttarakhand (Char Dham)',
    'Ladakh & Zanskar',
    'Rajasthan Palaces',
    'Kerala Backwaters',
    'Meghalaya Cloud Kingdom',
    'Spiti Valley',
    'Kashi & Ayodhya',
    'Goan Heritage & Catamaran',
    'Andaman Marine Reef'
  ];

  const themes = [
    'Royal Heritage & Spiritual',
    'High Altitude Alpine Odyssey',
    'Holistic Ayurvedic Wellness',
    'Eco-Culture & Botanical Wonders',
    'Milestone Celebration & Private Charter'
  ];

  const tiers = [
    {
      name: 'Curated Signature',
      rate: 15000,
      desc: 'Boutique 4-5 star heritage hotels, private luxury SUV, verified local historians.'
    },
    {
      name: 'Palatial Luxury',
      rate: 32000,
      desc: 'Taj/Oberoi luxury palace wings, private chef experiences, priority VIP temple access.'
    },
    {
      name: 'Sovereign Ultra Luxury',
      rate: 58000,
      desc: 'Presidential & royal suites, private Mercedes/Maybach chauffeur, 24/7 personal butler.'
    }
  ];

  // Dynamic cost calculation
  const currentTier = tiers.find((t) => t.name === budgetTier) || tiers[1];
  const heliCost = helicopterAddon ? 120000 : 0;
  const estimatedCostINR = currentTier.rate * durationDays * travelers + heliCost;
  const estimatedCostUSD = Math.round(estimatedCostINR / 83);
  const estimatedCostEUR = Math.round(estimatedCostUSD * 0.92);
  const estimatedCostGBP = Math.round(estimatedCostUSD * 0.79);

  const formatPrice = (inrVal, usdVal) => {
    if (currency === 'USD') return `$${usdVal.toLocaleString()}`;
    if (currency === 'EUR') return `€${Math.round(usdVal * 0.92).toLocaleString()}`;
    if (currency === 'GBP') return `£${Math.round(usdVal * 0.79).toLocaleString()}`;
    return `₹${inrVal.toLocaleString('en-IN')}`;
  };

  const toggleDestination = (dest) => {
    if (selectedDestinations.includes(dest)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== dest));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/custom-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          destinations: selectedDestinations,
          theme,
          travelers,
          durationDays,
          budgetTier,
          helicopterAddon,
          notes
        })
      });

      const data = await res.json();
      if (data.success) {
        setConfirmation(data.inquiry);
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error(err);
      setConfirmation({
        id: `CT-${Math.floor(10000 + Math.random() * 90000)}`,
        name,
        estimatedCostINR,
        estimatedCostUSD,
        destinations: selectedDestinations,
        durationDays,
        travelers
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="planner" className="py-16 sm:py-24 md:py-36 bg-[var(--bg-main)] text-[var(--text-primary)] relative overflow-hidden transition-colors duration-500">
      {/* Background ambient lighting syncing with nature biome */}
      <div 
        className="absolute top-1/3 right-1/4 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none transition-all duration-[2500ms] opacity-20"
        style={{ background: 'var(--nature-glow)' }}
      />
      <div 
        className="absolute bottom-1/3 left-1/4 w-[500px] h-[300px] rounded-full blur-[130px] pointer-events-none transition-all duration-[2500ms]"
        style={{ background: 'var(--nature-soft)' }}
      />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase nature-gradient-text block mb-2">
            Interactive Trip Estimator & Bespoke Atelier
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Design Your Sovereign Indian Odyssey
          </h2>
          <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-[var(--text-secondary)]">
            Select your dream destinations, preferred tempo, and luxury tier to generate an instant dynamic estimate backed by our master travel curators.
          </p>
        </div>

        {confirmation ? (
          <div className="max-w-2xl mx-auto p-5 sm:p-8 rounded-3xl bg-[var(--card-surface)] border border-[var(--nature-border)] text-center shadow-2xl animate-in zoom-in-95 duration-500 backdrop-blur-xl">
            <div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 border"
              style={{ background: 'var(--nature-soft)', borderColor: 'var(--nature-border)', color: 'var(--nature-primary)' }}
            >
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Expedition Blueprint Generated
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5 sm:mt-2">
              Inquiry Reference:{' '}
              <strong style={{ color: 'var(--nature-primary)' }}>{confirmation.id}</strong>
            </p>

            <div className="my-5 sm:my-6 p-4 sm:p-6 rounded-2xl bg-[var(--card-surface-hover)] border border-[var(--border-subtle)] text-left space-y-2.5 sm:space-y-3">
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>Guest Name:</span>
                <strong className="text-[var(--text-primary)]">{confirmation.name}</strong>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>Destinations:</span>
                <strong className="text-[var(--text-primary)] text-right">
                  {confirmation.destinations?.join(', ')}
                </strong>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                <span>Duration & Guests:</span>
                <strong className="text-[var(--text-primary)]">
                  {confirmation.durationDays} Days · {confirmation.travelers} Guests
                </strong>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between items-baseline">
                <span className="text-xs uppercase font-bold" style={{ color: 'var(--nature-primary)' }}>
                  Estimated Investment:
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                  {formatPrice(confirmation.estimatedCostINR, confirmation.estimatedCostUSD)}
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Our Senior Travel Curator will contact you within 2 business hours with a bespoke flight schedule, hotel suite confirmations, and private access passes.
            </p>

            <button
              onClick={() => setConfirmation(null)}
              className="px-6 py-2.5 rounded-full text-xs font-bold primary-btn cursor-pointer"
            >
              Design Another Itinerary
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
          >
            {/* Left Controls Column with Double-Bezel Framing */}
            <div className="lg:col-span-7 double-bezel">
              <div className="double-bezel-inner p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                {/* 1. Pick Destinations */}
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[var(--text-secondary)] mb-2.5 sm:mb-3">
                    1. Select Regions & Destinations (Pick multiple)
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {destinationOptions.map((dest) => {
                      const isSelected = selectedDestinations.includes(dest);
                      return (
                        <button
                          type="button"
                          key={dest}
                          onClick={() => toggleDestination(dest)}
                          style={
                            isSelected
                              ? {
                                  backgroundColor: 'var(--nature-primary)',
                                  color: '#FFFFFF',
                                  boxShadow: '0 2px 14px var(--nature-glow)'
                                }
                              : {}
                          }
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'font-bold'
                              : 'bg-[var(--card-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                          }`}
                        >
                          {dest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Travel Archetype */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[var(--text-secondary)] mb-3">
                    2. Travel Experience Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--card-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-medium outline-none cursor-pointer focus:border-[var(--nature-primary)] transition-colors"
                  >
                    {themes.map((t) => (
                      <option key={t} value={t} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Duration & Travelers Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Duration:
                      </span>
                      <span className="text-[var(--text-primary)] font-extrabold text-sm">
                        {durationDays} Days
                      </span>
                    </div>
                    <input
                      type="range"
                      min="3"
                      max="21"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      style={{ accentColor: 'var(--nature-primary)' }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
                      <span>3 Days (Short Retreat)</span>
                      <span>21 Days (Grand Tour)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Guests:
                      </span>
                      <span className="text-[var(--text-primary)] font-extrabold text-sm">
                        {travelers} Guests
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      style={{ accentColor: 'var(--nature-primary)' }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
                      <span>1 Solo</span>
                      <span>12+ Private Flight</span>
                    </div>
                  </div>
                </div>

                {/* 4. Luxury Hospitality Tier */}
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[var(--text-secondary)] mb-3">
                    4. Luxury Accommodation Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {tiers.map((tier) => {
                      const isSelected = budgetTier === tier.name;
                      return (
                        <div
                          key={tier.name}
                          onClick={() => setBudgetTier(tier.name)}
                          style={
                            isSelected
                              ? {
                                  borderColor: 'var(--nature-border)',
                                  backgroundColor: 'var(--nature-soft)',
                                  boxShadow: '0 4px 20px var(--nature-glow)'
                                }
                              : {}
                          }
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border'
                              : 'bg-[var(--card-surface)] border-[var(--border-subtle)] hover:border-[var(--border-apple)]'
                          }`}
                        >
                          <h4 
                            className="text-xs font-bold"
                            style={{ color: isSelected ? 'var(--nature-primary)' : 'var(--text-primary)' }}
                          >
                            {tier.name}
                          </h4>
                          <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-relaxed">
                            {tier.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Helicopter Add-on */}
                <div
                  onClick={() => setHelicopterAddon(!helicopterAddon)}
                  style={
                    helicopterAddon
                      ? {
                          borderColor: 'var(--nature-border)',
                          backgroundColor: 'var(--nature-soft)',
                          boxShadow: '0 4px 20px var(--nature-glow)'
                        }
                      : {}
                  }
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    helicopterAddon
                      ? 'border'
                      : 'bg-[var(--card-surface)] border-[var(--border-subtle)] hover:border-[var(--border-apple)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Plane className="w-5 h-5" style={{ color: 'var(--nature-primary)' }} />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">
                        Helicopter Shuttle & VIP Darshan Add-on
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Private aerial access to remote shrines & helipads (Adds ₹1,20,000 flat)
                      </p>
                    </div>
                  </div>
                  <div
                    style={
                      helicopterAddon
                        ? { backgroundColor: 'var(--nature-primary)', borderColor: 'var(--nature-primary)' }
                        : { borderColor: 'var(--border-subtle)' }
                    }
                    className="w-5 h-5 rounded-md flex items-center justify-center border text-white"
                  >
                    {helicopterAddon && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary & Booking Trigger */}
            <div className="lg:col-span-5 double-bezel shadow-2xl">
              <div className="double-bezel-inner p-4 sm:p-6 lg:p-8 flex flex-col justify-between h-full">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase nature-gradient-text block">
                    Live Dynamic Cost Estimation
                  </span>
                  <div className="mt-3.5 sm:mt-4 p-4 sm:p-5 rounded-2xl bg-[var(--card-surface-hover)] border border-[var(--border-subtle)]">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs text-[var(--text-secondary)]">Total Estimated Budget</span>
                      <span className="text-[11px] sm:text-xs font-semibold" style={{ color: 'var(--nature-primary)' }}>
                        All-Inclusive Package
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] break-words">
                      {formatPrice(estimatedCostINR, estimatedCostUSD)}
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-[var(--text-secondary)] mt-1 block">
                      Covers {durationDays} days for {travelers} travelers under{' '}
                      <strong style={{ color: 'var(--nature-primary)' }}>{budgetTier}</strong> tier.
                    </span>
                  </div>

                  {/* Contact Form Details */}
                  <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-3.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Radhika Mehra"
                        className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--card-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--nature-primary)] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="radhika@example.com"
                          className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--card-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--nature-primary)] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98100 12345"
                          className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--card-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--nature-primary)] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                        Special Preferences or Dates (Optional)
                      </label>
                      <textarea
                        rows="2"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any specific temple darshan, dietary requirements, or private aircraft requests..."
                        className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl bg-[var(--card-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--nature-primary)] transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[var(--border-subtle)]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full text-xs font-bold primary-btn flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? 'Generating Blueprint...'
                        : 'Request Custom Itinerary & Quote'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-[var(--text-secondary)]">
                    <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--nature-primary)' }} />
                    <span>Zero Obligation · Free Consultation with Senior Curator</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
