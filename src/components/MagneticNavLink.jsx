"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Cyberpunk / hacker characters
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

export const MagneticNavLink = ({ href, children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState(children);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Physical magnetic pull constraint
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovering(false);
  };

  useEffect(() => {
    let interval = null;
    if (isHovering) {
      let iteration = 0;
      interval = setInterval(() => {
        setText(
          children
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return children[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= children.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    } else {
      setText(children);
    }
    return () => clearInterval(interval);
  }, [isHovering, children]);

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative px-5 py-3 flex items-center justify-center text-xs font-bold tracking-widest uppercase text-blue-orbit-navy overflow-visible group"
    >
      <span className="relative z-10 text-center w-full min-w-[70px]">
        {text}
      </span>
      
      {/* Glitchy bounding box */}
      <motion.div 
        className="absolute inset-0 border border-blue-orbit-navy/0 group-hover:border-blue-orbit-navy/20 bg-blue-orbit-navy/0 group-hover:bg-blue-orbit-navy/5 -z-10 transition-colors duration-300"
      />
      
      {/* Tech corner brackets */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-orbit-navy/0 group-hover:border-blue-orbit-navy/80 transition-colors duration-300"></span>
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-orbit-navy/0 group-hover:border-blue-orbit-navy/80 transition-colors duration-300"></span>
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-orbit-navy/0 group-hover:border-blue-orbit-navy/80 transition-colors duration-300"></span>
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-orbit-navy/0 group-hover:border-blue-orbit-navy/80 transition-colors duration-300"></span>
    </motion.a>
  );
};
