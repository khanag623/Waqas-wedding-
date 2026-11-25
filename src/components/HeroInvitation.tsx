import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { RoyalCrestMedallion } from './OrnamentArtwork';

export function HeroInvitation() {
  const letters = WEDDING_DATA.groomName.split('');

  const scrollToNext = () => {
    const el = document.getElementById('save-the-date');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 py-16 sm:py-20 text-center">
      {/* Soft inner Mughal arch border frame */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl mx-auto px-6 py-12 sm:px-12 sm:py-14 rounded-t-[160px] rounded-b-3xl border border-[#c59b49]/40 bg-[#fdfaf7]/85 backdrop-blur-xs shadow-[0_20px_60px_-24px_rgba(110,31,47,0.16)]"
      >
        {/* Subtle inner hairline arch */}
        <div className="pointer-events-none absolute inset-2.5 rounded-t-[150px] rounded-b-2xl border border-[#c59b49]/20" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Top Crest Medallion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <RoyalCrestMedallion size={86} tone="gold" />
          </motion.div>

          {/* Bismillah Calligraphy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-4 space-y-1"
          >
            <p className="text-xl sm:text-2xl text-[#6e1f2f] font-serif" dir="rtl" lang="ar">
              {WEDDING_DATA.bismillahArabic}
            </p>
            <p className="text-[11px] tracking-[0.14em] uppercase text-[#7a581d]/90">
              {WEDDING_DATA.bismillahTranslit}
            </p>
          </motion.div>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#c59b49] to-transparent my-6" />

          {/* Father's Name at the Top */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="space-y-1.5"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[#7a581d] font-medium">
              With the Blessings of
            </p>
            <p className="font-serif text-xl sm:text-2xl font-semibold text-[#6e1f2f]">
              {WEDDING_DATA.fatherHonorific}
            </p>
            <p className="text-xs sm:text-sm text-[#5d3f45] max-w-sm mx-auto leading-relaxed pt-1">
              Together with our beloved family, we cordially request the honor of your presence at the wedding celebrations of
            </p>
          </motion.div>

          {/* Groom's Name Letter-by-Letter Reveal */}
          <h1
            className="mt-7 mb-2 font-serif text-4xl sm:text-5xl md:text-[54px] font-semibold text-[#6e1f2f] tracking-wide leading-tight"
            aria-label={WEDDING_DATA.groomName}
          >
            {letters.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.52 + index * 0.045,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          {/* Son of Janab Abdul */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="font-serif italic text-base sm:text-lg text-[#7a581d]"
          >
            {WEDDING_DATA.groomRelation}
          </motion.p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#c59b49] to-transparent my-6" />

          {/* Unboxed Clean Typographic Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="space-y-1.5 text-xs sm:text-sm text-[#2d161b] font-medium tracking-[0.14em] uppercase"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[#6e1f2f]">
              <span>Mehndi</span>
              <span aria-hidden="true" className="text-[#c59b49]">·</span>
              <span>Baraat</span>
              <span aria-hidden="true" className="text-[#c59b49]">·</span>
              <span>Walima</span>
            </div>
            <p className="text-[#5d3f45] tracking-[0.18em]">
              {WEDDING_DATA.dateSpanLabel}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Cue */}
      <motion.button
        type="button"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.35, duration: 0.6 }}
        aria-label="Scroll down to Save the Date"
        className="mt-8 min-h-[44px] px-4 py-2 flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-[#7a581d] hover:text-[#6e1f2f] transition-colors cursor-pointer"
      >
        <span>Scroll to Explore</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#c59b49]" />
        </motion.span>
      </motion.button>
    </section>
  );
}
