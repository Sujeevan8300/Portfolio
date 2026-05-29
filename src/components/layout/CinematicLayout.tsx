import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useSpring } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { DataHighway } from '../background/DataHighway';

export const FilmGrain = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence 
          type="fractalNoise" 
          baseFrequency="0.65" 
          numOctaves="3" 
          stitchTiles="stitch" 
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

export const CinematicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-black">
      {/* 3D Global Background */}
      <DataHighway />
      
      <FilmGrain />
      <div className="fixed inset-0 pointer-events-none cinematic-vignette z-40" />
      
      {/* Cinematic Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-white origin-left z-[100] opacity-30" 
        style={{ scaleX }}
      />
      
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};
