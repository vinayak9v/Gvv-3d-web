import bpy, os
sc=bpy.context.scene
sc.camera=bpy.data.objects.get('left')
sc.render.engine='BLENDER_EEVEE'
sc.render.resolution_x=1280; sc.render.resolution_y=720; sc.render.resolution_percentage=100
sc.render.image_settings.file_format='PNG'
sc.frame_set(1)
sc.render.filepath=os.path.abspath('Gvv-website--main/tools/_robot/rig_frame')
bpy.ops.render.render(write_still=True)
print("RIG_RENDER_DONE")
