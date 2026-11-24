/* ================================================================
   LỚP 9 – bổ sung dạng câu cho các bài còn ít dạng
   (Bài 5, 7, 10, 13, 14, 15, 17, 21, 22, 23, 24, 28, 30, 32)
   ================================================================ */
/* ---------- Bài 5: Bất đẳng thức và tính chất ---------- */
N9('k9-5-mul',2,'TH',[5],r=>{
  const c=r.int(2,6),d=r.int(1,9);
  return mkTxt(r,{stem:`Cho ${I('a')} < ${I('b')}. Khẳng định nào sau đây đúng?`,correct:`${d} ${MINUS} ${c}${I('a')} > ${d} ${MINUS} ${c}${I('b')}`,
    wrongs:[`${d} ${MINUS} ${c}${I('a')} < ${d} ${MINUS} ${c}${I('b')}`,`${c}${I('a')} + ${d} > ${c}${I('b')} + ${d}`,`${MINUS}${c}${I('a')} < ${MINUS}${c}${I('b')}`,`${I('a')} ${MINUS} ${d} > ${I('b')} ${MINUS} ${d}`],
    sol:`a < b ⇒ −${c}a > −${c}b (nhân với số âm thì đổi chiều) ⇒ ${d} − ${c}a > ${d} − ${c}b.`,chk:()=>true});
});
DS9('ds9-5-prop',2,'TH',[5],r=>{
  const c=r.int(2,6),d=r.int(1,9),m=r.int(2,5);
  return mkDS(r,{stem:`Cho hai số thực ${I('a')}, ${I('b')} thoả mãn ${I('a')} > ${I('b')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('a')} + ${d} > ${I('b')} + ${d}.`,f:`${I('a')} + ${d} < ${I('b')} + ${d}.`,why:`Cộng cùng một số vào hai vế, chiều bất đẳng thức không đổi.`},
    {t:`${MINUS}${c}${I('a')} < ${MINUS}${c}${I('b')}.`,f:`${MINUS}${c}${I('a')} > ${MINUS}${c}${I('b')}.`,why:`Nhân hai vế với số âm thì đổi chiều.`},
    {t:`${m}${I('a')} ${MINUS} ${d} > ${m}${I('b')} ${MINUS} ${d}.`,f:`${m}${I('a')} ${MINUS} ${d} < ${m}${I('b')} ${MINUS} ${d}.`,why:`${m}a > ${m}b rồi cộng −${d} vào hai vế.`},
    {t:`Nếu ${I('b')} > ${c} thì ${I('a')} > ${c}.`,f:`Nếu ${I('b')} > ${c} thì ${I('a')} < ${c}.`,why:`Tính chất bắc cầu: a > b và b > ${c} ⇒ a > ${c}.`}],chk:()=>true});
});
TLN9('t9-5-min',2,'VD',[5],r=>{
  const k=r.nz(-5,5),c=k*k+r.int(-6,9);
  return{kind:'tln',stem:`Tìm giá trị nhỏ nhất của biểu thức ${I('P')} = ${I('x')}${sup(2)} ${k>0?MINUS:'+'} ${Math.abs(2*k)}${I('x')} ${c>=0?'+':MINUS} ${Math.abs(c)}.`,ans:c-k*k,unit:'',
    sol:`P = (x ${k>0?'−':'+'} ${Math.abs(k)})² + ${sg(c-k*k)} ≥ ${sg(c-k*k)} vì (x ${k>0?'−':'+'} ${Math.abs(k)})² ≥ 0; dấu "=" khi x = ${sg(k)}.`,chk:()=>true};
});
TLN9('t9-5-cmp',2,'TH',[5,6],r=>{
  const a=r.int(2,5),b=r.int(1,9),c=r.int(10,40),best=Math.ceil((c-b)/a)-1;/* số nguyên lớn nhất x với ax + b < c */
  return{kind:'tln',stem:`Tìm số nguyên ${I('x')} lớn nhất thoả mãn ${a}${I('x')} + ${b} < ${c}.`,ans:best,unit:'',sol:`${a}x < ${c-b} ⟺ x < ${qh(Q(c-b,a))}; số nguyên lớn nhất là ${best}.`,chk:()=>a*best+b<c&&a*(best+1)+b>=c};
});
TL9('tl9-5-prove',2,'TH','alg',[5],r=>{
  const c=r.int(2,6),d=r.int(1,9);
  return{kind:'tl',title:'Bất đẳng thức',parts:[{pts:.5,html:`Cho ${I('a')} > ${I('b')}. Chứng minh ${d} ${MINUS} ${c}${I('a')} < ${d} ${MINUS} ${c}${I('b')}.`},{pts:.5,html:`Chứng minh rằng với mọi số thực ${I('a')}, ${I('b')} ta có ${I('a')}${sup(2)} + ${I('b')}${sup(2)} ≥ 2${I('a')}${I('b')}. Dấu "=" xảy ra khi nào?`}],
    sol:[ptxt([[`Nhân hai vế của a > b với −${c} < 0: −${c}a < −${c}b.`,.25],[`Cộng ${d} vào hai vế: ${d} − ${c}a < ${d} − ${c}b.`,.25]]),ptxt([[`a² + b² − 2ab = (a − b)² ≥ 0 với mọi a, b.`,.25],[`Suy ra a² + b² ≥ 2ab; dấu "=" xảy ra khi a = b.`,.25]])],chk:()=>true};
});
/* ---------- Bài 7: Căn bậc hai và căn thức bậc hai ---------- */
TLN9('t9-7-sq',3,'TH',[7],r=>{
  for(;;){const m=r.pick([2,3,5,6,7,10,11]),k=r.int(1,5),sm=Math.sqrt(m);if(Math.abs(k-sm)<.1)continue;const big=k>sm;
    return{kind:'tln',stem:`Tính giá trị của biểu thức ${rt(`(${k} ${MINUS} ${rt(m)})${sup(2)}`)} ${big?'+':MINUS} ${rt(m)}.`,ans:big?k:-k,unit:'',
      sol:`${rt(`(${k} − √${m})²`)} = |${k} − √${m}| = ${big?`${k} − √${m} (vì ${k} > √${m})`:`√${m} − ${k} (vì ${k} < √${m})`}. Kết quả: ${sg(big?k:-k)}.`,chk:()=>true}}
});
TL9('tl9-7-cond',3,'TH','rad',[7],r=>{
  const a=r.int(2,5),b=r.int(1,9)*a,k=r.int(2,6);/* √(ax − b) xác định khi x ≥ b/a */
  return{kind:'tl',title:'Căn thức bậc hai',parts:[{pts:.5,html:`Tìm điều kiện của ${I('x')} để biểu thức ${rt(xlin(a,-b))} xác định.`},{pts:.5,html:`Rút gọn biểu thức ${I('A')} = ${rt(`${I('x')}${sup(2)} ${MINUS} ${2*k}${I('x')} + ${k*k}`)} + ${I('x')} với ${I('x')} < ${k}.`}],
    sol:[ptxt([[`Biểu thức xác định khi ${a}x − ${b} ≥ 0.`,.25],[`⟺ x ≥ ${b/a}.`,.25]]),ptxt([[`x² − ${2*k}x + ${k*k} = (x − ${k})² nên √((x − ${k})²) = |x − ${k}|.`,.25],[`Vì x < ${k} nên |x − ${k}| = ${k} − x; A = ${k} − x + x = ${k}.`,.25]])],chk:()=>true};
});
/* ---------- Bài 10: Căn bậc ba ---------- */
N9('k9-10-cmp',3,'TH',[10],r=>{
  for(;;){const a=r.int(2,4),b=r.int(2,5),A=a**3*b,B=A+r.pick([-3,-2,-1,1,2,3]);if(B<=1)continue;const big=A>B;
    return mkTxt(r,{stem:`So sánh hai số ${a}${cbrt(b)} và ${cbrt(B)}.`,correct:`${a}${cbrt(b)} ${big?'>':'<'} ${cbrt(B)}`,wrongs:[`${a}${cbrt(b)} ${big?'<':'>'} ${cbrt(B)}`,`${a}${cbrt(b)} = ${cbrt(B)}`,`Không so sánh được.`],
      sol:`${a}${cbrt(b)} = ${cbrt(`${a}³·${b}`)} = ${cbrt(A)} và ${A} ${big?'>':'<'} ${B} nên ${a}${cbrt(b)} ${big?'>':'<'} ${cbrt(B)}.`,chk:()=>true})}
});
TLN9('t9-10-calc',3,'TH',[10],r=>{
  const a=r.int(2,5),b=r.int(1,4),c=r.int(1,3),k=r.int(2,3);
  return{kind:'tln',stem:`Tính giá trị của biểu thức ${cbrt(a**3)} + ${cbrt(MINUS+b**3)} + ${k}${cbrt(c**3)}.`,ans:a-b+k*c,unit:'',sol:`${a} + (−${b}) + ${k}·${c} = ${a-b+k*c}.`,chk:()=>true};
});
TLN9('t9-10-eq',3,'VD',[10],r=>{
  for(;;){const a=r.int(1,4),c=r.nz(-3,4),x=r.int(-9,12),b=c**3-a*x;if(Math.abs(b)>70)continue;
    return{kind:'tln',stem:`Tìm ${I('x')}, biết ${cbrt(xlin(a,b))} = ${sg(c)}.`,ans:x,unit:'',sol:`${a===1?'':a}x ${b>=0?'+':'−'} ${Math.abs(b)} = (${sg(c)})³ = ${sg(c**3)} ⟺ x = ${sg(x)}.`,chk:()=>a*x+b===c**3}}
});
/* ---------- Bài 13: Mở đầu về đường tròn ---------- */
N9('k9-13-rect',5,'TH',[13],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2);
  return mkNum(r,{stem:`Bán kính của đường tròn đi qua bốn đỉnh của hình chữ nhật có hai cạnh ${p*k} cm và ${q*k} cm bằng`,correct:h*k/2,f:v=>fmt(v)+' cm',cands:[h*k,(p+q)*k/2,p*k,q*k/2],ok:x=>x>0,step:.5,
    sol:`Tâm đường tròn là giao điểm hai đường chéo; đường chéo dài √(${p*k}² + ${q*k}²) = ${h*k} nên R = ${fmt(h*k/2)} cm.`,chk:()=>true});
});
TLN9('t9-13-pts',5,'TH',[13],r=>{
  for(;;){const R=r.pick([5,10,13]),P=[...Array(5)].map(()=>[r.int(-12,12),r.int(-12,12)]),d2=P.map(([x,y])=>x*x+y*y);if(d2.some(v=>v===R*R))continue;const ins=d2.filter(v=>v<R*R).length;if(!ins||ins===5)continue;
    return{kind:'tln',stem:`Trong mặt phẳng tọa độ ${I('Oxy')}, cho đường tròn tâm ${I('O')} bán kính ${R}. Trong các điểm ${['A','B','C','D','E'].map((n,i)=>`${I(n)}${pr9(P[i])}`).join(', ')}, có bao nhiêu điểm nằm bên trong đường tròn?`,ans:ins,unit:'',
      sol:`So sánh khoảng cách từ O đến mỗi điểm với ${R}: ${P.map((p,i)=>`O${['A','B','C','D','E'][i]}² = ${d2[i]}`).join('; ')}; R² = ${R*R}. Có ${ins} điểm có khoảng cách nhỏ hơn ${R}.`,chk:()=>true}}
});
TLN9('t9-13-rect',5,'VD',[13],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,3),v=Math.round(Math.PI*(h*k/2)**2*10)/10;
  return{kind:'tln',stem:`Một tấm bìa hình chữ nhật kích thước ${p*k} cm × ${q*k} cm được đặt vừa khít trong một hình tròn (bốn đỉnh nằm trên đường tròn). Tính diện tích hình tròn đó (đơn vị: cm², làm tròn kết quả đến hàng phần mười).`,ans:v,unit:'cm²',
    sol:`Đường kính bằng đường chéo: ${h*k} cm, R = ${fmt(h*k/2)}; S = πR² ≈ ${fmt(v)} (cm²).`,chk:()=>v<10000};
});
/* ---------- Bài 14: Cung và dây ---------- */
N9('k9-14-cmp',5,'NB',[14],r=>{
  const R=r.int(6,12),d1=r.int(1,R-2),d2=r.int(d1+1,R-1);
  return mkTxt(r,{stem:`Trong đường tròn (${I('O')}; ${R} cm), dây ${I('AB')} cách tâm ${d1} cm, dây ${I('CD')} cách tâm ${d2} cm. Khẳng định nào sau đây đúng?`,correct:`${I('AB')} > ${I('CD')}`,wrongs:[`${I('AB')} < ${I('CD')}`,`${I('AB')} = ${I('CD')}`,`${I('AB')} = ${2*R} cm`],
    sol:`Trong một đường tròn, dây nào gần tâm hơn thì lớn hơn; ${d1} < ${d2} nên AB > CD.`,chk:()=>true});
});
TLN9('t9-14-chord',5,'TH',[14],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2),t=r.chance(.5);
  return{kind:'tln',stem:t?`Cho đường tròn (${I('O')}; ${h*k} cm) và dây ${I('AB')} cách tâm ${I('O')} một khoảng ${p*k} cm. Tính độ dài dây ${I('AB')} (đơn vị: cm).`:`Cho đường tròn (${I('O')}; ${h*k} cm) và dây ${I('AB')} = ${2*q*k} cm. Tính khoảng cách từ ${I('O')} đến dây ${I('AB')} (đơn vị: cm).`,ans:t?2*q*k:p*k,unit:'cm',
    sol:t?`Gọi H là trung điểm AB thì OH ⊥ AB; AH = √(${h*k}² − ${p*k}²) = ${q*k}; AB = ${2*q*k} (cm).`:`AH = ${q*k}; OH = √(${h*k}² − ${q*k}²) = ${p*k} (cm).`,chk:()=>true};
});
TLN9('t9-14-arc',5,'TH',[14],r=>{
  const g=r.pick([40,50,60,70,80,100,110,120,130,140,150]);
  return{kind:'tln',stem:`Cho hai điểm ${I('A')}, ${I('B')} thuộc đường tròn (${I('O')}) sao cho ∠${I('AOB')} = ${g}°. Tính số đo cung lớn ${I('AB')} (đơn vị: độ).`,ans:360-g,unit:'°',sol:`Số đo cung nhỏ AB bằng ${g}°; cung lớn: 360° − ${g}° = ${360-g}°.`,chk:()=>true};
});
/* ---------- Bài 15: Độ dài cung tròn, hình quạt ---------- */
DS9('ds9-15-sector',5,'TH',[15],r=>{
  const R=r.pick([3,4,6,9,12]),n=r.pick([60,90,120]),L=Q(R*n,180),S=Q(R*R*n,360);
  return mkDS(r,{stem:`Cho hình quạt tròn bán kính ${R} cm, ứng với cung ${n}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Độ dài cung của hình quạt bằng ${piH(L)} cm.`,f:`Độ dài cung của hình quạt bằng ${piH(Q(R*n,360))} cm.`,why:`l = ${fr(`πRn`,180)} = ${piH(L)}.`},
    {t:`Diện tích hình quạt bằng ${piH(S)} cm².`,f:`Diện tích hình quạt bằng ${piH(Q(R*R*n,180))} cm².`,why:`S = ${fr(`πR²n`,360)} = ${piH(S)}.`},
    {t:`Diện tích hình quạt bằng ${fr(1,2)} tích của độ dài cung và bán kính.`,f:`Diện tích hình quạt bằng tích của độ dài cung và bán kính.`,why:`S = ${fr('lR',2)}.`},
    {t:`Hình quạt chiếm ${qh(Q(n,360))} diện tích hình tròn.`,f:`Hình quạt chiếm ${qh(Q(n,180))} diện tích hình tròn.`,why:`${n}° : 360° = ${qh(Q(n,360))}.`}],chk:()=>true});
});
N9('k9-15-ring',5,'TH',[15],r=>{
  const R=r.int(4,10),r1=r.int(1,R-1);
  return mkTxt(r,{stem:`Diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính ${R} cm và ${r1} cm là`,correct:`${piH([R*R-r1*r1,1])} cm²`,wrongs:[piH([(R-r1)**2,1]),piH([R*R+r1*r1,1]),piH([2*(R-r1),1]),piH([R-r1,1])].map(x=>x+' cm²'),
    sol:`S = π(R² − r²) = π(${R*R} − ${r1*r1}) = ${piH([R*R-r1*r1,1])} (cm²).`,chk:()=>true});
});
TL9('tl9-15-fan',5,'TH','real',[15],r=>{
  const R=r.pick([20,24,25,30]),r1=r.pick([5,6,8,10]),n=r.pick([120,135,150,160]),L=Math.round(Math.PI*R*n/180*10)/10,S=Math.round(Math.PI*(R*R-r1*r1)*n/360*10)/10;
  return{kind:'tl',title:'Độ dài cung và diện tích hình quạt',parts:[{pts:.5,html:`Một chiếc quạt giấy khi xòe ra có dạng hình quạt tròn bán kính ${R} cm, góc ở tâm ${n}°. Tính độ dài cung tròn của mép quạt (làm tròn đến hàng phần mười).`},{pts:.5,html:`Phần dán giấy của quạt là phần hình quạt nằm giữa hai cung tròn bán kính ${R} cm và ${r1} cm (cùng góc ở tâm ${n}°). Tính diện tích phần giấy (làm tròn đến hàng phần mười).`}],
    sol:[ptxt([[`l = ${fr(`πRn`,180)} = ${fr(`π·${R}·${n}`,180)}.`,.25],[`l ≈ ${fmt(L)} (cm).`,.25]]),ptxt([[`S = ${fr(`π(R² − r²)n`,360)} = ${fr(`π(${R*R} − ${r1*r1})·${n}`,360)}.`,.25],[`S ≈ ${fmt(S)} (cm²).`,.25]])],chk:()=>R>r1};
});
/* ---------- Bài 17: Vị trí tương đối của hai đường tròn ---------- */
N9('k9-17-d',5,'NB',[17],r=>{
  const R=r.int(5,12),rr=r.int(2,R-1),t=r.chance(.5);
  return mkNum(r,{stem:`Hai đường tròn (${I('O')}; ${R} cm) và (${I('O′')}; ${rr} cm) tiếp xúc ${t?'ngoài':'trong'}. Độ dài đoạn ${I('OO′')} bằng`,correct:t?R+rr:R-rr,f:v=>v+' cm',cands:[t?R-rr:R+rr,R,rr,2*R],ok:x=>x>0,
    sol:`Hai đường tròn tiếp xúc ${t?'ngoài thì OO′ = R + r':'trong thì OO′ = R − r'} = ${t?R+rr:R-rr} cm.`,chk:()=>true});
});
TLN9('t9-17-int',5,'VD',[17],r=>{
  const R=r.int(5,12),rr=r.int(2,R-1);
  return{kind:'tln',stem:`Cho hai đường tròn (${I('O')}; ${R} cm) và (${I('O′')}; ${rr} cm). Có bao nhiêu giá trị nguyên (đơn vị cm) của độ dài ${I('OO′')} để hai đường tròn cắt nhau?`,ans:2*rr-1,unit:'',
    sol:`Hai đường tròn cắt nhau ⟺ R − r < OO′ < R + r ⟺ ${R-rr} < OO′ < ${R+rr}; có ${2*rr-1} giá trị nguyên.`,chk:()=>true};
});
TLN9('t9-17-d',5,'TH',[17],r=>{
  const R=r.int(5,12),rr=r.int(2,R-1),t=r.chance(.5);
  return{kind:'tln',stem:`Hai đường tròn (${I('O')}; ${R} cm) và (${I('O′')}; ${rr} cm) tiếp xúc ${t?'ngoài':'trong'} tại ${I('A')}. Tính độ dài đoạn ${I('OO′')} (đơn vị: cm).`,ans:t?R+rr:R-rr,unit:'cm',sol:`Ba điểm O, O′, A thẳng hàng; OO′ = ${t?`R + r = ${R+rr}`:`R − r = ${R-rr}`} (cm).`,chk:()=>true};
});
/* ---------- Bài 21: Giải bài toán bằng cách lập phương trình ---------- */
N9b('k9-21-move',6,'TH',[21],r=>{
  const D=r.pick([60,80,90,100,120,150]),k=r.pick([5,10,15]),t=r.pick([.5,1]),X=I('x');
  return mkTxt(r,{stem:`Một xe máy đi quãng đường ${D} km. Nếu tăng vận tốc thêm ${k} km/h thì đến sớm hơn ${fmt(t)} giờ. Gọi ${X} (km/h) là vận tốc dự định (${X} > 0). Phương trình nào sau đây mô tả bài toán?`,
    correct:`${fr(D,X)} ${MINUS} ${fr(D,`${X} + ${k}`)} = ${fmt(t)}`,wrongs:[`${fr(D,`${X} + ${k}`)} ${MINUS} ${fr(D,X)} = ${fmt(t)}`,`${fr(D,X)} + ${fr(D,`${X} + ${k}`)} = ${fmt(t)}`,`${fr(D,X)} ${MINUS} ${fr(D,`${X} ${MINUS} ${k}`)} = ${fmt(t)}`,`${D}${X} ${MINUS} ${D}(${X} + ${k}) = ${fmt(t)}`],
    sol:`Thời gian dự định ${fr(D,'x')}, thời gian thực tế ${fr(D,`x + ${k}`)}; thời gian dự định nhiều hơn ${fmt(t)} giờ.`,chk:()=>true});
});
N9b('k9-21-num',6,'TH',[21],r=>{
  const n=r.int(3,15),P=n*(n+2),t=r.chance(.5),X=I('x');
  return mkNum(r,{stem:`Tích của hai số ${t?'chẵn':'lẻ'} liên tiếp bằng ${t?(2*n)*(2*n+2):(2*n+1)*(2*n+3)}. Số nhỏ hơn trong hai số đó (là số dương) bằng`,correct:t?2*n:2*n+1,cands:[t?2*n+2:2*n+3,t?2*n-2:2*n-1,n,t?2*n+1:2*n],ok:x=>x>0,
    sol:`Gọi x là số nhỏ hơn: x(x + 2) = ${t?(2*n)*(2*n+2):(2*n+1)*(2*n+3)} ⟺ ${xquad(1,2,-(t?(2*n)*(2*n+2):(2*n+1)*(2*n+3)))} = 0 ⇒ x = ${t?2*n:2*n+1} (nhận).`,chk:()=>P>0});
});
DS9b('ds9-21-move',6,'VD',[21],r=>{
  for(;;){const v=r.pick([30,36,40,45,48,50,60]),k=r.pick([5,6,10,12,15]),t=r.pick([.5,1,1.5]),D=t*v*(v+k)/k;if(!isInt(D)||D>300||D<40)continue;const c=-D*k/t;
    return mkDS(r,{stem:`Một ô tô đi từ ${I('A')} đến ${I('B')} dài ${D} km. Lúc về, ô tô tăng vận tốc thêm ${k} km/h nên thời gian về ít hơn thời gian đi ${fmt(t)} giờ. Gọi ${I('x')} (km/h) là vận tốc lúc đi. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Thời gian về là ${fr(D,`${I('x')} + ${k}`)} giờ.`,f:`Thời gian về là ${fr(D,`${I('x')} ${MINUS} ${k}`)} giờ.`,why:`Vận tốc lúc về là x + ${k}.`},
      {t:`${I('x')} thoả mãn phương trình ${eqQ(1,k,c)}.`,f:`${I('x')} thoả mãn phương trình ${eqQ(1,-k,c)}.`,why:`${fr(D,'x')} − ${fr(D,`x + ${k}`)} = ${fmt(t)} ⟺ ${eqQ(1,k,c)}.`},
      {t:`Vận tốc lúc đi là ${v} km/h.`,f:`Vận tốc lúc đi là ${v+k} km/h.`,why:`Phương trình có nghiệm dương x = ${v}.`},
      {t:`Thời gian đi là ${fmt(D/v)} giờ.`,f:`Thời gian đi là ${fmt(D/(v+k))} giờ.`,why:`${D} : ${v} = ${fmt(D/v)}.`}],chk:()=>true})}
});
TLN9b('t9-21-rect',6,'TH',[21],r=>{
  const w=r.int(4,20),d=r.int(2,9),S=w*(w+d),t=r.chance(.5);
  return{kind:'tln',stem:`Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng ${d} m và diện tích ${S} m². Tính ${t?'chiều rộng':'chu vi'} của mảnh vườn (đơn vị: m).`,ans:t?w:2*(2*w+d),unit:'m',
    sol:`Gọi x (m) là chiều rộng: x(x + ${d}) = ${S} ⇒ x = ${w}. ${t?'':`Chu vi: 2(${w} + ${w+d}) = ${2*(2*w+d)} (m).`}`,chk:()=>true};
});
/* ---------- Bài 22 – 23: Bảng tần số, tần số tương đối ---------- */
DS9b('ds9-22-tab',7,'NB',[22],r=>{
  for(;;){const C=r.pick(CTX9S),N=r.int(25,40),ns=nsOf(r,C.xs.length,N),mx=Math.max(...ns),im=ns.indexOf(mx),mn=Math.min(...ns),i=r.int(0,C.xs.length-1);if(ns.filter(v=>v===mx).length>1||mn===mx)continue;const alt=ns.indexOf(mn);
    return mkDS(r,{stem:`Bảng tần số sau cho biết ${C.what} của các ${C.who}:<div class="figure">${freqTab(C.xs,ns,C.lx)}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Cỡ mẫu bằng ${N}.`,f:`Cỡ mẫu bằng ${C.xs.length}.`,why:`${ns.join(' + ')} = ${N}.`},
      {t:`Giá trị ${C.xs[i]} có tần số là ${ns[i]}.`,f:`Giá trị ${C.xs[i]} có tần số là ${ns[i]+1}.`,why:`Đọc trực tiếp từ bảng.`},
      {t:`Giá trị ${C.xs[im]} có tần số lớn nhất.`,f:`Giá trị ${C.xs[alt]} có tần số lớn nhất.`,why:`Tần số lớn nhất là ${mx}.`},
      {t:`Có ${C.xs.length} giá trị khác nhau trong mẫu dữ liệu.`,f:`Có ${N} giá trị khác nhau trong mẫu dữ liệu.`,why:`Các giá trị: ${C.xs.join(', ')}.`}],chk:()=>true})}
});
DS9b('ds9-23-rel',7,'TH',[23],r=>{
  for(;;){const C=r.pick(CTX9S),N=r.pick([20,25,40,50]),ns=nsOf(r,C.xs.length,N),i=r.int(0,C.xs.length-1),j=(i+1)%ns.length,ps=ns.map(n=>n*100/N);if(ns[i]===ns[j])continue;
    return mkDS(r,{stem:`Bảng tần số sau cho biết ${C.what} của ${N} ${C.who}:<div class="figure">${freqTab(C.xs,ns,C.lx)}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Tần số tương đối của giá trị ${C.xs[i]} là ${pctH(ps[i])}.`,f:`Tần số tương đối của giá trị ${C.xs[i]} là ${pctH(ns[i])}.`,why:`${fr(ns[i],N)}·100% = ${pctH(ps[i])}.`},
      {t:`Tần số tương đối của giá trị ${C.xs[j]} là ${pctH(ps[j])}.`,f:`Tần số tương đối của giá trị ${C.xs[j]} là ${pctH(ps[i])}.`,why:`${fr(ns[j],N)}·100% = ${pctH(ps[j])}.`},
      {t:`Tổng các tần số tương đối bằng 100%.`,f:`Tổng các tần số tương đối bằng ${N}%.`,why:`Tổng các tần số bằng cỡ mẫu nên tổng tần số tương đối bằng 100%.`},
      {t:`Tỉ lệ ${C.who.startsWith('gia')?'gia đình':'bạn'} có ${C.what} không lớn hơn ${C.xs[1]} là ${pctH(ps[0]+ps[1])}.`,f:`Tỉ lệ ${C.who.startsWith('gia')?'gia đình':'bạn'} có ${C.what} không lớn hơn ${C.xs[1]} là ${pctH(ps[1])}.`,why:`${pctH(ps[0])} + ${pctH(ps[1])} = ${pctH(ps[0]+ps[1])}.`}],chk:()=>ns[i]!==ps[i]&&ps[0]>0&&ns[j]*100/N!==ps[i]})}
});
N9b('k9-23-sum',7,'NB',[23],r=>{
  const C=r.pick(CTX9S),N=r.pick([20,25,40,50]),ns=nsOf(r,C.xs.length,N),ps=ns.map(n=>n*100/N),i=r.int(0,C.xs.length-1);
  return mkNum(r,{stem:`Bảng tần số tương đối về ${C.what} của ${N} ${C.who}:<div class="figure">${tableHTML([C.lx,...C.xs.map(String)],[['Tần số tương đối',...ps.map((p,k)=>k===i?I('a')+'%':pctH(p))]])}</div>Giá trị của ${I('a')} là`,correct:ps[i],cands:[ns[i],100-ps[i],ps[(i+1)%ps.length],ps[i]+5],ok:x=>x>0&&x<100,step:100/N,f:v=>fmt(v),
    sol:`Tổng các tần số tương đối bằng 100% nên a = 100 − (${ps.filter((_,k)=>k!==i).map(fmt).join(' + ')}) = ${fmt(ps[i])}.`,chk:()=>isInt(ps[i]*100)});
});
TLN9b('t9-22-mode',7,'TH',[22],r=>{
  for(;;){const C=r.pick(CTX9S),N=r.int(20,30),ns=nsOf(r,C.xs.length,N),raw=rawOf(r,C.xs,ns),mx=Math.max(...ns);if(ns.filter(v=>v===mx).length>1)continue;const im=ns.indexOf(mx);
    return{kind:'tln',stem:`Kết quả điều tra về ${C.what} của ${N} ${C.who} được ghi lại như sau:<div class="figure">${rawGrid(raw)}</div>Giá trị nào có tần số lớn nhất?`,ans:C.xs[im],unit:'',sol:`Lập bảng tần số: ${C.xs.map((x,k)=>`${x}: ${ns[k]}`).join('; ')}. Giá trị ${C.xs[im]} có tần số lớn nhất (${mx}).`,chk:()=>true}}
});
/* ---------- Bài 24: Ghép nhóm ---------- */
N9b('k9-24-hist',7,'TH',[24],r=>{
  for(;;){const g=r.pick(GRP9),N=r.int(25,45),ns=nsOf(r,g.k,N),i=r.int(0,g.k-1),mx=Math.max(...ns);if(ns.filter(v=>v===mx).length>1)continue;const t=r.chance(.5),im=ns.indexOf(mx);
    const stem=`Biểu đồ tần số ghép nhóm dưới đây biểu diễn ${g.what}.<div class="figure">${barSVG(ns.map((_,k)=>grpH(g,k)),ns)}</div>`;
    return t?mkNum(r,{stem:stem+`Cỡ mẫu của dữ liệu là`,correct:N,cands:[g.k,N-ns[0],mx,N+ns[i]],ok:x=>x>0,sol:`Cộng tần số các nhóm: ${ns.join(' + ')} = ${N}.`,chk:()=>true})
      :mkTxt(r,{stem:stem+`Nhóm có tần số lớn nhất là`,correct:grpH(g,im),wrongs:ns.map((_,k)=>k).filter(k=>k!==im).map(k=>grpH(g,k)),sol:`Cột cao nhất ứng với nhóm ${grpH(g,im)} (tần số ${mx}).`,chk:()=>true})}
});
N9b('k9-24-len',7,'NB',[24],r=>{
  const g=r.pick(GRP9),N=r.pick([20,25,40]),ns=nsOf(r,g.k,N);
  return mkNum(r,{stem:`Bảng tần số ghép nhóm về ${g.what}:<div class="figure">${grpTab(g,ns)}</div>Độ dài của mỗi nhóm là`,correct:g.w,cands:[g.k,g.lo,2*g.w,g.w/2],ok:x=>x>0,sol:`Mỗi nhóm [a; b) có độ dài b − a = ${g.w}.`,chk:()=>true});
});
/* ---------- Bài 28: Đường tròn ngoại tiếp, nội tiếp ---------- */
N9b('k9-28-pos',9,'NB',[28],r=>{
  const t=r.int(0,2),Q_=[['Tâm đường tròn ngoại tiếp tam giác vuông là','trung điểm của cạnh huyền.',['trung điểm của một cạnh góc vuông.','đỉnh góc vuông.','trọng tâm của tam giác.']],
    ['Tâm đường tròn ngoại tiếp tam giác đều là','giao điểm của ba đường trung tuyến (cũng là trọng tâm).',['trung điểm của một cạnh.','một đỉnh của tam giác.','một điểm nằm ngoài tam giác.']],
    ['Tâm đường tròn ngoại tiếp tam giác tù nằm','bên ngoài tam giác.',['bên trong tam giác.','trên cạnh lớn nhất.','tại trung điểm cạnh lớn nhất.']]][t];
  return mkTxt(r,{stem:Q_[0],correct:Q_[1],wrongs:Q_[2],sol:['Góc vuông là góc nội tiếp chắn nửa đường tròn nên cạnh huyền là đường kính.','Trong tam giác đều, các đường trung trực cũng là các đường trung tuyến.','Tam giác tù có tâm đường tròn ngoại tiếp nằm ngoài tam giác.'][t],chk:()=>true});
});
TL9b('tl9-28-tri',9,'TH','geo',[28],r=>{
  const k=r.int(1,4),a=6*k,Sc=Math.round((Math.PI*12*k*k-9*Math.sqrt(3)*k*k)*10)/10;
  return{kind:'tl',title:'Đường tròn ngoại tiếp và nội tiếp tam giác đều',parts:[{pts:.5,html:`Cho tam giác đều ${I('ABC')} cạnh ${a} cm. Tính bán kính ${I('R')} của đường tròn ngoại tiếp và bán kính ${I('r')} của đường tròn nội tiếp tam giác.`},{pts:.5,html:`Tính diện tích phần hình tròn ngoại tiếp nằm ngoài tam giác ${I('ABC')} (làm tròn đến hàng phần mười).`}],
    sol:[ptxt([[`R = ${fr(`a${rt(3)}`,3)} = ${kr(2*k,3)} (cm).`,.25],[`r = ${fr(`a${rt(3)}`,6)} = ${kr(k,3)} (cm).`,.25]]),ptxt([[`S(hình tròn) = πR² = ${piH([12*k*k,1])}; S(tam giác) = ${fr(`a²${rt(3)}`,4)} = ${kr(9*k*k,3)}.`,.25],[`Diện tích cần tìm = ${piH([12*k*k,1])} − ${kr(9*k*k,3)} ≈ ${fmt(Sc)} (cm²).`,.25]])],chk:()=>Sc>0};
});
/* ---------- Bài 30: Đa giác đều ---------- */
TL9b('tl9-30-hex',9,'TH','geo',[30],r=>{
  const a=r.int(2,10),S=Math.round(3*Math.sqrt(3)/2*a*a*10)/10;
  return{kind:'tl',title:'Lục giác đều',parts:[{pts:.5,html:`Cho lục giác đều ${I('ABCDEF')} cạnh ${a} cm, tâm ${I('O')}. Tính số đo mỗi góc của lục giác và số đo góc ${I('AOB')}.`},{pts:.5,html:`Chứng minh tam giác ${I('OAB')} đều. Từ đó tính bán kính đường tròn ngoại tiếp và diện tích lục giác (làm tròn đến hàng phần mười).`}],
    sol:[ptxt([[`Mỗi góc của lục giác đều: (6 − 2)·180° : 6 = 120°.`,.25],[`∠AOB = 360° : 6 = 60°.`,.25]]),ptxt([[`OA = OB và ∠AOB = 60° nên tam giác OAB đều; R = OA = AB = ${a} cm.`,.25],[`Lục giác gồm 6 tam giác đều cạnh ${a}: S = 6·${fr(`${a}²${rt(3)}`,4)} ≈ ${fmt(S)} (cm²).`,.25]])],chk:()=>true};
});
DS9b('ds9-30-hex',9,'TH',[30],r=>{
  const a=r.int(2,10);
  return mkDS(r,{stem:`Cho lục giác đều ${I('ABCDEF')} cạnh ${a} cm, tâm ${I('O')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Mỗi góc của lục giác bằng 120°.`,f:`Mỗi góc của lục giác bằng 108°.`,why:`(6 − 2)·180° : 6 = 120°.`},
    {t:`Bán kính đường tròn ngoại tiếp lục giác bằng ${a} cm.`,f:`Bán kính đường tròn ngoại tiếp lục giác bằng ${2*a} cm.`,why:`Tam giác OAB đều nên OA = AB.`},
    {t:`Bán kính đường tròn nội tiếp lục giác bằng ${a%2?fr(kr(a,3),2):kr(a/2,3)} cm.`,f:`Bán kính đường tròn nội tiếp lục giác bằng ${kr(a,3)} cm.`,why:`Bằng đường cao của tam giác đều cạnh ${a}.`},
    {t:`Phép quay tâm ${I('O')} góc 60° biến lục giác thành chính nó.`,f:`Phép quay tâm ${I('O')} góc 45° biến lục giác thành chính nó.`,why:`Các góc quay thích hợp là bội của 60°.`}],chk:()=>true});
});
/* ---------- Bài 32: Hình cầu ---------- */
DS9b('ds9-32-sph',10,'TH',[32],r=>{
  const R=r.int(2,9);
  return mkDS(r,{stem:`Cho hình cầu bán kính ${R} cm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Diện tích mặt cầu bằng ${piH([4*R*R,1])} cm².`,f:`Diện tích mặt cầu bằng ${piH([R*R,1])} cm².`,why:`S = 4πR².`},
    {t:`Thể tích hình cầu bằng ${piH(Q(4*R**3,3))} cm³.`,f:`Thể tích hình cầu bằng ${piH([4*R**3,1])} cm³.`,why:`V = ${fr(4,3)}πR³.`},
    {t:`Nếu bán kính tăng gấp đôi thì diện tích mặt cầu tăng gấp 4 lần.`,f:`Nếu bán kính tăng gấp đôi thì diện tích mặt cầu tăng gấp 2 lần.`,why:`S tỉ lệ với R².`},
    {t:`Nếu bán kính tăng gấp đôi thì thể tích hình cầu tăng gấp 8 lần.`,f:`Nếu bán kính tăng gấp đôi thì thể tích hình cầu tăng gấp 4 lần.`,why:`V tỉ lệ với R³.`}],chk:()=>true});
});
TL9b('tl9-32-ball',10,'TH','real',[32],r=>{
  const d=r.pick([20,22,24]),n=r.pick([10,20,50]),S=Math.round(Math.PI*d*d*10)/10,V=Math.round(Math.PI*d**3/6/1000*100)/100;
  return{kind:'tl',title:'Hình cầu trong thực tế',parts:[{pts:.5,html:`Một quả bóng hình cầu có đường kính ${d} cm. Tính diện tích da cần để may quả bóng (làm tròn đến hàng phần mười, bỏ qua phần đường may).${fig9Sph({r:fmt(d/2)+' cm'})}`},{pts:.5,html:`Tính thể tích không khí chứa trong quả bóng (đơn vị: lít, làm tròn đến hàng phần trăm). Một cửa hàng cần bơm ${n} quả bóng như vậy, tổng thể tích khí cần khoảng bao nhiêu lít?`}],
    sol:[ptxt([[`R = ${d/2} cm; S = 4πR² = π·${d}².`,.25],[`S ≈ ${fmt(S)} (cm²).`,.25]]),ptxt([[`V = ${fr(4,3)}πR³ = ${fr(1,6)}π·${d}³ ≈ ${fmt(Math.round(Math.PI*d**3/6))} cm³ ≈ ${fmt(V)} lít.`,.25],[`${n} quả cần khoảng ${n}·${fmt(V)} ≈ ${fmt(Math.round(n*V*100)/100)} lít.`,.25]])],chk:()=>true};
});
/* ---------- bổ sung đợt 2 ---------- */
DS9('ds9-13-pts',5,'TH',[13],r=>{
  for(;;){const R=r.pick([5,10,13]),A=[r.int(-4,4),r.int(-4,4)],B=r.pick(R===5?[[3,4],[-4,3],[0,-5]]:R===10?[[6,8],[-8,6],[0,10]]:[[5,12],[-12,5],[13,0]]),C=[R+r.int(1,3),r.int(-2,2)];if(A[0]**2+A[1]**2>=R*R)continue;
    return mkDS(r,{stem:`Trong mặt phẳng tọa độ ${I('Oxy')}, cho đường tròn (${I('O')}; ${R}). Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Điểm ${I('A')}${pr9(A)} nằm bên trong đường tròn.`,f:`Điểm ${I('A')}${pr9(A)} nằm bên ngoài đường tròn.`,why:`OA² = ${A[0]**2+A[1]**2} < ${R*R}.`},
      {t:`Điểm ${I('B')}${pr9(B)} nằm trên đường tròn.`,f:`Điểm ${I('B')}${pr9(B)} nằm bên trong đường tròn.`,why:`OB² = ${B[0]**2+B[1]**2} = ${R*R}.`},
      {t:`Điểm ${I('C')}${pr9(C)} nằm bên ngoài đường tròn.`,f:`Điểm ${I('C')}${pr9(C)} nằm trên đường tròn.`,why:`OC² = ${C[0]**2+C[1]**2} > ${R*R}.`},
      {t:`Điểm đối xứng với ${I('B')} qua ${I('O')} cũng thuộc đường tròn.`,f:`Điểm đối xứng với ${I('B')} qua ${I('O')} nằm bên ngoài đường tròn.`,why:`O là tâm đối xứng của đường tròn.`}],chk:()=>true})}
});
N9('k9-17-cnt',5,'NB',[17],r=>{
  const t=r.int(0,2),L=['cắt nhau','tiếp xúc nhau','ở ngoài nhau'];
  return mkNum(r,{stem:`Hai đường tròn ${L[t]} có bao nhiêu điểm chung?`,correct:[2,1,0][t],cands:[0,1,2,3],ok:x=>x>=0,f:v=>String(v),sol:`Hai đường tròn ${L[t]} có ${[2,1,0][t]} điểm chung.`,chk:()=>true});
});
TLN9b('t9-22-ge',7,'TH',[22],r=>{
  const C=r.pick(CTX9S),N=r.int(25,40),ns=nsOf(r,C.xs.length,N),j=r.int(1,C.xs.length-2),ge=ns.slice(j).reduce((a,b)=>a+b,0);
  return{kind:'tln',stem:`Bảng tần số sau cho biết ${C.what} của các ${C.who}:<div class="figure">${freqTab(C.xs,ns,C.lx)}</div>Có bao nhiêu ${C.who.startsWith('gia')?'gia đình':'bạn'} có ${C.what} từ ${C.xs[j]} trở lên?`,ans:ge,unit:'',sol:`${ns.slice(j).join(' + ')} = ${ge}.`,chk:()=>true};
});
TLN9b('t9-23-pie',7,'TH',[23],r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,120,200]),k=r.int(0,3),v=N*pcts[k]/100;
  return{kind:'tln',stem:`Biểu đồ tần số tương đối dưới đây biểu diễn kết quả khảo sát ${set.what} của ${N} học sinh khối 9.<div class="figure">${pieSVG(set.names.map((n,i)=>({name:n,pct:pcts[i]})))}</div>Có bao nhiêu học sinh chọn “${set.names[k]}”?`,ans:v,unit:'',sol:`${N}·${pcts[k]}% = ${v}.`,chk:()=>isInt(v)};
});
TLN9b('t9-24-hist',7,'TH',[24],r=>{
  const g=r.pick(GRP9),N=r.pick([20,25,40,50]),ns=nsOf(r,g.k,N),i=r.int(0,g.k-1),v=ns[i]*100/N;
  return{kind:'tln',stem:`Biểu đồ tần số ghép nhóm dưới đây biểu diễn ${g.what}.<div class="figure">${barSVG(ns.map((_,k)=>grpH(g,k)),ns)}</div>Tính tần số tương đối (theo %) của nhóm ${grpH(g,i)}.`,ans:v,unit:'%',sol:`Cỡ mẫu ${ns.join(' + ')} = ${N}; ${fr(ns[i],N)}·100% = ${pctH(v)}.`,chk:()=>isInt(v*100)};
});
