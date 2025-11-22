
import React, { useRef, useState, useEffect } from 'react';
import { Terminal, Sparkles, Cpu } from 'lucide-react';

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

// Stop words to never highlight, even if they appear in phrases
const STOP_WORDS = new Set(["is", "a", "as", "and", "the", "of", "with", "for", "in", "on", "at", "to"]);

// Generate a Set of individual words to highlight for O(1) lookup
const HIGHLIGHT_SET = new Set(
  HIGHLIGHT_PHRASES
    .flatMap(phrase => phrase.split(/[\s-]+/)) // Split by space or hyphen
    .map(word => word.replace(/[.,:;]/g, '').toLowerCase()) // Clean punctuation
    .filter(word => !STOP_WORDS.has(word)) // Remove stop words
);

// Component to animate individual words for a "living" effect
const AliveText: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(' ');
  
  return (
    <span>
      {words.map((word, i) => {
        // Clean word for checking
        const cleanWord = word.replace(/[.,:;]/g, '').toLowerCase();
        // Special check for complex terms like NSD-CORE/17B which might get split weirdly
        const isComplexTerm = word.includes("NSD-CORE");
        
        const isHighlight = isComplexTerm || HIGHLIGHT_SET.has(cleanWord);
        
        // Random animation delay between 0s and 4s for organic feel
        const delay = Math.random() * 4;
        const duration = 3 + Math.random() * 2; // Random duration between 3-5s
        
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
  const [singleContentHeight, setSingleContentHeight] = useState(0);

  // Handle Title Fading on Scroll
  useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 150);
        setScrollOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse Parallax for 3D Tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate normalized position (-1 to 1)
      const x = (e.clientX - centerX) / (width / 2);
      const y = (e.clientY - centerY) / (height / 2);
      
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Measure content height for seamless loop
  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        if(contentRef.current) setSingleContentHeight(contentRef.current.offsetHeight);
      }, 100);
    }
  }, []);

  // Animation Loop
  useEffect(() => {
    const animate = () => {
       if (!isDragging && singleContentHeight > 0) {
          scrollPos.current += 0.3; // Slightly faster auto scroll
          if (scrollPos.current >= singleContentHeight) {
             scrollPos.current -= singleContentHeight;
          }
       }
       
       if (scrollContainerRef.current) {
          scrollContainerRef.current.style.transform = `translateY(-${scrollPos.current}px)`;
       }
       
       animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isDragging, singleContentHeight]);

  // Drag Handlers
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
       
       if (singleContentHeight > 0) {
           while (newPos < 0) newPos += singleContentHeight;
           while (newPos >= singleContentHeight) newPos -= singleContentHeight;
       }
       
       scrollPos.current = newPos;
    };
    
    const handleUp = () => {
       setIsDragging(false);
    };

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
  }, [isDragging, singleContentHeight]);

  // Enhanced Tilt Style
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
      
      {/* Enhanced Ambient Glow - Dynamic Motion */}
      <div 
        className="absolute top-1/3 left-1/2 w-[80vw] h-[500px] bg-violet-900/15 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow transition-transform duration-1000 ease-out will-change-transform" 
        style={{
            transform: `translate3d(calc(-50% + ${mousePos.x * -40}px), ${mousePos.y * -40}px, 0)`
        }}
      />
      
      {/* Header Content */}
      <div 
        className="relative z-30 flex flex-col items-center mb-16 pointer-events-none transition-opacity duration-300 will-change-opacity"
        style={{ opacity: scrollOpacity }}
      >
        <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-wide text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-md hover:bg-white/10 transition-colors">
               <Cpu className="w-3 h-3 animate-pulse" />
               <span className="relative">
                 SYSTEM VERSION 17B LIVE
                 <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping" />
               </span>
            </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white drop-shadow-2xl relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-100 to-violet-400 purple-glow-text relative z-10">
            NSD-CORE/17B
          </span>
          {/* Glitch Layer */}
          <span className="absolute top-0 left-0 -ml-[2px] text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-100 to-violet-400 opacity-50 animate-shake" style={{ animationDuration: '5s' }}>
            NSD-CORE/17B
          </span>
        </h1>
      </div>

      {/* 
        ================================================================
        SYSTEM MANIFEST MODAL (Enhanced)
        ================================================================
      */}
      <div className="relative z-20 w-full max-w-3xl transition-transform duration-100 ease-out" style={tiltStyle}>
         
         <div className="glass-panel rounded-xl overflow-hidden shadow-[0_0_80px_rgba(109,40,217,0.25)] ring-1 ring-white/20 bg-[#0a0a0c]/90 backdrop-blur-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40 relative">
               <div className="flex items-center gap-1.5 text-xs font-mono text-violet-300/70">
                  <Terminal className="w-3 h-3" />
                  <span>nsd-core/manifest.sys</span>
               </div>
               <div className="flex gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
               </div>
            </div>

            {/* Modal Body / Scrolling Text Area */}
            <div 
              className={`relative h-[420px] w-full overflow-hidden bg-black/60 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
               
               {/* Enhanced Scanline Effect */}
               <div className="absolute inset-0 pointer-events-none z-10 scanline opacity-20 mix-blend-overlay"></div>
               <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
               
               {/* Scrolling Content Container */}
               <div 
                  ref={scrollContainerRef} 
                  className="absolute top-0 left-0 w-full flex flex-col will-change-transform select-none"
               >
                  {/* First Block */}
                  <div ref={contentRef} className="flex-shrink-0 p-8 md:p-12 max-w-none w-full">
                     <div className="font-mono text-sm md:text-base md:leading-relaxed text-white/60 whitespace-pre-wrap">
                        {renderAliveContent()}
                     </div>
                  </div>
                  
                  {/* Duplicate Block */}
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

         {/* Decorative background glow behind the modal */}
         <div className="absolute -inset-8 bg-violet-500/10 blur-3xl -z-10 rounded-[30px] animate-pulse-slow"></div>
      </div>

    </section>
  );
};
