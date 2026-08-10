import bpy, os, time
from mathutils import Vector
OUT=os.path.abspath("tools/_bench"); os.makedirs(OUT,exist_ok=True)
sc=bpy.context.scene
sc.render.resolution_x=1920; sc.render.resolution_y=1080; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='WEBP'; sc.render.image_settings.quality=85
f=sc.frame_start; sc.frame_set(f)

def cpu_count():
    try: return os.cpu_count()
    except: return '?'
print("LOGICAL_CPUS", cpu_count(), flush=True)

def timed(label):
    sc.render.filepath=os.path.join(OUT,label.replace(' ','_'))
    t=time.time(); bpy.ops.render.render(write_still=True); dt=time.time()-t
    print("BENCH %-18s %.1fs"%(label,dt), flush=True)

# list cycles devices
prefs=bpy.context.preferences.addons['cycles'].preferences
for api in ('HIP','OPTIX','CUDA','ONEAPI'):
    try:
        prefs.compute_device_type=api; prefs.get_devices(); break
    except: pass
print("COMPUTE_API", prefs.compute_device_type, flush=True)
for d in prefs.devices: print("  DEV", d.type, d.name, flush=True)

# 1) EEVEE GPU
sc.render.engine='BLENDER_EEVEE'
try: sc.eevee.taa_render_samples=64
except: pass
timed("EEVEE_GPU_64spp")

# 2) Cycles GPU
sc.render.engine='CYCLES'
sc.cycles.samples=48
sc.cycles.use_denoising=True
sc.cycles.device='GPU'
for d in prefs.devices: d.use = (d.type!='CPU')
timed("CYCLES_GPU_48spp")

# 3) Cycles CPU (dual Xeon)
sc.cycles.device='CPU'
for d in prefs.devices: d.use = (d.type=='CPU')
timed("CYCLES_CPU_48spp")
print("BENCH_DONE", flush=True)
