/* ===== Toán 8 học kì II: câu vận dụng cao kiểu "bài 0,5 điểm cuối đề" và bài hình có ý khó ===== */
/* P = (cx + d)/(x − a) − (ca + d)/(x + a) − (2da + 2ca²)/(x² − a²) = c với mọi x ≠ ±a */
TL8('tl8-6-indep',6,'VDC','alg',r=>{
  const a=r.int(1,4),c=r.int(1,3),d=r.nz(-5,5),e=c*a+d,F=2*d*a+2*c*a*a;
  if(e===0||F===0)return T.tl['tl8-6-indep'].gen(r);
  const den=xquad(1,0,-a*a),P=I('P');
  const t1=FR8(xlin(c,d),xlin(1,-a)),t2=FR8(sg(Math.abs(e)),xlin(1,a)),t3=FR8(sg(Math.abs(F)),den);
  const expr=`${t1} ${e>0?MINUS:'+'} ${t2} ${F>0?MINUS:'+'} ${t3}`;
  const num1=pmul([c,d],[1,a]),num2=pscale([1,-a],e);/* (cx+d)(x+a) − e(x − a) − F */
  const tot=padd(padd(num1,pscale(num2,-1)),[-F]);
  return{kind:'tl',title:'Biểu thức không phụ thuộc vào biến',parts:[
    {pts:.5,html:`Cho biểu thức ${P} = ${expr}. Tìm điều kiện xác định của ${P} và quy đồng mẫu các phân thức trong ${P}.`},
    {pts:.5,html:`Chứng minh rằng giá trị của ${P} không phụ thuộc vào giá trị của biến ${X8} (với ${X8} thỏa mãn điều kiện xác định).`}],
    sol:[ptxt([[`Điều kiện: ${X8} ≠ ${a} và ${X8} ≠ ${MINUS}${a}. Mẫu thức chung là ${den} = ${LFh(-a)}${LFh(a)}.`,.25],
      [`${P} = ${FR8(`(${xlin(c,d)})${LFh(a)} ${e>0?MINUS:'+'} ${Math.abs(e)}${LFh(-a)} ${F>0?MINUS:'+'} ${Math.abs(F)}`,den)}.`,.25]]),
      ptxt([[`Tử thức: ${PH(num1)} ${e>0?MINUS:'+'} (${PH(pscale([1,-a],Math.abs(e)))}) ${F>0?MINUS:'+'} ${Math.abs(F)} = ${PH(tot)}${c===1?'':` = ${c}(${den})`}.`,.25],
      [`Do đó ${P} = ${FR8(c===1?den:`${c}(${den})`,den)} = ${c} với mọi ${X8} ≠ ±${a}, tức giá trị của ${P} không phụ thuộc vào ${X8}.`,.25]])],
    chk:()=>tot[0]===c&&tot[1]===0&&tot[2]===-c*a*a&&[0,5,-7,2.5].every(x=>closeN((c*x+d)/(x-a)-e/(x+a)-F/(x*x-a*a),c))};
});
/* A = (x² + 2ax + c)/(x² + 2ax + b) = 1 − k/((x + a)² + m),  m = b − a² > 0, k = b − c > 0 */
TL8('tl8-6-min',6,'VDC','alg',r=>{
  const a=r.nz(-3,3),m=r.pick([1,2,3,4]),k=r.pick([1,2,3,4,6,8].filter(v=>v!==m)),b=a*a+m,c=b-k,A=I('A'),mn=Q(m-k,m);
  return{kind:'tl',title:'Giá trị nhỏ nhất của phân thức',parts:[
    {pts:.5,html:`Cho ${A} = ${FR8(xquad(1,2*a,c),xquad(1,2*a,b))}. Chứng minh ${A} xác định với mọi ${X8} và viết ${A} = 1 ${MINUS} ${FR8(k,`${I('B')}`)}, trong đó ${I('B')} là một đa thức.`},
    {pts:.5,html:`Tìm giá trị nhỏ nhất của ${A} và giá trị của ${X8} tương ứng.`}],
    sol:[ptxt([[`${xquad(1,2*a,b)} = ${LFh(a)}${sup(2)} + ${m} ≥ ${m} > 0 với mọi ${X8}, nên ${A} xác định với mọi ${X8}.`,.25],
      [`Tử thức = mẫu thức ${MINUS} ${k}, nên ${A} = 1 ${MINUS} ${FR8(k,`${LFh(a)}${sup(2)} + ${m}`)}.`,.25]]),
      ptxt([[`Vì ${LFh(a)}${sup(2)} + ${m} ≥ ${m} nên ${FR8(k,`${LFh(a)}${sup(2)} + ${m}`)} ≤ ${fr(k,m)}, suy ra ${A} ≥ 1 ${MINUS} ${fr(k,m)} = ${qh(mn)}.`,.25],
      [`Dấu “=” xảy ra khi ${X8} = ${sg(-a)}. Vậy giá trị nhỏ nhất của ${A} là ${qh(mn)}, đạt được khi ${X8} = ${sg(-a)}.`,.25]])],
    chk:()=>{const f=x=>(x*x+2*a*x+c)/(x*x+2*a*x+b);return closeN(f(-a),qv(mn))&&[-5,-1,0,1.3,4].every(x=>f(x)>=qv(mn)-1e-12)}};
});
/* a + b + c = 0 */
const ABC0=[
  {e:`${fr(`${I('a')}${sup(2)}`,`${I('b')}${I('c')}`)} + ${fr(`${I('b')}${sup(2)}`,`${I('c')}${I('a')}`)} + ${fr(`${I('c')}${sup(2)}`,`${I('a')}${I('b')}`)}`,v:Q(3),
   w:`Quy đồng: biểu thức bằng ${fr(`${I('a')}${sup(3)} + ${I('b')}${sup(3)} + ${I('c')}${sup(3)}`,`${I('a')}${I('b')}${I('c')}`)}. Vì ${I('a')} + ${I('b')} + ${I('c')} = 0 nên ${I('a')}${sup(3)} + ${I('b')}${sup(3)} + ${I('c')}${sup(3)} = 3${I('a')}${I('b')}${I('c')}; biểu thức bằng 3.`},
  {e:`${fr(`(${I('a')} + ${I('b')})(${I('b')} + ${I('c')})(${I('c')} + ${I('a')})`,`${I('a')}${I('b')}${I('c')}`)}`,v:Q(-1),
   w:`Vì ${I('a')} + ${I('b')} = ${MINUS}${I('c')}, ${I('b')} + ${I('c')} = ${MINUS}${I('a')}, ${I('c')} + ${I('a')} = ${MINUS}${I('b')} nên tử thức bằng ${MINUS}${I('a')}${I('b')}${I('c')}; biểu thức bằng ${MINUS}1.`},
  {e:`${fr(`${I('a')}${sup(2)}`,`${I('a')}${sup(2)} ${MINUS} ${I('b')}${sup(2)} ${MINUS} ${I('c')}${sup(2)}`)} + ${fr(`${I('b')}${sup(2)}`,`${I('b')}${sup(2)} ${MINUS} ${I('c')}${sup(2)} ${MINUS} ${I('a')}${sup(2)}`)} + ${fr(`${I('c')}${sup(2)}`,`${I('c')}${sup(2)} ${MINUS} ${I('a')}${sup(2)} ${MINUS} ${I('b')}${sup(2)}`)}`,v:Q(3,2),
   w:`Vì ${I('a')} = ${MINUS}(${I('b')} + ${I('c')}) nên ${I('a')}${sup(2)} ${MINUS} ${I('b')}${sup(2)} ${MINUS} ${I('c')}${sup(2)} = 2${I('b')}${I('c')}; tương tự cho các mẫu khác. Biểu thức bằng ${fr(`${I('a')}${sup(3)} + ${I('b')}${sup(3)} + ${I('c')}${sup(3)}`,`2${I('a')}${I('b')}${I('c')}`)} = ${fr(3,2)}.`},
  {e:`${fr(`${I('a')} + ${I('b')}`,I('c'))} + ${fr(`${I('b')} + ${I('c')}`,I('a'))} + ${fr(`${I('c')} + ${I('a')}`,I('b'))}`,v:Q(-3),
   w:`Mỗi phân thức bằng ${MINUS}1 (ví dụ ${I('a')} + ${I('b')} = ${MINUS}${I('c')}), nên biểu thức bằng ${MINUS}3.`}];
TLN8('t8-6-abc',6,'VD',r=>{
  const it=r.pick(ABC0),k=r.pick([1,2,4]),ans=qv(it.v)*k;
  if(!Number.isInteger(ans))return T.tln['t8-6-abc'].gen(r);
  return{kind:'tln',stem:`Cho ba số ${I('a')}, ${I('b')}, ${I('c')} khác 0 thỏa mãn ${I('a')} + ${I('b')} + ${I('c')} = 0 (các mẫu thức đều khác 0). Tính giá trị của biểu thức ${I('P')} = ${k===1?'':k+'·('}${it.e}${k===1?'':')'}.`,ans,unit:'',
    sol:`${it.w}${k===1?'':` Vậy ${I('P')} = ${k}·${qh(it.v)} = ${ans}.`}`,chk:()=>{const a=2,b=-5,c=3;const vals={0:a*a/(b*c)+b*b/(c*a)+c*c/(a*b),1:(a+b)*(b+c)*(c+a)/(a*b*c),2:a*a/(a*a-b*b-c*c)+b*b/(b*b-c*c-a*a)+c*c/(c*c-a*a-b*b),3:(a+b)/c+(b+c)/a+(c+a)/b};return closeN(vals[ABC0.indexOf(it)],qv(it.v))}};
});
TL8('tl8-6-abc',6,'VDC','alg',r=>{
  const it=r.pick(ABC0.slice(0,3)),P=I('P'),aa=I('a'),bb=I('b'),cc=I('c');
  return{kind:'tl',title:'Tính giá trị biểu thức có điều kiện',parts:[
    {pts:.5,html:`Cho ba số ${aa}, ${bb}, ${cc} khác 0 thỏa mãn ${aa} + ${bb} + ${cc} = 0. Chứng minh ${aa}${sup(3)} + ${bb}${sup(3)} + ${cc}${sup(3)} = 3${aa}${bb}${cc}.`},
    {pts:.5,html:`Tính giá trị của biểu thức ${P} = ${it.e} (các mẫu thức đều khác 0).`}],
    sol:[ptxt([[`Từ ${aa} + ${bb} = ${MINUS}${cc} suy ra (${aa} + ${bb})${sup(3)} = ${MINUS}${cc}${sup(3)}, tức ${aa}${sup(3)} + ${bb}${sup(3)} + 3${aa}${bb}(${aa} + ${bb}) = ${MINUS}${cc}${sup(3)}.`,.25],
      [`Thay ${aa} + ${bb} = ${MINUS}${cc}: ${aa}${sup(3)} + ${bb}${sup(3)} ${MINUS} 3${aa}${bb}${cc} = ${MINUS}${cc}${sup(3)}, hay ${aa}${sup(3)} + ${bb}${sup(3)} + ${cc}${sup(3)} = 3${aa}${bb}${cc}.`,.25]]),
      ptxt([[it.w.replace(/; biểu thức bằng.*$/,'.'),.25],[`Vậy ${P} = ${qh(it.v)}.`,.25]])],
    chk:()=>{const a=3,b=-7,c=4,f=[a*a/(b*c)+b*b/(c*a)+c*c/(a*b),(a+b)*(b+c)*(c+a)/(a*b*c),a*a/(a*a-b*b-c*c)+b*b/(b*b-c*c-a*a)+c*c/(c*c-a*a-b*b)];return closeN(f[ABC0.indexOf(it)],qv(it.v))}};
});

/* ----- Bài hình đồng dạng có ý khó (vuông góc, hệ thức) ----- */
TL8('tl8-9-perp',9,'VDC','geo',r=>{
  /* ΔABC vuông tại A, AH ⊥ BC; M trung điểm AH, N trung điểm BH ⟹ AN ⊥ CM */
  const k=r.pick([1,2,3]),[p,q]=r.pick([[1,4],[4,1],[4,9],[9,4],[9,16],[16,9]]).map(v=>v*k),h=Math.sqrt(p*q);
  const P={H:[0,0],A:[0,h],B:[-p,0],C:[q,0],M:[0,h/2],N:[-p/2,0]};
  const fig=fig2D(P,[['A','B'],['B','C'],['C','A'],['A','H'],['A','N'],['C','M']],{right:[['B','A','C'],['A','H','C']],off:{H:[0,15],N:[0,15],M:[-10,4]}});
  return{kind:'tl',title:'Tam giác đồng dạng (chứng minh vuông góc)',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, đường cao ${I('AH')} với ${I('HB')} = ${p} cm, ${I('HC')} = ${q} cm. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AH')} và ${I('BH')}.${fig}Chứng minh ${TRI8('HBA')} ${SIM} ${TRI8('HAC')} và tính độ dài ${I('AH')}.`},
    {pts:.5,html:`Chứng minh ${TRI8('HNA')} ${SIM} ${TRI8('HMC')}, từ đó suy ra ${I('AN')} ⊥ ${I('CM')}.`}],
    sol:[ptxt([[`${TRI8('HBA')} và ${TRI8('HAC')} có ∠${I('AHB')} = ∠${I('CHA')} = 90°, ∠${I('HBA')} = ∠${I('HAC')} (cùng phụ với ∠${I('HAB')}), nên đồng dạng (g.g).`,.25],
      [`Suy ra ${fr('HB','HA')} = ${fr('HA','HC')}, tức ${I('AH')}${sup(2)} = ${I('HB')}·${I('HC')} = ${p*q}, ${I('AH')} = ${fmt(h)} cm.`,.25]]),
      ptxt([[`Từ ${fr('HB','HA')} = ${fr('HA','HC')} có ${fr('HN','HA')} = ${fr(`${I('HB')}/2`,'HA')} = ${fr(`${I('HA')}/2`,'HC')} = ${fr('HM','HC')}; lại có ∠${I('NHA')} = ∠${I('MHC')} = 90°, nên ${TRI8('HNA')} ${SIM} ${TRI8('HMC')} (c.g.c), suy ra ∠${I('HAN')} = ∠${I('HCM')}.`,.25],
      [`Gọi ${I('K')} là giao điểm của ${I('AN')} và đường thẳng ${I('CM')}. Ta có ∠${I('KAM')} + ∠${I('AMK')} = ∠${I('HCM')} + ∠${I('HMC')} = 90° (∠${I('AMK')} = ∠${I('HMC')} đối đỉnh), nên ∠${I('AKM')} = 90°, tức ${I('AN')} ⊥ ${I('CM')}.`,.25]])],
    chk:()=>{const an=[P.N[0]-P.A[0],P.N[1]-P.A[1]],cm=[P.M[0]-P.C[0],P.M[1]-P.C[1]];return Math.abs(an[0]*cm[0]+an[1]*cm[1])<1e-9&&Number.isInteger(h)}};
});
TL8('tl8-9-orth',9,'VDC','geo',r=>{
  /* ΔABC nhọn, hai đường cao BE, CF cắt nhau tại H */
  const mode=r.pick(['sum','prod']);
  const Pt={A:[1.6,3.4],B:[0,0],C:[4.4,0]};
  const foot=(P,U,V)=>{const dx=V[0]-U[0],dy=V[1]-U[1],t=((P[0]-U[0])*dx+(P[1]-U[1])*dy)/(dx*dx+dy*dy);return[U[0]+t*dx,U[1]+t*dy]};
  Pt.E=foot(Pt.B,Pt.A,Pt.C);Pt.F=foot(Pt.C,Pt.A,Pt.B);
  const lineX=(P1,P2,Q1,Q2)=>{const a1=P2[1]-P1[1],b1=P1[0]-P2[0],c1=a1*P1[0]+b1*P1[1],a2=Q2[1]-Q1[1],b2=Q1[0]-Q2[0],c2=a2*Q1[0]+b2*Q1[1],d=a1*b2-a2*b1;return[(c1*b2-c2*b1)/d,(a1*c2-a2*c1)/d]};
  Pt.H=lineX(Pt.B,Pt.E,Pt.C,Pt.F);Pt.D=foot(Pt.A,Pt.B,Pt.C);
  const segs=[['A','B'],['B','C'],['C','A'],['B','E'],['C','F']].concat(mode==='sum'?[['A','D']]:[['E','F']]);
  const fig=fig2D(mode==='sum'?Pt:{A:Pt.A,B:Pt.B,C:Pt.C,E:Pt.E,F:Pt.F,H:Pt.H},segs,{right:[['A','E','B'],['A','F','C']].concat(mode==='sum'?[['A','D','C']]:[]),off:{H:[10,-4],D:[0,15]}});
  const partB=mode==='sum'?`Đường thẳng ${I('AH')} cắt ${I('BC')} tại ${I('D')}. Chứng minh ${I('BH')}·${I('BE')} + ${I('CH')}·${I('CF')} = ${I('BC')}${sup(2)}.`
    :`Chứng minh ${I('HE')}·${I('HB')} = ${I('HF')}·${I('HC')} và ${TRI8('AEF')} ${SIM} ${TRI8('ABC')}.`;
  const solB=mode==='sum'?[[`${I('H')} là trực tâm nên ${I('AD')} ⊥ ${I('BC')}. ${TRI8('BDH')} ${SIM} ${TRI8('BEC')} (g.g: góc vuông, ∠${I('B')} chung) nên ${I('BH')}·${I('BE')} = ${I('BD')}·${I('BC')}; tương tự ${TRI8('CDH')} ${SIM} ${TRI8('CFB')} nên ${I('CH')}·${I('CF')} = ${I('CD')}·${I('CB')}.`,.25],
      [`Cộng lại: ${I('BH')}·${I('BE')} + ${I('CH')}·${I('CF')} = ${I('BC')}(${I('BD')} + ${I('DC')}) = ${I('BC')}${sup(2)}.`,.25]]
    :[[`${TRI8('HEC')} ${SIM} ${TRI8('HFB')} (g.g: ∠${I('HEC')} = ∠${I('HFB')} = 90°, ∠${I('EHC')} = ∠${I('FHB')} đối đỉnh) nên ${fr('HE','HF')} = ${fr('HC','HB')}, tức ${I('HE')}·${I('HB')} = ${I('HF')}·${I('HC')}.`,.25],
      [`Từ câu a) có ${fr('AE','AB')} = ${fr('AF','AC')}, cùng ∠${I('A')} chung nên ${TRI8('AEF')} ${SIM} ${TRI8('ABC')} (c.g.c).`,.25]];
  return{kind:'tl',title:'Tam giác đồng dạng (ba đường cao)',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác nhọn ${I('ABC')}, hai đường cao ${I('BE')} và ${I('CF')} cắt nhau tại ${I('H')} (${I('E')} thuộc ${I('AC')}, ${I('F')} thuộc ${I('AB')}).${fig}Chứng minh ${TRI8('ABE')} ${SIM} ${TRI8('ACF')}, từ đó suy ra ${I('AE')}·${I('AC')} = ${I('AF')}·${I('AB')}.`},
    {pts:.5,html:partB}],
    sol:[ptxt([[`${TRI8('ABE')} và ${TRI8('ACF')} có ∠${I('AEB')} = ∠${I('AFC')} = 90°, ∠${I('A')} chung nên ${TRI8('ABE')} ${SIM} ${TRI8('ACF')} (g.g).`,.25],[`Suy ra ${fr('AE','AF')} = ${fr('AB','AC')}, tức ${I('AE')}·${I('AC')} = ${I('AF')}·${I('AB')}.`,.25]]),ptxt(solB)],
    chk:()=>{const d=(P,Q)=>Math.hypot(P[0]-Q[0],P[1]-Q[1]);return Math.abs(d(Pt.B,Pt.H)*d(Pt.B,Pt.E)+d(Pt.C,Pt.H)*d(Pt.C,Pt.F)-d(Pt.B,Pt.C)**2)<1e-9}};
});
