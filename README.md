# Afzaal & Bint-E-Tahir — Wedding Invitation

A responsive, seven-page interactive Pakistani wedding invitation built with React, Vite, Framer Motion and Lucide icons.

## Requirements
- Node.js 18.18+ (or a current LTS release)
- npm

## Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`. Deploy the contents of that folder to any static hosting provider that supports single-page applications.

## Customize wedding details

All core wedding information is centralized in `src/config.js`:

- Groom and bride names
- BARAAT date
- Event times
- Venue names and addresses
- Additional event notes
- Google Maps and directions URLs
- Music URL
- Family and closing wording

Dates use `YYYY-MM-DD`. The BARAAT countdown targets **12:00 PM on 26 December 2026** in the visitor's local timezone. The event time displayed on the invitation is **12:00 PM–4:00 PM**.

The BARAAT venue (Sundas Marriage Hall, Saifabad No. 1, Gali No. 10) is already set in `src/config.js`. Its Google Maps and directions links are generated from that name and address; if you have the exact Google Maps share link, paste it into `mapsUrl` / `directionsUrl` for a precise pin. The BARAAT time is already configured as 12:00 PM–4:00 PM.

Leave venue fields blank until confirmed; the invitation will show the editable “Venue details will be shared soon” placeholder. Add a full address and optional URLs only after the details are known.

## Background music

Your track is included at `public/assets/wedding-nasheed.mp3` and set in `src/config.js`:

```js
musicUrl: '/assets/wedding-nasheed.mp3',
musicVolume: 0.2, // 0 to 1 — lower is softer
```

It loops, fades in slowly, and starts only when the guest taps the seal (browsers do not allow music before a tap). The play/pause and mute buttons are in the top-right corner. Music stops when the invitation is replayed or the page is left. To change the track, replace the file or point `musicUrl` at another file; set it to `''` to turn music off. Please make sure you have the right to use the recording.

## Guest name

When the page opens, a popup asks for the guest's name. The name is shown on the scroll, on the cover page and on the closing page. You can also send personalised links that pre-fill the name, for example `https://your-site.com/?name=Ahmed%20Khan` (the guest still confirms it in the popup).

## Interaction
- Enter your name in the welcome popup, then tap the seal to unroll the scroll.
- Use the Back and Next controls or keyboard arrow keys to navigate; each page change rolls the scroll up and opens it again.
- The page counter shows the current page out of seven.
- Use Replay on the final page to roll the scroll back up.
- Falling petals remain active across the experience and are disabled for visitors who prefer reduced motion.

## Typography and language
English and Latin-script text use Cormorant Garamond and DM Sans. Arabic uses Amiri, and Urdu uses Noto Nastaliq Urdu with right-to-left direction. The fonts are loaded from Google Fonts; for fully offline/self-hosted deployment, download and self-host the font files and update `index.html`.

## Notes
- No venue, address, event time, phone number or map location has been fabricated.
- The countdown default is the beginning of the configured calendar date in the visitor's local timezone.
- The music URL is intentionally blank until you supply an original or licensed recording.
- The project includes source files and build configuration; install dependencies before running or building.
