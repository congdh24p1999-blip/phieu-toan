const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.Z={buildExam,STRUCTS,BLUEPRINT,setExt:v=>{ALLOW_EXT=v}};');
const terms=Object.keys(Z.BLUEPRINT),res={};let err=0;
for(const allow of [false,true]){Z.setExt(allow);
 for(const d of ['co_ban','chuan','nang_cao'])for(const term of terms)for(const sk of Object.keys(Z.STRUCTS))for(let s=100;s<130;s++){
  let ex;try{ex=Z.buildExam(term,String(s),d,Z.STRUCTS[sk])}catch(e){err++;if(err<5)console.log('LỖI',allow,d,term,sk,e.message);continue}
  const n=[...ex.nlc,...ex.ds,...ex.tln,...ex.tl].filter(q=>q.ext).length;const k=`${allow?'bật':'tắt'}/${d}`;res[k]=res[k]||{de:0,coExt:0,cau:0};res[k].de++;if(n){res[k].coExt++;res[k].cau+=n}}}
console.log('lỗi',err);console.log(res);
