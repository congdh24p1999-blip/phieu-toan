/* ================================================================
   LỚP 6 – Toán 6 Kết nối tri thức, học kì I
   Chương I: Tập hợp các số tự nhiên (Bài 1 – 7)
   Chương II: Tính chia hết trong tập hợp các số tự nhiên (Bài 8 – 12)
   ================================================================ */
const N6=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:6,hk:1,les});
const DS6=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:6,hk:1,les});
const TLN6=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:6,hk:1,les});
const TL6=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:6,hk:1,les});
/* số có dấu chấm phân cách hàng nghìn: 12.345 */
const nv=n=>(n<0?MINUS:'')+String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const set6=xs=>`{${xs.map(nv).join('; ')}}`;
const pw6=(a,m)=>`${a}${sup(m)}`;
const lcm6=(a,b)=>a/gcd(a,b)*b;
const divs6=n=>{const d=[];for(let i=1;i<=n;i++)if(n%i===0)d.push(i);return d};
/* phân tích ra thừa số nguyên tố, dạng 2³·3·5 */
const fac6=n=>{const f=[];let m=n;for(let p=2;p*p<=m;p++){let e=0;while(m%p===0){m/=p;e++}if(e)f.push([p,e])}if(m>1)f.push([m,1]);return f};
const facH=n=>fac6(n).map(([p,e])=>e>1?pw6(p,e):String(p)).join('·');
const nDiv6=n=>fac6(n).reduce((s,[,e])=>s*(e+1),1);
const HANG=['đơn vị','chục','trăm','nghìn','chục nghìn','trăm nghìn','triệu'];
const ROMAN=n=>{const v=[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let s='';for(const [k,c] of v)while(n>=k){s+=c;n-=k}return s};

/* ===================== Bài 1: Tập hợp ===================== */
N6('k6-1-set',1,'NB',[1],r=>{
  const xs=r.shuffle([...Array(12)].map((_,i)=>i+1)).slice(0,4).sort((a,b)=>a-b),inn=r.pick(xs),out=r.pick([...Array(15)].map((_,i)=>i).filter(v=>!xs.includes(v)));
  return mkTxt(r,{stem:`Cho tập hợp ${I('A')} = ${set6(xs)}. Khẳng định nào sau đây đúng?`,correct:r.chance(.5)?`${inn} ∈ ${I('A')}`:`${out} ∉ ${I('A')}`,wrongs:[`${inn} ∉ ${I('A')}`,`${out} ∈ ${I('A')}`,`${set6([inn])} ∈ ${I('A')}`,`${I('A')} có ${xs.length+1} phần tử`],
    sol:`${inn} là một phần tử của A; ${out} không phải là phần tử của A.`,chk:()=>true});
});
N6('k6-1-list',1,'TH',[1],r=>{
  const a=r.int(0,8),b=a+r.int(3,5),le=r.chance(.5),xs=[];for(let x=a+1;le?x<=b:x<b;x++)xs.push(x);
  const cond=`${I('x')} ∈ ℕ | ${a} < ${I('x')} ${le?'≤':'<'} ${b}`;
  return mkTxt(r,{stem:`Tập hợp ${I('A')} = {${cond}} được viết dưới dạng liệt kê các phần tử là`,correct:set6(xs),wrongs:[set6([a,...xs]),set6(le?xs.slice(0,-1):[...xs,b]),set6([a,...xs,b].filter((v,i,s)=>s.indexOf(v)===i)),set6(xs.slice(1))],
    sol:`Các số tự nhiên x lớn hơn ${a} và ${le?'không vượt quá':'nhỏ hơn'} ${b} là ${xs.join(', ')}.`,chk:()=>true});
});
N6('k6-1-count',1,'TH',[1],r=>{
  const a=r.int(5,30),b=a+r.int(10,60),t=r.int(0,2),cnt=[b-a+1,b-a-1,Math.floor(b/2)-Math.floor((a-1)/2)][t];
  const cond=[`${a} ≤ ${I('x')} ≤ ${b}`,`${a} < ${I('x')} < ${b}`,`${I('x')} chẵn, ${a} ≤ ${I('x')} ≤ ${b}`][t];
  return mkNum(r,{stem:`Số phần tử của tập hợp {${I('x')} ∈ ℕ | ${cond}} là`,correct:cnt,cands:[cnt+1,cnt-1,b-a,cnt*2,cnt+2],ok:x=>x>0,
    sol:t===2?`Các số chẵn từ ${a%2?a+1:a} đến ${b%2?b-1:b}: (${b%2?b-1:b} − ${a%2?a+1:a}) : 2 + 1 = ${cnt} số.`:`Số phần tử: ${t?`${b} − ${a} − 1`:`${b} − ${a} + 1`} = ${cnt}.`,chk:()=>true});
});
/* ===================== Bài 2: Cách ghi số tự nhiên ===================== */
N6('k6-2-digit',1,'NB',[2],r=>{
  for(;;){const n=r.int(10000,9999999),s=String(n),i=r.int(0,s.length-1),d=s[s.length-1-i];if(s.split('').filter(c=>c===d).length>1||d==='0')continue;const t=r.chance(.5);
    if(t)return mkTxt(r,{stem:`Trong số ${nv(n)}, chữ số ${d} nằm ở hàng`,correct:HANG[i],wrongs:HANG.filter((_,k)=>k!==i&&k<s.length).slice(0,6),sol:`Đếm từ phải sang trái: chữ số ${d} ở vị trí thứ ${i+1}, thuộc hàng ${HANG[i]}.`,chk:()=>true});
    const v=+d*10**i;return mkNum(r,{stem:`Trong số ${nv(n)}, chữ số ${d} có giá trị bằng`,correct:v,f:nv,cands:[+d,v*10,v/10,+d*10**(i+2)].filter(x=>isInt(x)&&x>0),ok:x=>x>0,sol:`Chữ số ${d} ở hàng ${HANG[i]} nên có giá trị ${d}·${nv(10**i)} = ${nv(v)}.`,chk:()=>true})}
});
N6('k6-2-roman',1,'NB',[2],r=>{
  const n=r.int(4,30),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Số La Mã ${ROMAN(n)} có giá trị là`,correct:n,f:String,cands:[n+1,n-1,n+2,n+10,n-10].filter(x=>x>0&&x<=30),ok:x=>x>0,sol:`${ROMAN(n)} = ${n}.`,chk:()=>true});
  const W=[ROMAN(n+1),ROMAN(n-1),ROMAN(n).split('').reverse().join(''),'I'.repeat(Math.min(n,6))+'X'].filter(x=>x!==ROMAN(n));
  return mkTxt(r,{stem:`Số ${n} được viết bằng số La Mã là`,correct:ROMAN(n),wrongs:W,sol:`${n} = ${ROMAN(n)}.`,chk:()=>true});
});
/* ===================== Bài 3: Thứ tự trong tập hợp số tự nhiên ===================== */
N6('k6-3-order',1,'NB',[3],r=>{
  const t=r.int(0,2),k=r.int(3,6);
  if(t===0){const n=r.int(100,99999)*10+9,af=r.chance(.5),v=af?n+1:n-1;return mkNum(r,{stem:`Số liền ${af?'sau':'trước'} của ${nv(n)} là`,correct:v,f:nv,cands:[af?n-1:n+1,v+10,v-10,v+100],ok:x=>x>0,sol:`Số liền ${af?'sau':'trước'} của ${nv(n)} là ${nv(n)} ${af?'+':'−'} 1 = ${nv(v)}.`,chk:()=>true})}
  if(t===1){const v=10**k-1;return mkNum(r,{stem:`Số tự nhiên lớn nhất có ${k} chữ số là`,correct:v,f:nv,cands:[10**k,10**(k-1),v-1,10**(k-1)-1],ok:x=>x>0,sol:`Số lớn nhất có ${k} chữ số là ${nv(v)}.`,chk:()=>true})}
  const v=10**(k-1);return mkNum(r,{stem:`Số tự nhiên nhỏ nhất có ${k} chữ số khác nhau là`,correct:+('10'+'23456789'.slice(0,k-2)),f:nv,cands:[v,v+1,+('1'+'23456789'.slice(0,k-1)),10**k-1],ok:x=>x>0,sol:`Chữ số đầu nhỏ nhất là 1, các chữ số sau lần lượt nhỏ nhất và khác nhau: ${nv(+('10'+'23456789'.slice(0,k-2)))}.`,chk:()=>true});
});
/* ===================== Bài 4 – 5: Các phép tính với số tự nhiên ===================== */
N6('k6-4-quick',1,'TH',[4,5],r=>{
  const t=r.int(0,2);
  if(t===0){const a=r.int(11,99),b=100-a,c=r.int(101,899);return mkNum(r,{stem:`Kết quả của phép tính ${a} + ${c} + ${b} là`,correct:a+b+c,f:nv,cands:[a+b+c+10,a+b+c-10,a+c,c+100+1],ok:x=>x>0,sol:`${a} + ${c} + ${b} = (${a} + ${b}) + ${c} = 100 + ${c} = ${a+b+c}.`,chk:()=>true})}
  if(t===1){const k=r.pick([25,125,4,8]),m=k===25?4:k===125?8:k===4?25:125,c=r.int(13,97);return mkNum(r,{stem:`Kết quả của phép tính ${k}·${c}·${m} là`,correct:k*m*c,f:nv,cands:[k*m*c+c,k*c+m,k*m+c,k*m*c*10],ok:x=>x>0,sol:`${k}·${c}·${m} = (${k}·${m})·${c} = ${k*m}·${c} = ${nv(k*m*c)}.`,chk:()=>true})}
  const a=r.int(12,89),b=r.int(11,59),c=100-b;return mkNum(r,{stem:`Kết quả của phép tính ${a}·${b} + ${a}·${c} là`,correct:a*100,f:nv,cands:[a*100+a,a*b*c,a+100,a*10],ok:x=>x>0,sol:`${a}·${b} + ${a}·${c} = ${a}·(${b} + ${c}) = ${a}·100 = ${nv(a*100)}.`,chk:()=>true});
});
N6('k6-5-div',1,'TH',[5],r=>{
  const b=r.int(6,25),q=r.int(7,60),rr=r.int(1,b-1),a=b*q+rr,t=r.chance(.5);
  return mkNum(r,{stem:`Thực hiện phép chia ${nv(a)} cho ${b}, ${t?'số dư':'thương'} là`,correct:t?rr:q,cands:t?[rr+1,rr-1,q,b-rr]:[q+1,q-1,rr,q*10],ok:x=>x>=0,sol:`${nv(a)} = ${b}·${q} + ${rr} nên thương là ${q}, số dư là ${rr}.`,chk:()=>rr<b});
});
N6('k6-5-real',1,'TH',[5],r=>{
  const c=r.pick([35,40,45,50]),n=r.int(150,600),v=Math.ceil(n/c);
  return mkNum(r,{stem:`Một trường tổ chức cho ${n} học sinh đi tham quan. Mỗi xe chở được nhiều nhất ${c} học sinh. Cần ít nhất bao nhiêu xe?`,correct:v,cands:[v-1,v+1,Math.floor(n/c)===v?v+2:Math.floor(n/c),v+2],ok:x=>x>0,sol:`${n} : ${c} = ${Math.floor(n/c)} (dư ${n%c})${n%c?`; còn dư ${n%c} học sinh nên cần thêm 1 xe`:''}: ${v} xe.`,chk:()=>n%c!==0||true});
});
/* ===================== Bài 6: Lũy thừa ===================== */
N6('k6-6-val',1,'NB',[6],r=>{
  const [a,m]=r.pick([[2,5],[2,6],[3,3],[3,4],[5,3],[4,3],[10,4],[2,7],[6,2],[7,2]]),v=a**m;
  return mkNum(r,{stem:`Giá trị của ${pw6(a,m)} là`,correct:v,f:nv,cands:[a*m,a**(m-1),a**(m+1),m**a].filter(x=>x!==v),ok:x=>x>0,sol:`${pw6(a,m)} = ${Array(m).fill(a).join('·')} = ${nv(v)}.`,chk:()=>true});
});
N6('k6-6-rule',1,'NB',[6],r=>{
  const a=r.int(2,9),m=r.int(3,8),n=r.pick([2,3,4,5,6,7,8].filter(v=>v!==m)),t=r.chance(.5);
  if(t)return mkTxt(r,{stem:`Kết quả của phép tính ${pw6(a,m)}·${pw6(a,n)} viết dưới dạng một lũy thừa là`,correct:pw6(a,m+n),wrongs:[pw6(a,m*n),pw6(a*a,m+n),pw6(a,Math.abs(m-n)||1),pw6(2*a,m+n)],sol:`aᵐ·aⁿ = aᵐ⁺ⁿ: ${pw6(a,m)}·${pw6(a,n)} = ${pw6(a,m+n)}.`,chk:()=>true});
  const M=Math.max(m,n)+r.int(1,4),N_=Math.min(m,n);
  return mkTxt(r,{stem:`Kết quả của phép tính ${pw6(a,M)} : ${pw6(a,N_)} viết dưới dạng một lũy thừa là`,correct:pw6(a,M-N_),wrongs:[pw6(a,M+N_),pw6(1,M-N_),pw6(a,M*N_),pw6(a,Math.round(M/N_)+(M%N_===0?1:0))].filter(x=>x!==pw6(a,M-N_)),sol:`aᵐ : aⁿ = aᵐ⁻ⁿ: ${pw6(a,M)} : ${pw6(a,N_)} = ${pw6(a,M-N_)}.`,chk:()=>true});
});
/* ===================== Bài 7: Thứ tự thực hiện các phép tính ===================== */
const EXP6=r=>{const t=r.int(0,3);
  if(t===0){const a=r.int(2,9),b=r.int(2,9),c=r.int(2,9),d=r.int(1,20);return{h:`${a} + ${b}·${c} ${MINUS} ${d}`,v:a+b*c-d,w:[(a+b)*c-d,a+b*(c-d)],s:`${a} + ${b*c} − ${d}`}}
  if(t===1){const a=r.int(2,6),b=r.int(2,4),c=r.int(1,9),d=r.int(2,5);return{h:`${pw6(a,b)} ${MINUS} ${c}·${d}`,v:a**b-c*d,w:[(a**b-c)*d,a*b-c*d],s:`${a**b} − ${c*d}`}}
  if(t===2){const a=r.int(2,9),b=r.int(2,9),c=r.int(1,b-1),d=r.int(2,6);return{h:`${a}·(${b} ${MINUS} ${c}) + ${d}${sup(2)}`,v:a*(b-c)+d*d,w:[a*b-c+d*d,a*(b-c)+2*d],s:`${a}·${b-c} + ${d*d}`}}
  const q=r.int(2,9),b=r.int(2,9),a=q*b,c=r.int(1,6),e=r.int(2,3);return{h:`${a} : ${b} + ${c}·${pw6(2,e)}`,v:q+c*2**e,w:[(q+c)*2**e,q+c*2*e],s:`${q} + ${c}·${2**e}`}};
N6('k6-7-order',1,'TH',[7],r=>{
  for(;;){const E=EXP6(r);if(E.v<0||E.w.some(x=>x===E.v))continue;
    return mkNum(r,{stem:`Giá trị của biểu thức ${E.h} là`,correct:E.v,cands:[...E.w,E.v+1,E.v+10],ok:x=>x>=0,sol:`Thực hiện lũy thừa, rồi nhân chia, rồi cộng trừ: ${E.h} = ${E.s} = ${E.v}.`,chk:()=>true})}
});

/* ===================== Bài 8 – 9: Chia hết, dấu hiệu chia hết ===================== */
N6('k6-8-prop',2,'NB',[8],r=>{
  const k=r.pick([3,4,5,6,7,9]),a=k*r.int(3,30),b=k*r.int(3,30),c=k*r.int(3,30)+r.int(1,k-1);
  return mkTxt(r,{stem:`Tổng nào sau đây chia hết cho ${k}?`,correct:`${a} + ${b}`,wrongs:[`${a} + ${c}`,`${c} + ${b}`,`${a} + ${b} + ${c%k}`,`${c} + ${k}`],sol:`${a} ⋮ ${k} và ${b} ⋮ ${k} nên (${a} + ${b}) ⋮ ${k}; các tổng còn lại có đúng một số hạng không chia hết cho ${k}.`,chk:()=>(a+b)%k===0});
});
N6('k6-9-sign',2,'NB',[9],r=>{
  for(;;){const k=r.pick([2,3,5,9]),xs=[...Array(4)].map(()=>r.int(100,9999)),good=xs.filter(x=>x%k===0);if(good.length!==1||new Set(xs).size<4)continue;
    return mkTxt(r,{stem:`Số nào sau đây chia hết cho ${k}?`,correct:nv(good[0]),wrongs:xs.filter(x=>x%k).map(nv),sol:k===2?'Số chia hết cho 2 có chữ số tận cùng là chữ số chẵn.':k===5?'Số chia hết cho 5 có chữ số tận cùng là 0 hoặc 5.':`Số chia hết cho ${k} có tổng các chữ số chia hết cho ${k}: ${String(good[0]).split('').join(' + ')} = ${String(good[0]).split('').reduce((s,c)=>s+ +c,0)}.`,chk:()=>true})}
});
N6('k6-9-digit',2,'TH',[9],r=>{
  for(;;){const a=r.int(1,9),b=r.int(0,9),k=r.pick([[3,5],[9,2],[3,2],[9,5]]),D=[...Array(10).keys()].filter(d=>(a*100+d*10+b)%k[0]===0&&(a*100+d*10+b)%k[1]===0);if(D.length!==1)continue;
    const W=[...Array(10).keys()].filter(d=>d!==D[0]);
    return mkNum(r,{stem:`Chữ số * thích hợp để số <span style="text-decoration:overline">${a}*${b}</span> chia hết cho cả ${k[0]} và ${k[1]} là`,correct:D[0],cands:r.shuffle(W).slice(0,4),ok:()=>true,f:String,
      sol:`${b} ${k[1]===2?'là chữ số chẵn':'là 0 hoặc 5'} nên số chia hết cho ${k[1]}; cần ${a} + * + ${b} chia hết cho ${k[0]} ⇒ * = ${D[0]}.`,chk:()=>[2,5].includes(k[1])&&(k[1]===2?b%2===0:b%5===0)})}
});
/* ===================== Bài 10: Số nguyên tố ===================== */
N6('k6-10-prime',2,'NB',[10],r=>{
  for(;;){const xs=[...Array(4)].map(()=>r.int(2,99)),p=xs.filter(isPrime),t=r.chance(.5);if(p.length!==(t?1:3)||new Set(xs).size<4)continue;
    return mkTxt(r,{stem:`Trong các số ${xs.join(', ')}, số nào là ${t?'số nguyên tố':'hợp số'}?`,correct:String(t?p[0]:xs.find(x=>!isPrime(x))),wrongs:xs.filter(x=>t?!isPrime(x):isPrime(x)).map(String),
      sol:`Số nguyên tố chỉ có hai ước là 1 và chính nó. ${xs.map(x=>isPrime(x)?`${x} là số nguyên tố`:`${x} = ${facH(x)} là hợp số`).join('; ')}.`,chk:()=>new Set(xs).size===4})}
});
N6('k6-10-fact',2,'TH',[10],r=>{
  for(;;){const n=r.pick([2,2,3,3,5,7]) ** r.int(1,3)*r.pick([3,5,7,11])*r.pick([1,2,3]);if(n<20||n>600||fac6(n).length<2)continue;const F=fac6(n),H=facH(n);
    const W=[F.map(([p,e])=>e>1?`${p}·${e}`:String(p)).join('·'),F.map(([p,e])=>e>1?pw6(p,e+1):pw6(p,2)).join('·'),F.map(([p])=>String(p)).join('·'),facH(n*2),facH(n*3),F.map(([p,e])=>String(p*e)).join('·')].filter(x=>x!==H);
    return mkTxt(r,{stem:`Phân tích số ${n} ra thừa số nguyên tố, ta được`,correct:H,wrongs:W,sol:`${n} = ${H}.`,chk:()=>F.reduce((s,[p,e])=>s*p**e,1)===n})}
});
/* ===================== Bài 11 – 12: ƯCLN, BCNN ===================== */
const pair6=(r,o={})=>{for(;;){const g=r.pick(o.g||[2,3,4,5,6,8,9,12,15]),a=g*r.int(2,9),b=g*r.int(2,9);if(a===b||gcd(a,b)!==g&&!o.any)continue;if(o.maxL&&lcm6(a,b)>o.maxL)continue;return[a,b]}};
N6('k6-11-gcd',2,'TH',[11],r=>{
  const [a,b]=pair6(r),g=gcd(a,b);
  return mkNum(r,{stem:`ƯCLN(${a}, ${b}) bằng`,correct:g,cands:[g*2,g/2,lcm6(a,b),Math.min(a,b),1].filter(x=>isInt(x)&&x!==g),ok:x=>x>0,sol:`${a} = ${facH(a)}, ${b} = ${facH(b)}; ƯCLN(${a}, ${b}) = ${g===1?1:facH(g)} = ${g}.`,chk:()=>true});
});
N6('k6-12-lcm',2,'TH',[12],r=>{
  const [a,b]=pair6(r,{maxL:600}),l=lcm6(a,b);
  return mkNum(r,{stem:`BCNN(${a}, ${b}) bằng`,correct:l,f:nv,cands:[a*b,gcd(a,b),l*2,l/2].filter(x=>isInt(x)&&x!==l),ok:x=>x>0,sol:`${a} = ${facH(a)}, ${b} = ${facH(b)}; BCNN(${a}, ${b}) = ${facH(l)} = ${l}.`,chk:()=>true});
});
N6('k6-11-uc',2,'NB',[11],r=>{
  const [a,b]=pair6(r,{g:[4,6,8,9,10,12]}),U=divs6(gcd(a,b));
  return mkTxt(r,{stem:`Tập hợp ƯC(${a}, ${b}) là`,correct:set6(U),wrongs:[set6(divs6(Math.min(a,b))),set6(U.slice(1)),set6([...U,Math.max(a,b)]),set6(U.filter(x=>x!==U[U.length-1]))].filter(s=>s!==set6(U)),
    sol:`ƯCLN(${a}, ${b}) = ${gcd(a,b)}; ƯC(${a}, ${b}) = Ư(${gcd(a,b)}) = ${set6(U)}.`,chk:()=>U.length>=3});
});
N6('k6-12-bc',2,'NB',[12],r=>{
  const a=r.pick([4,6,8,9,10,12,15]),b=r.pick([3,4,5,6,10]),l=lcm6(a,b);if(a===b||l===a||l===b)return T.nlc['k6-12-bc'].gen(r);
  return mkTxt(r,{stem:`Số nào sau đây là bội chung của ${a} và ${b}?`,correct:String(l*r.int(1,3)),wrongs:[...new Set([a*b+a,l+a,l+b,a*(b+1),l+1,2*l+a,l-1,2*l+b])].filter(x=>x%a||x%b).map(String),sol:`Bội chung của ${a} và ${b} là bội của BCNN(${a}, ${b}) = ${l}.`,chk:()=>true});
});

/* ---------- Đúng/sai ---------- */
DS6('ds6-1-set',1,'NB',[1],r=>{
  const n=r.int(4,9),out=n+r.int(0,3);
  return mkDS(r,{stem:`Cho tập hợp ${I('A')} = {${I('x')} ∈ ℕ | ${I('x')} < ${n}}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('A')} có ${n} phần tử.`,f:`${I('A')} có ${n-1} phần tử.`,why:`A = {0; 1; …; ${n-1}} có ${n} phần tử.`},
    {t:`0 ∈ ${I('A')}.`,f:`0 ∉ ${I('A')}.`,why:`0 là số tự nhiên nhỏ hơn ${n}.`},
    {t:`${out} ∉ ${I('A')}.`,f:`${out} ∈ ${I('A')}.`,why:`${out} ≥ ${n}.`},
    {t:`Phần tử lớn nhất của ${I('A')} là ${n-1}.`,f:`Phần tử lớn nhất của ${I('A')} là ${n}.`,why:`x < ${n} nên x ≤ ${n-1}.`}],chk:()=>true});
});
DS6('ds6-6-pow',1,'NB',[6],r=>{
  const a=r.int(3,7),m=r.int(2,6),n=r.int(3,6),k=r.int(3,7);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${pw6(a,m)}·${pw6(a,n)} = ${pw6(a,m+n)}.`,f:`${pw6(a,m)}·${pw6(a,n)} = ${pw6(a,m*n)}.`,why:`aᵐ·aⁿ = aᵐ⁺ⁿ.`},
    {t:`${pw6(10,k)} = ${nv(10**k)}.`,f:`${pw6(10,k)} = ${nv(10**(k-1))}.`,why:`10ᵏ là số 1 theo sau bởi ${k} chữ số 0.`},
    {t:`${pw6(a,1)} = ${a}.`,f:`${pw6(a,1)} = 1.`,why:`a¹ = a.`},
    {t:`${pw6(a,2)} = ${a*a}.`,f:`${pw6(a,2)} = ${2*a}.`,why:`${a}² = ${a}·${a} = ${a*a}.`}],chk:()=>m*n!==m+n&&a*a!==2*a});
});
DS6('ds6-5-div',1,'TH',[5],r=>{
  const b=r.int(6,25),q=r.int(12,80),rr=r.pick([...Array(b-1)].map((_,i)=>i+1).filter(v=>2*v!==b)),a=b*q+rr;
  return mkDS(r,{stem:`Thực hiện phép chia ${nv(a)} cho ${b}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Thương của phép chia là ${q}.`,f:`Thương của phép chia là ${q+1}.`,why:`${b}·${q} = ${b*q} ≤ ${a} < ${b*(q+1)}.`},
    {t:`Số dư của phép chia là ${rr}.`,f:`Số dư của phép chia là ${b-rr===rr?rr+1:b-rr}.`,why:`${a} − ${b*q} = ${rr}.`},
    {t:`${nv(a)} = ${b}·${q} + ${rr}.`,f:`${nv(a)} = ${b}·${q+1} ${MINUS} ${rr}.`,why:`Phép chia có dư a = b·q + r (0 < r < b).`},
    {t:`Nếu cộng thêm ${b-rr} vào số bị chia thì được phép chia hết.`,f:`Nếu cộng thêm ${rr} vào số bị chia thì được phép chia hết.`,why:`${a} + ${b-rr} = ${b}·${q+1}.`}],chk:()=>(a+rr)%b!==0&&b*(q+1)-rr!==a});
});
DS6('ds6-7-expr',1,'TH',[7],r=>{
  for(;;){const a=r.int(2,9),b=r.int(2,9),c=r.int(2,9),d=r.int(2,5),e=r.int(2,3),q=r.int(2,9);if((d-1)**e===d**e-d||q+c===q*c)continue;
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${a} + ${b}·${c} = ${a+b*c}.`,f:`${a} + ${b}·${c} = ${(a+b)*c}.`,why:`Nhân trước, cộng sau.`},
    {t:`${pw6(d,e)} ${MINUS} ${d} = ${d**e-d}.`,f:`${pw6(d,e)} ${MINUS} ${d} = ${pw6(d,e-1)}.`.replace(`= ${pw6(d,e-1)}`,`= ${(d-1)**e}`),why:`${d}${'²³'[e-2]} = ${d**e}.`},
    {t:`${q*b} : ${b}·${c} = ${q*c}.`,f:`${q*b} : ${b}·${c} = ${Math.round(q*b/(b*c)*100)/100===q*b/(b*c)&&isInt(q*b/(b*c))?q*b/(b*c):q+c}.`,why:`Nhân, chia thực hiện từ trái sang phải.`},
    {t:`${a}·(${b} + ${c}) = ${a*b} + ${a*c}.`,f:`${a}·(${b} + ${c}) = ${a*b} + ${c}.`,why:`Tính chất phân phối.`}],chk:()=>true})}
});
DS6('ds6-4-real',1,'VD',[4,5],r=>{
  const p1=r.int(3,9)*1000,n1=r.int(3,8),p2=r.int(12,30)*1000,n2=r.int(2,4),M=r.pick([100000,200000,500000]),T_=p1*n1+p2*n2;if(T_>=M)return T.ds['ds6-4-real'].gen(r);
  const k=Math.floor((M-T_)/p1);
  return mkDS(r,{stem:`Bạn Mai mua ${n1} quyển vở, mỗi quyển giá ${nv(p1)} đồng, và ${n2} hộp bút, mỗi hộp giá ${nv(p2)} đồng. Mai đưa người bán ${nv(M)} đồng. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Tiền mua vở là ${nv(p1*n1)} đồng.`,f:`Tiền mua vở là ${nv(p1+n1*1000)} đồng.`,why:`${n1}·${nv(p1)} = ${nv(p1*n1)}.`},
    {t:`Tổng số tiền Mai phải trả là ${nv(T_)} đồng.`,f:`Tổng số tiền Mai phải trả là ${nv(T_+p2)} đồng.`,why:`${nv(p1*n1)} + ${nv(p2*n2)} = ${nv(T_)}.`},
    {t:`Mai được trả lại ${nv(M-T_)} đồng.`,f:`Mai được trả lại ${nv(M-T_+p1)} đồng.`,why:`${nv(M)} − ${nv(T_)} = ${nv(M-T_)}.`},
    {t:`Với số tiền được trả lại, Mai mua thêm được nhiều nhất ${k} quyển vở như trên.`,f:`Với số tiền được trả lại, Mai mua thêm được nhiều nhất ${k+1} quyển vở như trên.`,why:`${nv(M-T_)} : ${nv(p1)} = ${k} (dư ${nv((M-T_)%p1)}).`}],chk:()=>true});
});
DS6('ds6-6-cmp',1,'VD',[6],r=>{
  const x=r.int(2,7),y=r.int(1,4),z=r.int(2,4);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`Nếu ${pw6(2,'x')} = ${2**x} thì ${I('x')} = ${x}.`.replace(pw6(2,'x'),`2${sup(I('x'))}`),f:`Nếu 2${sup(I('x'))} = ${2**x} thì ${I('x')} = ${x+1}.`,why:`${2**x} = ${pw6(2,x)}.`},
    {t:`Nếu 3${sup(`${I('x')} + 1`)} = ${3**(y+1)} thì ${I('x')} = ${y}.`,f:`Nếu 3${sup(`${I('x')} + 1`)} = ${3**(y+1)} thì ${I('x')} = ${y+1}.`,why:`${3**(y+1)} = ${pw6(3,y+1)} ⇒ x + 1 = ${y+1}.`},
    {t:`${pw6(2,3*z)} = ${pw6(8,z)}.`,f:`${pw6(2,3*z)} < ${pw6(8,z)}.`,why:`${pw6(8,z)} = (2³)${sup(z)} = ${pw6(2,3*z)}.`},
    {t:`${pw6(3,2*z)} > ${pw6(8,z)}.`,f:`${pw6(3,2*z)} < ${pw6(8,z)}.`,why:`${pw6(3,2*z)} = ${pw6(9,z)} > ${pw6(8,z)}.`}],chk:()=>true});
});
DS6('ds6-9-sign',2,'NB',[9],r=>{
  for(;;){const n=r.int(1000,99999);if(n%10===0)continue;const s=String(n).split('').reduce((a,c)=>a+ +c,0),d2=n%2===0,d3=s%3===0,d5=n%5===0,d9=s%9===0;
    return mkDS(r,{stem:`Cho số ${nv(n)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Số ${nv(n)} ${d2?'chia hết':'không chia hết'} cho 2.`,f:`Số ${nv(n)} ${d2?'không chia hết':'chia hết'} cho 2.`,why:`Chữ số tận cùng là ${n%10}.`},
      {t:`Số ${nv(n)} ${d3?'chia hết':'không chia hết'} cho 3.`,f:`Số ${nv(n)} ${d3?'không chia hết':'chia hết'} cho 3.`,why:`Tổng các chữ số bằng ${s}.`},
      {t:`Số ${nv(n)} ${d5?'chia hết':'không chia hết'} cho 5.`,f:`Số ${nv(n)} ${d5?'không chia hết':'chia hết'} cho 5.`,why:`Chữ số tận cùng là ${n%10}.`},
      {t:`Số ${nv(n)} ${d9?'chia hết':'không chia hết'} cho 9.`,f:`Số ${nv(n)} ${d9?'không chia hết':'chia hết'} cho 9.`,why:`Tổng các chữ số bằng ${s}.`}],chk:()=>true})}
});
DS6('ds6-10-prime',2,'NB',[10],r=>{
  const p=r.pick([2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]),c=r.pick([4,6,8,9,10,12,14,15,21,25,27,33,35,39,49,51,57]);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${p} là số nguyên tố.`,f:`${p} là hợp số.`,why:`${p} chỉ có hai ước là 1 và ${p}.`},
    {t:`${c} là hợp số.`,f:`${c} là số nguyên tố.`,why:`${c} = ${facH(c)}.`},
    {t:`Số 1 không phải là số nguyên tố và không phải là hợp số.`,f:`Số 1 là số nguyên tố.`,why:`Số nguyên tố là số lớn hơn 1 chỉ có hai ước.`},
    {t:`2 là số nguyên tố chẵn duy nhất.`,f:`Mọi số nguyên tố đều là số lẻ.`,why:`2 là số nguyên tố và là số chẵn.`}],chk:()=>true});
});
DS6('ds6-11-gcd',2,'TH',[11,12],r=>{
  const [a,b]=pair6(r,{maxL:400}),g=gcd(a,b),l=lcm6(a,b);
  return mkDS(r,{stem:`Cho hai số ${a} và ${b}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${a} = ${facH(a)}.`,f:`${a} = ${facH(a*2)}.`,why:`Phân tích ${a} ra thừa số nguyên tố.`},
    {t:`ƯCLN(${a}, ${b}) = ${g}.`,f:`ƯCLN(${a}, ${b}) = ${g*2}.`,why:`Lấy các thừa số nguyên tố chung với số mũ nhỏ nhất.`},
    {t:`BCNN(${a}, ${b}) = ${l}.`,f:`BCNN(${a}, ${b}) = ${a*b===l?l*2:a*b}.`,why:`Lấy tất cả thừa số nguyên tố với số mũ lớn nhất.`},
    {t:`ƯCLN(${a}, ${b})·BCNN(${a}, ${b}) = ${a}·${b}.`,f:`ƯCLN(${a}, ${b})·BCNN(${a}, ${b}) = ${a}+${b}.`.replace(`${a}+${b}`,`${a} + ${b}`),why:`${g}·${l} = ${g*l} = ${a}·${b}.`}],chk:()=>g*l===a*b});
});
DS6('ds6-12-lcm',2,'TH',[12],r=>{
  const [a,b]=pair6(r,{maxL:200,g:[2,3,4,6]}),l=lcm6(a,b),lo=r.int(1,3)*l+r.int(1,l-1),cnt=Math.floor(500/l);
  return mkDS(r,{stem:`Cho hai số ${a} và ${b}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`BCNN(${a}, ${b}) = ${l}.`,f:`BCNN(${a}, ${b}) = ${lcm6(a,b)*2}.`,why:`${a} = ${facH(a)}, ${b} = ${facH(b)}.`},
    {t:`${l*2} là một bội chung của ${a} và ${b}.`,f:`${l+a} là một bội chung của ${a} và ${b}.`,why:`Bội chung là bội của BCNN.`},
    {t:`Bội chung nhỏ nhất khác 0 của ${a} và ${b} lớn hơn ${lo} là ${Math.ceil((lo+1)/l)*l}.`,f:`Bội chung nhỏ nhất khác 0 của ${a} và ${b} lớn hơn ${lo} là ${Math.ceil((lo+1)/l)*l+l}.`,why:`Các bội chung: ${l}, ${2*l}, ${3*l}, ${4*l}, …`},
    {t:`Có ${cnt} bội chung khác 0 của ${a} và ${b} nhỏ hơn hoặc bằng 500.`,f:`Có ${cnt+1} bội chung khác 0 của ${a} và ${b} nhỏ hơn hoặc bằng 500.`,why:`500 : ${l} = ${cnt} (dư ${500%l}).`}],chk:()=>(l+a)%b!==0});
});
DS6('ds6-11-real',2,'VD',[11],r=>{
  for(;;){const g=r.pick([6,8,9,10,12,15,18]),a=g*r.int(2,7),b=g*r.int(2,7);if(gcd(a,b)!==g||a===b)continue;
    return mkDS(r,{stem:`Cô giáo có ${a} quyển vở và ${b} chiếc bút. Cô muốn chia đều số vở và số bút thành các phần thưởng như nhau (mỗi phần có cả vở và bút). Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Số phần thưởng là một ước chung của ${a} và ${b}.`,f:`Số phần thưởng là một bội chung của ${a} và ${b}.`,why:`Chia đều nên số phần thưởng là ước của ${a} và của ${b}.`},
      {t:`Có thể chia được nhiều nhất ${g} phần thưởng.`,f:`Có thể chia được nhiều nhất ${g*2} phần thưởng.`,why:`ƯCLN(${a}, ${b}) = ${g}.`},
      {t:`Khi chia được nhiều phần thưởng nhất, mỗi phần có ${a/g} quyển vở.`,f:`Khi chia được nhiều phần thưởng nhất, mỗi phần có ${b/g} quyển vở.`,why:`${a} : ${g} = ${a/g}.`},
      {t:`Có thể chia thành ${divs6(g).filter(d=>d>1).slice(-2,-1)[0]||g} phần thưởng.`,f:`Có thể chia thành ${g+1} phần thưởng.`,why:`Số phần thưởng phải là ước của ${g}.`}],chk:()=>a/g!==b/g&&g%(g+1)!==0})}
});
DS6('ds6-12-real',2,'VD',[12],r=>{
  for(;;){const a=r.pick([4,5,6,8,9,10,12]),b=r.pick([6,8,9,10,12,15]),l=lcm6(a,b);if(a===b||l===a||l===b||l>60)continue;const lo=r.int(2,4)*l-r.int(1,l-1),hi=lo+l,N=Math.ceil(lo/l)*l;
    return mkDS(r,{stem:`Số học sinh của một khối khi xếp hàng ${a} hoặc hàng ${b} đều vừa đủ. Biết số học sinh trong khoảng từ ${lo} đến ${hi}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Số học sinh là một bội chung của ${a} và ${b}.`,f:`Số học sinh là một ước chung của ${a} và ${b}.`,why:`Xếp hàng vừa đủ nên số học sinh chia hết cho ${a} và ${b}.`},
      {t:`BCNN(${a}, ${b}) = ${l}.`,f:`BCNN(${a}, ${b}) = ${a*b===l?l+a:a*b}.`,why:`${a} = ${facH(a)}, ${b} = ${facH(b)}.`},
      {t:`Số học sinh của khối là ${N}.`,f:`Số học sinh của khối là ${N+l>hi?N-l:N+l}.`,why:`Bội của ${l} trong khoảng từ ${lo} đến ${hi} là ${N}.`},
      {t:`Nếu xếp hàng ${l} thì cũng vừa đủ.`,f:`Nếu xếp hàng ${l+1} thì cũng vừa đủ.`,why:`${N} ⋮ ${l}.`}],chk:()=>N>=lo&&N<=hi&&N%(l+1)!==0})}
});

/* ---------- Trả lời ngắn ---------- */
TLN6('t6-7-calc',1,'TH',[7],r=>{
  for(;;){const E=EXP6(r);if(E.v<0)continue;return{kind:'tln',stem:`Tính giá trị của biểu thức ${E.h}.`,ans:E.v,unit:'',sol:`${E.h} = ${E.s} = ${E.v}.`,chk:()=>true}}
});
TLN6('t6-6-x',1,'TH',[6],r=>{
  const t=r.int(0,2),a=r.pick([2,3,5]),x=r.int(2,a===2?7:4),k=r.int(2,9);
  if(t===0)return{kind:'tln',stem:`Tìm số tự nhiên ${I('x')}, biết ${a}${sup(I('x'))} = ${nv(a**x)}.`,ans:x,unit:'',sol:`${nv(a**x)} = ${pw6(a,x)} nên x = ${x}.`,chk:()=>true};
  if(t===1)return{kind:'tln',stem:`Tìm số tự nhiên ${I('x')}, biết ${I('x')}${sup(2)} = ${k*k}.`,ans:k,unit:'',sol:`${k*k} = ${k}² nên x = ${k}.`,chk:()=>true};
  return{kind:'tln',stem:`Tìm số tự nhiên ${I('x')}, biết ${a}${sup(`${I('x')} + 1`)} = ${nv(a**(x+1))}.`,ans:x,unit:'',sol:`${nv(a**(x+1))} = ${pw6(a,x+1)} ⇒ x + 1 = ${x+1} ⇒ x = ${x}.`,chk:()=>true};
});
TLN6('t6-5-real',1,'VD',[5],r=>{
  const t=r.chance(.5);
  if(t){const c=r.pick([12,15,24,30]),n=r.int(200,999),v=Math.ceil(n/c);return{kind:'tln',stem:`Một nhà máy cần đóng ${n} chai nước vào các thùng, mỗi thùng chứa ${c} chai. Cần ít nhất bao nhiêu thùng để đóng hết số chai đó?`,ans:v,unit:'thùng',sol:`${n} : ${c} = ${Math.floor(n/c)} (dư ${n%c}); cần ${v} thùng.`,chk:()=>n%c!==0||true}}
  const p=r.int(5,15)*1000,M=r.pick([100000,200000,150000]),v=Math.floor(M/p);
  return{kind:'tln',stem:`Với ${nv(M)} đồng, bạn Nam mua được nhiều nhất bao nhiêu quyển truyện, biết mỗi quyển giá ${nv(p)} đồng?`,ans:v,unit:'quyển',sol:`${nv(M)} : ${nv(p)} = ${v} (dư ${nv(M%p)}).`,chk:()=>true};
});
TLN6('t6-4-sum',1,'VD',[4,5],r=>{
  const a=r.int(1,20),d=r.int(1,5),n=r.int(10,40),L=a+(n-1)*d,S=(a+L)*n/2;
  return{kind:'tln',stem:`Tính tổng ${I('S')} = ${a} + ${a+d} + ${a+2*d} + … + ${L}.`,ans:S,unit:'',sol:`Số số hạng: (${L} − ${a}) : ${d} + 1 = ${n}; S = (${a} + ${L})·${n} : 2 = ${nv(S)}.`,chk:()=>isInt(S)};
});
TLN6('t6-11-gcd',2,'TH',[11],r=>{
  const [a,b]=pair6(r),c=r.chance(.5)?gcd(a,b)*r.int(2,9):0,g=c?gcd(gcd(a,b),c):gcd(a,b);
  return{kind:'tln',stem:`Tìm ƯCLN(${a}, ${b}${c?', '+c:''}).`,ans:g,unit:'',sol:`${[a,b,c].filter(Boolean).map(x=>`${x} = ${facH(x)}`).join('; ')}; ƯCLN = ${g}.`,chk:()=>true};
});
TLN6('t6-12-lcm',2,'TH',[12],r=>{
  const [a,b]=pair6(r,{maxL:600}),l=lcm6(a,b);
  return{kind:'tln',stem:`Tìm BCNN(${a}, ${b}).`,ans:l,unit:'',sol:`${a} = ${facH(a)}, ${b} = ${facH(b)}; BCNN = ${facH(l)} = ${l}.`,chk:()=>true};
});
TLN6('t6-10-ndiv',2,'VD',[10,11],r=>{
  for(;;){const n=r.pick([12,18,20,24,28,30,36,40,42,45,48,50,54,56,60,63,72,75,80,84,90,96,100]),t=r.chance(.5),v=t?nDiv6(n):divs6(n).filter(isPrime).length;if(!t&&v<2)continue;
    return{kind:'tln',stem:t?`Số ${n} có bao nhiêu ước?`:`Số ${n} có bao nhiêu ước là số nguyên tố?`,ans:v,unit:'',sol:t?`${n} = ${facH(n)}; Ư(${n}) = ${set6(divs6(n))}, có ${v} ước.`:`${n} = ${facH(n)}; các ước nguyên tố: ${divs6(n).filter(isPrime).join(', ')}.`,chk:()=>true}}
});
TLN6('t6-12-real',2,'VD',[12],r=>{
  for(;;){const a=r.pick([10,12,15,18,20]),b=r.pick([12,15,20,24,30]),l=lcm6(a,b);if(a===b||l>120||l===b)continue;const h=r.pick([6,7,8]);
    return{kind:'tln',stem:`Hai xe buýt cùng xuất bến lúc ${h} giờ sáng. Xe thứ nhất cứ ${a} phút lại xuất bến một lần, xe thứ hai cứ ${b} phút lại xuất bến một lần. Hỏi sau ít nhất bao nhiêu phút hai xe lại cùng xuất bến?`,ans:l,unit:'phút',sol:`Số phút cần tìm là BCNN(${a}, ${b}) = ${l}.`,chk:()=>true}}
});
TLN6('t6-9-count',2,'VD',[9],r=>{
  const [p,q]=r.pick([[2,3],[2,5],[3,5],[2,9],[5,9]]),lo=r.int(10,99),hi=lo+r.int(80,400),m=p*q/gcd(p,q),v=Math.floor(hi/m)-Math.floor((lo-1)/m);
  return{kind:'tln',stem:`Có bao nhiêu số tự nhiên từ ${lo} đến ${hi} chia hết cho cả ${p} và ${q}?`,ans:v,unit:'',sol:`Số chia hết cho cả ${p} và ${q} là số chia hết cho ${m}; từ ${Math.ceil(lo/m)*m} đến ${Math.floor(hi/m)*m} có ${v} số.`,chk:()=>v>0};
});

/* ---------- Tự luận ---------- */
TL6('tl6-7-calc',1,'TH','alg',[4,5,7],r=>{
  for(;;){const E=EXP6(r);if(E.v<0)continue;const a=r.int(12,89),b=r.int(11,59),c=100-b;
    return{kind:'tl',title:'Thực hiện phép tính',parts:[{pts:.5,html:`Tính giá trị của biểu thức ${E.h}.`},{pts:.5,html:`Tính hợp lí: ${a}·${b} + ${a}·${c}.`}],
      sol:[ptxt([[`${E.h} = ${E.s}`,.25],[`= ${E.v}.`,.25]]),ptxt([[`= ${a}·(${b} + ${c}) = ${a}·100`,.25],[`= ${nv(a*100)}.`,.25]])],chk:()=>true}}
});
TL6('tl6-7-findx',1,'TH','alg',[5,7],r=>{
  const a=r.int(2,9),x=r.int(3,30),b=r.int(1,50),c=a*x+b,p=r.int(2,6),y=r.int(10,40),q=r.int(1,9),d=p*(y-q);
  return{kind:'tl',title:'Tìm số tự nhiên x',parts:[{pts:.5,html:`Tìm số tự nhiên ${I('x')}, biết ${a}${I('x')} + ${b} = ${c}.`},{pts:.5,html:`Tìm số tự nhiên ${I('x')}, biết ${p}·(${I('x')} ${MINUS} ${q}) = ${d}.`}],
    sol:[ptxt([[`${a}x = ${c} − ${b} = ${c-b}.`,.25],[`x = ${c-b} : ${a} = ${x}.`,.25]]),ptxt([[`x − ${q} = ${d} : ${p} = ${y-q}.`,.25],[`x = ${y-q} + ${q} = ${y}.`,.25]])],chk:()=>true};
});
TL6('tl6-6-pow',1,'VD','alg',[6],r=>{
  const a=r.int(2,7),m=r.int(2,6),n=r.int(2,6),k=r.int(2,5),x=r.int(1,4);
  return{kind:'tl',title:'Lũy thừa với số mũ tự nhiên',parts:[{pts:.5,html:`Viết kết quả dưới dạng một lũy thừa: ${pw6(a,m)}·${pw6(a,n)}·${a}; ${pw6(a,m+n+k)} : ${pw6(a,k)}.`},{pts:.5,html:`Tìm số tự nhiên ${I('x')}, biết 2${sup(`${I('x')} + ${k}`)} = ${nv(2**(x+k))}.`}],
    sol:[ptxt([[`${pw6(a,m)}·${pw6(a,n)}·${a} = ${pw6(a,m+n+1)}.`,.25],[`${pw6(a,m+n+k)} : ${pw6(a,k)} = ${pw6(a,m+n)}.`,.25]]),ptxt([[`${nv(2**(x+k))} = ${pw6(2,x+k)} nên x + ${k} = ${x+k}.`,.25],[`x = ${x}.`,.25]])],chk:()=>true};
});
TL6('tl6-4-sum',1,'VD','alg',[4,5],r=>{
  const a=r.int(1,20),d=r.int(2,5),n=r.int(15,50),L=a+(n-1)*d,S=(a+L)*n/2;
  return{kind:'tl',title:'Tổng các số cách đều',parts:[{pts:.5,html:`Cho tổng ${I('S')} = ${a} + ${a+d} + ${a+2*d} + … + ${L}. Tổng ${I('S')} có bao nhiêu số hạng?`},{pts:.5,html:`Tính tổng ${I('S')}.`}],
    sol:[ptxt([[`Hai số hạng liên tiếp hơn kém nhau ${d} đơn vị.`,.25],[`Số số hạng: (${L} − ${a}) : ${d} + 1 = ${n}.`,.25]]),ptxt([[`S = (số đầu + số cuối)·số số hạng : 2 = (${a} + ${L})·${n} : 2`,.25],[`= ${nv(S)}.`,.25]])],chk:()=>isInt(S)};
});
TL6('tl6-5-shop',1,'TH','real',[4,5],r=>{
  const p1=r.int(5,15)*1000,n1=r.int(3,10),p2=r.int(15,40)*1000,n2=r.int(2,5),M=r.pick([200000,300000,500000]),T_=p1*n1+p2*n2;if(T_>=M)return T.tl['tl6-5-shop'].gen(r);
  return{kind:'tl',title:'Bài toán mua sắm',parts:[{pts:.5,html:`Mẹ mua ${n1} kg táo, mỗi ki-lô-gam giá ${nv(p1)} đồng, và ${n2} hộp sữa, mỗi hộp giá ${nv(p2)} đồng. Tính số tiền mẹ phải trả.`},{pts:.5,html:`Mẹ đưa người bán ${nv(M)} đồng. Người bán phải trả lại mẹ bao nhiêu tiền?`}],
    sol:[ptxt([[`Tiền táo ${n1}·${nv(p1)} = ${nv(p1*n1)}; tiền sữa ${n2}·${nv(p2)} = ${nv(p2*n2)} (đồng).`,.25],[`Mẹ phải trả ${nv(T_)} đồng.`,.25]]),ptxt([[`${nv(M)} − ${nv(T_)}`,.25],[`= ${nv(M-T_)} (đồng).`,.25]])],chk:()=>true};
});
TL6('tl6-12-meet',2,'TH','real',[12],r=>{
  for(;;){const a=r.pick([6,8,9,10,12]),b=r.pick([8,10,12,15,18]),l=lcm6(a,b);if(a===b||l===b||l===a||l>90)continue;
    return{kind:'tl',title:'Bội chung nhỏ nhất',parts:[{pts:.5,html:`Phân tích ${a} và ${b} ra thừa số nguyên tố rồi tìm BCNN(${a}, ${b}).`},{pts:.5,html:`Hai tàu cùng cập một cảng vào hôm nay. Tàu thứ nhất cứ ${a} ngày cập cảng một lần, tàu thứ hai cứ ${b} ngày cập cảng một lần. Sau ít nhất bao nhiêu ngày hai tàu lại cùng cập cảng?`}],
      sol:[ptxt([[`${a} = ${facH(a)}; ${b} = ${facH(b)}.`,.25],[`BCNN(${a}, ${b}) = ${facH(l)} = ${l}.`,.25]]),ptxt([[`Số ngày cần tìm là bội chung nhỏ nhất khác 0 của ${a} và ${b}.`,.25],[`Sau ít nhất ${l} ngày.`,.25]])],chk:()=>true}}
});
TL6('tl6-11-gift',2,'VD','real',[11],r=>{
  for(;;){const g=r.pick([6,8,9,10,12,14,15,16,18]),a=g*r.int(2,7),b=g*r.int(2,7),c=g*r.int(2,7);if(gcd(gcd(a,b),c)!==g||new Set([a,b,c]).size<3)continue;
    return{kind:'tl',title:'Ước chung lớn nhất',parts:[{pts:.5,html:`Một nhà sách có ${a} quyển vở, ${b} chiếc bút và ${c} chiếc thước. Muốn chia đều số vở, bút, thước thành các phần quà như nhau. Có thể chia được nhiều nhất bao nhiêu phần quà?`},{pts:.5,html:`Khi đó mỗi phần quà có bao nhiêu quyển vở, bao nhiêu chiếc bút, bao nhiêu chiếc thước?`}],
      sol:[ptxt([[`Số phần quà là ước chung của ${a}, ${b}, ${c}; nhiều nhất bằng ƯCLN(${a}, ${b}, ${c}).`,.25],[`${a} = ${facH(a)}, ${b} = ${facH(b)}, ${c} = ${facH(c)} ⇒ ƯCLN = ${g}. Chia được nhiều nhất ${g} phần quà.`,.25]]),ptxt([[`Mỗi phần có ${a/g} quyển vở, ${b/g} chiếc bút`,.25],[`và ${c/g} chiếc thước.`,.25]])],chk:()=>true}}
});
TL6('tl6-12-line',2,'VD','real',[12],r=>{
  for(;;){const ks=r.pick([[2,3,4],[3,4,5],[2,5,6],[4,5,6],[3,5,6],[2,3,7]]),l=ks.reduce(lcm6,1),lo=r.pick([100,150,200,250,300]),hi=lo+r.pick([50,100]),rem=r.int(0,1),C=[];for(let n=lo;n<=hi;n++)if(ks.every(k=>n%k===rem))C.push(n);if(C.length!==1)continue;const N=C[0];
    return{kind:'tl',title:'Bài toán xếp hàng',parts:[{pts:.5,html:`Số học sinh của một trường khi xếp hàng ${ks.join(', ')} đều ${rem?'thừa 1 người':'vừa đủ'}. Gọi ${I('x')} là số học sinh của trường. Chứng tỏ ${rem?`${I('x')} ${MINUS} 1`:I('x')} là bội chung của ${ks.join(', ')}.`},{pts:.5,html:`Tìm số học sinh của trường, biết số học sinh trong khoảng từ ${lo} đến ${hi}.`}],
      sol:[ptxt([[`${rem?'x − 1':'x'} chia hết cho từng số ${ks.join(', ')}.`,.25],[`Nên ${rem?'x − 1':'x'} ∈ BC(${ks.join(', ')}) = B(${l}).`,.25]]),ptxt([[`B(${l}) = {0; ${l}; ${2*l}; ${3*l}; …}; ${lo} ≤ x ≤ ${hi}.`,.25],[`Suy ra x = ${N}.`,.25]])],chk:()=>true}}
});
/* ---------- Tự luận số học nâng cao (role num) ---------- */
TL6('tl6-8-digit',2,'VD','num',[8,9],r=>{
  for(;;){const a=r.int(1,9),b=r.int(0,9),D=[...Array(10).keys()].filter(d=>(a*1000+d*100+b*10+5)%9===0);if(D.length!==1)continue;const k=r.pick([3,7,11,13]),m1=k*r.int(10,99),m2=k*r.int(10,99),m3=k*r.int(10,99);
    return{kind:'tl',title:'Quan hệ chia hết',parts:[{pts:.5,html:`Không thực hiện phép tính, hãy giải thích vì sao tổng ${m1} + ${m2} + ${m3} chia hết cho ${k}.`},{pts:.5,html:`Tìm chữ số * để số <span style="text-decoration:overline">${a}*${b}5</span> chia hết cho cả 5 và 9.`}],
      sol:[ptxt([[`${m1} = ${k}·${m1/k}; ${m2} = ${k}·${m2/k}; ${m3} = ${k}·${m3/k} đều chia hết cho ${k}.`,.25],[`Theo tính chất chia hết của một tổng, tổng chia hết cho ${k}.`,.25]]),ptxt([[`Số có tận cùng là 5 nên chia hết cho 5; cần ${a} + * + ${b} + 5 = ${a+b+5} + * chia hết cho 9.`,.25],[`Suy ra * = ${D[0]}.`,.25]])],chk:()=>true}}
});
TL6('tl6-10-prime',2,'VD','num',[10,11],r=>{
  const n=r.pick([72,84,90,96,108,120,126,140,150,180]),m=r.pick([36,45,48,54,60,75,80]),g=gcd(n,m);
  return{kind:'tl',title:'Phân tích ra thừa số nguyên tố',parts:[{pts:.5,html:`Phân tích ${n} ra thừa số nguyên tố. Số ${n} có bao nhiêu ước?`},{pts:.5,html:`Tìm ƯC(${n}, ${m}).`}],
    sol:[ptxt([[`${n} = ${facH(n)}.`,.25],[`Số ước của ${n}: ${fac6(n).map(([,e])=>`(${e} + 1)`).join('·')} = ${nDiv6(n)}.`,.25]]),ptxt([[`${m} = ${facH(m)}; ƯCLN(${n}, ${m}) = ${g}.`,.25],[`ƯC(${n}, ${m}) = Ư(${g}) = ${set6(divs6(g))}.`,.25]])],chk:()=>n!==m};
});
TL6('tl6-8-pow3',2,'VDC','num',[6,8],r=>{
  const p=r.pick([2,3,5]),q=p===2?3:p===3?4:6,k=r.int(3,8),n=2*k;/* p + p² + … + p^(2k), nhóm hai số hạng: p(1+p) */
  return{kind:'tl',title:'Chứng minh chia hết',parts:[{pts:.5,html:`Cho ${I('A')} = ${p} + ${pw6(p,2)} + ${pw6(p,3)} + … + ${pw6(p,n)}. Chứng minh ${I('A')} chia hết cho ${p+1}.`},{pts:.5,html:`Chứng minh ${I('A')} chia hết cho ${p*(p+1)}.`}],
    sol:[ptxt([[`Nhóm từng cặp hai số hạng liên tiếp: A = (${p} + ${pw6(p,2)}) + (${pw6(p,3)} + ${pw6(p,4)}) + … + (${pw6(p,n-1)} + ${pw6(p,n)}).`,.25],[`= ${p}·(1 + ${p}) + ${pw6(p,3)}·(1 + ${p}) + … + ${pw6(p,n-1)}·(1 + ${p}) = ${p+1}·(${p} + ${pw6(p,3)} + … + ${pw6(p,n-1)}) chia hết cho ${p+1}.`,.25]]),
      ptxt([[`Mỗi số hạng của A đều chia hết cho ${p} nên A chia hết cho ${p}.`,.25],[`A chia hết cho ${p} và ${p+1}, mà ƯCLN(${p}, ${p+1}) = 1, nên A chia hết cho ${p*(p+1)}.`,.25]])],chk:()=>q>0&&gcd(p,p+1)===1};
});
TL6('tl6-11-rem',2,'VDC','num',[11],r=>{
  for(;;){const g=r.pick([12,15,16,18,20,24,25,30]),rr=r.int(2,Math.min(9,g-1)),a=g*r.int(3,9)+rr,b=g*r.int(3,9)+rr;if(gcd(a-rr,b-rr)!==g||a===b)continue;const D=divs6(g).filter(d=>d>rr);if(D.length<2)continue;
    return{kind:'tl',title:'Ước chung lớn nhất (nâng cao)',parts:[{pts:.5,html:`Tìm số tự nhiên ${I('a')} lớn nhất sao cho khi chia ${a} và ${b} cho ${I('a')} đều được số dư là ${rr}.`},{pts:.5,html:`Tìm tất cả các số tự nhiên ${I('a')} thoả mãn điều kiện trên.`}],
      sol:[ptxt([[`${a} − ${rr} = ${a-rr} và ${b} − ${rr} = ${b-rr} cùng chia hết cho a, với a > ${rr}.`,.25],[`a lớn nhất là ƯCLN(${a-rr}, ${b-rr}) = ${g}.`,.25]]),ptxt([[`a ∈ ƯC(${a-rr}, ${b-rr}) = Ư(${g}) = ${set6(divs6(g))} và a > ${rr}.`,.25],[`Vậy a ∈ ${set6(D)}.`,.25]])],chk:()=>D.length>=2}}
});
TL6('tl6-12-miss',2,'VDC','num',[12],r=>{
  for(;;){const ks=r.pick([[2,3,4,5],[3,4,5],[4,5,6],[2,3,5]]),d=r.pick([7,11,13]),l=ks.reduce(lcm6,1),C=[];for(let n=1;n<=1000;n++)if(ks.every(k=>(n+1)%k===0)&&n%d===0)C.push(n);if(!C.length||C[0]>600)continue;const N=C[0];
    return{kind:'tl',title:'Bội chung (nâng cao)',parts:[{pts:.5,html:`Một số học sinh khi xếp hàng ${ks.join(', ')} đều thiếu 1 người. Gọi ${I('x')} là số học sinh. Chứng minh ${I('x')} + 1 là bội của ${l}.`},{pts:.5,html:`Tìm số học sinh nhỏ nhất thoả mãn, biết khi xếp hàng ${d} thì vừa đủ.`}],
      sol:[ptxt([[`Thiếu 1 người thì đủ hàng nên x + 1 chia hết cho ${ks.join(', ')}.`,.25],[`Do đó x + 1 ∈ BC(${ks.join(', ')}) = B(${l}).`,.25]]),ptxt([[`x ∈ {${l-1}; ${2*l-1}; ${3*l-1}; …} và x chia hết cho ${d}.`,.25],[`Thử lần lượt được số nhỏ nhất là x = ${N}.`,.25]])],chk:()=>(N+1)%l===0}}
});
