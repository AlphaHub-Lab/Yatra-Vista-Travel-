import express from 'express';
import cors from 'cors';
import { packages, destinations, reviews, faqs } from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory stores for active session
let bookings = [
  {
    id: "YV-2026-8841",
    packageId: "pkg-chardham-heli",
    packageTitle: "Maha Char Dham Luxury Helicopter Odyssey",
    customerName: "Sanjay Singhania",
    email: "sanjay.s@example.com",
    phone: "+91 98200 44321",
    travelDate: "2026-10-15",
    guests: 2,
    totalPriceINR: 390000,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

let customInquiries = [];
let newsletterEmails = new Set(["traveler@yatravista.com"]);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'YatraVista Sovereign Journeys API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Get all packages with rich filtering, searching and sorting
app.get('/api/packages', (req, res) => {
  const { category, region, search, maxPrice, sort } = req.query;
  let result = [...packages];

  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (region && region !== 'All') {
    result = result.filter(p => p.region.toLowerCase() === region.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (maxPrice) {
    result = result.filter(p => p.priceINR <= Number(maxPrice));
  }

  if (sort === 'price-low') {
    result.sort((a, b) => a.priceINR - b.priceINR);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.priceINR - a.priceINR);
  } else if (sort === 'duration') {
    result.sort((a, b) => a.durationDays - b.durationDays);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// Single package by slug or ID
app.get('/api/packages/:identifier', (req, res) => {
  const { identifier } = req.params;
  const pkg = packages.find(p => p.slug === identifier || p.id === identifier);
  if (!pkg) {
    return res.status(404).json({ success: false, message: 'Package not found' });
  }
  res.json({ success: true, data: pkg });
});

// Destinations list
app.get('/api/destinations', (req, res) => {
  res.json({ success: true, data: destinations });
});

// Reviews list
app.get('/api/reviews', (req, res) => {
  res.json({ success: true, data: reviews });
});

// FAQs
app.get('/api/faqs', (req, res) => {
  res.json({ success: true, data: faqs });
});

// Create a booking
app.post('/api/bookings', (req, res) => {
  const { packageId, customerName, email, phone, travelDate, guests, specialNotes, currency = 'INR' } = req.body;

  if (!packageId || !customerName || !email || !phone || !travelDate) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all mandatory booking fields (name, email, phone, date).'
    });
  }

  const pkg = packages.find(p => p.id === packageId);
  const guestCount = Number(guests) || 1;
  const basePrice = pkg ? (currency === 'USD' ? pkg.priceUSD : pkg.priceINR) : 50000;
  const calculatedTotal = basePrice * guestCount;

  const bookingRef = `YV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: bookingRef,
    packageId,
    packageTitle: pkg ? pkg.title : "Custom Expedition",
    customerName,
    email,
    phone,
    travelDate,
    guests: guestCount,
    currency,
    totalPrice: calculatedTotal,
    specialNotes: specialNotes || "None",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  res.status(201).json({
    success: true,
    message: 'Booking confirmed successfully. Concierge will connect shortly.',
    booking: newBooking
  });
});

// Custom Trip Estimate and Inquiry
app.post('/api/custom-trip', (req, res) => {
  const {
    name,
    email,
    phone,
    destinations: chosenDestinations,
    theme,
    travelers,
    durationDays,
    budgetTier,
    helicopterAddon,
    notes
  } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Name, email and phone number are required.'
    });
  }

  const days = Number(durationDays) || 7;
  const count = Number(travelers) || 2;
  
  // Rate calculation per person per day
  let baseRatePerDay = 15000; // Premium Standard
  if (budgetTier === 'Palatial Luxury' || budgetTier === 'Royal') {
    baseRatePerDay = 32000;
  } else if (budgetTier === 'Sovereign Ultra Luxury') {
    baseRatePerDay = 58000;
  }

  let heliCost = helicopterAddon ? 120000 : 0;
  const estimatedCostINR = (baseRatePerDay * days * count) + heliCost;

  const inquiryRef = `CT-${Math.floor(10000 + Math.random() * 90000)}`;

  const inquiry = {
    id: inquiryRef,
    name,
    email,
    phone,
    destinations: chosenDestinations || ["Rajasthan", "Uttarakhand"],
    theme: theme || "Heritage & Spiritual",
    travelers: count,
    durationDays: days,
    budgetTier: budgetTier || "Palatial Luxury",
    helicopterAddon: Boolean(helicopterAddon),
    estimatedCostINR,
    estimatedCostUSD: Math.round(estimatedCostINR / 83),
    notes: notes || "",
    status: "Estimate Generated",
    createdAt: new Date().toISOString()
  };

  customInquiries.unshift(inquiry);

  res.status(201).json({
    success: true,
    message: 'Custom itinerary generated successfully.',
    inquiry
  });
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email required.' });
  }
  newsletterEmails.add(email.toLowerCase());
  res.json({
    success: true,
    message: 'Thank you for subscribing to YatraVista Curated Chronicles!'
  });
});

// Serve frontend static assets if dist exists
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'), (err) => {
    if (err) {
      res.status(200).send('YatraVista Server running. Build frontend with `npm run build` or use Vite dev server.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`[YatraVista Server] Running on http://localhost:${PORT}`);
});
