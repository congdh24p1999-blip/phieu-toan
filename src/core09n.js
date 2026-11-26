/* ================================================================
   Toán 9: dạng tự luận bổ sung khi đối chiếu trọn đề tuyển sinh vào lớp 10 năm 2026 của
   TP. Hồ Chí Minh (bài 4, bài 5) và Hà Nội (câu V). Câu chữ, số liệu do Xưởng đề Toán tự tạo.
   ================================================================ */

/* ---------- Mảnh đất và phần xây nhà: lập phương trình bậc hai (TP.HCM, bài 4) ---------- */
TL9b('tl9-21-land',6,'VD','real',[21],r=>{
  for(;;){const d=r.int(4,12),a=r.int(6,16),b=r.int(5,12),k=r.int(2,8),x=r.int(b+3,40);
    /* đất: x(x + d); nhà: (x + d − a)(x − b); đất = k·nhà  ⇒ phương trình bậc hai có nghiệm x */
    const L=x+d,hl=L-a,hw=x-b;if((d===9&&a===15&&b===11&&k===8)||d===a||hl<=0||hw<=0||hl<hw)continue;if(L*x!==k*hl*hw)continue;
    const A=k-1,B=k*(d-a-b)-d,C=-k*b*(d-a);/* k(x+d−a)(x−b) − x(x+d) = 0 */
    const D=B*B-4*A*C,s=Math.sqrt(D);if(!isInt(s))continue;const x2=(-B-s)/(2*A);if(Math.abs(x2-x)<1e-9)continue;const ok2=x2>b&&x2+d-a>0;if(ok2)continue;
    return{kind:'tl',title:'Giải bài toán bằng cách lập phương trình',parts:[
      {pts:.5,html:`Một mảnh đất hình chữ nhật có chiều rộng ${I('x')} (m) (${I('x')} &gt; ${Math.max(b,a-d)}) và chiều dài hơn chiều rộng ${d} m. Người ta xây một ngôi nhà hình chữ nhật trên mảnh đất, có chiều dài ngắn hơn chiều dài mảnh đất ${a} m và chiều rộng ngắn hơn chiều rộng mảnh đất ${b} m. Viết biểu thức (dạng thu gọn) biểu thị diện tích ngôi nhà theo ${I('x')}.`},
      {pts:.5,html:`Tìm kích thước của mảnh đất, biết diện tích mảnh đất gấp ${k} lần diện tích ngôi nhà.`}],
      sol:[ptxt([[`Chiều dài ngôi nhà: x + ${d} − ${a} = x ${d-a<0?'−':'+'} ${Math.abs(d-a)} (m); chiều rộng: x − ${b} (m).`,.25],[`Diện tích ngôi nhà: (x ${d-a<0?'−':'+'} ${Math.abs(d-a)})(x − ${b}) = ${eqQ(1,d-a-b,-b*(d-a)).replace(/ = 0$/,'')} (m²).`,.25]]),
        ptxt([[`Ta có x(x + ${d}) = ${k}(x ${d-a<0?'−':'+'} ${Math.abs(d-a)})(x − ${b}) ⟺ ${eqQ(A,B,C)}.`,.25],[`Giải được x = ${x} (nhận)${isInt(x2)?` hoặc x = ${sgf9(x2)} (loại)`:` (nghiệm còn lại không thoả mãn)`}. Mảnh đất rộng ${x} m, dài ${L} m.`,.25]])],
      chk:()=>A*x*x+B*x+C===0&&x*L===k*hl*hw}}
});

/* ---------- Bình gồm thân hình trụ và nắp nửa hình cầu: thể tích, chi phí sơn (TP.HCM, bài 5) ---------- */
TL9b('tl9-32-paint',10,'VD','real',[31,32],r=>{
  const R=r.pick([3,4,5,6]),h=r.pick([12,15,18,20,25]),p=r.pick([150,180,200,210,250])*1000,pi=3.14;
  const V=pi*R*R*h+2/3*pi*R**3,S=2*pi*R*h+2*pi*R*R+pi*R*R,cost=S/10000*p,c1=Math.round(cost/1000)*1000;
  return{kind:'tl',title:'Hình trụ và hình cầu trong thực tế',parts:[
    {pts:.5,html:`Một chiếc bình gồm phần thân dạng hình trụ có chiều cao ${h} cm, bán kính đáy ${R} cm và phần nắp dạng nửa hình cầu có đường kính bằng đường kính đáy của thân bình. Tính thể tích bên trong của bình (bỏ qua độ dày vỏ bình; lấy π = 3,14; làm tròn đến hàng đơn vị của xăng-ti-mét khối).`},
    {pts:.5,html:`Người ta sơn toàn bộ mặt ngoài của bình (gồm mặt xung quanh thân bình, mặt ngoài nắp và đáy bình) với chi phí ${vnd9(p)} đồng cho mỗi mét vuông. Tính chi phí sơn một chiếc bình (làm tròn đến hàng nghìn đồng).`}],
    sol:[ptxt([[`Thân bình: π·${R}²·${h} = ${R*R*h}π; nắp: ${fr(2,3)}π·${R}³ = ${qh(Q(2*R**3,3))}π (cm³).`,.25],[`V ≈ 3,14·(${R*R*h} + ${qh(Q(2*R**3,3))}) ≈ ${Math.round(V)} cm³.`,.25]]),
      ptxt([[`Diện tích cần sơn: 2π·${R}·${h} + 2π·${R}² + π·${R}² = ${2*R*h+3*R*R}π ≈ ${fmt(Math.round(S*100)/100)} cm² ≈ ${(S/10000).toFixed(5).replace('.',',')} m².`,.25],[`Chi phí ≈ ${(S/10000).toFixed(5).replace('.',',')}·${vnd9(p)} ≈ ${vnd9(Math.round(cost))} ≈ ${vnd9(c1)} đồng.`,.25]])],chk:()=>V>0&&c1>0};
});

/* ---------- Tối ưu chi phí: thuê xưởng và thưởng công nhân (Hà Nội, câu V) ---------- */
TL9('tl9-6-cost',2,'VDC','real',[5],r=>{
  for(;;){const b=r.pick([2,4,5,8,10]),a=r.pick([2,3,4,5,6]),c=r.pick([1,2,3]),x=r.int(4,30),N=c*b*x*x/a;if(!isInt(N)||N%10||N<100||N>5000||!isInt(N/(b*x)))continue;
    const days=N/(b*x),T=a*days+c*x;
    return{kind:'tl',title:'Bài toán tối ưu trong thực tế',parts:[
      {pts:1,html:`Một công ty dự định thuê một xưởng sản xuất và điều động một số công nhân để hoàn thành đơn hàng ${vnd9(N)} sản phẩm. Chi phí thuê xưởng là ${a} triệu đồng mỗi ngày. Mỗi ngày, mỗi công nhân làm được ${b} sản phẩm; khi hoàn thành đơn hàng, công ty thưởng cho mỗi công nhân ${c} triệu đồng. Công ty nên điều động bao nhiêu công nhân và thuê xưởng trong bao nhiêu ngày để tổng chi phí thuê xưởng và tiền thưởng là nhỏ nhất?`}],
      sol:[ptxt([[`Gọi x (x ∈ ℕ*) là số công nhân; số ngày làm là ${fr(N,`${b}x`)} = ${fr(N/b,'x')}. Tổng chi phí T = ${a}·${fr(N/b,'x')} + ${c===1?'':c}x = ${fr(a*N/b,'x')} + ${c===1?'':c}x (triệu đồng).`,.25],[`Ta có T − ${2*Math.sqrt(a*c*N/b)} = ${fr(`(${c===1?'':c}x − ${c*x})²`,c===1?'x':`${c}x`)} ≥ 0 (vì ${a*N/b} = ${c}·${x}²), nên T ≥ ${T}.`,.5],[`Dấu "=" khi x = ${x}. Vậy nên điều động ${x} công nhân, thuê xưởng ${days} ngày; chi phí nhỏ nhất ${T} triệu đồng.`,.25]])],
      chk:()=>Math.abs(a*N/b/x+c*x-T)<1e-9&&[x-1,x+1].every(y=>a*N/b/y+c*y>=T)}}
});
