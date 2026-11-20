/* ================================================================
   LỚP 10 – học kì I (tiếp)
   Chương V: Các số đặc trưng của mẫu số liệu không ghép nhóm
   ================================================================ */
/* số thập phân viết dạng nguyên v với p chữ số sau dấu phẩy */
const decS=(v,p)=>{const s=v<0?MINUS:'',a=Math.abs(v),t=String(a).padStart(p+1,'0');return s+(p?t.slice(0,-p)+','+t.slice(-p):t)};
const dN10=x=>sg(Math.round(x*1e6)/1e6).replace('.',',');/* số thập phân đầy đủ chữ số */
const srt=a=>a.slice().sort((x,y)=>x-y);
const med10=a=>{const s=srt(a),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2};
/* tứ phân vị theo SGK Kết nối tri thức */
const quart10=a=>{const s=srt(a),n=s.length,h=Math.floor(n/2),lo=s.slice(0,h),hi=s.slice(n%2?h+1:h);return[med10(lo),med10(s),med10(hi)]};
const mean10=a=>a.reduce((x,y)=>x+y,0)/a.length;
const var10=a=>{const m=mean10(a);return a.reduce((x,y)=>x+(y-m)**2,0)/a.length};
const lst10=a=>a.map(sg).join('; ');
const freqTab=(xs,ns,lx='Giá trị',ln='Tần số')=>tableHTML([lx,...xs.map(fmt)],[[ln,...ns]]);
const rd2=x=>Math.round(x*100)/100;
/* mẫu số liệu có bối cảnh */
const CTX10=[{t:'Điểm kiểm tra môn Toán của một nhóm học sinh',lo:3,hi:10,u:''},{t:'Số giờ tự học trong một tuần của một số học sinh',lo:2,hi:15,u:' giờ'},
  {t:'Số cuốn sách mỗi bạn trong tổ đã đọc trong năm',lo:1,hi:12,u:''},{t:'Thời gian (phút) chạy hết quãng đường 3 km của một số vận động viên',lo:12,hi:25,u:' phút'},
  {t:'Số khách đến một cửa hàng trong các ngày của tuần',lo:20,hi:60,u:''},{t:'Nhiệt độ cao nhất (°C) trong một số ngày tại một thành phố',lo:24,hi:38,u:'°C'}];
const dataR=(r,n,o={})=>{const c=o.ctx||r.pick(CTX10);return{c,a:[...Array(n)].map(()=>r.int(c.lo,c.hi))}};
const dStem=(c,a)=>`${c.t} được ghi lại như sau:<br>${lst10(a)}`;

/* ===================== Bài 12: Số gần đúng và sai số ===================== */
N10('k10-12-round',5,'NB',[12],r=>{
  const p=r.int(3,5),v=r.int(10**p+1,99*10**p),k=r.int(1,p-1);/* số = v / 10^p, làm tròn đến k chữ số thập phân */
  const rd=Math.round(v/10**(p-k)),tr=Math.floor(v/10**(p-k)),place=['hàng phần mười','hàng phần trăm','hàng phần nghìn','hàng phần chục nghìn'][k-1];
  if(rd===tr)return T.nlc['k10-12-round'].gen(r);
  return mkTxt(r,{stem:`Số quy tròn của số ${decS(v,p)} đến ${place} là`,correct:decS(rd,k),wrongs:[decS(tr,k),decS(Math.round(v/10**(p-k+1)),k-1),decS(Math.round(v/10**(p-k-1)),k+1),decS(rd+1,k)].filter((x,i,arr)=>arr.indexOf(x)===i),
    sol:`Chữ số ngay sau ${place} là ${Math.floor(v/10**(p-k-1))%10} ≥ 5 nên ta cộng thêm 1 vào chữ số ở ${place}: ${decS(rd,k)}.`,chk:()=>Math.floor(v/10**(p-k-1))%10>=5});
});
N10('k10-12-prec',5,'TH',[12],r=>{
  const big=r.chance(.5);
  if(big){const k=r.int(1,3),c=r.int(1,9),d=c*10**k,a=r.int(10**5,10**7),u=10**(k+1),q=Math.round(a/u)*u;if(Math.round(a/(10**k))*10**k===q||Math.floor(a/u)*u===q)return T.nlc['k10-12-prec'].gen(r);
    return mkNum(r,{stem:`Cho số gần đúng ${I('a')} = ${a} với độ chính xác ${I('d')} = ${d}. Số quy tròn của số ${I('a')} là`,correct:q,f:x=>String(x),cands:[Math.round(a/10**k)*10**k,Math.round(a/(10*u))*10*u,Math.floor(a/u)*u,q+u],
      sol:`Độ chính xác d = ${d} đến hàng ${['chục','trăm','nghìn'][k-1]} nên ta quy tròn a đến hàng ${['trăm','nghìn','chục nghìn'][k-1]}: ${q}.`,chk:()=>Math.abs(q-a)<=u/2})}
  const k=r.int(2,4),c=r.int(1,9),p=6,a=r.int(10**p,9*10**p),place=k-1,q=Math.round(a/10**(p-place));
  if(Math.floor(a/10**(p-place))===q)return T.nlc['k10-12-prec'].gen(r);
  return mkTxt(r,{stem:`Cho số gần đúng ${I('a')} = ${decS(a,p)} với độ chính xác ${I('d')} = ${decS(c,k)}. Số quy tròn của số ${I('a')} là`,correct:decS(q,place),wrongs:[decS(Math.round(a/10**(p-k)),k),decS(Math.floor(a/10**(p-place)),place),decS(Math.round(a/10**(p-place+1)),place-1)],
    sol:`Độ chính xác d = ${decS(c,k)} đến hàng ${['','','phần trăm','phần nghìn','phần chục nghìn'][k]} nên ta quy tròn a đến hàng ${['','phần mười','phần trăm','phần nghìn'][place]}: ${decS(q,place)}.`,chk:()=>place>=1});
});
const CONST10=[['π',Math.PI],[rt(2),Math.SQRT2],[rt(3),Math.sqrt(3)],[rt(5),Math.sqrt(5)],[rt(7),Math.sqrt(7)],[rt(10),Math.sqrt(10)]];
N10('k10-12-abs',5,'TH',[12],r=>{
  for(;;){const [nm,x]=r.pick(CONST10),k=r.int(1,3),a=Math.round(x*10**k)/10**k,D=Math.abs(x-a),E=[1e-4,5e-4,1e-3,5e-3,1e-2,5e-2],i=E.findIndex(e=>e>D);if(i<1||i>4)continue;
    const e=E[i],ep=E[i-1],en=E[i+1],Ds=`Δ${sub('a')}`;
    return mkTxt(r,{stem:`Biết ${nm} = ${dN10(x)}... Số ${I('a')} = ${decS(Math.round(a*10**k),k)} là một giá trị gần đúng của ${nm}. Khẳng định nào sau đây về sai số tuyệt đối ${Ds} của ${I('a')} là đúng?`,correct:`${Ds} < ${dN10(e)}`,wrongs:[`${Ds} < ${dN10(ep)}`,`${Ds} > ${dN10(e)}`,`${Ds} > ${dN10(en)}`],
      sol:`${Ds} = |${nm} − ${decS(Math.round(a*10**k),k)}| ≈ ${dN10(Math.round(D*1e6)/1e6)}, do đó ${dN10(ep)} < ${Ds} < ${dN10(e)}.`,chk:()=>D<e&&D>ep})}
});
N10('k10-12-rel',5,'VD',[12],r=>{
  for(;;){const a=r.int(100,500),d=r.pick([1,2,5]),b=r.int(20,200),e=r.pick([1,2,5]);/* An: a ± d/10 (m); Bình: b/10 ± e/100 (m) */
    const ra=d/10/a,rb=e/100/(b/10);if(Math.abs(ra-rb)/ra<.05)continue;const first=ra<rb;
    return mkTxt(r,{stem:`Bạn An đo chiều dài một sân bóng được ${I('a')} = ${a} m ± ${decS(d,1)} m. Bạn Bình đo chiều cao một cột cờ được ${I('b')} = ${decS(b,1)} m ± ${decS(e,2)} m. Khẳng định nào sau đây đúng?`,
      correct:`Phép đo của ${first?'An':'Bình'} có độ chính xác cao hơn vì có sai số tương đối nhỏ hơn.`,
      wrongs:[`Phép đo của ${first?'Bình':'An'} có độ chính xác cao hơn vì có sai số tương đối nhỏ hơn.`,`Hai phép đo có độ chính xác như nhau.`,`Không thể so sánh độ chính xác của hai phép đo.`],
      sol:`Sai số tương đối: δ${sub('a')} ≤ ${fr(decS(d,1),a)} ≈ ${dN10(Math.round(ra*1e5)/1e3)}%, δ${sub('b')} ≤ ${fr(decS(e,2),decS(b,1))} ≈ ${dN10(Math.round(rb*1e5)/1e3)}%. Phép đo có sai số tương đối nhỏ hơn thì chính xác hơn.`,chk:()=>true})}
});
TLN10('t10-12-prec',5,'TH',[12],r=>{
  for(;;){const [nm,x]=r.pick(CONST10),k=r.int(2,3),c=r.int(1,9),place=k-1,q=Math.round(x*10**place)/10**place,a=Math.round(x*10**5);
    return{kind:'tln',stem:`Cho số gần đúng ${I('a')} = ${decS(a,5)} (là giá trị gần đúng của ${nm}) với độ chính xác ${I('d')} = ${decS(c,k)}. Viết số quy tròn của ${I('a')}.`,ans:q,unit:'',
      sol:`d = ${decS(c,k)} nên quy tròn a đến hàng ${['','phần mười','phần trăm'][place]}: ${fmt(q)}.`,chk:()=>true}}
});
TLN10('t10-12-err',5,'VD',[12],r=>{
  const a=r.int(20,90),b=r.int(10,a-1),d=r.pick([1,2,3,5]),e=r.pick([1,2,3,5]),ask=r.chance(.5),v=ask?2*(d+e)/10:(d+e)/10;
  return{kind:'tln',stem:`Một mảnh vườn hình chữ nhật có chiều dài ${I('x')} = ${a} m ± ${decS(d,1)} m và chiều rộng ${I('y')} = ${b} m ± ${decS(e,1)} m. Sai số tuyệt đối của ${ask?'chu vi':'nửa chu vi'} mảnh vườn không vượt quá bao nhiêu mét?`,ans:v,unit:'m',
    sol:`${ask?'P = 2(x + y)':'x + y'} = ${ask?2*(a+b):a+b} m với sai số tuyệt đối không vượt quá ${ask?'2·':''}(${decS(d,1)} + ${decS(e,1)}) = ${fmt(v)} (m).`,chk:()=>true};
});

/* ===================== Bài 13: Các số đặc trưng đo xu thế trung tâm ===================== */
N10('k10-13-mean',5,'NB',[13],r=>{
  for(;;){const n=r.int(6,10),{c,a}=dataR(r,n),m=mean10(a);if(!isInt(m*10))continue;
    return mkNum(r,{stem:`${dStem(c,a)}<br>Số trung bình của mẫu số liệu trên là`,correct:m,ok:x=>x>0,cands:[med10(a),m+1,m-.5,rd2(a.reduce((x,y)=>x+y,0)/(n-1)),Math.max(...a)-Math.min(...a)],
      sol:`x̄ = ${fr(`${a.join(' + ')}`,n)} = ${fr(a.reduce((x,y)=>x+y,0),n)} = ${fmt(m)}.`,chk:()=>true})}
});
N10('k10-13-med',5,'NB',[13],r=>{
  for(;;){const n=r.int(7,12),{c,a}=dataR(r,n),m=med10(a),s=srt(a);if(Math.abs(m-mean10(a))<1e-9)continue;
    return mkNum(r,{stem:`${dStem(c,a)}<br>Trung vị của mẫu số liệu trên là`,correct:m,ok:x=>x>0,cands:[a[Math.floor(n/2)],rd2(mean10(a)),s[Math.floor(n/2)-1],s[Math.floor(n/2)+1],m+.5],
      sol:`Sắp xếp theo thứ tự không giảm: ${s.join('; ')}. Cỡ mẫu n = ${n} ${n%2?`lẻ nên trung vị là số ở vị trí thứ ${(n+1)/2}: M${sub('e')} = ${fmt(m)}`:`chẵn nên trung vị là trung bình cộng hai số ở vị trí thứ ${n/2} và ${n/2+1}: M${sub('e')} = ${fr(`${s[n/2-1]} + ${s[n/2]}`,2)} = ${fmt(m)}`}.`,chk:()=>true})}
});
N10('k10-13-mode',5,'NB',[13],r=>{
  for(;;){const lo=r.int(35,40),xs=[...Array(r.int(5,6))].map((_,i)=>lo+i),ns=xs.map(()=>r.int(2,15)),M=Math.max(...ns);if(ns.filter(x=>x===M).length>1)continue;
    const mo=xs[ns.indexOf(M)];
    return mkNum(r,{stem:`Cỡ giày của các học sinh nam lớp 10A được thống kê trong bảng sau:${freqTab(xs,ns,'Cỡ giày','Số học sinh')}Mốt của mẫu số liệu trên là`,correct:mo,ok:x=>x>0,cands:[M,...xs.filter(x=>x!==mo)],
      sol:`Giá trị có tần số lớn nhất (${M}) là ${mo}. Vậy mốt M${sub('o')} = ${mo}.`,chk:()=>true})}
});
N10('k10-13-fmean',5,'TH',[13],r=>{
  for(;;){const xs=srt(distinctInts(r,r.int(4,5),4,10)),ns=xs.map(()=>r.int(1,9)),N=ns.reduce((x,y)=>x+y,0),S=xs.reduce((s,x,i)=>s+x*ns[i],0),m=S/N;if(!isInt(m*100))continue;
    return mkNum(r,{stem:`Điểm kiểm tra môn Tiếng Anh của học sinh lớp 10B được cho trong bảng sau:${freqTab(xs,ns,'Điểm','Số học sinh')}Điểm trung bình của lớp 10B là`,correct:m,ok:x=>x>0,cands:[rd2(mean10(xs)),rd2(S/xs.length/2),med10(xs),rd2(m+.5),rd2(m-.25)],
      sol:`x̄ = ${fr(xs.map((x,i)=>`${ns[i]}·${x}`).join(' + '),N)} = ${fr(S,N)} = ${fmt(m)}.`,chk:()=>true})}
});
N10('k10-13-quart',5,'TH',[13],r=>{
  for(;;){const n=r.int(8,12),{c,a}=dataR(r,n),[q1,q2,q3]=quart10(a),ask=r.int(0,1),v=ask?q3:q1,s=srt(a);if(q1===q3)continue;
    return mkNum(r,{stem:`${dStem(c,a)}<br>Tứ phân vị thứ ${ask?'ba':'nhất'} ${ask?`${I('Q')}${sub(3)}`:`${I('Q')}${sub(1)}`} của mẫu số liệu trên là`,correct:v,ok:x=>x>0,cands:[ask?q1:q3,q2,s[ask?n-2:1],v+.5,v-1],
      sol:`Sắp xếp: ${s.join('; ')}. Trung vị Q${sub(2)} = ${fmt(q2)}. ${ask?`Q${sub(3)} là trung vị của nửa số liệu bên phải Q${sub(2)}`:`Q${sub(1)} là trung vị của nửa số liệu bên trái Q${sub(2)}`}${n%2?' (không kể Q'+sub(2)+')':''}: ${fmt(v)}.`,chk:()=>true})}
});
DS10('ds10-13-data',5,'TH',[13],r=>{
  for(;;){const n=r.pick([8,9,10,11]),{c,a}=dataR(r,n),m=mean10(a),me=med10(a),[q1,,q3]=quart10(a);if(!isInt(m*10)||me===m||q1===q3)continue;
    const cnt={};a.forEach(x=>cnt[x]=(cnt[x]||0)+1);const M=Math.max(...Object.values(cnt)),modes=Object.keys(cnt).filter(k=>cnt[k]===M).map(Number);if(modes.length!==1||M<2||modes[0]===M)continue;
    return mkDS(r,{stem:`${dStem(c,a)}<br>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Số trung bình của mẫu số liệu bằng ${fmt(m)}.`,f:`Số trung bình của mẫu số liệu bằng ${fmt(me)}.`,why:`x̄ = ${fr(a.reduce((x,y)=>x+y,0),n)} = ${fmt(m)}.`},
      {t:`Trung vị của mẫu số liệu bằng ${fmt(me)}.`,f:`Trung vị của mẫu số liệu bằng ${fmt(a[Math.floor(n/2)])===fmt(me)?fmt(me+1):fmt(a[Math.floor(n/2)])}.`,why:`Sắp xếp: ${srt(a).join('; ')}; M${sub('e')} = ${fmt(me)}.`},
      {t:`Mốt của mẫu số liệu bằng ${modes[0]}.`,f:`Mốt của mẫu số liệu bằng ${M}.`,why:`Giá trị ${modes[0]} xuất hiện nhiều nhất (${M} lần).`},
      {t:`Tứ phân vị thứ nhất của mẫu số liệu bằng ${fmt(q1)}.`,f:`Tứ phân vị thứ nhất của mẫu số liệu bằng ${fmt(q3)}.`,why:`Q${sub(1)} là trung vị của nửa dưới: Q${sub(1)} = ${fmt(q1)}.`}],chk:()=>modes[0]!==M})}
});
TLN10('t10-13-miss',5,'VD',[13],r=>{
  for(;;){const n=r.int(5,8),{c,a}=dataR(r,n),m=r.int(c.lo+1,c.hi-1),x=m*(n+1)-a.reduce((s,y)=>s+y,0);if(x<c.lo||x>c.hi)continue;
    return{kind:'tln',stem:`${dStem(c,a.concat([]))}&nbsp;&nbsp;&nbsp;${I('x')}<br>Biết số trung bình của mẫu số liệu trên bằng ${m}. Tìm ${I('x')}.`,ans:x,unit:'',
      sol:`${fr(`${a.reduce((s,y)=>s+y,0)} + x`,n+1)} = ${m} ⇒ x = ${m*(n+1)} − ${a.reduce((s,y)=>s+y,0)} = ${x}.`,chk:()=>true}}
});
TLN10('t10-13-q',5,'TH',[13],r=>{
  for(;;){const n=r.int(9,13),{c,a}=dataR(r,n),[q1,q2,q3]=quart10(a),ask=r.int(0,2),v=[q1,q2,q3][ask];if(q1===q3)continue;
    return{kind:'tln',stem:`${dStem(c,a)}<br>Tìm ${['tứ phân vị thứ nhất','trung vị','tứ phân vị thứ ba'][ask]} của mẫu số liệu trên.`,ans:v,unit:'',
      sol:`Sắp xếp: ${srt(a).join('; ')}. Q${sub(1)} = ${fmt(q1)}, Q${sub(2)} = ${fmt(q2)}, Q${sub(3)} = ${fmt(q3)}.`,chk:()=>true}}
});

/* ===================== Bài 14: Các số đặc trưng đo độ phân tán ===================== */
N10('k10-14-range',5,'NB',[14],r=>{
  for(;;){const n=r.int(8,11),{c,a}=dataR(r,n),[q1,,q3]=quart10(a),ask=r.chance(.5),R=Math.max(...a)-Math.min(...a),v=ask?q3-q1:R;if(q3===q1||R===q3-q1)continue;
    return mkNum(r,{stem:`${dStem(c,a)}<br>${ask?'Khoảng tứ phân vị':'Khoảng biến thiên'} của mẫu số liệu trên là`,correct:v,ok:x=>x>0,cands:[ask?R:q3-q1,Math.max(...a),q3,q1,v+1],
      sol:ask?`Sắp xếp: ${srt(a).join('; ')}. Q${sub(1)} = ${fmt(q1)}, Q${sub(3)} = ${fmt(q3)}; Δ${sub('Q')} = Q${sub(3)} − Q${sub(1)} = ${fmt(v)}.`:`R = x${sub('max')} − x${sub('min')} = ${Math.max(...a)} − ${Math.min(...a)} = ${R}.`,chk:()=>true})}
});
/* mẫu nhỏ có trung bình nguyên */
const dataInt=(r,n,lo,hi)=>{for(;;){const a=[...Array(n)].map(()=>r.int(lo,hi));if(isInt(mean10(a))&&var10(a)>0)return a}};
N10('k10-14-var',5,'TH',[14],r=>{
  for(;;){const n=r.int(5,6),a=dataInt(r,n,1,12),v=var10(a),ex=isInt(v*100),sd=r.chance(.4),val=sd?rd2(Math.sqrt(v)):rd2(v);if(sd&&isInt(Math.sqrt(v))===false&&!ex)continue;
    const m=mean10(a),S=a.reduce((x,y)=>x+(y-m)**2,0);
    return mkNum(r,{stem:`Cho mẫu số liệu: ${a.join('; ')}. ${sd?'Độ lệch chuẩn':'Phương sai'} của mẫu số liệu trên${(sd?isInt(Math.sqrt(v)*100):ex)?'':' (làm tròn đến hàng phần trăm)'} là`,correct:val,ok:x=>x>0,cands:[sd?rd2(v):rd2(Math.sqrt(v)),rd2(S/(n-1)),rd2(S),rd2(val+.5),rd2(sd?Math.sqrt(S/(n-1)):v*2)],
      sol:`x̄ = ${fmt(m)}; s² = ${fr(1,n)}[${a.map(x=>`(${x} − ${m})²`).join(' + ')}] = ${fr(S,n)}${ex?` = ${fmt(v)}`:` ≈ ${fmt(rd2(v))}`}${sd?`; s = √s² ≈ ${fmt(rd2(Math.sqrt(v)))}`:''}.`,chk:()=>true})}
});
N10('k10-14-out',5,'VD',[14],r=>{
  for(;;){const n=r.int(9,11),c=r.pick(CTX10.slice(1)),base=[...Array(n-1)].map(()=>r.int(c.lo+2,c.hi-2)),[q1,,q3]=quart10(base),out=r.chance(.5)?c.hi*2+r.int(1,9):Math.max(0,c.lo-r.int(8,15));
    const a=r.shuffle(base.concat([out])),[Q1,,Q3]=quart10(a),dq=Q3-Q1,lo=Q1-1.5*dq,hi=Q3+1.5*dq,outs=a.filter(x=>x<lo||x>hi);if(outs.length!==1||outs[0]!==out||dq===0)continue;
    const W=uniqBy([Math.max(...base),Math.min(...base),Q3,Q1].map(x=>fmt(x)),x=>x).filter(x=>x!==fmt(out));if(W.length<3)continue;
    return mkTxt(r,{stem:`${dStem(c,a)}<br>Giá trị ngoại lệ của mẫu số liệu trên là`,correct:fmt(out),wrongs:W,
      sol:`Sắp xếp: ${srt(a).join('; ')}. Q${sub(1)} = ${fmt(Q1)}, Q${sub(3)} = ${fmt(Q3)}, Δ${sub('Q')} = ${fmt(dq)}. Giá trị ngoại lệ là giá trị lớn hơn Q${sub(3)} + 1,5Δ${sub('Q')} = ${fmt(hi)} hoặc nhỏ hơn Q${sub(1)} − 1,5Δ${sub('Q')} = ${fmt(lo)}: đó là ${fmt(out)}.`,chk:()=>q1<=q3})}
});
N10('k10-14-cmp',5,'TH',[14],r=>{
  for(;;){const n=6,A=dataInt(r,n,4,10),B=dataInt(r,n,4,10);if(mean10(A)!==mean10(B))continue;const vA=var10(A),vB=var10(B);if(Math.abs(vA-vB)<.2)continue;const stA=vA<vB;
    return mkTxt(r,{stem:`Kết quả ${n} lần bắn của hai xạ thủ (đơn vị: điểm) như sau:<br>Xạ thủ A: ${A.join('; ')}<br>Xạ thủ B: ${B.join('; ')}<br>Khẳng định nào sau đây đúng?`,
      correct:`Hai xạ thủ có điểm trung bình bằng nhau, xạ thủ ${stA?'A':'B'} bắn ổn định hơn.`,wrongs:[`Hai xạ thủ có điểm trung bình bằng nhau, xạ thủ ${stA?'B':'A'} bắn ổn định hơn.`,`Xạ thủ A có điểm trung bình cao hơn xạ thủ B.`,`Xạ thủ B có điểm trung bình cao hơn xạ thủ A.`],
      sol:`x̄${sub('A')} = x̄${sub('B')} = ${fmt(mean10(A))}; s${sub('A')}² ${Number.isInteger(vA*100)?'=':'≈'} ${fmt(vA)}, s${sub('B')}² ${Number.isInteger(vB*100)?'=':'≈'} ${fmt(vB)}. Phương sai nhỏ hơn thì kết quả ổn định hơn: xạ thủ ${stA?'A':'B'}.`,chk:()=>true})}
});
DS10('ds10-14-disp',5,'TH',[14],r=>{
  for(;;){const n=r.pick([6,8]),a=dataInt(r,n,2,14),m=mean10(a),v=var10(a),[q1,,q3]=quart10(a),R=Math.max(...a)-Math.min(...a);if(q1===q3||!isInt(v*100)||R===q3-q1)continue;if(!a.every(x=>x>=q1-1.5*(q3-q1)&&x<=q3+1.5*(q3-q1)))continue;
    return mkDS(r,{stem:`Cho mẫu số liệu: ${a.join('; ')}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Khoảng biến thiên của mẫu số liệu bằng ${R}.`,f:`Khoảng biến thiên của mẫu số liệu bằng ${q3-q1}.`,why:`R = ${Math.max(...a)} − ${Math.min(...a)} = ${R}.`},
      {t:`Khoảng tứ phân vị của mẫu số liệu bằng ${fmt(q3-q1)}.`,f:`Khoảng tứ phân vị của mẫu số liệu bằng ${fmt(q3-q1+1)}.`,why:`Q${sub(1)} = ${fmt(q1)}, Q${sub(3)} = ${fmt(q3)} nên Δ${sub('Q')} = ${fmt(q3-q1)}.`},
      {t:`Phương sai của mẫu số liệu bằng ${fmt(v)}.`,f:`Phương sai của mẫu số liệu bằng ${fmt(rd2(v*n/(n-1)))===fmt(v)?fmt(v+1):fmt(rd2(v*n/(n-1)))}.`,why:`x̄ = ${fmt(m)}; s² = ${fr(a.reduce((x,y)=>x+(y-m)**2,0),n)} = ${fmt(v)}.`},
      {t:`Mẫu số liệu không có giá trị ngoại lệ.`,f:`Mẫu số liệu có giá trị ngoại lệ.`,why:`Mọi giá trị đều thuộc [Q${sub(1)} − 1,5Δ${sub('Q')}; Q${sub(3)} + 1,5Δ${sub('Q')}] = [${fmt(q1-1.5*(q3-q1))}; ${fmt(q3+1.5*(q3-q1))}].`}],
      chk:()=>a.every(x=>x>=q1-1.5*(q3-q1)&&x<=q3+1.5*(q3-q1))})}
});
TLN10('t10-14-var',5,'TH',[14],r=>{
  const n=r.int(5,7),a=dataInt(r,n,1,15),v=var10(a),sd=r.chance(.4),val=rd2(sd?Math.sqrt(v):v),m=mean10(a);
  return{kind:'tln',stem:`Cho mẫu số liệu: ${a.join('; ')}. Tính ${sd?'độ lệch chuẩn':'phương sai'} của mẫu số liệu trên (làm tròn kết quả đến hàng phần trăm).`,ans:val,unit:'',
    sol:`x̄ = ${fmt(m)}; s² = ${fr(a.reduce((x,y)=>x+(y-m)**2,0),n)} ≈ ${fmt(rd2(v))}${sd?`; s ≈ ${fmt(val)}`:''}.`,chk:()=>true};
});
TLN10('t10-14-iqr',5,'TH',[14],r=>{
  for(;;){const n=r.int(9,13),{c,a}=dataR(r,n),[q1,,q3]=quart10(a);if(q1===q3)continue;
    return{kind:'tln',stem:`${dStem(c,a)}<br>Tính khoảng tứ phân vị của mẫu số liệu trên.`,ans:q3-q1,unit:'',sol:`Sắp xếp: ${srt(a).join('; ')}. Q${sub(1)} = ${fmt(q1)}, Q${sub(3)} = ${fmt(q3)}; Δ${sub('Q')} = ${fmt(q3-q1)}.`,chk:()=>true}}
});
TL10('tl10-13-stat',5,'TH','c',[13,14],r=>{
  for(;;){const n=r.pick([10,11,12]),{c,a}=dataR(r,n),m=mean10(a),[q1,q2,q3]=quart10(a);if(!isInt(m*100)||q1===q3)continue;
    return{kind:'tl',title:'Các số đặc trưng của mẫu số liệu',parts:[
      {pts:.5,html:`${dStem(c,a)}<br>Tính số trung bình và trung vị của mẫu số liệu trên.`},
      {pts:.5,html:`Tìm các tứ phân vị và khoảng tứ phân vị của mẫu số liệu trên.`}],
      sol:[ptxt([[`x̄ = ${fr(a.reduce((x,y)=>x+y,0),n)} = ${fmt(m)}.`,.25],[`Sắp xếp: ${srt(a).join('; ')}; M${sub('e')} = ${fmt(q2)}.`,.25]]),
        ptxt([[`Q${sub(2)} = ${fmt(q2)}; Q${sub(1)} = ${fmt(q1)}; Q${sub(3)} = ${fmt(q3)}.`,.25],[`Δ${sub('Q')} = Q${sub(3)} − Q${sub(1)} = ${fmt(q3-q1)}.`,.25]])],chk:()=>true}}
});
TL10('tl10-14-disp',5,'VD','c',[14],r=>{
  for(;;){const n=6,A=dataInt(r,n,4,10),B=dataInt(r,n,4,10);if(mean10(A)!==mean10(B))continue;const vA=var10(A),vB=var10(B);if(Math.abs(vA-vB)<.2)continue;const m=mean10(A);
    return{kind:'tl',title:'Các số đặc trưng đo độ phân tán',parts:[
      {pts:.5,html:`Thời gian (phút) hoàn thành một bài tập của hai nhóm học sinh trong ${n} lần luyện tập như sau:<br>Nhóm I: ${A.join('; ')}<br>Nhóm II: ${B.join('; ')}<br>Tính thời gian trung bình và khoảng biến thiên của mỗi nhóm.`},
      {pts:.5,html:`Tính phương sai của mỗi nhóm (làm tròn đến hàng phần trăm). Nhóm nào có thời gian hoàn thành ổn định hơn?`}],
      sol:[ptxt([[`x̄${sub('I')} = x̄${sub('II')} = ${fmt(m)} (phút).`,.25],[`R${sub('I')} = ${Math.max(...A)-Math.min(...A)}; R${sub('II')} = ${Math.max(...B)-Math.min(...B)}.`,.25]]),
        ptxt([[`s${sub('I')}² = ${fr(A.reduce((x,y)=>x+(y-m)**2,0),n)} ≈ ${fmt(rd2(vA))}; s${sub('II')}² = ${fr(B.reduce((x,y)=>x+(y-m)**2,0),n)} ≈ ${fmt(rd2(vB))}.`,.25],[`Phương sai nhỏ hơn nên nhóm ${vA<vB?'I':'II'} ổn định hơn.`,.25]])],chk:()=>true}}
});
TL10('tl10-14-out',5,'VD','c',[13,14],r=>{
  for(;;){const n=r.int(9,11),c=r.pick(CTX10.slice(1)),base=[...Array(n-1)].map(()=>r.int(c.lo+2,c.hi-2)),out=c.hi*2+r.int(1,9);
    const a=r.shuffle(base.concat([out])),[Q1,Q2,Q3]=quart10(a),dq=Q3-Q1,hi=Q3+1.5*dq,lo=Q1-1.5*dq,outs=a.filter(x=>x<lo||x>hi);if(outs.length!==1||dq===0)continue;
    const m=mean10(a),mb=mean10(base);
    return{kind:'tl',title:'Phát hiện giá trị ngoại lệ',parts:[
      {pts:.5,html:`${dStem(c,a)}<br>Tìm các tứ phân vị và khoảng tứ phân vị của mẫu số liệu.`},
      {pts:.5,html:`Tìm giá trị ngoại lệ (nếu có) của mẫu số liệu. Khi bỏ giá trị ngoại lệ đi thì số trung bình thay đổi như thế nào (làm tròn đến hàng phần trăm)?`}],
      sol:[ptxt([[`Sắp xếp: ${srt(a).join('; ')}. Q${sub(2)} = ${fmt(Q2)}.`,.25],[`Q${sub(1)} = ${fmt(Q1)}, Q${sub(3)} = ${fmt(Q3)}, Δ${sub('Q')} = ${fmt(dq)}.`,.25]]),
        ptxt([[`Q${sub(3)} + 1,5Δ${sub('Q')} = ${fmt(hi)}, Q${sub(1)} − 1,5Δ${sub('Q')} = ${fmt(lo)} nên ${out} là giá trị ngoại lệ.`,.25],[`Số trung bình giảm từ ${isInt(m*100)?'':'khoảng '}${fmt(rd2(m))} xuống ${isInt(mb*100)?'':'khoảng '}${fmt(rd2(mb))}.`,.25]])],chk:()=>outs[0]===out}}
});
