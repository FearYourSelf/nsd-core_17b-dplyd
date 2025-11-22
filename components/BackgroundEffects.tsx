
import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Advanced Particle Class
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      speedX: number;
      speedY: number;
      colorType: 'purple' | 'white' | 'blue';
      opacity: number;
      depth: number; // 1 = front, 0.5 = mid, 0.2 = far

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.depth = Math.random() * 0.8 + 0.2; // Random depth
        this.size = (Math.random() * 2 + 0.5) * this.depth;
        this.speedX = (Math.random() * 0.2 - 0.1) * this.depth;
        this.speedY = (Math.random() * 0.2 - 0.1) * this.depth;
        this.density = (Math.random() * 20) + 1;
        
        const rand = Math.random();
        if (rand > 0.7) this.colorType = 'purple';
        else if (rand > 0.9) this.colorType = 'blue';
        else this.colorType = 'white';
        
        this.opacity = (Math.random() * 0.5 + 0.1) * this.depth;
      }

      update() {
        // Mouse Interaction (Repulsion)
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 150;
        const force = (forceDistance - distance) / forceDistance;
        const directionX = dx / distance;
        const directionY = dy / distance;

        if (distance < forceDistance) {
          this.x -= directionX * force * this.density * 0.5;
          this.y -= directionY * force * this.density * 0.5;
        } else {
          // Return to base movement
          if (this.x !== this.baseX) {
             const dx = this.x - this.baseX;
             this.x -= dx/50;
          }
          if (this.y !== this.baseY) {
             const dy = this.y - this.baseY;
             this.y -= dy/50;
          }
        }

        // Natural movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Update base for drifting
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Wrap around screen
        if (this.x < -20) { this.x = width + 20; this.baseX = width + 20; }
        if (this.x > width + 20) { this.x = -20; this.baseX = -20; }
        if (this.y < -20) { this.y = height + 20; this.baseY = height + 20; }
        if (this.y > height + 20) { this.y = -20; this.baseY = -20; }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        if (this.colorType === 'purple') {
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        } else if (this.colorType === 'blue') {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        }
        
        ctx.fill();
      }
    }

    // Create Particles
    const particleCount = Math.floor((width * height) / 12000); 
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      // Draw Particles & Connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Constellations (Draw lines between close particles)
        // Only connect if same color family or if very close
        // Optimization: Only check particles j > i to avoid double check
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect limit
          if (distance < 100) {
             ctx.beginPath();
             const opacity = (1 - distance / 100) * 0.15 * particles[i].depth;
             ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
             ctx.lineWidth = 0.5 * particles[i].depth;
             ctx.moveTo(particles[i].x, particles[i].y);
             ctx.lineTo(particles[j].x, particles[j].y);
             ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Static Grid Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      />
      
      {/* Volumetric Fog Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-violet-950/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[600px] bg-indigo-950/10 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Main Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Vignette & Grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
};
