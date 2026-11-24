/* ================================================================
   LỚP 6 – học kì I
   Chương III: Số nguyên (Bài 13 – 17)
   Chương IV: Một số hình phẳng trong thực tiễn (Bài 18 – 20)
   Chương V: Tính đối xứng của hình phẳng trong tự nhiên (Bài 21 – 22)
   ================================================================ */
const pz=v=>v<0?`(${sg(v)})`:String(v);
const intSet6=xs=>`{${xs.map(sg).join('; ')}}`;
/* ===================== Bài 13: Tập hợp các số nguyên ===================== */
N6('k6-13-cmp',3,'NB',[13],r=>{
  for(;;){const xs=[...Array(4)].map(()=>r.int(-20,20));if(new Set(xs).size<4)continue;const s=[...xs].sort((a,b)=>a-b),t=r.chance(.5);
    if(t)return mkTxt(r,{stem:`Các số ${xs.map(sg).join('; ')} được sắp xếp theo thứ tự tăng dần là`,correct:s.map(sg).join('; '),wrongs:[[...s].reverse(),[...s].sort((a,b)=>Math.abs(a)-Math.abs(b)),[s[1],s[0],s[2],s[3]],[s[0],s[2],s[1],s[3]],[s[0],s[1],s[3],s[2]]].map(x=>x.map(sg).join('; ')),sol:`Số nguyên âm nhỏ hơn 0, nhỏ hơn số nguyên dương; trong hai số âm, số có phần số tự nhiên lớn hơn thì nhỏ hơn. Thứ tự: ${s.map(sg).join(' < ')}.`,chk:()=>true});
    return mkTxt(r,{stem:`Số nhỏ nhất trong các số ${xs.map(sg).join('; ')} là`,correct:sg(s[0]),wrongs:s.slice(1).map(sg),sol:`Sắp xếp: ${s.map(sg).join(' < ')}.`,chk:()=>true})}
});
N6('k6-13-opp',3,'NB',[13],r=>{
  const a=r.nz(-50,50),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Số đối của ${sg(a)} là`,correct:-a,cands:[a,0,a+1,-a-1],ok:()=>true,sol:`Số đối của ${sg(a)} là ${sg(-a)}.`,chk:()=>true});
  const lo=r.int(-6,-1),hi=r.int(1,6),c=hi-lo-1;
  return mkNum(r,{stem:`Có bao nhiêu số nguyên ${I('x')} thoả mãn ${sg(lo)} < ${I('x')} < ${hi}?`,correct:c,cands:[c+1,c-1,c+2,hi-lo+1],ok:x=>x>0,sol:`Các số nguyên đó là ${[...Array(c)].map((_,i)=>sg(lo+1+i)).join('; ')}: có ${c} số.`,chk:()=>true});
});
N6('k6-13-real',3,'NB',[13],r=>{
  const t=r.int(0,2),v=r.int(2,30);
  const C=[[`Nhiệt độ ${v} °C dưới 0 °C được viết là`,`${MINUS}${v} °C`,[`${v} °C`,`${MINUS}${v+1} °C`,`0 °C`]],[`Độ cao ${v*10} m dưới mực nước biển được viết là`,`${MINUS}${v*10} m`,[`${v*10} m`,`${MINUS}${v} m`,`${v} m`]],[`Ông Ba nợ ${v} triệu đồng. Số tiền này được biểu diễn bằng số nguyên`,`${MINUS}${v} (triệu đồng)`,[`${v} (triệu đồng)`,`0 (triệu đồng)`,`${MINUS}${v+10} (triệu đồng)`]]][t];
  return mkTxt(r,{stem:C[0],correct:C[1],wrongs:C[2],sol:'Dùng số nguyên âm để biểu diễn các đại lượng dưới mốc 0 (dưới 0 °C, dưới mực nước biển, số tiền nợ).',chk:()=>true});
});
/* ===================== Bài 14 – 15: Cộng, trừ số nguyên; quy tắc dấu ngoặc ===================== */
N6('k6-14-add',3,'TH',[14],r=>{
  const a=r.nz(-60,60),b=r.nz(-60,60),t=r.chance(.5),v=t?a+b:a-b;
  return mkNum(r,{stem:`Kết quả của phép tính ${sg(a)} ${t?'+':MINUS} ${pz(b)} là`,correct:v,cands:[t?a-b:a+b,-v,v+10,Math.abs(a)+Math.abs(b)],ok:()=>true,sol:t?`${sg(a)} + ${pz(b)} = ${sg(v)}.`:`${sg(a)} − ${pz(b)} = ${sg(a)} + ${pz(-b)} = ${sg(v)}.`,chk:()=>true});
});
N6('k6-15-brk',3,'TH',[15],r=>{
  const a=r.int(100,900),b=r.int(10,99),c=r.int(10,99),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Giá trị của biểu thức ${a} ${MINUS} (${a} ${MINUS} ${b}) bằng`,correct:b,cands:[-b,2*a-b,2*a+b,a-b],ok:()=>true,sol:`${a} − (${a} − ${b}) = ${a} − ${a} + ${b} = ${b}.`,chk:()=>true});
  return mkNum(r,{stem:`Giá trị của biểu thức (${b} ${MINUS} ${a}) ${MINUS} (${b} + ${c}) bằng`,correct:-a-c,cands:[a-c,-a+c,2*b-a-c,a+c],ok:()=>true,sol:`(${b} − ${a}) − (${b} + ${c}) = ${b} − ${a} − ${b} − ${c} = ${sg(-a-c)}.`,chk:()=>true});
});
/* ===================== Bài 16 – 17: Nhân, chia hết; ước và bội ===================== */
N6('k6-16-sign',3,'NB',[16],r=>{
  const t=r.int(0,2),Q_=[['Tích của hai số nguyên âm là','một số nguyên dương.',['một số nguyên âm.','số 0.','một số tự nhiên lớn hơn 1.']],['Tích của một số nguyên âm và một số nguyên dương là','một số nguyên âm.',['một số nguyên dương.','số 0.','một số tự nhiên.']],['Tích của ba số nguyên âm là','một số nguyên âm.',['một số nguyên dương.','số 0.','một số tự nhiên.']]][t];
  return mkTxt(r,{stem:Q_[0],correct:Q_[1],wrongs:Q_[2],sol:'Tích có số lẻ thừa số âm thì mang dấu “−”, có số chẵn thừa số âm thì mang dấu “+”.',chk:()=>true});
});
N6('k6-16-mul',3,'TH',[16],r=>{
  const a=r.nz(-12,12),b=r.nz(-9,9),c=r.pick([-1,1])*r.int(2,5),v=a*b*c;
  return mkNum(r,{stem:`Kết quả của phép tính ${pz(a)}·${pz(b)}·${pz(c)} là`,correct:v,cands:[-v,a*b+c,v*2,a+b+c],ok:()=>true,sol:`${pz(a)}·${pz(b)} = ${sg(a*b)}; ${pz(a*b)}·${pz(c)} = ${sg(v)}.`,chk:()=>true});
});
N6('k6-17-div',3,'TH',[17],r=>{
  const n=r.pick([6,8,10,12,15,18,20]),D=divs6(n),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Số ${MINUS}${n} có bao nhiêu ước nguyên?`,correct:2*D.length,cands:[D.length,2*D.length-2,D.length+1,2*D.length+2],ok:x=>x>0,sol:`Ư(${n}) có ${D.length} số tự nhiên; mỗi ước dương có thêm một ước đối nên có ${2*D.length} ước nguyên.`,chk:()=>true});
  const Z=D.flatMap(d=>[-d,d]).sort((a,b)=>a-b);
  return mkTxt(r,{stem:`Tập hợp các ước nguyên của ${MINUS}${n} là`,correct:intSet6(Z),wrongs:[intSet6(D),intSet6(D.map(d=>-d).reverse()),intSet6(Z.filter(x=>Math.abs(x)!==1)),intSet6([...Z,-2*n,2*n])],sol:`Ư(−${n}) = Ư(${n}) cùng các số đối: ${intSet6(Z)}.`,chk:()=>true});
});
/* ---------- Đúng/sai chương III ---------- */
DS6('ds6-13-int',3,'NB',[13],r=>{
  const a=r.int(2,30),b=r.int(2,30),c=r.int(1,9);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${MINUS}${a} ∈ ℤ.`,f:`${MINUS}${a} ∈ ℕ.`,why:`−${a} là số nguyên âm, không phải số tự nhiên.`},
    {t:`Số đối của ${MINUS}${b} là ${b}.`,f:`Số đối của ${MINUS}${b} là ${MINUS}${b}.`,why:`Hai số đối nhau có tổng bằng 0.`},
    {t:`${MINUS}${a+c} < ${MINUS}${a}.`,f:`${MINUS}${a+c} > ${MINUS}${a}.`,why:`Trong hai số âm, số có phần số tự nhiên lớn hơn thì nhỏ hơn.`},
    {t:`Mọi số nguyên âm đều nhỏ hơn 0.`,f:`Có số nguyên âm lớn hơn 0.`,why:`Số nguyên âm nằm bên trái điểm 0 trên trục số.`}],chk:()=>true});
});
DS6('ds6-16-sign',3,'NB',[16],r=>{
  const a=r.int(2,12),b=r.int(2,12),c=r.int(2,5);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`(${MINUS}${a})·(${MINUS}${b}) = ${a*b}.`,f:`(${MINUS}${a})·(${MINUS}${b}) = ${MINUS}${a*b}.`,why:`Tích hai số âm là số dương.`},
    {t:`(${MINUS}${a})·${b} = ${MINUS}${a*b}.`,f:`(${MINUS}${a})·${b} = ${a*b}.`,why:`Tích hai số trái dấu là số âm.`},
    {t:`(${MINUS}1)${sup(2*c)} = 1.`,f:`(${MINUS}1)${sup(2*c)} = ${MINUS}1.`,why:`Số mũ chẵn.`},
    {t:`(${MINUS}${a})·0 = 0.`,f:`(${MINUS}${a})·0 = ${MINUS}${a}.`,why:`Mọi số nhân với 0 đều bằng 0.`}],chk:()=>true});
});
DS6('ds6-14-calc',3,'TH',[14,15],r=>{
  const a=r.int(10,60),b=r.int(10,60),c=r.int(100,300),d=r.int(10,90);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`(${MINUS}${a}) + (${MINUS}${b}) = ${MINUS}${a+b}.`,f:`(${MINUS}${a}) + (${MINUS}${b}) = ${a+b}.`,why:`Cộng hai số âm: cộng hai phần số tự nhiên rồi đặt dấu “−”.`},
    {t:`${a} ${MINUS} ${a+b} = ${MINUS}${b}.`,f:`${a} ${MINUS} ${a+b} = ${b}.`,why:`${a} − ${a+b} = ${a} + (−${a+b}) = −${b}.`},
    {t:`${c} ${MINUS} (${c} ${MINUS} ${d}) = ${d}.`,f:`${c} ${MINUS} (${c} ${MINUS} ${d}) = ${MINUS}${d}.`,why:`Bỏ ngoặc có dấu “−” đằng trước phải đổi dấu các số hạng trong ngoặc.`},
    {t:`(${MINUS}${a}) ${MINUS} (${MINUS}${b}) = ${sg(b-a)}.`,f:`(${MINUS}${a}) ${MINUS} (${MINUS}${b}) = ${sg(-a-b)}.`,why:`−${a} + ${b} = ${sg(b-a)}.`}],chk:()=>b-a!==-a-b});
});
DS6('ds6-17-div',3,'TH',[17],r=>{
  const n=r.pick([6,8,10,12,15,18]),D=divs6(n),k=r.int(2,5);
  return mkDS(r,{stem:`Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${MINUS}${D[1]} là một ước của ${n}.`,f:`${MINUS}${D[1]} không phải là ước của ${n}.`,why:`${n} = (−${D[1]})·(−${n/D[1]}).`},
    {t:`Số ${n} có ${2*D.length} ước nguyên.`,f:`Số ${n} có ${D.length} ước nguyên.`,why:`Ư(${n}) = ${intSet6(D.flatMap(d=>[-d,d]).sort((a,b)=>a-b))}.`},
    {t:`${MINUS}${n*k} là một bội của ${n}.`,f:`${MINUS}${n*k+1} là một bội của ${n}.`,why:`−${n*k} = ${n}·(−${k}).`},
    {t:`(${MINUS}${n*k}) : ${n} = ${MINUS}${k}.`,f:`(${MINUS}${n*k}) : ${n} = ${k}.`,why:`Thương của hai số trái dấu là số âm.`}],chk:()=>(n*k+1)%n!==0});
});
DS6('ds6-14-real',3,'VD',[14],r=>{
  for(;;){const t0=r.int(-8,5),up=r.int(3,12),down=r.int(5,15),t1=t0+up,t2=t1-down;if(t2===t0||up===down)continue;
  return mkDS(r,{stem:`Nhiệt độ ở một thành phố lúc 6 giờ sáng là ${sg(t0)} °C. Đến trưa, nhiệt độ tăng thêm ${up} °C; đến tối lại giảm ${down} °C so với buổi trưa. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Nhiệt độ buổi trưa là ${sg(t1)} °C.`,f:`Nhiệt độ buổi trưa là ${sg(t0-up)} °C.`,why:`${sg(t0)} + ${up} = ${sg(t1)}.`},
    {t:`Nhiệt độ buổi tối là ${sg(t2)} °C.`,f:`Nhiệt độ buổi tối là ${sg(t1+down)} °C.`,why:`${sg(t1)} − ${down} = ${sg(t2)}.`},
    {t:`Nhiệt độ buổi tối ${t2<t0?'thấp hơn':'cao hơn'} buổi sáng ${Math.abs(t2-t0)} °C.`,f:`Nhiệt độ buổi tối ${t2<t0?'cao hơn':'thấp hơn'} buổi sáng ${Math.abs(t2-t0)} °C.`,why:`${sg(t2)} − ${pz(t0)} = ${sg(t2-t0)}.`},
    {t:`Chênh lệch giữa nhiệt độ buổi trưa và buổi tối là ${down} °C.`,f:`Chênh lệch giữa nhiệt độ buổi trưa và buổi tối là ${up} °C.`,why:`Giảm ${down} °C.`}],chk:()=>true})}
});
DS6('ds6-15-expr',3,'VD',[15,16],r=>{
  const a=r.int(100,400),b=r.int(11,99),c=r.int(11,99),k=r.int(11,49),m=r.int(2,9),n=100-m*0;
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`(${a} + ${b}) ${MINUS} (${a} ${MINUS} ${c}) = ${b+c}.`,f:`(${a} + ${b}) ${MINUS} (${a} ${MINUS} ${c}) = ${sg(b-c)}.`,why:`= ${a} + ${b} − ${a} + ${c} = ${b+c}.`},
    {t:`${MINUS}${b} + ${c} ${MINUS} (${c} ${MINUS} ${b}) = 0.`,f:`${MINUS}${b} + ${c} ${MINUS} (${c} ${MINUS} ${b}) = ${sg(-2*b)}.`,why:`= −${b} + ${c} − ${c} + ${b} = 0.`},
    {t:`${k}·(${MINUS}${m}) + ${k}·(${MINUS}${100-m}) = ${MINUS}${k*100}.`,f:`${k}·(${MINUS}${m}) + ${k}·(${MINUS}${100-m}) = ${k*100}.`,why:`= ${k}·[(−${m}) + (−${100-m})] = ${k}·(−100).`},
    {t:`(${MINUS}${b})·(${MINUS}${c}) ${MINUS} ${b}·${c} = 0.`,f:`(${MINUS}${b})·(${MINUS}${c}) ${MINUS} ${b}·${c} = ${MINUS}${2*b*c}.`,why:`(−${b})·(−${c}) = ${b}·${c}.`}],chk:()=>n>0});
});
/* ---------- Trả lời ngắn chương III ---------- */
TLN6('t6-14-calc',3,'TH',[14,15],r=>{
  const a=r.nz(-80,80),b=r.nz(-80,80),c=r.nz(-80,80),v=a-b+c;
  return{kind:'tln',stem:`Tính ${sg(a)} ${MINUS} ${pz(b)} + ${pz(c)}.`,ans:v,unit:'',sol:`= ${sg(a)} + ${pz(-b)} + ${pz(c)} = ${sg(v)}.`,chk:()=>true};
});
TLN6('t6-16-calc',3,'TH',[16],r=>{
  const a=r.pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]),b=r.pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]),c=r.nz(-20,20),v=a*b-c;
  return{kind:'tln',stem:`Tính ${pz(a)}·${pz(b)} ${MINUS} ${pz(c)}.`,ans:v,unit:'',sol:`= ${sg(a*b)} − ${pz(c)} = ${sg(v)}.`,chk:()=>true};
});
TLN6('t6-15-quick',3,'VD',[15],r=>{
  const n=r.int(10,50),v=-n;/* 1 − 2 + 3 − 4 + … − 2n = −n */
  return{kind:'tln',stem:`Tính tổng ${I('S')} = 1 ${MINUS} 2 + 3 ${MINUS} 4 + … + ${2*n-1} ${MINUS} ${2*n}.`,ans:v,unit:'',sol:`Nhóm từng cặp: (1 − 2) + (3 − 4) + … + (${2*n-1} − ${2*n}) có ${n} cặp, mỗi cặp bằng −1. S = ${sg(v)}.`,chk:()=>true};
});
TLN6('t6-17-x',3,'VD',[14,17],r=>{
  const t=r.chance(.5);
  if(t){const a=r.int(2,9),x=r.nz(-15,15),b=r.nz(-30,30),c=a*x+b;return{kind:'tln',stem:`Tìm số nguyên ${I('x')}, biết ${a}${I('x')} + ${pz(b)} = ${sg(c)}.`,ans:x,unit:'',sol:`${a}x = ${sg(c)} − ${pz(b)} = ${sg(c-b)} ⇒ x = ${sg(x)}.`,chk:()=>true}}
  let lo=r.int(-9,-2),hi=r.int(2,12);if(hi===-lo)hi++;const S=(lo+hi)*(hi-lo+1)/2;
  return{kind:'tln',stem:`Tính tổng các số nguyên ${I('x')} thoả mãn ${sg(lo)} ≤ ${I('x')} ≤ ${hi}.`,ans:S,unit:'',sol:`Các cặp số đối nhau có tổng bằng 0; tổng còn lại ${hi>-lo?`${-lo+1} + … + ${hi}`:`(${sg(lo)}) + … + (${sg(-hi-1)})`} = ${sg(S)}.`,chk:()=>hi!==-lo};
});
/* ---------- Tự luận chương III ---------- */
TL6('tl6-14-calc',3,'TH','alg',[14,15,16],r=>{
  const a=r.nz(-60,60),b=r.nz(-60,60),c=r.nz(-60,60),k=r.int(11,49),m=r.int(11,89);
  return{kind:'tl',title:'Thực hiện phép tính với số nguyên',parts:[{pts:.5,html:`Tính: ${sg(a)} + ${pz(b)} ${MINUS} ${pz(c)}.`},{pts:.5,html:`Tính hợp lí: ${k}·(${MINUS}${m}) + ${k}·(${MINUS}${100-m}).`}],
    sol:[ptxt([[`= ${sg(a+b)} − ${pz(c)}`,.25],[`= ${sg(a+b-c)}.`,.25]]),ptxt([[`= ${k}·[(−${m}) + (−${100-m})] = ${k}·(−100)`,.25],[`= ${MINUS}${nv(k*100)}.`,.25]])],chk:()=>true};
});
TL6('tl6-17-findx',3,'TH','alg',[14,16,17],r=>{
  const a=r.int(2,9),x=r.nz(-12,12),b=r.nz(-30,30),c=a*x+b,y=r.nz(-9,9),d=r.int(2,6),e=r.nz(-20,20);
  return{kind:'tl',title:'Tìm số nguyên x',parts:[{pts:.5,html:`Tìm số nguyên ${I('x')}, biết ${a}${I('x')} + ${pz(b)} = ${sg(c)}.`},{pts:.5,html:`Tìm số nguyên ${I('x')}, biết ${pz(e)} ${MINUS} ${d}${I('x')} = ${sg(e-d*y)}.`}],
    sol:[ptxt([[`${a}x = ${sg(c)} − ${pz(b)} = ${sg(c-b)}.`,.25],[`x = ${sg(c-b)} : ${a} = ${sg(x)}.`,.25]]),ptxt([[`${d}x = ${sg(e)} − ${pz(e-d*y)} = ${sg(d*y)}.`,.25],[`x = ${sg(d*y)} : ${d} = ${sg(y)}.`,.25]])],chk:()=>true};
});
TL6('tl6-15-expr',3,'VD','alg',[15],r=>{
  const a=r.int(100,500),b=r.int(11,99),c=r.int(11,99),x=r.nz(-9,9);
  return{kind:'tl',title:'Quy tắc dấu ngoặc',parts:[{pts:.5,html:`Bỏ dấu ngoặc rồi tính: (${a} ${MINUS} ${b}) ${MINUS} (${a} + ${c}) + (${b} + ${c}).`},{pts:.5,html:`Rút gọn biểu thức ${I('A')} = (${I('x')} + ${b}) ${MINUS} (${I('x')} ${MINUS} ${c}) ${MINUS} ${b} rồi tính giá trị của ${I('A')} khi ${I('x')} = ${sg(x)}.`}],
    sol:[ptxt([[`= ${a} − ${b} − ${a} − ${c} + ${b} + ${c}`,.25],[`= (${a} − ${a}) + (${b} − ${b}) + (${c} − ${c}) = 0.`,.25]]),ptxt([[`A = x + ${b} − x + ${c} − ${b} = ${c}.`,.25],[`A không phụ thuộc vào x nên khi x = ${sg(x)} thì A = ${c}.`,.25]])],chk:()=>true};
});
TL6('tl6-14-temp',3,'VD','alg',[14],r=>{
  const h=r.int(200,900),d=r.int(10,60)*10,t0=r.int(-6,4),u=r.int(3,9),w=r.int(6,14);
  return{kind:'tl',title:'Số nguyên trong thực tế',parts:[{pts:.5,html:`Một chiếc khinh khí cầu đang ở độ cao ${h} m, một tàu ngầm đang ở độ sâu ${d} m dưới mực nước biển. Biểu diễn hai độ cao trên bằng số nguyên và tính khoảng cách theo phương thẳng đứng giữa chúng.`},{pts:.5,html:`Nhiệt độ lúc sáng là ${sg(t0)} °C, trưa tăng ${u} °C, tối giảm ${w} °C so với buổi trưa. Tính nhiệt độ buổi tối.`}],
    sol:[ptxt([[`Khinh khí cầu: ${h} m; tàu ngầm: −${d} m.`,.25],[`Khoảng cách: ${h} − (−${d}) = ${h+d} (m).`,.25]]),ptxt([[`Buổi trưa: ${sg(t0)} + ${u} = ${sg(t0+u)} (°C).`,.25],[`Buổi tối: ${sg(t0+u)} − ${w} = ${sg(t0+u-w)} (°C).`,.25]])],chk:()=>true};
});
TL6('tl6-17-ndiv',3,'VDC','num',[17],r=>{
  const k=r.pick([5,7,8,10,13]),m=k-1,D=divs6(m).flatMap(d=>[-d,d]),N=D.map(d=>d-1).sort((a,b)=>a-b);
  return{kind:'tl',title:'Ước và bội của số nguyên (nâng cao)',parts:[{pts:.5,html:`Tìm tất cả các ước nguyên của ${m}.`},{pts:.5,html:`Tìm tất cả các số nguyên ${I('n')} sao cho ${I('n')} + ${k} chia hết cho ${I('n')} + 1.`}],
    sol:[ptxt([[`Ư(${m}) trong tập số tự nhiên: ${set6(divs6(m))}.`,.25],[`Các ước nguyên của ${m}: ${intSet6(D.slice().sort((a,b)=>a-b))}.`,.25]]),ptxt([[`Ta có n + ${k} = (n + 1) + ${m}. Vì n + 1 chia hết cho n + 1 nên n + ${k} chia hết cho n + 1 ⟺ ${m} chia hết cho n + 1 ⟺ n + 1 ∈ Ư(${m}) = ${intSet6(D.sort((a,b)=>a-b))}.`,.25],[`Vậy n ∈ ${intSet6(N)}.`,.25]])],chk:()=>!N.includes(-1)};
});
TL6('tl6-14-alt',3,'VDC','num',[14,15],r=>{
  const n=r.int(20,60),m=r.int(10,40);
  return{kind:'tl',title:'Tính tổng có quy luật',parts:[{pts:.5,html:`Tính ${I('S')} = 1 ${MINUS} 2 + 3 ${MINUS} 4 + … + ${2*n-1} ${MINUS} ${2*n}.`},{pts:.5,html:`Tính ${I('P')} = 1 ${MINUS} 3 + 5 ${MINUS} 7 + … + ${4*m-3} ${MINUS} ${4*m-1}.`}],
    sol:[ptxt([[`S có ${2*n} số hạng, nhóm thành ${n} cặp (1 − 2), (3 − 4), …, mỗi cặp bằng −1.`,.25],[`S = ${n}·(−1) = ${MINUS}${n}.`,.25]]),ptxt([[`P có ${2*m} số hạng, nhóm thành ${m} cặp (1 − 3), (5 − 7), …, mỗi cặp bằng −2.`,.25],[`P = ${m}·(−2) = ${MINUS}${2*m}.`,.25]])],chk:()=>true};
});

/* ===================== Chương IV: Hình phẳng ===================== */
N6('k6-18-prop',4,'NB',[18],r=>{
  const t=r.int(0,2),Q_=[['Trong tam giác đều, mỗi góc bằng','60°.',['90°.','45°.','120°.']],['Hình lục giác đều có','sáu cạnh bằng nhau và sáu góc bằng nhau.',['sáu cạnh bằng nhau và các góc bằng 90°.','sáu góc bằng nhau, các cạnh không bằng nhau.','ba đường chéo chính không cắt nhau.']],['Hình vuông có','bốn cạnh bằng nhau và bốn góc vuông.',['bốn cạnh bằng nhau và hai đường chéo không bằng nhau.','hai cạnh đối không song song.','bốn góc bằng nhau và các cạnh không bằng nhau.']]][t];
  return mkTxt(r,{stem:Q_[0],correct:Q_[1],wrongs:Q_[2],sol:'Theo tính chất của tam giác đều, hình vuông, lục giác đều.',chk:()=>true});
});
N6('k6-19-prop',4,'NB',[19],r=>{
  const t=r.int(0,3),Q_=[['Hình thoi có','hai đường chéo vuông góc với nhau.',['hai đường chéo bằng nhau.','bốn góc vuông.','hai cạnh kề không bằng nhau.']],['Hình chữ nhật có','hai đường chéo bằng nhau.',['hai đường chéo vuông góc với nhau.','bốn cạnh bằng nhau.','hai cạnh đối không bằng nhau.']],['Hình bình hành có','các cạnh đối song song và bằng nhau.',['bốn góc vuông.','hai đường chéo bằng nhau.','bốn cạnh bằng nhau.']],['Hình thang cân có','hai cạnh bên bằng nhau và hai đường chéo bằng nhau.',['hai đáy bằng nhau.','bốn góc vuông.','hai đường chéo vuông góc.']]][t];
  return mkTxt(r,{stem:Q_[0],correct:Q_[1],wrongs:Q_[2],sol:'Theo tính chất của hình chữ nhật, hình thoi, hình bình hành, hình thang cân.',chk:()=>true});
});
N6('k6-20-area',4,'TH',[20],r=>{
  const t=r.int(0,2);
  if(t===0){const d1=r.int(3,15)*2,d2=r.int(3,15);return mkNum(r,{stem:`Diện tích hình thoi có độ dài hai đường chéo ${d1} cm và ${d2} cm là`,correct:d1*d2/2,f:v=>nv(v)+' cm²',cands:[d1*d2,d1+d2,(d1+d2)*2,d1*d2/4],ok:x=>x>0&&isInt(x),sol:`S = ${fr('d₁·d₂',2)} = ${fr(`${d1}·${d2}`,2)} = ${d1*d2/2} (cm²).`,chk:()=>true})}
  if(t===1){const a=r.int(4,20),h=r.int(3,15);return mkNum(r,{stem:`Diện tích hình bình hành có độ dài một cạnh ${a} cm và chiều cao tương ứng ${h} cm là`,correct:a*h,f:v=>nv(v)+' cm²',cands:[a*h/2,2*(a+h),a+h,a*h*2],ok:x=>x>0&&isInt(x),sol:`S = a·h = ${a}·${h} = ${a*h} (cm²).`,chk:()=>true})}
  const a=r.int(5,20),b=a+r.int(2,10),h=r.int(2,12)*2;return mkNum(r,{stem:`Diện tích hình thang có hai đáy ${a} cm, ${b} cm và chiều cao ${h} cm là`,correct:(a+b)*h/2,f:v=>nv(v)+' cm²',cands:[(a+b)*h,a*b*h/2,(a+b+h),(b-a)*h/2],ok:x=>x>0&&isInt(x),sol:`S = ${fr('(a + b)·h',2)} = ${fr(`(${a} + ${b})·${h}`,2)} = ${(a+b)*h/2} (cm²).`,chk:()=>true});
});
N6('k6-20-peri',4,'TH',[20],r=>{
  const t=r.int(0,2);
  if(t===0){const a=r.int(3,25);return mkNum(r,{stem:`Một hình vuông có diện tích ${a*a} cm². Chu vi hình vuông đó là`,correct:4*a,f:v=>v+' cm',cands:[a,2*a,a*a/2,4*a+4].filter(isInt),ok:x=>x>0,sol:`Cạnh hình vuông là ${a} cm (vì ${a}·${a} = ${a*a}); chu vi 4·${a} = ${4*a} (cm).`,chk:()=>true})}
  if(t===1){const a=r.int(5,30),b=r.int(3,a-1);return mkNum(r,{stem:`Chu vi hình chữ nhật có chiều dài ${a} m và chiều rộng ${b} m là`,correct:2*(a+b),f:v=>v+' m',cands:[a+b,a*b,4*a,2*a+b],ok:x=>x>0,sol:`C = 2·(${a} + ${b}) = ${2*(a+b)} (m).`,chk:()=>true})}
  const a=r.int(3,20);return mkNum(r,{stem:`Chu vi hình thoi có độ dài cạnh ${a} cm là`,correct:4*a,f:v=>v+' cm',cands:[2*a,a*a,4*a+2,a+4],ok:x=>x>0,sol:`Hình thoi có bốn cạnh bằng nhau: C = 4·${a} = ${4*a} (cm).`,chk:()=>true});
});
DS6('ds6-19-prop',4,'NB',[18,19],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Hình thoi có hai đường chéo vuông góc với nhau.',f:'Hình thoi có hai đường chéo bằng nhau.',why:'Tính chất hai đường chéo của hình thoi.'},
  {t:'Hình chữ nhật có hai đường chéo bằng nhau.',f:'Hình chữ nhật có bốn cạnh bằng nhau.',why:'Tính chất của hình chữ nhật.'},
  {t:'Hình lục giác đều có sáu góc bằng nhau, mỗi góc bằng 120°.',f:'Hình lục giác đều có sáu góc bằng nhau, mỗi góc bằng 60°.',why:'Lục giác đều gồm 6 tam giác đều ghép lại.'},
  {t:'Hình bình hành có các cạnh đối song song và bằng nhau.',f:'Hình bình hành có hai đường chéo vuông góc với nhau.',why:'Tính chất của hình bình hành.'}],chk:()=>true}));
DS6('ds6-20-area',4,'TH',[20],r=>{
  for(;;){const a=r.int(8,30),b=r.int(4,a-2),d1=r.int(3,12)*2,d2=r.int(3,12);if(a*b===d1*d2/2||a*b===2*(a+b))continue;
  return mkDS(r,{stem:`Cho hình chữ nhật ${I('ABCD')} có ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm và hình thoi ${I('MNPQ')} có hai đường chéo ${d1} cm, ${d2} cm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Chu vi hình chữ nhật bằng ${2*(a+b)} cm.`,f:`Chu vi hình chữ nhật bằng ${a+b} cm.`,why:`2·(${a} + ${b}).`},
    {t:`Diện tích hình chữ nhật bằng ${a*b} cm².`,f:`Diện tích hình chữ nhật bằng ${2*(a+b)} cm².`,why:`${a}·${b}.`},
    {t:`Diện tích hình thoi bằng ${d1*d2/2} cm².`,f:`Diện tích hình thoi bằng ${d1*d2} cm².`,why:`${fr(`${d1}·${d2}`,2)}.`},
    {t:`Diện tích hình chữ nhật ${a*b>d1*d2/2?'lớn hơn':'không lớn hơn'} diện tích hình thoi.`,f:`Diện tích hình chữ nhật ${a*b>d1*d2/2?'nhỏ hơn':'lớn hơn'} diện tích hình thoi.`,why:`${a*b} và ${d1*d2/2}.`}],chk:()=>true})}
});
TLN6('t6-20-rect',4,'TH',[20],r=>{
  const a=r.int(5,40),b=r.int(3,a-1),t=r.chance(.5);
  return t?{kind:'tln',stem:`Một mảnh đất hình chữ nhật có chu vi ${2*(a+b)} m, chiều dài ${a} m. Tính diện tích mảnh đất (đơn vị: m²).`,ans:a*b,unit:'m²',sol:`Chiều rộng: ${a+b} − ${a} = ${b} (m); S = ${a}·${b} = ${a*b} (m²).`,chk:()=>true}
    :{kind:'tln',stem:`Một hình chữ nhật có diện tích ${a*b} cm², chiều rộng ${b} cm. Tính chu vi hình chữ nhật (đơn vị: cm).`,ans:2*(a+b),unit:'cm',sol:`Chiều dài ${a*b} : ${b} = ${a} (cm); chu vi 2·(${a} + ${b}) = ${2*(a+b)} (cm).`,chk:()=>true};
});
TLN6('t6-20-rh',4,'TH',[20],r=>{
  const d1=r.int(3,15)*2,d2=r.int(3,15),a=r.int(5,20),b=a+r.int(2,10),h=r.int(2,12)*2,t=r.chance(.5);
  return t?{kind:'tln',stem:`Tính diện tích hình thoi có độ dài hai đường chéo ${d1} cm và ${d2} cm (đơn vị: cm²).`,ans:d1*d2/2,unit:'cm²',sol:`S = ${fr(`${d1}·${d2}`,2)} = ${d1*d2/2}.`,chk:()=>true}
    :{kind:'tln',stem:`Tính diện tích hình thang cân có hai đáy ${a} cm, ${b} cm và chiều cao ${h} cm (đơn vị: cm²).`,ans:(a+b)*h/2,unit:'cm²',sol:`S = ${fr(`(${a} + ${b})·${h}`,2)} = ${(a+b)*h/2}.`,chk:()=>true};
});
TLN6('t6-20-path',4,'VD',[20],r=>{
  const a=r.int(15,40),b=r.int(10,a-2),w=r.int(1,3),v=a*b-(a-2*w)*(b-2*w);
  return{kind:'tln',stem:`Một mảnh vườn hình chữ nhật dài ${a} m, rộng ${b} m. Người ta làm một lối đi rộng ${w} m xung quanh vườn (phía trong mảnh vườn), phần còn lại để trồng rau. Tính diện tích lối đi (đơn vị: m²).`,ans:v,unit:'m²',
    sol:`Phần trồng rau là hình chữ nhật ${a-2*w} m × ${b-2*w} m, diện tích ${(a-2*w)*(b-2*w)} m². Lối đi: ${a*b} − ${(a-2*w)*(b-2*w)} = ${v} (m²).`,chk:()=>true};
});
TLN6('t6-20-tile',4,'VD',[20],r=>{
  const a=r.int(4,10),b=r.int(3,a),s=r.pick([40,50,60]),n=a*100/s*b*100/s;
  return{kind:'tln',stem:`Nền một căn phòng hình chữ nhật dài ${a} m, rộng ${b} m được lát bằng các viên gạch hình vuông cạnh ${s} cm. Cần ít nhất bao nhiêu viên gạch để lát kín nền (coi mạch vữa không đáng kể)?`,ans:Math.ceil(n),unit:'viên',
    sol:`Diện tích nền ${a*b} m² = ${nv(a*b*10000)} cm²; mỗi viên ${nv(s*s)} cm². Số viên: ${nv(a*b*10000)} : ${nv(s*s)} ${isInt(n)?'=':'≈'} ${isInt(n)?n:fmt(n)}${isInt(n)?'':` nên cần ${Math.ceil(n)} viên`}.`,chk:()=>true};
});
TL6('tl6-20-garden',4,'TH','real',[20],r=>{
  const a=r.int(15,40),b=r.int(8,a-3),p=r.pick([50,60,80,100])*1000;
  return{kind:'tl',title:'Chu vi và diện tích trong thực tế',parts:[{pts:.5,html:`Một mảnh vườn hình chữ nhật có chiều dài ${a} m và chiều rộng ${b} m. Tính chu vi và diện tích mảnh vườn.`},{pts:.5,html:`Người ta rào xung quanh vườn, chừa lại một cửa ra vào rộng 2 m. Biết mỗi mét hàng rào giá ${nv(p)} đồng, tính số tiền làm hàng rào.`}],
    sol:[ptxt([[`Chu vi: 2·(${a} + ${b}) = ${2*(a+b)} (m).`,.25],[`Diện tích: ${a}·${b} = ${a*b} (m²).`,.25]]),ptxt([[`Chiều dài hàng rào: ${2*(a+b)} − 2 = ${2*(a+b)-2} (m).`,.25],[`Số tiền: ${2*(a+b)-2}·${nv(p)} = ${nv((2*(a+b)-2)*p)} (đồng).`,.25]])],chk:()=>true};
});
TL6('tl6-20-tile',4,'VD','real',[20],r=>{
  const a=r.int(4,8),b=r.int(3,a),s=r.pick([40,50]),n=a*100/s*b*100/s,p=r.pick([60,80,100,120])*1000;if(!isInt(n))return T.tl['tl6-20-tile'].gen(r);
  return{kind:'tl',title:'Lát nền nhà',parts:[{pts:.5,html:`Nền một căn phòng hình chữ nhật dài ${a} m, rộng ${b} m. Tính diện tích nền phòng (đơn vị: cm²).`},{pts:.5,html:`Người ta lát nền bằng gạch hình vuông cạnh ${s} cm, giá mỗi viên ${nv(p)} đồng. Tính số viên gạch cần dùng và số tiền mua gạch (coi mạch vữa không đáng kể).`}],
    sol:[ptxt([[`Diện tích: ${a}·${b} = ${a*b} (m²)`,.25],[`= ${nv(a*b*10000)} (cm²).`,.25]]),ptxt([[`Mỗi viên ${nv(s*s)} cm²; số viên: ${nv(a*b*10000)} : ${nv(s*s)} = ${n}.`,.25],[`Số tiền: ${n}·${nv(p)} = ${nv(n*p)} (đồng).`,.25]])],chk:()=>true};
});
/* ===================== Chương V: Tính đối xứng ===================== */
const AX_L='AHMTUVWY',CEN_L='HINOSXZ',NO_L='FGJKLPQR';
N6('k6-21-letter',5,'NB',[21],r=>{
  const c=r.pick([...AX_L]),W=r.shuffle([...'FGJLNPQRSZ']).slice(0,4);
  return mkTxt(r,{stem:'Chữ cái in hoa nào sau đây có trục đối xứng?',correct:c,wrongs:W,sol:`Chữ ${c} có trục đối xứng; các chữ ${W.join(', ')} không có trục đối xứng.`,chk:()=>true});
});
N6('k6-22-letter',5,'NB',[22],r=>{
  const c=r.pick(['N','S','Z','O','H','X']),W=r.shuffle([...'AEFGJKLPRTUVY']).slice(0,4);
  return mkTxt(r,{stem:'Chữ cái in hoa nào sau đây có tâm đối xứng?',correct:c,wrongs:W,sol:`Chữ ${c} có tâm đối xứng (quay 180° quanh tâm thì trùng với chính nó).`,chk:()=>true});
});
const SH6=[['tam giác đều',3,false],['hình vuông',4,true],['hình chữ nhật (không phải hình vuông)',2,true],['hình thoi (không phải hình vuông)',2,true],['lục giác đều',6,true],['hình thang cân',1,false],['hình bình hành (không phải hình chữ nhật, không phải hình thoi)',0,true]];
N6('k6-21-shape',5,'TH',[21],r=>{
  const [n,k]=r.pick(SH6.filter(s=>s[1]>0)),W=[0,1,2,3,4,6].filter(x=>x!==k);
  return mkNum(r,{stem:`Số trục đối xứng của ${n} là`,correct:k,f:String,cands:r.shuffle(W).slice(0,4),ok:x=>x>=0,sol:`${n.charAt(0).toUpperCase()+n.slice(1)} có ${k} trục đối xứng.`,chk:()=>true});
});
N6('k6-22-shape',5,'TH',[22],r=>{
  const c=r.pick(SH6.filter(s=>s[2])),W=SH6.filter(s=>!s[2]).map(s=>s[0]).concat(['hình tam giác vuông','hình thang vuông']);
  return mkTxt(r,{stem:'Hình nào sau đây có tâm đối xứng?',correct:c[0].charAt(0).toUpperCase()+c[0].slice(1)+'.',wrongs:W.map(w=>w.charAt(0).toUpperCase()+w.slice(1)+'.'),sol:`${c[0].charAt(0).toUpperCase()+c[0].slice(1)} có tâm đối xứng là giao điểm hai đường chéo (hoặc tâm của hình).`,chk:()=>true});
});
DS6('ds6-21-sym',5,'TH',[21,22],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Hình vuông có 4 trục đối xứng.',f:'Hình vuông có 2 trục đối xứng.',why:'Hai đường chéo và hai đường nối trung điểm các cạnh đối.'},
  {t:'Tam giác đều không có tâm đối xứng.',f:'Tam giác đều có tâm đối xứng.',why:'Quay 180° quanh tâm thì tam giác đều không trùng với chính nó.'},
  {t:'Hình bình hành có tâm đối xứng là giao điểm hai đường chéo.',f:'Hình bình hành có hai trục đối xứng là hai đường chéo.',why:'Tính chất đối xứng của hình bình hành.'},
  {t:'Đường tròn có vô số trục đối xứng.',f:'Đường tròn chỉ có một trục đối xứng.',why:'Mọi đường thẳng đi qua tâm đều là trục đối xứng.'}],chk:()=>true}));
TLN6('t6-21-axes',5,'TH',[21],r=>{
  const A=r.pick(SH6.filter(s=>s[1]>0)),B=r.pick(SH6.filter(s=>s[1]>0&&s[0]!==A[0]));
  return{kind:'tln',stem:`Tính tổng số trục đối xứng của ${A[0]} và ${B[0]}.`,ans:A[1]+B[1],unit:'',sol:`${A[0]}: ${A[1]} trục; ${B[0]}: ${B[1]} trục. Tổng ${A[1]+B[1]}.`,chk:()=>true};
});
