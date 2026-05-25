import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Layers, ShieldCheck, Database } from 'lucide-react';
const hms1 = 'https://res.cloudinary.com/de8o6u3zw/image/upload/v1779702463/HMS1_svwthy.png';
const hms2 = 'https://res.cloudinary.com/de8o6u3zw/image/upload/v1779702465/HMS2_slp5be.png';

export const Creations = () => {
  return (
    <section id="projects" className="relative py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs uppercase tracking-[0.5em] text-brand-muted mb-6 block"
            >
              Chapter 5: Creations
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter"
            >
              Feature Presentation
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-muted max-w-sm mb-4"
          >
            Detailed cinematic breakdown of flagship enterprise applications.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative group rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-12 space-y-8">
              <div>
                <h3 className="text-4xl font-bold mb-4">Hotel Management System</h3>
                <p className="text-brand-muted leading-relaxed font-light">
                  A comprehensive enterprise solution for modern hospitality. Built with a focus on high-availability, 
                  security, and seamless user experiences.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-muted" />
                  <span className="text-sm font-mono opacity-60">JWT Security</span>
                </div>
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-brand-muted" />
                  <span className="text-sm font-mono opacity-60">Layered Arch</span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-brand-muted" />
                  <span className="text-sm font-mono opacity-60">Azure Storage</span>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-black rounded-lg font-bold flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> View Showcase
                </motion.button>
                <a 
                  href="https://github.com/Sujeevan8300/Hotel_Management_System.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="relative h-[400px] md:h-auto bg-gradient-to-br from-white/5 to-transparent overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-full min-h-[400px] flex items-center justify-center p-8 group">
                <motion.img 
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  src={hms2} 
                  alt="Hotel Management System Application Screen 2" 
                  className="absolute w-[65%] object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 z-10 translate-x-8 translate-y-8 group-hover:translate-x-12 group-hover:translate-y-12 transition-transform duration-500"
                />
                <motion.img 
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8 }}
                  src={hms1} 
                  alt="Hotel Management System Application Screen 1" 
                  className="absolute w-[65%] object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 z-20 -translate-x-8 -translate-y-8 group-hover:-translate-x-12 group-hover:-translate-y-12 transition-transform duration-500 hover:z-30 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
