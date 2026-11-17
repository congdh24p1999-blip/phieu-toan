const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.Z={T,RNG};');
const S_=h=>String(h).replace(/<[^>]+>/g,'');const re=new RegExp(process.argv[2]);
for(const k of ['nlc','ds','tln','tl'])for(const [id,t] of Object.entries(Z.T[k])){let hit=0,ex='';for(let s=1;s<60;s++){let q;try{q=t.gen(new Z.RNG(s))}catch(e){continue}const h=S_(JSON.stringify(q));const m=h.match(re);if(m){hit++;ex=h.slice(Math.max(0,m.index-50),m.index+60)}}if(hit)console.log((t.g||8)+'/'+t.ch+(t.hk?'/hk'+t.hk:''),id,hit,'|',ex)}
