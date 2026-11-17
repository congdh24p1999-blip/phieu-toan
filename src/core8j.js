/* ===== Toán 8 học kì I: thêm dạng câu trả lời ngắn để các đề không lặp cùng một dạng ===== */
/* ---------- Chương I: Đa thức ---------- */
TLN('tln-c1-val',1,'TH',r=>{
  const a=r.nz(-4,4),b=r.nz(-4,4),c=r.nz(-9,9),x0=r.nz(-3,3),y0=r.nz(-2,2);
  const P=Pl.from([{c:a,ex:2,ey:1},{c:b,ex:1,ey:2},{c:c,ex:0,ey:0}]),v=Pl.ev(P,x0,y0);
  return{kind:'tln',stem:`Tính giá trị của đa thức ${I('P')} = ${ph(P)} tại ${I('x')} = ${sg(x0)} và ${I('y')} = ${sg(y0)}.`,ans:v,unit:'',
    sol:`Thay x = ${sg(x0)}, y = ${sg(y0)}: ${sg(a)}·(${sg(x0)})²·(${sg(y0)}) = ${sg(a*x0*x0*y0)}; ${sg(b)}·(${sg(x0)})·(${sg(y0)})² = ${sg(b*x0*y0*y0)}. Vậy P = ${sg(a*x0*x0*y0)} ${b*x0*y0*y0<0?MINUS:'+'} ${Math.abs(b*x0*y0*y0)} ${c<0?MINUS:'+'} ${Math.abs(c)} = ${sg(v)}.`,
    chk:()=>v===a*x0*x0*y0+b*x0*y0*y0+c};
});
TLN('tln-c1-mul',1,'TH',r=>{
  const a=r.nz(-4,4),b=r.nz(-6,6),c=r.nz(-3,3),d=r.nz(-6,6),e=r.nz(-6,6),A=lin(a,b),B=Pl.from([{c,ex:2,ey:0},{c:d,ex:1,ey:0},{c:e,ex:0,ey:0}]);
  const k=r.pick([2,1]),co=k===2?a*d+b*c:a*e+b*d;
  if(co===0)return T.tln['tln-c1-mul'].gen(r);
  return{kind:'tln',stem:`Sau khi thực hiện phép nhân ${par(A)}${par(B)} và thu gọn, hệ số của ${k===2?`${I('x')}${sup(2)}`:I('x')} bằng bao nhiêu?`,ans:co,unit:'',
    sol:`${par(A)}${par(B)} = ${ph(Pl.mul(A,B))}. Hệ số của ${k===2?'x²':'x'} là ${sg(co)}.`,chk:()=>Pl.mul(A,B)[k+',0']===co};
});
TLN('tln-c1-deg',1,'TH',r=>{
  /* hạng tử bậc cao nhất triệt tiêu, bậc thật nhỏ hơn bậc "nhìn thấy" */
  const top=r.pick([[3,2],[2,3],[4,1]]),c=r.nz(-6,6),mid=r.pick([[2,2],[3,1],[1,3]]),lo=r.pick([[1,1],[2,0],[0,2]]);
  const terms=r.shuffle([{c,ex:top[0],ey:top[1]},{c:-c,ex:top[0],ey:top[1]},{c:r.nz(-5,5),ex:mid[0],ey:mid[1]},{c:r.nz(-5,5),ex:lo[0],ey:lo[1]},{c:r.nz(-9,9),ex:0,ey:0}]);
  const P=Pl.from(terms),deg=mid[0]+mid[1];
  return{kind:'tln',stem:`Tìm bậc của đa thức ${I('P')} = ${termsHTML(terms)} (sau khi thu gọn).`,ans:deg,unit:'',
    sol:`Hai hạng tử ${termsHTML([{c,ex:top[0],ey:top[1]}])} và ${termsHTML([{c:-c,ex:top[0],ey:top[1]}])} triệt tiêu nhau. Thu gọn: ${I('P')} = ${ph(P)}, có bậc ${deg}.`,
    chk:()=>Math.max(...Object.keys(P).map(k=>k.split(',').map(Number).reduce((a,b)=>a+b)))===deg};
});
TLN('tln-c1-div',1,'VD',r=>{
  const shapes=r.shuffle([[2,0],[1,0],[0,1],[1,1],[0,0]]).slice(0,3),Q=Pl.from(shapes.map(([ex,ey])=>({c:r.nz(-4,4),ex,ey})));
  const m={c:r.pick([2,3,-2,-3,4]),ex:2,ey:1},P=Pl.mul(Q,Pl.from([m])),x0=r.nz(-2,3),y0=r.nz(-2,2),v=Pl.ev(Q,x0,y0);
  return{kind:'tln',stem:`Gọi ${I('Q')} là thương của phép chia ${par(P)} : ${termsHTML([m])}. Tính giá trị của ${I('Q')} tại ${I('x')} = ${sg(x0)}, ${I('y')} = ${sg(y0)}.`,ans:v,unit:'',
    sol:`Chia từng hạng tử cho ${termsHTML([m])}: ${I('Q')} = ${ph(Q)}. Tại x = ${sg(x0)}, y = ${sg(y0)}: ${I('Q')} = ${sg(v)}.`,chk:()=>Pl.eq(Pl.mul(Q,Pl.from([m])),P)};
});
TLN('tln-c1-noterm',1,'VD',r=>{
  const k=r.int(1,4),b=r.int(1,6),c=r.nz(-9,9),a=k*b;
  const X=I('x'),Aa=I('a');
  return{kind:'tln',stem:`Tìm số ${Aa} để biểu thức (${k===1?'':k}${X} + ${Aa})(${X} ${MINUS} ${b}) ${MINUS} ${k===1?'':k}${X}${sup(2)} ${c<0?'+':MINUS} ${Math.abs(c)} không chứa hạng tử bậc nhất của ${X}.`,ans:a,unit:'',
    sol:`(${k===1?'':k}x + a)(x − ${b}) = ${k===1?'':k}x² + (a − ${k*b})x − ${b}a. Biểu thức bằng (a − ${k*b})x − ${b}a ${c<0?'+':'−'} ${Math.abs(c)}; không chứa hạng tử bậc nhất khi a − ${k*b} = 0, tức a = ${a}.`,
    chk:()=>{const e=Pl.sub(Pl.mul(lin(k,a),lin(1,-b)),Pl.m(k,2,0));return !e['1,0']}};
});
TLN('tln-c1-garden',1,'VD',r=>{
  const a=r.int(2,8),d=r.pick([1,2]),x0=r.int(6,15);
  const S1=x0*(x0+a),S2=(x0-d)*(x0+a-d),down=S1-S2;
  return{kind:'tln',stem:`Một mảnh vườn hình chữ nhật có chiều rộng ${I('x')} (m) và chiều dài hơn chiều rộng ${a} m. Người ta giảm mỗi chiều đi ${d} m. Biểu thức biểu thị phần diện tích bị giảm là một đa thức theo ${I('x')}. Tính phần diện tích bị giảm khi ${I('x')} = ${x0} (đơn vị: m²).`,ans:down,unit:'m²',
    sol:`Phần diện tích giảm: ${I('x')}(${I('x')} + ${a}) − (${I('x')} − ${d})(${I('x')} + ${a-d}) = ${2*d}${I('x')} + ${d*a-d*d}. Với x = ${x0}: ${2*d}·${x0} + ${d*a-d*d} = ${down} m².`,
    chk:()=>down===2*d*x0+d*a-d*d};
});
/* ---------- Chương II: Hằng đẳng thức ---------- */
TLN('tln-c2-diff',2,'VD',r=>{
  const [x,y]=(()=>{for(;;){const a=r.int(2,12),b=r.int(1,11);if(a>b)return[a,b]}})(),d=x-y,p=x*y,k=r.int(0,1);
  return k?{kind:'tln',stem:`Cho ${I('x')} ${MINUS} ${I('y')} = ${d} và ${I('xy')} = ${p}. Tính giá trị của biểu thức ${I('x')}${sup(2)} + ${I('y')}${sup(2)}.`,ans:d*d+2*p,unit:'',
      sol:`x² + y² = (x − y)² + 2xy = ${d}² + 2·${p} = ${d*d+2*p}.`}
    :{kind:'tln',stem:`Cho ${I('x')} ${MINUS} ${I('y')} = ${d} và ${I('xy')} = ${p}. Tính giá trị của biểu thức (${I('x')} + ${I('y')})${sup(2)}.`,ans:d*d+4*p,unit:'',
      sol:`(x + y)² = (x − y)² + 4xy = ${d}² + 4·${p} = ${d*d+4*p}.`};
});
TLN('tln-c2-sub',2,'TH',r=>{
  const f=r.int(0,3);
  if(f===0){const n=r.pick([99,999,49,199,101,1001,51]),x=n,s=n+1;return{kind:'tln',stem:`Tính giá trị của biểu thức ${I('x')}${sup(2)} + 2${I('x')} + 1 tại ${I('x')} = ${x}.`,ans:s*s,unit:'',sol:`x² + 2x + 1 = (x + 1)² = ${s}² = ${s*s}.`}}
  if(f===1){const n=r.pick([101,1001,51,201,11,21]),s=n-1;return{kind:'tln',stem:`Tính giá trị của biểu thức ${I('x')}${sup(2)} ${MINUS} 2${I('x')} + 1 tại ${I('x')} = ${n}.`,ans:s*s,unit:'',sol:`x² − 2x + 1 = (x − 1)² = ${s}² = ${s*s}.`}}
  if(f===2){const n=r.pick([9,19,99,4,49]),s=n+1;return{kind:'tln',stem:`Tính giá trị của biểu thức ${I('x')}${sup(3)} + 3${I('x')}${sup(2)} + 3${I('x')} + 1 tại ${I('x')} = ${n}.`,ans:s**3,unit:'',sol:`x³ + 3x² + 3x + 1 = (x + 1)³ = ${s}³ = ${s**3}.`}}
  const a=r.int(1,6),x0=r.nz(-9,12);return{kind:'tln',stem:`Tính giá trị của biểu thức (${I('x')} + ${a})${sup(2)} ${MINUS} (${I('x')} ${MINUS} ${a})${sup(2)} tại ${I('x')} = ${sg(x0)}.`,ans:4*a*x0,unit:'',
    sol:`(x + ${a})² − (x − ${a})² = [(x + ${a}) − (x − ${a})][(x + ${a}) + (x − ${a})] = ${2*a}·2x = ${4*a}x. Tại x = ${sg(x0)}: ${sg(4*a*x0)}.`};
});
TLN('tln-c2-root',2,'VD',r=>{
  const a=r.nz(-6,8),b=r.int(1,7),f=r.int(0,1);
  if(f===0)return{kind:'tln',stem:`Tìm giá trị lớn nhất của ${I('x')} thỏa mãn (${I('x')} ${a<0?'+':MINUS} ${Math.abs(a)})${sup(2)} ${MINUS} ${b*b} = 0.`,ans:a+b,unit:'',
    sol:`(x ${a<0?'+':'−'} ${Math.abs(a)})² − ${b}² = (x ${a<0?'+':'−'} ${Math.abs(a)} − ${b})(x ${a<0?'+':'−'} ${Math.abs(a)} + ${b}) = 0 nên x = ${sg(a+b)} hoặc x = ${sg(a-b)}. Giá trị lớn nhất là ${sg(a+b)}.`};
  const c=r.nz(-7,7);if(c===b)return T.tln['tln-c2-root'].gen(r);
  return{kind:'tln',stem:`Tính tổng các giá trị của ${I('x')} thỏa mãn ${I('x')}(${I('x')} ${MINUS} ${b}) ${c<0?'+':MINUS} ${Math.abs(c)}(${I('x')} ${MINUS} ${b}) = 0.`,ans:b+c,unit:'',
    sol:`x(x − ${b}) ${c<0?'+':'−'} ${Math.abs(c)}(x − ${b}) = (x − ${b})(x ${c<0?'+':'−'} ${Math.abs(c)}) = 0 nên x = ${b} hoặc x = ${sg(c)}. Tổng là ${sg(b+c)}.`};
});
TLN('tln-c2-min',2,'VD',r=>{
  const a=r.nz(-6,6),m=r.int(1,9),c=a*a+m;
  return{kind:'tln',stem:`Tìm giá trị nhỏ nhất của biểu thức ${I('A')} = ${I('x')}${sup(2)} ${a>0?MINUS:'+'} ${2*Math.abs(a)}${I('x')} + ${c}.`,ans:m,unit:'',
    sol:`A = (x ${a>0?'−':'+'} ${Math.abs(a)})² + ${m} ≥ ${m}, dấu “=” khi x = ${sg(a)}. Giá trị nhỏ nhất là ${m}.`};
});
/* ---------- Chương III: Tứ giác ---------- */
TLN('tln-c3-sum',3,'NB',r=>{
  for(;;){const A=r.int(55,130),B=r.int(55,130),C=r.int(55,130),D=360-A-B-C;if(D<40||D>150)continue;
    return{kind:'tln',stem:`Cho tứ giác ${I('ABCD')} có ∠${I('A')} = ${A}°, ∠${I('B')} = ${B}°, ∠${I('C')} = ${C}°. Tính số đo ∠${I('D')} (đơn vị: độ).`,ans:D,unit:'°',
      sol:`Tổng các góc của tứ giác bằng 360° nên ∠D = 360° − ${A}° − ${B}° − ${C}° = ${D}°.`}}
});
TLN('tln-c3-median',3,'NB',r=>{
  const k=r.int(3,15),f=r.int(0,1);
  return f?{kind:'tln',stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('BC')} = ${2*k} cm. Gọi ${I('M')} là trung điểm của ${I('BC')}. Tính độ dài ${I('AM')} (đơn vị: cm).`,ans:k,unit:'cm',
      sol:`Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: AM = ${2*k} : 2 = ${k} cm.`}
    :{kind:'tln',stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, đường trung tuyến ${I('AM')} = ${k} cm. Tính độ dài cạnh ${I('BC')} (đơn vị: cm).`,ans:2*k,unit:'cm',
      sol:`Đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền nên BC = 2·AM = ${2*k} cm.`};
});
TLN('tln-c3-trap',3,'TH',r=>{
  const f=r.int(0,1);
  if(f===0){const C=r.int(50,85);return{kind:'tln',stem:`Cho hình thang cân ${I('ABCD')} (${I('AB')} // ${I('CD')}) có ∠${I('C')} = ${C}°. Tính số đo ∠${I('A')} (đơn vị: độ).`,ans:180-C,unit:'°',
    sol:`Hình thang cân nên ∠D = ∠C = ${C}°. Vì AB // CD nên ∠A + ∠D = 180°, suy ra ∠A = ${180-C}°.`}}
  const k=2*r.int(5,30),A=(180+k)/2;
  return{kind:'tln',stem:`Cho hình thang cân ${I('ABCD')} (${I('AB')} // ${I('CD')}, ${I('AB')} &lt; ${I('CD')}) có ∠${I('A')} ${MINUS} ∠${I('D')} = ${k}°. Tính số đo ∠${I('B')} (đơn vị: độ).`,ans:A,unit:'°',
    sol:`∠A + ∠D = 180° và ∠A − ∠D = ${k}° nên ∠A = ${A}°. Hình thang cân nên ∠B = ∠A = ${A}°.`};
});
TLN('tln-c3-rhomb',3,'TH',r=>{
  const f=r.int(0,2);
  if(f===0){const a=r.int(3,15);return{kind:'tln',stem:`Cho hình thoi ${I('ABCD')} có cạnh bằng ${a} cm và ∠${I('BAD')} = 60°. Tính độ dài đường chéo ${I('BD')} (đơn vị: cm).`,ans:a,unit:'cm',
    sol:`Tam giác ABD có AB = AD và ∠BAD = 60° nên là tam giác đều, do đó BD = AB = ${a} cm.`}}
  if(f===1){const B=2*r.int(30,70);return{kind:'tln',stem:`Cho hình thoi ${I('ABCD')} có ∠${I('ABC')} = ${B}°. Tính số đo ∠${I('ABD')} (đơn vị: độ).`,ans:B/2,unit:'°',
    sol:`Trong hình thoi, mỗi đường chéo là đường phân giác của hai góc mà nó nối nên ∠ABD = ${B}° : 2 = ${B/2}°.`}}
  const p=r.int(3,15);return{kind:'tln',stem:`Một hình vuông có chu vi ${4*p} cm. Tính diện tích của hình vuông đó (đơn vị: cm²).`,ans:p*p,unit:'cm²',
    sol:`Cạnh hình vuông là ${4*p} : 4 = ${p} cm; diện tích ${p}² = ${p*p} cm².`};
});
TLN('tln-c3-ratio',3,'VD',r=>{
  for(;;){const q=r.pick([[1,2,3,4],[2,3,4,6],[3,4,5,6],[1,2,2,3],[2,2,3,5],[4,5,6,9],[3,3,4,5]]),s=q.reduce((a,b)=>a+b,0);if(360%s)continue;const k=360/s,mx=Math.max(...q)*k;
    if(mx>=180)continue;
    return{kind:'tln',stem:`Cho tứ giác ${I('ABCD')} có số đo các góc ${I('A')}, ${I('B')}, ${I('C')}, ${I('D')} tỉ lệ với ${q.join('; ')}. Tính số đo góc lớn nhất của tứ giác (đơn vị: độ).`,ans:mx,unit:'°',
      sol:`Đặt ∠A = ${q[0]===1?'':q[0]}k, ∠B = ${q[1]===1?'':q[1]}k, ∠C = ${q[2]}k, ∠D = ${q[3]}k. Ta có ${s}k = 360° nên k = ${k}°. Góc lớn nhất là ${Math.max(...q)}·${k}° = ${mx}°.`}}
});
TLN('tln-c3-perim',3,'VD',r=>{
  const b=r.int(4,20),d=r.int(2,10),a=b+d,f=r.int(0,1);
  return f?{kind:'tln',stem:`Cho hình bình hành ${I('ABCD')} có chu vi ${2*(a+b)} cm và ${I('AB')} ${MINUS} ${I('AD')} = ${d} cm. Tính độ dài cạnh ${I('AB')} (đơn vị: cm).`,ans:a,unit:'cm',
      sol:`AB + AD = ${a+b} và AB − AD = ${d} nên AB = (${a+b} + ${d}) : 2 = ${a} cm.`}
    :{kind:'tln',stem:`Cho hình chữ nhật có chu vi ${2*(a+b)} cm, chiều dài hơn chiều rộng ${d} cm. Tính diện tích hình chữ nhật đó (đơn vị: cm²).`,ans:a*b,unit:'cm²',
      sol:`Dài + rộng = ${a+b}, dài − rộng = ${d} nên dài = ${a} cm, rộng = ${b} cm; diện tích ${a}·${b} = ${a*b} cm².`};
});
/* ---------- Chương IV: Định lí Thalès ---------- */
TLN('tln-c4-mid',4,'TH',r=>{
  const f=r.int(0,2),k=r.int(3,15);
  if(f===0)return{kind:'tln',stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${2*k} cm. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AB')}, ${I('AC')}. Tính độ dài ${I('MN')} (đơn vị: cm).`,ans:k,unit:'cm',
    sol:`MN là đường trung bình của tam giác ABC nên MN = BC : 2 = ${k} cm.`};
  if(f===1)return{kind:'tln',stem:`Cho tam giác ${I('ABC')}, ${I('M')} là trung điểm của ${I('AB')}. Đường thẳng qua ${I('M')} song song với ${I('BC')} cắt ${I('AC')} tại ${I('N')}. Biết ${I('MN')} = ${k} cm, tính độ dài ${I('BC')} (đơn vị: cm).`,ans:2*k,unit:'cm',
    sol:`Đường thẳng qua trung điểm M của AB, song song với BC đi qua trung điểm N của AC; MN là đường trung bình nên BC = 2·MN = ${2*k} cm.`};
  const A=r.int(40,80),B=r.int(40,180-A-30);
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} có ∠${I('B')} = ${B}°. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AB')}, ${I('AC')}. Tính số đo ∠${I('AMN')} (đơn vị: độ).`,ans:B,unit:'°',
    sol:`MN là đường trung bình nên MN // BC, suy ra ∠AMN = ∠ABC = ${B}° (hai góc đồng vị).`};
});
TLN('tln-c4-bis',4,'TH',r=>{
  for(;;){const [m,n]=r.pick([[2,3],[3,4],[3,5],[4,5],[2,5],[5,6],[1,2]]),k=r.int(1,4),AB=m*k*2,AC=n*k*2,BD=m*r.int(1,3),DC=BD*n/m;
    if(!Number.isInteger(DC)||BD+DC>=AB+AC||BD+DC<=AC-AB)continue;
    return{kind:'tln',stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm. Đường phân giác của góc ${I('A')} cắt ${I('BC')} tại ${I('D')}. Biết ${I('BD')} = ${BD} cm, tính độ dài ${I('DC')} (đơn vị: cm).`,ans:DC,unit:'cm',
      sol:`Theo tính chất đường phân giác: ${fr('DB','DC')} = ${fr('AB','AC')} = ${fr(AB,AC)}, suy ra DC = ${BD}·${AC} : ${AB} = ${DC} cm.`}}
});
TLN('tln-c4-ratio',4,'TH',r=>{
  const {m,n,s}=thalesP(r),AN=m*s,NC=n*s,AC=AN+NC;
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')}, điểm ${I('M')} thuộc cạnh ${I('AB')} sao cho ${fr('AM','MB')} = ${fr(m,n)}. Đường thẳng qua ${I('M')} song song với ${I('BC')} cắt ${I('AC')} tại ${I('N')}. Biết ${I('AC')} = ${AC} cm, tính độ dài ${I('AN')} (đơn vị: cm).`,ans:AN,unit:'cm',
    sol:`MN // BC nên ${fr('AN','NC')} = ${fr('AM','MB')} = ${fr(m,n)}, do đó ${fr('AN','AC')} = ${fr(m,m+n)}; AN = ${AC}·${m} : ${m+n} = ${AN} cm.`,chk:()=>AN*(m+n)===AC*m};
});
/* ---------- Chương V: Dữ liệu và biểu đồ ---------- */
TLN('tln-c5-total',5,'NB',r=>{
  const set=r.pick(CAT_SETS),vals=distinctInts(r,4,5,30),N=vals.reduce((a,b)=>a+b,0);
  return{kind:'tln',stem:`Kết quả khảo sát ${set.what} của học sinh lớp 8A được cho trong bảng sau.${tableHTML(set.names,[vals])}Lớp 8A có bao nhiêu học sinh tham gia khảo sát?`,ans:N,unit:'',
    sol:`${vals.join(' + ')} = ${N} học sinh.`};
});
TLN('tln-c5-pie',5,'TH',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,80,120,200,400,240,160]),k=r.int(0,3),cnt=N*pcts[k]/100;
  if(!Number.isInteger(cnt))return T.tln['tln-c5-pie'].gen(r);
  return{kind:'tln',stem:`Biểu đồ hình quạt tròn dưới đây biểu diễn kết quả khảo sát ${set.what} của ${N} học sinh khối 8.<div class="figure">${pieSVG(set.names.map((name,i)=>({name,pct:pcts[i]})))}</div>Có bao nhiêu học sinh chọn “${set.names[k]}”?`,ans:cnt,unit:'',
    sol:`${pcts[k]}% của ${N} là ${N}·${pcts[k]} : 100 = ${cnt} học sinh.`};
});
TLN('tln-c5-line',5,'TH',r=>{
  const yrs=['2020','2021','2022','2023','2024'],vals=distinctInts(r,5,20,95),inc=vals.slice(1).map((v,i)=>v-vals[i]),best=Math.max(...inc);
  if(best<=0||inc.filter(v=>v===best).length>1)return T.tln['tln-c5-line'].gen(r);
  const i=inc.indexOf(best);
  return{kind:'tln',stem:`Biểu đồ đoạn thẳng dưới đây cho biết số sách thư viện một trường nhận được qua các năm (đơn vị: quyển).<div class="figure">${lineSVG(yrs,vals,{unit:'Số quyển sách'})}</div>So với năm liền trước, năm có số sách tăng nhiều nhất đã tăng thêm bao nhiêu quyển?`,ans:best,unit:'',
    sol:`Mức tăng so với năm trước: ${inc.map((v,j)=>`${yrs[j+1]}: ${v>0?'+':''}${v}`.replace('-','−')).join('; ')}. Tăng nhiều nhất năm ${yrs[i+1]}, thêm ${best} quyển.`};
});
