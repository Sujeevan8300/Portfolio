import React from 'react';
import { motion } from 'motion/react';

export const Builder = () => {
  const words = [
    "Scalable", "Backend", "Systems", "Enterprise", "Architecture", "Performance"
  ];

  return (
    <section className="relative min-h-screen py-32 flex items-center bg-black/50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 block"
          >
            Chapter 2: The Builder
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8"
          >
            I design APIs that power <span className="text-white/40 italic">real-world</span> applications.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-brand-muted leading-relaxed font-light"
          >
            With a focus on clean architecture and performance, I transform complex requirements into 
            orchestrated digital systems. Every line of code is a pixel in a larger masterpiece of engineering.
          </motion.p>
        </div>

        <div className="relative">
          <div className="flex flex-wrap gap-4">
            {words.map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="px-6 py-3 border border-white/10 rounded-full text-sm font-display tracking-widest uppercase hover:bg-white hover:text-black transition-all cursor-crosshair"
              >
                {word}
              </motion.div>
            ))}
          </div>
          
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
};
