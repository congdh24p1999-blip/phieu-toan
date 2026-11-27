/* ================================================================
   LỚP 7 – bổ sung dạng câu cho các bài còn ít dạng (27/11/2026)
   Bài 1 – 19: học kì I; Bài 20 – 37: học kì II. Thêm Bài 15 (trường hợp bằng nhau của tam giác vuông).
   ================================================================ */
const hk7=les=>Math.min(...les)<=19?1:2;
const N7x=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:7,hk:hk7(les),les});
const DS7x=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:7,hk:hk7(les),les});
const TLN7x=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:7,hk:hk7(les),les});
const TL7x=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:7,hk:hk7(les),les});
/* đa thức một biến từ mảng hệ số [a_n, …, a_0] */
const poly7=cs=>{const n=cs.length-1;let s='';cs.forEach((c,i)=>{if(!c)return;const e=n-i,a=Math.abs(c),body=e===0?String(a):`${a===1?'':a}${I('x')}${e>1?sup(e):''}`;s+=s?` ${c<0?MINUS:'+'} ${body}`:`${c<0?MINUS:''}${body}`});return s||'0'};

/* ===================== Bài 1: Tập hợp các số hữu tỉ ===================== */
TLN7x('t7x-1-int',1,'TH',[1],r=>{
  for(;;){const b=r.pick([2,3,4,5,7]),a=-r.int(b+1,6*b),d=r.pick([2,3,4,5]),c=r.int(d+1,5*d);if(a%b===0||c%d===0)continue;
    const lo=Math.floor(a/b)+1,hi=Math.ceil(c/d)-1,v=hi-lo+1;
    return{kind:'tln',stem:`Có bao nhiêu số nguyên ${I('x')} thoả mãn ${qh(Q(a,b))} < ${I('x')} < ${qh(Q(c,d))}?`,ans:v,unit:'',
      sol:`${qh(Q(a,b))} ≈ ${fmt(Math.round(a/b*100)/100)} và ${qh(Q(c,d))} ≈ ${fmt(Math.round(c/d*100)/100)}; các số nguyên x là ${sg(lo)}, …, ${sg(hi)}: có ${v} số.`,chk:()=>v>0}}
});
TL7x('tl7x-1-order',1,'TH','alg',[1],r=>{
  for(;;){const p=Q(-r.int(1,9),r.pick([3,4,5,7])),q=Q(-r.int(1,9),r.pick([3,4,5,7])),D=r.int(-30,30),dd=D/10,e=Q(r.int(1,9),r.pick([2,3,4]));
    const xs=[p,q,Q(D,10),e];const vals=xs.map(qv6);if(new Set(vals).size<4||p[1]===1||q[1]===1||e[1]===1||Math.abs(qv6(p)-qv6(q))<1e-9)continue;
    const big=qv6(p)>qv6(q),ord=xs.map((x,i)=>[x,i]).sort((a,b)=>qv6(a[0])-qv6(b[0]));const show=(x,i)=>i===2?dec6(dd):qh(x);
    return{kind:'tl',title:'So sánh số hữu tỉ',parts:[{pts:.5,html:`So sánh hai số hữu tỉ ${qh(p)} và ${qh(q)}.`},{pts:.5,html:`Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần: ${xs.map(show).join('; ')}.`}],
      sol:[ptxt([[`Quy đồng: ${qh(p)} = ${frN(p[0]*q[1],p[1]*q[1])}; ${qh(q)} = ${frN(q[0]*p[1],p[1]*q[1])}.`,.25],[`Vì ${p[0]*q[1]} ${big?'>':'<'} ${q[0]*p[1]} nên ${qh(p)} ${big?'>':'<'} ${qh(q)}.`,.25]]),
        ptxt([[`Số âm nhỏ hơn 0, số dương lớn hơn 0; so sánh các số cùng dấu bằng cách đưa về cùng dạng.`,.25],[`Thứ tự tăng dần: ${ord.map(([x,i])=>show(x,i)).join('; ')}.`,.25]])],chk:()=>true}}
});

/* ===================== Bài 3, 5: Luỹ thừa, số thập phân vô hạn tuần hoàn ===================== */
N7x('m7x-3-rule',1,'NB',[3],r=>{
  let m,n;do{m=r.int(2,5);n=r.int(2,5)}while(m*n===m+n||m===n);const t=r.int(0,2),x=I('x');
  const C=[[`(${x}${sup(m)})${sup(n)}`,`${x}${sup(m*n)}`,[`${x}${sup(m+n)}`,`${x}${sup(m**n)}`,`${n}${x}${sup(m)}`],`(xᵐ)ⁿ = xᵐ·ⁿ nên (x${sup(m)})${sup(n)} = x${sup(m*n)}.`],
    [`${x}${sup(m)}·${x}${sup(n)}`,`${x}${sup(m+n)}`,[`${x}${sup(m*n)}`,`${'('+x+sup(2)+')'}${sup(m+n)}`,`2${x}${sup(m+n)}`],`xᵐ·xⁿ = xᵐ⁺ⁿ nên x${sup(m)}·x${sup(n)} = x${sup(m+n)}.`],
    [`${x}${sup(m+n)} : ${x}${sup(n)} (${x} ≠ 0)`,`${x}${sup(m)}`,[`${x}${sup(m+2*n)}`,`${x}${sup(n)}`,`1`],`xᵐ⁺ⁿ : xⁿ = xᵐ.`]][t];
  return mkTxt(r,{stem:`Với số hữu tỉ ${x}, kết quả của ${C[0]} là`,correct:C[1],wrongs:C[2],sol:C[3],chk:()=>true});
});
TLN7x('t7x-5-digit',2,'TH',[5],r=>{
  const P=r.pick(['3','27','142857','63','45','185','36']),n=r.int(20,200),d=+P[(n-1)%P.length];
  return{kind:'tln',stem:`Cho số thập phân vô hạn tuần hoàn 0,(${P}). Chữ số thập phân thứ ${n} (sau dấu phẩy) là chữ số nào?`,ans:d,unit:'',
    sol:`Chu kì “${P}” có ${P.length} chữ số; ${n} = ${P.length}·${Math.floor((n-1)/P.length)} + ${(n-1)%P.length+1} nên chữ số thứ ${n} là chữ số thứ ${(n-1)%P.length+1} của chu kì: ${d}.`,chk:()=>true};
});

/* ===================== Bài 8, 9, 11: Góc, song song, định lí ===================== */
DS7x('ds7x-9-sign',3,'NB',[9],r=>mkDS(r,{stem:`Đường thẳng ${I('c')} cắt hai đường thẳng phân biệt ${I('a')} và ${I('b')}. Xét tính đúng sai của các khẳng định sau:`,items:[
  {t:`Nếu có một cặp góc so le trong bằng nhau thì ${I('a')} ∥ ${I('b')}.`,f:`Nếu có một cặp góc so le trong bù nhau thì ${I('a')} ∥ ${I('b')}.`,why:'Dấu hiệu nhận biết: cặp góc so le trong bằng nhau.'},
  {t:`Nếu có một cặp góc đồng vị bằng nhau thì ${I('a')} ∥ ${I('b')}.`,f:`Nếu có một cặp góc đồng vị bù nhau (khác 90°) thì ${I('a')} ∥ ${I('b')}.`,why:'Dấu hiệu nhận biết: cặp góc đồng vị bằng nhau.'},
  {t:`Nếu ${I('a')} ⊥ ${I('c')} và ${I('b')} ⊥ ${I('c')} thì ${I('a')} ∥ ${I('b')}.`,f:`Nếu ${I('a')} ⊥ ${I('c')} và ${I('b')} ⊥ ${I('c')} thì ${I('a')} ⊥ ${I('b')}.`,why:'Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì song song.'},
  {t:`Nếu ${I('a')} ∥ ${I('b')} thì mọi cặp góc so le trong đều bằng nhau.`,f:`Chỉ cần ${I('c')} cắt cả ${I('a')} và ${I('b')} là ${I('a')} ∥ ${I('b')}.`,why:'Hai đường thẳng cùng cắt một đường thẳng chưa chắc song song.'}],chk:()=>true}));
N7x('m7x-9-which',3,'TH',[9],r=>{
  for(;;){const x=r.int(7,17)*5;if(x===90)continue;
    return mkTxt(r,{stem:`Đường thẳng ${I('c')} cắt hai đường thẳng ${I('a')}, ${I('b')}. Trường hợp nào sau đây cho biết ${I('a')} ∥ ${I('b')}?`,correct:`Một cặp góc so le trong có số đo ${x}° và ${x}°`,wrongs:[`Một cặp góc so le trong có số đo ${x}° và ${180-x}°`,`Một cặp góc đồng vị có số đo ${x}° và ${180-x}°`,`Một cặp góc trong cùng phía có số đo ${x}° và ${x}°`],
      sol:`a ∥ b khi có một cặp góc so le trong (hoặc đồng vị) bằng nhau, hay một cặp góc trong cùng phía bù nhau. Chỉ trường hợp góc so le trong ${x}° và ${x}° thoả mãn.`,chk:()=>true})}
});
const THM7=[['Hai góc đối đỉnh thì bằng nhau','Hai góc đối đỉnh','Hai góc đó bằng nhau'],
  ['Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau','Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba','Hai đường thẳng đó song song với nhau'],
  ['Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba thì song song với nhau','Hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba','Hai đường thẳng đó song song với nhau'],
  ['Tổng ba góc của một tam giác bằng 180°','Ba góc của một tam giác','Tổng số đo ba góc đó bằng 180°'],
  ['Hai tia phân giác của hai góc kề bù thì vuông góc với nhau','Hai tia phân giác của hai góc kề bù','Hai tia đó vuông góc với nhau']];
N7x('m7x-11-gtkl',3,'NB',[11],r=>{
  const i=r.int(0,THM7.length-1),T=THM7[i],t=r.chance(.5),ok=t?T[1]:T[2],pool=[...new Set([t?T[2]:T[1],...r.shuffle(THM7.filter((_,k)=>k!==i).map(o=>o[t?1:2]))])].filter(w=>w!==ok);
  return mkTxt(r,{stem:`Định lí “${T[0]}” có ${t?'giả thiết':'kết luận'} là`,correct:ok,wrongs:pool,
    sol:`Viết định lí dưới dạng “Nếu … thì …”: phần sau “Nếu” là giả thiết (${T[1].toLowerCase()}), phần sau “thì” là kết luận (${T[2].toLowerCase()}).`,chk:()=>true});
});
const IFT7=[['Nếu hai góc đối đỉnh thì hai góc đó bằng nhau.','Nếu hai góc bằng nhau thì hai góc đó đối đỉnh.'],
  ['Nếu hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng song song với nhau.','Nếu hai đường thẳng song song với nhau thì chúng cùng song song với mọi đường thẳng thứ ba.'],
  ['Nếu hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau.','Nếu hai đường thẳng song song với nhau thì chúng cùng vuông góc với mọi đường thẳng thứ ba.'],
  ['Nếu ba góc là ba góc của một tam giác thì tổng số đo của chúng bằng 180°.','Nếu tổng số đo ba góc bằng 180° thì ba góc đó là ba góc của một tam giác.'],
  ['Nếu hai tia lần lượt là tia phân giác của hai góc kề bù thì hai tia đó vuông góc với nhau.','Nếu hai tia vuông góc với nhau thì chúng là tia phân giác của hai góc kề bù.']];
N7x('m7x-11-ifthen',3,'NB',[11],r=>{
  const i=r.int(0,THM7.length-1);
  return mkTxt(r,{stem:`Phát biểu nào sau đây là cách viết định lí “${THM7[i][0]}” dưới dạng “Nếu … thì …”?`,correct:IFT7[i][0],wrongs:[IFT7[i][1],...r.shuffle(IFT7.filter((_,k)=>k!==i)).slice(0,2).map(x=>x[0])],
    sol:`Giả thiết (${THM7[i][1].toLowerCase()}) đặt sau “Nếu”, kết luận (${THM7[i][2].toLowerCase()}) đặt sau “thì”. Đổi chỗ hai phần sẽ được một mệnh đề khác, không phải định lí đã cho.`,chk:()=>true});
});
DS7x('ds7x-11-thm',3,'NB',[11],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Mỗi định lí gồm hai phần: giả thiết và kết luận.',f:'Mỗi định lí chỉ gồm phần kết luận.',why:'Định lí thường phát biểu dạng “Nếu (giả thiết) thì (kết luận)”.'},
  {t:'Chứng minh định lí là dùng lập luận để từ giả thiết suy ra kết luận.',f:'Chứng minh định lí là đo đạc trên hình vẽ để thấy kết luận đúng.',why:'Đo đạc trên một vài hình chỉ là kiểm tra, không phải chứng minh.'},
  {t:'Trong định lí “Nếu … thì …”, phần sau chữ “thì” là kết luận.',f:'Trong định lí “Nếu … thì …”, phần sau chữ “thì” là giả thiết.',why:'Phần sau “Nếu” là giả thiết, phần sau “thì” là kết luận.'},
  {t:'Kiểm tra đúng trên một vài hình vẽ cụ thể chưa đủ để khẳng định một định lí đúng.',f:'Kiểm tra đúng trên một vài hình vẽ cụ thể là đã chứng minh được định lí.',why:'Định lí phải đúng với mọi trường hợp thoả mãn giả thiết.'}],chk:()=>true}));
TLN7x('t7x-11-adj',3,'TH',[8,11],r=>{
  const d=r.int(2,14)*10,t=r.chance(.5),big=(180+d)/2,sm=(180-d)/2;
  return{kind:'tln',stem:`Hai góc kề bù có hiệu số đo bằng ${d}°. Tính số đo của góc ${t?'lớn':'nhỏ'} hơn (đơn vị: độ).`,ans:t?big:sm,unit:'°',
    sol:`Tổng hai góc kề bù là 180°. Góc lớn: (180° + ${d}°) : 2 = ${big}°; góc nhỏ: (180° − ${d}°) : 2 = ${sm}°.`,chk:()=>true};
});
TL7x('tl7x-11-proof',3,'TH','geo',[8,11],r=>{
  const t=r.int(0,2),a=r.int(5,16)*5;
  const P=[[`Viết giả thiết, kết luận của định lí: “Hai tia phân giác của hai góc kề bù thì vuông góc với nhau”.`,`Chứng minh định lí trên (gợi ý: gọi ${I('xOy')} và ${I('yOz')} là hai góc kề bù, ${I('Om')}, ${I('On')} lần lượt là tia phân giác của chúng).`,
      ['GT: ∠xOy và ∠yOz kề bù; Om là tia phân giác của ∠xOy; On là tia phân giác của ∠yOz. KL: Om ⊥ On.',`∠mOy = ½∠xOy, ∠yOn = ½∠yOz; vì tia Oy nằm giữa Om và On nên ∠mOn = ∠mOy + ∠yOn = ½(∠xOy + ∠yOz).`,'= ½·180° = 90°, vậy Om ⊥ On.']],
    [`Viết giả thiết, kết luận của định lí: “Hai góc cùng bù với một góc thì bằng nhau”.`,`Áp dụng: hai góc ${I('xOy')} và ${I('x′Oy′')} cùng bù với một góc có số đo ${a}°. Tính số đo của mỗi góc và giải thích vì sao chúng bằng nhau.`,
      ['GT: ∠A + ∠C = 180°, ∠B + ∠C = 180°. KL: ∠A = ∠B.',`Từ giả thiết: ∠A = 180° − ∠C và ∠B = 180° − ∠C, nên ∠A = ∠B. Áp dụng: mỗi góc bằng 180° − ${a}° = ${180-a}°.`,`Hai góc cùng bằng 180° − ${a}° nên bằng nhau.`]],
    [`Viết giả thiết, kết luận của định lí: “Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia”.`,`Chứng minh định lí trên.`,
      ['GT: a ∥ b, c ⊥ a. KL: c ⊥ b.','c ⊥ a nên c cắt a; vì a ∥ b nên c cũng cắt b (theo tiên đề Euclid).','Hai góc đồng vị tạo bởi c với a và b bằng nhau; góc tạo bởi c và a bằng 90° nên góc tạo bởi c và b cũng bằng 90°, tức c ⊥ b.']]][t];
  return{kind:'tl',title:'Định lí và chứng minh định lí',parts:[{pts:.5,html:P[0]},{pts:.5,html:P[1]}],
    sol:[ptxt([[P[2][0],.5]]),ptxt([[P[2][1],.25],[P[2][2],.25]])],chk:()=>true};
});

/* ===================== Bài 14, 15: Các trường hợp bằng nhau ===================== */
DS7x('ds7x-14-case',4,'NB',[14],r=>mkDS(r,{stem:`Cho hai tam giác ${I('ABC')} và ${I('DEF')}. Xét tính đúng sai của các khẳng định sau:`,items:[
  {t:`Nếu ${I('AB')} = ${I('DE')}, ${ANG('A')} = ${ANG('D')}, ${I('AC')} = ${I('DF')} thì ${I('ΔABC')} = ${I('ΔDEF')} (c.g.c).`,f:`Nếu ${I('AB')} = ${I('DE')}, ${I('BC')} = ${I('EF')}, ${ANG('A')} = ${ANG('D')} thì ${I('ΔABC')} = ${I('ΔDEF')} (c.g.c).`,why:'Trường hợp c.g.c đòi hỏi góc xen giữa hai cạnh; góc A không xen giữa AB và BC.'},
  {t:`Nếu ${ANG('B')} = ${ANG('E')}, ${I('BC')} = ${I('EF')}, ${ANG('C')} = ${ANG('F')} thì ${I('ΔABC')} = ${I('ΔDEF')} (g.c.g).`,f:`Nếu ${ANG('A')} = ${ANG('D')}, ${ANG('B')} = ${ANG('E')}, ${ANG('C')} = ${ANG('F')} thì ${I('ΔABC')} = ${I('ΔDEF')}.`,why:'Ba góc bằng nhau chưa đủ để hai tam giác bằng nhau (có thể khác kích thước).'},
  {t:`Nếu ${I('ΔABC')} = ${I('ΔDEF')} thì ${I('BC')} = ${I('EF')}.`,f:`Nếu ${I('ΔABC')} = ${I('ΔDEF')} thì ${I('BC')} = ${I('DF')}.`,why:'Các cạnh tương ứng bằng nhau: BC tương ứng với EF.'},
  {t:`Nếu ${I('AB')} = ${I('DE')}, ${I('BC')} = ${I('EF')}, ${I('CA')} = ${I('FD')} thì ${I('ΔABC')} = ${I('ΔDEF')} (c.c.c).`,f:`Nếu ${I('AB')} = ${I('DE')}, ${I('BC')} = ${I('EF')} thì ${I('ΔABC')} = ${I('ΔDEF')} (c.c.c).`,why:'Trường hợp c.c.c cần đủ ba cặp cạnh bằng nhau.'}],chk:()=>true}));
const RC7=[['cạnh huyền – cạnh góc vuông',`${I('BC')} = ${I('EF')}, ${I('AB')} = ${I('DE')}`],['hai cạnh góc vuông',`${I('AB')} = ${I('DE')}, ${I('AC')} = ${I('DF')}`],['cạnh góc vuông – góc nhọn kề',`${I('AB')} = ${I('DE')}, ${ANG('B')} = ${ANG('E')}`],['cạnh huyền – góc nhọn',`${I('BC')} = ${I('EF')}, ${ANG('B')} = ${ANG('E')}`]];
N7x('m7x-15-case',4,'NB',[15],r=>{
  const i=r.int(0,3);
  return mkTxt(r,{stem:`Tam giác ${I('ABC')} vuông tại ${I('A')} và tam giác ${I('DEF')} vuông tại ${I('D')} có ${RC7[i][1]}. Khi đó ${I('ΔABC')} = ${I('ΔDEF')} theo trường hợp`,correct:RC7[i][0],wrongs:RC7.filter((_,k)=>k!==i).map(x=>x[0]),
    sol:`Các yếu tố bằng nhau đã cho ứng với trường hợp ${RC7[i][0]} của hai tam giác vuông.`,chk:()=>true});
});
N7x('m7x-15-need',4,'TH',[15],r=>{
  const t=r.chance(.5);
  return t?mkTxt(r,{stem:`Tam giác ${I('ABC')} vuông tại ${I('A')} và tam giác ${I('DEF')} vuông tại ${I('D')} có ${I('BC')} = ${I('EF')}. Cần thêm điều kiện nào để ${I('ΔABC')} = ${I('ΔDEF')} theo trường hợp cạnh huyền – cạnh góc vuông?`,correct:`${I('AC')} = ${I('DF')}`,wrongs:[`${ANG('B')} = ${ANG('E')}`,`${I('AB')} = ${I('DF')}`,`${I('BC')} = ${I('DE')}`],
      sol:'Đã có hai cạnh huyền bằng nhau; cần thêm một cặp cạnh góc vuông tương ứng bằng nhau: AC = DF (hoặc AB = DE).',chk:()=>true})
    :mkTxt(r,{stem:`Tam giác ${I('ABC')} vuông tại ${I('A')} và tam giác ${I('DEF')} vuông tại ${I('D')} có ${ANG('C')} = ${ANG('F')}. Cần thêm điều kiện nào để ${I('ΔABC')} = ${I('ΔDEF')} theo trường hợp cạnh huyền – góc nhọn?`,correct:`${I('BC')} = ${I('EF')}`,wrongs:[`${I('AC')} = ${I('DF')}`,`${ANG('B')} = ${ANG('E')}`,`${I('AB')} = ${I('EF')}`],
      sol:'Đã có một cặp góc nhọn bằng nhau; cần thêm hai cạnh huyền bằng nhau: BC = EF.',chk:()=>true});
});
DS7x('ds7x-15-right',4,'TH',[15],r=>{
  const x=r.pick([25,30,35,40,50,55,60,65,70,75,80]),k=r.int(3,12);
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} vuông tại ${I('A')} và tam giác ${I('DEF')} vuông tại ${I('D')} có ${I('BC')} = ${I('EF')}, ${ANG('B')} = ${ANG('E')} = ${x}°, ${I('AC')} = ${k} cm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('ΔABC')} = ${I('ΔDEF')} theo trường hợp cạnh huyền – góc nhọn.`,f:`${I('ΔABC')} = ${I('ΔDEF')} theo trường hợp hai cạnh góc vuông.`,why:'Hai tam giác vuông có cạnh huyền và một góc nhọn bằng nhau.'},
    {t:`${I('DF')} = ${k} cm.`,f:`${I('DF')} = ${k+1} cm.`,why:'DF là cạnh tương ứng với AC.'},
    {t:`${ANG('F')} = ${90-x}°.`,f:`${ANG('F')} = ${x}°.`,why:`Trong tam giác vuông DEF: ∠F = 90° − ∠E = ${90-x}°.`},
    {t:`${I('AB')} = ${I('DE')}.`,f:`${I('AB')} = ${I('DF')}.`,why:'AB và DE là hai cạnh tương ứng.'}],chk:()=>true});
});
TLN7x('t7x-15-ang',4,'TH',[15],r=>{
  const x=r.int(5,17)*5,k=r.int(3,15),t=r.chance(.5);
  return t?{kind:'tln',stem:`Tam giác ${I('ABC')} vuông tại ${I('A')} và tam giác ${I('DEF')} vuông tại ${I('D')} có ${I('BC')} = ${I('EF')}, ${I('AB')} = ${I('DE')}. Biết ${ANG('B')} = ${x}°, tính số đo ${ANG('F')} (đơn vị: độ).`,ans:90-x,unit:'°',
      sol:`ΔABC = ΔDEF (cạnh huyền – cạnh góc vuông) nên ∠E = ∠B = ${x}°. Do đó ∠F = 90° − ${x}° = ${90-x}°.`,chk:()=>true}
    :{kind:'tln',stem:`Tam giác ${I('ABC')} vuông tại ${I('A')} và tam giác ${I('DEF')} vuông tại ${I('D')} có ${I('AB')} = ${I('DE')}, ${ANG('B')} = ${ANG('E')}. Biết ${I('AC')} = ${k} cm, tính ${I('DF')} (đơn vị: cm).`,ans:k,unit:'cm',
      sol:`ΔABC = ΔDEF (cạnh góc vuông – góc nhọn kề) nên DF = AC = ${k} cm.`,chk:()=>true};
});
TL7x('tl7x-15-iso',4,'VD','geo',[15,16],r=>{
  const h=r.int(3,12),a=r.int(4,14)*5;
  return{kind:'tl',title:'Tam giác cân và đường vuông góc',parts:[{pts:.5,html:`Cho tam giác ${I('ABC')} cân tại ${I('A')}, kẻ ${I('AH')} vuông góc với ${I('BC')} (${I('H')} ∈ ${I('BC')}). Chứng minh ${I('ΔAHB')} = ${I('ΔAHC')}.`},{pts:.5,html:`Chứng minh ${I('H')} là trung điểm của ${I('BC')} và ${I('AH')} là tia phân giác của ${ANG('BAC')}. Biết ${I('BC')} = ${2*h} cm, ${ANG('BAC')} = ${2*a}°, tính ${I('BH')} và ${ANG('BAH')}.`}],
    sol:[ptxt([[`Xét hai tam giác vuông AHB và AHC (vuông tại H): AB = AC (tam giác ABC cân tại A), AH là cạnh chung.`,.25],[`Do đó ΔAHB = ΔAHC (cạnh huyền – cạnh góc vuông).`,.25]]),
      ptxt([[`Từ ΔAHB = ΔAHC suy ra HB = HC (H là trung điểm BC) và ∠BAH = ∠CAH (AH là tia phân giác của ∠BAC).`,.25],[`BH = ${2*h} : 2 = ${h} (cm); ∠BAH = ${2*a}° : 2 = ${a}°.`,.25]])],chk:()=>true};
});
TL7x('tl7x-15-bis',4,'VD','geo',[15],r=>{
  const a=r.int(5,16)*5,k=r.int(3,12);
  return{kind:'tl',title:'Điểm trên tia phân giác',parts:[{pts:.5,html:`Cho ${ANG('xOy')} = ${2*a}°, ${I('Ot')} là tia phân giác của ${ANG('xOy')}. Lấy điểm ${I('M')} thuộc tia ${I('Ot')} (${I('M')} ≠ ${I('O')}), kẻ ${I('MA')} ⊥ ${I('Ox')} (${I('A')} ∈ ${I('Ox')}), ${I('MB')} ⊥ ${I('Oy')} (${I('B')} ∈ ${I('Oy')}). Chứng minh ${I('ΔOAM')} = ${I('ΔOBM')}.`},{pts:.5,html:`Chứng minh ${I('MA')} = ${I('MB')}. Biết ${I('OA')} = ${k} cm, tính ${I('OB')} và số đo ${ANG('OMA')}.`}],
    sol:[ptxt([[`Xét hai tam giác vuông OAM và OBM: OM là cạnh huyền chung, ∠AOM = ∠BOM (Ot là tia phân giác).`,.25],[`Do đó ΔOAM = ΔOBM (cạnh huyền – góc nhọn).`,.25]]),
      ptxt([[`Từ ΔOAM = ΔOBM suy ra MA = MB và OB = OA = ${k} cm.`,.25],[`∠AOM = ${2*a}° : 2 = ${a}°; trong tam giác vuông OAM: ∠OMA = 90° − ${a}° = ${90-a}°.`,.25]])],chk:()=>true};
});

/* ===================== Bài 17, 19: Thu thập dữ liệu, biểu đồ đoạn thẳng ===================== */
N7x('m7x-17-rep',5,'NB',[17],r=>{
  const t=r.int(0,2);
  const C=[['Để tìm hiểu môn thể thao yêu thích của học sinh cả trường, bạn An chỉ hỏi các bạn trong câu lạc bộ bóng đá. Dữ liệu An thu được','không đại diện cho học sinh cả trường',['đại diện cho học sinh cả trường','là dữ liệu không phải số','chắc chắn chính xác cho cả trường'],'Chỉ hỏi các bạn câu lạc bộ bóng đá nên kết quả nghiêng về bóng đá, không đại diện cho cả trường.'],
    ['Để tìm hiểu thời gian ngủ mỗi đêm của học sinh khối 7, bạn Mai hỏi ngẫu nhiên 5 bạn ở mỗi lớp của khối 7. Cách chọn mẫu này','có tính đại diện cho học sinh khối 7',['không đại diện vì chỉ hỏi một lớp','không đại diện vì hỏi quá nhiều bạn','không hợp lí vì thời gian ngủ không phải số liệu'],'Mỗi lớp đều có học sinh được hỏi ngẫu nhiên nên mẫu đại diện cho khối 7.'],
    ['Một bảng thống kê ghi tỉ lệ học sinh của bốn lớp tham gia ngoại khoá lần lượt là 45%; 60%; 120%; 75%. Số liệu không hợp lí là','120%',['45%','60%','75%'],'Tỉ lệ học sinh của một lớp không thể vượt quá 100%.']][t];
  return mkTxt(r,{stem:C[0],correct:C[1],wrongs:C[2],sol:C[3],chk:()=>true});
});
TLN7x('t7x-17-count',5,'TH',[17],r=>{
  const NUM=['Chiều cao (cm) của học sinh lớp 7A','Số anh chị em ruột của mỗi bạn','Thời gian (phút) đi từ nhà đến trường','Điểm kiểm tra môn Toán','Số quyển sách đọc trong tháng','Cân nặng (kg) của học sinh'],TXT=['Màu sắc yêu thích','Tên các loài cây trong vườn trường','Phương tiện đến trường','Xếp loại học lực (Tốt, Khá, Đạt, Chưa đạt)','Môn học yêu thích','Nơi sinh của học sinh'];
  const k=r.int(2,4),xs=r.shuffle([...r.shuffle(NUM).slice(0,k),...r.shuffle(TXT).slice(0,6-k)]);
  return{kind:'tln',stem:`Cho các loại dữ liệu sau: ${xs.map((x,i)=>`(${i+1}) ${x.charAt(0).toLowerCase()+x.slice(1)}`).join('; ')}. Có bao nhiêu loại dữ liệu là số liệu?`,ans:k,unit:'',
    sol:`Số liệu là dữ liệu được biểu diễn bằng số: ${xs.filter(x=>NUM.includes(x)).map(x=>x.toLowerCase()).join('; ')} – có ${k} loại. Xếp loại học lực tuy có thứ bậc nhưng không phải số liệu.`,chk:()=>true};
});
const LINE7=[{what:'Nhiệt độ trung bình (°C) ở một địa phương trong các tháng',cats:['T1','T2','T3','T4','T5','T6'],lo:14,hi:32,unit:'°C'},{what:'Số khách tham quan (trăm người) của một bảo tàng trong các năm',cats:['2020','2021','2022','2023','2024','2025'],lo:10,hi:60,unit:'trăm người'},{what:'Lượng mưa (mm) trong các tháng',cats:['T5','T6','T7','T8','T9','T10'],lo:40,hi:300,unit:'mm'}];
N7x('m7x-19-rise',5,'TH',[19],r=>{
  for(;;){const S=r.pick(LINE7),vals=S.cats.map(()=>r.int(S.lo,S.hi)),d=vals.slice(1).map((v,i)=>v-vals[i]),mx=Math.max(...d),i=d.indexOf(mx);if(mx<=0||d.filter(x=>x===mx).length>1)continue;
    return mkTxt(r,{stem:`${S.what} được cho trong biểu đồ đoạn thẳng sau.<div class="figure">${lineSVG(S.cats,vals,{unit:S.unit})}</div>Số liệu tăng nhiều nhất trong khoảng thời gian nào?`,correct:`Từ ${S.cats[i]} đến ${S.cats[i+1]}`,wrongs:S.cats.slice(0,-1).map((c,k)=>`Từ ${c} đến ${S.cats[k+1]}`).filter((_,k)=>k!==i),
      sol:`Mức thay đổi: ${d.map((x,k)=>`${S.cats[k]}→${S.cats[k+1]}: ${x>0?'+':''}${sg(x)}`).join('; ')}. Tăng nhiều nhất từ ${S.cats[i]} đến ${S.cats[i+1]} (+${mx}).`,chk:()=>true})}
});
TL7x('tl7x-19-line',5,'TH','real',[19],r=>{
  for(;;){const S=r.pick(LINE7),vals=S.cats.map(()=>r.int(S.lo,S.hi)),mx=Math.max(...vals),mn=Math.min(...vals);if(vals.filter(v=>v===mx).length>1||vals.filter(v=>v===mn).length>1)continue;
    const i=r.int(0,3),j=i+r.int(1,2),sum=vals.reduce((a,b)=>a+b,0);if(sum%6)continue;
    return{kind:'tl',title:'Biểu đồ đoạn thẳng',parts:[{pts:.5,html:`${S.what} được cho trong biểu đồ đoạn thẳng sau.<div class="figure">${lineSVG(S.cats,vals,{unit:S.unit})}</div>Lập bảng số liệu tương ứng. Thời điểm nào có số liệu cao nhất, thấp nhất?`},{pts:.5,html:`Từ ${S.cats[i]} đến ${S.cats[j]}, số liệu tăng hay giảm bao nhiêu? Tính trung bình cộng số liệu của sáu thời điểm.`}],
      sol:[ptxt([[`<div class="figure">${tableHTML(['Thời điểm',...S.cats],[[S.unit,...vals]])}</div>`,.25],[`Cao nhất: ${S.cats[vals.indexOf(mx)]} (${mx}); thấp nhất: ${S.cats[vals.indexOf(mn)]} (${mn}).`,.25]]),
        ptxt([[vals[j]===vals[i]?`Không thay đổi (${vals[i]}).`:`${vals[j]>vals[i]?'Tăng':'Giảm'} ${Math.abs(vals[j]-vals[i])} ${S.unit} (từ ${vals[i]} ${vals[j]>vals[i]?'lên':'xuống'} ${vals[j]}).`,.25],[`Trung bình: (${vals.join(' + ')}) : 6 = ${sum/6} (${S.unit}).`,.25]])],chk:()=>true}}
});

/* ===================== Bài 24, 26, 28: Biểu thức đại số, đa thức ===================== */
N7x('m7x-24-write',7,'NB',[24],r=>{
  const a=I('a'),b=I('b'),t=r.int(0,3);
  const C=[['tổng của a và bình phương của b',`${a} + ${b}${sup(2)}`,[`(${a} + ${b})${sup(2)}`,`${a}${sup(2)} + ${b}`,`2(${a} + ${b})`]],
    ['bình phương của tổng a và b',`(${a} + ${b})${sup(2)}`,[`${a} + ${b}${sup(2)}`,`${a}${sup(2)} + ${b}${sup(2)}`,`2${a}${b}`]],
    ['hiệu của a và tích của 3 với b',`${a} ${MINUS} 3${b}`,[`3(${a} ${MINUS} ${b})`,`3${a} ${MINUS} ${b}`,`${a}${b} ${MINUS} 3`]],
    ['nửa tổng của a và b',`${fr(`${a} + ${b}`,2)}`,[`${a} + ${fr(b,2)}`,`2(${a} + ${b})`,`${fr(a,2)} + ${b}`]]][t];
  return mkTxt(r,{stem:`Biểu thức đại số biểu thị “${C[0]}” là`,correct:C[1],wrongs:C[2],sol:`“${C[0].charAt(0).toUpperCase()+C[0].slice(1)}” được viết là ${C[1]}.`,chk:()=>true});
});
DS7x('ds7x-24-expr',7,'NB',[24],r=>{
  const x=r.nz(-4,4),v=2*x*x-1,a=r.int(3,9),b=r.int(2,8);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${a}·(${b} + 2) là một biểu thức số.`,f:`${a}·(${b} + 2) là một biểu thức đại số có chứa biến.`,why:'Biểu thức chỉ gồm các số nối với nhau bởi dấu phép tính là biểu thức số.'},
    {t:`Giá trị của biểu thức 2${I('x')}${sup(2)} ${MINUS} 1 tại ${I('x')} = ${sg(x)} là ${v}.`,f:`Giá trị của biểu thức 2${I('x')}${sup(2)} ${MINUS} 1 tại ${I('x')} = ${sg(x)} là ${v+2}.`,why:`2·(${sg(x)})² − 1 = 2·${x*x} − 1 = ${v}.`},
    {t:`Biểu thức biểu thị chu vi hình chữ nhật có chiều dài ${I('a')}, chiều rộng ${I('b')} là 2(${I('a')} + ${I('b')}).`,f:`Biểu thức biểu thị chu vi hình chữ nhật có chiều dài ${I('a')}, chiều rộng ${I('b')} là ${I('a')}${I('b')}.`,why:'Chu vi = 2·(dài + rộng); ab là diện tích.'},
    {t:`Trong biểu thức ${a}${I('x')} + ${I('y')}, các chữ ${I('x')}, ${I('y')} là biến.`,f:`Trong biểu thức ${a}${I('x')} + ${I('y')}, số ${a} là biến.`,why:'Chữ đại diện cho số tuỳ ý là biến; số là hằng số.'}],chk:()=>true});
});
TLN7x('t7x-24-val',7,'TH',[24],r=>{
  for(;;){const x=r.nz(-4,4),y=r.nz(-4,4),a=r.int(2,5),b=r.int(1,4),v=a*x*x-b*x*y+y;if(Math.abs(v)>999)continue;
    return{kind:'tln',stem:`Tính giá trị của biểu thức ${a}${I('x')}${sup(2)} ${MINUS} ${b===1?'':b}${I('x')}${I('y')} + ${I('y')} tại ${I('x')} = ${sg(x)}, ${I('y')} = ${sg(y)}.`,ans:v,unit:'',
      sol:`${a}·(${sg(x)})² − ${b}·(${sg(x)})·(${sg(y)}) + (${sg(y)}) = ${a*x*x} ${-b*x*y>=0?'+':'−'} ${Math.abs(b*x*y)} ${y>=0?'+':'−'} ${Math.abs(y)} = ${sg(v)}.`,chk:()=>true}}
});
TL7x('tl7x-24-box',7,'TH','alg',[24],r=>{
  const x=r.int(3,9),y=r.int(2,6),z=r.int(2,8);
  return{kind:'tl',title:'Biểu thức đại số',parts:[{pts:.5,html:`Một bể nước dạng hình hộp chữ nhật có chiều dài ${I('x')} (m), chiều rộng ${I('y')} (m), chiều cao ${I('z')} (m). Viết biểu thức đại số biểu thị thể tích ${I('V')} và diện tích xung quanh ${I('S')} của bể.`},{pts:.5,html:`Tính ${I('V')} và ${I('S')} khi ${I('x')} = ${x}, ${I('y')} = ${y}, ${I('z')} = ${z}.`}],
    sol:[ptxt([[`V = ${I('x')}${I('y')}${I('z')} (m³).`,.25],[`S = 2(${I('x')} + ${I('y')})${I('z')} (m²).`,.25]]),ptxt([[`V = ${x}·${y}·${z} = ${x*y*z} (m³).`,.25],[`S = 2·(${x} + ${y})·${z} = ${2*(x+y)*z} (m²).`,.25]])],chk:()=>true};
});
TLN7x('t7x-26-coef',7,'TH',[26],r=>{
  const P=[r.nz(-5,5),r.nz(-6,6),r.nz(-6,6),r.int(-9,9)],Qc=[r.nz(-5,5),r.nz(-6,6),r.nz(-6,6),r.int(-9,9)],t=r.chance(.5),R=P.map((c,i)=>t?c+Qc[i]:c-Qc[i]),k=r.int(1,2),v=R[3-k];
  if(v===0)return{kind:'tln',stem:`Cho ${I('P')}(${I('x')}) = ${poly7(P)} và ${I('Q')}(${I('x')}) = ${poly7(Qc)}. Tính giá trị của ${I('P')}(${I('x')}) ${t?'+':MINUS} ${I('Q')}(${I('x')}) tại ${I('x')} = 1.`,ans:R.reduce((a,b)=>a+b,0),unit:'',sol:`${I('P')}(x) ${t?'+':'−'} ${I('Q')}(x) = ${poly7(R)}; tại x = 1 có giá trị ${R.reduce((a,b)=>a+b,0)}.`,chk:()=>true};
  return{kind:'tln',stem:`Cho ${I('P')}(${I('x')}) = ${poly7(P)} và ${I('Q')}(${I('x')}) = ${poly7(Qc)}. Tìm hệ số của ${I('x')}${k>1?sup(k):''} trong đa thức ${I('P')}(${I('x')}) ${t?'+':MINUS} ${I('Q')}(${I('x')}).`,ans:v,unit:'',
    sol:`Hệ số của x${k>1?sup(k):''}: ${sg(P[3-k])} ${t?'+':'−'} (${sg(Qc[3-k])}) = ${sg(v)}. Cụ thể ${I('P')}(x) ${t?'+':'−'} ${I('Q')}(x) = ${poly7(R)}.`,chk:()=>true};
});
N7x('m7x-28-mono',7,'TH',[28],r=>{
  const k=r.int(2,4),a=k*r.nz(-4,4),b=k*r.nz(-4,4),c=k*r.nz(-4,4),m=r.int(1,2),dv=`${k}${I('x')}${m>1?sup(m):''}`;
  const ok=poly7([a/k,b/k,c/k]),W=[poly7([a/k,b/k,c]),poly7([a/k,b/k,c/k,0]),poly7([a/k,b/k,-c/k]),poly7([a/k,-b/k,c/k])].filter(w=>w!==ok);
  return mkTxt(r,{stem:`Kết quả của phép chia (${poly7([a,b,c,...Array(m).fill(0)])}) : ${dv} là`,correct:ok,wrongs:W,
    sol:`Chia từng hạng tử của đa thức cho ${dv}: (${poly7([a,0,0,...Array(m).fill(0)])}) : ${dv} = ${poly7([a/k,0,0])}; (${poly7([b,0,...Array(m).fill(0)])}) : ${dv} = ${poly7([b/k,0])}; (${poly7([c,...Array(m).fill(0)])}) : ${dv} = ${sg(c/k)}. Kết quả: ${ok}.`,chk:()=>true});
});

/* ===================== Bài 29: Làm quen với biến cố ===================== */
N7x('m7x-29-type',8,'NB',[29],r=>{
  const n=r.int(8,20),t=r.int(0,2),T=['chắc chắn','không thể','ngẫu nhiên'];
  const E={0:[`“Rút được thẻ ghi số nhỏ hơn ${n+1}”`,`“Rút được thẻ ghi số dương”`],1:[`“Rút được thẻ ghi số ${n+r.int(1,9)}”`,`“Rút được thẻ ghi số 0”`],2:[`“Rút được thẻ ghi số chẵn”`,`“Rút được thẻ ghi số lớn hơn ${Math.floor(n/2)}”`,`“Rút được thẻ ghi số chia hết cho 3”`]};
  const ok=r.pick(E[t]),W=[0,1,2].filter(k=>k!==t).flatMap(k=>E[k]);
  return mkTxt(r,{stem:`Một hộp có ${n} tấm thẻ ghi các số 1, 2, …, ${n}. Rút ngẫu nhiên một tấm thẻ. Biến cố nào sau đây là biến cố ${T[t]}?`,correct:ok,wrongs:r.shuffle(W).slice(0,3),
    sol:`Biến cố ${ok} ${t===0?'luôn xảy ra':t===1?'không bao giờ xảy ra':'có thể xảy ra hoặc không xảy ra'} nên là biến cố ${T[t]}.`,chk:()=>true});
});
DS7x('ds7x-29-dice',8,'NB',[29],r=>mkDS(r,{stem:'Gieo một con xúc xắc cân đối. Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'“Số chấm xuất hiện nhỏ hơn 7” là biến cố chắc chắn.',f:'“Số chấm xuất hiện nhỏ hơn 7” là biến cố ngẫu nhiên.',why:'Số chấm luôn từ 1 đến 6.'},
  {t:'“Số chấm xuất hiện là 0” là biến cố không thể.',f:'“Số chấm xuất hiện là 0” là biến cố ngẫu nhiên.',why:'Không có mặt 0 chấm.'},
  {t:'“Số chấm xuất hiện là số nguyên tố” là biến cố ngẫu nhiên.',f:'“Số chấm xuất hiện là số nguyên tố” là biến cố chắc chắn.',why:'Có thể ra 2, 3, 5 (nguyên tố) hoặc 1, 4, 6.'},
  {t:'“Số chấm xuất hiện lớn hơn 4” có thể xảy ra hoặc không xảy ra.',f:'“Số chấm xuất hiện lớn hơn 4” chắc chắn xảy ra.',why:'Ra 5, 6 thì xảy ra; ra 1 đến 4 thì không.'}],chk:()=>true}));
TLN7x('t7x-29-count',8,'TH',[29],r=>{
  const n=r.int(10,30),EV=[[`số nhỏ hơn ${n+1}`,'c'],[`số lớn hơn ${n}`,'k'],['số chẵn','n'],['số chia hết cho 5','n'],['số 0','k'],[`số không vượt quá ${n}`,'c'],['số lẻ','n'],['số có hai chữ số','n']];
  const xs=r.shuffle(EV).slice(0,5),t=r.int(0,2),T=['c','k','n'][t],v=xs.filter(e=>e[1]===T).length,NM=['chắc chắn','không thể','ngẫu nhiên'][t];
  if(!v)return{kind:'tln',stem:`Một hộp có ${n} quả bóng đánh số từ 1 đến ${n}. Lấy ngẫu nhiên một quả. Trong các biến cố “Lấy được quả bóng ghi ${xs.map(e=>e[0]).join('”; “Lấy được quả bóng ghi ')}”, có bao nhiêu biến cố ngẫu nhiên?`,ans:xs.filter(e=>e[1]==='n').length,unit:'',sol:`Các biến cố ngẫu nhiên: ${xs.filter(e=>e[1]==='n').map(e=>e[0]).join('; ')}.`,chk:()=>true};
  return{kind:'tln',stem:`Một hộp có ${n} quả bóng đánh số từ 1 đến ${n}. Lấy ngẫu nhiên một quả. Trong các biến cố “Lấy được quả bóng ghi ${xs.map(e=>e[0]).join('”; “Lấy được quả bóng ghi ')}”, có bao nhiêu biến cố ${NM}?`,ans:v,unit:'',
    sol:`Các biến cố ${NM}: ${xs.filter(e=>e[1]===T).map(e=>e[0]).join('; ')} – có ${v} biến cố.`,chk:()=>true};
});

/* ===================== Bài 32, 35: Đường vuông góc – đường xiên; đồng quy ===================== */
N7x('m7x-32-cmp',9,'TH',[32],r=>{
  const p=r.int(2,9),q=p+r.int(1,6);
  return mkTxt(r,{stem:`Từ điểm ${I('A')} nằm ngoài đường thẳng ${I('d')}, kẻ ${I('AH')} ⊥ ${I('d')} (${I('H')} ∈ ${I('d')}) và hai đường xiên ${I('AB')}, ${I('AC')} (${I('B')}, ${I('C')} ∈ ${I('d')}) với ${I('HB')} = ${p} cm, ${I('HC')} = ${q} cm. Khẳng định nào sau đây đúng?`,correct:`${I('AH')} < ${I('AB')} < ${I('AC')}`,wrongs:[`${I('AH')} < ${I('AC')} < ${I('AB')}`,`${I('AB')} < ${I('AH')} < ${I('AC')}`,`${I('AB')} = ${I('AC')}`],
    sol:`Đường vuông góc ngắn hơn mọi đường xiên; đường xiên nào có hình chiếu lớn hơn thì lớn hơn. Vì HB < HC nên AH < AB < AC.`,chk:()=>true});
});
TLN7x('t7x-32-short',9,'NB',[32],r=>{
  const h=r.int(20,90),b=h+r.int(5,40),c=b+r.int(5,40);
  return{kind:'tln',stem:`Nhà bạn Nam ở vị trí ${I('A')}, cách bờ sông thẳng ${I('d')}. Từ ${I('A')} đến bờ sông có ba lối đi thẳng: ${I('AH')} = ${h} m (${I('AH')} ⊥ ${I('d')}), ${I('AB')} = ${b} m, ${I('AC')} = ${c} m. Đường đi ngắn nhất từ nhà Nam ra bờ sông dài bao nhiêu mét?`,ans:h,unit:'m',
    sol:`Đường vuông góc AH ngắn hơn mọi đường xiên nên đường ngắn nhất là AH = ${h} m; đó cũng là khoảng cách từ A đến d.`,chk:()=>true};
});
N7x('m7x-35-name',9,'NB',[35],r=>{
  const t=r.int(0,3);
  const C=[['Giao điểm của ba đường trung trực của một tam giác','cách đều ba đỉnh của tam giác',['cách đều ba cạnh của tam giác','là trọng tâm của tam giác','luôn nằm trong tam giác'],'Mỗi điểm trên đường trung trực cách đều hai đầu đoạn thẳng nên giao điểm ba đường trung trực cách đều ba đỉnh.'],
    ['Giao điểm của ba đường cao của một tam giác được gọi là','trực tâm của tam giác',['trọng tâm của tam giác','tâm đường tròn ngoại tiếp','điểm cách đều ba cạnh'],'Ba đường cao cùng đi qua một điểm, gọi là trực tâm.'],
    ['Trực tâm của tam giác vuông là','đỉnh góc vuông',['trung điểm cạnh huyền','trọng tâm của tam giác','một điểm nằm ngoài tam giác'],'Hai cạnh góc vuông là hai đường cao nên trực tâm là đỉnh góc vuông.'],
    ['Giao điểm ba đường trung trực của tam giác vuông là','trung điểm cạnh huyền',['đỉnh góc vuông','trọng tâm của tam giác','một điểm nằm ngoài tam giác'],'Với tam giác vuông, giao điểm ba đường trung trực là trung điểm cạnh huyền.']][t];
  return mkTxt(r,{stem:C[0],correct:C[1],wrongs:C[2],sol:C[3],chk:()=>true});
});
DS7x('ds7x-35-conc',9,'NB',[34,35],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Ba đường cao của một tam giác cùng đi qua một điểm.',f:'Ba đường cao của một tam giác không bao giờ cùng đi qua một điểm.',why:'Ba đường cao của tam giác đồng quy tại trực tâm.'},
  {t:'Giao điểm ba đường trung trực của tam giác cách đều ba đỉnh.',f:'Giao điểm ba đường trung trực của tam giác cách đều ba cạnh.',why:'Điểm cách đều ba cạnh là giao điểm ba đường phân giác.'},
  {t:'Trong tam giác đều, trọng tâm, trực tâm và giao điểm ba đường trung trực trùng nhau.',f:'Trong tam giác đều, trọng tâm và trực tâm là hai điểm khác nhau.',why:'Trong tam giác đều, mỗi đường trung tuyến đồng thời là đường cao, đường trung trực, đường phân giác.'},
  {t:'Trực tâm của tam giác có một góc tù nằm ngoài tam giác.',f:'Trực tâm của tam giác có một góc tù nằm trong tam giác.',why:'Với tam giác tù, hai đường cao kẻ từ đỉnh góc nhọn nằm ngoài tam giác nên trực tâm nằm ngoài.'}],chk:()=>true}));
TLN7x('t7x-35-circ',9,'TH',[35],r=>{
  const t=r.chance(.5),k=r.int(3,15);
  return t?{kind:'tln',stem:`Cho tam giác ${I('ABC')}, ${I('O')} là giao điểm ba đường trung trực của tam giác. Biết ${I('OA')} = ${k} cm. Tính ${I('OB')} + ${I('OC')} (đơn vị: cm).`,ans:2*k,unit:'cm',sol:`O cách đều ba đỉnh: OB = OC = OA = ${k} cm, nên OB + OC = ${2*k} cm.`,chk:()=>true}
    :{kind:'tln',stem:`Tam giác ${I('ABC')} vuông tại ${I('A')} có cạnh huyền ${I('BC')} = ${2*k} cm. ${I('O')} là giao điểm ba đường trung trực của tam giác. Tính ${I('OA')} (đơn vị: cm).`,ans:k,unit:'cm',sol:`Với tam giác vuông, O là trung điểm cạnh huyền BC; O cách đều ba đỉnh nên OA = OB = BC : 2 = ${k} cm.`,chk:()=>true};
});
TL7x('tl7x-35-alt',9,'VD','geo',[35],r=>{
  const a=r.int(9,16)*5;
  return{kind:'tl',title:'Trực tâm của tam giác',parts:[{pts:.5,html:`Cho tam giác ${I('ABC')} có ba góc nhọn, ${ANG('BAC')} = ${a}°. Hai đường cao ${I('BD')} và ${I('CE')} cắt nhau tại ${I('H')}. Chứng minh ${I('AH')} ⊥ ${I('BC')}.`},{pts:.5,html:`Tính số đo các góc ${ANG('ABD')} và ${ANG('BHC')}.`}],
    sol:[ptxt([[`BD, CE là hai đường cao của tam giác ABC, cắt nhau tại H nên H là trực tâm.`,.25],[`Ba đường cao đồng quy tại H, do đó AH nằm trên đường cao thứ ba, tức AH ⊥ BC.`,.25]]),
      ptxt([[`Tam giác ABD vuông tại D: ∠ABD = 90° − ${a}° = ${90-a}°.`,.25],[`Tam giác BEH vuông tại E: ∠BHE = 90° − ∠EBH = 90° − ${90-a}° = ${a}°, nên ∠BHC = 180° − ${a}° = ${180-a}° (hai góc kề bù).`,.25]])],chk:()=>true};
});

/* ===== Bổ sung theo dạng bài thực tế trong đề cuối kì I 2025 – 2026 (khối lượng cặp sách) ===== */
const bag7=r=>{for(;;){const m=r.int(30,48)*10+r.pick([0,5])*1,c=r.int(25,38)*100,q=r.pick([120,150,160,180,200]),cap=m*10,free=cap-c;if(free<q*2)continue;return{m,c,q,cap,free,n:Math.floor(free/q)}}};
TLN7x('t7x-2-bag',1,'VD',[2],r=>{
  const {m,c,q,cap,n}=bag7(r);
  return{kind:'tln',stem:`Nhiều khuyến nghị về sức khoẻ học đường cho rằng khối lượng cặp sách của học sinh không nên vượt quá 10% khối lượng cơ thể. Bạn Minh nặng ${dec6(m/10)} kg, chiếc cặp hằng ngày nặng ${dec6(c/1000)} kg. Hôm nay Minh cần mang thêm một số quyển vở, mỗi quyển nặng ${q} g. Minh có thể mang thêm nhiều nhất bao nhiêu quyển vở để vẫn đúng khuyến nghị?`,ans:n,unit:'quyển',
    sol:`Khối lượng cặp tối đa: 10% · ${dec6(m/10)} = ${dec6(cap/1000)} (kg) = ${nv(cap)} g. Còn có thể thêm ${nv(cap)} − ${nv(c)} = ${nv(cap-c)} (g); ${nv(cap-c)} : ${q} ${(cap-c)%q?'≈':'='} ${fmt(Math.round((cap-c)/q*100)/100)}, nên mang thêm nhiều nhất ${n} quyển.`,chk:()=>n>=2};
});
TL7x('tl7x-2-bag',1,'VD','real',[2,4],r=>{
  const {m,c,q,cap,n}=bag7(r),t=r.int(1,n);
  return{kind:'tl',title:'Bài toán thực tế',parts:[{pts:.5,html:`Theo khuyến nghị, khối lượng cặp sách của học sinh không nên vượt quá 10% khối lượng cơ thể. Bạn Lan nặng ${dec6(m/10)} kg, chiếc cặp hằng ngày nặng ${dec6(c/1000)} kg. Nếu Lan bỏ thêm vào cặp ${t} quyển sách, mỗi quyển nặng ${q} g thì khối lượng cặp là bao nhiêu ki-lô-gam? Có vượt khuyến nghị không?`},{pts:.5,html:`Lan có thể mang thêm nhiều nhất bao nhiêu quyển sách như vậy để vẫn đúng khuyến nghị?`}],
    sol:[ptxt([[`Khối lượng cặp: ${dec6(c/1000)} + ${t}·${dec6(q/1000)} = ${dec6((c+t*q)/1000)} (kg).`,.25],[`Khối lượng tối đa theo khuyến nghị: 10% · ${dec6(m/10)} = ${dec6(cap/1000)} (kg); ${dec6((c+t*q)/1000)} ${c+t*q<=cap?'≤':'>'} ${dec6(cap/1000)} nên ${c+t*q<=cap?'không vượt':'vượt'} khuyến nghị.`,.25]]),
      ptxt([[`Khối lượng còn được thêm: ${dec6(cap/1000)} − ${dec6(c/1000)} = ${dec6((cap-c)/1000)} (kg).`,.25],[`${dec6((cap-c)/1000)} : ${dec6(q/1000)} ${(cap-c)%q?'≈':'='} ${fmt(Math.round((cap-c)/q*100)/100)}, nên mang thêm nhiều nhất ${n} quyển.`,.25]])],chk:()=>true};
});
