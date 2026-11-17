/* ===== Toán 8 học kì II: thêm dạng để các đề không lặp cùng một dạng ===== */
/* Bài 21: phân thức đại số */
DS8('ds8-6-def',6,'NB',r=>{
  const a=r.nz(-6,6),b=r.nz(-4,4),c=r.nz(-9,9),x0=r.pick([0,1,2,-1,3].filter(v=>v!==a)),v=Q(b*x0+c,x0-a);
  if(b*a+c===0||qv(v)===0)return T.ds['ds8-6-def'].gen(r);
  const A=FR8(xlin(b,c),xlin(1,-a));
  return mkDS(r,{stem:`Cho phân thức ${I('A')} = ${A}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Mẫu thức của phân thức ${I('A')} là ${xlin(1,-a)}.`,f:`Mẫu thức của phân thức ${I('A')} là ${xlin(b,c)}.`,why:`Phân thức ${fr('A','B')} có tử thức A, mẫu thức B; ở đây mẫu thức là ${xlin(1,-a)}.`},
    {t:`Phân thức ${I('A')} xác định khi ${X8} ≠ ${sg(a)}.`,f:`Phân thức ${I('A')} xác định khi ${X8} ≠ ${sg(-a)}.`,why:`${I('A')} xác định khi mẫu thức khác 0: ${xlin(1,-a)} ≠ 0 ⟺ ${X8} ≠ ${sg(a)}.`},
    {t:`Giá trị của ${I('A')} tại ${X8} = ${sg(x0)} là ${qh(v)}.`,f:`Giá trị của ${I('A')} tại ${X8} = ${sg(x0)} là ${qh(Q(-v[0],v[1]))}.`,why:`Thay ${X8} = ${sg(x0)}: ${fr(sg(b*x0+c),sg(x0-a))} = ${qh(v)}.`},
    {t:`${I('A')} = 0 khi ${X8} = ${qh(Q(-c,b))}.`,f:`${I('A')} = 0 khi ${X8} = ${sg(a)}.`,why:`${I('A')} = 0 khi tử thức bằng 0 và mẫu thức khác 0: ${xlin(b,c)} = 0 ⟺ ${X8} = ${qh(Q(-c,b))} (khác ${sg(a)}).`}
  ],chk:()=>closeN((b*x0+c)/(x0-a),qv(v))&&qv(Q(-c,b))!==a});
});
TLN8('t8-6-cond',6,'NB',r=>{
  const f=r.int(0,1),p=r.nz(-9,9),q=r.nz(-9,9);
  if(f===0)return{kind:'tln',stem:`Phân thức ${FR8(xlin(1,p),xlin(1,-q))} không xác định khi ${X8} bằng bao nhiêu?`,ans:q,unit:'',
    sol:`Phân thức không xác định khi mẫu thức bằng 0: ${xlin(1,-q)} = 0 ⟺ ${X8} = ${sg(q)}.`};
  if(p===-q)return T.tln['t8-6-cond'].gen(r);
  return{kind:'tln',stem:`Tìm giá trị của ${X8} để phân thức ${FR8(xlin(1,-p),xlin(1,q))} có giá trị bằng 0.`,ans:p,unit:'',
    sol:`Phân thức bằng 0 khi tử thức bằng 0 và mẫu thức khác 0: ${xlin(1,-p)} = 0 ⟺ ${X8} = ${sg(p)}, khi đó mẫu thức ${sg(p+q)} ≠ 0.`};
});
/* Bài 25, 27, 28 */
TLN8('t8-7-lin',7,'TH',r=>{
  for(;;){const a=r.nz(-5,5),b=r.nz(-6,6),c=r.nz(-5,5),x=r.nz(-9,9);if(a===c)continue;const d=a*(x-b)-c*x;
    return{kind:'tln',stem:`Giải phương trình ${a===1?'':a===-1?MINUS:sg(a)}(${X8} ${b<0?'+':MINUS} ${Math.abs(b)}) = ${c===1?'':c===-1?MINUS:sg(c)}${X8} ${d<0?MINUS:'+'} ${Math.abs(d)}.`,ans:x,unit:'',
      sol:`${sg(a)}x ${a*b<0?'+':'−'} ${Math.abs(a*b)} = ${sg(c)}x ${d<0?'−':'+'} ${Math.abs(d)} ⟺ ${sg(a-c)}x = ${sg(d+a*b)} ⟺ x = ${sg(x)}.`.replace(/(^|= |⟺ )1x/g,'$1x').replace(/(^|= |⟺ )−1x/g,'$1−x'),chk:()=>a*(x-b)===c*x+d}}
});
TLN8('t8-7-fx',7,'TH',r=>{
  const a=r.nz(-5,5),b=r.nz(-9,9),f=r.int(0,1);
  if(f===0){const x0=r.nz(-6,6);return{kind:'tln',stem:`Cho hàm số ${I('y')} = ${I('f')}(${X8}) = ${xlin(a,b)}. Tính ${I('f')}(${sg(x0)}).`,ans:a*x0+b,unit:'',sol:`${I('f')}(${sg(x0)}) = ${sg(a)}·(${sg(x0)}) ${b<0?'−':'+'} ${Math.abs(b)} = ${sg(a*x0+b)}.`}}
  const x0=r.nz(-6,6),k=a*x0+b;
  return{kind:'tln',stem:`Cho hàm số ${I('y')} = ${xlin(a,b)}. Tìm giá trị của ${X8} để ${I('y')} = ${sg(k)}.`,ans:x0,unit:'',sol:`${xlin(a,b)} = ${sg(k)} ⟺ ${sg(a)}x = ${sg(k-b)} ⟺ x = ${sg(x0)}.`};
});
/* Bài 30 */
TLN8('t8-8-out',8,'NB',r=>{
  const f=r.int(0,2);
  if(f===0){const [h,L]=r.pick([['là số nguyên tố',[2,3,5]],['là số chẵn',[2,4,6]],['lớn hơn 4',[5,6]],['là số chia hết cho 3',[3,6]],['nhỏ hơn 3',[1,2]]]);
    return{kind:'tln',stem:`Gieo một con xúc xắc sáu mặt. Có bao nhiêu kết quả thuận lợi cho biến cố “Số chấm xuất hiện ${h}”?`,ans:L.length,unit:'',sol:`Các kết quả thuận lợi: ${L.join('; ')}, gồm ${L.length} kết quả.`}}
  if(f===1){const a=r.int(2,9),b=r.int(2,9),c=r.int(1,6);return{kind:'tln',stem:`Một hộp có ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng. Lấy ngẫu nhiên một viên bi. Có bao nhiêu kết quả có thể?`,ans:a+b+c,unit:'',sol:`Mỗi viên bi là một kết quả có thể: ${a} + ${b} + ${c} = ${a+b+c}.`}}
  const N=r.pick([20,30,40,50]),m=r.pick([3,4,5,6,7]),c=Math.floor(N/m);
  return{kind:'tln',stem:`Chọn ngẫu nhiên một số trong các số 1; 2; …; ${N}. Có bao nhiêu kết quả thuận lợi cho biến cố “Số được chọn chia hết cho ${m}”?`,ans:c,unit:'',sol:`Các số chia hết cho ${m}: ${m}; ${2*m}; …; ${c*m}, gồm ${c} số.`};
});
/* Bài 33 */
DS8('ds8-9-ratio',9,'NB',r=>{
  const [p,q]=r.pick([[1,2],[2,3],[3,4],[2,5],[3,5]]),k=Q(p,q),u=r.int(1,4),AB=p*u*2,DE=q*u*2,A=r.int(40,80),P=r.pick([12,18,24,30])*q;
  return mkDS(r,{stem:`Cho ${TRI8('ABC')} ${SIM} ${TRI8('DEF')} theo tỉ số đồng dạng ${qh(k)}, biết ${I('AB')} = ${AB} cm và ∠${I('A')} = ${A}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`∠${I('D')} = ${A}°.`,f:`∠${I('D')} = ${180-A}°.`,why:`Hai tam giác đồng dạng có các góc tương ứng bằng nhau: ∠${I('D')} = ∠${I('A')}.`},
    {t:`${I('DE')} = ${DE} cm.`,f:`${I('DE')} = ${AB*p/q%1===0?AB*p/q:AB+2} cm.`,why:`${fr('AB','DE')} = ${qh(k)} nên ${I('DE')} = ${AB}·${fr(q,p)} = ${DE} cm.`},
    {t:`${TRI8('DEF')} ${SIM} ${TRI8('ABC')} theo tỉ số ${qh(Q(q,p))}.`,f:`${TRI8('DEF')} ${SIM} ${TRI8('ABC')} theo tỉ số ${qh(k)}.`,why:`Nếu ${TRI8('ABC')} ${SIM} ${TRI8('DEF')} theo tỉ số ${I('k')} thì ${TRI8('DEF')} ${SIM} ${TRI8('ABC')} theo tỉ số ${fr(1,I('k'))}.`},
    {t:`Nếu chu vi ${TRI8('DEF')} là ${P} cm thì chu vi ${TRI8('ABC')} là ${P*p/q} cm.`,f:`Nếu chu vi ${TRI8('DEF')} là ${P} cm thì chu vi ${TRI8('ABC')} là ${P*q/p%1===0?P*q/p:P+6} cm.`,why:`Tỉ số chu vi bằng tỉ số đồng dạng ${qh(k)}: ${P}·${qh(k)} = ${P*p/q} cm.`}
  ],chk:()=>DE*p===AB*q&&Number.isInteger(P*p/q)});
});
/* Bài 39: hình chóp tứ giác đều trong thực tế */
TLN8('t8-10-cost',10,'VD',r=>{
  const f=r.int(0,1);
  if(f===0){const a=r.pick([2,2.4,3,3.2,4]),d=r.pick([2,2.5,3,3.5]),p=r.pick([20,25,30,40,50]),S=2*a*d,cost=S*p;
    if(!Number.isInteger(Math.round(cost*100)/100))return T.tln['t8-10-cost'].gen(r);
    return{kind:'tln',stem:`Mái một chòi nghỉ có dạng mặt xung quanh của hình chóp tứ giác đều, cạnh đáy ${fmt(a)} m, trung đoạn ${fmt(d)} m. Tiền lợp mái là ${p} nghìn đồng mỗi mét vuông. Tính tổng tiền lợp mái (đơn vị: nghìn đồng).`,ans:Math.round(cost*100)/100,unit:'',
      sol:`Diện tích xung quanh: ${I('S')}${sub('xq')} = ${fr(1,2)}·(4·${fmt(a)})·${fmt(d)} = ${fmt(S)} m². Tiền lợp mái: ${fmt(S)}·${p} = ${fmt(Math.round(cost*100)/100)} nghìn đồng.`}}
  const a=r.pick([2,3,4,6]),h=r.pick([1.5,2,2.5,3]),V=a*a*h/3;
  return{kind:'tln',stem:`Một chiếc lều có dạng hình chóp tứ giác đều, cạnh đáy ${a} m, chiều cao ${fmt(h)} m. Tính thể tích khoảng không bên trong lều (đơn vị: m³, làm tròn đến hàng phần mười).`,ans:Math.round(V*10)/10,unit:'',
    sol:`${I('V')} = ${fr(1,3)}·${I('S')}${sub('đáy')}·${I('h')} = ${fr(1,3)}·${a}${sup(2)}·${fmt(h)} ${Number.isInteger(V)?'=':'≈'} ${fmt(Math.round(V*1000)/1000)}${Number.isInteger(V)?'':` ≈ ${fmt(Math.round(V*10)/10)}`} m³.`};
});
