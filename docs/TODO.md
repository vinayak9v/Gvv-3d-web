# GVV Website — TODO

Actionable checklist. See [`PROGRESS.md`](./PROGRESS.md) for context and
[`FIXLOG.md`](./FIXLOG.md) for resolved bugs. Check items off as completed.

---

## ✅ Done (2026-06-18 → 06-19)
- [x] Thruster exhaust flames match the reference render (`SchoolModelBanner.tsx`)
- [x] Model floats beneath the cloud layer (was clipping into clouds)
- [x] `/academic` scroll shortened (`ScrollControls pages 6 → 2`)
- [x] Hand cursor on home-page "Discover" buttons (`VisionCards.tsx`)
- [x] Warmer school textures/lighting (exposure `0.85 → 1.05`)
- [x] LAN / remote blank 3D + dead clicks fixed (`allowedDevOrigins`)
- [x] `prisma.config.ts` build type error (removed invalid `datasource`)

---

## 🆕 New batch — logged 2026-06-22 (polish round: mobile model quality, journey blank, footer, drag button, robot eyes) — DONE 2026-06-22

> ✅ **All 5 done 2026-06-22.** See FIXLOG (2026-06-22 "polish round" entry).

- [x] **School model quality poor on phone.** (2026-06-22) Restored antialias +
      `dpr [1,2]` AND the HDR `<Environment>` on mobile (the flat, env-less look was
      the "poor quality"). Put the HDR in its OWN `<Suspense fallback={null}>` so its
      CDN fetch no longer freezes the model on the spinner. Only shadows stay
      desktop-only. Verified on device-class viewport: rich/lit, paints fast.
      (`SchoolModelBanner.tsx`)
- [x] **"Our Journey" blank on phone until 4-5 scrolls.** (2026-06-22) GSAP
      ScrollTrigger reveal was thrown off by the 300%-pinned robot ScrubVideo above.
      Switched the card reveal to a plain `IntersectionObserver` (pin-independent) →
      cards appear the instant the grid enters. Progress bar keeps its GSAP scrub.
      Verified first-card opacity = 1 on scroll-in. (`Madok.tsx`)
- [x] **Footer stacked vertically on mobile.** (2026-06-22) Base grid `grid-cols-1`
      → `grid-cols-2` (4-across is too tight at 390px) so columns sit side-by-side
      like PC. (`Footer.tsx`)
- [x] **Drag button not visible on load (PC + mobile).** (2026-06-22) Removed the
      wavy SVG separator, tightened section heights (`h-[380px]…lg:h-[680px]`) and
      button margins (`mt-6→mt-3`), pulled the canvas down (`bottom-12→bottom-4`).
      Handle + "Drag To View" now sit in the first viewport. (`SchoolModelBanner.tsx`)
- [x] **Academic robot "no eyes / wrong robot".** (2026-06-22) NOT a wrong model —
      same animated `robot.glb`. Its `eyes` material ships `emissiveFactor=[1,1,1]`,
      blowing the eyes to solid white ovals and hiding the colored/pupilled eye
      texture (same Blender emissive blowout as the school model). Added
      `dimEmissiveMaterials={['eyes']}` to the robot `<Character>` → real blue eyes
      back, animations (idle/talk/wave) preserved. (`Character.tsx`, `AcademicScene.tsx`)
      NOTE: did NOT swap to `final_robot.glb` — it has 0 animation clips (would
      freeze the conversation scene).

---

## 🆕 New batch — logged 2026-06-21 18:0x (journey lag + REAL model on phone + robot scrub regression) — DONE 2026-06-22

> ✅ **All 3 done 2026-06-22.** See FIXLOG (2026-06-22 entry) for details.

- [x] **"Our Journey" (Madok) — too much animation delay on scroll.** (2026-06-22)
      `scrub: 1`→`0.2`, range `top 86%`→`top 30%` shortened to `top 82%`→`top 58%`,
      stagger each `0.16`→`0.07`, dur `0.28`→`0.18`. Reveal now tracks the scroll.
      (`src/components/landing/Madok.tsx`)
- [x] **REVERSAL — phone shows the REAL 3D model + drag, like PC.** (2026-06-22)
      Removed the poster fallback; Canvas mounts on every device. `isDesktop` now
      only picks render QUALITY: mobile = dpr 1, shadows off, `low-power`, no
      `<Environment>` HDR (skips the HDR fetch + PMREM target that was the real
      mobile memory hog — the crash persisted with the poster, so the GLB wasn't
      the sole cause). Added direct touch/pointer drag (`touch-action: pan-y` so
      vertical still scrolls). Verified on 390×844: real model + flames paint, no
      context loss, horizontal swipe yaws it, no page errors. (`SchoolModelBanner.tsx`)
- [x] **Robot scrub on home — pin geometry hardened.** (2026-06-22) The reported
      break didn't reproduce (ping-pong scrub works on desktop & mobile in probes —
      `ScrollRefresh` already refreshes globally). Hardened `ScrubVideo` against the
      `-mt` sibling layout shift anyway: `invalidateOnRefresh: true` + `anticipatePin: 1`.
      (`src/components/shared/ScrubVideo.jsx`)

> User feedback after the 17:23 batch. Critical: mobile crash.

- [~] **CRITICAL — site crashes on mobile / responsive due to the 3D model
      load.** SUPERSEDED → the poster approach is being **REVERTED** (see 18:0x
      "REVERSAL"). I implemented a static poster on phones (`public/school-poster.png`,
      Canvas mounted only ≥768px, GLB preload guarded → 0 GLB on mobile, verified).
      BUT the user then said the crash STILL happens on phone even with the poster,
      and they want the REAL model + drag on phone. So: undo the poster gating and
      fix the real crash. (`SchoolModelBanner.tsx`)
- [x] **PC — model still cuts a little at the clouds (top) and left/right.**
      (2026-06-21) Pulled the camera back (`position z 5.8 → 6.6`) for uniform
      margin so a full yaw spin no longer clips the frame or the clouds. Verified
      via `_draghandle.mjs`. (`SchoolModelBanner.tsx`)
- [x] **Dragging takes too much effort — sensitivity too LOW.** (2026-06-21)
      Increased the drag multipliers (yaw `0.015→0.026`, pitch `0.01→0.018`) so a
      small drag turns the model more. (`SchoolModelBanner.tsx`)
- [x] **Teleport effect can't be seen on phone.** (2026-06-21) Made the tap
      self-contained: `handleCardClick` re-arms `.is-charging` (streak sweep) +
      `.is-phasing` so a single tap shows the full light-streak teleport before
      navigating. Verified on a 390×844 touch viewport (streak visible, navigates).
      (`VisionCards.tsx`, `globals.css`)
- [~] **Robot scrub video "not loading" on mobile** → was diagnosed as collateral
      of the model crash (crash killed the whole page). SUPERSEDED by the 18:0x
      "robot scrub broken" item. NOTE: automated scrub tests (`_robotview.mjs`)
      show currentTime DOES advance on both mobile (0→6.76→0.68) and desktop
      (1.22→7.78→5.74→0.05) with frames assembling/exploding — so the scrub
      mechanically works in tests; the user's "broken" needs reproducing.

> Section height was later reduced to `h-[450px] sm:h-[580px] md:h-[680px]
> lg:h-[760px]` (the `lg:h-[900px]` pushed the model below the fold on load).

---

## 🆕 New batch — logged 2026-06-21 17:23 (model tweaks + better teleport + robot text)

> Follow-up after the 17:01 batch. User feedback on the results.

- [x] **Home model — clamp the vertical-flip ("z") axis; stop the school
      tumbling bottom-to-top.** (2026-06-21) Restored the pitch clamp on
      `rotation.x` (`ROT_X_MIN/MAX = -0.85/-0.15`) so the school can't flip over;
      yaw (`rotation.y`) left free for a full horizontal spin. Verified the school
      stays "on top" on all drags. (`src/components/landing/SchoolModelBanner.tsx`)
- [x] **Home model — too small / not viewable up close; fix cloud + section
      spacing.** (2026-06-21) Since pitch is clamped, the only 360° turn is yaw, so
      re-fit to the **horizontal span** (`scale = 7.6 / hypot(size.x, size.z)`) →
      model is large/up-close again while a full horizontal spin still stays
      in-frame. Bumped section height (`h-[520px] sm:h-[680px] md:h-[800px]
      lg:h-[900px]`) for cloud clearance. Verified model is large, visible on load
      (800/950px viewports), and clears the clouds on rotation. (`SchoolModelBanner.tsx`)
- [x] **Home vision cards — replace the glitch with a PROPER teleport
      ("Light-streak phase").** (2026-06-21) Removed the glitch slice/RGB keyframes.
      **Hover** = cyan energize glow + a single light-streak sweep (`.is-charging`),
      settling to the calm state. **Click** = GSAP compresses the card to a thin
      bright horizontal line of light + white flash, then the streak expands
      sideways and vanishes (`.is-phasing`), siblings fade → `router.push`.
      Verified (hover/teleport classes fire; click → `/robotics`). See FIXLOG.
      (`VisionCards.tsx`, `src/app/globals.css`)
- [x] **Robot section — remove the "MECHANICS IN MOTION" text overlay.**
      (2026-06-21) Dropped the `title`/`subtitle` props on the robot
      `<ScrubVideo>`; the component renders no overlay when both are absent.
      (`GarimaImpact.tsx`)
- [x] **Garima Impact — transparent top now overlaps the section above.**
      (2026-06-21) Added `-mt-20 md:-mt-32` + `z-20` to the `Group 9.png` section so
      its torn-paper transparent top overlaps the VisionCards section — you see the
      cards through the rip instead of a flat dark band mixing at the seam. Verified
      the overlap reads cleanly with the Discover buttons clear of the tear.
      (`GarimaImpact.tsx`)

---

## 🆕 New batch — logged 2026-06-21 17:01 (home model bounds + card teleport)

> Reported by user after a power loss interrupted these mid-change. Resume here.

- [x] **Home — 3D school model goes out of bounds / gets cut when dragging, and
      drags up into the clouds.** (2026-06-21) Per user: do NOT clamp — keep free
      rotation on all axes. Removed the in-progress clamps; re-fit the model by its
      bounding-sphere **diagonal** (`scale = 6.6 / size.length()`) so the rotated
      footprint fits the canvas with margin → a full free spin never clips the
      frame and it floats clear below the clouds. Verified on all axes via
      `tools/_draghandle.mjs` + `caplan.mjs`. See FIXLOG.
      (`src/components/landing/SchoolModelBanner.tsx`)
- [x] **Home — replace the card hover ROTATIONAL tilt with a TELEPORTATION
      effect** on all 3 vision cards. (2026-06-21) Design (brainstorm, spec
      `docs/superpowers/specs/2026-06-21-vision-card-teleport-design.md`):
      sci-fi glitch, hover + click. Removed the mousemove `rotationX/Y` tilt and
      the black-hole click suck-in. **Hover** → 0.4s glitch burst (clip-path
      slice tear + cyan/magenta RGB drop-shadow split + jitter) settling to the
      existing calm lift/glow. **Click** → stronger glitch-out + flicker + white
      flash + blink-to-invisible, siblings glitch-fade, then `router.push`. CSS
      keyframes (`globals.css`: `gvv-glitch-slice/-rgb`) toggled by
      `.is-glitching`/`.is-teleporting`; GSAP drives the click timeline + nav.
      Verified via `tools/_cards.mjs` (hover/teleport classes fire; click → URL
      `/robotics`). See FIXLOG. (`VisionCards.tsx`, `src/app/globals.css`)

---

## 🆕 New batch — logged 2026-06-21 16:09 (content restructure + responsive) — DONE

> Reported by user. Confirmed routing: robot video → **home only**; lab video →
> **/robotics**; co-curricular → **blank**.

- [x] **Home — exhaust flames longer + more contrasted hue.** (2026-06-21)
      `ELONGATE` 3.5→5.5, softer axial falloff (`pow(1-a,0.55)`), deeper saturated
      cyan + sharper hot-core→cyan transition. Verified.
      (`src/components/landing/SchoolModelBanner.tsx`)
- [x] **Home — embed robot-disassembly video section** above "Innovation At
      Garima" (in `GarimaImpact.tsx`). (2026-06-21) Moved here from /robotics.
      **NOTE:** `robot_assembly.webm` only contains assemble→explode (it ends
      exploded — no reassembly frames), so a plain forward scrub never rebuilt.
      Used **ping-pong** scrub (forward to explosion at mid-scroll, reverse to
      assembled at the bottom) → scroll-down reads disassemble→reassemble.
      Verified via currentTime triangle-wave + frames. (`GarimaImpact.tsx`,
      `src/components/shared/ScrubVideo.jsx`)
- [x] **Home — remove the Contact Us section** completely. (2026-06-21)
      (`src/app/page.tsx`)
- [x] **/robotics — replaced robot video with the lab fly-through** (moved from
      /co-curricular), scroll-scrubbed via shared `ScrubVideo`. (2026-06-21)
      (`src/app/robotics/page.js`)
- [x] **/robotics — portrait/responsive fill.** (2026-06-21) Hero → `min-h-[100svh]`;
      lab section is `100svh` + `object-cover`. Verified at 390×844.
- [x] **/co-curricular — blank page with generic demo text** (navbar kept).
      (2026-06-21) (`src/app/co-curricular/page.js`)
- [x] **/academic — fixed model not loading on responsive/mobile.** (2026-06-21)
      Characters were hard-placed at x=±80; on narrow aspect they fell outside the
      horizontal frustum. Made separation aspect-responsive
      (`sep = clamp(60·aspect, 32, 80)`). Verified at 390×844.
      (`src/components/scene/AcademicScene.tsx`)
- [x] **/academic — centered the model/characters.** (2026-06-21) Camera stays at
      x=0 between the two responsive-spaced characters; section → `h-[100svh]`.
- [x] **Global — 3D models fill the screen in responsive mode.** (2026-06-21)
      School model (home), lab + robot videos (`100svh`/cover), academic characters
      — all verified filling portrait.

---

## 🆕 New batch — logged 2026-06-20 11:32 (to continue later)

> Reported by user; most prior tasks already done. These are the open items.

- [x] **`/academic` conversation animation lost.** (Fixed 2026-06-21) Root cause:
      `PageShell` wrapped content in `overflow-hidden`, which broke the scene's
      `position: sticky` pin — the scene scrolled off before any dialogue stage
      was reached. Changed to `overflow-x-clip` (clips horizontal, preserves
      sticky). Conversation + character anims verified at 0/50/75/100% scroll.
      (`src/components/landing/PageShell.tsx`) — see FIXLOG.
- [x] **Navbar missing on card-link pages.** (Fixed 2026-06-21) Added an
      absolute-positioned `<Navbar />` overlay at the top of `/robotics` and
      `/co-curricular` (kept them out of `PageShell` so the full-bleed pinned
      video sections are untouched). Verified on both pages.
      (`robotics/page.js`, `co-curricular/page.js`)
- [x] **`/co-curricular` goes blank on first-load scroll.** (Fixed 2026-06-21)
      Root cause: the `pin:true` ScrollTrigger was created asynchronously, gated
      on `loadedmetadata`, which raced with layout on cold loads → mis-measured
      pin geometry left the black pinned section covering the page until reload.
      Now created immediately + `ScrollTrigger.refresh()` after metadata + first
      frame painted. (`co-curricular/page.js`, `robotics/page.js`) — see FIXLOG.
- [x] **Scroll-up loses the scrub effect; make smoother.** (Fixed 2026-06-21)
      Drive `currentTime` from the eased `self.progress` and skip seeks while one
      is in flight (`!video.seeking` + 0.02s threshold) so fast scroll-ups don't
      flood the decoder. Verified scrub is smooth both directions.
      (`co-curricular/page.js`, `robotics/page.js`)

---

## 🔜 In progress / remaining

> Task #1 was re-scoped in the 2026-06-20 brainstorm into a 5-part plan
> (`docs/superpowers/plans/2026-06-20-task1-3d-integration.md`). The lab is a
> **pre-rendered scroll-scrubbed fly-through video**, not a GLB (the 2.4GB /
> 15.3M-tri scene is too heavy for real-time; its camera is on rails).

### 1. 3D integration & scroll fixes (re-scoped)
- [x] Robot showcase on `/robotics` (r3f `RobotShowcase`, scroll-rotated; `vid.webm` gone)
      — fixed an invisible-robot bug (sub-mm scale + `Environment` HDR CDN 301 blocking
      Suspense), then switched the model from the broken `final_robot.glb` (eyes rigged
      onto the chest) to **`robot.glb`** (GVV-branded, eyes on face). Framed + rotation
      verified. See `FIXLOG.md`.
- [x] Whole-card click on home `VisionCards`
- [x] `/academic` → browser scroll (dropped drei `ScrollControls`) + model centred
- [x] `/co-curricular` page rewritten as scroll-scrubbed `<video src="/lab.webm">` (code)
- [x] **Rendered `public/lab.webm`** — Blender headless `tools/render_lab.py` (360
      frames EEVEE Next 1280×720) → encoded VP9 with imageio-ffmpeg → **4.8 MB / 12s**.
      Verified: lab footage renders + scrubs on `/co-curricular` (`tools/caplab.mjs`,
      `lab-frame.png`). **Task #1 fully complete.**

### 2. Optimization pass
- [x] `npx prisma generate` — client generated; `next build` now completes (exit 0)
- [x] Removed unused Babylon deps (`@babylonjs/core`, `@babylonjs/loaders`,
      `react-babylonjs`) — confirmed zero imports first
- [x] Lazy-load `school.glb`: `Hero.tsx` code-splits `SchoolModelBanner` via
      `next/dynamic` (`ssr:false`), keeping three/r3f + the 16MB GLB out of the
      initial bundle. Home still renders (verified).
- [~] `school.glb` binary compression: inspected — already Draco geometry + WebP
      textures; disk size is **geometry-bound**, so texture downscaling buys little
      for real visual risk. Deferred unless a load-time budget demands it.

### 3. Documentation
- [x] Wrote a real `CLAUDE.md` (stack, structure, 3D notes, run/verify, gotchas)
- [x] Updated `PROGRESS.md`, `TODO.md`, progress ledger

---

## ⚠️ Recurring gotchas
- Opening the **dev** server from a new device/origin → add it to
  `allowedDevOrigins` in `next.config.ts`, then restart. (Production is unaffected.)
- Verify any visual change with screenshots (`node tools/cap.mjs <name>`) before
  reporting it done.
