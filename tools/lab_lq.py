import bpy, os, time
OUT=os.path.abspath("tools/_labLQ"); os.makedirs(OUT,exist_ok=True)
sc=bpy.context.scene
# ORIGINAL camera animation, low-quality fast Cycles preview
sc.render.engine='CYCLES'; sc.cycles.samples=16; sc.cycles.use_denoising=True; sc.cycles.device='CPU'
prefs=bpy.context.preferences.addons['cycles'].preferences
try: prefs.compute_device_type='HIP'; prefs.get_devices()
except: pass
for d in prefs.devices: d.use=(d.type=='CPU')
sc.render.resolution_x=640; sc.render.resolution_y=360; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='PNG'
f0,f1=sc.frame_start,sc.frame_end
N=120
frames=[round(f0+i*(f1-f0)/(N-1)) for i in range(N)]
print("ORIG_RANGE",f0,f1,"-> N",N,"frames", flush=True)
for i,f in enumerate(frames,1):
    out=os.path.join(OUT,"p%04d"%i)
    if os.path.exists(out+".png"): print("SKIP",i,f,flush=True); continue
    sc.frame_set(f); sc.render.filepath=out
    t=time.time(); bpy.ops.render.render(write_still=True)
    print("LQ",i,"src",f,"%.1fs"%(time.time()-t), flush=True)
print("LQ_DONE",len(frames), flush=True)
