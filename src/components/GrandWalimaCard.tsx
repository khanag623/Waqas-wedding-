import React from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';
import { CornerRoseCluster, RoyalCrestMedallion } from './OrnamentArtwork';

export function GrandWalimaCard() {
  const walima = WEDDING_DATA.festivities.find((f) => f.id === 'walima')!;

  return (
    <section id="walima" className="relative py-16 px-5 sm:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl velvet-surface text-[#fdf8f5] px-6 py-12 sm:px-14 sm:py-16 shadow-[0_28px_65px_-20px_rgba(70,17,28,0.55)] border border-[#d9b872]/55 text-center"
      >
        {/* Blooming Roses in Two Corners */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 sm:w-52 sm:h-52"
        >
          <CornerRoseCluster className="w-full h-full" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="pointer-events-none absolute -bottom-8 -right-8 w-40 h-40 sm:w-52 sm:h-52"
        >
          <CornerRoseCluster className="w-full h-full" flipX flipY />
        </motion.div>

        {/* Inner Gold Frame */}
        <div className="pointer-events-none absolute inset-3.5 rounded-2xl border border-[#ebd6a7]/35" />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <RoyalCrestMedallion size={74} tone="lightGold" />

          <p className="mt-4 text-[11px] uppercase tracking-[0.26em] text-[#ebd6a7] font-medium">
            You Are Cordially Invited To
          </p>

          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold gold-foil-text tracking-wide leading-tight">
            {walima.title}
          </h2>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#ebd6a7]/70 to-transparent my-6" />

          <p className="font-serif text-xl sm:text-2xl text-[#fdf8f5] tracking-wide">
            {walima.dayName}, {walima.dateDisplay}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#f5e2b5]/90 tracking-[0.12em] uppercase">
            <span>{walima.timeDisplay}</span>
            <span aria-hidden="true" className="text-[#d9b872]">·</span>
            <span>Dinner &amp; Celebrations</span>
          </div>

          <p className="mt-5 text-xs sm:text-sm text-[#fdf8f5]/85 leading-relaxed max-w-md">
            Hosted in honor of <strong className="text-[#f5e2b5] font-semibold">{WEDDING_DATA.groomName}</strong>{' '}
            by <strong className="text-[#f5e2b5] font-semibold">{WEDDING_DATA.fatherHonorific}</strong>,{' '}
            {WEDDING_DATA.uncleName} &amp; Brothers.
          </p>

          <p className="mt-5 text-xs tracking-[0.16em] uppercase text-[#ebd6a7]/90">
            Dress Code · {walima.dressCode}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
