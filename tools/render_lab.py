import bpy, os, sys

OUT_DIR = os.path.abspath(sys.argv[-1])  # passed after `--`
os.makedirs(OUT_DIR, exist_ok=True)

sc = bpy.context.scene
sc.frame_start = 1
sc.frame_end = 360

# Fast engine for a 15M-tri scene. EEVEE Next is the 5.1 id.
try:
    sc.render.engine = 'BLENDER_EEVEE_NEXT'
except Exception:
    sc.render.engine = 'BLENDER_EEVEE'

sc.render.resolution_x = 1280
sc.render.resolution_y = 720
sc.render.resolution_percentage = 100
sc.render.fps = 30
sc.render.film_transparent = False

# Blender 5.1 has no FFMPEG output enum, and no system ffmpeg is available.
# Render a WEBP frame sequence; it is encoded to video (or shipped as an
# image sequence) in a later step.
sc.render.image_settings.file_format = 'WEBP'
sc.render.image_settings.quality = 80

# Resumable render: render frames one-by-one, skipping any that already exist
# on disk. A crash/power-loss only costs the in-flight frame, not the whole run.
for f in range(sc.frame_start, sc.frame_end + 1):
    out_path = os.path.join(OUT_DIR, "frame_%04d.webp" % f)
    if os.path.exists(out_path):
        continue
    sc.frame_set(f)
    sc.render.filepath = os.path.join(OUT_DIR, "frame_%04d" % f)
    bpy.ops.render.render(write_still=True)
    print("FRAME_DONE", f, flush=True)

print("RENDER_DONE", OUT_DIR)
