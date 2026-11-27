/* ================================================================
   LỚP 9 – Hình vẽ minh họa (SVG, in đen trắng vẫn rõ)
   fig9(P, o): P = {tên: [x, y]} (y hướng lên)
     o.segs, o.dashed: [[A, B]]       đoạn nét liền / nét đứt
     o.circ: [[tâm hoặc [x,y], R]]    đường tròn
     o.right: [[A, V, B]]            kí hiệu góc vuông tại V
     o.angs: [[A, V, B, nhãn]]        cung đánh dấu góc tại V kèm nhãn
     o.lens: [[A, B, nhãn]]           nhãn độ dài cạnh
     o.ell: [[[x,y], rx, ry, kiểu]]   elip (kiểu 'full' | 'half': nửa sau nét đứt)
     o.lc: tâm để đặt nhãn điểm ra phía ngoài (mặc định trọng tâm các điểm)
   ================================================================ */
function fig9(P,o={}){
  const names=Object.keys(P),W=o.w||230,H=o.h||170,pad=o.pad||22,f=v=>v.toFixed(1);
  const pt=c=>typeof c==='string'?P[c]:c;
  const bx=[],by=[];names.forEach(n=>{bx.push(P[n][0]);by.push(P[n][1])});
  [...(o.circ||[]),...(o.arcs||[])].forEach(([c,R])=>{const p=pt(c);bx.push(p[0]-R,p[0]+R);by.push(p[1]-R,p[1]+R)});
  (o.ell||[]).forEach(([c,rx,ry])=>{bx.push(c[0]-rx,c[0]+rx);by.push(c[1]-ry,c[1]+ry)});
  [...(o.segs||[]),...(o.dashed||[])].flat().forEach(p=>{if(Array.isArray(p)){bx.push(p[0]);by.push(p[1])}});
  const mnx=Math.min(...bx),mxx=Math.max(...bx),mny=Math.min(...by),mxy=Math.max(...by);
  const k=Math.min((W-2*pad)/((mxx-mnx)||1),(H-2*pad)/((mxy-mny)||1)),ox=(W-(mxx-mnx)*k)/2,oy=(H-(mxy-mny)*k)/2;
  const S=p=>[ox+(p[0]-mnx)*k,H-oy-(p[1]-mny)*k],pts={};names.forEach(n=>pts[n]=S(P[n]));
  const lc=o.lc?S(pt(o.lc)):[names.reduce((s,n)=>s+pts[n][0],0)/names.length,names.reduce((s,n)=>s+pts[n][1],0)/names.length];
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Hình vẽ">`;
  (o.sector||[]).forEach(([c,R,a0,a1])=>{const C=S(pt(c)),r=R*k,p0=[C[0]+r*Math.cos(a0*Math.PI/180),C[1]-r*Math.sin(a0*Math.PI/180)],p1=[C[0]+r*Math.cos(a1*Math.PI/180),C[1]-r*Math.sin(a1*Math.PI/180)];
    s+=`<path d="M${f(C[0])},${f(C[1])} L${f(p0[0])},${f(p0[1])} A${f(r)},${f(r)} 0 ${a1-a0>180?1:0} 0 ${f(p1[0])},${f(p1[1])} Z" fill="#d6d6d6" stroke="none"/>`});
  (o.arcs||[]).forEach(([c,R,a0,a1])=>{const C=S(pt(c)),r=R*k,p0=[C[0]+r*Math.cos(a0*Math.PI/180),C[1]-r*Math.sin(a0*Math.PI/180)],p1=[C[0]+r*Math.cos(a1*Math.PI/180),C[1]-r*Math.sin(a1*Math.PI/180)];
    s+=`<path d="M${f(p0[0])},${f(p0[1])} A${f(r)},${f(r)} 0 ${a1-a0>180?1:0} 0 ${f(p1[0])},${f(p1[1])}" fill="none" stroke="#000" stroke-width="1.1"/>`});
  (o.circ||[]).forEach(([c,R])=>{const C=S(pt(c));s+=`<circle cx="${f(C[0])}" cy="${f(C[1])}" r="${f(R*k)}" fill="none" stroke="#000" stroke-width="1.1"/>`});
  (o.ell||[]).forEach(([c,rx,ry,t])=>{const C=S(c),X=rx*k,Y=ry*k;
    if(t==='half')s+=`<path d="M${f(C[0]-X)},${f(C[1])} A${f(X)},${f(Y)} 0 0 0 ${f(C[0]+X)},${f(C[1])}" fill="none" stroke="#000" stroke-width="1.1"/><path d="M${f(C[0]-X)},${f(C[1])} A${f(X)},${f(Y)} 0 0 1 ${f(C[0]+X)},${f(C[1])}" fill="none" stroke="#000" stroke-width="0.9" stroke-dasharray="4 3"/>`;
    else s+=`<ellipse cx="${f(C[0])}" cy="${f(C[1])}" rx="${f(X)}" ry="${f(Y)}" fill="${t==='fill'?'#e2e2e2':'none'}" stroke="#000" stroke-width="1.1"/>`});
  const line=([a,b],d)=>{const p=pts[a]||S(a),q=pts[b]||S(b);s+=`<line x1="${f(p[0])}" y1="${f(p[1])}" x2="${f(q[0])}" y2="${f(q[1])}" stroke="#000" stroke-width="${d?0.9:1.1}"${d?' stroke-dasharray="4 3"':''}/>`};
  (o.segs||[]).forEach(e=>line(e,0));(o.dashed||[]).forEach(e=>line(e,1));
  (o.right||[]).forEach(([a,v,b])=>{const V=pts[v],A=pts[a],B=pts[b],ua=[A[0]-V[0],A[1]-V[1]],ub=[B[0]-V[0],B[1]-V[1]],la=Math.hypot(...ua)||1,lb=Math.hypot(...ub)||1,m=7,
    p1=[V[0]+ua[0]/la*m,V[1]+ua[1]/la*m],p2=[p1[0]+ub[0]/lb*m,p1[1]+ub[1]/lb*m],p3=[V[0]+ub[0]/lb*m,V[1]+ub[1]/lb*m];
    s+=`<polyline points="${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])} ${f(p3[0])},${f(p3[1])}" fill="none" stroke="#000" stroke-width="0.9"/>`});
  (o.angs||[]).forEach(([a,v,b,t,rr])=>{const V=pts[v],A=pts[a],B=pts[b];let ta=Math.atan2(A[1]-V[1],A[0]-V[0]),tb=Math.atan2(B[1]-V[1],B[0]-V[0]);
    let d=tb-ta;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;const R0=rr||13,q0=[V[0]+R0*Math.cos(ta),V[1]+R0*Math.sin(ta)],q1=[V[0]+R0*Math.cos(ta+d),V[1]+R0*Math.sin(ta+d)];
    s+=`<path d="M${f(q0[0])},${f(q0[1])} A${R0},${R0} 0 0 ${d>0?1:0} ${f(q1[0])},${f(q1[1])}" fill="none" stroke="#000" stroke-width="0.9"/>`;
    if(t){const m=ta+d/2,L=R0+11;s+=`<text x="${f(V[0]+L*Math.cos(m))}" y="${f(V[1]+L*Math.sin(m)+3.5)}" font-size="10" text-anchor="middle">${t}</text>`}});
  (o.lens||[]).forEach(([a,b,t])=>{const p=pts[a]||S(a),q=pts[b]||S(b),mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,dx=q[0]-p[0],dy=q[1]-p[1],l=Math.hypot(dx,dy)||1;let nx=-dy/l,ny=dx/l;if((mx-lc[0])*nx+(my-lc[1])*ny<0){nx=-nx;ny=-ny}
    s+=`<text x="${f(mx+nx*10)}" y="${f(my+ny*10+3.5)}" font-size="10" text-anchor="middle">${t}</text>`});
  (o.texts||[]).forEach(([p,t,dx,dy])=>{const q=S(p),it=/^[a-zA-Z]$/.test(t);s+=`<text x="${f(q[0]+(dx||0))}" y="${f(q[1]+(dy||0))}" font-size="${it?11:10}"${it?' font-style="italic"':''} text-anchor="middle">${t}</text>`});
  const show=o.show||names.filter(n=>!(o.hide||[]).includes(n));
  show.forEach(n=>{const p=pts[n],off=(o.off||{})[n];let lx,ly;
    if(off){lx=p[0]+off[0];ly=p[1]+off[1]}else{const dx=p[0]-lc[0],dy=p[1]-lc[1],l=Math.hypot(dx,dy);lx=p[0]+(l<1?-9:dx/l*11);ly=p[1]+(l<1?-5:dy/l*11+4)}
    s+=`${(o.nodot||[]).includes(n)?'':`<circle cx="${f(p[0])}" cy="${f(p[1])}" r="1.7" fill="#000"/>`}<text x="${f(lx)}" y="${f(ly)}" font-size="11" font-style="italic" text-anchor="middle">${n.replace(/\d+$/,'')}</text>`});
  return `<div class="figure">${s}</svg></div>`;
}
const onC=(R,deg,c=[0,0])=>[c[0]+R*Math.cos(deg*Math.PI/180),c[1]+R*Math.sin(deg*Math.PI/180)];
/* tam giác ABC vuông tại A: A gốc, B trên trục hoành, C trên trục tung */
const fig9Right=(AB,AC,o={})=>fig9({A:[0,0],B:[AB,0],C:[0,AC]},{segs:[['A','B'],['B','C'],['C','A']],right:[['B','A','C']],w:o.w||200,h:o.h||140,lens:o.lens||[],angs:o.angs||[]});
/* góc nội tiếp: cung nhỏ AB có số đo a (độ), C trên cung lớn (major = true) hoặc cung nhỏ */
const fig9Ins=(a,o={})=>{const A=onC(1,270-a/2),B=onC(1,270+a/2),C=o.major===false?onC(1,270):onC(1,90+(o.cs||15)),P={O:[0,0],A,B};P[o.cn||'C']=C;
  const segs=[[o.cn||'C','A'],[o.cn||'C','B']];if(o.oab!==false){segs.push(['O','A'],['O','B'])}if(o.ab)segs.push(['A','B']);
  return fig9(P,{circ:[['O',1]],segs,lc:'O',w:170,h:170,angs:o.angs||[]})};
/* hai tiếp tuyến MA, MB từ M; OM = d·R */
const fig9Tan=(R,OM,o={})=>{const t=Math.acos(R/OM)*180/Math.PI,P={O:[0,0],M:[OM,0],A:onC(R,t),B:onC(R,-t)};if(o.C)P.C=onC(R,180);if(o.H)P.H=[R*R/OM,0];
  const segs=[['M','A'],['M','B'],['O','A'],['O','B']];if(o.C)segs.push(['C','A'],['C','B']);if(o.ab)segs.push(['A','B']);
  return fig9(P,{circ:[['O',R]],segs,dashed:[['O','M']],right:[['O','A','M'],['O','B','M']],lc:[OM*0.45,0],w:230,h:150,angs:o.angs||[]})};
/* dây AB cách tâm O một khoảng d, H là trung điểm */
const fig9Chord=(R,d)=>{const h=Math.sqrt(R*R-d*d);return fig9({O:[0,0],A:[-h,-d],B:[h,-d],H:[0,-d]},{circ:[['O',R]],segs:[['A','B'],['O','A']],dashed:[['O','H']],right:[['O','H','B']],lc:'O',off:{H:[0,13]},w:170,h:170})};
/* tứ giác nội tiếp với các đỉnh ở các góc cho trước (độ, đo trên đường tròn) */
const fig9Quad=(ds=[200,290,350,110],ex=[])=>{const P={O:[0,0]};['A','B','C','D'].forEach((n,i)=>P[n]=onC(1,ds[i]));
  return fig9(P,{circ:[['O',1]],segs:[['A','B'],['B','C'],['C','D'],['D','A'],...ex],lc:'O',show:['A','B','C','D'],w:170,h:170})};
/* cột (A đỉnh, B chân), bóng BC, góc tại C */
const fig9Pole=(h,d,lab)=>fig9({A:[0,h],B:[0,0],C:[d,0]},{segs:[['A','B'],['B','C']],dashed:[['A','C']],right:[['A','B','C']],angs:[['A','C','B',lab.ang]],lens:[['B','C',lab.d]].concat(lab.h?[['A','B',lab.h]]:[]),w:210,h:150});
/* hình trụ */
const fig9Cyl=(R,h,lab={})=>{const ry=R*.28;return fig9({},{ell:[[[0,h],R,ry,'full'],[[0,0],R,ry,'half']],segs:[[[-R,0],[-R,h]],[[R,0],[R,h]]],dashed:[[[0,0],[R,0]],[[0,0],[0,h]]],
  texts:[[[R/2,0],lab.r||'r',0,-4],[[0,h/2],lab.h||'h',-10,3]],w:150,h:150})};
/* hình nón */
const fig9Cone=(R,h,lab={})=>{const ry=R*.28;return fig9({},{ell:[[[0,0],R,ry,'half']],segs:[[[-R,0],[0,h]],[[R,0],[0,h]]],dashed:[[[0,0],[R,0]],[[0,0],[0,h]]],
  texts:[[[R/2,0],lab.r||'r',0,-4],[[0,h/2],lab.h||'h',-9,3]].concat(lab.l?[[[R/2,h/2],lab.l,12,0]]:[]),w:150,h:150})};
/* hình cầu */
/* bán kính vẽ chếch lên trên, tách khỏi đường xích đạo để nhãn độ dài dễ đọc */
const fig9Sph=(lab={})=>fig9({},{circ:[[[0,0],1]],ell:[[[0,0],1,.3,'half']],dashed:[[[0,0],[.77,.64]]],texts:[[[.36,.33],lab.r||'R',-12,-2]],w:130,h:130});
/* parabol y = a·x² có đánh dấu điểm */
const fig9Par=(a,mk)=>{const xm=Math.abs(mk[0])+1.2,Y=Math.abs(mk[1]);return graphSVG(x=>a*x*x,{x:[-xm,xm],y:a>0?[-1,Y+1.5]:[-Y-1.5,1],marks:[mk],w:190,h:180})};
/* một tiếp tuyến MA */
const fig9Tan1=(R,OM)=>{const t=Math.acos(R/OM)*180/Math.PI;return fig9({O:[0,0],A:onC(R,t),M:[OM,0]},{circ:[['O',R]],segs:[['O','A'],['A','M'],['O','M']],right:[['O','A','M']],lc:[OM*.4,0],w:220,h:150})};
/* tam giác nhọn ABC nội tiếp (O), góc BAC = a */
const fig9TriIn=a=>fig9({O:[0,0],A:onC(1,90),B:onC(1,270-a),C:onC(1,270+a)},{circ:[['O',1]],segs:[['A','B'],['B','C'],['C','A'],['O','B'],['O','C']],lc:'O',w:170,h:170});
/* tam giác ABC vuông tại A nội tiếp đường tròn đường kính BC */
const fig9RtIn=(AB,AC)=>fig9({O:[0,0],B:[-1,0],C:[1,0],A:onC(1,2*Math.atan(AC/AB)*180/Math.PI)},{circ:[['O',1]],segs:[['A','B'],['A','C'],['B','C']],right:[['B','A','C']],lc:'O',w:170,h:170});
/* tứ giác nội tiếp biết ∠A = a, ∠B = b */
const fig9QuadAB=(a,b)=>{const lo=Math.max(0,360-2*a-2*b),hi=Math.min(360-2*b,360-2*a),u=(lo+hi)/2,B=180+u;return fig9Quad([180,B,540-2*b,B+2*a])};
/* tháp đo bằng hai điểm quan sát */
const fig9Tower=(h,x,d,a,b)=>fig9({C:[0,h],H:[0,0],B:[x,0],A:[x+d,0]},{segs:[['C','H'],['H','A']],dashed:[['C','B'],['C','A']],right:[['C','H','B']],angs:[['C','A','H',a+'°',16],['C','B','H',b+'°',13]],lens:[['B','A',d+' m'],['H','B','x'],['C','H','h']],w:240,h:150});
/* kem ốc quế: nón úp ngược và nửa hình cầu */
const fig9Ice=(R,H)=>fig9({},{arcs:[[[0,0],R,0,180]],ell:[[[0,0],R,R*.28,'full']],segs:[[[-R,0],[0,-H]],[[R,0],[0,-H]]],dashed:[[[0,0],[0,-H]],[[0,0],[R,0]]],texts:[[[0,-H/2],'h',-8,3],[[R/2,0],'r',0,-4]],w:140,h:170});

/* ===================== Đọc đồ thị hàm số y = ax² ===================== */
const PAR9=[[1,2],[-1,2],[2,1],[-2,1],[2,2],[-2,2],[.5,2],[-.5,2],[1.5,2],[-1.5,2],[3,1],[-3,1],[.25,2],[1,1],[-1,1]];
N9b('k9-18-graph',6,'TH',[18],r=>{
  const [A,x0]=r.pick(PAR9),xx=(r.chance(.5)?1:-1)*x0,y0=A*x0*x0,q=Q(Math.round(A*4),4);
  return mkF(r,{stem:`Đường cong trong hình vẽ là đồ thị của hàm số ${I('y')} = ${I('a')}${I('x')}${sup(2)}. Giá trị của ${I('a')} bằng${fig9Par(A,[xx,y0])}`,correct:q,cands:[Q(-q[0],q[1]),Q(q[1],q[0]),Q(y0,xx),Q(2*q[0],q[1]),Q(q[0],2*q[1])],
    sol:`Đồ thị đi qua điểm (${sg(xx)}; ${fmt(y0)}) nên ${fmt(y0)} = a·(${sg(xx)})² ⇒ a = ${qh(q)}.`,chk:()=>isInt(y0)});
});
TLN9b('t9-18-graph',6,'TH',[18],r=>{
  for(;;){const [a,x0]=r.pick([[1,2],[-1,2],[2,1],[-2,1],[.5,2],[-.5,2],[2,2],[-2,2],[3,1],[-3,1]]),s=r.chance(.5)?1:-1,y0=a*x0*x0,x1=r.pick([3,4,-3,-4,5]),v=a*x1*x1;if(Math.abs(x1)===x0)continue;
    return{kind:'tln',stem:`Đường cong trong hình vẽ là đồ thị của hàm số ${I('y')} = ${I('a')}${I('x')}${sup(2)}.${fig9Par(a,[s*x0,y0])}Tính giá trị của hàm số tại ${I('x')} = ${sg(x1)}.`,ans:v,unit:'',
      sol:`Đồ thị đi qua (${sg(s*x0)}; ${fmt(y0)}) nên a = ${fmt(y0)} : ${x0*x0} = ${fmt(a)}. Tại x = ${sg(x1)}: y = ${fmt(a)}·(${sg(x1)})² = ${fmt(v)}.`,chk:()=>isInt(v*100)}}
});
