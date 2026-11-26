/* ================================================================
   ÔN THI TỐT NGHIỆP THPT – dạng bổ sung sau khi đối chiếu đề chính thức năm 2025, đề chính thức năm 2026
   (lần 1 mã 0101, lần 2 mã 0110) và một số đề khảo sát của các Sở năm 2026. Mỗi dạng ứng với một kiểu câu đã xuất hiện; câu chữ và số liệu do
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

/* √n rút gọn thành k√m */
const sqS12=n=>{let k=1;for(let d=2;d*d<=n;d++)while(n%(d*d)===0){n/=d*d;k*=d}return n===1?String(k):`${k===1?'':k}${rt(n)}`};

/* Phần II – máy bay bay theo đường thẳng, vành đai bảo vệ là đường tròn trên mặt đất (đề 2026 lần 1, câu II.4) */
DST('tn-ds-guard',103,'VD',r=>{
  for(;;){const [p0,q0]=r.pick([[3,4],[4,3],[6,8],[8,6],[5,12],[12,5]]),F=[r.pick([1,-1])*p0,r.pick([1,-1])*q0],D=Math.hypot(...F);
    const [dR,h]=r.pick([[3,4],[4,3],[6,8],[8,6],[5,12]]),R=D-dR;if(R<3)continue;
    const g=gcd(Math.abs(F[0]),Math.abs(F[1])),u=[-F[1]/g,F[0]/g],t1=r.int(1,2),t2=r.int(1,3);
    const M=[F[0]-t1*u[0],F[1]-t1*u[1],h],N=[F[0]+t2*u[0],F[1]+t2*u[1],h],MN=[N[0]-M[0],N[1]-M[1],0],dmin=Math.hypot(dR,h);
    if(Math.max(...M.map(Math.abs),...N.map(Math.abs))>40)continue;
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, một đơn vị dài trên mỗi trục ứng với 10 mét trên thực tế. Một mục tiêu cần bảo vệ đặt tại gốc toạ độ ${I('O')}; vành đai bảo vệ là đường tròn tâm ${I('O')}, bán kính ${R} đơn vị, nằm trong mặt phẳng (${I('Oxy')}). Một máy bay không người lái (coi như một điểm) bay theo đường thẳng từ ${I('M')}${v3H(M)} đến ${I('N')}${v3H(N)}. Khoảng cách từ máy bay đến vành đai là độ dài ngắn nhất của các đoạn thẳng nối máy bay với một điểm trên vành đai. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${Vv('MN')} = ${v3H(MN)}.`,f:`${Vv('MN')} = ${v3H([-MN[0],-MN[1],0])}.`,why:`${Vv('MN')} = (x${sub('N')} − x${sub('M')}; y${sub('N')} − y${sub('M')}; z${sub('N')} − z${sub('M')}).`},
      {t:`Đường thẳng ${I('MN')} có phương trình tham số ${I('x')} = ${parT10(M[0],u[0])}, ${I('y')} = ${parT10(M[1],u[1])}, ${I('z')} = ${h} (${I('t')} ∈ ℝ).`,f:`Đường thẳng ${I('MN')} có phương trình tham số ${I('x')} = ${parT10(M[0],u[0])}, ${I('y')} = ${parT10(M[1],u[1])}, ${I('z')} = 0 (${I('t')} ∈ ℝ).`,why:`MN có vectơ chỉ phương ${v3H([u[0],u[1],0])} cùng phương ${Vv('MN')}, mọi điểm có cao độ z = ${h}.`},
      {t:`Trong quá trình bay từ ${I('M')} đến ${I('N')}, khoảng cách ngắn nhất từ máy bay đến vành đai là ${10*dmin} mét.`,f:`Trong quá trình bay từ ${I('M')} đến ${I('N')}, khoảng cách ngắn nhất từ máy bay đến vành đai là ${10*dR} mét.`,why:`Hình chiếu của máy bay xuống (Oxy) chạy trên đường thẳng cách O nhỏ nhất ${D} (tại ${v3H([F[0],F[1],0])}); khoảng cách tới đường tròn nhỏ nhất là ${D} − ${R} = ${dR}, nên khoảng cách nhỏ nhất là √(${dR}² + ${h}²) = ${dmin} đơn vị = ${10*dmin} m.`},
      {t:`Khoảng cách đó ngắn nhất khi máy bay ở vị trí ${v3H([F[0],F[1],h])}.`,f:`Khoảng cách đó ngắn nhất khi máy bay ở vị trí ${v3H([F[0],F[1],0])}.`,why:`Điểm trên MN có hình chiếu gần O nhất là ${v3H([F[0],F[1],h])}.`}],chk:()=>u[0]*F[0]+u[1]*F[1]===0});
  }
});

/* Phần II – bơm nước: tốc độ bơm là parabol qua O, A, B; lượng nước là nguyên hàm (đề 2026 lần 2, câu II.2) */
DST('tn-ds-pump',102,'VD',r=>{
  for(;;){const [p,q,v]=r.pick([[2,6,3],[2,4,4],[1,5,5],[2,8,4],[3,5,3],[4,6,6]]),s=p+q,k=p*q/v,c=1/k;if(!Number.isInteger(k))continue;
    const V=t=>c*(s*t*t/2-t*t*t/3),tm=s/2,Vm=V(tm),thr=Math.round((Vm+r.pick([-.4,-.3,.3,.4]))*10)/10;
    const cand=[];for(let n=1;n<5*s;n++){if(n%5===0)continue;const x=V(n/5);if(Math.abs(x*1000-Math.round(x*1000))<1e-6)cand.push(n)}if(!cand.length)continue;
    const n0=r.pick(cand),X=Math.round(V(n0/5)*1000)/1000,Xs=String(X).replace('.',','),ft=k===1?`${s}${I('t')} − ${I('t')}${sup(2)}`:fr(`${s}${I('t')} − ${I('t')}${sup(2)}`,k);
    const ftW=fr(`${s}${I('t')} − ${I('t')}${sup(2)}`,2*k),Vt=`${fr(`${s}${I('t')}${sup(2)}`,2*k)} − ${fr(`${I('t')}${sup(3)}`,3*k)}`,VtW=`${k===1?`${s}${I('t')}${sup(2)}`:fr(`${s}${I('t')}${sup(2)}`,k)} − ${fr(`${I('t')}${sup(3)}`,3*k)}`;
    return mkDS(r,{stem:`Người ta dùng một máy bơm để bơm nước vào một bể chưa có nước. Tại thời điểm ${I('t')} giờ (0 ≤ ${I('t')} ≤ ${s}) tính từ lúc máy bắt đầu chạy, tốc độ bơm nước vào bể là ${I('f')}(${I('t')}) (m³/giờ); đồ thị của hàm số ${I('y')} = ${I('f')}(${I('t')}) là một phần parabol đi qua gốc toạ độ ${I('O')} và hai điểm ${I('A')}(${p}; ${v}), ${I('B')}(${q}; ${v}). Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${I('f')}(${I('t')}) = ${ft} (m³/giờ).`,f:`${I('f')}(${I('t')}) = ${ftW} (m³/giờ).`,why:`Parabol qua O và đối xứng qua t = ${fmt(tm)} nên f(t) = at(${s} − t); f(${p}) = ${v} ⇒ a = ${fr(1,k)}.`},
      {t:`Lượng nước trong bể tại thời điểm ${I('t')} là ${I('V')}(${I('t')}) = ${Vt} (m³).`,f:`Lượng nước trong bể tại thời điểm ${I('t')} là ${I('V')}(${I('t')}) = ${VtW} (m³).`,why:`V(t) = ∫₀ᵗ f(u) du, V(0) = 0.`},
      {t:`Tại thời điểm tốc độ bơm lớn nhất, lượng nước trong bể ${Vm>thr?'lớn hơn':'nhỏ hơn'} ${fmt(thr)} m³.`,f:`Tại thời điểm tốc độ bơm lớn nhất, lượng nước trong bể ${Vm>thr?'nhỏ hơn':'lớn hơn'} ${fmt(thr)} m³.`,why:`f lớn nhất tại t = ${fmt(tm)}; V(${fmt(tm)}) ≈ ${fmt(r2tn(Vm))}.`},
      {t:`Sau ${fr(I('a'),I('b'))} giờ (phân số tối giản, ${I('b')} > 0) lượng nước trong bể là ${Xs} m³; khi đó ${I('a')} + ${I('b')} = ${n0+5}.`,f:`Sau ${fr(I('a'),I('b'))} giờ (phân số tối giản, ${I('b')} > 0) lượng nước trong bể là ${Xs} m³; khi đó ${I('a')} + ${I('b')} = ${n0+6}.`,why:`V tăng trên [0; ${s}] và V(${fr(n0,5)}) = ${Xs} nên thời điểm đó là ${fr(n0,5)} giờ.`}],chk:()=>Math.abs(V(p)*0+c*p*q-v)<1e-9&&Math.abs(Vm-thr)>.05});
  }
});

/* Phần II – trạm phát sóng: mặt cầu và vùng phủ sóng trên mặt đất (đề 2026 lần 2, câu II.3) */
DST('tn-ds-tower',103,'VD',r=>{
  for(;;){const [R,h,rho]=r.pick([[13,12,5],[10,8,6],[10,6,8],[13,5,12],[15,12,9],[17,15,8],[17,8,15]]),a=r.int(-3,3),b=r.int(-3,3);
    const off=r.pick([[3,4],[4,3],[6,8],[8,6],[5,12],[12,5],[8,15]]),e=Math.hypot(...off),inM=e<rho,Mp=[a+off[0],b+r.pick([1,-1])*off[1],0];
    const off2=r.pick([[6,8],[8,6],[5,12],[12,5],[8,15],[9,12]]),CN=Math.hypot(...off2);if(CN<=rho||e===rho)continue;const Np=[a-off2[0],b+off2[1],0];
    const e2s=[];for(let e2=0;e2<rho;e2++){const w=Math.sqrt(rho*rho-e2*e2);if(Number.isInteger(w))e2s.push([e2,w])}const [e2,w]=r.pick(e2s),T=20*w;
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, một đơn vị dài trên mỗi trục ứng với 10 mét; mặt đất là mặt phẳng (${I('Oxy')}). Một trạm phát sóng điện thoại đặt tại ${I('I')}(${sg(a)}; ${sg(b)}; ${h}) có bán kính phủ sóng ${10*R} m: vùng phủ sóng gồm các điểm ${I('P')} với ${I('IP')} ≤ ${10*R} m. Mỗi người trên mặt đất coi như một điểm. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Vùng phủ sóng là hình cầu giới hạn bởi mặt cầu (${I('x')} ${MINUS} ${a<0?'('+sg(a)+')':a})${sup(2)} + (${I('y')} ${MINUS} ${b<0?'('+sg(b)+')':b})${sup(2)} + (${I('z')} ${MINUS} ${h})${sup(2)} = ${R*R}.`,f:`Vùng phủ sóng là hình cầu giới hạn bởi mặt cầu (${I('x')} ${MINUS} ${a<0?'('+sg(a)+')':a})${sup(2)} + (${I('y')} ${MINUS} ${b<0?'('+sg(b)+')':b})${sup(2)} + (${I('z')} ${MINUS} ${h})${sup(2)} = ${R}.`,why:`Bán kính ${10*R} m ứng với ${R} đơn vị.`},
      {t:`Người đứng tại ${I('M')}${v3H(Mp)} ${inM?'ở trong':'ở ngoài'} vùng phủ sóng.`,f:`Người đứng tại ${I('M')}${v3H(Mp)} ${inM?'ở ngoài':'ở trong'} vùng phủ sóng.`,why:`IM² = ${e*e} + ${h*h} = ${e*e+h*h} ${inM?'≤':'>'} ${R*R}.`},
      {t:`Người đứng tại ${I('N')}${v3H(Np)} cần đi trên mặt đất ít nhất ${10*(CN-rho)} m để vào vùng phủ sóng.`,f:`Người đứng tại ${I('N')}${v3H(Np)} cần đi trên mặt đất ít nhất ${10*CN} m để vào vùng phủ sóng.`,why:`Phần mặt đất được phủ sóng là hình tròn tâm H(${sg(a)}; ${sg(b)}; 0), bán kính √(${R}² − ${h}²) = ${rho}; HN = ${CN} nên quãng đường ngắn nhất là ${CN} − ${rho} = ${CN-rho} đơn vị.`},
      {t:`Một người đi thẳng trên mặt đất với tốc độ 3,6 km/h dọc đường thẳng ${I('y')} = ${sg(b+e2)}, ${I('z')} = 0 thì ở trong vùng phủ sóng đúng ${T} giây.`,f:`Một người đi thẳng trên mặt đất với tốc độ 3,6 km/h dọc đường thẳng ${I('y')} = ${sg(b+e2)}, ${I('z')} = 0 thì ở trong vùng phủ sóng đúng ${T/2} giây.`,why:`Đường thẳng cách H một khoảng ${e2}; dây cung dài 2√(${rho}² − ${e2}²) = ${2*w} đơn vị = ${20*w} m; 3,6 km/h = 1 m/s nên thời gian là ${T} giây.`}],chk:()=>R*R===h*h+rho*rho&&e!==rho});
  }
});

/* Phần III – bóng đèn trên đa giác đều: mọi hình vuông đều có bóng đỏ (đề 2026 lần 1, câu III.4) */
TLNT('tn-t-lamp',106,'VD',r=>{
  for(;;){const k=r.pick([2,3,3,4]),n=4*k,m=r.int(k,Math.min(k+2,n-1));let fav=0;for(let j=0;j<=k;j++)fav+=(j%2?-1:1)*nC10(k,j)*(4*(k-j)>=m?nC10(4*(k-j),m):0);
    const tot=nC10(n,m),g=gcd(fav,tot),A=fav/g,B=tot/g;if(!fav)continue;let t=r.int(2,60);while(A*t>9999&&t>1)t--;if(A*t>9999)continue;const N=B*t;
    return{kind:'tln',stem:`Một khung trang trí có dạng đa giác đều ${n} cạnh ${I('A')}${sub(1)}${I('A')}${sub(2)}...${I('A')}${sub(n)}. Người ta lắp ngẫu nhiên ${n} bóng đèn, gồm ${m} bóng màu đỏ và ${n-m} bóng màu xanh (các bóng khác nhau), vào ${n} đỉnh, mỗi đỉnh một bóng. Gọi ${I('P')} là xác suất để mỗi hình vuông có bốn đỉnh là đỉnh của đa giác đều có ít nhất một bóng màu đỏ. Giá trị của ${N}${I('P')} bằng bao nhiêu?`,ans:A*t,
      sol:`Đa giác đều ${n} đỉnh có đúng ${k} hình vuông, rời nhau, mỗi hình vuông 4 đỉnh. Xác suất chỉ phụ thuộc vị trí ${m} bóng đỏ: n(Ω) = ${CH(n,m)} = ${tot}. Dùng bao hàm – loại trừ, số cách để không hình vuông nào thiếu bóng đỏ là ${[...Array(k+1)].map((_,j)=>`${j%2?'− ':j?'+ ':''}${CH(k,j)}·${CH(4*(k-j),m)}`).join(' ')} = ${fav}. P = ${fr(fav,tot)} = ${fr(A,B)} ⇒ ${N}P = ${A*t}.`,chk:()=>fav>0&&fav<=tot}}
});

/* Phần III – khối tròn xoay sinh bởi phần nằm giữa đường tròn và elip (đề 2026 lần 2, câu III.3) */
TLNT('tn-t-ring',102,'VD',r=>{
  for(;;){const [x0,y0]=r.pick([[8,6],[6,8],[4,3],[3,4],[12,5],[5,12],[9,12],[12,9]]),rho=Math.hypot(x0,y0),a=r.int(Math.floor(rho)+2,2*rho);
    const b2=y0*y0*a*a/(a*a-x0*x0);if(!Number.isInteger(b2)||b2>=rho*rho)continue;
    const V=2*Math.PI*((rho*rho-b2)*x0-(1-b2/(a*a))*x0**3/3),ans=Math.round(V);if(ans>9999||ans<10||Math.abs(V-ans)>.45)continue;
    return{kind:'tln',stem:`Trên mặt phẳng toạ độ ${I('Oxy')} (đơn vị: xăng-ti-mét), gọi (${I('H')}) là hình phẳng nằm phía trên trục hoành, ở bên trong đường tròn tâm ${I('O')} bán kính ${rho} và ở bên ngoài elip ${fr(`${I('x')}${sup(2)}`,a*a)} + ${fr(`${I('y')}${sup(2)}`,b2)} = 1. Quay (${I('H')}) quanh trục hoành ta được một vật thể tròn xoay. Thể tích của vật thể đó bằng bao nhiêu xăng-ti-mét khối (làm tròn đến hàng đơn vị)?`,ans,
      sol:`Giao điểm: ${fr('x²',a*a)} + ${fr(`${rho*rho} − x²`,b2)} = 1 ⇒ x = ±${x0}. V = π∫ từ −${x0} đến ${x0} của [(${rho*rho} − x²) − ${b2}(1 − ${fr('x²',a*a)})] dx = 2π[${rho*rho-b2}·${x0} − ${fr(a*a-b2,a*a)}·${fr(`${x0}³`,3)}] ≈ ${ans}.`,chk:()=>Math.abs(x0*x0/(a*a)+y0*y0/b2-1)<1e-9}}
});

/* Phần III – quy hoạch tuyến tính: chi phí nhỏ nhất thuê hai loại xe (đề 2026 lần 2, câu III.2) */
TLNT('tn-t-truck',110,'VD',r=>{
  for(;;){const xs=r.int(1,8)/2,ys=r.int(1,8)/2,a1=r.int(8,14),b1=r.int(1,4),a2=r.int(3,8),b2=r.int(12,22),a3=r.int(12,20),b3=r.int(16,24),cx=r.int(25,45),cy=r.int(30,55);
    const d1=a1*xs+b1*ys,d2=a2*xs+b2*ys;if(!Number.isInteger(d1)||!Number.isInteger(d2))continue;const d3=Math.ceil(a3*xs+b3*ys)+r.int(15,50);
    const L=[[a1,b1,d1],[a2,b2,d2],[a3,b3,d3],[1,0,0],[0,1,0]],ok=(x,y)=>x>=-1e-9&&y>=-1e-9&&a1*x+b1*y>=d1-1e-9&&a2*x+b2*y>=d2-1e-9&&a3*x+b3*y<=d3+1e-9,V=[];
    for(let i=0;i<5;i++)for(let j=i+1;j<5;j++){const [p,q,u]=L[i],[s,t,w]=L[j],D=p*t-q*s;if(!D)continue;const x=(u*t-q*w)/D,y=(p*w-u*s)/D;if(ok(x,y))V.push([x,y])}
    if(V.length<3)continue;const best=V.reduce((m,v)=>cx*v[0]+cy*v[1]<cx*m[0]+cy*m[1]?v:m),T=cx*best[0]+cy*best[1];if(!Number.isInteger(Math.round(T*10*1000)/1000)||Math.abs(T*10-Math.round(T*10))>1e-6||T*10>9999)continue;
    const vs=V.map(v=>`(${fmt(r2tn(v[0]))}; ${fmt(r2tn(v[1]))})`).join(', ');
    return{kind:'tln',stem:`Một công ty vận tải nhận chở ít nhất ${d1} tấn hàng loại A, ít nhất ${d2} tấn hàng loại B và không quá ${d3} tấn hàng loại C. Công ty dùng hai loại xe X và Y: mỗi xe X chở ${a1} tấn hàng A, ${a2} tấn hàng B và ${a3} tấn hàng C; mỗi xe Y chở ${b1} tấn hàng A, ${b2} tấn hàng B và ${b3} tấn hàng C. Chi phí cho một xe X là ${cx} triệu đồng, cho một xe Y là ${cy} triệu đồng. Gọi ${I('T')} (triệu đồng) là chi phí nhỏ nhất để hoàn thành đơn hàng (số xe được xét là số thực không âm như trong mô hình quy hoạch tuyến tính). Giá trị của 10${I('T')} bằng bao nhiêu?`,ans:Math.round(T*10),
      sol:`Gọi x, y là số xe X, Y: x, y ≥ 0; ${a1}x + ${b1}y ≥ ${d1}; ${a2}x + ${b2}y ≥ ${d2}; ${a3}x + ${b3}y ≤ ${d3}. Miền nghiệm là đa giác có các đỉnh ${vs}. Chi phí ${cx}x + ${cy}y nhỏ nhất tại (${fmt(best[0])}; ${fmt(best[1])}): T = ${fmt(T)} ⇒ 10T = ${Math.round(T*10)}.`,chk:()=>ok(...best)}}
});

/* Phần III – tứ diện có các cặp cạnh đối bằng nhau (đề 2026 lần 2, câu III.6) */
TLNT('tn-t-isotet',104,'VD',r=>{
  for(;;){const p=r.int(2,12)*r.pick([1,1,5]),q=r.int(2,12)*r.pick([1,1,5]),s=r.int(2,12)*r.pick([1,1,5]);if((p*q*s)%3||p*q*s/3>9999||new Set([p,q,s]).size<3)continue;
    const e1=p*p+q*q,e2=q*q+s*s,e3=s*s+p*p;
    return{kind:'tln',stem:`Cho tứ diện ${I('ABCD')} có ${I('AB')} = ${I('CD')} = ${sqS12(e1)}, ${I('AC')} = ${I('BD')} = ${sqS12(e2)}, ${I('AD')} = ${I('BC')} = ${sqS12(e3)}. Thể tích của khối tứ diện đã cho bằng bao nhiêu?`,ans:p*q*s/3,
      sol:`Tứ diện có các cặp cạnh đối bằng nhau nên đặt được vào một hình hộp chữ nhật kích thước a, b, c sao cho mỗi cạnh của tứ diện là đường chéo một mặt: a² + b² = ${e1}, b² + c² = ${e2}, c² + a² = ${e3} ⇒ a = ${p}, b = ${q}, c = ${s}. V = abc − 4·${fr('abc',6)} = ${fr('abc',3)} = ${p*q*s/3}.`,chk:()=>true}}
});

/* Phần III – hệ ba phương trình bậc nhất ba ẩn từ bảng bán hàng (đề 2026 lần 1, câu III.5) */
TLNT('tn-t-sys3',110,'VD',r=>{
  for(;;){const pr=[r.int(2,8)*5,r.int(2,8)*5,r.int(2,8)*5],Q3=[0,1,2,3].map(()=>[r.int(5,30),r.int(5,30),r.int(5,30)]),det=(m=>m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])-m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])+m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]))(Q3.slice(0,3));
    if(!det||new Set(pr).size<3)continue;const S=Q3.map(q=>q[0]*pr[0]+q[1]*pr[1]+q[2]*pr[2]);if(S[3]>9999)continue;
    const [g1,g2,g3]=r.pick([['rau cải','bí xanh','cà chua'],['khoai tây','cà rốt','bắp cải'],['cam','bưởi','xoài']]),days=['Thứ Hai','Thứ Tư','Thứ Sáu','Thứ Bảy'];
    const tb=tableHTML(['Ngày',g1+' (kg)',g2+' (kg)',g3+' (kg)','Số tiền (nghìn đồng)'],Q3.map((q,i)=>[days[i],...q.map(String),i<3?vnd12(S[i]):'?']));
    return{kind:'tln',stem:`Một nông trại cung cấp rau quả cho một siêu thị; số liệu bán hàng của bốn ngày được ghi trong bảng sau:<div class="figure">${tb}</div>Biết đơn giá theo ki-lô-gam của mỗi loại không đổi. Số tiền nông trại thu được ở ngày ${days[3]} là bao nhiêu nghìn đồng?`,ans:S[3],
      sol:`Gọi x, y, z (nghìn đồng/kg) là đơn giá ${g1}, ${g2}, ${g3}: ${Q3.slice(0,3).map((q,i)=>`${q[0]}x + ${q[1]}y + ${q[2]}z = ${S[i]}`).join('; ')}. Giải hệ được x = ${pr[0]}, y = ${pr[1]}, z = ${pr[2]}. Ngày ${days[3]}: ${Q3[3][0]}·${pr[0]} + ${Q3[3][1]}·${pr[1]} + ${Q3[3][2]}·${pr[2]} = ${S[3]} (nghìn đồng).`,chk:()=>true}}
});
const vnd12=n=>n.toLocaleString('vi-VN');
