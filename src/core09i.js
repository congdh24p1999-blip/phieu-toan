/* ================================================================
   Toán 9 – bài hình học hoàn chỉnh MỘT hình, BA ý (a, b, c) như phần hình học
   trong đề tuyển sinh vào lớp 10: ý a chứng minh tứ giác nội tiếp / tính chất cơ bản,
   ý b chứng minh hệ thức, ý c tính toán hoặc chứng minh khó hơn.
   Mỗi bài 2 điểm (0,75 + 0,75 + 0,5); vai trò 'geo3' nên chỉ đề ôn thi vào 10 dùng,
   đề kiểm tra thường (mỗi câu tự luận 1 điểm) không lấy.
   Đề không kèm hình (thí sinh tự vẽ như đề thi thật); hình vẽ nằm ở hướng dẫn chấm.
   ================================================================ */
const G3=(id,ch,lv,les,gen)=>reg('tl',id,ch,lv,gen,{role:'geo3',g:9,hk:2,les});
const g3n=v=>{const x=Math.round(v*100)/100;return String(x).replace('.',',')};   /* số đo gọn: 2,4 */
const g3foot=(P,A,B)=>{const dx=B[0]-A[0],dy=B[1]-A[1],t=((P[0]-A[0])*dx+(P[1]-A[1])*dy)/(dx*dx+dy*dy);return[A[0]+t*dx,A[1]+t*dy]};
const g3fig=s=>`<div class="g3fig">${s}</div>`;

/* 1. Hai tiếp tuyến cắt nhau */
G3('tl9-g3-tan',9,'VD',[29,16,17],r=>{
  const [p,q,h]=r.pick([[3,4,5],[6,8,10],[9,12,15],[7,24,25]]),k=r.pick([1,2]),R=p*k,MA=q*k,OM=h*k;   /* chọn bộ số để AB là số thập phân hữu hạn */
  const AB=Q(2*R*MA,OM),OH=Q(R*R,OM);
  const fig=fig9Tan(R,OM,{ab:true,H:true});
  return{kind:'tl',title:'Hai tiếp tuyến cắt nhau',parts:[
    {pts:.75,html:`Cho đường tròn (${I('O')}; ${I('R')}) và điểm ${I('M')} nằm ngoài đường tròn. Từ ${I('M')} kẻ hai tiếp tuyến ${I('MA')}, ${I('MB')} với đường tròn (${I('A')}, ${I('B')} là các tiếp điểm). Gọi ${I('H')} là giao điểm của ${I('AB')} và ${I('OM')}.<br>Chứng minh tứ giác ${I('MAOB')} nội tiếp đường tròn.`},
    {pts:.75,html:`Chứng minh ${I('OM')} ⊥ ${I('AB')} tại ${I('H')} và ${I('OH')}·${I('OM')} = ${I('R')}${sup(2)}.`},
    {pts:.5,html:`Cho ${I('R')} = ${R} cm, ${I('OM')} = ${OM} cm. Tính độ dài ${I('AB')} và diện tích tứ giác ${I('MAOB')}.`}],
    sol:[g3fig(fig)+ptxt([[`MA ⊥ OA, MB ⊥ OB (tính chất tiếp tuyến) nên ∠MAO = ∠MBO = 90°.`,.25],[`Hai điểm A, B cùng nhìn đoạn OM dưới góc vuông nên A, B thuộc đường tròn đường kính OM.`,.25],[`Vậy tứ giác MAOB nội tiếp đường tròn đường kính OM.`,.25]]),
      ptxt([[`MA = MB (tính chất hai tiếp tuyến cắt nhau) và OA = OB = R nên OM là đường trung trực của AB.`,.25],[`Suy ra OM ⊥ AB tại H.`,.25],[`Tam giác OAM vuông tại A có đường cao AH nên OA² = OH·OM, tức OH·OM = R².`,.25]]),
      ptxt([[`MA = √(OM² − R²) = √(${OM*OM} − ${R*R}) = ${MA} (cm); AH = ${fr('OA·MA','OM')} = ${g3n(R*MA/OM)} (cm), nên AB = 2AH = ${g3n(AB[0]/AB[1])} (cm).`,.25],[`S(MAOB) = 2S(OAM) = OA·MA = ${R}·${MA} = ${R*MA} (cm²).`,.25]])],
    chk:()=>OM*OM===R*R+MA*MA&&OH[0]>0};
});

/* 2. Hai đường cao của tam giác nhọn */
G3('tl9-g3-alt',9,'VD',[29,27],r=>{
  const [A0,ct]=r.pick([[60,'1/2'],[45,'√2/2'],[30,'√3/2']]),a=r.pick([6,8,10,12,14]);
  const EF=A0===60?String(a/2):A0===45?`${a/2}√2`:`${a/2}√3`;
  /* hình: B(0,0), C(a,0), A phía trên sao cho tam giác nhọn */
  const B=[0,0],C=[a,0],hA=a*(A0===30?1.7:A0===45?1.05:0.8),A=[a*0.42,hA],E=g3foot(B,A,C),F=g3foot(C,A,B);
  const t=((C[0]-B[0])*(E[1]-B[1])-(C[1]-B[1])*(E[0]-B[0])),Hh=(()=>{/* giao BE và CF */const d1=[E[0]-B[0],E[1]-B[1]],d2=[F[0]-C[0],F[1]-C[1]],den=d1[0]*d2[1]-d1[1]*d2[0],s=((C[0]-B[0])*d2[1]-(C[1]-B[1])*d2[0])/den;return[B[0]+s*d1[0],B[1]+s*d1[1]]})();
  const fig=fig9({A,B,C,E,F,H:Hh},{segs:[['A','B'],['B','C'],['C','A'],['B','E'],['C','F'],['E','F']],right:[['B','E','C'],['C','F','B']],w:220,h:170});
  return{kind:'tl',title:'Tứ giác nội tiếp và tam giác đồng dạng',parts:[
    {pts:.75,html:`Cho tam giác nhọn ${I('ABC')} (${I('AB')} < ${I('AC')}), hai đường cao ${I('BE')} và ${I('CF')} cắt nhau tại ${I('H')}.<br>Chứng minh tứ giác ${I('BCEF')} nội tiếp đường tròn.`},
    {pts:.75,html:`Chứng minh ${I('AE')}·${I('AC')} = ${I('AF')}·${I('AB')}.`},
    {pts:.5,html:`Chứng minh tam giác ${I('AEF')} đồng dạng với tam giác ${I('ABC')}. Biết ∠${I('BAC')} = ${A0}° và ${I('BC')} = ${a} cm, tính độ dài ${I('EF')}.`}],
    sol:[g3fig(fig)+ptxt([[`∠BEC = 90° (BE là đường cao), ∠BFC = 90° (CF là đường cao).`,.25],[`E, F cùng nhìn đoạn BC dưới góc vuông nên E, F thuộc đường tròn đường kính BC.`,.25],[`Vậy tứ giác BCEF nội tiếp.`,.25]]),
      ptxt([[`Xét tam giác AEB và tam giác AFC: ∠AEB = ∠AFC = 90°, ∠BAC chung.`,.25],[`Nên ΔAEB ∽ ΔAFC (g.g).`,.25],[`Suy ra ${fr('AE','AF')} = ${fr('AB','AC')}, do đó AE·AC = AF·AB.`,.25]]),
      ptxt([[`Từ AE·AC = AF·AB có ${fr('AE','AB')} = ${fr('AF','AC')}, kết hợp ∠BAC chung nên ΔAEF ∽ ΔABC (c.g.c).`,.25],[`Tam giác AEB vuông tại E nên ${fr('AE','AB')} = cos ∠BAC = ${ct}; do đó EF = BC·cos ∠BAC = ${EF} (cm).`,.25]])],
    chk:()=>t!==0&&A[1]>0};
});

/* 3. Đường kính, tiếp tuyến tại một đầu mút */
G3('tl9-g3-diam',9,'VD',[27,16,12],r=>{
  const R=r.pick([3,4,5,6,8,10]),A0=r.pick([30,45,60]),AB=2*R;
  const r3=(n,d)=>{const q=Q(n,d);return q[1]===1?`${q[0]}√3`:fr(`${q[0]}√3`,q[1])};   /* n√3/d rút gọn */
  const BDt=A0===45?String(AB):A0===30?r3(AB,3):`${AB}√3`;
  const S=A0===45?String(AB*AB/2):A0===30?r3(AB*AB,6):r3(AB*AB,2);
  const th=2*A0,Cc=onC(R,th),Ap=[-R,0],t=(R-Ap[0])/(Cc[0]-Ap[0]),D=[R,Ap[1]+t*(Cc[1]-Ap[1])];
  const fig=fig9({A:Ap,B:[R,0],O:[0,0],C:Cc,D},{circ:[['O',R]],segs:[['A','B'],['A','D'],['B','D'],['B','C']],right:[['A','C','B'],['A','B','D']],lc:[0,R*0.3],w:220,h:180});
  return{kind:'tl',title:'Đường kính và tiếp tuyến',parts:[
    {pts:.75,html:`Cho đường tròn (${I('O')}; ${I('R')}) đường kính ${I('AB')}. Lấy điểm ${I('C')} thuộc đường tròn (${I('C')} khác ${I('A')}, ${I('B')}). Tiếp tuyến tại ${I('B')} của đường tròn cắt tia ${I('AC')} tại ${I('D')}.<br>Chứng minh ${I('BC')} ⊥ ${I('AD')}.`},
    {pts:.75,html:`Chứng minh ${I('AC')}·${I('AD')} = 4${I('R')}${sup(2)}.`},
    {pts:.5,html:`Cho ${I('R')} = ${R} cm và ∠${I('BAC')} = ${A0}°. Tính độ dài ${I('BD')} và diện tích tam giác ${I('ABD')}.`}],
    sol:[g3fig(fig)+ptxt([[`∠ACB là góc nội tiếp chắn nửa đường tròn.`,.25],[`Nên ∠ACB = 90°.`,.25],[`Do đó BC ⊥ AC, tức BC ⊥ AD.`,.25]]),
      ptxt([[`BD là tiếp tuyến tại B nên BD ⊥ AB, tam giác ABD vuông tại B.`,.25],[`BC là đường cao của tam giác vuông ABD nên AB² = AC·AD (hệ thức lượng).`,.25],[`Mà AB = 2R nên AC·AD = 4R².`,.25]]),
      ptxt([[`Tam giác ABD vuông tại B: BD = AB·tan ∠BAD = ${AB}·tan ${A0}° = ${BDt} (cm).`,.25],[`S(ABD) = ${fr(1,2)}AB·BD = ${S} (cm²).`,.25]])],
    chk:()=>D[1]>0&&!!BDt};
});

/* 4. Tiếp tuyến và cát tuyến cùng xuất phát từ một điểm */
G3('tl9-g3-sec',9,'VDC',[29,14,16],r=>{
  const [MC,CD,MA,R,OM]=r.pick([[4,5,6,8,10],[3,9,6,8,10],[8,10,12,9,15],[9,7,12,9,15],[4,12,8,15,17],[5,15,10,24,26]]),MD=MC+CD;
  /* hình: O gốc, M trên trục hoành, cát tuyến phía dưới, tiếp điểm A phía trên */
  const OH=Math.sqrt(R*R-CD*CD/4),phi=Math.asin(OH/OM),u=[-Math.cos(phi),-Math.sin(phi)],M=[OM,0],MH=MC+CD/2,Hh=[M[0]+u[0]*MH,M[1]+u[1]*MH];
  const C=[M[0]+u[0]*MC,M[1]+u[1]*MC],D=[M[0]+u[0]*MD,M[1]+u[1]*MD],A=onC(R,Math.acos(R/OM)*180/Math.PI);
  const fig=fig9({O:[0,0],M,A,C,D,H:Hh},{circ:[['O',R]],segs:[['M','A'],['M','D'],['O','A']],dashed:[['O','H'],['O','M']],right:[['O','A','M'],['O','H','M']],lc:'O',w:240,h:170});
  return{kind:'tl',title:'Tiếp tuyến và cát tuyến',parts:[
    {pts:.75,html:`Cho đường tròn (${I('O')}; ${I('R')}) và điểm ${I('M')} nằm ngoài đường tròn. Kẻ tiếp tuyến ${I('MA')} (${I('A')} là tiếp điểm) và cát tuyến ${I('MCD')} không đi qua ${I('O')} (${I('C')} nằm giữa ${I('M')} và ${I('D')}). Gọi ${I('H')} là trung điểm của ${I('CD')}.<br>Chứng minh bốn điểm ${I('M')}, ${I('A')}, ${I('O')}, ${I('H')} cùng thuộc một đường tròn.`},
    {pts:.75,html:`Chứng minh ${I('MA')}${sup(2)} = ${I('MC')}·${I('MD')}.`},
    {pts:.5,html:`Cho ${I('MC')} = ${MC} cm, ${I('CD')} = ${CD} cm và ${I('R')} = ${R} cm. Tính độ dài ${I('MA')} và ${I('OM')}.`}],
    sol:[g3fig(fig)+ptxt([[`MA ⊥ OA (tính chất tiếp tuyến) nên ∠MAO = 90°.`,.25],[`H là trung điểm của dây CD không đi qua tâm nên OH ⊥ CD, tức ∠MHO = 90°.`,.25],[`A, H cùng nhìn OM dưới góc vuông nên M, A, O, H cùng thuộc đường tròn đường kính OM.`,.25]]),
      ptxt([[`Tam giác OAM vuông tại A: MA² = OM² − R².`,.25],[`MC·MD = (MH − HC)(MH + HC) = MH² − HC² (vì HC = HD).`,.25],[`Mà MH² = OM² − OH² và HC² = R² − OH² nên MC·MD = OM² − R² = MA².`,.25]]),
      ptxt([[`MD = MC + CD = ${MD} cm; MA² = MC·MD = ${MC}·${MD} = ${MA*MA}, nên MA = ${MA} cm.`,.25],[`OM = √(MA² + R²) = √(${MA*MA} + ${R*R}) = ${OM} (cm).`,.25]])],
    chk:()=>MA*MA===MC*MD&&OM*OM===MA*MA+R*R&&CD<2*R};
});

/* 5. Nửa đường tròn với hai tiếp tuyến Ax, By */
G3('tl9-g3-semi',9,'VD',[29,17,12],r=>{
  const [R,AC]=r.pick([[6,4],[6,3],[4,2],[10,5],[12,8],[6,9],[12,9],[15,9]]),BD=R*R/AC,CD=AC+BD;
  const th=180-2*Math.atan(AC/R)*180/Math.PI,M=onC(R,th);
  const fig=fig9({A:[-R,0],B:[R,0],O:[0,0],M,C:[-R,AC],D:[R,BD]},{arcs:[['O',R,0,180]],segs:[['A','B'],['A','C'],['B','D'],['C','D'],['O','C'],['O','D'],['O','M']],right:[['O','A','C'],['O','M','C']],lc:[0,R*0.4],w:230,h:170});
  return{kind:'tl',title:'Nửa đường tròn và hai tiếp tuyến',parts:[
    {pts:.75,html:`Cho nửa đường tròn (${I('O')}; ${I('R')}) đường kính ${I('AB')}. Trên nửa mặt phẳng bờ ${I('AB')} chứa nửa đường tròn, kẻ các tiếp tuyến ${I('Ax')}, ${I('By')}. Lấy điểm ${I('M')} thuộc nửa đường tròn (${I('M')} khác ${I('A')}, ${I('B')}); tiếp tuyến tại ${I('M')} cắt ${I('Ax')}, ${I('By')} lần lượt tại ${I('C')} và ${I('D')}.<br>Chứng minh tứ giác ${I('ACMO')} nội tiếp đường tròn.`},
    {pts:.75,html:`Chứng minh ${I('CD')} = ${I('AC')} + ${I('BD')} và ∠${I('COD')} = 90°.`},
    {pts:.5,html:`Chứng minh ${I('AC')}·${I('BD')} = ${I('R')}${sup(2)}. Áp dụng: cho ${I('R')} = ${R} cm và ${I('AC')} = ${AC} cm, tính ${I('BD')} và ${I('CD')}.`}],
    sol:[g3fig(fig)+ptxt([[`CA ⊥ OA (Ax là tiếp tuyến), CM ⊥ OM (CD là tiếp tuyến tại M) nên ∠OAC = ∠OMC = 90°.`,.25],[`∠OAC + ∠OMC = 180°.`,.25],[`Vậy tứ giác ACMO nội tiếp (đường tròn đường kính OC).`,.25]]),
      ptxt([[`Theo tính chất hai tiếp tuyến cắt nhau: CA = CM, DB = DM, nên CD = CM + MD = AC + BD.`,.25],[`OC là tia phân giác của ∠AOM, OD là tia phân giác của ∠MOB.`,.25],[`∠AOM và ∠MOB kề bù nên ∠COD = ${fr(1,2)}·180° = 90°.`,.25]]),
      ptxt([[`Tam giác COD vuông tại O có đường cao OM nên OM² = CM·MD, tức R² = AC·BD.`,.25],[`BD = ${fr('R²','AC')} = ${fr(R*R,AC)} = ${g3n(BD)} (cm); CD = AC + BD = ${g3n(CD)} (cm).`,.25]])],
    chk:()=>Number.isInteger(BD)&&th>5&&th<175};
});

/* 6. Đường tròn đường kính là đường cao của tam giác vuông */
G3('tl9-g3-rect',9,'VDC',[27,29,12],r=>{
  const [p,q,h]=r.pick([[3,4,5],[6,8,10],[9,12,15],[7,24,25],[12,16,20]]),AB=p,AC=q,BC=h,AH=Q(p*q,h);
  const A=[0,0],B=[AB,0],C=[0,AC],Hh=g3foot(A,B,C),D=[Hh[0],0],E=[0,Hh[1]],K=[Hh[0]/2,Hh[1]/2],rr=Math.hypot(Hh[0],Hh[1])/2;
  const fig=fig9({A,B,C,H:Hh,D,E},{circ:[[K,rr]],segs:[['A','B'],['B','C'],['C','A'],['A','H'],['H','D'],['H','E'],['D','E']],right:[['B','A','C'],['A','H','B']],w:220,h:180});
  return{kind:'tl',title:'Đường tròn đường kính là đường cao',parts:[
    {pts:.75,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} (${I('AB')} < ${I('AC')}), đường cao ${I('AH')}. Đường tròn đường kính ${I('AH')} cắt ${I('AB')}, ${I('AC')} lần lượt tại ${I('D')} và ${I('E')} (khác ${I('A')}).<br>Chứng minh tứ giác ${I('ADHE')} là hình chữ nhật. Tính ${I('DE')} biết ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm.`},
    {pts:.75,html:`Chứng minh ${I('AD')}·${I('AB')} = ${I('AE')}·${I('AC')}.`},
    {pts:.5,html:`Chứng minh tứ giác ${I('BDEC')} nội tiếp đường tròn.`}],
    sol:[g3fig(fig)+ptxt([[`∠ADH = ∠AEH = 90° (góc nội tiếp chắn nửa đường tròn đường kính AH) và ∠DAE = 90°, nên ADHE là hình chữ nhật.`,.25],[`BC = √(AB² + AC²) = ${BC} cm; AH = ${fr('AB·AC','BC')} = ${g3n(AH[0]/AH[1])} cm.`,.25],[`ADHE là hình chữ nhật nên DE = AH = ${g3n(AH[0]/AH[1])} cm.`,.25]]),
      ptxt([[`Tam giác AHB vuông tại H có đường cao HD nên AH² = AD·AB.`,.25],[`Tam giác AHC vuông tại H có đường cao HE nên AH² = AE·AC.`,.25],[`Suy ra AD·AB = AE·AC.`,.25]]),
      ptxt([[`Từ AD·AB = AE·AC có ${fr('AD','AC')} = ${fr('AE','AB')}, kết hợp ∠DAE chung nên ΔADE ∽ ΔACB (c.g.c), suy ra ∠ADE = ∠ACB.`,.25],[`Do đó ∠BDE + ∠ECB = ∠BDE + ∠ADE = 180°, nên tứ giác BDEC nội tiếp.`,.25]])],
    chk:()=>AB<AC&&AB*AB+AC*AC===BC*BC};
});
