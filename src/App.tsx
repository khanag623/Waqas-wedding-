/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { VelvetBookCover } from './components/VelvetBookCover';
import { HeroInvitation } from './components/HeroInvitation';
import { PullToRevealScroll } from './components/PullToRevealScroll';
import { FestivitiesCarousel } from './components/FestivitiesCarousel';
import { FamilyHostsSection } from './components/FamilyHostsSection';
import { GrandWalimaCard } from './components/GrandWalimaCard';
import { LocationAndRsvp } from './components/LocationAndRsvp';
import { CornerRoseCluster, HangingMarigoldGarland } from './components/OrnamentArtwork';
import { ambientPlayer } from './utils/audioPlayer';

interface FallingPetal {
  id: number;
  leftPct: number;
  delaySec: number;
  durationSec: number;
  driftX: number;
  driftRot: number;
  color: string;
  size: number;
}

function createOpeningPetals(): FallingPetal[] {
  const palette = ['#6e1f2f', '#a63c50', '#e3a598', '#d9b872', '#f1d99f'];
  return Array.from({ length: 24 }, (_, idx) => ({
    id: idx,
    leftPct: 4 + ((idx * 17) % 92),
    delaySec: (idx % 6) * 0.28,
    durationSec: 5.5 + (idx % 4) * 1.1,
    driftX: (idx % 2 === 0 ? 1 : -1) * (24 + (idx % 5) * 14),
    driftRot: 180 + (idx % 5) * 55,
    color: palette[idx % palette.length],
    size: 8 + (idx % 4) * 3,
  }));
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  const { scrollY } = useScroll();
  const topRoseY = useTransform(scrollY, [0, 1200], [0, -34]);
  const bottomRoseY = useTransform(scrollY, [0, 1200], [0, 34]);
  const [petals] = useState<FallingPetal[]>(createOpeningPetals);

  useEffect(() => {
    return () => {
      ambientPlayer.pause();
    };
  }, []);

  const handleOpenBook = async () => {
    setIsOpened(true);
    setShowPetals(true);
    window.scrollTo({ top: 0 });

    const started = await ambientPlayer.start();
    setMusicPlaying(started);

    window.setTimeout(() => {
      setShowPetals(false);
    }, 8500);
  };

  const toggleMusic = async () => {
    if (musicPlaying) {
      ambientPlayer.pause();
      setMusicPlaying(false);
    } else {
      const started = await ambientPlayer.start();
      setMusicPlaying(started);
    }
  };

  if (!isOpened) {
    return <VelvetBookCover onOpen={handleOpenBook} />;
  }

  return (
    <div className="relative min-h-screen w-full paper-grain overflow-x-clip">
      {/* Subtle Top Hanging Marigold Garlands */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 z-30 flex justify-between opacity-75">
        <HangingMarigoldGarland className="w-56 sm:w-80 h-auto -mt-1" />
        <HangingMarigoldGarland className="hidden sm:block w-80 h-auto -mt-1" />
      </div>

      {/* Fixed Parallax Corner Roses */}
      <motion.div
        style={{ y: topRoseY }}
        className="pointer-events-none fixed -top-8 -left-8 w-40 h-40 sm:w-56 sm:h-56 z-20 opacity-75"
      >
        <CornerRoseCluster className="w-full h-full" />
      </motion.div>

      <motion.div
        style={{ y: bottomRoseY }}
        className="pointer-events-none fixed -bottom-8 -right-8 w-44 h-44 sm:w-64 sm:h-64 z-20 opacity-75"
      >
        <CornerRoseCluster className="w-full h-full" flipX flipY />
      </motion.div>

      {/* Compact Floating Music Control (Top Right) */}
      <div className="fixed top-4 right-4 z-40">
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? 'Pause wedding music' : 'Play wedding music'}
          className="min-w-[44px] min-h-[44px] px-3.5 py-2 rounded-full bg-[#fdfaf7]/90 backdrop-blur-md border border-[#c59b49]/50 shadow-md text-[#6e1f2f] hover:bg-[#6e1f2f] hover:text-[#fdf8f5] transition-colors flex items-center gap-2 text-xs font-medium whitespace-nowrap cursor-pointer"
        >
          {musicPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#c59b49]" />
              <span className="hidden sm:inline">Music On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline">Music Off</span>
            </>
          )}
        </button>
      </div>

      {/* Opening Falling Rose Petals & Gold Shimmer */}
      {showPetals && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
          {petals.map((petal) => (
            <span
              key={petal.id}
              className="animate-petal-drift absolute top-0 rounded-tl-full rounded-br-full"
              style={
                {
                  left: `${petal.leftPct}%`,
                  width: `${petal.size}px`,
                  height: `${petal.size * 1.3}px`,
                  backgroundColor: petal.color,
                  animationDelay: `${petal.delaySec}s`,
                  '--drift-duration': `${petal.durationSec}s`,
                  '--drift-x': `${petal.driftX}px`,
                  '--drift-rot': `${petal.driftRot}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Continuous Seamless Luxury Invitation Flow */}
      <main className="relative z-10">
        <HeroInvitation />
        <PullToRevealScroll />
        <FestivitiesCarousel />
        <FamilyHostsSection />
        <GrandWalimaCard />
        <LocationAndRsvp />
      </main>
    </div>
  );
}
