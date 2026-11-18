/* ================================================================
   LỚP 12 – Chương III: Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm (Bài 9 – 10)
   ================================================================ */
const GRP12=[
  {col:'Thời gian (phút)',ctx:'thời gian chờ khám bệnh của các bệnh nhân tại một phòng khám',a:[0,5],h:[5],who:'Số bệnh nhân',u:'phút'},
  {col:'Tuổi thọ (năm)',ctx:'tuổi thọ của một số linh kiện điện tử do một phân xưởng sản xuất',a:[1.5,2],h:[0.5],who:'Số linh kiện',u:'năm'},
  {col:'Chiều cao (cm)',ctx:'chiều cao của học sinh lớp 12A',a:[145,150,155],h:[5],who:'Số học sinh',u:'cm'},
  {col:'Lợi nhuận (triệu đồng)',ctx:'lợi nhuận hằng tháng của một cửa hàng trong một số tháng',a:[10,20],h:[10],who:'Số tháng',u:'triệu đồng'},
  {col:'Khối lượng (g)',ctx:'khối lượng của một số quả xoài trong một lô hàng',a:[250,300],h:[25,50],who:'Số quả',u:'g'},
  {col:'Quãng đường (km)',ctx:'quãng đường chạy bộ mỗi tuần của các thành viên một câu lạc bộ',a:[0,10],h:[5,10],who:'Số người',u:'km'}
];
function grp12(r,o={}){
  for(;;){
    const T0=o.T||r.pick(GRP12),h=r.pick(T0.h),a=r.pick(T0.a),k=o.k||5,f=Array.from({length:k},()=>r.int(o.fmin??1,o.fmax??14));
    if(f[0]===0||f[k-1]===0)continue;const n=f.reduce((s,x)=>s+x,0);if(n<12)continue;
    const lo=i=>Math.round((a+i*h)*100)/100,hi=i=>lo(i+1),mid=i=>(lo(i)+hi(i))/2,lab=i=>`[${fmt(lo(i))}; ${fmt(hi(i))})`;
    const cum=pos=>{let c=0;for(let i=0;i<k;i++){if(c+f[i]>=pos)return{i,before:c};c+=f[i]}};
    const qu=pos=>{const {i,before}=cum(pos);return lo(i)+(pos-before)/f[i]*h};
    const mean=f.reduce((s,x,i)=>s+x*mid(i),0)/n,v=f.reduce((s,x,i)=>s+x*mid(i)**2,0)/n-mean*mean;
    return{T:T0,h,a,k,f,n,lo,hi,mid,lab,cum,qu,mean,v,sd:Math.sqrt(v),R:hi(k-1)-lo(0),Q1:qu(n/4),Q3:qu(3*n/4),
      table:(who)=>tableHTML([T0.col,...f.map((_,i)=>lab(i))],[[who||T0.who,...f]])};
  }
}
const gStem=D=>`Bảng sau thống kê ${D.T.ctx}:${D.table()}`;
const rr2=v=>Math.round(v*100)/100;
const qSol=(D,w)=>{const pos=w===1?D.n/4:3*D.n/4,{i,before}=D.cum(pos),v=D.qu(pos);
  return `Cỡ mẫu n = ${D.n}; ${fr((w===1?'':'3')+'n',4)} = ${fmt(pos)} nên nhóm chứa Q${sub(w)} là ${D.lab(i)}. Q${sub(w)} = ${fmt(D.lo(i))} + ${fr(`${fmt(pos)} − ${before}`,D.f[i])}·${fmt(D.h)} ≈ ${fmt(rr2(v))}.`};
const meanSol=D=>`Giá trị đại diện các nhóm: ${D.f.map((_,i)=>fmt(D.mid(i))).join('; ')}. x̄ = ${fr(D.f.map((x,i)=>`${x}·${fmt(D.mid(i))}`).join(' + '),D.n)} ≈ ${fmt(rr2(D.mean))}.`;
const varSol=D=>`s² = ${fr(1,D.n)}(${D.f.map((x,i)=>`${x}·${fmt(D.mid(i))}²`).join(' + ')}) − x̄² ≈ ${fmt(rr2(D.v))}`;

/* ===================== Bài 9: Khoảng biến thiên và khoảng tứ phân vị ===================== */
N12('k12-9-range',3,'NB',[9],r=>{
  const D=grp12(r);
  return mkNum(r,{stem:`${gStem(D)}Khoảng biến thiên của mẫu số liệu ghép nhóm trên là`,correct:D.R,ok:v=>v>0,cands:[D.R-D.h,D.hi(D.k-1),D.mid(D.k-1)-D.mid(0),D.n,D.h*(D.k+1)].map(rr2).filter(v=>v!==D.R),
    sol:`R = ${fmt(D.hi(D.k-1))} − ${fmt(D.lo(0))} = ${fmt(D.R)} (đầu mút phải của nhóm cuối trừ đầu mút trái của nhóm đầu).`,chk:()=>Math.abs(D.R-D.h*D.k)<1e-9});
});
N12('k12-9-qgrp',3,'NB',[9],r=>{
  const D=grp12(r),w=r.pick([1,3]),{i}=D.cum(w===1?D.n/4:3*D.n/4);
  return mkTxt(r,{stem:`${gStem(D)}Nhóm chứa tứ phân vị thứ ${w===1?'nhất':'ba'} của mẫu số liệu trên là`,correct:D.lab(i),wrongs:r.shuffle(D.f.map((_,j)=>j).filter(j=>j!==i)).map(D.lab),
    sol:`Cỡ mẫu n = ${D.n}; Q${sub(w)} là số liệu thứ ${fmt(w===1?D.n/4:3*D.n/4)} (theo thứ tự tăng). Tần số tích luỹ: ${D.f.map((_,j)=>D.f.slice(0,j+1).reduce((s,x)=>s+x,0)).join('; ')} ⟹ nhóm ${D.lab(i)}.`,chk:()=>true});
});
N12('k12-9-dq',3,'TH',[9],r=>{
  const D=grp12(r),dq=rr2(D.Q3-D.Q1);
  return mkNum(r,{stem:`${gStem(D)}Khoảng tứ phân vị của mẫu số liệu ghép nhóm trên (làm tròn đến hàng phần trăm) là`,correct:dq,ok:v=>v>0,cands:[rr2(D.Q3),rr2(D.Q1),rr2(D.Q3+D.Q1),D.R,rr2(dq+D.h/2)].filter(v=>v!==dq),
    sol:`${qSol(D,1)} ${qSol(D,3)} Δ${sub('Q')} = Q${sub(3)} − Q${sub(1)} ≈ ${fmt(dq)}.`,chk:()=>Math.abs(dq-(D.Q3-D.Q1))<0.0051&&D.Q3>D.Q1});
});
N12('k12-9-theory',3,'NB',[9,10],r=>{
  const TR=[`Khoảng biến thiên của mẫu số liệu ghép nhóm bằng hiệu giữa đầu mút phải của nhóm cuối cùng và đầu mút trái của nhóm đầu tiên.`,`Khoảng tứ phân vị bằng hiệu Q${sub(3)} − Q${sub(1)}.`,`Độ lệch chuẩn là căn bậc hai số học của phương sai.`,`Phương sai, độ lệch chuẩn càng lớn thì mẫu số liệu càng phân tán.`,`Khoảng tứ phân vị đo mức độ phân tán của nửa giữa của mẫu số liệu.`];
  const FL=[`Khoảng biến thiên của mẫu số liệu ghép nhóm bằng hiệu giữa giá trị đại diện của nhóm cuối cùng và nhóm đầu tiên.`,`Khoảng tứ phân vị bằng tổng Q${sub(3)} + Q${sub(1)}.`,`Độ lệch chuẩn bằng bình phương của phương sai.`,`Phương sai càng nhỏ thì mẫu số liệu càng phân tán.`,`Phương sai có cùng đơn vị đo với các số liệu của mẫu.`];
  const want=r.chance(.5);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:want?r.pick(TR):r.pick(FL),wrongs:r.shuffle(want?FL:TR),
    sol:want?`Các khẳng định còn lại sai: độ lệch chuẩn là căn bậc hai của phương sai, Δ${sub('Q')} = Q${sub(3)} − Q${sub(1)}, phương sai có đơn vị là bình phương đơn vị của số liệu, độ phân tán tăng khi phương sai tăng.`:`Các khẳng định còn lại đúng theo định nghĩa và ý nghĩa của các số đặc trưng đo mức độ phân tán.`,chk:()=>true});
});
DS12('ds12-9-grp',3,'TH',[9],r=>{
  const D=grp12(r),i1=D.cum(D.n/4).i,i3=D.cum(3*D.n/4).i,q1=rr2(D.Q1),dq=rr2(D.Q3-D.Q1);
  return mkDS(r,{stem:`${gStem(D)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Khoảng biến thiên của mẫu số liệu là ${fmt(D.R)}.`,f:`Khoảng biến thiên của mẫu số liệu là ${fmt(rr2(D.R-D.h))}.`,why:`R = ${fmt(D.hi(D.k-1))} − ${fmt(D.lo(0))} = ${fmt(D.R)}.`},
    {t:`Nhóm chứa tứ phân vị thứ ba là ${D.lab(i3)}.`,f:`Nhóm chứa tứ phân vị thứ ba là ${D.lab(i3===D.k-1?i3-1:i3+1)}.`,why:`${fr('3n',4)} = ${fmt(3*D.n/4)}; tần số tích luỹ cho thấy nhóm chứa Q${sub(3)} là ${D.lab(i3)}.`},
    {t:`Tứ phân vị thứ nhất xấp xỉ bằng ${fmt(q1)}.`,f:`Tứ phân vị thứ nhất xấp xỉ bằng ${fmt(rr2(q1+D.h/2))}.`,why:qSol(D,1)},
    {t:`Khoảng tứ phân vị xấp xỉ bằng ${fmt(dq)}.`,f:`Khoảng tứ phân vị xấp xỉ bằng ${fmt(rr2(D.Q3+D.Q1))}.`,why:`${qSol(D,3)} Δ${sub('Q')} ≈ ${fmt(dq)}.`}],
    chk:()=>i1>=0&&dq!==rr2(D.Q3+D.Q1)});
});
TLN12('t12-9-dq',3,'VD',[9],r=>{
  const D=grp12(r),dq=rr2(D.Q3-D.Q1);
  return{kind:'tln',stem:`${gStem(D)}Tính khoảng tứ phân vị của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).`,ans:dq,unit:'',sol:`${qSol(D,1)} ${qSol(D,3)} Δ${sub('Q')} ≈ ${fmt(dq)}.`,chk:()=>D.Q3>D.Q1};
});
TLN12('t12-9-q',3,'VD',[9],r=>{
  const D=grp12(r),w=r.pick([1,3]),v=rr2(w===1?D.Q1:D.Q3);
  return{kind:'tln',stem:`${gStem(D)}Tìm tứ phân vị thứ ${w===1?'nhất':'ba'} của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).`,ans:v,unit:'',sol:qSol(D,w),chk:()=>true};
});
TL12('tl12-9-cmp',3,'VD','b',[9],r=>{
  const T0=r.pick(GRP12.filter(t=>t.h.length===1)),D1=grp12(r,{T:T0}),D2=(()=>{for(;;){const d=grp12(r,{T:T0});if(d.h===D1.h&&d.a===D1.a&&Math.abs((d.Q3-d.Q1)-(D1.Q3-D1.Q1))>0.05)return d}})();
  const q1=rr2(D1.Q3-D1.Q1),q2=rr2(D2.Q3-D2.Q1);
  const tb=tableHTML([T0.col,...D1.f.map((_,i)=>D1.lab(i))],[['Nhóm I',...D1.f],['Nhóm II',...D2.f]]);
  return{kind:'tl',title:'Khoảng tứ phân vị',parts:[
    {pts:.5,html:`Bảng sau thống kê ${T0.ctx} ở hai nhóm I và II:${tb}Tính khoảng tứ phân vị của mẫu số liệu ghép nhóm của nhóm I.`},
    {pts:.5,html:`Tính khoảng tứ phân vị của mẫu số liệu của nhóm II. Dựa vào khoảng tứ phân vị, cho biết số liệu của nhóm nào phân tán hơn.`}],
    sol:[ptxt([[qSol(D1,1),.25],[`${qSol(D1,3)} Δ${sub('Q')} ≈ ${fmt(q1)}.`,.25]]),
      ptxt([[`Tương tự, nhóm II: Q${sub(1)} ≈ ${fmt(rr2(D2.Q1))}, Q${sub(3)} ≈ ${fmt(rr2(D2.Q3))}, Δ${sub('Q')} ≈ ${fmt(q2)}.`,.25],[`Vì ${fmt(Math.max(q1,q2))} > ${fmt(Math.min(q1,q2))} nên số liệu của nhóm ${q1>q2?'I':'II'} phân tán hơn.`,.25]])],
    chk:()=>q1!==q2};
});

/* ===================== Bài 10: Phương sai và độ lệch chuẩn ===================== */
N12('k12-10-var',3,'TH',[10],r=>{
  const D=grp12(r,{fmax:10}),v=rr2(D.v),ask=r.chance(.5),ans=ask?v:rr2(D.sd);
  return mkNum(r,{stem:`${gStem(D)}${ask?'Phương sai':'Độ lệch chuẩn'} của mẫu số liệu ghép nhóm trên (làm tròn đến hàng phần trăm) là`,correct:ans,ok:x=>x>0,cands:ask?[rr2(D.sd),rr2(D.v*D.n/(D.n-1)),rr2(D.mean),rr2(D.v+D.h)]:[rr2(D.v),rr2(D.sd*2),rr2(Math.sqrt(D.v*D.n/(D.n-1))),rr2(D.sd+D.h/2)],
    sol:`${meanSol(D)} ${varSol(D)}${ask?'.':`; s = ${rt('s²')} ≈ ${fmt(rr2(D.sd))}.`}`,chk:()=>Math.abs(ans-(ask?D.v:D.sd))<0.0051});
});
N12('k12-10-mean',3,'NB',[10],r=>{
  const D=grp12(r),m=rr2(D.mean);
  return mkNum(r,{stem:`${gStem(D)}Số trung bình của mẫu số liệu ghép nhóm trên (làm tròn đến hàng phần trăm) là`,correct:m,ok:x=>x>0,cands:[rr2(m+D.h/2),rr2(m-D.h/2),rr2(D.mid(2)),rr2(m+D.h)].filter(x=>x!==m),
    sol:meanSol(D),chk:()=>Math.abs(m-D.mean)<0.0051});
});
N12('k12-10-cmp',3,'TH',[10],r=>{
  const A=r.pick(['An','Bình','Minh','Lan']),B=r.pick(['Hùng','Mai','Nam','Hoa'].filter(x=>x!==A)),sA=rr2(r.int(30,150)/100),sB=rr2(r.int(30,150)/100),m=rr2(r.int(1010,1080)/100);
  if(sA===sB)return T.nlc['k12-10-cmp'].gen(r);
  const st=sA<sB?A:B,W=[`Vận động viên ${sA<sB?B:A} có thành tích ổn định hơn.`,`Hai vận động viên có thành tích ổn định như nhau.`,`Không thể so sánh vì hai mẫu có cỡ mẫu khác nhau.`];
  return mkTxt(r,{stem:`Thời gian chạy 100 m (giây) trong các buổi tập của hai vận động viên ${A} và ${B} được ghép nhóm; hai mẫu số liệu có số trung bình xấp xỉ bằng nhau (khoảng ${fmt(m)} giây), độ lệch chuẩn lần lượt là ${I('s')}${sub('1')} ≈ ${fmt(sA)} và ${I('s')}${sub('2')} ≈ ${fmt(sB)}. Khẳng định nào sau đây đúng?`,correct:`Vận động viên ${st} có thành tích ổn định hơn.`,wrongs:W,
    sol:`Hai mẫu có số trung bình xấp xỉ nhau nên có thể dùng độ lệch chuẩn để so sánh. Độ lệch chuẩn càng nhỏ thì số liệu càng ít phân tán, tức là thành tích càng ổn định: vận động viên ${st}.`,chk:()=>sA!==sB});
});
N12('k12-10-unit',3,'NB',[10],r=>{
  const T0=r.pick(GRP12.filter(t=>['cm','g','km','phút'].includes(t.u))),u=T0.u;
  const ask=r.chance(.5);
  return mkTxt(r,{stem:`Cho mẫu số liệu ghép nhóm về ${T0.ctx} (đơn vị: ${u}). ${ask?'Phương sai':'Độ lệch chuẩn'} của mẫu số liệu này có đơn vị là`,correct:ask?`${u}²`:u,wrongs:ask?[u,`${u}³`,'không có đơn vị']:[`${u}²`,`${u}³`,'không có đơn vị'],
    sol:`Phương sai là trung bình cộng các bình phương độ lệch nên có đơn vị ${u}²; độ lệch chuẩn là căn bậc hai của phương sai nên có cùng đơn vị với số liệu (${u}).`,chk:()=>true});
});
DS12('ds12-10-grp',3,'TH',[10],r=>{
  const D=grp12(r,{fmax:10}),m=rr2(D.mean),v=rr2(D.v),s=rr2(D.sd);
  return mkDS(r,{stem:`${gStem(D)}Xét tính đúng sai của các khẳng định sau (các giá trị làm tròn đến hàng phần trăm):`,items:[
    {t:`Giá trị đại diện của nhóm ${D.lab(1)} là ${fmt(D.mid(1))}.`,f:`Giá trị đại diện của nhóm ${D.lab(1)} là ${fmt(D.lo(1))}.`,why:`Giá trị đại diện là trung điểm của nhóm: ${fr(`${fmt(D.lo(1))} + ${fmt(D.hi(1))}`,2)} = ${fmt(D.mid(1))}.`},
    {t:`Số trung bình của mẫu số liệu xấp xỉ bằng ${fmt(m)}.`,f:`Số trung bình của mẫu số liệu xấp xỉ bằng ${fmt(rr2(m+D.h/2))}.`,why:meanSol(D)},
    {t:`Phương sai của mẫu số liệu xấp xỉ bằng ${fmt(v)}.`,f:`Phương sai của mẫu số liệu xấp xỉ bằng ${fmt(s)}.`,why:varSol(D)+'.'},
    {t:`Độ lệch chuẩn của mẫu số liệu xấp xỉ bằng ${fmt(s)}.`,f:`Độ lệch chuẩn của mẫu số liệu xấp xỉ bằng ${fmt(rr2(s*s*s/Math.max(.01,v)+.5))}.`,why:`s = ${rt('s²')} ≈ ${fmt(s)}.`}],
    chk:()=>v!==s&&s!==rr2(s*s*s/Math.max(.01,v)+.5)&&D.lo(1)!==D.mid(1)});
});
TLN12('t12-10-var',3,'VD',[10],r=>{
  const D=grp12(r,{fmax:10}),v=rr2(D.v);
  return{kind:'tln',stem:`${gStem(D)}Tính phương sai của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).`,ans:v,unit:'',sol:`${meanSol(D)} ${varSol(D)}.`,chk:()=>Math.abs(v-D.v)<0.0051};
});
TLN12('t12-10-sd',3,'VD',[10],r=>{
  const D=grp12(r,{fmax:10}),s=rr2(D.sd);
  return{kind:'tln',stem:`${gStem(D)}Tính độ lệch chuẩn của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).`,ans:s,unit:'',sol:`${meanSol(D)} ${varSol(D)}; s ≈ ${fmt(s)}.`,chk:()=>Math.abs(s-D.sd)<0.0051};
});
TL12('tl12-10-risk',3,'VD','b',[10],r=>{
  const T0=GRP12[3];
  for(;;){const D1=grp12(r,{T:T0,fmax:10}),D2=grp12(r,{T:T0,fmax:10});if(D1.a!==D2.a||D1.h!==D2.h||Math.abs(D1.mean-D2.mean)>2||Math.abs(D1.sd-D2.sd)<0.3)continue;
    const tb=tableHTML(['Lợi nhuận (triệu đồng)',...D1.f.map((_,i)=>D1.lab(i))],[['Số tháng (phương án A)',...D1.f],['Số tháng (phương án B)',...D2.f]]);
    const s1=rr2(D1.sd),s2=rr2(D2.sd);
    return{kind:'tl',title:'Phương sai, độ lệch chuẩn và độ rủi ro',parts:[
      {pts:.5,html:`Một người theo dõi lợi nhuận hằng tháng khi đầu tư theo hai phương án A và B, kết quả như bảng sau:${tb}Tính số trung bình và độ lệch chuẩn của mẫu số liệu ứng với phương án A (làm tròn đến hàng phần trăm).`},
      {pts:.5,html:`Tính độ lệch chuẩn ứng với phương án B. Nếu dùng độ lệch chuẩn để đo độ rủi ro thì phương án nào rủi ro hơn?`}],
      sol:[ptxt([[meanSol(D1),.25],[`${varSol(D1)}; s${sub('A')} ≈ ${fmt(s1)}.`,.25]]),
        ptxt([[`Phương án B: x̄ ≈ ${fmt(rr2(D2.mean))}, s${sub('B')} ≈ ${fmt(s2)}.`,.25],[`Hai phương án có lợi nhuận trung bình xấp xỉ nhau; s${sub(s1>s2?'A':'B')} lớn hơn nên phương án ${s1>s2?'A':'B'} rủi ro hơn.`,.25]])],
      chk:()=>s1!==s2}}
});
TL12('tl12-10-sd',3,'TH','b',[10],r=>{
  const D=grp12(r,{fmax:10}),m=rr2(D.mean),s=rr2(D.sd);
  return{kind:'tl',title:'Phương sai và độ lệch chuẩn',parts:[
    {pts:.5,html:`${gStem(D)}Tính số trung bình của mẫu số liệu ghép nhóm trên (làm tròn đến hàng phần trăm).`},
    {pts:.5,html:`Tính phương sai và độ lệch chuẩn của mẫu số liệu đó (làm tròn đến hàng phần trăm).`}],
    sol:[ptxt([[`Giá trị đại diện các nhóm: ${D.f.map((_,i)=>fmt(D.mid(i))).join('; ')}; cỡ mẫu n = ${D.n}.`,.25],[`x̄ ≈ ${fmt(m)}.`,.25]]),
      ptxt([[`${varSol(D)}.`,.25],[`s ≈ ${fmt(s)}.`,.25]])],
    chk:()=>Math.abs(s-D.sd)<0.0051};
});
