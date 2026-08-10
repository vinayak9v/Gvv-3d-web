import bpy
sc=bpy.context.scene
print("FRAME_RANGE", sc.frame_start, sc.frame_end, "fps", sc.render.fps)
print("RES", sc.render.resolution_x, "x", sc.render.resolution_y, "pct", sc.render.resolution_percentage)
print("ENGINE", sc.render.engine)
cam=sc.camera
print("CAMERA", cam.name if cam else None)
# animated objects
n_anim=0
for o in bpy.data.objects:
    if o.animation_data and o.animation_data.action:
        n_anim+=1
print("ANIMATED_OBJECTS", n_anim)
# camera animation?
if cam and cam.animation_data and cam.animation_data.action:
    print("CAMERA_ANIMATED yes")
else:
    print("CAMERA_ANIMATED no")
print("N_OBJECTS", len(bpy.data.objects), "N_MESHES", len([o for o in bpy.data.objects if o.type=='MESH']))
# total tris estimate
tris=0
for o in bpy.data.objects:
    if o.type=='MESH':
        tris+=len(o.data.polygons)
print("APPROX_FACES", tris)
