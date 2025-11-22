
import React, { useRef, useState, useEffect } from 'react';
import { Terminal, Box } from 'lucide-react';

// --- Tesseract (Hypercube) Component ---
// Pure CSS 3D animated structure
const Tesseract: React.FC = () => {
  return (
    <div className="scene-3d w-[600px] h-[600px] md:w-[800px] md:h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none z-0">
      <div className="tesseract-wrapper w-full h-full relative">
        {/* Outer Cube */}
        <div className="cube-spinner w-full h-full absolute top-0 left-0 transform-style-3d">
           {[...Array(6)].map((_, i) => {
             const rotations = [
               'rotateY(0deg) translateZ(300px)',
               'rotateY(90deg) translateZ(300px)',
               'rotateY(180deg) translateZ(300px)',
               'rotateY(-90deg) translateZ(300px)',
               'rotateX(90deg) translateZ(300px)',
               'rotateX(-90deg) translateZ(300px)'
             ];
             return (
               <div key={`outer-${i}`} className="cube-face w-full h-full" style={{ transform: rotations[i] }}>
                  <div className="absolute inset-0 border border-violet-500/20 animate-pulse"></div>
               </div>
             );
           })}
           
           {/* Inner Cube */}
           <div className="inner-cube w-1/2 h-1/2 absolute top-1/4 left-1/4 transform-style-3d animate-spin-reverse-slow">
             {[...Array(6)].map((_, i) => {
               const rotations = [
                 'rotateY(0deg) translateZ(150px)',
                 'rotateY(90deg) translateZ(150px)',
                 'rotateY(180deg) translateZ(150px)',
                 'rotateY(-90deg) translateZ(150px)',
                 'rotateX(90deg) translateZ(150px)',
                 'rotateX(-90deg) translateZ(150px)'
               ];
               return (
                 <div key={`inner-${i}`} className="cube-face w-full h-full" style={{ transform: rotations[i] }}></div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );
};

const MANIFEST_TEXT = `NSD-CORE/17B is a 17-billion-parameter multimodal expert-gated architecture designed for high-bandwidth reasoning and unified cross-media understanding. It integrates text, vision, audio, and video processing through an early-fusion pipeline that enables coherent interpretation across modalities.

The system supports real-time web search, image generation, code execution, computer-use automation, file navigation, and modular MCP-based tool orchestration. Its dense-sparse hybrid layout ensures that only the relevant expert pathways activate per task, delivering high efficiency, low latency, and consistent output stability even under complex workloads.

NSD-CORE/17B is engineered as a compact but high-performance general reasoning engine: resource-efficient, highly adaptive, and capable of maintaining structural, narrative, and analytical coherence across extended sessions. A deliberately understated core with the reliability and punch of far larger systems.`;

const HIGHLIGHT_PHRASES = [
  "NSD-CORE/17B",
  "17-billion-parameter", 
  "multimodal expert-gated architecture", 
  "high-bandwidth reasoning", 
  "unified cross-media understanding", 
  "early-fusion pipeline", 
  "text", "vision", "audio", "video",
  "real-time web search", 
  "image generation", 
  "code execution", 
  "computer-use automation", 
  "file navigation", 
  "modular MCP-based tool orchestration", 
  "dense-sparse hybrid layout",
  "high efficiency", 
  "low latency", 
  "consistent output stability", 
  "general reasoning engine",
  "resource-efficient", 
  "highly adaptive", 
  "structural, narrative, and analytical coherence",
  "reliability", "punch"
];

const STOP_WORDS = new Set(["is", "a", "as", "and", "the", "of", "with", "for", "in", "on", "at", "to"]);
const HIGHLIGHT_SET = new Set(
  HIGHLIGHT_PHRASES
    .flatMap(phrase => phrase.split(/[\s-]+/))
    .map(word => word.replace(/[.,:;]/g, '').toLowerCase())
    .filter(word => !STOP_WORDS.has(word))
);

const AliveText: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,:;]/g, '').toLowerCase();
        const isComplexTerm = word.includes("NSD-CORE");
        const isHighlight = isComplexTerm || HIGHLIGHT_SET.has(cleanWord);
        const delay = Math.random() * 4;
        const duration = 3 + Math.random() * 2;
        
        return (
          <span 
            key={i} 
            className={`inline-block ${isHighlight ? 'text-violet-300 font-medium drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]' : 'text-white/60'}`}
            style={{ 
              animation: `word-jitter ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s` 
            }}
          >
            {word}{' '}
          </span>
        );
      })}
    </span>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Scrolling Logic Refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollPos = useRef(0);
  const dragStartY = useRef(0);
  const lastDragPos = useRef(0);
  const animationFrameId = useRef<number>(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 150);
        setScrollOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;
      const x = (e.clientX - centerX) / (width / 2);
      const y = (e.clientY - centerY) / (height / 2);
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      // Measure the height of one block of text including padding
      const height = contentRef.current.offsetHeight;
      setContentHeight(height);
    }
  }, []);

  useEffect(() => {
    const animate = () => {
       if (!isDragging && contentHeight > 0) {
          scrollPos.current += 0.5; // Speed
          
          // When we have scrolled past the first copy, reset to 0 instantly
          // The visual position of 0 is identical to contentHeight because we have a duplicate
          if (scrollPos.current >= contentHeight) {
             scrollPos.current -= contentHeight;
          }
       }
       
       if (scrollContainerRef.current) {
          scrollContainerRef.current.style.transform = `translateY(-${scrollPos.current}px)`;
       }
       animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isDragging, contentHeight]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartY.current = clientY;
    lastDragPos.current = scrollPos.current;
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
       if (!isDragging) return;
       const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
       const delta = dragStartY.current - clientY;
       let newPos = lastDragPos.current + delta;
       
       // Allow dragging but loop it if it goes out of bounds
       if (contentHeight > 0) {
           // If dragged past the bottom duplicate, wrap to top
           if (newPos >= contentHeight) newPos -= contentHeight;
           // If dragged past the top, wrap to bottom
           if (newPos < 0) newPos += contentHeight;
       }
       scrollPos.current = newPos;
    };
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
       window.addEventListener('mousemove', handleMove);
       window.addEventListener('mouseup', handleUp);
       window.addEventListener('touchmove', handleMove, { passive: false });
       window.addEventListener('touchend', handleUp);
    }
    return () => {
       window.removeEventListener('mousemove', handleMove);
       window.removeEventListener('mouseup', handleUp);
       window.removeEventListener('touchmove', handleMove);
       window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, contentHeight]);

  const tiltStyle = {
    transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg) scale3d(1.02, 1.02, 1.02)`,
  };

  const renderAliveContent = () => {
      return MANIFEST_TEXT.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed">
              <AliveText text={paragraph} />
          </p>
      ));
  };

  return (
    <section ref={containerRef} className="relative w-full pt-32 pb-32 px-6 flex flex-col items-center text-center min-h-[90vh]">
      
      {/* 3D Tesseract Background - Z-0 */}
      <Tesseract />

      {/* Black Hole Video Background - Z-10 */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-[50%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none mix-blend-screen opacity-100">
        <div 
            className="w-full h-full rounded-full overflow-hidden relative"
            style={{ 
                // Mask applied to container to prevent clipping of scaled video content at bottom edge
                maskImage: 'radial-gradient(circle, black 30%, transparent 70%), linear-gradient(to bottom, black 50%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%), linear-gradient(to bottom, black 50%, transparent 95%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in'
            }}
        >
            {/* Overlay to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-20"></div>
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover scale-125"
            >
                <source src="https://pub-a1b327e0f0794695b6f7d05baa938672.r2.dev/q-c3d7becf.webm" type="video/webm" />
            </video>
        </div>
      </div>

      {/* Enhanced Ambient Glow */}
      <div 
        className="absolute top-1/3 left-1/2 w-[80vw] h-[500px] bg-violet-900/15 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow transition-transform duration-1000 ease-out will-change-transform" 
        style={{ transform: `translate3d(calc(-50% + ${mousePos.x * -40}px), ${mousePos.y * -40}px, 0)` }}
      />
      
      {/* Header Content - Z-30 (Highest) */}
      <div 
        className="relative z-30 flex flex-col items-center pointer-events-none transition-opacity duration-300 will-change-opacity mt-12"
        style={{ opacity: scrollOpacity, marginBottom: '450px' }} // Significantly increased spacing to push manifest down
      >
        <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-wide text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-md hover:bg-white/10 transition-colors group cursor-help">
               <Box className="w-3 h-3 animate-spin-slow group-hover:text-white transition-colors" />
               <span className="relative">
                 SYSTEM VERSION 17B LIVE
                 <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping" />
               </span>
            </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white drop-shadow-2xl relative select-none">
          <span className="relative z-10 flex flex-col md:block drop-shadow-[0_5px_30px_rgba(0,0,0,0.8)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-100 to-violet-400 purple-glow-text animate-pulse-glow">
              NSD-CORE
            </span>
            <span className="text-violet-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)] relative inline-block ml-3 md:ml-4">
              /17B
              <span className="absolute top-0 left-0 -ml-[1px] opacity-0 hover:opacity-70 text-cyan-400 mix-blend-screen animate-shake block">/17B</span>
              <span className="absolute top-0 left-0 ml-[1px] opacity-0 hover:opacity-70 text-red-400 mix-blend-multiply animate-shake block" style={{animationDirection: 'reverse'}}>/17B</span>
            </span>
          </span>
        </h1>
      </div>

      {/* SYSTEM MANIFEST MODAL - Z-20 (Above Video, Below Title) */}
      <div className="relative z-20 w-full max-w-3xl transition-transform duration-100 ease-out -mt-64" style={tiltStyle}>
         
         <div className="glass-panel rounded-xl overflow-hidden shadow-[0_0_80px_rgba(109,40,217,0.25)] ring-1 ring-white/20 bg-[#0a0a0c]/90 backdrop-blur-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 relative">
               <div className="flex items-center gap-1.5 text-xs font-mono text-violet-300/70">
                  <Terminal className="w-3 h-3" />
                  <span>nsd-core/manifest.sys</span>
               </div>
               <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors"></div>
               </div>
            </div>

            {/* Modal Body */}
            <div 
              className={`relative h-[420px] w-full overflow-hidden bg-black/60 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
               <div className="absolute inset-0 pointer-events-none z-10 scanline opacity-20 mix-blend-overlay"></div>
               <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
               
               <div 
                  ref={scrollContainerRef} 
                  className="absolute top-0 left-0 w-full flex flex-col will-change-transform select-none"
               >
                  {/* Content Duplication for seamless scroll */}
                  <div ref={contentRef} className="flex-shrink-0 p-8 md:p-12 max-w-none w-full">
                     <div className="font-mono text-sm md:text-base md:leading-relaxed text-white/60 whitespace-pre-wrap">
                        {renderAliveContent()}
                     </div>
                  </div>
                  
                  <div className="flex-shrink-0 p-8 md:p-12 max-w-none w-full">
                     <div className="font-mono text-sm md:text-base md:leading-relaxed text-white/60 whitespace-pre-wrap">
                        {renderAliveContent()}
                     </div>
                  </div>
               </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex justify-between items-center text-[10px] font-mono text-white/30">
               <span className="hover:text-violet-400 transition-colors cursor-default flex items-center gap-2">
                 <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                 NotSoDangerous
               </span>
               <span className="hover:text-violet-400 transition-colors cursor-default">FYL // R: {Math.floor(Math.random() * 100)}ms</span>
            </div>
         </div>
         
         <div className="absolute -inset-8 bg-violet-500/10 blur-3xl -z-10 rounded-[30px] animate-pulse-slow"></div>
      </div>
    </section>
  );
};
