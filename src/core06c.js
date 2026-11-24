/* ================================================================
   LỚP 6 – học kì II
   Chương VI: Phân số (Bài 23 – 27)
   Chương VII: Số thập phân (Bài 28 – 31)
   ================================================================ */
const N6b=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:6,hk:2,les});
const DS6b=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:6,hk:2,les});
const TLN6b=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:6,hk:2,les});
const TL6b=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:6,hk:2,les});
const frN=(a,b)=>a<0?MINUS+fr(-a,b):fr(a,b);/* phân số không rút gọn, dấu đặt trước */
const qv6=q=>q[0]/q[1];
const qAdd=(p,q)=>Q(p[0]*q[1]+q[0]*p[1],p[1]*q[1]),qSub=(p,q)=>Q(p[0]*q[1]-q[0]*p[1],p[1]*q[1]),qMul=(p,q)=>Q(p[0]*q[0],p[1]*q[1]),qDiv=(p,q)=>Q(p[0]*q[1],p[1]*q[0]);
const mix6=(n,a,b)=>`${n}${fr(a,b)}`;
const dec6=v=>{const t=Math.round(v*1000)/1000;return (t<0?MINUS:'')+String(Math.abs(t)).replace('.',',')};
/* phân số tối giản ngẫu nhiên */
const fq6=(r,o={})=>{for(;;){const d=r.pick(o.ds||[2,3,4,5,6,7,8,9,10,12]),n=(o.neg&&r.chance(.4)?-1:1)*r.int(1,o.big?2*d:d-1);if(n&&gcd(Math.abs(n),d)===1)return[n,d]}};
const uq6=(xs,f,v)=>{const seen=new Set([f(v)]),o=[];for(const x of xs){const k=f(x);if(!seen.has(k)){seen.add(k);o.push(x)}}return o};
const qhx=q=>q[1]===1?sg(q[0]):qh(q);

/* ===================== Bài 23: Phân số bằng nhau ===================== */
N6b('k6-23-eq',6,'NB',[23],r=>{
  const [a,b]=fq6(r,{neg:true}),k=r.int(2,6);
  return mkTxt(r,{stem:`Phân số nào sau đây bằng phân số ${frN(a,b)}?`,correct:frN(a*k,b*k),wrongs:[frN(a+k,b+k),frN(a*k,b+k),frN(Math.sign(a)*b*k,Math.abs(a)*k),frN(-a*k,b*k),frN(a*k,b*(k+1))],
    sol:`Nhân cả tử và mẫu của ${frN(a,b)} với ${k}: ${frN(a,b)} = ${frN(a*k,b*k)}.`,chk:()=>Math.abs(a)!==b});
});
N6b('k6-23-simp',6,'TH',[23],r=>{
  const [a,b]=fq6(r,{neg:true}),k=r.pick([2,3,4,5,6,7,8,9,12,15]),A=a*k,B=b*k;
  return mkF(r,{stem:`Phân số tối giản của phân số ${frN(A,B)} là`,correct:Q(a,b),cands:[Q(-a,b),Q(b,a),Q(a*2,b),Q(a,b*2),Q(a+1,b)],
    sol:`ƯCLN(${Math.abs(A)}, ${B}) = ${gcd(A,B)}; chia cả tử và mẫu cho ${gcd(A,B)}: ${frN(A,B)} = ${qh(Q(a,b))}.`,chk:()=>gcd(Math.abs(A),B)===k});
});
N6b('k6-23-inv',6,'NB',[23,26],r=>{
  const [a,b]=fq6(r,{neg:true}),t=r.chance(.5);
  return mkF(r,{stem:`${t?'Số đối':'Phân số nghịch đảo'} của ${frN(a,b)} là`,correct:t?Q(-a,b):Q(b,a),cands:t?[Q(b,a),Q(-b,a),Q(a,b)]:[Q(-a,b),Q(-b,a),Q(a,b)],
    sol:t?`Số đối của ${frN(a,b)} là ${qh(Q(-a,b))}.`:`${frN(a,b)}·${qh(Q(b,a))} = 1 nên phân số nghịch đảo là ${qh(Q(b,a))}.`,chk:()=>Math.abs(a)!==b});
});
/* ===================== Bài 24: So sánh phân số, hỗn số ===================== */
N6b('k6-24-cmp',6,'NB',[24],r=>{
  for(;;){const F=[...Array(4)].map(()=>fq6(r,{ds:[3,4,5,6,8,9,10,12]}));if(new Set(F.map(qv6)).size<4)continue;const big=r.chance(.5),best=F.reduce((m,f)=>(big?qv6(f)>qv6(m):qv6(f)<qv6(m))?f:m);
    return mkTxt(r,{stem:`Phân số ${big?'lớn':'nhỏ'} nhất trong các phân số ${F.map(f=>fr(...f)).join('; ')} là`,correct:fr(...best),wrongs:F.filter(f=>f!==best).map(f=>fr(...f)),sol:`Quy đồng mẫu rồi so sánh tử: phân số ${big?'lớn':'nhỏ'} nhất là ${fr(...best)}.`,chk:()=>true})}
});
N6b('k6-24-mixed',6,'TH',[24],r=>{
  let n=r.int(2,6),[a,b]=fq6(r,{ds:[3,4,5,6,7,8,9]});if(b===2*a)[a,b]=[1,3];const t=r.chance(.5),N=n*b+a;
  if(t)return mkF(r,{stem:`Hỗn số ${mix6(n,a,b)} được viết dưới dạng phân số là`,correct:Q(N,b),cands:[Q(n*a+b,b),Q(n+a,b),Q(N,n*b),Q(n*b-a,b)],sol:`${mix6(n,a,b)} = ${fr(`${n}·${b} + ${a}`,b)} = ${fr(N,b)}.`,chk:()=>true});
  return mkTxt(r,{stem:`Phân số ${fr(N,b)} được viết dưới dạng hỗn số là`,correct:mix6(n,a,b),wrongs:[mix6(n+1,a,b),mix6(n,b-a,b),mix6(a,n,b),mix6(n-1||n+2,a,b)],sol:`${N} : ${b} = ${n} (dư ${a}) nên ${fr(N,b)} = ${mix6(n,a,b)}.`,chk:()=>b-a!==a});
});
/* ===================== Bài 25 – 26: Các phép tính với phân số ===================== */
N6b('k6-25-add',6,'TH',[25],r=>{
  const p=fq6(r,{neg:true}),q=fq6(r),t=r.chance(.5),v=t?qAdd(p,q):qSub(p,q);
  return mkF(r,{stem:`Kết quả của phép tính ${frN(...p)} ${t?'+':MINUS} ${fr(...q)} là`,correct:v,cands:[t?qSub(p,q):qAdd(p,q),Q(p[0]+(t?q[0]:-q[0]),p[1]+q[1]),Q(-v[0],v[1]),qMul(p,q)],
    sol:`Quy đồng mẫu: ${frN(...p)} ${t?'+':'−'} ${fr(...q)} = ${frN(p[0]*q[1],p[1]*q[1])} ${t?'+':'−'} ${fr(q[0]*p[1],p[1]*q[1])} = ${qhx(v)}.`,chk:()=>true});
});
N6b('k6-26-mul',6,'TH',[26],r=>{
  const p=fq6(r,{neg:true}),q=fq6(r),t=r.chance(.5),v=t?qMul(p,q):qDiv(p,q);
  return mkF(r,{stem:`Kết quả của phép tính ${frN(...p)} ${t?'·':':'} ${fr(...q)} là`,correct:v,cands:[t?qDiv(p,q):qMul(p,q),Q(-v[0],v[1]),Q(p[0]*q[0],p[1]+q[1]),qAdd(p,q)],
    sol:t?`Nhân tử với tử, mẫu với mẫu: ${frN(p[0]*q[0],p[1]*q[1])} = ${qhx(v)}.`:`Nhân với phân số nghịch đảo: ${frN(...p)}·${fr(q[1],q[0])} = ${qhx(v)}.`,chk:()=>true});
});
/* ===================== Bài 27: Hai bài toán về phân số ===================== */
N6b('k6-27-part',6,'TH',[27],r=>{
  const [a,b]=fq6(r,{ds:[3,4,5,6,8]}),N=b*r.int(3,12),v=N*a/b,t=r.chance(.5);
  if(t)return mkNum(r,{stem:`${fr(a,b)} của ${N} là`,correct:v,cands:[N*b/a,N/b,N-v,v+a].filter(isInt),ok:x=>x>0,sol:`${fr(a,b)} của ${N} là ${N}·${fr(a,b)} = ${v}.`,chk:()=>isInt(v)});
  return mkNum(r,{stem:`Biết ${fr(a,b)} của một số bằng ${v}. Số đó là`,correct:N,cands:[v*a/b,v*a,v+b,N-v].filter(x=>isInt(x)&&x>0),ok:x=>x>0,sol:`Số đó là ${v} : ${fr(a,b)} = ${v}·${fr(b,a)} = ${N}.`,chk:()=>isInt(v)});
});
N6b('k6-27-real',6,'TH',[27],r=>{
  const [a,b]=fq6(r,{ds:[3,4,5]}),N=b*r.int(6,12),v=N*a/b;
  return mkNum(r,{stem:`Lớp 6A có ${N} học sinh, trong đó số học sinh nữ chiếm ${fr(a,b)} số học sinh cả lớp. Số học sinh nam của lớp là`,correct:N-v,cands:[v,N*b/a,N-v+a,N/b].filter(x=>isInt(x)&&x>0),ok:x=>x>0,sol:`Số học sinh nữ: ${N}·${fr(a,b)} = ${v}; số học sinh nam: ${N} − ${v} = ${N-v}.`,chk:()=>isInt(v)&&N-v!==v});
});
/* ---------- Đúng/sai chương VI ---------- */
DS6b('ds6-23-eq',6,'NB',[23],r=>{
  for(;;){const [a,b]=fq6(r,{neg:true}),k=r.int(2,5),[c,d]=fq6(r);if(Math.abs(a)===b||a+k===a*k||qv6([c,d])===qv6([a,b])||c===1)continue;
  return mkDS(r,{stem:`Cho phân số ${frN(a,b)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${frN(a,b)} = ${frN(a*k,b*k)}.`,f:`${frN(a,b)} = ${frN(a+k,b+k)}.`,why:`Nhân cả tử và mẫu với ${k}.`},
    {t:`${frN(a,b)} là phân số tối giản.`,f:`${frN(a,b)} chưa phải là phân số tối giản.`,why:`ƯCLN(${Math.abs(a)}, ${b}) = 1.`},
    {t:`Số đối của ${frN(a,b)} là ${frN(-a,b)}.`,f:`Số đối của ${frN(a,b)} là ${frN(b,a)}.`,why:`${frN(a,b)} + (${frN(-a,b)}) = 0.`},
    {t:`${frN(c*a,c*b)} = ${frN(a,b)}.`,f:`${frN(c*a,c*b)} = ${frN(c,d)}.`,why:`Rút gọn cho ${c}.`}],chk:()=>true})}
});
DS6b('ds6-24-cmp',6,'NB',[24],r=>{
  for(;;){const p=fq6(r,{ds:[3,4,5,6,7,8,9]}),q=fq6(r,{ds:[3,4,5,6,7,8,9]}),n=r.int(2,4),[a,b]=fq6(r,{ds:[3,4,5,7]});if(qv6(p)===qv6(q))continue;const big=qv6(p)>qv6(q);
    return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
      {t:`${fr(...p)} ${big?'>':'<'} ${fr(...q)}.`,f:`${fr(...p)} ${big?'<':'>'} ${fr(...q)}.`,why:`Quy đồng: ${fr(p[0]*q[1],p[1]*q[1])} và ${fr(q[0]*p[1],p[1]*q[1])}.`},
      {t:`${MINUS}${fr(...p)} ${big?'<':'>'} ${MINUS}${fr(...q)}.`,f:`${MINUS}${fr(...p)} ${big?'>':'<'} ${MINUS}${fr(...q)}.`,why:`Đổi dấu hai số thì đổi chiều bất đẳng thức.`},
      {t:`${mix6(n,a,b)} = ${fr(n*b+a,b)}.`,f:`${mix6(n,a,b)} = ${fr(n*a+b,b)}.`,why:`${n}·${b} + ${a} = ${n*b+a}.`},
      {t:`Mọi phân số âm đều nhỏ hơn mọi phân số dương.`,f:`Có phân số âm lớn hơn một phân số dương.`,why:`Phân số âm < 0 < phân số dương.`}],chk:()=>n*b+a!==n*a+b})}
});
DS6b('ds6-25-calc',6,'TH',[25],r=>{
  for(;;){const p=fq6(r),q=fq6(r),s=fq6(r,{neg:true}),v1=qAdd(p,q),v2=qSub(p,q);if(v2[0]===0||qv6(v1)===(p[0]+q[0])/(p[1]+q[1]))continue;
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${fr(...p)} + ${fr(...q)} = ${qhx(v1)}.`,f:`${fr(...p)} + ${fr(...q)} = ${fr(p[0]+q[0],p[1]+q[1])}.`,why:`Quy đồng mẫu rồi cộng tử.`},
    {t:`${fr(...p)} ${MINUS} ${fr(...q)} = ${qhx(v2)}.`,f:`${fr(...p)} ${MINUS} ${fr(...q)} = ${qhx(Q(-v2[0],v2[1]))}.`,why:`= ${frN(p[0]*q[1],p[1]*q[1])} − ${fr(q[0]*p[1],p[1]*q[1])}.`},
    {t:`${frN(...s)} + (${frN(-s[0],s[1])}) = 0.`,f:`${frN(...s)} + (${frN(-s[0],s[1])}) = ${qhx(Q(2*s[0],s[1]))}.`,why:`Tổng hai số đối nhau bằng 0.`},
    {t:`${fr(...p)} + ${fr(...q)} = ${fr(...q)} + ${fr(...p)}.`,f:`${fr(...p)} ${MINUS} ${fr(...q)} = ${fr(...q)} ${MINUS} ${fr(...p)}.`,why:`Phép cộng có tính chất giao hoán, phép trừ thì không.`}],chk:()=>true})}
});
DS6b('ds6-26-calc',6,'TH',[26],r=>{
  const p=fq6(r,{neg:true}),q=fq6(r),m=qMul(p,q),d=qDiv(p,q);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${frN(...p)}·${fr(...q)} = ${qhx(m)}.`,f:`${frN(...p)}·${fr(...q)} = ${qhx(d)}.`,why:`Nhân tử với tử, mẫu với mẫu.`},
    {t:`${frN(...p)} : ${fr(...q)} = ${qhx(d)}.`,f:`${frN(...p)} : ${fr(...q)} = ${qhx(m)}.`,why:`Nhân với nghịch đảo ${fr(q[1],q[0])}.`},
    {t:`${fr(...q)}·${fr(q[1],q[0])} = 1.`,f:`${fr(...q)}·${fr(q[1],q[0])} = 0.`,why:`Tích của một số với nghịch đảo của nó bằng 1.`},
    {t:`${frN(...p)}·0 = 0.`,f:`${frN(...p)}·0 = ${frN(...p)}.`,why:`Mọi số nhân với 0 bằng 0.`}],chk:()=>qv6(m)!==qv6(d)});
});
DS6b('ds6-27-real',6,'VD',[27],r=>{
  for(;;){const [a,b]=fq6(r,{ds:[3,4,5]}),[c,d]=fq6(r,{ds:[3,4,5,6]}),N=b*d*r.int(2,6),x=N*a/b,y=(N-x)*c/d,z=N-x-y;if(!isInt(y)||z<=0)continue;
    return mkDS(r,{stem:`Một cửa hàng có ${N} kg gạo. Ngày thứ nhất bán ${fr(a,b)} số gạo; ngày thứ hai bán ${fr(c,d)} số gạo còn lại. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Ngày thứ nhất bán được ${x} kg.`,f:`Ngày thứ nhất bán được ${N-x} kg.`,why:`${N}·${fr(a,b)} = ${x}.`},
      {t:`Sau ngày thứ nhất còn lại ${N-x} kg.`,f:`Sau ngày thứ nhất còn lại ${x} kg.`,why:`${N} − ${x} = ${N-x}.`},
      {t:`Ngày thứ hai bán được ${y} kg.`,f:`Ngày thứ hai bán được ${N*c/d} kg.`,why:`${N-x}·${fr(c,d)} = ${y}.`},
      {t:`Cửa hàng còn lại ${z} kg gạo.`,f:`Cửa hàng còn lại ${z+y} kg gạo.`,why:`${N} − ${x} − ${y} = ${z}.`}],chk:()=>x!==N-x&&y!==N*c/d})}
});
DS6b('ds6-26-x',6,'VD',[26],r=>{
  const p=fq6(r),q=fq6(r),x1=qSub(q,p),k=fq6(r),x2=qDiv(q,k);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`Nếu ${I('x')} + ${fr(...p)} = ${fr(...q)} thì ${I('x')} = ${qhx(x1)}.`,f:`Nếu ${I('x')} + ${fr(...p)} = ${fr(...q)} thì ${I('x')} = ${qhx(qAdd(q,p))}.`,why:`x = ${fr(...q)} − ${fr(...p)}.`},
    {t:`Nếu ${fr(...k)}·${I('x')} = ${fr(...q)} thì ${I('x')} = ${qhx(x2)}.`,f:`Nếu ${fr(...k)}·${I('x')} = ${fr(...q)} thì ${I('x')} = ${qhx(qMul(q,k))}.`,why:`x = ${fr(...q)} : ${fr(...k)}.`},
    {t:`Nếu ${I('x')} : ${fr(...k)} = ${fr(...q)} thì ${I('x')} = ${qhx(qMul(q,k))}.`,f:`Nếu ${I('x')} : ${fr(...k)} = ${fr(...q)} thì ${I('x')} = ${qhx(x2)}.`,why:`x = ${fr(...q)}·${fr(...k)}.`},
    {t:`Nếu ${I('x')} ${MINUS} ${fr(...p)} = 0 thì ${I('x')} = ${fr(...p)}.`,f:`Nếu ${I('x')} ${MINUS} ${fr(...p)} = 0 thì ${I('x')} = ${MINUS}${fr(...p)}.`,why:`x = ${fr(...p)}.`}],chk:()=>qv6(x2)!==qv6(qMul(q,k))&&qv6(x1)!==qv6(qAdd(q,p))});
});
/* ---------- Trả lời ngắn chương VI ---------- */
TLN6b('t6-27-part',6,'TH',[27],r=>{
  const [a,b]=fq6(r,{ds:[3,4,5,6,8]}),N=b*r.int(4,15),v=N*a/b,t=r.chance(.5);
  return t?{kind:'tln',stem:`Tính ${fr(a,b)} của ${N}.`,ans:v,unit:'',sol:`${N}·${fr(a,b)} = ${v}.`,chk:()=>true}
    :{kind:'tln',stem:`Tìm một số, biết ${fr(a,b)} của số đó bằng ${v}.`,ans:N,unit:'',sol:`${v} : ${fr(a,b)} = ${N}.`,chk:()=>true};
});
TLN6b('t6-25-calc',6,'TH',[25,26],r=>{
  for(;;){const p=fq6(r,{ds:[2,4,5,8,10]}),q=fq6(r,{ds:[2,4,5,8,10]}),t=r.int(0,2),v=[qAdd(p,q),qSub(p,q),qMul(p,q)][t];const x=qv6(v);if(!isInt(x*1000))continue;
    return{kind:'tln',stem:`Tính ${fr(...p)} ${['+',MINUS,'·'][t]} ${fr(...q)} (viết kết quả dưới dạng số thập phân).`,ans:x,unit:'',sol:`= ${qhx(v)} = ${dec6(x)}.`,chk:()=>true}}
});
TLN6b('t6-26-x',6,'VD',[26],r=>{
  for(;;){const k=fq6(r,{ds:[2,4,5]}),p=fq6(r,{ds:[2,4,5,10]}),x=r.pick([-4,-2,-1.5,-0.5,0.5,1.5,2,2.5,3,4]),xq=Q(x*2,2),rhs=qAdd(qMul(k,xq),p);if(Math.abs(rhs[1])>40)continue;
    return{kind:'tln',stem:`Tìm ${I('x')}, biết ${fr(...k)}${I('x')} + ${fr(...p)} = ${qhx(rhs)}.`,ans:x,unit:'',sol:`${fr(...k)}x = ${qhx(rhs)} − ${fr(...p)} = ${qhx(qSub(rhs,p))}; x = ${qhx(qSub(rhs,p))} : ${fr(...k)} = ${fmt(x)}.`,chk:()=>Math.abs(qv6(qDiv(qSub(rhs,p),k))-x)<1e-9}}
});
TLN6b('t6-25-tele',6,'VD',[25],r=>{
  const n=r.int(5,30);
  return{kind:'tln',stem:`Cho ${I('S')} = ${fr(1,'1·2')} + ${fr(1,'2·3')} + ${fr(1,'3·4')} + … + ${fr(1,`${n}·${n+1}`)}. Tính ${n+1}·${I('S')}.`,ans:n,unit:'',sol:`${fr(1,'k(k + 1)')} = ${fr(1,'k')} − ${fr(1,'k + 1')} nên S = 1 − ${fr(1,n+1)} = ${fr(n,n+1)}; ${n+1}·S = ${n}.`,chk:()=>true};
});
TLN6b('t6-27-real',6,'VD',[27],r=>{
  for(;;){const [a,b]=fq6(r,{ds:[3,4,5]}),[c,d]=fq6(r,{ds:[3,4,5]}),rest=r.int(5,40);if((rest*b*d)%((b-a)*(d-c)))continue;const N=rest*b*d/((b-a)*(d-c));if(N>600)continue;
    return{kind:'tln',stem:`Một người đi quãng đường ${I('AB')}. Ngày thứ nhất đi được ${fr(a,b)} quãng đường, ngày thứ hai đi được ${fr(c,d)} quãng đường còn lại, ngày thứ ba đi nốt ${rest} km. Tính độ dài quãng đường ${I('AB')} (đơn vị: km).`,ans:N,unit:'km',
      sol:`Sau ngày thứ nhất còn ${qh(Q(b-a,b))} quãng đường; ngày thứ ba đi ${qh(Q(d-c,d))}·${qh(Q(b-a,b))} = ${qh(Q((b-a)*(d-c),b*d))} quãng đường, ứng với ${rest} km. AB = ${rest} : ${qh(Q((b-a)*(d-c),b*d))} = ${N} (km).`,chk:()=>true}}
});
/* ---------- Tự luận chương VI ---------- */
TL6b('tl6-25-calc',6,'TH','alg',[25,26],r=>{
  const p=fq6(r),q=fq6(r,{neg:true}),k=fq6(r),a=fq6(r),b=Q(a[1]-a[0],a[1]);
  return{kind:'tl',title:'Thực hiện phép tính với phân số',parts:[{pts:.5,html:`Tính: ${fr(...p)} + ${q[0]<0?'('+frN(...q)+')':frN(...q)}.`},{pts:.5,html:`Tính hợp lí: ${fr(...k)}·${fr(...a)} + ${fr(...k)}·${fr(...b)}.`}],
    sol:[ptxt([[`= ${frN(p[0]*q[1],p[1]*q[1])} + ${q[0]<0?'('+frN(q[0]*p[1],p[1]*q[1])+')':frN(q[0]*p[1],p[1]*q[1])}`,.25],[`= ${qhx(qAdd(p,q))}.`,.25]]),ptxt([[`= ${fr(...k)}·(${fr(...a)} + ${fr(...b)}) = ${fr(...k)}·1`,.25],[`= ${fr(...k)}.`,.25]])],chk:()=>qv6(qAdd(a,b))===1};
});
TL6b('tl6-26-findx',6,'TH','alg',[25,26],r=>{
  const p=fq6(r),q=fq6(r),x1=qSub(q,p),k=fq6(r),s=fq6(r),x2=qDiv(s,k);
  return{kind:'tl',title:'Tìm x',parts:[{pts:.5,html:`Tìm ${I('x')}, biết ${I('x')} + ${fr(...p)} = ${fr(...q)}.`},{pts:.5,html:`Tìm ${I('x')}, biết ${fr(...k)}·${I('x')} = ${fr(...s)}.`}],
    sol:[ptxt([[`x = ${fr(...q)} − ${fr(...p)}`,.25],[`x = ${qhx(x1)}.`,.25]]),ptxt([[`x = ${fr(...s)} : ${fr(...k)} = ${fr(...s)}·${fr(k[1],k[0])}`,.25],[`x = ${qhx(x2)}.`,.25]])],chk:()=>true};
});
TL6b('tl6-25-quick',6,'VD','alg',[25,26],r=>{
  const p=fq6(r,{ds:[3,5,7,9,11]}),q=fq6(r,{ds:[4,6,8,13]}),s=fq6(r,{ds:[3,5,7,9,11]}),m=fq6(r,{ds:[5,7,9]}),n=fq6(r,{ds:[5,7,9]});
  const A=qAdd(qAdd(p,q),Q(-p[0],p[1])),B=qMul(m,qSub(n,Q(-n[0]+0,n[1])));
  return{kind:'tl',title:'Tính hợp lí',parts:[{pts:.5,html:`Tính hợp lí: ${fr(...p)} + ${fr(...q)} ${MINUS} ${fr(...p)} + ${frN(...s)} ${MINUS} ${frN(...s)}.`},{pts:.5,html:`Tính hợp lí: ${fr(...m)}·${fr(...n)} + ${fr(...m)}·${fr(n[1]-n[0],n[1])} ${MINUS} ${fr(...m)}.`}],
    sol:[ptxt([[`= (${fr(...p)} − ${fr(...p)}) + (${frN(...s)} − ${frN(...s)}) + ${fr(...q)}`,.25],[`= 0 + 0 + ${fr(...q)} = ${fr(...q)}.`,.25]]),ptxt([[`= ${fr(...m)}·(${fr(...n)} + ${fr(n[1]-n[0],n[1])}) − ${fr(...m)} = ${fr(...m)}·1 − ${fr(...m)}`,.25],[`= 0.`,.25]])],chk:()=>A&&B&&true};
});
TL6b('tl6-26-x2',6,'VD','alg',[24,26],r=>{
  for(;;){const n=r.int(1,3),[a,b]=fq6(r,{ds:[2,3,4,5]}),M=Q(n*b+a,b),k=fq6(r,{ds:[2,3,4]}),x=r.pick([Q(1,2),Q(3,4),Q(2,3),Q(5,2),Q(3,2),Q(1,3)]),rhs=qMul(k,qAdd(x,M));if(rhs[1]>36)continue;
    return{kind:'tl',title:'Tìm x (nâng cao)',parts:[{pts:.5,html:`Viết hỗn số ${mix6(n,a,b)} dưới dạng phân số. Tìm ${I('x')}, biết ${fr(...k)}·(${I('x')} + ${mix6(n,a,b)}) = ${qhx(rhs)}.`},{pts:.5,html:`Tìm ${I('x')}, biết ${I('x')} : ${fr(...k)} = ${qhx(qAdd(x,M))}.`}],
      sol:[ptxt([[`${mix6(n,a,b)} = ${qh(M)}; x + ${qh(M)} = ${qhx(rhs)} : ${fr(...k)} = ${qhx(qAdd(x,M))}.`,.25],[`x = ${qhx(qAdd(x,M))} − ${qh(M)} = ${qhx(x)}.`,.25]]),ptxt([[`x = ${qhx(qAdd(x,M))}·${fr(...k)}`,.25],[`x = ${qhx(rhs)}.`,.25]])],chk:()=>Math.abs(qv6(qSub(qDiv(rhs,k),M))-qv6(x))<1e-9}}
});
TL6b('tl6-27-class',6,'TH','real',[27],r=>{
  for(;;){const N=r.pick([30,36,40,42,45]),[a,b]=fq6(r,{ds:[3,5,6]}),g=N*a/b,[c,d]=fq6(r,{ds:[2,3,4,5]}),k=(N-g)*c/d;if(!isInt(g)||!isInt(k)||N-g-k<=0)continue;
    return{kind:'tl',title:'Hai bài toán về phân số',parts:[{pts:.5,html:`Lớp 6B có ${N} học sinh. Cuối năm, số học sinh xếp loại Tốt chiếm ${fr(a,b)} số học sinh cả lớp. Tính số học sinh xếp loại Tốt.`},{pts:.5,html:`Số học sinh xếp loại Khá bằng ${fr(c,d)} số học sinh còn lại, các bạn còn lại xếp loại Đạt. Tính số học sinh xếp loại Khá và Đạt.`}],
      sol:[ptxt([[`Số học sinh Tốt: ${N}·${fr(a,b)}`,.25],[`= ${g} (học sinh).`,.25]]),ptxt([[`Số học sinh Khá: (${N} − ${g})·${fr(c,d)} = ${k} (học sinh).`,.25],[`Số học sinh Đạt: ${N} − ${g} − ${k} = ${N-g-k} (học sinh).`,.25]])],chk:()=>true}}
});
TL6b('tl6-27-road',6,'VD','real',[27],r=>{
  for(;;){const [a,b]=fq6(r,{ds:[3,4,5]}),[c,d]=fq6(r,{ds:[3,4,5]}),rest=r.int(10,60);if((rest*b*d)%((b-a)*(d-c)))continue;const N=rest*b*d/((b-a)*(d-c));if(N>600||(N*a)%b)continue;const x=N*a/b;if(((N-x)*c)%d)continue;const y=(N-x)*c/d;
    return{kind:'tl',title:'Bài toán quãng đường',parts:[{pts:.5,html:`Một người đi quãng đường ${I('AB')} trong ba ngày. Ngày thứ nhất đi ${fr(a,b)} quãng đường, ngày thứ hai đi ${fr(c,d)} quãng đường còn lại, ngày thứ ba đi nốt ${rest} km. Quãng đường ngày thứ ba chiếm bao nhiêu phần quãng đường ${I('AB')}?`},{pts:.5,html:`Tính độ dài quãng đường ${I('AB')} và quãng đường đi được trong mỗi ngày.`}],
      sol:[ptxt([[`Sau ngày thứ nhất còn 1 − ${fr(a,b)} = ${qh(Q(b-a,b))} quãng đường.`,.25],[`Ngày thứ ba đi ${qh(Q(d-c,d))}·${qh(Q(b-a,b))} = ${qh(Q((b-a)*(d-c),b*d))} quãng đường.`,.25]]),ptxt([[`AB = ${rest} : ${qh(Q((b-a)*(d-c),b*d))} = ${N} (km).`,.25],[`Ngày thứ nhất ${x} km, ngày thứ hai ${y} km, ngày thứ ba ${rest} km.`,.25]])],chk:()=>isInt(x)&&isInt(y)}}
});
/* ---------- Tự luận nâng cao chương VI (role num) ---------- */
TL6b('tl6-24-cmp',6,'VD','num',[24],r=>{
  const n=r.int(10,99),m=r.int(10,99),a=r.int(2,9);
  return{kind:'tl',title:'So sánh phân số',parts:[{pts:.5,html:`So sánh ${fr(n,n+1)} và ${fr(n+1,n+2)}.`},{pts:.5,html:`So sánh ${fr(m,m+a)} và ${fr(m+1,m+a+1)} mà không quy đồng mẫu.`}],
    sol:[ptxt([[`1 − ${fr(n,n+1)} = ${fr(1,n+1)}; 1 − ${fr(n+1,n+2)} = ${fr(1,n+2)}.`,.25],[`Vì ${fr(1,n+1)} > ${fr(1,n+2)} nên ${fr(n,n+1)} < ${fr(n+1,n+2)}.`,.25]]),ptxt([[`1 − ${fr(m,m+a)} = ${fr(a,m+a)}; 1 − ${fr(m+1,m+a+1)} = ${fr(a,m+a+1)}.`,.25],[`Vì ${fr(a,m+a)} > ${fr(a,m+a+1)} nên ${fr(m,m+a)} < ${fr(m+1,m+a+1)}.`,.25]])],chk:()=>true};
});
TL6b('tl6-26-prod',6,'VD','num',[26],r=>{
  const n=r.int(8,40);
  return{kind:'tl',title:'Tích có quy luật',parts:[{pts:.5,html:`Tính ${I('A')} = (1 ${MINUS} ${fr(1,2)})·(1 ${MINUS} ${fr(1,3)})·(1 ${MINUS} ${fr(1,4)})·…·(1 ${MINUS} ${fr(1,n)}).`},{pts:.5,html:`Tính ${I('B')} = (1 + ${fr(1,2)})·(1 + ${fr(1,3)})·…·(1 + ${fr(1,n)}).`}],
    sol:[ptxt([[`A = ${fr(1,2)}·${fr(2,3)}·${fr(3,4)}·…·${fr(n-1,n)}.`,.25],[`Rút gọn các tử và mẫu giống nhau: A = ${fr(1,n)}.`,.25]]),ptxt([[`B = ${fr(3,2)}·${fr(4,3)}·${fr(5,4)}·…·${fr(n+1,n)}.`,.25],[`B = ${qh(Q(n+1,2))}.`,.25]])],chk:()=>true};
});
TL6b('tl6-25-tele',6,'VDC','num',[25],r=>{
  const n=r.int(10,99),k=r.pick([2,3]),m=r.int(5,30);
  return{kind:'tl',title:'Tổng các phân số có quy luật',parts:[{pts:.5,html:`Tính ${I('S')} = ${fr(1,'1·2')} + ${fr(1,'2·3')} + ${fr(1,'3·4')} + … + ${fr(1,`${n}·${n+1}`)}.`},{pts:.5,html:`Tính ${I('P')} = ${fr(k,`1·${1+k}`)} + ${fr(k,`${1+k}·${1+2*k}`)} + … + ${fr(k,`${1+(m-1)*k}·${1+m*k}`)}.`}],
    sol:[ptxt([[`${fr(1,'k(k + 1)')} = ${fr(1,'k')} − ${fr(1,'k + 1')} nên S = 1 − ${fr(1,2)} + ${fr(1,2)} − ${fr(1,3)} + … + ${fr(1,n)} − ${fr(1,n+1)}.`,.25],[`S = 1 − ${fr(1,n+1)} = ${fr(n,n+1)}.`,.25]]),ptxt([[`${fr(k,'a(a + '+k+')')} = ${fr(1,'a')} − ${fr(1,'a + '+k)} nên P = 1 − ${fr(1,1+k)} + ${fr(1,1+k)} − … − ${fr(1,1+m*k)}.`,.25],[`P = 1 − ${fr(1,1+m*k)} = ${fr(m*k,1+m*k)}.`,.25]])],chk:()=>true};
});
TL6b('tl6-23-int',6,'VDC','num',[23,24],r=>{
  const k=r.pick([3,5,7,8,9,11]),D=divs6(k).flatMap(d=>[-d,d]).sort((a,b)=>a-b),N=D.map(d=>d-1);
  return{kind:'tl',title:'Phân số có giá trị nguyên',parts:[{pts:.5,html:`Cho phân số ${I('A')} = ${fr(`${I('n')} + ${k+1}`,`${I('n')} + 1`)} (${I('n')} là số nguyên, ${I('n')} ≠ ${MINUS}1). Chứng minh ${I('A')} = 1 + ${fr(k,`${I('n')} + 1`)}.`},{pts:.5,html:`Tìm tất cả các số nguyên ${I('n')} để ${I('A')} có giá trị là số nguyên.`}],
    sol:[ptxt([[`n + ${k+1} = (n + 1) + ${k}`,.25],[`nên A = ${fr('n + 1','n + 1')} + ${fr(k,'n + 1')} = 1 + ${fr(k,'n + 1')}.`,.25]]),ptxt([[`A nguyên ⟺ ${k} chia hết cho n + 1 ⟺ n + 1 ∈ Ư(${k}) = ${intSet6(D)}.`,.25],[`Vậy n ∈ ${intSet6(N)}.`,.25]])],chk:()=>!N.includes(-1)};
});

/* ===================== Chương VII: Số thập phân ===================== */
N6b('k6-28-cmp',7,'NB',[28],r=>{
  for(;;){const xs=[...Array(4)].map(()=>(r.chance(.4)?-1:1)*r.int(1,999)/100);if(new Set(xs).size<4)continue;const big=r.chance(.5),b=big?Math.max(...xs):Math.min(...xs);
    return mkTxt(r,{stem:`Số ${big?'lớn':'nhỏ'} nhất trong các số ${xs.map(dec6).join('; ')} là`,correct:dec6(b),wrongs:xs.filter(x=>x!==b).map(dec6),sol:`So sánh các số thập phân: số ${big?'lớn':'nhỏ'} nhất là ${dec6(b)}.`,chk:()=>true})}
});
N6b('k6-28-frac',7,'NB',[28],r=>{
  const t=r.chance(.5);
  if(t){const d=r.pick([10,100,1000]),n=r.nz(-999,999),v=n/d;return mkNum(r,{stem:`Phân số thập phân ${frN(n,d)} được viết dưới dạng số thập phân là`,correct:v,f:dec6,cands:uq6([v*10,v/10,-v,n/(d*100),v+1],dec6,v),ok:()=>true,sol:`${frN(n,d)} = ${dec6(v)}.`,chk:()=>true})}
  const [a,b]=r.pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[1,8],[3,8],[7,20],[9,25]]),s=r.chance(.4)?-1:1,v=s*a/b;
  return mkNum(r,{stem:`Phân số ${frN(s*a,b)} được viết dưới dạng số thập phân là`,correct:v,f:dec6,cands:uq6([s*b/a,-v,v*10,s*(a+b)/100,v/10],dec6,v),ok:()=>true,sol:`${frN(s*a,b)} = ${s<0?'−':''}(${a} : ${b}) = ${dec6(v)}.`,chk:()=>true});
});
N6b('k6-29-calc',7,'TH',[29],r=>{
  const a=r.nz(-999,999)/100,b=r.nz(-99,99)/10,t=r.int(0,2),v=[a+b,a-b,Math.round(a*b*1000)/1000][t];
  return mkNum(r,{stem:`Kết quả của phép tính ${dec6(a)} ${['+',MINUS,'·'][t]} ${b<0?'('+dec6(b)+')':dec6(b)} là`,correct:v,f:dec6,cands:uq6([[a-b,a+b,a*b*10][t],-v,v*10,v+1,v-1],dec6,v),ok:()=>true,sol:`= ${dec6(v)}.`,chk:()=>true});
});
N6b('k6-30-round',7,'NB',[30],r=>{
  for(;;){const Nn=r.int(1000,999999),v=Nn/1000,k=r.pick([0,1,2]),div=10**(3-k),dg=Math.floor((Nn%div)/(div/10));if(dg<5)continue;const rv=(Math.floor(Nn/div)+1)/10**k,tr=Math.floor(Nn/div)/10**k;
    return mkNum(r,{stem:`Làm tròn số ${dec6(v)} đến ${['hàng đơn vị','hàng phần mười','hàng phần trăm'][k]}, ta được`,correct:rv,f:v=>v.toFixed(k).replace('.',','),cands:uq6([tr,Math.round(Nn/(div/10))/10**(k+1),rv+10**-k,tr-10**-k,Math.round(v)+10].map(x=>Math.round(x*1000)/1000),x=>x.toFixed(k),rv),ok:()=>true,
      sol:`Chữ số ngay sau hàng làm tròn là ${dg} ≥ 5 nên cộng thêm 1 vào hàng làm tròn: ${rv.toFixed(k).replace('.',',')}.`,chk:()=>true})}
});
N6b('k6-31-pct',7,'TH',[31],r=>{
  const t=r.chance(.5);
  if(t){const p=r.pick([5,10,12,15,20,25,30,40,60,75]),N=r.int(2,40)*20,v=N*p/100;return mkNum(r,{stem:`${p}% của ${N} là`,correct:v,f:v=>fmt(v),cands:[N/p,N*p/10,N-v,v*2],ok:x=>x>0,sol:`${N}·${p}% = ${N}·${fr(p,100)} = ${fmt(v)}.`,chk:()=>isInt(v*10)})}
  const b=r.pick([20,25,40,50,80,200]),a=r.int(1,b-1),v=a*100/b;return mkNum(r,{stem:`Tỉ số phần trăm của ${a} và ${b} là`,correct:v,f:x=>fmt(x)+'%',cands:[b*100/a,a/b,v*10,100-v].map(x=>Math.round(x*100)/100),ok:x=>x>0,sol:`${fr(a,b)}·100% = ${fmt(v)}%.`,chk:()=>isInt(v*100)});
});
N6b('k6-31-ratio',7,'TH',[31],r=>{
  const a=r.int(2,9)*10,b=r.int(2,9)*25,t=r.chance(.5);
  if(t){const s=r.pick([1000,10000,100000,500000]),cm=r.int(2,30),km=cm*s/100000;return mkNum(r,{stem:`Trên bản đồ tỉ lệ 1 : ${nv(s)}, khoảng cách giữa hai điểm là ${cm} cm. Khoảng cách thực tế giữa hai điểm đó là`,correct:km,f:v=>fmt(v)+' km',cands:uq6([km*10,km/10,cm*s/1000,km*100,km+1],x=>fmt(x),km),ok:x=>x>0,sol:`${cm}·${nv(s)} = ${nv(cm*s)} cm = ${fmt(km)} km.`,chk:()=>true})}
  return mkF(r,{stem:`Tỉ số của ${a} cm và ${b} cm là`,correct:Q(a,b),cands:[Q(b,a),Q(a,b*10),Q(a+b,b),Q(a,a+b)],sol:`${fr(a,b)} = ${qh(Q(a,b))}.`,chk:()=>true});
});
/* ---------- Đúng/sai chương VII ---------- */
DS6b('ds6-28-dec',7,'NB',[28],r=>{
  const a=r.int(101,999)/100,b=-r.int(101,999)/100,n=r.int(1,99),[p,q]=r.pick([[1,4],[3,4],[2,5],[3,8],[7,20]]);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${dec6(b)} < ${dec6(a)}.`,f:`${dec6(b)} > ${dec6(a)}.`,why:`Số thập phân âm nhỏ hơn số thập phân dương.`},
    {t:`${fr(n,100)} = ${dec6(n/100)}.`,f:`${fr(n,100)} = ${dec6(n/10)}.`,why:`Phân số thập phân có mẫu 100 ứng với hai chữ số sau dấu phẩy.`},
    {t:`${fr(p,q)} = ${dec6(p/q)}.`,f:`${fr(p,q)} = ${dec6(q/p)}.`,why:`${p} : ${q} = ${dec6(p/q)}.`},
    {t:`Số đối của ${dec6(b)} là ${dec6(-b)}.`,f:`Số đối của ${dec6(b)} là ${dec6(b)}.`,why:`Hai số đối nhau có tổng bằng 0.`}],chk:()=>n%10!==0||true});
});
DS6b('ds6-30-round',7,'NB',[30],r=>{
  for(;;){const v=r.int(10000,999999)/1000;const u=Math.round(v),t1=Math.round(v*10)/10,t2=Math.round(v*100)/100;if(u===Math.floor(v)&&false)continue;
    return mkDS(r,{stem:`Cho số ${dec6(v)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Làm tròn đến hàng đơn vị được ${fmt(u)}.`,f:`Làm tròn đến hàng đơn vị được ${fmt(u===Math.floor(v)?u+1:u-1)}.`,why:`Chữ số hàng phần mười là ${Math.floor(v*10)%10}.`},
      {t:`Làm tròn đến hàng phần mười được ${t1.toFixed(1).replace('.',',')}.`,f:`Làm tròn đến hàng phần mười được ${(Math.round((t1+.1)*10)/10).toFixed(1).replace('.',',')}.`,why:`Chữ số hàng phần trăm là ${Math.floor(v*100)%10}.`},
      {t:`Làm tròn đến hàng phần trăm được ${t2.toFixed(2).replace('.',',')}.`,f:`Làm tròn đến hàng phần trăm được ${(Math.round((t2+.01)*100)/100).toFixed(2).replace('.',',')}.`,why:`Chữ số hàng phần nghìn là ${Math.round(v*1000)%10}.`},
      {t:`Số ${dec6(v)} có ${String(Math.floor(v)).length} chữ số ở phần nguyên.`,f:`Số ${dec6(v)} có ${String(Math.floor(v)).length+1} chữ số ở phần nguyên.`,why:`Phần nguyên là ${Math.floor(v)}.`}],chk:()=>true})}
});
DS6b('ds6-29-calc',7,'TH',[29],r=>{
  const a=r.int(101,999)/100,b=r.int(11,99)/10,c=r.int(11,99)/10;
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${dec6(a)} + ${dec6(b)} = ${dec6(a+b)}.`,f:`${dec6(a)} + ${dec6(b)} = ${dec6(a+b+1)}.`,why:`Đặt thẳng hàng dấu phẩy rồi cộng.`},
    {t:`${dec6(a)} ${MINUS} ${dec6(a+c)} = ${dec6(-c)}.`,f:`${dec6(a)} ${MINUS} ${dec6(a+c)} = ${dec6(c)}.`,why:`Kết quả âm vì số trừ lớn hơn số bị trừ.`},
    {t:`${dec6(b)}·10 = ${dec6(b*10)}.`,f:`${dec6(b)}·10 = ${dec6(b/10)}.`,why:`Nhân với 10: dời dấu phẩy sang phải một chữ số.`},
    {t:`(${MINUS}${dec6(b)})·(${MINUS}2) = ${dec6(2*b)}.`,f:`(${MINUS}${dec6(b)})·(${MINUS}2) = ${dec6(-2*b)}.`,why:`Tích hai số âm là số dương.`}],chk:()=>true});
});
DS6b('ds6-31-pct',7,'TH',[31],r=>{
  const N=r.int(2,20)*50,p=r.pick([10,20,25,40]),a=r.pick([20,25,40,50]),k=r.int(1,a-1);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${p}% của ${N} bằng ${N*p/100}.`,f:`${p}% của ${N} bằng ${N*p/10}.`,why:`${N}·${p}% = ${N*p/100}.`},
    {t:`Tỉ số phần trăm của ${k} và ${a} là ${fmt(k*100/a)}%.`,f:`Tỉ số phần trăm của ${k} và ${a} là ${fmt(a*100/k)}%.`,why:`${fr(k,a)}·100%.`},
    {t:`${fr(1,4)} = 25%.`,f:`${fr(1,4)} = 40%.`,why:`${fr(1,4)} = ${fr(25,100)}.`},
    {t:`0,5 = 50%.`,f:`0,5 = 5%.`,why:`0,5 = ${fr(50,100)}.`}],chk:()=>true});
});
DS6b('ds6-31-sale',7,'VD',[31],r=>{
  const P=r.int(10,50)*10000,p=r.pick([10,15,20,25,30]),q=r.pick([5,10]),v1=P*(100-p)/100,v2=v1*(100-q)/100;
  return mkDS(r,{stem:`Một chiếc áo có giá niêm yết ${nv(P)} đồng. Cửa hàng giảm giá ${p}%; khách có thẻ thành viên được giảm thêm ${q}% trên giá đã giảm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số tiền được giảm lần thứ nhất là ${nv(P*p/100)} đồng.`,f:`Số tiền được giảm lần thứ nhất là ${nv(P*(100-p)/100)} đồng.`,why:`${nv(P)}·${p}% = ${nv(P*p/100)}.`},
    {t:`Giá sau khi giảm ${p}% là ${nv(v1)} đồng.`,f:`Giá sau khi giảm ${p}% là ${nv(P*p/100)} đồng.`,why:`${nv(P)}·${100-p}% = ${nv(v1)}.`},
    {t:`Khách có thẻ thành viên phải trả ${nv(v2)} đồng.`,f:`Khách có thẻ thành viên phải trả ${nv(P*(100-p-q)/100)} đồng.`,why:`${nv(v1)}·${100-q}% = ${nv(v2)}.`},
    {t:`Tổng mức giảm đối với khách có thẻ ít hơn ${p+q}%.`,f:`Tổng mức giảm đối với khách có thẻ đúng bằng ${p+q}%.`,why:`Giảm thêm ${q}% tính trên giá đã giảm nên tổng giảm là ${fmt(100-(100-p)*(100-q)/100)}%.`}],chk:()=>isInt(v2)&&P*(100-p-q)/100!==v2&&P*p/100!==v1});
});
DS6b('ds6-31-map',7,'VD',[31],r=>{
  const s=r.pick([100000,200000,500000,1000000]),cm=r.int(2,20),km=cm*s/100000,b1=r.int(2,9),g1=r.pick([2,3,4,5,6,7,8,9].filter(v=>v!==b1));
  return mkDS(r,{stem:`Trên bản đồ tỉ lệ 1 : ${nv(s)}, khoảng cách giữa hai thành phố ${I('A')} và ${I('B')} là ${cm} cm. Một lớp có ${b1*5} học sinh nam và ${g1*5} học sinh nữ. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`1 cm trên bản đồ ứng với ${fmt(s/100000)} km trên thực tế.`,f:`1 cm trên bản đồ ứng với ${fmt(s/1000)} km trên thực tế.`,why:`${nv(s)} cm = ${fmt(s/100000)} km.`},
    {t:`Khoảng cách thực tế giữa ${I('A')} và ${I('B')} là ${fmt(km)} km.`,f:`Khoảng cách thực tế giữa ${I('A')} và ${I('B')} là ${fmt(km*10)} km.`,why:`${cm}·${fmt(s/100000)} = ${fmt(km)}.`},
    {t:`Tỉ số giữa số học sinh nam và số học sinh nữ là ${qh(Q(b1,g1))}.`,f:`Tỉ số giữa số học sinh nam và số học sinh nữ là ${qh(Q(g1,b1))}.`,why:`${fr(b1*5,g1*5)} = ${qh(Q(b1,g1))}.`},
    {t:`Số học sinh nam chiếm ${fmt(Math.round(b1*1000/(b1+g1))/10)}% số học sinh cả lớp (làm tròn đến hàng phần mười).`,f:`Số học sinh nam chiếm ${fmt(Math.round(g1*1000/(b1+g1))/10)}% số học sinh cả lớp (làm tròn đến hàng phần mười).`,why:`${fr(b1*5,(b1+g1)*5)}·100%.`}],chk:()=>b1!==g1});
});
/* ---------- Trả lời ngắn chương VII ---------- */
TLN6b('t6-29-calc',7,'TH',[29],r=>{
  const a=r.nz(-999,999)/100,b=r.nz(-99,99)/10,c=r.int(2,9),v=Math.round((a+b*c)*1000)/1000;
  return{kind:'tln',stem:`Tính ${dec6(a)} + ${b<0?'('+dec6(b)+')':dec6(b)}·${c}.`,ans:v,unit:'',sol:`= ${dec6(a)} + ${b*c<0?'('+dec6(b*c)+')':dec6(b*c)} = ${dec6(v)}.`,chk:()=>true};
});
TLN6b('t6-31-pct',7,'TH',[31],r=>{
  const N=r.int(2,30)*40,p=r.pick([5,15,25,35,45,65,85]),v=N*p/100;
  return{kind:'tln',stem:`Một trường có ${N} học sinh, trong đó ${p}% học sinh tham gia câu lạc bộ thể thao. Hỏi có bao nhiêu học sinh tham gia câu lạc bộ?`,ans:v,unit:'',sol:`${N}·${p}% = ${v}.`,chk:()=>isInt(v)};
});
TLN6b('t6-30-est',7,'TH',[30],r=>{
  const v=r.int(10000,999999)/1000,k=r.pick([1,2]),rv=Math.round(v*10**k)/10**k;
  return{kind:'tln',stem:`Làm tròn số ${dec6(v)} đến hàng ${k===1?'phần mười':'phần trăm'}.`,ans:rv,unit:'',sol:`${dec6(v)} ≈ ${fmt(rv)}.`,chk:()=>true};
});
TLN6b('t6-31-sale',7,'VD',[31],r=>{
  const P=r.int(10,80)*10000,p=r.pick([10,15,20,25,30,35,40]),t=r.chance(.5);
  if(t){const v=P*(100-p)/100;return{kind:'tln',stem:`Một chiếc xe đạp có giá ${nv(P)} đồng, được giảm giá ${p}%. Giá sau khi giảm là bao nhiêu nghìn đồng?`,ans:v/1000,unit:'nghìn đồng',sol:`${nv(P)}·(100% − ${p}%) = ${nv(v)} đồng = ${fmt(v/1000)} nghìn đồng.`,chk:()=>isInt(v)}}
  const S=r.pick([10,20,50])*1000000,i=r.pick([5,6,7,8]),v=S*i/100;return{kind:'tln',stem:`Bác An gửi tiết kiệm ${nv(S)} đồng với lãi suất ${i}% một năm. Sau một năm bác nhận được bao nhiêu triệu đồng tiền lãi?`,ans:v/1000000,unit:'triệu đồng',sol:`${nv(S)}·${i}% = ${nv(v)} đồng = ${fmt(v/1000000)} triệu đồng.`,chk:()=>true};
});
TLN6b('t6-31-map',7,'VD',[31],r=>{
  const s=r.pick([200000,250000,500000,1000000,2000000]),km=r.int(5,200),cm=km*100000/s;if(!isInt(cm*10))return T.tln['t6-31-map'].gen(r);
  return{kind:'tln',stem:`Quãng đường thực tế giữa hai thành phố dài ${km} km. Trên bản đồ tỉ lệ 1 : ${nv(s)}, quãng đường đó dài bao nhiêu xentimét?`,ans:cm,unit:'cm',sol:`${km} km = ${nv(km*100000)} cm; ${nv(km*100000)} : ${nv(s)} = ${fmt(cm)} (cm).`,chk:()=>true};
});
/* ---------- Tự luận thực tế chương VII ---------- */
TL6b('tl6-31-sale',7,'TH','real',[31],r=>{
  const P=r.int(15,60)*10000,p=r.pick([10,15,20,25,30]),n=r.int(2,4);
  return{kind:'tl',title:'Tỉ số phần trăm trong mua bán',parts:[{pts:.5,html:`Một đôi giày có giá niêm yết ${nv(P)} đồng, cửa hàng giảm giá ${p}%. Tính số tiền được giảm và giá bán đôi giày sau khi giảm.`},{pts:.5,html:`Bạn Hoa mua ${n} đôi giày như vậy và đưa người bán ${nv(Math.ceil(P*(100-p)/100*n/100000)*100000)} đồng. Tính số tiền Hoa được trả lại.`}],
    sol:[ptxt([[`Số tiền được giảm: ${nv(P)}·${p}% = ${nv(P*p/100)} (đồng).`,.25],[`Giá sau khi giảm: ${nv(P)} − ${nv(P*p/100)} = ${nv(P*(100-p)/100)} (đồng).`,.25]]),ptxt([[`Tiền mua ${n} đôi: ${n}·${nv(P*(100-p)/100)} = ${nv(P*(100-p)/100*n)} (đồng).`,.25],[`Tiền trả lại: ${nv(Math.ceil(P*(100-p)/100*n/100000)*100000)} − ${nv(P*(100-p)/100*n)} = ${nv(Math.ceil(P*(100-p)/100*n/100000)*100000-P*(100-p)/100*n)} (đồng).`,.25]])],chk:()=>isInt(P*p/100)};
});
TL6b('tl6-31-bank',7,'VD','real',[31],r=>{
  const S=r.pick([10,20,30,50])*1000000,i=r.pick([5,6,7,8]),a=S*i/100,S2=S+a,b=S2*i/100;
  return{kind:'tl',title:'Bài toán lãi suất',parts:[{pts:.5,html:`Bác Lan gửi tiết kiệm ${nv(S)} đồng với lãi suất ${i}% một năm. Tính số tiền lãi và tổng số tiền bác có sau một năm.`},{pts:.5,html:`Sau một năm, bác không rút tiền ra mà gửi tiếp cả gốc lẫn lãi với lãi suất như cũ. Tính tổng số tiền bác có sau hai năm.`}],
    sol:[ptxt([[`Tiền lãi năm thứ nhất: ${nv(S)}·${i}% = ${nv(a)} (đồng).`,.25],[`Sau một năm: ${nv(S)} + ${nv(a)} = ${nv(S2)} (đồng).`,.25]]),ptxt([[`Tiền lãi năm thứ hai: ${nv(S2)}·${i}% = ${nv(b)} (đồng).`,.25],[`Sau hai năm: ${nv(S2)} + ${nv(b)} = ${nv(S2+b)} (đồng).`,.25]])],chk:()=>isInt(b)};
});
TL6b('tl6-29-calc',7,'TH','alg',[29,30],r=>{
  const a=r.int(101,999)/100,b=r.int(11,99)/10,c=r.int(2,9),k=r.int(11,99)/10,m=r.int(11,49)/10;
  return{kind:'tl',title:'Tính toán với số thập phân',parts:[{pts:.5,html:`Tính: ${dec6(a)} + ${dec6(b)}·${c} ${MINUS} ${dec6(a)}.`},{pts:.5,html:`Tính hợp lí: ${dec6(k)}·${dec6(m)} + ${dec6(k)}·${dec6(10-m)}. Làm tròn kết quả của phép tính ${dec6(a)} : ${c} đến hàng phần trăm.`}],
    sol:[ptxt([[`= (${dec6(a)} − ${dec6(a)}) + ${dec6(b)}·${c}`,.25],[`= ${dec6(b*c)}.`,.25]]),ptxt([[`${dec6(k)}·(${dec6(m)} + ${dec6(10-m)}) = ${dec6(k)}·10 = ${dec6(k*10)}.`,.25],[`${dec6(a)} : ${c} ≈ ${fmt(Math.round(a/c*100)/100)}.`,.25]])],chk:()=>true};
});
TL6b('tl6-31-mix',7,'VD','num',[28,31],r=>{
  for(;;){const [a,b]=r.pick([[1,4],[3,4],[2,5],[3,8],[7,20],[9,25]]),d=r.int(11,99)/100,p=r.pick([20,25,40,60,75]);if(!isInt(p*a/(100*b)*10000))continue;
  return{kind:'tl',title:'Phân số, số thập phân và phần trăm',parts:[{pts:.5,html:`Viết ${fr(a,b)} dưới dạng số thập phân và dưới dạng phần trăm. So sánh ${fr(a,b)} với ${dec6(d)}.`},{pts:.5,html:`Tính ${p}% của ${fr(a,b)} rồi viết kết quả dưới dạng số thập phân.`}],
    sol:[ptxt([[`${fr(a,b)} = ${dec6(a/b)} = ${fmt(a/b*100)}%.`,.25],[`${dec6(a/b)} ${a/b>d?'>':a/b<d?'<':'='} ${dec6(d)} nên ${fr(a,b)} ${a/b>d?'>':a/b<d?'<':'='} ${dec6(d)}.`,.25]]),ptxt([[`${p}%·${fr(a,b)} = ${fr(p,100)}·${fr(a,b)} = ${qh(Q(p*a,100*b))}`,.25],[`= ${String(Math.round(p*a/(100*b)*10000)/10000).replace('.',',')}.`,.25]])],chk:()=>true}}
});
TL6b('tl6-31-vdc',7,'VDC','num',[31],r=>{
  const p=r.pick([10,20,25]),q=r.pick([10,20,25]);
  return{kind:'tl',title:'Tỉ số phần trăm (nâng cao)',parts:[{pts:.5,html:`Giá một món hàng tăng ${p}%, sau đó lại giảm ${q}%. So với giá ban đầu, giá mới tăng hay giảm bao nhiêu phần trăm?`},{pts:.5,html:`Một hình chữ nhật có chiều dài tăng ${p}% và chiều rộng giảm ${q}%. Diện tích hình chữ nhật tăng hay giảm bao nhiêu phần trăm?`}],
    sol:[ptxt([[`Gọi giá ban đầu là 100%. Sau khi tăng: ${100+p}%; sau khi giảm: ${100+p}%·${100-q}% = ${fmt((100+p)*(100-q)/100)}%.`,.25],[`Giá mới ${(100+p)*(100-q)/100>100?'tăng':(100+p)*(100-q)/100<100?'giảm':'không đổi so với giá ban đầu'}${(100+p)*(100-q)/100===100?'':` ${fmt(Math.abs((100+p)*(100-q)/100-100))}% so với giá ban đầu`}.`,.25]]),
      ptxt([[`Diện tích mới = ${fmt((100+p)/100)}·dài·${fmt((100-q)/100)}·rộng = ${fmt((100+p)*(100-q)/10000)}·diện tích cũ.`,.25],[`Diện tích ${(100+p)*(100-q)/100>100?'tăng':(100+p)*(100-q)/100<100?'giảm':'không đổi'}${(100+p)*(100-q)/100===100?'':` ${fmt(Math.abs((100+p)*(100-q)/100-100))}%`}.`,.25]])],chk:()=>true};
});
/* ---------- bổ sung câu nhiều lựa chọn chương VI – VII ---------- */
N6b('k6-23-def',6,'NB',[23],r=>{
  const b=r.int(2,12),a=r.pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9].filter(v=>Math.abs(v)!==b)),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Phân số ${frN(a,b)} có mẫu số là`,correct:b,f:sg,cands:[a,-b,Math.abs(a)+b,b*2].filter(x=>x!==b),ok:()=>true,sol:`Trong phân số ${fr('a','b')}, b là mẫu số; ở đây mẫu số là ${b}.`,chk:()=>Math.abs(a)!==b});
  return mkTxt(r,{stem:'Cách viết nào sau đây là một phân số?',correct:frN(a,b),wrongs:[fr(a<0?MINUS+(-a):a,0),fr('2,5',b),fr(b,'0,5'),fr(Math.abs(a),'1,2')],sol:`Phân số có dạng ${fr('a','b')} với a, b là số nguyên, b ≠ 0.`,chk:()=>true});
});
N6b('k6-24-same',6,'NB',[24],r=>{
  const b=r.int(5,15),a=r.int(1,b-1),c=r.pick([...Array(b-1)].map((_,i)=>i+1).filter(v=>v!==a)),t=r.chance(.5);
  if(t)return mkTxt(r,{stem:`So sánh hai phân số ${fr(a,b)} và ${fr(c,b)}.`,correct:`${fr(a,b)} ${a>c?'>':'<'} ${fr(c,b)}`,wrongs:[`${fr(a,b)} ${a>c?'<':'>'} ${fr(c,b)}`,`${fr(a,b)} = ${fr(c,b)}`,'Không so sánh được.'],sol:`Hai phân số cùng mẫu dương, phân số nào có tử lớn hơn thì lớn hơn.`,chk:()=>true});
  return mkTxt(r,{stem:`So sánh hai phân số ${frN(-a,b)} và ${frN(-c,b)}.`,correct:`${frN(-a,b)} ${-a>-c?'>':'<'} ${frN(-c,b)}`,wrongs:[`${frN(-a,b)} ${-a>-c?'<':'>'} ${frN(-c,b)}`,`${frN(-a,b)} = ${frN(-c,b)}`,'Không so sánh được.'],sol:`Cùng mẫu dương: so sánh tử −${a} và −${c}.`,chk:()=>true});
});
N6b('k6-25-mix',6,'TH',[24,25],r=>{
  const n=r.int(1,4),m=r.int(1,4),[a,b]=fq6(r,{ds:[2,3,4,5]}),[c,d]=fq6(r,{ds:[2,3,4,5,6]}),v=qAdd(Q(n*b+a,b),Q(m*d+c,d));
  return mkF(r,{stem:`Kết quả của phép tính ${mix6(n,a,b)} + ${mix6(m,c,d)} là`,correct:v,cands:[Q(n+m+a+c,b+d),qAdd(Q(n+m,1),Q(a+c,b*d)),qSub(Q(n*b+a,b),Q(m*d+c,d)),Q(v[0]+v[1],v[1])],sol:`= ${fr(n*b+a,b)} + ${fr(m*d+c,d)} = ${qhx(v)}.`,chk:()=>true});
});
N6b('k6-26-x',6,'TH',[26],r=>{
  const k=fq6(r),q=fq6(r),x=qDiv(q,k);
  return mkF(r,{stem:`Giá trị của ${I('x')} thoả mãn ${fr(...k)}·${I('x')} = ${fr(...q)} là`,correct:x,cands:[qMul(q,k),qSub(q,k),Q(-x[0],x[1]),Q(x[1],x[0])],sol:`x = ${fr(...q)} : ${fr(...k)} = ${fr(...q)}·${fr(k[1],k[0])} = ${qhx(x)}.`,chk:()=>true});
});
N6b('k6-28-opp',7,'NB',[28],r=>{
  const a=r.int(11,999)/100,t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Số đối của ${dec6(-a)} là`,correct:a,f:dec6,cands:[-a,a*10,a/10,0],ok:()=>true,sol:`Số đối của −${dec6(a)} là ${dec6(a)}.`,chk:()=>true});
  const [p,q]=r.pick([[1,4],[3,4],[1,5],[2,5],[1,8],[3,8],[1,20],[3,25]]);
  return mkF(r,{stem:`Số thập phân ${dec6(p/q)} được viết dưới dạng phân số tối giản là`,correct:Q(p,q),cands:[Q(q,p),Q(Math.round(p/q*100),10),Q(p,q*10),Q(p+1,q)],sol:`${dec6(p/q)} = ${fr(Math.round(p/q*1000),1000)} = ${qh(Q(p,q))}.`,chk:()=>true});
});
N6b('k6-29-div',7,'TH',[29],r=>{
  const b=r.pick([2,4,5,8,0.5,0.25,1.5,2.5]),q=r.int(2,40)*(r.chance(.3)?-1:1)/(r.chance(.5)?10:1),a=Math.round(b*q*1000)/1000;
  return mkNum(r,{stem:`Kết quả của phép tính ${dec6(a)} : ${dec6(b)} là`,correct:q,f:dec6,cands:uq6([q*10,q/10,-q,a*b],dec6,q),ok:()=>true,sol:`${dec6(a)} : ${dec6(b)} = ${dec6(q)}.`,chk:()=>Math.abs(a/b-q)<1e-9});
});
N6b('k6-30-est',7,'TH',[30],r=>{
  const a=r.int(19,99)+r.pick([.1,.2,.8,.9]),b=r.int(2,9)+r.pick([.1,.9]),A=Math.round(a/10)*10,B=Math.round(b),v=A*B;
  return mkNum(r,{stem:`Làm tròn ${dec6(a)} đến hàng chục và ${dec6(b)} đến hàng đơn vị rồi ước lượng tích ${dec6(a)}·${dec6(b)}. Kết quả ước lượng là`,correct:v,cands:[A*(B+1),(A+10)*B,Math.round(a)*B,A+B].filter(x=>x!==v),ok:x=>x>0,sol:`${dec6(a)} ≈ ${A}, ${dec6(b)} ≈ ${B}; tích ≈ ${A}·${B} = ${v}.`,chk:()=>true});
});
N6b('k6-31-find',7,'TH',[31],r=>{
  const p=r.pick([10,20,25,40,50,75]),N=r.int(2,30)*20,v=N*p/100;
  return mkNum(r,{stem:`Biết ${p}% của một số là ${v}. Số đó là`,correct:N,cands:[v*p/100,v*p,N/2,N+v].filter(x=>x>0&&x!==N&&isInt(x*10)),ok:x=>x>0,sol:`Số đó là ${v} : ${p}% = ${v}·${fr(100,p)} = ${N}.`,chk:()=>isInt(v)});
});
