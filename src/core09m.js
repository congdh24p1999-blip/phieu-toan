/* ================================================================
   Toán 9: câu Đúng – Sai và trả lời ngắn mức Vận dụng cho đề ôn thi vào lớp 10 theo khung
   12 nhiều lựa chọn + 4 Đúng – Sai + 6 trả lời ngắn (Hải Phòng, Lào Cai 2026). Câu chữ, số liệu
   do Xưởng đề Toán tự tạo, không chép từ đề nào. Đáp số trả lời ngắn ghi được trong 4 kí tự.
   ================================================================ */
const fit4=v=>fmt(v).length<=4;

/* ---------- Đúng – Sai: so sánh hai gói cước (Hải Phòng, Phần II câu 4) ---------- */
DS9('ds9-v-plan',2,'VD',[6],r=>{
  for(;;){const a0=r.int(8,15)*10,c1=r.int(1,3),b0=r.int(3,7)*10,c2=c1+r.int(1,3);if(b0>=a0)continue;const k=(a0-b0)/(c2-c1);if(!isInt(k)||k<15||k>80)continue;
    const x1=k+r.int(5,20),x2=Math.max(1,k-r.int(5,12)),sv=12*((b0+c2*x1)-(a0+c1*x1)),M=r.int(25,40)*10,gA=Math.floor((M-a0)/c1),gB=Math.floor((M-b0)/c2);if(gA===gB||gA<0||gB<0)continue;
    return mkDS(r,{stem:`Một nhà mạng có hai gói cước Internet. Gói A: phí cố định ${a0} nghìn đồng mỗi tháng và mỗi GB dữ liệu sử dụng trả thêm ${c1} nghìn đồng. Gói B: phí cố định ${b0} nghìn đồng mỗi tháng và mỗi GB trả thêm ${c2} nghìn đồng. Gọi ${I('x')} (GB, ${I('x')} ≥ 0) là lượng dữ liệu dùng trong một tháng và ${I('y')} (nghìn đồng) là số tiền phải trả trong tháng đó.`,items:[
      {t:`Nếu dùng gói A thì ${I('y')} = ${c1===1?'':c1}${I('x')} + ${a0}.`,f:`Nếu dùng gói A thì ${I('y')} = ${a0}${I('x')} + ${c1}.`,why:`Số tiền = phí cố định + (giá mỗi GB)·(số GB) = ${a0} + ${c1===1?'':c1}x.`},
      {t:`Một gia đình mỗi tháng dùng đúng ${x1} GB. Nếu chọn gói A thay vì gói B thì một năm tiết kiệm được ${sv} nghìn đồng.`,f:`Một gia đình mỗi tháng dùng đúng ${x1} GB. Nếu chọn gói A thay vì gói B thì một năm tiết kiệm được ${sv/12} nghìn đồng.`,why:`Mỗi tháng gói A: ${a0+c1*x1}, gói B: ${b0+c2*x1}; chênh ${sv/12} nghìn đồng/tháng, 12 tháng tiết kiệm ${sv} nghìn đồng.`},
      {t:`Với ${M} nghìn đồng mỗi tháng, khách hàng mua được nhiều GB hơn nếu dùng gói ${gA>gB?'A':'B'}.`,f:`Với ${M} nghìn đồng mỗi tháng, khách hàng mua được nhiều GB hơn nếu dùng gói ${gA>gB?'B':'A'}.`,why:`Gói A: ${c1===1?'':c1}x + ${a0} ≤ ${M} ⇒ x ≤ ${qh(Q(M-a0,c1))}; gói B: ${c2}x + ${b0} ≤ ${M} ⇒ x ≤ ${qh(Q(M-b0,c2))}. Gói ${gA>gB?'A':'B'} cho nhiều GB hơn.`},
      {t:`Nếu mỗi tháng chỉ dùng ${x2} GB thì chọn gói B tiết kiệm hơn gói A.`,f:`Nếu mỗi tháng chỉ dùng ${x2} GB thì chọn gói A tiết kiệm hơn gói B.`,why:`Gói A có lợi hơn khi ${c1===1?'':c1}x + ${a0} &lt; ${c2}x + ${b0} ⟺ x &gt; ${k}; với ${x2} GB (&lt; ${k}) thì gói B rẻ hơn (${b0+c2*x2} &lt; ${a0+c1*x2}).`}],
      chk:()=>a0+c1*x1<b0+c2*x1&&b0+c2*x2<a0+c1*x2}) }
});

/* ---------- Đúng – Sai: biểu đồ hình quạt tròn (Hải Phòng, Phần II câu 1) ---------- */
DS9b('ds9-v-pie',7,'TH',[23,25],r=>{
  for(;;){const C=r.pick(PIE9),N=r.pick([120,160,200,240,300,400]);
    const a=r.int(7,9)*5,b=r.int(4,6)*5,c=r.int(2,3)*5,d=100-a-b-c;if(d<5||new Set([a,b,c,d]).size<4)continue;
    const pc=r.shuffle([a,b,c,d]),ns=pc.map(v=>N*v/100);if(!ns.every(isInt))continue;
    const im=pc.indexOf(Math.max(...pc)),others=[0,1,2,3].filter(t=>t!==im),[i,j]=r.shuffle(others).slice(0,2);
    const lo=pc[i]<pc[j]?i:j,hi=lo===i?j:i,ratio=pc[hi]/pc[lo];if(!isInt(ratio*10))continue;
    const [u,v]=r.shuffle(others).slice(0,2),pr=Q(pc[u],pc[u]+pc[v]),prf=Q(pc[u],100);
    return mkDS(r,{stem:`Biểu đồ hình quạt tròn dưới đây cho biết tỉ lệ phần trăm ${C.what} của ${N} ${C.who} (mỗi người chọn đúng một ${C.lab}).<div class="figure">${pieSVG(C.names.map((n,k)=>({name:n,pct:pc[k]})))}</div>`,items:[
      {t:`${C.lab[0].toUpperCase()+C.lab.slice(1)} được chọn nhiều nhất là “${C.names[im]}”.`,f:`${C.lab[0].toUpperCase()+C.lab.slice(1)} được chọn nhiều nhất là “${C.names[others[0]]}”.`,why:`Tỉ lệ lớn nhất là ${pc[im]}%, ứng với “${C.names[im]}”.`},
      {t:`Có ${ns[i]} người chọn “${C.names[i]}”.`,f:`Có ${pc[i]} người chọn “${C.names[i]}”.`,why:`${pc[i]}%·${N} = ${ns[i]}.`},
      {t:`Số người chọn “${C.names[hi]}” gấp ${fmt(ratio)} lần số người chọn “${C.names[lo]}”.`,f:`Số người chọn “${C.names[hi]}” gấp ${fmt(ratio+(ratio>=2?-0.5:1))} lần số người chọn “${C.names[lo]}”.`,why:`${pc[hi]}% : ${pc[lo]}% = ${fmt(ratio)}.`},
      {t:`Chọn ngẫu nhiên một người trong nhóm chọn “${C.names[u]}” hoặc “${C.names[v]}”. Xác suất để người đó chọn “${C.names[u]}” là ${qh(pr)}.`,f:`Chọn ngẫu nhiên một người trong nhóm chọn “${C.names[u]}” hoặc “${C.names[v]}”. Xác suất để người đó chọn “${C.names[u]}” là ${qh(prf)}.`,why:`Nhóm có ${ns[u]} + ${ns[v]} = ${ns[u]+ns[v]} người, trong đó ${ns[u]} người chọn “${C.names[u]}”: P = ${fr(ns[u],ns[u]+ns[v])} = ${qh(pr)}.`}],
      chk:()=>pc.reduce((s,t)=>s+t,0)===100&&(pr[0]!==prf[0]||pr[1]!==prf[1])&&Math.abs(ratio-(ratio+(ratio>=2?-0.5:1)))>0})}
});

/* ---------- Trả lời ngắn: tam giác dưới cổng parabol (Lào Cai, Phần III câu 2) ---------- */
TLN9('t9-v-arch',6,'VD',[18],r=>{
  for(;;){const a=r.pick([3,4,5,6]),m=r.int(1,a-1),t=r.pick([1,1.5,2,2.5,3]),h=t*a*a/(a*a-m*m),S=m*(h-t),ans=Math.round(S*10)/10;if((a===4&&m===3&&t===3)||h>15||!fit4(ans)||Math.abs(S*10-Math.round(S*10))>.45)continue;
    return{kind:'tln',stem:`Một chiếc cổng có dạng một phần parabol, khoảng cách giữa hai chân cổng ${I('A')}, ${I('B')} trên mặt đất là ${2*a} m. Người ta treo một tấm biển hình tam giác ${I('OMN')}, trong đó ${I('O')} là điểm cao nhất của cổng, ${I('M')}, ${I('N')} nằm trên cổng sao cho ${I('MN')} = ${2*m} m, ${I('MN')} song song với mặt đất và cách mặt đất ${fmt(t)} m. Diện tích tấm biển bằng bao nhiêu mét vuông (làm tròn kết quả đến hàng phần mười)?`,ans,
      sol:`Chọn trục toạ độ: gốc là trung điểm AB, Oy qua đỉnh. Cổng là parabol y = ax² + h qua A(−${a}; 0), B(${a}; 0) và N(${m}; ${fmt(t)}): ${a*a}a + h = 0, ${m*m}a + h = ${fmt(t)} ⇒ h = ${qh(Q(Math.round(2*t)*a*a,2*(a*a-m*m)))}. Chiều cao tam giác h − ${fmt(t)}; S = ${fr(1,2)}·${2*m}·(h − ${fmt(t)}) ≈ ${fmt(ans)} m².`,chk:()=>Math.abs(-h/(a*a)*m*m+h-t)<1e-9}}
});

/* ---------- Trả lời ngắn: phần tô đậm giữa tam giác và đường tròn nội tiếp (Hải Phòng, Phần III câu 3) ---------- */
TLN9b('t9-v-incircle',9,'VD',[28],r=>{
  for(;;){const [p0,q0,h0]=r.pick([[3,4,5],[4,3,5],[5,12,13],[12,5,13],[8,15,17],[15,8,17],[7,24,25],[24,7,25]]),kk=r.int(1,6),p=p0*kk,q=q0*kk,h=h0*kk;if(p===9&&h===15)continue;
    /* tam giác ABC vuông tại A, AB = p, AC = q, BC = h; phân giác góc B cắt AC tại D; xét tam giác BCD */
    const AD=q*p/(p+h),DC=q-AD,BD=Math.hypot(p,AD),S=DC*p/2,sp=(BD+h+DC)/2,rr=S/sp,sh=S-3.14*rr*rr,ans=Math.round(sh*10)/10;if(!fit4(ans)||Math.abs(sh*10-Math.round(sh*10))>.45)continue;
    return{kind:'tln',stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${p} cm, ${I('BC')} = ${h} cm. Đường phân giác trong của góc ${I('B')} cắt cạnh ${I('AC')} tại ${I('D')}. Vẽ đường tròn tâm ${I('I')} nội tiếp tam giác ${I('BCD')}. Tính diện tích phần hình phẳng giới hạn bởi ba cạnh của tam giác ${I('BCD')} và đường tròn (${I('I')}) (lấy π ≈ 3,14; làm tròn kết quả đến hàng phần mười của xăng-ti-mét vuông).`,ans,
      sol:`AC = √(${h}² − ${p}²) = ${q}. Tính chất phân giác: ${fr('AD','DC')} = ${fr('AB','BC')} = ${qh(Q(p,h))} ⇒ AD = ${fmt(Math.round(AD*1000)/1000)}, DC = ${fmt(Math.round(DC*1000)/1000)} cm. S${sub('BCD')} = ${fr(1,2)}·DC·AB = ${fmt(Math.round(S*1000)/1000)} cm². BD = √(AB² + AD²) ≈ ${fmt(Math.round(BD*1000)/1000)} cm; nửa chu vi p ≈ ${fmt(Math.round(sp*1000)/1000)}; bán kính nội tiếp r = S : p ≈ ${fmt(Math.round(rr*1000)/1000)} cm. Diện tích cần tìm ≈ ${fmt(Math.round(S*1000)/1000)} − 3,14·r² ≈ ${fmt(ans)} cm².`,chk:()=>p*p+q*q===h*h&&rr>0&&sh>0}}
});

/* ---------- Trả lời ngắn: biểu thức nghiệm dạng a + b√c (Hải Phòng, Phần III câu 5) ---------- */
TLN9('t9-v-viete',6,'VD',[20],r=>{
  for(;;){const p=r.int(1,3),q=r.int(5,30),D=p*p+q;let u=1,w=D;for(let k=Math.floor(Math.sqrt(D));k>1;k--)if(D%(k*k)===0){u=k;w=D/(k*k);break}if(w===1)continue;
    const S=2*p,c=r.int(S*S+q-6,S*S+q+6),K=S*S+q-c;if(K<=0)continue;const a=K*K,b=2*u*(S*S+q),ans=a+b;if(ans>9999||(S===4&&q===26&&c===27))continue;
    return{kind:'tln',stem:`Cho phương trình ${I('x')}² − ${S}${I('x')} − ${q} = 0 có hai nghiệm phân biệt ${I('x')}${sub(1)}, ${I('x')}${sub(2)} với ${I('x')}${sub(1)} &lt; ${I('x')}${sub(2)}. Giá trị của biểu thức ${I('P')} = (${I('x')}${sub(1)}² + ${S}${I('x')}${sub(2)} − ${c})² − ${I('x')}${sub(1)}³ + ${I('x')}${sub(2)}³ có dạng ${I('a')} + ${I('b')}${rt(w)} với ${I('a')}, ${I('b')} ∈ ℕ*. Tính ${I('a')} + ${I('b')}.`,ans,
      sol:`x₁ là nghiệm nên x₁² = ${S}x₁ + ${q}; do đó x₁² + ${S}x₂ − ${c} = ${S}(x₁ + x₂) + ${q} − ${c} = ${S}·${S} + ${q} − ${c} = ${K}. Viète: x₁ + x₂ = ${S}, x₁x₂ = −${q}; x₂ − x₁ = √((x₁ + x₂)² − 4x₁x₂) = √${S*S+4*q} = ${2*u===1?'':2*u}${rt(w)}. x₂³ − x₁³ = (x₂ − x₁)[(x₁ + x₂)² − x₁x₂] = ${2*u===1?'':2*u}${rt(w)}·${S*S+q}. Vậy P = ${a} + ${b}${rt(w)}, a + b = ${ans}.`,
      chk:()=>{const x1=p-Math.sqrt(D),x2=p+Math.sqrt(D),P=(x1*x1+S*x2-c)**2-x1**3+x2**3;return Math.abs(P-(a+b*Math.sqrt(w)))<1e-6}}}
});

/* ---------- Trả lời ngắn: viên bi trong ly hình nón (Lào Cai, Phần III câu 1) ---------- */
TLN9b('t9-v-cone',10,'VD',[31,32],r=>{
  for(;;){const H=r.pick([12,15,16,18,20]),R=r.pick([4,5,6,7]),h1=r.int(Math.ceil(H*.4),Math.floor(H*.7)),rb=r.pick([1,1.5,2]);
    const h2=Math.cbrt(h1**3+4*H*H*rb**3/(R*R)),dh=h2-h1,sina=R/Math.hypot(R,H);if(h2>H-.5||rb/sina+rb>h2-.2||dh<.15)continue;
    const ans=Math.round(dh*100)/100;if(!fit4(ans))continue;
    return{kind:'tln',stem:`Một chiếc ly có phần đựng nước dạng hình nón (đỉnh ở dưới) cao ${H} cm, đường kính miệng ly ${2*R} cm. Ban đầu mực nước trong ly cao ${h1} cm tính từ đỉnh nón. Người ta thả vào ly một viên bi sắt hình cầu đường kính ${fmt(2*rb)} cm; viên bi chìm hoàn toàn và nước không tràn ra. Hỏi mực nước trong ly dâng lên bao nhiêu xăng-ti-mét so với mực nước ban đầu (bỏ qua độ dày của ly, làm tròn kết quả đến hàng phần trăm)?`,ans,
      sol:`Khi nước cao h (tính từ đỉnh) thì bán kính mặt nước là ${fr(`${R}h`,H)}, thể tích phần nón chứa nước (kể cả bi) là ${fr(`π·${R}²·h³`,`3·${H}²`)}. Thể tích tăng thêm bằng thể tích bi ${fr(4,3)}π·${fmt(rb)}³ nên h³ = ${h1}³ + ${fr(`4·${H}²·${fmt(rb)}³`,`${R}²`)} ⇒ h ≈ ${fmt(Math.round(h2*10000)/10000)} cm. Mực nước dâng thêm ≈ ${fmt(ans)} cm.`,chk:()=>Math.abs(h2**3-h1**3-4*H*H*rb**3/(R*R))<1e-6}}
});

/* ---------- Trả lời ngắn: rút thẻ từ hai túi, tích là số lẻ (Lào Cai, Phần III câu 3) ---------- */
TLN9b('t9-v-bags',8,'TH',[25,26],r=>{
  for(;;){const m=r.int(3,5),n=r.int(4,6),s=r.int(1,3),A=[...Array(m)].map((_,i)=>i+1),B=[...Array(n)].map((_,i)=>i+s);
    const ev=r.int(0,2),E=[['Tích hai số ghi trên hai tấm thẻ là số lẻ',(x,y)=>x*y%2===1],['Tổng hai số ghi trên hai tấm thẻ là số chẵn',(x,y)=>(x+y)%2===0],['Tích hai số ghi trên hai tấm thẻ chia hết cho 3',(x,y)=>x*y%3===0]][ev];
    let f=0;A.forEach(x=>B.forEach(y=>{if(E[1](x,y))f++}));const P=f/(m*n),ans=Math.round(P*100)/100;if(f===0||f===m*n||!fit4(ans))continue;
    return{kind:'tln',stem:`Túi ${I('A')} chứa ${m} tấm thẻ màu đỏ được đánh số ${A.join('; ')}; túi ${I('B')} chứa ${n} tấm thẻ màu xanh được đánh số ${B.join('; ')}. Lấy ngẫu nhiên từ mỗi túi một tấm thẻ. Tính xác suất của biến cố “${E[0]}” (làm tròn kết quả đến hàng phần trăm).`,ans,
      sol:`Không gian mẫu có ${m}·${n} = ${m*n} kết quả đồng khả năng. Đếm các cặp thuận lợi được ${f} cặp. P = ${fr(f,m*n)} ≈ ${fmt(ans)}.`,chk:()=>f>0}}
});
