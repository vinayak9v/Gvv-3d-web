import bpy
print("SCENES:", [s.name for s in bpy.data.scenes])
print("ALL_ACTIONS:", [a.name for a in bpy.data.actions])
print("ALL_CAMERAS(objects):", [o.name for o in bpy.data.objects if o.type=='CAMERA'])
print("ARMATURES:", [o.name for o in bpy.data.objects if o.type=='ARMATURE'])
for o in bpy.data.objects:
    if o.type=='ARMATURE' and o.animation_data:
        ad=o.animation_data
        print("ARM", o.name, "action=", ad.action.name if ad.action else None, "nla_tracks=", len(ad.nla_tracks))
# shape keys animated?
sk=0
for o in bpy.data.objects:
    if o.type=='MESH' and o.data.shape_keys and o.data.shape_keys.animation_data:
        sk+=1
print("ANIMATED_SHAPEKEYS", sk)
# any object with nla
nla=0
for o in bpy.data.objects:
    if o.animation_data and len(o.animation_data.nla_tracks):
        nla+=1
print("OBJECTS_WITH_NLA", nla)
# per-scene camera
for s in bpy.data.scenes:
    print("SCENE", s.name, "camera=", s.camera.name if s.camera else None, "frames", s.frame_start, s.frame_end)
