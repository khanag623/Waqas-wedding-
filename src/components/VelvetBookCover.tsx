import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { CornerRoseCluster, RoyalCrestMedallion } from './OrnamentArtwork';

interface VelvetBookCoverProps {
  onOpen: () => void;
}

export function VelvetBookCover({ onOpen }: VelvetBookCoverProps) {
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenBook = () => {
    if (!ready || opening) return;
    setOpening(true);
    window.setTimeout(() => {
      onOpen();
    }, 950);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden paper-grain flex flex-col items-center justify-center px-4 py-10">
      {/* Background depth-layered blurred corner roses */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-52 h-52 sm:w-72 sm:h-72 opacity-60 blur-[1.5px]">
        <CornerRoseCluster className="w-full h-full" />
      </div>
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-56 h-56 sm:w-80 sm:h-80 opacity-60 blur-[1.5px]">
        <CornerRoseCluster className="w-full h-full" flipX flipY />
      </div>
      <div className="pointer-events-none absolute top-6 -right-12 w-40 h-40 opacity-35">
        <CornerRoseCluster className="w-full h-full" flipX />
      </div>

      {/* Subtle gold radial halo behind the book */}
      <div
        className="pointer-events-none absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] rounded-full opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(217,184,114,0.28) 0%, rgba(253,248,245,0) 70%)',
        }}
      />

      {/* 3D Wine Velvet Book */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{
          opacity: opening ? 0 : 1,
          scale: opening ? 1.12 : 1,
          y: 0,
        }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 perspective-1500"
      >
        <button
          type="button"
          onClick={handleOpenBook}
          aria-label="Tap the wedding invitation book to open"
          className="group relative block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b49] rounded-r-2xl cursor-pointer"
        >
          <div className="relative w-[290px] h-[420px] sm:w-[340px] sm:h-[485px] preserve-3d">
            {/* Inner Ivory Page (revealed as cover swings open) */}
            <div className="absolute inset-0 rounded-r-2xl rounded-l-sm bg-[#fdf8f5] border border-[#dfc79b] shadow-2xl flex flex-col items-center justify-center p-8 text-center">
              <div className="w-full h-full border border-[#c59b49]/40 rounded-lg flex flex-col items-center justify-center px-5">
                <p className="font-serif italic text-[#6e1f2f] text-sm tracking-wide">
                  {WEDDING_DATA.bismillahArabic}
                </p>
                <div className="w-12 h-px bg-[#c59b49]/60 my-4" />
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a581d]">
                  {WEDDING_DATA.fatherHonorific}
                </p>
                <p className="font-serif text-2xl text-[#6e1f2f] mt-2 font-semibold">
                  {WEDDING_DATA.groomName}
                </p>
                <p className="text-xs text-[#5d3f45] mt-2">{WEDDING_DATA.dateSpanLabel}</p>
              </div>
            </div>

            {/* Book Spine Shadow */}
            <div
              className="absolute top-0 left-0 bottom-0 w-5 rounded-l-sm z-20"
              style={{
                background: 'linear-gradient(90deg, #2d0911 0%, #5a1726 65%, #3b0d17 100%)',
              }}
            />

            {/* Front Swinging Velvet Cover */}
            <motion.div
              animate={{
                rotateY: opening ? -148 : 0,
              }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left center' }}
              className="absolute inset-0 rounded-r-2xl rounded-l-sm velvet-surface shadow-[0_24px_55px_-12px_rgba(70,17,28,0.55)] backface-hidden z-30 p-4 sm:p-5 flex flex-col"
            >
              {/* Gold Double Filigree Frame */}
              <div className="relative flex-1 border border-[#d9b872]/65 rounded-r-xl rounded-l-sm p-2 flex flex-col">
                <div className="relative flex-1 border border-[#d9b872]/35 rounded-r-lg rounded-l-xs px-5 py-6 flex flex-col items-center justify-between text-center">
                  {/* Corner ornamental ticks */}
                  <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#ebd6a7]/70" />
                  <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#ebd6a7]/70" />
                  <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#ebd6a7]/70" />
                  <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#ebd6a7]/70" />

                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-[#ebd6a7]/85 font-medium">
                      Wedding Invitation
                    </p>
                    <p className="font-serif italic text-xs text-[#f5e2b5]/90">
                      {WEDDING_DATA.fatherHonorific} &amp; Family
                    </p>
                  </div>

                  {/* Gold Medallion Emblem */}
                  <div className="my-2 transition-transform duration-500 group-hover:scale-105">
                    <RoyalCrestMedallion size={102} tone="lightGold" />
                  </div>

                  {/* Groom Name on Cover */}
                  <div className="space-y-2 pb-1">
                    <h1 className="font-serif text-3xl sm:text-[34px] font-semibold tracking-wide gold-foil-text leading-tight">
                      {WEDDING_DATA.groomName}
                    </h1>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#f1d99f]/85">
                      {WEDDING_DATA.groomRelation}
                    </p>
                    <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[#d9b872]/70 to-transparent my-2" />
                    <p className="text-xs tracking-[0.16em] text-[#f5e2b5]/90 font-medium">
                      25 · 26 · 27 January 2027
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </button>
      </motion.div>

      {/* Preloader / Tap Prompt below the book */}
      <div className="relative z-20 mt-8 min-h-[52px] flex items-center justify-center">
        {!ready ? (
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#6e1f2f]/80 font-medium">
            <span className="w-4 h-4 rounded-full border-2 border-[#c59b49]/40 border-t-[#6e1f2f] animate-spin" />
            <span>Preparing Invitation</span>
          </div>
        ) : (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: opening ? 0 : 1, y: 0 }}
            transition={{ duration: 0.45 }}
            onClick={handleOpenBook}
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#6e1f2f] text-[#fdf8f5] hover:bg-[#5a1726] active:scale-[0.98] transition-all shadow-md shadow-[#6e1f2f]/20 flex items-center gap-2.5 text-xs tracking-[0.18em] uppercase font-medium whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#ebd6a7]" />
            <span>Tap the Book to Open</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
