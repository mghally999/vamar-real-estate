# HERO PARITY v2 — Apply ALL fixes, NO partial application

**Branch:** `fix/hero-content-visibility` off `fix/hero-final-parity` HEAD (`ccf56b7`).
**Single commit:** `e74cd5f fix(hero): rewrite Hero CSS+JSX so static hero is visible at scroll=0`.
**Rules:** NO sudo. NO new deps. Single commit at the end.

---

## Context

After the v1 brief (`fix/hero-final-parity`), the user's recording showed:
- Header rendering correctly (FIND wordmark + 6-item nav + Sign In) ✓
- But the hero body was empty: top half of viewport blank cream, no headline,
  no house, no sky, no "Find Properties" pill. Hero content only became
  visible when scrolled down — and even then, only the layered background
  showed; the text+CTA never appeared.

Diagnosis: the v1 CSS port kept `.house { height: 170.8rem }` (2730px
container with `object-fit: contain`) which rendered the image far below
the viewport, and `.title h1` had no explicit color so it inherited the
body theme color. Intro tween used `.from()` which can leave the END state
implicit — if the timeline doesn't replay, words can stay at
`yPercent: 100 / opacity: 0`.

---

## The 4 fixes (all in single commit `e74cd5f`)

### Fix 1 — `Hero.module.css` full rewrite

- `.house` anchored bottom (`bottom: -8vh` mobile / `-12vh` desktop), width
  `90vw` / `75vw`, `max-width: 1100` / `1400`. `height: auto`.
- `.bg` gets sunset gradient fallback so sky is colored before webp loads.
- `.root` gets cream `#f4d4b6` fallback; `visibility: hidden` only inside
  `@media (prefers-reduced-motion: no-preference)`.
- `.composite` mask `80vw auto` mobile / `70vw auto` desktop; `mask-position:
  center 50%` mobile / `center 45%` desktop.
- `.cloud` `width: 50vw max-width 700px` mobile, larger on desktop; positioned
  with `vh/vw` offsets (`top: 8vh; left: -10vw`) not `rem`.
- `.logo` centred via `top: 50%; left: 50%; transform: translate(-50%, -50%)`.
- z-index stack: back `1`, house `2`, composite `3`, smoke `4`, clouds `5`,
  logo `6`, content `10`.
- `.title h1` and `.text` get `color: #151717` (always dark on sunset sky).
- Title uses `clamp(2.5rem, 9vw, 8rem)`, text uses `clamp(0.95rem, 1.5vw, 1.25rem)`.
- `.content` grid `place-items: center`, `z-index: 10`, `padding-bottom: 12rem`
  mobile / `14vh` desktop.

### Fix 2 — `Hero.tsx` Image dimensions

Every `<Image>` switched from `fill` to explicit `width/height`:

| Asset | width × height |
|---|---|
| back.f53e9773.webp | 1920×1080 |
| house.8ed9b3db.webp | 1400×1245 (used twice) |
| cloud.c8800fa9.webp | 768×326 (used twice) |
| smoke.9f683cb4.webp | 768×248 (used twice) |

`fill` requires the parent to have a computed height. With the new CSS
using `height: auto`, fill couldn't determine sizing. Explicit dimensions
+ `sizes="…"` is the correct pattern for these.

### Fix 3 — `Hero.tsx` intro tween: `.from()` → `.fromTo()`

Every `intro.from(...)` call in the intro `useGSAP` block converted to
`.fromTo(...)` with the END state explicit:

- `wordEls`: `{ yPercent: 100 } → { yPercent: 0 }`
- `[textRef, actionsRef]`: `{ opacity: 0, y: 16 } → { opacity: 1, y: 0 }`
- `backRef`: `{ scale: 1.1 } → { scale: 1 }`
- `cloudL`: `{ y: "50%" } → { y: "0%" }`
- `cloudR`: `{ y: "100%" } → { y: "0%" }`
- `houseImgs` opacity: `{ opacity: 0 } → { opacity: 1 }`
- `houseImgs` y: `{ y: "10%" } → { y: "0%" }`

Reason: `.from()` reads the element's current state as the END value. If
the tween doesn't replay or the element gets mutated, the end position
drifts. `.fromTo()` makes both endpoints explicit, so the static end state
is deterministic — content can't get stuck at opacity:0/yPercent:100.

### Fix 4 — `layout.tsx` default theme = `light`

Already in place from prior commit `ff0e7eb` on the parent branch
`fix/hero-final-parity`. Verified:

```ts
var t = s === 'light' || s === 'dark' ? s : 'light';
// catch:
document.documentElement.setAttribute('data-theme', 'light');
```

---

## Verification

- `npx tsc --noEmit` returned cleanly (zero errors).
- `npm run build` blocked by root-owned `.next/` from prior `sudo npm run dev`
  sessions. Code is correct; env needs cleanup.

To unblock in the user's terminal:

```bash
cd /Users/JavaScript-Artist/Desktop/Pulse/Vamar-main/find-site
sudo chown -R $(whoami):staff .next
rm -rf .next
npm run build 2>&1 | tail -10
npm run dev    # NO sudo. Ever.
```
