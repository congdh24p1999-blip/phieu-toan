const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a;const res={};
const clean=h=>h.replace(/<span class="fr"><span>/g,'⟦').replace(/<\/span><span>/g,'⁄').replace(/<[^>]+>/g,'');
const pats={'dấu kép':/[+−\-] [+−]|[+−]{2}|\+ −|− \+/, 'hệ số 1/0':/(^|[^\d.,\w])(1|0)<i>|(^|[ (])0<i>/, 'hai chấm/ngoặc':/\(\s*\)|,,|\.\./, 'nan':/NaN|undefined|null|Infinity/, '^ thô':/\^/,'−-':/−-|-−/, 'x^1':/<sup>1<\/sup>/, 'nhân thừa':/· ?1 ?·|·1\b(?!\d)/ };
for(const kind of ['nlc','ds','tln','tl'])for(const id of Object.keys(T[kind])){const hit={},ex={};
  for(let s=1;s<=300;s++){let q;try{q=T[kind][id].gen(new RNG(s*19+7))}catch(e){continue}
   const raw=JSON.stringify(q).replace(/\\"/g,'"');
   for(const [n,p] of Object.entries(pats)){const t=n==='x^1'||n==='hệ số 1/0'?raw:clean(raw);const m=t.match(p);if(m){hit[n]=(hit[n]||0)+1;if(!ex[n]){const i=t.search(p);ex[n]=t.slice(Math.max(0,i-30),i+40)}}}}
  for(const n in hit)(res[id]=res[id]||[]).push(n+':'+hit[n]+' «'+ex[n].replace(/\n/g,' ')+'»')}
for(const [k,v] of Object.entries(res))console.log(k,'\n   '+v.join('\n   '));console.log('n',Object.keys(res).length)
