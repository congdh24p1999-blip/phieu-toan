
/* ================================================================
   LỚP 11 – Chương IV: Quan hệ song song trong không gian
   Mỗi hình được dựng bằng toạ độ 3D thật; mọi khẳng định (song song,
   thuộc mặt phẳng, giao tuyến, giao điểm, chéo nhau) đều được kiểm tra số.
   ================================================================ */
const V3={
  sub:(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],add:(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],
  mul:(a,k)=>[a[0]*k,a[1]*k,a[2]*k],dot:(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],
  cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
  len:a=>Math.hypot(a[0],a[1],a[2])
};
V3.unit=a=>V3.mul(a,1/V3.len(a));
V3.mid=(a,b)=>V3.mul(V3.add(a,b),.5);
V3.lerp=(a,b,t)=>V3.add(a,V3.mul(V3.sub(b,a),t));
const E3=1e-6;
function Geo(P){
  const pt=n=>{const p=P[n];if(!p)throw new Error('thiếu điểm '+n);return p};
  const dir=(a,b)=>V3.unit(V3.sub(pt(b),pt(a)));
  const nrm=pl=>{const [a,b,c]=[...pl].map(pt);const n=V3.cross(V3.sub(b,a),V3.sub(c,a));if(V3.len(n)<E3)throw new Error('mặt phẳng suy biến '+pl);return V3.unit(n)};
  const onPlV=(v,pl)=>Math.abs(V3.dot(V3.sub(v,pt(pl[0])),nrm(pl)))<E3;
  const onPl=(x,pl)=>onPlV(pt(x),pl);
  const colin=(a,b,c)=>V3.len(V3.cross(V3.sub(pt(b),pt(a)),V3.sub(pt(c),pt(a))))<E3;
  const parDir=(u,v)=>V3.len(V3.cross(u,v))<E3;
  const g={P,pt,dir,nrm,onPl,onPlV,colin,
    par:(a,b,c,d)=>parDir(dir(a,b),dir(c,d))&&!colin(a,b,c),
    lineIn:(a,b,pl)=>onPl(a,pl)&&onPl(b,pl),
    parPl:(a,b,pl)=>Math.abs(V3.dot(dir(a,b),nrm(pl)))<E3&&!onPl(a,pl),
    coplanar:(a,b,c,d)=>{const u=V3.sub(pt(b),pt(a)),v=V3.sub(pt(c),pt(a)),w=V3.sub(pt(d),pt(a));return Math.abs(V3.dot(V3.cross(u,v),w))<E3*10},
    samePl:(p1,p2)=>[...p2].every(x=>onPl(x,p1)),
    meetV:(a,b,c,d)=>{
      const A=pt(a),C=pt(c),u=V3.sub(pt(b),A),v=V3.sub(pt(d),C),w=V3.sub(C,A);
      const uu=V3.dot(u,u),uv=V3.dot(u,v),vv=V3.dot(v,v),uw=V3.dot(u,w),vw=V3.dot(v,w),det=uu*vv-uv*uv;
      if(Math.abs(det)<1e-9)return null;
      const t=(uw*vv-uv*vw)/det,s=(uw*uv-uu*vw)/det,p=V3.add(A,V3.mul(u,t)),q=V3.add(C,V3.mul(v,s));
      return V3.len(V3.sub(p,q))<E3?p:null;
    },
    lineMeetPl:(a,b,pl)=>{const A=pt(a),u=V3.sub(pt(b),A),n=nrm(pl),den=V3.dot(u,n);if(Math.abs(den)<E3)return null;return V3.add(A,V3.mul(u,V3.dot(V3.sub(pt(pl[0]),A),n)/den))}
  };
  g.cheo=(a,b,c,d)=>!g.coplanar(a,b,c,d);
  /* Giao tuyến của hai mặt phẳng là đường thẳng xy */
  g.gt=(p1,p2,x,y)=>!g.samePl(p1,p2)&&[x,y].every(z=>onPl(z,p1)&&onPl(z,p2))&&V3.len(V3.sub(pt(x),pt(y)))>E3;
  /* Giao tuyến đi qua x và song song với ab */
  g.gtPar=(p1,p2,x,a,b)=>!g.samePl(p1,p2)&&onPl(x,p1)&&onPl(x,p2)&&Math.abs(V3.dot(dir(a,b),nrm(p1)))<E3&&Math.abs(V3.dot(dir(a,b),nrm(p2)))<E3;
  /* Giao điểm của đường ab với mp pl là giao điểm của ab với cd (cd nằm trong pl) */
  g.gd=(a,b,pl,c,d)=>{const X=g.lineMeetPl(a,b,pl);if(!X||!g.lineIn(c,d,pl))return false;const Y=g.meetV(a,b,c,d);return !!Y&&V3.len(V3.sub(X,Y))<E3};
  g.add=(n,v)=>{P[n]=v;return g};
  return g;
}
/* Hình vẽ phối cảnh (phép chiếu song song), tự co giãn vào khung. */
function fig3D(P,solid,dashed,show,o={}){
  const pr=p=>[p[0]+0.42*p[1],-(p[2]+0.5*p[1])];
  const names=show.filter(n=>P[n]),pts={};names.forEach(n=>pts[n]=pr(P[n]));
  const xs=names.map(n=>pts[n][0]),ys=names.map(n=>pts[n][1]);
  const W=o.w||230,H=o.h||175,pad=16,mnx=Math.min(...xs),mxx=Math.max(...xs),mny=Math.min(...ys),mxy=Math.max(...ys);
  const k=Math.min((W-2*pad)/(mxx-mnx||1),(H-2*pad)/(mxy-mny||1));
  const S=p=>{const q=pr(p);return[pad+(q[0]-mnx)*k,pad+(q[1]-mny)*k]};
  const cx=W/2,cy=H/2;
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Hình vẽ">`;
  /* o.fill: tô nhạt thiết diện (danh sách đỉnh theo thứ tự) để học sinh nhìn ra ngay */
  if(o.fill&&o.fill.every(n=>P[n]))s+=`<polygon points="${o.fill.map(n=>S(P[n]).map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="#bcd7f0" fill-opacity=".85" stroke="none"/>`;
  const seg=([a,b],d)=>{const p=S(P[a]),q=S(P[b]);s+=`<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="#000" stroke-width="1.1"${d?' stroke-dasharray="4 3"':''}/>`};
  solid.forEach(e=>seg(e,0));dashed.forEach(e=>seg(e,1));
  names.forEach(n=>{
    const p=S(P[n]),dx=p[0]-cx,dy=p[1]-cy,l=Math.hypot(dx,dy)||1,lx=p[0]+dx/l*10,ly=p[1]+dy/l*10+4;
    s+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="1.7" fill="#000"/><text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="11" font-style="italic" text-anchor="middle">${n}</text>`;
  });
  return `<div class="figure">${s}</svg></div>`;
}
/* ---- Các khối cơ bản ---- */
function chopHBH(){ /* S.ABCD đáy hình bình hành tâm O; A ở phía sau bên trái (khuất) */
  const P={B:[0,0,0],C:[6,0,0],A:[1.6,3.4,0],D:[7.6,3.4,0],S:[3.4,1.3,6]};P.O=V3.mid(P.A,P.C);
  return{P,solid:[['S','B'],['S','C'],['S','D'],['B','C'],['C','D']],dashed:[['S','A'],['A','B'],['A','D']],base:'hình bình hành'};
}
function chopTG(){ /* đáy tứ giác lồi không có cặp cạnh song song */
  const P={B:[0,0,0],C:[6,0,0],A:[1,3.6,0],D:[5.2,4.2,0],S:[3,1.6,6]};
  return{P,solid:[['S','B'],['S','C'],['S','D'],['B','C'],['C','D']],dashed:[['S','A'],['A','B'],['A','D']]};
}
function chopThang(){ /* đáy hình thang ABCD, AD // BC, AD = 2BC */
  const P={A:[0,3.4,0],D:[7,3.4,0],B:[1.6,0,0],C:[5.1,0,0],S:[3,1.4,6]};
  return{P,solid:[['S','B'],['S','C'],['S','D'],['B','C'],['C','D']],dashed:[['S','A'],['A','B'],['A','D']]};
}
function tuDien(){
  const P={B:[0,2.4,0],C:[2.6,0,0],D:[6.2,2.4,0],A:[2.8,1.1,5]};
  return{P,solid:[['A','B'],['A','C'],['A','D'],['B','C'],['C','D']],dashed:[['B','D']]};
}
const LN=s=>I(s);
const PLN=s=>`(${I(s)})`;
const st={
  par:(a,b,c,d)=>`Đường thẳng ${LN(a+b)} song song với đường thẳng ${LN(c+d)}`,
  inP:(a,b,p)=>`Đường thẳng ${LN(a+b)} nằm trong mặt phẳng ${PLN(p)}`,
  parP:(a,b,p)=>`Đường thẳng ${LN(a+b)} song song với mặt phẳng ${PLN(p)}`,
  pt:(e,p)=>`Điểm ${LN(e)} thuộc mặt phẳng ${PLN(p)}`,
  gt:(p,q,a,b)=>`Giao tuyến của hai mặt phẳng ${PLN(p)} và ${PLN(q)} là đường thẳng ${LN(a+b)}`,
  gtPar:(p,q,x,a,b)=>`Giao tuyến của hai mặt phẳng ${PLN(p)} và ${PLN(q)} là đường thẳng đi qua ${LN(x)} và song song với ${LN(a+b)}`,
  cheo:(a,b,c,d)=>`Hai đường thẳng ${LN(a+b)} và ${LN(c+d)} chéo nhau`,
  gd:(a,b,p,c,d)=>`Giao điểm của đường thẳng ${LN(a+b)} và mặt phẳng ${PLN(p)} là giao điểm của ${LN(a+b)} với ${LN(c+d)}`
};
/* Kiểm tra số một khẳng định dạng [loại, ...tham số] */
const evalSt=(g,s)=>({par:g.par,inP:(a,b,p)=>g.lineIn(a,b,p),parP:g.parPl,pt:(e,p)=>g.onPl(e,p),gt:g.gt,gtPar:g.gtPar,cheo:g.cheo,gd:g.gd})[s[0]](...s.slice(1));
const htmlSt=s=>st[s[0]](...s.slice(1));
/* Một ý đúng/sai: t, f là khẳng định dạng mảng; tự kiểm tra t đúng, f sai */
const dsIt=(t,f,why)=>({ts:t,fs:f,t:htmlSt(t),f:htmlSt(f),why});
const chkItems=(g,items)=>()=>items.every(it=>evalSt(g,it.ts)===true&&evalSt(g,it.fs)===false);

/* Ba cạnh bên kề nhau của chóp S.ABCD: (X, Y) là cạnh đáy XY */
const SIDES=[['A','B'],['B','C'],['C','D'],['D','A']];
const OPP={AB:'DC',BC:'AD',CD:'BA',DA:'CB'};
const OTHER={A:'C',C:'A',B:'D',D:'B'};
const MNAMES=[['M','N'],['M','N'],['E','F'],['P','Q'],['I','K']];

/* ---------- Trắc nghiệm nhiều lựa chọn ---------- */
N11('h4-plane',4,'NB',r=>{
  const T=['Hai đường thẳng cắt nhau','Ba điểm không thẳng hàng','Một đường thẳng và một điểm không thuộc đường thẳng đó','Hai đường thẳng song song'];
  const F=['Ba điểm phân biệt','Bốn điểm phân biệt','Một điểm và một đường thẳng','Hai đường thẳng phân biệt','Hai đường thẳng chéo nhau','Hai điểm phân biệt'];
  const ok=r.pick(T);
  return mkTxt(r,{stem:'Trong không gian, các yếu tố nào sau đây xác định một mặt phẳng duy nhất?',correct:ok+'.',wrongs:r.shuffle(F).slice(0,3).map(x=>x+'.'),
    sol:`Một mặt phẳng hoàn toàn xác định khi biết: ba điểm không thẳng hàng; một điểm và một đường thẳng không đi qua điểm đó; hai đường thẳng cắt nhau (hoặc song song). Vậy chọn “${ok}”.`});
});
const THEORY_T=[
  'Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau',
  'Nếu đường thẳng a song song với mặt phẳng (P) thì a và (P) không có điểm chung',
  'Hai đường thẳng chéo nhau thì không có điểm chung',
  'Hai mặt phẳng phân biệt có một điểm chung thì chúng có một đường thẳng chung đi qua điểm đó',
  'Nếu hai mặt phẳng song song thì mọi đường thẳng nằm trong mặt phẳng này đều song song với mặt phẳng kia',
  'Qua một điểm nằm ngoài một đường thẳng có đúng một đường thẳng song song với đường thẳng đó',
  'Nếu đường thẳng a không nằm trong (P) và a song song với một đường thẳng nằm trong (P) thì a song song với (P)'
];
const THEORY_F=[
  'Hai đường thẳng không có điểm chung thì song song với nhau',
  'Hai đường thẳng cùng song song với một mặt phẳng thì song song với nhau',
  'Nếu a song song với (P) thì a song song với mọi đường thẳng nằm trong (P)',
  'Hai mặt phẳng phân biệt có hai điểm chung thì chúng trùng nhau',
  'Qua một điểm nằm ngoài mặt phẳng (P) có đúng một đường thẳng song song với (P)',
  'Hai đường thẳng phân biệt không cắt nhau thì chéo nhau',
  'Hai mặt phẳng cùng song song với một đường thẳng thì song song với nhau'
];
N11('h4-theory',4,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?THEORY_T:THEORY_F),wr=r.shuffle(want?THEORY_F:THEORY_T).slice(0,3);
  const ital=s=>s.replace(/\b(a)\b/g,I('a')).replace(/\(P\)/g,`(${I('P')})`);
  return mkTxt(r,{stem:`Trong không gian, khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ital(ok)+'.',wrongs:wr.map(x=>ital(x)+'.'),
    sol:want?`Khẳng định đúng: ${ital(ok)}. Các khẳng định còn lại sai (có phản ví dụ: hai đường thẳng chéo nhau, hai đường thẳng cắt nhau cùng song song với một mặt phẳng…).`:`Khẳng định sai: ${ital(ok)}. Các khẳng định còn lại là tính chất trong SGK.`});
});
N11('h4-side',4,'NB',r=>{
  const F=chopHBH(),diag=r.pick(['SAC','SBD']),sides=['SAB','SBC','SCD','SAD'];
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành. Mặt phẳng nào sau đây <b>không phải</b> là mặt bên của hình chóp?`,
    correct:PLN(diag)+'.',wrongs:r.shuffle(sides).slice(0,3).map(x=>PLN(x)+'.'),
    sol:`Các mặt bên là (SAB), (SBC), (SCD), (SDA). Mặt phẳng ${PLN(diag)} chứa đường chéo đáy nên không phải mặt bên.`});
});
N11('h4-mid-par',4,'NB',r=>{
  const F=chopHBH(),[X,Y]=r.pick(SIDES),[m,n]=r.pick(MNAMES),g=Geo(F.P);
  g.add(m,V3.mid(F.P.S,F.P[X])).add(n,V3.mid(F.P.S,F.P[Y]));
  const opp=OPP[X+Y],ans=r.chance(.5)?X+Y:opp;
  const cands=['AB','BC','CD','DA','AC','BD','SA','SB','SC','SD'].filter(e=>!g.par(m,n,e[0],e[1]));
  const wr=r.shuffle(cands).slice(0,3);
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành. Gọi ${I(m)}, ${I(n)} lần lượt là trung điểm của ${I('S'+X)}, ${I('S'+Y)}. Đường thẳng ${I(m+n)} song song với đường thẳng nào sau đây?${fig3D(F.P,F.solid,F.dashed,['S','A','B','C','D',m,n])}`,
    correct:I(ans)+'.',wrongs:wr.map(e=>I(e)+'.'),
    sol:`${I(m+n)} là đường trung bình của tam giác ${I('S'+X+Y)} nên ${I(m+n)} ∥ ${I(X+Y)}${ans===opp?`; mà ${I(X+Y)} ∥ ${I(opp)} (ABCD là hình bình hành) nên ${I(m+n)} ∥ ${I(opp)}`:''}.`,
    chk:()=>g.par(m,n,ans[0],ans[1])&&wr.every(e=>!g.par(m,n,e[0],e[1]))});
});
N11('h4-gt-diag',4,'TH',r=>{
  const F=chopTG(),g=Geo(F.P);
  const [e,f]=r.pick([['E','F'],['M','N'],['I','K'],['E','O']]);
  g.add(e,g.meetV('A','B','C','D')).add(f,g.meetV('A','C','B','D'));
  const ask=r.chance(.6)?'diag':'side';
  const correct=ask==='diag'?'S'+f:'S'+e,wr=ask==='diag'?['S'+e,'SC','SA',e+f]:['S'+f,'SB','SD',e+f];
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy là tứ giác ${I('ABCD')}, ${I('AB')} cắt ${I('CD')} tại ${I(e)}, ${I('AC')} cắt ${I('BD')} tại ${I(f)}. Giao tuyến của hai mặt phẳng ${ask==='diag'?PLN('SAC')+' và '+PLN('SBD'):PLN('SAB')+' và '+PLN('SCD')} là đường thẳng`,
    correct:I(correct)+'.',wrongs:r.shuffle(wr).slice(0,3).map(x=>I(x)+'.'),
    sol:ask==='diag'?`S là điểm chung thứ nhất; ${I(f)} ∈ AC ⊂ (SAC) và ${I(f)} ∈ BD ⊂ (SBD) nên ${I(f)} là điểm chung thứ hai. Vậy giao tuyến là ${I('S'+f)}.`:`S là điểm chung thứ nhất; ${I(e)} ∈ AB ⊂ (SAB) và ${I(e)} ∈ CD ⊂ (SCD) nên ${I(e)} là điểm chung thứ hai. Vậy giao tuyến là ${I('S'+e)}.`,
    chk:()=>ask==='diag'?g.gt('SAC','SBD','S',f):g.gt('SAB','SCD','S',e)});
});
N11('h4-gt-par',4,'TH',r=>{
  const F=chopHBH(),g=Geo(F.P),[p,q,e]=r.pick([['SAB','SCD','AB'],['SAD','SBC','AD'],['SAB','SCD','CD'],['SAD','SBC','BC']]);
  const other=e==='AB'||e==='CD'?'AD':'AB';
  const opts=[`Đường thẳng đi qua ${I('S')} và song song với ${I(e)}.`,`Đường thẳng đi qua ${I('S')} và song song với ${I(other)}.`,`Đường thẳng ${I('SO')}, với ${I('O')} là tâm hình bình hành.`,`Đường thẳng đi qua ${I('S')} và song song với ${I('AC')}.`];
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành. Giao tuyến của hai mặt phẳng ${PLN(p)} và ${PLN(q)} là`,
    correct:opts[0],wrongs:opts.slice(1),
    sol:`S là điểm chung của hai mặt phẳng. Hai mặt phẳng lần lượt chứa hai đường thẳng song song ${I(p==='SAB'?'AB':'AD')} và ${I(p==='SAB'?'CD':'BC')} nên giao tuyến đi qua S và song song với ${I(e)}.`,
    chk:()=>g.gtPar(p,q,'S',e[0],e[1])&&!g.gtPar(p,q,'S',other[0],other[1])&&!g.gt(p,q,'S','O')&&!g.gtPar(p,q,'S','A','C')});
});
N11('h4-tet-mid',4,'NB',r=>{
  const F=tuDien(),g=Geo(F.P),V=r.pick(['A','B','C','D']),rest=['A','B','C','D'].filter(x=>x!==V),[X,Y]=r.shuffle(rest).slice(0,2),Z=rest.find(x=>x!==X&&x!==Y);
  const [m,n]=r.pick(MNAMES);g.add(m,V3.mid(F.P[V],F.P[X])).add(n,V3.mid(F.P[V],F.P[Y]));
  const ed=['AB','AC','AD','BC','BD','CD'],ans=ed.find(e=>g.par(m,n,e[0],e[1]));
  const wr=ed.filter(e=>e!==ans).map(e=>e);
  return mkTxt(r,{stem:`Cho tứ diện ${I('ABCD')}. Gọi ${I(m)}, ${I(n)} lần lượt là trung điểm của ${I([V,X].sort().join(''))} và ${I([V,Y].sort().join(''))}. Đường thẳng ${I(m+n)} song song với đường thẳng nào sau đây?${fig3D(F.P,F.solid,F.dashed,['A','B','C','D',m,n])}`,
    correct:I(ans)+'.',wrongs:r.shuffle(wr).slice(0,3).map(e=>I(e)+'.'),
    sol:`${I(m+n)} là đường trung bình của tam giác ${I([V,X,Y].sort().join(''))} nên ${I(m+n)} ∥ ${I(ans)}.`,
    chk:()=>!!ans&&wr.every(e=>!g.par(m,n,e[0],e[1]))});
});
N11('h4-cheo',4,'TH',r=>{
  const F=tuDien(),g=Geo(F.P),[m,n]=r.pick(MNAMES);
  const V=r.pick(['A','B','C','D']),rest=['A','B','C','D'].filter(x=>x!==V),[X,Y]=r.shuffle(rest).slice(0,2);
  g.add(m,V3.mid(F.P[V],F.P[X])).add(n,V3.mid(F.P[V],F.P[Y]));
  const ed=['AB','AC','AD','BC','BD','CD'],ch=ed.filter(e=>g.cheo(m,n,e[0],e[1])),no=ed.filter(e=>!g.cheo(m,n,e[0],e[1]));
  const ans=r.pick(ch),wr=r.shuffle(no).slice(0,3),pair=e=>`${I(m+n)} và ${I(e)}.`;
  return mkTxt(r,{stem:`Cho tứ diện ${I('ABCD')} có ${I(m)}, ${I(n)} lần lượt là trung điểm của ${I([V,X].sort().join(''))} và ${I([V,Y].sort().join(''))}. Cặp đường thẳng nào sau đây chéo nhau?`,
    correct:pair(ans),wrongs:wr.map(pair),
    sol:`${I(m+n)} nằm trong mặt phẳng ${PLN([V,X,Y].sort().join(''))}; đường thẳng ${I(ans)} cắt mặt phẳng này tại một điểm không thuộc ${I(m+n)} nên hai đường thẳng không đồng phẳng, tức là chéo nhau. Các cặp còn lại cắt nhau hoặc song song.`,
    chk:()=>wr.length===3&&g.cheo(m,n,ans[0],ans[1])});
});
N11('h4-centroid',4,'VD',r=>{
  const F=tuDien(),g=Geo(F.P),V=r.pick(['A','B','C','D']),rest=['A','B','C','D'].filter(x=>x!==V),[X,Y]=r.shuffle(rest),Z=rest.find(x=>x!==X&&x!==Y);
  /* G1 trọng tâm tam giác VXY... dùng chung cạnh V-X? chọn hai tam giác chung cạnh V,X */
  const cg=(a,b,c)=>V3.mul(V3.add(V3.add(F.P[a],F.P[b]),F.P[c]),1/3);
  const T1=[V,X,Y],T2=[V,X,Z];g.add('G',cg(...T1)).add('H',cg(...T2));
  const ed=['AB','AC','AD','BC','BD','CD'],ans=ed.find(e=>g.par('G','H',e[0],e[1]));
  const tri=t=>I([...t].sort().join(''));
  return mkTxt(r,{stem:`Cho tứ diện ${I('ABCD')}. Gọi ${I('G')}, ${I('H')} lần lượt là trọng tâm của tam giác ${tri(T1)} và tam giác ${tri(T2)}. Đường thẳng ${I('GH')} song song với đường thẳng nào sau đây?`,
    correct:I(ans)+'.',wrongs:r.shuffle(ed.filter(e=>e!==ans)).slice(0,3).map(e=>I(e)+'.'),
    sol:`Gọi ${I('K')} là trung điểm của ${I([V,X].sort().join(''))}. Khi đó ${I('KG')}/${I('K'+Y)} = ${I('KH')}/${I('K'+Z)} = ${fr(1,3)} nên theo định lí Thalès đảo, ${I('GH')} ∥ ${I([Y,Z].sort().join(''))}.`,
    chk:()=>!!ans&&ed.filter(e=>e!==ans).every(e=>!g.par('G','H',e[0],e[1]))});
});
N11('h4-trap-gd',4,'VD',r=>{
  const F=chopThang(),g=Geo(F.P),M=r.pick(['M','N','K']);g.add(M,V3.mid(F.P.C,F.P.D));
  const opts=[['B'+M,true],['SC',false],['SB',false],['S'+M,false]];
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy là hình thang ${I('ABCD')} (${I('AD')} ∥ ${I('BC')}). Gọi ${I(M)} là trung điểm ${I('CD')}. Giao điểm của đường thẳng ${I('AD')} và mặt phẳng ${PLN('SB'+M)} là`,
    correct:`giao điểm của hai đường thẳng ${I('AD')} và ${I('B'+M)}.`,wrongs:opts.slice(1).map(o=>`giao điểm của hai đường thẳng ${I('AD')} và ${I(o[0])}.`),
    sol:`Trong mặt phẳng (ABCD), ${I('AD')} và ${I('B'+M)} không song song nên cắt nhau tại một điểm; điểm đó thuộc ${I('B'+M)} ⊂ ${PLN('SB'+M)}. Vậy giao điểm cần tìm là giao điểm của ${I('AD')} và ${I('B'+M)}.`,
    chk:()=>g.gd('A','D','SB'+M,'B',M)&&!g.meetV('A','D','S','C')&&!g.meetV('A','D','S','B')&&!g.meetV('A','D','S',M)});
});
N11('h4-trap-gt',4,'VD',r=>{
  const F=chopThang(),g=Geo(F.P);g.add('M',V3.mid(F.P.S,F.P.A)).add('N',V3.mid(F.P.A,F.P.D));
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy là hình thang ${I('ABCD')} với đáy lớn ${I('AD')} và ${I('AD')} = 2${I('BC')}. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('SA')} và ${I('AD')}. Giao tuyến của hai mặt phẳng ${PLN('MNB')} và ${PLN('SBD')} là`,
    correct:`đường thẳng đi qua ${I('B')} và song song với ${I('MN')}.`,wrongs:[`đường thẳng ${I('MN')}.`,`đường thẳng ${I('BC')}.`,`đường thẳng ${I('SD')}.`],
    sol:`${I('MN')} là đường trung bình của tam giác SAD nên ${I('MN')} ∥ ${I('SD')}. Hai mặt phẳng có điểm chung B và lần lượt chứa hai đường thẳng song song ${I('MN')}, ${I('SD')} nên giao tuyến đi qua B và song song với ${I('MN')}.`,
    chk:()=>g.gtPar('MNB','SBD','B','M','N')});
});
N11('h4-om',4,'TH',r=>{
  const F=chopHBH(),g=Geo(F.P),X=r.pick(['A','B','C','D']),m=r.pick(['M','I','K']);g.add(m,V3.mid(F.P.S,F.P[X]));
  const ans='S'+OTHER[X],wr=['SA','SB','SC','SD','AB','CD','BC','AD'].filter(e=>e!==ans&&!g.par('O',m,e[0],e[1]));
  return mkTxt(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành tâm ${I('O')}. Gọi ${I(m)} là trung điểm của ${I('S'+X)}. Đường thẳng ${I('O'+m)} song song với đường thẳng nào sau đây?`,
    correct:I(ans)+'.',wrongs:r.shuffle(wr).slice(0,3).map(e=>I(e)+'.'),
    sol:`O là trung điểm của ${I(X+OTHER[X])}, ${I(m)} là trung điểm của ${I('S'+X)} nên ${I('O'+m)} là đường trung bình của tam giác ${I('S'+X+OTHER[X])}, suy ra ${I('O'+m)} ∥ ${I(ans)}.`,
    chk:()=>g.par('O',m,ans[0],ans[1])});
});

/* ---------- Đúng/sai ---------- */
DS11('ds4-hbh',4,'NB',r=>{
  const F=chopHBH(),g=Geo(F.P);
  const [X,Y]=r.pick(SIDES),[m,n]=r.pick([['M','N'],['P','Q'],['E','F']]);
  g.add(m,V3.mid(F.P.S,F.P[X])).add(n,V3.mid(F.P.S,F.P[Y]));
  const opp=OPP[X+Y],tri='S'+X+Y,oppTri='S'+opp;
  const pool=[
    dsIt(['par',m,n,opp[0],opp[1]],['par',m,n,'A','C'],`${I(m+n)} là đường trung bình của tam giác ${I(tri)} nên ${I(m+n)} ∥ ${I(X+Y)} ∥ ${I(opp)}.`),
    dsIt(['parP',m,n,'ABCD'],['parP',m,n,tri],`${I(m+n)} ∥ ${I(X+Y)} ⊂ (ABCD) và ${I(m+n)} không nằm trong (ABCD) nên ${I(m+n)} ∥ (ABCD); còn ${I(m+n)} nằm trong ${PLN(tri)}.`),
    dsIt(['gt','SAC','SBD','S','O'],['gt','SAC','SBD','S','A'],`S và O là hai điểm chung của (SAC) và (SBD) nên giao tuyến là SO.`),
    dsIt(['parP',m,n,oppTri],['parP',m,n,'SAC'],`${I(m+n)} ∥ ${I(opp)} ⊂ ${PLN(oppTri)} nên ${I(m+n)} ∥ ${PLN(oppTri)}; còn ${I(m+n)} cắt (SAC).`),
    dsIt(['gtPar',tri,oppTri,'S',X,Y],['gt',tri,oppTri,'S','O'],`Hai mặt phẳng có điểm chung S và chứa hai đường thẳng song song ${I(X+Y)}, ${I(opp)} nên giao tuyến đi qua S và song song với ${I(X+Y)}.`),
    dsIt(['inP','O',m,'S'+X+OTHER[X]],['inP','O',m,'SBD'.includes(X)?'SAC':'SBD'],`O và ${I(m)} cùng thuộc mặt phẳng ${PLN('S'+X+OTHER[X])}.`)
  ];
  const items=r.shuffle(pool).slice(0,4);
  return mkDS(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành tâm ${I('O')}. Gọi ${I(m)}, ${I(n)} lần lượt là trung điểm của ${I('S'+X)} và ${I('S'+Y)}. Xét tính đúng sai của các khẳng định sau:${fig3D(F.P,F.solid,F.dashed.concat([['A','C'],['B','D']]),['S','A','B','C','D','O',m,n])}`,
    items,chk:chkItems(g,items)});
});
DS11('ds4-pmn',4,'TH',r=>{
  const F=chopHBH(),g=Geo(F.P);
  g.add('P',V3.mid(F.P.S,F.P.A)).add('M',V3.mid(F.P.A,F.P.D)).add('N',V3.mid(F.P.D,F.P.C));
  const pool=[
    dsIt(['inP','O','P','SAC'],['inP','O','P','SBD'],`O ∈ AC và P ∈ SA nên OP nằm trong (SAC), không nằm trong (SBD) (P ∉ (SBD)).`),
    dsIt(['gt','SAC','SBD','S','O'],['gt','SAC','SBD','S','B'],`S và O là hai điểm chung của (SAC) và (SBD).`),
    dsIt(['par','M','N','A','C'],['par','M','N','B','C'],`MN là đường trung bình của tam giác ACD nên MN ∥ AC.`),
    dsIt(['gtPar','PMN','SAC','P','A','C'],['gtPar','PMN','SAC','P','B','D'],`P là điểm chung; MN ∥ AC nên giao tuyến của (PMN) và (SAC) đi qua P và song song với AC.`),
    dsIt(['par','O','P','S','C'],['par','O','P','S','B'],`OP là đường trung bình của tam giác SAC nên OP ∥ SC.`),
    dsIt(['parP','O','P','SCD'],['parP','O','P','SAB'],`OP ∥ SC ⊂ (SCD) nên OP ∥ (SCD); còn OP cắt (SAB) tại P.`)
  ];
  const items=r.shuffle(pool).slice(0,4);
  return mkDS(r,{stem:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành tâm ${I('O')}. Các điểm ${I('P')}, ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('SA')}, ${I('AD')} và ${I('DC')}. Xét tính đúng sai của các khẳng định sau:${fig3D(F.P,F.solid,F.dashed.concat([['A','C'],['B','D']]),['S','A','B','C','D','O','P','M','N'])}`,
    items,chk:chkItems(g,items)});
});
DS11('ds4-tet',4,'VD',r=>{
  const F=tuDien(),g=Geo(F.P),perm=r.shuffle(['B','C','D']),[b,c,d]=perm,k=r.pick([2,3]);
  g.add('M',V3.mid(F.P.A,F.P[c])).add('N',V3.mid(F.P[b],F.P[c])).add('P',V3.lerp(F.P[b],F.P[d],k/(k+1)));
  g.add('E',g.meetV('N','P',c,d));
  const e2=(x,y)=>[x,y].sort().join(''),pl=(...x)=>x.sort().join('');
  const pool=[
    dsIt(['pt','E','MNP'],['pt','E',pl('A',b,c)],`E ∈ NP ⊂ (MNP) nên E thuộc (MNP).`),
    dsIt(['par','M','N','A',b],['par','M','N','A',d],`MN là đường trung bình của tam giác ${I(pl('A',b,c))} nên MN ∥ ${I('A'+b)}.`),
    dsIt(['gt','MNP',pl('A',c,d),'M','E'],['gt','MNP',pl('A',c,d),'M','P'],`M và E là hai điểm chung của (MNP) và ${PLN(pl('A',c,d))} nên giao tuyến là ME (P không thuộc ${PLN(pl('A',c,d))}).`),
    dsIt(['gd','A',d,'MNP','M','E'],['gd','A',d,'MNP','M','P'],`Trong ${PLN(pl('A',c,d))}, ${I('A'+d)} cắt ME tại một điểm thuộc (MNP); còn MP không cắt ${I('A'+d)}.`),
    dsIt(['parP','M','N',pl('A',b,d)],['parP','M','N',pl('A',b,c)],`MN ∥ ${I('A'+b)} ⊂ ${PLN(pl('A',b,d))} nên MN ∥ ${PLN(pl('A',b,d))}; còn MN nằm trong ${PLN(pl('A',b,c))}.`),
    dsIt(['cheo','M','N',b,d],['cheo','M','N','A',b],`MN nằm trong ${PLN(pl('A',b,c))}, ${I(e2(b,d))} cắt mặt phẳng đó tại ${I(b)} ∉ MN nên MN và ${I(e2(b,d))} chéo nhau; còn MN ∥ ${I('A'+b)}.`)
  ];
  const items=r.shuffle(pool).slice(0,4);
  return mkDS(r,{stem:`Cho tứ diện ${I('ABCD')} có ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('A'+c)}, ${I(e2(b,c))} và ${I('P')} là điểm thuộc cạnh ${I(e2(b,d))} sao cho ${I(b+'P')} = ${k}${I('P'+d)}. Gọi ${I('E')} là giao điểm của ${I('NP')} và ${I(e2(c,d))}. Xét tính đúng sai của các khẳng định sau:${fig3D(F.P,F.solid,F.dashed,['A','B','C','D','M','N','P'])}`,
    items,chk:()=>!!g.P.E&&chkItems(g,items)()});
});

/* ---------- Tự luận (2 ý × 0,5 đ) ---------- */
TL11('tl4-tg',4,'VD','c',r=>{
  const F=chopTG(),g=Geo(F.P),M=r.pick(['M','N','K']),pos=r.pick(['SC','SD']);
  g.add('E',g.meetV('A','B','C','D')).add('F',g.meetV('A','C','B','D')).add(M,V3.mid(F.P.S,F.P[pos[1]]));
  const askA=r.pick(['side','diag']);
  /* b) giao điểm của AM (M ∈ SC) với (SBD)  hoặc  BM (M ∈ SD) với (SAC) */
  const [X,pl,ln]=pos==='SC'?['A','SBD','SF']:['B','SAC','SF'];
  g.add('I',g.lineMeetPl(X,M,pl));
  const pa=askA==='side'?`Tìm giao tuyến của hai mặt phẳng ${PLN('SAB')} và ${PLN('SCD')}.`:`Tìm giao tuyến của hai mặt phẳng ${PLN('SAC')} và ${PLN('SBD')}.`;
  return{kind:'tl',title:'Giao tuyến, giao điểm',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là tứ giác có các cặp cạnh đối không song song. Lấy điểm ${I(M)} thuộc cạnh ${I(pos)}.<br>${pa}`},
    {pts:.5,html:`Tìm giao điểm ${I('I')} của đường thẳng ${I(X+M)} và mặt phẳng ${PLN(pl)}.`}],
    sol:[askA==='side'?ptxt([[`Gọi E = AB ∩ CD. Ta có S là điểm chung thứ nhất của (SAB) và (SCD).`,.25],[`E ∈ AB ⊂ (SAB), E ∈ CD ⊂ (SCD) nên E là điểm chung thứ hai. Vậy (SAB) ∩ (SCD) = SE.`,.25]])
                       :ptxt([[`Gọi F = AC ∩ BD. Ta có S là điểm chung thứ nhất của (SAC) và (SBD).`,.25],[`F ∈ AC ⊂ (SAC), F ∈ BD ⊂ (SBD) nên F là điểm chung thứ hai. Vậy (SAC) ∩ (SBD) = SF.`,.25]]),
      ptxt([[`Gọi F = AC ∩ BD. Chọn mặt phẳng ${PLN(pos==='SC'?'SAC':'SBD')} chứa ${I(X+M)}; ta có ${PLN(pos==='SC'?'SAC':'SBD')} ∩ ${PLN(pl)} = SF.`,.25],[`Trong ${PLN(pos==='SC'?'SAC':'SBD')}, gọi I = ${I(X+M)} ∩ SF. Khi đó I ∈ SF ⊂ ${PLN(pl)} nên I = ${I(X+M)} ∩ ${PLN(pl)}.`,.25]])],
    chk:()=>(askA==='side'?g.gt('SAB','SCD','S','E'):g.gt('SAC','SBD','S','F'))&&!!g.P.I&&g.coplanar('S','F','I','S')&&!!g.meetV(X,M,'S','F')&&V3.len(V3.sub(g.meetV(X,M,'S','F'),g.P.I))<E3};
});
const rotABCD=i=>x=>x.replace(/[ABCD]/g,ch=>'ABCD'[(i+'ABCD'.indexOf(ch))%4]);
TL11('tl4-gmn',4,'VDC','c',r=>{
  const F=chopHBH(),g=Geo(F.P),R=rotABCD(r.int(0,3)),p=n=>F.P[R(n)];
  const [m,n]=r.pick([['M','N'],['P','Q'],['M','N']]),G='G';
  g.add(m,V3.mid(p('A'),p('B'))).add(n,V3.mid(p('B'),p('C')));
  g.add(G,V3.mul(V3.add(V3.add(F.P.S,p('C')),p('D')),1/3));
  g.add('I',g.meetV(R('A'),n,R('D'),m)).add('K',g.meetV(m,n,R('C'),R('D'))).add('E',g.meetV('K',G,'S',R('D')));
  const t=x=>I(R(x)),pl=x=>PLN(R(x)),A=R('A'),B=R('B'),C=R('C'),D=R('D');
  return{kind:'tl',title:'Giao tuyến, giao điểm',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành. Gọi ${I(m)}, ${I(n)} lần lượt là trung điểm của ${I([A,B].sort().join(''))} và ${I([B,C].sort().join(''))}; ${I(G)} là trọng tâm tam giác ${I('S'+[C,D].sort().join(''))}.<br>Tìm giao tuyến của hai mặt phẳng ${PLN('S'+A+n)} và ${PLN('S'+D+m)}.`},
    {pts:.5,html:`Tìm giao điểm ${I('E')} của đường thẳng ${I('S'+D)} và mặt phẳng ${PLN(G+m+n)}.`}],
    sol:[ptxt([[`S là một điểm chung. Trong (ABCD), gọi I = ${A}${n} ∩ ${D}${m}.`,.25],[`I ∈ ${A}${n} ⊂ (S${A}${n}), I ∈ ${D}${m} ⊂ (S${D}${m}) nên (S${A}${n}) ∩ (S${D}${m}) = SI.`,.25]]),
      ptxt([[`Trong (ABCD), gọi K = ${m}${n} ∩ ${C}${D}. Khi đó K ∈ (${G}${m}${n}) và K ∈ (S${C}${D}), nên (${G}${m}${n}) ∩ (S${C}${D}) = ${G}K.`,.25],[`Trong (S${C}${D}), gọi E = ${G}K ∩ S${D}. Vì E ∈ ${G}K ⊂ (${G}${m}${n}) nên E = S${D} ∩ (${G}${m}${n}).`,.25]])],
    chk:()=>!!g.P.I&&!!g.P.K&&!!g.P.E&&g.gt('S'+A+n,'S'+D+m,'S','I')&&g.onPl('E',G+m+n)&&g.colin('S',D,'E')};
});
TL11('tl4-som',4,'VD','c',r=>{
  const F=chopHBH(),g=Geo(F.P),R=rotABCD(r.int(0,3)),A=R('A'),B=R('B'),C=R('C'),D=R('D'),m=r.pick(['M','N','K']);
  g.add(m,V3.mid(F.P.S,F.P[C]));g.add('I',g.meetV(A,m,'S','O'));
  return{kind:'tl',title:'Quan hệ song song trong hình chóp',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành tâm ${I('O')}. Gọi ${I(m)} là trung điểm của ${I('S'+C)}.<br>Tìm giao điểm ${I('I')} của đường thẳng ${I(A+m)} và mặt phẳng ${PLN('S'+[B,D].sort().join(''))}.`},
    {pts:.5,html:`Chứng minh ${I('S'+A)} song song với mặt phẳng ${PLN([m,B,D].join(''))}.`}],
    sol:[ptxt([[`${A}${m} ⊂ (S${[A,C].sort().join('')}) và (S${[A,C].sort().join('')}) ∩ (S${[B,D].sort().join('')}) = SO.`,.25],[`Trong (S${[A,C].sort().join('')}), gọi I = ${A}${m} ∩ SO; khi đó I ∈ SO ⊂ (S${[B,D].sort().join('')}) nên I = ${A}${m} ∩ (S${[B,D].sort().join('')}).`,.25]]),
      ptxt([[`O là trung điểm ${A}${C}, ${m} là trung điểm S${C} nên O${m} là đường trung bình của tam giác SAC, suy ra O${m} ∥ S${A}.`,.25],[`O${m} ⊂ (${m}${B}${D}) (vì O ∈ ${B}${D}), S${A} ⊄ (${m}${B}${D}) nên S${A} ∥ (${m}${B}${D}).`,.25]])],
    chk:()=>!!g.P.I&&g.onPl('I','S'+B+D)&&g.parPl('S',A,m+B+D)};
});
TL11('tl4-tet',4,'VD','c',r=>{
  const F=tuDien(),g=Geo(F.P),[b,c,d]=r.shuffle(['B','C','D']),k=r.pick([2,3]);
  g.add('M',V3.mid(F.P.A,F.P[c])).add('N',V3.mid(F.P[b],F.P[c])).add('P',V3.lerp(F.P[b],F.P[d],k/(k+1)));
  g.add('E',g.meetV('N','P',c,d));g.add('I',g.meetV('M','E','A',d));
  const e2=(x,y)=>[x,y].sort().join(''),pl=(...x)=>x.sort().join('');
  return{kind:'tl',title:'Quan hệ song song trong tứ diện',parts:[
    {pts:.5,html:`Cho tứ diện ${I('ABCD')}. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('A'+c)}, ${I(e2(b,c))} và ${I('P')} là điểm thuộc cạnh ${I(e2(b,d))} sao cho ${I(b+'P')} = ${k}${I('P'+d)}.<br>Chứng minh ${I('MN')} song song với mặt phẳng ${PLN(pl('A',b,d))}.`},
    {pts:.5,html:`Tìm giao điểm của đường thẳng ${I('A'+d)} với mặt phẳng ${PLN('MNP')}.`}],
    sol:[ptxt([[`MN là đường trung bình của tam giác ${I(pl('A',b,c))} nên MN ∥ ${I('A'+b)}.`,.25],[`Mà ${I('A'+b)} ⊂ ${PLN(pl('A',b,d))} và MN ⊄ ${PLN(pl('A',b,d))} nên MN ∥ ${PLN(pl('A',b,d))}.`,.25]]),
      ptxt([[`Vì ${b}P/${b}${d} = ${fr(k,k+1)} ≠ ${fr(1,2)} = ${b}N/${b}${c} nên NP không song song với ${I(e2(c,d))}; trong ${PLN(pl(b,c,d))} gọi E = NP ∩ ${I(e2(c,d))}. Khi đó (MNP) ∩ ${PLN(pl('A',c,d))} = ME.`,.25],[`Trong ${PLN(pl('A',c,d))}, gọi I = ME ∩ ${I('A'+d)}. Vậy I là giao điểm của ${I('A'+d)} và (MNP).`,.25]])],
    chk:()=>g.parPl('M','N',pl('A',b,d))&&!!g.P.E&&!!g.P.I&&g.onPl('I','MNP')&&g.colin('A',d,'I')};
});
TL11('tl4-hbh',4,'TH','c',r=>{
  const F=chopHBH(),g=Geo(F.P),[X,Y]=r.pick(SIDES),opp=OPP[X+Y];
  g.add('M',V3.mid(F.P.S,F.P[X])).add('N',V3.mid(F.P.S,F.P[Y]));
  return{kind:'tl',title:'Quan hệ song song trong hình chóp',parts:[
    {pts:.5,html:`Cho hình chóp ${I('S.ABCD')} có đáy ${I('ABCD')} là hình bình hành tâm ${I('O')}. Gọi ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('S'+X)}, ${I('S'+Y)}.<br>Chứng minh ${I('MN')} song song với mặt phẳng ${PLN('S'+opp)}.`},
    {pts:.5,html:`Tìm giao tuyến của hai mặt phẳng ${PLN('OMN')} và ${PLN('ABCD')}.`}],
    sol:[ptxt([[`MN là đường trung bình của tam giác ${I('S'+X+Y)} nên MN ∥ ${I(X+Y)}; mà ${I(X+Y)} ∥ ${I(opp)} nên MN ∥ ${I(opp)}.`,.25],[`${I(opp)} ⊂ ${PLN('S'+opp)}, MN ⊄ ${PLN('S'+opp)} nên MN ∥ ${PLN('S'+opp)}.`,.25]]),
      ptxt([[`O là điểm chung của (OMN) và (ABCD); MN ⊂ (OMN), ${I(X+Y)} ⊂ (ABCD) và MN ∥ ${I(X+Y)}.`,.25],[`Do đó giao tuyến là đường thẳng đi qua O và song song với ${I(X+Y)}.`,.25]])],
    chk:()=>g.parPl('M','N','S'+opp)&&g.gtPar('OMN','ABCD','O',X,Y)};
});
