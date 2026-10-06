import React, { createContext, useContext, useState, useEffect } from 'react';

export const NATURE_BIOMES = [
  {
    id: 'forest',
    name: 'Western Ghats Rainforest',
    tag: 'Deep Emerald & Moss',
    primary: '#10B981',
    secondary: '#047857',
    glow: 'rgba(16, 185, 129, 0.4)',
    soft: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.35)',
    iconName: 'Trees'
  },
  {
    id: 'ocean',
    name: 'Malabar Coastal Tides',
    tag: 'Tropical Azure & Seafoam',
    primary: '#06B6D4',
    secondary: '#0284C7',
    glow: 'rgba(6, 182, 212, 0.4)',
    soft: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.35)',
    iconName: 'Waves'
  },
  {
    id: 'alpine',
    name: 'Himalayan Glacial Pass',
    tag: 'Frost Cyan & Granite Slate',
    primary: '#38BDF8',
    secondary: '#475569',
    glow: 'rgba(56, 189, 248, 0.4)',
    soft: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.35)',
    iconName: 'Mountain'
  },
  {
    id: 'desert',
    name: 'Thar Desert Sunset',
    tag: 'Golden Ochre & Sandstone',
    primary: '#F59E0B',
    secondary: '#B45309',
    glow: 'rgba(245, 158, 11, 0.4)',
    soft: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
    iconName: 'Sun'
  },
  {
    id: 'dawn',
    name: 'Sacred Himalayan Dawn',
    tag: 'Saffron Sandalwood & Lotus',
    primary: '#F97316',
    secondary: '#E11D48',
    glow: 'rgba(249, 115, 22, 0.4)',
    soft: 'rgba(249, 115, 22, 0.12)',
    border: 'rgba(249, 115, 22, 0.35)',
    iconName: 'Sparkles'
  }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('yatravista_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [biomeIndex, setBiomeIndex] = useState(0);

  // Sync dark/light class on document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    try {
      localStorage.setItem('yatravista_theme', theme);
    } catch (e) {}
  }, [theme]);

  // Cinematic 5.5s Nature Color Transition Cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setBiomeIndex((prev) => (prev + 1) % NATURE_BIOMES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const currentBiome = NATURE_BIOMES[biomeIndex];

  // Inject dynamic nature tokens to CSS root variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--nature-primary', currentBiome.primary);
    root.style.setProperty('--nature-secondary', currentBiome.secondary);
    root.style.setProperty('--nature-glow', currentBiome.glow);
    root.style.setProperty('--nature-soft', currentBiome.soft);
    root.style.setProperty('--nature-border', currentBiome.border);
  }, [currentBiome]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        currentBiome,
        biomeIndex,
        setBiomeIndex,
        biomes: NATURE_BIOMES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
