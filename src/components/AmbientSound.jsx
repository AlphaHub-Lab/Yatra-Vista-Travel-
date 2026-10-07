import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Wind, Waves, Bell, Music, Trees, Flame, CloudRain, Moon, Zap, Sliders } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';
import { useTheme } from '../context/ThemeContext';

export default function AmbientSound() {
  const { currentBiome, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [volume, setVolume] = useState(55);

  const sounds = [
    {
      id: 'alpine',
      title: 'Himalayan Glacial Breeze',
      sub: 'Real alpine wind & high pass serenity',
      icon: Wind,
      accent: '#38BDF8'
    },
    {
      id: 'ocean',
      title: 'Kerala Coastal Swells',
      sub: 'Arabian sea rhythmic tidal surf',
      icon: Waves,
      accent: '#2DD4BF'
    },
    {
      id: 'temple',
      title: 'Sacred Temple Chimes',
      sub: 'Authentic bronze bell resonance',
      icon: Bell,
      accent: '#FBBF24'
    },
    {
      id: 'rainforest',
      title: 'Meghalaya Rainforest & Birds',
      sub: 'Lush living canopy mist & birdsong',
      icon: Trees,
      accent: '#34D399'
    },
    {
      id: 'campfire',
      title: 'Thar Desert Night Campfire',
      sub: 'Real crackling cedar embers',
      icon: Flame,
      accent: '#FB923C'
    },
    {
      id: 'monsoon',
      title: 'Tropical Monsoon on Water',
      sub: 'Soothing natural rain ripples',
      icon: CloudRain,
      accent: '#60A5FA'
    },
    {
      id: 'night',
      title: 'Desert Starlit Wilderness',
      sub: 'Nocturnal crickets & gentle night winds',
      icon: Moon,
      accent: '#A78BFA'
    }
  ];

  const handleToggleTrack = (id) => {
    if (activeTrack === id) {
      soundEngine.stop();
      setActiveTrack(null);
    } else {
      soundEngine.playTrack(id);
      setActiveTrack(id);
    }
  };

  const handleMuteAll = () => {
    soundEngine.stop();
    setActiveTrack(null);
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val / 100);
  };

  const currentSound = sounds.find((s) => s.id === activeTrack);

  return (
    <div className="fixed bottom-4 left-3.5 sm:bottom-6 sm:left-6 z-40">
      {/* Sound Options Flyout with Authentic Apple Liquid Glass */}
      {isOpen && (
        <div className="mb-3 p-3.5 sm:p-4 rounded-3xl apple-liquid-glass flex flex-col gap-3 w-[calc(100vw-2rem)] min-w-[280px] max-w-[330px] sm:w-[320px] shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: currentBiome.soft }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: currentBiome.primary }} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Atmosphere Audio
              </span>
            </div>
            {activeTrack && (
              <button
                onClick={handleMuteAll}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors cursor-pointer px-2 py-0.5 rounded-full hover:bg-rose-500/10"
                title="Stop audio"
              >
                Turn Off
              </button>
            )}
          </div>

          {/* Sound Options List */}
          <div className="space-y-1.5 max-h-[250px] sm:max-h-[290px] overflow-y-auto no-scrollbar pr-0.5">
            {sounds.map((sound) => {
              const Icon = sound.icon;
              const isCurrent = activeTrack === sound.id;
              return (
                <button
                  key={sound.id}
                  onClick={() => handleToggleTrack(sound.id)}
                  className={`apple-nav-pill w-full flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-2xl text-xs font-medium transition-all text-left cursor-pointer border ${
                    isCurrent
                      ? 'border-transparent text-zinc-950 dark:text-white shadow-sm'
                      : 'border-transparent text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                  style={
                    isCurrent
                      ? {
                          backgroundColor: currentBiome.soft,
                          borderColor: currentBiome.border,
                          boxShadow: `0 0 16px ${currentBiome.soft}`
                        }
                      : {}
                  }
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: isCurrent ? currentBiome.soft : theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                      color: isCurrent ? currentBiome.primary : sound.accent
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-bold text-xs text-zinc-900 dark:text-white leading-tight truncate">
                      {sound.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      {sound.sub}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="ml-auto flex gap-0.5 items-end h-3.5 shrink-0">
                      <span
                        className="w-0.5 h-3 rounded-full animate-bounce"
                        style={{ backgroundColor: currentBiome.primary }}
                      />
                      <span
                        className="w-0.5 h-2 rounded-full animate-bounce [animation-delay:150ms]"
                        style={{ backgroundColor: currentBiome.primary }}
                      />
                      <span
                        className="w-0.5 h-3.5 rounded-full animate-bounce [animation-delay:300ms]"
                        style={{ backgroundColor: currentBiome.primary }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Volume Control Bar */}
          <div className="pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3 px-1 text-xs">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 shrink-0">
              <Sliders className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">Volume</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              style={{ accentColor: currentBiome.primary }}
            />
            <span className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 w-7 text-right">
              {volume}%
            </span>
          </div>
        </div>
      )}

      {/* Main Sound Trigger Pill (Apple VisionOS / iPhone Liquid Glass) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="apple-liquid-glass group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
        style={{
          borderColor: activeTrack ? currentBiome.border : undefined,
          boxShadow: activeTrack ? `0 10px 25px -4px ${currentBiome.glow}` : undefined
        }}
        aria-label="Toggle ambient atmospheric sound"
      >
        {activeTrack ? (
          <>
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: currentBiome.primary }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: currentBiome.primary }}
              />
            </span>
            <Volume2 className="w-4 h-4" style={{ color: currentBiome.primary }} />
            <span className="text-xs font-bold text-zinc-900 dark:text-white hidden sm:inline max-w-[130px] truncate">
              {currentSound?.title.split(' ')[0]} Sound
            </span>
          </>
        ) : (
          <>
            <Music
              className="w-4 h-4 text-zinc-700 dark:text-zinc-200 group-hover:scale-110 transition-transform"
              style={{ color: currentBiome.primary }}
            />
            <span className="text-xs font-bold text-zinc-900 dark:text-white hidden sm:inline">
              Atmosphere
            </span>
          </>
        )}
      </button>
    </div>
  );
}
