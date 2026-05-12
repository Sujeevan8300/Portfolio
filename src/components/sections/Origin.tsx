import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const Origin = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-4 block animate-pulse">
            Chapter 1: The Beginning
          </span>
          <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter text-glow">
            Sujeevan Vijayendiran
          </h1>
          <p className="text-lg md:text-2xl font-light text-brand-muted max-w-2xl mx-auto tracking-wide">
            Full-Stack Software Engineer & System Architect
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-muted group-hover:text-white transition-colors">
              Begin Journey
            </span>
            <ChevronDown className="w-5 h-5 text-brand-muted group-hover:text-white animate-bounce transition-colors" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
