/* ================================================================
   LỚP 12 – Chương I, Bài 3 – 5: Tiệm cận, khảo sát và vẽ đồ thị, ứng dụng thực tiễn
   ================================================================ */
/* Hàm phân thức y = (ax + b)/(cx + d) */
function ratF(r,o={}){
  for(let it=0;it<500;it++){
    const c=o.c||1,a=r.nz(-4,4),d=r.int(o.dlo??-4,o.dhi??4),b=r.int(-6,6);
    if(a*d-b*c===0)continue;
    if(o.ok&&!o.ok({a,b,c,d}))continue;
    return{a,b,c,d,D:a*d-b*c,x0:Q(-d,c),y0:Q(a,c),f:x=>(a*x+b)/(c*x+d),html:fr(xlin(a,b),xlin(c,d))};
  }
  throw new Error('ratF');
}
const xEq=v=>`${I('x')} = ${v}`,yEq=v=>`${I('y')} = ${v}`;

/* ===================== Bài 3: Đường tiệm cận ===================== */
N12('k12-3-vert',1,'NB',[3],r=>{
  const R=ratF(r,{c:r.pick([1,1,2,3])}),ask=r.chance(.5);
  const cor=ask?xEq(qh(R.x0)):yEq(qh(R.y0));
  const W=ask?[xEq(qh(Q(R.d,R.c))),yEq(qh(R.y0)),xEq(qh(R.y0)),xEq(qh(Q(-R.b,R.a)))]:[yEq(qh(Q(-R.y0[0],R.y0[1]))),xEq(qh(R.x0)),yEq(qh(Q(R.b,R.d||1))),xEq(qh(R.y0))];
  return mkTxt(r,{stem:`Tiệm cận ${ask?'đứng':'ngang'} của đồ thị hàm số ${I('y')} = ${R.html} là đường thẳng`,correct:cor,wrongs:W.filter(w=>w!==cor).concat([ask?xEq('1'):yEq('1'),ask?xEq('0'):yEq('0'),ask?xEq(MINUS+'1'):yEq(MINUS+'1'),ask?xEq('2'):yEq('2')]),
    sol:ask?`${lim(I('x'),`(${qh(R.x0)})${sup('+')}`)} y = ±∞ nên tiệm cận đứng là ${xEq(qh(R.x0))}.`:`${lim(I('x'),'±∞')} y = ${fr(sg(R.a),R.c)} = ${qh(R.y0)} nên tiệm cận ngang là ${yEq(qh(R.y0))}.`,
    chk:()=>ask?Math.abs(R.f(qv(R.x0)+1e-7))>1e5:Math.abs(R.f(1e9)-qv(R.y0))<1e-6});
});
N12('k12-3-lim',1,'NB',[3],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),kind=r.int(0,2);
  if(kind===0)return mkTxt(r,{stem:`Cho hàm số ${YF} có ${lim(I('x'),PINF)} ${FX} = ${sg(a)} và ${lim(I('x'),NINF)} ${FX} = ${sg(a)}. Khẳng định nào sau đây đúng?`,
    correct:`Đồ thị hàm số có đúng một tiệm cận ngang là đường thẳng ${yEq(sg(a))}.`,wrongs:[`Đồ thị hàm số có đúng một tiệm cận ngang là đường thẳng ${xEq(sg(a))}.`,`Đồ thị hàm số có hai tiệm cận ngang.`,`Đồ thị hàm số không có tiệm cận ngang.`],
    sol:`Theo định nghĩa, đường thẳng ${yEq(sg(a))} là tiệm cận ngang (cả hai phía cho cùng một giới hạn nên chỉ có một tiệm cận ngang).`});
  if(kind===1)return mkTxt(r,{stem:`Cho hàm số ${YF} có ${lim(I('x'),PINF)} ${FX} = ${sg(a)} và ${lim(I('x'),NINF)} ${FX} = ${sg(a===b?b+1:b)}. Số tiệm cận ngang của đồ thị hàm số là`,
    correct:'2',wrongs:['1','0','3'],sol:`Hai giới hạn hữu hạn khác nhau nên đồ thị có hai tiệm cận ngang ${yEq(sg(a))} và ${yEq(sg(a===b?b+1:b))}.`});
  return mkTxt(r,{stem:`Cho hàm số ${YF} có ${lim(I('x'),`${sg(a)}${sup('+')}`)} ${FX} = +∞. Khẳng định nào sau đây đúng?`,
    correct:`Đường thẳng ${xEq(sg(a))} là tiệm cận đứng của đồ thị hàm số.`,wrongs:[`Đường thẳng ${yEq(sg(a))} là tiệm cận ngang của đồ thị hàm số.`,`Đường thẳng ${yEq(sg(a))} là tiệm cận đứng của đồ thị hàm số.`,`Đồ thị hàm số không có tiệm cận đứng.`],
    sol:`Theo định nghĩa: nếu ${lim(I('x'),`${I('a')}${sup('+')}`)} f(x) = +∞ thì đường thẳng x = a là tiệm cận đứng.`});
});
N12('k12-3-bbt',1,'TH',[3],r=>{
  /* BBT hàm có một tiệm cận đứng x0; giới hạn ở ±∞ là L1, L2 (có thể ±∞) */
  const x0=r.int(-3,3),dec=r.chance(.5);
  const L1=r.pick([r.int(-4,4),r.int(-4,4),dec?Infinity:-Infinity]),L2=r.pick([r.int(-4,4),r.int(-4,4),dec?-Infinity:Infinity]);
  const nd=dec?[{x:-Infinity,d:'',y:L1,lv:'t'},{x:x0,d:'||',y:[-Infinity,Infinity],lv:['b','t']},{x:Infinity,d:'',y:L2,lv:'b'}]
    :[{x:-Infinity,d:'',y:L1,lv:'b'},{x:x0,d:'||',y:[Infinity,-Infinity],lv:['t','b']},{x:Infinity,d:'',y:L2,lv:'t'}];
  const hor=new Set([L1,L2].filter(Number.isFinite)).size,tot=hor+1;
  return mkNum(r,{stem:`Cho hàm số ${YF} có bảng biến thiên như sau:${bbtSVG(nd,dec?['−','−']:['+','+'])}Tổng số tiệm cận đứng và tiệm cận ngang của đồ thị hàm số đã cho là`,correct:tot,ok:v=>v>=0,cands:[0,1,2,3,4].filter(v=>v!==tot),
    sol:`${lim(I('x'),`${sg(x0)}${sup('+')}`)} f(x) = ${dec?'+∞':'−∞'} nên ${xEq(sg(x0))} là tiệm cận đứng. ${[L1,L2].filter(Number.isFinite).length?`Tiệm cận ngang: ${[...new Set([L1,L2].filter(Number.isFinite))].map(v=>yEq(sg(v))).join(' và ')}.`:'Không có tiệm cận ngang.'} Tổng cộng ${tot} đường tiệm cận.`,
    chk:()=>tot>=1&&tot<=3});
});
N12('k12-3-obl',1,'TH',[3],r=>{
  const b=r.int(-6,6),c=r.int(-6,6),d=r.nz(-4,4);if(d*d-b*d+c===0)return T.nlc['k12-3-obl'].gen(r);
  const k=b-d,cor=yEq(xlin(1,k));
  return mkTxt(r,{stem:`Tiệm cận xiên của đồ thị hàm số ${I('y')} = ${fr(xquad(1,b,c),xlin(1,d))} là đường thẳng`,correct:cor,wrongs:[yEq(xlin(1,b)),yEq(xlin(1,b+d)),yEq(xlin(1,-k)),yEq(xlin(1,d)),xEq(sg(-d))].filter(w=>w!==cor),
    sol:`Chia đa thức: ${fr(xquad(1,b,c),xlin(1,d))} = ${xlin(1,k)} + ${fr(sg(c-k*d),xlin(1,d))}. Vì ${lim(I('x'),'±∞')} ${fr(sg(c-k*d),xlin(1,d))} = 0 nên tiệm cận xiên là ${cor}.`,
    chk:()=>Math.abs((1e6*1e6+b*1e6+c)/(1e6+d)-(1e6+k))<1e-3&&c-k*d!==0});
});
N12('k12-3-count',1,'TH',[3],r=>{
  /* y = (x − u)/((x − p)(x − q)) */
  const [p,q]=distinctInts(r,2,-4,4).sort((a,b)=>a-b),u=r.chance(.4)?r.pick([p,q]):r.int(-5,5);
  const den=xquad(1,-(p+q),p*q),ver=[p,q].filter(z=>z!==u),tot=ver.length+1;
  return mkNum(r,{stem:`Tổng số tiệm cận đứng và tiệm cận ngang của đồ thị hàm số ${I('y')} = ${fr(xlin(1,-u),den)} là`,correct:tot,ok:v=>v>=0,cands:[0,1,2,3,4].filter(v=>v!==tot),
    sol:`Mẫu số có nghiệm x = ${sg(p)}, x = ${sg(q)}. ${ver.length<2?`Tại x = ${sg(u)} tử số cũng bằng 0, rút gọn được y = ${fr(1,xlin(1,-[p,q].find(z=>z!==u)))} nên x = ${sg(u)} không là tiệm cận đứng. `:''}Tiệm cận đứng: ${ver.map(v=>xEq(sg(v))).join(', ')}. Bậc tử nhỏ hơn bậc mẫu nên ${yEq('0')} là tiệm cận ngang. Tổng: ${tot}.`,
    chk:()=>ver.every(v=>Math.abs((v+1e-7-u)/((v+1e-7-p)*(v+1e-7-q)))>1e5)&&[p,q].filter(z=>z===u).every(z=>Math.abs((z+1e-7-u)/((z+1e-7-p)*(z+1e-7-q)))<1e3)});
});
DS12('ds12-3-rat',1,'TH',[3],r=>{
  const R=ratF(r,{ok:z=>z.d!==0&&z.b%z.d===0&&z.d!==-z.a&&z.a!==z.b}),x0=-R.d,y0=R.a,yi=R.b/R.d;
  return mkDS(r,{stem:`Cho hàm số ${I('y')} = ${R.html}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Đồ thị hàm số có tiệm cận đứng là đường thẳng ${xEq(sg(x0))}.`,f:`Đồ thị hàm số có tiệm cận đứng là đường thẳng ${xEq(sg(-x0))}.`,why:`Mẫu bằng 0 tại x = ${sg(x0)} (tử khác 0) và ${lim(I('x'),`(${sg(x0)})${sup('+')}`)} y = ±∞.`},
    {t:`Đồ thị hàm số có tiệm cận ngang là đường thẳng ${yEq(sg(y0))}.`,f:`Đồ thị hàm số có tiệm cận ngang là đường thẳng ${yEq(sg(R.b))}.`,why:`${lim(I('x'),'±∞')} y = ${sg(y0)}.`},
    {t:`Giao điểm của hai đường tiệm cận là điểm ${I('I')}(${sg(x0)}; ${sg(y0)}).`,f:`Giao điểm của hai đường tiệm cận là điểm ${I('I')}(${sg(y0)}; ${sg(x0)}).`,why:`Giao điểm của ${xEq(sg(x0))} và ${yEq(sg(y0))} là (${sg(x0)}; ${sg(y0)}).`},
    {t:`Đồ thị hàm số cắt trục tung tại điểm có tung độ bằng ${sg(yi)}.`,f:`Đồ thị hàm số cắt trục tung tại điểm có tung độ bằng ${sg(yi===y0?yi+1:y0)}.`,why:`Thay x = 0: y = ${fr(sg(R.b),sg(R.d))} = ${sg(yi)}.`}],
    chk:()=>Math.abs(R.f(0)-yi)<1e-9&&x0!==-x0&&y0!==R.b});
});
TLN12('t12-3-ab',1,'VD',[3],r=>{
  for(;;){const b=r.pick([1,2,-1,-2]),x0=2/b,y0=r.nz(-4,4),a=y0*b;if(-2*a-b===0)continue;
    return{kind:'tln',stem:`Biết đồ thị hàm số ${I('y')} = ${fr(`${I('a')}${I('x')} + 1`,`${I('b')}${I('x')} ${MINUS} 2`)} (${I('a')}, ${I('b')} là các số thực) có tiệm cận đứng là đường thẳng ${xEq(sg(x0))} và tiệm cận ngang là đường thẳng ${yEq(sg(y0))}. Tính ${I('a')} + ${I('b')}.`,ans:a+b,unit:'',
      sol:`Tiệm cận đứng x = ${fr(2,I('b'))} = ${sg(x0)} ⟹ b = ${sg(b)}; tiệm cận ngang y = ${fr(I('a'),I('b'))} = ${sg(y0)} ⟹ a = ${sg(a)}. Vậy a + b = ${sg(a+b)}.`,chk:()=>2/b===x0&&a/b===y0}}
});
TLN12('t12-3-area',1,'VD',[3],r=>{
  const R=ratF(r,{c:1,ok:z=>z.d!==0}),S=Math.abs(R.d*R.a);
  return{kind:'tln',stem:`Hai đường tiệm cận của đồ thị hàm số ${I('y')} = ${R.html} cùng với hai trục tọa độ tạo thành một hình chữ nhật. Tính diện tích hình chữ nhật đó.`,ans:S,unit:'',
    sol:`Tiệm cận đứng ${xEq(sg(-R.d))}, tiệm cận ngang ${yEq(sg(R.a))}. Hình chữ nhật có hai cạnh ${Math.abs(R.d)} và ${Math.abs(R.a)} nên diện tích là ${S}.`,chk:()=>S>0};
});
TLN12('t12-3-obl',1,'VD',[3],r=>{
  for(;;){const a=r.pick([2,3,-2,-1]),b=r.int(-8,8),c=r.int(-6,6),d=r.nz(-3,3);
    /* (a x² + b x + c)/(x + d) = a x + (b − a d) + (c − d(b − a d))/(x + d) */
    const k=b-a*d,rem=c-d*k;if(rem===0)continue;
    return{kind:'tln',stem:`Tiệm cận xiên của đồ thị hàm số ${I('y')} = ${fr(xquad(a,b,c),xlin(1,d))} là đường thẳng ${I('y')} = ${I('m')}${I('x')} + ${I('n')}. Tính ${I('m')} + ${I('n')}.`,ans:a+k,unit:'',
      sol:`${fr(xquad(a,b,c),xlin(1,d))} = ${xlin(a,k)} + ${fr(sg(rem),xlin(1,d))}. Tiệm cận xiên: ${yEq(xlin(a,k))}, nên m = ${sg(a)}, n = ${sg(k)}, m + n = ${sg(a+k)}.`,chk:()=>Math.abs((a*1e12+b*1e6+c)/(1e6+d)-(a*1e6+k))<1e-3}}
});

/* ===================== Bài 4: Khảo sát và vẽ đồ thị ===================== */
const cubGraph=(r,o={})=>cubic12(r,{as:[1,-1],lo:-2,hi:1,gap:2,ok:z=>Math.abs(z.fp)<=4&&Math.abs(z.fq)<=4&&z.fp!==0&&z.fq!==0&&z.p!==0&&z.q!==0&&z.d!==0&&(!o.ok||o.ok(z))});
N12('k12-4-which',1,'TH',[4],r=>{
  const C=cubGraph(r),V=viewOf([[C.p,C.fp],[C.q,C.fq]],1.6,1.3);
  const neg=[-C.a,-C.b,-C.c,C.d],sh=[C.a,C.b,C.c,C.d+r.pick([-2,2])],mir=[C.a,-C.b,C.c,C.d];
  const quart=[C.a,0,-2*C.a,0,C.d];
  const cor=`${I('y')} = ${P3(C.cs)}`,W=[neg,sh,mir].map(cs=>`${I('y')} = ${P3(cs)}`).concat([`${I('y')} = ${P3(quart)}`]);
  return mkTxt(r,{stem:`Đường cong trong hình bên là đồ thị của hàm số nào dưới đây?${graphSVG(C.f,{...V,marks:[[C.p,C.fp],[C.q,C.fq]],yt:[C.d]})}`,correct:cor,wrongs:W.filter(w=>w!==cor),
    sol:`Đồ thị có dạng bậc ba với hệ số của x³ ${C.a>0?'dương (nhánh phải đi lên)':'âm (nhánh phải đi xuống)'}, cắt trục tung tại điểm có tung độ ${sg(C.d)} và có hai điểm cực trị (${sg(C.p)}; ${sg(C.fp)}), (${sg(C.q)}; ${sg(C.fq)}). Chỉ hàm số ${cor} thoả mãn.`,
    chk:()=>pev(C.cs,0)===C.d&&pev(pder(C.cs),C.p)===0&&pev(pder(C.cs),C.q)===0&&(pev(neg,C.p)!==C.fp||pev(neg,C.q)!==C.fq)});
});
N12('k12-4-sign',1,'TH',[4],r=>{
  const C=cubGraph(r),V=viewOf([[C.p,C.fp],[C.q,C.fq]],1.6,1.3);
  const S=(a,d)=>`${I('a')} ${a>0?'>':'<'} 0, ${I('d')} ${d>0?'>':'<'} 0`;
  return mkTxt(r,{stem:`Cho hàm số ${I('y')} = ${I('a')}${I('x')}${sup(3)} + ${I('b')}${I('x')}${sup(2)} + ${I('c')}${I('x')} + ${I('d')} có đồ thị là đường cong trong hình bên.${graphSVG(C.f,{...V})}Khẳng định nào sau đây đúng?`,
    correct:S(C.a,C.d),wrongs:[S(-C.a,C.d),S(C.a,-C.d),S(-C.a,-C.d)],
    sol:`Nhánh bên phải của đồ thị đi ${C.a>0?'lên':'xuống'} nên a ${C.a>0?'> 0':'< 0'}; đồ thị cắt trục tung tại điểm nằm ${C.d>0?'phía trên':'phía dưới'} gốc O nên d ${C.d>0?'> 0':'< 0'}.`,chk:()=>C.d!==0});
});
N12('k12-4-ratg',1,'TH',[4],r=>{
  let R,x0,y0,yi,xi;
  for(;;){const d=r.pick([1,-1,2,-2]),a=r.pick([1,-1,2,-2]);xi=r.nz(-4,4);const b=-a*xi;if((b%d)||xi===-d)continue;yi=b/d;if(yi===a||Math.abs(yi)>4)continue;
    R={a,b,c:1,d,f:x=>(a*x+b)/(x+d),html:fr(xlin(a,b),xlin(1,d))};x0=-d;y0=a;break}
  const V={x:[Math.min(-5,x0-3),Math.max(5,x0+3)],y:[Math.min(-5,y0-3),Math.max(5,y0+3)]};
  const cor=`${I('y')} = ${R.html}`;
  const W=[[R.a,R.b,1,-R.d],[1,R.b,R.a,R.d],[R.a,-R.b,1,R.d],[-R.a,R.b,1,R.d],[R.b,R.a,1,R.d],[R.a,R.b,1,R.d+(R.d>0?1:-1)],[R.a,R.b+R.a,1,R.d],[-R.a,-R.b,1,R.d],[2*R.a,R.b,1,R.d],[R.a,2*R.b,1,R.d]].filter(([a,b,c,d])=>a*d-b*c!==0).map(([a,b,c,d])=>`${I('y')} = ${fr(xlin(a,b),xlin(c,d))}`);
  return mkTxt(r,{stem:`Đường cong trong hình bên là đồ thị của hàm số nào dưới đây?${graphSVG(R.f,{...V,va:[x0],ha:[y0],xt:[xi],yt:[yi],w:230,h:220})}`,correct:cor,wrongs:W.filter(w=>w!==cor),
    sol:`Từ hình vẽ: tiệm cận đứng ${xEq(sg(x0))}, tiệm cận ngang ${yEq(sg(y0))}, đồ thị cắt Oy tại (0; ${sg(yi)}) và cắt Ox tại (${sg(xi)}; 0). Chỉ hàm số ${cor} thoả mãn.`,
    chk:()=>Math.abs(R.f(0)-yi)<1e-9&&Math.abs(R.f(xi))<1e-9});
});
N12('k12-4-roots',1,'TH',[4],r=>{
  const C=cubic12(r,{dlo:-4,dhi:4,ok:z=>z.fp!==z.fq}),lo=C.yCT,hi=C.yCD,ask=r.int(0,3);
  let m,n;
  if(ask===0){m=r.int(lo+1,hi-1);if(m===lo||m===hi)m=hi+1;n=hi-lo>=2?3:1}
  if(ask===1){m=r.pick([lo,hi]);n=2}
  if(ask===2){m=r.pick([lo-r.int(1,3),hi+r.int(1,3)]);n=1}
  if(ask===3){m=hi-lo>=2?r.int(lo+1,hi-1):hi+1;n=m>lo&&m<hi?3:1}
  const k=r.pick([1,2]),eq=k===1?`${FX} = ${sg(m)}`:`2${FX} ${m*2<0?'+':MINUS} ${Math.abs(m*2)} = 0`;
  return mkNum(r,{stem:`Cho hàm số ${YF} có bảng biến thiên như sau:${bbtCubic(C)}Số nghiệm thực của phương trình ${eq} là`,correct:n,ok:v=>v>=0,cands:[0,1,2,3,4].filter(v=>v!==n),
    sol:`${k===2?`Phương trình ⟺ f(x) = ${sg(m)}. `:''}Số nghiệm bằng số giao điểm của đồ thị y = f(x) với đường thẳng y = ${sg(m)}. Vì giá trị cực đại là ${sg(hi)}, giá trị cực tiểu là ${sg(lo)} nên ${n===3?`${sg(lo)} < ${sg(m)} < ${sg(hi)}: có 3 nghiệm`:n===2?`đường thẳng đi qua điểm cực trị: có 2 nghiệm`:'đường thẳng nằm ngoài khoảng giữa hai giá trị cực trị: có 1 nghiệm'}.`,
    chk:()=>{let c=0;const g=x=>C.f(x)-m;const xs=[];for(let i=-4000;i<=4000;i++)xs.push(i/400);let prev=g(xs[0]);for(let i=1;i<xs.length;i++){const v=g(xs[i]);if(v===0)c++;else if(prev!==0&&Math.sign(v)!==Math.sign(prev))c++;prev=v}
      return n===2?(m===lo||m===hi):c===n}});
});
N12('k12-4-center',1,'TH',[4],r=>{
  const R=ratF(r,{c:r.pick([1,1,2])}),cor=`${I('I')}(${qh(R.x0)}; ${qh(R.y0)})`;
  return mkTxt(r,{stem:`Tâm đối xứng của đồ thị hàm số ${I('y')} = ${R.html} là điểm`,correct:cor,wrongs:[`${I('I')}(${qh(R.y0)}; ${qh(R.x0)})`,`${I('I')}(${qh(Q(R.d,R.c))}; ${qh(R.y0)})`,`${I('I')}(${qh(R.x0)}; ${qh(Q(-R.a,R.c))})`,`${I('I')}(${qh(Q(R.d,R.c))}; ${qh(Q(-R.a,R.c))})`,`${I('I')}(${qh(qadd(R.x0,Q(1)))}; ${qh(R.y0)})`,`${I('I')}(${qh(R.x0)}; ${qh(qadd(R.y0,Q(1)))})`].filter(w=>w!==cor),
    sol:`Đồ thị hàm số ${I('y')} = ${fr(`ax + b`,`cx + d`)} nhận giao điểm của hai đường tiệm cận làm tâm đối xứng. Tiệm cận đứng ${xEq(qh(R.x0))}, tiệm cận ngang ${yEq(qh(R.y0))} nên tâm đối xứng là ${cor}.`,
    chk:()=>{const x0=qv(R.x0),y0=qv(R.y0);return[0.3,1.7,-2.2].every(h=>Math.abs(R.f(x0+h)+R.f(x0-h)-2*y0)<1e-9)}});
});
N12('k12-4-oy',1,'NB',[4],r=>{
  const C=cubic12(r,{d:r.nz(-7,7)}),cor=`(0; ${sg(C.d)})`;
  return mkTxt(r,{stem:`Đồ thị hàm số ${I('y')} = ${P3(C.cs)} cắt trục tung tại điểm`,correct:cor,wrongs:[`(${sg(C.d)}; 0)`,`(0; ${sg(C.a)})`,`(0; ${sg(C.d+C.a+C.b+C.c)})`,`(0; ${sg(-C.d)})`,`(0; ${sg(C.d+1)})`,`(0; ${sg(C.d-1)})`].filter(w=>w!==cor),
    sol:`Cho x = 0 ta được y = ${sg(C.d)}. Giao điểm với trục tung là ${cor}.`,chk:()=>C.f(0)===C.d});
});
DS12('ds12-4-graph',1,'TH',[4],r=>{
  const C=cubGraph(r,{ok:z=>Math.abs(z.fp-z.fq)>=2}),V=viewOf([[C.p,C.fp],[C.q,C.fq]],1.6,1.3),lo=C.yCT,hi=C.yCD;
  const m=r.int(lo+1,hi-1),zc=C.fp*C.fq<0?3:1;
  return mkDS(r,{stem:`Cho hàm số ${I('y')} = ${FX} có đồ thị là đường cong trong hình bên.${graphSVG(C.f,{...V,marks:[[C.p,C.fp],[C.q,C.fq]]})}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Hàm số đạt cực tiểu tại ${I('x')} = ${sg(C.xCT)}.`,f:`Hàm số đạt cực tiểu tại ${I('x')} = ${sg(C.xCD)}.`,why:`Điểm thấp nhất cục bộ của đồ thị có hoành độ ${sg(C.xCT)}.`},
    {t:`${FPX} ${C.a>0?'<':'>'} 0 với mọi ${I('x')} ∈ ${ivO(C.p,C.q)}.`,f:`${FPX} ${C.a>0?'>':'<'} 0 với mọi ${I('x')} ∈ ${ivO(C.p,C.q)}.`,why:`Trên ${ivO(C.p,C.q)} đồ thị đi ${C.a>0?'xuống':'lên'}.`},
    {t:`Phương trình ${FX} = ${sg(m)} có 3 nghiệm phân biệt.`,f:`Phương trình ${FX} = ${sg(m)} có 2 nghiệm phân biệt.`,why:`Đường thẳng y = ${sg(m)} nằm giữa y<sub>CT</sub> = ${sg(lo)} và y<sub>CĐ</sub> = ${sg(hi)} nên cắt đồ thị tại 3 điểm.`},
    {t:`Phương trình ${FX} = 0 có ${zc} nghiệm thực.`,f:`Phương trình ${FX} = 0 có ${zc===3?1:3} nghiệm thực.`,why:`Đồ thị cắt trục hoành tại ${zc} điểm.`}],
    chk:()=>m>lo&&m<hi&&(zc===1||zc===3)});
});
TLN12('t12-4-m',1,'VD',[4],r=>{
  const C=cubic12(r,{d:r.int(-5,5),ok:z=>Math.abs(z.fp-z.fq)>=3}),lo=C.yCT,hi=C.yCD,n=hi-lo-1;
  return{kind:'tln',stem:`Có bao nhiêu giá trị nguyên của tham số ${I('m')} để phương trình ${P3(C.cs)} = ${I('m')} có ba nghiệm thực phân biệt?`,ans:n,unit:'',
    sol:`Xét f(x) = ${P3(C.cs)}: f′(x) = ${P3(pder(C.cs))} = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}; y<sub>CĐ</sub> = ${sg(hi)}, y<sub>CT</sub> = ${sg(lo)}. Phương trình có ba nghiệm phân biệt ⟺ ${sg(lo)} < m < ${sg(hi)}. Có ${n} giá trị nguyên.`,chk:()=>n>=2};
});
TL12('tl12-4-curve',1,'VD','a',[4],r=>{
  const C=cubic12(r,{d:r.int(-4,4),ok:z=>Math.abs(z.fp-z.fq)>=2}),lo=C.yCT,hi=C.yCD;
  return{kind:'tl',title:'Khảo sát hàm số và số nghiệm của phương trình',parts:[
    {pts:.5,html:`Lập bảng biến thiên của hàm số ${I('y')} = ${P3(C.cs)}.`},
    {pts:.5,html:`Tìm các giá trị của tham số ${I('m')} để phương trình ${P3(C.cs)} = ${I('m')} có đúng hai nghiệm thực phân biệt.`}],
    sol:[ptxt([[`${I('y')}′ = ${P3(pder(C.cs))} = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}; y(${sg(C.p)}) = ${sg(C.fp)}, y(${sg(C.q)}) = ${sg(C.fq)}.`,.25],[`Bảng biến thiên:${bbtCubic(C)}`,.25]]),
      ptxt([[`Số nghiệm bằng số giao điểm của đồ thị với đường thẳng y = m (song song hoặc trùng với trục hoành).`,.25],[`Phương trình có đúng hai nghiệm ⟺ đường thẳng đi qua một điểm cực trị ⟺ m = ${sg(hi)} hoặc m = ${sg(lo)}.`,.25]])],
    chk:()=>C.f(C.xCD)===hi&&C.f(C.xCT)===lo};
});

/* ===================== Bài 5: Ứng dụng đạo hàm trong thực tiễn ===================== */
N12('k12-5-vel',1,'TH',[5],r=>{
  const k=r.int(1,4),a=3*k,b=r.int(2,20),T0=r.pick([a,a+1,a+2,10,12].filter(t=>t>k+1));
  /* s(t) = −t³ + a t² + b t; v = −3t² + 2a t + b, max tại t = a/3 = k */
  const vmax=-3*k*k+2*a*k+b;
  return mkNum(r,{stem:`Một vật chuyển động theo quy luật ${I('s')}(${I('t')}) = ${MINUS}${I('t')}${sup(3)} + ${a}${I('t')}${sup(2)} + ${b}${I('t')}, với ${I('t')} (giây) là khoảng thời gian tính từ lúc vật bắt đầu chuyển động và ${I('s')} (mét) là quãng đường vật đi được trong khoảng thời gian đó. Trong ${T0} giây đầu tiên, vận tốc lớn nhất của vật bằng bao nhiêu?`,
    correct:vmax,f:v=>`${v} m/s`,cands:[b,-k*k*k+a*k*k+b*k,vmax+k,2*a+b,vmax-3],
    sol:`v(t) = s′(t) = ${MINUS}3t² + ${2*a}t + ${b}; v′(t) = ${MINUS}6t + ${2*a} = 0 ⟺ t = ${k} ∈ [0; ${T0}]. v đạt giá trị lớn nhất tại t = ${k}: v(${k}) = ${vmax} (m/s).`,
    chk:()=>{let m=-1e9;for(let i=0;i<=T0*200;i++){const t=i/200;m=Math.max(m,-3*t*t+2*a*t+b)}return Math.abs(m-vmax)<1e-6}});
});
N12('k12-5-cost',1,'TH',[5],r=>{
  const k=r.int(2,10),m=k*k*r.pick([1,100]),sq=Math.sqrt(m),c=r.int(1,40),a=r.pick([1,1,2]);
  /* chi phí trung bình C̄(x) = a·x + c + m·a/x? dùng C(x) = x² + c x + m ⟹ C̄ = x + c + m/x, min tại x = √m */
  return mkNum(r,{stem:`Tổng chi phí để sản xuất ${I('x')} sản phẩm của một xưởng là ${I('C')}(${I('x')}) = ${xquad(1,c,m)} (nghìn đồng). Để chi phí trung bình cho mỗi sản phẩm là nhỏ nhất thì xưởng cần sản xuất bao nhiêu sản phẩm?`,
    correct:sq,f:v=>String(v),ok:v=>v>0,cands:[m/2,2*sq,sq/2,sq+c,m].filter(v=>Number.isInteger(v)),
    sol:`Chi phí trung bình ${I('C')}̄(x) = ${fr('C(x)',I('x'))} = x + ${c} + ${fr(m,I('x'))} (x > 0). ${I('C')}̄′(x) = 1 − ${fr(m,'x²')} = 0 ⟺ x = ${sq}. Lập bảng biến thiên: ${I('C')}̄ đạt giá trị nhỏ nhất tại x = ${sq}.`,chk:()=>sq*sq===m&&a>0});
});
N12('k12-5-fence',1,'TH',[5],r=>{
  const k=r.int(2,15),L=4*k,ask=r.chance(.5);
  /* rào ba cạnh, cạnh song song tường = L/2, hai cạnh vuông góc = L/4 */
  return mkNum(r,{stem:`Một người dùng ${L} m lưới rào ba cạnh của một mảnh vườn hình chữ nhật, cạnh còn lại là bức tường có sẵn (không phải rào). ${ask?'Diện tích lớn nhất của mảnh vườn có thể rào được là':'Để diện tích mảnh vườn lớn nhất thì độ dài cạnh song song với bức tường là'}`,
    correct:ask?2*k*k:2*k,f:v=>ask?`${v} m²`:`${v} m`,cands:ask?[k*k,4*k*k,3*k*k,k*k*4/2+k]:[k,3*k,4*k,L/3].filter(v=>Number.isInteger(v)),
    sol:`Gọi x (m) là độ dài mỗi cạnh vuông góc với tường (0 < x < ${L/2}), cạnh song song với tường dài ${L} − 2x. S(x) = x(${L} − 2x); S′(x) = ${L} − 4x = 0 ⟺ x = ${k}. Khi đó cạnh song song với tường dài ${2*k} m và S<sub>max</sub> = ${2*k*k} m².`,
    chk:()=>{let b=0;for(let i=0;i<=L*100;i++){const x=i/200;b=Math.max(b,x*(L-2*x))}return Math.abs(b-2*k*k)<1e-6}});
});
N12('k12-5-box',1,'VD',[5],r=>{
  const k=r.int(2,8),a=6*k;
  return mkNum(r,{stem:`Từ một tấm bìa hình vuông cạnh ${a} cm, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau cạnh ${I('x')} (cm) rồi gập lại thành một chiếc hộp không nắp. Để thể tích chiếc hộp lớn nhất thì ${I('x')} bằng`,
    correct:k,f:v=>`${fmt(v)} cm`,ok:v=>v>0,cands:[2*k,3*k,a/4,k/2,a/3].filter(v=>v<a/2),
    sol:`V(x) = x(${a} − 2x)², 0 < x < ${a/2}. V′(x) = (${a} − 2x)(${a} − 6x) = 0 ⟺ x = ${k} (nhận) hoặc x = ${a/2} (loại). Lập bảng biến thiên: V lớn nhất khi x = ${k} cm.`,
    chk:()=>{let b=0,bx=0;for(let i=1;i<a*100/2;i++){const x=i/100,v=x*(a-2*x)**2;if(v>b){b=v;bx=x}}return Math.abs(bx-k)<0.011}});
});
TLN12('t12-5-box',1,'VD',[5],r=>{
  const k=r.int(1,5),a=6*k,V=16*k*k*k;
  return{kind:'tln',stem:`Từ một tấm nhôm hình vuông cạnh ${a} dm, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau rồi gập lại thành một chiếc thùng không nắp. Tính thể tích lớn nhất của chiếc thùng (đơn vị: dm³).`,ans:V,unit:'dm³',
    sol:`Gọi x (dm) là cạnh hình vuông bị cắt, 0 < x < ${a/2}. V(x) = x(${a} − 2x)²; V′(x) = (${a} − 2x)(${a} − 6x) = 0 ⟹ x = ${k}. V<sub>max</sub> = V(${k}) = ${k}·${a-2*k}² = ${V} (dm³).`,chk:()=>k*(a-2*k)**2===V};
});
TLN12('t12-5-rev',1,'VD',[5],r=>{
  for(;;){const P0=r.pick([40,50,60,80,100]),N0=r.pick([100,200,300,400]),s=r.pick([1,2,5]),k=r.pick([10,20,25,40,50]);
    /* R(x) = (P0 − s x)(N0 + k x), x = số lần giảm giá s nghìn đồng */
    const num=k*P0-s*N0,den=2*s*k;if(num<=0||num%den)continue;const x=num/den,p=P0-s*x;if(p<=0||x<1)continue;
    return{kind:'tln',stem:`Một cửa hàng bán một loại sản phẩm với giá ${P0} nghìn đồng/sản phẩm thì mỗi tháng bán được ${N0} sản phẩm. Khảo sát cho thấy cứ giảm giá ${s} nghìn đồng thì mỗi tháng bán thêm được ${k} sản phẩm. Để doanh thu mỗi tháng lớn nhất thì cửa hàng nên bán với giá bao nhiêu nghìn đồng một sản phẩm?`,ans:p,unit:'nghìn đồng',
      sol:`Gọi x là số lần giảm ${s} nghìn đồng. Doanh thu R(x) = (${P0} − ${s}x)(${N0} + ${k}x). R′(x) = ${k*P0-s*N0} − ${2*s*k}x = 0 ⟺ x = ${x}. R lớn nhất khi giá bán là ${P0} − ${s}·${x} = ${p} (nghìn đồng).`,
      chk:()=>{const R=t=>(P0-s*t)*(N0+k*t);return R(x)>=R(x+0.1)&&R(x)>=R(x-0.1)}}}
});
TLN12('t12-5-cyl',1,'VDC',[5],r=>{
  const V=r.pick([1,2,0.5,1.5,3]),L=V*1000;/* lít → cm³ */
  const R0=Math.cbrt(L/(2*Math.PI)),ans=Math.round(R0*100)/100;
  return{kind:'tln',stem:`Một công ty cần làm một chiếc hộp hình trụ có nắp với dung tích ${fmt(V)} lít. Để tốn ít vật liệu nhất (diện tích toàn phần nhỏ nhất) thì bán kính đáy của hộp bằng bao nhiêu xentimét? (Làm tròn kết quả đến hàng phần trăm.)`,ans,unit:'cm',
    sol:`${fmt(V)} lít = ${L} cm³. V = πR²h ⟹ h = ${fr(L,'πR²')}. S(R) = 2πR² + 2πRh = 2πR² + ${fr(2*L,'R')}. S′(R) = 4πR − ${fr(2*L,'R²')} = 0 ⟺ R = ∛(${fr(L,'2π')}) ≈ ${fmt(ans)} (cm).`,chk:()=>Math.abs(4*Math.PI*R0-2*L/(R0*R0))<1e-6};
});
TLN12('t12-5-pop',1,'VD',[5],r=>{
  const k=r.int(3,10),a=3*k,c=r.pick([100,200,500,1000]);
  return{kind:'tln',stem:`Số ca nhiễm của một dịch bệnh sau ${I('t')} ngày (0 ≤ ${I('t')} ≤ ${2*k}) được ước tính bởi ${I('N')}(${I('t')}) = ${MINUS}${I('t')}${sup(3)} + ${a}${I('t')}${sup(2)} + ${c}. Tốc độ tăng số ca nhiễm được tính bởi ${I('N')}′(${I('t')}). Hỏi vào ngày thứ mấy thì tốc độ tăng số ca nhiễm là lớn nhất?`,ans:k,unit:'',
    sol:`N′(t) = ${MINUS}3t² + ${2*a}t; (N′)′(t) = ${MINUS}6t + ${2*a} = 0 ⟺ t = ${k}. N′ đồng biến trên [0; ${k}] và nghịch biến trên [${k}; ${2*k}] nên tốc độ tăng lớn nhất vào ngày thứ ${k}.`,chk:()=>-6*k+2*a===0};
});
DS12('ds12-5-motion',1,'TH',[5],r=>{
  const k=r.int(1,4),a=3*k,b=r.int(3,15);/* s = t³ − a t² + b t + ... ; v = 3t² − 2a t + b; v min tại t = k */
  const vmin=3*k*k-2*a*k+b,t1=2,v1=3*t1*t1-2*a*t1+b,acc=6*t1-2*a;
  if(vmin<=0)return T.ds['ds12-5-motion'].gen(r);
  return mkDS(r,{stem:`Một chất điểm chuyển động thẳng có phương trình ${I('s')}(${I('t')}) = ${I('t')}${sup(3)} ${MINUS} ${a}${I('t')}${sup(2)} + ${b}${I('t')} (${I('t')} tính bằng giây, ${I('s')} tính bằng mét). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Vận tốc của chất điểm tại thời điểm ${I('t')} là ${I('v')}(${I('t')}) = 3${I('t')}${sup(2)} ${MINUS} ${2*a}${I('t')} + ${b}.`,f:`Vận tốc của chất điểm tại thời điểm ${I('t')} là ${I('v')}(${I('t')}) = 3${I('t')}${sup(2)} ${MINUS} ${a}${I('t')} + ${b}.`,why:`v(t) = s′(t) = 3t² − ${2*a}t + ${b}.`},
    {t:`Vận tốc tại thời điểm ${I('t')} = ${t1} giây là ${v1} m/s.`,f:`Vận tốc tại thời điểm ${I('t')} = ${t1} giây là ${v1+3} m/s.`,why:`v(${t1}) = ${3*t1*t1} − ${2*a*t1} + ${b} = ${v1}.`},
    {t:`Gia tốc tại thời điểm ${I('t')} = ${t1} giây là ${acc} m/s².`,f:`Gia tốc tại thời điểm ${I('t')} = ${t1} giây là ${acc+2*a} m/s².`,why:`a(t) = v′(t) = 6t − ${2*a}, a(${t1}) = ${acc}.`},
    {t:`Vận tốc của chất điểm nhỏ nhất tại thời điểm ${I('t')} = ${k} giây.`,f:`Vận tốc của chất điểm nhỏ nhất tại thời điểm ${I('t')} = ${2*k} giây.`,why:`v′(t) = 6t − ${2*a} = 0 ⟺ t = ${k}; v′ đổi dấu từ − sang + nên v nhỏ nhất tại t = ${k}.`}],
    chk:()=>v1!==v1+3&&acc!==acc+2*a&&k!==2*k});
});
TL12('tl12-5-real',1,'VD','b',[5],r=>{
  const k=r.int(2,12),L=4*k,m=r.int(2,6),a=6*m,V=16*m*m*m;
  return{kind:'tl',title:'Bài toán tối ưu trong thực tiễn',parts:[
    {pts:.5,html:`Bác An có ${L} m lưới thép để rào ba cạnh của một khu đất hình chữ nhật, cạnh còn lại tựa vào bờ tường. Tìm kích thước khu đất để diện tích rào được là lớn nhất.`},
    {pts:.5,html:`Từ một tấm tôn hình vuông cạnh ${a} cm, người ta cắt ở bốn góc bốn hình vuông bằng nhau rồi gập lại thành một cái hộp không nắp. Tính thể tích lớn nhất của cái hộp.`}],
    sol:[ptxt([[`Gọi x (m) là cạnh vuông góc với tường (0 < x < ${L/2}); diện tích S(x) = x(${L} − 2x).`,.25],[`S′(x) = ${L} − 4x = 0 ⟺ x = ${k}. Diện tích lớn nhất khi khu đất có kích thước ${k} m × ${2*k} m (S = ${2*k*k} m²).`,.25]]),
      ptxt([[`Gọi x (cm) là cạnh hình vuông cắt bỏ (0 < x < ${a/2}); V(x) = x(${a} − 2x)²; V′(x) = (${a} − 2x)(${a} − 6x).`,.25],[`V′(x) = 0 ⟺ x = ${m} (nhận). Lập bảng biến thiên được V<sub>max</sub> = V(${m}) = ${V} cm³.`,.25]])],
    chk:()=>m*(a-2*m)**2===V};
});
TL12('tl12-5-rev',1,'VDC','b',[5],r=>{
  for(;;){const P0=r.pick([30,40,50,60]),N0=r.pick([200,300,400,500]),s=r.pick([1,2]),k=r.pick([20,25,40,50]),c0=r.pick([10,15,20]);
    /* lợi nhuận L(x) = (P0 − s x − c0)(N0 + k x) */
    const num=k*(P0-c0)-s*N0,den=2*s*k;if(num<=0||num%den)continue;const x=num/den,p=P0-s*x;if(p<=c0||x<1)continue;
    const Lmax=(p-c0)*(N0+k*x);
    return{kind:'tl',title:'Bài toán lợi nhuận',parts:[
      {pts:.5,html:`Một cửa hàng nhập một loại áo với giá ${c0} nghìn đồng/chiếc và bán với giá ${P0} nghìn đồng/chiếc thì mỗi tháng bán được ${N0} chiếc. Cửa hàng dự định giảm giá bán; cứ giảm ${s} nghìn đồng thì mỗi tháng bán thêm được ${k} chiếc. Gọi ${I('x')} là số lần giảm ${s} nghìn đồng. Viết công thức lợi nhuận mỗi tháng ${I('L')}(${I('x')}) theo ${I('x')}.`},
      {pts:.5,html:`Tìm giá bán để lợi nhuận mỗi tháng lớn nhất và tính lợi nhuận lớn nhất đó.`}],
      sol:[ptxt([[`Giá bán ${P0} − ${s}x (nghìn đồng), số áo bán được ${N0} + ${k}x.`,.25],[`L(x) = (${P0} − ${s}x − ${c0})(${N0} + ${k}x) = (${P0-c0} − ${s}x)(${N0} + ${k}x), 0 ≤ x < ${(P0-c0)/s}.`,.25]]),
        ptxt([[`L′(x) = ${num} − ${den}x = 0 ⟺ x = ${x}; L′ đổi dấu từ + sang − nên L đạt giá trị lớn nhất tại x = ${x}.`,.25],[`Giá bán ${p} nghìn đồng/chiếc, lợi nhuận lớn nhất ${Lmax.toLocaleString('vi-VN')} nghìn đồng.`,.25]])],
      chk:()=>{const L=t=>(P0-s*t-c0)*(N0+k*t);return L(x)===Lmax&&L(x)>=L(x+.5)&&L(x)>=L(x-.5)}}}
});
TL12('tl12-5-motion',1,'VD','b',[5],r=>{
  const k=r.int(1,4),a=3*k,b=r.int(5,24),T0=2*k+r.int(1,3),vmax=-3*k*k+2*a*k+b;
  return{kind:'tl',title:'Ứng dụng đạo hàm trong chuyển động',parts:[
    {pts:.5,html:`Một vật chuyển động theo quy luật ${I('s')}(${I('t')}) = ${MINUS}${I('t')}${sup(3)} + ${a}${I('t')}${sup(2)} + ${b}${I('t')}, trong đó ${I('t')} (giây) là thời gian tính từ lúc bắt đầu chuyển động, ${I('s')} (mét) là quãng đường đi được. Tính vận tốc và gia tốc của vật tại thời điểm ${I('t')} = 1 giây.`},
    {pts:.5,html:`Trong ${T0} giây đầu tiên, tại thời điểm nào vật đạt vận tốc lớn nhất? Tính vận tốc lớn nhất đó.`}],
    sol:[ptxt([[`v(t) = s′(t) = ${MINUS}3t² + ${2*a}t + ${b}; v(1) = ${-3+2*a+b} m/s.`,.25],[`a(t) = v′(t) = ${MINUS}6t + ${2*a}; a(1) = ${-6+2*a} m/s².`,.25]]),
      ptxt([[`v′(t) = ${MINUS}6t + ${2*a} = 0 ⟺ t = ${k} ∈ [0; ${T0}]; v đồng biến trên [0; ${k}], nghịch biến trên [${k}; ${T0}].`,.25],[`Vận tốc lớn nhất đạt tại t = ${k} giây: v(${k}) = ${vmax} m/s.`,.25]])],
    chk:()=>vmax===-3*k*k+2*a*k+b&&k<T0};
});
