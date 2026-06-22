# Task 4: Whole-card click on home `VisionCards` — Report

## Status: DONE

## Changes made

File: `src/components/landing/VisionCards.tsx`

1. Added `onClick={(e) => handleCardClick(e, card.href, card.id)}` to the inner card `<div className="group flex flex-col items-center ...">` (the one carrying `cursor-pointer`), so the whole card area is clickable.
2. Removed `onClick={(e) => handleCardClick(e, card.href, card.id)}` from the `<button>` ("Discover") and added `type="button"`. The button's click now bubbles up to the card `div`, avoiding a double-trigger of the black-hole animation. All existing button classes and the "Discover" text were preserved unchanged.
3. `handleCardClick`, the black-hole GSAP animation, and everything else in the file were left untouched.

## Verification

Ran:
```
cd "C:/Users/Administrator/Documents/Vinayak/Gvv-website--main" && node tools/caplan.mjs http://localhost:3000
```

Result: `DONE`. Console output contained only benign warnings (React DevTools suggestion, `THREE.Clock`/`THREE.WebGLShadowMap` deprecation notices, and a couple of harmless WebGL shader precision warnings). No `PAGEERR` and no `REQFAIL` lines were printed.

Read the produced `lan-full.png`: the homepage hero (3D floating island model, "SHAPING THINKERS, BUILDING INNOVATERS" banner) renders correctly with no visual breakage. The three vision cards (Academic / Robotics / Co-curricular) are positioned below the hero/fold and are not captured by this screenshot (caplan captures the initial viewport without scrolling), consistent with the task's own note that "cards are below the hero — scroll isn't captured." Since the structural change is purely the click-handler wiring (no markup/layout change), and the page compiled and loaded with zero console errors, this satisfies the verification bar set by the plan (no PAGEERR, page compiles).

## Concerns

- None functionally. The screenshot does not visually show the cards themselves (they're below the fold), but this matches the plan's own caveat in Task 4 Step 3 ("scroll isn't captured... confirm no page errors and that the page compiles"), which was confirmed.
- Manual/browser click-test of the cards was not performed (would require scrolling + interacting in a live browser, outside caplan's single-screenshot capability), but the code change is a minimal, mechanical JSX edit that matches the plan's verbatim snippets exactly.
