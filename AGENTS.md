# Find the Architect

Static hidden-object game at https://smartinov.github.io/marhitekta/. GitHub Pages deploys `main` (repository root) automatically on every push; `.nojekyll` skips Jekyll. There is no build step, framework or dependency. MIT licensed (`LICENSE`); the Wright portrait is public domain.

## Layout

- `index.html`: landing page; one card per architect plus the "more coming soon" card.
- `architects/<name>/index.html`: one static page per architect (clean URL `/architects/<name>/`) with its own title, description, canonical URL and Open Graph/Twitter tags. Loads `game.js` then `../../play.js`.
- `play.js`: shared game (pan, zoom, pinch, tap to find, keyboard crosshair, checklist bottom sheet on phones).
- `style.css`: styles for every page; phones (≤760 px) are the primary layout.
- `architects/<name>/game.js`: sets `window.GAME` with the panorama size, the 2 × 2 tile list and the targets. Each target box is `[x, y, width, height]` in full-panorama pixels.
- `architects/<name>/tile-1..4.avif|webp`: non-overlapping quadrants (top left, top right, bottom left, bottom right); AVIF with WebP fallback.
- `architects/<name>/preview.webp`: ~1000 px wide placeholder shown while tiles load.
- `architects/<name>/portrait.webp`: landing card portrait. Credit it in the landing footer.
- `architects/<name>/share.jpg`: 1200 × 630 link-preview banner (portrait + scene crop + title), kept under 300 KB for WhatsApp.
- `sitemap.xml`, `robots.txt`: list every architect page in the sitemap.

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
for i in 1 2 3 4; do cwebp -q 82 -m 6 t$i.png -o architects/frank-lloyd-wright/tile-$i.webp; avifenc -q 60 -s 6 -j all t$i.png architects/frank-lloyd-wright/tile-$i.avif; done
magick "$SRC" -resize 1000x -quality 55 architects/frank-lloyd-wright/preview.webp
```

## Adding an architect

Copy `architects/frank-lloyd-wright/` to `architects/<name>/`, replace `game.js`, tiles, `preview.webp`, `portrait.webp`, `share.jpg` and the page metadata, then add a card to `index.html`, its portrait credit to the footer and its URL to `sitemap.xml`. Clear the rights for every published image first.

## Verification

Serve the folder over HTTP (any static server) and check desktop and phone viewports in Chromium and WebKit with standalone Playwright: landing renders, all four tiles load, clicking every target box centre at Fit reaches `N / N`, a click on empty ground is a miss, drag pans without guessing, and the console has no errors. Keep such scripts outside the repository.

## Open work

- Swap in the approved panorama when MArhitekta's review finishes, and re-verify all boxes.
- More architects.
- Not implemented: progress persistence across reloads, hint/reveal button, touch momentum scrolling.
