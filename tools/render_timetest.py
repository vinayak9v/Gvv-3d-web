import bpy, os, sys, time

RES = int(sys.argv[-2])      # vertical resolution, e.g. 1080
OUT = os.path.abspath(sys.argv[-1])
os.makedirs(OUT, exist_ok=True)

sc = bpy.context.scene
try:
    sc.render.engine = 'BLENDER_EEVEE_NEXT'
except Exception:
    sc.render.engine = 'BLENDER_EEVEE'

# Try to enable GPU for EEVEE Next
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'HIP'  # AMD
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
        print("DEVICE", d.name, d.type, flush=True)
except Exception as e:
    print("GPU_PREF_ERR", e, flush=True)

w = int(RES * 16 / 9)
sc.render.resolution_x = w
sc.render.resolution_y = RES
sc.render.resolution_percentage = 100
sc.render.image_settings.file_format = 'WEBP'
sc.render.image_settings.quality = 90

f = sc.frame_start
sc.frame_set(f)
sc.render.filepath = os.path.join(OUT, "test_%dp" % RES)
t0 = time.time()
bpy.ops.render.render(write_still=True)
dt = time.time() - t0
print("RENDER_SECONDS %.1f res %dx%d" % (dt, w, RES), flush=True)
