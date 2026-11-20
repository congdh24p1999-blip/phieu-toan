/* ================================================================
   LỚP 10 – học kì I (tiếp)
   Chương III: Hệ thức lượng trong tam giác; Chương IV: Vectơ
   ================================================================ */
const DEG='°',RAD10=Math.PI/180;
const ANG10=[0,30,45,60,90,120,135,150,180];
const tv10=(fn,a)=>{const x=a*RAD10;return fn==='sin'?Math.sin(x):fn==='cos'?Math.cos(x):fn==='tan'?Math.tan(x):Math.cos(x)/Math.sin(x)};
const tvH=v=>{const z=svOf(v);return z?z[0]:null};
const cfH=c=>c===1?'':c===-1?MINUS:c<0?MINUS+(-c):String(c);/* hệ số đứng đầu */
const tfH=(fn,a)=>`${fn} ${a}${DEG}`;

/* ===================== Bài 5: Giá trị lượng giác của một góc từ 0° đến 180° ===================== */
N10('k10-5-val',3,'NB',[5],r=>{
  for(;;){const fn=r.pick(['sin','cos','tan','cot']),a=r.pick(ANG10);if((fn==='tan'&&a===90)||(fn==='cot'&&(a===0||a===180)))continue;
    const v=tv10(fn,a),h=tvH(Math.abs(v)<1e-12?0:v);if(!h)continue;
    const W=SVALL.map(z=>z[0]).filter(x=>x!==h),near_=W.filter(x=>x.replace(MINUS,'')===h.replace(MINUS,'')||x.includes(h.replace(MINUS,'')));
    return mkTxt(r,{stem:`Giá trị của ${tfH(fn,a)} bằng`,correct:h,wrongs:r.shuffle(near_).concat(r.shuffle(W)),sol:`Theo bảng giá trị lượng giác của các góc đặc biệt: ${tfH(fn,a)} = ${h}.`,chk:()=>true})}
});
N10('k10-5-supp',3,'NB',[5],r=>{
  const al=`α`,k=r.int(0,3),fns=['sin','cos','tan','cot'],sg_=[1,-1,-1,-1];
  const st=(fn,s)=>`${fn}(180${DEG} ${MINUS} ${al}) = ${s<0?MINUS:''}${fn} ${al}`;
  const cor=st(fns[k],sg_[k]),W=fns.filter((f,i)=>i!==k).map(f=>st(f,-sg_[fns.indexOf(f)])).concat([st(fns[k],-sg_[k])]);
  return mkTxt(r,{stem:`Cho góc ${al} với 0${DEG} < ${al} < 180${DEG}${k>=2?`, ${al} ≠ 90${DEG}`:''}. Đẳng thức nào sau đây đúng?`,correct:cor,wrongs:r.shuffle(W),
    sol:`Hai góc bù nhau thì sin bằng nhau; côsin, tang, côtang đối nhau: sin(180° − α) = sin α, cos(180° − α) = −cos α, tan(180° − α) = −tan α, cot(180° − α) = −cot α.`,chk:()=>true});
});
N10('k10-5-sign',3,'NB',[5],r=>{
  const obt=r.chance(.6),al='α',rng=obt?`90${DEG} < ${al} < 180${DEG}`:`0${DEG} < ${al} < 90${DEG}`;
  const T_=obt?[`sin ${al} > 0`,`cos ${al} < 0`,`tan ${al} < 0`,`cot ${al} < 0`]:[`sin ${al} > 0`,`cos ${al} > 0`,`tan ${al} > 0`,`cot ${al} > 0`];
  const F_=obt?[`sin ${al} < 0`,`cos ${al} > 0`,`tan ${al} > 0`,`cot ${al} > 0`]:[`sin ${al} < 0`,`cos ${al} < 0`,`tan ${al} < 0`,`cot ${al} < 0`];
  const want=r.chance(.5);
  if(want){const i=r.int(0,3);return mkTxt(r,{stem:`Cho góc ${al} thoả mãn ${rng}. Khẳng định nào sau đây đúng?`,correct:T_[i],wrongs:r.shuffle(F_.filter((x,j)=>j!==i)).concat([F_[i]]),sol:`Với ${rng}: sin α > 0, cos α ${obt?'<':'>'} 0, tan α ${obt?'<':'>'} 0, cot α ${obt?'<':'>'} 0.`,chk:()=>true})}
  const i=r.int(0,3);return mkTxt(r,{stem:`Cho góc ${al} thoả mãn ${rng}. Khẳng định nào sau đây <b>sai</b>?`,correct:F_[i],wrongs:r.shuffle(T_.filter((x,j)=>j!==i)).concat([T_[i]]),sol:`Với ${rng}: sin α > 0, cos α ${obt?'<':'>'} 0, tan α ${obt?'<':'>'} 0, cot α ${obt?'<':'>'} 0.`,chk:()=>true});
});
const PYT10=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]];
N10('k10-5-given',3,'TH',[5],r=>{
  const [p,q,h]=r.pick(PYT10),[a,b]=r.chance(.5)?[p,q]:[q,p],obt=r.chance(.7),giv=r.pick(['sin','cos']),ask=r.pick(giv==='sin'?['cos','tan']:['sin','tan']);
  /* sin = a/h, |cos| = b/h, cos < 0 nếu góc tù */
  const sv=Q(a,h),cv=Q(obt?-b:b,h),tvq=Q(obt?-a:a,b);
  const gH=giv==='sin'?qh(sv):qh(cv),res={sin:sv,cos:cv,tan:tvq}[ask];
  const cands=[Q(-res[0],res[1]),Q(res[1],res[0]),Q(-res[1],res[0]),ask==='tan'?Q(b,a):Q(a,b),Q(b,h)];
  return mkF(r,{stem:`Cho góc α thoả mãn ${obt?`90${DEG} < α < 180${DEG}`:`0${DEG} < α < 90${DEG}`} và ${giv} α = ${gH}. Giá trị của ${ask} α bằng`,correct:res,cands,
    sol:`sin²α + cos²α = 1 ⇒ ${giv==='sin'?'cos':'sin'}²α = 1 − ${qh(giv==='sin'?Q(a*a,h*h):Q(b*b,h*h))} = ${qh(giv==='sin'?Q(b*b,h*h):Q(a*a,h*h))}. Vì ${obt?'α tù nên cos α < 0':'α nhọn nên cos α > 0'}, sin α > 0: sin α = ${qh(sv)}, cos α = ${qh(cv)}${ask==='tan'?`, tan α = sin α : cos α = ${qh(tvq)}`:''}.`,chk:()=>h*h===a*a+b*b});
});
/* các hạng tử có giá trị hữu tỉ */
const RAT10=[['sin',30,Q(1,2)],['cos',60,Q(1,2)],['tan',45,Q(1,1)],['cot',45,Q(1,1)],['cos',120,Q(-1,2)],['sin',150,Q(1,2)],['cos',180,Q(-1,1)],['sin',90,Q(1,1)],['cos',0,Q(1,1)],['tan',135,Q(-1,1)],['cot',135,Q(-1,1)],['cos',90,Q(0,1)],['sin',0,Q(0,1)]];
const SQR10=[['sin',45,Q(1,2)],['cos',135,Q(1,2)],['sin',60,Q(3,4)],['cos',30,Q(3,4)],['tan',60,Q(3,1)],['tan',30,Q(1,3)],['cot',30,Q(3,1)],['sin',120,Q(3,4)],['cos',150,Q(3,4)],['cos',45,Q(1,2)]];
N10('k10-5-expr',3,'TH',[5],r=>{
  const t1=r.pick(RAT10),t2=r.pick(SQR10.concat(RAT10).filter(x=>x!==t1)),t3=r.pick(RAT10.filter(x=>x!==t1)),c1=r.nz(-3,3),c2=r.nz(-3,3),c3=r.nz(-2,3);
  const sqd=SQR10.includes(t2),v2=sqd?t2[2]:t2[2];
  const term=(c,t,sq,first)=>{const ab=Math.abs(c),co=ab===1?'':ab;const body=sq?`${t[0]}${sup(2)} ${t[1]}${DEG}`:`${t[0]} ${t[1]}${DEG}`;return first?`${c<0?MINUS:''}${co}${body}`:` ${c<0?MINUS:'+'} ${co}${body}`};
  const P=term(c1,t1,false,true)+term(c2,t2,sqd,false)+term(c3,t3,false,false);
  const res=qadd(qadd(qmul(Q(c1),t1[2]),qmul(Q(c2),v2)),qmul(Q(c3),t3[2]));
  return mkF(r,{stem:`Giá trị của biểu thức ${I('P')} = ${P} bằng`,correct:res,cands:[qadd(res,Q(1,2)),qsub(res,Q(1,2)),qadd(res,Q(1)),Q(-res[0],res[1]),qadd(qmul(Q(c1),t1[2]),qmul(Q(c3),t3[2]))],
    sol:`Thay ${t1[0]} ${t1[1]}° = ${qh(t1[2])}, ${sqd?`${t2[0]}² ${t2[1]}° = ${qh(t2[2])}`:`${t2[0]} ${t2[1]}° = ${qh(t2[2])}`}, ${t3[0]} ${t3[1]}° = ${qh(t3[2])} ta được P = ${qh(res)}.`,chk:()=>true});
});
N10('k10-5-tan',3,'VD',[5],r=>{
  for(;;){const t=Q(r.nz(-5,5),r.int(1,3)),a=r.nz(-3,3),b=r.int(-3,3),c=r.nz(-3,3),d=r.int(-3,3);
    const num=qadd(qmul(Q(a),t),Q(b)),den=qadd(qmul(Q(c),t),Q(d));if(den[0]===0||a*d===b*c)continue;const res=qdiv(num,den);
    const lin=(p,q)=>`${cfH(p)}sin α${q?` ${q<0?MINUS:'+'} ${Math.abs(q)===1?'':Math.abs(q)}cos α`:''}`;
    return mkF(r,{stem:`Cho góc α (0${DEG} < α < 180${DEG}, α ≠ 90${DEG}) có tan α = ${qh(t)}. Giá trị của biểu thức ${I('P')} = ${fr(lin(a,b),lin(c,d))} bằng`,correct:res,cands:[Q(-res[0],res[1]),qdiv(den,num),qadd(res,Q(1)),qdiv(Q(a+b),Q(c+d))].filter(x=>x[1]!==0&&Number.isFinite(x[0]/x[1])),
      sol:`Chia cả tử và mẫu cho cos α ≠ 0: P = ${fr(`${cfH(a)}tan α ${b<0?MINUS:'+'} ${Math.abs(b)}`,`${cfH(c)}tan α ${d<0?MINUS:'+'} ${Math.abs(d)}`)} = ${qh(res)}.`,chk:()=>Number.isFinite(res[0]/res[1])})}
});
DS10('ds10-5-trig',3,'TH',[5],r=>{
  const [p,q,h]=r.pick(PYT10),obt=r.chance(.6),sv=Q(p,h),cv=Q(obt?-q:q,h),tq=Q(obt?-p:p,q),a=r.pick([120,135,150]);
  return mkDS(r,{stem:`Cho góc α thoả mãn ${obt?`90${DEG} < α < 180${DEG}`:`0${DEG} < α < 90${DEG}`} và sin α = ${qh(sv)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`cos α = ${qh(cv)}.`,f:`cos α = ${qh(Q(-cv[0],cv[1]))}.`,why:`cos²α = 1 − sin²α = ${qh(Q(q*q,h*h))} và cos α ${obt?'< 0':'> 0'} nên cos α = ${qh(cv)}.`},
    {t:`tan α = ${qh(tq)}.`,f:`tan α = ${qh(Q(tq[1]*Math.sign(tq[0]),Math.abs(tq[0])))}.`,why:`tan α = sin α : cos α = ${qh(tq)}.`},
    {t:`sin(180${DEG} ${MINUS} α) = ${qh(sv)}.`,f:`sin(180${DEG} ${MINUS} α) = ${qh(Q(-sv[0],sv[1]))}.`,why:`sin(180° − α) = sin α.`},
    {t:`cos ${a}${DEG} = ${tvH(tv10('cos',a))}.`,f:`cos ${a}${DEG} = ${tvH(-tv10('cos',a))}.`,why:`cos ${a}° = −cos ${180-a}° = ${tvH(tv10('cos',a))}.`}],chk:()=>p!==q});
});
TLN10('t10-5-expr',3,'TH',[5],r=>{
  for(;;){const t1=r.pick(RAT10),t2=r.pick(SQR10),t3=r.pick(SQR10.filter(x=>x!==t2)),c1=r.nz(-4,4),c2=r.nz(-4,4),c3=r.nz(-4,4);
    const res=qadd(qadd(qmul(Q(c1),t1[2]),qmul(Q(c2),t2[2])),qmul(Q(c3),t3[2]));if(res[1]>4||(res[1]===3))continue;const v=res[0]/res[1];
    const term=(c,t,sq,first)=>{const ab=Math.abs(c),co=ab===1?'':ab;const body=sq?`${t[0]}${sup(2)} ${t[1]}${DEG}`:`${t[0]} ${t[1]}${DEG}`;return first?`${c<0?MINUS:''}${co}${body}`:` ${c<0?MINUS:'+'} ${co}${body}`};
    return{kind:'tln',stem:`Tính giá trị của biểu thức ${I('P')} = ${term(c1,t1,false,true)+term(c2,t2,true,false)+term(c3,t3,true,false)}.`,ans:v,unit:'',
      sol:`${t1[0]} ${t1[1]}° = ${qh(t1[2])}; ${t2[0]}² ${t2[1]}° = ${qh(t2[2])}; ${t3[0]}² ${t3[1]}° = ${qh(t3[2])}. Do đó P = ${qh(res)} = ${fmt(v)}.`,chk:()=>true}}
});
TL10('tl10-5-trig',3,'TH','a',[5],r=>{
  const [p,q,h]=r.pick(PYT10),sv=Q(p,h),cv=Q(-q,h),tq=Q(-p,q),c1=r.nz(-3,3),c2=r.nz(-3,3),A=qadd(qmul(Q(c1),sv),qmul(Q(c2),cv));
  const t1=r.pick(RAT10),t2=r.pick(SQR10),res=qadd(t1[2],t2[2]);
  return{kind:'tl',title:'Giá trị lượng giác của một góc từ 0° đến 180°',parts:[
    {pts:.5,html:`Cho góc α thoả mãn 90${DEG} < α < 180${DEG} và sin α = ${qh(sv)}. Tính cos α, tan α và giá trị của biểu thức ${I('A')} = ${cfH(c1)}sin α ${c2<0?MINUS:'+'} ${Math.abs(c2)===1?'':Math.abs(c2)}cos α.`},
    {pts:.5,html:`Tính giá trị của biểu thức ${I('B')} = ${t1[0]} ${t1[1]}${DEG} + ${t2[0]}${sup(2)} ${t2[1]}${DEG} và chứng minh rằng sin${sup(2)}(180${DEG} ${MINUS} α) + cos${sup(2)} α = 1 với mọi góc α (0${DEG} ≤ α ≤ 180${DEG}).`}],
    sol:[ptxt([[`cos²α = 1 − sin²α = ${qh(Q(q*q,h*h))}; α tù nên cos α = ${qh(cv)}; tan α = ${qh(tq)}.`,.25],[`A = ${qh(A)}.`,.25]]),
      ptxt([[`B = ${qh(t1[2])} + ${qh(t2[2])} = ${qh(res)}.`,.25],[`sin(180° − α) = sin α nên sin²(180° − α) + cos²α = sin²α + cos²α = 1.`,.25]])],chk:()=>true};
});

/* ===================== Bài 6: Hệ thức lượng trong tam giác ===================== */
/* bộ ba (b, c, a) nguyên với góc A = 60° hoặc 120° */
const EIS60=[[3,8,7],[5,8,7],[7,15,13],[8,15,13],[5,21,19],[16,21,19],[7,40,37],[33,40,37]],EIS120=[[3,5,7],[7,8,13],[5,16,19],[9,15,21],[11,24,31],[6,10,14]];
const sideH=([c,m])=>m===1?String(c):(c===1?'':c)+rt(m);/* độ dài c√m */
N10('k10-6-cos',3,'TH',[6],r=>{
  const A=r.pick([60,120,90]),[b,c]=A===90?[r.int(2,9),r.int(2,9)]:[r.int(2,9),r.int(2,9)],a2=A===60?b*b+c*c-b*c:A===120?b*b+c*c+b*c:b*b+c*c;
  const W=[sqH(b*b+c*c-b*c),sqH(b*b+c*c+b*c),sqH(b*b+c*c),sqH(Math.abs(b*b-c*c)||1),String(b+c)].filter(x=>x!==sqH(a2));
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c}, ${I('AC')} = ${b} và góc ${I('A')} = ${A}${DEG}. Độ dài cạnh ${I('BC')} bằng`,correct:sqH(a2),wrongs:uniqBy(W,x=>x),
    sol:`Theo định lí côsin: BC² = AB² + AC² − 2·AB·AC·cos A = ${c*c} + ${b*b} − 2·${c}·${b}·${A===120?'('+tvH(-.5)+')':tvH(tv10('cos',A)+0)} = ${a2}. Vậy BC = ${sqH(a2)}.`,chk:()=>true});
});
N10('k10-6-cosA',3,'TH',[6],r=>{
  for(;;){const a=r.int(3,12),b=r.int(3,12),c=r.int(3,12);if(a>=b+c||b>=a+c||c>=a+b)continue;const q=Q(b*b+c*c-a*a,2*b*c);
    return mkF(r,{stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${a}, ${I('CA')} = ${b}, ${I('AB')} = ${c}. Giá trị của cos ${I('A')} bằng`,correct:q,cands:[Q(a*a+c*c-b*b,2*a*c),Q(a*a+b*b-c*c,2*a*b),Q(b*b+c*c-a*a,b*c),Q(-(b*b+c*c-a*a),2*b*c)],
      sol:`cos A = ${fr('AB² + AC² − BC²','2·AB·AC')} = ${fr(`${c*c} + ${b*b} − ${a*a}`,`2·${c}·${b}`)} = ${qh(q)}.`,chk:()=>Math.abs(q[0])<=q[1]})}
});
N10('k10-6-angle',3,'TH',[6],r=>{
  const big=r.chance(.5),[b,c,a]=r.pick(big?EIS120:EIS60),k=r.int(1,2),A=big?120:60;
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${k*c}, ${I('AC')} = ${k*b}, ${I('BC')} = ${k*a}. Số đo góc ${I('A')} bằng`,correct:`${A}${DEG}`,wrongs:r.shuffle([30,45,60,90,120,135,150].filter(x=>x!==A)).map(x=>`${x}${DEG}`),
    sol:`cos A = ${fr('AB² + AC² − BC²','2·AB·AC')} = ${fr(`${k*k*c*c} + ${k*k*b*b} − ${k*k*a*a}`,`2·${k*c}·${k*b}`)} = ${big?MINUS:''}${fr(1,2)}. Vậy A = ${A}°.`,chk:()=>(b*b+c*c-a*a)*(big?-1:1)===b*c});
});
const SIN10={30:[1,1],45:[1,2],60:[1,3],90:[2,1],120:[1,3],135:[1,2],150:[1,1]};/* sin = c√m / 2 */
N10('k10-6-sine',3,'TH',[6],r=>{
  for(;;){const A=r.pick([30,45,60,90,120,135]),B=r.pick([30,45,60,90,120,135]);if(A+B>=180||A===B)continue;
    const [cA,mA]=SIN10[A],[cB,mB]=SIN10[B],k=r.int(1,6),ca=k*cA;/* a = ca√mA, b = (ca·cB / cA)√mB */
    const b=[ca*cB/cA,mB],aH=sideH([ca,mA]),bH=sideH(b),W=[sideH([ca*cA/cB,mA]),sideH([ca,mB]),sideH([2*b[0],mB]),sideH([b[0],mA*mB]),sideH([ca*cB,1])].filter(x=>x!==bH);
    if(uniqBy(W,x=>x).length<3)continue;
    return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${aH}, góc ${I('A')} = ${A}${DEG} và góc ${I('B')} = ${B}${DEG}. Độ dài cạnh ${I('CA')} bằng`,correct:bH,wrongs:uniqBy(W,x=>x),
      sol:`Theo định lí sin: ${fr('BC','sin A')} = ${fr('CA','sin B')} ⇒ CA = ${fr('BC · sin B','sin A')} = ${fr(`${aH} · ${tvH(tv10('sin',B))}`,tvH(tv10('sin',A)))} = ${bH}.`,chk:()=>Math.abs(ca*Math.sqrt(mA)*Math.sin(B*RAD10)/Math.sin(A*RAD10)-b[0]*Math.sqrt(b[1]))<1e-9})}
});
N10('k10-6-R',3,'TH',[6],r=>{
  const A=r.pick([30,45,60,90,120,135,150]),[cA,mA]=SIN10[A],k=r.int(1,8),a=[k*cA,mA];/* R = a / (2 sin A) = k */
  const W=[String(2*k),sideH([k,2]),sideH([k,3]),String(k*cA),fr(k,2)].filter(x=>x!==String(k));
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${sideH(a)} và góc ${I('A')} = ${A}${DEG}. Bán kính đường tròn ngoại tiếp tam giác ${I('ABC')} bằng`,correct:String(k),wrongs:uniqBy(W,x=>x),
    sol:`Theo định lí sin: ${fr('BC','sin A')} = 2R ⇒ R = ${fr('BC','2 sin A')} = ${fr(sideH(a),`2 · ${tvH(tv10('sin',A))}`)} = ${k}.`,chk:()=>Math.abs(k*cA*Math.sqrt(mA)/(2*Math.sin(A*RAD10))-k)<1e-9});
});
N10('k10-6-area',3,'NB',[6],r=>{
  const A=r.pick([30,45,60,90,120,135,150]),b=r.int(2,10),c=r.int(2,10),[cA,mA]=SIN10[A];/* S = bc·cA√mA/4 */
  const q=Q(b*c*cA,4),H=(qq,m)=>{const hh=qq[1]===1?(m===1?String(qq[0]):(qq[0]===1?'':qq[0])+rt(m)):fr(m===1?qq[0]:(qq[0]===1?'':qq[0])+rt(m),qq[1]);return hh};
  const cor=H(q,mA),W=[H(Q(b*c*cA,2),mA),H(q,mA===1?3:1),H(Q(b*c,2),1),H(Q(b*c*cA,4),mA===2?3:2)].filter(x=>x!==cor);
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c}, ${I('AC')} = ${b} và góc ${I('A')} = ${A}${DEG}. Diện tích tam giác ${I('ABC')} bằng`,correct:cor,wrongs:uniqBy(W,x=>x),
    sol:`S = ${fr(1,2)}·AB·AC·sin A = ${fr(1,2)}·${c}·${b}·${tvH(tv10('sin',A))} = ${cor}.`,chk:()=>true});
});
const HER10=[[13,14,15,84],[5,5,6,12],[5,5,8,12],[6,8,10,24],[7,15,20,42],[9,10,17,36],[10,13,13,60],[13,20,21,126],[11,13,20,66],[10,17,21,84],[4,13,15,24],[9,12,15,54]];
const her10=r=>{const [a,b,c,S]=r.pick(HER10),k=r.int(1,2);return{s:r.shuffle([a*k,b*k,c*k]),S:S*k*k}};
N10('k10-6-heron',3,'TH',[6],r=>{
  for(;;){const {s:[a,b,c],S}=her10(r),p=(a+b+c)/2,ask=r.int(0,3),vals=[S,S/p,a*b*c/(4*S),2*S/a],v=vals[ask];if(!isInt(v*100)||String(fmt(v)).length>5)continue;
    const nm=['diện tích','bán kính đường tròn nội tiếp','bán kính đường tròn ngoại tiếp',`độ dài đường cao kẻ từ ${I('A')}`][ask];
    return mkNum(r,{stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${a}, ${I('CA')} = ${b}, ${I('AB')} = ${c}. ${nm[0].toUpperCase()+nm.slice(1)} của tam giác ${I('ABC')} bằng`.replace(`Độ dài đường cao kẻ từ ${I('A')} của tam giác ${I('ABC')}`,`Độ dài đường cao kẻ từ ${I('A')} của tam giác ${I('ABC')}`),correct:v,ok:x=>x>0&&isInt(x*100),cands:vals.filter(x=>x!==v).concat([2*S,S/2,p]),
      sol:`Nửa chu vi p = ${fmt(p)}. Theo công thức Heron: S = √(p(p − a)(p − b)(p − c)) = √(${fmt(p)}·${fmt(p-a)}·${fmt(p-b)}·${fmt(p-c)}) = ${S}.${ask===1?` r = S : p = ${fmt(v)}.`:ask===2?` R = ${fr('abc','4S')} = ${fmt(v)}.`:ask===3?` h${sub('a')} = ${fr('2S','a')} = ${fmt(v)}.`:''}`,chk:()=>Math.abs(p*(p-a)*(p-b)*(p-c)-S*S)<1e-6})}
});
N10('k10-6-median',3,'VD',[6],r=>{
  for(;;){const a=r.int(3,12),b=r.int(3,12),c=r.int(3,12);if(a>=b+c||b>=a+c||c>=a+b)continue;const N=2*b*b+2*c*c-a*a;if(N%4)continue;const m2=N/4;
    const cor=sqH(m2),W=uniqBy([sqH(N/2|0),sqH(b*b+c*c-a*a/4|0),sqH(m2+a),sqH(2*m2),String(Math.round(Math.sqrt(m2))+1)].filter(x=>x!==cor&&x!=='0'),x=>x);if(W.length<3)continue;
    return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${a}, ${I('CA')} = ${b}, ${I('AB')} = ${c}. Gọi ${I('M')} là trung điểm của ${I('BC')}. Độ dài đoạn ${I('AM')} bằng`,correct:cor,wrongs:W,
      sol:`AM² = ${fr('2(AB² + AC²) − BC²',4)} = ${fr(`2(${c*c} + ${b*b}) − ${a*a}`,4)} = ${m2}. Vậy AM = ${cor}.`,chk:()=>true})}
});
DS10('ds10-6-tri',3,'TH',[6],r=>{
  const big=r.chance(.5),[b,c,a]=r.pick(big?EIS120:EIS60),A=big?120:60,S=Q(b*c,4),cB=Q(a*a+c*c-b*b,2*a*c);
  const Rh=a%3===0?sideH([a/3,3]):fr(sideH([a,3]),3);
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c}, ${I('AC')} = ${b} và góc ${I('A')} = ${A}${DEG}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('BC')} = ${a}.`,f:`${I('BC')} = ${sqH(big?b*b+c*c-b*c:b*b+c*c+b*c)}.`,why:`BC² = ${c*c} + ${b*b} − 2·${c}·${b}·cos ${A}° = ${a*a} nên BC = ${a}.`},
    {t:`Diện tích tam giác ${I('ABC')} bằng ${S[1]===1?sideH([S[0],3]):fr(sideH([S[0],3]),S[1])}.`,f:`Diện tích tam giác ${I('ABC')} bằng ${Q(b*c,2)[1]===1?sideH([Q(b*c,2)[0],3]):fr(sideH([Q(b*c,2)[0],3]),2)}.`,why:`S = ½·AB·AC·sin A = ½·${c}·${b}·${fr(rt(3),2)}.`},
    {t:`cos ${I('B')} = ${qh(cB)}.`,f:`cos ${I('B')} = ${qh(Q(-cB[0],cB[1]))}.`,why:`cos B = ${fr('AB² + BC² − AC²','2·AB·BC')} = ${qh(cB)}.`},
    {t:`Bán kính đường tròn ngoại tiếp tam giác ${I('ABC')} bằng ${Rh}.`,f:`Bán kính đường tròn ngoại tiếp tam giác ${I('ABC')} bằng ${fr(a,2)}.`,why:`R = ${fr('BC','2 sin A')} = ${fr(a,rt(3))} = ${Rh}.`}],chk:()=>cB[0]!==0});
});
TLN10('t10-6-dist',3,'VD',[6],r=>{
  const d=r.int(4,20)*10,A=r.int(45,80),B=r.int(40,75),C=180-A-B,AC=d*Math.sin(B*RAD10)/Math.sin(C*RAD10),v=Math.round(AC*10)/10;
  return{kind:'tln',stem:`Để đo khoảng cách từ điểm ${I('A')} trên bờ sông đến một cái cây ${I('C')} ở bờ bên kia, người ta chọn điểm ${I('B')} cùng ở bờ với ${I('A')} sao cho ${I('AB')} = ${d} m, đo được góc ${I('BAC')} = ${A}${DEG} và góc ${I('ABC')} = ${B}${DEG}. Tính khoảng cách ${I('AC')} (đơn vị: mét, làm tròn kết quả đến hàng phần mười).`,ans:v,unit:'m',
    sol:`Góc C = 180° − ${A}° − ${B}° = ${C}°. Theo định lí sin: AC = ${fr(`AB · sin B`,'sin C')} = ${fr(`${d} · sin ${B}°`,`sin ${C}°`)} ≈ ${fmt(v)} (m).`,chk:()=>C>0};
});
TLN10('t10-6-cos',3,'VD',[6],r=>{
  const b=r.int(3,15)*10,c=r.int(3,15)*10,A=r.pick([40,50,70,75,80,100,110,105,115]),a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*RAD10)),v=Math.round(a);
  return{kind:'tln',stem:`Hai chiếc tàu thuỷ cùng xuất phát từ cảng ${I('A')}, đi thẳng theo hai hướng tạo với nhau một góc ${A}${DEG}. Tàu thứ nhất đi được ${b} km, tàu thứ hai đi được ${c} km. Hỏi khi đó hai tàu cách nhau bao nhiêu ki-lô-mét (làm tròn kết quả đến hàng đơn vị)?`,ans:v,unit:'km',
    sol:`Gọi B, C là vị trí hai tàu: BC² = AB² + AC² − 2·AB·AC·cos ${A}° = ${b*b} + ${c*c} − 2·${b}·${c}·cos ${A}° ⇒ BC ≈ ${v} (km).`,chk:()=>Math.abs(a-v)!==0.5};
});
TLN10('t10-6-heron',3,'TH',[6],r=>{
  for(;;){const {s:[a,b,c],S}=her10(r),ask=r.int(0,1),p=(a+b+c)/2,v=ask?S/p:S;if(!isInt(v*100))continue;
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${a} cm, ${I('CA')} = ${b} cm, ${I('AB')} = ${c} cm. Tính ${ask?'bán kính đường tròn nội tiếp tam giác (đơn vị: cm)':'diện tích tam giác (đơn vị: cm²)'}.`,ans:v,unit:ask?'cm':'cm²',
    sol:`p = ${fmt(p)}; S = √(${fmt(p)}·${fmt(p-a)}·${fmt(p-b)}·${fmt(p-c)}) = ${S}${ask?`; r = S : p = ${fmt(v)}`:''}.`,chk:()=>isInt(v*100)}}
});
TL10('tl10-6-solve',3,'TH','a',[6],r=>{
  const big=r.chance(.5),[b,c,a]=r.pick(big?EIS120:EIS60),A=big?120:60,cB=Q(a*a+c*c-b*b,2*a*c);
  const Sh=Q(b*c,4),SH=Sh[1]===1?sideH([Sh[0],3]):fr(sideH([Sh[0],3]),Sh[1]);
  return{kind:'tl',title:'Giải tam giác',parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c} cm, ${I('AC')} = ${b} cm và góc ${I('A')} = ${A}${DEG}. Tính độ dài cạnh ${I('BC')} và cos ${I('B')}.`},
    {pts:.5,html:`Tính diện tích tam giác ${I('ABC')} và độ dài đường cao kẻ từ đỉnh ${I('A')}.`}],
    sol:[ptxt([[`BC² = AB² + AC² − 2·AB·AC·cos A = ${c*c} + ${b*b} ${big?'+':'−'} ${b*c} = ${a*a} ⇒ BC = ${a} cm.`,.25],[`cos B = ${fr('AB² + BC² − AC²','2·AB·BC')} = ${qh(cB)}.`,.25]]),
      ptxt([[`S = ½·AB·AC·sin A = ½·${c}·${b}·${fr(rt(3),2)} = ${SH} (cm²).`,.25],[`h${sub('a')} = ${fr('2S','BC')} = ${(()=>{const q=Q(b*c,2*a);return q[1]===1?sideH([q[0],3]):fr(sideH([q[0],3]),q[1])})()} (cm).`,.25]])],chk:()=>true};
});
TL10('tl10-6-heron',3,'TH','a',[6],r=>{
  const {s:[a,b,c],S}=her10(r),p=(a+b+c)/2,rr=S/p,R=a*b*c/(4*S);
  return{kind:'tl',title:'Hệ thức lượng trong tam giác',parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${a}, ${I('CA')} = ${b}, ${I('AB')} = ${c}. Tính diện tích tam giác ${I('ABC')}.`},
    {pts:.5,html:`Tính bán kính đường tròn nội tiếp và bán kính đường tròn ngoại tiếp tam giác ${I('ABC')}${isInt(R*100)?'':' (làm tròn kết quả đến hàng phần trăm)'}.`}],
    sol:[ptxt([[`Nửa chu vi p = ${fmt(p)}.`,.25],[`S = √(p(p − a)(p − b)(p − c)) = √(${fmt(p)}·${fmt(p-a)}·${fmt(p-b)}·${fmt(p-c)}) = ${S}.`,.25]]),
      ptxt([[`r = ${fr('S','p')} = ${fmt(Math.round(rr*100)/100)}.`,.25],[`R = ${fr('abc','4S')} = ${fr(a*b*c,4*S)} ${isInt(R*100)?'=':'≈'} ${fmt(Math.round(R*100)/100)}.`,.25]])],chk:()=>true};
});
TL10('tl10-6-real',3,'VD','c',[6],r=>{
  const d=r.int(5,20)*10,A=r.int(50,75),B=r.int(45,70),C=180-A-B,AC=d*Math.sin(B*RAD10)/Math.sin(C*RAD10),h=AC*Math.sin(A*RAD10);
  return{kind:'tl',title:'Ứng dụng hệ thức lượng vào thực tế',parts:[
    {pts:.5,html:`Hai người đứng ở hai vị trí ${I('A')} và ${I('B')} trên bờ một hồ nước, cách nhau ${d} m, cùng quan sát một chiếc thuyền ở vị trí ${I('C')}. Người ở ${I('A')} đo được góc ${I('BAC')} = ${A}${DEG}, người ở ${I('B')} đo được góc ${I('ABC')} = ${B}${DEG}. Tính khoảng cách ${I('AC')} (làm tròn đến hàng phần mười của mét).`},
    {pts:.5,html:`Tính khoảng cách từ thuyền đến đường thẳng ${I('AB')} (làm tròn đến hàng phần mười của mét).`}],
    sol:[ptxt([[`Góc ACB = 180° − ${A}° − ${B}° = ${C}°.`,.25],[`Theo định lí sin: AC = ${fr('AB · sin B','sin C')} = ${fr(`${d} · sin ${B}°`,`sin ${C}°`)} ≈ ${fmt(Math.round(AC*10)/10)} (m).`,.25]]),
      ptxt([[`Gọi H là hình chiếu của C trên AB, khoảng cách cần tìm là CH = AC · sin A.`,.25],[`CH ≈ ${fmt(Math.round(AC*10)/10)} · sin ${A}° ≈ ${fmt(Math.round(h*10)/10)} (m).`,.25]])],chk:()=>C>0};
});
TL10('tl10-6-ship',3,'VD','c',[6],r=>{
  const v1=r.int(3,8)*5,v2=r.int(3,8)*5,t=r.pick([1,2,3]),A=r.pick([60,120]),b=v1*t,c=v2*t,a2=b*b+c*c-(A===60?1:-1)*b*c,a=Math.sqrt(a2),S=b*c*Math.sqrt(3)/4;
  return{kind:'tl',title:'Ứng dụng định lí côsin',parts:[
    {pts:.5,html:`Hai chiếc tàu cùng rời cảng ${I('A')} lúc 7 giờ sáng, đi theo hai hướng tạo với nhau góc ${A}${DEG}. Tàu thứ nhất chạy với vận tốc ${v1} km/h, tàu thứ hai chạy với vận tốc ${v2} km/h. Hỏi sau ${t} giờ hai tàu cách nhau bao nhiêu ki-lô-mét (làm tròn đến hàng phần mười)?`},
    {pts:.5,html:`Tính diện tích tam giác tạo bởi cảng và vị trí hai tàu tại thời điểm đó (làm tròn đến hàng đơn vị, đơn vị: km²).`}],
    sol:[ptxt([[`Sau ${t} giờ: AB = ${b} km, AC = ${c} km, góc BAC = ${A}°.`,.25],[`BC² = ${b*b} + ${c*c} ${A===60?'−':'+'} ${b*c} = ${a2} ⇒ BC = ${sqH(a2)} ≈ ${fmt(Math.round(a*10)/10)} (km).`,.25]]),
      ptxt([[`S = ½·AB·AC·sin ${A}° = ½·${b}·${c}·${fr(rt(3),2)}.`,.25],[`S ≈ ${Math.round(S)} (km²).`,.25]])],chk:()=>true};
});

/* ===================== Bài 7 – 9: Vectơ, tổng và hiệu, tích với một số ===================== */
/* đặt số âm vào ngoặc khi đứng sau dấu ·, +, − */
const PR10=/([·+−] ?)(−\d+)/g,PRF10=(m,a,b)=>a+'('+b+')';
const V0=vc('0'),Vv=s=>vc(I(s));
N10('k10-7-count',4,'NB',[7],r=>{
  const n=r.int(3,6),L='ABCDEF'.slice(0,n).split('').map(I).join(', '),v=n*(n-1);
  return mkNum(r,{stem:`Cho ${n} điểm phân biệt ${L}${n===3?' không thẳng hàng':''}. Có bao nhiêu vectơ khác vectơ-không có điểm đầu và điểm cuối là hai trong ${n} điểm đã cho?`,correct:v,cands:[v/2,n*n,2*n,v+n,n],
    sol:`Mỗi cặp có thứ tự (điểm đầu, điểm cuối) gồm hai điểm phân biệt xác định một vectơ khác vectơ-không: có ${n}·${n-1} = ${v} vectơ.`,chk:()=>true});
});
N10('k10-7-eq',4,'NB',[7],r=>{
  const P={AB:'DC',BA:'CD',AD:'BC',DA:'CB',BC:'AD',CB:'DA',DC:'AB',CD:'BA'},k=r.pick(Object.keys(P)),c=P[k],rev=x=>x[1]+x[0];
  const W=[rev(c),rev(k),r.pick(['AC','CA','BD','DB'])].concat(['AC','BD','CA','DB']);
  return mkTxt(r,{stem:`Cho hình bình hành ${I('ABCD')}. Vectơ nào sau đây bằng vectơ ${Vv(k)}?`,correct:Vv(c),wrongs:W.filter(x=>x!==c).map(Vv),
    sol:`ABCD là hình bình hành nên ${Vv('AB')} = ${Vv('DC')} và ${Vv('AD')} = ${Vv('BC')}. Do đó ${Vv(k)} = ${Vv(c)} (cùng hướng, cùng độ dài).`,chk:()=>true});
});
/* lục giác đều ABCDEF tâm O, toạ độ theo cơ sở tam giác đều */
const HEX10={A:[1,0],B:[0,1],C:[-1,1],D:[-1,0],E:[0,-1],F:[1,-1],O:[0,0]};
N10('k10-7-hex',4,'TH',[7],r=>{
  for(;;){const K=Object.keys(HEX10),X=r.pick(K),Y=r.pick(K.filter(z=>z!==X)),d=[HEX10[Y][0]-HEX10[X][0],HEX10[Y][1]-HEX10[X][1]];
    let n=0;for(const P of K)for(const Q_ of K)if(P!==Q_&&HEX10[Q_][0]-HEX10[P][0]===d[0]&&HEX10[Q_][1]-HEX10[P][1]===d[1])n++;
    if(n<2)continue;
    return mkNum(r,{stem:`Cho lục giác đều ${I('ABCDEF')} tâm ${I('O')}. Có bao nhiêu vectơ có điểm đầu và điểm cuối thuộc tập {${'ABCDEFO'.split('').map(I).join('; ')}} và bằng vectơ ${Vv(X+Y)} (kể cả chính nó)?`,correct:n,cands:[n-1,n+1,2*n,n+2,6],
      sol:`Các vectơ bằng ${Vv(X+Y)} phải cùng hướng và cùng độ dài với ${Vv(X+Y)}. Liệt kê trên hình: có ${n} vectơ thoả mãn.`,chk:()=>n>=2})}
});
N10('k10-8-rule',4,'NB',[8],r=>{
  const [P,Q_,R]=r.shuffle(['A','B','C','M','N','O','I','K']).slice(0,3);
  const C=[`${Vv(P+Q_)} + ${Vv(Q_+R)} = ${Vv(P+R)}`,`${Vv(P+Q_)} ${MINUS} ${Vv(P+R)} = ${Vv(R+Q_)}`,`${Vv(P+Q_)} + ${Vv(R+P)} = ${Vv(R+Q_)}`,`${Vv(Q_+P)} ${MINUS} ${Vv(R+P)} = ${Vv(Q_+R)}`];
  const W=[`${Vv(P+Q_)} + ${Vv(Q_+R)} = ${Vv(R+P)}`,`${Vv(P+Q_)} ${MINUS} ${Vv(P+R)} = ${Vv(Q_+R)}`,`${Vv(P+Q_)} + ${Vv(P+R)} = ${Vv(Q_+R)}`,`${Vv(P+Q_)} ${MINUS} ${Vv(Q_+R)} = ${Vv(P+R)}`,`${Vv(Q_+P)} + ${Vv(R+P)} = ${Vv(Q_+R)}`];
  const i=r.int(0,3);
  return mkTxt(r,{stem:`Cho ba điểm ${I(P)}, ${I(Q_)}, ${I(R)} phân biệt. Đẳng thức nào sau đây đúng?`,correct:C[i],wrongs:r.shuffle(W),
    sol:`Quy tắc ba điểm: ${Vv('XY')} + ${Vv('YZ')} = ${Vv('XZ')}; quy tắc hiệu: ${Vv('OB')} ${MINUS} ${Vv('OA')} = ${Vv('AB')}. Áp dụng ta có ${C[i]}.`,chk:()=>true});
});
N10('k10-8-pgram',4,'TH',[8],r=>{
  const C=[`${Vv('AB')} + ${Vv('AD')} = ${Vv('AC')}`,`${Vv('OA')} + ${Vv('OC')} = ${V0}`,`${Vv('AB')} ${MINUS} ${Vv('AD')} = ${Vv('DB')}`,`${Vv('BA')} + ${Vv('BC')} = ${Vv('BD')}`,`${Vv('OA')} + ${Vv('OB')} + ${Vv('OC')} + ${Vv('OD')} = ${V0}`,`${Vv('AB')} + ${Vv('CD')} = ${V0}`,`${Vv('AC')} = 2${Vv('AO')}`];
  const W=[`${Vv('AB')} + ${Vv('AD')} = ${Vv('BD')}`,`${Vv('OA')} = ${Vv('OC')}`,`${Vv('AB')} ${MINUS} ${Vv('AD')} = ${Vv('BD')}`,`${Vv('AB')} = ${Vv('CD')}`,`${Vv('OA')} + ${Vv('OB')} = ${V0}`,`${Vv('AC')} = ${Vv('BD')}`,`${Vv('BA')} + ${Vv('BC')} = ${Vv('AC')}`,`${Vv('AO')} = 2${Vv('AC')}`];
  const want=r.chance(.6);
  if(want)return mkTxt(r,{stem:`Cho hình bình hành ${I('ABCD')} tâm ${I('O')}. Khẳng định nào sau đây đúng?`,correct:r.pick(C),wrongs:r.shuffle(W),sol:`Theo quy tắc hình bình hành, quy tắc hiệu và tính chất trung điểm (O là trung điểm của AC và BD).`,chk:()=>true});
  return mkTxt(r,{stem:`Cho hình bình hành ${I('ABCD')} tâm ${I('O')}. Khẳng định nào sau đây <b>sai</b>?`,correct:r.pick(W),wrongs:r.shuffle(C),sol:`Các khẳng định còn lại đúng theo quy tắc hình bình hành, quy tắc hiệu và tính chất trung điểm (O là trung điểm của AC và BD).`,chk:()=>true});
});
/* các vectơ có tên trong hình vuông / tam giác đều, toạ độ theo cơ sở (AB, AD) hoặc (AB, AC) và dạng toàn phương của độ dài */
const SHP10={sq:{nm:t=>`hình vuông ${I('ABCD')} cạnh ${t}`,V:{AB:[1,0],AD:[0,1],AC:[1,1],BD:[-1,1],BC:[0,1],DC:[1,0],CB:[0,-1],DB:[1,-1],CA:[-1,-1],BA:[-1,0],DA:[0,-1],CD:[-1,0]},g:[1,0,1]},
  eq:{nm:t=>`tam giác đều ${I('ABC')} cạnh ${t}`,V:{AB:[1,0],AC:[0,1],BC:[-1,1],BA:[-1,0],CA:[0,-1],CB:[1,-1]},g:[1,1,1]}};
const gForm=(g,[x,y])=>g[0]*x*x+g[1]*x*y+g[2]*y*y;/* |x·u + y·v|² / cạnh² */
const gDot=(g,[x1,y1],[x2,y2])=>Q(2*g[0]*x1*x2+g[1]*(x1*y2+y1*x2)+2*g[2]*y1*y2,2);
N10('k10-8-len',4,'TH',[8],r=>{
  for(;;){const sh=r.pick(['sq','eq']),S=SHP10[sh],K=Object.keys(S.V),u=r.pick(K),v=r.pick(K.filter(x=>x!==u)),op=r.pick([1,-1]),a=r.int(1,6);
    const w=[S.V[u][0]+op*S.V[v][0],S.V[u][1]+op*S.V[v][1]],N=gForm(S.g,w);if(!N)continue;
    const cor=sqH(a*a*N),W=uniqBy([1,2,3,4,5,7,8].filter(x=>x!==N).map(x=>sqH(a*a*x)),x=>x);
    return mkTxt(r,{stem:`Cho ${S.nm(a)}. Độ dài của vectơ ${Vv(u)} ${op>0?'+':MINUS} ${Vv(v)} bằng`,correct:cor,wrongs:r.shuffle(W),
      sol:`Dùng quy tắc ba điểm, quy tắc hình bình hành (hoặc quy tắc hiệu) để thu gọn ${Vv(u)} ${op>0?'+':MINUS} ${Vv(v)} thành một vectơ rồi tính độ dài: kết quả bằng ${cor}.`,chk:()=>true})}
});
N10('k10-9-mid',4,'NB',[9],r=>{
  const C=[`${Vv('IA')} + ${Vv('IB')} = ${V0}`,`${Vv('MA')} + ${Vv('MB')} = 2${Vv('MI')}`,`${Vv('AB')} = 2${Vv('AI')}`,`${Vv('AI')} = ${Vv('IB')}`],W=[`${Vv('IA')} = ${Vv('IB')}`,`${Vv('MA')} + ${Vv('MB')} = ${Vv('MI')}`,`${Vv('AB')} = 2${Vv('IA')}`,`${Vv('IA')} + ${Vv('IB')} = ${Vv('AB')}`,`${Vv('MA')} + ${Vv('MB')} = 2${Vv('IM')}`];
  const CG=[`${Vv('GA')} + ${Vv('GB')} + ${Vv('GC')} = ${V0}`,`${Vv('MA')} + ${Vv('MB')} + ${Vv('MC')} = 3${Vv('MG')}`,`${Vv('AG')} = ${fr(2,3)}${Vv('AM')}`],WG=[`${Vv('GA')} + ${Vv('GB')} = ${Vv('GC')}`,`${Vv('MA')} + ${Vv('MB')} + ${Vv('MC')} = ${Vv('MG')}`,`${Vv('AG')} = ${fr(1,3)}${Vv('AM')}`,`${Vv('GA')} + ${Vv('GB')} + ${Vv('GC')} = 3${Vv('GM')}`];
  if(r.chance(.5))return mkTxt(r,{stem:`Cho ${I('I')} là trung điểm của đoạn thẳng ${I('AB')} và ${I('M')} là một điểm bất kì. Khẳng định nào sau đây đúng?`,correct:r.pick(C),wrongs:r.shuffle(W),sol:`I là trung điểm của AB ⟺ ${Vv('IA')} + ${Vv('IB')} = ${V0}; với mọi điểm M: ${Vv('MA')} + ${Vv('MB')} = 2${Vv('MI')}.`,chk:()=>true});
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có trọng tâm ${I('G')}, ${I('M')} là trung điểm của ${I('BC')}. Khẳng định nào sau đây đúng?`.replace(`, ${I('M')} là trung điểm của ${I('BC')}`,`, ${I('M')} là trung điểm của ${I('BC')}`),correct:r.pick(CG.slice(0,1).concat(CG.slice(2))),wrongs:r.shuffle(WG),sol:`G là trọng tâm tam giác ABC ⟺ ${Vv('GA')} + ${Vv('GB')} + ${Vv('GC')} = ${V0}; G nằm trên trung tuyến AM với AG = ${fr(2,3)}AM.`,chk:()=>true});
});
const kvH=(q,v)=>{/* q·v với q phân số */const s=q[0]<0?MINUS:'',a=Math.abs(q[0]);return `${s}${q[1]===1?(a===1?'':a):fr(a,q[1])}${v}`};
N10('k10-9-pos',4,'TH',[9],r=>{
  for(;;){const p=r.int(1,5),q=r.int(1,5),plus=r.chance(.6);if(!plus&&p===q)continue;
    const k=plus?Q(q,p+q):Q(-q,p-q);
    const lhs=`${p===1?'':p}${Vv('MA')} ${plus?'+':MINUS} ${q===1?'':q}${Vv('MB')} = ${V0}`,hf=x=>`${Vv('AM')} = ${kvH(x,Vv('AB'))}`;
    return mkF(r,{stem:`Cho đoạn thẳng ${I('AB')} và điểm ${I('M')} thoả mãn ${lhs}. Khẳng định nào sau đây đúng?`,correct:k,hf,cands:[Q(p,p+q),Q(q,p),Q(-k[0],k[1]),Q(p,q),Q(q,p+q+1)].filter(x=>x[1]!==0),
      sol:`${Vv('MA')} = ${Vv('MA')}; ${Vv('MB')} = ${Vv('MA')} + ${Vv('AB')}. Thay vào: ${p===1?'':p}${Vv('MA')} ${plus?'+':MINUS} ${q===1?'':q}(${Vv('MA')} + ${Vv('AB')}) = ${V0} ⇒ ${cfH(plus?p+q:p-q)}${Vv('MA')} = ${plus?MINUS:''}${q===1?'':q}${Vv('AB')} ⇒ ${hf(k)}.`,chk:()=>Math.abs(k[0]/k[1])>0})}
});
N10('k10-9-decomp',4,'TH',[9],r=>{
  const p=r.int(1,4),q=r.int(1,4),t=Q(p,p+q),u=Q(q,p+q);/* BM : MC = p : q ⇒ AM = q/(p+q) AB + p/(p+q) AC */
  const H=(x,y)=>`${Vv('AM')} = ${kvH(x,Vv('AB'))} ${y[0]<0?MINUS:'+'} ${kvH(Q(Math.abs(y[0]),y[1]),Vv('AC'))}`;
  const cor=H(u,t),W=uniqBy([H(t,u),H(Q(1),t),H(u,Q(-t[0],t[1])),H(Q(1,2),Q(1,2)),H(Q(p,q),Q(q,p))],x=>x).filter(x=>x!==cor);
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')}. Điểm ${I('M')} thuộc cạnh ${I('BC')} sao cho ${p===q?`${I('M')} là trung điểm của ${I('BC')}`:`${q===1?'':q}${I('BM')} = ${p===1?'':p}${I('MC')}`}. Khẳng định nào sau đây đúng?`.replace(`${q===1?'':q}${I('BM')} = ${p===1?'':p}${I('MC')}`,`${I('BM')} = ${p%q===0?(p/q===1?'':p/q):fr(p,q)}${I('MC')}`),correct:cor,wrongs:W,
    sol:`${Vv('BM')} = ${kvH(t,Vv('BC'))} nên ${Vv('AM')} = ${Vv('AB')} + ${kvH(t,'')}(${Vv('AC')} ${MINUS} ${Vv('AB')}) = ${kvH(u,Vv('AB'))} + ${kvH(t,Vv('AC'))}.`,chk:()=>true});
});
DS10('ds10-8-pgram',4,'TH',[8,9],r=>{
  const a=r.int(2,8);
  return mkDS(r,{stem:`Cho hình vuông ${I('ABCD')} cạnh ${a}, tâm ${I('O')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${Vv('AB')} + ${Vv('AD')} = ${Vv('AC')}.`,f:`${Vv('AB')} + ${Vv('AD')} = ${Vv('BD')}.`,why:`Quy tắc hình bình hành.`},
    {t:`${Vv('OA')} + ${Vv('OB')} + ${Vv('OC')} + ${Vv('OD')} = ${V0}.`,f:`${Vv('OA')} + ${Vv('OB')} + ${Vv('OC')} + ${Vv('OD')} = 4${Vv('OA')}.`,why:`${Vv('OA')} + ${Vv('OC')} = ${V0} và ${Vv('OB')} + ${Vv('OD')} = ${V0}.`},
    {t:`|${Vv('AB')} ${MINUS} ${Vv('AD')}| = ${sqH(2*a*a)}.`,f:`|${Vv('AB')} ${MINUS} ${Vv('AD')}| = ${a}.`,why:`${Vv('AB')} ${MINUS} ${Vv('AD')} = ${Vv('DB')}, DB = ${sqH(2*a*a)}.`},
    {t:`|${Vv('AB')} + ${Vv('AC')}| = ${sqH(5*a*a)}.`,f:`|${Vv('AB')} + ${Vv('AC')}| = ${sqH(4*a*a+2*a*a)}.`,why:`${Vv('AB')} + ${Vv('AC')} = 2${Vv('AB')} + ${Vv('AD')}, độ dài bằng √(4a² + a²) = ${sqH(5*a*a)}.`}],chk:()=>true});
});
TLN10('t10-8-len',4,'VD',[8],r=>{
  for(;;){const sh=r.pick(['sq','eq']),S=SHP10[sh],K=Object.keys(S.V),u=r.pick(K),v=r.pick(K.filter(x=>x!==u)),c1=r.int(1,3),c2=r.pick([1,-1,2,-2,3]),a=r.int(2,10);
    const w=[c1*S.V[u][0]+c2*S.V[v][0],c1*S.V[u][1]+c2*S.V[v][1]],N=gForm(S.g,w);if(!N)continue;const L=a*Math.sqrt(N),val=Math.round(L*10)/10;if(Math.abs(L*10-Math.round(L*10))>.49)continue;
    return{kind:'tln',stem:`Cho ${S.nm(a+' cm')}. Tính độ dài của vectơ ${c1===1?'':c1}${Vv(u)} ${c2>0?'+':MINUS} ${Math.abs(c2)===1?'':Math.abs(c2)}${Vv(v)} (đơn vị: cm, làm tròn kết quả đến hàng phần mười).`,ans:val,unit:'cm',
      sol:`Biểu diễn qua hai vectơ ${sh==='sq'?`${Vv('AB')}, ${Vv('AD')}`:`${Vv('AB')}, ${Vv('AC')}`}: vectơ cần tính bằng ${kvH(Q(w[0]),Vv('AB'))} + ${kvH(Q(w[1]),sh==='sq'?Vv('AD'):Vv('AC'))}; bình phương vô hướng bằng ${a*a*N} nên độ dài bằng ${sqH(a*a*N)} ≈ ${fmt(val)} (cm).`.replace('+ '+MINUS,MINUS+' '),chk:()=>true}}
});
TLN10('t10-9-k',4,'TH',[9],r=>{
  for(;;){const p=r.int(1,6),q=r.int(1,6),k=q/(p+q);if(!isInt(k*100))continue;
    return{kind:'tln',stem:`Cho đoạn thẳng ${I('AB')} và điểm ${I('M')} thoả mãn ${p===1?'':p}${Vv('MA')} + ${q===1?'':q}${Vv('MB')} = ${V0}. Biết ${Vv('AM')} = ${I('k')}${Vv('AB')}, tìm ${I('k')}.`,ans:k,unit:'',
      sol:`${p}${Vv('MA')} + ${q}(${Vv('MA')} + ${Vv('AB')}) = ${V0} ⇒ ${p+q}${Vv('AM')} = ${q}${Vv('AB')} ⇒ k = ${fr(q,p+q)} = ${fmt(k)}.`,chk:()=>true}}
});
TL10('tl10-9-vec',4,'TH','b',[8,9],r=>{
  const p=r.int(1,4),q=r.int(1,4),t=Q(p,p+q),u=Q(q,p+q);
  return{kind:'tl',title:'Các phép toán vectơ',parts:[
    {pts:.5,html:`Cho tứ giác ${I('ABCD')}. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AB')} và ${I('CD')}. Chứng minh rằng ${Vv('AC')} + ${Vv('BD')} = 2${Vv('MN')}.`},
    {pts:.5,html:`Cho tam giác ${I('ABC')}, điểm ${I('K')} thuộc cạnh ${I('BC')} sao cho ${I('BK')} = ${p%q===0?(p/q===1?'':p/q):fr(p,q)}${I('KC')}. Biểu thị vectơ ${Vv('AK')} theo hai vectơ ${Vv('AB')} và ${Vv('AC')}.`}],
    sol:[ptxt([[`${Vv('MN')} = ${Vv('MA')} + ${Vv('AC')} + ${Vv('CN')} và ${Vv('MN')} = ${Vv('MB')} + ${Vv('BD')} + ${Vv('DN')}.`,.25],[`Cộng vế: 2${Vv('MN')} = (${Vv('MA')} + ${Vv('MB')}) + (${Vv('AC')} + ${Vv('BD')}) + (${Vv('CN')} + ${Vv('DN')}) = ${Vv('AC')} + ${Vv('BD')}.`,.25]]),
      ptxt([[`${Vv('BK')} = ${kvH(t,Vv('BC'))} = ${kvH(t,'')}(${Vv('AC')} ${MINUS} ${Vv('AB')}).`,.25],[`${Vv('AK')} = ${Vv('AB')} + ${Vv('BK')} = ${kvH(u,Vv('AB'))} + ${kvH(t,Vv('AC'))}.`,.25]])],chk:()=>true};
});

/* ===================== Bài 10 – 11: Toạ độ của vectơ, tích vô hướng ===================== */
const vEx=v=>[[v[0]+1,v[1]],[v[0],v[1]-1],[v[0]-1,v[1]+1],[v[0]+2,v[1]+2],[v[0]-2,v[1]]].map(x=>cV(x));
const PT=(n,p)=>`${I(n)}(${p.map(sg).join('; ')})`,cV=v=>`(${v.map(sg).join('; ')})`;
const ptsR=(r,n,lo=-6,hi=6)=>{for(;;){const P=[...Array(n)].map(()=>[r.int(lo,hi),r.int(lo,hi)]);if(new Set(P.map(String)).size===n)return P}};
N10('k10-10-coord',4,'NB',[10],r=>{
  const k=r.int(0,1);
  if(k){const a=r.int(-7,7),b=r.nz(-7,7),vH=`${a?`${a<0?MINUS:''}${Math.abs(a)===1?'':Math.abs(a)}${vc(I('i'))} `:''}${a?(b<0?MINUS+' ':'+ '):(b<0?MINUS:'')}${Math.abs(b)===1?'':Math.abs(b)}${vc(I('j'))}`;
    return mkTxt(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('u'))} = ${vH}. Toạ độ của vectơ ${vc(I('u'))} là`,correct:cV([a,b]),wrongs:[cV([b,a]),cV([-a,b]),cV([a,-b]),cV([-a,-b])].concat(vEx([a,b])),sol:`${vc(I('u'))} = x${vc(I('i'))} + y${vc(I('j'))} ⟺ ${vc(I('u'))} = (x; y). Vậy ${vc(I('u'))} = ${cV([a,b])}.`,chk:()=>true})}
  const [A,B]=ptsR(r,2),d=[B[0]-A[0],B[1]-A[1]];
  return mkTxt(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho hai điểm ${PT('A',A)} và ${PT('B',B)}. Toạ độ của vectơ ${Vv('AB')} là`,correct:cV(d),wrongs:[cV([-d[0],-d[1]]),cV([A[0]+B[0],A[1]+B[1]]),cV([d[1],d[0]]),cV([d[0],-d[1]])].concat(vEx(d)),
    sol:`${Vv('AB')} = (x${sub('B')} − x${sub('A')}; y${sub('B')} − y${sub('A')}) = ${cV(d)}.`,chk:()=>true});
});
N10('k10-10-mid',4,'NB',[10],r=>{
  for(;;){const g=r.chance(.5),P=ptsR(r,g?3:2,-7,7),sx=P.reduce((s,p)=>s+p[0],0),sy=P.reduce((s,p)=>s+p[1],0),n=P.length;if(sx%n||sy%n)continue;
    const M=[sx/n,sy/n],nm=g?`trọng tâm ${I('G')} của tam giác ${I('ABC')}`:`trung điểm ${I('M')} của đoạn thẳng ${I('AB')}`;
    const W=[cV([sx,sy]),cV([M[1],M[0]]),cV([-M[0],-M[1]]),g?cV([(P[1][0]+P[2][0]-P[0][0]),(P[1][1]+P[2][1]-P[0][1])]):cV([(P[1][0]-P[0][0])/2,(P[1][1]-P[0][1])/2].map(x=>Math.round(x))),cV([M[0]+1,M[1]])].concat(vEx(M));
    return mkTxt(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${P.map((p,i)=>PT('ABC'[i],p)).join(', ')}. Toạ độ ${nm} là`,correct:cV(M),wrongs:uniqBy(W,x=>x).filter(x=>x!==cV(M)),
      sol:`${g?'Trọng tâm':'Trung điểm'} có toạ độ ${g?`x = ${fr('x_A + x_B + x_C',3)}, y = ${fr('y_A + y_B + y_C',3)}`:`x = ${fr('x_A + x_B',2)}, y = ${fr('y_A + y_B',2)}`}: ${cV(M)}.`.replace(/_([ABC])/g,'<sub>$1</sub>'),chk:()=>true})}
});
N10('k10-10-ops',4,'TH',[10],r=>{
  const u=[r.int(-5,5),r.int(-5,5)],v=[r.int(-5,5),r.int(-5,5)],k=r.nz(-3,3),m=r.nz(-3,3),w=[k*u[0]+m*v[0],k*u[1]+m*v[1]];
  const ex=`${k===1?'':k===-1?MINUS:k<0?MINUS+(-k):k}${vc(I('u'))} ${m<0?MINUS:'+'} ${Math.abs(m)===1?'':Math.abs(m)}${vc(I('v'))}`;
  return mkTxt(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('u'))} = ${cV(u)} và ${vc(I('v'))} = ${cV(v)}. Toạ độ của vectơ ${vc(I('w'))} = ${ex} là`,correct:cV(w),wrongs:uniqBy([cV([k*u[0]-m*v[0],k*u[1]-m*v[1]]),cV([u[0]+m*v[0],u[1]+m*v[1]]),cV([k*u[0]+m*v[1],k*u[1]+m*v[0]]),cV([-w[0],-w[1]]),cV([w[0]+1,w[1]-1])].concat(vEx(w)),x=>x).filter(x=>x!==cV(w)),
    sol:`${vc(I('w'))} = (${sg(k)}·${sg(u[0])} + ${m<0?'('+sg(m)+')':m}·${sg(v[0])}; ${sg(k)}·${sg(u[1])} + ${m<0?'('+sg(m)+')':m}·${sg(v[1])}) = ${cV(w)}.`.replace(PR10,PRF10),chk:()=>true});
});
N10('k10-10-para',4,'TH',[10],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),t=r.nz(-3,3),m=t*a,c=t*b;
  return mkNum(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('u'))} = ${cV([a,b])} và ${vc(I('v'))} = (${I('m')}; ${sg(c)}). Giá trị của ${I('m')} để hai vectơ ${vc(I('u'))} và ${vc(I('v'))} cùng phương là`,correct:m,ok:()=>true,cands:[-m,c,m+1,m-1,a*b],
    sol:`${vc(I('u'))}, ${vc(I('v'))} cùng phương ⟺ ${sg(a)}·${sg(c)} − ${sg(b)}·m = 0 ⟺ m = ${sg(m)}.`.replace(PR10,PRF10),chk:()=>a*c===b*m});
});
N10('k10-10-pgram',4,'TH',[10],r=>{
  for(;;){const [A,B,C]=ptsR(r,3,-5,5);if((B[0]-A[0])*(C[1]-A[1])===(B[1]-A[1])*(C[0]-A[0]))continue;const D=[A[0]+C[0]-B[0],A[1]+C[1]-B[1]];
    return mkTxt(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ba điểm ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Toạ độ điểm ${I('D')} để tứ giác ${I('ABCD')} là hình bình hành là`,correct:cV(D),wrongs:uniqBy([cV([B[0]+C[0]-A[0],B[1]+C[1]-A[1]]),cV([A[0]+B[0]-C[0],A[1]+B[1]-C[1]]),cV([B[0]-A[0]-C[0],B[1]-A[1]-C[1]]),cV([-D[0],-D[1]])].concat(vEx(D)),x=>x).filter(x=>x!==cV(D)),
      sol:`ABCD là hình bình hành ⟺ ${Vv('AD')} = ${Vv('BC')} ⟺ D = (x${sub('A')} + x${sub('C')} − x${sub('B')}; y${sub('A')} + y${sub('C')} − y${sub('B')}) = ${cV(D)}.`,chk:()=>true})}
});
N10('k10-10-len',4,'NB',[10],r=>{
  const [A,B]=ptsR(r,2),d2=(B[0]-A[0])**2+(B[1]-A[1])**2;
  return mkTxt(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho hai điểm ${PT('A',A)} và ${PT('B',B)}. Độ dài đoạn thẳng ${I('AB')} bằng`,correct:sqH(d2),wrongs:uniqBy([sqH((A[0]+B[0])**2+(A[1]+B[1])**2||1),String(d2),sqH(Math.abs(B[0]-A[0])+Math.abs(B[1]-A[1])),sqH(d2+2),sqH(Math.abs((B[0]-A[0])**2-(B[1]-A[1])**2)||3),sqH(d2+1),sqH(d2+4),sqH(2*d2)],x=>x).filter(x=>x!==sqH(d2)),
    sol:`AB = √((x${sub('B')} − x${sub('A')})² + (y${sub('B')} − y${sub('A')})²) = √(${(B[0]-A[0])**2} + ${(B[1]-A[1])**2}) = ${sqH(d2)}.`,chk:()=>true});
});
N10('k10-11-dot',4,'NB',[11],r=>{
  if(r.chance(.5)){const u=[r.int(-6,6),r.int(-6,6)],v=[r.int(-6,6),r.int(-6,6)],d=u[0]*v[0]+u[1]*v[1];
    return mkNum(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('a'))} = ${cV(u)} và ${vc(I('b'))} = ${cV(v)}. Tích vô hướng ${vc(I('a'))} · ${vc(I('b'))} bằng`,correct:d,ok:()=>true,cands:[u[0]*v[1]+u[1]*v[0],u[0]*v[0]-u[1]*v[1],-d,d+1,u[0]+v[0]+u[1]+v[1]],
      sol:`${vc(I('a'))} · ${vc(I('b'))} = x·x' + y·y' = ${sg(u[0])}·${sg(v[0])} + ${sg(u[1])}·${sg(v[1])} = ${sg(d)}.`.replace(PR10,PRF10),chk:()=>true})}
  const a=r.int(1,6),b=r.int(1,6),A=r.pick([0,60,90,120,180]),d=a*b*Math.round(Math.cos(A*RAD10)*2)/2;
  return mkNum(r,{stem:`Cho hai vectơ ${vc(I('a'))}, ${vc(I('b'))} có |${vc(I('a'))}| = ${a}, |${vc(I('b'))}| = ${b} và góc giữa hai vectơ bằng ${A}${DEG}. Tích vô hướng ${vc(I('a'))} · ${vc(I('b'))} bằng`,correct:d,ok:()=>true,cands:[a*b,-a*b,a*b/2,-a*b/2,0,a+b].filter(x=>x!==d),
    sol:`${vc(I('a'))} · ${vc(I('b'))} = |${vc(I('a'))}|·|${vc(I('b'))}|·cos ${A}° = ${a}·${b}·${tvH(Math.round(Math.cos(A*RAD10)*2)/2)} = ${sg(d)}.`,chk:()=>true});
});
/* cặp vectơ nguyên tạo góc 0°, 45°, 90°, 135°, 180° */
const angPair=(r,A)=>{for(;;){const a=r.int(-4,4),b=r.int(-4,4);if(!a&&!b)continue;const k=r.int(1,2);
  const v={0:[a,b],45:[a-b,a+b],90:[-b,a],135:[-a-b,a-b],180:[-a,-b]}[A].map(x=>x*k);if(Math.max(...v.map(Math.abs))>8)continue;return[[a,b],v]}};
N10('k10-11-angle',4,'TH',[11],r=>{
  const A=r.pick([45,90,135,0,180,45,135]),[u,v]=angPair(r,A),d=u[0]*v[0]+u[1]*v[1],n2=(u[0]**2+u[1]**2)*(v[0]**2+v[1]**2);
  return mkTxt(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('u'))} = ${cV(u)} và ${vc(I('v'))} = ${cV(v)}. Góc giữa hai vectơ ${vc(I('u'))} và ${vc(I('v'))} bằng`,correct:`${A}${DEG}`,wrongs:r.shuffle([0,30,45,60,90,120,135,150,180].filter(x=>x!==A&&x!==180-A)).concat([180-A]).map(x=>`${x}${DEG}`),
    sol:`cos(${vc(I('u'))}, ${vc(I('v'))}) = ${fr(`${vc(I('u'))} · ${vc(I('v'))}`,`|${vc(I('u'))}|·|${vc(I('v'))}|`)} = ${fr(sg(d),sqH(n2))} = ${tvH(Math.cos(A*RAD10)+0)}. Vậy góc bằng ${A}°.`,chk:()=>Math.abs(d/Math.sqrt(n2)-Math.cos(A*RAD10))<1e-9});
});
N10('k10-11-perp',4,'TH',[11],r=>{
  for(;;){const a=r.nz(-5,5),b=r.nz(-5,5),c=r.int(-5,5);if((a*c)%b)continue;const m=-a*c/b;
    return mkNum(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('u'))} = (${I('m')}; ${sg(a)}) và ${vc(I('v'))} = ${cV([b,c])}. Giá trị của ${I('m')} để ${vc(I('u'))} ⊥ ${vc(I('v'))} là`,correct:m,ok:()=>true,cands:[-m,a*b/(c||1),m+1,c,m-2],
      sol:`${vc(I('u'))} ⊥ ${vc(I('v'))} ⟺ ${vc(I('u'))} · ${vc(I('v'))} = 0 ⟺ ${sg(b)}m + ${sg(a)}·${sg(c)} = 0 ⟺ m = ${sg(m)}.`.replace('+ '+MINUS,MINUS+' ').replace(PR10,PRF10),chk:()=>m*b+a*c===0})}
});
N10('k10-11-shape',4,'TH',[11],r=>{
  for(;;){const sh=r.pick(['sq','eq']),S=SHP10[sh],K=Object.keys(S.V),u=r.pick(K),v=r.pick(K.filter(x=>x!==u&&x!==u[1]+u[0])),a=r.int(1,6),q=qmul(gDot(S.g,S.V[u],S.V[v]),Q(a*a));
    return mkF(r,{stem:`Cho ${S.nm(a)}. Tích vô hướng ${Vv(u)} · ${Vv(v)} bằng`,correct:q,cands:[Q(-q[0],q[1]),Q(a*a),Q(a*a,2),Q(-a*a,2),Q(0),Q(2*a*a)],
      sol:`${Vv(u)} · ${Vv(v)} = |${Vv(u)}|·|${Vv(v)}|·cos(${Vv(u)}, ${Vv(v)}). Xác định góc giữa hai vectơ (đưa về chung điểm đầu) ta được kết quả ${qh(q)}.`,chk:()=>true})}
});
DS10('ds10-10-coord',4,'TH',[10],r=>{
  for(;;){const [A,B,C]=ptsR(r,3,-5,5);const sx=A[0]+B[0]+C[0],sy=A[1]+B[1]+C[1];if(sx%3||sy%3||(A[0]+B[0])%2||(A[1]+B[1])%2)continue;
    const ab=[B[0]-A[0],B[1]-A[1]],ac=[C[0]-A[0],C[1]-A[1]],cr=ab[0]*ac[1]-ab[1]*ac[0];if(!cr)continue;const D=[A[0]+C[0]-B[0],A[1]+C[1]-B[1]],dot=ab[0]*ac[0]+ab[1]*ac[1];
    return mkDS(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ba điểm ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${Vv('AB')} = ${cV(ab)}.`,f:`${Vv('AB')} = ${cV([-ab[0],-ab[1]])}.`,why:`${Vv('AB')} = (${sg(B[0])} − ${sg(A[0])}; ${sg(B[1])} − ${sg(A[1])}) = ${cV(ab)}.`.replace(/− (-\d+)/g,'− ($1)')},
      {t:`Trọng tâm tam giác ${I('ABC')} là ${PT('G',[sx/3,sy/3])}.`,f:`Trọng tâm tam giác ${I('ABC')} là ${PT('G',[sx,sy])}.`,why:`G = (${fr(sg(sx),3)}; ${fr(sg(sy),3)}) = ${cV([sx/3,sy/3])}.`},
      {t:`Tứ giác ${I('ABCD')} là hình bình hành khi ${PT('D',D)}.`,f:`Tứ giác ${I('ABCD')} là hình bình hành khi ${PT('D',[B[0]+C[0]-A[0],B[1]+C[1]-A[1]])}.`,why:`${Vv('AD')} = ${Vv('BC')} ⇒ D = ${cV(D)}.`},
      {t:`${Vv('AB')} · ${Vv('AC')} = ${sg(dot)}.`,f:`${Vv('AB')} · ${Vv('AC')} = ${sg(dot+r.pick([-2,2,3]))}.`,why:`${Vv('AC')} = ${cV(ac)}; ${Vv('AB')} · ${Vv('AC')} = ${sg(dot)}.`}],chk:()=>[B[0]+C[0]-A[0],B[1]+C[1]-A[1]].join()!==D.join()})}
});
DS10('ds10-11-dot',4,'TH',[11],r=>{
  for(;;){const A=r.pick([45,90,135]),[u,v]=angPair(r,A),d=u[0]*v[0]+u[1]*v[1],w=[-u[1]*2,u[0]*2],L2=u[0]**2+u[1]**2;if(L2<2)continue;
    return mkDS(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('a'))} = ${cV(u)}, ${vc(I('b'))} = ${cV(v)} và ${vc(I('c'))} = ${cV(w)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${vc(I('a'))} · ${vc(I('b'))} = ${sg(d)}.`,f:`${vc(I('a'))} · ${vc(I('b'))} = ${sg(u[0]*v[1]+u[1]*v[0])===sg(d)?sg(d+2):sg(u[0]*v[1]+u[1]*v[0])}.`,why:`${vc(I('a'))} · ${vc(I('b'))} = ${sg(u[0])}·${sg(v[0])} + ${sg(u[1])}·${sg(v[1])} = ${sg(d)}.`.replace(PR10,PRF10)},
      {t:`|${vc(I('a'))}| = ${sqH(L2)}.`,f:`|${vc(I('a'))}| = ${L2}.`,why:`|${vc(I('a'))}| = √(${u[0]**2} + ${u[1]**2}) = ${sqH(L2)}.`},
      {t:`${vc(I('a'))} ⊥ ${vc(I('c'))}.`,f:`${vc(I('a'))} cùng phương với ${vc(I('c'))}.`,why:`${vc(I('a'))} · ${vc(I('c'))} = 0 nên ${vc(I('a'))} ⊥ ${vc(I('c'))}.`},
      {t:`Góc giữa hai vectơ ${vc(I('a'))} và ${vc(I('b'))} bằng ${A}${DEG}.`,f:`Góc giữa hai vectơ ${vc(I('a'))} và ${vc(I('b'))} bằng ${180-A===A?60:180-A}${DEG}.`,why:`cos(${vc(I('a'))}, ${vc(I('b'))}) = ${tvH(Math.cos(A*RAD10)+0)}.`}],chk:()=>L2>1&&String(L2)!==sqH(L2)})}
});
TLN10('t10-10-para',4,'TH',[10],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),t=r.nz(-3,3),m=t*a,c=t*b,perp=r.chance(.5);
  if(perp){for(;;){const p=r.nz(-5,5),q=r.nz(-5,5),s=r.int(-5,5);if((q*s)%p)continue;const mm=-q*s/p;
    return{kind:'tln',stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('u'))} = ${cV([p,q])} và ${vc(I('v'))} = (${I('m')}; ${sg(s)}). Tìm ${I('m')} để ${vc(I('u'))} vuông góc với ${vc(I('v'))}.`,ans:mm,unit:'',sol:`${vc(I('u'))} · ${vc(I('v'))} = ${sg(p)}m + ${sg(q*s)} = 0 ⟺ m = ${sg(mm)}.`.replace('+ '+MINUS,MINUS+' '),chk:()=>p*mm+q*s===0}}}
  return{kind:'tln',stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ${vc(I('u'))} = ${cV([a,b])} và ${vc(I('v'))} = (${I('m')}; ${sg(c)}). Tìm ${I('m')} để hai vectơ ${vc(I('u'))} và ${vc(I('v'))} cùng phương.`,ans:m,unit:'',sol:`Cùng phương ⟺ ${sg(a)}·${sg(c)} − ${sg(b)}·m = 0 ⟺ m = ${sg(m)}.`.replace(PR10,PRF10),chk:()=>a*c===b*m};
});
TLN10('t10-11-work',4,'VD',[11],r=>{
  const F=r.int(2,30)*10,d=r.int(5,50),A=r.pick([0,30,45,60]),W=F*d*Math.cos(A*RAD10),v=Math.round(W);
  return{kind:'tln',stem:`Một người kéo một thùng hàng trượt trên mặt sàn nằm ngang một đoạn ${d} m bằng một lực ${vc(I('F'))} có độ lớn ${F} N, hướng của lực tạo với hướng di chuyển một góc ${A}${DEG}. Tính công sinh bởi lực ${vc(I('F'))} (đơn vị: J, làm tròn kết quả đến hàng đơn vị).`,ans:v,unit:'J',
    sol:`A = ${vc(I('F'))} · ${vc(I('d'))} = |${vc(I('F'))}|·|${vc(I('d'))}|·cos ${A}° = ${F}·${d}·cos ${A}° ≈ ${v} (J).`,chk:()=>Math.abs(W-v)<.5};
});
TLN10('t10-11-dot',4,'TH',[11],r=>{
  for(;;){const [A,B,C]=ptsR(r,3,-5,5),ab=[B[0]-A[0],B[1]-A[1]],ac=[C[0]-A[0],C[1]-A[1]];if(ab[0]*ac[1]===ab[1]*ac[0])continue;const ask=r.chance(.5);
    if(ask){const d=ab[0]*ac[0]+ab[1]*ac[1];return{kind:'tln',stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ba điểm ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Tính tích vô hướng ${Vv('AB')} · ${Vv('AC')}.`,ans:d,unit:'',sol:`${Vv('AB')} = ${cV(ab)}, ${Vv('AC')} = ${cV(ac)}; ${Vv('AB')} · ${Vv('AC')} = ${sg(d)}.`,chk:()=>true}}
    const c=(ab[0]*ac[0]+ab[1]*ac[1])/Math.sqrt((ab[0]**2+ab[1]**2)*(ac[0]**2+ac[1]**2)),deg=Math.acos(c)/RAD10,v=Math.round(deg);if(Math.abs(deg-v)>.45&&Math.abs(deg-v)<.55)continue;
    return{kind:'tln',stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ba điểm ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Tính số đo góc ${I('BAC')} (đơn vị: độ, làm tròn kết quả đến hàng đơn vị).`,ans:v,unit:'°',sol:`${Vv('AB')} = ${cV(ab)}, ${Vv('AC')} = ${cV(ac)}; cos BAC = ${fr(`${Vv('AB')} · ${Vv('AC')}`,`AB · AC`)} ≈ ${fmt(Math.round(c*1000)/1000)} ⇒ góc BAC ≈ ${v}°.`,chk:()=>true}}
});
TL10('tl10-10-coord',4,'TH','b',[10,11],r=>{
  for(;;){const [A,B,C]=ptsR(r,3,-5,5),ab=[B[0]-A[0],B[1]-A[1]],ac=[C[0]-A[0],C[1]-A[1]],cr=ab[0]*ac[1]-ab[1]*ac[0];if(!cr)continue;
    const D=[A[0]+C[0]-B[0],A[1]+C[1]-B[1]],dot=ab[0]*ac[0]+ab[1]*ac[1],n2=(ab[0]**2+ab[1]**2)*(ac[0]**2+ac[1]**2);
    return{kind:'tl',title:'Toạ độ của vectơ và tích vô hướng',parts:[
      {pts:.5,html:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho ba điểm ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Chứng minh ${I('A')}, ${I('B')}, ${I('C')} là ba đỉnh của một tam giác và tìm toạ độ điểm ${I('D')} sao cho ${I('ABCD')} là hình bình hành.`},
      {pts:.5,html:`Tính ${Vv('AB')} · ${Vv('AC')} và cos ${I('BAC')}.`}],
      sol:[ptxt([[`${Vv('AB')} = ${cV(ab)}, ${Vv('AC')} = ${cV(ac)}; vì ${sg(ab[0])}·${sg(ac[1])} − ${sg(ab[1])}·${sg(ac[0])} = ${sg(cr)} ≠ 0 nên hai vectơ không cùng phương, A, B, C không thẳng hàng.`.replace(PR10,PRF10),.25],[`ABCD là hình bình hành ⟺ ${Vv('AD')} = ${Vv('BC')} ⟺ D${cV(D)}.`,.25]]),
        ptxt([[`${Vv('AB')} · ${Vv('AC')} = ${sg(ab[0])}·${sg(ac[0])} + ${sg(ab[1])}·${sg(ac[1])} = ${sg(dot)}.`.replace(PR10,PRF10),.25],[`cos BAC = ${fr(sg(dot),`${sqH(ab[0]**2+ab[1]**2)} · ${sqH(ac[0]**2+ac[1]**2)}`)}${dot?` = ${dot<0?MINUS:''}${(()=>{let k=1,m=n2;for(let t=Math.floor(Math.sqrt(m));t>1;t--)if(m%(t*t)===0){k=t;m/=t*t;break}const q=Q(Math.abs(dot),k);return m===1?qh(q):fr(q[0],(q[1]===1?'':q[1])+rt(m))})()}`:' = 0'}.`,.25]])],chk:()=>true}}
});
TL10('tl10-11-dot',4,'VD','b',[11],r=>{
  const a=r.int(2,8),sh=r.chance(.5);
  if(sh)return{kind:'tl',title:'Tích vô hướng của hai vectơ',parts:[
    {pts:.5,html:`Cho tam giác đều ${I('ABC')} cạnh ${a}. Tính các tích vô hướng ${Vv('AB')} · ${Vv('AC')} và ${Vv('AB')} · ${Vv('BC')}.`},
    {pts:.5,html:`Gọi ${I('M')} là trung điểm của ${I('BC')}. Tính ${Vv('AM')} · ${Vv('AB')} và độ dài của vectơ ${Vv('AB')} + ${Vv('AC')}.`}],
    sol:[ptxt([[`${Vv('AB')} · ${Vv('AC')} = ${a}·${a}·cos 60° = ${qh(Q(a*a,2))}.`,.25],[`${Vv('AB')} · ${Vv('BC')} = ${a}·${a}·cos 120° = ${qh(Q(-a*a,2))}.`,.25]]),
      ptxt([[`${Vv('AM')} = ½(${Vv('AB')} + ${Vv('AC')}) ⇒ ${Vv('AM')} · ${Vv('AB')} = ½(${a*a} + ${qh(Q(a*a,2))}) = ${qh(Q(3*a*a,4))}.`,.25],[`|${Vv('AB')} + ${Vv('AC')}| = 2AM = 2 · ${fr(sideH([a,3]),2)} = ${sideH([a,3])}.`,.25]])],chk:()=>true};
  const b=r.int(2,8);
  return{kind:'tl',title:'Tích vô hướng của hai vectơ',parts:[
    {pts:.5,html:`Cho hình chữ nhật ${I('ABCD')} có ${I('AB')} = ${a}, ${I('AD')} = ${b}. Tính ${Vv('AB')} · ${Vv('AC')} và ${Vv('AC')} · ${Vv('BD')}.`},
    {pts:.5,html:`Gọi ${I('M')} là trung điểm của ${I('CD')}. Tính ${Vv('AM')} · ${Vv('BD')}.`}],
    sol:[ptxt([[`${Vv('AB')} · ${Vv('AC')} = ${Vv('AB')} · (${Vv('AB')} + ${Vv('AD')}) = AB² = ${a*a}.`,.25],[`${Vv('AC')} · ${Vv('BD')} = (${Vv('AB')} + ${Vv('AD')}) · (${Vv('AD')} ${MINUS} ${Vv('AB')}) = AD² − AB² = ${sg(b*b-a*a)}.`,.25]]),
      ptxt([[`${Vv('AM')} = ${Vv('AD')} + ½${Vv('AB')}, ${Vv('BD')} = ${Vv('AD')} ${MINUS} ${Vv('AB')}.`,.25],[`${Vv('AM')} · ${Vv('BD')} = AD² − ½AB² = ${b*b} − ${qh(Q(a*a,2))} = ${qh(Q(2*b*b-a*a,2))}.`,.25]])],chk:()=>true};
});
TL10('tl10-11-coord',4,'VD','b',[10,11],r=>{
  for(;;){const [A,B]=ptsR(r,2,-5,5);/* M(m; 0) trên Ox với MA ⊥ MB: (x_A − m)(x_B − m) + y_A y_B = 0 */
    const b_=-(A[0]+B[0]),c_=A[0]*B[0]+A[1]*B[1],D=b_*b_-4*c_;if(D<=0)continue;const s=Math.sqrt(D);if(!isInt(s))continue;const m1=(-b_-s)/2,m2=(-b_+s)/2;if(!isInt(m1)||!isInt(m2)||A[1]===0||B[1]===0)continue;
    const G=[(A[0]+B[0])/3,(A[1]+B[1])/3];
    return{kind:'tl',title:'Toạ độ và tích vô hướng',parts:[
      {pts:.5,html:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho hai điểm ${PT('A',A)} và ${PT('B',B)}. Tính ${Vv('OA')} · ${Vv('OB')} và độ dài đoạn thẳng ${I('AB')}.`},
      {pts:.5,html:`Tìm toạ độ điểm ${I('M')} thuộc trục hoành sao cho tam giác ${I('MAB')} vuông tại ${I('M')}.`}],
      sol:[ptxt([[`${Vv('OA')} · ${Vv('OB')} = ${sg(A[0])}·${sg(B[0])} + ${sg(A[1])}·${sg(B[1])} = ${sg(A[0]*B[0]+A[1]*B[1])}.`.replace(PR10,PRF10),.25],[`AB = √(${(B[0]-A[0])**2} + ${(B[1]-A[1])**2}) = ${sqH((B[0]-A[0])**2+(B[1]-A[1])**2)}.`,.25]]),
        ptxt([[`M(m; 0): ${Vv('MA')} = (${sg(A[0])} − m; ${sg(A[1])}), ${Vv('MB')} = (${sg(B[0])} − m; ${sg(B[1])}); ${Vv('MA')} · ${Vv('MB')} = 0 ⟺ m² ${b_<0?MINUS:'+'} ${Math.abs(b_)}m ${c_<0?MINUS:'+'} ${Math.abs(c_)} = 0.`.replace(' + 0m','').replace(` ${MINUS} 0m`,''),.25],[`m = ${sg(m1)}${m1!==m2?` hoặc m = ${sg(m2)}`:''}; vậy M(${sg(m1)}; 0)${m1!==m2?` hoặc M(${sg(m2)}; 0)`:''}.`,.25]])],chk:()=>[m1,m2].every(m=>(A[0]-m)*(B[0]-m)+A[1]*B[1]===0)}}
});
