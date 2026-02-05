
import React, { useEffect, useRef } from 'react';

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; speed: number; opacity: number; color: string }[] = [];
    let nebulas: { x: number; y: number; r: number; color: string; vx: number; vy: number }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      stars = [];
      for (let i = 0; i < 250; i++) {
        const isBlue = Math.random() > 0.8;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8,
          speed: Math.random() * 0.15 + 0.02,
          opacity: Math.random(),
          color: isBlue ? '#93c5fd' : '#ffffff'
        });
      }

      nebulas = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: canvas.width * 0.4, color: 'rgba(88, 28, 135, 0.15)', vx: 0.2, vy: 0.1 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, r: canvas.width * 0.5, color: 'rgba(30, 58, 138, 0.15)', vx: -0.1, vy: -0.2 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, r: canvas.width * 0.3, color: 'rgba(124, 58, 237, 0.1)', vx: 0.05, vy: 0.05 }
      ];
    };

    const draw = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Nebulas
      nebulas.forEach(n => {
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -n.r || n.x > canvas.width + n.r) n.vx *= -1;
        if (n.y < -n.r || n.y > canvas.height + n.r) n.vy *= -1;
      });

      // Draw Stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
        
        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 1) star.opacity = 1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
    />
  );
};

export default StarfieldBackground;
