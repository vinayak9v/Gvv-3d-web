import bpy
from mathutils import Vector
print("=== ALL IMAGE NAMES (non-PBR-looking) ===")
import re
pbr=re.compile(r'(base_?color|metallic|rough|normal|roughness|height|ao|emiss|specular|albedo|orm|_mat|opacity|diffuse)',re.I)
for img in bpy.data.images:
    if not pbr.search(img.name) and img.name not in ('Render Result','Viewer Node'):
        print("IMG", repr(img.name), "%dx%d"%(img.size[0],img.size[1]))
print("=== objects near the ROBOTICS LAB sign (back-centre ~ y>0.25, |x|<0.3, z>0.3) ===")
sc=bpy.context.scene
cands=[]
for o in sc.objects:
    if o.type!='MESH': continue
    l=o.matrix_world.translation
    if l.y>0.22 and abs(l.x)<0.35 and l.z>0.30 and l.z<0.55:
        cs=[o.matrix_world@Vector(c) for c in o.bound_box]
        dims=[max(c[i] for c in cs)-min(c[i] for c in cs) for i in range(3)]
        cands.append((l.x,l.y,l.z,min(dims),max(dims),o.name,len(o.data.vertices)))
cands.sort(key=lambda r:r[5])
for x,y,z,mn,mx,n,nv in cands[:30]:
    print("OBJ (%.2f,%.2f,%.2f) thin%.3f big%.2f verts%d  %s"%(x,y,z,mn,mx,nv,n))
print("CANDS", len(cands))
