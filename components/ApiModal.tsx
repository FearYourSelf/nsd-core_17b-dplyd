
import React, { useEffect, useState, useRef } from 'react';
import { X, ArrowRight, Sparkles, Zap, Shield, Cpu, Layers, Globe, Check, Copy, Terminal, Code2, Image as ImageIcon, MessageSquare, LayoutGrid } from 'lucide-react';

interface ApiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Lang = 'curl' | 'python' | 'node';
type Scenario = 'text' | 'image';
type Tab = 'overview' | 'integration';

export const ApiModal: React.FC<ApiModalProps> = ({ isOpen, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Tilt & Spotlight State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  // UI State
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeLang, setActiveLang] = useState<Lang>('curl');
  const [activeScenario, setActiveScenario] = useState<Scenario>('text');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    text: {
      curl: `curl https://api.nsd-core.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $NSD_KEY" \\
  -d '{
    "model": "nsd-core-70b",
    "messages": [
      { "role": "user", "content": "Explain quantum entanglement" }
    ]
  }'`,
      python: `import openai

client = openai.OpenAI(
    base_url="https://api.nsd-core.com/v1", 
    api_key="YOUR_NSD_KEY"
)

response = client.chat.completions.create(
    model="nsd-core-70b",
    messages=[
        {"role": "user", "content": "Explain quantum entanglement"}
    ]
)
print(response.choices[0].message.content)`,
      node: `import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.nsd-core.com/v1',
  apiKey: process.env.NSD_KEY
});

const response = await client.chat.completions.create({
  model: 'nsd-core-70b',
  messages: [
    { role: 'user', content: 'Explain quantum entanglement' }
  ]
});

console.log(response.choices[0].message.content);`
    },
    image: {
      curl: `curl https://api.nsd-core.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $NSD_KEY" \\
  -d '{
    "model": "nsd-core-70b",
    "messages": [
      {
        "role": "user", 
        "content": [
          { "type": "text", "text": "Analyze this diagram" },
          { "type": "image_url", "image_url": { "url": "https://..." } }
        ]
      }
    ]
  }'`,
      python: `response = client.chat.completions.create(
    model="nsd-core-70b",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Analyze this diagram"},
            {
                "type": "image_url", 
                "image_url": {"url": "https://example.com/image.png"}
            }
        ]
    }]
)
print(response.choices[0].message.content)`,
      node: `const response = await client.chat.completions.create({
  model: 'nsd-core-70b',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Analyze this diagram' },
      { 
        type: 'image_url', 
        image_url: { url: 'https://example.com/image.png' } 
      }
    ]
  }]
});`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeScenario][activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      requestAnimationFrame(() => {
         requestAnimationFrame(() => setAnimateIn(true));
      });
      
      const timer = setTimeout(() => setIsInteracting(true), 700);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      setIsInteracting(false);
      const timer = setTimeout(() => setIsMounted(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    
    const rect = modalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    setSpotlight({ x: xPct, y: yPct });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    setRotate({ x: normY * -4, y: normX * 4 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setSpotlight({ x: 50, y: 50 }); 
  };

  if (!isMounted) return null;

  const features = [
    { icon: Cpu, label: "70B Parameter Expert Model" },
    { icon: Layers, label: "Native Multimodal (A/V/T)" },
    { icon: Zap, label: "Sub-20ms TTFT Latency" },
    { icon: Globe, label: "Global Edge Caching" },
    { icon: Shield, label: "Enterprise Encryption" },
    { icon: Sparkles, label: "MCP Tool Integration" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 perspective-[1500px] items-end sm:items-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-[#050507]/80 backdrop-blur-xl transition-opacity duration-700 ease-out ${
            animateIn ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 3D Container */}
      <div 
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-5xl bg-[#0a0a0c] rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.15)] border border-white/10 
            ${isInteracting ? 'transition-transform duration-100 ease-out' : 'transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)'}
            flex flex-col max-h-[90dvh] md:max-h-[85vh]
        `}
        style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn 
                ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` 
                : `perspective(1000px) rotateX(15deg) rotateY(0deg) translateY(50px) scale3d(0.9, 0.9, 0.9)`,
        }}
      >
            {/* --- Background Layers --- */}
             <div 
                className="absolute inset-0 opacity-80 transition-transform duration-100 ease-out will-change-transform pointer-events-none"
                style={{
                    backgroundImage: `url('https://pub-a1b327e0f0794695b6f7d05baa938672.r2.dev/q-97c536f9.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `scale(1.1) translate(${rotate.y * -1.5}px, ${rotate.x * -1.5}px)` 
                }}
             />
             <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
                style={{
                    background: `radial-gradient(800px circle at ${spotlight.x}% ${spotlight.y}%, rgba(139, 92, 246, 0.1), transparent 40%)`
                }}
             />
             <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none z-0" />
             
             {/* Mobile Unified Overlay */}
             <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/90 via-black/80 to-black/90 z-0 pointer-events-none" />

             {/* --- Content Wrapper --- */}
             <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden bg-transparent z-10 relative">
                
                {/* Scroll Container */}
                <div className="flex-1 w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden custom-scrollbar overscroll-contain">

                    {/* Left Panel: CTA */}
                    <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col justify-between relative shrink-0 md:h-full md:overflow-y-auto">
                        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent z-0" />
                        
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest text-violet-300 mb-8 shadow-[0_0_15px_rgba(139,92,246,0.1)] animate-pulse-glow-text">
                                <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
                                </span>
                                API EARLY ACCESS
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-xl">
                                Unlock the{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-400 drop-shadow-md">
                                    Core Intelligence
                                </span>
                            </h2>
                            
                            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-sm mb-8 font-light drop-shadow-md">
                                Direct access to NSD-CORE/70B through our high-velocity API. Integrate expert-gated reasoning into your own infrastructure.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col gap-5 mt-8 md:mt-auto">
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
                            <p className="text-[10px] text-white/50 font-mono uppercase tracking-wider shadow-sm">
                                Limited Availability
                            </p>
                            <div className="h-px flex-1 bg-white/10" />
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Tabs & Content */}
                    <div className="w-full md:flex-1 md:bg-black/30 md:backdrop-blur-md md:border-l border-white/5 flex flex-col relative shrink-0 md:h-full md:overflow-y-auto custom-scrollbar">
                        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

                        {/* Tab Navigation - HIDDEN Integration on Mobile */}
                        <div className="relative z-20 flex items-center gap-1 px-6 pt-6 pb-2 border-b border-white/5 sticky top-0 bg-[#0a0a0c]/95 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none shadow-lg md:shadow-none">
                            <button 
                                onClick={() => setActiveTab('overview')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${
                                    activeTab === 'overview' 
                                    ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <LayoutGrid className="w-3 h-3" /> OVERVIEW
                            </button>
                            <button 
                                onClick={() => setActiveTab('integration')}
                                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all ${
                                    activeTab === 'integration' 
                                    ? 'bg-violet-500/20 text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.2)] border border-violet-500/20' 
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <Terminal className="w-3 h-3" /> INTEGRATION
                            </button>
                        </div>

                        {/* Tab Content Area */}
                        <div className="relative z-10 p-6 md:p-8 lg:p-10 pb-40 md:pb-24">
                            
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <div className="grid grid-cols-1 gap-3 animate-fade-in-up">
                                    {features.map((feature, idx) => (
                                        <div 
                                            key={idx}
                                            className="group/item flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-white/5 bg-black/40 hover:bg-white/5 hover:border-violet-500/30 transition-all duration-300"
                                            style={{ animationDelay: `${idx * 50}ms` }}
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center text-violet-300 group-hover/item:scale-110 group-hover/item:text-white transition-all duration-300 shadow-inner shrink-0">
                                                <feature.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors">
                                                {feature.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Integration Tab - Desktop Only */}
                            {activeTab === 'integration' && (
                                <div className="hidden md:flex flex-col gap-6 animate-fade-in-up">
                                    
                                    {/* Controls */}
                                    <div className="flex flex-col sm:flex-row justify-between gap-4 bg-black/40 p-3 rounded-xl border border-white/5 shrink-0">
                                        <div className="flex p-1 bg-white/5 rounded-lg">
                                            <button 
                                                onClick={() => setActiveScenario('text')}
                                                className={`flex-1 px-3 py-1.5 text-[10px] font-mono rounded-md transition-all ${
                                                    activeScenario === 'text' ? 'bg-violet-500/20 text-violet-200 shadow-sm' : 'text-white/40 hover:text-white'
                                                }`}
                                            >
                                                <span className="flex items-center justify-center gap-1.5">
                                                    <MessageSquare className="w-3 h-3" /> GENERATE
                                                </span>
                                            </button>
                                            <button 
                                                onClick={() => setActiveScenario('image')}
                                                className={`flex-1 px-3 py-1.5 text-[10px] font-mono rounded-md transition-all ${
                                                    activeScenario === 'image' ? 'bg-violet-500/20 text-violet-200 shadow-sm' : 'text-white/40 hover:text-white'
                                                }`}
                                            >
                                                <span className="flex items-center justify-center gap-1.5">
                                                    <ImageIcon className="w-3 h-3" /> ANALYZE
                                                </span>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-white/40">
                                            {(['curl', 'python', 'node'] as Lang[]).map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => setActiveLang(lang)}
                                                    className={`px-2 py-1 rounded hover:text-white transition-colors ${
                                                        activeLang === lang ? 'text-white underline decoration-violet-500 decoration-2 underline-offset-4' : ''
                                                    }`}
                                                >
                                                    {lang.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Code Window */}
                                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden border border-white/10 bg-[#050507] shadow-inner group/code flex flex-col shrink-0">
                                        <div className="absolute top-3 right-3 z-20">
                                            <button 
                                                onClick={handleCopy}
                                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                                                title="Copy Snippet"
                                            >
                                                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 shrink-0">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                            </div>
                                            <div className="ml-2 text-[10px] text-white/30 font-mono flex items-center gap-1.5">
                                                <Code2 className="w-3 h-3" />
                                                example.{activeLang === 'curl' ? 'sh' : activeLang === 'node' ? 'ts' : 'py'}
                                            </div>
                                        </div>

                                        {/* Scrollable Code Area - Fixed Clipping by using Flex + Scroll inside */}
                                        <div className="flex-1 overflow-auto custom-scrollbar bg-[#050507]">
                                            <div className="p-6 pb-12 w-full">
                                                <pre className="text-xs font-mono leading-relaxed text-indigo-300/90 whitespace-pre-wrap break-words font-ligatures-none">
                                                    <code>{codeSnippets[activeScenario][activeLang]}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
             </div>

            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300 backdrop-blur-xl"
            >
                <X className="w-4 h-4" />
            </button>
          </div>
    </div>
  );
};
