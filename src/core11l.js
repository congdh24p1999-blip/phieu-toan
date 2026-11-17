/* ===== Toán 11: thêm dạng để các đề không lặp cùng một dạng ===== */
/* ---------- Chương I ---------- */
DS11('ds1-formula',1,'NB',r=>{
  const x=I('x'),P=[
    {t:`sin(π ${MINUS} ${x}) = sin ${x}`,f:`sin(π ${MINUS} ${x}) = ${MINUS}sin ${x}`,why:`Hai góc bù nhau có sin bằng nhau.`},
    {t:`cos(${MINUS}${x}) = cos ${x}`,f:`cos(${MINUS}${x}) = ${MINUS}cos ${x}`,why:`Hai góc đối nhau có côsin bằng nhau.`},
    {t:`tan(${x} + π) = tan ${x}`,f:`tan(${x} + π) = ${MINUS}tan ${x}`,why:`Hai góc hơn kém π có tang bằng nhau.`},
    {t:`cos(${fr('π',2)} ${MINUS} ${x}) = sin ${x}`,f:`cos(${fr('π',2)} ${MINUS} ${x}) = cos ${x}`,why:`Hai góc phụ nhau: côsin góc này bằng sin góc kia.`},
    {t:`sin 2${x} = 2sin ${x} cos ${x}`,f:`sin 2${x} = 2sin ${x}`,why:`Công thức nhân đôi: sin 2x = 2sin x cos x.`},
    {t:`cos 2${x} = 1 ${MINUS} 2sin${sup(2)} ${x}`,f:`cos 2${x} = 1 ${MINUS} 2cos${sup(2)} ${x}`,why:`cos 2x = cos²x − sin²x = 1 − 2sin²x = 2cos²x − 1.`},
    {t:`sin(${x} + π) = ${MINUS}sin ${x}`,f:`sin(${x} + π) = sin ${x}`,why:`Hai góc hơn kém π có sin đối nhau.`}];
  const items=r.shuffle(P).slice(0,4).map(it=>({...it,t:it.t+' với mọi '+x+'.',f:it.f+' với mọi '+x+'.'}));
  return mkDS(r,{stem:`Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>{const v=0.7;return closeN(Math.sin(Math.PI-v),Math.sin(v))&&closeN(Math.cos(2*v),1-2*Math.sin(v)**2)}});
});
TL11('tl1-val',1,'TH','a',r=>{
  const [p,q,c]=r.pick([[3,4,5],[4,3,5],[5,12,13],[12,5,13],[8,15,17],[15,8,17]]),cq=r.int(0,1);
  /* cos α = −p/c, sin α = q/c (π/2 < α < π) hoặc sin α = −q/c, cos α = −p/c (π < α < 3π/2) */
  const s=cq?Q(-q,c):Q(q,c),co=Q(-p,c),tn=Q(s[0]*1,co[0]*1),s2=Q(2*s[0]*co[0],c*c),c2=Q(p*p-q*q,c*c);
  const rng=cq?`π &lt; α &lt; ${fr('3π',2)}`:`${fr('π',2)} &lt; α &lt; π`;
  return{kind:'tl',title:'Giá trị lượng giác, công thức lượng giác',parts:[
    {pts:.5,html:`Cho cos α = ${qh(co)} với ${rng}. Tính sin α và tan α.`},
    {pts:.5,html:`Tính sin 2α và cos 2α.`}],
    sol:[ptxt([[`sin${sup(2)} α = 1 ${MINUS} cos${sup(2)} α = 1 ${MINUS} ${fr(p*p,c*c)} = ${fr(q*q,c*c)}; vì ${rng} nên sin α ${cq?'&lt;':'&gt;'} 0, do đó sin α = ${qh(s)}.`,.25],[`tan α = ${fr('sin α','cos α')} = ${qh(tn)}.`,.25]]),
      ptxt([[`sin 2α = 2sin α cos α = 2·(${qh(s)})·(${qh(co)}) = ${qh(s2)}.`,.25],[`cos 2α = 2cos${sup(2)} α ${MINUS} 1 = 2·${fr(p*p,c*c)} ${MINUS} 1 = ${qh(c2)}.`,.25]])],
    chk:()=>{const a=cq?Math.PI+Math.acos(p/c):Math.acos(-p/c);return closeN(Math.cos(a),-p/c)&&closeN(Math.sin(a),qv(s))&&closeN(Math.sin(2*a),qv(s2))&&closeN(Math.cos(2*a),qv(c2))}};
});
TL11('tl1-wheel',1,'VD','a',r=>{
  const R=r.pick([10,15,20,25]),A=R+r.pick([2,3,5]),P=r.pick([12,18,24,30,36]),k=r.int(0,2);
  const tgt=[[A+R/2,P/3,`${fr('π',6)}`],[A,P/4,'0'],[A-R/2,P/6,`${MINUS}${fr('π',6)}`]][k];
  const h=`${I('h')}(${I('t')}) = ${A} + ${R}sin(${fr(`2π${I('t')}`,P)} ${MINUS} ${fr('π',2)})`;
  return{kind:'tl',title:'Hàm số lượng giác trong thực tế',parts:[
    {pts:.5,html:`Độ cao (mét) so với mặt đất của một cabin vòng quay sau ${I('t')} phút kể từ lúc bắt đầu quay được cho bởi ${h}. Tìm độ cao lớn nhất, nhỏ nhất của cabin và chu kì quay.`},
    {pts:.5,html:`Tìm thời điểm đầu tiên (${I('t')} &gt; 0) cabin ở độ cao ${fmt(tgt[0])} m.`}],
    sol:[ptxt([[`Vì ${MINUS}1 ≤ sin(…) ≤ 1 nên ${A-R} ≤ ${I('h')} ≤ ${A+R}: độ cao lớn nhất ${A+R} m, nhỏ nhất ${A-R} m.`,.25],[`Chu kì ${I('T')} = ${fr('2π',fr('2π',P))} = ${P} phút.`,.25]]),
      ptxt([[`${I('h')} = ${fmt(tgt[0])} ⟺ sin(${fr(`2π${I('t')}`,P)} ${MINUS} ${fr('π',2)}) = ${k===0?fr(1,2):k===1?'0':MINUS+fr(1,2)}, nghiệm dương nhỏ nhất ứng với ${fr(`2π${I('t')}`,P)} ${MINUS} ${fr('π',2)} = ${tgt[2]}.`,.25],[`Suy ra ${I('t')} = ${fmt(tgt[1])} phút.`,.25]])],
    chk:()=>{const f=t=>A+R*Math.sin(2*Math.PI*t/P-Math.PI/2);let first=null;for(let t=0.001;t<P;t+=0.001)if(Math.abs(f(t)-tgt[0])<0.01){first=t;break}return first!==null&&Math.abs(first-tgt[1])<0.05}};
});
/* ---------- Chương II (không dùng cấp số nhân để dùng được cho đề giữa kì I) ---------- */
TL11('tl2-csc2',2,'TH','b',r=>{
  const u1=r.nz(-9,9),d=r.nz(-6,6),i=r.int(2,4),j=r.int(i+3,9),ui=u1+(i-1)*d,uj=u1+(j-1)*d,n=r.pick([10,15,20]),Sn=n*(2*u1+(n-1)*d)/2;
  return{kind:'tl',title:'Cấp số cộng',parts:[
    {pts:.5,html:`Cho cấp số cộng ${UN} có ${U(i)} = ${sg(ui)} và ${U(j)} = ${sg(uj)}. Tìm số hạng đầu ${U(1)} và công sai ${I('d')}.`},
    {pts:.5,html:`Tính ${U(n)} và tổng ${n} số hạng đầu tiên của cấp số cộng.`}],
    sol:[ptxt([[`${U(j)} ${MINUS} ${U(i)} = ${j-i}${I('d')} = ${sg(uj-ui)} ⟹ ${I('d')} = ${sg(d)}.`,.25],[`${U(1)} = ${U(i)} ${MINUS} ${i-1}${I('d')} = ${sg(u1)}.`,.25]]),
      ptxt([[`${U(n)} = ${U(1)} + ${n-1}${I('d')} = ${sg(u1+(n-1)*d)}.`,.25],[`${I('S')}${sub(n)} = ${fr(`${n}(${U(1)} + ${U(n)})`,2)} = ${sg(Sn)}.`,.25]])],
    chk:()=>{let s=0;for(let t=0;t<n;t++)s+=u1+t*d;return s===Sn}};
});
TL11('tl2-seats',2,'VD','b',r=>{
  const u1=r.int(12,25),d=r.int(2,4),n=r.int(15,25),un=u1+(n-1)*d,S=n*(u1+un)/2,f=r.int(0,1);
  const ctx=f?['Một khán đài có','hàng ghế','ghế','hàng']:['Một rạp hát có','dãy ghế','ghế','dãy'];
  return{kind:'tl',title:'Cấp số cộng trong thực tế',parts:[
    {pts:.5,html:`${ctx[0]} ${n} ${ctx[1]}. ${ctx[3][0].toUpperCase()+ctx[3].slice(1)} đầu tiên có ${u1} ${ctx[2]}, mỗi ${ctx[3]} sau nhiều hơn ${ctx[3]} liền trước ${d} ${ctx[2]}. Hỏi ${ctx[3]} cuối cùng có bao nhiêu ${ctx[2]}?`},
    {pts:.5,html:`Tính tổng số ${ctx[2]} và số ${ctx[2]} của ${ctx[3]} thứ mười.`}],
    sol:[ptxt([[`Số ${ctx[2]} các ${ctx[3]} lập thành cấp số cộng với ${U(1)} = ${u1}, ${I('d')} = ${d}.`,.25],[`${ctx[3][0].toUpperCase()+ctx[3].slice(1)} cuối: ${U(n)} = ${u1} + ${n-1}·${d} = ${un} (${ctx[2]}).`,.25]]),
      ptxt([[`${I('S')}${sub(n)} = ${fr(`${n}(${u1} + ${un})`,2)} = ${S} (${ctx[2]}).`,.25],[`${U(10)} = ${u1} + 9·${d} = ${u1+9*d} (${ctx[2]}).`,.25]])],
    chk:()=>Number.isInteger(S)};
});
/* ---------- Chương IV ---------- */
const boxP11=()=>{const P={A:[0,0,0],B:[4.4,0,0],C:[4.4,3,0],D:[0,3,0]};['A','B','C','D'].forEach(k=>P[k+'′']=[P[k][0],P[k][1],3.2]);return P};
DS11('ds4-box',4,'TH',r=>{
  const P=boxP11(),fig=fig3D(P,[['A','B'],['B','C'],['A′','B′'],['B′','C′'],['C′','D′'],['D′','A′'],['A','A′'],['B','B′'],['C','C′']],[['A','D'],['D','C'],['D','D′']],['A','B','C','D','A′','B′','C′','D′']);
  const L=s=>I(s),Pn=s=>`(${I(s)})`;
  const pool=[
    {t:`${Pn('ABB′A′')} ∥ ${Pn('DCC′D′')}.`,f:`${Pn('ABB′A′')} ∥ ${Pn('BCC′B′')}.`,why:`Hai mặt đối diện của hình hộp nằm trên hai mặt phẳng song song; ${Pn('ABB′A′')} và ${Pn('BCC′B′')} có chung ${L('BB′')}.`},
    {t:`${L('AC')} ∥ ${Pn('A′B′C′D′')}.`,f:`${L('AC')} ∥ ${Pn('BCC′B′')}.`,why:`${L('AC')} ⊂ ${Pn('ABCD')} ∥ ${Pn('A′B′C′D′')}; còn ${L('AC')} cắt ${Pn('BCC′B′')} tại ${L('C')}.`},
    {t:`${L('A′C′')} ∥ ${L('AC')}.`,f:`${L('A′C′')} ∥ ${L('BD')}.`,why:`${L('ACC′A′')} là hình bình hành nên ${L('A′C′')} ∥ ${L('AC')}; ${L('A′C′')} và ${L('BD')} chéo nhau.`},
    {t:`${Pn('AB′D′')} ∥ ${Pn('C′BD')}.`,f:`${Pn('AB′D′')} ∥ ${Pn('A′BD')}.`,why:`${L('B′D′')} ∥ ${L('BD')} và ${L('AB′')} ∥ ${L('DC′')} nên ${Pn('AB′D′')} ∥ ${Pn('C′BD')}; ${Pn('AB′D′')} và ${Pn('A′BD')} cắt nhau.`},
    {t:`${L('BB′')} ∥ ${Pn('ACC′A′')}.`,f:`${L('BB′')} ∥ ${Pn('ABCD')}.`,why:`${L('BB′')} ∥ ${L('AA′')} ⊂ ${Pn('ACC′A′')}; ${L('BB′')} cắt ${Pn('ABCD')} tại ${L('B')}.`}];
  return mkDS(r,{stem:`Cho hình hộp ${I('ABCD.A′B′C′D′')}.${fig}Xét tính đúng sai của các khẳng định sau:`,items:r.shuffle(pool).slice(0,4),chk:()=>true});
});
DS11('ds4-sec',4,'VD',r=>{
  const F=chopHBH(),P={...F.P},[M,N]=r.pick([['M','N'],['E','F'],['P','Q']]);P[M]=V3.mid(P.S,P.C);P[N]=V3.mid(P.S,P.D);
  return mkDS(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành. Gọi ${I(M)} là trung điểm của ${I('SC')}; mặt phẳng ${PL7('AB'+M)} cắt ${I('SD')} tại ${I(N)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I(M+N)} ∥ ${I('CD')}.`,f:`${I(M+N)} cắt ${I('CD')}.`,why:`${I('AB')} ∥ ${I('CD')} nên ${I('AB')} ∥ ${PL7('SCD')}; giao tuyến ${I(M+N)} của ${PL7('AB'+M)} và ${PL7('SCD')} song song với ${I('CD')}.`},
    {t:`${I(N)} là trung điểm của ${I('SD')}.`,f:`${I('S'+N)} = 2${I(N+'D')}.`,why:`Trong tam giác ${I('SCD')}, ${I(M+N)} ∥ ${I('CD')} và ${I(M)} là trung điểm ${I('SC')} nên ${I(N)} là trung điểm ${I('SD')}.`},
    {t:`${I(M+N)} = ${fr(1,2)}${I('AB')}.`,f:`${I(M+N)} = ${I('AB')}.`,why:`${I(M+N)} là đường trung bình của tam giác ${I('SCD')} nên ${I(M+N)} = ${fr(1,2)}${I('CD')} = ${fr(1,2)}${I('AB')}.`},
    {t:`Thiết diện của hình chóp cắt bởi ${PL7('AB'+M)} là hình thang.`,f:`Thiết diện của hình chóp cắt bởi ${PL7('AB'+M)} là hình bình hành.`,why:`Thiết diện ${I('AB'+M+N)} có ${I(M+N)} ∥ ${I('AB')} và ${I(M+N)} ≠ ${I('AB')} nên là hình thang (không phải hình bình hành).`}
  ],chk:()=>V3.len(V3.cross(V3.sub(P[N],P[M]),V3.sub(P.D,P.C)))<1e-9});
});
/* ---------- Chương V ---------- */
DS11('ds5-par',5,'VD',r=>{
  const a=r.nz(-3,3),b=r.nz(-4,4),x0=r.nz(-2,2),L=x0*x0+a*x0,m=L-2*x0;/* f(x)=x²+ax (x ≤ x0), 2x + m (x > x0) */
  const fx=`${I('f')}(${I('x')})`;
  return mkDS(r,{stem:`Cho hàm số ${fx} = ${xquad(1,a,0)} khi ${I('x')} ≤ ${sg(x0)} và ${fx} = 2${I('x')} + ${I('m')} khi ${I('x')} &gt; ${sg(x0)} (${I('m')} là tham số). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${fx} liên tục trên khoảng (${sg(x0)}; +∞) với mọi ${I('m')}.`,f:`${fx} gián đoạn tại mọi điểm thuộc khoảng (${sg(x0)}; +∞) khi ${I('m')} = 0.`,why:`Trên (${sg(x0)}; +∞), ${fx} = 2x + m là hàm đa thức nên liên tục.`},
    {t:`lim${sub(`${I('x')}→${sg(x0)}${sup(MINUS)}`)} ${fx} = ${sg(L)}.`,f:`lim${sub(`${I('x')}→${sg(x0)}${sup(MINUS)}`)} ${fx} = ${sg(L+1)}.`,why:`lim${sub(`x→${sg(x0)}⁻`)} (${xquad(1,a,0)}) = ${sg(x0)}${sup(2)} ${a<0?'−':'+'} ${Math.abs(a)}·(${sg(x0)}) = ${sg(L)}.`},
    {t:`${fx} liên tục tại ${I('x')} = ${sg(x0)} khi ${I('m')} = ${sg(m)}.`,f:`${fx} liên tục tại ${I('x')} = ${sg(x0)} khi ${I('m')} = ${sg(m+1)}.`,why:`Cần lim${sub('x→'+sg(x0)+'⁺')} (2x + m) = ${sg(2*x0)} + m = ${sg(L)}, tức m = ${sg(m)}.`},
    {t:`Với ${I('m')} = ${sg(m+2)}, hàm số gián đoạn tại ${I('x')} = ${sg(x0)}.`,f:`Với ${I('m')} = ${sg(m+2)}, hàm số liên tục trên ℝ.`,why:`Khi m ≠ ${sg(m)}, giới hạn phải ${sg(2*x0+m+2)} khác ${I('f')}(${sg(x0)}) = ${sg(L)}.`}
  ],chk:()=>2*x0+m===L});
});
/* ---------- Chương VI ---------- */
DS11b('ds11-6-num',6,'NB',r=>{
  const a=r.pick([2,3,5]),k=r.int(2,4),m=r.int(2,5),n=r.int(3,4);
  return mkDS(r,{stem:`Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`log${sub(a)} ${a**k} = ${k}.`,f:`log${sub(a)} ${a**k} = ${a**(k-1)}.`,why:`${a}${sup(k)} = ${a**k} nên log${sub(a)} ${a**k} = ${k}.`},
    {t:`${a}${sup(MINUS+'1')} = ${fr(1,a)}.`,f:`${a}${sup(MINUS+'1')} = ${MINUS}${a}.`,why:`a${sup('−n')} = ${fr(1,'a'+sup('n'))}.`},
    {t:`${a}${sup(m)} · ${a}${sup(n)} = ${a}${sup(m+n)}.`,f:`${a}${sup(m)} · ${a}${sup(n)} = ${a}${sup(m*n)}.`,why:`a${sup('m')}·a${sup('n')} = a${sup('m+n')}.`},
    {t:`log${sub(a)} 1 = 0.`,f:`log${sub(a)} 1 = 1.`,why:`${a}${sup(0)} = 1 nên log${sub(a)} 1 = 0.`}
  ],chk:()=>m*n!==m+n||m!==2});
});
/* ---------- Chương VII ---------- */
TLN11b('t11-7-lp',7,'VD',r=>{
  const th=r.pick([30,45,60]),f=r.int(0,1),a=I('a');
  /* f=0: góc SC với đáy (AC = a√2); f=1: góc SB với đáy (AB = a) */
  const SAs=f?{30:`${fr(`${a}${rt(3)}`,3)}`,45:a,60:`${a}${rt(3)}`}[th]:{30:`${fr(`${a}${rt(6)}`,3)}`,45:`${a}${rt(2)}`,60:`${a}${rt(6)}`}[th];
  const e=f?'SB':'SC',proj=f?'AB':'AC';
  return{kind:'tln',stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SAs}. Tính số đo góc giữa đường thẳng ${I(e)} và mặt phẳng ${PL7('ABCD')} (đơn vị: độ).`,ans:th,unit:'',
    sol:`${I('A')} là hình chiếu của ${I('S')} trên ${PL7('ABCD')} nên góc cần tìm là ${AG('S'+proj[1]+'A')}. ${I(proj)} = ${f?a:`${a}${rt(2)}`}, tan ${AG('S'+proj[1]+'A')} = ${fr('SA',proj)} = ${th===30?fr(1,rt(3)):th===45?'1':rt(3)}, nên góc bằng ${th}°.`,
    chk:()=>{const base=f?1:Math.SQRT2,SA=Math.tan(th*Math.PI/180)*base;return closeN(Math.atan(SA/base)*180/Math.PI,th)}};
},'goc');
/* ---------- Chương VIII ---------- */
TLN11b('t11-8-two',8,'VD',r=>{
  const p=r.pick([0.9,0.8,0.85,0.95,0.7]),q=r.pick([0.9,0.8,0.75,0.95,0.6]),f=r.int(0,2);
  const val=[p*(1-q)+(1-p)*q,1-(1-p)*(1-q),(1-p)*(1-q)][f],txt=['đúng một máy hoạt động tốt','có ít nhất một máy hoạt động tốt','cả hai máy đều gặp sự cố'][f];
  const v=Math.round(val*10000)/10000;
  return{kind:'tln',stem:`Hai máy hoạt động độc lập với nhau. Xác suất để máy thứ nhất, máy thứ hai hoạt động tốt trong một ngày lần lượt là ${fmt(p)} và ${fmt(q)}. Tính xác suất để trong một ngày ${txt} (viết kết quả dưới dạng số thập phân).`,ans:v,unit:'',
    sol:f===0?`P = ${fmt(p)}·${fmt(Math.round((1-q)*100)/100)} + ${fmt(Math.round((1-p)*100)/100)}·${fmt(q)} = ${fmt(v)}.`:f===1?`Biến cố đối là “cả hai máy gặp sự cố”, có xác suất ${fmt(Math.round((1-p)*100)/100)}·${fmt(Math.round((1-q)*100)/100)}. Vậy P = 1 − ${fmt(Math.round((1-p)*(1-q)*10000)/10000)} = ${fmt(v)}.`:`P = ${fmt(Math.round((1-p)*100)/100)}·${fmt(Math.round((1-q)*100)/100)} = ${fmt(v)}.`};
});
/* ---------- Chương IX ---------- */
TLN11b('t11-9-par',9,'VD',r=>{
  for(;;){const r1=r.int(-3,3),r2=r.int(-3,4),m=r.nz(-9,9);if(r1===r2||(r1+r2)%2)continue;
    const b=-1.5*(r1+r2),c=3*r1*r2+m,e=r.int(-5,5),f=x=>x**3+b*x*x+c*x+e,fp=x=>3*x*x+2*b*x+c,ask=r.int(0,1);
    if(Math.abs(c)>30)continue;
    const yy=[r1,r2].map(x=>f(x)-m*x);let K=r.nz(-9,9);while(yy.includes(K))K++;
    return{kind:'tln',stem:`Cho hàm số ${I('y')} = ${polyH([1,b,c,e])} có đồ thị ${PL7('C')}. Biết có hai tiếp tuyến của ${PL7('C')} song song với đường thẳng ${I('y')} = ${xlin(m,K)}. Tính ${ask?'tích':'tổng'} hoành độ các tiếp điểm.`,ans:ask?r1*r2:r1+r2,unit:'',
      sol:`${I('y')}′ = ${polyH([3,2*b,c])}. Tiếp tuyến song song với đường thẳng hệ số góc ${m} khi ${I('y')}′ = ${m} ⟺ ${polyH([3,2*b,c-m])} = 0 ⟺ ${I('x')} = ${sg(r1)} hoặc ${I('x')} = ${sg(r2)} (hai tiếp tuyến không trùng với đường thẳng đã cho). ${ask?'Tích':'Tổng'} là ${sg(ask?r1*r2:r1+r2)}.`,
      chk:()=>fp(r1)===m&&fp(r2)===m&&Number.isInteger(b)&&!yy.includes(K)}}
},'dn');
DS11b('ds11-9-tan',9,'VD',r=>{
  const k=r.pick([1,2,3]),c=r.nz(-5,5),a=3*k*k; /* y = x³ − a x + c, y′ = 3x² − a, y′ = 0 tại x = ±k */
  const x0=k+1,s0=3*x0*x0-a,b0=x0**3-a*x0+c-s0*x0;
  return mkDS(r,{stem:`Cho hàm số ${I('y')} = ${polyH([1,0,-a,c])} có đồ thị ${PL7('C')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('y')}′ = ${polyH([3,0,-a])}.`,f:`${I('y')}′ = ${polyH([3,-a,0])}.`,why:`(x³)′ = 3x², (${a}x)′ = ${a}, (${sg(c)})′ = 0.`},
    {t:`Tiếp tuyến tại các điểm có hoành độ ${I('x')} = ±${k} song song với trục hoành.`,f:`Tiếp tuyến tại điểm có hoành độ ${I('x')} = 0 song song với trục hoành.`,why:`${I('y')}′(±${k}) = 3·${k*k} − ${a} = 0, còn ${I('y')}′(0) = ${sg(-a)} ≠ 0.`},
    {t:`Tiếp tuyến tại điểm có hoành độ ${x0} có phương trình ${I('y')} = ${xlin(s0,b0)}.`,f:`Tiếp tuyến tại điểm có hoành độ ${x0} có phương trình ${I('y')} = ${xlin(s0,b0+2)}.`,why:`${I('y')}′(${x0}) = ${s0}, ${I('y')}(${x0}) = ${sg(x0**3-a*x0+c)}; tiếp tuyến ${I('y')} = ${s0}(x − ${x0}) ${x0**3-a*x0+c<0?'−':'+'} ${Math.abs(x0**3-a*x0+c)} = ${xlin(s0,b0)}.`},
    {t:`Hệ số góc của mọi tiếp tuyến của ${PL7('C')} đều lớn hơn hoặc bằng ${sg(-a)}.`,f:`Có tiếp tuyến của ${PL7('C')} có hệ số góc bằng ${sg(-a-1)}.`,why:`${I('y')}′ = 3x² − ${a} ≥ ${sg(-a)} với mọi x.`}
  ],chk:()=>3*x0*x0-a===s0&&x0**3-a*x0+c===s0*x0+b0});
},'dn');
TL11b('tl11-7-dih',7,'VD','c',r=>{
  const th=r.pick([30,45,60]),a=I('a'),F=pyrPick(r,true),SA={30:fr(`${a}${rt(3)}`,3),45:a,60:`${a}${rt(3)}`}[th],tv={30:fr(1,rt(3)),45:'1',60:rt(3)}[th];
  const f=r.int(0,1),[E,X]=f?['BC','B']:['CD','D'];
  return{kind:'tl',title:'Góc nhị diện',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SA}.${F.fig}Chứng minh ${I(E)} ⊥ ${PL7('SA'+X)}.`},
    {pts:.5,html:`Tính số đo của góc nhị diện [${I('S')}, ${I(E)}, ${I('A')}].`}],
    sol:[ptxt([[`${I(E)} ⊥ ${I('A'+X)} (${I('ABCD')} là hình vuông) và ${I(E)} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}).`,.25],[`Do đó ${I(E)} ⊥ ${PL7('SA'+X)}.`,.25]]),
      ptxt([[`${I('S'+X)} ⊥ ${I(E)}, ${I('A'+X)} ⊥ ${I(E)} nên ${AG('S'+X+'A')} là góc phẳng nhị diện của góc nhị diện [${I('S')}, ${I(E)}, ${I('A')}].`,.25],[`tan ${AG('S'+X+'A')} = ${fr('SA','A'+X)} = ${tv}, nên góc nhị diện bằng ${th}°.`,.25]])],
    chk:()=>closeN(Math.atan({30:1/Math.sqrt(3),45:1,60:Math.sqrt(3)}[th])*180/Math.PI,th)};
},'mm');
