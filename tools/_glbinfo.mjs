import { readFileSync } from 'fs';
function glbJson(path){
  const buf = readFileSync(path);
  // GLB: magic(4) version(4) length(4) then chunks: len(4) type(4) data
  let off = 12;
  const clen = buf.readUInt32LE(off); const ctype = buf.readUInt32LE(off+4);
  const json = JSON.parse(buf.slice(off+8, off+8+clen).toString('utf8'));
  return json;
}
for (const f of process.argv.slice(2)){
  try{
    const j = glbJson(f);
    const meshes = (j.meshes||[]).map(m=>m.name).filter(Boolean);
    const nodes = (j.nodes||[]).map(n=>n.name).filter(Boolean);
    const mats = (j.materials||[]).map(m=>({n:m.name, base:m.pbrMetallicRoughness?.baseColorFactor, tex: !!m.pbrMetallicRoughness?.baseColorTexture}));
    const anims = (j.animations||[]).map(a=>a.name).filter(Boolean);
    const eyeNodes = nodes.filter(n=>/eye|pupil|iris/i.test(n));
    const eyeMeshes = meshes.filter(n=>/eye|pupil|iris/i.test(n));
    console.log('==== '+f+' ====');
    console.log('  #nodes='+nodes.length+' #meshes='+meshes.length+' #mats='+mats.length+' #anims='+(j.animations||[]).length+' #images='+(j.images||[]).length);
    console.log('  anims:', anims.join(', ')||'(none)');
    console.log('  eye nodes:', eyeNodes.join(', ')||'(none)');
    console.log('  eye meshes:', eyeMeshes.join(', ')||'(none)');
    console.log('  materials:', mats.map(m=>m.n+(m.tex?'[tex]':'')+(m.base?'['+m.base.map(x=>x.toFixed?.(2)??x).join(',')+']':'')).join(' | '));
  }catch(e){ console.log('ERR '+f+': '+e.message); }
}
