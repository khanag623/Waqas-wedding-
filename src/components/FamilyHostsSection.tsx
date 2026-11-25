import React from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';

export function FamilyHostsSection() {
  return (
    <section id="family" className="relative py-20 px-5 sm:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl border border-[#c59b49]/40 bg-[#fdfaf7]/90 px-6 py-10 sm:px-12 sm:py-14 shadow-[0_18px_45px_-22px_rgba(110,31,47,0.16)]"
      >
        {/* Subtle inner border */}
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#c59b49]/20" />

        <div className="relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-[#7a581d] font-medium">
            With Warm Regards From
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#6e1f2f] mt-2">
            Family &amp; Hosts
          </h2>

          {/* Patriarch / Father & Uncle Row */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 pb-9 border-b border-[#c59b49]/25">
            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a581d] font-medium">
                {WEDDING_DATA.fatherTitle}
              </p>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#6e1f2f]">
                {WEDDING_DATA.fatherHonorific}
              </p>
              <p className="text-xs text-[#5d3f45]">
                Respected Father &amp; Host of the Celebration
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a581d] font-medium">
                {WEDDING_DATA.uncleTitle}
              </p>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#6e1f2f]">
                {WEDDING_DATA.uncleName}
              </p>
              <p className="text-xs text-[#5d3f45]">
                Esteemed Uncle &amp; Family Elder
              </p>
            </div>
          </div>

          {/* Groom & Brothers (All bearing Father's Name Abdul in front) */}
          <div className="mt-9">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a581d] font-medium">
              {WEDDING_DATA.brothersHeading}
            </p>
            <p className="text-xs text-[#5d3f45] mt-1">
              Soliciting your gracious presence &amp; blessings
            </p>

            {/* Groom Featured Center */}
            <div className="mt-6 mb-7">
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#7a581d] block mb-1">
                The Groom
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#6e1f2f]">
                {WEDDING_DATA.groomName}
              </p>
            </div>

            {/* Brothers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 max-w-2xl mx-auto pt-6 border-t border-[#c59b49]/20">
              {WEDDING_DATA.brothers.map((brother) => (
                <div key={brother} className="py-1.5">
                  <p className="font-serif text-lg sm:text-xl font-medium text-[#2d161b]">
                    {brother}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
