export interface FestivityEvent {
  id: 'mehndi' | 'baraat' | 'walima';
  title: string;
  urduSubtitle: string;
  dayName: string;
  dateDisplay: string;
  numericDate: string;
  timeDisplay: string;
  dressCode: string;
  dressSwatch: string;
  dressSwatchName: string;
  accentBg: string;
  accentText: string;
  description: string;
  startIso: string;
  endIso: string;
}

export const WEDDING_DATA = {
  bismillahArabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
  bismillahTranslit: 'In the Name of Allah, the Most Gracious, the Most Merciful',
  fatherTitle: 'Walid-e-Mohtaram (Father)',
  fatherPrefix: 'Abdul',
  fatherHonorific: 'Janab Abdul Qayum',
  groomName: 'Abdul Waqas',
  groomShortName: 'Waqas',
  groomRelation: 'Son of Janab Abdul Qayum',
  uncleTitle: 'Chacha-e-Mohtaram (Uncle)',
  uncleName: 'Janab Farooq Ahmad',
  brothersHeading: 'Brothers · Sons of Janab Abdul Qayum',
  brothers: [
    'Abdul Waqar',
    'Abdul Javed',
    'Abdul Ahmed',
    'Abdul Sarfaraz',
    'Abdul Fahad',
    'Abdul Shahzad',
  ],
  mapsUrl: 'https://maps.app.goo.gl/156dQruR4268KXD66',
  countdownTargetIso: '2027-01-25T18:00:00+05:30',
  dateSpanLabel: '25 – 27 January 2027',
  closingMessage: 'Your presence and heartfelt duas are the greatest gift we could ask for.',
  closingSignature: 'Janab Abdul Qayum, Farooq Ahmad & Family',
  festivities: [
    {
      id: 'mehndi',
      title: 'Mehndi Celebration',
      urduSubtitle: 'Shab-e-Mehndi',
      dayName: 'Monday',
      dateDisplay: '25 January 2027',
      numericDate: '25 · 01 · 2027',
      timeDisplay: '7:00 PM Onwards',
      dressCode: 'Emerald Green & Gold',
      dressSwatch: '#1f5c43',
      dressSwatchName: 'Emerald & Gold',
      accentBg: 'from-[#f4faf6] via-[#fcfaf6] to-[#f8efe9]',
      accentText: '#1b4d38',
      description:
        'An evening of warm melodies, henna artistry, marigold blooms, and joyful family gatherings.',
      startIso: '20270125T190000',
      endIso: '20270125T230000',
    },
    {
      id: 'baraat',
      title: 'Baraat & Nikah',
      urduSubtitle: 'Rasm-e-Baraat',
      dayName: 'Tuesday',
      dateDisplay: '26 January 2027',
      numericDate: '26 · 01 · 2027',
      timeDisplay: '7:30 PM Onwards',
      dressCode: 'Royal Wine & Champagne Gold',
      dressSwatch: '#6e1f2f',
      dressSwatchName: 'Wine & Gold',
      accentBg: 'from-[#fbf2f3] via-[#fdfaf7] to-[#f6e8df]',
      accentText: '#6e1f2f',
      description:
        'Join the royal Baraat procession and sacred Nikah ceremony as two families unite in blessing.',
      startIso: '20270126T193000',
      endIso: '20270126T235900',
    },
    {
      id: 'walima',
      title: 'Dawat-e-Walima',
      urduSubtitle: 'Grand Reception',
      dayName: 'Wednesday',
      dateDisplay: '27 January 2027',
      numericDate: '27 · 01 · 2027',
      timeDisplay: '8:00 PM Onwards',
      dressCode: 'Ivory, Rose & Antique Gold',
      dressSwatch: '#c59b49',
      dressSwatchName: 'Ivory & Gold',
      accentBg: 'from-[#fdf8f0] via-[#fdfaf7] to-[#f8ece6]',
      accentText: '#7a581d',
      description:
        'A gracious evening banquet hosted in honor of Abdul Waqas with dinner, warmth, and cherished company.',
      startIso: '20270127T200000',
      endIso: '20270127T233000',
    },
  ] satisfies FestivityEvent[],
};
