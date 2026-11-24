/* ================================================================
   LỚP 7 – Toán 7 Kết nối tri thức, học kì II (tập 2)
   VI Tỉ lệ thức và đại lượng tỉ lệ · VII Biểu thức đại số và đa thức một biến
   VIII Biến cố và xác suất · IX Quan hệ giữa các yếu tố trong tam giác · X Một số hình khối
   ================================================================ */
const N7b=(id,ch,lv,gen)=>reg('nlc',id,ch,lv,gen,{g:7,hk:2});
const DS7b=(id,ch,lv,gen)=>reg('ds',id,ch,lv,gen,{g:7,hk:2});
const TLN7b=(id,ch,lv,gen)=>reg('tln',id,ch,lv,gen,{g:7,hk:2});
const TL7b=(id,ch,lv,role,gen)=>reg('tl',id,ch,lv,gen,{role,g:7,hk:2});
const pickN=(r,arr,n)=>r.shuffle(arr).slice(0,n);

/* ---------- Chương VI: Tỉ lệ thức và đại lượng tỉ lệ ---------- */
N7b('m7-6-ratio',6,'NB',r=>{
  for(;;){
    const [q,s]=r.pick([[2,3],[3,4],[2,5],[3,5],[4,5],[1,3],[2,7],[3,7]]),p=r.int(2,4),t=r.pick([5,6,7].filter(x=>x!==p));
    const v=[p*q,p*s,t*q,t*s];if(new Set(v).size<4)continue;
    const T=[],F=[];
    for(let x=0;x<4;x++)for(let y=0;y<4;y++)for(let z=x+1;z<4;z++)for(let w=0;w<4;w++){
      if(new Set([x,y,z,w]).size<4)continue;
      const h=`${fr(v[x],v[y])} = ${fr(v[z],v[w])}`;
      (v[x]*v[w]===v[y]*v[z]?T:F).push(h);
    }
    return mkTxt(r,{stem:`Từ đẳng thức ${v[0]} · ${v[3]} = ${v[1]} · ${v[2]} ta lập được tỉ lệ thức`,correct:r.pick(T),wrongs:r.shuffle(F).slice(0,3),
      sol:`Từ ad = bc (với a, b, c, d khác 0) ta lập được các tỉ lệ thức ${fr('a','b')} = ${fr('c','d')}; ${fr('a','c')} = ${fr('b','d')}; ${fr('d','b')} = ${fr('c','a')}; ${fr('d','c')} = ${fr('b','a')}. Các phương án còn lại có tích chéo không bằng nhau.`});
  }
});
N7b('m7-6-findx',6,'TH',r=>{
  const a=r.nz(-12,12),b=r.nz(-12,12),c=r.nz(-9,9),x=Q(a*b,c);
  return mkF(r,{stem:`Giá trị của ${I('x')} trong tỉ lệ thức ${fr(I('x'),sg(a))} = ${fr(sg(b),sg(c))} là`,correct:x,cands:[Q(a*c,b),Q(b*c,a),Q(-a*b,c),Q(a+b,c)],
    sol:`Từ ${fr('x',sg(a))} = ${fr(sg(b),sg(c))} suy ra x · ${qp(Q(c))} = ${sg(a)} · ${qp(Q(b))}, nên x = ${qh(x)}.`,chk:()=>qeq(qmul(x,Q(c)),Q(a*b))});
});
N7b('m7-6-seq',6,'TH',r=>{
  let a=r.int(2,8),b=r.int(2,8);while(a===b)b=r.int(2,8);
  const k=r.int(2,9),diff=r.chance(.5);if(diff&&a<b)[a,b]=[b,a];
  const x=a*k,y=b*k,s=diff?x-y:x+y,w=r.chance(.5);
  return mkNum(r,{stem:`Cho ${fr(I('x'),a)} = ${fr(I('y'),b)} và ${I('x')} ${diff?MINUS:'+'} ${I('y')} = ${s}. Giá trị của ${I(w?'x':'y')} là`,correct:w?x:y,cands:[w?y:x,s-(w?x:y),a*b,s/ (diff?a-b:a+b)],
    sol:`Áp dụng tính chất dãy tỉ số bằng nhau: ${fr(I('x'),a)} = ${fr(I('y'),b)} = ${fr(`x ${diff?'−':'+'} y`,`${a} ${diff?'−':'+'} ${b}`)} = ${fr(s,diff?a-b:a+b)} = ${k}. Suy ra x = ${a}·${k} = ${x}, y = ${b}·${k} = ${y}.`,chk:()=>x*b===y*a&&(diff?x-y:x+y)===s});
});
N7b('m7-6-thuan-def',6,'NB',r=>{
  const t=r.int(0,1),x0=r.int(2,12);
  if(t===0){const k=Q(r.int(2,9),r.pick([1,2,3,5])),v=qmul(k,Q(x0));
    return mkF(r,{stem:`Biết ${I('y')} tỉ lệ thuận với ${I('x')} theo hệ số tỉ lệ ${I('k')} = ${qh(k)}. Khi ${I('x')} = ${x0} thì ${I('y')} bằng`,correct:v,cands:[qdiv(Q(x0),k),qadd(k,Q(x0)),Q(x0,1),qsub(Q(x0),k)],
      sol:`y = kx = ${qh(k)} · ${x0} = ${qh(v)}.`});}
  const k=Q(r.int(2,9),r.pick([1,2,3,5])),y0=qmul(k,Q(x0));
  return mkF(r,{stem:`Biết ${I('y')} tỉ lệ thuận với ${I('x')} và khi ${I('x')} = ${x0} thì ${I('y')} = ${qh(y0)}. Hệ số tỉ lệ ${I('k')} của ${I('y')} đối với ${I('x')} là`,correct:k,cands:[qdiv(Q(x0),y0),qmul(y0,Q(x0)),qsub(y0,Q(x0)),Q(-k[0],k[1])],
    sol:`Vì y = kx nên k = y : x = ${qh(y0)} : ${x0} = ${qh(k)}.`});
});
N7b('m7-6-nghich-def',6,'NB',r=>{
  const x0=r.int(2,9),y0=r.int(2,12),A=x0*y0,t=r.int(0,1);
  if(t===0)return mkNum(r,{stem:`Biết ${I('y')} tỉ lệ nghịch với ${I('x')} và khi ${I('x')} = ${x0} thì ${I('y')} = ${y0}. Hệ số tỉ lệ ${I('a')} (với ${I('y')} = ${fr(I('a'),I('x'))}) bằng`,correct:A,cands:[x0+y0,y0/x0,x0*y0+x0,A-y0],
    sol:`Vì y = a/x nên a = x·y = ${x0}·${y0} = ${A}.`});
  const d=r.pick([2,3,4,5,6]),n=r.int(2,12),A2=d*n;
  return mkNum(r,{stem:`Biết ${I('y')} tỉ lệ nghịch với ${I('x')} theo hệ số tỉ lệ ${A2}. Khi ${I('x')} = ${d} thì ${I('y')} bằng`,correct:n,cands:[A2*d,A2-d,A2+d,n+d],
    sol:`y = ${fr(A2,d)} = ${n}.`});
});
const KIND_THUAN=['Quãng đường và thời gian của một vật chuyển động đều với vận tốc không đổi','Số tiền phải trả và số kilôgam gạo mua (cùng một loại gạo)','Chu vi và độ dài cạnh của một hình vuông','Số lít xăng tiêu thụ và quãng đường đi được của một xe (mức tiêu thụ không đổi)','Khối lượng và thể tích của một thanh sắt đồng chất'];
const KIND_NGHICH=['Vận tốc và thời gian để đi hết một quãng đường cố định','Số công nhân và thời gian hoàn thành cùng một công việc (năng suất như nhau)','Số máy bơm cùng loại và thời gian bơm đầy một bể nước','Số người ăn và số ngày dùng hết một lượng gạo dự trữ cố định'];
const KIND_NONE=['Tuổi của một người và chiều cao của người đó','Diện tích và độ dài cạnh của một hình vuông','Số học sinh của một lớp và điểm trung bình môn Toán của lớp','Số trang của một quyển sách và số tiền của người mua nó (giá khác nhau)'];
N7b('m7-6-kind',6,'NB',r=>{
  const th=r.chance(.5),ok=r.pick(th?KIND_THUAN:KIND_NGHICH),wr=r.shuffle([...(th?KIND_NGHICH:KIND_THUAN),...KIND_NONE]).slice(0,3);
  return mkTxt(r,{stem:`Hai đại lượng nào sau đây ${th?'tỉ lệ thuận':'tỉ lệ nghịch'} với nhau?`,correct:ok+'.',wrongs:wr.map(x=>x+'.'),
    sol:th?`Hai đại lượng tỉ lệ thuận khi đại lượng này gấp lên bao nhiêu lần thì đại lượng kia cũng gấp lên bấy nhiêu lần (y = kx). Chọn: ${ok}.`:`Hai đại lượng tỉ lệ nghịch khi đại lượng này gấp lên bao nhiêu lần thì đại lượng kia giảm đi bấy nhiêu lần (xy = a). Chọn: ${ok}.`});
});
N7b('m7-6-thuan-calc',6,'TH',r=>{
  const a=r.int(3,9),b=r.int(10,20),u=r.pick([5,8,12,15,18,25,30,40]),S=[['vải','mét'],['gạo','kg'],['cam','kg']],[w,un]=r.pick(S);
  return mkNum(r,{stem:`Mua ${a} ${un} ${w} hết ${a*u} nghìn đồng. Với cùng loại ${w}, mua ${b} ${un} hết bao nhiêu nghìn đồng?`,correct:b*u,cands:[a*u+b-a,a*b,b*u+u,u*(b-a)],ok:c=>c>0,
    sol:`Số tiền tỉ lệ thuận với khối lượng: giá 1 ${un} là ${a*u} : ${a} = ${u} (nghìn đồng); ${b} ${un} có giá ${b}·${u} = ${b*u} (nghìn đồng).`});
});
N7b('m7-6-nghich-calc',6,'TH',r=>{
  for(;;){
    const a=r.pick([4,6,8,10,12,15]),d=r.int(4,15),b=r.pick([2,3,4,5,6,8,9,10,12,15,18,20,24,30]);
    if(b===a||(a*d)%b)continue;const n=a*d/b,t=r.int(0,1);
    const [s1,s2]=t?[`${a} người làm xong một công việc trong ${d} giờ`,`Hỏi ${b} người (cùng năng suất) làm xong công việc đó trong bao nhiêu giờ?`]:[`${a} máy bơm cùng loại bơm đầy một bể nước trong ${d} giờ`,`Hỏi ${b} máy bơm như thế bơm đầy bể đó trong bao nhiêu giờ?`];
    return mkNum(r,{stem:`${s1[0].toUpperCase()+s1.slice(1)}. ${s2}`,correct:n,cands:[d+b-a,a*d*b,d*b/a,Math.abs(d-b)+1],ok:c=>c>0,
      sol:`Số người (máy) và thời gian là hai đại lượng tỉ lệ nghịch nên ${a}·${d} = ${b}·t, suy ra t = ${a*d} : ${b} = ${n} (giờ).`});
  }
});
N7b('m7-6-parts',6,'TH',r=>{
  const m=r.int(2,3),rs=m===2?pickN(r,[1,2,3,4,5,6],2):pickN(r,[1,2,3,4,5,6],3),k=r.int(2,12),S=rs.reduce((a,b)=>a+b,0)*k,big=r.chance(.6);
  const target=big?Math.max(...rs):Math.min(...rs);
  return mkNum(r,{stem:`Chia số ${S} thành ${m===2?'hai':'ba'} phần tỉ lệ với ${rs.join('; ')}. Phần ${big?'lớn nhất':'nhỏ nhất'} là`,correct:target*k,cands:[target*k+k,S-target*k,target,S/m],ok:c=>c>0&&c<S,
    sol:`Gọi các phần là ${rs.map((_,i)=>'x'+(i+1)).join(', ')}: ${rs.map((v,i)=>fr('x'+(i+1),v)).join(' = ')} = ${fr(S,rs.reduce((a,b)=>a+b,0))} = ${k}. Phần ${big?'lớn nhất':'nhỏ nhất'} là ${target}·${k} = ${target*k}.`});
});
const THEO6_T=['Nếu a/b = c/d (b, d khác 0) thì a·d = b·c','Nếu a·d = b·c (a, b, c, d khác 0) thì a/b = c/d','Nếu a/b = c/d = e/f thì a/b = (a + c + e)/(b + d + f) (các mẫu khác 0)','Nếu y = kx (k khác 0) thì tỉ số y/x luôn không đổi (x khác 0)','Nếu y tỉ lệ nghịch với x thì tích x·y luôn không đổi','Nếu y tỉ lệ thuận với x theo hệ số k (k khác 0) thì x tỉ lệ thuận với y theo hệ số 1/k'];
const THEO6_F=['Nếu a/b = c/d thì a·b = c·d','Nếu a/b = c/d thì a + b = c + d','Nếu y tỉ lệ nghịch với x thì tỉ số y/x luôn không đổi','Nếu y tỉ lệ thuận với x thì tích x·y luôn không đổi','Hai đại lượng tỉ lệ nghịch thì khi đại lượng này tăng, đại lượng kia cũng tăng','Nếu y tỉ lệ thuận với x thì khi x tăng 2 lần, y giảm 2 lần'];
N7b('m7-6-theory',6,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?THEO6_T:THEO6_F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?THEO6_F:THEO6_T).slice(0,3).map(x=>x+'.'),sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}.`});
});
DS7b('ds7-6-prop',6,'TH',r=>{
  let a=r.int(2,9),b=r.int(2,9);while(a===b||gcd(a,b)>1){a=r.int(2,9);b=r.int(2,9)}
  const k=r.int(2,8),x=a*k,y=b*k,s=x+y;
  return mkDS(r,{stem:`Cho ${fr(I('x'),a)} = ${fr(I('y'),b)} và ${I('x')} + ${I('y')} = ${s}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${b}${I('x')} = ${a}${I('y')}`,f:`${a}${I('x')} = ${b}${I('y')}`,why:`Từ ${fr('x',a)} = ${fr('y',b)} suy ra ${b}x = ${a}y (tích chéo bằng nhau).`},
    {t:`${fr(I('x'),I('y'))} = ${fr(a,b)}`,f:`${fr(I('x'),I('y'))} = ${fr(b,a)}`,why:`Hoán đổi trung tỉ: ${fr('x','y')} = ${fr(a,b)}.`},
    {t:`${fr('x + y',a+b)} = ${fr(I('x'),a)}`,f:`${fr('x + y',a+b)} = ${fr(I('y'),a)}`,why:`Tính chất dãy tỉ số bằng nhau: ${fr('x',a)} = ${fr('y',b)} = ${fr('x + y',`${a} + ${b}`)}.`},
    {t:`${I('x')} = ${x}`,f:`${I('x')} = ${y}`,why:`${fr('x',a)} = ${fr(s,a+b)} = ${k} nên x = ${a}·${k} = ${x}, y = ${b}·${k} = ${y}.`}
  ],chk:()=>a!==b&&x*b===y*a&&x!==y});
});
DS7b('ds7-6-thuan',6,'NB',r=>{
  const k=r.int(2,9),x0=r.int(2,8),x1=r.int(9,15),x2=r.int(2,9);
  return mkDS(r,{stem:`Biết ${I('y')} tỉ lệ thuận với ${I('x')} và khi ${I('x')} = ${x0} thì ${I('y')} = ${k*x0}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Hệ số tỉ lệ ${I('k')} = ${k}`,f:`Hệ số tỉ lệ ${I('k')} = ${fr(1,k)}`,why:`k = y : x = ${k*x0} : ${x0} = ${k}.`},
    {t:`Khi ${I('x')} = ${x1} thì ${I('y')} = ${k*x1}`,f:`Khi ${I('x')} = ${x1} thì ${I('y')} = ${k*x1+k}`,why:`y = kx = ${k}·${x1} = ${k*x1}.`},
    {t:`Khi ${I('y')} = ${k*x2} thì ${I('x')} = ${x2}`,f:`Khi ${I('y')} = ${k*x2} thì ${I('x')} = ${k*x2+x2}`,why:`x = y : k = ${k*x2} : ${k} = ${x2}.`},
    {t:`Khi ${I('x')} tăng gấp 3 lần thì ${I('y')} cũng tăng gấp 3 lần`,f:`Khi ${I('x')} tăng gấp 3 lần thì ${I('y')} giảm đi 3 lần`,why:`Hai đại lượng tỉ lệ thuận: đại lượng này gấp lên bao nhiêu lần thì đại lượng kia gấp lên bấy nhiêu lần.`}
  ],chk:()=>k>1});
});
DS7b('ds7-6-nghich',6,'TH',r=>{
  let x0,y0,A,d;
  for(;;){d=r.pick([2,3,4,6]);A=d*r.int(2,12);x0=r.int(2,9);if(x0===d||A%x0||A/x0<2||A/x0===x0)continue;y0=A/x0;break}
  return mkDS(r,{stem:`Biết ${I('y')} tỉ lệ nghịch với ${I('x')} và khi ${I('x')} = ${x0} thì ${I('y')} = ${y0}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Hệ số tỉ lệ ${I('a')} = ${A}`,f:`Hệ số tỉ lệ ${I('a')} = ${fr(y0,x0)}`,why:`a = x·y = ${x0}·${y0} = ${A}.`},
    {t:`${I('y')} = ${fr(A,I('x'))}`,f:`${I('y')} = ${A}${I('x')}`,why:`Hai đại lượng tỉ lệ nghịch: y = a/x với a = ${A}.`},
    {t:`Khi ${I('x')} = ${d} thì ${I('y')} = ${A/d}`,f:`Khi ${I('x')} = ${d} thì ${I('y')} = ${A*d}`,why:`y = ${A} : ${d} = ${A/d}.`},
    {t:`Khi ${I('x')} tăng gấp 2 lần thì ${I('y')} giảm đi 2 lần`,f:`Khi ${I('x')} tăng gấp 2 lần thì ${I('y')} tăng gấp 2 lần`,why:`Tích x·y không đổi nên x tăng bao nhiêu lần thì y giảm bấy nhiêu lần.`}
  ],chk:()=>A%d===0&&A*d!==A/d});
});
TLN7b('t7-6-x',6,'TH',r=>{
  for(;;){const q=r.int(2,9),s=r.int(2,9),rr=r.int(2,12),p=r.nz(-9,9);if(q===s||(q*rr)%s)continue;const x=q*rr/s-p;
    return{kind:'tln',stem:`Tìm ${I('x')}, biết ${fr(`${I('x')} ${p<0?MINUS:'+'} ${Math.abs(p)}`,q)} = ${fr(rr,s)}.`,ans:x,unit:'',
      sol:`x ${p<0?'−':'+'} ${Math.abs(p)} = ${q}·${rr} : ${s} = ${q*rr/s}, suy ra x = ${sg(x)}.`,chk:()=>(x+p)*s===q*rr};}
});
TLN7b('t7-6-seq',6,'VD',r=>{
  let a=r.int(3,9),b=r.int(2,8);while(a<=b)b=r.int(2,8);const k=r.int(2,9),x=a*k,y=b*k;
  return{kind:'tln',stem:`Cho ${fr(I('x'),a)} = ${fr(I('y'),b)} và ${I('x')} ${MINUS} ${I('y')} = ${x-y}. Tính ${I('x')} + ${I('y')}.`,ans:x+y,unit:'',
    sol:`${fr('x',a)} = ${fr('y',b)} = ${fr('x − y',`${a} − ${b}`)} = ${fr(x-y,a-b)} = ${k}, nên x = ${x}, y = ${y} và x + y = ${x+y}.`,chk:()=>x*b===y*a};
});
TLN7b('t7-6-nghich',6,'TH',r=>{
  for(;;){const v1=r.pick([30,40,45,50,60,75]),t1=r.int(2,6),v2=r.pick([20,24,25,30,36,40,45,48,50,60,80,90,100,120]);if(v2===v1||(v1*t1)%v2)continue;const t2=v1*t1/v2;
    return{kind:'tln',stem:`Một ô tô đi từ A đến B với vận tốc ${v1} km/h thì hết ${t1} giờ. Nếu đi với vận tốc ${v2} km/h thì hết bao nhiêu giờ? (đơn vị: giờ)`,ans:t2,unit:'',
      sol:`Quãng đường không đổi nên vận tốc và thời gian tỉ lệ nghịch: ${v1}·${t1} = ${v2}·t, suy ra t = ${v1*t1} : ${v2} = ${fmt(t2)}.`};}
});
TLN7b('t7-6-thuan',6,'TH',r=>{
  const u=r.pick([3,4,5]),a=50*r.int(1,3),c=50*r.int(4,8);
  return{kind:'tln',stem:`Một xe máy đi ${a} km tiêu thụ ${a/50*u} lít xăng. Hỏi xe đó đi ${c} km (với mức tiêu thụ không đổi) thì tiêu thụ bao nhiêu lít xăng? (đơn vị: lít)`,ans:c/50*u,unit:'',
    sol:`Lượng xăng tỉ lệ thuận với quãng đường: ${a/50*u} : ${a} = ${u} : 50 nên ${c} km cần ${c}·${u} : 50 = ${c/50*u} lít.`};
});
TLN7b('t7-6-three',6,'VD',r=>{
  const rs=pickN(r,[3,4,5,6,7,8,9],3).sort((p,q)=>p-q),k=r.int(2,9),S=rs.reduce((a,b)=>a+b,0)*k;
  return{kind:'tln',stem:`Ba lớp 7A, 7B, 7C có tổng cộng ${S} học sinh, số học sinh của ba lớp tỉ lệ với ${rs.join('; ')}. Hỏi lớp đông nhất hơn lớp ít nhất bao nhiêu học sinh?`,ans:(rs[2]-rs[0])*k,unit:'',
    sol:`${fr('x',rs[0])} = ${fr('y',rs[1])} = ${fr('z',rs[2])} = ${fr(S,rs.reduce((a,b)=>a+b,0))} = ${k}. Lớp đông nhất hơn lớp ít nhất ${rs[2]}·${k} − ${rs[0]}·${k} = ${(rs[2]-rs[0])*k} học sinh.`};
});
TL7b('tl7-6-prop',6,'TH','alg',r=>{
  const a=r.nz(-9,9),x=r.nz(-15,15),f=Q(x,a),m=r.int(2,4),b=f[0]*m,c=f[1]*m;
  let p=r.int(2,7),q=r.int(2,7);while(p===q)q=r.int(2,7);const k=r.int(2,8),S=(p+q)*k;
  return{kind:'tl',title:'Tỉ lệ thức',parts:[
    {pts:.5,html:`Tìm ${I('x')}, biết ${fr(I('x'),sg(a))} = ${fr(sg(b),sg(c))}.`},
    {pts:.5,html:`Tìm hai số ${I('x')}, ${I('y')}, biết ${fr(I('x'),p)} = ${fr(I('y'),q)} và ${I('x')} + ${I('y')} = ${S}.`}],
    sol:[ptxt([[`x · ${sg(c)} = ${sg(a)} · ${sg(b)} (tích chéo)`,.25],[`x = ${qh(Q(a*b,c))}`,.25]]),
      ptxt([[`${fr('x',p)} = ${fr('y',q)} = ${fr('x + y',`${p} + ${q}`)} = ${fr(S,p+q)} = ${k}`,.25],[`x = ${p}·${k} = ${p*k}; y = ${q}·${k} = ${q*k}`,.25]])],
    chk:()=>x*c===a*b&&b*a!==0};
});
TL7b('tl7-6-thuan',6,'TH','real',r=>{
  const a=r.int(3,8),u=r.pick([12,15,18,20,25,30]),b=r.int(10,20),T=u*r.int(6,12);
  return{kind:'tl',title:'Đại lượng tỉ lệ thuận',parts:[
    {pts:.5,html:`Mua ${a} mét vải hết ${a*u} nghìn đồng. Với cùng loại vải, mua ${b} mét vải hết bao nhiêu nghìn đồng?`},
    {pts:.5,html:`Với ${T} nghìn đồng thì mua được bao nhiêu mét vải loại đó?`}],
    sol:[ptxt([[`Số tiền và số mét vải là hai đại lượng tỉ lệ thuận; giá 1 mét: ${a*u} : ${a} = ${u} (nghìn đồng)`,.25],[`Mua ${b} mét hết ${b}·${u} = ${b*u} (nghìn đồng)`,.25]]),
      ptxt([[`Số mét vải mua được: ${T} : ${u}`,.25],[`= ${T/u} (mét)`,.25]])]};
});
TL7b('tl7-6-three',6,'VD','real',r=>{
  const rs=pickN(r,[3,4,5,6,7,8,9],3).sort((p,q)=>p-q),k=r.int(3,12),S=rs.reduce((a,b)=>a+b,0)*k,N=r.pick(['cây','cuốn sách','kg giấy vụn']),[Ln,Lm,Lk]=['7A','7B','7C'];
  return{kind:'tl',title:'Dãy tỉ số bằng nhau',parts:[
    {pts:.5,html:`Ba lớp ${Ln}, ${Lm}, ${Lk} góp được tổng cộng ${S} ${N}. Biết số ${N} góp được của ba lớp tỉ lệ với ${rs.join('; ')}. Gọi số ${N} của ba lớp lần lượt là ${I('x')}, ${I('y')}, ${I('z')}. Viết dãy tỉ số bằng nhau và tìm giá trị chung của các tỉ số đó.`},
    {pts:.5,html:`Tính số ${N} của mỗi lớp. Lớp nào góp được nhiều nhất?`}],
    sol:[ptxt([[`${fr('x',rs[0])} = ${fr('y',rs[1])} = ${fr('z',rs[2])} và x + y + z = ${S}`,.25],[`Tính chất dãy tỉ số bằng nhau: giá trị chung = ${S} : ${rs.reduce((a,b)=>a+b,0)} = ${k}`,.25]]),
      ptxt([[`x = ${rs[0]}·${k} = ${rs[0]*k}; y = ${rs[1]}·${k} = ${rs[1]*k}; z = ${rs[2]}·${k} = ${rs[2]*k}`,.25],[`Lớp ${Lk} góp nhiều nhất (${rs[2]*k} ${N}).`,.25]])]};
});
TL7b('tl7-6-nghich',6,'VD','real',r=>{
  for(;;){const a=r.pick([6,8,10,12,15,20]),d=r.int(6,20),e=r.int(2,5),W=a*d;if(d-e<2||W%(d-e))continue;const b=W/(d-e);if(b<=a)continue;
    const a2=r.pick([4,5,6,8,10,12].filter(z=>z!==a&&W%z===0&&z!==b));if(!a2)continue;
    return{kind:'tl',title:'Đại lượng tỉ lệ nghịch',parts:[
      {pts:.5,html:`Một đội gồm ${a} công nhân (cùng năng suất) hoàn thành một công việc trong ${d} ngày. Nếu đội chỉ còn ${a2} công nhân thì hoàn thành công việc đó trong bao nhiêu ngày?`},
      {pts:.5,html:`Muốn hoàn thành công việc đó sớm hơn dự định ${e} ngày (so với ${d} ngày) thì cần có bao nhiêu công nhân?`}],
      sol:[ptxt([[`Số công nhân và số ngày tỉ lệ nghịch: ${a}·${d} = ${a2}·t`,.25],[`t = ${W} : ${a2} = ${W/a2} (ngày)`,.25]]),
        ptxt([[`Số ngày cần làm: ${d} − ${e} = ${d-e} (ngày); ${a}·${d} = n·${d-e}`,.25],[`n = ${W} : ${d-e} = ${b} (công nhân)`,.25]])]};}
});

/* ---------- Chương VII: Biểu thức đại số và đa thức một biến ---------- */
const P1=(...cs)=>Pl.from(cs.map((c,i)=>({c,ex:i,ey:0})));      /* cs[i] là hệ số của x^i */
const ev1=(P,x)=>Pl.ev(P,x,0);
const deg1=P=>Math.max(...Object.keys(P).map(k=>+k.split(',')[0]));
const rcoef=(r,lo=-9,hi=9)=>r.nz(lo,hi);
const raw1=(r,P)=>termsHTML(r.shuffle(termsOf(P)));
N7b('m7-7-eval',7,'NB',r=>{
  const a=rcoef(r,-5,5),b=rcoef(r),c=rcoef(r),x0=r.nz(-3,3),P=P1(c,b,a),v=ev1(P,x0);
  return mkNum(r,{stem:`Giá trị của đa thức ${I('P')}(${I('x')}) = ${ph(P)} tại ${I('x')} = ${sg(x0)} là`,correct:v,f:sg,ok:()=>true,cands:[ev1(P,-x0),a+b+c,v+2*b*x0,a*x0*x0-b*x0+c],
    sol:`Thay x = ${sg(x0)}: P(${sg(x0)}) = ${qp(Q(a))}·${qp(Q(x0))}${sup(2)} + ${qp(Q(b))}·${qp(Q(x0))} + ${qp(Q(c))} = ${sg(v)}.`});
});
N7b('m7-7-deg',7,'NB',r=>{
  const n=r.int(3,6),ex=r.shuffle([...Array(n).keys()].filter(i=>i>0&&i<n)).slice(0,2),P=Pl.from([{c:rcoef(r),ex:n,ey:0},...ex.map(e=>({c:rcoef(r),ex:e,ey:0})),{c:rcoef(r),ex:0,ey:0}]),lead=P[n+',0'],cst=P['0,0'],t=r.int(0,2);
  const nm=['Bậc','Hệ số cao nhất','Hệ số tự do'][t],val=[n,lead,cst][t];
  return mkNum(r,{stem:`${nm} của đa thức ${I('P')}(${I('x')}) = ${raw1(r,P)} là`,correct:val,f:sg,ok:c=>t===0?c>0:true,cands:[[lead,cst,n+1][t],[cst,n,lead][t],-val,val+1,n-1],
    sol:`Sắp xếp theo lũy thừa giảm dần: P(x) = ${ph(P)}. Bậc là ${n}; hệ số cao nhất là ${sg(lead)}; hệ số tự do là ${sg(cst)}.`});
});
const _x=I('x'),_y=I('y'),_t=I('t');
const POLY_T=[`3${_x}${sup(2)} − 5${_x} + 1`,`${_x}${sup(4)} − 7`,`2${_x}`,'−5',`${_x}${sup(3)} + 4${_x} − 9`,`${_t}${sup(2)} − 3${_t} + 8`,`${_y}${sup(5)} − ${_y}`],
  POLY_F=[`${_x}${sup(2)} + ${_y}`,`${fr(2,_x)} + 3`,`${rt(_x)} + 1`,`${_x} + ${fr(1,_x)}`,`3${_x}${_y} − 1`,`${_x}${sup(2)} + ${fr(2,_x)}`,fr(1,`${_x} − 1`)];
N7b('m7-7-polydef',7,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?POLY_T:POLY_F);
  return mkTxt(r,{stem:`Biểu thức nào sau đây ${want?'là':'<b>không</b> là'} đa thức một biến?`,correct:ok.replace(/(.)\/(.+)/,'$1/$2'),wrongs:r.shuffle(want?POLY_F:POLY_T).slice(0,3),
    sol:`Đa thức một biến là tổng của những đơn thức của cùng một biến (biến chỉ có số mũ nguyên dương, không nằm ở mẫu hay dưới dấu căn). Vậy chọn ${ok}.`});
});
N7b('m7-7-sort',7,'NB',r=>{
  const P=Pl.from([{c:rcoef(r),ex:3,ey:0},{c:rcoef(r),ex:2,ey:0},{c:rcoef(r),ex:1,ey:0},{c:rcoef(r),ex:0,ey:0}]),ts=termsOf(P),H=a=>termsHTML(a);
  const asc=[...ts].reverse(),w1=[ts[1],ts[0],ts[2],ts[3]],w2=[ts[0],ts[2],ts[1],ts[3]],w3=[ts[3],ts[1],ts[2],ts[0]];
  return mkTxt(r,{stem:`Cho đa thức ${I('P')}(${I('x')}) = ${raw1(r,P)}. Sắp xếp các hạng tử của ${I('P')}(${I('x')}) theo lũy thừa giảm dần của biến, ta được`,correct:H(ts),wrongs:[H(asc),H(w1),H(w2),H(w3)],
    sol:`Sắp xếp theo số mũ giảm dần: P(x) = ${H(ts)}.`});
});
N7b('m7-7-add',7,'TH',r=>{
  const P=P1(rcoef(r),rcoef(r),rcoef(r),rcoef(r,-5,5)),Qp=P1(rcoef(r),rcoef(r),rcoef(r),rcoef(r,-5,5)),S=Pl.add(P,Qp);
  return mkPoly(r,{stem:`Cho ${I('P')}(${I('x')}) = ${ph(P)} và ${I('Q')}(${I('x')}) = ${ph(Qp)}. Đa thức ${I('P')}(${I('x')}) + ${I('Q')}(${I('x')}) là`,correct:S,wrongs:[Pl.sub(P,Qp),Pl.sub(Qp,P)],
    sol:`Cộng các hạng tử đồng dạng: P(x) + Q(x) = ${ph(S)}.`,chk:()=>[-2,0,1,3].every(x=>ev1(S,x)===ev1(P,x)+ev1(Qp,x))});
});
N7b('m7-7-sub',7,'TH',r=>{
  const P=P1(rcoef(r),rcoef(r),rcoef(r),rcoef(r,-5,5)),Qp=P1(rcoef(r),rcoef(r),rcoef(r),rcoef(r,-5,5)),D=Pl.sub(P,Qp),bad=Pl.add(P,Pl.neg(Pl.add(Qp,Pl.neg(P))));
  return mkPoly(r,{stem:`Cho ${I('P')}(${I('x')}) = ${ph(P)} và ${I('Q')}(${I('x')}) = ${ph(Qp)}. Đa thức ${I('P')}(${I('x')}) ${MINUS} ${I('Q')}(${I('x')}) là`,correct:D,wrongs:[Pl.add(P,Qp),Pl.sub(Qp,P),bad],
    sol:`Đổi dấu các hạng tử của Q(x) rồi cộng: P(x) − Q(x) = ${ph(D)}.`,chk:()=>[-2,0,1,3].every(x=>ev1(D,x)===ev1(P,x)-ev1(Qp,x))});
});
N7b('m7-7-mul',7,'TH',r=>{
  const a=r.nz(-4,4),b=r.nz(-6,6),c=r.nz(-4,4),d=r.nz(-6,6),e=r.nz(-6,6),A=P1(b,a),B=P1(e,d,c),M=Pl.mul(A,B);
  return mkPoly(r,{stem:`Kết quả của phép nhân ${par(A)}${par(B)} là`,correct:M,wrongs:[Pl.mul(P1(-b,a),B),Pl.add(Pl.mul(A,B),Pl.m(a*c,3,0)),Pl.mul(A,P1(e,-d,c))],
    sol:`Nhân từng hạng tử của đa thức này với đa thức kia rồi cộng các hạng tử đồng dạng: ${par(A)}${par(B)} = ${ph(M)}.`,chk:()=>[-2,1,3].every(x=>ev1(M,x)===ev1(A,x)*ev1(B,x))});
});
N7b('m7-7-div',7,'TH',r=>{
  if(r.chance(.4)){
    const m=r.int(2,4),c=rcoef(r,-5,5),b=rcoef(r,-5,5),a=rcoef(r,-5,5),A=P1(0,a*m,b*m,c*m),Qq=P1(a,b,c);  /* (c x³ + …) : mx */
    const num=Pl.from([{c:c*m,ex:3,ey:0},{c:b*m,ex:2,ey:0},{c:a*m,ex:1,ey:0}]),q=Pl.from([{c:c,ex:2,ey:0},{c:b,ex:1,ey:0},{c:a,ex:0,ey:0}]);
    return mkPoly(r,{stem:`Kết quả của phép chia ${par(num)} : ${m===1?'':m}${I('x')} là`,correct:q,wrongs:[Pl.from([{c:c,ex:3,ey:0},{c:b,ex:2,ey:0},{c:a,ex:1,ey:0}]),Pl.from([{c:c*m,ex:2,ey:0},{c:b*m,ex:1,ey:0},{c:a*m,ex:0,ey:0}])],
      sol:`Chia từng hạng tử của đa thức cho ${m}x: kết quả là ${ph(q)}.`,chk:()=>[-2,1,3].every(x=>ev1(num,x)===ev1(q,x)*m*x)});
  }
  const p=r.nz(-6,6),c=r.nz(-4,4),d=r.nz(-6,6),A=Pl.mul(lin(1,p),lin(c,d)),q=lin(c,d);
  return mkPoly(r,{stem:`Kết quả của phép chia ${par(A)} : ${par(lin(1,p))} là`,correct:q,wrongs:[lin(c,-d),lin(c,d+p),lin(1,c*d)],
    sol:`Ta có ${ph(A)} = ${par(lin(1,p))}${par(q)} nên thương là ${ph(q)}.`,chk:()=>[-2,1,3].every(x=>ev1(A,x)===ev1(lin(1,p),x)*ev1(q,x))});
});
N7b('m7-7-root',7,'TH',r=>{
  let r1=r.nz(-6,6),r2=r.nz(-6,6);while(r1===r2)r2=r.nz(-6,6);
  const P=Pl.mul(lin(1,-r1),lin(1,-r2));
  return mkNum(r,{stem:`Số nào sau đây là nghiệm của đa thức ${I('P')}(${I('x')}) = ${ph(P)}?`,correct:r1,f:sg,ok:c=>c!==r1&&c!==r2,cands:[-r1,r1+r2,r1*r2,-r2===r1?r1+1:-r2].filter(c=>c!==r2),
    sol:`Ta có P(x) = (x ${r1<0?'+':'−'} ${Math.abs(r1)})(x ${r2<0?'+':'−'} ${Math.abs(r2)}) nên P(${sg(r1)}) = 0. Vậy ${sg(r1)} là nghiệm của P(x).`,chk:()=>ev1(P,r1)===0&&ev1(P,r2)===0});
});
N7b('m7-7-expr',7,'NB',r=>{
  let a=r.int(2,9),b=r.int(2,9);while(b===a)b=r.int(2,9);const k=r.int(2,9);
  const C=[
    {s:`Số tiền mua ${I('x')} quyển vở giá ${a} nghìn đồng một quyển và ${I('y')} chiếc bút giá ${b} nghìn đồng một chiếc (đơn vị: nghìn đồng) được biểu thị bởi biểu thức`,c:`${a}${I('x')} + ${b}${I('y')}`,w:[`${b}${I('x')} + ${a}${I('y')}`,`${a+b}${I('x')}${I('y')}`,`${a}${I('x')}${I('y')} + ${b}`]},
    {s:`Chu vi hình chữ nhật có chiều dài ${I('a')} (cm) và chiều rộng ${I('b')} (cm) được biểu thị bởi biểu thức`,c:`2(${I('a')} + ${I('b')})`,w:[`${I('a')} + ${I('b')}`,`2${I('a')}${I('b')}`,`${I('a')}${I('b')}`]},
    {s:`Quãng đường (km) của một xe đi với vận tốc ${I('v')} (km/h) trong ${I('t')} giờ được biểu thị bởi biểu thức`,c:`${I('v')}${I('t')}`,w:[`${I('v')} + ${I('t')}`,fr(I('v'),I('t')),`2${I('v')}${I('t')}`]},
    {s:`Diện tích hình thang có hai đáy là ${I('a')} (cm), ${I('b')} (cm) và chiều cao ${I('h')} (cm) được biểu thị bởi biểu thức`,c:fr(`(${I('a')} + ${I('b')})${I('h')}`,2),w:[`(${I('a')} + ${I('b')})${I('h')}`,fr(`${I('a')}${I('b')}${I('h')}`,2),`${I('a')} + ${I('b')} + ${I('h')}`]},
    {s:`Bạn Nam đưa ${k*100} nghìn đồng mua ${I('x')} kg táo, giá ${a*5} nghìn đồng một kilôgam. Số tiền còn lại (nghìn đồng) được biểu thị bởi biểu thức`,c:`${k*100} ${MINUS} ${a*5}${I('x')}`,w:[`${a*5}${I('x')} ${MINUS} ${k*100}`,`${k*100}${I('x')} ${MINUS} ${a*5}`,`${k*100} + ${a*5}${I('x')}`]}];
  const z=r.pick(C);
  return mkTxt(r,{stem:z.s,correct:z.c,wrongs:z.w,sol:`Lập biểu thức theo đúng ý nghĩa của đề bài: ${z.c}.`});
});
N7b('m7-7-degsum',7,'VD',r=>{
  const a=rcoef(r,1,5)*r.sign(),b=rcoef(r),d=rcoef(r),e=rcoef(r),P=P1(rcoef(r),rcoef(r),b,a),Qp=P1(rcoef(r),rcoef(r),d,-a),S=Pl.add(P,Qp);
  let n=3;for(;n>0&&!S[n+',0'];n--);
  return mkNum(r,{stem:`Cho ${I('P')}(${I('x')}) = ${ph(P)} và ${I('Q')}(${I('x')}) = ${ph(Qp)}. Bậc của đa thức ${I('P')}(${I('x')}) + ${I('Q')}(${I('x')}) là`,correct:n,ok:c=>c>=0&&c<=6,cands:[3,6,2,1,4],
    sol:`Hai hạng tử bậc 3 là ${sg(a)}x³ và ${sg(-a)}x³ triệt tiêu. P(x) + Q(x) = ${ph(S)}, có bậc ${n}.`,chk:()=>n<3});
});
DS7b('ds7-7-poly',7,'TH',r=>{
  const n=r.int(3,4),a=rcoef(r,-6,6),cs=[rcoef(r),rcoef(r),rcoef(r)],P=Pl.from([{c:a,ex:n,ey:0},{c:cs[0],ex:n-1,ey:0},{c:cs[1],ex:1,ey:0},{c:cs[2],ex:0,ey:0}]),x0=r.nz(-3,3),v=ev1(P,x0);
  return mkDS(r,{stem:`Cho đa thức ${I('P')}(${I('x')}) = ${raw1(r,P)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Bậc của ${I('P')}(${I('x')}) là ${n}`,f:`Bậc của ${I('P')}(${I('x')}) là ${n+1}`,why:`Số mũ lớn nhất của x là ${n} nên bậc của P(x) bằng ${n}.`},
    {t:`Hệ số cao nhất của ${I('P')}(${I('x')}) là ${sg(a)}`,f:`Hệ số cao nhất của ${I('P')}(${I('x')}) là ${sg(a+1)}`,why:`Hệ số của x${sup(n)} là ${sg(a)}.`},
    {t:`Hệ số tự do của ${I('P')}(${I('x')}) là ${sg(cs[2])}`,f:`Hệ số tự do của ${I('P')}(${I('x')}) là ${sg(cs[2]+1)}`,why:`Hạng tử không chứa x là ${sg(cs[2])}.`},
    {t:`${I('P')}(${sg(x0)}) = ${sg(v)}`,f:`${I('P')}(${sg(x0)}) = ${sg(v+r.pick([-2,2,3]))}`,why:`Thay x = ${sg(x0)} vào P(x) được P(${sg(x0)}) = ${sg(v)}.`}
  ]});
});
DS7b('ds7-7-op',7,'TH',r=>{
  let P,Qp;do{P=P1(rcoef(r),rcoef(r),rcoef(r,-5,5));Qp=P1(rcoef(r),rcoef(r),rcoef(r,-5,5))}while(Pl.eq(P,Qp));
  const S=Pl.add(P,Qp),D=Pl.sub(P,Qp),s1=ev1(S,1);
  return mkDS(r,{stem:`Cho ${I('P')}(${I('x')}) = ${ph(P)} và ${I('Q')}(${I('x')}) = ${ph(Qp)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('P')}(${I('x')}) + ${I('Q')}(${I('x')}) = ${ph(S)}`,f:`${I('P')}(${I('x')}) + ${I('Q')}(${I('x')}) = ${ph(Pl.add(S,Pl.m(r.pick([1,2,-1]),1,0)))}`,why:`Cộng các hạng tử đồng dạng được ${ph(S)}.`},
    {t:`${I('P')}(${I('x')}) ${MINUS} ${I('Q')}(${I('x')}) = ${ph(D)}`,f:`${I('P')}(${I('x')}) ${MINUS} ${I('Q')}(${I('x')}) = ${ph(Pl.sub(Qp,P))}`,why:`Trừ từng cặp hạng tử đồng dạng được ${ph(D)}.`},
    {t:`Bậc của ${I('P')}(${I('x')})·${I('Q')}(${I('x')}) bằng ${deg1(P)+deg1(Qp)}`,f:`Bậc của ${I('P')}(${I('x')})·${I('Q')}(${I('x')}) bằng ${Math.max(deg1(P),deg1(Qp))}`,why:`Bậc của tích bằng tổng các bậc: ${deg1(P)} + ${deg1(Qp)} = ${deg1(P)+deg1(Qp)}.`},
    {t:`Tổng các hệ số của ${I('P')}(${I('x')}) + ${I('Q')}(${I('x')}) bằng ${sg(s1)}`,f:`Tổng các hệ số của ${I('P')}(${I('x')}) + ${I('Q')}(${I('x')}) bằng ${sg(s1+2)}`,why:`Tổng các hệ số của một đa thức bằng giá trị của nó tại x = 1: ${sg(s1)}.`}
  ],chk:()=>!Pl.eq(D,Pl.sub(Qp,P))&&deg1(P)+deg1(Qp)!==Math.max(deg1(P),deg1(Qp))});
});
DS7b('ds7-7-root',7,'VD',r=>{
  let a=r.int(1,6),b=r.int(1,6);while(a===b)b=r.int(1,6);
  const P=Pl.mul(lin(1,-a),lin(1,b)),x0=a+b;
  return mkDS(r,{stem:`Cho đa thức ${I('P')}(${I('x')}) = ${ph(P)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('x')} = ${a} là nghiệm của ${I('P')}(${I('x')})`,f:`${I('x')} = ${-a} là nghiệm của ${I('P')}(${I('x')})`,why:`P(${a}) = ${ev1(P,a)}; P(${-a}) = ${ev1(P,-a)} ≠ 0.`},
    {t:`${I('x')} = ${-b} là nghiệm của ${I('P')}(${I('x')})`,f:`${I('x')} = ${b} là nghiệm của ${I('P')}(${I('x')})`,why:`P(${-b}) = ${ev1(P,-b)}; P(${b}) = ${ev1(P,b)} ≠ 0.`},
    {t:`${I('P')}(0) = ${sg(-a*b)}`,f:`${I('P')}(0) = ${a*b}`,why:`P(0) = (0 − ${a})(0 + ${b}) = ${sg(-a*b)}.`},
    {t:`${I('P')}(${x0}) = ${b*(a+2*b)}`,f:`${I('P')}(${x0}) = ${b*(a+2*b)+b}`,why:`P(${x0}) = (${x0} − ${a})(${x0} + ${b}) = ${b}·${a+2*b} = ${b*(a+2*b)}.`}
  ],chk:()=>ev1(P,a)===0&&ev1(P,-b)===0&&ev1(P,-a)!==0&&ev1(P,b)!==0});
});
TLN7b('t7-7-eval',7,'TH',r=>{
  const P=P1(rcoef(r),rcoef(r),rcoef(r),rcoef(r,-5,5)),x0=r.pick([-2,-1,2,3]);
  return{kind:'tln',stem:`Tính giá trị của đa thức ${I('P')}(${I('x')}) = ${ph(P)} tại ${I('x')} = ${sg(x0)}.`,ans:ev1(P,x0),unit:'',sol:`P(${sg(x0)}) = ${sg(ev1(P,x0))}.`};
});
TLN7b('t7-7-root',7,'VD',r=>{
  const rr=r.pick([-3,-2,-1,1,2,3]),a=r.nz(-3,3),c=rr*r.nz(-4,4),m=-(a*rr*rr+c)/rr;
  return{kind:'tln',stem:`Biết ${I('x')} = ${sg(rr)} là nghiệm của đa thức ${I('P')}(${I('x')}) = ${ph(P1(c,0,a)).replace(/^/,'')} + ${I('m')}${I('x')}. Tìm ${I('m')}.`,ans:m,unit:'',
    sol:`P(${sg(rr)}) = 0 ⟹ ${qp(Q(a))}·${qp(Q(rr))}${sup(2)} + m·${qp(Q(rr))} + ${qp(Q(c))} = 0 ⟹ m = ${sg(m)}.`,chk:()=>a*rr*rr+m*rr+c===0};
});
TLN7b('t7-7-sumcoef',7,'VD',r=>{
  const P=P1(rcoef(r),rcoef(r),rcoef(r)),A=lin(r.nz(-4,4),r.nz(-6,6)),v=ev1(P,1)*ev1(A,1);
  return{kind:'tln',stem:`Cho ${I('P')}(${I('x')}) = ${ph(P)} và ${I('A')}(${I('x')}) = ${ph(A)}. Sau khi thực hiện phép nhân ${I('P')}(${I('x')})·${I('A')}(${I('x')}) và thu gọn, tính tổng các hệ số của đa thức tích.`,ans:v,unit:'',
    sol:`Tổng các hệ số của một đa thức bằng giá trị của đa thức tại x = 1: P(1)·A(1) = ${sg(ev1(P,1))}·${sg(ev1(A,1))} = ${sg(v)}.`};
});
TLN7b('t7-7-div',7,'TH',r=>{
  const p=r.nz(-6,6),c=r.nz(-4,4),d=r.nz(-6,6),A=Pl.mul(lin(1,p),lin(c,d)),x0=r.pick([-2,-1,1,2,3]);
  return{kind:'tln',stem:`Thực hiện phép chia ${par(A)} : ${par(lin(1,p))} được thương ${I('Q')}(${I('x')}). Tính ${I('Q')}(${sg(x0)}).`,ans:c*x0+d,unit:'',
    sol:`${ph(A)} = ${par(lin(1,p))}${par(lin(c,d))} nên Q(x) = ${ph(lin(c,d))} và Q(${sg(x0)}) = ${sg(c*x0+d)}.`,chk:()=>[1,2,3].every(x=>ev1(A,x)===(x+p)*(c*x+d))};
});
TL7b('tl7-7-ops',7,'TH','alg',r=>{
  const a=rcoef(r,-5,5),b=rcoef(r),c=rcoef(r),d=rcoef(r),a1=r.nz(-4,4),b1=r.nz(-4,4),P=P1(d,c,b,a),Qp=P1(rcoef(r),rcoef(r),rcoef(r,-4,4),rcoef(r,-4,4));
  const rawP=termsHTML(r.shuffle([{c:a1,ex:3,ey:0},{c:b1,ex:2,ey:0},{c:c,ex:1,ey:0},{c:b-b1,ex:2,ey:0},{c:d,ex:0,ey:0},{c:a-a1,ex:3,ey:0}].filter(m=>m.c)));
  const S=Pl.add(P,Qp),D=Pl.sub(P,Qp);
  return{kind:'tl',title:'Đa thức một biến',parts:[
    {pts:.5,html:`Cho đa thức ${I('P')}(${I('x')}) = ${rawP}. Thu gọn và sắp xếp ${I('P')}(${I('x')}) theo lũy thừa giảm dần của biến; cho biết bậc và hệ số cao nhất của ${I('P')}(${I('x')}).`},
    {pts:.5,html:`Cho ${I('Q')}(${I('x')}) = ${ph(Qp)}. Tính ${I('P')}(${I('x')}) + ${I('Q')}(${I('x')}) và ${I('P')}(${I('x')}) ${MINUS} ${I('Q')}(${I('x')}).`}],
    sol:[ptxt([[`Thu gọn: P(x) = ${ph(P)}`,.25],[`Bậc ${deg1(P)}; hệ số cao nhất ${sg(P[deg1(P)+',0'])}`,.25]]),
      ptxt([[`P(x) + Q(x) = ${ph(S)}`,.25],[`P(x) − Q(x) = ${ph(D)}`,.25]])],
    chk:()=>[-2,1,3].every(x=>ev1(S,x)===ev1(P,x)+ev1(Qp,x))&&a!==0&&P[deg1(P)+',0']!==0};
});
TL7b('tl7-7-muldiv',7,'VD','alg',r=>{
  const a=r.nz(-3,3),b=r.nz(-5,5),c=r.nz(-3,3),d=r.nz(-5,5),e=r.nz(-5,5),A=lin(a,b),B=P1(e,d,c),M=Pl.mul(A,B);
  const p=r.nz(-5,5),k=r.nz(-3,3),m=r.nz(-6,6),N=Pl.mul(lin(1,p),lin(k,m));
  return{kind:'tl',title:'Nhân, chia đa thức một biến',parts:[
    {pts:.5,html:`Thực hiện phép nhân ${par(A)}${par(B)}.`},
    {pts:.5,html:`Thực hiện phép chia ${par(N)} : ${par(lin(1,p))}.`}],
    sol:[ptxt([[`Nhân từng hạng tử của ${ph(A)} với ${par(B)} rồi cộng các hạng tử đồng dạng`,.25],[`Kết quả: ${ph(M)}`,.25]]),
      ptxt([[`Đặt tính chia (hoặc phân tích): ${ph(N)} = ${par(lin(1,p))}${par(lin(k,m))}`,.25],[`Thương là ${ph(lin(k,m))}`,.25]])],
    chk:()=>[-2,1,3].every(x=>ev1(M,x)===ev1(A,x)*ev1(B,x)&&ev1(N,x)===(x+p)*(k*x+m))};
});
TL7b('tl7-7-root',7,'VD','alg',r=>{
  let r1=r.nz(-6,6),r2=r.nz(-6,6);while(r1===r2)r2=r.nz(-6,6);
  const P=Pl.mul(lin(1,-r1),lin(1,-r2)),v=ev1(P,r1);
  return{kind:'tl',title:'Nghiệm của đa thức một biến',parts:[
    {pts:.5,html:`Cho đa thức ${I('P')}(${I('x')}) = ${ph(P)}. Chứng tỏ ${I('x')} = ${sg(r1)} là một nghiệm của ${I('P')}(${I('x')}).`},
    {pts:.5,html:`Tìm tất cả các nghiệm của ${I('P')}(${I('x')}).`}],
    sol:[ptxt([[`P(${sg(r1)}) = ${qp(Q(r1))}${sup(2)} ${r1+r2>0?'−':'+'} ${Math.abs(r1+r2)}·${qp(Q(r1))} ${r1*r2<0?'−':'+'} ${Math.abs(r1*r2)}`,.25],[`= ${sg(v)}, nên x = ${sg(r1)} là nghiệm.`,.25]]),
      ptxt([[`Phân tích: P(x) = (x ${r1<0?'+':'−'} ${Math.abs(r1)})(x ${r2<0?'+':'−'} ${Math.abs(r2)})`,.25],[`P(x) = 0 ⟺ x = ${sg(r1)} hoặc x = ${sg(r2)}`,.25]])],
    chk:()=>v===0&&ev1(P,r2)===0};
});
TL7b('tl7-7-real',7,'VD','real',r=>{
  const p=r.int(1,5),q=r.int(1,4),x0=r.int(2,6),W=Pl.from([{c:2,ex:1,ey:0},{c:p,ex:0,ey:0}]),Hh=lin(1,q),S=Pl.mul(W,Hh),C=Pl.mul(Pl.C(2),Pl.add(W,Hh));
  return{kind:'tl',title:'Biểu thức đại số trong thực tế',parts:[
    {pts:.5,html:`Một mảnh vườn hình chữ nhật có chiều dài ${par(W)} m và chiều rộng ${par(Hh)} m (với ${I('x')} > 0). Viết biểu thức biểu thị chu vi và diện tích mảnh vườn (thu gọn).`},
    {pts:.5,html:`Với ${I('x')} = ${x0}, tính chu vi và diện tích mảnh vườn đó.`}],
    sol:[ptxt([[`Chu vi: 2·[${ph(W)} + ${ph(Hh)}] = ${ph(C)} (m)`,.25],[`Diện tích: ${par(W)}${par(Hh)} = ${ph(S)} (m²)`,.25]]),
      ptxt([[`Chu vi: ${ev1(C,x0)} m`,.25],[`Diện tích: ${ev1(S,x0)} m²`,.25]])],
    chk:()=>ev1(S,x0)===(2*x0+p)*(x0+q)&&ev1(C,x0)===2*(3*x0+p+q)};
});
TL7b('tl7-7-noroot',7,'VDC','alg',r=>{
  const p=r.nz(-6,6),q=r.int(1,9),P=Pl.from([{c:1,ex:2,ey:0},{c:2*p,ex:1,ey:0},{c:p*p+q,ex:0,ey:0}]);
  return{kind:'tl',title:'Nghiệm của đa thức một biến',parts:[
    {pts:.5,html:`Cho đa thức ${I('P')}(${I('x')}) = ${ph(P)}. Viết ${I('P')}(${I('x')}) dưới dạng ${par(Pl.add(Pl.m(1,1,0),Pl.C(p)))}${sup(2)} + ${q}.`},
    {pts:.5,html:`Chứng tỏ đa thức ${I('P')}(${I('x')}) không có nghiệm.`}],
    sol:[ptxt([[`${par(lin(1,p))}${sup(2)} = x² ${p<0?'−':'+'} ${2*Math.abs(p)}x + ${p*p}`,.25],[`P(x) = ${par(lin(1,p))}${sup(2)} + ${q}`,.25]]),
      ptxt([[`Với mọi x: ${par(lin(1,p))}${sup(2)} ≥ 0, nên P(x) ≥ ${q} > 0`,.25],[`Do đó P(x) ≠ 0 với mọi x, tức P(x) không có nghiệm.`,.25]])],
    chk:()=>[-3,0,2].every(x=>ev1(P,x)===(x+p)**2+q)&&q>0};
});

/* ---------- Chương VIII: Biến cố và xác suất ---------- */
const EV_SURE=['Gieo một con xúc xắc, số chấm xuất hiện nhỏ hơn 7','Tung một đồng xu, mặt xuất hiện là mặt sấp hoặc mặt ngửa','Lấy ngẫu nhiên một viên bi từ hộp chỉ chứa bi đỏ, viên bi lấy ra có màu đỏ','Rút một thẻ từ hộp chứa các thẻ đánh số từ 1 đến 10, số trên thẻ nhỏ hơn 11'];
const EV_IMP=['Gieo một con xúc xắc, số chấm xuất hiện là 7','Lấy ngẫu nhiên một viên bi từ hộp chỉ chứa bi đỏ, viên bi lấy ra có màu xanh','Rút một thẻ từ hộp chứa các thẻ đánh số từ 1 đến 10, số trên thẻ lớn hơn 10','Tung một đồng xu, xuất hiện đồng thời cả mặt sấp và mặt ngửa'];
const EV_RAN=['Gieo một con xúc xắc, xuất hiện mặt 6 chấm','Tung một đồng xu, xuất hiện mặt sấp','Rút một thẻ từ hộp chứa các thẻ đánh số từ 1 đến 10, số trên thẻ là số chẵn','Lấy ngẫu nhiên một viên bi từ hộp có cả bi đỏ và bi xanh, viên bi lấy ra có màu đỏ'];
N7b('m7-8-event',8,'NB',r=>{
  const k=r.int(0,2),all=[EV_SURE,EV_IMP,EV_RAN],nm=['chắc chắn','không thể','ngẫu nhiên'],ok=r.pick(all[k]);
  const wr=r.shuffle(all.filter((_,i)=>i!==k).flat()).slice(0,3);
  return mkTxt(r,{stem:`Biến cố nào sau đây là biến cố ${nm[k]}?`,correct:ok+'.',wrongs:wr.map(x=>x+'.'),
    sol:`${['Biến cố chắc chắn là biến cố luôn xảy ra.','Biến cố không thể là biến cố không bao giờ xảy ra.','Biến cố ngẫu nhiên là biến cố có thể xảy ra hoặc không xảy ra.'][k]} Chọn: ${ok}.`});
});
const isPrime=n=>{if(n<2)return false;for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
const CARD_EV=[
  (r,n)=>{const k=r.pick([2,3,4,5,6,7]);return{h:`chia hết cho ${k}`,f:x=>x%k===0}},
  (r,n)=>({h:'là số nguyên tố',f:isPrime}),
  (r,n)=>({h:'là số chính phương',f:x=>Number.isInteger(Math.sqrt(x))}),
  (r,n)=>{const m=r.int(Math.floor(n/4),Math.floor(n*.75));return{h:`lớn hơn ${m}`,f:x=>x>m}},
  (r,n)=>({h:'là số lẻ',f:x=>x%2===1})];
const cardList=(n,f)=>{const a=[];for(let i=1;i<=n;i++)if(f(i))a.push(i);return a};
N7b('m7-8-fav',8,'TH',r=>{
  const n=r.pick([20,25,30,40,50]),ev=r.pick(CARD_EV)(r,n),L=cardList(n,ev.f);
  return mkNum(r,{stem:`Một hộp chứa ${n} tấm thẻ giống nhau, được đánh số 1, 2, 3, …, ${n}. Rút ngẫu nhiên một thẻ. Số kết quả thuận lợi cho biến cố “Số ghi trên thẻ ${ev.h}” là`,correct:L.length,ok:c=>c>=0&&c<=n,cands:[n-L.length,L.length+1,n,L.length-1],
    sol:`Các số thỏa mãn là: ${L.join('; ')}. Có ${L.length} kết quả thuận lợi.`,chk:()=>L.length>0});
});
N7b('m7-8-prob',8,'TH',r=>{
  const a=r.int(2,8),b=r.int(2,8),c=r.int(1,6),N=a+b+c,t=r.int(0,2);
  const [h,cnt]=[['màu đỏ',a],['màu xanh',b],['không phải màu vàng',a+b]][t];
  return mkF(r,{stem:`Một hộp có ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng, các viên bi có kích thước và khối lượng như nhau. Lấy ngẫu nhiên một viên bi. Xác suất để viên bi lấy ra ${h==='màu đỏ'||h==='màu xanh'?'có':''} ${h} là`.replace('  ',' '),correct:Q(cnt,N),cands:[Q(cnt,N-cnt),Q(cnt,N+1),Q(cnt,3),Q(N-cnt,N)],
    sol:`Có ${N} kết quả có thể, đồng khả năng; có ${cnt} kết quả thuận lợi. Xác suất là ${fr(cnt,N)}${qh(Q(cnt,N))!==fr(cnt,N)?' = '+qh(Q(cnt,N)):''}.`,chk:()=>N-cnt!==cnt||true});
});
N7b('m7-8-probnum',8,'TH',r=>{
  const n=r.pick([10,20,25,30,40,50]),ev=r.pick(CARD_EV)(r,n),L=cardList(n,ev.f);
  return mkF(r,{stem:`Một hộp chứa ${n} tấm thẻ giống nhau, được đánh số 1, 2, 3, …, ${n}. Rút ngẫu nhiên một thẻ. Xác suất để số ghi trên thẻ ${ev.h} là`,correct:Q(L.length,n),cands:[Q(n-L.length,n),Q(L.length,n+1),Q(1,n),Q(L.length+1,n)],
    sol:`Có ${n} kết quả có thể, ${L.length} kết quả thuận lợi (${L.join('; ')}). Xác suất: ${fr(L.length,n)} = ${qh(Q(L.length,n))}.`,chk:()=>L.length>0});
});
const PROB_T=['Xác suất của biến cố chắc chắn bằng 1','Xác suất của biến cố không thể bằng 0','Xác suất của một biến cố bất kì luôn lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 1','Khi các kết quả có thể là đồng khả năng, xác suất của biến cố A bằng số kết quả thuận lợi cho A chia cho tổng số kết quả có thể'];
const PROB_F=['Xác suất của biến cố ngẫu nhiên có thể bằng 2','Xác suất của biến cố chắc chắn bằng 0','Xác suất của biến cố không thể bằng 1','Xác suất của một biến cố có thể là số âm'];
N7b('m7-8-probdef',8,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?PROB_T:PROB_F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?PROB_F:PROB_T).slice(0,3).map(x=>x+'.'),sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}.`});
});
const DICE_EV=[['là số lẻ',n=>n%2===1],['là số nguyên tố',isPrime],['chia hết cho 3',n=>n%3===0],['là ước của 6',n=>6%n===0],['lớn hơn 4',n=>n>4],['nhỏ hơn 3',n=>n<3]];
N7b('m7-8-dice',8,'TH',r=>{
  const [h,f]=r.pick(DICE_EV),L=cardList(6,f);
  return mkF(r,{stem:`Gieo một con xúc xắc sáu mặt cân đối. Xác suất để số chấm xuất hiện trên con xúc xắc ${h} là`,correct:Q(L.length,6),cands:[Q(L.length,5),Q(1,6),Q(6-L.length,6),Q(L.length+1,6)],
    sol:`Có 6 kết quả có thể; các kết quả thuận lợi là ${L.join('; ')} (${L.length} kết quả). Xác suất là ${fr(L.length,6)} = ${qh(Q(L.length,6))}.`});
});
N7b('m7-8-coin',8,'TH',r=>{
  const n=r.int(2,3),outs=[...Array(2**n).keys()].map(i=>[...Array(n)].map((_,j)=>(i>>j)&1)),E=[['đúng một lần xuất hiện mặt sấp',o=>o.reduce((a,b)=>a+b,0)===1],['cả hai lần đều là mặt sấp',o=>o.every(x=>x)&&n===2],['có ít nhất một lần xuất hiện mặt sấp',o=>o.some(x=>x)],['đúng hai lần xuất hiện mặt sấp',o=>o.reduce((a,b)=>a+b,0)===2],['không có lần nào xuất hiện mặt sấp',o=>!o.some(x=>x)]].filter(z=>(n===3||z[0]!=='đúng hai lần xuất hiện mặt sấp')&&(n===2||z[0]!=='cả hai lần đều là mặt sấp'));
  const [h,f]=r.pick(E),c=outs.filter(f).length;
  return mkF(r,{stem:`Tung một đồng xu cân đối ${n} lần liên tiếp. Xác suất để ${h} là`,correct:Q(c,2**n),cands:[Q(c,2*n),Q(1,2),Q(c,2**n+1),Q(2**n-c,2**n)].filter(q=>!qeq(q,Q(c,2**n))),
    sol:`Có 2${sup(n)} = ${2**n} kết quả có thể, đồng khả năng; có ${c} kết quả thuận lợi. Xác suất là ${fr(c,2**n)}${qh(Q(c,2**n))!==fr(c,2**n)?' = '+qh(Q(c,2**n)):''}.`,chk:()=>c>0});
});
N7b('m7-8-exp',8,'TH',r=>{
  const n=r.pick([20,25,40,50,80,100,200]),k=r.int(3,Math.floor(n*.7)),w=r.pick([['mặt sấp','Tung một đồng xu'],['số chấm là 6','Gieo một con xúc xắc'],['mặt ngửa','Tung một đồng xu']]);
  return mkF(r,{stem:`${w[1]} ${n} lần liên tiếp, thấy ${w[0]} xuất hiện ${k} lần. Xác suất thực nghiệm của biến cố “xuất hiện ${w[0]}” là`,correct:Q(k,n),cands:[Q(n-k,n),Q(k,n-k),Q(n,k),Q(k,n+k)],
    sol:`Xác suất thực nghiệm = số lần biến cố xảy ra : tổng số lần thực hiện = ${k} : ${n} = ${qh(Q(k,n))}.`});
});
DS7b('ds7-8-box',8,'TH',r=>{
  let a=r.int(2,8),b=r.int(2,8);const c=r.int(1,Math.min(6,a+b-1)),N=a+b+c;
  return mkDS(r,{stem:`Một hộp có ${a} viên bi đỏ, ${b} viên bi xanh và ${c} viên bi vàng (cùng kích thước, khối lượng). Lấy ngẫu nhiên một viên bi. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Có ${N} kết quả có thể xảy ra`,f:`Có 3 kết quả có thể xảy ra`,why:`Mỗi viên bi là một kết quả: ${a} + ${b} + ${c} = ${N} kết quả.`},
    {t:`Xác suất lấy được bi đỏ là ${qh(Q(a,N))}`,f:`Xác suất lấy được bi đỏ là ${qh(Q(a,N-a))}`,why:`Có ${a} kết quả thuận lợi trên ${N} kết quả có thể: ${fr(a,N)} = ${qh(Q(a,N))}.`},
    {t:`Biến cố “Lấy được viên bi trắng” là biến cố không thể`,f:`Biến cố “Lấy được viên bi trắng” là biến cố chắc chắn`,why:`Trong hộp không có bi trắng nên biến cố này không bao giờ xảy ra.`},
    {t:`Xác suất lấy được viên bi không phải màu vàng là ${qh(Q(N-c,N))}`,f:`Xác suất lấy được viên bi không phải màu vàng là ${qh(Q(c,N))}`,why:`Có ${a} + ${b} = ${N-c} bi không phải màu vàng nên xác suất là ${fr(N-c,N)} = ${qh(Q(N-c,N))}.`}
  ],chk:()=>!qeq(Q(a,N),Q(a,N-a))&&!qeq(Q(N-c,N),Q(c,N))});
});
DS7b('ds7-8-exp',8,'VD',r=>{
  let fs,n,odd;do{fs=distinctInts(r,6,5,16);n=fs.reduce((a,b)=>a+b,0);odd=fs[0]+fs[2]+fs[4]}while(odd*2===n);
  const mx=fs.indexOf(Math.max(...fs))+1,k=r.int(1,6),wrongMax=r.pick([1,2,3,4,5,6].filter(z=>z!==mx));
  return mkDS(r,{stem:`Tung một con xúc xắc ${n} lần, bạn Hoa ghi lại số lần xuất hiện của mỗi mặt trong bảng sau:${tableHTML(['Mặt',1,2,3,4,5,6],[['Số lần',...fs]])}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Tổng các tần số bằng ${n}`,f:`Tổng các tần số bằng ${n+5}`,why:`${fs.join(' + ')} = ${n}.`},
    {t:`Xác suất thực nghiệm của biến cố “Xuất hiện mặt ${k}” là ${qh(Q(fs[k-1],n))}`,f:`Xác suất thực nghiệm của biến cố “Xuất hiện mặt ${k}” là ${qh(Q(fs[k-1]+1,n))}`,why:`${fs[k-1]} : ${n} = ${qh(Q(fs[k-1],n))}.`},
    {t:`Mặt xuất hiện nhiều lần nhất là mặt ${mx}`,f:`Mặt xuất hiện nhiều lần nhất là mặt ${wrongMax}`,why:`Mặt ${mx} có tần số lớn nhất (${Math.max(...fs)} lần).`},
    {t:`Xác suất thực nghiệm của biến cố “Số chấm là số lẻ” là ${qh(Q(odd,n))}`,f:`Xác suất thực nghiệm của biến cố “Số chấm là số lẻ” là ${qh(Q(n-odd,n))}`,why:`Số lần xuất hiện mặt 1, 3, 5 là ${fs[0]} + ${fs[2]} + ${fs[4]} = ${odd}; xác suất ${qh(Q(odd,n))}.`}
  ],chk:()=>odd*2!==n&&fs[k-1]+1!==fs[k-1]});
});
TLN7b('t7-8-count',8,'TH',r=>{
  const n=r.pick([30,40,50,60]),m=r.int(5,20),k=r.pick([3,4,5,6,7]),L=cardList(n,x=>x>m&&x%k===0);
  return{kind:'tln',stem:`Một hộp chứa ${n} tấm thẻ giống nhau, được đánh số 1, 2, …, ${n}. Rút ngẫu nhiên một thẻ. Có bao nhiêu kết quả thuận lợi cho biến cố “Số ghi trên thẻ lớn hơn ${m} và chia hết cho ${k}”?`,ans:L.length,unit:'',
    sol:`Các số thỏa mãn: ${L.join('; ')}. Có ${L.length} kết quả thuận lợi.`,chk:()=>L.length>0};
});
TLN7b('t7-8-prob',8,'TH',r=>{
  const N=r.pick([10,20,25,50,100]),a=r.int(1,Math.floor(N/2)),b=r.int(1,N-a-1);
  return{kind:'tln',stem:`Một hộp có ${N} quả bóng giống nhau, trong đó có ${a} quả màu đỏ, ${b} quả màu xanh, còn lại là màu trắng. Lấy ngẫu nhiên một quả bóng. Tính xác suất để lấy được quả bóng màu đỏ (viết kết quả dưới dạng số thập phân).`,ans:a/N,unit:'',
    sol:`Xác suất = ${a} : ${N} = ${fmt(a/N)}.`,chk:()=>Math.abs(a/N*100-Math.round(a/N*100))<1e-9};
});
TLN7b('t7-8-find',8,'VD',r=>{
  const a=r.int(2,8),m=r.int(3,6),x=(m-1)*a;
  return{kind:'tln',stem:`Một hộp có ${a} viên bi đỏ và một số viên bi xanh (cùng kích thước, khối lượng). Lấy ngẫu nhiên một viên bi, biết xác suất lấy được viên bi đỏ là ${fr(1,m)}. Hỏi trong hộp có bao nhiêu viên bi xanh?`,ans:x,unit:'',
    sol:`Gọi số bi xanh là x. Xác suất lấy bi đỏ: ${fr(a,`${a} + x`)} = ${fr(1,m)} nên ${a} + x = ${a*m}, suy ra x = ${x}.`,chk:()=>a/(a+x)===1/m};
});
TLN7b('t7-8-exp',8,'TH',r=>{
  const n=r.pick([100,200,400,500]),p=r.pick([.35,.4,.45,.52,.6]),k=Math.round(n*p);
  return{kind:'tln',stem:`Tung một đồng xu ${n} lần, xác suất thực nghiệm của biến cố “Xuất hiện mặt sấp” là ${fmt(p)}. Hỏi mặt sấp xuất hiện bao nhiêu lần?`,ans:k,unit:'',
    sol:`Số lần mặt sấp xuất hiện: ${n}·${fmt(p)} = ${k}.`,chk:()=>Math.abs(n*p-k)<1e-9};
});
TL7b('tl7-8-prob',8,'TH','real',r=>{
  const a=r.int(2,7),b=r.int(2,7),c=r.int(2,7),N=a+b+c,cols=r.shuffle([['đỏ',a],['xanh',b],['vàng',c]]),[c1,c2]=cols;
  return{kind:'tl',title:'Xác suất',parts:[
    {pts:.5,html:`Một hộp có ${a} quả cầu đỏ, ${b} quả cầu xanh và ${c} quả cầu vàng, các quả cầu có kích thước và khối lượng như nhau. Lấy ngẫu nhiên một quả cầu từ hộp. Có bao nhiêu kết quả có thể xảy ra? Các kết quả đó có đồng khả năng không?`},
    {pts:.5,html:`Tính xác suất của biến cố A: “Lấy được quả cầu màu ${c1[0]}” và biến cố B: “Lấy được quả cầu không phải màu ${c2[0]}”.`}],
    sol:[ptxt([[`Có ${a} + ${b} + ${c} = ${N} kết quả có thể.`,.25],[`Các quả cầu cùng kích thước, khối lượng nên các kết quả là đồng khả năng.`,.25]]),
      ptxt([[`P(A) = ${fr(c1[1],N)} = ${qh(Q(c1[1],N))}`,.25],[`Có ${N-c2[1]} quả không phải màu ${c2[0]}: P(B) = ${fr(N-c2[1],N)} = ${qh(Q(N-c2[1],N))}`,.25]])]};
});
TL7b('tl7-8-dice',8,'VD','real',r=>{
  const [h1,f1]=r.pick(DICE_EV.filter(z=>z[0]!=='lớn hơn 4')),[h2,f2]=[ 'lớn hơn 4',n=>n>4],L1=cardList(6,f1),L2=cardList(6,f2);
  return{kind:'tl',title:'Xác suất',parts:[
    {pts:.5,html:`Gieo một con xúc xắc sáu mặt cân đối. Liệt kê các kết quả có thể xảy ra và các kết quả thuận lợi cho biến cố A: “Số chấm xuất hiện ${h1}”.`},
    {pts:.5,html:`Tính xác suất của biến cố A và của biến cố B: “Số chấm xuất hiện ${h2}”. Biến cố nào có xác suất lớn hơn?`}],
    sol:[ptxt([[`Các kết quả có thể: 1; 2; 3; 4; 5; 6 (6 kết quả, đồng khả năng).`,.25],[`Kết quả thuận lợi cho A: ${L1.join('; ')} (${L1.length} kết quả).`,.25]]),
      ptxt([[`P(A) = ${fr(L1.length,6)} = ${qh(Q(L1.length,6))}; P(B) = ${fr(L2.length,6)} = ${qh(Q(L2.length,6))}`,.25],[`${L1.length===L2.length?'Hai biến cố có xác suất bằng nhau.':L1.length>L2.length?'Biến cố A có xác suất lớn hơn.':'Biến cố B có xác suất lớn hơn.'}`,.25]])],
    chk:()=>L1.length>0};
});
TL7b('tl7-8-exp',8,'VD','real',r=>{
  for(;;){const n=r.pick([50,80,100,125,200]),k=r.int(Math.ceil(n*.3),Math.floor(n*.7)),big=r.pick([500,1000]);if((k*big)%n)continue;const est=k*big/n;
    return{kind:'tl',title:'Xác suất thực nghiệm',parts:[
      {pts:.5,html:`Bạn Minh tung một đồng xu ${n} lần và thấy mặt sấp xuất hiện ${k} lần. Tính xác suất thực nghiệm của biến cố “Xuất hiện mặt sấp” và của biến cố “Xuất hiện mặt ngửa”.`},
      {pts:.5,html:`Nếu tung đồng xu đó ${big} lần thì dự đoán mặt sấp xuất hiện khoảng bao nhiêu lần (theo xác suất thực nghiệm vừa tính)?`}],
      sol:[ptxt([[`Xác suất thực nghiệm mặt sấp: ${k} : ${n} = ${qh(Q(k,n))}`,.25],[`Mặt ngửa xuất hiện ${n-k} lần: ${n-k} : ${n} = ${qh(Q(n-k,n))}`,.25]]),
        ptxt([[`Số lần mặt sấp dự đoán: ${big}·${qh(Q(k,n))}`,.25],[`= ${est} (lần)`,.25]])]};}
});

/* ---------- Chương IX: Quan hệ giữa các yếu tố trong một tam giác ---------- */
const sideOpp=(L,i)=>L[(i+1)%3]+L[(i+2)%3];            /* cạnh đối diện đỉnh L[i] */
N7b('m7-9-angside',9,'NB',r=>{
  const L=r.pick(TRI_NAMES).split(''),ang=triAngles(r),big=r.chance(.5);
  if(r.chance(.5)){
    const k=ang.indexOf(big?Math.max(...ang):Math.min(...ang)),ok=sideOpp(L,k);
    return mkTxt(r,{stem:`Tam giác ${I(L.join(''))} có ${ANG(L[0])} = ${ang[0]}°, ${ANG(L[1])} = ${ang[1]}°, ${ANG(L[2])} = ${ang[2]}°. Cạnh ${big?'lớn nhất':'nhỏ nhất'} của tam giác là`,correct:I(ok),wrongs:[0,1,2].filter(i=>i!==k).map(i=>I(sideOpp(L,i))).concat(['Ba cạnh bằng nhau']),
      sol:`Trong một tam giác, cạnh đối diện với góc ${big?'lớn':'nhỏ'} nhất là cạnh ${big?'lớn':'nhỏ'} nhất. Góc ${big?'lớn':'nhỏ'} nhất là ${ANG(L[k])} = ${ang[k]}° nên cạnh ${big?'lớn':'nhỏ'} nhất là ${ok}.`});
  }
  const ord=r.shuffle([0,1,2]),lens=[3,4,5].map((v,i)=>v),sl=[0,0,0];ord.forEach((v,i)=>sl[v]=lens[i]);  /* sl[i]: độ dài cạnh đối diện đỉnh i */
  const k=sl.indexOf(big?5:3);
  return mkTxt(r,{stem:`Tam giác ${I(L.join(''))} có ${sideOpp(L,0)} = ${sl[0]} cm, ${sideOpp(L,1)} = ${sl[1]} cm, ${sideOpp(L,2)} = ${sl[2]} cm. Góc ${big?'lớn nhất':'nhỏ nhất'} của tam giác là`,correct:ANG(L[k]),wrongs:[0,1,2].filter(i=>i!==k).map(i=>ANG(L[i])).concat(['Ba góc bằng nhau']),
    sol:`Góc đối diện với cạnh ${big?'lớn':'nhỏ'} nhất là góc ${big?'lớn':'nhỏ'} nhất. Cạnh ${big?'lớn':'nhỏ'} nhất là ${sideOpp(L,k)} = ${sl[k]} cm nên góc ${big?'lớn':'nhỏ'} nhất là ${ANG(L[k])}.`});
});
const triStr=t=>t.map(x=>x+' cm').join(', ');
N7b('m7-9-ineq',9,'NB',r=>{
  const a=r.int(3,9),b=r.int(a,10),lo=b-a+1,hi=a+b-1,c=r.int(lo,hi),ok=[a,b,c];
  const bads=[[a,b,a+b],[a,b,a+b+r.int(1,3)],[a,a+b+r.int(1,3),b],[a+1,b,a+b+1]].filter((t,i,arr)=>arr.findIndex(u=>triStr(u)===triStr(t))===i&&!(t[0]+t[1]>t[2]&&t[0]+t[2]>t[1]&&t[1]+t[2]>t[0]));
  return mkTxt(r,{stem:`Bộ ba độ dài nào sau đây là độ dài ba cạnh của một tam giác?`,correct:triStr(ok),wrongs:bads.map(triStr),
    sol:`Ba độ dài là ba cạnh của một tam giác khi tổng hai số bất kì lớn hơn số còn lại. Bộ ${triStr(ok)} thỏa mãn: ${a} + ${b} = ${a+b} > ${c}, ${a} + ${c} > ${b}, ${b} + ${c} > ${a}.`,chk:()=>bads.length>=3});
});
N7b('m7-9-third',9,'TH',r=>{
  let a=r.int(2,12),b=r.int(2,12);while(a===b)b=r.int(2,12);
  const lo=Math.abs(a-b),hi=a+b,[x,y]=[a,b],L=r.pick(TRI_NAMES),c=r.int(lo+1,hi-1);
  return mkNum(r,{stem:`Tam giác ${I(L)} có ${I(L[0]+L[1])} = ${x} cm, ${I(L[0]+L[2])} = ${y} cm. Độ dài cạnh ${I(L[1]+L[2])} (số nguyên, đơn vị cm) có thể là`,correct:c,f:v=>v+' cm',ok:v=>v>0&&(v<=lo||v>=hi),cands:[hi,lo,hi+1,lo-1,hi+2],
    sol:`Theo bất đẳng thức tam giác: |${x} − ${y}| < ${L[1]+L[2]} < ${x} + ${y}, tức là ${lo} < ${L[1]+L[2]} < ${hi}. Trong các số đã cho chỉ có ${c} thỏa mãn.`});
});
N7b('m7-9-isoperim',9,'TH',r=>{
  const s1=r.int(2,7),s2=r.int(2*s1+1,2*s1+9),L=r.pick(TRI_NAMES);
  return mkNum(r,{stem:`Tam giác ${I(L)} cân có độ dài hai cạnh là ${s1} cm và ${s2} cm. Chu vi của tam giác ${I(L)} là`,correct:s1+2*s2,f:v=>v+' cm',cands:[2*s1+s2,s1+s2,3*s2,3*s1],
    sol:`Nếu cạnh thứ ba bằng ${s1} cm thì ${s1} + ${s1} = ${2*s1} < ${s2}: không thỏa bất đẳng thức tam giác. Vậy cạnh thứ ba bằng ${s2} cm và chu vi là ${s1} + ${s2} + ${s2} = ${s1+2*s2} (cm).`,chk:()=>2*s1<s2});
});
const PERP_T=['Trong các đoạn thẳng kẻ từ một điểm nằm ngoài một đường thẳng đến đường thẳng đó, đoạn vuông góc là đoạn ngắn nhất','Trong hai đường xiên kẻ từ một điểm đến một đường thẳng, đường xiên nào có hình chiếu lớn hơn thì lớn hơn','Trong một tam giác, cạnh đối diện với góc lớn hơn thì lớn hơn','Trong tam giác vuông, cạnh huyền là cạnh lớn nhất','Trong một tam giác, tổng độ dài hai cạnh bất kì lớn hơn độ dài cạnh còn lại'];
const PERP_F=['Trong một tam giác, cạnh đối diện với góc nhỏ hơn thì lớn hơn','Trong tam giác vuông, một cạnh góc vuông là cạnh lớn nhất','Trong hai đường xiên kẻ từ một điểm đến một đường thẳng, đường xiên nào có hình chiếu lớn hơn thì nhỏ hơn','Trong một tam giác, độ dài một cạnh có thể lớn hơn tổng độ dài hai cạnh còn lại','Đoạn vuông góc kẻ từ một điểm đến một đường thẳng là đoạn dài nhất'];
N7b('m7-9-perp',9,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?PERP_T:PERP_F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?PERP_F:PERP_T).slice(0,3).map(x=>x+'.'),sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}.`});
});
const CONC_T=['Ba đường trung tuyến của một tam giác cùng đi qua một điểm, gọi là trọng tâm của tam giác','Giao điểm ba đường phân giác của một tam giác cách đều ba cạnh của tam giác','Giao điểm ba đường trung trực của một tam giác cách đều ba đỉnh của tam giác','Ba đường cao của một tam giác cùng đi qua một điểm, gọi là trực tâm của tam giác','Trọng tâm của tam giác cách mỗi đỉnh một khoảng bằng hai phần ba độ dài đường trung tuyến đi qua đỉnh đó'];
const CONC_F=['Giao điểm ba đường phân giác của một tam giác cách đều ba đỉnh của tam giác','Giao điểm ba đường trung trực của một tam giác cách đều ba cạnh của tam giác','Trọng tâm của tam giác cách mỗi đỉnh một khoảng bằng một phần ba độ dài đường trung tuyến đi qua đỉnh đó','Ba đường trung tuyến của một tam giác không đồng quy','Trực tâm của một tam giác luôn nằm bên trong tam giác'];
N7b('m7-9-concur',9,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?CONC_T:CONC_F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?CONC_F:CONC_T).slice(0,3).map(x=>x+'.'),sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}.`});
});
N7b('m7-9-centroid',9,'TH',r=>{
  const m=r.int(1,8),L=r.pick(TRI_NAMES),A=L[0],B=L[1],C=L[2],M=r.pick(['M','N','I','K'].filter(z=>!L.includes(z))),t=r.int(0,3);
  const S=[
    {g:`${I(A+M)} = ${3*m} cm`,q:`${I('AG'.replace('A',A))}`,a:2*m,s:`AG = ${fr(2,3)}·${A+M} = ${fr(2,3)}·${3*m} = ${2*m} (cm).`},
    {g:`${I(A+M)} = ${3*m} cm`,q:`${I('GM'.replace('M',M))}`,a:m,s:`GM = ${fr(1,3)}·${A+M} = ${fr(1,3)}·${3*m} = ${m} (cm).`},
    {g:`${I('G'+M)} = ${m} cm`,q:`${I(A+M)}`,a:3*m,s:`${A+M} = 3·G${M} = 3·${m} = ${3*m} (cm).`},
    {g:`${I(A+'G')} = ${2*m} cm`,q:`${I('G'+M)}`,a:m,s:`G${M} = ${A}G : 2 = ${2*m} : 2 = ${m} (cm).`}][t];
  return mkNum(r,{stem:`Cho tam giác ${I(L)} có ${I(A+M)} là đường trung tuyến (${I(M)} thuộc ${I(B+C)}), ${I('G')} là trọng tâm. Biết ${S.g}. Độ dài ${S.q} là`,correct:S.a,f:v=>v+' cm',cands:[S.a*2,S.a*3,S.a+m,Math.max(1,S.a-m)],
    sol:`Trọng tâm G chia mỗi đường trung tuyến thành hai đoạn: đoạn từ đỉnh bằng 2/3 trung tuyến, đoạn còn lại bằng 1/3 trung tuyến. ${S.s}`});
});
N7b('m7-9-equi',9,'TH',r=>{
  const d=r.int(2,9),L=r.pick(TRI_NAMES),k=r.int(0,2);
  if(k===0)return mkNum(r,{stem:`Gọi ${I('I')} là giao điểm ba đường phân giác của tam giác ${I(L)}. Biết khoảng cách từ ${I('I')} đến cạnh ${I(L[0]+L[1])} bằng ${d} cm. Khoảng cách từ ${I('I')} đến cạnh ${I(L[1]+L[2])} bằng`,correct:d,f:v=>v+' cm',cands:[2*d,d+1,d-1,d*3],ok:c=>c>0,
    sol:`Giao điểm ba đường phân giác cách đều ba cạnh của tam giác nên khoảng cách đến ${L[1]+L[2]} cũng bằng ${d} cm.`});
  if(k===1)return mkNum(r,{stem:`Gọi ${I('O')} là giao điểm ba đường trung trực của tam giác ${I(L)}. Biết ${I('O'+L[0])} = ${d} cm. Độ dài ${I('O'+L[2])} bằng`,correct:d,f:v=>v+' cm',cands:[2*d,d+1,d-1,d*3],ok:c=>c>0,
    sol:`Giao điểm ba đường trung trực cách đều ba đỉnh của tam giác nên O${L[2]} = O${L[0]} = ${d} cm.`});
  return mkNum(r,{stem:`Gọi ${I('O')} là giao điểm ba đường trung trực của tam giác ${I(L)}. Biết ${I('O'+L[0])} = ${d} cm. Tổng ${I('O'+L[1])} + ${I('O'+L[2])} bằng`,correct:2*d,f:v=>v+' cm',cands:[d,3*d,2*d+1,d+1],ok:c=>c>0,
    sol:`O cách đều ba đỉnh: O${L[1]} = O${L[2]} = O${L[0]} = ${d} cm, nên O${L[1]} + O${L[2]} = ${2*d} cm.`});
});
const DEF9_T=['Đường trung tuyến của tam giác là đoạn thẳng nối một đỉnh với trung điểm của cạnh đối diện','Đường cao của tam giác là đoạn vuông góc kẻ từ một đỉnh đến đường thẳng chứa cạnh đối diện','Đường trung trực của một đoạn thẳng là đường thẳng vuông góc với đoạn thẳng tại trung điểm của nó','Đường phân giác xuất phát từ một đỉnh của tam giác chia góc tại đỉnh đó thành hai góc bằng nhau'];
const DEF9_F=['Đường trung tuyến của tam giác là đoạn thẳng kẻ từ một đỉnh vuông góc với cạnh đối diện','Đường cao của tam giác là đoạn thẳng nối một đỉnh với trung điểm của cạnh đối diện','Đường trung trực của một đoạn thẳng là đường thẳng đi qua một đầu mút và vuông góc với đoạn thẳng','Mỗi tam giác chỉ có đúng một đường trung tuyến'];
N7b('m7-9-def',9,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?DEF9_T:DEF9_F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?DEF9_F:DEF9_T).slice(0,3).map(x=>x+'.'),sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}.`});
});
N7b('m7-9-order',9,'TH',r=>{
  const L=r.pick(TRI_NAMES).split(''),ang=triAngles(r),idx=[0,1,2].sort((p,q)=>ang[p]-ang[q]),asc=r.chance(.5);
  const ord=asc?idx:[...idx].reverse(),H=a=>a.map(i=>sideOpp(L,i)).join(' < ').replace(/ < /g,asc?' < ':' > ');
  const all=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]].map(p=>H(p)),cor=H(ord);
  return mkTxt(r,{stem:`Tam giác ${I(L.join(''))} có ${ANG(L[0])} = ${ang[0]}°, ${ANG(L[1])} = ${ang[1]}°. Sắp xếp độ dài ba cạnh theo thứ tự ${asc?'tăng dần':'giảm dần'} ta được`,correct:I(cor),wrongs:r.shuffle(all.filter(x=>x!==cor)).slice(0,3).map(I),
    sol:`${ANG(L[2])} = 180° − ${ang[0]}° − ${ang[1]}° = ${ang[2]}°. Cạnh đối diện góc lớn hơn thì lớn hơn nên: ${cor}.`});
});
DS7b('ds7-9-ang',9,'TH',r=>{
  const L=r.pick(TRI_NAMES).split(''),ang=triAngles(r),mx=ang.indexOf(Math.max(...ang)),mn=ang.indexOf(Math.min(...ang)),N=L.join('');
  return mkDS(r,{stem:`Cho tam giác ${I(N)} có ${ANG(L[0])} = ${ang[0]}°, ${ANG(L[1])} = ${ang[1]}° và ${ANG(L[2])} = ${ang[2]}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I(sideOpp(L,mx))} là cạnh lớn nhất của tam giác`,f:`${I(sideOpp(L,mn))} là cạnh lớn nhất của tam giác`,why:`Cạnh lớn nhất đối diện với góc lớn nhất (${ang[mx]}°), tức là ${sideOpp(L,mx)}.`},
    {t:`${I(sideOpp(L,mn))} < ${I(sideOpp(L,mx))}`,f:`${I(sideOpp(L,mn))} > ${I(sideOpp(L,mx))}`,why:`${sideOpp(L,mn)} đối diện góc ${ang[mn]}° nhỏ hơn góc ${ang[mx]}° đối diện ${sideOpp(L,mx)}.`},
    {t:`Tam giác ${I(N)} có ba cạnh đôi một khác nhau`,f:`Tam giác ${I(N)} là tam giác cân`,why:`Ba góc ${ang.join('°, ')}° đôi một khác nhau nên ba cạnh đôi một khác nhau, tam giác không cân.`},
    {t:`${ANG(L[mx])} là góc lớn nhất của tam giác`,f:`${ANG(L[mn])} là góc lớn nhất của tam giác`,why:`Góc lớn nhất là ${ang[mx]}°, tại đỉnh ${L[mx]}.`}
  ],chk:()=>ang.reduce((a,b)=>a+b,0)===180&&mx!==mn});
});
DS7b('ds7-9-ineq',9,'TH',r=>{
  const okT=()=>{const a=r.int(3,9),b=r.int(a,10);return[a,b,r.int(b-a+1,a+b-1)]},badT=()=>{const a=r.int(2,9),b=r.int(a,10);return r.shuffle([a,b,a+b+r.int(0,3)])};
  const mk=()=>{const t=okT(),f=badT();return{t:`Ba đoạn thẳng có độ dài ${triStr(t)} là ba cạnh của một tam giác`,f:`Ba đoạn thẳng có độ dài ${triStr(f)} là ba cạnh của một tam giác`,why:`Tam giác tồn tại khi tổng hai cạnh bất kì lớn hơn cạnh còn lại. Bộ ${triStr(t)} thỏa mãn; bộ ${triStr(f)} không thỏa vì ${Math.min(f[0]+f[1],f[0]+f[2],f[1]+f[2])} ≤ ${Math.max(...f)} .`.replace(/ \./,'.')}};
  let it;do{it=[mk(),mk(),mk(),mk()]}while(new Set(it.flatMap(i=>[i.t,i.f])).size<8);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:it,chk:()=>new Set(it.flatMap(i=>[i.t,i.f])).size===8});
});
DS7b('ds7-9-center',9,'TH',r=>{
  const m=r.int(2,8),L=r.pick(TRI_NAMES),A=L[0],M=r.pick(['M','N','I','K'].filter(z=>!L.includes(z)));
  return mkDS(r,{stem:`Cho tam giác ${I(L)}, hai đường trung tuyến cắt nhau tại ${I('G')}, ${I(A+M)} là đường trung tuyến đi qua ${I(A)} và ${I(A+M)} = ${3*m} cm. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I(A+'G')} = ${2*m} cm`,f:`${I(A+'G')} = ${m} cm`,why:`${A}G = ${fr(2,3)}·${A+M} = ${2*m} cm.`},
    {t:`${I('G'+M)} = ${m} cm`,f:`${I('G'+M)} = ${2*m} cm`,why:`G${M} = ${fr(1,3)}·${A+M} = ${m} cm.`},
    {t:`${I(A+'G')} = 2${I('G'+M)}`,f:`${I('G'+M)} = 2${I(A+'G')}`,why:`Trọng tâm chia trung tuyến theo tỉ lệ 2 : 1 tính từ đỉnh nên ${A}G = 2G${M}.`},
    {t:`${I('G')} là giao điểm của ba đường trung tuyến của tam giác`,f:`${I('G')} luôn cách đều ba đỉnh của tam giác`,why:`G là trọng tâm: giao điểm ba đường trung tuyến; G chỉ cách đều ba đỉnh khi tam giác đều, nên khẳng định “luôn cách đều” là sai.`}
  ],chk:()=>m>0});
});
TLN7b('t7-9-iso',9,'TH',r=>{
  const s1=r.int(2,8),s2=r.int(2*s1+1,2*s1+10);
  return{kind:'tln',stem:`Một tam giác cân có độ dài hai cạnh là ${s1} cm và ${s2} cm. Tính chu vi của tam giác đó (đơn vị: cm).`,ans:s1+2*s2,unit:'',
    sol:`Cạnh thứ ba không thể bằng ${s1} vì ${s1} + ${s1} < ${s2}. Do đó ba cạnh là ${s1}; ${s2}; ${s2} và chu vi là ${s1+2*s2} cm.`,chk:()=>2*s1<s2};
});
TLN7b('t7-9-int',9,'VD',r=>{
  let a=r.int(3,14),b=r.int(3,14);while(a===b)b=r.int(3,14);
  return{kind:'tln',stem:`Tam giác có hai cạnh dài ${a} cm và ${b} cm. Hỏi cạnh còn lại có bao nhiêu giá trị là số nguyên (đơn vị: cm)?`,ans:2*Math.min(a,b)-1,unit:'',
    sol:`Theo bất đẳng thức tam giác: ${Math.abs(a-b)} < c < ${a+b}. Các số nguyên c từ ${Math.abs(a-b)+1} đến ${a+b-1}, có ${a+b-1-Math.abs(a-b)} số.`,chk:()=>a+b-1-Math.abs(a-b)===2*Math.min(a,b)-1};
});
TLN7b('t7-9-centroid',9,'TH',r=>{
  const m=r.int(2,8),n=r.int(2,8);
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} có hai đường trung tuyến ${I('BN')} = ${3*m} cm và ${I('CP')} = ${3*n} cm cắt nhau tại ${I('G')}. Tính ${I('BG')} + ${I('CG')} (đơn vị: cm).`,ans:2*(m+n),unit:'',
    sol:`G là trọng tâm nên BG = ${fr(2,3)}·BN = ${2*m} cm; CG = ${fr(2,3)}·CP = ${2*n} cm. Do đó BG + CG = ${2*m+2*n} cm.`};
});
TLN7b('t7-9-ang',9,'VD',r=>{
  const R=r.pick([[1,2,3],[2,3,4],[3,4,5],[2,3,5],[1,2,6],[3,5,7]]),k=180/R.reduce((a,b)=>a+b,0),v=R.map(x=>x*k);
  return{kind:'tln',stem:`Ba góc của một tam giác tỉ lệ với ${R.join('; ')}. Tính số đo góc lớn nhất của tam giác đó (đơn vị: độ).`,ans:Math.max(...v),unit:'',
    sol:`Gọi ba góc là x, y, z: ${fr('x',R[0])} = ${fr('y',R[1])} = ${fr('z',R[2])} = ${fr('x + y + z',R.reduce((a,b)=>a+b,0))} = ${fr(180,R.reduce((a,b)=>a+b,0))} = ${k}. Góc lớn nhất là ${Math.max(...R)}·${k} = ${Math.max(...v)}°.`,chk:()=>Number.isInteger(k)};
});
TL7b('tl7-9-ineq',9,'TH','geo',r=>{
  const s1=r.int(2,7),s2=r.int(2*s1+1,2*s1+9),[A,B,C]=r.pick(['ABC','DEF','MNP']).split('');
  return{kind:'tl',title:'Quan hệ giữa ba cạnh của tam giác',note:GEO_NOTE,parts:[
    {pts:.5,html:`Tam giác ${I(A+B+C)} cân có ${I(A+B)} = ${s1} cm và ${I(B+C)} = ${s2} cm. Giải thích vì sao cạnh ${I(A+C)} không thể bằng ${s1} cm.`},
    {pts:.5,html:`Tính độ dài cạnh ${I(A+C)} và chu vi tam giác ${I(A+B+C)}.`}],
    sol:[ptxt([[`Nếu ${A}${C} = ${s1} cm thì ba cạnh là ${s1}; ${s1}; ${s2}`,.25],[`Khi đó ${s1} + ${s1} = ${2*s1} < ${s2}, vi phạm bất đẳng thức tam giác nên không tồn tại tam giác`,.25]]),
      ptxt([[`Tam giác cân nên ${A}${C} = ${s2} cm (vì ${A}${C} khác ${s1} cm)`,.25],[`Chu vi = ${s1} + ${s2} + ${s2} = ${s1+2*s2} (cm)`,.25]])],
    chk:()=>2*s1<s2};
});
TL7b('tl7-9-right',9,'TH','geo',r=>{
  const [A,B,C]=r.pick(['ABC','MNP','DEF']).split(''),H=r.pick(['H','K','I']);
  return{kind:'tl',title:'Quan hệ giữa góc và cạnh đối diện',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I(A+B+C)} vuông tại ${I(A)}. Chứng minh ${I(B+C)} > ${I(A+B)} và ${I(B+C)} > ${I(A+C)}.`},
    {pts:.5,html:`Kẻ ${I(A+H)} vuông góc với ${I(B+C)} (${I(H)} thuộc ${I(B+C)}). So sánh ${I(A+H)} và ${I(A+B)}; ${I(A+H)} và ${I(A+C)}.`}],
    sol:[ptxt([[`Tam giác ${A}${B}${C} có ${ANG(A)} = 90° nên ${ANG(B)} và ${ANG(C)} là các góc nhọn, ${ANG(A)} là góc lớn nhất`,.25],[`Cạnh đối diện góc lớn nhất là lớn nhất: ${B}${C} > ${A}${B}, ${B}${C} > ${A}${C}`,.25]]),
      ptxt([[`${A}${H} ⊥ ${B}${C} nên ${A}${H} là đường vuông góc, ${A}${B}, ${A}${C} là các đường xiên kẻ từ ${A} đến ${B}${C}`,.25],[`Đường vuông góc ngắn hơn đường xiên: ${A}${H} < ${A}${B} và ${A}${H} < ${A}${C}`,.25]])]};
});
TL7b('tl7-9-perp',9,'VD','geo',r=>{
  const [A,B,C]=r.pick(['ABC','DEF','MNP']).split(''),H=r.pick(['H','K','I']),hb=r.int(2,6),hc=r.int(hb+1,hb+6);
  return{kind:'tl',title:'Đường vuông góc và đường xiên',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I(A+B+C)} nhọn, kẻ ${I(A+H)} vuông góc với ${I(B+C)} tại ${I(H)} (${I(H)} nằm giữa ${I(B)} và ${I(C)}). Biết ${I(H+B)} = ${hb} cm, ${I(H+C)} = ${hc} cm. So sánh ${I(A+B)} và ${I(A+C)}.`},
    {pts:.5,html:`So sánh hai góc ${ANG(B)} và ${ANG(C)} của tam giác ${I(A+B+C)}.`}],
    sol:[ptxt([[`${A}${B}, ${A}${C} là hai đường xiên kẻ từ ${A} đến ${B}${C}, có hình chiếu lần lượt là ${H}${B} = ${hb} cm và ${H}${C} = ${hc} cm`,.25],[`Vì ${hb} < ${hc} nên ${A}${B} < ${A}${C} (đường xiên có hình chiếu lớn hơn thì lớn hơn)`,.25]]),
      ptxt([[`Trong tam giác ${A}${B}${C}: ${A}${B} < ${A}${C}`,.25],[`Góc đối diện cạnh nhỏ hơn thì nhỏ hơn: ${ANG(C)} < ${ANG(B)}`,.25]])]};
});
TL7b('tl7-9-median',9,'VD','geo',r=>{
  const m=r.int(2,8),n=r.int(2,8),[A,B,C]=r.pick(['ABC','DEF','MNP']).split(''),[M,N]=r.pick([['M','N'],['P','Q'],['I','K']].filter(z=>!z.some(c=>[A,B,C].includes(c))));
  return{kind:'tl',title:'Đường trung tuyến của tam giác',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I(A+B+C)} có hai đường trung tuyến ${I(B+M)} và ${I(C+N)} cắt nhau tại ${I('G')}. Chứng minh đường thẳng ${I(A+'G')} đi qua trung điểm của ${I(B+C)}.`},
    {pts:.5,html:`Biết ${I(B+M)} = ${3*m} cm và ${I(C+N)} = ${3*n} cm. Tính ${I(B+'G')}, ${I(C+'G')}.`}],
    sol:[ptxt([[`${B}${M}, ${C}${N} là hai đường trung tuyến cắt nhau tại G nên G là trọng tâm tam giác ${A}${B}${C}`,.25],[`Ba đường trung tuyến đồng quy tại G nên trung tuyến thứ ba (kẻ từ ${A}) đi qua G, tức là ${A}G đi qua trung điểm của ${B}${C}`,.25]]),
      ptxt([[`${B}G = ${fr(2,3)}·${B}${M} = ${fr(2,3)}·${3*m} = ${2*m} (cm)`,.25],[`${C}G = ${fr(2,3)}·${C}${N} = ${fr(2,3)}·${3*n} = ${2*n} (cm)`,.25]])]};
});
TL7b('tl7-9-bis',9,'VDC','geo',r=>{
  const [A,B,C]=r.pick(['ABC','DEF','MNP']).split(''),D=r.pick(['D','K','H'].filter(z=>![A,B,C].includes(z))),E=r.pick(['E','I','Q'].filter(z=>![A,B,C,D].includes(z)));
  return{kind:'tl',title:'Quan hệ giữa góc và cạnh đối diện',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I(A+B+C)} có ${ANG(B)} > ${ANG(C)}. Gọi ${I(A+D)} là tia phân giác của ${ANG(B+A+C)} (${I(D)} thuộc ${I(B+C)}). So sánh ${I(A+B)} và ${I(A+C)}.`},
    {pts:.5,html:`Chứng minh ${I(D+B)} < ${I(D+C)}.`}],
    sol:[ptxt([[`Trong tam giác ${A}${B}${C}: ${ANG(B)} > ${ANG(C)}`,.25],[`Cạnh đối diện góc lớn hơn thì lớn hơn: ${A}${C} > ${A}${B}`,.25]]),
      ptxt([[`Lấy ${E} trên ${A}${C} sao cho ${A}${E} = ${A}${B}. Δ${A}${B}${D} = Δ${A}${E}${D} (c.g.c) nên ${D}${B} = ${D}${E} và ${ANG(A+E+D)} = ${ANG(B)}`,.25],[`${ANG(D+E+C)} = 180° − ${ANG(A+E+D)} = 180° − ${ANG(B)} > ${ANG(C)} (vì ${ANG(B)} + ${ANG(C)} < 180°). Trong Δ${D}${E}${C}: ${D}${C} > ${D}${E}. Vậy ${D}${B} = ${D}${E} < ${D}${C}.`,.25]])]};
});
TL7b('tl7-9-med',9,'VDC','geo',r=>{
  const [A,B,C]=r.pick(['ABC','DEF','MNP']).split(''),M=r.pick(['M','I','K'].filter(z=>![A,B,C].includes(z))),D=r.pick(['D','H','Q'].filter(z=>![A,B,C,M].includes(z)));
  return{kind:'tl',title:'Bất đẳng thức tam giác',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I(A+B+C)}, ${I(M)} là trung điểm của ${I(B+C)}. Trên tia đối của tia ${I(M+A)} lấy điểm ${I(D)} sao cho ${I(M+D)} = ${I(M+A)}. Chứng minh Δ${I(A+M+B)} = Δ${I(D+M+C)}.`},
    {pts:.5,html:`Chứng minh ${I(A+M)} < ${fr(`${A}${B} + ${A}${C}`,2)}.`}],
    sol:[ptxt([[`Xét Δ${A}${M}${B} và Δ${D}${M}${C}: ${M}${A} = ${M}${D}, ${M}${B} = ${M}${C}, ${ANG(A+M+B)} = ${ANG(D+M+C)} (đối đỉnh)`,.25],[`Do đó Δ${A}${M}${B} = Δ${D}${M}${C} (c.g.c)`,.25]]),
      ptxt([[`Suy ra ${C}${D} = ${A}${B}. Trong Δ${A}${C}${D}: ${A}${D} < ${A}${C} + ${C}${D} = ${A}${C} + ${A}${B}`,.25],[`Mà ${A}${D} = 2${A}${M} nên 2${A}${M} < ${A}${B} + ${A}${C}, tức là ${A}${M} < (${A}${B} + ${A}${C}) : 2.`,.25]])]};
});

/* ---------- Chương X: Một số hình khối trong thực tiễn ---------- */
const BXL=(x,y,t,o='')=>`<text x="${x}" y="${y}" font-size="11" font-style="italic" ${o}>${t}</text>`;
function boxSVG(a,b,c){          /* hình hộp chữ nhật ABCD.A'B'C'D' */
  const P={A:[30,125],B:[150,125],C:[190,95],D:[70,95],A1:[30,60],B1:[150,60],C1:[190,30],D1:[70,30]},L=(p,q,d)=>`<line x1="${P[p][0]}" y1="${P[p][1]}" x2="${P[q][0]}" y2="${P[q][1]}" stroke="#000" stroke-width="1.2"${d?' stroke-dasharray="4 3"':''}/>`;
  let s=`<svg class="chart" viewBox="0 0 250 150" width="250" height="150" role="img" aria-label="Hình hộp chữ nhật">`;
  [['A','B'],['B','C'],['A','A1'],['B','B1'],['C','C1'],['A1','B1'],['B1','C1'],['C1','D1'],['D1','A1']].forEach(z=>s+=L(z[0],z[1]));
  [['A','D'],['D','C'],['D','D1']].forEach(z=>s+=L(z[0],z[1],1));
  s+=BXL(18,132,'A')+BXL(152,138,'B')+BXL(194,98,'C')+BXL(60,96,'D')+BXL(14,58,"A'")+BXL(148,54,"B'")+BXL(194,30,"C'")+BXL(62,28,"D'");
  s+=BXL(80,140,`${a} cm`)+BXL(168,118,`${b} cm`,'font-style="normal"')+BXL(2,98,`${c} cm`);
  return `<div class="figure">${s}</svg></div>`;
}
function prismSVG(a,h){          /* lăng trụ đứng tam giác ABC.A'B'C' */
  const P={A:[30,125],B:[150,125],C:[105,100],A1:[30,55],B1:[150,55],C1:[105,30]},L=(p,q,d)=>`<line x1="${P[p][0]}" y1="${P[p][1]}" x2="${P[q][0]}" y2="${P[q][1]}" stroke="#000" stroke-width="1.2"${d?' stroke-dasharray="4 3"':''}/>`;
  let s=`<svg class="chart" viewBox="0 0 250 150" width="250" height="150" role="img" aria-label="Hình lăng trụ đứng tam giác">`;
  [['A','B'],['B','C'],['A','A1'],['B','B1'],['C','C1'],['A1','B1'],['B1','C1'],['C1','A1']].forEach(z=>s+=L(z[0],z[1]));
  s+=L('A','C',1)+BXL(18,132,'A')+BXL(152,138,'B')+BXL(108,112,'C')+BXL(14,52,"A'")+BXL(152,52,"B'")+BXL(108,26,"C'")+BXL(80,140,`${a} cm`)+BXL(2,92,`${h} cm`);
  return `<div class="figure">${s}</svg></div>`;
}
const SOLID=[['hình hộp chữ nhật',6,8,12,4],['hình lập phương',6,8,12,4],['hình lăng trụ đứng tam giác',5,6,9,3],['hình lăng trụ đứng tứ giác',6,8,12,4]];
N7b('m7-10-count',10,'NB',r=>{
  const z=r.pick(SOLID),k=r.int(0,3),nm=['mặt','đỉnh','cạnh','mặt bên'];
  const val=[z[1],z[2],z[3],z[4]][k];
  return mkNum(r,{stem:`Số ${nm[k]} của ${z[0]} là`,correct:val,ok:c=>c>0,cands:[z[1]+1,z[2]+1,z[3]-1,z[4]+1,z[3]],
    sol:`${z[0][0].toUpperCase()+z[0].slice(1)} có ${z[1]} mặt, ${z[2]} đỉnh, ${z[3]} cạnh, ${z[4]} mặt bên. Vậy số ${nm[k]} là ${val}.`});
});
N7b('m7-10-volbox',10,'NB',r=>{
  const a=r.int(2,12),b=r.int(2,12),c=r.int(2,12);
  return mkNum(r,{stem:`Hình hộp chữ nhật có ba kích thước ${a} cm, ${b} cm, ${c} cm.${r.chance(.5)?boxSVG(a,b,c):' '}Thể tích của hình hộp chữ nhật đó là`,correct:a*b*c,f:v=>v+' cm³',cands:[a+b+c,2*(a*b+b*c+c*a),a*b*c+a*b,a*b],
    sol:`V = ${a}·${b}·${c} = ${a*b*c} (cm³).`});
});
N7b('m7-10-volcube',10,'NB',r=>{
  const a=r.int(2,9),t=r.chance(.5);
  return mkNum(r,{stem:`Hình lập phương có độ dài cạnh ${a} cm. ${t?'Thể tích':'Diện tích toàn phần'} của hình lập phương đó là`,correct:t?a**3:6*a*a,f:v=>v+(t?' cm³':' cm²'),cands:t?[3*a,a*a,6*a*a,4*a*a*a]:[a**3,4*a*a,12*a,3*a*a],
    sol:t?`V = a³ = ${a}³ = ${a**3} (cm³).`:`S_tp = 6a² = 6·${a}² = ${6*a*a} (cm²).`});
});
N7b('m7-10-sxqbox',10,'TH',r=>{
  const a=r.int(3,12),b=r.int(2,10),c=r.int(2,10);
  return mkNum(r,{stem:`Hình hộp chữ nhật có đáy là hình chữ nhật với hai kích thước ${a} cm, ${b} cm và chiều cao ${c} cm. Diện tích xung quanh của hình hộp là`,correct:2*(a+b)*c,f:v=>v+' cm²',cands:[2*(a*b+b*c+c*a),(a+b)*c,a*b*c,2*(a+b)],
    sol:`S_xq = (chu vi đáy) · (chiều cao) = 2·(${a} + ${b})·${c} = ${2*(a+b)*c} (cm²).`});
});
N7b('m7-10-stpbox',10,'TH',r=>{
  const a=r.int(3,12),b=r.int(2,10),c=r.int(2,10),S=2*(a*b+b*c+c*a);
  return mkNum(r,{stem:`Diện tích toàn phần của hình hộp chữ nhật có ba kích thước ${a} cm, ${b} cm, ${c} cm là`,correct:S,f:v=>v+' cm²',cands:[a*b*c,2*(a+b)*c,S-a*b,S/2],
    sol:`S_tp = S_xq + 2·S_đáy = 2·(${a} + ${b})·${c} + 2·${a}·${b} = ${S} (cm²).`});
});
N7b('m7-10-prismvol',10,'TH',r=>{
  const [p,q]=r.pick([[3,4],[6,8],[5,12],[4,6],[6,10],[8,10],[5,8],[10,12]]),h=r.int(3,12);
  return mkNum(r,{stem:`Hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông ${p} cm và ${q} cm, chiều cao lăng trụ là ${h} cm. Thể tích của lăng trụ là`,correct:p*q*h/2,f:v=>v+' cm³',cands:[p*q*h,(p+q)*h,p*q/2,p*q*h/3].filter(isInt),
    sol:`Diện tích đáy = ${p}·${q} : 2 = ${p*q/2} (cm²); V = S_đáy · h = ${p*q/2}·${h} = ${p*q*h/2} (cm³).`,chk:()=>(p*q)%2===0});
});
N7b('m7-10-prismsxq',10,'TH',r=>{
  const a=r.int(3,9),b=r.int(3,9),c=r.int(Math.abs(a-b)+1,a+b-1),h=r.int(3,12);
  return mkNum(r,{stem:`Hình lăng trụ đứng tam giác có đáy là tam giác với ba cạnh ${a} cm, ${b} cm, ${c} cm và chiều cao ${h} cm. Diện tích xung quanh của lăng trụ là`,correct:(a+b+c)*h,f:v=>v+' cm²',cands:[(a+b+c),(a+b)*h,(a+b+c)*h/2,a*b*h],
    sol:`S_xq = (chu vi đáy) · (chiều cao) = (${a} + ${b} + ${c})·${h} = ${(a+b+c)*h} (cm²).`});
});
N7b('m7-10-cubefind',10,'VD',r=>{
  const a=r.int(2,9),V=a**3;
  return mkNum(r,{stem:`Một hình lập phương có thể tích bằng ${V} cm³. Diện tích toàn phần của hình lập phương đó là`,correct:6*a*a,f:v=>v+' cm²',cands:[4*a*a,a*a,V*6,3*a*a],
    sol:`V = a³ = ${V} nên a = ${a} cm. S_tp = 6a² = 6·${a}² = ${6*a*a} (cm²).`});
});
N7b('m7-10-boxfind',10,'TH',r=>{
  const a=r.int(3,10),b=r.int(2,9),h=r.int(2,12);
  return mkNum(r,{stem:`Một hình hộp chữ nhật có đáy là hình chữ nhật kích thước ${a} cm × ${b} cm và thể tích ${a*b*h} cm³. Chiều cao của hình hộp là`,correct:h,f:v=>v+' cm',cands:[a*b,a+b,h+1,h*2],ok:c=>c>0,
    sol:`V = S_đáy · h nên h = ${a*b*h} : (${a}·${b}) = ${a*b*h} : ${a*b} = ${h} (cm).`});
});
N7b('m7-10-unit',10,'TH',r=>{
  const a=r.pick([2,2.5,3,4]),b=r.pick([1,1.5,2]),h=r.pick([1,1.2,1.5]),V=Math.round(a*b*h*1000);
  return mkNum(r,{stem:`Một bể nước hình hộp chữ nhật có chiều dài ${fmt(a)} m, chiều rộng ${fmt(b)} m, chiều cao ${fmt(h)} m. Bể chứa được nhiều nhất bao nhiêu lít nước? (1 m³ = 1000 lít)`,correct:V,f:v=>v+' lít',cands:[V/1000,V*10,Math.round(a*b*h),V+1000],
    sol:`V = ${fmt(a)}·${fmt(b)}·${fmt(h)} = ${fmt(a*b*h)} (m³) = ${V} lít.`,chk:()=>Math.abs(a*b*h*1000-V)<1e-6});
});
const SOL10_T=['Hình hộp chữ nhật có 6 mặt, 8 đỉnh, 12 cạnh','Hình lập phương có 6 mặt là các hình vuông bằng nhau','Hình lăng trụ đứng tam giác có hai mặt đáy là hai tam giác bằng nhau và các mặt bên là các hình chữ nhật','Hình lăng trụ đứng tứ giác có 6 mặt','Thể tích hình hộp chữ nhật bằng tích ba kích thước của nó','Thể tích hình lăng trụ đứng bằng diện tích đáy nhân với chiều cao'];
const SOL10_F=['Hình lập phương có 8 mặt','Hình lăng trụ đứng tam giác có 6 mặt','Diện tích xung quanh của hình lăng trụ đứng bằng diện tích đáy nhân với chiều cao','Thể tích hình lăng trụ đứng bằng chu vi đáy nhân với chiều cao','Hình hộp chữ nhật có 10 cạnh'];
N7b('m7-10-def',10,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?SOL10_T:SOL10_F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?SOL10_F:SOL10_T).slice(0,3).map(x=>x+'.'),sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}.`});
});
DS7b('ds7-10-box',10,'TH',r=>{
  const a=r.int(3,10),b=r.int(2,9),c=r.int(2,9),V=a*b*c,Sx=2*(a+b)*c,St=2*(a*b+b*c+c*a);
  return mkDS(r,{stem:`Cho hình hộp chữ nhật ${I("ABCD.A′B′C′D′")} có ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm, ${I('AA′')} = ${c} cm.${boxSVG(a,b,c)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Thể tích hình hộp bằng ${V} cm³`,f:`Thể tích hình hộp bằng ${V+a*b} cm³`,why:`V = ${a}·${b}·${c} = ${V} (cm³).`},
    {t:`Diện tích xung quanh bằng ${Sx} cm²`,f:`Diện tích xung quanh bằng ${St} cm²`,why:`S_xq = 2·(${a} + ${b})·${c} = ${Sx} (cm²).`},
    {t:`Diện tích toàn phần bằng ${St} cm²`,f:`Diện tích toàn phần bằng ${St+c} cm²`,why:`S_tp = S_xq + 2·${a}·${b} = ${Sx} + ${2*a*b} = ${St} (cm²).`},
    {t:`Hình hộp có 12 cạnh và 8 đỉnh`,f:`Hình hộp có 10 cạnh và 8 đỉnh`,why:`Hình hộp chữ nhật có 6 mặt, 12 cạnh, 8 đỉnh.`}
  ],chk:()=>Sx!==St&&V!==V+a*b});
});
const TRI10=[[3,4,5],[6,8,10],[5,12,13],[9,12,15]];
DS7b('ds7-10-prism',10,'TH',r=>{
  const [p,q,s]=r.pick(TRI10),h=r.int(3,12),S0=p*q/2;
  return mkDS(r,{stem:`Cho hình lăng trụ đứng có đáy là tam giác vuông với các cạnh ${p} cm, ${q} cm, ${s} cm và chiều cao ${h} cm.${prismSVG(p,h)}Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Diện tích đáy bằng ${S0} cm²`,f:`Diện tích đáy bằng ${p*q} cm²`,why:`S_đáy = ${p}·${q} : 2 = ${S0} (cm²).`},
    {t:`Thể tích của lăng trụ bằng ${S0*h} cm³`,f:`Thể tích của lăng trụ bằng ${p*q*h} cm³`,why:`V = S_đáy·h = ${S0}·${h} = ${S0*h} (cm³).`},
    {t:`Diện tích xung quanh bằng ${(p+q+s)*h} cm²`,f:`Diện tích xung quanh bằng ${(p+q)*h} cm²`,why:`S_xq = (${p} + ${q} + ${s})·${h} = ${(p+q+s)*h} (cm²).`},
    {t:`Hình lăng trụ có 5 mặt và 9 cạnh`,f:`Hình lăng trụ có 6 mặt và 9 cạnh`,why:`Lăng trụ đứng tam giác có 2 mặt đáy và 3 mặt bên (5 mặt), 6 đỉnh, 9 cạnh.`}
  ],chk:()=>p*q%2===0&&p*p+q*q===s*s});
});
TLN7b('t7-10-cube',10,'VD',r=>{
  const a=r.int(2,9);
  return{kind:'tln',stem:`Một hình lập phương có diện tích toàn phần bằng ${6*a*a} cm². Tính thể tích của hình lập phương đó (đơn vị: cm³).`,ans:a**3,unit:'',
    sol:`6a² = ${6*a*a} nên a² = ${a*a}, a = ${a} cm. Thể tích V = a³ = ${a**3} (cm³).`};
});
TLN7b('t7-10-liter',10,'VD',r=>{
  const [a,b]=r.pick([[50,40],[100,50],[80,50],[60,50],[100,60]]),h=r.int(10,40),V=a*b*h/1000;
  return{kind:'tln',stem:`Một bể hình hộp chữ nhật có đáy là hình chữ nhật dài ${a} cm, rộng ${b} cm. Đổ vào bể ${V} lít nước thì mực nước trong bể cao bao nhiêu xăng-ti-mét? (1 lít = 1000 cm³)`,ans:h,unit:'',
    sol:`${V} lít = ${V*1000} cm³. Chiều cao mực nước: ${V*1000} : (${a}·${b}) = ${h} (cm).`,chk:()=>Number.isInteger(V)};
});
TLN7b('t7-10-paint',10,'VD',r=>{
  const a=r.int(4,7),b=r.int(3,6),c=r.int(3,4),d=r.int(3,8),S=2*(a+b)*c+a*b-d;
  return{kind:'tln',stem:`Một căn phòng hình hộp chữ nhật có chiều dài ${a} m, chiều rộng ${b} m, chiều cao ${c} m. Người ta quét vôi bốn bức tường và trần nhà, biết diện tích các cửa là ${d} m² (không quét vôi). Tính diện tích cần quét vôi (đơn vị: m²).`,ans:S,unit:'',
    sol:`Diện tích bốn bức tường: 2·(${a} + ${b})·${c} = ${2*(a+b)*c} (m²); trần nhà: ${a}·${b} = ${a*b} (m²). Diện tích cần quét: ${2*(a+b)*c} + ${a*b} − ${d} = ${S} (m²).`};
});
TLN7b('t7-10-prism',10,'TH',r=>{
  const [p,q,s]=r.pick(TRI10),h=r.int(4,15);
  return{kind:'tln',stem:`Một lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông ${p} cm và ${q} cm, chiều cao ${h} cm. Tính thể tích lăng trụ đó (đơn vị: cm³).`,ans:p*q*h/2,unit:'',
    sol:`V = ${p}·${q} : 2 · ${h} = ${p*q*h/2} (cm³).`};
});
TL7b('tl7-10-box',10,'TH','real',r=>{
  const a=r.pick([40,50,60,80]),b=r.pick([30,40,50]),c=r.pick([30,40,50]),V=a*b*c/1000;
  return{kind:'tl',title:'Hình hộp chữ nhật',parts:[
    {pts:.5,html:`Một bể cá hình hộp chữ nhật không có nắp, có chiều dài ${a} cm, chiều rộng ${b} cm, chiều cao ${c} cm. Tính thể tích của bể cá (theo cm³ và theo lít, biết 1 lít = 1000 cm³).`},
    {pts:.5,html:`Tính diện tích kính cần dùng để làm bể cá đó (bể có 4 mặt bên và mặt đáy).`}],
    sol:[ptxt([[`V = ${a}·${b}·${c} = ${a*b*c} (cm³)`,.25],[`${a*b*c} cm³ = ${V} lít`,.25]]),
      ptxt([[`Diện tích xung quanh: 2·(${a} + ${b})·${c} = ${2*(a+b)*c} (cm²)`,.25],[`Diện tích kính: ${2*(a+b)*c} + ${a}·${b} = ${2*(a+b)*c+a*b} (cm²)`,.25]])]};
});
TL7b('tl7-10-prism',10,'VD','real',r=>{
  const [p,q,s]=r.pick(TRI10),h=r.int(4,12);
  return{kind:'tl',title:'Hình lăng trụ đứng',parts:[
    {pts:.5,html:`Một chiếc lều có dạng hình lăng trụ đứng với đáy là tam giác vuông có các cạnh ${p} dm, ${q} dm, ${s} dm (cạnh huyền ${s} dm) và chiều cao lăng trụ (chiều dài lều) là ${h} dm.${prismSVG(p,h)}Tính thể tích không khí chứa trong lều.`},
    {pts:.5,html:`Tính diện tích vải cần dùng để làm lều (gồm ba mặt bên và hai mặt đáy).`}],
    sol:[ptxt([[`Diện tích đáy: ${p}·${q} : 2 = ${p*q/2} (dm²)`,.25],[`V = ${p*q/2}·${h} = ${p*q*h/2} (dm³)`,.25]]),
      ptxt([[`S_xq = (${p} + ${q} + ${s})·${h} = ${(p+q+s)*h} (dm²)`,.25],[`S_tp = ${(p+q+s)*h} + 2·${p*q/2} = ${(p+q+s)*h+p*q} (dm²)`,.25]])],
    chk:()=>p*p+q*q===s*s};
});
TL7b('tl7-10-cube',10,'VD','real',r=>{
  const a=r.pick([10,15,20]),k=[r.int(2,4),r.int(2,4),r.int(2,3)],n=k[0]*k[1]*k[2];
  return{kind:'tl',title:'Hình lập phương',parts:[
    {pts:.5,html:`Một hộp quà có dạng hình lập phương cạnh ${a} cm. Tính diện tích giấy gói cần dùng (không tính phần mép dán) và thể tích hộp quà.`},
    {pts:.5,html:`Người ta xếp các hộp quà đó vào một thùng hình hộp chữ nhật có kích thước ${k[0]*a} cm × ${k[1]*a} cm × ${k[2]*a} cm. Hỏi có thể xếp được nhiều nhất bao nhiêu hộp quà?`}],
    sol:[ptxt([[`Diện tích giấy gói: 6·${a}² = ${6*a*a} (cm²)`,.25],[`Thể tích: ${a}³ = ${a**3} (cm³)`,.25]]),
      ptxt([[`Theo ba kích thước, xếp được ${k[0]}, ${k[1]}, ${k[2]} hộp`,.25],[`Số hộp tối đa: ${k[0]}·${k[1]}·${k[2]} = ${n} (hộp)`,.25]])]};
});

/* ---------- Đúng/sai mức nhận biết: phát biểu lí thuyết ---------- */
function dsStmt(r,Tp,Fp,stem){
  const t=r.shuffle(Tp).slice(0,4),f=r.shuffle(Fp);
  const F=[...f];while(F.length<4)F.push(...r.shuffle(Fp));
  return mkDS(r,{stem:stem||'Xét tính đúng sai của các khẳng định sau:',items:t.map((x,i)=>({t:x+'.',f:F[i]+'.',why:`Khẳng định đúng là: “${x}”.`})),chk:()=>t.length===4&&new Set(t.concat(F.slice(0,4))).size===8});
}
DS7b('ds7-6-kind',6,'NB',r=>dsStmt(r,[...THEO6_T,...KIND_THUAN.map(x=>x+' là hai đại lượng tỉ lệ thuận'),...KIND_NGHICH.map(x=>x+' là hai đại lượng tỉ lệ nghịch')],[...THEO6_F,...KIND_NGHICH.map(x=>x+' là hai đại lượng tỉ lệ thuận'),...KIND_THUAN.map(x=>x+' là hai đại lượng tỉ lệ nghịch')]));
DS7b('ds7-7-def',7,'NB',r=>{
  const T=r.shuffle(POLY_T).slice(0,4),F=r.shuffle(POLY_F).slice(0,4);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau (đa thức một biến là tổng của những đơn thức của cùng một biến):',items:T.map((x,i)=>({t:`${x} là một đa thức một biến`,f:`${F[i]} là một đa thức một biến`,why:`${x} là đa thức một biến; ${F[i]} không phải (có biến ở mẫu, dưới dấu căn hoặc có hơn một biến).`})),chk:()=>true});
});
DS7b('ds7-8-event',8,'NB',r=>{
  const bank=[[EV_SURE,'chắc chắn'],[EV_IMP,'không thể'],[EV_RAN,'ngẫu nhiên']],names=bank.map(b=>b[1]);
  const evs=r.shuffle(bank.flatMap(([L,nm])=>L.map(e=>[e,nm]))).slice(0,4);
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:evs.map(([e,nm])=>({t:`Biến cố “${e}” là biến cố ${nm}`,f:`Biến cố “${e}” là biến cố ${r.pick(names.filter(x=>x!==nm))}`,why:`Biến cố “${e}” là biến cố ${nm}.`})),chk:()=>new Set(evs.map(e=>e[0])).size===4});
});
DS7b('ds7-9-stat',9,'NB',r=>dsStmt(r,[...PERP_T,...CONC_T,...DEF9_T],[...PERP_F,...CONC_F,...DEF9_F]));
DS7b('ds7-10-stat',10,'NB',r=>dsStmt(r,SOL10_T,SOL10_F));
