// Circular @whatscoinbase profile picture (sunset-head guitarist).
// Pre-cropped assets: pfp-256.webp (UI / canvas) and pfp-64.png (favicon / header).

export const PFP_SRC = new URL('./pfp-256.webp', import.meta.url).href;

let _img = null;
let _p = null;

export function preloadPfp() {
  if (_img) return Promise.resolve(_img);
  if (_p) return _p;
  _p = new Promise(resolve => {
    const im = new Image();
    im.onload = () => { _img = im; resolve(im); };
    im.onerror = () => { _p = null; resolve(null); };
    im.src = PFP_SRC;
  });
  return _p;
}

export function pfpImage() { return _img; }

/** Draw the circular pfp centered at (cx, cy) with radius r. Optional ring via opt.stroke. */
export function drawPfp(g, cx, cy, r, opt = {}) {
  const im = opt.im || _img;
  g.save();
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.closePath();
  if (im) {
    g.save();
    g.clip();
    g.drawImage(im, cx - r, cy - r, r * 2, r * 2);
    g.restore();
  } else {
    g.fillStyle = '#0a3a38';
    g.fill();
  }
  if (opt.stroke) {
    g.strokeStyle = opt.stroke;
    g.lineWidth = opt.lineWidth == null ? 2 : opt.lineWidth;
    g.stroke();
  }
  g.restore();
}
