/* ================================================================
   LỚP 12 – học kì II. Chương VI: Xác suất có điều kiện (Bài 18 – 19)
   và các câu tự luận thực tiễn bổ sung cho Chương IV.
   ================================================================ */
const PA=x=>`${I('P')}(${x})`,Ab=`<span class="ol">${I('A')}</span>`,Bb=`<span class="ol">${I('B')}</span>`;
const PAB=(a,b)=>`${I('P')}(${a} | ${b})`;
const dcm=v=>fmt(Math.round(v*10000)/10000);
/* phương án xác suất: chỉ lấy số trong khoảng (0; 1) */
const mkP=(r,o)=>{const v=o.correct,c=(o.cands||[]).concat([qsub(Q(1),v),Q(v[0]+1,v[1]),Q(v[0]-1,v[1]),Q(v[0],v[1]+1),Q(v[0],v[1]-1),Q(v[0]+1,v[1]+1),Q(2*v[0],v[1]+v[0]),Q(v[0],2*v[1]),Q(v[0],v[1]+2),Q(v[0]+2,v[1]+3),Q(1,v[1]+1),Q(1,3),Q(1,4)]).filter(q=>q&&q[1]>0&&q[0]>0&&q[0]<q[1]&&qv(q)!==qv(v));return mkF(r,{...o,cands:c})};
const qfr=q=>q[1]===1?String(q[0]):fr(q[0],q[1]);

/* ===================== Bài 18: Xác suất có điều kiện ===================== */
N12b('k12-18-formula',6,'NB',[18],r=>{
  const ask=r.chance(.5);
  if(ask)return mkTxt(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} với ${PA(I('B'))} > 0. Xác suất của ${I('A')} với điều kiện ${I('B')} được tính theo công thức`,correct:`${PAB(I('A'),I('B'))} = ${fr(PA(I('AB')),PA(I('B')))}`,
    wrongs:[`${PAB(I('A'),I('B'))} = ${fr(PA(I('AB')),PA(I('A')))}`,`${PAB(I('A'),I('B'))} = ${fr(PA(I('A')),PA(I('B')))}`,`${PAB(I('A'),I('B'))} = ${PA(I('A'))}·${PA(I('B'))}`],sol:`Theo định nghĩa: P(A | B) = ${fr('P(AB)','P(B)')}.`,chk:()=>true});
  return mkTxt(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} với ${PA(I('A'))} > 0. Công thức nhân xác suất là`,correct:`${PA(I('AB'))} = ${PA(I('A'))}·${PAB(I('B'),I('A'))}`,
    wrongs:[`${PA(I('AB'))} = ${PA(I('A'))}·${PA(I('B'))}`,`${PA(I('AB'))} = ${PA(I('A'))} + ${PAB(I('B'),I('A'))}`,`${PA(I('AB'))} = ${PA(I('B'))}·${PAB(I('B'),I('A'))}`],sol:`Từ định nghĩa xác suất có điều kiện suy ra P(AB) = P(A)·P(B | A).`,chk:()=>true});
});
N12b('k12-18-calc',6,'TH',[18],r=>{
  for(;;){const pB=r.pick([0.4,0.5,0.6,0.8,0.25,0.75]),pAB=r.pick([0.1,0.2,0.15,0.3,0.05]);if(pAB>=pB)continue;const v=pAB/pB;if(!isInt(v*100))continue;const pA=r.pick([0.3,0.5,0.6].filter(x=>x>=pAB));
    return mkNum(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} có ${PA(I('A'))} = ${fmt(pA)}, ${PA(I('B'))} = ${fmt(pB)} và ${PA(I('AB'))} = ${fmt(pAB)}. Giá trị của ${PAB(I('A'),I('B'))} bằng`,correct:v,ok:x=>x>0&&x<=1,cands:[pAB/pA,pAB,pA*pB,pB-pAB,v+0.1,v-0.1,1-v].map(x=>Math.round(x*10000)/10000).filter(x=>x!==v&&x>0&&x<1),
      sol:`P(A | B) = ${fr('P(AB)','P(B)')} = ${fr(fmt(pAB),fmt(pB))} = ${fmt(v)}.`,chk:()=>Math.abs(v*pB-pAB)<1e-9})}
});
N12b('k12-18-mult',6,'TH',[18],r=>{
  const pA=Q(r.int(1,4),5),pBA=Q(r.int(1,3),r.pick([3,4,5])),v=qmul(pA,pBA);
  return mkP(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} có ${PA(I('A'))} = ${qfr(pA)} và ${PAB(I('B'),I('A'))} = ${qfr(pBA)}. Giá trị của ${PA(I('AB'))} bằng`,correct:v,hf:qfr,cands:[qdiv(pA,pBA)[0]<=qdiv(pA,pBA)[1]?qdiv(pA,pBA):qadd(pA,Q(0)),qdiv(pBA,pA)[0]<qdiv(pBA,pA)[1]?qdiv(pBA,pA):qmul(v,Q(1,2)),qmul(qsub(Q(1),pA),pBA),qmul(pA,qsub(Q(1),pBA))],
    sol:`P(AB) = P(A)·P(B | A) = ${qfr(pA)}·${qfr(pBA)} = ${qfr(v)}.`,chk:()=>Math.abs(qv(v)-qv(pA)*qv(pBA))<1e-12});
});
N12b('k12-18-cards',6,'TH',[18],r=>{
  const N=r.pick([10,12,15,20,24,30]),cond=r.int(0,1),ev=r.pick([3,4,5]);
  const C=cond?[...Array(N)].map((_,i)=>i+1).filter(x=>x%2===0):[...Array(N)].map((_,i)=>i+1).filter(x=>x%2===1);
  const good=C.filter(x=>x%ev===0),v=Q(good.length,C.length);if(!good.length)return T.nlc['k12-18-cards'].gen(r);
  return mkP(r,{stem:`Một hộp có ${N} tấm thẻ giống nhau đánh số từ 1 đến ${N}. Rút ngẫu nhiên một tấm thẻ. Biết rằng thẻ rút được mang số ${cond?'chẵn':'lẻ'}, xác suất để số trên thẻ chia hết cho ${ev} là`,correct:v,hf:qfr,cands:[Q(good.length,N),Q(Math.floor(N/ev),N),Q(Math.floor(N/ev),C.length),Q(C.length-good.length,C.length),Q(good.length+1,C.length),Q(good.length,C.length+1)],
    sol:`Có ${C.length} thẻ mang số ${cond?'chẵn':'lẻ'}; trong đó các số chia hết cho ${ev} là ${good.join('; ')} (${good.length} số). Xác suất cần tìm: ${fr(good.length,C.length)}${v[1]!==C.length?` = ${qfr(v)}`:''}.`,chk:()=>true});
});
/* hai con xúc xắc */
const DICE=[];for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)DICE.push([a,b]);
N12b('k12-18-dice',6,'TH',[18],r=>{
  const k=r.int(0,2),f=r.int(1,6),s=r.int(5,10);
  const E=[[`tổng số chấm bằng ${s}`,`có ít nhất một con xúc xắc xuất hiện mặt ${f} chấm`,d=>d[0]+d[1]===s,d=>d[0]===f||d[1]===f],
    [`có ít nhất một con xúc xắc xuất hiện mặt ${f} chấm`,`tổng số chấm bằng ${s}`,d=>d[0]===f||d[1]===f,d=>d[0]+d[1]===s],
    [`tổng số chấm không nhỏ hơn ${s}`,`có ít nhất một con xúc xắc xuất hiện mặt ${f} chấm`,d=>d[0]+d[1]>=s,d=>d[0]===f||d[1]===f]][k];
  const B=DICE.filter(E[3]),AB=B.filter(E[2]);if(!AB.length||!B.length||AB.length===B.length)return T.nlc['k12-18-dice'].gen(r);
  const v=Q(AB.length,B.length);
  return mkP(r,{stem:`Gieo hai con xúc xắc cân đối, đồng chất. Xác suất để ${E[0]}, biết rằng ${E[1]}, là`,correct:v,hf:qfr,cands:[Q(AB.length,36),Q(B.length,36),Q(DICE.filter(E[2]).length,36),Q(AB.length,DICE.filter(E[2]).length)],
    sol:`Gọi A: “${E[0]}”, B: “${E[1]}”. n(B) = ${B.length}, n(AB) = ${AB.length} (${AB.map(d=>`(${d[0]}; ${d[1]})`).join(', ')}). P(A | B) = ${fr(AB.length,B.length)}${v[1]!==B.length?` = ${qfr(v)}`:''}.`,chk:()=>true});
});
N12b('k12-18-draw',6,'TH',[18],r=>{
  const a=r.int(3,8),b=r.int(2,7),n=a+b,k=r.int(0,2),col=['đỏ','xanh'];
  const S=[[`lấy được viên bi đỏ ở lần thứ hai, biết lần thứ nhất lấy được viên bi đỏ`,Q(a-1,n-1),[Q(a,n),Q(a-1,n),Q(a,n-1)]],
    [`lấy được viên bi xanh ở lần thứ hai, biết lần thứ nhất lấy được viên bi đỏ`,Q(b,n-1),[Q(b,n),Q(b-1,n-1),Q(a,n-1)]],
    [`cả hai lần đều lấy được viên bi đỏ`,Q(a*(a-1),n*(n-1)),[Q(a*a,n*n),Q(a-1,n-1),Q(a*(a-1),n*n)]]][k];
  return mkP(r,{stem:`Một hộp có ${a} viên bi đỏ và ${b} viên bi xanh có cùng kích thước và khối lượng. Lấy ngẫu nhiên lần lượt hai viên bi, không hoàn lại. Xác suất để ${S[0]} là`,correct:S[1],hf:qfr,cands:S[2],
    sol:k<2?`Sau khi lấy một viên bi đỏ, hộp còn ${n-1} viên gồm ${a-1} viên đỏ và ${b} viên xanh. Xác suất: ${qfr(S[1])}.`:`Theo công thức nhân: P = ${fr(a,n)}·${fr(a-1,n-1)} = ${qfr(S[1])}.`,chk:()=>true});
});
N12b('k12-18-table',6,'TH',[18],r=>{
  const x1=r.int(8,20)*100,x2=r.int(3,10)*100,y1=r.int(6,15)*100,y2=r.int(2,8)*100,ask=r.int(0,1);
  const tb=tableHTML(['Kết quả','Thuốc X','Thuốc Y'],[['Khỏi bệnh',x1,y1],['Không khỏi bệnh',x2,y2]]);
  const v=ask?Q(y1,x1+y1):Q(x1,x1+x2);
  return mkP(r,{stem:`Thử nghiệm hai loại thuốc X và Y trên ${x1+x2+y1+y2} người bệnh, kết quả như bảng sau:${tb}Chọn ngẫu nhiên một người bệnh. ${ask?'Biết người đó khỏi bệnh, xác suất để người đó uống thuốc Y là':'Biết người đó uống thuốc X, xác suất để người đó khỏi bệnh là'}`,correct:v,hf:qfr,cands:ask?[Q(y1,y1+y2),Q(y1,x1+x2+y1+y2),Q(x1,x1+y1)]:[Q(x1,x1+y1),Q(x1,x1+x2+y1+y2),Q(x2,x1+x2)],
    sol:ask?`Có ${x1+y1} người khỏi bệnh, trong đó ${y1} người uống thuốc Y: P = ${fr(y1,x1+y1)} = ${qfr(v)}.`:`Có ${x1+x2} người uống thuốc X, trong đó ${x1} người khỏi bệnh: P = ${fr(x1,x1+x2)} = ${qfr(v)}.`,chk:()=>true});
});
DS12b('ds12-18-draw',6,'TH',[18],r=>{
  const a=r.int(3,8),b=r.int(2,7),n=a+b;
  return mkDS(r,{stem:`Một túi có ${a} chiếc kẹo màu cam và ${b} chiếc kẹo màu vàng (cùng loại, chỉ khác màu). Lấy ngẫu nhiên lần lượt hai chiếc kẹo, không hoàn lại. Gọi ${I('A')}: “Lần thứ nhất lấy được kẹo màu cam”, ${I('B')}: “Lần thứ hai lấy được kẹo màu cam”. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${PA(I('A'))} = ${qfr(Q(a,n))}.`,f:`${PA(I('A'))} = ${qfr(Q(a-1,n))}.`,why:`Có ${a} kẹo cam trong ${n} kẹo.`},
    {t:`${PAB(I('B'),I('A'))} = ${qfr(Q(a-1,n-1))}.`,f:`${PAB(I('B'),I('A'))} = ${qfr(Q(a,n-1))}.`,why:`Sau lần thứ nhất lấy kẹo cam, còn ${a-1} kẹo cam trong ${n-1} kẹo.`},
    {t:`${PA(I('AB'))} = ${qfr(Q(a*(a-1),n*(n-1)))}.`,f:`${PA(I('AB'))} = ${qfr(Q(a*a,n*n))}.`,why:`P(AB) = P(A)·P(B | A) = ${fr(a,n)}·${fr(a-1,n-1)}.`},
    {t:`Xác suất lần thứ nhất lấy được kẹo cam và lần thứ hai lấy được kẹo vàng là ${qfr(Q(a*b,n*(n-1)))}.`,f:`Xác suất lần thứ nhất lấy được kẹo cam và lần thứ hai lấy được kẹo vàng là ${qfr(Q(a*b,n*n))}.`,why:`${fr(a,n)}·${fr(b,n-1)} = ${qfr(Q(a*b,n*(n-1)))}.`}],
    chk:()=>qfr(Q(a,n))!==qfr(Q(a-1,n))});
});
DS12b('ds12-18-venn',6,'TH',[18],r=>{
  for(;;){const n=r.int(25,40),t=r.int(10,20),l=r.int(10,20),none=r.int(1,4),both=t+l+none-n;if(both<2||both>=Math.min(t,l)||t===l||qfr(Q(both,n))===qfr(Q(both,t)))continue;
    return mkDS(r,{stem:`Một nhóm có ${n} học sinh, trong đó ${t} em học khá môn Toán, ${l} em học khá môn Vật lí và ${none} em không học khá cả hai môn. Chọn ngẫu nhiên một học sinh trong nhóm. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Số học sinh học khá cả hai môn là ${both}.`,f:`Số học sinh học khá cả hai môn là ${both+1}.`,why:`${t} + ${l} − x = ${n} − ${none} ⟹ x = ${both}.`},
      {t:`Xác suất học sinh đó học khá cả Toán và Vật lí là ${qfr(Q(both,n))}.`,f:`Xác suất học sinh đó học khá cả Toán và Vật lí là ${qfr(Q(both,t))}.`,why:`${fr(both,n)}.`},
      {t:`Xác suất học sinh đó học khá Toán nhưng không khá Vật lí là ${qfr(Q(t-both,n))}.`,f:`Xác suất học sinh đó học khá Toán nhưng không khá Vật lí là ${qfr(Q(t,n))}.`,why:`Có ${t-both} em chỉ khá Toán.`},
      {t:`Biết học sinh đó học khá Vật lí, xác suất học sinh đó học khá Toán là ${qfr(Q(both,l))}.`,f:`Biết học sinh đó học khá Vật lí, xác suất học sinh đó học khá Toán là ${qfr(Q(both,t))}.`,why:`P(T | L) = ${fr(both,l)}.`}],
      chk:()=>qfr(Q(both,l))!==qfr(Q(both,t))&&qfr(Q(both,n))!==qfr(Q(both,t))})}
});
TLN12b('t12-18-candy',6,'VD',[18],r=>{
  for(;;){const k=r.int(3,8),n=r.int(k+2,18),num=k*(k-1),den=n*(n-1),g=gcd(num,den),p=Q(num,den);if(p[1]>20)continue;
    return{kind:'tln',stem:`Trong một túi có một số chiếc kẹo cùng loại, chỉ khác màu, trong đó có ${k} chiếc kẹo màu cam, còn lại là kẹo màu vàng. Hà lấy ngẫu nhiên một chiếc kẹo, không trả lại, rồi lấy ngẫu nhiên thêm một chiếc kẹo nữa. Biết xác suất Hà lấy được cả hai chiếc kẹo màu cam là ${qfr(p)}. Hỏi ban đầu trong túi có bao nhiêu chiếc kẹo?`,ans:n,unit:'',
      sol:`Gọi n là số kẹo. Theo công thức nhân: ${fr(k,'n')}·${fr(k-1,'n − 1')} = ${qfr(p)} ⟺ n(n − 1) = ${den} ⟺ n = ${n}.`,chk:()=>k*(k-1)*p[1]===n*(n-1)*p[0]&&g>0}}
});
TLN12b('t12-18-dice',6,'VD',[18],r=>{
  for(;;){const s=r.int(6,11),f=r.int(1,6),B=DICE.filter(d=>d[0]===f||d[1]===f),AB=B.filter(d=>d[0]+d[1]>=s),v=Math.round(AB.length/B.length*100)/100;if(!AB.length||!isInt(AB.length/B.length*100))continue;
    return{kind:'tln',stem:`Gieo hai con xúc xắc cân đối, đồng chất. Tính xác suất để tổng số chấm xuất hiện trên hai con xúc xắc không nhỏ hơn ${s}, biết rằng có ít nhất một con xúc xắc xuất hiện mặt ${f} chấm (viết kết quả dưới dạng số thập phân).`,ans:v,unit:'',
      sol:`n(B) = ${B.length}; các kết quả thuận lợi: ${AB.map(d=>`(${d[0]}; ${d[1]})`).join(', ')} (${AB.length} kết quả). P = ${fr(AB.length,B.length)} = ${fmt(v)}.`,chk:()=>true}}
});
TLN12b('t12-18-exp',6,'VD',[18],r=>{
  const p1=r.pick([0.6,0.7,0.8,0.9]),p2=r.pick([0.7,0.8,0.9,0.95]),p3=r.pick([0.3,0.4,0.5]),ask=r.int(0,2);
  const v=[p1*p2,(1-p1)*(1-p3),p1*(1-p2)][ask],vv=Math.round(v*1000)/1000;
  return{kind:'tln',stem:`Bạn An thực hiện liên tiếp hai thí nghiệm. Thí nghiệm thứ nhất thành công với xác suất ${fmt(p1)}. Nếu thí nghiệm thứ nhất thành công thì xác suất thí nghiệm thứ hai thành công là ${fmt(p2)}; nếu thí nghiệm thứ nhất không thành công thì xác suất thí nghiệm thứ hai thành công là ${fmt(p3)}. Tính xác suất để ${['cả hai thí nghiệm đều thành công','cả hai thí nghiệm đều không thành công','thí nghiệm thứ nhất thành công và thí nghiệm thứ hai không thành công'][ask]}.`,ans:vv,unit:'',
    sol:`Gọi A: “thí nghiệm 1 thành công”, B: “thí nghiệm 2 thành công”. ${['P(AB) = P(A)·P(B | A)',`P(${Ab}${Bb}) = P(${Ab})·P(${Bb} | ${Ab})`,`P(A${Bb}) = P(A)·P(${Bb} | A)`][ask]} = ${fmt(vv)}.`,chk:()=>Math.abs(v-vv)<1e-9};
});
TL12b('tl12-18-table',6,'TH','b',[18],r=>{
  const x1=r.int(8,20)*100,x2=r.int(3,10)*100,y1=r.int(6,15)*100,y2=r.int(2,8)*100;
  const tb=tableHTML(['Kết quả','Thuốc X','Thuốc Y'],[['Khỏi bệnh',x1,y1],['Không khỏi bệnh',x2,y2]]),N=x1+x2+y1+y2;
  return{kind:'tl',title:'Xác suất có điều kiện',parts:[
    {pts:.5,html:`Để thử nghiệm tác dụng của hai loại thuốc X và Y, người ta thử trên ${N} người bệnh tình nguyện, kết quả như bảng sau:${tb}Chọn ngẫu nhiên một người bệnh. Tính xác suất người đó khỏi bệnh, biết người đó uống thuốc X.`},
    {pts:.5,html:`Tính xác suất người đó uống thuốc Y, biết người đó khỏi bệnh.`}],
    sol:[ptxt([[`Gọi A: “người đó uống thuốc X”, B: “người đó khỏi bệnh”. Có ${x1+x2} người uống thuốc X, trong đó ${x1} người khỏi bệnh.`,.25],[`P(B | A) = ${fr(x1,x1+x2)} = ${qfr(Q(x1,x1+x2))}.`,.25]]),
      ptxt([[`Có ${x1+y1} người khỏi bệnh, trong đó ${y1} người uống thuốc Y.`,.25],[`P(${Ab} | B) = ${fr(y1,x1+y1)} = ${qfr(Q(y1,x1+y1))}.`,.25]])],
    chk:()=>true};
});
TL12b('tl12-18-draw',6,'VD','b',[18],r=>{
  const a=r.int(3,7),b=r.int(2,6),n=a+b;
  return{kind:'tl',title:'Công thức nhân xác suất',parts:[
    {pts:.5,html:`Một hộp có ${a} bút bi đen và ${b} bút bi xanh. Bạn Sơn lấy ngẫu nhiên một chiếc bút (không trả lại), sau đó bạn Tùng lấy ngẫu nhiên một chiếc bút. Tính xác suất để Sơn lấy được bút đen và Tùng lấy được bút xanh.`},
    {pts:.5,html:`Tính xác suất để hai chiếc bút lấy ra có cùng màu.`}],
    sol:[ptxt([[`A: “Sơn lấy bút đen”, B: “Tùng lấy bút xanh”. P(A) = ${fr(a,n)}, P(B | A) = ${fr(b,n-1)}.`,.25],[`P(AB) = ${fr(a,n)}·${fr(b,n-1)} = ${qfr(Q(a*b,n*(n-1)))}.`,.25]]),
      ptxt([[`P(cùng đen) = ${fr(a,n)}·${fr(a-1,n-1)}, P(cùng xanh) = ${fr(b,n)}·${fr(b-1,n-1)}.`,.25],[`P(cùng màu) = ${qfr(Q(a*(a-1)+b*(b-1),n*(n-1)))}.`,.25]])],
    chk:()=>true};
});

/* ===================== Bài 19: Công thức xác suất toàn phần và Bayes ===================== */
const pct=v=>fmt(Math.round(v*1e4)/1e4);
N12b('k12-19-formula',6,'NB',[19],r=>{
  const ask=r.chance(.5);
  if(ask)return mkTxt(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} với 0 < ${PA(I('A'))} < 1. Công thức xác suất toàn phần là`,correct:`${PA(I('B'))} = ${PA(I('A'))}·${PAB(I('B'),I('A'))} + ${PA(Ab)}·${PAB(I('B'),Ab)}`,
    wrongs:[`${PA(I('B'))} = ${PA(I('A'))}·${PAB(I('B'),I('A'))} − ${PA(Ab)}·${PAB(I('B'),Ab)}`,`${PA(I('B'))} = ${PAB(I('B'),I('A'))} + ${PAB(I('B'),Ab)}`,`${PA(I('B'))} = ${PA(I('A'))}·${PAB(I('A'),I('B'))} + ${PA(Ab)}·${PAB(Ab,I('B'))}`],sol:`P(B) = P(A)·P(B | A) + P(${Ab})·P(B | ${Ab}).`,chk:()=>true});
  return mkTxt(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} với ${PA(I('A'))} > 0, ${PA(I('B'))} > 0. Công thức Bayes là`,correct:`${PAB(I('A'),I('B'))} = ${fr(`${PA(I('A'))}·${PAB(I('B'),I('A'))}`,PA(I('B')))}`,
    wrongs:[`${PAB(I('A'),I('B'))} = ${fr(`${PA(I('B'))}·${PAB(I('B'),I('A'))}`,PA(I('A')))}`,`${PAB(I('A'),I('B'))} = ${fr(PAB(I('B'),I('A')),PA(I('B')))}`,`${PAB(I('A'),I('B'))} = ${PA(I('A'))}·${PAB(I('B'),I('A'))}`],sol:`P(A | B) = ${fr('P(A)·P(B | A)','P(B)')}.`,chk:()=>true});
});
/* bộ dữ liệu phân số kiểu SGK: P(A), P(B|A), P(B|Ā) */
function bayesQ(r){const pA=Q(r.int(1,4),r.pick([5,4,3])),b1=Q(r.int(1,3),r.pick([3,4,5])),b2=Q(r.int(1,3),r.pick([4,5,6]));if(qv(pA)>=1||qv(b1)>=1||qv(b2)>=1||qv(b1)===qv(b2))return bayesQ(r);
  const nA=qsub(Q(1),pA),pB=qadd(qmul(pA,b1),qmul(nA,b2)),post=qdiv(qmul(pA,b1),pB);return{pA,b1,b2,nA,pB,post}}
N12b('k12-19-total',6,'TH',[19],r=>{
  const {pA,b1,b2,nA,pB}=bayesQ(r);
  return mkP(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} có ${PA(I('A'))} = ${qfr(pA)}, ${PAB(I('B'),I('A'))} = ${qfr(b1)}, ${PAB(I('B'),Ab)} = ${qfr(b2)}. Giá trị của ${PA(I('B'))} bằng`,correct:pB,hf:qfr,cands:[qadd(b1,b2)[0]<qadd(b1,b2)[1]?qadd(b1,b2):qmul(b1,b2),qmul(pA,b1),qadd(qmul(pA,b2),qmul(nA,b1))],
    sol:`P(B) = P(A)·P(B | A) + P(${Ab})·P(B | ${Ab}) = ${qfr(pA)}·${qfr(b1)} + ${qfr(nA)}·${qfr(b2)} = ${qfr(pB)}.`,chk:()=>Math.abs(qv(pB)-(qv(pA)*qv(b1)+qv(nA)*qv(b2)))<1e-12});
});
N12b('k12-19-bayes',6,'TH',[19],r=>{
  const {pA,b1,b2,nA,pB,post}=bayesQ(r);
  return mkP(r,{stem:`Cho hai biến cố ${I('A')}, ${I('B')} có ${PA(I('A'))} = ${qfr(pA)}, ${PAB(I('B'),I('A'))} = ${qfr(b1)}, ${PAB(I('B'),Ab)} = ${qfr(b2)}. Giá trị của ${PAB(I('A'),I('B'))} bằng`,correct:post,hf:qfr,cands:[qmul(pA,b1),pB,qsub(Q(1),post),qdiv(qmul(nA,b2),pB)],
    sol:`P(B) = ${qfr(pA)}·${qfr(b1)} + ${qfr(nA)}·${qfr(b2)} = ${qfr(pB)}. Theo công thức Bayes: P(A | B) = ${fr(`${qfr(pA)}·${qfr(b1)}`,qfr(pB))} = ${qfr(post)}.`,chk:()=>Math.abs(qv(post)*qv(pB)-qv(pA)*qv(b1))<1e-12});
});
N12b('k12-19-boxes',6,'TH',[19],r=>{
  const b1=r.int(2,6),w1=r.int(3,10),b2=r.int(2,8),w2=r.int(2,6);
  /* lấy 1 con từ chuồng II sang chuồng I, rồi lấy 1 con từ chuồng I */
  const n2=b2+w2,n1=b1+w1+1,v=qadd(qmul(Q(w2,n2),Q(w1+1,n1)),qmul(Q(b2,n2),Q(w1,n1)));
  return mkP(r,{stem:`Có hai chuồng thỏ. Chuồng I có ${b1} con thỏ đen và ${w1} con thỏ trắng; chuồng II có ${b2} con thỏ đen và ${w2} con thỏ trắng. Lấy ngẫu nhiên một con thỏ từ chuồng II cho vào chuồng I, sau đó lấy ngẫu nhiên một con thỏ từ chuồng I. Xác suất để con thỏ lấy ra lần sau là thỏ trắng bằng`,correct:v,hf:qfr,cands:[Q(w1,b1+w1),Q(w1+1,n1),Q(w1+w2,b1+w1+b2+w2)],
    sol:`Gọi A: “con thỏ chuyển sang là thỏ trắng”, P(A) = ${fr(w2,n2)}. P(B | A) = ${fr(w1+1,n1)}, P(B | ${Ab}) = ${fr(w1,n1)}. P(B) = ${fr(w2,n2)}·${fr(w1+1,n1)} + ${fr(b2,n2)}·${fr(w1,n1)} = ${qfr(v)}.`,chk:()=>true});
});
DS12b('ds12-19-test',6,'VD',[19],r=>{
  const prev=r.pick([0.01,0.02,0.05,0.1]),sens=r.pick([0.9,0.95,0.98]),spec=r.pick([0.9,0.95,0.97]);
  const pB=prev*sens+(1-prev)*(1-spec),post=prev*sens/pB,p4=Math.round(pB*1e4)/1e4,q2=Math.round(post*100)/100;
  return mkDS(r,{stem:`Tỉ lệ người mắc một bệnh trong cộng đồng là ${fmt(prev*100)}%. Một xét nghiệm cho kết quả dương tính với xác suất ${fmt(sens)} nếu người đó mắc bệnh, và cho kết quả âm tính với xác suất ${fmt(spec)} nếu người đó không mắc bệnh. Chọn ngẫu nhiên một người để xét nghiệm. Gọi ${I('A')}: “Người đó mắc bệnh”, ${I('B')}: “Xét nghiệm dương tính”. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${PA(Ab)} = ${fmt(1-prev)}.`,f:`${PA(Ab)} = ${fmt(prev)}.`,why:`P(${Ab}) = 1 − ${fmt(prev)}.`},
    {t:`${PAB(I('B'),Ab)} = ${fmt(Math.round((1-spec)*100)/100)}.`,f:`${PAB(I('B'),Ab)} = ${fmt(spec)}.`,why:`Không mắc bệnh thì âm tính với xác suất ${fmt(spec)} nên dương tính với xác suất ${fmt(Math.round((1-spec)*100)/100)}.`},
    {t:`${PA(I('B'))} = ${fmt(p4)}.`,f:`${PA(I('B'))} = ${fmt(Math.round(prev*sens*1e4)/1e4)}.`,why:`P(B) = ${fmt(prev)}·${fmt(sens)} + ${fmt(1-prev)}·${fmt(Math.round((1-spec)*100)/100)} = ${fmt(p4)}.`},
    {t:`Xác suất người đó mắc bệnh khi xét nghiệm dương tính xấp xỉ ${fmt(q2)}.`,f:`Xác suất người đó mắc bệnh khi xét nghiệm dương tính xấp xỉ ${fmt(sens)}.`,why:`P(A | B) = ${fr(`${fmt(prev)}·${fmt(sens)}`,fmt(p4))} ≈ ${fmt(q2)}.`}],
    chk:()=>Math.abs(pB-p4)<1e-9&&q2!==sens&&fmt(Math.round(prev*sens*1e4)/1e4)!==fmt(p4)});
});
DS12b('ds12-19-factory',6,'TH',[19],r=>{
  const a=r.pick([0.4,0.5,0.6,0.7]),d1=r.pick([0.01,0.02,0.03]),d2=r.pick([0.02,0.04,0.05]),pB=a*d1+(1-a)*d2,p4=Math.round(pB*1e4)/1e4,post=a*d1/pB,q2=Math.round(post*100)/100;
  if(d1===d2)return T.ds['ds12-19-factory'].gen(r);
  return mkDS(r,{stem:`Một nhà máy có hai dây chuyền I và II sản xuất cùng một loại linh kiện; dây chuyền I sản xuất ${fmt(a*100)}% tổng số linh kiện. Tỉ lệ phế phẩm của dây chuyền I và II lần lượt là ${fmt(d1*100)}% và ${fmt(d2*100)}%. Chọn ngẫu nhiên một linh kiện của nhà máy. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Xác suất linh kiện đó do dây chuyền II sản xuất là ${fmt(Math.round((1-a)*100)/100)}.`,f:`Xác suất linh kiện đó do dây chuyền II sản xuất là ${fmt(a)}.`,why:`1 − ${fmt(a)}.`},
    {t:`Xác suất linh kiện đó là phế phẩm, biết nó do dây chuyền I sản xuất, là ${fmt(d1)}.`,f:`Xác suất linh kiện đó là phế phẩm, biết nó do dây chuyền I sản xuất, là ${fmt(Math.round(a*d1*1e4)/1e4)}.`,why:`Theo tỉ lệ phế phẩm của dây chuyền I.`},
    {t:`Xác suất linh kiện đó là phế phẩm bằng ${fmt(p4)}.`,f:`Xác suất linh kiện đó là phế phẩm bằng ${fmt(Math.round((d1+d2)/2*1e4)/1e4===p4?p4+0.01:Math.round((d1+d2)/2*1e4)/1e4)}.`,why:`Công thức xác suất toàn phần: ${fmt(a)}·${fmt(d1)} + ${fmt(Math.round((1-a)*100)/100)}·${fmt(d2)} = ${fmt(p4)}.`},
    {t:`Biết linh kiện đó là phế phẩm, xác suất nó do dây chuyền I sản xuất xấp xỉ ${fmt(q2)}.`,f:`Biết linh kiện đó là phế phẩm, xác suất nó do dây chuyền I sản xuất xấp xỉ ${fmt(a)}.`,why:`Công thức Bayes: ${fr(`${fmt(a)}·${fmt(d1)}`,fmt(p4))} ≈ ${fmt(q2)}.`}],
    chk:()=>q2!==a&&Math.round(a*d1*1e4)/1e4!==d1});
});
TLN12b('t12-19-total',6,'VD',[19],r=>{
  const k=r.int(0,2);
  if(k===0){const pX=r.pick([0.55,0.6,0.65,0.7]),hx=r.pick([0.8,0.85,0.9]),hy=r.pick([0.7,0.8]),v=Math.round((pX*(1-(1-hx)**2)+(1-pX)*hy)*10000)/10000;
    return{kind:'tln',stem:`Một máy bay địch có thể xuất hiện ở vị trí X với xác suất ${fmt(pX)}, nếu không thì nó xuất hiện ở vị trí Y. Nếu máy bay xuất hiện ở X thì bắn 2 quả tên lửa, mỗi quả trúng với xác suất ${fmt(hx)}; nếu xuất hiện ở Y thì bắn 1 quả tên lửa, trúng với xác suất ${fmt(hy)}. Các quả tên lửa hoạt động độc lập; máy bay bị hạ nếu trúng ít nhất một quả. Tính xác suất hạ được máy bay (làm tròn đến hàng phần trăm).`,ans:Math.round(v*100)/100,unit:'',
      sol:`P(hạ | X) = 1 − ${fmt(Math.round((1-hx)*100)/100)}² = ${fmt(Math.round((1-(1-hx)**2)*10000)/10000)}; P(hạ | Y) = ${fmt(hy)}. P(hạ) = ${fmt(pX)}·${fmt(Math.round((1-(1-hx)**2)*10000)/10000)} + ${fmt(Math.round((1-pX)*100)/100)}·${fmt(hy)} ≈ ${fmt(Math.round(v*100)/100)}.`,chk:()=>true}}
  if(k===1){const n1=r.int(4,7),n2=r.int(5,9),p1=r.pick([0.6,0.65,0.7]),p2=r.pick([0.5,0.55,0.6]),v=(n1*p1+n2*p2)/(n1+n2),vv=Math.round(v*100)/100;
    return{kind:'tln',stem:`Đội I có ${n1} vận động viên, đội II có ${n2} vận động viên. Xác suất đạt huy chương vàng của mỗi vận động viên đội I và đội II tương ứng là ${fmt(p1)} và ${fmt(p2)}. Chọn ngẫu nhiên một vận động viên. Tính xác suất vận động viên đó đạt huy chương vàng (làm tròn đến hàng phần trăm).`,ans:vv,unit:'',
      sol:`P = ${fr(n1,n1+n2)}·${fmt(p1)} + ${fr(n2,n1+n2)}·${fmt(p2)} ≈ ${fmt(vv)}.`,chk:()=>true}}
  const m1=r.int(3,6),f1=r.int(1,4),m2=r.int(2,5),f2=r.int(3,6),v=Q(m1*(m2+f2)+2*m2*(m1+f1),3*(m1+f1)*(m2+f2)),vv=Math.round(qv(v)*100)/100;
  return{kind:'tln',stem:`Chuồng I có ${m1} con gà mái, ${f1} con gà trống; chuồng II có ${m2} con gà mái, ${f2} con gà trống. Người chơi tung một con xúc xắc cân đối: nếu số chấm chia hết cho 3 thì chọn chuồng I, ngược lại chọn chuồng II; sau đó bắt ngẫu nhiên một con gà trong chuồng đã chọn. Tính xác suất bắt được gà mái (làm tròn đến hàng phần trăm).`,ans:vv,unit:'',
    sol:`P(chuồng I) = ${fr(1,3)}, P(chuồng II) = ${fr(2,3)}. P(mái) = ${fr(1,3)}·${fr(m1,m1+f1)} + ${fr(2,3)}·${fr(m2,m2+f2)} = ${qfr(v)} ≈ ${fmt(vv)}.`,chk:()=>true};
});
TLN12b('t12-19-bayes',6,'VD',[19],r=>{
  const spam=r.pick([0.03,0.05,0.1]),catchS=r.pick([0.95,0.9]),fp=r.pick([0.01,0.02]),ask=r.chance(.5);
  const pB=spam*catchS+(1-spam)*fp,v=ask?spam*catchS/pB:(1-spam)*(1-fp)/(1-pB),vv=Math.round(v*100)/100;
  return{kind:'tln',stem:`Một bộ lọc thư rác chặn một thư rác với xác suất ${fmt(catchS)} và chặn nhầm một thư đúng (không phải thư rác) với xác suất ${fmt(fp)}. Tỉ lệ thư rác là ${fmt(spam*100)}%. ${ask?'Chọn ngẫu nhiên một thư bị chặn. Tính xác suất đó là thư rác':'Chọn ngẫu nhiên một thư không bị chặn. Tính xác suất đó là thư đúng'} (làm tròn đến hàng phần trăm).`,ans:vv,unit:'',
    sol:`A: “thư rác”, B: “thư bị chặn”. P(B) = ${fmt(spam)}·${fmt(catchS)} + ${fmt(1-spam)}·${fmt(fp)} = ${pct(pB)}. ${ask?`P(A | B) = ${fr(`${fmt(spam)}·${fmt(catchS)}`,pct(pB))}`:`P(${Ab} | ${Bb}) = ${fr(`${fmt(1-spam)}·${fmt(Math.round((1-fp)*100)/100)}`,pct(1-pB))}`} ≈ ${fmt(vv)}.`,chk:()=>true};
});
TL12b('tl12-19-total',6,'VD','b',[19],r=>{
  const a=r.pick([0.6,0.7,0.8]),ok1=r.pick([0.98,0.99]),ok2=r.pick([0.9,0.95]);
  /* đạt chuẩn a; đạt chuẩn → OTK ok1; không đạt → không OTK ok2 */
  const pB=a*ok1+(1-a)*(1-ok2),p4=Math.round(pB*1e4)/1e4,post=a*ok1/pB,q=Math.round(post*1e4)/1e4;
  return{kind:'tl',title:'Công thức xác suất toàn phần và công thức Bayes',parts:[
    {pts:.5,html:`Tại một nhà máy, tỉ lệ linh kiện đạt tiêu chuẩn là ${fmt(a*100)}%. Linh kiện đạt tiêu chuẩn được đóng dấu OTK với xác suất ${fmt(ok1)}; linh kiện không đạt tiêu chuẩn thì không được đóng dấu OTK với xác suất ${fmt(ok2)}. Chọn ngẫu nhiên một linh kiện. Tính xác suất linh kiện đó được đóng dấu OTK.`},
    {pts:.5,html:`Biết linh kiện được chọn có dấu OTK, tính xác suất linh kiện đó đạt tiêu chuẩn (làm tròn đến hàng phần nghìn).`}],
    sol:[ptxt([[`A: “đạt tiêu chuẩn”, B: “được đóng dấu OTK”. P(A) = ${fmt(a)}, P(B | A) = ${fmt(ok1)}, P(B | ${Ab}) = 1 − ${fmt(ok2)} = ${fmt(Math.round((1-ok2)*100)/100)}.`,.25],[`P(B) = ${fmt(a)}·${fmt(ok1)} + ${fmt(Math.round((1-a)*10)/10)}·${fmt(Math.round((1-ok2)*100)/100)} = ${fmt(p4)}.`,.25]]),
      ptxt([[`Theo công thức Bayes: P(A | B) = ${fr('P(A)·P(B | A)','P(B)')}.`,.25],[`= ${fr(`${fmt(a)}·${fmt(ok1)}`,fmt(p4))} ≈ ${fmt(Math.round(post*1000)/1000)}.`,.25]])],
    chk:()=>Math.abs(pB-p4)<1e-9&&q>0};
});
TL12b('tl12-19-bayes',6,'VDC','b',[19],r=>{
  const prev=r.pick([0.002,0.005,0.01]),sens=r.pick([0.94,0.95,0.97]),spec=r.pick([0.97,0.98,0.99]);
  const pB=prev*sens+(1-prev)*(1-spec),post=prev*sens/pB,pBn=1-pB,postN=(1-prev)*spec/pBn;
  return{kind:'tl',title:'Ứng dụng công thức Bayes',parts:[
    {pts:.5,html:`Tỉ lệ dân số mắc bệnh hiểm nghèo Y là ${fmt(prev*100)}%. Nếu mắc bệnh Y thì xét nghiệm cho kết quả dương tính với xác suất ${fmt(sens)}; nếu không mắc bệnh Y thì xét nghiệm cho kết quả âm tính với xác suất ${fmt(spec)}. Ông M đi xét nghiệm và nhận kết quả dương tính. Tính xác suất ông M mắc bệnh Y (làm tròn đến hàng phần nghìn).`},
    {pts:.5,html:`Bà N đi xét nghiệm và nhận kết quả âm tính. Tính xác suất bà N không mắc bệnh Y (làm tròn đến hàng phần chục nghìn) và nhận xét về độ tin cậy của kết quả âm tính so với kết quả dương tính.`}],
    sol:[ptxt([[`A: “mắc bệnh Y”, B: “dương tính”. P(B) = ${fmt(prev)}·${fmt(sens)} + ${fmt(1-prev)}·${fmt(Math.round((1-spec)*100)/100)} = ${pct(pB)}.`,.25],[`P(A | B) = ${fr(`${fmt(prev)}·${fmt(sens)}`,pct(pB))} ≈ ${fmt(Math.round(post*1000)/1000)}.`,.25]]),
      ptxt([[`P(${Ab} | ${Bb}) = ${fr(`${fmt(1-prev)}·${fmt(spec)}`,`1 − ${pct(pB)}`)} ≈ ${fmt(Math.round(postN*1e4)/1e4)}.`,.25],[`Kết quả âm tính gần như chắc chắn đúng, còn kết quả dương tính chỉ cho xác suất mắc bệnh khoảng ${fmt(Math.round(post*100))}% vì bệnh rất hiếm; cần xét nghiệm lại để khẳng định.`,.25]])],
    chk:()=>post<0.9&&postN>0.99};
});
TL12b('tl12-19-boxes',6,'TH','b',[19],r=>{
  const b1=r.int(2,6),w1=r.int(3,8),b2=r.int(2,6),w2=r.int(2,6),n2=b2+w2,n1=b1+w1+1,v=qadd(qmul(Q(w2,n2),Q(w1+1,n1)),qmul(Q(b2,n2),Q(w1,n1))),post=qdiv(qmul(Q(w2,n2),Q(w1+1,n1)),v);
  return{kind:'tl',title:'Công thức xác suất toàn phần',parts:[
    {pts:.5,html:`Hộp I có ${b1} viên bi đen và ${w1} viên bi trắng; hộp II có ${b2} viên bi đen và ${w2} viên bi trắng. Lấy ngẫu nhiên một viên bi từ hộp II bỏ vào hộp I, rồi lấy ngẫu nhiên một viên bi từ hộp I. Tính xác suất viên bi lấy ra lần sau là bi trắng.`},
    {pts:.5,html:`Biết viên bi lấy ra lần sau là bi trắng, tính xác suất viên bi chuyển từ hộp II sang là bi trắng.`}],
    sol:[ptxt([[`A: “bi chuyển sang là bi trắng”: P(A) = ${fr(w2,n2)}; B: “bi lấy lần sau là bi trắng”: P(B | A) = ${fr(w1+1,n1)}, P(B | ${Ab}) = ${fr(w1,n1)}.`,.25],[`P(B) = ${fr(w2,n2)}·${fr(w1+1,n1)} + ${fr(b2,n2)}·${fr(w1,n1)} = ${qfr(v)}.`,.25]]),
      ptxt([[`Theo công thức Bayes: P(A | B) = ${fr(`${fr(w2,n2)}·${fr(w1+1,n1)}`,qfr(v))}.`,.25],[`= ${qfr(post)}.`,.25]])],
    chk:()=>qv(post)>0&&qv(post)<1};
});

/* ===================== Tự luận thực tiễn bổ sung cho Chương IV ===================== */
TL12b('tl12-11-bullet',4,'TH','b',[11],r=>{
  const v0=r.pick([20,30,40,49]),g=9.8,t1=r.int(1,3);
  const h1=Math.round((v0*t1-4.9*t1*t1)*100)/100,tm=v0/g,hm=Math.round(v0*v0/(2*g)*10)/10,vt=Math.round((v0-g*t1)*10)/10;
  return{kind:'tl',title:'Nguyên hàm trong chuyển động',parts:[
    {pts:.5,html:`Một viên đạn được bắn thẳng đứng lên từ mặt đất với vận tốc ban đầu ${v0} m/s; gia tốc của viên đạn là ${I('a')} = ${MINUS}9,8 m/s². Tìm vận tốc ${I('v')}(${I('t')}) của viên đạn tại thời điểm ${I('t')} giây và tính vận tốc sau ${t1} giây.`},
    {pts:.5,html:`Tìm độ cao ${I('h')}(${I('t')}) của viên đạn và tính độ cao lớn nhất viên đạn đạt được (làm tròn đến hàng phần mười của mét).`}],
    sol:[ptxt([[`v(t) là nguyên hàm của a(t) = −9,8 với v(0) = ${v0}: v(t) = ${v0} − 9,8t.`,.25],[`v(${t1}) = ${fmt(vt)} (m/s).`,.25]]),
      ptxt([[`h(t) là nguyên hàm của v(t) với h(0) = 0: h(t) = ${v0}t − 4,9t².`,.25],[`h lớn nhất khi v(t) = 0 ⟺ t = ${fr(v0,'9,8')}; h<sub>max</sub> ≈ ${fmt(hm)} (m).`,.25]])],
    chk:()=>Math.abs(v0*tm-4.9*tm*tm-v0*v0/(2*g))<1e-9&&h1>0};
});
TL12b('tl12-13-gate',4,'VD','b',[13],r=>{
  const w=2*r.int(2,5),h=r.int(3,8),price=r.pick([100,120,150,200]),S=Q(2*w*h,3);
  /* parabol y = h − (4h/w²)x² trên [−w/2; w/2] */
  return{kind:'tl',title:'Ứng dụng tích phân trong thực tiễn',parts:[
    {pts:.5,html:`Một cổng có dạng parabol, chiều rộng chân cổng là ${w} m, chiều cao cổng là ${h} m. Chọn hệ trục ${I('Oxy')} có gốc là trung điểm chân cổng, trục ${I('Oy')} là trục đối xứng của cổng. Viết phương trình parabol và tính diện tích mặt cổng.`},
    {pts:.5,html:`Người ta dán kín mặt cổng bằng tấm trang trí với giá ${price} nghìn đồng/m². Tính số tiền cần dùng (làm tròn đến nghìn đồng).`}],
    sol:[ptxt([[`Parabol đi qua (0; ${h}), (±${w/2}; 0): y = ${h} − ${fr(4*h,w*w)}x².`,.25],[`S = ${ig(MINUS+w/2,w/2,`(${h} − ${fr(4*h,w*w)}${I('x')}${sup(2)})${DX}`)} = ${qh2(S)} (m²).`,.25]]),
      ptxt([[`Số tiền: ${qh2(S)}·${price}`,.25],[`≈ ${Math.round(qv(S)*price).toLocaleString('vi-VN')} nghìn đồng.`,.25]])],
    chk:()=>Math.abs(numInt(x=>h-4*h/(w*w)*x*x,-w/2,w/2)-qv(S))<1e-4};
});
TL12b('tl12-13-vase',4,'VDC','b',[13],r=>{
  const R0=r.int(3,6),H=r.int(2,R0-1),k=r.int(1,3);
  /* bát hình chỏm cầu: quay y = √(R² − x²) quanh Ox trên [R − H; R]; nước cao h' */
  const V=Math.PI*H*H*(R0-H/3),V2=Math.PI*(H-k>0?(H-k)**2*(R0-(H-k)/3):0);
  return{kind:'tl',title:'Thể tích vật thể tròn xoay',parts:[
    {pts:.5,html:`Một chiếc bát có dạng chỏm cầu, được tạo thành khi quay hình phẳng giới hạn bởi cung tròn ${I('y')} = ${rt(`${R0*R0} ${MINUS} ${I('x')}${sup(2)}`)}, trục ${I('Ox')} và hai đường thẳng ${I('x')} = ${R0-H}, ${I('x')} = ${R0} quanh trục ${I('Ox')} (đơn vị: dm). Tính thể tích của bát (làm tròn đến hàng phần trăm).`},
    {pts:.5,html:`Chứng minh rằng thể tích khối chỏm cầu bán kính ${I('R')}, chiều cao ${I('h')} là ${I('V')} = π${I('h')}${sup(2)}(${I('R')} ${MINUS} ${fr(I('h'),3)}).`}],
    sol:[ptxt([[`V = π${ig(R0-H,R0,`(${R0*R0} − ${I('x')}${sup(2)})${DX}`)} = π(${R0*R0}x − ${fr('x³',3)})|<sub>${R0-H}</sub><sup>${R0}</sup>.`,.25],[`V ≈ ${fmt(Math.round(V*100)/100)} (dm³).`,.25]]),
      ptxt([[`V = π${ig(`R − h`,'R',`(R² − ${I('x')}${sup(2)})${DX}`)} = π[R²h − ${fr(1,3)}(R³ − (R − h)³)].`,.25],[`Khai triển (R − h)³ = R³ − 3R²h + 3Rh² − h³ được V = π(Rh² − ${fr('h³',3)}) = πh²(R − ${fr('h',3)}).`,.25]])],
    chk:()=>Math.abs(Math.PI*numInt(x=>R0*R0-x*x,R0-H,R0)-V)<1e-4&&V2>=0};
});

/* ===================== Dạng bổ sung để các vị trí câu không lặp ===================== */
DS12b('ds12-12-basic',4,'NB',[11,12],r=>{
  const m=r.int(2,5),k=r.int(1,3),a=r.int(1,3);
  return mkDS(r,{stem:`Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${ig(0,1,`${m}${I('x')}${sup(m-1)}${DX}`)} = 1.`,f:`${ig(0,1,`${m}${I('x')}${sup(m-1)}${DX}`)} = ${m}.`,why:`${ig(0,1,`${m}${I('x')}${sup(m-1)}${DX}`)} = x<sup>${m}</sup>|<sub>0</sub><sup>1</sup> = 1.`},
    {t:`${ig(0,PI,`sin ${I('x')}${DX}`)} = 2.`,f:`${ig(0,PI,`sin ${I('x')}${DX}`)} = 0.`,why:`= (−cos x)|<sub>0</sub><sup>π</sup> = 1 + 1 = 2.`},
    {t:`${ig(1,I('e'),`${fr(k,I('x'))}${DX}`)} = ${k}.`,f:`${ig(1,I('e'),`${fr(k,I('x'))}${DX}`)} = ${k===1?'':k}${I('e')}.`,why:`= ${k===1?'':k}ln x|<sub>1</sub><sup>e</sup> = ${k}.`},
    {t:`${ig(MINUS+a,a,`${I('x')}${sup(3)}${DX}`)} = 0.`,f:`${ig(MINUS+a,a,`${I('x')}${sup(3)}${DX}`)} = ${fr(a**4,2)}.`,why:`= ${fr('x⁴',4)}|<sub>−${a}</sub><sup>${a}</sup> = 0.`}],chk:()=>m>1});
});
DS12b('ds12-18-dice',6,'VD',[18],r=>{
  const s=r.int(6,10),f=r.int(1,6),A=DICE.filter(d=>d[0]+d[1]===s),B=DICE.filter(d=>d[0]===f||d[1]===f),AB=A.filter(d=>d[0]===f||d[1]===f);
  if(!AB.length)return T.ds['ds12-18-dice'].gen(r);
  const pAB=Q(AB.length,B.length),pBA=Q(AB.length,A.length);
  return mkDS(r,{stem:`Gieo hai con xúc xắc cân đối, đồng chất. Gọi ${I('A')}: “Tổng số chấm bằng ${s}”, ${I('B')}: “Có ít nhất một con xúc xắc xuất hiện mặt ${f} chấm”. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${PA(I('B'))} = ${qfr(Q(11,36))}.`,f:`${PA(I('B'))} = ${qfr(Q(12,36))}.`,why:`n(B) = 36 − 25 = 11.`},
    {t:`${PA(I('A'))} = ${qfr(Q(A.length,36))}.`,f:`${PA(I('A'))} = ${qfr(Q(A.length+1,36))}.`,why:`Các kết quả có tổng ${s}: ${A.length} kết quả.`},
    {t:`${PAB(I('A'),I('B'))} = ${qfr(pAB)}.`,f:`${PAB(I('A'),I('B'))} = ${qfr(Q(AB.length,36))}.`,why:`n(AB) = ${AB.length}, P(A | B) = ${fr(AB.length,11)}.`},
    {t:`${PAB(I('B'),I('A'))} = ${qfr(pBA)}.`,f:`${PAB(I('B'),I('A'))} = ${qfr(pAB)}.`,why:`P(B | A) = ${fr(AB.length,A.length)}.`}],
    chk:()=>B.length===11&&qfr(pAB)!==qfr(pBA)&&qfr(pAB)!==qfr(Q(AB.length,36))});
});
TLN12b('t12-11-val',4,'TH',[11],r=>{
  const a=r.int(1,4),b=r.int(-5,5),c=r.int(-5,5),x1=r.int(1,3);
  /* F′(x) = 3a x² + 2b x, F(0) = c ⟹ F(x) = a x³ + b x² + c */
  const v=a*x1**3+b*x1*x1+c;
  return{kind:'tln',stem:`Biết ${I('F')}(${I('x')}) là một nguyên hàm của hàm số ${FX} = ${P3([3*a,2*b,0])} và ${I('F')}(0) = ${sg(c)}. Tính ${I('F')}(${x1}).`,ans:v,unit:'',
    sol:`F(x) = ${P3([a,b,0,0])}${PLUSC}; F(0) = C = ${sg(c)}. F(${x1}) = ${sg(v)}.`,chk:()=>true};
});
TLN12b('t12-13-simple',4,'TH',[13],r=>{
  const k=r.int(1,6),ask=r.chance(.5),a=r.int(1,3);
  if(ask)return{kind:'tln',stem:`Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số ${I('y')} = ${a===1?'':a}${I('x')}${sup(2)}, trục hoành và hai đường thẳng ${I('x')} = 0, ${I('x')} = 3.`,ans:9*a,unit:'',sol:`S = ${ig(0,3,`${a===1?'':a}${I('x')}${sup(2)}${DX}`)} = ${a===1?'':a}·${fr('x³',3)}|<sub>0</sub><sup>3</sup> = ${9*a}.`,chk:()=>true};
  return{kind:'tln',stem:`Tính diện tích hình phẳng giới hạn bởi đồ thị hàm số ${I('y')} = ${2*k}${I('x')}, trục hoành và hai đường thẳng ${I('x')} = 0, ${I('x')} = ${a+1}.`,ans:k*(a+1)**2,unit:'',sol:`S = ${ig(0,a+1,`${2*k}${I('x')}${DX}`)} = ${k}x²|<sub>0</sub><sup>${a+1}</sup> = ${k*(a+1)**2}.`,chk:()=>true};
});
TLN12b('t12-14-icpt',5,'TH',[14],r=>{
  const a=r.nz(-6,6),b=r.nz(-6,6),c=r.nz(-6,6),L=Math.abs(a*b*c)/gcdA([a*b,b*c,a*c]),p=[L/a,L/b,L/c,-L],g=gcdA(p),n=p.map(x=>x/g),s=n[0]>0?1:-1,m=n.map(x=>x*s);
  return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, mặt phẳng đi qua ba điểm ${I('A')}(${sg(a)}; 0; 0), ${I('B')}(0; ${sg(b)}; 0), ${I('C')}(0; 0; ${sg(c)}) có phương trình dạng ${I('m')}${I('x')} + ${I('n')}${I('y')} + ${I('p')}${I('z')} ${MINUS} ${I('q')} = 0 với ${I('m')}, ${I('n')}, ${I('p')}, ${I('q')} là các số nguyên, ${I('m')} > 0 và ước chung lớn nhất của chúng bằng 1. Tính ${I('m')} + ${I('n')} + ${I('p')} + ${I('q')}.`,ans:m[0]+m[1]+m[2]-m[3],unit:'',
    sol:`Phương trình đoạn chắn ${fr('x',sg(a))} + ${fr('y',sg(b))} + ${fr('z',sg(c))} = 1 ⟺ ${planeH(m)}. Do đó m + n + p + q = ${sg(m[0]+m[1]+m[2]-m[3])}.`,chk:()=>[[a,0,0],[0,b,0],[0,0,c]].every(P2=>onPlane(m,P2))&&m[0]>0};
});
TLN12b('t12-14-on',5,'TH',[14],r=>{
  const n=nz3(r),M=pt3s(r,4),D=r.int(-6,6),i=r.int(0,2);if(!n[i])return T.tln['t12-14-on'].gen(r);
  const rest=vdot(n,M)-n[i]*M[i]+D;if(rest%n[i])return T.tln['t12-14-on'].gen(r);const m=-rest/n[i];
  return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, tìm ${I('m')} để điểm ${I('M')}(${M.map((x,j)=>j===i?I('m'):sg(x)).join('; ')}) thuộc mặt phẳng ${plN('P',n.concat([D]))}.`,ans:m,unit:'',
    sol:`Thay toạ độ M vào (P): ${sg(rest)} + ${pr3(n[i])}m = 0 ⟺ m = ${sg(m)}.`,chk:()=>onPlane(n.concat([D]),M.map((x,j)=>j===i?m:x))};
});
TL12b('tl12-12-realTH',4,'TH','b',[12],r=>{
  const T0=r.int(18,24),k=r.pick([1,2]),t1=r.pick([6,7]),L=r.pick([4,6]),t2=t1+L,avg=T0+k*L/2,b=r.pick([10,12,15]),x1=r.pick([100,200]),dx=r.pick([10,20]);
  const ch=-(0.001/2)*((x1+dx)**2-x1*x1)+b*dx;
  return{kind:'tl',title:'Tích phân trong thực tiễn',parts:[
    {pts:.5,html:`Nhiệt độ (°C) tại thời điểm ${I('t')} giờ ở một địa phương được mô hình hoá bởi ${I('T')}(${I('t')}) = ${T0} + ${k}(${I('t')} ${MINUS} ${t1}), ${t1} ≤ ${I('t')} ≤ ${t2}. Tính nhiệt độ trung bình ${fr(1,t2-t1)}${ig(t1,t2,`${I('T')}(${I('t')})${DT}`)} trong khoảng thời gian đó.`},
    {pts:.5,html:`Lợi nhuận biên (triệu đồng) của một sản phẩm là ${I('P')}′(${I('x')}) = ${MINUS}0,001${I('x')} + ${b}. Tính sự thay đổi lợi nhuận khi doanh số tăng từ ${x1} lên ${x1+dx} sản phẩm.`}],
    sol:[ptxt([[`${ig(t1,t2,`[${T0} + ${k}(${I('t')} − ${t1})]${DT}`)} = ${T0*L} + ${k*L*L/2} = ${T0*L+k*L*L/2}.`,.25],[`Nhiệt độ trung bình: ${fr(T0*L+k*L*L/2,L)} = ${fmt(avg)} °C.`,.25]]),
      ptxt([[`P(${x1+dx}) − P(${x1}) = ${ig(x1,x1+dx,`(${MINUS}0,001${I('x')} + ${b})${DX}`)}.`,.25],[`= ${MINUS}0,0005(${x1+dx}² − ${x1}²) + ${b}·${dx} = ${fmt(Math.round(ch*100)/100)} (triệu đồng).`,.25]])],
    chk:()=>Math.abs(numInt(t=>T0+k*(t-t1),t1,t2)/L-avg)<1e-9};
});
TL12b('tl12-12-param',4,'VD','a',[12],r=>{
  const a=r.int(2,5),c=r.int(1,3),k=a*a-a,m=r.int(1,3),q=r.int(1,4);
  /* ∫_1^a (2x − 1) dx = a² − a; f′(x) = 2m x + q, f(0) = 1 ⟹ ∫_0^1 f = m/3 + q/2 + 1 */
  const v=qadd(qadd(Q(m,3),Q(q,2)),Q(1));
  return{kind:'tl',title:'Tích phân',parts:[
    {pts:.5,html:`Tìm số thực ${I('a')} > 1 sao cho ${ig(1,I('a'),`(2${I('x')} ${MINUS} 1)${DX}`)} = ${k}.`},
    {pts:.5,html:`Cho hàm số ${YF} có ${FPX} = ${P3([2*m,q])} và ${I('f')}(0) = 1. Tính ${ig(0,1,FX+DX)}.`}],
    sol:[ptxt([[`${ig(1,I('a'),`(2${I('x')} − 1)${DX}`)} = (x² − x)|<sub>1</sub><sup>a</sup> = a² − a.`,.25],[`a² − a = ${k} ⟺ a = ${a} (vì a > 1).`,.25]]),
      ptxt([[`f(x) = ${P3([m,q,1])} (vì f(0) = 1).`,.25],[`${ig(0,1,FX+DX)} = ${fr(m,3)} + ${fr(q,2)} + 1 = ${qh2(v)}.`,.25]])],
    chk:()=>a*a-a===k&&c>0};
});
