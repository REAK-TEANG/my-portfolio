import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { Link } from 'react-router-dom';
import {
  Layout, PenNib, Palette, FilmStrip, CursorClick, FigmaLogo, Image as ImageIcon,
  Code, FileJs, Atom, Wind, Database, Cube, DeviceMobile,
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger, Draggable);

const designSkills = ['UI/UX Design', 'Graphic Design', 'Brand Identity', 'Visual Storytelling', 'Prototyping', 'Figma', 'Photoshop'];
const devSkills = ['HTML & CSS', 'JavaScript', 'React', 'Tailwind CSS', 'PHP', 'PostgreSQL', 'Laravel', 'Responsive Design'];

const skillIcons = {
  'UI/UX Design': Layout,
  'Graphic Design': PenNib,
  'Brand Identity': Palette,
  'Visual Storytelling': FilmStrip,
  'Prototyping': CursorClick,
  'Figma': FigmaLogo,
  'Photoshop': ImageIcon,
  'HTML & CSS': Code,
  'JavaScript': FileJs,
  'React': Atom,
  'Tailwind CSS': Wind,
  'PHP': Code,
  'PostgreSQL': Database,
  'Laravel': Cube,
  'Responsive Design': DeviceMobile,
};

export default function About() {
  const sectionRef = useRef(null);
  const stackContainerRef = useRef(null);
  const polaroidRef = useRef(null);
  const youngPolaroidRef = useRef(null);
  const flashRef = useRef(null);
  
  const [isYoungTop, setIsYoungTop] = useState(false);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Scroll Animations
      gsap.utils.toArray('.fade-up').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: { trigger: elem, start: 'top 85%' },
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out'
        });
      });

      gsap.utils.toArray('.draw-line').forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          scrollTrigger: { trigger: path, start: 'top 85%' },
          strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: 0.2
        });
      });

      gsap.from('.skill-badge', {
        scrollTrigger: { trigger: '.skills-container', start: 'top 80%' },
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.5)'
      });

      // 2. Photo Stack Interactions (3D Tilt + Scatter)
      const stack = stackContainerRef.current;
      const topPhoto = polaroidRef.current;
      const bottomPhoto = youngPolaroidRef.current;

      gsap.set(topPhoto, { rotateZ: -10 });
      gsap.set(bottomPhoto, { rotateZ: 0, x: 0, y: 0, opacity: 0 });

      gsap.to(topPhoto, {
        scrollTrigger: { trigger: stack, start: 'top 80%' },
        rotateZ: -3, duration: 1, ease: 'elastic.out(1, 0.5)'
      });
      gsap.to(bottomPhoto, {
        scrollTrigger: { trigger: stack, start: 'top 80%' },
        opacity: 1, rotateZ: 8, x: 15, y: 15, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.1
      });

      const handleMouseMove = (e) => {
        const rect = stack.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(stack, { rotateX, rotateY, transformPerspective: 1000, duration: 0.4, ease: 'power2.out' });
      };

      const handleMouseEnter = () => {
        gsap.to(topPhoto, { x: -30, y: -10, rotateZ: -12, duration: 0.5, ease: 'back.out(2)' });
        gsap.to(bottomPhoto, { x: 30, y: 10, rotateZ: 15, duration: 0.5, ease: 'back.out(2)' });
      };

      const handleMouseLeave = () => {
        gsap.to(stack, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        gsap.to(topPhoto, { x: 0, y: 0, rotateZ: -3, duration: 0.5, ease: 'back.out(1.5)' });
        gsap.to(bottomPhoto, { x: 15, y: 15, rotateZ: 8, duration: 0.5, ease: 'back.out(1.5)' });
      };

      stack.addEventListener('mousemove', handleMouseMove);
      stack.addEventListener('mouseenter', handleMouseEnter);
      stack.addEventListener('mouseleave', handleMouseLeave);

      // 3. Draggable Skills
      Draggable.create('.skill-badge', {
        type: 'x,y',
        bounds: sectionRef.current,
        inertia: true,
        onPress: function() {
          gsap.to(this.target, { scale: 1.1, boxShadow: '8px 8px 0 0 #2b2a29', duration: 0.2 });
        },
        onRelease: function() {
          gsap.to(this.target, { scale: 1, boxShadow: '2px 2px 0 0 #2b2a29', duration: 0.2, ease: 'back.out(2)' });
        }
      });

      // 4. Magic Highlighter Bio
      const highlights = document.querySelectorAll('.highlight-text');
      highlights.forEach((el) => {
        const svg = el.querySelector('svg path');
        if (svg) {
          const len = svg.getTotalLength();
          gsap.set(svg, { strokeDasharray: len, strokeDashoffset: len });
          el.addEventListener('mouseenter', () => gsap.to(svg, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }));
          el.addEventListener('mouseleave', () => gsap.to(svg, { strokeDashoffset: len, duration: 0.4, ease: 'power2.out' }));
        }
      });

      return () => {
        stack.removeEventListener('mousemove', handleMouseMove);
        stack.removeEventListener('mouseenter', handleMouseEnter);
        stack.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const triggerCameraFlash = () => {
    const flash = flashRef.current;
    gsap.fromTo(flash, { opacity: 1 }, { opacity: 0, duration: 0.8, ease: 'power2.out' });
    setIsYoungTop(prev => !prev);
    gsap.fromTo(stackContainerRef.current, { scale: 0.95 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 max-w-7xl mx-auto border-t-2 border-ink border-dashed relative">
      <div ref={flashRef} className="fixed inset-0 bg-white z-[9999] pointer-events-none opacity-0" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Polaroid & Bio */}
        <div className="space-y-12">
          
          {/* Photo Stack Container */}
          <div className="relative w-60 sm:w-72 mx-auto lg:mx-0 z-10 fade-up" style={{ perspective: '1000px' }}>
            <div 
              ref={stackContainerRef}
              className="relative cursor-pointer transform-style-3d group"
              onClick={triggerCameraFlash}
            >
              
              {/* Bottom Polaroid */}
              <div ref={youngPolaroidRef} className="absolute inset-0" style={{ zIndex: 1 }}>
                <div className="bg-white p-4 pb-12 shadow-[8px_8px_0_0_#2b2a29] border-2 border-ink">
                  <div className="bg-gray-200 aspect-[4/5] overflow-hidden border-2 border-ink pointer-events-none">
                    <img src={isYoungTop ? "/photo-1.jpg" : "/photo-young.jpg"} alt={isYoungTop ? "Teang Arpireak" : "Younger Teang"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                  </div>
                  <p className="font-handwriting text-2xl text-center mt-4 text-ink pointer-events-none">{isYoungTop ? "That's me!" : "Way back!"}</p>
                </div>
              </div>

              {/* Top Polaroid */}
              <div ref={polaroidRef} className="relative" style={{ zIndex: 2 }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/60 backdrop-blur-sm shadow-sm rotate-2 z-10 border border-black/5" />
                <div className="bg-white p-4 pb-12 shadow-[8px_8px_0_0_#2b2a29] border-2 border-ink">
                  <div className="bg-gray-200 aspect-[4/5] overflow-hidden border-2 border-ink pointer-events-none">
                    <img src={isYoungTop ? "/photo-young.jpg" : "/photo-1.jpg"} alt={isYoungTop ? "Younger Teang" : "Teang Arpireak"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                  </div>
                  <p className="font-handwriting text-2xl text-center mt-4 text-ink pointer-events-none">{isYoungTop ? "Way back!" : "That's me!"}</p>
                </div>
              </div>

            </div>
          </div>

          <div className="space-y-4 fade-up">
            <h2 className="font-display text-3xl md:text-4xl text-ink">ABOUT ME</h2>
            <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed bio-text">
              I’m <span className="font-bold text-ink bg-accent-yellow px-1">Teang Arpireak</span>, a graphic and UI/UX designer based in Siem Reap, Cambodia. I enjoy turning ideas into 
              <span className="relative inline-block highlight-text mx-1 font-bold text-ink cursor-default">
                meaningful visual experiences
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-accent-pink -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>, 
              combining thoughtful design, intuitive interfaces, and a passion for solving real-world problems.
            </p>
            <p className="font-sans text-base md:text-lg text-ink/80 leading-relaxed bio-text">
              From brand identities to digital products, I focus on making every detail 
              <span className="relative inline-block highlight-text mx-1 font-bold text-ink cursor-default">
                purposeful
                <svg className="absolute -bottom-1 left-0 w-full h-3 text-accent-green -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-2 bg-accent-yellow px-5 py-2 font-mono font-bold uppercase border-2 border-ink shadow-[4px_4px_0_0_#2b2a29] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Read my full story →
            </Link>
          </div>
        </div>

        {/* Right Column: Skills */}
        <div className="space-y-12 skills-container">
          <div>
            <h3 className="font-handwriting text-3xl mb-6 relative inline-block fade-up">
              Design
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent-pink" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path className="draw-line" d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </h3>
            <div className="flex flex-wrap gap-3">
              {designSkills.map((skill, idx) => (
                <div key={`design-${idx}`} className="skill-badge bg-accent-blue/20 border-2 border-ink px-4 py-2 torn-edge font-mono font-bold text-sm cursor-grab active:cursor-grabbing hover:bg-accent-blue transition-colors shadow-[2px_2px_0_0_#2b2a29] z-10 inline-flex items-center gap-2">
                  {React.createElement(skillIcons[skill] || Code, { size: 16, weight: 'bold' })}
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-handwriting text-3xl mb-6 relative inline-block fade-up">
              Development
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-accent-green" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path className="draw-line" d="M0,5 Q25,10 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </h3>
            <div className="flex flex-wrap gap-3">
              {devSkills.map((skill, idx) => (
                <div key={`dev-${idx}`} className="skill-badge bg-accent-yellow/30 border-2 border-ink px-4 py-2 torn-edge font-mono font-bold text-sm cursor-grab active:cursor-grabbing hover:bg-accent-yellow transition-colors shadow-[2px_2px_0_0_#2b2a29] z-10 inline-flex items-center gap-2">
                  {React.createElement(skillIcons[skill] || Code, { size: 16, weight: 'bold' })}
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
