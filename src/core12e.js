/* ================================================================
   LỚP 12 – học kì I: thêm dạng để các vị trí câu trong đề không lặp một dạng
   ================================================================ */
DS12('ds12-3-bbt',1,'NB',[3],r=>{
  const x0=r.nz(-3,3),dec=r.chance(.5),L=r.pick([-4,-3,-2,-1,1,2,3,4].filter(v=>v!==x0));
  const nd=dec?[{x:-Infinity,d:'',y:L,lv:'t'},{x:x0,d:'||',y:[-Infinity,Infinity],lv:['b','t']},{x:Infinity,d:'',y:L,lv:'b'}]
    :[{x:-Infinity,d:'',y:L,lv:'b'},{x:x0,d:'||',y:[Infinity,-Infinity],lv:['t','b']},{x:Infinity,d:'',y:L,lv:'t'}];
  return mkDS(r,{stem:`Cho hàm số ${YF} có bảng biến thiên như sau:${bbtSVG(nd,dec?['−','−']:['+','+'])}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Đồ thị hàm số có tiệm cận đứng là đường thẳng ${xEq(sg(x0))}.`,f:`Đồ thị hàm số có tiệm cận đứng là đường thẳng ${xEq(sg(L))}.`,why:`${lim(I('x'),`${sg(x0)}${sup('+')}`)} f(x) = ${dec?'+∞':'−∞'}.`},
    {t:`Đồ thị hàm số có tiệm cận ngang là đường thẳng ${yEq(sg(L))}.`,f:`Đồ thị hàm số có tiệm cận ngang là đường thẳng ${yEq(sg(x0))}.`,why:`${lim(I('x'),'±∞')} f(x) = ${sg(L)}.`},
    {t:`Hàm số ${dec?'nghịch biến':'đồng biến'} trên khoảng ${ivO(x0,Infinity)}.`,f:`Hàm số ${dec?'đồng biến':'nghịch biến'} trên khoảng ${ivO(x0,Infinity)}.`,why:`Trên ${ivO(x0,Infinity)}, ${FPX} ${dec?'< 0':'> 0'}.`},
    {t:`Hàm số không có cực trị.`,f:`Hàm số có một điểm cực trị là ${I('x')} = ${sg(x0)}.`,why:`${FPX} không đổi dấu trên từng khoảng xác định và x = ${sg(x0)} không thuộc tập xác định.`}],
    chk:()=>x0!==L});
});
DS12('ds12-2-graph',1,'NB',[2],r=>{
  const C=cubic12(r,{as:[1,-1],lo:-2,hi:1,gap:2,ok:z=>Math.abs(z.fp)<=4&&Math.abs(z.fq)<=4&&z.fp!==0&&z.fq!==0&&z.p!==0&&z.q!==0});
  const cc=(C.p+C.q)/2,lo=r.chance(.5)?cc-2:cc,hi=lo+2,ylo=C.f(lo),yhi=C.f(hi);if(Math.abs(ylo)>6||Math.abs(yhi)>6)return T.ds['ds12-2-graph'].gen(r);
  const xs=[lo,...[C.p,C.q].filter(x=>x>lo&&x<hi),hi],vals=xs.map(C.f),M=Math.max(...vals),m=Math.min(...vals),xm=xs[vals.indexOf(m)],xM=xs[vals.indexOf(M)];
  if(vals.filter(v=>v===m).length>1||vals.filter(v=>v===M).length>1)return T.ds['ds12-2-graph'].gen(r);
  const g=x=>x<lo-1e-9||x>hi+1e-9?NaN:C.f(x),V=viewOf([[lo,ylo],[hi,yhi],[C.p,C.fp],[C.q,C.fq]],.8,.8);
  return mkDS(r,{stem:`Cho hàm số ${YF} liên tục trên đoạn ${ivC(lo,hi)} và có đồ thị như hình bên.${graphSVG(g,{...V,marks:xs.map((x,i)=>[x,vals[i]])})}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Giá trị lớn nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(M)}.`,f:`Giá trị lớn nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(xM)===sg(M)?sg(M+1):sg(xM)}.`,why:`Điểm cao nhất của đồ thị trên đoạn có tung độ ${sg(M)}.`},
    {t:`Giá trị nhỏ nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(m)}.`,f:`Giá trị nhỏ nhất của hàm số trên đoạn ${ivC(lo,hi)} bằng ${sg(m+1)}.`,why:`Điểm thấp nhất của đồ thị trên đoạn có tung độ ${sg(m)}.`},
    {t:`Hàm số đạt giá trị nhỏ nhất trên đoạn ${ivC(lo,hi)} tại ${I('x')} = ${sg(xm)}.`,f:`Hàm số đạt giá trị nhỏ nhất trên đoạn ${ivC(lo,hi)} tại ${I('x')} = ${sg(xM)}.`,why:`Điểm thấp nhất có hoành độ ${sg(xm)}.`},
    {t:`${I('f')}(${sg(lo)}) = ${sg(ylo)}.`,f:`${I('f')}(${sg(lo)}) = ${sg(ylo===yhi?ylo+1:yhi)}.`,why:`Đồ thị đi qua điểm (${sg(lo)}; ${sg(ylo)}).`}],
    chk:()=>M>m&&xm!==xM});
});
DS12('ds12-7-box',2,'TH',[7],r=>{
  const a=r.int(2,7),b=r.int(2,7),c=r.int(2,7);if(a===b||b===c||a===c)return T.ds['ds12-7-box'].gen(r);
  const ijk=['i','j','k'].map(s=>vc(I(s)));
  return mkDS(r,{stem:`Trong không gian ${I('Oxyz')}, cho hình hộp chữ nhật ${I('OABC.O′A′B′C′')} có ${I('A')}(${a}; 0; 0), ${I('C')}(0; ${b}; 0) và ${I('O′')}(0; 0; ${c}). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Điểm ${I('B')} có toạ độ (${a}; ${b}; 0).`,f:`Điểm ${I('B')} có toạ độ (${b}; ${a}; 0).`,why:`${vh('O','B')} = ${vh('O','A')} + ${vh('O','C')} = (${a}; ${b}; 0).`},
    {t:`Điểm ${I('B′')} có toạ độ (${a}; ${b}; ${c}).`,f:`Điểm ${I('B′')} có toạ độ (${a}; ${c}; ${b}).`,why:`${vh('O','B′')} = ${vh('O','A')} + ${vh('O','C')} + ${vh('O','O′')}.`},
    {t:`${vh('O','C′')} = ${b}${ijk[1]} + ${c}${ijk[2]}.`,f:`${vh('O','C′')} = ${b}${ijk[0]} + ${c}${ijk[2]}.`,why:`C′(0; ${b}; ${c}).`},
    {t:`Hình chiếu vuông góc của ${I('B′')} trên mặt phẳng (Oxy) là điểm ${I('B')}.`,f:`Hình chiếu vuông góc của ${I('B′')} trên mặt phẳng (Oxy) là điểm ${I('C')}.`,why:`Hình chiếu của B′(${a}; ${b}; ${c}) trên (Oxy) là (${a}; ${b}; 0), chính là B.`}],
    chk:()=>true});
});
DS12('ds12-6-cube',2,'VD',[6],r=>{
  const s=r.int(2,5),L=[];
  for(let it=0;L.length<4&&it<200;it++){const u=niceV(r,3),v=niceV(r,3),k=vdot(bv(...u),bv(...v));if(u[0]+u[1]===v[0]+v[1]||k*k===vlen2(bv(...u))*vlen2(bv(...v))||L.some(x=>x.key===vh(...u)+vh(...v)))continue;
    L.push({key:vh(...u)+vh(...v),t:`${vh(...u)}·${vh(...v)} = ${sg(k*s*s)}.`,f:`${vh(...u)}·${vh(...v)} = ${sg(k?-k*s*s:s*s)}.`,why:`Biểu diễn qua ${vh('A','B')}, ${vh('A','D')}, ${vh('A','A′')} (đôi một vuông góc, độ dài ${s}): tích vô hướng bằng ${k<0?'('+sg(k)+')':k}·${s}² = ${sg(k*s*s)}.`,k})}
  return mkDS(r,{stem:`Cho hình lập phương ${BOXT} có cạnh bằng ${s}.${boxFig(true)}Xét tính đúng sai của các khẳng định sau:`,items:L.map(({t,f,why})=>({t,f,why})),chk:()=>L.length===4&&L.every(x=>Number.isInteger(x.k))});
});
TLN12('t12-1-cnt',1,'TH',[1],r=>{
  const roots=distinctInts(r,4,-5,5).sort((a,b)=>a-b),ex=roots.map(()=>r.pick([1,2,3,1]));
  const fac=roots.map((x,i)=>`${x===0?I('x'):`(${xlin(1,-x)})`}${ex[i]>1?sup(ex[i]):''}`).join(''),cnt=ex.filter(e=>e%2).length,ask=r.chance(.5);
  const big=roots.filter((x,i)=>ex[i]%2).length;
  return{kind:'tln',stem:`Cho hàm số ${YF} có đạo hàm ${FPX} = ${fac}, ∀${I('x')} ∈ ℝ. Hàm số đã cho có bao nhiêu điểm cực trị?`,ans:cnt,unit:'',
    sol:`Các nghiệm bội lẻ của ${FPX} (làm ${FPX} đổi dấu): ${roots.filter((_,i)=>ex[i]%2).map(sg).join('; ')||'không có'}. Vậy hàm số có ${cnt} điểm cực trị.`,chk:()=>big===cnt&&ask!==undefined};
});
TLN12('t12-3-asym',1,'TH',[3],r=>{
  const R=ratF(r,{c:1}),op=r.pick(['+','·']),x0=-R.d,y0=R.a,ans=op==='+'?x0+y0:x0*y0;
  return{kind:'tln',stem:`Đồ thị hàm số ${I('y')} = ${R.html} có tiệm cận đứng ${I('x')} = ${I('a')} và tiệm cận ngang ${I('y')} = ${I('b')}. Tính ${I('a')} ${op} ${I('b')}.`,ans,unit:'',
    sol:`Tiệm cận đứng ${xEq(sg(x0))}, tiệm cận ngang ${yEq(sg(y0))}. Vậy a ${op} b = ${sg(ans)}.`,chk:()=>Math.abs(R.f(x0+1e-7))>1e5};
});
TLN12('t12-2-amgm',1,'TH',[2],r=>{
  const k=r.int(1,7),c=r.int(-5,5),m=r.pick([1,2]);
  /* y = m x + m k²/x + c trên (0; +∞): min = 2mk + c tại x = k */
  return{kind:'tln',stem:`Tìm giá trị nhỏ nhất của hàm số ${I('y')} = ${m===1?'':m}${I('x')} + ${fr(m*k*k,I('x'))}${c?` ${c<0?MINUS:'+'} ${Math.abs(c)}`:''} trên khoảng ${ivO(0,Infinity)}.`,ans:2*m*k+c,unit:'',
    sol:`${I('y')}′ = ${m} − ${fr(m*k*k,'x²')} = 0 ⟺ x = ${k} (x > 0). ${I('y')}′ < 0 trên (0; ${k}) và ${I('y')}′ > 0 trên (${k}; +∞) nên min = y(${k}) = ${sg(2*m*k+c)}.`,
    chk:()=>{let b=1e9;for(let i=1;i<=8000;i++){const x=i*k/2000;b=Math.min(b,m*x+m*k*k/x+c)}return Math.abs(b-(2*m*k+c))<1e-6}};
});
TLN12('t12-7-sym',2,'TH',[7],r=>{
  const [x,y,z]=pt3(r),k=r.int(0,4);
  const T7=[['mặt phẳng (Oxy)',[x,y,-z]],['mặt phẳng (Oyz)',[-x,y,z]],['mặt phẳng (Oxz)',[x,-y,z]],['trục Oz',[-x,-y,z]],['gốc toạ độ O',[-x,-y,-z]]][k],v=T7[1];
  return{kind:'tln',stem:`Trong không gian ${I('Oxyz')}, gọi ${I('M′')}(${I('a')}; ${I('b')}; ${I('c')}) là điểm đối xứng với ${I('M')}${tup([x,y,z])} qua ${T7[0]}. Tính ${I('a')} + 2${I('b')} + 3${I('c')}.`,ans:v[0]+2*v[1]+3*v[2],unit:'',
    sol:`M′${tup(v)} nên a + 2b + 3c = ${sg(v[0])} + 2·(${sg(v[1])}) + 3·(${sg(v[2])}) = ${sg(v[0]+2*v[1]+3*v[2])}.`,chk:()=>true};
});
TLN12('t12-6-dot2',2,'TH',[6],r=>{
  for(;;){const p=r.int(1,8),q=r.int(1,8),th=r.pick([60,120,180,0]),ab=th===0?p*q:th===180?-p*q:(th===60?1:-1)*p*q/2;if(!Number.isInteger(ab))continue;
    return{kind:'tln',stem:`Trong không gian, cho hai vectơ ${vc(I('a'))}, ${vc(I('b'))} có |${vc(I('a'))}| = ${p}, |${vc(I('b'))}| = ${q} và góc giữa hai vectơ bằng ${th}°. Tính ${vc(I('a'))}·${vc(I('b'))}.`,ans:ab,unit:'',
      sol:`${vc(I('a'))}·${vc(I('b'))} = ${p}·${q}·cos ${th}° = ${sg(ab)}.`,chk:()=>Math.abs(p*q*Math.cos(th*Math.PI/180)-ab)<1e-9}}
});
TL12('tl12-5-cost',1,'TH','b',[5],r=>{
  const k=r.int(2,9),m=k*k*r.pick([1,100]),sq=Math.sqrt(m),c=r.int(5,40),L=4*r.int(3,15),q=L/4;
  return{kind:'tl',title:'Giá trị nhỏ nhất, lớn nhất trong thực tiễn',parts:[
    {pts:.5,html:`Tổng chi phí sản xuất ${I('x')} sản phẩm của một xưởng là ${I('C')}(${I('x')}) = ${I('x')}${sup(2)} + ${c}${I('x')} + ${m} (nghìn đồng). Tìm số sản phẩm cần sản xuất để chi phí trung bình mỗi sản phẩm là nhỏ nhất.`},
    {pts:.5,html:`Một mảnh vườn hình chữ nhật được rào bởi ${L} m lưới thép ở ba cạnh, cạnh thứ tư là bức tường có sẵn. Tìm diện tích lớn nhất của mảnh vườn.`}],
    sol:[ptxt([[`Chi phí trung bình f(x) = ${fr('C(x)','x')} = x + ${c} + ${fr(m,'x')}, x > 0; f′(x) = 1 − ${fr(m,'x²')}.`,.25],[`f′(x) = 0 ⟺ x = ${sq}; lập bảng biến thiên: f nhỏ nhất khi x = ${sq} (sản phẩm).`,.25]]),
      ptxt([[`Gọi x (m) là cạnh vuông góc với tường (0 < x < ${L/2}): S(x) = x(${L} − 2x); S′(x) = ${L} − 4x.`,.25],[`S′(x) = 0 ⟺ x = ${q}; S<sub>max</sub> = S(${q}) = ${q*(L-2*q)} m².`,.25]])],
    chk:()=>sq*sq===m&&q*(L-2*q)===L*L/8};
});
TL12('tl12-5-throw',1,'TH','b',[5],r=>{
  const v0=10*r.int(1,4),h0=r.int(1,20),t1=r.pick([1,0.5]),tm=v0/10,hm=h0+v0*v0/20,vt=v0-10*t1;
  return{kind:'tl',title:'Đạo hàm và bài toán chuyển động',parts:[
    {pts:.5,html:`Một quả bóng được ném thẳng đứng lên trên; độ cao của bóng (mét) sau ${I('t')} giây là ${I('h')}(${I('t')}) = ${MINUS}5${I('t')}${sup(2)} + ${v0}${I('t')} + ${h0}. Tính vận tốc của quả bóng tại thời điểm ${I('t')} = ${fmt(t1)} giây.`},
    {pts:.5,html:`Tìm độ cao lớn nhất mà quả bóng đạt được.`}],
    sol:[ptxt([[`v(t) = h′(t) = ${MINUS}10t + ${v0}.`,.25],[`v(${fmt(t1)}) = ${fmt(vt)} (m/s).`,.25]]),
      ptxt([[`h′(t) = 0 ⟺ t = ${fmt(tm)}; h′ > 0 khi t < ${fmt(tm)} và h′ < 0 khi t > ${fmt(tm)}.`,.25],[`Độ cao lớn nhất: h(${fmt(tm)}) = ${fmt(hm)} (m).`,.25]])],
    chk:()=>Math.abs(-5*tm*tm+v0*tm+h0-hm)<1e-9};
});
TL12('tl12-6-hh',2,'VDC','c',[6],r=>{
  const v=r.int(0,1),G=r.pick(['G','I']);
  const tri=v?'CB′D′':'A′BD',k=v?Q(2,3):Q(1,3);
  const s1=v?`${vh('A',G)} = ${fr(1,3)}(${vh('A','C')} + ${vh('A','B′')} + ${vh('A','D′')})`:`${vh('A',G)} = ${fr(1,3)}(${vh('A','A′')} + ${vh('A','B')} + ${vh('A','D')})`;
  const s2=v?`${vh('A','C')} = ${vh('A','B')} + ${vh('A','D')}, ${vh('A','B′')} = ${vh('A','B')} + ${vh('A','A′')}, ${vh('A','D′')} = ${vh('A','D')} + ${vh('A','A′')}, nên ${vh('A',G)} = ${fr(2,3)}(${vh('A','B')} + ${vh('A','D')} + ${vh('A','A′')})`:`nên ${vh('A',G)} = ${fr(1,3)}${vh('A','B')} + ${fr(1,3)}${vh('A','D')} + ${fr(1,3)}${vh('A','A′')}`;
  return{kind:'tl',title:'Vectơ trong không gian',parts:[
    {pts:.5,html:`Cho hình hộp ${BOXT}. Gọi ${I(G)} là trọng tâm của tam giác ${I(tri)}. Biểu diễn vectơ ${vh('A',G)} theo ba vectơ ${vh('A','B')}, ${vh('A','D')}, ${vh('A','A′')}.`},
    {pts:.5,html:`Chứng minh ba điểm ${I('A')}, ${I(G)}, ${I('C′')} thẳng hàng và tính tỉ số ${fr(I('A'+G),I('AC′'))}.`}],
    sol:[ptxt([[`Vì ${I(G)} là trọng tâm tam giác ${I(tri)} nên ${s1}.`,.25],[`${s2}.`,.25]]),
      ptxt([[`Theo quy tắc hình hộp: ${vh('A','B')} + ${vh('A','D')} + ${vh('A','A′')} = ${vh('A','C′')}, do đó ${vh('A',G)} = ${qh(k)}${vh('A','C′')}.`,.25],[`Suy ra ${vh('A',G)} và ${vh('A','C′')} cùng phương, nên A, ${I(G)}, C′ thẳng hàng và ${fr(I('A'+G),I('AC′'))} = ${qh(k)}.`,.25]])],
    chk:()=>{const P={A:[0,0,0],B:[2,.3,.1],D:[.4,1.7,.2],'A′':[.5,.2,1.9]};P.C=vadd(P.B,vsub(P.D,P.A));['B','C','D'].forEach(x=>P[x+'′']=vadd(P[x],vsub(P['A′'],P.A)));
      const g=vmul(v?vadd(vadd(P.C,P['B′']),P['D′']):vadd(vadd(P['A′'],P.B),P.D),1/3);return veq(g,vmul(P['C′'],qv(k)))}};
});
TL12('tl12-6-tet',2,'VDC','c',[6],r=>{
  const k=r.int(2,3),a=r.int(2,6);
  const num=k*k+1,den=k+1,len=num===5?`${fr(a+rt(5),den)}`:`${fr(a+rt(10),den)}`;
  return{kind:'tl',title:'Biểu diễn vectơ trong không gian',parts:[
    {pts:.5,html:`Cho tứ diện ${I('ABCD')}. Lấy hai điểm ${I('M')}, ${I('N')} thoả mãn ${vh('M','B')} + ${k}${vh('M','A')} = ${vc('0')} và ${vh('N','C')} = ${k}${vh('D','N')}. Biểu diễn ${vh('M','N')} theo ${vh('A','D')} và ${vh('B','C')}.`},
    {pts:.5,html:`Giả sử ${I('AD')} = ${I('BC')} = ${a} và ${I('AD')} ⊥ ${I('BC')}. Tính độ dài đoạn thẳng ${I('MN')}.`}],
    sol:[ptxt([[`${vh('M','N')} = ${vh('M','A')} + ${vh('A','D')} + ${vh('D','N')} và ${vh('M','N')} = ${vh('M','B')} + ${vh('B','C')} + ${vh('C','N')}.`,.25],[`Nhân đẳng thức đầu với ${k} rồi cộng với đẳng thức sau, chú ý ${k}${vh('M','A')} + ${vh('M','B')} = ${vc('0')} và ${k}${vh('D','N')} + ${vh('C','N')} = ${vc('0')}: ${den}${vh('M','N')} = ${k}${vh('A','D')} + ${vh('B','C')}, tức ${vh('M','N')} = ${fr(k,den)}${vh('A','D')} + ${fr(1,den)}${vh('B','C')}.`,.25]]),
      ptxt([[`${I('MN')}² = ${fr(k*k,den*den)}AD² + ${fr(1,den*den)}BC² + ${fr(2*k,den*den)}${vh('A','D')}·${vh('B','C')} = ${fr(num,den*den)}·${a}² (vì ${vh('A','D')}·${vh('B','C')} = 0).`,.25],[`Vậy ${I('MN')} = ${len}.`,.25]])],
    chk:()=>{const P={A:[0,0,0],B:[2,.3,.1],C:[.4,1.7,.2],D:[.5,.2,1.9]},M=vmul(vadd(vmul(P.A,k),P.B),1/den),N=vmul(vadd(P.C,vmul(P.D,k)),1/den);
      return veq(vsub(N,M),vadd(vmul(vsub(P.D,P.A),k/den),vmul(vsub(P.C,P.B),1/den)))&&veq(vsub(P.B,M),vmul(vsub(P.A,M),-k))&&veq(vsub(P.C,N),vmul(vsub(N,P.D),k))}};
});
TL12('tl12-8-min',2,'VDC','c',[8],r=>{
  for(;;){const A=pt3(r),B=A.map(x=>x+2*r.int(-3,3)),Iv=vmul(vadd(A,B),.5);if(Iv[2]===0||veq(A,B)||A[2]*B[2]<=0)continue;
    const AB2=vlen2(vsub(B,A)),Mv=[Iv[0],Iv[1],0],mn=2*Iv[2]*Iv[2]+AB2/2;
    return{kind:'tl',title:'Giá trị nhỏ nhất trong hệ toạ độ',parts:[
      {pts:.5,html:`Trong không gian ${I('Oxyz')}, cho hai điểm ${I('A')}${tup(A)} và ${I('B')}${tup(B)}. Gọi ${I('I')} là trung điểm của ${I('AB')}. Tìm toạ độ điểm ${I('I')} và chứng minh rằng với mọi điểm ${I('M')} ta có ${I('MA')}² + ${I('MB')}² = 2${I('MI')}² + ${fr(I('AB')+'²',2)}.`},
      {pts:.5,html:`Tìm toạ độ điểm ${I('M')} thuộc mặt phẳng (Oxy) sao cho ${I('MA')}² + ${I('MB')}² đạt giá trị nhỏ nhất và tính giá trị nhỏ nhất đó.`}],
      sol:[ptxt([[`I${tup(Iv)}.`,.25],[`${I('MA')}² + ${I('MB')}² = (${vh('M','I')} + ${vh('I','A')})² + (${vh('M','I')} + ${vh('I','B')})² = 2MI² + 2${vh('M','I')}·(${vh('I','A')} + ${vh('I','B')}) + IA² + IB² = 2MI² + ${fr('AB²',2)} (vì ${vh('I','A')} + ${vh('I','B')} = ${vc('0')}, IA = IB = ${fr('AB',2)}).`,.25]]),
        ptxt([[`AB² = ${AB2} không đổi nên MA² + MB² nhỏ nhất ⟺ MI nhỏ nhất ⟺ M là hình chiếu vuông góc của I trên (Oxy): M${tup(Mv)}.`,.25],[`Khi đó MI = ${Math.abs(Iv[2])} và giá trị nhỏ nhất là 2·${Iv[2]*Iv[2]} + ${fr(AB2,2)} = ${fmt(mn)}.`,.25]])],
      chk:()=>Math.abs(vlen2(vsub(Mv,A))+vlen2(vsub(Mv,B))-mn)<1e-9&&[[1,2],[-1,0.5]].every(([x,y])=>vlen2(vsub([x,y,0],A))+vlen2(vsub([x,y,0],B))>=mn-1e-9)}}
},'b8');
