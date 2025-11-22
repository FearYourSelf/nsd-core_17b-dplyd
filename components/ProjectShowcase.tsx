
import React, { useState, useRef } from 'react';
import { MessageSquareCode, Aperture, Zap, Box, GitBranch, Layers, ExternalLink, Sparkles, Loader2, Bot, PenTool } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// 3D Tilt Wrapper Component
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

    // Rotation logic (Toned down for subtler effect)
    const rotateX = (mouseY / (rect.height / 2)) * -2; // Reduced from -5
    const rotateY = (mouseX / (rect.width / 2)) * 2;  // Reduced from 5

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
        role="region"
        aria-label="Interactive Project Card"
    >
        {/* Dynamic Glow Spotlight */}
        <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 rounded-3xl"
            style={{
                background: `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`,
                opacity: isHovering ? 1 : 0
            }}
            aria-hidden="true"
        />
        {children}
    </div>
  );
};

export const ProjectShowcase: React.FC = () => {
  const [fluxInsight, setFluxInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const generateFluxDescription = async () => {
    setLoadingInsight(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = "Generate a cryptic, cyberpunk-style visual analysis report (max 15 words) for 'Umbrax Flux Engine'. Focus on high-fidelity rendering.";
            
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        setFluxInsight(response.text);
    } catch (error) {
        console.error("AI Generation Failed", error);
    } finally {
        setLoadingInsight(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 pb-40 space-y-40">
      
      {/* Project 1: F&Q // SYNTHESIS CORE */}
      <section id="project-synthesis" className="relative group scroll-mt-32" aria-labelledby="heading-synthesis">
        
        <TiltCard className="rounded-3xl">
            {/* Background Ambient */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/10 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md z-10">
                
                {/* Content Side */}
                <div className="order-2 lg:order-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-mono">
                        <GitBranch className="w-3 h-3" />
                        <span>V 1.0.4 STABLE</span>
                    </div>
                    
                    <h2 id="heading-synthesis" className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 pb-2 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        F&Q // <br /> SYNTHESIS CORE
                    </h2>
                    
                    <p className="text-xl text-white/70 leading-relaxed">
                        A hybrid narrative core that engineers prompt structures, built to refine characters and ideas.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <FeatureItem icon={<MessageSquareCode />} title="Prompt Engineering" desc="Automated structure refinement" />
                        <FeatureItem icon={<Zap />} title="Character Logic" desc="Consistent persona injection" />
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <a 
                            href="https://app.fearyour.life/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative px-8 py-3 rounded-xl bg-white text-black font-semibold tracking-wide overflow-hidden hover:text-violet-700 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-95 flex items-center gap-2 justify-center sm:justify-start"
                            aria-label="Launch Synthesis Core Application"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Launch Core <ExternalLink className="w-4 h-4" />
                            </span>
                            <div className="absolute inset-0 bg-violet-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </a>
                    </div>

                    <div className="pt-2">
                        <code className="block p-5 rounded-xl bg-[#050505] border border-white/10 font-mono text-xs md:text-sm text-violet-300 overflow-x-auto shadow-inner group-hover:border-violet-500/30 transition-colors relative">
                            <div className="absolute top-2 right-2 flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                                <div className="w-2 h-2 rounded-full bg-white/10"></div>
                            </div>
                            <span className="text-fuchsia-400">const</span> synthesis <span className="text-fuchsia-400">=</span> <span className="text-yellow-300">new</span> NarrativeCore(<span className="text-green-400">'F&Q'</span>);<br/>
                            await synthesis.<span className="text-blue-400">refine</span>(character_model);
                        </code>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="order-1 lg:order-2 relative h-[500px] glass-panel rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl bg-gradient-to-b from-white/5 to-transparent group-hover:shadow-[0_0_60px_rgba(139,92,246,0.15)] transition-all duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
                    
                    {/* Abstract Neural Representation */}
                    <div className="relative z-10 flex flex-col items-center gap-6 transform group-hover:scale-110 transition-transform duration-700">
                        
                        {/* Central Node - Gold Pen Nib Style */}
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.4)] relative animate-pulse-glow">
                            <PenTool className="w-10 h-10 text-white fill-white/10" strokeWidth={1.5} />
                            
                            {/* Decorative Rings - Adjusted to Gold/White theme */}
                            <div className="absolute inset-0 rounded-2xl border border-white/30 animate-[spin_8s_linear_infinite]"></div>
                            <div className="absolute -inset-2 rounded-2xl border border-orange-400/30 animate-[spin_12s_linear_infinite_reverse]"></div>
                        </div>
                        
                        <div className="h-24 w-px bg-gradient-to-b from-amber-200/50 to-transparent relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-white/80 animate-[scroll-text_2s_linear_infinite]"></div>
                        </div>
                        
                        <div className="flex gap-8">
                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md animate-bounce delay-75 hover:bg-white/10 transition-colors">
                                <span className="text-xs font-mono text-white/50">INPUT</span>
                            </div>
                            <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md animate-bounce delay-150 hover:bg-white/10 transition-colors">
                                <span className="text-xs font-mono text-white/50">LOGIC</span>
                            </div>
                            <div className="w-24 h-16 px-2 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center backdrop-blur-md animate-bounce delay-300 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                                <span className="text-[10px] font-mono text-violet-200 font-bold text-center leading-tight">BETTER<br/>PROMPT</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>
            </div>
        </TiltCard>
      </section>

      {/* Project 2: UMBRAX FLUX 3 */}
      <section id="project-flux" className="relative group scroll-mt-32" aria-labelledby="heading-flux">
        
        <TiltCard className="rounded-3xl">
            {/* Reverse Gradient for variety */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-l from-blue-600/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 -z-10"></div>

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md z-10">
                
                {/* Visual Side (Left this time) */}
                <div className="relative h-[500px] glass-panel rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl bg-black group-hover:shadow-[0_0_60px_rgba(99,102,241,0.2)] transition-all duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
                    
                    {/* Scanner/Engine Visual */}
                    <div className="relative w-64 h-64 transform group-hover:scale-105 transition-transform duration-700">
                        {/* Spinning Rings */}
                        <div className="absolute inset-0 rounded-full border border-indigo-500/30 border-t-white/80 animate-[spin_3s_linear_infinite]"></div>
                        <div className="absolute inset-4 rounded-full border border-violet-500/30 border-b-white/50 animate-[spin_5s_linear_infinite_reverse]"></div>
                        <div className="absolute inset-8 rounded-full border border-blue-500/20 border-l-blue-300/60 animate-[spin_7s_linear_infinite]"></div>
                        
                        <div className="absolute inset-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <Aperture className="w-12 h-12 text-indigo-300 animate-pulse" />
                        </div>
                        
                        {/* Scanning Line */}
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.8)] animate-scan"></div>
                    </div>

                    {/* Data Overlay with Online Indicator */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs font-mono text-indigo-200/60">
                        <span>RENDER_QUEUE: 0</span>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
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

                    <h2 id="heading-flux" className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white pb-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        UMBRAX <br /> FLUX 3
                    </h2>
                    
                    <p className="text-xl text-white/70 leading-relaxed">
                        An adaptive visual engine powered by SDXL and FLUX.1. Generates high-fidelity imagery with semantic precision.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <FeatureItem icon={<Layers />} title="SDXL Integration" desc="High-res latent diffusion" />
                        <FeatureItem icon={<Aperture />} title="Adaptive Flux" desc="Dynamic visual weighting" />
                    </div>
                    
                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <a 
                            href="https://flux.fearyour.life/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative px-8 py-3 rounded-xl bg-white text-black font-semibold tracking-wide overflow-hidden hover:text-indigo-700 transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] active:scale-95 flex items-center gap-2 justify-center sm:justify-start"
                            aria-label="Launch Umbrax Flux Engine"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Open Engine <ExternalLink className="w-4 h-4" />
                            </span>
                            <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </a>

                        <button
                            onClick={generateFluxDescription}
                            disabled={loadingInsight}
                            className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white/60 hover:text-indigo-300 transition-all flex items-center justify-center gap-2 text-xs font-mono tracking-wider"
                            aria-label="Generate AI Analysis for Flux"
                        >
                            {loadingInsight ? <Loader2 className="w-3 h-3 animate-spin" /> : <Bot className="w-3 h-3" />}
                            {fluxInsight ? "RE-SCAN" : "SYSTEM SCAN"}
                        </button>
                    </div>
                    
                    {fluxInsight && (
                        <div className="mt-2 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm font-mono animate-in fade-in slide-in-from-top-2">
                            <span className="text-indigo-400 mr-2">&gt;</span>
                            {fluxInsight}
                        </div>
                    )}
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
