const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a;let tot=0;
for(const kind of ['nlc','ds','tln','tl']){
 for(const id of Object.keys(T[kind]).filter(i=>new RegExp(process.argv[2]||"^(m|ds|t|tl)11-[6-9]-").test(i))){
  let bad=0,err=0,n=0,msgs=new Set();
  for(let s=1;s<=3000;s++){const r=new RNG(s*7+3);let q;
   try{q=T[kind][id].gen(r)}catch(e){err++;msgs.add(e.message.slice(0,90));continue}
   n++;const h=JSON.stringify(q);
   if(/NaN|undefined|Infinity|\[object/.test(h)){bad++;msgs.add('NaN/undef '+(h.match(/.{25}(NaN|undefined|Infinity|\[object).{25}/)||[''])[0]);continue}
   let ok;try{ok=q.chk?q.chk():true}catch(e){ok='ERR '+e.message}
   if(ok!==true){bad++;msgs.add('chk '+ok)}
   if(kind==='nlc'&&new Set(q.opts).size!==4){bad++;msgs.add('dup opts')}
   if(kind==='ds'){const t=q.items.filter(i=>i.truth).length;if(t<1||t>3||new Set(q.items.map(i=>i.text)).size!==4){bad++;msgs.add('ds')}}
  }
  tot+=bad+err;
  if(bad||err||n<2900)console.log(id,'n',n,'bad',bad,'err',err,[...msgs].slice(0,3));
 }}
console.log('TOTAL problems',tot);
