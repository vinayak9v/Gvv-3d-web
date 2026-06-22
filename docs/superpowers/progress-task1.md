# Task #1 — Execution Progress Ledger

Plan: `docs/superpowers/plans/2026-06-20-task1-3d-integration.md`
(No git repo — progress tracked here; reviewers read changed files directly.)

- Task 1 (render lab.webm): COMPLETE — power loss interrupted the first render at
  ~8/360; resumed with a **resumable** `tools/render_lab.py` (frame-by-frame, skips
  existing `frame_####.webp`) → all 360 frames rendered (EEVEE Next, 1280×720).
  Encoded with the pip imageio-ffmpeg binary
  (`...PythonSoftwareFoundation.Python.3.12...imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe`):
  `ffmpeg -y -framerate 30 -i /tmp/lab_out/frame_%04d.webp -c:v libvpx-vp9 -b:v 0 -crf 32 -pix_fmt yuv420p -an public/lab.webm`
  → `public/lab.webm` **4.8 MB / 12s VP9**.
- Task 2 (/co-curricular page): COMPLETE & VERIFIED — `src/app/co-curricular/page.js`
  scroll-scrubbed `<video src="/lab.webm">`. Confirmed via `tools/caplab.mjs`
  (scrolls into the pinned section + seeks the video): lab footage renders, video is
  1280×720/12s, no PAGEERR/REQFAIL. Screenshot `lab-frame.png`.
- Task 3 (/robotics robot showcase): COMPLETE & NOW ACTUALLY VERIFIED. Originally
  shipped without visual inspection — turned out the robot was **invisible** (sub-mm
  model scale → speck; `<Environment preset="city">` HDR 301 from raw.githack.com
  blocked the Suspense so the robot never mounted). Fixed in `RobotShowcase.jsx`:
  `ROBOT_SCALE=40` / `ROBOT_Y=-1.0` (empirically framed ~3u tall) and removed
  `<Environment>` (explicit lights suffice, drops a flaky CDN dep). Robot now renders
  centred and rotates on scroll — confirmed by screenshot (`tools/caprobot.mjs`,
  `verify-robot.png`). See `docs/FIXLOG.md`.
- Task 4 (VisionCards whole-card click): COMPLETE (review clean — spec ✅, quality Approved).
- Task 5 (/academic browser-scroll + lower model): COMPLETE & VERIFIED — dropped drei
  ScrollControls/useScroll for a 300vh sticky-Canvas window-scroll wrapper feeding
  `ScrollDriver` via `progressRef`; opening-gate now locks `body` overflow; camera
  raised to (0,2.4,200)/lookAt(0,2.2,-2) to centre the models. Screenshot clean
  (no PAGEERR, no "useScroll must be used within ScrollControls").
