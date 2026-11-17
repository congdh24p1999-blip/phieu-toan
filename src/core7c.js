/* ===== Bổ sung tự luận vận dụng cao lớp 7 ===== */
TL7('tl7-3-bis',3,'VDC','geo',r=>{
  const al=r.int(5,30)*4,be=180-al;
  return{kind:'tl',title:'Hai đường thẳng song song',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hai đường thẳng song song ${I('a')} và ${I('b')}. Một đường thẳng ${I('c')} cắt ${I('a')} tại ${I('A')}, cắt ${I('b')} tại ${I('B')}. Trên ${I('a')} lấy tia ${I('Ax')}, trên ${I('b')} lấy tia ${I('By')} nằm cùng phía đối với đường thẳng ${I('c')}, biết ${ANG('xAB')} = ${al}°. Tính số đo ${ANG('yBA')}.`},
    {pts:.5,html:`Tia phân giác của ${ANG('xAB')} và tia phân giác của ${ANG('yBA')} cắt nhau tại ${I('C')}. Qua ${I('C')} kẻ đường thẳng ${I('d')} song song với ${I('a')}. Tính số đo ${ANG('ACB')}.`}],
    sol:[ptxt([[`${ANG('xAB')} và ${ANG('yBA')} là hai góc trong cùng phía tạo bởi đường thẳng ${I('c')} cắt hai đường thẳng song song nên ${ANG('xAB')} + ${ANG('yBA')} = 180°.`,.25],[`${ANG('yBA')} = 180° ${MINUS} ${al}° = ${be}°.`,.25]]),
      ptxt([[`${I('d')} // ${I('a')} và ${I('a')} // ${I('b')} nên ${I('d')} // ${I('b')}. Theo tính chất so le trong: góc giữa ${I('CA')} và ${I('d')} bằng ${ANG('xAC')} = ${al/2}°, góc giữa ${I('CB')} và ${I('d')} bằng ${ANG('yBC')} = ${be/2}°.`,.25],[`${ANG('ACB')} = ${al/2}° + ${be/2}° = 90°.`,.25]])],
    chk:()=>al+be===180&&al/2+be/2===90};
});
TL7('tl7-3-conv',3,'VDC','geo',r=>{
  const al=r.int(5,14)*5,be=r.int(5,14)*5;
  return{kind:'tl',title:'Dấu hiệu nhận biết hai đường thẳng song song',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình vẽ, biết ${ANG('xAO')} = ${al}°, ${ANG('yBO')} = ${be}° và ${ANG('AOB')} = ${al+be}°.${zigFig()}Vẽ tia ${I('Oz')} nằm trong ${ANG('AOB')} sao cho ${ANG('AOz')} = ${al}°. Chứng minh ${I('Oz')} // ${I('Ax')}.`},
    {pts:.5,html:`Chứng minh ${I('a')} // ${I('b')}.`}],
    sol:[ptxt([[`${ANG('AOz')} = ${ANG('xAO')} = ${al}°, hai góc này ở vị trí so le trong.`,.25],[`Do đó ${I('Oz')} // ${I('Ax')}, tức ${I('Oz')} // ${I('a')}.`,.25]]),
      ptxt([[`${ANG('zOB')} = ${ANG('AOB')} ${MINUS} ${ANG('AOz')} = ${al+be}° ${MINUS} ${al}° = ${be}° = ${ANG('yBO')}, hai góc so le trong nên ${I('Oz')} // ${I('b')}.`,.25],[`${I('a')} và ${I('b')} cùng song song với ${I('Oz')} nên ${I('a')} // ${I('b')}.`,.25]])],
    chk:()=>true};
});
TL7('tl7-4-bis',4,'VDC','geo',r=>{
  const c=r.int(3,9),b=c+r.int(1,6);
  return{kind:'tl',title:'Tam giác bằng nhau',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c} cm, ${I('AC')} = ${b} cm. Tia phân giác của ${ANG('BAC')} cắt ${I('BC')} tại ${I('D')}. Trên cạnh ${I('AC')} lấy điểm ${I('E')} sao cho ${I('AE')} = ${I('AB')}. Chứng minh ${I('ΔABD')} = ${I('ΔAED')} và tính độ dài ${I('EC')}.`},
    {pts:.5,html:`Gọi ${I('K')} là giao điểm của ${I('AD')} và ${I('BE')}. Chứng minh ${I('AD')} ⊥ ${I('BE')}.`}],
    sol:[ptxt([[`Xét ${I('ΔABD')} và ${I('ΔAED')}: ${I('AB')} = ${I('AE')}, ${ANG('BAD')} = ${ANG('EAD')} (${I('AD')} là phân giác), ${I('AD')} chung. Do đó ${I('ΔABD')} = ${I('ΔAED')} (c.g.c).`,.25],[`${I('EC')} = ${I('AC')} ${MINUS} ${I('AE')} = ${b} ${MINUS} ${c} = ${b-c} cm.`,.25]]),
      ptxt([[`Xét ${I('ΔABK')} và ${I('ΔAEK')}: ${I('AB')} = ${I('AE')}, ${ANG('BAK')} = ${ANG('EAK')}, ${I('AK')} chung nên ${I('ΔABK')} = ${I('ΔAEK')} (c.g.c), suy ra ${ANG('AKB')} = ${ANG('AKE')}.`,.25],[`Hai góc này kề bù và bằng nhau nên bằng 90°. Vậy ${I('AD')} ⊥ ${I('BE')}.`,.25]])],
    chk:()=>b>c};
});
TL7('tl7-4-isos',4,'VDC','geo',r=>{
  const B=r.int(10,17)*5;
  return{kind:'tl',title:'Tam giác bằng nhau',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} cân tại ${I('A')} có ${ANG('ABC')} = ${B}°. Trên tia đối của tia ${I('BC')} lấy điểm ${I('D')}, trên tia đối của tia ${I('CB')} lấy điểm ${I('E')} sao cho ${I('BD')} = ${I('CE')}. Tính ${ANG('ABD')} và chứng minh ${I('ΔABD')} = ${I('ΔACE')}.`},
    {pts:.5,html:`Kẻ ${I('BH')} ⊥ ${I('AD')} (${I('H')} thuộc ${I('AD')}), ${I('CK')} ⊥ ${I('AE')} (${I('K')} thuộc ${I('AE')}). Chứng minh ${I('BH')} = ${I('CK')}.`}],
    sol:[ptxt([[`${ANG('ABD')} = 180° ${MINUS} ${B}° = ${180-B}° (kề bù); tương tự ${ANG('ACE')} = ${180-B}°.`,.25],[`Xét ${I('ΔABD')} và ${I('ΔACE')}: ${I('AB')} = ${I('AC')}, ${ANG('ABD')} = ${ANG('ACE')}, ${I('BD')} = ${I('CE')}. Do đó ${I('ΔABD')} = ${I('ΔACE')} (c.g.c).`,.25]]),
      ptxt([[`Từ câu a) có ${ANG('ADB')} = ${ANG('AEC')}.`,.25],[`Hai tam giác vuông ${I('HBD')} và ${I('KCE')} có cạnh huyền ${I('BD')} = ${I('CE')} và góc nhọn ${ANG('HDB')} = ${ANG('KEC')} nên bằng nhau (cạnh huyền – góc nhọn). Suy ra ${I('BH')} = ${I('CK')}.`,.25]])],
    chk:()=>B<90};
});
TL7b('tl7-7-div',7,'VDC','alg',r=>{
  const s=r.int(-4,4),p=r.int(-6,6),k=r.nz(-3,3),A=[1,-s,p,0];
  const qt=[1,k-s,k*k-s*k+p],R=k*k*k-s*k*k+p*k;
  const xx=I('x'),mm=I('m');
  const Ah=`${polyH([1,-s,p])}${''}`;/* x³ − s x² + p x */
  const A0=polyH([1,-s,p,0]);
  return{kind:'tl',title:'Phép chia đa thức một biến',parts:[
    {pts:.5,html:`Cho đa thức ${I('A')}(${xx}) = ${A0}. Thực hiện phép chia ${I('A')}(${xx}) cho ${xlin(1,-k)}, tìm thương và dư.`},
    {pts:.5,html:`Tìm giá trị của ${mm} để đa thức ${A0} + ${mm} chia hết cho ${xlin(1,-k)}.`}],
    sol:[ptxt([[`Đặt tính chia, ta được thương ${polyH(qt)}.`,.25],[`Số dư là ${sg(R)}, tức ${I('A')}(${xx}) = (${xlin(1,-k)})(${polyH(qt)}) ${R<0?MINUS:'+'} ${Math.abs(R)}.`,.25]]),
      ptxt([[`${A0} + ${mm} = (${xlin(1,-k)})(${polyH(qt)}) + ${R===0?'':`${sg(R)} + `}${mm}.`.replace('+ −','− '),.25],[`Đa thức chia hết cho ${xlin(1,-k)} khi số dư bằng 0: ${R===0?'':`${sg(R)} + `}${mm} = 0 ⟺ ${mm} = ${sg(-R)}.`,.25]])],
    chk:()=>[-2,0,1,3,5].every(x=>pe(A,x)===(x-k)*pe(qt,x)+R)};
});
TL7b('tl7-7-sum',7,'VDC','alg',r=>{
  const c=r.pick([-6,-5,-4,-3,-2,2,3,4,5,6,7]),b=-1-c,P=[1,b,c],xx=I('x');
  return{kind:'tl',title:'Nghiệm của đa thức một biến',parts:[
    {pts:.5,html:`Cho đa thức ${I('P')}(${xx}) = ${polyH(P)}. Chứng tỏ ${xx} = 1 là một nghiệm của ${I('P')}(${xx}).`},
    {pts:.5,html:`Chứng minh ${I('P')}(${xx}) = (${xx} ${MINUS} 1)(${xlin(1,-c)}) và tìm tất cả các nghiệm của ${I('P')}(${xx}).`}],
    sol:[ptxt([[`${I('P')}(1) = 1 ${b<0?MINUS:'+'} ${Math.abs(b)} ${c<0?MINUS:'+'} ${Math.abs(c)}`,.25],[`= 0, nên ${xx} = 1 là một nghiệm của ${I('P')}(${xx}).`,.25]]),
      ptxt([[`(${xx} ${MINUS} 1)(${xlin(1,-c)}) = ${xx}${sup(2)} ${MINUS} ${xx} ${c<0?'+':MINUS} ${Math.abs(c)}${xx} ${c<0?MINUS:'+'} ${Math.abs(c)} = ${polyH(P)} = ${I('P')}(${xx}).`,.25],[`${I('P')}(${xx}) = 0 ⟺ ${xx} = 1 hoặc ${xx} = ${sg(c)}. Vậy ${I('P')}(${xx}) có hai nghiệm 1 và ${sg(c)}.`,.25]])],
    chk:()=>pe(P,1)===0&&pe(P,c)===0&&c!==1};
});
