/* ================================================================
   ÔN THI TỐT NGHIỆP THPT – dạng bổ sung sau khi đối chiếu đề chính thức năm 2025, 2026 và một số đề
   khảo sát của các Sở năm 2026. Mỗi dạng ứng với một kiểu câu đã xuất hiện; câu chữ và số liệu do
   Xưởng đề Toán tự tạo, không chép từ đề nào.
   ================================================================ */

/* Phần II – mô hình thực tế với tích phân: công suất tấm pin mặt trời (đề 2026 có bối cảnh lưu trữ điện mặt trời) */
DST('tn-ds-solar',102,'VD',r=>{
  const a=r.pick([.05,.1,.15,.2,.25]),d=r.int(2,4),T=r.int(8,11),u=T-6,Pm=36*a,E=288*a,c=a*(36-d*d),ET=a*(6*u*u-u*u*u/3);
  const F=v=>fmt(Math.round(v*1000)/1000);
  return mkDS(r,{stem:`Công suất phát điện của một hệ thống pin mặt trời trong một ngày nắng được mô hình hoá bởi ${I('P')}(${I('t')}) = ${fmt(a)}(${I('t')} ${MINUS} 6)(18 ${MINUS} ${I('t')}) (kW), với ${I('t')} là thời điểm trong ngày tính theo giờ, 6 ≤ ${I('t')} ≤ 18. Điện năng (kWh) tạo ra từ thời điểm ${I('t')}${sub(1)} đến thời điểm ${I('t')}${sub(2)} bằng tích phân của ${I('P')}(${I('t')}) trên đoạn [${I('t')}${sub(1)}; ${I('t')}${sub(2)}]. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Công suất lớn nhất của hệ thống là ${F(Pm)} kW, đạt lúc 12 giờ.`,f:`Công suất lớn nhất của hệ thống là ${F(Pm)} kW, đạt lúc 11 giờ.`,why:`P(t) = ${fmt(a)}(−t² + 24t − 108); P′(t) = ${fmt(a)}(−2t + 24) = 0 ⟺ t = 12; P(12) = ${fmt(a)}·6·6 = ${F(Pm)}.`},
    {t:`Điện năng tạo ra trong cả ngày (từ 6 giờ đến 18 giờ) là ${F(E)} kWh.`,f:`Điện năng tạo ra trong cả ngày (từ 6 giờ đến 18 giờ) là ${F(Pm*12)} kWh.`,why:`Đặt u = t − 6: ∫₀¹² ${fmt(a)}u(12 − u) du = ${fmt(a)}(6u² − u³/3)|₀¹² = ${fmt(a)}·288 = ${F(E)}.`},
    {t:`Thời gian công suất lớn hơn ${F(c)} kW kéo dài ${2*d} giờ.`,f:`Thời gian công suất lớn hơn ${F(c)} kW kéo dài ${2*d+2} giờ.`,why:`P(t) > ${F(c)} ⟺ (t − 6)(18 − t) > ${36-d*d} ⟺ (t − 12)² < ${d*d} ⟺ ${12-d} < t < ${12+d}.`},
    {t:`Điện năng tạo ra từ 6 giờ đến ${T} giờ là ${F(ET)} kWh.`,f:`Điện năng tạo ra từ 6 giờ đến ${T} giờ là ${F(a*u*(12-u)*u/2)} kWh.`,why:`∫₀^${u} ${fmt(a)}(12u − u²) du = ${fmt(a)}(6·${u}² − ${u}³/3) = ${F(ET)}.`}],chk:()=>Math.abs(ET-a*u*(12-u)*u/2)>1e-6&&Math.abs(Pm*12-E)>1e-6});
});

/* Phần II – Oxyz: thiết bị bay theo đường tròn, khoảng cách nhỏ nhất, lớn nhất tới một điểm (đề 2026) */
DST('tn-ds-drone',103,'VD',r=>{
  for(;;){const s=r.int(2,5),t=r.int(1,s-1),k=5*(s-t),hs=[];for(let h=3;h<=60;h++){const q=Math.sqrt(k*k+h*h);if(Number.isInteger(q))hs.push(h)}if(!hs.length)continue;
    const h=r.pick(hs),R=5*t,sw=r.chance(.5),sx=r.pick([1,-1]),sy=r.pick([1,-1]),a=sx*(sw?4:3)*s,b=sy*(sw?3:4)*s,d=5*s,dmin=Math.sqrt(k*k+h*h),dmax=Math.sqrt((d+R)**2+h*h),dI2=d*d+h*h;
    const near=[R*a/d,R*b/d,h],far=[-R*a/d,-R*b/d,h],sq=n=>Number.isInteger(Math.sqrt(n))?String(Math.sqrt(n)):rt(n);
    const wrongMin=Math.sqrt(dI2)-R,p2=v=>v<0?`(${sg(v)})²`:`${v}²`;
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')} (đơn vị trên mỗi trục là mét), mặt đất là mặt phẳng (${I('Oxy')}). Một thiết bị bay không người lái bay theo đường tròn (${I('C')}) có tâm ${I('I')}(0; 0; ${h}), bán kính ${R} m, nằm trong mặt phẳng song song với mặt đất. Một người quan sát đứng tại điểm ${I('M')}(${sg(a)}; ${sg(b)}; 0). Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Đường tròn (${I('C')}) nằm trong mặt phẳng ${I('z')} = ${h}.`,f:`Đường tròn (${I('C')}) nằm trong mặt phẳng ${I('z')} = ${R}.`,why:`Mặt phẳng chứa (C) đi qua I và song song với (Oxy).`},
      {t:`Khoảng cách từ ${I('M')} đến tâm ${I('I')} bằng ${sq(dI2)} m.`,f:`Khoảng cách từ ${I('M')} đến tâm ${I('I')} bằng ${sq(d*d)} m.`,why:`MI = √(${p2(a)} + ${p2(b)} + ${h}²) = ${sq(dI2)}.`},
      {t:`Khoảng cách nhỏ nhất giữa người quan sát và thiết bị bay bằng ${fmt(dmin)} m.`,f:`Khoảng cách nhỏ nhất giữa người quan sát và thiết bị bay bằng ${fmt(r2tn(wrongMin))} m.`,why:`Hình chiếu của M lên mặt phẳng z = ${h} là M′(${sg(a)}; ${sg(b)}; ${h}), M′I = ${d} > ${R}. Điểm của (C) gần M nhất nằm trên tia IM′, cách M′ một đoạn ${d} − ${R} = ${k}; khoảng cách nhỏ nhất = √(${k}² + ${h}²) = ${fmt(dmin)}.`},
      {t:`Khi thiết bị bay ở xa người quan sát nhất, nó ở vị trí ${v3H(far)}.`,f:`Khi thiết bị bay ở xa người quan sát nhất, nó ở vị trí ${v3H(near)}.`,why:`Điểm xa nhất nằm trên tia đối của tia IM′: I − ${R}·${fr(`${vc(I('IM′'))}`,d)} = ${v3H(far)}; khoảng cách lớn nhất = √(${d+R}² + ${h}²) ≈ ${fmt(r2tn(dmax))}.`}],chk:()=>Number.isInteger(near[0])&&Number.isInteger(near[1])&&Math.abs(wrongMin-dmin)>.05});
  }
});

/* Phần III – thể tích khối tròn xoay elip có khoan lỗ trụ: hạt cườm (đề 2026) */
TLNT('tn-t-bead',102,'VD',r=>{
  for(;;){const b=r.pick([3,4,5,6]),rr=r.pick([1,1.5,2]),a=r.int(6,12);if(rr>=b-.5)continue;
    const x0=a*Math.sqrt(1-rr*rr/(b*b)),V=4/3*Math.PI*x0*(b*b-rr*rr),ans=Math.round(V);if(ans>9999||Math.abs(V-ans)>.45)continue;
    return{kind:'tln',stem:`Một hạt cườm trang sức có dạng khối tròn xoay tạo thành khi quay hình phẳng giới hạn bởi elip ${fr(`${I('x')}${sup(2)}`,a*a)} + ${fr(`${I('y')}${sup(2)}`,b*b)} = 1 quanh trục ${I('Ox')}, sau đó được khoan một lỗ hình trụ bán kính ${fmt(rr)} mm xuyên suốt dọc theo trục ${I('Ox')} (đơn vị trên các trục là mi-li-mét). Tính thể tích phần còn lại của hạt cườm (đơn vị: mm³, làm tròn đến hàng đơn vị).`,ans:ans,
      sol:`Lỗ khoan cắt elip tại |x| = x₀ với ${b}²(1 − x₀²/${a}²) = ${fmt(rr)}² ⇒ x₀ = ${a}√(1 − ${fmt(rr*rr)}/${b*b}) ≈ ${fmt(r2tn(x0))}. V = π∫ từ −x₀ đến x₀ của [${b*b}(1 − x²/${a*a}) − ${fmt(rr*rr)}] dx = ${fr(4,3)}πx₀(${b*b} − ${fmt(rr*rr)}) ≈ ${ans} (mm³).`,chk:()=>true}}
});

/* Phần III – đường elip trong thực tế: cổng, đường hầm hình nửa elip (lớp 10, ba đường conic) */
TLNT('tn-t-ellipse',110,'VD',r=>{
  for(;;){const a=r.pick([4,5,6,8,10]),b=r.pick([3,4,5,6]),w=r.pick([2,3,4,5,6]);if(w/2>=a*.9)continue;
    const y=b*Math.sqrt(1-(w/2)**2/(a*a)),ans=r2tn(y);if(!okR2(y)||String(fmt(ans)).length>4)continue;
    return{kind:'tln',stem:`Một đường hầm có mặt cắt là nửa hình elip: chiều rộng mặt đường là ${2*a} m, điểm cao nhất của vòm cách mặt đường ${b} m. Một xe tải có thùng rộng ${w} m đi chính giữa đường hầm. Chiều cao của xe (tính cả thùng) phải nhỏ hơn bao nhiêu mét để xe đi qua được? (làm tròn kết quả đến hàng phần trăm)`,ans:ans,
      sol:`Chọn hệ trục với gốc tại trung điểm mặt đường, vòm có phương trình ${fr(`x²`,a*a)} + ${fr(`y²`,b*b)} = 1 (y ≥ 0). Mép thùng xe ở x = ${fmt(w/2)}: y = ${b}√(1 − ${fmt((w/2)**2)}/${a*a}) ≈ ${fmt(ans)} (m).`,chk:()=>true}}
});

/* Phần III – xác suất hình học trên bảng đèn: bốn bóng sáng là bốn đỉnh một hình vuông (câu phân loại đề 2026) */
TLNT('tn-t-grid',106,'VD',r=>{
  const [m,n]=r.pick([[3,3],[3,4],[3,5],[4,4],[4,5]]);let sq=0;for(let k=1;k<Math.min(m,n);k++)sq+=k*(m-k)*(n-k);
  const tot=nC10(m*n,4),g=gcd(sq,tot),A=sq/g,B=tot/g;
  return{kind:'tln',stem:`Một bảng đèn trang trí gồm ${m*n} bóng đèn xếp thành ${m} hàng, ${n} cột; các bóng là các đỉnh của một lưới ô vuông (hai bóng liền kề cách nhau 10 cm). Bật sáng ngẫu nhiên đồng thời 4 bóng. Xác suất để 4 bóng sáng là 4 đỉnh của một hình vuông bằng ${fr(I('a'),I('b'))} (phân số tối giản). Tính ${I('a')} + ${I('b')}.`,ans:A+B,
    sol:`n(Ω) = ${CH(m*n,4)} = ${tot}. Mỗi hình vuông có đỉnh trên lưới được xác định bởi một hình vuông "bao" thẳng hàng với lưới có cạnh k ô (có (${m} − k)(${n} − k) vị trí) và k cách đặt đỉnh trên cạnh của nó (kể cả hình vuông nghiêng). Số hình vuông: ${[...Array(Math.min(m,n)-1)].map((_,i)=>`${i+1}·${m-i-1}·${n-i-1}`).join(' + ')} = ${sq}. P = ${fr(sq,tot)} = ${fr(A,B)} ⇒ a + b = ${A+B}.`,chk:()=>String(A+B).length<=4};
});
