import React from 'react';
import { motion } from 'motion/react';
import { Trophy, GraduationCap, Award } from 'lucide-react';

export const Milestones = () => {
  const items = [
    {
      icon: Award,
      title: "Best Backend Developer",
      org: "SGIC",
      desc: "Recognized for exceptional leadership and high-quality API design."
    },
    {
      icon: GraduationCap,
      title: "BSc (Hons) Software Engineering",
      org: "Cardiff Metropolitan University",
      desc: "Second Class Upper Division Honors."
    },
    {
      icon: Trophy,
      title: "EDU Expo Participant",
      org: "ICBT",
      desc: "Showcasing technical innovation in enterprise systems."
    }
  ];

  return (
    <section className="relative py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 block"
          >
            Chapter 6: Milestones
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter"
          >
            Cinematic Flashbacks
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="p-10 border border-white/10 rounded-2xl bg-white/[0.02] flex flex-col items-center text-center group hover:bg-white/5 transition-all"
            >
              <div className="mb-8 p-6 rounded-full bg-white/5 group-hover:bg-white text-brand-muted group-hover:text-black transition-all">
                <item.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm uppercase tracking-widest text-white/40 mb-4">{item.org}</p>
              <p className="text-brand-muted font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
