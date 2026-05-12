import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Database, Server, Cloud, Code } from 'lucide-react';

const SystemNode = ({ icon: Icon, title, desc, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8 }}
    className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] backdrop-blur-xl relative group overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <Icon className="w-12 h-12 mb-6 text-white/40 group-hover:text-white transition-colors" />
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-brand-muted font-light leading-relaxed">{desc}</p>
  </motion.div>
);

export const TheSystem = () => {
  return (
    <section className="relative py-40 overflow-hidden">
       <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 block"
          >
            Chapter 3: The System
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter"
          >
            Architectural Mastery
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Lines (SVG) - Visible on desktop */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0 hidden md:block" />
          
          <SystemNode 
            icon={Code} 
            title="Frontend" 
            desc="React, Redux Toolkit, Atomic Design patterns for stateful experiences."
            delay={0.1}
          />
          <SystemNode 
            icon={Server} 
            title="Backend" 
            desc="Spring Boot, REST APIs, layered architecture for clean system flow."
            delay={0.2}
          />
          <SystemNode 
            icon={Database} 
            title="Database" 
            desc="MySQL, PostgreSQL optimization with normalized schemas."
            delay={0.3}
          />
          <SystemNode 
            icon={Cloud} 
            title="Cloud" 
            desc="Microsoft Azure, Azure Blob Storage for enterprise media handling."
            delay={0.4}
          />
        </div>

        {/* Narrative subtitle */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-32 text-center"
        >
          <p className="text-brand-muted italic font-light max-w-xl mx-auto">
            "Software is not just code; it's a living ecosystem where data flow defines reality."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
