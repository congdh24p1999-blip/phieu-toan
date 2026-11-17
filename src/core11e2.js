/* ----- Đúng/sai chương VI ----- */
DS11b('ds11-6-theory',6,'NB',r=>{
  const a=I('a'),x=I('x'),y=I('y'),m=I('m'),n=I('n'),b=I('b');
  const L=(z)=>lg(a,z);
  const pool=[
    {t:`${L(`(${x}${y})`)} = ${L(x)} + ${L(y)}`,f:`${L(`(${x}${y})`)} = ${L(x)} · ${L(y)}`,why:`Lôgarit của một tích bằng tổng các lôgarit: log(xy) = log x + log y.`},
    {t:`${L(fr(x,y))} = ${L(x)} ${MINUS} ${L(y)}`,f:`${L(fr(x,y))} = ${fr(L(x),L(y))}`,why:`Lôgarit của một thương bằng hiệu các lôgarit.`},
    {t:`${L(x+sup(n))} = ${n}·${L(x)}`,f:`${L(x+sup(n))} = (${L(x)})${sup(n)}`,why:`Lôgarit của một lũy thừa: ${L(x+sup(n))} = ${n}·${L(x)}.`},
    {t:`${lg(a,b)} = ${fr(`ln ${b}`,`ln ${a}`)}`,f:`${lg(a,b)} = ${fr(`ln ${a}`,`ln ${b}`)}`,why:`Công thức đổi cơ số: ${lg(a,b)} = ${fr(`ln ${b}`,`ln ${a}`)}.`},
    {t:`${a}${sup(L(x))} = ${x}`,f:`${a}${sup(L(x))} = ${L(x)}`,why:`Theo định nghĩa lôgarit, ${a}${sup(L(x))} = ${x}.`},
    {t:`${a}${sup(m)}·${a}${sup(n)} = ${a}${sup(`${m} + ${n}`)}`,f:`${a}${sup(m)}·${a}${sup(n)} = ${a}${sup(`${m}${n}`)}`,why:`Nhân hai lũy thừa cùng cơ số thì cộng các số mũ.`},
    {t:`(${a}${sup(m)})${sup(n)} = ${a}${sup(`${m}${n}`)}`,f:`(${a}${sup(m)})${sup(n)} = ${a}${sup(`${m} + ${n}`)}`,why:`Lũy thừa của lũy thừa thì nhân các số mũ.`},
    {t:`${a}${sup(MINUS+n)} = ${fr(1,a+sup(n))}`,f:`${a}${sup(MINUS+n)} = ${MINUS}${a}${sup(n)}`,why:`Lũy thừa với số mũ âm: ${a}${sup(MINUS+n)} = ${fr(1,a+sup(n))}.`}
  ];
  return mkDS(r,{stem:`Cho ${a} > 0, ${a} ≠ 1; ${x}, ${y} > 0 và ${m}, ${n} là các số thực. Xét tính đúng sai của các khẳng định sau:`,items:r.shuffle(pool).slice(0,4)});
});
DS11b('ds11-6-expfn',6,'TH',r=>{
  const a0=r.pick([2,3,5,'1/2','1/3']),dec=typeof a0==='string',av=dec?1/Number(a0.split('/')[1]):a0,aH=dec?fr(1,a0.split('/')[1]):String(a0),f=I('f'),x=I('x');
  const F=pw(`(${aH})`,x),k=r.pick([2,3,-1,-2]),val=Math.pow(av,k),Vq=val>=1?Q(Math.round(val)):Q(1,Math.round(1/val)),Vf=qadd(Vq,Q(r.pick([1,-1,2]),Vq[1]>1?Vq[1]:1)),Vh=qh(Vq),Vfh=qh(Vf);
  const items=[
    {t:`${f}(${sg(k)}) = ${Vh}`,f:`${f}(${sg(k)}) = ${Vfh}`,why:`${f}(${sg(k)}) = ${pw(`(${aH})`,sg(k))} = ${Vh}.`},
    {t:`Hàm số ${dec?'nghịch biến':'đồng biến'} trên ℝ`,f:`Hàm số ${dec?'đồng biến':'nghịch biến'} trên ℝ`,why:`Cơ số ${dec?'thuộc khoảng (0; 1) nên hàm số nghịch biến':'lớn hơn 1 nên hàm số đồng biến'}.`},
    {t:`Đồ thị hàm số đi qua điểm ${I('A')}(0; 1)`,f:`Đồ thị hàm số đi qua điểm ${I('A')}(1; 0)`,why:`${f}(0) = ${pw(`(${aH})`,0)} = 1, còn ${f}(1) = ${aH} ≠ 0.`},
    {t:`Tập giá trị của hàm số là (0; +∞)`,f:`Tập giá trị của hàm số là [0; +∞)`,why:`${I('a')}${sup(x)} > 0 với mọi ${x} và nhận mọi giá trị dương.`}
  ];
  return mkDS(r,{stem:`Cho hàm số ${f}(${x}) = ${F}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>Math.abs(Math.pow(av,k)-qv(Vq))<1e-9&&!qeq(Vq,Vf)});
});
DS11b('ds11-6-logfn',6,'TH',r=>{
  const dec=r.chance(.3),a=dec?2:r.pick([2,3,5]),bH=dec?'0,5':String(a),bv=dec?.5:a,p=r.int(-3,4),j=r.int(1,3),A=a**j,f=I('f'),x=I('x');
  const arg=`${x} ${p<0?'+':MINUS} ${Math.abs(p)}`,Fn=`${f}(${x}) = log${sub(bH)}(${p===0?x:arg})`;
  const V=dec?-j:j,pt0=p+A;
  const items=[
    {t:`Tập xác định của hàm số là ${ivl(sg(p),PINF)}`,f:`Tập xác định của hàm số là ${ivl(sg(p),PINF,'[',')')}`,why:`Cần ${p===0?x:arg} > 0 ⟺ ${x} > ${sg(p)}.`},
    {t:`Hàm số ${dec?'nghịch biến':'đồng biến'} trên tập xác định`,f:`Hàm số ${dec?'đồng biến':'nghịch biến'} trên tập xác định`,why:`Cơ số ${bH} ${dec?'thuộc (0; 1) nên hàm số nghịch biến':'> 1 nên hàm số đồng biến'}.`},
    {t:`${f}(${sg(pt0)}) = ${sg(V)}`,f:`${f}(${sg(pt0)}) = ${sg(V+1)}`,why:`${f}(${sg(pt0)}) = log${sub(bH)} ${A} = ${sg(V)}.`},
    {t:`Đồ thị hàm số cắt trục hoành tại điểm có hoành độ ${sg(p+1)}`,f:`Đồ thị hàm số cắt trục hoành tại điểm có hoành độ ${sg(p)}`,why:`${f}(${x}) = 0 ⟺ ${xlin(1,-p)} = 1 ⟺ ${x} = ${sg(p+1)}.`}
  ];
  return mkDS(r,{stem:`Cho hàm số ${Fn}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>Math.abs(Math.log(A)/Math.log(bv)-V)<1e-9});
});
DS11b('ds11-6-pt',6,'VD',r=>{
  const a=r.pick([2,3]),[i,j]=r.shuffle([0,1,2,3]).slice(0,2),S=a**i+a**j,P=a**(i+j),t=I('t'),x=I('x');
  const eq=`${a}${sup('2'+x)} ${MINUS} ${S}·${a}${sup(x)} + ${P} = 0`;
  const items=[
    {t:`Đặt ${t} = ${a}${sup(x)} (${t} > 0), phương trình trở thành ${t}${sup(2)} ${MINUS} ${S}${t} + ${P} = 0`,f:`Đặt ${t} = ${a}${sup(x)} (${t} > 0), phương trình trở thành ${t}${sup(2)} + ${S}${t} + ${P} = 0`,why:`${a}${sup('2'+x)} = (${a}${sup(x)})${sup(2)} = ${t}${sup(2)} nên phương trình là ${t}${sup(2)} ${MINUS} ${S}${t} + ${P} = 0.`},
    {t:`Phương trình có hai nghiệm phân biệt`,f:`Phương trình có đúng một nghiệm`,why:`${t}${sup(2)} ${MINUS} ${S}${t} + ${P} = 0 có hai nghiệm dương ${t} = ${a**i} và ${t} = ${a**j}, ứng với ${x} = ${i} và ${x} = ${j}.`},
    {t:`Tổng các nghiệm của phương trình bằng ${i+j}`,f:`Tổng các nghiệm của phương trình bằng ${i+j+1}`,why:`Hai nghiệm là ${i} và ${j} nên tổng bằng ${i+j}.`},
    {t:`Tích các nghiệm của phương trình bằng ${i*j}`,f:`Tích các nghiệm của phương trình bằng ${i*j+2}`,why:`Hai nghiệm là ${i} và ${j} nên tích bằng ${i*j}.`}
  ];
  return mkDS(r,{stem:`Cho phương trình ${eq}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>[i,j].every(z=>Math.abs(a**(2*z)-S*a**z+P)<1e-9)&&i!==j});
});

/* ----- Trả lời ngắn chương VI ----- */
TLN11b('t11-6-logexpr',6,'TH',r=>{
  const a=r.pick([2,3,5]),k=r.int(1,4),t=r.pick([3,5,7]),b=r.pick([2,3,5,7]),N=r.int(2,9),x=a**k*t;
  if(t===a||x>800||b===N)return T.tln['t11-6-logexpr'].gen(r);
  const ans=k+N;
  return{kind:'tln',stem:`Tính giá trị biểu thức ${I('A')} = ${lg(a,x)} ${MINUS} ${lg(a,t)} + ${pw(b,lg(b,N))}.`,ans,unit:'',
    sol:`${lg(a,x)} ${MINUS} ${lg(a,t)} = ${lg(a,fr(x,t))} = ${lg(a,a**k)} = ${k}; ${pw(b,lg(b,N))} = ${N}. Vậy A = ${k} + ${N} = ${ans}.`,
    chk:()=>Math.abs(logv(a,x)-logv(a,t)+Math.pow(b,logv(b,N))-ans)<1e-9};
});
TLN11b('t11-6-exp2',6,'TH',r=>{
  const a=r.pick([2,3]),R=[[-1,2],[-1,3],[-1,4],[-1,5],[-2,2],[-2,3],[-2,4],[-3,2]].filter(z=>a**(-z[0]*z[1])<=400),[r1,r2]=r.pick(R),s=r1+r2,m=-r1*r2;
  const exH=`${I('x')}${sup(2)}${s===0?'':s>0?' '+MINUS+' '+(s===1?'':s)+I('x'):' + '+(s===-1?'':-s)+I('x')}`;
  const ask=r.pick(['sum','max','prod']),ans=ask==='sum'?s:ask==='max'?r2:r1*r2;
  return{kind:'tln',stem:`Phương trình ${pw(a,exH)} = ${a**m} có hai nghiệm. ${ask==='sum'?'Tính tổng hai nghiệm đó.':ask==='max'?'Tìm nghiệm lớn nhất của phương trình.':'Tính tích hai nghiệm của phương trình.'}`,ans,unit:'',
    sol:`${a**m} = ${a}${sup(m)} nên ${exH} = ${m} ⟺ ${exH} ${MINUS} ${m} = 0, có hai nghiệm ${sg(r1)} và ${sg(r2)}. ${ask==='sum'?`Tổng bằng ${sg(s)}.`:ask==='max'?`Nghiệm lớn nhất là ${sg(r2)}.`:`Tích bằng ${sg(r1*r2)}.`}`,
    chk:()=>[r1,r2].every(z=>z*z-s*z-m===0)};
});
TLN11b('t11-6-logsum',6,'VD',r=>{
  const cs=[];for(const a of [2,3,5])for(let k=1;k<=4;k++)for(let p=1;p<=8;p++){const v=a**k+p*p,s=Math.round(Math.sqrt(v));if(s*s===v&&s>p)cs.push([a,k,p,s])}
  const [a,k,p,s]=r.pick(cs);
  return{kind:'tln',stem:`Tìm nghiệm của phương trình ${lg(a,`(${I('x')} ${MINUS} ${p})`)} + ${lg(a,`(${I('x')} + ${p})`)} = ${k}.`,ans:s,unit:'',
    sol:`Điều kiện ${I('x')} > ${p}. Phương trình ⟺ ${lg(a,`[(${I('x')} ${MINUS} ${p})(${I('x')} + ${p})]`)} = ${k} ⟺ ${I('x')}${sup(2)} ${MINUS} ${p*p} = ${a**k} ⟺ ${I('x')}${sup(2)} = ${a**k+p*p} ⟺ ${I('x')} = ±${s}. Chỉ ${I('x')} = ${s} thỏa mãn điều kiện.`,
    chk:()=>Math.abs(logv(a,s-p)+logv(a,s+p)-k)<1e-9};
});
TLN11b('t11-6-compound',6,'TH',r=>{
  const A=r.pick([50,80,100,120,200,300]),rate=r.pick([5,6,7,8]),n=r.int(3,8),v=A*Math.pow(1+rate/100,n),ans=r2(v);
  return{kind:'tln',stem:`Bạn An gửi ${A} triệu đồng vào ngân hàng với lãi suất ${rate}%/năm theo thể thức lãi kép (hết mỗi năm, tiền lãi được cộng vào vốn). Hỏi sau ${n} năm, số tiền cả gốc lẫn lãi của An là bao nhiêu triệu đồng? (làm tròn đến hàng phần trăm)`,ans,unit:'',
    sol:`Số tiền sau ${n} năm: ${A}·(1 + ${rate/100})${sup(n)} ≈ ${fmt(ans)} (triệu đồng).`,chk:()=>Math.abs(v-ans)<0.0051};
});
TLN11b('t11-6-double',6,'VD',r=>{
  const rate=r.pick([5,6,7,8,9,10,12]),f=r.pick([2,3]),x=Math.log(f)/Math.log(1+rate/100);
  if(Math.abs(x-Math.round(x))<0.03)return T.tln['t11-6-double'].gen(r);
  const ans=Math.ceil(x);
  return{kind:'tln',stem:`Một người gửi tiết kiệm với lãi suất ${rate}%/năm theo thể thức lãi kép. Hỏi sau ít nhất bao nhiêu năm thì số tiền người đó có được ${f===2?'gấp đôi':'gấp ba'} số tiền ban đầu?`,ans,unit:'năm',
    sol:`Cần ${dnum(1+rate/100)}${sup(I('n'))} ≥ ${f} ⟺ ${I('n')} ≥ ${lg(dnum(1+rate/100),f)} ≈ ${dnum(x)}. Vì ${I('n')} nguyên nên ${I('n')} nhỏ nhất là ${ans}.`,
    chk:()=>Math.pow(1+rate/100,ans)>=f&&Math.pow(1+rate/100,ans-1)<f};
});
TLN11b('t11-6-decay',6,'TH',r=>{
  const T0=r.pick([2,3,5,8,10,12]),c=r.int(2,4),m0=r.pick([40,64,80,96,160,200,240]),ans=m0/2**c;
  if(!Number.isInteger(ans))return T.tln['t11-6-decay'].gen(r);
  return{kind:'tln',stem:`Một chất phóng xạ có chu kì bán rã là ${T0} năm. Biết khối lượng ban đầu là ${m0} g, khối lượng chất đó còn lại sau ${T0*c} năm được tính theo công thức ${I('m')}(${I('t')}) = ${m0}·${pw('(0,5)',fr(I('t'),T0))}. Tính khối lượng còn lại (đơn vị: gam).`,ans,unit:'g',
    sol:`${I('m')}(${T0*c}) = ${m0}·${pw('(0,5)',fr(T0*c,T0))} = ${m0}·${pw('(0,5)',c)} = ${fmt(ans)} (g).`,chk:()=>Math.abs(m0*Math.pow(.5,T0*c/T0)-ans)<1e-9};
});

/* ----- Tự luận chương VI (a) ----- */
TL11b('tl11-6-eq',6,'TH','a',r=>{
  const a=r.pick([2,3,5]),p=r.pick([1,2,3]),x0=r.int(-2,4),k=r.int(1,3),q=k-p*x0,b=r.pick([2,3,5]),j=r.int(1,3),m=r.pick([1,2]),y0=r.int(1,8),n=b**j-m*y0;
  const ex=`${p===1?'':p}${I('x')}${q===0?'':q>0?' + '+q:' '+MINUS+' '+(-q)}`,ey=`${m===1?'':m}${I('x')}${n===0?'':n>0?' + '+n:' '+MINUS+' '+(-n)}`;
  return{kind:'tl',title:'Phương trình mũ và phương trình lôgarit',parts:[
    {pts:.5,html:`Giải phương trình ${pw(a,ex)} = ${a**k}.`},
    {pts:.5,html:`Giải phương trình ${lg(b,`(${ey})`)} = ${j}.`}],
    sol:[ptxt([[`${a**k} = ${a}${sup(k)} nên ${pw(a,ex)} = ${a}${sup(k)}.`,.25],[`⟺ ${ex} = ${k} ⟺ ${I('x')} = ${sg(x0)}.`,.25]]),
      ptxt([[`Điều kiện ${ey} > 0. Phương trình ⟺ ${ey} = ${b}${sup(j)} = ${b**j}.`,.25],[`⟺ ${I('x')} = ${sg(y0)} (thỏa mãn điều kiện).`,.25]])],
    chk:()=>p*x0+q===k&&m*y0+n===b**j&&m*y0+n>0};
});
TL11b('tl11-6-ineq',6,'TH','a',r=>{
  const a=r.pick([2,3,5]),dec=r.chance(.5),p=r.int(-3,3),k=r.int(1,3),op=r.pick(['>','≥','<','≤']),baseH=dec?`(${fr(1,a)})`:String(a),rhs=dec?fr(1,a**k):String(a**k);
  const flip={'>':'<','≥':'≤','<':'>','≤':'≥'},opx=dec?flip[op]:op,bound=k-p,ex=`${I('x')}${p===0?'':p>0?' + '+p:' '+MINUS+' '+(-p)}`;
  const mk=(o,b)=>{const up=o==='>'||o==='≥',cl=o==='≥'||o==='≤';return up?ivl(sg(b),PINF,cl?'[':'(',')'):ivl(NINF,sg(b),'(',cl?']':')')};
  const q=r.int(-3,3),c=r.int(1,3),ansB=Q(q*2**c+1,2**c);
  return{kind:'tl',title:'Bất phương trình mũ và bất phương trình lôgarit',parts:[
    {pts:.5,html:`Giải bất phương trình ${pw(baseH,ex)} ${op} ${rhs}.`},
    {pts:.5,html:`Giải bất phương trình ${lg('0,5',`(${I('x')} ${q<0?'+':MINUS} ${Math.abs(q)})`)} > ${c}.`}],
    sol:[ptxt([[`${rhs} = ${pw(baseH,k)}; cơ số ${dec?'thuộc (0; 1) nên đổi chiều bất đẳng thức':'lớn hơn 1 nên giữ nguyên chiều'}.`,.25],[`${ex} ${opx} ${k} ⟺ ${I('x')} ${opx} ${sg(bound)}. Tập nghiệm: ${mk(opx,bound)}.`,.25]]),
      ptxt([[`Điều kiện ${xlin(1,-q)} > 0. Cơ số 0,5 thuộc (0; 1) nên bất phương trình ⟺ ${xlin(1,-q)} < ${pw('0,5',c)} = ${fr(1,2**c)}.`,.25],[`Kết hợp điều kiện: ${sg(q)} < ${I('x')} < ${qh(ansB)}. Tập nghiệm: ${ivl(sg(q),qh(ansB))}.`,.25]])],
    chk:()=>{const t=bound+(opx==='>'||opx==='≥'?1:-1)*.5,L=Math.pow(dec?1/a:a,t+p),R=Math.pow(dec?1/a:a,k),ok1=op==='>'?L>R:op==='≥'?L>=R:op==='<'?L<R:L<=R;const t2=q+(qv(ansB)-q)/2,ok2=logv(.5,t2-q)>c;return ok1&&ok2&&logv(.5,qv(ansB)-q+1e-9)<c+1e-6}};
});
TL11b('tl11-6-sub',6,'VD','a',r=>{
  const a=r.pick([2,3]),[i0,j0]=r.shuffle([0,1,2,3]).slice(0,2),i=Math.min(i0,j0),j=Math.max(i0,j0),S=a**i+a**j,P=a**(i+j),x=I('x'),t=I('t');
  const poly=`${a}${sup('2'+x)} ${MINUS} ${S}·${a}${sup(x)} + ${P}`;
  return{kind:'tl',title:'Phương trình, bất phương trình mũ',parts:[
    {pts:.5,html:`Giải phương trình ${poly} = 0.`},
    {pts:.5,html:`Giải bất phương trình ${poly} ≤ 0.`}],
    sol:[ptxt([[`Đặt ${t} = ${a}${sup(x)} (${t} > 0): ${t}${sup(2)} ${MINUS} ${S}${t} + ${P} = 0 ⟺ ${t} = ${a**i} hoặc ${t} = ${a**j}.`,.25],[`${a}${sup(x)} = ${a**i} ⟺ ${x} = ${i}; ${a}${sup(x)} = ${a**j} ⟺ ${x} = ${j}. Vậy ${x} ∈ {${i}; ${j}}.`,.25]]),
      ptxt([[`Với ${t} = ${a}${sup(x)} > 0: ${t}${sup(2)} ${MINUS} ${S}${t} + ${P} ≤ 0 ⟺ ${a**i} ≤ ${t} ≤ ${a**j}.`,.25],[`⟺ ${a}${sup(i)} ≤ ${a}${sup(x)} ≤ ${a}${sup(j)} ⟺ ${i} ≤ ${x} ≤ ${j}. Tập nghiệm: [${i}; ${j}].`,.25]])],
    chk:()=>[i,j].every(z=>Math.abs(a**(2*z)-S*a**z+P)<1e-9)&&i<j};
});
TL11b('tl11-6-real',6,'VD','a',r=>{
  const A=r.pick([100,150,200,250,300]),rate=r.pick([6,7,8,9]),n=r.int(3,6),v=A*Math.pow(1+rate/100,n),ans=r2(v),f=r.pick([1.5,2,2.5,3]),x=Math.log(f)/Math.log(1+rate/100);
  if(Math.abs(x-Math.round(x))<.03)return T.tl['tl11-6-real'].gen(r);
  const nmin=Math.ceil(x);
  return{kind:'tl',title:'Bài toán lãi kép',parts:[
    {pts:.5,html:`Một người gửi ${A} triệu đồng vào ngân hàng với lãi suất ${rate}%/năm theo thể thức lãi kép. Tính số tiền (cả gốc lẫn lãi) người đó nhận được sau ${n} năm (làm tròn đến hàng phần trăm của triệu đồng).`},
    {pts:.5,html:`Hỏi sau ít nhất bao nhiêu năm thì số tiền của người đó vượt ${dnum(A*f,1)} triệu đồng?`}],
    sol:[ptxt([[`Số tiền sau ${n} năm là ${A}·(1 + ${rate/100})${sup(n)}.`,.25],[`≈ ${fmt(ans)} (triệu đồng).`,.25]]),
      ptxt([[`Cần ${A}·${pw(dnum(1+rate/100),I('n'))} > ${dnum(A*f,1)} ⟺ ${pw(dnum(1+rate/100),I('n'))} > ${dnum(f,1)}.`,.25],[`⟺ ${I('n')} > ${lg(dnum(1+rate/100),dnum(f,1))} ≈ ${dnum(x)}, nên số năm nguyên nhỏ nhất là ${nmin}.`,.25]])],
    chk:()=>Math.abs(v-ans)<.0051&&A*Math.pow(1+rate/100,nmin)>A*f&&A*Math.pow(1+rate/100,nmin-1)<=A*f};
});
