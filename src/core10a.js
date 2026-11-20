/* ================================================================
   LỚP 10 – Toán 10 Kết nối tri thức, học kì I
   Chương I: Mệnh đề và tập hợp; Chương II: Bất phương trình và hệ bất phương trình bậc nhất hai ẩn
   ================================================================ */
const N10=(id,ch,lv,les,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:10,hk:1,les,sec});
const DS10=(id,ch,lv,les,gen,sec)=>reg('ds',id,ch,lv,gen,{g:10,hk:1,les,sec});
const TLN10=(id,ch,lv,les,gen,sec)=>reg('tln',id,ch,lv,gen,{g:10,hk:1,les,sec});
const TL10=(id,ch,lv,role,les,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:10,hk:1,les,sec});
const RR='ℝ',ZZ='ℤ',NN='ℕ',QQ='ℚ';
const setZ=a=>`{${a.map(x=>typeof x==='number'?sg(x):x).join('; ')}}`;
/* khoảng, đoạn, nửa khoảng: lo/hi là số hoặc ±Infinity; cl = [đóng trái, đóng phải] */
const ivH=(lo,hi,cl)=>`${cl[0]&&isFinite(lo)?'[':'('}${inf(lo)}; ${inf(hi)}${cl[1]&&isFinite(hi)?']':')'}`;

/* ===================== Bài 1: Mệnh đề ===================== */
N10('k10-1-isprop',1,'NB',[1],r=>{
  const P=[`${r.int(2,9)} + ${r.int(2,9)} = ${r.int(5,20)}`,`Hà Nội là thủ đô của Việt Nam.`,`${r.pick([7,11,13,17])} là số nguyên tố.`,`Phương trình ${I('x')}${sup(2)} + 1 = 0 có nghiệm thực.`,`Số ${r.pick([15,21,27])} chia hết cho 2.`,`Tổng ba góc của một tam giác bằng 180°.`,`${rt(r.pick([2,3,5]))} là số hữu tỉ.`];
  const NP=[`Hôm nay trời đẹp quá!`,`Bạn có thích học Toán không?`,`${I('x')} + ${r.int(2,8)} = ${r.int(9,15)}.`,`Hãy đóng cửa lại!`,`Số ${I('n')} chia hết cho 3.`,`Bạn học giỏi quá!`,`Mấy giờ rồi?`];
  const want=r.chance(.5);
  if(want)return mkTxt(r,{stem:'Câu nào sau đây là mệnh đề?',correct:r.pick(P).replace(/([^.!?])$/,'$1.'),wrongs:r.shuffle(NP).slice(0,3),sol:`Mệnh đề là một câu khẳng định đúng hoặc sai. Câu cảm thán, câu hỏi, câu cầu khiến và câu chứa biến chưa xác định đúng sai không phải là mệnh đề.`,chk:()=>true});
  return mkTxt(r,{stem:'Câu nào sau đây <b>không</b> là mệnh đề?',correct:r.pick(NP),wrongs:r.shuffle(P).slice(0,3).map(x=>x.replace(/([^.!?])$/,'$1.')),sol:`Câu cảm thán, câu hỏi, câu cầu khiến hoặc câu chứa biến chưa xác định đúng sai không phải là mệnh đề; các câu còn lại là khẳng định có tính đúng sai xác định.`,chk:()=>true});
});
/* các mệnh đề toán học có tính đúng sai tính được */
const isPr10=n=>n>1&&[...Array(Math.floor(Math.sqrt(n))+1).keys()].slice(2).every(d=>n%d);
function propPool(r){
  const n=r.int(10,60),a=r.int(2,9),b=r.int(2,9),k=r.pick([2,3,5,7]),m=r.int(2,30);
  return[
    [`${n} là số nguyên tố`,isPr10(n)],[`${a*b} chia hết cho ${k}`,(a*b)%k===0],[`${rt(m)} là số vô tỉ`,!Number.isInteger(Math.sqrt(m))],
    [`${m} là số chính phương`,Number.isInteger(Math.sqrt(m))],[`${fr(a,b)} > ${fr(b,a)}`,a>b],[`Phương trình ${I('x')}${sup(2)} ${MINUS} ${a}${I('x')} + ${b} = 0 có nghiệm thực`,a*a-4*b>=0],
    [`${a}${sup(2)} + ${b}${sup(2)} = ${(a+b)**2}`,a*a+b*b===(a+b)**2],[`${n} chia hết cho cả 2 và 3`,n%6===0]];
}
N10('k10-1-truth',1,'NB',[1],r=>{
  const L=r.shuffle(propPool(r)),want=r.chance(.5),c=L.find(x=>x[1]===want),w=L.filter(x=>x[1]!==want).slice(0,3);
  if(!c||w.length<3)return T.nlc['k10-1-truth'].gen(r);
  return mkTxt(r,{stem:`Mệnh đề nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:`"${c[0]}".`,wrongs:w.map(x=>`"${x[0]}".`),sol:`Kiểm tra trực tiếp từng mệnh đề: mệnh đề "${c[0]}" ${want?'đúng':'sai'}, các mệnh đề còn lại ${want?'sai':'đúng'}.`,chk:()=>c[1]===want&&w.every(x=>x[1]!==want)});
});
N10('k10-1-neg',1,'TH',[1],r=>{
  const a=r.int(1,6),q=r.pick(['>','≥','<','≤']),neg={'>':'≤','≥':'<','<':'≥','≤':'>'}[q],set=r.pick([RR,ZZ,NN]),all=r.chance(.5);
  const e=`${I('x')}${sup(2)} + ${a===1?'':a}${I('x')} + ${r.int(1,9)}`,P=`${all?'∀':'∃'}${I('x')} ∈ ${set}, ${e} ${q} 0`;
  const cor=`${all?'∃':'∀'}${I('x')} ∈ ${set}, ${e} ${neg} 0`,W=[`${all?'∃':'∀'}${I('x')} ∈ ${set}, ${e} ${q} 0`,`${all?'∀':'∃'}${I('x')} ∈ ${set}, ${e} ${neg} 0`,`${all?'∃':'∀'}${I('x')} ∈ ${set}, ${e} ${{'>':'<','≥':'≤','<':'>','≤':'≥'}[q]} 0`];
  return mkTxt(r,{stem:`Mệnh đề phủ định của mệnh đề "${P}" là`,correct:`"${cor}"`,wrongs:W.map(w=>`"${w}"`),sol:`Phủ định của "${all?'∀x ∈ X, P(x)':'∃x ∈ X, P(x)'}" là "${all?'∃x ∈ X, ':'∀x ∈ X, '}${'<span class="ol">P(x)</span>'}"; phủ định của "${q}" là "${neg}".`,chk:()=>neg!==q});
});
N10('k10-1-conv',1,'TH',[1],r=>{
  const L=[[`tam giác ${I('ABC')} đều`,`tam giác ${I('ABC')} cân`,`tam giác ${I('ABC')} không đều`,`tam giác ${I('ABC')} không cân`],
    [`tứ giác ${I('ABCD')} là hình vuông`,`tứ giác ${I('ABCD')} là hình chữ nhật`,`tứ giác ${I('ABCD')} không là hình vuông`,`tứ giác ${I('ABCD')} không là hình chữ nhật`],
    [`số tự nhiên ${I('n')} chia hết cho 6`,`${I('n')} chia hết cho 3`,`số tự nhiên ${I('n')} không chia hết cho 6`,`${I('n')} không chia hết cho 3`],
    [`hai góc ở vị trí đối đỉnh`,`hai góc đó bằng nhau`,`hai góc không ở vị trí đối đỉnh`,`hai góc đó không bằng nhau`],
    [`số nguyên ${I('a')} chia hết cho 10`,`${I('a')} chia hết cho 5`,`số nguyên ${I('a')} không chia hết cho 10`,`${I('a')} không chia hết cho 5`]];
  const [P,Q,nP,nQ]=r.pick(L),ask=r.int(0,2),U=x=>x.replace(/^([a-zà-ỹ])/,c=>c.toUpperCase());
  if(ask===0)return mkTxt(r,{stem:`Cho mệnh đề "Nếu ${P} thì ${Q}". Mệnh đề đảo của mệnh đề trên là`,correct:`"Nếu ${Q} thì ${P}".`,wrongs:[`"Nếu ${nQ} thì ${nP}".`,`"Nếu ${nP} thì ${nQ}".`,`"${U(P)} khi và chỉ khi ${Q}".`],sol:`Mệnh đề đảo của mệnh đề P ⇒ Q là mệnh đề Q ⇒ P.`,chk:()=>true});
  if(ask===1)return mkTxt(r,{stem:`Cho mệnh đề đúng "Nếu ${P} thì ${Q}". Khẳng định nào sau đây đúng?`,correct:`${U(P)} là điều kiện đủ để ${Q}.`,wrongs:[`${U(P)} là điều kiện cần để ${Q}.`,`${U(Q)} là điều kiện đủ để ${P}.`,`${U(P)} là điều kiện cần và đủ để ${Q}.`],sol:`Khi P ⇒ Q đúng: P là điều kiện đủ để có Q, Q là điều kiện cần để có P.`,chk:()=>true});
  return mkTxt(r,{stem:`Cho mệnh đề đúng "Nếu ${P} thì ${Q}". Khẳng định nào sau đây đúng?`,correct:`${U(Q)} là điều kiện cần để ${P}.`,wrongs:[`${U(Q)} là điều kiện đủ để ${P}.`,`${U(P)} là điều kiện cần để ${Q}.`,`${U(Q)} là điều kiện cần và đủ để ${P}.`],sol:`Khi P ⇒ Q đúng: Q là điều kiện cần để có P.`,chk:()=>true});
});
/* mệnh đề chứa ∀, ∃ với tính đúng sai kiểm tra bằng máy */
function quantPool(r){
  const a=r.int(1,5),b=r.int(1,9),c=r.int(2,6);
  const R=[...Array(401).keys()].map(i=>-10+i*0.05),Z=[...Array(41).keys()].map(i=>i-20),N=[...Array(31).keys()];
  return[
    [`∀${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} + ${b} > 0`,R.every(x=>x*x+b>0)],[`∃${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} = ${MINUS}${a}`,false],
    [`∀${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} > ${I('x')}`,R.every(x=>x*x>x)],[`∃${I('n')} ∈ ${NN}, ${I('n')}${sup(2)} = ${c*c}`,N.some(n=>n*n===c*c)],
    [`∀${I('n')} ∈ ${NN}, ${I('n')}${sup(2)} ≥ ${I('n')}`,N.every(n=>n*n>=n)],[`∃${I('x')} ∈ ${ZZ}, ${c}${I('x')} = ${c*a+1}`,Z.some(x=>c*x===c*a+1)],
    [`∀${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} ${MINUS} ${2*a}${I('x')} + ${a*a} ≥ 0`,true],[`∃${I('x')} ∈ ${QQ}, ${I('x')}${sup(2)} = ${c===4?3:c}`,false],
    [`∀${I('n')} ∈ ${NN}, ${I('n')}${sup(2)} + 1 không chia hết cho 3`,N.every(n=>(n*n+1)%3!==0)],[`∃${I('x')} ∈ ${RR}, ${I('x')} > ${I('x')}${sup(2)}`,R.some(x=>x>x*x)]];
}
N10('k10-1-quant',1,'TH',[1],r=>{
  const L=r.shuffle(quantPool(r)),want=r.chance(.5),c=L.find(x=>x[1]===want),w=L.filter(x=>x[1]!==want).slice(0,3);
  return mkTxt(r,{stem:`Mệnh đề nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:`"${c[0]}".`,wrongs:w.map(x=>`"${x[0]}".`),sol:`Mệnh đề "${c[0]}" ${want?'đúng':'sai'}. Với mệnh đề chứa ∀ cần đúng với mọi phần tử; mệnh đề chứa ∃ chỉ cần chỉ ra một phần tử thoả mãn.`,chk:()=>c[1]===want&&w.length===3});
});
DS10('ds10-1-prop',1,'TH',[1],r=>{
  const pr=r.pick([11,13,17,19,23,29,31,37,41,43]),cp=r.pick([21,27,33,39,49,51,57,91]),b=r.int(1,9),a=r.int(1,5),q=r.pick(['≥','>']),nq={'≥':'<','>':'≤'}[q];
  return mkDS(r,{stem:'Xét tính đúng sai của các mệnh đề sau:',items:[
    {t:`"${pr} là số nguyên tố".`,f:`"${cp} là số nguyên tố".`,why:`${pr} chỉ có hai ước là 1 và ${pr}; còn ${cp} là hợp số.`},
    {t:`"∀${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} + ${b} > 0".`,f:`"∀${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} > ${I('x')}".`,why:`x² + ${b} ≥ ${b} > 0 với mọi x; còn x² > x sai với x = 1.`},
    {t:`Mệnh đề phủ định của "∀${I('x')} ∈ ${RR}, ${xquad(1,0,a)} ${q} 0" là "∃${I('x')} ∈ ${RR}, ${xquad(1,0,a)} ${nq} 0".`,f:`Mệnh đề phủ định của "∀${I('x')} ∈ ${RR}, ${xquad(1,0,a)} ${q} 0" là "∀${I('x')} ∈ ${RR}, ${xquad(1,0,a)} ${nq} 0".`,why:`Phủ định của "∀x, P(x)" là "∃x, P(x) sai"; phủ định của "${q}" là "${nq}".`},
    {t:`Mệnh đề "Nếu số tự nhiên ${I('n')} chia hết cho 6 thì ${I('n')} chia hết cho 3" là mệnh đề đúng.`,f:`Mệnh đề "Nếu số tự nhiên ${I('n')} chia hết cho 3 thì ${I('n')} chia hết cho 6" là mệnh đề đúng.`,why:`n chia hết cho 6 thì chia hết cho 3; nhưng chiều ngược lại sai (ví dụ n = 9).`}],chk:()=>isPr10(pr)&&!isPr10(cp)});
});
TLN10('t10-1-count',1,'VD',[1],r=>{
  const p=r.int(-4,1),q=p+r.int(2,6),lo=r.int(-8,-3),hi=r.int(3,8);
  /* P(x): (x − p)(x − q) < 0, đếm x nguyên trong [lo; hi] để P đúng */
  const cnt=[...Array(hi-lo+1).keys()].map(i=>lo+i).filter(x=>(x-p)*(x-q)<0).length;
  return{kind:'tln',stem:`Cho mệnh đề chứa biến ${I('P')}(${I('x')}): "${xquad(1,-(p+q),p*q)} < 0". Có bao nhiêu số nguyên ${I('x')} thuộc đoạn [${sg(lo)}; ${sg(hi)}] để ${I('P')}(${I('x')}) là mệnh đề đúng?`,ans:cnt,unit:'',
    sol:`${xquad(1,-(p+q),p*q)} < 0 ⟺ (${xlin(1,-p)})(${xlin(1,-q)}) < 0 ⟺ ${sg(p)} < x < ${sg(q)}. Các số nguyên thoả mãn trong đoạn đã cho: ${cnt} số.`,chk:()=>cnt===Math.max(0,Math.min(q-1,hi)-Math.max(p+1,lo)+1)};
});

/* ===================== Bài 2: Tập hợp và các phép toán trên tập hợp ===================== */
N10('k10-2-list',1,'NB',[2],r=>{
  const k=r.int(0,2);
  if(k===0){const n=r.int(2,4),A=[...Array(2*n-1).keys()].map(i=>i-n+1);
    return mkTxt(r,{stem:`Liệt kê các phần tử của tập hợp ${I('A')} = {${I('x')} ∈ ${ZZ} | |${I('x')}| < ${n}}.`,correct:`${I('A')} = ${setZ(A)}`,wrongs:[`${I('A')} = ${setZ(A.filter(x=>x>=0))}`,`${I('A')} = ${setZ([...A,n].concat([-n]).sort((a,b)=>a-b))}`,`${I('A')} = ${setZ(A.filter(x=>x>0))}`],sol:`|x| < ${n} ⟺ −${n} < x < ${n}; các số nguyên: ${setZ(A)}.`,chk:()=>true})}
  if(k===1){const n=r.int(3,7),A=[...Array(n).keys()];
    return mkTxt(r,{stem:`Liệt kê các phần tử của tập hợp ${I('A')} = {${I('x')} ∈ ${NN} | ${I('x')} < ${n}}.`,correct:`${I('A')} = ${setZ(A)}`,wrongs:[`${I('A')} = ${setZ(A.slice(1))}`,`${I('A')} = ${setZ(A.concat([n]))}`,`${I('A')} = ${setZ(A.slice(1).concat([n]))}`],sol:`Các số tự nhiên nhỏ hơn ${n}: ${setZ(A)} (chú ý 0 ∈ ℕ).`,chk:()=>true})}
  const s_=r.pick([2,3]),p=r.pick([-4,-3,-2,-1,0,4,5].filter(x=>x!==s_)),B=[...new Set([p,1])].sort((a,b)=>a-b);
  return mkTxt(r,{stem:`Liệt kê các phần tử của tập hợp ${I('B')} = {${I('x')} ∈ ${ZZ} | (${xlin(1,-p)})(${xquad(s_,-(s_+1),1)}) = 0}.`,correct:`${I('B')} = ${setZ(B)}`,wrongs:[`${I('B')} = ${setZ([p])}`,`${I('B')} = ${setZ([p,1,s_].sort((a,b)=>a-b))}`,`${I('B')} = {${[p,1].sort((a,b)=>a-b).map(sg).concat([fr(1,s_)]).join('; ')}}`],
    sol:`${xlin(1,-p)} = 0 ⟺ x = ${sg(p)}; ${xquad(s_,-(s_+1),1)} = 0 ⟺ x = 1 hoặc x = ${fr(1,s_)} (không phải số nguyên). Vậy B = ${setZ(B)}.`,chk:()=>p!==1});
});
N10('k10-2-sub',1,'NB',[2],r=>{
  const n=r.int(2,5),L=['a','b','c','d','e'].slice(0,n).map(I),ask=r.chance(.5),v=ask?2**n:2**n-1;
  return mkNum(r,{stem:`Cho tập hợp ${I('A')} = {${L.join('; ')}}. Tập ${I('A')} có tất cả bao nhiêu tập con${ask?'':' khác rỗng'}?`,correct:v,ok:x=>x>0,cands:[2**n,2**n-1,2*n,n,n*n,2**n+1].filter(x=>x!==v),
    sol:`Tập có ${n} phần tử có 2${sup(n)} = ${2**n} tập con (kể cả ∅ và chính nó)${ask?'':`, nên có ${2**n-1} tập con khác rỗng`}.`,chk:()=>true});
});
N10('k10-2-ops',1,'TH',[2],r=>{
  for(;;){const U=[...Array(10).keys()],A=r.shuffle(U.slice()).slice(0,r.int(3,5)).sort((a,b)=>a-b),B=r.shuffle(U.slice()).slice(0,r.int(3,5)).sort((a,b)=>a-b),op=r.int(0,3);
  const I_=A.filter(x=>B.includes(x)),Un=[...new Set(A.concat(B))].sort((a,b)=>a-b),D=A.filter(x=>!B.includes(x)),D2=B.filter(x=>!A.includes(x));
  const nm=[`${I('A')} ∩ ${I('B')}`,`${I('A')} ∪ ${I('B')}`,`${I('A')} \\ ${I('B')}`,`${I('B')} \\ ${I('A')}`][op],res=[I_,Un,D,D2][op];
  const H=x=>x.length?setZ(x):'∅';if(!I_.length||!D.length||!D2.length)continue;
  return mkTxt(r,{stem:`Cho hai tập hợp ${I('A')} = ${setZ(A)} và ${I('B')} = ${setZ(B)}. Tập hợp ${nm} là`,correct:H(res),wrongs:uniqBy([I_,Un,D,D2,A,B].map(H),x=>x).filter(x=>x!==H(res)),
    sol:`${['A ∩ B gồm các phần tử thuộc cả A và B','A ∪ B gồm các phần tử thuộc A hoặc thuộc B','A \\ B gồm các phần tử thuộc A nhưng không thuộc B','B \\ A gồm các phần tử thuộc B nhưng không thuộc A'][op]}: ${H(res)}.`,chk:()=>true})}
});
/* phép toán trên các khoảng: biểu diễn tập con của ℝ bằng danh sách đoạn rời rạc */
function ivOp(A,B,op){/* A, B: [lo, hi, đóng trái, đóng phải]; op 0: ∩, 1: ∪, 2: A \ B */
  const inS=(S,x)=>(x>S[0]||(S[2]&&x===S[0]))&&(x<S[1]||(S[3]&&x===S[1]));
  const f=[x=>inS(A,x)&&inS(B,x),x=>inS(A,x)||inS(B,x),x=>inS(A,x)&&!inS(B,x)][op];
  const pts=[...new Set([A[0],A[1],B[0],B[1]].filter(isFinite))].sort((a,b)=>a-b),xs=[-Infinity,...pts,Infinity];
  const el=[];/* các phần tử xen kẽ: khoảng (xs[i]; xs[i+1]) và điểm xs[i+1] */
  for(let i=0;i<xs.length-1;i++){const a=xs[i],b=xs[i+1],mid=!isFinite(a)?b-1:!isFinite(b)?a+1:(a+b)/2;el.push({g:1,a,b,in:f(mid)});if(i<xs.length-2)el.push({g:0,a:b,b,in:f(b)})}
  const parts=[];let k=0;
  while(k<el.length){if(!el[k].in){k++;continue}let e=k;while(e+1<el.length&&el[e+1].in)e++;
    const L=el[k],R=el[e];if(L===R&&!L.g)parts.push(`{${sg(L.a)}}`);else parts.push(ivH(L.a,R.b,[!L.g,!R.g]));k=e+1}
  return parts.join(' ∪ ')||'∅';
}
const randIv=r=>{const t=r.int(0,4),a=r.int(-6,3),b=a+r.int(2,6);return[[a,b,r.chance(.5),r.chance(.5)],[-Infinity,b,false,r.chance(.5)],[a,Infinity,r.chance(.5),false],[a,b,true,true],[a,b,false,false]][t]};
const ivS=A=>ivH(A[0],A[1],[A[2],A[3]]);
N10('k10-2-iv',1,'TH',[2],r=>{
  for(;;){const A=randIv(r),B=randIv(r),op=r.int(0,2),res=ivOp(A,B,op);if(res==='∅'||res.includes('{'))continue;
    const others=[0,1,2].filter(o=>o!==op).map(o=>ivOp(A,B,o)).concat([ivOp(B,A,2)]).filter(x=>x!==res&&x!=='∅');
    const alt=res.replace(/^\[/,'(').replace(/\]$/,')');const alt2=res.replace(/^\(/,'[');
    const W=uniqBy(others.concat([alt,alt2]),x=>x).filter(x=>x!==res);if(W.length<3)continue;
    return mkTxt(r,{stem:`Cho hai tập hợp ${I('A')} = ${ivS(A)} và ${I('B')} = ${ivS(B)}. Tập hợp ${[`${I('A')} ∩ ${I('B')}`,`${I('A')} ∪ ${I('B')}`,`${I('A')} \\ ${I('B')}`][op]} là`,correct:res,wrongs:W,
      sol:`Biểu diễn hai tập hợp trên trục số rồi lấy ${['phần chung','tất cả các phần','phần thuộc A nhưng không thuộc B'][op]}: ${res}. Chú ý các đầu mút có thuộc tập hợp hay không.`,chk:()=>true})}
});
N10('k10-2-comp',1,'TH',[2],r=>{
  const a=r.int(-5,5),cl=r.chance(.5),right=r.chance(.5);
  const A=right?ivH(a,Infinity,[cl,false]):ivH(-Infinity,a,[false,cl]),C=right?ivH(-Infinity,a,[false,!cl]):ivH(a,Infinity,[!cl,false]);
  const W=[right?ivH(-Infinity,a,[false,cl]):ivH(a,Infinity,[cl,false]),right?ivH(-Infinity,-a,[false,!cl]):ivH(-a,Infinity,[!cl,false]),A];
  return mkTxt(r,{stem:`Cho tập hợp ${I('A')} = ${A}. Phần bù của ${I('A')} trong ${RR}, kí hiệu ${I('C')}<sub>${RR}</sub>${I('A')}, là`,correct:C,wrongs:uniqBy(W,x=>x).filter(x=>x!==C).concat(['∅']).slice(0,3),
    sol:`C<sub>ℝ</sub>A = ℝ \\ A = ${C} (đầu mút ${sg(a)} ${cl?'thuộc A nên không thuộc phần bù':'không thuộc A nên thuộc phần bù'}).`,chk:()=>a===a});
});
N10('k10-2-param',1,'VD',[2],r=>{
  /* A = [m; m + k], B = (p; q): A ∩ B ≠ ∅ ⟺ p − k < m < q */
  const k=r.int(1,4),p=r.int(-4,2),q=p+r.int(2,6),cor=`${sg(p-k)} < ${I('m')} < ${sg(q)}`;
  return mkTxt(r,{stem:`Cho hai tập hợp ${I('A')} = [${I('m')}; ${I('m')} + ${k}] và ${I('B')} = (${sg(p)}; ${sg(q)}). Tìm tất cả các giá trị của tham số ${I('m')} để ${I('A')} ∩ ${I('B')} ≠ ∅.`,correct:cor,
    wrongs:[`${sg(p-k)} ≤ ${I('m')} ≤ ${sg(q)}`,`${sg(p)} < ${I('m')} < ${sg(q-k)}`,`${I('m')} < ${sg(p-k)} hoặc ${I('m')} > ${sg(q)}`],
    sol:`A ∩ B = ∅ ⟺ m + ${k} ≤ ${sg(p)} hoặc m ≥ ${sg(q)} ⟺ m ≤ ${sg(p-k)} hoặc m ≥ ${sg(q)}. Do đó A ∩ B ≠ ∅ ⟺ ${cor}.`,chk:()=>true});
});
N10('k10-2-venn',1,'VD',[2],r=>{
  const both=r.int(3,15),a=both+r.int(5,20),b=both+r.int(5,20),ask=r.int(0,2),tot=a+b-both,v=[tot,a-both,b-both][ask];
  const stem=ask===0?`Trong một lớp học, có ${a} học sinh thích bóng đá, ${b} học sinh thích bóng rổ và ${both} học sinh thích cả hai môn; mỗi học sinh của lớp thích ít nhất một trong hai môn đó. Lớp học đó có bao nhiêu học sinh?`
    :`Lớp 10A có ${tot} học sinh, mỗi học sinh thích ít nhất một trong hai môn bóng đá và bóng rổ; có ${a} học sinh thích bóng đá và ${b} học sinh thích bóng rổ. Có bao nhiêu học sinh chỉ thích ${ask===1?'bóng đá':'bóng rổ'}?`;
  return mkNum(r,{stem,correct:v,ok:x=>x>0,cands:[a+b,a,b,both,tot-both,a-both,b-both].filter(x=>x!==v),
    sol:ask===0?`n(A ∪ B) = n(A) + n(B) − n(A ∩ B) = ${a} + ${b} − ${both} = ${tot}.`:`Số học sinh thích cả hai môn: ${a} + ${b} − ${tot} = ${both}. Số học sinh chỉ thích ${ask===1?'bóng đá':'bóng rổ'}: ${ask===1?a:b} − ${both} = ${v}.`,chk:()=>true});
});
DS10('ds10-2-iv',1,'TH',[2],r=>{
  for(;;){const a=r.int(-5,0),b=a+r.int(3,6),c=r.int(a+1,b-1),d=c+r.int(2,6),A=[a,b,true,false],B=[c,d,false,true];if(d<=b)continue;
    const i=ivOp(A,B,0),u=ivOp(A,B,1),df=ivOp(A,B,2),zi=[...Array(41).keys()].map(t=>t-20).filter(x=>x>=a&&x<b&&x>c&&x<=d).length;
    return mkDS(r,{stem:`Cho hai tập hợp ${I('A')} = ${ivS(A)} và ${I('B')} = ${ivS(B)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${I('A')} ∩ ${I('B')} = ${i}.`,f:`${I('A')} ∩ ${I('B')} = ${ivH(c,b,[true,true])}.`,why:`Phần chung của hai tập là ${i}.`},
      {t:`${I('A')} ∪ ${I('B')} = ${u}.`,f:`${I('A')} ∪ ${I('B')} = ${ivH(a,d,[false,false])}.`,why:`Gộp hai tập: ${u}.`},
      {t:`${I('A')} \\ ${I('B')} = ${df}.`,f:`${I('A')} \\ ${I('B')} = ${ivH(a,c,[true,false])}.`,why:`Bỏ đi phần thuộc B: ${df}.`},
      {t:`${I('A')} ∩ ${I('B')} có đúng ${zi} số nguyên.`,f:`${I('A')} ∩ ${I('B')} có đúng ${zi+1} số nguyên.`,why:`Các số nguyên x với ${sg(c)} < x < ${sg(b)}: ${zi} số.`}],
      chk:()=>i===ivH(c,b,[false,false])&&u===ivH(a,d,[true,true])&&df===ivH(a,c,[true,true])})}
});
DS10('ds10-2-venn',1,'TH',[2],r=>{
  const both=r.int(5,20),a=both+r.int(5,25),b=both+r.int(5,25),none=r.int(2,8),tot=a+b-both+none;
  return mkDS(r,{stem:`Một cuộc khảo sát ${tot} khách du lịch cho thấy ${a} người đã đến Hội An, ${b} người đã đến Huế và ${none} người chưa đến nơi nào trong hai nơi đó. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Có ${tot-none} người đã đến ít nhất một trong hai nơi.`,f:`Có ${a+b} người đã đến ít nhất một trong hai nơi.`,why:`${tot} − ${none} = ${tot-none}.`},
    {t:`Có ${both} người đã đến cả hai nơi.`,f:`Có ${both+none} người đã đến cả hai nơi.`,why:`n(A ∩ B) = ${a} + ${b} − ${tot-none} = ${both}.`},
    {t:`Có ${a-both} người chỉ đến Hội An.`,f:`Có ${a} người chỉ đến Hội An.`,why:`${a} − ${both} = ${a-both}.`},
    {t:`Có ${b-both} người chỉ đến Huế.`,f:`Có ${b-both+1} người chỉ đến Huế.`,why:`${b} − ${both} = ${b-both}.`}],chk:()=>true});
});
TLN10('t10-2-venn',1,'VD',[2],r=>{
  const both=r.int(10,200),a=both+r.int(50,400),b=both+r.int(50,400),tot=a+b-both;
  return{kind:'tln',stem:`Trong ${tot} khách du lịch được phỏng vấn ở vịnh Hạ Long, có ${a} khách đã đến thăm động Thiên Cung, ${b} khách đã đến đảo Titop; mỗi khách đều đã đến ít nhất một trong hai địa điểm trên. Hỏi có bao nhiêu khách vừa đến động Thiên Cung vừa đến đảo Titop?`,ans:both,unit:'',
    sol:`n(A ∩ B) = n(A) + n(B) − n(A ∪ B) = ${a} + ${b} − ${tot} = ${both}.`,chk:()=>true};
});
TLN10('t10-2-int',1,'TH',[2],r=>{
  const a=r.int(-6,0),b=a+r.int(3,8),c=r.int(a+1,b-1),d=c+r.int(2,6),cnt=[...Array(61).keys()].map(t=>t-30).filter(x=>x>=a&&x<=b&&x>c&&x<d).length;
  return{kind:'tln',stem:`Cho hai tập hợp ${I('A')} = [${sg(a)}; ${sg(b)}] và ${I('B')} = (${sg(c)}; ${sg(d)}). Tập hợp ${I('A')} ∩ ${I('B')} có bao nhiêu phần tử là số nguyên?`,ans:cnt,unit:'',
    sol:`A ∩ B = ${ivOp([a,b,true,true],[c,d,false,false],0)}; các số nguyên thuộc tập này: ${cnt} số.`,chk:()=>true};
});
TL10('tl10-2-set',1,'TH','a',[2],r=>{
  for(;;){const a=r.int(-5,0),b=a+r.int(3,6),c=r.int(a+1,b-1),d=c+r.int(2,6),A=[a,b,true,false],B=[c,d,false,true];if(d<=b)continue;
    const i=ivOp(A,B,0),u=ivOp(A,B,1),df=ivOp(A,B,2),both=r.int(5,15),x=both+r.int(5,15),y=both+r.int(5,15),n=x+y-both;
    return{kind:'tl',title:'Tập hợp và các phép toán trên tập hợp',parts:[
      {pts:.5,html:`Cho hai tập hợp ${I('A')} = ${ivS(A)} và ${I('B')} = ${ivS(B)}. Xác định các tập hợp ${I('A')} ∩ ${I('B')}, ${I('A')} ∪ ${I('B')} và ${I('A')} \\ ${I('B')}.`},
      {pts:.5,html:`Lớp 10A có ${n} học sinh, mỗi học sinh tham gia ít nhất một trong hai câu lạc bộ Toán và Tiếng Anh; có ${x} học sinh tham gia câu lạc bộ Toán và ${y} học sinh tham gia câu lạc bộ Tiếng Anh. Hỏi có bao nhiêu học sinh tham gia cả hai câu lạc bộ?`}],
      sol:[ptxt([[`A ∩ B = ${i}; A ∪ B = ${u}.`,.25],[`A \\ B = ${df}.`,.25]]),ptxt([[`Gọi T, E là tập học sinh tham gia câu lạc bộ Toán, Tiếng Anh: n(T ∪ E) = n(T) + n(E) − n(T ∩ E).`,.25],[`n(T ∩ E) = ${x} + ${y} − ${n} = ${both}.`,.25]])],
      chk:()=>i!=='∅'}}
});

/* ===================== Bài 3 – 4: Bất phương trình, hệ bất phương trình bậc nhất hai ẩn ===================== */
let HP10=0;
/* vẽ miền nghiệm: phần bị gạch là phần KHÔNG thuộc miền nghiệm (theo SGK) */
function hpFig(ineqs,o={}){
  const [x0,x1]=o.x||[-5,5],[y0,y1]=o.y||[-5,5],W=o.w||200,H=o.h||200,p=14,kx=(W-2*p)/(x1-x0),ky=(H-2*p)/(y1-y0);
  const SX=x=>p+(x-x0)*kx,SY=y=>H-p-(y-y0)*ky,f=v=>v.toFixed(1),id='hp10'+(++HP10);
  const clip=(poly,a,b,c)=>{/* giữ phần a x + b y ≥ c */const out=[];for(let i=0;i<poly.length;i++){const P0=poly[i],P1=poly[(i+1)%poly.length],v0=a*P0[0]+b*P0[1]-c,v1=a*P1[0]+b*P1[1]-c;
    if(v0>=0)out.push(P0);if((v0>=0)!==(v1>=0)){const t=v0/(v0-v1);out.push([P0[0]+t*(P1[0]-P0[0]),P0[1]+t*(P1[1]-P0[1])])}}return out};
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Miền nghiệm"><defs><pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#777" stroke-width="1"/></pattern></defs>`;
  const rect=[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
  ineqs.forEach(([a,b,c,op])=>{/* phần bị loại: ngược với op */const keepGE=op==='≤'||op==='<';const poly=keepGE?clip(rect,a,b,c):clip(rect,-a,-b,-c);
    if(poly.length>2)s+=`<polygon points="${poly.map(([x,y])=>f(SX(x))+','+f(SY(y))).join(' ')}" fill="url(#${id})" stroke="none"/>`});
  const ax=SY(0),ay=SX(0);
  s+=`<line x1="${f(SX(x0))}" y1="${f(ax)}" x2="${f(SX(x1))}" y2="${f(ax)}" stroke="#000" stroke-width="0.9"/><polygon points="${f(SX(x1))},${f(ax)} ${f(SX(x1)-7)},${f(ax-3)} ${f(SX(x1)-7)},${f(ax+3)}"/>`;
  s+=`<line x1="${f(ay)}" y1="${f(SY(y0))}" x2="${f(ay)}" y2="${f(SY(y1))}" stroke="#000" stroke-width="0.9"/><polygon points="${f(ay)},${f(SY(y1))} ${f(ay-3)},${f(SY(y1)+7)} ${f(ay+3)},${f(SY(y1)+7)}"/>`;
  s+=`<text x="${f(SX(x1)-3)}" y="${f(ax+12)}" font-size="11" font-style="italic" text-anchor="end">x</text><text x="${f(ay-6)}" y="${f(SY(y1)+9)}" font-size="11" font-style="italic" text-anchor="end">y</text><text x="${f(ay-4)}" y="${f(ax+12)}" font-size="11" font-style="italic" text-anchor="end">O</text>`;
  const lab=new Set();
  ineqs.forEach(([a,b,c,op])=>{const pts=[];
    /* giao của đường thẳng a x + b y = c với khung hình */
    if(b!==0)for(const x of [x0,x1]){const y=(c-a*x)/b;if(y>=y0-1e-9&&y<=y1+1e-9)pts.push([x,y])}
    if(a!==0)for(const y of [y0,y1]){const x=(c-b*y)/a;if(x>=x0-1e-9&&x<=x1+1e-9)pts.push([x,y])}
    pts.sort((P,R)=>P[0]-R[0]||P[1]-R[1]);if(pts.length<2)return;pts.splice(1,pts.length-2);
    s+=`<line x1="${f(SX(pts[0][0]))}" y1="${f(SY(pts[0][1]))}" x2="${f(SX(pts[1][0]))}" y2="${f(SY(pts[1][1]))}" stroke="#000" stroke-width="1.3"${op==='<'||op==='>'?' stroke-dasharray="5 3"':''}/>`;
    if(a!==0&&isInt(c/a)&&c!==0&&!lab.has('x'+c/a)){lab.add('x'+c/a);s+=`<text x="${f(SX(c/a))}" y="${f(ax+12)}" font-size="10.5" text-anchor="middle">${fmt(c/a)}</text>`}
    if(b!==0&&isInt(c/b)&&c!==0&&!lab.has('y'+c/b)){lab.add('y'+c/b);s+=`<text x="${f(ay-4)}" y="${f(SY(c/b)+4)}" font-size="10.5" text-anchor="end">${fmt(c/b)}</text>`}});
  return `<div class="figure">${s}</svg></div>`;
}
const bptH=(a,b,c,op)=>`${lin3H([a,b],['x','y'])} ${op} ${sg(c)}`;
const sat=(a,b,c,op,x,y)=>{const v=a*x+b*y;return op==='<'?v<c:op==='≤'?v<=c:op==='>'?v>c:v>=c};
N10('k10-3-which',2,'NB',[3],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),c=r.int(-9,9),op=r.pick(['<','≤','>','≥']);
  const cor=`${lin3H([a,b],['x','y'])} ${op} ${sg(c)}`,W=[`${I('x')}${sup(2)}${plusH(lin3H([0,b],['x','y']))} ${op} ${sg(c)}`,`${a===1?'':a===-1?MINUS:sg(a)}${I('x')}${I('y')} ${op} ${sg(c)}`,`${lin3H([a,0],['x','y'])} + ${I('y')}${sup(3)} ${op} ${sg(c)}`,`${lin3H([a,b,0],['x','y','z'])} + ${I('z')} ${op} ${sg(c)}`];
  return mkTxt(r,{stem:'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?',correct:cor,wrongs:r.shuffle(W).slice(0,3),sol:`Bất phương trình bậc nhất hai ẩn có dạng ax + by < c (hoặc ≤, >, ≥) với a, b không đồng thời bằng 0: ${cor}.`,chk:()=>true});
});
N10('k10-3-pt',2,'NB',[3],r=>{
  for(;;){const a=r.nz(-4,4),b=r.nz(-4,4),c=r.int(-8,8),op=r.pick(['<','≤','>','≥']),P=[...Array(81).keys()].map(i=>[i%9-4,Math.floor(i/9)-4]);
    const yes=r.shuffle(P.filter(([x,y])=>sat(a,b,c,op,x,y))),no=r.shuffle(P.filter(([x,y])=>!sat(a,b,c,op,x,y)));if(yes.length<1||no.length<3)continue;
    const want=r.chance(.6),cor=want?yes[0]:no[0],W=want?no.slice(0,3):yes.slice(0,3);if(W.length<3)continue;
    return mkTxt(r,{stem:`Điểm nào sau đây ${want?'thuộc':'<b>không</b> thuộc'} miền nghiệm của bất phương trình ${bptH(a,b,c,op)}?`,correct:`(${cor.map(sg).join('; ')})`,wrongs:W.map(p=>`(${p.map(sg).join('; ')})`),
      sol:`Thay toạ độ (${cor.map(sg).join('; ')}) vào vế trái được ${sg(a*cor[0]+b*cor[1])}, ${sat(a,b,c,op,...cor)?'thoả mãn':'không thoả mãn'} ${sg(a*cor[0]+b*cor[1])} ${op} ${sg(c)}.`,chk:()=>sat(a,b,c,op,...cor)===want&&W.every(p=>sat(a,b,c,op,...p)!==want)})}
});
N10('k10-3-fig',2,'TH',[3],r=>{
  const p=r.nz(-4,4),q=r.nz(-4,4),op=r.pick(['<','≤','>','≥']);/* đường thẳng qua (p;0), (0;q): q x + p y = p q */
  const a=q,b=p,c=p*q,V={x:[Math.min(-1,p)-1.5,Math.max(1,p)+1.5],y:[Math.min(-1,q)-1.5,Math.max(1,q)+1.5]};
  const flip={'<':'>','≤':'≥','>':'<','≥':'≤'},strictT={'<':'≤','≤':'<','>':'≥','≥':'>'};
  const cor=bptH(a,b,c,op),W=[bptH(a,b,c,flip[op]),bptH(a,b,c,strictT[op]),bptH(b,a,c,op)].filter(w=>w!==cor);
  return mkTxt(r,{stem:`Phần không bị gạch trong hình bên (${op==='<'||op==='>'?'không kể bờ là đường nét đứt':'kể cả bờ là đường nét liền'}) là miền nghiệm của bất phương trình nào sau đây?${hpFig([[a,b,c,op]],{...V})}`,correct:cor,wrongs:W.concat([bptH(a,-b,c,op)]).filter((w,i,arr)=>w!==cor&&arr.indexOf(w)===i).slice(0,3),
    sol:`Đường thẳng bờ đi qua (${sg(p)}; 0) và (0; ${sg(q)}) nên có phương trình ${lin3H([a,b],['x','y'])} = ${sg(c)}; bờ vẽ ${op==='<'||op==='>'?'nét đứt nên không thuộc miền nghiệm':'nét liền nên thuộc miền nghiệm'}. Thử với điểm O(0; 0): 0 ${op} ${sg(c)} là ${sat(a,b,c,op,0,0)?'đúng':'sai'}, và O ${sat(a,b,c,op,0,0)?'thuộc':'không thuộc'} phần không bị gạch. Vậy chọn ${cor}.`,chk:()=>c!==0});
});
N10('k10-4-which',2,'NB',[4],r=>{
  const L=()=>`${lin3H([r.nz(-4,4),r.nz(-4,4)],['x','y'])} ${r.pick(['<','≤','>','≥'])} ${sg(r.int(-6,6))}`;
  const cor=cases(L(),L()),W=[cases(`${I('x')}${sup(2)} + ${I('y')} < 3`,L()),cases(L(),`${I('x')}${I('y')} > 1`),cases(`${I('x')} + ${I('y')} + ${I('z')} < 2`,L()),cases(L(),`${I('y')}${sup(3)} ${MINUS} ${I('x')} ≥ 0`)];
  return mkTxt(r,{stem:'Hệ bất phương trình nào sau đây là hệ bất phương trình bậc nhất hai ẩn?',correct:cor,wrongs:r.shuffle(W).slice(0,3),sol:`Hệ bất phương trình bậc nhất hai ẩn gồm các bất phương trình bậc nhất hai ẩn x, y. Các hệ còn lại có hạng tử x², xy, y³ hoặc ẩn thứ ba.`,chk:()=>true});
});
/* hệ có miền nghiệm là đa giác: dùng các ràng buộc x ≥ 0, y ≥ 0 và hai bất phương trình */
function lpSys(r){
  for(;;){const a1=r.int(1,3),b1=r.int(1,3),a2=r.int(1,3),b2=r.int(1,3),k1=r.int(2,8),k2=r.int(2,8),c1=a1*b1*k1,c2=a2*b2*k2;
    /* đỉnh: (0;0), trục, giao điểm */
    const D=a1*b2-a2*b1;if(D===0)continue;const xi=(c1*b2-c2*b1)/D,yi=(a1*c2-a2*c1)/D;if(!(xi>0&&yi>0)||!isInt(xi)||!isInt(yi))continue;
    const xa=Math.min(c1/a1,c2/a2),yb=Math.min(c1/b1,c2/b2);if(!isInt(xa)||!isInt(yb))continue;
    const V=[[0,0],[xa,0],[xi,yi],[0,yb]];if(new Set(V.map(String)).size<4)continue;
    const nm=(a,b,c)=>{const g=gcd(a,b);return[a/g,b/g,c/g]};
    return{I1:nm(a1,b1,c1),I2:nm(a2,b2,c2),V}}
}
const cases4=(...rows)=>cases(...rows).replace('class="cs"','class="cs c4"');
const ltx=(a,b)=>`${a===1?'':a}x + ${b===1?'':b}y`;
const sysH=S=>cases4(`${lin3H([S.I1[0],S.I1[1]],['x','y'])} ≤ ${S.I1[2]}`,`${lin3H([S.I2[0],S.I2[1]],['x','y'])} ≤ ${S.I2[2]}`,`${I('x')} ≥ 0`,`${I('y')} ≥ 0`);
N10('k10-4-pt',2,'NB',[4],r=>{
  const S=lpSys(r),inn=([x,y])=>x>=0&&y>=0&&S.I1[0]*x+S.I1[1]*y<=S.I1[2]&&S.I2[0]*x+S.I2[1]*y<=S.I2[2];
  const P=[];for(let x=-2;x<=12;x++)for(let y=-2;y<=12;y++)P.push([x,y]);const yes=r.shuffle(P.filter(inn)),no=r.shuffle(P.filter(p=>!inn(p)&&p[0]<=S.V[1][0]+2&&p[1]<=S.V[3][1]+2));
  return mkTxt(r,{stem:`Điểm nào sau đây thuộc miền nghiệm của hệ bất phương trình ${sysH(S)}?`,correct:`(${yes[0].join('; ')})`,wrongs:no.slice(0,3).map(p=>`(${p.map(sg).join('; ')})`),
    sol:`Thay toạ độ vào từng bất phương trình của hệ: chỉ điểm (${yes[0].join('; ')}) thoả mãn tất cả.`,chk:()=>inn(yes[0])&&no.slice(0,3).every(p=>!inn(p))});
});
N10('k10-4-max',2,'VD',[4],r=>{
  for(;;){const S=lpSys(r),p=r.int(1,5),q=r.int(1,5),ask=r.chance(.6),sq=ask?q:-q,vals=S.V.map(([x,y])=>p*x+sq*y),v=ask?Math.max(...vals):Math.min(...vals);
    if(vals.filter(x=>x===v).length>1)continue;
    return mkNum(r,{stem:`Giá trị ${ask?'lớn nhất':'nhỏ nhất'} của biểu thức ${I('F')}(${I('x')}; ${I('y')}) = ${lin3H([p,sq],['x','y'])} trên miền nghiệm của hệ bất phương trình ${sysH(S)} là`,correct:v,ok:()=>true,cands:vals.filter(x=>x!==v).concat([v+p,v-q,-v]),
      sol:`Miền nghiệm là tứ giác có các đỉnh ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}. Giá trị của F tại các đỉnh lần lượt là ${vals.map(sg).join('; ')}. Giá trị ${ask?'lớn nhất':'nhỏ nhất'} của F là ${sg(v)}.`,chk:()=>true})}
});
DS10('ds10-4-sys',2,'TH',[4],r=>{
  const S=lpSys(r),p=r.int(1,5),q=r.int(1,5),vals=S.V.map(([x,y])=>p*x+q*y),M=Math.max(...vals);
  return mkDS(r,{stem:`Cho hệ bất phương trình ${sysH(S)} và biểu thức ${I('F')}(${I('x')}; ${I('y')}) = ${lin3H([p,q],['x','y'])}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Điểm (0; 0) thuộc miền nghiệm của hệ.`,f:`Điểm (0; 0) không thuộc miền nghiệm của hệ.`,why:`Thay (0; 0): 0 ≤ ${S.I1[2]}, 0 ≤ ${S.I2[2]}, 0 ≥ 0 đều đúng.`},
    {t:`Điểm (${S.V[2][0]}; ${S.V[2][1]}) là một đỉnh của miền nghiệm.`,f:`Điểm (${S.V[2][0]+1}; ${S.V[2][1]}) là một đỉnh của miền nghiệm.`,why:`(${S.V[2][0]}; ${S.V[2][1]}) là giao điểm của hai đường thẳng ${lin3H([S.I1[0],S.I1[1]],['x','y'])} = ${S.I1[2]} và ${lin3H([S.I2[0],S.I2[1]],['x','y'])} = ${S.I2[2]}.`},
    {t:`Miền nghiệm của hệ là một tứ giác.`,f:`Miền nghiệm của hệ là một tam giác.`,why:`Các đỉnh: ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}.`},
    {t:`Giá trị lớn nhất của ${I('F')} trên miền nghiệm bằng ${M}.`,f:`Giá trị lớn nhất của ${I('F')} trên miền nghiệm bằng ${M+p}.`,why:`F tại các đỉnh: ${vals.join('; ')}; lớn nhất là ${M}.`}],chk:()=>true});
});
TLN10('t10-4-real',2,'VD',[4],r=>{
  for(;;){const S=lpSys(r),p=r.pick([2,3,4,5]),q=r.pick([3,4,5,6]),vals=S.V.map(([x,y])=>p*x+q*y),M=Math.max(...vals),best=S.V[vals.indexOf(M)];if(vals.filter(v=>v===M).length>1)continue;
    const [a1,b1,c1]=S.I1,[a2,b2,c2]=S.I2;
    return{kind:'tln',stem:`Một xưởng sản xuất hai loại sản phẩm I và II. Mỗi sản phẩm loại I cần ${a1} giờ trên máy A và ${a2} giờ trên máy B; mỗi sản phẩm loại II cần ${b1} giờ trên máy A và ${b2} giờ trên máy B. Trong một tuần, máy A làm việc không quá ${c1} giờ, máy B làm việc không quá ${c2} giờ. Mỗi sản phẩm loại I lãi ${p} triệu đồng, mỗi sản phẩm loại II lãi ${q} triệu đồng. Tính tiền lãi lớn nhất xưởng có thể thu được trong một tuần (đơn vị: triệu đồng).`,ans:M,unit:'',
      sol:`Gọi x, y là số sản phẩm loại I, II: ${ltx(a1,b1)} ≤ ${c1}, ${ltx(a2,b2)} ≤ ${c2}, x ≥ 0, y ≥ 0. Lãi F = ${p}x + ${q}y. Miền nghiệm có các đỉnh ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}; F lớn nhất bằng ${M} tại (${best.join('; ')}).`,chk:()=>true}}
});
TLN10('t10-4-max',2,'VD',[4],r=>{
  const S=lpSys(r),p=r.int(1,6),q=r.int(-3,6),vals=S.V.map(([x,y])=>p*x+q*y),M=Math.max(...vals);
  return{kind:'tln',stem:`Tìm giá trị lớn nhất của biểu thức ${I('F')}(${I('x')}; ${I('y')}) = ${lin3H([p,q],['x','y'])} với (${I('x')}; ${I('y')}) thuộc miền nghiệm của hệ ${sysH(S)}.`,ans:M,unit:'',
    sol:`Miền nghiệm là tứ giác với các đỉnh ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}; F tại các đỉnh: ${vals.map(sg).join('; ')}. Giá trị lớn nhất là ${M}.`,chk:()=>true};
});
TL10('tl10-4-lp',2,'VD','b',[3,4],r=>{
  for(;;){const S=lpSys(r),p=r.pick([2,3,4,5]),q=r.pick([3,4,5,6]),vals=S.V.map(([x,y])=>p*x+q*y),M=Math.max(...vals),best=S.V[vals.indexOf(M)];if(vals.filter(v=>v===M).length>1)continue;
    const [a1,b1,c1]=S.I1,[a2,b2,c2]=S.I2;
    return{kind:'tl',title:'Bài toán tối ưu với hệ bất phương trình bậc nhất hai ẩn',parts:[
      {pts:.5,html:`Một gia đình cần mua ${I('x')} kg thịt bò và ${I('y')} kg thịt lợn. Do giới hạn ngân sách và nhu cầu, ${I('x')}, ${I('y')} phải thoả mãn: ${lin3H([a1,b1],['x','y'])} ≤ ${c1}, ${lin3H([a2,b2],['x','y'])} ≤ ${c2}, ${I('x')} ≥ 0, ${I('y')} ≥ 0. Biểu diễn miền nghiệm và xác định các đỉnh của miền nghiệm của hệ bất phương trình trên.`},
      {pts:.5,html:`Lượng đạm thu được là ${I('F')} = ${p}${I('x')} + ${q}${I('y')} (đơn vị). Tìm ${I('x')}, ${I('y')} để lượng đạm thu được là lớn nhất.`}],
      sol:[ptxt([[`Vẽ các đường thẳng ${ltx(a1,b1)} = ${c1} và ${ltx(a2,b2)} = ${c2}; miền nghiệm là tứ giác (phần không bị gạch).`,.25],[`Các đỉnh: ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}.`,.25]]),
        ptxt([[`F tại các đỉnh: ${vals.join('; ')}.`,.25],[`F lớn nhất bằng ${M} khi x = ${best[0]}, y = ${best[1]}.`,.25]])],
      chk:()=>true}}
});
/* thêm dạng tự luận cho Chương I, II */
TL10('tl10-1-prop',1,'TH','a',[1,2],r=>{
  const n=r.int(2,5),a=r.int(1,6),q=r.pick(['>','≥']),nq={'>':'≤','≥':'<'}[q],k=r.int(2,4),A=[...Array(2*n-1).keys()].map(i=>i-n+1);
  return{kind:'tl',title:'Mệnh đề và tập hợp',parts:[
    {pts:.5,html:`Xét tính đúng sai và lập mệnh đề phủ định của mệnh đề ${I('P')}: "∀${I('x')} ∈ ${RR}, ${xquad(1,0,a)} ${q} 0".`},
    {pts:.5,html:`Cho tập hợp ${I('A')} = {${I('x')} ∈ ${ZZ} | |${I('x')}| < ${n}} và ${I('B')} = {${I('x')} ∈ ${NN} | ${I('x')} ≤ ${k}}. Liệt kê các phần tử của ${I('A')}, ${I('B')} rồi tìm ${I('A')} ∩ ${I('B')} và ${I('A')} \\ ${I('B')}.`}],
    sol:[ptxt([[`Với mọi x ∈ ℝ: x² + ${a} ≥ ${a} > 0 nên P đúng.`,.25],[`Mệnh đề phủ định: "∃x ∈ ℝ, x² + ${a} ${nq} 0" (mệnh đề sai).`,.25]]),
      ptxt([[`A = ${setZ(A)}; B = ${setZ([...Array(k+1).keys()])}.`,.25],[`A ∩ B = ${setZ(A.filter(x=>x>=0&&x<=k))}; A \\ B = ${setZ(A.filter(x=>x<0||x>k))}.`,.25]])],chk:()=>true};
});
TL10('tl10-2-param',1,'VD','a',[2],r=>{
  const k=r.int(1,4),p=r.int(-4,2),q=p+r.int(2,6),m0=r.int(p-k-2,q+2);
  const inter=ivOp([m0,m0+k,true,true],[p,q,false,false],0);
  return{kind:'tl',title:'Các phép toán trên tập hợp',parts:[
    {pts:.5,html:`Cho hai tập hợp ${I('A')} = [${I('m')}; ${I('m')} + ${k}] và ${I('B')} = (${sg(p)}; ${sg(q)}). Với ${I('m')} = ${sg(m0)}, hãy xác định ${I('A')} ∩ ${I('B')} và ${I('A')} ∪ ${I('B')}.`},
    {pts:.5,html:`Tìm tất cả các giá trị của tham số ${I('m')} để ${I('A')} ∩ ${I('B')} ≠ ∅.`}],
    sol:[ptxt([[`Với m = ${sg(m0)}: A = [${sg(m0)}; ${sg(m0+k)}]; A ∩ B = ${inter}.`,.25],[`A ∪ B = ${ivOp([m0,m0+k,true,true],[p,q,false,false],1)}.`,.25]]),
      ptxt([[`A ∩ B = ∅ ⟺ m + ${k} ≤ ${sg(p)} hoặc m ≥ ${sg(q)} ⟺ m ≤ ${sg(p-k)} hoặc m ≥ ${sg(q)}.`,.25],[`Vậy A ∩ B ≠ ∅ ⟺ ${sg(p-k)} < m < ${sg(q)}.`,.25]])],chk:()=>true};
});
TL10('tl10-3-bpt',2,'TH','b',[3],r=>{
  for(;;){const p=r.nz(-4,4),q=r.nz(-4,4),op=r.pick(['<','≤','>','≥']),a=q,b=p,c=p*q;if(Math.abs(p)<2&&Math.abs(q)<2)continue;
    const P0=[r.int(-3,3),r.int(-3,3)];
    const pr=r.int(20,50)*1000,pq=r.int(10,40)*1000,M=r.int(4,10)*100000;
    return{kind:'tl',title:'Bất phương trình bậc nhất hai ẩn',parts:[
      {pts:.5,html:`Biểu diễn miền nghiệm của bất phương trình ${bptH(a,b,c,op)} trên mặt phẳng toạ độ ${I('Oxy')}. Điểm ${I('M')}(${P0.map(sg).join('; ')}) có thuộc miền nghiệm không?`},
      {pts:.5,html:`Một cửa hàng bán hai loại nước: loại I giá ${pr.toLocaleString('vi-VN')} đồng/chai, loại II giá ${pq.toLocaleString('vi-VN')} đồng/chai. Bạn Lan có không quá ${M.toLocaleString('vi-VN')} đồng. Gọi ${I('x')}, ${I('y')} là số chai loại I, loại II Lan mua. Viết bất phương trình biểu thị điều kiện của ${I('x')}, ${I('y')} và cho biết Lan có thể mua 4 chai loại I và 6 chai loại II không.`}],
      sol:[ptxt([[`Vẽ đường thẳng ${lin3H([a,b],['x','y'])} = ${sg(c)} đi qua (${sg(p)}; 0) và (0; ${sg(q)})${op==='<'||op==='>'?' (nét đứt)':''}; thay O(0; 0): 0 ${op} ${sg(c)} ${sat(a,b,c,op,0,0)?'đúng':'sai'} nên miền nghiệm là nửa mặt phẳng bờ là đường thẳng đó ${sat(a,b,c,op,0,0)?'chứa':'không chứa'} O (gạch bỏ phần còn lại).`,.25],[`Thay M: ${sg(a*P0[0]+b*P0[1])} ${op} ${sg(c)} ${sat(a,b,c,op,...P0)?'đúng nên M thuộc':'sai nên M không thuộc'} miền nghiệm.`,.25]]),
        ptxt([[`${pr/1000}x + ${pq/1000}y ≤ ${M/1000} (nghìn đồng), x, y ∈ ℕ.`,.25],[`Với x = 4, y = 6: ${4*pr/1000+6*pq/1000} ${4*pr+6*pq<=M?'≤':'>'} ${M/1000} nên Lan ${4*pr+6*pq<=M?'có thể':'không thể'} mua.`,.25]])],chk:()=>c!==0}}
});
TL10('tl10-4-real',2,'VD','b',[4],r=>{
  for(;;){const S=lpSys(r),p=r.pick([20,30,40,50]),q=r.pick([30,40,60,70]),vals=S.V.map(([x,y])=>p*x+q*y),M=Math.max(...vals),best=S.V[vals.indexOf(M)];if(vals.filter(v=>v===M).length>1)continue;
    const [a1,b1,c1]=S.I1,[a2,b2,c2]=S.I2;
    return{kind:'tl',title:'Ứng dụng hệ bất phương trình bậc nhất hai ẩn',parts:[
      {pts:.5,html:`Một hộ nông dân dự định trồng đậu và cà. Gọi ${I('x')}, ${I('y')} lần lượt là số sào trồng đậu và cà; các điều kiện về diện tích, nhân công và vốn được biểu thị bởi hệ ${sysH(S)}. Biểu diễn miền nghiệm của hệ và xác định toạ độ các đỉnh.`},
      {pts:.5,html:`Mỗi sào đậu cho lãi ${p} triệu đồng, mỗi sào cà cho lãi ${q} triệu đồng. Hộ nông dân cần trồng bao nhiêu sào mỗi loại để thu được nhiều tiền lãi nhất?`}],
      sol:[ptxt([[`Vẽ các đường thẳng ${ltx(a1,b1)} = ${c1}, ${ltx(a2,b2)} = ${c2}; miền nghiệm là tứ giác.`,.25],[`Các đỉnh: ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}.`,.25]]),
        ptxt([[`Lãi F = ${p}x + ${q}y; tại các đỉnh F lần lượt bằng ${vals.join('; ')}.`,.25],[`F lớn nhất bằng ${M} triệu đồng khi trồng ${best[0]} sào đậu và ${best[1]} sào cà.`,.25]])],chk:()=>true}}
});
N10('k10-3-model',2,'TH',[3],r=>{
  const it=r.pick([['quyển vở','cái bút'],['kg cam','kg táo'],['vé người lớn','vé trẻ em'],['hộp bánh','hộp sữa']]),p=r.int(5,30),q=r.int(5,30),M=r.int(10,40)*10;
  if(p===q)return T.nlc['k10-3-model'].gen(r);
  const cor=`${p}${I('x')} + ${q}${I('y')} ≤ ${M}`,W=[`${p}${I('x')} + ${q}${I('y')} ≥ ${M}`,`${q}${I('x')} + ${p}${I('y')} ≤ ${M}`,`${p}${I('x')} + ${q}${I('y')} < ${M}`,`${I('x')} + ${I('y')} ≤ ${M}`];
  return mkTxt(r,{stem:`Mỗi ${it[0]} giá ${p} nghìn đồng, mỗi ${it[1]} giá ${q} nghìn đồng. Bạn Minh có không quá ${M} nghìn đồng và muốn mua ${I('x')} ${it[0]}, ${I('y')} ${it[1]}. Bất phương trình nào sau đây mô tả điều kiện của ${I('x')}, ${I('y')}?`,correct:cor,wrongs:W,
    sol:`Số tiền phải trả là ${p}x + ${q}y (nghìn đồng), không vượt quá ${M} nên ${p}x + ${q}y ≤ ${M}.`,chk:()=>true});
});
N10('k10-4-vert',2,'TH',[4],r=>{
  const S=lpSys(r),v=r.pick(S.V.slice(1)),bad=[[S.V[1][0],S.V[3][1]],[Math.max(S.I1[2]/S.I1[0],S.I2[2]/S.I2[0]),0],[0,Math.max(S.I1[2]/S.I1[1],S.I2[2]/S.I2[1])],[S.V[2][1],S.V[2][0]],[S.V[2][0]+1,S.V[2][1]]].filter(p=>!S.V.some(q=>q[0]===p[0]&&q[1]===p[1]));
  return mkTxt(r,{stem:`Miền nghiệm của hệ bất phương trình ${sysH(S)} là một tứ giác. Điểm nào sau đây là một đỉnh của tứ giác đó?`,correct:`(${v.join('; ')})`,wrongs:uniqBy(bad.map(p=>`(${p.map(fmt).join('; ')})`),x=>x),
    sol:`Các đỉnh của miền nghiệm là giao điểm của các đường thẳng bờ: ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}.`,chk:()=>true});
});
TLN10('t10-2-card',1,'TH',[2],r=>{
  const n=r.int(3,7),k=r.int(2,9),c=r.int(-3,3),A=[...Array(2*n+1).keys()].map(i=>i-n),B=[...Array(k+1).keys()].map(i=>i+c),ask=r.int(0,1);
  const U=new Set(A.concat(B)),Iv=A.filter(x=>B.includes(x)),v=ask?Iv.length:U.size;
  return{kind:'tln',stem:`Cho hai tập hợp ${I('A')} = {${I('x')} ∈ ${ZZ} | |${I('x')}| ≤ ${n}} và ${I('B')} = {${I('x')} ∈ ${ZZ} | ${sg(c)} ≤ ${I('x')} ≤ ${sg(c+k)}}. Tập hợp ${ask?`${I('A')} ∩ ${I('B')}`:`${I('A')} ∪ ${I('B')}`} có bao nhiêu phần tử?`,ans:v,unit:'',
    sol:`A = {−${n}; ...; ${n}} có ${A.length} phần tử, B = {${sg(c)}; ...; ${sg(c+k)}} có ${B.length} phần tử, A ∩ B có ${Iv.length} phần tử${ask?'':`; n(A ∪ B) = ${A.length} + ${B.length} − ${Iv.length} = ${U.size}`}.`,chk:()=>true};
});
TL10('tl10-4-sys',2,'TH','b',[4],r=>{
  for(;;){const S=lpSys(r),p=r.int(1,5),q=r.int(1,5),vals=S.V.map(([x,y])=>p*x-q*y),m=Math.min(...vals);if(vals.filter(v=>v===m).length>1)continue;const P0=[r.int(0,S.V[1][0]),r.int(0,S.V[3][1])],inn=S.I1[0]*P0[0]+S.I1[1]*P0[1]<=S.I1[2]&&S.I2[0]*P0[0]+S.I2[1]*P0[1]<=S.I2[2];
    return{kind:'tl',title:'Hệ bất phương trình bậc nhất hai ẩn',parts:[
      {pts:.5,html:`Biểu diễn miền nghiệm của hệ bất phương trình ${sysH(S)} trên mặt phẳng toạ độ ${I('Oxy')}. Điểm ${I('M')}(${P0.join('; ')}) có thuộc miền nghiệm của hệ không?`},
      {pts:.5,html:`Tìm giá trị nhỏ nhất của biểu thức ${I('F')} = ${lin3H([p,-q],['x','y'])} trên miền nghiệm của hệ.`}],
      sol:[ptxt([[`Miền nghiệm là tứ giác (phần không bị gạch) với các đỉnh ${S.V.map(([x,y])=>`(${x}; ${y})`).join(', ')}.`,.25],[`Thay M vào các bất phương trình: M ${inn?'thoả mãn tất cả nên thuộc':'không thoả mãn nên không thuộc'} miền nghiệm.`,.25]]),
        ptxt([[`F tại các đỉnh: ${vals.map(sg).join('; ')}.`,.25],[`Giá trị nhỏ nhất của F là ${sg(m)}, đạt tại (${S.V[vals.indexOf(m)].join('; ')}).`,.25]])],chk:()=>true}}
});
TL10('tl10-2-venn',1,'VD','a',[2],r=>{
  const both=r.int(5,15),a=both+r.int(5,15),b=both+r.int(5,15),none=r.int(2,8),tot=a+b-both+none,p=r.int(-3,1),q=p+r.int(3,6),c=r.int(p+1,q-1),d=q+r.int(1,4);
  return{kind:'tl',title:'Tập hợp và ứng dụng',parts:[
    {pts:.5,html:`Lớp 10C có ${tot} học sinh, trong đó có ${a} bạn thích môn Văn, ${b} bạn thích môn Toán và ${none} bạn không thích môn nào trong hai môn đó. Hỏi có bao nhiêu bạn thích cả hai môn? Bao nhiêu bạn chỉ thích môn Toán?`},
    {pts:.5,html:`Cho ${I('A')} = [${sg(p)}; ${sg(q)}), ${I('B')} = (${sg(c)}; ${sg(d)}]. Xác định ${I('C')}<sub>${RR}</sub>(${I('A')} ∩ ${I('B')}) và ${I('C')}<sub>${RR}</sub>(${I('A')} ∪ ${I('B')}).`}],
    sol:[ptxt([[`Số bạn thích ít nhất một môn: ${tot} − ${none} = ${tot-none}; số bạn thích cả hai môn: ${a} + ${b} − ${tot-none} = ${both}.`,.25],[`Chỉ thích môn Toán: ${b} − ${both} = ${b-both}.`,.25]]),
      ptxt([[`A ∩ B = (${sg(c)}; ${sg(q)}) ⇒ C<sub>ℝ</sub>(A ∩ B) = (−∞; ${sg(c)}] ∪ [${sg(q)}; +∞).`,.25],[`A ∪ B = [${sg(p)}; ${sg(d)}] ⇒ C<sub>ℝ</sub>(A ∪ B) = (−∞; ${sg(p)}) ∪ (${sg(d)}; +∞).`,.25]])],chk:()=>ivOp([p,q,true,false],[c,d,false,true],0)===ivH(c,q,[false,false])&&ivOp([p,q,true,false],[c,d,false,true],1)===ivH(p,d,[true,true])};
});
