import bpy, math, os, sys
from mathutils import Vector, Euler
OUT=os.path.abspath("tools/_scout"); os.makedirs(OUT,exist_ok=True)
sc=bpy.context.scene
sc.render.engine='BLENDER_EEVEE'
sc.render.resolution_x=640; sc.render.resolution_y=360; sc.render.resolution_percentage=100
try: sc.eevee.taa_render_samples=16
except: pass
sc.render.image_settings.file_format='WEBP'; sc.render.image_settings.quality=85

cam=sc.camera
# detach animation so we can freely position
cam.animation_data_clear()

def shot(name, loc, target, lens=24):
    cam.location=Vector(loc)
    d=(Vector(target)-Vector(loc)).normalized()
    # aim: rot_quat from -Z to d
    cam.rotation_euler=d.to_track_quat('-Z','Y').to_euler()
    cam.data.lens=lens
    sc.render.filepath=os.path.join(OUT,name)
    bpy.ops.render.render(write_still=True)
    print("SHOT", name, "loc",tuple(round(x,2) for x in loc), flush=True)

C=(0,-0.05,0.2)   # approx room center
shot("01_topdown",(0,-0.05,3.2),C,lens=18)
shot("02_entrance",(0,-1.6,0.25),(0,0.1,0.2),lens=20)
shot("03_left",(-0.7,-0.6,0.3),(-0.2,0.2,0.2))
shot("04_back",(0,-0.9,0.3),(0,0.45,0.25))
shot("05_right",(0.7,-0.6,0.3),(0.1,0.2,0.2))
shot("06_counter",(0,-1.1,0.45),(0,-0.3,0.1),lens=22)
print("SCOUT_DONE")
