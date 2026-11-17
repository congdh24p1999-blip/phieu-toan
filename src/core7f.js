/* ===== Toán 7 học kì II: thêm dạng để các đề không lặp cùng một dạng ===== */
/* Bài 20–22: tỉ lệ bản đồ và chia theo tỉ lệ */
TL7b('tl7-6-scale',6,'TH','real',r=>{
  const sc=r.pick([100000,200000,500000,1000000]),cm=r.pick([2,3,4,5,6,7,8]),km=cm*sc/100000;
  const [p,q]=r.pick([[2,3],[3,4],[3,5],[4,5],[2,5],[5,7]]),k=r.pick([20,30,40,50,60]),tot=(p+q)*k;
  return{kind:'tl',title:'Tỉ lệ thức trong thực tế',parts:[
    {pts:.5,html:`Trên bản đồ có tỉ lệ 1 : ${sc.toLocaleString('vi-VN')}, khoảng cách giữa hai thành phố là ${cm} cm. Tính khoảng cách thực tế giữa hai thành phố đó (đơn vị: km).`},
    {pts:.5,html:`Hai bạn An và Bình góp tiền mua chung một bộ sách theo tỉ lệ ${p} : ${q}. Biết bộ sách giá ${tot} nghìn đồng, hỏi mỗi bạn góp bao nhiêu tiền?`}],
    sol:[ptxt([[`Gọi khoảng cách thực tế là ${I('x')} (cm). Ta có ${fr(cm,I('x'))} = ${fr(1,sc.toLocaleString('vi-VN'))}, suy ra ${I('x')} = ${(cm*sc).toLocaleString('vi-VN')} cm.`,.25],[`${(cm*sc).toLocaleString('vi-VN')} cm = ${km} km.`,.25]]),
      ptxt([[`Gọi số tiền An, Bình góp lần lượt là ${I('a')}, ${I('b')} (nghìn đồng): ${fr(I('a'),p)} = ${fr(I('b'),q)} và ${I('a')} + ${I('b')} = ${tot}.`,.25],[`${fr(I('a'),p)} = ${fr(I('b'),q)} = ${fr(`${I('a')} + ${I('b')}`,p+q)} = ${fr(tot,p+q)} = ${k}, nên ${I('a')} = ${p*k}, ${I('b')} = ${q*k} (nghìn đồng).`,.25]])],
    chk:()=>km*100000===cm*sc&&(p+q)*k===tot};
});
/* Bài 25: nhận biết các yếu tố của đa thức */
DS7b('ds7-7-coef',7,'NB',r=>{
  for(;;){const n=r.int(3,4),cs=[r.nz(-7,7)].concat([...Array(n)].map(()=>r.int(-7,7)));if(cs[n]===0)continue;
    const terms=cs.map((c,i)=>({c,e:n-i})).filter(t=>t.c),sh=r.shuffle(terms.slice()),P=sh.map((t,i)=>{const a=Math.abs(t.c),m=(a===1&&t.e>0?'':String(a))+(t.e>0?I('x')+(t.e>1?sup(t.e):''):'');return(i===0?(t.c<0?MINUS:''):(t.c<0?` ${MINUS} `:' + '))+m}).join('');
    const lead=cs[0],free=cs[n],cnt=terms.length;
    return mkDS(r,{stem:`Cho đa thức ${I('P')}(${I('x')}) = ${P}. Xét tính đúng sai của các khẳng định sau:`,items:[
      {t:`Bậc của ${I('P')}(${I('x')}) là ${n}.`,f:`Bậc của ${I('P')}(${I('x')}) là ${n+1}.`,why:`Hạng tử có bậc cao nhất là ${polyH([lead].concat(Array(n).fill(0)))}, nên bậc của đa thức là ${n}.`},
      {t:`Hệ số cao nhất của ${I('P')}(${I('x')}) là ${sg(lead)}.`,f:`Hệ số cao nhất của ${I('P')}(${I('x')}) là ${sg(-lead)}.`,why:`Hệ số của hạng tử bậc cao nhất là ${sg(lead)}.`},
      {t:`Hệ số tự do của ${I('P')}(${I('x')}) là ${sg(free)}.`,f:`Hệ số tự do của ${I('P')}(${I('x')}) là ${sg(free===1?2:-free)}.`,why:`Hạng tử không chứa biến là ${sg(free)}.`},
      {t:`${I('P')}(${I('x')}) có ${cnt} hạng tử.`,f:`${I('P')}(${I('x')}) có ${cnt+1} hạng tử.`,why:`Đa thức đã thu gọn, có ${cnt} hạng tử.`}
    ],chk:()=>lead!==0&&free!==0})}
});
/* Bài 28: phép chia đa thức một biến cho x − a */
DS7b('ds7-7-div',7,'VD',r=>{
  for(;;){const a=r.nz(-3,3),q=[r.nz(-3,3),r.int(-5,5),r.int(-5,5)],rem=r.int(-6,6);
    /* P = (x − a)·Q + rem */
    if(rem===0)continue;const P=[q[0],q[1]-a*q[0],q[2]-a*q[1],-a*q[2]+rem];if(P.some(c=>Math.abs(c)>20))continue;const m=-rem;
    const lin=`${I('x')} ${a<0?'+':MINUS} ${Math.abs(a)}`;
    return mkDS(r,{stem:`Cho đa thức ${I('P')}(${I('x')}) = ${polyH(P)}. Xét tính đúng sai của các khẳng định sau khi chia ${I('P')}(${I('x')}) cho ${lin}:`,items:[
      {t:`Thương của phép chia là ${polyH(q)}.`,f:`Thương của phép chia là ${polyH([q[0],q[1]+1,q[2]])}.`,why:`Thực hiện phép chia: ${I('P')}(${I('x')}) = (${lin})(${polyH(q)})${rem?` ${rem<0?MINUS:'+'} ${Math.abs(rem)}`:''}.`},
      {t:`Dư của phép chia là ${sg(rem)}.`,f:`Dư của phép chia là ${sg(rem+2)}.`,why:`Dư bằng ${I('P')}(${sg(a)}) = ${sg(pe(P,a))}.`},
      {t:`${I('P')}(${I('x')}) ${rem===0?'chia hết':'không chia hết'} cho ${lin}.`,f:`${I('P')}(${I('x')}) ${rem===0?'không chia hết':'chia hết'} cho ${lin}.`,why:rem===0?`Dư bằng 0.`:`Dư khác 0.`},
      {t:`Đa thức ${I('P')}(${I('x')}) ${m<0?MINUS:'+'} ${Math.abs(m)||0} chia hết cho ${lin}.`.replace(' + 0',''),f:`Đa thức ${I('P')}(${I('x')}) ${m<0?'+':MINUS} ${Math.abs(m)} chia hết cho ${lin}.`,why:`Cộng thêm ${sg(m)} vào ${I('P')}(${I('x')}) thì dư bằng ${sg(rem)} ${m<0?MINUS:'+'} ${Math.abs(m)} = 0.`}
    ],chk:()=>pe(P,a)===rem&&[-2,1,4].every(x=>pe(P,x)===(x-a)*pe(q,x)+rem)&&rem!==0})}
});
/* Bài 30: xác suất bằng tỉ số */
TLN7b('t7-8-prime',8,'VD',r=>{
  const N=r.pick([10,20,25,50]),f=r.int(0,2),list=[...Array(N)].map((_,i)=>i+1);
  const isP=n=>n>1&&[...Array(n).keys()].slice(2).every(d=>n%d);
  const ev=[['là số nguyên tố',isP],['chia hết cho cả 2 và 5',n=>n%10===0],['là số chính phương',n=>Number.isInteger(Math.sqrt(n))]][f],c=list.filter(ev[1]).length,p=c/N;
  if(!Number.isInteger(p*100))return T.tln['t7-8-prime'].gen(r);
  return{kind:'tln',stem:`Một hộp có ${N} tấm thẻ giống nhau ghi các số 1; 2; …; ${N}. Rút ngẫu nhiên một tấm thẻ. Tính xác suất để số ghi trên thẻ ${ev[0]} (viết kết quả dưới dạng số thập phân).`,ans:p,unit:'',
    sol:`Có ${N} kết quả đồng khả năng. Các số ${ev[0]}: ${list.filter(ev[1]).join('; ')} (${c} số). Xác suất là ${fr(c,N)} = ${fmt(p)}.`};
});
TLN7b('t7-8-more',8,'VD',r=>{
  for(;;){const red=r.int(2,8),blue=r.int(3,12),[a,b]=r.pick([[1,2],[2,3],[3,4],[1,3],[3,5]]);
    /* thêm k bi đỏ để xác suất lấy bi đỏ bằng a/b: (red+k)/(red+k+blue)=a/b */
    const num=a*blue-(b-a)*red,den=b-a;if(num<=0||num%den)continue;const k=num/den;if(k<1||k>20)continue;
    return{kind:'tln',stem:`Một hộp có ${red} viên bi đỏ và ${blue} viên bi xanh (cùng kích thước, khối lượng). Cần thêm vào hộp ít nhất bao nhiêu viên bi đỏ để khi lấy ngẫu nhiên một viên, xác suất lấy được viên bi đỏ bằng ${fr(a,b)}?`,ans:k,unit:'',
      sol:`Thêm ${I('k')} viên bi đỏ: ${fr(`${red} + ${I('k')}`,`${red+blue} + ${I('k')}`)} = ${fr(a,b)} ⟺ ${b}(${red} + k) = ${a}(${red+blue} + k) ⟺ k = ${k}.`,chk:()=>(red+k)*b===a*(red+k+blue)}}
});
