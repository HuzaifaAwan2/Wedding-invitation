import React from 'react';

const petals = ['✿', '❀', '✽', '✾', '❁', '·'];
export default function FallingFlowers() {
  const flowers = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 11) % 100}%`,
    delay: `${-((i * 1.73) % 24)}s`,
    duration: `${17 + (i % 8) * 2.3}s`,
    size: `${10 + (i % 5) * 4}px`,
    drift: `${(i % 2 ? 1 : -1) * (20 + (i % 4) * 15)}px`,
    symbol: petals[i % petals.length]
  }));
  return <div className="petal-layer" aria-hidden="true">{flowers.map(f => <span key={f.id} className="petal" style={{ left: f.left, animationDelay: f.delay, animationDuration: f.duration, fontSize: f.size, '--drift': f.drift }}>{f.symbol}</span>)}</div>;
}
