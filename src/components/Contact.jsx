import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LinkedinLogo, InstagramLogo, BehanceLogo, PaperPlaneRight } from '@phosphor-icons/react';

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-4 border-t-2 border-ink border-dashed bg-paper overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
            Have a good problem? Let's solve it together.
          </h2>
          <p className="font-sans text-lg text-ink/80 mb-12 max-w-md">
            Whether you have a project in mind, an interesting opportunity, or just want to exchange ideas, I'd love to hear from you.
          </p>

          <div className="space-y-6">
            <div>
              <p className="font-mono text-sm font-bold text-ink/50 uppercase mb-1">Email</p>
              <a href="mailto:broreakzxz@gmail.com" className="font-sans text-2xl font-bold text-ink hover:text-accent-pink transition-colors">
                broreakzxz@gmail.com
              </a>
            </div>

            <div>
              <p className="font-mono text-sm font-bold text-ink/50 uppercase mb-3">Socials</p>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/in/teang-arpireak-569962289" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-accent-yellow border-2 border-ink flex items-center justify-center hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#2b2a29]">
                  <LinkedinLogo size={24} weight="bold" />
                </a>
                <a href="https://www.behance.net/teangarpiraek" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-accent-pink border-2 border-ink flex items-center justify-center hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#2b2a29]">
                  <BehanceLogo size={24} weight="bold" />
                </a>
                <a href="https://www.instagram.com/p.reak_10/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-accent-green border-2 border-ink flex items-center justify-center hover:-translate-y-2 transition-transform shadow-[4px_4px_0_0_#2b2a29]">
                  <InstagramLogo size={24} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form (Sticky Note Style) */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
          className="relative"
        >
          {/* Tape */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/60 backdrop-blur-sm shadow-sm rotate-2 z-10 border border-black/5" />
          
          <div className="bg-accent-yellow/30 border-2 border-ink shadow-[12px_12px_0_0_#2b2a29] p-8 md:p-12 torn-edge relative transition-transform duration-300 hover:rotate-0">
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-accent-green rounded-full flex items-center justify-center border-2 border-ink mb-6">
                  <PaperPlaneRight size={32} className="text-ink" weight="bold" />
                </div>
                <h3 className="font-display text-2xl mb-4">Message Sent!</h3>
                <p className="font-handwriting text-xl">I'll get back to you soon.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="mt-8 font-mono font-bold uppercase underline hover:text-accent-pink"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono text-sm font-bold uppercase mb-2">Name</label>
                  <input required type="text" className="w-full bg-white border-2 border-ink px-4 py-3 font-sans focus:outline-none focus:ring-4 focus:ring-accent-pink/50 transition-all" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block font-mono text-sm font-bold uppercase mb-2">Email</label>
                  <input required type="email" className="w-full bg-white border-2 border-ink px-4 py-3 font-sans focus:outline-none focus:ring-4 focus:ring-accent-pink/50 transition-all" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block font-mono text-sm font-bold uppercase mb-2">Project Type</label>
                  <select className="w-full bg-white border-2 border-ink px-4 py-3 font-sans focus:outline-none focus:ring-4 focus:ring-accent-pink/50 transition-all appearance-none cursor-pointer">
                    <option>UI/UX Design</option>
                    <option>Web Development</option>
                    <option>Brand Identity</option>
                    <option>Other / Just saying hi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-sm font-bold uppercase mb-2">Message</label>
                  <textarea required rows="4" className="w-full bg-white border-2 border-ink px-4 py-3 font-sans focus:outline-none focus:ring-4 focus:ring-accent-pink/50 transition-all resize-none" placeholder="Tell me about your project..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'submitting'}
                  className="w-full bg-ink text-white font-mono font-bold uppercase py-4 border-2 border-ink hover:bg-white hover:text-ink transition-colors flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                  <PaperPlaneRight size={18} className="group-hover:translate-x-1 transition-transform" weight="bold" />
                </button>
              </form>
            )}
          </div>
        </motion.div>

      </div>

      <div className="mt-32 text-center pb-8">
        <p className="font-mono text-sm font-bold uppercase text-ink/50">
          © {new Date().getFullYear()} Teang Arpireak. Crafted with passion.
        </p>
      </div>
    </section>
  );
}
