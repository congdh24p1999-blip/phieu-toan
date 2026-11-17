/* ================= CHƯƠNG X: MỘT SỐ HÌNH KHỐI TRONG THỰC TIỄN (hình chóp tam giác đều, hình chóp tứ giác đều) ================= */
/* Bộ (a/2; h; d): nửa cạnh đáy, chiều cao, trung đoạn của hình chóp tứ giác đều */
const PYR4=[[3,4,5],[4,3,5],[6,8,10],[8,6,10],[9,12,15],[12,9,15],[12,16,20],[16,12,20],[5,12,13],[12,5,13],[8,15,17],[15,8,17],[7,24,25]];
const pyr4=r=>{const [m,h,d]=r.pick(PYR4);return{a:2*m,h,d}};
const SABCD=`${I('S.ABCD')}`,SABC=`${I('S.ABC')}`;
/* Hình vẽ hình chóp tứ giác đều (O tâm đáy, M trung điểm AB) */
function figPyr4(o={}){
  const a=4,h=o.h||4.6,P={A:[0,0,0],B:[a,0,0],C:[a,a,0],D:[0,a,0],S:[a/2,a/2,h],O:[a/2,a/2,0],M:[a/2,0,0]};
  const show=['S','A','B','C','D'].concat(o.mo?['O','M']:[]);
  return fig3D(P,[['S','A'],['S','B'],['S','C'],['A','B'],['B','C']].concat(o.mo?[['S','M']]:[]),[['S','D'],['A','D'],['D','C']].concat(o.mo?[['S','O'],['O','M']]:[]),show,{w:200,h:170});
}
function figPyr3(o={}){
  const a=4,s=a*Math.sqrt(3)/2,h=o.h||4.4,P={B:[a/2,0,0],A:[0,s,0],C:[a,s,0],S:[a/2,s*2/3,h],O:[a/2,s*2/3,0]};
  return fig3D(P,[['S','A'],['S','B'],['S','C'],['A','B'],['B','C']],[['A','C']].concat(o.o?[['S','O']]:[]),['S','A','B','C'].concat(o.o?['O']:[]),{w:200,h:170});
}

N8('m8-10-elem',10,'NB',r=>{
  const t=r.pick([['tứ giác đều',{mặt:5,cạnh:8,đỉnh:5}],['tam giác đều',{mặt:4,cạnh:6,đỉnh:4}]]),what=r.pick(['mặt','cạnh','đỉnh']),v=t[1][what];
  return mkNum(r,{stem:`Hình chóp ${t[0]} có bao nhiêu ${what}?`,correct:v,cands:[v+1,v-1,v+2,v*2,t[1].mặt===v?t[1].cạnh:t[1].mặt],
    sol:`Hình chóp ${t[0]} có ${t[1].đỉnh} đỉnh (1 đỉnh chung và ${t[1].đỉnh-1} đỉnh của đáy), ${t[1].cạnh} cạnh (${t[1].cạnh/2} cạnh bên và ${t[1].cạnh/2} cạnh đáy) và ${t[1].mặt} mặt (${t[1].mặt-1} mặt bên và 1 mặt đáy).`,chk:()=>true});
});
N8('m8-10-face',10,'NB',r=>{
  const q=r.pick([
    {s:`Mặt đáy của hình chóp tứ giác đều là`,ok:'hình vuông',wr:['hình chữ nhật có hai kích thước khác nhau','hình thoi không là hình vuông','tam giác đều','hình thang cân']},
    {s:`Các mặt bên của hình chóp tứ giác đều là`,ok:'các tam giác cân bằng nhau',wr:['các hình vuông bằng nhau','các tam giác vuông bằng nhau','các hình chữ nhật bằng nhau','các tam giác có ba cạnh khác nhau']},
    {s:`Mặt đáy của hình chóp tam giác đều là`,ok:'tam giác đều',wr:['tam giác vuông','tam giác cân không đều','hình vuông','tam giác có ba cạnh khác nhau']},
    {s:`Chân đường cao của hình chóp tứ giác đều là`,ok:'giao điểm hai đường chéo của đáy',wr:['trung điểm một cạnh đáy','một đỉnh của đáy','trung điểm một cạnh bên','một điểm bất kì trên cạnh đáy']},
    {s:`Trung đoạn của hình chóp đều là`,ok:'đường cao vẽ từ đỉnh của một mặt bên',wr:['đường cao của hình chóp','một cạnh bên của hình chóp','đường chéo của mặt đáy','đoạn nối hai đỉnh của đáy']}]);
  return mkTxt(r,{stem:q.s,correct:q.ok,wrongs:r.shuffle(q.wr),sol:`${q.s} ${q.ok}.`,chk:()=>true});
});
N8('m8-10-sxq',10,'TH',r=>{
  if(r.chance(.5)){const {a,d}=pyr4(r),S=2*a*d;
    return mkNum(r,{stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Diện tích xung quanh của hình chóp là`,correct:S,cands:[a*d,4*a*d,S+a*a,a*a,2*a+d],f:z=>`${z} cm²`,
      sol:`${I('S')}${sub('xq')} = ${I('p')}·${I('d')} với nửa chu vi đáy ${I('p')} = ${fr(`4·${a}`,2)} = ${2*a} cm. Vậy ${I('S')}${sub('xq')} = ${2*a}·${d} = ${S} cm².`,chk:()=>true})}
  const a=r.int(3,12)*2,d=r.int(Math.ceil(a/(2*Math.sqrt(3)))+1,Math.ceil(a/(2*Math.sqrt(3)))+10),S=3*a*d/2; /* trung đoạn phải lớn hơn bán kính đường tròn nội tiếp đáy a/(2√3) */
  return mkNum(r,{stem:`Một hình chóp tam giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Diện tích xung quanh của hình chóp là`,correct:S,cands:[3*a*d,a*d,S/3,S+a,a*d/2],f:z=>`${fmt(z)} cm²`,
    sol:`${I('S')}${sub('xq')} = ${I('p')}·${I('d')} với nửa chu vi đáy ${I('p')} = ${fr(`3·${a}`,2)} = ${3*a/2} cm. Vậy ${I('S')}${sub('xq')} = ${3*a/2}·${d} = ${S} cm².`,chk:()=>Number.isInteger(S)&&d>a/(2*Math.sqrt(3))});
});
N8('m8-10-vol',10,'TH',r=>{
  if(r.chance(.5)){const {a,h}=pyr4(r),V=a*a*h/3;
    return mkNum(r,{stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và chiều cao ${h} cm. Thể tích của hình chóp là`,correct:V,cands:[a*a*h,a*h/3,V*2,a*a*h/2,V+a],f:z=>`${fmt(z)} cm³`,
      sol:`${I('V')} = ${fr(1,3)}${I('S')}·${I('h')} = ${fr(1,3)}·${a}${sup(2)}·${h} = ${V} cm³.`,chk:()=>Number.isInteger(V)})}
  const S=r.int(2,12)*3,h=r.int(3,15),V=S*h/3;
  return mkNum(r,{stem:`Một hình chóp tam giác đều có diện tích đáy ${S} cm² và chiều cao ${h} cm. Thể tích của hình chóp là`,correct:V,cands:[S*h,S*h/2,V+h,V*2,S+h],f:z=>`${fmt(z)} cm³`,
    sol:`${I('V')} = ${fr(1,3)}${I('S')}·${I('h')} = ${fr(1,3)}·${S}·${h} = ${V} cm³.`,chk:()=>Number.isInteger(V)});
});
N8('m8-10-apo',10,'TH',r=>{
  const {a,h,d}=pyr4(r);
  return mkNum(r,{stem:`Hình chóp tứ giác đều ${SABCD} có cạnh đáy ${a} cm, chiều cao ${I('SO')} = ${h} cm. Độ dài trung đoạn của hình chóp là`,correct:d,cands:[a/2+h,Math.round(Math.hypot(a,h)),d+1,d-1,h,a],f:z=>`${z} cm`,
    sol:`Gọi ${I('M')} là trung điểm của ${I('AB')}, ${I('OM')} = ${fr(a,2)} = ${a/2} cm. Tam giác ${I('SOM')} vuông tại ${I('O')} nên ${I('SM')} = ${rt(`${h}${sup(2)} + ${a/2}${sup(2)}`)} = ${rt(d*d)} = ${d} cm.`,chk:()=>h*h+(a/2)**2===d*d});
});
N8('m8-10-stp',10,'TH',r=>{
  const {a,d}=pyr4(r),S=a*a+2*a*d;
  return mkNum(r,{stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và trung đoạn ${d} cm. Diện tích toàn phần của hình chóp (tổng diện tích các mặt) là`,correct:S,cands:[2*a*d,a*a+a*d,a*a+4*a*d,S+a,4*a*d],f:z=>`${z} cm²`,
    sol:`${I('S')}${sub('xq')} = ${2*a}·${d} = ${2*a*d} cm², diện tích đáy = ${a}${sup(2)} = ${a*a} cm². Diện tích toàn phần = ${2*a*d} + ${a*a} = ${S} cm².`,chk:()=>true});
});
N8('m8-10-h',10,'TH',r=>{
  const a=r.pick([3,4,5,6,9,10,12]),h=r.int(2,12),V=a*a*h/3;if(!Number.isInteger(V))return T.nlc['m8-10-h'].gen(r);
  return mkNum(r,{stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và thể tích ${V} cm³. Chiều cao của hình chóp là`,correct:h,ok:c=>c>0&&Number.isInteger(c),cands:[3*h,V/(a*a),h+1,h-1,Math.round(V/a)],f:z=>`${fmt(z)} cm`,
    sol:`${I('V')} = ${fr(1,3)}${I('a')}${sup(2)}${I('h')} nên ${I('h')} = ${fr(`3${I('V')}`,`${I('a')}${sup(2)}`)} = ${fr(`3·${V}`,a*a)} = ${h} cm.`,chk:()=>3*V===a*a*h});
});
N8('m8-10-real',10,'TH',r=>{
  const {a,h,d}=pyr4(r),kind=r.int(0,1);
  if(kind===0){const S=2*a*d/100;
    return mkNum(r,{stem:`Một chiếc lều có dạng hình chóp tứ giác đều, cạnh đáy ${fmt(a/10)} m, trung đoạn ${fmt(d/10)} m. Diện tích vải cần dùng để làm bốn mặt bên của lều (không kể đáy và các mép nối) là`,correct:S,cands:[a*d/100,4*a*d/100,S+a*a/100,(a*a+2*a*d)/100,S*2],f:z=>`${fmt(z)} m²`,
      sol:`Diện tích vải bằng diện tích xung quanh: ${I('S')}${sub('xq')} = ${I('p')}·${I('d')} = ${fmt(2*a/10)}·${fmt(d/10)} = ${fmt(S)} m².`,chk:()=>Math.abs(S*100-Math.round(S*100))<1e-9})}
  const V=a*a*h/3;
  return mkNum(r,{stem:`Một khối gỗ trang trí có dạng hình chóp tứ giác đều, cạnh đáy ${a} cm, chiều cao ${h} cm. Thể tích khối gỗ là`,correct:V,cands:[a*a*h,V*2,a*a*h/2,V+a*a,a*h],f:z=>`${fmt(z)} cm³`,
    sol:`${I('V')} = ${fr(1,3)}·${a}${sup(2)}·${h} = ${V} cm³.`,chk:()=>Number.isInteger(V)});
});

DS8('ds8-10-pyr',10,'TH',r=>{
  const {a,h,d}=pyr4(r),Sxq=2*a*d,V=a*a*h/3;
  const items=[
    {t:`Hình chóp ${SABCD} có 8 cạnh.`,f:`Hình chóp ${SABCD} có 6 cạnh.`,why:`Có 4 cạnh bên và 4 cạnh đáy.`},
    {t:`Trung đoạn của hình chóp bằng ${d} cm.`,f:`Trung đoạn của hình chóp bằng ${a/2+h} cm.`,why:`${I('SM')} = ${rt(`${h}${sup(2)} + ${a/2}${sup(2)}`)} = ${d} cm (${I('M')} là trung điểm của ${I('AB')}).`},
    {t:`Diện tích xung quanh của hình chóp bằng ${Sxq} cm².`,f:`Diện tích xung quanh của hình chóp bằng ${a*d} cm².`,why:`${I('S')}${sub('xq')} = ${I('p')}·${I('d')} = ${2*a}·${d} = ${Sxq} cm².`},
    {t:`Thể tích của hình chóp bằng ${V} cm³.`,f:`Thể tích của hình chóp bằng ${a*a*h} cm³.`,why:`${I('V')} = ${fr(1,3)}·${a}${sup(2)}·${h} = ${V} cm³.`}
  ];
  return mkDS(r,{stem:`Cho hình chóp tứ giác đều ${SABCD} có cạnh đáy ${a} cm, chiều cao ${I('SO')} = ${h} cm.${figPyr4({mo:1})} Xét tính đúng sai của các khẳng định sau:`,items,chk:()=>h*h+(a/2)**2===d*d&&Number.isInteger(V)});
});

TLN8('t8-10-sxq',10,'TH',r=>{
  const {a,d}=pyr4(r),S=2*a*d;
  return{kind:'tln',stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm, trung đoạn ${d} cm. Tính diện tích xung quanh của hình chóp (đơn vị cm²).`,ans:S,unit:'',
    sol:`${I('S')}${sub('xq')} = ${I('p')}·${I('d')} = ${2*a}·${d} = ${S} cm².`,chk:()=>true};
});
TLN8('t8-10-vol',10,'TH',r=>{
  if(r.chance(.5)){const {a,h}=pyr4(r),V=a*a*h/3;
    return{kind:'tln',stem:`Tính thể tích của hình chóp tứ giác đều có cạnh đáy ${a} cm và chiều cao ${h} cm (đơn vị cm³).`,ans:V,unit:'',sol:`${I('V')} = ${fr(1,3)}·${a}${sup(2)}·${h} = ${V} cm³.`,chk:()=>Number.isInteger(V)}}
  const S=r.int(2,15)*3,h=r.int(3,12),V=S*h/3;
  return{kind:'tln',stem:`Tính thể tích của hình chóp tam giác đều có diện tích đáy ${S} cm² và chiều cao ${h} cm (đơn vị cm³).`,ans:V,unit:'',sol:`${I('V')} = ${fr(1,3)}·${S}·${h} = ${V} cm³.`,chk:()=>Number.isInteger(V)};
});
TLN8('t8-10-real',10,'VD',r=>{
  const {a,h,d}=pyr4(r),price=r.pick([20,25,30,40,50]),S=2*a*d;
  return{kind:'tln',stem:`Người ta làm mái che có dạng bốn mặt bên của một hình chóp tứ giác đều, cạnh đáy ${a} m, chiều cao ${h} m. Chi phí lợp mái là ${price} nghìn đồng/m². Tính tổng chi phí lợp mái (đơn vị nghìn đồng).`,ans:S*price,unit:'',
    sol:`Trung đoạn ${I('d')} = ${rt(`${h}${sup(2)} + ${a/2}${sup(2)}`)} = ${d} m. Diện tích mái ${I('S')}${sub('xq')} = ${2*a}·${d} = ${S} m². Chi phí: ${S}·${price} = ${S*price} nghìn đồng.`,chk:()=>h*h+(a/2)**2===d*d};
});
TLN8('t8-10-vdc',10,'VDC',r=>{
  const {a,h,d}=pyr4(r),Stp=a*a+2*a*d,V=a*a*h/3;
  return{kind:'tln',stem:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và diện tích toàn phần (tổng diện tích các mặt) bằng ${Stp} cm². Tính thể tích của hình chóp (đơn vị cm³).`,ans:V,unit:'',
    sol:`${I('S')}${sub('xq')} = ${Stp} ${MINUS} ${a}${sup(2)} = ${2*a*d} cm², nên trung đoạn ${I('d')} = ${2*a*d}/${2*a} = ${d} cm. Chiều cao ${I('h')} = ${rt(`${d}${sup(2)} ${MINUS} ${a/2}${sup(2)}`)} = ${h} cm. Thể tích ${I('V')} = ${fr(1,3)}·${a}${sup(2)}·${h} = ${V} cm³.`,chk:()=>h*h+(a/2)**2===d*d&&Number.isInteger(V)};
});

TL8('tl8-10-pyr3',10,'TH','real',r=>{
  const a=r.int(3,10)*2,d=r.int(Math.ceil(a/(2*Math.sqrt(3)))+1,Math.ceil(a/(2*Math.sqrt(3)))+9),k=r.pick([2,3]),Sxq=3*a*d/2;
  return{kind:'tl',title:'Hình chóp tam giác đều',parts:[
    {pts:.5,html:`Một hộp quà có dạng hình chóp tam giác đều ${SABC} với cạnh đáy ${a} cm, trung đoạn ${d} cm.${figPyr3({o:1})} Tính diện tích giấy cần dùng để dán kín các mặt bên của hộp (không kể mép dán).`},
    {pts:.5,html:`Người ta làm một hộp quà thứ hai cũng có dạng hình chóp tam giác đều, có cạnh đáy và trung đoạn đều gấp ${k} lần hộp thứ nhất. Diện tích giấy dán các mặt bên của hộp thứ hai gấp bao nhiêu lần hộp thứ nhất? Tính diện tích đó.`}],
    sol:[ptxt([[`Nửa chu vi đáy ${I('p')} = ${fr(`3·${a}`,2)} = ${3*a/2} cm.`,.25],[`Diện tích giấy = ${I('S')}${sub('xq')} = ${I('p')}·${I('d')} = ${3*a/2}·${d} = ${Sxq} cm².`,.25]]),
      ptxt([[`Hộp thứ hai có nửa chu vi đáy ${k*3*a/2} cm và trung đoạn ${k*d} cm nên ${I('S')}${sub('xq')} = ${k*3*a/2}·${k*d} = ${k*k*Sxq} cm².`,.25],[`Vậy diện tích giấy gấp ${k}·${k} = ${k*k} lần hộp thứ nhất.`,.25]])],
    chk:()=>Number.isInteger(Sxq)&&d>a/(2*Math.sqrt(3))};
});
TL8('tl8-10-pyr4',10,'VD','geo',r=>{
  const {a,h,d}=pyr4(r),Sxq=2*a*d,V=a*a*h/3;
  return{kind:'tl',title:'Hình chóp tứ giác đều',parts:[
    {pts:.5,html:`Cho hình chóp tứ giác đều ${SABCD} có cạnh đáy ${a} cm, chiều cao ${I('SO')} = ${h} cm. Gọi ${I('M')} là trung điểm của ${I('AB')}.${figPyr4({mo:1})} Tính độ dài trung đoạn ${I('SM')} và diện tích xung quanh của hình chóp.`},
    {pts:.5,html:`Tính thể tích của hình chóp ${SABCD}.`}],
    sol:[ptxt([[`${I('OM')} = ${fr(a,2)} = ${a/2} cm; tam giác ${I('SOM')} vuông tại ${I('O')} nên ${I('SM')} = ${rt(`${h}${sup(2)} + ${a/2}${sup(2)}`)} = ${d} cm.`,.25],[`${I('S')}${sub('xq')} = ${I('p')}·${I('d')} = ${2*a}·${d} = ${Sxq} cm².`,.25]]),
      ptxt([[`Diện tích đáy = ${a}${sup(2)} = ${a*a} cm².`,.25],[`${I('V')} = ${fr(1,3)}·${a*a}·${h} = ${V} cm³.`,.25]])],
    chk:()=>h*h+(a/2)**2===d*d&&Number.isInteger(V)};
});
TL8('tl8-10-vdc',10,'VDC','geo',r=>{
  const {a,h,d}=pyr4(r),Stp=a*a+2*a*d,V=a*a*h/3,k=r.pick([2,3]);
  return{kind:'tl',title:'Hình chóp tứ giác đều (vận dụng cao)',parts:[
    {pts:.5,html:`Một hình chóp tứ giác đều có cạnh đáy ${a} cm và tổng diện tích các mặt bằng ${Stp} cm². Tính trung đoạn và chiều cao của hình chóp.${figPyr4({mo:1})}`},
    {pts:.5,html:`Tính thể tích của hình chóp. Nếu giữ nguyên chiều cao và tăng cạnh đáy lên ${k} lần thì thể tích tăng lên bao nhiêu lần?`}],
    sol:[ptxt([[`${I('S')}${sub('xq')} = ${Stp} ${MINUS} ${a*a} = ${2*a*d} cm² = ${2*a}·${I('d')} ⟹ ${I('d')} = ${d} cm.`,.25],[`${I('h')} = ${rt(`${d}${sup(2)} ${MINUS} ${a/2}${sup(2)}`)} = ${h} cm.`,.25]]),
      ptxt([[`${I('V')} = ${fr(1,3)}·${a}${sup(2)}·${h} = ${V} cm³.`,.25],[`Cạnh đáy tăng ${k} lần thì diện tích đáy tăng ${k*k} lần, chiều cao không đổi nên thể tích tăng ${k*k} lần.`,.25]])],
    chk:()=>h*h+(a/2)**2===d*d&&Number.isInteger(V)};
});
