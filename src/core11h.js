/* ================================================================
   LỚP 11 – Học kì II – Chương IX: Đạo hàm
   Định nghĩa và ý nghĩa của đạo hàm; các quy tắc tính đạo hàm (đa thức, thương, hàm hợp,
   hàm lượng giác, mũ, lôgarit); đạo hàm cấp hai. Mọi đáp án được đối chiếu với đạo hàm số.
   Thẻ sec: dn (định nghĩa, ý nghĩa), qt (quy tắc), hh (hàm hợp và các hàm cơ bản), c2 (đạo hàm cấp hai).
   ================================================================ */
const N11e=(id,ch,lv,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:11,hk:2,sec});
const DS11e=(id,ch,lv,gen,sec)=>reg('ds',id,ch,lv,gen,{g:11,hk:2,sec});
const TLN11e=(id,ch,lv,gen,sec)=>reg('tln',id,ch,lv,gen,{g:11,hk:2,sec});
const TL11e=(id,ch,lv,role,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:11,hk:2,sec});
const polyH=(cs,v='x')=>{let s='';const n=cs.length-1;cs.forEach((c,i)=>{const e=n-i;if(!c)return;const ab=Math.abs(c),m=(ab===1&&e>0?'':String(ab))+(e>0?I(v)+(e>1?sup(e):''):'');s+=s===''?(c<0?MINUS:'')+m:(c<0?' − ':' + ')+m});return s||'0'};
const pd=cs=>cs.slice(0,-1).map((c,i)=>c*(cs.length-1-i));
const pe=(cs,x)=>cs.reduce((s,c)=>s*x+c,0);
const numd=(f,x)=>(f(x+1e-5)-f(x-1e-5))/2e-5;
const FX=`${I('f')}(${I('x')})`,fp=a=>`${I('f')}′(${a})`,fpp=a=>`${I('f')}″(${a})`,YP=`${I('y')}′`;
const coef=v=>v===1?'':v===-1?MINUS:sg(v);
const X9=I('x');
const PL=v=>v<0?`${MINUS} ${-v}`:`+ ${v}`;
/* f(x) = 2x³ − 3(r1+r2)x² + 6·r1·r2·x có f′(x) = 6(x − r1)(x − r2) */
const cub2=(r1,r2)=>[2,-3*(r1+r2),6*r1*r2,0];

N11e('m11-9-def',9,'NB',r=>{
  const a=r.nz(-3,3),b=r.int(-5,5),c=r.int(-6,6),x0=r.int(-3,3),cs=[a,b,c],v=2*a*x0+b;
  return mkNum(r,{stem:`Cho hàm số ${FX} = ${polyH(cs)}. Đạo hàm ${fp(sg(x0))} (theo định nghĩa) bằng`,correct:v,ok:()=>true,cands:[pe(cs,x0),2*a*x0,v+a,b,-v],
    sol:`Với ${X9} ≠ ${sg(x0)}: ${fr(`${I('f')}(${X9}) ${MINUS} ${I('f')}(${sg(x0)})`,xlin(1,-x0))} = ${a===1?'':coef(a)}(${X9} ${PL(x0)}) ${PL(b)}. Cho ${X9} → ${sg(x0)}: ${fp(sg(x0))} = ${2*a*x0 === 0 ? '0' : sg(2*a*x0)} ${PL(b)} = ${sg(v)}.`,chk:()=>Math.abs(numd(x=>pe(cs,x),x0)-v)<1e-4});
});
N11e('m11-9-slope',9,'TH',r=>{
  const cs=[r.nz(-2,2),r.int(-3,3),r.int(-4,4),r.int(-5,5)],x0=r.int(-2,3),v=pe(pd(cs),x0);
  return mkNum(r,{stem:`Hệ số góc của tiếp tuyến của đồ thị hàm số ${I('y')} = ${polyH(cs)} tại điểm có hoành độ ${X9}${sub(0)} = ${sg(x0)} bằng`,correct:v,ok:()=>true,cands:[pe(cs,x0),pe(pd(cs),-x0),v+cs[0],cs[2],-v],
    sol:`${YP} = ${polyH(pd(cs))}. Hệ số góc của tiếp tuyến tại ${X9}${sub(0)} = ${sg(x0)} là ${I('y')}′(${sg(x0)}) = ${sg(v)}.`,chk:()=>Math.abs(numd(x=>pe(cs,x),x0)-v)<1e-3});
});
N11e('m11-9-tangent',9,'TH',r=>{
  const deg=r.pick([2,3]),cs=deg===2?[r.nz(-2,3),r.int(-4,4),r.int(-4,4)]:[r.nz(-2,2),r.int(-3,3),r.int(-3,3),r.int(-4,4)],x0=r.int(-2,2),k=pe(pd(cs),x0),y0=pe(cs,x0),m=y0-k*x0;
  if(k===0)return T.nlc['m11-9-tangent'].gen(r);
  const L=(a,b)=>`${I('y')} = ${xlin(a,b)}`,ok=L(k,m);
  const wr=[L(k,y0),L(k,-m),L(-k,m),L(y0,k),L(k+1,m),L(k,m+k)].filter(z=>z!==ok);
  return mkTxt(r,{stem:`Phương trình tiếp tuyến của đồ thị hàm số ${I('y')} = ${polyH(cs)} tại điểm có hoành độ ${X9}${sub(0)} = ${sg(x0)} là`,correct:ok+'.',wrongs:wr.map(z=>z+'.'),
    sol:`${YP} = ${polyH(pd(cs))}; ${I('y')}${sub(0)} = ${sg(y0)}; ${YP}(${sg(x0)}) = ${sg(k)}. Phương trình tiếp tuyến: ${I('y')} = ${sg(k)}(${X9} ${x0<0?'+':MINUS} ${Math.abs(x0)}) ${PL(y0)} hay ${ok}.`,chk:()=>Math.abs(numd(x=>pe(cs,x),x0)-k)<1e-3});
});
N11e('m11-9-velocity',9,'TH',r=>{
  const a=r.pick([1,2,-1,-2]),b=r.int(-6,6),c=r.int(0,12),t0=r.int(1,5),cs=[a,b,c,0],v=pe(pd(cs),t0);
  return mkNum(r,{stem:`Một chất điểm chuyển động thẳng theo phương trình ${I('s')}(${I('t')}) = ${polyH(cs,'t')} (${I('t')} tính bằng giây, ${I('s')} tính bằng mét). Vận tốc tức thời của chất điểm tại thời điểm ${I('t')} = ${t0} giây là (m/s)`,correct:v,ok:()=>true,cands:[pe(cs,t0),pe(pd(cs),t0+1),pe(pd(cs),t0-1),a*t0*t0+b*t0+c],
    sol:`Vận tốc là đạo hàm của quãng đường: ${I('v')}(${I('t')}) = ${I('s')}′(${I('t')}) = ${polyH(pd(cs),'t')}. Vậy ${I('v')}(${t0}) = ${sg(v)} (m/s).`,chk:()=>Math.abs(numd(t=>pe(cs,t),t0)-v)<1e-3});
});
N11e('m11-9-poly',9,'NB',r=>{
  const n=r.pick([3,4]),cs=[r.nz(-3,3),...Array.from({length:n},()=>r.int(-6,6))],d=pd(cs),ok=polyH(d);
  const wr=[];
  for(let i=0;i<d.length;i++){const z=d.slice();z[i]+=r.pick([-1,1,2]);wr.push(polyH(z))}
  wr.push(polyH(cs.slice(0,-1)),polyH(cs.slice(1)));
  return mkTxt(r,{stem:`Đạo hàm của hàm số ${I('y')} = ${polyH(cs)} là`,correct:`${YP} = ${ok}.`,wrongs:r.shuffle(wr).filter(z=>z!==ok).map(z=>`${YP} = ${z}.`),
    sol:`Áp dụng (${X9}${sup('n')})′ = n·${X9}${sup('n−1')} cho từng số hạng và (hằng số)′ = 0: ${YP} = ${ok}.`,chk:()=>Math.abs(numd(x=>pe(cs,x),.7)-pe(d,.7))<1e-3});
});
N11e('m11-9-table',9,'NB',r=>{
  const n=r.int(3,6),a=r.pick([2,3,5]),sq=s=>`${s}${sup(2)}`;
  const TB=[[`${X9}${sup(n)}`,`${n}${X9}${n-1===1?'':sup(n-1)}`],[rt(X9),fr(1,`2${rt(X9)}`)],[fr(1,X9),`${MINUS}${fr(1,sq(X9))}`],['sin '+X9,'cos '+X9],['cos '+X9,`${MINUS}sin ${X9}`],['tan '+X9,fr(1,`cos${sup(2)} ${X9}`)],['cot '+X9,`${MINUS}${fr(1,`sin${sup(2)} ${X9}`)}`],[`${I('e')}${sup(X9)}`,`${I('e')}${sup(X9)}`],[`${a}${sup(X9)}`,`${a}${sup(X9)} ln ${a}`],['ln '+X9,fr(1,X9)],[`log${sub(a)} ${X9}`,fr(1,`${X9} ln ${a}`)]];
  const ix=r.int(0,TB.length-1),[f,d]=TB[ix],wr=TB.filter((z,i)=>i!==ix&&z[1]!==d).map(z=>z[1]);
  return mkTxt(r,{stem:`Đạo hàm của hàm số ${I('y')} = ${f} là`,correct:`${YP} = ${d}.`,wrongs:r.shuffle(wr).slice(0,3).map(z=>`${YP} = ${z}.`),sol:`Theo bảng đạo hàm của các hàm số thường gặp: (${f})′ = ${d}.`});
});
N11e('m11-9-product',9,'TH',r=>{
  const p=r.nz(-3,3),q=r.int(-4,4),a=r.nz(-2,2),b=r.int(-3,3),c=r.int(-4,4),x0=r.int(-2,3);
  const f1=[p,q],f2=[a,b,c],v=p*pe(f2,x0)+pe(f1,x0)*pe(pd(f2),x0);
  return mkNum(r,{stem:`Cho hàm số ${I('y')} = (${polyH(f1)})(${polyH(f2)}). Giá trị của ${YP}(${sg(x0)}) bằng`,correct:v,ok:()=>true,cands:[pe(f1,x0)*pe(f2,x0),p*pe(pd(f2),x0),pe(pd(f1),x0)*pe(pd(f2),x0),v+p,v-pe(f2,x0)],
    sol:`${YP} = (${polyH(f1)})′(${polyH(f2)}) + (${polyH(f1)})(${polyH(f2)})′ = ${sg(p)}(${polyH(f2)}) + (${polyH(f1)})(${polyH(pd(f2))}). Thay ${X9} = ${sg(x0)}: ${YP}(${sg(x0)}) = ${sg(v)}.`,chk:()=>Math.abs(numd(x=>pe(f1,x)*pe(f2,x),x0)-v)<1e-3});
});
N11e('m11-9-quot',9,'TH',r=>{
  const a=r.nz(-4,4),b=r.int(-4,4),c=r.nz(-3,3),d=r.int(-4,4),D=a*d-b*c;if(D===0)return T.nlc['m11-9-quot'].gen(r);
  const den=`(${polyH([c,d])})${sup(2)}`,den1=`${polyH([c,d])}`,H=(N,dn)=>fr(sg(N),dn),ok=`${YP} = ${H(D,den)}.`;
  const wr=[H(-D,den),H(a*d+b*c,den),H(D,den1),H(a*c,den),H(b*d,den)].filter(z=>`${YP} = ${z}.`!==ok);
  return mkTxt(r,{stem:`Đạo hàm của hàm số ${I('y')} = ${fr(polyH([a,b]),polyH([c,d]))} là`,correct:ok,wrongs:wr.map(z=>`${YP} = ${z}.`),
    sol:`${YP} = ${fr(`(${polyH([a,b])})′(${polyH([c,d])}) ${MINUS} (${polyH([a,b])})(${polyH([c,d])})′`,den)} = ${fr(`${sg(a)}(${polyH([c,d])}) ${pm(sg(c))}(${polyH([a,b])})`,den)} = ${H(D,den)}.`,
    chk:()=>Math.abs(numd(x=>(a*x+b)/(c*x+d),.31)-D/Math.pow(c*.31+d,2))<1e-3});
});
N11e('m11-9-composite',9,'TH',r=>{
  const a=r.nz(-3,3),b=r.int(-4,4),n=r.int(3,5),lin=`(${polyH([a,b])})`,P=e=>e===1?lin:`${lin}${sup(e)}`;
  const ok=`${YP} = ${coef(n*a)}${P(n-1)}.`,wr=[`${YP} = ${n}${P(n-1)}.`,`${YP} = ${coef(a)}${P(n-1)}.`,`${YP} = ${coef(n*a)}${P(n)}.`,`${YP} = ${n}${P(n)}.`,`${YP} = ${coef(n*a*b)}${P(n-1)}.`,`${YP} = ${coef((n-1)*a)}${P(n-1)}.`,`${YP} = ${coef(n*a+b)}${P(n-1)}.`,`${YP} = ${coef(n*(a+b))}${P(n-1)}.`,`${YP} = ${coef(n*a)}${P(n-2>0?n-2:n)}.`].filter(z=>z!==ok);
  return mkTxt(r,{stem:`Đạo hàm của hàm số ${I('y')} = ${P(n)} là`,correct:ok,wrongs:wr,sol:`Hàm hợp ${I('y')} = ${I('u')}${sup(n)} với ${I('u')} = ${polyH([a,b])}: ${YP} = ${n}${I('u')}${sup(n-1)}·${I('u')}′ = ${n}${P(n-1)}·${sg(a)} = ${coef(n*a)}${P(n-1)}.`,
    chk:()=>Math.abs(numd(x=>Math.pow(a*x+b,n),.4)-n*a*Math.pow(a*.4+b,n-1))<1e-3});
});
N11e('m11-9-trig',9,'TH',r=>{
  const a=r.pick([2,3,4,5,-2,-3]),b=r.int(-3,3),arg=polyH([a,b]),fn=r.int(0,4),e=I('e');
  const T9=[
    ['sin',`sin(${arg})`,`${coef(a)}cos(${arg})`,[`cos(${arg})`,`${coef(-a)}cos(${arg})`,`${coef(a)}sin(${arg})`,`${MINUS}cos(${arg})`],x=>Math.sin(a*x+b),x=>a*Math.cos(a*x+b)],
    ['cos',`cos(${arg})`,`${coef(-a)}sin(${arg})`,[`${coef(a)}sin(${arg})`,`${MINUS}sin(${arg})`,`sin(${arg})`,`${coef(a)}cos(${arg})`],x=>Math.cos(a*x+b),x=>-a*Math.sin(a*x+b)],
    ['exp',`${e}${sup(arg)}`,`${coef(a)}${e}${sup(arg)}`,[`${e}${sup(arg)}`,`${coef(a)}${X9}${e}${sup(arg)}`,`(${polyH([a,b])})${e}${sup(arg)}`,`${coef(a)}${e}${sup(a)}`],x=>Math.exp(a*x+b),x=>a*Math.exp(a*x+b)],
    ['ln',`ln(${arg})`,fr(sg(a),arg),[fr(1,arg),fr(arg,sg(a)),fr(1,`${sg(a)}(${arg})`),fr(sg(-a),arg)],x=>Math.log(Math.abs(a*x+b)),x=>a/(a*x+b)],
    ['tan',`tan(${arg})`,fr(sg(a),`cos${sup(2)}(${arg})`),[fr(1,`cos${sup(2)}(${arg})`),fr(sg(-a),`cos${sup(2)}(${arg})`),fr(sg(a),`sin${sup(2)}(${arg})`),`${coef(a)}cos${sup(2)}(${arg})`],x=>Math.tan(a*x+b),x=>a/Math.pow(Math.cos(a*x+b),2)]
  ][fn];
  const ok=`${YP} = ${T9[2]}.`;
  return mkTxt(r,{stem:`Đạo hàm của hàm số ${I('y')} = ${T9[1]} là`,correct:ok,wrongs:T9[3].map(z=>`${YP} = ${z}.`).filter(z=>z!==ok),sol:`Hàm hợp: (${T9[0]==='exp'?`${e}${sup('u')}`:`${T9[0]} ${I('u')}`})′ = ${I('u')}′·(…) với ${I('u')} = ${arg}, ${I('u')}′ = ${sg(a)}. Do đó ${YP} = ${T9[2]}.`,
    chk:()=>{const x=[.2137,.1371,.0613,.3319,.4].find(t=>Math.abs(Math.cos(a*t+b))>.3&&Math.abs(a*t+b)>.3);return Math.abs(numd(T9[4],x)-T9[5](x))<1e-3}});
});
const THETA_SIN=[[0,1,1],[1,3,.5],[1,2,0],[2,3,-.5],[1,1,-1]],THETA_COS=[[0,1,0],[1,6,.5],[1,2,1],[5,6,.5],[1,1,0],[7,6,-.5],[3,2,-1]];
N11e('m11-9-value',9,'TH',r=>{
  const isSin=r.chance(.5),k=r.pick([2,3,4]),[tn,td,tv]=r.pick(isSin?THETA_SIN:THETA_COS),x0=Q(tn,td*k),v=isSin?k*tv:-k*tv,Vq=Q(Math.round(v*2),2);
  return mkF(r,{stem:`Cho hàm số ${I('y')} = ${isSin?'sin':'cos'} ${k}${X9}. Giá trị của ${YP}(${radH(x0)}) bằng`,correct:Vq,cands:[Q(Math.round(tv*2*(isSin?1:-1)),2),Q(k),Q(-k),Q(Math.round(-v*2),2),Q(0)],
    sol:`${YP} = ${isSin?`${k}cos ${k}${X9}`:`${MINUS}${k}sin ${k}${X9}`}. Với ${X9} = ${radH(x0)}: ${k}${X9} = ${radH(Q(tn,td))}, nên ${YP} = ${qh(Vq)}.`,chk:()=>{const x=qv(x0)*Math.PI;return Math.abs(numd(isSin?(t=>Math.sin(k*t)):(t=>Math.cos(k*t)),x)-v)<1e-3}});
});
N11e('m11-9-d2',9,'TH',r=>{
  const n=r.pick([3,4]),cs=[r.nz(-2,2),...Array.from({length:n},()=>r.int(-4,4))],x0=r.int(-2,2),d2=pd(pd(cs)),v=pe(d2,x0);
  return mkNum(r,{stem:`Cho hàm số ${FX} = ${polyH(cs)}. Giá trị của ${fpp(sg(x0))} bằng`,correct:v,ok:()=>true,cands:[pe(pd(cs),x0),pe(cs,x0),v+cs[0],-v],
    sol:`${I('f')}′(${X9}) = ${polyH(pd(cs))}, ${I('f')}″(${X9}) = ${polyH(d2)}. Vậy ${fpp(sg(x0))} = ${sg(v)}.`,chk:()=>Math.abs(numd(x=>pe(pd(cs),x),x0)-v)<1e-3});
},'c2');
N11e('m11-9-accel',9,'TH',r=>{
  const a=r.pick([1,2,-1]),b=r.int(-6,6),c=r.int(0,10),t0=r.int(1,5),cs=[a,b,c,0],v=pe(pd(pd(cs)),t0);
  return mkNum(r,{stem:`Một vật chuyển động thẳng theo phương trình ${I('s')}(${I('t')}) = ${polyH(cs,'t')} (${I('t')} tính bằng giây, ${I('s')} tính bằng mét). Gia tốc tức thời của vật tại thời điểm ${I('t')} = ${t0} giây là (m/s²)`,correct:v,ok:()=>true,cands:[pe(pd(cs),t0),pe(pd(pd(cs)),t0+1),6*a+2*b,-v],
    sol:`Gia tốc là đạo hàm cấp hai của quãng đường: ${I('a')}(${I('t')}) = ${I('s')}″(${I('t')}) = ${polyH(pd(pd(cs)),'t')}. Vậy ${I('a')}(${t0}) = ${sg(v)} (m/s²).`,chk:()=>Math.abs(numd(t=>pe(pd(cs),t),t0)-v)<1e-3});
},'c2');
N11e('m11-9-eq',9,'TH',r=>{
  const [r1,r2]=r.shuffle([-3,-2,-1,1,2,3,4]).slice(0,2).sort((x,y)=>x-y),cs=cub2(r1,r2),S=(a,b)=>`{${sg(a)}; ${sg(b)}}`,ok=S(r1,r2);
  const wr=[S(-r1,-r2),S(r1,-r2),S(-r1,r2),S(r1+1,r2+1),S(r1,r2+1),S(r1-1,r2-1)].filter(z=>z!==ok&&z!==S(r2,r1));
  return mkTxt(r,{stem:`Cho hàm số ${FX} = ${polyH(cs)}. Tập nghiệm của phương trình ${I('f')}′(${X9}) = 0 là`,correct:ok+'.',wrongs:wr.map(z=>z+'.'),
    sol:`${I('f')}′(${X9}) = ${polyH(pd(cs))} = 6(${X9} ${r1<0?'+':MINUS} ${Math.abs(r1)})(${X9} ${r2<0?'+':MINUS} ${Math.abs(r2)}), nên ${I('f')}′(${X9}) = 0 ⟺ ${X9} = ${sg(r1)} hoặc ${X9} = ${sg(r2)}.`,chk:()=>pe(pd(cs),r1)===0&&pe(pd(cs),r2)===0});
});
