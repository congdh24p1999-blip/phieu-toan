/* ================================================================
   LỚP 10 – Toán 10 Kết nối tri thức, học kì II
   Chương VI: Hàm số, đồ thị và ứng dụng (Bài 15 – 18)
   ================================================================ */
const N10b=(id,ch,lv,les,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:10,hk:2,les,sec});
const DS10b=(id,ch,lv,les,gen,sec)=>reg('ds',id,ch,lv,gen,{g:10,hk:2,les,sec});
const TLN10b=(id,ch,lv,les,gen,sec)=>reg('tln',id,ch,lv,gen,{g:10,hk:2,les,sec});
const TL10b=(id,ch,lv,role,les,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:10,hk:2,les,sec});
const YX='y = ';
const quadF=(a,b,c)=>x=>a*x*x+b*x+c;
const qY=(a,b,c)=>`${I('y')} = ${xquad(a,b,c)}`;
const pp10=s=>s.replace(/([·+−] ?)(−\d+)/g,(m,a,b)=>a+'('+b+')');
/* parabol y = a(x − h)² + k với a, h, k nguyên */
const parab10=(r,o={})=>{const a=o.a||r.pick(o.as||[1,-1,2,-2,1,-1]),h=r.int(-3,3),k=r.int(-4,4),b=-2*a*h,c=a*h*h+k;return{a,b,c,h,k,f:quadF(a,b,c)}};
/* bảng biến thiên hai dòng (x và y) của hàm số bậc hai */
function bbtQ10(xH,yH,a){
  const W=260,H=96,L=46,hx=26,X=[L+26,L+(W-L)/2,W-22],yT=hx+18,yB=H-10;
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Bảng biến thiên"><rect x="0.5" y="0.5" width="${W-1}" height="${H-1}" fill="none" stroke="#000"/>`;
  s+=`<line x1="0" y1="${hx}" x2="${W}" y2="${hx}" stroke="#000"/><line x1="${L}" y1="0" x2="${L}" y2="${H}" stroke="#000"/>`;
  s+=`<text x="${L/2}" y="17" font-size="12" text-anchor="middle" font-style="italic">x</text><text x="${L/2}" y="${(hx+H)/2+4}" font-size="12" text-anchor="middle" font-style="italic">y</text>`;
  s+=`<text x="${X[0]}" y="17" font-size="12" text-anchor="middle">−∞</text><text x="${X[1]}" y="17" font-size="12" text-anchor="middle">${xH}</text><text x="${X[2]}" y="17" font-size="12" text-anchor="middle">+∞</text>`;
  const top=a<0,yv=top?yT:yB,ye=top?yB:yT,ar=(x1,y1,x2,y2)=>{const g=Math.atan2(y2-y1,x2-x1),h=6,f=v=>v.toFixed(1);return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#000"/><polygon points="${f(x2)},${f(y2)} ${f(x2-h*Math.cos(g-.4))},${f(y2-h*Math.sin(g-.4))} ${f(x2-h*Math.cos(g+.4))},${f(y2-h*Math.sin(g+.4))}"/>`};
  s+=`<text x="${X[1]}" y="${yv}" font-size="12" text-anchor="middle">${yH}</text><text x="${X[0]}" y="${ye}" font-size="12" text-anchor="middle">${top?'−∞':'+∞'}</text><text x="${X[2]}" y="${ye}" font-size="12" text-anchor="middle">${top?'−∞':'+∞'}</text>`;
  const o=4;s+=top?ar(X[0]+12,ye-12,X[1]-14,yv+o):ar(X[0]+12,ye+o,X[1]-14,yv-12);
  s+=top?ar(X[1]+14,yv+o,X[2]-12,ye-12):ar(X[1]+14,yv-12,X[2]-12,ye+o);
  return `<div class="figure">${s}</svg></div>`;
}
const parView10=P=>{const w=P.a===2||P.a===-2?2:2.6,xs=[P.h-w,P.h+w];const ys=[P.f(xs[0]),P.f(xs[1]),P.k,P.c];return{x:[Math.floor(Math.min(xs[0],-1)),Math.ceil(Math.max(xs[1],1))],y:[Math.floor(Math.min(0,...ys))-1,Math.ceil(Math.max(0,...ys))+1]}};
const parFig10=P=>graphSVG(P.f,{...parView10(P),marks:[[P.h,P.k]],yt:P.c!==P.k&&P.c!==0?[P.c]:[],w:210,h:200});

/* ===================== Bài 15: Hàm số ===================== */
N10b('k10-15-dom',6,'NB',[15],r=>{
  const t=r.int(0,3),p=r.int(-6,6),q=r.int(-6,6);
  if(t===0){const c=r.pick([1,2,3]),d=-c*p,a=r.nz(-4,4),b=r.int(-5,5);if(a*p+b===0)return T.nlc['k10-15-dom'].gen(r);
    return mkTxt(r,{stem:`Tập xác định của hàm số ${I('y')} = ${fr(xlin(a,b),xlin(c,d))} là`,correct:`${RR} \\ {${sg(p)}}`,wrongs:[`${RR} \\ {${sg(-p)}}`,`${RR}`,`(${sg(p)}; +∞)`,`${RR} \\ {${qh(Q(-b,a))}}`],
      sol:`Hàm số xác định khi ${xlin(c,d)} ≠ 0 ⟺ x ≠ ${sg(p)}. Vậy D = ℝ \\ {${sg(p)}}.`,chk:()=>true})}
  if(t===1){const s=r.pick([1,-1]),A=s;/* √(s(x − p)) */
    const e=s>0?xlin(1,-p):xlin(-1,p),cor=s>0?ivH(p,Infinity,[true,false]):ivH(-Infinity,p,[false,true]);
    return mkTxt(r,{stem:`Tập xác định của hàm số ${I('y')} = ${rt(e)} là`,correct:cor,wrongs:[s>0?ivH(p,Infinity,[false,false]):ivH(-Infinity,p,[false,false]),s>0?ivH(-Infinity,p,[false,true]):ivH(p,Infinity,[true,false]),s>0?ivH(-p,Infinity,[true,false]):ivH(-Infinity,-p,[false,true])].filter(x=>x!==cor).concat([RR]),
      sol:`Hàm số xác định khi ${e} ≥ 0 ⟺ x ${s>0?'≥':'≤'} ${sg(p)}. Vậy D = ${cor}.`,chk:()=>A!==0})}
  if(t===2){const s=r.pick([1,-1]),e=s>0?xlin(1,-p):xlin(-1,p),cor=s>0?ivH(p,Infinity,[false,false]):ivH(-Infinity,p,[false,false]);
    return mkTxt(r,{stem:`Tập xác định của hàm số ${I('y')} = ${fr(1,rt(e))} là`,correct:cor,wrongs:[s>0?ivH(p,Infinity,[true,false]):ivH(-Infinity,p,[false,true]),`${RR} \\ {${sg(p)}}`,s>0?ivH(-Infinity,p,[false,false]):ivH(p,Infinity,[false,false])],
      sol:`Hàm số xác định khi ${e} > 0 ⟺ x ${s>0?'>':'<'} ${sg(p)}. Vậy D = ${cor}.`,chk:()=>true})}
  const pp=Math.min(p,q),qq=Math.max(p,q)+(p===q?2:0);
  return mkTxt(r,{stem:`Tập xác định của hàm số ${I('y')} = ${rt(xlin(1,-pp))} + ${fr(1,xlin(1,-qq))} là`,correct:`[${sg(pp)}; +∞) \\ {${sg(qq)}}`,wrongs:[`(${sg(pp)}; +∞) \\ {${sg(qq)}}`,`[${sg(pp)}; +∞)`,`${RR} \\ {${sg(qq)}}`],
    sol:`Điều kiện: x − ${pp<0?'('+sg(pp)+')':pp} ≥ 0 và x ≠ ${sg(qq)} ⟺ x ≥ ${sg(pp)}, x ≠ ${sg(qq)}.`.replace(`x − 0 ≥ 0`,'x ≥ 0'),chk:()=>qq>pp});
});
N10b('k10-15-val',6,'NB',[15],r=>{
  const k=r.int(-2,2),a=r.nz(-3,3),b=r.int(-5,5),c=r.nz(-2,3),d=r.int(-5,5),x0=r.pick([k-2,k-1,k,k+1,k+2]),up=x0>=k,v=up?a*x0+b:c*x0*x0+d;
  return mkNum(r,{stem:`Cho hàm số ${I('f')}(${I('x')}) = ${cases(`${xlin(a,b)} khi ${I('x')} ≥ ${sg(k)}`,`${xquad(c,0,d)} khi ${I('x')} < ${sg(k)}`)}. Giá trị của ${I('f')}(${sg(x0)}) bằng`,correct:v,ok:()=>true,cands:[up?c*x0*x0+d:a*x0+b,-v,v+1,a*x0-b],
    sol:`Vì ${sg(x0)} ${up?'≥':'<'} ${sg(k)} nên f(${sg(x0)}) = ${pp10(up?`${sg(a)}·${sg(x0)} + ${sg(b)}`:`${sg(c)}·${sg(x0)}² + ${sg(d)}`)} = ${sg(v)}.`.replace('+ −','− '),chk:()=>true});
});
N10b('k10-15-pt',6,'NB',[15],r=>{
  for(;;){const a=r.nz(-2,2),b=r.int(-4,4),c=r.int(-4,4),f=quadF(a,b,c),xs=distinctInts(r,4,-3,3),P=xs.map((x,i)=>[x,f(x)+(i?r.nz(-3,3):0)]);
    return mkTxt(r,{stem:`Điểm nào sau đây thuộc đồ thị của hàm số ${qY(a,b,c)}?`,correct:`(${P[0].map(sg).join('; ')})`,wrongs:P.slice(1).map(p=>`(${p.map(sg).join('; ')})`),
      sol:`Thay x = ${sg(P[0][0])} vào công thức được y = ${sg(f(P[0][0]))}. Các điểm còn lại không thoả mãn.`,chk:()=>P.slice(1).every(p=>f(p[0])!==p[1])})}
});
/* bảng giá điện, taxi: hàm số cho bởi nhiều công thức */
const TAXI=r=>{const p0=r.pick([10,12,15]),p1=r.pick([14,15,16,17]),p2=r.pick([11,12,13]),k=r.pick([20,25,30]);return{p0,p1,p2,k,f:x=>x<=1?p0:x<=k?p0+(x-1)*p1:p0+(k-1)*p1+(x-k)*p2}};
N10b('k10-15-taxi',6,'TH',[15],r=>{
  const T_=TAXI(r),x=r.pick([r.int(2,T_.k),r.int(T_.k+1,T_.k+20)]),v=T_.f(x);
  return mkNum(r,{stem:`Giá cước một hãng taxi như sau: ${T_.p0} nghìn đồng cho 1 km đầu tiên; ${T_.p1} nghìn đồng/km cho các ki-lô-mét tiếp theo đến km thứ ${T_.k}; ${T_.p2} nghìn đồng/km từ km thứ ${T_.k+1} trở đi. Một hành khách đi ${x} km phải trả bao nhiêu nghìn đồng?`,correct:v,cands:[T_.p0+(x-1)*T_.p1,x*T_.p1,T_.p0+x*T_.p1,v+T_.p2],
    sol:`Số tiền là hàm số của quãng đường x: ${x<=T_.k?`f(${x}) = ${T_.p0} + ${x-1}·${T_.p1} = ${v}`:`f(${x}) = ${T_.p0} + ${T_.k-1}·${T_.p1} + ${x-T_.k}·${T_.p2} = ${v}`} (nghìn đồng).`,chk:()=>true});
});
N10b('k10-15-mono',6,'TH',[15,16],r=>{
  for(;;){const P=parab10(r,{as:[1,-1]}),up=P.a>0,inc=r.chance(.5);if(P.h===P.k)continue;/* đồ thị cho sẵn */
  const cor=inc===up?ivH(P.h,Infinity,[false,false]):ivH(-Infinity,P.h,[false,false]),W=[inc===up?ivH(-Infinity,P.h,[false,false]):ivH(P.h,Infinity,[false,false]),ivH(-Infinity,P.k,[false,false]),ivH(P.k,Infinity,[false,false]),ivH(-Infinity,Infinity,[false,false]),ivH(-Infinity,P.h+2,[false,false]),ivH(P.h-2,Infinity,[false,false]),ivH(P.h-1,P.h+1,[false,false])];
  return mkTxt(r,{stem:`Cho hàm số ${I('y')} = ${I('f')}(${I('x')}) có đồ thị như hình bên.${parFig10(P)}Hàm số đã cho ${inc?'đồng biến':'nghịch biến'} trên khoảng nào dưới đây?`,correct:cor,wrongs:uniqBy(W,x=>x).filter(x=>x!==cor),
    sol:`Trên khoảng ${cor}, đồ thị ${inc?'đi lên':'đi xuống'} từ trái sang phải nên hàm số ${inc?'đồng biến':'nghịch biến'}.`,chk:()=>P.h!==P.k})}
});
TLN10b('t10-15-dom',6,'TH',[15],r=>{
  const a=r.int(1,8),b=r.int(1,8),q=r.int(-b,a),cnt=a+b+1-(q>=-b&&q<=a?1:0);
  return{kind:'tln',stem:`Tập xác định của hàm số ${I('y')} = ${rt(xlin(-1,a))} + ${rt(xlin(1,b))} + ${fr(1,xlin(1,-q))} có bao nhiêu số nguyên?`,ans:cnt,unit:'',
    sol:`Điều kiện: ${a} − x ≥ 0, x + ${b} ≥ 0, x ≠ ${sg(q)} ⟺ −${b} ≤ x ≤ ${a}, x ≠ ${sg(q)}. Số nguyên thoả mãn: ${a+b+1} − 1 = ${cnt}.`,chk:()=>cnt===a+b};
});
TLN10b('t10-15-taxi',6,'VD',[15],r=>{
  const T_=TAXI(r),x=r.int(T_.k+2,T_.k+25),v=T_.f(x);
  return{kind:'tln',stem:`Giá cước một hãng taxi: ${T_.p0} nghìn đồng cho 1 km đầu tiên; ${T_.p1} nghìn đồng/km từ km thứ 2 đến km thứ ${T_.k}; ${T_.p2} nghìn đồng/km từ km thứ ${T_.k+1} trở đi. Bạn Hà đi taxi hết ${v} nghìn đồng. Hỏi Hà đã đi bao nhiêu ki-lô-mét?`,ans:x,unit:'km',
    sol:`Đi ${T_.k} km hết ${T_.f(T_.k)} nghìn đồng < ${v} nên x > ${T_.k}: ${T_.f(T_.k)} + (x − ${T_.k})·${T_.p2} = ${v} ⇒ x = ${x}.`,chk:()=>true};
});
TL10b('tl10-15-fee',6,'TH','c',[15,16],r=>{
  const T_=TAXI(r),x1=r.int(2,T_.k),x2=r.int(T_.k+1,T_.k+15);
  return{kind:'tl',title:'Hàm số trong thực tế',parts:[
    {pts:.5,html:`Giá cước một hãng taxi: ${T_.p0} nghìn đồng cho 1 km đầu tiên; ${T_.p1} nghìn đồng/km từ km thứ 2 đến km thứ ${T_.k}; ${T_.p2} nghìn đồng/km từ km thứ ${T_.k+1} trở đi. Viết công thức tính số tiền ${I('f')}(${I('x')}) (nghìn đồng) phải trả khi đi ${I('x')} km (${I('x')} > 1).`},
    {pts:.5,html:`Tính số tiền phải trả khi đi ${x1} km và khi đi ${x2} km.`}],
    sol:[ptxt([[`Với 1 < x ≤ ${T_.k}: f(x) = ${T_.p0} + ${T_.p1}(x − 1).`,.25],[`Với x > ${T_.k}: f(x) = ${T_.f(T_.k)} + ${T_.p2}(x − ${T_.k}).`,.25]]),
      ptxt([[`f(${x1}) = ${T_.f(x1)} (nghìn đồng).`,.25],[`f(${x2}) = ${T_.f(x2)} (nghìn đồng).`,.25]])],chk:()=>true};
});

/* ===================== Bài 16: Hàm số bậc hai ===================== */
N10b('k10-16-vertex',6,'NB',[16],r=>{
  const P=parab10(r),ask=r.chance(.3);
  if(ask)return mkTxt(r,{stem:`Trục đối xứng của parabol ${qY(P.a,P.b,P.c)} là đường thẳng`,correct:`${I('x')} = ${sg(P.h)}`,wrongs:[`${I('x')} = ${sg(-P.h)}`,`${I('y')} = ${sg(P.h)}`,`${I('x')} = ${sg(P.k)}`,`${I('x')} = ${qh(Q(-P.b,P.a))}`,`${I('x')} = ${sg(P.h+1)}`,`${I('y')} = ${sg(P.k)}`,`${I('x')} = ${sg(P.h-2)}`],
    sol:`Trục đối xứng: x = ${fr(`−b`,`2a`)} = ${sg(P.h)}.`,chk:()=>P.h!==-P.h||P.h===0});
  return mkTxt(r,{stem:`Toạ độ đỉnh ${I('I')} của parabol ${qY(P.a,P.b,P.c)} là`,correct:`${I('I')}(${sg(P.h)}; ${sg(P.k)})`,wrongs:[[-P.h,P.f(-P.h)],[P.h,-P.k],[-P.h,P.k],[P.k,P.h],[P.h,P.c],[P.h+1,P.k],[P.h,P.k+1],[P.h-1,P.k-1]].map(p=>`${I('I')}(${sg(p[0])}; ${sg(p[1])})`),
    sol:`x${sub('I')} = ${fr('−b','2a')} = ${sg(P.h)}; y${sub('I')} = y(${sg(P.h)}) = ${sg(P.k)}.`,chk:()=>true});
});
N10b('k10-16-mono',6,'NB',[16],r=>{
  const P=parab10(r),inc=r.chance(.5),up=P.a>0,cor=inc===up?ivH(P.h,Infinity,[false,false]):ivH(-Infinity,P.h,[false,false]);
  return mkTxt(r,{stem:`Hàm số ${qY(P.a,P.b,P.c)} ${inc?'đồng biến':'nghịch biến'} trên khoảng nào dưới đây?`,correct:cor,wrongs:[inc===up?ivH(-Infinity,P.h,[false,false]):ivH(P.h,Infinity,[false,false]),ivH(-P.h===P.h?P.h+1:-P.h,Infinity,[false,false]),ivH(-Infinity,P.k,[false,false]),ivH(P.k,Infinity,[false,false]),ivH(P.h+1,Infinity,[false,false]),ivH(-Infinity,P.h-1,[false,false]),ivH(-Infinity,Infinity,[false,false])].filter((x,i,a)=>x!==cor&&a.indexOf(x)===i),
    sol:`a = ${sg(P.a)} ${up?'> 0':'< 0'}, đỉnh có hoành độ ${sg(P.h)}: hàm số ${up?'nghịch biến':'đồng biến'} trên (−∞; ${sg(P.h)}) và ${up?'đồng biến':'nghịch biến'} trên (${sg(P.h)}; +∞).`,chk:()=>true});
});
N10b('k10-16-graph',6,'TH',[16],r=>{
  for(;;){const P=parab10(r,{as:[1,-1]});if(P.h===0)continue;
    const cor=qY(P.a,P.b,P.c),W=uniqBy([qY(-P.a,-P.b,-P.c),qY(P.a,-P.b,P.c),qY(P.a,P.b,P.c+1),qY(-P.a,P.b,P.c),qY(P.a,P.b+P.a*2,P.c)],x=>x).filter(x=>x!==cor);
    return mkTxt(r,{stem:`Đường cong trong hình bên là đồ thị của hàm số nào dưới đây?${parFig10(P)}`,correct:cor,wrongs:W,
      sol:`Parabol ${P.a>0?'quay bề lõm lên trên nên a > 0':'quay bề lõm xuống dưới nên a < 0'}, đỉnh I(${sg(P.h)}; ${sg(P.k)}) và cắt trục tung tại điểm có tung độ ${sg(P.c)}. Chỉ hàm số ${cor} thoả mãn.`,chk:()=>true})}
});
N10b('k10-16-sign',6,'TH',[16],r=>{
  for(;;){const P=parab10(r,{as:[1,-1]});if(P.h===0||P.c===0)continue;const sa=P.a>0,sb=P.b>0,sc=P.c>0,H=(x,y,z)=>`${I('a')} ${x?'>':'<'} 0, ${I('b')} ${y?'>':'<'} 0, ${I('c')} ${z?'>':'<'} 0`;
    const cor=H(sa,sb,sc),W=[H(sa,!sb,sc),H(!sa,sb,sc),H(sa,sb,!sc),H(!sa,!sb,!sc)];
    return mkTxt(r,{stem:`Cho hàm số ${I('y')} = ${I('a')}${I('x')}${sup(2)} + ${I('b')}${I('x')} + ${I('c')} có đồ thị như hình bên.${graphSVG(P.f,{...parView10(P),w:210,h:200})}Khẳng định nào sau đây đúng?`,correct:cor,wrongs:W,
      sol:`Bề lõm ${sa?'hướng lên nên a > 0':'hướng xuống nên a < 0'}; đồ thị cắt Oy tại điểm ${sc?'phía trên':'phía dưới'} O nên c ${sc?'>':'<'} 0; trục đối xứng x = −b/(2a) ${P.h>0?'> 0':'< 0'} nên a, b ${P.h>0?'trái dấu':'cùng dấu'}: b ${sb?'>':'<'} 0.`,chk:()=>true})}
});
N10b('k10-16-max',6,'TH',[16],r=>{
  const P=parab10(r),onR=r.chance(.6);
  if(onR)return mkNum(r,{stem:`Giá trị ${P.a>0?'nhỏ nhất':'lớn nhất'} của hàm số ${qY(P.a,P.b,P.c)} là`,correct:P.k,ok:()=>true,cands:[P.h,P.c,-P.k,P.f(-P.h),P.k+P.a],
    sol:`a ${P.a>0?'> 0':'< 0'} nên hàm số đạt giá trị ${P.a>0?'nhỏ nhất':'lớn nhất'} tại đỉnh x = ${sg(P.h)}: y = ${sg(P.k)}.`,chk:()=>true});
  const lo=P.h+r.int(1,2),hi=lo+r.int(1,3),vals=[P.f(lo),P.f(hi)],v=P.a>0?Math.min(...vals):Math.max(...vals);
  return mkNum(r,{stem:`Giá trị ${P.a>0?'nhỏ nhất':'lớn nhất'} của hàm số ${qY(P.a,P.b,P.c)} trên đoạn [${sg(lo)}; ${sg(hi)}] là`,correct:v,ok:()=>true,cands:[P.k,P.a>0?Math.max(...vals):Math.min(...vals),P.c,v+1],
    sol:`Đỉnh x = ${sg(P.h)} không thuộc đoạn [${sg(lo)}; ${sg(hi)}] và hàm số ${P.a>0?'đồng biến':'nghịch biến'} trên đoạn này nên giá trị cần tìm là y(${sg(lo)}) = ${sg(v)}.`,chk:()=>v===P.f(lo)});
});
N10b('k10-16-find',6,'VD',[16],r=>{
  for(;;){const P=parab10(r,{as:[1,-1,2,-2,3]}),ask=r.int(0,1);if(P.h===0)continue;
  return mkTxt(r,{stem:`Parabol ${I('y')} = ${I('a')}${I('x')}${sup(2)} + ${I('b')}${I('x')} ${P.c<0?MINUS:'+'} ${Math.abs(P.c)} có đỉnh ${I('I')}(${sg(P.h)}; ${sg(P.k)}) với ${I('h')} ≠ 0. Parabol đó là`.replace(` với ${I('h')} ≠ 0`,''),correct:qY(P.a,P.b,P.c),wrongs:uniqBy([qY(-P.a,-P.b,P.c),qY(P.a,-P.b,P.c),qY(2*P.a,P.b,P.c),qY(P.a,2*P.b,P.c),qY(P.a+1||2,P.b,P.c),qY(P.a,P.b+1,P.c),qY(P.a,P.b-1,P.c)],x=>x).filter(x=>x!==qY(P.a,P.b,P.c)),
    sol:`Đỉnh I(${sg(P.h)}; ${sg(P.k)}): −b/(2a) = ${sg(P.h)} và a·${pp10('·'+sg(P.h)).slice(1)}² + b·${pp10('·'+sg(P.h)).slice(1)} ${P.c<0?MINUS:'+'} ${Math.abs(P.c)} = ${sg(P.k)} ⇒ b = ${sg(-2*P.h)}a, ${pp10(`${sg(-P.h*P.h)}a`)} ${P.c<0?MINUS:'+'} ${Math.abs(P.c)} = ${sg(P.k)} ⇒ a = ${sg(P.a)}, b = ${sg(P.b)}.`,chk:()=>P.h!==0&&ask>=0})}
});
DS10b('ds10-16-par',6,'TH',[16],r=>{
  for(;;){const P=parab10(r);if(P.h===0||P.c===0)continue;const up=P.a>0;
    return mkDS(r,{stem:`Cho hàm số bậc hai ${qY(P.a,P.b,P.c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Đồ thị hàm số có đỉnh ${I('I')}(${sg(P.h)}; ${sg(P.k)}).`,f:`Đồ thị hàm số có đỉnh ${I('I')}(${sg(-P.h)}; ${sg(P.f(-P.h))}).`,why:`x${sub('I')} = −b/(2a) = ${sg(P.h)}, y${sub('I')} = ${sg(P.k)}.`},
      {t:`Hàm số ${up?'đồng biến':'nghịch biến'} trên khoảng (${sg(P.h)}; +∞).`,f:`Hàm số ${up?'nghịch biến':'đồng biến'} trên khoảng (${sg(P.h)}; +∞).`,why:`a ${up?'> 0':'< 0'} nên hàm số ${up?'đồng biến':'nghịch biến'} trên (${sg(P.h)}; +∞).`},
      {t:`Đồ thị hàm số cắt trục tung tại điểm (0; ${sg(P.c)}).`,f:`Đồ thị hàm số cắt trục tung tại điểm (${sg(P.c)}; 0).`,why:`x = 0 ⇒ y = ${sg(P.c)}.`},
      {t:`Giá trị ${up?'nhỏ nhất':'lớn nhất'} của hàm số bằng ${sg(P.k)}.`,f:`Giá trị ${up?'lớn nhất':'nhỏ nhất'} của hàm số bằng ${sg(P.k)}.`,why:`a ${up?'> 0':'< 0'} nên hàm số đạt giá trị ${up?'nhỏ nhất':'lớn nhất'} ${sg(P.k)} tại đỉnh.`}],chk:()=>P.c!==0})}
});
TLN10b('t10-16-find',6,'TH',[16],r=>{
  for(;;){const P=parab10(r,{as:[1,-1,2,-2]});if(P.h===0)continue;
    return{kind:'tln',stem:`Biết parabol ${I('y')} = ${I('a')}${I('x')}${sup(2)} + ${I('b')}${I('x')} + ${I('c')} đi qua điểm ${I('A')}(0; ${sg(P.c)}) và có đỉnh ${I('I')}(${sg(P.h)}; ${sg(P.k)}). Tính ${I('a')} + ${I('b')} + ${I('c')}.`,ans:P.a+P.b+P.c,unit:'',
      sol:`c = ${sg(P.c)}; −b/(2a) = ${sg(P.h)} ⇒ b = ${sg(-2*P.h)}a; y(${sg(P.h)}) = ${sg(P.k)} ⇒ a = ${sg(P.a)}, b = ${sg(P.b)}. Vậy a + b + c = ${sg(P.a+P.b+P.c)}.`,chk:()=>true}}
});
TLN10b('t10-16-ball',6,'VD',[16],r=>{
  const v=r.int(8,25),h0=r.pick([1,1.2,1.5,1.6,2]),tm=v/9.8,H=h0+v*v/(2*9.8),ans=Math.round(H*10)/10;
  return{kind:'tln',stem:`Một quả bóng được ném thẳng đứng lên từ độ cao ${fmt(h0)} m với vận tốc ban đầu ${v} m/s. Độ cao của quả bóng sau ${I('t')} giây là ${I('h')}(${I('t')}) = ${MINUS}4,9${I('t')}${sup(2)} + ${v}${I('t')} + ${fmt(h0)} (m). Tính độ cao lớn nhất của quả bóng (đơn vị: mét, làm tròn kết quả đến hàng phần mười).`,ans,unit:'m',
    sol:`h(t) là hàm số bậc hai có a = −4,9 < 0 nên đạt giá trị lớn nhất tại t = ${fr(v,'9,8')} ≈ ${fmt(Math.round(tm*100)/100)} (s); h${sub('max')} = ${fmt(h0)} + ${fr(`${v}²`,'4·4,9')} ≈ ${fmt(ans)} (m).`,chk:()=>Math.abs(H*10-Math.round(H*10))!==.5};
});
TLN10b('t10-16-profit',6,'VD',[16],r=>{
  for(;;){const c=r.int(10,40),A=r.int(80,200),k=r.pick([1,2,4,5]),x0=(A+k*c)/(2*k);if(!isInt(x0)||x0<=c)continue;/* lợi nhuận (x − c)(A − kx) */
    return{kind:'tln',stem:`Một cửa hàng nhập một loại áo với giá ${c} nghìn đồng/chiếc. Nếu bán với giá ${I('x')} nghìn đồng/chiếc thì mỗi tháng bán được ${A} ${MINUS} ${k===1?'':k}${I('x')} chiếc (${c} ≤ ${I('x')} ≤ ${A/k}). Hỏi cửa hàng nên bán với giá bao nhiêu nghìn đồng/chiếc để lợi nhuận mỗi tháng lớn nhất?`.replace(`≤ ${A/k})`,`≤ ${fmt(A/k)})`),ans:x0,unit:'',
      sol:`Lợi nhuận L(x) = (x − ${c})(${A} − ${k===1?'':k}x) = ${MINUS}${k===1?'':k}x² + ${A+k*c}x − ${A*c}, là hàm số bậc hai có a < 0 nên lớn nhất tại x = ${fr(A+k*c,2*k)} = ${x0}.`,chk:()=>true}}
});
TL10b('tl10-16-graph',6,'TH','a',[16],r=>{
  for(;;){const P=parab10(r,{as:[1,-1]});if(P.h===0)continue;const up=P.a>0;
    return{kind:'tl',title:'Hàm số bậc hai',parts:[
      {pts:.5,html:`Lập bảng biến thiên và vẽ đồ thị của hàm số ${qY(P.a,P.b,P.c)}.`},
      {pts:.5,html:`Dựa vào đồ thị, tìm các giá trị của tham số ${I('m')} để đường thẳng ${I('y')} = ${I('m')} cắt đồ thị hàm số trên tại hai điểm phân biệt.`}],
      sol:[ptxt([[`Đỉnh I(${sg(P.h)}; ${sg(P.k)}), trục đối xứng x = ${sg(P.h)}; a ${up?'> 0':'< 0'} nên hàm số ${up?'nghịch biến':'đồng biến'} trên (−∞; ${sg(P.h)}), ${up?'đồng biến':'nghịch biến'} trên (${sg(P.h)}; +∞).${bbtQ10(sg(P.h),sg(P.k),P.a)}`,.25],[`Đồ thị là parabol đỉnh I, đi qua các điểm (0; ${sg(P.c)}), (${sg(2*P.h)}; ${sg(P.c)}), (${sg(P.h+1)}; ${sg(P.f(P.h+1))}), (${sg(P.h-1)}; ${sg(P.f(P.h-1))}).${parFig10(P)}`,.25]]),
        ptxt([[`Đường thẳng y = m song song (hoặc trùng) với trục hoành.`,.25],[`Cắt parabol tại hai điểm phân biệt khi m ${up?'>':'<'} ${sg(P.k)}.`,.25]])],chk:()=>true}}
});
TL10b('tl10-16-arch',6,'VD','c',[16],r=>{
  const w=r.pick([6,8,10,12,16,20]),h=r.pick([4,5,6,8,9,12]),d=r.int(1,w/2-1),hy=h*(1-(2*(w/2-d)/w)**2);/* parabol y = −(4h/w²)x² + h, gốc toạ độ tại trung điểm chân cổng */
  return{kind:'tl',title:'Ứng dụng hàm số bậc hai',parts:[
    {pts:.5,html:`Một cổng có dạng parabol, khoảng cách giữa hai chân cổng là ${w} m, chiều cao của cổng (tính từ đỉnh đến mặt đất) là ${h} m. Chọn hệ trục toạ độ ${I('Oxy')} với ${I('O')} là trung điểm của đoạn nối hai chân cổng, trục ${I('Oy')} đi qua đỉnh cổng. Viết phương trình parabol.`},
    {pts:.5,html:`Tính chiều cao của cổng tại vị trí cách chân cổng ${d} m (làm tròn đến hàng phần trăm của mét).`}],
    sol:[ptxt([[`Parabol có dạng y = ax² + ${h} và đi qua điểm (${w/2}; 0).`,.25],[`a·${(w/2)**2} + ${h} = 0 ⇒ a = ${qh(Q(-h,(w/2)**2))}; y = ${qh(Q(-h,(w/2)**2))}x² + ${h}.`,.25]]),
      ptxt([[`Vị trí cách chân cổng ${d} m có hoành độ x = ${w/2-d} (hoặc ${MINUS}${w/2-d}).`,.25],[`y = ${qh(Q(-h,(w/2)**2))}·${(w/2-d)**2} + ${h} ${isInt(hy*100)?'=':'≈'} ${fmt(Math.round(hy*100)/100)} (m).`,.25]])],chk:()=>hy>0};
});
TL10b('tl10-16-profit',6,'VD','c',[16],r=>{
  for(;;){const c=r.int(10,40),A=r.int(80,200),k=r.pick([1,2,4,5]),x0=(A+k*c)/(2*k);if(!isInt(x0)||x0<=c)continue;const L=(x0-c)*(A-k*x0),x1=r.int(c+1,x0-1);if(x1<=c)continue;
    return{kind:'tl',title:'Bài toán lợi nhuận',parts:[
      {pts:.5,html:`Một cửa hàng nhập một loại túi với giá ${c} nghìn đồng/chiếc. Nếu bán với giá ${I('x')} nghìn đồng/chiếc thì mỗi tháng bán được ${A} ${MINUS} ${k===1?'':k}${I('x')} chiếc. Viết hàm số ${I('L')}(${I('x')}) biểu thị lợi nhuận mỗi tháng và tính lợi nhuận khi bán với giá ${x1} nghìn đồng/chiếc.`},
      {pts:.5,html:`Cửa hàng nên bán với giá bao nhiêu để lợi nhuận lớn nhất? Tính lợi nhuận lớn nhất đó.`}],
      sol:[ptxt([[`L(x) = (x − ${c})(${A} − ${k===1?'':k}x) = ${MINUS}${k===1?'':k}x² + ${A+k*c}x − ${A*c}.`,.25],[`L(${x1}) = ${(x1-c)*(A-k*x1)} (nghìn đồng).`,.25]]),
        ptxt([[`L(x) là hàm số bậc hai với a < 0, đạt giá trị lớn nhất tại x = ${fr(A+k*c,2*k)} = ${x0}.`,.25],[`L${sub('max')} = L(${x0}) = ${L} (nghìn đồng).`,.25]])],chk:()=>L>0}}
});

/* ===================== Bài 17: Dấu của tam thức bậc hai ===================== */
/* tam thức a(x − p)(x − q) với p < q nguyên */
const tri10=(r,o={})=>{for(;;){const a=o.a||r.pick([1,-1,2,1,-1,-2]),p=r.int(-5,4),q=p+r.int(1,6);return{a,p,q,b:-a*(p+q),c:a*p*q,f:x=>a*(x-p)*(x-q)}}};
const ivU=(p,q,cl)=>`(−∞; ${sg(p)}${cl?']':')'} ∪ ${cl?'[':'('}${sg(q)}; +∞)`,ivM=(p,q,cl)=>`${cl?'[':'('}${sg(p)}; ${sg(q)}${cl?']':')'}`;
N10b('k10-17-sign',6,'NB',[17],r=>{
  const Tq=tri10(r),pos=r.chance(.5),out=(Tq.a>0)===pos;/* f > 0 ngoài khoảng nghiệm nếu a > 0 */
  const cor=out?`${I('x')} < ${sg(Tq.p)} hoặc ${I('x')} > ${sg(Tq.q)}`:`${sg(Tq.p)} < ${I('x')} < ${sg(Tq.q)}`;
  const W=[out?`${sg(Tq.p)} < ${I('x')} < ${sg(Tq.q)}`:`${I('x')} < ${sg(Tq.p)} hoặc ${I('x')} > ${sg(Tq.q)}`,`${I('x')} < ${sg(-Tq.q)} hoặc ${I('x')} > ${sg(-Tq.p)}`,`${sg(-Tq.q)} < ${I('x')} < ${sg(-Tq.p)}`,`${I('x')} > ${sg(Tq.q)}`,`${I('x')} < ${sg(Tq.p)}`,`${I('x')} > ${sg(Tq.p)}`];
  return mkTxt(r,{stem:`Tam thức bậc hai ${I('f')}(${I('x')}) = ${xquad(Tq.a,Tq.b,Tq.c)} ${pos?'dương':'âm'} khi và chỉ khi`,correct:cor,wrongs:uniqBy(W,x=>x).filter(x=>x!==cor),
    sol:`f(x) có hai nghiệm x = ${sg(Tq.p)}, x = ${sg(Tq.q)} và a = ${sg(Tq.a)} ${Tq.a>0?'> 0':'< 0'}: f(x) cùng dấu với a ở ngoài khoảng hai nghiệm, trái dấu với a ở trong khoảng hai nghiệm. Do đó f(x) ${pos?'> 0':'< 0'} ⟺ ${cor}.`,chk:()=>true});
});
N10b('k10-17-solve',6,'TH',[17],r=>{
  const t=r.int(0,4);
  if(t<3){const Tq=tri10(r),op=r.pick(['>','≥','<','≤']),cl=op.length>1||op==='≥'||op==='≤',big=op==='>'||op==='≥',out=(Tq.a>0)===big,cl2=op==='≥'||op==='≤';
    const cor=out?ivU(Tq.p,Tq.q,cl2):ivM(Tq.p,Tq.q,cl2),W=[out?ivM(Tq.p,Tq.q,cl2):ivU(Tq.p,Tq.q,cl2),out?ivU(Tq.p,Tq.q,!cl2):ivM(Tq.p,Tq.q,!cl2),out?ivU(-Tq.q,-Tq.p,cl2):ivM(-Tq.q,-Tq.p,cl2)];
    return mkTxt(r,{stem:`Tập nghiệm của bất phương trình ${xquad(Tq.a,Tq.b,Tq.c)} ${op} 0 là`,correct:cor,wrongs:uniqBy(W,x=>x).filter(x=>x!==cor).concat([RR]),
      sol:`Tam thức có hai nghiệm ${sg(Tq.p)} và ${sg(Tq.q)}, a ${Tq.a>0?'> 0':'< 0'}. Xét dấu ta được tập nghiệm S = ${cor}.`,chk:()=>cl===cl||true})}
  /* Δ < 0 hoặc Δ = 0 */
  const a=r.pick([1,-1]),h=r.int(-4,4),k=t===3?r.int(1,5):0,b=-2*a*h,c=a*h*h+a*k,op=r.pick(['>','≥','<','≤']),f=x=>a*((x-h)**2+k);
  const posAlways=a>0;/* f ≥ 0 khi a > 0 */
  let cor;if(k>0){const sat=(op==='>'||op==='≥')===posAlways;cor=sat?RR:'∅'}else{const big=op==='>'||op==='≥',strict=op.length===1&&(op==='>'||op==='<');
    if(big===posAlways)cor=strict?`${RR} \\ {${sg(h)}}`:RR;else cor=strict?'∅':`{${sg(h)}}`}
  return mkTxt(r,{stem:`Tập nghiệm của bất phương trình ${xquad(a,b,c)} ${op} 0 là`,correct:cor,wrongs:[RR,'∅',`${RR} \\ {${sg(h)}}`,`{${sg(h)}}`,`(${sg(h)}; +∞)`].filter(x=>x!==cor),
    sol:`${xquad(a,b,c)} = ${a<0?MINUS:''}[(x ${h<0?'+':MINUS} ${Math.abs(h)})²${k?' + '+k:''}]${k?`, Δ < 0 nên tam thức luôn ${posAlways?'dương':'âm'}`:`, tam thức có nghiệm kép x = ${sg(h)} và ${posAlways?'không âm':'không dương'} với mọi x`}. Vậy S = ${cor}.`.replace('(x − 0)','x').replace('(x + 0)','x'),chk:()=>[h-1,h,h+1].every(x=>true)&&f(h)===a*k});
});
N10b('k10-17-graph',6,'TH',[17],r=>{
  for(;;){const Tq=tri10(r,{a:r.pick([1,-1])});if(Tq.q-Tq.p<2||Tq.q-Tq.p>6)continue;const P={a:Tq.a,b:Tq.b,c:Tq.c,h:(Tq.p+Tq.q)/2,k:Tq.f((Tq.p+Tq.q)/2),f:Tq.f};if(Math.abs(P.k)>9)continue;
    const pos=r.chance(.5),out=(Tq.a>0)===pos,cor=out?ivU(Tq.p,Tq.q,false):ivM(Tq.p,Tq.q,false);
    const V=parView10(P);V.x=[Math.min(V.x[0],Tq.p-1),Math.max(V.x[1],Tq.q+1)];
    return mkTxt(r,{stem:`Cho hàm số bậc hai ${I('y')} = ${I('f')}(${I('x')}) có đồ thị như hình bên.${graphSVG(P.f,{...V,xt:[Tq.p,Tq.q],w:210,h:200})}Tập nghiệm của bất phương trình ${I('f')}(${I('x')}) ${pos?'>':'<'} 0 là`,correct:cor,wrongs:[out?ivM(Tq.p,Tq.q,false):ivU(Tq.p,Tq.q,false),out?ivU(Tq.p,Tq.q,true):ivM(Tq.p,Tq.q,true),out?ivM(Tq.p,Tq.q,true):ivU(Tq.p,Tq.q,true)],
      sol:`f(x) ${pos?'> 0':'< 0'} ứng với phần đồ thị nằm ${pos?'phía trên':'phía dưới'} trục hoành: S = ${cor}.`,chk:()=>true})}
});
N10b('k10-17-dom',6,'TH',[17],r=>{
  const Tq=tri10(r),cor=Tq.a>0?ivU(Tq.p,Tq.q,true):ivM(Tq.p,Tq.q,true);
  return mkTxt(r,{stem:`Tập xác định của hàm số ${I('y')} = ${rt(xquad(Tq.a,Tq.b,Tq.c))} là`,correct:cor,wrongs:[Tq.a>0?ivM(Tq.p,Tq.q,true):ivU(Tq.p,Tq.q,true),Tq.a>0?ivU(Tq.p,Tq.q,false):ivM(Tq.p,Tq.q,false),Tq.a>0?ivM(Tq.p,Tq.q,false):ivU(Tq.p,Tq.q,false)],
    sol:`Hàm số xác định khi ${xquad(Tq.a,Tq.b,Tq.c)} ≥ 0 ⟺ x ∈ ${cor}.`,chk:()=>true});
});
/* điều kiện để x² − 2mx + (tm + k) > 0 với mọi x: Δ' = m² − tm − k < 0 ⟺ p < m < q */
const alw10=r=>{for(;;){const p=r.int(-5,3),q=p+r.int(2,7),t=p+q,k=-p*q;if(t===0&&k===0)continue;
  const e=`${I('x')}${sup(2)} ${MINUS} 2${I('m')}${I('x')}${(t||k)?plusH(lin3H([t,k],['m',''])):''}`;return{p,q,t,k,e}}};
N10b('k10-17-alw',6,'VD',[17],r=>{
  const A=alw10(r),cor=`${sg(A.p)} < ${I('m')} < ${sg(A.q)}`;
  return mkTxt(r,{stem:`Tìm tất cả các giá trị của tham số ${I('m')} để ${A.e} > 0 với mọi ${I('x')} ∈ ${RR}.`,correct:cor,wrongs:[`${sg(A.p)} ≤ ${I('m')} ≤ ${sg(A.q)}`,`${I('m')} < ${sg(A.p)} hoặc ${I('m')} > ${sg(A.q)}`,`${sg(-A.q)} < ${I('m')} < ${sg(-A.p)}`,`${I('m')} > ${sg(A.q)}`,`${I('m')} < ${sg(A.p)}`],
    sol:`Tam thức có a = 1 > 0 nên luôn dương ⟺ Δ' < 0 ⟺ m² ${plusH(lin3H([-A.t,-A.k],['m','']))} < 0 ⟺ ${cor}.`.replace('+ 0','').replace(/ \+ $/,''),chk:()=>true});
});
DS10b('ds10-17-tri',6,'TH',[17],r=>{
  const Tq=tri10(r,{a:r.pick([1,-1])}),up=Tq.a>0,n=Tq.q-Tq.p+1;
  return mkDS(r,{stem:`Cho tam thức bậc hai ${I('f')}(${I('x')}) = ${xquad(Tq.a,Tq.b,Tq.c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('f')}(${I('x')}) có hai nghiệm phân biệt ${sg(Tq.p)} và ${sg(Tq.q)}.`,f:`${I('f')}(${I('x')}) có hai nghiệm phân biệt ${sg(-Tq.p)} và ${sg(-Tq.q)}.`,why:`f(x) = ${Tq.a<0?MINUS:''}(${xlin(1,-Tq.p)})(${xlin(1,-Tq.q)}).`},
    {t:`${I('f')}(${I('x')}) ${up?'<':'>'} 0 với mọi ${I('x')} ∈ ${ivM(Tq.p,Tq.q,false)}.`,f:`${I('f')}(${I('x')}) ${up?'>':'<'} 0 với mọi ${I('x')} ∈ ${ivM(Tq.p,Tq.q,false)}.`,why:`Trong khoảng hai nghiệm, f(x) trái dấu với a.`},
    {t:`Bất phương trình ${I('f')}(${I('x')}) ${up?'≤':'≥'} 0 có đúng ${n} nghiệm nguyên.`,f:`Bất phương trình ${I('f')}(${I('x')}) ${up?'≤':'≥'} 0 có đúng ${n-1} nghiệm nguyên.`,why:`Tập nghiệm ${ivM(Tq.p,Tq.q,true)} có ${n} số nguyên.`},
    {t:`Tập nghiệm của bất phương trình ${I('f')}(${I('x')}) ${up?'>':'<'} 0 là ${ivU(Tq.p,Tq.q,false)}.`,f:`Tập nghiệm của bất phương trình ${I('f')}(${I('x')}) ${up?'>':'<'} 0 là ${ivM(Tq.p,Tq.q,false)}.`,why:`Ngoài khoảng hai nghiệm, f(x) cùng dấu với a.`}],chk:()=>n>=2});
});
TLN10b('t10-17-int',6,'TH',[17],r=>{
  for(;;){const s=r.pick([2,3]),p=r.int(-4,2),u=r.int(1,s-1)+s*r.int(1,4),q=Q(u,s);/* nghiệm p và u/s */
    const a=s,b=-(s*p+u),c=p*u,lo=Math.min(p,u/s),hi=Math.max(p,u/s),cnt=Math.floor(hi)-Math.ceil(lo)+1;if(u/s<=p)continue;
    return{kind:'tln',stem:`Bất phương trình ${xquad(a,b,c)} ≤ 0 có bao nhiêu nghiệm nguyên?`,ans:cnt,unit:'',sol:`Tam thức có hai nghiệm ${sg(p)} và ${qh(q)}; a > 0 nên tập nghiệm là [${sg(p)}; ${qh(q)}], chứa ${cnt} số nguyên.`,chk:()=>true}}
});
TLN10b('t10-17-m',6,'VD',[17],r=>{
  const A=alw10(r),cnt=A.q-A.p-1;
  return{kind:'tln',stem:`Có bao nhiêu giá trị nguyên của tham số ${I('m')} để ${A.e} > 0 với mọi ${I('x')} ∈ ${RR}?`,ans:cnt,unit:'',
    sol:`Δ' = m² ${plusH(lin3H([-A.t,-A.k],['m','']))} < 0 ⟺ ${sg(A.p)} < m < ${sg(A.q)}; có ${cnt} số nguyên m.`,chk:()=>cnt>=1};
});
TLN10b('t10-17-real',6,'VD',[17],r=>{
  for(;;){const v=r.pick([20,25,30,35,40]),H=r.int(10,40),h0=0;/* h(t) = −5t² + vt > H */
    const D=v*v-20*H;if(D<=0)continue;const t1=(v-Math.sqrt(D))/10,t2=(v+Math.sqrt(D))/10,ans=Math.round((t2-t1)*100)/100;if(Math.abs((t2-t1)*100-Math.round((t2-t1)*100))>.49)continue;
    return{kind:'tln',stem:`Một quả bóng được đá lên từ mặt đất, độ cao của bóng sau ${I('t')} giây là ${I('h')}(${I('t')}) = ${MINUS}5${I('t')}${sup(2)} + ${v}${I('t')} (m). Quả bóng ở độ cao trên ${H} m trong khoảng thời gian bao nhiêu giây (làm tròn kết quả đến hàng phần trăm)?`,ans,unit:'giây',
      sol:`h(t) > ${H} ⟺ 5t² − ${v}t + ${H} < 0 ⟺ ${fmt(Math.round(t1*100)/100)} < t < ${fmt(Math.round(t2*100)/100)} (xấp xỉ). Khoảng thời gian: t₂ − t₁ = ${fr(rt(D),5)} ≈ ${fmt(ans)} (giây).`,chk:()=>h0===0}}
});
TL10b('tl10-17-ineq',6,'TH','a',[17],r=>{
  const A=tri10(r),B=tri10(r,{a:r.pick([1,-1])}),op1=r.pick(['>','≤']),op2=r.pick(['≥','<']);
  const sol=(Tq,op)=>{const big=op==='>'||op==='≥',cl=op==='≥'||op==='≤',out=(Tq.a>0)===big;return out?ivU(Tq.p,Tq.q,cl):ivM(Tq.p,Tq.q,cl)};
  return{kind:'tl',title:'Bất phương trình bậc hai một ẩn',parts:[
    {pts:.5,html:`Giải bất phương trình ${xquad(A.a,A.b,A.c)} ${op1} 0.`},{pts:.5,html:`Giải bất phương trình ${xquad(B.a,B.b,B.c)} ${op2} 0.`}],
    sol:[ptxt([[`Tam thức có hai nghiệm ${sg(A.p)}, ${sg(A.q)}, hệ số a = ${sg(A.a)}.`,.25],[`Tập nghiệm S = ${sol(A,op1)}.`,.25]]),ptxt([[`Tam thức có hai nghiệm ${sg(B.p)}, ${sg(B.q)}, hệ số a = ${sg(B.a)}.`,.25],[`Tập nghiệm S = ${sol(B,op2)}.`,.25]])],chk:()=>true};
});
TL10b('tl10-17-param',6,'VD','a',[17],r=>{
  const A=alw10(r),p=r.int(1,6);
  return{kind:'tl',title:'Dấu của tam thức bậc hai',parts:[
    {pts:.5,html:`Tìm các giá trị của tham số ${I('m')} để ${A.e} > 0 với mọi ${I('x')} ∈ ${RR}.`},
    {pts:.5,html:`Tìm các giá trị của tham số ${I('m')} để phương trình ${I('x')}${sup(2)} ${MINUS} 2${I('x')} + ${I('m')} ${MINUS} ${p} = 0 có hai nghiệm trái dấu.`}],
    sol:[ptxt([[`a = 1 > 0 nên yêu cầu ⟺ Δ' < 0 ⟺ m² ${plusH(lin3H([-A.t,-A.k],['m','']))} < 0.`,.25],[`⟺ ${sg(A.p)} < m < ${sg(A.q)}.`,.25]]),
      ptxt([[`Phương trình có hai nghiệm trái dấu ⟺ a·c < 0 ⟺ m − ${p} < 0.`,.25],[`⟺ m < ${p}.`,.25]])],chk:()=>true};
});

/* ===================== Bài 18: Phương trình quy về phương trình bậc hai ===================== */
/* √(x² + Bx + C) = √(dx + e): bình phương được x² + (B − d)x + (C − e) = 0 có nghiệm r1 < r2, chỉ r2 thoả dx + e ≥ 0 (hoặc cả hai) */
const eq18a=r=>{for(;;){const r1=r.int(-5,3),r2=r1+r.int(1,6),d=r.pick([1,2,-1,3]),both=r.chance(.35);
  let e;if(both)e=-Math.min(d*r1,d*r2)+r.int(0,3);else{const lo=Math.min(d*r1,d*r2),hi=Math.max(d*r1,d*r2);e=-hi+r.int(0,Math.max(0,hi-lo-1));if(d*r1+e>=0&&d*r2+e>=0)continue}
  const B=d-(r1+r2),C=e+r1*r2,ok=[r1,r2].filter(x=>d*x+e>=0);if(!ok.length)continue;return{r1,r2,d,e,B,C,ok}}};
N10b('k10-18-sq1',6,'TH',[18],r=>{
  const E=eq18a(r),S=`{${E.ok.map(sg).join('; ')}}`,W=[`{${[E.r1,E.r2].map(sg).join('; ')}}`,`{${sg(E.r1)}}`,`{${sg(E.r2)}}`,'∅',`{${sg(-E.r2)}}`].filter(x=>x!==S);
  return mkTxt(r,{stem:`Tập nghiệm của phương trình ${rt(xquad(1,E.B,E.C))} = ${rt(xlin(E.d,E.e))} là`,correct:S,wrongs:uniqBy(W,x=>x),
    sol:`Bình phương hai vế: ${xquad(1,E.B,E.C)} = ${xlin(E.d,E.e)} ⇒ ${xquad(1,E.B-E.d,E.C-E.e)} = 0 ⇒ x = ${sg(E.r1)} hoặc x = ${sg(E.r2)}. Thử lại (điều kiện ${xlin(E.d,E.e)} ≥ 0): ${[E.r1,E.r2].map(x=>`x = ${sg(x)} ${E.ok.includes(x)?'thoả mãn':'loại'}`).join('; ')}. Vậy S = ${S}.`,chk:()=>true});
});
/* √(2x² + Bx + C) = x + k: bình phương được x² + (B − 2k)x + (C − k²) = 0 có nghiệm r1 < r2 */
const eq18b=r=>{for(;;){const r1=r.int(-6,3),r2=r1+r.int(1,6),both=r.chance(.3),k=both?-r1+r.int(0,2):-r2+r.int(0,r2-r1-1)+0;/* điều kiện x ≥ −k */
  const ok=[r1,r2].filter(x=>x+k>=0);if(!ok.length||(!both&&ok.length===2))continue;const B=2*k-(r1+r2),C=k*k+r1*r2;if(k===0)continue;return{r1,r2,k,B,C,ok}}};
N10b('k10-18-sq2',6,'VD',[18],r=>{
  const E=eq18b(r),S=`{${E.ok.map(sg).join('; ')}}`,W=[`{${[E.r1,E.r2].map(sg).join('; ')}}`,`{${sg(E.r1)}}`,`{${sg(E.r2)}}`,'∅'].filter(x=>x!==S);
  return mkTxt(r,{stem:`Tập nghiệm của phương trình ${rt(xquad(2,E.B,E.C))} = ${xlin(1,E.k)} là`,correct:S,wrongs:uniqBy(W,x=>x),
    sol:`Bình phương hai vế: ${xquad(2,E.B,E.C)} = (${xlin(1,E.k)})² ⇒ ${xquad(1,E.B-2*E.k,E.C-E.k*E.k)} = 0 ⇒ x = ${sg(E.r1)} hoặc x = ${sg(E.r2)}. Thử lại với điều kiện ${xlin(1,E.k)} ≥ 0: ${[E.r1,E.r2].map(x=>`x = ${sg(x)} ${E.ok.includes(x)?'thoả mãn':'loại'}`).join('; ')}. Vậy S = ${S}.`,chk:()=>true});
});
DS10b('ds10-18-eq',6,'VD',[18],r=>{
  const E=eq18b(r),sum=E.ok.reduce((s,x)=>s+x,0);
  return mkDS(r,{stem:`Cho phương trình ${rt(xquad(2,E.B,E.C))} = ${xlin(1,E.k)} (1). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Bình phương hai vế của (1) ta được phương trình ${xquad(1,E.B-2*E.k,E.C-E.k*E.k)} = 0.`,f:`Bình phương hai vế của (1) ta được phương trình ${xquad(1,E.B,E.C-E.k*E.k)} = 0.`,why:`${xquad(2,E.B,E.C)} = ${xquad(1,2*E.k,E.k*E.k)} ⟺ ${xquad(1,E.B-2*E.k,E.C-E.k*E.k)} = 0.`},
    {t:`${I('x')} = ${sg(E.ok[0])} là một nghiệm của (1).`,f:`${I('x')} = ${sg(E.r1+E.r2-E.ok[0])} là một nghiệm của (1).`,why:`Thử lại: chỉ các giá trị thoả mãn x ${E.k>0?'≥ '+sg(-E.k):'≥ '+sg(-E.k)} là nghiệm.`},
    {t:`Phương trình (1) có đúng ${E.ok.length} nghiệm.`,f:`Phương trình (1) có đúng ${3-E.ok.length} nghiệm.`,why:`Tập nghiệm S = {${E.ok.map(sg).join('; ')}}.`},
    {t:`Tổng các nghiệm của (1) bằng ${sg(sum)}.`,f:`Tổng các nghiệm của (1) bằng ${sg(E.r1+E.r2)===sg(sum)?sg(sum+1):sg(E.r1+E.r2)}.`,why:`Tổng các nghiệm bằng ${sg(sum)}.`}],chk:()=>E.ok.length===1?E.r1+E.r2!==E.ok[0]||true:true});
});
TLN10b('t10-18-sum',6,'TH',[18],r=>{
  const E=eq18a(r),s=E.ok.reduce((x,y)=>x+y,0);
  return{kind:'tln',stem:`Tính tổng các nghiệm của phương trình ${rt(xquad(1,E.B,E.C))} = ${rt(xlin(E.d,E.e))}.`,ans:s,unit:'',sol:`Bình phương: ${xquad(1,E.B-E.d,E.C-E.e)} = 0 ⇒ x = ${sg(E.r1)} hoặc x = ${sg(E.r2)}; thử lại được S = {${E.ok.map(sg).join('; ')}}, tổng bằng ${sg(s)}.`,chk:()=>true};
});
TLN10b('t10-18-root',6,'VD',[18],r=>{
  const E=eq18b(r),s=E.ok.reduce((x,y)=>x+y,0);
  return{kind:'tln',stem:`Tính tổng các nghiệm của phương trình ${rt(xquad(2,E.B,E.C))} = ${xlin(1,E.k)}.`,ans:s,unit:'',sol:`Bình phương: ${xquad(1,E.B-2*E.k,E.C-E.k*E.k)} = 0 ⇒ x = ${sg(E.r1)} hoặc x = ${sg(E.r2)}; điều kiện ${xlin(1,E.k)} ≥ 0 cho S = {${E.ok.map(sg).join('; ')}}, tổng bằng ${sg(s)}.`,chk:()=>true};
});
TL10b('tl10-18-root',6,'VD','a',[18],r=>{
  const A=eq18a(r),B=eq18b(r);
  return{kind:'tl',title:'Phương trình quy về phương trình bậc hai',parts:[
    {pts:.5,html:`Giải phương trình ${rt(xquad(1,A.B,A.C))} = ${rt(xlin(A.d,A.e))}.`},{pts:.5,html:`Giải phương trình ${rt(xquad(2,B.B,B.C))} = ${xlin(1,B.k)}.`}],
    sol:[ptxt([[`Bình phương hai vế: ${xquad(1,A.B-A.d,A.C-A.e)} = 0 ⇒ x = ${sg(A.r1)} hoặc x = ${sg(A.r2)}.`,.25],[`Thử lại: S = {${A.ok.map(sg).join('; ')}}.`,.25]]),
      ptxt([[`Bình phương hai vế: ${xquad(1,B.B-2*B.k,B.C-B.k*B.k)} = 0 ⇒ x = ${sg(B.r1)} hoặc x = ${sg(B.r2)}.`,.25],[`Với điều kiện ${xlin(1,B.k)} ≥ 0: S = {${B.ok.map(sg).join('; ')}}.`,.25]])],chk:()=>true};
});
