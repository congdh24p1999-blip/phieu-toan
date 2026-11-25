/* ================================================================
   LỚP 9 – Toán 9 Kết nối tri thức, học kì I
   Chương I: Phương trình và hệ hai phương trình bậc nhất hai ẩn (Bài 1 – 3)
   Chương II: Phương trình và bất phương trình bậc nhất một ẩn (Bài 4 – 6)
   ================================================================ */
const N9=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:9,hk:1,les});
const DS9=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:9,hk:1,les});
const TLN9=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:9,hk:1,les});
const TL9=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:9,hk:1,les});
const eq2=(a,b,c)=>`${lin3H([a,b],['x','y'])} = ${sg(c)}`;
const sys9=(E1,E2)=>cases(eq2(...E1),eq2(...E2));
const pr9=p=>`(${p.map(sg).join('; ')})`;
/* hệ có nghiệm nguyên (x0; y0) với hệ số nguyên, định thức khác 0 */
const sysR=(r,o={})=>{for(;;){const x0=r.int(-6,6),y0=r.int(-6,6),a1=r.nz(-5,5),b1=r.nz(-5,5),a2=r.nz(-5,5),b2=o.b2??r.nz(-5,5);if(a1*b2===a2*b1)continue;
  if(o.easy&&!(Math.abs(a1)===1||Math.abs(b1)===1||Math.abs(a2)===1||Math.abs(b2)===1))continue;
  return{x0,y0,E1:[a1,b1,a1*x0+b1*y0],E2:[a2,b2,a2*x0+b2*y0]}}};
const ptW=(p,n)=>[[p[1],p[0]],[-p[0],p[1]],[p[0],-p[1]],[-p[0],-p[1]],[p[0]+1,p[1]],[p[0],p[1]-1],[p[0]-1,p[1]+1]].filter(q=>q[0]!==p[0]||q[1]!==p[1]).slice(0,n||7);

/* ===================== Bài 1: Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn ===================== */
N9('k9-1-which',1,'NB',[1],r=>{
  const a=r.nz(-5,5),b=r.nz(-5,5),c=r.int(-9,9),z=r.chance(.5);
  const cor=z?`${lin3H([a,0],['x','y'])} + 0${I('y')} = ${sg(c)}`:eq2(a,b,c),W=[`${I('x')}${sup(2)} + ${lin3H([0,b],['x','y'])} = ${sg(c)}`,`${a===1?'':a===-1?MINUS:sg(a)}${I('x')}${I('y')} + ${I('y')} = ${sg(c)}`,`0${I('x')} + 0${I('y')} = ${sg(c||1)}`,`${lin3H([a],['x'])} + ${fr(b,I('y'))} = ${sg(c)}`];
  return mkTxt(r,{stem:'Phương trình nào sau đây là phương trình bậc nhất hai ẩn?',correct:cor,wrongs:W,sol:`Phương trình bậc nhất hai ẩn có dạng ax + by = c, trong đó a, b không đồng thời bằng 0. ${cor} có dạng đó.`,chk:()=>true});
});
N9('k9-1-sol',1,'NB',[1],r=>{
  for(;;){const a=r.nz(-4,4),b=r.nz(-4,4),x0=r.int(-5,5),y0=r.int(-5,5),c=a*x0+b*y0,W=ptW([x0,y0]).filter(p=>a*p[0]+b*p[1]!==c);if(W.length<3)continue;
    return mkTxt(r,{stem:`Cặp số nào sau đây là một nghiệm của phương trình ${eq2(a,b,c)}?`,correct:pr9([x0,y0]),wrongs:W.map(pr9),
      sol:`Thay x = ${sg(x0)}, y = ${sg(y0)} vào vế trái: ${sg(a*x0+b*y0)} = ${sg(c)}. Vậy ${pr9([x0,y0])} là một nghiệm.`,chk:()=>true})}
});
N9('k9-1-syssol',1,'NB',[1],r=>{
  for(;;){const S=sysR(r),ok=p=>S.E1[0]*p[0]+S.E1[1]*p[1]===S.E1[2]&&S.E2[0]*p[0]+S.E2[1]*p[1]===S.E2[2],W=ptW([S.x0,S.y0]).filter(p=>!ok(p));if(W.length<3)continue;
    return mkTxt(r,{stem:`Cặp số nào sau đây là nghiệm của hệ phương trình ${sys9(S.E1,S.E2)}?`,correct:pr9([S.x0,S.y0]),wrongs:W.map(pr9),
      sol:`Thay ${pr9([S.x0,S.y0])} vào cả hai phương trình của hệ đều thoả mãn; các cặp số còn lại không thoả mãn ít nhất một phương trình.`,chk:()=>ok([S.x0,S.y0])})}
});
N9('k9-1-line',1,'TH',[1],r=>{
  for(;;){const b=r.pick([1,-1,2,-2,3]),ka=r.nz(-3,3),kc=r.int(-4,4),a=ka*b,c=kc*b,ask=r.chance(.5);
    if(ask){const cor=`${I('y')} = ${lin3H([-ka,kc],['x',''])}`,W=[`${I('y')} = ${lin3H([ka,kc],['x',''])}`,`${I('y')} = ${lin3H([-ka,-kc],['x',''])}`,`${I('y')} = ${lin3H([ka,-kc],['x',''])}`,`${I('x')} = ${lin3H([-ka,kc],['y',''])}`].filter(x=>x!==cor);
      if(uniqBy(W,x=>x).length<3)continue;
      return mkTxt(r,{stem:`Tập nghiệm của phương trình ${eq2(a,b,c)} được biểu diễn bởi đường thẳng`,correct:cor,wrongs:uniqBy(W,x=>x),sol:`${eq2(a,b,c)} ⟺ ${cor}.`,chk:()=>true})}
    const v=r.int(-5,5),m=(c-a*v)/b;if(!isInt(m))continue;
    return mkNum(r,{stem:`Biết cặp số (${sg(v)}; ${I('m')}) là một nghiệm của phương trình ${eq2(a,b,c)}. Giá trị của ${I('m')} là`,correct:m,ok:()=>true,cands:[-m,m+1,m-2,(c+a*v)/b].filter(isInt),
      sol:`Thay x = ${sg(v)}, y = m vào phương trình: ${pp10(`${sg(a)}·${sg(v)}`)} + ${pp10('· '+sg(b)).slice(2)}m = ${sg(c)} ⇒ m = ${sg(m)}.`,chk:()=>a*v+b*m===c})}
});
/* ===================== Bài 2: Giải hệ hai phương trình bậc nhất hai ẩn ===================== */
N9('k9-2-solve',1,'TH',[2],r=>{
  const S=sysR(r,{easy:true});
  return mkTxt(r,{stem:`Nghiệm của hệ phương trình ${sys9(S.E1,S.E2)} là`,correct:pr9([S.x0,S.y0]),wrongs:ptW([S.x0,S.y0]).map(pr9),
    sol:`Dùng phương pháp thế hoặc cộng đại số: x = ${sg(S.x0)}, y = ${sg(S.y0)}.`,chk:()=>S.E2[0]*S.x0+S.E2[1]*S.y0===S.E2[2]});
});
N9('k9-2-count',1,'TH',[2],r=>{
  const a=r.nz(-4,4),b=r.nz(-4,4),c=r.int(-8,8),k=r.pick([2,-2,3,-1]),t=r.int(0,2);
  const E2=t===0?[k*a,k*b,k*c+r.nz(-3,3)]:t===1?[k*a,k*b,k*c]:(()=>{for(;;){const d=r.nz(-4,4),e=r.nz(-4,4);if(a*e!==b*d)return[d,e,r.int(-8,8)]}})();
  const ans=['Vô nghiệm','Có vô số nghiệm','Có nghiệm duy nhất'][t];
  return mkTxt(r,{stem:`Hệ phương trình ${sys9([a,b,c],E2)}`,correct:ans,wrongs:['Vô nghiệm','Có vô số nghiệm','Có nghiệm duy nhất','Có đúng hai nghiệm'].filter(x=>x!==ans),
    sol:t===2?`Hai phương trình có hệ số của x, y không tỉ lệ nên hệ có nghiệm duy nhất.`:`Nhân hai vế phương trình thứ nhất với ${sg(k)} rồi so sánh với phương trình thứ hai: ${t?'hai phương trình tương đương nên hệ có vô số nghiệm':'được 0x + 0y = '+sg(E2[2]-k*c)+' (vô lí) nên hệ vô nghiệm'}.`,chk:()=>true});
});
N9('k9-2-param',1,'VD',[2],r=>{
  for(;;){const x0=r.nz(-4,4),y0=r.nz(-4,4),m=r.nz(-4,4),n=r.nz(-4,4),p=m*x0+y0,q=x0-n*y0;if(p===0&&q===0)continue;
    return mkNum(r,{stem:`Biết hệ phương trình ${cases(`${I('m')}${I('x')} + ${I('y')} = ${sg(p)}`,`${I('x')} ${MINUS} ${I('n')}${I('y')} = ${sg(q)}`)} có nghiệm (${sg(x0)}; ${sg(y0)}). Giá trị của ${I('m')} + ${I('n')} là`,correct:m+n,ok:()=>true,cands:[m-n,m*n,-m-n,m+n+1,n-m],
      sol:`Thay x = ${sg(x0)}, y = ${sg(y0)}: ${sg(x0)}m + ${pp10('+ '+sg(y0)).slice(2)} = ${sg(p)} ⇒ m = ${sg(m)}; ${sg(x0)} − ${pp10('· '+sg(y0)).slice(2)}n = ${sg(q)} ⇒ n = ${sg(n)}. Vậy m + n = ${sg(m+n)}.`,chk:()=>true})}
});
DS9('ds9-2-sys',1,'TH',[1,2],r=>{
  for(;;){const S=sysR(r,{easy:true}),[a1,b1,c1]=S.E1,[a2,b2,c2]=S.E2,P=ptW([S.x0,S.y0]).find(q=>a1*q[0]+b1*q[1]!==c1);if(!P)continue;
  return mkDS(r,{stem:`Cho hệ phương trình ${sys9(S.E1,S.E2)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Cặp số ${pr9([S.x0,S.y0])} là một nghiệm của phương trình thứ nhất.`,f:`Cặp số ${pr9(P)} là một nghiệm của phương trình thứ nhất.`,why:`${sg(a1*S.x0+b1*S.y0)} = ${sg(c1)}.`,fixed:a1*P[0]+b1*P[1]!==c1?undefined:true},
    {t:`Hệ phương trình có nghiệm duy nhất.`,f:`Hệ phương trình vô nghiệm.`,why:`Hệ số của x, y ở hai phương trình không tỉ lệ (${pp10(`${sg(a1)}·${sg(b2)}`)} ≠ ${pp10(`${sg(b1)}·${sg(a2)}`)}).`},
    {t:`Nghiệm của hệ là ${pr9([S.x0,S.y0])}.`,f:`Nghiệm của hệ là ${pr9([S.y0,S.x0])===pr9([S.x0,S.y0])?pr9([S.x0+1,S.y0]):pr9([S.y0,S.x0])}.`,why:`Giải bằng phương pháp thế hoặc cộng đại số.`},
    {t:`Nếu (${I('x')}; ${I('y')}) là nghiệm của hệ thì ${I('x')} + ${I('y')} = ${sg(S.x0+S.y0)}.`,f:`Nếu (${I('x')}; ${I('y')}) là nghiệm của hệ thì ${I('x')} + ${I('y')} = ${sg(S.x0+S.y0+2)}.`,why:`x + y = ${sg(S.x0)} + ${pp10('+ '+sg(S.y0)).slice(2)} = ${sg(S.x0+S.y0)}.`}],chk:()=>a1*P[0]+b1*P[1]!==c1})}
});
TLN9('t9-2-sum',1,'TH',[2],r=>{
  const S=sysR(r),ask=r.int(0,2),v=[S.x0+S.y0,S.x0*S.y0,S.x0-S.y0][ask];
  return{kind:'tln',stem:`Gọi (${I('x')}${sub(0)}; ${I('y')}${sub(0)}) là nghiệm của hệ phương trình ${sys9(S.E1,S.E2)}. Tính ${['x₀ + y₀','x₀·y₀','x₀ − y₀'][ask].replace(/x₀/g,I('x')+sub(0)).replace(/y₀/g,I('y')+sub(0))}.`,ans:v,unit:'',
    sol:`Giải hệ được x₀ = ${sg(S.x0)}, y₀ = ${sg(S.y0)}; kết quả bằng ${sg(v)}.`,chk:()=>true};
});
TL9('tl9-2-sys',1,'TH','alg',[2],r=>{
  const A=sysR(r,{easy:true}),B=sysR(r);
  return{kind:'tl',title:'Giải hệ phương trình',parts:[{pts:.5,html:`Giải hệ phương trình ${sys9(A.E1,A.E2)}.`},{pts:.5,html:`Giải hệ phương trình ${sys9(B.E1,B.E2)}.`}],
    sol:[ptxt([[`Dùng phương pháp thế (hoặc cộng đại số), tìm được x = ${sg(A.x0)}.`,.25],[`Thay vào được y = ${sg(A.y0)}. Hệ có nghiệm duy nhất ${pr9([A.x0,A.y0])}.`,.25]]),
      ptxt([[`Nhân hai vế mỗi phương trình với số thích hợp để hệ số của một ẩn đối nhau, cộng vế được x = ${sg(B.x0)} (hoặc y = ${sg(B.y0)}).`,.25],[`Hệ có nghiệm duy nhất ${pr9([B.x0,B.y0])}.`,.25]])],chk:()=>true};
});
TL9('tl9-2-param',1,'VD','alg',[1,2],r=>{
  for(;;){const x0=r.nz(-4,4),y0=r.nz(-4,4),a=r.nz(-4,4),b=r.nz(-4,4);/* hệ: ax + by = c1; bx − ay = c2 có nghiệm (x0; y0) */
    const c1=a*x0+b*y0,c2=b*x0-a*y0,S=sysR(r,{easy:true});if(x0*x0+y0*y0===0)continue;
    return{kind:'tl',title:'Hệ phương trình bậc nhất hai ẩn',parts:[
      {pts:.5,html:`Giải hệ phương trình ${sys9(S.E1,S.E2)}.`},
      {pts:.5,html:`Tìm ${I('a')}, ${I('b')} để hệ phương trình ${cases(`${I('a')}${I('x')} + ${I('b')}${I('y')} = ${sg(c1)}`,`${I('b')}${I('x')} ${MINUS} ${I('a')}${I('y')} = ${sg(c2)}`)} có nghiệm (${sg(x0)}; ${sg(y0)}).`}],
      sol:[ptxt([[`Khử một ẩn bằng phương pháp thế hoặc cộng đại số.`,.25],[`Nghiệm của hệ: ${pr9([S.x0,S.y0])}.`,.25]]),
        ptxt([[`Thay x = ${sg(x0)}, y = ${sg(y0)} được hệ ẩn a, b: ${cases(`${lin3H([x0,y0],['a','b'])} = ${sg(c1)}`,`${lin3H([-y0,x0],['a','b'])} = ${sg(c2)}`)}.`,.25],[`Giải hệ được a = ${sg(a)}, b = ${sg(b)}.`,.25]])],chk:()=>x0*x0+y0*y0!==0}}
});

/* ===================== Bài 3: Giải bài toán bằng cách lập hệ phương trình ===================== */
const WORD9=[
  r=>{const x=r.int(5,30),y=r.int(5,30),p=r.int(3,9)*1000,q=r.int(2,8)*1000;if(p===q)return null;return{x,y,txt:`Bạn Lan mua ${x+y} quyển sách và vở hết ${(p*x+q*y).toLocaleString('vi-VN')} đồng. Biết mỗi quyển sách giá ${p.toLocaleString('vi-VN')} đồng, mỗi quyển vở giá ${q.toLocaleString('vi-VN')} đồng.`,ask:['Số quyển sách Lan mua là','Số quyển vở Lan mua là'],sys:[[1,1,x+y],[p/1000,q/1000,(p*x+q*y)/1000]],vx:'số quyển sách',vy:'số quyển vở'}},
  r=>{const x=r.int(10,40),y=r.int(10,40);return{x,y,txt:`Vừa gà vừa chó có tất cả ${x+y} con và ${2*x+4*y} chân.`,ask:['Số con gà là','Số con chó là'],sys:[[1,1,x+y],[2,4,2*x+4*y]],vx:'số gà',vy:'số chó'}},
  r=>{const x=r.int(20,60),y=r.int(20,60),k=r.pick([10,20,25]);if(x===y)return null;return{x,y,txt:`Hai lớp 9A và 9B có tổng cộng ${x+y} học sinh. Trong đợt quyên góp, mỗi học sinh lớp 9A góp ${k/5} quyển vở, mỗi học sinh lớp 9B góp ${k/5+1} quyển vở; cả hai lớp góp được ${x*k/5+y*(k/5+1)} quyển.`,ask:['Số học sinh lớp 9A là','Số học sinh lớp 9B là'],sys:[[1,1,x+y],[k/5,k/5+1,x*k/5+y*(k/5+1)]],vx:'số học sinh lớp 9A',vy:'số học sinh lớp 9B'}},
  r=>{const x=r.int(30,60),y=r.int(2,8);if(x<=y)return null;const t1=r.int(2,5),t2=r.int(2,5);return{x,y,txt:`Một ca nô xuôi dòng ${(x+y)*t1} km hết ${t1} giờ và ngược dòng ${(x-y)*t2} km hết ${t2} giờ (vận tốc riêng của ca nô và vận tốc dòng nước không đổi).`,ask:['Vận tốc riêng của ca nô (km/h) là','Vận tốc dòng nước (km/h) là'],sys:[[1,1,x+y],[1,-1,x-y]],vx:'vận tốc riêng của ca nô',vy:'vận tốc dòng nước'}}];
const word9=r=>{for(;;){const w=r.pick(WORD9)(r);if(w)return w}};
N9('k9-3-word',1,'VD',[3],r=>{
  const w=word9(r),i=r.int(0,1),v=[w.x,w.y][i];
  return mkNum(r,{stem:`${w.txt} ${w.ask[i]}`,correct:v,cands:[[w.x,w.y][1-i],v+1,v-2,v+5],
    sol:`Gọi x là ${w.vx}, y là ${w.vy}. Ta có hệ ${sys9(...w.sys)}. Giải hệ được x = ${w.x}, y = ${w.y}.`,chk:()=>w.sys.every(([a,b,c])=>a*w.x+b*w.y===c)});
});
N9('k9-3-model',1,'TH',[3],r=>{
  const w=word9(r),cor=sys9(...w.sys),[[a1,b1,c1],[a2,b2,c2]]=w.sys,W=[sys9([a1,b1,c1],[b2,a2,c2]),sys9([a1,b1,c1+1],[a2,b2,c2]),sys9([a1,-b1,c1],[a2,b2,c2]),sys9([a1,b1,c2],[a2,b2,c1])].filter(x=>x!==cor);
  return mkTxt(r,{stem:`${w.txt} Gọi ${I('x')} là ${w.vx} và ${I('y')} là ${w.vy}. Hệ phương trình nào sau đây mô tả bài toán?`,correct:cor,wrongs:uniqBy(W,x=>x),sol:`Từ các dữ kiện ta lập được hệ ${cor}.`,chk:()=>true});
});
TLN9('t9-3-word',1,'VD',[3],r=>{
  const w=word9(r),i=r.int(0,1),v=[w.x,w.y][i];
  return{kind:'tln',stem:`${w.txt} ${w.ask[i].replace(/ là$/,'')} bằng bao nhiêu?`,ans:v,unit:'',sol:`Lập hệ ${sys9(...w.sys)}; giải được x = ${w.x}, y = ${w.y}.`,chk:()=>true};
});
TL9('tl9-3-word',1,'VD','real',[3],r=>{
  const w=word9(r);
  return{kind:'tl',title:'Giải bài toán bằng cách lập hệ phương trình',parts:[{pts:1,html:`${w.txt} Tìm ${w.vx} và ${w.vy}.`}],
    sol:[ptxt([[`Gọi x là ${w.vx}, y là ${w.vy} (điều kiện phù hợp với thực tế).`,.25],[`Lập được hệ ${sys9(...w.sys)}.`,.25],[`Giải hệ được x = ${w.x}, y = ${w.y}.`,.25],[`Đối chiếu điều kiện và kết luận.`,.25]])],chk:()=>true};
});
TL9('tl9-3-work',1,'VD','real',[3],r=>{
  for(;;){const a=r.int(6,40),b=r.int(6,40);if(a===b)continue;const T=a*b/(a+b);if(!isInt(T)||T<2)continue;const t=r.int(1,a-1);if(((a-t)*b)%a)continue;const d2=(a-t)*b/a;if(d2<1)continue;
    return{kind:'tl',title:'Bài toán làm chung, làm riêng',parts:[{pts:1,html:`Hai đội công nhân cùng làm một con đường thì sau ${T} ngày xong. Nếu đội thứ nhất làm một mình trong ${t} ngày rồi đội thứ hai làm tiếp một mình trong ${d2} ngày thì xong con đường. Hỏi mỗi đội làm một mình thì sau bao nhiêu ngày xong con đường?`}],
      sol:[ptxt([[`Gọi x, y (ngày) là thời gian đội I, đội II làm một mình xong con đường (x, y > ${T}). Mỗi ngày đội I làm được ${fr(1,'x')}, đội II làm được ${fr(1,'y')} công việc.`,.25],[`Ta có hệ ${cases(`${fr(1,I('x'))} + ${fr(1,I('y'))} = ${fr(1,T)}`,`${fr(t,I('x'))} + ${fr(d2,I('y'))} = 1`)}.`,.25],[`Đặt u = ${fr(1,'x')}, v = ${fr(1,'y')}, giải hệ bậc nhất được u = ${fr(1,a)}, v = ${fr(1,b)}.`,.25],[`Vậy đội I làm một mình hết ${a} ngày, đội II hết ${b} ngày.`,.25]])],chk:()=>Math.abs(1/a+1/b-1/T)<1e-12&&Math.abs(t/a+d2/b-1)<1e-12}}
});
TL9('tl9-3-simple',1,'TH','real',[3],r=>{
  const w=word9(r);
  return{kind:'tl',title:'Lập hệ phương trình',parts:[{pts:.5,html:`${w.txt} Gọi ${I('x')} là ${w.vx}, ${I('y')} là ${w.vy}. Lập hệ phương trình biểu thị các dữ kiện của bài toán.`},{pts:.5,html:`Giải hệ phương trình vừa lập và trả lời bài toán.`}],
    sol:[ptxt([[`Từ dữ kiện thứ nhất: ${eq2(...w.sys[0])}.`,.25],[`Từ dữ kiện thứ hai: ${eq2(...w.sys[1])}.`,.25]]),ptxt([[`Giải hệ được x = ${w.x}, y = ${w.y}.`,.25],[`Vậy ${w.vx} là ${w.x}, ${w.vy} là ${w.y}.`,.25]])],chk:()=>true};
});

/* ===================== Bài 4: Phương trình quy về phương trình bậc nhất một ẩn ===================== */
N9('k9-4-prod',2,'NB',[4],r=>{
  for(;;){const a=r.pick([1,2,3,-1]),p=r.nz(-6,6),c=r.pick([1,2,-1,3]),q=r.nz(-6,6);if(p===q||p===-q)continue;
    const b=-a*p,d=-c*q;if(d%1)continue;const S=`{${[p,q].sort((x,y)=>x-y).map(sg).join('; ')}}`;
    return mkTxt(r,{stem:`Tập nghiệm của phương trình (${xlin(a,b)})(${xlin(c,d)}) = 0 là`,correct:S,wrongs:[`{${[-p,-q].sort((x,y)=>x-y).map(sg).join('; ')}}`,`{${sg(p)}}`,`{${[p,-q].sort((x,y)=>x-y).map(sg).join('; ')}}`,`{${[-p,q].sort((x,y)=>x-y).map(sg).join('; ')}}`,`{${sg(q)}}`].filter(x=>x!==S),
      sol:`(${xlin(a,b)})(${xlin(c,d)}) = 0 ⟺ ${xlin(a,b)} = 0 hoặc ${xlin(c,d)} = 0 ⟺ x = ${sg(p)} hoặc x = ${sg(q)}.`,chk:()=>true})}
});
N9('k9-4-cond',2,'NB',[4],r=>{
  for(;;){const p=r.int(-5,5),q=r.int(-5,5);if(p===q)continue;const cor=`${I('x')} ≠ ${sg(p)} và ${I('x')} ≠ ${sg(q)}`;
    return mkTxt(r,{stem:`Điều kiện xác định của phương trình ${fr(r.int(1,5),xlin(1,-p))} + ${fr(I('x'),xlin(1,-q))} = ${r.int(1,4)} là`,correct:cor,wrongs:[`${I('x')} ≠ ${sg(-p)} và ${I('x')} ≠ ${sg(-q)}`,`${I('x')} ≠ ${sg(p)}`,`${I('x')} ≠ ${sg(q)}`,`${I('x')} ≠ ${sg(p)} hoặc ${I('x')} ≠ ${sg(q)}`],
      sol:`Các mẫu phải khác 0: x − ${pp10('− '+sg(p)).slice(2)} ≠ 0 và x − ${pp10('− '+sg(q)).slice(2)} ≠ 0.`.replace(/x − 0/g,'x'),chk:()=>true})}
});
/* phương trình chứa ẩn ở mẫu: a/(x − p) + b/(x − q) = c·... dựng từ nghiệm */
const frac9H=F=>`${F.a<0?MINUS:''}${fr(Math.abs(F.a),xlin(1,-F.p))} ${F.b<0?MINUS:'+'} ${fr(Math.abs(F.b),xlin(1,-F.q))} = ${sg(F.k)}`;
const frac9=r=>{for(;;){const p=r.int(-4,4),q=r.int(-4,4),x0=r.int(-6,6);if(p===q||x0===p||x0===q)continue;const a=r.nz(-4,4),b=r.nz(-4,4);
  /* a/(x − p) + b/(x − q) = k với k = giá trị tại x0; quy đồng: a(x − q) + b(x − p) = k(x − p)(x − q) */
  const kq=Q(a*(x0-q)+b*(x0-p),(x0-p)*(x0-q));if(kq[1]!==1||kq[0]===0)continue;const k=kq[0];
  /* nghiệm thứ hai của k x² − (k(p+q) + a + b)x + (k p q + a q + b p) = 0 */
  const A=k,B=-(k*(p+q)+a+b),C=k*p*q+a*q+b*p,x1=-B/A-x0;const sols=[x0];if(isInt(x1)&&x1!==x0&&x1!==p&&x1!==q)sols.push(x1);else if(!isInt(x1))continue;
  return{p,q,a,b,k,x0,x1,sols:sols.sort((u,v)=>u-v),A,B,C,lost:(x1===p||x1===q)?x1:null}}};
N9('k9-4-frac',2,'VD',[4],r=>{
  const F=frac9(r),S=`{${F.sols.map(sg).join('; ')}}`,W=[`{${[F.x0,F.x1].sort((u,v)=>u-v).map(sg).join('; ')}}`,`{${sg(F.x0+1)}}`,'∅',`{${F.sols.map(x=>sg(-x)).join('; ')}}`,`{${sg(F.p)}; ${sg(F.q)}}`].filter(x=>x!==S);
  return mkTxt(r,{stem:`Tập nghiệm của phương trình ${frac9H(F)} là`,correct:S,wrongs:uniqBy(W,x=>x),
    sol:`ĐKXĐ: x ≠ ${sg(F.p)}, x ≠ ${sg(F.q)}. Quy đồng mẫu rồi khử mẫu được ${xquad(F.A,F.B,F.C)} = 0, có nghiệm x = ${sg(F.x0)}${F.x1!==F.x0?` và x = ${sg(F.x1)}`:''}. Đối chiếu điều kiện: S = ${S}.`,chk:()=>F.A*F.x0*F.x0+F.B*F.x0+F.C===0});
});
DS9('ds9-4-eq',2,'TH',[4],r=>{
  for(;;){const F=frac9(r);if(F.B===0||F.p===0||F.q===0)continue;
  return mkDS(r,{stem:`Cho phương trình ${frac9H(F)} (1). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`Điều kiện xác định của (1) là ${I('x')} ≠ ${sg(F.p)} và ${I('x')} ≠ ${sg(F.q)}.`,f:`Điều kiện xác định của (1) là ${I('x')} ≠ ${sg(-F.p)} và ${I('x')} ≠ ${sg(-F.q)}.`,why:`Các mẫu phải khác 0.`},
    {t:`${I('x')} = ${sg(F.x0)} là một nghiệm của (1).`,f:`${I('x')} = ${sg(F.p)} là một nghiệm của (1).`,why:`Thay x = ${sg(F.x0)} thoả mãn; x = ${sg(F.p)} không thoả mãn điều kiện xác định.`},
    {t:`Sau khi quy đồng và khử mẫu, ta được phương trình ${xquad(F.A,F.B,F.C)} = 0.`,f:`Sau khi quy đồng và khử mẫu, ta được phương trình ${xquad(F.A,-F.B,F.C)} = 0.`,why:`${sg(F.a)}(x − ${pp10('− '+sg(F.q)).slice(2)}) + ${pp10('+ '+sg(F.b)).slice(2)}(x − ${pp10('− '+sg(F.p)).slice(2)}) = ${sg(F.k)}(x − ${pp10('− '+sg(F.p)).slice(2)})(x − ${pp10('− '+sg(F.q)).slice(2)}).`.replace(/x − 0/g,'x')},
    {t:`Phương trình (1) có ${F.sols.length===1?'đúng một nghiệm':'hai nghiệm phân biệt'}.`,f:`Phương trình (1) có ${F.sols.length===1?'hai nghiệm phân biệt':'đúng một nghiệm'}.`,why:`Tập nghiệm S = {${F.sols.map(sg).join('; ')}}.`}],chk:()=>F.B!==0})}
});
TLN9('t9-4-sum',2,'VD',[4],r=>{
  const F=frac9(r),s=F.sols.reduce((a,b)=>a+b,0);
  return{kind:'tln',stem:`Tính tổng các nghiệm của phương trình ${frac9H(F)}.`,ans:s,unit:'',sol:`ĐKXĐ: x ≠ ${sg(F.p)}, x ≠ ${sg(F.q)}; khử mẫu được ${xquad(F.A,F.B,F.C)} = 0; đối chiếu điều kiện được S = {${F.sols.map(sg).join('; ')}}. Tổng bằng ${sg(s)}.`,chk:()=>true};
});
TL9('tl9-4-eq',2,'TH','alg',[4],r=>{
  for(;;){const a=r.pick([1,2,3]),p=r.int(-5,5),c=r.pick([1,2,-1]),q=r.int(-5,5);if(p===q)continue;const F=frac9(r);
    return{kind:'tl',title:'Phương trình quy về phương trình bậc nhất một ẩn',parts:[{pts:.5,html:`Giải phương trình (${xlin(a,-a*p)})(${xlin(c,-c*q)}) = 0.`},{pts:.5,html:`Giải phương trình ${frac9H(F)}.`}],
      sol:[ptxt([[`Phương trình tương đương ${xlin(a,-a*p)} = 0 hoặc ${xlin(c,-c*q)} = 0.`,.25],[`x = ${sg(p)} hoặc x = ${sg(q)}.`,.25]]),ptxt([[`ĐKXĐ: x ≠ ${sg(F.p)}, x ≠ ${sg(F.q)}. Quy đồng, khử mẫu: ${xquad(F.A,F.B,F.C)} = 0.`,.25],[`Giải và đối chiếu điều kiện: S = {${F.sols.map(sg).join('; ')}}.`,.25]])],chk:()=>true}}
});

/* ===================== Bài 5: Bất đẳng thức và tính chất ===================== */
N9('k9-5-prop',2,'NB',[5],r=>{
  const c=r.int(2,7),neg=r.chance(.5),k=neg?-c:c,want=r.chance(.6);
  const T_=[`${I('a')} + ${c} > ${I('b')} + ${c}`,`${I('a')} ${MINUS} ${c} > ${I('b')} ${MINUS} ${c}`,`${c}${I('a')} > ${c}${I('b')}`,`${MINUS}${c}${I('a')} < ${MINUS}${c}${I('b')}`,`${fr(I('a'),c)} > ${fr(I('b'),c)}`];
  const F_=[`${MINUS}${c}${I('a')} > ${MINUS}${c}${I('b')}`,`${I('a')} + ${c} < ${I('b')} + ${c}`,`${c}${I('a')} < ${c}${I('b')}`,`${c} ${MINUS} ${I('a')} > ${c} ${MINUS} ${I('b')}`];
  if(want)return mkTxt(r,{stem:`Cho ${I('a')} > ${I('b')}. Khẳng định nào sau đây đúng?`,correct:r.pick(T_),wrongs:r.shuffle(F_),sol:`Cộng cùng một số vào hai vế giữ nguyên chiều bất đẳng thức; nhân với số dương giữ nguyên chiều, nhân với số âm đổi chiều.`,chk:()=>k!==0});
  return mkTxt(r,{stem:`Cho ${I('a')} > ${I('b')}. Khẳng định nào sau đây <b>sai</b>?`,correct:r.pick(F_),wrongs:r.shuffle(T_),sol:`Nhân hai vế với số âm thì đổi chiều bất đẳng thức; trừ số a, b từ cùng một số cũng đổi chiều.`,chk:()=>true});
});
N9('k9-5-cmp',2,'TH',[5],r=>{
  const p=r.nz(-5,5),q=r.int(-6,6),pos=p>0,ask=r.chance(.5);
  const L=`${xlin(p,q,'a')}`,R=`${xlin(p,q,'b')}`,cor=ask===pos?`${L} > ${R}`:`${L} < ${R}`;
  return mkTxt(r,{stem:`Cho ${I('a')} ${ask?'>':'<'} ${I('b')}. So sánh ${L} và ${R}.`,correct:cor,wrongs:[ask===pos?`${L} < ${R}`:`${L} > ${R}`,`${L} = ${R}`,`${L} ≤ ${R}`.replace('≤',ask===pos?'≤':'≥')],
    sol:`Nhân hai vế của a ${ask?'>':'<'} b với ${sg(p)} ${pos?'(dương, giữ nguyên chiều)':'(âm, đổi chiều)'} rồi cộng ${sg(q)} vào hai vế: ${cor}.`,chk:()=>true});
});

/* ===================== Bài 6: Bất phương trình bậc nhất một ẩn ===================== */
N9('k9-6-which',2,'NB',[6],r=>{
  const a=r.nz(-5,5),b=r.int(-9,9),op=r.pick(['>','<','≥','≤']);
  return mkTxt(r,{stem:'Bất phương trình nào sau đây là bất phương trình bậc nhất một ẩn?',correct:`${xlin(a,b)} ${op} 0`,wrongs:[`0${I('x')} + ${Math.abs(b)||3} ${op} 0`,`${I('x')}${sup(2)} ${op} ${Math.abs(b)+1}`,`${fr(1,I('x'))} + ${Math.abs(b)||2} ${op} 0`,`${I('x')} + ${I('y')} ${op} ${Math.abs(b)}`],
    sol:`Bất phương trình bậc nhất một ẩn có dạng ax + b < 0 (hoặc >, ≤, ≥) với a ≠ 0.`,chk:()=>true});
});
const flipOp={'>':'<','<':'>','≥':'≤','≤':'≥'};
N9('k9-6-solve',2,'TH',[6],r=>{
  for(;;){const a=r.nz(-6,6),x0=r.nz(-6,6),b=-a*x0,op=r.pick(['>','<','≥','≤']),fo=a<0?flipOp[op]:op;
    const cor=`${I('x')} ${fo} ${sg(x0)}`;
    return mkTxt(r,{stem:`Nghiệm của bất phương trình ${xlin(a,b)} ${op} 0 là`,correct:cor,wrongs:[`${I('x')} ${flipOp[fo]} ${sg(x0)}`,`${I('x')} ${fo} ${sg(-x0)}`,`${I('x')} ${flipOp[fo]} ${sg(-x0)}`],
      sol:`${xlin(a,b)} ${op} 0 ⟺ ${sg(a)}x ${op} ${sg(-b)} ⟺ x ${fo} ${sg(x0)} (${a<0?'chia hai vế cho số âm nên đổi chiều':'chia hai vế cho số dương'}).`,chk:()=>x0===x0})}
});
N9('k9-6-int',2,'TH',[6],r=>{
  const a=r.pick([2,3,4,5,-2,-3]),b=r.int(-12,12),c=r.int(-12,12),d=r.int(-3,3);/* a x + b ≤ c x + d? dùng dạng ax + b < 0 rồi tìm số nguyên lớn nhất/nhỏ nhất */
  const t=-b/a,op=a>0?'<':'>';/* nghiệm x < t (a > 0) hoặc x > t */
  const v=a>0?(isInt(t)?t-1:Math.floor(t)):(isInt(t)?t+1:Math.ceil(t));
  return mkNum(r,{stem:`${a>0?'Số nguyên lớn nhất':'Số nguyên nhỏ nhất'} thoả mãn bất phương trình ${xlin(a,b)} < 0 là`,correct:v,ok:()=>true,cands:[v+1,v-1,a>0?Math.ceil(t):Math.floor(t),-v].filter(x=>x!==v),
    sol:`${xlin(a,b)} < 0 ⟺ x ${op} ${qh(Q(-b,a))}. ${a>0?'Số nguyên lớn nhất nhỏ hơn':'Số nguyên nhỏ nhất lớn hơn'} ${qh(Q(-b,a))} là ${sg(v)}.`,chk:()=>a*v+b<0&&(a>0?a*(v+1)+b>=0:a*(v-1)+b>=0)&&c===c&&d===d});
});
N9('k9-6-real',2,'VD',[6],r=>{
  const f=r.pick([10,12,15]),p=r.pick([10,12,14,16]),M=r.int(15,40)*10,n=Math.floor((M-f)/p);
  return mkNum(r,{stem:`Giá cước taxi: ${f} nghìn đồng cho lượt lên xe và ${p} nghìn đồng cho mỗi ki-lô-mét. Với ${M} nghìn đồng, hành khách có thể đi được tối đa bao nhiêu ki-lô-mét (số nguyên)?`,correct:n,cands:[n+1,n-1,Math.floor(M/p),Math.ceil((M-f)/p)+1],
    sol:`Gọi x là số ki-lô-mét: ${f} + ${p}x ≤ ${M} ⟺ x ≤ ${qh(Q(M-f,p))}. Số nguyên lớn nhất thoả mãn là ${n}.`,chk:()=>f+p*n<=M&&f+p*(n+1)>M});
});
DS9('ds9-6-ineq',2,'TH',[5,6],r=>{
  const a=r.pick([2,3,4,5]),x0=r.int(-3,6),b=-a*x0,c=r.int(Math.max(2,-x0+1),Math.max(5,-x0+3));
  return mkDS(r,{stem:`Cho bất phương trình ${xlin(a,b)} ≤ 0 (1). Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`(1) là bất phương trình bậc nhất một ẩn.`,f:`(1) không phải là bất phương trình bậc nhất một ẩn.`,why:`Có dạng ax + b ≤ 0 với a = ${a} ≠ 0.`},
    {t:`${I('x')} = ${sg(x0)} là một nghiệm của (1).`,f:`${I('x')} = ${sg(x0+1)} là một nghiệm của (1).`,why:`Thay vào vế trái được ${sg(0)}${' ≤ 0'}; với x = ${sg(x0+1)} được ${a} > 0.`},
    {t:`Nghiệm của (1) là ${I('x')} ≤ ${sg(x0)}.`,f:`Nghiệm của (1) là ${I('x')} ≥ ${sg(x0)}.`,why:`${a}x ≤ ${sg(-b)} ⟺ x ≤ ${sg(x0)}.`},
    {t:`(1) có đúng ${x0+c+1} nghiệm nguyên thuộc đoạn [${sg(-c)}; ${sg(x0+c)}].`,f:`(1) có đúng ${x0+c+2} nghiệm nguyên thuộc đoạn [${sg(-c)}; ${sg(x0+c)}].`,why:`Các số nguyên từ ${sg(-c)} đến ${sg(x0)}: ${x0+c+1} số.`}],chk:()=>x0+c+1>0});
});
TLN9('t9-6-int',2,'TH',[6],r=>{
  const a=r.pick([2,3,4,5]),b=r.int(1,30),lo=1;const t=b/a,cnt=isInt(t)?t:Math.floor(t);/* a x ≤ b, nghiệm nguyên dương */
  return{kind:'tln',stem:`Bất phương trình ${a}${I('x')} ${MINUS} ${b} ≤ 0 có bao nhiêu nghiệm nguyên dương?`,ans:cnt,unit:'',sol:`${a}x − ${b} ≤ 0 ⟺ x ≤ ${qh(Q(b,a))}. Các số nguyên dương thoả mãn: 1, 2, ..., ${cnt} (có ${cnt} số).`,chk:()=>lo===1};
});
TLN9('t9-6-real',2,'VD',[6],r=>{
  for(;;){const n=r.int(3,6),k=r.int(2,3),T=r.pick([7,8]),s=r.int(n*5,n*8),x=T*(n+k)-s;if(x<=0||x>10*k)continue;
    return{kind:'tln',stem:`Bạn Minh đã làm ${n} bài kiểm tra với tổng điểm ${s}. Minh sẽ làm thêm ${k} bài kiểm tra nữa (mỗi bài tối đa 10 điểm). Tổng điểm của ${k} bài sắp tới ít nhất là bao nhiêu để điểm trung bình của tất cả các bài không dưới ${T}?`,ans:x,unit:'',
      sol:`Gọi x là tổng điểm ${k} bài sắp tới: ${fr(`${s} + x`,n+k)} ≥ ${T} ⟺ x ≥ ${T*(n+k)} − ${s} = ${x}. Vậy tổng điểm ít nhất là ${x}.`,chk:()=>true}}
});
TL9('tl9-6-ineq',2,'TH','alg',[5,6],r=>{
  const a=r.pick([2,3,4,-2,-3]),x0=r.int(-5,5),b=-a*x0,op=r.pick(['>','≤']),fo=a<0?flipOp[op]:op,c=r.int(2,6),d=r.int(-6,6),e=r.int(1,5),f=r.int(-6,6);
  /* (x + d)/c − (x − f)/e > 1 ... dùng dạng đơn giản: c(x − d) ≥ e(x + f) với c ≠ e */
  const cc=c===e?c+1:c,k=cc-e,rhs=e*f+cc*d,sol2=Q(rhs,k),fo2=k>0?'≥':'≤';
  return{kind:'tl',title:'Bất phương trình bậc nhất một ẩn',parts:[{pts:.5,html:`Giải bất phương trình ${xlin(a,b)} ${op} 0.`},{pts:.5,html:`Giải bất phương trình ${cc}(${xlin(1,-d)}) ≥ ${e}(${xlin(1,f)}).`}],
    sol:[ptxt([[`${sg(a)}x ${op} ${sg(-b)}.`,.25],[`x ${fo} ${sg(x0)} (${a<0?'chia cho số âm, đổi chiều':'chia cho số dương'}).`,.25]]),ptxt([[`${lin3H([cc,-cc*d],['x',''])} ≥ ${lin3H([e,e*f],['x',''])} ⟺ ${lin3H([k],['x'])} ≥ ${sg(rhs)}.`,.25],[`x ${fo2} ${qh(sol2)}.`,.25]])],chk:()=>k!==0};
});
TL9('tl9-6-real',2,'VD','real',[6],r=>{
  const f=r.pick([10,12,15]),p=r.pick([10,12,14,16]),M=r.int(15,40)*10,n=Math.floor((M-f)/p),g=r.pick([8,9,11]),q=r.int(5,9)*1000;
  return{kind:'tl',title:'Ứng dụng bất phương trình bậc nhất một ẩn',parts:[
    {pts:.5,html:`Giá cước taxi: ${f} nghìn đồng cho lượt lên xe và ${p} nghìn đồng cho mỗi ki-lô-mét. Với ${M} nghìn đồng, hành khách đi được tối đa bao nhiêu ki-lô-mét (số nguyên)?`},
    {pts:.5,html:`Một bạn có ${(g*q+r.int(1,q/1000-1)*1000).toLocaleString('vi-VN')} đồng, muốn mua một hộp bút giá ${(q*2).toLocaleString('vi-VN')} đồng và một số quyển vở giá ${q.toLocaleString('vi-VN')} đồng/quyển. Bạn đó mua được nhiều nhất bao nhiêu quyển vở?`}],
    sol:[ptxt([[`Gọi x là số ki-lô-mét: ${f} + ${p}x ≤ ${M} ⟺ x ≤ ${qh(Q(M-f,p))}.`,.25],[`Đi được tối đa ${n} km.`,.25]]),ptxt([[`Gọi y là số quyển vở: ${(2*q).toLocaleString('vi-VN')} + ${q.toLocaleString('vi-VN')}y ≤ số tiền đang có.`,.25],[`Mua được nhiều nhất ${g-2} quyển vở.`,.25]])],chk:()=>n>0};
});
