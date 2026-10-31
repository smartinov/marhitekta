// Shared game for architects/<name>/index.html; that page's game.js sets window.GAME first.
const game = window.GAME;
const [W, H] = game.size;
const $ = (id) => document.getElementById(id);
const view = $('view'), stage = $('stage'), list = $('list'), card = $('card');
const found = new Set();
const marks = [];
let started = 0;
const phone = () => matchMedia('(max-width: 760px)').matches;
const motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1;
// Drawn rather than an emoji so the bulb looks the same on every platform.
const BULB = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="glass" d="M12 2a7 7 0 0 0-4.2 12.6c.7.6 1.2 1.4 1.2 2.4h6c0-1 .5-1.8 1.2-2.4A7 7 0 0 0 12 2z" fill="#ffd23f" stroke="#2b2118" stroke-width="1.2"/><path d="M9 18.5h6v1.5H9zM10 21h4v1.5h-4z" fill="currentColor"/></svg>';
const TARGET = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/></svg>';

stage.style.aspectRatio = `${W} / ${H}`;
// A small preview shows instantly while the full-resolution tiles stream in on top.
stage.style.background = 'url(preview.webp) 0 0 / 100% 100%';
stage.innerHTML = game.tiles.map(([file, w, h]) =>
  `<picture><source srcset="${file}.avif" type="image/avif">` +
  `<img src="${file}.webp" width="${w}" height="${h}" alt="" draggable="false"></picture>`).join('');
stage.querySelector('img').alt = `Crowded illustrated landscape hiding buildings by ${game.name}`;
list.innerHTML = game.targets.map((t) =>
  `<li><button class="hint" aria-label="Hint for ${t.name}">${BULB}</button>` +
  `<button class="goto" aria-label="Show ${t.name}">${TARGET}</button>` +
  `<button class="name">${t.name}</button><small>${t.cue}</small>` +
  (t.figure ? `<img class="figure" src="${t.figure}" alt="">` : '') + '</li>').join('');

// Scale is displayed pixels per panorama pixel.
let scale = 1;
const minScale = () => Math.min(view.clientWidth / W, view.clientHeight / H);
const showZoom = () => { $('zoom').textContent = `${(scale / minScale()).toFixed(1)}×`; };
// Keeps the panorama point under (fromX, fromY) on screen at (toX, toY) after zooming.
function zoomAt(next, fromX, fromY, toX = fromX, toY = fromY) {
  const before = stage.getBoundingClientRect();
  const px = (fromX - before.left) / scale, py = (fromY - before.top) / scale;
  scale = Math.min(3, Math.max(minScale(), next));
  stage.style.width = `${W * scale}px`;
  const after = stage.getBoundingClientRect();
  view.scrollLeft += after.left + px * scale - toX;
  view.scrollTop += after.top + py * scale - toY;
  showZoom();
  pin();
}
const viewCenter = () => {
  const r = view.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
};
// Panorama point currently under the middle of the view.
const centerPoint = () => {
  const r = stage.getBoundingClientRect(), [vx, vy] = viewCenter();
  return [(vx - r.left) / scale, (vy - r.top) / scale];
};
// Sets the zoom and puts panorama point (px, py) in the middle of the view, as far as scrolling allows.
function centerOn(next, px, py) {
  const r = stage.getBoundingClientRect(), [vx, vy] = viewCenter();
  zoomAt(next, r.left + px * scale, r.top + py * scale, vx, vy);
}
// Eases zoom and position together so hints and focus read as a camera move, not a jump.
let flight = 0, aim = null;
const stop = () => { cancelAnimationFrame(flight); aim = null; };
function flyTo(next, px, py, done) {
  stop();
  const s0 = scale, s1 = Math.min(3, Math.max(minScale(), next)), [x0, y0] = centerPoint(), t0 = performance.now();
  aim = [s1, px, py];
  const step = (now) => {
    const t = motion ? Math.min(1, (now - t0) / 600) : 1, e = t < 0.5 ? 2 * t * t : 1 - (2 - 2 * t) ** 2 / 2;
    centerOn(s0 * (s1 / s0) ** e, x0 + (px - x0) * e, y0 + (py - y0) * e);
    if (t < 1) flight = requestAnimationFrame(step);
    else { aim = null; done?.(); }
  };
  flight = requestAnimationFrame(step);
}
// Repeated taps build on where an ongoing flight is heading, not where it currently is.
const zoomBy = (factor) => {
  const [s, px, py] = aim || [scale, ...centerPoint()];
  flyTo(s * factor, px, py);
};
const fit = () => flyTo(0, W / 2, H / 2);
// Open filling the viewport so phones do not start on a letterboxed thumbnail.
centerOn(Math.max(view.clientWidth / W, view.clientHeight / H), W / 2, H / 2);
// Watches the view itself, which also changes size when the desktop checklist opens.
new ResizeObserver(() => (scale < minScale() ? centerOn(0, ...centerPoint()) : showZoom())).observe(view);
$('in').onclick = () => zoomBy(1.5);
$('out').onclick = () => zoomBy(1 / 1.5);
$('fit').onclick = fit;
// The counter toggles the checklist, which is a bottom sheet on phones.
const showList = (open) => {
  document.body.classList.toggle('list-open', open);
  $('count').setAttribute('aria-expanded', open);
  // The closed phone sheet is only slid off-screen, so keep keyboard and screen readers out of it.
  $('checklist').inert = !open;
};
showList(false);
$('count').onclick = () => showList(!document.body.classList.contains('list-open'));
// Every visit opens on the objective, the architect's figure and the controls; the checklist follows.
$('intro').onclose = () => {
  started ||= Date.now();
  if ($('intro').returnValue === 'list') showList(true);
};
// Escape keeps the previous returnValue, so clear it before each opening.
const intro = () => { $('intro').returnValue = ''; $('intro').showModal(); };
$('help').onclick = intro;
intro();
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') card.hidden = true;
  if (e.key === '+' || e.key === '=') zoomBy(1.5);
  if (e.key === '-') zoomBy(1 / 1.5);
  // Keyboard players pan with the arrow keys and guess at the centre crosshair.
  if (e.key === 'Enter' && document.activeElement === view) guess(...viewCenter());
});
view.addEventListener('wheel', (e) => {
  if (!e.ctrlKey) return;
  e.preventDefault();
  stop();
  zoomAt(scale * Math.exp(-e.deltaY * 0.01), e.clientX, e.clientY);
}, { passive: false });

// One pointer pans, two pointers pinch; a primary press that barely moves is a guess.
const pointers = new Map();
let start = null, moved = false, speed = [0, 0], lastMove = 0;
view.onpointerdown = (e) => {
  if (e.button !== 0) return;
  // On phones the sheet covers the picture, so the first touch only dismisses it.
  if (phone() && document.body.classList.contains('list-open')) return showList(false);
  stop();
  view.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size > 1) moved = true;
  else [start, moved, speed] = [[e.clientX, e.clientY], false, [0, 0]];
};
// A flicked finger lets the picture glide on and slow down, as native scrolling does.
function glide([vx, vy]) {
  let last = performance.now();
  const step = (now) => {
    const dt = now - last, k = Math.exp(-dt / 325);
    last = now;
    view.scrollLeft -= vx * dt;
    view.scrollTop -= vy * dt;
    [vx, vy] = [vx * k, vy * k];
    if (Math.hypot(vx, vy) > 0.02) flight = requestAnimationFrame(step);
  };
  flight = requestAnimationFrame(step);
}
view.onpointermove = (e) => {
  const p = pointers.get(e.pointerId);
  if (!p) return;
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const fromX = (a.x + b.x) / 2, fromY = (a.y + b.y) / 2, fromD = Math.hypot(a.x - b.x, a.y - b.y);
    p.x = e.clientX;
    p.y = e.clientY;
    zoomAt(scale * Math.hypot(a.x - b.x, a.y - b.y) / fromD, fromX, fromY, (a.x + b.x) / 2, (a.y + b.y) / 2);
    return;
  }
  const dx = e.clientX - p.x, dy = e.clientY - p.y, dt = Math.max(1, e.timeStamp - lastMove);
  view.scrollLeft -= dx;
  view.scrollTop -= dy;
  speed = [(speed[0] + dx / dt) / 2, (speed[1] + dy / dt) / 2];
  lastMove = e.timeStamp;
  // Fingers wobble a few pixels during a tap, so only a real drag cancels the guess.
  if (Math.hypot(e.clientX - start[0], e.clientY - start[1]) > 10) moved = true;
  p.x = e.clientX;
  p.y = e.clientY;
};
view.onpointerup = (e) => {
  if (pointers.size === 1 && pointers.has(e.pointerId)) {
    if (!moved) guess(e.clientX, e.clientY);
    else if (e.pointerType === 'touch' && motion && e.timeStamp - lastMove < 100) glide(speed);
  }
  pointers.delete(e.pointerId);
};
view.addEventListener('scroll', () => pin());
view.onpointercancel = (e) => pointers.delete(e.pointerId);

const pct = (v, total) => `${(v / total) * 100}%`;
const place = (el, x, y, w, h) => Object.assign(el.style, { left: pct(x, W), top: pct(y, H), width: pct(w, W), height: pct(h, H) });

// Bulbs in the checklist give hints; a found item's target icon or name flies back to it.
list.onclick = (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const i = [...list.children].indexOf(li);
  if (e.target.closest('.hint') && !found.has(i)) hint(i);
  else if (e.target.closest('.goto, .name') && found.has(i)) focus(i);
};

function focus(i) {
  const [bx, by, bw, bh] = game.targets[i].box;
  if (phone()) showList(false);
  card.hidden = true;
  // Leave the card's size plus gaps free beside the target: to the right on wide screens, below it on phones.
  const [roomX, roomY] = phone() ? [0, 300] : [324, 0];
  const s = Math.min(3, Math.max(minScale(), 0.6 * Math.min((view.clientWidth - roomX) / bw, (view.clientHeight - roomY) / bh)));
  flyTo(s, bx + bw / 2 + roomX / 2 / s, by + bh / 2 + roomY / 2 / s, () => {
    marks[i].animate([{ opacity: 1 }, { opacity: 0.15 }, { opacity: 1 }], { duration: 500, iterations: 3 });
    showCard(i);
  });
}

// The card about a found target sits beside it and follows it while the picture pans and zooms.
let carded = -1;
function showCard(i) {
  const t = game.targets[i];
  carded = i;
  $('card-name').textContent = t.name;
  $('card-about').textContent = t.about;
  $('card-look').innerHTML = `<b>Look at it:</b> ${t.look}`;
  $('card-links').innerHTML = 'Read more: ' + t.links.map(([label, url]) =>
    `<a href="${url}" target="_blank" rel="noopener">${label}</a>`).join(' · ');
  card.hidden = false;
  pin();
}
card.querySelector('.close').onclick = () => { card.hidden = true; };
function pin() {
  if (card.hidden) return;
  const f = view.getBoundingClientRect(), m = marks[carded].getBoundingClientRect();
  // The bottom edge stops above the floating Checklist button.
  const w = card.offsetWidth, h = card.offsetHeight, gap = 12, bottom = f.bottom - 84;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));
  // Prefer beside the target, then below or above it; at worst the card overlaps it, kept inside the view.
  let x = m.right + gap + w <= f.right ? m.right + gap : m.left - gap - w >= f.left ? m.left - gap - w : null, y;
  if (x !== null) y = clamp(m.top + m.height / 2 - h / 2, f.top + gap, bottom - h);
  else {
    x = clamp(m.left + m.width / 2 - w / 2, f.left + gap, f.right - w - gap);
    y = m.bottom + gap + h <= bottom ? m.bottom + gap : m.top - gap - h >= f.top ? m.top - gap - h : bottom - h;
  }
  card.style.left = `${x - f.left}px`;
  card.style.top = `${y - f.top}px`;
}

// Hints recharge for a few seconds so they cannot be spammed; the bulbs visibly light back up.
const HINT_COOLDOWN = 5000;
let charged = 0, ping = null;
const hintsUsed = new Map();
function hint(i) {
  if (performance.now() < charged) return toast('The bulb is still charging…');
  charged = performance.now() + HINT_COOLDOWN;
  list.querySelectorAll('.glass').forEach((glass) =>
    glass.animate([{ fill: '#8f877b' }, { fill: '#8f877b', offset: 0.1 }, { fill: '#ffd23f' }], { duration: HINT_COOLDOWN }));

  // Each hint for a target pings a tighter circle around a random nearby spot, never centred on the target.
  const level = Math.min(3, (hintsUsed.get(i) || 0) + 1);
  hintsUsed.set(i, level);
  const [bx, by, bw, bh] = game.targets[i].box;
  // Minimum radii keep the first hints zoomed out for tiny targets such as the architect.
  const radius = Math.max(Math.max(bw, bh, 80) * [3, 1.5, 0.7][level - 1], [600, 250, 0][level - 1]);
  const angle = Math.random() * 2 * Math.PI, offset = (0.2 + Math.random() * 0.3) * radius;
  let cx = bx + bw / 2 + Math.cos(angle) * offset, cy = by + bh / 2 + Math.sin(angle) * offset;
  // Pull the circle inside the picture when the target still fits within it, so edge hints stay visible.
  const clamp = (v, size) => Math.min(Math.max(v, radius), size - radius);
  const inX = clamp(cx, W), inY = clamp(cy, H);
  if (Math.hypot(bx + bw / 2 - inX, by + bh / 2 - inY) + Math.hypot(bw, bh) / 2 <= radius) [cx, cy] = [inX, inY];

  if (phone()) showList(false);
  ping?.remove();
  flyTo(0.8 * Math.min(view.clientWidth, view.clientHeight) / (2 * radius), cx, cy, () => {
    ping = document.createElement('div');
    ping.className = 'ping';
    place(ping, cx - radius, cy - radius, 2 * radius, 2 * radius);
    stage.append(ping);
    const pulse = ping.animate([{ transform: 'scale(.25)', opacity: 1 }, { transform: 'scale(1)', opacity: 0 }],
      { duration: 1000, easing: 'ease-out', iterations: 3 });
    const done = ping;
    pulse.onfinish = () => done.remove();
  });
  toast(`${game.targets[i].name} is ${level < 3 ? 'somewhere around the ping' : 'very close to the ping'}`);
}

// Small targets get at least an 80 px square so Wright stays clickable.
const hitIndex = (ix, iy, wantFound) => game.targets.findIndex(({ box: [bx, by, bw, bh] }, i) => {
  const padX = Math.max(0, (80 - bw) / 2), padY = Math.max(0, (80 - bh) / 2);
  return found.has(i) === wantFound && ix >= bx - padX && ix <= bx + bw + padX && iy >= by - padY && iy <= by + bh + padY;
});
function guess(x, y) {
  const r = stage.getBoundingClientRect();
  const ix = (x - r.left) / scale, iy = (y - r.top) / scale;
  const index = hitIndex(ix, iy, false);
  if (index < 0) {
    const again = hitIndex(ix, iy, true);
    if (again >= 0) return focus(again);
    const miss = document.createElement('div');
    miss.className = 'miss';
    miss.style.left = pct(ix, W);
    miss.style.top = pct(iy, H);
    stage.append(miss);
    miss.onanimationend = () => miss.remove();
    card.hidden = true;
    return;
  }
  found.add(index);
  marks[index] = document.createElement('div');
  marks[index].className = 'mark';
  place(marks[index], ...game.targets[index].box);
  stage.append(marks[index]);
  list.children[index].classList.add('found');
  update();
  showCard(index);
  const seconds = Math.round((Date.now() - started) / 1000);
  const hints = [...hintsUsed.values()].reduce((a, b) => a + b, 0);
  toast(found.size === game.targets.length
    ? `You found everything in ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}` +
      (hints ? ` with ${hints} hint${hints > 1 ? 's' : ''}!` : ' without hints!')
    : `Found ${game.targets[index].name}!`, found.size === game.targets.length ? 8000 : 1800);
}

let toastTimer;
function toast(text, ms = 1800) {
  $('toast').textContent = text;
  $('toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.remove('show'), ms);
}
const update = () => {
  $('count').innerHTML = `Checklist <b>${found.size}/${game.targets.length}</b>`;
  $('count').setAttribute('aria-label', `Checklist: ${found.size} of ${game.targets.length} found`);
};
update();
