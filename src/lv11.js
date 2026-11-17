const fs=require('fs'),vm=require('vm');vm.runInThisContext(fs.readFileSync(__dirname+'/core.js','utf8')+';globalThis.A={buildExam,lvPts};');
for(const t of (process.argv[2]||'11gk1,11ck1').split(','))for(const d of ['co_ban','chuan','nang_cao']){const s={NB:0,TH:0,VD:0,VDC:0};const N=300;for(let b=0;b<N;b++){const p=A.lvPts(A.buildExam(t,String(100+b),d));for(const k in s)s[k]+=p[k]/N}
console.log(t,d,Object.entries(s).map(([k,v])=>k+' '+(v*10).toFixed(0)+'%').join('  '))}
