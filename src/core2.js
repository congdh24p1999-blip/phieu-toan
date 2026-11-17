
/* ================= Phần II: Trắc nghiệm đúng/sai ================= */
function mkDS(r,o){
  let tr;
  for(;;){tr=o.items.map(()=>r.chance(.5));const n=tr.filter(Boolean).length;if(n>=1&&n<=3)break}
  return{kind:'ds',stem:o.stem,items:o.items.map((it,i)=>({text:tr[i]?it.t:it.f,truth:tr[i],why:it.why})),chk:o.chk};
}
const DS=(id,ch,lv,gen)=>reg('ds',id,ch,lv,gen);
const x2=Pl.m(1,2,0);
DS('ds-alg1',2,'TH',r=>{
  const p=r.int(1,5),q=r.int(1,5),t0=r.nz(-3,4);
  const P=Pl.sub(Pl.pow(lin(1,p),2),Pl.mul(lin(1,-q),lin(1,q)));
  const V=Pl.ev(P,t0,0),Vf=V+r.nz(-4,4);
  const sq=Pl.from([{c:1,ex:2,ey:0},{c:2*p,ex:1,ey:0},{c:p*p,ex:0,ey:0}]);
  return mkDS(r,{
    stem:`Cho biểu thức ${I('P')} = ${par(lin(1,p))}${sup(2)} ${MINUS} ${par(lin(1,-q))}${par(lin(1,q))}. Xét tính đúng sai của các khẳng định sau:`,
    items:[
      {t:`${par(lin(1,p))}${sup(2)} = ${ph(sq)}`,f:`${par(lin(1,p))}${sup(2)} = ${ph(r.pick([Pl.from([{c:1,ex:2,ey:0},{c:p*p,ex:0,ey:0}]),Pl.from([{c:1,ex:2,ey:0},{c:p,ex:1,ey:0},{c:p*p,ex:0,ey:0}])]))}`,
       why:`(A + B)² = A² + 2AB + B² nên (x + ${p})² = ${ph(sq)}.`},
      {t:`${par(lin(1,-q))}${par(lin(1,q))} = ${ph(Pl.from([{c:1,ex:2,ey:0},{c:-q*q,ex:0,ey:0}]))}`,f:`${par(lin(1,-q))}${par(lin(1,q))} = ${ph(Pl.from([{c:1,ex:2,ey:0},{c:q*q,ex:0,ey:0}]))}`,
       why:`(A − B)(A + B) = A² − B² nên (x − ${q})(x + ${q}) = x² − ${q*q}.`},
      {t:`${I('P')} = ${ph(P)}`,f:`${I('P')} = ${ph(Pl.from([{c:2*p,ex:1,ey:0},{c:p*p-q*q,ex:0,ey:0}]))}`,
       why:`P = (x² + ${2*p}x + ${p*p}) − (x² − ${q*q}) = ${ph(P)}.`},
      {t:`Với ${I('x')} = ${sg(t0)} thì ${I('P')} = ${sg(V)}`,f:`Với ${I('x')} = ${sg(t0)} thì ${I('P')} = ${sg(Vf)}`,
       why:`Thay x = ${sg(t0)} vào P = ${ph(P)} được P = ${sg(V)}.`}
    ],
    chk:()=>[-2,0,3].every(x=>Pl.ev(P,x,0)===Math.pow(x+p,2)-(x-q)*(x+q))
  });
});
DS('ds-alg2',2,'VD',r=>{
  const u=r.int(1,4),v=r.pick([2,3]),w0=r.int(1,3),t0=v*w0-u;
  const C=Pl.sub(Pl.pow(lin(1,u),2),Pl.m(v*v,0,2));
  const F1=Pl.sub(lin(1,u),Pl.m(v,0,1)),F2=Pl.add(lin(1,u),Pl.m(v,0,1));
  const x1=r.nz(-3,3),y1=r.int(1,3),V=Pl.ev(C,x1,y1),Vf=V+r.nz(-5,5);
  const wrongExp=Pl.from([{c:1,ex:2,ey:0},{c:u*u,ex:0,ey:0},{c:-v*v,ex:0,ey:2}]);
  const at=(x,y)=>`${I('x')} = ${sg(x)} và ${I('y')} = ${sg(y)}`;
  return mkDS(r,{
    stem:`Cho biểu thức ${I('C')} = ${par(lin(1,u))}${sup(2)} ${MINUS} ${par(Pl.m(v,0,1))}${sup(2)}. Xét tính đúng sai của các khẳng định sau:`,
    items:[
      {t:`${I('C')} = ${ph(C)}`,f:`${I('C')} = ${ph(wrongExp)}`,why:`Khai triển (x + ${u})² = x² + ${2*u}x + ${u*u} và (${v}y)² = ${v*v}y², nên C = ${ph(C)}.`},
      {t:`${I('C')} = ${par(F1)}${par(F2)}`,f:`${I('C')} = ${par(F1)}${sup(2)}`,why:`C là hiệu hai bình phương: C = (x + ${u} − ${v}y)(x + ${u} + ${v}y).`},
      {t:`Với ${at(x1,y1)} thì ${I('C')} = ${sg(V)}`,f:`Với ${at(x1,y1)} thì ${I('C')} = ${sg(Vf)}`,why:`Thay ${at(x1,y1)} vào C được C = ${sg(V)}.`},
      {t:`${I('C')} = 0 khi ${at(t0,w0)}`,f:`${I('C')} = 0 khi ${at(t0,w0+1)}`,why:`C = 0 khi x + ${u} = ${v}y (hoặc x + ${u} = −${v}y); với y = ${w0} thì x = ${t0}. Với y = ${w0+1} và x = ${t0}: C = ${sg(Pl.ev(C,t0,w0+1))} ≠ 0.`}
    ],
    chk:()=>Pl.ev(C,t0,w0)===0&&Pl.ev(C,t0,w0+1)!==0&&Pl.ev(C,x1,y1)===V
  });
});
DS('ds-rhombus',3,'TH',r=>{
  const al=r.pick([50,60,70,80,100,110,120,130]),a=r.int(4,12);
  return mkDS(r,{
    stem:`Cho hình thoi ${I('ABCD')} có ${I('AB')} = ${a} cm, ∠${I('BAD')} = ${al}°, hai đường chéo ${I('AC')} và ${I('BD')} cắt nhau tại ${I('O')}. Xét tính đúng sai của các khẳng định sau:`,
    items:[
      {t:`${I('AC')} ⊥ ${I('BD')}.`,f:`${I('AC')} = ${I('BD')}.`,why:`Hình thoi có hai đường chéo vuông góc với nhau; hai đường chéo chỉ bằng nhau khi hình thoi là hình vuông, mà ∠BAD = ${al}° ≠ 90°.`},
      {t:`∠${I('ABC')} = ${180-al}°.`,f:`∠${I('ABC')} = ${al}°.`,why:`Hình thoi là hình bình hành nên ∠ABC + ∠BAD = 180°, suy ra ∠ABC = ${180-al}°.`},
      {t:`∠${I('BAC')} = ${al/2}°.`,f:`∠${I('BAC')} = ${al}°.`,why:`AC là tia phân giác của góc BAD nên ∠BAC = ${al}°/2 = ${al/2}°.`},
      {t:`Chu vi hình thoi bằng ${4*a} cm.`,f:`Chu vi hình thoi bằng ${r.pick([2*a,3*a,6*a])} cm.`,why:`Hình thoi có bốn cạnh bằng nhau nên chu vi = 4·${a} = ${4*a} cm.`}
    ],
    chk:()=>al%2===0&&al!==90
  });
});
DS('ds-rect',3,'NB',r=>{
  const [a,b,d]=tri(r,true);
  return mkDS(r,{
    stem:`Cho hình chữ nhật ${I('ABCD')} có ${I('AB')} = ${a} cm, ${I('AD')} = ${b} cm, ${I('AC')} = ${d} cm; hai đường chéo ${I('AC')} và ${I('BD')} cắt nhau tại ${I('O')}. Xét tính đúng sai của các khẳng định sau:`,
    items:[
      {t:`${I('BD')} = ${d} cm.`,f:`${I('BD')} = ${a+b} cm.`,why:`Hình chữ nhật có hai đường chéo bằng nhau nên BD = AC = ${d} cm.`},
      {t:`${I('OA')} = ${d/2} cm.`,f:`${I('OA')} = ${d} cm.`,why:`O là trung điểm của AC nên OA = AC/2 = ${d/2} cm.`},
      {t:`Chu vi hình chữ nhật bằng ${2*(a+b)} cm.`,f:`Chu vi hình chữ nhật bằng ${a+b} cm.`,why:`Chu vi = 2(AB + AD) = 2(${a} + ${b}) = ${2*(a+b)} cm.`},
      {t:`Tam giác ${I('OAB')} cân tại ${I('O')}.`,f:`Tam giác ${I('OAB')} vuông tại ${I('O')}.`,why:`OA = OB (hai đường chéo bằng nhau, cắt nhau tại trung điểm) nên tam giác OAB cân tại O; hai đường chéo không vuông góc vì AB ≠ AD.`}
    ],
    chk:()=>a!==b&&a*a+b*b===d*d&&d%2===0
  });
});
DS('ds-trap',3,'TH',r=>{
  const pickA=()=>r.pick([60,65,70,75,80,100,105,110,115,120]),A=pickA(),B=pickA();
  return mkDS(r,{
    stem:`Cho hình thang ${I('ABCD')} (${I('AB')} // ${I('CD')}) có ∠${I('A')} = ${A}° và ∠${I('B')} = ${B}°. Xét tính đúng sai của các khẳng định sau:`,
    items:[
      {t:`∠${I('D')} = ${180-A}°.`,f:`∠${I('D')} = ${r.pick([A,180-A+10,180-A-10])}°.`,why:`AB // CD nên ∠A + ∠D = 180° (hai góc trong cùng phía), suy ra ∠D = ${180-A}°.`},
      {t:`∠${I('C')} = ${180-B}°.`,f:`∠${I('C')} = ${r.pick([B,180-B+10,180-B-10])}°.`,why:`AB // CD nên ∠B + ∠C = 180°, suy ra ∠C = ${180-B}°.`},
      {t:'Tổng bốn góc của hình thang ABCD bằng 360°.',f:`Tổng bốn góc của hình thang ABCD bằng ${r.pick(['180°','270°','720°'])}.`,why:'Tổng bốn góc của một tứ giác bằng 360°.'},
      {t:'Nếu ∠C = ∠D thì ABCD là hình thang cân.',f:'Nếu AD = BC thì ABCD là hình thang cân.',why:'Hình thang có hai góc kề một đáy bằng nhau là hình thang cân. Hình thang có hai cạnh bên bằng nhau chưa chắc là hình thang cân (có thể là hình bình hành).'}
    ],
    chk:()=>A!==90&&B!==90
  });
});
DS('ds-thales',4,'TH',r=>{
  const {m,n,rr,s,u}=thalesP(r),AM=m*rr,MB=n*rr,AN=m*s,NC=n*s,AC=AN+NC,BC=(m+n)*u,MN=m*u;
  const bump=v=>{let d=r.nz(-2,2);while(v+d<=0)d=r.nz(-2,2);return v+d};
  return mkDS(r,{
    stem:`Cho tam giác ${I('ABC')}, điểm ${I('M')} thuộc ${I('AB')}, điểm ${I('N')} thuộc ${I('AC')} sao cho ${I('MN')} // ${I('BC')}. Biết ${I('AM')} = ${AM} cm, ${I('MB')} = ${MB} cm, ${I('AN')} = ${AN} cm, ${I('BC')} = ${BC} cm. Xét tính đúng sai của các khẳng định sau:`,
    items:[
      {t:`${fr('AM','AB')} = ${fr('AN','AC')}`,f:`${fr('AM','AB')} = ${fr('AN','NC')}`,why:'MN // BC nên theo hệ quả định lí Thalès: AM/AB = AN/AC.'},
      {t:`${I('NC')} = ${NC} cm.`,f:`${I('NC')} = ${bump(NC)} cm.`,why:`AM/MB = AN/NC nên NC = MB·AN/AM = ${MB}·${AN}/${AM} = ${NC} cm.`},
      {t:`${I('AC')} = ${AC} cm.`,f:`${I('AC')} = ${bump(AC)} cm.`,why:`AC = AN + NC = ${AN} + ${NC} = ${AC} cm.`},
      {t:`${I('MN')} = ${MN} cm.`,f:`${I('MN')} = ${bump(MN)} cm.`,why:`MN/BC = AM/AB = ${AM}/${AM+MB} nên MN = ${BC}·${AM}/${AM+MB} = ${MN} cm.`}
    ],
    chk:()=>AM*NC===MB*AN&&MN*(AM+MB)===BC*AM
  });
});
DS('ds-data',5,'NB',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,100,120,160,200]);
  const cnt=pcts.map(p=>N*p/100),names=set.names;
  const order=[0,1,2,3].sort((a,b)=>cnt[b]-cnt[a]);
  const k=r.int(0,3),y=order.find(i=>i!==k),hi=cnt[k]>cnt[y]?[k,y]:[y,k];
  const mostWrong=order[1+r.int(0,2)],useMost=r.chance(.5);
  const bump=v=>{let d=r.nz(-3,3);while(v+d<=0)d=r.nz(-3,3);return v+d};
  const chart=barSVG(names,cnt,{unit:'Số học sinh'});
  return mkDS(r,{
    stem:`Biểu đồ cột dưới đây cho biết ${set.what} của học sinh trong một cuộc khảo sát.<div class="figure">${chart}</div>Xét tính đúng sai của các khẳng định sau:`,
    items:[
      {t:`Có ${N} học sinh tham gia khảo sát.`,f:`Có ${bump(N)} học sinh tham gia khảo sát.`,why:`Tổng số học sinh = ${cnt.join(' + ')} = ${N}.`},
      {t:`Số học sinh chọn “${names[k]}” chiếm ${pcts[k]}% tổng số.`,f:`Số học sinh chọn “${names[k]}” chiếm ${pcts[k]+r.pick([-5,5])}% tổng số.`,why:`${cnt[k]}/${N} = ${pcts[k]}%.`},
      {t:`Số học sinh chọn “${names[hi[0]]}” nhiều hơn số học sinh chọn “${names[hi[1]]}” là ${cnt[hi[0]]-cnt[hi[1]]} học sinh.`,f:`Số học sinh chọn “${names[hi[0]]}” nhiều hơn số học sinh chọn “${names[hi[1]]}” là ${bump(cnt[hi[0]]-cnt[hi[1]])} học sinh.`,why:`${cnt[hi[0]]} − ${cnt[hi[1]]} = ${cnt[hi[0]]-cnt[hi[1]]}.`},
      useMost?{t:`“${names[order[0]]}” là lựa chọn được nhiều học sinh nhất.`,f:`“${names[mostWrong]}” là lựa chọn được nhiều học sinh nhất.`,why:`Cột cao nhất là “${names[order[0]]}” (${cnt[order[0]]} học sinh).`}
             :{t:`“${names[order[3]]}” là lựa chọn được ít học sinh nhất.`,f:`“${names[order[r.int(0,2)]]}” là lựa chọn được ít học sinh nhất.`,why:`Cột thấp nhất là “${names[order[3]]}” (${cnt[order[3]]} học sinh).`}
    ],
    chk:()=>cnt.reduce((a,b)=>a+b,0)===N&&cnt.every(Number.isInteger)
  });
});

/* ================= Phần III: Trắc nghiệm trả lời ngắn ================= */
const TLN=(id,ch,lv,gen)=>reg('tln',id,ch,lv,gen);
TLN('tln-c1-coef',1,'TH',r=>{
  const [tx,ty]=r.pick([[2,1],[1,2],[2,0],[1,1]]);
  const tCoefs=Array.from({length:r.pick([2,3])},()=>r.nz(-6,6));
  const total=tCoefs.reduce((a,b)=>a+b,0);
  if(total===0)return T.tln['tln-c1-coef'].gen(r);
  const others=[[1,0],[0,1],[0,2],[2,2],[0,0]].filter(([a,b])=>!(a===tx&&b===ty));
  const list=r.shuffle(tCoefs.map(c=>({c,ex:tx,ey:ty})).concat(r.shuffle(others).slice(0,2).map(([ex,ey])=>({c:r.nz(-5,5),ex,ey}))));
  return{kind:'tln',stem:`Sau khi thu gọn đa thức ${I('P')} = ${termsHTML(list)}, hệ số của hạng tử ${monoHTML(tx,ty)} bằng bao nhiêu?`,ans:total,unit:'',
    sol:`Cộng các hệ số của các đơn thức đồng dạng ${monoHTML(tx,ty)}: ${tCoefs.map(c=>c<0?'('+sg(c)+')':String(c)).join(' + ')} = ${sg(total)}.`};
});
TLN('tln-c1-const',1,'VD',r=>{
  let a,b;do{a=r.nz(-6,6);b=r.nz(-6,6)}while(a+b===0);
  const e=Pl.sub(Pl.mul(lin(1,a),lin(1,b)),Pl.mul(Pl.m(1,1,0),lin(1,a+b)));
  return{kind:'tln',stem:`Tính giá trị của biểu thức ${I('A')} = ${par(lin(1,a))}${par(lin(1,b))} ${MINUS} ${I('x')}${par(lin(1,a+b))} (kết quả không phụ thuộc vào ${I('x')}).`,ans:a*b,unit:'',
    sol:`${par(lin(1,a))}${par(lin(1,b))} = ${ph(Pl.mul(lin(1,a),lin(1,b)))}; ${I('x')}${par(lin(1,a+b))} = ${ph(Pl.mul(Pl.m(1,1,0),lin(1,a+b)))}. Vậy ${I('A')} = ${sg(a*b)}.`,
    chk:()=>Pl.eq(e,Pl.C(a*b))};
});
TLN('tln-c2-quick',2,'TH',r=>{
  let x,y;
  if(r.chance(.5)){const n=r.pick([2025,1000,500,100,2000,999,1500,300,400,600,750,250]);x=n+1;y=n}
  else{const sum=r.pick([100,50,200,60,80,120,150,90]),d=r.int(2,Math.min(30,sum/2-5));x=(sum+d)/2;y=(sum-d)/2;if(!Number.isInteger(x))return T.tln['tln-c2-quick'].gen(r)}
  return{kind:'tln',stem:`Tính nhanh giá trị của biểu thức ${x}${sup(2)} ${MINUS} ${y}${sup(2)}.`,ans:x*x-y*y,unit:'',
    sol:`${x}² − ${y}² = (${x} − ${y})(${x} + ${y}) = ${x-y}·${x+y} = ${x*x-y*y}.`};
});
TLN('tln-c2-sumprod',2,'VD',r=>{
  const [a,b]=r.shuffle([1,2,3,4,5,6,7,8,9,10,11,12]).slice(0,2),s=a+b,p=a*b;
  if(r.chance(.5))return{kind:'tln',stem:`Cho ${I('x')} + ${I('y')} = ${s} và ${I('xy')} = ${p}. Tính giá trị của biểu thức ${I('x')}${sup(2)} + ${I('y')}${sup(2)}.`,ans:s*s-2*p,unit:'',
    sol:`x² + y² = (x + y)² − 2xy = ${s}² − 2·${p} = ${s*s-2*p}.`};
  return{kind:'tln',stem:`Cho ${I('x')} + ${I('y')} = ${s} và ${I('xy')} = ${p}. Tính giá trị của biểu thức ${I('x')}${sup(3)} + ${I('y')}${sup(3)}.`,ans:s*s*s-3*p*s,unit:'',
    sol:`x³ + y³ = (x + y)³ − 3xy(x + y) = ${s}³ − 3·${p}·${s} = ${s*s*s-3*p*s}.`};
});
TLN('tln-c2-complete',2,'TH',r=>{
  const k=r.pick([1,2,3]),t=r.int(2,7),a=2*k*t;
  return{kind:'tln',stem:`Tìm số dương ${I('a')} để đa thức ${ph(Pl.from([{c:k*k,ex:2,ey:0}]))} + ${I('a')}${I('x')} + ${t*t} là bình phương của một tổng.`,ans:a,unit:'',
    sol:`${k===1?'':k*k}${I('x')}² + ${I('a')}${I('x')} + ${t*t} = (${k===1?'':k}${I('x')})² + ${I('a')}${I('x')} + ${t}² là bình phương của tổng (${k===1?'':k}${I('x')} + ${t})² khi ${I('a')} = 2${k===1?'':'·'+k}·${t} = ${a}.`};
});
TLN('tln-c3-angles',3,'VD',r=>{
  if(r.chance(.5)){
    for(;;){
      const D=r.int(40,85),A=r.int(60,120),B=360-3*D-A;
      if(B<50||B>150)continue;
      return{kind:'tln',stem:`Cho tứ giác ${I('ABCD')} có ∠${I('A')} = ${A}°, ∠${I('B')} = ${B}° và ∠${I('C')} = 2∠${I('D')}. Tính số đo ∠${I('D')} (đơn vị: độ).`,ans:D,unit:'°',
        sol:`∠C + ∠D = 360° − ${A}° − ${B}° = ${360-A-B}°. Mà ∠C = 2∠D nên 3∠D = ${360-A-B}°, suy ra ∠D = ${D}°.`};
    }
  }
  const k=r.pick([10,16,20,24,30,36,40,44,50,56,60,64,70,76,80]),A=(180+k)/2;
  return{kind:'tln',stem:`Cho hình bình hành ${I('ABCD')} có ∠${I('A')} ${MINUS} ∠${I('B')} = ${k}°. Tính số đo ∠${I('A')} (đơn vị: độ).`,ans:A,unit:'°',
    sol:`∠A + ∠B = 180° và ∠A − ∠B = ${k}° nên ∠A = (180° + ${k}°)/2 = ${A}°.`};
});
TLN('tln-c3-len',3,'NB',r=>{
  if(r.chance(.5)){
    const s=r.int(15,30),a=r.int(5,s-5);
    return{kind:'tln',stem:`Cho hình bình hành ${I('ABCD')} có chu vi ${2*s} cm và ${I('AB')} = ${a} cm. Tính độ dài cạnh ${I('BC')} (đơn vị: cm).`,ans:s-a,unit:'cm',
      sol:`Chu vi = 2(AB + BC) = ${2*s} nên AB + BC = ${s}, suy ra BC = ${s} − ${a} = ${s-a} cm.`};
  }
  const k=r.int(4,15);
  return{kind:'tln',stem:`Cho hình chữ nhật ${I('ABCD')} có ${I('O')} là giao điểm của hai đường chéo, ${I('OA')} = ${k} cm. Tính độ dài đường chéo ${I('BD')} (đơn vị: cm).`,ans:2*k,unit:'cm',
    sol:`O là trung điểm của AC nên AC = 2·OA = ${2*k} cm. Hình chữ nhật có hai đường chéo bằng nhau nên BD = AC = ${2*k} cm.`};
});
TLN('tln-c4-thales',4,'TH',r=>{
  if(r.chance(.65)){
    const {m,n,rr,u}=thalesP(r),AM=m*rr,AB=(m+n)*rr,BC=(m+n)*u,MN=m*u;
    return{kind:'tln',stem:`Cho tam giác ${I('ABC')}, ${I('M')} thuộc ${I('AB')}, ${I('N')} thuộc ${I('AC')} sao cho ${I('MN')} // ${I('BC')}. Biết ${I('AM')} = ${AM} cm, ${I('AB')} = ${AB} cm, ${I('BC')} = ${BC} cm. Tính độ dài ${I('MN')} (đơn vị: cm).`,ans:MN,unit:'cm',
      sol:`MN // BC nên ${fr('MN','BC')} = ${fr('AM','AB')}, suy ra MN = ${BC}·${AM}/${AB} = ${MN} cm.`,chk:()=>MN*AB===BC*AM};
  }
  const per=2*r.int(10,30);
  return{kind:'tln',stem:`Cho tam giác ${I('ABC')} có chu vi ${per} cm. Gọi ${I('D')}, ${I('E')}, ${I('F')} lần lượt là trung điểm của ${I('AB')}, ${I('BC')}, ${I('CA')}. Tính chu vi tam giác ${I('DEF')} (đơn vị: cm).`,ans:per/2,unit:'cm',
    sol:`DE, EF, FD là các đường trung bình của tam giác ABC nên mỗi cạnh bằng nửa cạnh tương ứng. Chu vi DEF = ${per}/2 = ${per/2} cm.`};
});
TLN('tln-c5-percent',5,'TH',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,100,120,160,200]),cnt=pcts.map(p=>N*p/100),k=r.int(0,3);
  return{kind:'tln',stem:`Kết quả khảo sát ${set.what} của ${N} học sinh được cho trong bảng sau.${tableHTML(set.names,[cnt])}Hỏi số học sinh chọn “${set.names[k]}” chiếm bao nhiêu phần trăm tổng số học sinh? (đơn vị: %)`,ans:pcts[k],unit:'%',
    sol:`${cnt[k]}/${N} = ${pcts[k]}%.`,chk:()=>cnt.reduce((a,b)=>a+b,0)===N};
});
TLN('tln-c5-bar',5,'NB',r=>{
  const vals=distinctInts(r,5,12,48),mx=Math.max(...vals),mn=Math.min(...vals);
  return{kind:'tln',stem:`Biểu đồ cột dưới đây cho biết số học sinh giỏi của năm lớp khối 8.<div class="figure">${barSVG(CLS,vals,{unit:'Số học sinh giỏi'})}</div>Lớp có nhiều học sinh giỏi nhất hơn lớp có ít học sinh giỏi nhất bao nhiêu học sinh?`,ans:mx-mn,unit:'',
    sol:`${mx} − ${mn} = ${mx-mn}.`};
});

/* ================= Phần IV: Tự luận ================= */
const TL=(id,ch,lv,role,gen,extra)=>reg('tl',id,ch,lv,gen,Object.assign({role},extra||{}));
const ptxt=(arr)=>stepsHTML(arr);
TL('tl-alg1',2,'TH','alg',r=>{
  const p=r.int(1,5),q=r.int(1,5),x0=r.nz(-4,5),rhs=2*p*x0+p*p+q*q;
  const P=Pl.sub(Pl.pow(lin(1,p),2),Pl.mul(lin(1,-q),lin(1,q)));
  const sq=Pl.pow(lin(1,p),2),df=Pl.mul(lin(1,-q),lin(1,q));
  return{kind:'tl',title:'Rút gọn biểu thức và tìm x',parts:[
    {pts:.5,html:`Rút gọn biểu thức ${I('P')} = ${par(lin(1,p))}${sup(2)} ${MINUS} ${par(lin(1,-q))}${par(lin(1,q))}.`},
    {pts:.5,html:`Tìm ${I('x')} biết ${I('P')} = ${rhs}.`}],
    sol:[ptxt([[`P = (${ph(sq)}) − (${ph(df)})`,.25],[`P = ${ph(P)}`,.25]]),
          ptxt([[`${ph(P)} = ${rhs} ⟹ ${2*p}x = ${rhs-p*p-q*q}`,.25],[`x = ${x0}`,.25]])],
    chk:()=>Pl.ev(P,x0,0)===rhs};
});
TL('tl-alg2',2,'TH','alg',r=>{
  const u=r.int(1,4),v=r.pick([2,3]),k=r.pick([2,3,4,5]),c=r.int(2,5);
  const B=Pl.sub(Pl.pow(lin(1,-u),2),Pl.m(v*v,0,2)),Cc=Pl.from([{c:k,ex:3,ey:0},{c:-k*c*c,ex:1,ey:0}]);
  return{kind:'tl',title:'Phân tích đa thức thành nhân tử',parts:[
    {pts:.5,html:`Phân tích đa thức ${I('B')} = ${ph(B)} thành nhân tử.`},
    {pts:.5,html:`Phân tích đa thức ${I('C')} = ${ph(Cc)} thành nhân tử.`}],
    sol:[ptxt([[`B = (${ph(Pl.pow(lin(1,-u),2))}) − ${v*v}${monoHTML(0,2)} = (${I('x')} − ${u})² − (${v}${I('y')})²`,.25],[`B = (x − ${u} − ${v}y)(x − ${u} + ${v}y)`,.25]]),
          ptxt([[`C = ${k}x(x² − ${c*c})`,.25],[`C = ${k}x(x − ${c})(x + ${c})`,.25]])],
    chk:()=>{const F=Pl.mul(Pl.sub(lin(1,-u),Pl.m(v,0,1)),Pl.add(lin(1,-u),Pl.m(v,0,1)));const G=Pl.mul(Pl.m(k,1,0),Pl.mul(lin(1,-c),lin(1,c)));return Pl.eq(F,B)&&Pl.eq(G,Cc)}};
});
TL('tl-alg3',2,'TH','alg',r=>{
  const m=r.int(2,6),D=Pl.from([{c:1,ex:3,ey:0},{c:-m*m,ex:1,ey:0}]);
  return{kind:'tl',title:'Phân tích đa thức và tìm x',parts:[
    {pts:.5,html:`Phân tích đa thức ${I('D')} = ${ph(D)} thành nhân tử.`},
    {pts:.5,html:`Tìm ${I('x')} biết ${I('D')} = 0.`}],
    sol:[ptxt([[`D = x(x² − ${m*m})`,.25],[`D = x(x − ${m})(x + ${m})`,.25]]),
          ptxt([[`x(x − ${m})(x + ${m}) = 0 ⟹ x = 0 hoặc x − ${m} = 0 hoặc x + ${m} = 0`,.25],[`Vậy x = 0; x = ${m}; x = −${m}`,.25]])],
    chk:()=>Pl.eq(Pl.mul(Pl.m(1,1,0),Pl.mul(lin(1,-m),lin(1,m))),D)};
});
TL('tl-alg4',1,'TH','alg',r=>{
  const shapes=r.shuffle([[2,0],[1,0],[0,0],[0,1],[1,1]]).slice(0,3);
  const Q=Pl.from(shapes.map(([ex,ey])=>({c:r.nz(-4,4),ex,ey}))),m={c:r.pick([2,3,4,-2]),ex:2,ey:1},M=Pl.from([m]),P=Pl.mul(Q,M);
  const x0=r.nz(-2,2),y0=r.nz(-2,2),val=Pl.ev(Q,x0,y0);
  return{kind:'tl',title:'Chia đa thức cho đơn thức',parts:[
    {pts:.5,html:`Thực hiện phép chia ${par(P)} : ${termsHTML([m])}.`},
    {pts:.5,html:`Tính giá trị của thương tìm được tại ${I('x')} = ${sg(x0)}, ${I('y')} = ${sg(y0)}.`}],
    sol:[ptxt([[`Chia từng hạng tử của đa thức cho đơn thức ${termsHTML([m])}`,.25],[`Thương: ${ph(Q)}`,.25]]),
          ptxt([[`Thay x = ${sg(x0)}, y = ${sg(y0)} vào ${ph(Q)}`,.25],[`Giá trị bằng ${sg(val)}`,.25]])],
    chk:()=>Pl.eq(Pl.mul(Q,M),P)};
});
TL('tl-garden',1,'VD','real',r=>{
  const a=r.int(1,3),b=r.int(1,3),c=r.int(1,3),d=r.int(1,3),x0=r.int(4,9),y0=r.int(1,4);
  const L=Pl.add(Pl.m(a,1,0),Pl.m(b,0,1)),W=Pl.add(Pl.m(c,1,0),Pl.m(d,0,1));
  const per=Pl.sc(Pl.add(L,W),2),area=Pl.mul(L,W),pv=Pl.ev(per,x0,y0),av=Pl.ev(area,x0,y0);
  return{kind:'tl',title:'Bài toán thực tế (đa thức)',parts:[
    {pts:.5,html:`Một mảnh vườn hình chữ nhật có chiều dài ${par(L)} m và chiều rộng ${par(W)} m (với ${I('x')}, ${I('y')} là các số dương). Viết biểu thức biểu thị chu vi và diện tích của mảnh vườn theo ${I('x')} và ${I('y')}.`},
    {pts:.5,html:`Tính chu vi và diện tích mảnh vườn khi ${I('x')} = ${x0}, ${I('y')} = ${y0}.`}],
    sol:[ptxt([[`Chu vi: 2[(${ph(L)}) + (${ph(W)})] = ${ph(per)} (m)`,.25],[`Diện tích: (${ph(L)})(${ph(W)}) = ${ph(area)} (m²)`,.25]]),
          ptxt([[`Chu vi = ${pv} m`,.25],[`Diện tích = ${av} m²`,.25]])],
    chk:()=>pv===2*((a*x0+b*y0)+(c*x0+d*y0))&&av===(a*x0+b*y0)*(c*x0+d*y0)};
});
TL('tl-field',3,'VD','real',r=>{
  const [a0,b0,c0]=tri(r,false),k=r.pick([2,4,5,10]),a=a0*k,b=b0*k,c=c0*k,save=a+b-c;
  return{kind:'tl',title:'Bài toán thực tế (định lí Pythagore)',parts:[
    {pts:.5,html:`Một sân trường hình chữ nhật ${I('ABCD')} có chiều dài ${I('AB')} = ${a} m và chiều rộng ${I('AD')} = ${b} m. Tính độ dài đường chéo ${I('AC')} của sân.`},
    {pts:.5,html:`An đi từ ${I('A')} đến ${I('C')} theo hai cạnh ${I('AB')}, ${I('BC')}; Bình đi thẳng theo đường chéo ${I('AC')}. Hỏi Bình đi quãng đường ngắn hơn An bao nhiêu mét?`}],
    sol:[ptxt([[`Tam giác ABC vuông tại B nên AC² = AB² + BC² = ${a}² + ${b}² = ${a*a+b*b}`,.25],[`AC = ${c} m`,.25]]),
          ptxt([[`Quãng đường của An: ${a} + ${b} = ${a+b} m`,.25],[`Bình đi ngắn hơn: ${a+b} − ${c} = ${save} m`,.25]])],
    chk:()=>a*a+b*b===c*c};
},{hk:2});

TL('tl-ladder',3,'VD','real',r=>{
  const L=r.pick([25,50]),[p1,p2]=r.shuffle(L===25?[[7,24],[15,20]]:[[14,48],[30,40]]);
  const [d1,h1]=p1,[d2,h2]=p2;
  return{kind:'tl',title:'Bài toán thực tế (định lí Pythagore)',parts:[
    {pts:.5,html:`Một chiếc thang dài ${L} dm dựa vào tường. Chân thang cách chân tường ${d1} dm. Hỏi đầu trên của thang chạm tường ở độ cao bao nhiêu đề-xi-mét?`},
    {pts:.5,html:`Muốn đầu trên của thang chạm tường ở độ cao ${h2} dm (thang vẫn dài ${L} dm) thì phải đặt chân thang cách chân tường bao nhiêu đề-xi-mét?`}],
    sol:[ptxt([[`Thang, tường và mặt đất tạo thành tam giác vuông: h² = ${L}² − ${d1}² = ${L*L-d1*d1}`,.25],[`h = ${h1} dm`,.25]]),
          ptxt([[`d² = ${L}² − ${h2}² = ${L*L-h2*h2}`,.25],[`d = ${d2} dm`,.25]])],
    chk:()=>d1*d1+h1*h1===L*L&&d2*d2+h2*h2===L*L};
},{hk:2});

TL('tl-pond',4,'VD','real',r=>{
  const {m,n,rr,s,u}=thalesP(r),AM=m*rr,MB=n*rr,MN=m*u,BC=(m+n)*u,AN=m*s,NC=n*s;
  return{kind:'tl',title:'Bài toán thực tế (định lí Thalès)',parts:[
    {pts:.5,html:`Để đo khoảng cách giữa hai điểm ${I('B')}, ${I('C')} ở hai bên một cái ao, người ta chọn điểm ${I('A')}, lấy ${I('M')} thuộc ${I('AB')}, ${I('N')} thuộc ${I('AC')} sao cho ${I('MN')} // ${I('BC')}. Đo được ${I('AM')} = ${AM} m, ${I('MB')} = ${MB} m, ${I('MN')} = ${MN} m. Tính khoảng cách ${I('BC')}.`},
    {pts:.5,html:`Biết thêm ${I('AN')} = ${AN} m. Tính độ dài ${I('NC')}.`}],
    sol:[ptxt([[`MN // BC nên ${fr('MN','BC')} = ${fr('AM','AB')} với AB = ${AM} + ${MB} = ${AM+MB} m`,.25],[`BC = ${MN}·${AM+MB}/${AM} = ${BC} m`,.25]]),
          ptxt([[`MN // BC nên ${fr('AM','MB')} = ${fr('AN','NC')}`,.25],[`NC = ${MB}·${AN}/${AM} = ${NC} m`,.25]])],
    chk:()=>MN*(AM+MB)===BC*AM&&AM*NC===MB*AN};
});
TL('tl-data',5,'VD','real',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,100,120,160,200]),cnt=pcts.map(p=>N*p/100);
  let k=r.int(0,3);while(pcts[k]===25)k=(k+1)%4;
  const truth=pcts[k]>25;
  return{kind:'tl',title:'Phân tích dữ liệu',parts:[
    {pts:.5,html:`Kết quả khảo sát ${set.what} của học sinh khối 8 được cho trong bảng sau.${tableHTML(set.names,[cnt])}Tính tổng số học sinh được khảo sát và tỉ lệ phần trăm số học sinh của mỗi lựa chọn.`},
    {pts:.5,html:`Bạn Nam nói: “Số học sinh chọn ${set.names[k]} chiếm hơn một phần tư (25%) tổng số học sinh.” Nhận định của Nam đúng hay sai? Vì sao?`}],
    sol:[ptxt([[`Tổng số học sinh: ${cnt.join(' + ')} = ${N}`,.25],[`Tỉ lệ: ${set.names.map((nm,i)=>`${nm} ${pcts[i]}%`).join('; ')}`,.25]]),
          ptxt([[`${set.names[k]} chiếm ${pcts[k]}%`,.25],[`${pcts[k]}% ${truth?'>':'<'} 25% nên nhận định của Nam là ${truth?'đúng':'sai'}`,.25]])],
    chk:()=>cnt.reduce((a,b)=>a+b,0)===N};
});
/* ---- Hình học ---- */
const GEO_NOTE='Vẽ hình đúng cho từng câu; chấm theo từng ý trong hướng dẫn.';
TL('tl-geo-rect',3,'VD','geo',r=>{
  const c=r.pick([8,10,12,14,16,20,24,26,30]);
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')} vuông tại ${I('A')}, ${I('BC')} = ${c} cm. Gọi ${I('M')} là trung điểm của ${I('BC')}; kẻ ${I('MD')} ⊥ ${I('AB')} tại ${I('D')}, ${I('ME')} ⊥ ${I('AC')} tại ${I('E')}. Chứng minh tứ giác ${I('ADME')} là hình chữ nhật.`},
    {pts:.5,html:`Tính độ dài đoạn thẳng ${I('DE')}.`}],
    sol:[ptxt([[`Tứ giác ADME có ∠DAE = 90° (tam giác ABC vuông tại A), ∠ADM = 90° (MD ⊥ AB), ∠AEM = 90° (ME ⊥ AC)`,.25],[`Tứ giác có ba góc vuông là hình chữ nhật. Vậy ADME là hình chữ nhật`,.25]]),
          ptxt([[`MD // AC (cùng vuông góc với AB) và M là trung điểm BC nên D là trung điểm AB; tương tự E là trung điểm AC`,.25],[`DE là đường trung bình của tam giác ABC nên DE = BC/2 = ${c/2} cm. (Cách khác: DE = AM vì ADME là hình chữ nhật, mà AM = BC/2 vì AM là trung tuyến ứng với cạnh huyền)`,.25]])],
    chk:()=>c%2===0};
});
TL('tl-quad-real',3,'VD','real',r=>{
  for(;;){
    const k=r.pick([10,20,30,40]),D=r.int(40,80),C=D+k,A=r.int(60,120),B=360-A-C-D;
    if(B<50||B>150)continue;
    const a=r.int(30,60),b=r.int(20,40),S=360-A-B;
    return{kind:'tl',title:'Bài toán thực tế (tứ giác)',parts:[
      {pts:.5,html:`Một mảnh đất có dạng tứ giác ${I('ABCD')} với ∠${I('A')} = ${A}°, ∠${I('B')} = ${B}° và ∠${I('C')} lớn hơn ∠${I('D')} là ${k}°. Tính số đo các góc ${I('C')} và ${I('D')} của mảnh đất.`},
      {pts:.5,html:`Một khung ảnh gỗ có dạng hình bình hành ${I('MNPQ')} với ${I('MN')} = ${a} cm, ${I('NP')} = ${b} cm. Tính tổng độ dài các thanh gỗ cần dùng để làm khung (bỏ qua mối ghép).`}],
      sol:[ptxt([[`Tổng bốn góc của tứ giác bằng 360° nên ∠C + ∠D = 360° − ${A}° − ${B}° = ${S}°`,.25],[`Mà ∠C = ∠D + ${k}° nên 2∠D + ${k}° = ${S}°, suy ra ∠D = ${D}° và ∠C = ${C}°`,.25]]),
            ptxt([[`Hình bình hành có các cạnh đối bằng nhau: MN = PQ = ${a} cm, NP = MQ = ${b} cm`,.25],[`Tổng độ dài các thanh gỗ = 2(${a} + ${b}) = ${2*(a+b)} cm`,.25]])],
      chk:()=>A+B+C+D===360&&C-D===k};
  }
});
/* tl-geo-rhombus, tl-geo-para, tl-geo-isos: viết lại trong core8i.js */
TL('tl-geo-thales',4,'VD','geo',r=>{
  const {m,n,rr,s}=thalesP(r),AM=m*rr,MB=n*rr,AN=m*s,NC=n*s;
  return{kind:'tl',title:'Hình học',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I('ABC')}, điểm ${I('M')} thuộc cạnh ${I('AB')}, điểm ${I('N')} thuộc cạnh ${I('AC')} sao cho ${I('MN')} // ${I('BC')}. Biết ${I('AM')} = ${AM} cm, ${I('MB')} = ${MB} cm, ${I('AN')} = ${AN} cm. Tính độ dài ${I('NC')}.`},
    {pts:.5,html:`Qua ${I('N')} kẻ đường thẳng song song với ${I('AB')}, cắt ${I('BC')} tại ${I('P')}. Chứng minh tứ giác ${I('MNPB')} là hình bình hành.`}],
    sol:[ptxt([[`MN // BC nên ${fr('AM','MB')} = ${fr('AN','NC')} (định lí Thalès)`,.25],[`NC = ${MB}·${AN}/${AM} = ${NC} cm`,.25]]),
          ptxt([[`MN // BP (vì MN // BC, P thuộc BC)`,.25],[`NP // MB (vì NP // AB, M thuộc AB). Tứ giác MNPB có hai cặp cạnh đối song song nên là hình bình hành`,.25]])],
    chk:()=>AM*NC===MB*AN};
});
/* tl-geo-rhombus2: viết lại trong core8i.js */
