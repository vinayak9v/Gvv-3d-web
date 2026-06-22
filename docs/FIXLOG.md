# Fix Log — GVV Website

A running record of bugs/errors, their root cause, and the fix. Newest first.

---

## 2026-06-22 — Mobile page CRASH when scrolling into the robot scrub video

**Symptom (real device):** on a phone, scrolling down to the robot disassembly
video crashed the whole page/Next.js; after a reload the scrub no longer felt
smooth (ScrollTrigger pin state left corrupted by the crash).

**Root cause:** GPU/decoder memory exhaustion. The hero school WebGL canvas (16MB
GLB + HDR-PMREM environment + retina dpr) stays mounted for the whole page. When
you scroll down, the pinned `ScrubVideo` seeks `video.currentTime` on essentially
every scroll frame — very heavy on a mobile VP9 decoder. The two heavy GPU
consumers coexisting overran mobile GPU memory → context loss → page crash.

**Fix (keep the scrub on mobile — it's wanted there):** instead of dropping the
mobile scrub, FREE the competing memory. `SchoolModelBanner.tsx` now watches the
hero with an `IntersectionObserver` and UNMOUNTS the `<Canvas>` (`canvasMounted`
state) once it scrolls out of view (`rootMargin 250px`), releasing the WebGL
context + all its GPU memory; it remounts when the hero returns. The drag rotation
lives in a ref, so it survives the remount. By the time you reach the robot/lab
videos, the hero GPU memory is free, so the decoder has the headroom to scrub
without OOM-crashing. Verified on a 412×915 dpr-3 mobile profile: canvas count goes
1 (top) → 0 (at the video, freed) → 1 (back at top), the robot video still scrubs
(`currentTime` tracks scroll), no crash, no page errors; desktop scrub unchanged.
[Note: an interim fix that switched mobile to a plain autoplay-loop was reverted —
the user wants the scroll animation on mobile too.]

---

## 2026-06-22 — Polish round: mobile model quality, journey blank, footer, drag button, robot eyes

**1. School model looked poor on phone.** Two causes. (a) The mobile budget
(`dpr 1`, `antialias:false`) gave jagged edges → restored antialias + `dpr [1,2]`.
(b) The bigger one: dropping the HDR `<Environment preset="sunset">` on mobile made
the materials flat/washed-out — that HDR is what made it "look great." The reason
it had been dropped was that, sitting inside the model's `<Suspense>`, its CDN fetch
FROZE the model on the spinner. **Final fix (`SchoolModelBanner.tsx`): keep the HDR
on every device but put it in its OWN `<Suspense fallback={null}>`, separate from
the model's.** The model now paints the instant its GLB loads, and the HDR lighting
pops in a moment later without ever blocking. Only real-time SHADOWS stay
desktop-only (the heavy 2K shadow map, barely visible on a small island).
[Superseded an interim attempt that used a `<hemisphereLight>` + desktop-only env —
that looked flat, hence this revision.]

**2. "Our Journey" section blank on phone until ~5 scrolls.** Root cause
(`Madok.tsx`): the card reveal was a GSAP ScrollTrigger, and the robot `ScrubVideo`
directly above is PINNED for 300% of the viewport — that huge pin-spacer throws
ScrollTrigger's start/end math off on real mobile, so the cards stayed at
`opacity:0` (blank) until well past the section. **Final fix: drive the card reveal
with a plain `IntersectionObserver`** (in a `useEffect`, threshold 0.12) that flips
a `revealed` state toggling Tailwind `opacity/translate` transitions with a per-card
stagger — completely independent of ScrollTrigger pin geometry, so the cards appear
the moment the grid enters view (falls back to visible if IO is unavailable). The
progress bar keeps its own snappy GSAP scrub. [Superseded an interim attempt that
just retriggered the GSAP reveal on `.journey-grid` — still pin-affected on device.]

**3. Footer stacked vertically on mobile.** Base grid was `grid-cols-1`
(`Footer.tsx`). Changed to `grid-cols-2` (kept `lg:grid-cols-4`) so the four
columns sit side-by-side like desktop — 4-across is too cramped at 390px, 2×2 is
the readable middle ground.

**4. Drag button below the fold on load (PC + mobile).** The model section was tall
and a wavy SVG separator + large margins pushed the handle out of the first
viewport. Fix (`SchoolModelBanner.tsx`): removed the separator, tightened heights
(`h-[450px]…lg:h-[760px]` → `h-[380px]…lg:h-[680px]`), pulled the canvas down
(`bottom-12`→`bottom-4`), reduced button/text margins (`mt-6`→`mt-3`). Handle +
"Drag To View" now render in the initial viewport on both.

**5. Academic robot had "no eyes" (looked like the wrong robot).** It was NOT a
wrong/replaced model — it's the same animated `robot.glb`. Its `eyes` material
ships with `emissiveFactor = [1,1,1]` (full white emissive) layered over its
baseColorTexture, blowing the eyes out to flat white ovals and hiding the actual
colored/pupilled eyes baked into the texture — the same Blender-baked-emissive
blowout that hit the school model. Fix: added an optional `dimEmissiveMaterials`
prop to `Character.tsx` that zeroes emissive (factor + map) on the named materials,
and passed `['eyes']` for the robot in `AcademicScene.tsx`. The textured blue eyes
are back and all three animations (idle/talk/wave) are preserved. Deliberately did
NOT swap to `final_robot.glb` — GLB inspection shows it has **0 animation clips**
(plus eyes-rigged-to-chest in bind pose), so it would freeze the conversation scene.

---

## 2026-06-22 — Madok scroll lag, real model on phone (poster reverted), robot-scrub pin hardening

**1. "Our Journey" (Madok) — reveal lagged ~1s behind the scroll.**
Root cause (`Madok.tsx`): the journey timeline used `scrub: 1` (1s smoothing) over
a long range (`top 86%`→`top 30%`) with a slow stagger (each `0.16`, dur `0.28`),
so cards drifted in well after the scroll position. Fix: `scrub: 0.2`, shorter
range (`top 82%`→`top 58%`), tighter stagger (each `0.07`, dur `0.18`). The reveal
now tracks the scroll instead of trailing it. (Snappiness is subjective — verified
no errors + cards still reveal in sequence with the progress bar.)

**2. REVERSAL — phone now renders the REAL 3D model + drag (poster removed).**
The earlier mobile **poster** fallback (`/school-poster.png`, Canvas gated to
≥768px) was reverted: the user reported the crash *still* happened with the poster
(so the WebGL model wasn't the sole cause) and wanted the real model + drag on
phones like PC. Fix (`SchoolModelBanner.tsx`): the Canvas mounts on every device;
`isDesktop` now only selects render QUALITY to keep phones inside their GPU memory
budget — mobile gets `dpr 1` (no retina oversampling), `shadows={false}` (no 2K
shadow map/depth pass), `powerPreference:'low-power'`, no `<Environment>` (skips
the sunset HDR download + its PMREM target; ambient+directional carry the lighting
instead, nudged brighter). Added direct pointer/touch drag on the canvas wrapper
with `touch-action: pan-y` (vertical swipe scrolls the page, horizontal drag spins
the model); drag handle + hint now show on all sizes; GLB preload is unconditional.
Verified on a 390×844 touch viewport: canvas mounts (no context loss), the real
island + thruster flames paint, a horizontal swipe yaws the model, no page errors.
Desktop path unchanged (shadow + HDR env still active).

**3. Robot scrub "broken" on home — pin geometry hardened.**
The user attributed a robot-scrub regression to the GarimaImpact `-mt-20/-mt-32`
torn-paper overlap shifting layout. Automated probes show the ping-pong scrub
works mechanically AND visually on both desktop (assembled→exploded→reassembled at
currentTime 1.25→7.78→5.74→0.00) and mobile (0.40→6.92→6.60→0.51), so the reported
break didn't reproduce — consistent with the global `ScrollRefresh` masking stale
pin geometry. Hardened defensively (`ScrubVideo.jsx`): added
`invalidateOnRefresh: true` (recompute pin start/end on every refresh, so a
sibling layout shift can't leave the pin measured against stale geometry) plus
`anticipatePin: 1`.

---

## 2026-06-21 — Follow-up tweaks: model pitch clamp + size, light-streak teleport, robot text, impact overlap

**1. Home model — clamp pitch, keep yaw free, make it bigger again.**
The fully-free rotation let the school somersault bottom-to-top (looked broken),
and the bounding-sphere-diagonal fit had made the model too small to view up
close. Fix (`SchoolModelBanner.tsx`): re-clamp `rotation.x`
(`ROT_X_MIN/MAX = -0.85/-0.15`) so it can't flip; leave `rotation.y` free for a
full horizontal spin. Because pitch is bounded, the only 360° turn is yaw, so
re-fit to the **horizontal span** (`scale = 7.6 / hypot(size.x, size.z)`) instead
of the full diagonal — the model is large/up-close again and a full horizontal
spin still stays in-frame. Section height bumped
(`lg:h-[740px]→h-[900px]`, etc.) for cloud clearance. Verified the school keeps
orientation on all drags, is large + visible on load (800/950px), clears clouds.

**2. Vision cards — glitch → "light-streak phase" teleport.**
User rejected the glitch (slice/RGB tear). Replaced with a cleaner teleport
(`VisionCards.tsx`, `globals.css`): removed `gvv-glitch-*`; added
`.is-charging` (hover: cyan glow + one `gvv-streak-sweep` light streak) and
`.is-phasing` (click). Click runs a GSAP timeline that collapses the card to a
thin bright horizontal line of light (`scaleY:0.04`), white-flashes, then expands
the streak sideways and fades (`scaleX:1.6, opacity:0`) → `router.push`; siblings
phase out. Verified classes fire and click → `/robotics`.

**3. Robot section — removed "MECHANICS IN MOTION" text.** Dropped the
`title`/`subtitle` props on the robot `<ScrubVideo>` in `GarimaImpact.tsx`
(ScrubVideo renders no overlay when both are absent).

**4. Garima Impact — transparent top overlaps the section above.** The
`Group 9.png` torn-paper section's transparent top showed a flat dark band
"mixing" at the seam with VisionCards. Added `-mt-20 md:-mt-32` + `z-20` so the
torn top overlaps the cards section — the transparency now reveals the cards
through the rip. Verified the Discover buttons sit clear of the tear.

---

## 2026-06-21 — Vision cards: rotational tilt → sci-fi glitch "teleport"

**Request.** Replace the home vision cards' mouse-follow 3D **rotational** tilt
with a **teleportation** effect (sci-fi glitch), on hover + click.

**Change** (`VisionCards.tsx`, `src/app/globals.css`):
- Removed the `onComplete` mousemove `rotationX/rotationY` `quickTo` tilt and the
  black-hole click suck-in (`scale:0, rotationZ:1080, blur`).
- Added CSS glitch keyframes `gvv-glitch-slice` (clip-path slice displacement +
  X jitter) and `gvv-glitch-rgb` (stacked cyan/magenta `drop-shadow` channel
  split), toggled via `.is-glitching` (0.4s one-shot hover burst) and
  `.is-teleporting` (fast infinite, used during the click-out).
- **Hover** (`onMouseEnter`): re-arm + add `.is-glitching` (reflow forces restart
  on rapid re-entry); `onMouseLeave` removes it. Settles into the existing
  `group-hover` calm state (lift + glow + sliding shutters), which was untouched.
- **Click**: add `.is-teleporting`, run a GSAP timeline (flicker → white-flash
  `brightness(3)` → blink-out `scaleY:0.02/opacity:0`), fade the other two cards,
  then `router.push(href)` in `onComplete`.

**Verified** with `tools/_cards.mjs`: hover toggles `.is-glitching`; click adds
`.is-teleporting` and navigates (URL → `/robotics`). Screenshots confirm the
slice/RGB-split tear on hover and the centered teleport-out on click, with a clean
resting + settled-hover state (no glitch residue).

---

## 2026-06-21 — Home 3D model: free rotation + fit so a spin never clips the frame

**Symptom.** Dragging the home floating-island model pushed it out of bounds /
cut it off at the canvas edges and it drifted up into the cloud layer. An earlier
in-progress attempt added rotation **clamps** (`ROT_X_MIN/MAX`, `ROT_Y_MIN/MAX`),
but that blocked rotating the model on all axes — which the user explicitly wanted.

**Cause.** Two things: (1) the model was scaled to its **longest axis**
(`6.2 / maxAxis`) so it nearly filled the frame at rest — any rotation swung its
corners (the bounding-sphere diagonal, larger than any single axis) past the
canvas edges and clipped. (2) The clamps that "fixed" the clipping also removed
the user's ability to freely turn the island.

**Fix** (`src/components/landing/SchoolModelBanner.tsx`):
- **Removed the clamps** — `moveDrag` now adds to `rotationTarget.x/y` directly, so
  the island rotates freely on all axes.
- **Re-fit by the bounding-sphere diagonal** instead of the longest axis:
  `scale = MODEL_FIT(6.6) / size.length()`. The model's rotated footprint (worst
  case = the diagonal) now fits the canvas with margin, so a full free spin on any
  axis stays in-frame and clears the clouds.

Verified with `tools/_draghandle.mjs` (drags the actual `.drag-handle` to the
extremes on each axis) + a clean `caplan.mjs` rest capture: model stays inside the
frame and below the clouds while rotating on every axis.

---

## 2026-06-21 — Content restructure: videos relocated, responsive fill, robot reassembly

**Changes (user-requested restructure):**
- **Robot disassembly video → home only.** Moved off `/robotics`; now a pinned
  scroll-scrubbed section in `GarimaImpact.tsx`, directly above "Innovation At
  Garima". `/robotics` no longer shows the robot.
- **Lab fly-through → /robotics.** Moved off `/co-curricular`; now the scrubbed
  section on `/robotics`.
- **/co-curricular → blank** page with generic demo text (navbar kept).
- **Contact Us section removed** from the home page.
- Introduced a shared **`src/components/shared/ScrubVideo.jsx`** (pinned, scrubbed,
  `100svh` + `object-cover` so footage fills the screen in portrait) used by both
  the home robot section and the robotics lab section.

**Robot "disassembles but never reassembles" — root cause & fix.**
Scrubbing `robot_assembly.webm`'s `currentTime` all the way to its end (10.13s =
full duration) shows the robot **still exploded** — the clip is assemble→explode
and *ends exploded*; it contains **no reassembly frames**. So any plain forward
scrub disassembles and stops. Since re-rendering wasn't wanted, `ScrubVideo` got a
**`pingPong`** option: it maps scroll progress 0→1 to a triangle wave
(`1 - |2·progress − 1|`), playing the clip forward to the explosion at mid-scroll
then reversing back to fully assembled at the bottom. Net scroll-down reading:
assembled → disassemble → reassemble (lands assembled right at "Innovation At
Garima"). Verified by the currentTime triangle-wave (0→8.2s→0) and frames.

**/academic model "not loading" on responsive — root cause & fix.**
The two characters are hard-placed at `x = ±80` with a fixed camera. The camera's
*horizontal* FOV is `vfov × aspect`, so on narrow/portrait viewports (aspect < ~0.95)
both characters fell outside the frustum and nothing rendered — looked like the
scene never loaded. Fix: made the separation aspect-responsive in the per-frame
camera driver — `sep = clamp(60 × aspect, 32, 80)` — pulling the pair toward centre
as the viewport narrows (camera stays at x=0, so they stay centred and large).
Section also switched `h-screen` → `h-[100svh]`. Verified at 390×844 (loads,
centred, dialogue cycles) and desktop unchanged.

**Exhaust flames longer + more contrasted.** `SchoolModelBanner.tsx`: thrust-cube
`ELONGATE` 3.5→5.5 (longer plume geometry); shader axial falloff softened
(`pow(1-a, 0.55)`) so the jet stays bright much further down; deeper saturated cyan
(`uColor` 0.0,0.52,1.0) with a sharper hot-core→cyan transition and a second
saturation lift down the plume for higher contrast against the bright sky.

**Responsive fill (global).** `100svh` + `object-cover` on the video sections;
school hero and academic characters verified filling portrait.

## 2026-06-21 — `/academic` conversation lost: `overflow-hidden` broke `position: sticky`

**Symptom:** After moving the academic walkthrough from drei `ScrollControls` to
window scroll, the scroll-driven robot↔student conversation no longer played. The
3D scene scrolled off the top almost immediately (blank viewport by ~50% scroll),
so no dialogue/animation stage was ever reached on screen.

**Root cause:** `AcademicScene` pins its canvas with a `position: sticky` section
inside a `height: 300vh` wrapper. `PageShell` (the academic page's wrapper) had
`overflow-hidden` on its outermost div. An ancestor with `overflow: hidden` turns
that ancestor into the sticky element's scroll container — but it grows with its
content instead of scrolling, so the sticky child never pins relative to the
viewport and just scrolls away with the page.

**Fix:** Changed `PageShell`'s outer div from `overflow-hidden` to
`overflow-x-clip`. `overflow: clip` (unlike `hidden`) does **not** establish a
scroll container and does not force the cross-axis to `auto`, so horizontal
overflow is still clipped while `position: sticky` works again. Verified at
0/25/50/75/100% scroll: scene pins, robot plays `talk`, boy plays `clap`, and the
dialogue panels (`QUALITY OF EDUCATION`, `VISION STATEMENT`, …) appear in sequence
(`tools/capscroll.mjs`). Affects every `PageShell` page (about/admission/contact/
academic); horizontal-scroll containment preserved.

---

## 2026-06-21 — Card-link pages (`/robotics`, `/co-curricular`) had no navbar

**Symptom:** Reaching `/robotics` or `/co-curricular` from the home VisionCards
showed the page with no site navigation — no way back without the browser button.

**Root cause:** Those two pages render their own full-bleed `<main>` and never used
`PageShell` (which is what mounts `<Navbar />`).

**Fix:** Added an absolute-positioned `<Navbar />` overlay (`absolute top-0 inset-x-0
z-50`) at the top of each page's `<main>` (made `<main>` `relative`). Kept them out
of `PageShell` on purpose so the GSAP-pinned full-screen video sections aren't
constrained by PageShell's column/footer/padding. Verified the navbar renders and
the hero/pin layout is unchanged on both pages (`tools/caplan.mjs`).

---

## 2026-06-21 — `/co-curricular` blanked on first-load scroll; scrub dropped on scroll-up

**Symptom:** (a) On a *cold* first load, scrolling made the whole page go blank; a
reload fixed it permanently. (b) Scrolling back up after scrolling down sometimes
dropped the video scrubbing / showed blank frames.

**Root cause:**
1. **Blank-on-first-load:** the scroll-scrubbed lab video's `ScrollTrigger`
   (`pin: true`) was created **asynchronously**, gated on the video's
   `loadedmetadata`. On a cold load that event fires at an unpredictable time
   relative to layout, so the pin geometry (start/end + pin-spacer) was measured
   wrong and the full-screen black pinned section ended up covering the viewport —
   and stayed wrong for the whole session. A reload serves the video from cache so
   `readyState >= 1` synchronously inside `useGSAP`, making the measurement correct.
   (`/co-curricular` also lacked the `ScrollRefresh` that `/academic` has.)
2. **Scroll-up scrub loss:** `onUpdate` wrote `video.currentTime` on *every* tick
   with no guard, flooding the decoder with backward seeks (expensive for webm),
   which dropped/blanked frames on fast scroll-ups.

**Fix (both `co-curricular/page.js` and the identical `robotics/page.js`):**
- Create the `ScrollTrigger` **immediately** in `useGSAP` (no metadata gate) so pin
  geometry is measured at a consistent initial layout.
- Drive `video.currentTime` from the eased `self.progress` (`progress * duration`),
  reading `duration` lazily and guarding `NaN` — removes the need to know duration
  at creation time.
- Skip seeks while one is in flight: `if (!video.seeking && |currentTime - target|
  > 0.02) video.currentTime = target` — stops the decoder flood, smoothing both
  directions.
- On `loadedmetadata`: paint the first frame (`currentTime = 0.001`) so the pinned
  black section doesn't show pre-scroll, then `ScrollTrigger.refresh()`.

Verified with cold-load incremental wheel scrolling down **and** back up
(`tools/capscrub.mjs`): scrub tracks both directions, no blank frames, navbar present.

## 2026-06-20 — Robotics robot's eyes were on its chest → switched model to robot.glb

**Symptom:** Once the robot was visible (see entry below), its eyeballs floated on the
**chest**, below the neck; the face had only empty sockets.

**Root cause:** `final_robot.glb`'s rig is broken. The eye meshes are skinned to a
mis-posed bone, so the bind/rest pose places them on the chest. This is baked into the
asset — proven by: (a) the displacement is identical at `scale=1` and `scale=40` (a
uniform scale can't move parts relative to the body, so it's not a three.js
skinned-under-scale bug); and (b) `skeleton.pose()` (reset to bind pose) collapses the
whole model to a speck, i.e. the intended display pose *is* the broken one. Not fixable
in code without re-rigging in Blender.

**Fix:** Switched `RobotShowcase.jsx` to **`robot.glb`** — the same GVV-branded robot
already used on `/academic`, which renders correctly with eyes on the face. Reframed for
the showcase camera: `ROBOT_SCALE = 0.4`, `ROBOT_Y = -1.2` (robot.glb is much larger
natively than final_robot). Verified by screenshots at two scroll depths: robot is
centred, eyes are on the face, and it rotates with scroll (`tools/caprobot.mjs`).

---

## 2026-06-20 — Robotics robot was invisible (shipped "done" but never visually checked)

**Symptom:** `/robotics` `.robot-section` rendered only the dark background + the
"MECHANICS IN MOTION" overlay — no robot. The Task 3 report had marked it done but
explicitly noted the robot "was not visually inspected — only confirmed indirectly via
the absence of a failed GLB request." It never actually rendered.

**Two stacked root causes:**
1. **Sub-millimetre model scale.** `final_robot.glb` is authored tiny — its *rendered*
   height is ~0.075u (the glTF accessor bbox reads ~0.0003u; it's a skinned mesh so the
   bind-pose bbox understates the real size, which also makes a `Box3.setFromObject`
   auto-fit misfire). At `scale={1.5}` the robot was a ~15px speck near the bottom edge.
2. **`<Environment preset="city" />` blocked the Suspense.** drei fetches the HDR from
   `raw.githack.com`, which returns a **301 redirect** that three's HDR loader doesn't
   follow → that `<Suspense>` never resolved → the whole subtree (including the robot)
   never mounted. (The GLB still 200'd, but only because of the module-level
   `useGLTF.preload`, which masked the problem — no `REQFAIL` ever appeared.)

**Fix (`src/components/scene/RobotShowcase.jsx`):**
- Empirically scaled the robot to ~3u tall: `ROBOT_SCALE = 40`, `ROBOT_Y = -1.0`
  (measured the real rendered size by logging `Box3.setFromObject` from a `useEffect`).
- **Removed `<Environment preset="city" />`** (and its import). The explicit
  ambient + directional + two coloured point lights already light the robot, and this
  drops a flaky external-CDN dependency from a core page element.

**Lesson:** "no failed request" ≠ "it renders." Always scroll the pinned section into
view and look at the pixels (`tools/caprobot.mjs`), don't infer from the network log.

---

## 2026-06-18 — School textures looked dim/olive vs the Blender render

**Symptom:** The school building looked darker and more muted/olive than the warm,
sunlit golden-wood look in the Blender reference render.

**Root cause (partial):** Tone-mapping exposure was low (`0.85`) and ambient light
was dim/neutral (`0.3`), so the albedo read flat and cool. (The baked-emissive
"lit" look was also disabled earlier to kill the white-rectangle blow-out.)

**Fix:** In `SchoolModelBanner.tsx` raised `toneMappingExposure` `0.85 → 1.05` and
ambient light `0.3 → 0.55` with a warm tint (`#FFF1DD`). Building now reads as
warmer golden wood, closer to the render, without washing out the thruster flames.

**Note:** A real-time WebGL view won't perfectly match a Cycles/GI render. If a
closer match is needed, the next step is selectively re-enabling the baked
emissive/lightmap textures at low intensity (carefully, to avoid the old
white-rectangle blow-out).

---

## 2026-06-18 — 3D models blank & cards unclickable over LAN / custom domain

**Symptom:** On `localhost:3000` everything works. When opening the site from
another device on the LAN (`http://192.168.1.5:3000`, `http://10.0.0.251:3000`)
or via the domain `garima.tinu.pro`, the 3D models render as blank space and the
Academic / Robotics / Co-curricular cards don't respond to clicks. No errors in
the console.

**Diagnosis (evidence):**
- Page HTML, navbar, text, clouds all load fine — only the interactive/3D parts fail.
- Captured the R3F `<canvas>` size: `300x150` (the HTML default) over the LAN IP vs
  `1152x692` over localhost. The container around it WAS correctly sized (`1152x692`),
  so the canvas simply never got measured/initialised.
- Canvas existed but client effects never completed; buttons had no handlers →
  classic sign that **React hydration never finished** on the remote origin.
- Only the HMR websocket errored (`ws://…/_next/webpack-hmr` → `ERR_INVALID_HTTP_RESPONSE`).

**Root cause:** Next.js only serves its dev/client runtime to origins it trusts.
`next.config.ts` had `allowedDevOrigins` listing only an old IP (`72.61.224.202`).
The current LAN IPs and domain were **not** in the list, so Next blocked their
`/_next` dev resources → no hydration → blank canvases and dead buttons.

**Fix:** Added every access origin (and LAN wildcards) to `allowedDevOrigins` in
`next.config.ts`:
```ts
allowedDevOrigins: [
  '72.61.224.202', '192.168.1.5', '10.0.0.251',
  'garima.tinu.pro', '*.tinu.pro', '192.168.*.*', '10.0.*.*',
]
```
Restart the dev server after editing. Verified: canvas now `1152x692` and the
model renders on both LAN IPs.

**Note:** This only affects `next dev`. A production build (`next start`) has no
HMR and isn't subject to `allowedDevOrigins`. When you access the site from a NEW
host/IP/domain in dev, add it here.

---

## 2026-06-18 — `next build` fails: invalid `datasource` in prisma.config.ts

**Symptom:** `npm run build` → `Type error: Object literal may only specify known
properties, and 'datasource' does not exist in type 'PrismaConfig'`.

**Root cause:** This Prisma version's `defineConfig()` does not accept a
`datasource` key. The database URL belongs in `prisma/schema.prisma`
(`datasource db { url = env("DATABASE_URL") }`), not in `prisma.config.ts`.

**Fix:** Removed the `datasource` block from `prisma.config.ts`.

**Still open:** Build then fails later with `@prisma/client did not initialize yet`
on `/api/admission-enquiry` — the Prisma client hasn't been generated. Run
`npx prisma generate` before building (or it should run via a postinstall hook).

---

## 2026-06-18 — School model rendered "inside" the clouds

**Symptom:** The floating-island model overlapped the decorative cloud PNG; the
school building appeared to poke into the cloud instead of floating beneath it.

**Root cause:** The model sat at world origin while the cloud layer sits above it
on the page, so they intersected.

**Fix:** In `SchoolModelBanner.tsx`, lowered the model group
(`position={[0,-1.4,0]}`) so it sits below the cloud layer. Because lowering it
made the camera look down onto the roof (hiding the underside flames), the default
view rotation was tilted back to `{ x:-0.5, y:0.25 }` to keep the thruster jets
visible. Matches the reference composition (clouds above, island + jets below).

---

## 2026-06-18 — Pointer (hand) cursor disappeared over the "Discover" buttons

**Symptom:** On the home-page Academic / Robotics / Co-curricular cards, hovering
the card showed the hand cursor, but moving onto the gold "Discover" button
reverted to the default arrow.

**Root cause:** `<button>` defaults to `cursor: default`. The card wrapper had
`cursor-pointer` but the button didn't, so the button overrode it.

**Fix:** Added `cursor-pointer` to the button's className in `VisionCards.tsx`.

---

## 2026-06-18 — /academic walkthrough required too many scrolls

**Change:** Reduced `ScrollControls pages={6}` → `pages={2}` in
`AcademicScene.tsx` so the guided tour completes in roughly one scroll.
(`pages={1}` would disable scrolling entirely — 2 is the practical minimum.)
The dialogue stages are keyed to scroll *offset* (0–1), so they still all play;
they're just compressed into a shorter scroll distance.
