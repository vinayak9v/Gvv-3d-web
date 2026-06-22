# GVV Website — Session Progress

> Companion to [`FIXLOG.md`](./FIXLOG.md) (which records each error → cause → fix).
> This file tracks overall progress and what's left.

## Session — 2026-06-18 → 06-19

### 1. Exhaust / thruster flames (DONE ✅)
Goal: make the floating-island thruster flames match the reference render
`WhatsApp Image 2026-06-18 at 1.31.02 AM.jpeg` (bright cyan jets streaming down
from the underside).

What was done in `src/components/landing/SchoolModelBanner.tsx`:
- Rewrote the thrust fragment shader: a fat tapering cyan cone with a white-hot
  core and a soft in-shader glow halo (fakes bloom, no post-processing pass).
- `NormalBlending` (not additive — additive washed out against the bright sky).
- Flame color `THREE.Color(0.12, 0.62, 1.0)`; `ELONGATE = 3.5` (kept compact so
  the jets read as flames, not searchlight beams).
- Default view rotation `{ x: -0.5, y: 0.25 }` + model `position={[0,-1.4,0]}` so
  the school sits on top, the underside jets are visible below, and the whole
  island floats beneath the cloud layer — matching the reference composition.

Verified via Playwright screenshots against the reference. User confirmed happy.

### 2. Bug-fix batch (DONE ✅ — see FIXLOG for details)
- **LAN / remote blank 3D models + unclickable cards** → `allowedDevOrigins` in
  `next.config.ts` was missing the LAN IPs / domain. Added them (+ wildcards).
  Verified rendering on `192.168.1.5:3000` and `10.0.0.251:3000`.
- **Hand cursor missing on "Discover" buttons** → added `cursor-pointer`
  (`VisionCards.tsx`).
- **Model rendering "inside" the clouds** → lowered model + tilted view.
- **/academic too many scrolls** → `ScrollControls pages={6} → 2`
  (`AcademicScene.tsx`).
- **School textures dim/olive vs render** → exposure `0.85 → 1.05`, warmer ambient
  (`SchoolModelBanner.tsx`). Warmer golden wood now; flames unaffected.
- **`next build` prisma type error** → removed invalid `datasource` key in
  `prisma.config.ts`.

### Tooling added
- `tools/cap.mjs`, `tools/capm.mjs`, `tools/capschool.mjs` — Playwright screenshot
  helpers for the home model (full / underside / school crop) against
  `http://localhost:3000`.
- `tools/caplan.mjs <url>` — screenshot any origin (used to debug the LAN issue).
  Run with the dev server up: `node tools/cap.mjs <name>`.

## Session — 2026-06-20 (resumed after power loss)

Brainstorm re-scoped Task #1 into 5 parts
(`docs/superpowers/specs/2026-06-20-task1-3d-integration-design.md`). Key decision:
the lab ships as a **pre-rendered scroll-scrubbed fly-through video** on
`/co-curricular` (camera on rails; 2.4GB / 15.3M-tri scene too heavy for real-time
GLB) — **not** a robot+lab GLB swap on `/robotics` as originally noted below.

Done this session:
- **Robotics** (`/robotics`): `vid.webm` replaced by r3f `RobotShowcase` (scroll-rotated `final_robot.glb`). ✅
- **VisionCards**: whole-card click. ✅
- **Academic** (`/academic`): dropped drei `ScrollControls` → 300vh sticky-Canvas browser scroll feeding `ScrollDriver` via a `progressRef`; opening gate locks `body` overflow; camera raised to centre the models. Verified clean. ✅
- **Co-curricular** (`/co-curricular`): page rewritten as scroll-scrubbed `<video src="/lab.webm">`. ✅
- **Lab fly-through** (`public/lab.webm`): Blender headless render of `../camera lab.blend`'s on-rails camera (`tools/render_lab.py`, resumable; 360 frames EEVEE Next 1280×720) → encoded VP9 with imageio-ffmpeg → **4.8 MB / 12s**. Verified rendering + scrubbing on `/co-curricular`. ✅
- **Optimization (Task #2)**: removed Babylon deps; `Hero` code-splits `SchoolModelBanner` via `next/dynamic` (16MB GLB + three out of the initial bundle, home still renders); `prisma generate` done → **`next build` completes (exit 0)**. `school.glb` is geometry-bound (already Draco+WebP) so binary recompression deferred. ✅
- **Docs (Task #3)**: real `CLAUDE.md` written. ✅

**All three tasks complete.** Re-verify in a real browser that each scroll-scrub
*feels* right (the screenshots confirm rendering + no errors; scrub feel is
subjective) and tune if desired.

---

## Session — 2026-06-21 (resumed after power loss)

Two tasks reported (logged in `TODO.md` under the 17:01 batch):

1. **Home 3D model drag bounds (DONE ✅).** Per user: keep **free rotation on all
   axes** — do NOT clamp. Removed the in-progress clamps; re-fit the model by its
   bounding-sphere **diagonal** (`scale = 6.6 / size.length()`) so the rotated
   footprint fits the canvas with margin → a full spin never clips the frame and
   it floats clear below the clouds. Verified on all axes via
   `tools/_draghandle.mjs` + `caplan.mjs`. (`SchoolModelBanner.tsx`)

2. **Vision cards: rotational → teleportation effect (DONE ✅).** Sci-fi glitch,
   hover + click (spec
   `docs/superpowers/specs/2026-06-21-vision-card-teleport-design.md`). Removed
   the mousemove `rotationX/Y` tilt + the black-hole click suck-in. Hover fires a
   0.4s glitch burst (clip-path slice tear + cyan/magenta RGB drop-shadow split +
   jitter) settling to the existing lift/glow; click runs a glitch-out + white
   flash + blink-to-invisible (siblings glitch-fade) → `router.push`. CSS
   keyframes in `globals.css` (`gvv-glitch-slice/-rgb`) toggled by
   `.is-glitching`/`.is-teleporting`; GSAP drives the click timeline + nav.
   Verified via `tools/_cards.mjs` (classes fire; click → `/robotics`).
   (`VisionCards.tsx`, `src/app/globals.css`)

### Follow-up round (user feedback, same day) — all DONE ✅
3. **Model: clamp pitch, keep yaw free, bigger.** Free rotation was somersaulting
   the school and the diagonal-fit made it tiny. Re-clamped `rotation.x`
   (`-0.85/-0.15`), kept `rotation.y` free; re-fit to the horizontal span
   (`7.6 / hypot(x,z)`) so it's large/up-close yet a full horizontal spin stays
   in-frame; section taller for cloud clearance. (`SchoolModelBanner.tsx`)
4. **Cards teleport redo: "light-streak phase"** (glitch was rejected). Hover =
   cyan glow + light-streak sweep; click = compress-to-light-line + flash +
   streak-expand → navigate. (`VisionCards.tsx`, `globals.css`)
5. **Robot section: removed "MECHANICS IN MOTION" overlay** (dropped
   `title`/`subtitle` on the `<ScrubVideo>`). (`GarimaImpact.tsx`)
6. **Garima Impact: transparent torn-top now overlaps the cards section** above
   (`-mt-20 md:-mt-32` + `z-20`) so the transparency reveals the cards through the
   rip instead of a dark seam. (`GarimaImpact.tsx`)

### Round 3 (user feedback) — partially done, then ⏸️ PAUSED 2026-06-22
**Done & verified:**
- Model **drag sensitivity increased** (yaw `0.026`, pitch `0.018`).
- Model **PC cutting** fixed via camera pullback (`z 5.8→6.6`); section height
  reduced to `lg:h-[760px]` (the `900px` had pushed the model below the fold).
- **Teleport visible on phone**: tap is now self-contained (re-arms `.is-charging`
  streak + `.is-phasing`), verified on a 390×844 touch viewport.

**Done but BEING REVERTED (user reversal):** a mobile **poster** fallback
(`public/school-poster.png`) + gating the Canvas/GLB to ≥768px (verified 0 GLB
on mobile). User now wants the **REAL model + drag on phone** AND says the crash
**still happens with the poster** → the WebGL model isn't the sole cause.

**⏸️ OPEN — resume here (see TODO 18:0x batch):**
1. **"Our Journey" (Madok) scroll lag** — `scrub:1` + long-range staggered card
   reveal feels delayed. Make snappy. (`Madok.tsx`)
2. **Revert poster → real model+drag on phone; find & fix the REAL crash**
   (optimize WebGL: dpr 1 / shadows off / drop Environment HDR on mobile; and
   investigate the scrubbed videos / ScrollTrigger count as the actual crash
   source). (`SchoolModelBanner.tsx`, maybe `ScrubVideo.jsx`)
3. **Robot scrub "broken"** (regression user attributes to me — likely the
   GarimaImpact `-mt` overlap shifting the `<ScrubVideo>` pin geometry). NOTE:
   automated tests show currentTime DOES advance (mobile 0→6.76→0.68; desktop
   1.22→7.78→5.74→0.05) — needs reproducing to see the actual breakage.
   (`GarimaImpact.tsx`, `ScrubVideo.jsx`)

---

## Remaining / Next session (superseded — see 2026-06-20 session above)

### A. Robot + lab integration (replace `vid.webm`)
- `final_robot.glb` (in repo root `../final_robot.glb`) needs to be moved into
  `public/models/` and rendered on the **Robotics page**
  (`src/app/robotics/page.js`), replacing the scroll-scrubbed `/vid.webm` video
  in the `.video-section`.
- The lab scene is a Blender file `../camera lab.blend` — browsers can't load
  `.blend`. **Blender 5.1 is installed** (`C:\Program Files\Blender Foundation\Blender 5.1`),
  so export it to GLB headlessly before integrating.
- Plan: render with **Three.js / @react-three/fiber** (already used for the school
  model) — NOT Babylon.js, to avoid bundling a second 3D engine and hurting load
  time.

### B. Full optimization pass
- 16MB Draco GLB (`public/models/school.glb`) — audit/compress, lazy-load.
- Remove unused **Babylon.js** deps (`@babylonjs/core`, `@babylonjs/loaders`,
  `react-babylonjs`) if not used anywhere.
- Code-splitting, image/asset sizes, dpr/render settings.
- `npx prisma generate` so `next build` completes (currently fails on
  `/api/admission-enquiry` without it).

### C. Documentation
- Create `CLAUDE.md` (codebase overview, conventions, how to run/verify).
- Keep `FIXLOG.md` and this file updated.

---

## How to run / verify
- Dev server: `npm run dev` (port 3000, `next dev --webpack`).
- Screenshots: `node tools/cap.mjs <name>` (model), `node tools/caplan.mjs <url>`.
- Accessing over LAN/domain in dev: add the origin to `allowedDevOrigins` in
  `next.config.ts`, then restart the dev server.
