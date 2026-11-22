import React, { useEffect, useState } from 'react';

function getTarget(event) {
  if (event.dateTime) {
    const parsed = new Date(event.dateTime);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  const [year, month, day] = event.date.split('-').map(Number);
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}
function getRemaining(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return { days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 };
}
export default function Countdown({ event }) {
  const target = getTarget(event);
  const [remaining, setRemaining] = useState(() => getRemaining(target));
  useEffect(() => {
    const tick = () => setRemaining(getRemaining(target));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [event.date, event.dateTime]);
  return <div className="countdown" aria-label="Countdown to event date">
    {Object.entries(remaining).map(([label, value]) => <div className="count-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
  </div>;
}
