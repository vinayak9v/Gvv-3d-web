import bpy
from mathutils import Vector
sc=bpy.context.scene
print("=== all 'type'/'text' named meshes (likely baked label text) ===")
labels=[]
for o in bpy.data.objects:
    if o.type=='MESH' and ('type' in o.name.lower() or 'text' in o.name.lower()):
        l=o.matrix_world.translation
        mat=o.data.materials[0].name if o.data.materials else None
        emis=False
        if o.data.materials and o.data.materials[0] and o.data.materials[0].use_nodes:
            for nd in o.data.materials[0].node_tree.nodes:
                if 'Emission' in nd.bl_idname or (nd.type=='BSDF_PRINCIPLED'):
                    emis=True
        labels.append((l.x,l.y,l.z,len(o.data.vertices),o.name,mat))
labels.sort(key=lambda r:r[4])
for x,y,z,v,n,m in labels:
    print("LBL (%.2f,%.2f,%.2f) verts%-5d %-22s mat=%s"%(x,y,z,v,n,m))
print("TOTAL_LABEL_MESHES", len(labels))
