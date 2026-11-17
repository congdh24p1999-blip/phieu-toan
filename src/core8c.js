/* ================= CHƯƠNG VIII: MỞ ĐẦU VỀ TÍNH XÁC SUẤT CỦA BIẾN CỐ ================= */
const PRQ=(f,n)=>qh(Q(f,n));
const PRo=(f,n)=>`${I('P')}(${I('A')}) = ${PRQ(f,n)}`;
/* Biến cố trên tập số {1; 2; …; n}: mô tả, đếm số kết quả thuận lợi */
function numEvents(n){
  const L=[
    {d:'số ghi trên thẻ là số chẵn',c:Math.floor(n/2),sd:'chẵn'},
    {d:'số ghi trên thẻ là số lẻ',c:Math.ceil(n/2)},
    {d:'số ghi trên thẻ là số nguyên tố',c:[...Array(n).keys()].filter(i=>isPrime(i+1)).length},
    {d:'số ghi trên thẻ chia hết cho 3',c:Math.floor(n/3)},
    {d:'số ghi trên thẻ chia hết cho 5',c:Math.floor(n/5)},
    {d:'số ghi trên thẻ là số chính phương',c:Math.floor(Math.sqrt(n))},
    {d:`số ghi trên thẻ lớn hơn ${Math.floor(n/2)}`,c:n-Math.floor(n/2)},
    {d:`số ghi trên thẻ nhỏ hơn ${Math.floor(n/4)+1}`,c:Math.floor(n/4)}
  ];
  return L.filter(e=>e.c>0&&e.c<n);
}
const nSet=n=>`{1; 2; …; ${n}}`;

N8('m8-8-space',8,'NB',r=>{
  const f=r.int(0,4);let stem,ans,why;
  if(f===0){stem=`Gieo một con xúc xắc sáu mặt cân đối. Số kết quả có thể xảy ra của phép thử là`;ans=6;why=`Con xúc xắc có 6 mặt nên có 6 kết quả có thể.`}
  else if(f===1){const n=r.int(10,40);stem=`Một hộp đựng ${n} tấm thẻ giống nhau, đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ từ hộp. Số kết quả có thể xảy ra của phép thử là`;ans=n;why=`Có ${n} tấm thẻ nên có ${n} kết quả có thể.`}
  else if(f===2){const a=r.int(2,7),b=r.int(2,7),c=r.int(1,6);stem=`Một túi có ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, các viên bi có cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi từ túi. Số kết quả có thể xảy ra của phép thử là`;ans=a+b+c;why=`Mỗi viên bi là một kết quả có thể, tổng số viên bi là ${a} + ${b} + ${c} = ${a+b+c}.`}
  else if(f===3){const w=r.pick([['một ngày trong tuần',7],['một tháng trong năm',12],['một chữ cái trong bảng chữ cái tiếng Việt (gồm 29 chữ cái)',29]]);stem=`Chọn ngẫu nhiên ${w[0]}. Số kết quả có thể xảy ra là`;ans=w[1];why=`Mỗi lựa chọn là một kết quả có thể, có ${w[1]} kết quả.`}
  else{const n=r.pick([8,10,12,16,20]);stem=`Một vòng quay may mắn được chia thành ${n} hình quạt bằng nhau, đánh số từ 1 đến ${n}. Quay vòng quay một lần, mũi tên dừng ở một hình quạt. Số kết quả có thể xảy ra của phép thử là`;ans=n;why=`Có ${n} hình quạt bằng nhau nên có ${n} kết quả có thể.`}
  return mkNum(r,{stem,correct:ans,cands:[ans+1,ans-1,ans*2,ans+2,Math.round(ans/2)],sol:why,chk:()=>true});
});
N8('m8-8-fav',8,'NB',r=>{
  const n=r.pick([10,12,15,20,24,30,36,40,50]),ev=r.pick(numEvents(n));
  return mkNum(r,{stem:`Rút ngẫu nhiên một tấm thẻ từ hộp đựng ${n} tấm thẻ đánh số từ 1 đến ${n}. Số kết quả thuận lợi cho biến cố “${ev.d}” là`,correct:ev.c,cands:[ev.c+1,ev.c-1,n-ev.c,ev.c+2,n],
    sol:`Các số trong tập ${nSet(n)} thỏa mãn “${ev.d.replace('số ghi trên thẻ ','')}” có ${ev.c} số, nên có ${ev.c} kết quả thuận lợi.`,chk:()=>ev.c>0&&ev.c<n});
});
N8('m8-8-certain',8,'NB',r=>{
  const kind=r.pick(['sure','imp','pr']),n=r.pick([6,10,12,20]);
  const sure=[`Gieo một con xúc xắc sáu mặt, số chấm xuất hiện nhỏ hơn 7`,`Rút một thẻ từ hộp chỉ chứa thẻ đỏ, thẻ rút được có màu đỏ`,`Tung một đồng xu, mặt xuất hiện là mặt sấp hoặc mặt ngửa`];
  const imp=[`Gieo một con xúc xắc sáu mặt, số chấm xuất hiện lớn hơn 6`,`Rút một thẻ từ hộp chỉ chứa thẻ đỏ, thẻ rút được có màu xanh`,`Lấy một viên bi từ túi chỉ có bi trắng, được viên bi đen`];
  const rnd=[`Gieo một con xúc xắc sáu mặt, số chấm xuất hiện là số chẵn`,`Tung một đồng xu, được mặt sấp`,`Rút một thẻ từ hộp thẻ đánh số 1 đến ${n}, được thẻ ghi số lớn hơn ${n/2}`];
  if(kind==='pr'){return mkTxt(r,{stem:`Phát biểu nào sau đây về xác suất của biến cố là <b>đúng</b>?`,correct:`Xác suất của biến cố chắc chắn bằng 1`,wrongs:[`Xác suất của biến cố chắc chắn bằng 0`,`Xác suất của biến cố không thể bằng 1`,`Xác suất của một biến cố có thể lớn hơn 1`,`Xác suất của biến cố ngẫu nhiên luôn bằng ${fr(1,2)}`],sol:`Biến cố chắc chắn có xác suất bằng 1, biến cố không thể có xác suất bằng 0, xác suất của mọi biến cố luôn nằm trong đoạn [0; 1].`,chk:()=>true})}
  const sel=kind==='sure'?r.pick(sure):r.pick(imp);
  const rest=kind==='sure'?imp:sure;
  return mkTxt(r,{stem:`Biến cố nào sau đây là biến cố ${kind==='sure'?'chắc chắn':'không thể'}?`,correct:sel,wrongs:[r.pick(rnd),...r.shuffle(rest).slice(0,2),r.pick(rnd.filter(z=>z!==rnd[0]))],
    sol:`${sel} là biến cố ${kind==='sure'?'chắc chắn (luôn xảy ra)':'không thể (không bao giờ xảy ra)'}; các biến cố còn lại là biến cố ngẫu nhiên hoặc thuộc loại ngược lại.`,chk:()=>true});
});
N8('m8-8-range',8,'NB',r=>{
  const ok=r.pick([fr(1,3),fr(2,5),'0,35','0,8',fr(3,4),'0','1']),bad=[fr(5,4),'1,2',MINUS+'0,3',fr(7,5),MINUS+fr(1,2),'2'];
  return mkTxt(r,{stem:`Giá trị nào sau đây có thể là xác suất của một biến cố?`,correct:ok,wrongs:r.shuffle(bad),
    sol:`Xác suất của một biến cố luôn thỏa mãn 0 ≤ ${I('P')} ≤ 1. Chỉ ${ok} nằm trong đoạn [0; 1].`,chk:()=>true});
});
N8('m8-8-prob',8,'TH',r=>{
  const n=r.pick([10,12,15,18,20,24,25,30,36,40,50]),ev=r.pick(numEvents(n)),ans=Q(ev.c,n);
  return mkTxt(r,{stem:`Một hộp đựng ${n} tấm thẻ giống nhau, đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Xác suất của biến cố “${ev.d}” là`,correct:qh(ans),wrongs:[qh(Q(n-ev.c,n)),qh(Q(ev.c,n-ev.c)),qh(Q(ev.c+1,n)),qh(Q(ev.c,n+1)),qh(Q(ev.c,n-1)),qh(Q(1,ev.c))],
    sol:`Có ${n} kết quả có thể, đồng khả năng. Có ${ev.c} kết quả thuận lợi. Xác suất cần tìm là ${fr(ev.c,n)}${Q(ev.c,n)[1]===n?'':` = ${qh(ans)}`}.`,chk:()=>ev.c>0});
});
N8('m8-8-balls',8,'TH',r=>{
  const a=r.int(2,9),b=r.int(2,9),c=r.int(1,7),t=a+b+c,col=r.pick([['đỏ',a],['xanh',b],['vàng',c]]);
  return mkTxt(r,{stem:`Một túi có ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi từ túi. Xác suất để lấy được viên bi ${col[0]} là`,correct:qh(Q(col[1],t)),wrongs:[qh(Q(t-col[1],t)),qh(Q(col[1],t-col[1])),qh(Q(col[1]+1,t)),qh(Q(1,t)),qh(Q(col[1],t+1))],
    sol:`Tổng số viên bi là ${a} + ${b} + ${c} = ${t}, nên có ${t} kết quả có thể đồng khả năng; có ${col[1]} kết quả thuận lợi. Xác suất là ${fr(col[1],t)}${Q(col[1],t)[1]===t?'':` = ${qh(Q(col[1],t))}`}.`,chk:()=>t>col[1]});
});
N8('m8-8-compl',8,'TH',r=>{
  /* Theo SGK: biết xác suất và tổng số kết quả thì đếm ngược lại số kết quả thuận lợi (không dùng công thức biến cố đối) */
  const t=r.pick([4,5,6,8,10]),k=r.int(1,t-1),j=r.int(2,6),N=t*j,red=k*j,col=r.pick(['đỏ','xanh','vàng','trắng']);
  if(Q(k,t)[1]===1)return T.nlc['m8-8-compl'].gen(r);
  return mkNum(r,{stem:`Một túi có ${N} viên bi cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi, xác suất lấy được viên bi màu ${col} là ${qh(Q(k,t))}. Số viên bi <b>không</b> có màu ${col} trong túi là`,correct:N-red,cands:[red,N-k,t-k,N-red+1,N-red-1,k*t],
    sol:`Số viên bi màu ${col} là ${N}·${qh(Q(k,t))} = ${red}. Số viên bi không có màu ${col} là ${N} ${MINUS} ${red} = ${N-red}.`,chk:()=>red*t===N*k});
});
N8('m8-8-dice2',8,'TH',r=>{
  const s=r.int(3,11),cnt=6-Math.abs(s-7);
  return mkTxt(r,{stem:`Gieo một con xúc xắc sáu mặt cân đối hai lần liên tiếp. Xác suất để tổng số chấm của hai lần gieo bằng ${s} là`,correct:qh(Q(cnt,36)),wrongs:[qh(Q(cnt+1,36)),qh(Q(cnt-1===0?7:cnt-1,36)),qh(Q(cnt,12)),qh(Q(cnt,6)),qh(Q(cnt*2,36)),qh(Q(1,s))],
    sol:`Có 6 · 6 = 36 kết quả có thể đồng khả năng. Các kết quả có tổng bằng ${s} là ${[...Array(6).keys()].map(i=>i+1).filter(a=>s-a>=1&&s-a<=6).map(a=>`(${a}; ${s-a})`).join(', ')}, gồm ${cnt} kết quả. Xác suất là ${fr(cnt,36)}${Q(cnt,36)[1]===36?'':` = ${qh(Q(cnt,36))}`}.`,chk:()=>cnt>=1&&cnt<=6});
});
N8('m8-8-coin',8,'TH',r=>{
  const k=r.pick([2,3]);let pairs;
  if(k===2)pairs=[['hai mặt giống nhau',2,4],['đúng một mặt ngửa',2,4],['hai mặt đều là mặt sấp',1,4],['có ít nhất một mặt ngửa',3,4]];
  else pairs=[['đúng hai mặt ngửa',3,8],['cả ba mặt đều giống nhau',2,8],['có đúng một mặt sấp',3,8],['có ít nhất một mặt ngửa',7,8],['ba mặt đều là mặt ngửa',1,8]];
  const [d,f,n]=r.pick(pairs);
  return mkTxt(r,{stem:`Tung một đồng xu cân đối ${k} lần liên tiếp. Xác suất của biến cố “${d}” là`,correct:qh(Q(f,n)),wrongs:[qh(Q(f+1,n)),qh(Q(f,n*2)),qh(Q(n-f,n)===Q(f,n)?Q(1,3):Q(n-f,n)),qh(Q(1,k)),qh(Q(f,n-1)),qh(Q(f-1<=0?5:f-1,n))],
    sol:`Có 2${sup(k)} = ${n} kết quả có thể đồng khả năng. Số kết quả thuận lợi cho biến cố là ${f}. Xác suất là ${fr(f,n)}${Q(f,n)[1]===n?'':` = ${qh(Q(f,n))}`}.`,chk:()=>f<=n});
});
N8('m8-8-wheel',8,'TH',r=>{
  const n=r.pick([8,10,12,15,16,20]),k=r.int(2,n-2),col=r.pick(['đỏ','xanh','vàng']);
  return mkTxt(r,{stem:`Một vòng quay được chia thành ${n} hình quạt bằng nhau, trong đó ${k} hình quạt tô màu ${col}, các hình quạt còn lại tô màu khác. Quay vòng quay một lần, mũi tên dừng ngẫu nhiên ở một hình quạt. Xác suất để mũi tên dừng ở hình quạt màu ${col} là`,correct:qh(Q(k,n)),wrongs:[qh(Q(n-k,n)),qh(Q(k,n-k)),qh(Q(1,k)),qh(Q(k+1,n)),qh(Q(k,n+1)),qh(Q(n,k))],
    sol:`Có ${n} kết quả có thể đồng khả năng, trong đó ${k} kết quả thuận lợi. Xác suất là ${fr(k,n)}${Q(k,n)[1]===n?'':` = ${qh(Q(k,n))}`}.`,chk:()=>k<n});
});
N8('m8-8-class',8,'TH',r=>{
  const a=r.int(12,25),b=r.int(12,25),who=r.pick(['nam','nữ']),f=who==='nam'?a:b;
  return mkTxt(r,{stem:`Một lớp học có ${a} học sinh nam và ${b} học sinh nữ. Giáo viên chọn ngẫu nhiên một học sinh trong lớp để trả lời câu hỏi. Xác suất để học sinh được chọn là học sinh ${who} là`,correct:qh(Q(f,a+b)),wrongs:[qh(Q(a+b-f,a+b)),qh(Q(a,b)),qh(Q(f,a+b+1)),qh(Q(1,a+b)),qh(Q(f,a+b-1)),qh(Q(f+1,a+b))],
    sol:`Lớp có ${a} + ${b} = ${a+b} học sinh nên có ${a+b} kết quả có thể đồng khả năng; có ${f} kết quả thuận lợi. Xác suất là ${fr(f,a+b)}${Q(f,a+b)[1]===a+b?'':` = ${qh(Q(f,a+b))}`}.`,chk:()=>a+b>0});
});
N8('m8-8-twodig',8,'TH',r=>{
  const ev=r.pick([['chia hết cho 5',18],['chia hết cho 10',9],['chia hết cho 9',10],['là số chẵn',45],['là số lẻ',45],['có chữ số hàng chục là 7',10],['là bội của 15',6],['là bội của 18',5]]);
  return mkTxt(r,{stem:`Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Xác suất để số được chọn ${ev[0]} là`,correct:qh(Q(ev[1],90)),wrongs:[qh(Q(ev[1],100)),qh(Q(ev[1]+1,90)),qh(Q(ev[1],99)),qh(Q(ev[1]-1,90)),qh(Q(ev[1],89)),qh(Q(90-ev[1],90))],
    sol:`Các số tự nhiên có hai chữ số là 10; 11; …; 99, gồm 90 số nên có 90 kết quả có thể đồng khả năng. Có ${ev[1]} số ${ev[0]} nên xác suất là ${fr(ev[1],90)}${Q(ev[1],90)[1]===90?'':` = ${qh(Q(ev[1],90))}`}.`,chk:()=>true});
});
N8('m8-8-add',8,'TH',r=>{
  /* Thêm bi để xác suất đạt giá trị cho trước: a đỏ, b xanh; thêm x bi xanh để P(xanh)=1/2... chọn đủ rộng */
  const a=r.int(3,9),b=r.int(1,a-1),add=a-b,col=r.pick(['xanh','vàng']);
  return mkNum(r,{stem:`Một hộp có ${a} viên bi đỏ và ${b} viên bi ${col}. Cần thêm vào hộp ít nhất bao nhiêu viên bi ${col} để xác suất lấy được viên bi ${col} từ hộp bằng ${fr(1,2)}?`,correct:add,cands:[a,b,a+b,add+1,add-1,2*add],
    sol:`Sau khi thêm ${I('x')} viên bi ${col}, hộp có ${a} + ${b} + ${I('x')} viên bi, trong đó ${b} + ${I('x')} viên bi ${col}. Xác suất bằng ${fr(1,2)} khi 2(${b} + ${I('x')}) = ${a} + ${b} + ${I('x')}, tức ${I('x')} = ${a} ${MINUS} ${b} = ${add}.`,chk:()=>2*(b+add)===a+b+add});
});

DS8('ds8-8-dice',8,'TH',r=>{
  const evs=[
    {d:'số chấm xuất hiện là số chẵn',c:3},{d:'số chấm xuất hiện là số nguyên tố',c:3},{d:'số chấm xuất hiện chia hết cho 3',c:2},{d:'số chấm xuất hiện lớn hơn 4',c:2},{d:'số chấm xuất hiện nhỏ hơn 3',c:2},{d:'số chấm xuất hiện là số lẻ',c:3},{d:'số chấm xuất hiện là ước của 6',c:4}];
  const [e1,e2]=r.shuffle(evs).slice(0,2);
  const imp=r.chance(.5);
  const items=[
    {t:`Phép thử có 6 kết quả có thể, các kết quả này đồng khả năng.`,f:`Phép thử có 12 kết quả có thể, các kết quả này đồng khả năng.`,why:`Con xúc xắc có 6 mặt nên có 6 kết quả có thể.`},
    {t:`Có ${e1.c} kết quả thuận lợi cho biến cố “${e1.d}”.`,f:`Có ${e1.c+1} kết quả thuận lợi cho biến cố “${e1.d}”.`,why:`Số kết quả thuận lợi cho “${e1.d}” là ${e1.c}.`},
    {t:`Xác suất của biến cố “${e2.d}” bằng ${qh(Q(e2.c,6))}.`,f:`Xác suất của biến cố “${e2.d}” bằng ${qh(Q(e2.c+1,6))}.`,why:`Có ${e2.c} kết quả thuận lợi trên 6 kết quả có thể nên xác suất là ${fr(e2.c,6)}${Q(e2.c,6)[1]===6?'':` = ${qh(Q(e2.c,6))}`}.`},
    imp?{t:`Biến cố “số chấm xuất hiện lớn hơn 6” là biến cố không thể và có xác suất bằng 0.`,f:`Biến cố “số chấm xuất hiện lớn hơn 6” là biến cố chắc chắn và có xác suất bằng 1.`,why:`Không có mặt nào có hơn 6 chấm nên biến cố không thể, xác suất bằng 0.`}:
        {t:`Biến cố “số chấm xuất hiện nhỏ hơn 7” là biến cố chắc chắn và có xác suất bằng 1.`,f:`Biến cố “số chấm xuất hiện nhỏ hơn 7” là biến cố không thể và có xác suất bằng 0.`,why:`Mọi mặt đều có số chấm từ 1 đến 6, nhỏ hơn 7, nên biến cố chắc chắn, xác suất bằng 1.`}
  ];
  return mkDS(r,{stem:`Gieo một con xúc xắc sáu mặt cân đối một lần. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>e1.c<6&&e2.c<6});
});
DS8('ds8-8-box',8,'VD',r=>{
  const a=r.int(3,8),b=r.int(2,7),c=r.int(2,6),t=a+b+c,add=r.int(2,6),pb=Q(b,t),pr=Q(a,t),pnew=Q(b+add,t+add);
  const items=[
    {t:`Có ${t} kết quả có thể khi lấy ngẫu nhiên một viên bi từ hộp.`,f:`Có ${t-1} kết quả có thể khi lấy ngẫu nhiên một viên bi từ hộp.`,why:`Tổng số viên bi là ${a} + ${b} + ${c} = ${t}.`},
    {t:`Xác suất để lấy được viên bi đỏ bằng ${qh(pr)}.`,f:`Xác suất để lấy được viên bi đỏ bằng ${qh(Q(a,t-1))}.`,why:`Có ${a} kết quả thuận lợi trên ${t} kết quả có thể: ${fr(a,t)}${pr[1]===t?'':` = ${qh(pr)}`}.`},
    {t:`Xác suất để lấy được viên bi không phải màu xanh bằng ${qh(Q(t-b,t))}.`,f:`Xác suất để lấy được viên bi không phải màu xanh bằng ${qh(pb)}.`,why:`Có ${t-b} viên bi không phải màu xanh nên xác suất là ${qh(Q(t-b,t))} (hay 1 ${MINUS} ${qh(pb)}).`},
    {t:`Nếu bỏ thêm ${add} viên bi xanh vào hộp thì xác suất lấy được viên bi xanh là ${qh(pnew)}.`,f:`Nếu bỏ thêm ${add} viên bi xanh vào hộp thì xác suất lấy được viên bi xanh là ${qh(Q(b+add,t))}.`,why:`Khi đó hộp có ${t+add} viên bi, trong đó ${b+add} viên bi xanh; xác suất là ${fr(b+add,t+add)}${pnew[1]===t+add?'':` = ${qh(pnew)}`}.`}
  ];
  return mkDS(r,{stem:`Một hộp đựng ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi từ hộp. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>Q(b+add,t)[0]/Q(b+add,t)[1]!==pnew[0]/pnew[1]});
});

TLN8('t8-8-count',8,'NB',r=>{
  const n=r.pick([20,25,30,36,40,45,50,60]),ev=r.pick(numEvents(n));
  return{kind:'tln',stem:`Rút ngẫu nhiên một tấm thẻ từ hộp đựng ${n} tấm thẻ đánh số từ 1 đến ${n}. Có bao nhiêu kết quả thuận lợi cho biến cố “${ev.d}”?`,ans:ev.c,unit:'',
    sol:`Trong tập ${nSet(n)} có ${ev.c} số thỏa mãn “${ev.d.replace('số ghi trên thẻ ','')}”, nên có ${ev.c} kết quả thuận lợi.`,chk:()=>ev.c>0};
});
TLN8('t8-8-prob',8,'TH',r=>{
  const den=r.pick([4,5,10,20,25,50]),k=r.int(1,den-1),a=r.int(2,8);
  /* hộp có tổng den viên bi; xác suất = k/den; ghi dưới dạng số thập phân */
  const p=k/den,col=r.pick(['đỏ','xanh','vàng']);
  const oth=den-k;
  return{kind:'tln',stem:`Một hộp có ${den} viên bi cùng kích thước và khối lượng, trong đó có ${k} viên bi màu ${col}, các viên bi còn lại có màu khác. Lấy ngẫu nhiên một viên bi từ hộp. Tính xác suất để lấy được viên bi màu ${col} (viết dưới dạng số thập phân).`,ans:Math.round(p*100)/100,unit:'',
    sol:`Có ${den} kết quả có thể đồng khả năng, ${k} kết quả thuận lợi. Xác suất là ${fr(k,den)} = ${fmt(Math.round(p*100)/100)}.`,chk:()=>Math.abs(p*100-Math.round(p*100))<1e-9&&oth>0};
});
TLN8('t8-8-two',8,'VD',r=>{
  const s=r.int(3,11),cnt=6-Math.abs(s-7),extra=r.pick([1,2]);
  return{kind:'tln',stem:`Gieo một con xúc xắc sáu mặt cân đối hai lần liên tiếp. Gọi ${I('A')} là biến cố “tổng số chấm của hai lần gieo bằng ${s}”. Có bao nhiêu kết quả thuận lợi cho biến cố ${I('A')}?`,ans:cnt,unit:'',
    sol:`Các kết quả (số chấm lần 1; số chấm lần 2) có tổng bằng ${s} là ${[...Array(6).keys()].map(i=>i+1).filter(a=>s-a>=1&&s-a<=6).map(a=>`(${a}; ${s-a})`).join(', ')}. Có ${cnt} kết quả thuận lợi.`,chk:()=>cnt>=1};
});
TLN8('t8-8-add',8,'VD',r=>{
  const [u,v]=r.pick([[2,3],[3,4],[3,5],[4,5]]),a=r.int(4,16),b=r.int(1,a-1),num=u*(a+b)-v*b,x=num/(v-u);
  if(num<=0||!Number.isInteger(x)||x>40)return T.tln['t8-8-add'].gen(r);
  return{kind:'tln',stem:`Một hộp có ${a} viên bi đỏ và ${b} viên bi xanh, cùng kích thước và khối lượng. Cần thêm vào hộp ít nhất bao nhiêu viên bi xanh để xác suất lấy được viên bi xanh từ hộp bằng ${fr(u,v)}?`,ans:x,unit:'',
    sol:`Sau khi thêm ${I('x')} viên bi xanh, hộp có ${a+b} + ${I('x')} viên bi, trong đó ${b} + ${I('x')} viên bi xanh. Xác suất bằng ${fr(u,v)} khi ${v}(${b} + ${I('x')}) = ${u}(${a+b} + ${I('x')}) ⟺ ${v-u===1?'':`${v-u}${I('x')} = ${num} ⟺ `}${I('x')} = ${x}.`,chk:()=>v*(b+x)===u*(a+b+x)};
});

/* ----- Tự luận chương VIII ----- */
TL8('tl8-8-box',8,'TH','real',r=>{
  const a=r.int(3,8),b=r.int(2,8),c=r.int(1,6),t=a+b+c,col=r.pick([['đỏ',a],['xanh',b],['vàng',c]]),co2=r.pick([['đỏ',a],['xanh',b],['vàng',c]].filter(z=>z[0]!==col[0]));
  const both=col[1]+co2[1];
  return{kind:'tl',title:'Xác suất của biến cố (hộp bi)',parts:[
    {pts:.5,html:`Một hộp có ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi từ hộp. Có bao nhiêu kết quả có thể? Tính xác suất của biến cố “viên bi lấy được có màu ${col[0]}”.`},
    {pts:.5,html:`Tính xác suất của biến cố “viên bi lấy được có màu ${col[0]} hoặc màu ${co2[0]}”.`}],
    sol:[ptxt([[`Có ${a} + ${b} + ${c} = ${t} kết quả có thể, đồng khả năng.`,.25],[`Có ${col[1]} kết quả thuận lợi nên xác suất là ${fr(col[1],t)}${Q(col[1],t)[1]===t?'':` = ${qh(Q(col[1],t))}`}.`,.25]]),
      ptxt([[`Số kết quả thuận lợi là ${col[1]} + ${co2[1]} = ${both}.`,.25],[`Xác suất là ${fr(both,t)}${Q(both,t)[1]===t?'':` = ${qh(Q(both,t))}`}.`,.25]])],
    chk:()=>both<t};
});
TL8('tl8-8-cards',8,'TH','real',r=>{
  const n=r.pick([20,24,30,36,40,50]),evs=numEvents(n),[e1,e2]=r.shuffle(evs).slice(0,2);
  return{kind:'tl',title:'Xác suất của biến cố (hộp thẻ)',parts:[
    {pts:.5,html:`Một hộp đựng ${n} tấm thẻ giống nhau, đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Tính xác suất của biến cố ${I('A')}: “${e1.d}”.`},
    {pts:.5,html:`Tính xác suất của biến cố ${I('B')}: “${e2.d}”.`}],
    sol:[ptxt([[`Có ${n} kết quả có thể, đồng khả năng. Số kết quả thuận lợi cho ${I('A')} là ${e1.c}.`,.25],[`${I('P')}(${I('A')}) = ${fr(e1.c,n)}${Q(e1.c,n)[1]===n?'':` = ${qh(Q(e1.c,n))}`}.`,.25]]),
      ptxt([[`Số kết quả thuận lợi cho ${I('B')} là ${e2.c}.`,.25],[`${I('P')}(${I('B')}) = ${fr(e2.c,n)}${Q(e2.c,n)[1]===n?'':` = ${qh(Q(e2.c,n))}`}.`,.25]])],
    chk:()=>e1.c>0&&e2.c>0};
});
TL8('tl8-8-vd',8,'VD','real',r=>{
  const a=r.int(4,10),b=r.int(2,7),t=a+b,rm=r.int(1,Math.min(3,a-1)),x=r.int(2,5);
  const [u,v]=[Q(b,t-rm),Q(b+x,t+x)];
  return{kind:'tl',title:'Xác suất và thay đổi số lượng kết quả',parts:[
    {pts:.5,html:`Một hộp có ${a} viên bi đỏ và ${b} viên bi xanh, cùng kích thước và khối lượng. Lấy ngẫu nhiên một viên bi từ hộp. Tính xác suất để lấy được viên bi xanh.`},
    {pts:.5,html:`Nếu lấy ra khỏi hộp ${rm} viên bi đỏ rồi bỏ thêm vào hộp ${x} viên bi xanh thì xác suất lấy được viên bi xanh từ hộp bây giờ là bao nhiêu?`}],
    sol:[ptxt([[`Có ${a} + ${b} = ${t} kết quả có thể, đồng khả năng; có ${b} kết quả thuận lợi.`,.25],[`Xác suất là ${fr(b,t)}${Q(b,t)[1]===t?'':` = ${qh(Q(b,t))}`}.`,.25]]),
      ptxt([[`Sau khi thay đổi, hộp có ${a-rm} viên bi đỏ và ${b+x} viên bi xanh, tổng ${a-rm+b+x} viên bi.`,.25],[`Xác suất là ${fr(b+x,a-rm+b+x)}${Q(b+x,a-rm+b+x)[1]===a-rm+b+x?'':` = ${qh(Q(b+x,a-rm+b+x))}`}.`,.25]])],
    chk:()=>a-rm>0};
});
