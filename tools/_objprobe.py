import bpy
from mathutils import Vector
sc=bpy.context.scene
rows=[]
for o in sc.objects:
    if o.type!='MESH': continue
    loc=o.matrix_world.translation
    # only objects near the lab (within ~12 units of origin)
    if abs(loc.x)<12 and abs(loc.y)<12 and abs(loc.z)<6:
        # bounding size
        cs=[o.matrix_world@Vector(c) for c in o.bound_box]
        sx=max(c.x for c in cs)-min(c.x for c in cs)
        sy=max(c.y for c in cs)-min(c.y for c in cs)
        sz=max(c.z for c in cs)-min(c.z for c in cs)
        rows.append((loc.x,loc.y,loc.z,max(sx,sy,sz),o.name))
rows.sort(key=lambda r:(r[0],r[1]))
print("NEAR_LAB_MESHES", len(rows))
for x,y,z,sz,n in rows:
    print("OBJ (%5.2f,%5.2f,%5.2f) size%5.2f  %s"%(x,y,z,sz,n))
