import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Looping background music.
 * - Never starts by itself: `start()` must be called from a tap/click (browser autoplay rules).
 * - Volume is applied through a Web Audio gain node, because iPhones ignore `audio.volume`.
 * - Fades in slowly and out gently; pauses when the tab is hidden or the page is left.
 */
export function useMusic(src, volume = 0.2) {
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const timerRef = useRef(null);
  const resumeOnShow = useRef(false);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(false);

  const setPlayingBoth = (v) => {
    playingRef.current = v;
    setPlaying(v);
  };

  useEffect(() => {
    if (!src) return undefined;
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.onerror = () => setError(true);
    audioRef.current = audio;
    return () => {
      clearTimeout(timerRef.current);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
      ctxRef.current?.close?.().catch(() => {});
      ctxRef.current = null;
      gainRef.current = null;
    };
  }, [src]);

  const rampTo = useCallback((target, seconds, done) => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    clearTimeout(timerRef.current);
    if (ctx && gain) {
      const t = ctx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(gain.gain.value, t);
      gain.gain.linearRampToValueAtTime(target, t + seconds);
    } else if (audioRef.current) {
      audioRef.current.volume = target; // fallback when Web Audio is unavailable
    }
    if (done) timerRef.current = setTimeout(done, seconds * 1000);
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        try {
          const ctx = new Ctx();
          const gain = ctx.createGain();
          gain.gain.value = 0;
          ctx.createMediaElementSource(audio).connect(gain);
          gain.connect(ctx.destination);
          ctxRef.current = ctx;
          gainRef.current = gain;
        } catch {
          audio.volume = 0;
        }
      } else {
        audio.volume = 0;
      }
    }
    ctxRef.current?.resume?.();
    audio
      .play()
      .then(() => {
        setError(false);
        setPlayingBoth(true);
        rampTo(volume, 5); // slow, gentle fade-in
      })
      .catch(() => {
        setError(true);
        setPlayingBoth(false);
      });
  }, [rampTo, volume]);

  const pause = useCallback(() => {
    setPlayingBoth(false);
    rampTo(0, 0.8, () => audioRef.current?.pause());
  }, [rampTo]);

  const stop = useCallback(() => {
    setPlayingBoth(false);
    resumeOnShow.current = false;
    rampTo(0, 0.8, () => {
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
    });
  }, [rampTo]);

  const toggle = useCallback(() => (playingRef.current ? pause() : play()), [pause, play]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        if (playingRef.current) {
          resumeOnShow.current = true;
          audio.pause();
          setPlayingBoth(false);
        }
      } else if (resumeOnShow.current) {
        resumeOnShow.current = false;
        play();
      }
    };
    const onLeave = () => audioRef.current?.pause();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onLeave);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onLeave);
    };
  }, [play]);

  return { available: Boolean(src), playing, muted, error, start: play, stop, toggle, toggleMute };
}
