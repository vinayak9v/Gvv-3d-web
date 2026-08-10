import bpy, math
from mathutils import Vector
sc=bpy.context.scene
cam=sc.camera
print("FRAME_RANGE", sc.frame_start, sc.frame_end, "fps", sc.render.fps)
print("ACTIVE_CAMERA", cam.name if cam else None)
print("CAM_PARENT", cam.parent.name if cam and cam.parent else None)
for c in cam.constraints:
    print("CAM_CONSTRAINT", c.type, getattr(getattr(c,'target',None),'name',None))

def fcurves_of(action):
    fcs=[]
    if hasattr(action,'fcurves') and len(getattr(action,'fcurves',[])):
        return list(action.fcurves)
    for layer in getattr(action,'layers',[]):
        for strip in layer.strips:
            for cb in getattr(strip,'channelbags',[]):
                fcs.extend(cb.fcurves)
    return fcs

ad=cam.animation_data
if ad and ad.action:
    fcs=fcurves_of(ad.action)
    kfs=set()
    for fc in fcs:
        for kp in fc.keyframe_points:
            kfs.add(int(round(kp.co[0])))
    kfs=sorted(kfs)
    print("CAM_ACTION", ad.action.name, "NUM_FCURVES", len(fcs))
    print("CAM_KEYFRAMES", kfs)
    print("NUM_KEYS", len(kfs))

print("--- PATH SAMPLES ---")
step=max(1,(sc.frame_end-sc.frame_start)//14)
for f in range(sc.frame_start, sc.frame_end+1, step):
    sc.frame_set(f)
    wm=cam.matrix_world; loc=wm.translation
    fwd=wm.to_3x3()@Vector((0,0,-1))
    print("F%03d loc(%6.1f,%6.1f,%6.1f) look(%5.2f,%5.2f,%5.2f)"%(f,loc.x,loc.y,loc.z,fwd.x,fwd.y,fwd.z))

print("--- TEXT LABELS ---")
for o in sc.objects:
    if o.type=='FONT':
        print("TXT @(%6.1f,%6.1f,%6.1f) '%s'"%(o.location.x,o.location.y,o.location.z,o.data.body[:40].replace(chr(10),' ')))

# scene bounds from mesh objects
mins=[1e9]*3; maxs=[-1e9]*3
for o in sc.objects:
    if o.type=='MESH':
        for corner in o.bound_box:
            w=o.matrix_world@Vector(corner)
            for i in range(3):
                mins[i]=min(mins[i],w[i]); maxs[i]=max(maxs[i],w[i])
print("SCENE_BOUNDS min(%.1f,%.1f,%.1f) max(%.1f,%.1f,%.1f)"%(mins[0],mins[1],mins[2],maxs[0],maxs[1],maxs[2]))
