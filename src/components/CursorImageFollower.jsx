import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorImageFollower = ({ projects }) => {
  const [activeImage, setActiveImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full pb-32">
      {/* Floating Image Container */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] aspect-[4/3] pointer-events-none z-50 overflow-hidden hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
      >
        <div className="w-full h-full relative">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 w-full h-full bg-blue-orbit-navy transition-opacity duration-500 flex items-center justify-center text-white ${
                activeImage === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="border border-white/20 p-8 w-[90%] h-[90%] flex items-center justify-center font-bold text-center">
                {project.title} Preview
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* The Text List */}
      <div className="flex flex-col border-t border-blue-orbit-border relative z-20">
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="group py-8 md:py-12 border-b border-blue-orbit-border flex flex-col md:flex-row justify-between items-start md:items-center relative hover:bg-blue-orbit-navy transition-colors duration-500 px-6"
            onMouseEnter={() => {
              setActiveImage(idx);
              setIsVisible(true);
            }}
            onMouseLeave={() => {
              setIsVisible(false);
            }}
          >
            <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center">
              <h3 className="text-4xl md:text-7xl font-bold tracking-tighter text-blue-orbit-navy group-hover:text-white transition-colors duration-500 mb-2 md:mb-0">
                {project.title}
              </h3>
              <p className="text-lg md:text-2xl text-blue-orbit-slate group-hover:text-white/60 transition-colors duration-500">
                {project.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
