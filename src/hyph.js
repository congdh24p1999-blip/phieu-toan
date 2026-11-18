/* Tìm dấu trừ ASCII "-" trước chữ số trong nội dung hiển thị (bỏ qua SVG): node hyph.js '<regex id>' */
const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a,want=new RegExp(process.argv[2]||'.');let n=0;
const clean=h=>h.replace(/<svg[\s\S]*?<\/svg>/g,'').replace(/<[^>]+>/g,'');
for(const kind of ['nlc','ds','tln','tl'])for(const id of Object.keys(T[kind])){if(!want.test(id))continue;let hit=0,ex='';
  for(let s=1;s<=300;s++){let q;try{q=T[kind][id].gen(new RNG(s*23+3))}catch(e){continue}
    const t=clean(JSON.stringify({...q,ans:0}).replace(/\\"/g,'"'));const m=t.match(/.{0,25}(^|[^\w.])-\d.{0,15}/);if(m){hit++;if(!ex)ex=m[0]}}
  if(hit){n++;console.log(id,hit,'|',ex)}}
console.log('n',n);
