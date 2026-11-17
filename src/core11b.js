
/* ================================================================
   LỚP 11 – Chương II: Dãy số, cấp số cộng, cấp số nhân
            Chương III: Mẫu số liệu ghép nhóm
   ================================================================ */
const U=n=>`${I('u')}${sub(n)}`;
const UN=`(${U(I('n'))})`;
const listH=a=>a.map(x=>typeof x==='number'?sg(x):x).join('; ');
/* Biểu thức u_n = p·n + q */
const linH=(p,q)=>{if(p===0)return q<0?MINUS+(-q):String(q);const a=p===1?'':p===-1?MINUS:sg(p);return `${a}${I('n')}${q===0?'':q>0?' + '+q:' '+MINUS+' '+(-q)}`};
const SEQF=[
  r=>{const a=r.nz(-5,5);return{h:`${I('n')}${sup(2)} ${a<0?MINUS:'+'} ${Math.abs(a)}`,f:n=>Q(n*n+a)}},
  r=>{const a=r.int(1,4),b=r.nz(-3,3),c=r.int(1,3),d=r.int(1,4);return{h:fr(linH(a,b),linH(c,d)),f:n=>Q(a*n+b,c*n+d)}},
  r=>{const a=r.int(1,3),b=r.int(1,3),c=r.int(1,4);return{h:fr(`${a===1?'':a}${I('n')}${sup(2)} ${MINUS} ${b}`,`${I('n')}${sup(2)} + ${c}`),f:n=>Q(a*n*n-b,n*n+c)}},
  r=>{const a=r.int(1,4);return{h:`(${MINUS}1)${sup(I('n'))}(${I('n')} + ${a})`,f:n=>Q((n%2?-1:1)*(n+a))}},
  r=>{const a=r.int(1,5);return{h:`2${sup(I('n'))} ${MINUS} ${a}`,f:n=>Q(2**n-a)}}
];
N11('k2-term',2,'NB',r=>{
  const F=r.pick(SEQF)(r),k=r.int(2,6),v=F.f(k);
  return mkF(r,{stem:`Cho dãy số ${UN} với ${U(I('n'))} = ${F.h}. Số hạng ${U(k)} của dãy số bằng`,correct:v,
    cands:[F.f(k-1),F.f(k+1),F.f(k+2),Q(-v[0],v[1])],sol:`Thay n = ${k} vào công thức: ${U(k)} = ${qh(v)}.`,chk:()=>qeq(v,F.f(k))});
});
N11('k2-recur',2,'TH',r=>{
  const a=r.nz(-4,5),t=r.int(0,2),d=r.nz(-4,4),c=r.nz(-3,3);
  const step=t===0?(x=>x+d):t===1?(x=>2*x+c):(x=>x*x+c);
  const rec=t===0?`${U(I('n')+' + 1')} = ${U(I('n'))} ${d<0?MINUS:'+'} ${Math.abs(d)}`:t===1?`${U(I('n')+' + 1')} = 2${U(I('n'))} ${c<0?MINUS:'+'} ${Math.abs(c)}`:`${U(I('n')+' + 1')} = ${U(I('n'))}${sup(2)} ${c<0?MINUS:'+'} ${Math.abs(c)}`;
  const seq=[a,step(a),step(step(a))];
  if(new Set(seq).size<3)return T.nlc['k2-recur'].gen(r);
  const w=[[seq[1],seq[2],step(seq[2])],[-a,step(-a),step(step(-a))],[a,a+2*(seq[1]-a),a+4*(seq[1]-a)],[a,seq[1],seq[1]+(seq[1]-a)+1]];
  return mkTxt(r,{stem:`Cho dãy số ${UN} xác định bởi ${cases(`${U(1)} = ${sg(a)}`,`${rec}`)} với ${I('n')} ≥ 1. Ba số hạng đầu tiên của dãy số lần lượt là`,
    correct:listH(seq)+'.',wrongs:w.map(x=>listH(x)+'.'),sol:`${U(1)} = ${sg(a)}; ${U(2)} = ${sg(seq[1])}; ${U(3)} = ${sg(seq[2])}.`});
});
N11('k2-isCSC',2,'NB',r=>{
  const mk=()=>{const a=r.int(-5,9),d=r.nz(-6,8);return Array.from({length:6},(_,i)=>a+i*d)};
  const isA=s=>s.every((x,i)=>i<2||x-s[i-1]===s[1]-s[0]);
  const ok=mk(),wr=[];
  while(wr.length<3){const s=mk(),i=r.int(1,4);s[i]+=r.nz(-3,3);if(r.chance(.5)){const j=r.int(1,5);if(j!==i)s[j]+=r.nz(-2,2)}if(!isA(s)&&!wr.some(z=>z.join()===s.join()))wr.push(s)}
  return mkTxt(r,{stem:'Trong các dãy số sau đây, dãy số nào là cấp số cộng?',correct:listH(ok)+'.',wrongs:wr.map(s=>listH(s)+'.'),
    sol:`Dãy ${listH(ok)} có hiệu hai số hạng liên tiếp luôn bằng ${sg(ok[1]-ok[0])} nên là cấp số cộng.`,chk:()=>isA(ok)&&wr.every(s=>!isA(s))});
});
N11('k2-csc-d',2,'NB',r=>{
  const p=r.nz(-9,9),q=r.nz(-9,9);
  return mkNum(r,{stem:`Cho cấp số cộng ${UN} với ${U(I('n'))} = ${linH(p,q)}. Công sai của cấp số cộng là`,correct:p,ok:c=>c!==0,f:v=>`${I('d')} = ${sg(v)}`,
    cands:[q,p+q,-p,2*p,1],sol:`d = ${U(I('n')+' + 1')} − ${U(I('n'))} = ${sg(p)}.`});
});
N11('k2-csc-un',2,'NB',r=>{
  const u1=r.nz(-6,8),d=r.nz(-5,6);
  const cor=`${U(I('n'))} = ${linH(d,u1-d)}`;
  const wr=[`${U(I('n'))} = ${linH(d,u1)}`,`${U(I('n'))} = ${linH(u1,d)}`,`${U(I('n'))} = ${linH(d,d-u1)}`,`${U(I('n'))} = ${linH(-d,u1+d)}`,`${U(I('n'))} = ${linH(u1,-d)}`];
  return mkTxt(r,{stem:`Cho cấp số cộng ${UN} có ${U(1)} = ${sg(u1)} và công sai ${I('d')} = ${sg(d)}. Số hạng tổng quát ${U(I('n'))} là`,correct:cor,wrongs:wr,
    sol:`${U(I('n'))} = ${U(1)} + (n − 1)d = ${sg(u1)} + (n − 1)·(${sg(d)}) = ${linH(d,u1-d)}.`});
});
N11('k2-csc-list',2,'TH',r=>{
  const u1=r.int(-3,12),d=r.nz(-5,8),s=Array.from({length:5},(_,i)=>u1+i*d);
  const cor=`${U(I('n'))} = ${linH(d,u1-d)}`;
  const wr=[`${U(I('n'))} = ${linH(d,u1)}`,`${U(I('n'))} = ${linH(d,u1-d+1)}`,`${U(I('n'))} = ${linH(d,u1-d-1)}`,`${U(I('n'))} = ${linH(d,0)}`,`${U(I('n'))} = ${linH(u1,d)}`,`${U(I('n'))} = ${linH(d,u1-d+2)}`,`${U(I('n'))} = ${linH(-d,u1+d)}`];
  return mkTxt(r,{stem:`Cho dãy số có các số hạng đầu là ${listH(s)}; … Số hạng tổng quát của dãy số này là`,correct:cor,wrongs:wr,
    sol:`Đây là cấp số cộng có ${U(1)} = ${sg(u1)}, d = ${sg(d)}, nên ${U(I('n'))} = ${sg(u1)} + (n − 1)·(${sg(d)}) = ${linH(d,u1-d)}.`});
});
N11('k2-csc-sum',2,'TH',r=>{
  const u1=r.nz(-5,9),d=r.nz(-4,5),n=r.int(8,25),S=n*(2*u1+(n-1)*d)/2;
  return mkNum(r,{stem:`Cho cấp số cộng ${UN} có ${U(1)} = ${sg(u1)} và công sai ${I('d')} = ${sg(d)}. Tổng ${n} số hạng đầu tiên của cấp số cộng bằng`,correct:S,ok:()=>true,
    cands:[n*(2*u1+n*d)/2,n*(u1+(n-1)*d),(n-1)*(2*u1+(n-2)*d)/2,n*(2*u1+(n-1)*d)],
    sol:`${I('S')}${sub(n)} = ${fr(`${n}[2${U(1)} + ${n-1}d]`,2)} = ${fr(`${n}·[${2*u1} + ${n-1}·(${sg(d)})]`,2)} = ${sg(S)}.`,chk:()=>{let s=0;for(let i=0;i<n;i++)s+=u1+i*d;return s===S}});
});
N11('k2-csc-ab',2,'TH',r=>{
  const u1=r.nz(-8,10),d=r.nz(-5,6),a=r.int(2,4),b=r.int(a+2,9),A=u1+(a-1)*d,B=u1+(b-1)*d,ask=r.pick(['d','u1']);
  return mkNum(r,{stem:`Cho cấp số cộng ${UN} có ${U(a)} = ${sg(A)} và ${U(b)} = ${sg(B)}. ${ask==='d'?'Công sai':'Số hạng đầu '+U(1)} của cấp số cộng bằng`,correct:ask==='d'?d:u1,ok:()=>true,
    cands:ask==='d'?[-d,d+1,(B-A),u1]:[u1+d,u1-d,A-d,-u1],
    sol:`${U(b)} − ${U(a)} = ${b-a}d ⟹ d = ${fr(sg(B-A),b-a)} = ${sg(d)}; ${U(1)} = ${U(a)} − ${a-1}d = ${sg(u1)}.`,chk:()=>A===u1+(a-1)*d&&B===u1+(b-1)*d});
});
const MONO=[
  [`${I('u')}${sub(I('n'))} = 2${I('n')} + 3`,n=>2*n+3],[`${I('u')}${sub(I('n'))} = ${fr(I('n'),I('n')+' + 1')}`,n=>n/(n+1)],[`${I('u')}${sub(I('n'))} = ${I('n')}${sup(2)} + 1`,n=>n*n+1],[`${I('u')}${sub(I('n'))} = 3${sup(I('n'))}`,n=>3**n],
  [`${I('u')}${sub(I('n'))} = ${fr(1,I('n'))}`,n=>1/n],[`${I('u')}${sub(I('n'))} = 5 ${MINUS} 2${I('n')}`,n=>5-2*n],[`${I('u')}${sub(I('n'))} = (${MINUS}1)${sup(I('n'))}`,n=>(n%2?-1:1)],[`${I('u')}${sub(I('n'))} = ${fr(1,2+sup(I('n')))}`,n=>1/2**n],
  [`${I('u')}${sub(I('n'))} = (${MINUS}2)${sup(I('n'))}`,n=>(-2)**n],[`${I('u')}${sub(I('n'))} = ${I('n')}${sup(2)} ${MINUS} 4${I('n')}`,n=>n*n-4*n],[`${I('u')}${sub(I('n'))} = sin ${I('n')}`,n=>Math.sin(n)]
];
const incr=f=>{for(let n=1;n<30;n++)if(!(f(n+1)>f(n)))return false;return true};
const decr=f=>{for(let n=1;n<30;n++)if(!(f(n+1)<f(n)))return false;return true};
N11('k2-mono',2,'TH',r=>{
  const want=r.pick(['tăng','giảm']),test=want==='tăng'?incr:decr,T=MONO.filter(m=>test(m[1])),F=MONO.filter(m=>!test(m[1]));
  const ok=r.pick(T),wr=r.shuffle(F).slice(0,3);
  return mkTxt(r,{stem:`Trong các dãy số ${UN} sau, dãy số nào là dãy số ${want}?`,correct:ok[0],wrongs:wr.map(m=>m[0]),
    sol:`Với dãy ${ok[0]}: ${U(I('n')+' + 1')} ${want==='tăng'?'>':'<'} ${U(I('n'))} với mọi n ≥ 1 nên là dãy số ${want}. Các dãy còn lại không thỏa mãn.`,chk:()=>test(ok[1])&&wr.every(m=>!test(m[1]))});
});
/* Cấp số nhân – chỉ dùng cho đề cuối kì */
N11('k2-csn-q',2,'NB',r=>{
  const u1=r.nz(-4,5),q=r.pick([2,3,-2,-3,4]),s=Array.from({length:5},(_,i)=>u1*q**i);
  return mkNum(r,{stem:`Cho cấp số nhân ${listH(s)}; … Công bội ${I('q')} của cấp số nhân là`,correct:q,ok:c=>c!==0,f:v=>sg(v),cands:[-q,q+1,q*u1,s[1]-s[0]],
    sol:`q = ${U(2)} : ${U(1)} = ${sg(s[1])} : ${sg(s[0])} = ${sg(q)}.`});
},'csn');
N11('k2-csn-term',2,'TH',r=>{
  const u1=r.nz(-3,4),q=r.pick([2,3,-2]),k=r.int(4,7),v=u1*q**(k-1);
  return mkNum(r,{stem:`Cho cấp số nhân ${UN} có ${U(1)} = ${sg(u1)} và công bội ${I('q')} = ${sg(q)}. Số hạng ${U(k)} bằng`,correct:v,ok:()=>true,cands:[u1*q**k,u1*q**(k-2),-v,u1*q*(k-1)],
    sol:`${U(k)} = ${U(1)}·q${sup(k-1)} = ${sg(u1)}·(${sg(q)})${sup(k-1)} = ${sg(v)}.`});
},'csn');
N11('k2-csn-sum',2,'TH',r=>{
  const u1=r.int(1,4),q=r.pick([2,3]),n=r.int(4,7),S=u1*(q**n-1)/(q-1);
  return mkNum(r,{stem:`Cho cấp số nhân ${UN} có ${U(1)} = ${u1} và công bội ${I('q')} = ${q}. Tổng ${n} số hạng đầu tiên của cấp số nhân bằng`,correct:S,cands:[u1*(q**(n+1)-1)/(q-1),u1*(q**(n-1)-1)/(q-1),u1*q**(n-1),u1*(q**n-1)],
    sol:`${I('S')}${sub(n)} = ${U(1)}·${fr('q'+sup(n)+' − 1','q − 1')} = ${u1}·${fr(q+sup(n)+' − 1',q-1)} = ${S}.`});
},'csn');

/* ----- Trả lời ngắn chương II ----- */
TLN11('t2-d',2,'TH',r=>{
  const u1=r.nz(-6,9),d=r.nz(-9,9),i=r.int(2,4),j=r.int(i+1,8),S=2*u1+(i+j-2)*d;
  return{kind:'tln',stem:`Tìm công sai của cấp số cộng ${UN} biết ${U(1)} = ${sg(u1)} và ${U(i)} + ${U(j)} = ${sg(S)}.`,ans:d,unit:'',
    sol:`${U(i)} + ${U(j)} = 2${U(1)} + ${i+j-2}d ⟹ ${sg(S)} = ${2*u1} + ${i+j-2}d ⟹ d = ${sg(d)}.`,chk:()=>S===(u1+(i-1)*d)+(u1+(j-1)*d)};
});
TLN11('t2-which',2,'TH',r=>{
  for(;;){
    const p=r.int(-2,2),q=r.int(1,5),n0=r.int(3,9),v=Q(n0+p,n0*n0+q);
    if(v[0]<=0)continue;
    let dup=false;for(let n=1;n<=300;n++)if(n!==n0&&qeq(Q(n+p,n*n+q),v))dup=true;
    if(dup)continue;
    return{kind:'tln',stem:`Cho dãy số ${UN} với ${U(I('n'))} = ${fr(linH(1,p),`${I('n')}${sup(2)} + ${q}`)}. Số ${fr(v[0],v[1])} là số hạng thứ mấy của dãy số?`,ans:n0,unit:'',
      sol:`Giải ${fr(linH(1,p),`n² + ${q}`)} = ${fr(v[0],v[1])} với n nguyên dương, được n = ${n0}.`,chk:()=>qeq(Q(n0+p,n0*n0+q),v)};
  }
});
TLN11('t2-term40',2,'TH',r=>{
  const a=r.int(2,7),b=r.int(2,4),c=r.int(1,3),n=r.pick([20,30,40,50]),v=(a-b*n)/(n+c),ans=r1(v);
  return{kind:'tln',stem:`Cho dãy số ${UN} biết ${U(I('n'))} = ${fr(`${a} ${MINUS} ${b}${I('n')}`,linH(1,c))}. Tính số hạng thứ ${n} của dãy số (làm tròn kết quả đến hàng phần mười).`,ans,unit:'',
    sol:`${U(n)} = ${fr(`${a} − ${b}·${n}`,`${n} + ${c}`)} = ${fr(a-b*n,n+c)} ≈ ${fmt(ans)}.`,chk:()=>Math.abs(ans-v)<=0.05+1e-9};
});
TLN11('t2-trees',2,'VD',r=>{
  const n=r.int(18,60),a=r.pick([1,1,2,3]),d=r.pick([1,1,2]),N=n*(2*a+(n-1)*d)/2;
  return{kind:'tln',stem:`Người ta trồng ${N} cây trong một khu vườn hình tam giác theo cách sau: hàng thứ nhất có ${a} cây, mỗi hàng sau có nhiều hơn hàng ngay trước đó ${d} cây. Hỏi khu vườn có tất cả bao nhiêu hàng cây?`,ans:n,unit:'',
    sol:`Số cây các hàng lập thành cấp số cộng có ${U(1)} = ${a}, d = ${d}. Từ ${I('S')}${sub(I('n'))} = ${fr(`n[${2*a} + (n − 1)·${d}]`,2)} = ${N}, giải phương trình bậc hai được n = ${n} (loại nghiệm âm).`,
    chk:()=>{let s=0,k=0;while(s<N){s+=a+k*d;k++}return s===N&&k===n}};
});
TLN11('t2-drill',2,'VD',r=>{
  const a=r.pick([80,100,120,150]),d=r.pick([10,20,25,30]),n=r.int(12,30),S=n*(2*a+(n-1)*d)/2;
  return{kind:'tln',stem:`Một cơ sở khoan giếng đưa ra định mức giá như sau: giá của mét khoan đầu tiên là ${a} nghìn đồng và kể từ mét khoan thứ hai, giá của mỗi mét sau tăng thêm ${d} nghìn đồng so với giá của mét khoan ngay trước đó. Một người cần khoan một giếng sâu ${n} m. Hỏi người đó phải trả bao nhiêu nghìn đồng?`,ans:S,unit:'',
    sol:`Giá các mét khoan lập thành cấp số cộng ${U(1)} = ${a}, d = ${d}. Số tiền: ${I('S')}${sub(n)} = ${fr(`${n}(2·${a} + ${n-1}·${d})`,2)} = ${S} (nghìn đồng).`,chk:()=>{let s=0;for(let i=0;i<n;i++)s+=a+i*d;return s===S}};
});
TLN11('t2-cells',2,'VD',r=>{
  const a=r.pick([1,2,3,5]),q=r.pick([2,3]),n=r.int(5,8),S=a*(q**n-1)/(q-1);
  return{kind:'tln',stem:`Một người gửi tiết kiệm theo kế hoạch: tháng thứ nhất gửi ${a} triệu đồng, mỗi tháng sau gửi gấp ${q} lần tháng trước. Hỏi sau ${n} tháng, tổng số tiền người đó đã gửi là bao nhiêu triệu đồng?`,ans:S,unit:'',
    sol:`Số tiền gửi mỗi tháng lập thành cấp số nhân ${U(1)} = ${a}, q = ${q}. Tổng: ${I('S')}${sub(n)} = ${a}·${fr(q+sup(n)+' − 1',q-1)} = ${S} (triệu đồng).`};
},'csn');

/* ----- Tự luận chương II ----- */
TL11('tl2-sys',2,'VD','b',r=>{
  const u1=r.nz(-6,12),d=r.nz(-7,7),A=u1+2*d,B=2*u1+5*d,k=r.int(150,2500),X=u1+(k-1)*d;
  return{kind:'tl',title:'Cấp số cộng',parts:[
    {pts:.5,html:`Cho cấp số cộng ${UN} thỏa mãn ${cases(`${U(1)} ${MINUS} ${U(3)} + ${U(5)} = ${sg(A)}`,`${U(1)} + ${U(6)} = ${sg(B)}`)}.<br>Xác định số hạng đầu và công sai của cấp số cộng.`},
    {pts:.5,html:`Số ${sg(X)} là số hạng thứ mấy của cấp số cộng?`}],
    sol:[ptxt([[`Biến đổi: ${U(1)} − ${U(3)} + ${U(5)} = ${U(1)} + 2d; ${U(1)} + ${U(6)} = 2${U(1)} + 5d. Ta có hệ ${cases(`${U(1)} + 2d = ${sg(A)}`,`2${U(1)} + 5d = ${sg(B)}`)}`,.25],[`Giải hệ được ${U(1)} = ${sg(u1)}, d = ${sg(d)}.`,.25]]),
      ptxt([[`${U(I('n'))} = ${sg(u1)} + (n − 1)·(${sg(d)}) = ${linH(d,u1-d)}.`,.25],[`${linH(d,u1-d)} = ${sg(X)} ⟺ n = ${k}. Vậy ${sg(X)} là số hạng thứ ${k}.`,.25]])],
    chk:()=>A===u1-(u1+2*d)+(u1+4*d)&&B===u1+(u1+5*d)&&u1+(k-1)*d===X};
});
TL11('tl2-sum',2,'TH','b',r=>{
  const u1=r.nz(-6,9),d=r.nz(-9,9),i=r.int(2,3),j=r.int(i+2,7),S=2*u1+(i+j-2)*d,n=r.pick([15,20,25,30]),Sn=n*(2*u1+(n-1)*d)/2;
  return{kind:'tl',title:'Cấp số cộng',parts:[
    {pts:.5,html:`Cho cấp số cộng ${UN} biết ${U(1)} = ${sg(u1)} và ${U(i)} + ${U(j)} = ${sg(S)}.<br>Tìm công sai và số hạng tổng quát của cấp số cộng.`},
    {pts:.5,html:`Tính tổng ${n} số hạng đầu tiên của cấp số cộng.`}],
    sol:[ptxt([[`${U(i)} + ${U(j)} = 2${U(1)} + ${i+j-2}d ⟹ ${sg(S)} = ${2*u1} + ${i+j-2}d ⟹ d = ${sg(d)}.`,.25],[`${U(I('n'))} = ${U(1)} + (n − 1)d = ${linH(d,u1-d)}.`,.25]]),
      ptxt([[`${I('S')}${sub(n)} = ${fr(`${n}[2${U(1)} + ${n-1}d]`,2)}`,.25],[`= ${fr(`${n}[${2*u1} + ${n-1}·(${sg(d)})]`,2)} = ${sg(Sn)}.`,.25]])],
    chk:()=>{let s=0;for(let t=0;t<n;t++)s+=u1+t*d;return s===Sn&&S===(u1+(i-1)*d)+(u1+(j-1)*d)}};
});
TL11('tl2-csn',2,'VD','b',r=>{
  const u1=r.nz(-3,4),q=r.pick([2,3,-2]),A=u1*q,B=u1*q**4,n=r.int(5,7),Sn=u1*(q**n-1)/(q-1);
  return{kind:'tl',title:'Cấp số nhân',parts:[
    {pts:.5,html:`Cho cấp số nhân ${UN} có ${U(2)} = ${sg(A)} và ${U(5)} = ${sg(B)}.<br>Tìm công bội và số hạng đầu của cấp số nhân.`},
    {pts:.5,html:`Tính tổng ${n} số hạng đầu tiên của cấp số nhân.`}],
    sol:[ptxt([[`${U(5)} : ${U(2)} = q${sup(3)} = ${sg(B/A)} ⟹ q = ${sg(q)}.`,.25],[`${U(1)} = ${U(2)} : q = ${sg(u1)}.`,.25]]),
      ptxt([[`${I('S')}${sub(n)} = ${U(1)}·${fr('q'+sup(n)+' − 1','q − 1')}`,.25],[`= ${sg(u1)}·${fr(`(${sg(q)})${sup(n)} − 1`,sg(q-1))} = ${sg(Sn)}.`,.25]])],
    chk:()=>{let s=0;for(let t=0;t<n;t++)s+=u1*q**t;return s===Sn}};
},'csn');

/* ---------- Chương III: Mẫu số liệu ghép nhóm ---------- */
const GRP_TOPIC=[
  {col:'Thời gian (phút)',what:'Thời gian (phút) tự học ở nhà mỗi ngày của',who:'học sinh lớp 11A',h:[10,15,20],a:[0,10,20]},
  {col:'Chiều cao (cm)',what:'Chiều cao (cm) của',who:'học sinh khối 11',h:[5,4],a:[150,145,155]},
  {col:'Cân nặng (kg)',what:'Cân nặng (kg) của',who:'học sinh lớp 11B',h:[5,4,3],a:[40,42,45]},
  {col:'Quãng đường (km)',what:'Quãng đường (km) đi xe đạp mỗi tuần của',who:'thành viên câu lạc bộ',h:[5,10],a:[10,20,30]}
];
function grpData(r){
  for(;;){
    const T=r.pick(GRP_TOPIC),h=r.pick(T.h),a=r.pick(T.a),k=5,f=Array.from({length:k},()=>r.int(2,16));
    const mx=Math.max(...f);if(f.filter(x=>x===mx).length>1)continue;
    const n=f.reduce((s,x)=>s+x,0);if(n%4)continue;
    const lo=i=>a+i*h,hi=i=>a+(i+1)*h;
    return{T,h,a,k,f,n,lo,hi,label:i=>`[${lo(i)}; ${hi(i)})`,
      table:()=>tableHTML([T.col,...f.map((_,i)=>`[${lo(i)}; ${hi(i)})`)],[['Số '+(T.who.startsWith('học')?'học sinh':'người'),...f]])};
  }
}
const cumIdx=(D,pos)=>{let c=0;for(let i=0;i<D.k;i++){if(c+D.f[i]>=pos)return{i,before:c};c+=D.f[i]}};
const quantile=(D,pos)=>{const {i,before}=cumIdx(D,pos);return D.lo(i)+(pos-before)/D.f[i]*D.h};
const modeOf=D=>{const p=D.f.indexOf(Math.max(...D.f)),f0=p?D.f[p-1]:0,f2=p<D.k-1?D.f[p+1]:0;return{p,v:D.lo(p)+(D.f[p]-f0)/((D.f[p]-f0)+(D.f[p]-f2))*D.h}};
const meanOf=D=>D.f.reduce((s,x,i)=>s+x*(D.lo(i)+D.h/2),0)/D.n;
const grpStem=D=>`Kết quả khảo sát ${D.T.what.replace(/^./,c=>c.toLowerCase())} một số ${D.T.who} được cho trong bảng sau:${D.table()}`;
N11('k3-n',3,'NB',r=>{
  const D=grpData(r);
  return mkNum(r,{stem:`${grpStem(D)}Cỡ mẫu của mẫu số liệu trên là`,correct:D.n,cands:[D.n-D.f[0],D.k,D.n+D.f[4],D.n-1],sol:`Cỡ mẫu n = ${D.f.join(' + ')} = ${D.n}.`});
});
N11('k3-mid',3,'NB',r=>{
  const D=grpData(r),i=r.int(0,4),v=D.lo(i)+D.h/2;
  return mkNum(r,{stem:`${grpStem(D)}Giá trị đại diện của nhóm ${D.label(i)} là`,correct:v,ok:()=>true,cands:[D.lo(i),D.hi(i),D.h,v+D.h],sol:`Giá trị đại diện = ${fr(`${D.lo(i)} + ${D.hi(i)}`,2)} = ${fmt(v)}.`});
});
N11('k3-modal',3,'NB',r=>{
  const D=grpData(r),p=D.f.indexOf(Math.max(...D.f));
  return mkTxt(r,{stem:`${grpStem(D)}Nhóm chứa mốt của mẫu số liệu trên là`,correct:D.label(p),wrongs:r.shuffle([0,1,2,3,4].filter(i=>i!==p)).map(D.label),
    sol:`Nhóm có tần số lớn nhất (${D.f[p]}) là ${D.label(p)}, đó là nhóm chứa mốt.`});
});
N11('k3-medgrp',3,'TH',r=>{
  const D=grpData(r),pos=r.pick([['trung vị',D.n/2],['tứ phân vị thứ nhất',D.n/4],['tứ phân vị thứ ba',3*D.n/4]]),{i}=cumIdx(D,pos[1]);
  return mkTxt(r,{stem:`${grpStem(D)}Nhóm chứa ${pos[0]} của mẫu số liệu trên là`,correct:D.label(i),wrongs:r.shuffle([0,1,2,3,4].filter(x=>x!==i)).map(D.label),
    sol:`Cỡ mẫu n = ${D.n}; ${pos[0]} ứng với vị trí thứ ${fmt(pos[1])} trong dãy đã sắp xếp. Tần số tích lũy: ${D.f.map((_,j)=>D.f.slice(0,j+1).reduce((s,x)=>s+x,0)).join('; ')} ⟹ nhóm ${D.label(i)}.`});
});
N11('k3-mean',3,'TH',r=>{
  const D=grpData(r),m=r2(meanOf(D));
  return mkNum(r,{stem:`${grpStem(D)}Số trung bình của mẫu số liệu trên (làm tròn đến hàng phần trăm) là`,correct:m,ok:()=>true,cands:[r2(m+D.h/2),r2(m-D.h/2),r2(m+1.37),r2(m-2.11)],
    sol:`x̄ = ${fr(D.f.map((x,i)=>`${x}·${fmt(D.lo(i)+D.h/2)}`).join(' + '),D.n)} ≈ ${fmt(m)}.`,chk:()=>Math.abs(m-meanOf(D))<0.0051});
});
TLN11('t3-mode',3,'VD',r=>{
  const D=grpData(r),M=modeOf(D),ans=r2(M.v);
  return{kind:'tln',stem:`${grpStem(D)}Tìm mốt của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',
    sol:`Nhóm chứa mốt: ${D.label(M.p)}. ${I('M')}${sub('o')} = ${D.lo(M.p)} + ${fr(`${D.f[M.p]} − ${M.p?D.f[M.p-1]:0}`,`(${D.f[M.p]} − ${M.p?D.f[M.p-1]:0}) + (${D.f[M.p]} − ${M.p<4?D.f[M.p+1]:0})`)}·${D.h} ≈ ${fmt(ans)}.`,chk:()=>Math.abs(ans-M.v)<0.0051};
});
TLN11('t3-med',3,'VD',r=>{
  const D=grpData(r),w=r.pick([['trung vị','M<sub>e</sub>',D.n/2],['tứ phân vị thứ nhất','Q<sub>1</sub>',D.n/4],['tứ phân vị thứ ba','Q<sub>3</sub>',3*D.n/4]]),v=quantile(D,w[2]),ans=r2(v),{i,before}=cumIdx(D,w[2]);
  return{kind:'tln',stem:`${grpStem(D)}Tìm ${w[0]} của mẫu số liệu ghép nhóm trên (làm tròn kết quả đến hàng phần trăm).`,ans,unit:'',
    sol:`n = ${D.n}; nhóm chứa ${w[0]} là ${D.label(i)}. ${w[1]} = ${D.lo(i)} + ${fr(`${fmt(w[2])} − ${before}`,D.f[i])}·${D.h} ≈ ${fmt(ans)}.`,chk:()=>Math.abs(ans-v)<0.0051};
});
