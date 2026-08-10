import bpy
from mathutils import Vector
sc=bpy.context.scene
# hero text sits at ~(0.05,0.24,0.33). Find flat wide panels near it (the sign plate).
tx,ty,tz=0.05,0.24,0.33
print("=== candidate sign-plate objects near hero text ===")
rows=[]
for o in sc.objects:
    if o.type!='MESH': continue
    l=o.matrix_world.translation
    if abs(l.x-tx)<0.25 and abs(l.y-ty)<0.15 and abs(l.z-tz)<0.15:
        bb=[o.matrix_world@Vector(c) for c in o.bound_box]
        dx=max(c.x for c in bb)-min(c.x for c in bb)
        dy=max(c.y for c in bb)-min(c.y for c in bb)
        dz=max(c.z for c in bb)-min(c.z for c in bb)
        cx=(max(c.x for c in bb)+min(c.x for c in bb))/2
        cy=(max(c.y for c in bb)+min(c.y for c in bb))/2
        cz=(max(c.z for c in bb)+min(c.z for c in bb))/2
        rows.append((dx,dz,dy,cx,cy,cz,min(c.z for c in bb),max(c.z for c in bb),o.name,len(o.data.vertices)))
# sign plate = wide in X, tall-ish in Z, thin in Y, low vert count, not the typeMesh text
rows.sort(key=lambda r:-(r[0]*r[1]))
for dx,dz,dy,cx,cy,cz,zmin,zmax,n,nv in rows[:14]:
    print("PANEL dx%.3f dz%.3f dy%.3f  C(%.3f,%.3f,%.3f) z[%.3f..%.3f] v%d  %s"%(dx,dz,dy,cx,cy,cz,zmin,zmax,nv,n))
