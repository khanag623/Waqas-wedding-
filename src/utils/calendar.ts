import { WEDDING_DATA } from '../data/weddingData';

export function downloadWeddingCalendar(): void {
  const events = WEDDING_DATA.festivities
    .map((event) => {
      return [
        'BEGIN:VEVENT',
        `UID:${event.id}-abdul-waqas-2027@wedding.invite`,
        `DTSTAMP:20261125T000000Z`,
        `DTSTART:${event.startIso}`,
        `DTEND:${event.endIso}`,
        `SUMMARY:${event.title} — ${WEDDING_DATA.groomName} (Son of ${WEDDING_DATA.fatherHonorific})`,
        `DESCRIPTION:${event.description} Dress Code: ${event.dressCode}. Directions: ${WEDDING_DATA.mapsUrl}`,
        `LOCATION:${WEDDING_DATA.mapsUrl}`,
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Abdul Waqas Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Abdul-Waqas-Wedding-2027.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
