/* ================= CHƯƠNG VII: PHƯƠNG TRÌNH BẬC NHẤT VÀ HÀM SỐ BẬC NHẤT ================= */
const Fx=q=>`${X8} = ${qh(q)}`;
const EQ=(a,b,c,d)=>`${xlin(a,b)} = ${xlin(c,d)}`;
const kx=k=>`${cfl(k)}${X8}`;
/* Lời giải ax + b = cx + d */
/* kx = rhs ⟺ x = q (bỏ bước thừa khi hệ số bằng 1) */
const stp=(k,rhs,q)=>k===1?Fx(q):`${kx(k)} = ${sg(rhs)} ⟺ ${Fx(q)}`;
const solveEqH=(a,b,c,d)=>`${EQ(a,b,c,d)} ⟺ ${stp(a-c,d-b,Q(d-b,a-c))}`;
const yLine=(a,b)=>`${I('y')} = ${xlin(a,b)}`;
const ptS=(x,y)=>`(${sg(x)}; ${sg(y)})`;
/* số hạng có dấu: sT(-3,'x') → '− 3x'; sT(2) → '+ 2'; hệ số 1 trước biến được lược bỏ */
const sT=(c,v='')=>`${c<0?MINUS:'+'} ${Math.abs(c)===1&&v?'':Math.abs(c)}${v}`;
const pr=n=>n<0?`(${sg(n)})`:String(n);
const dLetter=n=>`(${I('d')}${sub(n)})`;
const dN=n=>`${I('d')}${sub(n)}`;
const fF=I('f');

/* Kịch bản bài toán lập phương trình (dùng chung cho NLC, TLN, TL, ĐS) */
const WPK=['age','meet','roundtrip','plan','rect','shop','pipes','ratio'];
function WP(r,kind){
  kind=kind||r.pick(WPK);
  if(typeof WP_NEW!=='undefined'&&WP_NEW[kind])return WP_NEW[kind](r);
  const x=I('x');
  if(kind==='age'){
    let k,b,t,a;
    for(let i=0;i<200;i++){k=r.pick([2,3,4]);b=r.int(6,15);t=r.int(2,10);a=k*(b+t)-t;if(a>=28&&a<=56&&a>b+14)break}
    return{kind,stem:`Năm nay bố ${a} tuổi, con ${b} tuổi. Hỏi sau bao nhiêu năm nữa thì tuổi bố gấp ${k} lần tuổi con?`,
      unk:`Gọi ${x} (năm) là số năm cần tìm (${x} nguyên dương).`,eq:`${a} + ${x} = ${k}(${b} + ${x})`,
      wrongs:[`${a} + ${x} = ${k*b} + ${x}`,`${a} ${MINUS} ${x} = ${k}(${b} ${MINUS} ${x})`,`${k}(${a} + ${x}) = ${b} + ${x}`,`${a} ${MINUS} ${x} = ${k}(${b} + ${x})`],
      ans:t,unit:'năm',q:'số năm cần tìm',concl:`Sau ${t} năm nữa thì tuổi bố gấp ${k} lần tuổi con.`,
      chk:()=>a+t===k*(b+t)&&t>0&&a-k*b===(k-1)*t,
      solH:`${a} + ${x} = ${k*b} + ${k}${x} ⟺ ${a-k*b} = ${k-1===1?'':k-1}${x} ⟺ ${x} = ${t}`};
  }
  if(kind==='meet'){
    const v1=r.pick([30,35,40,45,50,55]),v2=r.pick([30,35,40,45,50,60].filter(v=>v!==v1)),t=r.int(1,4),d=(v1+v2)*t;
    return{kind,stem:`Hai xe ô tô xuất phát cùng lúc từ hai địa điểm A và B cách nhau ${d} km, đi ngược chiều để gặp nhau. Vận tốc xe thứ nhất là ${v1} km/h, vận tốc xe thứ hai là ${v2} km/h. Hỏi sau bao lâu hai xe gặp nhau?`,
      unk:`Gọi ${x} (giờ) là thời gian từ lúc xuất phát đến lúc hai xe gặp nhau (${x} > 0).`,eq:`${v1}${x} + ${v2}${x} = ${d}`,
      wrongs:[`${v1}${x} ${MINUS} ${v2}${x} = ${d}`,`${v1} + ${v2} = ${d}${x}`,`${fr(x,v1+v2)} = ${d}`,`${v1}${x} + ${v2} = ${d}`],
      ans:t,unit:'giờ',q:'thời gian hai xe gặp nhau',concl:`Sau ${t} giờ hai xe gặp nhau.`,
      chk:()=>(v1+v2)*t===d,solH:`${v1+v2}${x} = ${d} ⟺ ${x} = ${t}`};
  }
  if(kind==='roundtrip'){
    const P=r.pick([[30,20],[40,30],[60,40],[45,30],[50,40],[60,45]]),[v1,v2]=P,g=(a,b)=>b?g(b,a%b):a,L=v1*v2/g(v1,v2),j=r.int(1,2),s=L*j,T=s/v1+s/v2;
    return{kind,stem:`Một người đi xe máy từ A đến B với vận tốc ${v1} km/h, rồi quay về A với vận tốc ${v2} km/h. Tổng thời gian đi và về (không kể thời gian nghỉ) là ${T} giờ. Tính độ dài quãng đường AB.`,
      unk:`Gọi ${x} (km) là độ dài quãng đường AB (${x} > 0).`,eq:`${fr(x,v1)} + ${fr(x,v2)} = ${T}`,
      wrongs:[`${fr(x,v1)} ${MINUS} ${fr(x,v2)} = ${T}`,`${v1}${x} + ${v2}${x} = ${T}`,`${fr(x,v1+v2)} = ${T}`,`${fr(x,v1)} + ${fr(x,v2)} = ${T*2}`],
      ans:s,unit:'km',q:'độ dài quãng đường AB',concl:`Quãng đường AB dài ${s} km.`,
      chk:()=>s/v1+s/v2===T,solH:`${fr(x,v1)} + ${fr(x,v2)} = ${T} ⟺ ${v2}${x} + ${v1}${x} = ${T*v1*v2} ⟺ ${v1+v2}${x} = ${T*v1*v2} ⟺ ${x} = ${s}`};
  }
  if(kind==='plan'){
    let p,q,t,d;
    for(let i=0;i<300;i++){p=r.pick([20,30,40,50,60,80]);q=r.pick([5,10]);t=r.int(2,5);if(((p+q)*t)%q===0){d=(p+q)*t/q;if(d>=8&&d<=60)break}}
    return{kind,stem:`Một xưởng may được giao may một lô hàng với năng suất dự định ${p} bộ quần áo mỗi ngày. Khi thực hiện, mỗi ngày xưởng may thêm ${q} bộ nên đã hoàn thành sớm hơn dự định ${t} ngày. Hỏi theo dự định, xưởng phải may lô hàng đó trong bao nhiêu ngày?`,
      unk:`Gọi ${x} (ngày) là thời gian dự định may xong lô hàng (${x} > ${t}).`,eq:`${p}${x} = ${p+q}(${x} ${MINUS} ${t})`,
      wrongs:[`${p}${x} = ${p+q}(${x} + ${t})`,`${p+q}${x} = ${p}(${x} ${MINUS} ${t})`,`${p}(${x} ${MINUS} ${t}) = ${p+q}${x}`,`${p}${x} = ${p+q}${x} ${MINUS} ${t}`],
      ans:d,unit:'ngày',q:'thời gian dự định',concl:`Theo dự định, xưởng phải may lô hàng trong ${d} ngày.`,
      chk:()=>p*d===(p+q)*(d-t),solH:`${p}${x} = ${p+q}${x} ${MINUS} ${(p+q)*t} ⟺ ${q}${x} = ${(p+q)*t} ⟺ ${x} = ${d}`};
  }
  if(kind==='rect'){
    const w=r.int(5,18),dd=r.int(2,9),P=2*(2*w+dd);
    return{kind,stem:`Một mảnh vườn hình chữ nhật có chiều dài lớn hơn chiều rộng ${dd} m và chu vi bằng ${P} m. Tính chiều rộng của mảnh vườn.`,
      unk:`Gọi ${x} (m) là chiều rộng của mảnh vườn (${x} > 0).`,eq:`2(${x} + ${x} + ${dd}) = ${P}`,
      wrongs:[`${x} + ${x} + ${dd} = ${P}`,`${x}(${x} + ${dd}) = ${P}`,`2(${x} + ${dd}) = ${P}`,`2(${x} + ${x} ${MINUS} ${dd}) = ${P}`],
      ans:w,unit:'m',q:'chiều rộng',concl:`Chiều rộng mảnh vườn là ${w} m (chiều dài ${w+dd} m).`,
      chk:()=>2*(2*w+dd)===P,solH:`2(2${x} + ${dd}) = ${P} ⟺ 4${x} + ${2*dd} = ${P} ⟺ 4${x} = ${P-2*dd} ⟺ ${x} = ${w}`};
  }
  if(kind==='shop'){
    const u=r.pick([6,8,9,12,15,18,25]),v=r.pick([10,12,15,20,24,30,45]),n=r.int(3,12),T=u*n+v;
    return{kind,stem:`Bạn Lan mua một số quyển vở loại ${u} nghìn đồng một quyển và một hộp bút giá ${v} nghìn đồng. Tổng số tiền bạn Lan phải trả là ${T} nghìn đồng. Hỏi bạn Lan đã mua bao nhiêu quyển vở?`,
      unk:`Gọi ${x} là số quyển vở bạn Lan đã mua (${x} nguyên dương).`,eq:`${u}${x} + ${v} = ${T}`,
      wrongs:[`${u}${x} ${MINUS} ${v} = ${T}`,`${u + v}${x} = ${T}`,`${u}${x} = ${T} + ${v}`,`${u}(${x} + ${v}) = ${T}`],
      ans:n,unit:'quyển',q:'số quyển vở',concl:`Bạn Lan đã mua ${n} quyển vở.`,
      chk:()=>u*n+v===T,solH:`${u}${x} = ${T} ${MINUS} ${v} ⟺ ${u}${x} = ${T-v} ⟺ ${x} = ${n}`};
  }
  if(kind==='pipes'){
    const P=r.pick([[12,6,4],[10,15,6],[20,30,12],[12,24,8],[30,60,20],[6,3,2],[15,10,6],[40,60,24]]),[a,b,t]=P;
    return{kind,stem:`Một bể nước có hai vòi chảy vào. Nếu chảy một mình thì vòi thứ nhất đầy bể sau ${a} giờ, vòi thứ hai đầy bể sau ${b} giờ. Hỏi nếu mở cả hai vòi cùng lúc thì sau bao lâu bể đầy (bể ban đầu không có nước)?`,
      unk:`Gọi ${x} (giờ) là thời gian hai vòi cùng chảy đầy bể (${x} > 0).`,eq:`${fr(x,a)} + ${fr(x,b)} = 1`,
      wrongs:[`${fr(x,a)} ${MINUS} ${fr(x,b)} = 1`,`${fr(x,a+b)} = 1`,`${a}${x} + ${b}${x} = 1`,`${fr(x,a)} + ${fr(x,b)} = ${x}`],
      ans:t,unit:'giờ',q:'thời gian hai vòi cùng chảy đầy bể',concl:`Nếu mở cả hai vòi thì sau ${t} giờ bể đầy.`,
      chk:()=>Math.abs(t/a+t/b-1)<1e-9,solH:`${fr(x,a)} + ${fr(x,b)} = 1 ⟺ ${b}${x} + ${a}${x} = ${a*b} ⟺ ${a+b}${x} = ${a*b} ⟺ ${x} = ${t}`};
  }
  /* ratio: hai số */
  const k=r.pick([2,3,4,5]),n=r.int(6,40),S=n*(k+1);
  return{kind:'ratio',stem:`Tổng của hai số bằng ${S}. Biết số thứ nhất gấp ${k} lần số thứ hai. Tìm số thứ hai.`,
    unk:`Gọi ${x} là số thứ hai (số thứ nhất là ${k}${x}).`,eq:`${x} + ${k}${x} = ${S}`,
    wrongs:[`${x} + ${fr(x,k)} = ${S}`,`${k}${x} = ${S}`,`${k}${x} ${MINUS} ${x} = ${S}`,`${x} + (${x} + ${k}) = ${S}`],
    ans:n,unit:'',q:'số thứ hai',concl:`Số thứ hai là ${n} (số thứ nhất là ${k*n}).`,
    chk:()=>n+k*n===S,solH:`${k+1}${x} = ${S} ⟺ ${x} = ${n}`};
}
/* Bản sửa cho 'age' (chuỗi solve đã dựng nhầm): dựng lại bằng solH */
const wpSolve=w=>w.solH;

/* ----------- Trắc nghiệm 4 lựa chọn ----------- */
N8('m8-7-isl',7,'NB',r=>{
  const a=r.int(2,6),b=r.nz(-7,7),c=r.nz(-6,6),want=r.chance(.5);
  const good=[`${xlin(a,b)} = 0`,`${xlin(-a,b)} = 0`,`${xlin(1,c)} = 0`];
  const bad=[`0${X8} ${sT(b)} = 0`,`${X8}${sup(2)} ${sT(c)} = 0`,`${fr(1,X8)} ${sT(c)} = 0`,`${a}${X8} ${sT(Math.abs(b),Y8)} = 0`];
  const ok=r.pick(want?good:bad);
  return mkTxt(r,{stem:`Phương trình nào sau đây ${want?'là':'<b>không</b> là'} phương trình bậc nhất một ẩn?`,correct:ok,wrongs:r.shuffle(want?bad:good),
    sol:`Phương trình bậc nhất một ẩn ${I('x')} có dạng ${I('a')}${I('x')} + ${I('b')} = 0 với ${I('a')} ≠ 0. ${ok} ${want?'có dạng đó':'không có dạng đó'} (${want?'hệ số của x khác 0':'hệ số của x bằng 0, hoặc có ẩn ở mẫu, ẩn có số mũ 2 hoặc có hai ẩn'}).`,chk:()=>true});
});
N8('m8-7-root',7,'NB',r=>{
  const t=r.nz(-6,6),a=r.int(2,5),b=-a*t,sgn=r.pick([1,-1]);
  const E=(aa,bb)=>`${xlin(aa,bb)} = 0`,ok=E(sgn*a,sgn*b);
  return mkTxt(r,{stem:`Phương trình nào sau đây nhận ${I('x')} = ${sg(t)} làm nghiệm?`,correct:ok,wrongs:[E(sgn*a,sgn*(-b)),E(sgn*a,sgn*b+1),E(sgn*a,sgn*b-a),E(sgn*(a+1),sgn*b),E(a,b*2*sgn)],
    sol:`Thay ${I('x')} = ${sg(t)} vào phương trình ${ok}: ${sg(sgn*a)}·${pr(t)} ${sgn*b<0?MINUS:'+'} ${Math.abs(sgn*b)} = 0 nên ${I('x')} = ${sg(t)} là nghiệm; các phương trình còn lại không thỏa mãn.`,
    chk:()=>sgn*a*t+sgn*b===0});
});
N8('m8-7-solve1',7,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-9,9);if(Math.abs(a)===1)return T.nlc['m8-7-solve1'].gen(r);
  const q=Q(-b,a);
  return mkTxt(r,{stem:`Nghiệm của phương trình ${xlin(a,b)} = 0 là`,correct:Fx(q),wrongs:[Fx(Q(b,a)),Fx(Q(-a,b)),Fx(Q(a,b)),Fx(Q(-b+1,a)),Fx(Q(-b,a+1)),Fx(Q(-b-1,a)),Fx(Q(-b+a,a))],
    sol:`${xlin(a,b)} = 0 ⟺ ${kx(a)} = ${sg(-b)} ⟺ ${Fx(q)}.`,chk:()=>a*qv(q)+b===0&&q[0]!==0});
});
N8('m8-7-solve2',7,'TH',r=>{
  const t=r.nz(-7,7),a=r.nz(-6,6),c=r.nz(-6,6);if(a===c)return T.nlc['m8-7-solve2'].gen(r);
  const b=r.nz(-9,9),d=(a-c)*t+b;
  const wrongs=[Fx(Q(b-d,a-c)),Fx(Q(d+b,a-c)),Fx(Q(d-b,a+c)),Fx(Q(d-b,c-a)),Fx(Q(d-b+1,a-c))];
  return mkTxt(r,{stem:`Nghiệm của phương trình ${EQ(a,b,c,d)} là`,correct:Fx(Q(t)),wrongs,
    sol:`${solveEqH(a,b,c,d)}.`,chk:()=>a*t+b===c*t+d&&t!==0});
});
N8('m8-7-solve3',7,'TH',r=>{
  const t=r.nz(-6,6),a=r.pick([2,3,4,-2,-3]),b=r.nz(-5,5),c=r.nz(-4,4);if(a===c)return T.nlc['m8-7-solve3'].gen(r);
  const d=a*(t+b)-c*t;
  const lhs=`${sg(a)}(${xlin(1,b)})`,rhs=xlin(c,d);
  return mkTxt(r,{stem:`Nghiệm của phương trình ${lhs} = ${rhs} là`,correct:Fx(Q(t)),wrongs:[Fx(Q(t+1)),Fx(Q(-t)),Fx(Q(d-a*b,a+c)),Fx(Q(d+a*b,a-c)),Fx(Q(t-2))],
    sol:`${lhs} = ${rhs} ⟺ ${kx(a)} ${a*b<0?MINUS:'+'} ${Math.abs(a*b)} = ${rhs} ⟺ ${stp(a-c,d-a*b,Q(t))}.`,chk:()=>a*(t+b)===c*t+d&&t!==0});
});
N8('m8-7-solve4',7,'TH',r=>{
  const p=r.pick([2,3,4,5]),q=r.pick([2,3,4,5,6].filter(v=>v!==p)),u=r.nz(-5,5),v=r.nz(-5,5);
  /* (x+u)/p = (x+v)/q  ⟹ q(x+u)=p(x+v) ⟹ (q−p)x = pv − qu */
  const num=p*v-q*u,den=q-p,ans=Q(num,den);if(ans[0]===0)return T.nlc['m8-7-solve4'].gen(r);
  return mkTxt(r,{stem:`Nghiệm của phương trình ${fr(xlin(1,u),p)} = ${fr(xlin(1,v),q)} là`,correct:Fx(ans),wrongs:[Fx(Q(-num,den)),Fx(Q(p*u-q*v,den)),Fx(Q(num,-den)),Fx(Q(num+1,den)),Fx(Q(p*v+q*u,den))],
    sol:`Nhân hai vế với ${p*q} để khử mẫu: ${q}(${xlin(1,u)}) = ${p}(${xlin(1,v)}) ⟺ ${stp(q-p,num,ans)}.`,
    chk:()=>{const x=qv(ans);return closeN((x+u)/p,(x+v)/q)}});
});
N8('m8-7-nsol',7,'TH',r=>{
  const a=r.nz(-5,5),b=r.nz(-6,6),mode=r.int(0,2);let eq,ok,why;
  if(mode===0){const c=b+r.pick([-3,-2,-1,1,2,3]);eq=`${xlin(a,b)} = ${xlin(a,c)}`;ok='Vô nghiệm';why=`Hai vế có cùng hệ số của ${X8} nhưng hằng số khác nhau; chuyển vế được 0 = ${sg(c-b)}, vô lí. Phương trình vô nghiệm.`}
  else if(mode===1){const k=r.nz(-4,4);eq=`${sg(a)}(${xlin(1,k)}) = ${xlin(a,a*k)}`;ok='Vô số nghiệm';why=`${sg(a)}(${xlin(1,k)}) = ${xlin(a,a*k)} nên hai vế bằng nhau với mọi giá trị của ${X8}. Phương trình có vô số nghiệm.`}
  else{const c=a+r.pick([-3,-2,-1,1,2,3]);eq=`${xlin(a,b)} = ${xlin(c,b+r.pick([-2,0,2]))}`;ok='Có đúng một nghiệm';why=`Hệ số của ${X8} ở hai vế khác nhau nên chuyển vế được ${I('a')}${X8} = ${I('b')} với ${I('a')} ≠ 0, có đúng một nghiệm.`}
  return mkTxt(r,{stem:`Phương trình ${eq} có bao nhiêu nghiệm?`,correct:ok,wrongs:['Vô nghiệm','Vô số nghiệm','Có đúng một nghiệm','Có đúng hai nghiệm'].filter(z=>z!==ok),
    sol:why,chk:()=>true});
});
N8('m8-7-param',7,'TH',r=>{
  const m=r.nz(-5,5),p=r.nz(-4,4),q=r.nz(-6,6),t=r.nz(-4,4),rr=(m+p)*t-q-t;if(rr===0)return T.nlc['m8-7-param'].gen(r);
  /* (m + p)x − q = x + rr nhận x = t làm nghiệm */
  const E=`(${I('m')} ${sT(p)})${X8} ${sT(-q)} = ${X8} ${sT(rr)}`;
  return mkTxt(r,{stem:`Tìm giá trị của ${I('m')} để phương trình ${E} nhận ${X8} = ${sg(t)} làm nghiệm.`,correct:`${I('m')} = ${sg(m)}`,wrongs:[`${I('m')} = ${sg(-m)}`,`${I('m')} = ${sg(m+1)}`,`${I('m')} = ${sg(m-1)}`,`${I('m')} = ${sg(m+p)}`,`${I('m')} = ${sg(m-p)}`],
    sol:`Thay ${X8} = ${sg(t)} vào phương trình: (${I('m')} ${sT(p)})·${pr(t)} ${sT(-q)} = ${sg(t)} ${sT(rr)}, suy ra (${I('m')} ${sT(p)})·${pr(t)} = ${sg((m+p)*t)}, do đó ${I('m')} ${sT(p)} = ${sg(m+p)} và ${I('m')} = ${sg(m)}.`,chk:()=>(m+p)*t-q===t+rr});
});
N8('m8-7-wp',7,'TH',r=>{
  const w=WP(r);
  return mkTxt(r,{stem:`${w.stem} Nếu gọi ${I('x')} là ${w.q}, phương trình nào sau đây biểu thị đúng bài toán?`,correct:w.eq,wrongs:w.wrongs,
    sol:`${w.unk} Từ đề bài ta lập được phương trình ${w.eq}.`,chk:w.chk});
});
N8('m8-7-wpans',7,'TH',r=>{
  const w=WP(r);
  return mkNum(r,{stem:w.stem.replace(/\?$/,'?').replace(/\.$/,'.'),correct:w.ans,cands:[w.ans+1,w.ans-1,w.ans*2,w.ans+2,Math.round(w.ans/2)],f:z=>`${z}${w.unit?' '+w.unit:''}`,
    sol:`${w.unk} Phương trình: ${w.eq}. Giải: ${wpSolve(w)}. ${w.concl}`,chk:w.chk});
});
N8('m8-7-fnrule',7,'NB',r=>{
  const n=r.int(3,4),xs=r.shuffle([-3,-2,-1,0,1,2,3,4]).slice(0,n),ys=xs.map(()=>r.int(-6,9));
  const pairs=(X,Y)=>X.map((x,i)=>`(${sg(x)}; ${sg(Y[i])})`).join(', ');
  const good=pairs(xs,ys),bad1=pairs([xs[0],...xs],[ys[0],ys[0]+r.pick([1,2,3]),...ys.slice(1)]),
        mk=()=>{const X2=r.shuffle([-3,-2,-1,0,1,2,3,4]).slice(0,n),Y2=X2.map(()=>r.int(-6,9));const k=r.int(0,n-2);X2.splice(k+1,0,X2[k]);Y2.splice(k+1,0,Y2[k]+r.pick([1,2,3,-1,-2]));return pairs(X2,Y2)};
  return mkTxt(r,{stem:`Trong các bảng giá trị (cặp ${I('x')}; ${I('y')}) sau, bảng nào cho biết ${I('y')} là hàm số của ${I('x')}?`,correct:`{${good}}`,wrongs:[`{${mk()}}`,`{${mk()}}`,`{${bad1}}`],
    sol:`${I('y')} là hàm số của ${I('x')} khi mỗi giá trị của ${I('x')} có đúng một giá trị tương ứng của ${I('y')}. Chỉ bảng {${good}} thỏa mãn; các bảng còn lại có cùng một giá trị ${I('x')} ứng với hai giá trị ${I('y')} khác nhau.`,chk:()=>new Set(xs).size===xs.length});
});
N8('m8-7-fnval',7,'NB',r=>{
  const a=r.nz(-5,5),b=r.nz(-7,7),t=r.nz(-4,4),v=a*t+b;
  return mkNum(r,{stem:`Cho hàm số ${I('y')} = ${fF}(${X8}) = ${xlin(a,b)}. Giá trị ${fF}(${sg(t)}) bằng`,correct:v,ok:()=>true,cands:[a*t-b,-a*t+b,a+t+b,a*b+t,v+a],
    sol:`${fF}(${sg(t)}) = ${sg(a)}·${pr(t)} ${b<0?MINUS:'+'} ${Math.abs(b)} = ${sg(v)}.`,chk:()=>a*t+b===v});
});
N8('m8-7-isfn',7,'NB',r=>{
  const a=r.nz(-5,5),b=r.nz(-6,6),c=r.int(2,5),want=r.chance(.5);
  const good=[yLine(a,b),yLine(a,0),`${I('y')} = ${sg(b)} ${a<0?MINUS:'+'} ${Math.abs(a)===1?'':Math.abs(a)}${X8}`],
        bad=[`${I('y')} = ${sg(b)}`,`${I('y')} = ${X8}${sup(2)} ${b<0?MINUS:'+'} ${Math.abs(b)}`,`${I('y')} = ${fr(c,X8)} ${b<0?MINUS:'+'} ${Math.abs(b)}`,`${I('y')} = 0${X8} ${b<0?MINUS:'+'} ${Math.abs(b)}`];
  const ok=r.pick(want?good:bad);
  return mkTxt(r,{stem:`Hàm số nào sau đây ${want?'là':'<b>không</b> là'} hàm số bậc nhất?`,correct:ok,wrongs:r.shuffle(want?bad:good),
    sol:`Hàm số bậc nhất có dạng ${I('y')} = ${I('a')}${X8} + ${I('b')} với ${I('a')} ≠ 0. ${ok} ${want?'có dạng đó':'không có dạng đó (hệ số của x bằng 0, hoặc x có số mũ khác 1 hoặc ở mẫu)'}.`,chk:()=>true});
});
N8('m8-7-coefs',7,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-8,8);if(Math.abs(a)===1)return T.nlc['m8-7-coefs'].gen(r);
  const form=r.int(0,1),f=form===0?`${I('y')} = ${xlin(a,b)}`:`${I('y')} = ${sg(b)} ${a<0?MINUS:'+'} ${Math.abs(a)}${X8}`,ab=(p,q)=>`${I('a')} = ${sg(p)}; ${I('b')} = ${sg(q)}`;
  return mkTxt(r,{stem:`Hàm số ${f} có các hệ số ${I('a')}, ${I('b')} (theo dạng ${I('y')} = ${I('a')}${X8} + ${I('b')}) là`,correct:ab(a,b),wrongs:[ab(b,a),ab(-a,b),ab(a,-b),ab(-a,-b)],
    sol:`Viết ${f} về dạng ${I('y')} = ${I('a')}${X8} + ${I('b')} ta được ${I('a')} = ${sg(a)}, ${I('b')} = ${sg(b)}.`,chk:()=>true});
});
N8('m8-7-incdec',7,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-6,6);if(a===b)return T.nlc['m8-7-incdec'].gen(r);
  const inc=a>0,ok=inc?'Hàm số đồng biến trên ℝ':'Hàm số nghịch biến trên ℝ',op=inc?'Hàm số nghịch biến trên ℝ':'Hàm số đồng biến trên ℝ';
  return mkTxt(r,{stem:`Cho hàm số ${yLine(a,b)}. Khẳng định nào sau đây đúng?`,correct:ok,wrongs:[op,`Hàm số có hệ số góc bằng ${sg(b)}`,`Đồ thị hàm số đi qua gốc tọa độ`,`Hàm số luôn nhận giá trị dương`],
    sol:`Hệ số ${I('a')} = ${sg(a)} ${inc?'&gt; 0':'&lt; 0'} nên hàm số ${inc?'đồng biến':'nghịch biến'} trên ℝ. Hệ số góc là ${I('a')} = ${sg(a)} (không phải ${sg(b)}); đồ thị cắt trục tung tại (0; ${sg(b)}) nên không đi qua gốc tọa độ.`,chk:()=>b!==0});
});
/* Theo SGK Toán 8 (Bài 29): a > 0 thì góc tạo bởi đường thẳng y = ax + b và trục Ox là góc nhọn, a < 0 là góc tù */
N8('m8-7-angle',7,'NB',r=>{
  if(r.chance(.5)){
    const a=r.nz(-6,6),b=r.nz(-6,6),acute=a>0;
    return mkTxt(r,{stem:`Góc tạo bởi đường thẳng ${yLine(a,b)} và trục ${I('Ox')} là`,correct:acute?'góc nhọn':'góc tù',wrongs:[acute?'góc tù':'góc nhọn','góc vuông','góc bẹt'],
      sol:`Hệ số góc ${I('a')} = ${sg(a)} ${acute?'&gt; 0':'&lt; 0'} nên góc tạo bởi đường thẳng và trục ${I('Ox')} là góc ${acute?'nhọn':'tù'}.`,chk:()=>true});
  }
  const want=r.chance(.5)?'nhọn':'tù',sg1=want==='nhọn'?1:-1,a0=sg1*r.int(1,6),b0=r.nz(-6,6);
  const others=[1,2,3].map(()=>[-sg1*r.int(1,6),r.nz(-6,6)]);
  const ok=yLine(a0,b0),wr=others.map(([a,b])=>yLine(a,b));
  return mkTxt(r,{stem:`Đường thẳng nào sau đây tạo với trục ${I('Ox')} một góc ${want}?`,correct:ok,wrongs:wr.concat([`${I('y')} = ${sg(b0)}`]),
    sol:`Đường thẳng ${I('y')} = ${I('a')}${X8} + ${I('b')} tạo với trục ${I('Ox')} góc ${want} khi ${I('a')} ${want==='nhọn'?'&gt; 0':'&lt; 0'}. Chỉ ${ok} có hệ số góc ${sg(a0)} thỏa mãn.`,chk:()=>others.every(([a])=>a*sg1<0)});
});
N8('m8-7-acute',7,'TH',r=>{
  const p=r.nz(-5,5),c=r.nz(-5,5),acute=r.chance(.5),mm=I('m');
  const sym=acute?'&gt;':'&lt;',ok=`${mm} ${sym} ${sg(p)}`,wr=[`${mm} ${acute?'&lt;':'&gt;'} ${sg(p)}`,`${mm} ${sym} ${sg(-p)}`,`${mm} ${acute?'&lt;':'&gt;'} ${sg(-p)}`,`${mm} = ${sg(p)}`];
  return mkTxt(r,{stem:`Đường thẳng ${I('y')} = (${mm} ${sT(-p)})${X8} ${sT(c)} (với ${mm} ≠ ${sg(p)}) tạo với trục ${I('Ox')} một góc ${acute?'nhọn':'tù'} khi`,correct:ok,wrongs:wr,
    sol:`Góc tạo bởi đường thẳng và trục ${I('Ox')} là góc ${acute?'nhọn':'tù'} khi hệ số góc ${acute?'dương':'âm'}: ${mm} ${sT(-p)} ${sym} 0 ⟺ ${ok}.`,chk:()=>p!==0});
});
N8('m8-7-cross',7,'NB',r=>{
  const mode=r.int(0,2),a1=r.nz(-4,4),b1=r.nz(-5,5);let a2,b2,ok,why;const y2=(a,b)=>mode===1?`${I('y')} = ${sg(b)} ${sT(a,X8)}`:yLine(a,b);
  if(mode===0){a2=a1;b2=b1+r.pick([-3,-2,-1,1,2,3]);ok='Song song với nhau';why=`Hai đường thẳng có cùng hệ số góc ${sg(a1)} và tung độ gốc khác nhau (${sg(b1)} ≠ ${sg(b2)}).`}
  else if(mode===1){a2=a1;b2=b1;ok='Trùng nhau';why=`Hai đường thẳng có cùng hệ số góc và cùng tung độ gốc.`}
  else{do{a2=r.nz(-4,4)}while(a2===a1||a1*a2===-1);b2=r.nz(-5,5);ok='Cắt nhau tại một điểm';why=`Hai đường thẳng có hệ số góc khác nhau (${sg(a1)} ≠ ${sg(a2)}).`}
  if(mode===2&&b1===0&&b2===0)return T.nlc['m8-7-cross'].gen(r);
  return mkTxt(r,{stem:`Cho hai đường thẳng ${dLetter(1)}: ${yLine(a1,b1)} và ${dLetter(2)}: ${y2(a2,b2)}. Vị trí tương đối của hai đường thẳng này là`,correct:ok,wrongs:['Song song với nhau','Trùng nhau','Cắt nhau tại một điểm','Cắt nhau tại gốc tọa độ'].filter(z=>z!==ok),
    sol:`${why} Vậy hai đường thẳng ${ok.toLowerCase()}.`,chk:()=>true});
});
N8('m8-7-slope',7,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-8,8),f=r.int(0,1);
  const line=f===0?`${I('y')} = ${xlin(a,b)}`:`${I('y')} = ${sg(b)} ${a<0?MINUS:'+'} ${Math.abs(a)===1?'':Math.abs(a)}${X8}`;
  return mkNum(r,{stem:`Hệ số góc của đường thẳng ${line} là`,correct:a,ok:()=>true,cands:[b,-a,-b,a+b,a*b],
    sol:`Đường thẳng ${I('y')} = ${I('a')}${X8} + ${I('b')} có hệ số góc là ${I('a')}. Ở đây ${I('a')} = ${sg(a)}.`,chk:()=>true});
});
N8('m8-7-point',7,'TH',r=>{
  const a=r.nz(-4,4),b=r.nz(-6,6),x0=r.nz(-4,4),y0=a*x0+b;
  const ok=ptS(x0,y0),wr=[[x0,y0+1],[x0,-y0],[-x0,y0],[y0,x0],[x0,y0-a],[x0+1,y0],[0,y0]].filter(([u,v])=>a*u+b!==v).map(([u,v])=>ptS(u,v));
  return mkTxt(r,{stem:`Điểm nào sau đây thuộc đồ thị hàm số ${yLine(a,b)}?`,correct:ok,wrongs:wr,
    sol:`Thay ${I('x')} = ${sg(x0)} vào hàm số: ${I('y')} = ${sg(a)}·${pr(x0)} ${b<0?MINUS:'+'} ${Math.abs(b)} = ${sg(y0)}. Vậy điểm ${ok} thuộc đồ thị.`,chk:()=>a*x0+b===y0&&wr.every(w=>w!==ok)});
});
N8('m8-7-par',7,'TH',r=>{
  const p=r.nz(-4,4),m=r.nz(-5,5),k=m+p,q=r.nz(-5,5),rr=q+r.pick([-3,-2,-1,1,2,3]);
  return mkTxt(r,{stem:`Tìm ${I('m')} để đường thẳng ${I('y')} = (${I('m')} ${p<0?MINUS:'+'} ${Math.abs(p)})${X8} ${q<0?MINUS:'+'} ${Math.abs(q)} song song với đường thẳng ${yLine(k,rr)}.`,correct:`${I('m')} = ${sg(m)}`,wrongs:[`${I('m')} = ${sg(k+p)}`,`${I('m')} = ${sg(-m)}`,`${I('m')} = ${sg(k)}`,`${I('m')} = ${sg(m+1)}`,`${I('m')} = ${sg(m-1)}`,`${I('m')} = ${sg(m+2)}`],
    sol:`Hai đường thẳng song song khi có cùng hệ số góc và tung độ gốc khác nhau: ${I('m')} ${p<0?MINUS:'+'} ${Math.abs(p)} = ${sg(k)} ⟹ ${I('m')} = ${sg(m)}; khi đó tung độ gốc ${sg(q)} ≠ ${sg(rr)} nên thỏa mãn.`,chk:()=>q!==rr});
});
N8('m8-7-axis',7,'TH',r=>{
  const a=r.nz(-4,4),t=r.nz(-5,5),b=-a*t,ox=r.chance(.5);
  const ok=ox?ptS(t,0):ptS(0,b),wr=ox?[ptS(-t,0),ptS(0,t),ptS(0,b),ptS(b,0),ptS(-b,0),ptS(0,-t)]:[ptS(b,0),ptS(0,t),ptS(0,-b),ptS(t,0),ptS(-b,0),ptS(0,t+1)];
  return mkTxt(r,{stem:`Đồ thị hàm số ${yLine(a,b)} cắt trục ${ox?'hoành':'tung'} tại điểm`,correct:ok,wrongs:wr,
    sol:ox?`Cho ${I('y')} = 0: ${xlin(a,b)} = 0 ⟹ ${I('x')} = ${sg(t)}. Giao điểm với trục hoành là ${ok}.`:`Cho ${I('x')} = 0: ${I('y')} = ${sg(b)}. Giao điểm với trục tung là ${ok}.`,chk:()=>a*t+b===0});
});
N8('m8-7-line2pts',7,'TH',r=>{
  const a=r.nz(-4,4),b=r.nz(-6,6),x1=r.nz(-3,3);let x2=r.nz(-3,3);if(x2===x1)x2=x1+1;if(x2===0)x2=4;
  const y1=a*x1+b,y2=a*x2+b,ok=yLine(a,b);
  return mkTxt(r,{stem:`Đường thẳng đi qua hai điểm ${I('A')}${ptS(x1,y1)} và ${I('B')}${ptS(x2,y2)} có phương trình là`,correct:ok,wrongs:[yLine(-a,b),yLine(a,-b),yLine(b,a),yLine(a,b+a)],
    sol:`Gọi đường thẳng cần tìm là ${I('y')} = ${I('a')}${X8} + ${I('b')}. Hệ số góc ${I('a')} = ${fr(`${sg(y2)} ${MINUS} ${y1<0?`(${sg(y1)})`:y1}`,`${sg(x2)} ${MINUS} ${x1<0?`(${sg(x1)})`:x1}`)} = ${sg(a)}. Thay tọa độ ${I('A')} vào: ${sg(y1)} = ${sg(a)}·${x1<0?`(${sg(x1)})`:x1} + ${I('b')} ⟹ ${I('b')} = ${sg(b)}. Vậy ${ok}.`,chk:()=>(y2-y1)===a*(x2-x1)});
});
N8('m8-7-cut',7,'TH',r=>{
  const a1=r.nz(-4,4),a2=r.nz(-4,4);if(a1===a2)return T.nlc['m8-7-cut'].gen(r);
  const x0=r.nz(-5,5),b1=r.nz(-6,6),b2=b1+(a1-a2)*x0;
  return mkNum(r,{stem:`Hoành độ giao điểm của hai đường thẳng ${yLine(a1,b1)} và ${yLine(a2,b2)} là`,correct:x0,ok:()=>true,cands:[-x0,x0+1,x0-1,b2-b1,2*x0],
    sol:`Hoành độ giao điểm là nghiệm của phương trình ${EQ(a1,b1,a2,b2)}. ${solveEqH(a1,b1,a2,b2)}. Vậy hoành độ giao điểm là ${sg(x0)}.`,chk:()=>a1*x0+b1===a2*x0+b2});
});
N8('m8-7-area',7,'TH',r=>{
  const a=r.pick([1,2,3,4,-1,-2,-3,-4]),u=r.pick([1,2,3]),b=r.pick([1,-1])*2*Math.abs(a)*u,S=Math.abs(b)*Math.abs(b/a)/2;
  return mkNum(r,{stem:`Đồ thị hàm số ${yLine(a,b)} cắt hai trục tọa độ ${I('Ox')}, ${I('Oy')} lần lượt tại ${I('A')} và ${I('B')}. Diện tích tam giác ${I('OAB')} (đơn vị diện tích) bằng`,correct:S,ok:c=>c>0&&Number.isInteger(c),cands:[S*2,S/2,Math.abs(b),Math.abs(b/a),S+1,S-1],
    sol:`Cho ${I('y')} = 0: ${I('x')} = ${sg(-b/a)} nên ${I('A')}${ptS(-b/a,0)}; cho ${I('x')} = 0: ${I('y')} = ${sg(b)} nên ${I('B')}${ptS(0,b)}. Tam giác ${I('OAB')} vuông tại ${I('O')} có ${I('OA')} = ${Math.abs(b/a)}, ${I('OB')} = ${Math.abs(b)} nên diện tích bằng ½·${Math.abs(b/a)}·${Math.abs(b)} = ${fmt(S)}.`,chk:()=>closeN(S,Math.abs(b)*Math.abs(b/a)/2)&&Number.isInteger(b/a)});
});
N8('m8-7-mono',7,'TH',r=>{
  const p=r.nz(-5,5),c=r.nz(-5,5),inc=r.chance(.5);
  const sym=inc?'&gt;':'&lt;',ok=`${I('m')} ${sym} ${sg(p)}`,wr=[`${I('m')} ${inc?'&lt;':'&gt;'} ${sg(p)}`,`${I('m')} ${sym} ${sg(-p)}`,`${I('m')} ${inc?'≥':'≤'} ${sg(p)}`,`${I('m')} ${inc?'&lt;':'&gt;'} ${sg(-p)}`];
  return mkTxt(r,{stem:`Hàm số ${I('y')} = (${I('m')} ${p<0?'+':MINUS} ${Math.abs(p)})${X8} ${c<0?MINUS:'+'} ${Math.abs(c)} ${inc?'đồng biến':'nghịch biến'} trên ℝ khi`,correct:ok,wrongs:wr,
    sol:`Hàm số ${inc?'đồng biến':'nghịch biến'} khi hệ số của ${I('x')} ${inc?'dương':'âm'}: ${I('m')} ${p<0?'+':MINUS} ${Math.abs(p)} ${sym} 0 ⟺ ${ok}.`,chk:()=>p!==0});
});
N8('m8-7-par2',7,'TH',r=>{
  const p=r.nz(-3,3),m=r.nz(-4,4),n=r.nz(-5,5),k=m+p,rr=n+r.pick([-2,-1,1,2]),xa=r.nz(-3,3),ya=k*xa+n;
  const ans=m+n;
  return mkNum(r,{stem:`Biết đường thẳng ${I('y')} = (${I('m')} ${p<0?MINUS:'+'} ${Math.abs(p)})${X8} + ${I('n')} song song với đường thẳng ${yLine(k,rr)} và đi qua điểm ${I('A')}${ptS(xa,ya)}. Giá trị của ${I('m')} + ${I('n')} bằng`,correct:ans,ok:()=>true,cands:[m,n,m-n,ans+1,ans-1,-ans],
    sol:`Song song: ${I('m')} ${p<0?MINUS:'+'} ${Math.abs(p)} = ${sg(k)} ⟹ ${I('m')} = ${sg(m)}. Đi qua ${I('A')}: ${sg(ya)} = ${sg(k)}·${xa<0?`(${sg(xa)})`:xa} + ${I('n')} ⟹ ${I('n')} = ${sg(n)}. Vậy ${I('m')} + ${I('n')} = ${sg(ans)}.`,chk:()=>k*xa+n===ya&&n!==rr});
});

/* ----------- Đúng/sai chương VII ----------- */
DS8('ds8-7-eq',7,'TH',r=>{
  const t=r.nz(-6,6),a=r.nz(-5,5),c=r.nz(-5,5);if(a===c)return T.ds['ds8-7-eq'].gen(r);
  const b=r.nz(-7,7),d=(a-c)*t+b;if(b===d)return T.ds['ds8-7-eq'].gen(r);
  const items=[
    {t:`${X8} = ${sg(t)} là nghiệm của phương trình.`,f:`${X8} = ${sg(t+1)} là nghiệm của phương trình.`,why:`${solveEqH(a,b,c,d)}; nghiệm là ${sg(t)}.`},
    {t:`Phương trình đã cho tương đương với phương trình ${kx(a-c)} = ${sg(d-b)}.`,f:`Phương trình đã cho tương đương với phương trình ${kx(a-c)} = ${sg(b-d)}.`,why:`Chuyển các số hạng chứa ${X8} sang một vế, số hạng tự do sang vế kia: ${kx(a-c)} = ${sg(d-b)}.`},
    {t:`Phương trình đã cho có đúng một nghiệm.`,f:`Phương trình đã cho vô nghiệm.`,why:`Sau khi chuyển vế, hệ số của ${X8} là ${sg(a-c)} ≠ 0 nên phương trình có đúng một nghiệm.`},
    {t:`Nếu thay ${xlin(a,0)} ở vế trái bằng ${xlin(c,0)} (giữ nguyên các số hạng khác) thì phương trình mới vô nghiệm.`,f:`Nếu thay ${xlin(a,0)} ở vế trái bằng ${xlin(c,0)} (giữ nguyên các số hạng khác) thì phương trình mới có vô số nghiệm.`,why:`Phương trình mới là ${EQ(c,b,c,d)}, rút gọn được ${sg(b)} = ${sg(d)}, vô lí vì ${sg(b)} ≠ ${sg(d)}.`}
  ];
  return mkDS(r,{stem:`Cho phương trình ${EQ(a,b,c,d)}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>a*t+b===c*t+d&&(d-b)===(a-c)*t});
});
DS8('ds8-7-fn',7,'TH',r=>{
  const a=r.nz(-5,5),b=r.nz(-6,6);if(a===b)return T.ds['ds8-7-fn'].gen(r);
  const x1=r.nz(-3,3),y1=a*x1+b,inc=a>0;
  const items=[
    {t:`Hệ số góc của đường thẳng ${yLine(a,b)} là ${sg(a)}.`,f:`Hệ số góc của đường thẳng ${yLine(a,b)} là ${sg(b)}.`,why:`Hệ số góc là hệ số ${I('a')} của ${I('x')}, tức ${sg(a)}.`},
    {t:`Đồ thị hàm số tạo với trục ${I('Ox')} một góc ${inc?'nhọn':'tù'}.`,f:`Đồ thị hàm số tạo với trục ${I('Ox')} một góc ${inc?'tù':'nhọn'}.`,why:`Hệ số góc ${I('a')} = ${sg(a)} ${inc?'&gt; 0':'&lt; 0'} nên góc tạo bởi đường thẳng và trục ${I('Ox')} là góc ${inc?'nhọn':'tù'}.`},
    {t:`Đồ thị hàm số cắt trục tung tại điểm ${ptS(0,b)}.`,f:`Đồ thị hàm số cắt trục tung tại điểm ${ptS(b,0)}.`,why:`Cho ${I('x')} = 0 được ${I('y')} = ${sg(b)}.`},
    {t:`Điểm ${I('M')}${ptS(x1,y1)} thuộc đồ thị hàm số.`,f:`Điểm ${I('M')}${ptS(x1,y1+1)} thuộc đồ thị hàm số.`,why:`Thay ${I('x')} = ${sg(x1)}: ${I('y')} = ${sg(a)}·${x1<0?`(${sg(x1)})`:x1} ${b<0?MINUS:'+'} ${Math.abs(b)} = ${sg(y1)}.`}
  ];
  return mkDS(r,{stem:`Cho hàm số ${I('y')} = ${fF}(${X8}) = ${xlin(a,b)}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>b!==0&&a*x1+b===y1});
});
DS8('ds8-7-lines',7,'VD',r=>{
  const p=r.nz(-3,3),m1=r.nz(-3,3),a1=r.nz(-4,4),x0=r.nz(-4,4),k1=m1+p;if(a1===k1)return T.ds['ds8-7-lines'].gen(r);
  const b1=r.nz(-5,5),q=b1+(a1-k1)*x0;if(q===b1||q===0)return T.ds['ds8-7-lines'].gen(r);
  /* d1: y = a1 x + b1;  d2: y = (m + p) x + q */
  const par=a1-p,items=[
    {t:`Hai đường thẳng ${dN(1)} và ${dN(2)} song song với nhau khi ${I('m')} = ${sg(par)}.`,f:`Hai đường thẳng ${dN(1)} và ${dN(2)} song song với nhau khi ${I('m')} = ${sg(a1+p)}.`,why:`Song song khi ${I('m')} ${p<0?MINUS:'+'} ${Math.abs(p)} = ${sg(a1)}, tức ${I('m')} = ${sg(par)} (và ${sg(q)} ≠ ${sg(b1)}).`},
    {t:`Khi ${I('m')} = ${sg(m1)}, hoành độ giao điểm của ${dN(1)} và ${dN(2)} bằng ${sg(x0)}.`,f:`Khi ${I('m')} = ${sg(m1)}, hoành độ giao điểm của ${dN(1)} và ${dN(2)} bằng ${sg(-x0)}.`,why:`Với ${I('m')} = ${sg(m1)}: ${dN(2)}: ${yLine(k1,q)}. Giải ${EQ(a1,b1,k1,q)} ta được ${I('x')} = ${sg(x0)}.`},
    {t:`${dN(2)} luôn cắt trục tung tại điểm ${ptS(0,q)}.`,f:`${dN(2)} luôn cắt trục tung tại điểm ${ptS(0,b1)}.`,why:`Cho ${I('x')} = 0 được ${I('y')} = ${sg(q)} với mọi ${I('m')}.`},
    {t:`Với ${I('m')} = ${sg(par)}, hai đường thẳng ${dN(1)} và ${dN(2)} không có điểm chung.`,f:`Với ${I('m')} = ${sg(par)}, hai đường thẳng ${dN(1)} và ${dN(2)} cắt nhau tại một điểm.`,why:`Khi ${I('m')} = ${sg(par)} hai đường thẳng có cùng hệ số góc nhưng tung độ gốc khác nhau (${sg(b1)} ≠ ${sg(q)}) nên song song.`}
  ];
  return mkDS(r,{stem:`Cho hai đường thẳng ${dN(1)}: ${yLine(a1,b1)} và ${dN(2)}: ${I('y')} = (${I('m')} ${p<0?MINUS:'+'} ${Math.abs(p)})${X8} ${q<0?MINUS:'+'} ${Math.abs(q)} (${I('m')} là tham số). Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>closeN(((a1-k1)*x0),q-b1)&&par+p===a1&&a1+p!==par});
});
DS8('ds8-7-word',7,'VD',r=>{
  const w=WP(r,r.pick(WPK.filter(k=>k!=='ratio')));const bad=w.wrongs[0],wrongAns=w.ans+(w.ans>3?-1:1)*r.pick([1,2]);
  const items=[
    {t:`${w.unk.replace(/\.$/,'')}.`,f:`Ẩn ${I('x')} có thể nhận giá trị âm.`,why:`${w.unk}`},
    {t:`Phương trình biểu thị bài toán là ${w.eq}.`,f:`Phương trình biểu thị bài toán là ${bad}.`,why:`Từ đề bài lập được phương trình ${w.eq}.`},
    {t:`${X8} = ${w.ans} là nghiệm của phương trình lập được.`,f:`${X8} = ${wrongAns} là nghiệm của phương trình lập được.`,why:`Giải: ${wpSolve(w)}.`},
    {t:`${w.concl}`,f:`${w.concl.replace(String(w.ans),String(wrongAns))}`,why:`Nghiệm ${X8} = ${w.ans} thỏa mãn điều kiện của ẩn nên ${w.concl.charAt(0).toLowerCase()+w.concl.slice(1)}`}
  ];
  if(items[3].t===items[3].f)return T.ds['ds8-7-word'].gen(r);
  return mkDS(r,{stem:`Xét bài toán: “${w.stem}” Xét tính đúng sai của các khẳng định sau:`,items,chk:w.chk});
});

/* ----------- Trả lời ngắn chương VII ----------- */
TLN8('t8-7-sol',7,'NB',r=>{
  const t=r.nz(-8,8),a=r.pick([2,3,4,5,-2,-3]),b=r.nz(-6,6),c=r.nz(-4,4);if(a===c)return T.tln['t8-7-sol'].gen(r);
  const d=a*(t+b)-c*t;
  return{kind:'tln',stem:`Giải phương trình ${sg(a)}(${xlin(1,b)}) = ${xlin(c,d)}. Nghiệm của phương trình là ${I('x')} = ?`,ans:t,unit:'',
    sol:`${sg(a)}(${xlin(1,b)}) = ${xlin(c,d)} ⟺ ${kx(a)} ${a*b<0?MINUS:'+'} ${Math.abs(a*b)} = ${xlin(c,d)} ⟺ ${stp(a-c,d-a*b,Q(t))}.`,chk:()=>a*(t+b)===c*t+d};
});
TLN8('t8-7-frac',7,'TH',r=>{
  const p=r.pick([2,3,4,6]),q=r.pick([3,4,5,6].filter(v=>v!==p)),t=r.nz(-6,6),u=r.nz(-4,4),v=r.nz(-4,4);
  /* (x+u)/p − (x+v)/q = s, đáp số x = t */
  const sp=(t+u)*q-(t+v)*p,s=Q(sp,p*q);
  return{kind:'tln',stem:`Giải phương trình ${fr(xlin(1,u),p)} ${MINUS} ${fr(xlin(1,v),q)} = ${qh(s)}. Nghiệm của phương trình là ${I('x')} = ?`,ans:t,unit:'',
    sol:`Nhân hai vế với ${p*q}: ${q}(${xlin(1,u)}) ${MINUS} ${p}(${xlin(1,v)}) = ${sg(sp)} ⟺ ${stp(q-p,sp-q*u+p*v,Q(t))}.`,
    chk:()=>closeN((t+u)/p-(t+v)/q,qv(s))&&q!==p&&(q-p)*t===sp-q*u+p*v};
});
TLN8('t8-7-wp',7,'VD',r=>{
  const w=WP(r);
  return{kind:'tln',stem:w.stem+(w.unit?` (Đáp số tính theo đơn vị ${w.unit}.)`:''),ans:w.ans,unit:'',
    sol:`${w.unk} Phương trình: ${w.eq}. Giải: ${wpSolve(w)}. ${w.concl}`,chk:w.chk};
});
TLN8('t8-7-param',7,'VD',r=>{
  const m=r.nz(-5,5),p=r.nz(-4,4),q=r.nz(-6,6),t=r.nz(-4,4),rr=(m+p)*t-q-t;if(rr===0)return T.tln['t8-7-param'].gen(r);
  return{kind:'tln',stem:`Biết phương trình (${I('m')} ${sT(p)})${X8} ${sT(-q)} = ${X8} ${sT(rr)} có nghiệm ${X8} = ${sg(t)}. Tìm giá trị của ${I('m')}.`,ans:m,unit:'',
    sol:`Thay ${X8} = ${sg(t)}: (${I('m')} ${sT(p)})·${pr(t)} ${sT(-q)} = ${sg(t)} ${sT(rr)}, suy ra (${I('m')} ${sT(p)})·${pr(t)} = ${sg((m+p)*t)}, do đó ${I('m')} ${sT(p)} = ${sg(m+p)} và ${I('m')} = ${sg(m)}.`,chk:()=>(m+p)*t-q===t+rr};
});
TLN8('t8-7-area',7,'VD',r=>{
  const a=r.pick([1,2,3,4,-1,-2,-3,-4]),u=r.pick([1,2,3]),b=r.pick([1,-1])*2*Math.abs(a)*u,S=2*Math.abs(a)*u*u;
  return{kind:'tln',stem:`Đường thẳng ${yLine(a,b)} cắt trục ${I('Ox')} tại ${I('A')}, cắt trục ${I('Oy')} tại ${I('B')}. Tính diện tích tam giác ${I('OAB')} (đơn vị diện tích).`,ans:S,unit:'',
    sol:`${I('A')}${ptS(-b/a,0)}, ${I('B')}${ptS(0,b)}. Tam giác ${I('OAB')} vuông tại ${I('O')} nên diện tích = ½·${Math.abs(b/a)}·${Math.abs(b)} = ${S}.`,chk:()=>Number.isInteger(b/a)&&Math.abs(b/a)*Math.abs(b)/2===S};
});
TLN8('t8-7-fixed',7,'VDC',r=>{
  const be=r.nz(-4,4),p=r.nz(-4,4),q=r.nz(-6,6),x0=-be,y0=p*x0+q;
  return{kind:'tln',stem:`Đường thẳng ${I('y')} = (${I('m')} ${sT(p)})${X8} ${sT(be,I('m'))} ${sT(q)} (${I('m')} là tham số) luôn đi qua một điểm cố định ${I('M')}(${X8}${sub(0)}; ${Y8}${sub(0)}). Tính ${X8}${sub(0)} + ${Y8}${sub(0)}.`,ans:x0+y0,unit:'',
    sol:`Viết lại: ${I('y')} = ${I('m')}(${X8} ${sT(be)}) ${sT(p,X8)} ${sT(q)}. Đường thẳng đi qua điểm cố định với mọi ${I('m')} khi ${X8} ${sT(be)} = 0, tức ${X8}${sub(0)} = ${sg(x0)}. Khi đó ${Y8}${sub(0)} = ${sg(p)}·${x0<0?`(${sg(x0)})`:x0} ${sT(q)} = ${sg(y0)}. Vậy ${X8}${sub(0)} + ${Y8}${sub(0)} = ${sg(x0+y0)}.`,chk:()=>[-3,0,2,5].every(mm=>(mm+p)*x0+be*mm+q===y0)};
});
TLN8('t8-7-vdc',7,'VDC',r=>{
  const p=r.nz(-3,3),b=r.pick([2,4,6,-2,-4,-6]),Bb=Math.abs(b);
  /* y = (m − p)x + b cắt Ox, Oy tạo tam giác diện tích S: S = b²/(2|m − p|) ⟹ |m − p| = b²/(2S) */
  const S=r.pick([1,2,3,4,6,8,9,12,18].filter(S=>(b*b)%(2*S)===0)),dd=b*b/(2*S),mp=`${I('m')} ${sT(-p)}`;
  return{kind:'tln',stem:`Cho đường thẳng ${I('(d)')}: ${I('y')} = (${mp})${X8} ${sT(b)} (${I('m')} là tham số, ${I('m')} ≠ ${sg(p)}). Biết ${I('(d)')} cắt hai trục tọa độ tạo thành một tam giác có diện tích bằng ${S}. Tìm giá trị lớn nhất của ${I('m')}.`,ans:p+dd,unit:'',
    sol:`${I('(d)')} cắt ${I('Oy')} tại ${ptS(0,b)}, cắt ${I('Ox')} tại điểm có hoành độ ${fr(sg(-b),mp)}. Diện tích tam giác bằng ½·${Bb}·${fr(Bb,`|${mp}|`)} = ${S}, suy ra |${mp}| = ${dd}. Do đó ${I('m')} = ${sg(p+dd)} hoặc ${I('m')} = ${sg(p-dd)}; giá trị lớn nhất của ${I('m')} là ${sg(p+dd)}.`,chk:()=>closeN(b*b/(2*dd),S)&&dd>0};
});

/* ----------- Tự luận chương VII ----------- */
TL8('tl8-7-eq',7,'TH','alg',r=>{
  const t=r.nz(-6,6),a=r.nz(-5,5),c=r.nz(-5,5);if(a===c)return T.tl['tl8-7-eq'].gen(r);
  const b=r.nz(-7,7),d=(a-c)*t+b;
  const p=r.pick([2,3,4]),q=r.pick([3,4,5,6].filter(v=>v!==p)),t2=r.nz(-5,5),u=r.nz(-3,3),v=r.nz(-3,3),s=Q((t2+u)*q+(t2+v)*p,p*q);
  const L=p*q;
  return{kind:'tl',title:'Giải phương trình bậc nhất',parts:[
    {pts:.5,html:`Giải phương trình ${EQ(a,b,c,d)}.`},
    {pts:.5,html:`Giải phương trình ${fr(xlin(1,u),p)} + ${fr(xlin(1,v),q)} = ${qh(s)}.`}],
    sol:[ptxt([[`${EQ(a,b,c,d)} ⟺ ${kx(a-c)} = ${sg(d-b)}.`,.25],[`${Fx(Q(t))}. Vậy nghiệm của phương trình là ${I('x')} = ${sg(t)}.`,.25]]),
      ptxt([[`Quy đồng, khử mẫu (nhân hai vế với ${L}): ${q}(${xlin(1,u)}) + ${p}(${xlin(1,v)}) = ${sg(s[0]*L/s[1])}.`,.25],[`⟺ ${stp(p+q,s[0]*L/s[1]-q*u-p*v,Q(t2))}.`,.25]])],
    chk:()=>a*t+b===c*t+d&&closeN((t2+u)/p+(t2+v)/q,qv(s))&&Number.isInteger(s[0]*L/s[1])&&(p+q)*t2===s[0]*L/s[1]-q*u-p*v};
});
function wpTL(r,kinds,title){
  const w=WP(r,r.pick(kinds));
  return{kind:'tl',title,parts:[
    {pts:.5,html:`${w.stem} Hãy chọn ẩn, đặt điều kiện cho ẩn và lập phương trình biểu thị bài toán.`},
    {pts:.5,html:`Giải phương trình vừa lập và trả lời bài toán.`}],
    sol:[ptxt([[w.unk,.25],[`Từ đề bài ta có phương trình: ${w.eq}.`,.25]]),
      ptxt([[`Giải: ${wpSolve(w)}.`,.25],[`${w.concl}`,.25]])],chk:w.chk};
}
TL8('tl8-7-wp1',7,'VD','real',r=>wpTL(r,['meet','roundtrip','plan','pipes','chase','mix'],'Giải bài toán bằng cách lập phương trình (chuyển động, công việc)'));
TL8('tl8-7-wp2',7,'VD','real',r=>wpTL(r,['age','rect','shop','ratio','discount','invest'],'Giải bài toán bằng cách lập phương trình'));
TL8('tl8-7-line',7,'VD','alg',r=>{
  const a=r.nz(-4,4),b=r.nz(-6,6),x1=r.nz(-3,3);let x2=r.nz(-3,3);if(x2===x1)x2=x1+1;if(x2===0)x2=4;
  const y1=a*x1+b,y2=a*x2+b,a2=a+r.pick([-2,-1,1,2]);if(a2===0)return T.tl['tl8-7-line'].gen(r);
  const b2=r.nz(-6,6),dx=Q(b2-b,a-a2);
  return{kind:'tl',title:'Hàm số bậc nhất và đồ thị',parts:[
    {pts:.5,html:`Xác định hệ số ${I('a')}, ${I('b')} của đường thẳng ${dN(1)}: ${I('y')} = ${I('a')}${X8} + ${I('b')}, biết ${dN(1)} đi qua hai điểm ${I('A')}${ptS(x1,y1)} và ${I('B')}${ptS(x2,y2)}.`},
    {pts:.5,html:`Cho đường thẳng ${dN(2)}: ${yLine(a2,b2)}. Chứng tỏ ${dN(1)} cắt ${dN(2)} và tìm hoành độ giao điểm của hai đường thẳng.`}],
    sol:[ptxt([[`${I('a')} = ${fr(`${sg(y2)} ${MINUS} ${y1<0?`(${sg(y1)})`:y1}`,`${sg(x2)} ${MINUS} ${x1<0?`(${sg(x1)})`:x1}`)} = ${sg(a)}.`,.25],[`Thay tọa độ ${I('A')}: ${sg(y1)} = ${sg(a)}·${x1<0?`(${sg(x1)})`:x1} + ${I('b')} ⟹ ${I('b')} = ${sg(b)}. Vậy ${dN(1)}: ${yLine(a,b)}.`,.25]]),
      ptxt([[`${dN(1)} và ${dN(2)} có hệ số góc ${sg(a)} ≠ ${sg(a2)} nên cắt nhau.`,.25],[`Hoành độ giao điểm là nghiệm của ${EQ(a,b,a2,b2)}: ${stp(a-a2,b2-b,dx)}.`,.25]])],
    chk:()=>(y2-y1)===a*(x2-x1)&&a!==a2};
});
TL8('tl8-7-vdc',7,'VDC','alg',r=>{
  const p=r.nz(-3,3),be=r.nz(-3,3),q=r.nz(-5,5),x0=-be,y0=p*x0+q;
  const b0=r.pick([2,4,6]),S=r.pick([1,2,3,4,6,8,9,12].filter(s=>(b0*b0)%(2*s)===0)),dd=b0*b0/(2*S),mp=`${I('m')} ${sT(-p)}`;
  return{kind:'tl',title:'Điểm cố định và diện tích tam giác',parts:[
    {pts:.5,html:`Cho đường thẳng ${I('(d)')}: ${I('y')} = (${I('m')} ${sT(p)})${X8} ${sT(be,I('m'))} ${sT(q)} (${I('m')} là tham số). Chứng minh ${I('(d)')} luôn đi qua một điểm cố định và tìm tọa độ điểm đó.`},
    {pts:.5,html:`Cho đường thẳng ${I('(d′)')}: ${I('y')} = (${mp})${X8} + ${b0} (${I('m')} ≠ ${sg(p)}). Tìm ${I('m')} để ${I('(d′)')} cùng hai trục tọa độ tạo thành tam giác có diện tích bằng ${S}.`}],
    sol:[ptxt([[`${I('y')} = ${I('m')}(${X8} ${sT(be)}) ${sT(p,X8)} ${sT(q)}. Điểm ${I('M')}(${X8}${sub(0)}; ${Y8}${sub(0)}) cố định khi tọa độ của nó nghiệm đúng phương trình với mọi ${I('m')}, tức ${X8}${sub(0)} ${sT(be)} = 0.`,.25],[`Suy ra ${X8}${sub(0)} = ${sg(x0)}, ${Y8}${sub(0)} = ${sg(y0)}. Vậy ${I('(d)')} luôn đi qua ${I('M')}${ptS(x0,y0)}.`,.25]]),
      ptxt([[`${I('(d′)')} cắt ${I('Oy')} tại ${I('B')}(0; ${b0}), cắt ${I('Ox')} tại ${I('A')} có hoành độ ${fr(sg(-b0),mp)}. Diện tích ${I('OAB')} = ½·${b0}·${fr(b0,`|${mp}|`)} = ${S}.`,.25],[`Suy ra |${mp}| = ${dd} ⟹ ${I('m')} = ${sg(p+dd)} hoặc ${I('m')} = ${sg(p-dd)}.`,.25]])],
    chk:()=>[-2,1,4].every(mm=>(mm+p)*x0+be*mm+q===y0)&&closeN(b0*b0/(2*dd),S)};
});
