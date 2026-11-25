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
  const [p,q,h]=r.pick([[3,4,5],[6,8,10],[9,12,15],[7,24,25],[12,16,20]]),AB=p,AC=q,BC=h,AH=Q(p*q,h),KR=Q(p*q,h*h);
  const A=[0,0],B=[AB,0],C=[0,AC],Hh=g3foot(A,B,C),D=[Hh[0],0],E=[0,Hh[1]],K=[Hh[0]/2,Hh[1]/2],rr=Math.hypot(Hh[0],Hh[1])/2;
  const fig=fig9({A,B,C,H:Hh,D,E},{circ:[[K,rr]],segs:[['A','B'],['B','C'],['C','A'],['A','H'],['H','D'],['H','E'],['D','E']],right:[['B','A','C'],['A','H','B']],w:220,h:180});
  return{kind:'tl',title:'Đường tròn đường kính là đường cao',parts:[
    {pts:.75,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} (${I('AB')} < ${I('AC')}), đường cao ${I('AH')}. Đường tròn đường kính ${I('AH')} cắt ${I('AB')}, ${I('AC')} lần lượt tại ${I('D')} và ${I('E')} (khác ${I('A')}).<br>Chứng minh tứ giác ${I('ADHE')} là hình chữ nhật. Tính ${I('DE')} biết ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm.`},
    {pts:.75,html:`Chứng minh ${I('AD')}·${I('AB')} = ${I('AE')}·${I('AC')}.`},
    {pts:.5,html:`Chứng minh tứ giác ${I('BDEC')} nội tiếp đường tròn và tính tỉ số diện tích của tam giác ${I('ADE')} và tam giác ${I('ABC')}.`}],
    sol:[g3fig(fig)+ptxt([[`∠ADH = ∠AEH = 90° (góc nội tiếp chắn nửa đường tròn đường kính AH) và ∠DAE = 90°, nên ADHE là hình chữ nhật.`,.25],[`BC = √(AB² + AC²) = ${BC} cm; AH = ${fr('AB·AC','BC')} = ${g3n(AH[0]/AH[1])} cm.`,.25],[`ADHE là hình chữ nhật nên DE = AH = ${g3n(AH[0]/AH[1])} cm.`,.25]]),
      ptxt([[`Tam giác AHB vuông tại H có đường cao HD nên AH² = AD·AB.`,.25],[`Tam giác AHC vuông tại H có đường cao HE nên AH² = AE·AC.`,.25],[`Suy ra AD·AB = AE·AC.`,.25]]),
      ptxt([[`Từ AD·AB = AE·AC có ${fr('AD','AC')} = ${fr('AE','AB')}, kết hợp ∠DAE chung nên ΔADE ∽ ΔACB (c.g.c), suy ra ∠ADE = ∠ACB; do đó ∠BDE + ∠ECB = ∠BDE + ∠ADE = 180°, tứ giác BDEC nội tiếp.`,.25],[`Tỉ số đồng dạng ${fr('DE','CB')} = ${fr('AH','BC')} = ${qh(KR)}, nên ${fr('S(ADE)','S(ABC)')} = (${qh(KR)})² = ${qh(Q(KR[0]*KR[0],KR[1]*KR[1]))}.`,.25]])],
    chk:()=>AB<AC&&AB*AB+AC*AC===BC*BC};
});

/* ---------- 10 dạng bổ sung ---------- */
/* căn bậc hai rút gọn: 80 → 4√5 */
const g3sq=n=>{let k=Math.floor(Math.sqrt(n));while(k>1&&n%(k*k))k--;const m=n/(k*k);return m===1?String(k):`${k>1?k:''}√${m}`};
/* giao điểm hai đường thẳng PQ và RS */
const g3x=(P,Q,R,S)=>{const d1=[Q[0]-P[0],Q[1]-P[1]],d2=[S[0]-R[0],S[1]-R[1]],den=d1[0]*d2[1]-d1[1]*d2[0],s=((R[0]-P[0])*d2[1]-(R[1]-P[1])*d2[0])/den;return[P[0]+s*d1[0],P[1]+s*d1[1]]};

/* 7. Đường kính vuông góc với dây */
G3('tl9-g3-chord',9,'VD',[14,27,12],r=>{
  const [R,OH,CH]=r.pick([[5,3,4],[5,4,3],[10,6,8],[10,8,6],[13,5,12],[13,12,5],[17,8,15],[17,15,8]]),AH=R+OH,AB=2*R,AC2=AH*AB;
  const fig=fig9({A:[-R,0],B:[R,0],O:[0,0],H:[OH,0],C:[OH,CH],D:[OH,-CH]},{circ:[['O',R]],segs:[['A','B'],['C','D'],['A','C'],['A','D'],['B','C']],right:[['O','H','C'],['A','C','B']],lc:'O',off:{H:[8,13]},w:200,h:200});
  return{kind:'tl',title:'Đường kính vuông góc với dây',parts:[
    {pts:.75,html:`Cho đường tròn (${I('O')}; ${I('R')}) đường kính ${I('AB')}. Lấy điểm ${I('H')} thuộc đoạn ${I('OB')} (${I('H')} khác ${I('O')}, ${I('B')}); đường thẳng qua ${I('H')} vuông góc với ${I('AB')} cắt đường tròn tại ${I('C')} và ${I('D')}.<br>Chứng minh ${I('H')} là trung điểm của ${I('CD')} và ${I('AC')} = ${I('AD')}.`},
    {pts:.75,html:`Chứng minh ${I('AC')}${sup(2)} = ${I('AH')}·${I('AB')}.`},
    {pts:.5,html:`Cho ${I('R')} = ${R} cm, ${I('OH')} = ${OH} cm. Tính độ dài ${I('CD')} và ${I('AC')}.`}],
    sol:[g3fig(fig)+ptxt([[`Đường kính AB vuông góc với dây CD tại H nên H là trung điểm của CD.`,.25],[`Do đó AB là đường trung trực của CD.`,.25],[`A thuộc AB nên AC = AD.`,.25]]),
      ptxt([[`∠ACB = 90° (góc nội tiếp chắn nửa đường tròn).`,.25],[`Tam giác ACB vuông tại C có đường cao CH.`,.25],[`Theo hệ thức lượng trong tam giác vuông: AC² = AH·AB.`,.25]]),
      ptxt([[`Tam giác OHC vuông tại H: CH = √(R² − OH²) = √(${R*R} − ${OH*OH}) = ${CH} (cm), nên CD = 2CH = ${2*CH} (cm).`,.25],[`AH = R + OH = ${AH} cm, AB = ${AB} cm; AC = √(AH·AB) = √${AC2} = ${g3sq(AC2)} (cm).`,.25]])],
    chk:()=>R*R===OH*OH+CH*CH&&OH<R};
});

/* 8. Tia phân giác cắt đường tròn tại điểm chính giữa cung */
G3('tl9-g3-bis',9,'VDC',[27,28,29],r=>{
  const al=r.pick([50,60,70,80]),dA=r.pick([-28,-14,14,28]),R=r.pick([3,4,5,6,8,10]),DB=2*R*Math.sin(al*Math.PI/360);
  const P={A:onC(1,90+dA),B:onC(1,270-al),C:onC(1,270+al),D:onC(1,270),O:[0,0]};
  const la=Math.hypot(P.B[0]-P.C[0],P.B[1]-P.C[1]),lb=Math.hypot(P.A[0]-P.C[0],P.A[1]-P.C[1]),lc=Math.hypot(P.A[0]-P.B[0],P.A[1]-P.B[1]),s=la+lb+lc;
  P.I=[(la*P.A[0]+lb*P.B[0]+lc*P.C[0])/s,(la*P.A[1]+lb*P.B[1]+lc*P.C[1])/s];
  const fig=fig9(P,{circ:[['O',1]],segs:[['A','B'],['B','C'],['C','A'],['A','D'],['B','D'],['C','D'],['B','I']],dashed:[['O','D']],lc:'O',w:210,h:210});
  return{kind:'tl',title:'Tia phân giác và điểm chính giữa cung',parts:[
    {pts:.75,html:`Cho tam giác ${I('ABC')} nội tiếp đường tròn (${I('O')}) (${I('AB')} ≠ ${I('AC')}). Tia phân giác của góc ${I('BAC')} cắt đường tròn tại ${I('D')} (${I('D')} khác ${I('A')}).<br>Chứng minh ${I('D')} là điểm chính giữa của cung ${I('BC')} không chứa ${I('A')} và ${I('OD')} ⊥ ${I('BC')}.`},
    {pts:.75,html:`Biết ∠${I('BAC')} = ${al}°. Tính số đo các góc ${I('BOC')}, ${I('BDC')} và ${I('BOD')}.`},
    {pts:.5,html:`Gọi ${I('I')} là giao điểm của các đường phân giác trong của tam giác ${I('ABC')}. Chứng minh ${I('DB')} = ${I('DI')}. Cho bán kính đường tròn bằng ${R} cm, tính độ dài ${I('DI')} (làm tròn đến hàng phần mười).`}],
    sol:[g3fig(fig)+ptxt([[`∠BAD = ∠CAD (AD là phân giác) nên hai cung BD và CD (không chứa A) bằng nhau.`,.25],[`Vậy D là điểm chính giữa của cung BC không chứa A, suy ra DB = DC.`,.25],[`Lại có OB = OC nên OD là đường trung trực của BC, do đó OD ⊥ BC.`,.25]]),
      ptxt([[`∠BOC = 2∠BAC = ${2*al}° (góc ở tâm và góc nội tiếp cùng chắn cung BC).`,.25],[`Tứ giác ABDC nội tiếp nên ∠BDC = 180° − ∠BAC = ${180-al}°.`,.25],[`D là điểm chính giữa cung BC nên ∠BOD = ${fr(1,2)}∠BOC = ${al}°.`,.25]]),
      ptxt([[`∠DBI = ∠DBC + ∠CBI = ∠DAC + ∠ABI (∠DBC = ∠DAC cùng chắn cung DC) = ∠BAI + ∠ABI = ∠BID (góc ngoài của tam giác ABI); tam giác DBI cân tại D nên DB = DI.`,.25],[`Tam giác OBD cân tại O có ∠BOD = ${al}°; kẻ OK ⊥ BD thì ∠BOK = ${al/2}°, BK = R·sin ${al/2}°, nên DI = DB = 2·${R}·sin ${al/2}° ≈ ${String(Math.round(DB*10)/10).replace('.',',')} (cm).`,.25]])],
    chk:()=>DB>0};
});

/* 9. Đường tròn đường kính một cạnh góc vuông */
G3('tl9-g3-leg',9,'VD',[16,17,12],r=>{
  const [AB,AC,BC]=r.pick([[3,4,5],[6,8,10],[9,12,15],[12,16,20],[4,3,5],[8,6,10],[7,24,25]]),BD=Q(AB*AB,BC);
  const A=[0,0],B=[0,AB],C=[AC,0],D=g3foot(A,B,C),M=[0,AB/2],K=[AC/2,0];
  const fig=fig9({A,B,C,D,M},{circ:[[K,AC/2]],segs:[['A','B'],['B','C'],['C','A'],['A','D'],['M','D']],right:[['B','A','C'],['A','D','C']],w:210,h:190});
  return{kind:'tl',title:'Đường tròn đường kính là cạnh góc vuông',parts:[
    {pts:.75,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}. Đường tròn đường kính ${I('AC')} cắt cạnh ${I('BC')} tại ${I('D')} (${I('D')} khác ${I('C')}).<br>Chứng minh ${I('AD')} ⊥ ${I('BC')} và ${I('AB')}${sup(2)} = ${I('BD')}·${I('BC')}.`},
    {pts:.75,html:`Chứng minh ${I('AB')} là tiếp tuyến của đường tròn đường kính ${I('AC')}. Tiếp tuyến tại ${I('D')} của đường tròn này cắt ${I('AB')} tại ${I('M')}; chứng minh ${I('MA')} = ${I('MD')}.`},
    {pts:.5,html:`Chứng minh ${I('M')} là trung điểm của ${I('AB')}. Cho ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm, tính độ dài ${I('BD')}.`}],
    sol:[g3fig(fig)+ptxt([[`∠ADC = 90° (góc nội tiếp chắn nửa đường tròn đường kính AC), nên AD ⊥ BC.`,.25],[`Tam giác ABC vuông tại A có đường cao AD.`,.25],[`Theo hệ thức lượng: AB² = BD·BC.`,.25]]),
      ptxt([[`AB ⊥ AC tại A và A thuộc đường tròn đường kính AC nên AB là tiếp tuyến của đường tròn.`,.25],[`MA và MD là hai tiếp tuyến của đường tròn cắt nhau tại M.`,.25],[`Theo tính chất hai tiếp tuyến cắt nhau: MA = MD.`,.25]]),
      ptxt([[`MA = MD nên ∠MDA = ∠MAD; ∠MDB = 90° − ∠MDA = 90° − ∠MAD = ∠MBD, nên MD = MB. Vậy MA = MB, M là trung điểm của AB.`,.25],[`BC = √(AB² + AC²) = ${BC} cm; BD = ${fr('AB²','BC')} = ${fr(AB*AB,BC)} = ${g3n(BD[0]/BD[1])} (cm).`,.25]])],
    chk:()=>AB*AB+AC*AC===BC*BC};
});

/* 10. Hình vuông và đường tròn đường kính là đường chéo */
G3('tl9-g3-square',9,'VD',[29,27],r=>{
  const [a,CE,DE]=r.pick([[4,3,5],[8,6,10],[12,9,15],[16,12,20],[24,7,25]]),BE=a-CE,BH=Q(BE*a,DE);
  const A=[0,a],B=[a,a],C=[a,0],D=[0,0],E=[a,CE],H=g3foot(B,D,E);
  const fig=fig9({A,B,C,D,E,H},{segs:[['A','B'],['B','C'],['C','D'],['D','A'],['D','H'],['B','H']],dashed:[['B','D'],['A','H']],right:[['B','H','D']],lc:[a/2,a/2],w:190,h:190});
  return{kind:'tl',title:'Hình vuông và tứ giác nội tiếp',parts:[
    {pts:.75,html:`Cho hình vuông ${I('ABCD')} cạnh ${a} cm. Lấy điểm ${I('E')} thuộc cạnh ${I('BC')} sao cho ${I('CE')} = ${CE} cm. Kẻ ${I('BH')} vuông góc với đường thẳng ${I('DE')} tại ${I('H')}.<br>Chứng minh tứ giác ${I('ABHD')} nội tiếp đường tròn.`},
    {pts:.75,html:`Chứng minh ∠${I('AHD')} = 45°.`},
    {pts:.5,html:`Tính độ dài ${I('DE')} và ${I('BH')}.`}],
    sol:[g3fig(fig)+ptxt([[`∠BAD = 90° (ABCD là hình vuông), ∠BHD = 90° (BH ⊥ DE).`,.25],[`A và H cùng nhìn đoạn BD dưới góc vuông nên A, H thuộc đường tròn đường kính BD.`,.25],[`Vậy tứ giác ABHD nội tiếp.`,.25]]),
      ptxt([[`∠AHD và ∠ABD là hai góc nội tiếp cùng chắn cung AD của đường tròn đường kính BD.`,.25],[`Nên ∠AHD = ∠ABD.`,.25],[`BD là đường chéo của hình vuông nên ∠ABD = 45°; vậy ∠AHD = 45°.`,.25]]),
      ptxt([[`Tam giác DCE vuông tại C: DE = √(CD² + CE²) = √(${a*a} + ${CE*CE}) = ${DE} (cm).`,.25],[`BE = ${BE} cm; S(BDE) = ${fr(1,2)}BE·CD = ${fr(1,2)}BH·DE, nên BH = ${fr('BE·CD','DE')} = ${g3n(BH[0]/BH[1])} (cm).`,.25]])],
    chk:()=>a*a+CE*CE===DE*DE&&CE<a};
});

/* 11. Trực tâm và đường kính qua một đỉnh */
G3('tl9-g3-orth',9,'VD',[29,27],r=>{
  const g=r.pick([50,55,60,65,70,75]),sh=r.pick([0,8,-8]),[Rv,hb,OMv]=r.pick([[5,4,3],[5,3,4],[10,8,6],[10,6,8],[13,12,5],[13,5,12],[17,15,8],[17,8,15]]);
  const A=onC(1,100+sh),B=onC(1,215),C=onC(1,325),D=g3foot(A,B,C),E=g3foot(B,A,C),H=g3x(A,D,B,E),K=[-A[0],-A[1]];
  const fig=fig9({A,B,C,D,E,H,K,O:[0,0]},{circ:[['O',1]],segs:[['A','B'],['B','C'],['C','A'],['A','D'],['B','E'],['B','K'],['C','K'],['C','H']],dashed:[['A','K']],right:[['A','D','C'],['B','E','C']],lc:'O',w:210,h:210});
  return{kind:'tl',title:'Trực tâm và tứ giác nội tiếp',parts:[
    {pts:.75,html:`Cho tam giác nhọn ${I('ABC')} nội tiếp đường tròn (${I('O')}). Các đường cao ${I('AD')}, ${I('BE')} cắt nhau tại ${I('H')}.<br>Chứng minh tứ giác ${I('CDHE')} nội tiếp. Biết ∠${I('ACB')} = ${g}°, tính số đo ∠${I('DHE')}.`},
    {pts:.75,html:`Chứng minh tứ giác ${I('ABDE')} nội tiếp và ${I('CD')}·${I('CB')} = ${I('CE')}·${I('CA')}.`},
    {pts:.5,html:`Kẻ đường kính ${I('AK')} của đường tròn (${I('O')}). Chứng minh tứ giác ${I('BHCK')} là hình bình hành. Cho bán kính ${I('R')} = ${Rv} cm và ${I('BC')} = ${2*hb} cm, tính độ dài ${I('AH')}.`}],
    sol:[g3fig(fig)+ptxt([[`∠HDC = ∠HEC = 90° (AD, BE là các đường cao).`,.25],[`∠HDC + ∠HEC = 180° nên tứ giác CDHE nội tiếp.`,.25],[`Suy ra ∠DHE = 180° − ∠DCE = 180° − ${g}° = ${180-g}°.`,.25]]),
      ptxt([[`∠ADB = ∠AEB = 90° nên D, E cùng thuộc đường tròn đường kính AB; tứ giác ABDE nội tiếp.`,.25],[`Tam giác CDA và tam giác CEB có ∠C chung, ∠CDA = ∠CEB = 90° nên ΔCDA ∽ ΔCEB (g.g).`,.25],[`Suy ra ${fr('CD','CE')} = ${fr('CA','CB')}, tức CD·CB = CE·CA.`,.25]]),
      ptxt([[`∠ABK = 90° (góc nội tiếp chắn nửa đường tròn) nên BK ⊥ AB, mà CH ⊥ AB (H là trực tâm) nên BK ∥ CH; tương tự CK ⊥ AC, BH ⊥ AC nên CK ∥ BH. Vậy BHCK là hình bình hành.`,.25],[`Gọi M là trung điểm BC thì M là trung điểm HK và OM ⊥ BC; OM là đường trung bình của tam giác AHK nên AH = 2OM. OM = √(R² − BM²) = √(${Rv*Rv} − ${hb*hb}) = ${OMv} (cm), nên AH = ${2*OMv} cm.`,.25]])],
    chk:()=>Rv*Rv===hb*hb+OMv*OMv};
});

/* 12. Hai tiếp tuyến khi OA = 2R: tam giác đều, diện tích phần giới hạn */
G3('tl9-g3-equit',9,'VD',[29,15,17],r=>{
  const R=r.pick([2,3,4,5,6]),S=R*R*(Math.sqrt(3)-Math.PI/3);
  const fig=fig9({O:[0,0],A:[2*R,0],B:onC(R,60),C:onC(R,-60)},{circ:[['O',R]],segs:[['A','B'],['A','C'],['O','B'],['O','C'],['B','C']],dashed:[['O','A']],right:[['O','B','A'],['O','C','A']],lc:[R*0.8,0],w:230,h:160});
  return{kind:'tl',title:'Tiếp tuyến, tam giác đều và hình quạt',parts:[
    {pts:.75,html:`Cho đường tròn (${I('O')}; ${I('R')}) và điểm ${I('A')} sao cho ${I('OA')} = 2${I('R')}. Từ ${I('A')} kẻ hai tiếp tuyến ${I('AB')}, ${I('AC')} với đường tròn (${I('B')}, ${I('C')} là các tiếp điểm).<br>Chứng minh tứ giác ${I('ABOC')} nội tiếp đường tròn.`},
    {pts:.75,html:`Chứng minh tam giác ${I('ABC')} là tam giác đều.`},
    {pts:.5,html:`Cho ${I('R')} = ${R} cm. Tính diện tích phần mặt phẳng giới hạn bởi hai tiếp tuyến ${I('AB')}, ${I('AC')} và cung nhỏ ${I('BC')} (làm tròn kết quả đến hàng phần trăm).`}],
    sol:[g3fig(fig)+ptxt([[`AB ⊥ OB, AC ⊥ OC (tính chất tiếp tuyến) nên ∠ABO = ∠ACO = 90°.`,.25],[`∠ABO + ∠ACO = 180°.`,.25],[`Vậy tứ giác ABOC nội tiếp (đường tròn đường kính OA).`,.25]]),
      ptxt([[`Tam giác OAB vuông tại B có sin ∠OAB = ${fr('OB','OA')} = ${fr(1,2)} nên ∠OAB = 30°.`,.25],[`AO là tia phân giác của ∠BAC (tính chất hai tiếp tuyến cắt nhau) nên ∠BAC = 60°.`,.25],[`Lại có AB = AC nên tam giác ABC đều.`,.25]]),
      ptxt([[`AB = √(OA² − R²) = R√3; S(ABOC) = 2S(OAB) = R·R√3 = ${R*R}√3 (cm²); ∠BOC = 180° − 60° = 120° nên S(quạt BOC) = ${fr('πR²·120','360')} = ${fr(`${R*R}π`,3)} (cm²).`,.25],[`Diện tích cần tìm: S = ${R*R}√3 − ${fr(`${R*R}π`,3)} ≈ ${g3n(S)} (cm²).`,.25]])],
    chk:()=>S>0};
});

/* 13. Hai cát tuyến cắt nhau ngoài đường tròn */
G3('tl9-g3-secs',9,'VDC',[29,27],r=>{
  const [EA,AB,ED]=r.pick([[4,5,3],[3,9,4],[6,4,5],[5,7,6],[2,10,3],[4,8,6]]),EB=EA+AB,EC=EA*EB/ED,CD=EC-ED;
  /* hình minh hoạ: E ngoài đường tròn đơn vị, hai cát tuyến */
  const Ep=[2.3,0],sec=th=>{const u=[-Math.cos(th),Math.sin(th)],b=Ep[0]*u[0]+Ep[1]*u[1],c=Ep[0]*Ep[0]+Ep[1]*Ep[1]-1,dd=Math.sqrt(b*b-c);return[-b-dd,-b+dd].map(t=>[Ep[0]+t*u[0],Ep[1]+t*u[1]])};
  const [Ap,Bp]=sec(0.28),[Dp,Cp]=sec(-0.2);
  const fig=fig9({E:Ep,A:Ap,B:Bp,C:Cp,D:Dp,O:[0,0]},{circ:[['O',1]],segs:[['E','B'],['E','C'],['A','D'],['B','C']],lc:'O',w:240,h:170});
  return{kind:'tl',title:'Hai cát tuyến cắt nhau',parts:[
    {pts:.75,html:`Cho tứ giác ${I('ABCD')} nội tiếp đường tròn (${I('O')}). Hai tia ${I('BA')} và ${I('CD')} cắt nhau tại ${I('E')} (${I('A')} nằm giữa ${I('E')} và ${I('B')}, ${I('D')} nằm giữa ${I('E')} và ${I('C')}).<br>Chứng minh ∠${I('EAD')} = ∠${I('ECB')}.`},
    {pts:.75,html:`Chứng minh tam giác ${I('EAD')} đồng dạng với tam giác ${I('ECB')}, từ đó suy ra ${I('EA')}·${I('EB')} = ${I('ED')}·${I('EC')}.`},
    {pts:.5,html:`Cho ${I('EA')} = ${EA} cm, ${I('AB')} = ${AB} cm, ${I('ED')} = ${ED} cm. Tính độ dài ${I('EC')} và ${I('CD')}.`}],
    sol:[g3fig(fig)+ptxt([[`Tứ giác ABCD nội tiếp nên ∠DAB + ∠DCB = 180°.`,.25],[`∠EAD + ∠DAB = 180° (hai góc kề bù).`,.25],[`Suy ra ∠EAD = ∠DCB, tức ∠EAD = ∠ECB.`,.25]]),
      ptxt([[`Xét tam giác EAD và tam giác ECB: ∠E chung, ∠EAD = ∠ECB.`,.25],[`Nên ΔEAD ∽ ΔECB (g.g).`,.25],[`Suy ra ${fr('EA','EC')} = ${fr('ED','EB')}, do đó EA·EB = ED·EC.`,.25]]),
      ptxt([[`EB = EA + AB = ${EB} cm; EC = ${fr('EA·EB','ED')} = ${fr(`${EA}·${EB}`,ED)} = ${g3n(EC)} (cm).`,.25],[`CD = EC − ED = ${g3n(CD)} (cm).`,.25]])],
    chk:()=>Number.isInteger(EC)&&CD>0};
});

/* 14. Tam giác cân nội tiếp, đường cao qua tâm */
G3('tl9-g3-isos',9,'VD',[28,27,12],r=>{
  const [m,AH,b]=r.pick([[3,4,5],[6,8,10],[9,12,15],[12,16,20],[12,9,15]]),AD=b*b/AH,R=AD/2;
  const A=[0,AH],B=[-m,0],C=[m,0],D=[0,AH-AD],O=[0,AH-R];
  const fig=fig9({A,B,C,H:[0,0],D,O},{circ:[['O',R]],segs:[['A','B'],['A','C'],['B','C'],['A','D'],['B','D'],['C','D']],right:[['A','H','C'],['A','B','D']],lc:'O',off:{H:[9,13],O:[-9,4]},w:190,h:210});
  return{kind:'tl',title:'Tam giác cân nội tiếp đường tròn',parts:[
    {pts:.75,html:`Cho tam giác ${I('ABC')} cân tại ${I('A')} nội tiếp đường tròn (${I('O')}; ${I('R')}). Đường cao ${I('AH')} của tam giác cắt đường tròn tại ${I('D')} (${I('D')} khác ${I('A')}).<br>Chứng minh ${I('AD')} là đường kính của đường tròn (${I('O')}) và ∠${I('ABD')} = 90°.`},
    {pts:.75,html:`Chứng minh ${I('AB')}${sup(2)} = ${I('AH')}·${I('AD')} và ${I('BH')}${sup(2)} = ${I('AH')}·${I('HD')}.`},
    {pts:.5,html:`Cho ${I('AB')} = ${I('AC')} = ${b} cm và ${I('BC')} = ${2*m} cm. Tính độ dài ${I('AH')} và bán kính ${I('R')}.`}],
    sol:[g3fig(fig)+ptxt([[`Tam giác ABC cân tại A nên đường cao AH đồng thời là đường trung trực của BC.`,.25],[`OB = OC nên O thuộc đường trung trực của BC, tức O thuộc AH; do đó AD là đường kính.`,.25],[`∠ABD là góc nội tiếp chắn nửa đường tròn nên ∠ABD = 90°.`,.25]]),
      ptxt([[`Tam giác ABD vuông tại B có đường cao BH.`,.25],[`Theo hệ thức lượng: AB² = AH·AD.`,.25],[`Và BH² = AH·HD.`,.25]]),
      ptxt([[`BH = ${fr('BC',2)} = ${m} cm; AH = √(AB² − BH²) = √(${b*b} − ${m*m}) = ${AH} (cm).`,.25],[`AD = ${fr('AB²','AH')} = ${fr(b*b,AH)} = ${String(AD).replace('.',',')} (cm), nên R = ${fr('AD',2)} = ${String(R).replace('.',',')} (cm).`,.25]])],
    chk:()=>m*m+AH*AH===b*b&&Math.abs(R*1000-Math.round(R*1000))<1e-9};
});

/* 15. Đường tròn đường kính MC trong tam giác vuông */
G3('tl9-g3-mc',9,'VDC',[29,27],r=>{
  const [AB,AM,BM]=r.pick([[4,3,5],[3,4,5],[8,6,10],[6,8,10],[12,9,15]]),MC=r.int(3,8),AC=AM+MC,ME=AM*MC/BM,BE=BM+ME;
  const A=[0,0],B=[0,AB],M=[AM,0],C=[AC,0],K=[(AM+AC)/2,0],D=g3foot(M,B,C),E=g3foot(C,B,M);
  const fig=fig9({A,B,C,M,D,E},{circ:[[K,MC/2]],segs:[['A','B'],['B','C'],['C','A'],['B','E'],['M','D'],['C','E']],dashed:[['A','E']],right:[['B','A','C'],['M','D','C'],['M','E','C']],w:230,h:180});
  return{kind:'tl',title:'Đường tròn đường kính MC',parts:[
    {pts:.75,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}. Trên cạnh ${I('AC')} lấy điểm ${I('M')} (${I('M')} khác ${I('A')}, ${I('C')}). Đường tròn đường kính ${I('MC')} cắt ${I('BC')} tại ${I('D')} (${I('D')} khác ${I('C')}) và cắt tia ${I('BM')} tại ${I('E')} (${I('E')} khác ${I('M')}).<br>Chứng minh tứ giác ${I('ABDM')} nội tiếp. Tính ${I('BM')} biết ${I('AB')} = ${AB} cm, ${I('AM')} = ${AM} cm.`},
    {pts:.75,html:`Chứng minh tứ giác ${I('ABCE')} nội tiếp.`},
    {pts:.5,html:`Chứng minh ${I('BM')}·${I('BE')} = ${I('BD')}·${I('BC')}. Biết ${I('MC')} = ${MC} cm, tính độ dài ${I('BE')}.`}],
    sol:[g3fig(fig)+ptxt([[`∠BAM = 90°; ∠MDC = 90° (góc nội tiếp chắn nửa đường tròn đường kính MC) nên ∠BDM = 90°.`,.25],[`∠BAM + ∠BDM = 180° nên tứ giác ABDM nội tiếp.`,.25],[`BM = √(AB² + AM²) = √(${AB*AB} + ${AM*AM}) = ${BM} (cm).`,.25]]),
      ptxt([[`∠MEC = 90° (góc nội tiếp chắn nửa đường tròn) nên ∠BEC = 90°.`,.25],[`∠BAC = 90°.`,.25],[`A và E cùng nhìn đoạn BC dưới góc vuông nên tứ giác ABCE nội tiếp (đường tròn đường kính BC).`,.25]]),
      ptxt([[`Tam giác BDM và tam giác BEC có ∠B chung, ∠BDM = ∠BEC = 90° nên ΔBDM ∽ ΔBEC (g.g), suy ra ${fr('BD','BE')} = ${fr('BM','BC')}, do đó BM·BE = BD·BC.`,.25],[`ΔAMB ∽ ΔEMC (∠BAM = ∠CEM = 90°, ∠AMB = ∠EMC đối đỉnh) nên ${fr('ME','AM')} = ${fr('MC','BM')}, ME = ${fr(`${AM}·${MC}`,BM)} = ${g3n(ME)} cm; BE = BM + ME = ${g3n(BE)} (cm).`,.25]])],
    chk:()=>AB*AB+AM*AM===BM*BM&&Math.abs(ME*100-Math.round(ME*100))<1e-9};
});

/* 16. Tam giác đều nội tiếp: MA = MB + MC */
G3('tl9-g3-ptol',9,'VDC',[28,27,29],r=>{
  const [xb,yc,a]=r.pick([[3,5,7],[5,3,7],[7,8,13],[8,7,13],[5,16,19],[16,5,19],[6,10,14],[10,6,14]]),dm=r.pick([-30,-18,18,30]);
  const A=onC(1,90),B=onC(1,210),C=onC(1,330),M=onC(1,270+dm),MB=Math.hypot(M[0]-B[0],M[1]-B[1]),MA=Math.hypot(M[0]-A[0],M[1]-A[1]),D=[M[0]+(A[0]-M[0])*MB/MA,M[1]+(A[1]-M[1])*MB/MA];
  const fig=fig9({A,B,C,M,D,O:[0,0]},{circ:[['O',1]],segs:[['A','B'],['B','C'],['C','A'],['A','M'],['B','M'],['C','M'],['B','D']],lc:'O',w:210,h:210});
  const Rt=a%3?fr(`${a}√3`,3):`${a/3}√3`;
  return{kind:'tl',title:'Tam giác đều nội tiếp đường tròn',parts:[
    {pts:.75,html:`Cho tam giác đều ${I('ABC')} cạnh ${a} cm nội tiếp đường tròn (${I('O')}; ${I('R')}). Lấy điểm ${I('M')} thuộc cung nhỏ ${I('BC')} (${I('M')} khác ${I('B')}, ${I('C')}).<br>Tính bán kính ${I('R')} và số đo góc ${I('BMC')}.`},
    {pts:.75,html:`Trên đoạn ${I('MA')} lấy điểm ${I('D')} sao cho ${I('MD')} = ${I('MB')}. Chứng minh tam giác ${I('BMD')} đều.`},
    {pts:.5,html:`Chứng minh ${I('MA')} = ${I('MB')} + ${I('MC')}. Áp dụng: biết ${I('MB')} = ${xb} cm, ${I('MC')} = ${yc} cm, tính ${I('MA')} và chu vi tứ giác ${I('ABMC')}.`}],
    sol:[g3fig(fig)+ptxt([[`Tam giác đều cạnh a có đường cao bằng ${fr('a√3',2)} = ${a%2?fr(`${a}√3`,2):`${a/2}√3`} cm.`,.25],[`O là trọng tâm của tam giác đều nên R = ${fr(2,3)} đường cao = ${Rt} (cm).`,.25],[`Tứ giác ABMC nội tiếp nên ∠BMC = 180° − ∠BAC = 120°.`,.25]]),
      ptxt([[`∠BMA = ∠BCA = 60° (hai góc nội tiếp cùng chắn cung AB).`,.25],[`Tam giác BMD có MB = MD nên cân tại M.`,.25],[`Tam giác cân có một góc 60° nên tam giác BMD đều.`,.25]]),
      ptxt([[`BA = BC, BD = BM, ∠ABD = ∠CBM (cùng cộng với ∠DBC được 60°) nên ΔABD = ΔCBM (c.g.c), suy ra AD = CM.`,.25],[`Vậy MA = MD + DA = MB + MC. Áp dụng: MA = ${xb} + ${yc} = ${xb+yc} (cm); chu vi ABMC = AB + BM + MC + CA = ${a} + ${xb} + ${yc} + ${a} = ${2*a+xb+yc} (cm).`,.25]])],
    chk:()=>MB<MA&&xb*xb+yc*yc+xb*yc===a*a};
});
