// Authentic Acoustic Nature Soundscapes Engine
// Plays pristine, real-world field recordings with seamless looping and smooth volume crossfading

class SoundEngine {
  constructor() {
    this.currentTrack = null;
    this.audioElement = null;
    this.fadeInterval = null;
    this.volume = 0.55;
    this.tracks = {
      alpine: '/sounds/alpine.mp3',
      ocean: '/sounds/ocean.mp3',
      temple: '/sounds/temple.mp3',
      rainforest: '/sounds/rainforest.mp3',
      campfire: '/sounds/campfire.mp3',
      monsoon: '/sounds/monsoon.mp3',
      night: '/sounds/night.mp3',
      thunder: '/sounds/thunder.mp3'
    };
  }

  playTrack(id) {
    const src = this.tracks[id];
    if (!src) return;

    if (this.currentTrack === id && this.audioElement && !this.audioElement.paused) {
      return; // Already playing this track
    }

    // Smoothly fade out and stop existing track
    this.stop(() => {
      try {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.01;
        audio.preload = 'auto';

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.audioElement = audio;
              this.currentTrack = id;
              this.fadeIn(audio, this.volume, 600);
            })
            .catch((err) => {
              console.warn('[SoundEngine] Autoplay was prevented or audio failed to load:', err);
            });
        }
      } catch (err) {
        console.error('[SoundEngine] Error initializing audio:', err);
      }
    });
  }

  fadeIn(audio, targetVolume, durationMs) {
    if (!audio) return;
    const steps = 20;
    const stepTime = durationMs / steps;
    const volumeIncrement = targetVolume / steps;

    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      if (!audio || audio.paused) {
        clearInterval(this.fadeInterval);
        return;
      }
      if (audio.volume + volumeIncrement >= targetVolume) {
        audio.volume = targetVolume;
        clearInterval(this.fadeInterval);
      } else {
        audio.volume += volumeIncrement;
      }
    }, stepTime);
  }

  stop(callback) {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (!this.audioElement) {
      this.currentTrack = null;
      if (callback) callback();
      return;
    }

    const audioToFade = this.audioElement;
    this.audioElement = null;
    this.currentTrack = null;

    const steps = 12;
    const stepTime = 300 / steps;
    const volumeDecrement = audioToFade.volume / steps;

    const fadeOutInterval = setInterval(() => {
      if (!audioToFade) {
        clearInterval(fadeOutInterval);
        if (callback) callback();
        return;
      }
      if (audioToFade.volume - volumeDecrement <= 0.02) {
        audioToFade.volume = 0;
        audioToFade.pause();
        audioToFade.currentTime = 0;
        clearInterval(fadeOutInterval);
        if (callback) callback();
      } else {
        audioToFade.volume -= volumeDecrement;
      }
    }, stepTime);
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  // Preset Play Methods
  playAlpine() {
    this.playTrack('alpine');
  }

  playOcean() {
    this.playTrack('ocean');
  }

  playTemple() {
    this.playTrack('temple');
  }

  playRainforest() {
    this.playTrack('rainforest');
  }

  playCampfire() {
    this.playTrack('campfire');
  }

  playMonsoon() {
    this.playTrack('monsoon');
  }

  playNight() {
    this.playTrack('night');
  }

  playThunder() {
    this.playTrack('thunder');
  }
}

export const soundEngine = new SoundEngine();
