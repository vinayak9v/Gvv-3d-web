import bpy, os, time
OUT=os.path.abspath("tools/_labfinal"); os.makedirs(OUT,exist_ok=True)
sc=bpy.context.scene
# ORIGINAL camera animation, FINAL quality: 1440p Cycles on CPU (dual Xeon)
sc.render.engine='CYCLES'; sc.cycles.samples=64; sc.cycles.use_denoising=True; sc.cycles.device='CPU'
prefs=bpy.context.preferences.addons['cycles'].preferences
try: prefs.compute_device_type='HIP'; prefs.get_devices()
except: pass
for d in prefs.devices: d.use=(d.type=='CPU')
sc.render.resolution_x=2560; sc.render.resolution_y=1440; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='PNG'; sc.render.image_settings.color_depth='8'
f0,f1=sc.frame_start,sc.frame_end
N=120
frames=[round(f0+i*(f1-f0)/(N-1)) for i in range(N)]
print("FINAL_START orig %d-%d -> %d frames @1440p"%(f0,f1,N), flush=True)
done=0
for i,f in enumerate(frames,1):
    out=os.path.join(OUT,"f%04d"%i)
    if os.path.exists(out+".png"):
        done+=1; print("SKIP",i,f,flush=True); continue
    sc.frame_set(f); sc.render.filepath=out
    t=time.time(); bpy.ops.render.render(write_still=True)
    print("FINAL",i,"src",f,"%.1fs"%(time.time()-t),flush=True)
print("FINAL_DONE total",N, flush=True)
