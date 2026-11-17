const dd11=(v,k=4)=>String(+v.toFixed(k)).replace('.',',');
/* ===== Toán 11: thêm câu vận dụng cao và biến thể hình không gian (theo dạng Bài tập cuối chương SGK KNTT) ===== */
/* SGK 4.44: trọng tâm hai mặt bên, GK ∥ (ABCD), mặt phẳng qua GK song song với đáy */
TL11('tl4-gk',4,'VDC','c',r=>{
  const F=chopHBH(),P={...F.P},alt=r.chance(.5);
  const [f1,f2]=alt?[['A','B'],['B','C']]:[['A','D'],['C','D']],[g,k]=r.pick([['G','K'],['G','H'],['E','F']]);
  P.M=V3.mid(P[f1[0]],P[f1[1]]);P.N=V3.mid(P[f2[0]],P[f2[1]]);P[g]=V3.lerp(P.S,P.M,2/3);P[k]=V3.lerp(P.S,P.N,2/3);
  const fig=fig3D(P,F.solid.concat([['S','N']]),F.dashed.concat([['S','M'],[g,k],['M','N'],['A','C']]),['S','A','B','C','D','M','N',g,k]);
  const t1='S'+f1.join(''),t2='S'+f2.join('');
  const A1="A′",B1="B′",C1="C′",D1="D′";
  return{kind:'tl',title:'Đường thẳng và mặt phẳng song song',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành. Gọi ${I(g)}, ${I(k)} lần lượt là trọng tâm của các tam giác ${I(t1)}, ${I(t2)}.${fig}Chứng minh ${I(g+k)} ∥ ${PLN('ABCD')}.`},
    {pts:.5,html:`Mặt phẳng chứa đường thẳng ${I(g+k)} và song song với ${PLN('ABCD')} cắt các cạnh ${I('SA')}, ${I('SB')}, ${I('SC')}, ${I('SD')} lần lượt tại ${I(A1)}, ${I(B1)}, ${I(C1)}, ${I(D1)}. Tính tỉ số ${fr(`S${A1}`,'SA')} và chứng minh ${I(A1+B1+C1+D1)} là hình bình hành.`}],
    sol:[ptxt([[`Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I(f1.join(''))}, ${I(f2.join(''))}. Vì ${I(g)}, ${I(k)} là trọng tâm nên ${fr('S'+g,'SM')} = ${fr('S'+k,'SN')} = ${fr(2,3)}, suy ra ${I(g+k)} ∥ ${I('MN')} (định lí Thalès đảo trong tam giác ${I('SMN')}).`,.25],
      [`${I('MN')} ⊂ ${PLN('ABCD')} và ${I(g+k)} ⊄ ${PLN('ABCD')} nên ${I(g+k)} ∥ ${PLN('ABCD')}.`,.25]]),
      ptxt([[`Mặt phẳng ${PLN('P')} ∥ ${PLN('ABCD')} cắt ${PLN(t1)} theo giao tuyến qua ${I(g)} song song với ${I(f1.join(''))}; trong tam giác ${I('SM'+f1[0])} ta có ${fr(`S${f1[0]}′`,'S'+f1[0])} = ${fr('S'+g,'SM')} = ${fr(2,3)}. Lập luận tương tự với các mặt bên còn lại: ${fr(`S${A1}`,'SA')} = ${fr(`S${B1}`,'SB')} = ${fr(`S${C1}`,'SC')} = ${fr(`S${D1}`,'SD')} = ${fr(2,3)}.`,.25],
      [`Do đó ${I(A1+B1)} ∥ ${I('AB')}, ${I(A1+B1)} = ${fr(2,3)}${I('AB')} và ${I(D1+C1)} ∥ ${I('DC')}, ${I(D1+C1)} = ${fr(2,3)}${I('DC')}. Vì ${I('AB')} ∥ ${I('DC')} và ${I('AB')} = ${I('DC')} nên ${I(A1+B1)} ∥ ${I(D1+C1)} và ${I(A1+B1)} = ${I(D1+C1)}: ${I(A1+B1+C1+D1)} là hình bình hành.`,.25]])],
    chk:()=>{const d=V3.sub(P[k],P[g]),n=V3.cross(V3.sub(P.B,P.A),V3.sub(P.D,P.A));return Math.abs(V3.dot(d,n))<1e-9}};
});
/* SGK 4.46: tứ diện, mặt phẳng qua M song song với AD và BC */
TL11('tl4-tetk',4,'VDC','c',r=>{
  const [pp,qq]=r.pick([[1,2],[2,1],[1,1],[2,3],[3,2]]),F=tuDien(),P={...F.P},t=pp/(pp+qq),u=qq/(pp+qq),kk=Q(qq,pp);
  P.M=V3.lerp(P.A,P.B,t);P.N=V3.lerp(P.A,P.C,t);P.K=V3.lerp(P.C,P.D,u);P.Q=V3.lerp(P.B,P.D,u);
  const cond=pp===qq?`${I('M')} là trung điểm của ${I('AB')}`:pp===1?`${I('BM')} = ${qq}${I('AM')}`:qq===1?`${I('AM')} = ${pp}${I('BM')}`:`${qq}${I('AM')} = ${pp}${I('BM')}`;
  const fig=fig3D(P,F.solid.concat([['M','N'],['N','K']]),F.dashed.concat([['K','Q'],['Q','M']]),['A','B','C','D','M','N','K','Q']);
  return{kind:'tl',title:'Hai đường thẳng song song, thiết diện',parts:[
    {pts:.5,html:`Cho tứ diện ${I('ABCD')}. Trên cạnh ${I('AB')} lấy điểm ${I('M')} sao cho ${cond}. Mặt phẳng ${PLN('P')} đi qua ${I('M')} và song song với hai đường thẳng ${I('AD')}, ${I('BC')}.${fig}Xác định giao điểm ${I('N')} của ${PLN('P')} với ${I('AC')} và giao điểm ${I('K')} của ${PLN('P')} với ${I('CD')}.`},
    {pts:.5,html:`Tính tỉ số ${fr('KC','KD')} và chứng minh thiết diện của tứ diện cắt bởi ${PLN('P')} là hình bình hành.`}],
    sol:[ptxt([[`${PLN('P')} ∥ ${I('BC')} nên ${PLN('P')} cắt ${PLN('ABC')} theo giao tuyến qua ${I('M')} song song với ${I('BC')}, cắt ${I('AC')} tại ${I('N')}.`,.25],
      [`${PLN('P')} ∥ ${I('AD')} nên ${PLN('P')} cắt ${PLN('ACD')} theo giao tuyến qua ${I('N')} song song với ${I('AD')}, cắt ${I('CD')} tại ${I('K')}; tương tự, đường thẳng qua ${I('M')} song song với ${I('AD')} cắt ${I('BD')} tại ${I('Q')}.`,.25]]),
      ptxt([[`${I('MN')} ∥ ${I('BC')} nên ${fr('CN','CA')} = ${fr('BM','BA')} = ${fr(qq,pp+qq)}; ${I('NK')} ∥ ${I('AD')} nên ${fr('CK','CD')} = ${fr('CN','CA')} = ${fr(qq,pp+qq)}. Suy ra ${fr('KC','KD')} = ${qh(kk)}.`,.25],
      [`Thiết diện là tứ giác ${I('MNKQ')} có ${I('MQ')} ∥ ${I('NK')} (cùng song song với ${I('AD')}) và ${I('MN')} ∥ ${I('QK')} (cùng song song với ${I('BC')}) nên là hình bình hành.`,.25]])],
    chk:()=>{const kc=V3.len(V3.sub(P.K,P.C)),kd=V3.len(V3.sub(P.K,P.D));return Math.abs(kc/kd-qv(kk))<1e-9&&V3.len(V3.cross(V3.sub(P.K,P.N),V3.sub(P.D,P.A)))<1e-9&&V3.len(V3.cross(V3.sub(P.Q,P.K),V3.sub(P.C,P.B)))<1e-9}};
});
/* SGK 6.39: vi khuẩn N(t) = N0·e^{rt} */
TL11b('tl11-6-bact',6,'VDC','a',r=>{
  const n0=r.pick([100,200,500,1000]),g=r.pick([1.2,1.25,1.5,1.6,2]),n1=Math.round(n0*g),t1=r.int(3,5),m=r.pick([3,5,10]);
  const Nt=n0*g**t1,Tm=Math.log(m)/Math.log(g),rr=Math.log(g);
  if(Math.abs(Nt-Math.round(Nt))>1e-6&&Math.abs((Nt%1)-.5)<.02)return T.tl['tl11-6-bact'].gen(r);
  const N=I('N'),t=I('t'),e1=`${I('e')}${sup(`${I('r')}${t}`)}`;
  return{kind:'tl',title:'Hàm số mũ trong thực tế',parts:[
    {pts:.5,html:`Giả sử quá trình nuôi cấy vi khuẩn tuân theo quy luật tăng trưởng ${N}(${t}) = ${N}${sub(0)}·${e1}, trong đó ${N}${sub(0)} là số lượng vi khuẩn ban đầu, ${N}(${t}) là số lượng vi khuẩn sau ${t} giờ và ${I('r')} là tỉ lệ tăng trưởng mỗi giờ. Ban đầu có ${n0} con và sau 1 giờ số lượng tăng lên ${n1} con. Tìm ${I('r')} và tính số lượng vi khuẩn sau ${t1} giờ (làm tròn đến hàng đơn vị).`},
    {pts:.5,html:`Sau bao lâu thì số lượng vi khuẩn gấp ${m} lần số lượng ban đầu (làm tròn kết quả đến hàng phần trăm của giờ)?`}],
    sol:[ptxt([[`Ta có ${n1} = ${n0}·${I('e')}${sup(I('r'))} nên ${I('e')}${sup(I('r'))} = ${fmt(g)}, ${I('r')} = ln ${fmt(g)} ≈ ${dd11(rr)}.`,.25],
      [`${N}(${t1}) = ${n0}·${I('e')}${sup(`${t1}${I('r')}`)} = ${n0}·${fmt(g)}${sup(t1)} ≈ ${Math.round(Nt)} (con).`,.25]]),
      ptxt([[`Cần tìm ${t} sao cho ${n0}·${e1} = ${m}·${n0}, tức ${fmt(g)}${sup(t)} = ${m}.`,.25],[`${t} = log${sub(fmt(g))} ${m} = ${fr(`ln ${m}`,`ln ${fmt(g)}`)} ≈ ${dd11(Tm,2)} (giờ).`,.25]])],
    chk:()=>closeN(n0*Math.exp(rr*t1),Nt)&&closeN(g**Tm,m)&&Number.isInteger(n1)};
});
/* SGK 9.31: tiếp tuyến của hyperbol y = a/x tạo với hai trục tam giác có diện tích không đổi */
TL11b('tl11-9-hyp',9,'VDC','b',r=>{
  const a=r.pick([1,2,3,4,6]),x0=r.pick([-3,-2,-1,1,2,3]),kq=Q(-a,x0*x0),mq=Q(2*a,x0),y0=Q(a,x0);
  const kx=qv(kq)===-1?MINUS:qh(kq);
  const line=`${I('y')} = ${kx}${I('x')} ${qv(mq)>0?'+':MINUS} ${qh(Q(Math.abs(2*a),Math.abs(x0)))}`;
  const x=I('x'),y=I('y'),u=I('x')+sub(0);
  return{kind:'tl',title:'Phương trình tiếp tuyến',parts:[
    {pts:.5,html:`Cho hàm số ${y} = ${fr(a,x)} có đồ thị ${PLN('C')}. Viết phương trình tiếp tuyến của ${PLN('C')} tại điểm có hoành độ ${x} = ${sg(x0)}.`},
    {pts:.5,html:`Chứng minh rằng mọi tiếp tuyến của ${PLN('C')} đều tạo với hai trục tọa độ một tam giác có diện tích không đổi. Tính diện tích đó.`}],
    sol:[ptxt([[`${y}′ = ${MINUS}${fr(a,`${x}${sup(2)}`)}, ${y}′(${sg(x0)}) = ${qh(kq)}; ${y}(${sg(x0)}) = ${qh(y0)}.`,.25],[`Tiếp tuyến: ${y} = ${qh(kq)}(${x} ${x0>0?MINUS:'+'} ${Math.abs(x0)}) ${qv(y0)>0?'+':MINUS} ${qh(Q(Math.abs(a),Math.abs(x0)))}, hay ${line}.`,.25]]),
      ptxt([[`Tiếp tuyến tại ${I('M')}(${u}; ${fr(a,u)}) (${u} ≠ 0): ${y} = ${MINUS}${fr(a,`${u}${sup(2)}`)}(${x} ${MINUS} ${u}) + ${fr(a,u)}. Nó cắt ${I('Ox')} tại ${I('A')}(2${u}; 0) và cắt ${I('Oy')} tại ${I('B')}(0; ${fr(2*a,u)}).`,.25],
      [`${I('S')}${sub('OAB')} = ${fr(1,2)}·${I('OA')}·${I('OB')} = ${fr(1,2)}·|2${u}|·${fr(2*a,`|${u}|`)} = ${2*a}, không phụ thuộc vào ${u}.`,.25]])],
    chk:()=>{const f=t=>a/t,d=-a/(x0*x0),xi=x0-f(x0)/d,yi=f(x0)-d*x0;return closeN(xi,2*x0)&&closeN(yi,qv(mq))&&closeN(Math.abs(xi*yi)/2,2*a)}};
});
/* Xác suất "ít nhất một lần": quy tắc nhân cho biến cố độc lập và biến cố đối */
TL11b('tl11-8-atleast',8,'VDC','b',r=>{
  const p=r.pick([0.3,0.4,0.6,0.7,0.8]),q=Math.round((1-p)*10)/10,thr=r.pick([0.99,0.999]),n=Math.ceil(Math.log(1-thr)/Math.log(q)-1e-12);
  if(Math.abs(Math.log(1-thr)/Math.log(q)-Math.round(Math.log(1-thr)/Math.log(q)))<1e-6)return T.tl['tl11-8-atleast'].gen(r);
  const P3=1-q**3,P1=3*p*q*q,f4=v=>dd11(v);
  return{kind:'tl',title:'Quy tắc nhân xác suất và biến cố đối',parts:[
    {pts:.5,html:`Một xạ thủ bắn vào bia một cách độc lập, xác suất bắn trúng của mỗi viên là ${fmt(p)}. Xạ thủ bắn 3 viên. Tính xác suất để có đúng một viên trúng bia và xác suất để có ít nhất một viên trúng bia.`},
    {pts:.5,html:`Xạ thủ phải bắn ít nhất bao nhiêu viên để xác suất có ít nhất một viên trúng bia lớn hơn ${dd11(thr)}?`}],
    sol:[ptxt([[`Xác suất đúng một viên trúng: 3·${fmt(p)}·${fmt(q)}${sup(2)} = ${f4(P1)}.`,.25],[`Biến cố đối của “có ít nhất một viên trúng” là “cả 3 viên đều trượt”, có xác suất ${fmt(q)}${sup(3)}; do đó xác suất cần tìm là 1 ${MINUS} ${fmt(q)}${sup(3)} = ${f4(P3)}.`,.25]]),
      ptxt([[`Bắn ${I('n')} viên, xác suất có ít nhất một viên trúng là 1 ${MINUS} ${fmt(q)}${sup(I('n'))}. Cần 1 ${MINUS} ${fmt(q)}${sup(I('n'))} &gt; ${dd11(thr)} ⇔ ${fmt(q)}${sup(I('n'))} &lt; ${dd11(1-thr)}.`,.25],
      [`⇔ ${I('n')} &gt; log${sub(fmt(q))} ${dd11(1-thr)} ≈ ${dd11(Math.log(1-thr)/Math.log(q),2)}. Vậy phải bắn ít nhất ${n} viên.`,.25]])],
    chk:()=>1-q**n>thr&&1-q**(n-1)<=thr};
});
/* SGK 7.40: hình chóp có đáy tam giác vuông tại B, SA ⊥ (ABC) */
const TRI7_SET=[[3,4],[4,3],[Math.sqrt(3),1],[1,Math.sqrt(3)],[1,1],[2,1]];
TL11b('tl11-7-tri',7,'VD','c',r=>{
  const [s,t]=r.pick(TRI7_SET),SB=Math.hypot(s,t),AH=s*t/SB;
  const P={A:[0,0,0],B:[4.2,0,0],C:[4.2,3.2,0],S:[0,0,4.6]};P.H=V3.lerp(P.S,P.B,(4.6*4.6)/(4.6*4.6+4.2*4.2));
  const E=autoEdges({A:P.A,B:P.B,C:P.C,S:P.S},[['A','B','C'],['S','A','B'],['S','B','C'],['S','C','A']]);
  const fig=fig3D(P,E.solid,E.dashed.concat([['A','H']]),['S','A','B','C','H']);
  const L=v=>{const m={1:'',2:'2',3:'3',4:'4'};if(closeN(v,Math.sqrt(3)))return`${I('a')}${rt(3)}`;if(closeN(v,Math.sqrt(2)))return`${I('a')}${rt(2)}`;if(closeN(v,Math.sqrt(5)))return`${I('a')}${rt(5)}`;if(Number.isInteger(v))return`${m[v]??v}${I('a')}`;return null};
  const ahTxt={'3,4':fr(`12${I('a')}`,5),'4,3':fr(`12${I('a')}`,5),[`${Math.sqrt(3)},1`]:fr(`${I('a')}${rt(3)}`,2),[`1,${Math.sqrt(3)}`]:fr(`${I('a')}${rt(3)}`,2),'1,1':fr(`${I('a')}${rt(2)}`,2),'2,1':fr(`2${I('a')}${rt(5)}`,5)}[`${s},${t}`];
  return{kind:'tl',title:'Hai mặt phẳng vuông góc, khoảng cách',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABC')} có đáy ${I('ABC')} là tam giác vuông tại ${I('B')}, ${I('SA')} ⊥ ${PLN('ABC')}, ${I('SA')} = ${L(s)}, ${I('AB')} = ${L(t)}.${fig}Chứng minh ${I('BC')} ⊥ ${PLN('SAB')} và ${PLN('SBC')} ⊥ ${PLN('SAB')}.`},
    {pts:.5,html:`Gọi ${I('H')} là hình chiếu vuông góc của ${I('A')} trên ${I('SB')}. Chứng minh ${I('AH')} ⊥ ${PLN('SBC')} và tính khoảng cách từ ${I('A')} đến mặt phẳng ${PLN('SBC')}.`}],
    sol:[ptxt([[`${I('BC')} ⊥ ${I('AB')} (tam giác ${I('ABC')} vuông tại ${I('B')}) và ${I('BC')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PLN('ABC')}) nên ${I('BC')} ⊥ ${PLN('SAB')}.`,.25],[`Mặt phẳng ${PLN('SBC')} chứa ${I('BC')} ⊥ ${PLN('SAB')} nên ${PLN('SBC')} ⊥ ${PLN('SAB')}.`,.25]]),
      ptxt([[`${I('AH')} ⊂ ${PLN('SAB')} nên ${I('AH')} ⊥ ${I('BC')}; lại có ${I('AH')} ⊥ ${I('SB')} nên ${I('AH')} ⊥ ${PLN('SBC')}, do đó ${I('d')}(${I('A')}, ${PLN('SBC')}) = ${I('AH')}.`,.25],
      [`Trong tam giác ${I('SAB')} vuông tại ${I('A')}: ${I('SB')} = ${L(SB)}, ${I('AH')} = ${fr(`${I('SA')}·${I('AB')}`,'SB')} = ${ahTxt}.`,.25]])],
    chk:()=>closeN(AH,s*t/SB)&&L(SB)!==null&&!!ahTxt};
});
