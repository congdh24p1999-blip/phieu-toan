const fs=require('fs'),vm=require('vm');
const run=f=>{const c={};vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/'+f,'utf8')+';this.A={T,RNG};',c);return c.A};
const A=run('core_prev.js'),B=run('core.js');const ser=q=>JSON.stringify(q,(k,v)=>typeof v==='function'?undefined:v);const diff={};let n=0;
for(const k of ['nlc','ds','tln','tl'])for(const id of Object.keys(A.T[k])){n++;if(!B.T[k][id]){diff[id]='MẤT';continue}
 for(let s=1;s<=60;s++){let a,b;try{a=ser(A.T[k][id].gen(new A.RNG('c'+s)))}catch(e){a='E'}try{b=ser(B.T[k][id].gen(new B.RNG('c'+s)))}catch(e){b='E'}if(a!==b){diff[id]=(diff[id]||0)+1}}}
console.log('template cũ',n,'thay đổi:',diff);
