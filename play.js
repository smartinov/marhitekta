// Shared game for architects/<name>/index.html; that page's game.js sets window.GAME first.
const game = window.GAME;
const [W, H] = game.size;
const $ = (id) => document.getElementById(id);
const view = $('view'), stage = $('stage'), list = $('list');
const found = new Set();
const started = Date.now();

stage.style.aspectRatio = `${W} / ${H}`;
// A small preview shows instantly while the full-resolution tiles stream in on top.
stage.style.background = 'url(preview.webp) 0 0 / 100% 100%';
stage.innerHTML = game.tiles.map(([file, w, h]) =>
  `<picture><source srcset="${file}.avif" type="image/avif">` +
  `<img src="${file}.webp" width="${w}" height="${h}" alt="" draggable="false"></picture>`).join('');
stage.querySelector('img').alt = `Crowded illustrated landscape hiding buildings by ${game.name}`;
list.innerHTML = game.targets.map((t) => `<li><b>${t.name}</b><small>${t.cue}</small></li>`).join('');

// Scale is displayed pixels per panorama pixel.
let scale = 1;
const minScale = () => Math.min(view.clientWidth / W, view.clientHeight / H);
// Keeps the panorama point under (fromX, fromY) on screen at (toX, toY) after zooming.
function zoomAt(next, fromX, fromY, toX = fromX, toY = fromY) {
  const before = stage.getBoundingClientRect();
  const px = (fromX - before.left) / scale, py = (fromY - before.top) / scale;
  scale = Math.min(3, Math.max(minScale(), next));
  stage.style.width = `${W * scale}px`;
  const after = stage.getBoundingClientRect();
  view.scrollLeft += after.left + px * scale - toX;
  view.scrollTop += after.top + py * scale - toY;
}
const viewCenter = () => {
  const r = view.getBoundingClientRect();
  return [r.left + r.width / 2, r.top + r.height / 2];
};
const zoomCenter = (factor) => zoomAt(scale * factor, ...viewCenter());
const fit = () => zoomCenter(0);
fit();
// Open filling the viewport so phones do not start on a letterboxed thumbnail.
zoomCenter(Math.max(view.clientWidth / W, view.clientHeight / H) / scale);
addEventListener('resize', () => scale < minScale() && fit());
$('in').onclick = () => zoomCenter(1.5);
$('out').onclick = () => zoomCenter(1 / 1.5);
$('fit').onclick = fit;
// The counter toggles the checklist, which is a bottom sheet on phones.
const showList = (open) => {
  document.body.classList.toggle('list-open', open);
  $('count').setAttribute('aria-expanded', open);
};
$('count').onclick = () => showList(!document.body.classList.contains('list-open'));
addEventListener('keydown', (e) => {
  if (e.key === '+' || e.key === '=') zoomCenter(1.5);
  if (e.key === '-') zoomCenter(1 / 1.5);
  // Keyboard players pan with the arrow keys and guess at the centre crosshair.
  if (e.key === 'Enter' && document.activeElement === view) guess(...viewCenter());
});
view.addEventListener('wheel', (e) => {
  if (!e.ctrlKey) return;
  e.preventDefault();
  zoomAt(scale * Math.exp(-e.deltaY * 0.01), e.clientX, e.clientY);
}, { passive: false });

// One pointer pans, two pointers pinch; a primary press that barely moves is a guess.
const pointers = new Map();
let travel = 0;
view.onpointerdown = (e) => {
  if (e.button !== 0) return;
  // On phones the sheet covers the picture, so the first touch only dismisses it.
  if (matchMedia('(max-width: 760px)').matches && document.body.classList.contains('list-open')) return showList(false);
  view.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  travel = pointers.size > 1 ? Infinity : 0;
};
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
  view.scrollLeft -= e.clientX - p.x;
  view.scrollTop -= e.clientY - p.y;
  travel += Math.abs(e.clientX - p.x) + Math.abs(e.clientY - p.y);
  p.x = e.clientX;
  p.y = e.clientY;
};
view.onpointerup = (e) => {
  if (pointers.size === 1 && pointers.has(e.pointerId) && travel < 8) guess(e.clientX, e.clientY);
  pointers.delete(e.pointerId);
};
view.onpointercancel = (e) => pointers.delete(e.pointerId);

const pct = (v, total) => `${(v / total) * 100}%`;
function guess(x, y) {
  const r = stage.getBoundingClientRect();
  const ix = (x - r.left) / scale, iy = (y - r.top) / scale;
  // Small targets get at least an 80 px square so Wright stays clickable.
  const index = game.targets.findIndex(({ box: [bx, by, bw, bh] }, i) => {
    const padX = Math.max(0, (80 - bw) / 2), padY = Math.max(0, (80 - bh) / 2);
    return !found.has(i) && ix >= bx - padX && ix <= bx + bw + padX && iy >= by - padY && iy <= by + bh + padY;
  });
  if (index < 0) {
    const miss = document.createElement('div');
    miss.className = 'miss';
    miss.style.left = pct(ix, W);
    miss.style.top = pct(iy, H);
    stage.append(miss);
    miss.onanimationend = () => miss.remove();
    return;
  }
  found.add(index);
  const [bx, by, bw, bh] = game.targets[index].box;
  const mark = document.createElement('div');
  mark.className = 'mark';
  Object.assign(mark.style, { left: pct(bx, W), top: pct(by, H), width: pct(bw, W), height: pct(bh, H) });
  stage.append(mark);
  list.children[index].classList.add('found');
  update();
  const seconds = Math.round((Date.now() - started) / 1000);
  toast(found.size === game.targets.length
    ? `You found everything in ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}!`
    : `Found ${game.targets[index].name}!`);
}

let toastTimer;
function toast(text) {
  $('toast').textContent = text;
  $('toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').classList.remove('show'), found.size === game.targets.length ? 8000 : 1800);
}
const update = () => { $('count').textContent = `${found.size} / ${game.targets.length}`; };
update();
