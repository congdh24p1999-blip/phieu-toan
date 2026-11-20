/* ================================================================
   ÔN THI TỐT NGHIỆP THPT – các dạng câu riêng theo kiểu đề chính thức 2025
   (chỉ dùng trong đề "Ôn thi TN THPT"; g:'tn', ch là mã chủ đề 101 – 108 của BLUEPRINT['12tn'])
   ================================================================ */
const DST=(id,ch,lv,gen)=>reg('ds',id,ch,lv,gen,{g:'tn'});
const TLNT=(id,ch,lv,gen)=>reg('tln',id,ch,lv,gen,{g:'tn'});
const r2tn=x=>Math.round(x*100)/100,okR2=x=>Math.abs(x*100-Math.round(x*100))<.45;
const v3H=v=>`(${v.map(sg).join('; ')})`;
const dot3=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],crs3=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];

/* Phần II – Oxyz lồng ghép chuyển động thẳng đều (máy bay và ra-đa) */
DST('tn-ds-motion',103,'VD',r=>{
  for(;;){const v=[r.int(-4,4),r.int(-4,4),r.int(-1,1)];if(!v[0]&&!v[1])continue;const e=[r.int(-2,2),r.int(-2,2),r.int(1,3)],w0=crs3(v,e);
    const g=gcd(gcd(Math.abs(w0[0]),Math.abs(w0[1])),Math.abs(w0[2]))||1,w=w0.map(x=>x/g);let w2=dot3(w,w);if(!w2||w2>200)continue;
    if(w[2]<0)w.forEach((x,i)=>w[i]=-x);if(w[2]===0&&w2<4)continue;
    const k=r.int(3,9),A=w.map((x,i)=>x-k*v[i]);if(A[2]<1)continue;const t1=r.int(1,k-1),P1=A.map((x,i)=>x+t1*v[i]);
    const Rin=Math.ceil(Math.sqrt(w2))+r.int(1,4),Rout=Math.max(1,Math.floor(Math.sqrt(w2)-0.01)-r.int(0,1));if(Rout*Rout>=w2||Rout<1)continue;
    return mkDS(r,{stem:`Trong không gian ${I('Oxyz')} (đơn vị trên mỗi trục là ki-lô-mét), một trạm ra-đa đặt tại gốc toạ độ ${I('O')}. Một máy bay đang ở vị trí ${I('A')}${v3H(A)} và bay thẳng đều; sau mỗi phút máy bay dịch chuyển theo vectơ ${vc(I('v'))} = ${v3H(v)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Sau ${t1} phút, máy bay ở vị trí có toạ độ ${v3H(P1)}.`,f:`Sau ${t1} phút, máy bay ở vị trí có toạ độ ${v3H(A.map((x,i)=>x+(t1+1)*v[i]))}.`,why:`Vị trí sau t phút: A + t${vc(I('v'))}; với t = ${t1} được ${v3H(P1)}.`},
      {t:`Đường bay của máy bay có phương trình tham số ${I('x')} = ${parT10(A[0],v[0])}, ${I('y')} = ${parT10(A[1],v[1])}, ${I('z')} = ${parT10(A[2],v[2])}.`,f:`Đường bay của máy bay có phương trình tham số ${I('x')} = ${parT10(v[0],A[0])}, ${I('y')} = ${parT10(v[1],A[1])}, ${I('z')} = ${parT10(v[2],A[2])}.`,why:`Đường thẳng qua A, vectơ chỉ phương ${vc(I('v'))}.`},
      {t:`Máy bay gần trạm ra-đa nhất tại thời điểm sau ${k} phút kể từ khi ở ${I('A')}.`,f:`Máy bay gần trạm ra-đa nhất tại thời điểm sau ${k+1} phút kể từ khi ở ${I('A')}.`,why:`OM² = |${vc(I('OA'))} + t${vc(I('v'))}|² là tam thức bậc hai theo t, nhỏ nhất khi t = −${fr(`${vc(I('OA'))}·${vc(I('v'))}`,`|${vc(I('v'))}|²`)} = ${k}.`},
      {t:`Nếu ra-đa phát hiện được vật thể cách nó không quá ${Rin} km thì ra-đa phát hiện được máy bay.`,f:`Nếu ra-đa phát hiện được vật thể cách nó không quá ${Rout} km thì ra-đa phát hiện được máy bay.`,why:`Khoảng cách ngắn nhất từ O đến đường bay bằng √${w2} ≈ ${fmt(r2tn(Math.sqrt(w2)))} km; ra-đa phát hiện được máy bay khi bán kính phát hiện không nhỏ hơn giá trị này.`}],
      chk:()=>dot3(w,v)===0&&dot3(A,v)===-k*dot3(v,v)})}
});
/* Phần II – mô hình thực tế khảo sát hàm số (số lượng cá trong hồ) */
DST('tn-ds-model',101,'TH',r=>{
  for(;;){const a=3*r.int(2,5),t1=r.int(Math.ceil(2*a/3)+1,2*a/3+5),b=3*t1*t1-2*a*t1,c=r.int(5,40),T=t1+r.int(1,3);if(b<=0)continue;
    const y=t=>-(t**3)+a*t*t+b*t+c,gmax=a*a/3+b;
    return mkDS(r,{stem:`Một trang trại nuôi cá thả cá giống vào hồ. Số lượng cá trong hồ sau ${I('t')} tháng (đơn vị: trăm con) được mô hình hoá bởi ${I('y')}(${I('t')}) = ${MINUS}${I('t')}${sup(3)} + ${a}${I('t')}${sup(2)} + ${b}${I('t')} + ${c} với 0 ≤ ${I('t')} ≤ ${T}. Gọi ${I('g')}(${I('t')}) = ${I('y')}′(${I('t')}) là tốc độ thay đổi số lượng cá. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Lúc thả, trong hồ có ${c} trăm con cá.`,f:`Lúc thả, trong hồ có ${c+b} trăm con cá.`,why:`y(0) = ${c}.`},
      {t:`${I('g')}(${I('t')}) = ${MINUS}3${I('t')}${sup(2)} + ${2*a}${I('t')} + ${b}.`,f:`${I('g')}(${I('t')}) = ${MINUS}3${I('t')}${sup(2)} + ${a}${I('t')} + ${b}.`,why:`Đạo hàm của y(t).`},
      {t:`Số lượng cá trong hồ lớn nhất sau ${t1} tháng.`,f:`Số lượng cá trong hồ lớn nhất sau ${T} tháng.`,why:`g(t) = 0 ⟺ t = ${t1} (nhận) hoặc t = ${qh(Q(-b,3*t1))} (loại); g đổi dấu từ dương sang âm tại t = ${t1}, y(${t1}) = ${y(t1)} > y(${T}) = ${y(T)}.`},
      {t:`Tốc độ tăng số lượng cá lớn nhất bằng ${gmax} trăm con/tháng.`,f:`Tốc độ tăng số lượng cá lớn nhất bằng ${b} trăm con/tháng.`,why:`g(t) là hàm bậc hai có a < 0, lớn nhất tại t = ${a/3}: g(${a/3}) = ${gmax}.`}],chk:()=>y(t1)>y(T)&&a/3<=T})}
});
/* Phần III – tối ưu lợi nhuận với hàm chi phí bậc ba */
TLNT('tn-t-profit',101,'VD',r=>{
  for(;;){const x0=r.int(10,40),al=r.int(x0+1,2*x0),beta=r.int(50,300),p=3*x0*x0-2*al*x0+beta,F=r.int(100,999);if(p<=beta||p>5000)continue;
    /* lợi nhuận L(x) = px − (x³ − αx² + βx + F), L′ = −3x² + 2αx + (p − β) */
    const x2=(2*al-Math.sqrt(4*al*al+12*(p-beta)))/6;if(x2>=0)continue;
    return{kind:'tln',stem:`Một xưởng sản xuất ${I('x')} sản phẩm mỗi ngày (0 < ${I('x')} ≤ ${2*x0}) với tổng chi phí ${I('C')}(${I('x')}) = ${I('x')}${sup(3)} ${MINUS} ${al}${I('x')}${sup(2)} + ${beta}${I('x')} + ${F} (nghìn đồng). Giá bán mỗi sản phẩm là ${p} nghìn đồng và xưởng bán hết sản phẩm làm ra. Mỗi ngày xưởng nên sản xuất bao nhiêu sản phẩm để lợi nhuận lớn nhất?`,ans:x0,unit:'',
      sol:`Lợi nhuận L(x) = ${p}x − C(x) = −x³ + ${al}x² + ${p-beta}x − ${F}; L′(x) = −3x² + ${2*al}x + ${p-beta} = 0 ⟺ x = ${x0} (nhận) hoặc x < 0 (loại). L′ đổi dấu từ dương sang âm tại x = ${x0} nên lợi nhuận lớn nhất khi x = ${x0}.`,chk:()=>-3*x0*x0+2*al*x0+p-beta===0}}
});
/* Phần III – thể tích vật thể tròn xoay thực tế (chiếc bát parabol) */
TLNT('tn-t-bowl',102,'VD',r=>{
  for(;;){const k=r.int(2,8),h=r.int(5,12),half=r.chance(.4),hh=half?h/2:h,V=Math.PI*k*hh*hh/2,ans=Math.round(V);if(ans>=10000||Math.abs(V-Math.round(V))>.45)continue;
    return{kind:'tln',stem:`Mặt trong của một chiếc bát là mặt tròn xoay tạo thành khi quay phần parabol ${I('y')} = ${fr(`${I('x')}${sup(2)}`,k)} (0 ≤ ${I('y')} ≤ ${h}) quanh trục ${I('Oy')} (đơn vị: cm). Người ta đổ nước vào bát đến độ cao ${fmt(hh)} cm tính từ đáy. Tính thể tích nước trong bát (đơn vị: cm³, làm tròn kết quả đến hàng đơn vị).`,ans,unit:'cm³',
      sol:`x² = ${k}y nên V = π∫₀^${fmt(hh)} ${k}y dy = ${fr(`${k}π`,2)}·${fmt(hh)}² ≈ ${ans} (cm³).`,chk:()=>true}}
});
/* Phần III – khoảng cách giữa hai đường thẳng chéo nhau trong căn phòng hình hộp chữ nhật */
TLNT('tn-t-room',104,'VD',r=>{
  for(;;){const a=r.int(4,10),b=r.int(3,8),c=r.int(3,5),P={A:[0,0,0],B:[a,0,0],C:[a,b,0],D:[0,b,0]};P["A'"]=[0,0,c];P["B'"]=[a,0,c];P["C'"]=[a,b,c];P["D'"]=[0,b,c];
    const L=r.pick([["A","C'","B","B'"],["A","C'","D","D'"],["B","D'","A","A'"],["B","D'","C","C'"],["A","C'","B'","D'"],["B","D'","A'","C'"]]),u=P[L[1]].map((x,i)=>x-P[L[0]][i]),w=P[L[3]].map((x,i)=>x-P[L[2]][i]),n=crs3(u,w),nn=Math.sqrt(dot3(n,n));
    if(!nn)continue;const d=Math.abs(dot3(P[L[2]].map((x,i)=>x-P[L[0]][i]),n))/nn;if(!d||!okR2(d))continue;
    const nm=s=>I(s.replace("'",'′'));
    return{kind:'tln',stem:`Một phòng học có dạng hình hộp chữ nhật ${I('ABCD')}.${I('A′B′C′D′')} với ${I('AB')} = ${a} m, ${I('AD')} = ${b} m, ${I('AA′')} = ${c} m. Một sợi dây điện được căng thẳng dọc theo đoạn ${nm(L[0])}${nm(L[1])}. Tính khoảng cách giữa sợi dây và đường thẳng ${nm(L[2])}${nm(L[3])} (đơn vị: mét, làm tròn kết quả đến hàng phần trăm).`,ans:r2tn(d),unit:'m',
      sol:`Chọn hệ trục Oxyz với A là gốc, B(${a}; 0; 0), D(0; ${b}; 0), A′(0; 0; ${c}). Dùng công thức d = ${fr('|[u, w] · MN|','|[u, w]|')} với ${vc(I('u'))} = ${v3H(u)}, ${vc(I('w'))} = ${v3H(w)}: d ≈ ${fmt(r2tn(d))} (m).`,chk:()=>true}}
});
/* Phần III – xác suất sắp xếp sách trên kệ (kĩ thuật vách ngăn) */
TLNT('tn-t-shelf',106,'VD',r=>{
  for(;;){const m=r.int(3,6),n=r.int(2,Math.min(4,m+1)),sep=r.chance(.6),p=sep?nC10(m+1,n)/nC10(m+n,n):fact10(m+1)*fact10(n)/fact10(m+n);if(!okR2(p))continue;
    return{kind:'tln',stem:`Trên một kệ sách người ta xếp ngẫu nhiên thành một hàng ${m} quyển sách Toán khác nhau và ${n} quyển sách Văn khác nhau. Tính xác suất để ${sep?'không có hai quyển sách Văn nào đứng cạnh nhau':'các quyển sách Văn đứng liền nhau'} (làm tròn kết quả đến hàng phần trăm).`,ans:r2tn(p),unit:'',
      sol:sep?`n(Ω) = ${m+n}!. Xếp ${m} quyển Toán: ${m}! cách, tạo ra ${m+1} chỗ trống (kể cả hai đầu); xếp ${n} quyển Văn vào ${n} chỗ trống khác nhau: ${AH(m+1,n)} cách. P = ${fr(`${m}!·${nA10(m+1,n)}`,`${m+n}!`)} ≈ ${fmt(r2tn(p))}.`:`Coi ${n} quyển Văn là một khối: xếp ${m+1} "phần tử" có ${m+1}! cách, trong khối có ${n}! cách. P = ${fr(`${m+1}!·${n}!`,`${m+n}!`)} ≈ ${fmt(r2tn(p))}.`,chk:()=>true}}
});
/* Phần III – xác suất kết hợp cấp số cộng (đếm bằng liệt kê) */
TLNT('tn-t-ap',106,'VD',r=>{
  for(;;){const N=r.int(10,30),t=r.int(0,1);let f=0;for(let a=1;a<=N;a++)for(let b=a+1;b<=N;b++)for(let c=b+1;c<=N;c++){if(t?(a+b+c)%3===0:a+c===2*b)f++}
    const p=f/nC10(N,3);if(!okR2(p))continue;
    return{kind:'tln',stem:`Một hộp có ${N} tấm thẻ được đánh số từ 1 đến ${N}. Rút ngẫu nhiên đồng thời ba tấm thẻ. Tính xác suất để ${t?'tổng ba số ghi trên ba tấm thẻ chia hết cho 3':'ba số ghi trên ba tấm thẻ (sắp theo thứ tự tăng dần) lập thành một cấp số cộng'} (làm tròn kết quả đến hàng phần trăm).`,ans:r2tn(p),unit:'',
      sol:t?`n(Ω) = ${CH(N,3)} = ${nC10(N,3)}. Chia các số thành ba nhóm theo số dư khi chia cho 3; tổng chia hết cho 3 khi ba số cùng nhóm hoặc thuộc ba nhóm khác nhau: n(A) = ${f}. P ≈ ${fmt(r2tn(p))}.`
        :`n(Ω) = ${CH(N,3)} = ${nC10(N,3)}. Ba số a < b < c lập thành cấp số cộng ⟺ a + c = 2b ⟺ a, c cùng tính chẵn lẻ; mỗi cặp (a; c) như vậy xác định duy nhất b: n(A) = ${CH(Math.ceil(N/2),2)} + ${CH(Math.floor(N/2),2)} = ${f}. P ≈ ${fmt(r2tn(p))}.`,chk:()=>t===1||f===nC10(Math.ceil(N/2),2)+nC10(Math.floor(N/2),2)}}
});
