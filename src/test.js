const fs=require('fs');
const vm=require('vm');
const src=fs.readFileSync(__dirname+'/core.js','utf8');
vm.runInThisContext(src+`
;globalThis.__api={T,buildExam,makeVariant,matrixOf,BLUEPRINT,Pl,RNG,STRUCTS,bpOf,structCheck};`);
const {T,buildExam,makeVariant,matrixOf,BLUEPRINT,STRUCTS,bpOf,structCheck}=globalThis.__api;
const SID=process.argv[5]||'chuan';
const ST=STRUCTS[SID]||(()=>{const a=SID.split('-').map(Number);return{n1:a[0],p1:a[1],n2:a[2],n3:a[3],p3:a[4],n4:a[5]}})();
if(structCheck(ST))throw new Error('struct: '+structCheck(ST));
let fails=0,n=0;
const bad=(m)=>{fails++; if(fails<40)console.log('FAIL',m)};
const N=+process.argv[2]||300;const DF=process.argv[3]||'chuan';
const stat={};
for(const term of (process.argv[4]||'gk1,ck1,11gk1,11ck1').split(',')){
  for(let b=0;b<N;b++){
    const base=String(100+b);
    let ex;
    try{ex=buildExam(term,base,DF,ST)}catch(e){bad(term+' '+base+' build: '+e.stack.split('\n').slice(0,3).join(' | '));continue}
    n++;
    const all=[...ex.nlc,...ex.ds,...ex.tln,...ex.tl];
    all.forEach(q=>{
      stat[q.id]=(stat[q.id]||0)+1;
      const tag=term+' '+base+' '+q.id;
      const html=JSON.stringify(q);
      if(/NaN|undefined|Infinity|\[object/.test(html))bad(tag+' có NaN/undefined: '+html.match(/.{30}(NaN|undefined|Infinity|\[object).{30}/));
      if(q.chk){let ok=false;try{ok=q.chk()}catch(e){ok='ERR '+e.message}; if(ok!==true)bad(tag+' chk='+ok)}
      if(q.kind==='nlc'){
        if(q.opts.length!==4||new Set(q.opts).size!==4)bad(tag+' options trùng '+JSON.stringify(q.opts));
        if(!(q.ans>=0&&q.ans<4))bad(tag+' ans');
      }
      if(q.kind==='ds'){const t=q.items.filter(i=>i.truth).length;if(q.items.length!==4||t<1||t>3)bad(tag+' ds truth');
        if(new Set(q.items.map(i=>i.text)).size!==4)bad(tag+' ds trùng')}
      if(q.kind==='tln'&&!Number.isFinite(q.ans))bad(tag+' tln ans');
    });
    // variants
    for(let v=1;v<4;v++){
      const vr=makeVariant(ex,v);
      vr.nlc.forEach((q,i)=>{ if(q.opts.length!==4||q.ans<0||q.ans>3)bad('variant');});
      const orig=new Set(ex.nlc.map(q=>q.stem+'|'+q.opts[q.ans]));
      vr.nlc.forEach(q=>{ if(!orig.has(q.stem+'|'+q.opts[q.ans]))bad('variant đáp án lệch '+q.id)});
    }
    if(ex.nlc.length!==ST.n1||ex.ds.length!==ST.n2||ex.tln.length!==ST.n3||ex.tl.length!==ST.n4)bad(term+' '+base+' sai số câu');
    const m=matrixOf(ex);
    const tot=Object.values(m.rows).reduce((a,r)=>a+r.pts,0);
    if(Math.abs(tot-10)>1e-9)bad(term+' '+base+' tổng điểm '+tot);
  }
}
console.log('struct',SID,'exams',n,'fails',fails);for(const term of (process.argv[4]||'gk1,ck1,11gk1,11ck1').split(','))console.log(' ',term,'cảnh báo:',JSON.stringify(bpOf(term,ST).warn||[]));
console.log(Object.entries(stat).sort().map(([k,v])=>k+':'+v).join('  '));
process.exit(fails?1:0);
