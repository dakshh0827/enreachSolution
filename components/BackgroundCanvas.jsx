"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  CONFIG,
  initParticles,
  resizeParticles,
  drawConnections,
  drawCursorConnections,
  lerp,
} from "@/data/backgroundLogic";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const animateRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    runtimeConfig: CONFIG,
    mouseX: -9999,
    mouseY: -9999,
    mouseActive: false,
    targetParallaxX: 0,
    targetParallaxY: 0,
    parallaxX: 0,
    parallaxY: 0,
    animId: null,
    lastW: 0,
    lastH: 0,
  });

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const compact = W < 900;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = stateRef.current;

    s.runtimeConfig = compact || reducedMotion
      ? {
          ...CONFIG,
          LAYER_COUNTS: [38, 24, 14],
          MAX_CONNECTIONS: 3,
          MAX_CURSOR_CONNECTIONS: 5,
        }
      : CONFIG;

    s.particles = initParticles(W, H, s.runtimeConfig);
    s.lastW = W;
    s.lastH = H;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = stateRef.current;
    const newW = window.innerWidth;
    const newH = window.innerHeight;

    resizeParticles(s.particles, s.lastW, s.lastH, newW, newH);
    canvas.width = newW;
    canvas.height = newH;
    s.lastW = newW;
    s.lastH = newH;
  }, []);

  const handleMouseMove = useCallback((e) => {
    const s = stateRef.current;
    s.mouseX = e.clientX;
    s.mouseY = e.clientY;
    s.mouseActive = true;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    s.targetParallaxX =
      ((e.clientX - cx) / cx) * CONFIG.PARALLAX_STRENGTH * -80;
    s.targetParallaxY =
      ((e.clientY - cy) / cy) * CONFIG.PARALLAX_STRENGTH * -80;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const s = stateRef.current;
    s.mouseActive = false;
    s.targetParallaxX = 0;
    s.targetParallaxY = 0;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const s = stateRef.current;
    const cfg = s.runtimeConfig;

    s.parallaxX = lerp(s.parallaxX, s.targetParallaxX, 0.05);
    s.parallaxY = lerp(s.parallaxY, s.targetParallaxY, 0.05);

    ctx.clearRect(0, 0, W, H);

    const bgGrad = ctx.createRadialGradient(
      W * 0.5,
      H * 0.4,
      0,
      W * 0.5,
      H * 0.5,
      Math.max(W, H) * 0.8
    );
    bgGrad.addColorStop(0, "#04111e");
    bgGrad.addColorStop(0.5, "#020c16");
    bgGrad.addColorStop(1, "#010810");

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    s.particles.forEach((p) => {
      p.update(s.mouseX, s.mouseY, s.mouseActive, s.parallaxX, s.parallaxY);
    });

    drawConnections(ctx, s.particles, cfg, s.parallaxX, s.parallaxY);
    drawCursorConnections(
      ctx,
      s.particles,
      s.mouseX,
      s.mouseY,
      s.mouseActive,
      cfg,
      s.parallaxX,
      s.parallaxY
    );

    s.particles.forEach((p) => {
      p.draw(ctx, s.parallaxX, s.parallaxY);
    });

    s.animId = requestAnimationFrame(animateRef.current);
  }, []);

  useEffect(() => {
    init();
    animateRef.current = animate;
    const currentState = stateRef.current;

    const animId = requestAnimationFrame(animateRef.current);
    currentState.animId = animId;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(currentState.animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [init, animate, handleMouseMove, handleMouseLeave, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
