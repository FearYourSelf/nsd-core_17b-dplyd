
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, Aperture, Zap, Box, GitBranch, Layers, ExternalLink, Loader2, Bot, PenTool, Settings, Activity, Cpu, Wifi, Users, Database, Sparkles, Code2, FileJson, Terminal } from 'lucide-react';
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

const SynthesisTelemetry: React.FC = () => {
    const BASE_PROMPTS = 485448;
    const BASE_USERS = 1287;

    const [stats, setStats] = useState({ prompts: BASE_PROMPTS, users: BASE_USERS });

    useEffect(() => {
        // Initialize from localStorage or base values
        let currentPrompts = BASE_PROMPTS;
        let currentUsers = BASE_USERS;
        
        const storedStats = localStorage.getItem('nsd_synthesis_stats');
        if (storedStats) {
            try {
                const parsed = JSON.parse(storedStats);
                if (parsed.prompts > currentPrompts) currentPrompts = parsed.prompts;
                if (parsed.users > currentUsers) currentUsers = parsed.users;
            } catch (e) {
                console.error("Failed to parse telemetry", e);
            }
        }

        setStats({ prompts: currentPrompts, users: currentUsers });

        const interval = setInterval(() => {
            setStats(prev => {
                const nextPrompts = prev.prompts + Math.floor(Math.random() * 4); 
                const nextUsers = prev.users + (Math.random() > 0.7 ? 1 : 0); 

                const nextStats = { prompts: nextPrompts, users: nextUsers };
                localStorage.setItem('nsd_synthesis_stats', JSON.stringify(nextStats));
                return nextStats;
            });
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-6 p-5 rounded-2xl bg-black/40 border border-white/5 font-mono text-[10px] text-violet-300/60 grid grid-cols-2 gap-6 shadow-inner relative overflow-hidden group/stats">
             <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover/stats:opacity-100 transition-opacity duration-500" />
             
             <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-center gap-2 text-violet-400">
                    <Database className="w-3 h-3" /> <span className="tracking-widest uppercase opacity-70">Refined Prompts</span>
                </div>
                <div className="flex items-end gap-2">
                     <span className="font-bold text-2xl text-white leading-none tracking-tight">{stats.prompts.toLocaleString()}</span>
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
                     <span className="font-bold text-2xl text-white leading-none tracking-tight">{stats.users.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-1/2 animate-pulse" style={{width: `${(stats.users / 2000) * 100}%`}}></div>
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
    color?: "violet" | "amber" | "blue"
}) => {
    const colorClasses = {
        violet: "border-violet-500/30 bg-violet-500/10 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]",
        amber: "border-amber-500/30 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.15)]",
        blue: "border-blue-500/30 bg-blue-500/10 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
    };

    return (
        <div 
            className={`absolute flex items-center gap-3 p-3 rounded-xl border backdrop-blur-md animate-float z-30 transition-all duration-300 hover:scale-105 hover:border-opacity-50 hover:bg-opacity-20 cursor-default ${colorClasses[color]} ${className}`}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className={`p-2 rounded-lg bg-white/5 ${color === 'amber' ? 'text-amber-400' : 'text-violet-400'}`}>
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
    <div className="w-full max-w-7xl mx-auto px-6 pb-40 space-y-40">
      
      {/* Project 1: F&Q // SYNTHESIS CORE */}
      <section id="project-synthesis" className="relative group scroll-mt-32">
        
        <TiltCard className="rounded-3xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/10 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 lg:p-8 rounded-3xl border border-white/10 bg-[#050507]/80 backdrop-blur-xl z-10">
                
                {/* Left Column: Text Content */}
                <div className="order-2 lg:order-1 flex flex-col justify-center space-y-8 relative">
                    {/* Background sheen */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

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

                        {/* Code Snippet - Terminal Style */}
                        <div className="relative rounded-lg overflow-hidden border border-white/10 bg-[#0a0a0c] shadow-2xl group/code">
                            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 group-hover/code:bg-red-500 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 group-hover/code:bg-yellow-500 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 group-hover/code:bg-green-500 transition-colors" />
                                </div>
                                <span className="text-[10px] font-mono text-white/30">init_core.ts</span>
                            </div>
                            <div className="p-4 font-mono text-xs overflow-x-auto">
                                <div className="flex">
                                    <span className="text-white/20 select-none mr-4">1</span>
                                    <span>
                                        <span className="text-fuchsia-400">const</span> <span className="text-violet-200">synthesis</span> <span className="text-fuchsia-400">=</span> <span className="text-amber-300">new</span> <span className="text-blue-300">NarrativeCore</span>(<span className="text-green-400">'F&Q'</span>);
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="text-white/20 select-none mr-4">2</span>
                                    <span>
                                        <span className="text-fuchsia-400">await</span> <span className="text-violet-200">synthesis</span>.<span className="text-blue-300">refine</span>(<span className="text-violet-200">character_model</span>);
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual Interactive Side */}
                <div className="order-1 lg:order-2 relative h-[450px] lg:h-[500px] w-full bg-[#0a0a0c] rounded-2xl overflow-hidden flex items-center justify-center border border-white/5 group/vis shadow-2xl">
                    
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
                        
                        {/* Logic Gate (Top Left) to Center */}
                        <path 
                            d="M 28% 28% Q 35% 35% 50% 50%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-60" 
                            filter="url(#glowLine)"
                        />
                        {/* Animated flow dot for Logic */}
                        <circle r="2" fill="#60a5fa" filter="url(#glowLine)">
                            <animateMotion 
                                dur="3s" 
                                repeatCount="indefinite" 
                                path="M 28% 28% Q 35% 35% 50% 50%" 
                            />
                        </circle>

                        {/* Raw Input (Bottom Left) to Center */}
                        <path 
                            d="M 28% 72% Q 35% 65% 50% 50%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-60"
                            filter="url(#glowLine)"
                        />
                        {/* Animated flow dot for Input */}
                        <circle r="2" fill="#a78bfa" filter="url(#glowLine)">
                            <animateMotion 
                                dur="2.5s" 
                                repeatCount="indefinite" 
                                path="M 28% 72% Q 35% 65% 50% 50%" 
                            />
                        </circle>

                        {/* Center to Synthesis (Right) */}
                        <path 
                            d="M 50% 50% Q 65% 50% 72% 50%" 
                            stroke="url(#flowGradient)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            className="opacity-60"
                            filter="url(#glowLine)"
                        />
                        {/* Animated flow dot for Output */}
                        <circle r="2" fill="#fbbf24" filter="url(#glowLine)">
                             <animateMotion 
                                dur="2s" 
                                repeatCount="indefinite" 
                                path="M 50% 50% Q 65% 50% 72% 50%" 
                            />
                        </circle>
                    </svg>

                    {/* Central Core Element - The "Ink Pen" */}
                    <div className="relative z-20">
                        {/* Orbital Rings - Tighter for new layout */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] border border-violet-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse] border-t-violet-500/40" />
                        
                        {/* Inner Core */}
                        <div className="relative w-28 h-28 flex items-center justify-center">
                            <div className="absolute inset-0 bg-amber-500/10 rounded-3xl rotate-45 blur-2xl animate-pulse-slow" />
                            
                            <div className="relative w-20 h-20 bg-gradient-to-br from-[#1a1a1c] to-[#050507] rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl z-20 overflow-hidden group-hover/vis:scale-105 transition-transform duration-500">
                                {/* The Gradient Background for the Logo */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-violet-500/20 opacity-80" />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                                
                                {/* Icon */}
                                <PenTool className="w-8 h-8 text-white relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                                
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

                    {/* Floating Nodes - Tighter positioning to connect with lines */}
                    <SynthesisVisualNode 
                        label="RAW INPUT" 
                        subLabel="JSON/TXT"
                        icon={<FileJson className="w-4 h-4" />} 
                        className="bottom-[20%] left-[12%]" // Closer to center
                        delay={0}
                    />
                     <SynthesisVisualNode 
                        label="LOGIC GATE" 
                        subLabel="Parsing"
                        icon={<Cpu className="w-4 h-4" />} 
                        className="top-[20%] left-[12%]" // Closer to center
                        delay={1}
                        color="blue"
                    />
                    <SynthesisVisualNode 
                        label="SYNTHESIS" 
                        subLabel="Ready"
                        icon={<Sparkles className="w-4 h-4" />} 
                        className="top-1/2 right-[10%] -translate-y-1/2" 
                        delay={2}
                        color="amber"
                    />

                </div>
            </div>
        </TiltCard>
      </section>

      {/* Project 2: UMBRAX FLUX 3 */}
      <section id="project-flux" className="relative group scroll-mt-32">
        
        <TiltCard className="rounded-3xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-l from-blue-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md z-10">
                
                {/* Visual Side with Live View */}
                <div className="relative h-[500px] glass-panel rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl bg-black group-hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] transition-all duration-500 group/flux-visual">
                    
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
                    <div className="relative w-64 h-64 transform group-hover:scale-105 transition-all duration-700 z-10 opacity-10 group-hover/flux-visual:opacity-5 pointer-events-none">
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
                        <FeatureItem icon={<Layers />} title="SDXL Integration" desc="High-res latent diffusion" />
                        <FeatureItem icon={<Aperture />} title="Adaptive Flux" desc="Dynamic visual weighting" />
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

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="group/item flex gap-3 items-start p-4 rounded-xl hover:bg-white/5 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-white/5">
        <div className="mt-1 text-white/80 p-1.5 bg-white/5 rounded-lg group-hover/item:text-violet-300 group-hover/item:scale-110 transition-all duration-300 group-hover/item:shadow-[0_0_10px_rgba(139,92,246,0.3)]">{icon}</div>
        <div>
            <h4 className="font-medium text-white group-hover/item:text-violet-200 transition-colors">{title}</h4>
            <p className="text-sm text-white/50">{desc}</p>
        </div>
    </div>
);
