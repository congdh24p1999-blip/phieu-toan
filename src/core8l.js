/* ================================================================
   LỚP 8 – bổ sung dạng câu cho các bài còn ít dạng (27/11/2026)
   Bài 1 – 20: học kì I; Bài 21 – 39: học kì II.
   ================================================================ */
const hk8=les=>Math.min(...les)<=20?1:2;
const N8x=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:8,hk:hk8(les),les});
const DS8x=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:8,hk:hk8(les),les});
const TLN8x=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:8,hk:hk8(les),les});
const TL8x=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:8,hk:hk8(les),les});
const mo8=(c,ex,ey)=>ph(Pl.m(c,ex,ey));/* đơn thức c·xᵉˣ·yᵉʸ */

/* ===================== Bài 1: Đơn thức ===================== */
N8x('m8x-1-like',1,'NB',[1],r=>{
  for(;;){const a=r.int(1,4),b=r.int(1,4),c=r.nz(-7,7),d=r.nz(-9,9);if(a===b)continue;
    return mkTxt(r,{stem:`Đơn thức nào sau đây đồng dạng với đơn thức ${mo8(c,a,b)}?`,correct:mo8(d,a,b),wrongs:[mo8(d,b,a),mo8(c,a+1,b),mo8(c,a,0),`${mo8(c,a,b)}${I('z')}`],
      sol:`Hai đơn thức đồng dạng có hệ số khác 0 và cùng phần biến. Phần biến của đơn thức đã cho là ${monoHTML(a,b)}.`,chk:()=>true})}
});
TLN8x('t8x-1-deg',1,'TH',[1],r=>{
  const a=r.int(1,4),b=r.int(1,4),c=r.int(1,3),d=r.int(1,4),p=r.nz(-6,6),q=r.nz(-6,6),t=r.chance(.5);
  return t?{kind:'tln',stem:`Thu gọn đơn thức ${mo8(p,a,b)}·${q<0?'(':''}${mo8(q,c,d)}${q<0?')':''} rồi cho biết bậc của đơn thức thu được.`,ans:a+b+c+d,unit:'',sol:`${mo8(p,a,b)}·${q<0?'(':''}${mo8(q,c,d)}${q<0?')':''} = ${mo8(p*q,a+c,b+d)}, có bậc ${a+c} + ${b+d} = ${a+b+c+d}.`,chk:()=>true}
    :{kind:'tln',stem:`Thu gọn đơn thức ${mo8(p,a,b)}·${q<0?'(':''}${mo8(q,c,d)}${q<0?')':''} rồi cho biết hệ số của đơn thức thu được.`,ans:p*q,unit:'',sol:`${mo8(p,a,b)}·${q<0?'(':''}${mo8(q,c,d)}${q<0?')':''} = ${mo8(p*q,a+c,b+d)}, có hệ số ${sg(p*q)}.`,chk:()=>true};
});
TL8x('tl8x-1-mono',1,'TH','alg',[1],r=>{
  for(;;){const p=r.nz(-4,4),q=r.nz(-4,4),a=r.int(1,2),b=r.int(1,2),c=r.int(1,2),d=r.int(1,2),x=r.nz(-2,2),y=r.nz(-2,2),A=Pl.m(p*q,a+c,b+d),v=Pl.ev(A,x,y);if(Math.abs(v)>500)continue;
    return{kind:'tl',title:'Đơn thức',parts:[{pts:.5,html:`Thu gọn đơn thức ${I('A')} = (${mo8(p,a,b)})·(${mo8(q,c,d)}). Chỉ ra hệ số, phần biến và bậc của ${I('A')}.`},{pts:.5,html:`Tính giá trị của ${I('A')} tại ${I('x')} = ${sg(x)}, ${I('y')} = ${sg(y)}.`}],
      sol:[ptxt([[`A = (${sg(p)}·${pz(q)})·(${monoHTML(a,0)}·${monoHTML(c,0)})·(${monoHTML(0,b)}·${monoHTML(0,d)}) = ${ph(A)}.`,.25],[`Hệ số ${sg(p*q)}; phần biến ${monoHTML(a+c,b+d)}; bậc ${a+b+c+d}.`,.25]]),
        ptxt([[`Thay x = ${sg(x)}, y = ${sg(y)}: A = ${sg(p*q)}·(${sg(x)})${sup(a+c)}·(${sg(y)})${sup(b+d)}`,.25],[`= ${sg(v)}.`,.25]])],chk:()=>true}}
});

/* ===================== Bài 3: Cộng, trừ đa thức ===================== */
const rP8=r=>Pl.from([{c:r.nz(-5,5),ex:2,ey:0},{c:r.nz(-5,5),ex:1,ey:1},{c:r.nz(-5,5),ex:0,ey:2},{c:r.int(-6,6),ex:0,ey:0}]);
N8x('m8x-3-sub',1,'TH',[3],r=>{
  for(;;){const P=rP8(r),Q=rP8(r),R=Pl.sub(P,Q);if(Object.keys(R).length<3)continue;
    const W=[Pl.add(P,Q),Pl.sub(Q,P),Pl.add(Pl.sub(P,Q),Pl.m(2*(Q['0,0']||1),0,0))];
    return mkPoly(r,{stem:`Cho ${I('P')} = ${ph(P)} và ${I('Q')} = ${ph(Q)}. Đa thức ${I('P')} ${MINUS} ${I('Q')} là`,correct:R,wrongs:W,sol:`Bỏ ngoặc (đổi dấu các hạng tử của Q) rồi cộng các hạng tử đồng dạng: P − Q = ${ph(R)}.`,chk:()=>true})}
});
TLN8x('t8x-3-val',1,'TH',[3],r=>{
  for(;;){const P=rP8(r),Q=rP8(r),t=r.chance(.5),R=t?Pl.add(P,Q):Pl.sub(P,Q),x=r.nz(-3,3),y=r.nz(-3,3),v=Pl.ev(R,x,y);if(Math.abs(v)>999)continue;
    return{kind:'tln',stem:`Cho hai đa thức ${I('P')} = ${ph(P)} và ${I('Q')} = ${ph(Q)}. Tính giá trị của ${I('P')} ${t?'+':MINUS} ${I('Q')} tại ${I('x')} = ${sg(x)}, ${I('y')} = ${sg(y)}.`,ans:v,unit:'',
      sol:`P ${t?'+':'−'} Q = ${ph(R)}. Thay x = ${sg(x)}, y = ${sg(y)} được ${sg(v)}.`,chk:()=>true}}
});

/* ===================== Bài 5: Chia đa thức cho đơn thức ===================== */
DS8x('ds8x-5-div',1,'NB',[5],r=>{
  const a=r.int(3,5),b=r.int(2,4);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`Đơn thức ${mo8(6,a,b)} chia hết cho đơn thức ${mo8(2,a-1,b-1)}.`,f:`Đơn thức ${mo8(6,a-1,b)} chia hết cho đơn thức ${mo8(2,a,b-1)}.`,why:'Đơn thức A chia hết cho B (B ≠ 0) khi mỗi biến của B đều có trong A với số mũ không lớn hơn.'},
    {t:`${mo8(6,a,b)} : ${mo8(2,a-1,b-1)} = ${mo8(3,1,1)}.`,f:`${mo8(6,a,b)} : ${mo8(2,a-1,b-1)} = ${mo8(3,2,2)}.`,why:`Chia hệ số 6 : 2 = 3, trừ số mũ từng biến: x${sup(a)}:x${sup(a-1)} = x; y${sup(b)}:y${sup(b-1)} = y.`},
    {t:`Đa thức ${ph(Pl.from([{c:4,ex:a,ey:1},{c:-2,ex:2,ey:b}]))} chia hết cho đơn thức ${mo8(2,2,1)}.`,f:`Đa thức ${ph(Pl.from([{c:4,ex:a,ey:1},{c:-2,ex:1,ey:b}]))} chia hết cho đơn thức ${mo8(2,2,1)}.`,why:'Đa thức chia hết cho đơn thức khi mọi hạng tử đều chia hết cho đơn thức đó; hạng tử có x với số mũ 1 không chia hết cho x².'},
    {t:`Thương của phép chia ${mo8(-8,a,b)} cho ${mo8(4,a,b)} là ${sg(-2)}.`,f:`Thương của phép chia ${mo8(-8,a,b)} cho ${mo8(4,a,b)} là 2.`,why:'Hai đơn thức cùng phần biến, thương là −8 : 4 = −2.'}],chk:()=>true});
});
TLN8x('t8x-5-val',1,'TH',[5],r=>{
  for(;;){const k=r.int(2,4),p=r.nz(-4,4),q=r.nz(-4,4),s=r.nz(-4,4),A=Pl.from([{c:k*p,ex:3,ey:2},{c:k*q,ex:2,ey:3},{c:k*s,ex:2,ey:2}]),Qt=Pl.from([{c:p,ex:1,ey:0},{c:q,ex:0,ey:1},{c:s,ex:0,ey:0}]),x=r.nz(-4,4),y=r.nz(-4,4),v=Pl.ev(Qt,x,y);
    return{kind:'tln',stem:`Cho ${I('M')} = (${ph(A)}) : ${mo8(k,2,2)}. Tính giá trị của ${I('M')} tại ${I('x')} = ${sg(x)}, ${I('y')} = ${sg(y)}.`,ans:v,unit:'',
      sol:`Chia từng hạng tử cho ${mo8(k,2,2)}: M = ${ph(Qt)}. Thay x = ${sg(x)}, y = ${sg(y)}: M = ${sg(v)}.`,chk:()=>true}}
});

/* ===================== Bài 7, 8: Lập phương, tổng và hiệu hai lập phương ===================== */
N8x('m8x-7-expand',2,'NB',[7],r=>{
  const a=r.int(1,5),s=r.chance(.5)?1:-1,X=Pl.m(1,1,0),A=Pl.C(s*a),ok=Pl.pow(Pl.add(X,A),3);
  const W=[Pl.add(Pl.pow(X,3),Pl.C(s*a*a*a)),Pl.from([{c:1,ex:3},{c:s*a,ex:2},{c:a*a,ex:1},{c:s*a*a*a,ex:0}]),Pl.from([{c:1,ex:3},{c:-3*s*a,ex:2},{c:3*a*a,ex:1},{c:-s*a*a*a,ex:0}]),Pl.from([{c:1,ex:3},{c:3*s*a,ex:2},{c:3*a*a,ex:1},{c:s*a,ex:0}])];
  return mkPoly(r,{stem:`Khai triển (${ph(Pl.add(X,A))})${sup(3)} ta được`,correct:ok,wrongs:W,sol:`(A ${s>0?'+':'−'} B)³ = A³ ${s>0?'+':'−'} 3A²B + 3AB² ${s>0?'+':'−'} B³ với A = x, B = ${a}: ${ph(ok)}.`,chk:()=>true});
});
TLN8x('t8x-7-fast',2,'TH',[7],r=>{
  for(;;){const k=r.int(1,4),s=r.chance(.6)?1:-1,n=r.int(6,21),x=n-s*k,v=n**3;if(x<=0||v>9999)continue;
    const P=Pl.pow(Pl.add(Pl.m(1,1,0),Pl.C(s*k)),3);
    return{kind:'tln',stem:`Tính giá trị của biểu thức ${ph(P)} tại ${I('x')} = ${x}.`,ans:v,unit:'',sol:`${ph(P)} = (x ${s>0?'+':'−'} ${k})³. Tại x = ${x}: (${x} ${s>0?'+':'−'} ${k})³ = ${n}³ = ${v}.`,chk:()=>true}}
});
TL8x('tl8x-7-cube',2,'TH','alg',[7,8],r=>{
  const k=r.int(1,4),s=r.chance(.5)?1:-1,P=Pl.pow(Pl.add(Pl.m(1,1,0),Pl.C(s*k)),3),n=r.int(5,12),x=n-s*k,a=r.int(1,4),Q=Pl.sub(Pl.pow(Pl.m(1,1,0),3),Pl.C(a**3));
  return{kind:'tl',title:'Hằng đẳng thức',parts:[{pts:.5,html:`Viết biểu thức ${ph(P)} dưới dạng lập phương của một ${s>0?'tổng':'hiệu'}, rồi tính giá trị của biểu thức tại ${I('x')} = ${x}.`},{pts:.5,html:`Viết đa thức ${ph(Q)} dưới dạng tích.`}],
    sol:[ptxt([[`${ph(P)} = x³ ${s>0?'+':'−'} 3·x²·${k} + 3·x·${k}² ${s>0?'+':'−'} ${k}³ = (x ${s>0?'+':'−'} ${k})³.`,.25],[`Tại x = ${x}: (${x} ${s>0?'+':'−'} ${k})³ = ${n}³ = ${n**3}.`,.25]]),
      ptxt([[`${ph(Q)} = x³ − ${a}³`,.25],[`= (x − ${a})(${ph(Pl.from([{c:1,ex:2},{c:a,ex:1},{c:a*a,ex:0}]))}).`,.25]])],chk:()=>true};
});
N8x('m8x-8-fact',2,'NB',[8],r=>{
  const a=r.int(1,5),s=r.chance(.5)?1:-1,X=I('x');
  const tri=(b,c)=>ph(Pl.from([{c:1,ex:2},{c:b,ex:1},{c:c,ex:0}]));
  const ok=`(${X} ${s>0?'+':MINUS} ${a})(${tri(-s*a,a*a)})`;
  return mkTxt(r,{stem:`Đa thức ${X}${sup(3)} ${s>0?'+':MINUS} ${a**3} được viết dưới dạng tích là`,correct:ok,wrongs:[`(${X} ${s>0?'+':MINUS} ${a})(${tri(s*a,a*a)})`,`(${X} ${s>0?MINUS:'+'} ${a})(${tri(-s*a,a*a)})`,`(${X} ${s>0?'+':MINUS} ${a})(${tri(-2*s*a,a*a)})`,`(${X} ${s>0?'+':MINUS} ${a})${sup(3)}`],
    sol:`A³ ${s>0?'+':'−'} B³ = (A ${s>0?'+':'−'} B)(A² ${s>0?'−':'+'} AB + B²) với A = x, B = ${a}.`,chk:()=>true});
});
TLN8x('t8x-8-val',2,'TH',[8],r=>{
  for(;;){const a=r.int(1,5),s=r.chance(.5)?1:-1,n=r.int(3,20),v=n**3+s*a**3;if(v>9999||v<=0)continue;
    return{kind:'tln',stem:`Tính giá trị của biểu thức (${I('x')} ${s>0?'+':MINUS} ${a})(${ph(Pl.from([{c:1,ex:2},{c:-s*a,ex:1},{c:a*a,ex:0}]))}) tại ${I('x')} = ${n}.`,ans:v,unit:'',
      sol:`Biểu thức bằng x³ ${s>0?'+':'−'} ${a**3}. Tại x = ${n}: ${n**3} ${s>0?'+':'−'} ${a**3} = ${v}.`,chk:()=>true}}
});

/* ===================== Bài 11: Hình thang cân ===================== */
TL8x('tl8x-11-trap',3,'VD','geo',[11],r=>{
  const d=r.int(9,16)*5;
  return{kind:'tl',title:'Hình thang cân',parts:[{pts:.5,html:`Cho hình thang cân ${I('ABCD')} (${I('AB')} ∥ ${I('CD')}, ${I('AB')} < ${I('CD')}) có ${ANG('D')} = ${d}°. Tính số đo các góc ${ANG('C')}, ${ANG('A')}, ${ANG('B')}.`},{pts:.5,html:`Chứng minh ${I('ΔADC')} = ${I('ΔBCD')}, từ đó suy ra ${I('AC')} = ${I('BD')}.`}],
    sol:[ptxt([[`Hình thang cân có hai góc kề đáy bằng nhau: ∠C = ∠D = ${d}°.`,.25],[`AB ∥ CD nên ∠A + ∠D = 180°: ∠A = ∠B = ${180-d}°.`,.25]]),
      ptxt([[`Xét ΔADC và ΔBCD: AD = BC (hình thang cân), ∠ADC = ∠BCD, DC là cạnh chung.`,.25],[`Nên ΔADC = ΔBCD (c.g.c), suy ra AC = BD.`,.25]])],chk:()=>true};
});

/* ===================== Bài 17: Tính chất đường phân giác ===================== */
const bis8=r=>{for(;;){const b=r.int(4,15),c=r.int(4,15);if(b===c)continue;const g=(b+c)/gcd(b+c,c),a=g*r.int(1,4);if(!(a<b+c&&a>Math.abs(b-c)))continue;return{a,b,c,db:a*c/(b+c),dc:a*b/(b+c)}}};
DS8x('ds8x-17-bis',4,'TH',[17],r=>{
  const {a,b,c,db,dc}=bis8(r);
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c} cm, ${I('AC')} = ${b} cm, ${I('BC')} = ${a} cm; ${I('AD')} là đường phân giác của ${ANG('BAC')} (${I('D')} ∈ ${I('BC')}). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${fr(I('DB'),I('DC'))} = ${fr(c,b)}.`,f:`${fr(I('DB'),I('DC'))} = ${fr(b,c)}.`,why:'Tính chất đường phân giác: DB/DC = AB/AC.'},
    {t:`${I('DB')} = ${fmt(db)} cm.`,f:`${I('DB')} = ${fmt(dc)} cm.`,why:`DB = BC·AB/(AB + AC) = ${a}·${c}/${b+c} = ${fmt(db)} (cm).`},
    {t:`${I('DC')} = ${fmt(dc)} cm.`,f:`${I('DC')} = ${fmt(dc+1)} cm.`,why:`DC = BC − DB = ${a} − ${fmt(db)} = ${fmt(dc)} (cm).`},
    {t:`${I('D')} ${c<b?'gần':'xa'} ${I('B')} hơn ${I('C')}.`,f:`${I('D')} ${c<b?'xa':'gần'} ${I('B')} hơn ${I('C')}.`,why:`DB = ${fmt(db)} cm, DC = ${fmt(dc)} cm.`}],chk:()=>db!==dc});
});
TL8x('tl8x-17-bis',4,'VD','geo',[15,17],r=>{
  for(;;){const {a,b,c,db,dc}=bis8(r),de=c*dc/a;if(!isInt(de*2))continue;
    return{kind:'tl',title:'Đường phân giác của tam giác',parts:[{pts:.5,html:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${c} cm, ${I('AC')} = ${b} cm, ${I('BC')} = ${a} cm. Đường phân giác ${I('AD')} của ${ANG('BAC')} (${I('D')} ∈ ${I('BC')}). Tính ${I('DB')} và ${I('DC')}.`},{pts:.5,html:`Qua ${I('D')} kẻ đường thẳng song song với ${I('AB')}, cắt ${I('AC')} tại ${I('E')}. Tính ${I('DE')}.`}],
      sol:[ptxt([[`Theo tính chất đường phân giác: DB/DC = AB/AC = ${c}/${b}, nên DB/${c} = DC/${b} = BC/${b+c} = ${a}/${b+c}.`,.25],[`DB = ${fmt(db)} cm; DC = ${fmt(dc)} cm.`,.25]]),
        ptxt([[`DE ∥ AB nên theo hệ quả của định lí Thalès: DE/AB = CD/CB.`,.25],[`DE = ${c}·${fmt(dc)}/${a} = ${fmt(de)} (cm).`,.25]])],chk:()=>true}}
});

/* ===================== Bài 18: Thu thập và phân loại dữ liệu ===================== */
const D8={dt:['Màu sắc yêu thích của học sinh','Loại phương tiện đến trường','Tên các môn thể thao','Mức độ hài lòng (Rất hài lòng, Hài lòng, Không hài lòng)','Nơi sinh của học sinh'],rr:['Số học sinh vắng mặt mỗi ngày','Số anh chị em ruột của mỗi bạn','Số bàn thắng trong mỗi trận đấu','Số quyển sách mỗi bạn đọc trong tháng'],lt:['Chiều cao (cm) của học sinh','Cân nặng (kg) của học sinh','Nhiệt độ (°C) cao nhất trong ngày','Thời gian (phút) chạy 1 000 m']};
N8x('m8x-18-type',5,'NB',[18],r=>{
  const t=r.int(0,2),K=['dt','rr','lt'][t],NM=['định tính','định lượng rời rạc','định lượng liên tục'][t],others=['dt','rr','lt'].filter(k=>k!==K);
  return mkTxt(r,{stem:`Dữ liệu nào sau đây là dữ liệu ${NM}?`,correct:r.pick(D8[K]),wrongs:r.shuffle([...D8[others[0]],...D8[others[1]]]).slice(0,3),
    sol:`Dữ liệu định tính không biểu diễn bằng số; dữ liệu định lượng là số, rời rạc nếu đếm được (số nguyên), liên tục nếu đo được (có thể nhận mọi giá trị trong một khoảng).`,chk:()=>true});
});
DS8x('ds8x-18-class',5,'NB',[18],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Số học sinh vắng mặt mỗi ngày của một lớp là dữ liệu định lượng rời rạc.',f:'Số học sinh vắng mặt mỗi ngày của một lớp là dữ liệu định tính.',why:'Dữ liệu là số và chỉ nhận các giá trị đếm được.'},
  {t:'Chiều cao của học sinh là dữ liệu định lượng liên tục.',f:'Chiều cao của học sinh là dữ liệu định lượng rời rạc.',why:'Chiều cao là số đo, có thể nhận mọi giá trị trong một khoảng.'},
  {t:'Màu sắc yêu thích của học sinh là dữ liệu định tính.',f:'Màu sắc yêu thích của học sinh là dữ liệu định lượng.',why:'Dữ liệu không biểu diễn bằng số.'},
  {t:'Có thể thu thập nhiệt độ hằng ngày của một địa phương từ bản tin dự báo thời tiết.',f:'Chỉ có thể thu thập nhiệt độ hằng ngày bằng cách phỏng vấn người dân.',why:'Bản tin thời tiết là nguồn dữ liệu thứ cấp đáng tin cậy.'}],chk:()=>true}));
TLN8x('t8x-18-count',5,'TH',[18],r=>{
  const xs=r.shuffle([...r.shuffle(D8.dt).slice(0,r.int(1,3)),...r.shuffle(D8.rr).slice(0,r.int(1,2)),...r.shuffle(D8.lt).slice(0,r.int(1,2))]),t=r.chance(.5),v=xs.filter(x=>t?D8.dt.includes(x):!D8.dt.includes(x)).length;
  return{kind:'tln',stem:`Cho các dữ liệu sau: ${xs.map((x,i)=>`(${i+1}) ${x.charAt(0).toLowerCase()+x.slice(1)}`).join('; ')}. Có bao nhiêu dữ liệu là dữ liệu ${t?'định tính':'định lượng'}?`,ans:v,unit:'',
    sol:`Dữ liệu ${t?'định tính (không phải số)':'định lượng (là số)'}: ${xs.filter(x=>t?D8.dt.includes(x):!D8.dt.includes(x)).map(x=>x.toLowerCase()).join('; ')} – có ${v} dữ liệu.`,chk:()=>v>0};
});
N8x('m8x-18-valid',5,'TH',[18],r=>{
  for(;;){const n=r.int(30,45),xs=[r.int(8,18),r.int(8,18),r.int(5,14)],S=xs.reduce((a,b)=>a+b,0);if(S<=n||S>n+12)continue;
    return mkTxt(r,{stem:`Lớp 8A có ${n} học sinh, mỗi bạn chọn đúng một môn thể thao yêu thích. Bạn lớp trưởng báo cáo: ${xs[0]} bạn chọn bóng đá, ${xs[1]} bạn chọn cầu lông, ${xs[2]} bạn chọn bóng rổ. Nhận xét nào sau đây đúng?`,correct:`Số liệu không hợp lí vì tổng số bạn (${S}) lớn hơn sĩ số lớp (${n})`,
      wrongs:[`Số liệu hợp lí vì mỗi môn đều có người chọn`,`Số liệu không hợp lí vì số bạn chọn bóng rổ ít nhất`,`Số liệu hợp lí vì tổng số bạn lớn hơn ${n-5}`],sol:`${xs.join(' + ')} = ${S} > ${n} trong khi mỗi bạn chỉ chọn một môn, nên số liệu không hợp lí.`,chk:()=>true})}
});

/* ===================== Bài 24: Nhân, chia phân thức ===================== */
TLN8x('t8x-24-val',6,'TH',[24],r=>{
  for(;;){const a=r.int(1,6),b=r.int(1,6),n=r.int(2,15),t=r.chance(.5);if(a===b||n===a||n===-b)continue;const X=I('x'),v=t?n+a:n-a;
    const L=fr(`${X}${sup(2)} ${MINUS} ${a*a}`,`${X} + ${b}`),R=fr(`${X} + ${b}`,`${X} ${t?MINUS:'+'} ${a}`);
    return{kind:'tln',stem:`Rút gọn biểu thức ${I('P')} = ${L} · ${R} rồi tính giá trị của ${I('P')} tại ${I('x')} = ${n}.`,ans:v,unit:'',
      sol:`P = (x − ${a})(x + ${a})(x + ${b}) / [(x + ${b})(x ${t?'−':'+'} ${a})] = x ${t?'+':'−'} ${a} (với điều kiện xác định). Tại x = ${n}: P = ${v}.`,chk:()=>true}}
});

/* ===================== Bài 37: Hình đồng dạng ===================== */
DS8x('ds8x-37-sim',9,'NB',[37],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Hai hình tròn bất kì luôn đồng dạng với nhau.',f:'Hai hình tròn có bán kính khác nhau thì không đồng dạng.',why:'Hình tròn này là hình phóng to (thu nhỏ) của hình tròn kia.'},
  {t:'Hai hình vuông bất kì luôn đồng dạng với nhau.',f:'Hai hình vuông có cạnh khác nhau thì không đồng dạng.',why:'Mọi hình vuông có cùng hình dạng, chỉ khác kích thước.'},
  {t:'Hai hình chữ nhật không phải lúc nào cũng đồng dạng với nhau.',f:'Hai hình chữ nhật bất kì luôn đồng dạng với nhau.',why:'Hình chữ nhật 1 × 2 và 1 × 5 có tỉ số các cạnh khác nhau nên không đồng dạng.'},
  {t:'Trong phép đồng dạng phối cảnh, các đường thẳng nối các điểm tương ứng cùng đi qua một điểm.',f:'Trong phép đồng dạng phối cảnh, các đường thẳng nối các điểm tương ứng song song với nhau.',why:'Điểm chung đó là tâm của phép đồng dạng phối cảnh (phép vị tự).'}],chk:()=>true}));
N8x('m8x-37-map',9,'TH',[37],r=>{
  const k=r.pick([10000,20000,25000,50000,100000]),d=r.int(2,15),m=d*k/100000;
  return mkNum(r,{stem:`Trên một bản đồ có tỉ lệ 1 : ${nv(k)}, khoảng cách giữa hai địa điểm là ${d} cm. Khoảng cách thực tế giữa hai địa điểm đó là`,correct:m,f:x=>`${fmt(x)} km`,cands:[m*10,m/10,d*k/1000,m+1].filter(x=>x>0),ok:x=>x>0,
    sol:`Khoảng cách thực tế: ${d}·${nv(k)} = ${nv(d*k)} (cm) = ${fmt(m)} km.`,chk:()=>true});
});
TLN8x('t8x-37-ratio',9,'TH',[37],r=>{
  const k=r.pick([2,3,4,5]),a=r.int(2,9),b=a+r.int(1,6),t=r.chance(.5);
  return t?{kind:'tln',stem:`Một bức ảnh hình chữ nhật kích thước ${a} cm × ${b} cm được phóng to thành bức ảnh đồng dạng với tỉ số ${k}. Tính chu vi bức ảnh mới (đơn vị: cm).`,ans:2*k*(a+b),unit:'cm',sol:`Ảnh mới có kích thước ${k*a} cm × ${k*b} cm; chu vi 2·(${k*a} + ${k*b}) = ${2*k*(a+b)} (cm).`,chk:()=>true}
    :{kind:'tln',stem:`Tam giác ${I('A′B′C′')} đồng dạng với tam giác ${I('ABC')} theo tỉ số ${k}. Biết chu vi tam giác ${I('ABC')} là ${a+b+a} cm. Tính chu vi tam giác ${I('A′B′C′')} (đơn vị: cm).`,ans:k*(2*a+b),unit:'cm',sol:`Các cạnh tương ứng tỉ lệ với tỉ số ${k} nên chu vi cũng gấp ${k} lần: ${k}·${2*a+b} = ${k*(2*a+b)} (cm).`,chk:()=>true};
});
TL8x('tl8x-37-photo',9,'VD','geo',[37],r=>{
  const a=r.pick([4,6,8,10]),b=a+r.pick([2,4,5,6]),k=r.pick([2,3,4]),L=k*b;
  return{kind:'tl',title:'Hình đồng dạng trong thực tiễn',parts:[{pts:.5,html:`Một tấm ảnh hình chữ nhật có kích thước ${a} cm × ${b} cm được phóng to thành tấm ảnh đồng dạng có chiều dài ${L} cm. Tính tỉ số đồng dạng và chiều rộng của tấm ảnh mới.`},{pts:.5,html:`Diện tích tấm ảnh mới gấp bao nhiêu lần diện tích tấm ảnh ban đầu?`}],
    sol:[ptxt([[`Tỉ số đồng dạng: ${L} : ${b} = ${k}.`,.25],[`Chiều rộng tấm ảnh mới: ${k}·${a} = ${k*a} (cm).`,.25]]),
      ptxt([[`Diện tích ban đầu: ${a}·${b} = ${a*b} (cm²); diện tích mới: ${k*a}·${L} = ${k*a*L} (cm²).`,.25],[`${k*a*L} : ${a*b} = ${k*k}, tức gấp ${k*k} lần.`,.25]])],chk:()=>true};
});

/* ===== Bổ sung theo dạng bài thực tế trong đề kiểm tra 2025 – 2026 ===== */
/* BC có tối đa một chữ số thập phân và không quá 4 kí tự (kể cả dấu phẩy) để dùng được cho câu trả lời ngắn */
const lake8=r=>{for(;;){const q=r.int(8,20),s=q+r.int(10,25),p=r.int(12,30),bc=p*s/q;if(!Number.isInteger(bc*10)||String(bc).length>4)continue;return{q,s,p,bc}}};
TLN8x('t8x-15-lake',4,'TH',[15],r=>{
  const {q,s,p,bc}=lake8(r);
  return{kind:'tln',stem:`Để đo chiều rộng ${I('BC')} của một hồ nước, người ta chọn điểm ${I('A')} trên bờ, căng dây nối ${I('A')} với ${I('B')} và ${I('C')}, rồi lấy ${I('D')} ∈ ${I('AB')}, ${I('E')} ∈ ${I('AC')} sao cho ${I('DE')} ∥ ${I('BC')}. Đo được ${I('AD')} = ${q} m, ${I('AB')} = ${s} m, ${I('DE')} = ${p} m. Tính chiều rộng ${I('BC')} của hồ (đơn vị: m).`,ans:bc,unit:'m',
    sol:`DE ∥ BC nên theo hệ quả định lí Thalès: AD/AB = DE/BC, suy ra BC = DE·AB/AD = ${p}·${s}/${q} = ${fmt(bc)} (m).`,chk:()=>true};
});
TL8x('tl8x-15-lake',4,'VD','real',[15],r=>{
  const {q,s,p,bc}=lake8(r);
  return{kind:'tl',title:'Đo khoảng cách nhờ định lí Thalès',parts:[{pts:.5,html:`Để đo chiều rộng ${I('BC')} của một hồ nước (không đo trực tiếp được), người ta chọn điểm ${I('A')} trên bờ, căng dây từ ${I('A')} đến ${I('B')} và ${I('C')}, rồi lấy ${I('D')} ∈ ${I('AB')}, ${I('E')} ∈ ${I('AC')} sao cho ${I('DE')} ∥ ${I('BC')}. Giải thích vì sao ${fr(I('AD'),I('AB'))} = ${fr(I('DE'),I('BC'))}.`},{pts:.5,html:`Đo được ${I('AD')} = ${q} m, ${I('AB')} = ${s} m, ${I('DE')} = ${p} m. Tính chiều rộng ${I('BC')} của hồ và độ dài đoạn ${I('DB')}.`}],
    sol:[ptxt([[`Trong tam giác ABC có DE ∥ BC (D ∈ AB, E ∈ AC).`,.25],[`Theo hệ quả của định lí Thalès, tam giác ADE có ba cạnh tương ứng tỉ lệ với ba cạnh tam giác ABC, nên AD/AB = DE/BC.`,.25]]),
      ptxt([[`BC = DE·AB/AD = ${p}·${s}/${q} = ${fmt(bc)} (m).`,.25],[`DB = AB − AD = ${s} − ${q} = ${s-q} (m).`,.25]])],chk:()=>true};
});
TL8x('tl8x-26-shop',7,'VDC','real',[26],r=>{
  for(;;){const P=r.pick([120,150,180,185,200,250]),a=r.pick([30,35,38,40]),f=r.pick([[3,5],[2,5],[1,2]]),b=r.pick([80,85,90]),x=r.int(10,40)*20;
    const n1=x/2,n2=n1*f[0]/f[1],n3=n1-n2;if(!Number.isInteger(n2))continue;
    const L=n1*P*a/100-n3*P*(100-b)/100;if(L<=0||!Number.isInteger(L*1000)||Math.round(L)!==L)continue;const per=L/x;
    return{kind:'tl',title:'Giải bài toán bằng cách lập phương trình',parts:[{pts:.5,html:`Một cửa hàng nhập về một số chiếc áo với giá ${P} nghìn đồng mỗi chiếc. Đợt thứ nhất, cửa hàng bán một nửa số áo, mỗi chiếc lãi ${a}% so với giá vốn. Đợt thứ hai, cửa hàng bán ${fr(f[0],f[1])} số áo còn lại với giá bằng giá vốn. Đợt thứ ba, cửa hàng bán hết số áo còn lại với giá bằng ${b}% giá vốn. Gọi ${I('x')} là số áo đã nhập. Biểu thị lợi nhuận của cửa hàng theo ${I('x')}.`},{pts:.5,html:`Sau khi bán hết, cửa hàng lãi ${nv(L*1000)} đồng. Hỏi cửa hàng đã nhập bao nhiêu chiếc áo?`}],
      sol:[ptxt([[`Đợt 1 bán ${fr('x',2)} áo, lãi ${fr('x',2)}·${a}%·${P} = ${fmt(P*a/200)}x (nghìn đồng); đợt 2 không lãi không lỗ.`,.25],[`Đợt 3 bán ${fr('x',2)}·${fr(f[1]-f[0],f[1])} = ${fr(`${f[1]-f[0]}x`,2*f[1])} áo, lỗ ${100-b}% mỗi chiếc. Lợi nhuận: ${fmt(P*a/200)}x − ${fmt(P*(100-b)*(f[1]-f[0])/(200*f[1]))}x = ${fmt(per)}x (nghìn đồng).`,.25]]),
        ptxt([[`${fmt(per)}x = ${nv(L)} (nghìn đồng).`,.25],[`x = ${nv(L)} : ${fmt(per)} = ${x}. Cửa hàng đã nhập ${x} chiếc áo.`,.25]])],chk:()=>Math.abs(per*x-L)<1e-6}}
});
TLN8x('t8x-32-est',8,'TH',[32],r=>{
  const t=r.chance(.5);
  if(t){const n=r.int(20,150)*6,k=r.int(1,6);return{kind:'tln',stem:`Gieo một con xúc xắc cân đối và đồng chất ${n} lần. Hãy ước lượng số lần xuất hiện mặt ${k} chấm.`,ans:n/6,unit:'lần',sol:`Xác suất xuất hiện mặt ${k} chấm là ${fr(1,6)}; số lần xuất hiện ước lượng: ${n}·${fr(1,6)} = ${n/6}.`,chk:()=>true}}
  for(;;){const a=r.int(2,9),b=r.int(2,9),n=r.int(10,60)*(a+b);if(n>999)continue;return{kind:'tln',stem:`Một hộp có ${a} quả bóng xanh và ${b} quả bóng đỏ có cùng kích thước. Lấy ngẫu nhiên một quả, ghi màu rồi trả lại hộp; lặp lại ${n} lần. Hãy ước lượng số lần lấy được bóng xanh.`,ans:n*a/(a+b),unit:'lần',
    sol:`Xác suất lấy được bóng xanh là ${fr(a,a+b)}; số lần ước lượng: ${n}·${fr(a,a+b)} = ${n*a/(a+b)}.`,chk:()=>true}}
});
