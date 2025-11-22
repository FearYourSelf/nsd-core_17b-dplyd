
import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowRight, Sparkles, Zap, Shield, Cpu, Layers, Globe } from 'lucide-react';

interface ApiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiModal: React.FC<ApiModalProps> = ({ isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Tilt & Spotlight State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Small delay to ensure DOM is mounted and initial styles (opacity-0) are applied
      // before changing state to trigger the CSS transition.
      const timer = setTimeout(() => setAnimateIn(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      // Wait for the exit transition to finish before unmounting
      const timer = setTimeout(() => setIsMounted(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    
    const rect = modalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spotlight position as percentage
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    setSpotlight({ x: xPct, y: yPct });

    // Tilt calculation
    // We want subtle movement. Max rotation ~2-3 degrees.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalize -1 to 1
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    // RotateY follows MouseX, RotateX follows -MouseY
    setRotate({ x: normY * -3, y: normX * 3 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    // Optional: leave spotlight where it was or reset it. Resetting might be jarring if not transitioned.
    // Let's fade it out via CSS opacity rather than moving it instantly.
  };

  if (!isMounted) return null;

  const features = [
    { icon: Cpu, label: "17B Parameter Expert Model" },
    { icon: Layers, label: "Native Multimodal (A/V/T)" },
    { icon: Zap, label: "Sub-20ms TTFT Latency" },
    { icon: Globe, label: "Global Edge Caching" },
    { icon: Shield, label: "Enterprise Encryption" },
    { icon: Sparkles, label: "MCP Tool Integration" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop - Smoother fade */}
      <div 
        className={`absolute inset-0 bg-[#050507]/80 backdrop-blur-xl transition-opacity duration-700 ease-out ${
            animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 3D Container */}
      <div 
        className="relative w-full max-w-4xl perspective-[1000px] group"
      >
          <div 
            ref={modalRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative w-full bg-[#0a0a0c] rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.15)] transform-gpu transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) border border-white/10 ${
                animateIn 
                    ? 'opacity-100 translate-y-0 scale-100 rotate-x-0' 
                    : 'opacity-0 translate-y-12 scale-95 rotate-x-6'
            }`}
            style={{
                transform: animateIn 
                    ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` 
                    : undefined,
            }}
          >
            {/* --- Background Layers --- */}
            
            {/* 1. Image Layer with Parallax */}
             <div 
                className="absolute inset-0 opacity-30 transition-transform duration-100 ease-out will-change-transform"
                style={{
                    backgroundImage: `url('https://pub-a1b327e0f0794695b6f7d05baa938672.r2.dev/q-97c536f9.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `scale(1.1) translate(${rotate.y * -1.5}px, ${rotate.x * -1.5}px)` 
                }}
             />
            
             {/* 2. Dynamic Spotlight Overlay */}
             <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
                style={{
                    background: `radial-gradient(800px circle at ${spotlight.x}% ${spotlight.y}%, rgba(139, 92, 246, 0.1), transparent 40%)`
                }}
             />

             {/* 3. Noise Texture */}
             <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none z-0" />

             {/* --- Content --- */}
             <div className="relative z-10 flex flex-col md:flex-row min-h-[550px]">
                
                {/* Left Panel: Main Call to Action */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Gradient backdrop for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest text-violet-300 mb-8 shadow-[0_0_15px_rgba(139,92,246,0.1)] animate-pulse-glow-text">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
                            </span>
                            API EARLY ACCESS
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-xl">
                            Unlock the <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-400">
                                Neural Lattice
                            </span>
                        </h2>
                        
                        <p className="text-white/60 text-lg leading-relaxed max-w-sm mb-8 font-light">
                            Direct access to NSD-CORE/17B through our high-velocity API. Integrate expert-gated reasoning into your own infrastructure.
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col gap-5">
                        <a 
                           href="mailto:access@fearyour.life"
                           className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-black font-bold tracking-wide overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                        >
                           <div className="absolute inset-0 bg-gradient-to-r from-violet-100 via-white to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                           <span className="relative z-10 flex items-center gap-2">
                              Request Access Key <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                           </span>
                        </a>
                        <div className="flex items-center gap-4">
                           <div className="h-px flex-1 bg-white/10" />
                           <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                               Limited Availability
                           </p>
                           <div className="h-px flex-1 bg-white/10" />
                        </div>
                    </div>
                </div>

                {/* Right Panel: Features Grid */}
                <div className="flex-1 bg-black/20 backdrop-blur-md border-l border-white/5 p-8 md:p-12 flex flex-col justify-center relative">
                     {/* Decoration: Grid Lines */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

                     <div className="grid grid-cols-1 gap-5 relative z-10">
                        {features.map((feature, idx) => (
                            <div 
                                key={idx}
                                className={`group/item flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-black/40 hover:bg-white/5 hover:border-violet-500/30 transition-all duration-500 ease-out ${
                                    animateIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                                }`}
                                style={{ transitionDelay: `${150 + idx * 50}ms` }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center text-violet-300 group-hover/item:scale-110 group-hover/item:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                    <feature.icon className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">
                                        {feature.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                     </div>
                </div>

             </div>

            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 backdrop-blur-xl"
            >
                <X className="w-5 h-5" />
            </button>
          </div>
      </div>
    </div>
  );
};
