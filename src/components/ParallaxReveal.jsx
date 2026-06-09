import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxReveal = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  
  // Track scroll position relative to this element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // The Clip Path wipes from 0 height to 100% height as we scroll into view
  const clipPathY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const clipPath = useTransform(clipPathY, (val) => `inset(${val}% 0 0 0)`);
  
  // The content inside scales down slightly as it comes into view (cinematic zoom out)
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.3, 1]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ clipPath }}
        className="w-full h-full relative"
      >
        <motion.div 
          style={{ scale }}
          className="w-full h-full origin-center"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
