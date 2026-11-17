/* Đếm số dạng khác nhau ở mỗi vị trí câu (sinh 150 đề cho mỗi loại đề, mỗi mức độ) */
const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.Z={buildExam,BLUEPRINT};');
const want=process.argv[2]?new RegExp(process.argv[2]):/./,N=+process.argv[3]||150;let one=0,tot=0;
for(const term of Object.keys(Z.BLUEPRINT)){if(!want.test(term))continue;for(const d of ['co_ban','chuan','nang_cao']){const ids={};
  for(let b=1;b<=N;b++){const e=Z.buildExam(term,String(b),d);['nlc','ds','tln','tl'].forEach(k=>e[k].forEach((q,i)=>{const key=k+(i+1);(ids[key]=ids[key]||{})[q.id]=((ids[key]||{})[q.id]||0)+1}))}
  for(const k in ids){tot++;const n=Object.keys(ids[k]).length;if(n===1){one++;console.log(`${term}/${d}/${k}: chỉ 1 dạng (${Object.keys(ids[k])[0]})`)}}}}
console.log(`Vị trí chỉ có 1 dạng: ${one}/${tot}`);
