# Task #1 — 3D Integration & Scroll Fixes (Design)

**Date:** 2026-06-20
**Status:** Approved (design), pending implementation plan
**Supersedes:** The original "Task #1" in `docs/TODO.md` / `docs/PROGRESS.md`
(robot+lab on the Robotics page). Task #2 (Babylon removal, `school.glb`
compression, `prisma generate`) and Task #3 (docs) are unchanged.

## Context

Findings from inspecting the actual assets (these drove the design):

- **`camera lab.blend`** — 2.4 GB, **2,576 objects / 2,041 meshes / ~15.3M
  triangles**, 158 textures (many 2048² / 4096²). Has an **animated active
  Camera** (action frame range 0–360; scene frames 1–372). Far too heavy to
  ship as a real-time GLB, but the camera is fully on rails — so a pre-rendered
  fly-through is visually identical to real 3D at a fraction of the weight.
- **`final_robot.glb`** — 4.8 MB, rigged (Armature, 118 nodes / 52 meshes) but
  **no animation clips** and no camera. Any motion must be driven in code.
- The 3rd main-page card ("Co-curricular", `/co-curricular`) currently renders
  just `hello`. The Robotics page currently scrubs `/vid.webm` on scroll. The
  Academic scene uses drei `ScrollControls` (a nested scroll area).

## Scope

Four independent pieces:

1. Lab fly-through on `/co-curricular`
2. Robot showcase on `/robotics`
3. Whole-card click on the home `VisionCards`
4. Academic scene: browser-scroll + lower the model

Each can be built and verified independently.

---

## 1. Lab fly-through → `/co-curricular`

**Approach:** Pre-rendered camera fly-through, scroll-scrubbed (chosen over a
real-time optimized GLB because the camera is on rails — option A). Mirrors the
existing robotics video-scrub pattern.

### 1a. Offline render step (one-time, not part of the running app)
- Blender **headless** renders frames 1–360 of `camera lab.blend` using its
  existing animated Camera.
  - Engine: **EEVEE Next** (seconds/frame; Cycles would be minutes/frame on
    15.3M tris).
  - Resolution: **1280×720** (bump to 1080p only if the encoded file stays
    small). 30 fps source.
  - Output: PNG sequence to a temp dir.
- Encode PNG sequence → **VP9 WebM** with `ffmpeg` → `public/lab.webm`.
  - Target: a few MB. If `ffmpeg` is not on PATH, fall back to Blender's own
    FFmpeg muxer (`render.image_settings.file_format = 'FFMPEG'`).
- This step is run once by the developer; the repo ships `public/lab.webm`.
  Document the exact Blender + ffmpeg commands in the implementation plan.

### 1b. Page (`src/app/co-curricular/page.js`)
- Rewrite as a `'use client'` component following the robotics pattern:
  - A short heading / intro section (dark-blue theme to match the site).
  - A pinned `.lab-section` (`h-screen`, `pin: true`) containing
    `<video src="/lab.webm" muted playsInline preload="auto">` positioned
    `object-cover`.
  - GSAP `ScrollTrigger` scrubs `video.currentTime` from 0 → `video.duration`
    over the pinned scroll distance (reuse the robotics `setupVideoScrub`
    technique: wait for `loadedmetadata`, drive a dummy `{frame}` tween with
    `scrub: 1`).
  - Optional overlay caption (e.g. the lab name) with `mix-blend-difference`.
- **Verify:** `node tools/caplan.mjs http://localhost:3000/co-curricular`.

---

## 2. Robot showcase → `/robotics`

**Approach:** Scroll-driven rotation of the real model in a pinned r3f section,
replacing the `/vid.webm` `.video-section`.

- Move `../final_robot.glb` → `public/models/final_robot.glb`.
- New component `src/components/scene/RobotShowcase.tsx` (or `.jsx`):
  - `Canvas` rendering the GLB via drei `useGLTF`, dark-blue-theme lighting
    (ambient + directional + a cyan accent point light to match the site).
  - Sensible default camera framing the robot; model scaled/positioned centered.
  - Exposes scroll progress → `rotation.y` mapping (0 → 2π across the section).
- In `src/app/robotics/page.js`:
  - Replace the `.video-section` `<video>` block with a **pinned** section
    hosting `RobotShowcase` (dynamic import, `ssr: false`).
  - A `ScrollTrigger` (`pin: true`, `scrub`) maps section progress → robot
    `rotation.y`; keep the "MECHANICS IN MOTION" overlay text.
  - **Remove** the now-dead `videoRef` + `setupVideoScrub` / `currentTime`
    scrub code.
- Render with **Three.js / @react-three/fiber only** — no Babylon.
- **Verify:** `node tools/caplan.mjs http://localhost:3000/robotics`.

---

## 3. Whole-card click → `VisionCards.tsx`

- Move the `onClick={(e) => handleCardClick(e, card.href, card.id)}` from the
  Discover `<button>` to the **outer card wrapper** (`.vision-card-wrap` or the
  inner card `div`).
- The Discover button stays as a visual affordance; its click bubbles to the
  same handler (no separate `onClick`), so there is no double-trigger.
- Keep the existing **black-hole** transition animation unchanged. `cursor-pointer`
  already applies to the whole card.
- **Verify:** click each card on the home page resolves to its route with the
  transition intact.

---

## 4. Academic scene → browser scroll + lower model

File: `src/components/scene/AcademicScene.tsx`.

- **Remove** drei `ScrollControls` / `useScroll` (the nested scroll area).
- Wrap the scene in a **tall** section (~`300vh`) with a **sticky** Canvas
  pinned to the viewport. Derive a `0→1` scroll `offset` from real window scroll
  over the wrapper (GSAP `ScrollTrigger` or a scroll listener mapping
  wrapper scroll range → progress).
- Feed that `offset` into the existing `ScrollDriver` in place of
  `scroll.offset`. **All dialogue stages, character animations, and the opening
  greeting sequence stay identical** — only the scroll source changes.
  - Preserve the opening-gate behavior (no progress until `openingComplete`):
    lock window scroll (or clamp `offset` to 0) until the greeting finishes.
- **Lower the model:** tune the character group positions and/or the camera
  target (currently camera `(0,1.8,200)` looking at `(0,1.5,-2)`) so the models
  sit **centered and slightly lower** in the section. Verify against a
  screenshot.
- **Verify:** `node tools/caplan.mjs http://localhost:3000/academic`.

---

## Out of scope (unchanged)

- Task #2: remove Babylon deps, compress/lazy-load `public/models/school.glb`,
  `npx prisma generate` so `next build` completes.
- Task #3: write a real `CLAUDE.md`; keep `PROGRESS.md` / `FIXLOG.md` / `TODO.md`
  current.

## Verification (all pieces)

Dev server `npm run dev` (port 3000). Screenshot each changed route with
`node tools/caplan.mjs <url>` before reporting done, per the project's
verify-before-reporting rule.
