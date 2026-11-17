
/* ================================================================
   LỚP 11 – Toán 11 Kết nối tri thức, học kì I
   Phần dùng chung + Chương I (Hàm số lượng giác, phương trình lượng giác)
   ================================================================ */
const sub=s=>`<sub>${s}</sub>`;
const rt=s=>`<span class="rt">√<span class="ov">${s}</span></span>`;
const lim=(v,to)=>`<span class="lm">lim<small>${v}→${to}</small></span>`;
const cases=(...rows)=>`<span class="cs"><span class="br">{</span><span class="rows">${rows.map(x=>`<span>${x}</span>`).join('')}</span></span>`;
const INF='∞',PINF='+∞',NINF='−∞';
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const Q=(n,d=1)=>{if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;return[n/g,d/g]};
const qadd=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const qsub=(a,b)=>Q(a[0]*b[1]-b[0]*a[1],a[1]*b[1]);
const qmul=(a,b)=>Q(a[0]*b[0],a[1]*b[1]);
const qdiv=(a,b)=>Q(a[0]*b[1],a[1]*b[0]);
const qeq=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const qv=q=>q[0]/q[1];
const qh=q=>q[1]===1?sg(q[0]):(q[0]<0?MINUS:'')+fr(Math.abs(q[0]),q[1]);
/* bội của π: [n,d] ứng với (n/d)·π */
const radH=q=>{
  if(q[0]===0)return'0';
  const s=q[0]<0?MINUS:'',a=Math.abs(q[0]),top=a===1?'π':a+'π';
  return q[1]===1?s+top:s+fr(top,q[1]);
};
const radV=q=>q[0]/q[1]*Math.PI;
const K=I('k');
const near=(a,b,e=1e-9)=>Math.abs(a-b)<e;
const r2=v=>Math.round(v*100)/100;
const r1=v=>Math.round(v*10)/10;
const decH=v=>fmt(v);

const N11=(id,ch,lv,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:11,sec});
const DS11=(id,ch,lv,gen,sec)=>reg('ds',id,ch,lv,gen,{g:11,sec});
const TLN11=(id,ch,lv,gen,sec)=>reg('tln',id,ch,lv,gen,{g:11,sec});
const TL11=(id,ch,lv,role,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:11,sec});

/* Trắc nghiệm với đáp án là số hữu tỉ [n,d]; hf là hàm hiển thị (mặc định phân số). */
function mkF(r,o){
  const hf=o.hf||qh,seen=new Set([hf(o.correct)]),wr=[];
  const push=q=>{if(!q||!Number.isFinite(q[0]))return;const h=hf(q);if(!seen.has(h)){seen.add(h);wr.push(h)}};
  for(const c of r.shuffle(o.cands||[])){if(wr.length<3)push(c)}
  for(let k=1;wr.length<3&&k<40;k++){push(Q(o.correct[0]+k,o.correct[1]));if(wr.length<3)push(Q(o.correct[0]-k,o.correct[1]))}
  return mkTxt(r,{stem:o.stem,correct:hf(o.correct),wrongs:wr,sol:o.sol,chk:o.chk});
}

/* Giá trị lượng giác đặc biệt: [html, số] */
const SQ2=Math.SQRT2,SQ3=Math.sqrt(3);
const SVAL=[['0',0],[fr(1,2),.5],[fr(rt(2),2),SQ2/2],[fr(rt(3),2),SQ3/2],['1',1],[rt(3),SQ3],[fr(rt(3),3),SQ3/3]];
const SVALL=[];SVAL.forEach(([h,v])=>{SVALL.push([h,v]);if(v)SVALL.push([MINUS+h,-v])});
const svOf=v=>SVALL.find(z=>near(z[1],v,1e-9));
const TRIG={sin:Math.sin,cos:Math.cos,tan:Math.tan,cot:x=>1/Math.tan(x)};
const trigH=(fn,arg)=>`${fn}${arg.startsWith('(')?'':' '}${arg}`;

/* Nghiệm của sin u = m / cos u = m trên [lo, hi] (đóng) */
function solveTrig(fn,m,lo,hi){
  if(Math.abs(m)>1+1e-12)return[];
  const a=fn==='sin'?Math.asin(Math.max(-1,Math.min(1,m))):Math.acos(Math.max(-1,Math.min(1,m)));
  const base=fn==='sin'?[a,Math.PI-a]:[a,-a],out=[];
  for(let k=-6;k<=6;k++)for(const b of base){
    const x=b+2*Math.PI*k;
    if(x>=lo-1e-9&&x<=hi+1e-9&&!out.some(y=>near(x,y,1e-7)))out.push(x);
  }
  return out.sort((p,q)=>p-q);
}
const INTERVALS=[
  {h:`[0; 2π]`,lo:0,hi:2*Math.PI,t:'đoạn [0; 2π]'},
  {h:`[0; π]`,lo:0,hi:Math.PI,t:'đoạn [0; π]'},
  {h:`[−π; π]`,lo:-Math.PI,hi:Math.PI,t:'đoạn [−π; π]'}
];
const MVALS=[[Q(-1),'−1'],[Q(-1,2),MINUS+fr(1,2)],[Q(0),'0'],[Q(1,2),fr(1,2)],[Q(1),'1']];

/* ---------- Chương I ---------- */
N11('k1-deg2rad',1,'NB',r=>{
  const deg=r.pick([15,30,36,45,60,72,75,90,108,120,135,144,150,210,225,240,270,300,315,330]);
  const q=Q(deg,180);
  return mkF(r,{hf:radH,
    stem:`Đổi số đo ${deg}° sang radian, ta được`,correct:q,
    cands:[Q(180,deg),Q(deg,360),Q(deg+30,180),Q(deg*2,180),Q(180-deg,180),Q(deg-30,180),Q(deg,90)],
    sol:`${deg}° = ${deg}·${fr('π',180)} = ${radH(q)} (rad).`,
    chk:()=>near(radV(q),deg*Math.PI/180)});
});
N11('k1-rad2deg',1,'NB',r=>{
  const deg=r.pick([15,30,36,45,60,72,75,90,108,120,135,144,150,210,225,240,270,300,315,330]);
  const q=Q(deg,180);
  return mkNum(r,{stem:`Đổi số đo ${radH(q)} rad sang độ, ta được`,correct:deg,f:v=>v+'°',ok:c=>c>0,
    cands:[deg*2,deg/2,180-deg,deg+30,deg-30,360-deg,deg+15],
    sol:`${radH(q)} rad = ${radH(q)}·${fr(180,'π')}° = ${deg}°.`,
    chk:()=>near(radV(q)*180/Math.PI,deg)});
});
N11('k1-arc',1,'TH',r=>{
  const R=r.pick([3,4,5,6,8,9,10,12]),d=r.pick([2,3,4,6]),n=r.pick([1,1,2,3,5]),a=Q(n,d),l=Q(R*n,d);
  return mkF(r,{hf:q=>radH(q)+' cm',
    stem:`Một cung tròn của đường tròn bán kính ${R} cm có số đo ${radH(a)} rad. Độ dài của cung tròn đó là`,correct:l,
    cands:[a,Q(R*n,d*2),Q(R*n*2,d),Q(R+n,d),Q(n,d*R)],
    sol:`Độ dài cung ℓ = R·α = ${R}·${radH(a)} = ${radH(l)} (cm).`,
    chk:()=>near(radV(l),R*radV(a))});
});
N11('k1-special',1,'NB',r=>{
  const fn=r.pick(['sin','cos','tan']),deg=r.pick([30,45,60,120,135,150,210,225,240,300,315,330]),q=Q(deg,180);
  const v=TRIG[fn](deg*Math.PI/180),c=svOf(v);
  if(!c)throw new Error('không khớp giá trị đặc biệt');
  const wr=r.shuffle(SVALL.filter(z=>!near(z[1],c[1]))).slice(0,3).map(z=>z[0]);
  const quad=deg<90?1:deg<180?2:deg<270?3:4,ref=deg<90?deg:deg<180?180-deg:deg<270?deg-180:360-deg;
  const sgn=v<0?'âm':'dương';
  return mkTxt(r,{stem:`Giá trị của ${fn} ${radH(q)} bằng`,correct:c[0],wrongs:wr,
    sol:`Góc ${radH(q)} (${deg}°) thuộc góc phần tư thứ ${['','I','II','III','IV'][quad]} nên ${fn} mang dấu ${sgn}; góc tham chiếu là ${ref}°. Vậy ${fn} ${radH(q)} = ${c[0]}.`,
    chk:()=>near(TRIG[fn](radV(q)),c[1],1e-9)});
});
N11('k1-sign',1,'NB',r=>{
  const quad=r.int(1,4),pair=r.pick([['sin','cos'],['sin','tan'],['cos','tan']]);
  const rng={1:`0 < ${I('α')} < ${radH(Q(1,2))}`,2:`${radH(Q(1,2))} < ${I('α')} < π`,3:`π < ${I('α')} < ${radH(Q(3,2))}`,4:`${radH(Q(3,2))} < ${I('α')} < 2π`}[quad];
  const sc={1:[1,1],2:[1,-1],3:[-1,-1],4:[-1,1]}[quad];
  const sv={sin:sc[0],cos:sc[1],tan:sc[0]*sc[1]};
  const sgnTxt=s=>s>0?'> 0':'< 0';
  const text=(a,b)=>`${pair[0]} ${I('α')} ${sgnTxt(a)} và ${pair[1]} ${I('α')} ${sgnTxt(b)}`;
  const all=[[1,1],[1,-1],[-1,1],[-1,-1]],correct=text(sv[pair[0]],sv[pair[1]]);
  return mkTxt(r,{stem:`Cho ${rng}. Khẳng định nào sau đây đúng?`,correct,wrongs:all.map(([a,b])=>text(a,b)).filter(t=>t!==correct),
    sol:`Với ${rng} (góc phần tư thứ ${['','I','II','III','IV'][quad]}): sin ${sv.sin>0?'> 0':'< 0'}, cos ${sv.cos>0?'> 0':'< 0'}, tan ${sv.tan>0?'> 0':'< 0'}.`,
    chk:()=>{const a=[0.4,1.9,3.6,5.2][quad-1];return Math.sign(TRIG[pair[0]](a))===sv[pair[0]]&&Math.sign(TRIG[pair[1]](a))===sv[pair[1]]}});
});
const FORMULAS=[
  ['sin(α + β) = sin α cos β + cos α sin β',(a,b)=>Math.sin(a+b),(a,b)=>Math.sin(a)*Math.cos(b)+Math.cos(a)*Math.sin(b)],
  ['sin(α − β) = sin α cos β − cos α sin β',(a,b)=>Math.sin(a-b),(a,b)=>Math.sin(a)*Math.cos(b)-Math.cos(a)*Math.sin(b)],
  ['cos(α + β) = cos α cos β − sin α sin β',(a,b)=>Math.cos(a+b),(a,b)=>Math.cos(a)*Math.cos(b)-Math.sin(a)*Math.sin(b)],
  ['cos(α − β) = cos α cos β + sin α sin β',(a,b)=>Math.cos(a-b),(a,b)=>Math.cos(a)*Math.cos(b)+Math.sin(a)*Math.sin(b)],
  ['sin 2α = 2 sin α cos α',(a)=>Math.sin(2*a),(a)=>2*Math.sin(a)*Math.cos(a)],
  ['cos 2α = cos²α − sin²α',(a)=>Math.cos(2*a),(a)=>Math.cos(a)**2-Math.sin(a)**2],
  ['cos 2α = 2cos²α − 1',(a)=>Math.cos(2*a),(a)=>2*Math.cos(a)**2-1],
  ['cos 2α = 1 − 2sin²α',(a)=>Math.cos(2*a),(a)=>1-2*Math.sin(a)**2],
  ['sin²α + cos²α = 1',(a)=>Math.sin(a)**2+Math.cos(a)**2,()=>1],
  ['sin(α + β) = sin α cos β − cos α sin β',(a,b)=>Math.sin(a+b),(a,b)=>Math.sin(a)*Math.cos(b)-Math.cos(a)*Math.sin(b)],
  ['sin(α − β) = sin α cos β + cos α sin β',(a,b)=>Math.sin(a-b),(a,b)=>Math.sin(a)*Math.cos(b)+Math.cos(a)*Math.sin(b)],
  ['cos(α + β) = cos α cos β + sin α sin β',(a,b)=>Math.cos(a+b),(a,b)=>Math.cos(a)*Math.cos(b)+Math.sin(a)*Math.sin(b)],
  ['cos(α − β) = cos α cos β − sin α sin β',(a,b)=>Math.cos(a-b),(a,b)=>Math.cos(a)*Math.cos(b)-Math.sin(a)*Math.sin(b)],
  ['sin 2α = sin α + cos α',(a)=>Math.sin(2*a),(a)=>Math.sin(a)+Math.cos(a)],
  ['sin 2α = 2 sin α',(a)=>Math.sin(2*a),(a)=>2*Math.sin(a)],
  ['cos 2α = cos²α + sin²α',(a)=>Math.cos(2*a),(a)=>Math.cos(a)**2+Math.sin(a)**2],
  ['cos 2α = 2sin²α − 1',(a)=>Math.cos(2*a),(a)=>2*Math.sin(a)**2-1],
  ['cos 2α = 2cos α − 1',(a)=>Math.cos(2*a),(a)=>2*Math.cos(a)-1],
  ['sin²α − cos²α = 1',(a)=>Math.sin(a)**2-Math.cos(a)**2,()=>1],
  ['sin²α + cos²α = 2',(a)=>Math.sin(a)**2+Math.cos(a)**2,()=>2]
];
const holds=f=>[[.7,.4],[1.3,-.5],[2.2,.9]].every(([a,b])=>near(f[1](a,b),f[2](a,b),1e-9));
N11('k1-formula',1,'NB',r=>{
  const T=FORMULAS.filter(holds),F=FORMULAS.filter(f=>!holds(f));
  const ok=r.pick(T),bad=r.shuffle(F).slice(0,3);
  return mkTxt(r,{stem:'Công thức nào sau đây đúng với mọi góc lượng giác α, β?',correct:ok[0],wrongs:bad.map(b=>b[0]),
    sol:`Công thức đúng: ${ok[0]}. Ba công thức còn lại sai dấu hoặc sai hệ số.`,
    chk:()=>holds(ok)&&bad.every(b=>!holds(b))});
});
const DOMS={
  'k':K+'π','p2':`${fr('π',2)} + ${K}π`,'p4':`${fr('π',4)} + ${fr(K+'π',2)}`,'k2':fr(K+'π',2),'k2pi':K+'2π','p2b':`${fr('π',2)} + ${K}2π`
};
const domH=key=>key==='R'?'ℝ':`ℝ \\ {${DOMS[key]}, ${K} ∈ ℤ}`;
const DOMFN=[
  {h:`${I('y')} = tan ${I('x')}`,key:'p2',den:x=>Math.cos(x),zeros:k=>Math.PI/2+k*Math.PI},
  {h:`${I('y')} = cot ${I('x')}`,key:'k',den:x=>Math.sin(x),zeros:k=>k*Math.PI},
  {h:`${I('y')} = ${fr(1,'sin '+I('x'))}`,key:'k',den:x=>Math.sin(x),zeros:k=>k*Math.PI},
  {h:`${I('y')} = ${fr(1,'cos '+I('x'))}`,key:'p2',den:x=>Math.cos(x),zeros:k=>Math.PI/2+k*Math.PI},
  {h:`${I('y')} = tan 2${I('x')}`,key:'p4',den:x=>Math.cos(2*x),zeros:k=>Math.PI/4+k*Math.PI/2},
  {h:`${I('y')} = cot 2${I('x')}`,key:'k2',den:x=>Math.sin(2*x),zeros:k=>k*Math.PI/2},
  {h:`${I('y')} = ${fr(1,'1 − cos '+I('x'))}`,key:'k2pi',den:x=>1-Math.cos(x),zeros:k=>2*k*Math.PI},
  {h:`${I('y')} = ${fr(1,'1 − sin '+I('x'))}`,key:'p2b',den:x=>1-Math.sin(x),zeros:k=>Math.PI/2+2*k*Math.PI}
];
N11('k1-domain',1,'TH',r=>{
  const f=r.pick(DOMFN),keys=Object.keys(DOMS).filter(k=>k!==f.key);
  const wr=r.shuffle([...keys.map(domH),'ℝ']).slice(0,3);
  return mkTxt(r,{stem:`Tập xác định của hàm số ${f.h} là`,correct:domH(f.key),wrongs:wr,
    sol:`Hàm số xác định khi mẫu (hoặc cos, sin tương ứng) khác 0. Mẫu bằng 0 tại ${DOMS[f.key]}; do đó tập xác định là ${domH(f.key)}.`,
    chk:()=>[-2,-1,0,1,2].every(k=>near(f.den(f.zeros(k)),0,1e-9))&&[.37,1.11,2.9].every(x=>Math.abs(f.den(x))>1e-6)});
});
const PARF=[
  ['cos '+I('x'),x=>Math.cos(x)],['cos 2'+I('x'),x=>Math.cos(2*x)],['|sin '+I('x')+'|',x=>Math.abs(Math.sin(x))],['sin'+sup(2)+' '+I('x'),x=>Math.sin(x)**2],
  [I('x')+' sin '+I('x'),x=>x*Math.sin(x)],[I('x')+sup(2)+' + cos '+I('x'),x=>x*x+Math.cos(x)],
  ['sin '+I('x'),x=>Math.sin(x)],['tan '+I('x'),x=>Math.tan(x)],['sin 2'+I('x'),x=>Math.sin(2*x)],[I('x')+' cos '+I('x'),x=>x*Math.cos(x)],
  [I('x')+sup(3),x=>x**3],[I('x')+' + sin '+I('x'),x=>x+Math.sin(x)],
  ['sin '+I('x')+' + cos '+I('x'),x=>Math.sin(x)+Math.cos(x)],[I('x')+' + cos '+I('x'),x=>x+Math.cos(x)],['1 + sin '+I('x'),x=>1+Math.sin(x)],
  [I('x')+sup(2)+' + sin '+I('x'),x=>x*x+Math.sin(x)],['tan '+I('x')+' + 1',x=>Math.tan(x)+1],['cos '+I('x')+' + sin 2'+I('x'),x=>Math.cos(x)+Math.sin(2*x)]
].map(([h,f])=>({h:I('y')+' = '+h,f,par:[.6,1.1,2.3].every(x=>near(f(-x),f(x),1e-9))?'even':[.6,1.1,2.3].every(x=>near(f(-x),-f(x),1e-9))?'odd':'none'}));
N11('k1-parity',1,'NB',r=>{
  const want=r.pick(['even','odd']),pool=PARF.filter(z=>z.par===want),oth=PARF.filter(z=>z.par!==want);
  const ok=r.pick(pool),wr=r.shuffle(oth).slice(0,3);
  return mkTxt(r,{stem:`Hàm số nào sau đây là hàm số ${want==='even'?'chẵn':'lẻ'}?`,correct:ok.h,wrongs:wr.map(z=>z.h),
    sol:`Hàm số ${ok.h} thỏa mãn ${want==='even'?'f(−x) = f(x)':'f(−x) = −f(x)'} với mọi x thuộc tập xác định; các hàm còn lại không thỏa mãn.`,
    chk:()=>ok.par===want&&wr.every(z=>z.par!==want)});
});
N11('k1-period',1,'NB',r=>{
  const fn=r.pick(['sin','cos','tan','cot']),b=r.pick([Q(1,2),Q(2),Q(3),Q(4),Q(1,3)]);
  const arg=b[1]===1?(b[0]===1?I('x'):b[0]+I('x')):fr(I('x'),b[1]);
  const base=(fn==='sin'||fn==='cos')?Q(2):Q(1),T=qdiv(base,b),Tn=radV(T);
  const f=x=>TRIG[fn](qv(b)*x);
  return mkF(r,{hf:radH,stem:`Hàm số ${I('y')} = ${fn} ${b[1]===1&&b[0]===1?I('x'):'('+arg+')'} tuần hoàn với chu kì`,correct:T,
    cands:[qdiv(Q(2),b),qdiv(Q(1),b),qmul(Q(2),b),Q(2),Q(1),qdiv(Q(4),b)],
    sol:`Hàm ${fn} (ax) tuần hoàn với chu kì ${base[0]===2?'2π':'π'}/|a|. Ở đây a = ${qh(b)} nên chu kì là ${radH(T)}.`,
    chk:()=>[.3,1.2,2.5].every(x=>near(f(x+Tn),f(x),1e-8))&&[.3,1.2,2.5].some(x=>!near(f(x+Tn/2),f(x),1e-6))});
});
N11('k1-range',1,'TH',r=>{
  const fn=r.pick(['sin','cos']),a=r.pick([-4,-3,-2,2,3,4,5]),c=r.pick([-3,-2,-1,1,2,3]),mx=r.chance(.5);
  const val=mx?Math.abs(a)+c:c-Math.abs(a);
  const fh=`${I('y')} = ${a<0?MINUS:''}${Math.abs(a)===1?'':Math.abs(a)} ${fn} ${I('x')} ${c<0?MINUS:'+'} ${Math.abs(c)}`;
  return mkNum(r,{stem:`Giá trị ${mx?'lớn nhất':'nhỏ nhất'} của hàm số ${fh} là`,correct:val,ok:()=>true,f:fmt,
    cands:[Math.abs(a)+c,c-Math.abs(a),a+c,-a+c,Math.abs(a),c,2*Math.abs(a)+c].filter(v=>v!==val),
    sol:`Vì −1 ≤ ${fn} x ≤ 1 nên y thuộc đoạn [${c-Math.abs(a)}; ${c+Math.abs(a)}]. Vậy giá trị ${mx?'lớn nhất':'nhỏ nhất'} là ${val}.`,
    chk:()=>{let m=mx?-1e9:1e9;for(let x=0;x<2*Math.PI;x+=0.001){const y=a*TRIG[fn](x)+c;m=mx?Math.max(m,y):Math.min(m,y)}return near(m,val,1e-3)}});
});
const eqFam=(q,per)=>q[0]===0?`${K}${per}`:`${radH(q)} + ${K}${per}`;
N11('k1-eqbasic',1,'TH',r=>{
  const fn=r.pick(['sin','cos','tan']),d=r.pick([3,4,6]),al=Q(r.pick([1,1,2,3,5].filter(n=>n<d&&!(fn==='tan'&&2*n===d))),d);
  const a=al,xs=I('x'),eq=`${fn} ${xs} = ${fn} ${radH(a)}`;
  let correct,wr,test;
  const P2='2π',P1='π';
  if(fn==='sin'){
    const b=qsub(Q(1),a);
    correct=`${xs} = ${eqFam(a,P2)} hoặc ${xs} = ${eqFam(b,P2)}`;
    wr=[`${xs} = ${eqFam(a,P2)} hoặc ${xs} = ${eqFam(Q(-a[0],a[1]),P2)}`,`${xs} = ${eqFam(a,P1)}`,`${xs} = ${eqFam(a,P2)}`,`${xs} = ${eqFam(a,P2)} hoặc ${xs} = ${eqFam(qadd(Q(1),a),P2)}`,`${xs} = ±${radH(a)} + ${K}2π`];
    test=()=>[-1,0,1,2].every(k=>near(Math.sin(radV(a)+2*k*Math.PI),Math.sin(radV(a)))&&near(Math.sin(radV(b)+2*k*Math.PI),Math.sin(radV(a))));
  }else if(fn==='cos'){
    correct=`${xs} = ±${radH(a)} + ${K}2π`;
    wr=[`${xs} = ${eqFam(a,P2)} hoặc ${xs} = ${eqFam(qsub(Q(1),a),P2)}`,`${xs} = ${eqFam(a,P1)}`,`${xs} = ${eqFam(a,P2)}`,`${xs} = ±${radH(a)} + ${K}π`,`${xs} = ${eqFam(a,P2)} hoặc ${xs} = ${eqFam(qadd(Q(1),a),P2)}`];
    test=()=>[-1,0,1,2].every(k=>near(Math.cos(radV(a)+2*k*Math.PI),Math.cos(radV(a)))&&near(Math.cos(-radV(a)+2*k*Math.PI),Math.cos(radV(a))));
  }else{
    correct=`${xs} = ${eqFam(a,P1)}`;
    wr=[`${xs} = ${eqFam(a,P2)}`,`${xs} = ±${radH(a)} + ${K}π`,`${xs} = ${eqFam(a,P2)} hoặc ${xs} = ${eqFam(qsub(Q(1),a),P2)}`,`${xs} = ${eqFam(qsub(Q(1),a),P1)}`,`${xs} = ±${radH(a)} + ${K}2π`];
    test=()=>[-2,-1,0,1,2].every(k=>near(Math.tan(radV(a)+k*Math.PI),Math.tan(radV(a)),1e-8));
  }
  wr=wr.filter(w=>w!==correct);
  return mkTxt(r,{stem:`Nghiệm của phương trình ${eq} là`,correct,wrongs:r.shuffle([...new Set(wr)]),
    sol:fn==='sin'?`sin x = sin α ⟺ x = α + k2π hoặc x = π − α + k2π, với α = ${radH(a)}.`:fn==='cos'?`cos x = cos α ⟺ x = ±α + k2π, với α = ${radH(a)}.`:`tan x = tan α ⟺ x = α + kπ, với α = ${radH(a)}.`,
    chk:test});
});
N11('k1-nsol',1,'TH',r=>{
  const fn=r.pick(['sin','cos']),m=r.pick(MVALS),iv=r.pick(INTERVALS);
  const cnt=solveTrig(fn,m[0][0]/m[0][1],iv.lo,iv.hi).length;
  return mkNum(r,{stem:`Số nghiệm của phương trình ${fn} ${I('x')} = ${m[1]} trên ${iv.t} là`,correct:cnt,ok:c=>c>=0,f:v=>String(v),
    cands:[0,1,2,3,4],
    sol:`Giải phương trình ${fn} x = ${m[1]} rồi chọn các nghiệm thuộc ${iv.t}: có ${cnt} nghiệm.`,
    chk:()=>{let c=0,prev=null;const f=x=>TRIG[fn](x)-m[0][0]/m[0][1];const N=20000;for(let i=0;i<=N;i++){const x=iv.lo+(iv.hi-iv.lo)*i/N,y=f(x);if(Math.abs(y)<1e-12){c++;prev=0;continue}if(prev!==null&&prev!==0&&prev*y<0)c++;prev=y}
      /* nghiệm kép (tiếp xúc) không đổi dấu: đếm bằng cực trị */
      return c===cnt||Math.abs(m[0][0]/m[0][1])===1}});
});

/* ----- Đúng/sai chương I ----- */
DS11('ds1-angle',1,'NB',r=>{
  const d=r.pick([3,4,6]),n=r.pick(d===3?[2,4,5]:d===4?[3,5,7]:[5,7,11]),q=Q(n,d),deg=n*180/d;
  const fnA=r.pick(['sin','cos']),fnB=fnA==='sin'?'cos':'sin';
  const vA=TRIG[fnA](radV(q)),vB=TRIG[fnB](radV(q)),cA=svOf(vA),cB=svOf(vB);
  const quad=deg<180?2:deg<270?3:4,wrongQ=quad===2?3:quad===3?4:2;
  const alt=r.pick(SVALL.filter(z=>!near(z[1],vA)&&!near(z[1],vB)));
  return mkDS(r,{stem:`Cho góc lượng giác ${I('α')} có số đo ${radH(q)} rad. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('α')} = ${deg}°`,f:`${I('α')} = ${deg+30}°`,why:`${radH(q)} rad = ${deg}°.`},
    {t:`${fnA} ${I('α')} = ${cA[0]}`,f:`${fnA} ${I('α')} = ${alt[0]}`,why:`${fnA} ${radH(q)} = ${cA[0]}.`},
    {t:`${fnB} ${I('α')} = ${cB[0]}`,f:`${fnB} ${I('α')} = ${svOf(-vB)[0]}`,why:`${fnB} ${radH(q)} = ${cB[0]}.`},
    {t:`Điểm biểu diễn của ${I('α')} trên đường tròn lượng giác nằm ở góc phần tư thứ ${['','','II','III','IV'][quad]}`,f:`Điểm biểu diễn của ${I('α')} trên đường tròn lượng giác nằm ở góc phần tư thứ ${['','','II','III','IV'][wrongQ]}`,why:`${deg}° thuộc góc phần tư thứ ${['','','II','III','IV'][quad]}.`}
  ],chk:()=>near(radV(q)*180/Math.PI,deg)&&near(TRIG[fnA](radV(q)),cA[1])&&near(TRIG[fnB](radV(q)),cB[1])&&svOf(-vB)&&!near(alt[1],vA)});
});
DS11('ds1-trigfun',1,'TH',r=>{
  const fn=r.pick(['sin','cos']),a=r.pick([2,3,4,5]),b=r.pick([2,3]),c=r.pick([-2,-1,1,2,3]);
  const fh=`${I('y')} = ${a} ${fn} ${b}${I('x')} ${c<0?MINUS:'+'} ${Math.abs(c)}`;
  const T=Q(2,b);
  return mkDS(r,{stem:`Cho hàm số ${fh}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:'Tập xác định của hàm số là ℝ',f:`Tập xác định của hàm số là ℝ \\ {${K}π, ${K} ∈ ℤ}`,why:`${fn} bx xác định với mọi x nên tập xác định là ℝ.`},
    {t:`Giá trị lớn nhất của hàm số bằng ${a+c}`,f:`Giá trị lớn nhất của hàm số bằng ${a+c+1}`,why:`−1 ≤ ${fn} ${b}x ≤ 1 nên y ≤ ${a}·1 + (${c}) = ${a+c}.`},
    {t:`Giá trị nhỏ nhất của hàm số bằng ${c-a}`,f:`Giá trị nhỏ nhất của hàm số bằng ${c-a-1}`,why:`y ≥ ${a}·(−1) + (${c}) = ${c-a}.`},
    {t:`Hàm số tuần hoàn với chu kì ${radH(T)}`,f:`Hàm số tuần hoàn với chu kì ${radH(Q(T[0]*2,T[1]))}`,why:`Chu kì của ${fn} ${b}x là 2π/${b} = ${radH(T)}.`}
  ],chk:()=>{const f=x=>a*TRIG[fn](b*x)+c,Tn=radV(T);let mx=-1e9,mn=1e9;for(let x=0;x<2*Math.PI;x+=0.001){mx=Math.max(mx,f(x));mn=Math.min(mn,f(x))}
    return near(mx,a+c,1e-3)&&near(mn,c-a,1e-3)&&near(f(1.1+Tn),f(1.1),1e-8)}});
});

/* ----- Trả lời ngắn chương I ----- */
TLN11('k1-t-arc',1,'TH',r=>{
  const R=r.pick([4,5,6,8,9,10,12,15]),deg=r.pick([30,45,60,75,100,120,135,150,200]),l=r2(R*deg*Math.PI/180);
  return{kind:'tln',stem:`Một cung tròn của đường tròn bán kính ${R} cm có số đo ${deg}°. Tính độ dài của cung tròn đó (đơn vị: cm, làm tròn đến hàng phần trăm).`,ans:l,unit:'',
    sol:`Đổi ${deg}° = ${radH(Q(deg,180))} rad. Độ dài cung ℓ = R·α = ${R}·${radH(Q(deg,180))} ≈ ${fmt(l)} (cm).`,chk:()=>near(l,R*radV(Q(deg,180)),0.006)};
});
TLN11('k1-t-nsol',1,'TH',r=>{
  const fn=r.pick(['sin','cos']),k=r.pick([2,3]),m=r.pick(MVALS),L=r.pick([Math.PI,2*Math.PI]),Lh=L===Math.PI?'π':'2π';
  const cnt=solveTrig(fn,m[0][0]/m[0][1],0,k*L).length;
  return{kind:'tln',stem:`Tìm số nghiệm của phương trình ${fn} ${k}${I('x')} = ${m[1]} trên đoạn [0; ${Lh}].`,ans:cnt,unit:'',
    sol:`Đặt u = ${k}x, khi đó u thuộc đoạn [0; ${k===2?'':'3'}${k===2?(L===Math.PI?'2π':'4π'):Lh}]. Phương trình ${fn} u = ${m[1]} có ${cnt} nghiệm trên đoạn đó, tương ứng ${cnt} nghiệm x.`,
    chk:()=>cnt===solveTrig(fn,m[0][0]/m[0][1],0,k*L).length};
});
TLN11('k1-t-maxsin',1,'VD',r=>{
  const [a,b,h]=r.pick([[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13],[8,15,17],[15,8,17]]),c=r.pick([-3,-2,-1,1,2,3,4]),mx=r.chance(.5);
  const sa=r.pick([1,-1]),A=a*sa,val=mx?h+c:c-h;
  const fh=`${I('y')} = ${A<0?MINUS:''}${a} sin ${I('x')} + ${b} cos ${I('x')} ${c<0?MINUS:'+'} ${Math.abs(c)}`;
  return{kind:'tln',stem:`Tìm giá trị ${mx?'lớn nhất':'nhỏ nhất'} của hàm số ${fh}.`,ans:val,unit:'',
    sol:`Áp dụng bất đẳng thức Bunyakovsky: |${A}sin x + ${b}cos x| ≤ ${rt(`${a}² + ${b}²`)} = ${h}. Do đó giá trị ${mx?'lớn nhất':'nhỏ nhất'} của y là ${mx?h+' + ':'−'+h+' + '}(${c}) = ${val}.`,
    chk:()=>{let m=mx?-1e9:1e9;for(let x=0;x<2*Math.PI;x+=0.0005){const y=A*Math.sin(x)+b*Math.cos(x)+c;m=mx?Math.max(m,y):Math.min(m,y)}return near(m,val,1e-3)}};
});
TLN11('k1-t-value',1,'TH',r=>{
  const [a,b,h]=r.pick([[3,4,5],[4,3,5],[5,12,13],[12,5,13],[8,15,17],[15,8,17]]);
  const quad=r.pick([2,3,4]),ss=quad===2?1:-1,cs=quad===4?1:-1,sv=ss*a/h,cv=cs*b/h,given=r.pick(['sin','cos']);
  const rng={2:`${fr('π',2)} < ${I('α')} < π`,3:`π < ${I('α')} < ${fr('3π',2)}`,4:`${fr('3π',2)} < ${I('α')} < 2π`}[quad];
  const gH=given==='sin'?`sin ${I('α')} = ${qh(Q(ss*a,h))}`:`cos ${I('α')} = ${qh(Q(cs*b,h))}`;
  const asks=[['sin 2'+I('α'),2*sv*cv],['cos 2'+I('α'),cv*cv-sv*sv],['tan '+I('α'),sv/cv]];
  const [lab,val]=r.pick(asks),ans=r2(val);
  return{kind:'tln',stem:`Cho ${gH} và ${rng}. Tính giá trị của ${lab} (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',
    sol:`Vì sin²α + cos²α = 1 và ${rng} nên ${given==='sin'?'cos':'sin'} α = ${given==='sin'?qh(Q(cs*b,h)):qh(Q(ss*a,h))}. Do đó ${lab} ≈ ${fmt(ans)}.`,
    chk:()=>near(sv*sv+cv*cv,1,1e-12)&&Math.abs(val-ans)<0.0051};
});
N11('k1-novsol',1,'NB',r=>{
  const bad=r.pick([['sin',rt(5)],['cos',rt(3)],['sin',fr(3,2)],['cos',MINUS+fr(5,4)],['sin',MINUS+'2'],['cos','2']]);
  const good=r.shuffle([['cos',MINUS+'1'],['tan','100'],['cot',rt(2)],['sin',fr(1,3)],['cos',MINUS+fr(2,3)],['tan',MINUS+'5'],['sin',MINUS+'1']]).slice(0,3);
  const eq=([f,v])=>`${f} ${I('x')} = ${v}`;
  return mkTxt(r,{stem:'Phương trình nào sau đây vô nghiệm?',correct:eq(bad),wrongs:good.map(eq),
    sol:`Vì −1 ≤ sin x ≤ 1 và −1 ≤ cos x ≤ 1, còn tan x, cot x nhận mọi giá trị thực, nên phương trình ${eq(bad)} vô nghiệm (vế phải nằm ngoài đoạn [−1; 1]).`});
});
N11('k1-domshift',1,'TH',r=>{
  const fn=r.pick(['tan','cot']),a=r.pick([Q(1,3),Q(1,4),Q(1,6),Q(-1,3),Q(-1,4),Q(-1,6)]);
  const sh=a[0]<0?` + ${radH(Q(-a[0],a[1]))}`:` ${MINUS} ${radH(a)}`;
  /* y = tan(x − a): x − a ≠ π/2 + kπ ⟹ x ≠ a + π/2 + kπ;  y = cot(x − a): x ≠ a + kπ */
  const base=fn==='tan'?qadd(a,Q(1,2)):a,norm=q=>{let v=Q(q[0],q[1]);while(qv(v)<=-.5)v=qadd(v,Q(1));while(qv(v)>.5+1e-9)v=qsub(v,Q(1));return v};
  const H=q=>`ℝ \\ {${radH(norm(q))} + ${K}π, ${K} ∈ ℤ}`;
  const cands=[a,qadd(a,Q(1,2)),qsub(a,Q(1,2)),Q(-a[0],a[1]),Q(1,2),Q(0),qadd(Q(-a[0],a[1]),Q(1,2))];
  const seen=new Set([H(base)]),wr=[];for(const c of r.shuffle(cands)){const h=H(c);if(!seen.has(h)&&qv(norm(c))!==qv(norm(base))){seen.add(h);wr.push(h)}}
  return mkTxt(r,{stem:`Tập xác định ${I('D')} của hàm số ${I('y')} = ${fn}(${I('x')}${sh}) là`,correct:H(base),wrongs:wr,
    sol:fn==='tan'?`Hàm số xác định ⟺ cos(x${sh}) ≠ 0 ⟺ x${sh} ≠ ${fr('π',2)} + kπ ⟺ x ≠ ${radH(norm(base))} + kπ.`:`Hàm số xác định ⟺ sin(x${sh}) ≠ 0 ⟺ x${sh} ≠ kπ ⟺ x ≠ ${radH(norm(base))} + kπ.`,
    chk:()=>{const f=fn==='tan'?Math.cos:Math.sin;return [-1,0,1].every(k=>near(f(radV(norm(base))+k*Math.PI-radV(a)),0,1e-9))}});
});
N11('k1-angfam',1,'NB',r=>{
  const q=r.pick([Q(1,3),Q(1,4),Q(1,6),Q(2,3),Q(3,4),Q(5,6)]),O='(OM, ON)';
  const tail=` (${K} ∈ ℤ)`;
  return mkTxt(r,{stem:`Cho góc hình học ${I('MON')} = ${radH(q)}. Công thức tổng quát số đo các góc lượng giác ${I(O)} có tia đầu ${I('OM')}, tia cuối ${I('ON')} (quay theo chiều dương) là`,
    correct:`${I(O)} = ${radH(q)} + ${K}2π${tail}`,wrongs:[`${I(O)} = ${radH(q)}${tail}`,`${I(O)} = ${radH(q)} + ${K}π${tail}`,`${I(O)} = ${radH(q)} + ${K}360°${tail}`],
    sol:`Các góc lượng giác cùng tia đầu, tia cuối hơn kém nhau một bội của 2π, nên sđ(OM, ON) = ${radH(q)} + k2π.`});
});
N11('k1-formula-f',1,'TH',r=>{
  const T=FORMULAS.filter(holds),F=FORMULAS.filter(f=>!holds(f));
  const bad=r.pick(F),ok=r.shuffle(T).slice(0,3);
  return mkTxt(r,{stem:'Khẳng định nào sau đây <b>sai</b>?',correct:bad[0],wrongs:ok.map(b=>b[0]),
    sol:`Khẳng định sai: ${bad[0]}. Ba công thức còn lại là các công thức cộng, nhân đôi đúng trong SGK.`,
    chk:()=>!holds(bad)&&ok.every(holds)});
});

/* ----- Tự luận chương I: 2 ý, mỗi ý 0,5 điểm ----- */
const angQ=x=>{const n=Math.round(x/Math.PI*144);if(!near(n*Math.PI/144,x,1e-9))throw new Error('góc không đặc biệt');return Q(n,144)};
const perH=p=>p[1]===1?(p[0]===1?K+'π':K+p[0]+'π'):fr(K+(p[0]===1?'':p[0])+'π',p[1]);
const famH=(b,p)=>{let v=b;while(qv(v)<=-qv(p)/2-1e-9)v=qadd(v,p);while(qv(v)>qv(p)/2+1e-9)v=qsub(v,p);return{q:v,h:`${I('x')} = ${v[0]===0?perH(p):radH(v)+' + '+perH(p)}`}};
const TV={sincos:[[fr(1,2),.5,'1'],[MINUS+fr(1,2),-.5,'1'],[fr(rt(2),2),SQ2/2,rt(2)],[MINUS+fr(rt(2),2),-SQ2/2,rt(2)],[fr(rt(3),2),SQ3/2,rt(3)],[MINUS+fr(rt(3),2),-SQ3/2,rt(3)]],
  tan:[['1',1],[MINUS+'1',-1],[rt(3),SQ3],[MINUS+rt(3),-SQ3],[fr(rt(3),3),SQ3/3],[MINUS+fr(rt(3),3),-SQ3/3]]};
/* Giải fn(b·x + c) = v (c là bội của π). Trả về các họ nghiệm và các bước. */
function trigSolve(fn,b,c,v){
  const th=angQ(fn==='sin'?Math.asin(v):fn==='cos'?Math.acos(v):Math.atan(v));
  const us=fn==='sin'?[th,qsub(Q(1),th)]:fn==='cos'?[th,Q(-th[0],th[1])]:[th];
  const P=fn==='tan'?Q(1):Q(2),per=qdiv(P,Q(b));
  const fams=us.map(u=>famH(qdiv(qsub(u,c),Q(b)),per));
  const uTxt=fn==='sin'?`u = ${radH(th)} + k2π hoặc u = ${radH(us[1])} + k2π`:fn==='cos'?`u = ±${radH(th)} + k2π`:`u = ${radH(th)} + kπ`;
  return{th,fams,uTxt,check:()=>fams.every(f=>[-1,0,1,2].every(k=>near(TRIG[fn](b*(radV(f.q)+k*radV(per))+radV(c)),v,1e-9)))};
}
const argH=(b,c)=>{const bx=(b===1?'':b)+I('x');if(c[0]===0)return bx;return `${bx} ${c[0]<0?MINUS:'+'} ${radH(Q(Math.abs(c[0]),c[1]))}`};
function trigPart(r,kind){
  const fn=kind==='tan'?'tan':r.pick(['sin','cos']),[vh,v]=r.pick(fn==='tan'?TV.tan:TV.sincos);
  const b=kind==='shift'?1:r.pick([2,3]),c=r.pick([Q(1,6),Q(1,4),Q(1,3),Q(-1,6),Q(-1,4),Q(-1,3)]);
  const S=trigSolve(fn,b,c,v),eq=`${fn}(${argH(b,c)}) = ${vh}`;
  return{html:`Giải phương trình ${eq}.`,
    sol:ptxt([[`Đặt u = ${argH(b,c)}. Ta có ${fn} u = ${vh} = ${fn}(${radH(S.th)}) ⟺ ${S.uTxt}.`,.25],[`Suy ra ${S.fams.map(f=>f.h).join(' hoặc ')} (${K} ∈ ℤ).`,.25]]),chk:S.check};
}
function trigPart2(r){
  const t=r.pick(['sc','cs','tan']);
  if(t==='tan')return trigPart(r,'tan');
  const [vh,v,num]=r.pick(TV.sincos);
  if(t==='sc'){ /* sin x cos x = v/2 ⟺ sin 2x = v */
    const S=trigSolve('sin',2,Q(0),v),rh=`${v<0?MINUS:''}${fr(num,4)}`;
    return{html:`Giải phương trình sin ${I('x')} cos ${I('x')} = ${rh}.`,
      sol:ptxt([[`sin x cos x = ${rh} ⟺ ${fr(1,2)}sin 2x = ${rh} ⟺ sin 2x = ${vh}.`,.25],[`Suy ra ${S.fams.map(f=>f.h).join(' hoặc ')} (${K} ∈ ℤ).`,.25]]),
      chk:()=>S.check()&&S.fams.every(f=>near(Math.sin(radV(f.q))*Math.cos(radV(f.q)),v/2,1e-9))};
  }
  const S=trigSolve('cos',2,Q(0),v);
  return{html:`Giải phương trình cos${sup(2)} ${I('x')} ${MINUS} sin${sup(2)} ${I('x')} = ${vh}.`,
    sol:ptxt([[`cos²x − sin²x = cos 2x nên phương trình ⟺ cos 2x = ${vh}.`,.25],[`Suy ra ${S.fams.map(f=>f.h).join(' hoặc ')} (${K} ∈ ℤ).`,.25]]),
    chk:()=>S.check()&&S.fams.every(f=>near(Math.cos(radV(f.q))**2-Math.sin(radV(f.q))**2,v,1e-9))};
}
TL11('tl1-eq',1,'TH','a',r=>{
  const p1=trigPart(r,'shift'),p2=trigPart2(r);
  return{kind:'tl',title:'Giải phương trình lượng giác',parts:[{pts:.5,html:p1.html},{pts:.5,html:p2.html}],sol:[p1.sol,p2.sol],chk:()=>p1.chk()&&p2.chk()};
});
TL11('tl1-eq2',1,'VD','a',r=>{
  const p1=trigPart(r,'mul'),p2=trigPart2(r);
  return{kind:'tl',title:'Giải phương trình lượng giác',parts:[{pts:.5,html:p1.html},{pts:.5,html:p2.html}],sol:[p1.sol,p2.sol],chk:()=>p1.chk()&&p2.chk()};
});

TLN11('k1-t-sumsol',1,'VD',r=>{
  for(;;){
    const fn=r.pick(['sin','cos']),b=r.pick([2,3,4]),[vh,v]=r.pick(TV.sincos),L=r.pick([[Math.PI/2,fr('π',2)],[Math.PI,'π']]);
    const us=solveTrig(fn,v,1e-9,b*L[0]-1e-9).filter(u=>u>1e-6&&u<b*L[0]-1e-6),xs=us.map(u=>u/b);
    if(xs.length<2||xs.length>5)continue;
    const S=xs.reduce((a,x)=>a+x,0),ans=r2(S);
    return{kind:'tln',stem:`Tính tổng các nghiệm của phương trình ${fn} ${b}${I('x')} = ${vh} thuộc khoảng (0; ${L[1]}) (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',
      sol:`Giải ${fn} ${b}x = ${vh} rồi chọn nghiệm thuộc (0; ${L[1]}): có ${xs.length} nghiệm, x ∈ {${xs.map(x=>radH(angQ(x))).join('; ')}}. Tổng ≈ ${fmt(ans)}.`,
      chk:()=>xs.every(x=>near(TRIG[fn](b*x),v,1e-9))&&Math.abs(S-ans)<0.0051};
  }
});
