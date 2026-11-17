/* ================================================================
   LỚP 11 – Học kì II – Chương VII: Quan hệ vuông góc trong không gian
   Hình vẽ dựng từ toạ độ 3D thật, nét khuất tự suy ra từ các mặt của khối;
   các khẳng định về vuông góc đều được kiểm tra số bằng Geo.
   Thẻ sec: vg (đường – mặt vuông góc), mm (hai mặt phẳng vuông góc), goc (góc), kc (khoảng cách), tt (thể tích).
   ================================================================ */
const N11c=(id,ch,lv,gen,sec)=>reg('nlc',id,ch,lv,gen,{g:11,hk:2,sec});
const DS11c=(id,ch,lv,gen,sec)=>reg('ds',id,ch,lv,gen,{g:11,hk:2,sec});
const TLN11c=(id,ch,lv,gen,sec)=>reg('tln',id,ch,lv,gen,{g:11,hk:2,sec});
const TL11c=(id,ch,lv,role,gen,sec)=>reg('tl',id,ch,lv,gen,{role,g:11,hk:2,sec});
const VIEWD=[-0.42,1,-0.5];
/* Nét khuất: một cạnh bị khuất khi mọi mặt kề nó đều quay lưng về phía người nhìn. */
function autoEdges(P,faces){
  const names=[...new Set(faces.flat())],sum=l=>l.reduce((s,p)=>V3.add(s,p),[0,0,0]);
  const C=V3.mul(sum(names.map(n=>P[n])),1/names.length),em=new Map();
  faces.forEach(f=>{
    let n=V3.cross(V3.sub(P[f[1]],P[f[0]]),V3.sub(P[f[2]],P[f[0]]));
    const fc=V3.mul(sum(f.map(k=>P[k])),1/f.length);if(V3.dot(n,V3.sub(fc,C))<0)n=V3.mul(n,-1);
    const back=V3.dot(n,VIEWD)>1e-9;
    f.forEach((u,i)=>{const w=f[(i+1)%f.length],k=[u,w].sort().join('|');if(!em.has(k))em.set(k,{e:[u,w],b:[]});em.get(k).b.push(back)});
  });
  const solid=[],dashed=[];em.forEach(v=>(v.b.every(Boolean)?dashed:solid).push(v.e));
  return{solid,dashed};
}
/* Hình chóp S.ABCD, đáy chữ nhật AB = a, AD = b, SA ⊥ (ABCD), SA = h */
function pyrSA(a,b,h){
  const P={A:[0,0,0],B:[a,0,0],C:[a,b,0],D:[0,b,0],S:[0,0,h]};
  return{P,...autoEdges(P,[['A','B','C','D'],['S','A','B'],['S','B','C'],['S','C','D'],['S','D','A']])};
}
function pyrPick(r,sq){
  if(sq===undefined)sq=r.chance(.5);
  const a=sq?3.6:4.4,b=sq?3.6:3,h=r.pick([4.2,4.8,5.4]),F=pyrSA(a,b,h);
  return{...F,sq,base:sq?'hình vuông':'hình chữ nhật',g:Geo(F.P),fig:fig3D(F.P,F.solid,F.dashed,['S','A','B','C','D'])};
}
const Gp={
  ll:(g,l1,l2)=>Math.abs(V3.dot(g.dir(l1[0],l1[1]),g.dir(l2[0],l2[1])))<E3,
  lp:(g,l,pl)=>V3.len(V3.cross(g.dir(l[0],l[1]),g.nrm([...pl])))<E3,
  pp:(g,p,q)=>Math.abs(V3.dot(g.nrm([...p]),g.nrm([...q])))<E3
};
const LN7=s=>I(s),PL7=s=>`(${I(s)})`,AG=s=>`∠${I(s)}`;
const SAG={SB:'SBA',SC:'SCA',SD:'SDA'};
const CH_=`hình chóp ${I('S.ABCD')}`;

N11c('m11-7-sa',7,'NB',r=>{
  const F=pyrPick(r),g=F.g,LINES=['SA','SB','SC','SD','AB','BC','CD','AD','AC','BD'];
  const planes=['SAB','SAD','ABCD'];if(F.sq)planes.push('SAC');
  const pl=r.pick(planes),good=LINES.filter(l=>Gp.lp(g,l,pl)),bad=LINES.filter(l=>!good.includes(l));
  const ok=r.pick(good),e1=pl==='SAB'?'AB':'AD';
  const sol=pl==='ABCD'?`Theo giả thiết, ${I('SA')} ⊥ ${PL7('ABCD')}.`:pl==='SAC'?`${I('BD')} ⊥ ${I('AC')} (hai đường chéo của hình vuông) và ${I('BD')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}); hai đường thẳng ${I('AC')}, ${I('SA')} cắt nhau trong ${PL7('SAC')} nên ${I('BD')} ⊥ ${PL7('SAC')}.`
    :`${LN7(ok)} ⊥ ${LN7(e1)} (đáy là ${F.base}) và ${LN7(ok)} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}); hai đường thẳng ${LN7(e1)}, ${I('SA')} cắt nhau trong ${PL7(pl)} nên ${LN7(ok)} ⊥ ${PL7(pl)}.`;
  return mkTxt(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là ${F.base}, ${I('SA')} ⊥ ${PL7('ABCD')}. Đường thẳng nào sau đây vuông góc với mặt phẳng ${PL7(pl)}?${F.fig}`,
    correct:LN7(ok)+'.',wrongs:r.shuffle(bad).slice(0,3).map(l=>LN7(l)+'.'),sol,chk:()=>bad.length>=3&&good.includes(ok)});
});
N11c('m11-7-perp-lines',7,'TH',r=>{
  const F=pyrPick(r,true),g=F.g,tg=r.pick(['BD','AC']),LINES=['SA','SB','SC','SD','AB','BC','CD','AD','AC','BD'].filter(l=>l!==tg);
  const good=LINES.filter(l=>Gp.ll(g,tg,l)),bad=LINES.filter(l=>!good.includes(l)),ok=r.pick(good),other=tg==='BD'?'AC':'BD';
  const why=ok===other?`Hai đường chéo của hình vuông vuông góc với nhau.`:ok==='SA'?`${I('SA')} ⊥ ${PL7('ABCD')} nên ${I('SA')} vuông góc với mọi đường thẳng nằm trong ${PL7('ABCD')}, trong đó có ${LN7(tg)}.`
    :`${LN7(tg)} ⊥ ${LN7(other)} và ${LN7(tg)} ⊥ ${I('SA')} nên ${LN7(tg)} ⊥ ${PL7('SAC')}, suy ra ${LN7(tg)} ⊥ ${I('SC')}.`;
  return mkTxt(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là hình vuông, ${I('SA')} ⊥ ${PL7('ABCD')}. Đường thẳng nào sau đây vuông góc với đường thẳng ${LN7(tg)}?`,correct:LN7(ok)+'.',wrongs:r.shuffle(bad).slice(0,3).map(l=>LN7(l)+'.'),sol:why,chk:()=>bad.length>=3&&good.length>=2});
});
N11c('m11-7-mm',7,'NB',r=>{
  const F=pyrPick(r),g=F.g,PLS=['SAB','SAD','SAC','SBC','SCD','SBD'],good=PLS.filter(p=>Gp.pp(g,p,'ABCD')),bad=PLS.filter(p=>!good.includes(p));
  const ok=r.pick(good);
  return mkTxt(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là ${F.base}, ${I('SA')} ⊥ ${PL7('ABCD')}. Mặt phẳng nào sau đây vuông góc với mặt phẳng ${PL7('ABCD')}?${F.fig}`,correct:PL7(ok)+'.',wrongs:r.shuffle(bad).slice(0,3).map(p=>PL7(p)+'.'),
    sol:`${PL7(ok)} chứa đường thẳng ${I('SA')} mà ${I('SA')} ⊥ ${PL7('ABCD')} nên ${PL7(ok)} ⊥ ${PL7('ABCD')}. Các mặt phẳng còn lại không chứa ${I('SA')} (và không chứa đường thẳng nào vuông góc với đáy).`,chk:()=>good.length===3&&bad.length===3});
});
N11c('m11-7-angle-lp',7,'TH',r=>{
  const F=pyrPick(r),L=r.pick(['SB','SC','SD']),X=L[1],ok=SAG[L];
  const wr={SB:['SBC','BSA','SBD'],SC:['SCB','SCD','CSA'],SD:['SDC','DSA','SDB']}[L];
  return mkTxt(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là ${F.base}, ${I('SA')} ⊥ ${PL7('ABCD')}. Góc giữa đường thẳng ${LN7(L)} và mặt phẳng ${PL7('ABCD')} là góc${F.fig}`,correct:AG(ok)+'.',wrongs:wr.map(w=>AG(w)+'.'),
    sol:`${I('SA')} ⊥ ${PL7('ABCD')} nên ${I('A')} là hình chiếu vuông góc của ${I('S')} trên ${PL7('ABCD')}, và hình chiếu của ${LN7(L)} trên ${PL7('ABCD')} là ${LN7('A'+X)}. Vậy góc giữa ${LN7(L)} và ${PL7('ABCD')} là ${AG(ok)}.`});
});
N11c('m11-7-angle-calc',7,'TH',r=>{
  const phi=r.pick([30,45,60]),L=r.pick(['SB','SC','SD']),a=I('a'),isC=L==='SC';
  /* SA = a·tan φ (SB, SD) hoặc a√2·tan φ (SC) */
  const SAT={30:{B:[fr(`${a}${rt(3)}`,3),1/Math.sqrt(3)],C:[fr(`${a}${rt(6)}`,3),Math.sqrt(2/3)]},45:{B:[a,1],C:[`${a}${rt(2)}`,Math.SQRT2]},60:{B:[`${a}${rt(3)}`,Math.sqrt(3)],C:[`${a}${rt(6)}`,Math.sqrt(6)]}}[phi][isC?'C':'B'];
  const AB=isC?`${a}${rt(2)}`:a,tn=phi===45?'1':phi===30?fr(1,rt(3)):rt(3);
  return mkNum(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SAT[0]}. Góc giữa đường thẳng ${LN7(L)} và mặt phẳng ${PL7('ABCD')} bằng`,correct:phi,ok:()=>true,f:v=>v+'°',cands:[30,45,60,90,75],
    sol:`Hình chiếu của ${LN7(L)} trên ${PL7('ABCD')} là ${LN7('A'+L[1])}, nên góc cần tìm là ${AG(SAG[L])}. Ta có tan${AG(SAG[L])} = ${fr(I('SA'),LN7('A'+L[1]))} = ${fr(SAT[0],AB)} = ${tn}, suy ra góc bằng ${phi}°.`,
    chk:()=>Math.abs(Math.atan(SAT[1]/(isC?Math.SQRT2:1))*180/Math.PI-phi)<1e-9});
});
N11c('m11-7-dihedral',7,'TH',r=>{
  const F=pyrPick(r),pl=r.pick(['SBC','SCD']),ok=pl==='SBC'?'SBA':'SDA',e=pl==='SBC'?'BC':'CD',wr=pl==='SBC'?['SBC','SCB','SAB']:['SDC','SCD','SAD'];
  return mkTxt(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là hình chữ nhật, ${I('SA')} ⊥ ${PL7('ABCD')}. Góc giữa hai mặt phẳng ${PL7(pl)} và ${PL7('ABCD')} là góc${pyrPick(r,false).fig}`,correct:AG(ok)+'.',wrongs:wr.map(w=>AG(w)+'.'),
    sol:`${PL7(pl)} ∩ ${PL7('ABCD')} = ${LN7(e)}. Ta có ${LN7(e)} ⊥ ${LN7(pl==='SBC'?'AB':'AD')} và ${LN7(e)} ⊥ ${I('SA')} nên ${LN7(e)} ⊥ ${PL7(pl==='SBC'?'SAB':'SAD')}, suy ra ${LN7(e)} ⊥ ${LN7(pl==='SBC'?'SB':'SD')}. Vậy góc giữa hai mặt phẳng là góc giữa ${LN7(pl==='SBC'?'AB':'AD')} và ${LN7(pl==='SBC'?'SB':'SD')}, tức là ${AG(ok)}.`});
});
/* Góc giữa hai đường thẳng trong hình lập phương ABCD.A′B′C′D′ (có xoay tên đỉnh để đa dạng) */
const CUBE_PT={A:[0,0,0],B:[1,0,0],C:[1,1,0],D:[0,1,0],'A′':[0,0,1],'B′':[1,0,1],'C′':[1,1,1],'D′':[0,1,1]};
const rotL=(s,i)=>s.replace(/[ABCD]/g,ch=>'ABCD'[('ABCD'.indexOf(ch)+i)%4]);
const cubeVec=l=>{const a=l.match(/[A-D]′?/g);return V3.sub(CUBE_PT[a[1]],CUBE_PT[a[0]])};
const cubeAng=(l1,l2)=>{const u=cubeVec(l1),v=cubeVec(l2);return Math.round(Math.acos(Math.min(1,Math.abs(V3.dot(u,v))/(V3.len(u)*V3.len(v))))*180/Math.PI*1e6)/1e6};
const CUBE_PAT=[
  ['AC','B′D′',90,'AC ⊥ BD (hai đường chéo của hình vuông ABCD) và BD ∥ B′D′ nên AC ⊥ B′D′'],
  ['AB′','AD′',60,'Tam giác AB′D′ có AB′ = AD′ = B′D′ (đều là đường chéo của các hình vuông bằng nhau) nên là tam giác đều'],
  ['AC','A′B′',45,'A′B′ ∥ AB nên góc giữa AC và A′B′ bằng góc giữa AC và AB, tức là ∠CAB = 45° (tam giác ABC vuông cân tại B)'],
  ['AB','A′D′',90,'A′D′ ∥ AD mà AB ⊥ AD nên AB ⊥ A′D′'],
  ['AB′','BC′',60,'BC′ ∥ AD′ nên góc giữa AB′ và BC′ bằng góc giữa AB′ và AD′; tam giác AB′D′ đều nên góc bằng 60°'],
  ['A′C′','BD',90,'A′C′ ∥ AC mà AC ⊥ BD (hai đường chéo của hình vuông ABCD) nên A′C′ ⊥ BD'],
  ['BD′','AC',90,'AC ⊥ BD và AC ⊥ BB′ nên AC ⊥ (BB′D′D), suy ra AC ⊥ BD′'],
  ['AB′','CD′',90,'CD′ ∥ BA′ mà AB′ ⊥ BA′ (hai đường chéo của hình vuông ABB′A′) nên AB′ ⊥ CD′']
];
N11c('m11-7-angle-ll',7,'TH',r=>{
  const [l1,l2,phi,why]=r.pick(CUBE_PAT),i=r.int(0,3),a=rotL(l1,i),b=rotL(l2,i),w=rotL(why,i);
  return mkNum(r,{stem:`Cho hình lập phương ${I('ABCD.A′B′C′D′')}. Số đo góc giữa hai đường thẳng ${LN7(a)} và ${LN7(b)} bằng`,correct:phi,ok:()=>true,f:v=>v+'°',cands:[30,45,60,90,0],
    sol:`${w}. Vậy góc giữa hai đường thẳng đó bằng ${phi}°.`,chk:()=>Math.abs(cubeAng(a,b)-phi)<1e-6});
});
const TH7=[
  [`Nếu đường thẳng ${I('d')} vuông góc với hai đường thẳng cắt nhau cùng nằm trong mặt phẳng (${I('P')}) thì ${I('d')} ⊥ (${I('P')})`,`Nếu đường thẳng ${I('d')} vuông góc với một đường thẳng nằm trong mặt phẳng (${I('P')}) thì ${I('d')} ⊥ (${I('P')})`],
  [`Hai mặt phẳng cùng vuông góc với một đường thẳng thì song song hoặc trùng nhau`,`Hai mặt phẳng cùng vuông góc với một mặt phẳng thì song song với nhau`],
  [`Nếu ${I('d')} ⊥ (${I('P')}) và mặt phẳng (${I('Q')}) chứa ${I('d')} thì (${I('Q')}) ⊥ (${I('P')})`,`Nếu ${I('d')} ∥ (${I('P')}) và mặt phẳng (${I('Q')}) chứa ${I('d')} thì (${I('Q')}) ⊥ (${I('P')})`],
  [`Nếu ${I('d')} ⊥ (${I('P')}) thì ${I('d')} vuông góc với mọi đường thẳng nằm trong (${I('P')})`,`Nếu (${I('P')}) ⊥ (${I('Q')}) thì mọi đường thẳng nằm trong (${I('P')}) đều vuông góc với (${I('Q')})`],
  [`Nếu đường thẳng ${I('d')} vuông góc với mặt phẳng (${I('P')}) thì góc giữa ${I('d')} và (${I('P')}) bằng 90°`,`Nếu đường thẳng ${I('d')} vuông góc với mặt phẳng (${I('P')}) thì góc giữa ${I('d')} và (${I('P')}) bằng 0°`],
  [`Qua một điểm cho trước có duy nhất một mặt phẳng vuông góc với một đường thẳng cho trước`,`Qua một điểm cho trước có duy nhất một đường thẳng vuông góc với một đường thẳng cho trước`],
  [`Nếu ${I('a')} ∥ ${I('b')} và ${I('b')} ⊥ (${I('P')}) thì ${I('a')} ⊥ (${I('P')})`,`Nếu ${I('a')} ∥ (${I('P')}) và ${I('b')} ⊥ (${I('P')}) thì ${I('a')} ∥ ${I('b')}`],
  [`Nếu hai mặt phẳng cắt nhau cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng vuông góc với mặt phẳng thứ ba`,`Nếu hai mặt phẳng cắt nhau cùng vuông góc với mặt phẳng thứ ba thì giao tuyến của chúng song song với mặt phẳng thứ ba`]
];
N11c('m11-7-theory',7,'NB',r=>{
  const want=r.chance(.6),[T1,F1]=r.pick(TH7),others=r.shuffle(TH7.filter(z=>z[0]!==T1));
  return mkTxt(r,{stem:`Trong không gian, khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:(want?T1:F1)+'.',wrongs:others.slice(0,3).map(z=>(want?z[1]:z[0])+'.'),
    sol:want?`Khẳng định đúng: “${T1}”. Ba khẳng định còn lại đều sai.`:`Khẳng định sai: “${F1}”. Phát biểu đúng là: “${T1}”.`});
});
N11c('m11-7-dist',7,'NB',r=>{
  const a=r.int(3,8),b=r.int(3,8),h=r.int(3,9),F=pyrPick(r,false);
  const Q1=[[`khoảng cách từ điểm ${I('S')} đến mặt phẳng ${PL7('ABCD')}`,h,`${I('SA')} ⊥ ${PL7('ABCD')} nên khoảng cách bằng ${I('SA')} = ${h}.`],
    [`khoảng cách từ điểm ${I('B')} đến đường thẳng ${I('SA')}`,a,`${I('AB')} ⊥ ${I('SA')} (vì ${I('SA')} ⊥ ${PL7('ABCD')}) nên khoảng cách bằng ${I('AB')} = ${a}.`],
    [`khoảng cách từ điểm ${I('D')} đến mặt phẳng ${PL7('SAB')}`,b,`${I('AD')} ⊥ ${PL7('SAB')} nên khoảng cách bằng ${I('AD')} = ${b}.`],
    [`khoảng cách từ điểm ${I('C')} đến mặt phẳng ${PL7('SAD')}`,a,`${I('CD')} ⊥ ${PL7('SAD')} nên khoảng cách bằng ${I('CD')} = ${I('AB')} = ${a}.`],
    [`khoảng cách giữa hai đường thẳng ${I('AB')} và ${I('CD')}`,b,`${I('AB')} ∥ ${I('CD')} và ${I('AD')} vuông góc với cả hai, nên khoảng cách bằng ${I('AD')} = ${b}.`]];
  const [what,v,sol]=r.pick(Q1);
  return mkNum(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là hình chữ nhật với ${I('AB')} = ${a}, ${I('AD')} = ${b}; ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${h}. Tính ${what}.`,correct:v,cands:[a,b,h,a+b,Math.round(Math.hypot(a,h))],sol});
},'kc');
N11c('m11-7-vol',7,'TH',r=>{
  const a=r.int(3,8),b=r.int(3,8),h=r.int(3,9),V=Q(a*b*h,3);
  return mkF(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là hình chữ nhật với ${I('AB')} = ${a}, ${I('AD')} = ${b}; ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${h}. Thể tích của khối chóp ${I('S.ABCD')} bằng`,correct:V,cands:[Q(a*b*h),Q(a*b*h,2),Q(a*b*h,6),Q(a*b+h,3)],
    sol:`Chiều cao của khối chóp là ${I('SA')} = ${h}, diện tích đáy ${I('S')}${sub('ABCD')} = ${a}·${b} = ${a*b}. Thể tích ${I('V')} = ${fr(1,3)}·${a*b}·${h} = ${qh(V)}.`,chk:()=>qv(V)===a*b*h/3});
},'tt');
N11c('m11-7-vol-prism',7,'TH',r=>{
  const a=r.int(3,9),b=r.int(3,9),h=r.int(3,9),V=Q(a*b*h,2);
  return mkF(r,{stem:`Cho lăng trụ đứng ${I('ABC.A′B′C′')} có đáy ${I('ABC')} là tam giác vuông tại ${I('A')}, ${I('AB')} = ${a}, ${I('AC')} = ${b}, ${I('AA′')} = ${h}. Thể tích của khối lăng trụ bằng`,correct:V,cands:[Q(a*b*h),Q(a*b*h,3),Q(a*b*h,6),Q(a*b+h)],
    sol:`Diện tích đáy ${I('S')}${sub('ABC')} = ${fr(1,2)}·${a}·${b} = ${qh(Q(a*b,2))}; chiều cao ${I('AA′')} = ${h}. Thể tích ${I('V')} = ${I('S')}${sub('ABC')}·${h} = ${qh(V)}.`,chk:()=>qv(V)===a*b*h/2});
},'tt');
const PYT=[[3,4],[4,3],[6,8],[8,6],[5,12],[12,5],[9,12],[12,9],[8,15],[15,8]];
N11c('m11-7-dist-calc',7,'VD',r=>{
  const [a,h]=r.pick(PYT),c=Math.round(Math.hypot(a,h)),v=Q(a*h,c);
  return mkF(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là hình chữ nhật, ${I('AB')} = ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${h}. Khoảng cách từ điểm ${I('A')} đến mặt phẳng ${PL7('SBC')} bằng`,correct:v,cands:[Q(a*h,a+h),Q(a+h,2),Q(a*h),Q(h*c,a),Q(a*c,h)],
    sol:`${I('BC')} ⊥ ${PL7('SAB')} nên ${PL7('SBC')} ⊥ ${PL7('SAB')}. Kẻ ${I('AH')} ⊥ ${I('SB')} (${I('H')} ∈ ${I('SB')}) thì ${I('AH')} ⊥ ${PL7('SBC')}, nên d(${I('A')}, ${PL7('SBC')}) = ${I('AH')}. Trong tam giác vuông ${I('SAB')}: ${fr(1,'AH²')} = ${fr(1,'SA²')} + ${fr(1,'AB²')} ⟹ ${I('AH')} = ${fr(`${a}·${h}`,rt(`${a}² + ${h}²`))} = ${fr(a*h,c)} = ${qh(v)}.`,
    chk:()=>Math.abs(a*h/Math.hypot(a,h)-qv(v))<1e-9});
},'kc');
N11c('m11-7-vol2',7,'VD',r=>{
  const L=r.pick(['SB','SC']),phi=r.pick([45,60]),a=I('a'),k={SB:{45:['',1],60:[rt(3),Math.sqrt(3)]},SC:{45:[rt(2),Math.SQRT2],60:[rt(6),Math.sqrt(6)]}}[L][phi];
  const H=z=>fr(`${a}${sup(3)}${z[0]}`,3),ALL=[['',1],[rt(3),Math.sqrt(3)],[rt(2),Math.SQRT2],[rt(6),Math.sqrt(6)]];
  const wr=ALL.filter(z=>z[1]!==k[1]).map(H);
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')}, góc giữa đường thẳng ${LN7(L)} và mặt phẳng ${PL7('ABCD')} bằng ${phi}°. Thể tích khối chóp ${I('S.ABCD')} bằng`,correct:H(k),wrongs:wr,
    sol:`Góc giữa ${LN7(L)} và ${PL7('ABCD')} là ${AG(SAG[L])} = ${phi}°, nên ${I('SA')} = ${L==='SC'?`${I('AC')}·tan${phi}° = ${a}${rt(2)}·tan${phi}°`:`${I('AB')}·tan${phi}° = ${a}·tan${phi}°`} = ${a}${k[0]}. Thể tích ${I('V')} = ${fr(1,3)}·${a}${sup(2)}·${I('SA')} = ${H(k)}.`,
    chk:()=>{const sa=(L==='SC'?Math.SQRT2:1)*Math.tan(phi*Math.PI/180);return Math.abs(sa-k[1])<1e-9}});
},'tt');

/* ----- Đúng/sai chương VII ----- */
const stSA={lp:(l,p)=>`Đường thẳng ${LN7(l)} vuông góc với mặt phẳng ${PL7(p)}`,ll:(l1,l2)=>`Hai đường thẳng ${LN7(l1)} và ${LN7(l2)} vuông góc với nhau`,pp:(p,q)=>`Mặt phẳng ${PL7(p)} vuông góc với mặt phẳng ${PL7(q)}`};
const evSA=(g,s)=>s[0]==='lp'?Gp.lp(g,s[1],s[2]):s[0]==='ll'?Gp.ll(g,s[1],s[2]):Gp.pp(g,s[1],s[2]);
DS11c('ds11-7-sa',7,'TH',r=>{
  const F=pyrPick(r),g=F.g,I1=(t,f,why)=>({ts:t,fs:f,t:stSA[t[0]](...t.slice(1)),f:stSA[f[0]](...f.slice(1)),why});
  const pool=[
    I1(['lp','BC','SAB'],['lp','BC','SAC'],`${I('BC')} ⊥ ${I('AB')} và ${I('BC')} ⊥ ${I('SA')} nên ${I('BC')} ⊥ ${PL7('SAB')}; còn ${I('BC')} không vuông góc với ${I('AC')} nên không vuông góc với ${PL7('SAC')}.`),
    I1(['lp','CD','SAD'],['lp','CD','SAB'],`${I('CD')} ⊥ ${I('AD')} và ${I('CD')} ⊥ ${I('SA')} nên ${I('CD')} ⊥ ${PL7('SAD')}.`),
    I1(['lp','SA','ABCD'],['lp','SB','ABCD'],`Theo giả thiết ${I('SA')} ⊥ ${PL7('ABCD')}; ${I('SB')} không vuông góc với ${I('AB')} nên không vuông góc với đáy.`),
    I1(['ll','SA','BD'],['ll','SC','AD'],`${I('SA')} ⊥ ${PL7('ABCD')} nên ${I('SA')} ⊥ ${I('BD')}; còn ${I('SC')} không vuông góc với ${I('AD')}.`),
    I1(['pp','SAB','ABCD'],['pp','SBC','ABCD'],`${PL7('SAB')} chứa ${I('SA')} ⊥ ${PL7('ABCD')} nên ${PL7('SAB')} ⊥ ${PL7('ABCD')}; ${PL7('SBC')} không chứa đường thẳng nào vuông góc với đáy.`),
    I1(['pp','SAB','SBC'],['pp','SAB','SCD'],`${I('BC')} ⊥ ${PL7('SAB')} mà ${I('BC')} ⊂ ${PL7('SBC')} nên ${PL7('SBC')} ⊥ ${PL7('SAB')}.`)
  ];
  if(F.sq){pool.push(I1(['pp','SAC','SBD'],['pp','SAC','SAB'],`${I('BD')} ⊥ ${PL7('SAC')} mà ${I('BD')} ⊂ ${PL7('SBD')} nên ${PL7('SBD')} ⊥ ${PL7('SAC')}.`));pool.push(I1(['ll','AC','BD'],['ll','AC','SB'],`Hai đường chéo của hình vuông vuông góc với nhau; ${I('AC')} không vuông góc với ${I('SB')}.`))}
  const items=r.shuffle(pool).slice(0,4);
  return mkDS(r,{stem:`Cho ${CH_} có đáy ${I('ABCD')} là ${F.base}, ${I('SA')} ⊥ ${PL7('ABCD')}. Xét tính đúng sai của các khẳng định sau:${F.fig}`,items,chk:()=>items.every(it=>evSA(g,it.ts)===true&&evSA(g,it.fs)===false)});
});
DS11c('ds11-7-angle',7,'TH',r=>{
  const c=r.pick([[1,'',1],[Math.SQRT2,rt(2),2],[Math.sqrt(3),rt(3),3],[Math.sqrt(6),rt(6),6]]),a=I('a'),cv=c[0],cH=c[1],SA=`${a}${cH}`;
  const tanB=c[2]===1?'1':rt(c[2]),tanC={1:fr(rt(2),2),2:'1',3:fr(rt(6),2),6:rt(3)}[c[2]],tanCv=cv/Math.SQRT2;
  const SCh={1:`${a}${rt(3)}`,2:`2${a}`,3:`${a}${rt(5)}`,6:`2${a}${rt(2)}`}[c[2]],SCv=Math.sqrt(cv*cv+2),volH=fr(`${a}${sup(3)}${cH}`,3);
  const items=[
    {t:`Tang của góc giữa ${I('SB')} và ${PL7('ABCD')} bằng ${tanB}`,f:`Tang của góc giữa ${I('SB')} và ${PL7('ABCD')} bằng ${fr(tanB,2)}`,why:`tan∠SBA = SA/AB = ${SA}/${a} = ${tanB}.`},
    {t:`Tang của góc giữa ${I('SC')} và ${PL7('ABCD')} bằng ${tanC}`,f:`Tang của góc giữa ${I('SC')} và ${PL7('ABCD')} bằng ${fr(tanC,2)}`,why:`tan∠SCA = SA/AC = ${SA}/(${a}${rt(2)}) = ${tanC}.`},
    {t:`${I('SC')} = ${SCh}`,f:`${I('SC')} = ${a}${rt(Math.round(SCv*SCv)+1)}`,why:`SC² = SA² + AC² = ${c[2]===1?'':c[2]}${a}² + 2${a}² = ${c[2]+2}${a}², nên SC = ${SCh}.`},
    {t:`Thể tích khối chóp ${I('S.ABCD')} bằng ${volH}`,f:`Thể tích khối chóp ${I('S.ABCD')} bằng ${fr(`${a}${sup(3)}${cH}`,6)}`,why:`V = (1/3)·${a}²·${SA} = ${volH}.`}
  ];
  return mkDS(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình vuông cạnh ${a}, ${I('SA')} ⊥ ${PL7('ABCD')} và ${I('SA')} = ${SA}. Xét tính đúng sai của các khẳng định sau:`,items,
    chk:()=>Math.abs(Math.tan(Math.atan(cv))-cv)<1e-9&&Math.abs(tanCv*Math.SQRT2-cv)<1e-9&&Math.abs(SCv*SCv-(cv*cv+2))<1e-9});
});
const pairsDS=(r,stem,P)=>{const pk=r.shuffle(P).slice(0,4);return mkDS(r,{stem,items:pk.map(z=>({t:z[0],f:z[1],why:`Khẳng định đúng là: “${z[0]}”.`}))})};
DS11c('ds11-7-theory',7,'NB',r=>pairsDS(r,'Xét tính đúng sai của các khẳng định sau (trong không gian):',TH7),'vg');
const TH7b=[
  [`Khoảng cách từ điểm ${I('M')} đến mặt phẳng (${I('P')}) là độ dài đoạn ${I('MH')}, với ${I('H')} là hình chiếu vuông góc của ${I('M')} trên (${I('P')})`,`Khoảng cách từ điểm ${I('M')} đến mặt phẳng (${I('P')}) là độ dài đoạn ${I('MH')}, với ${I('H')} là một điểm bất kì thuộc (${I('P')})`],
  [`Thể tích khối chóp bằng một phần ba tích của diện tích đáy và chiều cao`,`Thể tích khối chóp bằng tích của diện tích đáy và chiều cao`],
  [`Thể tích khối lăng trụ bằng tích của diện tích đáy và chiều cao`,`Thể tích khối lăng trụ bằng một phần ba tích của diện tích đáy và chiều cao`],
  [`Thể tích khối hộp chữ nhật bằng tích ba kích thước của nó`,`Thể tích khối hộp chữ nhật bằng tổng ba kích thước của nó`],
  [`Thể tích khối lập phương cạnh ${I('a')} bằng ${I('a')}${sup(3)}`,`Thể tích khối lập phương cạnh ${I('a')} bằng 3${I('a')}`],
  [`Khoảng cách giữa đường thẳng ${I('a')} và mặt phẳng (${I('P')}) song song với ${I('a')} bằng khoảng cách từ một điểm bất kì của ${I('a')} đến (${I('P')})`,`Khoảng cách giữa đường thẳng ${I('a')} và mặt phẳng (${I('P')}) song song với ${I('a')} bằng khoảng cách từ một điểm bất kì của (${I('P')}) đến đường thẳng ${I('a')}`]
];
DS11c('ds11-7-theory2',7,'NB',r=>pairsDS(r,'Xét tính đúng sai của các khẳng định sau:',TH7b),'tt');
const prismFig=()=>{
  const P={A:[0,0,0],B:[3.5,0,0],C:[0,3,0],'A′':[0,0,4.5],'B′':[3.5,0,4.5],'C′':[0,3,4.5]};
  const E=autoEdges(P,[['A','B','C'],['A′','B′','C′'],['A','B','B′','A′'],['B','C','C′','B′'],['C','A','A′','C′']]);
  return fig3D(P,E.solid,E.dashed,['A','B','C','A′','B′','C′']);
};
const PY3=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[5,12,13],[12,5,13]];
DS11c('ds11-7-prism',7,'TH',r=>{
  const [a,b,c]=r.pick(PY3),h=r.int(3,9);
  const items=[
    {t:`Diện tích đáy ${I('ABC')} bằng ${a*b/2}`,f:`Diện tích đáy ${I('ABC')} bằng ${a*b}`,why:`${I('S')}${sub('ABC')} = ${fr(1,2)}·${a}·${b} = ${a*b/2}.`},
    {t:`${I('BC')} = ${c}`,f:`${I('BC')} = ${c+1}`,why:`Tam giác ${I('ABC')} vuông tại ${I('A')}: ${I('BC')} = ${rt(`${a}² + ${b}²`)} = ${c}.`},
    {t:`Thể tích khối lăng trụ bằng ${a*b*h/2}`,f:`Thể tích khối lăng trụ bằng ${a*b*h}`,why:`${I('V')} = ${I('S')}${sub('ABC')}·${I('AA′')} = ${a*b/2}·${h} = ${a*b*h/2}.`},
    {t:`${I('AB')} ⊥ (${I('ACC′A′')})`,f:`${I('BC')} ⊥ (${I('ACC′A′')})`,why:`${I('AB')} ⊥ ${I('AC')} và ${I('AB')} ⊥ ${I('AA′')} nên ${I('AB')} ⊥ (${I('ACC′A′')}); còn ${I('BC')} không vuông góc với ${I('AC')}.`},
    {t:`(${I('ABB′A′')}) ⊥ (${I('ABC')})`,f:`(${I('ABB′A′')}) ⊥ (${I('BCC′B′')})`,why:`Lăng trụ đứng nên mặt bên ${I('ABB′A′')} vuông góc với đáy; hai mặt bên ${I('ABB′A′')} và ${I('BCC′B′')} không vuông góc vì ∠${I('ABC')} ≠ 90°.`}
  ];
  const pk=r.shuffle(items).slice(0,4);
  return mkDS(r,{stem:`Cho lăng trụ đứng ${I('ABC.A′B′C′')} có đáy ${I('ABC')} là tam giác vuông tại ${I('A')}, ${I('AB')} = ${a}, ${I('AC')} = ${b}, ${I('AA′')} = ${h}. Xét tính đúng sai của các khẳng định sau:${prismFig()}`,items:pk,chk:()=>a*a+b*b===c*c&&a*b*h!==a*b*h/2});
},'tt');
