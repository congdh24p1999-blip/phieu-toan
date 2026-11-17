/* ===== Toán 8 học kì I: viết lại bốn bài hình tứ giác (có hình vẽ, số liệu thay đổi) ===== */
TL('tl-geo-rhombus',3,'VDC','geo',r=>{
  const k=r.pick([1,2]),[c,b]=r.pick([[8,6],[12,9],[6,8],[16,12]]).map(v=>v*k),BC=Math.hypot(b,c);
  const W=c,Hh=b,P={A:[0,0],B:[W,0],C:[0,Hh]};P.M=[W/2,Hh/2];P.D=[W/2,0];P.E=[0,Hh/2];P.N=[W/2,-Hh/2];
  const fig=fig2D(P,[['A','B'],['B','C'],['C','A'],['M','D'],['M','E'],['D','N'],['A','N'],['B','N'],['A','M']],{w:240,h:200,dashed:[['D','E']],right:[['B','A','C'],['A','D','M'],['A','E','M']],off:{D:[8,14],A:[-9,4],E:[-9,4]}});
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('BC')} = ${BC} cm. Gọi ${I('M')} là trung điểm của ${I('BC')}; kẻ ${I('MD')} ⊥ ${I('AB')} tại ${I('D')}, ${I('ME')} ⊥ ${I('AC')} tại ${I('E')}.${fig}Chứng minh tứ giác ${I('ADME')} là hình chữ nhật và tính độ dài ${I('DE')}.`},
    {pts:.5,html:`Trên tia đối của tia ${I('DM')} lấy điểm ${I('N')} sao cho ${I('DN')} = ${I('DM')}. Chứng minh tứ giác ${I('AMBN')} là hình thoi.`}],
    sol:[ptxt([[`Tứ giác ADME có ∠DAE = ∠ADM = ∠AEM = 90° nên là hình chữ nhật.`,.25],[`Hình chữ nhật ADME có hai đường chéo bằng nhau: DE = AM. AM là đường trung tuyến ứng với cạnh huyền của tam giác vuông ABC nên AM = BC : 2 = ${fmt(BC/2)} cm. Vậy DE = ${fmt(BC/2)} cm.`,.25]]),
      ptxt([[`MD ⊥ AB và AC ⊥ AB nên MD // AC; M là trung điểm của BC nên D là trung điểm của AB.`,.25],[`Tứ giác AMBN có hai đường chéo AB và MN cắt nhau tại trung điểm D của mỗi đường nên là hình bình hành; lại có MN ⊥ AB nên AMBN là hình thoi.`,.25]])],
    chk:()=>Number.isInteger(BC)&&Math.abs((P.M[0]-P.A[0])*(P.B[0]-P.N[0])+(P.M[1]-P.A[1])*(P.B[1]-P.N[1]))>=0};
});
TL('tl-geo-para',3,'VD','geo',r=>{
  const mid=r.chance(.5),a=r.pick([8,10,12]),t=mid?a/2:r.pick([2,3]),sx=r.pick([2,3]),h=r.pick([4,5]);
  const P={A:[0,0],B:[a,0],C:[a+sx,h],D:[sx,h]};P.E=[t,0];P.F=[a+sx-t,h];P.O=[(a+sx)/2,h/2];
  const fig=fig2D(P,[['A','B'],['B','C'],['C','D'],['D','A'],['E','C'],['A','F'],['A','C'],['B','D'],['E','F']],{off:{O:[0,-7]}});
  const cond=mid?`Gọi ${I('E')}, ${I('F')} lần lượt là trung điểm của ${I('AB')} và ${I('CD')}.`:`Trên cạnh ${I('AB')} lấy điểm ${I('E')}, trên cạnh ${I('CD')} lấy điểm ${I('F')} sao cho ${I('AE')} = ${I('CF')} = ${t} cm (biết ${I('AB')} = ${a} cm).`;
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình bình hành ${I('ABCD')}. ${cond}${fig}Chứng minh tứ giác ${I('AECF')} là hình bình hành.`},
    {pts:.5,html:`Gọi ${I('O')} là giao điểm của ${I('AC')} và ${I('BD')}. Chứng minh ba điểm ${I('E')}, ${I('O')}, ${I('F')} thẳng hàng.`}],
    sol:[ptxt([[`AB // CD nên AE // CF.`,.25],[mid?`AE = AB : 2 = CD : 2 = CF. Tứ giác AECF có AE // CF và AE = CF nên là hình bình hành.`:`Tứ giác AECF có AE // CF và AE = CF = ${t} cm nên là hình bình hành.`,.25]]),
      ptxt([[`O là trung điểm của AC (tính chất hình bình hành ABCD).`,.25],[`AECF là hình bình hành nên hai đường chéo AC và EF cắt nhau tại trung điểm của mỗi đường; do đó trung điểm O của AC cũng là trung điểm của EF. Vậy E, O, F thẳng hàng.`,.25]])],
    chk:()=>Math.abs((P.E[0]+P.F[0])/2-P.O[0])<1e-9&&Math.abs((P.E[1]+P.F[1])/2-P.O[1])<1e-9};
});
TL('tl-geo-isos',3,'VDC','geo',r=>{
  const k=r.pick([1,2,3]),AH=4*k,BC=6*k,HC=3*k,P={A:[0,4],B:[-3,0],C:[3,0],H:[0,0]};P.M=[1.5,2];P.N=[3,4];
  const fig=fig2D(P,[['A','B'],['B','C'],['C','A'],['A','H'],['H','N'],['A','N'],['C','N']],{right:[['A','H','C']],off:{H:[0,15],M:[10,6]}});
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} cân tại ${I('A')}, đường cao ${I('AH')}. Gọi ${I('M')} là trung điểm của ${I('AC')}, trên tia đối của tia ${I('MH')} lấy điểm ${I('N')} sao cho ${I('MN')} = ${I('MH')}.${fig}Chứng minh tứ giác ${I('AHCN')} là hình chữ nhật.`},
    {pts:.5,html:`Chứng minh tứ giác ${I('ABHN')} là hình bình hành. Biết ${I('AH')} = ${AH} cm, ${I('BC')} = ${BC} cm, tính diện tích tứ giác ${I('AHCN')}.`}],
    sol:[ptxt([[`M là trung điểm của AC và của HN nên tứ giác AHCN là hình bình hành.`,.25],[`Hình bình hành AHCN có ∠AHC = 90° (AH là đường cao) nên là hình chữ nhật.`,.25]]),
      ptxt([[`AHCN là hình chữ nhật nên AN // HC, AN = HC; tam giác ABC cân tại A nên đường cao AH cũng là đường trung tuyến: HB = HC. Suy ra AN // BH và AN = BH, nên ABHN là hình bình hành.`,.25],[`HC = BC : 2 = ${HC} cm; diện tích hình chữ nhật AHCN là AH · HC = ${AH} · ${HC} = ${AH*HC} (cm²).`,.25]])],
    chk:()=>AH*HC===12*k*k};
});
TL('tl-geo-rhombus2',3,'VDC','geo',r=>{
  const ad=r.pick([3,4,5,6]),th=r.pick([55,60,65,70])*Math.PI/180,P={A:[0,0],B:[4,0]};P.D=[2*Math.cos(th),2*Math.sin(th)];P.C=[P.B[0]+P.D[0],P.B[1]+P.D[1]];
  P.E=[2,0];P.F=[(P.C[0]+P.D[0])/2,P.D[1]];P.M=[(P.A[0]+P.F[0])/2,(P.A[1]+P.F[1])/2];P.N=[(P.B[0]+P.F[0])/2,(P.B[1]+P.F[1])/2];
  const fig=fig2D(P,[['A','B'],['B','C'],['C','D'],['D','A'],['E','F'],['A','F'],['D','E'],['B','F'],['C','E']],{right:[['E','M','F'],['E','N','F']],off:{E:[0,15],F:[0,-7],M:[-11,4],N:[11,4]}});
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình bình hành ${I('ABCD')} có ${I('AB')} = 2${I('AD')} = ${2*ad} cm. Gọi ${I('E')}, ${I('F')} lần lượt là trung điểm của ${I('AB')} và ${I('CD')}.${fig}Chứng minh tứ giác ${I('AEFD')} là hình thoi.`},
    {pts:.5,html:`Gọi ${I('M')} là giao điểm của ${I('AF')} và ${I('DE')}, ${I('N')} là giao điểm của ${I('BF')} và ${I('CE')}. Chứng minh tứ giác ${I('EMFN')} là hình chữ nhật.`}],
    sol:[ptxt([[`AE = AB : 2 = CD : 2 = DF và AE // DF (vì AB // CD) nên tứ giác AEFD là hình bình hành.`,.25],[`AE = AB : 2 = ${ad} cm = AD nên hình bình hành AEFD có hai cạnh kề bằng nhau, do đó là hình thoi.`,.25]]),
      ptxt([[`Hình thoi AEFD có hai đường chéo vuông góc nên ∠EMF = 90°; tương tự EBCF là hình thoi nên ∠ENF = 90°.`,.25],[`AECF có AE // CF, AE = CF nên là hình bình hành, suy ra AF // EC, tức MF // EN; tương tự DEBF là hình bình hành nên ME // FN. Tứ giác EMFN là hình bình hành có ∠EMF = 90° nên là hình chữ nhật.`,.25]])],
    chk:()=>{const v=(p,q)=>[P[q][0]-P[p][0],P[q][1]-P[p][1]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1];return Math.abs(dot(v('M','E'),v('M','F')))<1e-9&&Math.abs(dot(v('N','E'),v('N','F')))<1e-9}};
});
