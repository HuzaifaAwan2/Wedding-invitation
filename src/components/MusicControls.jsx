import React from 'react';
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';

export default function MusicControls({ music }) {
  const { available, playing, muted, error, toggle, toggleMute } = music;
  return <div className="music-control" aria-label="Background music controls">
    <button type="button" onClick={toggle} disabled={!available} aria-label={playing ? 'Pause music' : 'Play music'} title={available ? (playing ? 'Pause music' : 'Play music') : 'Add a music URL in src/config.js'}>{playing ? <Pause size={15}/> : <Play size={15}/>}</button>
    <button type="button" onClick={toggleMute} disabled={!available} aria-label={muted ? 'Unmute music' : 'Mute music'} title="Mute / unmute">{muted ? <VolumeX size={15}/> : <Volume2 size={15}/>}</button>
    <span><Music2 size={13}/>{error ? 'Audio unavailable' : available ? 'Our melody' : 'Music not set'}</span>
  </div>;
}
