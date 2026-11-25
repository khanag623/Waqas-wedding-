import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarPlus, Hand } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { downloadWeddingCalendar } from '../utils/calendar';
import { CornerRoseCluster, RoyalCrestMedallion } from './OrnamentArtwork';

interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getCountdown(): CountdownParts {
  const target = new Date(WEDDING_DATA.countdownTargetIso).getTime();
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  rot: number;
  color: string;
}

export function PullToRevealScroll() {
  const [revealed, setRevealed] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [countdown, setCountdown] = useState<CountdownParts>(getCountdown);
  const [burst, setBurst] = useState<BurstParticle[]>([]);
  const [calendarSaved, setCalendarSaved] = useState(false);
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const triggerReveal = () => {
    if (revealed) return;
    setRevealed(true);
    setDragY(0);

    const colors = ['#6e1f2f', '#d9b872', '#c59b49', '#e29f95', '#ebd6a7'];
    const particles: BurstParticle[] = Array.from({ length: 22 }, (_, i) => {
      const angle = (i / 22) * Math.PI * 2;
      const dist = 55 + (i % 4) * 26;
      return {
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 18,
        rot: (i * 47) % 360,
        color: colors[i % colors.length],
      };
    });
    setBurst(particles);
    window.setTimeout(() => setBurst([]), 1200);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (revealed) return;
    startYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (revealed || startYRef.current === null) return;
    const delta = Math.max(0, Math.min(84, e.clientY - startYRef.current));
    setDragY(delta);
    if (delta >= 52) {
      startYRef.current = null;
      triggerReveal();
    }
  };

  const handlePointerUp = () => {
    if (revealed) return;
    if (dragY < 10) {
      // Treat as a tap on the tassel
      triggerReveal();
    } else {
      setDragY(0);
    }
    startYRef.current = null;
  };

  const handleAddCalendar = () => {
    downloadWeddingCalendar();
    setCalendarSaved(true);
    window.setTimeout(() => setCalendarSaved(false), 3000);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="save-the-date" className="relative py-20 px-5 sm:px-8 max-w-3xl mx-auto text-center">
      <div className="space-y-2 mb-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7a581d] font-medium">
          Save the Date
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#6e1f2f]">
          {revealed ? 'Three Days of Celebration' : 'Pull to Reveal the Dates'}
        </h2>
      </div>

      {/* Golden Rod + Unrolling Scroll Container */}
      <div className="relative max-w-md mx-auto">
        {/* Top Golden Rod */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#f3dfb0] to-[#9f7930] shadow-md border border-[#f8ebcb]" />
          <div
            className="h-3.5 flex-1 rounded-full shadow-md"
            style={{
              background: 'linear-gradient(180deg, #f5e2b5 0%, #c59b49 48%, #8f6a24 100%)',
            }}
          />
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#f3dfb0] to-[#9f7930] shadow-md border border-[#f8ebcb]" />
        </div>

        {/* Unrolling Parchment Scroll */}
        <div className="relative mx-4 overflow-hidden">
          <motion.div
            initial={false}
            animate={{
              height: revealed ? 'auto' : 68 + dragY * 0.6,
            }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-b from-[#fbf2e8] via-[#fdf9f4] to-[#f8ecdf] border-x border-b border-[#c59b49]/55 rounded-b-2xl shadow-[0_18px_40px_-14px_rgba(110,31,47,0.2)] overflow-hidden"
          >
            {!revealed ? (
              <div className="h-[68px] flex items-center justify-center px-4">
                <p className="font-serif italic text-sm text-[#6e1f2f]/75">
                  Drag or tap the silk tassel below to unroll
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative px-6 py-9 sm:px-10 sm:py-11"
              >
                {/* Rose Corners inside scroll */}
                <div className="pointer-events-none absolute -top-3 -left-3 w-20 h-20 opacity-75">
                  <CornerRoseCluster className="w-full h-full" />
                </div>
                <div className="pointer-events-none absolute -bottom-3 -right-3 w-20 h-20 opacity-75">
                  <CornerRoseCluster className="w-full h-full" flipX flipY />
                </div>

                {/* Inner gold border */}
                <div className="relative z-10 border border-[#c59b49]/40 rounded-xl px-5 py-7 bg-[#fdfaf7]/70">
                  <div className="flex justify-center mb-3">
                    <RoyalCrestMedallion size={58} tone="gold" />
                  </div>

                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#7a581d] font-medium">
                    January 2027
                  </p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="font-serif text-3xl sm:text-4xl font-semibold text-[#6e1f2f] tracking-wide">
                        25 · 26 · 27
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#7a581d] mt-1">
                        Monday · Tuesday · Wednesday
                      </p>
                    </div>

                    <div className="w-16 h-px bg-[#c59b49]/50 mx-auto my-3" />

                    <div className="space-y-1.5 text-xs sm:text-sm text-[#2d161b]">
                      <p>
                        <span className="font-semibold text-[#6e1f2f]">Mehndi:</span> 25 January 2027
                      </p>
                      <p>
                        <span className="font-semibold text-[#6e1f2f]">Baraat:</span> 26 January 2027
                      </p>
                      <p>
                        <span className="font-semibold text-[#6e1f2f]">Walima:</span> 27 January 2027
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Celebratory Petal & Gold Burst */}
          <AnimatePresence>
            {burst.length > 0 && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
                {burst.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
                    animate={{ x: p.x, y: p.y, scale: 1, opacity: 0, rotate: p.rot }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-2.5 h-3.5 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Scroll Roller Bar */}
        <div className="relative z-20 mx-2 flex items-center justify-center -mt-1">
          <div className="w-3.5 h-3.5 rounded-full bg-[#b48a3a]" />
          <div
            className="h-2.5 flex-1 rounded-full shadow-sm"
            style={{
              background: 'linear-gradient(180deg, #ebd6a7 0%, #c59b49 55%, #8f6a24 100%)',
            }}
          />
          <div className="w-3.5 h-3.5 rounded-full bg-[#b48a3a]" />
        </div>

        {/* Hanging Silk Tassel (Interactive Drag / Tap) */}
        {!revealed && (
          <div className="relative z-20 flex flex-col items-center -mt-0.5">
            <motion.button
              type="button"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              aria-label="Pull or tap tassel to reveal wedding dates"
              style={{ transform: `translateY(${dragY}px)` }}
              className="group min-w-[64px] min-h-[84px] flex flex-col items-center justify-start pt-0.5 cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b49] rounded-b-xl touch-none"
            >
              {/* Gold cord */}
              <div className="w-0.5 h-6 bg-[#c59b49]" />
              {/* Gold knot */}
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#f5e2b5] to-[#9f7930] border border-[#fdf8f5] shadow-sm" />
              {/* Wine silk tassel skirt */}
              <div
                className="w-6 h-11 rounded-b-lg shadow-md"
                style={{
                  background: 'repeating-linear-gradient(90deg, #6e1f2f 0px, #6e1f2f 2px, #8b2d40 3px, #531422 4px)',
                }}
              />
              {/* Animated hand pull hint */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#6e1f2f] font-medium"
              >
                <Hand className="w-4 h-4 text-[#c59b49]" />
                <span>Pull or Tap</span>
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>

      {/* Live One-Line Countdown + Add to Calendar */}
      <div className="mt-10 pt-6 border-t border-[#c59b49]/25 max-w-lg mx-auto flex flex-col items-center gap-5">
        <div
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-base text-[#2d161b] tabular-nums"
          aria-label="Countdown to wedding celebrations"
        >
          <span>
            <strong className="font-serif text-xl sm:text-2xl text-[#6e1f2f]">{pad(countdown.days)}</strong>{' '}
            <span className="text-xs uppercase tracking-[0.14em] text-[#7a581d]">Days</span>
          </span>
          <span aria-hidden="true" className="text-[#c59b49]">·</span>
          <span>
            <strong className="font-serif text-xl sm:text-2xl text-[#6e1f2f]">{pad(countdown.hours)}</strong>{' '}
            <span className="text-xs uppercase tracking-[0.14em] text-[#7a581d]">Hrs</span>
          </span>
          <span aria-hidden="true" className="text-[#c59b49]">·</span>
          <span>
            <strong className="font-serif text-xl sm:text-2xl text-[#6e1f2f]">{pad(countdown.minutes)}</strong>{' '}
            <span className="text-xs uppercase tracking-[0.14em] text-[#7a581d]">Min</span>
          </span>
          <span aria-hidden="true" className="text-[#c59b49]">·</span>
          <span>
            <strong className="font-serif text-xl sm:text-2xl text-[#6e1f2f]">{pad(countdown.seconds)}</strong>{' '}
            <span className="text-xs uppercase tracking-[0.14em] text-[#7a581d]">Sec</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddCalendar}
          className="min-h-[44px] px-6 py-2.5 rounded-full border border-[#6e1f2f]/35 bg-[#fdfaf7] hover:bg-[#6e1f2f] text-[#6e1f2f] hover:text-[#fdf8f5] transition-colors flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium whitespace-nowrap shrink-0 cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>{calendarSaved ? 'Calendar File Saved' : 'Add to Calendar'}</span>
        </button>
      </div>
    </section>
  );
}
