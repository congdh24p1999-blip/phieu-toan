/* ===== Bổ sung lớp 11 học kì II: câu nhận biết chương IX (đạo hàm) và vận dụng cao chương VI ===== */
N11e('m11-9-basic',9,'NB',r=>{
  const f=r.int(0,3),y=I('y');let fn,ok,wr;
  if(f===0){const n=r.int(3,9);fn=`${X9}${sup(n)}`;ok=`${n}${X9}${sup(n-1)}`;wr=[`${X9}${sup(n-1)}`,`${n}${X9}${sup(n)}`,`${n-1}${X9}${sup(n)}`,`${n}${X9}${sup(n+1)}`]}
  else if(f===1){fn=rt(X9);ok=fr(1,`2${rt(X9)}`);wr=[fr(1,rt(X9)),`2${rt(X9)}`,MINUS+fr(1,`2${rt(X9)}`),fr(rt(X9),2)]}
  else if(f===2){fn=fr(1,X9);ok=MINUS+fr(1,`${X9}${sup(2)}`);wr=[fr(1,`${X9}${sup(2)}`),MINUS+fr(1,X9),fr(1,`2${X9}`),`${X9}${sup(2)}`]}
  else{const c=r.int(2,9);fn=String(c);ok='0';wr=[String(c),'1',`${c}${X9}`,String(c-1)]}
  return mkTxt(r,{stem:`Đạo hàm của hàm số ${y} = ${fn} là`,correct:`${YP} = ${ok}`,wrongs:wr.map(w=>`${YP} = ${w}`),
    sol:`Theo công thức đạo hàm của các hàm số thường gặp: ${YP} = ${ok}.`,chk:()=>true});
},'hh');
N11e('m11-9-tfun',9,'NB',r=>{
  const L=[
    [`sin ${X9}`,`cos ${X9}`,[`${MINUS}cos ${X9}`,`${MINUS}sin ${X9}`,`sin ${X9}`]],
    [`cos ${X9}`,`${MINUS}sin ${X9}`,[`sin ${X9}`,`cos ${X9}`,`${MINUS}cos ${X9}`]],
    [`tan ${X9}`,fr(1,`cos${sup(2)} ${X9}`),[MINUS+fr(1,`cos${sup(2)} ${X9}`),fr(1,`sin${sup(2)} ${X9}`),`cot ${X9}`]],
    [`cot ${X9}`,MINUS+fr(1,`sin${sup(2)} ${X9}`),[fr(1,`sin${sup(2)} ${X9}`),MINUS+fr(1,`cos${sup(2)} ${X9}`),`${MINUS}tan ${X9}`]],
    [`e${sup(X9)}`,`e${sup(X9)}`,[`${X9}e${sup(`${X9} ${MINUS} 1`)}`,`e${sup(`${X9} ${MINUS} 1`)}`,fr(`e${sup(X9)}`,X9)]],
    [`ln ${X9}`,fr(1,X9),[`${MINUS}${fr(1,X9)}`,fr(1,`${X9}${sup(2)}`),`e${sup(X9)}`]]];
  const [fn,ok,wr]=r.pick(L);
  return mkTxt(r,{stem:`Đạo hàm của hàm số ${I('y')} = ${fn} là`,correct:`${YP} = ${ok}`,wrongs:wr.map(w=>`${YP} = ${w}`).concat([`${YP} = ${fn}`].filter(z=>z!==`${YP} = ${ok}`)),
    sol:`Theo bảng đạo hàm của các hàm số sơ cấp cơ bản: (${fn})′ = ${ok}.`,chk:()=>true});
},'hh');
N11e('m11-9-mean',9,'NB',r=>{
  const t0=I('t')+sub(0),x0=X9+sub(0),s=`${I('s')} = ${I('f')}(${I('t')})`;
  const q=r.pick([
    {st:`Một vật chuyển động thẳng có phương trình ${s} (${I('s')} tính bằng mét, ${I('t')} tính bằng giây). Vận tốc tức thời của vật tại thời điểm ${t0} là`,ok:fp(t0),wr:[`${I('f')}(${t0})`,fpp(t0),fr(`${I('f')}(${t0})`,t0)]},
    {st:`Một vật chuyển động thẳng có phương trình ${s}. Gia tốc tức thời của vật tại thời điểm ${t0} là`,ok:fpp(t0),wr:[fp(t0),`${I('f')}(${t0})`,fr(fp(t0),t0)]},
    {st:`Cho hàm số ${I('y')} = ${FX} có đạo hàm tại ${x0}. Hệ số góc của tiếp tuyến của đồ thị hàm số tại điểm ${I('M')}(${x0}; ${I('f')}(${x0})) là`,ok:fp(x0),wr:[`${I('f')}(${x0})`,`${MINUS}${fp(x0)}`,fr(1,fp(x0))]}]);
  return mkTxt(r,{stem:q.st,correct:q.ok,wrongs:q.wr,sol:`Theo ý nghĩa vật lí và ý nghĩa hình học của đạo hàm, đáp án là ${q.ok}.`,chk:()=>true});
},'dn');
DS11e('ds11-9-basic',9,'NB',r=>{
  const n=r.int(3,8),c=r.int(2,9);
  const pool=[
    {t:`(${X9}${sup(n)})′ = ${n}${X9}${sup(n-1)}.`,f:`(${X9}${sup(n)})′ = ${n}${X9}${sup(n)}.`,why:`(${X9}${sup('n')})′ = ${I('n')}${X9}${sup(`${I('n')} ${MINUS} 1`)}.`},
    {t:`(${c})′ = 0.`,f:`(${c})′ = ${c}.`,why:`Đạo hàm của hằng số bằng 0.`},
    {t:`(${rt(X9)})′ = ${fr(1,`2${rt(X9)}`)} với ${X9} > 0.`,f:`(${rt(X9)})′ = ${fr(1,rt(X9))} với ${X9} > 0.`,why:`(${rt(X9)})′ = ${fr(1,`2${rt(X9)}`)}.`},
    {t:`(sin ${X9})′ = cos ${X9}.`,f:`(sin ${X9})′ = ${MINUS}cos ${X9}.`,why:`(sin ${X9})′ = cos ${X9}.`},
    {t:`(cos ${X9})′ = ${MINUS}sin ${X9}.`,f:`(cos ${X9})′ = sin ${X9}.`,why:`(cos ${X9})′ = ${MINUS}sin ${X9}.`},
    {t:`(e${sup(X9)})′ = e${sup(X9)}.`,f:`(e${sup(X9)})′ = ${X9}e${sup(`${X9} ${MINUS} 1`)}.`,why:`(e${sup(X9)})′ = e${sup(X9)}.`},
    {t:`(ln ${X9})′ = ${fr(1,X9)} với ${X9} > 0.`,f:`(ln ${X9})′ = e${sup(X9)} với ${X9} > 0.`,why:`(ln ${X9})′ = ${fr(1,X9)}.`}];
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:r.shuffle(pool).slice(0,4)});
},'hh');
TL11b('tl11-6-vdc2',6,'VDC','a',r=>{
  const A=r.pick([50,100,200,300,500]),rp=r.pick([5,6,7,8]),n=r.pick([3,4,5]),k=r.pick([1.5,2]);
  const q=1+rp/100,T1=A*q**n,N=Math.ceil(Math.log(k)/Math.log(q)-1e-12),lg=Math.log(k)/Math.log(q);
  const R2=v=>fmt(Math.round(v*100)/100);
  return{kind:'tl',title:'Bài toán lãi kép',parts:[
    {pts:.5,html:`Bác An gửi ${A} triệu đồng vào ngân hàng theo thể thức lãi kép, kì hạn 1 năm, lãi suất ${rp}%/năm (tiền lãi mỗi năm được nhập vào gốc, không rút tiền trong thời gian gửi). Tính số tiền bác An nhận được sau ${n} năm (làm tròn đến hàng phần trăm của triệu đồng).`},
    {pts:.5,html:`Sau ít nhất bao nhiêu năm thì số tiền bác An nhận được (cả gốc và lãi) không ít hơn ${k===2?'gấp đôi':fmt(k)+' lần'} số tiền gửi ban đầu?`}],
    sol:[ptxt([[`Sau ${I('n')} năm số tiền là ${I('T')} = ${A}(1 + ${fmt(rp/100)})${sup(I('n'))} = ${A}·${fmt(q)}${sup(I('n'))} (triệu đồng).`,.25],[`Với ${I('n')} = ${n}: ${I('T')} = ${A}·${fmt(q)}${sup(n)} ≈ ${R2(T1)} triệu đồng.`,.25]]),
      ptxt([[`Cần ${A}·${fmt(q)}${sup(I('n'))} ≥ ${fmt(k)}·${A} ⟺ ${fmt(q)}${sup(I('n'))} ≥ ${fmt(k)} ⟺ ${I('n')} ≥ log${sub(fmt(q))} ${fmt(k)} ≈ ${R2(lg)}.`,.25],[`${I('n')} là số tự nhiên nhỏ nhất thỏa mãn nên ${I('n')} = ${N}. Vậy sau ít nhất ${N} năm.`,.25]])],
    chk:()=>q**N>=k-1e-12&&q**(N-1)<k};
});
TL11('tl4-third',4,'VDC','c',r=>{
  const F=chopHBH(),P0=F.P,[U,V]=r.pick([['A','C'],['B','D']]),[X,Y]=r.shuffle(U==='A'?['B','D']:['A','C']);
  const [m,n]=r.pick([['M','N'],['E','F']]);
  const P={...P0};P.O=V3.mid(P0.A,P0.C);P[m]=V3.mid(P0.S,P0[U]);P[n]=V3.mid(P0.S,P0[V]);P.I=V3.mid(P0.S,P.O);P.P=V3.lerp(P0.S,P0[Y],1/3);
  const fig=fig3D(P,F.solid,F.dashed.concat([[m,n],['S','O'],[X,'P']]),['S','A','B','C','D','O',m,n,'I','P']);
  const pl=PLN(X+m+n);
  return{kind:'tl',title:'Giao điểm và tỉ số đoạn thẳng',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành tâm ${I('O')}. Gọi ${I(m)}, ${I(n)} lần lượt là trung điểm của ${I('S'+U)}, ${I('S'+V)}.${fig}Chứng minh ${I(m+n)} ∥ ${PLN('ABCD')} và ${I(m+n)} cắt ${I('SO')} tại trung điểm ${I('I')} của ${I('SO')}.`},
    {pts:.5,html:`Tìm giao điểm ${I('P')} của đường thẳng ${I('S'+Y)} với mặt phẳng ${pl}. Tính tỉ số ${fr('SP','S'+Y)}.`}],
    sol:[ptxt([[`${I(m+n)} là đường trung bình của tam giác ${I('S'+U+V)} nên ${I(m+n)} ∥ ${I(U+V)}; mà ${I(U+V)} ⊂ ${PLN('ABCD')}, ${I(m+n)} ⊄ ${PLN('ABCD')} nên ${I(m+n)} ∥ ${PLN('ABCD')}.`,.25],[`Trong tam giác ${I('S'+U+'O')}, đường thẳng qua trung điểm ${I(m)} của ${I('S'+U)} và song song với ${I(U+'O')} cắt ${I('SO')} tại trung điểm ${I('I')} của ${I('SO')}; vậy ${I(m+n)} cắt ${I('SO')} tại ${I('I')}.`,.25]]),
      ptxt([[`Trong ${PLN('S'+X+Y)}, gọi ${I('P')} = ${I(X+'I')} ∩ ${I('S'+Y)}. Vì ${I('P')} ∈ ${I(X+'I')} ⊂ ${pl} nên ${I('P')} là giao điểm của ${I('S'+Y)} và ${pl}.`,.25],[`Kẻ ${I('OK')} ∥ ${I(X+'P')} (${I('K')} ∈ ${I('S'+Y)}): ${I('OK')} là đường trung bình của tam giác ${I(Y+X+'P')} nên ${I('K')} là trung điểm ${I('P'+Y)}; ${I('IP')} ∥ ${I('OK')} và ${I('I')} là trung điểm ${I('SO')} nên ${I('P')} là trung điểm ${I('SK')}. Do đó ${I('SP')} = ${I('PK')} = ${I('K'+Y)}, ${fr('SP','S'+Y)} = ${fr(1,3)}.`,.25]])],
    chk:()=>{const a=V3.sub(P.I,P0[X]),b=V3.sub(P.P,P0[X]);return V3.len(V3.cross(a,b))<1e-9}};
});
