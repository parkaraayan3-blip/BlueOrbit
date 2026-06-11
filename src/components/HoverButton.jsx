"use client";

import { motion } from 'framer-motion';

export const HoverButton = ({ children, href, className = '', variant = 'dark', 'aria-label': ariaLabel }) => {
  const isDark = variant === 'dark';
  const baseClasses = isDark 
    ? "bg-blue-orbit-navy text-white hover:text-black" 
    : "border border-blue-orbit-border text-blue-orbit-navy hover:text-white";
    
  const fillClasses = isDark 
    ? "bg-white" 
    : "bg-blue-orbit-navy";

  return (
    <a 
      href={href}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      className={`btn-animate-chars rounded-soft px-6 py-3 font-medium ${baseClasses} ${className} group`}
    >
      <div className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] rounded-soft ${fillClasses} w-0 group-hover:w-full z-0`}></div>
      <span data-button-animate-chars className="relative z-10 flex">
        {children}
      </span>
    </a>
  );
};
