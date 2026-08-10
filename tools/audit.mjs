import { readdirSync, statSync, readFileSync } from 'fs';
function walk(d){let r=[];for(const e of readdirSync(d,{withFileTypes:true})){const p=d+'/'+e.name;if(e.isDirectory())r=r.concat(walk(p));else r.push(p);}return r;}
const allSrc = walk('src').map(f=>{try{return readFileSync(f,'utf8');}catch{return'';}}).join('\n');
const files=readdirSync('public').filter(f=>{try{return statSync('public/'+f).isFile();}catch{return false;}});
const rows=[];
for(const f of files){
  const sz=statSync('public/'+f).size;
  if(sz<400*1024) continue;
  const base=f.replace(/\.[^.]*$/,'');
  const used = allSrc.includes(f)||allSrc.includes(encodeURIComponent(f))||allSrc.includes(base);
  rows.push([sz,f,used]);
}
rows.sort((a,b)=>b[0]-a[0]);
let unused=0;
for(const [sz,f,u] of rows){ if(!u)unused+=sz; console.log(`${(sz/1048576).toFixed(2)}MB  ${u?'USED  ':'UNUSED'}  ${f}`); }
console.log(`\nUNUSED_TOTAL ${(unused/1048576).toFixed(1)}MB across ${rows.filter(r=>!r[2]).length} files`);
