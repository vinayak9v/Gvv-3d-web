# CLAUDE.md

Guidance for working in this repo. Companion docs: [`docs/PROGRESS.md`](./docs/PROGRESS.md)
(session progress), [`docs/FIXLOG.md`](./docs/FIXLOG.md) (bug → cause → fix),
[`docs/TODO.md`](./docs/TODO.md) (checklist).

> [!IMPORTANT]
> **This is NOT the Next.js you know** (see [`AGENTS.md`](./AGENTS.md)). This
> Next.js version (16.2.6) has breaking changes vs older releases. When unsure
> about App Router / config APIs, read the bundled guide in
> `node_modules/next/dist/docs/` before writing code, and heed deprecation notices.

## What this is

Marketing/website for **Garima Vidya Vihar** (GVV), a CBSE senior-secondary
school. A Next.js 16 App-Router site whose centrepiece is an interactive 3D
"floating school island" hero, plus scroll-driven 3D scenes on subpages.

## Stack

- **Next.js 16.2.6** (App Router, **Webpack** — `next dev --webpack`)
- **React 19**
- **3D: Three.js (`three`) via `@react-three/fiber` + `@react-three/drei`**
  (and `@react-three/postprocessing`). **Never add Babylon.js** — a second 3D
  engine was removed to keep the bundle small; render all 3D with r3f/three only.
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **GSAP + ScrollTrigger** (`@gsap/react`) for scroll/timeline animation
- **Framer Motion** for component animation
- **Prisma 6** (`@prisma/client`) — admission-enquiry API persistence
- **Playwright** — screenshot-based visual verification (`tools/*.mjs`)

## Layout

- `src/app/` — App Router routes
  - `page.tsx` → home (`Hero` + landing sections)
  - `robotics/page.js` → scroll-rotated 3D robot (`RobotShowcase`)
  - `co-curricular/page.js` → scroll-scrubbed pre-rendered lab fly-through (`/lab.webm`)
  - `academic/` → guided 3D walkthrough (`AcademicScene`)
  - `api/admission-enquiry/` → Prisma-backed form endpoint
- `src/components/landing/` — home sections. Key file:
  `SchoolModelBanner.tsx` (the 3D island + custom thrust-flame shader).
  `Hero.tsx` **code-splits** `SchoolModelBanner` via `next/dynamic` (`ssr:false`).
- `src/components/scene/` — r3f scene components
  (`AcademicScene.tsx`, `RobotShowcase.jsx`, `Character.tsx`).
- `public/models/` — GLB assets (`school.glb` ~16MB Draco+WebP, `final_robot.glb`,
  `boy.glb`, `robot.glb`). `public/lab.webm` — the lab fly-through video.
- `tools/` — Playwright screenshot helpers + `render_lab.py` (Blender render).
- `next.config.ts` — `allowedDevOrigins` (see gotchas).

## 3D model notes

- The floating island has procedural thrust jets in Blender that **don't export
  to GLB**; `SchoolModelBanner.tsx` recreates them with a custom
  `ShaderMaterial` (cyan tapering cone, normal blending). Thrust cubes are an
  `InstancedMesh` — the shader applies `instanceMatrix`.
- Blender source files live in the repo root one level up
  (`../main schol file_3.blend`, `../camera lab.blend`). Blender 5.1:
  `C:\Program Files\Blender Foundation\Blender 5.1`.
- The lab (`camera lab.blend`, 2.4GB / ~15.3M tris) is **too heavy for a
  real-time GLB**; its camera is on rails, so it ships as a **pre-rendered
  scroll-scrubbed video** (`tools/render_lab.py` → frames → `public/lab.webm`),
  not a live scene.

## Run / build / verify

```bash
npm run dev      # next dev --webpack, port 3000
npm run build    # production build (run `npx prisma generate` first if it errors)
npm start        # serve the production build
```

- **Verify any visual change with a screenshot before claiming it works:**
  - `node tools/cap.mjs <name>` — home model crops (full/underside/school)
  - `node tools/caplan.mjs <url>` — any route (writes `lan-full.png`; logs
    `PAGEERR`/`REQFAIL`). **Read the produced `lan-full.png`.**
  Dev server must be up. (Project rule: self-verify, don't ask the user to check.)

## Gotchas

- **Blank 3D / dead clicks over LAN or a custom domain in `dev`:** the origin
  must be in `allowedDevOrigins` (`next.config.ts`), or Next blocks its `/_next`
  dev runtime → no hydration. Add the host/IP/domain and restart. Production
  (`next start`) is unaffected. See `docs/FIXLOG.md`.
- **`next build` fails with `@prisma/client did not initialize`:** run
  `npx prisma generate`. The DB URL belongs in `prisma/schema.prisma`
  (`datasource db`), **not** in `prisma.config.ts`.
- Keep the dark-blue theme on subpages (`#050b14`, `#0a1445`, blue/cyan accents).
