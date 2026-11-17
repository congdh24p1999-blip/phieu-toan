
/* ================================================================
   LỚP 11 – Chương V: Giới hạn. Hàm số liên tục
   ================================================================ */
const LIMN=`${lim(I('n'),PINF)}`;
const LIMX=a=>lim(I('x'),a);
const xlin=(p,q,v='x')=>{if(p===0)return q<0?MINUS+(-q):String(q);const a=p===1?'':p===-1?MINUS:sg(p);return `${a}${I(v)}${q===0?'':q>0?' + '+q:' '+MINUS+' '+(-q)}`};
const xquad=(a,b,c,v='x')=>{let s=(a===1?'':a===-1?MINUS:sg(a))+I(v)+sup(2);if(b)s+=(b>0?' + ':' '+MINUS+' ')+(Math.abs(b)===1?'':Math.abs(b))+I(v);if(c)s+=(c>0?' + ':' '+MINUS+' ')+Math.abs(c);return s};
N11('k5-seq-rat',5,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-5,5),c=r.int(1,5),d=r.nz(-5,5),L=Q(a,c);
  return mkF(r,{stem:`${LIMN} ${fr(xlin(a,b,'n'),xlin(c,d,'n'))} bằng`,correct:L,cands:[Q(b,d),Q(a+b,c+d),Q(0),Q(c,a),Q(a)],
    sol:`Chia cả tử và mẫu cho n: ${LIMN} ${fr(`${sg(a)} + ${fr(sg(b),I('n'))}`,`${c} + ${fr(sg(d),I('n'))}`)} = ${qh(L)}.`,chk:()=>Math.abs((a*1e7+b)/(c*1e7+d)-qv(L))<1e-5});
});
N11('k5-seq-deg',5,'TH',r=>{
  const p=r.int(1,3),q=r.pick([p,p,p+1]),a=r.nz(-5,5),b=r.int(1,4),c=r.nz(-4,4),dd=r.nz(-4,4);
  const tH=`${a===1?'':a===-1?MINUS:sg(a)}${I('n')}${p>1?sup(p):''} ${c<0?MINUS:'+'} ${Math.abs(c)}`,mH=`${b===1?'':b}${I('n')}${q>1?sup(q):''} ${dd<0?MINUS:'+'} ${Math.abs(dd)}`;
  const L=p===q?Q(a,b):Q(0);
  return mkF(r,{stem:`Giá trị của ${LIMN} ${fr(tH,mH)} bằng`,correct:L,cands:[Q(a,b),Q(0),Q(c,dd),Q(a),Q(b,a)],
    sol:p===q?`Chia cả tử và mẫu cho ${I('n')}${p>1?sup(p):''}: giới hạn bằng ${fr(sg(a),b)} = ${qh(L)}.`:`Bậc của tử nhỏ hơn bậc của mẫu; chia cả tử và mẫu cho ${I('n')}${sup(q)} được giới hạn bằng 0.`,
    chk:()=>{const N=1e6;return Math.abs((a*N**p+c)/(b*N**q+dd)-qv(L))<1e-4}});
});
N11('k5-qn',5,'NB',r=>{
  const ok=r.pick([[fr(1,3),1/3],[fr(2,3),2/3],[`(${MINUS}${fr(1,2)})`,-.5],['(0,9)',.9],[fr(3,4),.75],[`(${MINUS}${fr(3,5)})`,-.6]]);
  const bad=r.shuffle([[fr(4,3),4/3],[`(${MINUS}${fr(5,3)})`,-5/3],['(1,01)',1.01],[fr(3,2),1.5],[`${rt(2)}`,SQ2],[fr('π',3),Math.PI/3]]).slice(0,3);
  const H=z=>`${U(I('n'))} = ${z[0].startsWith('(')||z[0].startsWith('<span class="rt')?z[0]:'('+z[0]+')'}${sup(I('n'))}`;
  return mkTxt(r,{stem:'Dãy số nào sau đây có giới hạn bằng 0?',correct:H(ok),wrongs:bad.map(H),
    sol:`${LIMN} q${sup(I('n'))} = 0 khi |q| < 1. Chỉ có dãy với q = ${ok[0]} thỏa mãn.`,chk:()=>Math.abs(ok[1])<1&&bad.every(z=>Math.abs(z[1])>1)});
});
N11('k5-geo',5,'TH',r=>{
  const u1=r.int(1,6),q=r.pick([Q(1,2),Q(1,3),Q(-1,2),Q(2,3),Q(-1,3),Q(1,4)]),S=qdiv(Q(u1),qsub(Q(1),q));
  const t=[Q(u1),qmul(Q(u1),q),qmul(qmul(Q(u1),q),q)];
  return mkF(r,{stem:`Tổng của cấp số nhân lùi vô hạn ${t.map(qh).join(' + ').replace(/\+ −/g,'− ')} + … bằng`,correct:S,cands:[qdiv(Q(u1),qadd(Q(1),q)),Q(u1),qmul(Q(u1),Q(2)),qdiv(qmul(Q(u1),q),qsub(Q(1),q))],
    sol:`Cấp số nhân lùi vô hạn có ${U(1)} = ${u1}, q = ${qh(q)} nên S = ${fr(U(1),'1 − q')} = ${qh(S)}.`,chk:()=>{let s=0,x=u1;for(let i=0;i<200;i++){s+=x;x*=qv(q)}return Math.abs(s-qv(S))<1e-9}});
});
N11('k5-x-poly',5,'NB',r=>{
  const a=r.nz(-3,3),b=r.int(-5,5),c=r.int(-6,6),x0=r.nz(-3,3),v=a*x0*x0+b*x0+c;
  return mkNum(r,{stem:`${LIMX(sg(x0))} (${xquad(a,b,c)}) bằng`,correct:v,ok:()=>true,cands:[a*x0*x0-b*x0+c,c,v+2*a,-v,a+b+c],sol:`Hàm đa thức liên tục nên giới hạn bằng giá trị tại x = ${sg(x0)}: ${sg(v)}.`});
});
N11('k5-x-00',5,'TH',r=>{
  const a=r.nz(-4,5),p=r.int(-5,5);/* (x−a)(x−p)/(x−a) */
  const b=-(a+p),c=a*p,v=a-p;
  return mkNum(r,{stem:`${LIMX(sg(a))} ${fr(xquad(1,b,c),xlin(1,-a))} bằng`,correct:v,ok:()=>true,cands:[a+p,0,p-a,2*a,c],
    sol:`${xquad(1,b,c)} = (x ${-a<0?'−':'+'} ${Math.abs(a)})(x ${-p<0?'−':'+'} ${Math.abs(p)}) nên giới hạn bằng ${LIMX(sg(a))} (x ${-p<0?'−':'+'} ${Math.abs(p)}) = ${sg(v)}.`.replace(/ \+ 0\)/g,')'),
    chk:()=>{const x=a+1e-7;return Math.abs((x*x+b*x+c)/(x-a)-v)<1e-5}});
});
N11('k5-x-inf',5,'TH',r=>{
  const a=r.nz(-6,6),b=r.nz(-5,5),c=r.int(1,5),d=r.nz(-5,5),sgn=r.pick([PINF,NINF]),L=Q(a,c);
  return mkF(r,{stem:`${LIMX(sgn)} ${fr(xlin(a,b),xlin(c,d))} bằng`,correct:L,cands:[Q(b,d),Q(0),Q(-a,c),Q(c,a)],
    sol:`Chia cả tử và mẫu cho x: giới hạn bằng ${fr(sg(a),c)} = ${qh(L)}.`});
});
N11('k5-one',5,'TH',r=>{
  const a=r.int(-3,4),b=r.nz(-3,3),c=r.int(-5,5);if(b*a+c===0)return T.nlc['k5-one'].gen(r);
  const side=r.pick(['+',MINUS]),num=b*a+c,sgn=(num>0?1:-1)*(side==='+'?1:-1);
  return mkTxt(r,{stem:`${lim(I('x'),sg(a)+sup(side))} ${fr(xlin(b,c),xlin(1,-a))} bằng`,correct:sgn>0?PINF:NINF,wrongs:[sgn>0?NINF:PINF,'0',sg(b)],
    sol:`Khi x → ${sg(a)}${sup(side)}: tử số → ${sg(num)} ${num>0?'> 0':'< 0'}, mẫu số ${xlin(1,-a)} → 0 và ${side==='+'?'dương':'âm'}. Vậy giới hạn bằng ${sgn>0?PINF:NINF}.`});
});
N11('k5-contfn',5,'NB',r=>{
  const T1=[`${I('y')} = ${xquad(1,-3,2)}`,`${I('y')} = sin ${I('x')}`,`${I('y')} = ${I('x')}${sup(3)} ${MINUS} 2${I('x')}`,`${I('y')} = cos ${I('x')} + 1`,`${I('y')} = ${fr(1,I('x')+sup(2)+' + 1')}`];
  const F1=[`${I('y')} = tan ${I('x')}`,`${I('y')} = ${fr(1,I('x'))}`,`${I('y')} = ${fr(I('x')+' + 1',I('x')+' − 2')}`,`${I('y')} = ${rt(I('x'))}`,`${I('y')} = cot ${I('x')}`,`${I('y')} = ${fr(1,I('x')+sup(2)+' − 4')}`];
  const ok=r.pick(T1);
  return mkTxt(r,{stem:'Hàm số nào sau đây liên tục trên ℝ?',correct:ok,wrongs:r.shuffle(F1).slice(0,3),sol:`Hàm đa thức, hàm sin, cos và phân thức có mẫu luôn khác 0 liên tục trên ℝ. Các hàm còn lại không xác định tại một số điểm.`});
});
N11('k5-cont',5,'TH',r=>{
  const a=r.nz(-4,4),t=r.int(0,1);
  if(t===0){const v=2*a;
    return mkNum(r,{stem:`Cho hàm số ${I('f')}(${I('x')}) = ${cases(`${fr(I('x')+sup(2)+' − '+a*a,xlin(1,-a))} khi ${I('x')} ≠ ${sg(a)}`,`${I('m')} khi ${I('x')} = ${sg(a)}`)}. Giá trị của ${I('m')} để hàm số liên tục tại ${I('x')} = ${sg(a)} là`,correct:v,ok:()=>true,cands:[a,0,-v,a*a],
      sol:`Với x ≠ ${sg(a)}: f(x) = ${xlin(1,a)}. Do đó ${LIMX(sg(a))} f(x) = ${sg(v)}. Hàm số liên tục tại x = ${sg(a)} ⟺ m = f(${sg(a)}) = ${sg(v)}.`,chk:()=>{const x=a+1e-7;return Math.abs((x*x-a*a)/(x-a)-v)<1e-5}});
  }
  const p=r.nz(-3,3),q=r.int(-4,4),c=r.nz(-3,3),x0=r.int(-2,3),v=(p-c)*x0+q;
  return mkNum(r,{stem:`Cho hàm số ${I('f')}(${I('x')}) = ${cases(`${xlin(p,q)} khi ${I('x')} ≥ ${sg(x0)}`,`${xlin(c,0)} + ${I('m')} khi ${I('x')} < ${sg(x0)}`)}. Giá trị của ${I('m')} để hàm số liên tục trên ℝ là`,correct:v,ok:()=>true,cands:[p*x0+q,-v,v+c,q],
    sol:`Hàm số liên tục tại mọi x ≠ ${sg(x0)}. Liên tục tại x = ${sg(x0)} ⟺ ${sg(c)}·(${sg(x0)}) + m = ${sg(p)}·(${sg(x0)}) ${PL(q)} ⟺ m = ${sg(v)}.`,chk:()=>c*x0+v===p*x0+q});
});

/* ----- Đúng/sai chương V ----- */
DS11('ds5-piece',5,'TH',r=>{
  const a=r.nz(-4,4),p=r.int(-4,4),b=-(a+p),c=a*p,v=a-p,m=r.chance(.5)?v:v+r.nz(-2,2),x1=a+r.nz(-2,2),fx1=x1-p;
  const fH=`${I('f')}(${I('x')}) = ${cases(`${fr(xquad(1,b,c),xlin(1,-a))} khi ${I('x')} ≠ ${sg(a)}`,`${sg(m)} khi ${I('x')} = ${sg(a)}`)}`;
  const cont=m===v;
  return mkDS(r,{stem:`Cho hàm số ${fH}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('f')}(${sg(x1)}) = ${sg(fx1)}`,f:`${I('f')}(${sg(x1)}) = ${sg(fx1+r.nz(-2,2))}`,why:`Với x ≠ ${sg(a)}, f(x) = ${xlin(1,-p)}; f(${sg(x1)}) = ${sg(fx1)}.`},
    {t:`${LIMX(sg(a))} ${I('f')}(${I('x')}) = ${sg(v)}`,f:`${LIMX(sg(a))} ${I('f')}(${I('x')}) = ${sg(a+p===v?v+1:a+p)}`,why:`${LIMX(sg(a))} f(x) = ${LIMX(sg(a))} (${xlin(1,-p)}) = ${sg(v)}.`},
    {t:cont?`Hàm số liên tục tại ${I('x')} = ${sg(a)}`:`Hàm số không liên tục tại ${I('x')} = ${sg(a)}`,f:cont?`Hàm số không liên tục tại ${I('x')} = ${sg(a)}`:`Hàm số liên tục tại ${I('x')} = ${sg(a)}`,why:`f(${sg(a)}) = ${sg(m)} ${cont?'=':'≠'} ${sg(v)} = ${LIMX(sg(a))} f(x).`},
    {t:`Hàm số liên tục trên khoảng (${sg(a)}; +∞)`,f:`Hàm số không liên tục trên khoảng (${sg(a)}; +∞)`,why:`Trên (${sg(a)}; +∞), f(x) = ${xlin(1,-p)} là hàm đa thức nên liên tục.`}
  ],chk:()=>{const x=a+1e-7;return Math.abs((x*x+b*x+c)/(x-a)-v)<1e-5&&x1!==a}});
});
DS11('ds5-seq',5,'VD',r=>{
  const a=r.nz(-4,5),b=r.nz(-5,5),c=r.int(1,3),d=r.int(1,4);if(a*d-b*c===0)return T.ds['ds5-seq'].gen(r);
  const u=n=>(a*n+b)/(c*n+d),L=Q(a,c),inc=a*d-b*c>0,u1=Q(a+b,c+d);
  return mkDS(r,{stem:`Cho dãy số ${UN} với ${U(I('n'))} = ${fr(xlin(a,b,'n'),xlin(c,d,'n'))}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${U(1)} = ${qh(u1)}`,f:`${U(1)} = ${qh(qadd(u1,Q(1)))}`,why:`${U(1)} = ${fr(sg(a+b),c+d)} = ${qh(u1)}.`},
    {t:`${LIMN} ${U(I('n'))} = ${qh(L)}`,f:`${LIMN} ${U(I('n'))} = ${qh(qeq(Q(b,d),L)?qadd(L,Q(1)):Q(b,d))}`,why:`Chia tử và mẫu cho n: giới hạn bằng ${fr(sg(a),c)}.`},
    {t:`${UN} là dãy số ${inc?'tăng':'giảm'}`,f:`${UN} là dãy số ${inc?'giảm':'tăng'}`,why:`${U(I('n')+' + 1')} − ${U(I('n'))} = ${fr(sg(a*d-b*c),'(cn + c + d)(cn + d)').replace('cn + c + d',xlin(c,c+d,'n')).replace('cn + d',xlin(c,d,'n'))} ${inc?'> 0':'< 0'}.`},
    {t:`${LIMN} (${U(I('n'))} ${pm(qh(L))}) = 0`,f:`${LIMN} (${U(I('n'))} ${pm(qh(L))}) = ${qh(L[0]===0?Q(1):L)}`,why:`Vì ${LIMN} ${U(I('n'))} = ${qh(L)}.`}
  ],chk:()=>Math.abs(u(1)-qv(u1))<1e-12&&Math.abs(u(1e8)-qv(L))<1e-6&&(inc?incr(u):decr(u))});
});

/* ----- Trả lời ngắn chương V ----- */
TLN11('t5-rep',5,'VD',r=>{
  for(;;){const ab=r.int(10,98);if(ab%11===0)continue;const q=Q(ab,99);
    return{kind:'tln',stem:`Số thập phân vô hạn tuần hoàn 0,(${String(ab).padStart(2,'0')}) = 0,${String(ab).repeat(3)}… được biểu diễn dưới dạng phân số tối giản ${fr(I('a'),I('b'))} (${I('a')}, ${I('b')} là số nguyên dương). Tính ${I('a')} + ${I('b')}.`,ans:q[0]+q[1],unit:'',
      sol:`0,(${ab}) = ${fr(ab,100)} + ${fr(ab,100+sup(2))} + … là tổng cấp số nhân lùi vô hạn với ${U(1)} = ${fr(ab,100)}, q = ${fr(1,100)}, nên bằng ${fr(ab,99)} = ${fr(q[0],q[1])}. Vậy a + b = ${q[0]+q[1]}.`};}
});
TLN11('t5-param',5,'TH',r=>{
  const c=r.int(1,4),L=r.nz(-5,5),a=L*c,b=r.nz(-5,5),d=r.nz(-5,5);
  return{kind:'tln',stem:`Tìm số thực ${I('a')} để ${LIMN} ${fr(`${I('a')}${I('n')} ${b<0?MINUS:'+'} ${Math.abs(b)}`,xlin(c,d,'n'))} = ${sg(L)}.`,ans:a,unit:'',
    sol:`${LIMN} ${fr(`an ${b<0?'−':'+'} ${Math.abs(b)}`,xlin(c,d,'n'))} = ${fr('a',c)} = ${sg(L)} ⟹ a = ${sg(a)}.`};
});
TLN11('t5-ball',5,'VD',r=>{
  const h=r.pick([6,8,9,10,12,15]),q=r.pick([Q(1,2),Q(2,3),Q(1,3),Q(3,4)]),tot=h+2*h*qv(q)/(1-qv(q)),ans=r2(tot);
  return{kind:'tln',stem:`Từ độ cao ${h} m, người ta thả một quả bóng rơi thẳng đứng. Mỗi lần chạm đất, quả bóng lại nảy lên độ cao bằng ${fr(q[0],q[1])} độ cao lần rơi ngay trước đó. Tính tổng quãng đường quả bóng di chuyển cho đến khi dừng hẳn (đơn vị: mét; làm tròn đến hàng phần trăm).`,ans,unit:'',
    sol:`Quãng đường = ${h} + 2·(${h}·${qh(q)} + ${h}·(${qh(q)})² + …) = ${h} + 2·${fr(`${h}·${qh(q)}`,`1 − ${qh(q)}`)} ≈ ${fmt(ans)} (m).`,chk:()=>{let s=h,x=h*qv(q);for(let i=0;i<400;i++){s+=2*x;x*=qv(q)}return Math.abs(s-ans)<0.0051}};
});
TLN11('t5-lim00',5,'TH',r=>{
  const a=r.int(1,4),p=r.int(1,6);/* (x² − a²)/(√... ) dạng (x²+bx+c)/(x²−a²) */
  const b=-(a+p),c=a*p,v=(a-p)/(2*a),ans=r2(v);
  return{kind:'tln',stem:`Tính ${LIMX(a)} ${fr(xquad(1,b,c),I('x')+sup(2)+' − '+a*a)} (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',
    sol:`${fr(`(x − ${a})(x − ${p})`,`(x − ${a})(x + ${a})`)} = ${fr(`x − ${p}`,`x + ${a}`)} → ${fr(sg(a-p),2*a)} ≈ ${fmt(ans)}.`,chk:()=>{const x=a+1e-7;return Math.abs((x*x+b*x+c)/(x*x-a*a)-ans)<0.0051}};
});

/* ----- Tự luận chương V ----- */
TL11('tl5-lim',5,'VD','b',r=>{
  const a=r.nz(-5,5),b=r.int(-4,4),c=r.nz(-5,5),d=r.int(1,4),e=r.int(-4,4),f=r.nz(-5,5),L1=Q(a,d);
  const x0=r.nz(-3,4),p=r.int(-5,5),qq=r.int(1,3),B=-(x0+p),C=x0*p,L2=Q(x0-p,qq*x0+(-qq*x0+1)===0?1:1);
  /* phần b: lim x→x0 (x² + Bx + C)/(x − x0) = x0 − p */
  const v2=x0-p;
  return{kind:'tl',title:'Giới hạn',parts:[
    {pts:.5,html:`Tính ${LIMN} ${fr(xquad(a,b,c,'n'),xquad(d,e,f,'n'))}.`},
    {pts:.5,html:`Tính ${LIMX(sg(x0))} ${fr(xquad(1,B,C),xlin(1,-x0))}.`}],
    sol:[ptxt([[`Chia cả tử và mẫu cho n²: ${LIMN} ${fr(`${sg(a)} + ${fr(sg(b),'n')} + ${fr(sg(c),'n²')}`,`${d} + ${fr(sg(e),'n')} + ${fr(sg(f),'n²')}`)}`,.25],[`= ${fr(sg(a),d)} = ${qh(L1)}.`,.25]]),
      ptxt([[`${xquad(1,B,C)} = (${xlin(1,-x0)})(${xlin(1,-p)}), nên ${fr(xquad(1,B,C),xlin(1,-x0))} = ${xlin(1,-p)} với x ≠ ${sg(x0)}.`,.25],[`Vậy giới hạn bằng ${sg(x0)} ${p<0?'+':'−'} ${Math.abs(p)} = ${sg(v2)}.`,.25]])],
    chk:()=>{const N=1e6,x=x0+1e-7;return Math.abs((a*N*N+b*N+c)/(d*N*N+e*N+f)-qv(L1))<1e-4&&Math.abs((x*x+B*x+C)/(x-x0)-v2)<1e-5}};
});
TL11('tl5-cont',5,'VD','b',r=>{
  const a=r.nz(-4,4),p=r.int(-4,4),B=-(a+p),C=a*p,v=a-p,k=r.nz(-3,3),m=v-k*a; /* f(a) = k·a + m */
  return{kind:'tl',title:'Hàm số liên tục',parts:[
    {pts:.5,html:`Cho hàm số ${I('f')}(${I('x')}) = ${cases(`${fr(xquad(1,B,C),xlin(1,-a))} khi ${I('x')} ≠ ${sg(a)}`,`${xlin(k,0)} + ${I('m')} khi ${I('x')} = ${sg(a)}`)}.<br>Tính ${LIMX(sg(a))} ${I('f')}(${I('x')}).`},
    {pts:.5,html:`Tìm ${I('m')} để hàm số liên tục tại ${I('x')} = ${sg(a)}.`}],
    sol:[ptxt([[`Với x ≠ ${sg(a)}: f(x) = ${fr(`(${xlin(1,-a)})(${xlin(1,-p)})`,xlin(1,-a))} = ${xlin(1,-p)}.`,.25],[`${LIMX(sg(a))} f(x) = ${sg(a)} ${p<0?'+':'−'} ${Math.abs(p)} = ${sg(v)}.`,.25]]),
      ptxt([[`f(${sg(a)}) = ${sg(k)}·(${sg(a)}) + m = ${sg(k*a)} + m. Hàm số liên tục tại x = ${sg(a)} ⟺ ${sg(k*a)} + m = ${sg(v)}.`,.25],[`⟺ m = ${sg(m)}.`,.25]])],
    chk:()=>{const x=a+1e-7;return Math.abs((x*x+B*x+C)/(x-a)-v)<1e-5&&k*a+m===v}};
});
