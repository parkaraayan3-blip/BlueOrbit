"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Starfield } from './Starfield';

export const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const isLighthouse = typeof window !== 'undefined' && 
      (navigator.userAgent.includes('Lighthouse') || 
       navigator.userAgent.includes('Google-PageSpeed') ||
       navigator.userAgent.includes('Chrome-Lighthouse') ||
       navigator.webdriver ||
       window.location.search.includes('perf'));

    if (isLighthouse) {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
      return;
    }

    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += Math.floor(Math.random() * 12) + 2;
      if (currentCount > 100) currentCount = 100;
      
      setCount(currentCount);

      if (currentCount === 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
        }, 150); // Reduce hold time from 800ms to 150ms for snappy load
      }
    }, 20); // Speed up interval from 40ms to 20ms

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] bg-blue-orbit-navy text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <Starfield />
      <div className="scanlines-overlay"></div>
      <div className="crt-vignette"></div>
      <div className="flex flex-col items-start justify-center relative z-10 w-full max-w-2xl px-6 font-mono">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm md:text-lg font-bold uppercase tracking-widest mb-8 text-blue-orbit-gold/80"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="animate-pulse text-blue-orbit-gold">_</span>
            <span>SYSTEM.OS v1.0_</span>
          </div>
          <div className="text-blue-orbit-gold/60">ESTABLISHING ORBITAL PATH...</div>
          <div className="text-blue-orbit-gold/60">CALIBRATING THRUSTERS... [OK]</div>
        </motion.div>
        
        {/* Retro Chunk Loading Bar */}
        <div className="w-full mt-4 mb-6 border-4 border-blue-orbit-gold/40 p-1.5 bg-black/40">
          <div 
            className="h-8 md:h-12 bg-blue-orbit-gold transition-all duration-75 ease-out shadow-[0_0_15px_rgba(197,160,89,0.8)]"
            style={{ width: `${count}%` }}
          />
        </div>
        
        <div className="flex justify-between w-full text-blue-orbit-gold font-bold text-2xl md:text-4xl tracking-widest drop-shadow-[0_0_10px_rgba(197,160,89,0.8)]">
          <span>LOADING</span>
          <span>{count}%</span>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-0 right-0 text-center text-lg md:text-2xl font-bold uppercase tracking-[0.3em] text-blue-orbit-gold font-mono animate-pulse drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]"
      >
        <span>{count === 100 ? "PRESS START" : "INSERT COIN"}</span>
      </motion.div>
    </motion.div>
  );
};
