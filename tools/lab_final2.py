import bpy, os, time
from mathutils import Vector
sc=bpy.context.scene
OUT=os.path.abspath("tools/_labfinal"); os.makedirs(OUT,exist_ok=True)
FONT_PATH=os.path.abspath("../fonts/Orbitron.ttf")
LABELS={"lab_4:typeMesh1":"ROBOTICS LAB","lab_4:typeMesh2":"10TH TO 12TH GRADE",
 "typeMesh1":"ROBOTIC HANDS","typeMesh2":"DISMANTLED\nROBOTIC BODY","typeMesh3":"ROBOTIC ENGINES",
 "typeMesh4":"IOT CHIPS","typeMesh5":"RASPBERRY PI","typeMesh6":"SENSORS","typeMesh7":"ENGINE MODULES"}
PLATE_CX=0.052; TEXT_Y=0.241
HERO={"lab_4:typeMesh1":dict(cz=0.346,w=0.205,h=0.022),
      "lab_4:typeMesh2":dict(cz=0.316,w=0.180,h=0.011)}
for mn,val in (("TEXT_GLOW",3.5),("lab_4:lambert7",2.2),("lab_4:lambert7.001",7.0)):
    m=bpy.data.materials.get(mn)
    if m and m.use_nodes:
        for nd in m.node_tree.nodes:
            if nd.type=='BSDF_PRINCIPLED' and 'Emission Strength' in nd.inputs:
                nd.inputs['Emission Strength'].default_value=val
for n in LABELS:
    o=bpy.data.objects.get(n)
    if o: o.hide_render=True
def lbb(o):
    bb=[Vector(c) for c in o.bound_box]
    return (Vector((min(c.x for c in bb),min(c.y for c in bb),min(c.z for c in bb))),
            Vector((max(c.x for c in bb),max(c.y for c in bb),max(c.z for c in bb))))
fnt=bpy.data.fonts.load(FONT_PATH)
for n,txt in LABELS.items():
    old=bpy.data.objects.get(n)
    if not old: continue
    M=old.matrix_world.copy(); msc=M.to_scale(); mn,mx=lbb(old); cen=(mn+mx)/2
    cur=bpy.data.curves.new(n+"_F",'FONT'); cur.body=txt; cur.font=fnt; cur.align_x='CENTER'; cur.align_y='CENTER'
    nt=bpy.data.objects.new(n+"__FONT",cur); old.users_collection[0].objects.link(nt); bpy.context.view_layer.update()
    nmn,nmx=lbb(nt); nW=max(nmx.x-nmn.x,1e-4); nH=max(nmx.y-nmn.y,1e-4)
    nt.rotation_mode='QUATERNION'; nt.rotation_quaternion=M.to_quaternion()
    if n in HERO:
        hl=HERO[n]; s=min(hl['w']/nW,hl['h']/nH); cur.extrude=max(0.0008/s,5e-4); nt.scale=(s,s,s)
        nt.location=Vector((PLATE_CX,TEXT_Y,hl['cz']))
    else:
        oW=(mx.x-mn.x)*msc.x; oH=(mx.y-mn.y)*msc.y; oT=(mx.z-mn.z)*msc.z
        s=min(oW/nW,oH/nH); cur.extrude=max(oT/(2*s),5e-4); nt.scale=(s,s,s); nt.location=M@cen
    if old.data.materials and old.data.materials[0]: cur.materials.append(old.data.materials[0])
# render config
sc.render.engine='CYCLES'; sc.cycles.samples=64; sc.cycles.use_denoising=True; sc.cycles.device='CPU'
prefs=bpy.context.preferences.addons['cycles'].preferences
try: prefs.compute_device_type='HIP'; prefs.get_devices()
except: pass
for d in prefs.devices: d.use=(d.type=='CPU')
sc.render.resolution_x=2560; sc.render.resolution_y=1440; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='PNG'; sc.render.image_settings.color_depth='8'
f0,f1=sc.frame_start,sc.frame_end; N=120
frames=[round(f0+i*(f1-f0)/(N-1)) for i in range(N)]
print("FINAL2_START orig %d-%d -> %d frames @1440p Orbitron"%(f0,f1,N),flush=True)
for i,f in enumerate(frames,1):
    out=os.path.join(OUT,"f%04d"%i)
    if os.path.exists(out+".png"): print("SKIP",i,f,flush=True); continue
    sc.frame_set(f); sc.render.filepath=out
    t=time.time(); bpy.ops.render.render(write_still=True)
    print("FINAL",i,"src",f,"%.1fs"%(time.time()-t),flush=True)
print("FINAL2_DONE",N,flush=True)
