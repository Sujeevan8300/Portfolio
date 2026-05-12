import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export const FinalScene = () => {
  return (
    <footer className="relative py-40 flex items-center justify-center bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 text-glow">
            End Credits.
          </h2>
          
          <div className="space-y-12 mb-24">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-brand-muted italic">Produced by</p>
              <p className="text-2xl font-medium">Sujeevan Vijayendiran</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-brand-muted italic">Directed by</p>
              <p className="text-2xl font-medium">Clean Architecture Principles</p>
            </div>

             <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-brand-muted italic">Filmed in</p>
              <p className="text-2xl font-medium">Jaffna, Sri Lanka</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-12 pt-12 border-t border-white/5">
            <div className="flex gap-8">
              <a href="mailto:sujeevan8300@gmail.com" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Mail className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/sujeevan-vijayendiran" target="_blank" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://github.com/Sujeevan8300" target="_blank" className="p-4 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                <Github className="w-6 h-6" />
              </a>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 text-lg font-display tracking-[0.2em] uppercase p-6 border-b border-white animate-pulse"
            >
              <Send className="w-5 h-5" /> Initiate Transmission
            </motion.button>
          </div>

          <p className="mt-40 text-[10px] uppercase tracking-[0.4em] text-white/20">
            © 2026 Sujeevan • All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
