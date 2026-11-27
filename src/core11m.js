/* ================================================================
   LỚP 11 – bổ sung dạng câu (27/11/2026)
   Bài 8: Mẫu số liệu ghép nhóm; Bài 13: Hai mặt phẳng song song;
   Bài 14: Phép chiếu song song (trước đây chưa có dạng); Bài 17: Hàm số liên tục.
   ================================================================ */
const N11x=(id,ch,lv,les,gen)=>reg('nlc',id,ch,lv,gen,{g:11,hk:1,les});
const DS11x=(id,ch,lv,les,gen)=>reg('ds',id,ch,lv,gen,{g:11,hk:1,les});
const TLN11x=(id,ch,lv,les,gen)=>reg('tln',id,ch,lv,gen,{g:11,hk:1,les});
const TL11x=(id,ch,lv,role,les,gen)=>reg('tl',id,ch,lv,gen,{role,g:11,hk:1,les});
/* bảng ghép nhóm: nhóm [a + i·h; a + (i+1)·h) */
const grp11=(a,h,fs,lab,unit)=>tableHTML([lab+(unit?` (${unit})`:''),...fs.map((_,i)=>`[${fmt(a+i*h)}; ${fmt(a+(i+1)*h)})`)],[['Tần số',...fs]]);
const GRP11=[{lab:'Thời gian',unit:'phút',what:'thời gian (phút) tự học ở nhà mỗi ngày của một nhóm học sinh',a:[20,30,40],h:[10,10,10]},{lab:'Chiều cao',unit:'cm',what:'chiều cao (cm) của học sinh một lớp',a:[150,155,145],h:[5,5,5]},{lab:'Cân nặng',unit:'kg',what:'cân nặng (kg) của học sinh một lớp',a:[40,42,45],h:[4,4,5]}];

/* ===================== Bài 8: Mẫu số liệu ghép nhóm ===================== */
N11x('k11x-8-rep',3,'NB',[8],r=>{
  const G=r.pick(GRP11),j=r.int(0,2),a=G.a[j],h=G.h[j],fs=[...Array(5)].map(()=>r.int(2,12)),i=r.int(0,4),lo=a+i*h,hi=lo+h,t=r.chance(.5);
  const stem=`Bảng sau cho biết ${G.what}.<div class="figure">${grp11(a,h,fs,G.lab,G.unit)}</div>`;
  return t?mkNum(r,{stem:stem+`Giá trị đại diện của nhóm [${lo}; ${hi}) là`,correct:(lo+hi)/2,cands:[lo,hi,h,(lo+hi)/2+h],ok:x=>x>0,sol:`Giá trị đại diện là trung điểm của nhóm: (${lo} + ${hi}) : 2 = ${fmt((lo+hi)/2)}.`,chk:()=>true})
    :mkNum(r,{stem:stem+'Độ dài của mỗi nhóm là',correct:h,cands:[h/2,2*h,h+1,a].filter(x=>x>0),ok:x=>x>0,sol:`Độ dài nhóm [${lo}; ${hi}) là ${hi} − ${lo} = ${h}.`,chk:()=>true});
});
N11x('k11x-8-mode',3,'TH',[8],r=>{
  for(;;){const G=r.pick(GRP11),j=r.int(0,2),a=G.a[j],h=G.h[j],fs=[...Array(5)].map(()=>r.int(2,14)),mx=Math.max(...fs),im=fs.indexOf(mx);if(fs.filter(v=>v===mx).length>1)continue;
    const nm=i=>`[${a+i*h}; ${a+(i+1)*h})`;
    return mkTxt(r,{stem:`Bảng sau cho biết ${G.what}.<div class="figure">${grp11(a,h,fs,G.lab,G.unit)}</div>Nhóm có tần số lớn nhất là`,correct:nm(im),wrongs:[0,1,2,3,4].filter(i=>i!==im).map(nm),sol:`Tần số lớn nhất là ${mx}, ứng với nhóm ${nm(im)}.`,chk:()=>true})}
});
TLN11x('t11x-8-count',3,'TH',[8],r=>{
  const a=r.pick([10,20,40]),h=r.pick([5,10]),k=r.int(0,3),xs=[...Array(r.int(16,22))].map(()=>a+r.int(0,4*h-1)),lo=a+k*h,v=xs.filter(x=>x>=lo&&x<lo+h).length;
  if(!v)return{kind:'tln',stem:`Cho mẫu số liệu: ${xs.join('; ')}. Cỡ mẫu là bao nhiêu?`,ans:xs.length,unit:'',sol:`Có ${xs.length} giá trị.`,chk:()=>true};
  return{kind:'tln',stem:`Cho mẫu số liệu: ${xs.join('; ')}. Khi ghép nhóm với các nhóm [${a}; ${a+h}), [${a+h}; ${a+2*h}), …, tần số của nhóm [${lo}; ${lo+h}) là bao nhiêu?`,ans:v,unit:'',
    sol:`Đếm các giá trị x thoả mãn ${lo} ≤ x < ${lo+h}: ${xs.filter(x=>x>=lo&&x<lo+h).join(', ')} – có ${v} giá trị.`,chk:()=>true};
});
DS11x('ds11x-8-table',3,'TH',[8],r=>{
  for(;;){const G=r.pick(GRP11),j=r.int(0,2),a=G.a[j],h=G.h[j],fs=[...Array(5)].map(()=>r.int(2,14)),n=fs.reduce((x,y)=>x+y,0),mx=Math.max(...fs),im=fs.indexOf(mx);if(fs.filter(v=>v===mx).length>1)continue;const i=r.int(0,4);
    return mkDS(r,{stem:`Bảng sau cho biết ${G.what}.<div class="figure">${grp11(a,h,fs,G.lab,G.unit)}</div>Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Cỡ mẫu là ${n}.`,f:`Cỡ mẫu là 5.`,why:`Cỡ mẫu = tổng các tần số = ${n}; 5 là số nhóm.`},
      {t:`Độ dài mỗi nhóm là ${h}.`,f:`Độ dài mỗi nhóm là ${a}.`,why:`Mỗi nhóm có dạng [a; a + ${h}).`},
      {t:`Giá trị đại diện của nhóm thứ ${i+1} là ${fmt(a+i*h+h/2)}.`,f:`Giá trị đại diện của nhóm thứ ${i+1} là ${fmt(a+i*h)}.`,why:`Trung điểm nhóm [${a+i*h}; ${a+(i+1)*h}) là ${fmt(a+i*h+h/2)}.`},
      {t:`Có ${fs.slice(0,2).reduce((x,y)=>x+y,0)} giá trị nhỏ hơn ${a+2*h}.`,f:`Có ${fs.slice(0,3).reduce((x,y)=>x+y,0)} giá trị nhỏ hơn ${a+2*h}.`,why:`Các giá trị nhỏ hơn ${a+2*h} thuộc hai nhóm đầu: ${fs[0]} + ${fs[1]}.`}],chk:()=>true})}
});

/* ===================== Bài 13: Hai mặt phẳng song song ===================== */
N11x('k11x-13-cond',4,'NB',[13],r=>{
  const P=I('(P)'),Qm=I('(Q)');
  return mkTxt(r,{stem:`Cho hai mặt phẳng phân biệt ${P} và ${Qm}. Điều kiện nào sau đây đủ để ${P} ∥ ${Qm}?`,correct:`${P} chứa hai đường thẳng cắt nhau và cả hai đường thẳng đó cùng song song với ${Qm}`,
    wrongs:[`${P} chứa một đường thẳng song song với ${Qm}`,`${P} chứa hai đường thẳng song song với nhau và cùng song song với ${Qm}`,`${P} và ${Qm} cùng song song với một đường thẳng`],
    sol:`Nếu mặt phẳng (P) chứa hai đường thẳng cắt nhau a, b và a, b cùng song song với (Q) thì (P) ∥ (Q). Hai đường thẳng song song thì chưa đủ.`,chk:()=>true});
});
TLN11x('t11x-13-thales',4,'TH',[13],r=>{
  for(;;){const a=r.int(2,9),b=r.int(2,9),k=r.int(2,5),c=a*k;if(a===b)continue;
    return{kind:'tln',stem:`Ba mặt phẳng đôi một song song ${I('(P)')}, ${I('(Q)')}, ${I('(R)')} chắn trên đường thẳng ${I('d')} các đoạn thẳng ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm và chắn trên đường thẳng ${I('d′')} các đoạn thẳng tương ứng ${I('A′B′')} = ${c} cm, ${I('B′C′')}. Tính ${I('B′C′')} (đơn vị: cm).`,ans:b*k,unit:'cm',
      sol:`Theo định lí Thalès trong không gian: AB/A′B′ = BC/B′C′, nên B′C′ = BC·A′B′/AB = ${b}·${c}/${a} = ${b*k} (cm).`,chk:()=>true}}
});

/* ===================== Bài 14: Phép chiếu song song ===================== */
N11x('k11x-14-prop',4,'NB',[14],r=>{
  const t=r.int(0,2);
  const C=[['Qua phép chiếu song song (phương chiếu không song song với hai đường thẳng đó), hai đường thẳng song song được biến thành','hai đường thẳng song song hoặc trùng nhau',['hai đường thẳng cắt nhau','hai đường thẳng chéo nhau','hai đường thẳng vuông góc'],'Phép chiếu song song biến hai đường thẳng song song thành hai đường thẳng song song hoặc trùng nhau.'],
    ['Phép chiếu song song không nhất thiết giữ nguyên yếu tố nào sau đây?','Số đo của góc',['Tính thẳng hàng của ba điểm','Thứ tự của ba điểm thẳng hàng','Tỉ số độ dài hai đoạn thẳng nằm trên cùng một đường thẳng'],'Phép chiếu song song giữ tính thẳng hàng, thứ tự, tỉ số độ dài trên cùng một đường thẳng (hoặc hai đường song song), nhưng không giữ số đo góc.'],
    ['Qua phép chiếu song song, trung điểm của đoạn thẳng AB (AB không song song với phương chiếu) được biến thành','trung điểm của đoạn thẳng là hình chiếu của AB',['một đầu mút của hình chiếu của AB','một điểm bất kì trên hình chiếu của AB','một điểm nằm ngoài hình chiếu của AB'],'Phép chiếu song song giữ nguyên tỉ số độ dài hai đoạn thẳng trên cùng một đường thẳng, nên giữ trung điểm.']][t];
  return mkTxt(r,{stem:C[0],correct:C[1],wrongs:C[2],sol:C[3],chk:()=>true});
});
N11x('k11x-14-draw',4,'NB',[14],r=>{
  const t=r.int(0,2);
  const C=[['Hình biểu diễn của một hình vuông có thể là hình nào sau đây?','Hình bình hành',['Hình thang có hai cạnh bên không song song','Tứ giác có ba góc tù','Ngũ giác'],'Phép chiếu song song giữ tính song song của các cạnh đối nên hình biểu diễn của hình vuông là một hình bình hành.'],
    ['Hình biểu diễn của một tam giác đều có thể là hình nào sau đây?','Một tam giác bất kì',['Chỉ có thể là tam giác đều','Chỉ có thể là tam giác vuông','Một hình bình hành'],'Hình biểu diễn của một tam giác (bất kì) có thể là một tam giác có dạng tuỳ ý.'],
    ['Hình biểu diễn của một hình thang ABCD (AB ∥ CD, AB = 2CD) có thể là','một hình thang A′B′C′D′ có A′B′ ∥ C′D′ và A′B′ = 2C′D′',['một hình bình hành','một hình thang có A′B′ = C′D′','một tứ giác có hai cạnh đối A′D′ ∥ B′C′'],'Phép chiếu song song giữ tính song song và tỉ số độ dài hai đoạn thẳng song song.']][t];
  return mkTxt(r,{stem:C[0],correct:C[1],wrongs:C[2],sol:C[3],chk:()=>true});
});
DS11x('ds11x-14-prop',4,'NB',[14],r=>mkDS(r,{stem:'Xét phép chiếu song song lên một mặt phẳng theo một phương cho trước. Xét tính đúng sai của các khẳng định sau:',items:[
  {t:'Phép chiếu song song biến ba điểm thẳng hàng thành ba điểm thẳng hàng.',f:'Phép chiếu song song có thể biến ba điểm thẳng hàng thành ba điểm không thẳng hàng.',why:'Phép chiếu song song giữ tính thẳng hàng.'},
  {t:'Hình chiếu song song của một tam giác có thể là một đoạn thẳng.',f:'Hình chiếu song song của một tam giác luôn là một tam giác.',why:'Khi mặt phẳng chứa tam giác song song (hoặc chứa) phương chiếu, hình chiếu là một đoạn thẳng.'},
  {t:'Phép chiếu song song giữ nguyên tỉ số độ dài của hai đoạn thẳng cùng nằm trên một đường thẳng.',f:'Phép chiếu song song giữ nguyên độ dài của mọi đoạn thẳng.',why:'Độ dài nói chung thay đổi, chỉ tỉ số trên cùng một đường thẳng (hoặc hai đường song song) được giữ.'},
  {t:'Hình chiếu song song của trọng tâm tam giác ABC là trọng tâm của tam giác hình chiếu A′B′C′ (khi A′, B′, C′ không thẳng hàng).',f:'Hình chiếu song song của trọng tâm tam giác ABC là trực tâm của tam giác hình chiếu A′B′C′.',why:'Trung điểm biến thành trung điểm, trung tuyến biến thành trung tuyến, nên trọng tâm biến thành trọng tâm.'}],chk:()=>true}));
TLN11x('t11x-14-ratio',4,'TH',[14],r=>{
  for(;;){const a=r.int(2,8),b=r.int(2,8),k=r.int(2,4),t=r.chance(.5);if(a===b)continue;
    return t?{kind:'tln',stem:`Ba điểm ${I('A')}, ${I('B')}, ${I('C')} thẳng hàng (${I('B')} nằm giữa ${I('A')} và ${I('C')}), ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm. Qua phép chiếu song song (phương chiếu không song song với ${I('AC')}), ${I('A')}, ${I('B')}, ${I('C')} lần lượt biến thành ${I('A′')}, ${I('B′')}, ${I('C′')} với ${I('A′B′')} = ${a*k} cm. Tính ${I('B′C′')} (đơn vị: cm).`,ans:b*k,unit:'cm',
        sol:`Phép chiếu song song giữ tỉ số độ dài trên cùng một đường thẳng: B′C′/A′B′ = BC/AB, nên B′C′ = ${a*k}·${b}/${a} = ${b*k} (cm).`,chk:()=>true}
      :{kind:'tln',stem:`Đoạn thẳng ${I('AB')} có trung điểm ${I('M')}. Qua phép chiếu song song, ${I('A')}, ${I('B')}, ${I('M')} lần lượt biến thành ${I('A′')}, ${I('B′')}, ${I('M′')} với ${I('A′B′')} = ${2*a*k} cm. Tính ${I('A′M′')} (đơn vị: cm).`,ans:a*k,unit:'cm',
        sol:`Phép chiếu song song giữ trung điểm nên M′ là trung điểm A′B′: A′M′ = ${2*a*k} : 2 = ${a*k} (cm).`,chk:()=>true}}
});
TLN11x('t11x-14-trap',4,'TH',[14],r=>{
  const k=r.int(2,4),c=r.int(2,9);
  return{kind:'tln',stem:`Cho hình thang ${I('ABCD')} (${I('AB')} ∥ ${I('CD')}) có ${I('AB')} = ${k}${I('CD')}. Hình biểu diễn của nó qua một phép chiếu song song là hình thang ${I('A′B′C′D′')} với ${I('C′D′')} = ${c} cm. Tính ${I('A′B′')} (đơn vị: cm).`,ans:k*c,unit:'cm',
    sol:`Phép chiếu song song giữ tỉ số độ dài của hai đoạn thẳng song song: A′B′/C′D′ = AB/CD = ${k}, nên A′B′ = ${k}·${c} = ${k*c} (cm).`,chk:()=>true};
});
TL11x('tl11x-14-proj',4,'TH','c',[14],r=>{
  const m=r.int(2,8)*3;
  return{kind:'tl',title:'Phép chiếu song song',parts:[
    {pts:.5,html:`Cho hình bình hành ${I('ABCD')} và phép chiếu song song lên mặt phẳng ${I('(P)')} theo phương ${I('l')} (${I('l')} không song song với mặt phẳng ${I('(ABCD)')}). Gọi ${I('A′')}, ${I('B′')}, ${I('C′')}, ${I('D′')} lần lượt là hình chiếu của ${I('A')}, ${I('B')}, ${I('C')}, ${I('D')}. Chứng minh ${I('A′B′C′D′')} là hình bình hành.`},
    {pts:.5,html:`Cho tam giác ${I('ABC')} có trọng tâm ${I('G')}, ${I('M')} là trung điểm ${I('BC')}. Qua phép chiếu song song (phương chiếu không song song với mặt phẳng ${I('(ABC)')}), ${I('A')}, ${I('G')}, ${I('M')} biến thành ${I('A′')}, ${I('G′')}, ${I('M′')}. Biết ${I('A′M′')} = ${m} cm, tính ${I('A′G′')}.`}],
    sol:[ptxt([[`AB ∥ CD và AD ∥ BC; phương chiếu không song song với (ABCD) nên phép chiếu biến chúng thành A′B′ ∥ C′D′, A′D′ ∥ B′C′ (A′, B′, C′, D′ không thẳng hàng).`,.25],[`Tứ giác A′B′C′D′ có các cặp cạnh đối song song nên là hình bình hành.`,.25]]),
      ptxt([[`A, G, M thẳng hàng với AG = ${fr(2,3)}AM; phép chiếu song song giữ tỉ số độ dài trên cùng một đường thẳng.`,.25],[`A′G′ = ${fr(2,3)}·A′M′ = ${fr(2,3)}·${m} = ${2*m/3} (cm).`,.25]])],chk:()=>true};
});

/* ===================== Bài 17: Hàm số liên tục ===================== */
TLN11x('t11x-17-param',5,'TH',[17],r=>{
  const a=r.nz(-6,6),t=r.chance(.5),k=r.int(1,4),c=r.int(1,9),X=I('x');
  if(t)return{kind:'tln',stem:`Cho hàm số ${I('f')}(${X}) = ${fr(`${X}${sup(2)} ${MINUS} ${a*a}`,`${X} ${a>0?MINUS:'+'} ${Math.abs(a)}`)} khi ${X} ≠ ${sg(a)} và ${I('f')}(${sg(a)}) = ${I('m')}. Tìm ${I('m')} để hàm số liên tục tại ${X} = ${sg(a)}.`,ans:2*a,unit:'',
    sol:`Với x ≠ ${sg(a)}: f(x) = x ${a>0?'+':'−'} ${Math.abs(a)}, nên lim f(x) khi x → ${sg(a)} bằng ${sg(2*a)}. Hàm số liên tục tại ${sg(a)} ⟺ m = ${sg(2*a)}.`,chk:()=>true};
  return{kind:'tln',stem:`Cho hàm số ${I('f')}(${X}) = ${k===1?'':k}${X} + ${I('m')} khi ${X} < 1 và ${I('f')}(${X}) = ${X}${sup(2)} + ${c} khi ${X} ≥ 1. Tìm ${I('m')} để hàm số liên tục trên ℝ.`,ans:1+c-k,unit:'',
    sol:`Hai biểu thức đều liên tục trên các khoảng tương ứng; cần lim khi x → 1⁻ bằng f(1): ${k} + m = 1 + ${c}, nên m = ${1+c-k}.`,chk:()=>true};
});
