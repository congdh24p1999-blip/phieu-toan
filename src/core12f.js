/* ================================================================
   LỚP 12 – học kì II. Chương IV: Nguyên hàm và tích phân (Bài 11 – 13)
   ================================================================ */
const N12b=(id,ch,lv,les,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:12,hk:2,les,sec});
const DS12b=(id,ch,lv,les,gen,sec)=>reg('ds',id,ch,lv,gen,{g:12,hk:2,les,sec});
const TLN12b=(id,ch,lv,les,gen,sec)=>reg('tln',id,ch,lv,gen,{g:12,hk:2,les,sec});
const TL12b=(id,ch,lv,role,les,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:12,hk:2,les,sec});
/* Kí hiệu tích phân: ig(null,null,…) là nguyên hàm; ig(a,b,…) là tích phân từ a đến b */
const igB=v=>typeof v==='number'?sg(v):v;
const ig=(lo,hi,body)=>(lo=igB(lo),hi=igB(hi),lo===null)?`<span class="ig"><span class="is">∫</span><span class="ie">${body}</span></span>`:`<span class="ig"><span class="is">∫</span><span class="ib"><small>${hi}</small><small>${lo}</small></span><span class="ie">${body}</span></span>`;
const DX=` d${I('x')}`,DT=` d${I('t')}`,PLUSC=` + ${I('C')}`;
const EX=v=>`${I('e')}${sup(v===undefined?I('x'):v)}`;
const PI='π';
const dsx=v=>String(v).replace('.',',').replace('-',MINUS);
/* đa thức hệ số hữu tỉ (Q), bậc cao → thấp */
function qpoly(qs,v='x'){let s='';const n=qs.length-1;
  qs.forEach((q0,i)=>{const q=Array.isArray(q0)?q0:Q(q0),e=n-i;if(!q[0])return;const ab=Q(Math.abs(q[0]),q[1]),one=ab[0]===1&&ab[1]===1;
    const c=(one&&e>0?'':ab[1]===1?String(ab[0]):fr(ab[0],ab[1]))+(e>0?I(v)+(e>1?sup(e):''):'');
    s+=s===''?(q[0]<0?MINUS:'')+c:(q[0]<0?` ${MINUS} `:' + ')+c});return s||'0'}
/* nguyên hàm của đa thức nguyên (hằng số 0) */
const pint=cs=>{const n=cs.length-1;return cs.map((c,i)=>Q(c,n-i+1)).concat([Q(0)])};
const qpev=(qs,x)=>qs.reduce((s,q)=>qadd(qmul(s,Q(x)),q),Q(0));
const pdefQ=(cs,a,b)=>{const F=pint(cs);return qsub(qpev(F,b),qpev(F,a))};
const numInt=(f,a,b,N=2000)=>{let s=0;const h=(b-a)/N;for(let i=0;i<N;i++){const x=a+(i+.5)*h;s+=f(x)}return s*h};
const qfmt=q=>q[1]===1?sg(q[0]):(q[0]<0?MINUS:'')+fr(Math.abs(q[0]),q[1]);
const qh2=q=>{const v=qv(q);return isInt(v)?sg(v):qfmt(q)};
const qpi=q=>{/* q·π */const a=Math.abs(q[0]),s=q[0]<0?MINUS:'';return q[1]===1?s+(a===1?'':a)+PI:s+fr((a===1?'':a)+PI,q[1])};
const randPoly=(r,deg,lo=-5,hi=5)=>{for(;;){const cs=[r.nz(lo,hi)].concat([...Array(deg)].map(()=>r.int(lo,hi)));if(cs.filter(c=>c).length>=2)return cs}};

/* ===================== Bài 11: Nguyên hàm ===================== */
N12b('k12-11-poly',4,'NB',[11],r=>{
  const cs=randPoly(r,r.pick([2,3])),F=pint(cs),d=pder(cs);
  const cor=qpoly(F)+PLUSC,W=[qpoly(d)+PLUSC,qpoly(cs.map(c=>Q(c)).concat([Q(0)]))+PLUSC,qpoly(F),qpoly([qmul(F[0],Q(-1))].concat(F.slice(1)))+PLUSC];
  return mkTxt(r,{stem:`Họ tất cả các nguyên hàm của hàm số ${FX} = ${P3(cs)} là`,correct:cor,wrongs:uniqBy(W,x=>x).filter(w=>w!==cor),
    sol:`Dùng ${ig(null,null,I('x')+sup('α')+DX)} = ${fr(I('x')+sup('α + 1'),'α + 1')}${PLUSC} và tính chất của nguyên hàm: ${ig(null,null,`(${P3(cs)})${DX}`)} = ${cor}.`,
    chk:()=>{const d2=pder(F.map(qv));return d2.every((c,i)=>Math.abs(c-cs[i])<1e-9)}});
});
/* bảng nguyên hàm cơ bản: [f, F đúng, các F sai] */
const BASIC_INT=[
  ()=>[`cos ${I('x')}`,`sin ${I('x')}`,[`${MINUS}sin ${I('x')}`,`${MINUS}cos ${I('x')}`,`cos ${I('x')}`]],
  ()=>[`sin ${I('x')}`,`${MINUS}cos ${I('x')}`,[`cos ${I('x')}`,`${MINUS}sin ${I('x')}`,`sin ${I('x')}`]],
  ()=>[EX(),EX(),[`${I('x')}${I('e')}${sup(I('x')+' − 1')}`,`${EX()} ln ${I('x')}`,fr(EX(I('x')+' + 1'),I('x')+' + 1')]],
  a=>[`${a}${sup(I('x'))}`,fr(`${a}${sup(I('x'))}`,`ln ${a}`),[`${a}${sup(I('x'))} ln ${a}`,fr(`${a}${sup(I('x')+' + 1')}`,`${I('x')} + 1`),`${I('x')}·${a}${sup(I('x')+' − 1')}`]],
  ()=>[fr(1,I('x')),`ln|${I('x')}|`,[`${MINUS}${fr(1,I('x')+sup(2))}`,`ln ${I('x')}`,fr(1,I('x')+sup(2))]],
  ()=>[fr(1,`cos${sup(2)} ${I('x')}`),`tan ${I('x')}`,[`${MINUS}tan ${I('x')}`,`cot ${I('x')}`,`${MINUS}cot ${I('x')}`]],
  ()=>[fr(1,`sin${sup(2)} ${I('x')}`),`${MINUS}cot ${I('x')}`,[`cot ${I('x')}`,`tan ${I('x')}`,`${MINUS}tan ${I('x')}`]],
  ()=>[rt(I('x')),`${fr(2,3)}${I('x')}${rt(I('x'))}`,[fr(1,`2${rt(I('x'))}`),`${fr(3,2)}${I('x')}${rt(I('x'))}`,`${I('x')}${rt(I('x'))}`]],
  ()=>[fr(1,I('x')+sup(2)),`${MINUS}${fr(1,I('x'))}`,[fr(1,I('x')),`${MINUS}${fr(2,I('x')+sup(3))}`,`ln ${I('x')}${sup(2)}`]]
];
N12b('k12-11-basic',4,'NB',[11],r=>{
  const k=r.int(0,BASIC_INT.length-1),[f,F,W]=BASIC_INT[k](r.pick([2,3,5,7]));
  return mkTxt(r,{stem:`${ig(null,null,f+DX)} bằng`,correct:F+PLUSC,wrongs:W.map(w=>w+PLUSC),
    sol:`Theo bảng nguyên hàm của một số hàm số thường gặp: ${ig(null,null,f+DX)} = ${F}${PLUSC}. (Kiểm tra lại: đạo hàm của ${F} bằng ${f}.)`,chk:()=>true});
});
N12b('k12-11-check',4,'NB',[11],r=>{
  const cs=randPoly(r,2),F=pint(cs),c=r.nz(-5,5),Fc=F.slice(0,-1).concat([Q(c)]),d=pder(cs);
  const cor=qpoly(Fc),W=[qpoly([qmul(Fc[0],Q(-1))].concat(Fc.slice(1))),qpoly([Fc[0],qmul(Fc[1],Q(2)),Fc[2],Fc[3]]),qpoly(d),qpoly(F.map((q,i)=>i===0?qmul(q,Q(3)):q).slice(0,-1).concat([Q(c)])),qpoly(cs.map(c=>Q(c)).concat([Q(c)]))];
  return mkTxt(r,{stem:`Hàm số nào dưới đây là một nguyên hàm của hàm số ${FX} = ${P3(cs)}?`,correct:`${I('F')}(${I('x')}) = ${cor}`,wrongs:uniqBy(W,x=>x).filter(w=>w!==cor).map(w=>`${I('F')}(${I('x')}) = ${w}`),
    sol:`${I('F')} là một nguyên hàm của ${I('f')} khi ${I('F')}′(${I('x')}) = ${FX}. Ta có (${cor})′ = ${P3(cs)}.`,chk:()=>pder(Fc.map(qv)).every((v,i)=>Math.abs(v-cs[i])<1e-9)});
});
N12b('k12-11-mix',4,'TH',[11],r=>{
  const a=r.nz(-4,4),b=r.nz(-4,4),k=r.int(0,3);
  const T11=[
    [`${coefV(a,EX())} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}cos ${I('x')}`,`${coefV(a,EX())} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}sin ${I('x')}`,[`${coefV(a,EX())} ${b<0?'+':MINUS} ${Math.abs(b)===1?'':Math.abs(b)}sin ${I('x')}`,`${coefV(a,I('x')+EX())} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}sin ${I('x')}`,`${coefV(a,EX())} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}cos ${I('x')}`]],
    [`${coefV(a,`sin ${I('x')}`)} ${b<0?MINUS:'+'} ${fr(Math.abs(b),I('x'))}`,`${coefV(-a,`cos ${I('x')}`)} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}ln|${I('x')}|`,[`${coefV(a,`cos ${I('x')}`)} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}ln|${I('x')}|`,`${coefV(-a,`cos ${I('x')}`)} ${b<0?'+':MINUS} ${fr(Math.abs(b),I('x')+sup(2))}`,`${coefV(-a,`cos ${I('x')}`)} ${b<0?MINUS:'+'} ${fr(Math.abs(b),I('x')+sup(2))}`]],
    [`${coefV(a,I('x')+sup(2))} ${b<0?MINUS:'+'} ${fr(Math.abs(b),`cos${sup(2)} ${I('x')}`)}`,`${qpoly([Q(a,3),0,0,0])} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}tan ${I('x')}`,[`${qpoly([Q(a,3),0,0,0])} ${b<0?'+':MINUS} ${Math.abs(b)===1?'':Math.abs(b)}tan ${I('x')}`,`${coefV(2*a,I('x'))} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}tan ${I('x')}`,`${qpoly([Q(a,3),0,0,0])} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}cot ${I('x')}`]],
    [`${a===1?'':a===-1?MINUS:sg(a)+'·'}3${sup(I('x'))} ${b<0?MINUS:'+'} ${Math.abs(b)===1?'':Math.abs(b)}${I('x')}`,`${a<0?MINUS:''}${fr(`${Math.abs(a)===1?'':Math.abs(a)}·3${sup(I('x'))}`,'ln 3')} ${b<0?MINUS:'+'} ${qpoly([Q(Math.abs(b),2),0,0]).replace(/^/,'')}`,[`${a===1?'':a===-1?MINUS:sg(a)+'·'}3${sup(I('x'))}·ln 3 ${b<0?MINUS:'+'} ${qpoly([Q(Math.abs(b),2),0,0])}`,`${a<0?MINUS:''}${fr(`${Math.abs(a)===1?'':Math.abs(a)}·3${sup(I('x'))}`,'ln 3')} ${b<0?MINUS:'+'} ${Math.abs(b)}`,`${a<0?MINUS:''}${fr(`${Math.abs(a)===1?'':Math.abs(a)}·3${sup(I('x')+' + 1')}`,I('x')+' + 1')} ${b<0?MINUS:'+'} ${qpoly([Q(Math.abs(b),2),0,0])}`]]
  ][k];
  return mkTxt(r,{stem:`${ig(null,null,`(${T11[0]})${DX}`)} bằng`,correct:T11[1]+PLUSC,wrongs:T11[2].map(w=>w+PLUSC),
    sol:`Áp dụng tính chất ${ig(null,null,`[${I('k')}${I('f')}(${I('x')}) + ${I('l')}${I('g')}(${I('x')})]${DX}`)} = ${I('k')}${ig(null,null,FX+DX)} + ${I('l')}${ig(null,null,`${I('g')}(${I('x')})${DX}`)} và bảng nguyên hàm, ta được ${T11[1]}${PLUSC}.`,chk:()=>true});
});
N12b('k12-11-init',4,'TH',[11],r=>{
  const cs=randPoly(r,2,-4,4),F0=pint(cs),x0=r.int(-2,2),v0=r.int(-5,5),C=qsub(Q(v0),qpev(F0,x0)),Fc=F0.slice(0,-1).concat([C]),x1=r.pick([-1,1,2,3].filter(x=>x!==x0)),ans=qpev(Fc,x1);
  return mkF(r,{stem:`Biết ${I('F')}(${I('x')}) là một nguyên hàm của hàm số ${FX} = ${P3(cs)} và ${I('F')}(${sg(x0)}) = ${sg(v0)}. Giá trị của ${I('F')}(${sg(x1)}) bằng`,correct:ans,
    cands:[qpev(F0,x1),qadd(ans,Q(v0)),qsub(ans,Q(2*v0||1)),Q(pev(pder(cs),x1))],
    sol:`${I('F')}(${I('x')}) = ${qpoly(F0)}${PLUSC}; ${I('F')}(${sg(x0)}) = ${sg(v0)} ⟹ ${I('C')} = ${qh2(C)}. Vậy ${I('F')}(${sg(x1)}) = ${qh2(ans)}.`,chk:()=>qv(qpev(Fc,x0))===v0});
});
N12b('k12-11-trig',4,'TH',[11],r=>{
  const k=r.int(0,2),a=r.int(1,4);
  const T11=[[`tan${sup(2)} ${I('x')}`,`tan ${I('x')} ${MINUS} ${I('x')}`,[`tan ${I('x')} + ${I('x')}`,fr(`tan${sup(3)} ${I('x')}`,3),`${I('x')} ${MINUS} tan ${I('x')}`],`tan²x = ${fr(1,'cos²x')} − 1`],
    [`cot${sup(2)} ${I('x')}`,`${MINUS}cot ${I('x')} ${MINUS} ${I('x')}`,[`cot ${I('x')} ${MINUS} ${I('x')}`,`${MINUS}cot ${I('x')} + ${I('x')}`,fr(`cot${sup(3)} ${I('x')}`,3)],`cot²x = ${fr(1,'sin²x')} − 1`],
    [`${a===1?'':a}sin${sup(2)} ${fr(I('x'),2)}`,`${fr(a,2)}(${I('x')} ${MINUS} sin ${I('x')})`,[`${fr(a,2)}(${I('x')} + sin ${I('x')})`,`${fr(a,2)}(${I('x')} ${MINUS} cos ${I('x')})`,`${a===1?'':a}cos${sup(2)} ${fr(I('x'),2)}`],`sin²(x/2) = ${fr('1 − cos x',2)}`]][k];
  return mkTxt(r,{stem:`${ig(null,null,T11[0]+DX)} bằng`,correct:T11[1]+PLUSC,wrongs:T11[2].map(w=>w+PLUSC),sol:`Biến đổi ${T11[3]} rồi dùng bảng nguyên hàm: kết quả ${T11[1]}${PLUSC}.`,chk:()=>true});
});
DS12b('ds12-11-poly',4,'TH',[11],r=>{
  const cs=randPoly(r,2,-6,6),F0=pint(cs),v0=r.nz(-5,5),Fc=F0.slice(0,-1).concat([Q(v0)]),x1=r.pick([1,2,-1]),F1=qpev(Fc,x1);
  return mkDS(r,{stem:`Cho hàm số ${FX} = ${P3(cs)}. Gọi ${I('F')}(${I('x')}) là nguyên hàm của ${FX} thoả mãn ${I('F')}(0) = ${sg(v0)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('F')}′(${I('x')}) = ${P3(cs)}.`,f:`${I('F')}′(${I('x')}) = ${P3(pder(cs))}.`,why:`${I('F')} là nguyên hàm của ${I('f')} nên ${I('F')}′(${I('x')}) = ${FX}.`},
    {t:`${ig(null,null,FX+DX)} = ${qpoly(F0)}${PLUSC}.`,f:`${ig(null,null,FX+DX)} = ${P3(pder(cs))}${PLUSC}.`,why:`Nguyên hàm từng hạng tử theo công thức x<sup>α</sup> → ${fr('x<sup>α+1</sup>','α + 1')}.`},
    {t:`${I('F')}(${I('x')}) = ${qpoly(Fc)}.`,f:`${I('F')}(${I('x')}) = ${qpoly(F0)}.`,why:`F(x) = ${qpoly(F0)}${PLUSC}, F(0) = C = ${sg(v0)}.`},
    {t:`${I('F')}(${sg(x1)}) = ${qh2(F1)}.`,f:`${I('F')}(${sg(x1)}) = ${qh2(qadd(F1,Q(r.pick([1,-1,2]))))}.`,why:`Thay x = ${sg(x1)} vào F(x): ${qh2(F1)}.`}],
    chk:()=>v0!==0&&pder(cs).length!==cs.length});
});
DS12b('ds12-11-mix',4,'NB',[11],r=>{
  const a=r.nz(-4,4),b=r.int(2,5),m=r.pick([2,3,5]);
  return mkDS(r,{stem:`Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${ig(null,null,`${a===1?'':a===-1?MINUS:sg(a)}cos ${I('x')}${DX}`)} = ${coefV(a,`sin ${I('x')}`)}${PLUSC}.`,f:`${ig(null,null,`${a===1?'':a===-1?MINUS:sg(a)}cos ${I('x')}${DX}`)} = ${coefV(-a,`sin ${I('x')}`)}${PLUSC}.`,why:`${ig(null,null,`cos ${I('x')}${DX}`)} = sin x + C.`},
    {t:`${ig(null,null,`${m}${sup(I('x'))}${DX}`)} = ${fr(`${m}${sup(I('x'))}`,`ln ${m}`)}${PLUSC}.`,f:`${ig(null,null,`${m}${sup(I('x'))}${DX}`)} = ${m}${sup(I('x'))} ln ${m}${PLUSC}.`,why:`${ig(null,null,`${I('a')}${sup(I('x'))}${DX}`)} = ${fr(`${I('a')}${sup(I('x'))}`,'ln a')}${PLUSC}.`},
    {t:`${ig(null,null,`${fr(b,I('x'))}${DX}`)} = ${b}ln|${I('x')}|${PLUSC}.`,f:`${ig(null,null,`${fr(b,I('x'))}${DX}`)} = ${MINUS}${fr(b,I('x')+sup(2))}${PLUSC}.`,why:`${ig(null,null,`${fr(1,I('x'))}${DX}`)} = ln|x| + C.`},
    {t:`${ig(null,null,`${fr(1,`sin${sup(2)} ${I('x')}`)}${DX}`)} = ${MINUS}cot ${I('x')}${PLUSC}.`,f:`${ig(null,null,`${fr(1,`sin${sup(2)} ${I('x')}`)}${DX}`)} = cot ${I('x')}${PLUSC}.`,why:`(−cot x)′ = ${fr(1,'sin²x')}.`}],
    chk:()=>a!==0});
});
TLN12b('t12-11-init',4,'VD',[11],r=>{
  for(;;){const cs=randPoly(r,2,-4,4),F0=pint(cs),x0=r.int(-2,2),v0=r.int(-5,5),C=qsub(Q(v0),qpev(F0,x0)),Fc=F0.slice(0,-1).concat([C]),x1=r.pick([-2,-1,1,2,3].filter(x=>x!==x0)),ans=qv(qpev(Fc,x1));
    if(!isInt(ans*100)||Math.abs(ans)>999)continue;
    return{kind:'tln',stem:`Cho hàm số ${YF} có ${FPX} = ${P3(cs)} với mọi ${I('x')} ∈ ℝ và ${I('f')}(${sg(x0)}) = ${sg(v0)}. Tính ${I('f')}(${sg(x1)}).`,ans,unit:'',
      sol:`${FX} là một nguyên hàm của ${P3(cs)}: ${FX} = ${qpoly(F0)}${PLUSC}. Từ ${I('f')}(${sg(x0)}) = ${sg(v0)} suy ra C = ${qh2(C)}. Vậy ${I('f')}(${sg(x1)}) = ${fmt(ans)}.`,chk:()=>qv(qpev(Fc,x0))===v0}}
});
TLN12b('t12-11-bullet',4,'VD',[11],r=>{
  const v0=r.pick([100,120,150,160,196]),g=9.8,t1=r.int(3,8),ask=r.chance(.5);
  const h1=Math.round((v0*t1-g/2*t1*t1)*10)/10,tm=v0/g,hm=Math.round((v0*tm-g/2*tm*tm)*10)/10;
  return{kind:'tln',stem:`Một viên đạn được bắn thẳng đứng lên trên từ mặt đất. Vận tốc của viên đạn tại thời điểm ${I('t')} giây là ${I('v')}(${I('t')}) = ${v0} ${MINUS} 9,8${I('t')} (m/s). ${ask?`Tính độ cao của viên đạn sau ${t1} giây (đơn vị: mét, làm tròn đến hàng phần mười).`:`Tính độ cao lớn nhất của viên đạn (đơn vị: mét, làm tròn đến hàng phần mười).`}`,ans:ask?h1:hm,unit:'m',
    sol:`Độ cao h(t) là nguyên hàm của v(t) với h(0) = 0: h(t) = ${v0}t − 4,9t². ${ask?`h(${t1}) = ${fmt(h1)} (m).`:`h đạt lớn nhất khi v(t) = 0 ⟺ t = ${fr(v0,'9,8')}; h<sub>max</sub> ≈ ${fmt(hm)} (m).`}`,chk:()=>true};
});
TL12b('tl12-11-anti',4,'TH','a',[11],r=>{
  const cs=randPoly(r,2,-5,5),F0=pint(cs),a=r.nz(-3,3),x0=0,v0=r.int(-4,4);
  /* f(x) = a·e^x + đa thức; F(0) = v0 ⟹ C = v0 − a */
  const C=v0-a;
  return{kind:'tl',title:'Nguyên hàm',parts:[
    {pts:.5,html:`Tìm ${ig(null,null,`(${P3(cs)})${DX}`)}.`},
    {pts:.5,html:`Tìm nguyên hàm ${I('F')}(${I('x')}) của hàm số ${FX} = ${coefV(a,EX())}${plusH(P3(cs))} thoả mãn ${I('F')}(0) = ${sg(v0)}.`}],
    sol:[ptxt([[`${ig(null,null,`(${P3(cs)})${DX}`)} = ${qpoly(F0.slice(0,1).concat(F0.slice(1)))}`.replace(/$/,'')+PLUSC+'.',.5]]),
      ptxt([[`${I('F')}(${I('x')}) = ${coefV(a,EX())}${plusH(qpoly(F0))}${PLUSC}.`,.25],[`${I('F')}(0) = ${sg(a)} + C = ${sg(v0)} ⟹ C = ${sg(C)}. Vậy ${I('F')}(${I('x')}) = ${coefV(a,EX())}${plusH(qpoly(F0.slice(0,-1).concat([Q(C)])))}.`,.25]])],
    chk:()=>a+C===v0&&x0===0};
});

/* ===================== Bài 12: Tích phân ===================== */
N12b('k12-12-poly',4,'NB',[12],r=>{
  const cs=randPoly(r,r.pick([1,2]),-4,4),a=r.int(-1,1),b=a+r.int(1,3),v=pdefQ(cs,a,b),F=pint(cs);
  return mkF(r,{stem:`${ig(a,b,`(${P3(cs)})${DX}`)} bằng`,correct:v,hf:qh2,cands:[qadd(qpev(F,b),qpev(F,a)),qpev(F,b),Q(pev(pder(cs),b)-pev(pder(cs),a)),qmul(v,Q(-1))],
    sol:`${ig(a,b,`(${P3(cs)})${DX}`)} = (${qpoly(F)})|<sub>${sg(a)}</sub><sup>${sg(b)}</sup> = ${qh2(qpev(F,b))} − (${qh2(qpev(F,a))}) = ${qh2(v)}.`,chk:()=>Math.abs(numInt(x=>pev(cs,x),a,b)-qv(v))<1e-3});
});
N12b('k12-12-prop',4,'NB',[12],r=>{
  const a=r.int(0,1),b=a+r.int(2,4),p=r.nz(-6,8),q=r.nz(-5,6),m=r.nz(-3,3),n=r.nz(-3,3),ans=m*p+n*q;
  const ex=`${m===1?'':m===-1?MINUS:sg(m)}${FX} ${n<0?MINUS:'+'} ${Math.abs(n)===1?'':Math.abs(n)}${I('g')}(${I('x')})`;
  return mkNum(r,{stem:`Cho ${ig(a,b,FX+DX)} = ${sg(p)} và ${ig(a,b,`${I('g')}(${I('x')})${DX}`)} = ${sg(q)}. Tích phân ${ig(a,b,`[${ex}]${DX}`)} bằng`,correct:ans,ok:()=>true,cands:[m*p-n*q,p+q,m*q+n*p,ans+m,-ans].filter(v=>v!==ans),
    sol:`${ig(a,b,`[${ex}]${DX}`)} = ${sg(m)}·${p<0?'('+sg(p)+')':p} + ${n<0?'('+sg(n)+')':n}·${q<0?'('+sg(q)+')':q} = ${sg(ans)}.`,chk:()=>true});
});
N12b('k12-12-split',4,'TH',[12],r=>{
  const [a,b,c]=distinctInts(r,3,-2,6).sort((x,y)=>x-y),p=r.nz(-6,8),q=r.nz(-6,8),k=r.int(0,2);
  const S=[[`${ig(a,b,FX+DX)} = ${sg(p)} và ${ig(b,c,FX+DX)} = ${sg(q)}. Tính ${ig(a,c,FX+DX)}.`,p+q,[p-q,q-p,p*q]],
    [`${ig(a,c,FX+DX)} = ${sg(p)} và ${ig(b,c,FX+DX)} = ${sg(q)}. Tính ${ig(a,b,FX+DX)}.`,p-q,[p+q,q-p,-p-q]],
    [`${ig(a,b,FX+DX)} = ${sg(p)}. Tính ${ig(b,a,`${Math.abs(q)===1?'':Math.abs(q)}${FX}${DX}`)}.`,-p*Math.abs(q),[p*Math.abs(q),p,-p]]][k];
  return mkNum(r,{stem:`Cho hàm số ${I('f')} liên tục trên ℝ thoả mãn ${S[0]}`,correct:S[1],ok:()=>true,cands:S[2].filter(v=>v!==S[1]).concat([S[1]+1,S[1]-2]),
    sol:k===2?`${ig(b,a,FX+DX)} = −${ig(a,b,FX+DX)} nên kết quả là ${sg(S[1])}.`:`Theo tính chất ${ig(I('a'),I('c'),FX+DX)} = ${ig(I('a'),I('b'),FX+DX)} + ${ig(I('b'),I('c'),FX+DX)}: kết quả ${sg(S[1])}.`,chk:()=>true});
});
N12b('k12-12-ftc',4,'TH',[12],r=>{
  const a=r.int(-1,2),b=a+r.int(1,3),fa=r.int(-10,20),I0=r.nz(-8,10),ask=r.chance(.5);
  return mkNum(r,{stem:ask?`Cho hàm số ${YF} có đạo hàm ${FPX} liên tục trên ℝ, ${I('f')}(${sg(a)}) = ${sg(fa)} và ${ig(a,b,FPX+DX)} = ${sg(I0)}. Giá trị của ${I('f')}(${sg(b)}) bằng`:`Cho hàm số ${YF} có đạo hàm ${FPX} liên tục trên ℝ, ${I('f')}(${sg(b)}) = ${sg(fa+I0)} và ${ig(a,b,FPX+DX)} = ${sg(I0)}. Giá trị của ${I('f')}(${sg(a)}) bằng`,
    correct:ask?fa+I0:fa,ok:()=>true,cands:ask?[fa-I0,I0,fa,fa*I0]:[fa+2*I0,I0,fa+I0,-fa],
    sol:`${ig(a,b,FPX+DX)} = ${I('f')}(${sg(b)}) − ${I('f')}(${sg(a)}) nên ${ask?`${I('f')}(${sg(b)}) = ${sg(fa)} + ${I0<0?'('+sg(I0)+')':I0} = ${sg(fa+I0)}`:`${I('f')}(${sg(a)}) = ${sg(fa+I0)} − ${I0<0?'('+sg(I0)+')':I0} = ${sg(fa)}`}.`,chk:()=>true});
});
N12b('k12-12-basic',4,'TH',[12],r=>{
  const k=r.int(0,4),m=r.int(1,4);
  const T12=[
    [ig(0,1,`${m===1?'':m}${EX()}${DX}`),m===1?`${I('e')} ${MINUS} 1`:`${m}(${I('e')} ${MINUS} 1)`,[m===1?I('e'):`${m}${I('e')}`,m===1?`${I('e')} + 1`:`${m}(${I('e')} + 1)`,m===1?`1 ${MINUS} ${I('e')}`:`${m}(1 ${MINUS} ${I('e')})`]],
    [ig(0,fr(PI,2),`${m===1?'':m}cos ${I('x')}${DX}`),String(m),[sg(-m),'0',String(2*m)]],
    [ig(0,PI,`${m===1?'':m}sin ${I('x')}${DX}`),String(2*m),['0',sg(-2*m),String(m)]],
    [ig(1,I('e'),`${fr(m,I('x'))}${DX}`),String(m),[`${m===1?'':m}${I('e')}`,`${m===1?'':m}(${I('e')} ${MINUS} 1)`,'0']],
    [ig(0,1,`${m+1}${sup(I('x'))}${DX}`),fr(m,`ln ${m+1}`),[`${m}ln ${m+1}`,fr(m+1,`ln ${m+1}`),fr(m+2,`ln ${m+1}`)]]][k];
  return mkTxt(r,{stem:`${T12[0]} bằng`,correct:T12[1],wrongs:T12[2],sol:`Tìm một nguyên hàm theo bảng nguyên hàm rồi áp dụng công thức Newton – Leibniz: kết quả ${T12[1]}.`,chk:()=>true});
});
N12b('k12-12-geo',4,'TH',[12],r=>{
  const R0=r.int(1,5),ask=r.chance(.5);
  if(ask)return mkTxt(r,{stem:`Sử dụng ý nghĩa hình học của tích phân, ${ig(MINUS+R0,R0,rt(`${R0*R0} ${MINUS} ${I('x')}${sup(2)}`)+DX)} bằng`,correct:qpi(Q(R0*R0,2)),wrongs:[qpi(Q(R0*R0)),qpi(Q(R0*R0,4)),String(R0*R0)],
    sol:`Đồ thị y = ${rt(`${R0*R0} − x²`)} trên [−${R0}; ${R0}] là nửa đường tròn tâm O bán kính ${R0} (phần phía trên trục hoành). Tích phân bằng diện tích nửa hình tròn: ${fr(1,2)}π·${R0}² = ${qpi(Q(R0*R0,2))}.`,chk:()=>Math.abs(numInt(x=>Math.sqrt(Math.max(0,R0*R0-x*x)),-R0,R0)-Math.PI*R0*R0/2)<1e-3});
  const m=r.int(1,3),n=r.int(1,4),a=r.int(0,2),b=a+r.int(1,3),v=Q(m*(b*b-a*a)+2*n*(b-a),2);
  return mkF(r,{stem:`Sử dụng ý nghĩa hình học của tích phân, ${ig(a,b,`(${xlin(m,n)})${DX}`)} bằng`,correct:v,hf:qh2,cands:[Q((m*b+n)*(b-a)),Q((m*a+n)*(b-a)),Q(m*(b*b-a*a)+n*(b-a))],
    sol:`Miền dưới đường thẳng y = ${xlin(m,n)} trên [${a}; ${b}] là hình thang có hai đáy ${m*a+n}, ${m*b+n} và chiều cao ${b-a}: S = ${fr(`(${m*a+n} + ${m*b+n})·${b-a}`,2)} = ${qh2(v)}.`,chk:()=>Math.abs(numInt(x=>m*x+n,a,b)-qv(v))<1e-9});
});
N12b('k12-12-abs',4,'VD',[12],r=>{
  const m=r.pick([1,2]),c=r.pick([-1,1,2,3])*m,a=r.int(Math.floor(c/m)-3,Math.floor(c/m)-1),b=r.int(Math.ceil(c/m)+1,Math.ceil(c/m)+3);
  /* ∫|m x − c| = (m/2)[(c/m − a)² + (b − c/m)²] */
  const x0=Q(c,m),v=qmul(Q(m,2),qadd(qmul(qsub(x0,Q(a)),qsub(x0,Q(a))),qmul(qsub(Q(b),x0),qsub(Q(b),x0))));
  const lin=xlin(m,-c);
  return mkF(r,{stem:`${ig(a,b,`|${lin}|${DX}`)} bằng`,correct:v,hf:qh2,cands:[Q(m*(b*b-a*a)-2*c*(b-a),2),Q(Math.abs(m*(b*b-a*a)-2*c*(b-a)),2),qsub(v,Q(1))],
    sol:`${lin} = 0 ⟺ x = ${qh2(x0)} ∈ [${sg(a)}; ${sg(b)}]. Tách tích phân: ${ig(a,qh2(x0),`(${xlin(-m,c)})${DX}`)} + ${ig(qh2(x0),b,`(${lin})${DX}`)} = ${qh2(v)}.`,chk:()=>Math.abs(numInt(x=>Math.abs(m*x-c),a,b,4000)-qv(v))<1e-4});
});
DS12b('ds12-12-prop',4,'TH',[12],r=>{
  const a=0,b=r.int(2,4),p=r.nz(-5,8),q=r.nz(-5,6),m=r.int(2,3),n=r.int(2,3);if(p+q===p*q||m*p===p+m)return T.ds['ds12-12-prop'].gen(r);
  return mkDS(r,{stem:`Cho ${ig(a,b,FX+DX)} = ${sg(p)} và ${ig(a,b,`${I('g')}(${I('x')})${DX}`)} = ${sg(q)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${ig(a,b,`[${FX} + ${I('g')}(${I('x')})]${DX}`)} = ${sg(p+q)}.`,f:`${ig(a,b,`[${FX} + ${I('g')}(${I('x')})]${DX}`)} = ${sg(p*q)}.`,why:`Tích phân của tổng bằng tổng các tích phân: ${sg(p)} + ${q<0?'('+sg(q)+')':q} = ${sg(p+q)}.`},
    {t:`${ig(b,a,FX+DX)} = ${sg(-p)}.`,f:`${ig(b,a,FX+DX)} = ${sg(p)}.`,why:`Đổi cận thì tích phân đổi dấu.`},
    {t:`${ig(a,b,`${m}${FX}${DX}`)} = ${sg(m*p)}.`,f:`${ig(a,b,`${m}${FX}${DX}`)} = ${sg(p+m)}.`,why:`${ig(a,b,`${m}${FX}${DX}`)} = ${m}·${p<0?'('+sg(p)+')':p}.`},
    {t:`${ig(a,b,`[${n}${FX} ${MINUS} ${I('g')}(${I('x')}) + 1]${DX}`)} = ${sg(n*p-q+b)}.`,f:`${ig(a,b,`[${n}${FX} ${MINUS} ${I('g')}(${I('x')}) + 1]${DX}`)} = ${sg(n*p-q+1)}.`,why:`= ${n}·${p<0?'('+sg(p)+')':p} − ${q<0?'('+sg(q)+')':q} + ${ig(a,b,'1'+DX)} = ${sg(n*p-q)} + ${b} = ${sg(n*p-q+b)}.`}],
    chk:()=>p+q!==p*q&&m*p!==p+m&&b!==1});
});
DS12b('ds12-12-motion',4,'VD',[12],r=>{
  /* v(t) = (t − p)(t − q), 0 ≤ p < q; xét [0; T] với T > q */
  for(;;){const p=r.int(0,2),q=p+r.int(1,3),T=q+r.int(1,2),cs=[1,-(p+q),p*q];
    const disp=pdefQ(cs,0,T),dist=qadd(qadd(qmul(Q(p?1:0),pdefQ(cs,0,p)),qmul(Q(-1),pdefQ(cs,p,q))),pdefQ(cs,q,T));
    const vt=`${I('v')}(${I('t')}) = ${P3(cs,'t')}`;
    return mkDS(r,{stem:`Một vật chuyển động thẳng với vận tốc ${vt} (m/s), ${I('t')} tính bằng giây. Xét tính đúng sai của các khẳng định sau trong khoảng thời gian 0 ≤ ${I('t')} ≤ ${T}:`,items:[
      {t:`Vận tốc của vật bằng 0 tại thời điểm ${I('t')} = ${q}.`,f:`Vận tốc của vật bằng 0 tại thời điểm ${I('t')} = ${q+1}.`,why:`v(t) = 0 ⟺ t = ${p}${p?'':' (thời điểm ban đầu)'} hoặc t = ${q}.`},
      {t:`Độ dịch chuyển của vật bằng ${ig(0,T,`${I('v')}(${I('t')})${DT}`)}.`,f:`Độ dịch chuyển của vật bằng ${I('v')}(${T}) ${MINUS} ${I('v')}(0).`,why:`Độ dịch chuyển là tích phân của vận tốc.`},
      {t:`Độ dịch chuyển của vật bằng ${qh2(disp)} m.`,f:`Độ dịch chuyển của vật bằng ${qh2(qadd(disp,Q(1)))} m.`,why:`${ig(0,T,`(${P3(cs,'t')})${DT}`)} = ${qh2(disp)}.`},
      {t:`Quãng đường vật đi được bằng ${qh2(dist)} m.`,f:`Quãng đường vật đi được bằng ${qh2(disp)} m.`,why:`Quãng đường = ${ig(0,T,`|${I('v')}(${I('t')})|${DT}`)}; tách tại các thời điểm v đổi dấu, được ${qh2(dist)}.`}],
      chk:()=>Math.abs(numInt(t=>Math.abs((t-p)*(t-q)),0,T,6000)-qv(dist))<1e-4&&qv(dist)!==qv(disp)})}
});
TLN12b('t12-12-poly',4,'TH',[12],r=>{
  for(;;){const cs=randPoly(r,2,-6,6),a=r.int(-2,1),b=a+r.int(1,3),v=pdefQ(cs,a,b);if(!isInt(qv(v)*100))continue;
    return{kind:'tln',stem:`Tính ${ig(a,b,`(${P3(cs)})${DX}`)}.`,ans:qv(v),unit:'',sol:`${ig(a,b,`(${P3(cs)})${DX}`)} = (${qpoly(pint(cs))})|<sub>${sg(a)}</sub><sup>${sg(b)}</sup> = ${fmt(qv(v))}.`,chk:()=>Math.abs(numInt(x=>pev(cs,x),a,b)-qv(v))<1e-3}}
});
TLN12b('t12-12-brake',4,'VD',[12],r=>{
  const v0=r.pick([10,12,15,20,24,30]),a=r.pick([2,3,4,5,6]),t0=v0/a,s=v0*v0/(2*a);
  if(!isInt(s*10))return T.tln['t12-12-brake'].gen(r);
  return{kind:'tln',stem:`Một ô tô đang chạy với vận tốc ${v0} m/s thì người lái đạp phanh; từ thời điểm đó ô tô chuyển động chậm dần đều với vận tốc ${I('v')}(${I('t')}) = ${MINUS}${a}${I('t')} + ${v0} (m/s), trong đó ${I('t')} là thời gian (giây) tính từ lúc đạp phanh. Hỏi từ lúc đạp phanh đến khi dừng hẳn ô tô còn di chuyển bao nhiêu mét?`,ans:s,unit:'m',
    sol:`Ô tô dừng khi v(t) = 0 ⟺ t = ${fmt(t0)}. Quãng đường: ${ig(0,fmt(t0),`(${MINUS}${a}${I('t')} + ${v0})${DT}`)} = ${fmt(s)} (m).`,chk:()=>Math.abs(numInt(t=>v0-a*t,0,t0)-s)<1e-3};
});
TLN12b('t12-12-avg',4,'VD',[12],r=>{
  const T0=r.int(18,24),k=r.pick([0.5,1,1.5,2]),t1=r.pick([6,7,8]),L=r.pick([4,6,8]),t2=t1+L,avg=T0+k*L/2;
  return{kind:'tln',stem:`Giá trị trung bình của hàm số liên tục ${I('f')} trên đoạn [${I('a')}; ${I('b')}] là ${fr(1,`${I('b')} ${MINUS} ${I('a')}`)}${ig(I('a'),I('b'),FX+DX)}. Nhiệt độ (°C) tại thời điểm ${I('t')} giờ trong ngày ở một địa phương được mô hình hoá bởi ${I('T')}(${I('t')}) = ${T0} + ${fmt(k)}(${I('t')} ${MINUS} ${t1}), ${t1} ≤ ${I('t')} ≤ ${t2}. Tính nhiệt độ trung bình từ ${t1} giờ đến ${t2} giờ (đơn vị: °C).`,ans:avg,unit:'',
    sol:`T̄ = ${fr(1,L)}${ig(t1,t2,`[${T0} + ${fmt(k)}(${I('t')} − ${t1})]${DT}`)} = ${fr(1,L)}·(${T0*L} + ${fmt(k*L*L/2)}) = ${fmt(avg)} (°C).`,chk:()=>Math.abs(numInt(t=>T0+k*(t-t1),t1,t2)/L-avg)<1e-9};
});
TLN12b('t12-12-profit',4,'VD',[12],r=>{
  const a=r.pick([0.0005,0.001,0.002]),b=r.pick([10,12.2,15,20]),x1=r.pick([100,200]),dx=r.pick([10,20,50]),x2=x1+dx;
  const v=Math.round((-(a/2)*(x2*x2-x1*x1)+b*dx)*100)/100;
  return{kind:'tln',stem:`Lợi nhuận biên (triệu đồng) của một sản phẩm được mô hình hoá bởi ${I('P')}′(${I('x')}) = ${MINUS}${dsx(a)}${I('x')} + ${dsx(b)}, trong đó ${I('P')}(${I('x')}) là lợi nhuận khi bán được ${I('x')} đơn vị sản phẩm. Tính sự thay đổi của lợi nhuận khi doanh số tăng từ ${x1} lên ${x2} đơn vị sản phẩm (đơn vị: triệu đồng, làm tròn đến hàng phần trăm).`,ans:v,unit:'',
    sol:`P(${x2}) − P(${x1}) = ${ig(x1,x2,`(${MINUS}${dsx(a)}${I('x')} + ${dsx(b)})${DX}`)} = ${MINUS}${dsx(a/2)}(${x2}² − ${x1}²) + ${dsx(b)}·${dx} ≈ ${fmt(v)}.`,chk:()=>Math.abs(numInt(x=>-a*x+b,x1,x2)-v)<0.006};
});
TL12b('tl12-12-int',4,'TH','a',[12],r=>{
  for(;;){const cs=randPoly(r,2,-5,5),a=0,b=r.int(1,3),v=pdefQ(cs,a,b),m=r.int(1,3),c=r.int(1,3),L=0,R=r.int(c+1,c+3);
    const w=Q(m*((c-L)*(c-L)+(R-c)*(R-c)),2);
    return{kind:'tl',title:'Tích phân',parts:[
      {pts:.5,html:`Tính ${ig(a,b,`(${P3(cs)})${DX}`)}.`},
      {pts:.5,html:`Tính ${ig(L,R,`|${xlin(m,-m*c)}|${DX}`)}.`}],
      sol:[ptxt([[`= (${qpoly(pint(cs))})|<sub>${a}</sub><sup>${b}</sup>`,.25],[`= ${qh2(v)}.`,.25]]),
        ptxt([[`${xlin(m,-m*c)} ≤ 0 trên [${L}; ${c}] và ≥ 0 trên [${c}; ${R}] nên tích phân bằng ${ig(L,c,`(${xlin(-m,m*c)})${DX}`)} + ${ig(c,R,`(${xlin(m,-m*c)})${DX}`)}.`,.25],[`= ${qh2(Q(m*c*c,2))} + ${qh2(Q(m*(R-c)*(R-c),2))} = ${qh2(w)}.`,.25]])],
      chk:()=>Math.abs(numInt(x=>Math.abs(m*x-m*c),L,R,4000)-qv(w))<1e-4&&Math.abs(numInt(x=>pev(cs,x),a,b)-qv(v))<1e-3}}
});

/* ===================== Bài 13: Ứng dụng hình học của tích phân ===================== */
N12b('k12-13-formula',4,'NB',[13],r=>{
  const ask=r.int(0,2),F=`${I('f')}(${I('x')})`,G=`${I('g')}(${I('x')})`;
  if(ask===0)return mkTxt(r,{stem:`Cho hàm số ${YF} liên tục trên đoạn [${I('a')}; ${I('b')}]. Diện tích ${I('S')} của hình phẳng giới hạn bởi đồ thị hàm số ${YF}, trục hoành và hai đường thẳng ${I('x')} = ${I('a')}, ${I('x')} = ${I('b')} (${I('a')} < ${I('b')}) là`,
    correct:`${I('S')} = ${ig(I('a'),I('b'),`|${F}|${DX}`)}`,wrongs:[`${I('S')} = ${ig(I('a'),I('b'),F+DX)}`,`${I('S')} = π${ig(I('a'),I('b'),`${F}${sup(2)}${DX}`)}`,`${I('S')} = |${ig(I('b'),I('a'),F+DX)}|`],sol:`Theo công thức: S = ${ig(I('a'),I('b'),`|${F}|${DX}`)}.`,chk:()=>true});
  if(ask===1)return mkTxt(r,{stem:`Cho các hàm số ${YF}, ${I('y')} = ${G} liên tục trên đoạn [${I('a')}; ${I('b')}]. Diện tích hình phẳng giới hạn bởi đồ thị hai hàm số đó và hai đường thẳng ${I('x')} = ${I('a')}, ${I('x')} = ${I('b')} là`,
    correct:`${I('S')} = ${ig(I('a'),I('b'),`|${F} ${MINUS} ${G}|${DX}`)}`,wrongs:[`${I('S')} = ${ig(I('a'),I('b'),`[${F} ${MINUS} ${G}]${DX}`)}`,`${I('S')} = ${ig(I('a'),I('b'),`|${F} + ${G}|${DX}`)}`,`${I('S')} = π${ig(I('a'),I('b'),`[${F} ${MINUS} ${G}]${sup(2)}${DX}`)}`],sol:`Theo công thức: S = ${ig(I('a'),I('b'),`|${F} − ${G}|${DX}`)}.`,chk:()=>true});
  return mkTxt(r,{stem:`Cho hàm số ${YF} liên tục, không âm trên đoạn [${I('a')}; ${I('b')}]. Thể tích của khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi đồ thị ${YF}, trục hoành và hai đường thẳng ${I('x')} = ${I('a')}, ${I('x')} = ${I('b')} xung quanh trục ${I('Ox')} là`,
    correct:`${I('V')} = π${ig(I('a'),I('b'),`${F}${sup(2)}${DX}`)}`,wrongs:[`${I('V')} = ${ig(I('a'),I('b'),`${F}${sup(2)}${DX}`)}`,`${I('V')} = π${ig(I('a'),I('b'),F+DX)}`,`${I('V')} = π${sup(2)}${ig(I('a'),I('b'),F+DX)}`],sol:`Theo công thức: V = π${ig(I('a'),I('b'),`${F}${sup(2)}${DX}`)}.`,chk:()=>true});
});
/* parabol y = s(x − p)(x − q) với trục hoành: diện tích |s|(q − p)³/6 */
N12b('k12-13-par',4,'TH',[13],r=>{
  const p=r.int(-3,1),q=p+r.int(1,4),s=r.pick([1,-1,2,-2,3]),cs=[s,-s*(p+q),s*p*q],S=Q(Math.abs(s)*(q-p)**3,6);
  return mkF(r,{stem:`Diện tích hình phẳng giới hạn bởi parabol ${I('y')} = ${P3(cs)} và trục hoành bằng`,correct:S,hf:qh2,cands:[qmul(S,Q(-1)),Q(Math.abs(s)*(q-p)**3,3),Q(Math.abs(s)*(q-p)**2,2),qadd(S,Q(1,2))],
    sol:`Hoành độ giao điểm: ${P3(cs)} = 0 ⟺ x = ${sg(p)} hoặc x = ${sg(q)}. S = ${ig(p,q,`|${P3(cs)}|${DX}`)} = ${qh2(S)}.`,chk:()=>Math.abs(numInt(x=>Math.abs(pev(cs,x)),p,q,4000)-qv(S))<1e-5});
});
N12b('k12-13-two',4,'TH',[13],r=>{
  /* y = x² + bx + c và y = mx + n cắt tại p, q: diện tích (q − p)³/6 */
  const p=r.int(-3,1),q=p+r.int(1,4),m=r.int(-3,3),n=r.int(-4,4),cs=[1,m-(p+q),n+p*q],S=Q((q-p)**3,6);
  return mkF(r,{stem:`Diện tích hình phẳng giới hạn bởi đồ thị hai hàm số ${I('y')} = ${P3(cs)} và ${I('y')} = ${P3([m,n])} bằng`,correct:S,hf:qh2,cands:[Q((q-p)**3,3),Q((q-p)**2,2),qadd(S,Q(1)),Q((q-p)**3,2)],
    sol:`Phương trình hoành độ giao điểm: ${P3(cs)} = ${P3([m,n])} ⟺ ${P3([1,-(p+q),p*q])} = 0 ⟺ x = ${sg(p)} hoặc x = ${sg(q)}. S = ${ig(p,q,`|${P3([1,-(p+q),p*q])}|${DX}`)} = ${qh2(S)}.`,chk:()=>Math.abs(numInt(x=>Math.abs(pev(cs,x)-m*x-n),p,q,4000)-qv(S))<1e-5});
});
N12b('k12-13-vol',4,'TH',[13],r=>{
  const k=r.int(0,3);let st,v,sol,W;
  if(k===0){const m=r.int(1,3),h=r.int(1,3);v=Q(m*m*h**3,3);st=`${I('y')} = ${m===1?'':m}${I('x')}, ${I('y')} = 0, ${I('x')} = 0, ${I('x')} = ${h}`;sol=`V = π${ig(0,h,`${m*m===1?'':m*m}${I('x')}${sup(2)}${DX}`)} = ${qpi(v)}.`;W=[qpi(Q(m*m*h**3)),qpi(Q(m*h*h,2)),qh2(v)]}
  if(k===1){const a=r.int(1,4);v=Q(a*a,2);st=`${I('y')} = ${rt(I('x'))}, ${I('y')} = 0, ${I('x')} = 0, ${I('x')} = ${a}`;sol=`V = π${ig(0,a,I('x')+DX)} = ${qpi(v)}.`;W=[qpi(Q(a,2)),qpi(Q(a*a)),qh2(v)]}
  if(k===2){v=Q(16,15);st=`${I('y')} = 1 ${MINUS} ${I('x')}${sup(2)}, ${I('y')} = 0`;sol=`Giao với Ox tại x = ±1. V = π${ig(MINUS+'1',1,`(1 − ${I('x')}${sup(2)})${sup(2)}${DX}`)} = ${qpi(v)}.`;W=[qpi(Q(4,3)),qpi(Q(8,15)),fr(16,15)]}
  if(k===3){const R0=r.int(1,4);v=Q(4*R0**3,3);st=`${I('y')} = ${rt(`${R0*R0} ${MINUS} ${I('x')}${sup(2)}`)}, ${I('y')} = 0`;sol=`Khối tạo thành là khối cầu bán kính ${R0}: V = π${ig(MINUS+R0,R0,`(${R0*R0} − ${I('x')}${sup(2)})${DX}`)} = ${qpi(v)}.`;W=[qpi(Q(2*R0**3,3)),qpi(Q(R0*R0)),qpi(Q(4*R0*R0,3))]}
  return mkTxt(r,{stem:`Thể tích khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi các đường ${st} xung quanh trục ${I('Ox')} bằng`,correct:qpi(v),wrongs:uniqBy(W,x=>x).filter(w=>w!==qpi(v)).concat([qpi(qadd(v,Q(1))),qpi(qmul(v,Q(2)))]),sol,chk:()=>true});
});
N12b('k12-13-graph',4,'VD',[13],r=>{
  /* đồ thị bậc ba cắt Ox tại 3 điểm a < b < c; cho các tích phân, tính diện tích miền tô */
  const roots=[[-2,0,2],[-1,0,2],[-2,0,1],[-1,1,2],[-2,-1,1],[0,1,3],[-1,0,3]],[a,b,c]=r.pick(roots),s=r.pick([1,-1]),cs=[s,-s*(a+b+c),s*(a*b+b*c+c*a),-s*a*b*c];
  const f=x=>pev(cs,x),I1=pdefQ(cs,a,b),I2=pdefQ(cs,b,c),S=qadd(Q(Math.abs(I1[0]),I1[1]),Q(Math.abs(I2[0]),I2[1]));
  const ext=[(a+b)/2,(b+c)/2].map(f),V={x:[a-1,c+1],y:[Math.floor(Math.min(0,...ext)-1),Math.ceil(Math.max(0,...ext)+1)]};
  return mkF(r,{stem:`Cho hàm số ${YF} liên tục trên ℝ và có đồ thị như hình bên.${graphSVG(f,{...V,xt:[a,b,c].filter(x=>x),fill:[a,c],w:220,h:180})}Biết ${ig(a,b,FX+DX)} = ${qh2(I1)} và ${ig(b,c,FX+DX)} = ${qh2(I2)}. Diện tích phần tô màu bằng`,correct:S,hf:qh2,cands:[qadd(I1,I2),qsub(I1,I2),qsub(I2,I1)],
    sol:`Trên [${sg(a)}; ${sg(b)}] đồ thị nằm ${qv(I1)>0?'trên':'dưới'} trục hoành, trên [${sg(b)}; ${sg(c)}] nằm ${qv(I2)>0?'trên':'dưới'} trục hoành. S = |${qh2(I1)}| + |${qh2(I2)}| = ${qh2(S)}.`,chk:()=>Math.abs(numInt(x=>Math.abs(f(x)),a,c,6000)-qv(S))<1e-4&&qv(I1)*qv(I2)<0});
});
N12b('k12-13-section',4,'VD',[13],r=>{
  const k=r.int(0,2),a=r.int(1,3),b=a+r.int(1,3);let st,v,sol;
  if(k===0){v=Q(b*b-a*a,2);st=`thiết diện là hình vuông có cạnh ${rt(I('x'))}`;sol=`S(x) = x; V = ${ig(a,b,I('x')+DX)} = ${qh2(v)}.`}
  if(k===1){v=Q(b**3-a**3,3);st=`thiết diện là hình vuông có cạnh ${I('x')}`;sol=`S(x) = x²; V = ${ig(a,b,I('x')+sup(2)+DX)} = ${qh2(v)}.`}
  if(k===2){v=Q(b**3-a**3,6);st=`thiết diện là tam giác vuông cân có cạnh góc vuông bằng ${I('x')}`;sol=`S(x) = ${fr('x²',2)}; V = ${ig(a,b,`${fr(I('x')+sup(2),2)}${DX}`)} = ${qh2(v)}.`}
  return mkF(r,{stem:`Tính thể tích của vật thể nằm giữa hai mặt phẳng ${I('x')} = ${a} và ${I('x')} = ${b}, biết rằng khi cắt vật thể bởi mặt phẳng vuông góc với trục ${I('Ox')} tại điểm có hoành độ ${I('x')} (${a} ≤ ${I('x')} ≤ ${b}) thì ${st}.`,correct:v,hf:qh2,cands:[qmul(v,Q(2)),qmul(v,Q(1,2)),qadd(v,Q(1))],sol:`Thể tích V = ${ig(I('a'),I('b'),`${I('S')}(${I('x')})${DX}`)}. ${sol}`,chk:()=>true});
});
DS12b('ds12-13-par',4,'TH',[13],r=>{
  const q=r.int(1,4),s=r.pick([1,-1]),cs=[-s,s*q,0];/* y = −s x² + s q x = s x(q − x) */
  const f=x=>pev(cs,x),S=Q(q**3,6),Vq=Q(q**5,30),V={x:[-1,q+1],y:s>0?[-1,Math.ceil(q*q/4)+1]:[-Math.ceil(q*q/4)-1,1]};
  return mkDS(r,{stem:`Cho hình phẳng (${I('H')}) giới hạn bởi parabol ${I('y')} = ${P3(cs)} và trục hoành (phần tô màu trong hình bên).${graphSVG(f,{...V,xt:[q],fill:[0,q],w:200,h:170})}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Parabol cắt trục hoành tại hai điểm có hoành độ 0 và ${q}.`,f:`Parabol cắt trục hoành tại hai điểm có hoành độ 0 và ${sg(-q)}.`,why:`${P3(cs)} = 0 ⟺ x = 0 hoặc x = ${q}.`},
    {t:`Diện tích của (${I('H')}) là ${I('S')} = ${ig(0,q,`|${P3(cs)}|${DX}`)}.`,f:`Diện tích của (${I('H')}) là ${I('S')} = π${ig(0,q,`(${P3(cs)})${DX}`)}.`,why:`Công thức diện tích hình phẳng giới hạn bởi đồ thị và trục hoành.`},
    {t:`Diện tích của (${I('H')}) bằng ${qh2(S)}.`,f:`Diện tích của (${I('H')}) bằng ${qh2(Q(q**3,3))}.`,why:`S = ${ig(0,q,`|${P3(cs)}|${DX}`)} = ${qh2(S)}.`},
    {t:`Thể tích khối tròn xoay tạo thành khi quay (${I('H')}) quanh trục ${I('Ox')} bằng ${qpi(Vq)}.`,f:`Thể tích khối tròn xoay tạo thành khi quay (${I('H')}) quanh trục ${I('Ox')} bằng ${qpi(qmul(S,S))}.`,why:`V = π${ig(0,q,`(${P3(cs)})${sup(2)}${DX}`)} = ${qpi(Vq)}.`}],
    chk:()=>Math.abs(numInt(x=>f(x)**2,0,q)-qv(Vq))<1e-3&&qv(Vq)!==qv(qmul(S,S))});
});
TLN12b('t12-13-area',4,'VD',[13],r=>{
  for(;;){const p=r.int(-3,1),q=p+r.int(2,4),s=r.pick([1,2,3,-1]),S=Math.abs(s)*(q-p)**3/6;if(!isInt(S*100))continue;
    const cs=[s,-s*(p+q),s*p*q],m=r.int(-2,2),n=r.int(-3,3),c2=[cs[0],cs[1]+m,cs[2]+n];
    return{kind:'tln',stem:`Tính diện tích hình phẳng giới hạn bởi đồ thị hai hàm số ${I('y')} = ${P3(c2)} và ${I('y')} = ${P3([m,n])}.`,ans:S,unit:'',
      sol:`Phương trình hoành độ giao điểm: ${P3(cs)} = 0 ⟺ x = ${sg(p)} hoặc x = ${sg(q)}. S = ${ig(p,q,`|${P3(cs)}|${DX}`)} = ${fmt(S)}.`,chk:()=>Math.abs(numInt(x=>Math.abs(pev(c2,x)-m*x-n),p,q,4000)-S)<1e-5}}
});
TLN12b('t12-13-vol',4,'VD',[13],r=>{
  const k=r.int(0,2);
  if(k===0){const a=r.int(1,3),b=a+r.int(1,3),V=Math.round(Math.PI*(b*b-a*a)/2*100)/100;
    return{kind:'tln',stem:`Tính thể tích khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi các đường ${I('y')} = ${rt(I('x'))}, ${I('y')} = 0, ${I('x')} = ${a}, ${I('x')} = ${b} quanh trục ${I('Ox')} (làm tròn kết quả đến hàng phần trăm).`,ans:V,unit:'',sol:`V = π${ig(a,b,I('x')+DX)} = ${fr((b*b-a*a)+'π',2)} ≈ ${fmt(V)}.`,chk:()=>true}}
  if(k===1){const R0=r.int(2,6),h=r.int(1,R0-1),V=Math.round(Math.PI*h*h*(R0-h/3)*100)/100;
    return{kind:'tln',stem:`Một khối chỏm cầu có bán kính mặt cầu ${I('R')} = ${R0} cm và chiều cao ${I('h')} = ${h} cm được tạo ra khi quay hình phẳng giới hạn bởi cung tròn ${I('y')} = ${rt(`${R0*R0} ${MINUS} ${I('x')}${sup(2)}`)}, trục hoành và hai đường thẳng ${I('x')} = ${R0-h}, ${I('x')} = ${R0} quanh trục ${I('Ox')}. Tính thể tích khối chỏm cầu (đơn vị: cm³, làm tròn đến hàng phần trăm).`,ans:V,unit:'',
      sol:`V = π${ig(R0-h,R0,`(${R0*R0} − ${I('x')}${sup(2)})${DX}`)} = πh²(R − ${fr('h',3)}) ≈ ${fmt(V)} (cm³).`,chk:()=>Math.abs(Math.PI*numInt(x=>R0*R0-x*x,R0-h,R0)-V)<0.006}}
  const m=r.int(1,3),h=r.int(2,5),V=Math.round(Math.PI*m*m*h**3/3*100)/100;
  return{kind:'tln',stem:`Tính thể tích khối nón tạo thành khi quay tam giác giới hạn bởi các đường ${I('y')} = ${m===1?'':m}${I('x')}, ${I('y')} = 0, ${I('x')} = ${h} quanh trục ${I('Ox')} (làm tròn kết quả đến hàng phần trăm).`,ans:V,unit:'',
    sol:`V = π${ig(0,h,`${m*m===1?'':m*m}${I('x')}${sup(2)}${DX}`)} = ${fr(m*m*h**3+'π',3)} ≈ ${fmt(V)}.`,chk:()=>true};
});
TL12b('tl12-13-app',4,'VD','a',[13],r=>{
  const p=r.int(-2,0),q=p+r.int(2,3),m=r.int(-2,2),n=r.int(-3,3),cs=[1,m-(p+q),n+p*q],S=Q((q-p)**3,6),a=r.int(1,3),Vv=Q(a*a*a,3);
  return{kind:'tl',title:'Ứng dụng hình học của tích phân',parts:[
    {pts:.5,html:`Tính diện tích hình phẳng giới hạn bởi đồ thị hai hàm số ${I('y')} = ${P3(cs)} và ${I('y')} = ${P3([m,n])}.`},
    {pts:.5,html:`Tính thể tích khối tròn xoay sinh ra khi quay hình phẳng giới hạn bởi các đường ${I('y')} = ${I('x')}, ${I('y')} = 0, ${I('x')} = 0, ${I('x')} = ${a} xung quanh trục ${I('Ox')}.`}],
    sol:[ptxt([[`Hoành độ giao điểm: ${P3([1,-(p+q),p*q])} = 0 ⟺ x = ${sg(p)} hoặc x = ${sg(q)}.`,.25],[`S = ${ig(p,q,`|${P3([1,-(p+q),p*q])}|${DX}`)} = ${qh2(S)}.`,.25]]),
      ptxt([[`V = π${ig(0,a,`${I('x')}${sup(2)}${DX}`)}.`,.25],[`= ${qpi(Vv)}.`,.25]])],
    chk:()=>Math.abs(numInt(x=>Math.abs(pev(cs,x)-m*x-n),p,q,4000)-qv(S))<1e-5};
});
TL12b('tl12-12-real',4,'VD','b',[12],r=>{
  const v0=r.pick([10,12,15,20]),a=r.pick([2,4,5]),t0=v0/a,s=v0*v0/(2*a),p=r.int(0,1),q=p+r.int(2,3),T=q+1,cs=[1,-(p+q),p*q];
  const dist=qadd(qadd(qmul(Q(p?1:0),pdefQ(cs,0,p)),qmul(Q(-1),pdefQ(cs,p,q))),pdefQ(cs,q,T));
  return{kind:'tl',title:'Tích phân trong chuyển động',parts:[
    {pts:.5,html:`Một ô tô đang chạy với vận tốc ${v0} m/s thì đạp phanh, sau đó chuyển động chậm dần đều với vận tốc ${I('v')}(${I('t')}) = ${MINUS}${a}${I('t')} + ${v0} (m/s). Tính quãng đường ô tô đi được từ lúc đạp phanh đến khi dừng hẳn.`},
    {pts:.5,html:`Một vật chuyển động với vận tốc ${I('v')}(${I('t')}) = ${P3(cs,'t')} (m/s). Tính quãng đường vật đi được trong khoảng thời gian 0 ≤ ${I('t')} ≤ ${T}.`}],
    sol:[ptxt([[`Ô tô dừng khi v(t) = 0 ⟺ t = ${fmt(t0)} (s).`,.25],[`Quãng đường: ${ig(0,fmt(t0),`(${MINUS}${a}${I('t')} + ${v0})${DT}`)} = ${fmt(s)} (m).`,.25]]),
      ptxt([[`Quãng đường bằng ${ig(0,T,`|${I('v')}(${I('t')})|${DT}`)}; v(t) = 0 ⟺ t = ${p} hoặc t = ${q}, v(t) < 0 trên (${p}; ${q}).`,.25],[`Tách tích phân tại các điểm đó, tính được quãng đường bằng ${qh2(dist)} (m).`,.25]])],
    chk:()=>Math.abs(numInt(t=>Math.abs((t-p)*(t-q)),0,T,6000)-qv(dist))<1e-4};
});
