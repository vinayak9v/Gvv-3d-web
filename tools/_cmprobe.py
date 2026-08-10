import bpy
sc=bpy.context.scene
vs=sc.view_settings
print("VIEW_TRANSFORM", vs.view_transform)
print("CURRENT_LOOK", vs.look)
print("EXPOSURE", vs.exposure, "GAMMA", vs.gamma)
print("ENGINE", sc.render.engine)
try:
    print("EEVEE_SAMPLES", sc.eevee.taa_render_samples)
except Exception as e:
    print("samples_err", e)
