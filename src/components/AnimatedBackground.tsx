import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  isDarkMode?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;
    }

    const darkColors = ['#6366f1', '#38bdf8', '#8b5cf6', '#10b981'];
    const lightColors = ['#4f46e5', '#0284c7', '#7c3aed', '#059669', '#2563eb'];
    const colors = isDarkMode ? darkColors : lightColors;

    const nodeCount = Math.min(Math.floor((width * height) / 16000), 70);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alphaFactor = isDarkMode ? 0.22 : 0.28;
            const alpha = (1 - dist / 135) * alphaFactor;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDarkMode
              ? `rgba(99, 102, 241, ${alpha})`
              : `rgba(79, 70, 229, ${alpha})`;
            ctx.lineWidth = isDarkMode ? 0.8 : 1.1;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse gentle repulsion / pull
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const force = (1 - mdist / 140) * 0.5;
          node.x -= (mdx / mdist) * force;
          node.y -= (mdy / mdist) * force;
        }

        // Pulsing glow
        const currentRadius = node.radius + Math.sin(time + node.pulseOffset) * 0.5;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = isDarkMode ? 0.15 : 0.22;
        ctx.fill();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(currentRadius, 0.8), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = isDarkMode ? 0.85 : 0.95;
        ctx.fill();

        ctx.globalAlpha = 1.0;
      }

      // Interactive mouse aura
      if (mouseX > 0 && mouseY > 0) {
        const auraGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 170);
        if (isDarkMode) {
          auraGrad.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
          auraGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.05)');
          auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          auraGrad.addColorStop(0, 'rgba(79, 70, 229, 0.14)');
          auraGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
          auraGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 170, 0, Math.PI * 2);
        ctx.fillStyle = auraGrad;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Base Canvas / Gradient Surface */}
      {isDarkMode ? (
        <>
          {/* Deep Cyber Space Base */}
          <div className="absolute inset-0 bg-[#030712]" />

          {/* Floating Animated Luminous Dark Nebulae */}
          <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute top-[35%] right-[-10%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-600/12 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
          <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-cyan-500/10 blur-[110px] pointer-events-none" />
        </>
      ) : (
        <>
          {/* Soft Ethereal Aurora Base for Light Theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100" />

          {/* Floating Luminous Pastel Orbs for Light Theme */}
          <div className="absolute top-[-5%] left-[-5%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-indigo-400/25 to-sky-300/25 blur-[100px] animate-pulse pointer-events-none" />
          <div className="absolute top-[30%] right-[-5%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-gradient-to-bl from-purple-400/20 to-pink-300/18 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-5%] left-[25%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-r from-emerald-300/25 to-teal-300/20 blur-[110px] pointer-events-none" />
          <div className="absolute top-[15%] left-[45%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-t from-sky-300/20 to-indigo-300/15 blur-[90px] pointer-events-none" />
        </>
      )}

      {/* Interactive Neural ZK Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Grid Pattern Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isDarkMode ? 0.03 : 0.045,
          backgroundImage: isDarkMode
            ? `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`
            : `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />
    </div>
  );
};