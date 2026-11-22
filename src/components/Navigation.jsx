import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
export default function Navigation({ page, total, onBack, onNext, onRestart }) {
  return <div className="navigation">
    <button type="button" className="nav-button" onClick={onBack} disabled={page === 0} aria-label="Previous page"><ArrowLeft size={17}/><span>Back</span></button>
    <div className="page-status"><span>{String(page + 1).padStart(2, '0')}</span><i/><span>{String(total).padStart(2, '0')}</span></div>
    {page === total - 1 ? <button type="button" className="nav-button next-button" onClick={onRestart}><span>Replay</span><RotateCcw size={16}/></button> : <button type="button" className="nav-button next-button" onClick={onNext}><span>Next</span><ArrowRight size={17}/></button>}
  </div>;
}
