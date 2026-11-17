const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.Z={T,RNG};');
const ids=process.argv.slice(2);let h='<html><body style="font-family:serif">';
for(const s of ids){const [k,id,seed]=s.split(':');const q=Z.T[k][id].gen(new Z.RNG(seed||'1'));const t=(q.stem||'')+(q.parts?q.parts.map(p=>p.html).join('<br>'):'');h+=`<h4>${id}</h4>`+t}
fs.writeFileSync(__dirname+'/figs.html',h+'</body></html>');
