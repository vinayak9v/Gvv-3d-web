import bpy, os
from mathutils import Vector
sc=bpy.context.scene
OUT=os.path.abspath("tools/_fonts"); os.makedirs(OUT,exist_ok=True)

LABELS={
 "lab_4:typeMesh1":"ROBOTICS LAB",
 "lab_4:typeMesh2":"10TH TO 12TH GRADE",
 "typeMesh1":"ROBOTIC HANDS",
 "typeMesh2":"DISMANTLED\nROBOTIC BODY",
 "typeMesh3":"ROBOTIC ENGINES",
 "typeMesh4":"IOT CHIPS",
 "typeMesh5":"RASPBERRY PI",
 "typeMesh6":"SENSORS",
 "typeMesh7":"ENGINE MODULES",
}
# hide original baked-text meshes from render
for name in LABELS:
    o=bpy.data.objects.get(name)
    if o: o.hide_render=True

FONTS={
 "orbitron": os.path.abspath("../fonts/Orbitron.ttf"),
 "rajdhani": os.path.abspath("../fonts/Rajdhani-SemiBold.ttf"),
 "exo2":     os.path.abspath("../fonts/Exo2-Bold.ttf"),
 "bahnschrift": "C:/Windows/Fonts/bahnschrift.ttf",
}

def local_bbox(o):
    bb=[Vector(c) for c in o.bound_box]
    mn=Vector((min(c.x for c in bb),min(c.y for c in bb),min(c.z for c in bb)))
    mx=Vector((max(c.x for c in bb),max(c.y for c in bb),max(c.z for c in bb)))
    return mn,mx

def rebuild(old, text, font):
    M=old.matrix_world.copy(); msc=M.to_scale()
    mn,mx=local_bbox(old); cen=(mn+mx)/2
    oW=(mx.x-mn.x)*msc.x; oH=(mx.y-mn.y)*msc.y; oThk=(mx.z-mn.z)*msc.z
    cur=bpy.data.curves.new(old.name+"_F",'FONT')
    cur.body=text; cur.font=font; cur.align_x='CENTER'; cur.align_y='CENTER'
    nt=bpy.data.objects.new(old.name+"__FONT",cur)
    old.users_collection[0].objects.link(nt)
    bpy.context.view_layer.update()
    nmn,nmx=local_bbox(nt); nW=nmx.x-nmn.x; nH=nmx.y-nmn.y
    if nW<=0: nW=1
    if nH<=0: nH=1
    s=min(oW/nW, oH/nH)
    cur.extrude=max(oThk/(2*s),0.0005)
    nt.rotation_mode='QUATERNION'; nt.rotation_quaternion=M.to_quaternion()
    nt.scale=(s,s,s)
    nt.location=M @ cen
    if old.data.materials and old.data.materials[0]:
        cur.materials.append(old.data.materials[0])
    return nt

# Cycles fast samples
sc.render.engine='CYCLES'; sc.cycles.samples=48; sc.cycles.use_denoising=True; sc.cycles.device='CPU'
prefs=bpy.context.preferences.addons['cycles'].preferences
try: prefs.compute_device_type='HIP'; prefs.get_devices()
except: pass
for d in prefs.devices: d.use=(d.type=='CPU')
sc.render.resolution_x=2560; sc.render.resolution_y=1440
sc.render.image_settings.file_format='PNG'
sc.frame_set(1)

for key,path in FONTS.items():
    if not os.path.exists(path):
        print("MISSING_FONT",key,path,flush=True); continue
    fnt=bpy.data.fonts.load(path)
    made=[rebuild(bpy.data.objects[n], LABELS[n], fnt) for n in LABELS if bpy.data.objects.get(n)]
    sc.render.filepath=os.path.join(OUT,"hq_%s"%key)
    bpy.ops.render.render(write_still=True)
    print("FONT_RENDER",key,flush=True)
    for o in made:
        c=o.data; bpy.data.objects.remove(o,do_unlink=True); bpy.data.curves.remove(c)
print("FONTS_DONE",flush=True)
