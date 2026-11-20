/* ================================================================
   LỚP 10 – học kì II
   Chương VII: Phương pháp toạ độ trong mặt phẳng (Bài 19 – 22)
   ================================================================ */
const gcd3=(a,b,c)=>gcd(gcd(Math.abs(a),Math.abs(b)),Math.abs(c))||1;
/* chuẩn hoá đường thẳng ax + by + c = 0: chia ước chung, hệ số đầu dương */
const lnN=(a,b,c)=>{const g=gcd3(a,b,c),s=(a<0||(a===0&&b<0))?-1:1;return[s*a/g,s*b/g,s*c/g]};
const lnH=L=>`${lin3H(L,['x','y',''])} = 0`;
const lnAB=(A,B)=>lnN(B[1]-A[1],A[0]-B[0],-(B[1]-A[1])*A[0]-(A[0]-B[0])*A[1]);
const onL=(L,P)=>L[0]*P[0]+L[1]*P[1]+L[2]===0;
/* tham số: x = x0 + u1 t (viết hằng số trước) */
const parT10=(c,k)=>{if(k===0)return sg(c);const t=(Math.abs(k)===1?'':Math.abs(k))+I('t');return c===0?(k<0?MINUS:'')+t:`${sg(c)} ${k<0?MINUS:'+'} ${t}`};
const parSys=(P,u)=>cases(`${I('x')} = ${parT10(P[0],u[0])}`,`${I('y')} = ${parT10(P[1],u[1])}`);
/* q·√m */
const qrt=(q,m)=>{if(q[0]===0)return'0';if(m===1)return qh(q);const s=q[0]<0?MINUS:'',a=Math.abs(q[0]),num=(a===1?'':a)+rt(m);return s+(q[1]===1?num:fr(num,q[1]))};
const sqKM=n=>{let k=1,m=n;for(let t=Math.floor(Math.sqrt(m));t>1;t--)if(m%(t*t)===0){k=t;m/=t*t;break}return[k,m]};
/* |v| / √n dạng rút gọn */
const divRt=(v,n)=>{const [k,m]=sqKM(n);return qrt(Q(Math.abs(v),k*m),m)};
const NICEN=[[3,4],[4,3],[1,0],[0,1],[5,12],[12,5],[6,8],[8,6],[1,1],[1,2],[2,1],[1,-1],[3,-4],[4,-3],[1,-2],[2,-1],[1,3],[3,1]];

/* ===================== Bài 19: Phương trình đường thẳng ===================== */
N10b('k10-19-vec',7,'NB',[19],r=>{
  const a=r.nz(-6,6),b=r.nz(-6,6),c=r.int(-9,9),ask=r.chance(.5),L=[a,b,c];
  const cor=ask?cV([a,b]):cV([-b,a]),bad=new Set(ask?[cV([a,b]),cV([-a,-b])]:[cV([-b,a]),cV([b,-a])]),W=[cV([a,b]),cV([-b,a]),cV([b,a]),cV([a,-b]),cV([a,c]),cV([-a,b])].filter(x=>!bad.has(x));
  return mkTxt(r,{stem:`Một ${ask?'vectơ pháp tuyến':'vectơ chỉ phương'} của đường thẳng ${I('d')}: ${lnH(L)} là`,correct:`${vc(I(ask?'n':'u'))} = ${cor}`,wrongs:uniqBy(W.concat(vEx([a,b])),x=>x).map(w=>`${vc(I(ask?'n':'u'))} = ${w}`),
    sol:`Đường thẳng ax + by + c = 0 có vectơ pháp tuyến ${vc(I('n'))} = (a; b) = ${cV([a,b])} và vectơ chỉ phương ${vc(I('u'))} = (−b; a) = ${cV([-b,a])}.`,chk:()=>true});
});
N10b('k10-19-par',7,'NB',[19],r=>{
  const P=[r.int(-5,5),r.int(-5,5)],u=[r.nz(-5,5),r.nz(-5,5)];
  return mkTxt(r,{stem:`Phương trình tham số của đường thẳng đi qua điểm ${PT('M',P)} và có vectơ chỉ phương ${vc(I('u'))} = ${cV(u)} là`,correct:parSys(P,u),wrongs:[parSys(u,P),parSys(P,[-u[1],u[0]]),parSys([-P[0],-P[1]],u),parSys(P,[u[1],u[0]]),parSys(P,[u[0]+1,u[1]]),parSys([P[0]+1,P[1]],u),parSys(P,[-u[0],u[1]])],
    sol:`Đường thẳng qua M(x₀; y₀) có vectơ chỉ phương (u₁; u₂): x = x₀ + u₁t, y = y₀ + u₂t.`,chk:()=>u[0]!==u[1]||true});
});
N10b('k10-19-on',7,'NB',[19],r=>{
  for(;;){const L=lnN(r.nz(-4,4),r.nz(-4,4),r.int(-8,8)),P=[];for(let x=-6;x<=6;x++)for(let y=-6;y<=6;y++)P.push([x,y]);const yes=r.shuffle(P.filter(p=>onL(L,p))),no=r.shuffle(P.filter(p=>!onL(L,p)&&Math.abs(L[0]*p[0]+L[1]*p[1]+L[2])<=3));if(!yes.length||no.length<3)continue;
    return mkTxt(r,{stem:`Điểm nào sau đây thuộc đường thẳng ${lnH(L)}?`,correct:`(${yes[0].map(sg).join('; ')})`,wrongs:no.slice(0,3).map(p=>`(${p.map(sg).join('; ')})`),
      sol:`Thay toạ độ (${yes[0].map(sg).join('; ')}) vào vế trái được 0.`,chk:()=>true})}
});
N10b('k10-19-two',7,'TH',[19],r=>{
  const [A,B]=ptsR(r,2,-5,5),L=lnAB(A,B),cor=lnH(L),W=[lnH(lnN(L[1],-L[0],-(L[1]*A[0]-L[0]*A[1]))),lnH(lnN(L[0],L[1],-L[2])),lnH(lnN(L[0],-L[1],L[2]||1)),lnH(lnN(L[1],L[0],L[2]))].filter(w=>w!==cor);
  return mkTxt(r,{stem:`Phương trình tổng quát của đường thẳng đi qua hai điểm ${PT('A',A)} và ${PT('B',B)} là`,correct:cor,wrongs:uniqBy(W,x=>x).concat([lnH(lnN(L[0],L[1],L[2]+1)),lnH(lnN(L[0],L[1],L[2]-2))]),
    sol:`${Vv('AB')} = ${cV([B[0]-A[0],B[1]-A[1]])} là một vectơ chỉ phương nên đường thẳng có vectơ pháp tuyến ${cV([L[0],L[1]])}. Phương trình: ${cor}.`,chk:()=>onL(L,A)&&onL(L,B)});
});
N10b('k10-19-perp',7,'TH',[19],r=>{
  const L=lnN(r.nz(-4,4),r.nz(-4,4),r.int(-8,8)),M=[r.int(-5,5),r.int(-5,5)],perp=r.chance(.5);
  const D=perp?lnN(L[1],-L[0],-(L[1]*M[0]-L[0]*M[1])):lnN(L[0],L[1],-(L[0]*M[0]+L[1]*M[1])),Dw=perp?lnN(L[0],L[1],-(L[0]*M[0]+L[1]*M[1])):lnN(L[1],-L[0],-(L[1]*M[0]-L[0]*M[1]));
  const cor=lnH(D),W=uniqBy([lnH(Dw),lnH(lnN(D[0],D[1],-D[2]||3)),lnH(lnN(D[0],D[1],D[2]+(D[2]?D[2]:2))),lnH(lnN(D[1],D[0],D[2]))],x=>x).filter(x=>x!==cor);
  return mkTxt(r,{stem:`Phương trình đường thẳng đi qua điểm ${PT('M',M)} và ${perp?'vuông góc':'song song'} với đường thẳng ${lnH(L)} là`,correct:cor,wrongs:W.concat([lnH(lnN(D[0],D[1],D[2]+1)),lnH(lnN(D[0],D[1],D[2]-1))]),
    sol:`Đường thẳng cần tìm có vectơ pháp tuyến ${cV(perp?[L[1],-L[0]]:[L[0],L[1]])} (${perp?'là vectơ chỉ phương':'cũng là vectơ pháp tuyến'} của đường thẳng đã cho) và đi qua M: ${cor}.`,chk:()=>onL(D,M)&&(L[0]!==L[1]||true)});
});
DS10b('ds10-19-tri',7,'TH',[19,20],r=>{
  for(;;){const [A,B,C]=ptsR(r,3,-5,5),L=lnAB(A,B),cr=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(!cr)continue;const n2=L[0]**2+L[1]**2,v=L[0]*C[0]+L[1]*C[1]+L[2];
    const H=lnN(B[0]-A[0],B[1]-A[1],-((B[0]-A[0])*C[0]+(B[1]-A[1])*C[1]));
    return mkDS(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho tam giác ${I('ABC')} có ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Đường thẳng ${I('AB')} có một vectơ chỉ phương là ${cV([B[0]-A[0],B[1]-A[1]])}.`,f:`Đường thẳng ${I('AB')} có một vectơ chỉ phương là ${cV([B[1]-A[1],B[0]-A[0]])===cV([B[0]-A[0],B[1]-A[1]])?cV([B[0]-A[0]+1,B[1]-A[1]]):cV([B[1]-A[1],B[0]-A[0]])}.`,why:`${Vv('AB')} = ${cV([B[0]-A[0],B[1]-A[1]])}.`},
      {t:`Phương trình đường thẳng ${I('AB')} là ${lnH(L)}.`,f:`Phương trình đường thẳng ${I('AB')} là ${lnH(lnN(L[1],-L[0],L[2]))===lnH(L)?lnH(lnN(L[0],L[1],L[2]+1)):lnH(lnN(L[1],-L[0],L[2]))}.`,why:`Vectơ pháp tuyến ${cV([L[0],L[1]])}, đi qua A: ${lnH(L)}.`},
      {t:`Khoảng cách từ ${I('C')} đến đường thẳng ${I('AB')} bằng ${divRt(v,n2)}.`,f:`Khoảng cách từ ${I('C')} đến đường thẳng ${I('AB')} bằng ${divRt(v,n2)===String(Math.abs(v))?divRt(v+1,n2):String(Math.abs(v))}.`,why:`d(C, AB) = ${fr(`|${pp10(`${sg(L[0])}·${sg(C[0])} + ${sg(L[1])}·${sg(C[1])} + ${sg(L[2])}`)}|`,`√(${L[0]**2} + ${L[1]**2})`)} = ${divRt(v,n2)}.`},
      {t:`Đường cao kẻ từ ${I('C')} của tam giác có phương trình ${lnH(H)}.`,f:`Đường cao kẻ từ ${I('C')} của tam giác có phương trình ${lnH(lnN(H[1],-H[0],-(H[1]*C[0]-H[0]*C[1])))===lnH(H)?lnH(lnN(H[0],H[1],H[2]+1)):lnH(lnN(H[1],-H[0],-(H[1]*C[0]-H[0]*C[1])))}.`,why:`Đường cao qua C nhận ${Vv('AB')} làm vectơ pháp tuyến: ${lnH(H)}.`}],chk:()=>onL(H,C)})}
});
TLN10b('t10-19-line',7,'TH',[19],r=>{
  for(;;){const [A,B]=ptsR(r,2,-6,6),L=lnAB(A,B);if(L[0]===0||L[1]%L[0]||L[2]%L[0])continue;const b=L[1]/L[0],c=L[2]/L[0];
    return{kind:'tln',stem:`Đường thẳng đi qua hai điểm ${PT('A',A)} và ${PT('B',B)} có phương trình ${I('x')} + ${I('b')}${I('y')} + ${I('c')} = 0. Tính ${I('b')} + ${I('c')}.`,ans:b+c,unit:'',
      sol:`Phương trình đường thẳng AB: ${lnH([1,b,c])}, nên b = ${sg(b)}, c = ${sg(c)}, b + c = ${sg(b+c)}.`,chk:()=>onL([1,b,c],A)&&onL([1,b,c],B)}}
});
TL10b('tl10-19-line',7,'TH','b',[19,20],r=>{
  for(;;){const [A,B,C]=ptsR(r,3,-5,5),cr=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(!cr)continue;const u=[B[0]-A[0],B[1]-A[1]],L=lnAB(A,B),M=[(B[0]+C[0])/2,(B[1]+C[1])/2];if(!isInt(M[0])||!isInt(M[1]))continue;const Lm=lnAB(A,M);
    return{kind:'tl',title:'Phương trình đường thẳng',parts:[
      {pts:.5,html:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho tam giác ${I('ABC')} với ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Viết phương trình tham số và phương trình tổng quát của đường thẳng ${I('AB')}.`},
      {pts:.5,html:`Viết phương trình tổng quát của đường trung tuyến kẻ từ ${I('A')} của tam giác ${I('ABC')}.`}],
      sol:[ptxt([[`${Vv('AB')} = ${cV(u)}; phương trình tham số: x = ${parT10(A[0],u[0])}, y = ${parT10(A[1],u[1])}.`,.25],[`Vectơ pháp tuyến ${cV([L[0],L[1]])}; phương trình tổng quát: ${lnH(L)}.`,.25]]),
        ptxt([[`Trung điểm của BC là M${cV(M)}; ${Vv('AM')} = ${cV([M[0]-A[0],M[1]-A[1]])}.`,.25],[`Đường trung tuyến AM: ${lnH(Lm)}.`,.25]])],chk:()=>!(M[0]===A[0]&&M[1]===A[1])}}
});

/* ===================== Bài 20: Vị trí tương đối, góc và khoảng cách ===================== */
N10b('k10-20-pos',7,'NB',[20],r=>{
  const L1=lnN(r.nz(-4,4),r.nz(-4,4),r.int(-6,6)),t=r.int(0,3),k=r.pick([2,-1,3,-2]);let L2,ans;
  if(t===0){L2=[L1[0]*k,L1[1]*k,L1[2]*k+r.nz(-3,3)];ans='Song song'}else if(t===1){L2=L1.map(x=>x*k);ans='Trùng nhau'}else if(t===2){L2=[L1[1]*k,-L1[0]*k,r.int(-6,6)];ans='Vuông góc'}else{for(;;){L2=[r.nz(-4,4),r.nz(-4,4),r.int(-6,6)];const cr=L1[0]*L2[1]-L1[1]*L2[0],dt=L1[0]*L2[0]+L1[1]*L2[1];if(cr&&dt)break}ans='Cắt nhau nhưng không vuông góc'}
  return mkTxt(r,{stem:`Vị trí tương đối của hai đường thẳng ${I('d')}${sub(1)}: ${lnH(L1)} và ${I('d')}${sub(2)}: ${lin3H(L2,['x','y',''])} = 0 là`,correct:ans,wrongs:['Song song','Trùng nhau','Vuông góc','Cắt nhau nhưng không vuông góc'].filter(x=>x!==ans),
    sol:`d₁ có vectơ pháp tuyến ${cV([L1[0],L1[1]])}, d₂ có vectơ pháp tuyến ${cV([L2[0],L2[1]])}. ${t<2?'Hai vectơ pháp tuyến cùng phương':t===2?'Tích vô hướng hai vectơ pháp tuyến bằng 0':'Hai vectơ pháp tuyến không cùng phương và tích vô hướng khác 0'}${t<2?`, ${t===0?'hệ số tự do không cùng tỉ lệ nên hai đường thẳng song song':'các hệ số tỉ lệ nên hai đường thẳng trùng nhau'}`:''}.`,chk:()=>true});
});
N10b('k10-20-inter',7,'TH',[20],r=>{
  for(;;){const X=[r.int(-5,5),r.int(-5,5)],a1=r.nz(-4,4),b1=r.nz(-4,4),a2=r.nz(-4,4),b2=r.nz(-4,4);if(a1*b2===a2*b1)continue;const L1=lnN(a1,b1,-(a1*X[0]+b1*X[1])),L2=lnN(a2,b2,-(a2*X[0]+b2*X[1]));
    return mkTxt(r,{stem:`Toạ độ giao điểm của hai đường thẳng ${lnH(L1)} và ${lnH(L2)} là`,correct:cV(X),wrongs:[cV([X[1],X[0]]),cV([-X[0],-X[1]]),cV([X[0],-X[1]]),cV([-X[0],X[1]])].filter(x=>x!==cV(X)).concat(vEx(X)),
      sol:`Giải hệ gồm hai phương trình đã cho được x = ${sg(X[0])}, y = ${sg(X[1])}.`,chk:()=>onL(L1,X)&&onL(L2,X)})}
});
N10b('k10-20-dist',7,'TH',[20],r=>{
  const [a,b]=r.pick(NICEN),k=r.pick([1,1,2]),L=lnN(a*k,b*k,r.int(-9,9)),M=[r.int(-5,5),r.int(-5,5)],v=L[0]*M[0]+L[1]*M[1]+L[2],n2=L[0]**2+L[1]**2;
  if(v===0)return T.nlc['k10-20-dist'].gen(r);
  const cor=divRt(v,n2),W=uniqBy([String(Math.abs(v)),divRt(v+2*L[2],n2),divRt(v,n2*4),divRt(Math.abs(v)+1,n2),qh(Q(Math.abs(v),n2)),divRt(2*v,n2),String(Math.abs(v)+1),divRt(v,n2+1)],x=>x).filter(x=>x!==cor);
  return mkTxt(r,{stem:`Khoảng cách từ điểm ${PT('M',M)} đến đường thẳng ${I('Δ')}: ${lnH(L)} bằng`,correct:cor,wrongs:W,
    sol:`d(M, Δ) = ${fr(`|${pp10(`${sg(L[0])}·${sg(M[0])} + ${sg(L[1])}·${sg(M[1])} + ${sg(L[2])}`)}|`,`√(${L[0]**2} + ${L[1]**2})`)} = ${fr(Math.abs(v),sqH(n2))} = ${cor}.`,chk:()=>true});
});
N10b('k10-20-angle',7,'TH',[20],r=>{
  const A=r.pick([45,90,45,0]),[u,v]=angPair(r,A===0?0:A),n1=u,n2=v,g=r.chance(.5)?[n2[0],n2[1]]:[-n2[0],-n2[1]];
  const L1=lnN(n1[0],n1[1],r.int(-6,6)),L2=lnN(g[0],g[1],r.int(-6,6)+(A===0?1:0));if(A===0&&L1[2]*1===L2[2]*1&&L1[0]===L2[0])return T.nlc['k10-20-angle'].gen(r);
  return mkTxt(r,{stem:`Góc giữa hai đường thẳng ${lnH(L1)} và ${lnH(L2)} bằng`,correct:`${A}${DEG}`,wrongs:[0,30,45,60,90].filter(x=>x!==A).map(x=>`${x}${DEG}`),
    sol:`cos(d₁, d₂) = ${fr('|n₁ · n₂|','|n₁|·|n₂|')} = ${tvH(Math.abs(Math.cos(A*RAD10))+0)}. Vậy góc bằng ${A}°.`,chk:()=>Math.abs(Math.abs(L1[0]*L2[0]+L1[1]*L2[1])/Math.sqrt((L1[0]**2+L1[1]**2)*(L2[0]**2+L2[1]**2))-Math.abs(Math.cos(A*RAD10)))<1e-9});
});
N10b('k10-20-m',7,'VD',[20],r=>{
  for(;;){const a=r.nz(-4,4),b=r.nz(-4,4),c=r.int(-6,6),q=r.nz(-4,4),perp=r.chance(.5);/* d2: m x + q y + e = 0 */
    const m=perp?-b*q/a:a*q/b;if(!isInt(m))continue;const e=r.int(-6,6);if(!perp&&a*e===c*m&&b*e===c*q)continue;
    return mkNum(r,{stem:`Cho hai đường thẳng ${I('d')}${sub(1)}: ${lnH([a,b,c])} và ${I('d')}${sub(2)}: ${I('m')}${I('x')} ${q<0?MINUS:'+'} ${Math.abs(q)===1?'':Math.abs(q)}${I('y')}${e?` ${e<0?MINUS:'+'} ${Math.abs(e)}`:''} = 0. Giá trị của ${I('m')} để ${I('d')}${sub(1)} ${perp?'vuông góc với':'song song với'} ${I('d')}${sub(2)} là`,correct:m,ok:()=>true,cands:[-m,perp?a*q/b:-b*q/a,m+1,q,m-2].filter(isInt),
      sol:perp?`d₁ ⊥ d₂ ⟺ ${sg(a)}·m + ${pp10(`${sg(b)}·${sg(q)}`)} = 0 ⟺ m = ${sg(m)}.`.replace('+ −','− '):`d₁ ∥ d₂ ⇒ ${fr('m',sg(a))} = ${fr(sg(q),sg(b))} ⇒ m = ${sg(m)} (kiểm tra hệ số tự do không cùng tỉ lệ).`,chk:()=>true})}
});
DS10b('ds10-20-two',7,'TH',[20],r=>{
  for(;;){const X=[r.int(-4,4),r.int(-4,4)],[u,v]=angPair(r,r.pick([45,90])),L1=lnN(u[0],u[1],-(u[0]*X[0]+u[1]*X[1])),L2=lnN(v[0],v[1],-(v[0]*X[0]+v[1]*X[1]));
    const ang=Math.round(Math.acos(Math.abs(L1[0]*L2[0]+L1[1]*L2[1])/Math.sqrt((L1[0]**2+L1[1]**2)*(L2[0]**2+L2[1]**2)))/RAD10),O=[0,0],dO=Math.abs(L1[2]),n1=L1[0]**2+L1[1]**2;if(!dO)continue;
    return mkDS(r,{stem:`Cho hai đường thẳng ${I('d')}${sub(1)}: ${lnH(L1)} và ${I('d')}${sub(2)}: ${lnH(L2)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${I('d')}${sub(1)} và ${I('d')}${sub(2)} cắt nhau tại điểm ${cV(X)}.`,f:`${I('d')}${sub(1)} và ${I('d')}${sub(2)} cắt nhau tại điểm ${cV([X[1],X[0]])===cV(X)?cV([X[0]+1,X[1]]):cV([X[1],X[0]])}.`,why:`Toạ độ ${cV(X)} thoả mãn cả hai phương trình.`},
      {t:`Góc giữa ${I('d')}${sub(1)} và ${I('d')}${sub(2)} bằng ${ang}${DEG}.`,f:`Góc giữa ${I('d')}${sub(1)} và ${I('d')}${sub(2)} bằng ${ang===90?60:135}${DEG}.`,why:`cos(d₁, d₂) = ${tvH(Math.cos(ang*RAD10)+0)}, góc giữa hai đường thẳng không vượt quá 90°.`},
      {t:`Khoảng cách từ gốc toạ độ ${I('O')} đến ${I('d')}${sub(1)} bằng ${divRt(dO,n1)}.`,f:`Khoảng cách từ gốc toạ độ ${I('O')} đến ${I('d')}${sub(1)} bằng ${divRt(dO,n1)===String(dO)?String(dO+1):String(dO)}.`,why:`d(O, d₁) = ${fr(dO,sqH(n1))} = ${divRt(dO,n1)}.`},
      {t:`Đường thẳng ${I('d')}${sub(1)} có một vectơ chỉ phương là ${cV([-L1[1],L1[0]])}.`,f:`Đường thẳng ${I('d')}${sub(1)} có một vectơ chỉ phương là ${cV([L1[0],L1[1]])}.`,why:`d₁ có vectơ pháp tuyến ${cV([L1[0],L1[1]])} nên có vectơ chỉ phương ${cV([-L1[1],L1[0]])}.`}],chk:()=>O&&(ang===45||ang===90)})}
});
TLN10b('t10-20-dist',7,'TH',[20],r=>{
  for(;;){const L=lnN(r.nz(-5,5),r.nz(-5,5),r.int(-9,9)),M=[r.int(-6,6),r.int(-6,6)],v=Math.abs(L[0]*M[0]+L[1]*M[1]+L[2]),d=v/Math.sqrt(L[0]**2+L[1]**2),ans=Math.round(d*100)/100;if(!v||Math.abs(d*100-Math.round(d*100))>.49)continue;
    return{kind:'tln',stem:`Tính khoảng cách từ điểm ${PT('M',M)} đến đường thẳng ${lnH(L)} (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',sol:`d = ${fr(v,sqH(L[0]**2+L[1]**2))} ≈ ${fmt(ans)}.`,chk:()=>true}}
});
TLN10b('t10-20-m',7,'VD',[20],r=>{
  for(;;){const a=r.nz(-4,4),b=r.nz(-4,4),c=r.int(-6,6),q=r.nz(-4,4),m=-b*q/a;if(!isInt(m))continue;
    return{kind:'tln',stem:`Tìm giá trị của tham số ${I('m')} để hai đường thẳng ${lnH([a,b,c])} và ${I('m')}${I('x')} ${q<0?MINUS:'+'} ${Math.abs(q)===1?'':Math.abs(q)}${I('y')} + 1 = 0 vuông góc với nhau.`,ans:m,unit:'',sol:`Hai đường thẳng vuông góc ⟺ ${sg(a)}m + ${pp10(`${sg(b)}·${sg(q)}`)} = 0 ⟺ m = ${sg(m)}.`.replace('+ −','− '),chk:()=>a*m+b*q===0}}
});
TL10b('tl10-20-dist',7,'TH','b',[20],r=>{
  for(;;){const [a,b]=r.pick(NICEN.filter(x=>x[0]&&x[1])),L=lnN(a,b,r.int(-9,9)),M=[r.int(-5,5),r.int(-5,5)],v=L[0]*M[0]+L[1]*M[1]+L[2],n2=L[0]**2+L[1]**2;if(!v)continue;
    const H=[M[0]-L[0]*v/n2,M[1]-L[1]*v/n2],P=lnN(L[1],-L[0],-(L[1]*M[0]-L[0]*M[1]));
    return{kind:'tl',title:'Khoảng cách từ một điểm đến một đường thẳng',parts:[
      {pts:.5,html:`Cho điểm ${PT('M',M)} và đường thẳng ${I('Δ')}: ${lnH(L)}. Tính khoảng cách từ ${I('M')} đến ${I('Δ')}.`},
      {pts:.5,html:`Viết phương trình đường thẳng ${I('d')} đi qua ${I('M')} và vuông góc với ${I('Δ')}; tìm toạ độ hình chiếu vuông góc ${I('H')} của ${I('M')} trên ${I('Δ')}.`}],
      sol:[ptxt([[`d(M, Δ) = ${fr(`|${pp10(`${sg(L[0])}·${sg(M[0])} + ${sg(L[1])}·${sg(M[1])} + ${sg(L[2])}`)}|`,`√(${L[0]**2} + ${L[1]**2})`)}.`,.25],[`= ${divRt(v,n2)}.`,.25]]),
        ptxt([[`d nhận vectơ chỉ phương ${cV([-L[1],L[0]])} của Δ làm vectơ pháp tuyến: ${lnH(P)}.`,.25],[`H là giao điểm của d và Δ: H(${qh(Q(M[0]*n2-L[0]*v,n2))}; ${qh(Q(M[1]*n2-L[1]*v,n2))}).`,.25]])],chk:()=>Math.abs(L[0]*H[0]+L[1]*H[1]+L[2])<1e-9}}
});

/* ===================== Bài 21: Đường tròn trong mặt phẳng toạ độ ===================== */
const cirH=(a,b,R2)=>`(${xlin(1,-a)})${sup(2)} + (${xlin(1,-b,'y')})${sup(2)} = ${R2}`.replace(`(${I('x')})${sup(2)}`,`${I('x')}${sup(2)}`).replace(`(${I('y')})${sup(2)}`,`${I('y')}${sup(2)}`);
const cirG=(a,b,c)=>`${I('x')}${sup(2)} + ${I('y')}${sup(2)}${plusH(lin3H([-2*a,-2*b,c],['x','y','']))} = 0`.replace(' + 0 = 0',' = 0');
N10b('k10-21-center',7,'NB',[21],r=>{
  const a=r.int(-6,6),b=r.int(-6,6),R=r.int(1,7),ask=r.chance(.5);
  if(ask)return mkTxt(r,{stem:`Đường tròn ${cirH(a,b,R*R)} có tâm là`,correct:`${I('I')}(${sg(a)}; ${sg(b)})`,wrongs:[[-a,-b],[a,-b],[-a,b],[b,a],[a+1,b],[a,b+2],[a-1,b-1]].filter((p,i,A)=>!(p[0]===a&&p[1]===b)&&A.findIndex(q=>q[0]===p[0]&&q[1]===p[1])===i).map(p=>`${I('I')}(${sg(p[0])}; ${sg(p[1])})`),
    sol:`Đường tròn (x − a)² + (y − b)² = R² có tâm I(a; b): I(${sg(a)}; ${sg(b)}).`,chk:()=>true});
  return mkNum(r,{stem:`Bán kính của đường tròn ${cirH(a,b,R*R)} bằng`,correct:R,cands:[R*R,2*R,R+1,Math.abs(a)+1],sol:`R² = ${R*R} ⇒ R = ${R}.`,chk:()=>true});
});
N10b('k10-21-gen',7,'TH',[21],r=>{
  for(;;){const a=r.int(-5,5),b=r.int(-5,5),R2=r.int(1,40),c=a*a+b*b-R2;if(!a&&!b)continue;const ask=r.chance(.5);
    if(ask)return mkTxt(r,{stem:`Tâm ${I('I')} và bán kính ${I('R')} của đường tròn ${cirG(a,b,c)} là`,correct:`${I('I')}(${sg(a)}; ${sg(b)}), ${I('R')} = ${sqH(R2)}`,wrongs:[`${I('I')}(${sg(-a)}; ${sg(-b)}), ${I('R')} = ${sqH(R2)}`,`${I('I')}(${sg(a)}; ${sg(b)}), ${I('R')} = ${R2}`,`${I('I')}(${sg(-2*a)}; ${sg(-2*b)}), ${I('R')} = ${sqH(Math.abs(4*a*a+4*b*b-c)||1)}`,`${I('I')}(${sg(-a)}; ${sg(-b)}), ${I('R')} = ${R2}`,`${I('I')}(${sg(a)}; ${sg(b)}), ${I('R')} = ${sqH(R2+1)}`,`${I('I')}(${sg(b)}; ${sg(a)}), ${I('R')} = ${sqH(R2)}`].filter(w=>w!==`${I('I')}(${sg(a)}; ${sg(b)}), ${I('R')} = ${sqH(R2)}`),
      sol:`x² + y² − 2ax − 2by + c = 0 có tâm I(a; b) với a = ${sg(a)}, b = ${sg(b)}, c = ${sg(c)}; R = √(a² + b² − c) = √${R2}${sqH(R2)!==rt(R2)?' = '+sqH(R2):''}.`,chk:()=>true});
    return mkTxt(r,{stem:`Đường tròn ${cirG(a,b,c)} có bán kính bằng`,correct:sqH(R2),wrongs:uniqBy([String(R2),sqH(a*a+b*b+c>0?a*a+b*b+c:R2+3),sqH(4*a*a+4*b*b-c>0?4*a*a+4*b*b-c:R2+1),sqH(R2+1),sqH(2*R2),sqH(R2+3),sqH(R2+5)],x=>x).filter(x=>x!==sqH(R2)),
      sol:`a = ${sg(a)}, b = ${sg(b)}, c = ${sg(c)}; R = √(a² + b² − c) = √${R2}${sqH(R2)!==rt(R2)?' = '+sqH(R2):''}.`,chk:()=>true})}
});
N10b('k10-21-is',7,'TH',[21],r=>{
  for(;;){const a=r.int(-4,4),b=r.int(-4,4),R2=r.int(1,20),c=a*a+b*b-R2,c2=a*a+b*b+r.int(1,5);if(!a&&!b)continue;
    const cor=cirG(a,b,c),W=[cirG(a,b,c2),`${I('x')}${sup(2)} + 2${I('y')}${sup(2)}${plusH(lin3H([-2*a,-2*b,c],['x','y','']))} = 0`,`${I('x')}${sup(2)} ${MINUS} ${I('y')}${sup(2)}${plusH(lin3H([-2*a,-2*b,c],['x','y','']))} = 0`,`${I('x')}${sup(2)} + ${I('y')}${sup(2)} + ${I('x')}${I('y')}${plusH(lin3H([-2*a,-2*b,c],['x','y','']))} = 0`];
    return mkTxt(r,{stem:`Phương trình nào sau đây là phương trình của một đường tròn?`,correct:cor,wrongs:W.map(w=>w.replace(' + 0 = 0',' = 0')),
      sol:`Phương trình x² + y² − 2ax − 2by + c = 0 là phương trình đường tròn khi a² + b² − c > 0. Với ${cor}: a² + b² − c = ${R2} > 0. Các phương trình còn lại có hệ số của x², y² khác nhau, có hạng tử xy hoặc a² + b² − c ≤ 0.`,chk:()=>c2>a*a+b*b})}
});
N10b('k10-21-eq',7,'TH',[21],r=>{
  const t=r.int(0,1);
  if(t===0){const I0=[r.int(-5,5),r.int(-5,5)],A=[I0[0]+r.int(-4,4),I0[1]+r.nz(-4,4)],R2=(A[0]-I0[0])**2+(A[1]-I0[1])**2;
    return mkTxt(r,{stem:`Phương trình đường tròn tâm ${PT('I',I0)} và đi qua điểm ${PT('A',A)} là`,correct:cirH(I0[0],I0[1],R2),wrongs:[cirH(-I0[0],-I0[1],R2),cirH(I0[0],I0[1],sqH(R2)),cirH(A[0],A[1],R2),cirH(I0[0],I0[1],R2+1),cirH(I0[0]+1,I0[1],R2),cirH(I0[0],I0[1]-1,R2)].filter((x,i,a)=>a.indexOf(x)===i&&x!==cirH(I0[0],I0[1],R2)),
      sol:`R = IA = √${R2}. Phương trình: ${cirH(I0[0],I0[1],R2)}.`,chk:()=>R2>0})}
  for(;;){const A=[r.int(-5,5),r.int(-5,5)],B=[A[0]+2*r.int(-3,3),A[1]+2*r.nz(-3,3)],M=[(A[0]+B[0])/2,(A[1]+B[1])/2],R2=((B[0]-A[0])**2+(B[1]-A[1])**2)/4;
    return mkTxt(r,{stem:`Phương trình đường tròn đường kính ${I('AB')} với ${PT('A',A)}, ${PT('B',B)} là`,correct:cirH(M[0],M[1],R2),wrongs:[cirH(M[0],M[1],4*R2),cirH(-M[0],-M[1],R2),cirH(A[0],A[1],4*R2),cirH(M[0],M[1],2*R2)].filter(x=>x!==cirH(M[0],M[1],R2)),
      sol:`Tâm là trung điểm I${cV(M)} của AB, bán kính R = ${fr('AB',2)}, R² = ${R2}.`,chk:()=>true})}
});
N10b('k10-21-tan',7,'VD',[21],r=>{
  const I0=[r.int(-4,4),r.int(-4,4)],[p,q]=r.pick([[3,4],[4,3],[0,5],[5,0],[-3,4],[3,-4],[-4,-3],[1,2],[2,1],[1,-1]]),M=[I0[0]+p,I0[1]+q],R2=p*p+q*q;
  const L=lnN(p,q,-(p*M[0]+q*M[1])),cor=lnH(L),W=[lnH(lnN(p,q,-(p*I0[0]+q*I0[1]))),lnH(lnN(q,-p,-(q*M[0]-p*M[1]))),lnH(lnN(p,q,p*M[0]+q*M[1]||7)),lnH(lnN(p,-q,-(p*M[0]-q*M[1])))].filter(x=>x!==cor);
  return mkTxt(r,{stem:`Cho đường tròn (${I('C')}): ${cirH(I0[0],I0[1],R2)} và điểm ${PT('M',M)} thuộc (${I('C')}). Phương trình tiếp tuyến của (${I('C')}) tại ${I('M')} là`,correct:cor,wrongs:uniqBy(W,x=>x).concat([lnH(lnN(L[0],L[1],L[2]+1))]),
    sol:`Tâm I${cV(I0)}; tiếp tuyến tại M vuông góc với IM nên nhận ${Vv('IM')} = ${cV([p,q])} làm vectơ pháp tuyến: ${cor}.`,chk:()=>onL(L,M)});
});
DS10b('ds10-21-cir',7,'VD',[21],r=>{
  for(;;){const a=r.int(-4,4),b=r.int(-4,4),[p,q]=r.pick([[3,4],[4,3],[0,5],[5,0],[-3,4],[3,-4]]),R2=25,c=a*a+b*b-R2,M=[a+p,b+q],L=lnN(p,q,-(p*M[0]+q*M[1]));if(!a&&!b)continue;
    if(a*a+b*b===R2)continue;const O=a*a+b*b<R2;
    return mkDS(r,{stem:`Cho đường tròn (${I('C')}): ${cirG(a,b,c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`(${I('C')}) có tâm ${I('I')}(${sg(a)}; ${sg(b)}) và bán kính ${I('R')} = 5.`,f:`(${I('C')}) có tâm ${I('I')}(${sg(-a)}; ${sg(-b)}) và bán kính ${I('R')} = 5.`,why:`I(a; b) với −2a = ${sg(-2*a)}, −2b = ${sg(-2*b)}; R = √(a² + b² − c) = 5.`},
      {t:`Điểm ${PT('M',M)} thuộc (${I('C')}).`,f:`Điểm ${PT('M',[M[0]+1,M[1]])} thuộc (${I('C')}).`,why:`IM = √(${p*p} + ${q*q}) = 5 = R.`},
      {t:`Tiếp tuyến của (${I('C')}) tại ${I('M')} có phương trình ${lnH(L)}.`,f:`Tiếp tuyến của (${I('C')}) tại ${I('M')} có phương trình ${lnH(lnN(q,-p,-(q*M[0]-p*M[1])))}.`,why:`Tiếp tuyến nhận ${Vv('IM')} = ${cV([p,q])} làm vectơ pháp tuyến.`},
      {t:`Gốc toạ độ ${I('O')} nằm ${O?'bên trong':'bên ngoài'} đường tròn (${I('C')}).`,f:`Gốc toạ độ ${I('O')} nằm ${O?'bên ngoài':'bên trong'} đường tròn (${I('C')}).`,why:`OI² = ${a*a+b*b} ${O?'<':'>'} 25 = R².`}],chk:()=>a*a+b*b!==25})}
});
TLN10b('t10-21-R',7,'TH',[21],r=>{
  for(;;){const a=r.int(-5,5),b=r.int(-5,5),R2=r.int(2,60),c=a*a+b*b-R2,R=Math.sqrt(R2),ans=Math.round(R*100)/100;if(Math.abs(R*100-Math.round(R*100))>.49)continue;
    return{kind:'tln',stem:`Tính bán kính của đường tròn ${cirG(a,b,c)} (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',sol:`R = √(a² + b² − c) = √(${a*a} + ${b*b} − ${c<0?'('+sg(c)+')':c}) = √${R2} ≈ ${fmt(ans)}.`,chk:()=>true}}
});
TLN10b('t10-21-m',7,'VD',[21],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),n=a*a+b*b-1;
  return{kind:'tln',stem:`Có bao nhiêu số nguyên dương ${I('m')} để phương trình ${I('x')}${sup(2)} + ${I('y')}${sup(2)}${plusH(lin3H([-2*a,-2*b],['x','y']))} + ${I('m')} = 0 là phương trình của một đường tròn?`,ans:n,unit:'',
    sol:`Điều kiện: a² + b² − c > 0 ⟺ ${a*a} + ${b*b} − m > 0 ⟺ m < ${a*a+b*b}. Có ${n} số nguyên dương m.`,chk:()=>n>0};
});
TLN10b('t10-21-tan',7,'VD',[21],r=>{
  for(;;){const I0=[r.int(-4,4),r.int(-4,4)],[p,q]=r.pick([[3,4],[4,3],[-3,4],[3,-4],[-4,-3],[1,2],[2,1],[2,-1],[1,-2]]),M=[I0[0]+p,I0[1]+q],L=lnN(p,q,-(p*M[0]+q*M[1]));if(L[1]%L[0]||L[2]%L[0])continue;
    return{kind:'tln',stem:`Tiếp tuyến của đường tròn ${cirH(I0[0],I0[1],p*p+q*q)} tại điểm ${PT('M',M)} có phương trình ${I('x')} + ${I('b')}${I('y')} + ${I('c')} = 0. Tính ${I('b')} + ${I('c')}.`,ans:(L[1]+L[2])/L[0],unit:'',
      sol:`Tiếp tuyến nhận ${Vv('IM')} = ${cV([p,q])} làm vectơ pháp tuyến: ${lnH(L.map(x=>x/L[0]))}. Vậy b + c = ${sg((L[1]+L[2])/L[0])}.`,chk:()=>true}}
});
TL10b('tl10-21-circle',7,'VD','b',[21],r=>{
  for(;;){const I0=[r.int(-4,4),r.int(-4,4)],[p,q]=r.pick([[3,4],[4,3],[0,5],[-3,4],[3,-4],[1,2],[2,1],[2,-1]]),A=[I0[0]+p,I0[1]+q],R2=p*p+q*q,L=lnN(p,q,-(p*A[0]+q*A[1]));if(!I0[0]&&!I0[1])continue;
    return{kind:'tl',title:'Đường tròn trong mặt phẳng toạ độ',parts:[
      {pts:.5,html:`Viết phương trình đường tròn (${I('C')}) có tâm ${PT('I',I0)} và đi qua điểm ${PT('A',A)}.`},
      {pts:.5,html:`Viết phương trình tiếp tuyến của (${I('C')}) tại điểm ${I('A')}.`}],
      sol:[ptxt([[`R = IA = √(${p*p} + ${q*q}) = ${sqH(R2)}.`,.25],[`(C): ${cirH(I0[0],I0[1],R2)}.`,.25]]),ptxt([[`Tiếp tuyến tại A vuông góc với IA nên nhận ${Vv('IA')} = ${cV([p,q])} làm vectơ pháp tuyến.`,.25],[`Phương trình: ${lnH(L)}.`,.25]])],chk:()=>onL(L,A)}}
});
TL10b('tl10-21-tri',7,'VD','b',[19,21],r=>{
  for(;;){const I0=[r.int(-3,3),r.int(-3,3)],R=5,V=r.shuffle([[3,4],[4,3],[-3,4],[-4,3],[3,-4],[4,-3],[-3,-4],[-4,-3],[5,0],[0,5],[-5,0],[0,-5]]).slice(0,3),[A,B,C]=V.map(v=>[I0[0]+v[0],I0[1]+v[1]]);
    const cr=(B[0]-A[0])*(C[1]-A[1])-(B[1]-A[1])*(C[0]-A[0]);if(!cr)continue;const c=I0[0]**2+I0[1]**2-25;
    return{kind:'tl',title:'Đường tròn ngoại tiếp tam giác',parts:[
      {pts:.5,html:`Cho ba điểm ${PT('A',A)}, ${PT('B',B)}, ${PT('C',C)}. Viết phương trình đường tròn (${I('C')}) đi qua ba điểm ${I('A')}, ${I('B')}, ${I('C')}.`},
      {pts:.5,html:`Tìm tâm, bán kính của (${I('C')}) và tính khoảng cách từ tâm đến đường thẳng ${I('AB')}.`}],
      sol:[ptxt([[`Gọi (C): x² + y² − 2ax − 2by + c = 0; thay toạ độ A, B, C được hệ ba phương trình bậc nhất ẩn a, b, c.`,.25],[`Giải hệ: a = ${sg(I0[0])}, b = ${sg(I0[1])}, c = ${sg(c)}; (C): ${cirG(I0[0],I0[1],c)}.`,.25]]),
        ptxt([[`Tâm I${cV(I0)}, R = √(a² + b² − c) = 5; đường thẳng AB: ${lnH(lnAB(A,B))}.`,.25],[`d(I, AB) = ${divRt(lnAB(A,B)[0]*I0[0]+lnAB(A,B)[1]*I0[1]+lnAB(A,B)[2],lnAB(A,B)[0]**2+lnAB(A,B)[1]**2)}.`,.25]])],chk:()=>R===5}}
});

/* ===================== Bài 22: Ba đường conic ===================== */
const ELL=[[5,4,3],[5,3,4],[13,12,5],[13,5,12],[10,8,6],[10,6,8],[17,15,8],[17,8,15],[3,2,0],[4,3,0],[6,4,0]];/* [a, b, c]; c = 0 nghĩa là c không nguyên */
const ellH=(a2,b2)=>`${fr(`${I('x')}${sup(2)}`,a2)} + ${fr(`${I('y')}${sup(2)}`,b2)} = 1`,hypH=(a2,b2)=>`${fr(`${I('x')}${sup(2)}`,a2)} ${MINUS} ${fr(`${I('y')}${sup(2)}`,b2)} = 1`;
N10b('k10-22-which',7,'NB',[22],r=>{
  const a=r.int(3,7),b=r.int(2,a-1),k=r.int(0,2),p=r.int(1,6);
  const E=ellH(a*a,b*b),Hy=hypH(a*a,b*b),Pa=`${I('y')}${sup(2)} = ${2*p}${I('x')}`;
  const cor=[E,Hy,Pa][k],nm=['elip','hypebol','parabol'][k],W=[E,Hy,Pa].filter(x=>x!==cor).concat([ellH(b*b,a*a),`${I('x')}${sup(2)} = ${2*p}${I('y')}`,`${fr(`${I('x')}${sup(2)}`,a*a)} + ${fr(`${I('y')}${sup(2)}`,b*b)} = 0`]).filter(x=>!(k===0&&x===ellH(b*b,a*a)));
  return mkTxt(r,{stem:`Phương trình nào sau đây là phương trình chính tắc của một ${nm}?`,correct:cor,wrongs:k===0?W.filter(x=>x!==ellH(b*b,a*a)):W,
    sol:`Phương trình chính tắc: elip ${fr('x²','a²')} + ${fr('y²','b²')} = 1 (a > b > 0); hypebol ${fr('x²','a²')} − ${fr('y²','b²')} = 1 (a, b > 0); parabol y² = 2px (p > 0).`,chk:()=>true});
});
N10b('k10-22-ell',7,'TH',[22],r=>{
  const [a,b,c]=r.pick(ELL.filter(e=>e[2])),ask=r.int(0,2);
  if(ask===0)return mkTxt(r,{stem:`Elip (${I('E')}): ${ellH(a*a,b*b)} có hai tiêu điểm là`,correct:`${I('F')}${sub(1)}(${MINUS}${c}; 0), ${I('F')}${sub(2)}(${c}; 0)`,wrongs:[`${I('F')}${sub(1)}(${MINUS}${a}; 0), ${I('F')}${sub(2)}(${a}; 0)`,`${I('F')}${sub(1)}(0; ${MINUS}${c}), ${I('F')}${sub(2)}(0; ${c})`,`${I('F')}${sub(1)}(${MINUS}${sqH(a*a+b*b)}; 0), ${I('F')}${sub(2)}(${sqH(a*a+b*b)}; 0)`,`${I('F')}${sub(1)}(${MINUS}${b}; 0), ${I('F')}${sub(2)}(${b}; 0)`],
    sol:`a² = ${a*a}, b² = ${b*b}, c = √(a² − b²) = ${c}. Tiêu điểm F₁(−${c}; 0), F₂(${c}; 0).`,chk:()=>a*a-b*b===c*c});
  if(ask===1)return mkNum(r,{stem:`Tiêu cự của elip (${I('E')}): ${ellH(a*a,b*b)} bằng`,correct:2*c,cands:[c,2*a,2*b,a+b,a*a-b*b],sol:`c = √(${a*a} − ${b*b}) = ${c}; tiêu cự F₁F₂ = 2c = ${2*c}.`,chk:()=>true});
  return mkNum(r,{stem:`Cho elip (${I('E')}): ${ellH(a*a,b*b)} có hai tiêu điểm ${I('F')}${sub(1)}, ${I('F')}${sub(2)}. Với mọi điểm ${I('M')} thuộc (${I('E')}), tổng ${I('MF')}${sub(1)} + ${I('MF')}${sub(2)} bằng`,correct:2*a,cands:[a,2*b,2*c,a*a,a+b],sol:`MF₁ + MF₂ = 2a = 2·${a} = ${2*a}.`,chk:()=>true});
});
const HYP=[[3,4,5],[4,3,5],[5,12,13],[12,5,13],[6,8,10],[8,6,10],[8,15,17],[15,8,17]];
N10b('k10-22-hyp',7,'TH',[22],r=>{
  const [a,b,c]=r.pick(HYP),ask=r.int(0,2);
  if(ask===0)return mkTxt(r,{stem:`Hypebol (${I('H')}): ${hypH(a*a,b*b)} có hai tiêu điểm là`,correct:`${I('F')}${sub(1)}(${MINUS}${c}; 0), ${I('F')}${sub(2)}(${c}; 0)`,wrongs:[`${I('F')}${sub(1)}(${MINUS}${a}; 0), ${I('F')}${sub(2)}(${a}; 0)`,`${I('F')}${sub(1)}(0; ${MINUS}${c}), ${I('F')}${sub(2)}(0; ${c})`,`${I('F')}${sub(1)}(${MINUS}${sqH(Math.abs(a*a-b*b))}; 0), ${I('F')}${sub(2)}(${sqH(Math.abs(a*a-b*b))}; 0)`,`${I('F')}${sub(1)}(${MINUS}${b}; 0), ${I('F')}${sub(2)}(${b}; 0)`],
    sol:`c = √(a² + b²) = √(${a*a} + ${b*b}) = ${c}. Tiêu điểm F₁(−${c}; 0), F₂(${c}; 0).`,chk:()=>true});
  if(ask===1)return mkNum(r,{stem:`Tiêu cự của hypebol (${I('H')}): ${hypH(a*a,b*b)} bằng`,correct:2*c,cands:[c,2*a,2*b,2*Math.abs(a-b)+2,a+b],sol:`c = √(${a*a} + ${b*b}) = ${c}; tiêu cự 2c = ${2*c}.`,chk:()=>true});
  return mkNum(r,{stem:`Cho hypebol (${I('H')}): ${hypH(a*a,b*b)} có hai tiêu điểm ${I('F')}${sub(1)}, ${I('F')}${sub(2)}. Với mọi điểm ${I('M')} thuộc (${I('H')}), giá trị |${I('MF')}${sub(1)} ${MINUS} ${I('MF')}${sub(2)}| bằng`,correct:2*a,cands:[a,2*b,2*c,a*a],sol:`|MF₁ − MF₂| = 2a = ${2*a}.`,chk:()=>true});
});
N10b('k10-22-par',7,'NB',[22],r=>{
  const p=r.int(1,8),ask=r.chance(.5),pH=qh(Q(p,2));
  if(ask)return mkTxt(r,{stem:`Tiêu điểm của parabol (${I('P')}): ${I('y')}${sup(2)} = ${2*p}${I('x')} là`,correct:`${I('F')}(${pH}; 0)`,wrongs:[`${I('F')}(${p}; 0)`,`${I('F')}(${2*p}; 0)`,`${I('F')}(0; ${pH})`,`${I('F')}(${MINUS}${pH}; 0)`],
    sol:`2p = ${2*p} ⇒ p = ${p}; tiêu điểm F(${fr('p',2)}; 0) = (${pH}; 0).`,chk:()=>true});
  return mkTxt(r,{stem:`Đường chuẩn của parabol (${I('P')}): ${I('y')}${sup(2)} = ${2*p}${I('x')} là`,correct:`${I('x')} = ${MINUS}${pH}`,wrongs:[`${I('x')} = ${pH}`,`${I('x')} = ${MINUS}${p}`,`${I('y')} = ${MINUS}${pH}`,`${I('x')} = ${MINUS}${2*p}`],
    sol:`p = ${p}; đường chuẩn Δ: x = ${fr('−p',2)} = −${pH}.`,chk:()=>true});
});
N10b('k10-22-find',7,'VD',[22],r=>{
  const [a,b,c]=r.pick(ELL.filter(e=>e[2])),hyp=r.chance(.4);
  if(hyp){const [A,B,C]=r.pick(HYP);return mkTxt(r,{stem:`Phương trình chính tắc của hypebol có tiêu cự bằng ${2*C} và |${I('MF')}${sub(1)} ${MINUS} ${I('MF')}${sub(2)}| = ${2*A} với mọi điểm ${I('M')} thuộc hypebol là`,correct:hypH(A*A,B*B),wrongs:[hypH(A*A,C*C),ellH(C*C,B*B),hypH(B*B,A*A),hypH(4*A*A,4*B*B)],
    sol:`2c = ${2*C} ⇒ c = ${C}; 2a = ${2*A} ⇒ a = ${A}; b² = c² − a² = ${B*B}.`,chk:()=>true})}
  return mkTxt(r,{stem:`Phương trình chính tắc của elip có tiêu cự bằng ${2*c} và tổng khoảng cách từ mỗi điểm trên elip đến hai tiêu điểm bằng ${2*a} là`,correct:ellH(a*a,b*b),wrongs:[ellH(a*a,c*c),ellH(4*a*a,4*b*b),hypH(a*a,b*b),ellH(b*b,a*a)],
    sol:`2c = ${2*c} ⇒ c = ${c}; 2a = ${2*a} ⇒ a = ${a}; b² = a² − c² = ${b*b}.`,chk:()=>true});
});
DS10b('ds10-22-conic',7,'TH',[22],r=>{
  const [a,b,c]=r.pick(ELL.filter(e=>e[2])),p=r.int(1,6);
  return mkDS(r,{stem:`Cho elip (${I('E')}): ${ellH(a*a,b*b)} và parabol (${I('P')}): ${I('y')}${sup(2)} = ${2*p}${I('x')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`(${I('E')}) có tiêu cự bằng ${2*c}.`,f:`(${I('E')}) có tiêu cự bằng ${c}.`,why:`c = √(a² − b²) = ${c}, tiêu cự 2c = ${2*c}.`},
    {t:`Điểm (${a}; 0) thuộc (${I('E')}).`,f:`Điểm (${b}; 0) thuộc (${I('E')}).`,why:`${fr(`${a}²`,a*a)} + 0 = 1.`},
    {t:`(${I('P')}) có tiêu điểm ${I('F')}(${qh(Q(p,2))}; 0).`,f:`(${I('P')}) có tiêu điểm ${I('F')}(${p}; 0).`,why:`2p = ${2*p} ⇒ p = ${p}, F(p/2; 0).`},
    {t:`Đường chuẩn của (${I('P')}) là ${I('x')} = ${MINUS}${qh(Q(p,2))}.`,f:`Đường chuẩn của (${I('P')}) là ${I('x')} = ${qh(Q(p,2))}.`,why:`Đường chuẩn x = −p/2.`}],chk:()=>true});
});
TLN10b('t10-22-focal',7,'TH',[22],r=>{
  const k=r.int(0,1);
  if(k){const [a,b,c]=r.pick(HYP);return{kind:'tln',stem:`Tính tiêu cự của hypebol ${hypH(a*a,b*b)}.`,ans:2*c,unit:'',sol:`c = √(${a*a} + ${b*b}) = ${c}; tiêu cự 2c = ${2*c}.`,chk:()=>true}}
  const [a,b,c]=r.pick(ELL.filter(e=>e[2]));return{kind:'tln',stem:`Tính tiêu cự của elip ${ellH(a*a,b*b)}.`,ans:2*c,unit:'',sol:`c = √(${a*a} − ${b*b}) = ${c}; tiêu cự 2c = ${2*c}.`,chk:()=>true};
});
TLN10b('t10-22-arch',7,'VD',[22],r=>{
  for(;;){const a=r.pick([8,10,12,15,16,20]),b=r.pick([3,4,5,6]),x=r.int(1,a-1),y=b*Math.sqrt(1-x*x/(a*a)),ans=Math.round(y*100)/100;if(Math.abs(y*100-Math.round(y*100))>.49)continue;
  return{kind:'tln',stem:`Một mái vòm có mặt cắt là nửa elip, chiều rộng ${2*a} m, chiều cao ${b} m. Chọn hệ trục ${I('Oxy')} với ${I('O')} là trung điểm chân vòm, trục ${I('Ox')} nằm trên mặt đất, nửa elip có phương trình ${ellH(a*a,b*b)} (${I('y')} ≥ 0). Tính chiều cao của vòm tại điểm cách tâm ${I('O')} một khoảng ${x} m (đơn vị: mét, làm tròn kết quả đến hàng phần trăm).`,ans,unit:'m',
    sol:`Thay x = ${x}: y = ${b}·√(1 − ${fr(x*x,a*a)}) ≈ ${fmt(ans)} (m).`,chk:()=>true}}
});
TL10b('tl10-22-conic',7,'VD','b',[22],r=>{
  const [a,b,c]=r.pick(ELL.filter(e=>e[2])),p=r.int(1,6);
  return{kind:'tl',title:'Ba đường conic',parts:[
    {pts:.5,html:`Cho elip (${I('E')}): ${ellH(a*a,b*b)}. Tìm toạ độ các tiêu điểm, tiêu cự của (${I('E')}) và tính ${I('MF')}${sub(1)} + ${I('MF')}${sub(2)} với ${I('M')} là điểm bất kì thuộc (${I('E')}).`},
    {pts:.5,html:`Viết phương trình chính tắc của parabol (${I('P')}) có tiêu điểm trùng với tiêu điểm ${I('F')}${sub(2)}(${c}; 0) của (${I('E')}); tìm phương trình đường chuẩn của (${I('P')}).`}],
    sol:[ptxt([[`c = √(${a*a} − ${b*b}) = ${c}; F₁(−${c}; 0), F₂(${c}; 0); tiêu cự 2c = ${2*c}.`,.25],[`MF₁ + MF₂ = 2a = ${2*a}.`,.25]]),ptxt([[`(P): y² = 2px có tiêu điểm (p/2; 0) ⇒ p/2 = ${c} ⇒ p = ${2*c}.`,.25],[`(P): y² = ${4*c}x; đường chuẩn x = −${c}.`,.25]])],chk:()=>p>0};
});
DS10b('ds10-22-hyp',7,'VD',[22],r=>{
  const [a,b,c]=r.pick(HYP),M=[a,0],[ea,eb,ec]=r.pick(ELL.filter(e=>e[2]));
  return mkDS(r,{stem:`Cho hypebol (${I('H')}): ${hypH(a*a,b*b)} và elip (${I('E')}): ${ellH(ea*ea,eb*eb)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`(${I('H')}) có hai tiêu điểm ${I('F')}${sub(1)}(${MINUS}${c}; 0), ${I('F')}${sub(2)}(${c}; 0).`,f:`(${I('H')}) có hai tiêu điểm ${I('F')}${sub(1)}(${MINUS}${sqH(Math.abs(a*a-b*b))}; 0), ${I('F')}${sub(2)}(${sqH(Math.abs(a*a-b*b))}; 0).`,why:`c² = a² + b² = ${c*c}.`},
    {t:`Điểm ${I('M')}(${a}; 0) thuộc (${I('H')}) và |${I('MF')}${sub(1)} ${MINUS} ${I('MF')}${sub(2)}| = ${2*a}.`,f:`Điểm ${I('M')}(${a}; 0) thuộc (${I('H')}) và |${I('MF')}${sub(1)} ${MINUS} ${I('MF')}${sub(2)}| = ${2*c}.`,why:`MF₁ = ${a+c}, MF₂ = ${c-a}, hiệu bằng 2a = ${2*a}.`},
    {t:`Tiêu cự của (${I('E')}) bằng ${2*ec}.`,f:`Tiêu cự của (${I('E')}) bằng ${2*ea}.`,why:`c = √(${ea*ea} − ${eb*eb}) = ${ec}.`},
    {t:`Với mọi điểm ${I('N')} thuộc (${I('E')}) ta có ${I('NF')}${sub(1)}′ + ${I('NF')}${sub(2)}′ = ${2*ea}, trong đó ${I('F')}${sub(1)}′, ${I('F')}${sub(2)}′ là hai tiêu điểm của (${I('E')}).`,f:`Với mọi điểm ${I('N')} thuộc (${I('E')}) ta có ${I('NF')}${sub(1)}′ + ${I('NF')}${sub(2)}′ = ${2*eb}, trong đó ${I('F')}${sub(1)}′, ${I('F')}${sub(2)}′ là hai tiêu điểm của (${I('E')}).`,why:`Tổng khoảng cách bằng 2a = ${2*ea}.`}],chk:()=>M[1]===0});
});
