import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    // Check for interactive elements hover
    const handleInteractiveEnter = () => setIsHovering(true);
    const handleInteractiveLeave = () => setIsHovering(false);
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleInteractiveEnter);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractiveEnter);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isHovering ? 'transparent' : 'white',
        border: isHovering ? '2px solid white' : 'none',
        scale: isHovering ? 1.5 : 1,
      }}
    />
  );
};
