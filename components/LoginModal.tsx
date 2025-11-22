import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, AlertCircle, Radio } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
        setInputValue('');
        setError('');
    }
  }, [isOpen]);

  const handleAuthenticate = () => {
    if (!inputValue) return;

    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      setIsShaking(true);
      setError('ACCESS DENIED: INVALID CREDENTIALS');
      setInputValue(''); // Clear input
      
      setTimeout(() => setIsShaking(false), 500);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuthenticate();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-sm transform transition-all duration-500 ${isShaking ? 'animate-shake' : ''}`}
      >
        <div className="relative bg-[#0a0a0c] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden group">
          
          {/* Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Visual Header */}
          <div className="flex flex-col items-center justify-center mb-8 mt-4">
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                {/* Rings */}
                <div className="absolute inset-0 rounded-full border border-violet-500/30 border-t-violet-200 animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-3 rounded-full border border-blue-500/20 border-b-blue-300 animate-[spin_4s_linear_infinite_reverse]" />
                
                {/* Core */}
                <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white] animate-pulse" />
                
                {/* Orbiting dot */}
                <div className="absolute inset-0 animate-[spin_2s_linear_infinite]">
                   <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-1" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">
              SYSTEM GATEWAY
            </h2>
            <p className="text-[10px] font-mono text-violet-300/50 tracking-[0.2em] uppercase">
              Restricted Access Level 5
            </p>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <div className="relative group/input">
              <input
                ref={inputRef}
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-center text-white tracking-[0.5em] focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder-white/10"
                placeholder="••••••••"
              />
            </div>

            {/* Action Button */}
            <button
              onClick={handleAuthenticate}
              disabled={isLoading}
              className="w-full relative overflow-hidden h-12 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 font-semibold tracking-wide text-white shadow-lg transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                        <span className="animate-pulse">VERIFYING...</span>
                    ) : (
                        'AUTHENTICATE'
                    )}
                </span>
            </button>
          </div>

          {/* Footer / Status */}
          <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center">
            <span className="text-[10px] font-mono text-white/30">NSD-CORE V17B</span>
            <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                <span className={`text-[10px] font-mono ${error ? 'text-red-400' : 'text-green-500/70'}`}>
                    {error ? 'UNAUTHORIZED' : 'ONLINE'}
                </span>
            </div>
          </div>

          {/* Error Message Pop */}
          {error && (
             <div className="absolute top-24 left-0 right-0 flex justify-center animate-bounce">
                <div className="bg-red-500/10 border border-red-500/50 px-3 py-1 rounded text-[10px] font-mono text-red-400 flex items-center gap-2 backdrop-blur-md">
                   <AlertCircle className="w-3 h-3" />
                   {error}
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};