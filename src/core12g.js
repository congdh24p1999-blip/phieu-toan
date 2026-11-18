/* ================================================================
   LỚP 12 – học kì II. Chương V: Phương pháp toạ độ trong không gian (Bài 14 – 17)
   Bài 16, 17 gắn sec 'v2' (không vào đề giữa kì II).
   ================================================================ */
const V2='v2';
const VARS=['x','y','z'];
/* A x + B y + C z + D */
function lin3H(cs,vars=VARS){let s='';cs.forEach((c,i)=>{if(!c)return;const v=i<vars.length?vars[i]:'',ab=Math.abs(c),m=v?(ab===1?'':String(ab))+I(v):String(ab);s+=s===''?(c<0?MINUS:'')+m:(c<0?` ${MINUS} `:' + ')+m});return s||'0'}
const planeH=p=>`${lin3H(p)} = 0`;
/* A(x − x₀) + B(y − y₀) + C(z − z₀) */
const pnH=(M,n)=>{let s='';n.forEach((c,i)=>{if(!c)return;const t=(Math.abs(c)===1?'':Math.abs(c))+(M[i]?`(${xm(VARS[i],M[i])})`:I(VARS[i]));s+=s===''?(c<0?MINUS:'')+t:(c<0?` ${MINUS} `:' + ')+t});return s};
const plN=(nm,p)=>`(${I(nm)}): ${planeH(p)}`;
const gcdA=a=>a.reduce((g,x)=>gcd(g,Math.abs(x)),0)||1;
const normV=v=>{const g=gcdA(v);let w=v.map(x=>x/g);const f=w.find(x=>x!==0);if(f<0)w=w.map(x=>-x);return w.map(x=>x||0)};
const cross=(u,v)=>[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
const propV=(u,v)=>{const c=cross(u,v);return c.every(x=>x===0)};
/* x0 + a t */
const parT=(x0,a,t='t')=>{const tt=a?(Math.abs(a)===1?'':Math.abs(a))+I(t):'';if(!x0&&!a)return'0';if(!a)return sg(x0);if(!x0)return(a<0?MINUS:'')+tt;return`${x0}`.replace('-',MINUS)+(a<0?` ${MINUS} `:' + ')+tt};
const lineP=(M,u,t='t')=>`${cases(...VARS.map((v,i)=>`${I(v)} = ${parT(M[i],u[i],t)}`))}`;
const xm=(v,x0)=>x0===0?I(v):`${I(v)} ${x0>0?MINUS:'+'} ${Math.abs(x0)}`;
const lineC=(M,u)=>VARS.map((v,i)=>fr(xm(v,M[i]),sg(u[i]))).join(' = ');
const onPlane=(p,M)=>p[0]*M[0]+p[1]*M[1]+p[2]*M[2]+p[3]===0;
const pdist=(p,M)=>Math.abs(vdot(p.slice(0,3),M)+p[3])/Math.sqrt(vlen2(p.slice(0,3)));
const nz3=r=>{for(;;){const v=[r.int(-4,4),r.int(-4,4),r.int(-4,4)];if(v.filter(x=>x).length>=2&&gcdA(v)===1)return v}};
const pr3=x=>x<0?`(${sg(x)})`:String(x);
const pt3s=(r,k)=>{for(;;){const v=pt3(r).map(x=>x%k);if(v.some(x=>x))return v.map(x=>x||0)}};
const nzAll=r=>[r.nz(-4,4),r.nz(-4,4),r.nz(-4,4)];
/* mặt phẳng qua M có vectơ pháp tuyến n */
const planeMN=(M,n)=>[n[0],n[1],n[2],-vdot(n,M)];
/* biểu thức các phương án mặt phẳng sai (không tỉ lệ với mặt phẳng đúng) */
const notSame=(p,q)=>!propV(p.slice(0,3),q.slice(0,3))||(()=>{const k=[0,1,2].map(i=>p[i]?q[i]/p[i]:null).find(x=>x!==null);return Math.abs(q[3]-k*p[3])>1e-9})();
const planeWrongs=(p,list)=>uniqBy(list.filter(q=>q.slice(0,3).some(x=>x)&&notSame(p,q)).map(planeH),x=>x).filter(x=>x!==planeH(p));

/* ===================== Bài 14: Phương trình mặt phẳng ===================== */
N12b('k12-14-normal',5,'NB',[14],r=>{
  const p=nz3(r).concat([r.nz(-6,6)]),cor=tup(p.slice(0,3));
  const W=[tup([p[0],p[1],p[3]]),tup([p[1],p[2],p[3]]),tup([p[0],p[2],p[1]]),tup([p[0],-p[1],p[2]]),tup([p[0],p[1],-p[2]]),tup([p[2],p[1],p[0]]),tup([p[1],p[0],p[2]]),tup([p[0]+1,p[1],p[2]]),tup([p[0],p[1]+1,p[2]])].filter(w=>w!==cor&&w!==tup(p.slice(0,3).map(x=>-x)));
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho mặt phẳng ${plN('P',p)}. Một vectơ pháp tuyến của (${I('P')}) có toạ độ là`,correct:cor,wrongs:r.shuffle(uniqBy(W,x=>x)),
    sol:`Mặt phẳng Ax + By + Cz + D = 0 nhận ${vc(I('n'))} = (A; B; C) làm một vectơ pháp tuyến: ${vc(I('n'))} = ${cor}.`,chk:()=>true});
});
N12b('k12-14-through',5,'NB',[14],r=>{
  const M=pt3s(r,4),n=nz3(r),p=planeMN(M,n);if(!p[3])return T.nlc['k12-14-through'].gen(r);
  const W=[[n[0],n[1],n[2],-p[3]],planeMN(n,M).map((x,i)=>i<3?M[i]:x),[n[0],n[1],n[2],p[3]+1],[M[0],M[1],M[2],-vdot(M,n)]];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, mặt phẳng đi qua điểm ${I('M')}${tup(M)} và nhận ${vc(I('n'))}${tup(n)} làm vectơ pháp tuyến có phương trình là`,correct:planeH(p),wrongs:r.shuffle(planeWrongs(p,W.concat([[n[0],-n[1],n[2],p[3]],[n[0],n[1],-n[2],p[3]]]))),
    sol:`Phương trình: ${pnH(M,n)} = 0 ⟺ ${planeH(p)}.`,chk:()=>onPlane(p,M)});
});
N12b('k12-14-on',5,'NB',[14],r=>{
  const p=nz3(r).concat([0]),M=pt3s(r,3);p[3]=-vdot(p.slice(0,3),M);
  const W=[[1,0,0],[0,1,0],[0,0,1],[1,1,0],[0,-1,1],[-1,0,1],[2,0,0]].map(d=>vadd(M,d)).filter(P2=>!onPlane(p,P2));
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, điểm nào dưới đây thuộc mặt phẳng ${plN('P',p)}?`,correct:`${I('M')}${tup(M)}`,wrongs:r.shuffle(W).slice(0,3).map((P2,i)=>`${I(['N','Q','E'][i])}${tup(P2)}`),
    sol:`Thay toạ độ M${tup(M)} vào vế trái của phương trình (P) được ${sg(vdot(p.slice(0,3),M))} ${p[3]<0?MINUS:'+'} ${Math.abs(p[3])} = 0 nên M ∈ (P); các điểm còn lại không thoả mãn.`,chk:()=>onPlane(p,M)});
});
N12b('k12-14-cross',5,'TH',[14],r=>{
  const u=nz3(r),v=nz3(r),c=cross(u,v);if(c.every(x=>!x))return T.nlc['k12-14-cross'].gen(r);
  const W=[tup(c.map(x=>-x)),tup([c[0],-c[1],c[2]]),tup([u[1]*v[2]+u[2]*v[1],u[2]*v[0]+u[0]*v[2],u[0]*v[1]+u[1]*v[0]]),tup(u.map((x,i)=>x*v[i]))];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai vectơ ${vecN('u',u)} và ${vecN('v',v)}. Tích có hướng [${vc(I('u'))}, ${vc(I('v'))}] có toạ độ là`,correct:tup(c),wrongs:r.shuffle(uniqBy(W,x=>x)).filter(w=>w!==tup(c)),
    sol:`[${vc(I('u'))}, ${vc(I('v'))}] = (${pr3(u[1])}·${pr3(v[2])} − ${pr3(u[2])}·${pr3(v[1])}; ${pr3(u[2])}·${pr3(v[0])} − ${pr3(u[0])}·${pr3(v[2])}; ${pr3(u[0])}·${pr3(v[1])} − ${pr3(u[1])}·${pr3(v[0])}) = ${tup(c)}.`,chk:()=>vdot(c,u)===0&&vdot(c,v)===0});
});
/* ba điểm không thẳng hàng, mặt phẳng có hệ số nhỏ */
function plane3(r){for(;;){const A=pt3s(r,4),B=vadd(A,nz3(r)),C=vadd(A,nz3(r)),n0=cross(vsub(B,A),vsub(C,A));if(n0.every(x=>!x))continue;const n=normV(n0);if(n.some(x=>Math.abs(x)>9))continue;const p=planeMN(A,n);if(Math.abs(p[3])>30)continue;return{A,B,C,n,p}}}
N12b('k12-14-3pts',5,'TH',[14],r=>{
  const {A,B,C,n,p}=plane3(r);
  const W=[[n[0],n[1],n[2],-p[3]],[n[0],-n[1],n[2],p[3]],[n[1],n[0],n[2],p[3]],[n[0],n[1],-n[2],p[3]],[n[0],n[1],n[2],p[3]+2],[n[0],n[1],n[2],p[3]-1],[-n[0],n[1],n[2],p[3]],[n[0]+1,n[1],n[2],p[3]]];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho ba điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)}. Mặt phẳng (${I('ABC')}) có phương trình là`,correct:planeH(p),wrongs:r.shuffle(planeWrongs(p,W)),
    sol:`${vh('A','B')} = ${tup(vsub(B,A))}, ${vh('A','C')} = ${tup(vsub(C,A))}; [${vh('A','B')}, ${vh('A','C')}] = ${tup(cross(vsub(B,A),vsub(C,A)))} cùng phương với ${vc(I('n'))} = ${tup(n)}. Mặt phẳng qua A nhận ${vc(I('n'))} làm vectơ pháp tuyến: ${planeH(p)}.`,chk:()=>[A,B,C].every(P2=>onPlane(p,P2))});
});
N12b('k12-14-icpt',5,'TH',[14],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),c=r.nz(-5,5);
  const cor=`${fr(I('x'),sg(a))} + ${fr(I('y'),sg(b))} + ${fr(I('z'),sg(c))} = 1`;
  const W=[`${fr(I('x'),sg(a))} + ${fr(I('y'),sg(b))} + ${fr(I('z'),sg(c))} = 0`,`${fr(I('x'),sg(b))} + ${fr(I('y'),sg(a))} + ${fr(I('z'),sg(c))} = 1`,`${lin3H([a,b,c])} = 1`,`${fr(I('x'),sg(-a))} + ${fr(I('y'),sg(b))} + ${fr(I('z'),sg(c))} = 1`];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, mặt phẳng đi qua ba điểm ${I('A')}(${sg(a)}; 0; 0), ${I('B')}(0; ${sg(b)}; 0), ${I('C')}(0; 0; ${sg(c)}) có phương trình là`,correct:cor,wrongs:uniqBy(W,x=>x).filter(w=>w!==cor),
    sol:`Phương trình mặt phẳng theo đoạn chắn: ${fr('x','a')} + ${fr('y','b')} + ${fr('z','c')} = 1 với a = ${sg(a)}, b = ${sg(b)}, c = ${sg(c)}.`,chk:()=>true});
});
N12b('k12-14-par',5,'TH',[14],r=>{
  const n=nzAll(r),k=r.pick([1,2,-1,-2]),i=r.int(0,2),ask=r.chance(.5);
  if(ask){/* song song: m là toạ độ i của k·n */
    const q=n.map(x=>x*k),m=q[i],qh_=q.map((x,j)=>j===i?null:x),d1=r.int(-5,5),d2=d1*k+r.pick([1,2,3,-1]);
    const QH=VARS.map((v,j)=>j===i?`${I('m')}${I(v)}`:null);
    let s='';q.forEach((x,j)=>{const t=j===i?`${I('m')}${I(VARS[j])}`:(Math.abs(x)===1?'':Math.abs(x))+I(VARS[j]);if(j!==i&&!x)return;s+=s===''?(j!==i&&x<0?MINUS:'')+t:(j!==i&&x<0?` ${MINUS} `:' + ')+t});s+=d2?(d2<0?` ${MINUS} ${-d2}`:` + ${d2}`):'';
    return mkNum(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai mặt phẳng ${plN('P',n.concat([d1]))} và (${I('Q')}): ${s} = 0. Giá trị của ${I('m')} để (${I('P')}) song song với (${I('Q')}) là`,correct:m,ok:()=>true,cands:[-m,n[i],m+1,m*2||3].filter(v=>v!==m),
      sol:`(P) ∥ (Q) khi hai vectơ pháp tuyến tỉ lệ: (${q.map((x,j)=>j===i?I('m'):sg(x)).join('; ')}) = ${sg(k)}·${tup(n)} ⟹ m = ${sg(m)} (khi đó hệ số tự do không cùng tỉ lệ nên hai mặt phẳng không trùng).`,chk:()=>notSame(n.concat([d1]),q.concat([d2]))&&n[i]!==0})}
  /* vuông góc */
  for(;;){const q=nz3(r),j=r.int(0,2);if(n[j]===0)continue;const rest=vdot(n,q)-n[j]*q[j];if(rest%n[j])continue;const m=-rest/n[j];if(Math.abs(m)>15)continue;
    let s='';q.forEach((x,t)=>{const tm=t===j?`${I('m')}${I(VARS[t])}`:(Math.abs(x)===1?'':Math.abs(x))+I(VARS[t]);if(t!==j&&!x)return;s+=s===''?(t!==j&&x<0?MINUS:'')+tm:(t!==j&&x<0?` ${MINUS} `:' + ')+tm});s+=' + 1';
    return mkNum(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai mặt phẳng ${plN('P',n.concat([r.int(-5,5)]))} và (${I('Q')}): ${s} = 0. Giá trị của ${I('m')} để (${I('P')}) vuông góc với (${I('Q')}) là`,correct:m,ok:()=>true,cands:[-m,m+1,m-2,rest].filter(v=>v!==m),
      sol:`(P) ⊥ (Q) ⟺ ${vc(I('n'))}${sub('P')}·${vc(I('n'))}${sub('Q')} = 0 ⟺ ${sg(rest)} + ${n[j]<0?'('+sg(n[j])+')':n[j]}m = 0 ⟺ m = ${sg(m)}.`,chk:()=>vdot(n,q.map((x,t)=>t===j?m:x))===0})}
});
/* vectơ có độ dài nguyên (dùng PYQ ở core12c) */
const nPy=r=>{const q=r.pick(PYQ.filter(x=>(x[0]||x[1])&&Math.max(x[0],x[1],x[2])<=8)),s=r.shuffle(q.slice(0,3)).map(x=>x*r.sign());return{n:s,l:q[3]}};
N12b('k12-14-dist',5,'TH',[14],r=>{
  for(;;){const {n,l}=nPy(r),M=pt3(r),k=r.int(1,4),D=k*l*r.sign()-vdot(n,M);if(Math.abs(D)>40)continue;const p=n.concat([D]);
    return mkNum(r,{stem:`Trong không gian ${I('Oxyz')}, khoảng cách từ điểm ${I('M')}${tup(M)} đến mặt phẳng ${plN('P',p)} bằng`,correct:k,ok:v=>v>0,cands:[k*l,k+1,Math.abs(D),k*l*l].filter(v=>v!==k),
      sol:`d(M, (P)) = ${fr(`|${sg(p[0])}·${M[0]<0?'('+sg(M[0])+')':M[0]} + ${p[1]<0?'('+sg(p[1])+')':p[1]}·${M[1]<0?'('+sg(M[1])+')':M[1]} + ${p[2]<0?'('+sg(p[2])+')':p[2]}·${M[2]<0?'('+sg(M[2])+')':M[2]} + ${D<0?'('+sg(D)+')':D}|`,rt(`${p[0]}² + ${p[1]}² + ${p[2]}²`.replace(/(-\d+)²/g,(m,a)=>`(${sg(+a)})²`)))} = ${fr(k*l,l)} = ${k}.`,chk:()=>Math.abs(pdist(p,M)-k)<1e-9})}
});
N12b('k12-14-parM',5,'TH',[14],r=>{
  const n=nz3(r),M=pt3s(r,4),d0=r.int(-6,6),p=planeMN(M,n);if(p[3]===d0)return T.nlc['k12-14-parM'].gen(r);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, mặt phẳng đi qua điểm ${I('M')}${tup(M)} và song song với mặt phẳng ${plN('Q',n.concat([d0]))} có phương trình là`,correct:planeH(p),wrongs:r.shuffle(planeWrongs(p,[n.concat([d0]),n.concat([-p[3]]),[n[0],n[1],n[2],p[3]+d0],[-n[0],n[1],n[2],p[3]],[M[0],M[1],M[2],d0],[n[0],n[1],n[2],p[3]+1],[n[0],n[1],n[2],p[3]-1],[n[0],-n[1],n[2],p[3]]])),
    sol:`Mặt phẳng cần tìm có cùng vectơ pháp tuyến ${tup(n)} với (Q) và đi qua M: ${planeH(p)}.`,chk:()=>onPlane(p,M)&&p[3]!==d0});
});
N12b('k12-14-bis',5,'TH',[14],r=>{
  for(;;){const A=pt3(r),d=nz3(r).map(x=>2*x),B=vadd(A,d),I0=vmul(vadd(A,B),.5),n=normV(d),p=planeMN(I0,n);if(Math.abs(p[3])>40)continue;
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Mặt phẳng trung trực của đoạn thẳng ${I('AB')} có phương trình là`,correct:planeH(p),wrongs:r.shuffle(planeWrongs(p,[planeMN(A,n),planeMN(B,n),n.concat([-p[3]]),[n[0],n[1],-n[2],p[3]],[n[0],-n[1],n[2],p[3]],n.concat([p[3]+1])])),
      sol:`Mặt phẳng trung trực đi qua trung điểm I${tup(I0)} của AB và nhận ${vh('A','B')} = ${tup(d)} (hay ${tup(n)}) làm vectơ pháp tuyến: ${planeH(p)}.`,chk:()=>Math.abs(pdist(p,A)-pdist(p,B))<1e-9&&onPlane(p,I0)})}
});
DS12b('ds12-14-plane',5,'TH',[14],r=>{
  for(;;){const {n,l}=nPy(r),M=pt3(r),k=r.int(1,3),D=k*l*r.sign()-vdot(n,M);if(Math.abs(D)>40)continue;const p=n.concat([D]),q=planeMN(M,n);if(q[3]===0||propV(n,[n[0],n[1],D]))continue;
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho mặt phẳng ${plN('P',p)} và điểm ${I('M')}${tup(M)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Vectơ ${vc(I('n'))}${tup(n)} là một vectơ pháp tuyến của (${I('P')}).`,f:`Vectơ ${vc(I('n'))}${tup([n[0],n[1],D])} là một vectơ pháp tuyến của (${I('P')}).`,why:`(P) có vectơ pháp tuyến ${tup(n)}.`},
      {t:`Điểm ${I('M')} không thuộc mặt phẳng (${I('P')}).`,f:`Điểm ${I('M')} thuộc mặt phẳng (${I('P')}).`,why:`Thay toạ độ M vào vế trái được ${sg(vdot(n,M)+D)} ≠ 0.`},
      {t:`Khoảng cách từ ${I('M')} đến (${I('P')}) bằng ${k}.`,f:`Khoảng cách từ ${I('M')} đến (${I('P')}) bằng ${k*l}.`,why:`d = ${fr(`|${sg(vdot(n,M)+D)}|`,rt(l*l))} = ${k}.`},
      {t:`Mặt phẳng qua ${I('M')} và song song với (${I('P')}) có phương trình ${planeH(q)}.`,f:`Mặt phẳng qua ${I('M')} và song song với (${I('P')}) có phương trình ${planeH(n.concat([-q[3]]))}.`,why:`Cùng vectơ pháp tuyến ${tup(n)}, đi qua M: ${planeH(q)}.`}],
      chk:()=>Math.abs(pdist(p,M)-k)<1e-9&&q[3]!==0&&l!==1&&!propV(n,[n[0],n[1],D])})}
});
TLN12b('t12-14-dist',5,'TH',[14],r=>{
  for(;;){const n=nz3(r),M=pt3(r),D=r.int(-9,9),p=n.concat([D]),d=Math.round(pdist(p,M)*100)/100;if(!d)continue;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, tính khoảng cách từ điểm ${I('M')}${tup(M)} đến mặt phẳng ${plN('P',p)} (làm tròn kết quả đến hàng phần trăm).`,ans:d,unit:'',
      sol:`d(M, (P)) = ${fr(`|${sg(vdot(n,M)+D)}|`,rt(vlen2(n)))} ≈ ${fmt(d)}.`,chk:()=>Math.abs(pdist(p,M)-d)<0.006}}
});
TLN12b('t12-14-pp',5,'VD',[14],r=>{
  for(;;){const {n,l}=nPy(r),k=r.pick([1,2]),d1=r.int(-12,12),d2=r.int(-12,12);if(d1*k===d2)continue;const dd=Math.abs(d2-d1*k)/(k*l);if(!isInt(dd*100))continue;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, cho hai mặt phẳng ${plN('P',n.concat([d1]))} và ${plN('Q',n.map(x=>x*k).concat([d2]))}. Biết (${I('P')}) ∥ (${I('Q')}), tính khoảng cách giữa hai mặt phẳng đó.`,ans:dd,unit:'',
      sol:`Lấy một điểm M thuộc (P); khoảng cách giữa (P) và (Q) bằng d(M, (Q)) = ${fr(`|${sg(d2)} − ${k}·(${sg(d1)})|`,`${k}·${l}`)} = ${fmt(dd)}.`,chk:()=>true}}
});
TLN12b('t12-14-abc',5,'VD',[14],r=>{
  for(;;){const {A,B,C,n,p}=plane3(r);if(n[0]!==1)continue;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, mặt phẳng đi qua ba điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)} có phương trình ${I('x')} + ${I('b')}${I('y')} + ${I('c')}${I('z')} + ${I('d')} = 0. Tính ${I('b')} + ${I('c')} + ${I('d')}.`,ans:p[1]+p[2]+p[3],unit:'',
      sol:`[${vh('A','B')}, ${vh('A','C')}] = ${tup(cross(vsub(B,A),vsub(C,A)))} cùng phương với ${tup(n)}. Mặt phẳng: ${planeH(p)} nên b + c + d = ${sg(p[1]+p[2]+p[3])}.`,chk:()=>[A,B,C].every(P2=>onPlane(p,P2))}}
});
TL12b('tl12-14-abc',5,'TH','c',[14],r=>{
  for(;;){const {A,B,C,n,p}=plane3(r),Dp=pt3(r);if(onPlane(p,Dp))continue;const q=planeMN(Dp,n),d=pdist(p,Dp),dH=Number.isInteger(d)?String(d):fr(`${Math.abs(vdot(n,Dp)+p[3])}`,rt(vlen2(n)));
    return{kind:'tl',title:'Phương trình mặt phẳng',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, cho bốn điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)}, ${I('D')}${tup(Dp)}. Viết phương trình mặt phẳng (${I('ABC')}).`},
      {pts:.5,html:`Tính khoảng cách từ ${I('D')} đến mặt phẳng (${I('ABC')}) và viết phương trình mặt phẳng đi qua ${I('D')}, song song với (${I('ABC')}).`}],
      sol:[ptxt([[`${vh('A','B')} = ${tup(vsub(B,A))}, ${vh('A','C')} = ${tup(vsub(C,A))}; [${vh('A','B')}, ${vh('A','C')}] = ${tup(cross(vsub(B,A),vsub(C,A)))}, chọn ${vc(I('n'))} = ${tup(n)}.`,.25],[`(ABC): ${planeH(p)}.`,.25]]),
        ptxt([[`d(D, (ABC)) = ${dH}.`,.25],[`Mặt phẳng qua D song song (ABC): ${planeH(q)}.`,.25]])],
      chk:()=>[A,B,C].every(P2=>onPlane(p,P2))&&onPlane(q,Dp)}}
});

/* ===================== Bài 15: Phương trình đường thẳng ===================== */
N12b('k12-15-dir',5,'NB',[15],r=>{
  const M=pt3s(r,4),u=nzAll(r).map(x=>x%3||1),ask=r.chance(.5),cor=tup(u);
  const W=uniqBy([M,[u[0],u[1],-u[2]],[u[1],u[0],u[2]],[-u[0],u[1],u[2]],[u[0],-u[1],u[2]],[u[2],u[1],u[0]]].filter(c=>c.some(x=>x)&&!propV(c,u)).map(tup),x=>x);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho đường thẳng ${I('d')}: ${ask?lineP(M,u):lineC(M,u)}${ask?' (t ∈ ℝ)':''}. Một vectơ chỉ phương của ${I('d')} có toạ độ là`,correct:cor,wrongs:r.shuffle(W),
    sol:ask?`Phương trình tham số x = x₀ + at, y = y₀ + bt, z = z₀ + ct có vectơ chỉ phương (a; b; c) = ${cor}.`:`Phương trình chính tắc ${fr('x − x₀','a')} = ${fr('y − y₀','b')} = ${fr('z − z₀','c')} có vectơ chỉ phương (a; b; c) = ${cor}.`,chk:()=>true});
});
N12b('k12-15-on',5,'NB',[15],r=>{
  const M=pt3s(r,4),u=nz3(r),t=r.pick([1,-1,2]),N=vadd(M,vmul(u,t));
  const W=[vadd(M,[1,0,0]),vadd(M,[0,1,0]),vsub(M,[0,0,1]),u,vadd(M,vmul(u,t)).map((x,i)=>i===1?x+1:x)].filter(P2=>propV(vsub(P2,M),u)===false);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, đường thẳng ${I('d')}: ${lineP(M,u)} (t ∈ ℝ) đi qua điểm nào dưới đây?`,correct:`${I('N')}${tup(N)}`,wrongs:r.shuffle(uniqBy(W.map(tup),x=>x)).slice(0,3).map((x,i)=>`${I(['P','Q','K'][i])}${x}`),
    sol:`Với t = ${sg(t)} ta được điểm N${tup(N)} thuộc d.`,chk:()=>propV(vsub(N,M),u)});
});
N12b('k12-15-param',5,'TH',[15],r=>{
  const M=pt3s(r,4),u=nz3(r);
  const cor=lineP(M,u),W=[lineP(u,M),lineP(M.map(x=>-x),u),lineP(M,[u[0],-u[1],u[2]]),lineP(M,[u[0],u[1],-u[2]]),lineP(M,[-u[0],u[1],u[2]])];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, đường thẳng đi qua điểm ${I('M')}${tup(M)} và có vectơ chỉ phương ${vecN('u',u)} có phương trình tham số là`,correct:cor,wrongs:uniqBy(W,x=>x).filter(w=>w!==cor&&!w.includes('NaN')).slice(0,3),
    sol:`Đường thẳng qua M(x₀; y₀; z₀) có vectơ chỉ phương (a; b; c) có phương trình tham số x = x₀ + at, y = y₀ + bt, z = z₀ + ct: ${cor}.`,chk:()=>true});
});
N12b('k12-15-2pts',5,'TH',[15],r=>{
  const A=pt3s(r,4),u=nzAll(r).map(x=>x%3||1),B=vadd(A,u);
  const cor=lineC(A,u),W=[lineC(A,B),lineC(B,A),lineC(A,u.map((x,i)=>i===2?-x:x)),lineC(u,A),lineC(A,u.map((x,i)=>i===0?-x:x)),lineC(A.map(x=>-x),u)].filter(w=>w!==cor);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Phương trình chính tắc của đường thẳng ${I('AB')} là`,correct:cor,wrongs:uniqBy(W,x=>x).slice(0,3),
    sol:`Đường thẳng AB đi qua A và có vectơ chỉ phương ${vh('A','B')} = ${tup(u)}: ${cor}.`,chk:()=>A.every(x=>true)&&B.every((x,i)=>x-A[i]===u[i])&&u.every(x=>x)});
});
N12b('k12-15-perp',5,'TH',[15],r=>{
  const n=nzAll(r).map(x=>x%3||1),M=pt3s(r,4),D=r.int(-5,5),cor=lineC(M,n);
  const W=[lineC(n,M),lineC(M,[n[0],n[1],D||1]),lineC(M,[n[0],-n[1],n[2]]),lineC(M.map(x=>-x),n),lineC(M,[n[0],n[1],-n[2]])].filter(w=>w!==cor);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, đường thẳng đi qua điểm ${I('M')}${tup(M)} và vuông góc với mặt phẳng ${plN('P',n.concat([D]))} có phương trình là`,correct:cor,wrongs:uniqBy(W,x=>x).slice(0,3),
    sol:`Đường thẳng vuông góc với (P) nhận vectơ pháp tuyến ${tup(n)} của (P) làm vectơ chỉ phương: ${cor}.`,chk:()=>true});
});
/* vị trí tương đối của hai đường thẳng */
function twoLines(r,kind){
  for(;;){const M1=pt3s(r,4),u1=nz3(r);let M2,u2;
    if(kind===0){u2=vmul(u1,r.pick([1,2,-1]));M2=vadd(M1,nz3(r));if(propV(vsub(M2,M1),u1))continue}/* song song */
    if(kind===1){u2=vmul(u1,r.pick([1,2,-1]));M2=vadd(M1,vmul(u1,r.pick([1,-1,2])))}/* trùng */
    if(kind===2){u2=nz3(r);if(propV(u1,u2))continue;const P0=vadd(M1,vmul(u1,r.pick([1,-1,2])));M2=vsub(P0,vmul(u2,r.pick([1,-1])))}/* cắt */
    if(kind===3){u2=nz3(r);if(propV(u1,u2))continue;M2=vadd(M1,nz3(r));if(vdot(cross(u1,u2),vsub(M2,M1))===0)continue}/* chéo */
    if([...M2,...u2].some(x=>Math.abs(x)>9))continue;
    return{M1,u1,M2,u2}}
}
const POS4=['song song','trùng nhau','cắt nhau','chéo nhau'];
N12b('k12-15-pos',5,'TH',[15],r=>{
  const kind=r.int(0,3),{M1,u1,M2,u2}=twoLines(r,kind);
  const why=[`Hai vectơ chỉ phương cùng phương, điểm M₁${tup(M1)} của d₁ không thuộc d₂ nên d₁ ∥ d₂.`,`Hai vectơ chỉ phương cùng phương và điểm M₁${tup(M1)} của d₁ thuộc d₂ nên hai đường thẳng trùng nhau.`,`Hai vectơ chỉ phương không cùng phương và [${vc('u')}₁, ${vc('u')}₂]·${vc(I('M₁M₂'))} = 0 nên hai đường thẳng cắt nhau.`,`[${vc('u')}₁, ${vc('u')}₂]·${vc(I('M₁M₂'))} = ${sg(vdot(cross(u1,u2),vsub(M2,M1)))} ≠ 0 nên hai đường thẳng chéo nhau.`][kind];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai đường thẳng ${I('d')}${sub(1)}: ${lineP(M1,u1)} và ${I('d')}${sub(2)}: ${lineP(M2,u2,'s')}. Vị trí tương đối của ${I('d')}${sub(1)} và ${I('d')}${sub(2)} là`,correct:POS4[kind],wrongs:POS4.filter((_,i)=>i!==kind),fixed:true,
    sol:`${vc('u')}₁ = ${tup(u1)}, ${vc('u')}₂ = ${tup(u2)}. ${why}`,chk:()=>{const c=cross(u1,u2),w=vsub(M2,M1),par=c.every(x=>!x);return kind<2?par&&(propV(w,u1)===(kind===1)):!par&&((vdot(c,w)===0)===(kind===2))}});
});
N12b('k12-15-inter',5,'TH',[15],r=>{
  for(;;){const M=pt3s(r,4),u=nz3(r),n=nz3(r),dn=vdot(n,u);if(!dn)continue;const t0=r.pick([-2,-1,1,2]),H=vadd(M,vmul(u,t0)),p=planeMN(H,n);if(Math.abs(p[3])>30)continue;
    const W=[M,vadd(M,u),vadd(M,vmul(u,-t0)),H.map((x,i)=>i===2?-x:x),vadd(H,[1,0,0]),vsub(H,[0,1,0]),H.map(x=>-x)].map(tup).filter(w=>w!==tup(H));
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, giao điểm của đường thẳng ${I('d')}: ${lineP(M,u)} và mặt phẳng ${plN('P',p)} có toạ độ là`,correct:tup(H),wrongs:r.shuffle(uniqBy(W,x=>x)),
      sol:`Thay x, y, z theo t vào phương trình (P): ${dn===1?'':dn===-1?MINUS:sg(dn)}t ${(vdot(n,M)+p[3])<0?MINUS:'+'} ${Math.abs(vdot(n,M)+p[3])} = 0 ⟺ t = ${sg(t0)}. Giao điểm ${tup(H)}.`,chk:()=>onPlane(p,H)})}
});
DS12b('ds12-15-line',5,'TH',[15],r=>{
  for(;;){const M=pt3s(r,4),u=nzAll(r).map(x=>x%3||1),t=r.pick([1,-1,2]),N=vadd(M,vmul(u,t)),n=vmul(u,r.pick([1,2])),D=r.int(-6,6);
    const z0=-M[2]/u[2];if(!isInt(z0)||M[2]===0)continue;const Z=vadd(M,vmul(u,z0));
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho đường thẳng ${I('d')}: ${lineC(M,u)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Đường thẳng ${I('d')} có một vectơ chỉ phương là ${vecN('u',u)}.`,f:`Đường thẳng ${I('d')} có một vectơ chỉ phương là ${vecN('u',M.some(x=>x)&&!propV(M,u)?M:[u[0],u[1],-u[2]])}.`,why:`Từ phương trình chính tắc, vectơ chỉ phương là ${tup(u)}.`},
      {t:`Điểm ${tup(N)} thuộc đường thẳng ${I('d')}.`,f:`Điểm ${tup(N.map((x,i)=>i===0?x+1:x))} thuộc đường thẳng ${I('d')}.`,why:`Thay vào: ba tỉ số đều bằng ${sg(t)}.`},
      {t:`Đường thẳng ${I('d')} vuông góc với mặt phẳng ${plN('P',n.concat([D]))}.`,f:`Đường thẳng ${I('d')} song song với mặt phẳng ${plN('P',n.concat([D]))}.`,why:`Vectơ pháp tuyến ${tup(n)} của (P) cùng phương với ${tup(u)}.`},
      {t:`Giao điểm của ${I('d')} với mặt phẳng (Oxy) là ${tup(Z)}.`,f:`Giao điểm của ${I('d')} với mặt phẳng (Oxy) là ${tup([M[0],M[1],0])}.`,why:`Cho z = 0: tham số t = ${sg(z0)}, được ${tup(Z)}.`}],
      chk:()=>Z[2]===0&&!veq(Z,[M[0],M[1],0])&&propV(n,u)})}
});
TLN12b('t12-15-inter',5,'VD',[15],r=>{
  for(;;){const M=pt3s(r,4),u=nz3(r),n=nz3(r),dn=vdot(n,u);if(!dn)continue;const t0=r.pick([-3,-2,-1,1,2,3]),H=vadd(M,vmul(u,t0)),p=planeMN(H,n);if(Math.abs(p[3])>30)continue;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, đường thẳng ${I('d')}: ${lineP(M,u)} cắt mặt phẳng ${plN('P',p)} tại điểm ${I('H')}(${I('a')}; ${I('b')}; ${I('c')}). Tính ${I('a')} + ${I('b')} + ${I('c')}.`,ans:H[0]+H[1]+H[2],unit:'',
      sol:`Thay x, y, z theo t vào (P) được t = ${sg(t0)} ⟹ H${tup(H)}, a + b + c = ${sg(H[0]+H[1]+H[2])}.`,chk:()=>onPlane(p,H)}}
});
TLN12b('t12-15-proj',5,'VD',[15],r=>{
  for(;;){const {n,l}=nPy(r),H=pt3s(r,4),t0=r.pick([1,-1,2]),A=vadd(H,vmul(n,t0)),p=planeMN(H,n),ask=r.chance(.5);if(Math.abs(p[3])>30)continue;
    const A2=vsub(vmul(H,2),A),v=ask?H:A2;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, cho điểm ${I('A')}${tup(A)} và mặt phẳng ${plN('P',p)}. Gọi ${ask?`${I('H')}(${I('a')}; ${I('b')}; ${I('c')}) là hình chiếu vuông góc của ${I('A')} trên (${I('P')})`:`${I('A′')}(${I('a')}; ${I('b')}; ${I('c')}) là điểm đối xứng với ${I('A')} qua (${I('P')})`}. Tính ${I('a')} + ${I('b')} + ${I('c')}.`,ans:v[0]+v[1]+v[2],unit:'',
      sol:`Đường thẳng qua A vuông góc với (P): x = ${parT(A[0],n[0])}, y = ${parT(A[1],n[1])}, z = ${parT(A[2],n[2])}; giao với (P) tại t = ${sg(-t0)} ⟹ H${tup(H)}.${ask?'':` A′ = 2H − A = ${tup(A2)}.`} Tổng: ${sg(v[0]+v[1]+v[2])}.`,chk:()=>onPlane(p,H)&&propV(vsub(A,H),n)}}
});
TL12b('tl12-15-line',5,'TH','c',[15],r=>{
  for(;;){const n=nzAll(r).map(x=>x%3||1),H=pt3s(r,4),t0=r.pick([1,-1,2]),A=vadd(H,vmul(n,t0)),p=planeMN(H,n);if(Math.abs(p[3])>30)continue;
    return{kind:'tl',title:'Phương trình đường thẳng',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, cho điểm ${I('A')}${tup(A)} và mặt phẳng ${plN('P',p)}. Viết phương trình tham số và phương trình chính tắc của đường thẳng ${I('d')} đi qua ${I('A')} và vuông góc với (${I('P')}).`},
      {pts:.5,html:`Tìm toạ độ giao điểm ${I('H')} của ${I('d')} và (${I('P')}).`}],
      sol:[ptxt([[`${I('d')} nhận ${vc(I('n'))} = ${tup(n)} làm vectơ chỉ phương: ${lineP(A,n)} (t ∈ ℝ).`,.25],[`Phương trình chính tắc: ${lineC(A,n)}.`,.25]]),
        ptxt([[`Thay vào (P): ${vlen2(n)===1?'':vlen2(n)}t ${(vdot(n,A)+p[3])<0?MINUS:'+'} ${Math.abs(vdot(n,A)+p[3])} = 0 ⟺ t = ${sg(-t0)}.`,.25],[`H${tup(H)}.`,.25]])],
      chk:()=>onPlane(p,H)}}
});
TL12b('tl12-15-sym',5,'VDC','c',[15],r=>{
  for(;;){const {n,l}=nPy(r),H=pt3s(r,4),t0=r.pick([1,-1]),A=vadd(H,vmul(n,t0)),p=planeMN(H,n),B=vadd(A,nz3(r));if(Math.abs(p[3])>30||pdist(p,B)===0)continue;
    const sA=vdot(n,A)+p[3],sB=vdot(n,B)+p[3];if(sA*sB<=0)continue;
    const A2=vsub(vmul(H,2),A),w=vsub(B,A2),dn=vdot(n,w);if(!dn)continue;
    /* M = A' + s(B − A'), thuộc (P) */
    const s=Q(-(vdot(n,A2)+p[3]),dn),Mv=A2.map((x,i)=>qadd(Q(x),qmul(s,Q(w[i])))),MA=Math.sqrt(vlen2(w));
    if(!Mv.every(q=>q[1]<=6))continue;
    return{kind:'tl',title:'Hình chiếu, điểm đối xứng và bài toán cực trị',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, cho mặt phẳng ${plN('P',p)} và hai điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}. Tìm toạ độ hình chiếu vuông góc ${I('H')} của ${I('A')} trên (${I('P')}) và điểm ${I('A′')} đối xứng với ${I('A')} qua (${I('P')}).`},
      {pts:.5,html:`Tìm điểm ${I('M')} thuộc (${I('P')}) sao cho ${I('MA')} + ${I('MB')} nhỏ nhất.`}],
      sol:[ptxt([[`Đường thẳng qua A vuông góc (P) có vectơ chỉ phương ${tup(n)}; giao điểm với (P) là H${tup(H)}.`,.25],[`A′ = 2H − A = ${tup(A2)}.`,.25]]),
        ptxt([[`A, B nằm cùng phía đối với (P). Với M ∈ (P): MA + MB = MA′ + MB ≥ A′B, dấu bằng khi M là giao điểm của đường thẳng A′B với (P).`,.25],[`Đường thẳng A′B: điểm A′ + s${vh('A′','B')} với ${vh('A′','B')} = ${tup(w)}; thay vào (P) được s = ${qh(s)}, M(${Mv.map(qh).join('; ')}). Giá trị nhỏ nhất A′B = ${sqH(vlen2(w))}.`,.25]])],
      chk:()=>{const m=Mv.map(qv);return Math.abs(vdot(n,m)+p[3])<1e-9&&Math.abs(Math.sqrt(vlen2(vsub(m,A)))+Math.sqrt(vlen2(vsub(m,B)))-MA)<1e-9}}}
});
TL12b('tl12-14-perp',5,'VDC','c',[14],r=>{
  for(;;){const n=nz3(r),A=pt3s(r,4),B=vadd(A,nz3(r)),C=pt3(r),D0=r.int(-5,5),m0=cross(vsub(B,A),n);if(m0.every(x=>!x))continue;const m=normV(m0);if(m.some(x=>Math.abs(x)>9))continue;
    const q=planeMN(A,m),d=pdist(q,C);if(!d)continue;const dH=Number.isInteger(d)?String(d):fr(String(Math.abs(vdot(m,C)+q[3])),rt(vlen2(m)));
    return{kind:'tl',title:'Phương trình mặt phẳng',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, cho mặt phẳng ${plN('P',n.concat([D0]))} và hai điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}. Viết phương trình mặt phẳng (${I('Q')}) đi qua ${I('A')}, ${I('B')} và vuông góc với (${I('P')}).`},
      {pts:.5,html:`Tính khoảng cách từ điểm ${I('C')}${tup(C)} đến mặt phẳng (${I('Q')}).`}],
      sol:[ptxt([[`(Q) có cặp vectơ chỉ phương ${vh('A','B')} = ${tup(vsub(B,A))} và ${vc(I('n'))}${sub('P')} = ${tup(n)}; [${vh('A','B')}, ${vc(I('n'))}${sub('P')}] = ${tup(m0)}.`,.25],[`Chọn vectơ pháp tuyến ${tup(m)}: (Q): ${planeH(q)}.`,.25]]),
        ptxt([[`d(C, (Q)) = ${fr(`|${sg(vdot(m,C)+q[3])}|`,rt(vlen2(m)))}`,.25],[`= ${dH}.`,.25]])],
      chk:()=>onPlane(q,A)&&onPlane(q,B)&&vdot(m,n)===0}}
});

/* ===================== Bài 16: Công thức tính góc ===================== */
const DIRV=[[1,0,0],[0,1,0],[0,0,1],[1,1,0],[1,0,1],[0,1,1],[1,-1,0],[1,0,-1],[0,1,-1],[1,1,1],[1,-1,1],[2,2,1],[1,2,2],[2,1,-2]];
const niceAngle=(c)=>[0,30,45,60,90].find(t=>Math.abs(Math.abs(c)-ANG_V[t][0])<1e-9);
function anglePair(r,kind){/* kind: 'll' cos, 'lp' sin, 'pp' cos */
  for(;;){const u=vmul(r.shuffle(r.pick(DIRV).slice()),r.pick([1,-1,2])),v=vmul(r.shuffle(r.pick(DIRV).slice()),r.pick([1,-1,2,3])),c=vdot(u,v)/Math.sqrt(vlen2(u)*vlen2(v)),th=niceAngle(c);
    if(th===undefined||th===0)continue;return{u,v,th:kind==='lp'?90-th===0?90:[30,45,60,90].includes(90-th)?90-th:null:th,c}}
}
N12b('k12-16-ll',5,'TH',[16],r=>{
  const {u,v,th}=anglePair(r,'ll'),M1=pt3s(r,3),M2=pt3s(r,3);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, góc giữa hai đường thẳng ${I('d')}${sub(1)}: ${lineP(M1,u)} và ${I('d')}${sub(2)}: ${lineP(M2,v,'s')} bằng`,correct:th+'°',wrongs:[30,45,60,90,120,150].filter(t=>t!==th&&t!==180-th).slice(0,3).map(t=>t+'°'),
    sol:`cos(d₁, d₂) = ${fr(`|${vc('u')}₁·${vc('u')}₂|`,`|${vc('u')}₁|·|${vc('u')}₂|`)} = ${fr(Math.abs(vdot(u,v)),`${sqH(vlen2(u))}·${sqH(vlen2(v))}`)} = ${ANG_V[th][1]} ⟹ (d₁, d₂) = ${th}°.`,chk:()=>Math.abs(Math.abs(vdot(u,v))/Math.sqrt(vlen2(u)*vlen2(v))-ANG_V[th][0])<1e-9});
},V2);
N12b('k12-16-lp',5,'TH',[16],r=>{
  for(;;){const {u,v,c}=anglePair(r,'ll'),s=Math.abs(c),th=[30,45,60,90].find(t=>Math.abs(Math.sin(t*Math.PI/180)-s)<1e-9);if(!th)continue;
    const M=pt3s(r,3),D=r.int(-5,5),p=v.concat([D]);
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, góc giữa đường thẳng ${I('d')}: ${lineP(M,u)} và mặt phẳng ${plN('P',p)} bằng`,correct:th+'°',wrongs:[30,45,60,90,0].filter(t=>t!==th).slice(0,3).map(t=>t+'°'),
      sol:`sin(d, (P)) = ${fr(`|${vc('u')}·${vc('n')}|`,`|${vc('u')}|·|${vc('n')}|`)} = ${fr(Math.abs(vdot(u,v)),`${sqH(vlen2(u))}·${sqH(vlen2(v))}`)} ⟹ (d, (P)) = ${th}°.`,chk:()=>Math.abs(Math.sin(th*Math.PI/180)-Math.abs(vdot(u,v))/Math.sqrt(vlen2(u)*vlen2(v)))<1e-9})}
},V2);
N12b('k12-16-pp',5,'TH',[16],r=>{
  const {u,v,th}=anglePair(r,'pp'),p=u.concat([r.int(-5,5)]),q=v.concat([r.int(-5,5)]);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, góc giữa hai mặt phẳng ${plN('P',p)} và ${plN('Q',q)} bằng`,correct:th+'°',wrongs:[30,45,60,90,120].filter(t=>t!==th&&t!==180-th).slice(0,3).map(t=>t+'°'),
    sol:`cos((P), (Q)) = ${fr(`|${vc('n')}·${vc('n′')}|`,`|${vc('n')}|·|${vc('n′')}|`)} = ${fr(Math.abs(vdot(u,v)),`${sqH(vlen2(u))}·${sqH(vlen2(v))}`)} = ${ANG_V[th][1]} ⟹ góc bằng ${th}°.`,chk:()=>Math.abs(Math.abs(vdot(u,v))/Math.sqrt(vlen2(u)*vlen2(v))-ANG_V[th][0])<1e-9});
},V2);
N12b('k12-16-cos',5,'NB',[16],r=>{
  const ask=r.int(0,2),F=[[`cos(Δ, Δ′) = ${fr(`|${vc('u')}·${vc('u′')}|`,`|${vc('u')}|·|${vc('u′')}|`)}`,`cos(Δ, Δ′) = ${fr(`${vc('u')}·${vc('u′')}`,`|${vc('u')}|·|${vc('u′')}|`)}`,`sin(Δ, Δ′) = ${fr(`|${vc('u')}·${vc('u′')}|`,`|${vc('u')}|·|${vc('u′')}|`)}`,`cos(Δ, Δ′) = |${vc('u')}·${vc('u′')}|`],
    [`sin(Δ, (P)) = ${fr(`|${vc('u')}·${vc('n')}|`,`|${vc('u')}|·|${vc('n')}|`)}`,`cos(Δ, (P)) = ${fr(`|${vc('u')}·${vc('n')}|`,`|${vc('u')}|·|${vc('n')}|`)}`,`sin(Δ, (P)) = ${fr(`${vc('u')}·${vc('n')}`,`|${vc('u')}|+|${vc('n')}|`)}`,`tan(Δ, (P)) = ${fr(`|${vc('u')}·${vc('n')}|`,`|${vc('u')}|·|${vc('n')}|`)}`],
    [`cos((P), (Q)) = ${fr(`|${vc('n')}·${vc('n′')}|`,`|${vc('n')}|·|${vc('n′')}|`)}`,`sin((P), (Q)) = ${fr(`|${vc('n')}·${vc('n′')}|`,`|${vc('n')}|·|${vc('n′')}|`)}`,`cos((P), (Q)) = ${fr(`${vc('n')}·${vc('n′')}`,`|${vc('n')}|+|${vc('n′')}|`)}`,`cos((P), (Q)) = |${vc('n')}·${vc('n′')}|`]][ask];
  const ctx=[`hai đường thẳng Δ, Δ′ có vectơ chỉ phương lần lượt là ${vc('u')}, ${vc('u′')}`,`đường thẳng Δ có vectơ chỉ phương ${vc('u')} và mặt phẳng (P) có vectơ pháp tuyến ${vc('n')}`,`hai mặt phẳng (P), (Q) có vectơ pháp tuyến lần lượt là ${vc('n')}, ${vc('n′')}`][ask];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho ${ctx}. Công thức nào sau đây đúng?`,correct:F[0],wrongs:F.slice(1),sol:`Theo công thức tính góc trong không gian: ${F[0]}.`,chk:()=>true});
},V2);
DS12b('ds12-16-ang',5,'TH',[16],r=>{
  for(;;){const n=r.pick([[1,1,0],[1,0,1],[0,1,1],[1,-1,0],[1,0,-1],[0,1,-1]]),p=n.concat([r.nz(-4,4)]),u=r.pick([[1,0,0],[0,1,0],[0,0,1]]),ang1=Math.round(Math.asin(Math.abs(vdot(u,n))/Math.sqrt(2))*180/Math.PI);
    const angO=Math.round(Math.acos(Math.abs(n[2])/Math.sqrt(2))*180/Math.PI),M=pt3s(r,3),ax=['Ox','Oy','Oz'][u.indexOf(1)];
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho mặt phẳng ${plN('P',p)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Mặt phẳng (${I('P')}) có vectơ pháp tuyến ${tup(n)}.`,f:`Mặt phẳng (${I('P')}) có vectơ pháp tuyến ${tup(n.concat([p[3]]).slice(1))}.`,why:`Hệ số của x, y, z: ${tup(n)}.`},
      {t:`Góc giữa trục ${ax} và (${I('P')}) bằng ${ang1}°.`,f:`Góc giữa trục ${ax} và (${I('P')}) bằng ${90-ang1===ang1?ang1+15:90-ang1}°.`,why:`sin = ${fr(Math.abs(vdot(u,n)),`1·${rt(2)}`)} ⟹ góc ${ang1}°.`},
      {t:`Góc giữa (${I('P')}) và mặt phẳng (Oxy) bằng ${angO}°.`,f:`Góc giữa (${I('P')}) và mặt phẳng (Oxy) bằng ${angO===90?45:90}°.`,why:`(Oxy) có vectơ pháp tuyến (0; 0; 1); cos = ${fr(Math.abs(n[2]),rt(2))} ⟹ ${angO}°.`},
      {t:`Góc giữa đường thẳng ${I('d')}: ${lineP(M,n)} và (${I('P')}) bằng 90°.`,f:`Góc giữa đường thẳng ${I('d')}: ${lineP(M,n)} và (${I('P')}) bằng 0°.`,why:`Vectơ chỉ phương của d trùng vectơ pháp tuyến của (P) nên d ⊥ (P).`}],
      chk:()=>!propV(n,n.concat([p[3]]).slice(1))&&p[3]!==0})}
},V2);
TLN12b('t12-16-deg',5,'VD',[16],r=>{
  for(;;){const A=[r.int(0,4),r.int(0,4),-r.int(1,3)],B=vadd(A,[r.int(2,8),r.int(2,8),-r.int(1,2)]),u=vsub(B,A),ang=Math.round(Math.asin(Math.abs(u[2])/Math.sqrt(vlen2(u)))*1800/Math.PI)/10;
    if(ang<1)continue;
    return{kind:'tln',stem:`Bản vẽ thiết kế của một công trình được vẽ trong hệ trục ${I('Oxyz')}. Sàn nhà thuộc mặt phẳng (Oxy), đường ống thoát nước thẳng và đi qua hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Tính góc tạo bởi đường ống thoát nước và mặt sàn (đơn vị: độ, làm tròn đến hàng phần mười).`,ans:ang,unit:'°',
      sol:`${vh('A','B')} = ${tup(u)}, (Oxy) có vectơ pháp tuyến (0; 0; 1). sin φ = ${fr(Math.abs(u[2]),rt(vlen2(u)))} ⟹ φ ≈ ${fmt(ang)}°.`,chk:()=>true}}
},V2);
TLN12b('t12-16-pp',5,'VD',[16],r=>{
  for(;;){const u=nz3(r),v=nz3(r),c=Math.abs(vdot(u,v))/Math.sqrt(vlen2(u)*vlen2(v)),ang=Math.round(Math.acos(c)*1800/Math.PI)/10;if(ang<5||ang>89.9||niceAngle(c)!==undefined)continue;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, tính góc giữa hai mặt phẳng ${plN('P',u.concat([r.int(-5,5)]))} và ${plN('Q',v.concat([r.int(-5,5)]))} (đơn vị: độ, làm tròn đến hàng phần mười).`,ans:ang,unit:'°',
      sol:`cos((P), (Q)) = ${fr(Math.abs(vdot(u,v)),`${sqH(vlen2(u))}·${sqH(vlen2(v))}`)} ⟹ góc ≈ ${fmt(ang)}°.`,chk:()=>true}}
},V2);
TL12b('tl12-16-ang',5,'VD','c',[16],r=>{
  for(;;){const {u,v,th}=anglePair(r,'pp'),M=pt3s(r,3),p=v.concat([r.int(-5,5)]);const s=Math.abs(vdot(u,v))/Math.sqrt(vlen2(u)*vlen2(v)),t2=[30,45,60,90].find(t=>Math.abs(Math.sin(t*Math.PI/180)-s)<1e-9);if(!t2)continue;
    const w=nz3(r),q=w.concat([1]),c3=Math.abs(vdot(v,w))/Math.sqrt(vlen2(v)*vlen2(w)),a3=Math.round(Math.acos(c3)*1800/Math.PI)/10;
    return{kind:'tl',title:'Góc trong không gian',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, tính góc giữa đường thẳng ${I('d')}: ${lineP(M,u)} và mặt phẳng ${plN('P',p)}.`},
      {pts:.5,html:`Tính góc giữa mặt phẳng (${I('P')}) và mặt phẳng ${plN('Q',q)} (làm tròn đến hàng phần mười của độ).`}],
      sol:[ptxt([[`sin(d, (P)) = ${fr(`|${vc('u')}·${vc('n')}|`,`|${vc('u')}|·|${vc('n')}|`)} = ${fr(Math.abs(vdot(u,v)),`${sqH(vlen2(u))}·${sqH(vlen2(v))}`)}.`,.25],[`Vậy (d, (P)) = ${t2}°.`,.25]]),
        ptxt([[`cos((P), (Q)) = ${fr(Math.abs(vdot(v,w)),`${sqH(vlen2(v))}·${sqH(vlen2(w))}`)}.`,.25],[`Góc giữa hai mặt phẳng ≈ ${fmt(a3)}°.`,.25]])],
      chk:()=>th>0}}
},V2);

/* ===================== Bài 17: Phương trình mặt cầu ===================== */
const sqTerm=(v,c)=>c===0?`${I(v)}${sup(2)}`:`(${xm(v,c)})${sup(2)}`;
const sphH=(I0,R2)=>`${VARS.map((v,i)=>sqTerm(v,I0[i])).join(' + ')} = ${R2}`;
N12b('k12-17-center',5,'NB',[17],r=>{
  const I0=pt3s(r,5),R0=r.int(2,6),ask=r.chance(.5);
  const cor=ask?`${I('I')}${tup(I0)}, ${I('R')} = ${R0}`:`${I('I')}${tup(I0)}, ${I('R')} = ${R0}`,W=[`${I('I')}${tup(I0.map(x=>-x))}, ${I('R')} = ${R0}`,`${I('I')}${tup(I0)}, ${I('R')} = ${R0*R0}`,`${I('I')}${tup(I0.map(x=>-x))}, ${I('R')} = ${R0*R0}`];
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, mặt cầu (${I('S')}): ${sphH(I0,R0*R0)} có tâm ${I('I')} và bán kính ${I('R')} lần lượt là`,correct:cor,wrongs:W,
    sol:`Mặt cầu (x − a)² + (y − b)² + (z − c)² = R² có tâm I(a; b; c), bán kính R: I${tup(I0)}, R = ${R0}.`,chk:()=>I0.some(x=>x)});
},V2);
N12b('k12-17-gen',5,'TH',[17],r=>{
  for(;;){const I0=pt3s(r,5),R0=r.int(2,6),d=vlen2(I0)-R0*R0;if(!I0.some(x=>x))continue;
    const eq=`${I('x')}${sup(2)} + ${I('y')}${sup(2)} + ${I('z')}${sup(2)}${plusH(lin3H(I0.map(x=>-2*x).concat([d])))} = 0`.replace(' + 0 = 0',' = 0');
    const W=[`${I('I')}${tup(I0.map(x=>-x))}, ${I('R')} = ${R0}`,`${I('I')}${tup(I0.map(x=>-2*x))}, ${I('R')} = ${R0}`,`${I('I')}${tup(I0)}, ${I('R')} = ${R0*R0}`];
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, mặt cầu (${I('S')}): ${eq} có tâm và bán kính lần lượt là`,correct:`${I('I')}${tup(I0)}, ${I('R')} = ${R0}`,wrongs:W,
      sol:`Phương trình x² + y² + z² − 2ax − 2by − 2cz + d = 0 với a = ${sg(I0[0])}, b = ${sg(I0[1])}, c = ${sg(I0[2])}, d = ${sg(d)}; R = ${rt('a² + b² + c² − d')} = ${rt(R0*R0)} = ${R0}.`,chk:()=>vlen2(I0)-d===R0*R0})}
},V2);
N12b('k12-17-write',5,'TH',[17],r=>{
  const ask=r.int(0,2);
  if(ask===0){const I0=pt3s(r,4),{v,l}=pyq(r),A=vadd(I0,v),cor=sphH(I0,l*l);
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, mặt cầu có tâm ${I('I')}${tup(I0)} và đi qua điểm ${I('A')}${tup(A)} có phương trình là`,correct:cor,wrongs:[sphH(I0,l),sphH(I0.map(x=>-x),l*l),sphH(A,l*l),sphH(I0,l*l+2)].filter(w=>w!==cor),
      sol:`R = IA = ${l}; phương trình: ${cor}.`,chk:()=>vlen2(vsub(A,I0))===l*l})}
  if(ask===1){const A=pt3s(r,4),{v,l}=pyq(r),B=vadd(A,vmul(v,2)),I0=vadd(A,v),cor=sphH(I0,l*l);
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Mặt cầu đường kính ${I('AB')} có phương trình là`,correct:cor,wrongs:[sphH(I0,4*l*l),sphH(I0,l),sphH(I0.map(x=>-x),l*l),sphH(I0,l*l+1)].filter(w=>w!==cor),
      sol:`Tâm là trung điểm I${tup(I0)} của AB, bán kính R = ${fr('AB',2)} = ${l}: ${cor}.`,chk:()=>veq(vmul(vadd(A,B),.5),I0)})}
  for(;;){const {n,l}=nPy(r),I0=pt3s(r,4),k=r.int(2,4),D=k*l*r.sign()-vdot(n,I0);if(Math.abs(D)>40)continue;const p=n.concat([D]),cor=sphH(I0,k*k);
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, mặt cầu có tâm ${I('I')}${tup(I0)} và tiếp xúc với mặt phẳng ${plN('P',p)} có phương trình là`,correct:cor,wrongs:[sphH(I0,k),sphH(I0,k*k*l*l),sphH(I0.map(x=>-x),k*k),sphH(I0,k*k+1)].filter(w=>w!==cor),
      sol:`R = d(I, (P)) = ${fr(`|${sg(vdot(n,I0)+D)}|`,rt(l*l))} = ${k}: ${cor}.`,chk:()=>Math.abs(pdist(p,I0)-k)<1e-9})}
},V2);
N12b('k12-17-which',5,'TH',[17],r=>{
  const I0=pt3s(r,4),R0=r.int(1,4),d=vlen2(I0)-R0*R0,lin=I0.map(x=>-2*x);
  const ok=`${I('x')}${sup(2)} + ${I('y')}${sup(2)} + ${I('z')}${sup(2)}${plusH(lin3H(lin.concat([d])))} = 0`.replace(' + 0 = 0',' = 0');
  const bad1=`${I('x')}${sup(2)} + ${I('y')}${sup(2)} + ${I('z')}${sup(2)}${plusH(lin3H(lin.concat([vlen2(I0)+R0*R0])))} = 0`;
  const bad2=`${I('x')}${sup(2)} + ${I('y')}${sup(2)} ${MINUS} ${I('z')}${sup(2)}${plusH(lin3H(lin.concat([d])))} = 0`.replace(' + 0 = 0',' = 0');
  const bad3=`${I('x')}${sup(2)} + 2${I('y')}${sup(2)} + ${I('z')}${sup(2)}${plusH(lin3H(lin.concat([d])))} = 0`.replace(' + 0 = 0',' = 0');
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, phương trình nào dưới đây là phương trình của một mặt cầu?`,correct:ok,wrongs:[bad1,bad2,bad3],
    sol:`Phương trình x² + y² + z² − 2ax − 2by − 2cz + d = 0 là phương trình mặt cầu khi a² + b² + c² − d > 0. Phương án đúng có a² + b² + c² − d = ${R0*R0} > 0; phương án có hệ số tự do ${vlen2(I0)+R0*R0} cho a² + b² + c² − d = ${sg(-R0*R0)} < 0; hai phương án còn lại có hệ số của x², y², z² không bằng nhau.`,chk:()=>vlen2(I0)-d>0});
},V2);
N12b('k12-17-pos',5,'TH',[17],r=>{
  const I0=pt3s(r,4),R0=r.int(2,5),{v,l}=pyq(r),M=vadd(I0,v),ins=l<R0?'nằm trong':l===R0?'nằm trên':'nằm ngoài';
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, một thiết bị phát sóng đặt tại vị trí ${I('A')}${tup(I0)}; vùng phủ sóng là khối cầu tâm ${I('A')} bán kính ${R0}. Vị trí ${I('M')}${tup(M)} so với mặt cầu biên của vùng phủ sóng thì`,correct:`${I('M')} ${ins} mặt cầu`,wrongs:['nằm trong','nằm trên','nằm ngoài'].filter(x=>x!==ins).map(x=>`${I('M')} ${x} mặt cầu`).concat([`không xác định được`]),
    sol:`AM = ${rt(vlen2(v))} = ${l} ${l<R0?'<':l===R0?'=':'>'} ${R0} nên M ${ins} mặt cầu${l<=R0?' (M thuộc vùng phủ sóng)':' (M không thuộc vùng phủ sóng)'}.`,chk:()=>true});
},V2);
DS12b('ds12-17-sph',5,'TH',[17],r=>{
  for(;;){const I0=pt3s(r,4),R0=r.int(2,5),d=vlen2(I0)-R0*R0,{n,l}=nPy(r),k=r.pick([R0,R0+1,R0-1]),D=k*l*r.sign()-vdot(n,I0);if(Math.abs(D)>40||!d)continue;const p=n.concat([D]);if(!I0.some(x=>x))continue;
    const eq=`${I('x')}${sup(2)} + ${I('y')}${sup(2)} + ${I('z')}${sup(2)}${plusH(lin3H(I0.map(x=>-2*x).concat([d])))} = 0`;
    const rel=k===R0?'tiếp xúc với':k<R0?'cắt':'không cắt';
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho mặt cầu (${I('S')}): ${eq} và mặt phẳng ${plN('P',p)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`(${I('S')}) có tâm ${I('I')}${tup(I0)}.`,f:`(${I('S')}) có tâm ${I('I')}${tup(I0.map(x=>-x))}.`,why:`a = ${sg(I0[0])}, b = ${sg(I0[1])}, c = ${sg(I0[2])}.`},
      {t:`(${I('S')}) có bán kính ${I('R')} = ${R0}.`,f:`(${I('S')}) có bán kính ${I('R')} = ${R0*R0}.`,why:`R = ${rt('a² + b² + c² − d')} = ${rt(R0*R0)} = ${R0}.`},
      {t:`Khoảng cách từ ${I('I')} đến (${I('P')}) bằng ${k}.`,f:`Khoảng cách từ ${I('I')} đến (${I('P')}) bằng ${k*l}.`,why:`d(I, (P)) = ${fr(`|${sg(vdot(n,I0)+D)}|`,l)} = ${k}.`},
      {t:`Mặt phẳng (${I('P')}) ${rel} mặt cầu (${I('S')}).`,f:`Mặt phẳng (${I('P')}) ${rel==='cắt'?'không cắt':'cắt'} mặt cầu (${I('S')}).`,why:`So sánh d(I, (P)) = ${k} với R = ${R0}.`}],
      chk:()=>Math.abs(pdist(p,I0)-k)<1e-9&&R0*R0!==R0&&l!==1&&I0.some(x=>x)})}
},V2);
TLN12b('t12-17-R',5,'VD',[17],r=>{
  for(;;){const I0=pt3s(r,5),R2=r.int(2,40),d=vlen2(I0)-R2,R=Math.round(Math.sqrt(R2)*100)/100;if(Number.isInteger(Math.sqrt(R2)))continue;
    const eq=`${I('x')}${sup(2)} + ${I('y')}${sup(2)} + ${I('z')}${sup(2)}${plusH(lin3H(I0.map(x=>-2*x).concat([d])))} = 0`.replace(' + 0 = 0',' = 0');
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, tính bán kính của mặt cầu (${I('S')}): ${eq} (làm tròn kết quả đến hàng phần trăm).`,ans:R,unit:'',
      sol:`Tâm I${tup(I0)}; R = ${rt(`${vlen2(I0)} ${d<0?'+':MINUS} ${Math.abs(d)}`)} = ${rt(R2)} ≈ ${fmt(R)}.`,chk:()=>Math.abs(Math.sqrt(R2)-R)<0.006}}
},V2);
TLN12b('t12-17-tan',5,'VD',[17],r=>{
  for(;;){const {n,l}=nPy(r),I0=pt3s(r,4),k=r.int(1,6),D=k*l*r.sign()-vdot(n,I0);if(Math.abs(D)>40)continue;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, mặt cầu tâm ${I('I')}${tup(I0)} tiếp xúc với mặt phẳng ${plN('P',n.concat([D]))}. Tính diện tích của mặt cầu đó chia cho π (tức là tính ${fr(I('S'),'π')}).`,ans:4*k*k,unit:'',
      sol:`R = d(I, (P)) = ${k}; diện tích mặt cầu S = 4πR² = ${4*k*k}π nên ${fr('S','π')} = ${4*k*k}.`,chk:()=>Math.abs(pdist(n.concat([D]),I0)-k)<1e-9}}
},V2);
TL12b('tl12-17-sph',5,'VD','c',[17],r=>{
  for(;;){const A=pt3s(r,4),{v,l}=pyq(r),B=vadd(A,vmul(v,2)),I0=vadd(A,v),n=normV(v),q=planeMN(A,n);if(Math.abs(q[3])>40)continue;
    return{kind:'tl',title:'Phương trình mặt cầu',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Viết phương trình mặt cầu (${I('S')}) đường kính ${I('AB')}.`},
      {pts:.5,html:`Viết phương trình mặt phẳng tiếp xúc với (${I('S')}) tại điểm ${I('A')}.`}],
      sol:[ptxt([[`Tâm I là trung điểm AB: I${tup(I0)}; R = IA = ${l}.`,.25],[`(S): ${sphH(I0,l*l)}.`,.25]]),
        ptxt([[`Mặt phẳng tiếp xúc với (S) tại A vuông góc với IA, nhận ${vh('I','A')} = ${tup(v.map(x=>-x))} (hay ${tup(n)}) làm vectơ pháp tuyến.`,.25],[`Phương trình: ${planeH(q)}.`,.25]])],
      chk:()=>onPlane(q,A)&&Math.abs(pdist(q,I0)-l)<1e-9}}
},V2);
