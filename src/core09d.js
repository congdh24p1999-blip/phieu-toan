/* ================================================================
   LỚP 9 – Toán 9 Kết nối tri thức, học kì II
   Chương VI: Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn (Bài 18 – 21)
   ================================================================ */
const N9b=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:9,hk:2,les});
const DS9b=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:9,hk:2,les});
const TLN9b=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:9,hk:2,les});
const TL9b=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:9,hk:2,les});
/* a·x² với a là phân số [n, d] */
const axH=a=>{const [n,d]=a;return (d===1?(n===1?'':n===-1?MINUS:sg(n)):(n<0?MINUS:'')+fr(Math.abs(n),d))+I('x')+sup(2)};
const yax=a=>`${I('y')} = ${axH(a)}`;
const eqQ=(a,b,c)=>`${xquad(a,b,c)} = 0`;
const x12=(i)=>`${I('x')}${sub(i)}`;
/* phương trình bậc hai a(x − p)(x − q) = 0 với hệ số nguyên nhỏ */
const q9=(r,o={})=>{for(;;){const a=r.pick(o.as||[1,1,1,2,-1,3,-2]),p=r.int(-6,6),q=r.int(-6,6);
  if(o.dist!==false&&p===q)continue;if(o.nz&&(!p||!q))continue;if(o.opp&&p===-q)continue;
  const b=-a*(p+q),c=a*p*q;if(Math.abs(b)>30||Math.abs(c)>60)continue;return{a,b,c,p,q,lo:Math.min(p,q),hi:Math.max(p,q),D:b*b-4*a*c}}};
const set9=xs=>`{${[...new Set(xs)].sort((u,v)=>u-v).map(sg).join('; ')}}`;
const coef9=k=>k===1?'':k===-1?MINUS:sg(k);
/* m với hệ số: "x² − 2px + m" */
const xpm=(p)=>`${I('x')}${sup(2)} ${p>0?MINUS:'+'} ${Math.abs(2*p)}${I('x')} + ${I('m')}`;

/* ===================== Bài 18: Hàm số y = ax² (a ≠ 0) ===================== */
N9b('k9-18-val',6,'NB',[18],r=>{
  const a=r.pick([[1,1],[2,1],[-1,1],[-2,1],[3,1],[-3,1],[1,2],[-1,2]]),x0=r.nz(-3,3)*a[1],y0=a[0]*x0*x0/a[1];
  return mkNum(r,{stem:`Cho hàm số ${yax(a)}. Giá trị của hàm số tại ${I('x')} = ${sg(x0)} bằng`,correct:y0,ok:()=>true,cands:[-y0,a[0]*x0/a[1],2*y0,x0*x0,y0+x0],
    sol:`Thay x = ${sg(x0)}: y = ${qh(a)}·(${sg(x0)})² = ${sg(y0)}.`,chk:()=>isInt(y0)});
});
N9b('k9-18-pt',6,'NB',[18],r=>{
  const a=r.pick([1,2,-1,-2,3,-3]),x0=r.nz(-3,3),y0=a*x0*x0,W=[[x0,-y0],[y0,x0],[x0,a*x0],[x0,y0+1],[-x0,-y0],[x0*2,y0*2]].filter(p=>a*p[0]*p[0]!==p[1]);
  return mkTxt(r,{stem:`Điểm nào sau đây thuộc đồ thị hàm số ${yax([a,1])}?`,correct:pr9([x0,y0]),wrongs:W.map(pr9),sol:`Với x = ${sg(x0)} thì y = ${sg(a)}·(${sg(x0)})² = ${sg(y0)}. Điểm ${pr9([x0,y0])} thuộc đồ thị.`,chk:()=>true});
});
N9b('k9-18-prop',6,'NB',[18],r=>{
  const a=r.pick([[1,1],[2,1],[-1,1],[-3,1],[1,2],[-1,3]]),up=a[0]>0;
  const T=[`Nằm phía trên trục hoành, ${I('O')} là điểm thấp nhất của đồ thị.`,`Nằm phía dưới trục hoành, ${I('O')} là điểm cao nhất của đồ thị.`];
  return mkTxt(r,{stem:`Nhận xét nào sau đây đúng về đồ thị của hàm số ${yax(a)}?`,correct:T[up?0:1],wrongs:[T[up?1:0],`Nhận trục hoành làm trục đối xứng.`,`Là một đường thẳng đi qua gốc tọa độ.`,`Không đi qua gốc tọa độ ${I('O')}.`],
    sol:`Đồ thị hàm số y = ax² là một parabol đỉnh O, nhận Oy làm trục đối xứng; a = ${qh(a)} ${up?'> 0 nên đồ thị nằm phía trên trục hoành':'< 0 nên đồ thị nằm phía dưới trục hoành'}.`,chk:()=>true});
});
N9b('k9-18-a',6,'TH',[18],r=>{
  for(;;){const x0=r.nz(-3,3),y0=r.nz(-9,9),a=Q(y0,x0*x0);if(a[0]===a[1]*1&&a[1]===1&&Math.abs(a[0])===1)continue;
    return mkF(r,{stem:`Biết đồ thị hàm số ${I('y')} = ${I('a')}${I('x')}${sup(2)} đi qua điểm ${I('A')}${pr9([x0,y0])}. Giá trị của ${I('a')} bằng`,correct:a,cands:[Q(x0*x0,y0),Q(y0,x0),Q(-y0,x0*x0),Q(y0,2*x0),Q(y0*x0*x0,1)],
      sol:`A thuộc đồ thị nên ${sg(y0)} = a·(${sg(x0)})² ⇒ a = ${qh(a)}.`,chk:()=>true})}
});
/* ===================== Bài 19: Phương trình bậc hai một ẩn ===================== */
N9b('k9-19-which',6,'NB',[19],r=>{
  const a=r.nz(-4,4),b=r.int(-6,6),c=r.nz(-9,9);
  return mkTxt(r,{stem:'Phương trình nào sau đây là phương trình bậc hai một ẩn?',correct:eqQ(a,b,c),
    wrongs:[`${xlin(b||2,c)} = 0`,`${I('x')}${sup(3)} ${MINUS} ${Math.abs(a)}${I('x')}${sup(2)} + ${Math.abs(c)} = 0`,`0${I('x')}${sup(2)} + ${xlin(b||3,c)} = 0`,`${fr(1,I('x')+sup(2))} + ${xlin(b||1,c)} = 0`],
    sol:`Phương trình bậc hai một ẩn có dạng ax² + bx + c = 0 (a ≠ 0). Chỉ ${eqQ(a,b,c)} có dạng đó (a = ${sg(a)}).`,chk:()=>true});
});
N9b('k9-19-delta',6,'NB',[19],r=>{
  const a=r.nz(-3,3),b=r.int(-7,7),c=r.nz(-8,8),D=b*b-4*a*c;
  return mkNum(r,{stem:`Biệt thức Δ của phương trình ${eqQ(a,b,c)} bằng`,correct:D,ok:()=>true,cands:[b*b+4*a*c,-b*b-4*a*c,b*b-a*c,4*a*c-b*b],
    sol:`Δ = b² − 4ac = (${sg(b)})² − 4·(${sg(a)})·(${sg(c)}) = ${sg(D)}.`,chk:()=>true});
});
N9b('k9-19-count',6,'TH',[19],r=>{
  const t=r.int(0,2);let a,b,c;
  if(t===2){const Z=q9(r,{nz:true});a=Z.a;b=Z.b;c=Z.c}
  else if(t===1){a=r.pick([1,1,4,9,-1]);const s=Math.sqrt(Math.abs(a))*(a<0?-1:1),p=r.nz(-5,5);a=a;const k=Math.sqrt(Math.abs(a));b=-2*k*p*(a<0?-1:1);c=a<0?-p*p:p*p}
  else{for(;;){a=r.pick([1,2,3,-1,-2]);b=r.int(-5,5);c=r.int(-9,9)*(a>0?1:-1);if(b*b-4*a*c<0&&c)break}}
  const D=b*b-4*a*c,L=['Phương trình vô nghiệm.','Phương trình có nghiệm kép.','Phương trình có hai nghiệm phân biệt.'];
  return mkTxt(r,{stem:`Khẳng định nào sau đây đúng về phương trình ${eqQ(a,b,c)}?`,correct:L[t],wrongs:[...L.filter((_,i)=>i!==t),'Phương trình có vô số nghiệm.'],
    sol:`Δ = (${sg(b)})² − 4·(${sg(a)})·(${sg(c)}) = ${sg(D)}${D>0?' > 0':D<0?' < 0':''} nên ${L[t].charAt(0).toLowerCase()+L[t].slice(1)}`,chk:()=>(t===2&&D>0)||(t===1&&D===0)||(t===0&&D<0)});
});
N9b('k9-19-solve',6,'TH',[19],r=>{
  const Z=q9(r,{nz:true,opp:true});
  return mkTxt(r,{stem:`Tập nghiệm của phương trình ${eqQ(Z.a,Z.b,Z.c)} là`,correct:`${I('S')} = ${set9([Z.p,Z.q])}`,wrongs:[[-Z.p,-Z.q],[Z.p,-Z.q],[-Z.p,Z.q],[Z.p],[Z.p+Z.q,Z.p*Z.q]].map(s=>`${I('S')} = ${set9(s)}`),
    sol:`Δ = ${sg(Z.D)} > 0, √Δ = ${Math.sqrt(Z.D)}. Phương trình có hai nghiệm x = ${sg(Z.lo)} và x = ${sg(Z.hi)}.`,chk:()=>Z.D>0});
});
N9b('k9-19-dp',6,'TH',[19],r=>{
  const a=r.nz(-3,3),bp=r.nz(-5,5),c=r.nz(-8,8),D1=bp*bp-a*c;
  return mkNum(r,{stem:`Với phương trình ${eqQ(a,2*bp,c)}, biệt thức thu gọn Δ′ bằng`,correct:D1,ok:()=>true,cands:[4*bp*bp-4*a*c,bp*bp+a*c,bp-a*c,4*bp*bp-a*c],
    sol:`b = ${sg(2*bp)} nên b′ = ${sg(bp)}; Δ′ = b′² − ac = ${pp10(`${sg(bp*bp)} − ${sg(a)}·${sg(c)}`)} = ${sg(D1)}.`,chk:()=>true});
});
/* ===================== Bài 20: Định lí Viète và ứng dụng ===================== */
N9b('k9-20-sum',6,'NB',[20],r=>{
  const Z=q9(r,{nz:true,opp:true}),S=Q(-Z.b,Z.a),P=Q(Z.c,Z.a),H=(s,p)=>`${x12(1)} + ${x12(2)} = ${qh(s)}; ${x12(1)}${x12(2)} = ${qh(p)}`;
  return mkTxt(r,{stem:`Gọi ${x12(1)}, ${x12(2)} là hai nghiệm của phương trình ${eqQ(Z.a,Z.b,Z.c)}. Khẳng định nào sau đây đúng?`,correct:H(S,P),wrongs:[H([-S[0],S[1]],P),H(S,[-P[0],P[1]]),H([-S[0],S[1]],[-P[0],P[1]]),H(P,S)],
    sol:`Theo định lí Viète: ${x12(1)} + ${x12(2)} = ${fr(MINUS+'b','a')} = ${qh(S)}; ${x12(1)}${x12(2)} = ${fr('c','a')} = ${qh(P)}.`,chk:()=>Z.D>0});
});
N9b('k9-20-root',6,'TH',[20],r=>{
  for(;;){const a=r.nz(-4,4),c=r.nz(-9,9),t=r.chance(.5);if(Math.abs(c)===Math.abs(a))continue;const b=t?-a-c:a+c,x2=t?Q(c,a):Q(-c,a),one=t?'1':MINUS+'1';
    const H=(u,v)=>`${x12(1)} = ${u}; ${x12(2)} = ${v}`;
    return mkTxt(r,{stem:`Phương trình ${eqQ(a,b,c)} có hai nghiệm là`,correct:H(one,qh(x2)),wrongs:[H(t?MINUS+'1':'1',qh([-x2[0],x2[1]])),H(one,qh([-x2[0],x2[1]])),H(t?MINUS+'1':'1',qh(x2)),H(one,qh(Q(x2[1],x2[0])))],
      sol:t?`a + b + c = ${sg(a)} + (${sg(b)}) + (${sg(c)}) = 0 nên phương trình có nghiệm ${x12(1)} = 1, ${x12(2)} = ${fr('c','a')} = ${qh(x2)}.`:`a − b + c = ${sg(a)} − (${sg(b)}) + (${sg(c)}) = 0 nên phương trình có nghiệm ${x12(1)} = −1, ${x12(2)} = ${fr(MINUS+'c','a')} = ${qh(x2)}.`,
      chk:()=>(t?a+b+c:a-b+c)===0})}
});
N9b('k9-20-find',6,'TH',[20],r=>{
  for(;;){const u=r.int(-7,9),v=r.int(-7,9),S=u+v,P=u*v;if(!S||!P||S===P||S===-P)continue;
    return mkTxt(r,{stem:`Hai số ${I('u')}, ${I('v')} có ${I('u')} + ${I('v')} = ${sg(S)} và ${I('u')}${I('v')} = ${sg(P)} là hai nghiệm của phương trình nào sau đây?`,correct:eqQ(1,-S,P),wrongs:[eqQ(1,S,P),eqQ(1,-P,S),eqQ(1,S,-P),eqQ(1,-S,-P)],
      sol:`Nếu u + v = S và uv = P thì u, v là hai nghiệm của x² − Sx + P = 0, tức là ${eqQ(1,-S,P)}.`,chk:()=>true})}
});
N9b('k9-20-expr',6,'TH',[20],r=>{
  for(;;){const S=r.nz(-6,6),P=r.nz(-9,9);if(S*S-4*P<=0)continue;const v=S*S-2*P;
    return mkNum(r,{stem:`Gọi ${x12(1)}, ${x12(2)} là hai nghiệm của phương trình ${eqQ(1,-S,P)}. Giá trị của ${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} bằng`,correct:v,ok:()=>true,cands:[S*S+2*P,S*S-P,S*S,S*S-4*P,S-2*P],
      sol:`Δ = ${S*S-4*P} > 0. Theo Viète: ${x12(1)} + ${x12(2)} = ${sg(S)}, ${x12(1)}${x12(2)} = ${sg(P)}; ${x12(1)}² + ${x12(2)}² = (${x12(1)} + ${x12(2)})² − 2${x12(1)}${x12(2)} = ${S*S} − (${sg(2*P)}) = ${sg(v)}.`,chk:()=>true})}
});
/* ===================== Bài 21: Giải bài toán bằng cách lập phương trình ===================== */
N9b('k9-21-model',6,'TH',[21],r=>{
  const w=r.int(4,15),d=r.int(2,8),S=w*(w+d),t=r.chance(.5);
  const X=I('x');
  return t?mkTxt(r,{stem:`Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng ${d} m và diện tích bằng ${S} m². Gọi ${X} (m) là chiều rộng của mảnh vườn (${X} > 0). Phương trình nào sau đây mô tả bài toán?`,correct:`${X}(${X} + ${d}) = ${S}`,
      wrongs:[`${X}(${X} ${MINUS} ${d}) = ${S}`,`2(${X} + ${X} + ${d}) = ${S}`,`${X} + ${X} + ${d} = ${S}`,`${X}${sup(2)} + ${d} = ${S}`],sol:`Chiều dài là x + ${d} (m); diện tích x(x + ${d}) = ${S}.`,chk:()=>true})
   :mkTxt(r,{stem:`Tích của hai số tự nhiên liên tiếp bằng ${w*(w+1)}. Gọi ${X} là số nhỏ hơn. Phương trình nào sau đây mô tả bài toán?`,correct:`${X}(${X} + 1) = ${w*(w+1)}`,
      wrongs:[`${X}(${X} ${MINUS} 1) = ${w*(w+1)}`,`${X} + ${X} + 1 = ${w*(w+1)}`,`${X}${sup(2)} + 1 = ${w*(w+1)}`,`2${X}(${X} + 1) = ${w*(w+1)}`],sol:`Số lớn hơn là x + 1; tích x(x + 1) = ${w*(w+1)}.`,chk:()=>true});
});

/* ---------- Đúng/sai ---------- */
DS9b('ds9-18-fn',6,'NB',[18],r=>{
  const a=r.pick([1,2,3,-1,-2,-3]),x0=r.nz(-3,3),x1=r.int(1,4);
  return mkDS(r,{stem:`Cho hàm số ${yax([a,1])}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Đồ thị hàm số đi qua điểm ${pr9([x0,a*x0*x0])}.`,f:`Đồ thị hàm số đi qua điểm ${pr9([x0,-a*x0*x0])}.`,why:`Với x = ${sg(x0)} thì y = ${sg(a*x0*x0)}.`},
    {t:`Đồ thị hàm số nhận trục ${I('Oy')} làm trục đối xứng.`,f:`Đồ thị hàm số nhận trục ${I('Ox')} làm trục đối xứng.`,why:`Đồ thị hàm số y = ax² là parabol nhận Oy làm trục đối xứng.`},
    {t:`Đồ thị hàm số nằm phía ${a>0?'trên':'dưới'} trục hoành.`,f:`Đồ thị hàm số nằm phía ${a>0?'dưới':'trên'} trục hoành.`,why:`a = ${sg(a)} ${a>0?'> 0':'< 0'}.`},
    {t:`Giá trị của hàm số tại ${I('x')} = ${x1} và tại ${I('x')} = ${MINUS}${x1} bằng nhau.`,f:`Giá trị của hàm số tại ${I('x')} = ${x1} và tại ${I('x')} = ${MINUS}${x1} là hai số đối nhau.`,why:`a·${x1}² = a·(−${x1})² = ${sg(a*x1*x1)}.`}],chk:()=>true});
});
DS9b('ds9-19-eq',6,'NB',[19],r=>{
  for(;;){const Z=q9(r,{nz:true,opp:true});if(Z.b===Z.c||Z.D===Z.b*Z.b+4*Z.a*Z.c)continue;
    return mkDS(r,{stem:`Cho phương trình ${eqQ(Z.a,Z.b,Z.c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Các hệ số của phương trình là ${I('a')} = ${sg(Z.a)}, ${I('b')} = ${sg(Z.b)}, ${I('c')} = ${sg(Z.c)}.`,f:`Các hệ số của phương trình là ${I('a')} = ${sg(Z.a)}, ${I('b')} = ${sg(Z.c)}, ${I('c')} = ${sg(Z.b)}.`,why:`So sánh với dạng ax² + bx + c = 0.`},
      {t:`Δ = ${sg(Z.D)}.`,f:`Δ = ${sg(Z.b*Z.b+4*Z.a*Z.c)}.`,why:`Δ = b² − 4ac = ${sg(Z.D)}.`},
      {t:`Phương trình có hai nghiệm phân biệt.`,f:`Phương trình vô nghiệm.`,why:`Δ > 0.`},
      {t:`${I('x')} = ${sg(Z.p)} là một nghiệm của phương trình.`,f:`${I('x')} = ${sg(-Z.p)} là một nghiệm của phương trình.`,why:`Hai nghiệm của phương trình là ${sg(Z.lo)} và ${sg(Z.hi)}.`}],chk:()=>Z.D>0&&-Z.p!==Z.q})}
});
DS9b('ds9-19-solve',6,'TH',[19],r=>{
  const Z=q9(r,{nz:true,opp:true,as:[1,1,2,-1]}),ev=Z.b%2===0,Dv=ev?(Z.b/2)**2-Z.a*Z.c:Z.D;
  return mkDS(r,{stem:`Giải phương trình ${eqQ(Z.a,Z.b,Z.c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${ev?'Δ′':'Δ'} = ${sg(Dv)}.`,f:`${ev?'Δ′':'Δ'} = ${sg(ev?Z.D:Dv+4)}.`,why:ev?`b′ = ${sg(Z.b/2)}, Δ′ = b′² − ac = ${sg(Dv)}.`:`Δ = b² − 4ac = ${sg(Dv)}.`},
    {t:`Nghiệm lớn của phương trình là ${sg(Z.hi)}.`,f:`Nghiệm lớn của phương trình là ${sg(-Z.lo)}.`,why:`Hai nghiệm là ${sg(Z.lo)} và ${sg(Z.hi)}.`},
    {t:`Nghiệm nhỏ của phương trình là ${sg(Z.lo)}.`,f:`Nghiệm nhỏ của phương trình là ${sg(Z.lo-1)}.`,why:`Hai nghiệm là ${sg(Z.lo)} và ${sg(Z.hi)}.`},
    {t:`Tổng bình phương hai nghiệm bằng ${Z.p*Z.p+Z.q*Z.q}.`,f:`Tổng bình phương hai nghiệm bằng ${(Z.p+Z.q)**2}.`,why:`(${sg(Z.lo)})² + (${sg(Z.hi)})² = ${Z.p*Z.p+Z.q*Z.q}.`}],chk:()=>Z.hi!==-Z.lo&&2*Z.p*Z.q!==0&&(ev?Z.D!==Dv:true)});
});
DS9b('ds9-20-viete',6,'TH',[20],r=>{
  for(;;){const S=r.nz(-7,7),P=r.nz(-9,9);if(S*S-4*P<=0||S*S===P*P)continue;
    return mkDS(r,{stem:`Gọi ${x12(1)}, ${x12(2)} là hai nghiệm của phương trình ${eqQ(1,-S,P)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${x12(1)} + ${x12(2)} = ${sg(S)}.`,f:`${x12(1)} + ${x12(2)} = ${sg(-S)}.`,why:`Theo Viète, ${x12(1)} + ${x12(2)} = −b/a = ${sg(S)}.`},
      {t:`${x12(1)}${x12(2)} = ${sg(P)}.`,f:`${x12(1)}${x12(2)} = ${sg(-P)}.`,why:`${x12(1)}${x12(2)} = c/a = ${sg(P)}.`},
      {t:`${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} = ${sg(S*S-2*P)}.`,f:`${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} = ${sg(S*S+2*P)}.`,why:`(${x12(1)} + ${x12(2)})² − 2${x12(1)}${x12(2)} = ${S*S} − (${sg(2*P)}) = ${sg(S*S-2*P)}.`},
      {t:`${fr(1,x12(1))} + ${fr(1,x12(2))} = ${qh(Q(S,P))}.`,f:`${fr(1,x12(1))} + ${fr(1,x12(2))} = ${qh(Q(P,S))}.`,why:`${fr(1,x12(1))} + ${fr(1,x12(2))} = ${fr(`${x12(1)} + ${x12(2)}`,`${x12(1)}${x12(2)}`)} = ${qh(Q(S,P))}.`}],chk:()=>true})}
});
DS9b('ds9-20-param',6,'VD',[20],r=>{
  for(;;){const p=r.pick([1,2,3,-1,-2,-3]),d=r.int(1,4),m0=p*p-d*d,m1=p*p-r.int(1,6),T=4*p*p-2*m1,m2=m1+2;if(m1===m0)continue;
    return mkDS(r,{stem:`Cho phương trình ${xpm(p)} = 0 (${I('m')} là tham số). Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Δ′ = ${p*p} ${MINUS} ${I('m')}.`,f:`Δ′ = ${4*p*p} ${MINUS} ${I('m')}.`,why:`b′ = ${sg(-p)}, Δ′ = (${sg(-p)})² − m = ${p*p} − m.`},
      {t:`Phương trình có hai nghiệm phân biệt khi ${I('m')} < ${p*p}.`,f:`Phương trình có hai nghiệm phân biệt khi ${I('m')} > ${p*p}.`,why:`Δ′ > 0 ⟺ m < ${p*p}.`},
      {t:`Khi ${I('m')} = ${sg(m0)}, phương trình có nghiệm ${I('x')} = ${sg(p+d)}.`,f:`Khi ${I('m')} = ${sg(m0)}, phương trình có nghiệm ${I('x')} = ${sg(-p-d)}.`,why:`Khi m = ${sg(m0)}: ${eqQ(1,-2*p,m0)} có hai nghiệm ${sg(p-d)} và ${sg(p+d)}.`},
      {t:`Phương trình có hai nghiệm ${x12(1)}, ${x12(2)} thoả mãn ${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} = ${T} khi ${I('m')} = ${sg(m1)}.`,f:`Phương trình có hai nghiệm ${x12(1)}, ${x12(2)} thoả mãn ${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} = ${T} khi ${I('m')} = ${sg(m2)}.`,
       why:`${x12(1)}² + ${x12(2)}² = ${4*p*p} − 2m = ${T} ⟺ m = ${sg(m1)} (thoả mãn m < ${p*p}).`}],chk:()=>-p-d!==p-d&&m1<p*p})}
});
DS9b('ds9-21-word',6,'VD',[21],r=>{
  const w=r.int(5,20),d=r.int(2,9),S=w*(w+d),e=r.int(1,3),inc=(w+e)*(w+d+e)-S;
  return mkDS(r,{stem:`Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng ${d} m và diện tích bằng ${S} m². Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Nếu gọi ${I('x')} (m) là chiều rộng thì ${I('x')}(${I('x')} + ${d}) = ${S}.`,f:`Nếu gọi ${I('x')} (m) là chiều rộng thì ${I('x')}(${I('x')} ${MINUS} ${d}) = ${S}.`,why:`Chiều dài là x + ${d}.`},
    {t:`Chiều rộng của mảnh vườn là ${w} m.`,f:`Chiều rộng của mảnh vườn là ${w+d} m.`,why:`${eqQ(1,d,-S)} có nghiệm dương x = ${w}.`},
    {t:`Chu vi của mảnh vườn là ${2*(2*w+d)} m.`,f:`Chu vi của mảnh vườn là ${2*w+d} m.`,why:`2(${w} + ${w+d}) = ${2*(2*w+d)}.`},
    {t:`Nếu tăng mỗi chiều thêm ${e} m thì diện tích tăng thêm ${inc} m².`,f:`Nếu tăng mỗi chiều thêm ${e} m thì diện tích tăng thêm ${inc+e} m².`,why:`${w+e}·${w+d+e} − ${S} = ${inc}.`}],chk:()=>true});
});

/* ---------- Trả lời ngắn ---------- */
TLN9b('t9-18-a',6,'TH',[18],r=>{
  const [a,x0]=r.pick([[.5,2],[.5,4],[-.5,2],[-.5,4],[2,3],[-2,3],[1.5,2],[-1.5,2],[.25,4],[3,2],[-3,2],[2.5,2]]),s=r.chance(.5)?1:-1,y0=a*x0*x0;
  return{kind:'tln',stem:`Biết đồ thị hàm số ${I('y')} = ${I('a')}${I('x')}${sup(2)} đi qua điểm ${I('M')}(${sg(s*x0)}; ${sg(y0)}). Tìm ${I('a')}.`,ans:a,unit:'',sol:`${sg(y0)} = a·(${sg(s*x0)})² ⇒ a = ${fr(sg(y0),x0*x0)} = ${fmt(a)}.`,chk:()=>isInt(y0)};
});
TLN9b('t9-19-root',6,'TH',[19],r=>{
  const Z=q9(r,{nz:true,opp:true}),ask=r.int(0,2),v=[Z.hi,Z.lo,Z.hi-Z.lo][ask];
  return{kind:'tln',stem:`Tìm ${['nghiệm lớn nhất','nghiệm nhỏ nhất','hiệu của nghiệm lớn và nghiệm nhỏ'][ask]} của phương trình ${eqQ(Z.a,Z.b,Z.c)}.`,ans:v,unit:'',
    sol:`Δ = ${Z.D}, √Δ = ${Math.sqrt(Z.D)}; hai nghiệm là ${sg(Z.lo)} và ${sg(Z.hi)}. Kết quả: ${sg(v)}.`,chk:()=>Z.D>0};
});
TLN9b('t9-19-real',6,'TH',[18,19],r=>{
  const h=r.pick([20,45,80,125,180,245,320]),t=Math.sqrt(h/5);
  return{kind:'tln',stem:`Một vật rơi tự do từ độ cao ${h} m. Quãng đường rơi được sau ${I('t')} giây là ${I('s')} = 5${I('t')}${sup(2)} (mét). Sau bao nhiêu giây thì vật chạm đất?`,ans:t,unit:'giây',sol:`5t² = ${h} ⟺ t² = ${h/5} ⟺ t = ${t} (t > 0).`,chk:()=>isInt(t)};
});
TLN9b('t9-20-expr',6,'VD',[20],r=>{
  for(;;){const a=r.pick([1,1,2]),S=r.nz(-6,6)*(a===2?1:1),P=r.nz(-9,9),b=-a*S,c=a*P;if(S*S-4*P<=0)continue;const ask=r.int(0,2),v=[S*S-2*P,S*S-4*P,S**3-3*S*P][ask];if(Math.abs(v)>999)continue;
    return{kind:'tln',stem:`Gọi ${x12(1)}, ${x12(2)} là hai nghiệm của phương trình ${eqQ(a,b,c)}. Không giải phương trình, tính ${[`${x12(1)}${sup(2)} + ${x12(2)}${sup(2)}`,`(${x12(1)} ${MINUS} ${x12(2)})${sup(2)}`,`${x12(1)}${sup(3)} + ${x12(2)}${sup(3)}`][ask]}.`,ans:v,unit:'',
      sol:`Δ = ${b*b-4*a*c} > 0. Viète: S = ${x12(1)} + ${x12(2)} = ${sg(S)}, P = ${x12(1)}${x12(2)} = ${sg(P)}. ${['S² − 2P','S² − 4P','S³ − 3SP'][ask]} = ${sg(v)}.`,chk:()=>true}}
});
TLN9b('t9-20-m',6,'VD',[20],r=>{
  const p=r.pick([1,2,3,-1,-2,-3]),m1=p*p-r.int(1,8),T=4*p*p-2*m1;
  return{kind:'tln',stem:`Tìm ${I('m')} để phương trình ${xpm(p)} = 0 có hai nghiệm ${x12(1)}, ${x12(2)} thoả mãn ${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} = ${T}.`,ans:m1,unit:'',
    sol:`Cần Δ′ = ${p*p} − m ≥ 0 ⟺ m ≤ ${p*p}. Viète: S = ${sg(2*p)}, P = m; ${x12(1)}² + ${x12(2)}² = ${4*p*p} − 2m = ${T} ⟺ m = ${sg(m1)} (thoả mãn).`,chk:()=>m1<=p*p};
});
TLN9b('t9-21-move',6,'VD',[21],r=>{
  for(;;){const v=r.pick([30,36,40,45,48,50,54,60]),k=r.pick([5,6,10,12,15]),t=r.pick([.5,1,1.5,2]),D=t*v*(v+k)/k;if(!isInt(D)||D>300||D<40)continue;
    return{kind:'tln',stem:`Một ô tô đi từ ${I('A')} đến ${I('B')} dài ${D} km. Lúc về, xe tăng vận tốc thêm ${k} km/h nên thời gian về ít hơn thời gian đi ${fmt(t)} giờ. Tính vận tốc của ô tô lúc đi (đơn vị: km/h).`,ans:v,unit:'km/h',
      sol:`Gọi x (km/h) là vận tốc lúc đi (x > 0): ${fr(D,'x')} − ${fr(D,`x + ${k}`)} = ${fmt(t)} ⟺ ${eqQ(1,k,-D*k/t)} ⇒ x = ${v}.`,chk:()=>Math.abs(D/v-D/(v+k)-t)<1e-9}}
});

/* ---------- Tự luận ---------- */
TL9b('tl9-19-solve',6,'TH','alg',[19],r=>{
  const Z=q9(r,{nz:true,opp:true}),t=r.chance(.5),k=r.int(2,5),m=r.nz(-6,6);
  const p2=t?`${eqQ(k,-k*m,0)}`:`${eqQ(1,0,-m*m)}`,s2=t?`${k}x(x ${m>0?MINUS:'+'} ${Math.abs(m)}) = 0 ⟺ x = 0 hoặc x = ${sg(m)}.`:`x² = ${m*m} ⟺ x = ${Math.abs(m)} hoặc x = −${Math.abs(m)}.`;
  return{kind:'tl',title:'Giải phương trình bậc hai',parts:[{pts:.5,html:`Giải phương trình ${eqQ(Z.a,Z.b,Z.c)}.`},{pts:.5,html:`Giải phương trình ${p2}.`}],
    sol:[ptxt([[`Δ = (${sg(Z.b)})² − 4·(${sg(Z.a)})·(${sg(Z.c)}) = ${Z.D} > 0, √Δ = ${Math.sqrt(Z.D)}.`,.25],[`Phương trình có hai nghiệm phân biệt ${x12(1)} = ${sg(Z.hi)}, ${x12(2)} = ${sg(Z.lo)}.`,.25]]),
      ptxt([[t?`${xquad(k,-k*m,0)} = 0 ⟺ ${s2.split(' ⟺ ')[0]}.`:`${xquad(1,0,-m*m)} = 0 ⟺ x² = ${m*m}.`,.25],[t?`⟺ x = 0 hoặc x = ${sg(m)}. Vậy S = ${set9([0,m])}.`:`⟺ x = ±${Math.abs(m)}. Vậy S = ${set9([m,-m])}.`,.25]])],chk:()=>Z.D>0};
});
TL9b('tl9-18-fn',6,'TH','alg',[18],r=>{
  const x0=r.nz(-3,3),a=r.pick([1,2,-1,-2,3,-3]),y0=a*x0*x0,k=r.int(1,3),Y=a*k*k;
  return{kind:'tl',title:'Hàm số y = ax²',parts:[{pts:.5,html:`Xác định hệ số ${I('a')} của hàm số ${I('y')} = ${I('a')}${I('x')}${sup(2)}, biết đồ thị hàm số đi qua điểm ${I('A')}${pr9([x0,y0])}.`},{pts:.5,html:`Với ${I('a')} vừa tìm được, tìm các điểm thuộc đồ thị hàm số có tung độ bằng ${sg(Y)}.`}],
    sol:[ptxt([[`A thuộc đồ thị nên ${sg(y0)} = a·(${sg(x0)})² = ${x0*x0}a.`,.25],[`⇒ a = ${sg(a)}; hàm số ${yax([a,1])}.`,.25]]),ptxt([[`${sg(a)}x² = ${sg(Y)} ⟺ x² = ${k*k} ⟺ x = ±${k}.`,.25],[`Các điểm cần tìm: (${k}; ${sg(Y)}) và (−${k}; ${sg(Y)}).`,.25]])],chk:()=>true};
});
TL9b('tl9-20-m',6,'VD','alg',[20],r=>{
  for(;;){const p=r.pick([1,2,3,-1,-2,-3]),d=r.int(1,4),m0=p*p-d*d,m1=p*p-r.int(1,8),T=4*p*p-2*m1;if(m1===m0)continue;
    return{kind:'tl',title:'Phương trình bậc hai chứa tham số',parts:[{pts:.5,html:`Cho phương trình ${xpm(p)} = 0 (${I('m')} là tham số). Giải phương trình khi ${I('m')} = ${sg(m0)}.`},{pts:.5,html:`Tìm ${I('m')} để phương trình có hai nghiệm ${x12(1)}, ${x12(2)} thoả mãn ${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} = ${T}.`}],
      sol:[ptxt([[`Với m = ${sg(m0)}: ${eqQ(1,-2*p,m0)}; Δ′ = ${p*p} − (${sg(m0)}) = ${d*d}.`,.25],[`Hai nghiệm: x = ${sg(p+d)}, x = ${sg(p-d)}.`,.25]]),
        ptxt([[`Điều kiện Δ′ = ${p*p} − m ≥ 0 ⟺ m ≤ ${p*p}. Viète: ${x12(1)} + ${x12(2)} = ${sg(2*p)}, ${x12(1)}${x12(2)} = m.`,.25],[`${x12(1)}² + ${x12(2)}² = ${4*p*p} − 2m = ${T} ⟺ m = ${sg(m1)} (thoả mãn).`,.25]])],chk:()=>m1<=p*p}}
});
TL9b('tl9-20-new',6,'VD','alg',[20],r=>{
  for(;;){const S=r.nz(-6,6),P=r.nz(-9,-1);const v=S*S-2*P,ask=r.chance(.5);
    return{kind:'tl',title:'Định lí Viète',parts:[{pts:.5,html:`Cho phương trình ${eqQ(1,-S,P)}. Chứng minh phương trình có hai nghiệm phân biệt ${x12(1)}, ${x12(2)} và tính ${x12(1)}${sup(2)} + ${x12(2)}${sup(2)}.`},
      {pts:.5,html:ask?`Lập phương trình bậc hai có hai nghiệm là 2${x12(1)} và 2${x12(2)}.`:`Lập phương trình bậc hai có hai nghiệm là ${x12(1)} + 1 và ${x12(2)} + 1.`}],
      sol:[ptxt([[`a = 1, c = ${sg(P)} trái dấu (ac < 0) nên phương trình có hai nghiệm phân biệt.`,.25],[`Viète: S = ${sg(S)}, P = ${sg(P)}; ${x12(1)}² + ${x12(2)}² = S² − 2P = ${sg(v)}.`,.25]]),
        ask?ptxt([[`2${x12(1)} + 2${x12(2)} = 2S = ${sg(2*S)}; 2${x12(1)}·2${x12(2)} = 4P = ${sg(4*P)}.`,.25],[`Phương trình cần lập: ${eqQ(1,-2*S,4*P)}.`,.25]])
           :ptxt([[`(${x12(1)} + 1) + (${x12(2)} + 1) = S + 2 = ${sg(S+2)}; (${x12(1)} + 1)(${x12(2)} + 1) = P + S + 1 = ${sg(P+S+1)}.`,.25],[`Phương trình cần lập: ${eqQ(1,-(S+2),P+S+1)}.`,.25]])],chk:()=>S*S-4*P>0}}
});
TL9b('tl9-20-min',6,'VDC','alg',[20],r=>{
  const k=r.pick([2,4,-2,-4,6,-6]),mm=-k/2,minv=3*k*k;
  const eqH=`${I('x')}${sup(2)} ${MINUS} 2(${I('m')} ${k>0?'+':MINUS} ${Math.abs(k)})${I('x')} ${k>0?'+':MINUS} ${Math.abs(2*k)}${I('m')} = 0`;
  return{kind:'tl',title:'Giá trị nhỏ nhất liên quan đến nghiệm',parts:[{pts:.5,html:`Cho phương trình ${eqH} (${I('m')} là tham số). Chứng minh phương trình luôn có hai nghiệm phân biệt với mọi ${I('m')}.`},
    {pts:.5,html:`Gọi ${x12(1)}, ${x12(2)} là hai nghiệm của phương trình. Tìm ${I('m')} để ${I('A')} = ${x12(1)}${sup(2)} + ${x12(2)}${sup(2)} đạt giá trị nhỏ nhất.`}],
    sol:[ptxt([[`Δ′ = (m ${k>0?'+':'−'} ${Math.abs(k)})² − ${k>0?'':'('}${sg(2*k)}m${k>0?'':')'} = m² + ${k*k}.`,.25],[`Vì m² + ${k*k} > 0 với mọi m nên phương trình luôn có hai nghiệm phân biệt.`,.25]]),
      ptxt([[`Viète: S = 2(m ${k>0?'+':'−'} ${Math.abs(k)}), P = ${sg(2*k)}m; A = S² − 2P = 4m² ${k>0?'+':'−'} ${Math.abs(4*k)}m + ${4*k*k} = 4(m ${mm>0?'−':'+'} ${Math.abs(mm)})² + ${minv}.`,.25],[`A ≥ ${minv}, dấu "=" xảy ra khi m = ${sg(mm)}. Vậy A nhỏ nhất bằng ${minv} khi m = ${sg(mm)}.`,.25]])],
    chk:()=>{const S=2*(mm+k),P=2*k*mm;return S*S-2*P===minv}};
});
TL9b('tl9-20-abs',6,'VDC','alg',[20],r=>{
  const d=r.int(1,4),m0=d+r.int(1,4),T=2*m0;
  return{kind:'tl',title:'Hệ thức giữa hai nghiệm',parts:[{pts:.5,html:`Cho phương trình ${I('x')}${sup(2)} ${MINUS} 2${I('m')}${I('x')} + ${I('m')}${sup(2)} ${MINUS} ${d*d} = 0 (${I('m')} là tham số). Chứng minh phương trình luôn có hai nghiệm phân biệt và tìm hai nghiệm đó theo ${I('m')}.`},
    {pts:.5,html:`Tìm ${I('m')} để hai nghiệm ${x12(1)}, ${x12(2)} của phương trình thoả mãn |${x12(1)}| + |${x12(2)}| = ${T}.`}],
    sol:[ptxt([[`Δ′ = m² − (m² − ${d*d}) = ${d*d} > 0 với mọi m nên phương trình luôn có hai nghiệm phân biệt.`,.25],[`Hai nghiệm: x = m + ${d}, x = m − ${d}.`,.25]]),
      ptxt([[`Nếu |m| < ${d} thì hai nghiệm trái dấu, |${x12(1)}| + |${x12(2)}| = (m + ${d}) − (m − ${d}) = ${2*d} ≠ ${T}.`,.25],[`Nếu |m| ≥ ${d} thì hai nghiệm cùng dấu (hoặc có nghiệm bằng 0), |${x12(1)}| + |${x12(2)}| = 2|m| = ${T} ⟺ m = ${m0} hoặc m = −${m0} (thoả mãn |m| ≥ ${d}).`,.25]])],chk:()=>m0>d};
});
TL9b('tl9-21-rect',6,'TH','real',[21],r=>{
  const w=r.int(5,20),d=r.int(2,9),S=w*(w+d);
  return{kind:'tl',title:'Giải bài toán bằng cách lập phương trình',parts:[{pts:.5,html:`Một mảnh đất hình chữ nhật có chiều dài hơn chiều rộng ${d} m và diện tích bằng ${S} m². Gọi ${I('x')} (m) là chiều rộng của mảnh đất. Lập phương trình biểu thị diện tích mảnh đất theo ${I('x')}.`},{pts:.5,html:`Tính chiều dài, chiều rộng và chu vi của mảnh đất.`}],
    sol:[ptxt([[`Điều kiện x > 0; chiều dài là x + ${d} (m).`,.25],[`Ta có x(x + ${d}) = ${S} ⟺ ${eqQ(1,d,-S)}.`,.25]]),ptxt([[`Δ = ${d*d+4*S} = ${Math.sqrt(d*d+4*S)}²; x = ${w} (nhận) hoặc x = ${sg(-w-d)} (loại).`,.25],[`Chiều rộng ${w} m, chiều dài ${w+d} m, chu vi ${2*(2*w+d)} m.`,.25]])],chk:()=>isInt(Math.sqrt(d*d+4*S))};
});
TL9b('tl9-18-fall',6,'TH','real',[18],r=>{
  const h=r.pick([45,80,125,180,245]),t=Math.sqrt(h/5),t1=r.int(1,t-1);
  return{kind:'tl',title:'Ứng dụng hàm số y = ax²',parts:[{pts:.5,html:`Một vật được thả rơi tự do từ độ cao ${h} m so với mặt đất. Quãng đường vật rơi được sau ${I('t')} giây là ${I('s')} = 5${I('t')}${sup(2)} (mét). Sau ${t1} giây vật cách mặt đất bao nhiêu mét?`},{pts:.5,html:`Sau bao lâu vật chạm đất?`}],
    sol:[ptxt([[`Sau ${t1} giây vật rơi được s = 5·${t1}² = ${5*t1*t1} (m).`,.25],[`Vật cách mặt đất ${h} − ${5*t1*t1} = ${h-5*t1*t1} (m).`,.25]]),ptxt([[`Vật chạm đất khi 5t² = ${h} ⟺ t² = ${h/5}.`,.25],[`t = ${t} (t > 0). Vậy sau ${t} giây vật chạm đất.`,.25]])],chk:()=>t1<t&&isInt(t)};
});
TL9b('tl9-21-move',6,'VD','real',[21],r=>{
  for(;;){const v=r.pick([30,36,40,45,48,50,54,60]),k=r.pick([5,6,10,12,15]),t=r.pick([.5,1,1.5,2]),D=t*v*(v+k)/k;if(!isInt(D)||D>300||D<40)continue;
    const c=-D*k/t,Dl=k*k-4*c,sq=Math.sqrt(Dl);
    return{kind:'tl',title:'Bài toán chuyển động',parts:[{pts:.5,html:`Một ô tô đi từ ${I('A')} đến ${I('B')} dài ${D} km. Lúc về, xe tăng vận tốc thêm ${k} km/h nên thời gian về ít hơn thời gian đi ${fmt(t)} giờ. Gọi ${I('x')} (km/h) là vận tốc lúc đi. Lập phương trình theo ${I('x')}.`},{pts:.5,html:`Tính vận tốc lúc đi và thời gian đi của ô tô.`}],
      sol:[ptxt([[`Điều kiện x > 0. Thời gian đi ${fr(D,'x')} (giờ), thời gian về ${fr(D,`x + ${k}`)} (giờ).`,.25],[`Phương trình: ${fr(D,'x')} − ${fr(D,`x + ${k}`)} = ${fmt(t)}.`,.25]]),
        ptxt([[`Biến đổi được ${eqQ(1,k,c)}; Δ = ${Dl}, √Δ = ${sq}.`,.25],[`x = ${v} (nhận) hoặc x = ${sg(-v-k)} (loại). Vận tốc lúc đi ${v} km/h, thời gian đi ${fmt(D/v)} giờ.`,.25]])],chk:()=>isInt(sq)&&(-k+sq)/2===v}}
});
TL9b('tl9-21-tree',6,'VD','real',[21],r=>{
  for(;;){const x=r.int(10,40),k=r.int(2,8),N=r.pick([60,72,80,90,96,120,144,150,180,200,240]);if(N%x||N%(x+k))continue;const d=N/x-N/(x+k);if(d<1)continue;
    return{kind:'tl',title:'Bài toán năng suất',parts:[{pts:.5,html:`Một nhóm học sinh dự định trồng ${N} cây xanh, mỗi bạn trồng số cây như nhau. Khi thực hiện có thêm ${k} bạn tham gia nên mỗi bạn trồng ít hơn dự định ${d} cây. Gọi ${I('x')} là số học sinh của nhóm lúc đầu. Lập phương trình theo ${I('x')}.`},{pts:.5,html:`Hỏi lúc đầu nhóm có bao nhiêu học sinh?`}],
      sol:[ptxt([[`Điều kiện x ∈ ℕ*. Lúc đầu mỗi bạn trồng ${fr(N,'x')} cây; thực tế mỗi bạn trồng ${fr(N,`x + ${k}`)} cây.`,.25],[`Phương trình: ${fr(N,'x')} − ${fr(N,`x + ${k}`)} = ${d}.`,.25]]),
        ptxt([[`Biến đổi được ${eqQ(d,d*k,-N*k)}, tức là ${eqQ(1,k,-N*k/d)}.`,.25],[`x = ${x} (nhận) hoặc x = ${sg(-x-k)} (loại). Lúc đầu nhóm có ${x} học sinh.`,.25]])],chk:()=>isInt(N*k/d)&&x*(x+k)===N*k/d}}
});
