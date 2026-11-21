/* ================================================================
   LỚP 9 – học kì II
   Chương VII: Tần số và tần số tương đối (Bài 22 – 24)
   Chương VIII: Xác suất của biến cố trong một số mô hình xác suất đơn giản (Bài 25 – 26)
   ================================================================ */
const CTX9S=[
  {who:'học sinh lớp 9A',what:'điểm kiểm tra môn Toán',lx:'Điểm',xs:[5,6,7,8,9,10]},
  {who:'học sinh lớp 9B',what:'số giờ tự học mỗi ngày',lx:'Số giờ',xs:[1,2,3,4,5]},
  {who:'học sinh nam khối 9',what:'cỡ giày',lx:'Cỡ giày',xs:[37,38,39,40,41]},
  {who:'gia đình trong khu phố',what:'số con',lx:'Số con',xs:[0,1,2,3,4]},
  {who:'học sinh lớp 9C',what:'số cuốn sách đọc trong tháng',lx:'Số sách',xs:[1,2,3,4,5,6]}];
/* tần số ngẫu nhiên, mỗi giá trị ít nhất 1, tổng bằng N */
const nsOf=(r,k,N)=>{for(;;){const a=[...Array(k)].map(()=>1);let s=k;while(s<N){a[r.int(0,k-1)]++;s++}if(Math.max(...a)<N*.5)return a}};
/* dữ liệu thô dạng lưới */
const rawGrid=xs=>`<table class="dt">${[...Array(Math.ceil(xs.length/10)).keys()].map(i=>`<tr>${xs.slice(10*i,10*i+10).map(v=>`<td>${fmt(v)}</td>`).join('')}</tr>`).join('')}</table>`;
const rawOf=(r,xs,ns)=>r.shuffle(xs.flatMap((x,i)=>Array(ns[i]).fill(x)));
const pctH=v=>fmt(v)+'%';
/* nhóm số đo (ghép nhóm) */
const GRP9=[{what:'chiều cao (cm) của học sinh lớp 9A',lo:145,w:5,k:5,unit:'cm'},{what:'cân nặng (kg) của học sinh lớp 9B',lo:40,w:5,k:4,unit:'kg'},{what:'thời gian (phút) đi từ nhà đến trường của học sinh',lo:0,w:10,k:4,unit:'phút'},{what:'điểm thi (thang 100) của thí sinh',lo:50,w:10,k:5,unit:'điểm'}];
const grpH=(g,i)=>`[${g.lo+g.w*i}; ${g.lo+g.w*(i+1)})`;
const grp9Data=(r,g,N)=>{const ns=nsOf(r,g.k,N),xs=[];ns.forEach((n,i)=>{for(let j=0;j<n;j++)xs.push(g.lo+g.w*i+r.int(0,g.w-1))});return{ns,xs:r.shuffle(xs)}};
const grpTab=(g,ns,ln='Tần số')=>tableHTML([`Nhóm`,...ns.map((_,i)=>grpH(g,i))],[[ln,...ns]]);

/* ===================== Bài 22: Bảng tần số và biểu đồ tần số ===================== */
N9b('k9-22-freq',7,'NB',[22],r=>{
  const C=r.pick(CTX9S),N=r.pick([20,30]),ns=nsOf(r,C.xs.length,N),raw=rawOf(r,C.xs,ns),i=r.int(0,C.xs.length-1);
  return mkNum(r,{stem:`Kết quả điều tra về ${C.what} của ${N} ${C.who} được ghi lại như sau:<div class="figure">${rawGrid(raw)}</div>Tần số của giá trị ${C.xs[i]} là`,correct:ns[i],cands:[ns[(i+1)%ns.length],ns[i]+1,ns[i]-1,C.xs[i]],ok:x=>x>0,
    sol:`Đếm số lần giá trị ${C.xs[i]} xuất hiện trong mẫu dữ liệu: ${ns[i]} lần.`,chk:()=>raw.filter(v=>v===C.xs[i]).length===ns[i]});
});
N9b('k9-22-N',7,'NB',[22],r=>{
  const C=r.pick(CTX9S),N=r.int(25,45),ns=nsOf(r,C.xs.length,N);
  return mkNum(r,{stem:`Bảng tần số sau cho biết ${C.what} của các ${C.who}:<div class="figure">${freqTab(C.xs,ns,C.lx)}</div>Cỡ mẫu của dữ liệu là`,correct:N,cands:[C.xs.length,Math.max(...ns),N-ns[0],N+C.xs.length],ok:x=>x>0,
    sol:`Cỡ mẫu bằng tổng các tần số: ${ns.join(' + ')} = ${N}.`,chk:()=>ns.reduce((a,b)=>a+b,0)===N});
});
N9b('k9-22-bar',7,'TH',[22],r=>{
  for(;;){const C=r.pick(CTX9S),N=r.int(25,40),ns=nsOf(r,C.xs.length,N),mx=Math.max(...ns);if(ns.filter(v=>v===mx).length>1)continue;const i=ns.indexOf(mx),t=r.chance(.5),j=r.int(1,C.xs.length-2),ge=ns.slice(j).reduce((a,b)=>a+b,0);
    const stem=`Biểu đồ tần số dưới đây biểu diễn ${C.what} của các ${C.who}.<div class="figure">${barSVG(C.xs.map(String),ns)}</div>`;
    return t?mkTxt(r,{stem:stem+'Giá trị có tần số lớn nhất là',correct:String(C.xs[i]),wrongs:C.xs.filter((_,k)=>k!==i).map(String),sol:`Cột cao nhất ứng với giá trị ${C.xs[i]} (tần số ${mx}).`,chk:()=>true})
      :mkNum(r,{stem:stem+`Số ${C.who.split(' ')[0]==='gia'?'gia đình':'bạn'} có ${C.what} không nhỏ hơn ${C.xs[j]} là`,correct:ge,cands:[ge-ns[j],N-ge,ge+ns[j-1],ns[j]],ok:x=>x>0,sol:`Cộng tần số của các giá trị từ ${C.xs[j]} trở lên: ${ns.slice(j).join(' + ')} = ${ge}.`,chk:()=>true})}
});
/* ===================== Bài 23: Bảng tần số tương đối và biểu đồ tần số tương đối ===================== */
N9b('k9-23-rel',7,'NB',[23],r=>{
  const C=r.pick(CTX9S),N=r.pick([20,25,40,50]),ns=nsOf(r,C.xs.length,N),i=r.int(0,C.xs.length-1),v=ns[i]*100/N;
  return mkNum(r,{stem:`Bảng tần số sau cho biết ${C.what} của ${N} ${C.who}:<div class="figure">${freqTab(C.xs,ns,C.lx)}</div>Tần số tương đối của giá trị ${C.xs[i]} là`,correct:v,f:pctH,cands:[ns[i],100/N*(ns[i]+1),100-v,ns[(i+1)%ns.length]*100/N],ok:x=>x>0&&x<100,step:100/N,
    sol:`f = ${fr(ns[i],N)}·100% = ${pctH(v)}.`,chk:()=>isInt(v*100)});
});
N9b('k9-23-pie',7,'TH',[23],r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,120,200]),k=r.int(0,3),v=N*pcts[k]/100;
  return mkNum(r,{stem:`Biểu đồ tần số tương đối dưới đây biểu diễn kết quả khảo sát ${set.what} của ${N} học sinh khối 9.<div class="figure">${pieSVG(set.names.map((n,i)=>({name:n,pct:pcts[i]})))}</div>Số học sinh chọn “${set.names[k]}” là`,correct:v,
    cands:[pcts[k],N*pcts[(k+1)%4]/100,N-v,v+N/20],ok:x=>x>0,sol:`${N}·${pcts[k]}% = ${v} (học sinh).`,chk:()=>isInt(v)});
});
/* ===================== Bài 24: Bảng tần số, tần số tương đối ghép nhóm và biểu đồ ===================== */
N9b('k9-24-grp',7,'TH',[24],r=>{
  const g=r.pick(GRP9),N=r.pick([20,25,40,50]),{ns,xs}=grp9Data(r,g,N),i=r.int(0,g.k-1),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Mẫu dữ liệu về ${g.what} được cho như sau:<div class="figure">${rawGrid(xs)}</div>Tần số của nhóm ${grpH(g,i)} là`,correct:ns[i],cands:[ns[(i+1)%g.k],ns[i]+1,ns[i]-1,ns[i]+2],ok:x=>x>0,
    sol:`Đếm các giá trị x thoả mãn ${g.lo+g.w*i} ≤ x < ${g.lo+g.w*(i+1)}: có ${ns[i]} giá trị.`,chk:()=>xs.filter(x=>x>=g.lo+g.w*i&&x<g.lo+g.w*(i+1)).length===ns[i]});
  const v=ns[i]*100/N;
  return mkNum(r,{stem:`Bảng tần số ghép nhóm về ${g.what}:<div class="figure">${grpTab(g,ns)}</div>Tần số tương đối của nhóm ${grpH(g,i)} là`,correct:v,f:pctH,cands:[ns[i],100-v,ns[(i+1)%g.k]*100/N,(ns[i]+1)*100/N],ok:x=>x>0&&x<100,step:100/N,
    sol:`Cỡ mẫu N = ${N}; f = ${fr(ns[i],N)}·100% = ${pctH(v)}.`,chk:()=>true});
});
/* ===================== Bài 25: Phép thử ngẫu nhiên và không gian mẫu ===================== */
const EXP9=r=>{const a=r.int(3,7),b=r.int(3,7),n=r.int(8,20);return r.pick([
  {t:'Gieo một con xúc xắc cân đối một lần',n:6,list:'{1; 2; 3; 4; 5; 6}'},
  {t:'Gieo một đồng xu cân đối hai lần liên tiếp',n:4,list:'{SS; SN; NS; NN}'},
  {t:'Gieo đồng thời một đồng xu và một con xúc xắc',n:12},
  {t:'Gieo một con xúc xắc cân đối hai lần liên tiếp',n:36},
  {t:'Gieo một đồng xu cân đối ba lần liên tiếp',n:8},
  {t:`Chọn ngẫu nhiên một bạn nam và một bạn nữ từ một nhóm có ${a} bạn nam và ${b} bạn nữ`,n:a*b},
  {t:`Rút ngẫu nhiên một tấm thẻ từ hộp có ${n} tấm thẻ đánh số từ 1 đến ${n}`,n}])};
N9b('k9-25-omega',8,'NB',[25],r=>{
  const E=EXP9(r);
  return mkNum(r,{stem:`${E.t}. Số phần tử của không gian mẫu là`,correct:E.n,cands:[E.n*2,E.n/2,E.n+1,E.n-1,6,12],ok:x=>x>0&&isInt(x),sol:`Không gian mẫu của phép thử có ${E.n} phần tử.`,chk:()=>true});
});
N9b('k9-25-list',8,'NB',[25],r=>{
  const t=r.chance(.5);
  return t?mkTxt(r,{stem:`Gieo một đồng xu cân đối hai lần liên tiếp (S: mặt sấp, N: mặt ngửa). Không gian mẫu của phép thử là`,correct:'Ω = {SS; SN; NS; NN}',wrongs:['Ω = {S; N}','Ω = {SS; NN}','Ω = {SS; SN; NN}','Ω = {SN; NS}'],sol:'Mỗi kết quả là một cặp (lần 1, lần 2): SS, SN, NS, NN.',chk:()=>true})
    :mkTxt(r,{stem:`Một hộp có 1 viên bi xanh (X), 1 viên bi đỏ (Đ) và 1 viên bi vàng (V). Lấy ngẫu nhiên đồng thời hai viên bi. Không gian mẫu của phép thử là`,correct:'Ω = {XĐ; XV; ĐV}',wrongs:['Ω = {X; Đ; V}','Ω = {XĐ; ĐX; XV; VX; ĐV; VĐ}','Ω = {XX; ĐĐ; VV}','Ω = {XĐ; XV}'],sol:'Lấy đồng thời hai viên nên không kể thứ tự: XĐ, XV, ĐV.',chk:()=>true});
});
/* ===================== Bài 26: Xác suất của biến cố liên quan tới phép thử ===================== */
N9b('k9-26-card',8,'TH',[26],r=>{
  for(;;){const n=r.int(10,30),k=r.pick([2,3,4,5,6]),c=Math.floor(n/k);if(c<2)continue;
    return mkF(r,{stem:`Một hộp có ${n} tấm thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Xác suất để số ghi trên thẻ chia hết cho ${k} là`,correct:Q(c,n),cands:[Q(1,k),Q(c+1,n),Q(n-c,n),Q(c,n-1)],
      sol:`n(Ω) = ${n}; các số chia hết cho ${k}: ${k}, ${2*k}, …, ${c*k} — có ${c} số. P = ${qh(Q(c,n))}.`,chk:()=>true})}
});
N9b('k9-26-dice',8,'TH',[26],r=>{
  for(;;){const D=dice2(r);if(!D.n||D.n===36)continue;
    return mkF(r,{stem:`Gieo một con xúc xắc cân đối hai lần liên tiếp. Xác suất của biến cố “${D.txt}” là`,correct:Q(D.n,36),cands:[Q(D.n,6),Q(D.n,12),Q(36-D.n,36),Q(D.n+1,36),Q(D.n-1,36)],
      sol:`n(Ω) = 36; có ${D.n} kết quả thuận lợi. P = ${fr(D.n,36)} = ${qh(Q(D.n,36))}.`,chk:()=>true})}
});
N9b('k9-26-ball',8,'TH',[26],r=>{
  const a=r.int(2,5),b=r.int(1,4),n=a+b,t=r.chance(.5);
  if(t)return mkF(r,{stem:`Một hộp có ${a} viên bi xanh và ${b} viên bi đỏ có cùng kích thước. Lấy ngẫu nhiên một viên bi. Xác suất lấy được viên bi đỏ là`,correct:Q(b,n),cands:[Q(a,n),Q(b,a),Q(1,2),Q(1,n)],
    sol:`n(Ω) = ${n}; có ${b} kết quả thuận lợi. P = ${qh(Q(b,n))}.`,chk:()=>true});
  const all=n*(n-1)/2,same=a*(a-1)/2+b*(b-1)/2;
  return mkF(r,{stem:`Một hộp có ${a} viên bi xanh và ${b} viên bi đỏ có cùng kích thước. Lấy ngẫu nhiên đồng thời hai viên bi. Xác suất để hai viên bi lấy được cùng màu là`,correct:Q(same,all),cands:[Q(a*b,all),Q(same,n*n),Q(1,2),Q(same+1,all)],
    sol:`Số cách lấy 2 viên: ${all}; cùng màu: ${a*(a-1)/2} (xanh) + ${b*(b-1)/2} (đỏ) = ${same}. P = ${qh(Q(same,all))}.`,chk:()=>same>0&&same<all});
});

/* ---------- Đúng/sai chương VIII ---------- */
DS9b('ds9-25-coin',8,'NB',[25,26],r=>{
  const t=r.chance(.5);
  if(t)return mkDS(r,{stem:'Gieo một đồng xu cân đối hai lần liên tiếp. Xét tính đúng sai của các khẳng định sau:',items:[
    {t:'Không gian mẫu có 4 phần tử.',f:'Không gian mẫu có 2 phần tử.',why:'Ω = {SS; SN; NS; NN}.'},
    {t:'Biến cố “Hai lần gieo có kết quả giống nhau” có 2 kết quả thuận lợi.',f:'Biến cố “Hai lần gieo có kết quả giống nhau” có 1 kết quả thuận lợi.',why:'SS và NN.'},
    {t:`Xác suất của biến cố “Có ít nhất một lần xuất hiện mặt sấp” bằng ${fr(3,4)}.`,f:`Xác suất của biến cố “Có ít nhất một lần xuất hiện mặt sấp” bằng ${fr(1,2)}.`,why:'SS, SN, NS: 3 kết quả thuận lợi trên 4.'},
    {t:`Xác suất của biến cố “Lần thứ nhất xuất hiện mặt ngửa” bằng ${fr(1,2)}.`,f:`Xác suất của biến cố “Lần thứ nhất xuất hiện mặt ngửa” bằng ${fr(1,4)}.`,why:'NS, NN: 2 kết quả thuận lợi trên 4.'}],chk:()=>true});
  return mkDS(r,{stem:'Gieo một con xúc xắc cân đối một lần. Xét tính đúng sai của các khẳng định sau:',items:[
    {t:'Không gian mẫu có 6 phần tử.',f:'Không gian mẫu có 5 phần tử.',why:'Ω = {1; 2; 3; 4; 5; 6}.'},
    {t:`Xác suất xuất hiện mặt có số chấm chẵn bằng ${fr(1,2)}.`,f:`Xác suất xuất hiện mặt có số chấm chẵn bằng ${fr(1,3)}.`,why:'Mặt 2, 4, 6: 3 kết quả thuận lợi.'},
    {t:`Xác suất xuất hiện mặt có số chấm là số nguyên tố bằng ${fr(1,2)}.`,f:`Xác suất xuất hiện mặt có số chấm là số nguyên tố bằng ${fr(2,3)}.`,why:'Mặt 2, 3, 5: 3 kết quả thuận lợi.'},
    {t:`Xác suất xuất hiện mặt có số chấm lớn hơn 4 bằng ${fr(1,3)}.`,f:`Xác suất xuất hiện mặt có số chấm lớn hơn 4 bằng ${fr(1,2)}.`,why:'Mặt 5, 6: 2 kết quả thuận lợi.'}],chk:()=>true});
});
DS9b('ds9-25-card',8,'NB',[25,26],r=>{
  for(;;){const n=r.int(10,20),k=r.pick([3,4,5]),c=Math.floor(n/k),ev=Math.floor(n/2),pr=[2,3,5,7,11,13,17,19].filter(p=>p<=n).length;if(c===ev)continue;
    return mkDS(r,{stem:`Một hộp có ${n} tấm thẻ cùng loại, được đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Không gian mẫu có ${n} phần tử.`,f:`Không gian mẫu có ${n-1} phần tử.`,why:`Ω = {1; 2; …; ${n}}.`},
      {t:`Biến cố “Số ghi trên thẻ chia hết cho ${k}” có ${c} kết quả thuận lợi.`,f:`Biến cố “Số ghi trên thẻ chia hết cho ${k}” có ${c+1} kết quả thuận lợi.`,why:`${[...Array(c)].map((_,i)=>k*(i+1)).join(', ')}.`},
      {t:`Xác suất rút được thẻ ghi số chẵn bằng ${qh(Q(ev,n))}.`,f:`Xác suất rút được thẻ ghi số chẵn bằng ${qh(Q(ev+1,n))}.`,why:`Có ${ev} số chẵn.`},
      {t:`Xác suất rút được thẻ ghi số nguyên tố bằng ${qh(Q(pr,n))}.`,f:`Xác suất rút được thẻ ghi số nguyên tố bằng ${qh(Q(pr+1,n))}.`,why:`Các số nguyên tố: ${[2,3,5,7,11,13,17,19].filter(p=>p<=n).join(', ')} — có ${pr} số.`}],chk:()=>true})}
});
DS9b('ds9-26-dice',8,'TH',[26],r=>{
  const s=r.int(5,9),ns=[...Array(6)].flatMap((_,a)=>[...Array(6)].map((_,b)=>a+b+2)).filter(v=>v===s).length,g=r.int(8,10),ng=[...Array(36)].filter((_,i)=>Math.floor(i/6)+i%6+2>=g).length;
  return mkDS(r,{stem:'Gieo một con xúc xắc cân đối hai lần liên tiếp. Xét tính đúng sai của các khẳng định sau:',items:[
    {t:'Không gian mẫu có 36 phần tử.',f:'Không gian mẫu có 12 phần tử.',why:'Mỗi lần có 6 kết quả nên có 6·6 = 36 kết quả.'},
    {t:`Xác suất để tổng số chấm bằng ${s} là ${qh(Q(ns,36))}.`,f:`Xác suất để tổng số chấm bằng ${s} là ${qh(Q(ns+1,36))}.`,why:`Có ${ns} cặp có tổng bằng ${s}.`},
    {t:`Xác suất để hai lần gieo xuất hiện số chấm bằng nhau là ${fr(1,6)}.`,f:`Xác suất để hai lần gieo xuất hiện số chấm bằng nhau là ${fr(1,36)}.`,why:'(1; 1), (2; 2), …, (6; 6): 6 kết quả.'},
    {t:`Xác suất để tổng số chấm không nhỏ hơn ${g} là ${qh(Q(ng,36))}.`,f:`Xác suất để tổng số chấm không nhỏ hơn ${g} là ${qh(Q(ng+2,36))}.`,why:`Có ${ng} kết quả có tổng từ ${g} trở lên.`}],chk:()=>true});
});
DS9b('ds9-26-ball',8,'TH',[25,26],r=>{
  const a=r.int(2,4),b=r.int(2,4),n=a+b,all=n*(n-1)/2,xx=a*(a-1)/2,xd=a*b,dd=b*(b-1)/2;
  return mkDS(r,{stem:`Một hộp có ${a} viên bi xanh và ${b} viên bi đỏ có cùng kích thước. Lấy ngẫu nhiên đồng thời hai viên bi. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Không gian mẫu có ${all} phần tử.`,f:`Không gian mẫu có ${n*n} phần tử.`,why:`Số cách chọn 2 viên trong ${n} viên (không kể thứ tự) là ${all}.`},
    {t:`Xác suất lấy được hai viên bi xanh là ${qh(Q(xx,all))}.`,f:`Xác suất lấy được hai viên bi xanh là ${qh(Q(a,n))}.`,why:`Có ${xx} cách lấy 2 viên xanh.`},
    {t:`Xác suất lấy được hai viên khác màu là ${qh(Q(xd,all))}.`,f:`Xác suất lấy được hai viên khác màu là ${qh(Q(xd,n*n))}.`,why:`Có ${a}·${b} = ${xd} cách.`},
    {t:`Xác suất lấy được ít nhất một viên bi đỏ là ${qh(Q(all-xx,all))}.`,f:`Xác suất lấy được ít nhất một viên bi đỏ là ${qh(Q(dd,all))}.`,why:`Trừ đi ${xx} cách lấy 2 viên xanh: ${all-xx} cách.`}],chk:()=>Q(xx,all).join()!==Q(a,n).join()&&Q(all-xx,all).join()!==Q(dd,all).join()&&Q(xd,all).join()!==Q(xd,n*n).join()});
});
DS9b('ds9-26-seq',8,'VD',[26],r=>{
  const n=r.int(4,6),O=[];for(let i=1;i<=n;i++)for(let j=1;j<=n;j++)if(i!==j)O.push([i,j]);
  const ev=O.filter(([i,j])=>(i+j)%2===0).length,gt=O.filter(([i,j])=>i>j).length,k=r.int(5,n+3),sk=O.filter(([i,j])=>i+j===k).length;
  return mkDS(r,{stem:`Một hộp có ${n} tấm thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên lần lượt hai tấm thẻ (không hoàn lại), ghi số của thẻ rút lần thứ nhất là ${I('a')}, lần thứ hai là ${I('b')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Không gian mẫu có ${O.length} phần tử.`,f:`Không gian mẫu có ${n*n} phần tử.`,why:`Lần 1 có ${n} cách, lần 2 có ${n-1} cách: ${O.length} kết quả.`},
    {t:`Xác suất để ${I('a')} > ${I('b')} bằng ${fr(1,2)}.`,f:`Xác suất để ${I('a')} > ${I('b')} bằng ${qh(Q(gt-1,O.length))}.`,why:`Có ${gt} kết quả a > b, bằng một nửa số kết quả.`},
    {t:`Xác suất để ${I('a')} + ${I('b')} là số chẵn bằng ${qh(Q(ev,O.length))}.`,f:`Xác suất để ${I('a')} + ${I('b')} là số chẵn bằng ${fr(1,2)}.`,why:`a, b cùng tính chẵn lẻ: ${ev} kết quả.`},
    {t:`Xác suất để ${I('a')} + ${I('b')} = ${k} bằng ${qh(Q(sk,O.length))}.`,f:`Xác suất để ${I('a')} + ${I('b')} = ${k} bằng ${qh(Q(sk+1,O.length))}.`,why:`Có ${sk} cặp (a; b) thoả mãn.`}],chk:()=>Q(ev,O.length).join()!=='1,2'&&gt-1!==gt&&sk>0});
});
DS9b('ds9-26-num',8,'VD',[26],r=>{
  const k=r.pick([3,4,6,7,9]),dk=[...Array(90)].map((_,i)=>i+10).filter(v=>v%k===0).length,s=r.int(5,12),ds=[...Array(90)].map((_,i)=>i+10).filter(v=>Math.floor(v/10)+v%10===s).length;
  return mkDS(r,{stem:'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Xét tính đúng sai của các khẳng định sau:',items:[
    {t:'Không gian mẫu có 90 phần tử.',f:'Không gian mẫu có 99 phần tử.',why:'Các số từ 10 đến 99: 90 số.'},
    {t:`Xác suất để số được chọn chia hết cho ${k} là ${qh(Q(dk,90))}.`,f:`Xác suất để số được chọn chia hết cho ${k} là ${qh(Q(dk+1,90))}.`,why:`Có ${dk} số có hai chữ số chia hết cho ${k}.`},
    {t:`Xác suất để số được chọn có hai chữ số giống nhau là ${fr(1,10)}.`,f:`Xác suất để số được chọn có hai chữ số giống nhau là ${fr(1,9)}.`,why:'11, 22, …, 99: 9 số; P = 9/90 = 1/10.'},
    {t:`Xác suất để tổng hai chữ số bằng ${s} là ${qh(Q(ds,90))}.`,f:`Xác suất để tổng hai chữ số bằng ${s} là ${qh(Q(ds+1,90))}.`,why:`Có ${ds} số thoả mãn.`}],chk:()=>true});
});

/* ---------- Trả lời ngắn ---------- */
TLN9b('t9-23-rel',7,'TH',[23],r=>{
  const C=r.pick(CTX9S),N=r.pick([20,25,40,50]),ns=nsOf(r,C.xs.length,N),i=r.int(0,C.xs.length-1),v=ns[i]*100/N;
  return{kind:'tln',stem:`Bảng tần số sau cho biết ${C.what} của ${N} ${C.who}:<div class="figure">${freqTab(C.xs,ns,C.lx)}</div>Tính tần số tương đối (theo %) của giá trị ${C.xs[i]}.`,ans:v,unit:'%',sol:`${fr(ns[i],N)}·100% = ${pctH(v)}.`,chk:()=>isInt(v*100)};
});
TLN9b('t9-22-bar',7,'TH',[22],r=>{
  const C=r.pick(CTX9S),N=r.int(25,40),ns=nsOf(r,C.xs.length,N),j=r.int(1,C.xs.length-2),lt=ns.slice(0,j).reduce((a,b)=>a+b,0);
  return{kind:'tln',stem:`Biểu đồ tần số dưới đây biểu diễn ${C.what} của các ${C.who}.<div class="figure">${barSVG(C.xs.map(String),ns)}</div>Có bao nhiêu ${C.who.startsWith('gia')?'gia đình':'bạn'} có ${C.what} nhỏ hơn ${C.xs[j]}?`,ans:lt,unit:'',sol:`${ns.slice(0,j).join(' + ')} = ${lt}.`,chk:()=>true};
});
TLN9b('t9-24-grp',7,'VD',[24],r=>{
  const g=r.pick(GRP9),N=r.pick([20,25]),{ns,xs}=grp9Data(r,g,N),i=r.int(0,g.k-1),v=ns[i]*100/N;
  return{kind:'tln',stem:`Mẫu dữ liệu về ${g.what} được cho như sau:<div class="figure">${rawGrid(xs)}</div>Tính tần số tương đối (theo %) của nhóm ${grpH(g,i)}.`,ans:v,unit:'%',
    sol:`Nhóm ${grpH(g,i)} có ${ns[i]} giá trị; ${fr(ns[i],N)}·100% = ${pctH(v)}.`,chk:()=>xs.filter(x=>x>=g.lo+g.w*i&&x<g.lo+g.w*(i+1)).length===ns[i]};
});
TLN9b('t9-23-miss',7,'VD',[23],r=>{
  for(;;){const C=r.pick(CTX9S),N=r.pick([20,25,40,50]),ns=nsOf(r,C.xs.length,N),i=r.int(0,C.xs.length-1),ps=ns.map(n=>n*100/N);if(!ps.every(p=>isInt(p*10)))continue;
    return{kind:'tln',stem:`Bảng tần số tương đối sau cho biết ${C.what} của ${N} ${C.who}:<div class="figure">${tableHTML([C.lx,...C.xs.map(String)],[['Tần số tương đối',...ps.map((p,k)=>k===i?I('a')+'%':pctH(p))]])}</div>Có bao nhiêu ${C.who.startsWith('gia')?'gia đình':'bạn'} có ${C.what} bằng ${C.xs[i]}?`,ans:ns[i],unit:'',
      sol:`a = 100 − (${ps.filter((_,k)=>k!==i).map(fmt).join(' + ')}) = ${fmt(ps[i])}; số ${C.who.startsWith('gia')?'gia đình':'bạn'} là ${N}·${pctH(ps[i])} = ${ns[i]}.`,chk:()=>true}}
});
TLN9b('t9-25-omega',8,'TH',[25],r=>{
  const a=r.int(2,5),b=r.int(2,5),c=r.int(3,6),E=r.pick([
    {t:`Một hộp có ${c} viên bi được đánh số từ 1 đến ${c}. Lấy ngẫu nhiên đồng thời hai viên bi. Không gian mẫu có bao nhiêu phần tử?`,n:c*(c-1)/2},
    {t:`Một lớp có ${a+3} bạn nam và ${b+3} bạn nữ. Chọn ngẫu nhiên một bạn nam và một bạn nữ để dẫn chương trình. Không gian mẫu có bao nhiêu phần tử?`,n:(a+3)*(b+3)},
    {t:`Gieo một con xúc xắc cân đối rồi gieo một đồng xu cân đối. Không gian mẫu có bao nhiêu phần tử?`,n:12},
    {t:`Rút ngẫu nhiên lần lượt hai tấm thẻ (không hoàn lại) từ hộp có ${c} tấm thẻ đánh số từ 1 đến ${c}. Không gian mẫu có bao nhiêu phần tử?`,n:c*(c-1)}]);
  return{kind:'tln',stem:E.t,ans:E.n,unit:'',sol:`Liệt kê hoặc đếm theo từng bước: n(Ω) = ${E.n}.`,chk:()=>true};
});
TLN9b('t9-26-card',8,'TH',[26],r=>{
  for(;;){const n=r.pick([10,20,25,40,50]),k=r.pick([2,3,4,5,6]),c=Math.floor(n/k),v=c/n;if(!isInt(v*100))continue;
    return{kind:'tln',stem:`Một hộp có ${n} tấm thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Tính xác suất để số ghi trên thẻ chia hết cho ${k} (viết kết quả dưới dạng số thập phân).`,ans:v,unit:'',sol:`Có ${c} số chia hết cho ${k}; P = ${fr(c,n)} = ${fmt(v)}.`,chk:()=>true}}
});
TLN9b('t9-26-dice',8,'VD',[26],r=>{
  for(;;){const D=dice2(r);if(!D.n||D.n===36)continue;const v=Math.round(D.n/36*100)/100;
    return{kind:'tln',stem:`Gieo một con xúc xắc cân đối hai lần liên tiếp. Tính xác suất của biến cố “${D.txt}” (làm tròn kết quả đến hàng phần trăm).`,ans:v,unit:'',sol:`n(Ω) = 36; có ${D.n} kết quả thuận lợi; P = ${fr(D.n,36)} ≈ ${fmt(v)}.`,chk:()=>true}}
});
TLN9b('t9-26-ball',8,'VD',[26],r=>{
  const a=r.int(2,5),b=r.int(2,5),n=a+b,all=n*(n-1)/2,t=r.chance(.5),k=t?a*b:a*(a-1)/2+b*(b-1)/2,v=Math.round(k/all*100)/100;
  return{kind:'tln',stem:`Một hộp có ${a} viên bi xanh và ${b} viên bi đỏ. Lấy ngẫu nhiên đồng thời hai viên bi. Tính xác suất để hai viên bi lấy được ${t?'khác màu':'cùng màu'} (làm tròn kết quả đến hàng phần trăm).`,ans:v,unit:'',
    sol:`n(Ω) = ${all}; số kết quả thuận lợi: ${t?`${a}·${b} = ${k}`:`${a*(a-1)/2} + ${b*(b-1)/2} = ${k}`}; P = ${fr(k,all)} ≈ ${fmt(v)}.`,chk:()=>true};
});

/* ---------- Tự luận (thống kê, xác suất) ---------- */
TL9b('tl9-22-tab',7,'TH','stat',[22,23],r=>{
  for(;;){const C=r.pick(CTX9S),N=r.pick([20,25]),ns=nsOf(r,C.xs.length,N),raw=rawOf(r,C.xs,ns),mx=Math.max(...ns),im=ns.indexOf(mx);if(ns.filter(v=>v===mx).length>1)continue;
  return{kind:'tl',title:'Bảng tần số và tần số tương đối',parts:[{pts:.5,html:`Kết quả điều tra về ${C.what} của ${N} ${C.who} được ghi lại như sau:<div class="figure">${rawGrid(raw)}</div>Lập bảng tần số của mẫu dữ liệu trên.`},{pts:.5,html:`Lập bảng tần số tương đối và cho biết giá trị nào chiếm tỉ lệ cao nhất.`}],
    sol:[ptxt([[`Đếm số lần xuất hiện của từng giá trị:`,0],[freqTab(C.xs,ns,C.lx),.5]]),ptxt([[tableHTML([C.lx,...C.xs.map(String)],[['Tần số tương đối',...ns.map(n=>pctH(n*100/N))]]),.25],[`Giá trị ${C.xs[im]} chiếm tỉ lệ cao nhất (${pctH(mx*100/N)}).`,.25]])],chk:()=>ns.filter(v=>v===mx).length===1};}
});
TL9b('tl9-24-grp',7,'VD','stat',[24],r=>{
  for(;;){const g=r.pick(GRP9),N=r.pick([20,25]),{ns,xs}=grp9Data(r,g,N),mx=Math.max(...ns),im=ns.indexOf(mx);if(ns.filter(v=>v===mx).length>1)continue;
  return{kind:'tl',title:'Bảng tần số ghép nhóm',parts:[{pts:.5,html:`Mẫu dữ liệu về ${g.what} được cho như sau:<div class="figure">${rawGrid(xs)}</div>Lập bảng tần số ghép nhóm với các nhóm ${[...Array(g.k).keys()].map(i=>grpH(g,i)).join(', ')}.`},{pts:.5,html:`Lập bảng tần số tương đối ghép nhóm. Nhóm nào có tần số tương đối lớn nhất?`}],
    sol:[ptxt([[`Đếm số giá trị thuộc từng nhóm:`,0],[grpTab(g,ns),.5]]),ptxt([[tableHTML(['Nhóm',...ns.map((_,i)=>grpH(g,i))],[['Tần số tương đối',...ns.map(n=>pctH(n*100/N))]]),.25],[`Nhóm ${grpH(g,im)} có tần số tương đối lớn nhất (${pctH(mx*100/N)}).`,.25]])],chk:()=>ns.filter(v=>v===mx).length===1};}
});
TL9b('tl9-26-coin',8,'TH','stat',[25,26],r=>{
  const n=r.int(3,5),A=r.pick([['hai bạn được chọn có Hà',n-1],['hai bạn được chọn không có Hà',(n-1)*(n-2)/2]]),names=['An','Bình','Hà','Minh','Nam'].slice(0,n),pairs=[];
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)pairs.push(names[i]+' – '+names[j]);
  return{kind:'tl',title:'Phép thử ngẫu nhiên và xác suất',parts:[{pts:.5,html:`Nhóm bạn gồm ${names.join(', ')}. Chọn ngẫu nhiên hai bạn để tham gia một cuộc thi. Mô tả không gian mẫu của phép thử.`},{pts:.5,html:`Tính xác suất của biến cố “${A[0]}”.`}],
    sol:[ptxt([[`Ω = {${pairs.join('; ')}}.`,.25],[`Không gian mẫu có ${pairs.length} phần tử.`,.25]]),ptxt([[`Số kết quả thuận lợi: ${A[1]}.`,.25],[`P = ${fr(A[1],pairs.length)} = ${qh(Q(A[1],pairs.length))}.`,.25]])],chk:()=>pairs.filter(p=>A[0].includes('không')?!p.includes('Hà'):p.includes('Hà')).length===A[1]};
});
TL9b('tl9-26-dice',8,'VD','stat',[26],r=>{
  for(;;){const D1=dice2(r),D2=dice2(r);if(!D1.n||!D2.n||D1.txt===D2.txt||D1.n===36||D2.n===36)continue;
    return{kind:'tl',title:'Xác suất khi gieo hai con xúc xắc',parts:[{pts:.5,html:`Gieo một con xúc xắc cân đối hai lần liên tiếp. Không gian mẫu có bao nhiêu phần tử? Tính xác suất của biến cố ${I('A')}: “${D1.txt}”.`},{pts:.5,html:`Tính xác suất của biến cố ${I('B')}: “${D2.txt}”.`}],
      sol:[ptxt([[`Mỗi kết quả là một cặp (i; j) với i, j ∈ {1; …; 6}: n(Ω) = 36.`,.25],[`Có ${D1.n} kết quả thuận lợi cho A; P(A) = ${fr(D1.n,36)} = ${qh(Q(D1.n,36))}.`,.25]]),ptxt([[`Liệt kê các cặp thoả mãn: có ${D2.n} kết quả thuận lợi cho B.`,.25],[`P(B) = ${fr(D2.n,36)} = ${qh(Q(D2.n,36))}.`,.25]])],chk:()=>true}}
});
TL9b('tl9-26-ball',8,'VD','stat',[25,26],r=>{
  const a=r.int(2,3),b=r.int(2,3),n=a+b,all=n*(n-1)/2,xd=a*b,same=all-xd;
  const L=[...Array(a)].map((_,i)=>'X'+(i+1)).concat([...Array(b)].map((_,i)=>'Đ'+(i+1))),pr=[];for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)pr.push(L[i]+L[j]);
  return{kind:'tl',title:'Xác suất lấy bi',parts:[{pts:.5,html:`Một hộp có ${a} viên bi xanh (kí hiệu ${L.slice(0,a).join(', ')}) và ${b} viên bi đỏ (kí hiệu ${L.slice(a).join(', ')}). Lấy ngẫu nhiên đồng thời hai viên bi. Viết không gian mẫu của phép thử.`},{pts:.5,html:`Tính xác suất của các biến cố ${I('A')}: “Hai viên bi cùng màu” và ${I('B')}: “Có ít nhất một viên bi đỏ”.`}],
    sol:[ptxt([[`Ω = {${pr.join('; ')}}.`,.25],[`n(Ω) = ${all}.`,.25]]),ptxt([[`A có ${same} kết quả thuận lợi; P(A) = ${qh(Q(same,all))}.`,.25],[`B có ${all-a*(a-1)/2} kết quả thuận lợi; P(B) = ${qh(Q(all-a*(a-1)/2,all))}.`,.25]])],chk:()=>pr.length===all};
});
/* ---------- Bổ sung Bài 24 ---------- */
DS9b('ds9-24-grp',7,'TH',[24],r=>{
  for(;;){const g=r.pick(GRP9),N=r.pick([20,25,40,50]),ns=nsOf(r,g.k,N),mx=Math.max(...ns),im=ns.indexOf(mx),i=r.int(0,g.k-1),j=(i+1)%g.k;if(ns.filter(v=>v===mx).length>1)continue;const alt=ns.findIndex((v,k)=>k!==im&&v<mx);
    return mkDS(r,{stem:`Bảng tần số ghép nhóm về ${g.what}:<div class="figure">${grpTab(g,ns)}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Cỡ mẫu bằng ${N}.`,f:`Cỡ mẫu bằng ${g.k}.`,why:`${ns.join(' + ')} = ${N}.`},
      {t:`Nhóm ${grpH(g,i)} có độ dài ${g.w}.`,f:`Nhóm ${grpH(g,i)} có độ dài ${g.w*2}.`,why:`${g.lo+g.w*(i+1)} − ${g.lo+g.w*i} = ${g.w}.`},
      {t:`Tần số tương đối của nhóm ${grpH(g,j)} là ${pctH(ns[j]*100/N)}.`,f:`Tần số tương đối của nhóm ${grpH(g,j)} là ${pctH(ns[j])}.`,why:`${fr(ns[j],N)}·100% = ${pctH(ns[j]*100/N)}.`},
      {t:`Nhóm ${grpH(g,im)} có tần số lớn nhất.`,f:`Nhóm ${grpH(g,alt)} có tần số lớn nhất.`,why:`Tần số lớn nhất là ${mx}.`}],chk:()=>ns[j]*100/N!==ns[j]&&alt>=0})}
});
TLN9b('t9-24-tab',7,'TH',[24],r=>{
  const g=r.pick(GRP9),N=r.pick([20,25,40,50]),ns=nsOf(r,g.k,N),i=r.int(1,g.k-1),v=ns.slice(i).reduce((a,b)=>a+b,0)*100/N;
  return{kind:'tln',stem:`Bảng tần số ghép nhóm về ${g.what}:<div class="figure">${grpTab(g,ns)}</div>Có bao nhiêu phần trăm số đối tượng có số đo từ ${g.lo+g.w*i} ${g.unit} trở lên?`,ans:v,unit:'%',sol:`(${ns.slice(i).join(' + ')}) : ${N}·100% = ${pctH(v)}.`,chk:()=>isInt(v*100)};
});
