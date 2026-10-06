import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Wind, Waves, Bell, Music, Trees, Flame, CloudRain } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

export default function AmbientSound() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);

  const sounds = [
    {
      id: 'alpine',
      title: 'Himalayan Glacial Breeze',
      sub: 'Alpine wind & high pass serenity',
      icon: Wind,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
    },
    {
      id: 'ocean',
      title: 'Kerala Coastal Swells',
      sub: 'Endless rhythmic Arabian sea tides',
      icon: Waves,
      color: 'text-teal-400',
      activeBg: 'bg-teal-500/15 border-teal-400/40 text-teal-300'
    },
    {
      id: 'temple',
      title: 'Sacred Temple Chimes',
      sub: '432Hz bowl drone & 528Hz bell',
      icon: Bell,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500/15 border-amber-400/40 text-amber-300'
    },
    {
      id: 'rainforest',
      title: 'Meghalaya Rainforest & Birds',
      sub: 'Living canopy mist & morning chirps',
      icon: Trees,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
    },
    {
      id: 'campfire',
      title: 'Thar Desert Night Campfire',
      sub: 'Warm crackling embers under stars',
      icon: Flame,
      color: 'text-orange-400',
      activeBg: 'bg-orange-500/15 border-orange-400/40 text-orange-300'
    },
    {
      id: 'monsoon',
      title: 'Tropical Monsoon on Water',
      sub: 'Continuous soothing rainfall ripples',
      icon: CloudRain,
      color: 'text-sky-400',
      activeBg: 'bg-sky-500/15 border-sky-400/40 text-sky-300'
    }
  ];

  const handleToggleTrack = (id) => {
    if (activeTrack === id) {
      soundEngine.stop();
      setActiveTrack(null);
    } else {
      if (id === 'alpine') soundEngine.playAlpine();
      if (id === 'ocean') soundEngine.playOcean();
      if (id === 'temple') soundEngine.playTemple();
      if (id === 'rainforest') soundEngine.playRainforest();
      if (id === 'campfire') soundEngine.playCampfire();
      if (id === 'monsoon') soundEngine.playMonsoon();
      setActiveTrack(id);
    }
  };

  const handleMuteAll = () => {
    soundEngine.stop();
    setActiveTrack(null);
  };

  const currentSound = sounds.find(s => s.id === activeTrack);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Sound Options Flyout with Liquid Glass Styling */}
      {isOpen && (
        <div className="mb-3 p-3.5 rounded-3xl glass-panel border border-white/20 shadow-2xl backdrop-blur-3xl flex flex-col gap-2 min-w-[270px] max-w-[320px] animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 dark:text-zinc-200">
                Atmosphere Soundscapes
              </span>
            </div>
            {activeTrack && (
              <button
                onClick={handleMuteAll}
                className="text-[10px] font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                title="Stop audio"
              >
                Turn Off
              </button>
            )}
          </div>

          <div className="space-y-1.5 max-h-[300px] overflow-y-auto no-scrollbar pr-0.5">
            {sounds.map((sound) => {
              const Icon = sound.icon;
              const isCurrent = activeTrack === sound.id;
              return (
                <button
                  key={sound.id}
                  onClick={() => handleToggleTrack(sound.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-medium transition-all text-left cursor-pointer border ${
                    isCurrent
                      ? sound.activeBg + ' shadow-md'
                      : 'border-transparent hover:bg-white/[0.06] text-zinc-300 dark:text-zinc-300 hover:text-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 ${sound.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-semibold text-xs text-white leading-tight truncate">
                      {sound.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 truncate">
                      {sound.sub}
                    </span>
                  </div>
                  {isCurrent && (
                    <span className="ml-auto flex gap-0.5 items-end h-3.5 shrink-0">
                      <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" />
                      <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-0.5 h-3.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 px-2 flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Seamless procedural loop
            </span>
            <span>Zero latency</span>
          </div>
        </div>
      )}

      {/* Main Sound Trigger Pill (Apple iPhone style) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-xl backdrop-blur-2xl cursor-pointer ${
          activeTrack
            ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 shadow-emerald-500/15'
            : 'bg-white/10 dark:bg-[#070B14]/85 border-white/20 text-zinc-200 hover:text-white hover:border-white/40'
        }`}
        aria-label="Toggle ambient atmospheric sound"
      >
        {activeTrack ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold hidden sm:inline max-w-[130px] truncate">
              {currentSound?.title.split(' ')[0]} Atmosphere
            </span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-zinc-300 group-hover:text-emerald-400 transition-colors" />
            <span className="text-xs font-medium hidden sm:inline">Atmosphere</span>
          </>
        )}
      </button>
    </div>
  );
}
