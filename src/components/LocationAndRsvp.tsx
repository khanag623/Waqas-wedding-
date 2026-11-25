import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, Share2, Send } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { IllustratedMapGraphic, RoyalCrestMedallion } from './OrnamentArtwork';

interface RsvpEntry {
  id: string;
  name: string;
  events: string[];
  blessing: string;
}

const STORAGE_KEY = 'abdul_waqas_wedding_rsvps_v1';

export function LocationAndRsvp() {
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['Baraat', 'Walima']);
  const [blessing, setBlessing] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries] = useState<RsvpEntry[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setEntries(parsed);
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  const handleCopyMapLink = async () => {
    try {
      await navigator.clipboard.writeText(WEDDING_DATA.mapsUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    }
  };

  const toggleEvent = (eventTitle: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventTitle) ? prev.filter((item) => item !== eventTitle) : [...prev, eventTitle]
    );
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    if (!trimmedName) return;

    const newEntry: RsvpEntry = {
      id: `${Date.now()}`,
      name: trimmedName,
      events: selectedEvents.length > 0 ? selectedEvents : ['Walima'],
      blessing: blessing.trim(),
    };

    const nextEntries = [newEntry, ...entries].slice(0, 6);
    setEntries(nextEntries);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
    } catch {
      // Ignore storage write errors
    }

    setSubmitted(true);
    setGuestName('');
    setBlessing('');
  };

  const shareText = encodeURIComponent(
    `With the blessings of ${WEDDING_DATA.fatherHonorific}, you are cordially invited to the wedding celebrations of ${WEDDING_DATA.groomName}!\n\n` +
      `• Mehndi: 25 January 2027\n` +
      `• Baraat: 26 January 2027\n` +
      `• Walima: 27 January 2027\n\n` +
      `Venue Location: ${WEDDING_DATA.mapsUrl}`
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <>
      {/* Section 7: Location & Venue Directions */}
      <section id="location" className="relative py-20 px-5 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#7a581d] font-medium">
            Venue &amp; Directions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#6e1f2f]">
            How to Reach
          </h2>
          <p className="text-xs sm:text-sm text-[#5d3f45]">
            Tap the map card or button below to open live navigation in Google Maps.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[#c59b49]/45 bg-[#fdfaf7] overflow-hidden shadow-[0_22px_52px_-20px_rgba(110,31,47,0.18)]"
        >
          {/* Interactive Illustrated Map Card */}
          <a
            href={WEDDING_DATA.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open wedding venue location in Google Maps"
            className="group relative block h-52 sm:h-64 w-full overflow-hidden border-b border-[#c59b49]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6e1f2f]"
          >
            <IllustratedMapGraphic />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#2d161b]/70 via-[#2d161b]/25 to-transparent flex items-end justify-between">
              <div className="text-left text-[#fdf8f5]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#ebd6a7] font-medium">
                  Wedding Venue
                </p>
                <p className="font-serif text-base sm:text-lg font-medium flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#ebd6a7] shrink-0" />
                  <span>Tap to Open in Google Maps</span>
                </p>
              </div>
              <span className="text-xs font-medium text-[#fdf8f5] bg-[#6e1f2f]/90 px-3.5 py-1.5 rounded-full border border-[#ebd6a7]/40 group-hover:bg-[#6e1f2f] transition-colors whitespace-nowrap shrink-0">
                Open Map
              </span>
            </div>
          </a>

          {/* Venue Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="text-center sm:text-left space-y-1">
              <p className="font-serif text-xl font-semibold text-[#6e1f2f]">
                Celebration Venue · Google Maps
              </p>
              <p className="text-xs text-[#5d3f45] break-all">
                {WEDDING_DATA.mapsUrl}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={WEDDING_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#6e1f2f] text-[#fdf8f5] hover:bg-[#5a1726] transition-colors flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium whitespace-nowrap shrink-0"
              >
                <Navigation className="w-4 h-4 text-[#ebd6a7]" />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMapLink}
                className="min-h-[44px] px-5 py-2.5 rounded-full border border-[#c59b49]/60 bg-[#fdfaf7] hover:bg-[#f7eae4] text-[#6e1f2f] transition-colors flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1f5c43]" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#9f7930]" />
                    <span>Copy Map Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 8: RSVP, Duas & Share */}
      <section id="rsvp" className="relative py-14 px-5 sm:px-8 max-w-3xl mx-auto">
        <div className="rounded-3xl border border-[#c59b49]/40 bg-[#fdfaf7]/90 p-6 sm:p-10 shadow-[0_18px_45px_-22px_rgba(110,31,47,0.14)]">
          <div className="text-center space-y-2 mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7a581d] font-medium">
              Kindly Respond
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#6e1f2f]">
              RSVP &amp; Blessings
            </h2>
            <p className="text-xs sm:text-sm text-[#5d3f45]">
              Let the family know which celebrations you will grace with your presence.
            </p>
          </div>

          <form onSubmit={handleSubmitRsvp} className="space-y-5 max-w-lg mx-auto">
            <div>
              <label htmlFor="guest-name" className="block text-xs uppercase tracking-[0.16em] text-[#7a581d] font-medium mb-2">
                Your Name
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  if (submitted) setSubmitted(false);
                }}
                placeholder="Enter your full name"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-[#c59b49]/45 bg-white text-sm text-[#2d161b] placeholder:text-[#9c8287] focus:outline-none focus:border-[#6e1f2f]"
              />
            </div>

            <div>
              <span className="block text-xs uppercase tracking-[0.16em] text-[#7a581d] font-medium mb-2">
                Attending Celebrations
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {['Mehndi', 'Baraat', 'Walima'].map((fn) => {
                  const active = selectedEvents.includes(fn);
                  return (
                    <button
                      key={fn}
                      type="button"
                      onClick={() => toggleEvent(fn)}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-colors border whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#6e1f2f] text-[#fdf8f5] border-[#6e1f2f]'
                          : 'bg-white text-[#5d3f45] border-[#c59b49]/40 hover:border-[#6e1f2f]/50'
                      }`}
                    >
                      {fn}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="guest-blessing" className="block text-xs uppercase tracking-[0.16em] text-[#7a581d] font-medium mb-2">
                Warm Wishes or Dua (Optional)
              </label>
              <textarea
                id="guest-blessing"
                rows={2}
                value={blessing}
                onChange={(e) => setBlessing(e.target.value)}
                placeholder="Write a heartfelt message for Abdul Waqas & family..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#c59b49]/45 bg-white text-sm text-[#2d161b] placeholder:text-[#9c8287] focus:outline-none focus:border-[#6e1f2f]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto min-h-[46px] px-7 py-2.5 rounded-full bg-[#6e1f2f] text-[#fdf8f5] hover:bg-[#5a1726] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#ebd6a7]" />
                <span>Confirm Attendance</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-full border border-[#c59b49]/60 bg-[#fdfaf7] hover:bg-[#f7eae4] text-[#6e1f2f] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] font-medium whitespace-nowrap shrink-0"
              >
                <Share2 className="w-4 h-4 text-[#9f7930]" />
                <span>Share via WhatsApp</span>
              </a>
            </div>

            {submitted && (
              <p className="text-center text-xs sm:text-sm text-[#1f5c43] font-medium pt-1">
                JazakAllah Khair! Your RSVP and warm wishes have been noted.
              </p>
            )}
          </form>

          {entries.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#c59b49]/25 max-w-lg mx-auto space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7a581d] font-medium text-center">
                Recent Guest Wishes
              </p>
              <div className="space-y-2.5">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="py-2.5 px-4 rounded-xl bg-[#faf3ec]/80 border border-[#c59b49]/20 text-left"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[#6e1f2f]">{entry.name}</span>
                      <span className="text-[#7a581d]">{entry.events.join(' · ')}</span>
                    </div>
                    {entry.blessing && (
                      <p className="text-xs text-[#5d3f45] mt-1 italic">&ldquo;{entry.blessing}&rdquo;</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Closing Section */}
      <footer className="relative py-20 px-5 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-5">
          <RoyalCrestMedallion size={68} tone="gold" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#6e1f2f]">
          We Cannot Wait to Celebrate With You
        </h2>
        <p className="text-xs sm:text-sm text-[#5d3f45] mt-3 leading-relaxed max-w-md mx-auto">
          {WEDDING_DATA.closingMessage}
        </p>
        <div className="w-16 h-px bg-[#c59b49]/50 mx-auto my-6" />
        <p className="font-serif italic text-lg text-[#6e1f2f]">
          With Love &amp; Warm Regards,
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-[#7a581d] font-medium mt-1.5">
          {WEDDING_DATA.closingSignature}
        </p>
      </footer>
    </>
  );
}
