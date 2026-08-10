import bpy, os, time
OUT=os.path.abspath("tools/_s1440"); os.makedirs(OUT,exist_ok=True)
sc=bpy.context.scene
sc.render.engine='CYCLES'; sc.cycles.samples=64; sc.cycles.use_denoising=True; sc.cycles.device='CPU'
prefs=bpy.context.preferences.addons['cycles'].preferences
try: prefs.compute_device_type='HIP'; prefs.get_devices()
except: pass
for d in prefs.devices: d.use=(d.type=='CPU')
sc.render.resolution_x=2560; sc.render.resolution_y=1440; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='PNG'
times=[]
for f in (1,150,260):
    sc.frame_set(f); sc.render.filepath=os.path.join(OUT,"f%04d"%f)
    t=time.time(); bpy.ops.render.render(write_still=True); dt=time.time()-t
    times.append(dt); print("S1440 frame",f,"%.1fs"%dt, flush=True)
avg=sum(times)/len(times)
print("AVG_1440P %.1fs  ETA_120 %.2f hrs"%(avg, avg*120/3600), flush=True)
