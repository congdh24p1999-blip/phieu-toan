/* ===== Toán 8 học kì II – bổ sung theo SGK (đối chiếu SGK Toán 8 Kết nối tri thức, tập 2) =====
   Xác suất thực nghiệm (Bài 32); quy tắc đổi dấu (Bài 22); tam giác vuông đồng dạng (Bài 36); hình đồng dạng (Bài 37);
   bài toán thực tế kiểu SGK (Bài 26, 28); số liệu cần làm tròn (Bài 35); hình chóp tính từ cạnh bên, khối ghép (Bài 38, 39). */
const rd1=v=>Math.round(v*10)/10;
const isDec8=(v,d)=>Math.abs(v*10**d-Math.round(v*10**d))<1e-9;

/* ---------- Bài toán lập phương trình kiểu SGK (bổ sung vào WP) ---------- */
const WP_NEW={
  chase:r=>{
    const x=I('x');let v1,v2,t0,t;
    for(let i=0;i<300;i++){v1=r.pick([10,12,15,18,20,24,30,36,40]);t0=r.int(1,3);t=r.int(1,4);if((v1*t0)%t===0){v2=v1+v1*t0/t;if(v2<=90&&v2>v1)break}}
    return{kind:'chase',stem:`Một người đi xe đạp xuất phát từ A với vận tốc ${v1} km/h. Sau đó ${t0} giờ, một người đi xe máy cũng xuất phát từ A đuổi theo trên cùng con đường với vận tốc ${v2} km/h. Hỏi người đi xe máy đi trong bao lâu thì đuổi kịp người đi xe đạp?`,
      unk:`Gọi ${x} (giờ) là thời gian người đi xe máy đi đến lúc đuổi kịp (${x} > 0).`,eq:`${v2}${x} = ${v1}(${x} + ${t0})`,
      wrongs:[`${v2}${x} = ${v1}(${x} ${MINUS} ${t0})`,`${v1}${x} = ${v2}(${x} + ${t0})`,`${v2}${x} + ${v1}${x} = ${v1*t0}`,`${v2}(${x} + ${t0}) = ${v1}${x}`],
      ans:t,unit:'giờ',q:'thời gian người đi xe máy đi đến lúc đuổi kịp',concl:`${t} giờ là thời gian người đi xe máy đi đến lúc đuổi kịp người đi xe đạp.`,
      chk:()=>v2*t===v1*(t+t0),solH:`${v2}${x} = ${v1}${x} + ${v1*t0} ⟺ ${v2-v1}${x} = ${v1*t0} ⟺ ${x} = ${t}`};
  },
  discount:r=>{
    const x=I('x');let p,P,T;
    for(let i=0;i<300;i++){p=r.pick([10,15,20,25,30,40]);P=r.int(4,30)*20;T=P*(100-p)/100;if(Number.isInteger(T))break}
    return{kind:'discount',stem:`Một cửa hàng giảm giá ${p}% cho một chiếc áo nên bạn Hà chỉ phải trả ${T} nghìn đồng khi mua chiếc áo đó. Hỏi giá niêm yết (giá trước khi giảm) của chiếc áo là bao nhiêu nghìn đồng?`,
      unk:`Gọi ${x} (nghìn đồng) là giá niêm yết của chiếc áo (${x} > 0).`,eq:`${x} ${MINUS} ${fr(p,100)}${x} = ${T}`,
      wrongs:[`${x} + ${fr(p,100)}${x} = ${T}`,`${fr(p,100)}${x} = ${T}`,`${x} ${MINUS} ${p} = ${T}`,`${x} = ${T} ${MINUS} ${fr(p,100)}·${T}`],
      ans:P,unit:'nghìn đồng',q:'giá niêm yết của chiếc áo (nghìn đồng)',concl:`${P} nghìn đồng là giá niêm yết của chiếc áo.`,
      chk:()=>P*(100-p)===T*100,solH:`${fr(100-p,100)}${x} = ${T} ⟺ ${x} = ${T}·${fr(100,100-p)} = ${P}`};
  },
  invest:r=>{
    const x=I('x');const S=r.pick([100,200,300,400,500]),[a,b]=r.pick([[8,6],[7,5],[6,4],[9,6],[8,5]]),X=r.int(1,S/10-1)*10,L=(a*X+b*(S-X))/100;
    return{kind:'invest',stem:`Bác Minh chia ${S} triệu đồng thành hai khoản để đầu tư. Khoản thứ nhất có lãi suất ${a}%/năm, khoản thứ hai có lãi suất ${b}%/năm. Sau một năm, tổng tiền lãi bác Minh thu được là ${fmt(L)} triệu đồng. Hỏi khoản đầu tư thứ nhất là bao nhiêu triệu đồng?`,
      unk:`Gọi ${x} (triệu đồng) là số tiền đầu tư ở khoản thứ nhất (0 < ${x} < ${S}).`,eq:`${fr(a,100)}${x} + ${fr(b,100)}(${S} ${MINUS} ${x}) = ${fmt(L)}`,
      wrongs:[`${fr(b,100)}${x} + ${fr(a,100)}(${S} ${MINUS} ${x}) = ${fmt(L)}`,`${fr(a,100)}${x} + ${fr(b,100)}${x} = ${fmt(L)}`,`${a}${x} + ${b}(${S} ${MINUS} ${x}) = ${fmt(L)}`,`${fr(a,100)}${x} ${MINUS} ${fr(b,100)}(${S} ${MINUS} ${x}) = ${fmt(L)}`],
      ans:X,unit:'triệu đồng',q:'số tiền đầu tư ở khoản thứ nhất (triệu đồng)',concl:`${X} triệu đồng là số tiền đầu tư ở khoản thứ nhất (khoản thứ hai là ${S-X} triệu đồng).`,
      chk:()=>Math.abs(a*X+b*(S-X)-L*100)<1e-9,solH:`${a}${x} + ${b}(${S} ${MINUS} ${x}) = ${Math.round(L*100)} ⟺ ${a-b}${x} = ${Math.round(L*100)-b*S} ⟺ ${x} = ${X}`};
  },
  mix:r=>{
    const x=I('x');let c1,c2,m,X;
    for(let i=0;i<300;i++){c1=r.pick([10,15,20,25,30]);c2=r.pick([5,8,10,12,15,20].filter(c=>c<c1));m=r.pick([100,200,300,400,500]);X=m*(c1-c2)/c2;if(Number.isInteger(X)&&X<=1500)break}
    const s=c1*m/100;
    return{kind:'mix',stem:`Có ${m} g dung dịch nước muối chứa ${c1}% muối. Cần pha thêm bao nhiêu gam nước để được dung dịch chứa ${c2}% muối?`,
      unk:`Gọi ${x} (g) là khối lượng nước cần pha thêm (${x} > 0).`,eq:`${s} = ${fr(c2,100)}(${m} + ${x})`,
      wrongs:[`${s} = ${fr(c2,100)}${x}`,`${s} = ${fr(c1,100)}(${m} + ${x})`,`${s} + ${x} = ${fr(c2,100)}(${m} + ${x})`,`${fr(c2,100)}·${m} = ${s} + ${x}`],
      ans:X,unit:'g',q:'khối lượng nước cần pha thêm (gam)',concl:`${X} g là khối lượng nước cần pha thêm.`,
      chk:()=>c2*(m+X)===100*s,solH:`Lượng muối là ${fr(c1,100)}·${m} = ${s} (g). ${s} = ${fr(c2,100)}(${m} + ${x}) ⟺ ${s*100} = ${c2*m} + ${c2}${x} ⟺ ${c2}${x} = ${s*100-c2*m} ⟺ ${x} = ${X}`};
  }
};
WPK.push('chase','discount','invest','mix');

/* ---------- Hàm số bậc nhất trong thực tế (Bài 27, 28) ---------- */
function fnCtx(r){
  const f=r.int(0,3);
  if(f===0){const a=r.pick([10,12,15,20]),b=r.pick([8,10,12,14,15]);return{x:'quãng đường đi được (km)',y:'số tiền phải trả (nghìn đồng)',a:b,b:a,unitX:'km',unitY:'nghìn đồng',
    stem:`Một hãng taxi tính giá cước như sau: phí mở cửa là ${a} nghìn đồng, sau đó mỗi kilômét tiếp theo là ${b} nghìn đồng.`,yx:`${I('y')} = ${b}${I('x')} + ${a}`}}
  if(f===1){const a=r.pick([300,400,500,600]),b=r.pick([80,90,100,120,150]);return{x:'số tháng sử dụng',y:'tổng chi phí (nghìn đồng)',a:b,b:a,unitX:'tháng',unitY:'nghìn đồng',
    stem:`Để dùng dịch vụ truyền hình cáp, một gia đình phải trả phí lắp đặt ban đầu ${a} nghìn đồng và phí thuê bao ${b} nghìn đồng mỗi tháng.`,yx:`${I('y')} = ${b}${I('x')} + ${a}`}}
  if(f===2){const a=r.pick([50,100,120,200]),b=r.pick([5,8,10,12,15]);return{x:'thời gian bơm (phút)',y:'lượng nước trong bể (lít)',a:b,b:a,unitX:'phút',unitY:'lít',
    stem:`Một bể đang chứa ${a} lít nước. Người ta bơm thêm nước vào bể, mỗi phút bơm được ${b} lít.`,yx:`${I('y')} = ${b}${I('x')} + ${a}`}}
  const a=r.pick([2,3,4,5,6]),b=r.pick([20,25,30,40]);return{x:'số sản phẩm sản xuất trong ngày',y:'chi phí (triệu đồng)',a,b,unitX:'sản phẩm',unitY:'triệu đồng',
    stem:`Một xưởng có chi phí cố định mỗi ngày là ${b} triệu đồng, ngoài ra mỗi sản phẩm sản xuất ra tốn thêm ${a} triệu đồng.`,yx:`${I('y')} = ${a}${I('x')} + ${b}`};
}
N8('m8-7-fnreal',7,'TH',r=>{
  const c=fnCtx(r),ask=r.chance(.5),x0=r.int(3,15),y0=c.a*x0+c.b;
  if(ask)return mkNum(r,{stem:`${c.stem} Gọi ${I('y')} là ${c.y} khi ${I('x')} là ${c.x}. Giá trị của ${I('y')} khi ${I('x')} = ${x0} là`,correct:y0,cands:[c.a*x0,c.a+c.b*x0,y0+c.a,y0-c.b,c.a*(x0+1)+c.b],f:z=>`${z} ${c.unitY}`,
    sol:`Ta có ${c.yx}. Với ${I('x')} = ${x0}: ${I('y')} = ${c.a}·${x0} + ${c.b} = ${y0} (${c.unitY}).`,chk:()=>true});
  if(c.a===c.b)return T.nlc['m8-7-fnreal'].gen(r);
  return mkTxt(r,{stem:`${c.stem} Gọi ${I('y')} là ${c.y} khi ${I('x')} là ${c.x}. Công thức biểu thị ${I('y')} theo ${I('x')} là`,correct:c.yx,wrongs:[`${I('y')} = ${c.b}${I('x')} + ${c.a}`,`${I('y')} = ${c.a}${I('x')} ${MINUS} ${c.b}`,`${I('y')} = ${c.a+c.b}${I('x')}`,`${I('y')} = ${c.a}(${I('x')} + ${c.b})`],
    sol:`${c.y.charAt(0).toUpperCase()+c.y.slice(1)} gồm phần cố định ${c.b} và phần thay đổi ${c.a}·${I('x')}, nên ${c.yx}. Đây là hàm số bậc nhất.`,chk:()=>c.a!==c.b});
});
TL8('tl8-7-fnreal',7,'VD','real',r=>{
  const c=fnCtx(r),x0=r.int(3,15),y0=c.a*x0+c.b,x1=r.int(x0+2,x0+20),y1=c.a*x1+c.b;
  return{kind:'tl',title:'Hàm số bậc nhất trong thực tế',parts:[
    {pts:.5,html:`${c.stem} Gọi ${I('y')} là ${c.y} khi ${I('x')} là ${c.x}. Viết công thức tính ${I('y')} theo ${I('x')}. ${I('y')} có phải là hàm số bậc nhất của ${I('x')} không? Tính ${I('y')} khi ${I('x')} = ${x0}.`},
    {pts:.5,html:`Nếu ${c.y.replace(/ \(.*\)$/,'')} là ${y1} ${c.unitY} thì ${c.x.replace(/ \(.*\)$/,'')} là bao nhiêu ${c.unitX}?`}],
    sol:[ptxt([[`${c.yx}; đây là hàm số bậc nhất (dạng ${I('y')} = ${I('a')}${I('x')} + ${I('b')} với ${I('a')} = ${c.a} ≠ 0).`,.25],[`Khi ${I('x')} = ${x0}: ${I('y')} = ${c.a}·${x0} + ${c.b} = ${y0} (${c.unitY}).`,.25]]),
      ptxt([[`Thay ${I('y')} = ${y1}: ${c.a}${I('x')} + ${c.b} = ${y1} ⟺ ${c.a}${I('x')} = ${y1-c.b}`,.25],[`⟺ ${I('x')} = ${x1}. Vậy ${c.x.replace(/ \(.*\)$/,'')} là ${x1} ${c.unitX}.`,.25]])],
    chk:()=>c.a*x1+c.b===y1};
});

/* ---------- Quy tắc đổi dấu (Bài 22) ---------- */
N8('m8-6-sign',6,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-6,6);if(a===b)return T.nlc['m8-6-sign'].gen(r);
  const rv=c=>c>0?`${c} ${MINUS} ${X8}`:`${MINUS}${X8} ${MINUS} ${-c}`;/* c − x viết theo kiểu SGK */
  const A=xlin(1,-a),B=xlin(1,-b),nA=rv(a),nB=rv(b);/* (x − a)/(x − b) = (a − x)/(b − x) */
  return mkTxt(r,{stem:`Áp dụng quy tắc đổi dấu, phân thức ${fr(A,B)} bằng phân thức nào sau đây?`,correct:fr(nA,nB),wrongs:[fr(nA,B),fr(A,nB),fr(B,A),fr(nB,nA)],
    sol:`Quy tắc đổi dấu: ${fr('A','B')} = ${fr(`${MINUS}A`,`${MINUS}B`)}. Đổi dấu cả tử và mẫu: ${fr(A,B)} = ${fr(nA,nB)}.`,chk:()=>{const x=2.7;return closeN((x-a)/(x-b),(a-x)/(b-x))}});
});
N8('m8-6-sign2',6,'TH',r=>{
  const k=r.pick([2,3,4,5]),m=r.pick([2,3,4,6]),a=r.nz(-5,5);if(k===m)return T.nlc['m8-6-sign2'].gen(r);
  /* k(x − a)/(m(a − x)) = −k/m */
  const ans=Q(-k,m);
  const Dn=m*a>0?`${m*a} ${MINUS} ${m}${X8}`:xlin(-m,m*a);
  return mkTxt(r,{stem:`Rút gọn phân thức ${fr(xlin(k,-k*a),Dn)} (với ${X8} ≠ ${sg(a)}) ta được`,correct:qh(ans),wrongs:[qh(Q(k,m)),qh(Q(-m,k)),qh(Q(m,k)),fr(xlin(k,0),xlin(-m,0))],
    sol:`${xlin(k,-k*a)} = ${k}${LFh(-a)}; ${Dn} = ${MINUS}${m}${LFh(-a)}. Do đó phân thức bằng ${fr(`${k}${LFh(-a)}`,`${MINUS}${m}${LFh(-a)}`)} = ${qh(ans)}.`,chk:()=>{const x=7.3;return closeN((k*x-k*a)/(m*a-m*x),qv(ans))}});
});
N8('m8-6-cube',6,'TH',r=>{
  const a=r.int(1,4),plus=r.chance(.5);
  if(plus){/* (x³ + a³)/(x + a) = x² − ax + a² */
    const ok=xquad(1,-a,a*a);
    return mkTxt(r,{stem:`Rút gọn phân thức ${fr(`${X8}${sup(3)} + ${a**3}`,xlin(1,a))} (với ${X8} ≠ ${MINUS}${a}) ta được`,correct:ok,wrongs:[xquad(1,a,a*a),xquad(1,-2*a,a*a),xquad(1,0,a*a),xquad(1,-a,-a*a)],
      sol:`${X8}${sup(3)} + ${a**3} = (${xlin(1,a)})(${ok}) nên phân thức bằng ${ok}.`,chk:()=>{const x=2.3;return closeN((x**3+a**3)/(x+a),x*x-a*x+a*a)}});
  }
  const ok=fr(1,xquad(1,a,a*a));/* (x − a)/(x³ − a³) = 1/(x² + ax + a²) */
  return mkTxt(r,{stem:`Rút gọn phân thức ${fr(xlin(1,-a),`${X8}${sup(3)} ${MINUS} ${a**3}`)} (với ${X8} ≠ ${a}) ta được`,correct:ok,wrongs:[fr(1,xquad(1,-a,a*a)),fr(1,xquad(1,2*a,a*a)),fr(1,xquad(1,0,a*a)),fr(1,xlin(1,a))],
    sol:`${X8}${sup(3)} ${MINUS} ${a**3} = (${xlin(1,-a)})(${xquad(1,a,a*a)}) nên phân thức bằng ${ok}.`,chk:()=>{const x=2.3;return closeN((x-a)/(x**3-a**3),1/(x*x+a*x+a*a))}});
});
N8('m8-6-two',6,'TH',r=>{
  /* phân thức hai biến: (x² − y²)/(kx + ky) = (x − y)/k ; (x² − 2xy + y²)/(x − y) = x − y */
  const k=r.pick([2,3,4,5]),f=r.int(0,1),X=X8,Yv=Y8;
  if(f===0){const ok=fr(`${X} ${MINUS} ${Yv}`,k);
    return mkTxt(r,{stem:`Rút gọn phân thức ${fr(`${X}${sup(2)} ${MINUS} ${Yv}${sup(2)}`,`${k}${X} + ${k}${Yv}`)} (với ${X} + ${Yv} ≠ 0) ta được`,correct:ok,wrongs:[fr(`${X} + ${Yv}`,k),`${X} ${MINUS} ${Yv}`,fr(`${X} ${MINUS} ${Yv}`,`${k}${X}`),fr(`${Yv} ${MINUS} ${X}`,k)],
      sol:`${X}${sup(2)} ${MINUS} ${Yv}${sup(2)} = (${X} ${MINUS} ${Yv})(${X} + ${Yv}); ${k}${X} + ${k}${Yv} = ${k}(${X} + ${Yv}). Rút gọn được ${ok}.`,chk:()=>true});}
  return mkTxt(r,{stem:`Rút gọn phân thức ${fr(`${X}${sup(2)} ${MINUS} 2${X}${Yv} + ${Yv}${sup(2)}`,`${k}${X} ${MINUS} ${k}${Yv}`)} (với ${X} ≠ ${Yv}) ta được`,correct:fr(`${X} ${MINUS} ${Yv}`,k),wrongs:[fr(`${X} + ${Yv}`,k),`${X} ${MINUS} ${Yv}`,fr(k,`${X} ${MINUS} ${Yv}`),fr(`${Yv} ${MINUS} ${X}`,k)],
    sol:`${X}${sup(2)} ${MINUS} 2${X}${Yv} + ${Yv}${sup(2)} = (${X} ${MINUS} ${Yv})${sup(2)}; ${k}${X} ${MINUS} ${k}${Yv} = ${k}(${X} ${MINUS} ${Yv}). Rút gọn được ${fr(`${X} ${MINUS} ${Yv}`,k)}.`,chk:()=>true});
});

/* ---------- Xác suất thực nghiệm (Bài 32) ---------- */
const EXPCTX=[
  {act:'Tung một đồng xu',ev:'mặt ngửa',other:'mặt sấp'},
  {act:'Gieo một con xúc xắc',ev:'mặt 6 chấm',other:'mặt không phải 6 chấm'},
  {act:'Bạn An ném bóng vào rổ',ev:'ném trúng rổ',other:'ném trượt'},
  {act:'Lấy ngẫu nhiên một viên bi từ hộp, xem màu rồi trả lại hộp',ev:'lấy được bi đỏ',other:'lấy được bi không phải màu đỏ'}];
N8('m8-8-exp1',8,'NB',r=>{
  const c=r.pick(EXPCTX),n=r.pick([20,25,40,50,60,80,100,120,200]),k=r.int(Math.ceil(n*.15),Math.floor(n*.8)),inv=r.chance(.4);
  const kk=inv?n-k:k,ask=inv?c.other:c.ev;
  return mkTxt(r,{stem:`${c.act} ${n} lần, thấy có ${k} lần “${c.ev}”. Xác suất thực nghiệm của biến cố “${ask}” là`,correct:qh(Q(kk,n)),wrongs:[qh(Q(inv?k:n-k,n)),qh(Q(kk,n+kk)),qh(Q(n,kk===0?1:n+kk)),qh(Q(1,2))].concat([qh(Q(kk+1,n))]),
    sol:`Xác suất thực nghiệm = ${fr('số lần biến cố xảy ra','số lần thực hiện')}. Biến cố “${ask}” xảy ra ${inv?`${n} ${MINUS} ${k} = `:''}${kk} lần nên xác suất thực nghiệm là ${fr(kk,n)}${Q(kk,n)[1]===n?'':` = ${qh(Q(kk,n))}`}.`,chk:()=>kk>0&&kk<n});
});
N8('m8-8-exp2',8,'TH',r=>{
  const n=r.pick([30,40,50,60]);let cnt;
  for(let i=0;i<200;i++){cnt=[...Array(6)].map(()=>r.int(2,Math.floor(n/4)));const s=cnt.reduce((a,b)=>a+b,0);if(s<n){cnt[r.int(0,5)]+=n-s;if(Math.max(...cnt)<n/2)break}}
  const evs=[['số chấm là số chẵn',[2,4,6]],['số chấm là số lẻ',[1,3,5]],['số chấm lớn hơn 4',[5,6]],['số chấm nhỏ hơn 3',[1,2]],['số chấm là số nguyên tố',[2,3,5]]];
  const [d,set]=r.pick(evs),k=set.reduce((s,v)=>s+cnt[v-1],0);
  const tbl=`<table class="dt"><tr><td>Mặt</td>${[1,2,3,4,5,6].map(i=>`<td>${i} chấm</td>`).join('')}</tr><tr><td>Số lần</td>${cnt.map(v=>`<td>${v}</td>`).join('')}</tr></table>`;
  return mkTxt(r,{stem:`Gieo một con xúc xắc ${n} lần, kết quả được ghi lại trong bảng sau:${tbl}Xác suất thực nghiệm của biến cố “${d}” là`,correct:qh(Q(k,n)),wrongs:[qh(Q(n-k,n)),qh(Q(set.length,6)),qh(Q(k+1,n)),qh(Q(k,n-k)),qh(Q(k-1,n)),qh(Q(k,n+1))],
    sol:`Số lần xuất hiện các mặt thỏa mãn “${d}” là ${set.map(v=>cnt[v-1]).join(' + ')} = ${k}. Xác suất thực nghiệm là ${fr(k,n)}${Q(k,n)[1]===n?'':` = ${qh(Q(k,n))}`}.`,chk:()=>cnt.reduce((a,b)=>a+b,0)===n&&k>0&&k<n});
});
N8('m8-8-est',8,'TH',r=>{
  const N=r.pick([10,20,30,40,50]),n=r.pick([50,80,100,200]);let k,B;
  for(let i=0;i<200;i++){B=r.int(1,N-1);k=n*B/N;if(Number.isInteger(k))break}
  if(!Number.isInteger(k))return T.nlc['m8-8-est'].gen(r);
  return mkNum(r,{stem:`Một hộp có ${N} viên bi gồm bi trắng và bi đen, cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi, xem màu rồi trả lại hộp. Lặp lại ${n} lần, thấy có ${k} lần lấy được bi đen. Số viên bi đen trong hộp ước lượng khoảng`,correct:B,cands:[N-B,k,B+1,B-1,Math.round(N*k/(n+k))].filter(v=>v>0),f:z=>`${z} viên`,
    sol:`Xác suất thực nghiệm của biến cố “lấy được bi đen” là ${fr(k,n)}${Q(k,n)[1]===n?'':` = ${qh(Q(k,n))}`}. Ước lượng: số bi đen ≈ ${N}·${qh(Q(k,n))} = ${B} viên.`,chk:()=>B*n===k*N});
});
N8('m8-8-forecast',8,'TH',r=>{
  const f=r.int(0,1);
  if(f===0){const n=r.pick([100,200,250,500]),k=r.int(2,Math.floor(n/10)),M=r.pick([1000,2000,5000,10000]),ans=M*k/n;if(!Number.isInteger(ans))return T.nlc['m8-8-forecast'].gen(r);
    return mkNum(r,{stem:`Kiểm tra ngẫu nhiên ${n} sản phẩm của một nhà máy thấy có ${k} sản phẩm bị lỗi. Trong một lô ${M} sản phẩm của nhà máy, số sản phẩm bị lỗi dự đoán khoảng`,correct:ans,cands:[k,M-ans,ans*2,Math.round(ans/2),ans+k],f:z=>`${z} sản phẩm`,
      sol:`Xác suất thực nghiệm của biến cố “sản phẩm bị lỗi” là ${fr(k,n)}. Số sản phẩm lỗi trong ${M} sản phẩm dự đoán khoảng ${M}·${fr(k,n)} = ${ans}.`,chk:()=>true})}
  const n=r.pick([20,30,40,50]),k=r.int(Math.ceil(n*.3),Math.floor(n*.8)),M=r.pick([10,20,30,40,50,60,100]),ans=M*k/n;if(!Number.isInteger(ans))return T.nlc['m8-8-forecast'].gen(r);
  return mkNum(r,{stem:`Trong ${n} ngày tháng trước, có ${k} ngày bạn Lan đi học đúng giờ. Dựa vào xác suất thực nghiệm, trong ${M} ngày tới, số ngày bạn Lan đi học đúng giờ dự đoán khoảng`,correct:ans,cands:[k,M-ans,ans+1,ans-1,Math.round(M*k/(n+M))],f:z=>`${z} ngày`,
    sol:`Xác suất thực nghiệm của biến cố “đi học đúng giờ” là ${fr(k,n)}. Số ngày dự đoán khoảng ${M}·${fr(k,n)} = ${ans}.`,chk:()=>true});
});
DS8('ds8-8-exp',8,'TH',r=>{
  const n=r.pick([40,50,60,100]);let cnt;
  for(let i=0;i<200;i++){cnt=[...Array(6)].map(()=>r.int(3,Math.floor(n/4)));const s=cnt.reduce((a,b)=>a+b,0);if(s<n){cnt[r.int(0,5)]+=n-s;if(Math.max(...cnt)<n/2)break}}
  const ev=cnt[1]+cnt[3]+cnt[5],six=cnt[5],odd=n-ev;
  const tbl=`<table class="dt"><tr><td>Mặt</td>${[1,2,3,4,5,6].map(i=>`<td>${i} chấm</td>`).join('')}</tr><tr><td>Số lần</td>${cnt.map(v=>`<td>${v}</td>`).join('')}</tr></table>`;
  const items=[
    {t:`Số lần gieo được mặt có số chấm chẵn là ${ev}.`,f:`Số lần gieo được mặt có số chấm chẵn là ${ev+r.pick([1,2,3])}.`,why:`${cnt[1]} + ${cnt[3]} + ${cnt[5]} = ${ev}.`},
    {t:`Xác suất thực nghiệm của biến cố “gieo được mặt 6 chấm” là ${qh(Q(six,n))}.`,f:`Xác suất thực nghiệm của biến cố “gieo được mặt 6 chấm” là ${fr(1,6)}.`,why:`Mặt 6 chấm xuất hiện ${six} lần trên ${n} lần gieo: ${fr(six,n)}${Q(six,n)[1]===n?'':` = ${qh(Q(six,n))}`}. Còn ${fr(1,6)} là xác suất lí thuyết.`},
    {t:`Xác suất thực nghiệm của biến cố “gieo được mặt có số chấm lẻ” là ${qh(Q(odd,n))}.`,f:`Xác suất thực nghiệm của biến cố “gieo được mặt có số chấm lẻ” là ${qh(Q(ev,n))}.`,why:`Số lần ra mặt lẻ là ${n} ${MINUS} ${ev} = ${odd}.`},
    {t:`Khi số lần gieo càng lớn, xác suất thực nghiệm của biến cố “gieo được mặt 6 chấm” càng gần ${fr(1,6)}.`,f:`Xác suất thực nghiệm của một biến cố luôn bằng xác suất lí thuyết của biến cố đó.`,why:`Theo SGK, khi số lần thử càng lớn, xác suất thực nghiệm càng gần xác suất (lí thuyết); nhưng hai giá trị này nói chung không bằng nhau.`}];
  if(Q(six,n)[0]*6===Q(six,n)[1]||Q(odd,n)[0]===Q(ev,n)[0]&&Q(odd,n)[1]===Q(ev,n)[1])return T.ds['ds8-8-exp'].gen(r);
  return mkDS(r,{stem:`Bạn Phúc gieo một con xúc xắc ${n} lần và ghi lại kết quả:${tbl}Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>cnt.reduce((a,b)=>a+b,0)===n});
});
TLN8('t8-8-exp',8,'TH',r=>{
  const c=r.pick(EXPCTX),n=r.pick([20,25,40,50,100,200]),k=r.int(Math.ceil(n*.15),Math.floor(n*.8)),p=k/n;
  if(!isDec8(p,2))return T.tln['t8-8-exp'].gen(r);
  return{kind:'tln',stem:`${c.act} ${n} lần, thấy có ${k} lần “${c.ev}”. Tính xác suất thực nghiệm của biến cố “${c.ev}” (viết dưới dạng số thập phân).`,ans:p,unit:'',
    sol:`Xác suất thực nghiệm = ${fr(k,n)} = ${fmt(p)}.`,chk:()=>true};
});
TLN8('t8-8-est',8,'VD',r=>{
  const N=r.pick([10,20,25,40,50]),n=r.pick([50,80,100,200]);let k,W;
  for(let i=0;i<200;i++){W=r.int(1,N-1);k=n*(N-W)/N;if(Number.isInteger(k))break}
  if(!Number.isInteger(k))return T.tln['t8-8-est'].gen(r);
  return{kind:'tln',stem:`Một hộp có ${N} viên bi gồm bi trắng và bi đen. Mai lấy ngẫu nhiên một viên bi, xem màu rồi trả lại hộp; lặp lại ${n} lần thì có ${k} lần lấy được bi đen. Hãy ước lượng số viên bi trắng trong hộp.`,ans:W,unit:'',
    sol:`Xác suất thực nghiệm của biến cố “lấy được bi đen” là ${fr(k,n)}, nên số bi đen ước lượng khoảng ${N}·${fr(k,n)} = ${N-W}. Số bi trắng khoảng ${N} ${MINUS} ${N-W} = ${W} viên.`,chk:()=>(N-W)*n===k*N};
});
TL8('tl8-8-exp',8,'VD','real',r=>{
  const n=r.pick([40,50,60,80,100]);let cnt;
  for(let i=0;i<200;i++){cnt=[...Array(6)].map(()=>r.int(3,Math.floor(n/4)));const s=cnt.reduce((a,b)=>a+b,0);if(s<n){cnt[r.int(0,5)]+=n-s;if(Math.max(...cnt)<n/2)break}}
  const ev=cnt[1]+cnt[3]+cnt[5],odd=n-ev,M=r.pick([300,500,600,1000]),six=cnt[5],pred=Math.round(M*six/n);
  const tbl=`<table class="dt"><tr><td>Mặt</td>${[1,2,3,4,5,6].map(i=>`<td>${i} chấm</td>`).join('')}</tr><tr><td>Số lần</td>${cnt.map(v=>`<td>${v}</td>`).join('')}</tr></table>`;
  return{kind:'tl',title:'Xác suất thực nghiệm',parts:[
    {pts:.5,html:`Bạn Phúc gieo một con xúc xắc ${n} lần và ghi lại kết quả:${tbl}Tính số lần gieo được mặt có số chấm chẵn và xác suất thực nghiệm của biến cố “gieo được mặt có số chấm lẻ”.`},
    {pts:.5,html:`Dựa vào xác suất thực nghiệm của biến cố “gieo được mặt 6 chấm”, hãy dự đoán trong ${M} lần gieo tiếp theo có khoảng bao nhiêu lần gieo được mặt 6 chấm (làm tròn đến hàng đơn vị).`}],
    sol:[ptxt([[`Số lần ra mặt chẵn: ${cnt[1]} + ${cnt[3]} + ${cnt[5]} = ${ev}.`,.25],[`Số lần ra mặt lẻ: ${n} ${MINUS} ${ev} = ${odd}; xác suất thực nghiệm là ${fr(odd,n)}${Q(odd,n)[1]===n?'':` = ${qh(Q(odd,n))}`}.`,.25]]),
      ptxt([[`Xác suất thực nghiệm của biến cố “gieo được mặt 6 chấm” là ${fr(six,n)}${Q(six,n)[1]===n?'':` = ${qh(Q(six,n))}`}.`,.25],[`Trong ${M} lần gieo, dự đoán khoảng ${M}·${fr(six,n)} ≈ ${pred} lần.`,.25]])],
    chk:()=>cnt.reduce((a,b)=>a+b,0)===n};
});

/* ---------- Tam giác vuông đồng dạng (Bài 36), hình đồng dạng (Bài 37) ---------- */
N8('m8-9-rcase',9,'NB',r=>{
  const ok=r.chance(.5);
  const good=['Một góc nhọn của tam giác vuông này bằng một góc nhọn của tam giác vuông kia','Hai cạnh góc vuông của tam giác vuông này tỉ lệ với hai cạnh góc vuông của tam giác vuông kia','Cạnh huyền và một cạnh góc vuông của tam giác vuông này tỉ lệ với cạnh huyền và một cạnh góc vuông của tam giác vuông kia'];
  const bad=['Một cạnh góc vuông của tam giác vuông này bằng một cạnh góc vuông của tam giác vuông kia','Cạnh huyền của tam giác vuông này bằng cạnh huyền của tam giác vuông kia','Một cạnh góc vuông của tam giác vuông này gấp đôi một cạnh góc vuông của tam giác vuông kia'];
  if(ok)return mkTxt(r,{stem:`Điều kiện nào sau đây <b>đủ</b> để kết luận hai tam giác vuông đồng dạng?`,correct:r.pick(good),wrongs:r.shuffle(bad),
    sol:`Hai tam giác vuông đồng dạng nếu có một góc nhọn bằng nhau, hoặc hai cạnh góc vuông tỉ lệ, hoặc cạnh huyền và một cạnh góc vuông tỉ lệ. Chỉ biết một cặp cạnh bằng nhau thì chưa đủ.`,chk:()=>true});
  return mkTxt(r,{stem:`Điều kiện nào sau đây <b>không đủ</b> để kết luận hai tam giác vuông đồng dạng?`,correct:r.pick(bad),wrongs:r.shuffle(good),
    sol:`Ba trường hợp đồng dạng của hai tam giác vuông: một góc nhọn bằng nhau; hai cạnh góc vuông tỉ lệ; cạnh huyền và một cạnh góc vuông tỉ lệ. Chỉ biết một cặp cạnh bằng nhau thì không đủ.`,chk:()=>true});
});
N8('m8-9-rcase2',9,'TH',r=>{
  const [a,b,c]=pyt(r),k=r.pick([2,3]),half=r.chance(.5);
  /* ΔABC vuông tại A: AB=a, BC=c. ΔDEF vuông tại D: DE=ka, EF=kc ⟹ đồng dạng (cạnh huyền – cạnh góc vuông). Tính DF */
  return mkNum(r,{stem:`Cho ${TRI8('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${a} cm, ${I('BC')} = ${c} cm và ${TRI8('DEF')} vuông tại ${I('D')} có ${I('DE')} = ${k*a} cm, ${I('EF')} = ${k*c} cm. Độ dài ${I('DF')} là`,correct:k*b,cands:[b,k*b+1,k*c-k*a,k*a,b+k],f:z=>`${z} cm`,
    sol:`${fr('DE','AB')} = ${fr('EF','BC')} = ${k} nên ${TRI8('DEF')} ${SIM} ${TRI8('ABC')} (cạnh huyền – cạnh góc vuông). Suy ra ${I('DF')} = ${k}·${I('AC')}, với ${I('AC')} = ${rt(`${c}${sup(2)} ${MINUS} ${a}${sup(2)}`)} = ${b} cm. Vậy ${I('DF')} = ${k*b} cm.`,chk:()=>a*a+b*b===c*c});
});
N8('m8-9-simfig',9,'NB',r=>{
  const ok=r.pick(['Hai hình vuông bất kì','Hai hình tròn bất kì','Hai tam giác đều bất kì']),bad=['Hai hình chữ nhật bất kì','Hai hình thoi bất kì','Hai tam giác cân bất kì','Hai tam giác vuông bất kì'];
  return mkTxt(r,{stem:`Cặp hình nào sau đây <b>luôn</b> đồng dạng với nhau?`,correct:ok,wrongs:r.shuffle(bad),
    sol:`${ok} luôn đồng dạng (cùng hình dạng, chỉ khác kích thước). Hai hình chữ nhật, hai hình thoi, hai tam giác cân hay hai tam giác vuông bất kì chưa chắc đồng dạng vì tỉ lệ các cạnh hoặc số đo góc có thể khác nhau.`,chk:()=>true});
});
N8('m8-9-homo',9,'TH',r=>{
  const k=r.pick([2,3,Q(1,2),Q(1,3),Q(3,2)]),kq=Array.isArray(k)?k:Q(k),a=r.int(2,9)*(kq[1]),ask=r.chance(.5);
  const val=a*kq[0]/kq[1];
  return mkNum(r,{stem:ask?`Hình ${I('H')}′ đồng dạng phối cảnh với hình ${I('H')} với tâm ${I('O')}, tỉ số ${qh(kq)}. Điểm ${I('A')} của hình ${I('H')} ứng với điểm ${I('A')}′ của hình ${I('H')}′. Biết ${I('OA')} = ${a} cm, độ dài ${I('OA')}′ là`
      :`Hình ${I('H')}′ đồng dạng phối cảnh với hình ${I('H')} với tâm ${I('O')}, tỉ số ${qh(kq)}. Đoạn thẳng ${I('AB')} của hình ${I('H')} ứng với đoạn thẳng ${I('A')}′${I('B')}′ của hình ${I('H')}′. Biết ${I('AB')} = ${a} cm, độ dài ${I('A')}′${I('B')}′ là`,
    correct:val,cands:[a*kq[1]/kq[0],a+val,val+1,a,val*2].map(v=>Math.round(v*100)/100),f:z=>`${fmt(z)} cm`,
    sol:`Với hai hình đồng dạng phối cảnh tâm ${I('O')}, tỉ số ${I('k')}: ${ask?`${fr(`${I('OA')}′`,'OA')} = ${I('k')}`:`${I('A')}′${I('B')}′ = ${I('k')}·${I('AB')}`}. Vậy độ dài cần tìm là ${qh(kq)}·${a} = ${fmt(val)} cm.`,chk:()=>Number.isInteger(val)});
});

/* ---------- Pythagore với kết quả làm tròn (Bài 35) ---------- */
N8('m8-9-pythr',9,'TH',r=>{
  let a,b,c2;for(let i=0;i<200;i++){a=r.int(2,12);b=r.int(2,12);c2=a*a+b*b;if(!Number.isInteger(Math.sqrt(c2)))break}
  const v=rd1(Math.sqrt(c2)),hyp=r.chance(.5);
  if(hyp)return mkNum(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} có ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm. Độ dài cạnh ${I('BC')} (làm tròn đến hàng phần mười) là`,correct:v,cands:[a+b,rd1(v+1),rd1(v-.5),rd1(Math.sqrt(Math.abs(a*a-b*b))||1),rd1(v+.3)].filter(x=>x>0),f:z=>`${fmt(z)} cm`,
    sol:`${I('BC')}${sup(2)} = ${a}${sup(2)} + ${b}${sup(2)} = ${c2}, nên ${I('BC')} = ${rt(c2)} ≈ ${fmt(v)} cm.`,chk:()=>true});
  const big=Math.max(a,b)+r.int(2,6),small=Math.min(a,b),d2=big*big-small*small,w=rd1(Math.sqrt(d2));
  if(Number.isInteger(Math.sqrt(d2)))return T.nlc['m8-9-pythr'].gen(r);
  return mkNum(r,{stem:`Một chiếc thang dài ${big} m dựa vào tường thẳng đứng, chân thang cách chân tường ${small} m. Đầu trên của thang cách mặt đất bao nhiêu mét (làm tròn đến hàng phần mười)?`,correct:w,cands:[big-small,rd1(Math.sqrt(big*big+small*small)),rd1(w+1),rd1(w-.4),rd1(w+.2)],f:z=>`${fmt(z)} m`,
    sol:`Chiều cao = ${rt(`${big}${sup(2)} ${MINUS} ${small}${sup(2)}`)} = ${rt(d2)} ≈ ${fmt(w)} m.`,chk:()=>true});
});
TLN8('t8-9-pythr',9,'VD',r=>{
  let w,h,d2;for(let i=0;i<200;i++){w=r.int(5,20);h=r.int(5,20);d2=w*w+h*h;if(!Number.isInteger(Math.sqrt(d2))&&w!==h)break}
  const v=rd1(Math.sqrt(d2));
  return{kind:'tln',stem:`Màn hình một chiếc ti vi hình chữ nhật có chiều rộng ${Math.min(w,h)} dm và chiều dài ${Math.max(w,h)} dm. Tính độ dài đường chéo của màn hình (đơn vị dm, làm tròn đến hàng phần mười).`,ans:v,unit:'',
    sol:`Đường chéo = ${rt(`${w}${sup(2)} + ${h}${sup(2)}`)} = ${rt(d2)} ≈ ${fmt(v)} dm.`,chk:()=>true};
});

/* ---------- Hình chóp: tính từ cạnh bên, khối ghép (Bài 38, 39) ---------- */
/* (a/2; d; l): nửa cạnh đáy, trung đoạn, cạnh bên */
const PYRL=[[3,4,5],[4,3,5],[5,12,13],[6,8,10],[8,6,10],[8,15,17],[9,12,15],[12,5,13],[12,16,20]];
N8('m8-10-lat',10,'TH',r=>{
  const [m,d,l]=r.pick(PYRL),a=2*m,S=2*a*d,ask=r.chance(.5);
  if(ask)return mkNum(r,{stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và cạnh bên ${l} cm. Độ dài trung đoạn của hình chóp là`,correct:d,cands:[l-m,Math.round(Math.sqrt(l*l+m*m)),d+1,d-1,l],f:z=>`${z} cm`,
    sol:`Trung đoạn là đường cao của mặt bên (tam giác cân cạnh bên ${l} cm, cạnh đáy ${a} cm), nên trung đoạn = ${rt(`${l}${sup(2)} ${MINUS} ${m}${sup(2)}`)} = ${rt(d*d)} = ${d} cm.`,chk:()=>m*m+d*d===l*l});
  return mkNum(r,{stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và cạnh bên ${l} cm. Diện tích xung quanh của hình chóp là`,correct:S,cands:[2*a*l,a*d,4*a*l,S+a*a,a*l],f:z=>`${z} cm²`,
    sol:`Trung đoạn = ${rt(`${l}${sup(2)} ${MINUS} ${m}${sup(2)}`)} = ${d} cm. ${I('S')}${sub('xq')} = ${I('p')}·${I('d')} = ${2*a}·${d} = ${S} cm².`,chk:()=>m*m+d*d===l*l});
});
TL8('tl8-10-combo',10,'VD','real',r=>{
  const {a,h,d}=pyr4(r),H=r.int(Math.ceil(a/2),a),Vbox=a*a*H,Vp=a*a*h/3,price=r.pick([20,25,30,50]);
  return{kind:'tl',title:'Khối ghép: hình hộp chữ nhật và hình chóp tứ giác đều',parts:[
    {pts:.5,html:`Một khối trang trí gồm hai phần: phần dưới là hình hộp chữ nhật có đáy là hình vuông cạnh ${a} cm, chiều cao ${H} cm; phần trên là hình chóp tứ giác đều có đáy trùng với mặt trên của hình hộp, chiều cao ${h} cm. Tính thể tích của khối trang trí.`},
    {pts:.5,html:`Người ta sơn bốn mặt bên của phần hình chóp với chi phí ${price} đồng/cm². Tính chi phí sơn.`}],
    sol:[ptxt([[`Thể tích phần hộp: ${a}·${a}·${H} = ${Vbox} cm³; thể tích phần chóp: ${fr(1,3)}·${a}${sup(2)}·${h} = ${Vp} cm³.`,.25],[`Thể tích khối trang trí: ${Vbox} + ${Vp} = ${Vbox+Vp} cm³.`,.25]]),
      ptxt([[`Trung đoạn của hình chóp: ${rt(`${h}${sup(2)} + ${a/2}${sup(2)}`)} = ${d} cm; diện tích xung quanh: ${2*a}·${d} = ${2*a*d} cm².`,.25],[`Chi phí sơn: ${2*a*d}·${price} = ${fmt(2*a*d*price)} đồng.`,.25]])],
    chk:()=>h*h+(a/2)**2===d*d&&Number.isInteger(Vp)};
});
