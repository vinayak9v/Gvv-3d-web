import bpy
for mname in ("TEXT_GLOW","lab_4:lambert7","lab_4:lambert7.001"):
    m=bpy.data.materials.get(mname)
    if not m: print("MISSING",mname); continue
    print("=== MAT",mname,"use_nodes",m.use_nodes)
    if m.use_nodes:
        for nd in m.node_tree.nodes:
            if nd.type in ('EMISSION','BSDF_PRINCIPLED'):
                for inp in nd.inputs:
                    if inp.name in ('Strength','Emission Strength','Emission Color','Color','Base Color'):
                        try: val=inp.default_value
                        except: val='?'
                        print("  ",nd.type,inp.name,"=",val)
