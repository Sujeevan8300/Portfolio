import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Milestone, Award } from 'lucide-react';

const ExperienceCard = ({ title, company, period, highlights, side = 'left' }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className={`relative mb-24 grid md:grid-cols-[1fr_2px_1fr] gap-12 items-center`}
  >
    <div className={`${side === 'right' ? 'md:order-3' : ''} text-${side}`}>
      <span className="text-sm font-mono text-white/40 mb-2 block">{period}</span>
      <h3 className="text-3xl font-bold mb-1">{company}</h3>
      <p className="text-xl text-white/70 mb-6">{title}</p>
      <div className={`flex flex-wrap gap-2 ${side === 'right' ? 'justify-end' : ''}`}>
        {highlights.map((h: string) => (
          <span key={h} className="text-[10px] uppercase font-bold tracking-widest border border-white/10 px-3 py-1 rounded bg-white/5">
            {h}
          </span>
        ))}
      </div>
    </div>

    <div className="hidden md:flex flex-col items-center justify-center h-full relative">
      <div className="w-[2px] h-full bg-white/10" />
      <div className="absolute w-4 h-4 bg-white rounded-full blur-[4px] z-10" />
    </div>

    <div className="hidden md:block" />
  </motion.div>
);

export const RealWorld = () => {
  return (
    <section className="relative py-40 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 block"
          >
            Chapter 4: Real World
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter"
          >
            The Mission Archive
          </motion.h2>
        </div>

        <div className="relative">
          <ExperienceCard 
            side="left"
            company="Invicta Innovations (Pvt.) Ltd."
            title="Software Engineer"
            period="Present"
            highlights={["Spring Boot", "React", "Redux Toolkit", "JOOQ", "Azure Blob"]}
          />
          <ExperienceCard 
            side="right"
            company="SGIC"
            title="Intern Software Engineer (Backend Lead)"
            period="Previous"
            highlights={["Team Leadership", "REST APIs", "JWT", "ERD Design"]}
          />
        </div>
      </div>
    </section>
  );
};
