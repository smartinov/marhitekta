# Find the Architect

Static hidden-object game at https://smartinov.github.io/marhitekta/. GitHub Pages deploys `main` (repository root) automatically on every push; `.nojekyll` skips Jekyll. There is no build step, framework or dependency. Code is MIT (`LICENSE`); illustrations (tiles, previews, share banners) are CC BY-NC 4.0 (`LICENSE-ART`, which covers every `architects/` folder); the Wright portrait is public domain.

## Layout

- `index.html`: landing page; one card per architect plus the "more coming soon" card.
- `architects/<name>/index.html`: one static page per architect (clean URL `/architects/<name>/`) with its own title, description, canonical URL and Open Graph/Twitter tags. Loads `game.js` then `../../play.js`.
- `play.js`: shared game (pan, zoom, pinch, tap to find, keyboard crosshair, checklist, hints, found cards). Every load opens the `#intro` dialog (objective, the architect's figure enlarged next to its real in-picture pixels, the controls); its button opens the checklist, and the header `?` reopens it. The header holds back, title, `?` and zoom buttons (phones show only back, title and `?`); a zoom readout (× relative to the whole picture) sits top-right of the picture and a labelled `Checklist n/11` pill floats bottom-right, toggling the checklist (bottom sheet on phones, side panel on desktop). Each unfound item has a bulb (inline SVG `BULB`, not an emoji); a found item swaps it for a target icon (`TARGET`) that, like its name or tapping the found building again, flies back to it. Hints, focus, + / − and Fit are eased camera moves (`flyTo`, instant under reduced motion); pinch and drag stay direct, a touch flick glides on (`glide`, off under reduced motion), and a press that wanders under 10 px still counts as a tap. Finding a target, or flying back to it, opens `#card` beside it (`pin` keeps it there while panning and zooming, above the Checklist pill); the camera leaves room for the card to the right on wide screens and below on phones. A miss, × or Escape closes it. A hint flies to a random spot near the target and pings an expanding circle there three times: radii 3×, 1.5×, 0.7× the target size (minimum 80 px) with minimums of 600 and 250 px for the first two, so tiny targets start zoomed out; the circle is pulled inside the picture when the target still fits. After any hint all bulbs dim and recharge over `HINT_COOLDOWN` (5 s).
- `style.css`: styles for every page; phones (≤760 px) are the primary layout.
- `architects/<name>/game.js`: sets `window.GAME` with the panorama size, the 2 × 2 tile list and the targets. Each target box is `[x, y, width, height]` in full-panorama pixels. Every target has `cue` (checklist clue naming an architectural characteristic plus features actually visible in the panorama at native pixels), `about` (one or two sourced sentences on why it matters), `look` (a feature the player can inspect in the picture now) and `links` (`[label, url]` further reading: the custodian or official page first, then Wikipedia; shown only on the card, so article photos cannot spoil the search). The architect's target also has `figure`, shown in the checklist. Card facts and their source quotes live in the production project's `research/game-card-facts.md`.
- `architects/<name>/tile-1..4.avif|webp`: non-overlapping quadrants (top left, top right, bottom left, bottom right); AVIF with WebP fallback.
- `architects/<name>/preview.webp`: ~1000 px wide placeholder shown while tiles load.
- `architects/<name>/portrait.webp`: landing card portrait. Credit it in the landing footer.
- `architects/<name>/figure.webp`: the architect's actual panorama figure from its full-size generated source (the same drawing that was uniformly reduced into the picture, never a different portrait), about 480 px tall with transparency. `figure-actual.png`: a small native crop of the figure from the panorama, displayed pixelated; together they show what the figure looks like and how little of it survives at real size.
- `architects/<name>/share.jpg`: 1200 × 630 link-preview banner (portrait + scene crop + title), kept under 300 KB for WhatsApp.
- `sitemap.xml`, `robots.txt`: list every architect page in the sitemap.
- `favicon.svg` (master), `favicon.ico` (16/32/48) and `apple-touch-icon.png` (180, opaque): regenerate the last two from the SVG with `magick -density 300`. Pages are served under `/marhitekta/`, so every page needs explicit icon `<link>`s.

## Frank Lloyd Wright source

The artwork comes from the private working project `~/Documents/MArhitekta`.

- Image: the approved `panorama/complete/finding-wright.webp` (lossless), 6280 × 3533; decode it to PNG and use that as `SRC`. The published tiles were cut from the version whose source PNG has SHA-256 prefix `705679879c7d` (see `panorama/work/final-delivery/promotion-manifest.json`); compare before re-cutting.
- Building boxes: `panorama/work/production-layout/layout.json` → `targets[].projectedPixelBounds`. Wright: `panorama/work/assembly/populated/placements.json` → `actor` (`topLeft`, `width`, `height`).
- Boxes are only valid while the panorama stays 6280 × 3533 with the same layout; re-check them against crops of any new image.
- Portrait: `references/architect/wright-portrait.jpg`, Al Ravenna 1954, public domain (Library of Congress).
- Figure: `panorama/work/assets/logs/wright-v3/v4-trimmed-source.png` (613 × 1330, the source of the placed 14 × 32 sprite `v4-physical-final32px.png`; same pose, cane on the screen-left). `figure.webp`: `magick <source> -resize x480 -quality 80 -define webp:alpha-quality=90 figure.webp`; `figure-actual.png`: `magick "$SRC" -crop 24x40+956+3077 +repage figure-actual.png`. White hair is only a zoom-level cue (Fable cue review HOLD), so clues must not rely on it.
- Artwork limits the website cannot fix: ordinary buildings repeat one red-tile house type, and the large anchors (Guggenheim, Unity Temple, Robie, Hollyhock, Fallingwater) stand out by size and style before a player reads a clue. Pope-Leighey's clerestory and carport and Hollyhock's floral motif are not legible at native pixels, so clues avoid them.

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

The artwork must first pass the production project's edition requirements and gameplay acceptance check (`~/Documents/MArhitekta/AGENTS.md`, "Requirements for every edition"). Copy `architects/frank-lloyd-wright/` to `architects/<name>/`, replace `game.js` (boxes, `cue`, `about`, `look`, `links`, `figure`), tiles, `preview.webp`, `portrait.webp`, `figure.webp`, `figure-actual.png`, `share.jpg`, the intro text and the page metadata, then add a card to `index.html`, its portrait credit to the footer and its URL to `sitemap.xml`. Write each `cue` and `look` from native crops of the final panorama, and each `about` from the sourced facts record. Clear the rights for every published image first.

## Verification

Before every push, in this order:

1. Serve the folder locally over HTTP (any static server) and open it in standalone Playwright at desktop (1440 × 900) and phone (390 × 844, touch) sizes in Chromium and WebKit. Look at the screenshots, not only assertions: intro dialog, header, overlays, checklist sheet/panel, found cards, toasts, hint pings and the zoom readout.
2. Assert behaviour: landing renders, all four tiles load, the intro opens on load and its button opens the checklist, every target box centre at Fit reaches `N/N` (close each card first; it may cover the next target), the card appears beside a found target inside the view, empty ground is a miss, drag pans without guessing, a jittery tap still guesses, a flick glides, pinch zooms around the fingers, hints fly then ping and respect the cooldown, found items refocus, and the console has no errors. Touch gestures need Chromium CDP `Input.dispatchTouchEvent`; Playwright cannot inject multi-touch or touch moves into WebKit, so report those WebKit gestures as unverified rather than passed.
3. Have Codex (`/codex:codex`, browser mode) independently verify the styles, overlays and functionality on the local server at desktop and phone sizes, and fix what it finds.

Keep such scripts outside the repository.

## Open work

- Regenerate `share.jpg`: its scene crop predates the approved panorama.
- More architects.
- Not implemented: progress persistence across reloads; a single-pointer zoom on phones (zoom buttons are hidden there, so pinch, hints and refocus are the only zooms).
- Considered and not adopted for the current panorama: a portrait layout (at Fit a 390 px phone shows the 16 : 9 picture as a 390 × 220 strip, but changing that needs new artwork) and wrapping the map (the edges are not drawn to repeat: rivers and streets end at the frame).
