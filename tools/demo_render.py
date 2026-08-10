import bpy, os, time
OUT=os.path.abspath("tools/_demo"); os.makedirs(OUT,exist_ok=True)
sc=bpy.context.scene
# ORIGINAL camera animation untouched. Beautiful Cycles on CPU (dual Xeon).
sc.render.engine='CYCLES'
sc.cycles.samples=64
sc.cycles.use_denoising=True
sc.cycles.device='CPU'
prefs=bpy.context.preferences.addons['cycles'].preferences
try:
    prefs.compute_device_type='HIP'; prefs.get_devices()
except: pass
for d in prefs.devices: d.use=(d.type=='CPU')
sc.render.resolution_x=1920; sc.render.resolution_y=1080; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='PNG'; sc.render.image_settings.color_depth='8'
print("FRAME_RANGE", sc.frame_start, sc.frame_end, "fps", sc.render.fps, flush=True)
# demo: every 8th frame across the ORIGINAL range
idx=0
for f in range(sc.frame_start, sc.frame_end+1, 8):
    idx+=1; sc.frame_set(f)
    out=os.path.join(OUT,"d%04d"%idx)
    if os.path.exists(out+".png"):  # resumable
        print("SKIP",idx,f,flush=True); continue
    sc.render.filepath=out
    t=time.time(); bpy.ops.render.render(write_still=True)
    print("DEMO",idx,"frame",f,"%.1fs"%(time.time()-t), flush=True)
print("DEMO_DONE", idx, flush=True)
