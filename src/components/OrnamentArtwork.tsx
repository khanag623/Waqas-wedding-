import React from 'react';

export function RoyalCrestMedallion({
  size = 96,
  tone = 'gold',
  className = '',
}: {
  size?: number;
  tone?: 'gold' | 'lightGold';
  className?: string;
}) {
  const strokeMain = tone === 'lightGold' ? '#f1d99f' : '#c59b49';
  const strokeSoft = tone === 'lightGold' ? '#d9b872' : '#9f7930';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`crestGrad-${tone}`} x1="15" y1="10" x2="105" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f5e2b5" />
          <stop offset="50%" stopColor={strokeMain} />
          <stop offset="100%" stopColor={strokeSoft} />
        </linearGradient>
      </defs>

      {/* Outer scalloped octagonal halo */}
      <circle cx="60" cy="60" r="52" stroke={`url(#crestGrad-${tone})`} strokeWidth="1.2" strokeDasharray="2 3" opacity="0.8" />
      <circle cx="60" cy="60" r="46" stroke={`url(#crestGrad-${tone})`} strokeWidth="1.5" />

      {/* Mughal pointed arch inside */}
      <path
        d="M34 86V54C34 41 44 33 60 25C76 33 86 41 86 54V86"
        stroke={`url(#crestGrad-${tone})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M39 86V56C39 45.5 47 38.5 60 31.5C73 38.5 81 45.5 81 56V86"
        stroke={`url(#crestGrad-${tone})`}
        strokeWidth="0.9"
        opacity="0.7"
      />

      {/* Crown finial & delicate crescent */}
      <path d="M60 15L62.5 20.5L60 24L57.5 20.5L60 15Z" fill={`url(#crestGrad-${tone})`} />
      <circle cx="60" cy="12" r="2" fill={`url(#crestGrad-${tone})`} />

      {/* Botanical side sprigs */}
      <path d="M24 60C28 56 28 64 24 60Z" fill={`url(#crestGrad-${tone})`} />
      <path d="M96 60C92 56 92 64 96 60Z" fill={`url(#crestGrad-${tone})`} />

      {/* Monogram AW */}
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill={`url(#crestGrad-${tone})`}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '23px',
          fontWeight: 600,
          letterSpacing: '0.06em',
        }}
      >
        AW
      </text>

      {/* Base flourish */}
      <path d="M36 88H84" stroke={`url(#crestGrad-${tone})`} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="60" cy="94" r="2.2" fill={`url(#crestGrad-${tone})`} />
    </svg>
  );
}

export function CornerRoseCluster({
  className = '',
  flipX = false,
  flipY = false,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const transform = `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`;

  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="roseWine" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#b94c62" />
          <stop offset="55%" stopColor="#822538" />
          <stop offset="100%" stopColor="#4f1220" />
        </radialGradient>
        <radialGradient id="roseBlush" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fdf1ed" />
          <stop offset="60%" stopColor="#ecc7be" />
          <stop offset="100%" stopColor="#cf9489" />
        </radialGradient>
        <linearGradient id="goldLeaf" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ebd39f" />
          <stop offset="100%" stopColor="#9f7930" />
        </linearGradient>
      </defs>

      {/* Trailing gold stems */}
      <path d="M10 15C55 30 105 55 158 18" stroke="url(#goldLeaf)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M18 10C30 62 55 112 22 168" stroke="url(#goldLeaf)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Leaves */}
      <path d="M88 32C102 14 126 16 132 28C115 40 98 40 88 32Z" fill="#6f8064" opacity="0.72" />
      <path d="M34 92C16 106 18 130 30 136C42 119 42 102 34 92Z" fill="#6f8064" opacity="0.72" />
      <path d="M122 46C140 36 158 46 156 58C140 62 128 56 122 46Z" fill="url(#goldLeaf)" opacity="0.55" />
      <path d="M52 122C42 140 52 158 64 156C68 140 62 128 52 122Z" fill="url(#goldLeaf)" opacity="0.55" />

      {/* Main wine rose */}
      <g transform="translate(54 54)">
        <circle cx="0" cy="0" r="32" fill="url(#roseWine)" opacity="0.92" />
        <path d="M-22 -8C-10 -24 14 -24 22 -8C14 8 -12 8 -22 -8Z" fill="#9c354a" opacity="0.85" />
        <path d="M-16 10C-6 -4 14 -4 20 12C8 24 -10 22 -16 10Z" fill="#6a1b2c" opacity="0.9" />
        <path d="M-10 -4C-2 -14 10 -12 12 -2C6 6 -6 6 -10 -4Z" fill="#c86578" opacity="0.75" />
        <circle cx="0" cy="0" r="6" fill="#46111c" />
      </g>

      {/* Secondary blush rose */}
      <g transform="translate(114 34)">
        <circle cx="0" cy="0" r="21" fill="url(#roseBlush)" />
        <path d="M-13 -4C-6 -14 8 -14 14 -3C8 7 -7 7 -13 -4Z" fill="#f7dfd8" />
        <path d="M-8 6C-2 -3 8 -2 10 7C4 14 -5 13 -8 6Z" fill="#d3968c" opacity="0.8" />
        <circle cx="0" cy="1" r="4" fill="#b46e66" />
      </g>

      {/* Lower blush bud */}
      <g transform="translate(32 114)">
        <circle cx="0" cy="0" r="18" fill="url(#roseBlush)" />
        <path d="M-10 -2C-4 -11 7 -10 11 -1C5 7 -6 7 -10 -2Z" fill="#f9e6e0" />
        <circle cx="0" cy="0" r="4" fill="#bd7870" />
      </g>

      {/* Gold berry pearls */}
      <circle cx="146" cy="24" r="3.5" fill="url(#goldLeaf)" />
      <circle cx="158" cy="32" r="2.5" fill="url(#goldLeaf)" />
      <circle cx="24" cy="152" r="3.5" fill="url(#goldLeaf)" />
      <circle cx="34" cy="164" r="2.5" fill="url(#goldLeaf)" />
    </svg>
  );
}

export function HangingMarigoldGarland({ className = '' }: { className?: string }) {
  const strands = [14, 34, 54, 74, 94];

  return (
    <svg
      viewBox="0 0 400 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Draped golden thread */}
      <path
        d="M0 6C50 28 100 28 150 6C200 28 250 28 300 6C350 28 380 24 400 10"
        stroke="#c59b49"
        strokeWidth="1.4"
        opacity="0.7"
      />
      {strands.map((xPct, idx) => {
        const cx = xPct * 3.8;
        const dropLen = idx % 2 === 0 ? 44 : 34;
        return (
          <g key={xPct} className="animate-gentle-sway" style={{ animationDelay: `${idx * 0.4}s` }}>
            <line x1={cx} y1="16" x2={cx} y2={dropLen} stroke="#c59b49" strokeWidth="1" opacity="0.8" />
            <circle cx={cx} cy={dropLen - 12} r="6.5" fill="#e69a2c" />
            <circle cx={cx} cy={dropLen - 12} r="3.5" fill="#f6c768" />
            <circle cx={cx} cy={dropLen} r="5.5" fill="#d97b1e" />
            <circle cx={cx} cy={dropLen + 8} r="2.2" fill="#c59b49" />
          </g>
        );
      })}
    </svg>
  );
}

export function FestivityIllustration({ type }: { type: 'mehndi' | 'baraat' | 'walima' }) {
  if (type === 'mehndi') {
    return (
      <svg viewBox="0 0 280 120" className="w-full h-28" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="mehndiGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5c451" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f5c451" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="62" rx="95" ry="48" fill="url(#mehndiGlow)" />
        {/* Mandala bloom */}
        <circle cx="140" cy="60" r="34" stroke="#2c6e51" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="140" cy="60" r="24" stroke="#c59b49" strokeWidth="1.4" />
        <path d="M140 28L147 47L166 47L151 59L157 78L140 67L123 78L129 59L114 47L133 47Z" fill="#e9a23b" opacity="0.85" />
        <circle cx="140" cy="60" r="8" fill="#1f5c43" />
        {/* Marigold garlands left/right */}
        <circle cx="62" cy="48" r="9" fill="#eb9f31" opacity="0.85" />
        <circle cx="74" cy="64" r="7" fill="#d97f21" opacity="0.8" />
        <circle cx="218" cy="48" r="9" fill="#eb9f31" opacity="0.85" />
        <circle cx="206" cy="64" r="7" fill="#d97f21" opacity="0.8" />
        {/* Leaves */}
        <path d="M46 74C54 62 72 64 76 78C62 84 50 82 46 74Z" fill="#2f6f51" opacity="0.65" />
        <path d="M234 74C226 62 208 64 204 78C218 84 230 82 234 74Z" fill="#2f6f51" opacity="0.65" />
      </svg>
    );
  }

  if (type === 'baraat') {
    return (
      <svg viewBox="0 0 280 120" className="w-full h-28" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="baraatGlow" cx="50%" cy="52%" r="52%">
            <stop offset="0%" stopColor="#d9b872" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#6e1f2f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="140" cy="64" rx="95" ry="48" fill="url(#baraatGlow)" />
        {/* Royal Mughal arch silhouette */}
        <path
          d="M88 104V58C88 40 108 28 140 16C172 28 192 40 192 58V104"
          stroke="#6e1f2f"
          strokeWidth="2"
          fill="#6e1f2f"
          fillOpacity="0.06"
        />
        <path
          d="M100 104V62C100 47 115 37 140 27C165 37 180 47 180 62V104"
          stroke="#c59b49"
          strokeWidth="1.4"
        />
        {/* Hanging lantern inside arch */}
        <line x1="140" y1="27" x2="140" y2="48" stroke="#c59b49" strokeWidth="1.3" />
        <path d="M130 56L140 46L150 56L146 74H134L130 56Z" fill="#d9b872" stroke="#6e1f2f" strokeWidth="1.2" />
        <circle cx="140" cy="62" r="4" fill="#fff4d6" />
        {/* Side finials */}
        <circle cx="62" cy="64" r="5" fill="#6e1f2f" opacity="0.6" />
        <circle cx="218" cy="64" r="5" fill="#6e1f2f" opacity="0.6" />
        <path d="M52 96H228" stroke="#c59b49" strokeWidth="1.2" opacity="0.65" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 120" className="w-full h-28" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="walimaGlow" cx="50%" cy="45%" r="52%">
          <stop offset="0%" stopColor="#ebd39f" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ebd39f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="140" cy="58" rx="96" ry="48" fill="url(#walimaGlow)" />
      {/* Grand chandelier */}
      <line x1="140" y1="8" x2="140" y2="28" stroke="#9f7930" strokeWidth="1.5" />
      <path d="M104 42C116 56 164 56 176 42" stroke="#c59b49" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M116 54C126 68 154 68 164 54" stroke="#c59b49" strokeWidth="1.4" strokeLinecap="round" />
      {[104, 122, 140, 158, 176].map((cx, i) => (
        <g key={cx}>
          <line x1={cx} y1={i === 2 ? 28 : 42} x2={cx} y2={i === 2 ? 44 : 52} stroke="#9f7930" strokeWidth="1" />
          <circle cx={cx} cy={i === 2 ? 26 : 38} r="3.5" fill="#fff4d6" stroke="#c59b49" strokeWidth="1" />
          <path d={`M${cx} ${i === 2 ? 72 : 58} L${cx - 3} ${i === 2 ? 80 : 65} L${cx} ${i === 2 ? 86 : 70} L${cx + 3} ${i === 2 ? 80 : 65} Z`} fill="#ebd39f" />
        </g>
      ))}
      <path d="M72 96C106 88 174 88 208 96" stroke="#6e1f2f" strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

export function IllustratedMapGraphic() {
  return (
    <svg viewBox="0 0 420 210" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="420" height="210" fill="#fbf3ec" />
      {/* Subtle architectural grid lines */}
      <path d="M0 55H420M0 115H420M0 165H420" stroke="#e9d8cc" strokeWidth="1" />
      <path d="M75 0V210M165 0V210M255 0V210M345 0V210" stroke="#e9d8cc" strokeWidth="1" />

      {/* Soft park & avenue blocks */}
      <rect x="28" y="26" width="84" height="52" rx="10" fill="#efe2d7" opacity="0.7" />
      <rect x="292" y="128" width="96" height="56" rx="10" fill="#efe2d7" opacity="0.7" />
      <circle cx="165" cy="115" r="24" fill="#f3e4d7" stroke="#dfc7b2" strokeWidth="1.2" />

      {/* Secondary roads */}
      <path d="M18 175C80 140 120 132 165 115C220 94 285 110 398 48" stroke="#e1c7ad" strokeWidth="8" strokeLinecap="round" />

      {/* Animated Golden Route */}
      <path
        d="M54 166C108 134 146 122 198 102C248 82 280 94 316 68"
        stroke="#c59b49"
        strokeWidth="3"
        strokeDasharray="6 6"
        strokeLinecap="round"
        className="animate-route-dash"
      />

      {/* Starting marker */}
      <circle cx="54" cy="166" r="6" fill="#6e1f2f" opacity="0.85" />
      <circle cx="54" cy="166" r="2.5" fill="#fdf8f5" />

      {/* Destination pin */}
      <g transform="translate(316 68)">
        <circle cx="0" cy="0" r="22" fill="#6e1f2f" opacity="0.1" />
        <circle cx="0" cy="0" r="13" fill="#6e1f2f" opacity="0.18" />
        <path
          d="M0 -36C-10.5 -36 -19 -27.5 -19 -17C-19 -4.5 0 8 0 8C0 8 19 -4.5 19 -17C19 -27.5 10.5 -36 0 -36Z"
          fill="#6e1f2f"
          stroke="#ebd39f"
          strokeWidth="2"
        />
        <circle cx="0" cy="-17" r="6" fill="#f7e6bd" />
      </g>

      {/* Ornamental compass rose */}
      <g transform="translate(366 164)" opacity="0.65">
        <circle cx="0" cy="0" r="18" stroke="#c59b49" strokeWidth="1" />
        <path d="M0 -14L3 -3L14 0L3 3L0 14L-3 3L-14 0L-3 -3Z" fill="#c59b49" />
      </g>
    </svg>
  );
}
