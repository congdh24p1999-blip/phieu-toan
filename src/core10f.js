/* ================================================================
   LỚP 10 – học kì II
   Chương VIII: Đại số tổ hợp (Bài 23 – 25); Chương IX: Tính xác suất theo định nghĩa cổ điển (Bài 26 – 27)
   ================================================================ */
const fact10=n=>n<=1?1:n*fact10(n-1);
const nA10=(n,k)=>k>n?0:fact10(n)/fact10(n-k),nC10=(n,k)=>k>n||k<0?0:Math.round(fact10(n)/(fact10(k)*fact10(n-k)));
const AH=(n,k)=>`${I('A')}${sup(k)}${sub(n)}`.replace(`${sup(k)}${sub(n)}`,`<span class="ss"><sup>${k}</sup><sub>${n}</sub></span>`),CH=(n,k)=>`${I('C')}<span class="ss"><sup>${k}</sup><sub>${n}</sub></span>`;
/* đếm các số có k chữ số lập từ tập chữ số ds (chữ số đầu khác 0), có thể yêu cầu khác nhau và điều kiện */
function cnt10(ds,k,dist,pred=()=>true){let n=0;const rec=(pre)=>{if(pre.length===k){if(pred(Number(pre.join('')),pre))n++;return}
  for(const d of ds){if(!pre.length&&d===0)continue;if(dist&&pre.includes(d))continue;pre.push(d);rec(pre);pre.pop()}};rec([]);return n}
const digH=ds=>`{${ds.join('; ')}}`;
const pQ=(a,b)=>qh(Q(a,b));
const COND10=[['số chẵn',(n)=>n%2===0],['số lẻ',(n)=>n%2===1],['số chia hết cho 5',(n)=>n%5===0],['số lớn hơn 300',(n)=>n>300]];

/* ===================== Bài 23: Quy tắc đếm ===================== */
N10b('k10-23-rule',8,'NB',[23],r=>{
  const a=r.int(3,9),b=r.int(3,9),c=r.int(2,6),t=r.int(0,2);
  if(t===0)return mkNum(r,{stem:`Bạn Hoa có ${a} chiếc áo sơ mi và ${b} chiếc áo phông. Hoa có bao nhiêu cách chọn một chiếc áo để mặc?`,correct:a+b,cands:[a*b,a,b,a+b+1,2*(a+b)],sol:`Theo quy tắc cộng: ${a} + ${b} = ${a+b} cách.`,chk:()=>true});
  if(t===1)return mkNum(r,{stem:`Bạn Nam có ${a} chiếc áo và ${b} chiếc quần. Nam có bao nhiêu cách chọn một bộ quần áo (gồm một áo và một quần)?`,correct:a*b,cands:[a+b,a*a,b*b,a*b+1,a*b-1],sol:`Theo quy tắc nhân: ${a}·${b} = ${a*b} cách.`,chk:()=>true});
  return mkNum(r,{stem:`Một nhà hàng có ${a} món chính, ${b} món tráng miệng và ${c} loại đồ uống. Thực khách chọn một suất ăn gồm 1 món chính, 1 món tráng miệng và 1 đồ uống. Có bao nhiêu cách chọn?`,correct:a*b*c,cands:[a+b+c,a*b+c,a*b,(a+b)*c],sol:`Theo quy tắc nhân: ${a}·${b}·${c} = ${a*b*c} cách.`,chk:()=>true});
});
N10b('k10-23-road',8,'TH',[23],r=>{
  const m=r.int(2,5),n=r.int(2,5),k=r.int(1,3),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Từ thành phố ${I('A')} đến thành phố ${I('B')} có ${m} con đường, từ ${I('B')} đến ${I('C')} có ${n} con đường; ngoài ra có ${k} con đường đi thẳng từ ${I('A')} đến ${I('C')} không qua ${I('B')}. Có bao nhiêu cách đi từ ${I('A')} đến ${I('C')}?`,correct:m*n+k,cands:[m+n+k,m*n,m*n*k,m+n],
    sol:`Đi qua B: ${m}·${n} = ${m*n} cách (quy tắc nhân); đi thẳng: ${k} cách. Theo quy tắc cộng: ${m*n} + ${k} = ${m*n+k} cách.`,chk:()=>true});
  return mkNum(r,{stem:`Từ ${I('A')} đến ${I('B')} có ${m} con đường, từ ${I('B')} đến ${I('C')} có ${n} con đường. Có bao nhiêu cách đi từ ${I('A')} đến ${I('C')} (qua ${I('B')}) rồi quay về ${I('A')} (qua ${I('B')}) mà không đi lại con đường nào đã đi?`,correct:m*n*(n-1)*(m-1),cands:[(m*n)**2,m*n,2*m*n,m*n*(m+n)],
    sol:`Lượt đi: ${m}·${n} cách; lượt về: ${n-1}·${m-1} cách. Có ${m}·${n}·${n-1}·${m-1} = ${m*n*(n-1)*(m-1)} cách.`,chk:()=>true});
});
N10b('k10-23-num',8,'TH',[23],r=>{
  for(;;){const z=r.chance(.5),ds=srt(distinctInts(r,r.int(4,6),z?0:1,9)),k=r.int(2,3),dist=r.chance(.6),[cn,cf]=r.pick([['',()=>true]].concat(COND10.slice(0,3))),v=cnt10(ds,k,dist,cf);if(!v)continue;
    const n=ds.length,W=[n**k,nA10(n,k),dist?cnt10(ds,k,false,cf):cnt10(ds,k,true,cf),cnt10(ds,k,dist),fact10(k)].filter(x=>x!==v&&x>0);
    return mkNum(r,{stem:`Từ các chữ số ${digH(ds)} có thể lập được bao nhiêu ${cn||'số tự nhiên'} ${cn?'có':'gồm'} ${k} chữ số${dist?' đôi một khác nhau':''}?`.replace('bao nhiêu số chẵn có','bao nhiêu số chẵn có').replace(/bao nhiêu (số [^ ]+[^c]*?)có/,'bao nhiêu $1có'),correct:v,cands:W,
      sol:`Đếm theo quy tắc nhân (chọn lần lượt từng chữ số${cn?`, ưu tiên chữ số chịu điều kiện (${cn})`:''}${z?', chữ số đầu tiên khác 0':''}${dist?', các chữ số khác nhau':''}): có ${v} số.`,chk:()=>true})}
});
TLN10b('t10-23-num',8,'VD',[23],r=>{
  for(;;){const ds=[0,...srt(distinctInts(r,r.int(4,6),1,9))],k=3,[cn,cf]=r.pick(COND10.slice(0,3)),v=cnt10(ds,k,true,cf);if(!v)continue;
    return{kind:'tln',stem:`Từ các chữ số ${digH(ds)} lập được bao nhiêu ${cn} có ${k} chữ số đôi một khác nhau?`,ans:v,unit:'',sol:`Chia trường hợp theo chữ số hàng đơn vị (có hoặc không là chữ số 0) rồi dùng quy tắc nhân, quy tắc cộng: có ${v} số.`,chk:()=>true}}
});
TLN10b('t10-23-rule',8,'TH',[23],r=>{
  const a=r.int(3,8),b=r.int(2,6),c=r.int(2,5);
  return{kind:'tln',stem:`Một lớp có ${a} học sinh giỏi Toán, ${b} học sinh giỏi Văn và ${c} học sinh giỏi Anh (mỗi học sinh chỉ giỏi một môn). Có bao nhiêu cách chọn ra 2 học sinh giỏi hai môn khác nhau?`,ans:a*b+b*c+a*c,unit:'',
    sol:`Toán – Văn: ${a*b}; Văn – Anh: ${b*c}; Toán – Anh: ${a*c}. Tổng: ${a*b+b*c+a*c} cách.`,chk:()=>true};
});
TL10b('tl10-23-num',8,'TH','a',[23,24],r=>{
  for(;;){const ds=[0,...srt(distinctInts(r,r.int(4,5),1,9))],v1=cnt10(ds,3,false),v2=cnt10(ds,3,true),v3=cnt10(ds,3,true,n=>n%2===0);if(!v3)continue;
    return{kind:'tl',title:'Quy tắc đếm',parts:[
      {pts:.5,html:`Từ các chữ số ${digH(ds)} có thể lập được bao nhiêu số tự nhiên có 3 chữ số? Bao nhiêu số tự nhiên có 3 chữ số đôi một khác nhau?`},
      {pts:.5,html:`Từ các chữ số trên, có thể lập được bao nhiêu số chẵn có 3 chữ số đôi một khác nhau?`}],
      sol:[ptxt([[`Chữ số hàng trăm có ${ds.length-1} cách, hàng chục và hàng đơn vị mỗi hàng ${ds.length} cách: ${ds.length-1}·${ds.length}·${ds.length} = ${v1} số.`,.25],[`Các chữ số khác nhau: ${ds.length-1}·${ds.length-1}·${ds.length-2} = ${v2} số.`,.25]]),
        ptxt([[`Trường hợp chữ số hàng đơn vị là 0 và trường hợp chữ số hàng đơn vị chẵn khác 0, đếm riêng bằng quy tắc nhân.`,.25],[`Cộng lại: ${v3} số.`,.25]])],chk:()=>v1===(ds.length-1)*ds.length**2&&v2===(ds.length-1)**2*(ds.length-2)}}
});

/* ===================== Bài 24: Hoán vị, chỉnh hợp và tổ hợp ===================== */
N10b('k10-24-form',8,'NB',[24],r=>{
  const t=r.int(0,2),F={A:`${fr(`${I('n')}!`,`(${I('n')} ${MINUS} ${I('k')})!`)}`,C:`${fr(`${I('n')}!`,`${I('k')}!(${I('n')} ${MINUS} ${I('k')})!`)}`,P:`${I('n')}!`,X:`${fr(`${I('k')}!`,`(${I('n')} ${MINUS} ${I('k')})!`)}`,Y:`${I('n')}(${I('n')} ${MINUS} 1)`};
  const nm=['Số các chỉnh hợp chập k của n phần tử (1 ≤ k ≤ n)','Số các tổ hợp chập k của n phần tử (0 ≤ k ≤ n)','Số các hoán vị của n phần tử (n ≥ 1)'][t],key=['A','C','P'][t],sym=[AH('n','k').replace(/>([nk])</g,'><i>$1</i><'),CH('n','k').replace(/>([nk])</g,'><i>$1</i><'),`${I('P')}${sub(I('n'))}`][t];
  return mkTxt(r,{stem:`${nm.replace(/(^|[ (])([kn])(?=[ )])/g,(m,p,c)=>p+I(c))}, kí hiệu ${sym}, được tính bởi công thức nào sau đây?`,correct:F[key],wrongs:['A','C','P','X','Y'].filter(x=>x!==key).map(x=>F[x]),
    sol:`P${sub('n')} = n!; A${sup('k')}${sub('n')} = ${fr('n!','(n − k)!')}; C${sup('k')}${sub('n')} = ${fr('n!','k!(n − k)!')}.`,chk:()=>true});
});
const CTX24=[['học sinh','ban cán sự lớp gồm lớp trưởng, lớp phó và bí thư'],['vận động viên','ba huy chương vàng, bạc, đồng'],['đội viên','đội trưởng và đội phó']];
N10b('k10-24-AC',8,'NB',[24],r=>{
  const n=r.int(6,15),t=r.int(0,2);
  if(t===0){const k=r.int(4,7);return mkNum(r,{stem:`Có bao nhiêu cách xếp ${k} bạn học sinh thành một hàng dọc?`,correct:fact10(k),cands:[k*k,k,2**k,fact10(k-1),k*(k-1)],sol:`Mỗi cách xếp là một hoán vị của ${k} phần tử: P${sub(k)} = ${k}! = ${fact10(k)}.`,chk:()=>true})}
  if(t===1){const k=r.pick([2,3]),[w,c]=k===3?CTX24[r.int(0,1)]:CTX24[2];return mkNum(r,{stem:`Một nhóm có ${n} ${w}. Có bao nhiêu cách chọn ra ${k} ${w} để trao/giao ${c}?`.replace('trao/giao',k===3&&c.startsWith('ba huy')?'trao':'giữ'),correct:nA10(n,k),cands:[nC10(n,k),n**k,n*k,fact10(k)],
    sol:`Chọn ${k} người và có phân biệt vị trí: mỗi cách là một chỉnh hợp chập ${k} của ${n}: ${AH(n,k)} = ${nA10(n,k)}.`,chk:()=>true})}
  const k=r.int(2,4);return mkNum(r,{stem:`Một lớp có ${n} học sinh. Có bao nhiêu cách chọn ${k} học sinh đi dự đại hội?`,correct:nC10(n,k),cands:[nA10(n,k),n**k,n*k,nC10(n,k-1)],sol:`Chọn ${k} học sinh không phân biệt thứ tự: ${CH(n,k)} = ${nC10(n,k)}.`,chk:()=>true});
});
N10b('k10-24-mix',8,'TH',[24],r=>{
  const m=r.int(4,12),f=r.int(4,12),a=r.int(1,3),b=r.int(1,3),v=nC10(m,a)*nC10(f,b);
  return mkNum(r,{stem:`Một tổ có ${m} học sinh nam và ${f} học sinh nữ. Có bao nhiêu cách chọn ${a+b} học sinh trong đó có ${a} nam và ${b} nữ?`,correct:v,cands:[nC10(m+f,a+b),nC10(m,a)+nC10(f,b),nA10(m,a)*nA10(f,b),m*f],
    sol:`Chọn ${a} nam: ${CH(m,a)} cách; chọn ${b} nữ: ${CH(f,b)} cách. Theo quy tắc nhân: ${nC10(m,a)}·${nC10(f,b)} = ${v}.`,chk:()=>true});
});
N10b('k10-24-geo',8,'TH',[24],r=>{
  const n=r.int(5,15),t=r.int(0,2);
  if(t===0)return mkNum(r,{stem:`Cho ${n} điểm phân biệt, trong đó không có ba điểm nào thẳng hàng. Có bao nhiêu tam giác có ba đỉnh là ba trong ${n} điểm đó?`,correct:nC10(n,3),cands:[nA10(n,3),n*3,nC10(n,2),fact10(3)*n],sol:`Mỗi tam giác ứng với một tổ hợp chập 3 của ${n} điểm: ${CH(n,3)} = ${nC10(n,3)}.`,chk:()=>true});
  if(t===1)return mkNum(r,{stem:`Số đường chéo của một đa giác lồi có ${n} cạnh là`,correct:n*(n-3)/2,cands:[nC10(n,2),n*(n-3),nA10(n,2),n*(n-1)/2-1],sol:`Số đoạn thẳng nối hai đỉnh: ${CH(n,2)} = ${nC10(n,2)}; trừ ${n} cạnh: ${nC10(n,2)} − ${n} = ${n*(n-3)/2} đường chéo.`,chk:()=>true});
  return mkNum(r,{stem:`Cho ${n} điểm phân biệt. Có bao nhiêu vectơ khác vectơ-không có điểm đầu và điểm cuối là hai trong ${n} điểm đó?`,correct:nA10(n,2),cands:[nC10(n,2),n*n,2*n,nA10(n,2)+n],sol:`Mỗi vectơ ứng với một chỉnh hợp chập 2 của ${n} điểm: ${AH(n,2)} = ${nA10(n,2)}.`,chk:()=>true});
});
N10b('k10-24-least',8,'VD',[24],r=>{
  const m=r.int(5,12),f=r.int(3,10),k=r.int(3,4),v=nC10(m+f,k)-nC10(m,k);
  return mkNum(r,{stem:`Một nhóm có ${m} nam và ${f} nữ. Có bao nhiêu cách chọn ${k} người trong đó có ít nhất 1 nữ?`,correct:v,cands:[nC10(m+f,k),nC10(f,1)*nC10(m+f-1,k-1),nC10(m+f,k)-nC10(f,k),nC10(m,k)],
    sol:`Số cách chọn ${k} người bất kì: ${CH(m+f,k)} = ${nC10(m+f,k)}; số cách chọn toàn nam: ${CH(m,k)} = ${nC10(m,k)}. Vậy có ${nC10(m+f,k)} − ${nC10(m,k)} = ${v} cách.`,chk:()=>true});
});
DS10b('ds10-24-count',8,'TH',[23,24],r=>{
  const m=r.int(5,10),f=r.int(4,9),n=m+f;
  return mkDS(r,{stem:`Lớp 10A có ${m} học sinh nam và ${f} học sinh nữ. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Có ${n} cách chọn một học sinh làm lớp trưởng.`,f:`Có ${m*f} cách chọn một học sinh làm lớp trưởng.`,why:`Quy tắc cộng: ${m} + ${f} = ${n}.`},
    {t:`Có ${m*f} cách chọn một nam và một nữ đi trực nhật.`,f:`Có ${n} cách chọn một nam và một nữ đi trực nhật.`,why:`Quy tắc nhân: ${m}·${f} = ${m*f}.`},
    {t:`Có ${nA10(n,3)} cách chọn lớp trưởng, lớp phó và thủ quỹ (không kiêm nhiệm).`,f:`Có ${nC10(n,3)} cách chọn lớp trưởng, lớp phó và thủ quỹ (không kiêm nhiệm).`,why:`Chỉnh hợp chập 3 của ${n}: ${nA10(n,3)}.`},
    {t:`Có ${nC10(n,3)} cách chọn 3 học sinh đi lao động.`,f:`Có ${nA10(n,3)} cách chọn 3 học sinh đi lao động.`,why:`Tổ hợp chập 3 của ${n}: ${nC10(n,3)}.`}],chk:()=>true});
});
TLN10b('t10-24-eq',8,'VD',[24],r=>{
  const n=r.int(5,15),t=r.int(0,1),v=t?nA10(n,2)+nC10(n,2):nC10(n,2);
  return{kind:'tln',stem:`Tìm số tự nhiên ${I('n')} thoả mãn ${t?`${AH('n','2').replace('>n<','><i>n</i><')} + ${CH('n','2').replace('>n<','><i>n</i><')} = ${v}`:`${CH('n','2').replace('>n<','><i>n</i><')} = ${v}`}.`,ans:n,unit:'',
    sol:`${t?`n(n − 1) + ${fr('n(n − 1)',2)} = ${v} ⟺ n(n − 1) = ${2*v/3}`:`${fr('n(n − 1)',2)} = ${v} ⟺ n(n − 1) = ${2*v}`} ⟺ n = ${n} (n ≥ 2).`,chk:()=>true};
});
TLN10b('t10-24-least',8,'VD',[24],r=>{
  const m=r.int(5,10),f=r.int(4,8),k=4,v=nC10(m+f,k)-nC10(m,k)-nC10(f,k);
  return{kind:'tln',stem:`Một đội có ${m} nam và ${f} nữ. Có bao nhiêu cách chọn ${k} người đi thi đấu sao cho có cả nam và nữ?`,ans:v,unit:'',sol:`${CH(m+f,k)} − ${CH(m,k)} − ${CH(f,k)} = ${nC10(m+f,k)} − ${nC10(m,k)} − ${nC10(f,k)} = ${v}.`,chk:()=>true};
});
TLN10b('t10-24-geo',8,'TH',[24],r=>{
  const n=r.int(6,20);
  return{kind:'tln',stem:`Một đa giác lồi có ${n} cạnh. Hỏi đa giác đó có bao nhiêu đường chéo?`,ans:n*(n-3)/2,unit:'',sol:`${CH(n,2)} − ${n} = ${nC10(n,2)} − ${n} = ${n*(n-3)/2}.`,chk:()=>true};
});
TL10b('tl10-24-team',8,'VD','a',[24],r=>{
  const m=r.int(6,12),f=r.int(4,10),k=r.int(4,5);
  return{kind:'tl',title:'Hoán vị, chỉnh hợp và tổ hợp',parts:[
    {pts:.5,html:`Một câu lạc bộ có ${m} nam và ${f} nữ. Có bao nhiêu cách chọn ra ${k} người đi biểu diễn? Có bao nhiêu cách chọn một chủ nhiệm và một phó chủ nhiệm?`},
    {pts:.5,html:`Có bao nhiêu cách chọn ${k} người trong đó có đúng 2 nữ? Có bao nhiêu cách chọn ${k} người trong đó có ít nhất 1 nữ?`}],
    sol:[ptxt([[`Chọn ${k} người: ${CH(m+f,k)} = ${nC10(m+f,k)} cách.`,.25],[`Chủ nhiệm và phó chủ nhiệm: ${AH(m+f,2)} = ${nA10(m+f,2)} cách.`,.25]]),
      ptxt([[`Đúng 2 nữ: ${CH(f,2)}·${CH(m,k-2)} = ${nC10(f,2)*nC10(m,k-2)} cách.`,.25],[`Ít nhất 1 nữ: ${nC10(m+f,k)} − ${CH(m,k)} = ${nC10(m+f,k)-nC10(m,k)} cách.`,.25]])],chk:()=>true};
});
TL10b('tl10-24-num',8,'VD','a',[23,24],r=>{
  for(;;){const ds=[0,...srt(distinctInts(r,5,1,9))],v1=cnt10(ds,4,true),v2=cnt10(ds,4,true,n=>n%5===0),v3=cnt10(ds,3,true,n=>n%2===1);if(!v2||!v3)continue;
    return{kind:'tl',title:'Đếm các số tự nhiên',parts:[
      {pts:.5,html:`Từ các chữ số ${digH(ds)} lập được bao nhiêu số tự nhiên có 4 chữ số đôi một khác nhau? Trong đó có bao nhiêu số chia hết cho 5?`},
      {pts:.5,html:`Từ các chữ số trên lập được bao nhiêu số lẻ có 3 chữ số đôi một khác nhau?`}],
      sol:[ptxt([[`Chữ số đầu có ${ds.length-1} cách, ba chữ số còn lại là một chỉnh hợp chập 3 của ${ds.length-1} chữ số còn lại: ${ds.length-1}·${AH(ds.length-1,3)} = ${v1} số.`,.25],[`Chia hết cho 5 (tận cùng 0 hoặc 5): ${v2} số.`,.25]]),
        ptxt([[`Chọn chữ số hàng đơn vị lẻ trước, rồi chữ số hàng trăm (khác 0 và khác chữ số đã chọn), cuối cùng là hàng chục.`,.25],[`Có ${v3} số.`,.25]])],chk:()=>v1===(ds.length-1)*nA10(ds.length-1,3)}}
});

/* ===================== Bài 25: Nhị thức Newton ===================== */
const binTerm=(a,b,n)=>[...Array(n+1).keys()].map(k=>nC10(n,k)*a**k*b**(n-k));/* hệ số của x^k trong (ax + b)^n */
const linBin=(a,b)=>`(${xlin(a,b)})`;
N10b('k10-25-coef',8,'TH',[25],r=>{
  const n=r.pick([4,5]),a=r.nz(-3,3),b=r.nz(-3,3),k=r.int(2,n-1),C=binTerm(a,b,n),v=C[k];
  return mkNum(r,{stem:`Hệ số của ${I('x')}${sup(k)} trong khai triển ${linBin(a,b)}${sup(n)} là`,correct:v,ok:()=>true,cands:[nC10(n,k),C[n-k],-v,nC10(n,k)*a*b,C[k]/(a**k)].filter(Number.isInteger),
    sol:`Số hạng chứa x${sup(k)}: ${CH(n,k)}(${sg(a)}x)${sup(k)}(${sg(b)})${sup(n-k)} nên hệ số là ${nC10(n,k)}·${pp10('·'+sg(a)).slice(1)}${sup(k)}·${pp10('·'+sg(b)).slice(1)}${sup(n-k)} = ${sg(v)}.`,chk:()=>true});
});
N10b('k10-25-exp',8,'NB',[25],r=>{
  const n=r.pick([4,5]),b=r.pick([1,-1,2]),C=binTerm(1,b,n),H=cs=>polyH(cs.slice().reverse());
  const cor=H(C),W=[H(binTerm(1,-b,n)),H(C.map((c,i)=>i===n||i===0?c:c+1)),H(C.map((c,i)=>i%2?-c:c).map((c,i)=>b>0?c:Math.abs(c))),H([...Array(n+1).keys()].map(k=>b**(n-k)))];
  return mkTxt(r,{stem:`Khai triển ${linBin(1,b)}${sup(n)} ta được`,correct:cor,wrongs:uniqBy(W,x=>x).filter(x=>x!==cor).concat([H(C.map((c,i)=>i===1?c+1:c))]),
    sol:`Theo công thức nhị thức Newton với n = ${n}: ${cor}.`,chk:()=>true});
});
N10b('k10-25-sum',8,'TH',[25],r=>{
  const n=r.pick([4,5]),a=r.nz(-3,3),b=r.nz(-3,3),v=(a+b)**n;if(a+b===0)return T.nlc['k10-25-sum'].gen(r);
  return mkNum(r,{stem:`Tổng các hệ số trong khai triển ${linBin(a,b)}${sup(n)} thành đa thức bằng`,correct:v,ok:()=>true,cands:[2**n,(a-b)**n,-v,a**n+b**n,(Math.abs(a)+Math.abs(b))**n].filter(x=>x!==v),
    sol:`Tổng các hệ số bằng giá trị đa thức tại x = 1: (${sg(a)} + ${pp10('+ '+sg(b)).slice(2)})${sup(n)} = ${sg(v)}.`,chk:()=>true});
});
N10b('k10-25-const',8,'VD',[25],r=>{
  const c=r.nz(-3,3),t=r.int(0,1);
  if(t===0){const v=nC10(4,2)*c*c;return mkNum(r,{stem:`Số hạng không chứa ${I('x')} trong khai triển (${I('x')} ${c<0?MINUS:'+'} ${fr(Math.abs(c),I('x'))})${sup(4)} (${I('x')} ≠ 0) là`,correct:v,ok:()=>true,cands:[nC10(4,2)*Math.abs(c),c*c,4*c*c,nC10(4,1)*c].filter(x=>x!==v),
    sol:`Số hạng tổng quát ${CH(4,'k')}x${sup('4 − k')}(${sg(c)}/x)${sup('k')} = ${CH(4,'k')}(${sg(c)})${sup('k')}x${sup('4 − 2k')}; không chứa x khi k = 2: ${CH(4,2)}·${c*c} = ${v}.`,chk:()=>true})}
  const v=nC10(4,2)*c*c;/* hệ số x² trong (x² + c/x)^4: x^{8 − 3k}, k = 2 */
  return mkNum(r,{stem:`Hệ số của ${I('x')}${sup(2)} trong khai triển (${I('x')}${sup(2)} ${c<0?MINUS:'+'} ${fr(Math.abs(c),I('x'))})${sup(4)} (${I('x')} ≠ 0) là`,correct:v,ok:()=>true,cands:[nC10(4,1)*c,nC10(4,3)*c**3,c*c,6*Math.abs(c)].filter(x=>x!==v),
    sol:`Số hạng tổng quát ${CH(4,'k')}(x²)${sup('4 − k')}(${sg(c)}/x)${sup('k')} = ${CH(4,'k')}(${sg(c)})${sup('k')}x${sup('8 − 3k')}; 8 − 3k = 2 ⟺ k = 2: hệ số ${CH(4,2)}·${c*c} = ${v}.`,chk:()=>true});
});
DS10b('ds10-25-newton',8,'TH',[25],r=>{
  const n=r.pick([4,5]),a=r.pick([1,2,3]),b=r.nz(-3,3),C=binTerm(a,b,n),k=r.int(1,n-1);
  return mkDS(r,{stem:`Cho khai triển ${linBin(a,b)}${sup(n)} = ${I('a')}${sub(0)} + ${I('a')}${sub(1)}${I('x')} + ... + ${I('a')}${sub(n)}${I('x')}${sup(n)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Khai triển có ${n+1} số hạng.`,f:`Khai triển có ${n} số hạng.`,why:`Khai triển (a + b)${sup(n)} có n + 1 = ${n+1} số hạng.`},
    {t:`${I('a')}${sub(0)} = ${sg(C[0])}.`,f:`${I('a')}${sub(0)} = ${sg(C[0]===b?b+1:b)}.`,why:`a₀ = (${sg(b)})${sup(n)} = ${sg(C[0])}.`},
    {t:`${I('a')}${sub(k)} = ${sg(C[k])}.`,f:`${I('a')}${sub(k)} = ${sg(nC10(n,k)===C[k]?C[k]+1:nC10(n,k))}.`,why:`a${sub(k)} = ${CH(n,k)}·${a}${sup(k)}·(${sg(b)})${sup(n-k)} = ${sg(C[k])}.`},
    {t:`${I('a')}${sub(0)} + ${I('a')}${sub(1)} + ... + ${I('a')}${sub(n)} = ${sg((a+b)**n)}.`,f:`${I('a')}${sub(0)} + ${I('a')}${sub(1)} + ... + ${I('a')}${sub(n)} = ${sg((a+b)**n===2**n?2**n+1:2**n)}.`,why:`Thay x = 1: (${a} ${b<0?MINUS:'+'} ${Math.abs(b)})${sup(n)} = ${sg((a+b)**n)}.`}],chk:()=>true});
});
TLN10b('t10-25-coef',8,'TH',[25],r=>{
  const n=r.pick([4,5]),a=r.nz(-3,3),b=r.nz(-3,3),k=r.int(2,n-1),v=binTerm(a,b,n)[k];
  return{kind:'tln',stem:`Tìm hệ số của ${I('x')}${sup(k)} trong khai triển ${linBin(a,b)}${sup(n)}.`,ans:v,unit:'',sol:`${CH(n,k)}·(${sg(a)})${sup(k)}·(${sg(b)})${sup(n-k)} = ${sg(v)}.`,chk:()=>true};
});
TLN10b('t10-25-const',8,'VD',[25],r=>{
  const c=r.nz(-4,4),v=nC10(4,2)*c*c;
  return{kind:'tln',stem:`Tìm số hạng không chứa ${I('x')} trong khai triển (${I('x')} ${c<0?MINUS:'+'} ${fr(Math.abs(c),I('x'))})${sup(4)} với ${I('x')} ≠ 0.`,ans:v,unit:'',sol:`Số hạng không chứa x ứng với k = 2: ${CH(4,2)}·(${sg(c)})² = ${v}.`,chk:()=>true};
});
TL10b('tl10-25-newton',8,'TH','a',[25],r=>{
  const n=r.pick([4,5]),b=r.nz(-3,3),C=binTerm(1,b,n),a=r.pick([2,3]),k=r.int(1,n-1),C2=binTerm(a,-1,n);
  return{kind:'tl',title:'Nhị thức Newton',parts:[
    {pts:.5,html:`Khai triển biểu thức ${linBin(1,b)}${sup(n)}.`},
    {pts:.5,html:`Tìm hệ số của ${I('x')}${sup(k)} trong khai triển ${linBin(a,-1)}${sup(n)} và tính tổng các hệ số của khai triển đó.`}],
    sol:[ptxt([[`Áp dụng công thức nhị thức Newton với n = ${n}.`,.25],[`${linBin(1,b)}${sup(n)} = ${polyH(C.slice().reverse())}.`,.25]]),
      ptxt([[`Hệ số của x${sup(k)}: ${CH(n,k)}·${a}${sup(k)}·(−1)${sup(n-k)} = ${sg(C2[k])}.`,.25],[`Tổng các hệ số: (${a} − 1)${sup(n)} = ${(a-1)**n}.`,.25]])],chk:()=>true};
});

/* ===================== Bài 26 – 27: Xác suất theo định nghĩa cổ điển ===================== */
N10b('k10-26-space',9,'NB',[26],r=>{
  const t=r.int(0,3);
  const L=[[`Gieo một con xúc xắc cân đối hai lần liên tiếp`,36,[12,6,30,18]],[`Tung một đồng xu cân đối ${3} lần liên tiếp`,8,[6,3,9,4]],[`Tung đồng thời một đồng xu và một con xúc xắc`,12,[8,6,2,36]],(()=>{const n=r.int(6,15);return[`Chọn ngẫu nhiên 2 học sinh từ một nhóm ${n} học sinh`,nC10(n,2),[nA10(n,2),2*n,n*n,n]]})()][t];
  return mkNum(r,{stem:`${L[0]}. Số phần tử của không gian mẫu là`,correct:L[1],cands:L[2],sol:`Đếm bằng quy tắc nhân hoặc tổ hợp: n(Ω) = ${L[1]}.`,chk:()=>true});
});
N10b('k10-26-comp',9,'NB',[26],r=>{
  const t=r.int(0,1);
  if(t){const p=Q(r.int(1,9),r.pick([10,12,15,20]));return mkF(r,{stem:`Cho biến cố ${I('A')} có ${I('P')}(${I('A')}) = ${qh(p)}. Xác suất của biến cố đối ${'<span class="ol"><i>A</i></span>'} là`,correct:qsub(Q(1),p),cands:[p,Q(p[1],p[0]),qadd(Q(1),p),Q(1,2)],sol:`P(Ā) = 1 − P(A) = ${qh(qsub(Q(1),p))}.`,chk:()=>true})}
  const ev=r.pick([['số chấm là số chẵn','số chấm là số lẻ',['số chấm là số nguyên tố','số chấm nhỏ hơn 3','số chấm chia hết cho 3']],['số chấm lớn hơn 4','số chấm không vượt quá 4',['số chấm nhỏ hơn 4','số chấm bằng 4','số chấm lớn hơn hoặc bằng 4']],['xuất hiện mặt 6 chấm','không xuất hiện mặt 6 chấm',['xuất hiện mặt 1 chấm','số chấm nhỏ hơn 6 hoặc bằng 6','số chấm là số chẵn']]]);
  return mkTxt(r,{stem:`Gieo một con xúc xắc cân đối. Gọi ${I('A')} là biến cố "${ev[0]}". Biến cố đối của ${I('A')} là`,correct:`"${ev[1]}"`,wrongs:ev[2].map(x=>`"${x}"`),sol:`Biến cố đối Ā xảy ra khi và chỉ khi A không xảy ra: "${ev[1]}".`,chk:()=>true});
});
/* hai con xúc xắc: các biến cố đếm bằng máy */
const DICE2=[['tổng số chấm bằng ',(a,b,s)=>a+b===s,[4,12]],['tổng số chấm lớn hơn ',(a,b,s)=>a+b>s,[6,10]],['tích số chấm là số chẵn',(a,b)=>a*b%2===0],['hai mặt có số chấm bằng nhau',(a,b)=>a===b],['có ít nhất một mặt ',(a,b,s)=>a===s||b===s,[1,6],' chấm'],['hiệu số chấm (lớn trừ nhỏ) bằng ',(a,b,s)=>Math.abs(a-b)===s,[1,4]]];
const dice2=r=>{const D=r.pick(DICE2),s=D[2]?r.int(D[2][0],D[2][1]):0;let n=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(D[1](a,b,s))n++;return{txt:D[0]+(D[2]?s:'')+(D[3]||''),n}};
N10b('k10-27-dice',9,'TH',[26,27],r=>{
  const E=dice2(r),p=Q(E.n,36);
  return mkF(r,{stem:`Gieo một con xúc xắc cân đối và đồng chất hai lần liên tiếp. Xác suất của biến cố "${E.txt}" là`,correct:p,cands:[Q(E.n,6),Q(E.n+1,36),Q(E.n-1,36),qsub(Q(1),p),Q(E.n,12)].filter(x=>x[0]>0&&x[0]<x[1]),
    sol:`n(Ω) = 36. Liệt kê các kết quả thuận lợi: n(A) = ${E.n}. P(A) = ${fr(E.n,36)} = ${qh(p)}.`,chk:()=>E.n>0&&E.n<36});
});
N10b('k10-27-coin',9,'TH',[26,27],r=>{
  const n=r.int(3,4),k=r.int(1,n-1),least=r.chance(.5);let c=0;for(let m=0;m<2**n;m++){const h=m.toString(2).split('').filter(x=>x==='1').length;if(least?h>=k:h===k)c++}
  const p=Q(c,2**n);
  return mkF(r,{stem:`Tung một đồng xu cân đối ${n} lần liên tiếp. Xác suất để ${least?'có ít nhất':'có đúng'} ${k} lần xuất hiện mặt ngửa là`,correct:p,cands:[Q(k,n),Q(nC10(n,k),2**n),qsub(Q(1),p),Q(1,2),Q(c,n*2),Q(c+1,2**n),Q(c-1,2**n),Q(c+2,2**n)].filter(x=>x[0]>0&&x[0]<x[1]),
    sol:`n(Ω) = 2${sup(n)} = ${2**n}; số kết quả thuận lợi: ${least?[...Array(n-k+1).keys()].map(i=>CH(n,k+i)).join(' + '):CH(n,k)} = ${c}. P = ${fr(c,2**n)} = ${qh(p)}.`,chk:()=>true});
});
N10b('k10-27-balls',9,'TH',[27],r=>{
  const a=r.int(3,8),b=r.int(3,8),k=r.int(2,3),i=r.int(1,k),N=nC10(a+b,k),F=nC10(a,i)*nC10(b,k-i),p=Q(F,N);
  return mkF(r,{stem:`Một hộp có ${a} viên bi đỏ và ${b} viên bi xanh có cùng kích thước. Lấy ngẫu nhiên đồng thời ${k} viên bi. Xác suất để lấy được đúng ${i} viên bi đỏ là`,correct:p,cands:[Q(nC10(a,i),N),Q(a,a+b),Q(F,nA10(a+b,k)),qsub(Q(1),p),Q(nC10(a,i)+nC10(b,k-i),N)].filter(x=>x[0]>0&&x[0]<x[1]),
    sol:`n(Ω) = ${CH(a+b,k)} = ${N}; n(A) = ${CH(a,i)}${k-i?'·'+CH(b,k-i):''} = ${F}. P(A) = ${fr(F,N)} = ${qh(p)}.`,chk:()=>F>0&&F<N});
});
N10b('k10-27-least',9,'VD',[27],r=>{
  const a=r.int(3,8),b=r.int(3,8),k=r.int(2,4),N=nC10(a+b,k),p=qsub(Q(1),Q(nC10(b,k),N));
  return mkF(r,{stem:`Một nhóm có ${a} học sinh nữ và ${b} học sinh nam. Chọn ngẫu nhiên ${k} học sinh. Xác suất để trong ${k} học sinh được chọn có ít nhất một học sinh nữ là`,correct:p,cands:[Q(nC10(b,k),N),Q(a*nC10(a+b-1,k-1),N),Q(nC10(a,k),N),qsub(Q(1),Q(nC10(a,k),N))].filter(x=>x[0]>0&&x[0]<x[1]),
    sol:`Biến cố đối: "không có học sinh nữ", có ${CH(b,k)} = ${nC10(b,k)} kết quả. P = 1 − ${fr(nC10(b,k),N)} = ${qh(p)}.`,chk:()=>true});
});
N10b('k10-27-seat',9,'VD',[27],r=>{
  const n=r.int(4,8),t=r.int(0,1),p=t?Q(2,n*(n-1)):Q(2,n);
  return mkF(r,{stem:`Xếp ngẫu nhiên ${n} bạn, trong đó có An và Bình, thành một hàng ngang. Xác suất để ${t?'An và Bình đứng ở hai đầu hàng':'An và Bình đứng cạnh nhau'} là`,correct:p,cands:[Q(1,n),Q(1,n-1),Q(2,n-1),Q(1,n*(n-1)),Q(n-1,fact10(n))].filter(x=>x[0]<x[1]&&!(x[0]===p[0]&&x[1]===p[1])),
    sol:t?`n(Ω) = ${n}!; An, Bình ở hai đầu: 2 cách, ${n-2} bạn còn lại: ${n-2}! cách. P = ${fr(`2·${n-2}!`,`${n}!`)} = ${qh(p)}.`:`n(Ω) = ${n}!; coi An, Bình là một khối: ${n-1}! cách, đổi chỗ trong khối: 2 cách. P = ${fr(`2·${n-1}!`,`${n}!`)} = ${qh(p)}.`,chk:()=>true});
});
N10b('k10-27-card',9,'TH',[26,27],r=>{
  const N=r.pick([20,25,30,40,50]),k=r.pick([2,3,4,5,6,7]),c=Math.floor(N/k),t=r.chance(.5),cnt=t?c:N-c,p=Q(cnt,N);
  return mkF(r,{stem:`Một hộp có ${N} tấm thẻ được đánh số từ 1 đến ${N}. Rút ngẫu nhiên một tấm thẻ. Xác suất để số ghi trên thẻ ${t?'':'không '}chia hết cho ${k} là`,correct:p,cands:[Q(N-cnt,N),Q(1,k),Q(cnt,N-1),Q(k-1,k)].filter(x=>x[0]>0&&x[0]<x[1]),
    sol:`n(Ω) = ${N}; có ${c} số chia hết cho ${k} từ 1 đến ${N}${t?'':`, nên có ${N-c} số không chia hết cho ${k}`}. P = ${fr(cnt,N)} = ${qh(p)}.`,chk:()=>true});
});
DS10b('ds10-27-balls',9,'VD',[27],r=>{
  const a=r.int(3,7),b=r.int(3,7),N=nC10(a+b,2),pr=Q(nC10(a,2),N),pb=Q(nC10(b,2),N),pd=Q(a*b,N);
  return mkDS(r,{stem:`Một hộp có ${a} viên bi đỏ và ${b} viên bi xanh. Lấy ngẫu nhiên đồng thời 2 viên bi. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số phần tử của không gian mẫu là ${N}.`,f:`Số phần tử của không gian mẫu là ${nA10(a+b,2)}.`,why:`n(Ω) = ${CH(a+b,2)} = ${N}.`},
    {t:`Xác suất lấy được 2 viên bi đỏ là ${qh(pr)}.`,f:`Xác suất lấy được 2 viên bi đỏ là ${qh(Q(a,a+b))===qh(pr)?qh(Q(a+1,a+b)):qh(Q(a,a+b))}.`,why:`P = ${fr(nC10(a,2),N)} = ${qh(pr)}.`},
    {t:`Xác suất lấy được 2 viên bi khác màu là ${qh(pd)}.`,f:`Xác suất lấy được 2 viên bi khác màu là ${qh(Q(a+b,N))===qh(pd)?qh(Q(a*b+1,N)):qh(Q(a+b,N))}.`,why:`n(A) = ${a}·${b} = ${a*b}; P = ${qh(pd)}.`},
    {t:`Xác suất lấy được 2 viên bi cùng màu là ${qh(qadd(pr,pb))}.`,f:`Xác suất lấy được 2 viên bi cùng màu là ${qh(pr)===qh(qadd(pr,pb))?qh(pb):qh(pr)}.`,why:`P = ${qh(pr)} + ${qh(pb)} = ${qh(qadd(pr,pb))} (hoặc 1 − P(khác màu)).`}],chk:()=>true});
});
DS10b('ds10-27-dice',9,'TH',[26,27],r=>{
  const s=r.int(5,9);let n1=0,n2=0,n3=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){if(a+b===s)n1++;if(a===b)n2++;if(a*b%2===0)n3++}
  return mkDS(r,{stem:`Gieo một con xúc xắc cân đối và đồng chất hai lần liên tiếp. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Không gian mẫu có 36 phần tử.`,f:`Không gian mẫu có 12 phần tử.`,why:`n(Ω) = 6·6 = 36.`},
    {t:`Xác suất để tổng số chấm bằng ${s} là ${qh(Q(n1,36))}.`,f:`Xác suất để tổng số chấm bằng ${s} là ${qh(Q(n1+1,36))}.`,why:`Có ${n1} kết quả có tổng bằng ${s}.`},
    {t:`Xác suất để hai lần gieo có số chấm bằng nhau là ${qh(Q(n2,36))}.`,f:`Xác suất để hai lần gieo có số chấm bằng nhau là ${qh(Q(1,36))}.`,why:`Có 6 kết quả (1; 1), ..., (6; 6).`},
    {t:`Xác suất để tích số chấm là số chẵn là ${qh(Q(n3,36))}.`,f:`Xác suất để tích số chấm là số chẵn là ${qh(Q(1,2))}.`,why:`Biến cố đối "cả hai lần đều lẻ" có 9 kết quả: P = 1 − ${fr(9,36)} = ${qh(Q(n3,36))}.`}],chk:()=>true});
});
TLN10b('t10-27-balls',9,'VD',[27],r=>{
  for(;;){const a=r.int(3,9),b=r.int(3,9),k=3,i=r.int(1,2),v=nC10(a,i)*nC10(b,k-i)/nC10(a+b,k),ans=Math.round(v*100)/100;if(Math.abs(v*100-Math.round(v*100))>.49)continue;
    return{kind:'tln',stem:`Một hộp có ${a} quả cầu trắng và ${b} quả cầu đen. Lấy ngẫu nhiên đồng thời 3 quả cầu. Tính xác suất để lấy được đúng ${i} quả cầu trắng (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',
      sol:`P = ${fr(`${CH(a,i)}·${CH(b,k-i)}`,CH(a+b,k))} = ${fr(nC10(a,i)*nC10(b,k-i),nC10(a+b,k))} ≈ ${fmt(ans)}.`,chk:()=>true}}
});
TLN10b('t10-27-dice',9,'TH',[26,27],r=>{
  for(;;){const E=dice2(r),v=E.n/36,ans=Math.round(v*100)/100;if(E.n===0||Math.abs(v*100-Math.round(v*100))>.49)continue;
    return{kind:'tln',stem:`Gieo một con xúc xắc cân đối và đồng chất hai lần liên tiếp. Tính xác suất của biến cố "${E.txt}" (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',sol:`n(Ω) = 36, n(A) = ${E.n}; P = ${fr(E.n,36)} ≈ ${fmt(ans)}.`,chk:()=>true}}
});
TLN10b('t10-27-least',9,'VD',[27],r=>{
  for(;;){const a=r.int(3,8),b=r.int(4,9),k=r.int(2,3),v=1-nC10(b,k)/nC10(a+b,k),ans=Math.round(v*100)/100;if(Math.abs(v*100-Math.round(v*100))>.49)continue;
    return{kind:'tln',stem:`Một đội văn nghệ có ${a} bạn nữ và ${b} bạn nam. Chọn ngẫu nhiên ${k} bạn. Tính xác suất để có ít nhất một bạn nữ (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',sol:`P = 1 − ${fr(CH(b,k),CH(a+b,k))} = 1 − ${fr(nC10(b,k),nC10(a+b,k))} ≈ ${fmt(ans)}.`,chk:()=>true}}
});
TL10b('tl10-26-dice',9,'TH','c',[26,27],r=>{
  const s=r.int(5,9);let n1=0,n2=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++){if(a+b===s)n1++;if(a+b>=10)n2++}
  return{kind:'tl',title:'Xác suất của biến cố',parts:[
    {pts:.5,html:`Gieo một con xúc xắc cân đối và đồng chất hai lần liên tiếp. Mô tả không gian mẫu và tính số phần tử của nó. Tính xác suất của biến cố ${I('A')}: "Tổng số chấm hai lần gieo bằng ${s}".`},
    {pts:.5,html:`Tính xác suất của biến cố ${I('B')}: "Tổng số chấm hai lần gieo không nhỏ hơn 10" và biến cố đối của ${I('B')}.`}],
    sol:[ptxt([[`Ω = {(i; j) | 1 ≤ i, j ≤ 6}, n(Ω) = 36.`,.25],[`n(A) = ${n1}; P(A) = ${fr(n1,36)} = ${qh(Q(n1,36))}.`,.25]]),ptxt([[`B = {(4; 6), (5; 5), (6; 4), (5; 6), (6; 5), (6; 6)}, n(B) = ${n2}; P(B) = ${qh(Q(n2,36))}.`,.25],[`P(${'<span class="ol"><i>B</i></span>'}) = 1 − ${qh(Q(n2,36))} = ${qh(Q(36-n2,36))}.`,.25]])],chk:()=>n2===6};
});
TL10b('tl10-27-balls',9,'VD','c',[27],r=>{
  const a=r.int(4,8),b=r.int(3,7),c=r.int(2,5),N=nC10(a+b+c,3),p1=Q(a*b*c,N),p2=qsub(Q(1),Q(nC10(b+c,3),N));
  return{kind:'tl',title:'Tính xác suất theo định nghĩa cổ điển',parts:[
    {pts:.5,html:`Một hộp có ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng có cùng kích thước. Lấy ngẫu nhiên đồng thời 3 viên bi. Tính xác suất để 3 viên bi lấy ra có đủ ba màu.`},
    {pts:.5,html:`Tính xác suất để trong 3 viên bi lấy ra có ít nhất một viên bi đỏ.`}],
    sol:[ptxt([[`n(Ω) = ${CH(a+b+c,3)} = ${N}; số cách lấy đủ ba màu: ${a}·${b}·${c} = ${a*b*c}.`,.25],[`P = ${fr(a*b*c,N)} = ${qh(p1)}.`,.25]]),ptxt([[`Biến cố đối "không có bi đỏ": ${CH(b+c,3)} = ${nC10(b+c,3)} cách.`,.25],[`P = 1 − ${fr(nC10(b+c,3),N)} = ${qh(p2)}.`,.25]])],chk:()=>true};
});
TL10b('tl10-27-team',9,'VD','c',[27],r=>{
  const m=r.int(5,10),f=r.int(4,8),k=4,N=nC10(m+f,k),p1=Q(nC10(m,2)*nC10(f,2),N),p2=Q(N-nC10(m,k)-nC10(f,k),N);
  return{kind:'tl',title:'Xác suất trong thực tế',parts:[
    {pts:.5,html:`Một lớp có ${m} học sinh nam và ${f} học sinh nữ. Giáo viên chọn ngẫu nhiên ${k} học sinh tham gia đội tình nguyện. Tính xác suất để đội có 2 nam và 2 nữ.`},
    {pts:.5,html:`Tính xác suất để đội có cả học sinh nam và học sinh nữ.`}],
    sol:[ptxt([[`n(Ω) = ${CH(m+f,k)} = ${N}; n(A) = ${CH(m,2)}·${CH(f,2)} = ${nC10(m,2)*nC10(f,2)}.`,.25],[`P(A) = ${qh(p1)}.`,.25]]),ptxt([[`Số cách chọn toàn nam hoặc toàn nữ: ${nC10(m,k)} + ${nC10(f,k)}.`,.25],[`P = ${fr(N-nC10(m,k)-nC10(f,k),N)} = ${qh(p2)}.`,.25]])],chk:()=>true};
});
DS10b('ds10-27-card',9,'TH',[26,27],r=>{
  const N=r.pick([20,24,30,36,40]),k=r.pick([3,4,5]),c=Math.floor(N/k),e=Math.floor(N/2),both=Math.floor(N/(k%2?2*k:k));
  return mkDS(r,{stem:`Một hộp có ${N} tấm thẻ được đánh số từ 1 đến ${N}. Rút ngẫu nhiên một tấm thẻ. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Không gian mẫu có ${N} phần tử.`,f:`Không gian mẫu có ${N-1} phần tử.`,why:`n(Ω) = ${N}.`},
    {t:`Xác suất rút được thẻ ghi số chẵn bằng ${qh(Q(e,N))}.`,f:`Xác suất rút được thẻ ghi số chẵn bằng ${qh(Q(e+1,N))}.`,why:`Có ${e} số chẵn.`},
    {t:`Xác suất rút được thẻ ghi số chia hết cho ${k} bằng ${qh(Q(c,N))}.`,f:`Xác suất rút được thẻ ghi số chia hết cho ${k} bằng ${qh(Q(c+1,N))}.`,why:`Có ${c} số chia hết cho ${k}.`},
    {t:`Xác suất rút được thẻ ghi số chẵn và chia hết cho ${k} bằng ${qh(Q(both,N))}.`,f:`Xác suất rút được thẻ ghi số chẵn và chia hết cho ${k} bằng ${qh(Q(c,2*N))===qh(Q(both,N))?qh(Q(both+1,N)):qh(Q(c,2*N))}.`,why:`Số chẵn chia hết cho ${k} là bội của ${k%2?2*k:k}: có ${both} số.`}],chk:()=>both>0});
});
DS10b('ds10-27-team',9,'VD',[27],r=>{
  const m=r.int(4,9),f=r.int(4,8),k=3,N=nC10(m+f,k),p0=Q(nC10(m,k),N),p1=Q(nC10(f,1)*nC10(m,2),N),p3=Q(nC10(f,3),N);
  return mkDS(r,{stem:`Một tổ có ${m} học sinh nam và ${f} học sinh nữ. Chọn ngẫu nhiên ${k} học sinh. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Số phần tử của không gian mẫu là ${N}.`,f:`Số phần tử của không gian mẫu là ${nA10(m+f,k)}.`,why:`n(Ω) = ${CH(m+f,k)} = ${N}.`},
    {t:`Xác suất chọn được 3 học sinh nữ là ${qh(p3)}.`,f:`Xác suất chọn được 3 học sinh nữ là ${qh(Q(f,m+f))===qh(p3)?qh(Q(f+1,m+f)):qh(Q(f,m+f))}.`,why:`P = ${fr(CH(f,3),CH(m+f,3))} = ${qh(p3)}.`},
    {t:`Xác suất chọn được đúng 1 học sinh nữ là ${qh(p1)}.`,f:`Xác suất chọn được đúng 1 học sinh nữ là ${qh(Q(f*nC10(m+f-1,2),N))===qh(p1)?qh(Q(p1[0]+1,p1[1])):qh(Q(f*nC10(m+f-1,2),N))}.`,why:`n(A) = ${f}·${CH(m,2)} = ${f*nC10(m,2)}.`},
    {t:`Xác suất có ít nhất 1 học sinh nữ là ${qh(qsub(Q(1),p0))}.`,f:`Xác suất có ít nhất 1 học sinh nữ là ${qh(p0)}.`,why:`P = 1 − ${fr(CH(m,3),CH(m+f,3))} = ${qh(qsub(Q(1),p0))}.`}],chk:()=>true});
});
