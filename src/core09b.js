/* ================================================================
   LỚP 9 – học kì I (tiếp)
   Chương III: Căn bậc hai và căn bậc ba (Bài 7 – 10)
   Chương IV: Hệ thức lượng trong tam giác vuông (Bài 11 – 12)
   Chương V: Đường tròn (Bài 13 – 17)
   ================================================================ */
const kr=(k,m)=>m===1?sg(k):`${k===1?'':k===-1?MINUS:sg(k)}${rt(m)}`;/* k√m */
const RADS=[2,3,5,6,7];

/* ===================== Bài 7: Căn bậc hai và căn thức bậc hai ===================== */
N9('k9-7-sqrt',3,'NB',[7],r=>{
  const a=r.int(2,15),t=r.int(0,2);
  if(t===0)return mkTxt(r,{stem:`Căn bậc hai số học của ${a*a} là`,correct:String(a),wrongs:[`${MINUS}${a}`,`±${a}`,String(a*a*2),String(2*a)],sol:`${rt(a*a)} = ${a} vì ${a} ≥ 0 và ${a}² = ${a*a}.`,chk:()=>true});
  if(t===1)return mkTxt(r,{stem:`Các căn bậc hai của ${a*a} là`,correct:`${a} và ${MINUS}${a}`,wrongs:[String(a),`${MINUS}${a}`,`${a*a} và ${MINUS}${a*a}`],sol:`Số dương ${a*a} có hai căn bậc hai là ${a} và −${a}.`,chk:()=>true});
  const b=r.int(2,12),c=r.int(2,12);
  return mkNum(r,{stem:`Giá trị của biểu thức ${rt(b*b)} ${MINUS} ${rt(c*c)} + ${rt(a*a)} bằng`,correct:b-c+a,ok:()=>true,cands:[b+c+a,b-c-a,b*b-c*c+a*a,-(b-c+a)],sol:`${rt(b*b)} = ${b}, ${rt(c*c)} = ${c}, ${rt(a*a)} = ${a}; kết quả bằng ${sg(b-c+a)}.`,chk:()=>true});
});
N9('k9-7-cond',3,'NB',[7],r=>{
  const a=r.nz(-5,5),p=r.nz(-6,6),b=-a*p,cor=a>0?`${I('x')} ≥ ${sg(p)}`:`${I('x')} ≤ ${sg(p)}`;
  return mkTxt(r,{stem:`Điều kiện xác định của biểu thức ${rt(xlin(a,b))} là`,correct:cor,wrongs:[a>0?`${I('x')} ≤ ${sg(p)}`:`${I('x')} ≥ ${sg(p)}`,a>0?`${I('x')} > ${sg(p)}`:`${I('x')} < ${sg(p)}`,`${I('x')} ≥ ${sg(-p)}`,`${I('x')} ≤ ${sg(-p)}`].filter((x,i,A)=>x!==cor&&A.indexOf(x)===i),
    sol:`Biểu thức xác định khi ${xlin(a,b)} ≥ 0 ⟺ ${cor}.`,chk:()=>true});
});
N9('k9-7-abs',3,'TH',[7],r=>{
  const p=r.nz(-5,5),lt=r.chance(.5),cor=lt?xlin(-1,p):xlin(1,-p);
  return mkTxt(r,{stem:`Với ${I('x')} ${lt?'<':'>'} ${sg(p)}, biểu thức ${rt(`(${xlin(1,-p)})${sup(2)}`)} bằng`,correct:cor,wrongs:[lt?xlin(1,-p):xlin(-1,p),xlin(1,p),xlin(-1,-p),`|${xlin(1,p)}|`].filter((x,i,A)=>x!==cor&&A.indexOf(x)===i),
    sol:`${rt('A²')} = |A|. Với x ${lt?'<':'>'} ${sg(p)} thì ${xlin(1,-p)} ${lt?'< 0':'> 0'} nên ${rt(`(${xlin(1,-p)})²`)} = ${cor}.`,chk:()=>p===p});
});

/* ===================== Bài 8: Khai căn bậc hai với phép nhân và phép chia ===================== */
N9('k9-8-mul',3,'NB',[8],r=>{
  const t=r.int(0,1);
  if(t){const [a,b]=r.pick([[2,8],[3,12],[2,18],[5,20],[3,27],[2,32],[6,24],[7,28]]),v=Math.sqrt(a*b);return mkNum(r,{stem:`Giá trị của biểu thức ${rt(a)}·${rt(b)} bằng`,correct:v,cands:[a*b,v*2,a+b,v+1],sol:`${rt(a)}·${rt(b)} = ${rt(a*b)} = ${v}.`,chk:()=>isInt(v)})}
  const [a,b]=r.pick([[50,2],[72,2],[75,3],[48,3],[98,2],[80,5],[45,5],[63,7]]),v=Math.sqrt(a/b);
  return mkNum(r,{stem:`Giá trị của biểu thức ${fr(rt(a),rt(b))} bằng`,correct:v,cands:[a/b,v+1,2*v,v-1].filter(x=>x>0),sol:`${fr(rt(a),rt(b))} = ${rt(fr(a,b))} = ${rt(a/b)} = ${v}.`,chk:()=>isInt(v)});
});
N9('k9-8-out',3,'TH',[8],r=>{
  const m=r.pick(RADS),k=r.int(2,6),n=k*k*m;
  return mkTxt(r,{stem:`Đưa thừa số ra ngoài dấu căn: ${rt(n)} bằng`,correct:kr(k,m),wrongs:[kr(m,k*k),kr(k*k,m),kr(k,m*k),kr(2*k,m),kr(k+1,m),kr(k,m+1)].filter((x,i,A)=>x!==kr(k,m)&&A.indexOf(x)===i),sol:`${rt(n)} = ${rt(`${k*k}·${m}`)} = ${kr(k,m)}.`,chk:()=>true});
});

/* ===================== Bài 9: Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai ===================== */
/* tổng a√(k1²m) + b√(k2²m) + c√(k3²m) = (ak1 + bk2 + ck3)√m */
const radSum=r=>{for(;;){const m=r.pick([2,3,5,7]),k=[r.int(1,5),r.int(1,5),r.int(1,5)],c=[r.nz(-3,3),r.nz(-3,3),r.nz(-3,3)];if(new Set(k).size<2)continue;
  const tot=k.reduce((s,x,i)=>s+x*c[i],0);if(!tot)continue;const H=k.map((x,i)=>{const co=Math.abs(c[i]);return `${i?(c[i]<0?` ${MINUS} `:' + '):(c[i]<0?MINUS:'')}${co===1?'':co}${rt(x*x*m)}`}).join('');return{m,k,c,tot,H}}};
N9('k9-9-sum',3,'TH',[9],r=>{
  const R=radSum(r),cor=kr(R.tot,R.m),W=[kr(R.tot+1,R.m),kr(-R.tot,R.m),kr(R.c[0]+R.c[1]+R.c[2]||1,R.m),kr(R.tot,R.m*2)].filter((x,i,A)=>x!==cor&&A.indexOf(x)===i);
  return mkTxt(r,{stem:`Rút gọn biểu thức ${I('A')} = ${R.H} ta được`,correct:cor,wrongs:W.concat([kr(R.tot+2,R.m)]),sol:`Đưa thừa số ra ngoài dấu căn: ${R.k.map((x,i)=>`${rt(x*x*R.m)} = ${kr(x,R.m)}`).join('; ')}. Do đó A = ${cor}.`,chk:()=>true});
});
N9('k9-9-ration',3,'TH',[9],r=>{
  const t=r.int(0,1);
  if(t){const a=r.int(1,6),m=r.pick(RADS),cor=a%m===0?kr(a/m,m):fr(kr(a,m),m);return mkTxt(r,{stem:`Trục căn thức ở mẫu: ${fr(a,rt(m))} bằng`,correct:cor,wrongs:[fr(rt(m),a),kr(a,m),fr(a,m),fr(kr(a,m),a*m)].filter(x=>x!==cor),sol:`${fr(a,rt(m))} = ${fr(`${a}·${rt(m)}`,`${rt(m)}·${rt(m)}`)} = ${cor}.`,chk:()=>true})}
  for(;;){const p=r.int(2,7),q=r.int(1,6);if(p*p===q||!isInt(Math.sqrt(q)))continue;/* c/(√p ± √q) với q chính phương: √q = s */
    const s=Math.sqrt(q),minus=r.chance(.5),d=p-q;if(!d)continue;const c=Math.abs(d)*r.pick([1,2]);const kk=c/d;if(!isInt(kk))continue;
    /* c/(√p − s) = c(√p + s)/(p − q) = kk(√p + s) */
    const sg2=minus?'+':MINUS,cor=`${kk===1?'':kk===-1?MINUS:sg(kk)}(${rt(p)} ${sg2} ${s})`.replace(/^(.*)\((.*)\)$/,(m,k,x)=>k?`${k}(${x})`:x);
    const W=[`${rt(p)} ${minus?MINUS:'+'} ${s}`,`${sg(kk*2)}(${rt(p)} ${sg2} ${s})`,`${fr(`${rt(p)} ${sg2} ${s}`,Math.abs(d)+1)}`,`${MINUS}(${rt(p)} ${sg2} ${s})`].filter(x=>x!==cor);
    return mkTxt(r,{stem:`Trục căn thức ở mẫu: ${fr(c,`${rt(p)} ${minus?MINUS:'+'} ${s}`)} bằng`,correct:cor,wrongs:uniqBy(W,x=>x),
      sol:`Nhân cả tử và mẫu với biểu thức liên hợp ${rt(p)} ${sg2} ${s}: ${fr(`${c}(${rt(p)} ${sg2} ${s})`,`${p} ${MINUS} ${q}`)} = ${cor}.`,chk:()=>true})}
});
/* biểu thức chứa x: A = √x/(√x − a) − ... rút gọn; dùng mẫu A = (x − a²)/(√x − a) = √x + a và các biến thể */
const EXPR9=[
  a=>({H:`${fr(`${I('x')} ${MINUS} ${a*a}`,`${rt(I('x'))} ${MINUS} ${a}`)}`,val:x=>Math.sqrt(x)+a,simp:`${rt(I('x'))} + ${a}`,cond:`${I('x')} ≥ 0, ${I('x')} ≠ ${a*a}`,ok:x=>x>=0&&x!==a*a,how:`x − ${a*a} = (√x − ${a})(√x + ${a})`}),
  a=>({H:`${fr(`${I('x')} + ${a}${rt(I('x'))}`,rt(I('x')))}`,val:x=>Math.sqrt(x)+a,simp:`${rt(I('x'))} + ${a}`,cond:`${I('x')} > 0`,ok:x=>x>0,how:`x + ${a}√x = √x(√x + ${a})`}),
  a=>({H:`${fr(rt(I('x')),`${rt(I('x'))} ${MINUS} ${a}`)} + ${fr(a,`${rt(I('x'))} + ${a}`)} ${MINUS} ${fr(`${2*a*a}`,`${I('x')} ${MINUS} ${a*a}`)}`,val:x=>{const s=Math.sqrt(x);return s/(s-a)+a/(s+a)-2*a*a/(x-a*a)},simp:fr(`${rt(I('x'))} + ${3*a}`,`${rt(I('x'))} + ${a}`),cond:`${I('x')} ≥ 0, ${I('x')} ≠ ${a*a}`,ok:x=>x>=0&&x!==a*a,how:`quy đồng với mẫu chung x − ${a*a} = (√x − ${a})(√x + ${a}), tử thức bằng x + ${2*a}√x − ${3*a*a} = (√x − ${a})(√x + ${3*a})`})];
N9('k9-9-expr',3,'VD',[9],r=>{
  for(;;){const a=r.int(1,4),E=r.pick(EXPR9)(a),x0=r.pick([1,4,9,16,25,36,49,64].filter(x=>E.ok(x))),v=E.val(x0);if(!isFinite(v)||!isInt(v*100))continue;
    return mkNum(r,{stem:`Cho biểu thức ${I('A')} = ${E.H} với ${E.cond}. Giá trị của ${I('A')} khi ${I('x')} = ${x0} là`,correct:v,ok:()=>true,cands:[v+1,-v,v*2,Math.sqrt(x0),v-a].filter(isFinite),
      sol:`Rút gọn (${E.how}): A = ${E.simp}. Với x = ${x0} thoả mãn điều kiện: A = ${fmt(v)}.`,chk:()=>true})}
});
DS9('ds9-9-rad',3,'TH',[7,8,9],r=>{
  const R=radSum(r),m=r.pick(RADS),k=r.int(2,5),a=r.int(2,6),p=r.int(-4,4);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${rt(k*k*m)} = ${kr(k,m)}.`,f:`${rt(k*k*m)} = ${kr(k*k,m)}.`,why:`${rt(k*k*m)} = ${rt(k*k)}·${rt(m)} = ${kr(k,m)}.`},
    {t:`${R.H} = ${kr(R.tot,R.m)}.`,f:`${R.H} = ${kr(R.tot+1,R.m)}.`,why:`Đưa thừa số ra ngoài dấu căn rồi thu gọn các căn đồng dạng.`},
    {t:`${fr(a,rt(m))} = ${a%m===0?kr(a/m,m):fr(kr(a,m),m)}.`,f:`${fr(a,rt(m))} = ${kr(a,m)}.`,why:`Nhân cả tử và mẫu với ${rt(m)}.`},
    {t:`Biểu thức ${rt(xlin(1,-p))} xác định khi ${I('x')} ≥ ${sg(p)}.`,f:`Biểu thức ${rt(xlin(1,-p))} xác định khi ${I('x')} > ${sg(p)}.`,why:`Cần ${xlin(1,-p)} ≥ 0.`}],chk:()=>true});
});
TLN9('t9-9-sum',3,'TH',[9],r=>{
  for(;;){const R=radSum(r),A=Math.round(Math.pow(R.tot,2)*R.m);if(A>9999)continue;
    return{kind:'tln',stem:`Cho ${I('A')} = ${R.H}. Tính ${I('A')}${sup(2)}.`,ans:A,unit:'',sol:`A = ${kr(R.tot,R.m)} nên A² = ${R.tot*R.tot}·${R.m} = ${A}.`,chk:()=>true}}
});
TLN9('t9-9-expr',3,'VD',[9],r=>{
  for(;;){const a=r.int(1,4),k=r.int(a+1,a+8);/* A = (√x + a)/(√x − a) = ... dùng mẫu 1: A = √x + a, tìm x để A = k */
    const x=(k-a)**2;if(x===a*a)continue;
    return{kind:'tln',stem:`Cho biểu thức ${I('A')} = ${fr(`${I('x')} ${MINUS} ${a*a}`,`${rt(I('x'))} ${MINUS} ${a}`)} với ${I('x')} ≥ 0, ${I('x')} ≠ ${a*a}. Tìm ${I('x')} để ${I('A')} = ${k}.`,ans:x,unit:'',
      sol:`A = ${fr(`(√x − ${a})(√x + ${a})`,`√x − ${a}`)} = √x + ${a}. A = ${k} ⟺ √x = ${k-a} ⟺ x = ${x} (thoả mãn).`,chk:()=>true}}
});
TL9('tl9-9-rad',3,'TH','rad',[8,9],r=>{
  const R=radSum(r),a=r.int(1,6),m=r.pick(RADS);
  return{kind:'tl',title:'Biến đổi biểu thức chứa căn',parts:[{pts:.5,html:`Rút gọn biểu thức ${I('A')} = ${R.H}.`},{pts:.5,html:`Trục căn thức ở mẫu và rút gọn ${I('B')} = ${fr(a,rt(m))} + ${rt(m)}.`}],
    sol:[ptxt([[`${R.k.map((x,i)=>`${rt(x*x*R.m)} = ${kr(x,R.m)}`).join('; ')}.`,.25],[`A = ${kr(R.tot,R.m)}.`,.25]]),ptxt([[`${fr(a,rt(m))} = ${fr(kr(a,m),m)}.`,.25],[`B = ${fr(kr(a+m,m),m)}${(a+m)%m===0?' = '+kr((a+m)/m,m):''}.`,.25]])],chk:()=>true};
});
TL9('tl9-9-expr',3,'VD','rad',[9],r=>{
  const a=r.int(1,4),E=EXPR9[2](a),[kq,m]=r.pick([[Q(3,2),3],[Q(5,3),2],[Q(7,5),4]]),x=(m*a)**2;
  return{kind:'tl',title:'Rút gọn biểu thức chứa căn thức bậc hai',parts:[{pts:.5,html:`Cho biểu thức ${I('A')} = ${E.H} với ${E.cond}. Rút gọn ${I('A')}.`},{pts:.5,html:`Tìm ${I('x')} để ${I('A')} = ${qh(kq)}.`}],
    sol:[ptxt([[`Mẫu chung x − ${a*a} = (√x − ${a})(√x + ${a}); tử thức: √x(√x + ${a}) + ${a}(√x − ${a}) − ${2*a*a} = x + ${2*a}√x − ${3*a*a} = (√x − ${a})(√x + ${3*a}).`,.25],[`Vậy A = ${E.simp}.`,.25]]),
      ptxt([[`A = ${qh(kq)} ⟺ ${kq[1]}(√x + ${3*a}) = ${kq[0]}(√x + ${a}) ⟺ √x = ${m*a}.`,.25],[`x = ${x} (thoả mãn điều kiện).`,.25]])],chk:()=>Math.abs(E.val(x)-kq[0]/kq[1])<1e-9};
});
/* ===================== Bài 10: Căn bậc ba và căn thức bậc ba ===================== */
const cbrt=s=>`<span class="cb"><sup>3</sup>${rt(s)}</span>`;
N9('k9-10-cube',3,'NB',[10],r=>{
  const a=r.nz(-6,6),n=a**3;
  return mkNum(r,{stem:`Giá trị của ${cbrt(sg(n))} bằng`,correct:a,ok:()=>true,cands:[-a,a*a,n/3|0,a+1].filter(x=>x!==a),sol:`Vì (${sg(a)})³ = ${sg(n)} nên ${cbrt(sg(n))} = ${sg(a)}.`,chk:()=>true});
});
N9('k9-10-calc',3,'TH',[10],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),c=r.int(2,5),v=a-b*c;
  return mkNum(r,{stem:`Giá trị của biểu thức ${cbrt(sg(a**3))} ${MINUS} ${c}${cbrt(sg(b**3))} bằng`,correct:v,ok:()=>true,cands:[a+b*c,a-b,v+1,-v],sol:`${cbrt(sg(a**3))} = ${sg(a)}, ${cbrt(sg(b**3))} = ${sg(b)}; kết quả bằng ${pp10(`${sg(a)} − ${c}·${sg(b)}`)} = ${sg(v)}.`,chk:()=>true});
});

/* ===================== Bài 11: Tỉ số lượng giác của góc nhọn ===================== */
const PYT9=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[7,24,25],[9,12,15],[20,21,29]];
N9('k9-11-def',4,'NB',[11],r=>{
  const fn=r.pick(['sin','cos','tan','cot']),ang=r.pick(['B','C']),opp=ang==='B'?'AC':'AB',adj=ang==='B'?'AB':'AC';
  const v={sin:[opp,'BC'],cos:[adj,'BC'],tan:[opp,adj],cot:[adj,opp]}[fn],cor=fr(I(v[0]),I(v[1]));
  const all=[[opp,'BC'],[adj,'BC'],[opp,adj],[adj,opp],['BC',opp]].map(p=>fr(I(p[0]),I(p[1])));
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}. Khẳng định nào sau đây đúng?`,correct:`${fn} ${I(ang)} = ${cor}`,wrongs:all.filter(x=>x!==cor).map(x=>`${fn} ${I(ang)} = ${x}`),
    sol:`Với góc nhọn ${ang}: cạnh đối là ${opp}, cạnh kề là ${adj}, cạnh huyền là BC. sin = đối/huyền, cos = kề/huyền, tan = đối/kề, cot = kề/đối.`,chk:()=>true});
});
N9('k9-11-val',4,'NB',[11],r=>{
  const fn=r.pick(['sin','cos','tan','cot']),a=r.pick([30,45,60]),v=tv10(fn,a),h=tvH(v);
  return mkTxt(r,{stem:`Giá trị của ${fn} ${a}° bằng`,correct:h,wrongs:SVAL.map(z=>z[0]).filter(x=>x!==h&&x!=='0'),sol:`Theo bảng tỉ số lượng giác của các góc đặc biệt: ${fn} ${a}° = ${h}.`,chk:()=>true});
});
N9('k9-11-comp',4,'TH',[11],r=>{
  const a=r.pick([10,15,20,25,35,40,50,55,65,70,75,80]),fn=r.pick(['sin','cos','tan','cot']),co={sin:'cos',cos:'sin',tan:'cot',cot:'tan'}[fn];
  return mkTxt(r,{stem:`Khẳng định nào sau đây đúng?`,correct:`${fn} ${a}° = ${co} ${90-a}°`,wrongs:[`${fn} ${a}° = ${fn} ${90-a}°`,`${fn} ${a}° = ${co} ${a}°`,`${fn} ${a}° = ${co} ${180-a}°`],
    sol:`Hai góc phụ nhau thì sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia: ${fn} ${a}° = ${co} ${90-a}°.`,chk:()=>a!==45});
});
N9('k9-11-calc',4,'TH',[11],r=>{
  const [p,q,h]=r.pick(PYT9),fn=r.pick(['sin','cos','tan','cot']),ang=r.pick(['B','C']),AB=p,AC=q,BC=h,opp=ang==='B'?AC:AB,adj=ang==='B'?AB:AC;
  const v={sin:Q(opp,BC),cos:Q(adj,BC),tan:Q(opp,adj),cot:Q(adj,opp)}[fn];
  return mkF(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm (hình vẽ).${fig9Right(AB,AC,{lens:[['A','B',AB+' cm'],['A','C',AC+' cm']]})}Giá trị của ${fn} ${I(ang)} bằng`,correct:v,cands:[Q(v[1],v[0]),Q(opp,adj),Q(adj,BC),Q(opp,BC),Q(adj,opp)],
    sol:`BC = √(${AB}² + ${AC}²) = ${BC} cm. ${fn} ${ang} = ${qh(v)}.`,chk:()=>p*p+q*q===h*h});
});

/* ===================== Bài 12: Hệ thức giữa cạnh và góc trong tam giác vuông ===================== */
N9('k9-12-side',4,'TH',[12],r=>{
  const a=r.pick([30,45,60]),BC=r.int(2,12)*2,t=r.int(0,1);/* góc B = a, cạnh huyền BC */
  const sv=svOf(Math.sin(a*Math.PI/180)),cv=svOf(Math.cos(a*Math.PI/180)),[ks,ms]=a===45?[1,2]:a===60?[1,3]:[1,1],[kc,mc]=a===45?[1,2]:a===30?[1,3]:[1,1];
  const hf=(k,m)=>m===1?String(BC*k/2):kr(BC/2,m);/* BC·(k√m)/2 */
  const cor=t?hf(kc,mc):hf(ks,ms),W=[t?hf(ks,ms):hf(kc,mc),String(BC),kr(BC,a===45?2:3),String(BC*2)].filter((x,i,A)=>x!==cor&&A.indexOf(x)===i);
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('BC')} = ${BC} cm và góc ${I('B')} = ${a}° (hình vẽ).${fig9Right(BC*Math.cos(a*Math.PI/180),BC*Math.sin(a*Math.PI/180),{lens:[['B','C',BC+' cm']],angs:[['C','B','A',a+'°']]})}Độ dài cạnh ${I(t?'AB':'AC')} bằng`,correct:`${cor} cm`,wrongs:W.concat([kr(BC/2,a===45?3:2)]).filter(x=>x!==cor).map(x=>`${x} cm`),
    sol:`${t?'AB = BC·cos B':'AC = BC·sin B'} = ${BC}·${t?cv[0]:sv[0]} = ${cor} (cm).`,chk:()=>true});
});
N9('k9-12-height',4,'VD',[12],r=>{
  for(;;){const d=r.int(10,40),a=r.int(25,60),h0=r.pick([0,1.5,1.6]),H=d*Math.tan(a*Math.PI/180)+h0,v=Math.round(H*10)/10;if(Math.abs(H*10-Math.round(H*10))>=.49)continue;
  return mkNum(r,{stem:`Từ một điểm cách chân tháp ${d} m${h0?` (mắt người quan sát cao ${fmt(h0)} m so với mặt đất)`:''}, người ta nhìn thấy đỉnh tháp với góc nâng ${a}°.${h0?'':fig9Pole(H,d,{ang:a+'°',d:d+' m'})}Chiều cao của tháp (làm tròn đến hàng phần mười của mét) là`,correct:v,f:x=>fmt(x)+' m',cands:[Math.round((d*Math.sin(a*Math.PI/180)+h0)*10)/10,Math.round((d/Math.tan(a*Math.PI/180)+h0)*10)/10,Math.round((d*Math.cos(a*Math.PI/180)+h0)*10)/10,v+1],
    sol:`Chiều cao phần trên tầm mắt: ${d}·tan ${a}° ≈ ${fmt(Math.round(d*Math.tan(a*Math.PI/180)*100)/100)} m${h0?`; cộng thêm ${fmt(h0)} m`:''}. Chiều cao tháp ≈ ${fmt(v)} m.`,chk:()=>true})}
});
DS9('ds9-12-tri',4,'TH',[11,12],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2),AB=p*k,AC=q*k,BC=h*k,AH=Q(AB*AC,BC);
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm (hình vẽ).${fig9Right(AB,AC,{lens:[['A','B',AB+' cm'],['A','C',AC+' cm']]})}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('BC')} = ${BC} cm.`,f:`${I('BC')} = ${AB+AC} cm.`,why:`BC = √(${AB}² + ${AC}²) = ${BC}.`},
    {t:`sin ${I('B')} = ${qh(Q(AC,BC))}.`,f:`sin ${I('B')} = ${qh(Q(AB,BC))}.`,why:`sin B = AC/BC.`},
    {t:`tan ${I('C')} = ${qh(Q(AB,AC))}.`,f:`tan ${I('C')} = ${qh(Q(AC,AB))}.`,why:`tan C = AB/AC.`},
    {t:`Góc ${I('B')} lớn hơn góc ${I('C')}.`,f:`Góc ${I('B')} nhỏ hơn góc ${I('C')}.`,why:`AC ${AC>AB?'>':'<'} AB nên góc B ${AC>AB?'>':'<'} góc C (cạnh đối diện lớn hơn thì góc lớn hơn).`}].map((it,i)=>i===3&&AC<AB?{t:it.f,f:it.t,why:it.why}:it),chk:()=>AB!==AC&&AH[1]>0});
});
TLN9('t9-12-height',4,'VD',[12],r=>{
  for(;;){const d=r.int(10,60),a=r.int(20,65),H=d*Math.tan(a*Math.PI/180),v=Math.round(H*10)/10;if(Math.abs(H*10-Math.round(H*10))>.45||v>=100)continue;
    return{kind:'tln',stem:`Bóng của một cột cờ trên mặt đất dài ${d} m, tia nắng mặt trời tạo với mặt đất một góc ${a}°. ${fig9Pole(H,d,{ang:a+'°',d:d+' m'})}Tính chiều cao của cột cờ (đơn vị: mét, làm tròn kết quả đến hàng phần mười).`,ans:v,unit:'m',sol:`Chiều cao h = ${d}·tan ${a}° ≈ ${fmt(v)} (m).`,chk:()=>true}}
});
TLN9('t9-12-angle',4,'VD',[11,12],r=>{
  for(;;){const L=r.int(3,8),h=r.int(10,L*10-5)/10,a=Math.asin(h/L)*180/Math.PI,v=Math.round(a);if(Math.abs(a-v)>.45||v<15||v>75)continue;
    return{kind:'tln',stem:`Một chiếc thang dài ${L} m dựng vào một bức tường thẳng đứng, đầu trên của thang chạm tường ở độ cao ${fmt(h)} m. ${fig9({A:[0,h],B:[0,0],C:[Math.sqrt(L*L-h*h),0]},{segs:[['A','B'],['B','C'],['A','C']],right:[['A','B','C']],angs:[['A','C','B','?']],lens:[['A','C',L+' m'],['A','B',fmt(h)+' m']],show:[],w:190,h:150})}Tính góc tạo bởi thang và mặt đất (đơn vị: độ, làm tròn kết quả đến hàng đơn vị).`,ans:v,unit:'°',sol:`sin α = ${fr(fmt(h),L)} ⇒ α ≈ ${v}°.`,chk:()=>true}}
});
TL9('tl9-12-tri',4,'TH','geo',[11,12],r=>{
  const a=r.pick([30,60]),BC=r.int(2,10)*2,AC=a===30?BC/2:null;
  const sB=svOf(Math.sin(a*Math.PI/180))[0],cB=svOf(Math.cos(a*Math.PI/180))[0];
  return{kind:'tl',title:'Giải tam giác vuông',parts:[{pts:.5,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('BC')} = ${BC} cm, góc ${I('B')} = ${a}°. Tính góc ${I('C')} và các cạnh ${I('AB')}, ${I('AC')}.`},{pts:.5,html:`Kẻ đường cao ${I('AH')}. Tính ${I('AH')} và diện tích tam giác ${I('ABC')}.`}],
    sol:[ptxt([[`Góc C = 90° − ${a}° = ${90-a}°.`,.25],[`AC = BC·sin B = ${BC}·${sB} = ${a===30?BC/2:kr(BC/2,3)} (cm); AB = BC·cos B = ${BC}·${cB} = ${a===30?kr(BC/2,3):BC/2} (cm).`,.25]]),
      ptxt([[`AH = AB·sin B = ${a===30?kr(BC/2,3):BC/2}·${sB} = ${kr(BC/4,3)} (cm).`.replace(/^(.*)$/,m=>m),.25],[`S = ½·AB·AC = ${fr(`${BC/2}·${kr(BC/2,3)}`,2)} = ${kr(BC*BC/8,3)} (cm²).`,.25]])],chk:()=>AC===null||AC===BC/2};
});
TL9('tl9-12-real',4,'VD','real',[12],r=>{
  for(;;){const d=r.int(20,80),a=r.int(30,45),b=r.int(a+8,70),H1=d*Math.tan(a*Math.PI/180),H2=d*Math.tan(b*Math.PI/180);
    return{kind:'tl',title:'Ứng dụng tỉ số lượng giác',parts:[
      {pts:.5,html:`Hai toà nhà đứng cạnh nhau, cách nhau ${d} m. Từ chân toà nhà thứ nhất nhìn lên nóc toà nhà thứ hai với góc nâng ${b}°. Tính chiều cao toà nhà thứ hai (làm tròn đến hàng phần mười của mét).`},
      {pts:.5,html:`Từ chân toà nhà thứ hai nhìn lên nóc toà nhà thứ nhất với góc nâng ${a}°. Toà nhà nào cao hơn và cao hơn bao nhiêu mét (làm tròn đến hàng phần mười)?`}],
      sol:[ptxt([[`Chiều cao toà nhà thứ hai: h₂ = ${d}·tan ${b}°.`,.25],[`h₂ ≈ ${fmt(Math.round(H2*10)/10)} m.`,.25]]),ptxt([[`h₁ = ${d}·tan ${a}° ≈ ${fmt(Math.round(H1*10)/10)} m.`,.25],[`Toà nhà thứ hai cao hơn khoảng ${fmt(Math.round((H2-H1)*10)/10)} m.`,.25]])],chk:()=>H2>H1}}
});

/* ===================== Bài 13 – 14: Mở đầu về đường tròn; cung và dây ===================== */
N9('k9-13-pos',5,'NB',[13],r=>{
  const R=r.int(3,10),d=r.pick([R-r.int(1,2),R,R+r.int(1,4)]),ans=d<R?'nằm bên trong':d===R?'nằm trên':'nằm bên ngoài';
  return mkTxt(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm) và điểm ${I('M')} với ${I('OM')} = ${d} cm. Khẳng định nào sau đây đúng?`,correct:`Điểm ${I('M')} ${ans} đường tròn.`,wrongs:['nằm bên trong','nằm trên','nằm bên ngoài'].filter(x=>x!==ans).map(x=>`Điểm ${I('M')} ${x} đường tròn.`).concat([`Điểm ${I('M')} trùng với tâm ${I('O')}.`]),
    sol:`So sánh OM với bán kính R = ${R}: OM ${d<R?'<':d===R?'=':'>'} R nên M ${ans} đường tròn.`,chk:()=>true});
});
N9('k9-13-sym',5,'NB',[13],r=>{
  const t=r.int(0,1);
  if(t)return mkTxt(r,{stem:'Khẳng định nào sau đây đúng?',correct:'Đường tròn có vô số trục đối xứng, mỗi đường thẳng đi qua tâm là một trục đối xứng.',wrongs:['Đường tròn có đúng một trục đối xứng.','Đường tròn có đúng hai trục đối xứng.','Đường tròn không có trục đối xứng.'],sol:'Mọi đường thẳng đi qua tâm đều là trục đối xứng của đường tròn.',chk:()=>true});
  const R=r.int(2,12);return mkNum(r,{stem:`Dây lớn nhất của đường tròn bán kính ${R} cm có độ dài là`,correct:2*R,f:x=>x+' cm',cands:[R,R*R,4*R,R+2],sol:`Dây lớn nhất là đường kính, có độ dài 2R = ${2*R} cm.`,chk:()=>true});
});
N9('k9-14-chord',5,'TH',[14],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2),R=h*k,half=q*k,d=p*k,ask=r.chance(.5);
  if(ask)return mkNum(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm) và dây ${I('AB')} = ${2*half} cm (hình vẽ).${fig9Chord(R,d)}Khoảng cách từ tâm ${I('O')} đến dây ${I('AB')} bằng`,correct:d,f:x=>x+' cm',cands:[half,R-half,R-d,2*d],
    sol:`Kẻ OH ⊥ AB thì H là trung điểm AB, AH = ${half} cm. OH = √(${R}² − ${half}²) = ${d} cm.`,chk:()=>R*R===half*half+d*d});
  return mkNum(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm), dây ${I('AB')} cách tâm ${I('O')} một khoảng bằng ${d} cm (hình vẽ).${fig9Chord(R,d)}Độ dài dây ${I('AB')} bằng`,correct:2*half,f:x=>x+' cm',cands:[half,2*(R-d),R+d,2*d],
    sol:`Kẻ OH ⊥ AB, OH = ${d}; AH = √(${R}² − ${d}²) = ${half}; AB = 2AH = ${2*half} cm.`,chk:()=>true});
});
N9('k9-14-arc',5,'NB',[14],r=>{
  const a=r.int(3,17)*10,ask=r.chance(.5);
  return mkNum(r,{stem:`Cho đường tròn (${I('O')}) và góc ở tâm ${I('AOB')} = ${a}°. Số đo cung ${ask?'lớn':'nhỏ'} ${I('AB')} là`,correct:ask?360-a:a,f:x=>x+'°',cands:[ask?a:360-a,180-a,a/2,2*a].filter(x=>x>0),
    sol:`Số đo cung nhỏ bằng số đo góc ở tâm chắn cung đó: ${a}°; số đo cung lớn bằng 360° − ${a}° = ${360-a}°.`,chk:()=>a<180});
});

/* ===================== Bài 15: Độ dài cung tròn, diện tích hình quạt, hình vành khuyên ===================== */
const piH=q=>q[0]===0?'0':`${q[1]===1?(q[0]===1?'':q[0]):''}${q[1]===1?'π':fr(`${q[0]===1?'':q[0]}π`,q[1])}`;
N9('k9-15-len',5,'TH',[15],r=>{
  const R=r.int(2,12),n=r.pick([30,45,60,72,90,120,135,150,180]),t=r.int(0,2);
  if(t===0){const v=Q(R*n,180);return mkTxt(r,{stem:`Độ dài cung tròn ${n}° của đường tròn bán kính ${R} cm là`,correct:`${piH(v)} cm`,wrongs:[piH(Q(R*R*n,360)),piH(Q(R*n,360)),piH(Q(2*R*n,180)),piH(Q(R*n,90)),piH(Q(R*n+R,180)),piH(Q(R*(n+30),180))].filter((x,i,A)=>x!==piH(v)&&A.indexOf(x)===i).map(x=>x+' cm'),sol:`l = ${fr('πRn',180)} = ${fr(`π·${R}·${n}`,180)} = ${piH(v)} (cm).`,chk:()=>true})}
  if(t===1){const v=Q(R*R*n,360);return mkTxt(r,{stem:`Diện tích hình quạt tròn bán kính ${R} cm, ứng với cung ${n}° là`,correct:`${piH(v)} cm²`,wrongs:[piH(Q(R*n,180)),piH(Q(R*R*n,180)),piH(Q(R*n,360)),piH(Q(R*R,1)),piH(Q(R*R*(n+30),360))].filter((x,i,A)=>x!==piH(v)&&A.indexOf(x)===i).map(x=>x+' cm²'),sol:`S = ${fr('πR²n',360)} = ${fr(`π·${R}²·${n}`,360)} = ${piH(v)} (cm²).`,chk:()=>true})}
  const r1=r.int(1,R-1),v=Q(R*R-r1*r1,1);
  return mkTxt(r,{stem:`Diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${R} cm và ${r1} cm là`,correct:`${piH(v)} cm²`,wrongs:[piH(Q((R-r1)**2,1)),piH(Q(R*R+r1*r1,1)),piH(Q(2*(R-r1),1))].filter(x=>x!==piH(v)).map(x=>x+' cm²').concat([`${piH(Q(R*R-r1*r1+1,1))} cm²`]),sol:`S = π(R² − r²) = π(${R*R} − ${r1*r1}) = ${piH(v)} (cm²).`,chk:()=>true});
});
DS9('ds9-15-circ',5,'TH',[14,15],r=>{
  const R=r.int(3,12),n=r.pick([60,90,120,150]),l=Q(R*n,180),S=Q(R*R*n,360);
  return mkDS(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm) và hai điểm ${I('A')}, ${I('B')} trên đường tròn sao cho góc ${I('AOB')} = ${n}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số đo cung nhỏ ${I('AB')} bằng ${n}°.`,f:`Số đo cung nhỏ ${I('AB')} bằng ${n/2}°.`,why:`Số đo cung nhỏ bằng số đo góc ở tâm.`},
    {t:`Số đo cung lớn ${I('AB')} bằng ${360-n}°.`,f:`Số đo cung lớn ${I('AB')} bằng ${180-n}°.`,why:`360° − ${n}° = ${360-n}°.`},
    {t:`Độ dài cung nhỏ ${I('AB')} bằng ${piH(l)} cm.`,f:`Độ dài cung nhỏ ${I('AB')} bằng ${piH(Q(R*n,360))} cm.`,why:`l = πRn/180 = ${piH(l)}.`},
    {t:`Diện tích hình quạt ${I('OAB')} (ứng với cung nhỏ) bằng ${piH(S)} cm².`,f:`Diện tích hình quạt ${I('OAB')} (ứng với cung nhỏ) bằng ${piH(Q(R*R*n,180))} cm².`,why:`S = πR²n/360 = ${piH(S)}.`}],chk:()=>true});
});
TLN9('t9-15-arc',5,'TH',[15],r=>{
  for(;;){const R=r.int(3,20),n=r.pick([30,45,60,72,90,120,135,150]),t=r.chance(.5),v=t?Math.PI*R*n/180:Math.PI*R*R*n/360,a=Math.round(v*10)/10;if(Math.abs(v*10-Math.round(v*10))>.45||a>=1000)continue;
    return{kind:'tln',stem:`Tính ${t?`độ dài cung tròn ${n}° của đường tròn`:`diện tích hình quạt tròn ứng với cung ${n}° của hình tròn`} bán kính ${R} cm (đơn vị: ${t?'cm':'cm²'}, làm tròn kết quả đến hàng phần mười).`,ans:a,unit:t?'cm':'cm²',sol:`${t?`l = πRn/180 = ${piH(Q(R*n,180))}`:`S = πR²n/360 = ${piH(Q(R*R*n,360))}`} ≈ ${fmt(a)}.`,chk:()=>true}}
});

/* ===================== Bài 16 – 17: Vị trí tương đối của đường thẳng và đường tròn, của hai đường tròn ===================== */
N9('k9-16-pos',5,'NB',[16],r=>{
  const R=r.int(3,10),d=r.pick([R-r.int(1,2),R,R+r.int(1,3)]),ans=d<R?'cắt nhau tại hai điểm phân biệt':d===R?'tiếp xúc nhau':'không giao nhau';
  return mkTxt(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm) và đường thẳng ${I('a')} cách tâm ${I('O')} một khoảng ${d} cm. Vị trí tương đối của ${I('a')} và (${I('O')}) là`,correct:ans,wrongs:['cắt nhau tại hai điểm phân biệt','tiếp xúc nhau','không giao nhau','cắt nhau tại ba điểm'].filter(x=>x!==ans),
    sol:`d = ${d} ${d<R?'<':d===R?'=':'>'} R = ${R} nên đường thẳng và đường tròn ${ans}.`,chk:()=>true});
});
N9('k9-16-tan',5,'TH',[16],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2),R=p*k,MA=q*k,OM=h*k,ask=r.int(0,1);
  if(ask)return mkNum(r,{stem:`Từ điểm ${I('M')} nằm ngoài đường tròn (${I('O')}; ${R} cm) với ${I('OM')} = ${OM} cm, kẻ tiếp tuyến ${I('MA')} (${I('A')} là tiếp điểm) như hình vẽ.${fig9Tan1(R,OM)}Độ dài ${I('MA')} bằng`,correct:MA,f:x=>x+' cm',cands:[OM-R,OM+R,R,MA+1],sol:`OA ⊥ MA nên MA = √(OM² − OA²) = √(${OM}² − ${R}²) = ${MA} cm.`,chk:()=>OM*OM===R*R+MA*MA});
  return mkNum(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm). Tiếp tuyến tại ${I('A')} của đường tròn cắt đường thẳng đi qua ${I('O')} tại ${I('M')} sao cho ${I('MA')} = ${MA} cm.${fig9Tan1(R,OM)}Độ dài ${I('OM')} bằng`,correct:OM,f:x=>x+' cm',cands:[MA+R,MA-R,MA,OM+1].filter(x=>x>0),sol:`OA ⊥ MA nên OM = √(OA² + MA²) = √(${R}² + ${MA}²) = ${OM} cm.`,chk:()=>true});
});
N9('k9-17-pos',5,'TH',[17],r=>{
  const R=r.int(5,10),rr=r.int(1,R-3),t=r.int(0,4),d=[R+rr+r.int(1,3),R+rr,r.int(R-rr+1,R+rr-1),R-rr,r.int(1,R-rr-1)][t];
  const ans=['ở ngoài nhau','tiếp xúc ngoài','cắt nhau','tiếp xúc trong','đường tròn nhỏ nằm trong đường tròn lớn'][t];if(t===4&&d===R-rr)return T.nlc['k9-17-pos'].gen(r);
  return mkTxt(r,{stem:`Cho hai đường tròn (${I('O')}; ${R} cm) và (${I('O′')}; ${rr} cm) với ${I('OO′')} = ${d} cm. Vị trí tương đối của hai đường tròn là`,correct:ans,wrongs:['ở ngoài nhau','tiếp xúc ngoài','cắt nhau','tiếp xúc trong','đường tròn nhỏ nằm trong đường tròn lớn'].filter(x=>x!==ans).slice(0,4),
    sol:`R + r = ${R+rr}, R − r = ${R-rr}; OO′ = ${d} nên ${t===4?'đường tròn (O′) nằm trong đường tròn (O)':'hai đường tròn '+ans}.`,chk:()=>true});
});
DS9('ds9-16-tan',5,'VD',[16],r=>{
  const [p,q,h]=r.pick(PYT9),R=p,MA=q,OM=h,AB=Q(2*MA*R,OM);
  return mkDS(r,{stem:`Từ điểm ${I('M')} nằm ngoài đường tròn (${I('O')}; ${R} cm) với ${I('OM')} = ${OM} cm, kẻ hai tiếp tuyến ${I('MA')}, ${I('MB')} (${I('A')}, ${I('B')} là các tiếp điểm).${fig9Tan(R,OM,{ab:true})}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('MA')} = ${I('MB')} = ${MA} cm.`,f:`${I('MA')} = ${I('MB')} = ${OM-R} cm.`,why:`MA = √(OM² − R²) = ${MA}; hai tiếp tuyến cắt nhau thì MA = MB.`},
    {t:`${I('MO')} là tia phân giác của góc ${I('AMB')}.`,f:`${I('MA')} là tia phân giác của góc ${I('OMB')}.`,why:`Tính chất hai tiếp tuyến cắt nhau.`},
    {t:`${I('OM')} vuông góc với ${I('AB')}.`,f:`${I('OM')} song song với ${I('AB')}.`,why:`OA = OB, MA = MB nên OM là đường trung trực của AB.`},
    {t:`${I('AB')} = ${qh(AB)} cm.`,f:`${I('AB')} = ${qh(Q(MA*R,OM))} cm.`,why:`Gọi H là giao điểm của OM và AB: AH = ${fr('MA·OA','OM')} = ${qh(Q(MA*R,OM))}, AB = 2AH = ${qh(AB)}.`}],chk:()=>OM*OM===R*R+MA*MA});
});
TLN9('t9-16-tan',5,'VD',[16],r=>{
  for(;;){const [p,q,h]=r.pick(PYT9),k=r.int(1,2),R=p*k,MA=q*k,OM=h*k,AB=2*MA*R/OM,ask=r.chance(.5),v=ask?Math.round(AB*100)/100:MA*R;if(ask&&Math.abs(AB*100-Math.round(AB*100))>.45)continue;
    return{kind:'tln',stem:`Từ điểm ${I('M')} nằm ngoài đường tròn (${I('O')}; ${R} cm) với ${I('OM')} = ${OM} cm, kẻ hai tiếp tuyến ${I('MA')}, ${I('MB')} (${I('A')}, ${I('B')} là các tiếp điểm).${fig9Tan(R,OM,{ab:ask})}Tính ${ask?`độ dài dây ${I('AB')} (đơn vị: cm, làm tròn kết quả đến hàng phần trăm)`:`diện tích tứ giác ${I('OAMB')} (đơn vị: cm²)`}.`,ans:v,unit:ask?'cm':'cm²',
      sol:`MA = √(${OM}² − ${R}²) = ${MA}. ${ask?`AB ⊥ OM tại H, AH = ${fr('MA·OA','OM')}; AB = 2AH = ${qh(Q(2*MA*R,OM))} ≈ ${fmt(v)}`:`S = 2S${sub('OAM')} = 2·½·OA·MA = ${MA*R}`}.`,chk:()=>true}}
});
TL9('tl9-16-tan',5,'VD','geo',[16],r=>{
  const [p,q,h]=r.pick(PYT9),R=p,MA=q,OM=h,AH=Q(MA*R,OM),OH=Q(R*R,OM);
  return{kind:'tl',title:'Tiếp tuyến của đường tròn',parts:[
    {pts:.5,html:`Từ điểm ${I('M')} nằm ngoài đường tròn (${I('O')}; ${R} cm) với ${I('OM')} = ${OM} cm, kẻ hai tiếp tuyến ${I('MA')}, ${I('MB')} với đường tròn (${I('A')}, ${I('B')} là các tiếp điểm). Tính ${I('MA')} và chứng minh ${I('OM')} ⊥ ${I('AB')}.`},
    {pts:.5,html:`Gọi ${I('H')} là giao điểm của ${I('OM')} và ${I('AB')}. Tính ${I('OH')} và độ dài dây ${I('AB')}.`}],
    sol:[ptxt([[`OA ⊥ MA nên MA = √(OM² − OA²) = √(${OM*OM} − ${R*R}) = ${MA} (cm).`,.25],[`MA = MB, OA = OB nên OM là đường trung trực của AB, do đó OM ⊥ AB.`,.25]]),
      ptxt([[`Trong tam giác OAM vuông tại A, đường cao AH: OA² = OH·OM ⇒ OH = ${fr(R*R,OM)} = ${qh(OH)} (cm).`,.25],[`AH = ${fr('OA·MA','OM')} = ${qh(AH)}; AB = 2AH = ${qh(Q(2*MA*R,OM))} (cm).`,.25]])],chk:()=>OM*OM===R*R+MA*MA};
});
TL9('tl9-14-chord',5,'VD','geo',[13,14,15],r=>{
  const [p,q,h]=r.pick(PYT9),R=h,half=q,d=p,n=r.pick([60,90,120]);
  return{kind:'tl',title:'Dây và cung của đường tròn',parts:[
    {pts:.5,html:`Cho đường tròn (${I('O')}; ${R} cm) và dây ${I('AB')} = ${2*half} cm. Tính khoảng cách từ ${I('O')} đến dây ${I('AB')}.`},
    {pts:.5,html:`Lấy hai điểm ${I('C')}, ${I('D')} trên đường tròn sao cho góc ${I('COD')} = ${n}°. Tính độ dài cung nhỏ ${I('CD')} và diện tích hình quạt tròn ${I('OCD')} ứng với cung nhỏ đó.`}],
    sol:[ptxt([[`Kẻ OH ⊥ AB thì H là trung điểm của AB, AH = ${half} cm.`,.25],[`OH = √(OA² − AH²) = √(${R*R} − ${half*half}) = ${d} (cm).`,.25]]),
      ptxt([[`Độ dài cung nhỏ CD: l = ${fr(`π·${R}·${n}`,180)} = ${piH(Q(R*n,180))} (cm).`,.25],[`Diện tích hình quạt: S = ${fr(`π·${R}²·${n}`,360)} = ${piH(Q(R*R*n,360))} (cm²).`,.25]])],chk:()=>R*R===half*half+d*d};
});
TL9('tl9-16-two',5,'VDC','geo',[16,17],r=>{
  const [p,q,h]=r.pick(PYT9),R=p,MA=q,OM=h,ME=OM-R;
  return{kind:'tl',title:'Tiếp tuyến và cát tuyến',parts:[
    {pts:.5,html:`Cho đường tròn (${I('O')}; ${R} cm) và điểm ${I('M')} với ${I('OM')} = ${OM} cm. Kẻ tiếp tuyến ${I('MA')} (${I('A')} là tiếp điểm); đoạn ${I('OM')} cắt đường tròn tại ${I('E')}. Tính ${I('MA')}, ${I('ME')}.`},
    {pts:.5,html:`Đường thẳng ${I('MO')} cắt đường tròn tại điểm thứ hai ${I('F')}. Chứng minh ${I('MA')}${sup(2)} = ${I('ME')}·${I('MF')} và kiểm tra lại bằng số liệu đã cho.`}],
    sol:[ptxt([[`MA = √(OM² − OA²) = ${MA} (cm).`,.25],[`ME = OM − OE = ${OM} − ${R} = ${ME} (cm).`,.25]]),
      ptxt([[`EF là đường kính nên góc EAF = 90°; góc MAE = góc AFE (cùng phụ với góc OAE vì OA = OE và OA ⊥ MA), suy ra tam giác MAE đồng dạng tam giác MFA (g.g), do đó ${fr('MA','MF')} = ${fr('ME','MA')} ⇒ MA² = ME·MF.`,.25],[`Kiểm tra: MA² = ${MA*MA}; ME·MF = ${ME}·${OM+R} = ${ME*(OM+R)}.`,.25]])],chk:()=>MA*MA===ME*(OM+R)};
});
TL9('tl9-9-max',3,'VDC','rad',[9],r=>{
  const a=r.int(1,4),b=r.int(1,6);/* P = (√x + b)/(√x + a)... dùng A = √x + a/(√x) ≥ 2√a? chọn: tìm số nguyên x để B = (√x + a + b)/(√x + a) = 1 + b/(√x + a) nguyên */
  const xs=[];for(let s=0;s<=50;s++){const x=s*s;if(b%(s+a)===0)xs.push(x)}
  return{kind:'tl',title:'Biểu thức chứa căn: giá trị nguyên',parts:[
    {pts:.5,html:`Cho biểu thức ${I('B')} = ${fr(`${rt(I('x'))} + ${a+b}`,`${rt(I('x'))} + ${a}`)} với ${I('x')} ≥ 0. Chứng minh ${I('B')} > 1 với mọi ${I('x')} ≥ 0 và tìm giá trị lớn nhất của ${I('B')}.`},
    {pts:.5,html:`Tìm tất cả các số chính phương ${I('x')} để ${I('B')} nhận giá trị nguyên.`}],
    sol:[ptxt([[`B = 1 + ${fr(b,`√x + ${a}`)} > 1 vì ${b} > 0 và √x + ${a} > 0.`,.25],[`√x + ${a} ≥ ${a} nên B ≤ 1 + ${fr(b,a)} = ${qh(Q(a+b,a))}; dấu "=" khi x = 0. GTLN của B là ${qh(Q(a+b,a))}.`,.25]]),
      ptxt([[`x chính phương thì √x là số tự nhiên; B nguyên ⟺ √x + ${a} là ước dương của ${b}, và √x + ${a} ≥ ${a}.`,.25],[`${xs.length?`Các giá trị: x ∈ {${xs.join('; ')}}`:'Không có giá trị nào thoả mãn'}.`,.25]])],chk:()=>true};
});
