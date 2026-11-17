const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a;const st=h=>String(h).replace(/<span class="fr"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'($1)/($2)').replace(/<sup>(.*?)<\/sup>/g,'^($1)').replace(/<sub>(.*?)<\/sub>/g,'_$1').replace(/<[^>]+>/g,'');
for(const [k,id] of process.argv.slice(2).map(x=>x.split(':'))){const q=T[k][id].gen(new RNG(5));console.log('##',id);
 if(q.stem)console.log(st(q.stem));if(q.opts)console.log(q.opts.map((o,i)=>'ABCD'[i]+'. '+st(o)).join(' | '),'ans',q.ans);if(q.ans!==undefined&&q.kind==='tln')console.log('ans',q.ans);
 if(q.parts)q.parts.forEach((p,i)=>console.log(' part',i,st(p.html)));
 if(q.sol)(Array.isArray(q.sol)?q.sol:[q.sol]).forEach(s=>console.log(' sol:',st(typeof s==='string'?s:JSON.stringify(s))));}
