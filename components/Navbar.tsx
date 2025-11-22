
import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
  onOpenLogin: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, onOpenLogin, onScrollTo }) => {
  const [isHoveringDash, setIsHoveringDash] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-violet-900/20 py-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-8 relative">
        
        {/* Left Side Navigation Shortcuts */}
        <div className="hidden md:flex items-center gap-8 z-40">
             <button 
                onClick={() => onScrollTo('project-synthesis')} 
                className="text-[10px] font-mono tracking-widest text-white/40 hover:text-violet-300 transition-all hover:scale-105 uppercase relative group"
             >
                F&Q // Synthesis
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-500 transition-all group-hover:w-full"></span>
             </button>
             <button 
                onClick={() => onScrollTo('project-flux')} 
                className="text-[10px] font-mono tracking-widest text-white/40 hover:text-indigo-300 transition-all hover:scale-105 uppercase relative group"
             >
                Umbrax Flux
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 transition-all group-hover:w-full"></span>
             </button>
        </div>

        {/* Text Container with Transitions (Centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-30">
          
          {/* Initial State: Fear Your Life */}
          <span 
            className={`absolute transition-all duration-700 transform text-sm font-medium tracking-[0.2em] uppercase flex items-center ${
              scrolled ? '-translate-y-10 opacity-0 blur-sm' : 'translate-y-0 opacity-100 blur-0'
            }`}
          >
             <span className="text-white/90 animate-pulse-glow-text">FEAR</span> 
             <span className="text-violet-500 animate-pulse-glow-text px-2 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">YOUR</span> 
             <span className="text-white/90 animate-pulse-glow-text">LIFE</span>
          </span>

          {/* Scrolled State: NSD-CORE/17B */}
          <span 
            className={`absolute transition-all duration-700 transform text-sm font-bold tracking-[0.15em] ${
              scrolled ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-10 opacity-0 blur-sm'
            }`}
          >
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-white animate-subtle-breathe drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]">
               NSD-CORE/17B
             </span>
          </span>

        </div>

        {/* Dashboard Button with Decrypt Effect */}
        <button 
            onClick={onOpenLogin}
            onMouseEnter={() => setIsHoveringDash(true)}
            onMouseLeave={() => setIsHoveringDash(false)}
            className="ml-auto md:ml-0 group relative px-4 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 transition-all duration-300 active:scale-95 overflow-hidden z-40"
        >
            <span className="relative z-10 flex items-center gap-2 text-[10px] font-mono tracking-wider text-white/70 group-hover:text-violet-200 transition-colors">
                <LayoutDashboard className={`w-3 h-3 ${isHoveringDash ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                {isHoveringDash ? (
                    <span className="animate-pulse">ACCESS_DB</span>
                ) : (
                    "DASHBOARD"
                )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1s_infinite]" />
        </button>

      </div>
    </header>
  );
};
