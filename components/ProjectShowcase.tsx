

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, Aperture, Zap, Box, GitBranch, Layers, ExternalLink, Loader2, Bot, PenTool, Settings, Activity, Cpu, Wifi, Users, Database, Sparkles, Code2, FileJson, Terminal, Eye, Mic, Monitor, Scan, Sun, Music } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// 3D Tilt Wrapper Component with Holographic Overlay
const TiltCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -2; 
    const rotateY = (mouseX / (rect.width / 2)) * 2; 

    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
        ref={cardRef}
        className={`relative transition-all duration-300 ease-out ${className}`}
        style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovering ? 1.005 : 1}, ${isHovering ? 1.005 : 1}, 1)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        {/* Dynamic Glow Spotlight */}
        <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 rounded-3xl"
            style={{
                background: `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`,
                opacity: isHovering ? 1 : 0
            }}
        />
        {/* Holographic Scanline Overlay - Enhanced */}
        <div 
          className={`absolute inset-0 pointer-events-none rounded-3xl z-20 opacity-0 transition-opacity duration-500 ${isHovering ? 'opacity-30' : ''} scanline mix-blend-overlay`}
        />
        <div 
          className="absolute inset-0 pointer-events-none rounded-3xl z-20 opacity-10 bg-[linear-gradient(transparent_0%,_rgba(255,255,255,0.2)_50%,_transparent_100%)] bg-[length:100%_200%]"
          style={{ 
            backgroundPosition: isHovering ? '0% 100%' : '0% 0%',
            transition: 'background-position 1s ease' 
          }} 
        />
        {children}
    </div>
  );
};

const Typewriter = ({ words, className = "" }: { words: string[], className?: string }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className={`${className} inline-block min-w-[1ch]`}>
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse border-r-2 border-current ml-0.5 h-[0.8em] inline-block align-baseline"></span>
    </span>
  );
};

const FluxParticles: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(15)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full bg-indigo-300/10"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
                        animationDelay: `-${Math.random() * 10}s`,
                        boxShadow: '0 0 4px rgba(99, 102, 241, 0.2)'
                    }}
                />
            ))}
        </div>
    );
};

const SynthesisParticles: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute rounded-full bg-amber-300/10 mix-blend-screen"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        animation: `float ${10 + Math.random() * 15}s ease-in-out infinite`,
                        animationDelay: `-${Math.random() * 20}s`,
                        boxShadow: '0 0 4px rgba(251, 191, 36, 0.1)'
                    }}
                />
            ))}
        </div>
    );
};

const HeliosVisual: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[#050507] flex items-center justify-center">
             {/* Aurora Background - Teal/Cyan shifted */}
             <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-cyan-500/10 to-emerald-500/10 animate-pulse-slow mix-blend-screen" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

             {/* Stardust */}
             <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-teal-100/40 blur-[1px]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
                            opacity: Math.random() * 0.7
                        }}
                    />
                ))}
             </div>

             {/* Central Orb - Enhanced Pulsating */}
             <div className="relative z-10">
                 {/* Outer Glow */}
                 <div className="absolute inset-[-60px] bg-teal-500/20 rounded-full blur-[60px] animate-pulse-slow" />
                 <div className="absolute inset-[-30px] bg-cyan-400/20 rounded-full blur-[40px] animate-pulse-glow" style={{ animationDelay: '0.5s' }} />

                 {/* Core Orb */}
                 <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-200/10 to-cyan-200/5 backdrop-blur-md border border-teal-500/20 shadow-[0_0_50px_rgba(45,212,191,0.2)] flex items-center justify-center relative overflow-hidden group/orb animate-subtle-breathe">
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 to-transparent opacity-60" />
                      <div className="w-full h-full absolute top-0 left-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)]" />
                      
                      {/* Inner breathing core */}
                      <div className="w-16 h-16 bg-teal-100/20 rounded-full blur-xl animate-pulse-glow" style={{ animationDuration: '3s' }} />
                      
                      {/* Extra Ripple effect */}
                       <div className="absolute inset-0 rounded-full border border-teal-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50" />
                 </div>
             </div>
        </div>
    );
};

const SpecterVisual: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-black flex items-center justify-center">
             {/* Red Aesthetic Background */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_70%)]" />
             <div className="absolute inset-0 bg-[linear-gradient(rgba(50,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(50,0,0,0.2)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
             
             {/* Scanlines */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-10" />
             
             {/* Central Eye */}
             <div className="relative w-full h-full flex items-center justify-center z-20">
                 <div className="relative w-40 h-40 flex items-center justify-center">
                     {/* Pulsing Rings */}
                     <div className="absolute inset-0 border border-red-600/30 rounded-full animate-[spin_12s_linear_infinite]" />
                     <div className="absolute inset-4 border border-red-500/20 rounded-full border-t-red-500 animate-[spin_8s_linear_infinite_reverse]" />
                     <div className="absolute inset-10 border border-red-900/50 rounded-full animate-pulse" />
                     
                     {/* The Eye Core */}
                     <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.6)] animate-pulse-glow relative z-10 flex items-center justify-center border border-red-500/50">
                        <div className="w-6 h-6 bg-black/80 rounded-full blur-[2px]" />
                        <div className="absolute top-3 right-4 w-2 h-1 bg-white/40 rotate-45 blur-[1px] rounded-full" />
                     </div>
                 </div>
             </div>

             {/* Audio Visualization Bars (Decorative) */}
             <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-1 h-12">
                 {[...Array(10)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-1 bg-red-500/50 rounded-full" 
                        style={{
                            height: `${Math.random() * 100}%`,
                            animation: `pulse 0.${5+i}s ease-in-out infinite`
                        }} 
                    />
                 ))}
             </div>

             {/* HUD overlays - Removed as requested */}
             <div className="absolute top-6 left-6 flex flex-col gap-1.5 text-[10px] font-mono text-red-500/80 z-30 tracking-wider">
                 <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]" /> REC_LIVE</span>
             </div>
        </div>
    )
}

const SynthesisTelemetry: React.FC = () => {
    const BASE_PROMPTS = 485448;
    const BASE_USERS = 1287;

    const [prompts, setPrompts] = useState(BASE_PROMPTS);
    const [users, setUsers] = useState(BASE_USERS);

    useEffect(() => {
        // Initialize from localStorage or base values
        const storedStats = localStorage.getItem('nsd_synthesis_stats');
        if (storedStats) {
            try {
                const parsed = JSON.parse(storedStats);
                if (parsed.prompts && parsed.prompts > BASE_PROMPTS) setPrompts(parsed.prompts);
                if (parsed.users) setUsers(parsed.users);
            } catch (e) {
                console.error("Failed to parse telemetry", e);
            }
        }
    }, []);

    // Save to local storage whenever they change
    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('nsd_synthesis_stats', JSON.stringify({ prompts, users }));
        }, 500);
        return () => clearTimeout(timer);
    }, [prompts, users]);

    // Prompts Update Loop (Slower, steady growth)
    useEffect(() => {
        const interval = setInterval(() => {
            setPrompts(prev => prev + Math.floor(Math.random() * 3) + 1); 
        }, 3500); 
        return () => clearInterval(interval);
    }, []);

    // Users Update Loop (Variable timing, fluctuates up and down)
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const updateUsers = () => {
            setUsers(prev => {
                // Fluctuation: -4 to +7
                const change = Math.floor(Math.random() * 12) - 4; 
                let next = prev + change;
                
                // Bounds to keep it realistic
                if (next < 800) next = 800 + Math.floor(Math.random() * 50);
                
                return next;
            });
            
            // Random delay between 1s and 3s for organic feel
            const nextDelay = 1000 + Math.random() * 2000;
            timeoutId = setTimeout(updateUsers, nextDelay);
        };

        timeoutId = setTimeout(updateUsers, 2000);
        
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="mt-6 p-5 rounded-2xl bg-black/40 border border-white/5 font-mono text-[10px] text-violet-300/60 grid grid-cols-2 gap-6 shadow-inner relative overflow-hidden group/stats">
             <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover/stats:opacity-100 transition-opacity duration-500" />
             
             <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2 text-violet-400">
                    <Database className="w-3 h-3" /> <span className="tracking-widest uppercase opacity-70">Refined Prompts</span>
                </div>
                <div className="flex items-end gap-2">
                     <span className="font-bold text-2xl text-white leading-none tracking-tight">{prompts.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                     <div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 w-3/4 animate-pulse"></div>
                </div>
             </div>

             <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2 text-amber-400">
                    <Users className="w-3 h-3" /> <span className="tracking-widest uppercase opacity-70">Active Users</span>
                </div>
                <div className="flex items-end gap-2">
                     <span className="font-bold text-2xl text-white leading-none tracking-tight">{users.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-1/2 animate-pulse" style={{width: `${(users / 2000) * 100}%`}}></div>
                </div>
             </div>
        </div>
    )
}

const LiveTelemetry: React.FC = () => {
    const [metrics, setMetrics] = useState({ gpu: 0, load: 0, vram: 0 });
    
    useEffect(() => {
        setMetrics({ gpu: 35, load: 42, vram: 12 });

        const interval = setInterval(() => {
            setMetrics(prev => ({
                gpu: Math.min(100, Math.max(10, prev.gpu + (Math.random() - 0.5) * 15)),
                load: Math.min(99, Math.max(15, prev.load + (Math.random() - 0.5) * 5)),
                vram: Math.min(24, Math.max(8, prev.vram + (Math.random() - 0.5) * 2))
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-6 p-4 rounded-xl bg-black/40 border border-indigo-500/10 font-mono text-[10px] text-indigo-300/60 grid grid-cols-3 gap-4 shadow-inner">
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-indigo-400">
                    <Activity className="w-3 h-3" /> <span className="tracking-widest">GPU</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-700 ease-out" style={{ width: `${metrics.gpu}%` }}></div>
                </div>
                <span className="text-right font-bold text-indigo-200">{Math.round(metrics.gpu)}%</span>
             </div>

             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-indigo-400">
                    <Cpu className="w-3 h-3" /> <span className="tracking-widest">LOAD</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 transition-all duration-700 ease-out" style={{ width: `${metrics.load}%` }}></div>
                </div>
                <span className="text-right font-bold text-indigo-200">{Math.round(metrics.load)}%</span>
             </div>

             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-indigo-400">
                    <Wifi className="w-3 h-3" /> <span className="tracking-widest">MEM</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-700 ease-out" style={{ width: `${(metrics.vram / 24) * 100}%` }}></div>
                </div>
                <span className="text-right font-bold text-indigo-200">{metrics.vram.toFixed(1)}GB</span>
             </div>
        </div>
    )
}

const SynthesisVisualNode = ({ 
    icon, 
    label, 
    subLabel,
    className = "",
    delay = 0,
    color = "violet"
}: { 
    icon: React.ReactNode, 
    label: string, 
    subLabel?: string,
    className?: string, 
    delay?: number,
    color?: "violet" | "amber" | "blue" | "emerald" | "rose"
}) => {
    const colorClasses = {
        violet: "border-violet-500/30 bg-violet-500/10 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
        amber: "border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]",
        blue: "border-blue-500/30 bg-blue-500/10 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
        emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
        rose: "border-rose-500/30 bg-rose-500/10 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
    };

    const iconColorClass = {
        violet: 'text-violet-400',
        amber: 'text-amber-400',
        blue: 'text-blue-400',
        emerald: 'text-emerald-400',
        rose: 'text-rose-400'
    };

    return (
        <div 
            className={`absolute flex items-center gap-3 p-3 rounded-xl border backdrop-blur-md animate-float z-30 transition-all duration-300 hover:scale-105 hover:border-opacity-50 hover:bg-opacity-20 cursor-default scale-75 md:scale-100 origin-center ${colorClasses[color]} ${className}`}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className={`p-2 rounded-lg bg-white/5 ${iconColorClass[color]}`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider opacity-90">{label}</span>
                {subLabel && <span className="text-[9px] opacity-60 font-mono uppercase">{subLabel}</span>}
            </div>
        </div>
    );
};

export const ProjectShowcase: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-24 space-y-24">
      
      {/* Project 1: Helios (New) */}
      <section id="project-helios" className="relative group scroll-mt-32">
         <TiltCard className="rounded-3xl">
            {/* Aurora Atmospheric Glow - Teal */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-teal-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center p-5 md:p-8 rounded-3xl border border-white/5 bg-[#050507]/90 backdrop-blur-xl z-10">
                
                {/* Content Side - Left on Desktop */}
                <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6 relative">
                     <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono animate-pulse-glow">
                                <Sun className="w-3 h-3" />
                                <span>SOMATIC AUDIO ENGINE</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-mono">
                                <Activity className="w-3 h-3" />
                                <span>NSD-SOLARIS</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white pb-3 leading-tight">
                                HELIOS <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-300 to-teal-500 animate-pulse-glow-text drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                                   SOMATIC AUDIO
                                </span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed max-w-md">
                                A generative somatic audio engine designed for deep state regulation. Fuses real-time ambient synthesis with hyper-realistic voice companionship to induce flow and sleep.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                             <FeatureItem 
                                icon={<Music className="text-teal-400" />} 
                                title={<span className="text-teal-200">Generative Ambience</span>} 
                                desc="Real-time synth pads & drones" 
                             />
                             <FeatureItem 
                                icon={<Mic className="text-teal-400" />} 
                                title={<span className="text-teal-200">Somatic Voice</span>} 
                                desc="Context-aware audio companionship" 
                             />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a 
                                href="https://helios.fearyour.life/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group/btn relative px-8 py-3 rounded-xl bg-teal-600 text-black font-bold tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:shadow-[0_0_40px_rgba(13,148,136,0.5)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Enter Helios <ExternalLink className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </a>
                        </div>
                     </div>
                </div>

                {/* Visual Side: Helios Aurora & Orb - Right on Desktop */}
                <div className="order-1 lg:order-2 relative h-[420px] lg:h-[480px] w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-teal-500/10 group/vis shadow-2xl">
                    <HeliosVisual />
                </div>
            </div>
         </TiltCard>
      </section>

      {/* Project 2: NSD-SPECTER */}
      <section id="project-specter" className="relative group scroll-mt-32">
         <TiltCard className="rounded-3xl">
            {/* Red Atmospheric Glow for Specter */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-red-900/20 to-rose-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center p-5 md:p-8 rounded-3xl border border-white/5 bg-[#050507]/90 backdrop-blur-xl z-10">
                
                {/* Visual Side: Red Team Interface */}
                <div className="order-1 relative h-[420px] lg:h-[480px] w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-red-500/10 group/vis shadow-2xl">
                    <SpecterVisual />
                </div>

                {/* Content Side */}
                <div className="order-2 flex flex-col justify-center space-y-6 relative">
                     <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono animate-pulse-glow">
                                <Scan className="w-3 h-3" />
                                <span>LIVE VISUAL CORTEX</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-mono">
                                <Activity className="w-3 h-3" />
                                <span>V3.5 STABLE</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white pb-3 leading-tight">
                                NSD-SPECTER <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 animate-pulse-glow-text drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                                   VISION INTELLIGENCE
                                </span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed max-w-md">
                                A live multimodal intelligence dashboard. Fuses real-time audio, active computer vision, and screen telemetry into a unified cognitive stream. Powered by the NSD-SPECTER_VISION 3.5 expert model.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                             <FeatureItem 
                                icon={<Eye className="text-red-400" />} 
                                title={<span className="text-red-200">Active Vision</span>} 
                                desc="Real-time camera & screen analysis" 
                             />
                             <FeatureItem 
                                icon={<Monitor className="text-red-400" />} 
                                title={<span className="text-red-200">Screen Telemetry</span>} 
                                desc="Continuous frame interpretation" 
                             />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a 
                                href="https://vision.fearyour.life/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group/btn relative px-8 py-3 rounded-xl bg-red-600 text-white font-bold tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Enter Specter <ExternalLink className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </a>
                        </div>
                     </div>
                </div>
            </div>
         </TiltCard>
      </section>

      {/* Project 3: F&Q // SYNTHESIS CORE */}
      <section id="project-synthesis" className="relative group scroll-mt-32">
        
        <TiltCard className="rounded-3xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/10 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center p-5 md:p-8 rounded-3xl border border-white/10 bg-[#050507]/80 backdrop-blur-xl z-10">
                
                {/* Left Column: Text Content */}
                <div className="order-2 lg:order-1 flex flex-col justify-center space-y-6 relative">
                    <div className="relative z-10 space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono">
                                <GitBranch className="w-3 h-3" />
                                <span>V 1.0.4 STABLE</span>
                            </div>
                            
                            <a 
                            href="https://www.talkie-ai.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-all hover:shadow-[0_0_10px_rgba(251,191,36,0.3)] group/badge"
                            >
                            <Sparkles className="w-3 h-3 group-hover/badge:animate-spin-slow" />
                            <span>Talkie AI READY</span>
                            </a>

                            <a 
                            href="https://character.ai/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs font-mono hover:bg-gray-500/20 transition-all hover:shadow-[0_0_10px_rgba(156,163,175,0.3)]"
                            >
                            <Bot className="w-3 h-3" />
                            <span>C.AI READY</span>
                            </a>
                        </div>
                        
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white pb-3 leading-tight">
                                F&Q // <br /> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-white animate-pulse-glow-text">
                                SYNTHESIS CORE
                                </span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed max-w-md">
                                A hybrid narrative engine designed to engineer prompt structures. Built to refine characters, logic, and persona injection with high fidelity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <FeatureItem icon={<MessageSquareCode />} title="Prompt Engineering" desc="Automated structure refinement" />
                            <FeatureItem icon={<Zap />} title="Character Logic" desc="Consistent persona injection" />
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <a 
                                href="https://app.fearyour.life/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group/btn relative px-6 py-3 rounded-xl bg-white text-black font-bold tracking-wide overflow-hidden transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Launch Core <ExternalLink className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </a>
                        </div>
                        
                        <SynthesisTelemetry />
                    </div>
                </div>

                {/* Right Column: Visual Interactive Side */}
                <div className="order-1 lg:order-2 relative h-[480px] lg:h-[400px] w-full bg-[#0a0a0c] rounded-2xl overflow-hidden flex items-center justify-center border border-white/5 group/vis shadow-2xl">
                    
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.1),transparent_70%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20" />
                    <SynthesisParticles />

                    {/* Connecting Lines (SVG) - Dynamic connections between nodes and core */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <defs>
                            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
                                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
                                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
                            </linearGradient>
                            <filter id="glowLine" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        
                        {/* --- LEFT SIDE INPUTS -> CENTER --- */}

                        {/* Logic Gate (Top Left) to Center */}
                        <path 
                            d="M 20% 25% Q 35% 35% 50% 50%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-40" 
                            filter="url(#glowLine)"
                        />
                        <circle r="2" fill="#60a5fa" filter="url(#glowLine)">
                            <animateMotion 
                                dur="3s" 
                                repeatCount="indefinite" 
                                path="M 20% 25% Q 35% 35% 50% 50%" 
                            />
                        </circle>

                        {/* Raw Input (Bottom Left) to Center */}
                        <path 
                            d="M 20% 75% Q 35% 65% 50% 50%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-40"
                            filter="url(#glowLine)"
                        />
                        <circle r="2" fill="#a78bfa" filter="url(#glowLine)">
                            <animateMotion 
                                dur="2.5s" 
                                repeatCount="indefinite" 
                                path="M 20% 75% Q 35% 65% 50% 50%" 
                            />
                        </circle>

                        {/* Tokenizer (Mid Left) to Center */}
                        <path 
                            d="M 15% 50% Q 32% 50% 50% 50%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-40"
                            filter="url(#glowLine)"
                        />
                        <circle r="2" fill="#c084fc" filter="url(#glowLine)">
                            <animateMotion 
                                dur="2s" 
                                repeatCount="indefinite" 
                                path="M 15% 50% Q 32% 50% 50% 50%" 
                            />
                        </circle>

                        {/* --- CENTER -> RIGHT SIDE OUTPUTS --- */}

                        {/* Center to Vector DB (Top Right) */}
                        <path 
                            d="M 50% 50% Q 65% 35% 80% 25%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-40"
                            filter="url(#glowLine)"
                        />
                        <circle r="2" fill="#34d399" filter="url(#glowLine)">
                            <animateMotion 
                                dur="3.5s" 
                                repeatCount="indefinite" 
                                path="M 50% 50% Q 65% 35% 80% 25%" 
                            />
                        </circle>

                        {/* Center to Persona (Bottom Right) */}
                        <path 
                            d="M 50% 50% Q 65% 65% 80% 75%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-40"
                            filter="url(#glowLine)"
                        />
                        <circle r="2" fill="#f472b6" filter="url(#glowLine)">
                            <animateMotion 
                                dur="4s" 
                                repeatCount="indefinite" 
                                path="M 50% 50% Q 65% 65% 80% 75%" 
                            />
                        </circle>

                        {/* Center to Synthesis (Mid Right) */}
                        <path 
                            d="M 50% 50% Q 65% 50% 80% 50%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-60"
                            filter="url(#glowLine)"
                        />
                        <circle r="2" fill="#fbbf24" filter="url(#glowLine)">
                            <animateMotion 
                                dur="1.5s" 
                                repeatCount="indefinite" 
                                path="M 50% 50% Q 65% 50% 80% 50%" 
                            />
                        </circle>
                    </svg>

                    {/* Central Core Element - The "Ink Pen" */}
                    <div className="relative z-20 scale-[0.85] lg:scale-100">
                        {/* Orbital Rings - Tighter for new layout */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] border border-violet-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] border-t-violet-500/40" />
                        
                        {/* Inner Core */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 bg-amber-500/10 rounded-3xl rotate-45 blur-2xl animate-pulse-slow" />
                            
                            <div className="relative w-16 h-16 bg-gradient-to-br from-[#1a1a1c] to-[#050507] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl z-20 overflow-hidden group-hover/vis:scale-105 transition-transform duration-500">
                                {/* The Gradient Background for the Logo */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-violet-500/20 opacity-80" />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                                
                                {/* Icon */}
                                <PenTool className="w-6 h-6 text-white relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                                
                                {/* Inner glow ring */}
                                <div className="absolute inset-0 border border-white/10 rounded-2xl" />
                            </div>
                            
                            {/* Floating satellite dots */}
                            <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                                <div className="absolute -top-4 left-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                            </div>
                             <div className="absolute inset-0 animate-[spin_12s_linear_infinite_reverse]">
                                <div className="absolute -bottom-6 left-1/2 w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                            </div>
                        </div>
                    </div>

                    {/* Floating Nodes - Expanded Set */}
                    <SynthesisVisualNode 
                        label="LOGIC GATE" 
                        subLabel="Parsing"
                        icon={<Cpu className="w-3.5 h-3.5" />} 
                        className="top-[15%] left-[8%]" 
                        delay={1}
                        color="blue"
                    />
                    <SynthesisVisualNode 
                        label="RAW INPUT" 
                        subLabel="JSON/TXT"
                        icon={<FileJson className="w-3.5 h-3.5" />} 
                        className="bottom-[15%] left-[8%]" 
                        delay={0}
                    />
                    <SynthesisVisualNode 
                        label="TOKENIZER" 
                        subLabel="Vector"
                        icon={<Code2 className="w-3.5 h-3.5" />} 
                        className="top-1/2 left-[2%] -translate-y-1/2" 
                        delay={0.5}
                        color="violet"
                    />

                    <SynthesisVisualNode 
                        label="VECTOR DB" 
                        subLabel="Context"
                        icon={<Database className="w-3.5 h-3.5" />} 
                        className="top-[15%] right-[8%]" 
                        delay={1.5}
                        color="emerald"
                    />
                    <SynthesisVisualNode 
                        label="PERSONA" 
                        subLabel="Active"
                        icon={<Users className="w-3.5 h-3.5" />} 
                        className="bottom-[15%] right-[8%]" 
                        delay={2}
                        color="rose"
                    />
                    <SynthesisVisualNode 
                        label="SYNTHESIS" 
                        subLabel="Ready"
                        icon={<Sparkles className="w-3.5 h-3.5" />} 
                        className="top-1/2 right-[2%] -translate-y-1/2" 
                        delay={2}
                        color="amber"
                    />

                </div>
            </div>
        </TiltCard>
      </section>

      {/* Project 4: UMBRAX FLUX 3 */}
      <section id="project-flux" className="relative group scroll-mt-32">
        
        <TiltCard className="rounded-3xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-l from-blue-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center p-5 md:p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md z-10">
                
                {/* Visual Side with Live View */}
                <div className="relative h-[500px] glass-panel rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl bg-black group-hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] transition-all duration-500 group/flux-visual w-full">
                    
                    {/* Live Iframe Background - Disabled interaction with pointer-events-none */}
                    <iframe 
                        src="https://flux.fearyour.life/" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/flux-visual:opacity-100 transition-all duration-700 ease-in-out z-0 pointer-events-none"
                        title="Umbrax Flux Live View"
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Subtle Background Particles */}
                    <FluxParticles />

                    {/* Circular Core - Kept decorative animation as requested */}
                    <div className="relative w-64 h-64 transform scale-90 md:scale-100 group-hover:scale-105 transition-all duration-700 z-10 opacity-10 group-hover/flux-visual:opacity-5 pointer-events-none">
                        <div className="absolute inset-0 rounded-full border border-indigo-500/30 border-t-white/80 animate-[spin_3s_linear_infinite]"></div>
                        <div className="absolute inset-4 rounded-full border border-violet-500/30 border-b-white/50 animate-[spin_5s_linear_infinite_reverse]"></div>
                        <div className="absolute inset-8 rounded-full border border-blue-500/20 border-l-blue-300/60 animate-[spin_7s_linear_infinite]"></div>
                        
                        <div className="absolute inset-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <Aperture className="w-12 h-12 text-indigo-300 animate-pulse" />
                        </div>
                        
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-scan"></div>
                    </div>

                    {/* Online Badge - Moved to Top Right */}
                    <div className="absolute top-6 right-6 flex justify-end text-xs font-mono text-indigo-200/60 z-20 pointer-events-none">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)] backdrop-blur-md">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-online-pulse"></div>
                            <span className="font-bold tracking-wider">ONLINE</span>
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                        <Box className="w-3 h-3" />
                        <span>VISUAL ENGINE</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white pb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        UMBRAX <br /> 
                        <span className="relative inline-block">
                           {/* Glitch Duplicate */}
                           <span className="absolute inset-0 animate-shake opacity-30 text-indigo-400 mix-blend-screen" style={{animationDuration: '0.2s'}}>FLUX 3</span>
                           {/* Main Text with jitter */}
                           <span className="relative z-10 animate-word-jitter inline-block">FLUX 3</span>
                        </span>
                    </h2>
                    
                    <p className="text-xl text-white/70 leading-relaxed">
                        An adaptive visual engine powered by SDXL and FLUX.1. Generates high-fidelity imagery with semantic precision.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <FeatureItem 
                            icon={<Layers />} 
                            title={
                                <span>
                                    <Typewriter words={["SDXL", "FLUX.1"]} className="text-indigo-300" /> Integration
                                </span>
                            } 
                            desc="High-res latent diffusion" 
                        />
                        <FeatureItem 
                            icon={<Aperture />} 
                            title={
                                <span>
                                    Adaptive <Typewriter words={["Flux", "Latent", "Neural", "Spatial", "Semantic", "Dynamic", "Context", "Visual", "Hyper", "Refined"]} className="text-indigo-300" />
                                </span>
                            } 
                            desc="Dynamic visual weighting" 
                        />
                    </div>
                    
                    <div className="pt-6 flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a 
                                href="https://flux.fearyour.life/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group relative px-8 py-3 rounded-xl bg-white text-black font-semibold tracking-wide overflow-hidden hover:text-indigo-700 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-95 flex items-center gap-2 justify-center sm:justify-start"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Open Engine <ExternalLink className="w-4 h-4" />
                                </span>
                                <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </a>
                        </div>

                        {/* Live Telemetry Feed */}
                        <LiveTelemetry />
                    </div>
                </div>
            </div>
        </TiltCard>
      </section>

    </div>
  );
};

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: React.ReactNode, desc: string }) => (
    <div className="group/item flex gap-3 items-start p-4 rounded-xl hover:bg-white/5 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/5">
        <div className="mt-1 text-white/80 p-1.5 bg-white/5 rounded-lg group-hover/item:text-violet-300 group-hover/item:scale-110 transition-all duration-300 group-hover/item:shadow-[0_0_10px_rgba(139,92,246,0.3)]">{icon}</div>
        <div>
            <h4 className="font-medium text-white group-hover/item:text-violet-200 transition-colors">{title}</h4>
            <p className="text-sm text-white/50">{desc}</p>
        </div>
    </div>
);
