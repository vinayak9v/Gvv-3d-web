import bpy, os, math, subprocess
from mathutils import Vector
PREV=os.path.abspath("tools/_tourprev"); os.makedirs(PREV,exist_ok=True)
sc=bpy.context.scene; cam=sc.camera
cam.animation_data_clear()
sc.frame_start=1; sc.frame_end=360; sc.render.fps=24
STATIONS=[
 (  1,  22, ( 0.00,-0.98,0.24), ( 0.00, 0.12,0.13), 22),
 ( 60,  78, (-0.04,-0.74,0.22), (-0.34,-0.06,0.12), 28),
 (108, 124, (-0.10,-0.60,0.24), (-0.16, 0.28,0.22), 30),
 (158, 182, ( 0.00,-0.58,0.23), ( 0.00, 0.34,0.18), 32),
 (214, 230, ( 0.10,-0.58,0.23), ( 0.14, 0.30,0.19), 32),
 (258, 274, ( 0.18,-0.60,0.24), ( 0.33, 0.28,0.21), 30),
 (300, 316, ( 0.15,-0.72,0.23), ( 0.42,-0.06,0.16), 28),
 (340, 352, ( 0.00,-0.80,0.36), ( 0.00,-0.10,0.10), 26),
 (360, 360, ( 0.00,-0.98,0.25), ( 0.00, 0.10,0.13), 22),
]
def key(f,loc,tgt,lens):
    cam.location=Vector(loc)
    cam.rotation_euler=(Vector(tgt)-Vector(loc)).normalized().to_track_quat('-Z','Y').to_euler()
    cam.data.lens=lens
    cam.keyframe_insert('location',frame=f); cam.keyframe_insert('rotation_euler',frame=f); cam.data.keyframe_insert('lens',frame=f)
for a,h,loc,t,l in STATIONS:
    key(a,loc,t,l)
    if h!=a: key(h,loc,t,l)
def fcs(act):
    o=[]
    for L in getattr(act,'layers',[]):
        for s in L.strips:
            for cb in getattr(s,'channelbags',[]): o+=list(cb.fcurves)
    return o
for fc in fcs(cam.animation_data.action):
    for kp in fc.keyframe_points:
        kp.interpolation='BEZIER'; kp.handle_left_type='AUTO_CLAMPED'; kp.handle_right_type='AUTO_CLAMPED'

# save test blend (compressed off for speed)
test=os.path.abspath("../camera lab_TOUR_TEST.blend")
bpy.ops.wm.save_as_mainfile(filepath=test, copy=True)
print("SAVED_TEST_BLEND", test, flush=True)

# render preview: every 4th frame, 640x360 EEVEE
sc.render.engine='BLENDER_EEVEE'
try: sc.eevee.taa_render_samples=12
except: pass
sc.render.resolution_x=640; sc.render.resolution_y=360
sc.render.image_settings.file_format='PNG'
idx=0
for f in range(1,361,4):
    idx+=1; sc.frame_set(f)
    sc.render.filepath=os.path.join(PREV,"p%04d"%idx)
    bpy.ops.render.render(write_still=True)
    print("PREV",idx,f, flush=True)
print("FRAMES_DONE",idx, flush=True)
# (webm encoded separately — Blender's bundled python lacks imageio_ffmpeg)
