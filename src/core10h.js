/* ================================================================
   LỚP 10 – bổ sung câu vận dụng cao (tự luận, ý cuối đề) và dạng cho Bài 7 (27/11/2026)
   Vai trò 'c' là câu tự luận thứ ba của đề, mức Chuẩn/Nâng cao đặt câu vận dụng cao ở đây.
   ================================================================ */
const hk10=les=>Math.min(...les)<=14?1:2;
const N10x=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:10,hk:hk10(les),les});
const TLN10x=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:10,hk:hk10(les),les});
const TL10x=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:10,hk:hk10(les),les});
/* (n/d)·√3 rút gọn */
const r1x=v=>(Math.round(v*10)/10).toFixed(1).replace('.',',');
const s3H=(n,d)=>{const q=Q(n,d);return q[1]===1?`${q[0]===1?'':q[0]}${rt(3)}`:fr(`${q[0]===1?'':q[0]}${rt(3)}`,q[1])};

/* ===================== Bài 7: Các khái niệm mở đầu về vectơ ===================== */
N10x('m10x-7-equal',4,'NB',[7],r=>{
  const [A,B,C,D]=r.pick([['A','B','C','D'],['M','N','P','Q']]),t=r.int(0,2),v=s=>vc(I(s));
  const C3=[[`${v(A+B)}`,v(D+C),[v(C+D),v(A+D),v(B+D)],`ABCD là hình bình hành nên AB và DC cùng hướng, cùng độ dài.`],
    [`${v(A+D)}`,v(B+C),[v(C+B),v(D+A),v(A+C)],`AD và BC cùng hướng, cùng độ dài.`],
    [`${v(C+D)}`,v(B+A),[v(A+B),v(D+C),v(C+B)],`CD và BA cùng hướng, cùng độ dài.`]][t];
  return mkTxt(r,{stem:`Cho hình bình hành ${I(A+B+C+D)}. Vectơ nào sau đây bằng vectơ ${C3[0]}?`,correct:C3[1],wrongs:C3[2],sol:C3[3]+' Hai vectơ bằng nhau khi cùng hướng và cùng độ dài.',chk:()=>true});
});
TLN10x('t10x-7-count',4,'TH',[7],r=>{
  const t=r.chance(.5);
  if(t){const n=r.int(3,8);return{kind:'tln',stem:`Cho ${n} điểm phân biệt. Có bao nhiêu vectơ khác vectơ-không có điểm đầu và điểm cuối là hai trong ${n} điểm đó?`,ans:n*(n-1),unit:'',sol:`Mỗi cặp có thứ tự (điểm đầu, điểm cuối) cho một vectơ: ${n}·${n-1} = ${n*(n-1)}.`,chk:()=>true}}
  return{kind:'tln',stem:`Cho lục giác đều ${I('ABCDEF')} có tâm ${I('O')}. Có bao nhiêu vectơ khác vectơ-không, có điểm đầu và điểm cuối là các điểm ${I('A')}, ${I('B')}, ${I('C')}, ${I('D')}, ${I('E')}, ${I('F')}, ${I('O')}, bằng vectơ ${vc(I('OA'))}?`,ans:3,unit:'',
    sol:'Các vectơ cùng hướng, cùng độ dài với OA (kể cả OA): OA, DO, CB, EF – trừ OA còn lại 3 vectơ: DO, CB, EF.',chk:()=>true};
});

/* ===================== Chương III: Hệ thức lượng (vận dụng cao) ===================== */
TL10x('tl10x-6-tower',3,'VDC','c',[5,6],r=>{
  for(;;){const d=r.int(4,12)*5,a=r.int(25,40),b=a+r.int(12,25);if(b>=80)continue;const h=d*Math.sin(a*RAD10)*Math.sin(b*RAD10)/Math.sin((b-a)*RAD10),AC=d*Math.sin(b*RAD10)/Math.sin((b-a)*RAD10);
    return{kind:'tl',title:'Đo chiều cao không đến được chân',parts:[
      {pts:.5,html:`Để đo chiều cao ${I('CH')} của một ngọn tháp (${I('H')} là chân tháp, không đến được), người ta chọn hai điểm ${I('A')}, ${I('B')} thẳng hàng với ${I('H')} trên mặt đất (${I('B')} nằm giữa ${I('A')} và ${I('H')}) với ${I('AB')} = ${d} m. Từ ${I('A')} và ${I('B')} nhìn đỉnh tháp ${I('C')} dưới các góc nâng lần lượt ${a}${DEG} và ${b}${DEG}. Tính ${I('AC')} (làm tròn đến hàng phần mười của mét).`},
      {pts:.5,html:`Tính chiều cao ${I('CH')} của tháp (làm tròn đến hàng phần mười của mét).`}],
      sol:[ptxt([[`Trong tam giác ABC: ∠CAB = ${a}°, ∠ABC = 180° − ${b}° = ${180-b}°, nên ∠ACB = ${b}° − ${a}° = ${b-a}°.`,.25],[`Theo định lí sin: AC = ${fr(`AB · sin ${180-b}°`,`sin ${b-a}°`)} = ${fr(`${d} · sin ${b}°`,`sin ${b-a}°`)} ≈ ${r1x(AC)} (m).`,.25]]),
        ptxt([[`Tam giác ACH vuông tại H: CH = AC · sin ${a}°.`,.25],[`CH ≈ ${r1x(AC)} · sin ${a}° ≈ ${r1x(h)} (m).`,.25]])],chk:()=>h>0}}
});
const TRI60=[[3,8,7,60],[5,8,7,60],[7,15,13,60],[8,15,13,60],[5,21,19,60],[3,5,7,120],[7,8,13,120],[5,16,19,120]];
TL10x('tl10x-6-radii',3,'VDC','c',[6],r=>{
  const [b0,c0,a0,A]=r.pick(TRI60),k=r.pick([1,1,2]),b=b0*k,c=c0*k,a=a0*k,p2=a+b+c;/* p = p2/2 */
  return{kind:'tl',title:'Giải tam giác',parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c}, ${I('AC')} = ${b} và ${ANG('BAC')} = ${A}${DEG}. Tính độ dài cạnh ${I('BC')} và diện tích tam giác ${I('ABC')}.`},
    {pts:.5,html:`Tính bán kính ${I('R')} của đường tròn ngoại tiếp và bán kính ${I('r')} của đường tròn nội tiếp tam giác ${I('ABC')}.`}],
    sol:[ptxt([[`BC² = AB² + AC² − 2·AB·AC·cos ${A}° = ${c*c} + ${b*b} ${A===60?'−':'+'} ${b*c} = ${a*a}, nên BC = ${a}.`,.25],[`S = ½·AB·AC·sin ${A}° = ½·${c}·${b}·${fr(rt(3),2)} = ${s3H(b*c,4)}.`,.25]]),
      ptxt([[`R = ${fr('BC','2 sin A')} = ${fr(a,rt(3))} = ${s3H(a,3)}.`,.25],[`Nửa chu vi p = ${fmt(p2/2)}; r = ${fr('S','p')} = ${s3H(b*c*2,4*p2)}.`,.25]])],chk:()=>a*a===b*b+c*c-(A===60?1:-1)*b*c};
});

/* ===================== Chương V: Thống kê (vận dụng cao) ===================== */
TL10x('tl10x-14-miss',5,'VDC','c',[13,14],r=>{
  for(;;){const n=r.int(6,8),m=r.int(5,9),xs=[...Array(n-1)].map(()=>m+r.int(-3,3)),x=n*m-xs.reduce((a,b)=>a+b,0);if(x<0||x>10||xs.includes(x)&&r.chance(.5))continue;
    const all=[...xs,x],ss=all.reduce((a,v)=>a+(v-m)**2,0),V=Q(ss,n),sd=Math.sqrt(ss/n);
    return{kind:'tl',title:'Số đặc trưng của mẫu số liệu',parts:[
      {pts:.5,html:`Điểm kiểm tra của ${n} học sinh là: ${xs.join('; ')}; ${I('x')}. Biết số trung bình của mẫu số liệu bằng ${m}. Tìm ${I('x')}.`},
      {pts:.5,html:`Tính phương sai và độ lệch chuẩn của mẫu số liệu (độ lệch chuẩn làm tròn đến hàng phần trăm).`}],
      sol:[ptxt([[`Tổng các giá trị bằng ${n}·${m} = ${n*m}.`,.25],[`x = ${n*m} − (${xs.join(' + ')}) = ${x}.`,.25]]),
        ptxt([[`s² = ${fr(`(${all.map(v=>`(${v} − ${m})²`).slice(0,3).join(' + ')} + …)`,n)} = ${fr(ss,n)}${V[1]!==n?' = '+qh(V):''}.`,.25],[`s = √(${qh(V)}) ≈ ${fmt(Math.round(sd*100)/100)}.`,.25]])],chk:()=>true}}
});
TL10x('tl10x-14-stable',5,'VDC','c',[13,14],r=>{
  for(;;){const m=r.int(6,9),dA=r.shuffle([-1,0,1,0,-1,1]),dB=r.shuffle([-3,2,0,3,-2,0]),A=dA.map(v=>m+v),B=dB.map(v=>m+v);if(Math.max(...B)>10)continue;
    const vA=Q(dA.reduce((a,v)=>a+v*v,0),6),vB=Q(dB.reduce((a,v)=>a+v*v,0),6);
    return{kind:'tl',title:'So sánh độ ổn định',parts:[
      {pts:.5,html:`Kết quả 6 lần bắn của hai xạ thủ (điểm) như sau. Xạ thủ An: ${A.join('; ')}. Xạ thủ Bình: ${B.join('; ')}. Tính điểm trung bình của mỗi xạ thủ.`},
      {pts:.5,html:`Tính phương sai điểm của mỗi xạ thủ. Xạ thủ nào bắn ổn định hơn? Vì sao?`}],
      sol:[ptxt([[`An: ${fr(A.join(' + '),6)} = ${m}.`,.25],[`Bình: ${fr(B.join(' + '),6)} = ${m}.`,.25]]),
        ptxt([[`s²(An) = ${qh(vA)}; s²(Bình) = ${qh(vB)}.`,.25],[`Hai bạn có cùng điểm trung bình, phương sai của An nhỏ hơn nên An bắn ổn định hơn.`,.25]])],chk:()=>vA[0]*vB[1]<vB[0]*vA[1]}}
});

/* ===================== Chương VI: Hàm số bậc hai, tam thức (vận dụng cao) ===================== */
TL10x('tl10x-17-param',6,'VDC','c',[17],r=>{
  for(;;){const a=r.int(-3,3),u=r.int(-4,3),v=u+r.int(2,6),b=2*a+u+v,c=a*a-u*v;if(b===0)continue;const m0=r.int(u+1,v-1),B=m0+a,C=b*m0+c;
    const X=I('x'),M=I('m'),f=`${X}${sup(2)} + 2(${M}${a?` ${a>0?'+':MINUS} ${Math.abs(a)}`:''})${X} ${b>0?'+':MINUS} ${Math.abs(b)===1?'':Math.abs(b)}${M}${c?` ${c>0?'+':MINUS} ${Math.abs(c)}`:''}`;
    const out=u-1<v+1?u-1:u-1,disc=B*B-C;
    return{kind:'tl',title:'Tam thức bậc hai có tham số',parts:[
      {pts:.5,html:`Cho ${I('f')}(${X}) = ${f} (${M} là tham số). Với ${M} = ${sg(out)}, giải bất phương trình ${I('f')}(${X}) ≤ 0.`},
      {pts:.5,html:`Tìm tất cả các giá trị của ${M} để ${I('f')}(${X}) > 0 với mọi ${X} ∈ ℝ.`}],
      sol:[(()=>{const Bo=out+a,Co=b*out+c,D=Bo*Bo-Co;const x1=-Bo-Math.sqrt(D),x2=-Bo+Math.sqrt(D);
          return ptxt([[`Với m = ${sg(out)}: f(x) = ${ph(Pl.from([{c:1,ex:2},{c:2*Bo,ex:1},{c:Co,ex:0}]))}, Δ′ = ${Bo*Bo} − (${sg(Co)}) = ${D}${D>0&&Number.isInteger(Math.sqrt(D))?`, hai nghiệm x = ${sg(x1)}, x = ${sg(x2)}`:D>0?`, hai nghiệm x = ${sg(-Bo)} ± ${sqH(D)}`:''}.`,.25],
            [D>0?`f(x) ≤ 0 ⟺ ${Number.isInteger(Math.sqrt(D))?`${sg(x1)} ≤ x ≤ ${sg(x2)}`:`${sg(-Bo)} − ${sqH(D)} ≤ x ≤ ${sg(-Bo)} + ${sqH(D)}`}.`:D===0?`f(x) ≤ 0 ⟺ x = ${sg(-Bo)}.`:'Bất phương trình vô nghiệm.',.25]])})(),
        ptxt([[`f(x) > 0 với mọi x ⟺ Δ′ < 0 (hệ số của x² là 1 > 0). Δ′ = (m ${a?`${a>0?'+':'−'} ${Math.abs(a)}`:''})² − (${b===1?'':b===-1?'−':sg(b)}m ${c?`${c>0?'+':'−'} ${Math.abs(c)}`:''}) = ${ph(Pl.from([{c:1,ex:2},{c:-(u+v),ex:1},{c:u*v,ex:0}])).replace(/x/g,'m')}.`,.25],[`Δ′ < 0 ⟺ ${sg(u)} < m < ${sg(v)}.`,.25]])],chk:()=>disc<0}}
});
TL10x('tl10x-16-price',6,'VDC','c',[16],r=>{
  for(;;){const p0=r.int(30,60),N0=r.int(20,60)*10,d=r.pick([1,2]),k=r.pick([10,20,30,40]),cost=r.int(15,p0-8);
    /* giảm x lần, mỗi lần d nghìn: giá p0 − dx, bán N0 + kx; lợi nhuận L(x) = (p0 − dx − cost)(N0 + kx) */
    const A=-d*k,B=(p0-cost)*k-d*N0,x=-B/(2*A);if(!Number.isInteger(x)||x<=0||p0-d*x<=cost)continue;const L=(p0-d*x-cost)*(N0+k*x);
    return{kind:'tl',title:'Bài toán tối ưu',parts:[
      {pts:.5,html:`Một cửa hàng bán một loại áo với giá ${p0} nghìn đồng mỗi chiếc thì mỗi tháng bán được ${N0} chiếc. Cửa hàng ước tính cứ giảm giá ${d} nghìn đồng mỗi chiếc thì bán thêm được ${k} chiếc mỗi tháng. Giá nhập mỗi chiếc là ${cost} nghìn đồng. Gọi ${I('x')} là số lần giảm giá (mỗi lần ${d} nghìn đồng). Viết hàm số ${I('L')}(${I('x')}) biểu thị lợi nhuận mỗi tháng.`},
      {pts:.5,html:`Cửa hàng nên bán với giá bao nhiêu để lợi nhuận mỗi tháng lớn nhất? Tính lợi nhuận lớn nhất đó.`}],
      sol:[ptxt([[`Giá bán ${p0} − ${d===1?'':d}x (nghìn đồng), số áo bán ${N0} + ${k}x.`,.25],[`L(x) = (${p0-cost} − ${d===1?'':d}x)(${N0} + ${k}x) = ${ph(Pl.from([{c:A,ex:2},{c:B,ex:1},{c:(p0-cost)*N0,ex:0}]))} (nghìn đồng).`,.25]]),
        ptxt([[`L(x) là hàm bậc hai có hệ số a = ${A} < 0, đạt giá trị lớn nhất tại x = ${fr(`−(${B})`,`2·(${A})`)} = ${x}.`,.25],[`Giá bán ${p0} − ${d}·${x} = ${p0-d*x} nghìn đồng; lợi nhuận lớn nhất ${nv(L)} nghìn đồng.`,.25]])],chk:()=>true}}
});

/* ===================== Chương IX: Xác suất (vận dụng cao) ===================== */
TL10x('tl10x-27-seat',9,'VDC','c',[26,27],r=>{
  const n=r.int(3,5),N=fact10(2*n),alt=2*fact10(n)*fact10(n),adj=2*fact10(2*n-1);
  return{kind:'tl',title:'Xác suất khi xếp chỗ',parts:[
    {pts:.5,html:`Xếp ngẫu nhiên ${n} bạn nam và ${n} bạn nữ (trong đó có bạn An là nam và bạn Bình là nữ) ngồi thành một hàng ngang ${2*n} ghế. Tính xác suất để nam và nữ ngồi xen kẽ nhau.`},
    {pts:.5,html:`Tính xác suất để An và Bình ngồi cạnh nhau.`}],
    sol:[ptxt([[`n(Ω) = ${2*n}! = ${nv(N)}. Xen kẽ: chọn vị trí bắt đầu là nam hay nữ (2 cách), xếp nam ${n}! cách, xếp nữ ${n}! cách: ${nv(alt)} cách.`,.25],[`P = ${fr(nv(alt),nv(N))} = ${qh(Q(alt,N))}.`,.25]]),
      ptxt([[`Coi An và Bình là một “khối”: xếp ${2*n-1} đối tượng có ${2*n-1}! cách, đổi chỗ trong khối 2 cách: ${nv(adj)} cách.`,.25],[`P = ${fr(nv(adj),nv(N))} = ${qh(Q(adj,N))}.`,.25]])],chk:()=>true};
});
TL10x('tl10x-27-digits',9,'VDC','c',[27],r=>{
  const n=r.int(5,7),ds=[...Array(n+1)].map((_,i)=>i),tot=cnt10(ds,3,true),ev=cnt10(ds,3,true,v=>v%2===0),f5=cnt10(ds,3,true,v=>v%5===0),E=[2,4,6].filter(e=>e<=n).length;
  return{kind:'tl',title:'Xác suất với các số tự nhiên',parts:[
    {pts:.5,html:`Gọi ${I('S')} là tập hợp các số tự nhiên có ba chữ số đôi một khác nhau được lập từ các chữ số ${ds.join(', ')}. Chọn ngẫu nhiên một số từ ${I('S')}. Tính xác suất để số được chọn là số chẵn.`},
    {pts:.5,html:`Tính xác suất để số được chọn chia hết cho 5.`}],
    sol:[ptxt([[`n(Ω) = ${n}·${n}·${n-1} = ${tot} (chữ số hàng trăm khác 0). Số chẵn tận cùng 0: ${n}·${n-1} = ${n*(n-1)}; tận cùng ${[2,4,6].filter(e=>e<=n).join(', ')}: ${E}·${n-1}·${n-1} = ${E*(n-1)*(n-1)}.`,.25],[`Có ${ev} số chẵn; P = ${fr(ev,tot)} = ${qh(Q(ev,tot))}.`,.25]]),
      ptxt([[`Tận cùng 0: ${n*(n-1)} số; tận cùng 5: ${n-1}·${n-1} = ${(n-1)*(n-1)} số; tổng ${f5} số.`,.25],[`P = ${fr(f5,tot)} = ${qh(Q(f5,tot))}.`,.25]])],chk:()=>tot===n*n*(n-1)&&ev===n*(n-1)+E*(n-1)*(n-1)&&f5===n*(n-1)+(n-1)*(n-1)};
});
