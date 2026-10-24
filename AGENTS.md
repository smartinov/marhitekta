# Find the Architect

Static hidden-object game published with GitHub Pages from `main` (repository root). There is no build step, framework or dependency.

## Layout

- `index.html`: landing page; one card per architect linking to `play.html?a=<id>`.
- `play.html`: the shared game (pan, zoom, pinch, click to find, checklist). It loads `<id>/game.js`; `id` must match `^[a-z-]+$`.
- `style.css`: styles for both pages.
- `<id>/game.js`: sets `window.GAME` with the panorama size, the 2 × 2 tile list and the targets. Each target box is `[x, y, width, height]` in full-panorama pixels.
- `<id>/tile-1..4.avif|webp`: non-overlapping quadrants (top left, top right, bottom left, bottom right); AVIF with WebP fallback.
- `<id>/preview.webp`: ~1000 px wide placeholder shown while tiles load.
- `<id>/portrait.webp`: landing card portrait. Credit it in the landing footer.

## Frank Lloyd Wright source

The artwork comes from the private working project `~/Documents/MArhitekta` (the edition is still a work-in-progress candidate there, published here at the owner's request).

- Image: `panorama/work/assembly/populated/candidate.png`, 6280 × 3533. Replace with an approved `panorama/complete/` image once one exists.
- Building boxes: `panorama/work/production-layout/layout.json` → `targets[].projectedPixelBounds`. Wright: `panorama/work/assembly/populated/placements.json` → `actor` (`topLeft`, `width`, `height`).
- Boxes are only valid while the panorama stays 6280 × 3533 with the same layout; re-check them against crops of any new image.
- Portrait: `references/architect/wright-portrait.jpg`, Al Ravenna 1954, public domain (Library of Congress).

Regenerate assets from a new image (`SRC` is the panorama PNG):

```sh
magick "$SRC" -crop 3140x1767+0+0 +repage t1.png
magick "$SRC" -crop 3140x1767+3140+0 +repage t2.png
magick "$SRC" -crop 3140x1766+0+1767 +repage t3.png
magick "$SRC" -crop 3140x1766+3140+1767 +repage t4.png
for i in 1 2 3 4; do cwebp -q 82 -m 6 t$i.png -o wright/tile-$i.webp; avifenc -q 60 -s 6 -j all t$i.png wright/tile-$i.avif; done
magick "$SRC" -resize 1000x -quality 55 wright/preview.webp
```

## Adding an architect

Create `<id>/` with `game.js`, four tiles, `preview.webp` and `portrait.webp`, then add a card to `index.html` and its portrait credit to the footer. Clear the rights for every published image first.

## Verification

Serve the folder over HTTP (any static server) and check desktop and phone viewports in Chromium and WebKit with standalone Playwright: landing renders, all four tiles load, clicking every target box centre at Fit reaches `N / N`, a click on empty ground is a miss, drag pans without guessing, and the console has no errors. Keep such scripts outside the repository.

## Open work

- Swap in the approved panorama when MArhitekta's review finishes, and re-verify all boxes.
- More architects.
- Not implemented: progress persistence across reloads, hint/reveal button, touch momentum scrolling.
