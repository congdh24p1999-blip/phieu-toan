/* ================================================================
   Toán 9: dạng tự luận bổ sung sau đợt đối chiếu thứ hai (tháng 11/2026) với đề tuyển sinh
   vào lớp 10 năm 2026 của Tuyên Quang, Lào Cai, Thái Nguyên, Lạng Sơn, Sơn La, Hải Phòng,
   Bắc Ninh, Đồng Tháp. Mỗi dạng ứng với một kiểu câu hỏi xuất hiện trong các đề đó; câu chữ
   và số liệu do Xưởng đề Toán tự tạo, không chép từ đề nào.
   ================================================================ */

/* ---------- Cuộn tờ giấy hình chữ nhật thành mặt xung quanh hình trụ (Thái Nguyên) ---------- */
TL9b('tl9-31-roll',10,'TH','real',[31],r=>{
  const a=r.pick([16,18,20,24,25,30]),b=r.pick([8,10,12,15]),wide=r.chance(.5);
  const C=wide?a:b,h=wide?b:a,R=C/(2*Math.PI),V=C*C*h/(4*Math.PI);
  const edge=wide?'chiều rộng':'chiều dài';
  return{kind:'tl',title:'Hình trụ trong thực tế',parts:[
    {pts:.5,html:`Một tờ giấy hình chữ nhật ${I('ABCD')} có chiều dài ${I('AB')} = ${a} cm và chiều rộng ${I('AD')} = ${b} cm. Người ta cuộn tờ giấy sao cho hai cạnh ${edge} vừa khít vào nhau, tạo thành mặt xung quanh của một hình trụ (không có hai đáy). Tính chiều cao và diện tích xung quanh của hình trụ đó.`},
    {pts:.5,html:`Tính bán kính đáy của hình trụ (làm tròn đến hàng phần trăm của xăng-ti-mét) và thể tích của hình trụ (làm tròn đến hàng phần mười của xăng-ti-mét khối).`}],
    sol:[ptxt([[`Hai cạnh ${edge} ghép thành một đường sinh nên chiều cao hình trụ bằng cạnh ${edge}: h = ${h} cm; cạnh còn lại (${C} cm) trở thành chu vi đáy.`,.25],[`Mặt xung quanh chính là tờ giấy: S${sub('xq')} = ${a}·${b} = ${a*b} (cm²).`,.25]]),
      ptxt([[`Chu vi đáy 2πR = ${C} ⇒ R = ${fr(C,'2π')} ≈ ${fmt(rd9b(R))} cm.`,.25],[`V = πR²h = π·(${fr(C,'2π')})²·${h} = ${fr(C*C*h,'4π')} ≈ ${fmt(rd9a(V))} (cm³).`,.25]])],chk:()=>Math.abs(2*Math.PI*R-C)<1e-9&&Math.abs(Math.PI*R*R*h-V)<1e-6};
});

/* ---------- So sánh hai loại hộp bỏng ngô hình nón và hình trụ theo giá (Sơn La) ---------- */
TL9b('tl9-32-popcorn',10,'VD','real',[31,32],r=>{
  for(;;){const r1=r.pick([4,5,6,7]),h1=r.pick([15,18,20,24]),r2=r.pick([4,5,6]),h2=r.pick([10,12,15,18]),p1=r.pick([15,20,25,30]),p2=r.pick([30,40,45,50,60]);
    const V1=Math.PI*r1*r1*h1/3,V2=Math.PI*r2*r2*h2,L=p1/gcd(p1,p2)*p2;if(p1>=p2||L>300)continue;
    const n1=L/p1,n2=L/p2,T1=n1*V1,T2=n2*V2;if(Math.abs(T1-T2)/Math.max(T1,T2)<.1)continue;
    const best=T1>T2?'hình nón':'hình trụ';
    return{kind:'tl',title:'Hình nón, hình trụ trong thực tế',parts:[
      {pts:.5,html:`Một cửa hàng bán bỏng ngô đựng trong hai loại hộp: loại thứ nhất dạng hình nón có bán kính đáy ${r1} cm, chiều cao ${h1} cm, giá ${vnd9(p1*1000)} đồng/hộp; loại thứ hai dạng hình trụ có bán kính đáy ${r2} cm, chiều cao ${h2} cm, giá ${vnd9(p2*1000)} đồng/hộp (bỏng ngô được đựng đầy và vừa bằng miệng hộp). Tính thể tích mỗi loại hộp (làm tròn đến hàng đơn vị của xăng-ti-mét khối).`},
      {pts:.5,html:`Với cùng số tiền ${vnd9(L*1000)} đồng, mua loại hộp nào thì được nhiều bỏng ngô hơn? Vì sao?`}],
      sol:[ptxt([[`Hộp hình nón: V₁ = ${fr(1,3)}π·${r1}²·${h1} = ${fmt(r1*r1*h1/3)}π ≈ ${Math.round(V1)} (cm³).`,.25],[`Hộp hình trụ: V₂ = π·${r2}²·${h2} = ${r2*r2*h2}π ≈ ${Math.round(V2)} (cm³).`,.25]]),
        ptxt([[`Với ${vnd9(L*1000)} đồng mua được ${n1} hộp hình nón (${fmt(rd9a(n1*r1*r1*h1/3))}π ≈ ${Math.round(T1)} cm³) hoặc ${n2} hộp hình trụ (${n2*r2*r2*h2}π ≈ ${Math.round(T2)} cm³).`,.25],[`Vậy nên mua loại hộp ${best} để được nhiều bỏng ngô hơn.`,.25]])],
      chk:()=>n1*p1===L&&n2*p2===L&&(T1>T2)===(best==='hình nón')}}
});

/* ---------- Thả viên bi vào ly hình nón: mực nước dâng (Lào Cai) ---------- */
TL9b('tl9-32-cone',10,'VDC','real',[31,32],r=>{
  for(;;){const H=r.pick([12,15,16,18,20]),R=r.pick([4,5,6,7]),h1=r.int(Math.ceil(H*.4),Math.floor(H*.7)),rb=r.pick([1,1.5,2]);
    if(H===12&&R===5&&h1===6&&rb===1.5)continue;
    const V1=Math.PI*R*R*h1**3/(3*H*H),Vb=4/3*Math.PI*rb**3,h2=Math.cbrt(h1**3+4*H*H*rb**3/(R*R)),dh=h2-h1;
    const sina=R/Math.hypot(R,H),top=rb/sina+rb;if(h2>H-.5||top>h2-.2||dh<.15)continue;
    const r1=R*h1/H;
    return{kind:'tl',title:'Hình nón và hình cầu trong thực tế',parts:[
      {pts:.5,html:`Một chiếc ly có phần đựng nước dạng hình nón (đỉnh ở dưới, miệng ly là đáy hình nón) với chiều cao ${H} cm và bán kính miệng ly ${R} cm. Ban đầu mực nước trong ly cao ${h1} cm tính từ đỉnh nón. Tính thể tích nước trong ly (bỏ qua độ dày của ly; làm tròn đến hàng phần mười của xăng-ti-mét khối).`},
      {pts:.5,html:`Người ta thả vào ly một viên bi hình cầu đặc có bán kính ${fmt(rb)} cm; viên bi chìm hoàn toàn trong nước và nước không tràn ra ngoài. Hỏi mực nước dâng thêm bao nhiêu xăng-ti-mét (làm tròn đến hàng phần trăm)?`}],
      sol:[ptxt([[`Mặt nước là hình tròn có bán kính r₁ = ${fr(`${R}·${h1}`,H)} = ${qh(Q(R*h1,H))} (cm) (theo tam giác đồng dạng).`,.25],[`V₁ = ${fr(1,3)}πr₁²h₁ = ${fr(`π·${R}²·${h1}³`,`3·${H}²`)} ≈ ${fmt(rd9a(V1))} (cm³).`,.25]]),
        ptxt([[`Thể tích viên bi V${sub('b')} = ${fr(4,3)}π·${fmt(rb)}³; khi nước cao h thì thể tích nước và bi là ${fr(`π·${R}²·h³`,`3·${H}²`)}. Ta có ${fr(`π·${R}²·h³`,`3·${H}²`)} = V₁ + V${sub('b')} ⇒ h³ = ${h1}³ + ${fr(`4·${H}²·${fmt(rb)}³`,`${R}²`)} ⇒ h ≈ ${fmt(rd9b(h2))} cm.`,.25],[`Mực nước dâng thêm khoảng ${fmt(rd9b(dh))} cm.`,.25]])],
      chk:()=>Math.abs(Math.PI*R*R*h2**3/(3*H*H)-V1-Vb)<1e-6&&h2<H}}
});

/* ---------- So sánh hai gói cước: hàm số bậc nhất và bất phương trình (Hải Phòng) ---------- */
TL9('tl9-6-plan',2,'VD','real',[6],r=>{
  for(;;){const a0=r.int(8,15)*10,c1=r.int(1,3),b0=r.int(3,7)*10,c2=c1+r.int(1,3);if(b0>=a0)continue;const k=(a0-b0)/(c2-c1);if(!isInt(k)||k<10||k>90)continue;
    const x0=r.pick([Math.round(k/2),k+r.int(5,20)]),yA=a0+c1*x0,yB=b0+c2*x0;if(yA===yB)continue;
    const sv=r.pick(['dữ liệu Internet (GB)','điện năng tiêu thụ (số điện)']),u=sv.includes('GB')?'GB':'số điện';
    const ctx=u==='GB'?`Một nhà mạng có hai gói cước Internet: gói A có phí cố định ${a0} nghìn đồng mỗi tháng và mỗi GB dữ liệu sử dụng phải trả thêm ${c1} nghìn đồng; gói B có phí cố định ${b0} nghìn đồng mỗi tháng và mỗi GB phải trả thêm ${c2} nghìn đồng.`
      :`Một khu nhà trọ đưa ra hai cách tính tiền điện: cách A thu ${a0} nghìn đồng tiền dịch vụ mỗi tháng và ${c1} nghìn đồng cho mỗi số điện; cách B thu ${b0} nghìn đồng tiền dịch vụ mỗi tháng và ${c2} nghìn đồng cho mỗi số điện.`;
    const A=u==='GB'?'gói A':'cách A',B=u==='GB'?'gói B':'cách B';
    return{kind:'tl',title:'Hàm số bậc nhất và bất phương trình trong thực tế',parts:[
      {pts:.5,html:`${ctx} Gọi ${I('x')} (${u}, ${I('x')} ≥ 0) là lượng sử dụng trong một tháng. Viết công thức tính số tiền ${I('y')}${sub('A')}, ${I('y')}${sub('B')} (nghìn đồng) phải trả trong tháng theo ${A}, ${B}. Nếu dùng ${x0} ${u} thì nên chọn ${A} hay ${B}?`},
      {pts:.5,html:`Mỗi tháng phải dùng bao nhiêu ${u} thì chọn ${A} có lợi hơn ${B}?`}],
      sol:[ptxt([[`${I('y')}${sub('A')} = ${a0} + ${c1===1?'':c1}x; ${I('y')}${sub('B')} = ${b0} + ${c2}x (nghìn đồng).`,.25],[`Với x = ${x0}: ${I('y')}${sub('A')} = ${yA}, ${I('y')}${sub('B')} = ${yB} nên chọn ${yA<yB?A:B} (rẻ hơn ${Math.abs(yA-yB)} nghìn đồng).`,.25]]),
        ptxt([[`${A} có lợi hơn khi ${a0} + ${c1===1?'':c1}x < ${b0} + ${c2}x ⟺ ${c2-c1===1?'':c2-c1}x > ${a0-b0}.`,.25],[`⟺ x > ${k}. Vậy khi dùng nhiều hơn ${k} ${u} mỗi tháng thì chọn ${A} có lợi hơn.`,.25]])],
      chk:()=>a0+c1*k===b0+c2*k&&(a0+c1*(k+1)<b0+c2*(k+1))}}
});

/* ---------- Lập hệ phương trình: pha trộn hai loại theo tỉ lệ phần trăm (Bắc Ninh) ---------- */
TL9('tl9-3-mix',1,'VD','real',[3],r=>{
  for(;;){const sc=r.int(0,1),p1=sc?r.pick([2,3,4]):r.pick([3,4]),p2=p1+r.pick([1,2,3]),x=r.int(2,9),y=r.int(2,9),T=x+y,num=p1*x+p2*y;if(x===y)continue;
    const p=num/T;if(!isInt(p*100))continue;
    const txt=sc?`Một người có hai loại dung dịch nước muối: loại thứ nhất chứa ${p1}% muối, loại thứ hai chứa ${p2}% muối. Người đó trộn hai loại với nhau để được ${T} lít dung dịch chứa ${fmt(p)}% muối.`
      :`Bạn Lan có hai loại sữa: loại thứ nhất có tỉ lệ chất béo ${p1}%, loại thứ hai có tỉ lệ chất béo ${p2}%. Lan trộn hai loại với nhau được ${T} lít sữa có tỉ lệ chất béo ${fmt(p)}%.`;
    const what=sc?'dung dịch':'sữa';
    return{kind:'tl',title:'Giải bài toán bằng cách lập hệ phương trình',parts:[
      {pts:.5,html:`${txt} Gọi ${I('x')}, ${I('y')} (lít) lần lượt là số lít ${what} loại thứ nhất, loại thứ hai đã dùng. Lập hệ phương trình biểu thị các dữ kiện trên.`},
      {pts:.5,html:`Giải hệ phương trình và cho biết đã dùng bao nhiêu lít ${what} mỗi loại.`}],
      sol:[ptxt([[`Điều kiện 0 < x, y < ${T}. Tổng thể tích: x + y = ${T}.`,.25],[`Lượng ${sc?'muối':'chất béo'}: ${p1}%x + ${p2}%y = ${fmt(p)}%·${T} ⟺ ${p1}x + ${p2}y = ${num}.`,.25]]),
        ptxt([[`Từ x + y = ${T} ⇒ x = ${T} − y; thay vào: ${p1}(${T} − y) + ${p2}y = ${num} ⟺ ${p2-p1===1?'':p2-p1}y = ${num-p1*T} ⟺ y = ${y}.`,.25],[`x = ${x} (thoả mãn). Vậy đã dùng ${x} lít ${what} loại thứ nhất và ${y} lít ${what} loại thứ hai.`,.25]])],
      chk:()=>x+y===T&&p1*x+p2*y===num&&(p2-p1)*y===num-p1*T}}
});

/* ---------- Đọc biểu đồ hình quạt tròn và tính xác suất (Thái Nguyên, Hải Phòng) ---------- */
const PIE9=[
  {what:'nhóm máu',who:'người',names:['Nhóm O','Nhóm A','Nhóm B','Nhóm AB'],lab:'nhóm máu'},
  {what:'loại trái cây yêu thích nhất',who:'học sinh khối 9',names:['Xoài','Cam','Táo','Ổi'],lab:'loại trái cây'},
  {what:'phương tiện đến trường',who:'học sinh',names:['Xe đạp','Xe buýt','Đi bộ','Bố mẹ đưa'],lab:'phương tiện'},
  {what:'môn thể thao yêu thích nhất',who:'học sinh',names:['Bóng đá','Cầu lông','Bơi','Bóng rổ'],lab:'môn thể thao'}];
TL9b('tl9-23-pie',7,'TH','stat',[23,25],r=>{
  for(;;){const C=r.pick(PIE9),N=r.pick([120,160,200,240,300,400,500]);
    const a=r.int(6,10)*5,b=r.int(3,6)*5,c=r.int(2,4)*5,d=100-a-b-c;if(d<5||new Set([a,b,c,d]).size<4)continue;
    const pc=r.shuffle([a,b,c,d]),ns=pc.map(v=>N*v/100);if(!ns.every(isInt))continue;
    const im=pc.indexOf(Math.max(...pc)),[i,j]=r.shuffle([0,1,2,3]).filter(t=>t!==im).slice(0,2),pr=Q(pc[i]+pc[j],100);
    return{kind:'tl',title:'Biểu đồ hình quạt tròn và xác suất',parts:[
      {pts:.5,html:`Khảo sát ${C.what} của ${N} ${C.who}, kết quả được biểu diễn bởi biểu đồ tần số tương đối dạng hình quạt tròn sau:<div class="figure">${pieSVG(C.names.map((n,k)=>({name:n,pct:pc[k]})))}</div>Trong những người được khảo sát, ${C.lab} nào phổ biến nhất? ${C.lab[0].toUpperCase()+C.lab.slice(1)} đó có bao nhiêu người?`},
      {pts:.5,html:`Chọn ngẫu nhiên một người trong số ${N} người được khảo sát. Tính xác suất để người đó thuộc nhóm “${C.names[i]}” hoặc nhóm “${C.names[j]}”.`}],
      sol:[ptxt([[`Tần số tương đối lớn nhất là ${pc[im]}%, ứng với “${C.names[im]}”.`,.25],[`Số người: ${pc[im]}%·${N} = ${ns[im]} (người).`,.25]]),
        ptxt([[`Có ${ns[i]} + ${ns[j]} = ${ns[i]+ns[j]} kết quả thuận lợi trong ${N} kết quả đồng khả năng.`,.25],[`Xác suất cần tìm là ${fr(ns[i]+ns[j],N)} = ${qh(pr)}.`,.25]])],
      chk:()=>pc.reduce((s,v)=>s+v,0)===100&&ns.reduce((s,v)=>s+v,0)===N}}
});
