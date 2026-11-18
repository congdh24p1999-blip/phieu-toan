/* ================================================================
   LỚP 12 – Chương II: Vectơ và hệ trục toạ độ trong không gian (Bài 6 – 8)
   ================================================================ */
const srt12=(...a)=>a.sort().join('');
const tup=v=>`(${v.map(fmt).join('; ')})`;
const vadd=(u,v)=>u.map((x,i)=>x+v[i]),vsub=(u,v)=>u.map((x,i)=>x-v[i]),vmul=(u,k)=>u.map(x=>x*k),vdot=(u,v)=>u.reduce((s,x,i)=>s+x*v[i],0),veq=(u,v)=>u.every((x,i)=>Math.abs(x-v[i])<1e-9);
const vlen2=u=>vdot(u,u);
/* ---------- Hình hộp / hình lập phương: toạ độ đơn vị của các đỉnh ---------- */
const BOXV={A:[0,0,0],B:[1,0,0],C:[1,1,0],D:[0,1,0],'A′':[0,0,1],'B′':[1,0,1],'C′':[1,1,1],'D′':[0,1,1]};
const BOXN=Object.keys(BOXV);
const bv=(X,Y)=>vsub(BOXV[Y],BOXV[X]);
const BVECS=[];BOXN.forEach(X=>BOXN.forEach(Y=>{if(X!==Y)BVECS.push([X,Y])}));
const vh=(X,Y)=>vc(I(X+Y));
const repsOf=(t,pref)=>{const L=BVECS.filter(([X,Y])=>veq(bv(X,Y),t));return pref?L.sort((a,b)=>(b[0]===pref)-(a[0]===pref)):L};
const boxFig=(cube)=>{const P=cube?{A:[0,0,0],B:[3.4,0,0],C:[3.4,3.4,0],D:[0,3.4,0]}:{A:[0,0,0],B:[4.2,0,0],C:[5.0,2.6,0],D:[0.8,2.6,0]};
  ['A','B','C','D'].forEach(k=>P[k+'′']=[P[k][0]+(cube?0:0.7),P[k][1]+(cube?0:0.3),cube?3.4:3]);
  return fig3D(P,[['A','B'],['B','C'],['A′','B′'],['B′','C′'],['C′','D′'],['D′','A′'],['A','A′'],['B','B′'],['C','C′']],[['A','D'],['D','C'],['D','D′']],BOXN)};
const BOXT=`${I('ABCD.A′B′C′D′')}`;
/* một vectơ "đẹp" giữa hai đỉnh: cạnh hoặc đường chéo mặt */
const niceV=(r,maxL=2)=>{for(;;){const [X,Y]=r.pick(BVECS);if(vlen2(bv(X,Y))<=maxL)return[X,Y]}};
/* biểu diễn tổ hợp: [[hệ số, X, Y], ...] */
const coefH=c=>c===1?'':c===-1?MINUS:Number.isInteger(c)?sg(c):(c<0?MINUS:'')+fr(Q(Math.round(Math.abs(c)*6),6)[0],Q(Math.round(Math.abs(c)*6),6)[1]);
const combH=ts=>ts.map(([c,X,Y],i)=>{const s=coefH(c)+vh(X,Y);return i===0?s:(c<0?` ${MINUS} ${coefH(-c)}${vh(X,Y)}`:` + ${s}`)}).join('');

/* ===================== Bài 6: Vectơ trong không gian ===================== */
N12('k12-6-box-sum',2,'NB',[6],r=>{
  const X=r.pick(BOXN),nb=BOXN.filter(Y=>vlen2(bv(X,Y))===1),Ov=BOXN.find(Y=>vlen2(bv(X,Y))===3);
  const fd=BOXN.filter(Y=>vlen2(bv(X,Y))===2);
  const nbS=r.shuffle(nb);
  return mkTxt(r,{stem:`Cho hình hộp ${BOXT}.${boxFig(false)}Tổng ${nbS.map(Y=>vh(X,Y)).join(' + ')} bằng vectơ nào dưới đây?`,correct:vh(X,Ov),wrongs:r.shuffle([vh(Ov,X),vh(X,fd[0]),vh(X,fd[1]),vh(nbS[0],Ov)]),
    sol:`Theo quy tắc hình hộp: ${nbS.map(Y=>vh(X,Y)).join(' + ')} = ${vh(X,Ov)}.`,chk:()=>veq(nb.reduce((s,Y)=>vadd(s,bv(X,Y)),[0,0,0]),bv(X,Ov))});
});
N12('k12-6-box-eq',2,'NB',[6],r=>{
  const [X,Y]=niceV(r),t=bv(X,Y),eq=repsOf(t).filter(([a,b])=>!(a===X&&b===Y)),opp=repsOf(vmul(t,-1));
  const cor=r.pick(eq),oth=BVECS.filter(([a,b])=>!veq(bv(a,b),t)&&!veq(bv(a,b),vmul(t,-1))&&vlen2(bv(a,b))===vlen2(t));
  return mkTxt(r,{stem:`Cho hình hộp ${BOXT}. Vectơ nào dưới đây bằng vectơ ${vh(X,Y)}?`,correct:vh(...cor),wrongs:r.shuffle([...r.shuffle(opp).slice(0,2),...r.shuffle(oth).slice(0,3)]).map(v=>vh(...v)),
    sol:`Hai vectơ bằng nhau khi cùng hướng và cùng độ dài. Trong hình hộp, ${vh(X,Y)} = ${vh(...cor)} (các mặt của hình hộp là hình bình hành).`,chk:()=>veq(bv(...cor),t)});
});
/* sinh một đẳng thức u + v = w trong hình hộp (w là vectơ giữa hai đỉnh) */
function boxEq(r){
  for(;;){const [X,Y]=niceV(r),[Z,W]=niceV(r),t=vadd(bv(X,Y),bv(Z,W)),reps=repsOf(t,X);if(!reps.length||veq(t,[0,0,0]))continue;
    if(X+Y===Z+W)continue;const w=reps[0];
    const bad=BVECS.filter(v=>!veq(bv(...v),t)&&(v[0]===w[0]||v[1]===w[1])&&vlen2(bv(...v))<=3);
    return{u:[X,Y],v:[Z,W],w,t,bad}}
}
N12('k12-6-box-add',2,'TH',[6],r=>{
  const E=boxEq(r);
  return mkTxt(r,{stem:`Cho hình hộp ${BOXT}. Vectơ ${vh(...E.u)} + ${vh(...E.v)} bằng vectơ nào dưới đây?`,correct:vh(...E.w),wrongs:r.shuffle(E.bad).map(v=>vh(...v)),
    sol:`Thay các vectơ bằng các vectơ bằng nhau trong hình hộp rồi dùng quy tắc ba điểm (hoặc quy tắc hình bình hành): ${vh(...E.u)} + ${vh(...E.v)} = ${vh(...E.w)}.`,chk:()=>veq(E.t,bv(...E.w))});
});
N12('k12-6-box-false',2,'TH',[6],r=>{
  const tr=[],seen=new Set();while(tr.length<4){const E=boxEq(r),k=vh(...E.u)+vh(...E.v);if(seen.has(k))continue;seen.add(k);tr.push(E)}
  const st=E=>`${vh(...E.u)} + ${vh(...E.v)} = ${vh(...E.w)}.`,F=tr[0],fw=r.pick(F.bad);
  return mkTxt(r,{stem:`Cho hình hộp ${BOXT}.${boxFig(false)}Khẳng định nào dưới đây <b>sai</b>?`,correct:`${vh(...F.u)} + ${vh(...F.v)} = ${vh(...fw)}.`,wrongs:tr.slice(1).map(st),
    sol:`Ta có ${vh(...F.u)} + ${vh(...F.v)} = ${vh(...F.w)} ≠ ${vh(...fw)}. Các khẳng định còn lại đúng theo quy tắc ba điểm, quy tắc hình bình hành, quy tắc hình hộp.`,
    chk:()=>!veq(F.t,bv(...fw))&&tr.slice(1).every(E=>veq(E.t,bv(...E.w)))});
});
DS12('ds12-6-box',2,'TH',[6],r=>{
  const tr=[],seen=new Set();while(tr.length<4){const E=boxEq(r),k=vh(...E.u)+vh(...E.v);if(seen.has(k))continue;seen.add(k);tr.push(E)}
  const its=tr.map(E=>{const fw=r.pick(E.bad);return{t:`${vh(...E.u)} + ${vh(...E.v)} = ${vh(...E.w)}.`,f:`${vh(...E.u)} + ${vh(...E.v)} = ${vh(...fw)}.`,why:`${vh(...E.u)} + ${vh(...E.v)} = ${vh(...E.w)} (quy tắc ba điểm/hình bình hành/hình hộp).`,ok:!veq(E.t,bv(...fw))}});
  return mkDS(r,{stem:`Cho hình hộp ${BOXT}.${boxFig(false)}Xét tính đúng sai của các khẳng định sau:`,items:its,chk:()=>its.every(i=>i.ok)});
});
/* ---- Tứ diện: các đẳng thức vectơ, kiểm tra bằng toạ độ ---- */
function tetStatements(r){
  const L=r.shuffle(['A','B','C','D']),[A,B,C,D]=L,so=(...a)=>a.sort().join(''),P={[A]:[0,0,0],[B]:[3.1,0.4,0.2],[C]:[1.2,2.7,-0.3],[D]:[0.7,1.1,2.9]};
  const G1=vmul(vadd(vadd(P[B],P[C]),P[D]),1/3),G=vmul(vadd(vadd(vadd(P[A],P[B]),P[C]),P[D]),1/4),M=vmul(vadd(P[A],P[B]),1/2),N=vmul(vadd(P[C],P[D]),1/2);
  const Q={...P,G:G1,H:G,M,N},v=(x,y)=>vsub(Q[y],Q[x]),z=[0,0,0];
  const S=[
    {ctx:`Gọi ${I('G')} là trọng tâm tam giác ${I(srt12(B,C,D))}.`,t:`${vh(A,B)} + ${vh(A,C)} + ${vh(A,D)} = 3${vh(A,'G')}`,f:`${vh(A,B)} + ${vh(A,C)} + ${vh(A,D)} = ${vh(A,'G')}`,tv:()=>veq(vadd(vadd(v(A,B),v(A,C)),v(A,D)),vmul(v(A,'G'),3)),fv:()=>veq(vadd(vadd(v(A,B),v(A,C)),v(A,D)),v(A,'G'))},
    {ctx:`Gọi ${I('G')} là trọng tâm tam giác ${I(srt12(B,C,D))}.`,t:`${vh('G',B)} + ${vh('G',C)} + ${vh('G',D)} = ${vc('0')}`,f:`${vh('G',A)} + ${vh('G',B)} + ${vh('G',C)} = ${vc('0')}`,tv:()=>veq(vadd(vadd(v('G',B),v('G',C)),v('G',D)),z),fv:()=>veq(vadd(vadd(v('G',A),v('G',B)),v('G',C)),z)},
    {ctx:`Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I(srt12(A,B))} và ${I(srt12(C,D))}.`,t:`${vh('M','N')} = ${fr(1,2)}(${vh(A,D)} + ${vh(B,C)})`,f:`${vh('M','N')} = ${fr(1,2)}(${vh(A,B)} + ${vh(C,D)})`,tv:()=>veq(v('M','N'),vmul(vadd(v(A,D),v(B,C)),.5)),fv:()=>veq(v('M','N'),vmul(vadd(v(A,B),v(C,D)),.5))},
    {ctx:`Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I(srt12(A,B))} và ${I(srt12(C,D))}.`,t:`${vh('M','N')} = ${fr(1,2)}(${vh(A,C)} + ${vh(B,D)})`,f:`${vh('M','N')} = ${vh(A,C)} + ${vh(B,D)}`,tv:()=>veq(v('M','N'),vmul(vadd(v(A,C),v(B,D)),.5)),fv:()=>veq(v('M','N'),vadd(v(A,C),v(B,D)))},
    {ctx:'',t:`${vh(A,B)} + ${vh(C,D)} = ${vh(A,D)} + ${vh(C,B)}`,f:`${vh(A,B)} + ${vh(C,D)} = ${vh(A,C)} + ${vh(D,B)}`,tv:()=>veq(vadd(v(A,B),v(C,D)),vadd(v(A,D),v(C,B))),fv:()=>veq(vadd(v(A,B),v(C,D)),vadd(v(A,C),v(D,B)))},
    {ctx:`Gọi ${I('O')} là trọng tâm của tứ diện.`,t:`${vh('O',A)} + ${vh('O',B)} + ${vh('O',C)} + ${vh('O',D)} = ${vc('0')}`,f:`${vh(A,B)} + ${vh(A,C)} + ${vh(A,D)} = 3${vh(A,'O')}`,tv:()=>veq([A,B,C,D].reduce((s,X)=>vadd(s,v('H',X)),z),z),fv:()=>veq(vadd(vadd(v(A,B),v(A,C)),v(A,D)),vmul(v(A,'H'),3))}
  ];
  return{S,L};
}
N12('k12-6-tetra',2,'TH',[6],r=>{
  const {S}=tetStatements(r),pick=r.shuffle(S).filter((s,i,a)=>a.findIndex(x=>x.ctx===s.ctx)===i).slice(0,4),wantTrue=r.chance(.5);
  const ctx=pick.map(s=>s.ctx).filter(Boolean).join(' '),corS=pick[0],cor=(wantTrue?corS.t:corS.f)+'.',wr=pick.slice(1).map(s=>(wantTrue?s.f:s.t)+'.');
  return mkTxt(r,{stem:`Cho tứ diện ${I('ABCD')}. ${ctx} Khẳng định nào dưới đây ${wantTrue?'đúng':'<b>sai</b>'}?`,correct:cor,wrongs:wr,
    sol:`Khẳng định ${wantTrue?'đúng':'sai'} là: ${cor}${wantTrue?'':` Đẳng thức đúng là: ${corS.t}.`} (Dùng quy tắc ba điểm, tính chất trung điểm và trọng tâm.)`,
    chk:()=>pick.length===4&&pick.every(s=>s.tv()===true&&s.fv()===false)});
});
/* ---- Tích vô hướng ---- */
const ANG_V={0:[1,'1'],30:[Math.sqrt(3)/2,fr(rt(3),2)],45:[Math.SQRT1_2,fr(rt(2),2)],60:[.5,fr(1,2)],90:[0,'0'],120:[-.5,MINUS+fr(1,2)],135:[-Math.SQRT1_2,MINUS+fr(rt(2),2)],150:[-Math.sqrt(3)/2,MINUS+fr(rt(3),2)],180:[-1,MINUS+'1']};
/* √n rút gọn: 8 → 2√2, 9 → 3 */
const sqH=n=>{let a=1,b=n;for(let k=Math.floor(Math.sqrt(n));k>1;k--)if(b%(k*k)===0){a*=k;b/=k*k;break}return b===1?String(a):(a===1?'':a)+rt(b)};
/* p·q·cos θ dạng HTML */
function dotH(p,q,th){
  const pq=p*q;
  if(th===90)return'0';if(th===0)return String(pq);if(th===180)return sg(-pq);
  if(th===60||th===120)return qh(Q(th===60?pq:-pq,2));
  const rad=th===45||th===135?2:3,neg=th>90,qq=Q(pq,2),co=qq[0]===1&&qq[1]===1?'':qq[1]===1?String(qq[0]):null;
  const core=co!==null?`${co}${rt(rad)}`:fr(`${qq[0]===1?'':qq[0]}${rt(rad)}`,qq[1]);
  return(neg?MINUS:'')+core;
}
N12('k12-6-dot',2,'TH',[6],r=>{
  const p=r.int(1,6),q=r.int(2,6),th=r.pick([30,45,60,90,120,135,150]),cor=dotH(p,q,th);
  const others=[30,45,60,120,135,150,0].filter(t=>t!==th).map(t=>dotH(p,q,t)).concat([String(p*q),String(p+q)]);
  return mkTxt(r,{stem:`Trong không gian, cho hai vectơ ${vc(I('a'))}, ${vc(I('b'))} thoả mãn |${vc(I('a'))}| = ${p}, |${vc(I('b'))}| = ${q} và (${vc(I('a'))}, ${vc(I('b'))}) = ${th}°. Tích vô hướng ${vc(I('a'))}·${vc(I('b'))} bằng`,correct:cor,wrongs:r.shuffle(uniqBy(others,x=>x)).filter(x=>x!==cor),
    sol:`${vc(I('a'))}·${vc(I('b'))} = |${vc(I('a'))}|·|${vc(I('b'))}|·cos(${vc(I('a'))}, ${vc(I('b'))}) = ${p}·${q}·cos ${th}° = ${cor}.`,chk:()=>true});
});
/* góc giữa hai vectơ trong hình lập phương */
function cubeAngPair(r){
  for(;;){const u=niceV(r,3),v=niceV(r,3),a=bv(...u),b=bv(...v),c=vdot(a,b)/Math.sqrt(vlen2(a)*vlen2(b));
    const th=Object.keys(ANG_V).map(Number).find(t=>Math.abs(ANG_V[t][0]-c)<1e-9);if(th===undefined||(u[0]===v[0]&&u[1]===v[1]))continue;
    if(vlen2(a)===3&&vlen2(b)===3)continue;return{u,v,th}}
}
N12('k12-6-cube-ang',2,'TH',[6],r=>{
  const {u,v,th}=cubeAngPair(r),opts=[0,45,60,90,120,135,180].filter(t=>t!==th);
  return mkTxt(r,{stem:`Cho hình lập phương ${BOXT}.${boxFig(true)}Góc giữa hai vectơ ${vh(...u)} và ${vh(...v)} bằng`,correct:th+'°',wrongs:r.shuffle(opts).map(t=>t+'°'),
    sol:`Dời các vectơ về chung gốc (dùng các vectơ bằng nhau trong hình lập phương) rồi xét tam giác tạo thành (các mặt là hình vuông, các đường chéo mặt bằng nhau). Ta được (${vh(...u)}, ${vh(...v)}) = ${th}°.`,
    chk:()=>{const a=bv(...u),b=bv(...v);return Math.abs(Math.acos(Math.max(-1,Math.min(1,vdot(a,b)/Math.sqrt(vlen2(a)*vlen2(b)))))*180/Math.PI-th)<1e-6}});
});
const a2H=k=>k===0?'0':(k===1?'':k===-1?MINUS:sg(k))+I('a')+sup(2);
N12('k12-6-cube-dot',2,'VD',[6],r=>{
  for(;;){const u=niceV(r,3),v=niceV(r,3),k=vdot(bv(...u),bv(...v));if(u[0]+u[1]===v[0]+v[1]||k*k===vlen2(bv(...u))*vlen2(bv(...v)))continue;
    const cor=a2H(k),W=[-2,-1,0,1,2,3].filter(x=>x!==k).map(a2H).concat([`${fr(I('a')+sup(2),2)}`,`${I('a')}${sup(2)}${rt(2)}`]);
    return mkTxt(r,{stem:`Cho hình lập phương ${BOXT} có cạnh bằng ${I('a')}. Tích vô hướng ${vh(...u)}·${vh(...v)} bằng`,correct:cor,wrongs:r.shuffle(W),
      sol:`Phân tích theo ba vectơ đôi một vuông góc ${vh('A','B')}, ${vh('A','D')}, ${vh('A','A′')} (độ dài ${I('a')}): ${vh(...u)} = ${combH(bv(...u).map((c,i)=>[c,'A',['B','D','A′'][i]]).filter(t=>t[0]))}, ${vh(...v)} = ${combH(bv(...v).map((c,i)=>[c,'A',['B','D','A′'][i]]).filter(t=>t[0]))}. Suy ra tích vô hướng bằng ${cor}.`,
      chk:()=>Number.isInteger(k)})}
});
DS12('ds12-6-dot',2,'VD',[6],r=>{
  for(;;){const p=r.int(1,6),q=r.int(1,6),th=r.pick([60,120]),ab=(th===60?1:-1)*p*q/2;if(!Number.isInteger(ab)||p===q)continue;
    const s1=p*p+q*q+2*ab,s2=p*p+q*q-2*ab,k=r.int(2,3),e=p*p-ab+k*ab-k*q*q;
    const A=vc(I('a')),B=vc(I('b'));
    return mkDS(r,{stem:`Trong không gian, cho hai vectơ ${A}, ${B} có |${A}| = ${p}, |${B}| = ${q} và góc giữa chúng bằng ${th}°. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${A}·${B} = ${sg(ab)}.`,f:`${A}·${B} = ${sg(-ab)}.`,why:`${A}·${B} = ${p}·${q}·cos ${th}° = ${sg(ab)}.`},
      {t:`(${A} + ${B})${sup(2)} = ${s1}.`,f:`(${A} + ${B})${sup(2)} = ${p*p+q*q}.`,why:`(${A} + ${B})² = |${A}|² + 2${A}·${B} + |${B}|² = ${p*p} + ${2*ab<0?'('+sg(2*ab)+')':2*ab} + ${q*q} = ${s1}.`},
      {t:`|${A} ${MINUS} ${B}| = ${rt(s2)}.`.replace(rt(s2),Number.isInteger(Math.sqrt(s2))?String(Math.sqrt(s2)):rt(s2)),f:`|${A} ${MINUS} ${B}| = ${Number.isInteger(Math.sqrt(s1))?String(Math.sqrt(s1)):rt(s1)}.`,why:`|${A} − ${B}|² = ${p*p} − ${2*ab<0?'('+sg(2*ab)+')':2*ab} + ${q*q} = ${s2}.`},
      {t:`(${A} + ${k}${B})·(${A} ${MINUS} ${B}) = ${sg(e)}.`,f:`(${A} + ${k}${B})·(${A} ${MINUS} ${B}) = ${sg(e+k*q*q)}.`,why:`(${A} + ${k}${B})·(${A} − ${B}) = |${A}|² + ${k-1}${A}·${B} − ${k}|${B}|² = ${p*p} + ${k-1}·(${sg(ab)}) − ${k*q*q} = ${sg(e)}.`}],
      chk:()=>s1!==s2&&s1!==p*p+q*q&&e!==e+k*q*q})}
});
TLN12('t12-6-dot',2,'VD',[6],r=>{
  for(;;){const p=r.int(1,6),q=r.int(1,6),th=r.pick([60,120,90]),ab=th===90?0:(th===60?1:-1)*p*q/2;if(!Number.isInteger(ab))continue;
    const m=r.int(1,4),n=r.int(1,3),ans=p*p+(m-n)*ab-m*n*q*q,A=vc(I('a')),B=vc(I('b'));
    return{kind:'tln',stem:`Trong không gian, cho hai vectơ ${A}, ${B} có |${A}| = ${p}, |${B}| = ${q} và (${A}, ${B}) = ${th}°. Tính (${A} + ${m===1?'':m}${B})·(${A} ${MINUS} ${n===1?'':n}${B}).`,ans,unit:'',
      sol:`${A}·${B} = ${sg(ab)}. (${A} + ${m===1?"":m}${B})·(${A} − ${n===1?"":n}${B}) = |${A}|² + ${m-n<0?'('+sg(m-n)+')':m-n}·${A}·${B} − ${m*n}|${B}|² = ${p*p} + ${m-n<0?'('+sg(m-n)+')':m-n}·(${sg(ab)}) − ${m*n*q*q} = ${sg(ans)}.`,chk:()=>Math.abs(ans)<1000}}
});
TLN12('t12-6-sum',2,'VD',[6],r=>{
  const L=[[3,5,7,60],[5,3,7,60],[7,8,13,60],[8,7,13,60],[5,16,19,60],[3,8,7,120],[5,8,7,120],[8,15,13,120],[7,15,13,120],[5,21,19,120],[6,10,14,60],[6,16,14,120]],[p,q,c,th]=r.pick(L);
  return{kind:'tln',stem:`Trong không gian, cho hai vectơ ${vc(I('a'))}, ${vc(I('b'))} có |${vc(I('a'))}| = ${p}, |${vc(I('b'))}| = ${q} và góc giữa hai vectơ bằng ${th}°. Tính |${vc(I('a'))} + ${vc(I('b'))}|.`,ans:c,unit:'',
    sol:`|${vc(I('a'))} + ${vc(I('b'))}|² = ${p}² + ${q}² + 2·${p}·${q}·cos ${th}° = ${p*p} + ${q*q} ${th===60?'+':MINUS} ${p*q} = ${c*c}. Vậy |${vc(I('a'))} + ${vc(I('b'))}| = ${c}.`,chk:()=>p*p+q*q+(th===60?1:-1)*p*q===c*c};
});
TLN12('t12-6-force',2,'VD',[6],r=>{
  const L=[[1,2,2,3],[2,3,6,7],[1,4,8,9],[4,4,7,9],[2,6,9,11],[6,6,7,11],[2,10,11,15],[3,4,12,13]],[a,b,c,d]=r.pick(L),k=r.pick([5,10,20]);
  return{kind:'tln',stem:`Ba lực ${vc(I('F'))}${sub(1)}, ${vc(I('F'))}${sub(2)}, ${vc(I('F'))}${sub(3)} cùng tác động vào một vật, có giá đôi một vuông góc với nhau và có độ lớn lần lượt là ${a*k} N, ${b*k} N, ${c*k} N. Tính độ lớn của hợp lực ${vc(I('F'))}${sub(1)} + ${vc(I('F'))}${sub(2)} + ${vc(I('F'))}${sub(3)} (đơn vị: N).`,ans:d*k,unit:'N',
    sol:`Dựng hình hộp chữ nhật có ba cạnh xuất phát từ một đỉnh biểu diễn ba lực; hợp lực là đường chéo của hình hộp. Độ lớn: ${rt(`${a*k}² + ${b*k}² + ${c*k}²`)} = ${d*k} (N).`,chk:()=>a*a+b*b+c*c===d*d};
});
TLN12('t12-6-cube',2,'VD',[6],r=>{
  for(;;){const s=r.int(2,6),u=niceV(r,3),v=niceV(r,3),k=vdot(bv(...u),bv(...v));if(!k||u[0]+u[1]===v[0]+v[1]||k*k===vlen2(bv(...u))*vlen2(bv(...v)))continue;
    return{kind:'tln',stem:`Cho hình lập phương ${BOXT} có cạnh bằng ${s}. Tính tích vô hướng ${vh(...u)}·${vh(...v)}.`,ans:k*s*s,unit:'',
      sol:`Biểu diễn hai vectơ qua ba vectơ đôi một vuông góc ${vh('A','B')}, ${vh('A','D')}, ${vh('A','A′')} (mỗi vectơ có độ dài ${s}) rồi khai triển: ${vh(...u)}·${vh(...v)} = ${k<0?'('+sg(k)+')':k}·${s}² = ${sg(k*s*s)}.`,chk:()=>Number.isInteger(k)}}
});
TL12('tl12-6-vec',2,'VD','c',[6],r=>{
  const [A,B,C,D]=r.shuffle(['A','B','C','D']),s=r.int(2,5),uv=(()=>{for(;;){const u=niceV(r,2),v=niceV(r,3),k=vdot(bv(...u),bv(...v));if(k&&u[0]+u[1]!==v[0]+v[1]&&k*k!==vlen2(bv(...u))*vlen2(bv(...v)))return{u,v,k}}})();
  return{kind:'tl',title:'Vectơ trong không gian',parts:[
    {pts:.5,html:`Cho tứ diện ${I('ABCD')}. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I(srt12(A,B))} và ${I(srt12(C,D))}. Chứng minh rằng ${vh('M','N')} = ${fr(1,2)}(${vh(A,D)} + ${vh(B,C)}).`},
    {pts:.5,html:`Cho hình lập phương ${BOXT} có cạnh bằng ${s}. Tính ${vh(...uv.u)}·${vh(...uv.v)}.`}],
    sol:[ptxt([[`${vh('M','N')} = ${vh('M',A)} + ${vh(A,D)} + ${vh(D,'N')} và ${vh('M','N')} = ${vh('M',B)} + ${vh(B,C)} + ${vh(C,'N')}.`,.25],[`Cộng vế: 2${vh('M','N')} = (${vh('M',A)} + ${vh('M',B)}) + (${vh(A,D)} + ${vh(B,C)}) + (${vh(D,'N')} + ${vh(C,'N')}) = ${vh(A,D)} + ${vh(B,C)} (vì M, N là trung điểm). Suy ra điều phải chứng minh.`,.25]]),
      ptxt([[`Đặt ${vc(I('x'))} = ${vh('A','B')}, ${vc(I('y'))} = ${vh('A','D')}, ${vc(I('z'))} = ${vh('A','A′')}: đôi một vuông góc, độ dài ${s}. ${vh(...uv.u)} = ${tupXYZ(bv(...uv.u))}, ${vh(...uv.v)} = ${tupXYZ(bv(...uv.v))}.`,.25],[`Khai triển: ${vh(...uv.u)}·${vh(...uv.v)} = ${uv.k<0?'('+sg(uv.k)+')':uv.k}·${s}² = ${sg(uv.k*s*s)}.`,.25]])],
    chk:()=>Number.isInteger(uv.k)};
});
const tupXYZ=v=>{const n=[vc(I('x')),vc(I('y')),vc(I('z'))],t=v.map((c,i)=>c?{c,n:n[i]}:null).filter(Boolean);return t.map((x,i)=>(i===0?(x.c<0?MINUS:''):(x.c<0?` ${MINUS} `:' + '))+(Math.abs(x.c)===1?'':Math.abs(x.c))+x.n).join('')||vc('0')};
TL12('tl12-6-dot',2,'VD','c',[6],r=>{
  for(;;){const p=r.int(2,6),q=r.int(1,5),th=r.pick([60,120]),ab=(th===60?1:-1)*p*q/2;if(!Number.isInteger(ab)||p===q)continue;
    /* (a + k b) ⊥ (a − b) ⟺ p² − ab + k(ab − q²) = 0 */
    const den=q*q-ab;if(den===0)continue;const kq=Q(p*p-ab,den);
    const A=vc(I('a')),B=vc(I('b')),s=p*p+q*q+2*ab;
    return{kind:'tl',title:'Tích vô hướng của hai vectơ',parts:[
      {pts:.5,html:`Trong không gian, cho hai vectơ ${A}, ${B} có |${A}| = ${p}, |${B}| = ${q} và (${A}, ${B}) = ${th}°. Tính ${A}·${B} và |${A} + ${B}|.`},
      {pts:.5,html:`Tìm số thực ${I('k')} để hai vectơ ${A} + ${I('k')}${B} và ${A} ${MINUS} ${B} vuông góc với nhau.`}],
      sol:[ptxt([[`${A}·${B} = ${p}·${q}·cos ${th}° = ${sg(ab)}.`,.25],[`|${A} + ${B}|² = ${p*p} + 2·(${sg(ab)}) + ${q*q} = ${s} ⟹ |${A} + ${B}| = ${Number.isInteger(Math.sqrt(s))?Math.sqrt(s):rt(s)}.`,.25]]),
        ptxt([[`(${A} + k${B})·(${A} − ${B}) = |${A}|² − ${A}·${B} + k${A}·${B} − k|${B}|² = ${sg(p*p-ab)} ${(ab-q*q)<0?MINUS:'+'} ${Math.abs(ab-q*q)}k.`,.25],[`Hai vectơ vuông góc ⟺ ${sg(p*p-ab)} ${(ab-q*q)<0?MINUS:'+'} ${Math.abs(ab-q*q)}k = 0 ⟺ k = ${qh(kq)}.`,.25]])],
      chk:()=>Math.abs(p*p-ab+qv(kq)*(ab-q*q))<1e-9}}
});

/* ===================== Bài 7: Hệ trục toạ độ trong không gian ===================== */
const pt3=r=>[r.nz(-6,6),r.nz(-6,6),r.nz(-6,6)];
N12('k12-7-proj',2,'NB',[7],r=>{
  const [x,y,z]=pt3(r),k=r.int(0,5),nm=r.pick(['M','N','A','E']);
  const T7=[['mặt phẳng (Oxy)',[x,y,0]],['mặt phẳng (Oyz)',[0,y,z]],['mặt phẳng (Oxz)',[x,0,z]],['trục Ox',[x,0,0]],['trục Oy',[0,y,0]],['trục Oz',[0,0,z]]][k];
  const W=[[x,y,0],[0,y,z],[x,0,z],[x,0,0],[0,y,0],[0,0,z],[x,y,-z],[-x,y,z]].filter(v=>!veq(v,T7[1])).map(tup);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, hình chiếu vuông góc của điểm ${I(nm)}${tup([x,y,z])} trên ${T7[0]} là điểm có toạ độ`,correct:tup(T7[1]),wrongs:r.shuffle(W),
    sol:`Hình chiếu vuông góc trên ${T7[0]} giữ nguyên ${k<3?'hai toạ độ ứng với hai trục của mặt phẳng':'toạ độ ứng với trục đó'} và các toạ độ còn lại bằng 0: ${tup(T7[1])}.`,chk:()=>true});
});
N12('k12-7-ijk',2,'NB',[7],r=>{
  const v=[r.int(-6,6),r.int(-6,6),r.int(-6,6)];if(v.filter(x=>x).length<2)return T.nlc['k12-7-ijk'].gen(r);
  const ijk=['i','j','k'].map(s=>vc(I(s))),e=v.map((c,i)=>c?{c,n:ijk[i]}:null).filter(Boolean).map((x,i)=>(i===0?(x.c<0?MINUS:''):(x.c<0?` ${MINUS} `:' + '))+(Math.abs(x.c)===1?'':Math.abs(x.c))+x.n).join('');
  const A=vc(I('a')),W=[[v[1],v[0],v[2]],[v[0],v[2],v[1]],[-v[0],v[1],v[2]],[v[0],-v[1],v[2]],[v[2],v[1],v[0]],[v[0],v[1],-v[2]],[-v[0],-v[1],-v[2]],[v[0]+1,v[1],v[2]]].filter(w=>!veq(w,v)).map(tup);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho vectơ ${A} = ${e}. Toạ độ của vectơ ${A} là`,correct:tup(v),wrongs:r.shuffle(uniqBy(W,x=>x)),
    sol:`${A} = x${ijk[0]} + y${ijk[1]} + z${ijk[2]} ⟺ ${A} = (x; y; z). Do đó ${A} = ${tup(v)}.`,chk:()=>true});
});
N12('k12-7-AB',2,'NB',[7],r=>{
  const A=pt3(r),B=pt3(r),v=vsub(B,A);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Toạ độ của vectơ ${vh('A','B')} là`,correct:tup(v),wrongs:uniqBy([tup(vmul(v,-1)),tup(vadd(A,B)),tup(vmul(vadd(A,B),.5)),tup([v[0],v[1],-v[2]]),tup([v[0],v[1],v[2]+1]),tup(vsub(A,vmul(B,1)).map((x,i)=>i?x:x+1))],x=>x).filter(x=>x!==tup(v)),
    sol:`${vh('A','B')} = (x${sub('B')} − x${sub('A')}; y${sub('B')} − y${sub('A')}; z${sub('B')} − z${sub('A')}) = ${tup(v)}.`,chk:()=>veq(vadd(A,v),B)});
});
N12('k12-7-sym',2,'TH',[7],r=>{
  const [x,y,z]=pt3(r),k=r.int(0,4);
  const T7=[['mặt phẳng (Oxy)',[x,y,-z]],['mặt phẳng (Oyz)',[-x,y,z]],['mặt phẳng (Oxz)',[x,-y,z]],['trục Ox',[x,-y,-z]],['gốc toạ độ O',[-x,-y,-z]]][k];
  const W=[[x,y,-z],[-x,y,z],[x,-y,z],[x,-y,-z],[-x,-y,-z],[x,y,0],[-x,-y,z]].filter(v=>!veq(v,T7[1])).map(tup);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, điểm đối xứng với điểm ${I('M')}${tup([x,y,z])} qua ${T7[0]} có toạ độ là`,correct:tup(T7[1]),wrongs:r.shuffle(W),
    sol:`Gọi H là hình chiếu của M trên ${T7[0]}; điểm đối xứng M′ thoả mãn H là trung điểm MM′. ${k===4?'Đối xứng qua O: đổi dấu cả ba toạ độ':'Ta đổi dấu các toạ độ không thuộc '+T7[0]}: M′${tup(T7[1])}.`,chk:()=>true});
});
N12('k12-7-box',2,'TH',[7],r=>{
  const a=r.int(2,8),b=r.int(2,8),c=r.int(2,8),k=r.int(0,3);
  const V7={B:[a,b,0],"A′":[a,0,c],"C′":[0,b,c],"B′":[a,b,c]},nm=['B','A′','C′','B′'][k],cor=V7[nm];
  const W=[[a,b,c],[a,b,0],[a,0,c],[0,b,c],[b,a,c],[a,c,b]].filter(v=>!veq(v,cor)).map(tup);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hình hộp chữ nhật ${I('OABC.O′A′B′C′')} có ${I('A')}(${a}; 0; 0), ${I('C')}(0; ${b}; 0), ${I('O′')}(0; 0; ${c}). Toạ độ của điểm ${I(nm)} là`,correct:tup(cor),wrongs:r.shuffle(uniqBy(W,x=>x)),
    sol:`${vh('O',nm)} = ${nm==='B'?`${vh('O','A')} + ${vh('O','C')}`:nm==='A′'?`${vh('O','A')} + ${vh('O','O′')}`:nm==='C′'?`${vh('O','C')} + ${vh('O','O′')}`:`${vh('O','A')} + ${vh('O','C')} + ${vh('O','O′')}`} nên ${I(nm)}${tup(cor)}.`,chk:()=>true});
});
N12('k12-7-dist',2,'TH',[7],r=>{
  const [x,y,z]=pt3(r),k=r.int(0,2),pl=['(Oxy)','(Oyz)','(Oxz)'][k],d=Math.abs([z,x,y][k]);
  return mkNum(r,{stem:`Trong không gian ${I('Oxyz')}, khoảng cách từ điểm ${I('M')}${tup([x,y,z])} đến mặt phẳng ${pl} bằng`,correct:d,ok:v=>v>0,cands:[Math.abs(x),Math.abs(y),Math.abs(z),Math.abs(x)+Math.abs(y)].filter(v=>v!==d),
    sol:`Hình chiếu của M trên ${pl} là H; MH bằng giá trị tuyệt đối của toạ độ còn lại: ${d}.`,chk:()=>d>0});
});
DS12('ds12-7-pt',2,'NB',[7],r=>{
  const [x,y,z]=pt3(r),ijk=['i','j','k'].map(s=>vc(I(s)));
  const e=(v)=>v.map((c,i)=>({c,n:ijk[i]})).map((t,i)=>(i===0?(t.c<0?MINUS:''):(t.c<0?` ${MINUS} `:' + '))+(Math.abs(t.c)===1?'':Math.abs(t.c))+t.n).join('');
  return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho điểm ${I('M')}${tup([x,y,z])}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Hình chiếu vuông góc của ${I('M')} trên mặt phẳng (Oxy) là ${tup([x,y,0])}.`,f:`Hình chiếu vuông góc của ${I('M')} trên mặt phẳng (Oxy) là ${tup([0,0,z])}.`,why:`Hình chiếu trên (Oxy) giữ hoành độ, tung độ và có cao độ 0.`},
    {t:`Hình chiếu vuông góc của ${I('M')} trên trục Oz là ${tup([0,0,z])}.`,f:`Hình chiếu vuông góc của ${I('M')} trên trục Oz là ${tup([x,y,0])}.`,why:`Hình chiếu trên Oz là (0; 0; ${sg(z)}).`},
    {t:`Điểm đối xứng với ${I('M')} qua mặt phẳng (Oxz) là ${tup([x,-y,z])}.`,f:`Điểm đối xứng với ${I('M')} qua mặt phẳng (Oxz) là ${tup([-x,y,-z])}.`,why:`Đối xứng qua (Oxz): đổi dấu tung độ.`},
    {t:`${vh('O','M')} = ${e([x,y,z])}.`,f:`${vh('O','M')} = ${e([x,y,-z])}.`,why:`${vh('O','M')} = (${sg(x)}; ${sg(y)}; ${sg(z)}) nên ${vh('O','M')} = ${e([x,y,z])}.`}],
    chk:()=>z!==0});
});
TLN12('t12-7-room',2,'TH',[7],r=>{
  const a=2*r.int(2,6),b=2*r.int(2,5),h=r.pick([3,3.2,3.5,4]);
  return{kind:'tln',stem:`Một phòng học có dạng hình hộp chữ nhật với chiều dài ${a} m, chiều rộng ${b} m và chiều cao ${fmt(h)} m. Một chiếc đèn được treo tại chính giữa trần nhà. Chọn hệ trục ${I('Oxyz')} có gốc ${I('O')} là một góc phòng, mặt phẳng (Oxy) trùng mặt sàn, các trục Ox, Oy lần lượt dọc theo chiều dài, chiều rộng của phòng (đơn vị: mét). Giả sử đèn có toạ độ (${I('a')}; ${I('b')}; ${I('c')}). Tính ${I('a')} + ${I('b')} + ${I('c')}.`,ans:a/2+b/2+h,unit:'',
    sol:`Đèn ở chính giữa trần nên có toạ độ (${a/2}; ${b/2}; ${fmt(h)}). Tổng: ${fmt(a/2+b/2+h)}.`,chk:()=>true};
});
TL12('tl12-7-room',2,'TH','c',[7],r=>{
  const a=r.int(4,10),b=r.int(3,8),h=r.pick([3,4]),x=r.int(1,a-1),y=r.int(1,b-1),d=r.pick([0.5,1]);
  return{kind:'tl',title:'Hệ trục toạ độ trong không gian',parts:[
    {pts:.5,html:`Một căn phòng có dạng hình hộp chữ nhật ${I('OABC.O′A′B′C′')} với ${I('OA')} = ${a} m, ${I('OC')} = ${b} m, ${I('OO′')} = ${h} m. Chọn hệ trục ${I('Oxyz')} sao cho ${I('A')}, ${I('C')}, ${I('O′')} lần lượt nằm trên các tia Ox, Oy, Oz (đơn vị: mét). Tìm toạ độ các điểm ${I('B')}, ${I('O′')}, ${I('B′')}.`},
    {pts:.5,html:`Một chiếc đèn treo cách trần ${fmt(d)} m, cách bức tường (Oxz) ${y} m và cách bức tường (Oyz) ${x} m. Tìm toạ độ của đèn và toạ độ hình chiếu vuông góc của đèn trên mặt sàn.`}],
    sol:[ptxt([[`${I('B')}(${a}; ${b}; 0), ${I('O′')}(0; 0; ${h}).`,.25],[`${I('B′')}(${a}; ${b}; ${h}).`,.25]]),
      ptxt([[`Đèn có hoành độ ${x}, tung độ ${y}, cao độ ${h} − ${fmt(d)} = ${fmt(h-d)}: đèn ở điểm (${x}; ${y}; ${fmt(h-d)}).`,.25],[`Hình chiếu trên mặt sàn (Oxy) là (${x}; ${y}; 0).`,.25]])],
    chk:()=>x<a&&y<b};
});

/* ===================== Bài 8: Biểu thức toạ độ của các phép toán vectơ ===================== */
const B8='b8';
const vecN=(n,v)=>`${vc(I(n))}${tup(v)}`;
N12('k12-8-lin',2,'NB',[8],r=>{
  const a=pt3(r),b=pt3(r),m=r.pick([1,2,3]),n=r.pick([1,2,-1,-2]),v=vadd(vmul(a,m),vmul(b,n));
  const ex=`${m===1?'':m}${vc(I('a'))} ${n<0?MINUS:'+'} ${Math.abs(n)===1?'':Math.abs(n)}${vc(I('b'))}`;
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai vectơ ${vecN('a',a)} và ${vecN('b',b)}. Toạ độ của vectơ ${ex} là`,correct:tup(v),wrongs:uniqBy([tup(vadd(vmul(a,m),vmul(b,-n))),tup(vadd(a,vmul(b,n))),tup(vadd(vmul(a,m),b)),tup(vmul(v,-1)),tup(vadd(vmul(a,m+1),vmul(b,n))),tup(v.map((x,i)=>i===1?x+1:x)),tup(v.map((x,i)=>i===2?-x:x))],x=>x).filter(x=>x!==tup(v)),
    sol:`${ex} = (${m}·${a[0]<0?'('+sg(a[0])+')':a[0]} + ${n<0?'('+n+')':n}·${b[0]<0?'('+sg(b[0])+')':b[0]}; …) = ${tup(v)}.`.replace(/\(-/g,'('+MINUS),chk:()=>veq(v,a.map((x,i)=>m*x+n*b[i]))});
});
N12('k12-8-dot',2,'NB',[8],r=>{
  const a=pt3(r),b=pt3(r),d=vdot(a,b);
  return mkNum(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai vectơ ${vecN('a',a)} và ${vecN('b',b)}. Tích vô hướng ${vc(I('a'))}·${vc(I('b'))} bằng`,correct:d,ok:()=>true,cands:[-d,d+2*a[2]*b[2],a[0]*b[0]+a[1]*b[1]-a[2]*b[2],a[0]*b[1]+a[1]*b[2]+a[2]*b[0]].filter(v=>v!==d),
    sol:`${vc(I('a'))}·${vc(I('b'))} = ${a.map((x,i)=>`${x<0?'('+sg(x)+')':x}·${b[i]<0?'('+sg(b[i])+')':b[i]}`).join(' + ')} = ${sg(d)}.`,chk:()=>d===a[0]*b[0]+a[1]*b[1]+a[2]*b[2]});
},B8);
const PYQ=[[1,2,2,3],[2,3,6,7],[1,4,8,9],[4,4,7,9],[2,6,9,11],[6,6,7,11],[0,3,4,5],[2,2,1,3],[3,4,12,13],[2,10,11,15],[0,6,8,10],[4,8,1,9]];
const pyq=r=>{const q=r.pick(PYQ),s=r.shuffle(q.slice(0,3)).map(x=>x*r.sign());return{v:s,l:q[3]}};
N12('k12-8-len',2,'NB',[8],r=>{
  const {v,l}=pyq(r),A=pt3(r),B=vadd(A,v),ask=r.chance(.5);
  return mkNum(r,{stem:ask?`Trong không gian ${I('Oxyz')}, độ dài của vectơ ${vecN('u',v)} bằng`:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Độ dài đoạn thẳng ${I('AB')} bằng`,correct:l,ok:v2=>v2>0,cands:[l*l,Math.abs(v[0])+Math.abs(v[1])+Math.abs(v[2]),l+1,l-1],
    sol:ask?`|${vc(I('u'))}| = ${rt(v.map(x=>x<0?`(${sg(x)})²`:`${x}²`).join(' + '))} = ${l}.`:`${vh('A','B')} = ${tup(v)} nên AB = ${rt(v.map(x=>x<0?`(${sg(x)})²`:`${x}²`).join(' + '))} = ${l}.`,chk:()=>vlen2(v)===l*l});
},B8);
N12('k12-8-mid',2,'NB',[8],r=>{
  const A=pt3(r),B=A.map(x=>x+2*r.int(-4,4)),M=vmul(vadd(A,B),.5),ask=r.chance(.6);
  if(ask)return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Toạ độ trung điểm ${I('M')} của đoạn thẳng ${I('AB')} là`,correct:tup(M),wrongs:uniqBy([tup(vsub(B,A)),tup(vadd(A,B)),tup(vmul(vsub(B,A),.5)),tup(vsub(vmul(A,2),B)),tup(M.map((x,i)=>i===0?x+1:x)),tup(M.map((x,i)=>i===2?-x:x))],x=>x).filter(x=>x!==tup(M)),
    sol:`M(${fr('x<sub>A</sub> + x<sub>B</sub>',2)}; ${fr('y<sub>A</sub> + y<sub>B</sub>',2)}; ${fr('z<sub>A</sub> + z<sub>B</sub>',2)}) = ${tup(M)}.`,chk:()=>veq(vmul(vadd(A,B),.5),M)});
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho điểm ${I('A')}${tup(A)} và ${I('M')}${tup(M)}. Biết ${I('M')} là trung điểm của đoạn thẳng ${I('AB')}, toạ độ điểm ${I('B')} là`,correct:tup(B),wrongs:uniqBy([tup(vmul(vadd(A,M),.5)),tup(vsub(vmul(A,2),M)),tup(vadd(A,M)),tup(vsub(M,A)),tup(B.map((x,i)=>i===1?x+1:x)),tup(B.map((x,i)=>i===2?-x:x))],x=>x).filter(x=>x!==tup(B)),
    sol:`B = 2M − A: x<sub>B</sub> = 2x<sub>M</sub> − x<sub>A</sub>, … ⟹ B${tup(B)}.`,chk:()=>veq(vsub(vmul(M,2),A),B)});
},B8);
N12('k12-8-cent',2,'TH',[8],r=>{
  const G=pt3(r),A=pt3(r),B=pt3(r),C=vsub(vmul(G,3),vadd(A,B)),ask=r.chance(.5);
  if(ask)return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho tam giác ${I('ABC')} có ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)}. Toạ độ trọng tâm ${I('G')} của tam giác ${I('ABC')} là`,correct:tup(G),wrongs:uniqBy([tup(vmul(G,3)),tup(vmul(vadd(A,B),.5)),tup(vmul(vadd(vadd(A,B),C),.5)),tup(vmul(G,-1))],x=>x).filter(x=>x!==tup(G)),
    sol:`G(${fr('x<sub>A</sub> + x<sub>B</sub> + x<sub>C</sub>',3)}; …) = ${tup(G)}.`,chk:()=>veq(vmul(vadd(vadd(A,B),C),1/3),G)});
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho ${I('A')}${tup(A)}, ${I('B')}${tup(B)} và ${I('G')}${tup(G)}. Biết tam giác ${I('ABC')} có trọng tâm là ${I('G')}. Toạ độ điểm ${I('C')} là`,correct:tup(C),wrongs:uniqBy([tup(vsub(G,vadd(A,B))),tup(vmul(vadd(vadd(A,B),G),1/3).map(x=>Math.round(x))),tup(vsub(vmul(G,3),vsub(A,B))),tup(vmul(C,-1))],x=>x).filter(x=>x!==tup(C)),
    sol:`C = 3G − A − B ⟹ C${tup(C)}.`,chk:()=>veq(vadd(vadd(A,B),C),vmul(G,3))});
},B8);
N12('k12-8-cos',2,'TH',[8],r=>{
  /* chọn cặp vectơ nguyên có góc đẹp */
  const B0=[[1,0,0],[0,1,0],[0,0,1],[1,1,0],[1,0,1],[0,1,1],[1,-1,0],[1,0,-1],[0,1,-1],[1,1,1],[1,-1,1]];
  for(;;){const u=vmul(r.pick(B0),r.pick([1,2,-1])),v=vmul(r.pick(B0),r.pick([1,2,-2,3])),c=vdot(u,v)/Math.sqrt(vlen2(u)*vlen2(v));
    const th=[0,30,45,60,90,120,135,150,180].find(t=>Math.abs(ANG_V[t][0]-c)<1e-9);if(th===undefined||th===0||th===180)continue;
    const p=r.shuffle([0,1,2]),U=p.map(i=>u[i]),V=p.map(i=>v[i]);
    return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai vectơ ${vecN('a',U)} và ${vecN('b',V)}. Góc giữa hai vectơ ${vc(I('a'))} và ${vc(I('b'))} bằng`,correct:th+'°',wrongs:r.shuffle([30,45,60,90,120,135,150].filter(t=>t!==th&&t!==180-th)).concat([180-th]).map(t=>t+'°'),
      sol:`cos(${vc(I('a'))}, ${vc(I('b'))}) = ${fr(`${vc(I('a'))}·${vc(I('b'))}`,`|${vc(I('a'))}|·|${vc(I('b'))}|`)} = ${fr(sg(vdot(U,V)),`${sqH(vlen2(U))}·${sqH(vlen2(V))}`)} = ${ANG_V[th][1]} ⟹ (${vc(I('a'))}, ${vc(I('b'))}) = ${th}°.`,chk:()=>Math.abs(Math.acos(vdot(U,V)/Math.sqrt(vlen2(U)*vlen2(V)))*180/Math.PI-th)<1e-6})}
},B8);
N12('k12-8-perp',2,'TH',[8],r=>{
  for(;;){const a=pt3(r),b0=pt3(r),i=r.int(0,2);if(a[i]===0)continue;
    /* b = b0 với toạ độ i thay bởi m: a·b = 0 */
    const rest=vdot(a,b0)-a[i]*b0[i];if(rest%a[i])continue;const m=-rest/a[i];if(Math.abs(m)>20)continue;
    const bH=b0.map((x,j)=>j===i?I('m'):sg(x)).join('; ');
    return mkNum(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai vectơ ${vecN('a',a)} và ${vc(I('b'))}(${bH}). Giá trị của ${I('m')} để ${vc(I('a'))} ⊥ ${vc(I('b'))} là`,correct:m,ok:()=>true,cands:[-m,m+1,m-2,rest].filter(v=>v!==m),
      sol:`${vc(I('a'))} ⊥ ${vc(I('b'))} ⟺ ${vc(I('a'))}·${vc(I('b'))} = 0 ⟺ ${sg(rest)} + ${a[i]<0?'('+sg(a[i])+')':a[i]}m = 0 ⟺ m = ${sg(m)}.`,chk:()=>vdot(a,b0.map((x,j)=>j===i?m:x))===0})}
},B8);
N12('k12-8-para',2,'TH',[8],r=>{
  const A=pt3(r),B=pt3(r),C=pt3(r),D=vsub(vadd(A,C),B);
  if(veq(vsub(B,A),vmul(vsub(C,A),vlen2(vsub(B,A))/Math.max(1,vdot(vsub(C,A),vsub(B,A))))))return T.nlc['k12-8-para'].gen(r);
  return mkTxt(r,{stem:`Trong không gian ${I('Oxyz')}, cho hình bình hành ${I('ABCD')} có ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)}. Toạ độ điểm ${I('D')} là`,correct:tup(D),wrongs:uniqBy([tup(vsub(vadd(A,B),C)),tup(vsub(vadd(B,C),A)),tup(vsub(B,vadd(A,C)).map(x=>-x).map((x,i)=>x+0*i).map((x,i)=>i===2?x+1:x)),tup(vmul(D,-1))],x=>x).filter(x=>x!==tup(D)),
    sol:`ABCD là hình bình hành ⟺ ${vh('A','D')} = ${vh('B','C')} ⟺ D = A + C − B = ${tup(D)}.`,chk:()=>veq(vsub(D,A),vsub(C,B))});
},B8);
N12('k12-8-coll',2,'TH',[8],r=>{
  const u=pt3(r),k=r.pick([2,-2,3,-1,-3]),v=vmul(u,k),i=r.int(0,2),j=(i+1+r.int(0,1))%3;
  const vh2=v.map((x,t)=>t===i?I('m'):t===j?I('n'):sg(x)).join('; ');
  return mkNum(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai vectơ ${vecN('a',u)} và ${vc(I('b'))}(${vh2}) cùng phương. Giá trị của ${I('m')} + ${I('n')} bằng`,correct:v[i]+v[j],ok:()=>true,cands:[u[i]+u[j],-(v[i]+v[j]),v[i]-v[j],v[i]+v[j]+k].filter(x=>x!==v[i]+v[j]),
    sol:`${vc(I('b'))} cùng phương ${vc(I('a'))} ⟹ ${vc(I('b'))} = k${vc(I('a'))}; từ toạ độ đã biết suy ra k = ${sg(k)}. Do đó m = ${sg(v[i])}, n = ${sg(v[j])}, m + n = ${sg(v[i]+v[j])}.`,chk:()=>u[3-i-j]!==0&&veq(vmul(u,k),v)});
},B8);
DS12('ds12-8-tri',2,'TH',[8],r=>{
  for(;;){const A=pt3(r),p=pyq(r),u=p.v,w0=[r.int(-3,3),r.int(-3,3),r.int(-3,3)];
    /* chọn w ⊥ u để tam giác vuông tại A khi cần */
    const right=r.chance(.5);let w=w0;
    if(right){const cand=[[u[1],-u[0],0],[0,u[2],-u[1]],[u[2],0,-u[0]]].filter(x=>vlen2(x)>0);w=r.pick(cand)}
    if(vlen2(w)===0)continue;const B=vadd(A,u),C=vadd(A,w),G=vmul(vadd(vadd(A,B),C),1/3);if(!G.every(Number.isInteger))continue;
    const d=vdot(u,w);if(Math.abs(vdot(u,w))===Math.sqrt(vlen2(u)*vlen2(w)))continue;
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho ba điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${vh('A','B')} = ${tup(u)}.`,f:`${vh('A','B')} = ${tup(vmul(u,-1))}.`,why:`${vh('A','B')} = B − A = ${tup(u)}.`},
      {t:`${I('AB')} = ${p.l}.`,f:`${I('AB')} = ${p.l*p.l}.`,why:`AB = |${vh('A','B')}| = ${p.l}.`},
      {t:`Trọng tâm của tam giác ${I('ABC')} là ${I('G')}${tup(G)}.`,f:`Trọng tâm của tam giác ${I('ABC')} là ${I('G')}${tup(vmul(vadd(B,C),.5))}.`,why:`G = (A + B + C)/3 = ${tup(G)}.`},
      {t:`Tam giác ${I('ABC')} ${d===0?'':'không '}vuông tại ${I('A')}.`,f:`Tam giác ${I('ABC')} ${d===0?'không ':''}vuông tại ${I('A')}.`,why:`${vh('A','B')}·${vh('A','C')} = ${sg(d)}${d===0?' nên AB ⊥ AC':' ≠ 0'}.`}],
      chk:()=>!veq(G,vmul(vadd(B,C),.5))&&p.l!==p.l*p.l})}
},B8);
DS12('ds12-8-vec',2,'NB',[8],r=>{
  const a=pt3(r),b=pt3(r),s=vadd(a,b),d=vdot(a,b),la=vlen2(a),m=r.pick([2,3]);
  return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho hai vectơ ${vecN('a',a)} và ${vecN('b',b)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${vc(I('a'))} + ${vc(I('b'))} = ${tup(s)}.`,f:`${vc(I('a'))} + ${vc(I('b'))} = ${tup(vsub(a,b))}.`,why:`Cộng từng toạ độ: ${tup(s)}.`},
    {t:`${m}${vc(I('a'))} = ${tup(vmul(a,m))}.`,f:`${m}${vc(I('a'))} = ${tup([a[0]*m,a[1],a[2]])}.`,why:`Nhân từng toạ độ với ${m}.`},
    {t:`${vc(I('a'))}·${vc(I('b'))} = ${sg(d)}.`,f:`${vc(I('a'))}·${vc(I('b'))} = ${sg(d+(d===0?2:-2*d))}.`,why:`${vc(I('a'))}·${vc(I('b'))} = ${a.map((x,i)=>`${x<0?'('+sg(x)+')':x}·${b[i]<0?'('+sg(b[i])+')':b[i]}`).join(' + ')} = ${sg(d)}.`},
    {t:`|${vc(I('a'))}| = ${Number.isInteger(Math.sqrt(la))?Math.sqrt(la):rt(la)}.`,f:`|${vc(I('a'))}| = ${la}.`,why:`|${vc(I('a'))}| = ${rt(a.map(x=>x<0?`(${sg(x)})²`:`${x}²`).join(' + '))} = ${Number.isInteger(Math.sqrt(la))?Math.sqrt(la):rt(la)}.`}],
    chk:()=>a[0]*m!==a[0]&&la!==1&&!veq(s,vsub(a,b))});
},B8);
TLN12('t12-8-oz',2,'VD',[8],r=>{
  for(;;){const A=pt3(r),B=pt3(r),ax=r.int(0,2),nm=['Ox','Oy','Oz'][ax];
    /* M trên trục: MA² = MB² ⟺ 2t(B−A)[ax] = |B|² − |A|² */
    const den=2*(B[ax]-A[ax]);if(!den)continue;const num=vlen2(B)-vlen2(A);if(num%den)continue;const t=num/den;if(Math.abs(t)>40)continue;
    const M=[0,0,0];M[ax]=t;
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Điểm ${I('M')} thuộc trục ${nm} sao cho ${I('MA')} = ${I('MB')}. Tìm ${['hoành độ','tung độ','cao độ'][ax]} của điểm ${I('M')}.`,ans:t,unit:'',
      sol:`Gọi M có ${['hoành độ','tung độ','cao độ'][ax]} t, hai toạ độ còn lại bằng 0. MA² = MB² ⟺ ${sg(den)}t = ${sg(num)} ⟺ t = ${sg(t)}.`,chk:()=>vlen2(vsub(A,M))===vlen2(vsub(B,M))}}
},B8);
TLN12('t12-8-plane',2,'VD',[8],r=>{
  const A=[r.int(300,900),r.int(200,700),r.int(5,9)],d=[2*r.int(20,80),2*r.int(10,40),r.pick([1,2])],B=vadd(A,d),k=r.pick([[5,10],[10,10],[15,10],[10,20]]),C=vadd(B,vmul(d,k[0]/k[1]));
  return{kind:'tln',stem:`Trong không gian với hệ trục ${I('Oxyz')} (đơn vị: km), radar phát hiện một máy bay bay với vận tốc và hướng không đổi từ điểm ${I('A')}${tup(A)} đến điểm ${I('B')}${tup(B)} trong ${k[1]} phút. Nếu máy bay giữ nguyên vận tốc và hướng bay thì sau ${k[0]} phút tiếp theo máy bay ở điểm ${I('C')}(${I('a')}; ${I('b')}; ${I('c')}). Tính ${I('a')} + ${I('b')} + ${I('c')}.`,ans:C[0]+C[1]+C[2],unit:'',
    sol:`${vh('B','C')} cùng hướng ${vh('A','B')} và BC = ${fr(k[0],k[1])}AB nên ${vh('B','C')} = ${fr(k[0],k[1])}${vh('A','B')} = ${tup(vmul(d,k[0]/k[1]))}. Suy ra C${tup(C)} và a + b + c = ${fmt(C[0]+C[1]+C[2])}.`,chk:()=>veq(vsub(C,B),vmul(vsub(B,A),k[0]/k[1]))};
},B8);
TLN12('t12-8-ball',2,'VD',[8],r=>{
  const s1=r.int(1,4),e1=r.int(1,4),h1=r.pick([0.3,0.5,0.8,1]),n2=r.int(1,4),w2=r.int(1,4),h2=r.pick([0.4,0.6,0.7,1.2]);
  /* Ox hướng nam, Oy hướng đông, Oz hướng lên */
  const P=[s1,e1,h1],Q2=[-n2,-w2,h2],dd=Math.sqrt(vlen2(vsub(P,Q2))),ans=Math.round(dd*100)/100;
  return{kind:'tln',stem:`Hai khinh khí cầu bay lên từ cùng một địa điểm. Khinh khí cầu thứ nhất cách điểm xuất phát ${s1} km về phía nam và ${e1} km về phía đông, cách mặt đất ${fmt(h1)} km. Khinh khí cầu thứ hai cách điểm xuất phát ${n2} km về phía bắc và ${w2} km về phía tây, cách mặt đất ${fmt(h2)} km. Tính khoảng cách giữa hai khinh khí cầu (đơn vị: km, làm tròn đến hàng phần trăm).`,ans,unit:'km',
    sol:`Chọn hệ trục Oxyz gốc tại điểm xuất phát, Ox hướng nam, Oy hướng đông, Oz hướng lên trời. Hai khinh khí cầu ở ${tup(P)} và ${tup(Q2)}. Khoảng cách: ${rt(`${s1+n2}² + ${e1+w2}² + ${fmt(Math.abs(h1-h2))}²`)} ≈ ${fmt(ans)} (km).`,chk:()=>Math.abs(dd-ans)<0.006};
},B8);
TLN12('t12-8-ang',2,'VD',[8],r=>{
  const B0=[[1,0,0],[0,1,0],[0,0,1],[1,1,0],[1,0,1],[0,1,1],[1,-1,0],[1,0,-1],[0,1,-1],[2,2,1],[1,2,2],[2,1,2]];
  for(;;){const A=pt3(r),u=vmul(r.pick(B0),r.pick([1,2,-1])),w=vmul(r.pick(B0),r.pick([1,2,-1,3])),c=vdot(u,w)/Math.sqrt(vlen2(u)*vlen2(w));
    const th=[30,45,60,90,120,135,150].find(t=>Math.abs(ANG_V[t][0]-c)<1e-9);if(th===undefined)continue;
    const B=vadd(A,u),C=vadd(A,w);
    return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, cho ba điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)}. Tính số đo góc ${I('BAC')} (đơn vị: độ).`,ans:th,unit:'°',
      sol:`${vh('A','B')} = ${tup(u)}, ${vh('A','C')} = ${tup(w)}; cos ${I('BAC')} = ${fr(sg(vdot(u,w)),`${sqH(vlen2(u))}·${sqH(vlen2(w))}`)} = ${ANG_V[th][1]} ⟹ ${I('BAC')} = ${th}°.`,chk:()=>Math.abs(Math.acos(c)*180/Math.PI-th)<1e-6}}
},B8);
TL12('tl12-8-tri',2,'VD','c',[8],r=>{
  for(;;){const A=pt3(r),p=pyq(r),u=p.v,cand=[[u[1],-u[0],0],[0,u[2],-u[1]],[u[2],0,-u[0]]].filter(x=>vlen2(x)>0),w=vmul(r.pick(cand),r.pick([1,-1,2]));
    const B=vadd(A,u),C=vadd(A,w),D=vsub(vadd(B,C),A),lw=vlen2(w),lwr=Number.isInteger(Math.sqrt(lw))?String(Math.sqrt(lw)):rt(lw);
    const S2=p.l*Math.sqrt(lw)/2,SH=Number.isInteger(Math.sqrt(lw))?fmt(S2):`${fr(p.l===1?rt(lw):p.l+rt(lw),2)}`;
    return{kind:'tl',title:'Toạ độ của vectơ trong không gian',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, cho ba điểm ${I('A')}${tup(A)}, ${I('B')}${tup(B)}, ${I('C')}${tup(C)}. Chứng minh tam giác ${I('ABC')} vuông tại ${I('A')} và tính diện tích tam giác đó.`},
      {pts:.5,html:`Tìm toạ độ điểm ${I('D')} sao cho ${I('ABDC')} là hình chữ nhật.`}],
      sol:[ptxt([[`${vh('A','B')} = ${tup(u)}, ${vh('A','C')} = ${tup(w)}; ${vh('A','B')}·${vh('A','C')} = 0 nên tam giác ABC vuông tại A.`,.25],[`AB = ${p.l}, AC = ${lwr}; S = ${fr(1,2)}AB·AC = ${SH}.`,.25]]),
        ptxt([[`Tam giác ABC vuông tại A nên ABDC là hình chữ nhật ⟺ ABDC là hình bình hành ⟺ ${vh('A','D')} = ${vh('A','B')} + ${vh('A','C')}.`,.25],[`Suy ra D = B + C − A = ${tup(D)}.`,.25]])],
      chk:()=>vdot(u,w)===0&&veq(vsub(D,B),vsub(C,A))}}
},B8);
TL12('tl12-8-real',2,'VD','c',[8],r=>{
  const a=r.int(5,9),b=r.int(4,7),c=r.pick([3,4]),x1=r.int(1,a-1),y1=r.int(1,b-1),h1=r.pick([0.5,0.8,1]),x2=r.int(1,a-1),y2=r.int(1,b-1),h2=r.pick([0.4,0.6,1.2]);
  const P=[x1,y1,c-h1],Q2=[x2,y2,c-h2],dd=Math.sqrt(vlen2(vsub(P,Q2))),ans=Math.round(dd*10)/10;
  if(x1===x2&&y1===y2)return T.tl['tl12-8-real'].gen(r);
  return{kind:'tl',title:'Vận dụng toạ độ vectơ trong thực tiễn',parts:[
    {pts:.5,html:`Một căn phòng dạng hình hộp chữ nhật có chiều dài ${a} m, chiều rộng ${b} m, chiều cao ${c} m. Một chiếc đèn treo cách trần ${fmt(h1)} m, cách hai bức tường vuông góc với nhau lần lượt ${x1} m và ${y1} m. Lập một hệ trục toạ độ ${I('Oxyz')} phù hợp và xác định toạ độ của chiếc đèn.`},
    {pts:.5,html:`Người ta di chuyển chiếc đèn đến vị trí mới cách trần ${fmt(h2)} m, cách hai bức tường đó lần lượt ${x2} m và ${y2} m. Hỏi vị trí mới cách vị trí ban đầu bao nhiêu mét? (Làm tròn đến hàng phần mười.)`}],
    sol:[ptxt([[`Chọn gốc O là góc phòng ở mặt sàn tại giao của hai bức tường, Ox, Oy dọc theo chân hai bức tường, Oz hướng lên (đơn vị: mét).`,.25],[`Đèn ở vị trí ban đầu: (${x1}; ${y1}; ${fmt(c-h1)}).`,.25]]),
      ptxt([[`Vị trí mới: (${x2}; ${y2}; ${fmt(c-h2)}).`,.25],[`Khoảng cách: ${rt(`${Math.abs(x1-x2)}² + ${Math.abs(y1-y2)}² + ${fmt(Math.abs(h1-h2))}²`)} ≈ ${fmt(ans)} (m).`,.25]])],
    chk:()=>Math.abs(dd-ans)<0.051};
},B8);
