import bpy
# modifiers present
mods={}
for o in bpy.data.objects:
    for m in o.modifiers:
        mods[m.type]=mods.get(m.type,0)+1
print("MODIFIER_TYPES", mods)
# drivers anywhere
ndrv=0
for o in bpy.data.objects:
    ad=o.animation_data
    if ad and ad.drivers:
        ndrv+=len(ad.drivers)
print("OBJECT_DRIVERS", ndrv)
# geometry nodes / build / explode specifically
gn=[ (o.name,m.name) for o in bpy.data.objects for m in o.modifiers if m.type in ('NODES','BUILD','EXPLODE') ]
print("GN_BUILD_EXPLODE", gn[:10])
# does the camera 'left' move (driver/constraint)?
cam=bpy.data.objects.get('left')
if cam:
    print("CAM_left loc", tuple(round(x,2) for x in cam.location), "constraints", [c.type for c in cam.constraints], "has_drivers", bool(cam.animation_data and cam.animation_data.drivers))
# sample an armature bone over frames to see if anything moves
import mathutils
sc=bpy.context.scene
arm=bpy.data.objects.get('Armature')
def snap(f):
    sc.frame_set(f)
    if arm and arm.pose.bones:
        b=arm.pose.bones[0]
        return tuple(round(x,3) for x in b.matrix.translation)
    return None
print("BONE0 f1", snap(1), "f125", snap(125), "f250", snap(250))
