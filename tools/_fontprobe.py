import bpy
print("=== FONT DATABLOCKS (bpy.data.fonts) ===")
for f in bpy.data.fonts:
    print("FONT", repr(f.name), "filepath=", f.filepath)
print("=== FONT (text) OBJECTS across all scenes ===")
n=0
for o in bpy.data.objects:
    if o.type=='FONT':
        n+=1
        print("TEXTOBJ", repr(o.name), "body=", repr(o.data.body[:40]), "font=", o.data.font.name if o.data.font else None)
print("TOTAL_TEXT_OBJECTS", n)
print("=== image textures whose name hints at labels ===")
import re
kw=re.compile(r'(robot|hand|iot|chip|raspberry|sensor|engine|lab|dismantl|grade|module)', re.I)
for img in bpy.data.images:
    if kw.search(img.name):
        print("IMG", repr(img.name), img.size[0],"x",img.size[1], "file=", img.filepath)
print("TOTAL_IMAGES", len(bpy.data.images))
