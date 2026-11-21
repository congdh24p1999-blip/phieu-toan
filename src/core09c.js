/* ================================================================
   LỚP 9 – học kì I: bổ sung dạng đúng/sai, trả lời ngắn, tự luận cho các chương I – V
   ================================================================ */
/* ---------- Đúng/sai ---------- */
DS9('ds9-1-eq',1,'NB',[1],r=>{
  for(;;){const a=r.nz(-4,4),b=r.nz(-4,4),x0=r.int(-4,4),y0=r.int(-4,4),c=a*x0+b*y0,P=ptW([x0,y0]).find(p=>a*p[0]+b*p[1]!==c&&!(p[0]===c/b&&p[1]===0));if(!P||!x0||c%b||c===0||a*(c/b)===c)continue;
    return mkDS(r,{stem:`Cho phương trình ${eq2(a,b,c)} (1). Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`(1) là phương trình bậc nhất hai ẩn.`,f:`(1) không phải là phương trình bậc nhất hai ẩn.`,why:`Có dạng ax + by = c với a = ${sg(a)}, b = ${sg(b)}.`},
      {t:`Cặp số ${pr9([x0,y0])} là một nghiệm của (1).`,f:`Cặp số ${pr9(P)} là một nghiệm của (1).`,why:`Thay vào: ${sg(a*x0+b*y0)} = ${sg(c)}.`},
      {t:`(1) có vô số nghiệm.`,f:`(1) có đúng một nghiệm.`,why:`Phương trình bậc nhất hai ẩn luôn có vô số nghiệm.`},
      {t:`Cặp số (0; ${sg(c/b)}) là một nghiệm của (1).`,f:`Cặp số (${sg(c/b)}; 0) là một nghiệm của (1).`,why:`x = 0 ⇒ y = ${sg(c/b)}.`}],chk:()=>a*(c/b)!==c})}
});
DS9('ds9-3-word',1,'VD',[3],r=>{
  const w=word9(r),[[a1,b1,c1],[a2,b2,c2]]=w.sys;
  return mkDS(r,{stem:`${w.txt} Gọi ${I('x')} là ${w.vx}, ${I('y')} là ${w.vy}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${eq2(a1,b1,c1)}.`,f:`${eq2(a1,b1,c1+1)}.`,why:`Từ dữ kiện thứ nhất.`},
    {t:`${eq2(a2,b2,c2)}.`,f:`${eq2(b2,a2,c2)}.`,why:`Từ dữ kiện thứ hai.`},
    {t:`${w.vx[0].toUpperCase()+w.vx.slice(1)} là ${w.x}.`,f:`${w.vx[0].toUpperCase()+w.vx.slice(1)} là ${w.y===w.x?w.x+1:w.y}.`,why:`Giải hệ được x = ${w.x}.`},
    {t:`${w.vy[0].toUpperCase()+w.vy.slice(1)} là ${w.y}.`,f:`${w.vy[0].toUpperCase()+w.vy.slice(1)} là ${w.y+2}.`,why:`Giải hệ được y = ${w.y}.`}],chk:()=>true});
});
DS9('ds9-7-sqrt',3,'NB',[7,8,10],r=>{
  const a=r.int(2,12),b=r.nz(-5,5),p=r.int(2,9),q=r.pick([2,3,5,7]);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${rt(a*a)} = ${a}.`,f:`${rt(a*a)} = ±${a}.`,why:`Căn bậc hai số học là số không âm.`},
    {t:`${cbrt(sg(b**3))} = ${sg(b)}.`,f:`${cbrt(sg(b**3))} = ${sg(-b)}.`,why:`(${sg(b)})³ = ${sg(b**3)}.`},
    {t:`${rt(p*p*q)} = ${kr(p,q)}.`,f:`${rt(p*p*q)} = ${kr(q,p*p)}.`,why:`${rt(p*p*q)} = ${rt(p*p)}·${rt(q)}.`},
    {t:`${rt(`(${MINUS}${a})${sup(2)}`)} = ${a}.`,f:`${rt(`(${MINUS}${a})${sup(2)}`)} = ${MINUS}${a}.`,why:`${rt('A²')} = |A| = ${a}.`}],chk:()=>true});
});
DS9('ds9-9-expr',3,'VD',[9],r=>{
  for(;;){const a=r.int(1,4),E=EXPR9[2](a),x0=r.pick([0,1,4,16,25,36,49].filter(x=>E.ok(x))),v=E.val(x0),k=r.pick([[Q(3,2),3],[Q(5,3),2],[Q(7,5),4]]);if(!isInt(v*100))continue;
    return mkDS(r,{stem:`Cho biểu thức ${I('A')} = ${E.H} với ${E.cond}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Mẫu thức chung của các phân thức là ${I('x')} ${MINUS} ${a*a}.`,f:`Mẫu thức chung của các phân thức là (${I('x')} ${MINUS} ${a*a})${sup(2)}.`,why:`x − ${a*a} = (√x − ${a})(√x + ${a}).`},
      {t:`${I('A')} = ${E.simp}.`,f:`${I('A')} = ${fr(`${rt(I('x'))} + ${a}`,`${rt(I('x'))} ${MINUS} ${a}`)}.`,why:`Tử thức bằng (√x − ${a})(√x + ${3*a}).`},
      {t:`Khi ${I('x')} = ${x0} thì ${I('A')} = ${fmt(v)}.`,f:`Khi ${I('x')} = ${x0} thì ${I('A')} = ${fmt(v+1)}.`,why:`Thay x = ${x0} vào biểu thức đã rút gọn.`},
      {t:`${I('A')} = ${qh(k[0])} khi ${I('x')} = ${(k[1]*a)**2}.`,f:`${I('A')} = ${qh(k[0])} khi ${I('x')} = ${k[1]*a}.`,why:`A = ${qh(k[0])} ⟺ √x = ${k[1]*a}.`}],chk:()=>Math.abs(E.val((k[1]*a)**2)-k[0][0]/k[0][1])<1e-9})}
});
DS9('ds9-11-val',4,'NB',[11],r=>{
  const a=r.pick([20,25,35,40,50,55,70]),b=r.pick([30,45,60]);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`sin ${a}° = cos ${90-a}°.`,f:`sin ${a}° = sin ${90-a}°.`,why:`Hai góc phụ nhau.`},
    {t:`tan ${b}° = ${tvH(tv10('tan',b))}.`,f:`tan ${b}° = ${tvH(tv10('cot',b))===tvH(tv10('tan',b))?'2':tvH(tv10('cot',b))}.`,why:`Bảng tỉ số lượng giác của góc đặc biệt.`},
    {t:`tan ${a}°·cot ${a}° = 1.`,f:`tan ${a}°·cot ${a}° = 0.`,why:`tan α·cot α = 1.`},
    {t:`sin ${a}° < sin ${a+10}°.`,f:`sin ${a}° > sin ${a+10}°.`,why:`Với góc nhọn, góc càng lớn thì sin càng lớn.`}],chk:()=>b!==45||true});
});
DS9('ds9-12-real',4,'VD',[12],r=>{
  for(;;){const d=r.int(10,40),a=r.pick([...Array(36)].map((_,i)=>25+i).filter(v=>v!==45)),H=d*Math.tan(a*Math.PI/180),L=d/Math.cos(a*Math.PI/180),h1=Math.round(H*10)/10,l1=Math.round(L*10)/10;if(Math.abs(H*10-Math.round(H*10))>.45||Math.abs(L*10-Math.round(L*10))>.45)continue;
    return mkDS(r,{stem:`Một cột đèn có bóng trên mặt đất dài ${d} m, tia nắng tạo với mặt đất góc ${a}°.${fig9Pole(H,d,{ang:a+'°',d:d+' m'})}Xét tính đúng sai của các khẳng định sau (độ dài làm tròn đến hàng phần mười của mét):`,items:[
      {t:`Chiều cao cột đèn bằng ${d}·tan ${a}°.`,f:`Chiều cao cột đèn bằng ${d}·sin ${a}°.`,why:`Cạnh đối = cạnh kề · tan góc.`},
      {t:`Chiều cao cột đèn khoảng ${fmt(h1)} m.`,f:`Chiều cao cột đèn khoảng ${fmt(Math.round(d*Math.sin(a*Math.PI/180)*10)/10)} m.`,why:`${d}·tan ${a}° ≈ ${fmt(h1)}.`},
      {t:`Khoảng cách từ đỉnh cột đèn đến đầu bóng khoảng ${fmt(l1)} m.`,f:`Khoảng cách từ đỉnh cột đèn đến đầu bóng khoảng ${fmt(Math.round((d+H)*10)/10)} m.`,why:`Cạnh huyền = ${fr(d,`cos ${a}°`)} ≈ ${fmt(l1)}.`},
      {t:`Góc tạo bởi tia nắng và cột đèn bằng ${90-a}°.`,f:`Góc tạo bởi tia nắng và cột đèn bằng ${a}°.`,why:`Hai góc nhọn của tam giác vuông phụ nhau.`}],chk:()=>a!==45})}
});
DS9('ds9-13-circ',5,'NB',[13,14,16],r=>{
  const R=r.int(4,10),d=r.int(1,R-1),e=R+r.int(1,4);
  return mkDS(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Điểm ${I('M')} với ${I('OM')} = ${d} cm nằm bên trong đường tròn.`,f:`Điểm ${I('M')} với ${I('OM')} = ${d} cm nằm bên ngoài đường tròn.`,why:`${d} < ${R}.`},
    {t:`Dây lớn nhất của đường tròn dài ${2*R} cm.`,f:`Dây lớn nhất của đường tròn dài ${R} cm.`,why:`Dây lớn nhất là đường kính.`},
    {t:`Đường thẳng cách ${I('O')} một khoảng ${e} cm không giao với đường tròn.`,f:`Đường thẳng cách ${I('O')} một khoảng ${e} cm cắt đường tròn tại hai điểm.`,why:`${e} > ${R}.`},
    {t:`Đường tròn có vô số trục đối xứng.`,f:`Đường tròn có đúng một trục đối xứng.`,why:`Mọi đường thẳng qua tâm đều là trục đối xứng.`}],chk:()=>true});
});
DS9('ds9-17-two',5,'TH',[17],r=>{
  const R=r.int(5,10),rr=r.int(1,R-3),d=r.int(R-rr+1,R+rr-1),e=R+rr,f=R+rr+r.int(1,3);
  return mkDS(r,{stem:`Cho hai đường tròn (${I('O')}; ${R} cm) và (${I('O′')}; ${rr} cm). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Nếu ${I('OO′')} = ${d} cm thì hai đường tròn cắt nhau.`,f:`Nếu ${I('OO′')} = ${d} cm thì hai đường tròn tiếp xúc ngoài.`,why:`${R-rr} < ${d} < ${R+rr}.`},
    {t:`Nếu ${I('OO′')} = ${e} cm thì hai đường tròn tiếp xúc ngoài.`,f:`Nếu ${I('OO′')} = ${e} cm thì hai đường tròn cắt nhau.`,why:`OO′ = R + r.`},
    {t:`Nếu ${I('OO′')} = ${f} cm thì hai đường tròn ở ngoài nhau.`,f:`Nếu ${I('OO′')} = ${f} cm thì hai đường tròn tiếp xúc trong.`,why:`OO′ > R + r.`},
    {t:`Nếu ${I('OO′')} = ${R-rr} cm thì hai đường tròn tiếp xúc trong.`,f:`Nếu ${I('OO′')} = ${R-rr} cm thì hai đường tròn ở ngoài nhau.`,why:`OO′ = R − r.`}],chk:()=>true});
});
/* ---------- Trả lời ngắn ---------- */
TLN9('t9-1-m',1,'TH',[1,2],r=>{
  for(;;){const x0=r.nz(-4,4),y0=r.nz(-4,4),a=r.nz(-4,4),c=r.int(-9,9),m=(c-a*x0)/y0;if(!isInt(m))continue;
    return{kind:'tln',stem:`Tìm ${I('m')} để cặp số (${sg(x0)}; ${sg(y0)}) là một nghiệm của phương trình ${lin3H([a],['x'])} + ${I('m')}${I('y')} = ${sg(c)}.`,ans:m,unit:'',sol:`${pp10(`${sg(a)}·${sg(x0)}`)} + ${pp10('· '+sg(y0)).slice(2)}m = ${sg(c)} ⇒ m = ${sg(m)}.`,chk:()=>a*x0+m*y0===c}}
});
TLN9('t9-3-work',1,'VD',[3],r=>{
  for(;;){const a=r.int(6,40),b=r.int(6,40);if(a===b)continue;const T=a*b/(a+b);if(!isInt(T))continue;const ask=r.chance(.5);
    return{kind:'tln',stem:`Hai vòi nước cùng chảy vào một bể cạn thì sau ${T} giờ đầy bể. Nếu chảy riêng thì vòi thứ nhất chảy đầy bể nhanh hơn vòi thứ hai ${Math.abs(a-b)} giờ. Hỏi nếu chảy riêng thì vòi chảy ${a<b?(ask?'nhanh':'chậm'):(ask?'nhanh':'chậm')} hơn cần bao nhiêu giờ để đầy bể?`,ans:ask?Math.min(a,b):Math.max(a,b),unit:'giờ',
      sol:`Gọi x (giờ) là thời gian vòi nhanh hơn chảy đầy bể thì vòi kia cần x + ${Math.abs(a-b)} giờ: ${fr(1,'x')} + ${fr(1,`x + ${Math.abs(a-b)}`)} = ${fr(1,T)}. Giải được x = ${Math.min(a,b)}; vòi chậm hơn cần ${Math.max(a,b)} giờ.`,chk:()=>Math.abs(1/a+1/b-1/T)<1e-12}}
});
TLN9('t9-4-prod',2,'TH',[4],r=>{
  for(;;){const a=r.pick([1,2,3]),p=r.int(-6,6),c=r.pick([1,2,4]),q=r.int(-6,6),e=r.pick([1,3]),u=r.int(-6,6);const S=[...new Set([p,q,u])];if(S.length<2)continue;
    return{kind:'tln',stem:`Tính tổng các nghiệm của phương trình (${xlin(a,-a*p)})(${xlin(c,-c*q)})(${xlin(e,-e*u)}) = 0.`,ans:S.reduce((s,x)=>s+x,0),unit:'',sol:`Các nghiệm: ${S.map(sg).join('; ')}. Tổng bằng ${sg(S.reduce((s,x)=>s+x,0))}.`,chk:()=>true}}
});
TLN9('t9-7-cond',3,'TH',[7],r=>{
  const a=r.int(1,8),b=r.int(1,8),cnt=a+b+1;
  return{kind:'tln',stem:`Có bao nhiêu số nguyên ${I('x')} để biểu thức ${rt(xlin(-1,a))} + ${rt(xlin(1,b))} xác định?`,ans:cnt,unit:'',sol:`Cần ${a} − x ≥ 0 và x + ${b} ≥ 0 ⟺ −${b} ≤ x ≤ ${a}; có ${cnt} số nguyên.`,chk:()=>true};
});
TLN9('t9-8-calc',3,'TH',[8,9],r=>{
  const [a,b]=r.pick([[2,8],[3,12],[2,18],[5,20],[3,27],[2,32],[6,24],[7,28]]),[c,d]=r.pick([[50,2],[72,2],[75,3],[48,3],[98,2],[80,5]]),k=r.int(2,5),v=Math.sqrt(a*b)+k*Math.sqrt(c/d);
  return{kind:'tln',stem:`Tính giá trị của biểu thức ${rt(a)}·${rt(b)} + ${k}·${fr(rt(c),rt(d))}.`,ans:v,unit:'',sol:`${rt(a)}·${rt(b)} = ${rt(a*b)} = ${Math.sqrt(a*b)}; ${fr(rt(c),rt(d))} = ${rt(c/d)} = ${Math.sqrt(c/d)}. Kết quả: ${Math.sqrt(a*b)} + ${k}·${Math.sqrt(c/d)} = ${v}.`,chk:()=>isInt(v)};
});
TLN9('t9-9-int',3,'VD',[9],r=>{
  for(;;){const a=r.int(1,4),b=r.int(2,12);let cnt=0;const xs=[];for(let s=0;s<=60;s++)if(b%(s+a)===0){cnt++;xs.push(s*s)}if(!cnt)continue;
    return{kind:'tln',stem:`Cho biểu thức ${I('B')} = ${fr(`${rt(I('x'))} + ${a+b}`,`${rt(I('x'))} + ${a}`)} với ${I('x')} ≥ 0. Có bao nhiêu số chính phương ${I('x')} để ${I('B')} nhận giá trị nguyên?`,ans:cnt,unit:'',sol:`B = 1 + ${fr(b,`√x + ${a}`)}; x chính phương nên √x ∈ ℕ, B nguyên ⟺ √x + ${a} là ước dương của ${b} và √x + ${a} ≥ ${a}: x ∈ {${xs.join('; ')}}, có ${cnt} giá trị.`,chk:()=>true}}
});
TLN9('t9-11-calc',4,'TH',[11,12],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,3),AB=p*k,BC=h*k,AC=q*k;
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${AB} cm và sin ${I('C')} = ${qh(Q(p,h))} (hình vẽ).${fig9Right(AB,AC,{lens:[['A','B',AB+' cm']]})}Tính độ dài cạnh ${I('AC')} (đơn vị: cm).`,ans:AC,unit:'cm',sol:`sin C = ${fr('AB','BC')} ⇒ BC = AB : sin C = ${AB} : ${qh(Q(p,h))} = ${BC}; AC = √(${BC}² − ${AB}²) = ${AC} (cm).`,chk:()=>BC*BC===AB*AB+AC*AC};
});
TLN9('t9-15-ring',5,'TH',[15],r=>{
  for(;;){const R=r.int(4,15),r1=r.int(2,R-1),v=Math.PI*(R*R-r1*r1),a=Math.round(v*10)/10;if(Math.abs(v*10-Math.round(v*10))>.45||a>=1000)continue;
    return{kind:'tln',stem:`Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm có bán kính ${R} cm và ${r1} cm (đơn vị: cm², làm tròn kết quả đến hàng phần mười).`,ans:a,unit:'cm²',sol:`S = π(${R}² − ${r1}²) = ${R*R-r1*r1}π ≈ ${fmt(a)} (cm²).`,chk:()=>true}}
});
TLN9('t9-16-angle',5,'VD',[16],r=>{
  for(;;){const R=r.int(2,10),MA=r.int(3,20),ang=2*Math.atan(R/MA)*180/Math.PI,v=Math.round(ang);if(Math.abs(ang-v)>.45)continue;
    return{kind:'tln',stem:`Từ điểm ${I('M')} nằm ngoài đường tròn (${I('O')}; ${R} cm), kẻ hai tiếp tuyến ${I('MA')}, ${I('MB')} (${I('A')}, ${I('B')} là tiếp điểm) với ${I('MA')} = ${MA} cm.${fig9Tan(R,Math.hypot(R,MA),{angs:[['A','M','B','?']]})}Tính số đo góc ${I('AMB')} (đơn vị: độ, làm tròn kết quả đến hàng đơn vị).`,ans:v,unit:'°',sol:`tan ${'AMO'} = ${fr('OA','MA')} = ${fr(R,MA)} ⇒ góc AMO ≈ ${fmt(Math.round(ang/2*100)/100)}°; MO là phân giác nên góc AMB = 2·góc AMO ≈ ${v}°.`,chk:()=>true}}
});
/* ---------- Tự luận ---------- */
TL9('tl9-4-frac',2,'VD','alg',[4,6],r=>{
  const F=frac9(r),c=r.int(2,5),a=r.pick([2,3,4,5,6].filter(v=>v!==c+1)),x0=r.int(-4,5),b=-a*x0;
  return{kind:'tl',title:'Phương trình và bất phương trình',parts:[{pts:.5,html:`Giải phương trình ${frac9H(F)}.`},{pts:.5,html:`Giải bất phương trình ${fr(xlin(a,b),c)} ≥ ${fr(xlin(1,-x0),c)} + ${I('x')} ${MINUS} ${x0>=0?x0:'('+sg(x0)+')'}.`}],
    sol:[ptxt([[`ĐKXĐ: x ≠ ${sg(F.p)}, x ≠ ${sg(F.q)}; quy đồng và khử mẫu được ${xquad(F.A,F.B,F.C)} = 0.`,.25],[`Đối chiếu điều kiện: S = {${F.sols.map(sg).join('; ')}}.`,.25]]),
      ptxt([[`Nhân hai vế với ${c} > 0: ${xlin(a,b)} ≥ ${xlin(1,-x0)} + ${c}(${xlin(1,-x0)}) ⟺ ${a}(${xlin(1,-x0)}) ≥ ${c+1}(${xlin(1,-x0)}).`,.25],[`⟺ ${a-c-1===1?'':a-c-1===-1?MINUS:sg(a-c-1)}(${xlin(1,-x0)}) ≥ 0 ⟺ ${xlin(1,-x0)} ${a-c-1>0?'≥':'≤'} 0 ⟺ x ${a-c-1>0?'≥':'≤'} ${sg(x0)}.`,.25]])],chk:()=>a!==c+1};
});
TL9('tl9-6-simple',2,'TH','real',[6],r=>{
  const p=r.int(3,8)*1000,M=r.int(50,150)*1000,n=Math.floor(M/p),q=r.int(20,40),T=r.int(60,120),k=Math.ceil(T/q)-1;
  return{kind:'tl',title:'Bất phương trình trong thực tế',parts:[{pts:.5,html:`Bạn An có ${M.toLocaleString('vi-VN')} đồng và muốn mua bút bi, mỗi chiếc giá ${p.toLocaleString('vi-VN')} đồng. Viết bất phương trình biểu thị số bút ${I('x')} An mua được và tìm số bút nhiều nhất.`},{pts:.5,html:`Một thang máy chở tối đa ${T*10} kg. Người vận hành nặng ${q*2+20} kg, mỗi thùng hàng nặng ${q*3} kg. Thang máy chở được nhiều nhất bao nhiêu thùng hàng cùng người vận hành?`}],
    sol:[ptxt([[`${p.toLocaleString('vi-VN')}x ≤ ${M.toLocaleString('vi-VN')} ⟺ x ≤ ${qh(Q(M,p))}.`,.25],[`An mua được nhiều nhất ${n} chiếc bút.`,.25]]),ptxt([[`Gọi y là số thùng: ${q*2+20} + ${q*3}y ≤ ${T*10} ⟺ y ≤ ${qh(Q(T*10-q*2-20,q*3))}.`,.25],[`Chở được nhiều nhất ${Math.floor((T*10-q*2-20)/(q*3))} thùng.`,.25]])],chk:()=>k>=0&&T*10>q*2+20};
});
TL9('tl9-8-calc',3,'TH','rad',[8,10],r=>{
  const [a,b]=r.pick([[2,8],[3,12],[2,18],[5,20],[3,27],[2,32],[6,24]]),[c,d]=r.pick([[50,2],[72,2],[75,3],[48,3],[98,2],[80,5]]),m=r.nz(-5,5),n=r.int(2,4);
  return{kind:'tl',title:'Tính giá trị biểu thức chứa căn',parts:[{pts:.5,html:`Tính ${I('A')} = ${rt(a)}·${rt(b)} ${MINUS} ${fr(rt(c),rt(d))}.`},{pts:.5,html:`Tính ${I('B')} = ${cbrt(sg(m**3))} + ${n}${rt(`(${MINUS}${n+1})${sup(2)}`)}.`}],
    sol:[ptxt([[`${rt(a)}·${rt(b)} = ${rt(a*b)} = ${Math.sqrt(a*b)}; ${fr(rt(c),rt(d))} = ${rt(c/d)} = ${Math.sqrt(c/d)}.`,.25],[`A = ${sg(Math.sqrt(a*b)-Math.sqrt(c/d))}.`,.25]]),ptxt([[`${cbrt(sg(m**3))} = ${sg(m)}; ${rt(`(−${n+1})²`)} = ${n+1}.`,.25],[`B = ${sg(m)} + ${n}·${n+1} = ${sg(m+n*(n+1))}.`,.25]])],chk:()=>true};
});
TL9('tl9-9-expr2',3,'VD','rad',[9],r=>{
  const a=r.int(1,4),E=EXPR9[0](a),k=r.pick([...Array(7)].map((_,i)=>a+1+i).filter(v=>v!==2*a)),x=(k-a)**2;
  return{kind:'tl',title:'Rút gọn biểu thức chứa căn',parts:[{pts:.5,html:`Cho biểu thức ${I('A')} = ${E.H} với ${E.cond}. Rút gọn ${I('A')}.`},{pts:.5,html:`Tìm ${I('x')} để ${I('A')} = ${k}. So sánh ${I('A')} với ${a}.`}],
    sol:[ptxt([[`x − ${a*a} = (√x − ${a})(√x + ${a}).`,.25],[`A = √x + ${a}.`,.25]]),ptxt([[`A = ${k} ⟺ √x = ${k-a} ⟺ x = ${x} (thoả mãn).`,.25],[`Vì √x ≥ 0 nên A = √x + ${a} ≥ ${a}; dấu "=" xảy ra khi x = 0. Vậy A ≥ ${a}.`,.25]])],chk:()=>x!==a*a};
});
TL9('tl9-9-min',3,'VDC','rad',[9],r=>{
  const a=r.int(1,4),c=r.int(a*a+1,a*a+9);/* P = x − 2a√x + c = (√x − a)² + c − a² */
  return{kind:'tl',title:'Giá trị nhỏ nhất của biểu thức chứa căn',parts:[{pts:.5,html:`Cho biểu thức ${I('P')} = ${I('x')} ${MINUS} ${2*a}${rt(I('x'))} + ${c} với ${I('x')} ≥ 0. Chứng minh ${I('P')} > 0 với mọi ${I('x')} ≥ 0.`},{pts:.5,html:`Tìm giá trị nhỏ nhất của ${I('P')}. Từ đó tìm giá trị lớn nhất của biểu thức ${I('Q')} = ${fr(1,I('P'))}.`}],
    sol:[ptxt([[`P = (√x)² − 2·${a}·√x + ${a*a} + ${c-a*a} = (√x − ${a})² + ${c-a*a}.`,.25],[`Vì (√x − ${a})² ≥ 0 nên P ≥ ${c-a*a} > 0.`,.25]]),ptxt([[`P nhỏ nhất bằng ${c-a*a} khi √x = ${a} ⟺ x = ${a*a}.`,.25],[`Khi đó Q = 1/P lớn nhất bằng ${fr(1,c-a*a)} tại x = ${a*a}.`,.25]])],chk:()=>c>a*a};
});
TL9('tl9-12-two',4,'VDC','geo',[12],r=>{
  for(;;){const a=r.pick([30,35,40]),b=r.pick([50,55,60]),d=r.int(10,40),ta=Math.tan(a*Math.PI/180),tb=Math.tan(b*Math.PI/180),h=d*ta*tb/(tb-ta),x=h/tb;
    return{kind:'tl',title:'Đo chiều cao bằng hai lần quan sát',parts:[{pts:.5,html:`Để đo chiều cao ${I('h')} của một ngọn tháp, người ta đứng tại điểm ${I('A')} nhìn đỉnh tháp với góc nâng ${a}°, sau đó tiến thêm ${d} m về phía chân tháp đến điểm ${I('B')} thì nhìn đỉnh tháp với góc nâng ${b}° (${I('A')}, ${I('B')} và chân tháp thẳng hàng; bỏ qua chiều cao người quan sát).${fig9Tower(h,x,d,a,b)}Gọi ${I('x')} là khoảng cách từ ${I('B')} đến chân tháp. Lập hai biểu thức tính ${I('h')} theo ${I('x')}.`},{pts:.5,html:`Tính chiều cao ${I('h')} của tháp (làm tròn đến hàng phần mười của mét).`}],
      sol:[ptxt([[`h = x·tan ${b}°.`,.25],[`h = (x + ${d})·tan ${a}°.`,.25]]),ptxt([[`x·tan ${b}° = (x + ${d})·tan ${a}° ⇒ x = ${fr(`${d}·tan ${a}°`,`tan ${b}° − tan ${a}°`)} ≈ ${fmt(Math.round(x*100)/100)} (m).`,.25],[`h = x·tan ${b}° ≈ ${fmt(Math.round(h*10)/10)} (m).`,.25]])],chk:()=>h>0}}
});
/* ---------- Đúng/sai (bổ sung đợt 2) ---------- */
DS9('ds9-1-line',1,'NB',[1],r=>{
  for(;;){const a=r.nz(-4,4),b=r.nz(-4,4),m=r.nz(-3,3),c=a*b*m;if(a===b||Math.abs(a)===Math.abs(b))continue;const x1=r.nz(-3,3)*b,y1=(c-a*x1)/b;
    return mkDS(r,{stem:`Cho phương trình ${eq2(a,b,c)} (1). Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Phương trình (1) có các hệ số ${I('a')} = ${sg(a)}, ${I('b')} = ${sg(b)}, ${I('c')} = ${sg(c)}.`,f:`Phương trình (1) có các hệ số ${I('a')} = ${sg(b)}, ${I('b')} = ${sg(a)}, ${I('c')} = ${sg(c)}.`,why:`So sánh với dạng ax + by = c.`},
      {t:`Tập nghiệm của (1) được biểu diễn bởi một đường thẳng trên mặt phẳng tọa độ.`,f:`Tập nghiệm của (1) được biểu diễn bởi một parabol trên mặt phẳng tọa độ.`,why:`Phương trình ax + by = c (a, b không đồng thời bằng 0) có tập nghiệm được biểu diễn bởi một đường thẳng.`},
      {t:`Đường thẳng biểu diễn tập nghiệm của (1) cắt trục ${I('Oy')} tại điểm (0; ${sg(c/b)}).`,f:`Đường thẳng biểu diễn tập nghiệm của (1) cắt trục ${I('Oy')} tại điểm (0; ${sg(c/a)}).`,why:`Cho x = 0 ⇒ y = ${fr(sg(c),sg(b))} = ${sg(c/b)}.`},
      {t:`Nếu ${I('x')} = ${sg(x1)} thì ${I('y')} = ${sg(y1)}.`,f:`Nếu ${I('x')} = ${sg(x1)} thì ${I('y')} = ${sg(-y1||1)}.`,why:`${pp10(`${sg(a)}·${sg(x1)}`)} ${b>0?'+':MINUS} ${Math.abs(b)===1?'':Math.abs(b)}${I('y')} = ${sg(c)} ⇒ y = ${sg(y1)}.`}],chk:()=>isInt(y1)&&c/a!==c/b&&y1!==(-y1||1)})}
});
DS9('ds9-2-subst',1,'TH',[2],r=>{
  for(;;){const x0=r.int(-5,5),y0=r.int(-5,5),b1=r.nz(-4,4),a2=r.nz(-4,4),b2=r.nz(-5,5),D=b2-a2*b1;if(!D||b2+a2*b1===D)continue;const c1=x0+b1*y0,c2=a2*x0+b2*y0,
    xe=(k)=>`${c1===0?'':sg(c1)+' '}${k>0?(c1===0?MINUS:MINUS+' '):(c1===0?'':'+ ')}${Math.abs(k)===1?'':Math.abs(k)}${I('y')}`;
    return mkDS(r,{stem:`Giải hệ phương trình ${sys9([1,b1,c1],[a2,b2,c2])} bằng phương pháp thế. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Từ phương trình thứ nhất ta có ${I('x')} = ${xe(b1)}.`,f:`Từ phương trình thứ nhất ta có ${I('x')} = ${xe(-b1)}.`,why:`Chuyển ${lin3H([0,b1],['x','y']).replace(/^0x \+ /,'')} sang vế phải và đổi dấu.`},
      {t:`Thế vào phương trình thứ hai được ${lin3H([D],['y'])} = ${sg(c2-a2*c1)}.`,f:`Thế vào phương trình thứ hai được ${lin3H([b2+a2*b1],['y'])} = ${sg(c2-a2*c1)}.`,why:`${sg(a2)}(${xe(b1)}) ${b2>0?'+':MINUS} ${Math.abs(b2)===1?'':Math.abs(b2)}${I('y')} = ${sg(c2)} ⟺ ${lin3H([D],['y'])} = ${sg(c2-a2*c1)}.`},
      {t:`${I('y')} = ${sg(y0)}.`,f:`${I('y')} = ${sg(y0+1)}.`,why:`y = ${fr(sg(c2-a2*c1),sg(D))} = ${sg(y0)}.`},
      {t:`${I('x')} = ${sg(x0)}.`,f:`${I('x')} = ${sg(x0?-x0:2)}.`,why:`x = ${sg(c1)} − ${b1<0?'('+sg(b1)+')':b1}·${y0<0?'('+sg(y0)+')':y0} = ${sg(x0)}.`}],chk:()=>x0+b1*y0===c1&&a2*x0+b2*y0===c2})}
});
DS9('ds9-8-ops',3,'TH',[8,10],r=>{
  const [a,b]=r.pick([[2,8],[3,12],[2,18],[5,20],[3,27],[2,32],[6,24]]),[c,d]=r.pick([[50,2],[72,2],[75,3],[48,3],[98,2],[80,5]]),k=r.int(2,6),m=r.int(2,5);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${rt(a)}·${rt(b)} = ${Math.sqrt(a*b)}.`,f:`${rt(a)}·${rt(b)} = ${a*b}.`,why:`${rt(a)}·${rt(b)} = ${rt(a*b)} = ${Math.sqrt(a*b)}.`},
    {t:`${fr(rt(c),rt(d))} = ${Math.sqrt(c/d)}.`,f:`${fr(rt(c),rt(d))} = ${c/d}.`,why:`${fr(rt(c),rt(d))} = ${rt(c/d)} = ${Math.sqrt(c/d)}.`},
    {t:`${rt(`${k*k}${I('x')}${sup(2)}`)} = ${MINUS}${k}${I('x')} với ${I('x')} < 0.`,f:`${rt(`${k*k}${I('x')}${sup(2)}`)} = ${k}${I('x')} với ${I('x')} < 0.`,why:`${rt(`${k*k}x²`)} = ${k}|x| = −${k}x khi x < 0.`},
    {t:`${cbrt(MINUS+(m**3))} + ${rt(m*m)} = 0.`,f:`${cbrt(MINUS+(m**3))} + ${rt(m*m)} = ${2*m}.`,why:`${cbrt(MINUS+(m**3))} = −${m}, ${rt(m*m)} = ${m}.`}],chk:()=>isInt(Math.sqrt(a*b))&&isInt(Math.sqrt(c/d))});
});
DS9('ds9-9-min',3,'VD',[9],r=>{
  const a=r.int(2,5),c=r.int(a*a+1,a*a+9),P=`${I('x')} ${MINUS} ${2*a}${rt(I('x'))} + ${c}`;
  return mkDS(r,{stem:`Cho biểu thức ${I('P')} = ${P} với ${I('x')} ≥ 0. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('P')} = (${rt(I('x'))} ${MINUS} ${a})${sup(2)} + ${c-a*a}.`,f:`${I('P')} = (${rt(I('x'))} + ${a})${sup(2)} + ${c-a*a}.`,why:`x − ${2*a}√x + ${a*a} = (√x − ${a})².`},
    {t:`${I('P')} ≥ ${c-a*a} với mọi ${I('x')} ≥ 0.`,f:`${I('P')} ≥ ${c} với mọi ${I('x')} ≥ 0.`,why:`(√x − ${a})² ≥ 0; tại x = ${a*a} thì P = ${c-a*a} < ${c}.`},
    {t:`${I('P')} đạt giá trị nhỏ nhất khi ${I('x')} = ${a*a}.`,f:`${I('P')} đạt giá trị nhỏ nhất khi ${I('x')} = ${a}.`,why:`Dấu "=" xảy ra khi √x = ${a} ⟺ x = ${a*a}.`},
    {t:`Phương trình ${I('P')} = ${c} có hai nghiệm.`,f:`Phương trình ${I('P')} = ${c} có đúng một nghiệm.`,why:`P = ${c} ⟺ √x(√x − ${2*a}) = 0 ⟺ x = 0 hoặc x = ${4*a*a}.`}],chk:()=>c>a*a});
});
DS9('ds9-11-def',4,'NB',[11],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2),AB=p*k,AC=q*k,BC=h*k;
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm, ${I('BC')} = ${BC} cm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`sin ${I('B')} = ${fr(I('AC'),I('BC'))}.`,f:`sin ${I('B')} = ${fr(I('AB'),I('BC'))}.`,why:`sin B = cạnh đối/cạnh huyền.`},
    {t:`cos ${I('B')} = sin ${I('C')}.`,f:`cos ${I('B')} = cos ${I('C')}.`,why:`B và C là hai góc phụ nhau.`},
    {t:`tan ${I('B')} = ${qh(Q(AC,AB))}.`,f:`tan ${I('B')} = ${qh(Q(AB,AC))}.`,why:`tan B = ${fr('AC','AB')} = ${fr(AC,AB)}.`},
    {t:`${I('B')} + ${I('C')} = 90°.`,f:`${I('B')} + ${I('C')} = 180°.`,why:`Tổng hai góc nhọn của tam giác vuông bằng 90°.`}],chk:()=>AB!==AC});
});
DS9('ds9-12-solve',4,'TH',[12],r=>{
  const k=r.int(1,5),a=4*k,be=r.pick([30,60]),AC=be===30?String(2*k):kr(2*k,3),AB=be===30?kr(2*k,3):String(2*k);
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('BC')} = ${a} cm và góc ${I('B')} = ${be}° (hình vẽ).${fig9Right(a*Math.cos(be*Math.PI/180),a*Math.sin(be*Math.PI/180),{lens:[['B','C',a+' cm']],angs:[['C','B','A',be+'°']]})}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Góc ${I('C')} = ${90-be}°.`,f:`Góc ${I('C')} = ${90+be}°.`,why:`B + C = 90°.`},
    {t:`${I('AC')} = ${I('BC')}·sin ${I('B')}.`,f:`${I('AC')} = ${I('BC')}·cos ${I('B')}.`,why:`AC là cạnh đối của góc B.`},
    {t:`${I('AC')} = ${AC} cm.`,f:`${I('AC')} = ${AB} cm.`,why:`AC = ${a}·sin ${be}° = ${AC}.`},
    {t:`Diện tích tam giác ${I('ABC')} bằng ${kr(2*k*k,3)} cm².`,f:`Diện tích tam giác ${I('ABC')} bằng ${kr(4*k*k,3)} cm².`,why:`S = ${fr(1,2)}·AB·AC = ${fr(1,2)}·${2*k}·${kr(2*k,3)} = ${kr(2*k*k,3)}.`}],chk:()=>true});
});
DS9('ds9-14-chord',5,'VD',[14],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,2),R=h*k,d=p*k,hc=q*k;
  return mkDS(r,{stem:`Cho đường tròn (${I('O')}; ${R} cm) và dây ${I('AB')} cách tâm ${I('O')} một khoảng ${d} cm. Gọi ${I('H')} là trung điểm của ${I('AB')}.${fig9Chord(R,d)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('OH')} vuông góc với ${I('AB')}.`,f:`${I('OH')} không vuông góc với ${I('AB')}.`,why:`Đường kính đi qua trung điểm của dây (không qua tâm) thì vuông góc với dây đó.`},
    {t:`${I('AB')} = ${2*hc} cm.`,f:`${I('AB')} = ${hc} cm.`,why:`AH = √(${R}² − ${d}²) = ${hc} ⇒ AB = ${2*hc}.`},
    {t:`Diện tích tam giác ${I('OAB')} bằng ${d*hc} cm².`,f:`Diện tích tam giác ${I('OAB')} bằng ${2*d*hc} cm².`,why:`S = ${fr(1,2)}·OH·AB = ${fr(1,2)}·${d}·${2*hc} = ${d*hc}.`},
    {t:`Dây ${I('CD')} cách tâm ${I('O')} một khoảng nhỏ hơn ${d} cm thì ${I('CD')} > ${I('AB')}.`,f:`Dây ${I('CD')} cách tâm ${I('O')} một khoảng nhỏ hơn ${d} cm thì ${I('CD')} < ${I('AB')}.`,why:`Dây nào gần tâm hơn thì dây đó lớn hơn.`}],chk:()=>R*R===d*d+hc*hc});
});
TLN9('t9-12-per',4,'TH',[11,12],r=>{
  const [p,q,h]=r.pick(PYT9),k=r.int(1,3),AB=p*k,AC=q*k,BC=h*k;
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('BC')} = ${BC} cm và cos ${I('B')} = ${qh(Q(p,h))}. Tính chu vi tam giác ${I('ABC')} (đơn vị: cm).`,ans:AB+AC+BC,unit:'cm',sol:`AB = BC·cos B = ${AB}; AC = √(${BC}² − ${AB}²) = ${AC}. Chu vi = ${AB} + ${AC} + ${BC} = ${AB+AC+BC} (cm).`,chk:()=>BC*BC===AB*AB+AC*AC};
});
