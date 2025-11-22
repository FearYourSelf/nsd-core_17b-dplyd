
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectShowcase } from './components/ProjectShowcase';
import { BackgroundEffects } from './components/BackgroundEffects';
import { LoginModal } from './components/LoginModal';
import { ApiModal } from './components/ApiModal';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isApiOpen, setIsApiOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Refs for Scroll Logic
  const scrollState = useRef({
    target: 0,
    current: 0,
    isScrolling: false,
    rafId: 0
  });

  // Security: Disable Right Click & DevTools Shortcuts
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Initialize Scroll Position
  useEffect(() => {
    scrollState.current.current = window.scrollY;
    scrollState.current.target = window.scrollY;
  }, []);

  // Optimized Scroll Listener for UI State (Navbar transparency)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom Momentum Scroll Engine for Mouse Wheel
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateScroll = () => {
      const state = scrollState.current;
      
      // Apply easing (0.065 = heavy/smooth feel)
      state.current = lerp(state.current, state.target, 0.065);
      
      const diff = Math.abs(state.target - state.current);
      
      // Snap to target if close enough to save resources
      if (diff < 0.5) {
         state.current = state.target;
         state.isScrolling = false;
         window.scrollTo(0, state.current);
         return;
      }

      window.scrollTo(0, state.current);
      state.rafId = requestAnimationFrame(updateScroll);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const state = scrollState.current;

      // If we weren't scrolling, sync with current window position first
      // This handles cases where browser native events (like reload) moved us
      if (!state.isScrolling) {
        state.current = window.scrollY;
        state.target = window.scrollY;
      }

      // Delta Multiplier: Lower = Slower/Smoother, Higher = Faster
      const delta = e.deltaY * 0.85; 
      state.target += delta;

      // Hard Clamp to document bounds
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      state.target = Math.max(0, Math.min(state.target, maxScroll));

      if (!state.isScrolling) {
        state.isScrolling = true;
        state.rafId = requestAnimationFrame(updateScroll);
      }
    };

    // Active listener (passive: false) required to preventDefault
    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(scrollState.current.rafId);
    };
  }, []);

  // Interactive Cursor Spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Navigation Smooth Scroll Engine (Jumps to section)
  const handleScrollTo = (id: string) => {
    // Cancel any active wheel momentum to prevent conflict
    cancelAnimationFrame(scrollState.current.rafId);
    scrollState.current.isScrolling = false;

    const element = document.getElementById(id);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5s duration
    let start: number | null = null;

    // Update momentum engine target to new position so it doesn't snap back later
    scrollState.current.target = targetPosition;
    scrollState.current.current = targetPosition;

    const easeInOutExpo = (t: number, b: number, c: number, d: number) => {
      if (t === 0) return b;
      if (t === d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutExpo(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-violet-500/30 selection:text-violet-200 overflow-x-hidden">
      <BackgroundEffects />
      
      {/* Interactive Spotlight Gradient following cursor */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${cursorPos.x}px ${cursorPos.y}px, rgba(139, 92, 246, 0.08), transparent 80%)`
        }}
      />

      <Navbar 
        scrolled={scrolled} 
        onOpenLogin={() => setIsLoginOpen(true)} 
        onOpenApi={() => setIsApiOpen(true)}
        onScrollTo={handleScrollTo}
      />
      
      <main className="flex-grow flex flex-col items-center w-full z-10">
        <Hero />
        <ProjectShowcase />
      </main>

      {/* Modal Layers */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <ApiModal isOpen={isApiOpen} onClose={() => setIsApiOpen(false)} />
    </div>
  );
}
