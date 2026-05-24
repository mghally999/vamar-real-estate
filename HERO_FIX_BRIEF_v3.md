# HERO PARITY v3 — FINAL. All blocks applied.

**Branch:** `fix/hero-v3-complete` off `fix/hero-content-visibility` (`2c1a820`).
**Single commit:** `ea09fbf fix(hero): v3 — full Hero CSS rewrite + Vamar. brand + light theme`.

---

## What was broken (from user's recording)

| Issue | Cause |
|---|---|
| 🔴 House filled entire viewport, covering header nav | `Hero.module.css .house { height: 170.8rem }` — original CSS port that never got rewritten in v1/v2. |
| 🔴 Smoke covered half the screen | `.smoke { height: 62rem }` (= 992px) — same port. |
| 🟡 Headline visible but transparent-looking behind house | Content z-index = 1, house z-index = 1 → house won paint order. |
| 🔴 Brand said "FIND" | Header wordmark was a stylized FIND from v1 brief; user wants Vamar. |
| ✅ Header structure (6-item nav + Sign In, no theme toggle) | Landed in v1. |
| ✅ Text + CTA finally rendered | Landed in v2 (intro `.fromTo()` conversion). |

---

## The 7 blocks (all in single commit `ea09fbf`)

### Block 1 — `Hero.module.css` full rewrite
- `.house` sized `60vw / 50vw` desktop, `max-width: 56rem / 72rem`, `bottom: -6vh / -8vh`.
  (Was `height: 170.8rem` = 2730px — caused house to fill the whole viewport.)
- `.smoke` `12rem / 18rem` desktop. (Was `62rem` — covered the CTA.)
- `.composite` mask-size `80vw / 65vw auto`, position `center 55% / center 50%`.
- `.clouds` width `45vw / 40vw` mobile, `38vw / 32vw` desktop. Positioned with `vh / vw` offsets.
- `.content` `z-index: 10`, `display: grid place-items: center`, `padding: 0 2rem`.
- `.title h1` + `.text` hardcoded `color: #151717` so they don't follow theme.
- `.bg` gets sunset gradient fallback. `.root` gets cream `#f4d4b6` fallback.
- `visibility: hidden` only inside `@media (prefers-reduced-motion: no-preference)`.

### Block 2 — `Hero.tsx` Image dimensions refined
- House `sizes` updated from `80vw / 1100px` → `70vw / 900px` (matches v3 brief).
- Cloud `sizes` updated from `50vw` → `40vw` left / `35vw` right.
- All explicit dimensions already in place from v2 (back 1920×1080, house 1400×1245, cloud 768×326, smoke 768×248).

### Block 3 — Header brand: FIND → Vamar.
```tsx
<span className="font-bold tracking-tight text-2xl sm:text-3xl text-[var(--ink)]">
  Vamar<span className="text-[var(--ink-soft)]">.</span>
</span>
```
`aria-label` changed to "Vamar Real Estate — Home".

### Block 4 — Hero copy: no changes
Headline "Find What Moves You", subhead, and CTA "Find Properties" stay
— they're generic real-estate phrases that work for Vamar.

### Block 5 — layout.tsx default theme = `'light'`
Already in place from v1 commit `ff0e7eb` (verified by grep: 2 occurrences).

### Block 6 — Intro tween `.fromTo()`
Already in place from v2 commit `e74cd5f` (verified by grep: 8 occurrences).

### Block 7 — Grep verification (all pass)

| Check | Required | Actual |
|---|---|---|
| `color: #151717` in Hero.module.css | ≥2 | 2 ✓ |
| `max-width: 56rem` in Hero.module.css | ≥1 | 1 ✓ |
| `width={1400}` in Hero.tsx | 2 | 2 ✓ |
| `width={768}` in Hero.tsx | 4 | 4 ✓ |
| `Vamar<span` in Header.tsx | ≥1 | 1 ✓ |
| `'light'` in layout.tsx | ≥1 | 2 ✓ |
| `intro.fromTo` in Hero.tsx | ≥6 | 8 ✓ |

`npx tsc --noEmit`: zero errors.

---

## Expected visual at scroll=0 after this lands

1. Cream → peach sunset sky filling the full first viewport.
2. Header: **Vamar.** wordmark left · Search/Agents/Join/Paperwork/Resources/About center · Sign In pill right.
3. Big DARK "Find What Moves You" centered headline (no longer transparent).
4. Subhead "Expert agents. Real guidance." + muted "A clear path to find what's next."
5. Black "Find Properties →" pill.
6. House occupying lower 40% of viewport — centered, NOT covering the headline or nav.
7. Two clouds at upper edges, partially offscreen.
8. Subtle smoke wisp at the very bottom edge (thin, not a half-screen blanket).

Then scroll: headline fades, house rises + scales, wordmark draws, composite emerges.
