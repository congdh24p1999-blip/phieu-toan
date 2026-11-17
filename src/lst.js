const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.Z={T,RNG,BLUEPRINT};');
const {T,RNG}=Z;const st=h=>String(h).replace(/<svg.*?<\/svg>/gs,'[H]').replace(/<span class="fr"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'($1)/($2)').replace(/<sup>(.*?)<\/sup>/g,'^$1').replace(/<sub>(.*?)<\/sub>/g,'_$1').replace(/<[^>]+>/g,'').replace(/\s+/g,' ');
const re=new RegExp(process.argv[2]);
for(const k of ['nlc','ds','tln','tl'])for(const id in T[k]){if(!re.test(id))continue;const t=T[k][id];let q;try{q=t.gen(new RNG('x'))}catch(e){q={stem:'ERR'}}
 const s=q.stem||(q.title+': '+(q.parts||[]).map(p=>p.html).join(' | '));console.log(`${t.ch}\t${k}\t${t.lv}\t${id}${t.ext?' [ext]':''}\t${st(s).slice(0,170)}`)}
