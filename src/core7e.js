/* ===== Toán 7 học kì I: thêm dạng để các đề không lặp cùng một dạng ===== */
/* ---------- Chương I: Số hữu tỉ ---------- */
DS7('ds7-1-calc',1,'TH',r=>{
  let a,b,c;do{a=Q(r.nz(-5,5),r.pick([2,3,4]));b=Q(r.nz(-5,5),r.pick([2,3,6]));c=Q(r.nz(-4,4),r.pick([2,3,4,5]))}while(a[1]===1||b[1]===1||qv(c)===0);
  const A=qadd(a,qmul(b,c)),wrongA=qmul(qadd(a,b),c),x=qsub(c,a),wx=qadd(c,a);
  if(qv(A)===0||qv(A)===qv(wrongA)||qv(x)===qv(wx))return T.ds['ds7-1-calc'].gen(r);
  const E=`${qh(a)} + ${qp(b)} · ${qp(c)}`;
  return mkDS(r,{stem:`Cho biểu thức ${I('A')} = ${E}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Khi tính ${I('A')}, phải thực hiện phép nhân trước rồi mới thực hiện phép cộng.`,f:`Khi tính ${I('A')}, phải thực hiện phép cộng trước rồi mới thực hiện phép nhân.`,why:`Trong biểu thức không có dấu ngoặc, nhân chia trước, cộng trừ sau.`},
    {t:`${I('A')} = ${qh(A)}.`,f:`${I('A')} = ${qh(wrongA)}.`,why:`${I('A')} = ${qh(a)} + ${qh(qmul(b,c))} = ${qh(A)}.`},
    {t:`Số ${I('x')} thỏa mãn ${I('x')} + ${qp(a)} = ${qp(c)} là ${I('x')} = ${qh(x)}.`,f:`Số ${I('x')} thỏa mãn ${I('x')} + ${qp(a)} = ${qp(c)} là ${I('x')} = ${qh(wx)}.`,why:`Chuyển vế: ${I('x')} = ${qp(c)} − ${qp(a)} = ${qh(x)}.`},
    {t:`${I('A')} ${qv(A)>0?'&gt;':'&lt;'} 0.`,f:`${I('A')} ${qv(A)>0?'&lt;':'&gt;'} 0.`,why:`${I('A')} = ${qh(A)} ${qv(A)>0?'là số dương':'là số âm'}.`}
  ],chk:()=>qv(A)!==0&&closeN(qv(A),qv(a)+qv(b)*qv(c))&&closeN(qv(x)+qv(a),qv(c))});
});
TLN7('t7-1-move',1,'VD',r=>{
  for(;;){const a=Q(r.int(1,5),r.pick([2,3,4,6])),b=Q(r.nz(-5,5),r.pick([2,3,4])),c=Q(r.int(1,5),r.pick([3,4,6])),d=Q(r.nz(-5,5),r.pick([2,3,4,6]));
    const k=qsub(a,c);if(qv(k)===0)continue;const x=qmul(qsub(d,b),Q(k[1],k[0]));if(x[1]>4||Math.abs(qv(x))>20||!Number.isFinite(qv(x)))continue;
    const ok=Math.abs(qv(x)*100-Math.round(qv(x)*100))<1e-9;if(!ok)continue;
    const cf=q=>qv(q)===1?'':qh(q);
    return{kind:'tln',stem:`Tìm ${I('x')}, biết ${cf(a)}${I('x')} ${qv(b)<0?MINUS:'+'} ${qh(Q(Math.abs(b[0]),b[1]))} = ${cf(c)}${I('x')} ${qv(d)<0?MINUS:'+'} ${qh(Q(Math.abs(d[0]),d[1]))} (viết kết quả dưới dạng số thập phân).`,ans:qv(x),unit:'',
      sol:`Chuyển vế: (${qh(a)} − ${qh(c)})${I('x')} = ${qp(d)} − ${qp(b)}, tức ${qh(k)}${I('x')} = ${qh(qsub(d,b))}, nên ${I('x')} = ${qh(x)} = ${fmt(qv(x))}.`,
      chk:()=>closeN(qv(a)*qv(x)+qv(b),qv(c)*qv(x)+qv(d))}}
});
TLN7('t7-1-shop',1,'VD',r=>{
  const m=r.pick([200,250,300,400,500]),f=r.pick([[1,4],[2,5],[1,5],[3,10],[3,8]]),p=r.pick([10,20,25]);
  const spent=m*f[0]/f[1],rest=m-spent,second=rest*p/100,left=rest-second;
  if(!Number.isInteger(spent)||!Number.isInteger(second))return T.tln['t7-1-shop'].gen(r);
  return{kind:'tln',stem:`Bạn Lan có ${m} nghìn đồng. Lan dùng ${fr(f[0],f[1])} số tiền để mua sách, sau đó dùng ${p}% số tiền còn lại để mua bút. Hỏi Lan còn lại bao nhiêu nghìn đồng?`,ans:left,unit:'',
    sol:`Mua sách hết ${m}·${fr(f[0],f[1])} = ${spent} (nghìn đồng), còn ${rest}. Mua bút hết ${rest}·${p}% = ${second}. Còn lại ${rest} − ${second} = ${left} (nghìn đồng).`};
});
/* ---------- Chương II: Số thực ---------- */
TLN7('t7-2-count',2,'VD',r=>{
  const v=r.pick([2.5,3.2,3.7,4.1,4.6,5.3,2.9,6.4]),f=r.int(0,1);
  if(f===0){const n=2*Math.floor(v)+1;return{kind:'tln',stem:`Có bao nhiêu số nguyên ${I('x')} thỏa mãn |${I('x')}| &lt; ${fmt(v)}?`,ans:n,unit:'',
    sol:`|x| &lt; ${fmt(v)} ⟺ −${fmt(v)} &lt; x &lt; ${fmt(v)}; các số nguyên là −${Math.floor(v)}; …; 0; …; ${Math.floor(v)}, gồm ${n} số.`}}
  const s=r.pick([10,17,26,30,40,50,65,80]),k=Math.floor(Math.sqrt(s)-1e-9);
  return{kind:'tln',stem:`Có bao nhiêu số tự nhiên ${I('n')} thỏa mãn ${rt(I('n'))} &lt; ${rt(s)} và ${I('n')} là số chính phương?`,ans:k+1,unit:'',
    sol:`${rt(I('n'))} &lt; ${rt(s)} ⟺ n &lt; ${s}. Các số chính phương nhỏ hơn ${s}: ${[...Array(k+1).keys()].map(i=>i*i).join('; ')}, gồm ${k+1} số.`,chk:()=>k*k<s&&(k+1)*(k+1)>=s};
});
TLN7('t7-2-prec',2,'VD',r=>{
  const raw=r.pick([3.14159,2.71828,1.41421,1.73205,5.38724,7.06483,12.3456,9.87654]),pr=r.pick([0.005,0.05,0.5]),dg=pr===0.005?2:pr===0.05?1:0;
  const v=Math.round(raw*10**dg)/10**dg;
  const D=x=>String(x).replace('.',',');
  return{kind:'tln',stem:`Làm tròn số ${D(raw)} với độ chính xác ${D(pr)}.`,ans:v,unit:'',
    sol:`Độ chính xác ${D(pr)} nên làm tròn đến ${dg===2?'hàng phần trăm':dg===1?'hàng phần mười':'hàng đơn vị'}: ${D(raw)} ≈ ${D(v)}.`};
});
TL7('tl7-2-abs',2,'VD','alg',r=>{
  const a=Q(r.nz(-5,5),r.pick([2,3,4])),b=Q(r.int(1,7),r.pick([2,4,6])),s1=qadd(a,b),s2=qsub(a,b);
  const m=r.int(2,9),n=r.int(2,9);if(a[1]===1||b[1]===1||m===n)return T.tl['tl7-2-abs'].gen(r);
  return{kind:'tl',title:'Căn bậc hai số học, giá trị tuyệt đối',parts:[
    {pts:.5,html:`Tính ${rt(m*m)} + ${rt((m*n)**2)} : ${rt(n*n)} ${MINUS} |${sg(-m*n)}|.`},
    {pts:.5,html:`Tìm ${I('x')}, biết |${I('x')} ${qv(a)<0?'+':MINUS} ${qh(Q(Math.abs(a[0]),a[1]))}| = ${qh(b)}.`}],
    sol:[ptxt([[`= ${m} + ${m*n} : ${n} − ${m*n}`,.25],[`= ${m} + ${m} − ${m*n} = ${sg(2*m-m*n)}`,.25]]),
      ptxt([[`x ${qv(a)<0?'+':'−'} ${qh(Q(Math.abs(a[0]),a[1]))} = ${qh(b)} hoặc x ${qv(a)<0?'+':'−'} ${qh(Q(Math.abs(a[0]),a[1]))} = ${qh(Q(-b[0],b[1]))}`,.25],[`x = ${qh(s1)} hoặc x = ${qh(s2)}`,.25]])],
    chk:()=>Math.abs(Math.abs(qv(s1)-qv(a))-qv(b))<1e-9&&Math.abs(Math.abs(qv(s2)-qv(a))-qv(b))<1e-9};
});
/* ---------- Chương III: Góc và đường thẳng song song ---------- */
const perpFig7=(al)=>{
  const th=(180+al)*Math.PI/180,A=[4,4],s=4/(-Math.sin(th)),B=[A[0]+s*Math.cos(th),0];
  const P={a:[8.2,4],b:[8.2,0],C:[0,4],D:[0,0],A,B,c:[0,5.3]};
  const ext=(U,V,t)=>[U[0]+(V[0]-U[0])*t,U[1]+(V[1]-U[1])*t];P.d=ext(A,B,1.3);const top=ext(B,A,1.3);
  return fig2D({...P,a0:[-1.4,4],b0:[-1.4,0],c0:[0,-1.2],d0:top},[['a0','a'],['b0','b'],['c','c0'],['d','d0']],{w:250,h:170,right:[['A','C','D'],['B','D','C']],show:['A','B','C','D','a','b','c','d'],nodot:['a','b','c','d'],off:{a:[4,-6],b:[4,-6],c:[8,4],d:[8,4],C:[-9,-4],D:[-9,14],A:[6,-7],B:[8,13]}});
};
TLN7('t7-3-perp',3,'VD',r=>{
  const al=r.pick([50,55,60,65,70,110,115,120,125,130,135]),f=r.int(0,1),be=180-al;
  const head=`Cho hình vẽ, biết ${I('a')} ⊥ ${I('c')} tại ${I('C')}, ${I('b')} ⊥ ${I('c')} tại ${I('D')}; đường thẳng ${I('d')} cắt ${I('a')}, ${I('b')} lần lượt tại ${I('A')}, ${I('B')}`;
  return f?{kind:'tln',stem:`${head} và ${ANG('CAB')} = ${al}°.${perpFig7(al)}Tính số đo ${ANG('ABD')} (đơn vị: độ).`,ans:be,unit:'',
      sol:`${I('a')} và ${I('b')} cùng vuông góc với ${I('c')} nên ${I('a')} // ${I('b')}. ${ANG('CAB')} và ${ANG('ABD')} là hai góc trong cùng phía nên bù nhau: ${ANG('ABD')} = 180° − ${al}° = ${be}°.`}
    :{kind:'tln',stem:`${head} và ${ANG('ABD')} = ${be}°.${perpFig7(al)}Tính số đo ${ANG('CAB')} (đơn vị: độ).`,ans:al,unit:'',
      sol:`${I('a')} và ${I('b')} cùng vuông góc với ${I('c')} nên ${I('a')} // ${I('b')}. ${ANG('CAB')} và ${ANG('ABD')} là hai góc trong cùng phía nên bù nhau: ${ANG('CAB')} = 180° − ${be}° = ${al}°.`};
});
TLN7('t7-3-same',3,'VD',r=>{
  const k=r.pick([2,3,4,5]),f=r.int(0,1),x=180/(k+1),y=180-x;
  if(f===0)return{kind:'tln',stem:`Cho hình vẽ, biết ${I('a')} // ${I('b')}, ${ANGN('A',4)} và ${ANGN('B',1)} là hai góc trong cùng phía, ${ANGN('A',4)} = ${k}${ANGN('B',1)}. Tính số đo ${ANGN('A',4)} (đơn vị: độ).${parFig()}`,ans:y,unit:'',
    sol:`Hai góc trong cùng phía bù nhau: ${ANGN('A',4)} + ${ANGN('B',1)} = 180°, mà ${ANGN('A',4)} = ${k}${ANGN('B',1)} nên ${k+1}${ANGN('B',1)} = 180°, ${ANGN('B',1)} = ${x}°, ${ANGN('A',4)} = ${y}°.`,chk:()=>Number.isInteger(x)};
  const d=2*r.int(10,40),A=(180+d)/2;
  return{kind:'tln',stem:`Cho hình vẽ, biết ${I('a')} // ${I('b')} và ${ANGN('A',4)} ${MINUS} ${ANGN('B',1)} = ${d}°, trong đó ${ANGN('A',4)}, ${ANGN('B',1)} là hai góc trong cùng phía. Tính số đo ${ANGN('A',4)} (đơn vị: độ).${parFig()}`,ans:A,unit:'',
    sol:`${ANGN('A',4)} + ${ANGN('B',1)} = 180° và ${ANGN('A',4)} − ${ANGN('B',1)} = ${d}° nên ${ANGN('A',4)} = (180° + ${d}°) : 2 = ${A}°.`};
});
DS7('ds7-3-perp',3,'TH',r=>{
  const al=r.pick([50,55,60,65,70,110,115,120,125,130]);
  return mkDS(r,{stem:`Cho hình vẽ, biết ${I('a')} ⊥ ${I('c')} tại ${I('C')}, ${I('b')} ⊥ ${I('c')} tại ${I('D')}; đường thẳng ${I('d')} cắt ${I('a')}, ${I('b')} lần lượt tại ${I('A')}, ${I('B')} và ${ANG('CAB')} = ${al}°.${perpFig7(al)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('a')} // ${I('b')}.`,f:`${I('a')} cắt ${I('b')}.`,why:`Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.`},
    {t:`${ANG('ABD')} = ${180-al}°.`,f:`${ANG('ABD')} = ${al}°.`,why:`${ANG('CAB')} và ${ANG('ABD')} là hai góc trong cùng phía nên bù nhau.`},
    {t:`Đường thẳng ${I('d')} không vuông góc với ${I('b')}.`,f:`Đường thẳng ${I('d')} vuông góc với ${I('b')}.`,why:`Nếu ${I('d')} ⊥ ${I('b')} thì ${I('d')} ⊥ ${I('a')} (vì a // b), khi đó ${ANG('CAB')} = 90°, trái giả thiết.`},
    {t:`${ANG('CAB')} + ${ANG('ABD')} + ${ANG('BDC')} + ${ANG('DCA')} = 360°.`,f:`${ANG('CAB')} + ${ANG('ABD')} + ${ANG('BDC')} + ${ANG('DCA')} = 270°.`,why:`${al}° + ${180-al}° + 90° + 90° = 360°.`}
  ],chk:()=>al!==90});
});
TL7('tl7-3-perp',3,'VD','geo',r=>{
  const al=r.pick([50,55,60,65,70,110,115,120,125,130]),k=(180-al)%2===0?r.int(0,1):0;
  return{kind:'tl',title:'Quan hệ giữa vuông góc và song song',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình vẽ, biết ${I('a')} ⊥ ${I('c')} tại ${I('C')}, ${I('b')} ⊥ ${I('c')} tại ${I('D')}; đường thẳng ${I('d')} cắt ${I('a')}, ${I('b')} lần lượt tại ${I('A')}, ${I('B')} và ${ANG('CAB')} = ${al}°.${perpFig7(al)}Chứng minh ${I('a')} // ${I('b')}.`},
    {pts:.5,html:`Tính số đo ${ANG('ABD')}. ${k?`Vẽ tia ${I('Bt')} là tia phân giác của ${ANG('ABD')}, tính số đo ${ANG('tBD')}.`:''}`}],
    sol:[ptxt([[`${I('a')} ⊥ ${I('c')} và ${I('b')} ⊥ ${I('c')}`,.25],[`nên ${I('a')} // ${I('b')} (hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song).`,.25]]),
      ptxt([[`${ANG('CAB')} và ${ANG('ABD')} là hai góc trong cùng phía tạo bởi đường thẳng ${I('d')} cắt hai đường thẳng song song ${I('a')}, ${I('b')} nên ${ANG('ABD')} = 180° − ${al}° = ${180-al}°.`,k?.25:.5]].concat(k?[[`${I('Bt')} là tia phân giác nên ${ANG('tBD')} = ${180-al}° : 2 = ${(180-al)/2}°.`,.25]]:[]))]};
});
/* ---------- Chương IV: Tam giác bằng nhau ---------- */
TLN7('t7-4-iso',4,'VD',r=>{
  const f=r.int(0,1);
  if(f===0){for(;;){const d=r.int(1,12)*5,B=(180-d)/3;if(!Number.isInteger(B)||B<=0)continue;const A=B+d;if(A>=180)continue;
    return{kind:'tln',stem:`Cho tam giác ${I('ABC')} cân tại ${I('A')} có ${ANG('A')} lớn hơn ${ANG('B')} là ${d}°. Tính số đo ${ANG('B')} (đơn vị: độ).`,ans:B,unit:'',
      sol:`Tam giác cân tại A nên ${ANG('B')} = ${ANG('C')}. Ta có ${ANG('A')} + 2${ANG('B')} = 180° và ${ANG('A')} = ${ANG('B')} + ${d}° nên 3${ANG('B')} = ${180-d}°, ${ANG('B')} = ${B}°.`}}}
  const e=r.int(46,75)*2,B=180-e;
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} cân tại ${I('A')}, góc ngoài tại đỉnh ${I('B')} bằng ${e}°. Tính số đo ${ANG('A')} (đơn vị: độ).`,ans:180-2*B,unit:'',
    sol:`${ANG('ABC')} = 180° − ${e}° = ${B}° = ${ANG('C')}; ${ANG('A')} = 180° − 2·${B}° = ${180-2*B}°.`,chk:()=>180-2*B>0};
});
/* ---------- Chương V: Thu thập và biểu diễn dữ liệu ---------- */
N7('m7-5-choose',5,'NB',r=>{
  const L=[['so sánh tỉ lệ phần trăm của các phần so với toàn thể','Biểu đồ hình quạt tròn'],['biểu diễn sự thay đổi của một đại lượng theo thời gian','Biểu đồ đoạn thẳng']],[need,ok]=r.pick(L);
  return mkTxt(r,{stem:`Để ${need}, ta nên dùng loại biểu đồ nào?`,correct:ok+'.',wrongs:['Biểu đồ hình quạt tròn.','Biểu đồ đoạn thẳng.','Biểu đồ tranh.','Bảng số liệu ban đầu (không dùng biểu đồ).'].filter(w=>w!==ok+'.').slice(0,3),
    sol:`${ok} thích hợp để ${need}.`});
});
N7('m7-5-valid',5,'NB',r=>{
  const total=r.pick([30,35,40,45]),vals=(()=>{for(;;){const a=r.int(4,15),b=r.int(4,15),c=r.int(4,15),d=total-a-b-c;if(d>2)return[a,b,c,d]}})();
  const bad=r.pick([['Số học sinh của lớp 7A',`${total+r.int(3,8)} học sinh, trong khi lớp chỉ có ${total} học sinh`],['Tỉ lệ phần trăm các lựa chọn','tổng các tỉ lệ bằng 112%'],['Chiều cao của một bạn lớp 7','25 m']]);
  return mkTxt(r,{stem:`Lớp 7A có ${total} học sinh. Kết quả nào sau đây cho thấy dữ liệu thu được <b>không hợp lí</b>?`,correct:`${bad[0]}: ${bad[1]}.`,
    wrongs:[`Số học sinh chọn mỗi môn thể thao lần lượt là ${vals.join('; ')} (tổng ${total}).`,'Số giờ tự học mỗi ngày của một bạn là 2 giờ.','Môn học yêu thích của một bạn là Toán.'],
    sol:`Dữ liệu “${bad[0]}: ${bad[1]}” không hợp lí. Các dữ liệu còn lại đều có thể xảy ra.`});
});
TLN7('t7-5-diff',5,'VD',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),[i,j]=r.shuffle([0,1,2,3]).slice(0,2),N=r.pick([40,80,120,200,400]),d=N*Math.abs(pcts[i]-pcts[j])/100;
  if(!Number.isInteger(d)||d===0)return T.tln['t7-5-diff'].gen(r);
  const [hi,lo]=pcts[i]>pcts[j]?[i,j]:[j,i];
  return{kind:'tln',stem:`Biểu đồ hình quạt tròn dưới đây biểu diễn kết quả khảo sát ${set.what} của học sinh khối 7.<div class="figure">${pieSVG(set.names.map((name,k)=>({name,pct:pcts[k]})))}</div>Biết số học sinh chọn “${set.names[hi]}” nhiều hơn số học sinh chọn “${set.names[lo]}” là ${d} bạn. Hỏi khối 7 có bao nhiêu học sinh tham gia khảo sát?`,ans:N,unit:'',
    sol:`${d} bạn ứng với ${pcts[hi]}% − ${pcts[lo]}% = ${pcts[hi]-pcts[lo]}% tổng số. Tổng số học sinh là ${d} : ${pcts[hi]-pcts[lo]}% = ${N}.`};
});
TLN7('t7-5-trend',5,'VD',r=>{
  const wk=['Tuần 1','Tuần 2','Tuần 3','Tuần 4','Tuần 5'],vals=distinctInts(r,5,15,60),inc=vals.slice(1).map((v,i)=>v-vals[i]),f=r.int(0,1);
  const target=f?Math.min(...inc):Math.max(...inc);
  if((f&&target>=0)||(!f&&target<=0)||inc.filter(v=>v===target).length>1)return T.tln['t7-5-trend'].gen(r);
  const i=inc.indexOf(target);
  return{kind:'tln',stem:`Số sách thư viện cho mượn trong 5 tuần được cho trong biểu đồ đoạn thẳng sau.<div class="figure">${lineSVG(wk,vals,{unit:'Số sách'})}</div>So với tuần liền trước, tuần có số sách cho mượn ${f?'giảm':'tăng'} nhiều nhất đã ${f?'giảm':'tăng'} bao nhiêu quyển?`,ans:Math.abs(target),unit:'',
    sol:`Thay đổi so với tuần trước: ${inc.map((v,k)=>`${wk[k+1]}: ${v>0?'+'+v:sg(v)}`).join('; ')}. ${f?'Giảm':'Tăng'} nhiều nhất ở ${wk[i+1]}: ${Math.abs(target)} quyển.`};
});
