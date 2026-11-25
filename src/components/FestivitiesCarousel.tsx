import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { FestivityIllustration } from './OrnamentArtwork';

export function FestivitiesCarousel() {
  const events = WEDDING_DATA.festivities;
  const [activeIndex, setActiveIndex] = useState(1); // Start centered on Baraat or cycle freely
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prev = () => {
    setActiveIndex((current) => (current - 1 + events.length) % events.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % events.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 42) prev();
    if (delta < -42) next();
    setTouchStartX(null);
  };

  // Compute relative circular offset (-1, 0, +1)
  const getRelativeOffset = (index: number) => {
    const diff = index - activeIndex;
    if (diff === 2) return -1;
    if (diff === -2) return 1;
    return diff;
  };

  return (
    <section id="festivities" className="relative py-20 px-4 sm:px-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <p className="text-xs uppercase tracking-[0.24em] text-[#7a581d] font-medium">
          Wedding Itinerary
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#6e1f2f]">
          Wedding Festivities
        </h2>
        <p className="text-xs sm:text-sm text-[#5d3f45] max-w-md mx-auto">
          Swipe or select an occasion to view the schedule and dress theme.
        </p>
      </div>

      {/* 3D Swipeable Card Stage */}
      <div
        className="relative h-[455px] sm:h-[470px] flex items-center justify-center overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {events.map((event, index) => {
          const offset = getRelativeOffset(index);
          const isCenter = offset === 0;

          return (
            <motion.article
              key={event.id}
              onClick={() => setActiveIndex(index)}
              animate={{
                x: offset * 245,
                scale: isCenter ? 1 : 0.84,
                opacity: isCenter ? 1 : 0.58,
                rotateY: offset * -10,
                zIndex: isCenter ? 30 : 10,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                filter: isCenter ? 'blur(0px)' : 'blur(1.5px)',
              }}
              className={`absolute w-[305px] sm:w-[350px] rounded-3xl border border-[#c59b49]/45 bg-gradient-to-b ${event.accentBg} p-6 sm:p-7 shadow-[0_24px_50px_-18px_rgba(110,31,47,0.22)] cursor-pointer`}
            >
              {/* Inner hairline border */}
              <div className="border border-[#c59b49]/25 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a581d] font-medium">
                  {event.urduSubtitle}
                </p>

                <h3 className="font-serif text-2xl sm:text-[26px] font-semibold text-[#6e1f2f] mt-1">
                  {event.title}
                </h3>

                {/* Illustrated Scene */}
                <div className="w-full my-3">
                  <FestivityIllustration type={event.id} />
                </div>

                {/* Date & Time */}
                <div className="space-y-1.5 text-sm text-[#2d161b] w-full">
                  <div className="flex items-center justify-center gap-2 font-medium text-[#6e1f2f]">
                    <Calendar className="w-4 h-4 text-[#c59b49] shrink-0" />
                    <span>
                      {event.dayName}, {event.dateDisplay}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#5d3f45]">
                    <Clock className="w-3.5 h-3.5 text-[#c59b49] shrink-0" />
                    <span>{event.timeDisplay}</span>
                  </div>
                </div>

                <p className="text-xs text-[#5d3f45] leading-relaxed mt-3.5 line-clamp-3">
                  {event.description}
                </p>

                {/* Dress Code Row with Color Swatch */}
                <div className="w-full mt-4 pt-3.5 border-t border-[#c59b49]/25 flex items-center justify-between text-xs">
                  <span className="uppercase tracking-[0.14em] text-[#7a581d] font-medium">
                    Attire
                  </span>
                  <span className="flex items-center gap-2 font-medium text-[#2d161b]">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-[#c59b49]/60 inline-block shrink-0"
                      style={{ backgroundColor: event.dressSwatch }}
                      aria-hidden="true"
                    />
                    <span>{event.dressCode}</span>
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Controls: Prev / Dots / Next */}
      <div className="mt-4 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous festivity"
          className="min-w-[44px] min-h-[44px] rounded-full border border-[#c59b49]/50 bg-[#fdfaf7] hover:bg-[#6e1f2f] text-[#6e1f2f] hover:text-[#fdf8f5] transition-colors flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Select wedding function">
          {events.map((event, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={event.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`View ${event.title}`}
                onClick={() => setActiveIndex(idx)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    active ? 'w-7 bg-[#6e1f2f]' : 'w-2 bg-[#c59b49]/50 hover:bg-[#c59b49]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next festivity"
          className="min-w-[44px] min-h-[44px] rounded-full border border-[#c59b49]/50 bg-[#fdfaf7] hover:bg-[#6e1f2f] text-[#6e1f2f] hover:text-[#fdf8f5] transition-colors flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
