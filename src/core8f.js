/* ===== Bổ sung tự luận hình học lớp 8 học kì I (tứ giác, đường trung bình) và vận dụng cao chương VII ===== */
TL('tl-geo-midq',4,'VDC','geo',r=>{
  const mode=r.pick(['perp','eq']),p=r.int(3,12)*2,q=r.int(3,12)*2;
  const partB=mode==='perp'?`Biết ${I('AC')} ⊥ ${I('BD')}, ${I('AC')} = ${p} cm, ${I('BD')} = ${q} cm. Chứng minh ${I('MNPQ')} là hình chữ nhật và tính diện tích của nó.`
    :`Biết ${I('AC')} = ${I('BD')} = ${p} cm. Chứng minh ${I('MNPQ')} là hình thoi và tính chu vi của nó.`;
  const solB=mode==='perp'?[[`${I('MN')} // ${I('AC')}, ${I('MQ')} // ${I('BD')} mà ${I('AC')} ⊥ ${I('BD')} nên ${I('MN')} ⊥ ${I('MQ')}; hình bình hành ${I('MNPQ')} có một góc vuông nên là hình chữ nhật.`,.25],[`${I('MN')} = ${fr('AC',2)} = ${p/2} cm, ${I('MQ')} = ${fr('BD',2)} = ${q/2} cm. Diện tích = ${p/2}·${q/2} = ${p*q/4} cm².`,.25]]
    :[[`${I('MN')} = ${fr('AC',2)}, ${I('MQ')} = ${fr('BD',2)} mà ${I('AC')} = ${I('BD')} nên ${I('MN')} = ${I('MQ')}; hình bình hành có hai cạnh kề bằng nhau là hình thoi.`,.25],[`Mỗi cạnh dài ${p/2} cm, chu vi = 4·${p/2} = ${2*p} cm.`,.25]];
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tứ giác ${I('ABCD')}. Gọi ${I('M')}, ${I('N')}, ${I('P')}, ${I('Q')} lần lượt là trung điểm của ${I('AB')}, ${I('BC')}, ${I('CD')}, ${I('DA')}. Chứng minh tứ giác ${I('MNPQ')} là hình bình hành.`},
    {pts:.5,html:partB}],
    sol:[ptxt([[`${I('MN')} là đường trung bình của tam giác ${I('ABC')} nên ${I('MN')} // ${I('AC')} và ${I('MN')} = ${fr('AC',2)}; tương tự ${I('QP')} // ${I('AC')} và ${I('QP')} = ${fr('AC',2)} (tam giác ${I('ACD')}).`,.25],[`Suy ra ${I('MN')} // ${I('QP')} và ${I('MN')} = ${I('QP')}, nên ${I('MNPQ')} là hình bình hành.`,.25]]),ptxt(solB)],
    chk:()=>p%2===0&&q%2===0};
});
TL('tl-geo-trapmid',4,'VDC','geo',r=>{
  const a=r.int(2,9)*2,b=a+r.int(1,6)*2;
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình thang ${I('ABCD')} (${I('AB')} // ${I('CD')}) có ${I('AB')} = ${a} cm, ${I('CD')} = ${b} cm. Gọi ${I('M')}, ${I('I')}, ${I('N')} lần lượt là trung điểm của ${I('AD')}, ${I('BD')}, ${I('BC')}. Chứng minh ${I('MI')} // ${I('AB')} và ${I('IN')} // ${I('CD')}, từ đó suy ra ba điểm ${I('M')}, ${I('I')}, ${I('N')} thẳng hàng.`},
    {pts:.5,html:`Tính độ dài các đoạn thẳng ${I('MI')}, ${I('IN')} và ${I('MN')}.`}],
    sol:[ptxt([[`${I('MI')} là đường trung bình của tam giác ${I('ABD')} nên ${I('MI')} // ${I('AB')}; ${I('IN')} là đường trung bình của tam giác ${I('BCD')} nên ${I('IN')} // ${I('CD')}.`,.25],[`Vì ${I('AB')} // ${I('CD')} nên ${I('MI')} và ${I('IN')} cùng song song với ${I('AB')} và cùng đi qua ${I('I')}; theo tiên đề Euclid, ${I('M')}, ${I('I')}, ${I('N')} thẳng hàng.`,.25]]),
      ptxt([[`${I('MI')} = ${fr('AB',2)} = ${a/2} cm; ${I('IN')} = ${fr('CD',2)} = ${b/2} cm.`,.25],[`${I('MN')} = ${I('MI')} + ${I('IN')} = ${a/2} + ${b/2} = ${(a+b)/2} cm.`,.25]])],
    chk:()=>a<b};
});
TL('tl-geo-pdpar',3,'VDC','geo',r=>{
  const mode=r.pick(['bis','right']),b=r.int(3,10)*2,c=r.int(3,10)*2;
  const partB=mode==='bis'?`Biết ${I('AD')} là tia phân giác của góc ${I('BAC')}. Chứng minh tứ giác ${I('AEDF')} là hình thoi.`
    :`Biết tam giác ${I('ABC')} vuông tại ${I('A')}, ${I('AB')} = ${c} cm, ${I('AC')} = ${b} cm và ${I('D')} là trung điểm của ${I('BC')}. Chứng minh ${I('AEDF')} là hình chữ nhật và tính diện tích của nó.`;
  const solB=mode==='bis'?[[`${I('DE')} // ${I('AC')} nên ∠${I('ADE')} = ∠${I('DAF')} (so le trong); ${I('AD')} là phân giác nên ∠${I('DAF')} = ∠${I('DAE')}. Suy ra ∠${I('ADE')} = ∠${I('DAE')}, tam giác ${I('AED')} cân tại ${I('E')}: ${I('EA')} = ${I('ED')}.`,.25],[`Hình bình hành ${I('AEDF')} có hai cạnh kề bằng nhau (${I('EA')} = ${I('ED')}) nên là hình thoi.`,.25]]
    :[[`Hình bình hành ${I('AEDF')} có ∠${I('EAF')} = 90° nên là hình chữ nhật.`,.25],[`${I('D')} là trung điểm ${I('BC')}, ${I('DE')} // ${I('AC')} nên ${I('E')} là trung điểm ${I('AB')}: ${I('AE')} = ${c/2} cm; tương tự ${I('AF')} = ${b/2} cm. Diện tích = ${c/2}·${b/2} = ${b*c/4} cm².`,.25]];
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')}, điểm ${I('D')} thuộc cạnh ${I('BC')} (${I('D')} khác ${I('B')} và ${I('C')}). Qua ${I('D')} kẻ đường thẳng song song với ${I('AC')} cắt ${I('AB')} tại ${I('E')}, kẻ đường thẳng song song với ${I('AB')} cắt ${I('AC')} tại ${I('F')}. Chứng minh tứ giác ${I('AEDF')} là hình bình hành.`},
    {pts:.5,html:partB}],
    sol:[ptxt([[`${I('DE')} // ${I('AC')} nên ${I('DE')} // ${I('AF')}; ${I('DF')} // ${I('AB')} nên ${I('DF')} // ${I('AE')}.`,.25],[`Tứ giác ${I('AEDF')} có các cặp cạnh đối song song nên là hình bình hành.`,.25]]),ptxt(solB)],
    chk:()=>true};
});
TL('tl-geo-sqperp',3,'VDC','geo',r=>{
  const a=r.int(4,12),b=r.int(1,a-1),S=a*a-a*b/2;
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình vuông ${I('ABCD')} cạnh ${a} cm. Lấy điểm ${I('E')} thuộc cạnh ${I('AB')}, điểm ${I('F')} thuộc cạnh ${I('BC')} sao cho ${I('AE')} = ${I('BF')} = ${b} cm. Chứng minh tam giác ${I('DAE')} bằng tam giác ${I('ABF')}.`},
    {pts:.5,html:`Chứng minh ${I('DE')} ⊥ ${I('AF')}. Tính diện tích tứ giác ${I('EBCD')}.`}],
    sol:[ptxt([[`Xét tam giác ${I('DAE')} và ${I('ABF')}: ${I('DA')} = ${I('AB')} (cạnh hình vuông), ∠${I('DAE')} = ∠${I('ABF')} = 90°, ${I('AE')} = ${I('BF')}.`,.25],[`Do đó tam giác ${I('DAE')} bằng tam giác ${I('ABF')} (c.g.c).`,.25]]),
      ptxt([[`Suy ra ∠${I('ADE')} = ∠${I('BAF')}. Gọi ${I('H')} là giao điểm của ${I('DE')} và ${I('AF')}: ∠${I('HAD')} + ∠${I('HDA')} = ∠${I('HAD')} + ∠${I('BAF')} = 90°, nên ∠${I('AHD')} = 90°, tức ${I('DE')} ⊥ ${I('AF')}.`,.25],[`Diện tích ${I('EBCD')} = diện tích ${I('ABCD')} ${MINUS} diện tích tam giác ${I('DAE')} = ${a*a} ${MINUS} ${fr(`${a}·${b}`,2)} = ${fmt(S)} cm².`,.25]])],
    chk:()=>b<a};
});
TL('tl-geo-midline',4,'VD','geo',r=>{
  const a=r.int(3,12)*2,c=r.int(3,12)*2;
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c} cm, ${I('BC')} = ${a} cm. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AB')} và ${I('AC')}. Chứng minh ${I('MN')} // ${I('BC')} và tính độ dài ${I('MN')}.`},
    {pts:.5,html:`Gọi ${I('P')} là trung điểm của ${I('BC')}. Chứng minh tứ giác ${I('BMNP')} là hình bình hành và tính chu vi của nó.`}],
    sol:[ptxt([[`${I('MN')} là đường trung bình của tam giác ${I('ABC')} nên ${I('MN')} // ${I('BC')}.`,.25],[`${I('MN')} = ${fr('BC',2)} = ${a/2} cm.`,.25]]),
      ptxt([[`${I('MN')} // ${I('BP')} và ${I('MN')} = ${I('BP')} = ${a/2} cm nên ${I('BMNP')} là hình bình hành.`,.25],[`Chu vi = 2(${I('BM')} + ${I('BP')}) = 2(${c/2} + ${a/2}) = ${a+c} cm.`,.25]])],
    chk:()=>true};
});

/* ----- Lớp 8, chương VII: vận dụng cao (phương trình chứa tham số) ----- */
TL8('tl8-7-vdc2',7,'VDC','alg',r=>{
  const k=r.int(1,4),m0=r.pick([...Array(13).keys()].map(i=>i-6).filter(v=>Math.abs(v)!==k&&v+k!==0));
  const mm=I('m'),eq=`(${mm}${sup(2)} ${MINUS} ${k*k})${X8} = ${mm} ${MINUS} ${k}`;
  return{kind:'tl',title:'Phương trình bậc nhất chứa tham số',parts:[
    {pts:.5,html:`Cho phương trình ${eq} (${mm} là tham số). Giải phương trình khi ${mm} = ${sg(m0)}.`},
    {pts:.5,html:`Tìm ${mm} để phương trình có nghiệm duy nhất; vô nghiệm; có vô số nghiệm.`}],
    sol:[ptxt([[`Với ${mm} = ${sg(m0)}: ${sg(m0*m0-k*k)}${X8} = ${sg(m0-k)}.`,.25],[`${Fx(Q(m0-k,m0*m0-k*k))}.`,.25]]),
      ptxt([[`(${mm} ${MINUS} ${k})(${mm} + ${k})${X8} = ${mm} ${MINUS} ${k}. Nếu ${mm} ≠ ±${k}: nghiệm duy nhất ${X8} = ${fr(1,`${mm} + ${k}`)}.`,.25],[`Nếu ${mm} = ${k}: 0${X8} = 0, vô số nghiệm. Nếu ${mm} = ${MINUS}${k}: 0${X8} = ${MINUS}${2*k}, vô nghiệm.`,.25]])],
    chk:()=>qv(Q(m0-k,m0*m0-k*k))===1/(m0+k)};
});
TL8('tl8-7-vdc3',7,'VDC','alg',r=>{
  const p=r.nz(-3,3),q=r.nz(-4,6),s=p+q;if(s===0||Math.abs(s)===1)return T.tl['tl8-7-vdc3'].gen(r);
  const mm=I('m'),m0=p+r.pick([2,3,-2,-3]),ds=[];for(let d=1;d<=Math.abs(s);d++)if(s%d===0)ds.push(d,-d);
  const ms=ds.map(d=>d+p).sort((u,v)=>u-v);
  const eq=`(${mm} ${sT(-p)})${X8} = ${mm} ${sT(q)}`;
  return{kind:'tl',title:'Phương trình chứa tham số, nghiệm nguyên',parts:[
    {pts:.5,html:`Cho phương trình ${eq} (${mm} là tham số). Giải phương trình khi ${mm} = ${sg(m0)}.`},
    {pts:.5,html:`Tìm tất cả các giá trị nguyên của ${mm} để phương trình có nghiệm duy nhất và nghiệm đó là số nguyên.`}],
    sol:[ptxt([[`Với ${mm} = ${sg(m0)}: ${sg(m0-p)}${X8} = ${sg(m0+q)}.`,.25],[`${Fx(Q(m0+q,m0-p))}.`,.25]]),
      ptxt([[`Phương trình có nghiệm duy nhất khi ${mm} ≠ ${sg(p)}, khi đó ${X8} = ${fr(`${mm} ${sT(q)}`,`${mm} ${sT(-p)}`)} = 1 + ${fr(sg(s),`${mm} ${sT(-p)}`)}.`,.25],[`${X8} nguyên ⟺ ${mm} ${sT(-p)} là ước của ${sg(s)} ⟺ ${mm} ∈ {${SETS(ms)}}.`,.25]])],
    chk:()=>ms.every(m=>m!==p&&Number.isInteger((m+q)/(m-p)))&&m0!==p};
});
