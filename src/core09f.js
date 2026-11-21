/* ================================================================
   LỚP 9 – học kì II
   Chương IX: Đường tròn ngoại tiếp và đường tròn nội tiếp (Bài 27 – 30)
   Chương X: Một số hình khối trong thực tiễn (Bài 31 – 32)
   ================================================================ */
const dg9=v=>fmt(v)+'°';
const rd9a=v=>Math.round(v*10)/10,rd9b=v=>Math.round(v*100)/100;
const POLY9={5:'ngũ giác',6:'lục giác',8:'bát giác',9:'cửu giác',10:'thập giác',12:'đa giác 12 cạnh'};
const polyN=n=>n===12?'đa giác đều 12 cạnh':`${POLY9[n]} đều`;

/* ===================== Bài 27: Góc nội tiếp ===================== */
N9b('k9-27-ins',9,'NB',[27],r=>{
  const a=r.pick([40,50,60,70,80,100,110,120,130,140]);
  return mkNum(r,{stem:`Cho đường tròn (${I('O')}) và các điểm ${I('A')}, ${I('B')}, ${I('C')} thuộc đường tròn sao cho số đo cung nhỏ ${I('AB')} bằng ${a}° và ${I('C')} thuộc cung lớn ${I('AB')}. Số đo góc ${I('ACB')} bằng`,correct:a/2,f:dg9,cands:[a,180-a,90-a/2,2*a,180-a/2],ok:x=>x>0&&x<180,
    sol:`Góc nội tiếp ACB chắn cung nhỏ AB nên ∠ACB = ${a}° : 2 = ${a/2}°.`,chk:()=>true});
});
N9b('k9-27-semi',9,'NB',[27],r=>{
  const t=r.chance(.5);
  return t?mkTxt(r,{stem:'Góc nội tiếp chắn nửa đường tròn có số đo bằng',correct:'90°',wrongs:['180°','60°','45°','120°'],sol:'Góc nội tiếp chắn nửa đường tròn là góc vuông.',chk:()=>true})
    :mkTxt(r,{stem:'Trong một đường tròn, số đo của góc nội tiếp bằng',correct:'nửa số đo của cung bị chắn.',wrongs:['số đo của cung bị chắn.','hai lần số đo của cung bị chắn.','số đo của góc ở tâm cùng chắn một cung.','180° trừ số đo của cung bị chắn.'],sol:'Định lí: góc nội tiếp có số đo bằng nửa số đo cung bị chắn.',chk:()=>true});
});
N9b('k9-27-center',9,'TH',[27],r=>{
  const g=r.pick([60,70,80,90,100,110,120,130,140]),t=r.int(0,2);
  if(t===0)return mkNum(r,{stem:`Cho tam giác ${I('ABC')} nội tiếp đường tròn (${I('O')}) có góc ${I('ACB')} = ${g/2}°. Số đo góc ở tâm ${I('AOB')} (chắn cung nhỏ ${I('AB')}) bằng`,correct:g,f:dg9,cands:[g/2,180-g/2,180-g,g/4],ok:x=>x>0&&x<360,sol:`Góc ở tâm và góc nội tiếp cùng chắn cung AB: ∠AOB = 2∠ACB = ${g}°.`,chk:()=>true});
  if(t===1)return mkNum(r,{stem:`Trên đường tròn (${I('O')}) lấy hai điểm ${I('A')}, ${I('B')} sao cho ∠${I('AOB')} = ${g}°. Điểm ${I('M')} thuộc cung lớn ${I('AB')}. Số đo góc ${I('AMB')} bằng`,correct:g/2,f:dg9,cands:[g,180-g/2,180-g,2*g],ok:x=>x>0&&x<180,sol:`∠AMB = ${fr(1,2)}∠AOB = ${g/2}°.`,chk:()=>true});
  return mkNum(r,{stem:`Trên đường tròn (${I('O')}) lấy hai điểm ${I('A')}, ${I('B')} sao cho ∠${I('AOB')} = ${g}°. Điểm ${I('N')} thuộc cung nhỏ ${I('AB')}. Số đo góc ${I('ANB')} bằng`,correct:180-g/2,f:dg9,cands:[g/2,g,180-g,360-g],ok:x=>x>0&&x<180,sol:`Cung lớn AB có số đo 360° − ${g}° = ${360-g}°; ∠ANB chắn cung lớn nên ∠ANB = ${360-g}° : 2 = ${180-g/2}°.`,chk:()=>true});
});
/* ===================== Bài 28: Đường tròn ngoại tiếp và nội tiếp của tam giác ===================== */
N9b('k9-28-circum',9,'NB',[28],r=>{
  const t=r.chance(.5),L=['ba đường trung trực','ba đường phân giác trong','ba đường trung tuyến','ba đường cao'];
  return mkTxt(r,{stem:`Tâm đường tròn ${t?'ngoại tiếp':'nội tiếp'} của một tam giác là giao điểm của`,correct:L[t?0:1],wrongs:L.filter((_,i)=>i!==(t?0:1)),sol:t?'Tâm đường tròn ngoại tiếp cách đều ba đỉnh nên là giao điểm ba đường trung trực.':'Tâm đường tròn nội tiếp cách đều ba cạnh nên là giao điểm ba đường phân giác trong.',chk:()=>true});
});
N9b('k9-28-R',9,'TH',[28],r=>{
  const t=r.chance(.5);
  if(t){const k=r.int(1,6),a=3*k,o=r.chance(.5);
    return mkTxt(r,{stem:`Bán kính đường tròn ${o?'ngoại tiếp':'nội tiếp'} tam giác đều cạnh ${a} cm bằng`,correct:(o?kr(k,3):k%2?fr(kr(k,3),2):kr(k/2,3))+' cm',wrongs:[(o?(k%2?fr(kr(k,3),2):kr(k/2,3)):kr(k,3))+' cm',kr(a,3)+' cm',fr(kr(a,3),2)+' cm',kr(a,2)+' cm'],
      sol:o?`R = ${fr(`a${rt(3)}`,3)} = ${fr(`${a}${rt(3)}`,3)} = ${kr(k,3)} (cm).`:`r = ${fr(`a${rt(3)}`,6)} = ${fr(`${a}${rt(3)}`,6)} (cm).`,chk:()=>true})}
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2);
  return mkNum(r,{stem:`Bán kính đường tròn ngoại tiếp tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${p*k} cm, ${I('AC')} = ${q*k} cm bằng`,correct:h*k/2,f:v=>fmt(v)+' cm',cands:[h*k,p*k/2,q*k/2,(p+q)*k/2],ok:x=>x>0,step:.5,
    sol:`BC = √(${p*k}² + ${q*k}²) = ${h*k}; tâm đường tròn ngoại tiếp là trung điểm cạnh huyền nên R = ${h*k}/2 = ${fmt(h*k/2)} (cm).`,chk:()=>true});
});
/* ===================== Bài 29: Tứ giác nội tiếp ===================== */
N9b('k9-29-quad',9,'NB',[29],r=>{
  const a=r.pick([55,65,70,75,80,85,95,100,105,110,115,120,125]),t=r.chance(.5);
  return mkNum(r,{stem:`Cho tứ giác ${I('ABCD')} nội tiếp đường tròn có ${t?`∠${I('A')} = ${a}°. Số đo góc ${I('C')}`:`∠${I('B')} = ${a}°. Số đo góc ${I('D')}`} bằng`,correct:180-a,f:dg9,cands:[a,90,190-a,170-a,a-10],ok:x=>x>0&&x<180&&x!==180-a,
    sol:`Tứ giác nội tiếp có tổng hai góc đối bằng 180° nên góc cần tìm bằng 180° − ${a}° = ${180-a}°.`,chk:()=>true});
});
N9b('k9-29-which',9,'NB',[29],r=>{
  const c=r.pick(['Hình chữ nhật.','Hình vuông.','Hình thang cân.']);
  return mkTxt(r,{stem:'Tứ giác nào sau đây luôn nội tiếp được một đường tròn?',correct:c,wrongs:['Hình bình hành.','Hình thoi.','Hình thang vuông.','Hình thang.'],sol:`${c.slice(0,-1)} có tổng hai góc đối bằng 180° nên luôn nội tiếp được đường tròn.`,chk:()=>true});
});
/* ===================== Bài 30: Đa giác đều ===================== */
N9b('k9-30-poly',9,'TH',[30],r=>{
  const n=r.pick([5,6,8,9,10,12]),v=(n-2)*180/n;
  return mkNum(r,{stem:`Số đo mỗi góc của ${polyN(n)} bằng`,correct:v,f:dg9,cands:[360/n,(n-2)*180,180-v/2,v-10,180/n],ok:x=>x>0&&x<180&&isInt(x),sol:`Tổng các góc của đa giác n cạnh là (n − 2)·180°; mỗi góc của ${polyN(n)} bằng ${fr(`(${n} − 2)·180°`,n)} = ${v}°.`,chk:()=>true});
});
N9b('k9-30-rot',9,'TH',[30],r=>{
  const n=r.pick([5,6,8,9,10,12]),g=360/n,k=r.int(1,Math.min(3,n-1)),c=k*g,W=[g/2,g+15,c+g/2,90+g/2,180/n*3].filter(x=>!isInt(x/g)&&x<360);
  return mkTxt(r,{stem:`Cho ${polyN(n)} có tâm ${I('O')}. Phép quay thuận chiều tâm ${I('O')} góc nào sau đây biến đa giác thành chính nó?`,correct:dg9(c),wrongs:W.map(dg9),sol:`Phép quay tâm O với góc k·${fmt(g)}° (k = 1, 2, …) biến ${polyN(n)} thành chính nó; ${fmt(c)}° = ${k}·${fmt(g)}°.`,chk:()=>W.length>=3});
});
/* ===================== Bài 31 – 32: Hình trụ, hình nón, hình cầu ===================== */
N9b('k9-31-cylV',10,'NB',[31],r=>{
  const R=r.int(2,8),h=r.int(3,12),t=r.chance(.5);
  return t?mkTxt(r,{stem:`Thể tích của hình trụ có bán kính đáy ${R} cm và chiều cao ${h} cm là`,correct:piH([R*R*h,1])+' cm³',wrongs:[piH([2*R*h,1]),piH([R*h,1]),piH([2*R*R*h,1]),piH(Q(R*R*h,3))].map(x=>x+' cm³'),sol:`V = πr²h = π·${R}²·${h} = ${piH([R*R*h,1])} (cm³).`,chk:()=>true})
    :mkTxt(r,{stem:`Thể tích của hình nón có bán kính đáy ${R} cm và chiều cao ${h} cm là`,correct:piH(Q(R*R*h,3))+' cm³',wrongs:[piH([R*R*h,1]),piH(Q(R*h,3)),piH(Q(2*R*R*h,3)),piH(Q(R*R*h,2))].map(x=>x+' cm³'),sol:`V = ${fr(1,3)}πr²h = ${fr(1,3)}·π·${R}²·${h} = ${piH(Q(R*R*h,3))} (cm³).`,chk:()=>true});
});
N9b('k9-31-cylS',10,'TH',[31],r=>{
  const R=r.int(2,8),h=R+r.int(1,6),t=r.chance(.5);
  return t?mkTxt(r,{stem:`Diện tích xung quanh của hình trụ có bán kính đáy ${R} cm và chiều cao ${h} cm là`,correct:piH([2*R*h,1])+' cm²',wrongs:[piH([R*h,1]),piH([R*R*h,1]),piH([2*R*h+2*R*R,1]),piH([4*R*h,1])].map(x=>x+' cm²'),sol:`S_xq = 2πrh = 2π·${R}·${h} = ${piH([2*R*h,1])} (cm²).`,chk:()=>true})
    :mkTxt(r,{stem:`Diện tích toàn phần của hình trụ có bán kính đáy ${R} cm và chiều cao ${h} cm là`,correct:piH([2*R*h+2*R*R,1])+' cm²',wrongs:[piH([2*R*h,1]),piH([2*R*h+R*R,1]),piH([R*h+2*R*R,1]),piH([R*R*h,1]),piH([4*R*h,1]),piH([R*h+R*R,1])].map(x=>x+' cm²'),sol:`S_tp = 2πrh + 2πr² = ${piH([2*R*h,1])} + ${piH([2*R*R,1])} = ${piH([2*R*h+2*R*R,1])} (cm²).`,chk:()=>true});
});
N9b('k9-31-cone',10,'TH',[31],r=>{
  const [p,q,h]=r.pick(PYT9.slice(0,4)),k=r.int(1,2),R=p*k,H=q*k,L=h*k;
  return mkTxt(r,{stem:`Một hình nón có bán kính đáy ${R} cm và chiều cao ${H} cm. Diện tích xung quanh của hình nón là`,correct:piH([R*L,1])+' cm²',wrongs:[piH([R*H,1]),piH([2*R*L,1]),piH([R*L+R*R,1]),piH(Q(R*R*H,3))].map(x=>x+' cm²'),
    sol:`Đường sinh l = √(${R}² + ${H}²) = ${L} (cm); S_xq = πrl = π·${R}·${L} = ${piH([R*L,1])} (cm²).`,chk:()=>L*L===R*R+H*H});
});
N9b('k9-32-sph',10,'NB',[32],r=>{
  const R=r.int(2,9),t=r.chance(.5);
  return t?mkTxt(r,{stem:`Diện tích mặt cầu bán kính ${R} cm là`,correct:piH([4*R*R,1])+' cm²',wrongs:[piH([R*R,1]),piH([2*R*R,1]),piH(Q(4*R**3,3)),piH([4*R,1])].map(x=>x+' cm²'),sol:`S = 4πR² = 4π·${R}² = ${piH([4*R*R,1])} (cm²).`,chk:()=>true})
    :mkTxt(r,{stem:`Thể tích hình cầu bán kính ${R} cm là`,correct:piH(Q(4*R**3,3))+' cm³',wrongs:[piH([4*R*R,1]),piH([R**3,1]),piH(Q(R**3,3)),piH([4*R**3,1])].map(x=>x+' cm³'),sol:`V = ${fr(4,3)}πR³ = ${fr(4,3)}π·${R}³ = ${piH(Q(4*R**3,3))} (cm³).`,chk:()=>true});
});
N9b('k9-32-real',10,'TH',[32],r=>{
  const d=r.pick([20,22,24,30,40,6,8,10,4]),R=d/2,t=r.chance(.5),u=d>=20?'cm':'cm';
  return t?mkTxt(r,{stem:`Một quả bóng hình cầu có đường kính ${d} ${u}. Diện tích bề mặt quả bóng là`,correct:piH([d*d,1])+` ${u}²`,wrongs:[piH([4*d*d,1]),piH([2*d*d,1]),piH([d*d/2,1]),piH(Q(d**3,6))].map(x=>x+` ${u}²`),sol:`R = ${fmt(R)}; S = 4πR² = πd² = ${piH([d*d,1])} (${u}²).`,chk:()=>isInt(d*d/2)})
    :mkTxt(r,{stem:`Một quả bóng hình cầu có đường kính ${d} ${u}. Thể tích quả bóng là`,correct:piH(Q(d**3,6))+` ${u}³`,wrongs:[piH(Q(4*d**3,3)),piH([d*d,1]),piH(Q(d**3,3)),piH(Q(d**3,2))].map(x=>x+` ${u}³`),sol:`R = ${fmt(R)}; V = ${fr(4,3)}πR³ = ${fr(1,6)}πd³ = ${piH(Q(d**3,6))} (${u}³).`,chk:()=>true});
});

/* ---------- Đúng/sai chương IX ---------- */
DS9b('ds9-27-ang',9,'NB',[27],r=>{
  const a=r.pick([40,50,60,70,80,100,110,120,130,140]);
  return mkDS(r,{stem:`Cho đường tròn (${I('O')}) và các điểm ${I('A')}, ${I('B')}, ${I('C')} thuộc đường tròn sao cho số đo cung nhỏ ${I('AB')} bằng ${a}°, ${I('C')} thuộc cung lớn ${I('AB')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`∠${I('AOB')} = ${a}°.`,f:`∠${I('AOB')} = ${a/2}°.`,why:`Góc ở tâm có số đo bằng số đo cung bị chắn.`},
    {t:`∠${I('ACB')} = ${a/2}°.`,f:`∠${I('ACB')} = ${a}°.`,why:`Góc nội tiếp bằng nửa số đo cung bị chắn.`},
    {t:`Số đo cung lớn ${I('AB')} bằng ${360-a}°.`,f:`Số đo cung lớn ${I('AB')} bằng ${180-a}°.`,why:`360° − ${a}° = ${360-a}°.`},
    {t:`Nếu ${I('AD')} là đường kính của (${I('O')}) thì ∠${I('ABD')} = 90°.`,f:`Nếu ${I('AD')} là đường kính của (${I('O')}) thì ∠${I('ABD')} = ${a}°.`,why:`Góc nội tiếp chắn nửa đường tròn là góc vuông.`}],chk:()=>a!==90});
});
DS9b('ds9-29-quad',9,'NB',[29],r=>{
  for(;;){const a=r.pick([60,65,70,75,80,85,95,100,105,110,115,120]),b=r.pick([60,70,80,100,110,120]);if(a===b||a+b===180)continue;
    return mkDS(r,{stem:`Cho tứ giác ${I('ABCD')} nội tiếp đường tròn (${I('O')}) có ∠${I('A')} = ${a}°, ∠${I('B')} = ${b}°. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`∠${I('C')} = ${180-a}°.`,f:`∠${I('C')} = ${a}°.`,why:`∠A + ∠C = 180°.`},
      {t:`∠${I('D')} = ${180-b}°.`,f:`∠${I('D')} = ${180-a}°.`,why:`∠B + ∠D = 180°.`},
      {t:`Bốn đỉnh ${I('A')}, ${I('B')}, ${I('C')}, ${I('D')} cùng thuộc đường tròn (${I('O')}).`,f:`Đỉnh ${I('D')} nằm bên trong đường tròn (${I('O')}).`,why:`Tứ giác nội tiếp có bốn đỉnh thuộc một đường tròn.`},
      {t:`Mọi hình chữ nhật đều nội tiếp được đường tròn.`,f:`Mọi hình thoi đều nội tiếp được đường tròn.`,why:`Hình chữ nhật có tổng hai góc đối bằng 180°; hình thoi (không vuông) thì không.`}],chk:()=>true})}
});
DS9b('ds9-28-tri',9,'TH',[28],r=>{
  const k=r.int(1,4),a=6*k;
  return mkDS(r,{stem:`Cho tam giác đều ${I('ABC')} cạnh ${a} cm. Gọi ${I('R')}, ${I('r')} lần lượt là bán kính đường tròn ngoại tiếp và nội tiếp tam giác. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Tâm đường tròn ngoại tiếp và tâm đường tròn nội tiếp tam giác trùng nhau.`,f:`Tâm đường tròn ngoại tiếp và tâm đường tròn nội tiếp tam giác là hai điểm khác nhau.`,why:`Trong tam giác đều, các đường trung trực cũng là các đường phân giác.`},
    {t:`${I('R')} = ${kr(2*k,3)} cm.`,f:`${I('R')} = ${kr(3*k,3)} cm.`,why:`R = ${fr(`a${rt(3)}`,3)} = ${kr(2*k,3)}.`},
    {t:`${I('r')} = ${kr(k,3)} cm.`,f:`${I('r')} = ${kr(2*k,3)} cm.`,why:`r = ${fr(`a${rt(3)}`,6)} = ${kr(k,3)}.`},
    {t:`${I('R')} = 2${I('r')}.`,f:`${I('R')} = 3${I('r')}.`,why:`${kr(2*k,3)} = 2·${kr(k,3)}.`}],chk:()=>true});
});
DS9b('ds9-28-right',9,'TH',[28],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2),BC=h*k;
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${p*k} cm, ${I('AC')} = ${q*k} cm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Tâm đường tròn ngoại tiếp tam giác ${I('ABC')} là trung điểm của ${I('BC')}.`,f:`Tâm đường tròn ngoại tiếp tam giác ${I('ABC')} là trung điểm của ${I('AB')}.`,why:`Góc BAC = 90° là góc nội tiếp chắn nửa đường tròn, nên BC là đường kính.`},
    {t:`Bán kính đường tròn ngoại tiếp bằng ${fmt(BC/2)} cm.`,f:`Bán kính đường tròn ngoại tiếp bằng ${BC} cm.`,why:`BC = ${BC}, R = BC/2 = ${fmt(BC/2)}.`},
    {t:`Độ dài đường tròn ngoại tiếp bằng ${piH([BC,1])} cm.`,f:`Độ dài đường tròn ngoại tiếp bằng ${piH([2*BC,1])} cm.`,why:`C = 2πR = ${piH([BC,1])}.`},
    {t:`Diện tích hình tròn ngoại tiếp bằng ${piH(Q(BC*BC,4))} cm².`,f:`Diện tích hình tròn ngoại tiếp bằng ${piH([BC*BC,1])} cm².`,why:`S = πR² = ${piH(Q(BC*BC,4))}.`}],chk:()=>true});
});
DS9b('ds9-29-tan',9,'VD',[29],r=>{
  const a=r.pick([40,50,60,70,80,100,110,120]);
  return mkDS(r,{stem:`Từ điểm ${I('M')} nằm ngoài đường tròn (${I('O')}) kẻ hai tiếp tuyến ${I('MA')}, ${I('MB')} (${I('A')}, ${I('B')} là các tiếp điểm) sao cho ∠${I('AMB')} = ${a}°. Lấy điểm ${I('C')} thuộc cung lớn ${I('AB')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Tứ giác ${I('MAOB')} nội tiếp được đường tròn.`,f:`Tứ giác ${I('MAOB')} không nội tiếp được đường tròn.`,why:`∠MAO + ∠MBO = 90° + 90° = 180°.`},
    {t:`∠${I('AOB')} = ${180-a}°.`,f:`∠${I('AOB')} = ${a}°.`,why:`Tứ giác MAOB nội tiếp nên ∠AOB = 180° − ∠AMB.`},
    {t:`Đường tròn ngoại tiếp tứ giác ${I('MAOB')} có đường kính là ${I('MO')}.`,f:`Đường tròn ngoại tiếp tứ giác ${I('MAOB')} có đường kính là ${I('AB')}.`,why:`∠MAO = ∠MBO = 90° nên A, B thuộc đường tròn đường kính MO.`},
    {t:`∠${I('ACB')} = ${(180-a)/2}°.`,f:`∠${I('ACB')} = ${180-a}°.`,why:`Góc nội tiếp ACB chắn cung nhỏ AB có số đo ${180-a}°.`}],chk:()=>a!==90});
});
DS9b('ds9-30-poly',9,'VD',[30],r=>{
  const n=r.pick([5,6,8,10,12]),v=(n-2)*180/n;
  return mkDS(r,{stem:`Cho ${polyN(n)} có tâm ${I('O')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Mỗi góc của đa giác bằng ${v}°.`,f:`Mỗi góc của đa giác bằng ${fmt(360/n)}°.`,why:`Mỗi góc bằng (${n} − 2)·180° : ${n} = ${v}°.`},
    {t:`Tổng các góc của đa giác bằng ${(n-2)*180}°.`,f:`Tổng các góc của đa giác bằng ${n*180}°.`,why:`(n − 2)·180° = ${(n-2)*180}°.`},
    {t:`Phép quay thuận chiều tâm ${I('O')} góc ${fmt(360/n)}° biến đa giác thành chính nó.`,f:`Phép quay thuận chiều tâm ${I('O')} góc ${fmt(180/n)}° biến đa giác thành chính nó.`,why:`Các góc quay thích hợp là bội của 360° : ${n} = ${fmt(360/n)}°.`},
    {t:`Đường tròn ngoại tiếp và đường tròn nội tiếp của đa giác có cùng tâm ${I('O')}.`,f:`Đường tròn ngoại tiếp và đường tròn nội tiếp của đa giác có tâm khác nhau.`,why:`Mọi đa giác đều có đường tròn ngoại tiếp và nội tiếp cùng tâm.`}],chk:()=>true});
});
/* ---------- Đúng/sai chương X ---------- */
DS9b('ds9-31-cyl',10,'TH',[31,32],r=>{
  const R=r.int(2,6),h=2*R;
  return mkDS(r,{stem:`Một hình trụ có bán kính đáy ${R} cm và chiều cao ${h} cm. Một hình cầu có bán kính ${R} cm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Thể tích hình trụ bằng ${piH([R*R*h,1])} cm³.`,f:`Thể tích hình trụ bằng ${piH([2*R*h,1])} cm³.`,why:`V = πr²h = ${piH([R*R*h,1])}.`},
    {t:`Diện tích xung quanh hình trụ bằng ${piH([2*R*h,1])} cm².`,f:`Diện tích xung quanh hình trụ bằng ${piH([R*h,1])} cm².`,why:`S = 2πrh = ${piH([2*R*h,1])}.`},
    {t:`Thể tích hình cầu bằng ${piH(Q(4*R**3,3))} cm³.`,f:`Thể tích hình cầu bằng ${piH([4*R*R,1])} cm³.`,why:`V = ${fr(4,3)}πR³ = ${piH(Q(4*R**3,3))}.`},
    {t:`Diện tích mặt cầu bằng diện tích xung quanh của hình trụ.`,f:`Diện tích mặt cầu bằng hai lần diện tích xung quanh của hình trụ.`,why:`4πR² = 2πR·2R.`}],chk:()=>true});
});

/* ---------- Trả lời ngắn ---------- */
TLN9b('t9-27-ang',9,'TH',[27],r=>{
  const g=r.pick([60,70,80,100,110,120,130,140]),t=r.chance(.5);
  return{kind:'tln',stem:`Trên đường tròn (${I('O')}) lấy ba điểm ${I('A')}, ${I('B')}, ${I('C')} sao cho ∠${I('AOB')} = ${g}° và ${I('C')} thuộc cung ${t?'lớn':'nhỏ'} ${I('AB')}. Tính số đo góc ${I('ACB')} (đơn vị: độ).`,ans:t?g/2:180-g/2,unit:'°',
    sol:t?`∠ACB chắn cung nhỏ AB: ∠ACB = ${g}° : 2 = ${g/2}°.`:`∠ACB chắn cung lớn AB có số đo ${360-g}°: ∠ACB = ${180-g/2}°.`,chk:()=>true};
});
TLN9b('t9-28-R',9,'TH',[28],r=>{
  const a=r.int(3,15),t=r.chance(.5),v=rd9a(t?a*Math.sqrt(3)/3:a*Math.sqrt(3)/6);
  return{kind:'tln',stem:`Tính bán kính đường tròn ${t?'ngoại tiếp':'nội tiếp'} tam giác đều cạnh ${a} cm (đơn vị: cm, làm tròn kết quả đến hàng phần mười).`,ans:v,unit:'cm',sol:`${t?'R':'r'} = ${fr(`${a}${rt(3)}`,t?3:6)} ≈ ${fmt(v)} (cm).`,chk:()=>true};
});
TLN9b('t9-29-obc',9,'VD',[27,28],r=>{
  const a=r.int(35,80);
  return{kind:'tln',stem:`Cho tam giác nhọn ${I('ABC')} nội tiếp đường tròn (${I('O')}) có ∠${I('BAC')} = ${a}°. Tính số đo góc ${I('OBC')} (đơn vị: độ).`,ans:90-a,unit:'°',sol:`∠BOC = 2∠BAC = ${2*a}° (góc ở tâm và góc nội tiếp cùng chắn cung BC). Tam giác OBC cân tại O nên ∠OBC = (180° − ${2*a}°) : 2 = ${90-a}°.`,chk:()=>true};
});
TLN9b('t9-29-quad',9,'VD',[29],r=>{
  const b=r.int(25,60),c=r.int(25,60);
  return{kind:'tln',stem:`Cho tứ giác ${I('ABCD')} nội tiếp đường tròn có ∠${I('ABD')} = ${b}° và ∠${I('DBC')} = ${c}°. Tính số đo góc ${I('ADC')} (đơn vị: độ).`,ans:180-b-c,unit:'°',sol:`∠ABC = ${b}° + ${c}° = ${b+c}°. Tứ giác ABCD nội tiếp nên ∠ADC = 180° − ${b+c}° = ${180-b-c}°.`,chk:()=>b+c<180};
});
TLN9b('t9-30-hex',9,'VD',[30],r=>{
  const a=r.int(2,12),t=r.chance(.5),v=rd9a(t?3*Math.sqrt(3)/2*a*a:a*Math.sqrt(3)/2);
  return{kind:'tln',stem:t?`Tính diện tích lục giác đều cạnh ${a} cm (đơn vị: cm², làm tròn kết quả đến hàng phần mười).`:`Tính bán kính đường tròn nội tiếp lục giác đều cạnh ${a} cm (đơn vị: cm, làm tròn kết quả đến hàng phần mười).`,ans:v,unit:t?'cm²':'cm',
    sol:t?`Lục giác đều cạnh a gồm 6 tam giác đều cạnh a: S = 6·${fr(`a²${rt(3)}`,4)} = ${fr(`${3*a*a}${rt(3)}`,2)} ≈ ${fmt(v)} (cm²).`:`Bán kính đường tròn nội tiếp bằng đường cao của tam giác đều cạnh ${a}: r = ${fr(`${a}${rt(3)}`,2)} ≈ ${fmt(v)} (cm).`,chk:()=>v<1000};
});
TLN9b('t9-31-cyl',10,'TH',[31],r=>{
  const R=r.pick([.5,.6,.8,1,1.2]),h=r.pick([1,1.2,1.5,2]),V=Math.PI*R*R*h,v=rd9b(V);
  return{kind:'tln',stem:`Một bồn nước hình trụ có bán kính đáy ${fmt(R)} m và chiều cao ${fmt(h)} m. Tính thể tích của bồn (đơn vị: m³, làm tròn kết quả đến hàng phần trăm).`,ans:v,unit:'m³',sol:`V = πr²h = π·${fmt(R)}²·${fmt(h)} ≈ ${fmt(v)} (m³).`,chk:()=>true};
});
TLN9b('t9-32-ball',10,'TH',[32],r=>{
  const d=r.pick([6,8,10,12,20,22,24]),t=r.chance(.5),v=rd9a(t?Math.PI*d*d:Math.PI*d**3/6);
  return{kind:'tln',stem:`Một quả bóng hình cầu có đường kính ${d} cm. Tính ${t?'diện tích bề mặt (đơn vị: cm²':'thể tích (đơn vị: cm³'}, làm tròn kết quả đến hàng phần mười) của quả bóng.`,ans:v,unit:t?'cm²':'cm³',sol:t?`S = 4πR² = π·${d}² ≈ ${fmt(v)} (cm²).`:`V = ${fr(4,3)}πR³ = ${fr(1,6)}π·${d}³ ≈ ${fmt(v)} (cm³).`,chk:()=>v<10000};
});
TLN9b('t9-31-cone',10,'VD',[31],r=>{
  const [p,q,h]=r.pick(PYT9.slice(0,4)),k=r.pick([1,2,3]),R=p*k,H=q*k,L=h*k,v=rd9a(Math.PI*R*L);
  return{kind:'tln',stem:`Một chiếc nón lá có dạng hình nón với đường kính vành nón ${2*R} cm và chiều cao ${H} cm. Tính diện tích lá cần dùng để phủ mặt xung quanh chiếc nón (đơn vị: cm², làm tròn kết quả đến hàng phần mười; bỏ qua phần chồng mép).`,ans:v,unit:'cm²',
    sol:`r = ${R}, l = √(${R}² + ${H}²) = ${L}; S_xq = πrl = ${piH([R*L,1])} ≈ ${fmt(v)} (cm²).`,chk:()=>L*L===R*R+H*H&&v<10000};
});
TLN9b('t9-32-rise',10,'VD',[31,32],r=>{
  for(;;){const rc=r.pick([3,4,5,6]),R=r.pick([1,1.5,2]),n=r.int(1,4),dh=4*n*R**3/(3*rc*rc),v=rd9b(dh);if(R>=rc)continue;
    return{kind:'tln',stem:`Một cốc thủy tinh hình trụ có bán kính đáy trong lòng ${rc} cm đang chứa nước. Thả chìm hoàn toàn ${n} viên bi hình cầu bán kính ${fmt(R)} cm vào cốc (nước không tràn ra ngoài). Mực nước trong cốc dâng lên thêm bao nhiêu xentimét (làm tròn kết quả đến hàng phần trăm)?`,ans:v,unit:'cm',
      sol:`Thể tích nước dâng bằng thể tích các viên bi: ${n}·${fr(4,3)}π·${fmt(R)}³. Chiều cao dâng: h = ${n}·${fr(4,3)}·${fmt(R)}³ : ${rc}² ≈ ${fmt(v)} (cm) (π ở tử và mẫu triệt tiêu).`,chk:()=>true}}
});

/* ---------- Tự luận hình học ---------- */
TL9b('tl9-27-semi',9,'TH','geo',[27],r=>{
  const al=r.pick([30,60]),R=r.int(2,8),AC=al===30?kr(R,3):String(R),BC=al===30?String(R):kr(R,3);
  return{kind:'tl',title:'Góc nội tiếp',parts:[{pts:.5,html:`Cho đường tròn (${I('O')}; ${R} cm) đường kính ${I('AB')} và điểm ${I('C')} thuộc đường tròn sao cho ∠${I('CAB')} = ${al}°. Chứng minh tam giác ${I('ABC')} vuông và tính góc ${I('ABC')}.`},{pts:.5,html:`Tính độ dài các đoạn thẳng ${I('AC')}, ${I('BC')}.`}],
    sol:[ptxt([[`∠ACB là góc nội tiếp chắn nửa đường tròn nên ∠ACB = 90°, tam giác ABC vuông tại C.`,.25],[`∠ABC = 90° − ${al}° = ${90-al}°.`,.25]]),ptxt([[`AB = 2R = ${2*R} cm; AC = AB·cos ${al}° = ${AC} (cm).`,.25],[`BC = AB·sin ${al}° = ${BC} (cm).`,.25]])],chk:()=>true};
});
TL9b('tl9-29-alt',9,'VD','geo',[29],r=>{
  const a=r.int(45,75);
  return{kind:'tl',title:'Tứ giác nội tiếp',parts:[{pts:.5,html:`Cho tam giác nhọn ${I('ABC')}, hai đường cao ${I('BE')} và ${I('CF')} cắt nhau tại ${I('H')}. Chứng minh tứ giác ${I('AEHF')} nội tiếp.`},{pts:.5,html:`Chứng minh tứ giác ${I('BCEF')} nội tiếp. Biết ∠${I('BAC')} = ${a}°, tính số đo góc ${I('BHC')}.`}],
    sol:[ptxt([[`∠AEH = ∠AFH = 90° nên E, F cùng thuộc đường tròn đường kính AH.`,.25],[`Vậy tứ giác AEHF nội tiếp (∠AEH + ∠AFH = 180°).`,.25]]),
      ptxt([[`∠BEC = ∠BFC = 90° nên E, F cùng thuộc đường tròn đường kính BC; tứ giác BCEF nội tiếp.`,.25],[`Tứ giác AEHF nội tiếp nên ∠EHF = 180° − ∠BAC = ${180-a}°; ∠BHC = ∠EHF (đối đỉnh) = ${180-a}°.`,.25]])],chk:()=>true};
});
TL9b('tl9-29-tan',9,'VD','geo',[29],r=>{
  const a=r.pick([40,50,60,70,80,100,110]);
  return{kind:'tl',title:'Tiếp tuyến và tứ giác nội tiếp',parts:[{pts:.5,html:`Từ điểm ${I('M')} nằm ngoài đường tròn (${I('O')}) kẻ hai tiếp tuyến ${I('MA')}, ${I('MB')} (${I('A')}, ${I('B')} là các tiếp điểm). Chứng minh tứ giác ${I('MAOB')} nội tiếp.`},{pts:.5,html:`Biết ∠${I('AMB')} = ${a}°. Tính số đo góc ${I('AOB')} và góc ${I('ACB')}, với ${I('C')} là một điểm thuộc cung lớn ${I('AB')}.`}],
    sol:[ptxt([[`MA ⊥ OA, MB ⊥ OB (tính chất tiếp tuyến) nên ∠MAO = ∠MBO = 90°.`,.25],[`∠MAO + ∠MBO = 180° nên tứ giác MAOB nội tiếp (đường tròn đường kính MO).`,.25]]),
      ptxt([[`∠AOB = 180° − ∠AMB = ${180-a}°.`,.25],[`∠ACB là góc nội tiếp chắn cung nhỏ AB nên ∠ACB = ${fr(1,2)}∠AOB = ${(180-a)/2}°.`,.25]])],chk:()=>true};
});
TL9b('tl9-29-semi',9,'VDC','geo',[27,29],r=>{
  const [p,q,h]=r.pick(PYT9.slice(0,4)),k=r.int(1,2),AB=q*k,AD=p*k,BD=h*k,DC=Q(AD*AD,BD);
  return{kind:'tl',title:'Góc nội tiếp và hệ thức lượng',parts:[{pts:.5,html:`Cho đường tròn (${I('O')}) đường kính ${I('AB')} = ${AB} cm. Lấy điểm ${I('C')} thuộc đường tròn (${I('C')} khác ${I('A')}, ${I('B')}). Tiếp tuyến tại ${I('A')} của đường tròn cắt đường thẳng ${I('BC')} tại ${I('D')}. Chứng minh ${I('AC')} ⊥ ${I('BD')} và ${I('DA')}${sup(2)} = ${I('DC')}·${I('DB')}.`},{pts:.5,html:`Biết ${I('AD')} = ${AD} cm. Tính độ dài các đoạn ${I('DB')}, ${I('DC')} và ${I('AC')}.`}],
    sol:[ptxt([[`∠ACB là góc nội tiếp chắn nửa đường tròn nên ∠ACB = 90°, tức AC ⊥ BD.`,.25],[`DA ⊥ AB (tiếp tuyến) nên tam giác DAB vuông tại A có đường cao AC; theo hệ thức lượng: DA² = DC·DB.`,.25]]),
      ptxt([[`DB = √(AD² + AB²) = √(${AD*AD} + ${AB*AB}) = ${BD} (cm); DC = ${fr('DA²','DB')} = ${qh(DC)} (cm).`,.25],[`AC = ${fr('AD·AB','DB')} = ${qh(Q(AD*AB,BD))} (cm).`,.25]])],chk:()=>BD*BD===AD*AD+AB*AB};
});
TL9b('tl9-29-oc',9,'VDC','geo',[27,29],r=>{
  const b=r.int(50,80);
  return{kind:'tl',title:'Tứ giác nội tiếp và đường tròn ngoại tiếp',parts:[{pts:.5,html:`Cho tam giác nhọn ${I('ABC')} nội tiếp đường tròn (${I('O')}), các đường cao ${I('AD')}, ${I('BE')} (${I('D')} ∈ ${I('BC')}, ${I('E')} ∈ ${I('AC')}). Chứng minh tứ giác ${I('ABDE')} nội tiếp và ∠${I('CED')} = ∠${I('ABC')}.`},{pts:.5,html:`Chứng minh ${I('OC')} ⊥ ${I('DE')}. Áp dụng: biết ∠${I('ABC')} = ${b}°, tính góc ${I('OCA')}.`}],
    sol:[ptxt([[`∠ADB = ∠AEB = 90° nên D, E thuộc đường tròn đường kính AB; tứ giác ABDE nội tiếp.`,.25],[`Do đó ∠CED = 180° − ∠AED = ∠ABD = ∠ABC.`,.25]]),
      ptxt([[`∠AOC = 2∠ABC (góc ở tâm, góc nội tiếp cùng chắn cung AC); tam giác OAC cân tại O nên ∠OCA = 90° − ∠ABC = ${90-b}°.`,.25],[`Gọi I là giao điểm của OC và DE: ∠ICE + ∠IEC = (90° − ∠ABC) + ∠ABC = 90°, suy ra ∠CIE = 90°, tức OC ⊥ DE.`,.25]])],chk:()=>true};
});
/* ---------- Tự luận thực tế (hình khối) ---------- */
TL9b('tl9-31-tank',10,'TH','real',[31],r=>{
  const R=r.pick([.5,.6,.8,1]),h=r.pick([1.2,1.5,2]),V=rd9b(Math.PI*R*R*h),S=rd9b(2*Math.PI*R*h+2*Math.PI*R*R);
  return{kind:'tl',title:'Bồn chứa hình trụ',parts:[{pts:.5,html:`Một bồn chứa nước bằng inox có dạng hình trụ với bán kính đáy ${fmt(R)} m và chiều cao ${fmt(h)} m. Tính thể tích của bồn (làm tròn đến hàng phần trăm của mét khối). Bồn chứa được khoảng bao nhiêu lít nước?`},{pts:.5,html:`Tính diện tích inox cần dùng để làm bồn (gồm cả hai đáy; làm tròn đến hàng phần trăm của mét vuông, bỏ qua mép nối).`}],
    sol:[ptxt([[`V = πr²h = π·${fmt(R)}²·${fmt(h)} ≈ ${fmt(V)} (m³).`,.25],[`1 m³ = 1000 lít nên bồn chứa được khoảng ${Math.round(Math.PI*R*R*h*1000)} lít.`,.25]]),ptxt([[`S_xq = 2πrh = ${fmt(rd9b(2*Math.PI*R*h))} m²; hai đáy 2πr² = ${fmt(rd9b(2*Math.PI*R*R))} m².`,.25],[`Diện tích inox cần dùng ≈ ${fmt(S)} m².`,.25]])],chk:()=>true};
});
TL9b('tl9-32-ice',10,'VD','real',[31,32],r=>{
  const R=r.pick([2,2.5,3]),H=r.pick([8,10,12]),V1=rd9a(Math.PI*R*R*H/3),V2=rd9a(2*Math.PI*R**3/3),V=rd9a(Math.PI*R*R*H/3+2*Math.PI*R**3/3);
  return{kind:'tl',title:'Thể tích hình khối trong thực tế',parts:[{pts:.5,html:`Một chiếc kem ốc quế gồm phần vỏ bánh dạng hình nón có bán kính đáy ${fmt(R)} cm, chiều cao ${H} cm và phần kem phía trên dạng nửa hình cầu có bán kính ${fmt(R)} cm. Phần bên trong vỏ bánh chứa đầy kem. Tính thể tích phần kem nằm trong vỏ bánh (làm tròn đến hàng phần mười).`},{pts:.5,html:`Tính tổng thể tích kem của chiếc kem ốc quế (làm tròn đến hàng phần mười).`}],
    sol:[ptxt([[`Thể tích hình nón: V₁ = ${fr(1,3)}πr²h = ${fr(1,3)}π·${fmt(R)}²·${H}.`,.25],[`V₁ ≈ ${fmt(V1)} (cm³).`,.25]]),ptxt([[`Nửa hình cầu: V₂ = ${fr(2,3)}πR³ ≈ ${fmt(V2)} (cm³).`,.25],[`Tổng thể tích kem V = V₁ + V₂ ≈ ${fmt(V)} (cm³).`,.25]])],chk:()=>true};
});
/* ---------- Bổ sung Bài 30 ---------- */
N9b('k9-30-def',9,'NB',[30],r=>{
  const t=r.chance(.5);
  return t?mkTxt(r,{stem:'Đa giác đều là đa giác',correct:'có tất cả các cạnh bằng nhau và tất cả các góc bằng nhau.',wrongs:['có tất cả các cạnh bằng nhau.','có tất cả các góc bằng nhau.','nội tiếp được một đường tròn.','có các đường chéo bằng nhau.'],sol:'Đa giác đều là đa giác lồi có tất cả các cạnh bằng nhau và tất cả các góc bằng nhau.',chk:()=>true})
    :mkTxt(r,{stem:'Hình nào sau đây là đa giác đều?',correct:r.pick(['Hình vuông.','Tam giác đều.','Lục giác có sáu cạnh bằng nhau và sáu góc bằng nhau.']),wrongs:['Hình thoi.','Hình chữ nhật.','Tam giác cân.','Ngũ giác có năm cạnh bằng nhau.'],sol:'Đa giác đều cần đồng thời có các cạnh bằng nhau và các góc bằng nhau.',chk:()=>true});
});
TLN9b('t9-30-ang',9,'TH',[30],r=>{
  const n=r.pick([5,6,8,9,10,12]),t=r.chance(.5),v=t?(n-2)*180/n:360/n;
  return{kind:'tln',stem:t?`Tính số đo mỗi góc của ${polyN(n)} (đơn vị: độ).`:`Cho ${polyN(n)} tâm ${I('O')}. Tính số đo góc ở tâm chắn một cạnh của đa giác (đơn vị: độ).`,ans:v,unit:'°',sol:t?`(${n} − 2)·180° : ${n} = ${fmt(v)}°.`:`360° : ${n} = ${fmt(v)}°.`,chk:()=>true};
});
