/* ================================================================
   LỚP 12 – Toán 12 Kết nối tri thức, học kì I
   Phần dùng chung (đồ thị, bảng biến thiên, vectơ) + Chương I, Bài 1 – 2
   ================================================================ */
const N12=(id,ch,lv,les,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:12,hk:1,les,sec});
const DS12=(id,ch,lv,les,gen,sec)=>reg('ds',id,ch,lv,gen,{g:12,hk:1,les,sec});
const TLN12=(id,ch,lv,les,gen,sec)=>reg('tln',id,ch,lv,gen,{g:12,hk:1,les,sec});
const TL12=(id,ch,lv,role,les,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:12,hk:1,les,sec});
/* Kí hiệu */
const vc=s=>`<span class="vc">${s}</span>`;                 /* vectơ có mũi tên */
const FPX=`${I('f')}′(${I('x')})`,YF=`${I('y')} = ${FX}`;
const inf=v=>v===Infinity?'+∞':v===-Infinity?'−∞':fmt(v);    /* số hoặc ±∞ (chữ thường, dùng được trong SVG) */
const ivO=(a,b)=>`(${inf(a)}; ${inf(b)})`,ivC=(a,b)=>`[${inf(a)}; ${inf(b)}]`;
const P3=(cs,v='x')=>polyH(cs,v);
const pev=(cs,x)=>cs.reduce((s,c)=>s*x+c,0);
const pder=cs=>cs.slice(0,-1).map((c,i)=>c*(cs.length-1-i));
const isInt=v=>Math.abs(v-Math.round(v))<1e-9;
const uniqBy=(a,f)=>{const s=new Set();return a.filter(x=>{const k=f(x);if(s.has(k))return false;s.add(k);return true})};
/* "a x" với hệ số đẹp: coefX(−1,'x') → "−x" */
const den2=d=>d?`(${xlin(1,d)})${sup(2)}`:I('x')+sup(2);
const coefV=(c,v)=>(c===1?'':c===-1?MINUS:sg(c))+v;

/* ---------- Bảng biến thiên (SVG) ----------
   nd: các nút [{x, d:'0'|'||'|'', y, lv:'t'|'b'|'m'}]; nút '||' có y=[trái,phải], lv=[trái,phải].
   sg: dấu của f′ trên từng khoảng ('+' hoặc '−'). */
function bbtSVG(nd,sgn,o={}){
  const n=nd.length,cw=o.cw||(n>4?62:74),L=46,W=L+44+(n-1)*cw,hx=24,hd=24,hf=64,H=hx+hd+hf;
  const X=i=>L+22+i*cw,f=v=>v.toFixed(1),T=v=>typeof v==='number'?inf(v):v;
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Bảng biến thiên">`;
  s+=`<rect x="0.5" y="0.5" width="${W-1}" height="${H-1}" fill="none" stroke="#000" stroke-width="1"/>`;
  s+=`<line x1="0" y1="${hx}" x2="${W}" y2="${hx}" stroke="#000"/><line x1="0" y1="${hx+hd}" x2="${W}" y2="${hx+hd}" stroke="#000"/><line x1="${L}" y1="0" x2="${L}" y2="${H}" stroke="#000"/>`;
  const fn=o.fn||'f';
  s+=`<text x="${L/2}" y="16" font-size="12" text-anchor="middle" font-style="italic">x</text>`;
  s+=`<text x="${L/2}" y="${hx+16}" font-size="12" text-anchor="middle"><tspan font-style="italic">${fn}</tspan>′(<tspan font-style="italic">x</tspan>)</text>`;
  s+=`<text x="${L/2}" y="${hx+hd+hf/2+4}" font-size="12" text-anchor="middle"><tspan font-style="italic">${fn}</tspan>(<tspan font-style="italic">x</tspan>)</text>`;
  const yT=hx+hd+15,yB=H-7,yM=hx+hd+hf/2+4,yl=lv=>lv==='t'?yT:lv==='b'?yB:yM;
  nd.forEach((p,i)=>{
    s+=`<text x="${X(i)}" y="16" font-size="12" text-anchor="middle">${T(p.x)}</text>`;
    if(p.d==='0')s+=`<text x="${X(i)}" y="${hx+16}" font-size="12" text-anchor="middle">0</text>`;
    if(p.d==='||'){for(const dx of [-1.6,1.6])s+=`<line x1="${f(X(i)+dx)}" y1="${hx}" x2="${f(X(i)+dx)}" y2="${H}" stroke="#000" stroke-width="0.9"/>`;
      s+=`<text x="${X(i)-5}" y="${yl(p.lv[0])}" font-size="12" text-anchor="end">${T(p.y[0])}</text><text x="${X(i)+5}" y="${yl(p.lv[1])}" font-size="12" text-anchor="start">${T(p.y[1])}</text>`}
    else if(p.y!==undefined&&p.y!==null)s+=`<text x="${X(i)}" y="${yl(p.lv)}" font-size="12" text-anchor="middle">${T(p.y)}</text>`;
  });
  sgn.forEach((c,i)=>{s+=`<text x="${(X(i)+X(i+1))/2}" y="${hx+17}" font-size="13" text-anchor="middle">${c}</text>`});
  /* mũi tên */
  const yA=lv=>lv==='t'?yT+5:lv==='b'?yB-13:yM-4;
  for(let i=0;i<n-1;i++){
    const a=nd[i],b=nd[i+1],la=Array.isArray(a.lv)?a.lv[1]:a.lv,lb=Array.isArray(b.lv)?b.lv[0]:b.lv;
    const wa=String(T(Array.isArray(a.y)?a.y[1]:a.y)).length,wb=String(T(Array.isArray(b.y)?b.y[0]:b.y)).length;
    let x1=X(i)+(a.d==='||'?8+wa*6.2:Math.max(9,wa*3.6+4)),x2=X(i+1)-(b.d==='||'?8+wb*6.2:Math.max(9,wb*3.6+4)),y1=yA(la),y2=yA(lb);
    if(la===lb){y1=yA(la);y2=y1}
    const ang=Math.atan2(y2-y1,x2-x1),h=6;
    s+=`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#000" stroke-width="1"/>`;
    s+=`<polygon points="${f(x2)},${f(y2)} ${f(x2-h*Math.cos(ang-0.4))},${f(y2-h*Math.sin(ang-0.4))} ${f(x2-h*Math.cos(ang+0.4))},${f(y2-h*Math.sin(ang+0.4))}" fill="#000"/>`;
  }
  return `<div class="figure">${s}</svg></div>`;
}
/* BBT của hàm số có các điểm tới hạn xs (tăng dần) trên ℝ hoặc đoạn [lo; hi]; giá trị tại hai đầu cho sẵn. */
function bbtOf(fv,crit,o={}){
  const lo=o.lo===undefined?-Infinity:o.lo,hi=o.hi===undefined?Infinity:o.hi;
  const xs=[lo,...crit,hi],ys=xs.map((x,i)=>i===0?(o.yl!==undefined?o.yl:fv(x)):i===xs.length-1?(o.yr!==undefined?o.yr:fv(x)):fv(x));
  const sgn=[];for(let i=0;i<xs.length-1;i++){const a=xs[i],b=xs[i+1],m=!isFinite(a)?b-1:!isFinite(b)?a+1:(a+b)/2;sgn.push(o.dsign(m)>0?'+':'−')}
  const last=xs.length-1,lv=ys.map((y,i)=>i===0?(sgn[0]==='+'?'b':'t'):i===last?(sgn[last-1]==='+'?'t':'b'):(sgn[i-1]==='+'?'t':'b'));
  const nd=xs.map((x,i)=>({x,d:i===0||i===xs.length-1?'':'0',y:ys[i],lv:lv[i]}));
  return bbtSVG(nd,sgn,o);
}

/* ---------- Đồ thị hàm số (SVG) ---------- */
let G12ID=0;
function graphSVG(fn,o){
  const [x0,x1]=o.x,[y0,y1]=o.y,W=o.w||230,H=o.h||200,p=16;
  const kx=(W-2*p)/(x1-x0),ky=(H-2*p)/(y1-y0),k=o.equal?Math.min(kx,ky):null;
  let KX=k||kx,KY=k||ky;if(!k){if(KY>KX*1.5)KY=KX*1.5;if(KX>KY*1.5)KX=KY*1.5}
  const ox=(W-(x1-x0)*KX)/2,oy=(H-(y1-y0)*KY)/2;
  const SX=x=>ox+(x-x0)*KX,SY=y=>H-oy-(y-y0)*KY,f=v=>v.toFixed(1),id='g12c'+(++G12ID);
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Đồ thị hàm số"><defs><clipPath id="${id}"><rect x="${f(SX(x0))}" y="${f(SY(y1))}" width="${f((x1-x0)*KX)}" height="${f((y1-y0)*KY)}"/></clipPath></defs>`;
  const ar=(x,y,dx,dy)=>`<polygon points="${f(x)},${f(y)} ${f(x-dx*7-dy*3)},${f(y-dy*7+dx*3)} ${f(x-dx*7+dy*3)},${f(y-dy*7-dx*3)}" fill="#000"/>`;
  /* trục */
  const ax=SY(0),ay=SX(0);
  s+=`<line x1="${f(SX(x0))}" y1="${f(ax)}" x2="${f(SX(x1))}" y2="${f(ax)}" stroke="#000" stroke-width="0.9"/>${ar(SX(x1),ax,1,0)}`;
  s+=`<line x1="${f(ay)}" y1="${f(SY(y0))}" x2="${f(ay)}" y2="${f(SY(y1))}" stroke="#000" stroke-width="0.9"/>${ar(ay,SY(y1),0,-1)}`;
  s+=`<text x="${f(SX(x1)-4)}" y="${f(ax+13)}" font-size="11" font-style="italic" text-anchor="end">x</text><text x="${f(ay-7)}" y="${f(SY(y1)+9)}" font-size="11" font-style="italic" text-anchor="end">y</text><text x="${f(ay-4)}" y="${f(ax+12)}" font-size="11" font-style="italic" text-anchor="end">O</text>`;
  const dash=(xa,ya,xb,yb)=>`<line x1="${f(xa)}" y1="${f(ya)}" x2="${f(xb)}" y2="${f(yb)}" stroke="#000" stroke-width="0.7" stroke-dasharray="3 2.5"/>`;
  const done={x:new Set(),y:new Set()};
  const lx=(x,up)=>{if(x===0||done.x.has(x))return'';done.x.add(x);return `<text x="${f(SX(x))}" y="${f(up?ax-5:ax+13)}" font-size="10.5" text-anchor="middle">${fmt(x)}</text>`};
  const ly=(y)=>{if(y===0||done.y.has(y))return'';done.y.add(y);return `<text x="${f(ay+(o.ylabR?5:-4))}" y="${f(SY(y)+3.5)}" font-size="10.5" text-anchor="${o.ylabR?'start':'end'}">${fmt(y)}</text>`};
  /* tiệm cận */
  (o.va||[]).forEach(a=>{s+=dash(SX(a),SY(y0),SX(a),SY(y1))+lx(a,o.vaUp)});
  (o.ha||[]).forEach(b=>{s+=dash(SX(x0),SY(b),SX(x1),SY(b))+ly(b)});
  /* điểm đánh dấu kèm đường gióng */
  (o.marks||[]).forEach(([x,y])=>{if(x!==0)s+=dash(SX(x),ax,SX(x),SY(y));if(y!==0)s+=dash(ay,SY(y),SX(x),SY(y));s+=lx(x,y<0)+ly(y)});
  (o.xt||[]).forEach(x=>{s+=`<line x1="${f(SX(x))}" y1="${f(ax-2)}" x2="${f(SX(x))}" y2="${f(ax+2)}" stroke="#000"/>`+lx(x,false)});
  (o.yt||[]).forEach(y=>{s+=`<line x1="${f(ay-2)}" y1="${f(SY(y))}" x2="${f(ay+2)}" y2="${f(SY(y))}" stroke="#000"/>`+ly(y)});
  /* đường cong */
  const N=500,segs=[];let cur=[],prev=null;
  const lim=(y1-y0)*3;
  for(let i=0;i<=N;i++){const x=x0+(x1-x0)*i/N,y=fn(x);
    if(!Number.isFinite(y)||Math.abs(y)>1e4||(prev!==null&&Math.abs(y-prev)>lim)||(o.va||[]).some(a=>Math.abs(x-a)<1e-6)){if(cur.length>1)segs.push(cur);cur=[];prev=Number.isFinite(y)&&Math.abs(y)<=1e4?y:null;if(prev!==null)cur.push([x,y]);continue}
    cur.push([x,y]);prev=y}
  if(cur.length>1)segs.push(cur);
  s+=`<g clip-path="url(#${id})">`+segs.map(sg2=>`<polyline points="${sg2.map(([x,y])=>f(SX(x))+','+f(SY(Math.max(y0-5,Math.min(y1+5,y)))) ).join(' ')}" fill="none" stroke="#000" stroke-width="1.5"/>`).join('')+'</g>';
  if(o.lab)s+=`<text x="${f(SX(o.lab[0]))}" y="${f(SY(o.lab[1]))}" font-size="11" font-style="italic">${o.lab[2]||''}</text>`;
  return `<div class="figure">${s}</svg></div>`;
}
/* Khung nhìn tự động cho đồ thị qua các điểm cần thấy */
function viewOf(pts,mx=1.4,my=1.4){
  const xs=pts.map(p=>p[0]).concat(0),ys=pts.map(p=>p[1]).concat(0);
  return{x:[Math.floor(Math.min(...xs)-mx),Math.ceil(Math.max(...xs)+mx)],y:[Math.floor(Math.min(...ys)-my),Math.ceil(Math.max(...ys)+my)]};
}

/* ---------- Hàm bậc ba có hai cực trị nguyên ----------
   f′(x) = 3a(x − p)(x − q), p < q. Trả về hệ số và giá trị tại cực trị. */
function cubic12(r,o={}){
  for(let it=0;it<500;it++){
    const a=o.a||r.pick(o.as||[1,-1,1,-1,2,-2]),p=r.int(o.lo??-3,o.hi??2),q=p+r.int(1,o.gap||3);
    if((a*(p+q))%2)continue;
    const b=-3*a*(p+q)/2,c=3*a*p*q,d=o.d!==undefined?o.d:r.int(o.dlo??-5,o.dhi??5),cs=[a,b,c,d];
    const fp=pev(cs,p),fq=pev(cs,q);
    if(o.ok&&!o.ok({a,b,c,d,p,q,fp,fq}))continue;
    return{a,b,c,d,p,q,cs,fp,fq,f:x=>pev(cs,x),xCD:a>0?p:q,xCT:a>0?q:p,yCD:a>0?fp:fq,yCT:a>0?fq:fp};
  }
  throw new Error('cubic12');
}
/* Hàm trùng phương y = a x⁴ − 2a k² x² + c (cực trị tại 0, ±k) */
function quart12(r,o={}){
  const a=o.a||r.pick([1,-1]),k=o.k||r.int(1,2),c=o.c!==undefined?o.c:r.int(-3,3),cs=[a,0,-2*a*k*k,0,c];
  return{a,k,c,cs,f:x=>pev(cs,x),y0:c,yk:pev(cs,k)};
}
const signDer=cs=>x=>pev(pder(cs),x);
/* BBT bậc ba trên ℝ */
const bbtCubic=C=>bbtOf(C.f,[C.p,C.q],{dsign:signDer(C.cs),yl:C.a>0?-Infinity:Infinity,yr:C.a>0?Infinity:-Infinity});
const bbtQuart=Q4=>bbtOf(Q4.f,[-Q4.k,0,Q4.k],{dsign:signDer(Q4.cs),yl:Q4.a>0?Infinity:-Infinity,yr:Q4.a>0?Infinity:-Infinity});
/* Các khoảng đồng biến / nghịch biến từ dấu f′ trên các khoảng chia bởi crit */
function monoIv(crit,dsign,lo=-Infinity,hi=Infinity){
  const xs=[lo,...crit,hi],inc=[],dec=[];
  for(let i=0;i<xs.length-1;i++){const a=xs[i],b=xs[i+1],m=!isFinite(a)?b-1:!isFinite(b)?a+1:(a+b)/2;(dsign(m)>0?inc:dec).push([a,b])}
  return{inc,dec};
}
/* Phương án khoảng: đúng là một khoảng con của khoảng đúng; nhiễu là khoảng chứa điểm sai dấu */
function ivWrongs(r,good,bad,crit,vals){
  const W=[];bad.forEach(([a,b])=>W.push(ivO(a,b)));
  if(crit.length>=2)W.push(ivO(crit[0],Infinity),ivO(-Infinity,crit[crit.length-1]));
  if(vals)W.push(ivO(Math.min(...vals),Math.max(...vals)));
  W.push(ivO(crit[0]-1,crit[crit.length-1]+1));
  return r.shuffle(uniqBy(W,x=>x)).filter(w=>!good.some(([a,b])=>w===ivO(a,b)));
}
const inIv=(sub,iv)=>sub[0]>=iv[0]&&sub[1]<=iv[1];

/* ===================== Chương I. Bài 1: Tính đơn điệu và cực trị ===================== */
N12('k12-1-bbt-mono',1,'NB',[1],r=>{
  const C=cubic12(r,{dlo:-4,dhi:4}),M=monoIv([C.p,C.q],signDer(C.cs)),want=r.chance(.5)?'inc':'dec';
  const good=M[want],pick=r.pick(good),bad=M[want==='inc'?'dec':'inc'];
  const cor=ivO(...pick);
  return mkTxt(r,{stem:`Cho hàm số ${YF} có bảng biến thiên như sau:${bbtCubic(C)}Hàm số đã cho ${want==='inc'?'đồng biến':'nghịch biến'} trên khoảng nào dưới đây?`,
    correct:cor,wrongs:ivWrongs(r,good,bad,[C.p,C.q],[C.fp,C.fq]).filter(w=>w!==cor),
    sol:`Từ bảng biến thiên, ${FPX} ${want==='inc'?'> 0':'< 0'} trên ${good.map(g=>ivO(...g)).join(' và ')} nên hàm số ${want==='inc'?'đồng biến':'nghịch biến'} trên ${cor}.`,
    chk:()=>{const m=isFinite(pick[0])&&isFinite(pick[1])?(pick[0]+pick[1])/2:isFinite(pick[0])?pick[0]+1:pick[1]-1;return(pev(pder(C.cs),m)>0)===(want==='inc')}});
});
N12('k12-1-bbt-ext',1,'NB',[1],r=>{
  const C=cubic12(r,{dlo:-4,dhi:4,ok:z=>new Set([z.p,z.q,z.fp,z.fq]).size===4}),ask=r.int(0,3);
  const W=[['Giá trị cực đại của hàm số đã cho bằng',C.yCD],['Giá trị cực tiểu của hàm số đã cho bằng',C.yCT],['Điểm cực đại của hàm số đã cho là',C.xCD],['Điểm cực tiểu của hàm số đã cho là',C.xCT]][ask];
  const why=[`Hàm số đạt cực đại tại x = ${sg(C.xCD)}, giá trị cực đại y<sub>CĐ</sub> = ${sg(C.yCD)}.`,`Hàm số đạt cực tiểu tại x = ${sg(C.xCT)}, giá trị cực tiểu y<sub>CT</sub> = ${sg(C.yCT)}.`,`${FPX} đổi dấu từ dương sang âm khi qua x = ${sg(C.xCD)} nên đó là điểm cực đại.`,`${FPX} đổi dấu từ âm sang dương khi qua x = ${sg(C.xCT)} nên đó là điểm cực tiểu.`][ask];
  return mkNum(r,{stem:`Cho hàm số ${YF} có bảng biến thiên như sau:${bbtCubic(C)}${W[0]}`,correct:W[1],ok:()=>true,cands:[C.yCD,C.yCT,C.xCD,C.xCT].filter(v=>v!==W[1]),sol:why,chk:()=>pev(pder(C.cs),C.p)===0&&pev(pder(C.cs),C.q)===0});
});
N12('k12-1-graph-mono',1,'NB',[1],r=>{
  const C=cubic12(r,{as:[1,-1],lo:-2,hi:1,gap:2,ok:z=>Math.abs(z.fp)<=4&&Math.abs(z.fq)<=4&&z.fp!==0&&z.fq!==0&&z.p!==0&&z.q!==0});
  const V=viewOf([[C.p,C.fp],[C.q,C.fq]],1.6,1.3),M=monoIv([C.p,C.q],signDer(C.cs)),want=r.chance(.5)?'inc':'dec',good=M[want],pick=r.pick(good),cor=ivO(...pick);
  return mkTxt(r,{stem:`Cho hàm số ${YF} có đồ thị là đường cong trong hình bên.${graphSVG(C.f,{...V,marks:[[C.p,C.fp],[C.q,C.fq]]})}Hàm số đã cho ${want==='inc'?'đồng biến':'nghịch biến'} trên khoảng nào dưới đây?`,
    correct:cor,wrongs:ivWrongs(r,good,M[want==='inc'?'dec':'inc'],[C.p,C.q],[C.fp,C.fq]).filter(w=>w!==cor),
    sol:`Trên ${cor}, đồ thị đi ${want==='inc'?'lên':'xuống'} từ trái sang phải nên hàm số ${want==='inc'?'đồng biến':'nghịch biến'} trên khoảng đó.`,
    chk:()=>{const m=isFinite(pick[0])&&isFinite(pick[1])?(pick[0]+pick[1])/2:isFinite(pick[0])?pick[0]+1:pick[1]-1;return(pev(pder(C.cs),m)>0)===(want==='inc')}});
});
N12('k12-1-graph-ext',1,'NB',[1],r=>{
  const Q4=quart12(r,{k:1,c:r.int(-2,2)}),c=Q4.c,yk=Q4.yk;
  if(c===0||yk===0)return T.nlc['k12-1-graph-ext'].gen(r);
  const V=viewOf([[-1,yk],[1,yk],[0,c]],1.3,1.3),ask=r.int(0,2);
  const isMax0=Q4.a<0?false:true;/* a>0: 0 là cực đại */
  const Wd=[[`Điểm cực đại của đồ thị hàm số đã cho là`,`(0; ${sg(c)})`,Q4.a>0?[`(1; ${sg(yk)})`,`(${MINUS}1; ${sg(yk)})`,`(${sg(c)}; 0)`]:[`(1; ${sg(yk)})`,`(0; ${sg(c)})`,`(${sg(yk)}; 1)`]],
    [`Giá trị cực tiểu của hàm số đã cho bằng`,sg(Q4.a>0?yk:c),[sg(Q4.a>0?c:yk),'1',MINUS+'1','0'].filter(x=>x!==sg(Q4.a>0?yk:c))],
    [`Hàm số đã cho có bao nhiêu điểm cực trị?`,'3',['1','2','4']]][ask];
  let cor=Wd[1],wr=Wd[2];
  if(ask===0&&Q4.a<0){cor=`(${r.pick(['1',MINUS+'1'])}; ${sg(yk)})`;wr=[`(0; ${sg(c)})`,`(${sg(yk)}; 1)`,`(${sg(c)}; 0)`]}
  return mkTxt(r,{stem:`Cho hàm số ${YF} có đồ thị là đường cong trong hình bên.${graphSVG(Q4.f,{...V,marks:[[-1,yk],[1,yk],[0,c]]})}${Wd[0]}`,correct:cor,wrongs:wr,
    sol:ask===2?`Đồ thị có ba điểm “đỉnh” (hai điểm thấp nhất/cao nhất cục bộ và một điểm ở giữa) nên hàm số có 3 điểm cực trị.`:`Quan sát đồ thị: hàm số đạt cực ${Q4.a>0?'đại':'tiểu'} tại x = 0 (y = ${sg(c)}) và đạt cực ${Q4.a>0?'tiểu':'đại'} tại x = ±1 (y = ${sg(yk)}).`,
    chk:()=>isMax0===(Q4.a>0)&&Q4.f(1)===yk&&pev(pder(Q4.cs),1)===0});
});
N12('k12-1-cnt',1,'TH',[1],r=>{
  /* f′(x) = (x − a)^m (x − b)^n (x − c)^k: đếm điểm cực trị (số nghiệm bội lẻ) */
  const roots=distinctInts(r,3,-4,5).sort((a,b)=>a-b),ex=[r.pick([1,2,3]),r.pick([1,2]),r.pick([1,2,3])];
  const fac=roots.map((x,i)=>`${x===0?I('x'):`(${xlin(1,-x)})`}${ex[i]>1?sup(ex[i]):''}`).join('');
  const cnt=ex.filter(e=>e%2).length,ask=r.pick(['cực trị','cực trị']);
  return mkNum(r,{stem:`Cho hàm số ${YF} có đạo hàm ${FPX} = ${fac}, ∀${I('x')} ∈ ℝ. Số điểm ${ask} của hàm số đã cho là`,correct:cnt,ok:c=>c>=0&&c<=4,cands:[3,2,1,0,4].filter(v=>v!==cnt),
    sol:`${FPX} đổi dấu khi qua các nghiệm bội lẻ và không đổi dấu khi qua nghiệm bội chẵn. Các nghiệm bội lẻ: ${roots.filter((_,i)=>ex[i]%2).map(sg).join('; ')||'không có'}. Vậy hàm số có ${cnt} điểm cực trị.`,
    chk:()=>{let c=0;roots.forEach(x0=>{const g=x=>roots.reduce((s,x1,i)=>s*Math.pow(x-x1,ex[i]),1);if(Math.sign(g(x0-1e-3))!==Math.sign(g(x0+1e-3)))c++});return c===cnt}});
});
N12('k12-1-cub-mono',1,'TH',[1],r=>{
  const C=cubic12(r,{d:r.int(-6,6)}),M=monoIv([C.p,C.q],signDer(C.cs)),want=r.chance(.5)?'inc':'dec',good=M[want],pick=r.pick(good),cor=ivO(...pick);
  return mkTxt(r,{stem:`Hàm số ${I('y')} = ${P3(C.cs)} ${want==='inc'?'đồng biến':'nghịch biến'} trên khoảng nào dưới đây?`,correct:cor,
    wrongs:ivWrongs(r,good,M[want==='inc'?'dec':'inc'],[C.p,C.q]).filter(w=>w!==cor),
    sol:`${I('y')}′ = ${P3(pder(C.cs))} = ${sg(3*C.a)}(${xlin(1,-C.p)})(${xlin(1,-C.q)}); ${I('y')}′ = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}. Lập bảng xét dấu: ${I('y')}′ ${want==='inc'?'> 0':'< 0'} trên ${good.map(g=>ivO(...g)).join(' và ')}, nên chọn ${cor}.`,
    chk:()=>{const m=isFinite(pick[0])&&isFinite(pick[1])?(pick[0]+pick[1])/2:isFinite(pick[0])?pick[0]+1:pick[1]-1;return(pev(pder(C.cs),m)>0)===(want==='inc')}});
});
N12('k12-1-cub-ext',1,'TH',[1],r=>{
  const C=cubic12(r,{d:r.int(-6,6),ok:z=>z.fp!==z.fq}),ask=r.int(0,2);
  const W=[[`Giá trị cực đại của hàm số ${I('y')} = ${P3(C.cs)} là`,C.yCD,[C.yCT,C.xCD,C.xCT,C.d]],[`Giá trị cực tiểu của hàm số ${I('y')} = ${P3(C.cs)} là`,C.yCT,[C.yCD,C.xCT,C.xCD,C.d]],[`Điểm cực đại của hàm số ${I('y')} = ${P3(C.cs)} là`,C.xCD,[C.xCT,C.yCD,-C.xCD,C.yCT]]][ask];
  return mkNum(r,{stem:W[0],correct:W[1],ok:()=>true,cands:W[2].filter(v=>v!==W[1]),
    sol:`${I('y')}′ = ${P3(pder(C.cs))}; ${I('y')}′ = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}. Vì hệ số của x³ ${C.a>0?'dương':'âm'} nên hàm số đạt cực đại tại x = ${sg(C.xCD)} (y<sub>CĐ</sub> = ${sg(C.yCD)}) và đạt cực tiểu tại x = ${sg(C.xCT)} (y<sub>CT</sub> = ${sg(C.yCT)}).`,
    chk:()=>C.f(C.xCD)===C.yCD&&pev(pder(pder(C.cs)),C.xCD)<0&&pev(pder(pder(C.cs)),C.xCT)>0});
});
N12('k12-1-quart',1,'TH',[1],r=>{
  const a=r.pick([1,-1,2,-2]),b=r.nz(-8,8),c=r.int(-5,5),cs=[a,0,b,0,c],n=a*b<0?3:1,ask=r.int(0,1);
  if(ask===0)return mkNum(r,{stem:`Số điểm cực trị của hàm số ${I('y')} = ${P3(cs)} là`,correct:n,ok:v=>v>=0,cands:[0,1,2,3,4].filter(v=>v!==n),
    sol:`${I('y')}′ = ${P3(pder(cs))} = ${coefV(4*a,I('x'))}(${I('x')}${sup(2)} ${b/(2*a)<0?MINUS:'+'} ${fmt(Math.abs(b/(2*a)))}). ${n===3?`Vì a·b < 0 nên ${I('y')}′ = 0 có ba nghiệm phân biệt và đổi dấu qua mỗi nghiệm`:`Vì a·b > 0 nên ${I('y')}′ = 0 chỉ có nghiệm x = 0 và đổi dấu qua nghiệm đó`}, do đó hàm số có ${n} điểm cực trị.`,
    chk:()=>{let k=0;for(const x0 of [0,Math.sqrt(Math.abs(b/(2*a))),-Math.sqrt(Math.abs(b/(2*a)))])if(Math.abs(pev(pder(cs),x0))<1e-9&&Math.sign(pev(pder(cs),x0-1e-4))!==Math.sign(pev(pder(cs),x0+1e-4)))k++;return k===n}});
  /* hỏi giá trị cực trị tại x = 0 */
  const ex0=a*b<0?(a>0?'đại':'tiểu'):(a>0?'tiểu':'đại');
  return mkTxt(r,{stem:`Hàm số ${I('y')} = ${P3(cs)} đạt cực ${ex0} tại điểm nào dưới đây?`,correct:`${I('x')} = 0`,wrongs:[`${I('x')} = ${sg(c)}`,`${I('x')} = 1`,`${I('x')} = ${MINUS}1`,`${I('x')} = 2`],
    sol:`${I('y')}′ = ${P3(pder(cs))}; ${I('y')}″ = ${P3(pder(pder(cs)))}, ${I('y')}″(0) = ${sg(2*b)} ${2*b<0?'< 0':'> 0'} nên hàm số đạt cực ${2*b<0?'đại':'tiểu'} tại ${I('x')} = 0.`,
    chk:()=>(ex0==='đại')===(2*b<0)});
});
N12('k12-1-rat',1,'TH',[1],r=>{
  for(;;){const a=r.nz(-4,4),b=r.int(-6,6),d=r.nz(-4,4),c=1,D=a*d-b*c;if(!D)continue;
    const inc=D>0,stem=`Cho hàm số ${I('y')} = ${fr(xlin(a,b),xlin(c,d))}. Khẳng định nào sau đây đúng?`,x0=-d;
    const S=(t)=>`Hàm số ${t?'đồng biến':'nghịch biến'}`;
    return mkTxt(r,{stem,correct:`${S(inc)} trên các khoảng ${ivO(-Infinity,x0)} và ${ivO(x0,Infinity)}.`,
      wrongs:[`${S(!inc)} trên các khoảng ${ivO(-Infinity,x0)} và ${ivO(x0,Infinity)}.`,`${S(inc)} trên ℝ.`,`${S(inc)} trên ℝ \\ {${sg(x0)}}.`,`${S(!inc)} trên ℝ.`],
      sol:`Tập xác định D = ℝ \\ {${sg(x0)}}. ${I('y')}′ = ${fr(`${sg(a)}·${d<0?'('+sg(d)+')':d} ${MINUS} ${b<0?'('+sg(b)+')':b}·1`,`(${xlin(c,d)})${sup(2)}`)} = ${fr(sg(D),`(${xlin(c,d)})${sup(2)}`)} ${inc?'> 0':'< 0'} với mọi x ≠ ${sg(x0)}. Vậy hàm số ${inc?'đồng biến':'nghịch biến'} trên từng khoảng xác định (không nói “trên ℝ \\ {${sg(x0)}}”).`,
      chk:()=>Math.sign((a*(x0+1.5)+b)/(x0+1.5+d)-(a*(x0+1)+b)/(x0+1+d))===(inc?1:-1)})}
});
N12('k12-1-fpgraph',1,'TH',[1],r=>{
  /* đồ thị y = f′(x) là parabol cắt trục hoành tại p, q */
  for(;;){const p=r.int(-2,1),q=p+r.int(2,3),s=r.pick([1,-1]),g=x=>s*(x-p)*(x-q)*(s>0?1:1);if(p===0||q===0)continue;
    const vy=g((p+q)/2);if(Math.abs(vy)>4.5)continue;
    const V=viewOf([[p,0],[q,0],[(p+q)/2,vy]],1.2,1.2),M=monoIv([p,q],g),want=r.chance(.5)?'inc':'dec',good=M[want],pick=r.pick(good),cor=ivO(...pick);
    return mkTxt(r,{stem:`Cho hàm số ${YF} có đạo hàm liên tục trên ℝ. Đồ thị của hàm số ${I('y')} = ${FPX} là đường cong trong hình bên.${graphSVG(g,{...V,xt:[p,q]})}Hàm số ${YF} ${want==='inc'?'đồng biến':'nghịch biến'} trên khoảng nào dưới đây?`,correct:cor,
      wrongs:ivWrongs(r,good,M[want==='inc'?'dec':'inc'],[p,q]).concat([ivO(Math.min(0,vy),Math.max(0,Math.round(vy)))]).filter(w=>w!==cor),
      sol:`Hàm số ${FX} ${want==='inc'?'đồng biến':'nghịch biến'} trên khoảng mà ${FPX} ${want==='inc'?'> 0':'< 0'}, tức là phần đồ thị của ${I('y')} = ${FPX} nằm ${want==='inc'?'phía trên':'phía dưới'} trục hoành: ${good.map(g2=>ivO(...g2)).join(' và ')}. Chọn ${cor}.`,
      chk:()=>{const m=isFinite(pick[0])&&isFinite(pick[1])?(pick[0]+pick[1])/2:isFinite(pick[0])?pick[0]+1:pick[1]-1;return(g(m)>0)===(want==='inc')}})}
});
N12('k12-1-param',1,'VD',[1],r=>{
  /* y = x³/3 + m x² + k x đồng biến trên ℝ ⟺ m² ≤ k */
  const t=r.int(1,4),k=t*t,c=r.int(-5,5),sgn=r.pick([1,-1]);
  const stem=`Tìm tất cả các giá trị của tham số ${I('m')} để hàm số ${I('y')} = ${fr(1,3)}${I('x')}${sup(3)} ${sgn>0?'+':MINUS} ${I('m')}${I('x')}${sup(2)} + ${k===1?'':k}${I('x')}${c?` ${c<0?MINUS:'+'} ${Math.abs(c)}`:''} đồng biến trên ℝ.`;
  return mkTxt(r,{stem,correct:`${MINUS}${t} ≤ ${I('m')} ≤ ${t}`,wrongs:[`${MINUS}${t} < ${I('m')} < ${t}`,`${I('m')} ≤ ${MINUS}${t} hoặc ${I('m')} ≥ ${t}`,`${MINUS}${k} ≤ ${I('m')} ≤ ${k}`,`${I('m')} ≥ ${t}`],
    sol:`${I('y')}′ = ${I('x')}${sup(2)} ${sgn>0?'+':MINUS} 2${I('m')}${I('x')} + ${k}. Hàm số đồng biến trên ℝ ⟺ ${I('y')}′ ≥ 0 ∀x ⟺ Δ′ = ${I('m')}${sup(2)} ${MINUS} ${k} ≤ 0 ⟺ ${MINUS}${t} ≤ ${I('m')} ≤ ${t}.`,
    chk:()=>[t,-t,0].every(m=>{const D=m*m-k;return D<=0})&&(t+1)*(t+1)-k>0});
});
DS12('ds12-1-cubic',1,'TH',[1],r=>{
  const C=cubic12(r,{d:r.int(-5,5),ok:z=>z.fp!==z.fq}),dp=pder(C.cs),M=monoIv([C.p,C.q],signDer(C.cs));
  const decIv=M.dec[0],incIv=M.inc[0];
  return mkDS(r,{stem:`Cho hàm số ${YF} = ${P3(C.cs)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${FPX} = ${P3(dp)}.`,f:`${FPX} = ${P3(dp[1]?[dp[0],-dp[1],dp[2]]:[dp[0],0,-dp[2]])}.`,why:`Đạo hàm: ${FPX} = ${P3(dp)}.`},
    {t:`Hàm số nghịch biến trên khoảng ${ivO(...decIv)}.`,f:`Hàm số nghịch biến trên khoảng ${ivO(...incIv)}.`,why:`${FPX} = 0 ⟺ x ∈ {${sg(C.p)}; ${sg(C.q)}}; ${FPX} < 0 trên ${M.dec.map(z=>ivO(...z)).join(' và ')}.`},
    {t:`Hàm số đạt cực đại tại ${I('x')} = ${sg(C.xCD)}.`,f:`Hàm số đạt cực đại tại ${I('x')} = ${sg(C.xCT)}.`,why:`${FPX} đổi dấu từ + sang − khi qua x = ${sg(C.xCD)}.`},
    {t:`Giá trị cực tiểu của hàm số bằng ${sg(C.yCT)}.`,f:`Giá trị cực tiểu của hàm số bằng ${sg(C.yCD)}.`,why:`y<sub>CT</sub> = f(${sg(C.xCT)}) = ${sg(C.yCT)}.`}],
    chk:()=>pev(dp,C.p)===0&&pev(dp,C.q)===0&&C.f(C.xCT)===C.yCT&&C.yCD!==C.yCT&&(dp[1]!==0||dp[2]!==0)});
});
DS12('ds12-1-bbt',1,'NB',[1],r=>{
  const Q4=quart12(r,{c:r.int(-3,3),k:r.int(1,3)}),a=Q4.a,k=Q4.k,c=Q4.c,yk=Q4.yk;
  const top0=a>0;/* a>0: x=0 là cực đại */
  return mkDS(r,{stem:`Cho hàm số ${YF} có bảng biến thiên như sau:${bbtQuart(Q4)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Hàm số ${top0?'nghịch biến':'đồng biến'} trên khoảng ${ivO(0,k)}.`,f:`Hàm số ${top0?'đồng biến':'nghịch biến'} trên khoảng ${ivO(0,k)}.`,why:`Trên ${ivO(0,k)} ta có ${FPX} ${top0?'< 0':'> 0'}.`},
    {t:`Hàm số có ba điểm cực trị.`,f:`Hàm số có hai điểm cực trị.`,why:`${FPX} đổi dấu khi qua x = ${MINUS}${k}, x = 0, x = ${k}.`},
    {t:`Giá trị cực ${top0?'đại':'tiểu'} của hàm số bằng ${sg(c)}.`,f:`Giá trị cực ${top0?'đại':'tiểu'} của hàm số bằng ${sg(yk)}.`,why:`Hàm số đạt cực ${top0?'đại':'tiểu'} tại x = 0 với giá trị ${sg(c)}.`},
    {t:`Hàm số ${top0?`có giá trị nhỏ nhất trên ℝ bằng ${sg(yk)}`:`có giá trị lớn nhất trên ℝ bằng ${sg(yk)}`}.`,f:`Hàm số ${top0?`có giá trị lớn nhất trên ℝ bằng ${sg(c)}`:`có giá trị nhỏ nhất trên ℝ bằng ${sg(c)}`}.`,why:top0?`Khi x → ±∞ thì f(x) → +∞ nên hàm số không có giá trị lớn nhất; giá trị nhỏ nhất là ${sg(yk)}.`:`Khi x → ±∞ thì f(x) → −∞ nên hàm số không có giá trị nhỏ nhất; giá trị lớn nhất là ${sg(yk)}.`}],
    chk:()=>(top0?yk<c:yk>c)});
});
DS12('ds12-1-fp',1,'VD',[1],r=>{
  /* f′(x) = (x − a)(x − b)²(x − c), a < b < c hoặc các hoán vị */
  const [a,b,c]=distinctInts(r,3,-4,4).sort((u,v)=>u-v),dbl=r.pick([a,b,c]),others=[a,b,c].filter(x=>x!==dbl);
  const g=x=>(x-others[0])*(x-others[1])*(x-dbl)**2,fac=`(${xlin(1,-others[0])})(${xlin(1,-others[1])})(${xlin(1,-dbl)})${sup(2)}`;
  const lo=others[0],hi=others[1];/* f′<0 trên (lo;hi) trừ điểm kép */
  return mkDS(r,{stem:`Cho hàm số ${YF} có đạo hàm ${FPX} = ${fac}, ∀${I('x')} ∈ ℝ. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Hàm số nghịch biến trên khoảng ${ivO(lo,hi)}.`,f:`Hàm số đồng biến trên khoảng ${ivO(lo,hi)}.`,why:`Trên ${ivO(lo,hi)}, (${xlin(1,-lo)})(${xlin(1,-hi)}) < 0 và (${xlin(1,-dbl)})² ≥ 0 nên ${FPX} ≤ 0 (chỉ bằng 0 tại hữu hạn điểm).`},
    {t:`Hàm số có đúng hai điểm cực trị.`,f:`Hàm số có ba điểm cực trị.`,why:`${FPX} chỉ đổi dấu khi qua x = ${sg(lo)} và x = ${sg(hi)}; x = ${sg(dbl)} là nghiệm kép nên không phải điểm cực trị.`},
    {t:`Hàm số đạt cực tiểu tại ${I('x')} = ${sg(hi)}.`,f:`Hàm số đạt cực đại tại ${I('x')} = ${sg(hi)}.`,why:`Qua x = ${sg(hi)}, ${FPX} đổi dấu từ − sang +.`},
    {t:`${I('f')}(${sg(lo)}) > ${I('f')}(${sg(hi)}).`,f:`${I('f')}(${sg(lo)}) < ${I('f')}(${sg(hi)}).`,why:`Hàm số nghịch biến trên [${sg(lo)}; ${sg(hi)}] nên f(${sg(lo)}) > f(${sg(hi)}).`}],
    chk:()=>g((lo+hi)/2+0.013)<0&&g(hi+0.5)>0&&g(lo-0.5)>0&&Math.sign(g(dbl-0.01))===Math.sign(g(dbl+0.01))});
});
TLN12('t12-1-param',1,'VD',[1],r=>{
  const t=r.int(1,6),k=t*t,c=r.int(-5,5),R=r.pick([10,15,20]);
  return{kind:'tln',stem:`Có bao nhiêu giá trị nguyên của tham số ${I('m')} để hàm số ${I('y')} = ${fr(1,3)}${I('x')}${sup(3)} ${MINUS} ${I('m')}${I('x')}${sup(2)} + ${k===1?'':k}${I('x')}${c?` ${c<0?MINUS:'+'} ${Math.abs(c)}`:''} đồng biến trên ℝ?`,ans:2*t+1,unit:'',
    sol:`${I('y')}′ = x² − 2mx + ${k} ≥ 0 ∀x ⟺ Δ′ = m² − ${k} ≤ 0 ⟺ −${t} ≤ m ≤ ${t}. Có ${2*t+1} giá trị nguyên.`,chk:()=>{let n=0;for(let m=-R;m<=R;m++)if(m*m-k<=0)n++;return n===2*t+1}};
});
TLN12('t12-1-sum',1,'TH',[1],r=>{
  const C=cubic12(r,{d:r.int(-5,5)}),ask=r.int(0,1);
  const ans=ask?C.yCD-C.yCT:C.yCD+C.yCT;
  return{kind:'tln',stem:`Gọi ${I('y')}<sub>CĐ</sub>, ${I('y')}<sub>CT</sub> lần lượt là giá trị cực đại và giá trị cực tiểu của hàm số ${I('y')} = ${P3(C.cs)}. Tính ${ask?`${I('y')}<sub>CĐ</sub> ${MINUS} ${I('y')}<sub>CT</sub>`:`${I('y')}<sub>CĐ</sub> + ${I('y')}<sub>CT</sub>`}.`,ans,unit:'',
    sol:`${I('y')}′ = ${P3(pder(C.cs))} = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}. y<sub>CĐ</sub> = y(${sg(C.xCD)}) = ${sg(C.yCD)}, y<sub>CT</sub> = y(${sg(C.xCT)}) = ${sg(C.yCT)}. Kết quả: ${sg(ans)}.`,chk:()=>C.yCD>C.yCT};
});
TLN12('t12-1-findm',1,'VD',[1],r=>{
  /* y = x³ − 3x² + m x + 1 đạt cực tiểu/đại tại x0 */
  for(;;){const a=r.pick([1,-1]),b=r.nz(-4,4)*3,x0=r.int(-3,3),m=-(3*a*x0*x0+2*b*x0),dd=6*a*x0+2*b;if(dd===0)continue;
    const kind=dd>0?'tiểu':'đại';
    return{kind:'tln',stem:`Tìm giá trị của tham số ${I('m')} để hàm số ${I('y')} = ${coefV(a,I('x')+sup(3))} ${b<0?MINUS:'+'} ${Math.abs(b)}${I('x')}${sup(2)} + ${I('m')}${I('x')} + 1 đạt cực ${kind} tại ${I('x')} = ${sg(x0)}.`,ans:m,unit:'',
      sol:`${I('y')}′ = ${coefV(3*a,I('x')+sup(2))} ${2*b<0?MINUS:'+'} ${Math.abs(2*b)}${I('x')} + ${I('m')}; ${I('y')}′(${sg(x0)}) = 0 ⟺ ${sg(3*a*x0*x0+2*b*x0)} + m = 0 ⟺ m = ${sg(m)}. Thử lại: ${I('y')}″(${sg(x0)}) = ${sg(dd)} ${dd>0?'> 0':'< 0'} nên hàm số đạt cực ${kind} tại x = ${sg(x0)}. Vậy m = ${sg(m)}.`,
      chk:()=>3*a*x0*x0+2*b*x0+m===0}}
});
TL12('tl12-1-mono',1,'TH','a',[1],r=>{
  const C=cubic12(r,{d:r.int(-5,5)}),M=monoIv([C.p,C.q],signDer(C.cs)),dp=pder(C.cs);
  return{kind:'tl',title:'Tính đơn điệu và cực trị',parts:[
    {pts:.5,html:`Tìm các khoảng đơn điệu của hàm số ${I('y')} = ${P3(C.cs)}.`},
    {pts:.5,html:`Tìm cực trị của hàm số đó.`}],
    sol:[ptxt([[`Tập xác định ℝ. ${I('y')}′ = ${P3(dp)} = ${sg(3*C.a)}(${xlin(1,-C.p)})(${xlin(1,-C.q)}); ${I('y')}′ = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}.`,.25],
      [`Hàm số đồng biến trên ${M.inc.map(z=>ivO(...z)).join(' và ')}; nghịch biến trên ${M.dec.map(z=>ivO(...z)).join(' và ')}.`,.25]]),
      ptxt([[`Hàm số đạt cực đại tại x = ${sg(C.xCD)}, y<sub>CĐ</sub> = ${sg(C.yCD)}.`,.25],[`Hàm số đạt cực tiểu tại x = ${sg(C.xCT)}, y<sub>CT</sub> = ${sg(C.yCT)}.`,.25]])],
    chk:()=>C.f(C.xCD)===C.yCD&&C.f(C.xCT)===C.yCT};
});
TL12('tl12-1-rat2',1,'VD','a',[1],r=>{
  /* y = (x² + b x + c)/(x − d): y′ = (x² − 2dx − bd − c)/(x−d)², chọn để nghiệm nguyên d ± t */
  for(;;){const d=r.int(-3,3),t=r.int(1,3),b=r.int(-4,4),c=t*t-d*d-b*d;/* x²−2dx−bd−c = (x−d)² − t² */
    if(c===-(d*d)-b*d)continue;/* tử chia hết cho mẫu */
    const x1=d-t,x2=d+t,g=x=>(x*x+b*x+c)/(x-d),y1=g(x1),y2=g(x2);
    if(!isInt(y1)||!isInt(y2))continue;
    return{kind:'tl',title:'Cực trị của hàm phân thức',parts:[
      {pts:.5,html:`Tìm các khoảng đơn điệu của hàm số ${I('y')} = ${fr(xquad(1,b,c),xlin(1,-d))}.`},
      {pts:.5,html:`Tìm điểm cực đại, điểm cực tiểu của đồ thị hàm số đó.`}],
      sol:[ptxt([[`Tập xác định D = ℝ \\ {${sg(d)}}. ${I('y')}′ = ${fr(xquad(1,-2*d,-b*d-c),`(${xlin(1,-d)})${sup(2)}`)}; ${I('y')}′ = 0 ⟺ x = ${sg(x1)} hoặc x = ${sg(x2)}.`,.25],
        [`Hàm số đồng biến trên ${ivO(-Infinity,x1)} và ${ivO(x2,Infinity)}; nghịch biến trên ${ivO(x1,d)} và ${ivO(d,x2)}.`,.25]]),
        ptxt([[`Điểm cực đại của đồ thị: (${sg(x1)}; ${sg(y1)}).`,.25],[`Điểm cực tiểu của đồ thị: (${sg(x2)}; ${sg(y2)}).`,.25]])],
      chk:()=>{const yd=x=>(x*x-2*d*x-b*d-c);return yd(x1)===0&&yd(x2)===0&&g(x1-.01)<y1&&g(x2+.01)>y2}}}
});

/* ===================== Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất ===================== */
N12('k12-2-graph',1,'NB',[2],r=>{
  const C=cubic12(r,{as:[1,-1],lo:-2,hi:1,gap:2,ok:z=>Math.abs(z.fp)<=4&&Math.abs(z.fq)<=4&&z.fp!==0&&z.fq!==0&&z.p!==0&&z.q!==0});
  /* đoạn [lo; hi] chứa hai cực trị, hai đầu mút đều có giá trị nguyên */
  const lo=C.p-1,hi=C.q+1,ylo=C.f(lo),yhi=C.f(hi);if(Math.abs(ylo)>6||Math.abs(yhi)>6)return T.nlc['k12-2-graph'].gen(r);
  const vals=[ylo,C.fp,C.fq,yhi],M=Math.max(...vals),m=Math.min(...vals),ask=r.chance(.5);
  const g=x=>x<lo-1e-9||x>hi+1e-9?NaN:C.f(x),V=viewOf([[lo,ylo],[hi,yhi],[C.p,C.fp],[C.q,C.fq]],.8,.8);
  return mkNum(r,{stem:`Cho hàm số ${YF} liên tục trên đoạn ${ivC(lo,hi)} và có đồ thị như hình bên.${graphSVG(g,{...V,marks:[[lo,ylo],[hi,yhi],[C.p,C.fp],[C.q,C.fq]]})}Giá trị ${ask?'lớn nhất':'nhỏ nhất'} của hàm số đã cho trên đoạn ${ivC(lo,hi)} bằng`,correct:ask?M:m,ok:()=>true,cands:vals.concat([lo,hi]).filter(v=>v!==(ask?M:m)),
    sol:`Điểm ${ask?'cao':'thấp'} nhất của đồ thị trên đoạn ${ivC(lo,hi)} có tung độ ${sg(ask?M:m)} nên ${ask?'max':'min'} = ${sg(ask?M:m)}.`,chk:()=>M>m});
});
N12('k12-2-bbt',1,'NB',[2],r=>{
  const C=cubic12(r,{dlo:-4,dhi:4,ok:z=>z.fp!==z.fq}),lo=C.p-r.int(1,2),hi=C.q+r.int(1,2),ylo=C.f(lo),yhi=C.f(hi);
  const vals=[ylo,C.fp,C.fq,yhi],M=Math.max(...vals),m=Math.min(...vals),ask=r.chance(.5);
  if(new Set(vals).size<4)return T.nlc['k12-2-bbt'].gen(r);
  return mkNum(r,{stem:`Cho hàm số ${YF} liên tục trên đoạn ${ivC(lo,hi)} và có bảng biến thiên như sau:${bbtOf(C.f,[C.p,C.q],{lo,hi,dsign:signDer(C.cs)})}Giá trị ${ask?'lớn nhất':'nhỏ nhất'} của hàm số trên đoạn ${ivC(lo,hi)} là`,correct:ask?M:m,ok:()=>true,cands:vals.concat([C.xCD,C.xCT]).filter(v=>v!==(ask?M:m)),
    sol:`So sánh các giá trị trong bảng: ${vals.map(sg).join('; ')}. Giá trị ${ask?'lớn nhất':'nhỏ nhất'} là ${sg(ask?M:m)}.`,chk:()=>M>m});
});
N12('k12-2-cubic',1,'TH',[2],r=>{
  for(;;){const C=cubic12(r,{d:r.int(-5,5)}),lo=r.int(C.p-2,C.p),hi=r.int(Math.max(lo+1,C.p+1),C.q+2);
    const cand=[lo,hi,...[C.p,C.q].filter(x=>x>lo&&x<hi)],vals=cand.map(C.f),M=Math.max(...vals),m=Math.min(...vals),ask=r.chance(.5);
    if(M===m)continue;const ans=ask?M:m;
    return mkNum(r,{stem:`Giá trị ${ask?'lớn nhất':'nhỏ nhất'} của hàm số ${I('y')} = ${P3(C.cs)} trên đoạn ${ivC(lo,hi)} bằng`,correct:ans,ok:()=>true,cands:[C.fp,C.fq,C.f(lo),C.f(hi),ask?m:M,C.d].filter(v=>v!==ans),
      sol:`${I('y')}′ = ${P3(pder(C.cs))} = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}. Trên đoạn ${ivC(lo,hi)} xét các giá trị: ${cand.map((x,i)=>`y(${sg(x)}) = ${sg(vals[i])}`).join('; ')}. Vậy ${ask?'max':'min'} = ${sg(ans)}.`,
      chk:()=>{let b=ask?-1e9:1e9;for(let i=0;i<=2000;i++){const v=C.f(lo+(hi-lo)*i/2000);b=ask?Math.max(b,v):Math.min(b,v)}return Math.abs(b-ans)<1e-3}})}
});
N12('k12-2-rat',1,'TH',[2],r=>{
  for(;;){const a=r.nz(-3,3),b=r.int(-6,6),d=r.int(-3,3),D=a*d-b;if(!D)continue;
    const lo=r.int(-d+1,-d+3),hi=lo+r.int(1,3),f=x=>(a*x+b)/(x+d),ask=r.chance(.5),inc=D>0,ans=ask?(inc?f(hi):f(lo)):(inc?f(lo):f(hi));
    const qf=x=>Q(a*x+b,x+d),qa=ask?(inc?qf(hi):qf(lo)):(inc?qf(lo):qf(hi));
    return mkF(r,{stem:`Giá trị ${ask?'lớn nhất':'nhỏ nhất'} của hàm số ${I('y')} = ${fr(xlin(a,b),xlin(1,d))} trên đoạn ${ivC(lo,hi)} bằng`,correct:qa,
      cands:[ask?(inc?qf(lo):qf(hi)):(inc?qf(hi):qf(lo)),Q(a),qf(0),qf((lo+hi)%2?lo+1:(lo+hi)/2)],
      sol:`${I('y')}′ = ${fr(sg(D),den2(d))} ${inc?'> 0':'< 0'} trên đoạn ${ivC(lo,hi)} nên hàm số ${inc?'đồng biến':'nghịch biến'} trên đoạn này. Giá trị ${ask?'lớn nhất':'nhỏ nhất'} là y(${sg(ask===inc?hi:lo)}) = ${qh(qa)}.`,
      chk:()=>Math.abs(qv(qa)-ans)<1e-9&&(lo+d)>0})}
});
N12('k12-2-amgm',1,'TH',[2],r=>{
  const k=r.int(1,6),c=r.int(-3,4),ask=r.int(0,1);
  const fx=`${I('x')} + ${fr(k*k,I('x'))}${c?` ${c<0?MINUS:'+'} ${Math.abs(c)}`:''}`;
  return mkNum(r,{stem:ask?`Giá trị nhỏ nhất của hàm số ${I('y')} = ${fx} trên khoảng ${ivO(0,Infinity)} bằng`:`Hàm số ${I('y')} = ${fx} đạt giá trị nhỏ nhất trên khoảng ${ivO(0,Infinity)} tại ${I('x')} bằng`,
    correct:ask?2*k+c:k,ok:v=>v>0||ask,cands:ask?[k+c,k*k+c,2*k*k+c,2*k,k+1+c]:[k*k,2*k,k+1,2],
    sol:`${I('y')}′ = 1 ${MINUS} ${fr(k*k,I('x')+sup(2))} = 0 ⟺ x = ${k} (vì x > 0). ${I('y')}′ < 0 trên (0; ${k}), ${I('y')}′ > 0 trên (${k}; +∞) nên min = y(${k}) = ${sg(2*k+c)}.`,
    chk:()=>{let b=1e9,bx=0;for(let i=1;i<=4000;i++){const x=i*k/1000,v=x+k*k/x+c;if(v<b){b=v;bx=x}}return Math.abs(b-(2*k+c))<1e-6&&Math.abs(bx-k)<1e-6}});
});
N12('k12-2-quart',1,'TH',[2],r=>{
  for(;;){const Q4=quart12(r,{k:r.int(1,2),c:r.int(-4,4)}),lo=r.int(-3,0),hi=r.int(1,3);
    const cand=[lo,hi,...[-Q4.k,0,Q4.k].filter(x=>x>lo&&x<hi)],vals=cand.map(Q4.f),M=Math.max(...vals),m=Math.min(...vals),ask=r.chance(.5),ans=ask?M:m;if(M===m)continue;
    return mkNum(r,{stem:`Giá trị ${ask?'lớn nhất':'nhỏ nhất'} của hàm số ${I('y')} = ${P3(Q4.cs)} trên đoạn ${ivC(lo,hi)} bằng`,correct:ans,ok:()=>true,cands:vals.concat([Q4.c,Q4.yk,ask?m:M]).filter(v=>v!==ans),
      sol:`${I('y')}′ = ${P3(pder(Q4.cs))} = 0 ⟺ x ∈ {${MINUS}${Q4.k}; 0; ${Q4.k}}. Trên đoạn ${ivC(lo,hi)}: ${cand.map((x,i)=>`y(${sg(x)}) = ${sg(vals[i])}`).join('; ')}. Vậy ${ask?'max':'min'} = ${sg(ans)}.`,
      chk:()=>{let b=ask?-1e9:1e9;for(let i=0;i<=2000;i++){const v=Q4.f(lo+(hi-lo)*i/2000);b=ask?Math.max(b,v):Math.min(b,v)}return Math.abs(b-ans)<1e-3}})}
});
DS12('ds12-2-seg',1,'TH',[2],r=>{
  for(;;){const C=cubic12(r,{d:r.int(-5,5)}),lo=C.p-r.int(1,2),hi=C.q+r.int(0,1);
    const cand=[lo,hi,...[C.p,C.q].filter(x=>x>lo&&x<hi)],vals=cand.map(C.f),M=Math.max(...vals),m=Math.min(...vals);if(M===m||new Set(vals).size<cand.length)continue;
    const xin=[C.p,C.q].filter(x=>x>lo&&x<hi);
    return mkDS(r,{stem:`Cho hàm số ${YF} = ${P3(C.cs)} xét trên đoạn ${ivC(lo,hi)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Phương trình ${FPX} = 0 có ${xin.length} nghiệm thuộc khoảng ${ivO(lo,hi)}.`,f:`Phương trình ${FPX} = 0 có ${xin.length===2?1:2} nghiệm thuộc khoảng ${ivO(lo,hi)}.`,why:`${FPX} = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}; số nghiệm thuộc ${ivO(lo,hi)} là ${xin.length}.`},
      {t:`${I('f')}(${sg(lo)}) = ${sg(C.f(lo))}.`,f:`${I('f')}(${sg(lo)}) = ${sg(C.f(lo)+r.pick([-2,2]))}.`,why:`Thay x = ${sg(lo)}: f(${sg(lo)}) = ${sg(C.f(lo))}.`},
      {t:`Giá trị lớn nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(M)}.`,f:`Giá trị lớn nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(M===C.yCD?Math.max(...vals.filter(v=>v!==M)):C.yCD)}.`,why:`So sánh ${cand.map((x,i)=>`f(${sg(x)}) = ${sg(vals[i])}`).join('; ')}.`},
      {t:`Giá trị nhỏ nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(m)}.`,f:`Giá trị nhỏ nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(m===C.yCT?Math.min(...vals.filter(v=>v!==m)):C.yCT)}.`,why:`Giá trị nhỏ nhất trong các giá trị trên là ${sg(m)}.`}],
      chk:()=>xin.length>=1&&C.f(lo)!==C.f(lo)+2})}
});
TLN12('t12-2-sqrt',1,'VD',[2],r=>{
  /* y = x + √(2t² − x²): max = 2t tại x = t; min = −t√2 tại x = −t√2 */
  const t=r.int(1,5),k=2*t*t,c=r.int(-3,3);
  return{kind:'tln',stem:`Tìm giá trị lớn nhất của hàm số ${I('y')} = ${I('x')} + ${rt(`${k} ${MINUS} ${I('x')}${sup(2)}`)}${c?` ${c<0?MINUS:'+'} ${Math.abs(c)}`:''}.`,ans:2*t+c,unit:'',
    sol:`Tập xác định [${MINUS}${rt(k)}; ${rt(k)}]. ${I('y')}′ = 1 ${MINUS} ${fr(I('x'),rt(`${k} − x²`))} = 0 ⟺ ${rt(`${k} − x²`)} = x ⟺ x = ${t}. y(${t}) = ${sg(2*t+c)}, y(${rt(k)}) = ${rt(k)}${c?` ${c<0?MINUS:'+'} ${Math.abs(c)}`:''}, y(${MINUS}${rt(k)}) = ${MINUS}${rt(k)}${c?` ${c<0?MINUS:'+'} ${Math.abs(c)}`:''}. Vậy max = ${sg(2*t+c)}.`,
    chk:()=>{let b=-1e9;for(let i=0;i<=4000;i++){const x=-Math.sqrt(k)+2*Math.sqrt(k)*i/4000,v=x+Math.sqrt(Math.max(0,k-x*x))+c;b=Math.max(b,v)}return Math.abs(b-(2*t+c))<1e-4}};
});
TLN12('t12-2-Mm',1,'VD',[2],r=>{
  for(;;){const C=cubic12(r,{d:r.int(-5,5)}),lo=r.int(C.p-2,C.p),hi=r.int(C.q,C.q+2);if(lo>=hi)continue;
    const cand=[lo,hi,...[C.p,C.q].filter(x=>x>lo&&x<hi)],vals=cand.map(C.f),M=Math.max(...vals),m=Math.min(...vals),op=r.pick(['+','−']);
    if(M===m)continue;const ans=op==='+'?M+m:M-m;
    return{kind:'tln',stem:`Gọi ${I('M')}, ${I('m')} lần lượt là giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${I('y')} = ${P3(C.cs)} trên đoạn ${ivC(lo,hi)}. Tính ${I('M')} ${op} ${I('m')}.`,ans,unit:'',
      sol:`${I('y')}′ = ${P3(pder(C.cs))} = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}. ${cand.map((x,i)=>`y(${sg(x)}) = ${sg(vals[i])}`).join('; ')}. M = ${sg(M)}, m = ${sg(m)} ⟹ M ${op} m = ${sg(ans)}.`,chk:()=>Math.abs(ans)<1000}}
});
TL12('tl12-2-max',1,'TH','a',[2],r=>{
  for(;;){const C=cubic12(r,{d:r.int(-5,5)}),lo=C.p-r.int(0,1),hi=C.q+r.int(1,2);
    const cand=[lo,hi,...[C.p,C.q].filter(x=>x>lo&&x<hi)],vals=cand.map(C.f),M=Math.max(...vals),m=Math.min(...vals);if(M===m)continue;
    const a=r.nz(-3,3),b=r.int(-5,5),d=r.int(1,3),D=a*d-b;if(!D)continue;
    const l2=0,h2=r.int(2,4),qf=x=>Q(a*x+b,x+d),inc=D>0,qM=inc?qf(h2):qf(l2),qm=inc?qf(l2):qf(h2);
    return{kind:'tl',title:'Giá trị lớn nhất, giá trị nhỏ nhất',parts:[
      {pts:.5,html:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${I('y')} = ${P3(C.cs)} trên đoạn ${ivC(lo,hi)}.`},
      {pts:.5,html:`Tìm giá trị lớn nhất và giá trị nhỏ nhất của hàm số ${I('y')} = ${fr(xlin(a,b),xlin(1,d))} trên đoạn ${ivC(l2,h2)}.`}],
      sol:[ptxt([[`${I('y')}′ = ${P3(pder(C.cs))} = 0 ⟺ x = ${sg(C.p)} hoặc x = ${sg(C.q)}; ${cand.map((x,i)=>`y(${sg(x)}) = ${sg(vals[i])}`).join('; ')}.`,.25],[`max = ${sg(M)}, min = ${sg(m)}.`,.25]]),
        ptxt([[`${I('y')}′ = ${fr(sg(D),den2(d))} ${inc?'> 0':'< 0'} trên ${ivC(l2,h2)} nên hàm số ${inc?'đồng biến':'nghịch biến'}.`,.25],[`max = ${qh(qM)}, min = ${qh(qm)}.`,.25]])],
      chk:()=>qv(qM)>qv(qm)}}
});
