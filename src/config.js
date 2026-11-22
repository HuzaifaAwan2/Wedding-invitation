/** Edit wedding details here. Dates use YYYY-MM-DD and countdowns target local midnight
 * in the visitor's timezone unless an explicit ISO date-time is supplied. */

// Builds standard Google Maps links from a place description. If you have the exact Google Maps
// link for the hall (Share > Copy link), paste it into mapsUrl / directionsUrl below instead.
const mapsSearch = place => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
const mapsDirections = place => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}`;

const BARAATPlace = 'Sundas Marriage Hall, Saifabad No 1, Gali No 10';

export const wedding = {
  groom: 'Afzaal Awan',
  bride: 'Bint-E-Tahir Awan',
  BARAAT: {
    date: '2026-12-26',
    time: '12:00 PM – 4:00 PM', // BARAAT timing
    venue: 'Sundas Marriage Hall',
    address: 'Saifabad No. 1, Gali No. 10',
    extra: '',
    mapsUrl: mapsSearch(BARAATPlace),
    directionsUrl: mapsDirections(BARAATPlace),
    dateTime: '2026-12-26T12:00:00' // Countdown targets the BARAAT start time
  },
  musicUrl: '/assets/wedding-nasheed.mp3', // File in public/assets. Leave '' to turn music off.
  musicVolume: 0.2, // 0 to 1 — kept low so it stays a soft background.
  familyWording: 'Together with their families',
  closingWording: 'With love and warm regards'
};
