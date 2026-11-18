import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Shapes and colors for the scrapbook doodles
const shapes = ['✿', '★', '✦', '●', '▲'];
const colors = ['#f783ac', '#fadb5f', '#8ce99a', '#74c0fc'];

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const doodleContainerRef = useRef(null);

  // Only use the custom cursor with a real mouse, and when motion is OK
  const [enabled] = useState(
    () => typeof window !== 'undefined' &&
      !window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    const doodleContainer = doodleContainerRef.current;

    // Center the cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // GSAP quickTo for highly performant mouse tracking
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3.out' });

    let lastSpawnTime = 0;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Update cursor position
      xTo(clientX);
      yTo(clientY);

      // Throttle doodle spawning
      const now = Date.now();
      if (now - lastSpawnTime > 80) {
        lastSpawnTime = now;
        spawnDoodle(clientX, clientY);
      }
    };

    const spawnDoodle = (x, y) => {
      const doodle = document.createElement('div');
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      doodle.innerText = randomShape;
      doodle.style.position = 'absolute';
      doodle.style.left = `${x}px`;
      doodle.style.top = `${y}px`;
      doodle.style.color = randomColor;
      doodle.style.fontSize = `${Math.random() * 12 + 12}px`; // 12px - 24px
      doodle.style.pointerEvents = 'none';
      doodle.style.userSelect = 'none';
      doodle.style.zIndex = 9998;
      
      // Initial GSAP setup for the doodle
      gsap.set(doodle, {
        xPercent: -50,
        yPercent: -50,
        rotation: Math.random() * 360,
        scale: 0
      });

      doodleContainer.appendChild(doodle);

      // Animate the doodle (pop in, then float down and fade out)
      const tl = gsap.timeline({
        onComplete: () => {
          if (doodleContainer.contains(doodle)) {
            doodleContainer.removeChild(doodle);
          }
        }
      });

      tl.to(doodle, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(2)'
      }).to(doodle, {
        y: '+=80',
        x: `+=${(Math.random() - 0.5) * 80}`,
        rotation: `+=${(Math.random() - 0.5) * 180}`,
        opacity: 0,
        duration: 0.8 + Math.random(),
        ease: 'power1.out'
      }, '-=0.1');
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Force hide default cursor globally
    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    // Interactive Hover States
    const addHoverEffects = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, select, .skill-badge, .cursor-pointer, .highlight-text, .cursor-grab');
      
      const onHover = () => {
        gsap.to(cursor, { 
          scale: 2, 
          backgroundColor: 'transparent', 
          borderWidth: '1px',
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      const onLeave = () => {
        gsap.to(cursor, { 
          scale: 1, 
          backgroundColor: '#fadb5f', // accent-yellow
          borderWidth: '2px',
          duration: 0.3,
          ease: 'power2.out' 
        });
      };

      interactables.forEach((el) => {
        el.addEventListener('mouseenter', onHover);
        el.addEventListener('mouseleave', onLeave);
      });

      // return cleanup function
      return () => {
        interactables.forEach((el) => {
          el.removeEventListener('mouseenter', onHover);
          el.removeEventListener('mouseleave', onLeave);
        });
      };
    };

    // Delay adding hover effects slightly so the DOM is fully rendered
    let cleanupHoverEvents;
    const timeoutId = setTimeout(() => {
      cleanupHoverEvents = addHoverEffects();
    }, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (document.head.contains(style)) document.head.removeChild(style);
      clearTimeout(timeoutId);
      if (cleanupHoverEvents) cleanupHoverEvents();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-6 h-6 bg-accent-yellow border-2 border-ink rounded-full pointer-events-none z-[9999]"
      />
      <div 
        ref={doodleContainerRef}
        className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      />
    </>
  );
}
