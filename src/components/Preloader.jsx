import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += Math.floor(Math.random() * 10) + 1;
      if (currentCount > 100) currentCount = 100;
      
      setCount(currentCount);

      if (currentCount === 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800); // Hold at 100% for a moment before completing
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] bg-blue-orbit-navy text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 noise-overlay opacity-10"></div>
      
      <div className="flex flex-col items-center justify-center relative z-10 w-full px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-heading font-bold uppercase tracking-widest mb-8 text-white/50"
        >
          Blue Orbit Studio
        </motion.div>
        
        <div className="text-[12rem] md:text-[18rem] font-bold font-heading leading-none tracking-tighter flex items-end">
          {count}
          <span className="text-4xl md:text-6xl mb-6 md:mb-12 ml-2">%</span>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-10 right-10 flex justify-between text-xs font-bold uppercase tracking-widest text-white/50"
      >
        <span>Loading Experience</span>
        <span>Please Wait</span>
      </motion.div>
    </motion.div>
  );
};
