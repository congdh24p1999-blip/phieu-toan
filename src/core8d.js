/* ================= CHƯƠNG IX: TAM GIÁC ĐỒNG DẠNG (kèm định lí Pythagore) ================= */
/* Hình phẳng đơn giản: P = {tên:[x,y]} (y hướng lên), segs = các đoạn nét liền */
function fig2D(P,segs,o={}){
  const names=Object.keys(P),W=o.w||230,H=o.h||150,pad=o.pad||24;
  const xs=names.map(n=>P[n][0]),ys=names.map(n=>P[n][1]);
  const mnx=Math.min(...xs),mxx=Math.max(...xs),mny=Math.min(...ys),mxy=Math.max(...ys);
  const k=Math.min((W-2*pad)/((mxx-mnx)||1),(H-2*pad)/((mxy-mny)||1));
  const ox=(W-(mxx-mnx)*k)/2,oy=(H-(mxy-mny)*k)/2;
  const S=p=>[ox+(p[0]-mnx)*k,H-oy-(p[1]-mny)*k];
  const pts={};names.forEach(n=>pts[n]=S(P[n]));
  const cx=names.reduce((s,n)=>s+pts[n][0],0)/names.length,cy=names.reduce((s,n)=>s+pts[n][1],0)/names.length;
  const f=v=>v.toFixed(1);
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Hình vẽ">`;
  const line=([a,b],d)=>{const p=pts[a],q=pts[b];s+=`<line x1="${f(p[0])}" y1="${f(p[1])}" x2="${f(q[0])}" y2="${f(q[1])}" stroke="#000" stroke-width="1.1"${d?' stroke-dasharray="4 3"':''}/>`};
  segs.forEach(e=>line(e,0));(o.dashed||[]).forEach(e=>line(e,1));
  (o.right||[]).forEach(([a,v,b])=>{const V=pts[v],A=pts[a],B=pts[b],ua=[A[0]-V[0],A[1]-V[1]],ub=[B[0]-V[0],B[1]-V[1]],la=Math.hypot(...ua)||1,lb=Math.hypot(...ub)||1,m=8,
    p1=[V[0]+ua[0]/la*m,V[1]+ua[1]/la*m],p2=[V[0]+ua[0]/la*m+ub[0]/lb*m,V[1]+ua[1]/la*m+ub[1]/lb*m],p3=[V[0]+ub[0]/lb*m,V[1]+ub[1]/lb*m];
    s+=`<polyline points="${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])} ${f(p3[0])},${f(p3[1])}" fill="none" stroke="#000" stroke-width="0.9"/>`});
  (o.lens||[]).forEach(([a,b,t])=>{const p=pts[a],q=pts[b],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1;let nx=-dy/l,ny=dx/l;if((mx-cx)*nx+(my-cy)*ny<0){nx=-nx;ny=-ny}
    s+=`<text x="${f(mx+nx*9)}" y="${f(my+ny*9+3.5)}" font-size="10" text-anchor="middle">${t}</text>`});
  (o.show||names).forEach(n=>{const p=pts[n],off=(o.off||{})[n];let lx,ly;
    if(off){lx=p[0]+off[0];ly=p[1]+off[1]}else{const dx=p[0]-cx,dy=p[1]-cy,l=Math.hypot(dx,dy)||1;lx=p[0]+dx/l*11;ly=p[1]+dy/l*11+4}
    s+=`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="1.7" fill="#000"/><text x="${f(lx)}" y="${f(ly)}" font-size="11" font-style="italic" text-anchor="middle">${n}</text>`});
  return `<div class="figure">${s}</svg></div>`;
}
const PYT8=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[6,8,10],[9,12,15],[12,16,20],[15,20,25],[10,24,26],[20,21,29]];
const pyt=r=>{const t=r.pick(PYT8);return r.chance(.5)?t:[t[1],t[0],t[2]]};
/* (3k; 4k; 5k): đường cao và hình chiếu là số thập phân hữu hạn (một chữ số sau dấu phẩy) */
const HRT=[1,2,3,4,5,6,8,10].map(k=>[3*k,4*k,5*k]);
const dec1=v=>Math.abs(v*10-Math.round(v*10))<1e-9;
const hrt=r=>{const t=r.pick(HRT);return r.chance(.5)?t:[t[1],t[0],t[2]]};
const TRI8=s=>`Δ${I(s)}`;
const cm=n=>`${fmt(n)} cm`;
/* tam giác ABC vuông tại A, AB=a, AC=b, đường cao AH (toạ độ để vẽ hình) */
function triRightPts(a,b){const c=Math.hypot(a,b);return{B:[0,0],C:[c,0],A:[a*a/c,a*b/c],H:[a*a/c,0]}}
const SIM='∼';

N8('m8-9-ratio',9,'NB',r=>{
  const a=r.int(2,9),b=r.int(2,9);if(a===b)return T.nlc['m8-9-ratio'].gen(r);
  const q=Q(a,b);
  return mkTxt(r,{stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')}, biết ${I('AB')} = ${a} cm, ${I('DE')} = ${b} cm. Tỉ số đồng dạng của ${TRI8('ABC')} so với ${TRI8('DEF')} là`,correct:qh(q),wrongs:[qh(Q(b,a)),qh(Q(a+b,b)),qh(Q(a,a+b)),qh(Q(a,b+1)),qh(Q(a*a,b*b))],
    sol:`Tỉ số đồng dạng của ${TRI8('ABC')} so với ${TRI8('DEF')} bằng tỉ số hai cạnh tương ứng ${I('AB')} và ${I('DE')}: ${fr(a,b)}${q[1]===b?'':` = ${qh(q)}`}.`,chk:()=>q[0]/q[1]===a/b});
});
N8('m8-9-sides',9,'TH',r=>{
  const k=r.int(2,4),a=r.int(2,7),b=r.int(2,9),c=r.int(2,9),side=r.pick([['BC','EF',b],['CA','FD',c]]);
  return mkNum(r,{stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')}, ${I('AB')} = ${a} cm, ${I(side[0])} = ${side[2]} cm, ${I('DE')} = ${k*a} cm. Độ dài ${I(side[1])} là`,correct:k*side[2],cands:[side[2]+k*a-a,side[2]*a,side[2]+k,k*side[2]+1,side[2],k*a],f:z=>`${z} cm`,
    sol:`${TRI8('ABC')} ${SIM} ${TRI8('DEF')} nên ${fr('AB','DE')} = ${fr(I(side[0]),I(side[1]))} = ${fr(a,k*a)} = ${fr(1,k)}. Suy ra ${I(side[1])} = ${k}·${side[2]} = ${k*side[2]} cm.`,chk:()=>(k*a)/a===k});
});
N8('m8-9-angle',9,'TH',r=>{
  const A=r.int(4,14)*5,B=r.int(4,14)*5,C=180-A-B;if(C<=10||A===B||B===C||A===C)return T.nlc['m8-9-angle'].gen(r);
  const val={A,B,C},dv={A:'D',B:'E',C:'F'},known=r.shuffle(['A','B','C']).slice(0,2),need=['A','B','C'].find(x=>!known.includes(x)),corr=dv[need];
  return mkNum(r,{stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')}, biết ∠${I(known[0])} = ${val[known[0]]}°, ∠${I(known[1])} = ${val[known[1]]}°. Số đo ∠${I(corr)} là`,correct:val[need],cands:[180-val[known[0]],180-val[known[1]],val[known[0]]+val[known[1]],val[known[0]],val[known[1]],val[need]+10],f:z=>`${z}°`,
    sol:`${TRI8('ABC')} ${SIM} ${TRI8('DEF')} nên các góc tương ứng bằng nhau: ∠${corr} = ∠${need}. Trong ${TRI8('ABC')}: ∠${need} = 180° ${MINUS} ${val[known[0]]}° ${MINUS} ${val[known[1]]}° = ${val[need]}°. Vậy ∠${corr} = ${val[need]}°.`,chk:()=>A+B+C===180});
});
N8('m8-9-case',9,'NB',r=>{
  const L={ccc:'cạnh – cạnh – cạnh (c.c.c)',cgc:'cạnh – góc – cạnh (c.g.c)',gg:'góc – góc (g.g)'};
  const q=r.pick([
    {t:`ba cặp cạnh tương ứng của hai tam giác tỉ lệ với nhau`,k:'ccc'},
    {t:`hai cặp cạnh tương ứng của hai tam giác tỉ lệ và các góc xen giữa hai cặp cạnh đó bằng nhau`,k:'cgc'},
    {t:`hai góc của tam giác này lần lượt bằng hai góc của tam giác kia`,k:'gg'}]);
  return mkTxt(r,{stem:`Nếu ${q.t} thì hai tam giác đồng dạng theo trường hợp`,correct:L[q.k],wrongs:[...Object.keys(L).filter(z=>z!==q.k).map(z=>L[z]),'cạnh – cạnh – góc (c.c.g)'],
    sol:`Đây là trường hợp đồng dạng ${L[q.k]}. Không có trường hợp đồng dạng “cạnh – cạnh – góc” tổng quát.`,chk:()=>true});
});
N8('m8-9-check',9,'TH',r=>{
  const t=r.pick([[3,4,5],[4,5,6],[2,3,4],[5,6,7],[6,8,10],[5,12,13],[4,6,9],[7,8,10]]),k=r.pick([2,3]),[a,b,c]=t;
  const S=(x,y,z)=>`(${x} cm; ${y} cm; ${z} cm)`,base=S(a,b,c),ok=S(k*a,k*b,k*c);
  const wr=[S(k*a,k*b,k*c+1),S(k*a+1,k*b+1,k*c+1),S(a+k,b+k,c+k),S(k*a,k*b+1,k*c),S(k*a+2,k*b,k*c)].filter(z=>z!==ok);
  return mkTxt(r,{stem:`Cho tam giác ${I('ABC')} có độ dài ba cạnh ${base}. Tam giác nào sau đây đồng dạng với ${TRI8('ABC')}? (Cho biết độ dài ba cạnh của tam giác đó.)`,correct:ok,wrongs:wr,
    sol:`Hai tam giác đồng dạng theo trường hợp c.c.c khi ba cặp cạnh tương ứng tỉ lệ. Với ${ok}: ${fr(k*a,a)} = ${fr(k*b,b)} = ${fr(k*c,c)} = ${k}, nên đồng dạng với ${TRI8('ABC')}; các bộ còn lại không có ba tỉ số bằng nhau.`,
    chk:()=>wr.every(w=>w!==ok)&&(()=>{const re=/\((\d+) cm; (\d+) cm; (\d+) cm\)/;return wr.every(w=>{const m=w.match(re).slice(1).map(Number);return !(m[0]/a===m[1]/b&&m[1]/b===m[2]/c)})})()});
});
N8('m8-9-perim',9,'TH',r=>{
  const m=r.int(1,4),n=r.int(m+1,m+4),g=(x,y)=>y?g(y,x%y):x;if(g(m,n)!==1)return T.nlc['m8-9-perim'].gen(r);
  const p1=r.int(2,6)*n;/* chu vi ΔDEF, ΔABC ∼ ΔDEF tỉ số m/n */
  const ans=p1*m/n;
  return mkNum(r,{stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')} theo tỉ số đồng dạng ${fr(m,n)}. Biết chu vi ${TRI8('DEF')} bằng ${p1} cm. Chu vi ${TRI8('ABC')} bằng`,correct:ans,cands:[p1*n/m,p1*m*m/(n*n),p1+m,p1-m,p1*m,ans+n],f:z=>`${fmt(z)} cm`,
    sol:`Tỉ số chu vi của hai tam giác đồng dạng bằng tỉ số đồng dạng nên chu vi ${TRI8('ABC')} = ${fr(m,n)}·${p1} = ${ans} cm.`,chk:()=>Number.isInteger(ans)});
});
N8('m8-9-area',9,'TH',r=>{
  const m=r.int(1,4),n=r.int(m+1,m+3),g=(x,y)=>y?g(y,x%y):x;if(g(m,n)!==1)return T.nlc['m8-9-area'].gen(r);
  const s1=r.int(1,6)*m*m,ans=s1*n*n/(m*m);
  return mkNum(r,{stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')} theo tỉ số đồng dạng ${fr(m,n)}. Biết diện tích ${TRI8('ABC')} bằng ${s1} cm². Diện tích ${TRI8('DEF')} bằng`,correct:ans,cands:[s1*n/m,s1*m*m/(n*n),s1+n-m,s1*n,ans+n*n,ans-n],f:z=>`${fmt(z)} cm²`,
    sol:`Tỉ số diện tích bằng bình phương tỉ số đồng dạng: ${fr('S<sub>ABC</sub>','S<sub>DEF</sub>')} = ${fr(m*m,n*n)}. Suy ra diện tích ${TRI8('DEF')} = ${s1}·${fr(n*n,m*m)} = ${ans} cm².`,chk:()=>Number.isInteger(ans)&&ans>0});
});
N8('m8-9-pyth',9,'NB',r=>{
  const [a,b,c]=pyt(r);
  return mkNum(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm. Độ dài cạnh ${I('BC')} là`,correct:c,cands:[a+b,c+1,c-1,Math.abs(b*b-a*a),a*b,c+2],f:z=>`${z} cm`,
    sol:`Theo định lí Pythagore: ${I('BC')}${sup(2)} = ${I('AB')}${sup(2)} + ${I('AC')}${sup(2)} = ${a}${sup(2)} + ${b}${sup(2)} = ${c*c}. Vậy ${I('BC')} = ${c} cm.`,chk:()=>a*a+b*b===c*c});
});
N8('m8-9-pyth2',9,'TH',r=>{
  const [a,b,c]=pyt(r);
  return mkNum(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, ${I('BC')} = ${c} cm, ${I('AB')} = ${a} cm. Độ dài cạnh ${I('AC')} là`,correct:b,cands:[c-a,c+a,b+1,b-1,c,Math.round((c*c+a*a)**.5)],f:z=>`${z} cm`,
    sol:`Theo định lí Pythagore: ${I('AC')}${sup(2)} = ${I('BC')}${sup(2)} ${MINUS} ${I('AB')}${sup(2)} = ${c*c} ${MINUS} ${a*a} = ${b*b}. Vậy ${I('AC')} = ${b} cm.`,chk:()=>a*a+b*b===c*c});
});
N8('m8-9-inv',9,'NB',r=>{
  const [a,b,c]=r.pick(PYT8.slice(0,6)),S=(x,y,z)=>`${x} cm, ${y} cm, ${z} cm`;
  const wr=[S(a,b,c+1),S(a+1,b+1,c+1),S(a+1,b,c),S(a,b+2,c+1),S(a+2,b+3,c+4)].filter(z=>z!==S(a,b,c));
  return mkTxt(r,{stem:`Bộ ba độ dài nào sau đây là độ dài ba cạnh của một tam giác vuông?`,correct:S(a,b,c),wrongs:wr,
    sol:`Theo định lí Pythagore đảo, tam giác có ba cạnh ${a}, ${b}, ${c} là tam giác vuông vì ${a}${sup(2)} + ${b}${sup(2)} = ${a*a+b*b} = ${c}${sup(2)}; các bộ còn lại không thỏa mãn.`,
    chk:()=>wr.every(w=>{const m=w.match(/\d+/g).map(Number).sort((x,y)=>x-y);return m[0]*m[0]+m[1]*m[1]!==m[2]*m[2]})});
});
N8('m8-9-diag',9,'TH',r=>{
  const [a,b,c]=pyt(r);
  return mkNum(r,{stem:`Một hình chữ nhật có chiều dài ${Math.max(a,b)} cm và chiều rộng ${Math.min(a,b)} cm. Độ dài đường chéo của hình chữ nhật là`,correct:c,cands:[a+b,c+1,c-1,Math.abs(a-b),a*b],f:z=>`${z} cm`,
    sol:`Đường chéo chia hình chữ nhật thành hai tam giác vuông có hai cạnh góc vuông ${a} cm và ${b} cm. Độ dài đường chéo = ${rt(`${a}${sup(2)} + ${b}${sup(2)}`)} = ${rt(c*c)} = ${c} cm.`,chk:()=>a*a+b*b===c*c});
});
N8('m8-9-sqdiag',9,'TH',r=>{
  const a=r.int(2,12);
  return mkTxt(r,{stem:`Đường chéo của hình vuông có cạnh ${a} cm có độ dài là`,correct:`${a}${rt(2)} cm`,wrongs:[`${2*a} cm`,`${a*a}${rt(2)} cm`,`${rt(a)} cm`,`${a} cm`,`${a}${rt(3)} cm`],
    sol:`Đường chéo chia hình vuông thành hai tam giác vuông cân có cạnh góc vuông ${a} cm nên độ dài đường chéo = ${rt(`${a}${sup(2)} + ${a}${sup(2)}`)} = ${rt(2*a*a)} = ${a}${rt(2)} cm.`,chk:()=>true});
});
N8('m8-9-isoh',9,'TH',r=>{
  const [m,h,c]=pyt(r);
  return mkNum(r,{stem:`Tam giác ${I('ABC')} cân tại ${I('A')} có ${I('AB')} = ${I('AC')} = ${c} cm, ${I('BC')} = ${2*m} cm. Độ dài đường cao ${I('AH')} là`,correct:h,cands:[c-m,c+m,h+1,h-1,m],f:z=>`${z} cm`,
    sol:`${I('AH')} cũng là trung tuyến nên ${I('HB')} = ${m} cm. Trong tam giác vuông ${I('AHB')}: ${I('AH')}${sup(2)} = ${c}${sup(2)} ${MINUS} ${m}${sup(2)} = ${h*h}. Vậy ${I('AH')} = ${h} cm.`,chk:()=>m*m+h*h===c*c});
});
N8('m8-9-par',9,'TH',r=>{
  const b1=r.int(5,12),a1=r.int(2,b1-2),k=r.int(2,4),bc=a1*k*1,x=Q(a1*bc,b1);
  if(x[1]!==1)return T.nlc['m8-9-par'].gen(r);
  return mkNum(r,{stem:`Cho tam giác ${I('ABC')}, điểm ${I('D')} thuộc ${I('AB')}, điểm ${I('E')} thuộc ${I('AC')} sao cho ${I('DE')} // ${I('BC')}. Biết ${I('AD')} = ${a1} cm, ${I('AB')} = ${b1} cm, ${I('BC')} = ${bc} cm. Độ dài ${I('DE')} là`,correct:x[0],cands:[bc-a1,bc*b1/a1,x[0]+1,x[0]-1,bc+b1-a1],f:z=>`${fmt(z)} cm`,
    sol:`${I('DE')} // ${I('BC')} nên ${TRI8('ADE')} ${SIM} ${TRI8('ABC')}, suy ra ${fr('DE','BC')} = ${fr('AD','AB')}. Do đó ${I('DE')} = ${I('BC')}·${fr(a1,b1)} = ${bc}·${a1}/${b1} = ${x[0]} cm.`,chk:()=>a1*bc%b1===0});
});
N8('m8-9-hrt',9,'TH',r=>{
  const [a,b,c]=hrt(r),AH=Math.round(a*b/c*10)/10,BH=Math.round(a*a/c*10)/10,CH=Math.round(b*b/c*10)/10,ask=r.pick(['AH','BH','CH']);
  const val={AH,BH,CH},ex={AH:`${I('AH')}·${I('BC')} = ${I('AB')}·${I('AC')} nên ${I('AH')} = ${a}·${b}/${c} = ${fmt(AH)} cm`,BH:`${I('AB')}${sup(2)} = ${I('BH')}·${I('BC')} nên ${I('BH')} = ${a}${sup(2)}/${c} = ${fmt(BH)} cm`,CH:`${I('AC')}${sup(2)} = ${I('CH')}·${I('BC')} nên ${I('CH')} = ${b}${sup(2)}/${c} = ${fmt(CH)} cm`};
  return mkNum(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, đường cao ${I('AH')}, ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm, ${I('BC')} = ${c} cm. Độ dài ${I(ask)} là`,correct:val[ask],cands:[AH,BH,CH,a+b-c,val[ask]+1,val[ask]-1,c-val[ask]].map(z=>Math.round(z*10)/10).filter(z=>z!==Math.round(val[ask]*10)/10),f:z=>`${fmt(z)} cm`,
    sol:`Áp dụng hệ thức lượng trong tam giác vuông (hoặc dùng các cặp tam giác đồng dạng): ${ex[ask]}.`,chk:()=>dec1(AH)&&dec1(BH)&&dec1(CH)&&Math.abs(BH+CH-c)<1e-9});
});
N8('m8-9-shadow',9,'TH',r=>{
  const p=r.pick([1,2,3]),q=r.pick([2,3,4].filter(z=>z!==p)),k=r.int(3,8);
  return mkNum(r,{stem:`Vào cùng một thời điểm, một cọc tiêu cao ${p} m có bóng trên mặt đất dài ${q} m, còn một cái cây có bóng dài ${k*q} m. Chiều cao của cái cây là (xem tia nắng song song, cọc và cây vuông góc với mặt đất)`,correct:k*p,cands:[k*q,p+k,k*p+1,k*p-1,q*k+p,p*q],f:z=>`${z} m`,
    sol:`Hai tam giác vuông tạo bởi cọc và bóng của nó, cây và bóng của nó đồng dạng (g.g) nên ${fr('chiều cao cây','chiều cao cọc')} = ${fr('bóng cây','bóng cọc')} = ${fr(k*q,q)} = ${k}. Chiều cao cây = ${k}·${p} = ${k*p} m.`,chk:()=>true});
});
N8('m8-9-ladder',9,'TH',r=>{
  const [d,h,l]=pyt(r),ask=r.chance(.5);
  return mkNum(r,{stem:ask?`Một chiếc thang dài ${l} m dựa vào tường thẳng đứng, chân thang cách tường ${d} m. Đầu trên của thang chạm tường ở độ cao bao nhiêu mét (so với mặt đất, mặt đất nằm ngang)?`:`Một chiếc thang dài ${l} m dựa vào tường thẳng đứng. Khi đầu trên của thang chạm tường ở độ cao ${h} m so với mặt đất thì chân thang cách tường bao nhiêu mét?`,correct:ask?h:d,cands:ask?[l-d,l+d,h+1,h-1,l]:[l-h,l+h,d+1,d-1,l],f:z=>`${z} m`,
    sol:`Thang, tường và mặt đất tạo thành tam giác vuông có cạnh huyền ${l} m. ${ask?`Chiều cao = ${rt(`${l}${sup(2)} ${MINUS} ${d}${sup(2)}`)} = ${rt(h*h)} = ${h} m`:`Khoảng cách = ${rt(`${l}${sup(2)} ${MINUS} ${h}${sup(2)}`)} = ${rt(d*d)} = ${d} m`}.`,chk:()=>d*d+h*h===l*l});
});

DS8('ds8-9-sim',9,'NB',r=>{
  const m=r.int(1,3),n=r.int(m+1,m+3),g=(x,y)=>y?g(y,x%y):x;if(g(m,n)!==1)return T.ds['ds8-9-sim'].gen(r);
  const a=r.int(2,6)*m,b=r.int(2,6)*m,c=r.int(2,6)*m;/* ΔABC ∼ ΔDEF theo tỉ số m/n */
  if(a===c||a+b<=c||b+c<=a||a+c<=b)return T.ds['ds8-9-sim'].gen(r);
  const items=[
    {t:`${I('DE')} = ${a*n/m} cm.`,f:'',why:`${fr('AB','DE')} = ${fr(m,n)} nên ${I('DE')} = ${a}·${n}/${m} = ${a*n/m} cm.`},
    {t:`∠${I('DEF')} = ∠${I('ABC')}.`,f:`∠${I('DEF')} = ∠${I('ACB')}.`,why:`Hai tam giác đồng dạng có các góc tương ứng bằng nhau: ∠DEF = ∠ABC (đỉnh ${I('E')} tương ứng với đỉnh ${I('B')}); vì ${I('AB')} ≠ ${I('CA')} nên ∠ABC ≠ ∠ACB.`},
    {t:`Tỉ số chu vi của ${TRI8('ABC')} và ${TRI8('DEF')} bằng ${fr(m,n)}.`,f:`Tỉ số chu vi của ${TRI8('ABC')} và ${TRI8('DEF')} bằng ${fr(m*m,n*n)}.`,why:`Tỉ số chu vi bằng tỉ số đồng dạng ${fr(m,n)}.`},
    {t:`Tỉ số diện tích của ${TRI8('ABC')} và ${TRI8('DEF')} bằng ${fr(m*m,n*n)}.`,f:`Tỉ số diện tích của ${TRI8('ABC')} và ${TRI8('DEF')} bằng ${fr(m,n)}.`,why:`Tỉ số diện tích bằng bình phương tỉ số đồng dạng: ${fr(m*m,n*n)}.`}
  ];
  const dd=a*n/m,wrongDE=dd+r.pick([1,2,3]);
  items[0].f=`${I('DE')} = ${wrongDE} cm.`;
  return mkDS(r,{stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')} theo tỉ số đồng dạng ${fr(m,n)}, biết ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm, ${I('CA')} = ${c} cm. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>Number.isInteger(dd)&&wrongDE!==dd});
});
DS8('ds8-9-pyth',9,'TH',r=>{
  const [a,b,c]=hrt(r),AH=a*b/c,BH=a*a/c,CH=b*b/c;
  const P=triRightPts(a,b);
  const items=[
    {t:`${I('BC')} = ${c} cm.`,f:`${I('BC')} = ${c+1} cm.`,why:`${I('BC')}${sup(2)} = ${a}${sup(2)} + ${b}${sup(2)} = ${c*c}.`},
    {t:`${TRI8('HBA')} ${SIM} ${TRI8('ABC')}.`,f:`${TRI8('HBA')} ${SIM} ${TRI8('ACB')}.`,why:`Hai tam giác vuông ${TRI8('HBA')} và ${TRI8('ABC')} có chung góc nhọn ${I('B')} nên đồng dạng, với ${I('H')}↔${I('A')}, ${I('B')}↔${I('B')}, ${I('A')}↔${I('C')}.`},
    {t:`${I('AH')} = ${fmt(AH)} cm.`,f:`${I('AH')} = ${AH+r.pick([2,3])} cm.`,why:`${I('AH')}·${I('BC')} = ${I('AB')}·${I('AC')} nên ${I('AH')} = ${a}·${b}/${c} = ${fmt(AH)} cm.`},
    {t:`${I('BH')} = ${fmt(BH)} cm.`,f:`${I('BH')} = ${fmt(CH)} cm.`,why:`${I('AB')}${sup(2)} = ${I('BH')}·${I('BC')} nên ${I('BH')} = ${a}${sup(2)}/${c} = ${fmt(BH)} cm.`}
  ];
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, đường cao ${I('AH')}, ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm.${fig2D(P,[['A','B'],['B','C'],['C','A'],['A','H']],{right:[['B','A','C'],['A','H','B']],off:{H:[0,15]}})} Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>BH!==CH&&a*a+b*b===c*c});
});

TLN8('t8-9-pyth',9,'TH',r=>{
  const f=r.int(0,2);let stem,ans,sol;
  if(f===0){const [a,b,c]=pyt(r);stem=`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm. Tính độ dài ${I('BC')} (đơn vị cm).`;ans=c;sol=`${I('BC')}${sup(2)} = ${a}${sup(2)} + ${b}${sup(2)} = ${c*c} nên ${I('BC')} = ${c} cm.`}
  else if(f===1){const [d,h,l]=pyt(r);stem=`Một chiếc thang dài ${l} m dựa vào bức tường thẳng đứng, chân thang cách tường ${d} m. Đầu trên của thang cách mặt đất bao nhiêu mét?`;ans=h;sol=`Chiều cao = ${rt(`${l}${sup(2)} ${MINUS} ${d}${sup(2)}`)} = ${rt(h*h)} = ${h} m.`}
  else{const [a,b,c]=pyt(r);stem=`Một hình chữ nhật có hai kích thước ${a} cm và ${b} cm. Tính độ dài đường chéo của hình chữ nhật (đơn vị cm).`;ans=c;sol=`Đường chéo = ${rt(`${a}${sup(2)} + ${b}${sup(2)}`)} = ${rt(c*c)} = ${c} cm.`}
  return{kind:'tln',stem,ans,unit:'',sol,chk:()=>true};
});
TLN8('t8-9-sim',9,'TH',r=>{
  const a=r.int(3,8),k=r.int(2,5),b=r.int(3,9);
  return{kind:'tln',stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('MNP')} có ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm, ${I('MN')} = ${k*a} cm. Tính độ dài ${I('NP')} (đơn vị cm).`,ans:k*b,unit:'',
    sol:`${fr('MN','AB')} = ${fr('NP','BC')} = ${fr(k*a,a)} = ${k}, nên ${I('NP')} = ${k}·${b} = ${k*b} cm.`,chk:()=>true};
});
TLN8('t8-9-height',9,'TH',r=>{
  const [a,b,c]=hrt(r),ask=r.pick(['AH','BH','CH']),v={AH:a*b/c,BH:a*a/c,CH:b*b/c}[ask];
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, đường cao ${I('AH')}, ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm. Tính độ dài ${I(ask)} (đơn vị cm).`,ans:v,unit:'',
    sol:`${I('BC')} = ${rt(`${a}${sup(2)} + ${b}${sup(2)}`)} = ${c} cm. ${ask==='AH'?`${I('AH')} = ${I('AB')}·${I('AC')}/${I('BC')} = ${a}·${b}/${c} = ${fmt(v)}`:ask==='BH'?`${I('AB')}${sup(2)} = ${I('BH')}·${I('BC')} nên ${I('BH')} = ${a}${sup(2)}/${c} = ${fmt(v)}`:`${I('AC')}${sup(2)} = ${I('CH')}·${I('BC')} nên ${I('CH')} = ${b}${sup(2)}/${c} = ${fmt(v)}`} cm.`,chk:()=>dec1(v)};
});
TLN8('t8-9-shadow',9,'VD',r=>{
  const p=r.pick([1.5,2,3]),q=r.pick([2,3,4].filter(z=>z!==p)),k=r.int(4,9);
  const ans=k*p;
  return{kind:'tln',stem:`Vào cùng một thời điểm, một cọc cao ${fmt(p)} m có bóng dài ${q} m, một tòa nhà có bóng dài ${k*q} m. Tính chiều cao của tòa nhà (đơn vị m).`,ans,unit:'',
    sol:`Hai tam giác vuông tạo bởi vật và bóng của nó đồng dạng (g.g), nên chiều cao tòa nhà = ${fmt(p)}·${fr(k*q,q)} = ${fmt(ans)} m.`,chk:()=>Math.abs(ans*100-Math.round(ans*100))<1e-9};
});
TLN8('t8-9-area',9,'VD',r=>{
  const m=r.int(1,3),n=r.int(m+1,m+3),g=(x,y)=>y?g(y,x%y):x;if(g(m,n)!==1)return T.tln['t8-9-area'].gen(r);
  const s=r.int(1,5)*n*n,ans=s*m*m/(n*n);
  return{kind:'tln',stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')} theo tỉ số đồng dạng ${fr(m,n)}. Biết diện tích ${TRI8('DEF')} bằng ${s} cm². Tính diện tích ${TRI8('ABC')} (đơn vị cm²).`,ans,unit:'',
    sol:`Tỉ số diện tích bằng bình phương tỉ số đồng dạng: ${fr('S<sub>ABC</sub>','S<sub>DEF</sub>')} = ${fr(m*m,n*n)}. Vậy diện tích ${TRI8('ABC')} = ${s}·${fr(m*m,n*n)} = ${ans} cm².`,chk:()=>Number.isInteger(ans)};
});
TLN8('t8-9-bis',9,'VD',r=>{
  /* AD là phân giác: DB/DC = AB/AC ⟹ DC = BC·AC/(AB + AC) */
  let a,b,c;for(let i=0;i<500;i++){a=r.int(3,12);b=r.int(3,12);c=r.int(Math.abs(a-b)+1,a+b-1);if(a!==b&&(c*b)%(a+b)===0)break}
  const dc=c*b/(a+b);if((c*b)%(a+b)!==0)return T.tln['t8-9-bis'].gen(r);
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm, ${I('BC')} = ${c} cm. Đường phân giác ${I('AD')} (${I('D')} thuộc ${I('BC')}). Tính độ dài ${I('DC')} (đơn vị cm).`,ans:dc,unit:'',
    sol:`Theo tính chất đường phân giác: ${fr('DB','DC')} = ${fr('AB','AC')} = ${fr(a,b)}, suy ra ${fr('DC','BC')} = ${fr(b,a+b)}. Vậy ${I('DC')} = ${c}·${b}/${a+b} = ${dc} cm.`,chk:()=>(c*b)%(a+b)===0&&a+b>c&&Math.abs(a-b)<c};
});
TLN8('t8-9-vdc',9,'VDC',r=>{
  const [a,b,c]=hrt(r),AH=a*b/c;
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm. Kẻ đường cao ${I('AH')}; gọi ${I('M')}, ${I('N')} lần lượt là hình chiếu của ${I('H')} trên ${I('AB')} và ${I('AC')}. Tính độ dài ${I('MN')} (đơn vị cm).`,ans:AH,unit:'',
    sol:`Tứ giác ${I('AMHN')} có ba góc vuông (∠${I('A')} = ∠${I('M')} = ∠${I('N')} = 90°) nên là hình chữ nhật, suy ra ${I('MN')} = ${I('AH')}. Ta có ${I('BC')} = ${c} cm nên ${I('AH')} = ${I('AB')}·${I('AC')}/${I('BC')} = ${a}·${b}/${c} = ${fmt(AH)} cm. Vậy ${I('MN')} = ${fmt(AH)} cm.`,chk:()=>dec1(AH)};
});

/* ----- Tự luận chương IX ----- */
TL8('tl8-9-hrt',9,'TH','geo',r=>{
  const [a,b,c]=hrt(r),AH=a*b/c,BH=a*a/c,P=triRightPts(a,b);
  const fig=fig2D(P,[['A','B'],['B','C'],['C','A'],['A','H']],{right:[['B','A','C'],['A','H','B']],off:{H:[0,15]}});
  return{kind:'tl',title:'Tam giác đồng dạng',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, đường cao ${I('AH')}.${fig} Chứng minh ${TRI8('HBA')} ${SIM} ${TRI8('ABC')}.`},
    {pts:.5,html:`Cho ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm. Tính độ dài ${I('BC')} và ${I('AH')}.`}],
    sol:[ptxt([[`Xét ${TRI8('HBA')} và ${TRI8('ABC')} có ∠${I('BHA')} = ∠${I('BAC')} = 90° và ∠${I('B')} chung.`,.25],[`Do đó ${TRI8('HBA')} ${SIM} ${TRI8('ABC')} (g.g).`,.25]]),
      ptxt([[`${I('BC')} = ${rt(`${a}${sup(2)} + ${b}${sup(2)}`)} = ${c} cm (định lí Pythagore).`,.25],[`${I('AH')} = ${I('AB')}·${I('AC')}/${I('BC')} = ${a}·${b}/${c} = ${fmt(AH)} cm.`,.25]])],
    chk:()=>dec1(AH)&&a*a+b*b===c*c};
});
TL8('tl8-9-alt',9,'VD','geo',r=>{
  /* ΔABC nhọn, BD ⊥ AC, CE ⊥ AB; cos A = u/v, AB = v·m, AC = v·n, AD = u·m, AE = u·n */
  let u,v,m,n;
  for(let i=0;i<300;i++){[u,v]=r.pick([[1,2],[1,3],[2,3],[3,4],[1,4],[2,5]]);m=r.int(1,4);n=r.int(1,4);if(n!==m&&u*m<v*n&&u*n<v*m)break}
  if(!(n!==m&&u*m<v*n&&u*n<v*m))return T.tl['tl8-9-alt'].gen(r);
  const AB=v*m,AC=v*n,AD=u*m,AE=u*n,cosA=u/v,sinA=Math.sqrt(1-cosA*cosA);
  const Pt={A:[0,0],B:[AB,0],C:[AC*cosA,AC*sinA],E:[AC*cosA,0],D:[AB*cosA*cosA,AB*cosA*sinA]};
  const fig=fig2D(Pt,[['A','B'],['B','C'],['C','A'],['B','D'],['C','E']],{right:[['A','D','B'],['A','E','C']],off:{E:[0,15]}});
  return{kind:'tl',title:'Tam giác đồng dạng (hai đường cao)',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác nhọn ${I('ABC')} có hai đường cao ${I('BD')} và ${I('CE')} (${I('D')} thuộc ${I('AC')}, ${I('E')} thuộc ${I('AB')}).${fig} Chứng minh ${TRI8('ABD')} ${SIM} ${TRI8('ACE')}.`},
    {pts:.5,html:`Chứng minh ${I('AD')}·${I('AC')} = ${I('AE')}·${I('AB')}. Biết ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm, ${I('AE')} = ${AE} cm, tính độ dài ${I('AD')}.`}],
    sol:[ptxt([[`Xét ${TRI8('ABD')} và ${TRI8('ACE')} có ∠${I('ADB')} = ∠${I('AEC')} = 90° và ∠${I('A')} chung.`,.25],[`Do đó ${TRI8('ABD')} ${SIM} ${TRI8('ACE')} (g.g).`,.25]]),
      ptxt([[`Từ ${TRI8('ABD')} ${SIM} ${TRI8('ACE')} suy ra ${fr('AD','AE')} = ${fr('AB','AC')}, tức ${I('AD')}·${I('AC')} = ${I('AE')}·${I('AB')}.`,.25],[`${I('AD')} = ${I('AE')}·${I('AB')}/${I('AC')} = ${AE}·${AB}/${AC} = ${AD} cm.`,.25]])],
    chk:()=>AD*AC===AE*AB&&AB>AE&&AC>AD};
});
TL8('tl8-9-ladder',9,'VD','real',r=>{
  const [d,h,l]=pyt(r),down=r.int(1,Math.min(3,h-1));
  /* thang dài l; chân cách tường d, chạm tường ở độ cao h. Trượt xuống down mét: cao h − down, chân cách tường √(l² − (h−down)²) (không nhất thiết nguyên) */
  const h2=h-down,x2=l*l-h2*h2;
  return{kind:'tl',title:'Ứng dụng định lí Pythagore',parts:[
    {pts:.5,html:`Một chiếc thang dài ${l} m dựa vào bức tường thẳng đứng. Chân thang cách chân tường ${d} m. Tính độ cao của đầu trên thang so với mặt đất (mặt đất phẳng, nằm ngang).`},
    {pts:.5,html:`Nếu đầu trên của thang trượt xuống ${down} m thì chân thang cách chân tường bây giờ bao nhiêu mét? (Làm tròn kết quả đến hàng phần mười.)`}],
    sol:[ptxt([[`Thang, tường và mặt đất tạo thành tam giác vuông với cạnh huyền ${l} m.`,.25],[`Độ cao = ${rt(`${l}${sup(2)} ${MINUS} ${d}${sup(2)}`)} = ${rt(h*h)} = ${h} m.`,.25]]),
      ptxt([[`Độ cao mới là ${h} ${MINUS} ${down} = ${h2} m. Khoảng cách từ chân thang đến tường là ${rt(`${l}${sup(2)} ${MINUS} ${h2}${sup(2)}`)} = ${rt(x2)}.`,.25],[Number.isInteger(Math.sqrt(x2))?`= ${Math.sqrt(x2)} m.`:`≈ ${fmt(Math.round(Math.sqrt(x2)*10)/10)} m.`,.25]])],
    chk:()=>d*d+h*h===l*l&&x2>0};
});
TL8('tl8-9-vdc',9,'VDC','geo',r=>{
  const [a,b,c]=hrt(r),AH=a*b/c,P=triRightPts(a,b),AM=a*AH/c,AN=b*AH/c;
  /* M, N: hình chiếu của H trên AB, AC. AM·AB = AH² = AN·AC. ΔAMN ∼ ΔACB. */
  /* M, N là chân đường vuông góc hạ từ H */
  const proj=(Pnt,U,V)=>{const dx=V[0]-U[0],dy=V[1]-U[1],t=((Pnt[0]-U[0])*dx+(Pnt[1]-U[1])*dy)/(dx*dx+dy*dy);return[U[0]+t*dx,U[1]+t*dy]};
  const Mp=proj(P.H,P.A,P.B),Np=proj(P.H,P.A,P.C);
  const fig=fig2D({...P,M:Mp,N:Np},[['A','B'],['B','C'],['C','A'],['A','H'],['H','M'],['H','N'],['M','N']],{right:[['B','A','C'],['A','H','B'],['A','M','H'],['A','N','H']],off:{H:[0,15]}});
  return{kind:'tl',title:'Tam giác đồng dạng và hệ thức lượng',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, đường cao ${I('AH')}. Gọi ${I('M')}, ${I('N')} lần lượt là hình chiếu của ${I('H')} trên ${I('AB')} và ${I('AC')}.${fig} Chứng minh ${I('AM')}·${I('AB')} = ${I('AH')}${sup(2)} và ${I('AN')}·${I('AC')} = ${I('AH')}${sup(2)}.`},
    {pts:.5,html:`Chứng minh ${TRI8('AMN')} ${SIM} ${TRI8('ACB')}. Biết ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm, tính độ dài ${I('MN')}.`}],
    sol:[ptxt([[`${TRI8('AMH')} ${SIM} ${TRI8('AHB')} (g.g: ∠${I('AMH')} = ∠${I('AHB')} = 90°, ∠${I('A')}${sub(1)} chung) nên ${fr('AM','AH')} = ${fr('AH','AB')}, tức ${I('AM')}·${I('AB')} = ${I('AH')}${sup(2)}.`,.25],[`Tương tự ${TRI8('ANH')} ${SIM} ${TRI8('AHC')} nên ${I('AN')}·${I('AC')} = ${I('AH')}${sup(2)}.`,.25]]),
      ptxt([[`Từ hai hệ thức trên có ${I('AM')}·${I('AB')} = ${I('AN')}·${I('AC')}, suy ra ${fr('AM','AC')} = ${fr('AN','AB')}; cùng ∠${I('A')} = 90° nên ${TRI8('AMN')} ${SIM} ${TRI8('ACB')} (c.g.c).`,.25],[`${I('AMHN')} là hình chữ nhật nên ${I('MN')} = ${I('AH')} = ${I('AB')}·${I('AC')}/${I('BC')} = ${a}·${b}/${c} = ${fmt(AH)} cm (với ${I('BC')} = ${c} cm).`,.25]])],
    chk:()=>dec1(AH)&&Math.abs(Math.hypot(Mp[0]-Np[0],Mp[1]-Np[1])-AH)<1e-6};
});
