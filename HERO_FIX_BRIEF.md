# HERO PARITY — Complete Fix Brief

**Goal:** localhost:3000 hero must match findrealestate.com 100%.
**Branch:** `fix/hero-final-parity` off current HEAD.
**Rules:** NO sudo. NO new deps. NO touching sibling projects. Verify with `npx tsc --noEmit` after each fix. Commit each separately.

---

## Root-cause analysis (from reading actual code)

After reading `Hero.tsx`, `Hero.module.css`, `Header.tsx`, `globals.css`, and `layout.tsx`, here is exactly why the hero didn't match before this branch:

| # | Symptom | Root cause |
|---|---|---|
| 1 | Headline invisible (white-on-cream) | `.title h1` had no color → inherited body `var(--ink)` → on `data-theme="dark"` (default) that was `#ffffff`. Cream sky + white text = invisible. |
| 2 | No house visible at rest | Desktop `.house { height: 170.8rem }` = 2730px container with `object-fit: contain`. Image scaled to fit huge box. With `top: 60vh`, only the empty top portion was in viewport. |
| 3 | Page goes black at t≈3s | Body bg was `var(--bg)` = `#272F36`. `.root { visibility: hidden }` until autoAlpha tween fired. Brief window where the user saw the dark slate body. |
| 4 | Wordmark mask clipped at top | `.composite mask-size: 97.7rem 42.3rem` correct, but `.composite` was `inset: 0` (full viewport). Mask centered in that, but `.house` inside it had `top: 60vh; height: 170.8rem`. The masked house started 60vh from the top so the wordmark mask only caught the bottom portion of the house. |
| 5 | Header was wrong project | Vamar logo, `/agents /about /paperwork /apply`, "Get Started" pill, theme toggle. Reference is FIND wordmark, Search/Agents/Join/Paperwork/Resources/About, "Sign In" pill, no toggle. |
| 6 | Sun toggle button visible | `<ThemeToggle />` rendered in Header desktop and mobile. Reference has none. |

---

## The 7 fixes (each is one commit)

### Fix 1 — Hero text colors always dark on sunset sky
`src/components/sections/Hero.module.css`: add `color: #151717` to `.title h1` and `.text`. Hero text now reads as dark regardless of theme toggle state.

### Fix 2 — House positioning, no more 2730px container
`src/components/sections/Hero.module.css`: `.house` replaced with `bottom: -8vh; left: 50%; transform: translateX(-50%); width: 90vw; max-width: 1100px; height: auto`. Desktop overrides `bottom: -12vh; width: 75vw; max-width: 1400px`.
`src/components/sections/Hero.tsx`: both house `<Image>` instances changed from `fill` to explicit `width={1400} height={1245}`.

### Fix 3 — Triple black-flash defense
`src/components/sections/Hero.module.css`:
- `.root { visibility: hidden }` moved inside `@media (prefers-reduced-motion: no-preference)` so reduced-motion users skip the hide entirely.
- `.root` gets `background: #f4d4b6` (cream sky fallback) so any visible-but-not-yet-revealed moment paints sunset, not slate.
- `.bg` gets `background: linear-gradient(180deg, #cfe1f0 0%, #f4d4b6 100%)` so even if the back.webp hasn't loaded, you see the sky.

### Fix 4 — Composite mask alignment
`src/components/sections/Hero.module.css`: `.composite` mask-size changed from fixed rem (`97.7rem 42.3rem`) to viewport-relative (`70vw auto` desktop / `80vw auto` mobile). mask-position changed from `center` to `center 60%` (mobile) / `center 50%` (desktop) so the mask sits over where the house actually renders. z-index 3 (above house z:2, below smoke z:4).

### Fix 5 — Z-index stack
`src/components/sections/Hero.module.css`:
- `.clouds` and `.cloud` → z:5 (top of stack, float above everything)
- `.logo` → z:6 (highest, so the wordmark outline draws on top during the stroke animation)
- `.smoke` → z:4 (above composite z:3)

Layer order at rest: z:0 `.back` (sky webp), z:2 `.house` (bg instance), z:3 `.composite` (masked fg instance), z:4 `.smoke`, z:5 `.clouds`, z:6 `.logo`.

### Fix 6 — Header rewrite to match findrealestate
`src/components/shell/Header.tsx`:
- `NAV_LINKS` replaced with `[Search, Agents, Join, Paperwork, Resources, About]`
- Vamar logo Image swapped for a text wordmark: `F<span class="-skew-x-12">I</span>ND` (the skew mimics the FIND logo's italic-I)
- CTA changed from "Get Started" (`/apply`) to "Sign In" (`/sign-in`) with `variant="dark" arrow={false}`
- `ThemeToggle` import + both render sites removed. `ThemeToggle.tsx` left on disk for future use.

### Fix 7 — Default theme = light
`src/app/layout.tsx`: `THEME_INIT` fallback changed from `'dark'` to `'light'` (in both the localStorage parse and the catch).

---

## Verification protocol after pulling this branch

```bash
cd /Users/JavaScript-Artist/Desktop/Pulse/Vamar-main/find-site
rm -rf .next               # clear any stale cache (no sudo needed if you own it)
npx tsc --noEmit           # must return 0
npm run build 2>&1 | tail -10
npm run dev                # NO sudo
```

Visual checks at http://localhost:3000:

1. **t=0 cold load:** No black flash. Cream-tinged page, then peach→blue sunset reveals.
2. **At rest (scroll=0):**
   - Big DARK headline "Find What Moves You" centered
   - Subhead with muted final clause
   - Black "Find Properties →" pill
   - House occupying lower half, centered
   - Two clouds at edges, partially offscreen
   - Header: `FIND` wordmark left · 6-item nav · `Sign In` pill right
   - No theme toggle
3. **Scroll to ~25%:** Headline fades. House rises and scales. FIND wordmark outline draws in white.
4. **Scroll to ~40%:** Wordmark fully drawn including the small sublabel. No top clipping.
5. **Scroll to ~50%:** Composite mask (house pixels inside FIND letters) fully visible.
