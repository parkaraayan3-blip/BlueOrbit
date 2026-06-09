import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-blue-orbit-border py-6 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-blue-orbit-navy group-hover:text-blue-orbit-blue transition-colors duration-300">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-blue-orbit-slate ml-6 shrink-0"
        >
          <ChevronDown size={28} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 text-xl text-blue-orbit-slate leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
