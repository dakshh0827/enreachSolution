// ─────────────────────────────────────────────
// /lib/backgroundLogic.js
// All particle, connection, and mouse logic
// ─────────────────────────────────────────────

export const CONFIG = {
  // Particle counts per layer
  LAYER_COUNTS: [60, 40, 25], // [bg, mid, fg]

  // Connection
  CONNECTION_DISTANCE: 160,
  MAX_CONNECTIONS: 5,
  CURSOR_CONNECTION_DISTANCE: 200,
  MAX_CURSOR_CONNECTIONS: 8,

  // Colors
  COLORS: {
    primary: { r: 0, g: 212, b: 255 },    // #00d4ff
    secondary: { r: 120, g: 80, b: 255 }, // purple
    accent: { r: 0, g: 255, b: 180 },     // cyan-green
    white: { r: 200, g: 220, b: 255 },    // tinted white
  },

  // Layer speeds (parallax)
  LAYER_SPEEDS: [0.15, 0.35, 0.65],
  LAYER_SIZE_RANGES: [[0.8, 1.6], [1.4, 2.8], [2.4, 4.2]],
  LAYER_OPACITIES: [0.25, 0.5, 0.9],

  // Mouse parallax shift strength
  PARALLAX_STRENGTH: 0.025,

  // Cursor glow
  CURSOR_GLOW_RADIUS: 180,
};

// ─── Utility ──────────────────────────────────

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function dist2(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

export function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function pickColor(cfg) {
  const keys = Object.keys(cfg.COLORS);
  // Weight towards primary
  const weights = [0.5, 0.25, 0.15, 0.1];
  let r = Math.random();
  let idx = 0;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) { idx = i; break; }
  }
  return cfg.COLORS[keys[idx]];
}

// ─── Particle Class ────────────────────────────

export class Particle {
  constructor(canvasW, canvasH, layer, cfg) {
    this.layer = layer;
    this.cfg = cfg;
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.reset(true);
  }

  reset() {
    const cfg = this.cfg;
    const layer = this.layer;

    this.x = randRange(0, this.canvasW);
    this.y = randRange(0, this.canvasH);

    const sizeRange = cfg.LAYER_SIZE_RANGES[layer];
    this.radius = randRange(sizeRange[0], sizeRange[1]);

    const speed = cfg.LAYER_SPEEDS[layer];
    const angle = randRange(0, Math.PI * 2);
    this.vx = Math.cos(angle) * speed * randRange(0.4, 1.2);
    this.vy = Math.sin(angle) * speed * randRange(0.4, 1.2);

    this.driftAngle = randRange(0, Math.PI * 2);
    this.driftSpeed = randRange(0.002, 0.006);
    this.driftRadius = randRange(0.1, 0.4) * speed;

    this.baseOpacity = cfg.LAYER_OPACITIES[layer] * randRange(0.6, 1.0);
    this.opacity = this.baseOpacity;

    this.color = pickColor(cfg);

    this.pulsePhase = randRange(0, Math.PI * 2);
    this.pulseSpeed = randRange(0.01, 0.025);
    this.pulseAmount = randRange(0.05, 0.2);

    this.highlighted = false;
    this.highlightStrength = 0;
  }

  update(mouseX, mouseY, mouseActive, parallaxOffsetX, parallaxOffsetY) {
    this.driftAngle += this.driftSpeed;

    this.x += this.vx + Math.cos(this.driftAngle) * this.driftRadius;
    this.y += this.vy + Math.sin(this.driftAngle) * this.driftRadius;

    const pad = this.radius * 2;

    if (this.x < -pad) this.x = this.canvasW + pad;
    if (this.x > this.canvasW + pad) this.x = -pad;
    if (this.y < -pad) this.y = this.canvasH + pad;
    if (this.y > this.canvasH + pad) this.y = -pad;

    // Pulse (kept)
    this.pulsePhase += this.pulseSpeed;
    const pulse = Math.sin(this.pulsePhase) * this.pulseAmount;
    this.opacity = Math.min(1, Math.max(0, this.baseOpacity + pulse));

    // Highlight logic (kept ONLY for connections)
    if (mouseActive) {
      const threshold2 =
        this.cfg.CURSOR_CONNECTION_DISTANCE *
        this.cfg.CURSOR_CONNECTION_DISTANCE;

      const d2 = dist2(
        this.x + parallaxOffsetX * (this.layer + 1),
        this.y + parallaxOffsetY * (this.layer + 1),
        mouseX,
        mouseY
      );

      if (d2 < threshold2) {
        this.highlighted = true;
        this.highlightStrength = lerp(
          this.highlightStrength,
          1 - d2 / threshold2,
          0.12
        );
      } else {
        this.highlighted = false;
        this.highlightStrength = lerp(this.highlightStrength, 0, 0.08);
      }
    } else {
      this.highlighted = false;
      this.highlightStrength = lerp(this.highlightStrength, 0, 0.05);
    }
  }

  draw(ctx, parallaxOffsetX, parallaxOffsetY) {
    const { r, g, b } = this.color;

    const px = this.x + parallaxOffsetX * (this.layer + 1);
    const py = this.y + parallaxOffsetY * (this.layer + 1);

    // ❌ NO glow, NO radius scaling
    const finalRadius = this.radius;
    const finalOpacity = this.opacity;

    // Clean core dot only
    ctx.beginPath();
    ctx.arc(px, py, finalRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${finalOpacity})`;
    ctx.fill();
  }
}

// ─── Connection Drawing ───────────────────────

export function drawConnections(ctx, particles, cfg, parallaxOffsetX, parallaxOffsetY) {
  const threshold2 = cfg.CONNECTION_DISTANCE * cfg.CONNECTION_DISTANCE;

  for (let i = 0; i < particles.length; i++) {
    let connections = 0;
    const a = particles[i];
    const ax = a.x + parallaxOffsetX * (a.layer + 1);
    const ay = a.y + parallaxOffsetY * (a.layer + 1);

    for (let j = i + 1; j < particles.length; j++) {
      if (connections >= cfg.MAX_CONNECTIONS) break;

      const b = particles[j];
      const bx = b.x + parallaxOffsetX * (b.layer + 1);
      const by = b.y + parallaxOffsetY * (b.layer + 1);

      const d2 = dist2(ax, ay, bx, by);
      if (d2 > threshold2) continue;

      const distRatio = 1 - d2 / threshold2;
      const highlightBoost = (a.highlightStrength + b.highlightStrength) * 0.5;
      const baseAlpha = distRatio * 0.18 * cfg.LAYER_OPACITIES[a.layer];
      const finalAlpha = Math.min(0.85, baseAlpha + highlightBoost * 0.55);

      const { r: r1, g: g1, b: b1 } = a.color;
      const { r: r2, g: g2, b: b2 } = b.color;

      const grad = ctx.createLinearGradient(ax, ay, bx, by);
      grad.addColorStop(0, `rgba(${r1},${g1},${b1},${finalAlpha})`);
      grad.addColorStop(1, `rgba(${r2},${g2},${b2},${finalAlpha})`);

      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.strokeStyle = grad;
      ctx.lineWidth = highlightBoost > 0.3 ? 1.2 : 0.5;
      ctx.stroke();

      connections++;
    }
  }
}

// ─── Cursor Connections ───────────────────────

export function drawCursorConnections(ctx, particles, mouseX, mouseY, mouseActive, cfg, parallaxOffsetX, parallaxOffsetY) {
  if (!mouseActive) return;

  const threshold2 = cfg.CURSOR_CONNECTION_DISTANCE * cfg.CURSOR_CONNECTION_DISTANCE;
  let count = 0;

  // Sort by distance
  const withDist = particles
    .map((p) => {
      const px = p.x + parallaxOffsetX * (p.layer + 1);
      const py = p.y + parallaxOffsetY * (p.layer + 1);
      return { p, px, py, d2: dist2(px, py, mouseX, mouseY) };
    })
    .filter(({ d2 }) => d2 < threshold2)
    .sort((a, b) => a.d2 - b.d2)
    .slice(0, cfg.MAX_CURSOR_CONNECTIONS);

  for (const { p, px, py, d2 } of withDist) {
    const distRatio = 1 - d2 / threshold2;
    const alpha = distRatio * 0.65;
    const { r, g, b } = p.color;

    const grad = ctx.createLinearGradient(mouseX, mouseY, px, py);
    grad.addColorStop(0, `rgba(0,212,255,${alpha * 0.9})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},${alpha * 0.4})`);

    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(px, py);
    ctx.strokeStyle = grad;
    ctx.lineWidth = distRatio * 1.5;
    ctx.stroke();
  }
}

// ─── Cursor Glow ─────────────────────────────

export function drawCursorMarker(ctx, mouseX, mouseY, mouseActive) {
  if (!mouseActive) return;

  ctx.save();
  ctx.strokeStyle = "rgba(0,212,255,0.7)";
  ctx.lineWidth = 1;
  const cs = 8;
  ctx.beginPath();
  ctx.moveTo(mouseX - cs, mouseY);
  ctx.lineTo(mouseX + cs, mouseY);
  ctx.moveTo(mouseX, mouseY - cs);
  ctx.lineTo(mouseX, mouseY + cs);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,212,255,0.95)";
  ctx.fill();
  ctx.restore();
}

export function drawCursorGlow(ctx, mouseX, mouseY, mouseActive) {
  if (!mouseActive) return;

  const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, CONFIG.CURSOR_GLOW_RADIUS);
  glow.addColorStop(0, "rgba(0,212,255,0.06)");
  glow.addColorStop(0.4, "rgba(0,180,255,0.03)");
  glow.addColorStop(1, "rgba(0,212,255,0)");

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, CONFIG.CURSOR_GLOW_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();
}

// ─── Scan Line Effect ─────────────────────────

export function drawScanLine(ctx, canvasW, canvasH, timestamp) {
  const y = ((timestamp * 0.04) % (canvasH + 60)) - 30;

  const grad = ctx.createLinearGradient(0, y - 30, 0, y + 30);
  grad.addColorStop(0, "rgba(0,212,255,0)");
  grad.addColorStop(0.5, "rgba(0,212,255,0.04)");
  grad.addColorStop(1, "rgba(0,212,255,0)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, y - 30, canvasW, 60);
}

// ─── Grid Overlay ─────────────────────────────

export function drawGrid(ctx, canvasW, canvasH) {
  ctx.save();
  ctx.strokeStyle = "rgba(0,212,255,0.03)";
  ctx.lineWidth = 0.5;

  const step = 60;
  for (let x = 0; x < canvasW; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasH);
    ctx.stroke();
  }
  for (let y = 0; y < canvasH; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasW, y);
    ctx.stroke();
  }
  ctx.restore();
}

// ─── Init Particles ───────────────────────────

export function initParticles(canvasW, canvasH, cfg) {
  const particles = [];
  cfg.LAYER_COUNTS.forEach((count, layer) => {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvasW, canvasH, layer, cfg));
    }
  });
  return particles;
}

// ─── Resize Handler ───────────────────────────

export function resizeParticles(particles, oldW, oldH, newW, newH) {
  particles.forEach((p) => {
    p.x = (p.x / oldW) * newW;
    p.y = (p.y / oldH) * newH;
    p.canvasW = newW;
    p.canvasH = newH;
  });
}
