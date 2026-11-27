// Deterministic per-coin anime-style galaxy backdrop.
// Seeded by ticker and/or contract address so the same coin always gets the
// same scene. Used by Trophy Room cards and Replay frames. No network calls.
// Optionally blends one of the four trophy webp art pieces as a right-side layer.

export const ART_LAYERS = [
  'assets/trophy/win-emerald.webp?v=b27rio2',
  'assets/trophy/trophy-gold.webp?v=b27rio2',
  'assets/trophy/galaxy-void.webp?v=b27rio2',
  'assets/trophy/battle-crimson.webp?v=b27rio2',
];

export function seedFrom(symbol, address) {
  const s = String(address || '') + '|' + String(symbol || 'RIO').toUpperCase();
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function seedRand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

export function artLayerFor(seed) {
  return ART_LAYERS[(seed >>> 0) % ART_LAYERS.length];
}

const artCache = {};
export function preloadArtLayer(seed) {
  const src = artLayerFor(seed);
  if (artCache[src]) return artCache[src];
  artCache[src] = new Promise(res => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });
  return artCache[src];
}

function hsl(h, s, l, a = 1) {
  return `hsla(${((h % 360) + 360) % 360}, ${s}%, ${l}%, ${a})`;
}

function palette(seed) {
  const R = seedRand(seed ^ 0x9e3779b9);
  const families = [
    { sky: 230, acc: 280, lit: 45,  name: 'violet' },
    { sky: 210, acc: 170, lit: 42,  name: 'teal' },
    { sky: 350, acc: 20,  lit: 38,  name: 'crimson' },
    { sky: 200, acc: 155, lit: 48,  name: 'aurora' },
    { sky: 255, acc: 310, lit: 52,  name: 'orchid' },
    { sky: 18,  acc: 40,  lit: 36,  name: 'copper' },
    { sky: 195, acc: 220, lit: 62,  name: 'ice' },
    { sky: 145, acc: 95,  lit: 44,  name: 'jade' },
  ];
  const f = families[Math.floor(R() * families.length)];
  const drift = (R() - 0.5) * 16;
  return {
    sky: f.sky + drift,
    acc: f.acc + drift,
    lit: f.lit + drift * 0.4,
    deep: hsl(f.sky + drift, 45, 4),
    mid: hsl(f.sky + drift, 50, 10),
    glow: hsl(f.acc + drift, 70, 58, 0.55),
    glowSoft: hsl(f.acc + drift, 65, 50, 0.16),
    planet: hsl(f.lit + drift, 42, 42),
    planetDark: hsl(f.lit + drift, 40, 16),
    ring: hsl(f.acc + drift, 55, 70, 0.7),
    hill: hsl(f.sky + drift, 35, 7),
    hill2: hsl(f.sky + drift, 30, 4),
    cloud: hsl(f.acc + drift, 30, 22, 0.45),
  };
}

export function drawAnimeBackdrop(g, W, H, seed, opts = {}) {
  const clock = opts.clock || 0;
  const art = opts.artIm || null;
  const artAlpha = opts.artAlpha != null ? opts.artAlpha : 0.34;
  const R = seedRand(seed);
  const pal = palette(seed);

  g.save();
  g.fillStyle = pal.deep;
  g.fillRect(0, 0, W, H);

  // Vertical night sky
  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, pal.mid);
  sky.addColorStop(0.45, pal.deep);
  sky.addColorStop(1, '#000');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);

  // Nebula blooms (2–4)
  const blooms = 2 + Math.floor(R() * 3);
  for (let i = 0; i < blooms; i++) {
    const cx = W * (0.15 + R() * 0.8);
    const cy = H * (0.08 + R() * 0.55);
    const rad = Math.max(W, H) * (0.22 + R() * 0.38);
    const ng = g.createRadialGradient(cx, cy, 0, cx, cy, rad);
    const hue = (i % 2 ? pal.acc : pal.sky) + (R() - 0.5) * 24;
    ng.addColorStop(0, hsl(hue, 70, 55, 0.20 + R() * 0.12));
    ng.addColorStop(0.45, hsl(hue, 60, 35, 0.08));
    ng.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = ng;
    g.fillRect(0, 0, W, H);
  }

  // Stars
  const nStars = 160 + Math.floor(R() * 80);
  for (let i = 0; i < nStars; i++) {
    const x = R() * W, y = R() * H * 0.85;
    const z = R() < 0.08 ? 1.8 : R() < 0.3 ? 1.15 : 0.7;
    const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(clock * (1.4 + (i % 7) * 0.2) + i));
    g.globalAlpha = tw * (0.2 + R() * 0.8);
    g.fillStyle = R() < 0.15 ? hsl(pal.acc, 70, 85) : '#fff';
    g.fillRect(x, y, z, z);
  }
  g.globalAlpha = 1;

  // Anime cross sparkles
  const nSpark = 6 + Math.floor(R() * 7);
  for (let i = 0; i < nSpark; i++) {
    const x = W * (0.1 + R() * 0.8), y = H * (0.05 + R() * 0.5);
    const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(clock * 2.2 + i * 1.7));
    const len = 3 + R() * 7;
    g.save();
    g.globalAlpha = 0.35 + tw * 0.55;
    g.strokeStyle = '#fff';
    g.lineWidth = 1;
    g.beginPath(); g.moveTo(x - len, y); g.lineTo(x + len, y); g.stroke();
    g.beginPath(); g.moveTo(x, y - len * 0.7); g.lineTo(x, y + len * 0.7); g.stroke();
    g.restore();
  }

  // Cel-shaded clouds (mid sky, right-biased so text stays clear on the left)
  const nCloud = 2 + Math.floor(R() * 3);
  for (let c = 0; c < nCloud; c++) {
    const cx = W * (0.35 + R() * 0.6);
    const cy = H * (0.12 + R() * 0.28);
    const sc = 40 + R() * 80;
    g.save();
    g.fillStyle = pal.cloud;
    for (let k = 0; k < 5; k++) {
      const ox = (R() - 0.5) * sc * 1.8;
      const oy = (R() - 0.5) * sc * 0.45;
      const rw = sc * (0.6 + R() * 0.8), rh = sc * (0.25 + R() * 0.25);
      g.beginPath(); g.ellipse(cx + ox, cy + oy, rw, rh, 0, 0, Math.PI * 2); g.fill();
    }
    // lighter cel highlight
    g.globalAlpha = 0.35;
    g.fillStyle = hsl(pal.acc, 40, 70, 0.35);
    g.beginPath(); g.ellipse(cx - sc * 0.15, cy - sc * 0.12, sc * 0.7, sc * 0.2, 0, 0, Math.PI * 2); g.fill();
    g.restore();
  }

  // Ringed planet or moon, typically in the right half
  const px = W * (0.62 + R() * 0.28);
  const py = H * (0.16 + R() * 0.32);
  const pr = Math.min(W, H) * (0.08 + R() * 0.11);
  const rings = R() > 0.32;
  const rot = -0.35 - R() * 0.5;
  const rx = pr * (1.7 + R() * 0.8), ry = pr * (0.28 + R() * 0.18);

  if (rings) {
    g.save();
    g.translate(px, py);
    g.rotate(rot);
    g.strokeStyle = pal.ring;
    g.globalAlpha = 0.35;
    g.lineWidth = Math.max(2, pr * 0.08);
    g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, Math.PI); g.stroke();
    g.restore();
  }

  // Planet body
  const litX = px - pr * 0.35, litY = py - pr * 0.4;
  const pg = g.createRadialGradient(litX, litY, pr * 0.1, px, py, pr);
  pg.addColorStop(0, hsl(pal.lit, 55, 72));
  pg.addColorStop(0.45, pal.planet);
  pg.addColorStop(1, pal.planetDark);
  g.fillStyle = pg;
  g.beginPath(); g.arc(px, py, pr, 0, Math.PI * 2); g.fill();
  // soft atmosphere
  const at = g.createRadialGradient(px, py, pr * 0.85, px, py, pr * 1.35);
  at.addColorStop(0, hsl(pal.acc, 70, 60, 0.0));
  at.addColorStop(0.6, hsl(pal.acc, 70, 60, 0.12));
  at.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = at;
  g.beginPath(); g.arc(px, py, pr * 1.35, 0, Math.PI * 2); g.fill();
  // craters (moon-ish, subtle)
  if (R() > 0.4) {
    g.save();
    g.beginPath(); g.arc(px, py, pr, 0, Math.PI * 2); g.clip();
    const nc = 3 + Math.floor(R() * 4);
    for (let i = 0; i < nc; i++) {
      const a = R() * Math.PI * 2, d = R() * pr * 0.55, cr = pr * (0.06 + R() * 0.12);
      g.fillStyle = 'rgba(0,0,0,0.18)';
      g.beginPath(); g.arc(px + Math.cos(a) * d, py + Math.sin(a) * d, cr, 0, Math.PI * 2); g.fill();
    }
    g.restore();
  }

  if (rings) {
    g.save();
    g.translate(px, py);
    g.rotate(rot);
    g.strokeStyle = pal.ring;
    g.globalAlpha = 0.7;
    g.lineWidth = Math.max(2, pr * 0.1);
    g.beginPath(); g.ellipse(0, 0, rx, ry, 0, Math.PI, Math.PI * 2); g.stroke();
    g.globalAlpha = 0.25;
    g.lineWidth = Math.max(1, pr * 0.04);
    g.beginPath(); g.ellipse(0, 0, rx * 1.12, ry * 1.12, 0, Math.PI, Math.PI * 2); g.stroke();
    g.restore();
  }

  // Speed lines (faint, from a vanishing point on the right)
  g.save();
  const vx = W * (0.7 + R() * 0.25), vy = H * (0.3 + R() * 0.2);
  const nLines = 10 + Math.floor(R() * 10);
  g.strokeStyle = 'rgba(255,255,255,0.07)';
  g.lineWidth = 1;
  for (let i = 0; i < nLines; i++) {
    const ang = -0.9 + R() * 1.8;
    const d0 = Math.min(W, H) * (0.15 + R() * 0.2);
    const d1 = d0 + Math.min(W, H) * (0.25 + R() * 0.4);
    g.globalAlpha = 0.05 + R() * 0.1;
    g.beginPath();
    g.moveTo(vx + Math.cos(ang) * d0, vy + Math.sin(ang) * d0);
    g.lineTo(vx + Math.cos(ang) * d1, vy + Math.sin(ang) * d1);
    g.stroke();
  }
  g.restore();

  // Optional webp character/art, anchored to the right third
  if (art && art.width) {
    g.save();
    g.globalAlpha = artAlpha;
    const s = Math.max(W / art.width, H / art.height);
    const iw = art.width * s, ih = art.height * s;
    g.drawImage(art, W - iw, (H - ih) / 2, iw, ih);
    g.restore();
  }

  // Cel-shaded mountain / city silhouette along the bottom
  const layers = 3;
  for (let L = 0; L < layers; L++) {
    const RL = seedRand(seed ^ (0x51ed + L * 997));
    const base = H * (0.72 + L * 0.07);
    const peaks = 6 + L * 2;
    g.beginPath();
    g.moveTo(0, H);
    g.lineTo(0, base + 20);
    for (let i = 0; i <= peaks; i++) {
      const x = (W * i) / peaks;
      const jagged = (RL() - 0.35) * H * (0.06 - L * 0.012);
      const y = base - Math.abs(Math.sin(i * 0.9 + L)) * H * (0.10 - L * 0.02) + jagged;
      g.lineTo(x, y);
    }
    g.lineTo(W, H);
    g.closePath();
    g.fillStyle = L === 0 ? pal.hill : pal.hill2;
    g.globalAlpha = 0.85 - L * 0.15;
    g.fill();
    g.globalAlpha = 1;
  }

  // Left readability veil (text / chart sit on the dark left)
  const veil = g.createLinearGradient(0, 0, W * 0.72, 0);
  veil.addColorStop(0, 'rgba(3,4,7,0.72)');
  veil.addColorStop(0.5, 'rgba(3,4,7,0.38)');
  veil.addColorStop(1, 'rgba(3,4,7,0)');
  g.fillStyle = veil;
  g.fillRect(0, 0, W, H);
  const vg = g.createLinearGradient(0, H * 0.7, 0, H);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.45)');
  g.fillStyle = vg;
  g.fillRect(0, 0, W, H);

  g.restore();
}
