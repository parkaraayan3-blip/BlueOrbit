"use client";

import { useEffect, useState } from 'react';

export const Starfield = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars on the client to avoid hydration mismatch
    const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 5
    }));
    setStars(generatedStars);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60 mix-blend-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle {
          0%, 100% { opacity: var(--star-opacity); transform: scale(1); }
          50% { opacity: calc(var(--star-opacity) * 0.15); transform: scale(0.5); }
        }
        .star-element {
          animation: twinkle var(--star-duration) ease-in-out var(--star-delay) infinite;
          will-change: transform, opacity;
        }
      `}} />
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-element absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--star-opacity': star.opacity,
            '--star-duration': `${star.duration}s`,
            '--star-delay': `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
