"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HoverButton } from './HoverButton';
import { MagneticNavLink } from './MagneticNavLink';

export const TechNavbar = ({ isScrolled }) => {
  const navRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.header 
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="border-b border-blue-orbit-border/30 luxury-glass fixed top-0 left-0 right-0 z-50 bg-blue-orbit-warm-white/90 overflow-hidden"
        >
          {/* Flashlight Mouse Tracker Effect */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(26,77,148,0.08), transparent 40%)`
            }}
          />

          <div className="max-w-[1440px] mx-auto px-6 py-2 flex justify-between items-center relative z-10">
            <a href="/" className="flex items-center gap-2 cursor-pointer overflow-visible">
              <img src={`/logo1.png`} alt="Blue Orbit Logo" className="h-12 md:h-16 w-auto object-contain scale-[1.6] origin-left drop-shadow-sm" />
            </a>
            
            <nav className="hidden md:flex gap-2 text-sm font-medium">
              {['Services', 'Portfolio', 'Team', 'Process', 'FAQ'].map((item) => (
                <MagneticNavLink key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}>
                  {item}
                </MagneticNavLink>
              ))}
            </nav>

            <HoverButton href="#contact" variant="dark" className="text-xs tracking-widest uppercase px-5 py-2.5">
              Consultation
            </HoverButton>
          </div>
          
          {/* Animated bottom scanline */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[1px] bg-blue-orbit-navy/40"
            animate={{ 
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ width: '30%' }}
          />
        </motion.header>
      )}
    </AnimatePresence>
  );
};
