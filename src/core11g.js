/* ================================================================
   LỚP 11 – Học kì II – Chương VIII: Các quy tắc tính xác suất
   Thẻ sec: bc (biến cố hợp, giao, độc lập), cong (công thức cộng), nhan (công thức nhân).
   Xác suất dạng thập phân dùng bội của 0,1 để mọi phép tính đều chính xác.
   ================================================================ */
const N11d=(id,ch,lv,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:11,hk:2,sec});
const DS11d=(id,ch,lv,gen,sec)=>reg('ds',id,ch,lv,gen,{g:11,hk:2,sec});
const TLN11d=(id,ch,lv,gen,sec)=>reg('tln',id,ch,lv,gen,{g:11,hk:2,sec});
const TL11d=(id,ch,lv,role,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:11,hk:2,sec});
const bar=s=>`${s}̄`;
const PP=s=>`${I('P')}(${s})`;
const EV=(s)=>I(s),EVb=s=>I(bar(s)),UN_='∪',IN_='∩';
const rr=x=>Math.round(x*100)/100,rr3=x=>Math.round(x*1000)/1000;
const decG=(v,d=2)=>dnum(rr3(v),d);
const Cn=(n,k)=>{let v=1;for(let i=1;i<=k;i++)v=v*(n-k+i)/i;return Math.round(v)};
const setH=a=>`{${a.join('; ')}}`;
/* Biến cố khi gieo một con xúc xắc cân đối: tên, hàm kiểm tra */
const DIE_EV=[['số chấm là số chẵn',n=>n%2===0],['số chấm là số lẻ',n=>n%2===1],['số chấm chia hết cho 3',n=>n%3===0],['số chấm lớn hơn 3',n=>n>3],['số chấm nhỏ hơn 4',n=>n<4],['số chấm là số nguyên tố',n=>[2,3,5].includes(n)],['số chấm là số chính phương',n=>n===1||n===4],['số chấm không nhỏ hơn 5',n=>n>=5]];
const dieSet=f=>[1,2,3,4,5,6].filter(f);

N11d('m11-8-def',8,'NB',r=>{
  const A=EV('A'),B=EV('B'),fam=r.int(0,3);
  if(fam===0)return mkTxt(r,{stem:`Cho hai biến cố ${A} và ${B}. Biến cố “${A} hoặc ${B} xảy ra” được kí hiệu là`,correct:`${A} ${UN_} ${B}.`,wrongs:[`${A} ${IN_} ${B}.`,`${EVb('A')} ${UN_} ${B}.`,`${EVb('A')} ${IN_} ${B}.`],sol:`Biến cố “A hoặc B xảy ra” là biến cố hợp của A và B, kí hiệu A ∪ B.`});
  if(fam===1)return mkTxt(r,{stem:`Cho hai biến cố ${A} và ${B}. Biến cố “cả ${A} và ${B} cùng xảy ra” được kí hiệu là`,correct:`${A} ${IN_} ${B}.`,wrongs:[`${A} ${UN_} ${B}.`,`${EVb('A')} ${IN_} ${B}.`,`${A} ${UN_} ${EVb('B')}.`],sol:`Biến cố “cả A và B cùng xảy ra” là biến cố giao của A và B, kí hiệu A ∩ B.`});
  if(fam===2)return mkTxt(r,{stem:`Hai biến cố ${A} và ${B} được gọi là xung khắc nếu`,correct:`${A} ${IN_} ${B} = ∅.`,wrongs:[`${A} ${UN_} ${B} = ∅.`,`${A} ${IN_} ${B} = Ω.`,`${A} ${UN_} ${B} = Ω.`],sol:`A và B xung khắc khi chúng không thể cùng xảy ra, tức là A ∩ B = ∅.`});
  return mkTxt(r,{stem:`Hai biến cố ${A} và ${B} độc lập với nhau khi và chỉ khi`,correct:`${PP(`${A} ${IN_} ${B}`)} = ${PP(A)}·${PP(B)}.`,wrongs:[`${PP(`${A} ${UN_} ${B}`)} = ${PP(A)} + ${PP(B)}.`,`${PP(`${A} ${IN_} ${B}`)} = ${PP(A)} + ${PP(B)}.`,`${PP(`${A} ${IN_} ${B}`)} = 0.`],sol:`Hai biến cố A và B độc lập khi P(A ∩ B) = P(A)·P(B).`});
});
N11d('m11-8-set',8,'TH',r=>{
  for(;;){
    const [e1,e2]=r.shuffle(DIE_EV).slice(0,2),A=dieSet(e1[1]),B=dieSet(e2[1]),U=dieSet(n=>e1[1](n)||e2[1](n)),In=dieSet(n=>e1[1](n)&&e2[1](n));
    if(!In.length||U.length===6||U.length===A.length||U.length===B.length)continue;
    const wantU=r.chance(.5),ans=wantU?U:In,H=setH;
    const cand=[wantU?In:U,A.filter(n=>!B.includes(n)),B.filter(n=>!A.includes(n)),dieSet(n=>!e1[1](n)&&!e2[1](n)),dieSet(n=>e1[1](n)!==e2[1](n))];
    const wr=cand.map(H).filter(z=>z!==H(ans));
    return mkTxt(r,{stem:`Gieo một con xúc xắc cân đối, đồng chất. Gọi ${EV('A')}: “${e1[0]}”, ${EV('B')}: “${e2[0]}”. Biến cố ${wantU?`${EV('A')} ${UN_} ${EV('B')}`:`${EV('A')} ${IN_} ${EV('B')}`} là`,correct:H(ans)+'.',wrongs:wr.map(z=>z+'.'),
      sol:`${EV('A')} = ${H(A)}, ${EV('B')} = ${H(B)}. ${wantU?`Biến cố hợp gồm các kết quả thuộc ít nhất một trong hai tập: ${EV('A')} ${UN_} ${EV('B')} = ${H(U)}.`:`Biến cố giao gồm các kết quả thuộc cả hai tập: ${EV('A')} ${IN_} ${EV('B')} = ${H(In)}.`}`,chk:()=>wr.length>=3});
  }
});
N11d('m11-8-mutex',8,'TH',r=>{
  for(let t=0;t<500;t++){
    const rows=[];for(let i=0;i<4;i++){const [e1,e2]=r.shuffle(DIE_EV).slice(0,2);rows.push({e1,e2,dis:dieSet(n=>e1[1](n)&&e2[1](n)).length===0})}
    const H=z=>`“${z.e1[0]}” và “${z.e2[0]}”.`;
    if(rows.filter(z=>z.dis).length!==1||new Set(rows.map(H)).size<4)continue;
    const ok=rows.find(z=>z.dis);
    return mkTxt(r,{stem:'Gieo một con xúc xắc cân đối, đồng chất. Cặp biến cố nào sau đây là hai biến cố xung khắc?',correct:H(ok),wrongs:rows.filter(z=>!z.dis).map(H),
      sol:`Hai biến cố xung khắc khi không có kết quả nào thuộc cả hai: “${ok.e1[0]}” = ${setH(dieSet(ok.e1[1]))} và “${ok.e2[0]}” = ${setH(dieSet(ok.e2[1]))} không có phần tử chung. Ở các cặp còn lại, hai tập có phần tử chung nên không xung khắc.`});
  }
  throw new Error('m11-8-mutex');
});
N11d('m11-8-mutex-add',8,'NB',r=>{
  const p=r.int(1,5),q=r.int(1,4),A=EV('A'),B=EV('B');
  return mkNum(r,{stem:`Cho hai biến cố xung khắc ${A} và ${B} với ${PP(A)} = ${dnum(p/10)} và ${PP(B)} = ${dnum(q/10)}. Xác suất ${PP(`${A} ${UN_} ${B}`)} bằng`,correct:rr((p+q)/10),f:v=>dnum(v),cands:[rr(p*q/100),rr(Math.abs(p-q)/10),rr((p+q+1)/10),rr(1-(p+q)/10)],
    sol:`${A} và ${B} xung khắc nên ${PP(`${A} ${UN_} ${B}`)} = ${PP(A)} + ${PP(B)} = ${dnum(p/10)} + ${dnum(q/10)} = ${dnum((p+q)/10)}.`});
});
N11d('m11-8-add',8,'NB',r=>{
  const p=r.int(3,8),q=r.int(3,8),s=r.int(1,Math.min(p,q)-1),A=EV('A'),B=EV('B');
  if(p+q-s>10)return T.nlc['m11-8-add'].gen(r);
  return mkNum(r,{stem:`Cho hai biến cố ${A} và ${B} với ${PP(A)} = ${dnum(p/10)}, ${PP(B)} = ${dnum(q/10)} và ${PP(`${A} ${IN_} ${B}`)} = ${dnum(s/10)}. Xác suất ${PP(`${A} ${UN_} ${B}`)} bằng`,correct:rr((p+q-s)/10),f:v=>dnum(v),cands:[rr((p+q)/10),rr((p+q+s)/10),rr(p*q/100),rr(Math.abs(p-q)/10)],
    sol:`${PP(`${A} ${UN_} ${B}`)} = ${PP(A)} + ${PP(B)} ${MINUS} ${PP(`${A} ${IN_} ${B}`)} = ${dnum(p/10)} + ${dnum(q/10)} ${MINUS} ${dnum(s/10)} = ${dnum((p+q-s)/10)}.`,chk:()=>(p+q-s)<=10});
});
N11d('m11-8-indep',8,'TH',r=>{
  const p=r.int(2,8),q=r.int(2,8),A=EV('A'),B=EV('B');
  return mkNum(r,{stem:`Cho hai biến cố độc lập ${A} và ${B} với ${PP(A)} = ${dnum(p/10)} và ${PP(B)} = ${dnum(q/10)}. Xác suất ${PP(`${A} ${IN_} ${B}`)} bằng`,correct:rr(p*q/100),f:v=>dnum(v),cands:[rr((p+q)/10),rr((p+q)/10-p*q/100),rr(Math.abs(p-q)/10),rr(p*q/10)],
    sol:`${A} và ${B} độc lập nên ${PP(`${A} ${IN_} ${B}`)} = ${PP(A)}·${PP(B)} = ${dnum(p/10)}·${dnum(q/10)} = ${dnum(p*q/100)}.`});
});
N11d('m11-8-indep-union',8,'TH',r=>{
  const p=r.int(2,8),q=r.int(2,8),A=EV('A'),B=EV('B'),v=rr((p*10+q*10-p*q)/100);
  return mkNum(r,{stem:`Cho hai biến cố độc lập ${A} và ${B} với ${PP(A)} = ${dnum(p/10)} và ${PP(B)} = ${dnum(q/10)}. Xác suất ${PP(`${A} ${UN_} ${B}`)} bằng`,correct:v,f:v=>dnum(v),cands:[rr((p+q)/10),rr(p*q/100),rr((p+q)/10+p*q/100),rr(1-p*q/100)],
    sol:`${PP(`${A} ${IN_} ${B}`)} = ${dnum(p*q/100)}. ${PP(`${A} ${UN_} ${B}`)} = ${dnum(p/10)} + ${dnum(q/10)} ${MINUS} ${dnum(p*q/100)} = ${dnum(v)}.`});
});
N11d('m11-8-indep-excl',8,'VD',r=>{
  const p=r.int(2,8),q=r.int(2,8),A=EV('A'),B=EV('B'),form=r.int(0,2);
  const forms=[[`${PP(`${A} ${IN_} ${EVb('B')}`)}`,(10-q)*p/100,`${A} và ${EVb('B')} độc lập nên ${PP(`${A} ${IN_} ${EVb('B')}`)} = ${PP(A)}·(1 ${MINUS} ${PP(B)}) = ${dnum(p/10)}·${dnum(1-q/10)}`],
    [`${PP(`${EVb('A')} ${IN_} ${EVb('B')}`)}`,(10-p)*(10-q)/100,`${EVb('A')} và ${EVb('B')} độc lập nên ${PP(`${EVb('A')} ${IN_} ${EVb('B')}`)} = (1 ${MINUS} ${PP(A)})(1 ${MINUS} ${PP(B)}) = ${dnum(1-p/10)}·${dnum(1-q/10)}`],
    [`xác suất để có đúng một trong hai biến cố ${A}, ${B} xảy ra`,(p*(10-q)+q*(10-p))/100,`Đúng một biến cố xảy ra là ${A}${IN_}${EVb('B')} hoặc ${EVb('A')}${IN_}${B} (hai biến cố xung khắc): ${PP(A)}·(1 ${MINUS} ${PP(B)}) + (1 ${MINUS} ${PP(A)})·${PP(B)} = ${dnum(p*(10-q)/100)} + ${dnum(q*(10-p)/100)}`]][form];
  const v=rr(forms[1]);
  return mkNum(r,{stem:`Cho hai biến cố độc lập ${A} và ${B} với ${PP(A)} = ${dnum(p/10)} và ${PP(B)} = ${dnum(q/10)}. Giá trị của ${forms[0]} bằng`,correct:v,f:v=>dnum(v),cands:[rr(p*q/100),rr((p+q)/10),rr(1-p*q/100),rr((10-p)*q/100),rr(p*(10-q)/100)],
    sol:`${forms[2]} = ${dnum(v)}.`});
});
N11d('m11-8-same',8,'TH',r=>{
  const x=r.int(3,8),y=r.int(3,8),n=x+y,tot=Cn(n,2),V=Q(Cn(x,2)+Cn(y,2),tot);
  return mkF(r,{stem:`Một hộp chứa ${x} viên bi đỏ và ${y} viên bi xanh (cùng kích thước, khối lượng). Lấy ngẫu nhiên đồng thời hai viên bi. Xác suất để hai viên bi lấy được cùng màu bằng`,correct:V,cands:[Q(x*y,tot),Q(Cn(x,2),tot),Q(Cn(y,2),tot),qsub(Q(1),V)],
    sol:`Số cách lấy hai viên bi: C(${n}, 2) = ${tot}. Hai viên cùng đỏ: C(${x}, 2) = ${Cn(x,2)}; cùng xanh: C(${y}, 2) = ${Cn(y,2)}. Hai biến cố này xung khắc nên xác suất bằng ${fr(`${Cn(x,2)} + ${Cn(y,2)}`,tot)} = ${qh(V)}.`,chk:()=>Math.abs(qv(V)-(Cn(x,2)+Cn(y,2))/tot)<1e-12});
});
N11d('m11-8-shoot',8,'TH',r=>{
  const p=r.int(5,9),q=r.int(5,9),form=r.int(0,2);
  const forms=[['cả hai xạ thủ đều bắn trúng',p*q/100,`${dnum(p/10)}·${dnum(q/10)}`,'Hai xạ thủ bắn độc lập nên xác suất cả hai trúng bằng tích hai xác suất'],
    ['ít nhất một xạ thủ bắn trúng',(p*10+q*10-p*q)/100,`${dnum(p/10)} + ${dnum(q/10)} ${MINUS} ${dnum(p*q/100)}`,'Gọi A, B là các biến cố “xạ thủ thứ nhất (thứ hai) bắn trúng”; A, B độc lập và P(A ∪ B) = P(A) + P(B) − P(A)·P(B)'],
    ['cả hai xạ thủ đều bắn trượt',(10-p)*(10-q)/100,`${dnum(1-p/10)}·${dnum(1-q/10)}`,'Xác suất bắn trượt của hai xạ thủ lần lượt là 1 − P(A) và 1 − P(B), hai biến cố độc lập nên nhân với nhau']][form],v=rr(forms[1]);
  return mkNum(r,{stem:`Hai xạ thủ cùng bắn vào một mục tiêu một cách độc lập. Xác suất bắn trúng của xạ thủ thứ nhất là ${dnum(p/10)}, của xạ thủ thứ hai là ${dnum(q/10)}. Xác suất để ${forms[0]} bằng`,correct:v,f:v=>dnum(v),cands:[rr((p+q)/10),rr(p*q/100),rr(1-p*q/100),rr((10-p)*(10-q)/100),rr((p*10+q*10-p*q)/100)],
    sol:`${forms[3]}: ${forms[2]} = ${dnum(v)}.`});
});
N11d('m11-8-union-count',8,'TH',r=>{
  const n=r.pick([30,36,40,45,50]),x=r.int(10,Math.floor(n*.6)),y=r.int(8,Math.floor(n*.5)),z=r.int(3,Math.min(x,y)-2);
  if(x+y-z>n-2)return T.nlc['m11-8-union-count'].gen(r);
  const V=Q(x+y-z,n);
  return mkF(r,{stem:`Một lớp có ${n} học sinh, trong đó ${x} học sinh giỏi Toán, ${y} học sinh giỏi Văn và ${z} học sinh giỏi cả hai môn. Chọn ngẫu nhiên một học sinh của lớp. Xác suất để học sinh đó giỏi ít nhất một trong hai môn Toán, Văn bằng`,correct:V,cands:[Q(x+y,n),Q(x+y+z,n),Q(x*y,n*n),Q(z,n)],
    sol:`Gọi ${EV('A')}: “giỏi Toán”, ${EV('B')}: “giỏi Văn”. ${PP(EV('A'))} = ${fr(x,n)}, ${PP(EV('B'))} = ${fr(y,n)}, ${PP(`${EV('A')} ${IN_} ${EV('B')}`)} = ${fr(z,n)}. Do đó ${PP(`${EV('A')} ${UN_} ${EV('B')}`)} = ${fr(`${x} + ${y} ${MINUS} ${z}`,n)} = ${qh(V)}.`,chk:()=>x+y-z<=n});
});

/* ----- Đúng/sai chương VIII ----- */
const TH8=[
  [`Nếu ${EV('A')} và ${EV('B')} xung khắc thì ${PP(`${EV('A')} ∪ ${EV('B')}`)} = ${PP(EV('A'))} + ${PP(EV('B'))}`,`Nếu ${EV('A')} và ${EV('B')} xung khắc thì ${PP(`${EV('A')} ∪ ${EV('B')}`)} = ${PP(EV('A'))}·${PP(EV('B'))}`],
  [`Với hai biến cố ${EV('A')}, ${EV('B')} bất kì: ${PP(`${EV('A')} ∪ ${EV('B')}`)} = ${PP(EV('A'))} + ${PP(EV('B'))} ${MINUS} ${PP(`${EV('A')} ∩ ${EV('B')}`)}`,`Với hai biến cố ${EV('A')}, ${EV('B')} bất kì: ${PP(`${EV('A')} ∪ ${EV('B')}`)} = ${PP(EV('A'))} + ${PP(EV('B'))} + ${PP(`${EV('A')} ∩ ${EV('B')}`)}`],
  [`Nếu ${EV('A')} và ${EV('B')} độc lập thì ${PP(`${EV('A')} ∩ ${EV('B')}`)} = ${PP(EV('A'))}·${PP(EV('B'))}`,`Nếu ${EV('A')} và ${EV('B')} độc lập thì ${PP(`${EV('A')} ∩ ${EV('B')}`)} = ${PP(EV('A'))} + ${PP(EV('B'))}`],
  [`${PP(EVb('A'))} = 1 ${MINUS} ${PP(EV('A'))}`,`${PP(EVb('A'))} = ${PP(EV('A'))} ${MINUS} 1`],
  [`Hai biến cố xung khắc là hai biến cố không thể cùng xảy ra trong một phép thử`,`Hai biến cố xung khắc là hai biến cố luôn cùng xảy ra trong một phép thử`],
  [`Nếu ${EV('A')} và ${EV('B')} độc lập thì ${EV('A')} và ${EVb('B')} cũng độc lập`,`Nếu ${EV('A')} và ${EV('B')} độc lập thì ${EV('A')} và ${EV('B')} xung khắc`],
  [`Biến cố ${EV('A')} ∩ ${EV('B')} là biến cố “cả ${EV('A')} và ${EV('B')} cùng xảy ra”`,`Biến cố ${EV('A')} ∩ ${EV('B')} là biến cố “${EV('A')} hoặc ${EV('B')} xảy ra”`],
  [`Với hai biến cố ${EV('A')}, ${EV('B')} bất kì: ${PP(`${EV('A')} ∪ ${EV('B')}`)} ≥ ${PP(EV('A'))}`,`Với hai biến cố ${EV('A')}, ${EV('B')} bất kì: ${PP(`${EV('A')} ∪ ${EV('B')}`)} < ${PP(EV('A'))}`]
];
DS11d('ds11-8-theory',8,'NB',r=>pairsDS(r,'Xét tính đúng sai của các khẳng định sau:',TH8),'bc');
DS11d('ds11-8-die',8,'TH',r=>{
  for(;;){
    const [e1,e2]=r.shuffle(DIE_EV).slice(0,2),A=dieSet(e1[1]),B=dieSet(e2[1]),U=dieSet(n=>e1[1](n)||e2[1](n)),In=dieSet(n=>e1[1](n)&&e2[1](n));
    if(!In.length||U.length===6)continue;
    const pA=Q(A.length,6),pB=Q(B.length,6),pI=Q(In.length,6),pU=Q(U.length,6),indep=qeq(pI,qmul(pA,pB));
    const alt=k=>Q(k===6?5:k+1,6);
    const items=[
      {t:`${PP(EV('A'))} = ${qh(pA)}`,f:`${PP(EV('A'))} = ${qh(alt(A.length))}`,why:`${EV('A')} = ${setH(A)} có ${A.length} kết quả thuận lợi trên ${6} kết quả đồng khả năng.`},
      {t:`${PP(`${EV('A')} ${IN_} ${EV('B')}`)} = ${qh(pI)}`,f:`${PP(`${EV('A')} ${IN_} ${EV('B')}`)} = ${qh(alt(In.length))}`,why:`${EV('A')} ${IN_} ${EV('B')} = ${setH(In)}.`},
      {t:`${PP(`${EV('A')} ${UN_} ${EV('B')}`)} = ${qh(pU)}`,f:`${PP(`${EV('A')} ${UN_} ${EV('B')}`)} = ${qh(alt(U.length))}`,why:`${EV('A')} ${UN_} ${EV('B')} = ${setH(U)}.`},
      {t:indep?`${EV('A')} và ${EV('B')} là hai biến cố độc lập`:`${EV('A')} và ${EV('B')} không độc lập`,f:indep?`${EV('A')} và ${EV('B')} là hai biến cố xung khắc`:`${EV('A')} và ${EV('B')} là hai biến cố độc lập`,
        why:`${PP(EV('A'))}·${PP(EV('B'))} = ${qh(qmul(pA,pB))} ${indep?'=':'≠'} ${qh(pI)} = ${PP(`${EV('A')} ${IN_} ${EV('B')}`)}${indep?', nên độc lập; hai biến cố có kết quả chung nên không xung khắc':', nên không độc lập'}.`}
    ];
    return mkDS(r,{stem:`Gieo một con xúc xắc cân đối, đồng chất. Gọi ${EV('A')}: “${e1[0]}”, ${EV('B')}: “${e2[0]}”. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>!qeq(alt(A.length),pA)&&!qeq(alt(In.length),pI)&&!qeq(alt(U.length),pU)});
  }
});
DS11d('ds11-8-indep',8,'VD',r=>{
  const p=r.int(2,8),q=r.int(2,8),A=EV('A'),B=EV('B');
  const v1=p*q/100,v2=(p*10+q*10-p*q)/100,v3=(10-p)*(10-q)/100,v4=(p*(10-q)+q*(10-p))/100;
  const items=[
    {t:`${PP(`${A} ${IN_} ${B}`)} = ${dnum(v1)}`,f:`${PP(`${A} ${IN_} ${B}`)} = ${dnum(rr((p+q)/10))}`,why:`${A}, ${B} độc lập nên P(A ∩ B) = P(A)·P(B) = ${dnum(p/10)}·${dnum(q/10)} = ${dnum(v1)}.`},
    {t:`${PP(`${A} ${UN_} ${B}`)} = ${dnum(v2)}`,f:`${PP(`${A} ${UN_} ${B}`)} = ${dnum(rr((p+q)/10))}`,why:`P(A ∪ B) = ${dnum(p/10)} + ${dnum(q/10)} ${MINUS} ${dnum(v1)} = ${dnum(v2)}.`},
    {t:`${PP(`${EVb('A')} ${IN_} ${EVb('B')}`)} = ${dnum(v3)}`,f:`${PP(`${EVb('A')} ${IN_} ${EVb('B')}`)} = ${dnum(rr(1-v1))}`,why:`${EVb('A')}, ${EVb('B')} độc lập nên P = (1 ${MINUS} ${dnum(p/10)})(1 ${MINUS} ${dnum(q/10)}) = ${dnum(v3)}.`},
    {t:`Xác suất để đúng một trong hai biến cố ${A}, ${B} xảy ra bằng ${dnum(v4)}`,f:`Xác suất để đúng một trong hai biến cố ${A}, ${B} xảy ra bằng ${dnum(rr((p+q)/10))}`,why:`P = P(A)·(1 ${MINUS} P(B)) + (1 ${MINUS} P(A))·P(B) = ${dnum(p*(10-q)/100)} + ${dnum(q*(10-p)/100)} = ${dnum(v4)}.`}
  ];
  return mkDS(r,{stem:`Cho hai biến cố độc lập ${A} và ${B} với ${PP(A)} = ${dnum(p/10)} và ${PP(B)} = ${dnum(q/10)}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>Math.abs(v2+v3-1)<1e-9&&v1!==rr((p+q)/10)&&rr(1-v1)!==v3});
});
DS11d('ds11-8-urn',8,'VD',r=>{
  const x=r.int(3,7),y=r.int(3,7),n=x+y,tot=Cn(n,2),alt=(a)=>a+1;
  if(Cn(x,2)+Cn(y,2)===x*y)return T.ds['ds11-8-urn'].gen(r);
  const same=Cn(x,2)+Cn(y,2),diff=x*y,atL=tot-Cn(y,2);
  const items=[
    {t:`Số cách lấy hai viên bi từ hộp là ${tot}`,f:`Số cách lấy hai viên bi từ hộp là ${tot+n}`,why:`C(${n}, 2) = ${tot}.`},
    {t:`Xác suất để hai viên bi cùng màu bằng ${qh(Q(same,tot))}`,f:`Xác suất để hai viên bi cùng màu bằng ${qh(Q(diff,tot))}`,why:`Cùng đỏ: C(${x}, 2) = ${Cn(x,2)}; cùng xanh: C(${y}, 2) = ${Cn(y,2)}; xác suất = ${qh(Q(same,tot))}.`},
    {t:`Xác suất để hai viên bi khác màu bằng ${qh(Q(diff,tot))}`,f:`Xác suất để hai viên bi khác màu bằng ${qh(Q(diff+1,tot))}`,why:`Số cách chọn một đỏ, một xanh: ${x}·${y} = ${diff}.`},
    {t:`Xác suất để có ít nhất một viên bi đỏ bằng ${qh(Q(atL,tot))}`,f:`Xác suất để có ít nhất một viên bi đỏ bằng ${qh(Q(Cn(x,2),tot))}`,why:`Biến cố đối: cả hai viên đều xanh, xác suất ${qh(Q(Cn(y,2),tot))}; do đó xác suất cần tìm là 1 ${MINUS} ${qh(Q(Cn(y,2),tot))} = ${qh(Q(atL,tot))}.`}
  ];
  return mkDS(r,{stem:`Một hộp chứa ${x} viên bi đỏ và ${y} viên bi xanh (cùng kích thước, khối lượng). Lấy ngẫu nhiên đồng thời hai viên bi từ hộp. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>same+diff===tot&&!qeq(Q(same,tot),Q(diff,tot))&&!qeq(Q(atL,tot),Q(Cn(x,2),tot))});
});

/* ----- Trả lời ngắn chương VIII ----- */
TLN11d('t11-8-union',8,'TH',r=>{
  const p=r.int(4,8),q=r.int(3,7),s=r.int(1,Math.min(p,q)-1),u=p+q-s;if(u>9)return T.tln['t11-8-union'].gen(r);
  return{kind:'tln',stem:`Cho hai biến cố ${EV('A')} và ${EV('B')} với ${PP(EV('A'))} = ${dnum(p/10)}, ${PP(EV('B'))} = ${dnum(q/10)} và ${PP(`${EV('A')} ∪ ${EV('B')}`)} = ${dnum(u/10)}. Tính ${PP(`${EV('A')} ∩ ${EV('B')}`)}.`,ans:rr(s/10),unit:'',
    sol:`Từ P(A ∪ B) = P(A) + P(B) ${MINUS} P(A ∩ B) suy ra P(A ∩ B) = ${dnum(p/10)} + ${dnum(q/10)} ${MINUS} ${dnum(u/10)} = ${dnum(s/10)}.`,chk:()=>p+q-u===s};
});
TLN11d('t11-8-class',8,'TH',r=>{
  const n=r.pick([30,40,45,50]),x=r.int(12,Math.floor(n*.6)),y=r.int(10,Math.floor(n*.5)),z=r.int(4,Math.min(x,y)-3);if(x+y-z>n-2)return T.tln['t11-8-class'].gen(r);
  const v=(x+y-z)/n,ans=r2(v);
  return{kind:'tln',stem:`Một câu lạc bộ có ${n} học sinh, trong đó ${x} học sinh thích bóng đá, ${y} học sinh thích bóng rổ và ${z} học sinh thích cả hai môn. Chọn ngẫu nhiên một học sinh của câu lạc bộ. Tính xác suất để học sinh đó thích ít nhất một trong hai môn (làm tròn đến hàng phần trăm).`,ans,unit:'',
    sol:`P = ${fr(x,n)} + ${fr(y,n)} ${MINUS} ${fr(z,n)} = ${fr(x+y-z,n)} ≈ ${fmt(ans)}.`,chk:()=>Math.abs(v-ans)<.0051};
});
TLN11d('t11-8-three',8,'VD',r=>{
  const ps=[r.int(5,9),r.int(5,9),r.int(5,9)],v=1-ps.reduce((a,p)=>a*(10-p)/10,1),ans=r2(v);
  return{kind:'tln',stem:`Ba xạ thủ cùng bắn vào một mục tiêu một cách độc lập. Xác suất bắn trúng của ba xạ thủ lần lượt là ${ps.map(p=>dnum(p/10)).join('; ')}. Tính xác suất để có ít nhất một xạ thủ bắn trúng mục tiêu (làm tròn đến hàng phần trăm).`,ans,unit:'',
    sol:`Biến cố đối là “cả ba xạ thủ đều bắn trượt”, có xác suất ${ps.map(p=>dnum(1-p/10)).join(' · ')} = ${dnum(rr3(1-v),3)}. Vậy xác suất cần tìm là 1 ${MINUS} ${dnum(rr3(1-v),3)} ≈ ${fmt(ans)}.`,chk:()=>Math.abs(v-ans)<.0051};
});
TLN11d('t11-8-draw',8,'TH',r=>{
  const x=r.int(3,8),y=r.int(3,8),n=x+y,v=x*y/Cn(n,2),ans=r2(v);
  return{kind:'tln',stem:`Một hộp chứa ${x} viên bi đỏ và ${y} viên bi xanh (cùng kích thước, khối lượng). Lấy ngẫu nhiên đồng thời hai viên bi. Tính xác suất để hai viên bi lấy được khác màu (làm tròn đến hàng phần trăm).`,ans,unit:'',
    sol:`Số cách lấy hai viên bi: C(${n}, 2) = ${Cn(n,2)}; số cách lấy một viên đỏ và một viên xanh: ${x}·${y} = ${x*y}. Xác suất bằng ${fr(x*y,Cn(n,2))} ≈ ${fmt(ans)}.`,chk:()=>Math.abs(v-ans)<.0051};
});

/* ----- Tự luận chương VIII (role b) ----- */
TL11d('tl11-8-shoot',8,'TH','b',r=>{
  const p=r.int(5,9),q=r.int(5,9),A=EV('A'),B=EV('B');
  return{kind:'tl',title:'Quy tắc nhân và quy tắc cộng xác suất',parts:[
    {pts:.5,html:`Hai xạ thủ cùng bắn vào một mục tiêu một cách độc lập. Xác suất bắn trúng của xạ thủ thứ nhất là ${dnum(p/10)}, của xạ thủ thứ hai là ${dnum(q/10)}.<br>Tính xác suất để cả hai xạ thủ đều bắn trúng.`},
    {pts:.5,html:`Tính xác suất để có ít nhất một xạ thủ bắn trúng.`}],
    sol:[ptxt([[`Gọi ${A}, ${B} lần lượt là các biến cố “xạ thủ thứ nhất, thứ hai bắn trúng”; ${A}, ${B} độc lập.`,.25],[`${PP(`${A} ${IN_} ${B}`)} = ${PP(A)}·${PP(B)} = ${dnum(p/10)}·${dnum(q/10)} = ${dnum(p*q/100)}.`,.25]]),
      ptxt([[`Biến cố “có ít nhất một xạ thủ bắn trúng” là ${A} ${UN_} ${B}.`,.25],[`${PP(`${A} ${UN_} ${B}`)} = ${dnum(p/10)} + ${dnum(q/10)} ${MINUS} ${dnum(p*q/100)} = ${dnum((p*10+q*10-p*q)/100)}.`,.25]])],
    chk:()=>p*q/100<=Math.min(p,q)/10};
});
TL11d('tl11-8-balls',8,'TH','b',r=>{
  const x=r.int(3,7),y=r.int(3,7),n=x+y,tot=Cn(n,2),V=Q(Cn(x,2)+Cn(y,2),tot);
  return{kind:'tl',title:'Xác suất bằng quy tắc cộng',parts:[
    {pts:.5,html:`Một hộp chứa ${x} viên bi đỏ và ${y} viên bi xanh (cùng kích thước, khối lượng). Lấy ngẫu nhiên đồng thời hai viên bi từ hộp.<br>Tính số phần tử của không gian mẫu.`},
    {pts:.5,html:`Tính xác suất để hai viên bi lấy được cùng màu.`}],
    sol:[ptxt([[`Mỗi kết quả là một tổ hợp chập 2 của ${n} viên bi.`,.25],[`Số phần tử của không gian mẫu: n(Ω) = C(${n}, 2) = ${tot}.`,.25]]),
      ptxt([[`Gọi A: “hai viên cùng đỏ”, B: “hai viên cùng xanh”; A và B xung khắc. P(A) = ${fr(Cn(x,2),tot)}, P(B) = ${fr(Cn(y,2),tot)}.`,.25],[`P(A ∪ B) = P(A) + P(B) = ${fr(Cn(x,2)+Cn(y,2),tot)} = ${qh(V)}.`,.25]])],
    chk:()=>Math.abs(qv(V)-(Cn(x,2)+Cn(y,2))/tot)<1e-12};
});
TL11d('tl11-8-class',8,'VD','b',r=>{
  const n=r.pick([40,50]),indep=r.chance(.5);let x,y,z;
  if(indep){const o=n===40?[[20,10],[10,20],[20,16],[10,8],[30,8]]:[[20,10],[25,10],[10,30],[20,15],[40,10]];[x,y]=r.pick(o);z=x*y/n}
  else{x=r.int(12,Math.floor(n*.6));y=r.int(10,Math.floor(n*.5));z=r.int(4,Math.min(x,y)-3);if(z*n===x*y)z++}
  if(!Number.isInteger(z)||x+y-z>n-1)return T.tl['tl11-8-class'].gen(r);
  const A=EV('A'),B=EV('B'),isI=z*n===x*y;
  return{kind:'tl',title:'Biến cố hợp, biến cố giao và biến cố độc lập',parts:[
    {pts:.5,html:`Một lớp có ${n} học sinh, trong đó ${x} học sinh giỏi Toán, ${y} học sinh giỏi Văn và ${z} học sinh giỏi cả hai môn. Chọn ngẫu nhiên một học sinh trong lớp. Gọi ${A}: “học sinh giỏi Toán”, ${B}: “học sinh giỏi Văn”.<br>Tính xác suất để học sinh được chọn giỏi ít nhất một trong hai môn.`},
    {pts:.5,html:`Hai biến cố ${A} và ${B} có độc lập hay không? Vì sao?`}],
    sol:[ptxt([[`${PP(A)} = ${fr(x,n)}, ${PP(B)} = ${fr(y,n)}, ${PP(`${A} ${IN_} ${B}`)} = ${fr(z,n)}.`,.25],[`${PP(`${A} ${UN_} ${B}`)} = ${fr(x,n)} + ${fr(y,n)} ${MINUS} ${fr(z,n)} = ${fr(x+y-z,n)} = ${qh(Q(x+y-z,n))}.`,.25]]),
      ptxt([[`${PP(A)}·${PP(B)} = ${fr(x,n)}·${fr(y,n)} = ${qh(Q(x*y,n*n))} và ${PP(`${A} ${IN_} ${B}`)} = ${qh(Q(z,n))}.`,.25],[isI?`Hai giá trị bằng nhau nên ${A} và ${B} là hai biến cố độc lập.`:`Hai giá trị khác nhau nên ${A} và ${B} không độc lập.`,.25]])],
    chk:()=>(x*y===z*n)===isI&&x+y-z<=n};
});
