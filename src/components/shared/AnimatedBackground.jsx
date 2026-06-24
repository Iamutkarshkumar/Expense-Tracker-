import React, { useEffect, useRef } from "react";
import "./Ambient.css"; 

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const glow = glowRef.current;
    if (!canvas || !ctx || !glow) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId;
    let particles = [];
    let cursorTrail = [];
    const TRAIL_LENGTH = 40;
    const PARTICLE_COUNT = Math.floor((width * height) / 15000); 

    let mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouse.tx - this.x;
        const dy = mouse.ty - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // CHANGED: Dark slate color for particles
        ctx.fillStyle = `rgba(71, 85, 105, ${this.baseAlpha})`; 
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      mouse.tx += (mouse.x - mouse.tx) / 15;
      mouse.ty += (mouse.y - mouse.ty) / 15;

      glow.style.transform = `translate3d(${Math.round(mouse.tx)}px, ${Math.round(mouse.ty)}px, 0)`;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => p.update());

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 120) * 0.2; 
            // CHANGED: Dark slate color for connecting lines
            ctx.strokeStyle = `rgba(100, 116, 139, ${alpha})`; 
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => p.draw());

      cursorTrail.push({ x: mouse.tx, y: mouse.ty });
      if (cursorTrail.length > TRAIL_LENGTH) {
        cursorTrail.shift();
      }

      if (cursorTrail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(cursorTrail[0].x, cursorTrail[0].y);
        for (let i = 1; i < cursorTrail.length; i++) {
          const xc = (cursorTrail[i].x + cursorTrail[i - 1].x) / 2;
          const yc = (cursorTrail[i].y + cursorTrail[i - 1].y) / 2;
          ctx.quadraticCurveTo(cursorTrail[i - 1].x, cursorTrail[i - 1].y, xc, yc);
        }
        ctx.lineTo(cursorTrail[cursorTrail.length - 1].x, cursorTrail[cursorTrail.length - 1].y);
        
        const gradient = ctx.createLinearGradient(
          cursorTrail[0].x, cursorTrail[0].y, 
          mouse.tx, mouse.ty
        );
        // CHANGED: Dark trail color
        gradient.addColorStop(0, "rgba(15, 23, 42, 0)");
        gradient.addColorStop(1, "rgba(15, 23, 42, 0.3)");
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      const newCount = Math.floor((width * height) / 15000);
      for (let i = 0; i < newCount; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ambient-container">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="ambient-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10"
            result="ambient-goo"
          />
          <feComposite in="SourceGraphic" in2="ambient-goo" operator="atop" />
        </filter>
      </svg>

      <div className="fluid-background" style={{ filter: "url(#ambient-goo)" }}>
        <div className="fluid-shape f1"></div>
        <div className="fluid-shape f2"></div>
        <div className="fluid-shape f3"></div>
        <div ref={glowRef} className="fluid-interactive"></div>
      </div>

      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  );
};

export default AnimatedBackground;