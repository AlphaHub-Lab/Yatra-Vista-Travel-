// Synthetic ambient soundscapes via Web Audio API
// Generates relaxing, continuous travel atmospheres with seamless procedural loops

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.currentTrack = null;
    this.isPlaying = false;
    this.nodes = [];
    this.intervals = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stop() {
    this.intervals.forEach(id => clearInterval(id));
    this.intervals = [];

    this.nodes.forEach(node => {
      try {
        if (node.gain && node.gain.linearRampToValueAtTime && this.ctx) {
          node.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
        }
        setTimeout(() => {
          try {
            if (node.stop) node.stop();
            if (node.disconnect) node.disconnect();
          } catch (e) {}
        }, 350);
      } catch (e) {}
    });

    this.nodes = [];
    this.isPlaying = false;
    this.currentTrack = null;
  }

  // Create a continuous pink noise buffer with seamless boundary wrapping
  createSeamlessNoiseBuffer(seconds = 6) {
    if (!this.ctx) return null;
    const rate = this.ctx.sampleRate;
    const length = rate * seconds;
    const buffer = this.ctx.createBuffer(1, length, rate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    // Crossfade first & last 1000 samples for 100% zero-click seamless loop
    const fadeLen = Math.min(2048, length / 4);
    for (let i = 0; i < fadeLen; i++) {
      const weight = i / fadeLen;
      data[i] = data[i] * weight + data[length - fadeLen + i] * (1 - weight);
    }
    return buffer;
  }

  // 1. Himalayan Glacial Breeze (Continuous, breath-like mountain air)
  playAlpine() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    const ctx = this.ctx;

    const noiseBuffer = this.createSeamlessNoiseBuffer(8);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(340, ctx.currentTime);
    filter.Q.value = 3.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.2);

    // Continuous gust LFO
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(180, ctx.currentTime);

    // Whistling alpine high resonance
    const whistleFilter = ctx.createBiquadFilter();
    whistleFilter.type = 'bandpass';
    whistleFilter.frequency.setValueAtTime(880, ctx.currentTime);
    whistleFilter.Q.value = 12.0;

    const whistleGain = ctx.createGain();
    whistleGain.gain.setValueAtTime(0.005, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfoGain.connect(whistleFilter.frequency);

    noise.connect(filter);
    noise.connect(whistleFilter);
    filter.connect(gain);
    whistleFilter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    lfo.start();

    this.nodes.push(noise, filter, whistleFilter, gain, lfo, lfoGain);
    this.isPlaying = true;
    this.currentTrack = 'alpine';
  }

  // 2. Kerala Coastal Waves (Dual out-of-phase wave swell for continuous infinite sea)
  playOcean() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    const ctx = this.ctx;

    const noiseBuffer = this.createSeamlessNoiseBuffer(10);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(420, ctx.currentTime);
    filter.Q.value = 1.4;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);

    // Swell LFO 1
    const lfo1 = ctx.createOscillator();
    lfo1.frequency.setValueAtTime(0.09, ctx.currentTime);
    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.setValueAtTime(0.025, ctx.currentTime);

    // Swell LFO 2 (overlapping phase so sound never dies down completely)
    const lfo2 = ctx.createOscillator();
    lfo2.frequency.setValueAtTime(0.14, ctx.currentTime);
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.setValueAtTime(0.015, ctx.currentTime);

    const waveGain = ctx.createGain();
    waveGain.gain.setValueAtTime(0.02, ctx.currentTime);

    lfo1.connect(lfo1Gain);
    lfo2.connect(lfo2Gain);
    lfo1Gain.connect(waveGain.gain);
    lfo2Gain.connect(waveGain.gain);

    noise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(masterGain);
    masterGain.connect(ctx.destination);

    noise.start();
    lfo1.start();
    lfo2.start();

    this.nodes.push(noise, filter, waveGain, masterGain, lfo1, lfo2, lfo1Gain, lfo2Gain);
    this.isPlaying = true;
    this.currentTrack = 'ocean';
  }

  // 3. Kedarnath Temple Chimes (Continuous singing bowl drone + harmonic bells)
  playTemple() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Continuous 432Hz Om drone
    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(432, ctx.currentTime);

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(500, ctx.currentTime);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 2.0);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(ctx.destination);
    droneOsc.start();

    this.nodes.push(droneOsc, droneFilter, droneGain);

    // Trigger sweet 528Hz & 792Hz harmonic bell chime
    const triggerBell = () => {
      if (!this.isPlaying || this.currentTrack !== 'temple') return;
      try {
        const bell = ctx.createOscillator();
        const bellGain = ctx.createGain();
        bell.type = 'sine';
        bell.frequency.setValueAtTime(528, ctx.currentTime);
        bellGain.gain.setValueAtTime(0.045, ctx.currentTime);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.0);

        // Harmonic overtone
        const overtone = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(792, ctx.currentTime);
        overtoneGain.gain.setValueAtTime(0.015, ctx.currentTime);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.0);

        bell.connect(bellGain);
        bellGain.connect(ctx.destination);
        overtone.connect(overtoneGain);
        overtoneGain.connect(ctx.destination);

        bell.start();
        overtone.start();
        bell.stop(ctx.currentTime + 5.2);
        overtone.stop(ctx.currentTime + 4.2);
      } catch (e) {}
    };

    triggerBell();
    const intervalId = setInterval(triggerBell, 6500);
    this.intervals.push(intervalId);

    this.isPlaying = true;
    this.currentTrack = 'temple';
  }

  // 4. Meghalaya Rainforest & Birds (Moist mist, soft canopy rain, gentle organic chirps)
  playRainforest() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    const ctx = this.ctx;

    const noiseBuffer = this.createSeamlessNoiseBuffer(8);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.Q.value = 0.8;

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.001, ctx.currentTime);
    rainGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.5);

    noise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(ctx.destination);
    noise.start();

    this.nodes.push(noise, filter, rainGain);

    // Natural bird chirp generator
    const triggerBird = () => {
      if (!this.isPlaying || this.currentTrack !== 'rainforest') return;
      try {
        const chirp = ctx.createOscillator();
        const chirpGain = ctx.createGain();
        chirp.type = 'sine';
        const startFreq = 2400 + Math.random() * 800;
        chirp.frequency.setValueAtTime(startFreq, ctx.currentTime);
        chirp.frequency.exponentialRampToValueAtTime(startFreq + 600, ctx.currentTime + 0.1);
        chirp.frequency.exponentialRampToValueAtTime(startFreq - 200, ctx.currentTime + 0.25);

        chirpGain.gain.setValueAtTime(0.012, ctx.currentTime);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        chirp.connect(chirpGain);
        chirpGain.connect(ctx.destination);
        chirp.start();
        chirp.stop(ctx.currentTime + 0.4);
      } catch (e) {}
    };

    const intervalId = setInterval(() => {
      if (Math.random() > 0.3) triggerBird();
    }, 3800);
    this.intervals.push(intervalId);

    this.isPlaying = true;
    this.currentTrack = 'rainforest';
  }

  // 5. Thar Desert Campfire (Soothing crackling embers + warm night desert breeze)
  playCampfire() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    const ctx = this.ctx;

    // Warm desert air noise
    const noiseBuffer = this.createSeamlessNoiseBuffer(8);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, ctx.currentTime);

    const airGain = ctx.createGain();
    airGain.gain.setValueAtTime(0.001, ctx.currentTime);
    airGain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 1.2);

    noise.connect(filter);
    filter.connect(airGain);
    airGain.connect(ctx.destination);
    noise.start();

    this.nodes.push(noise, filter, airGain);

    // Stochastic wood crackle bursts
    const triggerCrackle = () => {
      if (!this.isPlaying || this.currentTrack !== 'campfire') return;
      try {
        const crackleCount = Math.floor(1 + Math.random() * 3);
        for (let i = 0; i < crackleCount; i++) {
          const delay = i * 0.08;
          const crackle = ctx.createOscillator();
          const cGain = ctx.createGain();
          crackle.type = 'triangle';
          crackle.frequency.setValueAtTime(140 + Math.random() * 400, ctx.currentTime + delay);
          cGain.gain.setValueAtTime(0.035, ctx.currentTime + delay);
          cGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.05);

          crackle.connect(cGain);
          cGain.connect(ctx.destination);
          crackle.start(ctx.currentTime + delay);
          crackle.stop(ctx.currentTime + delay + 0.06);
        }
      } catch (e) {}
    };

    const intervalId = setInterval(triggerCrackle, 700);
    this.intervals.push(intervalId);

    this.isPlaying = true;
    this.currentTrack = 'campfire';
  }

  // 6. Monsoon Rain on Water (Dense soothing rainfall with rhythmic water droplets)
  playMonsoon() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    const ctx = this.ctx;

    const noiseBuffer = this.createSeamlessNoiseBuffer(8);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(3200, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.001, ctx.currentTime);
    rainGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.2);

    noise.connect(filter);
    filter.connect(filter2);
    filter2.connect(rainGain);
    rainGain.connect(ctx.destination);
    noise.start();

    this.nodes.push(noise, filter, filter2, rainGain);

    // Soft water droplets
    const triggerDrop = () => {
      if (!this.isPlaying || this.currentTrack !== 'monsoon') return;
      try {
        const drop = ctx.createOscillator();
        const dGain = ctx.createGain();
        drop.type = 'sine';
        const freq = 1200 + Math.random() * 600;
        drop.frequency.setValueAtTime(freq, ctx.currentTime);
        drop.frequency.exponentialRampToValueAtTime(freq * 0.7, ctx.currentTime + 0.08);

        dGain.gain.setValueAtTime(0.015, ctx.currentTime);
        dGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);

        drop.connect(dGain);
        dGain.connect(ctx.destination);
        drop.start();
        drop.stop(ctx.currentTime + 0.12);
      } catch (e) {}
    };

    const intervalId = setInterval(triggerDrop, 900);
    this.intervals.push(intervalId);

    this.isPlaying = true;
    this.currentTrack = 'monsoon';
  }
}

export const soundEngine = new SoundEngine();
