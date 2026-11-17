/* ===== Toán 11 HK II: bổ sung câu nhận biết (chương VI, VII) và tự luận vận dụng cao (chương VI, VIII, IX) ===== */

/* ----- Chương VI: nhận biết ----- */
N11b('m11-6-log-basic',6,'NB',r=>{
  if(r.chance(.5)){
    const k=r.pick([-3,-2,-1,2,3,4,5]);
    return mkNum(r,{stem:`Giá trị của ln ${I('e')}${sup(sg(k))} bằng`,correct:k,ok:()=>true,cands:[-k,k+1,k-1,k*k,2*k],
      sol:`Vì ln ${I('e')}${sup(sg(k))} = ln ${I('e')}${sup(sg(k))} = ${sg(k)}·ln ${I('e')} = ${sg(k)}·1 = ${sg(k)}.`,chk:()=>Math.abs(Math.log(Math.exp(k))-k)<1e-9});
  }
  const a=r.pick([2,3,5,7]),b=r.int(2,9);
  return mkNum(r,{stem:`Giá trị của ${pw(a,lg(a,b))} bằng`,correct:b,ok:c=>c>0,cands:[b+1,b-1,a*b,a+b,b*b],
    sol:`Theo tính chất ${pw(I('a'),lg(I('a'),I('b')))} = ${I('b')} (${I('a')} > 0, ${I('a')} ≠ 1, ${I('b')} > 0) nên ${pw(a,lg(a,b))} = ${b}.`,chk:()=>Math.abs(Math.pow(a,logv(a,b))-b)<1e-9});
});

/* ----- Chương VII: nhận biết (không thuộc nhóm khoảng cách, thể tích) ----- */
const CUBE_V=['A','B','C','D','A′','B′','C′','D′'];
const CUBE_FACES={
  'ABCD':{perp:['AA′','BB′','CC′','DD′'],inf:['AB','BC','CD','DA','AC','BD'],par:['A′B′','B′C′','C′D′','D′A′','A′C′','B′D′']},
  'A′B′C′D′':{perp:['AA′','BB′','CC′','DD′'],inf:['A′B′','B′C′','C′D′','D′A′','A′C′','B′D′'],par:['AB','BC','CD','DA','AC','BD']},
  'ABB′A′':{perp:['AD','BC','A′D′','B′C′'],inf:['AB','AA′','BB′','A′B′','AB′','A′B'],par:['DC','DD′','CC′','D′C′','DC′','D′C']},
  'DCC′D′':{perp:['AD','BC','A′D′','B′C′'],inf:['DC','DD′','CC′','D′C′','DC′','D′C'],par:['AB','AA′','BB′','A′B′','AB′','A′B']},
  'ADD′A′':{perp:['AB','DC','A′B′','D′C′'],inf:['AD','AA′','DD′','A′D′','AD′','A′D'],par:['BC','BB′','CC′','B′C′','BC′','B′C']},
  'BCC′B′':{perp:['AB','DC','A′B′','D′C′'],inf:['BC','BB′','CC′','B′C′','BC′','B′C'],par:['AD','AA′','DD′','A′D′','AD′','A′D']}
};
N11c('m11-7-cube-perp',7,'NB',r=>{
  const fk=r.pick(Object.keys(CUBE_FACES)),F=CUBE_FACES[fk],ok=r.pick(F.perp);
  const wr=r.shuffle([...F.inf,...F.par,'AC′','BD′'].filter(z=>!F.perp.includes(z))).slice(0,3);
  return mkTxt(r,{stem:`Cho hình lập phương ${I('ABCD.A′B′C′D′')}. Đường thẳng nào sau đây vuông góc với mặt phẳng ${PL7(fk)}?`,correct:I(ok)+'.',wrongs:wr.map(z=>I(z)+'.'),
    sol:`Các mặt của hình lập phương là hình vuông nên ${I(ok)} vuông góc với hai cạnh cắt nhau của mặt phẳng ${PL7(fk)}, do đó ${I(ok)} ⊥ ${PL7(fk)}. Các đường còn lại hoặc nằm trong, hoặc song song với mặt phẳng, hoặc là đường chéo nên không vuông góc.`,
    chk:()=>F.perp.includes(ok)&&wr.every(z=>!F.perp.includes(z))});
});
N11c('m11-7-angle-def',7,'NB',r=>{
  const forms=[
    [`Nếu đường thẳng ${I('d')} vuông góc với mặt phẳng ${PL7('P')} thì góc giữa ${I('d')} và ${PL7('P')} bằng`,90,`Đường thẳng vuông góc với mặt phẳng thì góc giữa chúng bằng 90°.`],
    [`Nếu đường thẳng ${I('d')} song song với mặt phẳng ${PL7('P')} (hoặc nằm trong ${PL7('P')}) thì góc giữa ${I('d')} và ${PL7('P')} bằng`,0,`Đường thẳng song song hoặc nằm trong mặt phẳng thì góc giữa chúng bằng 0°.`],
    [`Góc giữa hai đường thẳng song song bằng`,0,`Hai đường thẳng song song (hoặc trùng nhau) có góc giữa bằng 0°.`],
    [`Góc giữa hai đường thẳng vuông góc với nhau bằng`,90,`Theo định nghĩa, hai đường thẳng vuông góc thì góc giữa chúng bằng 90°.`],
    [`Góc giữa hai mặt phẳng song song bằng`,0,`Hai mặt phẳng song song (hoặc trùng nhau) có góc giữa bằng 0°.`],
    [`Góc giữa hai mặt phẳng vuông góc với nhau bằng`,90,`Theo định nghĩa, hai mặt phẳng vuông góc thì góc giữa chúng bằng 90°.`]
  ];
  const [stem,v,sol]=r.pick(forms);
  const wr=r.shuffle([0,30,45,60,90,180].filter(z=>z!==v));
  return mkTxt(r,{stem,correct:v+'°.',wrongs:wr.map(z=>z+'°.'),sol,chk:()=>v===0||v===90});
});
N11c('m11-7-proj',7,'NB',r=>{
  if(r.chance(.5)){
    return mkTxt(r,{stem:`Cho ${CH_} có ${I('SA')} ⊥ ${PL7('ABCD')}. Hình chiếu vuông góc của điểm ${I('S')} lên mặt phẳng ${PL7('ABCD')} là điểm`,correct:I('A')+'.',wrongs:['B','C','D'].map(z=>I(z)+'.'),
      sol:`Vì ${I('SA')} ⊥ ${PL7('ABCD')} tại ${I('A')} nên ${I('A')} là hình chiếu vuông góc của ${I('S')} lên ${PL7('ABCD')}.`,chk:()=>true});
  }
  const L=r.pick(['SB','SC','SD']),X=L[1],ok='A'+X,wr={B:['AD','BD','AC'],C:['BC','CD','BD'],D:['AB','BD','AC']}[X];
  return mkTxt(r,{stem:`Cho ${CH_} có ${I('SA')} ⊥ ${PL7('ABCD')}. Hình chiếu vuông góc của đường thẳng ${I(L)} lên mặt phẳng ${PL7('ABCD')} là đường thẳng`,correct:I(ok)+'.',wrongs:wr.map(z=>I(z)+'.'),
    sol:`Hình chiếu của ${I('S')} lên ${PL7('ABCD')} là ${I('A')}, hình chiếu của ${I(X)} là chính nó. Vậy hình chiếu của ${I(L)} lên ${PL7('ABCD')} là ${I(ok)}.`,chk:()=>true});
});

/* ----- Tự luận vận dụng cao ----- */
TL11b('tl11-6-vdc',6,'VDC','a',r=>{
  const x=I('x'),a=r.pick([2,3]);
  const [i0,j0]=r.shuffle([1,2,3,4]).slice(0,2),i=Math.min(i0,j0),j=Math.max(i0,j0);
  if(a**j>130)return T.tl['tl11-6-vdc'].gen(r);
  if(r.chance(.5)){
    const S=i+j,P=i*j,cnt=a**j-a**i-1,L=`log${sub(a)} ${x}`,Lq=`log${sub(a)}${sup(2)} ${x}`;
    const eq=`${Lq} ${MINUS} ${S}${L} + ${P}`;
    return{kind:'tl',title:'Phương trình, bất phương trình lôgarit quy về bậc hai',parts:[
      {pts:.5,html:`Giải phương trình ${eq} = 0.`},
      {pts:.5,html:`Có bao nhiêu số nguyên ${x} thỏa mãn bất phương trình ${eq} < 0?`}],
      sol:[ptxt([[`Điều kiện ${x} > 0. Đặt ${I('t')} = ${L}: ${I('t')}${sup(2)} ${MINUS} ${S}${I('t')} + ${P} = 0 ⟺ ${I('t')} = ${i} hoặc ${I('t')} = ${j}.`,.25],[`${L} = ${i} ⟺ ${x} = ${a**i}; ${L} = ${j} ⟺ ${x} = ${a**j}. Tập nghiệm: {${a**i}; ${a**j}}.`,.25]]),
        ptxt([[`${I('t')}${sup(2)} ${MINUS} ${S}${I('t')} + ${P} < 0 ⟺ ${i} < ${I('t')} < ${j} ⟺ ${i} < ${L} < ${j} ⟺ ${a**i} < ${x} < ${a**j}.`,.25],[`Các số nguyên ${x} thỏa mãn là ${a**i+1}, ${a**i+2}, …, ${a**j-1}; có ${a**j} ${MINUS} ${a**i} ${MINUS} 1 = ${cnt} số.`,.25]])],
      chk:()=>{let c=0;for(let n=1;n<=a**j+3;n++){const t=Math.log(n)/Math.log(a);if(t*t-S*t+P<-1e-9)c++}return c===cnt&&Math.abs(i*i-S*i+P)<1e-9&&Math.abs(j*j-S*j+P)<1e-9}};
  }
  const S=a**i+a**j,P=a**(i+j),M=(S/2)**2,e2=`${a}${sup('2'+x)} ${MINUS} ${S}·${a}${sup(x)} + ${I('m')}`;
  return{kind:'tl',title:'Phương trình mũ chứa tham số',parts:[
    {pts:.5,html:`Giải phương trình ${e2} = 0 với ${I('m')} = ${P}.`},
    {pts:.5,html:`Tìm tất cả các giá trị của tham số ${I('m')} để phương trình ${e2} = 0 có hai nghiệm phân biệt.`}],
    sol:[ptxt([[`Đặt ${I('t')} = ${a}${sup(x)} (${I('t')} > 0): ${I('t')}${sup(2)} ${MINUS} ${S}${I('t')} + ${P} = 0 ⟺ ${I('t')} = ${a**i} hoặc ${I('t')} = ${a**j}.`,.25],[`${a}${sup(x)} = ${a**i} ⟺ ${x} = ${i}; ${a}${sup(x)} = ${a**j} ⟺ ${x} = ${j}. Vậy ${x} ∈ {${i}; ${j}}.`,.25]]),
      ptxt([[`Mỗi giá trị ${I('t')} > 0 cho đúng một nghiệm ${x}, nên phương trình đã cho có hai nghiệm phân biệt khi và chỉ khi ${I('t')}${sup(2)} ${MINUS} ${S}${I('t')} + ${I('m')} = 0 có hai nghiệm dương phân biệt.`,.25],[`Điều kiện: Δ = ${S*S} ${MINUS} 4${I('m')} > 0, ${I('m')} > 0 (tích hai nghiệm), tổng ${S} > 0. Suy ra 0 < ${I('m')} < ${fr(S*S,4)} = ${M}. Vậy ${I('m')} ∈ (0; ${M}).`,.25]])],
    chk:()=>{if(S%2!==0)return false;const ok=m=>{const D=S*S-4*m;return D>0&&m>0};return !ok(0)&&ok(M-0.5)&&!ok(M)&&Math.abs(a**(2*i)-S*a**i+P)<1e-9&&Math.abs(a**(2*j)-S*a**j+P)<1e-9}};
});

TL11d('tl11-8-vdc',8,'VDC','b',r=>{
  const [p,q,s]=[r.int(5,9),r.int(5,9),r.int(5,9)],A=EV('A'),B=EV('B'),C=EV('C');
  const one=p*(10-q)*(10-s)+(10-p)*q*(10-s)+(10-p)*(10-q)*s,none=(10-p)*(10-q)*(10-s),atl=1000-none;
  return{kind:'tl',title:'Quy tắc nhân và quy tắc cộng xác suất (ba biến cố độc lập)',parts:[
    {pts:.5,html:`Ba xạ thủ cùng bắn vào một mục tiêu một cách độc lập. Xác suất bắn trúng của ba xạ thủ lần lượt là ${dnum(p/10,1)}; ${dnum(q/10,1)}; ${dnum(s/10,1)}.<br>Tính xác suất để có đúng một xạ thủ bắn trúng.`},
    {pts:.5,html:`Tính xác suất để mục tiêu bị trúng đạn (có ít nhất một xạ thủ bắn trúng).`}],
    sol:[ptxt([[`Gọi ${A}, ${B}, ${C} là các biến cố “xạ thủ thứ nhất, thứ hai, thứ ba bắn trúng”; ba biến cố độc lập. Biến cố “đúng một xạ thủ bắn trúng” là hợp của ba biến cố xung khắc: ${A}${EVb('B')}${EVb('C')}, ${EVb('A')}${B}${EVb('C')}, ${EVb('A')}${EVb('B')}${C}.`,.25],
        [`Xác suất = ${dnum(p/10,1)}·${dnum((10-q)/10,1)}·${dnum((10-s)/10,1)} + ${dnum((10-p)/10,1)}·${dnum(q/10,1)}·${dnum((10-s)/10,1)} + ${dnum((10-p)/10,1)}·${dnum((10-q)/10,1)}·${dnum(s/10,1)} = ${dnum(one/1000,3)}.`,.25]]),
      ptxt([[`Biến cố đối: “không xạ thủ nào bắn trúng” có xác suất ${dnum((10-p)/10,1)}·${dnum((10-q)/10,1)}·${dnum((10-s)/10,1)} = ${dnum(none/1000,3)}.`,.25],[`Xác suất cần tìm: 1 ${MINUS} ${dnum(none/1000,3)} = ${dnum(atl/1000,3)}.`,.25]])],
    chk:()=>{let tot=0,o=0,nn=0;for(let m=0;m<8;m++){const h=[m&1,m>>1&1,m>>2&1],w=(h[0]?p:10-p)*(h[1]?q:10-q)*(h[2]?s:10-s);tot+=w;if(h[0]+h[1]+h[2]===1)o+=w;if(!m)nn=w}return tot===1000&&o===one&&nn===none&&atl===1000-nn}};
});

TL11e('tl11-9-vdc',9,'VDC','b',r=>{
  const a=r.pick([1,-1]),x0=r.int(-2,2),c=r.int(-3,6),d0=r.int(-3,3),b=-3*a*x0,cs=[a,b,c,d0],dd=pd(cs);
  const K=c-3*a*x0*x0,y0=pe(cs,x0),m=y0-K*x0,ext=a>0?'nhỏ nhất':'lớn nhất';
  return{kind:'tl',title:'Hệ số góc tiếp tuyến lớn nhất, nhỏ nhất',parts:[
    {pts:.5,html:`Cho hàm số ${I('y')} = ${I('f')}(${X9}) = ${polyH(cs)} có đồ thị (C).<br>Tìm giá trị ${ext} của hệ số góc các tiếp tuyến của (C) và hoành độ tiếp điểm tương ứng.`},
    {pts:.5,html:`Viết phương trình tiếp tuyến của (C) có hệ số góc ${ext}.`}],
    sol:[ptxt([[`${YP} = ${polyH(dd)} = ${coef(3*a)}${fac(x0)}${sup(2)} ${K<0?MINUS:'+'} ${Math.abs(K)}.`,.25],[`Vì ${coef(3*a)}${fac(x0)}${sup(2)} ${a>0?'≥':'≤'} 0 với mọi ${X9} nên hệ số góc ${ext} bằng ${sg(K)}, đạt được khi ${X9} = ${sg(x0)}.`,.25]]),
      ptxt([[`Tiếp điểm có hoành độ ${sg(x0)}: ${I('y')}${sub(0)} = ${I('f')}(${sg(x0)}) = ${sg(y0)}, hệ số góc k = ${sg(K)}.`,.25],[`Phương trình tiếp tuyến: ${I('y')} = ${sg(K)}(${X9} ${x0<0?'+':MINUS} ${Math.abs(x0)}) ${PL(y0)} hay ${I('y')} = ${xlin(K,m)}.`,.25]])],
    chk:()=>pe(dd,x0)===K&&[-1,1].every(t=>a>0?pe(dd,x0+t)>K:pe(dd,x0+t)<K)};
},'dn');

/* ----- Chương VII: vận dụng (không thuộc nhóm khoảng cách, thể tích) ----- */
TLN11c('t11-7-dih2',7,'VD',r=>{
  const T3=r.pick([[3,4,5,[3,6,9,12,15]],[6,8,10,[6,12,18,24]],[5,12,13,[12,15,24,30]]]),[p,q,c,ks]=T3,k=r.pick(ks),a=I('a');
  const AH=p*q/c,tan=k/AH,ans=Math.round(tan*100)/100;
  if(Math.abs(tan*100-Math.round(tan*100))>1e-9)return T.tln['t11-7-dih2'].gen(r);
  return{kind:'tln',stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình chữ nhật, ${I('AB')} = ${p}${a}, ${I('AD')} = ${q}${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${k}${a}. Tính tan của góc giữa hai mặt phẳng ${PL7('SBD')} và ${PL7('ABCD')} (làm tròn đến hàng phần trăm nếu cần).`,ans,unit:'',
    sol:`Kẻ ${I('AH')} ⊥ ${I('BD')} (${I('H')} ∈ ${I('BD')}). Vì ${I('SA')} ⊥ ${PL7('ABCD')} nên ${I('SA')} ⊥ ${I('BD')}, suy ra ${I('BD')} ⊥ ${PL7('SAH')} và ${I('SH')} ⊥ ${I('BD')}. Do đó góc giữa ${PL7('SBD')} và ${PL7('ABCD')} là ${AG('SHA')}. Ta có ${I('BD')} = ${c}${a}, ${I('AH')} = ${fr(`${I('AB')}·${I('AD')}`,I('BD'))} = ${fr(`${p}${a}·${q}${a}`,`${c}${a}`)} = ${qh(Q(p*q,c))}${a}. Vậy tan${AG('SHA')} = ${fr(I('SA'),I('AH'))} = ${fr(`${k}${a}·${c}${a}`,`${p}${a}·${q}${a}`)} = ${fmt(ans)}.`,
    chk:()=>p*p+q*q===c*c&&Math.abs(AH*c-p*q)<1e-9&&Math.abs(ans-k*c/(p*q))<0.006};
});
TL11c('tl11-7-vd2',7,'VD','c',r=>{
  const a=I('a'),m=r.pick([3,8,15]),n=Math.sqrt(m+1),F=pyrPick(r,true),sq=m===8?`2${a}${rt(2)}`:`${a}${rt(m)}`;
  return{kind:'tl',title:'Hai mặt phẳng vuông góc, góc giữa đường thẳng và mặt phẳng',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${m===8?`2${a}${rt(2)}`:`${a}${rt(m)}`}.${F.fig}Chứng minh ${PL7('SAC')} ⊥ ${PL7('SBD')}.`},
    {pts:.5,html:`Tính tan của góc giữa đường thẳng ${I('SC')} và mặt phẳng ${PL7('SAB')}.`}],
    sol:[ptxt([[`${I('BD')} ⊥ ${I('AC')} (hai đường chéo hình vuông) và ${I('BD')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}) nên ${I('BD')} ⊥ ${PL7('SAC')}.`,.25],[`${I('BD')} ⊂ ${PL7('SBD')} nên ${PL7('SBD')} ⊥ ${PL7('SAC')}.`,.25]]),
      ptxt([[`${I('BC')} ⊥ ${I('AB')} và ${I('BC')} ⊥ ${I('SA')} nên ${I('BC')} ⊥ ${PL7('SAB')}; hình chiếu của ${I('SC')} lên ${PL7('SAB')} là ${I('SB')}, nên góc cần tìm là ${AG('CSB')}.`,.25],[`${I('SB')} = ${rt(`${I('SA')}${sup(2)} + ${I('AB')}${sup(2)}`)} = ${n}${a}; tan${AG('CSB')} = ${fr(I('BC'),I('SB'))} = ${fr(a,`${n}${a}`)} = ${fr(1,n)}.`,.25]])],
    chk:()=>{const S=[0,0,Math.sqrt(m)],C=[1,1,0],v=[C[0]-S[0],C[1]-S[1],C[2]-S[2]],sn=Math.abs(v[1])/Math.hypot(...v);return Gp.pp(F.g,'SAC','SBD')&&Math.abs(sn/Math.sqrt(1-sn*sn)-1/n)<1e-9&&Number.isInteger(n)}};
});
