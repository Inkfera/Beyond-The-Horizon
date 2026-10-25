(() => {
let F = '"Playfair Display",Georgia,serif', FW = 700, FNAME = 'Playfair Display', SENT = '\u200b';
const PAL = [
['Rose noir','#000000','#FF1400','#3257FF','#FFB4A8','#FFFFFF'],['Paper','#F3EEE4','#FF3B1F','#1C2B8F','#FFD2C4','#111111'],
['Midnight','#0D1B4C','#FF5A4E','#9FB4FF','#FFD6CF','#FFFFFF'],['Citrus','#0E1A12','#FF8A00','#1FA463','#FFE2B8','#FFF6E8'],
['Orchid','#140A1F','#E63CFF','#2FB8A6','#F9D1FF','#FFFFFF'],['Moss','#133A2A','#FFB7C5','#7FD18B','#FFFFFF','#F6F1E7'],
['Tomato','#FF1400','#FFF1E0','#0B0B0B','#FF1400','#000000'],['Butter','#FFE9A8','#E4002B','#0F5132','#FFC2C2','#1A1A1A'],
['Blush','#FAD4D8','#C8102E','#274690','#FFE3E6','#1A1A1A'],['Mono','#000000','#F2F2F2','#6E6E6E','#000000','#FFFFFF'],
['Rainbow','#0A0A14','#FF5A4E','#7FD18B','#FFFFFF','#FFFFFF'],['Sunset','#2B0A3D','#FF7A59','#FFD166','#FFE3C8','#FFF4E6'],
['Lagoon','#06283D','#FF6F91','#47B5FF','#FFE3EC','#DFF6FF'],['Lilac','#E8E0FF','#7B2FF7','#00A676','#D9C8FF','#1B1033'],
['Mint','#DDF5EA','#FF4F79','#127C5B','#FFD1DC','#0B2B20'],['Marigold','#FFC83D','#D7263D','#1B1B3A','#FFE9A8','#1B1B3A'],
['Candy','#FFD6E8','#FF2E93','#5B2EFF','#FFF0F7','#2A0A3D'],['Ocean','#001F2E','#00E5C7','#FF5C8A','#C8FFF6','#E8FFFB'],
['Ember','#1A0B05','#FF4D00','#FFC400','#FFD9B8','#FFF1E0'],['Sky','#CDE8FF','#FF7A00','#0B3D91','#FFE0B8','#0B1E4A'],
['Plum','#3A0F2E','#FFB000','#F25CA2','#FFE6A8','#FFF2F7'],
['Coral reef','#052B33','#FF6B6B','#4ECDC4','#FFE0DC','#F7FFF7'],['Sherbet','#FFF1E6','#FF5D8F','#2EC4B6','#FFD9E4','#2B2D42'],
['Cherry','#2B0A12','#FF2E63','#08D9D6','#FFC1D1','#FFEAF0'],['Matcha','#E3EFD3','#2E7D32','#F76C5E','#B9E0A5','#14301A'],
['Dusk','#1B1B3A','#FF9E7A','#7B9EFF','#FFE3D6','#FFF3EC'],['Lemonade','#FFF7AE','#FF8A00','#3D348B','#FFE0A3','#2B1B5A'],
['Indigo','#101A5C','#FFD166','#EF476F','#FFF0C2','#FFFFFF'],['Jade','#0B3D3A','#FFEFB0','#FF7B54','#FFFFFF','#F4FFF8'],
['Raspberry','#F8E1EA','#D81159','#218380','#FFB8D1','#2A0A18'],['Slate','#20232A','#61DAFB','#F78FB3','#CFF4FF','#F5F6FA'],
['Terracotta','#F2E3D5','#C8553D','#2D6A4F','#F4C3B5','#2A1810'],['Neon','#050505','#39FF14','#FF00E5','#CFFFC2','#FFFFFF'],
['Peach fuzz','#FFD6BA','#FF5E3A','#6A4C93','#FFEBDD','#3B1F2B'],['Ink','#F4F4F0','#111111','#FF3B1F','#8E8E8E','#111111']];
const OPT = { boil: true, recoil: 20, density: 1 };
const cv = document.getElementById('cv'), inp = document.getElementById('in'); let g = cv.getContext('2d');
let W = 0, H = 0, dpr = 1, letters = [], uid = 1, cache = {}, Sd = 0, St = 0, wrapped = false, cx = 0, cy = 0, ctx_ = 0, cty = 0;
let mx = null, my = 0, lastKey = 0, pi = 0, cc = PAL[0], flies = [], perch = [], gifts = [], kd_ = false, lt = 0, lastTap = null, now_ = 0;
const t0 = performance.now();
const touch = matchMedia('(pointer: coarse)').matches;

// ---------- math ----------
const h = n => { const x = Math.sin(n) * 43758.5453; return x - Math.floor(x); };
const spr = (t, k = 7, w = 16) => t <= 0 ? 0 : 1 - Math.exp(-t * k) * Math.cos(t * w);
const eo = t => t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3);
const rng = seed => { let s = seed | 0; return () => { s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const bez = (a, b, c, d, n) => { const P = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; P.push([u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0], u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]]); } return P; };
const at = (P, u) => { const n = P.length, i = Math.min(n - 2, Math.max(1, Math.round(u * (n - 1)))); return [P[i], Math.atan2(P[i+1][1] - P[i-1][1], P[i+1][0] - P[i-1][0])]; };
const jit1 = (id, f, amp) => [(h(id*1.37+f*7.13)*2-1)*amp, (h(id*2.71+f*3.11)*2-1)*amp, (h(id*5.3+f*1.7)*2-1)*0.035];
const jit = (id, f, amp) => { if (!amp) return [0, 0, 0]; const a = jit1(id, f, amp), b = jit1(id, f + 1, amp), t = JF * JF * (3 - 2 * JF); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; };
const mid = (a, b) => [(a[0]+b[0])/2, (a[1]+b[1])/2];
function path(c, p, closed) {
  const n = p.length; if (n < 2) return;
  if (closed) { const s = mid(p[n-1], p[0]); c.moveTo(s[0], s[1]); for (let i = 0; i < n; i++) { const q = mid(p[i], p[(i+1)%n]); c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]); } c.closePath(); }
  else { c.moveTo(p[0][0], p[0][1]); for (let i = 1; i < n - 1; i++) { const q = mid(p[i], p[i+1]); c.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]); } c.lineTo(p[n-1][0], p[n-1][1]); }
}
let B = {
  fill: (p, col) => { g.beginPath(); path(g, p, true); g.fillStyle = col; g.fill(); },
  stroke: (p, col, w) => { g.beginPath(); path(g, p, false); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; g.stroke(); },
  rect: (x, y, w, hh, col) => { g.fillStyle = col; g.fillRect(x, y, w, hh); },
  text: (ch, x, y, S, col) => { g.font = `${FW} ${S}px ${F}`; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillStyle = col; g.fillText(ch, x, y); }
};
function vine(base, dir, len, amp, waves, ph, bend, n) {
  n = n || 40; const P = [[base[0], base[1]]], step = len / n; let x = base[0], y = base[1];
  for (let i = 1; i <= n; i++) { const u = i / n, a = dir + bend * u + amp * Math.sin(u * Math.PI * waves + ph) * Math.min(1, u * 3); x += Math.cos(a) * step; y += Math.sin(a) * step; P.push([x, y]); }
  return P;
}
function curl(P, sign, rad) {
  const n = P.length, e = P[n-1], a = Math.atan2(e[1] - P[n-2][1], e[0] - P[n-2][0]);
  const c = [e[0] - Math.sin(a) * sign * rad, e[1] + Math.cos(a) * sign * rad], a0 = Math.atan2(e[1] - c[1], e[0] - c[0]);
  for (let i = 1; i <= 14; i++) { const u = i / 14, t = a0 + sign * u * Math.PI * 1.6, rr = rad * (1 - 0.5 * u); P.push([c[0] + Math.cos(t) * rr, c[1] + Math.sin(t) * rr]); }
  return P;
}
function weave(r, startLayer) {
  const cuts = [], nc = 1 + Math.floor(r() * 3); for (let i = 0; i < nc; i++) cuts.push(0.15 + r() * 0.7); cuts.sort((a, b) => a - b);
  const segs = []; let u0 = 0, layer = startLayer;
  for (const c of cuts) { if (c <= u0) continue; segs.push({ u0, u1: c, layer }); if (r() < 0.3) u0 = Math.min(0.98, c + 0.02 + r() * 0.03); else u0 = c; layer = 1 - layer; }
  segs.push({ u0, u1: 1, layer }); return segs;
}
const layerAt = (segs, u) => { for (const s of segs) if (u >= s.u0 && u <= s.u1) return s.layer; return segs[segs.length-1].layer; };

// ---------- layout ----------
function resize() {
  const r = cv.getBoundingClientRect(); dpr = window.devicePixelRatio || 1; if (!r.width) return;
  W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); layout(true);
}
function mw(ch) {
  if (cache[ch] != null) return cache[ch];
  g.font = `${FW} 100px ${F}`; let w = g.measureText(ch).width / 100; if (ch === ' ') w *= 1.4; return (cache[ch] = w);
}
function layoutCore(A) {
  const maxW = W * 0.8, S0 = H * 0.28, LH = 2.1, ws = A.map(l => mw(l.ch)), words = []; let cur = null;
  A.forEach((l, i) => { if (l.ch === ' ') { if (cur) { words.push(cur); cur = null; } words.push({ sp: true, idx: [i] }); } else { if (!cur) cur = { idx: [] }; cur.idx.push(i); } });
  if (cur) words.push(cur);
  const lineW = (li, S) => { let e = li.length; while (e > 0 && A[li[e-1]].ch === ' ') e--; let w = 0; for (let k = 0; k < e; k++) w += ws[li[k]]; return w * S; };
  const wrap = S => { const lines = [[]]; let lw = 0; for (const w of words) { const ww = w.idx.reduce((s, i) => s + ws[i], 0) * S; if (!w.sp && lw > 0 && lw + ww > maxW) { lines.push([]); lw = 0; } lines[lines.length-1].push(...w.idx); lw += ww; } return lines; };
  let lines = [A.map((_, i) => i)]; const unit = lineW(lines[0], 1);
  let S = unit > 0 ? Math.min(S0, maxW / unit) : S0;
  const multi = words.filter(w => !w.sp).length > 1;
  let wr = multi && (S < H * 0.1 || (wrapped && S < H * 0.14));
  if (wr) {
    let lo = H * 0.03, hi = H * 0.15;
    for (let k = 0; k < 22; k++) { const m = (lo + hi) / 2, ls = wrap(m); if (ls.every(li => lineW(li, m) <= maxW) && ls.length * LH * m <= H * 0.82) lo = m; else hi = m; }
    S = lo; lines = wrap(S); if (lines.length < 2) wr = false;
  }
  const n = lines.length, lh = LH * S;
  lines.forEach((li, k) => { let x = W / 2 - lineW(li, S) / 2; const y = H / 2 + (k - (n - 1) / 2) * lh + 0.33 * S; li.forEach(i => { const l = A[i], w = ws[i] * S; l.tx = x + w / 2; l.ty = y; l.tw = w; x += w; }); });
  return { S, wr };
}
function layout(snap) {
  if (!W) return;
  const A = letters.filter(l => !l.dead), res = layoutCore(A); wrapped = res.wr;
  A.forEach(l => { if (l.x == null) { l.x = l.tx; l.y = l.ty; } });
  const S = res.S, last = A[A.length-1]; St = S;
  ctx_ = last ? last.tx + last.tw / 2 + 0.07 * S : W / 2; cty = last ? last.ty - 0.33 * S : H / 2;
  if (snap || !Sd) { Sd = S; cx = ctx_; cy = cty; A.forEach(l => { l.x = l.tx; l.y = l.ty; }); }
}

// ---------- growth ----------
function wordParams(ws) {
  const r = rng(ws * 7 + 13), dens = OPT.density;
  return { roseP: 0.3 + r() * 0.3, leafy: (0.6 + r() * 0.8) * dens, dens, lean: (r() - 0.5) * 0.6, big: 0.85 + r() * 0.45, curvy: 0.8 + r() * 0.6, bridgeP: Math.min(0.95, (0.45 + r() * 0.35) * dens), w: 0.5 };
}
function grow(r, E, nid, p, o) {
  const tip = o.tip || (r() < p.roseP ? 'rose' : r() < 0.45 ? 'fan' : r() < 0.6 ? 'leaf' : 'curl');
  let P = o.pts || vine(o.base, o.dir, o.len, (0.35 + r() * 0.45) * p.curvy, 1 + r() * 1.6, r() * 6.28, (r() - 0.5) * 1.2, 40);
  if (tip === 'curl') P = curl(P, r() < 0.5 ? -1 : 1, 0.05 + r() * 0.05);
  const segs = weave(r, o.layer0 != null ? o.layer0 : (r() < 0.5 ? 0 : 1)), dur = Math.max(320, (o.len || 0.8) * 620), thorns = [], nt = Math.floor(r() * 2.5);
  for (let i = 0; i < nt; i++) thorns.push({ u: 0.15 + r() * 0.65, s: r() < 0.5 ? -1 : 1 });
  E.push({ t: 'stem', id: nid(), pts: P, segs, d0: o.d0, dur, w: o.depth ? 0.82 : 1, thorns });
  const nl = Math.floor(r() * 2.8 * p.leafy); let sd = r() < 0.5 ? -1 : 1;
  for (let i = 0; i < nl; i++) { const u = 0.25 + r() * 0.6, [q, a] = at(P, u); sd = -sd; E.push({ t: 'leaf', id: nid(), x: q[0], y: q[1], a: a + sd * (0.55 + r() * 0.5), L: (0.14 + r() * 0.2) * (o.depth ? 0.8 : 1), bend: (r() - 0.5) * 1.2, layer: layerAt(segs, u), d0: o.d0 + dur * u }); }
  const [tp, ta] = at(P, 1), td = o.d0 + dur * 0.8, tl = layerAt(segs, 1);
  if (tip === 'rose') {
    const R = (0.13 + r() * 0.15) * p.big * (o.depth ? 0.75 : 1), over = tp[1] > -0.95 && tp[1] < 0.2 && Math.abs(tp[0]) < p.w * 0.85, layer = over ? 0 : (r() < 0.6 ? 1 : tl);
    E.push({ t: 'rose', id: nid(), x: tp[0], y: tp[1], R, rot: (r() - 0.5), ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r(), layer, d0: td });
    if (r() < 0.2) { const oo = ta + (r() < 0.5 ? 1 : -1) * 1.3; E.push({ t: 'rose', id: nid(), x: tp[0] + Math.cos(oo) * R * 1.4, y: tp[1] + Math.sin(oo) * R * 1.4, R: R * (0.6 + r() * 0.3), rot: (r() - 0.5) * 1.2, ph1: r() * 6.28, ph2: r() * 6.28, turns: 1.8 + r(), layer, d0: td + 120 }); }
  } else if (tip === 'fan') {
    const spread = 0.6 + r() * 0.3; for (let j = 0; j < 2; j++) E.push({ t: 'leaf', id: nid(), x: tp[0], y: tp[1], a: ta + (j - 0.5) * spread, L: 0.2 + r() * 0.2, bend: (j - 0.5) * 0.8, layer: tl, d0: td + j * 60 });
  } else if (tip === 'leaf') E.push({ t: 'leaf', id: nid(), x: tp[0], y: tp[1], a: ta + (r() - 0.5) * 0.3, L: 0.16 + r() * 0.16, bend: r() - 0.5, layer: tl, d0: td });
  if (!o.depth && r() < 0.3) { const u = 0.35 + r() * 0.35, [q, a] = at(P, u); grow(r, E, nid, p, { base: q, dir: a + (r() < 0.5 ? -1 : 1) * (0.7 + r() * 0.4), len: (o.len || 0.8) * (0.35 + r() * 0.2), d0: o.d0 + dur * u, depth: 1, layer0: layerAt(segs, u) }); }
}
// keeps blooms from piling up: crowded ones shrink, very crowded ones become leaves
function thin(l, E, end) {
  if (!end) { l.ox = l.prev ? l.prev.ox + (mw(l.prev.ch) + mw(l.ch)) / 2 : 0; l.bl = []; }
  const near = []; for (let q = l.prev, i = 0; q && i < 3; q = q.prev, i++) near.push(...(q.bl || []));
  const keep = []; let roses = 0;
  for (const e of E) {
    if (e.t !== 'rose') { keep.push(e); continue; }
    const X = l.ox + e.x, Y = e.y; let hit = 0;
    for (const b of near.concat(l.bl)) if (Math.hypot(b.x - X, b.y - Y) < (b.R + e.R) * 0.85) hit++;
    if (roses >= 3 || (hit >= 2 && roses > 0)) { keep.push({ t: 'leaf', id: e.id, x: e.x, y: e.y, a: -Math.PI / 2 + (e.rot || 0), L: 0.2, bend: 0.3, layer: e.layer, d0: e.d0 }); continue; }
    if (hit === 1) e.R *= 0.75;
    l.bl.push({ x: X, y: Y, R: e.R }); keep.push(e); roses++;
  }
  return keep;
}
function gen(l) {
  const r = rng((l.ws ^ Math.imul(l.wi + 1, 2654435761)) + Math.floor(RAND() * 1e6)), p = wordParams(l.ws), E = []; let k0 = 0; const nid = () => l.id * 100 + (k0++);
  const w = mw(l.ch), inX = () => (r() - 0.5) * w * 0.7; p.w = w;
  const nUp = 1 + (r() < 0.45 * p.dens ? 1 : 0);
  for (let i = 0; i < nUp; i++) grow(r, E, nid, p, { base: [inX(), -r() * 0.3], dir: -Math.PI / 2 + p.lean * 0.5 + (r() - 0.5) * 0.7, len: 0.6 + r() * 0.5, d0: 40 + i * 130, tip: l.wi === 0 && i === 0 ? 'rose' : null });
  if (r() < 0.4 * p.dens) grow(r, E, nid, p, { base: [inX(), -0.1 - r() * 0.35], dir: Math.PI / 2 + (r() - 0.5) * 0.8, len: 0.35 + r() * 0.35, d0: 160 });
  if (l.prev && r() < p.bridgeP) {
    const px = -(mw(l.prev.ch) + w) / 2, a = [inX(), -0.05 - r() * 0.55], b = [px + (r() - 0.5) * 0.25, -0.05 - r() * 0.55];
    const bulge = (r() < 0.55 ? -1 : 1) * (0.4 + r() * 0.4), dx = b[0] - a[0];
    let P = bez(a, [a[0] + dx * 0.15, a[1] + bulge], [b[0] - dx * 0.15, b[1] + bulge * 0.9], b, 40);
    if (r() < 0.45) P = P.slice(0, Math.floor(P.length * (0.7 + r() * 0.2)));
    grow(r, E, nid, p, { pts: P, len: Math.abs(dx) + Math.abs(bulge), d0: 90, tip: r() < 0.5 ? 'curl' : r() < 0.5 ? 'leaf' : 'rose' });
  }
  if (l.wi === 0) grow(r, E, nid, p, { base: [-w * 0.3, -0.15 - r() * 0.4], dir: Math.PI + (r() - 0.5) * 1.2, len: 0.45 + r() * 0.3, d0: 120, tip: 'curl' });
  l.els = thin(l, E); l.endEls = null;
  const T = [], tr = rng(l.id * 977 + Math.floor(RAND() * 1e6));
  grow(tr, T, () => l.id * 100 + 90 + T.length, p, { base: [w * 0.25, -0.1 - tr() * 0.45], dir: (tr() - 0.5) * 1.4, len: 0.45 + tr() * 0.25, d0: 0, tip: 'curl', depth: 1 });
  l.tend = T.filter(e => e.t === 'stem').slice(0, 1);
}
function genEnd(l, rel) {
  const r = rng(l.ws + l.wi * 31 + Math.floor(RAND() * 1e6)), p = wordParams(l.ws), E = []; let k0 = 50; const nid = () => l.id * 100 + (k0++);
  const w = mw(l.ch), n = 1 + Math.floor(r() * 2.5); p.w = w;
  for (let i = 0; i < n; i++) grow(r, E, nid, p, { base: [(r() - 0.2) * w * 0.6, -r() * 0.5], dir: -Math.PI / 2 + 0.6 + (i - (n - 1) / 2) * 0.9 + (r() - 0.5) * 0.4, len: 0.4 + r() * 0.45, d0: rel + 40 + i * 90, depth: 1, tip: i === 0 || r() < 0.5 ? 'rose' : 'fan' });
  l.endEls = thin(l, E, true);
}

// ---------- drawing ----------
function strokeRange(P, a, b, col, w) {
  const n = P.length - 1, ia = a * n, ib = b * n;
  const lerp = t => { const i = Math.min(n - 1, Math.floor(t)), f = t - i; return [P[i][0] + (P[i+1][0] - P[i][0]) * f, P[i][1] + (P[i+1][1] - P[i][1]) * f]; };
  const pts = [lerp(ia)]; for (let i = Math.floor(ia) + 1; i < ib; i++) pts.push(P[i]); pts.push(lerp(ib));
  if (pts.length >= 2) B.stroke(pts, col, w);
}
function leaf(bx, by, a, L, bend) {
  if (L < 0.5) return;
  const ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
  const ax = u => { const b = Math.sin(Math.PI * u) * bend * 0.15 * L; return [bx + ca * u * L + px * b, by + sa * u * L + py * b]; };
  const N = 12, s1 = [], s2 = [];
  for (let i = 0; i <= N; i++) { const u = i / N, c = ax(u), w = L * LS().w * Math.sin(Math.PI * Math.pow(u, LS().e)); s1.push([c[0] + px * w, c[1] + py * w]); s2.push([c[0] - px * w, c[1] - py * w]); }
  const tip = ax(1), base = ax(0);
  B.fill([base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base], cc[3]);
  if (L > 6) { const v = []; for (let i = 0; i <= 8; i++) v.push(ax(0.08 + 0.72 * i / 8)); B.stroke(v, cc[1], Math.max(0.8, L * 0.03)); }
}
function rose(x0, y0, R, rot, e, a, tl) {
  const cr = Math.cos(rot), sr = Math.sin(rot), tm = tl ? Math.hypot(tl[0], tl[1]) : 0, ux = tm ? tl[0] / tm : 0, uy = tm ? tl[1] / tm : 0, sq = -0.28 * tm;
  const T = (x, y, z = 0) => { let dx = x * cr - y * sr, dy = x * sr + y * cr; if (tm) { const k = (dx * ux + dy * uy) * sq; dx += k * ux + tl[0] * R * z; dy += k * uy + tl[1] * R * z; } return [x0 + dx, y0 + dy]; };
  const P = [[0,-0.36,0.56,0.54,0,0,0],[-0.5,-0.06,0.6,0.6,-0.35,0,0],[0.52,-0.06,0.6,0.6,0.35,0,0],[-0.42,0.3,0.62,0.48,0.2,0.12,1],[0.47,0.3,0.62,0.48,-0.2,0.12,1],[0.05,0.42,0.56,0.38,0,0.14,0]];
  const lw = Math.max(0.8, R * 0.045), st = 85;
  P.forEach((q, i) => {
    const s = spr((a - i * st) / 1000, 8, 14); if (s <= 0.001) return;
    const open = (1 - Math.min(1, s)) * (q[0] < 0 ? 0.5 : -0.5), ang = q[4] + open, ca = Math.cos(ang), sa = Math.sin(ang);
    const pt = th => { const rr = 1 + 0.08 * Math.sin(3 * th + e.ph1 + i) + 0.04 * Math.sin(5 * th + e.ph2), lx = Math.cos(th) * q[2] * rr, ly = Math.sin(th) * q[3] * rr; const px = q[0] + lx * ca - ly * sa, py = q[1] + lx * sa + ly * ca; return T(px * s * R, (0.5 + (py - 0.5) * s) * R, q[5]); };
    const pts = []; for (let k = 0; k < 26; k++) pts.push(pt(k / 26 * Math.PI * 2));
    B.fill(pts, cc[2]);
    if (q[6] && R >= 12 && s > 0.4) { const arc = []; for (let k = 0; k <= 14; k++) arc.push(pt(Math.PI * (1.18 + 0.64 * k / 14))); strokeRange(arc, 0, Math.min(1, (s - 0.4) / 0.5), cc[4], lw * 0.8); }
  });
  const fr = eo((a - P.length * st - 80) / 520);
  if (fr > 0 && R > 3) {
    const sp = [], scl = [], turns = R < 20 ? Math.min(e.turns, 1.3) : R < 32 ? e.turns * 0.8 : e.turns;
    for (let i = 0; i <= 70; i++) { const u = i / 70, th = e.ph1 + u * turns * Math.PI * 2, rr = R * (0.08 + 0.57 * u); sp.push(T(Math.cos(th) * rr * 1.05, Math.sin(th) * rr * 0.72 - 0.12 * R, 0.34 - 0.24 * u)); }
    strokeRange(sp, 0, fr, cc[4], lw);
    if (R >= 14) { for (let i = 0; i <= 36; i++) { const u = i / 36; scl.push(T((-0.72 + 1.5 * u) * R, 0.36 * R + 0.16 * R * Math.abs(Math.sin(u * Math.PI * 3)), 0.18)); } strokeRange(scl, 0, fr, cc[4], lw); }
  }
}
let FL = 'rose', RB = false, MT = [], GLOW = true, SVGM = false, FACE = true, PW = null, PR = null, PERCH = false, TXTALL = false, WITH = 260, POSTER = false, PO = null, PS = 'breathe', SEED = 7, pt0 = 0, RAND = Math.random;
// leaf width/shape/length, stem thickness and thorns differ by flower
const FS = { rose: { w: .18, e: .8, l: 1, s: 1, th: true }, daisy: { w: .07, e: .9, l: 1.3, s: .7, th: false }, tulip: { w: .1, e: .9, l: 1.7, s: 1.2, th: false }, poppy: { w: .2, e: .6, l: .95, s: .75, th: false }, aster: { w: .06, e: .85, l: .85, s: .55, th: false }, sunflower: { w: .3, e: .5, l: 1.15, s: 1.7, th: false }, lily: { w: .05, e: 1, l: 1.7, s: 1.05, th: false }, cosmos: { w: .035, e: 1, l: 1.4, s: .45, th: false } };
const LS = () => FS[FL] || FS.rose;
let PT = [], RP = [], fxT = 0, tpx = -99, tpy = -99, FD = 1, JF = 0;
const pcol = () => RB ? `hsl(${Math.random() * 360 | 0} 90% 62%)` : (Math.random() < 0.6 ? cc[2] : cc[4]);
function burst(x, y, n) { for (let i = 0; i < n; i++) PT.push({ x, y, vx: (Math.random() - 0.5) * 2.4, vy: -Math.random() * 2.2 - 0.4, r: 3 + Math.random() * 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.2, t0: performance.now(), life: 1600 + Math.random() * 1400, c: pcol() }); if (PT.length > 160) PT.splice(0, PT.length - 160); }
function fx(now) {
  const dt = Math.min(40, now - (fxT || now)) / 16; fxT = now;
  PT = PT.filter(p => now - p.t0 < p.life);
  for (const p of PT) { p.vy += 0.035 * dt; p.vx *= 0.985; p.x += (p.vx + Math.sin(now / 400 + p.a) * 0.4) * dt; p.y += p.vy * dt; p.a += p.va * dt; const k = 1 - (now - p.t0) / p.life; g.globalAlpha = Math.min(1, k * 1.6); g.fillStyle = p.c; g.beginPath(); g.ellipse(p.x, p.y, p.r, p.r * 0.5, p.a, 0, 6.283); g.fill(); }
  RP = RP.filter(r => now - r.t < 900);
  for (const r of RP) { const k = (now - r.t) / 900; g.globalAlpha = (1 - k) * 0.6; g.strokeStyle = cc[4]; g.lineWidth = 2; g.beginPath(); g.arc(r.x, r.y, k * Sd * 1.4, 0, 6.283); g.stroke(); }
  g.globalAlpha = 1;
}
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
function motes(now) {
  if (calm) return;
  if (!MT.length) for (let i = 0; i < 36; i++) MT.push({ x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2.2, sp: 0.01 + Math.random() * 0.03, ph: Math.random() * 6 });
  g.fillStyle = cc[4]; g.globalAlpha = 0.45;
  for (const m of MT) { m.y -= m.sp * 16; m.x += Math.sin(now / 1500 + m.ph) * 0.25; if (m.y < -5) { m.y = H + 5; m.x = Math.random() * W; } g.beginPath(); g.arc(m.x, m.y, m.r, 0, 6.283); g.fill(); }
  g.globalAlpha = 1;
}
function bloom(x0, y0, R, rot, e, a, tl, k) {
  const cr = Math.cos(rot), sr = Math.sin(rot), sx = tl ? tl[0] * R * 0.3 : 0, sy = tl ? tl[1] * R * 0.3 : 0;
  const T = (x, y) => { const dx = x * R, dy = y * R; return [x0 + dx * cr - dy * sr + sx, y0 + dx * sr + dy * cr + sy]; };
  const petal = (ang, len, wid, off, s, col, dy, pt, vc) => {
    const ca = Math.cos(ang), sa = Math.sin(ang), L = [], Rr = [];
    for (let i = 0; i <= 10; i++) { const u = i / 10, w = wid / 2 * Math.pow(Math.sin(Math.PI * Math.pow(u, pt || 0.8)), 0.8) * (1 + 0.05 * Math.sin(u * 5 + e.ph1)), lx = (off + u * len) * s, ly = w * s; L.push(T(lx * ca - ly * sa, lx * sa + ly * ca + dy)); Rr.push(T(lx * ca + ly * sa, lx * sa - ly * ca + dy)); }
    B.fill([...L, ...Rr.reverse()], col);
    if (!vc && s > 0.5 && !SVGM) { g.globalAlpha = 0.22; B.stroke([0.12, 0.4, 0.7].map(u => { const lx = (off + u * len) * s; return T(lx * ca, lx * sa + dy); }), cc[4], Math.max(0.8, R * wid * 0.3)); g.globalAlpha = 1; }
    if (vc && s > 0.5) B.stroke([0.15, 0.5, 0.8].map(u => { const lx = (off + u * len) * s; return T(lx * ca, lx * sa + dy); }), vc, Math.max(0.7, R * 0.03));
  };
  const ring = (n, len, wid, off, col, st, r0, pt, vc) => { for (let i = 0; i < n; i++) { const s = spr((a - i * st) / 1000, 8, 14); if (s > 0.001) petal(r0 + i / n * 6.2832, len, wid, off, Math.min(1.12, s), col, 0, pt, vc); } };
  const disc = (r, col, dots, dc, nd) => {
    const f = eo((a - 350) / 400); if (f <= 0) return; const c = (px, py, rr) => { const pts = []; for (let i = 0; i < 10; i++) { const th = i / 10 * 6.2832; pts.push(T(px + Math.cos(th) * rr, py + Math.sin(th) * rr)); } B.fill(pts, col); };
    c(0, 0, r * f);
    if (dots) { const dcol = col; col = dc; for (let i = 1; i < (nd || 36); i++) { const rr = Math.sqrt(i / (nd || 36)) * r * 0.85 * f, th = i * 2.4; c(Math.cos(th) * rr, Math.sin(th) * rr, Math.max(0.012, r * 0.07)); } col = dcol; }
  };
  const p1 = e.ph1, p2 = e.ph2;
  if (k === 'daisy') { ring(16, 1.05, 0.17, 0.12, cc[4], 20, p1, 0.9); ring(16, 0.98, 0.15, 0.12, cc[2], 20, p1 + 0.2, 0.9, cc[4]); disc(0.27, cc[4]); disc(0.21, cc[3], 1, cc[4], 40); }
  else if (k === 'aster') { ring(26, 1, 0.09, 0.05, cc[4], 14, p1, 0.9); ring(20, 0.85, 0.1, 0.05, cc[2], 14, p2, 0.9); ring(14, 0.6, 0.1, 0.04, cc[4], 14, p1, 0.9); disc(0.13, cc[3]); }
  else if (k === 'poppy') { ring(4, 0.85, 0.95, 0.08, cc[2], 70, p1, 0.6, cc[4]); ring(4, 0.6, 0.7, 0.06, cc[4], 70, p2 + 0.7, 0.6); disc(0.15, cc[3], 1, cc[1], 24); }
  else if (k === 'sunflower') { ring(30, 1.05, 0.2, 0.3, cc[4], 10, p1 + 0.1, 0.9); ring(26, 1, 0.2, 0.3, cc[2], 10, p1, 0.9, cc[4]); disc(0.48, cc[4]); disc(0.42, cc[3], 1, cc[2], 120); }
  else if (k === 'cosmos') { ring(8, 0.95, 0.55, 0.08, cc[2], 40, p1, 0.55, cc[4]); disc(0.14, cc[3], 1, cc[4], 14); }
  else if (k === 'lily') {
    ring(3, 0.9, 0.34, 0.04, cc[4], 60, p1 + 0.5, 0.7); ring(6, 1.05, 0.42, 0.04, cc[2], 60, p1, 0.7, cc[4]);
    const f = eo((a - 420) / 400); if (f > 0) for (let i = 0; i < 5; i++) { const th = p2 + i * 1.256, d = 0.55 * f; B.stroke([T(0, 0), T(Math.cos(th) * d, Math.sin(th) * d)], cc[3], Math.max(0.8, R * 0.03)); disc(0.03, cc[3]); }
  } else {
    [[-0.55, 0.9, 0.46], [0.55, 0.9, 0.46]].forEach(([d, len, wid], i) => { const s = spr((a - i * 60) / 1000, 8, 14); if (s > 0.001) petal(-1.5708 + d * s, len, wid, 0, Math.min(1.1, s), cc[4], 0.5, 0.7); });
    [[-0.2, 1, 0.5], [0.2, 1, 0.5], [0, 1.1, 0.55]].forEach(([d, len, wid], i) => { const s = spr((a - 120 - i * 60) / 1000, 8, 14); if (s > 0.001) petal(-1.5708 + d * s, len, wid, 0, Math.min(1.1, s), cc[2], 0.5, 0.7, cc[4]); });
  }
}
function bloomOld(x0, y0, R, rot, e, a, tl, k) {
  const cr = Math.cos(rot), sr = Math.sin(rot), sx = tl ? tl[0] * R * 0.3 : 0, sy = tl ? tl[1] * R * 0.3 : 0;
  const T = (x, y) => { const dx = x * R, dy = y * R; return [x0 + dx * cr - dy * sr + sx, y0 + dx * sr + dy * cr + sy]; };
  const petal = (ang, len, wid, off, s, col, dy) => { const ca = Math.cos(ang), sa = Math.sin(ang), pts = []; for (let i = 0; i < 18; i++) { const th = i / 18 * 6.2832, lx = (off + len / 2 + Math.cos(th) * len / 2 * (1 + 0.06 * Math.sin(3 * th + e.ph1))) * s, ly = Math.sin(th) * wid / 2 * s; pts.push(T(lx * ca - ly * sa, lx * sa + ly * ca + dy)); } B.fill(pts, col); };
  const ring = (n, len, wid, off, col, st, r0) => { for (let i = 0; i < n; i++) { const s = spr((a - i * st) / 1000, 8, 14); if (s > 0.001) petal(r0 + i / n * 6.2832, len, wid, off, Math.min(1.15, s), col, 0); } };
  const disc = (r, col) => { const f = eo((a - 350) / 400); if (f <= 0) return; const pts = []; for (let i = 0; i < 14; i++) { const th = i / 14 * 6.2832; pts.push(T(Math.cos(th) * r * f, Math.sin(th) * r * f)); } B.fill(pts, col); };
  if (k === 'daisy') { ring(12, 0.95, 0.24, 0.12, cc[2], 30, e.ph1); disc(0.2, cc[4]); }
  else if (k === 'aster') { ring(22, 1.0, 0.1, 0.08, cc[2], 20, e.ph1); ring(14, 0.6, 0.1, 0.06, cc[4], 20, e.ph2); disc(0.12, cc[3]); }
  else if (k === 'poppy') { ring(5, 0.8, 0.8, 0.12, cc[2], 60, e.ph1); ring(5, 0.5, 0.5, 0.08, cc[4], 60, e.ph2); disc(0.16, cc[3]); }
  else { let s2 = 0; [[-0.5, 0.9, 0.5], [0.5, 0.9, 0.5], [0, 1.05, 0.58]].forEach(([d, len, wid], i) => { const s = spr((a - i * 70) / 1000, 8, 14); if (s > 0.001) { petal(-1.5708 + d * s, len, wid, 0, Math.min(1.15, s), cc[2], 0.45); if (i === 2) s2 = s; } }); if (s2 > 0.3) B.stroke([T(0, 0.45), T(0, 0.45 - 0.9 * Math.min(1, s2))], cc[4], Math.max(0.8, R * 0.045)); }
}
function near(x, y) { return mx != null ? [mx, my] : null; }
const faceA = {};
function faceTurn(e, x, y) {
  let wx = 0, wy = 0; const A = near(x, y);
  if (A) { const dx = A[0] - x, dy = A[1] - y, d = Math.hypot(dx, dy), reach = 300; if (d < reach && d > 0.001) { const w = 1 - d / reach, s = w * w * (3 - 2 * w) * Math.min(1, d / 40); wx = dx / d * s; wy = dy / d * s; } }
  const c = faceA[e.id] || [0, 0]; c[0] += (wx - c[0]) * (1 - Math.pow(0.91, FD)); c[1] += (wy - c[1]) * (1 - Math.pow(0.91, FD)); faceA[e.id] = c; return c;
}
function wpt(S, l, x, y) {
  const t = (now_ - l.birth) / 1000;
  if (t > 0 && t < 2.5) { const hh = Math.max(0, (l.y - y) / S), dmp = Math.exp(-t * 3.2), dir = l.id % 2 ? 1 : -1; x += S * 0.07 * hh * dmp * Math.sin(t * 11) * dir; y += S * 0.035 * hh * dmp * Math.sin(t * 11 + 1.2); }
  if (FACE && l.lean) { const hh = Math.min(2.5, Math.max(0, (l.y - y) / S)), f = hh * hh * 0.5 + hh * 0.5; x += l.lean[0] * S * 0.1 * f; y += l.lean[1] * S * 0.05 * f; }
  return PW ? PW(x, y, l) : [x, y];
}
function drawStem(e, l, age, kk, S, f, amp, layer, frO) {
  const fr = frO != null ? frO : eo((age - e.d0) / e.dur) * kk; if (fr <= 0) return;
  const j = jit(e.id, f, amp), P = e.pts.map(p => wpt(S, l, l.x + p[0] * S + j[0], l.y + p[1] * S + j[1]));
  for (const sg of e.segs) { if (sg.layer !== layer) continue; const b = Math.min(sg.u1, fr); if (b <= sg.u0) continue; strokeRange(P, sg.u0, b, cc[3], S * 0.022 * (e.w || 1) * LS().s); }
  for (const th of LS().th ? e.thorns : []) if (fr > th.u && layerAt(e.segs, th.u) === layer) { const [p, a] = at(P, th.u), d = a + th.s * 2.3, L = S * 0.045; B.stroke([p, [p[0] + Math.cos(d) * L, p[1] + Math.sin(d) * L]], cc[3], S * 0.022); }
}
function drawEl(e, l, age, kk, S, f, amp) {
  const j = jit(e.id, f, amp), wx = (x, y) => wpt(S, l, l.x + x * S + j[0], l.y + y * S + j[1]);
  if (e.t === 'leaf') { const sc = spr((age - e.d0) / 1000, 7, 15) * kk; if (sc <= 0) return; const p = wx(e.x, e.y); leaf(p[0], p[1], e.a + j[2] + (PR ? PR(e) : 0), e.L * S * sc * LS().l, e.bend); }
  else {
    const a = age - e.d0; if (a < 0 || kk <= 0.001) return;
    const p = wx(e.x, e.y), tl = FACE ? faceTurn(e, p[0], p[1]) : [0, 0], rw = PR ? PR(e) : 0;
    if ((FACE || PERCH) && !l.dead && a > 700) perch.push({ id: e.id, x: p[0], y: p[1], R: e.R * S * kk });
    const k = FL === 'mixed' ? ['rose', 'daisy', 'tulip', 'poppy', 'aster', 'sunflower', 'lily', 'cosmos'][e.id % 8] : FL, c2 = cc[2];
    if (RB) cc[2] = `hsl(${(e.id * 47) % 360} 90% 60%)`;
    if (GLOW && !SVGM && a > 300 && kk > 0.5) { g.fillStyle = cc[2]; g.globalAlpha = 0.06; for (const m of [2.3, 1.7, 1.25]) { g.beginPath(); g.arc(p[0], p[1], e.R * S * kk * m, 0, 6.283); g.fill(); } g.globalAlpha = 1; }
    const ro = e.rot + j[2] + rw + tl[0] * 0.22; if (k === 'rose') rose(p[0], p[1], e.R * S * kk, ro, e, a, tl); else bloom(p[0], p[1], e.R * S * kk * 1.15, ro, e, a, tl, k);
    cc[2] = c2;
  }
}
function render(now) {
  const S = Sd, A = letters.filter(l => !l.dead); now_ = now; perch = [];
  for (const l of FACE ? letters : []) {
    let tx = 0, ty = 0; const P = !l.dead && l.ch !== ' ' && mx != null ? [mx, my] : null;
    if (P) { const dx = P[0] - l.x, dy = P[1] - (l.y - S * 0.6), d = Math.hypot(dx, dy), reach = Math.max(260, S * 3.2); if (d < reach && d > 1) { const w = 1 - d / reach, s = w * w * (3 - 2 * w); tx = dx / d * s; ty = dy / d * s; } }
    const c = l.lean || (l.lean = [0, 0]); c[0] += (tx - c[0]) * (1 - Math.pow(0.93, FD)); c[1] += (ty - c[1]) * (1 - Math.pow(0.93, FD));
  }
  JF = (now / 120) % 1; const f = OPT.boil ? Math.floor(now / 120) : 0, amp = OPT.boil ? Math.max(0.8, S * 0.01) : 0;
  const kd = l => l.dead ? 1 - eo((now - l.dead) / WITH) : 1;
  const draw = layer => {
    for (const l of letters) {
      if (l.ch === ' ' || !l.els) continue;
      const age = now - l.birth, kk = kd(l);
      const each = e => { if (e.t === 'stem') drawStem(e, l, age, kk, S, f, amp, layer); else if (e.layer === layer) drawEl(e, l, age, kk, S, f, amp); };
      l.els.forEach(each); if (l.endEls) l.endEls.forEach(each);
      const i = A.indexOf(l), nx = i >= 0 ? A[i + 1] : null;
      if (l.tend && (l.dead || !nx || nx.ch === ' ')) {
        let fr = eo((now - l.tb - 150) / 450);
        if (l.cut != null) fr *= 1 - eo((now - l.cut) / 150) * Math.min(0.85, OPT.recoil / (0.6 * S));
        for (const e of l.tend) drawStem(e, l, age, kk, S, f, amp, layer, fr * kk);
      }
    }
  };
  draw(0);
  for (const l of letters) if (l.ch !== ' ' && (TXTALL || !l.dead)) B.text(l.ch, l.x, l.y, S, cc[5]);
  draw(1);
}

// ---------- butterflies ----------
function butterfly(x, y, s, ang, o) {
  const ca = Math.cos(ang), sa = Math.sin(ang), T = (px, py) => [x + (px * ca - py * sa) * s, y + (px * sa + py * ca) * s];
  const wing = (wx, wy, rx, ry, a, side) => { const pts = [], c = Math.cos(a), sn = Math.sin(a); for (let k = 0; k < 22; k++) { const th = k / 22 * Math.PI * 2, r = 1 + 0.08 * Math.sin(th * 3), lx = Math.cos(th) * rx * r, ly = Math.sin(th) * ry * r; pts.push(T(side * (wx + lx * c - ly * sn) * (0.12 + 0.88 * o), wy + lx * sn + ly * c)); } return pts; };
  for (const sd of [-1, 1]) { B.fill(wing(0.46, 0.28, 0.36, 0.3, 0.5, sd), cc[5]); B.fill(wing(0.55, -0.32, 0.55, 0.36, -0.55, sd), cc[5]); if (o > 0.35) B.fill(wing(0.66, -0.4, 0.13, 0.11, 0, sd), cc[2]); }
  const body = []; for (let k = 0; k < 18; k++) { const th = k / 18 * Math.PI * 2; body.push(T(Math.cos(th) * 0.08, Math.sin(th) * 0.48)); }
  B.fill(body, cc[3]); const lw = Math.max(0.8, s * 0.05);
  B.stroke([T(0, -0.42), T(-0.14, -0.72), T(-0.24, -0.86)], cc[3], lw); B.stroke([T(0, -0.42), T(0.14, -0.72), T(0.24, -0.86)], cc[3], lw);
}
function spawnFly(x, y) {
  if (flies.length >= 6) { const o = flies.find(f => f.st !== 'leave'); if (o) flyOff(o); }
  const taken = new Set(flies.filter(f => f.st !== 'leave').map(f => f.pid)); let best = null, bd = 1e9;
  for (const p of perch) { if (taken.has(p.id)) continue; const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; best = p; } }
  flies.push({ x: x < W / 2 ? -40 : W + 40, y: y + (Math.random() - 0.5) * H * 0.4, vx: 0, vy: 0, st: best ? 'fly' : 'wander', pid: best ? best.id : null, hx: x, hy: y, t0: performance.now(), ph: Math.random() * 6, sz: Math.max(9, Sd * 0.09), seed: Math.random() * 100, ang: 0, open: 0 });
}
function flyOff(f) { f.st = 'leave'; f.pid = null; f.ex = f.x < W / 2 ? -80 : W + 80; f.ey = f.y - H * 0.3; }
let _fl = 0;
function drawFlies(now) {
  const dt = Math.min(48, now - (_fl || now)); _fl = now; const byId = {}; for (const p of perch) byId[p.id] = p;
  flies = flies.filter(f => {
    const t = (now - f.t0) / 1000; let tx, ty;
    if (f.st === 'sit' || f.st === 'fly') { const p = byId[f.pid]; if (!p) flyOff(f); else { tx = p.x + p.R * 0.05; ty = p.y - p.R * 0.55; } }
    if (f.st === 'wander') { tx = f.hx + Math.sin(t * 1.3 + f.seed) * 70; ty = f.hy + Math.sin(t * 2.1 + f.seed) * 40; if (t > 3.5) flyOff(f); }
    if (f.st === 'leave') { tx = f.ex; ty = f.ey; }
    if (f.st === 'sit') {
      f.x += (tx - f.x) * 0.35; f.y += (ty - f.y) * 0.35; f.ang *= 0.85; f.ph += dt * 0.004;
      const burst = Math.sin(now / 1000 * 0.9 + f.seed) > 0.75; f.open = burst ? 0.2 + 0.8 * Math.abs(Math.cos(now / 1000 * 9 + f.seed)) : 0.25 + 0.15 * Math.sin(f.ph);
    } else {
      const dx = tx - f.x, dy = ty - f.y, d = Math.hypot(dx, dy) || 1, sp = f.st === 'leave' ? 0.42 : Math.min(0.34, 0.06 + d * 0.0016);
      const ax = (dx / d * sp + Math.cos(t * 4.3 + f.seed) * 0.1) - f.vx, ay = (dy / d * sp + Math.sin(t * 7 + f.seed) * 0.12) - f.vy;
      f.vx += ax * 0.06 * dt / 16; f.vy += ay * 0.06 * dt / 16; f.x += f.vx * dt; f.y += f.vy * dt + Math.sin(t * 13 + f.seed) * 0.6;
      f.ang += (Math.max(-0.5, Math.min(0.5, f.vx * 1.4)) - f.ang) * 0.1; f.open = Math.abs(Math.cos(t * 17 + f.seed));
      if (f.st === 'fly' && d < 5) { f.st = 'sit'; f.ph = 0; }
      if (f.st === 'leave' && (f.x < -60 || f.x > W + 60 || f.y < -60)) return false;
    }
    butterfly(f.x, f.y, f.sz, f.ang, f.open); return true;
  });
}

// ---------- frame ----------
function frame() {
  requestAnimationFrame(frame);
  const now = performance.now(), dt = Math.min(64, now - (lt || now)); lt = now; if (!W) return;
  if (POSTER && PO) { posterDraw(g, now - pt0, cv.width / 1080); return; }
  FD = dt / 16.67; const k = 1 - Math.exp(-dt / 100); Sd += (St - Sd) * k; cx += (ctx_ - cx) * k; cy += (cty - cy) * k;
  for (const l of letters) if (!l.dead && l.tx != null) { l.x += (l.tx - l.x) * k; l.y += (l.ty - l.y) * k; }
  letters = letters.filter(l => !(l.dead && now - l.dead > 300));
  g.setTransform(dpr, 0, 0, dpr, 0, 0); g.fillStyle = cc[1]; g.fillRect(0, 0, W, H);
  const rg = g.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7); rg.addColorStop(0, cc[2]); rg.addColorStop(1, cc[1]); g.globalAlpha = GLOW ? 0.07 : 0; g.fillStyle = rg; g.fillRect(0, 0, W, H); g.globalAlpha = 1;
  render(now); drawFlies(now); motes(now); fx(now);
  const LIFE = 60000; gifts = gifts.filter(o => now - o.t0 < LIFE);
  for (const o of gifts) { const age = now - o.t0, w = 1 - eo((age - (LIFE - 2200)) / 2200); g.globalAlpha = Math.max(0, w); rose(o.x * W, o.y * H + (1 - w) * Sd * 0.3, Sd * 0.24 * (0.65 + 0.35 * w), o.rot + (1 - w) * 0.6, o.e, age, null); }
  g.globalAlpha = 1;
  const S = Sd, on = now - lastKey < 500 ? 1 : 0.5 + 0.5 * Math.cos(now / 530 * Math.PI), hf = eo((now - t0) / 600);
  if (on > 0.02 && hf > 0) { g.globalAlpha = on; const hh = 0.8 * S * hf, w = Math.max(2, S * 0.03); B.rect(cx - w / 2, cy - hh / 2, w, hh, cc[5]); g.globalAlpha = 1; }
}

// ---------- input ----------
function add(ch, now) {
  const A = letters.filter(l => !l.dead), last = A[A.length - 1];
  if (ch === ' ') { if (last && last.ch !== ' ') { last.cut = now; genEnd(last, now - last.birth); } letters.push({ ch: ' ', id: uid++, birth: now, els: [] }); layout(); RP.push({ x: ctx_, y: cty, t: now }); burst(ctx_, cty, 10); return; }
  const same = last && last.ch !== ' ';
  const l = { ch, id: uid++, birth: now, tb: now, ws: same ? last.ws : Math.floor(Math.random() * 1e9), wi: same ? last.wi + 1 : 0, prev: same ? last : null };
  gen(l); letters.push(l); layout(); burst(ctx_, cty - Sd * 0.3, 7);
}
function wither(now) {
  const A = letters.filter(l => !l.dead), last = A[A.length - 1]; if (!last) return;
  last.dead = now; const pv = A[A.length - 2]; if (pv && pv.ch !== ' ') { pv.cut = null; pv.endEls = null; pv.tb = now; } layout();
}
const mark = () => { lastKey = performance.now(); kd_ = true; setTimeout(() => { kd_ = false; }, 0); };
addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); e.shiftKey ? saveSVG() : stillPNG(); return; }
  if (e.metaKey || e.ctrlKey || e.altKey || (e.target && e.target.id === 'words') || document.body.classList.contains('poster')) return;
  if (e.target && e.target.tagName === 'BUTTON' && (e.key === 'Enter' || e.key === ' ')) return;
  const now = performance.now();
  if (e.key === 'Backspace') { e.preventDefault(); mark(); wither(now); return; }
  if (e.key === 'Enter') { e.preventDefault(); mark(); letters = []; layout(); return; }
  if (e.key.length !== 1) return;
  e.preventDefault(); mark(); add(e.key, now);
});
// phone keyboards write into the field: mirror it and apply the difference
let iv = SENT, composing = false; inp.value = SENT;
function inputDiff() {
  if (kd_) { iv = composing ? inp.value : SENT; if (!composing) inp.value = SENT; return; }
  const old = iv == null ? SENT : iv, cur = inp.value; let p = 0;
  while (p < old.length && p < cur.length && old[p] === cur[p]) p++;
  let dels = old.length - p; if (p === 0 && old[0] === SENT && old.length > 1) dels -= 1;
  const now = performance.now(); lastKey = now;
  for (let i = 0; i < dels; i++) wither(now);
  for (const ch of cur.slice(p)) { if (ch === SENT) continue; if (ch.charCodeAt(0) === 10) { letters = []; layout(); } else add(ch, now); }
  if (composing) iv = cur; else { inp.value = SENT; iv = SENT; }
}
inp.addEventListener('input', inputDiff);
inp.addEventListener('compositionstart', () => { composing = true; });
inp.addEventListener('compositionend', () => { composing = false; setTimeout(() => !composing && inputDiff(), 0); });
addEventListener('pointermove', e => { const rc = cv.getBoundingClientRect(); mx = e.clientX - rc.left; my = e.clientY - rc.top; if (Math.hypot(mx - tpx, my - tpy) > 60) { tpx = mx; tpy = my; if (e.pointerType === 'mouse') burst(mx, my, 1); } });
const lose = () => { mx = null; };
addEventListener('pointerup', e => { if (e.pointerType && e.pointerType !== 'mouse') lose(); });
addEventListener('pointercancel', lose);
document.addEventListener('mouseout', e => { if (!e.relatedTarget) lose(); });
cv.addEventListener('pointerdown', e => {
  if (e.pointerType === 'mouse') inp.focus({ preventScroll: true }); else e.preventDefault();
  spawnFly(e.offsetX, e.offsetY);
  const now = performance.now(), lp = lastTap; lastTap = { t: now, x: e.clientX, y: e.clientY };
  if (lp && now - lp.t < 340 && Math.hypot(e.clientX - lp.x, e.clientY - lp.y) < 40) {
    lastTap = null; const r = rng(Math.floor(Math.random() * 1e6) || 1);
    gifts.push({ x: e.offsetX / W, y: e.offsetY / H, t0: now, rot: (r() - 0.5) * 0.8, e: { ph1: r() * 6.283, ph2: r() * 6.283, turns: 1.4 + r() * 0.5 } });
    if (gifts.length > 14) gifts.shift();
  }
});
cv.addEventListener('click', e => { if (touch) inp.focus({ preventScroll: true }); });
document.getElementById('app').addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.target.closest('#pal')) e.preventDefault(); });

// ---------- palette ----------
const pal = document.getElementById('pal'), hints = document.getElementById('hints');
function setPal(i) {
  pi = i; cc = PAL[i].slice(); RB = PAL[i][0] === 'Rainbow'; styleFl(); syncCards(); document.getElementById('credit').style.color = cc[5]; document.body.style.background = cc[1]; hints.style.color = cc[5];
  [...pal.children].forEach((b, k) => { b.style.border = `1.5px solid ${k === i ? cc[5] : (PAL[k][1] === cc[1] ? '#3A3A3A' : 'transparent')}`; b.style.transform = k === i ? 'scale(1.1)' : ''; });
  pal.style.background = cc[1];
}
PAL.forEach((p, i) => { const b = document.createElement('button'); b.style.background = p[1]; b.title = b.ariaLabel = p[0]; b.innerHTML = `<i style="background:${p[0] === 'Rainbow' ? 'conic-gradient(#f44,#fc4,#4c6,#4af,#c4f,#f44)' : p[2]}"></i>`; b.onclick = () => { setPal(i); if (!touch) inp.focus({ preventScroll: true }); }; pal.appendChild(b); });
const fl = document.getElementById('fl');
function styleFl() { fl.style.background = cc[1]; [...fl.children].forEach(b => { const on = b.dataset.k === FL; b.style.background = on ? cc[5] : 'transparent'; b.style.color = on ? cc[1] : cc[5]; }); }
['rose', 'daisy', 'tulip', 'poppy', 'aster', 'sunflower', 'lily', 'cosmos'].forEach(k => { const b = document.createElement('button'); b.dataset.k = k; b.textContent = k; b.onclick = () => { FL = k; styleFl(); if (!touch) inp.focus({ preventScroll: true }); }; fl.appendChild(b); });
const words = document.getElementById('words'), pc = document.getElementById('pcards'), fc = document.getElementById('fcards');
['rose', 'daisy', 'tulip', 'poppy', 'aster', 'sunflower', 'lily', 'cosmos'].forEach(k => { const b = document.createElement('button'); b.className = 'card'; b.dataset.k = k; b.textContent = k; b.onclick = () => { FL = k; styleFl(); syncCards(); }; fc.appendChild(b); });
PAL.forEach((p, i) => { const b = document.createElement('button'); b.className = 'card pcard'; b.dataset.i = i; b.innerHTML = `<span class="sw" style="background:${p[1]}"><i style="background:${p[0] === 'Rainbow' ? 'conic-gradient(#f44,#fc4,#4c6,#4af,#c4f,#f44)' : p[2]}"></i><i style="background:${p[3]};margin-left:-4px;width:12px;height:12px"></i><b style="color:${p[5]}">Aa</b></span>${p[0]}`; b.onclick = () => setPal(i); pc.appendChild(b); });
function syncCards() { [...fc.children].forEach(b => b.classList.toggle('sel', b.dataset.k === FL)); [...pc.children].forEach(b => b.classList.toggle('sel', +b.dataset.i === pi)); [...mc.children].forEach(b => b.classList.toggle('sel', b.dataset.id === PS)); }
function setText(t) { letters = []; wrapped = false; let n = 0; for (const ch of t.slice(0, 40)) add(ch, performance.now() + n++ * 60); }
words.addEventListener('input', () => buildPoster());
document.getElementById('regrow').onclick = () => { SEED = Math.floor(Math.random() * 1e6); buildPoster(); };
document.querySelectorAll('#modes button').forEach(b => b.onclick = () => {
  const m = b.dataset.m; POSTER = m === 'poster'; document.body.classList.toggle('poster', m === 'poster');
  document.querySelectorAll('#modes button').forEach(x => x.classList.toggle('on', x === b));
  if (m === 'poster') { words.value = letters.filter(l => !l.dead).map(l => l.ch).join('').trim() || 'in bloom'; syncCards(); buildPoster(); }
  wrapped = false; Sd = 0; setTimeout(() => { resize(); if (m === 'type' && !touch) inp.focus({ preventScroll: true }); }, 30);
});
// ---------- export (needs the viewer's downloads capability) ----------
const xs = document.getElementById('xs'), xv = document.getElementById('xv'), xf = document.getElementById('xf'), xp = document.getElementById('xp'), xp2 = document.getElementById('xp2');
let DL = null, busy = false;
const say = t => { xs.textContent = t; };
const sq = document.createElement('canvas'); sq.width = sq.height = 1080; const sg = sq.getContext('2d');
function snap() { sg.fillStyle = cc[1]; sg.fillRect(0, 0, 1080, 1080); const s = Math.min(cv.width, cv.height); sg.drawImage(cv, (cv.width - s) / 2, (cv.height - s) / 2, s, s, 0, 0, 1080, 1080); }
const curText = () => letters.filter(l => !l.dead).map(l => l.ch).join('').trim() || 'in bloom';
async function save(name, blob) {
  if (!DL) { dlFallback(blob, name); say('Saved ' + name); return; }
  try { const r = await DL.save({ filename: name, data: blob }); say(r.status === 'saved' ? 'Saved ' + name : 'Sent ' + name); }
  catch (e) { say(e && e.code === 'declined' ? 'Cancelled.' : 'Couldn’t save (' + (e && e.code || 'error') + ').'); }
}
function stillPNG() { if (POSTER && PO) posterDraw(sg, performance.now() - pt0, 1); else snap(); sq.toBlob(b => b && save('garden.png', b), 'image/png'); }
async function recVideo() {
  if (busy) return;
  const mime = window.MediaRecorder && ['video/mp4;codecs=avc1.42E01E', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm'].find(m => MediaRecorder.isTypeSupported(m));
  if (!mime) { say('Video export isn’t supported in this browser — use PNG frames.'); return; }
  busy = true; setText(curText());
  const rec = new MediaRecorder(sq.captureStream(30), { mimeType: mime, videoBitsPerSecond: 14e6 }), ch = [];
  rec.ondataavailable = e => e.data && e.data.size && ch.push(e.data);
  const done = new Promise(r => { rec.onstop = r; }), t1 = performance.now(); snap(); rec.start();
  await new Promise(res => { const step = () => { const el = performance.now() - t1; snap(); say('Recording ' + Math.min(100, Math.round(el / 60)) + '%'); if (el < 6000) requestAnimationFrame(step); else res(); }; requestAnimationFrame(step); });
  rec.stop(); await done; busy = false;
  await save('garden.' + (mime.includes('mp4') ? 'mp4' : 'webm'), new Blob(ch, { type: mime.split(';')[0] }));
}
async function recFrames() {
  if (busy) return; busy = true; setText(curText());
  const files = [], t1 = performance.now();
  for (let i = 0; i < 90; i++) {
    await new Promise(r => setTimeout(r, Math.max(0, t1 + i * 33.3 - performance.now()))); snap();
    const b = await new Promise(r => sq.toBlob(r, 'image/png'));
    files.push({ name: `frame_${String(i + 1).padStart(4, '0')}.png`, data: new Uint8Array(await b.arrayBuffer()) });
    if (i % 6 === 0) say('Rendering ' + Math.round(i / 90 * 100) + '%');
  }
  busy = false; await save('garden-frames.zip', zip(files));
}
function zip(files) {
  const T = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; T[n] = c >>> 0; }
  const crc = d => { let c = 0xFFFFFFFF; for (let i = 0; i < d.length; i++) c = T[(c ^ d[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  const enc = new TextEncoder(), parts = [], cen = []; let off = 0;
  for (const f of files) {
    const nm = enc.encode(f.name), cr = crc(f.data), sz = f.data.length, hd = new DataView(new ArrayBuffer(30));
    hd.setUint32(0, 0x04034b50, true); hd.setUint16(4, 20, true); hd.setUint16(12, 33, true); hd.setUint32(14, cr, true); hd.setUint32(18, sz, true); hd.setUint32(22, sz, true); hd.setUint16(26, nm.length, true);
    parts.push(hd.buffer, nm, f.data);
    const c = new DataView(new ArrayBuffer(46));
    c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(14, 33, true); c.setUint32(16, cr, true); c.setUint32(20, sz, true); c.setUint32(24, sz, true); c.setUint16(28, nm.length, true); c.setUint32(42, off, true);
    cen.push(c.buffer, nm); off += 30 + nm.length + sz;
  }
  const cs = cen.reduce((s, b) => s + (b.byteLength || b.length), 0), e = new DataView(new ArrayBuffer(22));
  e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cs, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...cen, e.buffer], { type: 'application/zip' });
}
xv.onclick = () => (POSTER && PO ? recVideoP() : recVideo()); xf.onclick = () => (POSTER && PO ? recFramesP() : recFrames()); xp.onclick = xp2.onclick = stillPNG;
[xv, xf, xp, xp2].forEach(b => { b.disabled = false; });
function dlFallback(blob, name) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
async function saveSVG() {
  const parts = [], n = v => Math.round(v * 100) / 100;
  const pb = () => ({ d: '', moveTo(x, y) { this.d += `M${n(x)} ${n(y)}`; }, lineTo(x, y) { this.d += `L${n(x)} ${n(y)}`; }, quadraticCurveTo(a, b, x, y) { this.d += `Q${n(a)} ${n(b)} ${n(x)} ${n(y)}`; }, closePath() { this.d += 'Z'; } });
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const SB = {
    fill: (p, col) => { const b = pb(); path(b, p, true); parts.push(`<path d="${b.d}" fill="${col}"/>`); },
    stroke: (p, col, w) => { const b = pb(); path(b, p, false); parts.push(`<path d="${b.d}" fill="none" stroke="${col}" stroke-width="${n(w)}" stroke-linecap="round" stroke-linejoin="round"/>`); },
    rect: () => {},
    text: (ch, x, y, S, col) => parts.push(`<text x="${n(x)}" y="${n(y)}" text-anchor="middle" font-family="${FNAME}, Georgia, serif" font-weight="${FW}" font-size="${n(S)}" fill="${col}">${esc(ch)}</text>`)
  };
  const keep = B; B = SB; SVGM = true;
  try { render(performance.now()); } finally { B = keep; SVGM = false; }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${n(W)}" height="${n(H)}" viewBox="0 0 ${n(W)} ${n(H)}"><style>@import url('https://fonts.googleapis.com/css2?family=${FNAME.replace(/ /g, '+')}:wght@${FW}&amp;display=swap');</style><rect width="100%" height="100%" fill="${cc[1]}"/>${parts.join('')}</svg>`;
  await save('garden.svg', new Blob([svg], { type: 'image/svg+xml' }));
}
document.getElementById('xsvg').onclick = saveSVG;
const gl = document.getElementById('gl'), gl2 = document.getElementById('gl2');
function setGlow(v) { GLOW = v; gl.textContent = gl2.textContent = 'glow ' + (v ? 'on' : 'off'); gl2.classList.toggle('sel', v); gl.style.opacity = v ? 1 : 0.55; }
gl.onclick = gl2.onclick = () => { setGlow(!GLOW); if (!touch) inp.focus({ preventScroll: true }); };
setGlow(true);
// ---------- poster: motion presets (timed loops) ----------
const PRE = [{ id: 'breathe', label: 'Breathe', sub: 'Slow sway · 3s', T: 3000 }, { id: 'grow', label: 'Grow & wither', sub: 'Bloom, then back · 6s', T: 6000 }, { id: 'typed', label: 'Typed', sub: 'Type, cut, repeat · 5s', T: 5000 }, { id: 'wind', label: 'Gust', sub: 'Wind sweeps through · 4s', T: 4000 }, { id: 'reach', label: 'Reach', sub: 'Stems follow a light · 6s', T: 6000 }, { id: 'scatter', label: 'Scatter', sub: 'Random bloom, fade · 6s', T: 6000 }, { id: 'visit', label: 'Visitor', sub: 'Butterfly drops by · 7s', T: 7000 }, { id: 'sway', label: 'Sway', sub: 'Big slow swing · 4s', T: 4000 }, { id: 'ripple', label: 'Ripple', sub: 'Wave rolls across · 5s', T: 5000 }, { id: 'twirl', label: 'Twirl', sub: 'Blooms turn · 4s', T: 4000 }, { id: 'bounce', label: 'Bounce', sub: 'Springy hops · 3s', T: 3000 }, { id: 'orbit', label: 'Orbit', sub: 'Light circles round · 6s', T: 6000 }, { id: 'pulse', label: 'Pulse', sub: 'Blooms beat softly · 2s', T: 2000 }];
const mc = document.getElementById('mcards');
PRE.forEach(p => { const b = document.createElement('button'); b.className = 'card mcard'; b.dataset.id = p.id; b.innerHTML = `<span style="font-size:13px;color:#fff">${p.label}</span><span style="color:#8C8C8C;font-size:11px">${p.sub}</span>`; b.onclick = () => { PS = p.id; syncCards(); buildPoster(); }; mc.appendChild(b); });
function buildPoster() {
  const pr = PRE.find(p => p.id === PS) || PRE[0], text = (words.value || '').slice(0, 40) || ' ', L = [];
  RAND = rng(SEED * 7919 + 1); let prev = null, id = 1;
  for (const ch of text) {
    if (ch === ' ') { const sp = { ch: ' ', id: 9000 + id++, els: [] }; L.push(sp); prev = sp; continue; }
    const same = prev && prev.ch !== ' ', l = { ch, id: 9000 + id++, ws: same ? prev.ws : Math.floor(RAND() * 1e9), wi: same ? prev.wi + 1 : 0, prev: same ? prev : null };
    gen(l); L.push(l); prev = l;
  }
  const n = L.length, step = pr.id === 'grow' ? Math.min(110, 3000 / n) : pr.id === 'typed' ? Math.min(85, 3600 / n) : 0, off = pr.id === 'grow' ? 200 : pr.id === 'typed' ? 300 : 0;
  L.forEach((l, i) => { l.b = off + i * step; });
  if (pr.id === 'scatter') { const r = rng(SEED * 31 + 5); L.forEach(l => { l.b = 150 + r() * 2400; }); }
  const wd = Math.min(60, 900 / n);
  L.forEach((l, i) => { l.d = pr.id === 'scatter' ? 4700 + i * 8 : 4200 + (n - 1 - i) * wd; const nx = L[i + 1]; l.cutRel = null; if (pr.id !== 'scatter' && l.ch !== ' ' && nx && nx.ch === ' ') { l.cutRel = Math.max(30, nx.b - l.b); genEnd(l, l.cutRel); } });
  RAND = Math.random;
  const sw = W, sh = H, w0 = wrapped; W = H = 1080; wrapped = false; const res = layoutCore(L); W = sw; H = sh; wrapped = w0;
  let S = res.S, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  const addP = (l, x, y, r) => { const X = l.tx + x * S, Y = l.ty + y * S, R = (r || 0) * S; x0 = Math.min(x0, X - R); x1 = Math.max(x1, X + R); y0 = Math.min(y0, Y - R); y1 = Math.max(y1, Y + R); };
  for (const l of L) { if (l.ch === ' ') continue; addP(l, -l.tw / S / 2, -0.75); addP(l, l.tw / S / 2, 0.1); for (const e of [...l.els, ...(l.endEls || [])]) { if (e.t === 'stem') e.pts.forEach(q => addP(l, q[0], q[1], 0.02)); else if (e.t === 'leaf') addP(l, e.x, e.y, e.L); else addP(l, e.x, e.y, e.R * 1.15); } }
  let tx0 = 1e9, tx1 = -1e9, ty0 = 1e9, ty1 = -1e9;
  for (const l of L) if (l.ch !== ' ') { tx0 = Math.min(tx0, l.tx - l.tw / 2); tx1 = Math.max(tx1, l.tx + l.tw / 2); ty0 = Math.min(ty0, l.ty - 0.72 * S); ty1 = Math.max(ty1, l.ty); }
  const Z = 1080, half = Z * 0.44, bcx = (tx0 + tx1) / 2, bcy = (ty0 + ty1) / 2;
  const k = Math.min(1.25, half / Math.max(1, bcx - x0, x1 - bcx), half / Math.max(1, bcy - y0, y1 - bcy));
  L.forEach(l => { l.tx = Z / 2 + (l.tx - bcx) * k; l.ty = Z / 2 + (l.ty - bcy) * k; l.tw *= k; l.x = l.tx; l.y = l.ty; });
  PO = { letters: L, S: S * k, T: pr.T, preset: pr.id }; pt0 = performance.now();
  document.getElementById('pinfo').textContent = `1:1 · ${pr.T / 1000}s loop · 30 fps`; syncCards();
}
function posterFly(tt, P) {
  const ps = perch.slice().sort((a, b) => a.x - b.x); if (!ps.length) return;
  const p1 = ps[Math.floor(ps.length * 0.25)], p2 = ps[Math.min(ps.length - 1, Math.floor(ps.length * 0.75))];
  const A = [-80, 300], s1 = [p1.x, p1.y - p1.R * 0.55], s2 = [p2.x, p2.y - p2.R * 0.55], E = [1160, 260];
  const sz = Math.max(12, P.S * 0.09), t = tt / 1000, e1 = v => eo(Math.max(0, Math.min(1, v)));
  const leg = (a, b, u, lift) => { const e = e1(u); return [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e - Math.sin(e * Math.PI) * lift]; };
  let p, flying = true, vx = 0;
  if (t < 1.8) { p = leg(A, s1, t / 1.8, 160); vx = 1; } else if (t < 3.4) { p = s1; flying = false; } else if (t < 4.6) { p = leg(s1, s2, (t - 3.4) / 1.2, 140); vx = s2[0] > s1[0] ? 1 : -1; } else if (t < 5.8) { p = s2; flying = false; } else { p = leg(s2, E, (t - 5.8) / 1.2, 60); vx = 1; }
  let o, ang;
  if (flying) { o = Math.abs(Math.cos(t * 17)); p = [p[0] + Math.sin(t * 7) * 6, p[1] + Math.sin(t * 13) * 4]; ang = vx * 0.3; }
  else { const burst = (t > 2.4 && t < 2.8) || (t > 5 && t < 5.3); o = burst ? 0.2 + 0.8 * Math.abs(Math.cos(t * 9)) : 0.3 + 0.1 * Math.sin(t * 3); ang = 0; }
  butterfly(p[0], p[1], sz, ang, o);
}
function posterDraw(gx, t, sc) {
  const P = PO; if (!P) return;
  const keep = { g, letters, Sd, W, H }; g = gx; W = H = 1080; Sd = P.S;
  try {
    gx.setTransform(sc || 1, 0, 0, sc || 1, 0, 0); gx.globalAlpha = 1; gx.fillStyle = cc[1]; gx.fillRect(0, 0, 1080, 1080);
    const tt = ((t % P.T) + P.T) % P.T, L = P.letters, S = P.S; let draw = L, light = null, typed = false;
    FACE = false; PERCH = false; PW = null; PR = null; TXTALL = true; WITH = 600;
    L.forEach(l => { l.x = l.tx; l.y = l.ty; l.dead = null; });
    const set = base => L.forEach(l => { l.birth = base + l.b; l.tb = l.birth; l.cut = l.cutRel != null ? l.birth + l.cutRel : null; });
    if (P.preset === 'breathe') {
      set(-1e5); const ph = tt / P.T * Math.PI * 2;
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S); return [x + Math.sin(ph + l.x * 0.004 + hh * 1.1) * S * 0.03 * hh, y + Math.cos(ph + x * 0.003) * S * 0.008 * hh]; };
      PR = e => Math.sin(ph + e.id * 0.7) * 0.12;
    } else if (P.preset === 'grow' || P.preset === 'scatter') {
      set(0); L.forEach(l => { if (tt >= l.d) l.dead = l.d; });
    } else if (P.preset === 'wind') {
      set(-1e5); const front = -0.35 + tt / P.T * 1.9, gust = d => d < 0 ? Math.exp(d * 2.2) * Math.cos(-d * 9) : Math.exp(-d * d * 30);
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S), gg = gust(l.x / 1080 - front), idle = Math.sin(tt / 1000 * 1.6 + l.x * 0.01) * 0.012; return [x + (gg * 0.13 + idle) * S * hh * hh * 0.6 + (gg * 0.13 + idle) * S * hh * 0.4, y + Math.abs(gg) * 0.02 * S * hh]; };
      PR = e => gust(e.x / 1080 - front) * 0.35;
    } else if (P.preset === 'reach' || P.preset === 'orbit') {
      set(-1e5); const ph = tt / P.T * Math.PI * 2, orb = P.preset === 'orbit', lx = orb ? 540 + Math.cos(ph) * 380 : 540 + Math.sin(ph) * 430, ly = orb ? 540 + Math.sin(ph) * 320 : 540 + Math.sin(ph * 2) * 260; light = [lx, ly];
      PW = (x, y, l) => { const dx = lx - l.x, dy = ly - (l.y - S * 0.6), d = Math.hypot(dx, dy) || 1, w = Math.max(0, 1 - d / 560), s = w * w * (3 - 2 * w), hh = Math.min(2.5, Math.max(0, (l.y - y) / S)), f = hh * hh * 0.5 + hh * 0.5; return [x + dx / d * s * S * 0.12 * f, y + dy / d * s * S * 0.06 * f]; };
      PR = e => Math.sin(Math.atan2(ly - e.y, lx - e.x)) * 0.15;
    } else if (P.preset === 'visit') {
      set(-1e5); PERCH = true; const ph = tt / P.T * Math.PI * 2;
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S); return [x + Math.sin(ph + l.x * 0.004 + hh) * S * 0.015 * hh, y]; };
    } else if (P.preset === 'sway') {
      set(-1e5); const ph = tt / P.T * Math.PI * 2;
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S), w = Math.sin(ph + l.x * 0.002); return [x + w * S * 0.05 * hh * hh + w * S * 0.03 * hh, y]; };
      PR = e => Math.sin(ph + e.x * 0.002) * 0.18;
    } else if (P.preset === 'ripple') {
      set(-1e5); const ph = tt / P.T * Math.PI * 2;
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S), w = Math.sin(ph - l.x * 0.012); return [x + w * S * 0.05 * hh, y - Math.abs(w) * S * 0.02 * hh]; };
      PR = e => Math.sin(ph - e.x * 0.012) * 0.25;
    } else if (P.preset === 'twirl') {
      set(-1e5); const ph = tt / P.T * Math.PI * 2;
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S); return [x + Math.sin(ph + l.x * 0.004) * S * 0.012 * hh, y]; };
      PR = e => Math.sin(ph + e.id) * 0.7;
    } else if (P.preset === 'bounce') {
      set(-1e5); const ph = tt / P.T * Math.PI * 2;
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S); return [x, y - Math.abs(Math.sin(ph + l.x * 0.006)) * S * 0.06 * hh]; };
      PR = e => Math.sin(ph * 2 + e.id * 0.5) * 0.1;
    } else if (P.preset === 'pulse') {
      set(-1e5); const ph = tt / P.T * Math.PI * 2;
      PW = (x, y, l) => { const hh = Math.max(0, (l.y - y) / S); return [x, y - (0.5 + 0.5 * Math.sin(ph * 2 - hh * 2)) * S * 0.03 * hh]; };
      PR = e => Math.sin(ph * 2 + e.id) * 0.18;
    } else {
      if (tt >= 4400) return;
      set(0); draw = L.filter(l => tt >= l.birth); TXTALL = false; typed = true;
    }
    letters = draw; render(tt);
    if (light) { const r = S * 0.09, pts = []; for (let k = 0; k < 20; k++) { const a = k / 20 * Math.PI * 2; pts.push([light[0] + Math.cos(a) * r, light[1] + Math.sin(a) * r]); } B.fill(pts, cc[4]); }
    if (P.preset === 'visit') posterFly(tt, P);
    if (typed) {
      const last = draw[draw.length - 1];
      if (Math.floor(tt / 400) % 2 === 0 || (last && tt - last.birth < 300)) { const x = last ? last.tx + last.tw / 2 + 0.07 * S : 540, y = last ? last.ty - 0.33 * S : 540, w = Math.max(2, S * 0.03), hh = 0.8 * S; B.rect(x - w / 2, y - hh / 2, w, hh, cc[5]); }
    }
  } finally { g = keep.g; letters = keep.letters; Sd = keep.Sd; W = keep.W; H = keep.H; FACE = true; PW = null; PR = null; PERCH = false; TXTALL = false; WITH = 260; }
}
const fslug = () => 'garden-' + ((words.value || 'loop').trim().replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 24) || 'loop') + '-' + PS;
async function recVideoP() {
  if (busy) return;
  const mime = window.MediaRecorder && ['video/mp4;codecs=avc1.42E01E', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm'].find(m => MediaRecorder.isTypeSupported(m));
  if (!mime) { say('Video export isn’t supported in this browser — use PNG frames.'); return; }
  busy = true;
  const stream = sq.captureStream(0), track = stream.getVideoTracks()[0], rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 14e6 }), ch = [];
  rec.ondataavailable = e => e.data && e.data.size && ch.push(e.data);
  const done = new Promise(r => { rec.onstop = r; }), N = Math.round(PO.T / 1000 * 30), wait = ms => new Promise(r => setTimeout(r, ms));
  posterDraw(sg, 0, 1); rec.start(); const t1 = performance.now();
  for (let i = 0; i < N; i++) { posterDraw(sg, i * 1000 / 30, 1); if (track.requestFrame) track.requestFrame(); if (i % 15 === 0) say('Recording ' + Math.round(i / N * 100) + '%'); await wait(Math.max(0, t1 + (i + 1) * 1000 / 30 - performance.now())); }
  rec.stop(); await done; busy = false;
  await save(fslug() + '.' + (mime.includes('mp4') ? 'mp4' : 'webm'), new Blob(ch, { type: mime.split(';')[0] }));
}
async function recFramesP() {
  if (busy) return; busy = true;
  const N = Math.round(PO.T / 1000 * 30), files = [];
  for (let i = 0; i < N; i++) {
    posterDraw(sg, i * 1000 / 30, 1);
    const b = await new Promise(r => sq.toBlob(r, 'image/png'));
    files.push({ name: `frame_${String(i + 1).padStart(4, '0')}.png`, data: new Uint8Array(await b.arrayBuffer()) });
    if (i % 10 === 0) say('Rendering ' + Math.round(i / N * 100) + '%');
  }
  busy = false; await save(fslug() + '-frames.zip', zip(files));
}
// ---------- typefaces ----------
const FONTS = [['Playfair Display', 700], ['DM Serif Display', 400], ['Abril Fatface', 400], ['Fraunces', 700], ['Bodoni Moda', 700], ['Cormorant Garamond', 700], ['Yeseva One', 400], ['Rozha One', 400], ['Unbounded', 700], ['Bebas Neue', 400], ['Lobster', 400], ['Pacifico', 400]];
const tc = document.getElementById('tcards'), fsel = document.getElementById('fsel');
FONTS.forEach(([n, w], i) => {
  const b = document.createElement('button'); b.className = 'card'; b.dataset.i = i;
  b.innerHTML = `<span style="font:${w} 24px '${n}',serif;color:#fff">Aa</span><br><span style="color:#8C8C8C;font-size:11px">${n}</span>`;
  b.onclick = () => setFont(i); tc.appendChild(b);
  const o = document.createElement('option'); o.value = i; o.textContent = n; fsel.appendChild(o);
});
function setFont(i) {
  const [n, w] = FONTS[i]; F = `"${n}",Georgia,serif`; FW = w; FNAME = n; fsel.value = i;
  [...tc.children].forEach(b => b.classList.toggle('sel', +b.dataset.i === i));
  const re = () => { cache = {}; layout(); if (POSTER) buildPoster(); };
  re(); document.fonts.load(`${w} 100px "${n}"`).then(re).catch(() => {});
}
fsel.onchange = () => { setFont(+fsel.value); if (!touch) inp.focus({ preventScroll: true }); };
fsel.value = 0; tc.children[0].classList.add('sel');
setPal(0);

addEventListener('resize', resize); resize();
if (document.fonts) document.fonts.load(`${FW} 100px ${F}`).then(() => { cache = {}; layout(); if (POSTER) buildPoster(); }).catch(() => {});
if (!touch) setTimeout(() => inp.focus({ preventScroll: true }), 50);
frame();
// seed the first word so the page opens in bloom
setTimeout(() => { let t = performance.now(); for (const ch of 'in bloom') { add(ch, t); t += 90; } letters.forEach((l, i) => { l.birth -= 0; }); }, 300);
})();
