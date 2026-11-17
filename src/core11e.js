/* ================================================================
   LỚP 11 – Học kì II – Chương VI: Hàm số mũ và hàm số lôgarit
   Mọi đáp án được kiểm tra lại bằng tính số (Math.pow, Math.log).
   Thẻ sec: lt (lũy thừa), lg (lôgarit), hs (hàm số), pt (phương trình, bất phương trình).
   ================================================================ */
const N11b=(id,ch,lv,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:11,hk:2,sec});
const DS11b=(id,ch,lv,gen,sec)=>reg('ds',id,ch,lv,gen,{g:11,hk:2,sec});
const TLN11b=(id,ch,lv,gen,sec)=>reg('tln',id,ch,lv,gen,{g:11,hk:2,sec});
const TL11b=(id,ch,lv,role,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:11,hk:2,sec});
const lg=(a,x)=>`log${sub(a)} ${x}`;
const pw=(b,e)=>`${b}${sup(e)}`;
const ivl=(l,rr,lo='(',hi=')')=>`${lo}${l}; ${rr}${hi}`;
const logv=(a,x)=>Math.log(x)/Math.log(a);
const qs=q=>q[1]===1?sg(q[0]):`${q[0]<0?MINUS:''}${Math.abs(q[0])}/${q[1]}`;
const E6=(a,e)=>e===1?a:`${a}${sup(e)}`;
const dnum=(v,d=2)=>String(Math.round(v*10**d)/10**d).replace('.',',');

N11b('m11-6-pow',6,'NB',r=>{
  const c=r.pick([2,3,4,5]),q=r.pick([2,3,4]),p=r.pick([1,2,3]),base=c**q;
  if(gcd(p,q)!==1||base>130)return T.nlc['m11-6-pow'].gen(r);
  const neg=r.chance(.4),val=neg?Q(1,c**p):Q(c**p);
  return mkF(r,{stem:`Giá trị của ${pw(base,(neg?MINUS:'')+p+'/'+q)} bằng`,correct:val,cands:[neg?Q(c**p):Q(1,c**p),Q(c*p),Q(c**(q-p>0?q-p:1)),Q(base*p,q)],
    sol:`${base} = ${c}${sup(q)} nên ${pw(base,(neg?MINUS:'')+p+'/'+q)} = ${pw(`(${pw(c,q)})`,(neg?MINUS:'')+p+'/'+q)} = ${pw(c,(neg?MINUS:'')+p)} = ${qh(val)}.`,
    chk:()=>Math.abs(Math.pow(base,(neg?-1:1)*p/q)-qv(val))<1e-9});
});
N11b('m11-6-simpl',6,'TH',r=>{
  const a=I('a'),k=r.pick([2,3,5]),p=r.int(1,4),q=r.int(1,4),form=r.int(0,2),s=rt(k);
  let stem,ans,sol,val;
  if(form===0){stem=`Với ${a} > 0, biểu thức ${pw(a,`${s} + ${p}`)} · ${pw(a,`${q} ${MINUS} ${s}`)} bằng`;ans=p+q;val=x=>Math.pow(x,Math.sqrt(k)+p)*Math.pow(x,q-Math.sqrt(k));
    sol=`${pw(a,`${s} + ${p}`)} · ${pw(a,`${q} ${MINUS} ${s}`)} = ${pw(a,`(${s} + ${p}) + (${q} ${MINUS} ${s})`)} = ${pw(a,ans)}.`}
  else if(form===1){stem=`Với ${a} > 0, biểu thức ${pw(a,`${s} + ${p}`)} : ${pw(a,`${s} ${MINUS} ${q}`)} bằng`;ans=p+q;val=x=>Math.pow(x,Math.sqrt(k)+p)/Math.pow(x,Math.sqrt(k)-q);
    sol=`${pw(a,`${s} + ${p}`)} : ${pw(a,`${s} ${MINUS} ${q}`)} = ${pw(a,`(${s} + ${p}) ${MINUS} (${s} ${MINUS} ${q})`)} = ${pw(a,ans)}.`}
  else{stem=`Với ${a} > 0, biểu thức ${pw(`(${pw(a,s)})`,s)} · ${pw(a,p)} bằng`;ans=k+p;val=x=>Math.pow(Math.pow(x,Math.sqrt(k)),Math.sqrt(k))*Math.pow(x,p);
    sol=`${pw(`(${pw(a,s)})`,s)} = ${pw(a,`${s} · ${s}`)} = ${pw(a,k)} nên biểu thức bằng ${pw(a,k)} · ${pw(a,p)} = ${pw(a,ans)}.`}
  const ws=[ans+1,ans-1,ans+2,form===2?k*p:p*q,Math.abs(p-q)+1,ans+3].filter(n=>n>=1&&n!==ans);
  return mkTxt(r,{stem,correct:E6(a,ans),wrongs:ws.map(n=>E6(a,n)),sol,chk:()=>Math.abs(val(1.37)-Math.pow(1.37,ans))<1e-9});
});
N11b('m11-6-root',6,'TH',r=>{
  const EX=[Q(1,2),Q(1,3),Q(2,3),Q(1,4),Q(3,4),Q(1,6),Q(5,6),Q(3,2),Q(5,3),Q(4,3),Q(1,5)];
  const [e1,e2,e3]=r.shuffle(EX).slice(0,3),x=I('x'),form=r.int(0,1);
  const res=form===0?qadd(e1,e2):qsub(qadd(e1,e2),e3);
  if(res[0]<=0)return T.nlc['m11-6-root'].gen(r);
  const H=q=>q[0]===q[1]?x:pw(x,qs(q));
  const stem=form===0?`Với ${x} > 0, biểu thức ${pw(x,qs(e1))} · ${pw(x,qs(e2))} bằng`:`Với ${x} > 0, biểu thức ${pw(x,qs(e1))} · ${pw(x,qs(e2))} : ${pw(x,qs(e3))} bằng`;
  const wr=[qsub(e1,e2),qadd(qadd(e1,e2),e3),qsub(qsub(e1,e2),e3),qmul(e1,e2),qsub(e3,qadd(e1,e2)),qsub(qadd(e1,e3),e2),qadd(res,Q(1,2)),qadd(res,Q(1,3)),qadd(res,Q(1,6)),qsub(res,Q(1,6)),qadd(res,Q(1,1))].filter(q=>q[0]>0&&!qeq(q,res));
  return mkTxt(r,{stem,correct:H(res),wrongs:wr.map(H),
    sol:`Nhân hai lũy thừa cùng cơ số thì cộng số mũ, chia thì trừ số mũ: ${form===0?`${qs(e1)} + ${qs(e2)}`:`${qs(e1)} + ${qs(e2)} ${MINUS} ${qs(e3)}`} = ${qs(res)}.`,
    chk:()=>{const t=1.9,v=form===0?Math.pow(t,qv(e1))*Math.pow(t,qv(e2)):Math.pow(t,qv(e1))*Math.pow(t,qv(e2))/Math.pow(t,qv(e3));return Math.abs(v-Math.pow(t,qv(res)))<1e-9}});
});
N11b('m11-6-log-def',6,'NB',r=>{
  const a=r.pick([2,3,4,5,10]),k=r.int(-3,4),arg=k>=0?String(a**k):fr(1,a**(-k));
  if(a**Math.abs(k)>1000)return T.nlc['m11-6-log-def'].gen(r);
  return mkNum(r,{stem:`Giá trị của ${lg(a,arg)} bằng`,correct:k,ok:()=>true,cands:[-k,k+1,k-1,a*k,a**Math.abs(k)],
    sol:k===0?`${lg(a,1)} = 0 vì ${a}${sup(0)} = 1.`:`${arg} = ${a}${sup(k)} nên ${lg(a,arg)} = ${k}.`,chk:()=>Math.abs(logv(a,a**k)-k)<1e-9});
});
N11b('m11-6-log-rule',6,'TH',r=>{
  const a=I('a'),p=r.int(2,5),q=r.int(2,5),m=r.int(2,3),n=r.int(1,3),form=r.int(0,2);
  const hyp=`Cho ${lg(a,I('b'))} = ${p} và ${lg(a,I('c'))} = ${q} (${a}, ${I('b')}, ${I('c')} dương, ${a} ≠ 1).`;
  let stem,v,sol;
  if(form===0){v=m*p+n*q;stem=`${hyp} Giá trị của ${lg(a,`(${I('b')}${m>1?sup(m):''}${I('c')}${n>1?sup(n):''})`)} bằng`;sol=`${lg(a,`(${I('b')}${m>1?sup(m):''}${I('c')}${n>1?sup(n):''})`)} = ${m}·${lg(a,I('b'))} + ${n}·${lg(a,I('c'))} = ${m}·${p} + ${n}·${q} = ${v}.`}
  else if(form===1){v=m*p-n*q;stem=`${hyp} Giá trị của ${lg(a,fr(I('b')+(m>1?sup(m):''),I('c')+(n>1?sup(n):'')))} bằng`;sol=`${lg(a,fr(I('b')+(m>1?sup(m):''),I('c')+(n>1?sup(n):'')))} = ${m}·${lg(a,I('b'))} ${MINUS} ${n}·${lg(a,I('c'))} = ${m}·${p} ${MINUS} ${n}·${q} = ${sg(v)}.`}
  else{v=m+p+q;stem=`${hyp} Giá trị của ${lg(a,`(${a}${sup(m)}${I('bc')})`)} bằng`;sol=`${lg(a,`(${a}${sup(m)}${I('bc')})`)} = ${lg(a,a+sup(m))} + ${lg(a,I('b'))} + ${lg(a,I('c'))} = ${m} + ${p} + ${q} = ${v}.`}
  return mkNum(r,{stem,correct:v,ok:()=>true,cands:[m*p*n*q,p+q,m*p+n*q+1,v+m,v-1,m*(p+q)],sol});
});
const LOGADD=[[6,4,9,2],[6,2,18,2],[6,3,12,2],[6,8,27,3],[6,12,18,3],[10,4,25,2],[10,2,50,2],[10,5,20,2],[10,8,125,3],[10,40,25,3],[12,6,24,2],[12,8,18,2],[12,24,72,3],[15,3,75,2],[15,5,45,2],[15,9,25,2]];
N11b('m11-6-log-simpl',6,'TH',r=>{
  if(r.chance(.5)){
    const [a,x,y,k]=r.pick(LOGADD);
    return mkNum(r,{stem:`Giá trị của ${lg(a,x)} + ${lg(a,y)} bằng`,correct:k,ok:c=>c>=0,cands:[k+1,k-1,x+y-a,k*2],
      sol:`${lg(a,x)} + ${lg(a,y)} = ${lg(a,`(${x}·${y})`)} = ${lg(a,x*y)} = ${k} (vì ${x*y} = ${a}${sup(k)}).`,chk:()=>x*y===a**k});
  }
  const a=r.pick([2,3,5,6,10]),k=r.int(1,3),t=r.pick([2,3,5,7]),x=a**k*t;if(x>3000||t===a)return T.nlc['m11-6-log-simpl'].gen(r);
  return mkNum(r,{stem:`Giá trị của ${lg(a,x)} ${MINUS} ${lg(a,t)} bằng`,correct:k,ok:c=>c>=0,cands:[k+1,k-1,x-t,a*k],
    sol:`${lg(a,x)} ${MINUS} ${lg(a,t)} = ${lg(a,fr(x,t))} = ${lg(a,a**k)} = ${k}.`,chk:()=>Math.abs(logv(a,x)-logv(a,t)-k)<1e-9});
});
N11b('m11-6-domain1',6,'NB',r=>{
  const a=r.pick([2,3,5]),p=r.nz(-5,6),dir=r.pick([1,-1]),arg=dir>0?`${I('x')} ${p<0?'+':MINUS} ${Math.abs(p)}`:`${sg(p)} ${MINUS} ${I('x')}`,e=dir>0?p:p;
  const correct=dir>0?ivl(sg(p),PINF):ivl(NINF,sg(p));
  const wr=dir>0?[ivl(sg(p),PINF,'[',')'),ivl(NINF,sg(p)),ivl(NINF,sg(p),'(',']'),`ℝ \\ {${sg(p)}}`,ivl(sg(-p),PINF)]:[ivl(NINF,sg(p),'(',']'),ivl(sg(p),PINF),ivl(sg(p),PINF,'[',')'),`ℝ \\ {${sg(p)}}`,ivl(NINF,sg(-p))];
  return mkTxt(r,{stem:`Tập xác định của hàm số ${I('y')} = ${lg(a,`(${arg})`)} là`,correct,wrongs:wr,
    sol:`Hàm số xác định khi ${arg} > 0 ⟺ ${I('x')} ${dir>0?'>':'<'} ${sg(p)}. Vậy tập xác định là ${correct}.`});
});
N11b('m11-6-domain2',6,'TH',r=>{
  const a=r.pick([2,3,5]),p=r.int(1,5),correct=`${ivl(NINF,sg(-p))} ∪ ${ivl(sg(p),PINF)}`;
  return mkTxt(r,{stem:`Tập xác định của hàm số ${I('y')} = ${lg(a,`(${I('x')}${sup(2)} ${MINUS} ${p*p})`)} là`,correct,
    wrongs:[ivl(sg(-p),sg(p)),`ℝ \\ {${sg(-p)}; ${sg(p)}}`,`${ivl(NINF,sg(-p),'(',']')} ∪ ${ivl(sg(p),PINF,'[',')')}`,ivl(sg(p),PINF),ivl(sg(-p),sg(p),'[',']')],
    sol:`Hàm số xác định khi ${I('x')}${sup(2)} ${MINUS} ${p*p} > 0 ⟺ ${I('x')} < ${sg(-p)} hoặc ${I('x')} > ${sg(p)}.`});
});
N11b('m11-6-mono',6,'NB',r=>{
  const up=[[`2`,2],[`3`,3],[`5`,5],[rt(2),Math.SQRT2],['π',Math.PI],['e',Math.E]],dn=[[fr(1,2),.5],[fr(1,3),1/3],[fr(2,3),2/3],[fr(3,4),.75],[fr(1,'e'),1/Math.E],[fr(1,'π'),1/Math.PI]];
  const inc=r.chance(.5);
  if(r.chance(.5)){
    const ok=r.pick(inc?up:dn),bad=r.shuffle(inc?dn:up).slice(0,3),H=z=>`${I('y')} = ${pw(`(${z[0]})`,I('x'))}`;
    return mkTxt(r,{stem:`Hàm số nào sau đây ${inc?'đồng biến':'nghịch biến'} trên ℝ?`,correct:H(ok),wrongs:bad.map(H),
      sol:`Hàm số ${I('y')} = ${I('a')}${sup(I('x'))} ${inc?'đồng biến khi':'nghịch biến khi'} ${inc?'':'0 < '}${I('a')} ${inc?'> 1':'< 1'}. Chỉ có đáp án với cơ số ${ok[0]} thỏa mãn.`,chk:()=>(inc?ok[1]>1:ok[1]<1)&&bad.every(z=>inc?z[1]<1:z[1]>1)});
  }
  const U2=[[`2`,2],[`3`,3],[`5`,5],[`e`,Math.E],['π',Math.PI],['10',10]],D2=[['0,5',.5],['0,3',.3],['0,2',.2],['0,8',.8],[fr(1,'e'),1/Math.E],['0,1',.1]];
  const ok=r.pick(inc?U2:D2),bad=r.shuffle(inc?D2:U2).slice(0,3),H=z=>`${I('y')} = log${sub(z[0])} ${I('x')}`;
  return mkTxt(r,{stem:`Hàm số nào sau đây ${inc?'đồng biến':'nghịch biến'} trên khoảng (0; +∞)?`,correct:H(ok),wrongs:bad.map(H),
    sol:`Hàm số ${I('y')} = log${sub(I('a'))} ${I('x')} ${inc?'đồng biến khi':'nghịch biến khi'} ${inc?'':'0 < '}${I('a')} ${inc?'> 1':'< 1'}. Chỉ có đáp án với cơ số ${ok[0]} thỏa mãn.`,chk:()=>(inc?ok[1]>1:ok[1]<1)&&bad.every(z=>inc?z[1]<1:z[1]>1)});
});
N11b('m11-6-solve-exp',6,'TH',r=>{
  const a=r.pick([2,3,5]),m=r.pick([1,2,3,-1,-2]),n=r.int(-3,3),k=r.int(1,3),val=a**k,x=Q(k-n,m);
  const ex=`${m===1?'':m===-1?MINUS:m}${I('x')}${n===0?'':n>0?' + '+n:' '+MINUS+' '+(-n)}`;
  return mkF(r,{stem:`Nghiệm của phương trình ${pw(a,ex)} = ${val} là`,correct:x,cands:[Q(k+n,m),Q(k,m),Q(val-n,m),Q(n-k,m)],
    sol:`${val} = ${a}${sup(k)} nên ${pw(a,ex)} = ${a}${sup(k)} ⟺ ${ex} = ${k} ⟺ ${I('x')} = ${qh(x)}.`,chk:()=>Math.abs(Math.pow(a,m*qv(x)+n)-val)<1e-9});
});
N11b('m11-6-solve-log',6,'TH',r=>{
  const a=r.pick([2,3,5]),k=r.int(1,3),m=r.pick([1,2,3]),x0=r.int(-2,8),A=a**k,n=A-m*x0;
  if(x0===0)return T.nlc['m11-6-solve-log'].gen(r);
  const ex=`${m===1?'':m}${I('x')}${n===0?'':n>0?' + '+n:' '+MINUS+' '+(-n)}`;
  return mkNum(r,{stem:`Nghiệm của phương trình ${lg(a,`(${ex})`)} = ${k} là`,correct:x0,ok:()=>true,cands:[A-n,(A+n)/m,x0+1,(k-n)/m,x0-1],
    sol:`Điều kiện ${ex} > 0. ${lg(a,`(${ex})`)} = ${k} ⟺ ${ex} = ${a}${sup(k)} = ${A} ⟺ ${I('x')} = ${sg(x0)} (thỏa mãn điều kiện).`,chk:()=>m*x0+n===A&&m*x0+n>0});
});
N11b('m11-6-ineq',6,'TH',r=>{
  const a=r.pick([2,3,5]),dec=r.chance(.5),p=r.int(-3,3),k=r.int(1,3),op=r.pick(['>','≥','<','≤']);
  const baseH=dec?`(${fr(1,a)})`:String(a),rhs=dec?fr(1,a**k):String(a**k),ex=`${I('x')}${p===0?'':p>0?' + '+p:' '+MINUS+' '+(-p)}`;
  /* a>1: x+p op k ; a<1: đổi chiều */
  const flip={'>':'<','≥':'≤','<':'>','≤':'≥'},opx=dec?flip[op]:op,bound=k-p;
  const mk=(o,b)=>{const up=o==='>'||o==='≥',cl=o==='≥'||o==='≤';return up?ivl(sg(b),PINF,cl?'[':'(',')'):ivl(NINF,sg(b),'(',cl?']':')')};
  const correct=mk(opx,bound),wr=[mk(flip[opx],bound),mk(opx,k+p),mk(flip[opx],k+p),mk(opx==='>'?'≥':opx==='≥'?'>':opx==='<'?'≤':'<',bound),mk(opx,bound+1),mk(flip[opx],bound-1),mk(opx,bound-1)];
  return mkTxt(r,{stem:`Tập nghiệm của bất phương trình ${pw(baseH,ex)} ${op} ${rhs} là`,correct,wrongs:wr,
    sol:`${rhs} = ${pw(baseH,k)}. Vì cơ số ${dec?'nhỏ hơn 1 (0 < '+'1/'+a+' < 1) nên bất phương trình đổi chiều':'lớn hơn 1 nên bất phương trình giữ nguyên chiều'}: ${ex} ${opx} ${k} ⟺ ${I('x')} ${opx} ${sg(bound)}. Tập nghiệm là ${correct}.`,
    chk:()=>{const t=bound+(opx==='>'||opx==='≥'?1:-1)*0.5;const lhs=Math.pow(dec?1/a:a,t+p),R=Math.pow(dec?1/a:a,k);const ok=op==='>'?lhs>R:op==='≥'?lhs>=R:op==='<'?lhs<R:lhs<=R;return ok}});
});
N11b('m11-6-pass',6,'TH',r=>{
  if(r.chance(.5)){
    const a=r.pick([Q(2),Q(3),Q(1,2),Q(1,3),Q(4),Q(1,4)]),m=r.pick([2,3,-1,-2]),A=Math.pow(qv(a),m);
    const Y=Math.abs(A-Math.round(A))<1e-12?Q(Math.round(A)):Q(1,Math.round(1/A));if(Math.abs(qv(Y)-A)>1e-12)return T.nlc['m11-6-pass'].gen(r);
    return mkF(r,{stem:`Biết đồ thị hàm số ${I('y')} = ${pw(I('a'),I('x'))} (${I('a')} > 0, ${I('a')} ≠ 1) đi qua điểm ${I('M')}(${sg(m)}; ${qh(Y)}). Giá trị của ${I('a')} bằng`,correct:a,cands:[Q(a[1],a[0]),Q(a[0]+1,a[1]),Q(m),Y],
      sol:`${I('M')} thuộc đồ thị nên ${pw(I('a'),sg(m))} = ${qh(Y)}, suy ra ${I('a')} = ${qh(a)}.`,chk:()=>Math.abs(Math.pow(qv(a),m)-qv(Y))<1e-9});
  }
  const a=r.pick([2,3,5]),k=r.pick([-2,-1,2,3]),x=k>=0?Q(a**k):Q(1,a**(-k));
  return mkNum(r,{stem:`Biết đồ thị hàm số ${I('y')} = ${lg(I('a'),I('x'))} (${I('a')} > 0, ${I('a')} ≠ 1) đi qua điểm ${I('N')}(${qh(x)}; ${sg(k)}). Giá trị của ${I('a')} bằng`,correct:a,cands:[a+1,a-1,a*2,k,a**2],
    sol:`${I('N')} thuộc đồ thị nên ${lg(I('a'),qh(x))} = ${sg(k)} ⟺ ${I('a')}${sup(sg(k))} = ${qh(x)} ⟺ ${I('a')} = ${a}.`,chk:()=>Math.abs(Math.pow(a,k)-qv(x))<1e-9});
});
N11b('m11-6-compare',6,'TH',r=>{
  const TOK=[[rt(2),Math.SQRT2],[rt(3),Math.sqrt(3)],['π',Math.PI],['3',3],[fr(3,2),1.5],['2',2],[fr(5,2),2.5],[rt(5),Math.sqrt(5)]];
  const BS=[[ '2',2],['3',3],['5',5],[fr(1,2),.5],[fr(1,3),1/3],[fr(2,3),2/3]];
  for(let t=0;t<300;t++){
    const rows=[];
    for(let i=0;i<4;i++){const b=r.pick(BS),[x,y]=r.shuffle(TOK).slice(0,2);const op=r.pick(['<','>']);const truth=op==='<'?Math.pow(b[1],x[1])<Math.pow(b[1],y[1]):Math.pow(b[1],x[1])>Math.pow(b[1],y[1]);rows.push({b,x,y,op,truth,h:`${pw(`(${b[0]})`,x[0])} ${op} ${pw(`(${b[0]})`,y[0])}`})}
    if(rows.filter(z=>z.truth).length!==1||new Set(rows.map(z=>z.h)).size<4)continue;
    const ok=rows.find(z=>z.truth);
    return mkTxt(r,{stem:'Khẳng định nào sau đây đúng?',correct:ok.h,wrongs:rows.filter(z=>!z.truth).map(z=>z.h),
      sol:`Cơ số ${ok.b[0]} ${ok.b[1]>1?'lớn hơn 1 nên hàm số mũ đồng biến':'thuộc khoảng (0; 1) nên hàm số mũ nghịch biến'} trên ℝ: so sánh hai số mũ ${ok.x[0]} và ${ok.y[0]} rồi ${ok.b[1]>1?'giữ nguyên':'đổi'} chiều bất đẳng thức. Khẳng định đúng là ${ok.h}; các khẳng định còn lại sai.`,
      chk:()=>rows.filter(z=>z.truth).length===1});
  }
  throw new Error('m11-6-compare');
});
