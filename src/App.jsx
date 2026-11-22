import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Flower2, Heart, MapPin, Sparkles } from 'lucide-react';
import { wedding } from './config.js';
import FallingFlowers from './components/FallingFlowers.jsx';
import Countdown from './components/Countdown.jsx';
import MusicControls from './components/MusicControls.jsx';
import Navigation from './components/Navigation.jsx';
import { useMusic } from './hooks/useMusic.js';

const GuestContext = createContext('');

const dateLabel = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase();
const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

function Ornament({ small = false }) { return <div className={`ornament ${small ? 'ornament-small' : ''}`} aria-hidden="true"><span/><i>✧</i><span/></div>; }
function CornerFlowers() { return <><div className="corner-flower top-left">❀</div><div className="corner-flower top-right">✿</div><div className="corner-flower bottom-left">✿</div><div className="corner-flower bottom-right">❀</div></>; }
/** Shrinks its content just enough to fit inside the card, so no screen is ever cropped. */
function Fit({ children }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i) return undefined;
    const measure = () => {
      const s = Math.min(1.6, (o.clientHeight - 2) / (i.offsetHeight || 1), (o.clientWidth - 2) / (i.scrollWidth || 1));
      setScale(prev => (Math.abs(prev - s) < 0.004 ? prev : s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o); ro.observe(i);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => ro.disconnect();
  }, []);
  return <div className="page-content" ref={outer}><div className="fit" ref={inner} style={{ transform: `scale(${scale})` }}>{children}</div></div>;
}
function PageFrame({ children, variant = '' }) { return <div className={`page-frame ${variant}`}><div className="page-border"><CornerFlowers/><Fit>{children}</Fit></div></div>; }
function Eyebrow({ children }) { return <div className="eyebrow"><span/>{children}<span/></div>; }

function CoverPage() { const name = useContext(GuestContext); return <PageFrame variant="cover-page"><div className="cover-top-mark">✧</div><Eyebrow>{wedding.familyWording}</Eyebrow><div className="cover-main"><h1>{wedding.groom}</h1><div className="cover-amp">&</div><h1>{wedding.bride}</h1></div><Ornament/>{name && <div className="guest-name">Dear {name},</div>}<p className="invitation-line">Mr. &amp; Mrs. Tahir Awan invite you to celebrate the wedding of their beloved daughter.</p><div className="cover-dates"><span>BARAAT · {dateLabel(wedding.BARAAT.date)}</span></div><div className="cover-footer">WITH JOY IN OUR HEARTS</div></PageFrame>; }
function BlessingPage() { return <PageFrame variant="blessing-page"><Eyebrow>A prayer for a blessed union</Eyebrow><div className="bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div><Ornament/><div className="dua-arabic" lang="ar" dir="rtl">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</div><p className="translation">“And among His signs is that He created for you spouses from among yourselves, that you may find comfort in them; and He placed between you affection and mercy.”</p><span className="verse-reference">— SURAH AR-RUM · 30:21</span><div className="urdu-copy" lang="ur" dir="rtl">اور اُس کی نشانیوں میں سے ہے کہ اُس نے تمہارے لیے تم ہی میں سے جوڑے بنائے تاکہ تم اُن سے سکون پاؤ، اور تمہارے درمیان محبت اور رحمت رکھ دی۔</div><p className="blessing-foot">May this union be filled with barakah, kindness and everlasting love.</p></PageFrame>; }
function CouplePage() { return <PageFrame variant="couple-page"><Eyebrow>Two hearts, one beautiful journey</Eyebrow><div className="couple-grid"><div className="person"><span className="person-label">THE GROOM</span><div className="person-flower">❧</div><h2>{wedding.groom}</h2></div><div className="couple-heart"><Heart size={24} strokeWidth={1}/><span>together</span></div><div className="person"><span className="person-label">THE BRIDE</span><div className="person-flower">❧</div><h2>{wedding.bride}</h2></div></div><Ornament/><p className="romantic-message">A promise of companionship, a lifetime of shared dreams, and a new chapter written with love.</p><p className="couple-urdu" lang="ur" dir="rtl">دو دل، ایک دعا، اور زندگی بھر کا خوبصورت سفر</p><div className="couple-bottom">WITH THE BLESSINGS OF OUR LOVED ONES</div></PageFrame>; }
function PunjabiPage() { return <PageFrame variant="punjabi-page"><Eyebrow>Khushiyan da sohna mauqa</Eyebrow><div className="punjabi-symbol">❁</div><h2 className="punjabi-quote">Khushiyan, mohabbat te duawan de naal,<br/>saanu tuhadi shirkat da besabri naal<br/>intizaar rahega!</h2><Ornament/><p className="urdu-copy punjabi-urdu" lang="ur" dir="rtl">خوشیوں، محبت اور دعاؤں کے ساتھ، ہمیں آپ کی شرکت کا بے صبری سے انتظار رہے گا!</p><p className="translation punjabi-translation">With happiness, love and prayers, we eagerly look forward to your presence and blessings.</p><div className="dhol-motif">✧ &nbsp; ✿ &nbsp; ✧</div><p className="punjabi-foot">A little celebration, a lot of love.</p></PageFrame>; }
function EventPage({ type, event }) { return <PageFrame variant="event-page BARAAT-page"><Eyebrow>Join us for the celebration</Eyebrow><div className="event-flourish">❧</div><h1 className="event-title">{type}</h1><div className="event-date">{dateLabel(event.date)}</div><Ornament/><p className="event-invite">We would be honoured by your presence<br/>as we celebrate this joyous occasion.</p><Countdown event={event}/><div className="event-meta"><div><span>TIME</span><strong>{event.time || 'Details to be announced'}</strong></div><div><span>VENUE</span><strong>{event.venue || 'Venue details will be shared soon'}</strong></div></div>{event.address && <p className="event-address">{event.address}</p>}{event.extra && <p className="event-extra">{event.extra}</p>}<div className="event-bottom">Afzaal &amp; BINT-E-TAHIR</div></PageFrame>; }
function VenueBlock({ title, event }) { const hasDetails = event.venue || event.address; return <section className="venue-block"><div className="venue-icon"><MapPin size={19}/></div><div className="venue-info"><span className="venue-event">{title}</span><h3>{event.venue || 'Venue details will be shared soon.'}</h3>{event.address && <p>{event.address}</p>}{event.time && <p className="venue-time">{event.time}</p>}{hasDetails && <div className="venue-links">{event.mapsUrl && <a href={event.mapsUrl} target="_blank" rel="noreferrer">View on Google Maps <ArrowUpRight size={13}/></a>}{event.directionsUrl && <a href={event.directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13}/></a>}</div>}</div></section>; }
function VenuePage() { return <PageFrame variant="venue-page"><Eyebrow>We look forward to welcoming you</Eyebrow><h1 className="venue-heading">The Venue</h1><p className="venue-subtitle">Where we will celebrate together</p><div className="venue-list"><VenueBlock title={`${dateLabel(wedding.BARAAT.date)} · BARAAT`} event={wedding.BARAAT}/></div><p className="venue-note">Please check this page for location updates.</p></PageFrame>; }
function ClosingPage({ onRestart }) { const name = useContext(GuestContext); return <PageFrame variant="closing-page"><div className="closing-top">✧</div><Eyebrow>Until we celebrate together</Eyebrow><div className="closing-flower">❀</div><h1 className="closing-title">Thank You</h1><Ornament/><p className="closing-message">Your presence will make our celebration even more special.</p><p className="closing-regards">{wedding.closingWording}</p><h2>{wedding.groom} <span>&</span><br/>{wedding.bride}</h2><p className="closing-last">{name ? `Looking forward to celebrating with you, ${name}!` : 'Looking forward to celebrating with you!'}</p><button className="restart-button" onClick={onRestart}><span>Replay invitation</span><span>↗</span></button></PageFrame>; }

const pages = [CoverPage, BlessingPage, CouplePage, PunjabiPage, () => <EventPage type="BARAAT" event={wedding.BARAAT}/>, VenuePage, ClosingPage];
const TOTAL = pages.length;

const ROD = 22;      // width of each wooden rod
const ROLLED = 0;   // width of the paper while it is rolled up

/** Works out how big the scroll can be on this screen (never wider than 700px, never taller than the space available). */
function useBookSize(ref) {
  const [size, setSize] = useState(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const bw = el.clientWidth, bh = el.clientHeight;
      const avail = bh - 32; // room for the rods to stick out top and bottom
      const w = Math.round(Math.max(250, Math.min(bw - 8, 700, avail * 1.25)));
      const h = Math.round(Math.max(260, Math.min(avail, w / 0.6)));
      setSize(prev => (prev && prev.w === w && prev.h === h && prev.bh === bh ? prev : { w, h, bh }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

const Rod = () => <div className="rod" aria-hidden="true"/>;

/** A scroll invitation that unrolls sideways. Closed = rolled up with a seal; open = the current page. */
function Scroll({ size, opened, pageKey, onOpen, name, children }) {
  const paperW = size.w - ROD * 2;
  const closedH = Math.max(170, Math.min(270, size.bh - 310));
  return <motion.div className={`scroll ${opened ? '' : 'is-closed'}`} initial={false} animate={{ height: opened ? size.h : closedH }} transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }} onClick={opened ? undefined : onOpen}>
    <Rod/>
    <AnimatePresence mode="wait" initial={false}>
      {opened
        ? <motion.div key={pageKey} className="scroll-paper" initial={{ width: ROLLED }} animate={{ width: paperW }} exit={{ width: ROLLED }} transition={{ duration: .62, ease: [0.65, 0, 0.35, 1] }}>
            <div className="invitation-card" style={{ width: paperW }}>{children}</div>
          </motion.div>
        : <motion.div key="closed" className="scroll-paper rolled" initial={false} animate={{ width: ROLLED }} exit={{ width: ROLLED }}><div className="ribbon"/></motion.div>}
    </AnimatePresence>
    <Rod/>
    <AnimatePresence>
      {!opened && <>
        <motion.div key="top" className="scroll-top" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: .12 } }} transition={{ duration: .7, delay: .2 }}>
          <Eyebrow>A celebration of love</Eyebrow>
          <h1 className="scroll-title">{name ? `Dear ${name}` : 'A beautiful beginning'}</h1>
          <p className="scroll-sub">You are warmly invited</p>
        </motion.div>
        <motion.button key="seal" type="button" className="scroll-seal" onClick={onOpen} aria-label="Open your invitation" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .2, rotate: 25 }} whileHover={{ scale: 1.07 }} whileTap={{ scale: .94 }} transition={{ duration: .5 }}>
          <span>A<i>&amp;</i>B</span>
        </motion.button>
        <motion.div key="hint" className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .12 } }} transition={{ duration: .7, delay: .4 }}>
          <span className="instruction-line"/><span>Tap the seal to open your invitation</span><span className="instruction-line"/>
        </motion.div>
      </>}
    </AnimatePresence>
  </motion.div>;
}

function NamePopup({ initial, onSubmit }) {
  const [value, setValue] = useState(initial);
  const submit = e => { e.preventDefault(); const v = value.trim().replace(/\s+/g, ' '); if (v) onSubmit(v); };
  return <motion.div className="name-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>
    <motion.form className="name-card" role="dialog" aria-modal="true" aria-labelledby="name-title" onSubmit={submit} initial={{ opacity: 0, y: 26, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: .97 }} transition={{ duration: .6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="name-ornament" aria-hidden="true">✧</div>
      <Eyebrow>Welcome</Eyebrow>
      <h2 id="name-title">Your invitation awaits</h2>
      <p>Please tell us your name so we can personalise your invitation.</p>
      <input className="name-input" type="text" dir="auto" autoFocus autoComplete="name" maxLength={40} value={value} onChange={e => setValue(e.target.value)} placeholder="Your name" aria-label="Your name"/>
      <button className="name-button" type="submit" disabled={!value.trim()}>Continue</button>
    </motion.form>
  </motion.div>;
}

export default function App() {
  const [name, setName] = useState(null); // null until the guest has entered their name
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const music = useMusic(wedding.musicUrl, wedding.musicVolume);
  const bookRef = useRef(null);
  const size = useBookSize(bookRef);
  const prefill = (() => { try { return (new URLSearchParams(window.location.search).get('name') || '').slice(0, 40); } catch { return ''; } })();

  const next = useCallback(() => setPage(p => Math.min(TOTAL - 1, p + 1)), []);
  const back = useCallback(() => setPage(p => Math.max(0, p - 1)), []);
  const openInvitation = () => { setOpened(true); setPage(0); music.start(); }; // music starts from the guest's tap
  const restart = () => { setOpened(false); setPage(0); music.stop(); };
  useEffect(() => {
    const onKey = e => {
      if (!opened) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); back(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [opened, next, back]);

  const Page = pages[page];
  return <GuestContext.Provider value={name || ''}><div className="experience-shell"><div className="ambient-glow"/><FallingFlowers/>
    <header className="site-chrome"><div className="monogram">A<span>&</span>B</div><div className="chrome-caption">A WEDDING CELEBRATION <i>·</i> 2026</div><MusicControls music={music}/></header>
    <main className="invitation-stage">
      <div className="book" ref={bookRef}>
        {size && <Scroll size={size} opened={opened} pageKey={page} onOpen={openInvitation} name={name}>{page === TOTAL - 1 ? <ClosingPage onRestart={restart}/> : <Page/>}</Scroll>}
      </div>
      {opened && <Navigation page={page} total={TOTAL} onBack={back} onNext={next} onRestart={restart}/>}
      {opened && <div className="keyboard-hint">USE ← → TO TURN THE PAGES</div>}
    </main>
    <footer className="site-footer"><span>MADE WITH LOVE</span><span>✧</span><span>Afzaal &amp; BINT-E-TAHIR</span></footer>
    <AnimatePresence>{name === null && <NamePopup key="name" initial={prefill} onSubmit={setName}/>}</AnimatePresence>
  </div></GuestContext.Provider>;
}
