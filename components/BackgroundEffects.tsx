
import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuration
    const PARTICLE_COUNT = 800; // Balanced density
    const CONNECTION_DIST = 100;
    const MOUSE_RADIUS = 200;
    const DEPTH = 1000; // Z-depth of the field

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // State
    const mouse = { x: -1000, y: -1000 };
    
    // 3D Particle Class
    class Node {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;

      constructor() {
        // Random 3D Position
        this.x = Math.random() * width - width / 2;
        this.y = Math.random() * height - height / 2;
        this.z = Math.random() * DEPTH;
        
        // Base position for "memory" spring effect
        this.baseX = this.x;
        this.baseY = this.y;

        // Velocity (drift)
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.vz = (Math.random() - 0.5) * 0.2;

        this.size = Math.random() * 1.5;
        
        // Palette: White, Indigo, Violet
        const tint = Math.random();
        if (tint > 0.9) this.color = '255, 255, 255'; // White highlights
        else if (tint > 0.6) this.color = '139, 92, 246'; // Violet
        else this.color = '99, 102, 241'; // Indigo
      }

      update() {
        // 1. Basic Drift
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // 2. Mouse Interaction (Raycast approximation)
        // Project particle to 2D to check mouse distance
        const fov = 600;
        const scale = fov / (fov + this.z);
        const screenX = width / 2 + this.x * scale;
        const screenY = height / 2 + this.y * scale;

        const dx = mouse.x - screenX;
        const dy = mouse.y - screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion / Excitation
        if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            
            // Push away gently (Magnetic repulsion)
            const push = force * 4;
            this.x -= Math.cos(angle) * push;
            this.y -= Math.sin(angle) * push;
        } else {
            // Spring back to drift path (Memory)
            // We don't spring back to exact pixels, but dampen velocity to stabilize
        }

        // 3. Bounds Check (Respawn in void)
        if (this.z < -fov + 100) this.z = DEPTH; // Came too close
        if (this.z > DEPTH) this.z = -fov + 100;
        
        // Wrap X/Y based on perspective bounds (approx)
        const bound = width * 1.5;
        if (this.x > bound) this.x = -bound;
        if (this.x < -bound) this.x = bound;
        if (this.y > bound) this.y = -bound;
        if (this.y < -bound) this.y = bound;
      }

      draw(nodes: Node[]) {
        if (!ctx) return;
        
        const fov = 600;
        const scale = fov / (fov + this.z);
        
        // 3D -> 2D Projection
        const screenX = width / 2 + this.x * scale;
        const screenY = height / 2 + this.y * scale;

        if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) return;

        const alpha = Math.max(0.1, (1 - this.z / DEPTH)); // Fade distant nodes

        // Draw Node
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
        ctx.fill();

        // Draw Connections (Synapses) - Only if near mouse to simulate "Activity"
        // Optimization: Only check connections if particle is activated by mouse
        const dxMouse = mouse.x - screenX;
        const dyMouse = mouse.y - screenY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_RADIUS) {
            // Connect to Mouse
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${this.color}, ${alpha * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Connect to Neighbors (Simple spatial check - O(N^2) reduced by dist check)
            // Note: In production, a spatial hash grid is better, but for 800 particles, 
            // checking only "active" ones against a subset is fine.
        }
      }
    }

    const nodes: Node[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) nodes.push(new Node());

    let animationFrame: number;

    const animate = () => {
      if (!ctx) return;

      // Clear with very slight trail for "screen burn" feel
      ctx.fillStyle = 'rgba(5, 5, 7, 0.3)'; 
      ctx.fillRect(0, 0, width, height);

      // Add subtle Vignette to canvas
      // We do this by gradients or just keeping edges dark naturally via particle alpha

      nodes.forEach(node => {
        node.update();
        node.draw(nodes);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 z-0 pointer-events-none bg-[#050507]"
        />
        {/* Film Grain Overlay for texture */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </>
  );
};
