import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import developerVideo from '../../assets/Developer_coding.mp4';

gsap.registerPlugin(ScrollTrigger);

type Phase = 'night' | 'coding' | 'building' | 'success';

const CODING_LOGS = [
  '> git clone https://github.com/sujeevan/portfolio.git',
  '> npm install --production',
  '> Resolving 847 packages...',
  '> TypeScript compiler: watching files...',
  '> Hot module replacement enabled',
  '> Writing production-ready backend systems...',
  '> REST API endpoints initialized',
  '> Database connection pool established',
];

const BUILD_LOGS = [
  '> Building system architecture...',
  '> Compiling TypeScript → JavaScript',
  '> Tree-shaking unused modules...',
  '> Compiling backend services...',
  '> Running database migrations: OK',
  '> Health checks: API ✓  DB ✓  Cache ✓',
  '> Deploying application to production...',
  '> Container registry: push complete',
  '> ✔ Deployment pipeline complete',
];

export const HeroJourney = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ─────────────────────────────────────────────────────────
  // SCROLL TRIGGER & PINNING
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=5000', // Scroll 5000px total (4000px animation + 1000px hold)
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────
  // HYBRID AUTO-PLAY / SCRUB LOGIC
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    let autoPlayTween: gsap.core.Tween | null = null;
    let resumeTimeout: NodeJS.Timeout;

    const startAutoPlay = () => {
      const currentScroll = window.scrollY;
      const targetScroll = 4000; // Auto-play up to the end of the animation phase
      
      if (currentScroll >= targetScroll) return;

      // Calculate remaining duration (total 18s for full 4000px)
      const remainingRatio = Math.max(0, 1 - (currentScroll / targetScroll));
      const duration = 18 * remainingRatio;

      const proxy = { y: currentScroll };
      autoPlayTween = gsap.to(proxy, {
        y: targetScroll,
        duration: duration,
        ease: "none",
        onUpdate: () => {
          window.scrollTo(0, proxy.y);
        }
      });
    };

    const initialDelay = setTimeout(() => startAutoPlay(), 800);

    const handleUserInteraction = () => {
      // User took control -> kill auto-play immediately
      if (autoPlayTween) {
        autoPlayTween.kill();
        autoPlayTween = null;
      }
      clearTimeout(initialDelay);
      clearTimeout(resumeTimeout);

      // Resume auto-play if they stop interacting for 1.5 seconds
      resumeTimeout = setTimeout(() => {
        startAutoPlay();
      }, 1500);
    };

    // Listen to all forms of scrolling
    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });

    return () => {
      if (autoPlayTween) autoPlayTween.kill();
      clearTimeout(initialDelay);
      clearTimeout(resumeTimeout);
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // ─────────────────────────────────────────────────────────
  // DERIVE STATE FROM SCROLL PROGRESS (0 to 1)
  // ─────────────────────────────────────────────────────────
  
  // Map the 5000px total scroll to just the first 4000px (0.8 of total) for the animation
  // The remaining 0.8 to 1.0 acts as a "hold" where nothing changes, giving users time to view the final state.
  const animProgress = Math.min(1, scrollProgress / 0.8);
  
  let phase: Phase = 'night';
  if (animProgress > 0.90) phase = 'success';
  else if (animProgress > 0.55) phase = 'building';
  else if (animProgress > 0.20) phase = 'coding';

  // Night Phase (0.0 to 0.2)
  const bootFull = 'Initializing Developer Environment...';
  const bootText = animProgress < 0.20 
    ? bootFull.slice(0, Math.floor((animProgress / 0.20) * bootFull.length))
    : bootFull;

  // Coding Phase (0.2 to 0.55)
  const codingFull = 'Writing production-ready backend systems...';
  let codingProgress = 0;
  if (animProgress > 0.20) {
    codingProgress = Math.min(1, (animProgress - 0.20) / 0.35);
  }
  const codingText = animProgress <= 0.20 ? '' 
    : codingFull.slice(0, Math.floor(codingProgress * codingFull.length));

  // Terminal Logs
  let logs: string[] = [];
  if (phase === 'coding') {
    const logIdx = Math.floor(codingProgress * CODING_LOGS.length);
    logs = CODING_LOGS.slice(0, logIdx + 1);
  } else if (phase === 'building') {
    const buildP = (animProgress - 0.55) / 0.35;
    const logIdx = Math.floor(buildP * BUILD_LOGS.length);
    logs = BUILD_LOGS.slice(0, logIdx + 1);
  }

  // Building Progress (0.55 to 0.90)
  let buildProgressPercent = 0;
  if (animProgress > 0.55) {
    buildProgressPercent = Math.min(100, Math.floor(((animProgress - 0.55) / 0.35) * 100));
  }

  const showSuccess = animProgress > 0.90;
  const showReveal = animProgress > 0.95;

  const phaseColor: Record<Phase, string> = {
    night: 'rgba(0,5,25,0.65)',
    coding: 'rgba(0,8,30,0.55)',
    building: 'rgba(0,10,38,0.45)',
    success: 'rgba(0,12,42,0.35)',
  };

  const phaseAccent: Record<Phase, string> = {
    night: 'text-blue-400',
    coding: 'text-cyan-400',
    building: 'text-purple-400',
    success: 'text-emerald-400',
  };

  const phaseDot: Record<Phase, string> = {
    night: 'bg-blue-400',
    coding: 'bg-cyan-400',
    building: 'bg-purple-400',
    success: 'bg-emerald-400',
  };

  const phaseLabel: Record<Phase, string> = {
    night: 'System Boot',
    coding: 'Active Development',
    building: 'Build Pipeline',
    success: 'Deployed',
  };

  return (
    <section ref={containerRef} className="hero-root relative h-screen flex items-center justify-center overflow-hidden">

      {/* ── VIDEO BACKGROUND ── */}
      <video
        src={developerVideo}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'saturate(0.8) brightness(0.85)' }}
      />

      {/* ── GRID OVERLAY ── */}
      <div className="hero-grid absolute inset-0 z-[1] pointer-events-none" />

      {/* ── COLOR GRADE ── */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        animate={{ backgroundColor: phaseColor[phase] }}
        transition={{ duration: 0.5 }}
      />

      {/* ── AMBIENT GLOWS ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        <motion.div
          className="hero-glow-orb hero-glow-orb--cyan"
          animate={{ opacity: phase === 'success' ? 1 : 0.5, scale: phase === 'success' ? 1.3 : 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="hero-glow-orb hero-glow-orb--purple"
          animate={{ opacity: phase === 'building' || phase === 'success' ? 1 : 0.4, scale: phase === 'success' ? 1.4 : 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* ── SUCCESS GLOW RING ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="hero-success-ring absolute inset-0 z-[4] pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">

        {/* Phase Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-2 mb-8 text-xs font-mono uppercase tracking-[0.35em] ${phaseAccent[phase]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${phaseDot[phase]}`} />
            {phaseLabel[phase]}
          </motion.div>
        </AnimatePresence>

        {/* Phase Main Text */}
        <AnimatePresence mode="wait">

          {/* NIGHT */}
          {phase === 'night' && !showSuccess && (
            <motion.div key="night" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }} className="text-center mb-6">
              <p className="font-mono text-blue-200 text-sm md:text-base tracking-widest min-h-[1.5em]">
                {bootText}
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }}>█</motion.span>
              </p>
            </motion.div>
          )}

          {/* CODING */}
          {phase === 'coding' && !showSuccess && (
            <motion.div key="coding" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }} className="text-center mb-6">
              <p className="font-mono text-cyan-200 text-sm md:text-base tracking-widest min-h-[1.5em]">
                {codingText}
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>█</motion.span>
              </p>
            </motion.div>
          )}

          {/* BUILDING */}
          {phase === 'building' && !showSuccess && (
            <motion.div key="building" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }} className="text-center mb-6">
              <p className="font-mono text-purple-200 text-sm md:text-base tracking-widest min-h-[1.5em]">
                Building system architecture...
              </p>
            </motion.div>
          )}

          {/* SUCCESS */}
          {showSuccess && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-6">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full hero-success-badge">
                <span className="text-emerald-400 text-lg">✔</span>
                <span className="font-mono text-emerald-300 text-xs md:text-sm tracking-[0.25em] uppercase">
                  System Successfully Deployed
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal Log Panel */}
        <AnimatePresence>
          {(phase === 'coding' || phase === 'building') && !showSuccess && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4 }}
              className="hero-terminal w-full max-w-2xl mb-5 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="font-mono text-[10px] text-white/25 ml-2 tracking-widest">terminal — zsh</span>
              </div>
              <div className="space-y-[3px] min-h-[88px]">
                {logs.map((log, i) => (
                  <motion.p
                    key={`${i}-${log}`}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`font-mono text-xs leading-relaxed ${
                      log.includes('✔') ? 'text-emerald-400' :
                      log.startsWith('>') ? 'text-cyan-300' : 'text-white/70'
                    }`}
                  >{log}</motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Build Progress Bar */}
        <AnimatePresence>
          {phase === 'building' && !showSuccess && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl mb-6"
            >
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-[10px] text-purple-300/50 uppercase tracking-widest">Build Progress</span>
                <span className="font-mono text-[10px] text-purple-300/50">{buildProgressPercent}%</span>
              </div>
              <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full hero-progress-bar"
                  style={{ width: `${buildProgressPercent}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final Reveal: Name + Role + CTAs */}
        <AnimatePresence>
          {showReveal && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="hero-name text-5xl md:text-8xl font-bold tracking-tighter mb-3"
              >
                Sujeevan Vijayendiran
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-sm md:text-lg font-light text-cyan-300/90 tracking-[0.3em] uppercase mb-10"
              >
                Full-Stack Software Engineer
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <a href="#projects" id="hero-cta-projects" className="hero-btn hero-btn--primary">
                  View Projects
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#contact" id="hero-cta-contact" className="hero-btn hero-btn--secondary">
                  Contact
                </a>
                <a href="https://github.com/sujeevan8300" target="_blank" rel="noreferrer"
                  id="hero-cta-github" className="hero-btn hero-btn--ghost">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll hint - Updates dynamically based on progress */}
      <AnimatePresence>
        {!showReveal && (
          <motion.div
            key="scroll-hint-active"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/50">
              {scrollProgress > 0 ? `Scrubbing... ${Math.floor(scrollProgress * 100)}%` : 'Scroll to deploy'}
            </span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-white/80 to-transparent"
              style={{ scaleY: 1 - scrollProgress, transformOrigin: 'top' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

