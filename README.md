# YatraVista — Sovereign Luxury Travel & Sacred Expeditions

YatraVista is a premier bespoke travel atelier platform designed for sovereign expeditions across Incredible India. Synthesizing sacred spiritual routes, chartered Himalayan helicopter yatras, royal Rajputana palace retreats, and serene Malabar backwater sanctuaries with cutting-edge web design aesthetics.

---

## ✨ Key Features

1. **Apple iPhone Liquid Glass Menubar**:
   - Optical backdrop refraction (`blur(34px) saturate(220%)`) with specular top-edge light reflection.
   - Apple dock-style mouse hover physics, tactile pill depress animation, and integrated instant **"Call Us"** priority concierge button.

2. **Light & Dark Mode**:
   - Built-in theme switch with persistent user preference in `localStorage`.
   - Balanced contrast between deep dark space glass and frosted porcelain light surfaces.

3. **Dynamic Nature Biome Engine (Cycles Every 5–6s)**:
   - Eliminates monotone static colors with a cinematic 5.5-second nature cycle transitioning like a film:
     - 🌿 **Western Ghats Rainforest**: Deep Emerald & Olive Moss
     - 🌊 **Malabar Coastal Tides**: Tropical Azure & Seafoam Aqua
     - 🏔️ **Himalayan Glacial Pass**: Frost Cyan & Granite Slate
     - 🌅 **Thar Desert Sunset**: Golden Ochre & Sandstone Terracotta
     - 🪷 **Sacred Himalayan Dawn**: Saffron Sandalwood & Sacred Lotus

4. **Atmospheric Nature Soundscapes**:
   - 6 procedural Web Audio API nature soundscapes with zero-click, seamless continuous loops (no abrupt restarting or audio pops):
     - Himalayan Glacial Breeze
     - Kerala Coastal Swell
     - Sacred Temple Chimes
     - Meghalaya Rainforest & Dawn Birds
     - Thar Desert Campfire
     - Tropical Monsoon on Water
   - Live soundwave frequency visualizer and volume controls.

5. **Curated Expedition Architecture**:
   - **5 Archetypes Bento Grid**: Highlighting mountain, desert, beach, rainforest, and spiritual realms.
   - **Interactive Custom Trip Estimator**: Dynamic tier calculation (Curated Signature, Palatial Luxury, Sovereign Ultra Luxury) with helicopter VIP pass add-ons.
   - **Instant Booking & Inquiry Modals**: Complete day-by-day itineraries, inclusions, reviews, and currency converter (INR, USD, EUR, GBP).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **Audio Engine**: Web Audio API (procedural synthesis, pink noise, dual LFO filters)
- **Backend API**: Node.js & Express (`/api/packages`, `/api/destinations`, `/api/bookings`, `/api/custom-trip`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Servers
In two terminals:

```bash
# Terminal 1: Backend API (Port 5000)
node server/index.js

# Terminal 2: Frontend Vite App (Port 5173)
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
