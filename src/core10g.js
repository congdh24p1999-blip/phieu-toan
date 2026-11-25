/* ================================================================
   Toán 10 (Kết nối tri thức): câu trắc nghiệm đúng/sai mức NHẬN BIẾT.
   Bổ sung để ý thứ nhất của Phần II có câu mức Biết như khung Công văn 7991
   (trước đây lớp 10 chỉ có câu đúng/sai mức Hiểu, Vận dụng nên tỉ lệ Biết thấp).
   Mỗi ý chỉ hỏi định nghĩa, kí hiệu, công thức hoặc một phép thay số trực tiếp.
   ================================================================ */

/* ---------- Chương I. Mệnh đề và tập hợp ---------- */
DS10('ds10-1-nb-prop',1,'NB',[1],r=>{
  const a=r.int(12,40),b=r.int(2,9),c=r.int(2,a-1),s=r.pick(['Bạn đã làm bài tập chưa?','Hôm nay trời đẹp quá!','Hãy giữ trật tự trong lớp!','Mấy giờ rồi?']);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`Câu "${a} + ${b} = ${a+b}" là một mệnh đề đúng.`,f:`Câu "${a} + ${b} = ${a+b+1}" là một mệnh đề đúng.`,why:`${a} + ${b} = ${a+b}.`},
    {t:`Câu "${s}" không phải là mệnh đề.`,f:`Câu "${s}" là một mệnh đề.`,why:'Câu hỏi, câu cảm thán, câu cầu khiến không khẳng định điều gì đúng hay sai nên không phải là mệnh đề.'},
    {t:`Mệnh đề phủ định của "${a} > ${c}" là "${a} ≤ ${c}".`,f:`Mệnh đề phủ định của "${a} > ${c}" là "${a} < ${c}".`,why:'Phủ định của "a > b" là "a ≤ b".'},
    {t:`Mệnh đề "∀${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} ≥ 0" là mệnh đề đúng.`,f:`Mệnh đề "∀${I('x')} ∈ ${RR}, ${I('x')}${sup(2)} > 0" là mệnh đề đúng.`,why:'x² ≥ 0 với mọi số thực x; với x = 0 thì x² = 0 nên "x² > 0" không đúng với mọi x.'}],chk:()=>c<a});
});
DS10('ds10-2-nb-set',1,'NB',[2],r=>{
  const n=r.int(4,7),A=[...Array(n).keys()],m=r.int(1,n-1);
  return mkDS(r,{stem:`Cho tập hợp ${I('A')} = {${I('x')} ∈ ${NN} | ${I('x')} < ${n}}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('A')} = ${setZ(A)}.`,f:`${I('A')} = ${setZ(A.slice(1))}.`,why:`Các số tự nhiên nhỏ hơn ${n} là ${A.join(', ')} (kể cả số 0).`},
    {t:`${m} ∈ ${I('A')} và ${n} ∉ ${I('A')}.`,f:`${n} ∈ ${I('A')}.`,why:`${m} < ${n} nên ${m} ∈ A; ${n} không nhỏ hơn ${n} nên ${n} ∉ A.`},
    {t:`Tập hợp ${I('A')} có ${n} phần tử.`,f:`Tập hợp ${I('A')} có ${n-1} phần tử.`,why:`A = ${setZ(A)} gồm ${n} phần tử.`},
    {t:`∅ ⊂ ${I('A')}.`,f:`${I('A')} ⊂ ∅.`,why:'Tập rỗng là tập con của mọi tập hợp; A có phần tử nên A không là tập con của ∅.'}],chk:()=>A.length===n});
});

/* ---------- Chương II. Bất phương trình bậc nhất hai ẩn ---------- */
DS10('ds10-3-nb-ineq',2,'NB',[3],r=>{
  for(;;){const a=r.nz(-4,4),b=r.nz(-4,4),c=r.nz(-8,8),op=r.pick(['<','≤','>','≥']),F=(x,y)=>a*x+b*y;
    const ok=(x,y)=>({'<':F(x,y)<c,'≤':F(x,y)<=c,'>':F(x,y)>c,'≥':F(x,y)>=c})[op];
    const P=[r.int(-3,3),r.int(-3,3)],Qp=[r.int(-3,3),r.int(-3,3)];if(!ok(...P)||ok(...Qp))continue;
    const L=lin3H([a,b],['x','y']),o0=ok(0,0),cl=op==='≤'||op==='≥';
    return mkDS(r,{stem:`Cho bất phương trình ${L} ${op} ${sg(c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Đây là một bất phương trình bậc nhất hai ẩn ${I('x')}, ${I('y')}.`,f:'Đây không phải là bất phương trình bậc nhất hai ẩn.',why:'Bất phương trình bậc nhất hai ẩn có dạng ax + by < c (hoặc ≤, >, ≥), trong đó a, b không đồng thời bằng 0.'},
      {t:`Cặp số (${sg(P[0])}; ${sg(P[1])}) là một nghiệm của bất phương trình.`,f:`Cặp số (${sg(Qp[0])}; ${sg(Qp[1])}) là một nghiệm của bất phương trình.`,why:`Thay (${sg(P[0])}; ${sg(P[1])}): vế trái bằng ${sg(F(...P))}, thoả mãn; thay (${sg(Qp[0])}; ${sg(Qp[1])}): vế trái bằng ${sg(F(...Qp))}, không thoả mãn.`},
      {t:`Điểm ${I('O')}(0; 0) ${o0?'thuộc':'không thuộc'} miền nghiệm của bất phương trình.`,f:`Điểm ${I('O')}(0; 0) ${o0?'không thuộc':'thuộc'} miền nghiệm của bất phương trình.`,why:`Thay x = 0, y = 0: 0 ${op} ${sg(c)} là ${o0?'đúng':'sai'}.`},
      {t:`Miền nghiệm là một nửa mặt phẳng ${cl?'kể cả':'không kể'} bờ là đường thẳng ${L} = ${sg(c)}.`,f:`Miền nghiệm là một nửa mặt phẳng ${cl?'không kể':'kể cả'} bờ là đường thẳng ${L} = ${sg(c)}.`,why:`Dấu "${op}" ${cl?'có':'không có'} dấu bằng nên ${cl?'lấy cả':'bỏ'} bờ.`}],chk:()=>ok(...P)&&!ok(...Qp)})}
});

/* ---------- Chương III. Hệ thức lượng trong tam giác ---------- */
DS10('ds10-5-nb-trig',3,'NB',[5],r=>{
  const a=r.pick([30,45,60]),b=180-a,o=a===45?60:90-a;
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`sin ${b}${DEG} = sin ${a}${DEG}.`,f:`sin ${b}${DEG} = ${MINUS}sin ${a}${DEG}.`,why:'Hai góc bù nhau có sin bằng nhau: sin(180° − α) = sin α.'},
    {t:`cos ${b}${DEG} = ${MINUS}cos ${a}${DEG}.`,f:`cos ${b}${DEG} = cos ${a}${DEG}.`,why:'Hai góc bù nhau có côsin đối nhau: cos(180° − α) = −cos α.'},
    {t:`cos ${a}${DEG} = ${tvH(tv10('cos',a))}.`,f:`cos ${a}${DEG} = ${tvH(tv10('cos',o))}.`,why:`Bảng giá trị lượng giác của góc đặc biệt: cos ${a}° = ${tvH(tv10('cos',a))}.`},
    {t:`Giá trị tan 90${DEG} không xác định.`,f:`tan 90${DEG} = 0.`,why:'cos 90° = 0 nên tan 90° = sin 90° : cos 90° không xác định.'}],chk:()=>tv10('cos',a)!==tv10('cos',o)});
});
DS10('ds10-6-nb-law',3,'NB',[6],r=>{
  const V=['A','B','C'],S=['a','b','c'],i=r.int(0,2),j=(i+1)%3,k=(i+2)%3,x=I(S[i]),y=I(S[j]),z=I(S[k]),X=I(V[i]),Z=V[k];
  return mkDS(r,{stem:`Cho tam giác ${I('ABC')} có ${I('BC')} = ${I('a')}, ${I('CA')} = ${I('b')}, ${I('AB')} = ${I('c')}; ${I('R')}, ${I('r')} lần lượt là bán kính đường tròn ngoại tiếp, nội tiếp; ${I('p')} là nửa chu vi và ${I('S')} là diện tích tam giác. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${x}${sup(2)} = ${y}${sup(2)} + ${z}${sup(2)} ${MINUS} 2${y}${z}·cos ${X}.`,f:`${x}${sup(2)} = ${y}${sup(2)} + ${z}${sup(2)} + 2${y}${z}·cos ${X}.`,why:'Định lí côsin.'},
    {t:`${fr(x,'sin '+X)} = 2${I('R')}.`,f:`${fr(x,'sin '+X)} = ${I('R')}.`,why:'Định lí sin: a/sin A = b/sin B = c/sin C = 2R.'},
    {t:`${I('S')} = ${fr(1,2)}${x}${y}·sin ${I(Z)}.`,f:`${I('S')} = ${fr(1,2)}${x}${y}·cos ${I(Z)}.`,why:`Góc ${Z} là góc xen giữa hai cạnh ${S[i]} và ${S[j]}; S = ½ab·sin C.`},
    {t:`${I('S')} = ${I('p')}${I('r')}.`,f:`${I('S')} = 2${I('p')}${I('r')}.`,why:'Công thức diện tích S = pr.'}],chk:()=>i!==j&&j!==k});
});

/* ---------- Chương IV. Vectơ ---------- */
DS10('ds10-7-nb-vec',4,'NB',[7,8],r=>{
  const [P,Qq,R_,S_]=r.pick(['ABCD','MNPQ','EFGH']).split(''),O=r.pick(['O','I']),nm=P+Qq+R_+S_;
  return mkDS(r,{stem:`Cho hình bình hành ${I(nm)} có tâm ${I(O)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${Vv(P+Qq)} = ${Vv(S_+R_)}.`,f:`${Vv(P+Qq)} = ${Vv(R_+S_)}.`,why:`${P+Qq} và ${S_+R_} song song, cùng độ dài và cùng hướng.`},
    {t:`Hai vectơ ${Vv(P+Qq)} và ${Vv(R_+S_)} ngược hướng.`,f:`Hai vectơ ${Vv(P+Qq)} và ${Vv(R_+S_)} cùng hướng.`,why:`${Vv(R_+S_)} = ${MINUS}${Vv(P+Qq)}.`},
    {t:`${Vv(O+P)} + ${Vv(O+R_)} = ${V0}.`,f:`${Vv(O+P)} = ${Vv(O+R_)}.`,why:`${O} là trung điểm của ${P+R_} nên ${Vv(O+P)} và ${Vv(O+R_)} là hai vectơ đối nhau.`},
    {t:`|${Vv(P+R_)}| = ${I(P+R_)}.`,f:`|${Vv(P+R_)}| = ${I(P+Qq)} + ${I(Qq+R_)}.`,why:'Độ dài của vectơ bằng khoảng cách giữa điểm đầu và điểm cuối.'}],chk:()=>nm.length===4});
});
DS10('ds10-10-nb-coord',4,'NB',[10],r=>{
  for(;;){const A=[r.int(-5,5),r.int(-5,5)],B=[r.int(-5,5),r.int(-5,5)],p=r.nz(-5,5),q=r.nz(-5,5);
    if((A[0]+B[0])%2||(A[1]+B[1])%2||(A[0]===B[0]&&A[1]===B[1])||A[0]+B[0]===0&&A[1]+B[1]===0||p===q)continue;
    const M=[(A[0]+B[0])/2,(A[1]+B[1])/2],AB=[B[0]-A[0],B[1]-A[1]];
    const ij=`${p===1?'':p===-1?MINUS:sg(p)}${vc(I('i'))} ${q<0?MINUS:'+'} ${Math.abs(q)===1?'':Math.abs(q)}${vc(I('j'))}`;
    return mkDS(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho hai điểm ${PT('A',A)}, ${PT('B',B)} và vectơ ${vc(I('u'))} = ${ij}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${Vv('AB')} = ${cV(AB)}.`,f:`${Vv('AB')} = ${cV(AB.map(v=>-v))}.`,why:`${Vv('AB')} = (x${sub('B')} − x${sub('A')}; y${sub('B')} − y${sub('A')}) = ${cV(AB)}.`},
      {t:`Trung điểm của đoạn thẳng ${I('AB')} là ${PT('M',M)}.`,f:`Trung điểm của đoạn thẳng ${I('AB')} là ${PT('M',[A[0]+B[0],A[1]+B[1]])}.`,why:`x${sub('M')} = (x${sub('A')} + x${sub('B')})/2 = ${sg(M[0])}, y${sub('M')} = (y${sub('A')} + y${sub('B')})/2 = ${sg(M[1])}.`},
      {t:`${vc(I('u'))} = ${cV([p,q])}.`,f:`${vc(I('u'))} = ${cV([q,p])}.`,why:`${vc(I('u'))} = x${vc(I('i'))} + y${vc(I('j'))} thì ${vc(I('u'))} = (x; y).`},
      {t:`2${vc(I('u'))} = ${cV([2*p,2*q])}.`,f:`2${vc(I('u'))} = ${cV([2*p,q])}.`,why:'k(x; y) = (kx; ky).'}],chk:()=>AB[0]!==0||AB[1]!==0})}
});

/* ---------- Chương V. Các số đặc trưng của mẫu số liệu không ghép nhóm ---------- */
DS10('ds10-13-nb-stat',5,'NB',[13,14],r=>{
  for(;;){const n=r.pick([5,7]),a=[...Array(n)].map(()=>r.int(2,10)),m=mean10(a),me=med10(a),R=Math.max(...a)-Math.min(...a),mid=a[(n-1)/2];
    if(!isInt(m)||m===me||R===Math.max(...a)||mid===me)continue;
    return mkDS(r,{stem:`Điểm kiểm tra của ${n} học sinh là: ${a.join('; ')}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Mẫu số liệu có ${n} giá trị.`,f:`Mẫu số liệu có ${n+1} giá trị.`,why:`Có ${n} số liệu.`},
      {t:`Số trung bình của mẫu số liệu bằng ${m}.`,f:`Số trung bình của mẫu số liệu bằng ${m+1}.`,why:`x̄ = ${fr(a.reduce((s,v)=>s+v,0),n)} = ${m}.`},
      {t:`Trung vị của mẫu số liệu bằng ${fmt(me)}.`,f:`Trung vị của mẫu số liệu bằng ${fmt(mid)}.`,why:`Sắp xếp tăng dần: ${srt(a).join('; ')}; số đứng giữa là ${fmt(me)}.`},
      {t:`Khoảng biến thiên của mẫu số liệu bằng ${R}.`,f:`Khoảng biến thiên của mẫu số liệu bằng ${Math.max(...a)}.`,why:`R = ${Math.max(...a)} − ${Math.min(...a)} = ${R}.`}],chk:()=>isInt(m)})}
});

/* ---------- Chương VI. Hàm số, đồ thị và ứng dụng ---------- */
DS10b('ds10-15-nb-func',6,'NB',[15],r=>{
  const m=r.nz(-4,4),n=r.nz(-6,6),q=r.nz(-5,5),x0=r.nz(-3,3),up=m>0;
  return mkDS(r,{stem:`Cho hai hàm số ${I('f')}(${I('x')}) = ${xlin(m,n)} và ${I('g')}(${I('x')}) = ${fr(1,xlin(1,-q))}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('f')}(${sg(x0)}) = ${sg(m*x0+n)}.`,f:`${I('f')}(${sg(x0)}) = ${sg(m*x0+n+(x0>0?1:-1))}.`,why:`f(${sg(x0)}) = ${sg(m)}·${x0<0?'('+sg(x0)+')':x0} + ${n<0?'('+sg(n)+')':n} = ${sg(m*x0+n)}.`},
    {t:`Tập xác định của hàm số ${I('g')} là ${RR} \\ {${sg(q)}}.`,f:`Tập xác định của hàm số ${I('g')} là ${RR} \\ {${sg(-q)}}.`,why:`g xác định khi x − ${q<0?'('+sg(q)+')':q} ≠ 0, tức x ≠ ${sg(q)}.`},
    {t:`Hàm số ${I('f')} ${up?'đồng biến':'nghịch biến'} trên ${RR}.`,f:`Hàm số ${I('f')} ${up?'nghịch biến':'đồng biến'} trên ${RR}.`,why:`Hệ số của x bằng ${sg(m)} ${up?'> 0':'< 0'}.`},
    {t:`Đồ thị của hàm số ${I('f')} cắt trục tung tại điểm (0; ${sg(n)}).`,f:`Đồ thị của hàm số ${I('f')} cắt trục tung tại điểm (${sg(n)}; 0).`,why:`x = 0 ⇒ y = ${sg(n)}.`}],chk:()=>m*x0+n!==m*x0+n+(x0>0?1:-1)});
});
DS10b('ds10-16-nb-par',6,'NB',[16],r=>{
  for(;;){const P=parab10(r);if(P.h===0||P.c===0||P.b===P.c)continue;const up=P.a>0;
    return mkDS(r,{stem:`Cho hàm số ${qY(P.a,P.b,P.c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Đây là hàm số bậc hai với ${I('a')} = ${sg(P.a)}, ${I('b')} = ${sg(P.b)}, ${I('c')} = ${sg(P.c)}.`,f:`Đây là hàm số bậc hai với ${I('a')} = ${sg(P.a)}, ${I('b')} = ${sg(P.c)}, ${I('c')} = ${sg(P.b)}.`,why:'Hàm số y = ax² + bx + c (a ≠ 0): a là hệ số của x², b là hệ số của x, c là hệ số tự do.'},
      {t:`Đồ thị hàm số là một parabol có trục đối xứng là đường thẳng ${I('x')} = ${sg(P.h)}.`,f:`Đồ thị hàm số là một parabol có trục đối xứng là đường thẳng ${I('x')} = ${sg(-P.h)}.`,why:`Trục đối xứng x = −b/(2a) = ${sg(P.h)}.`},
      {t:`Parabol có bề lõm quay ${up?'lên trên':'xuống dưới'}.`,f:`Parabol có bề lõm quay ${up?'xuống dưới':'lên trên'}.`,why:`a = ${sg(P.a)} ${up?'> 0':'< 0'}.`},
      {t:`Đồ thị hàm số cắt trục tung tại điểm có tung độ bằng ${sg(P.c)}.`,f:`Đồ thị hàm số cắt trục tung tại điểm có tung độ bằng ${sg(-P.c)}.`,why:`x = 0 ⇒ y = c = ${sg(P.c)}.`}],chk:()=>P.h!==0})}
});
DS10b('ds10-17-nb-sign',6,'NB',[17],r=>{
  for(;;){const a=r.pick([1,-1,2,-2]),x1=r.int(-5,4),x2=r.int(x1+1,5);if(x1+x2===0||x1===0&&x2===0)continue;
    const b=-a*(x1+x2),c=a*x1*x2,up=a>0,iv=`(${MINUS}∞; ${sg(x1)}) ∪ (${sg(x2)}; +∞)`,inn=`(${sg(x1)}; ${sg(x2)})`;
    return mkDS(r,{stem:`Cho tam thức bậc hai ${I('f')}(${I('x')}) = ${xquad(a,b,c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Biệt thức Δ của ${I('f')}(${I('x')}) dương.`,f:`Biệt thức Δ của ${I('f')}(${I('x')}) âm.`,why:`Δ = ${b<0?'('+sg(b)+')':b}² − 4·${a<0?'('+sg(a)+')':a}·${c<0?'('+sg(c)+')':c} = ${b*b-4*a*c} > 0.`},
      {t:`${I('f')}(${I('x')}) có hai nghiệm ${I('x')} = ${sg(x1)} và ${I('x')} = ${sg(x2)}.`,f:`${I('f')}(${I('x')}) có hai nghiệm ${I('x')} = ${sg(-x2)} và ${I('x')} = ${sg(-x1)}.`,why:`f(x) = ${a===1?'':a===-1?MINUS:sg(a)}(${xlin(1,-x1)})(${xlin(1,-x2)}).`},
      {t:`${I('f')}(${I('x')}) ${up?'>':'<'} 0 với mọi ${I('x')} ∈ ${iv}.`,f:`${I('f')}(${I('x')}) ${up?'<':'>'} 0 với mọi ${I('x')} ∈ ${iv}.`,why:'Ngoài khoảng hai nghiệm, f(x) cùng dấu với hệ số a.'},
      {t:`${I('f')}(${I('x')}) ${up?'<':'>'} 0 với mọi ${I('x')} ∈ ${inn}.`,f:`${I('f')}(${I('x')}) ${up?'>':'<'} 0 với mọi ${I('x')} ∈ ${inn}.`,why:'Trong khoảng hai nghiệm, f(x) trái dấu với hệ số a.'}],chk:()=>b*b-4*a*c>0})}
});

/* ---------- Chương VII. Phương pháp toạ độ trong mặt phẳng ---------- */
DS10b('ds10-19-nb-line',7,'NB',[19],r=>{
  for(;;){const P=[r.int(-4,4),r.int(-4,4)],L=lnN(r.nz(-4,4),r.nz(-4,4),0),a=L[0],b=L[1],c=-(a*P[0]+b*P[1]);if(a===b||a===-b||c===0)continue;
    const D=[a,b,c];
    return mkDS(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho đường thẳng ${I('d')}: ${lnH(D)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`${I('d')} có một vectơ pháp tuyến là ${vc(I('n'))} = ${cV([a,b])}.`,f:`${I('d')} có một vectơ pháp tuyến là ${vc(I('n'))} = ${cV([b,a])}.`,why:'Đường thẳng ax + by + c = 0 có vectơ pháp tuyến (a; b).'},
      {t:`${I('d')} có một vectơ chỉ phương là ${vc(I('u'))} = ${cV([-b,a])}.`,f:`${I('d')} có một vectơ chỉ phương là ${vc(I('u'))} = ${cV([a,b])}.`,why:'Vectơ chỉ phương vuông góc với vectơ pháp tuyến: (−b; a).'},
      {t:`Điểm ${PT('M',P)} thuộc ${I('d')}.`,f:`Điểm ${PT('M',[P[0]+1,P[1]])} thuộc ${I('d')}.`,why:`Thay toạ độ điểm vào phương trình của d để kiểm tra.`},
      {t:`Đường thẳng ${I('d')} không đi qua gốc toạ độ ${I('O')}.`,f:`Đường thẳng ${I('d')} đi qua gốc toạ độ ${I('O')}.`,why:`Thay (0; 0): ${sg(c)} ≠ 0.`}],chk:()=>a*P[0]+b*P[1]+c===0})}
});
DS10b('ds10-21-nb-cir',7,'NB',[21],r=>{
  for(;;){const a=r.int(-4,4),b=r.int(-4,4),R=r.int(2,6),R2=R*R;if(a===0&&b===0||a*a+b*b===R2)continue;const inO=a*a+b*b<R2,M=[a+R,b];
    return mkDS(r,{stem:`Trong mặt phẳng toạ độ ${I('Oxy')}, cho đường tròn (${I('C')}): ${cirH(a,b,R2)}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`(${I('C')}) có tâm ${I('I')}(${sg(a)}; ${sg(b)}).`,f:`(${I('C')}) có tâm ${I('I')}(${sg(-a)}; ${sg(-b)}).`,why:'Đường tròn (x − a)² + (y − b)² = R² có tâm I(a; b).'},
      {t:`(${I('C')}) có bán kính ${I('R')} = ${R}.`,f:`(${I('C')}) có bán kính ${I('R')} = ${R2}.`,why:`R² = ${R2} nên R = ${R}.`},
      {t:`Điểm ${PT('M',M)} thuộc (${I('C')}).`,f:`Điểm ${PT('M',[M[0],M[1]+1])} thuộc (${I('C')}).`,why:`IM = ${R} = R.`},
      {t:`Gốc toạ độ ${I('O')} nằm ${inO?'bên trong':'bên ngoài'} (${I('C')}).`,f:`Gốc toạ độ ${I('O')} nằm ${inO?'bên ngoài':'bên trong'} (${I('C')}).`,why:`OI² = ${a*a+b*b} ${inO?'<':'>'} ${R2} = R².`}],chk:()=>(M[0]-a)**2+(M[1]-b)**2===R2})}
});

/* ---------- Chương VIII. Đại số tổ hợp ---------- */
DS10b('ds10-23-nb-count',8,'NB',[23,24],r=>{
  for(;;){const n=r.int(5,8),k=r.int(2,3),u=r.int(3,6),v=r.int(2,5);if(2*k+1===n||n-k===k)continue;
    return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
      {t:`Số các hoán vị của ${n} phần tử bằng ${n}! = ${fact10(n)}.`,f:`Số các hoán vị của ${n} phần tử bằng ${fact10(n-1)}.`,why:`P${sub(n)} = ${n}! = ${fact10(n)}.`},
      {t:`${AH(n,k)} = ${nA10(n,k)}.`,f:`${AH(n,k)} = ${nC10(n,k)}.`,why:`${AH(n,k)} = ${fr(n+'!',(n-k)+'!')} = ${nA10(n,k)}.`},
      {t:`${CH(n,k)} = ${CH(n,n-k)}.`,f:`${CH(n,k)} = ${CH(n,k+1)}.`,why:`Tính chất ${CH('n','k')} = ${CH('n','n − k')}.`},
      {t:`Có ${u} chiếc áo và ${v} chiếc quần khác nhau thì có ${u*v} cách chọn một bộ gồm một áo và một quần.`,f:`Có ${u} chiếc áo và ${v} chiếc quần khác nhau thì có ${u+v} cách chọn một bộ gồm một áo và một quần.`,why:`Quy tắc nhân: ${u}·${v} = ${u*v}.`}],chk:()=>nC10(n,k)!==nA10(n,k)})}
});
DS10b('ds10-25-nb-newton',8,'NB',[25],r=>{
  const n=r.pick([4,5]),c=r.int(2,4);
  return mkDS(r,{stem:`Xét khai triển (${I('x')} + ${c})${sup(n)} theo lũy thừa giảm dần của ${I('x')}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Khai triển có ${n+1} số hạng.`,f:`Khai triển có ${n} số hạng.`,why:`(a + b)${sup(n)} có ${n+1} số hạng.`},
    {t:`Số hạng đầu tiên là ${I('x')}${sup(n)}.`,f:`Số hạng đầu tiên là ${c}${I('x')}${sup(n)}.`,why:`${CH(n,0)}x${sup(n)} = x${sup(n)}.`},
    {t:`Hệ số của ${I('x')}${sup(n-1)} bằng ${n*c}.`,f:`Hệ số của ${I('x')}${sup(n-1)} bằng ${n}.`,why:`${CH(n,1)}·${c} = ${n}·${c} = ${n*c}.`},
    {t:`Số hạng không chứa ${I('x')} bằng ${c**n}.`,f:`Số hạng không chứa ${I('x')} bằng ${n*c}.`,why:`${CH(n,n)}·${c}${sup(n)} = ${c**n}.`}],chk:()=>c**n!==n*c});
});

/* ---------- Chương IX. Tính xác suất theo định nghĩa cổ điển ---------- */
DS10b('ds10-26-nb-prob',9,'NB',[26],r=>{
  const n=r.int(9,20),e=Math.floor(n/2),f2=n-e===e?e+1:n-e;
  return mkDS(r,{stem:`Một hộp có ${n} tấm thẻ được đánh số từ 1 đến ${n}. Rút ngẫu nhiên một tấm thẻ. Gọi ${I('A')} là biến cố "Thẻ rút được ghi số chẵn". Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Không gian mẫu có ${n} phần tử.`,f:`Không gian mẫu có ${n-1} phần tử.`,why:`Ω = {1; 2; ...; ${n}}.`},
    {t:`Biến cố ${I('A')} có ${e} kết quả thuận lợi.`,f:`Biến cố ${I('A')} có ${n-e===e?e+1:n-e} kết quả thuận lợi.`,why:`Các số chẵn từ 2 đến ${2*e}: có ${e} số.`},
    {t:`${I('P')}(${I('A')}) = ${qh(Q(e,n))}.`,f:`${I('P')}(${I('A')}) = ${qh(Q(f2,n))}.`,why:`P(A) = n(A)/n(Ω) = ${fr(e,n)}${qh(Q(e,n))===fr(e,n)?'':' = '+qh(Q(e,n))}.`},
    {t:`Biến cố "Thẻ rút được ghi số lớn hơn ${n}" là biến cố không thể, có xác suất bằng 0.`,f:`Biến cố "Thẻ rút được ghi số lớn hơn ${n}" là biến cố chắc chắn.`,why:`Không có thẻ nào ghi số lớn hơn ${n}.`}],chk:()=>e<n&&f2!==e});
});
