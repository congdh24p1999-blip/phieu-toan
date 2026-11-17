const fs=require('fs'),vm=require('vm');
const run=f=>{const c={};vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8')+';this.A={buildExam};',c);return c.A};
for(const f of ['core.js']){const A=run(f);const r={};
for(const t of ['gk1','ck1','7gk1','7ck1','11gk1','11ck1','7gk2','7ck2','11gk2','11ck2','gk2','ck2'])for(const d of ['co_ban','chuan','nang_cao']){let dup=0,ex=0,N=300;for(let b=0;b<N;b++){const e=A.buildExam(t,String(100+b),d);const ids=[...e.nlc,...e.ds,...e.tln,...e.tl].map(q=>q.kind+q.id);const k=ids.length-new Set(ids).size;dup+=k;if(k)ex++}if(dup)r[t+' '+d]=ex+'/'+N}
console.log(f,JSON.stringify(r))}
