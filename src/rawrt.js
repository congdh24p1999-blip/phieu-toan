const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a;
const strip=h=>h.replace(/<span class="rt">√<span class="ov">[\s\S]*?<\/span><\/span>/g,'');   // chỉ bỏ cấu trúc rt (không lồng)
const res={};
for(const kind of ['nlc','ds','tln','tl'])for(const id of Object.keys(T[kind])){
  let hit=0,tot=0,ex='';
  for(let s=1;s<=400;s++){let q;try{q=T[kind][id].gen(new RNG(s*13+1))}catch(e){continue}tot++;
    const h=JSON.stringify(q);const t=h.replace(/<span class=\\"rt\\">√/g,'');
    if(/√|\\u221a|sqrt|\\sqrt/.test(t)){hit++;if(!ex){const m=t.match(/.{40}(√|sqrt).{40}/);ex=m?m[0]:''}}}
  if(hit)res[id]=[T[kind][id].g||'', hit+'/'+tot, ex];
}
for(const [k,v] of Object.entries(res))console.log(k,v[0],v[1],'|',v[2].replace(/\\"/g,'"'));
console.log('số template có √ thô:',Object.keys(res).length);
