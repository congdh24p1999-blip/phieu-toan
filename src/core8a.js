/* ======================= TOÁN 8, HỌC KÌ II (Kết nối tri thức, tập 2) =======================
   Chương VI: Phân thức đại số. Chương VII: Phương trình bậc nhất và hàm số bậc nhất.
   Chương VIII: Mở đầu về tính xác suất của biến cố. Chương IX: Tam giác đồng dạng.
   Chương X: Một số hình khối trong thực tiễn. */
const N8=(id,ch,lv,gen,sec)=>reg('nlc',id,ch,lv,gen,{hk:2,sec});
const DS8=(id,ch,lv,gen,sec)=>reg('ds',id,ch,lv,gen,{hk:2,sec});
const TLN8=(id,ch,lv,gen,sec)=>reg('tln',id,ch,lv,gen,{hk:2,sec});
const TL8=(id,ch,lv,role,gen,sec)=>reg('tl',id,ch,lv,gen,{role,hk:2,sec});
const X8=I('x'),Y8=I('y');
/* Đa thức theo x (hệ số giảm dần): nhân, cộng, hiển thị */
const pmul=(a,b)=>{const o=Array(a.length+b.length-1).fill(0);a.forEach((p,i)=>b.forEach((q,j)=>{o[i+j]+=p*q}));return o};
const padd=(a,b)=>{const n=Math.max(a.length,b.length),o=Array(n).fill(0);a.forEach((p,i)=>{o[n-a.length+i]+=p});b.forEach((p,i)=>{o[n-b.length+i]+=p});return o};
const pscale=(a,k)=>a.map(c=>c*k);
const PH=cs=>polyH(cs);
/* (x + a) và dạng có ngoặc */
const LFc=a=>[1,a],LFh=a=>a===0?X8:`(${xlin(1,a)})`;
const FR8=(n,d)=>fr(n,d);
/* Phân thức: giá trị tại x (để kiểm tra bằng số) */
const pv=(cs,x)=>pe(cs,x);
const closeN=(a,b)=>Math.abs(a-b)<1e-9*Math.max(1,Math.abs(a),Math.abs(b));
/* Đếm ước dương */
const nDiv=k=>{let c=0;for(let d=1;d<=k;d++)if(k%d===0)c++;return c};
/* Điều kiện x ≠ v */
/* hệ số đứng trước ngoặc: 1 → '', −1 → '−' */
const cfl=n=>n===1?'':n===-1?MINUS:sg(n);
const SETS=a=>a.map(sg).join('; ');
const NEQ=v=>`${X8} ≠ ${sg(v)}`;

/* ================= CHƯƠNG VI: PHÂN THỨC ĐẠI SỐ ================= */
N8('m8-6-def',6,'NB',r=>{
  const a=r.int(1,5),b=r.int(2,6),want=r.chance(.5);
  const good=[FR8(`${X8} + ${a}`,`${X8}${sup(2)} ${MINUS} ${b}`),FR8(`2${X8}`,`${X8} ${MINUS} ${a}`),FR8(`${a}`,`${X8}${sup(2)} + 1`),FR8(`${X8}${sup(2)} ${MINUS} ${a}`,`${X8} + ${b}`)];
  const bad=[FR8(rt(X8),`${X8} + ${a}`),FR8(`${X8} + ${a}`,rt(`${X8} ${MINUS} ${b}`)),FR8(`${X8} + ${a}`,'0'),FR8(`${a}`,rt(X8))];
  const ok=want?r.pick(good):r.pick(bad);
  return mkTxt(r,{stem:`Biểu thức nào sau đây ${want?'là':'<b>không</b> là'} phân thức đại số?`,correct:ok,wrongs:r.shuffle(want?bad:good),
    sol:`Phân thức đại số có dạng ${fr('A','B')} với A, B là các đa thức và B khác đa thức 0. Biểu thức chứa căn của biến hoặc có mẫu bằng 0 không phải là phân thức; ${ok} ${want?'thỏa mãn điều kiện đó':'không thỏa mãn điều kiện đó'}.`,
    chk:()=>true});
});
N8('m8-6-cond',6,'TH',r=>{
  const f=r.int(0,4),a=r.int(2,6),b=r.int(1,5),k=r.pick([2,3]),t=r.nz(-5,5),m=r.nz(-6,6);
  let den,ok,wr,roots,fn;
  if(f===0){den=xlin(1,m);ok=NEQ(-m);wr=[NEQ(m),NEQ(0),`${X8} ≠ ${sg(-m+1)}`,`${X8} ≠ ${sg(m*m)}`];roots=[-m];fn=x=>x+m}
  else if(f===1){den=xlin(k,-k*t);ok=NEQ(t);wr=[NEQ(-t),NEQ(k*t),NEQ(-k*t),NEQ(t+1)];roots=[t];fn=x=>k*x-k*t}
  else if(f===2){den=xquad(1,0,-a*a);ok=`${X8} ≠ ${a} và ${X8} ≠ ${MINUS}${a}`;wr=[NEQ(a),NEQ(-a),NEQ(a*a),`${X8} ≠ ${a} và ${X8} ≠ ${a*a}`];roots=[a,-a];fn=x=>x*x-a*a}
  else if(f===3){den=`${LFh(-a)}${LFh(b)}`;ok=`${X8} ≠ ${a} và ${X8} ≠ ${MINUS}${b}`;wr=[`${X8} ≠ ${MINUS}${a} và ${X8} ≠ ${b}`,NEQ(a),`${X8} ≠ ${a} và ${X8} ≠ ${b}`,`${X8} ≠ ${MINUS}${a} và ${X8} ≠ ${MINUS}${b}`];roots=[a,-b];fn=x=>(x-a)*(x+b)}
  else{den=`${X8}${LFh(-a)}`;ok=`${X8} ≠ 0 và ${X8} ≠ ${a}`;wr=[NEQ(a),NEQ(0),`${X8} ≠ 0 và ${X8} ≠ ${MINUS}${a}`,`${X8} ≠ ${MINUS}${a}`];roots=[0,a];fn=x=>x*(x-a)}
  if(f===3&&a===-b)return T.nlc['m8-6-cond'].gen(r);
  wr.push(`${X8} ≠ ${sg(-t+2)}`,`${X8} ≠ ${sg(m+3)}`,`${X8} ≠ ${sg(a+b)}`,`${X8} ≠ ${sg(-t*2)}`);
  const num=r.pick([`${X8} + 1`,'3','2'+X8]);
  return mkTxt(r,{stem:`Điều kiện xác định của phân thức ${FR8(num,den)} là`,correct:ok,wrongs:wr,
    sol:`Phân thức xác định khi mẫu thức khác 0: ${den} ≠ 0 ⟺ ${ok}.`,
    chk:()=>roots.every(z=>fn(z)===0)&&fn(roots.reduce((s,z)=>s+Math.abs(z),0)+7.5)!==0});
});
N8('m8-6-eq',6,'NB',r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),k=r.int(2,4),c=r.nz(-5,5),useK=r.chance(.5);if(a===b)return T.nlc['m8-6-eq'].gen(r);
  const M=useK?[k]:[1,c],NUM=u=>useK?`${k}${LFh(u)}`:`${LFh(c)}${LFh(u)}`;
  const A0=xlin(1,a),B0=xlin(1,b),ok=FR8(NUM(a),NUM(b));
  const wr=[FR8(xlin(1,a+k),xlin(1,b+k)),FR8(NUM(a),B0),FR8(A0,NUM(b)),FR8(NUM(b),NUM(a))];
  const mtxt=useK?String(k):LFh(c);
  return mkTxt(r,{stem:`Phân thức nào sau đây bằng phân thức ${FR8(A0,B0)}?`,correct:ok,wrongs:wr,
    sol:`Nhân cả tử và mẫu của ${FR8(A0,B0)} với ${mtxt} (khác 0) ta được ${ok}; các phân thức còn lại không thu được từ ${FR8(A0,B0)} bằng cách nhân cả tử và mẫu với cùng một đa thức khác 0.`,
    chk:()=>{const x=3.7;return closeN(pv(pmul(M,[1,a]),x)/pv(pmul(M,[1,b]),x),(x+a)/(x+b))&&wr.every(w=>w!==ok)}});
});
N8('m8-6-prop',6,'TH',r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),c=r.nz(-4,4);if(b===c||a===0)return T.nlc['m8-6-prop'].gen(r);
  /* (x + a)/(x + b) = P/((x + b)(x + c)) */
  const ok=pmul([1,a],[1,c]),wr=[pmul([1,a],[1,b]),pmul([1,a],[1,-c]),[1,a+c],pmul([1,b],[1,c]),padd(pmul([1,a],[1,c]),[1]),pmul([1,-a],[1,c])];
  const H=p=>PH(p),opts=wr.map(H).filter(z=>z!==H(ok));
  return mkTxt(r,{stem:`Tìm đa thức ${I('P')} sao cho ${FR8(xlin(1,a),xlin(1,b))} = ${FR8(I('P'),`${LFh(b)}${LFh(c)}`)}.`,correct:H(ok),wrongs:opts.map(z=>z),
    sol:`Nhân cả tử và mẫu của phân thức bên trái với ${LFh(c)} ta được ${FR8(`${LFh(a)}${LFh(c)}`,`${LFh(b)}${LFh(c)}`)}. Do đó ${I('P')} = ${LFh(a)}${LFh(c)} = ${H(ok)}.`,
    chk:()=>{const x=2.9;return closeN(pv([1,a],x)/pv([1,b],x),pv(ok,x)/(pv([1,b],x)*pv([1,c],x)))}});
});
N8('m8-6-simpl',6,'TH',r=>{
  const f=r.int(0,3);
  if(f===3){
    const p=r.pick([2,3,4,6]),q=r.pick([3,4,6,9]),g=(a,b)=>b?g(b,a%b):a,d=g(p,q),a1=p/d,b1=q/d;
    const ex=r.pick([[3,2,2,1],[2,1,3,1],[3,1,1,2],[2,2,1,2]]);/* x^m y^n : x^u y^v */
    const [m,n,u,v]=ex,sx=m-u,sy=n-v;
    const num=`${p}${X8}${m>1?sup(m):''}${Y8}${n>1?sup(n):''}`,den=`${q}${X8}${u>1?sup(u):''}${Y8}${v>1?sup(v):''}`;
    const xs=sx>0?X8+(sx>1?sup(sx):''):'',ys=sy>0?Y8+(sy>1?sup(sy):''):'',xd=sx<0?X8+(-sx>1?sup(-sx):''):'',yd=sy<0?Y8+(-sy>1?sup(-sy):''):'';
    const N=`${a1===1&&(xs||ys)?'':a1}${xs}${ys}`||'1',D=`${b1===1&&(xd||yd)?'':b1}${xd}${yd}`||'1';
    const ok=D==='1'?N:FR8(N,D);
    const dup=(N2,D2)=>D2==='1'?N2:FR8(N2,D2);
    const mn=(c,u,v)=>(c===1&&(u||v)?'':String(c))+u+v;
    const wr=[dup(mn(a1,xs+yd,''),mn(b1,xd+ys,'')),dup(mn(a1+b1,xs,ys),mn(b1,xd,yd)),dup(mn(a1+1,xs,ys),mn(b1,xd,yd)),dup(N,mn(b1+1,xd,yd)),dup(mn(b1,xs,ys),mn(a1,xd,yd)),dup(mn(a1,xs,ys),mn(a1+b1,xd,yd)),dup(mn(2*a1+1,xs,ys),mn(b1,xd,yd))];
    return mkTxt(r,{stem:`Rút gọn phân thức ${FR8(num,den)} ta được`,correct:ok,wrongs:wr,
      sol:`Chia cả tử và mẫu cho nhân tử chung ${d===1?'':d}${X8}${Math.min(m,u)>1?sup(Math.min(m,u)):''}${Y8}${Math.min(n,v)>1?sup(Math.min(n,v)):''}: ${ok}.`,
      chk:()=>p*b1===q*a1&&(sx+sy!==0||true)});
  }
  const a=r.int(2,6),b=r.nz(-5,5),c=r.nz(-5,5);
  if(f===0){ /* (x² − a²)/(x + a) = x − a  hoặc (x − a) → x + a */
    const s=r.pick([1,-1]),num=xquad(1,0,-a*a),den=xlin(1,s*a),ok=xlin(1,-s*a);
    return mkTxt(r,{stem:`Rút gọn phân thức ${FR8(num,den)} (với ${NEQ(-s*a)}) ta được`,correct:ok,wrongs:[xlin(1,s*a),xlin(1,a*a),xlin(1,-a*a),`${X8} ${MINUS} ${a}${X8}`.replace(/x/g,'x')],
      sol:`${num} = ${LFh(a)}${LFh(-a)} nên ${FR8(num,den)} = ${FR8(`${LFh(a)}${LFh(-a)}`,den)} = ${ok}.`,chk:()=>{const x=3.3;return closeN((x*x-a*a)/(x+s*a),x-s*a)}});
  }
  if(f===1){ /* (x² + (a+b)x + ab)/(x + a) = x + b */
    if(a===b)return T.nlc['m8-6-simpl'].gen(r);
    const num=PH(pmul([1,a],[1,b])),ok=xlin(1,b);
    return mkTxt(r,{stem:`Rút gọn phân thức ${FR8(num,xlin(1,a))} (với ${NEQ(-a)}) ta được`,correct:ok,wrongs:[xlin(1,a),xlin(1,-b),xlin(1,a+b),xlin(1,a*b)],
      sol:`${num} = ${LFh(a)}${LFh(b)} nên phân thức bằng ${FR8(`${LFh(a)}${LFh(b)}`,xlin(1,a))} = ${ok}.`,chk:()=>{const x=2.2;return closeN(pv(pmul([1,a],[1,b]),x)/(x+a),x+b)}});
  }
  /* f===2: (k x + k b)/(x + b) = k */
  const k=r.pick([2,3,4,5,-2,-3]),bb=r.nz(-6,6);
  return mkTxt(r,{stem:`Rút gọn phân thức ${FR8(xlin(k,k*bb),xlin(1,bb))} (với ${NEQ(-bb)}) ta được`,correct:sg(k),wrongs:[sg(k+1),sg(-k),xlin(k,bb),sg(k*bb)],
    sol:`${xlin(k,k*bb)} = ${sg(k)}${LFh(bb)} nên phân thức bằng ${sg(k)}.`,chk:()=>{const x=4.1;return closeN((k*x+k*bb)/(x+bb),k)}});
});
N8('m8-6-add',6,'TH',r=>{
  const c=r.nz(-5,5),a=r.nz(-4,4),b=r.nz(-5,5),d=r.nz(-4,4),e=r.nz(-5,5);
  if(r.chance(.5)){ /* tổng bằng hằng số k */
    const k=r.pick([2,3,4,-2,-3,5]),a2=r.nz(-4,4),d2=k-a2,b2=r.nz(-5,5),e2=k*c-b2;
    if(d2===0)return T.nlc['m8-6-add'].gen(r);
    if((a2===1&&b2===c)||(d2===1&&e2===c))return T.nlc['m8-6-add'].gen(r);
    const N1=xlin(a2,b2),N2=xlin(d2,e2);
    return mkTxt(r,{stem:`Kết quả của phép tính ${FR8(N1,xlin(1,c))} + ${FR8(N2,xlin(1,c))} (với ${NEQ(-c)}) là`,correct:sg(k),wrongs:[sg(k+1),sg(-k),FR8(sg(k),xlin(1,c)),xlin(k,c)],
      sol:`Cộng hai phân thức cùng mẫu: ${FR8(`${N1} ${N2.startsWith(MINUS)?MINUS+' '+N2.slice(1):'+ '+N2}`,xlin(1,c))} = ${FR8(xlin(k,k*c),xlin(1,c))} = ${sg(k)}.`,chk:()=>{const x=5.3;return closeN((a2*x+b2)/(x+c)+(d2*x+e2)/(x+c),k)}});
  }
  const N1=xlin(a,b),N2=xlin(d,e),s1=padd([a,b],[d,e]),ok=FR8(PH(s1),xlin(1,c));
  if(s1[0]===0||(a===1&&b===c)||(d===1&&e===c))return T.nlc['m8-6-add'].gen(r);
  const wr=[FR8(PH(padd([a,b],[-d,-e])),xlin(1,c)),FR8(PH(padd([a,b],[d,-e])),xlin(1,c)),FR8(PH(s1),xlin(2,2*c)),FR8(PH(padd([a,0],[d,e])),xlin(1,c))].filter(z=>z!==ok);
  return mkTxt(r,{stem:`Kết quả của phép tính ${FR8(N1,xlin(1,c))} + ${FR8(N2,xlin(1,c))} (với ${NEQ(-c)}) là`,correct:ok,wrongs:wr,
    sol:`Cộng hai phân thức cùng mẫu thức, cộng các tử thức và giữ nguyên mẫu thức: ${FR8(`(${N1}) + (${N2})`,xlin(1,c))} = ${ok}.`,chk:()=>{const x=1.9;return closeN((a*x+b)/(x+c)+(d*x+e)/(x+c),pv(s1,x)/(x+c))}});
});
N8('m8-6-sub',6,'TH',r=>{
  const c=r.nz(-5,5),a=r.nz(-4,4),b=r.nz(-5,5),d=r.nz(-4,4),e=r.nz(-5,5);
  const diff=padd([a,b],[-d,-e]);if(diff[0]===0&&diff[1]===0||(a===d&&b!==e&&false))return T.nlc['m8-6-sub'].gen(r);
  const N1=xlin(a,b),N2=xlin(d,e),ok=FR8(PH(diff),xlin(1,c));
  const wr=[FR8(PH(padd([a,b],[d,-e])),xlin(1,c)),FR8(PH(padd([a,b],[d,e])),xlin(1,c)),FR8(PH(padd([a,b],[-d,e])),xlin(1,c)),FR8(PH(diff),xlin(1,-c))].filter(z=>z!==ok);
  return mkTxt(r,{stem:`Kết quả của phép tính ${FR8(N1,xlin(1,c))} ${MINUS} ${FR8(N2,xlin(1,c))} (với ${NEQ(-c)}) là`,correct:ok,wrongs:wr,
    sol:`${FR8(N1,xlin(1,c))} ${MINUS} ${FR8(N2,xlin(1,c))} = ${FR8(`(${N1}) ${MINUS} (${N2})`,xlin(1,c))} = ${ok} (nhớ đổi dấu mọi hạng tử của tử thức thứ hai).`,
    chk:()=>{const x=2.6;return closeN((a*x+b)/(x+c)-(d*x+e)/(x+c),pv(diff,x)/(x+c))}});
});
N8('m8-6-adddiff',6,'TH',r=>{
  const m=r.int(1,5),a=r.nz(-5,5),b=r.nz(-5,5);if(a+b===0||a===b)return T.nlc['m8-6-adddiff'].gen(r);
  /* a/(x − m) + b/(x + m) = ((a+b)x + m(a − b))/(x² − m²) */
  const num=[a+b,m*(a-b)],den=xquad(1,0,-m*m),ok=FR8(PH(num),den);
  const wr=[FR8(PH([a+b,m*(b-a)]),den),FR8(PH([a+b,0]),den),FR8(sg(a+b),den),FR8(PH([a-b,m*(a+b)]),den),FR8(PH(num),xlin(2,0))].filter(z=>z!==ok);
  return mkTxt(r,{stem:`Kết quả của phép tính ${FR8(sg(a),xlin(1,-m))} + ${FR8(sg(b),xlin(1,m))} (với ${X8} ≠ ±${m}) là`,correct:ok,wrongs:wr,
    sol:`Mẫu thức chung là ${LFh(-m)}${LFh(m)} = ${den}. ${FR8(sg(a),xlin(1,-m))} + ${FR8(sg(b),xlin(1,m))} = ${FR8(`${cfl(a)}${LFh(m)} + ${cfl(b)}${LFh(-m)}`.replace('+ −','− '),den)} = ${ok}.`,
    chk:()=>{const x=4.4;return closeN(a/(x-m)+b/(x+m),pv(num,x)/(x*x-m*m))}});
});
N8('m8-6-mul',6,'TH',r=>{
  const a=r.int(1,5),b=r.nz(-5,5),c=r.nz(-5,5);if(b===c||a===b||a===c||a===-b)return T.nlc['m8-6-mul'].gen(r);
  if(r.chance(.5)){ /* (x² − a²)/(x + b) · (x + b)/(x + a) = x − a */
    const ok=xlin(1,-a);
    return mkTxt(r,{stem:`Kết quả của phép nhân ${FR8(xquad(1,0,-a*a),xlin(1,b))} · ${FR8(xlin(1,b),xlin(1,a))} (với các mẫu thức khác 0) là`,correct:ok,wrongs:[xlin(1,a),xlin(1,-a*a),FR8(xlin(1,-a),xlin(1,b)),xquad(1,0,-a*a)],
      sol:`${FR8(`${LFh(a)}${LFh(-a)}${LFh(b)}`,`${LFh(b)}${LFh(a)}`)} = ${ok} sau khi rút gọn các nhân tử chung ${LFh(a)} và ${LFh(b)}.`,chk:()=>{const x=3.9;return closeN((x*x-a*a)/(x+b)*(x+b)/(x+a),x-a)}});
  }
  const ok=FR8(xlin(1,a),xlin(1,c));
  return mkTxt(r,{stem:`Kết quả của phép nhân ${FR8(xlin(1,a),xlin(1,b))} · ${FR8(xlin(1,b),xlin(1,c))} (với các mẫu thức khác 0) là`,correct:ok,wrongs:[FR8(xlin(1,a),xlin(1,b)),FR8(xlin(1,c),xlin(1,a)),FR8(xlin(1,b),xlin(1,c)),FR8(xlin(1,a),xlin(1,b+c))],
    sol:`Nhân tử với tử, mẫu với mẫu rồi rút gọn nhân tử chung ${LFh(b)}: ${ok}.`,chk:()=>{const x=2.3;return closeN((x+a)/(x+b)*(x+b)/(x+c),(x+a)/(x+c))}});
});
N8('m8-6-div',6,'TH',r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),c=r.nz(-5,5);if(b===c||a===b||a===c)return T.nlc['m8-6-div'].gen(r);
  /* (x + a)/(x + b) : (x + a)/(x + c) = (x + c)/(x + b) */
  const ok=FR8(xlin(1,c),xlin(1,b));
  return mkTxt(r,{stem:`Kết quả của phép chia ${FR8(xlin(1,a),xlin(1,b))} : ${FR8(xlin(1,a),xlin(1,c))} (với các mẫu thức và phân thức chia khác 0) là`,correct:ok,wrongs:[FR8(xlin(1,b),xlin(1,c)),FR8(xlin(1,b),xlin(1,a)),'1',FR8(xlin(1,a),xlin(1,c))],
    sol:`Nhân với phân thức nghịch đảo: ${FR8(xlin(1,a),xlin(1,b))} · ${FR8(xlin(1,c),xlin(1,a))} = ${ok}.`,chk:()=>{const x=6.1;return closeN((x+a)/(x+b)/((x+a)/(x+c)),(x+c)/(x+b))}});
});
N8('m8-6-opp',6,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-6,6),want=r.chance(.5);if(a===b)return T.nlc['m8-6-opp'].gen(r);
  const A=xlin(1,a),B=xlin(1,b);
  if(want){ /* phân thức đối */
    return mkTxt(r,{stem:`Phân thức đối của phân thức ${FR8(A,B)} là`,correct:FR8(`${MINUS}(${A})`,B),wrongs:[FR8(B,A),FR8(A,`${MINUS}(${B})`),FR8(`${MINUS}(${B})`,A),FR8(A,B)].slice(0,4),
      sol:`Phân thức đối của ${fr('A','B')} là ${fr(`${MINUS}A`,'B')} (còn viết là ${MINUS}${fr('A','B')}). Vậy phân thức đối của ${FR8(A,B)} là ${FR8(`${MINUS}(${A})`,B)}.`,chk:()=>true});
  }
  return mkTxt(r,{stem:`Phân thức nghịch đảo của phân thức ${FR8(A,B)} (với ${NEQ(-a)} và ${NEQ(-b)}) là`,correct:FR8(B,A),wrongs:[FR8(`${MINUS}(${A})`,B),FR8(`${MINUS}(${B})`,A),FR8(A,B)].concat([FR8(B,`${MINUS}(${A})`)]),
    sol:`Phân thức nghịch đảo của ${fr('A','B')} (A khác 0) là ${fr('B','A')}. Vậy phân thức nghịch đảo của ${FR8(A,B)} là ${FR8(B,A)}.`,chk:()=>true});
});
N8('m8-6-val',6,'TH',r=>{
  const a=r.int(2,6),k=r.pick([-4,-3,-2,-1,1,2,3,4,5,6]),s=r.pick([1,-1]);if(k===s*a||k===-s*a)return T.nlc['m8-6-val'].gen(r);
  const ok=k-s*a;
  return mkNum(r,{stem:`Giá trị của phân thức ${FR8(xquad(1,0,-a*a),xlin(1,s*a))} tại ${X8} = ${sg(k)} là`,correct:ok,ok:()=>true,cands:[k+s*a,k*k-a*a,ok+1,ok-1,k+a],
    sol:`${xquad(1,0,-a*a)} = ${LFh(a)}${LFh(-a)} nên phân thức rút gọn thành ${xlin(1,-s*a)}. Tại ${X8} = ${sg(k)}: ${sg(k)} ${s>0?MINUS:'+'} ${a} = ${sg(ok)}.`,chk:()=>closeN((k*k-a*a)/(k+s*a),ok)});
});
N8('m8-6-zero',6,'TH',r=>{
  const a=r.int(2,7),s=r.pick([1,-1]);
  /* (x² − a²)/(x − s·a) = 0  ⟹  x = s·(−a)... nghiệm phải loại giá trị làm mẫu bằng 0 */
  const ok=-s*a;
  return mkNum(r,{stem:`Giá trị của ${X8} để phân thức ${FR8(xquad(1,0,-a*a),xlin(1,-s*a))} bằng 0 là`,correct:ok,ok:()=>true,cands:[s*a,0,a*a,-a*a,s*a+1],
    sol:`Điều kiện ${NEQ(s*a)}. ${xquad(1,0,-a*a)} = 0 ⟺ ${X8} = ${a} hoặc ${X8} = ${MINUS}${a}; giá trị ${X8} = ${sg(s*a)} làm mẫu bằng 0 nên bị loại. Vậy ${X8} = ${sg(ok)}.`,chk:()=>(ok*ok-a*a===0)&&(ok-s*a!==0)});
});
N8('m8-6-int',6,'VD',r=>{
  const k=r.pick([6,8,10,12,15,18,20]),a=r.nz(-4,4),cnt=2*nDiv(k);
  return mkNum(r,{stem:`Có bao nhiêu số nguyên ${X8} để phân thức ${FR8(k,xlin(1,a))} nhận giá trị là số nguyên?`,correct:cnt,cands:[nDiv(k),cnt+2,cnt-2,k],
    sol:`${xlin(1,a)} phải là ước nguyên của ${k}. ${k} có ${nDiv(k)} ước dương nên có ${cnt} ước nguyên, mỗi ước cho đúng một giá trị của ${X8}. Vậy có ${cnt} số nguyên ${X8} thỏa mãn.`,
    chk:()=>{let c=0;for(let x=-200;x<=200;x++){if(x+a!==0&&k%(x+a)===0)c++}return c===cnt}});
});
N8('m8-6-common',6,'TH',r=>{
  const m=r.int(2,6),f=r.int(0,2);
  let d1,d2,ok,wr;
  if(f===0){d1=xlin(1,-m);d2=xlin(1,m);ok=xquad(1,0,-m*m);wr=[`${LFh(-m)}`,`${LFh(m)}`,`${LFh(-m)}${LFh(m)}${X8}`,`2${X8}`]}
  else if(f===1){d1=xlin(1,-m);d2=xquad(1,0,-m*m);ok=xquad(1,0,-m*m);wr=[xlin(1,-m),`${LFh(-m)}${sup(2)}${LFh(m)}`,xlin(1,m),`${LFh(-m)}${xquad(1,0,-m*m)}`.replace(/^/,'')]}
  else{const p=r.pick([2,3,4]),q=r.pick([3,5,6]);d1=`${p}${X8}${sup(2)}`;d2=`${q}${X8}`;const l=p*q/(p===q?p:1);const g=(u,v)=>v?g(v,u%v):u;const L=p*q/g(p,q);ok=`${L}${X8}${sup(2)}`;wr=[`${p*q}${X8}${sup(3)}`,`${L}${X8}`,`${L+p}${X8}${sup(2)}`,`${p+q}${X8}${sup(2)}`]}
  return mkTxt(r,{stem:`Mẫu thức chung của hai phân thức ${FR8('1',d1)} và ${FR8('1',d2)} (chọn mẫu thức chung đơn giản nhất) là`,correct:ok,wrongs:wr,
    sol:`Phân tích các mẫu thức thành nhân tử rồi lấy tích các nhân tử chung và riêng với số mũ lớn nhất: mẫu thức chung là ${ok}.`,chk:()=>true});
});

/* ----- Đúng/sai chương VI ----- */
DS8('ds8-6-theory',6,'NB',r=>{
  const A=I('A'),B=I('B'),C=I('C'),D=I('D');
  const pool=[
    {t:`Mỗi đa thức cũng là một phân thức đại số.`,f:`Mỗi phân thức đại số đều là một đa thức.`,why:`Đa thức A viết được dưới dạng ${fr('A','1')} nên là phân thức; ngược lại ${fr('1',X8)} là phân thức nhưng không phải đa thức.`},
    {t:`${fr(A,B)} = ${fr(C,D)} khi ${A}·${D} = ${B}·${C}.`,f:`${fr(A,B)} = ${fr(C,D)} khi ${A}·${C} = ${B}·${D}.`,why:`Hai phân thức ${fr('A','B')} và ${fr('C','D')} bằng nhau nếu A·D = B·C.`},
    {t:`${fr(A,B)} + ${fr(C,B)} = ${fr(`${A} + ${C}`,B)}.`,f:`${fr(A,B)} + ${fr(C,B)} = ${fr(`${A} + ${C}`,`${B} + ${B}`)}.`,why:`Cộng hai phân thức cùng mẫu: cộng các tử thức, giữ nguyên mẫu thức.`},
    {t:`${fr(A,B)} ${MINUS} ${fr(C,B)} = ${fr(`${A} ${MINUS} ${C}`,B)}.`,f:`${fr(A,B)} ${MINUS} ${fr(C,B)} = ${fr(`${A} ${MINUS} ${C}`,`${B} ${MINUS} ${B}`)}.`,why:`Trừ hai phân thức cùng mẫu: trừ các tử thức, giữ nguyên mẫu thức.`},
    {t:`${fr(A,B)} · ${fr(C,D)} = ${fr(`${A}${C}`,`${B}${D}`)}.`,f:`${fr(A,B)} · ${fr(C,D)} = ${fr(`${A}${D}`,`${B}${C}`)}.`,why:`Nhân hai phân thức: nhân tử với tử, mẫu với mẫu.`},
    {t:`${fr(A,B)} : ${fr(C,D)} = ${fr(A,B)} · ${fr(D,C)} (với ${C} khác đa thức 0).`,f:`${fr(A,B)} : ${fr(C,D)} = ${fr(A,B)} · ${fr(C,D)}.`,why:`Chia cho một phân thức khác 0 là nhân với phân thức nghịch đảo của nó.`},
    {t:`Phân thức đối của ${fr(A,B)} là ${fr(`${MINUS}${A}`,B)}.`,f:`Phân thức đối của ${fr(A,B)} là ${fr(B,A)}.`,why:`${fr(B,A)} là phân thức nghịch đảo, không phải phân thức đối.`},
    {t:`Phân thức ${fr(A,B)} xác định khi ${B} khác đa thức 0.`,f:`Phân thức ${fr(A,B)} xác định khi ${A} khác đa thức 0.`,why:`Phân thức xác định khi mẫu thức khác 0.`}
  ];
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:r.shuffle(pool).slice(0,4)});
});
DS8('ds8-6-simpl',6,'TH',r=>{
  const a=r.int(2,6),k=r.pick([a+1,a+2,a+3,2*a,-1,-2].filter(v=>v!==-a&&v!==0)),x0=k;
  const P=`${FR8(xquad(1,0,-a*a),`${X8}${LFh(a)}`)}`;
  const V=Q(x0-a,x0);
  const items=[
    {t:`Điều kiện xác định của ${I('P')} là ${X8} ≠ 0 và ${X8} ≠ ${MINUS}${a}.`,f:`Điều kiện xác định của ${I('P')} là ${X8} ≠ 0 và ${X8} ≠ ${a}.`,why:`Mẫu ${X8}${LFh(a)} = 0 ⟺ ${X8} = 0 hoặc ${X8} = ${MINUS}${a}.`},
    {t:`${I('P')} = ${FR8(xlin(1,-a),X8)}.`,f:`${I('P')} = ${FR8(xlin(1,a),X8)}.`,why:`${xquad(1,0,-a*a)} = ${LFh(a)}${LFh(-a)}; rút gọn nhân tử ${LFh(a)} được ${FR8(xlin(1,-a),X8)}.`},
    {t:`Giá trị của ${I('P')} tại ${X8} = ${sg(x0)} bằng ${qh(V)}.`,f:`Giá trị của ${I('P')} tại ${X8} = ${sg(x0)} bằng ${qh(qadd(V,Q(1,Math.abs(x0))))}.`,why:`Thay ${X8} = ${sg(x0)} vào ${FR8(xlin(1,-a),X8)} được ${qh(V)}.`},
    {t:`${I('P')} = 0 khi ${X8} = ${a}.`,f:`${I('P')} = 0 khi ${X8} = ${MINUS}${a}.`,why:`${FR8(xlin(1,-a),X8)} = 0 ⟺ ${X8} = ${a}; ${X8} = ${MINUS}${a} không thuộc điều kiện xác định.`}
  ];
  return mkDS(r,{stem:`Cho phân thức ${I('P')} = ${P}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>closeN((x0*x0-a*a)/(x0*(x0+a)),qv(V))&&x0!==0&&x0!==-a});
});
DS8('ds8-6-ops',6,'TH',r=>{
  const m=r.int(1,4),a=r.nz(-4,4),b=r.nz(-4,4);if(a+b===0||a===b||a*b===0)return T.ds['ds8-6-ops'].gen(r);
  const A=I('A'),B=I('B'),den=xquad(1,0,-m*m);
  const items=[
    {t:`Điều kiện xác định chung của ${A} và ${B} là ${X8} ≠ ${m} và ${X8} ≠ ${MINUS}${m}.`,f:`Điều kiện xác định chung của ${A} và ${B} là ${X8} ≠ ${m}.`,why:`${A} xác định khi ${X8} ≠ ${m}; ${B} xác định khi ${X8} ≠ ${MINUS}${m}; điều kiện chung gồm cả hai.`},
    {t:`Mẫu thức chung của ${A} và ${B} là ${den}.`,f:`Mẫu thức chung của ${A} và ${B} là ${xlin(1,m)}.`,why:`${den} = ${LFh(-m)}${LFh(m)} chia hết cho cả hai mẫu thức.`},
    {t:`${A} + ${B} = ${FR8(PH([a+b,m*(a-b)]),den)}.`,f:`${A} + ${B} = ${FR8(PH([a+b,m*(b-a)]),den)}.`,why:`${A} + ${B} = ${FR8(`${cfl(a)}${LFh(m)} + ${cfl(b)}${LFh(-m)}`.replace('+ −','− '),den)} = ${FR8(PH([a+b,m*(a-b)]),den)}.`},
    {t:`${A} · ${B} = ${FR8(sg(a*b),den)}.`,f:`${A} · ${B} = ${FR8(sg(a+b),den)}.`,why:`Nhân tử với tử, mẫu với mẫu: ${FR8(`${sg(a)}·${sg(b)}`,`${LFh(-m)}${LFh(m)}`)} = ${FR8(sg(a*b),den)}.`}
  ];
  return mkDS(r,{stem:`Cho hai phân thức ${A} = ${FR8(sg(a),xlin(1,-m))} và ${B} = ${FR8(sg(b),xlin(1,m))}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>{const x=7.7;return closeN(a/(x-m)+b/(x+m),((a+b)*x+m*(a-b))/(x*x-m*m))&&closeN(a/(x-m)*b/(x+m),a*b/(x*x-m*m))}});
});
DS8('ds8-6-int',6,'VD',r=>{
  const k=r.pick([6,8,10,12]),a=r.nz(-3,3),cnt=2*nDiv(k),x0=r.pick([1,2,3,4,5,6,7].filter(v=>v+a!==0&&k%(v+a)===0)||[1]);
  const xs=[1,2,3,4,5,-1,-2,-3,0].filter(v=>v+a!==0);
  const bad=xs.find(v=>k%(v+a)!==0);
  if(bad===undefined||x0===undefined)return T.ds['ds8-6-int'].gen(r);
  const good=xs.find(v=>k%(v+a)===0&&(v+a)!==0);
  if(good===undefined)return T.ds['ds8-6-int'].gen(r);
  const items=[
    {t:`Điều kiện xác định của ${I('P')} là ${NEQ(-a)}.`,f:`Điều kiện xác định của ${I('P')} là ${NEQ(a)}.`,why:`Mẫu ${xlin(1,a)} ≠ 0 ⟺ ${NEQ(-a)}.`},
    {t:`Với ${X8} = ${sg(good)} thì ${I('P')} nhận giá trị nguyên.`,f:`Với ${X8} = ${sg(bad)} thì ${I('P')} nhận giá trị nguyên.`,why:`Với ${X8} = ${sg(good)}: ${xlin(1,a)} = ${sg(good+a)} là ước của ${k}, nên ${I('P')} = ${sg(k/(good+a))}. Với ${X8} = ${sg(bad)}: ${I('P')} = ${fr(k,sg(bad+a))} không nguyên.`},
    {t:`${I('P')} nguyên khi và chỉ khi ${xlin(1,a)} là ước của ${k}.`,f:`${I('P')} nguyên khi và chỉ khi ${xlin(1,a)} là bội của ${k}.`,why:`${fr(k,xlin(1,a))} nguyên ⟺ ${xlin(1,a)} là ước của ${k}.`},
    {t:`Có đúng ${cnt} số nguyên ${X8} để ${I('P')} nhận giá trị nguyên.`,f:`Có đúng ${nDiv(k)} số nguyên ${X8} để ${I('P')} nhận giá trị nguyên.`,why:`${k} có ${nDiv(k)} ước dương và ${nDiv(k)} ước âm, tổng cộng ${cnt} ước, mỗi ước cho một giá trị của ${X8}.`}
  ];
  return mkDS(r,{stem:`Cho phân thức ${I('P')} = ${FR8(k,xlin(1,a))}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>k%(good+a)===0&&k%(bad+a)!==0});
});

/* ----- Trả lời ngắn chương VI ----- */
TLN8('t8-6-val',6,'NB',r=>{
  const c=r.nz(-4,5),k=r.int(-3,6),v=r.pick([-3,-2,-1,1,2,3,4]),den=k+c;if(den===0)return T.tln['t8-6-val'].gen(r);
  const a=r.nz(-3,3),b=v*den-a*k;
  return{kind:'tln',stem:`Tính giá trị của phân thức ${FR8(xlin(a,b),xlin(1,c))} tại ${X8} = ${sg(k)}.`,ans:v,unit:'',
    sol:`Thay ${X8} = ${sg(k)}: tử thức = ${sg(a*k+b)}, mẫu thức = ${sg(den)}, giá trị là ${sg(v)}.`,chk:()=>(a*k+b)===v*den};
});
TLN8('t8-6-simplval',6,'TH',r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),k=r.int(-4,6);if(a===b||k+a===0)return T.tln['t8-6-simplval'].gen(r);
  const ans=k+b;
  return{kind:'tln',stem:`Rút gọn rồi tính giá trị của phân thức ${FR8(PH(pmul([1,a],[1,b])),xlin(1,a))} tại ${X8} = ${sg(k)}.`,ans,unit:'',
    sol:`${PH(pmul([1,a],[1,b]))} = ${LFh(a)}${LFh(b)} nên phân thức bằng ${xlin(1,b)}. Tại ${X8} = ${sg(k)} giá trị là ${sg(ans)}.`,chk:()=>closeN(pv(pmul([1,a],[1,b]),k)/(k+a),ans)};
});
TLN8('t8-6-sum',6,'TH',r=>{
  const m=r.int(1,5),a=r.nz(-5,5),b=r.nz(-5,5);if(a+b===0||a===b)return T.tln['t8-6-sum'].gen(r);
  const p=a+b,q=m*(a-b);
  return{kind:'tln',stem:`Biết ${FR8(sg(a),xlin(1,-m))} + ${FR8(sg(b),xlin(1,m))} = ${FR8(`${I('p')}${X8} + ${I('q')}`,xquad(1,0,-m*m))} (với ${X8} ≠ ±${m}). Tính ${I('p')} + ${I('q')}.`,ans:p+q,unit:'',
    sol:`Quy đồng: ${FR8(`${cfl(a)}${LFh(m)} + ${cfl(b)}${LFh(-m)}`.replace('+ −','− '),xquad(1,0,-m*m))} = ${FR8(PH([p,q]),xquad(1,0,-m*m))}. Vậy p = ${sg(p)}, q = ${sg(q)} và p + q = ${sg(p+q)}.`,chk:()=>{const x=5.5;return closeN(a/(x-m)+b/(x+m),(p*x+q)/(x*x-m*m))}};
});
TLN8('t8-6-int',6,'VD',r=>{
  const f=r.int(0,1);
  if(f===0){
    const k=r.pick([7,9,11,14,16,21,24]),a=r.nz(-3,3),cnt=2*nDiv(k);
    return{kind:'tln',stem:`Có bao nhiêu giá trị nguyên của ${X8} để phân thức ${FR8(k,xlin(1,a))} có giá trị nguyên?`,ans:cnt,unit:'',
      sol:`${xlin(1,a)} phải là ước nguyên của ${k}. ${k} có ${nDiv(k)} ước dương nên có ${cnt} ước nguyên, tương ứng ${cnt} giá trị của ${X8}.`,chk:()=>{let c=0;for(let x=-300;x<=300;x++)if(x+a!==0&&k%(x+a)===0)c++;return c===cnt}};
  }
  const k=r.pick([9,15,21,25,27,35]),odd=[];for(let d=1;d<=k;d+=2)if(k%d===0)odd.push(d);
  const cnt=2*odd.length;
  return{kind:'tln',stem:`Có bao nhiêu giá trị nguyên của ${X8} để phân thức ${FR8(k,xlin(2,1))} có giá trị nguyên?`,ans:cnt,unit:'',
    sol:`2${X8} + 1 là số nguyên lẻ và phải là ước của ${k}. ${k} có ${odd.length} ước dương lẻ (${odd.join('; ')}) nên có ${cnt} ước nguyên lẻ, mỗi ước cho một giá trị nguyên của ${X8}.`,
    chk:()=>{let c=0;for(let x=-300;x<=300;x++){const d=2*x+1;if(k%d===0)c++}return c===cnt}};
});
TLN8('t8-6-expr',6,'VD',r=>{
  const a=r.int(1,5),b=r.pick([2,3,4,5,6]),m=r.int(1,4);if(a===b)return T.tln['t8-6-expr'].gen(r);
  /* P = a/(x − m) · (x² − m²)/b = a(x + m)/b; chọn x sao cho a(x+m) chia hết cho b */
  const xv=r.pick([1,2,3,4,5,6,7,8,9,10,11,12].filter(v=>v!==m&&(a*(v+m))%b===0));
  if(xv===undefined)return T.tln['t8-6-expr'].gen(r);
  const ans=a*(xv+m)/b;
  return{kind:'tln',stem:`Cho ${I('P')} = ${FR8(a,xlin(1,-m))} · ${FR8(xquad(1,0,-m*m),b)}. Tính giá trị của ${I('P')} tại ${X8} = ${xv}.`,ans,unit:'',
    sol:`${I('P')} = ${FR8(`${cfl(a)}${LFh(-m)}${LFh(m)}`,`${LFh(-m)}·${b}`)} = ${FR8(`${cfl(a)}${LFh(m)}`,b)}. Tại ${X8} = ${xv}: ${fr(`${a}·${xv+m}`,b)} = ${sg(ans)}.`,chk:()=>closeN(a/(xv-m)*(xv*xv-m*m)/b,ans)};
});
TLN8('t8-6-max',6,'VDC',r=>{
  const a=r.int(1,4),d=r.pick([1,2,4,5]),k=r.pick([3,4,5,6,8,10,12]),b=a*a+d;
  const ans=k/d;
  return{kind:'tln',stem:`Tìm giá trị lớn nhất của biểu thức ${I('A')} = ${FR8(k,xquad(1,-2*a,b))}.`,ans,unit:'',
    sol:`${xquad(1,-2*a,b)} = (${X8} ${MINUS} ${a})${sup(2)} + ${d} ≥ ${d} với mọi ${X8}, nên ${I('A')} ≤ ${fr(k,d)} = ${fmt(ans)}. Dấu “=” xảy ra khi ${X8} = ${a}. Vậy giá trị lớn nhất của ${I('A')} là ${fmt(ans)}.`,
    chk:()=>closeN(k/((a-a)*(a-a)+d),ans)&&b-a*a===d};
});

/* ----- Tự luận chương VI ----- */
TL8('tl8-6-simpl',6,'TH','alg',r=>{
  const [p,q,s]=r.shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,3);
  const num=pmul([1,p],[1,q]),den=pmul([1,q],[1,s]);
  return{kind:'tl',title:'Rút gọn phân thức',parts:[
    {pts:.5,html:`Cho phân thức ${I('P')} = ${FR8(PH(num),PH(den))}. Tìm điều kiện xác định của ${I('P')}.`},
    {pts:.5,html:`Rút gọn ${I('P')} và tính giá trị của ${I('P')} tại ${X8} = ${q===0?1:(Math.abs(p)+Math.abs(q)+Math.abs(s)+1)}.`}],
    sol:[ptxt([[`${PH(den)} = ${LFh(q)}${LFh(s)}.`,.25],[`Mẫu khác 0 ⟺ ${X8} ≠ ${sg(-q)} và ${X8} ≠ ${sg(-s)}.`,.25]]),
      ptxt([[`${PH(num)} = ${LFh(p)}${LFh(q)} nên ${I('P')} = ${FR8(`${LFh(p)}${LFh(q)}`,`${LFh(q)}${LFh(s)}`)} = ${FR8(xlin(1,p),xlin(1,s))}.`,.25],[`Tại ${X8} = ${Math.abs(p)+Math.abs(q)+Math.abs(s)+1}: ${I('P')} = ${qh(Q(Math.abs(p)+Math.abs(q)+Math.abs(s)+1+p,Math.abs(p)+Math.abs(q)+Math.abs(s)+1+s))}.`,.25]])],
    chk:()=>{const x=Math.abs(p)+Math.abs(q)+Math.abs(s)+1;return closeN(pv(num,x)/pv(den,x),(x+p)/(x+s))&&p!==q&&q!==s&&p!==s}};
});
TL8('tl8-6-add',6,'TH','alg',r=>{
  const m=r.int(1,4),a=r.int(2,3),k=r.pick([2,3,4,-2,-3]),b=k-a;if(b===0)return T.tl['tl8-6-add'].gen(r);
  const c=-k*m-a*m;
  const A=`${FR8(a,xlin(1,-m))} + ${FR8(xlin(b,c),xquad(1,0,-m*m))}`;
  const nb=padd(pscale([1,m],a),[b,c]);
  return{kind:'tl',title:'Cộng các phân thức',parts:[
    {pts:.5,html:`Cho ${I('A')} = ${A}. Tìm điều kiện xác định của ${I('A')}.`},
    {pts:.5,html:`Rút gọn ${I('A')}.`}],
    sol:[ptxt([[`${xquad(1,0,-m*m)} = ${LFh(-m)}${LFh(m)}.`,.25],[`${I('A')} xác định khi ${X8} ≠ ${m} và ${X8} ≠ ${MINUS}${m}.`,.25]]),
      ptxt([[`${I('A')} = ${FR8(`${a}${LFh(m)} + (${xlin(b,c)})`,xquad(1,0,-m*m))} = ${FR8(PH(nb),xquad(1,0,-m*m))}.`,.25],[`${PH(nb)} = ${sg(k)}${LFh(-m)} nên ${I('A')} = ${FR8(`${sg(k)}${LFh(-m)}`,`${LFh(-m)}${LFh(m)}`)} = ${FR8(sg(k),xlin(1,m))}.`,.25]])],
    chk:()=>{const x=6.3;return closeN(a/(x-m)+(b*x+c)/(x*x-m*m),k/(x+m))&&nb[0]===k&&nb[1]===-k*m}};
});
TL8('tl8-6-expr',6,'VD','alg',r=>{
  const a=r.pick([2,3,4]);
  /* P = [ (x + a)/(x − a) − (x − a)/(x + a) ] : 4/(x − a) = a·x/(x + a) */
  const sols=[];for(let x=-60;x<=60;x++){if(x===a||x===-a)continue;if((a*x)%(x+a)===0&&x+a!==0)sols.push(x)}
  return{kind:'tl',title:'Biến đổi biểu thức chứa phân thức',parts:[
    {pts:.5,html:`Cho ${I('P')} = (${FR8(xlin(1,a),xlin(1,-a))} ${MINUS} ${FR8(xlin(1,-a),xlin(1,a))}) : ${FR8(4,xlin(1,-a))}. Tìm điều kiện xác định và rút gọn ${I('P')}.`},
    {pts:.5,html:`Tìm tất cả các giá trị nguyên của ${X8} để ${I('P')} có giá trị nguyên.`}],
    sol:[ptxt([[`Điều kiện: ${X8} ≠ ${a} và ${X8} ≠ ${MINUS}${a}.`,.25],[`Trong ngoặc: ${FR8(`${LFh(a)}${sup(2)} ${MINUS} ${LFh(-a)}${sup(2)}`,xquad(1,0,-a*a))} = ${FR8(`${4*a}${X8}`,xquad(1,0,-a*a))}; chia cho ${FR8(4,xlin(1,-a))} được ${I('P')} = ${FR8(`${a}${X8}`,xlin(1,a))}.`,.25]]),
      ptxt([[`${I('P')} = ${a} ${MINUS} ${fr(a*a,xlin(1,a))}, nguyên ⟺ ${xlin(1,a)} là ước của ${a*a}.`,.25],[`${xlin(1,a)} ∈ {±${[...Array(a*a+1).keys()].filter(d=>d&&a*a%d===0).join('; ±')}} ⟹ ${X8} ∈ {${SETS(sols)}}${(a*a)%(2*a)===0?` (loại ${X8} = ${a} vì không thỏa điều kiện xác định)`:''}.`,.25]])],
    chk:()=>{const x=3.7;const P=((x+a)/(x-a)-(x-a)/(x+a))/(4/(x-a));return closeN(P,a*x/(x+a))&&sols.every(v=>Number.isInteger(a*v/(v+a)))}};
});
TL8('tl8-6-int',6,'VD','alg',r=>{
  const a=r.pick([2,3,4]),c=r.nz(-3,3),b=r.nz(-7,7),kk=b-a*c;if(kk===0)return T.tl['tl8-6-int'].gen(r);
  const divs=[];for(let d=1;d<=Math.abs(kk);d++)if(kk%d===0){divs.push(d,-d)}
  const xs=divs.map(d=>d-c).sort((u,v)=>u-v);
  return{kind:'tl',title:'Giá trị nguyên của phân thức',parts:[
    {pts:.5,html:`Cho ${I('A')} = ${FR8(xlin(a,b),xlin(1,c))}. Viết ${I('A')} dưới dạng tổng của một số nguyên và một phân thức có tử thức là số nguyên.`},
    {pts:.5,html:`Tìm tất cả các giá trị nguyên của ${X8} để ${I('A')} có giá trị nguyên.`}],
    sol:[ptxt([[`${xlin(a,b)} = ${a}(${xlin(1,c)}) ${kk<0?MINUS:'+'} ${Math.abs(kk)}.`,.25],[`Do đó ${I('A')} = ${a} ${kk<0?MINUS:'+'} ${fr(Math.abs(kk),xlin(1,c))}.`,.25]]),
      ptxt([[`${I('A')} nguyên ⟺ ${xlin(1,c)} là ước nguyên của ${Math.abs(kk)}, tức ${xlin(1,c)} ∈ {${SETS(divs.sort((u,v)=>u-v))}}.`,.25],[`Suy ra ${X8} ∈ {${SETS(xs)}}.`,.25]])],
    chk:()=>xs.every(x=>(a*x+b)%(x+c)===0)&&xs.length===divs.length};
});
TL8('tl8-6-vdc',6,'VDC','alg',r=>{
  const a=r.int(1,3),d=r.pick([1,2,3,4]),k=r.pick([3,4,5,6,8,9,12]),b=a*a+d,ans=Q(k,d);
  return{kind:'tl',title:'Giá trị lớn nhất của phân thức',parts:[
    {pts:.5,html:`Chứng minh ${xquad(1,-2*a,b)} > 0 với mọi giá trị của ${X8}.`},
    {pts:.5,html:`Cho ${I('B')} = ${FR8(k,xquad(1,-2*a,b))}. Tìm giá trị lớn nhất của ${I('B')} và giá trị của ${X8} tại đó.`}],
    sol:[ptxt([[`${xquad(1,-2*a,b)} = (${X8} ${MINUS} ${a})${sup(2)} + ${d}.`,.25],[`(${X8} ${MINUS} ${a})${sup(2)} ≥ 0 nên ${xquad(1,-2*a,b)} ≥ ${d} > 0 với mọi ${X8}.`,.25]]),
      ptxt([[`Mẫu thức ≥ ${d} nên ${I('B')} ≤ ${fr(k,d)} = ${qh(ans)}.`,.25],[`Dấu “=” xảy ra khi ${X8} = ${a}. Vậy giá trị lớn nhất của ${I('B')} là ${qh(ans)}, đạt được khi ${X8} = ${a}.`,.25]])],
    chk:()=>b-a*a===d&&d>0};
});
