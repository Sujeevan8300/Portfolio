import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export const FinalScene = () => {
  return (
    <footer id="contact" className="relative min-h-screen py-12 flex flex-col items-center justify-center bg-transparent z-10">
      {/* Subtle fade to deep dark at the very bottom to anchor the page */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#030612] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto px-6 text-center relative z-20 flex flex-col items-center justify-center">
        <motion.div
          className="w-full flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 hero-name">
            End Credits.
          </h2>
          
          {/* Cinematic Credits List */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24 mb-16 w-full">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cyan-300/60 italic">Produced by</p>
              <p className="text-lg md:text-xl font-medium tracking-wide">Sujeevan Vijayendiran</p>
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-purple-300/60 italic">Directed by</p>
              <p className="text-lg md:text-xl font-medium tracking-wide">Clean Architecture</p>
            </motion.div>

             <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1 }}
             >
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-emerald-300/60 italic">Filmed in</p>
              <p className="text-lg md:text-xl font-medium tracking-wide">Jaffna, Sri Lanka</p>
            </motion.div>
          </div>

          {/* Contact & Socials Section */}
          <motion.div 
            className="flex flex-col items-center gap-8 pt-10 border-t border-white/10 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            <div className="space-y-2">
              <p className="text-[9px] md:text-[10px] tracking-[0.4em] text-white/60 uppercase font-mono flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System ready for new connections
              </p>
              <p className="text-base md:text-lg font-light text-white/90">
                Ready to build something together? Let's talk.
              </p>
            </div>

            <div className="flex gap-4">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sujeevan8300@gmail.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/sujeevan-vijayendiran" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/Sujeevan8300" 
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sujeevan8300@gmail.com" 
              target="_blank" 
              rel="noreferrer"
              className="mt-2"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hero-btn hero-btn--primary px-6 py-3 text-sm md:text-base tracking-[0.15em] uppercase"
              >
                <Send className="w-4 h-4 mr-2" />
                Initiate Contact
              </motion.button>
            </a>
          </motion.div>

          <p className="mt-16 text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/60 font-mono">
            © {new Date().getFullYear()} Sujeevan • All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
