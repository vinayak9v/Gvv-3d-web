import bpy, os, math
from mathutils import Vector
OUT=os.path.abspath("tools/_tour"); os.makedirs(OUT,exist_ok=True)
sc=bpy.context.scene
cam=sc.camera
cam.animation_data_clear()
sc.frame_start=1; sc.frame_end=360; sc.render.fps=24

# Each station: (arrive_frame, hold_frame, cam_loc, look_target, lens)
# Hybrid: glide between stations, near-stop during arrive->hold (equal pose).
# Aimed LOWER (target z dropped, cam a touch lower, slightly closer + wider) so the
# show area fills the frame and the ceiling is only a thin strip at the top.
STATIONS=[
 (  1,  22, ( 0.00,-0.98,0.24), ( 0.00, 0.12,0.13), 22),  # S1 establishing wide
 ( 60,  78, (-0.04,-0.74,0.22), (-0.34,-0.06,0.12), 28),  # S2 left autonomous robot
 (108, 124, (-0.10,-0.60,0.24), (-0.16, 0.28,0.22), 30),  # S3 robotic hands shelf
 (158, 182, ( 0.00,-0.58,0.23), ( 0.00, 0.34,0.18), 32),  # S4 central robot (hero)
 (214, 230, ( 0.10,-0.58,0.23), ( 0.14, 0.30,0.19), 32),  # S5 dismantled red body
 (258, 274, ( 0.18,-0.60,0.24), ( 0.33, 0.28,0.21), 30),  # S6 robotic engines shelf
 (300, 316, ( 0.15,-0.72,0.23), ( 0.42,-0.06,0.16), 28),  # S7 right desk/student/round robot
 (340, 352, ( 0.00,-0.80,0.36), ( 0.00,-0.10,0.10), 26),  # S8 descend over counter island
 (360, 360, ( 0.00,-0.98,0.25), ( 0.00, 0.10,0.13), 22),  # end: ease back to wide
]

def key(frame, loc, target, lens):
    cam.location=Vector(loc)
    d=(Vector(target)-Vector(loc)).normalized()
    cam.rotation_euler=d.to_track_quat('-Z','Y').to_euler()
    cam.data.lens=lens
    cam.keyframe_insert('location', frame=frame)
    cam.keyframe_insert('rotation_euler', frame=frame)
    cam.data.keyframe_insert('lens', frame=frame)

for arrive,hold,loc,tgt,lens in STATIONS:
    key(arrive, loc, tgt, lens)
    if hold!=arrive:
        key(hold, loc, tgt, lens)

# smooth bezier glide with eased handles
ad=cam.animation_data
def fcs(a):
    out=[]
    for L in getattr(a,'layers',[]):
        for s in L.strips:
            for cb in getattr(s,'channelbags',[]): out+=list(cb.fcurves)
    return out
for fc in fcs(ad.action):
    for kp in fc.keyframe_points:
        kp.interpolation='BEZIER'; kp.handle_left_type='AUTO_CLAMPED'; kp.handle_right_type='AUTO_CLAMPED'
print("TOUR_BUILT keys per fcurve done", flush=True)

# render station ARRIVE frames at low res to check framing
sc.render.engine='BLENDER_EEVEE'
try: sc.eevee.taa_render_samples=24
except: pass
sc.render.resolution_x=960; sc.render.resolution_y=540; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='WEBP'; sc.render.image_settings.quality=88
for i,(arrive,hold,loc,tgt,lens) in enumerate(STATIONS,1):
    sc.frame_set(arrive)
    sc.render.filepath=os.path.join(OUT,"S%d_f%03d"%(i,arrive))
    bpy.ops.render.render(write_still=True)
    print("STATION_DONE",i,arrive, flush=True)
print("PREVIEW_DONE")
