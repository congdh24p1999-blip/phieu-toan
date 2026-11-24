/* ================================================================
   LỚP 6 – học kì II
   Chương VIII: Những hình hình học cơ bản (Bài 32 – 37)
   Chương IX: Dữ liệu và xác suất thực nghiệm (Bài 38 – 43)
   ================================================================ */
/* điểm trên một đường thẳng: ps = [[tên, toạ độ]] */
const fig6Line=(ps,o={})=>{const P={},xs=ps.map(p=>p[1]),lo=Math.min(...xs),hi=Math.max(...xs),ext=(hi-lo)*.12||1;ps.forEach(([n,x])=>P[n]=[x,0]);
  return fig9(P,{segs:[[[o.ray!==undefined?o.ray:lo-ext,0],[hi+ext,0]]],lc:[(lo+hi)/2,1],w:o.w||260,h:60,pad:14,texts:o.texts||[],off:Object.fromEntries(ps.map(([n])=>[n,[0,-8]]))})};
/* góc xOy có số đo a (độ) */
const fig6Ang=(a,lab)=>fig9({O:[0,0],x:[1,0],y:[Math.cos(a*Math.PI/180),Math.sin(a*Math.PI/180)]},{segs:[['O','x'],['O','y']],angs:[['x','O','y',lab||'',16]],lc:[Math.cos(a*Math.PI/360)*.4,Math.sin(a*Math.PI/360)*.4],w:150,h:110,nodot:['x','y']});
/* biểu đồ cột kép */
function bar2SVG(cats,v1,v2,names){
  const W=340,H=185,ml=34,mb=40,mt=14,mr=8,mx=Math.max(...v1,...v2),step=niceStep(mx),top=Math.ceil(mx/step)*step+(mx%step===0?step:0),pw=W-ml-mr,ph_=H-mt-mb,bw=pw/cats.length*0.32;
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Biểu đồ cột kép">`;
  for(let v=0;v<=top;v+=step){const y=mt+ph_-ph_*v/top;s+=`<line x1="${ml}" y1="${y}" x2="${W-mr}" y2="${y}" stroke="#bbb" stroke-width="0.6"/><text x="${ml-5}" y="${y+3.5}" font-size="9" text-anchor="end">${v}</text>`}
  s+=`<line x1="${ml}" y1="${mt}" x2="${ml}" y2="${mt+ph_}" stroke="#000"/><line x1="${ml}" y1="${mt+ph_}" x2="${W-mr}" y2="${mt+ph_}" stroke="#000"/>`;
  cats.forEach((c,i)=>{const cx=ml+pw/cats.length*(i+.5);[[v1[i],'#555',-1],[v2[i],'#ccc',0]].forEach(([v,col,o])=>{const h=ph_*v/top;s+=`<rect x="${cx+o*bw}" y="${mt+ph_-h}" width="${bw}" height="${h}" fill="${col}" stroke="#000" stroke-width="0.7"/><text x="${cx+o*bw+bw/2}" y="${mt+ph_-h-2}" font-size="8.5" text-anchor="middle">${v}</text>`});
    s+=`<text x="${cx}" y="${mt+ph_+12}" font-size="9" text-anchor="middle">${c}</text>`});
  s+=`<rect x="${ml+10}" y="${H-14}" width="9" height="9" fill="#555" stroke="#000" stroke-width="0.6"/><text x="${ml+23}" y="${H-6}" font-size="9">${names[0]}</text><rect x="${ml+130}" y="${H-14}" width="9" height="9" fill="#ccc" stroke="#000" stroke-width="0.6"/><text x="${ml+143}" y="${H-6}" font-size="9">${names[1]}</text>`;
  return s+'</svg>';
}
/* biểu đồ tranh: mỗi biểu tượng ứng với k đơn vị */
const pict6=(cats,vals,k,lab)=>`<table class="dt"><tr><th>${lab}</th><th>Số lượng</th></tr>${cats.map((c,i)=>`<tr><td>${c}</td><td style="text-align:left;letter-spacing:2px">${'★'.repeat(vals[i]/k)}</td></tr>`).join('')}<tr><td colspan="2" style="text-align:left">★ = ${k}</td></tr></table>`;
const PICT6=[{lab:'Lớp',cats:['6A','6B','6C','6D'],what:'số cây xanh mỗi lớp trồng được'},{lab:'Ngày',cats:['Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu'],what:'số xe đạp gửi trong bãi xe của trường'},{lab:'Loại quả',cats:['Cam','Xoài','Táo','Chuối'],what:'loại quả yêu thích của học sinh lớp 6A'}];
const BAR6=[{lab:'Môn',cats:['Bóng đá','Cầu lông','Bơi','Bóng rổ'],what:'môn thể thao yêu thích của học sinh khối 6'},{lab:'Tháng',cats:['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5'],what:'số sách thư viện cho mượn'},{lab:'Lớp',cats:['6A','6B','6C','6D','6E'],what:'số học sinh đạt điểm giỏi môn Toán'}];

/* ===================== Bài 32 – 35: Điểm, đường thẳng, tia, đoạn thẳng, trung điểm ===================== */
N6b('k6-32-count',8,'TH',[32,34],r=>{
  const n=r.int(4,12),t=r.chance(.5),v=n*(n-1)/2;
  return mkNum(r,{stem:`Cho ${n} điểm, trong đó không có ba điểm nào thẳng hàng. Số ${t?'đường thẳng đi qua hai trong các điểm đó':'đoạn thẳng có hai đầu mút là hai trong các điểm đó'} là`,correct:v,cands:[n*(n-1),n,n*(n+1)/2,v-1],ok:x=>x>0,
    sol:`Mỗi điểm nối với ${n-1} điểm còn lại; mỗi ${t?'đường thẳng':'đoạn thẳng'} được tính hai lần nên có ${n}·${n-1} : 2 = ${v}.`,chk:()=>true});
});
N6b('k6-32-belong',8,'NB',[32],r=>{
  const t=r.int(0,2),Q_=[['Qua hai điểm phân biệt có','một và chỉ một đường thẳng.',['vô số đường thẳng.','hai đường thẳng.','không có đường thẳng nào.']],['Ba điểm thẳng hàng là ba điểm','cùng thuộc một đường thẳng.',['tạo thành một tam giác.','không cùng thuộc một đường thẳng nào.','cách đều nhau.']],['Hai đường thẳng phân biệt có một điểm chung được gọi là hai đường thẳng','cắt nhau.',['song song.','trùng nhau.','thẳng hàng.']]][t];
  return mkTxt(r,{stem:Q_[0],correct:Q_[1],wrongs:Q_[2],sol:'Theo các khái niệm về điểm và đường thẳng.',chk:()=>true});
});
N6b('k6-33-ray',8,'NB',[33],r=>{
  const t=r.chance(.5);
  if(t)return mkTxt(r,{stem:`Cho ba điểm ${I('A')}, ${I('O')}, ${I('B')} thẳng hàng theo thứ tự đó (hình vẽ).${fig6Line([['A',0],['O',2],['B',5]])}Khẳng định nào sau đây đúng?`,correct:`Hai tia ${I('OA')} và ${I('OB')} đối nhau.`,wrongs:[`Hai tia ${I('OA')} và ${I('OB')} trùng nhau.`,`Điểm ${I('A')} nằm giữa hai điểm ${I('O')} và ${I('B')}.`,`Hai tia ${I('AO')} và ${I('BO')} trùng nhau.`],sol:'O nằm giữa A và B nên hai tia OA, OB là hai tia đối nhau.',chk:()=>true});
  return mkTxt(r,{stem:`Cho ba điểm ${I('M')}, ${I('N')}, ${I('P')} thẳng hàng, ${I('N')} nằm giữa ${I('M')} và ${I('P')} (hình vẽ).${fig6Line([['M',0],['N',3],['P',5]])}Khẳng định nào sau đây đúng?`,correct:`Hai tia ${I('MN')} và ${I('MP')} trùng nhau.`,wrongs:[`Hai tia ${I('MN')} và ${I('MP')} đối nhau.`,`Hai tia ${I('NM')} và ${I('NP')} trùng nhau.`,`Điểm ${I('M')} nằm giữa ${I('N')} và ${I('P')}.`],sol:'N, P cùng nằm về một phía đối với M nên tia MN và tia MP trùng nhau.',chk:()=>true});
});
N6b('k6-34-len',8,'TH',[34],r=>{
  const a=r.int(2,12),b=r.pick([2,3,4,5,6,7,8,9,10,11,12].filter(v=>v!==a)),t=r.chance(.5);
  if(t)return mkNum(r,{stem:`Điểm ${I('M')} nằm giữa hai điểm ${I('A')} và ${I('B')}, ${I('AM')} = ${a} cm, ${I('AB')} = ${a+b} cm. Độ dài đoạn ${I('MB')} là`,correct:b,f:v=>v+' cm',cands:[a+b,2*a+b,Math.abs(a-b)||a+1,a],ok:x=>x>0,sol:`MB = AB − AM = ${a+b} − ${a} = ${b} (cm).`,chk:()=>b!==a});
  return mkNum(r,{stem:`Điểm ${I('C')} nằm giữa hai điểm ${I('A')} và ${I('B')}, ${I('AC')} = ${a} cm, ${I('CB')} = ${b} cm. Độ dài đoạn ${I('AB')} là`,correct:a+b,f:v=>v+' cm',cands:[Math.abs(a-b)||a+b+1,a*b,2*(a+b),a+b+2],ok:x=>x>0,sol:`AB = AC + CB = ${a} + ${b} = ${a+b} (cm).`,chk:()=>true});
});
N6b('k6-35-mid',8,'TH',[35],r=>{
  const a=r.int(2,15),t=r.chance(.5);
  return mkNum(r,{stem:t?`Cho ${I('M')} là trung điểm của đoạn thẳng ${I('AB')}, ${I('AM')} = ${a} cm. Độ dài đoạn ${I('AB')} là`:`Cho ${I('M')} là trung điểm của đoạn thẳng ${I('AB')}, ${I('AB')} = ${2*a} cm. Độ dài đoạn ${I('MB')} là`,correct:t?2*a:a,f:v=>v+' cm',cands:t?[a,a/2,4*a,a+2].filter(isInt):[2*a,4*a,a+1,a-1].filter(x=>x>0),ok:x=>x>0,
    sol:t?`AB = 2·AM = ${2*a} (cm).`:`MB = AB : 2 = ${a} (cm).`,chk:()=>true});
});
/* ===================== Bài 36 – 37: Góc, số đo góc ===================== */
N6b('k6-36-type',8,'NB',[36,37],r=>{
  const a=r.pick([25,40,55,70,90,90,105,120,150,180]),T_=a<90?'góc nhọn':a===90?'góc vuông':a<180?'góc tù':'góc bẹt';
  return mkTxt(r,{stem:`Góc có số đo ${a}° là`,correct:T_,wrongs:['góc nhọn','góc vuông','góc tù','góc bẹt'].filter(x=>x!==T_),sol:'Góc nhọn: nhỏ hơn 90°; góc vuông: 90°; góc tù: lớn hơn 90° và nhỏ hơn 180°; góc bẹt: 180°.',chk:()=>true});
});
N6b('k6-37-clock',8,'TH',[37],r=>{
  const h=r.pick([1,2,3,4,5,7,8,9,10,11]),a=Math.min(30*h,360-30*h);
  return mkNum(r,{stem:`Lúc ${h} giờ đúng, góc tạo bởi kim giờ và kim phút (góc không lớn hơn 180°) có số đo là`,correct:a,f:v=>v+'°',cands:[30*h===a?360-a:30*h,a+30,a-30,h*10].filter(x=>x>0&&x<=180&&x!==a),ok:x=>x>0&&x<=180,
    sol:`Mỗi khoảng giữa hai số liền nhau trên mặt đồng hồ ứng với 30°; lúc ${h} giờ hai kim cách nhau ${Math.min(h,12-h)} khoảng: ${Math.min(h,12-h)}·30° = ${a}°.`,chk:()=>true});
});
N6b('k6-37-read',8,'NB',[36,37],r=>{
  const a=r.pick([30,40,50,60,70,110,120,130,140,150]);
  return mkNum(r,{stem:`Số đo của góc ${I('xOy')} trong hình vẽ (đo bằng thước đo góc) gần nhất với giá trị nào sau đây?${fig6Ang(a)}`,correct:a,f:v=>v+'°',cands:[180-a,a+40>=180?a-40:a+40,90,a<90?a+90:a-90].filter(x=>x>0&&x<180&&Math.abs(x-a)>=30),ok:x=>x>0,sol:`Góc xOy là góc ${a<90?'nhọn':'tù'}, số đo khoảng ${a}°.`,chk:()=>true});
});
/* ---------- Đúng/sai chương VIII ---------- */
DS6b('ds6-35-mid',8,'TH',[34,35],r=>{
  const a=r.int(2,8),b=a+r.int(2,8);
  return mkDS(r,{stem:`Trên tia ${I('Ox')} lấy hai điểm ${I('A')}, ${I('B')} sao cho ${I('OA')} = ${a} cm, ${I('OB')} = ${b} cm (hình vẽ).${fig6Line([['O',0],['A',a],['B',b]],{ray:0,texts:[[[b+ (b)*.12,0],'x',4,-6]]})}Gọi ${I('M')} là trung điểm của ${I('AB')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Điểm ${I('A')} nằm giữa hai điểm ${I('O')} và ${I('B')}.`,f:`Điểm ${I('B')} nằm giữa hai điểm ${I('O')} và ${I('A')}.`,why:`OA < OB và A, B cùng thuộc tia Ox.`},
    {t:`${I('AB')} = ${b-a} cm.`,f:`${I('AB')} = ${a+b} cm.`,why:`AB = OB − OA = ${b-a}.`},
    {t:`${I('AM')} = ${fmt((b-a)/2)} cm.`,f:`${I('AM')} = ${b-a} cm.`,why:`AM = AB : 2.`},
    {t:`${I('OM')} = ${fmt((a+b)/2)} cm.`,f:`${I('OM')} = ${fmt((b-a)/2)} cm.`,why:`OM = OA + AM = ${a} + ${fmt((b-a)/2)} = ${fmt((a+b)/2)}.`}],chk:()=>true});
});
DS6b('ds6-37-angle',8,'NB',[36,37],r=>{
  const a=r.pick([35,45,60,75]),b=r.pick([100,120,135,150]);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`Góc có số đo ${a}° là góc nhọn.`,f:`Góc có số đo ${a}° là góc tù.`,why:`${a}° < 90°.`},
    {t:`Góc có số đo ${b}° là góc tù.`,f:`Góc có số đo ${b}° là góc nhọn.`,why:`90° < ${b}° < 180°.`},
    {t:`Góc bẹt có số đo 180°.`,f:`Góc bẹt có số đo 90°.`,why:`Hai cạnh của góc bẹt là hai tia đối nhau.`},
    {t:`Lúc 3 giờ đúng, kim giờ và kim phút tạo thành một góc vuông.`,f:`Lúc 3 giờ đúng, kim giờ và kim phút tạo thành một góc bẹt.`,why:`3·30° = 90°.`}],chk:()=>true});
});
/* ---------- Trả lời ngắn chương VIII ---------- */
TLN6b('t6-34-len',8,'TH',[34,35],r=>{
  const a=r.int(2,9),b=a+r.int(2,9),t=r.chance(.5);
  return{kind:'tln',stem:t?`Trên tia ${I('Ox')} lấy hai điểm ${I('A')}, ${I('B')} sao cho ${I('OA')} = ${a} cm, ${I('OB')} = ${b} cm. Tính độ dài đoạn ${I('AB')} (đơn vị: cm).`:`Cho đoạn thẳng ${I('AB')} = ${2*b} cm và ${I('M')} là trung điểm của ${I('AB')}. Tính độ dài đoạn ${I('AM')} (đơn vị: cm).`,ans:t?b-a:b,unit:'cm',
    sol:t?`A nằm giữa O và B nên AB = OB − OA = ${b-a} (cm).`:`AM = AB : 2 = ${b} (cm).`,chk:()=>true};
});
TLN6b('t6-35-opp',8,'TH',[33,35],r=>{
  const a=r.int(2,9),b=r.int(2,9);
  return{kind:'tln',stem:`Trên đường thẳng ${I('xy')} lấy điểm ${I('O')}. Trên tia ${I('Ox')} lấy điểm ${I('A')} với ${I('OA')} = ${a} cm, trên tia ${I('Oy')} lấy điểm ${I('B')} với ${I('OB')} = ${b} cm. Tính độ dài đoạn ${I('AB')} (đơn vị: cm).`,ans:a+b,unit:'cm',sol:`Ox, Oy là hai tia đối nhau nên O nằm giữa A và B: AB = OA + OB = ${a+b} (cm).`,chk:()=>true};
});
TLN6b('t6-32-count',8,'VD',[32,34,36],r=>{
  const t=r.int(0,2),n=r.int(5,20),v=n*(n-1)/2;
  if(t===2){const N=v;return{kind:'tln',stem:`Cho ${I('n')} điểm, trong đó không có ba điểm nào thẳng hàng. Vẽ các đường thẳng đi qua từng cặp điểm thì được tất cả ${N} đường thẳng. Tìm ${I('n')}.`,ans:n,unit:'',sol:`n(n − 1) : 2 = ${N} ⟺ n(n − 1) = ${2*N} = ${n}·${n-1} ⇒ n = ${n}.`,chk:()=>true}}
  return{kind:'tln',stem:t?`Cho ${n} tia chung gốc, không có hai tia nào trùng nhau. Có bao nhiêu góc được tạo thành (mỗi góc có hai cạnh là hai trong các tia đó)?`:`Cho ${n} điểm, trong đó không có ba điểm nào thẳng hàng. Có bao nhiêu đoạn thẳng có hai đầu mút là hai trong các điểm đó?`,ans:v,unit:'',sol:`${n}·${n-1} : 2 = ${v}.`,chk:()=>true};
});
TLN6b('t6-37-clock',8,'VD',[37],r=>{
  const h=r.pick([1,2,4,5,7,8,10,11]),m=r.pick([0,30]),a=Math.abs(30*h+m/2-6*m),v=Math.min(a,360-a);
  return{kind:'tln',stem:`Lúc ${h} giờ ${m?'30 phút':'đúng'}, góc tạo bởi kim giờ và kim phút (góc không lớn hơn 180°) có số đo bằng bao nhiêu độ?`,ans:v,unit:'°',
    sol:m?`Kim phút chỉ số 6 (180°); kim giờ ở giữa số ${h} và ${h+1} (${30*h+15}°). Góc giữa hai kim: ${v}°.`:`Hai kim cách nhau ${Math.min(h,12-h)} khoảng, mỗi khoảng 30°: ${v}°.`,chk:()=>true};
});
/* ---------- Tự luận hình học chương VIII (role geo) ---------- */
TL6b('tl6-35-ray',8,'TH','geo',[33,34,35],r=>{
  const a=r.int(2,6),b=a+2*r.int(1,4);
  return{kind:'tl',title:'Đoạn thẳng và trung điểm',parts:[{pts:.5,html:`Trên tia ${I('Ox')} lấy hai điểm ${I('A')} và ${I('B')} sao cho ${I('OA')} = ${a} cm, ${I('OB')} = ${b} cm. Trong ba điểm ${I('O')}, ${I('A')}, ${I('B')}, điểm nào nằm giữa hai điểm còn lại? Tính độ dài đoạn ${I('AB')}.`},{pts:.5,html:`Gọi ${I('M')} là trung điểm của đoạn ${I('AB')}. Tính độ dài đoạn ${I('OM')}.`}],
    sol:[ptxt([[`A, B cùng thuộc tia Ox và OA < OB nên A nằm giữa O và B.`,.25],[`AB = OB − OA = ${b} − ${a} = ${b-a} (cm).`,.25]]),ptxt([[`M là trung điểm của AB nên AM = AB : 2 = ${(b-a)/2} (cm).`,.25],[`M nằm giữa A và B, A nằm giữa O và M nên OM = OA + AM = ${a} + ${(b-a)/2} = ${a+(b-a)/2} (cm).`,.25]])],chk:()=>true};
});
TL6b('tl6-35-opp',8,'VD','geo',[33,34,35],r=>{
  const a=r.int(2,8),b=r.int(2,8),c=r.int(1,a-1||1);
  return{kind:'tl',title:'Tia đối nhau và trung điểm',parts:[{pts:.5,html:`Vẽ hai tia đối nhau ${I('Ox')} và ${I('Oy')}. Trên tia ${I('Ox')} lấy điểm ${I('A')} sao cho ${I('OA')} = ${a} cm, trên tia ${I('Oy')} lấy điểm ${I('B')} sao cho ${I('OB')} = ${b} cm. Tính độ dài đoạn ${I('AB')}.`},{pts:.5,html:`${a===b?`Chứng minh ${I('O')} là trung điểm của đoạn ${I('AB')}.`:`Gọi ${I('M')} là trung điểm của ${I('AB')}. Tính độ dài ${I('OM')}.`}`}],
    sol:[ptxt([[`Hai tia Ox, Oy đối nhau, A ∈ Ox, B ∈ Oy nên O nằm giữa A và B.`,.25],[`AB = OA + OB = ${a} + ${b} = ${a+b} (cm).`,.25]]),a===b?ptxt([[`O nằm giữa A, B và OA = OB = ${a} cm.`,.25],[`Vậy O là trung điểm của AB.`,.25]]):ptxt([[`AM = AB : 2 = ${fmt((a+b)/2)} (cm).`,.25],[`Vì ${fmt((a+b)/2)} ${(a+b)/2>a?'>':'<'} OA = ${a} nên ${(a+b)/2>a?'O nằm giữa A và M: OM = AM − OA':'M nằm giữa A và O: OM = OA − AM'} = ${fmt(Math.abs((a+b)/2-a))} (cm).`,.25]])],chk:()=>c>0};
});
TL6b('tl6-34-two',8,'VD','geo',[34],r=>{
  const a=r.int(3,10),b=r.int(1,a-1);
  return{kind:'tl',title:'Ba điểm thẳng hàng',parts:[{pts:.5,html:`Cho ba điểm ${I('A')}, ${I('B')}, ${I('C')} thẳng hàng với ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm. Tính độ dài đoạn ${I('AC')} trong trường hợp ${I('B')} nằm giữa ${I('A')} và ${I('C')}.`},{pts:.5,html:`Tính độ dài đoạn ${I('AC')} trong trường hợp ${I('C')} nằm giữa ${I('A')} và ${I('B')}.`}],
    sol:[ptxt([[`B nằm giữa A và C nên AC = AB + BC`,.25],[`= ${a} + ${b} = ${a+b} (cm).`,.25]]),ptxt([[`C nằm giữa A và B nên AC + CB = AB`,.25],[`⇒ AC = ${a} − ${b} = ${a-b} (cm).`,.25]])],chk:()=>true};
});
TL6b('tl6-32-count',8,'VDC','geo',[32,34],r=>{
  const n=r.int(6,20),k=r.int(3,Math.min(6,n-2)),v=n*(n-1)/2,w=v-k*(k-1)/2+1;
  return{kind:'tl',title:'Đếm số đường thẳng',parts:[{pts:.5,html:`Cho ${n} điểm, trong đó không có ba điểm nào thẳng hàng. Cứ qua hai điểm ta vẽ một đường thẳng. Có tất cả bao nhiêu đường thẳng?`},{pts:.5,html:`Nếu trong ${n} điểm đó có đúng ${k} điểm thẳng hàng (ngoài ra không có ba điểm nào khác thẳng hàng) thì vẽ được bao nhiêu đường thẳng?`}],
    sol:[ptxt([[`Mỗi điểm cùng với ${n-1} điểm còn lại tạo thành ${n-1} đường thẳng; mỗi đường thẳng được tính hai lần.`,.25],[`Số đường thẳng: ${n}·${n-1} : 2 = ${v}.`,.25]]),ptxt([[`${k} điểm thẳng hàng nếu không thẳng hàng sẽ tạo ${k*(k-1)/2} đường thẳng, nhưng thực tế chỉ tạo 1 đường thẳng.`,.25],[`Số đường thẳng: ${v} − ${k*(k-1)/2} + 1 = ${w}.`,.25]])],chk:()=>true};
});
TL6b('tl6-36-rays',8,'VDC','geo',[36],r=>{
  const n=r.int(5,15),v=n*(n-1)/2,m=r.int(4,12),M=m*(m-1)/2;
  return{kind:'tl',title:'Đếm số góc',parts:[{pts:.5,html:`Vẽ ${n} tia chung gốc ${I('O')} (không có hai tia nào trùng nhau). Có bao nhiêu góc có đỉnh ${I('O')} và hai cạnh là hai trong các tia đã vẽ?`},{pts:.5,html:`Phải vẽ bao nhiêu tia chung gốc (không có hai tia nào trùng nhau) để tạo thành đúng ${M} góc như trên?`}],
    sol:[ptxt([[`Mỗi tia tạo với ${n-1} tia còn lại ${n-1} góc; mỗi góc được tính hai lần.`,.25],[`Số góc: ${n}·${n-1} : 2 = ${v}.`,.25]]),ptxt([[`Gọi số tia là k: k(k − 1) : 2 = ${M} ⟺ k(k − 1) = ${2*M}.`,.25],[`${2*M} = ${m}·${m-1} nên k = ${m}.`,.25]])],chk:()=>true};
});

/* ===================== Chương IX: Dữ liệu và xác suất thực nghiệm ===================== */
N6b('k6-38-type',9,'NB',[38],r=>{
  const t=r.chance(.5),N=['chiều cao (cm) của các bạn trong lớp','số anh chị em ruột của mỗi bạn','cân nặng (kg) của học sinh','số điểm kiểm tra môn Toán'],C=['màu sắc yêu thích của các bạn','môn thể thao yêu thích','tên các loài hoa','nơi sinh của học sinh'];
  return t?mkTxt(r,{stem:'Dữ liệu nào sau đây là số liệu?',correct:r.pick(N),wrongs:C,sol:'Số liệu là dữ liệu được biểu diễn bằng số.',chk:()=>true})
    :mkTxt(r,{stem:'Dữ liệu nào sau đây không phải là số liệu?',correct:r.pick(C),wrongs:N,sol:'Dữ liệu không phải số liệu là dữ liệu không biểu diễn bằng số.',chk:()=>true});
});
N6b('k6-39-pict',9,'TH',[39],r=>{
  const P=r.pick(PICT6),k=r.pick([2,5,10]),ns=P.cats.map(()=>r.int(2,6)*k),i=r.int(0,P.cats.length-1),t=r.chance(.5),S=ns.reduce((a,b)=>a+b,0);
  const stem=`Biểu đồ tranh dưới đây cho biết ${P.what}.<div class="figure">${pict6(P.cats,ns,k,P.lab)}</div>`;
  return t?mkNum(r,{stem:stem+`Số lượng ứng với “${P.cats[i]}” là`,correct:ns[i],cands:[ns[i]/k,ns[i]+k,ns[i]-k,ns[i]*2].filter(x=>x>0),ok:x=>x>0,sol:`Có ${ns[i]/k} biểu tượng, mỗi biểu tượng ứng với ${k}: ${ns[i]/k}·${k} = ${ns[i]}.`,chk:()=>true})
    :mkNum(r,{stem:stem+`Tổng số lượng biểu diễn trong biểu đồ là`,correct:S,cands:[S/k,S+k,S-k,S*2],ok:x=>x>0,sol:`Tổng số biểu tượng là ${S/k}; ${S/k}·${k} = ${S}.`,chk:()=>true});
});
N6b('k6-40-bar',9,'TH',[40],r=>{
  for(;;){const B=r.pick(BAR6),ns=B.cats.map(()=>r.int(3,30)),mx=Math.max(...ns);if(ns.filter(v=>v===mx).length>1)continue;const t=r.chance(.5),im=ns.indexOf(mx),i=r.int(0,ns.length-1),j=(i+1)%ns.length;if(ns[i]===ns[j])continue;
    const stem=`Biểu đồ cột dưới đây biểu diễn ${B.what}.<div class="figure">${barSVG(B.cats,ns)}</div>`;
    return t?mkTxt(r,{stem:stem+`${B.lab} có số lượng lớn nhất là`,correct:B.cats[im],wrongs:B.cats.filter((_,k)=>k!==im),sol:`Cột cao nhất ứng với ${B.cats[im]} (${mx}).`,chk:()=>true})
      :mkNum(r,{stem:stem+`${B.cats[i]} hơn ${B.cats[j]} bao nhiêu đơn vị?`.replace('hơn','nhiều hơn').replace(/^(.*)nhiều hơn/,ns[i]>=ns[j]?'$1nhiều hơn':'$1ít hơn'),correct:Math.abs(ns[i]-ns[j]),cands:[ns[i]+ns[j],ns[i],ns[j],Math.abs(ns[i]-ns[j])+1].filter(x=>x>0),ok:x=>x>=0,sol:`${Math.max(ns[i],ns[j])} − ${Math.min(ns[i],ns[j])} = ${Math.abs(ns[i]-ns[j])}.`,chk:()=>ns[i]!==ns[j]})}
});
N6b('k6-41-dbar',9,'TH',[41],r=>{
  const cats=['6A','6B','6C','6D'],v1=cats.map(()=>r.int(8,22)),v2=cats.map(()=>r.int(8,22)),i=r.int(0,3),t=r.chance(.5);
  const stem=`Biểu đồ cột kép dưới đây cho biết số học sinh nam và nữ của các lớp khối 6.<div class="figure">${bar2SVG(cats,v1,v2,['Nam','Nữ'])}</div>`;
  return t?mkNum(r,{stem:stem+`Lớp ${cats[i]} có tất cả bao nhiêu học sinh?`,correct:v1[i]+v2[i],cands:[v1[i],v2[i],v1[i]+v2[i]+2,Math.abs(v1[i]-v2[i])].filter(x=>x>0),ok:x=>x>0,sol:`${v1[i]} + ${v2[i]} = ${v1[i]+v2[i]}.`,chk:()=>true})
    :mkNum(r,{stem:stem+`Tổng số học sinh nữ của bốn lớp là`,correct:v2.reduce((a,b)=>a+b,0),cands:[v1.reduce((a,b)=>a+b,0),v2.reduce((a,b)=>a+b,0)+2,v2.reduce((a,b)=>a+b,0)-3,v1[0]+v2[0]],ok:x=>x>0,sol:`${v2.join(' + ')} = ${v2.reduce((a,b)=>a+b,0)}.`,chk:()=>true});
});
N6b('k6-42-out',9,'NB',[42],r=>{
  const t=r.int(0,2);
  if(t===0)return mkTxt(r,{stem:'Gieo một con xúc xắc. Tập hợp các kết quả có thể xảy ra đối với số chấm xuất hiện là',correct:'{1; 2; 3; 4; 5; 6}',wrongs:['{0; 1; 2; 3; 4; 5; 6}','{1; 2; 3; 4; 5}','{2; 4; 6}'],sol:'Con xúc xắc có 6 mặt, số chấm từ 1 đến 6.',chk:()=>true});
  if(t===1)return mkTxt(r,{stem:'Tung một đồng xu hai lần liên tiếp. Tập hợp các kết quả có thể xảy ra là',correct:'{SS; SN; NS; NN}',wrongs:['{S; N}','{SS; NN}','{SN; NS}'],sol:'Mỗi lần có hai khả năng S hoặc N; hai lần có 4 kết quả.',chk:()=>true});
  const n=r.int(5,12);return mkNum(r,{stem:`Một hộp có ${n} quả bóng được đánh số từ 1 đến ${n}. Lấy ngẫu nhiên một quả bóng. Số kết quả có thể xảy ra là`,correct:n,cands:[n-1,n+1,2*n,n/2].filter(x=>isInt(x)&&x>0),ok:x=>x>0,sol:`Có ${n} kết quả: 1, 2, …, ${n}.`,chk:()=>true});
});
N6b('k6-43-exp',9,'TH',[43],r=>{
  const n=r.pick([20,25,40,50,100]),k=r.pick([...Array(n-1)].map((_,i)=>i+1).filter(v=>2*v!==n)),t=r.chance(.5),txt=t?`Tung một đồng xu ${n} lần, có ${k} lần xuất hiện mặt sấp.`:`Gieo một con xúc xắc ${n} lần, có ${k} lần xuất hiện mặt 6 chấm.`;
  return mkF(r,{stem:`${txt} Xác suất thực nghiệm của sự kiện “${t?'Xuất hiện mặt sấp':'Xuất hiện mặt 6 chấm'}” là`,correct:Q(k,n),cands:[Q(n-k,n),Q(k,n-k),Q(1,t?2:6),Q(k,100===n?50:100)].filter(q=>q[0]>0&&q[1]>0),
    sol:`Xác suất thực nghiệm = số lần sự kiện xảy ra : tổng số lần thực hiện = ${fr(k,n)}${gcd(k,n)>1?' = '+qh(Q(k,n)):''}.`,chk:()=>k!==n-k});
});
/* ---------- Đúng/sai chương IX ---------- */
DS6b('ds6-39-table',9,'NB',[38,39],r=>{
  for(;;){const B=r.pick(BAR6),ns=B.cats.map(()=>r.int(3,25)),mx=Math.max(...ns),mn=Math.min(...ns);if(ns.filter(v=>v===mx).length>1||ns.filter(v=>v===mn).length>1)continue;const S=ns.reduce((a,b)=>a+b,0),i=r.int(0,ns.length-1);
    return mkDS(r,{stem:`Bảng thống kê sau cho biết ${B.what}:<div class="figure">${tableHTML([B.lab,...B.cats],[['Số lượng',...ns]])}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Dữ liệu về số lượng trong bảng là số liệu.`,f:`Dữ liệu về số lượng trong bảng không phải là số liệu.`,why:'Dữ liệu được biểu diễn bằng số.'},
      {t:`${B.cats[i]} có số lượng là ${ns[i]}.`,f:`${B.cats[i]} có số lượng là ${ns[i]+2}.`,why:'Đọc trực tiếp từ bảng.'},
      {t:`${B.cats[ns.indexOf(mx)]} có số lượng lớn nhất.`,f:`${B.cats[ns.indexOf(mn)]} có số lượng lớn nhất.`,why:`Số lớn nhất là ${mx}.`},
      {t:`Tổng số lượng là ${S}.`,f:`Tổng số lượng là ${S+5}.`,why:`${ns.join(' + ')} = ${S}.`}],chk:()=>true})}
});
DS6b('ds6-42-event',9,'NB',[42],r=>{
  const n=r.int(6,12);
  return mkDS(r,{stem:`Một hộp có ${n} tấm thẻ đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Có ${n} kết quả có thể xảy ra.`,f:`Có ${n-1} kết quả có thể xảy ra.`,why:`Các kết quả: 1, 2, …, ${n}.`},
    {t:`Sự kiện “Số ghi trên thẻ nhỏ hơn ${n+1}” chắc chắn xảy ra.`,f:`Sự kiện “Số ghi trên thẻ nhỏ hơn ${n+1}” có thể không xảy ra.`,why:`Mọi số trên thẻ đều nhỏ hơn ${n+1}.`},
    {t:`Sự kiện “Số ghi trên thẻ lớn hơn ${n}” không thể xảy ra.`,f:`Sự kiện “Số ghi trên thẻ lớn hơn ${n}” có thể xảy ra.`,why:`Số lớn nhất là ${n}.`},
    {t:`Sự kiện “Số ghi trên thẻ là số chẵn” có thể xảy ra.`,f:`Sự kiện “Số ghi trên thẻ là số chẵn” không thể xảy ra.`,why:'Có thể rút được thẻ số 2.'}],chk:()=>true});
});
DS6b('ds6-40-bar',9,'TH',[40],r=>{
  for(;;){const B=r.pick(BAR6),ns=B.cats.map(()=>r.int(3,30)),mx=Math.max(...ns),mn=Math.min(...ns);if(ns.filter(v=>v===mx).length>1||ns.filter(v=>v===mn).length>1)continue;const S=ns.reduce((a,b)=>a+b,0),im=ns.indexOf(mx),in_=ns.indexOf(mn);
    return mkDS(r,{stem:`Biểu đồ cột dưới đây biểu diễn ${B.what}.<div class="figure">${barSVG(B.cats,ns)}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${B.cats[im]} có số lượng lớn nhất.`,f:`${B.cats[in_]} có số lượng lớn nhất.`,why:`Cột cao nhất là ${B.cats[im]}.`},
      {t:`${B.cats[in_]} có số lượng nhỏ nhất, bằng ${mn}.`,f:`${B.cats[in_]} có số lượng nhỏ nhất, bằng ${mn+1}.`,why:`Cột thấp nhất ứng với ${mn}.`},
      {t:`Chênh lệch giữa số lượng lớn nhất và nhỏ nhất là ${mx-mn}.`,f:`Chênh lệch giữa số lượng lớn nhất và nhỏ nhất là ${mx+mn}.`,why:`${mx} − ${mn} = ${mx-mn}.`},
      {t:`Tổng số lượng là ${S}.`,f:`Tổng số lượng là ${S-3}.`,why:`${ns.join(' + ')} = ${S}.`}],chk:()=>true})}
});
DS6b('ds6-43-exp',9,'TH',[43],r=>{
  const n=r.pick([20,40,50,100]),k=r.pick([...Array(n-3)].map((_,i)=>i+2).filter(v=>2*v!==n)),t=r.chance(.5);
  return mkDS(r,{stem:`${t?`Tung một đồng xu ${n} lần, có ${k} lần xuất hiện mặt ngửa`:`Gieo một con xúc xắc ${n} lần, có ${k} lần xuất hiện mặt có số chấm chẵn`}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Xác suất thực nghiệm của sự kiện “${t?'Xuất hiện mặt ngửa':'Số chấm chẵn'}” là ${qh(Q(k,n))}.`,f:`Xác suất thực nghiệm của sự kiện “${t?'Xuất hiện mặt ngửa':'Số chấm chẵn'}” là ${qh(Q(n-k,n))}.`,why:`${fr(k,n)}.`},
    {t:`Sự kiện “${t?'Xuất hiện mặt sấp':'Số chấm lẻ'}” xảy ra ${n-k} lần.`,f:`Sự kiện “${t?'Xuất hiện mặt sấp':'Số chấm lẻ'}” xảy ra ${k} lần.`,why:`${n} − ${k} = ${n-k}.`},
    {t:`Xác suất thực nghiệm của sự kiện “${t?'Xuất hiện mặt sấp':'Số chấm lẻ'}” là ${qh(Q(n-k,n))}.`,f:`Xác suất thực nghiệm của sự kiện “${t?'Xuất hiện mặt sấp':'Số chấm lẻ'}” là ${qh(Q(k,n))}.`,why:`${fr(n-k,n)}.`},
    {t:`Tổng hai xác suất thực nghiệm trên bằng 1.`,f:`Tổng hai xác suất thực nghiệm trên bằng ${qh(Q(1,2))}.`,why:`${fr(k,n)} + ${fr(n-k,n)} = 1.`}],chk:()=>2*k!==n});
});
DS6b('ds6-41-dbar',9,'VD',[41],r=>{
  for(;;){const cats=['6A','6B','6C','6D'],v1=cats.map(()=>r.int(8,22)),v2=cats.map(()=>r.int(8,22)),T_=cats.map((_,i)=>v1[i]+v2[i]),mx=Math.max(...T_);if(T_.filter(v=>v===mx).length>1)continue;const S1=v1.reduce((a,b)=>a+b,0),S2=v2.reduce((a,b)=>a+b,0),im=T_.indexOf(mx),i=r.int(0,3);if(S1===S2||v1[i]===v2[i])continue;
    return mkDS(r,{stem:`Biểu đồ cột kép dưới đây cho biết số học sinh nam và nữ của các lớp khối 6.<div class="figure">${bar2SVG(cats,v1,v2,['Nam','Nữ'])}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Lớp ${cats[im]} có nhiều học sinh nhất.`,f:`Lớp ${cats[(im+1)%4]} có nhiều học sinh nhất.`,why:`Tổng số học sinh các lớp: ${T_.join(', ')}.`},
      {t:`Khối 6 có tất cả ${S1+S2} học sinh.`,f:`Khối 6 có tất cả ${S1+S2+4} học sinh.`,why:`${S1} + ${S2} = ${S1+S2}.`},
      {t:`Số học sinh ${S1>S2?'nam':'nữ'} của khối nhiều hơn số học sinh ${S1>S2?'nữ':'nam'}.`,f:`Số học sinh ${S1>S2?'nữ':'nam'} của khối nhiều hơn số học sinh ${S1>S2?'nam':'nữ'}.`,why:`Nam ${S1}, nữ ${S2}.`},
      {t:`Lớp ${cats[i]} có số học sinh ${v1[i]>v2[i]?'nam':'nữ'} nhiều hơn ${v1[i]>v2[i]?'nữ':'nam'} là ${Math.abs(v1[i]-v2[i])} bạn.`,f:`Lớp ${cats[i]} có số học sinh ${v1[i]>v2[i]?'nữ':'nam'} nhiều hơn ${v1[i]>v2[i]?'nam':'nữ'} là ${Math.abs(v1[i]-v2[i])} bạn.`,why:`Nam ${v1[i]}, nữ ${v2[i]}.`}],chk:()=>true})}
});
DS6b('ds6-43-coin',9,'VD',[42,43],r=>{
  const n=r.pick([50,200]),k=r.pick([...Array(n)].map((_,i)=>i).filter(v=>v>=n*.35&&v<=n*.65&&2*v!==n&&isInt(1000*v/n)&&isInt(400*v/n))),N=r.pick([400,1000]);
  return mkDS(r,{stem:`Bạn An tung một đồng xu ${n} lần và ghi lại được ${k} lần xuất hiện mặt sấp. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Mỗi lần tung có hai kết quả có thể xảy ra.`,f:`Mỗi lần tung có ba kết quả có thể xảy ra.`,why:'Mặt sấp hoặc mặt ngửa.'},
    {t:`Xác suất thực nghiệm của sự kiện “Xuất hiện mặt sấp” là ${qh(Q(k,n))}.`,f:`Xác suất thực nghiệm của sự kiện “Xuất hiện mặt sấp” là ${qh(Q(k,100))}.`,why:`${fr(k,n)}.`},
    {t:`Xác suất thực nghiệm của sự kiện “Xuất hiện mặt ngửa” là ${fmt((n-k)/n)}.`,f:`Xác suất thực nghiệm của sự kiện “Xuất hiện mặt ngửa” là ${fmt(k/n)}.`,why:`${n-k} : ${n} = ${fmt((n-k)/n)}.`},
    {t:`Nếu tung ${N} lần, có thể dự đoán số lần xuất hiện mặt sấp khoảng ${N*k/n} lần.`,f:`Nếu tung ${N} lần, có thể dự đoán số lần xuất hiện mặt sấp khoảng ${N*k/n+N/10} lần.`,why:`${N}·${fr(k,n)} = ${N*k/n}.`}],chk:()=>n!==100&&2*k!==n&&isInt(N*k/n)&&Math.abs((n-k)/n-k/n)>.005});
});
/* ---------- Trả lời ngắn chương IX ---------- */
TLN6b('t6-40-bar',9,'TH',[40],r=>{
  const B=r.pick(BAR6),ns=B.cats.map(()=>r.int(3,30)),S=ns.reduce((a,b)=>a+b,0);
  return{kind:'tln',stem:`Biểu đồ cột dưới đây biểu diễn ${B.what}.<div class="figure">${barSVG(B.cats,ns)}</div>Tính tổng số lượng biểu diễn trên biểu đồ.`,ans:S,unit:'',sol:`${ns.join(' + ')} = ${S}.`,chk:()=>true};
});
TLN6b('t6-43-exp',9,'TH',[43],r=>{
  const n=r.pick([20,25,50]),k=r.int(1,n-1),v=k/n;
  return{kind:'tln',stem:`Gieo một con xúc xắc ${n} lần, có ${k} lần xuất hiện mặt 1 chấm. Tính xác suất thực nghiệm của sự kiện “Xuất hiện mặt 1 chấm” (viết dưới dạng số thập phân).`,ans:v,unit:'',sol:`${fr(k,n)} = ${fmt(v)}.`,chk:()=>isInt(v*100)};
});
TLN6b('t6-41-dbar',9,'VD',[41],r=>{
  const cats=['Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm'],v1=cats.map(()=>r.int(10,40)),v2=cats.map(()=>r.int(10,40)),S=v1.reduce((a,b)=>a+b,0)-v2.reduce((a,b)=>a+b,0);
  return{kind:'tln',stem:`Biểu đồ cột kép dưới đây cho biết số sách hai lớp 6A và 6B quyên góp được trong bốn ngày.<div class="figure">${bar2SVG(cats,v1,v2,['Lớp 6A','Lớp 6B'])}</div>Trong bốn ngày, lớp 6A quyên góp được nhiều hơn lớp 6B bao nhiêu quyển sách? (Nếu ít hơn thì ghi số âm.)`,ans:S,unit:'',
    sol:`Lớp 6A: ${v1.join(' + ')} = ${v1.reduce((a,b)=>a+b,0)}; lớp 6B: ${v2.join(' + ')} = ${v2.reduce((a,b)=>a+b,0)}; hiệu ${sg(S)}.`,chk:()=>true};
});
TLN6b('t6-43-pred',9,'VD',[43],r=>{
  const n=r.pick([20,40,50,100]),k=r.int(2,n-2),N=r.pick([200,1000]),v=N*k/n;
  return{kind:'tln',stem:`Một máy sản xuất linh kiện, kiểm tra ngẫu nhiên ${n} linh kiện thấy có ${k} linh kiện bị lỗi. Dựa vào xác suất thực nghiệm, hãy dự đoán trong ${N} linh kiện do máy sản xuất có khoảng bao nhiêu linh kiện bị lỗi.`,ans:v,unit:'linh kiện',sol:`Xác suất thực nghiệm ${fr(k,n)}; ${N}·${fr(k,n)} = ${fmt(v)}.`,chk:()=>isInt(v)};
});
/* ---------- Tự luận thống kê, xác suất thực nghiệm (role real) ---------- */
TL6b('tl6-40-chart',9,'TH','real',[39,40],r=>{
  for(;;){const B=r.pick(BAR6),ns=B.cats.map(()=>r.int(3,25)),mx=Math.max(...ns);if(ns.filter(v=>v===mx).length>1)continue;const S=ns.reduce((a,b)=>a+b,0),im=ns.indexOf(mx);
    return{kind:'tl',title:'Bảng thống kê và biểu đồ cột',parts:[{pts:.5,html:`Bảng thống kê sau cho biết ${B.what}:<div class="figure">${tableHTML([B.lab,...B.cats],[['Số lượng',...ns]])}</div>Vẽ biểu đồ cột biểu diễn bảng thống kê trên.`},{pts:.5,html:`Tính tổng số lượng và cho biết ${B.lab.toLowerCase()} nào có số lượng lớn nhất.`}],
      sol:[ptxt([[`Vẽ trục ngang ghi ${B.lab.toLowerCase()}, trục đứng ghi số lượng; mỗi ${B.lab.toLowerCase()} vẽ một cột có chiều cao bằng số lượng tương ứng.`,.25],[`<div class="figure">${barSVG(B.cats,ns)}</div>`,.25]]),ptxt([[`Tổng: ${ns.join(' + ')} = ${S}.`,.25],[`${B.cats[im]} có số lượng lớn nhất (${mx}).`,.25]])],chk:()=>true}}
});
TL6b('tl6-43-exp',9,'VD','real',[42,43],r=>{
  const n=r.pick([50,100]),a=r.int(10,n===50?18:35),b=r.int(10,n===50?18:35),c=n-a-b,N=n===50?r.pick([200,500]):r.pick([200,500,1000]);
  return{kind:'tl',title:'Xác suất thực nghiệm',parts:[{pts:.5,html:`Một hộp có các quả bóng màu xanh, đỏ, vàng. Lấy ngẫu nhiên một quả, ghi màu rồi trả lại hộp. Lặp lại ${n} lần, kết quả: ${a} lần màu xanh, ${b} lần màu đỏ, còn lại là màu vàng. Liệt kê các kết quả có thể xảy ra và tính số lần lấy được bóng màu vàng.`},{pts:.5,html:`Tính xác suất thực nghiệm của sự kiện “Lấy được bóng màu vàng”. Nếu lặp lại ${N} lần, dự đoán khoảng bao nhiêu lần lấy được bóng màu vàng?`}],
    sol:[ptxt([[`Các kết quả có thể: màu xanh, màu đỏ, màu vàng.`,.25],[`Số lần màu vàng: ${n} − ${a} − ${b} = ${c}.`,.25]]),ptxt([[`Xác suất thực nghiệm: ${fr(c,n)}${gcd(c,n)>1?' = '+qh(Q(c,n)):''}.`,.25],[`Dự đoán: ${N}·${fr(c,n)} = ${N*c/n} lần.`,.25]])],chk:()=>c>0&&isInt(N*c/n)};
});
TL6b('tl6-41-dbar',9,'VD','real',[41],r=>{
  const cats=['Toán','Văn','Anh','KHTN'],v1=cats.map(()=>r.int(5,15)),v2=cats.map(()=>r.int(5,15)),T1=v1.reduce((a,b)=>a+b,0),T2=v2.reduce((a,b)=>a+b,0);
  return{kind:'tl',title:'Biểu đồ cột kép',parts:[{pts:.5,html:`Biểu đồ cột kép dưới đây cho biết số học sinh đạt điểm giỏi các môn của hai lớp 6A và 6B.<div class="figure">${bar2SVG(cats,v1,v2,['Lớp 6A','Lớp 6B'])}</div>Lập bảng thống kê tương ứng với biểu đồ.`},{pts:.5,html:`Tính tổng số lượt học sinh đạt điểm giỏi của mỗi lớp. Lớp nào có nhiều lượt hơn và nhiều hơn bao nhiêu?`}],
    sol:[ptxt([[tableHTML(['Môn',...cats],[['Lớp 6A',...v1],['Lớp 6B',...v2]]),.5]]),ptxt([[`Lớp 6A: ${T1}; lớp 6B: ${T2}.`,.25],[T1===T2?'Hai lớp bằng nhau.':`Lớp ${T1>T2?'6A':'6B'} nhiều hơn ${Math.abs(T1-T2)} lượt.`,.25]])],chk:()=>true};
});
