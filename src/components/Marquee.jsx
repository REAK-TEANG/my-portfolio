import React from 'react';

/** A tilted strip of washi tape with scrolling text. */
export default function Marquee({
  items,
  color = 'bg-accent-yellow',
  rotate = -1.5,
  reverse = false,
  className = '',
}) {
  // Repeat twice so the -50% loop is seamless
  const row = [...items, ...items];
  return (
    <div className={`relative z-20 overflow-hidden py-6 ${className}`} aria-hidden="true">
      <div
        className={`${color} border-y-2 border-ink py-2 shadow-[0_4px_0_0_#2b2a29]`}
        style={{ transform: `rotate(${rotate}deg) scale(1.04)` }}
      >
        <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {row.map((t, i) => (
                <span key={`${dup}-${i}`} className="flex items-center font-display text-xl md:text-2xl uppercase whitespace-nowrap">
                  <span className="px-6">{t}</span>
                  <span className="text-accent-pink">✿</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
