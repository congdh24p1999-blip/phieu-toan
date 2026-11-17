const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a;const st=h=>String(h).replace(/<span class="fr"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'($1)/($2)').replace(/<sup>(.*?)<\/sup>/g,'^($1)').replace(/<sub>(.*?)<\/sub>/g,'_$1').replace(/<[^>]+>/g,'');
for(const id of process.argv.slice(2)){const q=T.ds[id].gen(new RNG(11));console.log('##',id);console.log(st(q.stem));q.items.forEach((it,i)=>console.log(' ','abcd'[i],it.truth?'Đ':'S',st(it.text),'||',st(it.why||'')));}
