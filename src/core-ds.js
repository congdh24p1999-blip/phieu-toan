/* ================================================================
   MỞ RỘNG NGÂN HÀNG CÂU ĐÚNG/SAI (phần II)
   Mỗi câu có 4 ý; mỗi ý có bản đúng và bản sai, bản sai luôn khác bản đúng về giá trị.
   ================================================================ */
const dsBump=(r,v,lo)=>{let w;do{w=v+r.nz(-3,3)}while(w===v||(lo!==undefined&&w<lo));return w};
const dsOff=(r,v,u=1)=>{let w=Math.round((v+u*r.pick([-3,-2,-1,1,2,3]))*100)/100;if(w===v)w=Math.round((v+4*u)*100)/100;return w};
const qpw=(q,n)=>{let p=Q(1);for(let i=0;i<n;i++)p=qmul(p,q);return p};
const bsq=q=>`(${qh(q)})`;
/* Ngân hàng cặp mệnh đề (đúng, sai, giải thích): lấy ngẫu nhiên n cặp, bù thêm các ý có số liệu */
function bankDS(r,bank,stem,n,extra){
  const sel=r.shuffle(bank).slice(0,n);
  return mkDS(r,{stem,items:sel.map(([t,f,why])=>({t,f,why})).concat(extra||[]),chk:()=>sel.every(x=>x[0]!==x[1]&&x[2])});
}

/* ======================= LỚP 8 ======================= */
/* Chương I: Đa thức nhiều biến */
DS('ds-poly-deg',1,'NB',r=>{
  const ds=r.shuffle([1,2,3,4]).slice(0,3).sort((a,b)=>a-b);
  const ms=ds.map(d=>{const ex=r.int(0,d);return{c:r.nz(-7,7),ex,ey:d-ex}});
  const top=ms[2],deg=top.ex+top.ey,pk=r.pick(ms),xv=r.nz(-2,2),yv=r.nz(-2,2);
  const val=ms.reduce((s,m)=>s+m.c*Math.pow(xv,m.ex)*Math.pow(yv,m.ey),0),T1=termsHTML([top]);
  const other=termsHTML([r.pick(ms.slice(0,2))]);
  return mkDS(r,{stem:`Cho đa thức ${I('P')} = ${termsHTML(ms.slice().reverse())}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Đa thức ${I('P')} có bậc ${deg}.`,f:`Đa thức ${I('P')} có bậc ${dsBump(r,deg,1)}.`,why:`Bậc của đa thức là bậc lớn nhất của các hạng tử: ${ms.map(m=>m.ex+m.ey).join('; ')} nên bậc của P là ${deg}.`},
    {t:`Hạng tử bậc ${pk.ex+pk.ey} của ${I('P')} có hệ số ${sg(pk.c)}.`,f:`Hạng tử bậc ${pk.ex+pk.ey} của ${I('P')} có hệ số ${sg(-pk.c)}.`,why:`Hạng tử bậc ${pk.ex+pk.ey} là ${termsHTML([pk])}, hệ số là ${sg(pk.c)}.`},
    {t:`Hạng tử có bậc cao nhất của ${I('P')} là ${T1}.`,f:`Hạng tử có bậc cao nhất của ${I('P')} là ${other}.`,why:`Hạng tử bậc ${deg} là ${T1}.`},
    {t:`Với ${I('x')} = ${sg(xv)}, ${I('y')} = ${sg(yv)} thì ${I('P')} = ${sg(val)}.`,f:`Với ${I('x')} = ${sg(xv)}, ${I('y')} = ${sg(yv)} thì ${I('P')} = ${sg(dsBump(r,val))}.`,why:`Thay x = ${sg(xv)}, y = ${sg(yv)} vào P được ${sg(val)}.`}
  ],chk:()=>new Set(ms.map(m=>m.ex+m.ey)).size===3&&deg===Math.max(...ms.map(m=>m.ex+m.ey))&&ms.every(m=>m.c!==0)});
});
DS('ds-poly-op',1,'TH',r=>{
  const co=()=>r.nz(-4,4),mk=()=>Pl.from([{c:co(),ex:2,ey:0},{c:co(),ex:1,ey:1},{c:co(),ex:0,ey:2}]);
  let A,B;do{A=mk();B=mk()}while(Pl.isZero(Pl.add(A,B))||Pl.isZero(Pl.sub(A,B))||Pl.eq(A,B));
  const S=Pl.add(A,B),D=Pl.sub(A,B),X=Pl.mul(Pl.m(1,1,0),A),u=r.nz(-2,2),v=r.nz(-2,2),val=Pl.ev(S,u,v);
  const wr=(p,list)=>{const [ex,ey]=r.pick(list);return Pl.add(p,Pl.m(r.pick([-2,-1,1,2]),ex,ey))};
  const L2=[[2,0],[1,1],[0,2]],L3=[[3,0],[2,1],[1,2]];
  return mkDS(r,{stem:`Cho hai đa thức ${I('A')} = ${ph(A)} và ${I('B')} = ${ph(B)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('A')} + ${I('B')} = ${ph(S)}.`,f:`${I('A')} + ${I('B')} = ${ph(wr(S,L2))}.`,why:`Cộng các hạng tử đồng dạng: A + B = ${ph(S)}.`},
    {t:`${I('A')} ${MINUS} ${I('B')} = ${ph(D)}.`,f:`${I('A')} ${MINUS} ${I('B')} = ${ph(wr(D,L2))}.`,why:`Đổi dấu các hạng tử của B rồi cộng: A − B = ${ph(D)}.`},
    {t:`${I('x')}·${I('A')} = ${ph(X)}.`,f:`${I('x')}·${I('A')} = ${ph(wr(X,L3))}.`,why:`Nhân x với từng hạng tử của A: ${ph(X)}.`},
    {t:`Với ${I('x')} = ${sg(u)}, ${I('y')} = ${sg(v)} thì ${I('A')} + ${I('B')} = ${sg(val)}.`,f:`Với ${I('x')} = ${sg(u)}, ${I('y')} = ${sg(v)} thì ${I('A')} + ${I('B')} = ${sg(dsBump(r,val))}.`,why:`Thay x = ${sg(u)}, y = ${sg(v)} vào A + B = ${ph(S)} được ${sg(val)}.`}
  ],chk:()=>Pl.ev(S,2,3)===Pl.ev(A,2,3)+Pl.ev(B,2,3)&&Pl.ev(D,2,3)===Pl.ev(A,2,3)-Pl.ev(B,2,3)&&Pl.ev(X,2,3)===2*Pl.ev(A,2,3)});
});
/* Chương II: Hằng đẳng thức đáng nhớ */
DS('ds-cube',2,'TH',r=>{
  const a=r.int(1,5),L1=Pl.pow(lin(1,a),3),L2=Pl.pow(lin(1,-a),3);
  const sumF=Pl.from([{c:1,ex:2},{c:-a,ex:1},{c:a*a,ex:0}]),difF=Pl.from([{c:1,ex:2},{c:a,ex:1},{c:a*a,ex:0}]);
  const c3=Pl.from([{c:1,ex:3},{c:a*a*a,ex:0}]),d3=Pl.from([{c:1,ex:3},{c:-a*a*a,ex:0}]);
  return mkDS(r,{stem:`Cho ${I('a')} = ${a}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${par(lin(1,a))}${sup(3)} = ${ph(L1)}.`,f:`${par(lin(1,a))}${sup(3)} = ${ph(Pl.add(L1,Pl.m(r.pick([-a,a]),2,0)))}.`,why:`(A + B)³ = A³ + 3A²B + 3AB² + B³ nên (x + ${a})³ = ${ph(L1)}.`},
    {t:`${par(lin(1,-a))}${sup(3)} = ${ph(L2)}.`,f:`${par(lin(1,-a))}${sup(3)} = ${ph(Pl.add(L2,Pl.m(r.pick([-2,2]),1,0)))}.`,why:`(A − B)³ = A³ − 3A²B + 3AB² − B³ nên (x − ${a})³ = ${ph(L2)}.`},
    {t:`${ph(c3)} = ${par(lin(1,a))}${par(sumF)}.`,f:`${ph(c3)} = ${par(lin(1,a))}${par(difF)}.`,why:`A³ + B³ = (A + B)(A² − AB + B²) nên x³ + ${a*a*a} = (x + ${a})(${ph(sumF)}).`},
    {t:`${ph(d3)} = ${par(lin(1,-a))}${par(difF)}.`,f:`${ph(d3)} = ${par(lin(1,-a))}${par(sumF)}.`,why:`A³ − B³ = (A − B)(A² + AB + B²) nên x³ − ${a*a*a} = (x − ${a})(${ph(difF)}).`}
  ],chk:()=>Pl.eq(Pl.mul(lin(1,a),sumF),c3)&&Pl.eq(Pl.mul(lin(1,-a),difF),d3)&&Pl.ev(L1,2,0)===(2+a)**3&&Pl.ev(L2,2,0)===(2-a)**3});
});
DS('ds-factor',2,'TH',r=>{
  const a=r.int(2,9),b=r.int(1,6),k=r.int(2,5),c=r.int(1,6),t=r.nz(-4,5);
  const sq=Pl.pow(lin(1,b),2),e1=Pl.from([{c:1,ex:2},{c:-a*a,ex:0}]),e3=Pl.from([{c:k,ex:2},{c:-k*c,ex:1}]);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${ph(e1)} = ${par(lin(1,-a))}${par(lin(1,a))}.`,f:`${ph(e1)} = ${par(lin(1,-a))}${sup(2)}.`,why:`Hiệu hai bình phương: x² − ${a*a} = (x − ${a})(x + ${a}).`},
    {t:`${ph(sq)} = ${par(lin(1,b))}${sup(2)}.`,f:`${ph(sq)} = ${par(lin(1,-b))}${sup(2)}.`,why:`Bình phương của một tổng: x² + ${2*b}x + ${b*b} = (x + ${b})².`},
    {t:`${ph(e3)} = ${k}${I('x')}${par(lin(1,-c))}.`,f:`${ph(e3)} = ${k}${I('x')}${par(lin(1,c))}.`,why:`Đặt nhân tử chung ${k}x: ${k}x² − ${k*c}x = ${k}x(x − ${c}).`},
    {t:`Giá trị của ${ph(sq)} tại ${I('x')} = ${sg(t)} bằng ${(t+b)**2}.`,f:`Giá trị của ${ph(sq)} tại ${I('x')} = ${sg(t)} bằng ${(t-b)**2}.`,why:`x² + ${2*b}x + ${b*b} = (x + ${b})² = (${sg(t)} + ${b})² = ${(t+b)**2}.`}
  ],chk:()=>Pl.eq(e1,Pl.mul(lin(1,-a),lin(1,a)))&&Pl.eq(sq,Pl.mul(lin(1,b),lin(1,b)))&&Pl.eq(e3,Pl.mul(Pl.m(k,1,0),lin(1,-c)))&&(t+b)**2!==(t-b)**2});
});
/* Chương III: Tứ giác */
DS('ds-quad-sum',3,'NB',r=>{
  const N=r.pick(['ABCD','MNPQ','EFGH']);let a,b,c,d;
  do{a=r.int(10,28)*5;b=r.int(10,28)*5;c=r.int(10,28)*5;d=360-a-b-c}while(d<40||d>150||d===90);
  return mkDS(r,{stem:`Cho tứ giác ${I(N)} có ∠${I(N[0])} = ${a}°, ∠${I(N[1])} = ${b}°, ∠${I(N[2])} = ${c}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`∠${I(N[3])} = ${d}°.`,f:`∠${I(N[3])} = ${dsBump(r,d)}°.`,why:`Tổng bốn góc của tứ giác bằng 360° nên ∠${N[3]} = 360° − ${a}° − ${b}° − ${c}° = ${d}°.`},
    {t:`∠${I(N[0])} + ∠${I(N[2])} = ${a+c}°.`,f:`∠${I(N[0])} + ∠${I(N[2])} = ${dsBump(r,a+c)}°.`,why:`${a}° + ${c}° = ${a+c}°.`},
    {t:`∠${I(N[3])} là góc ${d<90?'nhọn':'tù'}.`,f:`∠${I(N[3])} là góc ${d<90?'tù':'nhọn'}.`,why:`∠${N[3]} = ${d}° ${d<90?'< 90°':'> 90°'} nên là góc ${d<90?'nhọn':'tù'}.`},
    {t:`Góc ngoài tại đỉnh ${I(N[3])} bằng ${180-d}°.`,f:`Góc ngoài tại đỉnh ${I(N[3])} bằng ${d}°.`,why:`Góc ngoài tại ${N[3]} kề bù với ∠${N[3]} nên bằng 180° − ${d}° = ${180-d}°.`}
  ],chk:()=>a+b+c+d===360&&d!==90&&180-d!==d});
});
DS('ds-para',3,'NB',r=>{
  const N=r.pick(['ABCD','MNPQ']),a=r.int(4,12);let b;do{b=r.int(3,11)}while(b===a);
  const al=r.pick([50,55,60,65,70,110,115,120,125,130]),[A,B,C,D]=N.split('');
  return mkDS(r,{stem:`Cho hình bình hành ${I(N)} có ${I(A+B)} = ${a} cm, ${I(B+C)} = ${b} cm, ∠${I(A)} = ${al}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I(C+D)} = ${a} cm.`,f:`${I(C+D)} = ${b} cm.`,why:`Hình bình hành có các cạnh đối bằng nhau nên ${C+D} = ${A+B} = ${a} cm.`},
    {t:`Chu vi hình bình hành bằng ${2*(a+b)} cm.`,f:`Chu vi hình bình hành bằng ${a+b} cm.`,why:`Chu vi = 2(${a} + ${b}) = ${2*(a+b)} cm.`},
    {t:`∠${I(C)} = ${al}°.`,f:`∠${I(C)} = ${180-al}°.`,why:`Các góc đối của hình bình hành bằng nhau nên ∠${C} = ∠${A} = ${al}°.`},
    {t:`∠${I(B)} = ${180-al}°.`,f:`∠${I(B)} = ${al}°.`,why:`Hai góc kề một cạnh của hình bình hành bù nhau nên ∠${B} = 180° − ${al}° = ${180-al}°.`}
  ],chk:()=>al!==90&&a!==b});
});
/* Chương IV: Định lí Thalès */
DS('ds-midline',4,'NB',r=>{
  const [a,b,d]=tri(r,false).map(v=>2*v);
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${a} cm, ${I('AC')} = ${b} cm, ${I('BC')} = ${d} cm. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AB')} và ${I('AC')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('MN')} // ${I('BC')}.`,f:`${I('MN')} ⊥ ${I('BC')}.`,why:'MN là đường trung bình của tam giác ABC nên MN // BC.'},
    {t:`${I('MN')} = ${d/2} cm.`,f:`${I('MN')} = ${d} cm.`,why:`MN = BC/2 = ${d}/2 = ${d/2} cm.`},
    {t:`${I('AM')} = ${a/2} cm.`,f:`${I('AM')} = ${a} cm.`,why:`M là trung điểm của AB nên AM = ${a}/2 = ${a/2} cm.`},
    {t:`Chu vi tam giác ${I('AMN')} bằng ${(a+b+d)/2} cm.`,f:`Chu vi tam giác ${I('AMN')} bằng ${a+b+d} cm.`,why:`AM + AN + MN = (AB + AC + BC)/2 = ${(a+b+d)/2} cm.`}
  ],chk:()=>a%2===0&&b%2===0&&d%2===0&&a<b+d&&b<a+d&&d<a+b});
});
DS('ds-bisect',4,'TH',r=>{
  for(;;){
    const [c,b]=r.pick([[3,4],[4,5],[2,3],[3,5],[2,5],[4,3],[5,3],[3,2],[5,4],[5,2]]),k=r.int(2,3),m=r.int(1,k-1),AB=c*k,AC=b*k,BC=(b+c)*m;
    if(!(Math.abs(AB-AC)<BC&&BC<AB+AC))continue;
    const DB=c*m,DC=b*m;
    return mkDS(r,{stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm, ${I('BC')} = ${BC} cm. Tia phân giác của góc ${I('A')} cắt ${I('BC')} tại ${I('D')}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${fr(I('DB'),I('DC'))} = ${fr(I('AB'),I('AC'))}.`,f:`${fr(I('DB'),I('DC'))} = ${fr(I('AC'),I('AB'))}.`,why:'Theo tính chất đường phân giác của tam giác: DB/DC = AB/AC.'},
      {t:`${I('DB')} = ${DB} cm.`,f:`${I('DB')} = ${dsBump(r,DB,1)} cm.`,why:`DB/BC = AB/(AB + AC) nên DB = ${BC}·${AB}/${AB+AC} = ${DB} cm.`},
      {t:`${I('DC')} = ${DC} cm.`,f:`${I('DC')} = ${dsBump(r,DC,1)} cm.`,why:`DC = BC − DB = ${BC} − ${DB} = ${DC} cm.`},
      {t:`${I('DB')}·${I('AC')} = ${I('DC')}·${I('AB')}.`,f:`${I('DB')}·${I('AB')} = ${I('DC')}·${I('AC')}.`,why:`Từ DB/DC = AB/AC suy ra DB·AC = DC·AB; hai vế ${DB*AC} = ${DC*AB}.`}
    ],chk:()=>DB*AC===DC*AB&&DB*AB!==DC*AC&&DB+DC===BC&&b!==c});
  }
});
/* Chương V: Dữ liệu và biểu đồ */
DS('ds-pie',5,'TH',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,100,120,160,200]),cnt=pcts.map(p=>N*p/100),names=set.names;
  const items=names.map((n,i)=>({name:n,pct:pcts[i]})),order=[0,1,2,3].sort((x,y)=>cnt[y]-cnt[x]);
  const k=r.int(0,3),[i,j]=r.shuffle([0,1,2,3]).slice(0,2),[hi,lo]=cnt[i]>cnt[j]?[i,j]:[j,i];
  const notMax=r.pick(order.slice(1));
  return mkDS(r,{stem:`Biểu đồ hình quạt tròn dưới đây biểu diễn kết quả khảo sát ${set.what} của ${N} học sinh.<div class="figure">${pieSVG(items)}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số học sinh chọn “${names[k]}” là ${cnt[k]} học sinh.`,f:`Số học sinh chọn “${names[k]}” là ${dsBump(r,cnt[k],1)} học sinh.`,why:`${N}·${pcts[k]}% = ${cnt[k]} học sinh.`},
    {t:`Tỉ lệ học sinh chọn “${names[i]}” và “${names[j]}” cộng lại là ${pcts[i]+pcts[j]}%.`,f:`Tỉ lệ học sinh chọn “${names[i]}” và “${names[j]}” cộng lại là ${pcts[i]+pcts[j]+r.pick([-10,-5,5,10])}%.`,why:`${pcts[i]}% + ${pcts[j]}% = ${pcts[i]+pcts[j]}%.`},
    {t:`Số học sinh chọn “${names[hi]}” nhiều hơn số học sinh chọn “${names[lo]}” là ${cnt[hi]-cnt[lo]} học sinh.`,f:`Số học sinh chọn “${names[hi]}” nhiều hơn số học sinh chọn “${names[lo]}” là ${dsBump(r,cnt[hi]-cnt[lo],1)} học sinh.`,why:`${cnt[hi]} − ${cnt[lo]} = ${cnt[hi]-cnt[lo]}.`},
    {t:`“${names[order[0]]}” là lựa chọn được nhiều học sinh nhất.`,f:`“${names[notMax]}” là lựa chọn được nhiều học sinh nhất.`,why:`Hình quạt lớn nhất ứng với “${names[order[0]]}” (${pcts[order[0]]}%).`}
  ],chk:()=>cnt.every(Number.isInteger)&&pcts.reduce((s,x)=>s+x,0)===100&&cnt[hi]>cnt[lo]&&cnt[order[0]]>cnt[notMax]});
});
const DT_QN=['Chiều cao (cm) của học sinh lớp 8','Số anh chị em ruột của mỗi học sinh','Điểm kiểm tra môn Toán','Cân nặng (kg) của học sinh','Thời gian đi từ nhà đến trường (phút)','Số quyển sách đọc trong một tháng','Số học sinh nam trong mỗi lớp','Nhiệt độ (°C) trong các ngày của tuần'];
const DT_QL=['Môn học yêu thích của học sinh','Màu sắc yêu thích','Phương tiện đến trường','Xếp loại học lực (Giỏi, Khá, Trung bình)','Tên các loài hoa trong vườn trường','Quê quán của học sinh','Môn thể thao tham gia ở câu lạc bộ','Tên các thành phố đã đến du lịch'];
DS('ds-datatype',5,'NB',r=>{
  const two=r.shuffle(DT_QN).slice(0,2).map(h=>({h,num:true})).concat(r.shuffle(DT_QL).slice(0,2).map(h=>({h,num:false})));
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:r.shuffle(two).map(o=>({
    t:`“${o.h}” là dữ liệu ${o.num?'định lượng':'định tính'}.`,f:`“${o.h}” là dữ liệu ${o.num?'định tính':'định lượng'}.`,
    why:o.num?'Dữ liệu này được biểu diễn bằng số nên là dữ liệu định lượng.':'Dữ liệu này không phải là số nên là dữ liệu định tính.'})),
    chk:()=>DT_QN.every(x=>!DT_QL.includes(x))});
});

/* ======================= LỚP 7 ======================= */
/* Chương I: Số hữu tỉ */
DS7('ds7-pow',1,'TH',r=>{
  let q;do{q=Q(r.nz(-3,3),r.pick([2,3]))}while(q[1]===1);const n=r.pick([2,3]);let m,k;do{m=r.int(2,4);k=r.int(2,3)}while(m*k===m+k);
  const p=r.int(2,5),pos=q[0]>0||p%2===0,B=bsq(q);
  return mkDS(r,{stem:`Cho số hữu tỉ ${I('x')} = ${qh(q)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('x')}${sup(n)} = ${qh(qpw(q,n))}.`,f:`${I('x')}${sup(n)} = ${qh(qmul(qpw(q,n),Q(-1)))}.`,why:`${B}${sup(n)} = ${qh(qpw(q,n))}.`},
    {t:`${I('x')}${sup(m)} · ${I('x')}${sup(k)} = ${I('x')}${sup(m+k)}.`,f:`${I('x')}${sup(m)} · ${I('x')}${sup(k)} = ${I('x')}${sup(m*k)}.`,why:`Nhân hai lũy thừa cùng cơ số: giữ nguyên cơ số, cộng số mũ: ${m} + ${k} = ${m+k}.`},
    {t:`(${I('x')}${sup(m)})${sup(k)} = ${I('x')}${sup(m*k)}.`,f:`(${I('x')}${sup(m)})${sup(k)} = ${I('x')}${sup(m+k)}.`,why:`Lũy thừa của lũy thừa: giữ nguyên cơ số, nhân số mũ: ${m}·${k} = ${m*k}.`},
    {t:`${I('x')}${sup(p)} là số ${pos?'dương':'âm'}.`,f:`${I('x')}${sup(p)} là số ${pos?'âm':'dương'}.`,why:`${q[0]>0?'x > 0 nên mọi lũy thừa của x đều dương':p%2===0?'x < 0 và số mũ chẵn nên lũy thừa dương':'x < 0 và số mũ lẻ nên lũy thừa âm'}.`}
  ],chk:()=>m*k!==m+k&&Math.abs(Math.pow(qv(q),m)*Math.pow(qv(q),k)-Math.pow(qv(q),m+k))<1e-9&&Math.pow(qv(q),p)>0===pos});
});
DS7('ds7-abs',1,'NB',r=>{
  let x,y;do{x=Q(-r.int(1,9),r.pick([2,3,4,5,7]));y=Q(r.int(1,9),r.pick([2,3,4,5,7]))}while(Math.abs(qv(x))===Math.abs(qv(y)));
  const bigX=Math.abs(qv(x))>Math.abs(qv(y)),nx=Q(-x[0],x[1]);
  return mkDS(r,{stem:`Cho hai số hữu tỉ ${I('x')} = ${qh(x)} và ${I('y')} = ${qh(y)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số đối của ${I('x')} là ${qh(nx)}.`,f:`Số đối của ${I('x')} là ${qh(x)}.`,why:`Số đối của ${qh(x)} là ${qh(nx)}.`},
    {t:`${I('x')} + ${I('y')} = ${qh(qadd(x,y))}.`,f:`${I('x')} + ${I('y')} = ${qh(qadd(nx,y))}.`,why:`${I('x')} + ${I('y')} = ${qh(x)} + ${qh(y)} = ${qh(qadd(x,y))}.`},
    {t:`${I('x')} &lt; ${I('y')}.`,f:`${I('x')} > ${I('y')}.`,why:`${I('x')} là số âm, ${I('y')} là số dương nên ${I('x')} &lt; ${I('y')}.`},
    {t:`Trên trục số, điểm biểu diễn số ${I('x')} nằm bên trái gốc ${I('O')}.`,f:`Trên trục số, điểm biểu diễn số ${I('x')} nằm bên phải gốc ${I('O')}.`,why:`${I('x')} &lt; 0 nên điểm biểu diễn ${I('x')} nằm bên trái gốc ${I('O')}.`}
  ],chk:()=>qv(x)<0&&qv(y)>0&&qv(qadd(x,y))!==qv(qadd(nx,y))});
});
/* Chương II: Số thực */
const SQR_IRR=[2,3,5,6,7,10,11,12,13,15],SQR_RAT=[4,9,16,25,36,49];
DS7('ds7-sqrt',2,'TH',r=>{
  const m=r.int(3,15),k=r.int(3,12);let p;do{p=r.int(2,70)}while(Number.isInteger(Math.sqrt(p))||p===k*k);
  const a=r.int(2,9);let b;do{b=r.int(2,9)}while(b===a);
  const pool=[...r.shuffle(SQR_IRR).slice(0,3).map(n=>({h:rt(n),irr:true})),{h:'π',irr:true},...r.shuffle(SQR_RAT).slice(0,2).map(n=>({h:rt(n),irr:false})),{h:'0,25',irr:false},{h:fr(1,3),irr:false},{h:'3,14',irr:false}];
  const lst=r.shuffle(pool).slice(0,5),c=lst.filter(z=>z.irr).length;let c2;do{c2=r.int(0,5)}while(c2===c);
  const less=p<k*k;
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${rt(m*m)} = ${m}.`,f:`${rt(m*m)} = ${MINUS}${m}.`,why:`Căn bậc hai số học của ${m*m} là ${m}.`},
    {t:`${rt(p)} ${less?'<':'>'} ${k}.`,f:`${rt(p)} ${less?'>':'<'} ${k}.`,why:`${k} = ${rt(k*k)} và ${p} ${less?'<':'>'} ${k*k} nên ${rt(p)} ${less?'<':'>'} ${k}.`},
    {t:`${rt(a)}·${rt(b)} = ${rt(a*b)}.`,f:`${rt(a)}·${rt(b)} = ${rt(a+b)}.`,why:`${rt(I('a'))}·${rt(I('b'))} = ${rt(`${I('a')}${I('b')}`)} với ${I('a')}, ${I('b')} ≥ 0 nên ${rt(a)}·${rt(b)} = ${rt(a*b)}.`},
    {t:`Trong các số ${lst.map(z=>z.h).join('; ')} có ${c} số vô tỉ.`,f:`Trong các số ${lst.map(z=>z.h).join('; ')} có ${c2} số vô tỉ.`,why:`Số vô tỉ là số thập phân vô hạn không tuần hoàn (căn của số không chính phương, π…). Có ${c} số vô tỉ.`}
  ],chk:()=>p!==k*k&&a!==b&&c!==c2&&!Number.isInteger(Math.sqrt(p))});
});
const ROUND_NAME=['đơn vị','phần mười','phần trăm','phần nghìn'];
DS7('ds7-round',2,'TH',r=>{
  let v4;do{v4=r.int(10001,99999)}while(v4%10===0);
  const v=v4/10000,ks=r.shuffle([0,1,2,3]);
  const rd=k=>{const u=10**(4-k);return Math.floor((v4+u/2)/u)*u/10000};
  return mkDS(r,{stem:`Cho số thập phân ${I('a')} = ${dec(v,4)}. Xét tính đúng sai của các khẳng định sau:`,items:ks.map(k=>{
    const ok=rd(k),step=10**-k,bad=Math.round((ok+(r.chance(.5)?1:-1)*step)*10**k)/10**k;
    return{t:`Làm tròn số ${I('a')} đến hàng ${ROUND_NAME[k]} được ${dec(ok,k)}.`,f:`Làm tròn số ${I('a')} đến hàng ${ROUND_NAME[k]} được ${dec(bad,k)}.`,
      why:`Chữ số ngay sau hàng ${ROUND_NAME[k]} là ${Math.floor(v4/10**(3-k))%10}, ${Math.floor(v4/10**(3-k))%10>=5?'≥ 5 nên tăng chữ số hàng làm tròn thêm 1':'< 5 nên giữ nguyên'}; kết quả ${dec(ok,k)}.`};
  }),chk:()=>[0,1,2,3].every(k=>Math.abs(rd(k)-roundTo(v,k))<1e-9)});
});
/* Chương III: Góc và đường thẳng song song */
DS7('ds7-angle',3,'NB',r=>{
  const al=r.pick([30,40,50,60,70,110,120,130,140,150]);
  return mkDS(r,{stem:`Hai đường thẳng ${I("xx'")} và ${I("yy'")} cắt nhau tại ${I('O')}, biết ∠${I('xOy')} = ${al}°. Tia ${I('Ot')} là tia phân giác của góc ${I('xOy')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`∠${I("x'Oy'")} = ${al}°.`,f:`∠${I("x'Oy'")} = ${180-al}°.`,why:`∠x'Oy' và ∠xOy là hai góc đối đỉnh nên bằng nhau.`},
    {t:`∠${I("xOy'")} = ${180-al}°.`,f:`∠${I("xOy'")} = ${al}°.`,why:`∠xOy' và ∠xOy là hai góc kề bù nên ∠xOy' = 180° − ${al}° = ${180-al}°.`},
    {t:`∠${I('xOt')} = ${al/2}°.`,f:`∠${I('xOt')} = ${al}°.`,why:`Ot là tia phân giác của ∠xOy nên ∠xOt = ${al}°/2 = ${al/2}°.`},
    {t:`∠${I("x'Oy")} và ∠${I('xOy')} là hai góc kề bù.`,f:`∠${I("x'Oy")} và ∠${I('xOy')} là hai góc đối đỉnh.`,why:`Hai góc này có chung cạnh Oy và hai cạnh còn lại Ox, Ox' là hai tia đối nhau nên kề bù.`}
  ],chk:()=>al!==90&&al%2===0&&al!==180-al});
});
const BANK7_3=[
  ['Hai góc đối đỉnh thì bằng nhau.','Hai góc kề bù thì bằng nhau.','Hai góc đối đỉnh thì bằng nhau; hai góc kề bù thì có tổng bằng 180° chứ không nhất thiết bằng nhau.'],
  ['Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.','Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì vuông góc với nhau.','Hai đường thẳng cùng vuông góc với đường thẳng thứ ba thì song song với nhau.'],
  ['Qua một điểm nằm ngoài một đường thẳng, có một và chỉ một đường thẳng song song với đường thẳng đó.','Qua một điểm nằm ngoài một đường thẳng, có hai đường thẳng song song với đường thẳng đó.','Đó là tiên đề Euclid: có duy nhất một đường thẳng song song.'],
  ['Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau.','Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc trong cùng phía bằng nhau.','Với hai đường thẳng song song, các góc so le trong bằng nhau còn các góc trong cùng phía bù nhau.'],
  ['Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau.','Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì cắt nhau.','Tính chất bắc cầu của quan hệ song song.'],
  ['Tia phân giác của một góc chia góc đó thành hai góc bằng nhau.','Tia phân giác của một góc chia góc đó thành hai góc bù nhau.','Tia phân giác chia góc thành hai góc có số đo bằng nhau.'],
  ['Nếu hai đường thẳng a, b cắt đường thẳng c tạo thành hai góc đồng vị bằng nhau thì a // b.','Nếu hai đường thẳng a, b cắt đường thẳng c tạo thành hai góc trong cùng phía bằng nhau thì a // b.','Dấu hiệu nhận biết hai đường thẳng song song là hai góc đồng vị (hoặc so le trong) bằng nhau.'],
  ['Đường trung trực của một đoạn thẳng vuông góc với đoạn thẳng đó tại trung điểm của nó.','Đường trung trực của một đoạn thẳng vuông góc với đoạn thẳng đó tại một điểm bất kì.','Đường trung trực đi qua trung điểm và vuông góc với đoạn thẳng.'],
  ['Một định lí gồm hai phần: giả thiết và kết luận.','Một định lí chỉ gồm phần kết luận, không có giả thiết.','Mỗi định lí đều có giả thiết (điều cho trước) và kết luận (điều cần chứng minh).']
];
DS7('ds7-theory3',3,'NB',r=>bankDS(r,BANK7_3,'Xét tính đúng sai của các khẳng định sau:',4));
/* Chương IV: Tam giác bằng nhau */
DS7('ds7-iso',4,'TH',r=>{
  const al=r.pick([20,30,40,50,70,80,100,110,120,130,140,150]),be=(180-al)/2,N=r.pick(['ABC','MNP','DEF']),[A,B,C]=N.split('');
  return mkDS(r,{stem:`Cho tam giác ${I(N)} cân tại ${I(A)}, có ∠${I(A)} = ${al}°. Gọi ${I('H')} là trung điểm của ${I(B+C)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`∠${I(B)} = ${be}°.`,f:`∠${I(B)} = ${180-al}°.`,why:`Tam giác cân tại ${A} nên ∠${B} = ∠${C} = (180° − ${al}°)/2 = ${be}°.`},
    {t:`Góc ngoài tại đỉnh ${I(B)} bằng ${180-be}°.`,f:`Góc ngoài tại đỉnh ${I(B)} bằng ${be}°.`,why:`Góc ngoài tại ${B} kề bù với ∠${B} nên bằng 180° − ${be}° = ${180-be}°.`},
    {t:`∠${I(B+A+'H')} = ${al/2}°.`,f:`∠${I(B+A+'H')} = ${al}°.`,why:`Trong tam giác cân, đường trung tuyến ${A}H cũng là tia phân giác nên ∠${B}${A}H = ${al}°/2 = ${al/2}°.`},
    {t:`Tam giác ${I(N)} là tam giác ${al<90?'nhọn':'tù'}.`,f:`Tam giác ${I(N)} là tam giác ${al<90?'tù':'nhọn'}.`,why:`Các góc của tam giác là ${al}°, ${be}°, ${be}°; góc lớn nhất ${al<90?'nhỏ hơn':'lớn hơn'} 90°.`}
  ],chk:()=>al!==90&&al+2*be===180&&be!==90&&(180-al)!==be});
});
const BANK7_4=[
  ['Tổng ba góc của một tam giác bằng 180°.','Tổng ba góc của một tam giác bằng 360°.','Tổng ba góc của tam giác bằng 180°.'],
  ['Góc ngoài của một tam giác bằng tổng hai góc trong không kề với nó.','Góc ngoài của một tam giác bằng góc trong kề với nó.','Góc ngoài tại một đỉnh bằng tổng hai góc trong không kề với đỉnh đó.'],
  ['Hai tam giác bằng nhau thì các cạnh tương ứng bằng nhau và các góc tương ứng bằng nhau.','Hai tam giác bằng nhau thì các cạnh tương ứng tỉ lệ nhưng không nhất thiết bằng nhau.','Hai tam giác bằng nhau có các cạnh tương ứng bằng nhau.'],
  ['Trong tam giác cân, hai góc ở đáy bằng nhau.','Trong tam giác cân, hai góc ở đáy bù nhau.','Tam giác cân có hai góc ở đáy bằng nhau.'],
  ['Tam giác có hai cạnh bằng nhau là tam giác cân.','Tam giác có hai góc bằng nhau là tam giác vuông.','Tam giác có hai cạnh bằng nhau gọi là tam giác cân.'],
  ['Nếu ba cạnh của tam giác này bằng ba cạnh của tam giác kia thì hai tam giác bằng nhau (c.c.c).','Nếu ba góc của tam giác này bằng ba góc của tam giác kia thì hai tam giác bằng nhau.','Trường hợp c.c.c yêu cầu ba cặp cạnh tương ứng bằng nhau; ba cặp góc bằng nhau chưa đủ để kết luận bằng nhau.'],
  ['Tam giác đều có ba góc bằng nhau và mỗi góc bằng 60°.','Tam giác đều có ba góc bằng nhau và mỗi góc bằng 90°.','Mỗi góc của tam giác đều bằng 180°/3 = 60°.'],
  ['Trong tam giác vuông, hai góc nhọn phụ nhau.','Trong tam giác vuông, hai góc nhọn bù nhau.','Tổng hai góc nhọn của tam giác vuông bằng 90°.'],
  ['Nếu hai cạnh và góc xen giữa của tam giác này bằng hai cạnh và góc xen giữa của tam giác kia thì hai tam giác bằng nhau (c.g.c).','Nếu hai cạnh và một góc bất kì của tam giác này bằng hai cạnh và một góc của tam giác kia thì hai tam giác bằng nhau.','Trường hợp c.g.c yêu cầu góc nằm xen giữa hai cạnh đã cho.']
];
DS7('ds7-theory4',4,'NB',r=>bankDS(r,BANK7_4,'Xét tính đúng sai của các khẳng định sau:',4));
/* Chương V: Thu thập và biểu diễn dữ liệu */
DS7('ds7-table',5,'NB',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,100,120,160,200]),cnt=pcts.map(p=>N*p/100),names=set.names;
  const order=[0,1,2,3].sort((a,b)=>cnt[b]-cnt[a]),[i,j]=r.shuffle([0,1,2,3]).slice(0,2),k=r.int(0,3),notMax=r.pick(order.slice(1));
  return mkDS(r,{stem:`Bảng thống kê sau cho biết ${set.what} của học sinh một lớp trong một cuộc khảo sát.${tableHTML(['Lựa chọn',...names],[['Số học sinh',...cnt]])}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Có tất cả ${N} học sinh tham gia khảo sát.`,f:`Có tất cả ${dsBump(r,N,1)} học sinh tham gia khảo sát.`,why:`Tổng số học sinh = ${cnt.join(' + ')} = ${N}.`},
    {t:`Số học sinh chọn “${names[k]}” chiếm ${pcts[k]}% tổng số.`,f:`Số học sinh chọn “${names[k]}” chiếm ${pcts[k]+r.pick([-5,5])}% tổng số.`,why:`${cnt[k]}/${N} = ${pcts[k]}%.`},
    {t:`“${names[order[0]]}” là lựa chọn được nhiều học sinh nhất.`,f:`“${names[notMax]}” là lựa chọn được nhiều học sinh nhất.`,why:`Số học sinh chọn “${names[order[0]]}” là lớn nhất (${cnt[order[0]]} học sinh).`},
    {t:`Hai lựa chọn “${names[i]}” và “${names[j]}” có tất cả ${cnt[i]+cnt[j]} học sinh chọn.`,f:`Hai lựa chọn “${names[i]}” và “${names[j]}” có tất cả ${dsBump(r,cnt[i]+cnt[j],1)} học sinh chọn.`,why:`${cnt[i]} + ${cnt[j]} = ${cnt[i]+cnt[j]}.`}
  ],chk:()=>cnt.every(Number.isInteger)&&cnt.reduce((s,x)=>s+x,0)===N&&cnt[order[0]]>cnt[notMax]});
});
DS7('ds7-line',5,'TH',r=>{
  const S=r.pick(LINE_SETS),n=S.cats.length,vals=distinctInts(r,n,S.lo,S.hi),mx=Math.max(...vals),mn=Math.min(...vals),im=vals.indexOf(mx),sum=vals.reduce((a,b)=>a+b,0);
  const w=r.int(0,n-2),up=vals[w+1]>vals[w],other=r.pick(S.cats.filter((_,x)=>x!==im));
  return mkDS(r,{stem:`${S.what} được cho trong biểu đồ đoạn thẳng sau.<div class="figure">${lineSVG(S.cats,vals,{unit:S.unit})}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số liệu cao nhất ứng với ${S.cats[im]}.`,f:`Số liệu cao nhất ứng với ${other}.`,why:`Điểm cao nhất của đường gấp khúc ứng với ${S.cats[im]} (${mx} ${S.unit}).`},
    {t:`Hiệu giữa số liệu lớn nhất và nhỏ nhất là ${mx-mn} ${S.unit}.`,f:`Hiệu giữa số liệu lớn nhất và nhỏ nhất là ${dsBump(r,mx-mn,1)} ${S.unit}.`,why:`${mx} − ${mn} = ${mx-mn} (${S.unit}).`},
    {t:`Từ ${S.cats[w]} đến ${S.cats[w+1]}, số liệu ${up?'tăng':'giảm'}.`,f:`Từ ${S.cats[w]} đến ${S.cats[w+1]}, số liệu ${up?'giảm':'tăng'}.`,why:`Số liệu đổi từ ${vals[w]} sang ${vals[w+1]} nên ${up?'tăng':'giảm'}.`},
    {t:`Tổng các số liệu trong biểu đồ bằng ${sum} ${S.unit}.`,f:`Tổng các số liệu trong biểu đồ bằng ${dsBump(r,sum,1)} ${S.unit}.`,why:`${vals.join(' + ')} = ${sum}.`}
  ],chk:()=>new Set(vals).size===n&&vals.reduce((a,b)=>a+b,0)===sum&&vals[w+1]!==vals[w]});
});

/* ======================= LỚP 11 ======================= */
/* Chương I: phương trình lượng giác cơ bản */
const TRIG_EQ=[
  {fn:'sin',v:fr(1,2),a:Q(1,6),val:.5},{fn:'sin',v:fr(rt(3),2),a:Q(1,3),val:Math.sqrt(3)/2},{fn:'sin',v:fr(rt(2),2),a:Q(1,4),val:Math.SQRT1_2},
  {fn:'cos',v:fr(1,2),a:Q(1,3),val:.5},{fn:'cos',v:fr(rt(2),2),a:Q(1,4),val:Math.SQRT1_2},{fn:'cos',v:fr(rt(3),2),a:Q(1,6),val:Math.sqrt(3)/2},
  {fn:'tan',v:'1',a:Q(1,4),val:1},{fn:'tan',v:rt(3),a:Q(1,3),val:Math.sqrt(3)}
];
DS11('ds1-eq',1,'TH',r=>{
  const e=r.pick(TRIG_EQ),F=Math[e.fn],a=e.a,fn=e.fn,Fx=x=>fn==='sin'?Math.sin(x):fn==='cos'?Math.cos(x):Math.tan(x);
  const al=radH(a),ok=fn==='tan'?qadd(a,Q(1)):fn==='sin'?qsub(Q(1),a):Q(-a[0],a[1]),bad=fn==='sin'?qadd(Q(1),a):qsub(Q(1),a);
  const nCnt=r.pick([1,3,4]);
  const m=r.pick(fn==='tan'?[7,9]:[2,3]),mf=r.pick([1,2]);
  return mkDS(r,{stem:`Cho phương trình ${fn} ${I('x')} = ${e.v}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:fn==='tan'?`${I('x')} = ${al} + ${K}π (${K} ∈ ℤ) là họ nghiệm của phương trình.`:`${I('x')} = ${al} + ${K}2π (${K} ∈ ℤ) là một họ nghiệm của phương trình.`,
     f:fn==='tan'?`${I('x')} = ${al} + ${K}π/2 (${K} ∈ ℤ) là họ nghiệm của phương trình.`:`${I('x')} = ${al} + ${K}π (${K} ∈ ℤ) là một họ nghiệm của phương trình.`,
     why:fn==='tan'?`tan x = tan α ⟺ x = α + kπ.`:`${fn} x = ${fn} α ⟺ x = ±α + k2π (cos) hoặc x = α + k2π, x = π − α + k2π (sin); họ x = α + kπ không thỏa mãn vì nghiệm cách nhau 2π.`},
    {t:`Phương trình có đúng 2 nghiệm thuộc đoạn [0; 2π].`,f:`Phương trình có đúng ${nCnt} nghiệm thuộc đoạn [0; 2π].`,why:`Trên [0; 2π], phương trình ${fn} ${I('x')} = ${e.v} có hai nghiệm.`},
    {t:`${I('x')} = ${radH(ok)} là một nghiệm của phương trình.`,f:`${I('x')} = ${radH(bad)} là một nghiệm của phương trình.`,
     why:fn==='tan'?`tan(α + π) = tan α nên x = ${radH(ok)} là nghiệm; x = π − α cho tan = ${MINUS}${e.v}.`:fn==='sin'?`sin(π − α) = sin α nên x = ${radH(ok)} là nghiệm; sin(π + α) = −sin α.`:`cos(−α) = cos α nên x = ${radH(ok)} là nghiệm; cos(π − α) = −cos α.`},
    fn==='tan'?{t:`Phương trình tan ${I('x')} = ${m} có nghiệm.`,f:`Phương trình tan ${I('x')} = ${m} vô nghiệm.`,why:'Hàm tan nhận mọi giá trị thực nên phương trình tan x = m luôn có nghiệm.'}
      :{t:`Phương trình ${fn} ${I('x')} = ${mf===1?m:MINUS+m} vô nghiệm.`,f:`Phương trình ${fn} ${I('x')} = ${fr(1,m+1)} vô nghiệm.`,why:`|${fn} x| ≤ 1 nên phương trình ${fn} x = m vô nghiệm khi |m| > 1 và có nghiệm khi |m| ≤ 1.`}
  ],chk:()=>Math.abs(Fx(a[0]/a[1]*Math.PI)-e.val)<1e-9&&Math.abs(Fx(ok[0]/ok[1]*Math.PI)-e.val)<1e-9&&Math.abs(Fx(bad[0]/bad[1]*Math.PI)-e.val)>1e-6});
});
/* Chương II: Dãy số, cấp số cộng, cấp số nhân */
DS11('ds2-csc',2,'TH',r=>{
  const u1=r.nz(-8,9),d=r.nz(-5,5),k=r.int(6,12),m=r.int(8,20),Nn=r.int(10,30),vk=u1+(k-1)*d,Sm=m*(2*u1+(m-1)*d)/2,vN=u1+(Nn-1)*d;
  return mkDS(r,{stem:`Cho cấp số cộng ${UN} có ${U(1)} = ${sg(u1)} và công sai ${I('d')} = ${sg(d)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${U(k)} = ${sg(vk)}.`,f:`${U(k)} = ${sg(dsBump(r,vk))}.`,why:`${U(k)} = ${U(1)} + ${k-1}d = ${sg(u1)} + ${k-1}·(${sg(d)}) = ${sg(vk)}.`},
    {t:`${I('S')}${sub(m)} = ${sg(Sm)}.`,f:`${I('S')}${sub(m)} = ${sg(dsBump(r,Sm))}.`,why:`${I('S')}${sub(m)} = ${fr(`${m}[2${U(1)} + ${m-1}d]`,2)} = ${sg(Sm)}.`},
    {t:`${UN} là dãy số ${d>0?'tăng':'giảm'}.`,f:`${UN} là dãy số ${d>0?'giảm':'tăng'}.`,why:`Công sai d = ${sg(d)} ${d>0?'> 0':'< 0'} nên dãy ${d>0?'tăng':'giảm'}.`},
    {t:`${sg(vN)} là số hạng thứ ${Nn} của dãy.`,f:`${sg(vN)} là số hạng thứ ${Nn+1} của dãy.`,why:`${U(Nn)} = ${sg(u1)} + ${Nn-1}·(${sg(d)}) = ${sg(vN)}.`}
  ],chk:()=>{let s=0;for(let t=0;t<m;t++)s+=u1+t*d;return s===Sm&&u1+(Nn)*d!==vN}});
});
DS11('ds2-csn',2,'TH',r=>{
  const u1=r.nz(-3,4),q=r.pick([2,3,-2,-3]),k=r.int(4,6),n=r.int(5,6),vk=u1*q**(k-1),Sn=u1*(q**n-1)/(q-1);
  const u2=u1*q,u3=u2*q,u4=u3*q;
  if(u3*u3===u2+u4)return T.ds['ds2-csn'].gen(r);
  return mkDS(r,{stem:`Cho cấp số nhân ${UN} có ${U(1)} = ${sg(u1)} và ${U(2)} = ${sg(u2)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Công bội của cấp số nhân là ${I('q')} = ${sg(q)}.`,f:`Công bội của cấp số nhân là ${I('q')} = ${sg(-q)}.`,why:`q = ${U(2)} : ${U(1)} = ${sg(u2)} : ${sg(u1)} = ${sg(q)}.`},
    {t:`${U(k)} = ${sg(vk)}.`,f:`${U(k)} = ${sg(dsBump(r,vk))}.`,why:`${U(k)} = ${U(1)}·q${sup(k-1)} = ${sg(u1)}·(${sg(q)})${sup(k-1)} = ${sg(vk)}.`},
    {t:`${U(3)}${sup(2)} = ${U(2)}·${U(4)}.`,f:`${U(3)}${sup(2)} = ${U(2)} + ${U(4)}.`,why:`Trong cấp số nhân, ${U(I('k'))}${sup(2)} = ${U(I('k')+' − 1')}·${U(I('k')+' + 1')}; ở đây ${sg(u3*u3)} = ${sg(u2)}·${sg(u4)}.`},
    {t:`${I('S')}${sub(n)} = ${sg(Sn)}.`,f:`${I('S')}${sub(n)} = ${sg(dsBump(r,Sn))}.`,why:`${I('S')}${sub(n)} = ${U(1)}·${fr('q'+sup(n)+' − 1','q − 1')} = ${sg(Sn)}.`}
  ],chk:()=>{let s=0;for(let t=0;t<n;t++)s+=u1*q**t;return s===Sn&&u3*u3===u2*u4&&u3*u3!==u2+u4}});
},'csn');
DS11('ds2-seq',2,'VD',r=>{
  let p;do{p=r.nz(-6,6)}while(p===-3);const q=r.int(-5,9),u=n=>n*n+p*n+q,k=r.int(3,8),inc=p>-3;
  return mkDS(r,{stem:`Cho dãy số ${UN} với ${U(I('n'))} = ${xquad(1,p,q,'n')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${U(k)} = ${sg(u(k))}.`,f:`${U(k)} = ${sg(dsBump(r,u(k)))}.`,why:`Thay n = ${k}: ${k*k} ${p<0?MINUS:'+'} ${Math.abs(p)}·${k} ${q<0?MINUS:'+'} ${Math.abs(q)} = ${sg(u(k))}.`},
    {t:`${U(I('n')+' + 1')} ${MINUS} ${U(I('n'))} = ${linH(2,1+p)}.`,f:`${U(I('n')+' + 1')} ${MINUS} ${U(I('n'))} = ${linH(2,p)}.`,why:`(n + 1)² + p(n + 1) + q − (n² + pn + q) = 2n + 1 + p = ${linH(2,1+p)}.`},
    {t:`${UN} ${inc?'là':'không phải là'} dãy số tăng.`,f:`${UN} ${inc?'không phải là':'là'} dãy số tăng.`,why:`${U(I('n')+' + 1')} − ${U(I('n'))} = 2n + ${1+p} nhỏ nhất tại n = 1 là ${3+p} ${inc?'> 0':'≤ 0'}, nên dãy ${inc?'tăng':'không tăng'}.`},
    {t:`${UN} bị chặn dưới.`,f:`${UN} bị chặn trên.`,why:'Hệ số của n² dương nên u_n → +∞: dãy bị chặn dưới (bởi giá trị nhỏ nhất) nhưng không bị chặn trên.'}
  ],chk:()=>u(2)-u(1)===3+p&&u(1000)>u(10)&&(inc===(u(2)>u(1)))&&[...Array(30).keys()].every(i=>inc?u(i+2)>u(i+1):true)});
});
/* Chương III: Mẫu số liệu ghép nhóm */
DS11('ds3-mean',3,'TH',r=>{
  const D=grpData(r),med=cumIdx(D,D.n/2).i,mode=D.f.indexOf(Math.max(...D.f)),mean=r2(meanOf(D));
  const badMed=r.pick([0,1,2,3,4].filter(i=>i!==med)),badMode=r.pick([0,1,2,3,4].filter(i=>i!==mode)),i0=r.int(0,4);
  return mkDS(r,{stem:`${grpStem(D)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Cỡ mẫu của mẫu số liệu là ${D.n}.`,f:`Cỡ mẫu của mẫu số liệu là ${dsBump(r,D.n,1)}.`,why:`n = ${D.f.join(' + ')} = ${D.n}.`},
    {t:`Giá trị đại diện của nhóm ${D.label(i0)} là ${fmt(D.lo(i0)+D.h/2)}.`,f:`Giá trị đại diện của nhóm ${D.label(i0)} là ${fmt(D.lo(i0)+D.h)}.`,why:`Giá trị đại diện = (${D.lo(i0)} + ${D.hi(i0)})/2 = ${fmt(D.lo(i0)+D.h/2)}.`},
    {t:`Nhóm chứa trung vị là ${D.label(med)}.`,f:`Nhóm chứa trung vị là ${D.label(badMed)}.`,why:`n/2 = ${D.n/2}; tần số tích lũy đạt ${D.n/2} lần đầu ở nhóm ${D.label(med)}.`},
    {t:`Số trung bình của mẫu số liệu xấp xỉ ${fmt(mean)}.`,f:`Số trung bình của mẫu số liệu xấp xỉ ${fmt(dsOff(r,mean,.5))}.`,why:`x̄ = (Σ nᵢ·xᵢ)/n ≈ ${fmt(mean)} với xᵢ là giá trị đại diện của từng nhóm.`}
  ],chk:()=>D.f.reduce((s,x)=>s+x,0)===D.n&&D.f[mode]>=Math.max(...D.f)&&badMode!==mode&&Math.abs(mean-meanOf(D))<=.0051});
});
DS11('ds3-quart',3,'VD',r=>{
  const D=grpData(r),R=D.hi(4)-D.lo(0),q1=quantile(D,D.n/4),q3=quantile(D,3*D.n/4),Q1=r2(q1),Q3=r2(q3),dQ=r2(q3-q1);
  return mkDS(r,{stem:`${grpStem(D)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Khoảng biến thiên của mẫu số liệu là ${fmt(R)}.`,f:`Khoảng biến thiên của mẫu số liệu là ${fmt(dsBump(r,R,1))}.`,why:`R = ${D.hi(4)} − ${D.lo(0)} = ${fmt(R)} (hiệu giữa đầu mút phải của nhóm cuối và đầu mút trái của nhóm đầu).`},
    {t:`Tứ phân vị thứ nhất xấp xỉ ${fmt(Q1)}.`,f:`Tứ phân vị thứ nhất xấp xỉ ${fmt(dsOff(r,Q1,.5))}.`,why:`n/4 = ${D.n/4}, nhóm chứa ${I('Q')}${sub(1)} là ${D.label(cumIdx(D,D.n/4).i)}; ${I('Q')}${sub(1)} ≈ ${fmt(Q1)}.`},
    {t:`Tứ phân vị thứ ba xấp xỉ ${fmt(Q3)}.`,f:`Tứ phân vị thứ ba xấp xỉ ${fmt(dsOff(r,Q3,.5))}.`,why:`3n/4 = ${3*D.n/4}, nhóm chứa ${I('Q')}${sub(3)} là ${D.label(cumIdx(D,3*D.n/4).i)}; ${I('Q')}${sub(3)} ≈ ${fmt(Q3)}.`},
    {t:`Khoảng tứ phân vị xấp xỉ ${fmt(dQ)}.`,f:`Khoảng tứ phân vị xấp xỉ ${fmt(dsOff(r,dQ,.5))}.`,why:`Δ${I('Q')} = ${I('Q')}${sub(3)} − ${I('Q')}${sub(1)} ≈ ${fmt(dQ)}.`}
  ],chk:()=>D.n%4===0&&R===D.k*D.h&&q3>q1});
});
/* Chương IV: Quan hệ song song trong không gian */
const BANK11_4=[
  ['Qua ba điểm không thẳng hàng có một và chỉ một mặt phẳng.','Qua ba điểm bất kì có một và chỉ một mặt phẳng.','Ba điểm thẳng hàng thuộc vô số mặt phẳng; chỉ ba điểm không thẳng hàng mới xác định duy nhất một mặt phẳng.'],
  ['Hai đường thẳng chéo nhau thì không có điểm chung.','Hai đường thẳng chéo nhau thì có đúng một điểm chung.','Hai đường thẳng chéo nhau không đồng phẳng và không có điểm chung.'],
  ['Hai mặt phẳng phân biệt có điểm chung thì giao của chúng là một đường thẳng.','Hai mặt phẳng phân biệt có thể có đúng một điểm chung.','Nếu hai mặt phẳng phân biệt có một điểm chung thì chúng có chung cả một đường thẳng.'],
  ['Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau.','Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chéo nhau.','Tính chất bắc cầu của quan hệ song song trong không gian.'],
  ['Nếu đường thẳng d không nằm trong mặt phẳng (P) và song song với một đường thẳng nằm trong (P) thì d // (P).','Nếu đường thẳng d song song với một đường thẳng nằm trong (P) thì d // (P).','Cần thêm điều kiện d không nằm trong (P), vì d có thể nằm trong (P).'],
  ['Hai mặt phẳng phân biệt cùng song song với một mặt phẳng thứ ba thì song song với nhau.','Hai mặt phẳng phân biệt cùng song song với một mặt phẳng thứ ba thì cắt nhau.','Tính chất bắc cầu của quan hệ song song giữa hai mặt phẳng.'],
  ['Qua một điểm nằm ngoài mặt phẳng (P) có một và chỉ một mặt phẳng song song với (P).','Qua một điểm nằm ngoài mặt phẳng (P) có vô số mặt phẳng song song với (P).','Mặt phẳng đi qua điểm đã cho và song song với (P) là duy nhất.'],
  ['Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau.','Phép chiếu song song bảo toàn độ dài của mọi đoạn thẳng.','Phép chiếu song song bảo toàn tính song song và tỉ số độ dài của hai đoạn thẳng cùng phương, không bảo toàn độ dài.']
];
DS11('ds4-theory',4,'NB',r=>{
  const n=r.int(3,8),kind=r.pick([['mặt',n+1],['đỉnh',n+1],['cạnh',2*n]]);
  return bankDS(r,BANK11_4,'Xét tính đúng sai của các khẳng định sau:',3,[{t:`Hình chóp có đáy là đa giác ${n} cạnh có ${kind[1]} ${kind[0]}.`,f:`Hình chóp có đáy là đa giác ${n} cạnh có ${kind[1]+r.pick([-2,-1,1,2])} ${kind[0]}.`,why:`Hình chóp có đáy ${n} cạnh có ${n+1} mặt, ${n+1} đỉnh và ${2*n} cạnh.`}]);
});
/* Chương V: Giới hạn */
DS11('ds5-lim',5,'NB',r=>{
  let a,b,c,d;do{a=r.nz(-6,6);b=r.nz(-5,5);c=r.int(1,5);d=r.nz(-5,5)}while(qeq(Q(a,c),Q(b,d)));
  const qs=r.pick([Q(1,2),Q(-1,3),Q(2,3),Q(-1,2),Q(3,4)]),qb=r.pick([Q(3,2),Q(2,1),Q(-2,1),Q(5,3),Q(-3,2)]),kx=r.int(1,3);
  const a2=r.nz(-5,5),c2=r.int(1,4),b2=r.int(-4,4),d2=r.int(-4,4);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${LIMN} ${fr(xlin(a,b,'n'),xlin(c,d,'n'))} = ${qh(Q(a,c))}.`,f:`${LIMN} ${fr(xlin(a,b,'n'),xlin(c,d,'n'))} = ${qh(Q(b,d))}.`,why:`Chia cả tử và mẫu cho n: giới hạn bằng ${fr(sg(a),c)} = ${qh(Q(a,c))}.`},
    {t:`${LIMN} ${fr(1,I('n')+(kx>1?sup(kx):''))} = 0.`,f:`${LIMN} ${fr(1,I('n')+(kx>1?sup(kx):''))} = 1.`,why:`${LIMN} 1/n${kx>1?'ᵏ':''} = 0 với mọi số nguyên dương k.`},
    {t:`${LIMN} ${bsq(qs)}${sup(I('n'))} = 0.`,f:`${LIMN} ${bsq(qb)}${sup(I('n'))} = 0.`,why:`${LIMN} q${sup(I('n'))} = 0 khi |q| < 1; với |q| > 1 dãy không có giới hạn hữu hạn.`},
    {t:`${LIMN} ${fr(xlin(a2,b2,'n'),xquad(c2,d2,1,'n'))} = 0.`,f:`${LIMN} ${fr(xlin(a2,b2,'n'),xquad(c2,d2,1,'n'))} = ${qh(Q(a2,c2))}.`,why:'Bậc của tử (1) nhỏ hơn bậc của mẫu (2); chia cả tử và mẫu cho n² được giới hạn bằng 0.'}
  ],chk:()=>{const N=1e6,f1=(a*N+b)/(c*N+d),f4=(a2*N+b2)/(c2*N*N+d2*N+1);return Math.abs(f1-a/c)<1e-4&&Math.abs(f4)<1e-4&&Math.abs(qv(qs))<1&&Math.abs(qv(qb))>1&&Math.abs(a2/c2)>0}});
});
DS11('ds5-xlim',5,'TH',r=>{
  const a=r.nz(-3,4),pa=r.nz(-3,3),qa=r.int(-5,5),ra=r.int(-6,6),V=pa*a*a+qa*a+ra,side=r.pick(['+','−']),inf=side==='+'?PINF:NINF,ninf=side==='+'?NINF:PINF;
  let p,q,s,t;do{p=r.nz(-5,5);q=r.nz(-5,5);s=r.int(1,4);t=r.nz(-4,4)}while(qeq(Q(p,s),Q(q,t)));
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${LIMX(sg(a))} (${xquad(pa,qa,ra)}) = ${sg(V)}.`,f:`${LIMX(sg(a))} (${xquad(pa,qa,ra)}) = ${sg(dsBump(r,V))}.`,why:`Hàm đa thức liên tục nên giới hạn bằng giá trị tại x = ${sg(a)}: ${sg(V)}.`},
    {t:`${LIMX(sg(a))} ${fr(xquad(1,0,-a*a),xlin(1,-a))} = ${sg(2*a)}.`,f:`${LIMX(sg(a))} ${fr(xquad(1,0,-a*a),xlin(1,-a))} = ${sg(a)}.`,why:`${fr(xquad(1,0,-a*a),xlin(1,-a))} = ${xlin(1,a)} (${I('x')} ≠ ${sg(a)}) nên giới hạn bằng ${sg(2*a)}.`},
    {t:`${lim(I('x'),sg(a)+sup(side))} ${fr(1,xlin(1,-a))} = ${inf}.`,f:`${lim(I('x'),sg(a)+sup(side))} ${fr(1,xlin(1,-a))} = ${ninf}.`,why:`Khi ${I('x')} → ${sg(a)}${side}, ${xlin(1,-a)} ${side==='+'?'→ 0 với giá trị dương':'→ 0 với giá trị âm'} nên ${fr(1,xlin(1,-a))} → ${inf}.`},
    {t:`${lim(I('x'),PINF)} ${fr(xlin(p,q),xlin(s,t))} = ${qh(Q(p,s))}.`,f:`${lim(I('x'),PINF)} ${fr(xlin(p,q),xlin(s,t))} = ${qh(Q(q,t))}.`,why:`Chia cả tử và mẫu cho x: giới hạn bằng ${fr(sg(p),s)} = ${qh(Q(p,s))}.`}
  ],chk:()=>{const e=1e-7,x=a+(side==='+'?e:-e),X=1e8;return Math.abs((a*a*pa+a*qa+ra)-V)===0&&Math.abs(((a+e)**2-a*a)/e-2*a)<1e-3&&(1/(x-a))*(side==='+'?1:-1)>0&&Math.abs((p*X+q)/(s*X+t)-p/s)<1e-6}});
});
