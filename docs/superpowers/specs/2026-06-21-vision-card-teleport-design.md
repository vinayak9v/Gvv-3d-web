# Vision Cards — Sci-Fi Glitch "Teleport" Effect

**Date:** 2026-06-21
**Scope:** `src/components/landing/VisionCards.tsx` + glitch keyframes in
`src/app/globals.css`. No new dependencies (reuses GSAP already imported).

## Goal

Replace the home page's 3 vision cards' current **mouse-follow 3D rotational
tilt** (and the black-hole click suck-in) with a **sci-fi glitch "teleport"**
effect, triggered on **hover and click**.

## What is removed

- The `onComplete` mousemove tilt handlers that drive `rotationX`/`rotationY`
  (`quickTo`) per card — the "rotational effect".
- The `handleCardClick` black-hole timeline (scale→0, `rotationZ:1080`, blur).

## Behaviour

### Hover (mouseenter → glitch-in burst, then calm)
- On `mouseenter`, add an `.is-glitching` class for ~0.4s: a CSS glitch burst —
  horizontal slice displacement (`clip-path` insets jumping between a few steps),
  small X jitter, and RGB channel-split via stacked cyan/magenta `drop-shadow`
  filters.
- After the burst, it settles into the **existing** calm hover state already in
  the markup (the `-translate-y-2` lift, blue glow, and the sliding shutter
  panels) — those Tailwind `group-hover` styles stay untouched.
- On `mouseleave`, remove `.is-glitching`; card returns cleanly.

### Click (glitch-out teleport → navigate)
- `e.preventDefault()`, then a GSAP timeline on the clicked card (~0.6s):
  widening RGB split + heavier slice tearing + opacity flicker, ending in a quick
  blink to invisible (scale/opacity collapse with a brief white flash).
- The other two cards simultaneously do a faint glitch-fade (opacity↓, slight
  blur, small scale-down).
- `onComplete` → `router.push(href)`.

## Implementation

- **CSS `@keyframes`** in `globals.css` for the repeating glitch slices/jitter
  (`gvv-glitch-slice`, `gvv-glitch-rgb`), applied via an `.is-glitching` /
  `.is-teleporting` class. Keeps the per-frame glitch off the JS thread.
- **GSAP** orchestrates: the hover class toggles, and the click-out timeline +
  the `router.push` callback + the sibling-cards fade. Reuses the already-imported
  `gsap` / `useGSAP`.
- RGB split uses stacked `drop-shadow(cyan)` / `drop-shadow(magenta)` filters
  rather than DOM clones — lightweight, works over the card's image + text.

## Alternatives considered (rejected)

- Pure-CSS-only: simpler, but sequencing click→navigate is clumsy without GSAP.
- DOM-clone chromatic aberration: truer RGB split but heavy/janky on an image card.

## Verification

- `node tools/caplan.mjs http://localhost:3000/` for the resting cards.
- A small Playwright harness to hover a card (assert `.is-glitching` toggles) and
  click one (assert navigation to its `href`). Screenshot mid-glitch.
