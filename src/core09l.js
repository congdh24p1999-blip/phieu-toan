/* ================================================================
   Toán 9: câu nhiều lựa chọn mức Vận dụng cho đề ôn thi vào lớp 10.
   Đề tuyển sinh 2026 dạng nhiều câu trắc nghiệm (Tuyên Quang 40 câu, Bắc Ninh, Đồng Tháp, Lào Cai)
   luôn có nhóm câu cuối ở mức vận dụng: bài toán thực tế, tổng hợp nhiều bước. Các dạng dưới đây
   theo đúng kiểu câu hỏi đó; câu chữ, số liệu do Xưởng đề Toán tự tạo, không chép từ đề nào.
   ================================================================ */
const pi314=3.14;
/* phương án là phân số: tự loại trùng, sắp tăng dần */
function mkFrac9(r,stem,correct,wrongs,sol,chk){
  const key=q=>q[0]+'/'+q[1],seen=new Set([key(correct)]),w=[];
  for(const q of r.shuffle(wrongs)){if(q[0]>0&&q[0]<q[1]&&!seen.has(key(q))){seen.add(key(q));w.push(q)}if(w.length===3)break}
  if(w.length<3)throw new Error('thiếu phương án phân số: '+stem);
  const all=[correct,...w].sort((a,b)=>a[0]/a[1]-b[0]/b[1]);
  return{kind:'nlc',stem,opts:all.map(qh),ans:all.findIndex(q=>key(q)===key(correct)),fixed:true,sol,chk};
}
/* biểu đồ tần số tương đối ghép nhóm (các cột liền nhau), in đen trắng */
function hist9SVG(g,pc){
  const W=340,H=180,ml=36,mb=30,mt=18,mr=10,pw=W-ml-mr,ph=H-mt-mb,top=Math.ceil(Math.max(...pc)/10)*10+10,bw=pw/(pc.length+1);
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Biểu đồ tần số tương đối ghép nhóm">`;
  for(let v=0;v<=top;v+=10){const y=mt+ph-ph*v/top;s+=`<line x1="${ml}" y1="${y}" x2="${W-mr}" y2="${y}" stroke="#bbb" stroke-width="0.6"/><text x="${ml-5}" y="${y+3.5}" font-size="9" text-anchor="end">${v}%</text>`}
  s+=`<line x1="${ml}" y1="${mt}" x2="${ml}" y2="${mt+ph}" stroke="#000"/><line x1="${ml}" y1="${mt+ph}" x2="${W-mr}" y2="${mt+ph}" stroke="#000"/>`;
  pc.forEach((p,i)=>{const x=ml+bw*(i+.5),h=ph*p/top,y=mt+ph-h;
    s+=`<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="#d0d0d0" stroke="#000" stroke-width="0.9"/><text x="${x+bw/2}" y="${y-3}" font-size="9.5" text-anchor="middle" font-weight="bold">${p}%</text>`});
  for(let i=0;i<=pc.length;i++){const x=ml+bw*(i+.5);s+=`<text x="${x}" y="${mt+ph+13}" font-size="9.5" text-anchor="middle">${g.lo+g.w*i}</text>`}
  s+=`<text x="${W-mr}" y="${H-3}" font-size="9" text-anchor="end" font-style="italic">${g.unit}</text>`;
  return s+'</svg>';
}

/* ---------- Ch. I: pha trộn theo tỉ lệ phần trăm (Bắc Ninh) ---------- */
N9('n9-v-mix',1,'VD',[3],r=>{
  for(;;){const a=r.int(3,8),p1=r.pick([2,3,4]),p2=p1+r.pick([1,2,3]),y=r.int(1,8),p=(p1*a+p2*y)/(a+y);if(y===a||!isInt(p*1000)||isInt(p))continue;
    const sc=r.int(0,1),what=sc?'nước muối':'sữa',tp=sc?'muối':'chất béo';
    return mkNum(r,{stem:`Bạn An có hai thùng ${what}: thùng thứ nhất có ${a} lít, tỉ lệ ${tp} là ${p1}%; thùng thứ hai có tỉ lệ ${tp} là ${p2}%. An đổ toàn bộ thùng thứ nhất và một lượng ${what} lấy từ thùng thứ hai vào một bình thì được hỗn hợp có tỉ lệ ${tp} là ${fmt(p)}%. Số lít ${what} An đã lấy từ thùng thứ hai là`,
      correct:y,cands:[a,y+1,y-1,y+2,a+y],f:v=>fmt(v)+' lít',ok:v=>v>0,
      sol:`Gọi y (lít) là lượng lấy từ thùng thứ hai: ${p1}%·${a} + ${p2}%·y = ${fmt(p)}%·(${a} + y) ⟺ ${fmt(p2-p)}y = ${fmt(Math.round((p-p1)*a*1000)/1000)} ⟺ y = ${y}.`,chk:()=>Math.abs(p1*a+p2*y-p*(a+y))<1e-9})}
});

/* ---------- Ch. I: giá dự định và giá sau khi giảm (Lào Cai) ---------- */
N9('n9-v-sale',1,'VD',[3],r=>{
  for(;;){const x=r.int(6,18),y=r.int(3,12),a=r.int(2,6),b=r.int(2,6),p=r.pick([10,20]),q=r.pick([5,10,20]),c=r.int(10,40),d=r.int(5,20);if(x===y||p===q)continue;
    const S1=a*x+b*y,S2=c*x*(100-p)/100+d*y*(100-q)/100;if(!isInt(S2*10))continue;const det=a*d*(100-q)-b*c*(100-p);if(!det)continue;
    return mkNum(r,{stem:`Theo dự định, An mua ${a} quyển vở và ${b} chiếc bút hết ${S1} nghìn đồng. Khi mua thực tế, giá mỗi quyển vở được giảm ${p}%, giá mỗi chiếc bút được giảm ${q}% nên An mua được ${c} quyển vở và ${d} chiếc bút hết ${fmt(S2)} nghìn đồng. Giá một chiếc bút khi chưa giảm là`,
      correct:y,cands:[x,y+1,y-1,y+2,Math.round(y*(100-q)/10)/10],f:v=>fmt(v)+' nghìn đồng',ok:v=>v>0,
      sol:`Gọi x, y (nghìn đồng) là giá một quyển vở, một chiếc bút khi chưa giảm: ${a}x + ${b}y = ${S1} và ${c}·${fmt((100-p)/100)}x + ${d}·${fmt((100-q)/100)}y = ${fmt(S2)}. Giải hệ được x = ${x}, y = ${y}.`,
      chk:()=>a*x+b*y===S1&&Math.abs(c*x*(100-p)/100+d*y*(100-q)/100-S2)<1e-9}) }
});

/* ---------- Ch. II: nghiệm nguyên lớn nhất của bất phương trình (Hải Phòng) ---------- */
N9('n9-v-intineq',2,'VD',[6],r=>{
  for(;;){const b=r.int(1,9),c=r.int(1,9),k=r.int(1,3),a=b+c+k,L=b*c/k,ans=isInt(L)?L-1:Math.floor(L);if(b===c)continue;
    return mkNum(r,{stem:`Nghiệm nguyên lớn nhất của bất phương trình ${I('x')}(${I('x')} + ${a}) &lt; (${I('x')} + ${b})(${I('x')} + ${c}) là`,
      correct:ans,cands:[ans+1,Math.ceil(L),b*c,ans-1],step:1,ok:v=>v>0,
      sol:`Khai triển: x² + ${a}x &lt; x² + ${b+c}x + ${b*c} ⟺ ${k===1?'':k}x &lt; ${b*c} ⟺ x &lt; ${qh(Q(b*c,k))}. Nghiệm nguyên lớn nhất là ${ans}.`,chk:()=>ans*k<b*c&&(ans+1)*k>=b*c})}
});

/* ---------- Ch. III: rút gọn biểu thức chứa căn về dạng (m√x + n)/x (Tuyên Quang) ---------- */
N9('n9-v-radform',3,'VD',[9],r=>{
  const k=r.int(1,3),p=r.int(1,3),q=r.pick([1,2,-1]),m=k,n=-k*k,v=p*m+q*n,x=I('x'),sx=rt(x);
  const term=`${p===1?'':p}${I('m')} ${q<0?'−':'+'} ${Math.abs(q)===1?'':Math.abs(q)}${I('n')}`;
  return mkNum(r,{stem:`Cho ${x} &gt; 0, ${x} ≠ ${k*k}. Biết (${fr(1,sx)} − ${fr(1,`${sx} + ${k}`)}) : ${fr(sx,`${x} − ${k*k}`)} = ${fr(`${I('m')}${sx} + ${I('n')}`,x)} với ${I('m')}, ${I('n')} là các số nguyên. Giá trị của ${term} bằng`,
    correct:v,cands:[p*m-q*n,p*m,q*n,v+k,-v],step:1,ok:()=>true,
    sol:`${fr(1,sx)} − ${fr(1,`${sx} + ${k}`)} = ${fr(k,`${sx}(${sx} + ${k})`)}; chia cho ${fr(sx,`(${sx} − ${k})(${sx} + ${k})`)} được ${fr(`${k===1?'':k}(${sx} − ${k})`,x)} = ${fr(`${k===1?'':k}${sx} − ${k*k}`,x)}. Vậy m = ${m}, n = ${n} và ${term} = ${v}.`,chk:()=>[1,4,9,16].every(t=>Math.abs((1/Math.sqrt(t+1)-1/(Math.sqrt(t+1)+k))/(Math.sqrt(t+1)/(t+1-k*k))-(m*Math.sqrt(t+1)+n)/(t+1))<1e-9||t+1===k*k)})
});

/* ---------- Ch. IV: khinh khí cầu bay thẳng đứng, hai lần quan sát (Bắc Ninh) ---------- */
N9('n9-v-balloon',4,'VD',[12],r=>{
  for(;;){const d=r.pick([200,300,400,500,600]),a=r.int(18,32),b=r.int(45,65),D=Math.PI/180,h=d*(Math.tan(b*D)-Math.tan(a*D)),ans=Math.round(h);if(Math.abs(h-ans)>.4)continue;
    return mkNum(r,{stem:`Một người đứng tại điểm ${I('B')} trên mặt đất, cách điểm ${I('C')} một khoảng ${d} m theo phương nằm ngang. Một khinh khí cầu bay thẳng đứng lên từ phía trên điểm ${I('C')}. Lần thứ nhất người đó nhìn khinh khí cầu với góc nâng ${a}°, lần thứ hai với góc nâng ${b}°. Giữa hai lần quan sát, khinh khí cầu đã bay lên thêm khoảng (làm tròn đến hàng đơn vị của mét)`,
      correct:ans,cands:[Math.round(d*Math.tan(b*D)),Math.round(d*Math.tan(a*D)),Math.round(d*(Math.sin(b*D)-Math.sin(a*D))),Math.round(d*Math.tan((b-a)*D))],f:v=>fmt(v)+' m',ok:v=>v>0&&Math.abs(v-ans)>2,
      sol:`Độ cao lần thứ nhất ${d}·tan ${a}°, lần thứ hai ${d}·tan ${b}°. Khinh khí cầu bay lên thêm ${d}(tan ${b}° − tan ${a}°) ≈ ${ans} m.`,chk:()=>true})}
});

/* ---------- Ch. V: tấm bìa hình chữ nhật khoét hình tròn (Bắc Ninh) ---------- */
N9('n9-v-board',5,'VD',[15],r=>{
  const [u,v]=r.pick([[4,3],[5,3],[5,4],[6,4],[6,5]]),x=r.int(2,8),S=u*v*x*x,rem=S-pi314*x*x,ans=Math.round(rem);
  return mkNum(r,{stem:`Một tấm bìa hình chữ nhật có chiều dài ${u}${I('x')} (cm), chiều rộng ${v}${I('x')} (cm) và diện tích ${S} cm². Người ta khoét bỏ một hình tròn bán kính ${I('x')} (cm) ở chính giữa tấm bìa. Diện tích phần bìa còn lại là (lấy π ≈ 3,14; làm tròn đến hàng đơn vị)`,
    correct:ans,cands:[Math.round(S-2*pi314*x),Math.round(S-pi314*4*x*x),Math.round(pi314*x*x),Math.round(S-pi314*x)],f:t=>fmt(t)+' cm²',ok:t=>t>0&&t!==S,
    sol:`${u*v}${I('x')}² = ${S} ⇒ ${I('x')}² = ${x*x} ⇒ ${I('x')} = ${x}. Diện tích hình tròn ≈ 3,14·${x*x} = ${fmt(pi314*x*x)} cm². Phần còn lại ≈ ${S} − ${fmt(pi314*x*x)} ≈ ${ans} cm².`,chk:()=>u*v*x*x===S})
});

/* ---------- Ch. V: tiếp tuyến cắt nhau, diện tích tứ giác ABOC (Hải Phòng) ---------- */
N9('n9-v-kite',5,'VD',[16],r=>{
  const R=r.int(2,9),sc=r.int(0,1);
  if(sc===0){const ans=R*R;   /* góc BAC = 90°: ABOC là hình vuông */
    return mkNum(r,{stem:`Từ điểm ${I('A')} nằm ngoài đường tròn (${I('O')}; ${R} cm) kẻ hai tiếp tuyến ${I('AB')}, ${I('AC')} (${I('B')}, ${I('C')} là các tiếp điểm) sao cho ${I('AB')} ⊥ ${I('AC')}. Diện tích tứ giác ${I('ABOC')} bằng`,
      correct:ans,cands:[2*ans,ans/2,4*R,2*R],f:t=>fmt(t)+' cm²',ok:t=>t>0,
      sol:`Tứ giác ABOC có ba góc vuông (tại A, B, C) và OB = OC = ${R} nên là hình vuông cạnh ${R} cm; diện tích ${ans} cm².`,chk:()=>true})}
  const ans=2*R;   /* tam giác ABC đều ⇒ góc BAO = 30°, OA = 2R */
  return mkNum(r,{stem:`Từ điểm ${I('A')} nằm ngoài đường tròn (${I('O')}; ${R} cm) kẻ hai tiếp tuyến ${I('AB')}, ${I('AC')} (${I('B')}, ${I('C')} là các tiếp điểm). Biết tam giác ${I('ABC')} là tam giác đều. Độ dài đoạn ${I('OA')} bằng`,
    correct:ans,cands:[R,3*R,R*Math.SQRT2,R*Math.sqrt(3)],f:t=>isInt(t)?fmt(t)+' cm':(Math.abs(t-R*Math.SQRT2)<1e-9?`${R}${rt(2)} cm`:`${R}${rt(3)} cm`),ok:t=>t>0,
    sol:`Tam giác ABC đều nên góc BAC = 60°; AO là phân giác nên góc OAB = 30°. Tam giác OAB vuông tại B có OB = ${R} là cạnh đối diện góc 30° nên OA = 2·OB = ${ans} cm.`,chk:()=>true});
});

/* ---------- Ch. VI: diện tích tam giác OBC với B, C trên parabol (Tuyên Quang) ---------- */
N9('n9-v-parea',6,'VD',[18],r=>{
  for(;;){const [an,ad]=r.pick([[1,2],[-1,2],[1,1],[-1,1],[2,1],[-2,1],[1,4],[-1,4]]),x0=r.int(1,4),y0=an*x0*x0/ad;if(!isInt(y0))continue;
    const ans=x0*Math.abs(y0),co=(an<0?'−':'')+(ad===1?(Math.abs(an)===1?'':Math.abs(an)):fr(Math.abs(an),ad));
    return mkNum(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho parabol (${I('P')}): ${I('y')} = ${co}${I('x')}² và hai điểm ${I('B')}, ${I('C')} phân biệt thuộc (${I('P')}) cùng có tung độ bằng ${sgf9(y0)}. Diện tích tam giác ${I('OBC')} bằng`,
      correct:ans,cands:[2*ans,ans/2,x0*x0,Math.abs(y0)],ok:t=>t>0,
      sol:`${sgf9(y0)} = ${co}x² ⇒ x² = ${x0*x0} ⇒ x = ±${x0}; BC = ${2*x0}. Khoảng cách từ O đến BC là ${Math.abs(y0)}. S = ${fr(1,2)}·${2*x0}·${Math.abs(y0)} = ${ans}.`,chk:()=>an*x0*x0/ad===y0})}
});

/* ---------- Ch. VI: đại lượng tỉ lệ với bình phương (Bắc Ninh) ---------- */
N9('n9-v-sq',6,'VD',[18],r=>{
  for(;;){const a=r.pick([4,5,8,10,12,20]),v1=r.int(2,6),v2=r.int(3,10);if(v1===v2)continue;const F1=a*v1*v1,F2=a*v2*v2,sc=r.int(0,1);
    const stem=sc?`Lực ${I('F')} (N) của gió tác động vuông góc lên cánh buồm của một con thuyền tỉ lệ thuận với bình phương tốc độ ${I('v')} (m/s) của gió, tức là ${I('F')} = ${I('a')}${I('v')}² (${I('a')} là hằng số). Biết khi tốc độ gió bằng ${v1} m/s thì lực tác động lên cánh buồm là ${F1} N. Khi tốc độ gió bằng ${v2} m/s thì lực tác động lên cánh buồm là`
      :`Lực cản ${I('F')} (N) của không khí tác dụng lên một xe đua tỉ lệ thuận với bình phương tốc độ ${I('v')} (m/s) của xe: ${I('F')} = ${I('a')}${I('v')}² (${I('a')} là hằng số). Biết khi xe chạy với tốc độ ${v1} m/s thì lực cản là ${F1} N. Khi xe chạy với tốc độ ${v2} m/s thì lực cản là`;
    return mkNum(r,{stem,correct:F2,cands:[F1*v2/v1,a*v2,F1+a*(v2-v1),F1*v2],f:t=>vnd9(Math.round(t*100)/100)+' N',ok:t=>t>0&&isInt(t),
      sol:`${F1} = a·${v1}² ⇒ a = ${a}. Khi v = ${v2}: F = ${a}·${v2}² = ${F2} N.`,chk:()=>a*v1*v1===F1})}
});

/* ---------- Ch. VII: biểu đồ tần số tương đối ghép nhóm (Bắc Ninh) ---------- */
const HG9=[{q:'chiều cao',unit:'cm',lo:145,w:5,k:5,who:'học sinh lớp 9',obj:'học sinh'},{q:'cân nặng',unit:'kg',lo:40,w:5,k:5,who:'học sinh lớp 9',obj:'học sinh'},
  {q:'thời gian tự học mỗi ngày',unit:'phút',lo:0,w:20,k:5,who:'học sinh lớp 9',obj:'học sinh'},{q:'chiều dài',unit:'cm',lo:10,w:10,k:5,who:'chiếc lá dương xỉ trưởng thành',obj:'chiếc lá'}];
N9('n9-v-hist',7,'VD',[24],r=>{
  for(;;){const g=r.pick(HG9),N=r.pick([25,50,100]),k=g.k;
    const pc=[...Array(k)].map(()=>r.int(1,7)*4);const s=pc.reduce((a,b)=>a+b,0);if(s>=100)continue;pc[r.int(0,k-1)]+=100-s;if(pc.some(p=>p>48)||!pc.every(p=>isInt(N*p/100)))continue;
    const i=r.int(0,k-2),j=i+1,cnt=N*(pc[i]+pc[j])/100;
    return mkNum(r,{stem:`Khảo sát ${g.q} của ${N} ${g.who}, người ta vẽ được biểu đồ tần số tương đối ghép nhóm sau (đơn vị trên trục ngang: ${g.unit}):<div class="figure">${hist9SVG(g,pc)}</div>Số ${g.obj} có ${g.q} từ ${g.lo+g.w*i} ${g.unit} đến dưới ${g.lo+g.w*(j+1)} ${g.unit} là`,
      correct:cnt,cands:[N*pc[i]/100,N*pc[j]/100,pc[i]+pc[j],N*(pc[i]+pc[j]+(pc[j+1]||0))/100],step:1,f:t=>fmt(t),ok:t=>t>0&&isInt(t)&&t<=N,
      sol:`Hai nhóm ${grpH(g,i)} và ${grpH(g,j)} chiếm ${pc[i]}% + ${pc[j]}% = ${pc[i]+pc[j]}%; số ${g.obj}: ${pc[i]+pc[j]}%·${N} = ${cnt}.`,chk:()=>pc.reduce((a,b)=>a+b,0)===100})}
});

/* ---------- Ch. VIII: xác suất chọn số chia hết cho ít nhất một trong hai số (Tuyên Quang) ---------- */
N9('n9-v-div',8,'VD',[26],r=>{
  const [a,b]=r.pick([[2,3],[2,5],[3,4],[3,5],[4,5],[5,6],[4,6],[2,7]]),dg=r.pick([2,3]),lo=10**(dg-1),hi=10**dg-1,T=hi-lo+1;
  const cnt=f=>{let c=0;for(let n=lo;n<=hi;n++)if(f(n))c++;return c};
  const A=cnt(n=>n%a===0),B=cnt(n=>n%b===0),AB=cnt(n=>n%a===0&&n%b===0),U=A+B-AB;
  const q=x=>Q(x,T);
  return mkFrac9(r,`Chọn ngẫu nhiên một số tự nhiên có ${dg} chữ số. Xác suất để số được chọn chia hết cho ít nhất một trong hai số ${a} và ${b} là`,q(U),[q(A+B),q(AB),q(A),q(B),q(T-U)],
    `Có ${T} số có ${dg} chữ số. Số chia hết cho ${a}: ${A}; cho ${b}: ${B}; cho cả ${a} và ${b}: ${AB}. Số thuận lợi: ${A} + ${B} − ${AB} = ${U}. P = ${fr(U,T)} = ${qh(q(U))}.`,()=>U===cnt(n=>n%a===0||n%b===0));
});

/* ---------- Ch. X: bể cá dạng hình cầu (Tuyên Quang) ---------- */
N9b('n9-v-bowl',10,'VD',[32],r=>{
  for(;;){const D=r.pick([20,22,24,26,28,30]),[k,n]=r.pick([[1,2],[2,3],[3,4],[3,5],[4,5]]),R=D/2,V=4/3*pi314*R**3*k/n/1000,ans=Math.round(V*100)/100;if(Math.abs(V*100-Math.round(V*100))>.45)continue;
    return mkNum(r,{stem:`Một bể nuôi cá cảnh có dạng một phần hình cầu, đường kính ${D} cm. Người ta đổ nước vào bể sao cho lượng nước bằng ${fr(k,n)} thể tích của hình cầu. Lượng nước cần đổ vào bể là (lấy π ≈ 3,14; làm tròn đến hàng phần trăm của lít)`,
      correct:ans,cands:[Math.round(4/3*pi314*R**3/1000*100)/100,Math.round(4/3*pi314*D**3*k/n/1000*100)/100,Math.round(4/3*pi314*R**3*(n-k)/n/1000*100)/100,Math.round(4*pi314*R*R*k/n/1000*100)/100],f:t=>fmt(t)+' lít',ok:t=>t>0&&Math.abs(t-ans)>.05,
      sol:`Bán kính ${R} cm; thể tích hình cầu ${fr(4,3)}·3,14·${R}³ ≈ ${fmt(Math.round(4/3*pi314*R**3*100)/100)} cm³. Lượng nước: ${fr(k,n)} thể tích đó ≈ ${fmt(Math.round(V*100000)/100)} cm³ ≈ ${fmt(ans)} lít.`,chk:()=>true})}
});

/* ---------- Ch. X: thả viên bi vào ly hình nón (Lào Cai) ---------- */
N9b('n9-v-cone',10,'VD',[31,32],r=>{
  for(;;){const H=r.pick([12,15,16,18,20]),R=r.pick([4,5,6,7]),h1=r.int(Math.ceil(H*.4),Math.floor(H*.7)),rb=r.pick([1,1.5,2]);
    const h2=Math.cbrt(h1**3+4*H*H*rb**3/(R*R)),dh=h2-h1,sina=R/Math.hypot(R,H);if(h2>H-.5||rb/sina+rb>h2-.2||dh<.15)continue;
    const ans=Math.round(dh*100)/100,rs=R*h1/H,cyl=Math.round(4/3*rb**3/(rs*rs)*100)/100;if(Math.abs(cyl-ans)<.03)continue;
    return mkNum(r,{stem:`Một chiếc ly có phần đựng nước dạng hình nón (đỉnh ở dưới) cao ${H} cm, bán kính miệng ly ${R} cm. Mực nước trong ly cao ${h1} cm tính từ đỉnh nón. Thả vào ly một viên bi hình cầu bán kính ${fmt(rb)} cm thì viên bi chìm hoàn toàn và nước không tràn ra. Mực nước trong ly dâng thêm khoảng (làm tròn đến hàng phần trăm)`,
      correct:ans,cands:[cyl,Math.round(4/3*rb**3/(R*R)*100)/100,Math.round(2*rb*100)/100,Math.round(dh*300)/100],f:t=>fmt(t)+' cm',ok:t=>t>0&&Math.abs(t-ans)>.02,
      sol:`Khi nước cao h thì thể tích nước (kể cả bi) là ${fr(`π·${R}²·h³`,`3·${H}²`)}. Thể tích tăng đúng bằng thể tích bi: h³ = ${h1}³ + ${fr(`4·${H}²·${fmt(rb)}³`,`${R}²`)} ⇒ h ≈ ${fmt(Math.round(h2*100)/100)} cm. Mực nước dâng thêm ≈ ${fmt(ans)} cm.`,chk:()=>Math.abs(h2**3-h1**3-4*H*H*rb**3/(R*R))<1e-6})}
});
