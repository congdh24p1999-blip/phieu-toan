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

/* ======== Các dạng bám sát từng câu đề chính thức 2025 (mã 0101 – 0104 và các mã cùng nhóm) ======== */
/* Phần II – nồng độ thuốc y′ = k·y, đặt y = e^{g(t)} */
DST('tn-ds-decay',102,'VD',r=>{
  const T=r.pick([4,5,6,8,10]),j=r.pick([1,1,2]),m=r.pick([1,2,3]),t1=j*T,t2=t1+T,y1=2**m,Cc=m+j,t3=t2+r.int(3,4*T),val=2**(Cc-t3/T),up=r.chance(.5);
  const q=Math.round(val*(up?0.8:1.25)*100)/100,lnH=n=>n===1?'ln 2':`${n}ln 2`;
  return mkDS(r,{stem:`Để phòng bệnh cho cá trong một hồ nuôi, người ta thả một loại thuốc vào nước. Nồng độ thuốc tồn dư trong nước sau ${I('t')} ngày là ${I('y')}(${I('t')}) (mg/lít) thoả mãn ${I('y')}(${I('t')}) > 0 và ${I('y')}′(${I('t')}) = ${I('k')}·${I('y')}(${I('t')}) với ${I('k')} ≠ 0 là hằng số. Đo được ${I('y')}(${t1}) = ${y1} và ${I('y')}(${t2}) = ${fmt(y1/2)}. Đặt ${I('y')}(${I('t')}) = ${I('e')}${sup(`${I('g')}(${I('t')})`)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('g')}(${I('t')}) = ${I('kt')} + ${I('C')} với ${I('C')} là hằng số.`,f:`${I('g')}(${I('t')}) = ${fr(I('k'),2)}${I('t')}${sup(2)} + ${I('C')} với ${I('C')} là hằng số.`,why:`y′ = g′(t)·e${sup('g(t)')} = k·e${sup('g(t)')} ⇒ g′(t) = k ⇒ g(t) = kt + C.`},
    {t:`${I('k')} = ${MINUS}${fr('ln 2',T)}.`,f:`${I('k')} = ${fr('ln 2',T)}.`,why:`${fmt(y1/2)} = ${y1}·e${sup(`${T}k`)} ⇒ k = −${fr('ln 2',T)}.`},
    {t:`${I('C')} = ${lnH(Cc)}.`,f:`${I('C')} = ${lnH(Cc+1)}.`,why:`g(${t1}) = ln ${y1} ⇒ C = ${m===1?'ln 2':m+'ln 2'} + ${t1}·${fr('ln 2',T)} = ${lnH(Cc)}.`},
    {t:`Sau ${t3} ngày, nồng độ thuốc tồn dư ${up?'lớn hơn':'nhỏ hơn'} ${fmt(q)} mg/lít.`,f:`Sau ${t3} ngày, nồng độ thuốc tồn dư ${up?'nhỏ hơn':'lớn hơn'} ${fmt(q)} mg/lít.`,why:`y(${t3}) = 2${sup(`${Cc} − ${t3}/${T}`)} ≈ ${fmt(Math.round(val*1000)/1000)} (mg/lít).`}],chk:()=>up?val>q:val<q});
});
/* Phần II – chuyển động thẳng trong Oxyz: vectơ đơn vị theo góc với các trục, quãng đường bằng tích phân */
DST('tn-ds-flight',103,'VD',r=>{
  const p=r.int(3,9),perm=r.pick([[60,60,45],[60,45,60],[45,60,60]]),beta=r.int(2,4),v0=300,D2=2*beta+2*v0,T=r.int(4,6);
  const comp=perm.map(a=>a===60?Q(1,2):null),dirH=perm.map(a=>a===60?'1':rt(2)),s=beta*T*T/2+v0*T,ax=perm.indexOf(45),A=[p,p,p].map((x,i)=>i===ax?0:x);
  const xi=perm.findIndex(a=>a===60),coordN=['x','y','z'][xi],xB=A[xi]+s/2,thr=Math.ceil(xB)-1-r.int(0,3);
  const lineT=`${A.map((a,i)=>fr(`${I(['x','y','z'][i])}${a?` ${MINUS} ${a}`:''}`,dirH[i])).join(' = ')}`,lineF=`${A.map((a,i)=>fr(`${I(['x','y','z'][i])}${a?` ${MINUS} ${a}`:''}`,perm[i]===45?'2':'1')).join(' = ')}`;
  return mkDS(r,{stem:`Trong không gian ${I('Oxyz')} (đơn vị trên mỗi trục là mét), cho điểm ${I('A')}(${A.join('; ')}). Một vật chuyển động thẳng với tốc độ ${I('v')}(${I('t')}) = β${I('t')} + ${v0} (m/s), 0 ≤ ${I('t')} ≤ 6, β > 0. Tại thời điểm ${I('t')} = 0 vật đi qua ${I('A')} và hướng về điểm ${I('B')}; sau 2 giây vật đi được ${D2} m. Vectơ đơn vị ${vc(I('u'))} = (${I('a')}; ${I('b')}; ${I('c')}) cùng hướng với ${Vv('AB')} tạo với các vectơ ${vc(I('i'))}, ${vc(I('j'))}, ${vc(I('k'))} các góc lần lượt bằng ${perm.join('°, ')}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I(['a','b','c'][xi])} = cos 60°.`,f:`${I(['a','b','c'][xi])} = cos 45°.`,why:`Toạ độ của vectơ đơn vị bằng côsin các góc tạo với ba trục.`},
    {t:`Đường thẳng ${I('AB')} có phương trình ${lineT}.`,f:`Đường thẳng ${I('AB')} có phương trình ${lineF}.`,why:`${vc(I('u'))} = (${perm.map(a=>a===60?fr(1,2):fr(rt(2),2)).join('; ')}) cùng phương với (${dirH.join('; ')}).`},
    {t:`β = ${beta}.`,f:`β = ${beta+1}.`,why:`∫₀² (βt + ${v0}) dt = 2β + ${2*v0} = ${D2} ⇒ β = ${beta}.`},
    {t:`Sau ${T} giây vật đến điểm ${I('B')} có ${coordN}${sub('B')} > ${thr}.`.replace(`${coordN}${sub('B')}`,`${I(coordN)}${sub('B')}`),f:`Sau ${T} giây vật đến điểm ${I('B')} có ${I(coordN)}${sub('B')} ≤ ${thr}.`,why:`Quãng đường ${T} giây: ∫₀^${T} (${beta}t + ${v0}) dt = ${fmt(s)} m; ${coordN}${sub('B')} = ${A[xi]} + ${fmt(s)}·${fr(1,2)} = ${fmt(xB)}.`}],chk:()=>xB>thr&&comp.filter(Boolean).length===2});
});
/* Phần III – mật thư: ba bộ số theo thứ tự lập thành cấp số cộng */
TLNT('tn-t-cipher',106,'VD',r=>{
  for(;;){const N=r.pick([9,9,8,10]),st=r.pick([1,11,21,31,41]),S=[...Array(N).keys()].map(i=>st+i);let c=0;
    for(const A of S)for(const B of S)for(const C of S){if(A===B||B===C||A===C)continue;const M=(A+B)/2,Nn=(B+C)/2,P=(C+A)/2;const all=[A,B,C,M,Nn,P];if(!all.every(x=>S.includes(x))||new Set(all).size<6)continue;c++}
    const tot=nA10(N,6);if(!c||tot%c)continue;const inv=tot/c;if(inv>9999)continue;
    return{kind:'tln',stem:`Để giải một mật thư, cần chọn ra 6 số khác nhau từ tập ${I('S')} = {${S[0]}; ${S[1]}; ...; ${S[N-1]}} và xếp vào 6 vị trí ${I('A')}, ${I('B')}, ${I('C')}, ${I('M')}, ${I('N')}, ${I('P')} (mỗi vị trí một số). Mật thư được giải nếu các bộ ba số ở các vị trí (${I('A')}, ${I('M')}, ${I('B')}), (${I('B')}, ${I('N')}, ${I('C')}), (${I('C')}, ${I('P')}, ${I('A')}), theo đúng thứ tự đó, đều lập thành cấp số cộng. Bạn Nam chọn và xếp ngẫu nhiên 6 số. Gọi ${I('a')} là xác suất Nam giải được mật thư. Tính ${fr(1,I('a'))}.`,ans:inv,unit:'',
      sol:`n(Ω) = ${AH(N,6)} = ${tot}. Điều kiện: M, N, P là trung bình cộng của từng cặp trong A, B, C nên A, B, C cùng tính chẵn lẻ; đếm các bộ (A; B; C) sao cho 6 số thu được khác nhau và thuộc S: ${c} cách. a = ${fr(c,tot)} ⇒ 1/a = ${inv}.`,chk:()=>true}}
});
/* Phần III – lợi nhuận vượt ngưỡng (doanh thu bậc hai, chi phí bình quân) */
TLNT('tn-t-profit2',101,'VD',r=>{
  for(;;){const p=r.pick([300,350,400,450,500]),c=r.int(20,36)*10,F0=r.pick([20000,30000,40000]),k=p-c,need=F0+100000,D=k*k-0.04*need;if(D<=0||k<=0)continue;
    const x1=(k-Math.sqrt(D))/0.02,ans=Math.floor(x1)+1;if(ans<1||ans>4500||Math.abs(x1-Math.round(x1))<1e-6)continue;
    const L=x=>-0.01*x*x+k*x-F0;if(!(L(ans)>100000&&L(ans-1)<=100000))continue;
    return{kind:'tln',stem:`Một doanh nghiệp sản xuất ${I('x')} sản phẩm mỗi tháng (${I('x')} ∈ ${NN}*, 1 ≤ ${I('x')} ≤ 4500) và bán hết. Doanh thu là ${I('F')}(${I('x')}) = ${MINUS}0,01${I('x')}${sup(2)} + ${p}${I('x')} (nghìn đồng); chi phí bình quân cho mỗi sản phẩm là ${I('G')}(${I('x')}) = ${fr(F0,I('x'))} + ${c} (nghìn đồng). Hỏi mỗi tháng doanh nghiệp cần sản xuất ít nhất bao nhiêu sản phẩm để lợi nhuận lớn hơn 100 triệu đồng?`,ans,unit:'',
      sol:`Tổng chi phí x·G(x) = ${F0} + ${c}x; lợi nhuận L(x) = −0,01x² + ${k}x − ${F0}. L(x) > 100 000 ⟺ 0,01x² − ${k}x + ${need} < 0 ⟺ ${fmt(Math.round(x1*100)/100)} < x < ... (xấp xỉ). Số nguyên nhỏ nhất thoả mãn: x = ${ans}.`,chk:()=>true}}
});
/* Phần III – bài toán bán hai loại thực đơn (quy hoạch tuyến tính, nghiệm nguyên) */
TLNT('tn-t-menu',110,'VD',r=>{
  for(;;){const K=r.int(80,120),L=r.int(Math.floor(1.5*K)+1,2*K-1),x=2*L-3*K,y=2*K-L,P2=r.int(8,14)*5,P1=r.int(Math.floor(P2/2/5)+1,Math.ceil(2*P2/3/5)-1)*5;
    if(x<=0||y<=0||!(P1/P2>1/2&&P1/P2<2/3))continue;const best=P1*x+P2*y;if(best>9999)continue;
    return{kind:'tln',stem:`Để gây quỹ từ thiện, câu lạc bộ thiện nguyện của một trường bán hai loại thực đơn. Thực đơn 1 giá ${P1} nghìn đồng gồm 2 cốc nước chanh và 1 túi khoai chiên; thực đơn 2 giá ${P2} nghìn đồng gồm 3 cốc nước chanh và 2 túi khoai chiên. Câu lạc bộ chỉ làm được tối đa ${L} cốc nước chanh và ${K} túi khoai chiên. Số tiền lớn nhất câu lạc bộ có thể thu được là bao nhiêu nghìn đồng?`,ans:best,unit:'',
      sol:`Gọi x, y là số suất thực đơn 1, 2: 2x + 3y ≤ ${L}, x + 2y ≤ ${K}, x ≥ 0, y ≥ 0. Miền nghiệm là tứ giác với các đỉnh (0; 0), (${fmt(L/2)}; 0), (${x}; ${y}), (0; ${fmt(K/2)}). F = ${P1}x + ${P2}y tại các đỉnh: 0; ${fmt(P1*L/2)}; ${best}; ${fmt(P2*K/2)}. Số tiền lớn nhất là ${best} nghìn đồng (x = ${x}, y = ${y}).`,chk:()=>best>P1*L/2&&best>P2*K/2}}
});
/* Phần III – khoảng cách giữa AC và SD, H là trọng tâm tam giác ABC */
TLNT('tn-t-pyr',104,'VD',r=>{
  for(;;){const sq=r.chance(.4),a=r.pick([2,3,4,6]),hk=r.pick([1,2,3]),hm=r.pick([2,3]),h=hk*Math.sqrt(hm),ang=sq?90:60,ca=Math.cos(ang*Math.PI/180),sa=Math.sin(ang*Math.PI/180);
    const B=[0,0,0],A=[a,0,0],C=[a*ca,a*sa,0],D=[A[0]+C[0],A[1]+C[1],0],H=[(A[0]+B[0]+C[0])/3,(A[1]+B[1]+C[1])/3,0],S=[H[0],H[1],h];
    const u=A.map((x,i)=>C[i]-x),w=S.map((x,i)=>D[i]-x),n=crs3(u,w),d=Math.abs(dot3(A.map((x,i)=>S[i]-x),n))/Math.sqrt(dot3(n,n));if(!okR2(d))continue;const OD=Math.hypot(D[0]-B[0],D[1]-B[1])/2,SD=Math.hypot(4*OD/3,h);
    return{kind:'tln',stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là ${sq?'hình vuông':`hình thoi với góc ${I('ABC')} = 60°`}, ${I('AB')} = ${a}. Hình chiếu vuông góc của ${I('S')} trên mặt phẳng (${I('ABCD')}) là trọng tâm ${I('H')} của tam giác ${I('ABC')} và ${I('SH')} = ${hk===1?'':hk}${rt(hm)}. Tính khoảng cách giữa hai đường thẳng ${I('AC')} và ${I('SD')} (làm tròn kết quả đến hàng phần trăm).`,ans:r2tn(d),unit:'',
      sol:`Gọi O = AC ∩ BD. AC ⊥ BD và AC ⊥ SH nên AC ⊥ (SBD); kẻ OK ⊥ SD thì OK là đoạn vuông góc chung, d(AC, SD) = OK = ${fr('OD · SH','SD')}. OD = ${fmt(r2tn(OD))}, HD = ${fr(4,3)}OD, SD = √(SH² + HD²) ≈ ${fmt(r2tn(SD))}. Vậy d ≈ ${fmt(r2tn(d))}.`,chk:()=>Math.abs(OD*h/SD-d)<1e-9}}
});
/* Phần III – xếp sách vào các ngăn được đánh số (mỗi ngăn có thứ tự) */
TLNT('tn-t-books',106,'VD',r=>{
  for(;;){const n=r.pick([6,7,7,8]),k=r.pick([3,4]),T_=fact10(n)*nC10(n-1,k-1),ms=[10,20,40,50,100,200,400,600,1000].filter(m=>T_%m===0&&T_/m<=9999&&T_/m>=100);if(!ms.length)continue;const m=r.pick(ms);
    return{kind:'tln',stem:`Một giá sách có ${k} ngăn được đánh số từ 1 đến ${k}. Người ta xếp ${n} quyển sách khác nhau vào các ngăn sao cho mỗi ngăn có ít nhất một quyển; các quyển trong mỗi ngăn được xếp thành một hàng từ trái sang phải. Hai cách xếp được coi là giống nhau nếu mỗi ngăn có cùng số quyển và cùng thứ tự các quyển sách. Gọi ${I('T')} là số cách xếp đôi một khác nhau. Tính ${fr(I('T'),m)}.`,ans:T_/m,unit:'',
      sol:`Xếp ${n} quyển thành một hàng: ${n}! cách; đặt ${k-1} vách ngăn vào ${n-1} khe giữa các quyển: ${CH(n-1,k-1)} cách. T = ${n}!·${nC10(n-1,k-1)} = ${T_}, nên ${fr('T',m)} = ${T_/m}.`,chk:()=>true}}
});
/* Phần III – thể tích chân đế: khối chóp cụt tứ giác đều khoét đi một chỏm cầu */
TLNT('tn-t-stand',102,'VD',r=>{
  for(;;){const a=r.int(70,80)/10,b=r.int(100,112)/10,h=r.pick([1.5,1.6,1.8,2]),R=r.int(52,62)/10,rr=r.int(30,36)/10,hc=R-Math.sqrt(R*R-rr*rr);if(rr>=a/2||hc>=h)continue;
    const Vf=h/3*(a*a+b*b+a*b),Vc=Math.PI*hc*hc*(R-hc/3),V=Vf-Vc;if(Math.abs(V*10-Math.round(V*10))>.45||V>=1000)continue;
    return{kind:'tln',stem:`Một chân đế đồ lưu niệm có dạng khối chóp cụt tứ giác đều, cạnh hai đáy là ${fmt(a)} cm và ${fmt(b)} cm, bề dày (chiều cao) ${fmt(h)} cm. Trên mặt đáy nhỏ người ta khoét đi phần ${I('H')} có dạng chỏm cầu, nhận được khi cắt khối cầu bán kính ${fmt(R)} cm bởi một mặt phẳng, mặt cắt là hình tròn bán kính ${fmt(rr)} cm nằm trên mặt đáy nhỏ (phần bị khoét là chỏm cầu nhỏ hơn). Tính thể tích khối chân đế (đơn vị: cm³, làm tròn kết quả đến hàng phần mười).`,ans:Math.round(V*10)/10,unit:'cm³',
      sol:`V${sub('chóp cụt')} = ${fr('h',3)}(S + S′ + √(SS′)) = ${fr(fmt(h),3)}(${fmt(Math.round(a*a*100)/100)} + ${fmt(Math.round(b*b*100)/100)} + ${fmt(Math.round(a*b*100)/100)}) ≈ ${fmt(Math.round(Vf*100)/100)}. Chiều cao chỏm cầu h′ = R − √(R² − r²) ≈ ${fmt(Math.round(hc*1000)/1000)}; V${sub('chỏm')} = πh′²(R − ${fr("h′",3)}) ≈ ${fmt(Math.round(Vc*100)/100)}. Thể tích chân đế ≈ ${fmt(Math.round(V*10)/10)} cm³.`,chk:()=>true}}
});
