/* ----- Đúng/sai chương IX ----- */
DS11e('ds11-9-poly',9,'TH',r=>{
  const cs=[r.nz(-2,2),r.int(-4,4),r.int(-5,5),r.int(-6,6)],d=pd(cs),x0=r.int(-2,3),x1=r.int(-2,3),v0=pe(d,x0),v1=pe(d,x1),a=cs[0],b=cs[1];
  if(pe(cs,x1)===v1)return T.ds['ds11-9-poly'].gen(r);
  const bad=d.slice();bad[1]+=r.pick([-2,-1,1,2]);
  const items=[
    {t:`${I('f')}′(${X9}) = ${polyH(d)}`,f:`${I('f')}′(${X9}) = ${polyH(bad)}`,why:`${I('f')}′(${X9}) = ${polyH(d)}.`},
    {t:`${fp(sg(x0))} = ${sg(v0)}`,f:`${fp(sg(x0))} = ${sg(v0+r.pick([-3,-2,2,3]))}`,why:`Thay ${X9} = ${sg(x0)} vào ${polyH(d)} được ${sg(v0)}.`},
    {t:`${I('f')}″(${X9}) = ${polyH(pd(d))}`,f:`${I('f')}″(${X9}) = ${polyH([3*a,2*b,d[2]])}`,why:`${I('f')}″(${X9}) = (${polyH(d)})′ = ${polyH(pd(d))}.`},
    {t:`Hệ số góc của tiếp tuyến của đồ thị tại điểm có hoành độ ${sg(x1)} bằng ${sg(v1)}`,f:`Hệ số góc của tiếp tuyến của đồ thị tại điểm có hoành độ ${sg(x1)} bằng ${sg(pe(cs,x1))}`,why:`Hệ số góc bằng ${fp(sg(x1))} = ${sg(v1)} (không phải giá trị hàm số ${sg(pe(cs,x1))}).`}
  ];
  return mkDS(r,{stem:`Cho hàm số ${FX} = ${polyH(cs)}. Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>Math.abs(numd(x=>pe(cs,x),x1)-v1)<1e-3&&pe(cs,x1)!==v1});
});
const D9=[
  k=>[`sin ${k}${X9}`,`${k}cos ${k}${X9}`,`cos ${k}${X9}`,x=>Math.sin(k*x),x=>k*Math.cos(k*x)],
  k=>[`cos ${k}${X9}`,`${MINUS}${k}sin ${k}${X9}`,`${k}sin ${k}${X9}`,x=>Math.cos(k*x),x=>-k*Math.sin(k*x)],
  k=>[`${I('e')}${sup(k+X9)}`,`${k}${I('e')}${sup(k+X9)}`,`${I('e')}${sup(k+X9)}`,x=>Math.exp(k*x),x=>k*Math.exp(k*x)],
  k=>[`ln(${k}${X9} + 1)`,fr(k,`${k}${X9} + 1`),fr(1,`${k}${X9} + 1`),x=>Math.log(k*x+1),x=>k/(k*x+1)],
  k=>[rt(`${k}${X9} + 1`),fr(k,`2${rt(`${k}${X9} + 1`)}`),fr(1,`2${rt(`${k}${X9} + 1`)}`),x=>Math.sqrt(k*x+1),x=>k/(2*Math.sqrt(k*x+1))],
  k=>[`tan ${X9}`,fr(1,`cos${sup(2)} ${X9}`),`${MINUS}${fr(1,`cos${sup(2)} ${X9}`)}`,x=>Math.tan(x),x=>1/Math.pow(Math.cos(x),2)],
  k=>[`${k}${sup(X9)}`,`${k}${sup(X9)} ln ${k}`,`${X9}·${k}${sup(X9+' − 1')}`,x=>Math.pow(k,x),x=>Math.pow(k,x)*Math.log(k)],
  k=>[`log${sub(k)} ${X9}`,fr(1,`${X9} ln ${k}`),fr(`ln ${k}`,X9),x=>Math.log(x)/Math.log(k),x=>1/(x*Math.log(k))]
];
DS11e('ds11-9-rules',9,'TH',r=>{
  const ks=[r.int(2,5),r.int(2,5),r.int(2,5),r.int(2,5)],ix=r.shuffle([0,1,2,3,4,5,6,7]).slice(0,4);
  const ent=ix.map((i,j)=>{const k=i===6||i===7?r.pick([2,3,5]):i===5?1:ks[j];return D9[i](k)});
  const items=ent.map(e=>({t:`Đạo hàm của hàm số ${I('y')} = ${e[0]} là ${YP} = ${e[1]}`,f:`Đạo hàm của hàm số ${I('y')} = ${e[0]} là ${YP} = ${e[2]}`,why:`(${e[0]})′ = ${e[1]}.`}));
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items,chk:()=>ent.every(e=>{const x=e[0].includes('log')||e[0].includes('ln')||e[0].includes('√')||e[0].includes('rt')?1.3:.37;return Math.abs(numd(e[3],x)-e[4](x))<1e-3})});
});
const mot=(q,d)=>[1,-3*q,3*(q*q-d*d),0];
DS11e('ds11-9-motion',9,'VD',r=>{
  const q=r.int(2,5),d=r.int(1,q-1),r1=q-d,r2=q+d,cs=mot(q,d),v=pd(cs),ac=pd(v);
  const items=[
    {t:`Vận tốc của chất điểm tại thời điểm ${I('t')} là ${I('v')}(${I('t')}) = ${polyH(v,'t')}`,f:`Vận tốc của chất điểm tại thời điểm ${I('t')} là ${I('v')}(${I('t')}) = ${polyH([3,-3*q,v[2]],'t')}`,why:`${I('v')}(${I('t')}) = ${I('s')}′(${I('t')}) = ${polyH(v,'t')}.`},
    {t:`Gia tốc của chất điểm tại thời điểm ${I('t')} là ${I('a')}(${I('t')}) = ${polyH(ac,'t')}`,f:`Gia tốc của chất điểm tại thời điểm ${I('t')} là ${I('a')}(${I('t')}) = ${polyH([6,6*q],'t')}`,why:`${I('a')}(${I('t')}) = ${I('v')}′(${I('t')}) = ${polyH(ac,'t')}.`},
    {t:`Chất điểm dừng lại (vận tốc bằng 0) tại thời điểm ${I('t')} = ${r2},`.replace(',',' giây'),f:`Chất điểm dừng lại (vận tốc bằng 0) tại thời điểm ${I('t')} = ${r2+1} giây`,why:`${I('v')}(${I('t')}) = 0 ⟺ ${I('t')} = ${r1} hoặc ${I('t')} = ${r2}.`},
    {t:`Gia tốc của chất điểm tại thời điểm ${I('t')} = ${r1} giây bằng ${sg(pe(ac,r1))} m/s²`,f:`Gia tốc của chất điểm tại thời điểm ${I('t')} = ${r1} giây bằng ${sg(pe(ac,r1)+6)} m/s²`,why:`${I('a')}(${r1}) = 6·${r1} ${MINUS} ${6*q} = ${sg(pe(ac,r1))}.`}
  ];
  return mkDS(r,{stem:`Một chất điểm chuyển động thẳng theo phương trình ${I('s')}(${I('t')}) = ${polyH(cs,'t')} (${I('t')} ≥ 0 tính bằng giây, ${I('s')} tính bằng mét). Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>pe(v,r1)===0&&pe(v,r2)===0&&r1>0});
});

/* ----- Trả lời ngắn chương IX ----- */
TLN11e('t11-9-slope',9,'TH',r=>{
  const cs=[r.nz(-2,2),r.int(-3,3),r.int(-4,4),r.int(-5,5)],x0=r.int(-2,3),v=pe(pd(cs),x0);
  return{kind:'tln',stem:`Tính hệ số góc của tiếp tuyến của đồ thị hàm số ${I('y')} = ${polyH(cs)} tại điểm có hoành độ ${sg(x0)}.`,ans:v,unit:'',
    sol:`${YP} = ${polyH(pd(cs))}; hệ số góc là ${YP}(${sg(x0)}) = ${sg(v)}.`,chk:()=>Math.abs(numd(x=>pe(cs,x),x0)-v)<1e-3};
},'dn');
TLN11e('t11-9-yint',9,'TH',r=>{
  const cs=[r.nz(-2,2),r.int(-3,3),r.int(-4,4),r.int(-5,5)],x0=r.int(-2,2),k=pe(pd(cs),x0),y0=pe(cs,x0),m=y0-k*x0;
  return{kind:'tln',stem:`Tiếp tuyến của đồ thị hàm số ${I('y')} = ${polyH(cs)} tại điểm có hoành độ ${sg(x0)} cắt trục tung tại điểm có tung độ bằng bao nhiêu?`,ans:m,unit:'',
    sol:`${YP}(${sg(x0)}) = ${sg(k)}, ${I('y')}(${sg(x0)}) = ${sg(y0)}. Tiếp tuyến: ${I('y')} = ${sg(k)}(${X9} ${x0<0?'+':MINUS} ${Math.abs(x0)}) ${PL(y0)} = ${xlin(k,m)}. Giao với trục tung (${X9} = 0): ${I('y')} = ${sg(m)}.`,chk:()=>Math.abs(numd(x=>pe(cs,x),x0)-k)<1e-3};
},'dn');
TLN11e('t11-9-roots',9,'TH',r=>{
  const [r1,r2]=r.shuffle([-3,-2,-1,1,2,3,4]).slice(0,2),cs=cub2(r1,r2);
  return{kind:'tln',stem:`Cho hàm số ${FX} = ${polyH(cs)}. Tính tổng các nghiệm của phương trình ${I('f')}′(${X9}) = 0.`,ans:r1+r2,unit:'',
    sol:`${I('f')}′(${X9}) = ${polyH(pd(cs))} = 6${fac(r1)}${fac(r2)} = 0 có hai nghiệm ${X9} = ${sg(r1)} và ${X9} = ${sg(r2)}. Tổng bằng ${sg(r1+r2)}.`,chk:()=>pe(pd(cs),r1)===0&&pe(pd(cs),r2)===0};
},'qt');
TLN11e('t11-9-vel0',9,'VD',r=>{
  const q=r.int(2,5),d=r.int(1,q-1),cs=mot(q,d),v=pd(cs),ac=pd(v);
  return{kind:'tln',stem:`Một chất điểm chuyển động thẳng theo phương trình ${I('s')}(${I('t')}) = ${polyH(cs,'t')} (${I('t')} tính bằng giây, ${I('s')} tính bằng mét). Tính vận tốc (đơn vị: m/s) của chất điểm tại thời điểm gia tốc bằng 0.`,ans:pe(v,q),unit:'m/s',
    sol:`${I('v')}(${I('t')}) = ${polyH(v,'t')}; ${I('a')}(${I('t')}) = ${polyH(ac,'t')} = 0 ⟺ ${I('t')} = ${q}. Khi đó ${I('v')}(${q}) = ${sg(pe(v,q))} (m/s).`,chk:()=>pe(ac,q)===0&&pe(v,q)===-3*d*d};
},'dn');
TLN11e('t11-9-d2',9,'TH',r=>{
  const cs=[r.nz(-2,2),r.int(-4,4),r.int(-4,4),r.int(-5,5),r.int(-5,5)],x0=r.int(-2,2),v=pe(pd(pd(cs)),x0);
  return{kind:'tln',stem:`Cho hàm số ${FX} = ${polyH(cs)}. Tính ${fpp(sg(x0))}.`,ans:v,unit:'',sol:`${I('f')}′(${X9}) = ${polyH(pd(cs))}; ${I('f')}″(${X9}) = ${polyH(pd(pd(cs)))}; ${fpp(sg(x0))} = ${sg(v)}.`,chk:()=>Math.abs(numd(x=>pe(pd(cs),x),x0)-v)<1e-3};
},'c2');

/* ----- Tự luận chương IX (role b) ----- */
TL11e('tl11-9-tangent',9,'TH','b',r=>{
  const cs=[r.nz(-2,2),r.int(-3,3),r.int(-4,4),r.int(-5,5)],x0=r.int(-2,2),d=pd(cs),k=pe(d,x0),y0=pe(cs,x0),m=y0-k*x0;
  return{kind:'tl',title:'Đạo hàm và tiếp tuyến',parts:[
    {pts:.5,html:`Cho hàm số ${I('y')} = ${I('f')}(${X9}) = ${polyH(cs)}.<br>Tính ${YP} và ${I('f')}′(${sg(x0)}).`},
    {pts:.5,html:`Viết phương trình tiếp tuyến của đồ thị hàm số tại điểm có hoành độ ${sg(x0)}.`}],
    sol:[ptxt([[`${YP} = ${polyH(d)}.`,.25],[`${I('f')}′(${sg(x0)}) = ${sg(k)}.`,.25]]),
      ptxt([[`${I('y')}${sub(0)} = ${I('f')}(${sg(x0)}) = ${sg(y0)}; hệ số góc k = ${sg(k)}.`,.25],[`Phương trình tiếp tuyến: ${I('y')} = ${sg(k)}(${X9} ${x0<0?'+':MINUS} ${Math.abs(x0)}) ${PL(y0)} hay ${I('y')} = ${xlin(k,m)}.`,.25]])],
    chk:()=>Math.abs(numd(x=>pe(cs,x),x0)-k)<1e-3};
},'dn');
const fac=z=>z===0?X9:`(${X9} ${z<0?'+':MINUS} ${Math.abs(z)})`;
TL11e('tl11-9-rules',9,'TH','b',r=>{
  const [r1,r2]=r.shuffle([-3,-2,-1,0,1,2,3,4]).slice(0,2).sort((x,y)=>x-y),cs=cub2(r1,r2);
  return{kind:'tl',title:'Quy tắc tính đạo hàm',parts:[
    {pts:.5,html:`Cho hàm số ${I('y')} = ${I('f')}(${X9}) = ${polyH(cs)}.<br>Tính đạo hàm ${YP}.`},
    {pts:.5,html:`Giải bất phương trình ${YP} ≤ 0.`}],
    sol:[ptxt([[`Áp dụng (${X9}${sup('n')})′ = n·${X9}${sup('n−1')} cho từng số hạng.`,.25],[`${YP} = ${polyH(pd(cs))}.`,.25]]),
      ptxt([[`${polyH(pd(cs))} = 6${fac(r1)}${fac(r2)}.`,.25],[`Tam thức bậc hai có hệ số của ${X9}² dương nên ${YP} ≤ 0 ⟺ ${sg(r1)} ≤ ${X9} ≤ ${sg(r2)}. Tập nghiệm: [${sg(r1)}; ${sg(r2)}].`,.25]])],
    chk:()=>pe(pd(cs),r1)===0&&pe(pd(cs),r2)===0&&r1<r2};
},'qt');
TL11e('tl11-9-motion',9,'VD','b',r=>{
  const q=r.int(2,5),d=r.int(1,q-1),r1=q-d,r2=q+d,cs=mot(q,d),v=pd(cs),ac=pd(v);
  return{kind:'tl',title:'Ý nghĩa vật lí của đạo hàm',parts:[
    {pts:.5,html:`Một chất điểm chuyển động thẳng theo phương trình ${I('s')}(${I('t')}) = ${polyH(cs,'t')} (${I('t')} ≥ 0 tính bằng giây, ${I('s')} tính bằng mét).<br>Tính vận tốc ${I('v')}(${I('t')}) và gia tốc ${I('a')}(${I('t')}) của chất điểm tại thời điểm ${I('t')}.`},
    {pts:.5,html:`Tìm các thời điểm chất điểm dừng lại (vận tốc bằng 0) và tính gia tốc của chất điểm tại các thời điểm đó.`}],
    sol:[ptxt([[`${I('v')}(${I('t')}) = ${I('s')}′(${I('t')}) = ${polyH(v,'t')} (m/s).`,.25],[`${I('a')}(${I('t')}) = ${I('v')}′(${I('t')}) = ${polyH(ac,'t')} (m/s²).`,.25]]),
      ptxt([[`${I('v')}(${I('t')}) = 0 ⟺ ${I('t')} = ${r1} hoặc ${I('t')} = ${r2} (giây).`,.25],[`${I('a')}(${r1}) = ${sg(pe(ac,r1))} m/s²; ${I('a')}(${r2}) = ${sg(pe(ac,r2))} m/s².`,.25]])],
    chk:()=>pe(v,r1)===0&&pe(v,r2)===0&&r1>0};
},'dn');
TL11e('tl11-9-tangent2',9,'VD','b',r=>{
  const [x1,x2]=r.pick([[-1,3],[-2,4],[0,2],[-3,5],[1,1]].filter(z=>z[0]!==z[1])),c=r.int(-4,4),P=x1*x2,k=c-3*P,b=-3,d0=r.int(-3,3),cs=[1,b,c,d0];
  const m1=pe(cs,x1)-k*x1,m2=pe(cs,x2)-k*x2;let m0=r.int(-8,8);while(m0===m1||m0===m2)m0++;
  if(k===0)return T.tl['tl11-9-tangent2'].gen(r);
  return{kind:'tl',title:'Tiếp tuyến song song với một đường thẳng cho trước',parts:[
    {pts:.5,html:`Cho hàm số ${I('y')} = ${I('f')}(${X9}) = ${polyH(cs)} có đồ thị (${I('C')}).<br>Giải phương trình ${I('f')}′(${X9}) = ${sg(k)}.`},
    {pts:.5,html:`Viết phương trình các tiếp tuyến của (${I('C')}) song song với đường thẳng ${I('d')}: ${I('y')} = ${xlin(k,m0)}.`}],
    sol:[ptxt([[`${I('f')}′(${X9}) = ${polyH(pd(cs))}.`,.25],[`${polyH(pd(cs))} = ${sg(k)} ⟺ ${polyH([3,-6,c-k])} = 0 ⟺ ${X9} = ${sg(x1)} hoặc ${X9} = ${sg(x2)}.`,.25]]),
      ptxt([[`Tiếp tuyến song song với ${I('d')} có hệ số góc ${sg(k)}, nên hoành độ tiếp điểm là ${sg(x1)} hoặc ${sg(x2)}.`,.25],[`Tại ${X9} = ${sg(x1)}: ${I('y')} = ${xlin(k,m1)}; tại ${X9} = ${sg(x2)}: ${I('y')} = ${xlin(k,m2)}. Cả hai đều khác ${I('d')} (khác tung độ gốc) nên đều thỏa mãn.`,.25]])],
    chk:()=>pe(pd(cs),x1)===k&&pe(pd(cs),x2)===k&&m1!==m0&&m2!==m0};
},'dn');
