import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeTrust from './components/MarqueeTrust';
import BentoGrid from './components/BentoGrid';
import PackageCatalog from './components/PackageCatalog';
import RegionShowcase from './components/RegionShowcase';
import CustomTripPlanner from './components/CustomTripPlanner';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ItineraryModal from './components/ItineraryModal';
import BookingModal from './components/BookingModal';
import WishlistDrawer from './components/WishlistDrawer';
import AmbientSound from './components/AmbientSound';
import { packages as fallbackPackages, destinations as fallbackDestinations, reviews as fallbackReviews, faqs as fallbackFaqs } from '../server/data.js';
import { Phone, MessageCircle } from 'lucide-react';

export default function App() {
  const [packages, setPackages] = useState(fallbackPackages);
  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [reviews, setReviews] = useState(fallbackReviews);
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [currency, setCurrency] = useState('INR');
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('yatravista_wishlist');
      return saved ? JSON.parse(saved) : ['pkg-chardham-heli', 'pkg-rajputana-citadels'];
    } catch {
      return ['pkg-chardham-heli'];
    }
  });

  const [itineraryModalPackage, setItineraryModalPackage] = useState(null);
  const [bookingModalPackage, setBookingModalPackage] = useState(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState(null);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yatravista_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [wishlist]);

  // Fetch initial data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, destRes, revRes, faqRes] = await Promise.allSettled([
          fetch('/api/packages').then(r => r.json()),
          fetch('/api/destinations').then(r => r.json()),
          fetch('/api/reviews').then(r => r.json()),
          fetch('/api/faqs').then(r => r.json())
        ]);

        if (pkgRes.status === 'fulfilled' && pkgRes.value?.success) {
          setPackages(pkgRes.value.data);
        }
        if (destRes.status === 'fulfilled' && destRes.value?.success) {
          setDestinations(destRes.value.data);
        }
        if (revRes.status === 'fulfilled' && revRes.value?.success) {
          setReviews(revRes.value.data);
        }
        if (faqRes.status === 'fulfilled' && faqRes.value?.success) {
          setFaqs(faqRes.value.data);
        }
      } catch (err) {
        console.warn('Using bundled initial data', err);
      }
    };
    fetchData();
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleHeroSearch = (filters) => {
    setSearchFilter(filters);
  };

  const handleSelectRegion = (regionName) => {
    const el = document.getElementById('expeditions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPlanner = () => {
    const el = document.getElementById('planner');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Smooth Eye-Catching Scroll Reveal Trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] selection:bg-[var(--nature-primary)] selection:text-white overflow-x-hidden relative transition-colors duration-500">
      {/* Background Ambient Nature Mesh Orbs (Cycle every 5.5s) */}
      <div 
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -z-10 transition-all duration-[2500ms]" 
        style={{ background: 'var(--nature-soft)' }}
      />
      <div 
        className="fixed bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none -z-10 transition-all duration-[2500ms] opacity-25" 
        style={{ background: 'var(--nature-glow)' }}
      />

      {/* Navigation Bar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        wishlistCount={wishlist.length}
        openWishlist={() => setWishlistOpen(true)}
        openCustomPlanner={scrollToPlanner}
      />

      {/* Main Content */}
      <main>
        {/* Attention (Hero) */}
        <Hero
          onSearchSubmit={handleHeroSearch}
          openCustomPlanner={scrollToPlanner}
        />

        {/* Trust & Accreditations Banner */}
        <div className="reveal-on-scroll">
          <MarqueeTrust />
        </div>

        {/* Interest: Gapless Bento Grid of Five Archetypes */}
        <div className="reveal-on-scroll">
          <BentoGrid
            packages={packages}
            onSelectPackage={(pkg) => setItineraryModalPackage(pkg)}
          />
        </div>

        {/* Desire: Curated Expeditions Catalog */}
        <div className="reveal-on-scroll">
          <PackageCatalog
            packages={packages}
            currency={currency}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            onOpenItinerary={(pkg) => setItineraryModalPackage(pkg)}
            onOpenBooking={(pkg) => setBookingModalPackage(pkg)}
            searchFilter={searchFilter}
          />
        </div>

        {/* Geographic Portfolios */}
        <div className="reveal-on-scroll">
          <RegionShowcase
            destinations={destinations}
            onSelectRegion={handleSelectRegion}
          />
        </div>

        {/* Interactive Custom Expedition Estimator */}
        <div className="reveal-on-scroll">
          <CustomTripPlanner currency={currency} />
        </div>

        {/* Verified Guest Stories */}
        <div className="reveal-on-scroll">
          <Testimonials reviews={reviews} />
        </div>

        {/* Knowledge Base FAQs */}
        <div className="reveal-on-scroll">
          <FaqSection faqs={faqs} />
        </div>
      </main>

      {/* Action / Information Footer */}
      <div className="reveal-on-scroll">
        <Footer />
      </div>

      {/* Atmospheric Audio Soundscape Dock (Bottom-Left) */}
      <AmbientSound />

      {/* Floating Concierge Action Buttons (Bottom-Right) */}
      <div className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
        <a
          href="https://wa.me/919918001088?text=Hello%20YatraVista!%20I%20would%20like%20to%20speak%20with%20a%20private%20travel%20curator."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Direct WhatsApp Concierge"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
          <span className="hidden sm:inline-block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#070B14]/90 backdrop-blur-md border border-white/10 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Direct Concierge WhatsApp
          </span>
        </a>
      </div>

      {/* Interactive Itinerary Modal */}
      <ItineraryModal
        pkg={itineraryModalPackage}
        isOpen={Boolean(itineraryModalPackage)}
        onClose={() => setItineraryModalPackage(null)}
        currency={currency}
        onOpenBooking={(pkg) => {
          setItineraryModalPackage(null);
          setBookingModalPackage(pkg);
        }}
      />

      {/* Instant Reservation Modal */}
      <BookingModal
        pkg={bookingModalPackage}
        isOpen={Boolean(bookingModalPackage)}
        onClose={() => setBookingModalPackage(null)}
        currency={currency}
      />

      {/* Saved Journeys Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        packages={packages}
        currency={currency}
        toggleWishlist={toggleWishlist}
        onOpenBooking={(pkg) => {
          setWishlistOpen(false);
          setBookingModalPackage(pkg);
        }}
      />
    </div>
  );
}
