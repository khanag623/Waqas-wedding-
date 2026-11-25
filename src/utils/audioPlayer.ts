// Synthesized soft ambient wedding instrumental (no external audio network dependency)
class WeddingAmbientPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private step = 0;

  // Gentle Raag Yaman / celebratory pentatonic frequencies (Hz)
  private readonly melodyNotes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.0,  // G4
    440.0,  // A4
    523.25, // C5
    440.0,  // A4
    392.0,  // G4
    329.63, // E4
    392.0,  // G4
    293.66, // D4
    261.63, // C4
  ];

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  private playPluckedNote(freq: number, duration = 2.4, volume = 0.08) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const shimmer = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(420, now + duration);

    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(volume, now + 0.06);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const shimmerGain = this.ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.22, now);

    osc.connect(filter);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    shimmer.start(now);
    osc.stop(now + duration + 0.05);
    shimmer.stop(now + duration + 0.05);
  }

  public async start(): Promise<boolean> {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return false;

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }

    if (this.isPlaying) return true;
    this.isPlaying = true;

    const now = ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
    this.masterGain.gain.linearRampToValueAtTime(0.45, now + 1.4);

    // Play warm opening chord notes
    this.playPluckedNote(261.63, 3.2, 0.07);
    window.setTimeout(() => this.playPluckedNote(392.0, 3.0, 0.06), 280);

    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      const freq = this.melodyNotes[this.step % this.melodyNotes.length];
      this.playPluckedNote(freq, 2.6, 0.075);
      if (this.step % 4 === 0) {
        this.playPluckedNote(130.81, 3.8, 0.05); // Soft C3 warm bass drone
      }
      this.step += 1;
    }, 950);

    return true;
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.45);
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientPlayer = new WeddingAmbientPlayer();
