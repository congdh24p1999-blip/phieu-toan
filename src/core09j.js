/* ================================================================
   Toán 9: dạng tự luận bổ sung sau khi đối chiếu 21 đề tuyển sinh vào lớp 10 năm 2026
   (Hà Nội, TP.HCM, Đà Nẵng, Đồng Nai, Cần Thơ, Khánh Hòa, Hải Phòng, Tây Ninh, Hà Tĩnh, Huế,
   Gia Lai, Thanh Hóa, Quảng Ninh, Quảng Trị, Phú Thọ, Nghệ An, Đắk Lắk, Bắc Ninh, Hưng Yên,
   Ninh Bình, Đồng Tháp). Mỗi dạng ứng với một kiểu câu hỏi lặp lại ở nhiều đề; câu chữ và
   số liệu do Xưởng đề Toán tự tạo, không chép từ đề nào.
   ================================================================ */
const sgf9=v=>v<0?MINUS+fmt(-v):fmt(v);
const vnd9=n=>n.toLocaleString('vi-VN');

/* ---------- Biểu thức chứa căn: rút gọn rồi tìm x để A < 1 hoặc A nguyên (HN, Gia Lai, Đồng Nai) ---------- */
TL9('tl9-9-ineq',3,'VD','rad',[9],r=>{
  for(;;){const a=r.int(1,4),b=r.int(1,4),s=a+b,ask=r.chance(.5),sx=rt(I('x'));
    const ds=[];for(let d=1;d<=s;d++)if(s%d===0)ds.push(d,-d);
    const ts=[...new Set(ds.map(d=>b+d).filter(t=>t>=0&&t!==b))].sort((u,v)=>u-v),xs=ts.map(t=>t*t);
    if(!ask&&!xs.length)continue;
    const H=fr(`${I('x')} + ${s}${sx} + ${a*b}`,`${I('x')} ${MINUS} ${b*b}`),P=fr(`${sx} + ${a}`,`${sx} ${MINUS} ${b}`),K=fr(s,`${sx} ${MINUS} ${b}`);
    return{kind:'tl',title:'Biểu thức chứa căn và bài toán liên quan',parts:[
      {pts:.5,html:`Cho biểu thức ${I('A')} = ${H} với ${I('x')} ≥ 0, ${I('x')} ≠ ${b*b}. Rút gọn ${I('A')}.`},
      {pts:.5,html:ask?`Tìm ${I('x')} để ${I('A')} < 1.`:`Tìm các số nguyên ${I('x')} để ${I('A')} nhận giá trị nguyên.`}],
      sol:[ptxt([[`x + ${s}√x + ${a*b} = (√x + ${a})(√x + ${b}); x − ${b*b} = (√x − ${b})(√x + ${b}).`,.25],[`A = ${P}.`,.25]]),
        ask?ptxt([[`A − 1 = ${K} < 0 ⟺ √x − ${b} < 0 (vì ${s} > 0).`,.25],[`⟺ √x < ${b} ⟺ 0 ≤ x < ${b*b}. Vậy 0 ≤ x < ${b*b}.`,.25]])
           :ptxt([[`A = 1 + ${K}. Nếu x nguyên mà không là số chính phương thì √x là số vô tỉ, A không nguyên; vậy √x nguyên và √x − ${b} là ước của ${s}.`,.25],[`√x − ${b} ∈ {${ds.map(sg).join('; ')}}, √x ≥ 0 ⇒ √x ∈ {${ts.join('; ')}} ⇒ x ∈ {${xs.join('; ')}}.`,.25]])],
      chk:()=>{const t=7,v1=(t*t+s*t+a*b)/(t*t-b*b),v2=(t+a)/(t-b);return Math.abs(v1-v2)<1e-9&&xs.every(x=>{const u=Math.sqrt(x);return Number.isInteger((u+a)/(u-b))})}}}
});

/* ---------- Hàm số y = ax²: vẽ đồ thị và tìm điểm (TP.HCM, Tây Ninh, Đồng Nai, Đà Nẵng) ---------- */
TL9b('tl9-18-graph',6,'TH','alg',[18],r=>{
  const [n,d]=r.pick([[1,1],[-1,1],[2,1],[-2,1],[1,2],[-1,2]]),A=n/d,xs=[-2,-1,0,1,2],ys=xs.map(x=>A*x*x),mode=r.int(0,1);
  const tb=tableHTML([I('x'),...xs.map(sg)],[[I('y')+' = '+axH([n,d]),...ys.map(sgf9)]]);
  const g=graphSVG(x=>A*x*x,{x:[-2.7,2.7],y:A>0?[-.8,A*4+.8]:[A*4-.8,.8],marks:xs.filter(x=>x).map((x,i)=>[x,A*x*x]),w:190,h:190});
  let q,s1,s2;
  if(mode===0){const k=d===2?2*r.int(1,2):r.int(1,3),c=A*k*k;q=`Tìm các điểm thuộc (${I('P')}) có tung độ bằng ${sgf9(c)}.`;s1=`${axH([n,d])} = ${sgf9(c)} ⟺ x² = ${k*k} ⟺ x = ${k} hoặc x = −${k}.`;s2=`Các điểm cần tìm: (${k}; ${sgf9(c)}) và (−${k}; ${sgf9(c)}).`}
  else{const t=d===2?2*r.nz(-2,2):r.nz(-3,3),m=A*t;q=`Tìm các điểm thuộc (${I('P')}) có tung độ bằng ${m===1?'':m===-1?MINUS:sgf9(m)} lần hoành độ.`;s1=`Điểm (x; y) thuộc (P) với y = ${sgf9(m)}x: ${sgf9(A)}x² = ${sgf9(m)}x ⟺ x(x − ${t<0?'('+sg(t)+')':t}) = 0 ⟺ x = 0 hoặc x = ${sg(t)}.`;s2=`Các điểm cần tìm: O(0; 0) và (${sg(t)}; ${sgf9(A*t*t)}).`}
  return{kind:'tl',title:'Hàm số y = ax² (a ≠ 0)',parts:[{pts:.5,html:`Vẽ đồ thị (${I('P')}) của hàm số ${yax([n,d])}.`},{pts:.5,html:q}],
    sol:[ptxt([[`Bảng giá trị:<div class="figure">${tb}</div>`,.25],[`Đồ thị (P) là parabol đỉnh O, nhận Oy làm trục đối xứng, nằm phía ${A>0?'trên':'dưới'} trục hoành:<div class="figure">${g}</div>`,.25]]),ptxt([[s1,.25],[s2,.25]])],chk:()=>ys[2]===0};
});

/* ---------- Parabol trong thực tế: cổng vòm (Đắk Lắk) ---------- */
TL9b('tl9-18-arch',6,'VD','real',[18],r=>{
  for(;;){const [d,h]=r.pick([[4,8],[5,5],[6,9],[4,4],[3,9],[6,12],[5,10],[10,25],[8,16],[4,12]]),w=r.pick([2,2.4,3,3.2]);if(w>=1.6*d)continue;
    const cl=h-h*(w/2)**2/(d*d),hx=Math.round((cl+r.pick([-.6,-.4,-.3,.3,.4,.6]))*10)/10,ok=hx<cl;if(hx<=1.5)continue;
    const a=Q(-h,d*d),g=graphSVG(x=>-h*x*x/(d*d),{x:[-d-1,d+1],y:[-h-1,1],marks:[[-d,-h],[d,-h]],w:200,h:170});
    return{kind:'tl',title:'Ứng dụng hàm số y = ax²',parts:[
      {pts:.5,html:`Một chiếc cổng có dạng parabol, khoảng cách giữa hai chân cổng là ${2*d} m, chiều cao của cổng là ${h} m. Chọn hệ trục toạ độ ${I('Oxy')} sao cho đỉnh cổng là gốc toạ độ ${I('O')}, trục ${I('Oy')} là trục đối xứng của cổng; khi đó cổng là một phần đồ thị hàm số ${I('y')} = ${I('a')}${I('x')}${sup(2)} và hai chân cổng có toạ độ (${MINUS}${d}; ${MINUS}${h}), (${d}; ${MINUS}${h}).${g}Tìm hệ số ${I('a')}.`},
      {pts:.5,html:`Một xe tải có thùng xe dạng hình hộp chữ nhật, rộng ${fmt(w)} m, cao ${fmt(hx)} m (tính từ mặt đất) đi chính giữa cổng. Hỏi xe tải có đi qua cổng được không?`}],
      sol:[ptxt([[`Điểm (${d}; −${h}) thuộc đồ thị nên −${h} = a·${d}².`,.25],[`a = ${qh(a)}; hàm số y = ${qh(a)}x².`,.25]]),
        ptxt([[`Mép trên thùng xe cách trục đối xứng ${fmt(w/2)} m. Với x = ${fmt(w/2)}: y = ${qh(a)}·${fmt(w/2)}² = −${fmt(Math.round(h*(w/2)**2/(d*d)*1000)/1000)}, tức cổng tại đó cao ${h} − ${fmt(Math.round(h*(w/2)**2/(d*d)*1000)/1000)} ≈ ${fmt(Math.round(cl*100)/100)} m so với mặt đất.`,.25],[`${fmt(hx)} ${ok?'<':'>'} ${fmt(Math.round(cl*100)/100)} nên xe tải ${ok?'đi qua được':'không đi qua được'} cổng.`,.25]])],chk:()=>Math.abs(hx-cl)>=.2}}
});

/* ---------- Viète với căn thức (Nghệ An, Huế, Quảng Ninh) ---------- */
TL9b('tl9-20-sqrt',6,'VD','alg',[20],r=>{
  for(;;){const p=r.int(1,4),k=r.int(2,6),S=k*k-2*p,P=p*p,ask=r.chance(.5);if(S<=2*p)continue;
    return{kind:'tl',title:'Định lí Viète và biểu thức chứa căn',parts:[
      {pts:.5,html:`Cho phương trình ${eqQ(1,-S,P)}. Chứng minh phương trình có hai nghiệm dương phân biệt ${x12(1)}, ${x12(2)}.`},
      {pts:.5,html:`Không giải phương trình, tính giá trị của biểu thức ${ask?`${I('T')} = ${rt(x12(1))} + ${rt(x12(2))}`:`${I('T')} = ${x12(1)}${rt(x12(2))} + ${x12(2)}${rt(x12(1))}`}.`}],
      sol:[ptxt([[`Δ = ${S}² − 4·${P} = ${S*S-4*P} > 0 nên phương trình có hai nghiệm phân biệt.`,.25],[`Viète: x₁ + x₂ = ${S} > 0, x₁x₂ = ${P} > 0 nên hai nghiệm cùng dương.`,.25]]),
        ptxt([[`(√x₁ + √x₂)² = x₁ + x₂ + 2√(x₁x₂) = ${S} + 2·${p} = ${k*k}; vì √x₁ + √x₂ > 0 nên √x₁ + √x₂ = ${k}.`,.25],[ask?`Vậy T = ${k}.`:`T = √(x₁x₂)(√x₁ + √x₂) = ${p}·${k} = ${p*k}.`,.25]])],
      chk:()=>{const D=Math.sqrt(S*S-4*P),x1=(S+D)/2,x2=(S-D)/2;return x2>0&&Math.abs(Math.sqrt(x1)+Math.sqrt(x2)-k)<1e-9}}}
});

/* ---------- Lập hệ phương trình: vay vốn hai ngân hàng / vốn nhập hai loại hàng (Thanh Hóa) ---------- */
TL9('tl9-3-bank',1,'VD','real',[3],r=>{
  for(;;){const u=r.int(2,12)*10,v=r.int(2,12)*10,[r1,r2]=r.shuffle([5,6,7,8,9,10,12]).slice(0,2),T=u+v,Lc=r1*u+r2*v,L=Lc/100;if(u===v||Lc%10)continue;
    const sc=r.int(0,1),txt=sc?`Một cửa hàng dùng ${T} triệu đồng để nhập hai loại hàng. Khi bán hết, loại hàng thứ nhất lãi ${r1}%, loại hàng thứ hai lãi ${r2}% so với vốn nhập; tổng tiền lãi thu được là ${fmt(L)} triệu đồng.`
      :`Một người vay tổng cộng ${T} triệu đồng ở hai ngân hàng. Ngân hàng thứ nhất tính lãi suất ${r1}%/năm, ngân hàng thứ hai tính lãi suất ${r2}%/năm. Sau một năm, tổng số tiền lãi người đó phải trả là ${fmt(L)} triệu đồng.`;
    const who=sc?'số vốn nhập loại hàng thứ nhất, loại hàng thứ hai':'số tiền vay ở ngân hàng thứ nhất, ngân hàng thứ hai';
    return{kind:'tl',title:'Giải bài toán bằng cách lập hệ phương trình',parts:[
      {pts:.5,html:`${txt} Gọi ${I('x')}, ${I('y')} (triệu đồng) lần lượt là ${who}. Lập hệ phương trình biểu thị các dữ kiện trên.`},
      {pts:.5,html:`Giải hệ phương trình và trả lời bài toán.`}],
      sol:[ptxt([[`Điều kiện 0 < x, y < ${T}. Tổng số tiền: x + y = ${T}.`,.25],[`Tổng tiền lãi: ${fr(r1,100)}x + ${fr(r2,100)}y = ${fmt(L)} ⟺ ${r1}x + ${r2}y = ${Lc}.`,.25]]),
        ptxt([[`Từ x + y = ${T} ⇒ y = ${T} − x; thay vào: ${r1}x + ${r2}(${T} − x) = ${Lc} ⟺ ${sg(r1-r2)}x = ${sg(Lc-r2*T)} ⟺ x = ${u}.`,.25],[`y = ${v} (thoả mãn). Vậy ${who.replace('số vốn nhập loại hàng thứ nhất, loại hàng thứ hai','số vốn nhập hai loại hàng').replace('số tiền vay ở ngân hàng thứ nhất, ngân hàng thứ hai','số tiền vay ở hai ngân hàng')} lần lượt là ${u} triệu đồng và ${v} triệu đồng.`,.25]])],
      chk:()=>(r1-r2)*u===Lc-r2*T&&u+v===T}}
});

/* ---------- Lập phương trình: chia đều chi phí, thêm người (Đồng Nai, Huế) ---------- */
TL9b('tl9-21-trip',6,'VD','real',[21],r=>{
  for(;;){const x=r.int(20,40),k=r.int(2,5),d=r.pick([10,15,20,25,30,40,50]),C=d*x*(x+k)/k;if(!isInt(C)||C%100)continue;
    const m=vnd9(C*1000);
    return{kind:'tl',title:'Giải bài toán bằng cách lập phương trình',parts:[
      {pts:.5,html:`Một nhóm học sinh thuê xe đi tham quan với chi phí ${m} đồng, chia đều cho mỗi bạn. Đến ngày đi có thêm ${k} bạn cùng tham gia nên mỗi bạn phải trả ít hơn dự định ${vnd9(d*1000)} đồng. Gọi ${I('x')} là số học sinh lúc đầu của nhóm. Biểu thị theo ${I('x')} số tiền mỗi bạn phải trả theo dự định và số tiền mỗi bạn phải trả thực tế.`},
      {pts:.5,html:`Hỏi lúc đầu nhóm có bao nhiêu học sinh?`}],
      sol:[ptxt([[`Điều kiện x ∈ ℕ*. Theo dự định mỗi bạn trả ${fr(C,I('x'))} (nghìn đồng).`,.25],[`Thực tế có x + ${k} bạn, mỗi bạn trả ${fr(C,`${I('x')} + ${k}`)} (nghìn đồng).`,.25]]),
        ptxt([[`Ta có ${fr(C,I('x'))} − ${fr(C,`${I('x')} + ${k}`)} = ${d} ⟺ ${C}·${k} = ${d}x(x + ${k}) ⟺ x² + ${k}x − ${x*(x+k)} = 0.`,.25],[`Δ = ${k}² + 4·${x*(x+k)} = ${(2*x+k)**2}; x = ${x} (nhận) hoặc x = −${x+k} (loại). Vậy lúc đầu nhóm có ${x} học sinh.`,.25]])],
      chk:()=>Math.abs(C/x-C/(x+k)-d)<1e-9}}
});

/* ---------- Hình trụ trong thực tế: múc nước đầy bể (Hà Nội) ---------- */
TL9b('tl9-31-bucket',10,'VD','real',[31],r=>{
  for(;;){const R=r.pick([1,1.2,1.5]),h=r.pick([2,2.5,3]),V=r.pick([150,200,250,300]),p=r.pick([80,90]);
    const vb=Math.PI*R*R*h,vs=vb*p/100,n=Math.ceil(V/vs),fp=V/vs-Math.floor(V/vs);if(fp<.08||fp>.92)continue;
    return{kind:'tl',title:'Hình trụ trong thực tế',parts:[
      {pts:.5,html:`Một chiếc xô dạng hình trụ có bán kính đáy ${fmt(R)} dm và chiều cao ${fmt(h)} dm.${fig9Cyl(R,h,{r:fmt(R)+' dm',h:fmt(h)+' dm'})}Tính thể tích của xô (làm tròn đến hàng phần mười của đề-xi-mét khối).`},
      {pts:.5,html:`Mỗi lần múc, xô chỉ chứa được khoảng ${p}% thể tích của xô. Cần múc ít nhất bao nhiêu lần để đổ đầy một bể chứa ${V} lít nước?`}],
      sol:[ptxt([[`V = πr²h = π·${fmt(R)}²·${fmt(h)}.`,.25],[`V ≈ ${fmt(rd9a(vb))} dm³.`,.25]]),
        ptxt([[`Mỗi lần múc được khoảng ${p}%·${fmt(rd9b(vb))} ≈ ${fmt(rd9b(vs))} dm³ = ${fmt(rd9b(vs))} lít (1 dm³ = 1 lít).`,.25],[`${V} : ${fmt(rd9b(vs))} ≈ ${fmt(rd9b(V/vs))} nên cần múc ít nhất ${n} lần.`,.25]])],chk:()=>n>1}}
});

/* ---------- Hình trụ rỗng: ống cống bê tông (Đà Nẵng) ---------- */
TL9b('tl9-31-pipe',10,'TH','real',[31],r=>{
  const D=r.pick([.8,1,1.2,1.5]),t=r.pick([.08,.1,.12]),h=r.pick([1,1.5,2]),N=r.pick([10,20,50]),R=D/2,r0=Math.round((R-t)*100)/100;
  const V=3.14*h*(R*R-r0*r0);
  return{kind:'tl',title:'Hình trụ trong thực tế',parts:[
    {pts:.5,html:`Một ống cống thoát nước bằng bê tông có dạng hình trụ rỗng, dài ${fmt(h)} m, đường kính ngoài ${fmt(D)} m, thành ống dày ${fmt(t)} m. Tính thể tích bê tông dùng để làm một ống cống (lấy π ≈ 3,14; làm tròn đến hàng phần nghìn của mét khối).`},
    {pts:.5,html:`Cần bao nhiêu mét khối bê tông để đúc ${N} ống cống như vậy (làm tròn đến hàng phần mười)?`}],
    sol:[ptxt([[`Bán kính ngoài R = ${fmt(R)} m, bán kính trong r = ${fmt(R)} − ${fmt(t)} = ${fmt(r0)} m.`,.25],[`V = πh(R² − r²) ≈ 3,14·${fmt(h)}·(${fmt(R)}² − ${fmt(r0)}²) ≈ ${fmt(Math.round(V*1000)/1000)} m³.`,.25]]),
      ptxt([[`${N} ống cần ${N}·${fmt(Math.round(V*1000)/1000)}.`,.25],[`≈ ${fmt(Math.round(V*N*10)/10)} m³ bê tông.`,.25]])],chk:()=>r0>0&&V>0};
});

/* ---------- Thả bi vào cốc nước: mực nước dâng (Phú Thọ, Thanh Hóa) ---------- */
TL9b('tl9-32-rise',10,'VD','real',[31,32],r=>{
  for(;;){const R=r.pick([3,4,5]),h0=r.pick([6,8,10]),H=h0+r.pick([2,3,4]),n=r.int(3,8),rb=r.pick([1,1.5,2]);
    const Vb=n*4/3*Math.PI*rb**3,dh=Vb/(Math.PI*R*R),hn=h0+dh;if(Math.abs(hn-H)<.3||dh<.3)continue;const over=hn>H;
    return{kind:'tl',title:'Hình trụ và hình cầu trong thực tế',parts:[
      {pts:.5,html:`Một chiếc cốc dạng hình trụ có bán kính đáy ${R} cm, chiều cao ${H} cm, đang chứa nước cao ${h0} cm. Người ta thả vào cốc ${n} viên bi hình cầu cùng bán kính ${fmt(rb)} cm, các viên bi chìm hoàn toàn trong nước. Tính tổng thể tích ${n} viên bi (làm tròn đến hàng phần mười của xăng-ti-mét khối).`},
      {pts:.5,html:`Nếu cốc đủ cao thì mực nước dâng thêm bao nhiêu xăng-ti-mét (làm tròn đến hàng phần trăm)? Nước trong cốc có bị tràn ra ngoài không?`}],
      sol:[ptxt([[`Thể tích một viên bi: ${fr(4,3)}π·${fmt(rb)}³.`,.25],[`Tổng thể tích ${n} viên bi: V = ${n}·${fr(4,3)}π·${fmt(rb)}³ ≈ ${fmt(rd9a(Vb))} cm³.`,.25]]),
        ptxt([[`Mực nước dâng thêm Δh = V : (π·${R}²) = ${fr(`4·${n}·${fmt(rb)}³`,`3·${R}²`)} ≈ ${fmt(rd9b(dh))} cm.`,.25],[`Mực nước mới ≈ ${h0} + ${fmt(rd9b(dh))} = ${fmt(rd9b(hn))} cm ${over?'>':'<'} ${H} cm nên nước ${over?'bị tràn ra ngoài':'không bị tràn ra ngoài'}.`,.25]])],chk:()=>dh>0}}
});

/* ---------- Tỉ số lượng giác trong thực tế: thang, máy bay, hải đăng, cây gãy (Tây Ninh, Đồng Nai, Đắk Lắk, Hưng Yên) ---------- */
TL9('tl9-12-scene',4,'TH','real',[12],r=>{
  const R=Math.PI/180,sc=r.int(0,3),f1=v=>fmt(rd9a(v)),f2=v=>fmt(rd9b(v));
  if(sc===0){const L=r.pick([4,5,6,8]),a=r.pick([65,70,75]);
    return{kind:'tl',title:'Ứng dụng tỉ số lượng giác',parts:[{pts:.5,html:`Một chiếc thang dài ${L} m dựa vào một bức tường thẳng đứng. Để an toàn, thang phải tạo với mặt đất một góc ${a}°. Khi đó chân thang cách chân tường bao nhiêu mét (làm tròn đến hàng phần mười)?`},{pts:.5,html:`Đầu thang chạm tường ở độ cao bao nhiêu mét so với mặt đất (làm tròn đến hàng phần mười)?`}],
      sol:[ptxt([[`Thang, tường và mặt đất tạo thành tam giác vuông với cạnh huyền ${L} m, góc giữa thang và mặt đất ${a}°.`,.25],[`Khoảng cách từ chân thang đến tường: ${L}·cos ${a}° ≈ ${f1(L*Math.cos(a*R))} m.`,.25]]),ptxt([[`Độ cao đầu thang: ${L}·sin ${a}°.`,.25],[`≈ ${f1(L*Math.sin(a*R))} m.`,.25]])],chk:()=>true}}
  if(sc===1){const a=r.pick([10,12,15,20]),d=r.pick([2,3,5]),Hm=r.pick([1500,2000,2500,3000]);
    return{kind:'tl',title:'Ứng dụng tỉ số lượng giác',parts:[{pts:.5,html:`Một máy bay cất cánh theo phương tạo với phương nằm ngang một góc ${a}°. Sau khi bay được ${d} km theo phương đó, máy bay ở độ cao bao nhiêu mét (làm tròn đến hàng đơn vị)?`},{pts:.5,html:`Để đạt độ cao ${vnd9(Hm)} m, máy bay phải bay theo phương đó một quãng đường bao nhiêu ki-lô-mét (làm tròn đến hàng phần trăm)?`}],
      sol:[ptxt([[`Độ cao h = ${d}·sin ${a}° (km).`,.25],[`h ≈ ${vnd9(Math.round(d*1000*Math.sin(a*R)))} m.`,.25]]),ptxt([[`Quãng đường s thoả mãn s·sin ${a}° = ${fmt(Hm/1000)} (km).`,.25],[`s = ${fmt(Hm/1000)} : sin ${a}° ≈ ${f2(Hm/1000/Math.sin(a*R))} km.`,.25]])],chk:()=>true}}
  if(sc===2){const h=r.pick([30,40,45,50]),a=r.pick([30,35,40]),b=a-r.pick([6,8,10]),d1=h/Math.tan(a*R),d2=h/Math.tan(b*R);
    return{kind:'tl',title:'Ứng dụng tỉ số lượng giác',parts:[{pts:.5,html:`Từ đỉnh một ngọn hải đăng cao ${h} m so với mặt nước biển, người ta nhìn thấy một chiếc thuyền với góc nhìn xuống (so với phương nằm ngang) là ${a}°. Tính khoảng cách từ thuyền đến chân hải đăng (làm tròn đến hàng phần mười của mét).`},{pts:.5,html:`Thuyền đi thẳng ra xa hải đăng; sau một thời gian, góc nhìn xuống chỉ còn ${b}°. Thuyền đã đi thêm được bao nhiêu mét (làm tròn đến hàng phần mười)?`}],
      sol:[ptxt([[`Góc nhìn xuống bằng góc tạo bởi tia nhìn và mặt nước (so le trong), nên d₁ = ${h} : tan ${a}°.`,.25],[`d₁ ≈ ${f1(d1)} m.`,.25]]),ptxt([[`Lúc sau d₂ = ${h} : tan ${b}° ≈ ${f1(d2)} m.`,.25],[`Thuyền đi thêm khoảng ${f1(d2)} − ${f1(d1)} ≈ ${f1(d2-d1)} m.`,.25]])],chk:()=>d2>d1}}
  const d=r.pick([3,4,5,6]),a=r.pick([30,35,40,45]),h1=d*Math.tan(a*R),h2=d/Math.cos(a*R);
  return{kind:'tl',title:'Ứng dụng tỉ số lượng giác',parts:[{pts:.5,html:`Một cây bị gió bão làm gãy; phần ngọn đổ xuống chạm mặt đất tại điểm cách gốc cây ${d} m và tạo với mặt đất một góc ${a}° (phần thân còn lại vẫn đứng thẳng). Tính chiều cao phần thân cây còn đứng (làm tròn đến hàng phần trăm của mét).`},{pts:.5,html:`Tính chiều cao của cây lúc chưa bị gãy (làm tròn đến hàng phần trăm của mét).`}],
    sol:[ptxt([[`Thân cây còn đứng, mặt đất và phần ngọn tạo thành tam giác vuông; phần thân còn đứng là cạnh đối diện góc ${a}°.`,.25],[`h₁ = ${d}·tan ${a}° ≈ ${f2(h1)} m.`,.25]]),ptxt([[`Phần ngọn bị gãy dài ${d} : cos ${a}° ≈ ${f2(h2)} m.`,.25],[`Chiều cao ban đầu ≈ ${f2(h1)} + ${f2(h2)} = ${f2(rd9b(h1)+rd9b(h2))} m.`,.25]])],chk:()=>true};
});

/* ---------- Bảng tần số ghép nhóm cho sẵn (Hà Nội, Nghệ An, Đồng Nai, Huế, Đắk Lắk) ---------- */
TL9b('tl9-24-read',7,'TH','stat',[24],r=>{
  const g=r.pick(GRP9),N=r.pick([20,25,40,50]),ns=nsOf(r,g.k,N),i=r.int(0,g.k-1),j=r.int(1,g.k-1),up=r.chance(.5);
  const sel=up?ns.slice(j):ns.slice(0,j),c=sel.reduce((s,v)=>s+v,0),mk=g.lo+g.w*j;
  return{kind:'tl',title:'Bảng tần số ghép nhóm',parts:[
    {pts:.5,html:`Bảng tần số ghép nhóm sau cho biết ${g.what} được khảo sát:<div class="figure">${grpTab(g,ns)}</div>Tìm tần số và tần số tương đối của nhóm ${grpH(g,i)}.`},
    {pts:.5,html:`Có bao nhiêu số liệu ${up?`không nhỏ hơn ${mk}`:`nhỏ hơn ${mk}`} ${g.unit}? Các số liệu đó chiếm bao nhiêu phần trăm cỡ mẫu?`}],
    sol:[ptxt([[`Cỡ mẫu n = ${ns.join(' + ')} = ${N}; tần số của nhóm ${grpH(g,i)} là ${ns[i]}.`,.25],[`Tần số tương đối: ${fr(ns[i],N)}·100% = ${pctH(ns[i]*100/N)}.`,.25]]),
      ptxt([[`Các nhóm ${up?`từ ${grpH(g,j)} trở đi`:`trước nhóm ${grpH(g,j)}`}: ${sel.join(' + ')} = ${c} số liệu.`,.25],[`Chiếm ${fr(c,N)}·100% = ${pctH(c*100/N)} cỡ mẫu.`,.25]])],chk:()=>isInt(c*100/N*10)};
});

/* ---------- Xác suất: rút một thẻ (Gia Lai, Đồng Nai, Đà Nẵng) ---------- */
TL9b('tl9-26-card',8,'TH','stat',[25,26],r=>{
  const n=r.int(10,20),k=r.pick([3,4,5]),A=[...Array(n)].map((_,i)=>i+1).filter(v=>v%k===0),pr=r.chance(.5);
  const B=pr?[...Array(n)].map((_,i)=>i+1).filter(isPrime):[...Array(n)].map((_,i)=>i+1).filter(v=>Number.isInteger(Math.sqrt(v)));
  return{kind:'tl',title:'Phép thử ngẫu nhiên và xác suất',parts:[
    {pts:.5,html:`Một hộp có ${n} tấm thẻ cùng loại, được đánh số lần lượt từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ từ hộp. Mô tả không gian mẫu và cho biết không gian mẫu có bao nhiêu phần tử.`},
    {pts:.5,html:`Tính xác suất của mỗi biến cố sau: ${I('A')}: “Số ghi trên thẻ chia hết cho ${k}”; ${I('B')}: “Số ghi trên thẻ là ${pr?'số nguyên tố':'số chính phương'}”.`}],
    sol:[ptxt([[`Ω = {1; 2; 3; ...; ${n}}.`,.25],[`n(Ω) = ${n}.`,.25]]),
      ptxt([[`A = {${A.join('; ')}}, có ${A.length} kết quả thuận lợi; P(A) = ${qh(Q(A.length,n))}.`,.25],[`B = {${B.join('; ')}}, có ${B.length} kết quả thuận lợi; P(B) = ${qh(Q(B.length,n))}.`,.25]])],chk:()=>A.length>0&&B.length>0};
});

/* ---------- Xác suất: rút thẻ từ hai hộp (Huế, Hà Tĩnh) ---------- */
TL9b('tl9-26-box2',8,'VD','stat',[25,26],r=>{
  const m=r.int(2,3),q=r.int(3,4),e=r.int(0,2),Om=[];for(let i=1;i<=m;i++)for(let j=1;j<=q;j++)Om.push([i,j]);
  const E=[['Tổng hai số ghi trên hai tấm thẻ là số lẻ',(i,j)=>(i+j)%2===1],['Tích hai số ghi trên hai tấm thẻ chia hết cho 3',(i,j)=>i*j%3===0],['Số ghi trên thẻ rút từ hộp thứ hai lớn hơn số ghi trên thẻ rút từ hộp thứ nhất',(i,j)=>j>i]][e];
  const F=Om.filter(([i,j])=>E[1](i,j)),ps=p=>`(${p[0]}; ${p[1]})`;
  return{kind:'tl',title:'Xác suất của biến cố',parts:[
    {pts:.5,html:`Hộp thứ nhất có ${m} tấm thẻ đánh số ${[...Array(m)].map((_,i)=>i+1).join(', ')}; hộp thứ hai có ${q} tấm thẻ đánh số ${[...Array(q)].map((_,i)=>i+1).join(', ')}. Rút ngẫu nhiên từ mỗi hộp một tấm thẻ. Viết không gian mẫu của phép thử (kết quả ghi dạng (${I('a')}; ${I('b')}) với ${I('a')}, ${I('b')} lần lượt là số trên thẻ rút từ hộp thứ nhất, hộp thứ hai).`},
    {pts:.5,html:`Tính xác suất của biến cố ${I('E')}: “${E[0]}”.`}],
    sol:[ptxt([[`Ω = {${Om.map(ps).join('; ')}}.`,.25],[`n(Ω) = ${m}·${q} = ${Om.length}.`,.25]]),
      ptxt([[`Các kết quả thuận lợi cho E: ${F.map(ps).join('; ')}; có ${F.length} kết quả.`,.25],[`P(E) = ${fr(F.length,Om.length)}${qh(Q(F.length,Om.length))===fr(F.length,Om.length)?'':' = '+qh(Q(F.length,Om.length))}.`,.25]])],chk:()=>F.length>0&&F.length<Om.length};
});

/* ---------- Tối ưu trong thực tế (câu cuối các đề Hà Nội, Quảng Ninh, Thanh Hóa, Ninh Bình) ---------- */
TL9('tl9-6-fence',2,'VDC','real',[5],r=>{
  const L=r.pick([20,24,32,40,48,60,80]),x0=L/4,S=L*L/8;
  return{kind:'tl',title:'Bài toán tối ưu trong thực tế',parts:[
    {pts:.5,html:`Bác An có ${L} m lưới thép để rào một mảnh vườn hình chữ nhật; một cạnh của mảnh vườn tựa vào bức tường có sẵn nên không cần rào. Gọi ${I('x')} (m) là độ dài mỗi cạnh vuông góc với bức tường. Biểu diễn diện tích ${I('S')} của mảnh vườn theo ${I('x')} và tìm điều kiện của ${I('x')}.`},
    {pts:.5,html:`Tìm ${I('x')} để mảnh vườn có diện tích lớn nhất. Tính diện tích lớn nhất đó.`}],
    sol:[ptxt([[`Cạnh song song với tường dài ${L} − 2x (m); điều kiện 0 < x < ${L/2}.`,.25],[`S = x(${L} − 2x) = −2x² + ${L}x (m²).`,.25]]),
      ptxt([[`S = −2(x² − ${L/2}x) = −2(x − ${x0})² + ${S} ≤ ${S}.`,.25],[`Dấu "=" xảy ra khi x = ${x0} (thoả mãn). Vậy diện tích lớn nhất là ${S} m², khi mảnh vườn có kích thước ${x0} m × ${L/2} m.`,.25]])],chk:()=>x0*(L-2*x0)===S};
});
