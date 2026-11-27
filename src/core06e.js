/* ================================================================
   LỚP 6 – bổ sung dạng câu cho các bài còn ít dạng (27/11/2026)
   Mỗi bài học có ít nhất 6 dạng, đủ các loại câu: nhiều lựa chọn, đúng/sai, trả lời ngắn, tự luận.
   Bài 1 – 22: học kì I; Bài 23 – 43: học kì II.
   ================================================================ */
const hk6=les=>Math.min(...les)<=22?1:2;
const N6x=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:6,hk:hk6(les),les});
const DS6x=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:6,hk:hk6(les),les});
const TLN6x=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:6,hk:hk6(les),les});
const TL6x=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:6,hk:hk6(les),les});
const cnt6=(a,b,k)=>Math.floor(b/k)-Math.floor((a-1)/k);/* số bội của k trong [a; b] */
const digs6=n=>n<10?n:n<100?9+2*(n-9):189+3*(n-99);/* số chữ số khi viết liền 1, 2, …, n */

/* ===================== Bài 1: Tập hợp ===================== */
N6x('k6x-1-digits',1,'NB',[1],r=>{
  for(;;){const n=r.int(10000,99999),ds=[...new Set(String(n).split('').map(Number))].sort((a,b)=>a-b);if(ds.length<4)continue;
    const all=String(n).split('').map(Number);
    return mkTxt(r,{stem:`Tập hợp ${I('M')} các chữ số của số ${nv(n)} là`,correct:set6(ds),wrongs:[`{${all.join('; ')}}`,set6(ds.slice(1)),set6([...ds,ds[ds.length-1]+1>9?ds[0]+1:ds[ds.length-1]+1].filter((v,i,s)=>s.indexOf(v)===i).sort((a,b)=>a-b)),`{${nv(n)}}`].filter(w=>w!==set6(ds)),
      sol:`Các chữ số của ${nv(n)} là ${ds.join(', ')}; mỗi phần tử chỉ viết một lần: ${I('M')} = ${set6(ds)}.`,chk:()=>true})}
});
TLN6x('t6x-1-mult',1,'TH',[1],r=>{
  const k=r.pick([2,3,4,5,6,7,9]),a=r.int(10,40),b=a+r.int(30,150),v=cnt6(a,b,k);
  return{kind:'tln',stem:`Cho tập hợp ${I('A')} = {${I('x')} ∈ ℕ | ${a} ≤ ${I('x')} ≤ ${b} và ${I('x')} chia hết cho ${k}}. Tập hợp ${I('A')} có bao nhiêu phần tử?`,ans:v,unit:'',
    sol:`Các phần tử của A là các bội của ${k} từ ${Math.ceil(a/k)*k} đến ${Math.floor(b/k)*k}: (${Math.floor(b/k)*k} − ${Math.ceil(a/k)*k}) : ${k} + 1 = ${v} phần tử.`,chk:()=>v>0};
});
TL6x('tl6x-1-set',1,'TH','alg',[1],r=>{
  const a=r.int(3,12),b=a+r.int(4,6),c=r.int(5,9),xs=[];for(let x=a+1;x<=b;x++)xs.push(x);
  const ev=[];for(let x=1;x<c;x++)if(x%2===0)ev.push(x);
  return{kind:'tl',title:'Tập hợp',parts:[{pts:.5,html:`Viết tập hợp ${I('A')} các số tự nhiên lớn hơn ${a} và không vượt quá ${b} bằng hai cách.`},{pts:.5,html:`Cho tập hợp ${I('B')} = {${I('x')} ∈ ℕ* | ${I('x')} < ${c} và ${I('x')} là số chẵn}. Viết ${I('B')} bằng cách liệt kê các phần tử. Tập hợp ${I('B')} có bao nhiêu phần tử?`}],
    sol:[ptxt([[`Liệt kê: ${I('A')} = ${set6(xs)}.`,.25],[`Chỉ ra tính chất đặc trưng: ${I('A')} = {${I('x')} ∈ ℕ | ${a} < ${I('x')} ≤ ${b}}.`,.25]]),
      ptxt([[`${I('B')} = ${set6(ev)}.`,.25],[`${I('B')} có ${ev.length} phần tử.`,.25]])],chk:()=>ev.length>=2};
});

/* ===================== Bài 2: Cách ghi số tự nhiên ===================== */
N6x('k6x-2-compose',1,'NB',[2],r=>{
  for(;;){const d=[r.int(1,9),r.int(0,9),r.int(1,9),0,r.int(1,9)];if(d[1]===0)continue;const n=d[0]*10000+d[1]*1000+d[2]*100+d[4];
    return mkNum(r,{stem:`Số gồm ${d[0]} chục nghìn, ${d[1]} nghìn, ${d[2]} trăm và ${d[4]} đơn vị là`,correct:n,f:nv,
      cands:[d[0]*1000+d[1]*100+d[2]*10+d[4],d[0]*10000+d[1]*1000+d[2]*10+d[4],d[0]*100000+d[1]*10000+d[2]*100+d[4],d[0]*10000+d[1]*1000+d[2]*100+d[4]*10],ok:x=>x>0,
      sol:`${d[0]}·10 000 + ${d[1]}·1 000 + ${d[2]}·100 + ${d[4]} = ${nv(n)} (hàng chục là chữ số 0).`,chk:()=>true})}
});
N6x('k6x-2-romanmax',1,'TH',[2],r=>{
  for(;;){const xs=r.shuffle([...Array(26)].map((_,i)=>i+4)).slice(0,4),big=r.chance(.5),v=big?Math.max(...xs):Math.min(...xs);
    if(xs.some(x=>x!==v&&Math.abs(x-v)<2))continue;
    return mkTxt(r,{stem:`Trong các số La Mã sau, số có giá trị ${big?'lớn':'nhỏ'} nhất là`,correct:ROMAN(v),wrongs:xs.filter(x=>x!==v).map(ROMAN),
      sol:xs.map(x=>`${ROMAN(x)} = ${x}`).join('; ')+`. Số ${big?'lớn':'nhỏ'} nhất là ${ROMAN(v)}.`,chk:()=>true})}
});
DS6x('ds6x-2-num',1,'NB',[2],r=>{
  for(;;){const n=r.int(10000,99999),s=String(n),h=+s[2],t=Math.floor(n/10),m=r.int(11,29);if(h===0||s[2]===s[3])continue;
    return mkDS(r,{stem:`Cho số ${nv(n)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Chữ số hàng trăm của số đã cho là ${h}.`,f:`Chữ số hàng trăm của số đã cho là ${s[3]}.`,why:`Đếm từ phải sang: đơn vị ${s[4]}, chục ${s[3]}, trăm ${h}.`},
      {t:`Số chục của số đã cho là ${nv(t)}.`,f:`Số chục của số đã cho là ${s[3]}.`,why:`Bỏ chữ số hàng đơn vị được số chục: ${nv(t)}. Chữ số hàng chục (${s[3]}) khác với số chục.`},
      {t:`Chữ số ${h} ở hàng trăm có giá trị ${h*100}.`,f:`Chữ số ${h} ở hàng trăm có giá trị ${h}.`,why:`Giá trị = ${h}·100 = ${h*100}.`},
      {t:`Số La Mã ${ROMAN(m)} có giá trị ${m}.`,f:`Số La Mã ${ROMAN(m)} có giá trị ${m+r.pick([-2,2,10])}.`,why:`${ROMAN(m)} = ${m}.`}],chk:()=>true})}
});
TLN6x('t6x-2-hund',1,'TH',[2],r=>{
  const n=r.int(10000,999999),t=r.chance(.5),k=t?10:100,v=Math.floor(n/k);
  if(v>9999)return{kind:'tln',stem:`Số ${nv(n)} có chữ số hàng ${t?'chục':'trăm'} là bao nhiêu?`,ans:Math.floor(n/k)%10,unit:'',sol:`Chữ số hàng ${t?'chục':'trăm'} của ${nv(n)} là ${Math.floor(n/k)%10}.`,chk:()=>true};
  return{kind:'tln',stem:`Số ${nv(n)} có bao nhiêu ${t?'chục':'trăm'}?`,ans:v,unit:'',sol:`Bỏ ${t?'chữ số hàng đơn vị':'hai chữ số hàng chục và hàng đơn vị'} được số ${t?'chục':'trăm'}: ${nv(v)}.`,chk:()=>true};
});

/* ===================== Bài 3: Thứ tự trong tập hợp các số tự nhiên ===================== */
N6x('k6x-3-cmp',1,'NB',[3],r=>{
  for(;;){const a=r.int(10000,99999),s=String(a).split(''),i=r.int(1,3);if(s[i]===s[i+1])continue;[s[i],s[i+1]]=[s[i+1],s[i]];const b=+s.join(''),lo=Math.min(a,b),hi=Math.max(a,b);
    return mkTxt(r,{stem:'Khẳng định nào sau đây đúng?',correct:`${nv(lo)} < ${nv(hi)}`,wrongs:[`${nv(lo)} > ${nv(hi)}`,`${nv(hi)} < ${nv(lo)}`,`${nv(lo)} = ${nv(hi)}`,`${nv(hi)} ≤ ${nv(lo)}`],
      sol:`Hai số cùng có 5 chữ số; so sánh từ trái sang, ở hàng đầu tiên khác nhau ${nv(lo)} có chữ số nhỏ hơn nên ${nv(lo)} < ${nv(hi)}.`,chk:()=>a!==b})}
});
N6x('k6x-3-between',1,'TH',[3],r=>{
  const a=r.int(5,60),b=a+r.int(4,20),t=r.int(0,2),v=[b-a-1,b-a+1,b-a][t],cond=[`${a} < ${I('x')} < ${b}`,`${a} ≤ ${I('x')} ≤ ${b}`,`${a} ≤ ${I('x')} < ${b}`][t];
  return mkNum(r,{stem:`Có bao nhiêu số tự nhiên ${I('x')} thoả mãn ${cond}?`,correct:v,cands:[v+1,v-1,v+2,b-a].filter(x=>x>0),ok:x=>x>0,
    sol:`Các số đó là ${[a+1,a,a][t]}, ${[a+2,a+1,a+1][t]}, …, ${[b-1,b,b-1][t]}: có ${v} số.`,chk:()=>true});
});
DS6x('ds6x-3-order',1,'NB',[3],r=>{
  const n=r.int(1000,99999),k=r.int(3,6);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`Số liền trước của ${nv(n)} là ${nv(n-1)}.`,f:`Số liền trước của ${nv(n)} là ${nv(n+1)}.`,why:`Số liền trước của n là n − 1.`},
    {t:'Số tự nhiên nhỏ nhất là 0.',f:'Số tự nhiên nhỏ nhất là 1.',why:'0 ∈ ℕ và 0 nhỏ hơn mọi số tự nhiên khác.'},
    {t:'Không có số tự nhiên lớn nhất.',f:`Số tự nhiên lớn nhất là ${nv(10**k-1)}.`,why:'Mọi số tự nhiên n đều có số liền sau n + 1 lớn hơn nó.'},
    {t:`Số tự nhiên nhỏ nhất có ${k} chữ số là ${nv(10**(k-1))}.`,f:`Số tự nhiên nhỏ nhất có ${k} chữ số là ${nv(10**(k-1)-1)}.`,why:`${nv(10**(k-1)-1)} chỉ có ${k-1} chữ số; số nhỏ nhất có ${k} chữ số là ${nv(10**(k-1))}.`}],chk:()=>true});
});
TLN6x('t6x-3-count',1,'TH',[3],r=>{
  const t=r.int(0,2);
  if(t===0){const k=r.int(2,4),v=9*10**(k-1);return{kind:'tln',stem:`Có bao nhiêu số tự nhiên có ${k} chữ số?`,ans:v,unit:'',sol:`Từ ${nv(10**(k-1))} đến ${nv(10**k-1)} có ${nv(10**k-1)} − ${nv(10**(k-1))} + 1 = ${nv(v)} số.`,chk:()=>v<10000}}
  if(t===1){const v=45;return{kind:'tln',stem:'Có bao nhiêu số tự nhiên có hai chữ số mà chữ số hàng chục lớn hơn chữ số hàng đơn vị?',ans:v,unit:'',sol:'Chữ số hàng chục a (1 – 9) có a cách chọn chữ số đơn vị nhỏ hơn a (0 đến a − 1): 1 + 2 + … + 9 = 45 số.',chk:()=>true}}
  const a=r.int(100,900),b=a+r.int(50,800),v=b-a+1;return{kind:'tln',stem:`Có bao nhiêu số tự nhiên từ ${nv(a)} đến ${nv(b)}?`,ans:v,unit:'',sol:`${nv(b)} − ${nv(a)} + 1 = ${nv(v)} số.`,chk:()=>true};
});
TLN6x('t6x-3-digits',1,'VD',[2,3],r=>{
  const n=r.int(40,400),v=digs6(n);
  return{kind:'tln',stem:`Để viết liên tiếp các số tự nhiên từ 1 đến ${n} cần dùng tất cả bao nhiêu chữ số?`,ans:v,unit:'',
    sol:n<100?`Từ 1 đến 9: 9 chữ số; từ 10 đến ${n}: ${n-9} số, mỗi số 2 chữ số. Tổng: 9 + ${n-9}·2 = ${v}.`:`Từ 1 đến 9: 9 chữ số; từ 10 đến 99: 90·2 = 180 chữ số; từ 100 đến ${n}: ${n-99}·3 = ${3*(n-99)} chữ số. Tổng: ${v}.`,chk:()=>true};
});
TL6x('tl6x-3-order',1,'TH','alg',[3],r=>{
  for(;;){const xs=r.shuffle([...Array(5)].map(()=>r.int(1000,9999)));if(new Set(xs).size<5)continue;const s=[...xs].sort((a,b)=>a-b);
    const a=r.int(10,40),b=a+r.int(5,9),ev=[];for(let x=a;x<b;x++)if(x%2===0)ev.push(x);
    return{kind:'tl',title:'Thứ tự trong tập hợp số tự nhiên',parts:[{pts:.5,html:`Sắp xếp các số sau theo thứ tự tăng dần: ${xs.map(nv).join('; ')}.`},{pts:.5,html:`Tìm các số tự nhiên chẵn ${I('x')} sao cho ${a} ≤ ${I('x')} < ${b}.`}],
      sol:[ptxt([[`So sánh từng cặp chữ số từ hàng nghìn.`,.25],[`Thứ tự tăng dần: ${s.map(nv).join('; ')}.`,.25]]),ptxt([[`Các số tự nhiên từ ${a} đến ${b-1}, chọn số chẵn.`,.25],[`${I('x')} ∈ ${set6(ev)}.`,.25]])],chk:()=>ev.length>=2}}
});

/* ===================== Bài 7: Thứ tự thực hiện các phép tính ===================== */
N6x('k6x-7-rule',1,'NB',[7],r=>{
  const t=r.chance(.5);
  return t?mkTxt(r,{stem:'Đối với biểu thức có dấu ngoặc, thứ tự thực hiện các phép tính là',correct:'( ) → [ ] → { }',wrongs:['{ } → [ ] → ( )','[ ] → ( ) → { }','( ) → { } → [ ]'],sol:'Thực hiện trong ngoặc tròn trước, rồi ngoặc vuông, cuối cùng ngoặc nhọn.',chk:()=>true})
    :mkTxt(r,{stem:'Đối với biểu thức không có dấu ngoặc, thứ tự thực hiện các phép tính là',correct:'Luỹ thừa → nhân và chia → cộng và trừ',wrongs:['Nhân và chia → luỹ thừa → cộng và trừ','Cộng và trừ → nhân và chia → luỹ thừa','Từ trái sang phải, không phân biệt phép tính'],sol:'Luỹ thừa trước, rồi nhân và chia, cuối cùng cộng và trừ.',chk:()=>true});
});
TLN6x('t6x-7-expr',1,'TH',[6,7],r=>{
  for(;;){const a=r.int(2,5),b=r.int(2,4),c=r.int(20,60),d=r.int(2,6),e=r.int(1,5),in1=c-d*e;if(in1<=0)continue;const v=a**b+3*in1;if(v>9999)continue;
    return{kind:'tln',stem:`Tính giá trị của biểu thức ${pw6(a,b)} + 3·(${c} ${MINUS} ${d}·${e}).`,ans:v,unit:'',sol:`${pw6(a,b)} = ${a**b}; ${c} − ${d}·${e} = ${c} − ${d*e} = ${in1}. Vậy giá trị là ${a**b} + 3·${in1} = ${v}.`,chk:()=>true}}
});

/* ===================== Bài 8: Quan hệ chia hết và tính chất ===================== */
N6x('k6x-8-sum',2,'TH',[8],r=>{
  const k=r.pick([3,4,6,7,8,9]),m=()=>k*r.int(3,20),nm=()=>{for(;;){const x=r.int(10,150);if(x%k)return x}};
  const ok=`${m()} + ${m()}`,W=[`${m()} + ${nm()}`,`${nm()} + ${m()}`,`${m()} ${MINUS} ${nm()}`,`${m()} + ${m()} + ${nm()}`];
  return mkTxt(r,{stem:`Tổng (hiệu) nào sau đây chắc chắn chia hết cho ${k}?`,correct:ok,wrongs:W,sol:`Nếu tất cả các số hạng đều chia hết cho ${k} thì tổng chia hết cho ${k}; nếu chỉ một số hạng không chia hết cho ${k} thì tổng (hiệu) không chia hết cho ${k}.`,chk:()=>true});
});
DS6x('ds6x-8-div',2,'NB',[8],r=>{
  const k=r.pick([4,5,6,7,9]),a=k*r.int(5,30),b=k*r.int(5,30),c=(()=>{for(;;){const x=r.int(20,200);if(x%k)return x}})(),d=r.pick([2,3]);
  return mkDS(r,{stem:`Cho các số ${I('a')} = ${a}, ${I('b')} = ${b}, ${I('c')} = ${c}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('a')} là bội của ${k}.`,f:`${I('a')} không là bội của ${k}.`,why:`${a} = ${k}·${a/k}.`},
    {t:`${I('a')} + ${I('b')} chia hết cho ${k}.`,f:`${I('a')} + ${I('b')} không chia hết cho ${k}.`,why:`Cả hai số hạng đều chia hết cho ${k}.`},
    {t:`${I('a')} + ${I('c')} không chia hết cho ${k}.`,f:`${I('a')} + ${I('c')} chia hết cho ${k}.`,why:`${a} ⋮ ${k} nhưng ${c} không chia hết cho ${k}.`},
    {t:`${k} là ước của ${d}·${I('b')}.`,f:`${k} không là ước của ${d}·${I('b')}.`,why:`${b} ⋮ ${k} nên ${d}·${b} ⋮ ${k}.`}],chk:()=>true});
});
TLN6x('t6x-8-mult',2,'TH',[8],r=>{
  const k=r.int(6,25),a=r.int(30,200),b=a+r.int(100,500),v=cnt6(a,b,k);
  return{kind:'tln',stem:`Có bao nhiêu bội của ${k} nằm trong khoảng từ ${a} đến ${b}?`,ans:v,unit:'',sol:`Bội nhỏ nhất ≥ ${a} là ${Math.ceil(a/k)*k}, bội lớn nhất ≤ ${b} là ${Math.floor(b/k)*k}. Số bội: (${Math.floor(b/k)*k} − ${Math.ceil(a/k)*k}) : ${k} + 1 = ${v}.`,chk:()=>v>0};
});

/* ===================== Bài 9, 10: Dấu hiệu chia hết, số nguyên tố ===================== */
N6x('k6x-9-all',2,'TH',[9],r=>{
  for(;;){const ok=r.int(11,111)*90;if(ok>9999)continue;
    const W=[ok+5,ok+30,ok+45,ok+18];/* tận cùng 5; tổng chữ số không chia hết cho 9; tận cùng 8 */
    return mkNum(r,{stem:'Trong các số sau, số chia hết cho cả 2, 3, 5 và 9 là',correct:ok,f:nv,cands:W,ok:x=>x>0&&x%90!==0,
      sol:`Số chia hết cho cả 2 và 5 có chữ số tận cùng là 0; chia hết cho 9 (nên cũng chia hết cho 3) khi tổng các chữ số chia hết cho 9. Số ${nv(ok)} thoả mãn.`,chk:()=>true})}
});
N6x('k6x-10-count',2,'TH',[10],r=>{
  const [n,v]=r.pick([[10,4],[20,8],[30,10],[40,12],[50,15]]);
  return mkNum(r,{stem:`Có bao nhiêu số nguyên tố nhỏ hơn ${n}?`,correct:v,cands:[v+1,v-1,v+2,n/2],ok:x=>x>0,
    sol:`Các số nguyên tố nhỏ hơn ${n}: ${[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47].filter(p=>p<n).join(', ')} – có ${v} số.`,chk:()=>true});
});

/* ===================== Bài 13: Tập hợp các số nguyên ===================== */
TLN6x('t6x-13-count',3,'TH',[13],r=>{
  const a=r.int(2,12),b=r.int(2,12),t=r.chance(.5),v=t?a+b-1:a+b+1;
  return{kind:'tln',stem:`Có bao nhiêu số nguyên ${I('x')} thoả mãn ${MINUS}${a} ${t?'<':'≤'} ${I('x')} ${t?'<':'≤'} ${b}?`,ans:v,unit:'',
    sol:`Các số nguyên đó là ${t?sg(-a+1):sg(-a)}, …, ${t?b-1:b}: có ${v} số.`,chk:()=>true};
});
TLN6x('t6x-13-real',3,'NB',[13],r=>{
  const t=r.int(0,2),v=r.int(3,60);
  const S=[[`Một tàu ngầm đang ở độ sâu ${v} m dưới mực nước biển. Số nguyên biểu thị độ cao của tàu ngầm so với mực nước biển là bao nhiêu (đơn vị mét)?`,-v,`Dưới mực nước biển biểu thị bởi số nguyên âm: ${sg(-v)}.`],
    [`Nhiệt độ ở một thành phố vào sáng sớm là ${v%25+1} độ dưới 0 °C. Số nguyên biểu thị nhiệt độ đó là bao nhiêu (đơn vị °C)?`,-(v%25+1),`Dưới 0 °C biểu thị bởi số nguyên âm: ${sg(-(v%25+1))}.`],
    [`Một cửa hàng bị lỗ ${v} triệu đồng. Nếu lãi được biểu thị bằng số nguyên dương thì số tiền lỗ trên được biểu thị bởi số nguyên nào (đơn vị triệu đồng)?`,-v,`Lỗ biểu thị bởi số nguyên âm: ${sg(-v)}.`]][t];
  return{kind:'tln',stem:S[0],ans:S[1],unit:'',sol:S[2],chk:()=>true};
});
TL6x('tl6x-13-int',3,'TH','num',[13],r=>{
  for(;;){const xs=r.shuffle([r.int(-30,-15),r.int(-14,-2),0,r.int(1,9),r.int(10,30),r.int(-9,-1)]);if(new Set(xs).size<6)continue;const s=[...xs].sort((a,b)=>a-b);
    const a=r.int(2,5),b=r.int(1,4),ys=[];for(let x=-a;x<b;x++)ys.push(x);
    return{kind:'tl',title:'Số nguyên',parts:[{pts:.5,html:`Sắp xếp các số nguyên sau theo thứ tự tăng dần: ${xs.map(sg).join('; ')}.`},{pts:.5,html:`Tìm các số nguyên ${I('x')} sao cho ${MINUS}${a} ≤ ${I('x')} < ${b}. Viết số đối của số nhỏ nhất tìm được.`}],
      sol:[ptxt([[`Số nguyên âm nhỏ hơn 0, nhỏ hơn mọi số nguyên dương; trong hai số âm, số nào có số đối lớn hơn thì nhỏ hơn.`,.25],[`Thứ tự tăng dần: ${s.map(sg).join('; ')}.`,.25]]),
        ptxt([[`${I('x')} ∈ {${ys.map(sg).join('; ')}}.`,.25],[`Số nhỏ nhất là ${sg(-a)}, số đối của nó là ${a}.`,.25]])],chk:()=>true}}
});

/* ===================== Bài 17: Ước và bội của số nguyên ===================== */
N6x('k6x-17-divs',3,'NB',[17],r=>{
  const n=r.pick([4,6,8,9,10,12,15]),ds=divs6(n),all=[...ds.map(d=>-d).reverse(),...ds];
  return mkTxt(r,{stem:`Tập hợp các ước của ${sg(-n)} là`,correct:`{${all.map(sg).join('; ')}}`,wrongs:[`{${ds.join('; ')}}`,`{${ds.map(d=>sg(-d)).join('; ')}}`,`{${[...ds.slice(1,-1).map(d=>-d).reverse(),...ds.slice(1,-1)].map(sg).join('; ')}}`,`{${[0,...ds].join('; ')}}`],
    sol:`Các ước tự nhiên của ${n} là ${ds.join(', ')}; ước của số nguyên gồm cả các số đối của chúng.`,chk:()=>true});
});

/* ===================== Bài 18, 19: Các hình phẳng trong thực tiễn ===================== */
N6x('k6x-18-hex',4,'NB',[18],r=>{
  const t=r.int(0,2);
  if(t===0)return mkTxt(r,{stem:'Khẳng định nào sau đây về lục giác đều là đúng?',correct:'Có sáu cạnh bằng nhau, sáu góc bằng nhau và ba đường chéo chính bằng nhau.',wrongs:['Có sáu cạnh bằng nhau và sáu đường chéo chính bằng nhau.','Có sáu cạnh bằng nhau nhưng các góc không bằng nhau.','Có ba cạnh bằng nhau và ba góc bằng nhau.'],sol:'Lục giác đều có 6 cạnh bằng nhau, 6 góc bằng nhau, 3 đường chéo chính bằng nhau.',chk:()=>true});
  if(t===1)return mkTxt(r,{stem:'Ghép sáu tam giác đều bằng nhau (như hình ảnh trong sách giáo khoa) ta được hình nào?',correct:'Lục giác đều',wrongs:['Hình vuông','Tam giác đều','Hình thoi'],sol:'Sáu tam giác đều chung một đỉnh ghép lại thành một lục giác đều.',chk:()=>true});
  return mkTxt(r,{stem:'Mỗi góc của tam giác đều có số đo bằng',correct:'60°',wrongs:['90°','45°','120°'],sol:'Ba góc của tam giác đều bằng nhau, mỗi góc 60°.',chk:()=>true});
});
TLN6x('t6x-18-hex',4,'TH',[18],r=>{
  const a=r.int(3,15),t=r.chance(.5),v=t?6*a:2*a;
  return{kind:'tln',stem:`Một lục giác đều được ghép từ sáu tam giác đều có cạnh ${a} cm. Tính ${t?'chu vi của lục giác đều':'độ dài một đường chéo chính của lục giác đều'} (đơn vị: cm).`,ans:v,unit:'cm',
    sol:t?`Cạnh lục giác đều bằng cạnh tam giác đều: ${a} cm. Chu vi: 6·${a} = ${v} (cm).`:`Đường chéo chính gồm hai cạnh tam giác đều: 2·${a} = ${v} (cm).`,chk:()=>true};
});
TLN6x('t6x-18-sq',4,'TH',[18,20],r=>{
  const a=r.int(3,25),P=4*a,t=r.chance(.5);
  return t?{kind:'tln',stem:`Một hình vuông có chu vi ${P} cm. Tính diện tích hình vuông đó (đơn vị: cm²).`,ans:a*a,unit:'cm²',sol:`Cạnh: ${P} : 4 = ${a} (cm). Diện tích: ${a}·${a} = ${a*a} (cm²).`,chk:()=>true}
    :{kind:'tln',stem:`Một hình vuông có diện tích ${a*a} cm². Tính chu vi hình vuông đó (đơn vị: cm).`,ans:P,unit:'cm',sol:`${a}·${a} = ${a*a} nên cạnh là ${a} cm. Chu vi: 4·${a} = ${P} (cm).`,chk:()=>true};
});
TL6x('tl6x-18-hex',4,'VD','real',[18,20],r=>{
  const a=r.int(2,6)*10,S=r.int(40,90)*10,p=r.pick([15,20,25,30]);
  return{kind:'tl',title:'Lục giác đều trong thực tiễn',parts:[{pts:.5,html:`Một mặt bàn hình lục giác đều được ghép từ sáu tấm gỗ hình tam giác đều cạnh ${a} cm. Tính chu vi mặt bàn và độ dài đường chéo chính của mặt bàn.`},{pts:.5,html:`Mỗi tấm gỗ tam giác đều có diện tích khoảng ${nv(S)} cm². Người ta sơn mặt bàn với giá ${p} đồng mỗi xăng-ti-mét vuông. Tính số tiền sơn mặt bàn.`}],
    sol:[ptxt([[`Cạnh mặt bàn bằng cạnh tam giác đều: ${a} cm. Chu vi: 6·${a} = ${6*a} (cm).`,.25],[`Đường chéo chính gồm hai cạnh tam giác đều: 2·${a} = ${2*a} (cm).`,.25]]),
      ptxt([[`Diện tích mặt bàn: 6·${nv(S)} = ${nv(6*S)} (cm²).`,.25],[`Tiền sơn: ${nv(6*S)}·${p} = ${nv(6*S*p)} (đồng).`,.25]])],chk:()=>true};
});
N6x('k6x-19-diag',4,'NB',[19],r=>{
  const t=r.int(0,2);
  const Q6=[['Hình nào sau đây có hai đường chéo vuông góc với nhau?','Hình thoi',['Hình chữ nhật (không phải hình vuông)','Hình bình hành (không phải hình thoi)','Hình thang cân'],'Hình thoi có hai đường chéo vuông góc với nhau.'],
    ['Hình nào sau đây có hai đường chéo bằng nhau?','Hình chữ nhật',['Hình thoi (không phải hình vuông)','Hình bình hành (không phải hình chữ nhật)','Tam giác đều'],'Hình chữ nhật có hai đường chéo bằng nhau.'],
    ['Hình nào sau đây có hai cạnh đáy song song và hai cạnh bên bằng nhau, hai đường chéo bằng nhau?','Hình thang cân',['Hình bình hành (không phải hình chữ nhật)','Hình thoi (không phải hình vuông)','Lục giác đều'],'Đó là các đặc điểm của hình thang cân.']][t];
  return mkTxt(r,{stem:Q6[0],correct:Q6[1],wrongs:Q6[2],sol:Q6[3],chk:()=>true});
});
DS6x('ds6x-19-quad',4,'NB',[19],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Hình chữ nhật có bốn góc vuông và hai đường chéo bằng nhau.',f:'Hình chữ nhật có bốn cạnh bằng nhau và hai đường chéo vuông góc.',why:'Bốn cạnh bằng nhau, hai đường chéo vuông góc là đặc điểm của hình thoi.'},
  {t:'Hình thoi có bốn cạnh bằng nhau.',f:'Hình thoi có bốn góc vuông.',why:'Hình thoi có bốn cạnh bằng nhau; chỉ hình vuông mới vừa có bốn cạnh bằng nhau vừa có bốn góc vuông.'},
  {t:'Hình bình hành có các cạnh đối song song và bằng nhau.',f:'Hình bình hành có hai đường chéo bằng nhau.',why:'Hình bình hành (không phải hình chữ nhật) có hai đường chéo không bằng nhau.'},
  {t:'Hình thang cân có hai đường chéo bằng nhau.',f:'Hình thang cân có hai cạnh đáy bằng nhau.',why:'Hai đáy của hình thang cân song song nhưng không bằng nhau; hai đường chéo bằng nhau.'}],chk:()=>true}));
TLN6x('t6x-19-side',4,'TH',[19,20],r=>{
  const t=r.chance(.5);
  if(t){const a=r.int(4,30),P=4*a;return{kind:'tln',stem:`Một hình thoi có chu vi ${P} cm. Tính độ dài cạnh của hình thoi (đơn vị: cm).`,ans:a,unit:'cm',sol:`Hình thoi có bốn cạnh bằng nhau: ${P} : 4 = ${a} (cm).`,chk:()=>true}}
  const b=r.int(3,20),a=b+r.int(2,15),P=2*(a+b);return{kind:'tln',stem:`Một hình chữ nhật có chiều dài ${a} m và chu vi ${P} m. Tính chiều rộng của hình chữ nhật (đơn vị: m).`,ans:b,unit:'m',sol:`Nửa chu vi: ${P} : 2 = ${a+b} (m). Chiều rộng: ${a+b} − ${a} = ${b} (m).`,chk:()=>true};
});
TL6x('tl6x-19-garden',4,'VD','real',[19,20],r=>{
  const b=r.int(8,20),a=b+r.int(4,15),gate=r.int(2,4),p=r.pick([40,50,60,80]);
  const P=2*(a+b),fence=P-gate;
  return{kind:'tl',title:'Mảnh vườn hình chữ nhật',parts:[{pts:.5,html:`Một mảnh vườn hình chữ nhật có chiều dài ${a} m, chiều rộng ${b} m. Tính chu vi và diện tích mảnh vườn.`},{pts:.5,html:`Người ta rào xung quanh mảnh vườn, chừa một cửa vào rộng ${gate} m. Tiền làm mỗi mét hàng rào là ${p} nghìn đồng. Tính tổng tiền làm hàng rào.`}],
    sol:[ptxt([[`Chu vi: 2·(${a} + ${b}) = ${P} (m).`,.25],[`Diện tích: ${a}·${b} = ${a*b} (m²).`,.25]]),ptxt([[`Chiều dài hàng rào: ${P} − ${gate} = ${fence} (m).`,.25],[`Tiền làm hàng rào: ${fence}·${p} = ${nv(fence*p)} (nghìn đồng).`,.25]])],chk:()=>true};
});

/* ===================== Bài 21, 22: Tính đối xứng ===================== */
TLN6x('t6x-21-letters',5,'TH',[21],r=>{for(;;){
  const NOA='FGJLPQRNSZ',pool=r.shuffle([...AX_L,...NOA]).slice(0,7),v=pool.filter(c=>AX_L.includes(c)).length;/* chỉ dùng chữ rõ ràng: K, B… tuỳ phông nên không dùng */
  const stem=`Trong các chữ cái in hoa sau: ${pool.join(', ')}, có bao nhiêu chữ cái có trục đối xứng?`,
    sol=`Các chữ có trục đối xứng: ${pool.filter(c=>AX_L.includes(c)).join(', ')} – có ${v} chữ.`;if(v>0&&v<7)return{kind:'tln',stem,ans:v,unit:'',sol,chk:()=>true}}
});
DS6x('ds6x-21-axes',5,'NB',[21],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Hình chữ nhật (không phải hình vuông) có 2 trục đối xứng.',f:'Hình chữ nhật (không phải hình vuông) có 4 trục đối xứng.',why:'Hai trục là hai đường thẳng đi qua trung điểm các cặp cạnh đối; đường chéo không phải trục đối xứng.'},
  {t:'Tam giác đều có 3 trục đối xứng.',f:'Tam giác đều có 1 trục đối xứng.',why:'Mỗi đường thẳng đi qua một đỉnh và trung điểm cạnh đối diện là một trục đối xứng.'},
  {t:'Hình thang cân có 1 trục đối xứng.',f:'Hình thang cân có 2 trục đối xứng.',why:'Trục đối xứng là đường thẳng đi qua trung điểm hai đáy.'},
  {t:'Hình bình hành (không phải hình chữ nhật, không phải hình thoi) không có trục đối xứng.',f:'Hình bình hành (không phải hình chữ nhật, không phải hình thoi) có 2 trục đối xứng.',why:'Gấp theo bất kì đường thẳng nào, hai nửa của hình bình hành như vậy đều không chồng khít.'}],chk:()=>true}));
TLN6x('t6x-22-letters',5,'TH',[22],r=>{for(;;){
  const pool=r.shuffle([...CEN_L,...'FGJLPQR',...'AMTUVW']).slice(0,7),v=pool.filter(c=>CEN_L.includes(c)).length;
  const stem=`Trong các chữ cái in hoa sau: ${pool.join(', ')}, có bao nhiêu chữ cái có tâm đối xứng?`,
    sol=`Các chữ có tâm đối xứng: ${pool.filter(c=>CEN_L.includes(c)).join(', ')} – có ${v} chữ.`;if(v>0&&v<7)return{kind:'tln',stem,ans:v,unit:'',sol,chk:()=>true}}
});
DS6x('ds6x-22-center',5,'NB',[22],r=>mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Tâm đối xứng của hình vuông là giao điểm của hai đường chéo.',f:'Tâm đối xứng của hình vuông là một đỉnh của hình vuông.',why:'Quay hình vuông nửa vòng quanh giao điểm hai đường chéo, hình trùng với chính nó.'},
  {t:'Tam giác đều không có tâm đối xứng.',f:'Tam giác đều có tâm đối xứng.',why:'Quay tam giác đều nửa vòng quanh bất kì điểm nào, hình không trùng với chính nó.'},
  {t:'Hình bình hành có tâm đối xứng.',f:'Hình bình hành không có tâm đối xứng.',why:'Tâm đối xứng là giao điểm hai đường chéo.'},
  {t:'Hình thang cân (không phải hình chữ nhật) không có tâm đối xứng.',f:'Hình thang cân (không phải hình chữ nhật) có tâm đối xứng.',why:'Hai đáy không bằng nhau nên quay nửa vòng hình không trùng với chính nó.'}],chk:()=>true}));
N6x('k6x-22-both',5,'TH',[21,22],r=>{
  const ok=r.pick(['Hình chữ nhật','Hình thoi','Hình vuông','Lục giác đều']);
  return mkTxt(r,{stem:'Hình nào sau đây vừa có trục đối xứng, vừa có tâm đối xứng?',correct:ok,wrongs:['Tam giác đều','Hình thang cân','Hình bình hành (không phải hình chữ nhật, không phải hình thoi)'],
    sol:`${ok} có trục đối xứng và có tâm đối xứng là giao điểm các đường chéo. Tam giác đều, hình thang cân không có tâm đối xứng; hình bình hành nêu trên không có trục đối xứng.`,chk:()=>true});
});

/* ===================== Bài 28 – 30: Số thập phân ===================== */
N6x('k6x-28-order',7,'TH',[28],r=>{
  for(;;){const xs=[...Array(4)].map(()=>(r.chance(.4)?-1:1)*r.int(10,999)/100);if(new Set(xs).size<4)continue;const s=[...xs].sort((a,b)=>a-b);
    return mkTxt(r,{stem:`Các số ${xs.map(dec6).join('; ')} được sắp xếp theo thứ tự tăng dần là`,correct:s.map(dec6).join('; '),
      wrongs:[[...s].reverse(),[...s].sort((a,b)=>Math.abs(a)-Math.abs(b)),[s[1],s[0],s[2],s[3]],[s[0],s[2],s[1],s[3]]].map(z=>z.map(dec6).join('; ')),
      sol:`Số thập phân âm nhỏ hơn số thập phân dương; trong hai số âm, số nào có số đối lớn hơn thì nhỏ hơn. Thứ tự: ${s.map(dec6).join('; ')}.`,chk:()=>true})}
});
TLN6x('t6x-29-shop',7,'VD',[29],r=>{for(;;){
  const a=r.int(2,4),pa=r.int(150,450)/10,b=r.int(1,3),pb=r.int(150,450)/10,cost=a*pa+b*pb,pay=Math.ceil(cost/50)*50+r.pick([0,50,100]),v=Math.round((pay-cost)*10)/10;if(!(v>0&&String(v).replace('.','').length<=4))continue;
  return{kind:'tln',stem:`Mẹ mua ${a} kg táo giá ${dec6(pa)} nghìn đồng mỗi ki-lô-gam và ${b} kg cam giá ${dec6(pb)} nghìn đồng mỗi ki-lô-gam. Mẹ đưa người bán ${pay} nghìn đồng. Người bán trả lại mẹ bao nhiêu nghìn đồng?`,ans:v,unit:'nghìn đồng',
    sol:`Tiền mua: ${a}·${dec6(pa)} + ${b}·${dec6(pb)} = ${dec6(a*pa)} + ${dec6(b*pb)} = ${dec6(cost)} (nghìn đồng). Tiền trả lại: ${pay} − ${dec6(cost)} = ${dec6(v)} (nghìn đồng).`,chk:()=>v>0}}
});
TL6x('tl6x-30-est',7,'TH','real',[30],r=>{
  const v=r.int(10000,99999)/1000,A=r.int(1000,9999),B=r.int(1000,9999),a=A/100,b=B/100,ra=Math.round(a),rb=Math.round(b),P=A*B,exH=(String(Math.floor(P/10000))+','+String(P%10000).padStart(4,'0')).replace(/,?0+$/,'');/* tích đúng tính bằng số nguyên, không làm tròn */
  return{kind:'tl',title:'Làm tròn và ước lượng',parts:[{pts:.5,html:`Làm tròn số ${dec6(v)} đến hàng phần mười và đến hàng phần trăm.`},{pts:.5,html:`Làm tròn hai thừa số đến hàng đơn vị để ước lượng tích ${dec6(a)}·${dec6(b)}, rồi tính tích đúng.`}],
    sol:[ptxt([[`Đến hàng phần mười: ${dec6(v)} ≈ ${dec6(Math.round(v*10)/10)}.`,.25],[`Đến hàng phần trăm: ${dec6(v)} ≈ ${dec6(Math.round(v*100)/100)}.`,.25]]),
      ptxt([[`Ước lượng: ${dec6(a)}·${dec6(b)} ≈ ${ra}·${rb} = ${ra*rb}.`,.25],[`Tích đúng: ${dec6(a)}·${dec6(b)} = ${exH}.`,.25]])],chk:()=>true};
});

/* ===================== Bài 32, 33: Điểm, đường thẳng, tia ===================== */
N6x('k6x-32-rel',8,'NB',[32],r=>{
  const t=r.int(0,2);
  const Q6=[['Hai đường thẳng phân biệt không có điểm chung nào được gọi là hai đường thẳng','song song',['cắt nhau','trùng nhau','có một điểm chung'],'Hai đường thẳng phân biệt không có điểm chung là hai đường thẳng song song.'],
    ['Hai đường thẳng có đúng một điểm chung được gọi là hai đường thẳng','cắt nhau',['song song','trùng nhau','không có điểm chung'],'Hai đường thẳng có đúng một điểm chung là hai đường thẳng cắt nhau.'],
    ['Qua hai điểm phân biệt có bao nhiêu đường thẳng?','Có một và chỉ một đường thẳng',['Có hai đường thẳng','Có vô số đường thẳng','Không có đường thẳng nào'],'Có một và chỉ một đường thẳng đi qua hai điểm phân biệt.']][t];
  return mkTxt(r,{stem:Q6[0],correct:Q6[1],wrongs:Q6[2],sol:Q6[3],chk:()=>true});
});
DS6x('ds6x-32-line',8,'NB',[32,33],r=>{
  const [A,B,C]=r.pick([['A','B','C'],['M','N','P'],['E','F','G']]);
  return mkDS(r,{stem:`Cho ba điểm ${I(A)}, ${I(B)}, ${I(C)} thẳng hàng, điểm ${I(B)} nằm giữa hai điểm ${I(A)} và ${I(C)}.<div class="figure">${fig6Line([[A,0],[B,r.int(2,4)],[C,r.int(6,8)]])}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Ba điểm ${I(A)}, ${I(B)}, ${I(C)} cùng thuộc một đường thẳng.`,f:`Ba điểm ${I(A)}, ${I(B)}, ${I(C)} không cùng thuộc một đường thẳng.`,why:'Ba điểm thẳng hàng là ba điểm cùng thuộc một đường thẳng.'},
    {t:`Đường thẳng ${A}${B} và đường thẳng ${B}${C} trùng nhau.`,f:`Đường thẳng ${A}${B} và đường thẳng ${B}${C} cắt nhau tại ${I(B)}.`,why:`Cả hai đường thẳng cùng đi qua hai điểm ${I(B)} và ${I(A)} (hoặc ${I(C)}) nên trùng nhau.`},
    {t:`Tia ${B}${A} và tia ${B}${C} là hai tia đối nhau.`,f:`Tia ${B}${A} và tia ${B}${C} là hai tia trùng nhau.`,why:`${I(B)} nằm giữa ${I(A)} và ${I(C)} nên hai tia chung gốc ${I(B)} nằm về hai phía.`},
    {t:`Tia ${A}${B} và tia ${A}${C} là hai tia trùng nhau.`,f:`Tia ${A}${B} và tia ${A}${C} là hai tia đối nhau.`,why:`Hai tia chung gốc ${I(A)}, cùng chứa ${I(B)} và ${I(C)}.`}],chk:()=>true});
});
TLN6x('t6x-33-rays',8,'TH',[33],r=>{
  const n=r.int(3,12),t=r.chance(.5);
  return t?{kind:'tln',stem:`Trên đường thẳng ${I('xy')} lấy ${n} điểm phân biệt. Có tất cả bao nhiêu tia có gốc là một trong các điểm đã lấy và nằm trên đường thẳng ${I('xy')}?`,ans:2*n,unit:'',sol:`Mỗi điểm là gốc của đúng hai tia đối nhau nằm trên xy: 2·${n} = ${2*n} tia.`,chk:()=>true}
    :{kind:'tln',stem:`Trên đường thẳng ${I('xy')} lấy ${n} điểm phân biệt. Có bao nhiêu cặp tia đối nhau có gốc là một trong các điểm đã lấy?`,ans:n,unit:'',sol:`Mỗi điểm cho đúng một cặp tia đối nhau: ${n} cặp.`,chk:()=>true};
});

/* ===================== Bài 36, 37: Góc, số đo góc ===================== */
N6x('k6x-36-name',8,'NB',[36],r=>{
  const [O,x,y]=r.pick([['O','x','y'],['A','m','n'],['M','t','z']]);
  return mkTxt(r,{stem:`Góc ${x}${O}${y} có`,correct:`đỉnh ${I(O)}, hai cạnh là tia ${O}${x} và tia ${O}${y}`,wrongs:[`đỉnh ${I(x)}, hai cạnh là tia ${x}${O} và tia ${x}${y}`,`đỉnh ${I(O)}, hai cạnh là đoạn thẳng ${O}${x} và đoạn thẳng ${O}${y}`,`đỉnh ${I(y)}, hai cạnh là tia ${y}${O} và tia ${y}${x}`],
    sol:`Chữ ở giữa chỉ đỉnh của góc: đỉnh ${I(O)}; hai cạnh là hai tia ${O}${x} và ${O}${y}.`,chk:()=>true});
});
TL6x('tl6x-37-clock',8,'TH','geo',[36,37],r=>{
  const h=r.pick([1,2,3,4,5,6]),a=30*h,k=r.pick([2,4,5,7,8,10,11]),b=30*Math.min(k,12-k);
  const typ=d=>d<90?'góc nhọn':d===90?'góc vuông':d<180?'góc tù':'góc bẹt';
  return{kind:'tl',title:'Góc trên mặt đồng hồ',parts:[{pts:.5,html:`Lúc ${h} giờ đúng, kim giờ và kim phút tạo thành một góc có số đo bằng bao nhiêu độ? Góc đó là góc gì?`},{pts:.5,html:`Lúc ${k} giờ đúng, góc nhỏ hơn tạo bởi kim giờ và kim phút có số đo bằng bao nhiêu độ? So sánh góc đó với góc ở câu a).`}],
    sol:[ptxt([[`Mặt đồng hồ chia 12 phần, mỗi phần 360° : 12 = 30°. Lúc ${h} giờ, hai kim cách nhau ${h} phần: ${h}·30° = ${a}°.`,.25],[`Đó là ${typ(a)}.`,.25]]),
      ptxt([[`Lúc ${k} giờ, hai kim cách nhau ${Math.min(k,12-k)} phần (theo phía gần hơn): ${b}°.`,.25],[b===a?`Hai góc bằng nhau.`:`${b}° ${b>a?'>':'<'} ${a}° nên góc lúc ${k} giờ ${b>a?'lớn':'nhỏ'} hơn.`,.25]])],chk:()=>true};
});

/* ===================== Bài 38 – 41: Dữ liệu, bảng, biểu đồ ===================== */
N6x('k6x-38-way',9,'NB',[38],r=>{
  const t=r.int(0,2);
  const Q6=[['Để biết môn thể thao yêu thích của các bạn trong lớp, cách thu thập dữ liệu phù hợp là','Lập phiếu hỏi hoặc phỏng vấn các bạn trong lớp',['Đo chiều cao của các bạn','Xem bảng điểm môn Toán của lớp','Quan sát thời tiết trong tuần'],'Sở thích của mỗi bạn chỉ biết được khi hỏi trực tiếp các bạn.'],
    ['Để biết nhiệt độ cao nhất mỗi ngày trong tuần ở địa phương, cách thu thập dữ liệu phù hợp là','Ghi lại số liệu từ bản tin dự báo thời tiết hoặc đo bằng nhiệt kế',['Phỏng vấn các bạn trong lớp','Lập phiếu hỏi về món ăn yêu thích','Đếm số học sinh đi học muộn'],'Nhiệt độ là số liệu đo đạc, lấy từ nguồn đo hoặc bản tin thời tiết.'],
    ['Để biết số học sinh đi học bằng xe đạp của trường, cách thu thập dữ liệu phù hợp là','Đếm số xe đạp gửi trong bãi xe của trường trong một ngày học',['Tra cứu trên Internet','Đo chiều dài sân trường','Hỏi một bạn trong lớp'],'Số xe đạp gửi ở trường phản ánh trực tiếp số học sinh đi xe đạp.']][t];
  return mkTxt(r,{stem:Q6[0],correct:Q6[1],wrongs:Q6[2],sol:Q6[3],chk:()=>true});
});
N6x('k6x-38-bad',9,'TH',[38],r=>{
  for(;;){const xs=[...Array(9)].map(()=>r.int(4,10)),bad=r.pick([11,12,15,-1]),i=r.int(1,8);xs.splice(i,0,bad);
    return mkNum(r,{stem:`Bạn Hà ghi lại điểm kiểm tra môn Toán (thang điểm 10) của 10 bạn trong tổ: ${xs.map(sg).join('; ')}. Giá trị không hợp lí là`,correct:bad,f:sg,cands:[...new Set(xs.filter(v=>v!==bad))].slice(0,4),ok:x=>x!==bad,
      sol:`Điểm theo thang 10 phải là số từ 0 đến 10; ${sg(bad)} không thoả mãn nên không hợp lí.`,chk:()=>true})}
});
DS6x('ds6x-38-valid',9,'TH',[38],r=>{for(;;){
  const cls=['6A','6B','6C','6D'],ss=cls.map(()=>r.int(36,45));if(new Set(ss).size<4)continue;const i=r.int(0,3),gi=r.int(5,20),wrong=ss[i]+r.int(3,9),j=(i+1)%4;
  return mkDS(r,{stem:`Lớp trưởng các lớp báo cáo sĩ số và số học sinh đạt danh hiệu học sinh giỏi như bảng sau:<div class="figure">${tableHTML(['Lớp',...cls],[['Sĩ số',...ss],['Học sinh giỏi',...cls.map((_,k)=>k===i?wrong:k===j?gi:Math.min(ss[k]-5,gi+k))]])}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số học sinh giỏi của lớp ${cls[i]} là không hợp lí.`,f:`Số học sinh giỏi của lớp ${cls[i]} là hợp lí.`,why:`Lớp ${cls[i]} có ${ss[i]} học sinh nhưng báo cáo ${wrong} học sinh giỏi (nhiều hơn sĩ số).`},
    {t:`Số học sinh giỏi của lớp ${cls[j]} là hợp lí.`,f:`Số học sinh giỏi của lớp ${cls[j]} là không hợp lí.`,why:`${gi} ≤ ${ss[j]}.`},
    {t:`Dữ liệu trong bảng là số liệu.`,f:`Dữ liệu trong bảng không phải là số liệu.`,why:'Các dữ liệu đều là số.'},
    {t:`Lớp ${cls[ss.indexOf(Math.max(...ss))]} có sĩ số lớn nhất.`,f:`Lớp ${cls[ss.indexOf(Math.min(...ss))]} có sĩ số lớn nhất.`,why:`Sĩ số lớn nhất là ${Math.max(...ss)}.`}],chk:()=>true})}
});
TLN6x('t6x-38-tally',9,'TH',[38,39],r=>{for(;;){
  const C=r.pick([['Đỏ','Xanh','Vàng','Tím'],['Bóng đá','Cầu lông','Bơi','Cờ vua'],['Cam','Xoài','Táo','Chuối']]),n=r.int(14,20),xs=[...Array(n)].map(()=>r.pick(C)),k=r.int(0,3),v=xs.filter(x=>x===C[k]).length;if(!v)continue;
  return{kind:'tln',stem:`Kết quả hỏi ${n} bạn trong lớp về lựa chọn yêu thích được ghi lại như sau: ${xs.join(', ')}. Có bao nhiêu bạn chọn “${C[k]}”?`,ans:v,unit:'',sol:`Đếm số lần “${C[k]}” xuất hiện trong danh sách: ${v} lần.`,chk:()=>true}}
});
TLN6x('t6x-39-pict',9,'TH',[39],r=>{for(;;){
  const P=r.pick(PICT6),k=r.pick([2,5,10]),ns=P.cats.map(()=>r.int(2,7)*k),mx=Math.max(...ns),mn=Math.min(...ns);if(mx===mn)continue;
  return{kind:'tln',stem:`Biểu đồ tranh dưới đây cho biết ${P.what}.<div class="figure">${pict6(P.cats,ns,k,P.lab)}</div>Số lượng lớn nhất hơn số lượng nhỏ nhất bao nhiêu?`,ans:mx-mn,unit:'',
    sol:`Lớn nhất: ${mx/k}·${k} = ${mx}; nhỏ nhất: ${mn/k}·${k} = ${mn}. Hiệu: ${mx} − ${mn} = ${mx-mn}.`,chk:()=>true}}
});
DS6x('ds6x-39-pict',9,'TH',[39],r=>{
  for(;;){const P=r.pick(PICT6),k=r.pick([2,5,10]),ns=P.cats.map(()=>r.int(2,7)*k),mx=Math.max(...ns),mn=Math.min(...ns);if(ns.filter(v=>v===mx).length>1||ns.filter(v=>v===mn).length>1)continue;
    const S=ns.reduce((a,b)=>a+b,0),i=r.int(0,ns.length-1);
    return mkDS(r,{stem:`Biểu đồ tranh dưới đây cho biết ${P.what}.<div class="figure">${pict6(P.cats,ns,k,P.lab)}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Mỗi biểu tượng ★ ứng với ${k} đơn vị.`,f:`Mỗi biểu tượng ★ ứng với 1 đơn vị.`,why:`Chú thích ★ = ${k}.`},
      {t:`${P.cats[i]} có số lượng là ${ns[i]}.`,f:`${P.cats[i]} có số lượng là ${ns[i]/k}.`,why:`${ns[i]/k} biểu tượng: ${ns[i]/k}·${k} = ${ns[i]}.`},
      {t:`${P.cats[ns.indexOf(mn)]} có số lượng ít nhất.`,f:`${P.cats[ns.indexOf(mx)]} có số lượng ít nhất.`,why:`Ít biểu tượng nhất là ${P.cats[ns.indexOf(mn)]}.`},
      {t:`Tổng số lượng là ${S}.`,f:`Tổng số lượng là ${S/k}.`,why:`${ns.join(' + ')} = ${S}.`}],chk:()=>true})}
});
TL6x('tl6x-39-table',9,'TH','real',[38,39],r=>{for(;;){
  const C=r.pick([['Đỏ','Xanh','Vàng','Tím'],['Bóng đá','Cầu lông','Bơi','Cờ vua'],['Cam','Xoài','Táo','Chuối']]),ns=C.map(()=>r.int(2,8)),xs=r.shuffle(C.flatMap((c,i)=>Array(ns[i]).fill(c))),n=xs.length,im=ns.indexOf(Math.max(...ns));if(ns.filter(v=>v===ns[im]).length>1)continue;
  return{kind:'tl',title:'Lập bảng thống kê',parts:[{pts:.5,html:`Kết quả hỏi ${n} bạn về lựa chọn yêu thích được ghi lại như sau: ${xs.join(', ')}. Lập bảng thống kê số bạn chọn mỗi loại.`},{pts:.5,html:`Loại nào được nhiều bạn chọn nhất? Loại đó chiếm bao nhiêu phần của tổng số bạn được hỏi (viết dưới dạng phân số tối giản)?`}],
    sol:[ptxt([[`Đếm số lần xuất hiện của mỗi loại.`,.25],[`<div class="figure">${tableHTML(['Loại',...C],[['Số bạn',...ns]])}</div>`,.25]]),
      ptxt([[`Nhiều nhất là “${C[im]}” với ${ns[im]} bạn.`,.25],[`Chiếm ${fr(ns[im],n)}${gcd(ns[im],n)>1?' = '+qh(Q(ns[im],n)):''} tổng số bạn.`,.25]])],chk:()=>true}}
});
N6x('k6x-40-read',9,'NB',[40],r=>{for(;;){
  const B=r.pick(BAR6),ns=B.cats.map(()=>r.int(3,30)),i=r.int(0,ns.length-1);if(ns.filter(v=>v===ns[i]).length>1)continue;
  return mkNum(r,{stem:`Biểu đồ cột dưới đây biểu diễn ${B.what}.<div class="figure">${barSVG(B.cats,ns)}</div>Số lượng ứng với “${B.cats[i]}” là`,correct:ns[i],cands:ns.filter((_,k)=>k!==i),ok:x=>x>0,
    sol:`Đọc chiều cao cột “${B.cats[i]}”: ${ns[i]}.`,chk:()=>true})}
});
TLN6x('t6x-40-sum',9,'TH',[40],r=>{
  const B=r.pick(BAR6),ns=B.cats.map(()=>r.int(3,30)),S=ns.reduce((a,b)=>a+b,0);
  return{kind:'tln',stem:`Biểu đồ cột dưới đây biểu diễn ${B.what}.<div class="figure">${barSVG(B.cats,ns)}</div>Tính tổng số lượng được biểu diễn trên biểu đồ.`,ans:S,unit:'',sol:`${ns.join(' + ')} = ${S}.`,chk:()=>true};
});
N6x('k6x-41-cmp',9,'TH',[41],r=>{
  for(;;){const cats=['6A','6B','6C','6D'],v1=cats.map(()=>r.int(10,22)),v2=cats.map(()=>r.int(10,22)),g=cats.filter((_,i)=>v1[i]>v2[i]);if(g.length!==1)continue;
    return mkTxt(r,{stem:`Biểu đồ cột kép dưới đây cho biết số học sinh nam và nữ của các lớp khối 6.<div class="figure">${bar2SVG(cats,v1,v2,['Nam','Nữ'])}</div>Lớp nào có số học sinh nam nhiều hơn số học sinh nữ?`,correct:`Lớp ${g[0]}`,wrongs:cats.filter(c=>c!==g[0]).map(c=>`Lớp ${c}`),
      sol:`So sánh từng cặp cột: chỉ lớp ${g[0]} có cột “Nam” cao hơn cột “Nữ” (${v1[cats.indexOf(g[0])]} > ${v2[cats.indexOf(g[0])]}).`,chk:()=>true})}
});
TLN6x('t6x-41-diff',9,'TH',[41],r=>{
  for(;;){const cats=['Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm'],v1=cats.map(()=>r.int(10,40)),v2=cats.map(()=>r.int(10,40)),S1=v1.reduce((a,b)=>a+b,0),S2=v2.reduce((a,b)=>a+b,0);if(S1===S2)continue;
    return{kind:'tln',stem:`Biểu đồ cột kép dưới đây cho biết số sách hai lớp 6A và 6B mượn ở thư viện trong bốn ngày.<div class="figure">${bar2SVG(cats,v1,v2,['6A','6B'])}</div>Trong bốn ngày, lớp ${S1>S2?'6A':'6B'} mượn nhiều hơn lớp ${S1>S2?'6B':'6A'} bao nhiêu quyển sách?`,ans:Math.abs(S1-S2),unit:'quyển',
      sol:`Lớp 6A: ${v1.join(' + ')} = ${S1}; lớp 6B: ${v2.join(' + ')} = ${S2}. Hiệu: ${Math.abs(S1-S2)} quyển.`,chk:()=>true}}
});

/* ===================== Bài 42: Kết quả có thể và sự kiện ===================== */
N6x('k6x-42-event',9,'NB',[42],r=>{
  const t=r.chance(.5),sure=['Số chấm xuất hiện nhỏ hơn 7','Số chấm xuất hiện lớn hơn 0'],imp=['Số chấm xuất hiện bằng 7','Số chấm xuất hiện bằng 0'],may=['Số chấm xuất hiện là số chẵn','Số chấm xuất hiện lớn hơn 4','Số chấm xuất hiện là 3','Số chấm xuất hiện là số lẻ'];
  return t?mkTxt(r,{stem:'Gieo một con xúc xắc. Sự kiện nào sau đây chắc chắn xảy ra?',correct:r.pick(sure),wrongs:[r.pick(imp),...r.shuffle(may).slice(0,2)],sol:'Số chấm luôn từ 1 đến 6 nên sự kiện đó luôn xảy ra.',chk:()=>true})
    :mkTxt(r,{stem:'Gieo một con xúc xắc. Sự kiện nào sau đây không thể xảy ra?',correct:r.pick(imp),wrongs:[r.pick(sure),...r.shuffle(may).slice(0,2)],sol:'Số chấm chỉ từ 1 đến 6 nên sự kiện đó không bao giờ xảy ra.',chk:()=>true});
});
TLN6x('t6x-42-fav',9,'TH',[42],r=>{
  const n=r.int(10,30),k=r.pick([2,3,4,5]),t=r.chance(.5),v=t?Math.floor(n/k):n-Math.floor(n/k);
  return{kind:'tln',stem:`Một hộp có ${n} quả bóng được đánh số từ 1 đến ${n}. Lấy ngẫu nhiên một quả bóng. Có bao nhiêu kết quả có thể làm cho sự kiện “Số ghi trên quả bóng ${t?'':'không '}chia hết cho ${k}” xảy ra?`,ans:v,unit:'',
    sol:`Từ 1 đến ${n} có ${Math.floor(n/k)} số chia hết cho ${k}${t?'':`; số không chia hết cho ${k} là ${n} − ${Math.floor(n/k)} = ${v}`}.`,chk:()=>v>0};
});
