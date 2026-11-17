const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a;const res={};
const clean=h=>h.replace(/<sup>[\s\S]*?<\/sup>/g,'').replace(/<sub>[\s\S]*?<\/sub>/g,'').replace(/<[^>]+>/g,'');
for(const kind of ['nlc','ds','tln','tl'])for(const id of Object.keys(T[kind])){let hit=0,ex='';
  for(let s=1;s<=300;s++){let q;try{q=T[kind][id].gen(new RNG(s*17+5))}catch(e){continue}
   const t=clean(JSON.stringify(q).replace(/\\"/g,'"'));
   const m=t.match(/.{15}[0-9a-zA-Zπ)\]][ ]?\/[ ]?[0-9a-zA-Z(√π].{12}/);
   if(m){hit++;if(!ex)ex=m[0]}}
  if(hit)res[id]=[hit,ex]}
for(const [k,v] of Object.entries(res))console.log(k,v[0],'|',v[1]);console.log('n',Object.keys(res).length)
