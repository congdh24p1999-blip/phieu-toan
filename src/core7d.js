/* ===== Toán 7: bổ sung sau khi đối chiếu bài tập SGK Kết nối tri thức ===== */
/* SGK 7.44: tìm đa thức B sao cho A + B = C hoặc A − B = C */
N7b('m7-7-find',7,'TH',r=>{
  const A=P1(rcoef(r),rcoef(r),rcoef(r),rcoef(r,-5,5)),C=P1(rcoef(r),rcoef(r),rcoef(r),rcoef(r,-5,5)),plus=r.int(0,1)===1;
  const B=plus?Pl.sub(C,A):Pl.sub(A,C),wr=plus?[Pl.sub(A,C),Pl.add(A,C)]:[Pl.sub(C,A),Pl.add(A,C)];
  return mkPoly(r,{stem:`Cho ${I('A')}(${I('x')}) = ${ph(A)} và ${I('C')}(${I('x')}) = ${ph(C)}. Đa thức ${I('B')}(${I('x')}) thỏa mãn ${I('A')}(${I('x')}) ${plus?'+':MINUS} ${I('B')}(${I('x')}) = ${I('C')}(${I('x')}) là`,correct:B,wrongs:wr,
    sol:`${I('B')}(${I('x')}) = ${plus?`${I('C')}(${I('x')}) ${MINUS} ${I('A')}(${I('x')})`:`${I('A')}(${I('x')}) ${MINUS} ${I('C')}(${I('x')})`} = ${ph(B)}.`,
    chk:()=>[-2,0,1,3].every(x=>(plus?ev1(A,x)+ev1(B,x):ev1(A,x)-ev1(B,x))===ev1(C,x))});
});
/* SGK 7.43: a + b + c = 0 thì x = 1 là nghiệm của ax² + bx + c */
TL7b('tl7-7-abc',7,'VDC','alg',r=>{
  const p=r.int(1,4);let s;do{s=r.nz(-9,9)}while(s===p);/* nghiệm thứ hai s/p */
  const q=-(p+s),G=P1(s,q,p),t=Q(s,p),F=I('F'),Gx=`${I('G')}(${I('x')})`;
  const lin=`${p===1?'':p}${I('x')} ${s<0?'+':MINUS} ${Math.abs(s)}`;
  return{kind:'tl',title:'Nghiệm của đa thức bậc hai',parts:[
    {pts:.5,html:`Cho đa thức ${F}(${I('x')}) = ${I('a')}${I('x')}${sup(2)} + ${I('b')}${I('x')} + ${I('c')} (${I('a')} ≠ 0). Giải thích tại sao nếu ${I('a')} + ${I('b')} + ${I('c')} = 0 thì ${I('x')} = 1 là một nghiệm của ${F}(${I('x')}).`},
    {pts:.5,html:`Áp dụng: cho ${Gx} = ${ph(G)}. Chứng tỏ ${Gx} = (${I('x')} ${MINUS} 1)(${lin}) và tìm tất cả các nghiệm của ${Gx}.`}],
    sol:[ptxt([[`${F}(1) = ${I('a')}·1${sup(2)} + ${I('b')}·1 + ${I('c')} = ${I('a')} + ${I('b')} + ${I('c')}.`,.25],[`Vì ${I('a')} + ${I('b')} + ${I('c')} = 0 nên ${F}(1) = 0, do đó ${I('x')} = 1 là một nghiệm của ${F}(${I('x')}).`,.25]]),
      ptxt([[`(${I('x')} ${MINUS} 1)(${lin}) = ${p===1?'':p}${I('x')}${sup(2)} ${s<0?'+':MINUS} ${Math.abs(s)}${I('x')} ${MINUS} ${p===1?'':p}${I('x')} ${s<0?MINUS:'+'} ${Math.abs(s)} = ${ph(G)} = ${Gx}.`,.25],
      [`${Gx} = 0 khi ${I('x')} ${MINUS} 1 = 0 hoặc ${lin} = 0, tức ${I('x')} = 1 hoặc ${I('x')} = ${qh(t)}. Vậy ${Gx} có hai nghiệm là 1 và ${qh(t)}.`,.25]])],
    chk:()=>ev1(G,1)===0&&closeN(ev1(G,qv(t)),0)&&[-3,0,2,5].every(x=>ev1(G,x)===(x-1)*(p*x-s))};
});
/* SGK 6.38: chia tỉ lệ nghịch */
const INV7=[[4,5,6],[2,3,4],[3,4,6],[4,6,8],[6,8,12],[3,5,6],[2,4,5]];
TL7b('tl7-6-inv',6,'VD','real',r=>{
  const d=r.pick(INV7),L=d.reduce((a,b)=>a*b/gcd(a,b)),m=r.int(1,3),c=L*m,w=d.map(v=>c/v),k=w[0]-w[1];
  const ctx=r.pick([['đội công nhân làm đường','người','ngày'],['đội công nhân sửa đường','người','ngày'],['tổ máy cày (các máy có cùng năng suất) cày ba cánh đồng có cùng diện tích','máy','giờ']]);
  const team=ctx[0].includes('máy cày')?'tổ':'đội';
  const stem=team==='tổ'?`Ba ${ctx[0]}. Tổ thứ nhất cày xong trong ${d[0]} ${ctx[2]}, tổ thứ hai trong ${d[1]} ${ctx[2]}, tổ thứ ba trong ${d[2]} ${ctx[2]}. Biết tổ thứ nhất có nhiều hơn tổ thứ hai ${k} ${ctx[1]}.`
    :`Ba ${ctx[0]} được giao ba khối lượng công việc như nhau. Đội thứ nhất hoàn thành trong ${d[0]} ${ctx[2]}, đội thứ hai trong ${d[1]} ${ctx[2]}, đội thứ ba trong ${d[2]} ${ctx[2]}. Biết đội thứ nhất nhiều hơn đội thứ hai ${k} ${ctx[1]} và năng suất của mỗi ${ctx[1]} là như nhau.`;
  const [x,y,z]=['x','y','z'].map(I);
  return{kind:'tl',title:'Đại lượng tỉ lệ nghịch',parts:[
    {pts:.5,html:`${stem} Gọi số ${ctx[1]} của ba ${team} lần lượt là ${x}, ${y}, ${z}. Giải thích vì sao ${d[0]}${x} = ${d[1]}${y} = ${d[2]}${z}.`},
    {pts:.5,html:`Tính số ${ctx[1]} của mỗi ${team}.`}],
    sol:[ptxt([[`Với cùng một khối lượng công việc, số ${ctx[1]} và thời gian hoàn thành là hai đại lượng tỉ lệ nghịch.`,.25],[`Do đó ${d[0]}${x} = ${d[1]}${y} = ${d[2]}${z}; chia các vế cho ${L} được ${fr(x,L/d[0])} = ${fr(y,L/d[1])} = ${fr(z,L/d[2])}.`,.25]]),
      ptxt([[`Áp dụng tính chất dãy tỉ số bằng nhau: ${fr(x,L/d[0])} = ${fr(y,L/d[1])} = ${fr(`${x} ${MINUS} ${y}`,`${L/d[0]} ${MINUS} ${L/d[1]}`)} = ${fr(k,L/d[0]-L/d[1])} = ${m}.`,.25],
      [`Suy ra ${x} = ${m}·${L/d[0]} = ${w[0]}, ${y} = ${m}·${L/d[1]} = ${w[1]}, ${z} = ${m}·${L/d[2]} = ${w[2]}. Vậy ba ${team} lần lượt có ${w[0]}, ${w[1]}, ${w[2]} ${ctx[1]}.`,.25]])],
    chk:()=>w.every(Number.isInteger)&&k>0&&w[0]*d[0]===w[2]*d[2]&&k/(L/d[0]-L/d[1])===m};
});
/* SGK 8.15: tấm bìa quay */
N7b('m7-8-wheel',8,'TH',r=>{
  const n=r.pick([6,8,10,12]),f=r.pick([['ghi số lẻ',v=>v%2===1],['ghi số chẵn',v=>v%2===0],['ghi số chia hết cho 3',v=>v%3===0],['ghi số lớn hơn 4',v=>v>4],['ghi số nhỏ hơn 3',v=>v<3]]),c=[...Array(n)].map((_,i)=>i+1).filter(f[1]).length;
  return mkF(r,{stem:`Một tấm bìa hình tròn được chia thành ${n} hình quạt bằng nhau, ghi các số 1; 2; …; ${n}, gắn vào trục quay có mũi tên cố định ở tâm. Quay tấm bìa một lần. Xác suất để mũi tên chỉ vào hình quạt ${f[0]} là`,correct:Q(c,n),cands:[Q(1,n),Q(n-c,n),Q(c,n+1),Q(c+1,n),Q(c,n-1)].filter(q=>!qeq(q,Q(c,n))),
    sol:`Có ${n} kết quả đồng khả năng; có ${c} hình quạt ${f[0]}. Xác suất là ${fr(c,n)} = ${qh(Q(c,n))}.`});
});
/* SGK 9.36: góc tù, DE < BC */
TL7b('tl7-9-obt',9,'VDC','geo',r=>{
  const Pt={B:[0,0],C:[6,0],A:[r.pick([2.4,2.8,3.2]),r.pick([1.5,1.7,1.9])]};
  const lerp=(P,Q2,t)=>[P[0]+(Q2[0]-P[0])*t,P[1]+(Q2[1]-P[1])*t];Pt.D=lerp(Pt.A,Pt.B,r.pick([.45,.55])),Pt.E=lerp(Pt.A,Pt.C,r.pick([.4,.5]));
  const fig=fig2D(Pt,[['A','B'],['B','C'],['C','A'],['D','E'],['B','E']],{off:{A:[0,-6]}});
  return{kind:'tl',title:'Quan hệ giữa góc và cạnh đối diện',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} có ${ANG('BAC')} là góc tù. Lấy điểm ${I('D')} nằm giữa ${I('A')} và ${I('B')}, điểm ${I('E')} nằm giữa ${I('A')} và ${I('C')}.${fig}Chứng minh ${ANG('BDE')} là góc tù, từ đó suy ra ${I('DE')} &lt; ${I('BE')}.`},
    {pts:.5,html:`Chứng minh ${I('BE')} &lt; ${I('BC')}, từ đó suy ra ${I('DE')} &lt; ${I('BC')}.`}],
    sol:[ptxt([[`${ANG('BDE')} là góc ngoài tại đỉnh ${I('D')} của tam giác ${I('ADE')} nên ${ANG('BDE')} = ${ANG('DAE')} + ${ANG('AED')} &gt; ${ANG('DAE')} &gt; 90°, tức ${ANG('BDE')} là góc tù.`,.25],
      [`Trong tam giác ${I('BDE')}, ${ANG('BDE')} tù nên là góc lớn nhất, cạnh đối diện ${I('BE')} là cạnh lớn nhất; do đó ${I('DE')} &lt; ${I('BE')}.`,.25]]),
      ptxt([[`Tương tự, ${ANG('BEC')} là góc ngoài tại đỉnh ${I('E')} của tam giác ${I('ABE')} nên ${ANG('BEC')} &gt; ${ANG('BAE')} &gt; 90°; trong tam giác ${I('BEC')} cạnh ${I('BC')} đối diện góc tù nên ${I('BE')} &lt; ${I('BC')}.`,.25],
      [`Từ ${I('DE')} &lt; ${I('BE')} và ${I('BE')} &lt; ${I('BC')} suy ra ${I('DE')} &lt; ${I('BC')}.`,.25]])],
    chk:()=>{const d=(P,Q2)=>Math.hypot(P[0]-Q2[0],P[1]-Q2[1]),ab=[Pt.B[0]-Pt.A[0],Pt.B[1]-Pt.A[1]],ac=[Pt.C[0]-Pt.A[0],Pt.C[1]-Pt.A[1]];return ab[0]*ac[0]+ab[1]*ac[1]<0&&d(Pt.D,Pt.E)<d(Pt.B,Pt.E)&&d(Pt.B,Pt.E)<d(Pt.B,Pt.C)}};
});
