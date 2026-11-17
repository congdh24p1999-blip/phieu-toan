/* ----- Trả lời ngắn chương VII ----- */
const T3=[[1,2,2,3],[2,3,6,7],[2,6,9,11],[4,4,7,9],[6,6,7,11],[2,10,11,15],[3,4,12,13],[4,8,8,12]];
TLN11c('t11-7-sc',7,'TH',r=>{
  const [x,y,z,d]=r.pick(T3),[a,b,h]=r.shuffle([x,y,z]);
  return{kind:'tln',stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình chữ nhật với ${I('AB')} = ${a}, ${I('AD')} = ${b}; ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${h}. Tính độ dài đoạn thẳng ${I('SC')}.`,ans:d,unit:'',
    sol:`${I('AC')}${sup(2)} = ${a}² + ${b}² = ${a*a+b*b}. Vì ${I('SA')} ⊥ ${I('AC')} nên ${I('SC')}${sup(2)} = ${I('SA')}² + ${I('AC')}² = ${h*h} + ${a*a+b*b} = ${d*d}, suy ra ${I('SC')} = ${d}.`,chk:()=>a*a+b*b+h*h===d*d};
},'vg');
TLN11c('t11-7-ang',7,'TH',r=>{
  const s=r.int(2,6),phi=r.pick([30,45,60]),SAh={30:fr(`${s}${rt(6)}`,3),45:`${s}${rt(2)}`,60:`${s}${rt(6)}`}[phi],tn=phi===45?'1':phi===30?fr(1,rt(3)):rt(3);
  const SAv={30:s*Math.sqrt(6)/3,45:s*Math.SQRT2,60:s*Math.sqrt(6)}[phi];
  return{kind:'tln',stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${s}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SAh}. Tính số đo góc (đơn vị: độ) giữa đường thẳng ${I('SC')} và mặt phẳng ${PL7('ABCD')}.`,ans:phi,unit:'°',
    sol:`Góc giữa ${I('SC')} và ${PL7('ABCD')} là ${AG('SCA')}. ${I('AC')} = ${s}${rt(2)}; tan${AG('SCA')} = ${fr(I('SA'),I('AC'))} = ${fr(SAh,`${s}${rt(2)}`)} = ${tn}, suy ra góc bằng ${phi}°.`,chk:()=>Math.abs(Math.atan(SAv/(s*Math.SQRT2))*180/Math.PI-phi)<1e-9};
},'goc');
TLN11c('t11-7-vol',7,'TH',r=>{
  let a,b,h;do{a=r.int(3,9);b=r.int(3,9);h=r.int(3,9)}while((a*b*h)%6!==0);
  return{kind:'tln',stem:`Cho hình chóp ${I('S.ABC')} có đáy ${I('ABC')} là tam giác vuông tại ${I('B')}, ${I('AB')} = ${a}, ${I('BC')} = ${b}; ${I('SA')} ⊥ ${PL7('ABC')} và ${I('SA')} = ${h}. Tính thể tích khối chóp ${I('S.ABC')}.`,ans:a*b*h/6,unit:'',
    sol:`Diện tích đáy ${I('S')}${sub('ABC')} = ${fr(1,2)}·${a}·${b} = ${a*b/2}. Thể tích ${I('V')} = ${fr(1,3)}·${a*b/2}·${h} = ${a*b*h/6}.`,chk:()=>Number.isInteger(a*b*h/6)};
},'tt');
TLN11c('t11-7-dist',7,'VD',r=>{
  const a=r.int(2,9),h=r.int(2,9),v=a*h/Math.hypot(a,h),ans=r2(v);
  return{kind:'tln',stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình chữ nhật, ${I('AB')} = ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${h}. Tính khoảng cách từ ${I('A')} đến mặt phẳng ${PL7('SBC')} (làm tròn đến hàng phần trăm).`,ans,unit:'',
    sol:`${I('BC')} ⊥ ${PL7('SAB')}. Kẻ ${I('AH')} ⊥ ${I('SB')} thì ${I('AH')} ⊥ ${PL7('SBC')}, d(${I('A')}, ${PL7('SBC')}) = ${I('AH')} = ${fr(`${a}·${h}`,rt(`${a}² + ${h}²`))} ≈ ${fmt(ans)}.`,chk:()=>Math.abs(v-ans)<.0051};
},'kc');

/* ----- Tự luận chương VII (role c) ----- */
const stepsVG=(tg,F)=>({BC:[[`${I('BC')} ⊥ ${I('AB')} (ABCD là hình vuông) và ${I('BC')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}).`,.25],[`${I('AB')}, ${I('SA')} cắt nhau trong ${PL7('SAB')} nên ${I('BC')} ⊥ ${PL7('SAB')}.`,.25]],
  CD:[[`${I('CD')} ⊥ ${I('AD')} (ABCD là hình vuông) và ${I('CD')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}).`,.25],[`${I('AD')}, ${I('SA')} cắt nhau trong ${PL7('SAD')} nên ${I('CD')} ⊥ ${PL7('SAD')}.`,.25]],
  BD:[[`${I('BD')} ⊥ ${I('AC')} (hai đường chéo của hình vuông) và ${I('BD')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}).`,.25],[`${I('AC')}, ${I('SA')} cắt nhau trong ${PL7('SAC')} nên ${I('BD')} ⊥ ${PL7('SAC')}.`,.25]]}[tg]);
TL11c('tl11-7-sa',7,'TH','c',r=>{
  const F=pyrPick(r,true),phi=r.pick([45,60]),L=r.pick(['SB','SC']),a=I('a'),tg=r.pick([['BC','SAB'],['CD','SAD'],['BD','SAC']]),isC=L==='SC';
  const SAT={45:{B:[a,1],C:[`${a}${rt(2)}`,Math.SQRT2]},60:{B:[`${a}${rt(3)}`,Math.sqrt(3)],C:[`${a}${rt(6)}`,Math.sqrt(6)]}}[phi][isC?'C':'B'];
  const AB=isC?`${a}${rt(2)}`:a;
  return{kind:'tl',title:'Đường thẳng vuông góc với mặt phẳng, góc',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SAT[0]}.${F.fig}Chứng minh ${LN7(tg[0])} ⊥ ${PL7(tg[1])}.`},
    {pts:.5,html:`Tính góc giữa đường thẳng ${LN7(L)} và mặt phẳng ${PL7('ABCD')}.`}],
    sol:[ptxt(stepsVG(tg[0],F)),ptxt([[`${I('SA')} ⊥ ${PL7('ABCD')} nên hình chiếu của ${LN7(L)} trên ${PL7('ABCD')} là ${LN7('A'+L[1])}; góc cần tìm là ${AG(SAG[L])}.`,.25],[`tan${AG(SAG[L])} = ${fr(I('SA'),LN7('A'+L[1]))} = ${fr(SAT[0],AB)} = ${phi===45?'1':rt(3)}, suy ra góc bằng ${phi}°.`,.25]])],
    chk:()=>Gp.lp(F.g,tg[0],tg[1])&&Math.abs(Math.atan(SAT[1]/(isC?Math.SQRT2:1))*180/Math.PI-phi)<1e-9};
},'goc');
TL11c('tl11-7-mm',7,'TH','c',r=>{
  const v=r.int(0,1),phi=r.pick([30,45,60]),a=I('a'),F=pyrPick(r,false);
  const tH={30:fr(rt(3),3),45:'1',60:rt(3)}[phi],SAh={30:fr(`${a}${rt(3)}`,3),45:a,60:`${a}${rt(3)}`}[phi];
  const e=v===0?'AB':'AD',pl=v===0?'SBC':'SCD',pl2=v===0?'SAB':'SAD',pe=v===0?'BC':'CD',ang=v===0?'SBA':'SDA';
  return{kind:'tl',title:'Hai mặt phẳng vuông góc, góc giữa hai mặt phẳng',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình chữ nhật với ${I(e)} = ${a}, ${I(v===0?'AD':'AB')} = 2${a}; ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SAh}.${F.fig}Chứng minh ${PL7(pl2)} ⊥ ${PL7(pl)}.`},
    {pts:.5,html:`Tính góc giữa hai mặt phẳng ${PL7(pl)} và ${PL7('ABCD')}.`}],
    sol:[ptxt([[`${LN7(pe)} ⊥ ${LN7(e)} (đáy là hình chữ nhật) và ${LN7(pe)} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}) nên ${LN7(pe)} ⊥ ${PL7(pl2)}.`,.25],[`${LN7(pe)} ⊂ ${PL7(pl)} nên ${PL7(pl)} ⊥ ${PL7(pl2)}.`,.25]]),
      ptxt([[`${PL7(pl)} ∩ ${PL7('ABCD')} = ${LN7(pe)}; ${LN7(pe)} ⊥ ${PL7(pl2)} nên ${LN7(pe)} ⊥ ${LN7(e)} và ${LN7(pe)} ⊥ ${LN7(v===0?'SB':'SD')}. Góc giữa hai mặt phẳng là ${AG(ang)}.`,.25],[`tan${AG(ang)} = ${fr(I('SA'),LN7(e))} = ${fr(SAh,a)} = ${tH}, suy ra góc bằng ${phi}°.`,.25]])],
    chk:()=>Gp.pp(F.g,pl2,pl)&&Math.abs(Math.atan({30:1/Math.sqrt(3),45:1,60:Math.sqrt(3)}[phi])*180/Math.PI-phi)<1e-9};
},'mm');
TL11c('tl11-7-vol',7,'VD','c',r=>{
  const phi=r.pick([45,60]),a=I('a'),F=pyrPick(r,true),k=phi===45?[rt(2),Math.SQRT2]:[rt(6),Math.sqrt(6)],dd=phi===45?[fr(`${a}${rt(6)}`,3),Math.sqrt(6)/3]:[fr(`${a}${rt(42)}`,7),Math.sqrt(42)/7];
  return{kind:'tl',title:'Thể tích và khoảng cách',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')}, góc giữa đường thẳng ${I('SC')} và mặt phẳng ${PL7('ABCD')} bằng ${phi}°.${F.fig}Tính thể tích khối chóp ${I('S.ABCD')}.`},
    {pts:.5,html:`Tính khoảng cách từ điểm ${I('A')} đến mặt phẳng ${PL7('SBC')}.`}],
    sol:[ptxt([[`Góc giữa ${I('SC')} và ${PL7('ABCD')} là ${AG('SCA')} = ${phi}°; ${I('AC')} = ${a}${rt(2)} nên ${I('SA')} = ${I('AC')}·tan${phi}° = ${a}${k[0]}.`,.25],[`${I('V')} = ${fr(1,3)}·${a}${sup(2)}·${a}${k[0]} = ${fr(`${a}${sup(3)}${k[0]}`,3)}.`,.25]]),
      ptxt([[`${I('BC')} ⊥ ${PL7('SAB')} nên ${PL7('SBC')} ⊥ ${PL7('SAB')}. Kẻ ${I('AH')} ⊥ ${I('SB')} thì ${I('AH')} ⊥ ${PL7('SBC')}, d(${I('A')}, ${PL7('SBC')}) = ${I('AH')}.`,.25],[`${fr(1,'AH²')} = ${fr(1,'SA²')} + ${fr(1,'AB²')} = ${fr(1,`${phi===45?2:6}${a}²`)} + ${fr(1,a+'²')} ⟹ ${I('AH')} = ${dd[0]}.`,.25]])],
    chk:()=>{const sa=Math.SQRT2*Math.tan(phi*Math.PI/180);return Math.abs(sa-k[1])<1e-9&&Math.abs(sa/Math.sqrt(sa*sa+1)-dd[1])<1e-9}};
},'tt');
TL11c('tl11-7-bd',7,'VD','c',r=>{
  const c=r.pick([[1,''],[2,rt(2)],[3,rt(3)]]),a=I('a'),F=pyrPick(r,true),SA=`${a}${c[1]}`;
  return{kind:'tl',title:'Hai mặt phẳng vuông góc, khoảng cách',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SA}.${F.fig}Chứng minh ${PL7('SAC')} ⊥ ${PL7('SBD')}.`},
    {pts:.5,html:`Tính khoảng cách từ điểm ${I('B')} đến mặt phẳng ${PL7('SAC')}.`}],
    sol:[ptxt([[`${I('BD')} ⊥ ${I('AC')} (hai đường chéo của hình vuông) và ${I('BD')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}) nên ${I('BD')} ⊥ ${PL7('SAC')}.`,.25],[`${I('BD')} ⊂ ${PL7('SBD')} nên ${PL7('SBD')} ⊥ ${PL7('SAC')}.`,.25]]),
      ptxt([[`Gọi ${I('O')} = ${I('AC')} ∩ ${I('BD')}. Vì ${I('BO')} ⊥ ${PL7('SAC')} (theo câu a) nên d(${I('B')}, ${PL7('SAC')}) = ${I('BO')}.`,.25],[`${I('BO')} = ${fr(1,2)}${I('BD')} = ${fr(`${a}${rt(2)}`,2)}.`,.25]])],
    chk:()=>Gp.pp(F.g,'SAC','SBD')&&Math.abs(V3.len(V3.sub(F.P.B,F.P.O||V3.mid(F.P.A,F.P.C)))-F.P.B[0]*Math.SQRT2/2)<1e-9};
},'kc');
