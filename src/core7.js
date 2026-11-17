
/* ================================================================
   LỚP 7 – Toán 7 Kết nối tri thức, học kì I
   I Số hữu tỉ · II Số thực · III Góc và đường thẳng song song
   IV Tam giác bằng nhau · V Thu thập và biểu diễn dữ liệu
   ================================================================ */
const N7=(id,ch,lv,gen)=>reg('nlc',id,ch,lv,gen,{g:7});
const DS7=(id,ch,lv,gen)=>reg('ds',id,ch,lv,gen,{g:7});
const TLN7=(id,ch,lv,gen)=>reg('tln',id,ch,lv,gen,{g:7});
const TL7=(id,ch,lv,role,gen)=>reg('tl',id,ch,lv,gen,{role,g:7});
const qp=q=>q[0]<0?`(${qh(q)})`:qh(q);              /* số hữu tỉ, thêm ngoặc nếu âm */
const pr7=q=>`(${qh(q)})`;
const rq=(r,dens=[2,3,4,5,6,7,8,9])=>{for(;;){const q=Q(r.nz(-9,9),r.pick(dens));if(q[1]>1)return q}};
const finiteDec=q=>{let d=q[1];while(d%2===0)d/=2;while(d%5===0)d/=5;return d===1};
const dec=(v,k)=>(v<0?MINUS:'')+Math.abs(v).toFixed(k).replace('.',',');
const ANG=s=>`∠<i>${s}</i>`;                                  /* hiển thị thành mũ góc */
const ANGN=(P,i)=>`∠${P}<sub>${i}</sub>`;
const TRI_NAMES=['ABC','MNP','DEF','HIK','ABC','ABC'];

/* ---------- Chương I: Số hữu tỉ ---------- */
N7('m7-1-set',1,'NB',r=>{
  const k=r.int(2,9),b=r.pick([3,4,5,7]),a=r.pick([1,2,3,4,5,6].filter(x=>x%b)),f=fr(a,b),m=MINUS+fr(a,b);
  const T=[`${sg(-k)} ∈ ℚ`,`${f} ∈ ℚ`,`0 ∈ ℚ`,`${k} ∈ ℕ`,`${sg(-k)} ∈ ℤ`,`${m} ∉ ℤ`,`${m} ∈ ℚ`];
  const F=[`${sg(-k)} ∈ ℕ`,`${f} ∈ ℤ`,`${f} ∉ ℚ`,`${sg(-k)} ∉ ℚ`,`0 ∉ ℚ`,`${m} ∈ ℕ`,`${k} ∉ ℚ`];
  const want=r.chance(.65),ok=r.pick(want?T:F),wr=r.shuffle(want?F:T).slice(0,3);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok,wrongs:wr,
    sol:`Nhắc lại: ℕ ⊂ ℤ ⊂ ℚ; phân số ${fr(a,b)} không phải số nguyên nhưng là số hữu tỉ. Do đó khẳng định ${want?'đúng':'sai'} là: ${ok}.`});
});
N7('m7-1-opp',1,'NB',r=>{
  const q=rq(r);
  return mkF(r,{stem:`Số đối của số hữu tỉ ${qh(q)} là`,correct:Q(-q[0],q[1]),cands:[q,Q(q[1],q[0]),Q(-q[1],q[0])],
    sol:`Số đối của ${qh(q)} là ${qh(Q(-q[0],q[1]))} (vì tổng của chúng bằng 0).`});
});
N7('m7-1-cmp',1,'TH',r=>{
  for(;;){
    const qs=[rq(r),rq(r),rq(r),rq(r)];if(new Set(qs.map(qv)).size<4)continue;
    const big=r.chance(.5),best=qs.reduce((a,b)=>big?(qv(b)>qv(a)?b:a):(qv(b)<qv(a)?b:a));
    return mkTxt(r,{stem:`Số ${big?'lớn nhất':'nhỏ nhất'} trong các số ${qs.map(qh).join('; ')} là`,correct:qh(best),wrongs:qs.filter(q=>q!==best).map(qh),
      sol:`Quy đồng hoặc đổi ra số thập phân: ${qs.map(q=>qh(q)+' ≈ '+dec(qv(q),2)).join('; ')}. Số ${big?'lớn nhất':'nhỏ nhất'} là ${qh(best)}.`,
      chk:()=>qs.every(q=>big?qv(q)<=qv(best):qv(q)>=qv(best))});
  }
});
N7('m7-1-add',1,'NB',r=>{
  const a=rq(r),b=rq(r),op=r.pick(['+','−']),v=op==='+'?qadd(a,b):qsub(a,b);
  return mkF(r,{stem:`Kết quả của phép tính ${qh(a)} ${op} ${qp(b)} là`,correct:v,
    cands:[op==='+'?qsub(a,b):qadd(a,b),Q(a[0]+(op==='+'?b[0]:-b[0]),a[1]+b[1]),Q(-v[0],v[1]),qmul(a,b)],
    sol:`Quy đồng mẫu số: ${qh(a)} ${op} ${qp(b)} = ${qh(v)}.`});
});
N7('m7-1-muldiv',1,'TH',r=>{
  const a=rq(r),b=rq(r),c=rq(r),v=qdiv(qmul(a,b),c);
  return mkF(r,{stem:`Giá trị của biểu thức ${qh(a)} · ${qp(b)} : ${qp(c)} là`,correct:v,
    cands:[qmul(qmul(a,b),c),qdiv(a,qmul(b,c)),Q(-v[0],v[1]),qdiv(qmul(a,c),b)],
    sol:`${qh(a)} · ${qp(b)} = ${qh(qmul(a,b))}; ${qh(qmul(a,b))} : ${qp(c)} = ${qh(qmul(a,b))} · ${qp(Q(c[1],c[0]))} = ${qh(v)}.`});
});
N7('m7-1-pow',1,'NB',r=>{
  const q=rq(r,[2,3,4,5]),base=`(${qh(q)})`,m=r.int(2,7),n=r.int(2,5),t=r.int(0,2);
  const P=e=>`${base}${sup(e)}`;
  const [stem,cor,wr,rule]=t===0?[`${P(m)} · ${P(n)}`,m+n,[m*n,Math.abs(m-n)||m+n+1,m+n+1],'xᵐ · xⁿ = xᵐ⁺ⁿ']
    :t===1?[`(${P(m)})${sup(n)}`,m*n,[m+n,m*n+1,Math.abs(m-n)||m*n-1],'(xᵐ)ⁿ = xᵐ·ⁿ']
    :[`${P(m+n)} : ${P(n)}`,m,[m+2*n,(m+n)*n,n===m?m+1:n],'xᵐ : xⁿ = xᵐ⁻ⁿ'];
  return mkTxt(r,{stem:`Kết quả của phép tính ${stem} viết dưới dạng lũy thừa là`,correct:P(cor),wrongs:[...new Set(wr.filter(w=>w!==cor&&w>0))].map(P).concat([P(cor+2),P(cor+3)]),
    sol:`Áp dụng ${rule}: kết quả là ${P(cor)}.`});
});
N7('m7-1-powval',1,'TH',r=>{
  const a=r.nz(-3,3),b=r.pick([2,3,4,5].filter(x=>x!==Math.abs(a))),n=r.int(2,3),q=Q(a,b),v=Q(a**n,b**n);
  return mkF(r,{stem:`Giá trị của ${qp(q)}${sup(n)} là`,correct:v,cands:[Q(-v[0],v[1]),Q(a*n,b*n),Q(a**n,b),Q(a*n,b)],
    sol:`${qp(q)}${sup(n)} = ${fr(sg(a)+sup(n),b+sup(n))} = ${qh(v)}.`});
});
N7('m7-1-solve',1,'TH',r=>{
  const x=rq(r),a=rq(r),t=r.int(0,2);
  const [eq,v,s]=t===0?[`${I('x')} + ${qp(a)} = ${qh(qadd(x,a))}`,qadd(x,a),`x = ${qh(qadd(x,a))} − ${qp(a)} = ${qh(x)}`]
    :t===1?[`${qh(a)} − ${I('x')} = ${qh(qsub(a,x))}`,null,`x = ${qh(a)} − ${qp(qsub(a,x))} = ${qh(x)}`]
    :[`${qh(a)} · ${I('x')} = ${qh(qmul(a,x))}`,null,`x = ${qh(qmul(a,x))} : ${qp(a)} = ${qh(x)}`];
  return mkF(r,{stem:`Giá trị của ${I('x')} thỏa mãn ${eq} là`,correct:x,cands:[Q(-x[0],x[1]),qadd(x,a),qsub(x,a),qmul(x,a)],sol:`Ta có ${s}.`});
});

/* ---------- Chương II: Số thực ---------- */
N7('m7-2-irr',2,'NB',r=>{
  const irr=[rt(2),rt(3),rt(5),rt(7),'π',rt(11),MINUS+rt(6)],rat=[rt(r.pick([4,9,16,25,36,49])),'0,(3)',MINUS+'1,25',fr(2,7),rt(fr(9,4)),'0,1(6)',MINUS+rt(81)];
  const want=r.chance(.6),ok=r.pick(want?irr:rat),wr=r.shuffle(want?rat:irr).slice(0,3);
  return mkTxt(r,{stem:`Số nào sau đây là số ${want?'vô tỉ':'hữu tỉ'}?`,correct:ok,wrongs:wr,
    sol:`Số vô tỉ là số viết được dưới dạng số thập phân vô hạn không tuần hoàn (như ${rt(2)}, ${rt(3)}, π…). Căn bậc hai của số chính phương, số thập phân hữu hạn hoặc vô hạn tuần hoàn đều là số hữu tỉ. Vậy chọn ${ok}.`});
});
N7('m7-2-sqrt',2,'NB',r=>{
  const t=r.int(0,1);
  if(t===0){const n=r.int(2,15);return mkNum(r,{stem:`Giá trị của ${rt(n*n)} là`,correct:n,cands:[-n,n*n,2*n,n+1],f:sg,ok:()=>true,sol:`${n}² = ${n*n} và ${n} ≥ 0 nên ${rt(n*n)} = ${n}.`})}
  const a=r.int(1,9),b=r.pick([2,3,4,5,6,7,9].filter(x=>gcd(x,a)===1));
  return mkF(r,{stem:`Giá trị của ${rt(fr(a*a,b*b))} là`,correct:Q(a,b),cands:[Q(a*a,b),Q(-a,b),Q(a,b*b),Q(a*a,b*b)],sol:`${rt(fr(a*a,b*b))} = ${fr(a,b)} vì (${fr(a,b)})² = ${fr(a*a,b*b)}.`});
});
N7('m7-2-abs',2,'NB',r=>{
  const q=rq(r),neg=q[0]<0?q:Q(-q[0],q[1]),ins=r.chance(.5)?neg:Q(-neg[0],neg[1]);
  const v=Q(Math.abs(ins[0]),ins[1]),out=r.chance(.4);
  const cor=out?Q(-v[0],v[1]):v;
  return mkF(r,{stem:`Giá trị của ${out?MINUS:''}|${qh(ins)}| là`,correct:cor,cands:[Q(-cor[0],cor[1]),Q(cor[1],cor[0]),Q(cor[0]*2,cor[1])],
    sol:`|${qh(ins)}| = ${qh(v)}${out?`, nên −|${qh(ins)}| = ${qh(cor)}`:''}.`});
});
const PLACES=[['hàng phần mười',1],['hàng phần trăm',2],['hàng phần nghìn',3],['hàng đơn vị',0],['hàng chục',-1],['hàng trăm',-2]];
const roundTo=(v,k)=>{const p=10**k;return Math.round(v*p+1e-9*Math.sign(v))/p};
const decK=(v,k)=>k>0?dec(v,k):sg(Math.round(v));
N7('m7-2-round',2,'TH',r=>{
  const [pn,k]=r.pick(PLACES),v=k>0?r.int(1000,99999)/10**(k+2):r.int(1000,99999)+r.int(0,99)/100,res=roundTo(v,k);
  const vs=v.toFixed(k>0?k+2:2).replace('.',','),tr=Math.trunc(v*10**k)/10**k;
  const cands=[tr,roundTo(v,k+1),roundTo(v,Math.max(k-1,-2)),res+10**(-k)].filter(c=>Math.abs(c-res)>1e-9);
  const wr=[...new Set(cands.map(c=>decK(c,Math.max(k,0)===0&&k<=0?0:k)))].filter(s=>s!==decK(res,k));
  if(wr.length<3)wr.push(decK(res+2*10**(-k),k),decK(res-10**(-k),k));
  return mkTxt(r,{stem:`Làm tròn số ${vs} đến ${pn} ta được số`,correct:decK(res,k),wrongs:wr,
    sol:`Xét chữ số ngay sau ${pn}: nếu chữ số đó ≥ 5 thì cộng thêm 1 vào ${pn}, nếu < 5 thì giữ nguyên; các chữ số phía sau bỏ đi (hoặc thay bằng 0). Kết quả: ${decK(res,k)}.`});
});
const REPS=[[1,3,'0,(3)'],[2,3,'0,(6)'],[1,9,'0,(1)'],[4,9,'0,(4)'],[5,11,'0,(45)'],[2,11,'0,(18)'],[1,6,'0,1(6)'],[5,6,'0,8(3)'],[7,12,'0,58(3)'],[1,7,'0,(142857)'],[4,15,'0,2(6)'],[7,9,'0,(7)']];
N7('m7-2-repeat',2,'TH',r=>{
  const [a,b,s]=r.pick(REPS),wr=r.shuffle(REPS.filter(z=>z[2]!==s)).slice(0,2).map(z=>z[2]);
  const bad=s.includes('(')?s.replace(/[()]/g,''):s+'1';
  return mkTxt(r,{stem:`Phân số ${fr(a,b)} được viết dưới dạng số thập phân là`,correct:s,wrongs:[bad,...wr],
    sol:`Chia ${a} cho ${b} được ${s} (chu kì là phần trong ngoặc).`,chk:()=>Math.abs(a/b-parseFloat(s.replace(',','.').replace(/\((\d+)\)/,(m,p)=>p.repeat(8))))<1e-6});
});
N7('m7-2-absx',2,'TH',r=>{
  const a=rq(r),pos=Q(Math.abs(a[0]),a[1]),noSol=r.chance(.25),rhs=noSol?Q(-pos[0],pos[1]):pos;
  const opts=[`${I('x')} = ${qh(pos)}`,`${I('x')} = ${qh(Q(-pos[0],pos[1]))}`,`${I('x')} = ${qh(pos)} hoặc ${I('x')} = ${qh(Q(-pos[0],pos[1]))}`,`Không có giá trị nào của ${I('x')}`];
  const cor=noSol?opts[3]:opts[2];
  return mkTxt(r,{stem:`Tìm ${I('x')}, biết |${I('x')}| = ${qh(rhs)}.`,correct:cor,wrongs:opts.filter(o=>o!==cor),
    sol:noSol?`Vì |x| ≥ 0 với mọi x mà ${qh(rhs)} < 0 nên không có giá trị nào của x.`:`|x| = ${qh(pos)} ⟺ x = ${qh(pos)} hoặc x = ${qh(Q(-pos[0],pos[1]))}.`});
});
N7('m7-2-order',2,'TH',r=>{
  for(;;){
    const n=r.pick([2,3,5,6,7,8,10,11,12,13]),items=[[rt(n),Math.sqrt(n)],[dec(Math.sqrt(n)+r.pick([-.3,-.2,.1,.2,.3]),1),0],[qh(Q(r.int(3,20),r.pick([3,4,6,7]))),0],[sg(r.int(1,4)),0]];
    items[1][1]=parseFloat(items[1][0].replace(',','.').replace(MINUS,'-'));items[2][1]=eval(items[2][0].replace(/<[^>]+>/g,' ').trim().split(/\s+/).join('/'));items[3][1]=+items[3][0];
    if(new Set(items.map(z=>z[1].toFixed(6))).size<4)continue;
    const asc=r.shuffle(items).sort((a,b)=>a[1]-b[1]),H=a=>a.map(z=>z[0]).join('; ');
    const wr=[H([asc[1],asc[0],asc[2],asc[3]]),H([asc[0],asc[2],asc[1],asc[3]]),H([...asc].reverse()),H([asc[0],asc[1],asc[3],asc[2]])];
    return mkTxt(r,{stem:`Các số ${H(r.shuffle(items))} được sắp xếp theo thứ tự tăng dần là`,correct:H(asc),wrongs:wr,
      sol:`Đổi ra số thập phân: ${items.map(z=>z[0]+' ≈ '+dec(z[1],3)).join('; ')}. Thứ tự tăng dần: ${H(asc)}.`});
  }
});

/* ---------- Chương III: Góc và đường thẳng song song ---------- */
/* Hình: hai đường thẳng a // b bị cắt bởi c tại A, B; các góc đánh số 1–4 ngược chiều kim đồng hồ từ góc trên-phải. */
function parFig(o={}){
  const W=250,H=170,ya=55,yb=125,ax=150,bx=ax-(yb-ya)*0.62,ux=0.62,uy=1,ul=Math.hypot(ux,uy);
  const u=[ux/ul,-uy/ul],P=[[ax,ya],[bx,yb]];
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Hình vẽ hai đường thẳng song song">`;
  s+=`<line x1="15" y1="${ya}" x2="${W-15}" y2="${ya}" stroke="#000" stroke-width="1.2"/><line x1="15" y1="${yb}" x2="${W-15}" y2="${yb}" stroke="#000" stroke-width="1.2"/>`;
  const t0=[bx-u[0]*-40,yb-u[1]*-40],t1=[ax+u[0]*40,ya+u[1]*40];
  s+=`<line x1="${(bx-u[0]*40).toFixed(1)}" y1="${(yb-u[1]*40).toFixed(1)}" x2="${(ax+u[0]*40).toFixed(1)}" y2="${(ya+u[1]*40).toFixed(1)}" stroke="#000" stroke-width="1.2"/>`;
  s+=`<text x="${W-12}" y="${ya-5}" font-size="12" font-style="italic" text-anchor="end">a</text><text x="${W-12}" y="${yb-5}" font-size="12" font-style="italic" text-anchor="end">b</text>`;
  s+=`<text x="${(ax+u[0]*40+6).toFixed(1)}" y="${(ya+u[1]*40+4).toFixed(1)}" font-size="12" font-style="italic">c</text>`;
  const bis=[[1+u[0],u[1]],[u[0]-1,u[1]],[-1-u[0],-u[1]],[1-u[0],-u[1]]].map(v=>{const l=Math.hypot(v[0],v[1]);return[v[0]/l,v[1]/l]});
  ['A','B'].forEach((n,k)=>{const [x,y]=P[k];
    s+=`<circle cx="${x}" cy="${y}" r="2" fill="#000"/><text x="${x-32}" y="${y-5}" font-size="12" font-style="italic">${n}</text>`;
    bis.forEach((b,i)=>{s+=`<text x="${(x+b[0]*15).toFixed(1)}" y="${(y+b[1]*15+4).toFixed(1)}" font-size="10" text-anchor="middle">${i+1}</text>`});
  });
  return `<div class="figure">${s}</svg></div>`;
}
/* Giá trị góc tại A_i, B_i khi góc A1 = α (góc 1 và 3 bằng α; 2 và 4 bằng 180 − α) */
const angAt=(i,al)=>i%2===1?al:180-al;
const PAIR_NAME=(p,i,q,j)=>{
  if(p===q)return i%2===j%2?'đối đỉnh':'kề bù';
  const [ia,jb]=p==='A'?[i,j]:[j,i];
  if(ia===jb)return 'đồng vị';
  if((ia===3&&jb===1)||(ia===4&&jb===2))return 'so le trong';
  if((ia===3&&jb===2)||(ia===4&&jb===1))return 'trong cùng phía';
  if((ia===1&&jb===3)||(ia===2&&jb===4))return 'so le ngoài';
  return 'khác';
};
N7('m7-3-kebu',3,'NB',r=>{
  const al=r.pick([25,30,35,40,45,50,55,60,65,70,75,80,100,110,115,120,125,130,135,140,145,150,155]),[x,y,z]=r.pick([['x','y','z'],['m','n','t'],['x','t','y']]);
  return mkNum(r,{stem:`Cho hai góc ${ANG(x+'O'+y)} và ${ANG(y+'O'+z)} kề bù. Biết ${ANG(x+'O'+y)} = ${al}°. Số đo của ${ANG(y+'O'+z)} là`,correct:180-al,f:v=>v+'°',cands:[al,90-al>0?90-al:al+10,360-al,180-al+10],
    sol:`Hai góc kề bù có tổng số đo bằng 180° nên ${ANG(y+'O'+z)} = 180° − ${al}° = ${180-al}°.`});
});
N7('m7-3-dd',3,'NB',r=>{
  const al=r.pick([25,30,35,40,45,50,55,60,65,70,75,80,100,110,115,120,125,130,135,140,145,150,155]),t=r.chance(.5);
  return mkNum(r,{stem:`Hai đường thẳng ${I("xx'")} và ${I("yy'")} cắt nhau tại ${I('O')}. Biết ${ANG('xOy')} = ${al}°. Số đo của ${t?ANG("x'Oy'"):ANG("xOy'")} là`,correct:t?al:180-al,f:v=>v+'°',cands:[t?180-al:al,90,360-al,2*al<180?2*al:al/5*3],
    sol:t?`${ANG("x'Oy'")} và ${ANG('xOy')} là hai góc đối đỉnh nên bằng nhau: ${al}°.`:`${ANG("xOy'")} và ${ANG('xOy')} là hai góc kề bù nên ${ANG("xOy'")} = 180° − ${al}° = ${180-al}°.`});
});
N7('m7-3-pg',3,'NB',r=>{
  const al=r.int(5,34)*4,t=r.chance(.6);
  return mkNum(r,{stem:t?`Cho ${I('Ot')} là tia phân giác của ${ANG('xOy')}. Biết ${ANG('xOy')} = ${al}°. Số đo của ${ANG('xOt')} là`:`Cho ${I('Ot')} là tia phân giác của ${ANG('xOy')}. Biết ${ANG('xOt')} = ${al/2}°. Số đo của ${ANG('xOy')} là`,
    correct:t?al/2:al,f:v=>v+'°',cands:t?[al,180-al,al/4,90-al/2]:[al/2,180-al,al/4*3,al+al/2],ok:c=>c>0&&c<180,
    sol:t?`Tia phân giác chia góc thành hai góc bằng nhau: ${ANG('xOt')} = ${al}° : 2 = ${al/2}°.`:`${ANG('xOy')} = 2·${ANG('xOt')} = ${al}°.`});
});
N7('m7-3-par',3,'TH',r=>{
  const al=r.pick([30,35,40,45,50,55,60,65,70,75,80,100,105,110,115,120,125,130,135,140,145,150]),i=r.int(1,4),j=r.int(1,4),given=angAt(i,al),ask=angAt(j,al);
  return mkNum(r,{stem:`Cho hình vẽ, biết ${I('a')} // ${I('b')} và ${ANGN('A',i)} = ${given}°.${parFig()}Số đo của ${ANGN('B',j)} là`,correct:ask,f:v=>v+'°',cands:[180-ask,90,ask/2,ask+10],ok:c=>c>0&&c<180,
    sol:`Vì a // b nên các cặp góc đồng vị bằng nhau: ${ANGN('B',i)} = ${ANGN('A',i)} = ${given}°. ${i===j?'':`${ANGN('B',j)} ${i%2===j%2?'đối đỉnh':'kề bù'} với ${ANGN('B',i)} nên ${ANGN('B',j)} = ${ask}°.`}`});
});
N7('m7-3-pair',3,'NB',r=>{
  const want=r.pick(['so le trong','đồng vị','trong cùng phía']),all=[];
  for(const p of ['A','B'])for(let i=1;i<=4;i++)for(const q of ['A','B'])for(let j=1;j<=4;j++)if(p==='A'&&q==='B')all.push([p,i,q,j]);
  const T=all.filter(z=>PAIR_NAME(...z)===want),F=all.filter(z=>!['khác'].includes(PAIR_NAME(...z))&&PAIR_NAME(...z)!==want);
  const H=z=>`${ANGN(z[0],z[1])} và ${ANGN(z[2],z[3])}`,ok=r.pick(T);
  return mkTxt(r,{stem:`Cho hình vẽ.${parFig()}Cặp góc nào sau đây là cặp góc ${want}?`,correct:H(ok),wrongs:r.shuffle(F).slice(0,3).map(H),
    sol:`${H(ok)} là cặp góc ${want}.`});
});
const THEO7_T=['Qua một điểm ở ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó',
  'Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau',
  'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau',
  'Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó vuông góc với đường thẳng kia',
  'Hai góc đối đỉnh thì bằng nhau','Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song với nhau'];
const THEO7_F=['Qua một điểm ở ngoài một đường thẳng có vô số đường thẳng song song với đường thẳng đó',
  'Hai góc bằng nhau thì đối đỉnh','Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc trong cùng phía bằng nhau',
  'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì vuông góc với nhau',
  'Hai góc kề nhau thì có tổng số đo bằng 180°','Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị bù nhau'];
N7('m7-3-theory',3,'NB',r=>{
  const want=r.chance(.6),ok=r.pick(want?THEO7_T:THEO7_F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?THEO7_F:THEO7_T).slice(0,3).map(x=>x+'.'),
    sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}. (Tiên đề Euclid; tính chất hai đường thẳng song song; quan hệ giữa vuông góc và song song.)`});
});
N7('m7-3-perp',3,'TH',r=>{
  const [a,b,c]=r.shuffle(['a','b','c','d']).slice(0,3),t=r.int(0,1);
  const stem=t?`Cho ba đường thẳng phân biệt ${I(a)}, ${I(b)}, ${I(c)} với ${I(a)} ⊥ ${I(c)} và ${I(b)} ⊥ ${I(c)}. Khi đó`:`Cho ba đường thẳng phân biệt ${I(a)}, ${I(b)}, ${I(c)} với ${I(a)} // ${I(b)} và ${I(c)} ⊥ ${I(a)}. Khi đó`;
  const opts=t?[`${I(a)} // ${I(b)}.`,`${I(a)} ⊥ ${I(b)}.`,`${I(a)} cắt ${I(b)}.`,`${I(a)} trùng ${I(b)}.`]:[`${I(c)} ⊥ ${I(b)}.`,`${I(c)} // ${I(b)}.`,`${I(c)} // ${I(a)}.`,`${I(c)} trùng ${I(b)}.`];
  return mkTxt(r,{stem,correct:opts[0],wrongs:opts.slice(1),sol:t?'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.':'Một đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường thẳng kia.'});
});

/* ---------- Chương IV: Tam giác bằng nhau ---------- */
const triAngles=r=>{for(;;){const a=r.int(6,26)*5,b=r.int(6,26)*5,c=180-a-b;if(c>=20&&a!==b&&c!==a&&c!==b)return[a,b,c]}};
N7('m7-4-sum',4,'NB',r=>{
  const [a,b,c]=triAngles(r),N=r.pick(TRI_NAMES);
  return mkNum(r,{stem:`Cho tam giác ${I(N)} có ${ANG(N[0])} = ${a}°, ${ANG(N[1])} = ${b}°. Số đo ${ANG(N[2])} là`,correct:c,f:v=>v+'°',cands:[a+b,180-a,180-b,c+10],ok:x=>x>0&&x<180,
    sol:`Tổng ba góc của một tam giác bằng 180° nên ${ANG(N[2])} = 180° − ${a}° − ${b}° = ${c}°.`});
});
N7('m7-4-ext',4,'TH',r=>{
  const [a,b,c]=triAngles(r),N=r.pick(TRI_NAMES);
  return mkNum(r,{stem:`Cho tam giác ${I(N)} có ${ANG(N[0])} = ${a}°, ${ANG(N[1])} = ${b}°. Số đo góc ngoài của tam giác tại đỉnh ${I(N[2])} là`,correct:a+b,f:v=>v+'°',cands:[c,180-a,180-b,a+b+10],ok:x=>x>0&&x<180,
    sol:`Góc ngoài tại ${N[2]} bằng tổng hai góc trong không kề với nó: ${a}° + ${b}° = ${a+b}°.`});
});
N7('m7-4-right',4,'NB',r=>{
  const b=r.int(4,16)*5,N=r.pick(TRI_NAMES);
  return mkNum(r,{stem:`Cho tam giác ${I(N)} vuông tại ${I(N[0])} có ${ANG(N[1])} = ${b}°. Số đo ${ANG(N[2])} là`,correct:90-b,f:v=>v+'°',cands:[180-b,b,90+b,90],ok:x=>x>0&&x<180,
    sol:`Trong tam giác vuông, hai góc nhọn phụ nhau: ${ANG(N[2])} = 90° − ${b}° = ${90-b}°.`});
});
N7('m7-4-cong',4,'NB',r=>{
  const [P,Qn]=r.pick([['ABC','MNP'],['ABC','DEF'],['DEF','HIK'],['MNP','EFG']]),i=r.int(0,2),j=(i+r.int(1,2))%3;
  const ask=r.chance(.5)?'side':'ang';
  const s=(T,x,y)=>T[x]+T[y];
  if(ask==='side'){
    const cor=s(Qn,i,j),wr=[s(Qn,j,(3-i-j)),s(Qn,i,3-i-j),s(P,i,j),s(Qn,j,i)===cor?'':''].filter(Boolean);
    return mkTxt(r,{stem:`Cho ${I('Δ'+P)} = ${I('Δ'+Qn)}. Cạnh tương ứng với cạnh ${I(s(P,i,j))} là`,correct:I(cor),wrongs:wr.map(I).concat([I(s(Qn,(3-i-j),i))]),
      sol:`Hai tam giác bằng nhau viết theo thứ tự các đỉnh tương ứng: ${P[0]} ↔ ${Qn[0]}, ${P[1]} ↔ ${Qn[1]}, ${P[2]} ↔ ${Qn[2]}. Vậy ${s(P,i,j)} = ${cor}.`});
  }
  return mkTxt(r,{stem:`Cho ${I('Δ'+P)} = ${I('Δ'+Qn)}. Khẳng định nào sau đây đúng?`,correct:`${ANG(P[i])} = ${ANG(Qn[i])}`,wrongs:[`${ANG(P[i])} = ${ANG(Qn[j])}`,`${ANG(P[j])} = ${ANG(Qn[i])}`,`${ANG(P[i])} = ${ANG(Qn[3-i-j])}`],
    sol:`Các góc tương ứng bằng nhau: ${ANG(P[i])} = ${ANG(Qn[i])}.`});
});
N7('m7-4-case',4,'TH',r=>{
  const c=r.int(0,2),N='ABC',M='DEF';
  const given=[`${I('AB')} = ${I('DE')}, ${I('BC')} = ${I('EF')}, ${I('AC')} = ${I('DF')}`,`${I('AB')} = ${I('DE')}, ${ANG('B')} = ${ANG('E')}, ${I('BC')} = ${I('EF')}`,`${ANG('B')} = ${ANG('E')}, ${I('BC')} = ${I('EF')}, ${ANG('C')} = ${ANG('F')}`][c];
  const names=['cạnh – cạnh – cạnh (c.c.c)','cạnh – góc – cạnh (c.g.c)','góc – cạnh – góc (g.c.g)','góc – góc – góc'];
  return mkTxt(r,{stem:`Hai tam giác ${I(N)} và ${I(M)} có ${given}. Khi đó ${I('ΔABC')} = ${I('ΔDEF')} theo trường hợp`,correct:names[c]+'.',wrongs:names.filter((_,k)=>k!==c).map(x=>x+'.'),
    sol:`Dựa vào các yếu tố bằng nhau đã cho, hai tam giác bằng nhau theo trường hợp ${names[c]}.`});
});
N7('m7-4-isos',4,'TH',r=>{
  const N=r.pick(TRI_NAMES),t=r.int(0,1);
  if(t===0){const b=r.int(7,17)*5,a=180-2*b;
    return mkNum(r,{stem:`Cho tam giác ${I(N)} cân tại ${I(N[0])} có ${ANG(N[1])} = ${b}°. Số đo ${ANG(N[0])} là`,correct:a,f:v=>v+'°',cands:[b,180-b,90-b>0?90-b:b+5,2*b<180?2*b:a+10],ok:x=>x>0&&x<180,
      sol:`Tam giác cân tại ${N[0]} nên ${ANG(N[2])} = ${ANG(N[1])} = ${b}°. Do đó ${ANG(N[0])} = 180° − 2·${b}° = ${a}°.`});}
  const a=r.int(4,30)*4,b=(180-a)/2;
  return mkNum(r,{stem:`Cho tam giác ${I(N)} cân tại ${I(N[0])} có ${ANG(N[0])} = ${a}°. Số đo ${ANG(N[1])} là`,correct:b,f:v=>v+'°',cands:[a,180-a,90-a/2+10,a/2],ok:x=>x>0&&x<180,
    sol:`${ANG(N[1])} = ${ANG(N[2])} = (180° − ${a}°) : 2 = ${b}°.`});
});
N7('m7-4-equil',4,'NB',r=>{
  const T=['Tam giác đều có ba góc bằng nhau và mỗi góc bằng 60°','Tam giác cân có hai góc ở đáy bằng nhau','Điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai mút của đoạn thẳng đó','Trong tam giác vuông, hai góc nhọn phụ nhau','Tam giác cân có một góc bằng 60° là tam giác đều'];
  const F=['Tam giác cân có ba góc bằng nhau','Trong tam giác vuông, hai góc nhọn bù nhau','Tam giác có hai góc bằng 45° là tam giác đều','Góc ngoài của tam giác bằng góc trong kề với nó','Đường trung trực của đoạn thẳng là đường thẳng đi qua trung điểm của đoạn thẳng đó'];
  const want=r.chance(.6),ok=r.pick(want?T:F);
  return mkTxt(r,{stem:`Khẳng định nào sau đây ${want?'đúng':'<b>sai</b>'}?`,correct:ok+'.',wrongs:r.shuffle(want?F:T).slice(0,3).map(x=>x+'.'),sol:`${want?'Khẳng định đúng':'Khẳng định sai'}: ${ok}.`});
});
N7('m7-4-trung',4,'NB',r=>{
  const L=r.int(3,15),t=r.int(0,1);
  return mkNum(r,{stem:t?`Điểm ${I('M')} nằm trên đường trung trực của đoạn thẳng ${I('AB')}. Biết ${I('MA')} = ${L} cm. Độ dài ${I('MB')} là`:`Đường trung trực của đoạn thẳng ${I('AB')} cắt ${I('AB')} tại ${I('H')}. Biết ${I('AB')} = ${2*L} cm. Độ dài ${I('HB')} là`,
    correct:L,f:v=>v+' cm',cands:[2*L,L+2,L/2,L+1],ok:x=>x>0,sol:t?`M thuộc đường trung trực của AB nên MA = MB = ${L} cm.`:`Đường trung trực đi qua trung điểm H của AB nên HB = ${2*L} : 2 = ${L} cm.`});
});

/* ---------- Chương V: Dữ liệu ---------- */
function lineSVG(cats,vals,o={}){
  const W=o.w||320,H=o.h||175,ml=34,mb=26,mt=16,mr=10,mx=Math.max(...vals),step=niceStep(mx),top=Math.ceil(mx/step)*step+(mx%step===0?step:0);
  const pw=W-ml-mr,ph_=H-mt-mb,X=i=>ml+pw/cats.length*(i+.5),Y=v=>mt+ph_-ph_*v/top;
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Biểu đồ đoạn thẳng">`;
  for(let v=0;v<=top;v+=step)s+=`<line x1="${ml}" y1="${Y(v)}" x2="${W-mr}" y2="${Y(v)}" stroke="#bbb" stroke-width="0.6"/><text x="${ml-5}" y="${Y(v)+3.5}" font-size="9" text-anchor="end">${v}</text>`;
  s+=`<line x1="${ml}" y1="${mt}" x2="${ml}" y2="${mt+ph_}" stroke="#000"/><line x1="${ml}" y1="${mt+ph_}" x2="${W-mr}" y2="${mt+ph_}" stroke="#000"/>`;
  s+=`<polyline fill="none" stroke="#000" stroke-width="1.4" points="${vals.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ')}"/>`;
  vals.forEach((v,i)=>{s+=`<circle cx="${X(i)}" cy="${Y(v)}" r="2.4" fill="#000"/><text x="${X(i)}" y="${Y(v)-6}" font-size="9.5" text-anchor="middle" font-weight="bold">${v}</text><text x="${X(i)}" y="${mt+ph_+13}" font-size="9.5" text-anchor="middle">${cats[i]}</text>`});
  if(o.unit)s+=`<text x="${ml}" y="9" font-size="9" font-style="italic">${o.unit}</text>`;
  return s+'</svg>';
}
const LINE_SETS=[{what:'Lượng mưa (mm) tại một địa phương trong các tháng',cats:['T6','T7','T8','T9','T10'],lo:40,hi:250,unit:'mm'},
  {what:'Số sách thư viện cho mượn trong các tuần',cats:['Tuần 1','Tuần 2','Tuần 3','Tuần 4','Tuần 5'],lo:20,hi:90,unit:'quyển'},
  {what:'Nhiệt độ trung bình (°C) trong các ngày',cats:['T2','T3','T4','T5','T6','T7'],lo:18,hi:35,unit:'°C'}];
N7('m7-5-type',5,'NB',r=>{
  const QN=['Chiều cao (cm) của các bạn trong lớp','Số anh chị em ruột của mỗi học sinh','Cân nặng (kg) của học sinh lớp 7A','Số điểm kiểm tra môn Toán','Thời gian (phút) đi từ nhà đến trường'];
  const QL=['Môn thể thao yêu thích của học sinh','Màu sắc yêu thích','Phương tiện đến trường','Xếp loại học lực (Tốt, Khá, Đạt…)','Tên các loài hoa trong vườn trường'];
  const want=r.chance(.5),ok=r.pick(want?QN:QL);
  return mkTxt(r,{stem:`Dữ liệu nào sau đây là dữ liệu ${want?'định lượng (là số)':'định tính (không phải là số)'}?`,correct:ok+'.',wrongs:r.shuffle(want?QL:QN).slice(0,3).map(x=>x+'.'),
    sol:`Dữ liệu định lượng được biểu diễn bằng số; dữ liệu định tính được biểu diễn bằng từ, kí hiệu… Vậy chọn “${ok}”.`});
});
N7('m7-5-pie',5,'TH',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,100,120,200,400]),k=r.int(0,3),items=set.names.map((n,i)=>({name:n,pct:pcts[i]}));
  return mkNum(r,{stem:`Biểu đồ hình quạt tròn dưới đây biểu diễn kết quả khảo sát ${set.what} của ${N} học sinh khối 7.<div class="figure">${pieSVG(items)}</div>Số học sinh chọn “${set.names[k]}” là`,correct:N*pcts[k]/100,ok:x=>x>0,
    cands:[pcts[k],N*pcts[(k+1)%4]/100,N*pcts[k]/100+N/20,N-N*pcts[k]/100],sol:`${N} · ${pcts[k]}% = ${N*pcts[k]/100} (học sinh).`});
});
N7('m7-5-line',5,'TH',r=>{
  const S=r.pick(LINE_SETS),vals=distinctInts(r,S.cats.length,S.lo,S.hi),t=r.int(0,1);
  const mx=Math.max(...vals),mn=Math.min(...vals),ii=vals.indexOf(mx);
  if(t===0)return mkTxt(r,{stem:`${S.what} được cho trong biểu đồ đoạn thẳng sau.<div class="figure">${lineSVG(S.cats,vals,{unit:S.unit})}</div>Thời điểm có số liệu cao nhất là`,correct:S.cats[ii],wrongs:S.cats.filter((_,i)=>i!==ii),
    sol:`Điểm cao nhất của đường gấp khúc ứng với ${S.cats[ii]} (${mx} ${S.unit}).`});
  return mkNum(r,{stem:`${S.what} được cho trong biểu đồ đoạn thẳng sau.<div class="figure">${lineSVG(S.cats,vals,{unit:S.unit})}</div>Hiệu giữa số liệu lớn nhất và nhỏ nhất là`,correct:mx-mn,ok:x=>x>0,cands:[mx,mn,mx-mn+5,mx+mn],
    sol:`${mx} − ${mn} = ${mx-mn} (${S.unit}).`});
});

/* ---------- Đúng/sai ---------- */
DS7('ds7-q',1,'NB',r=>{
  const a=rq(r,[2,3,4,6]),b=rq(r,[2,3,4,6]),c=rq(r,[2,3,5]),A=qadd(a,b),B=qmul(A,c),x=qsub(B,a);
  return mkDS(r,{stem:`Cho các biểu thức ${I('A')} = ${qh(a)} + ${qp(b)} và ${I('B')} = ${I('A')} · ${qp(c)}. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I('A')} = ${qh(A)}`,f:`${I('A')} = ${qh(Q(a[0]+b[0],a[1]+b[1]))===qh(A)?qh(qadd(A,Q(1))):qh(Q(a[0]+b[0],a[1]+b[1]))}`,why:`A = ${qh(a)} + ${qp(b)} = ${qh(A)}.`},
    {t:`${I('B')} = ${qh(B)}`,f:`${I('B')} = ${qh(Q(-B[0]||1,B[1]))}`,why:`B = ${qh(A)} · ${qp(c)} = ${qh(B)}.`},
    {t:qv(A)>qv(B)?`${I('A')} > ${I('B')}`:qv(A)<qv(B)?`${I('A')} < ${I('B')}`:`${I('A')} = ${I('B')}`,f:qv(A)>qv(B)?`${I('A')} < ${I('B')}`:qv(A)<qv(B)?`${I('A')} > ${I('B')}`:`${I('A')} > ${I('B')}`,why:`So sánh A = ${qh(A)} với B = ${qh(B)}: ${qh(A)} ${qv(A)>qv(B)?'>':qv(A)<qv(B)?'<':'='} ${qh(B)}.`},
    {t:`Giá trị của ${I('x')} thỏa mãn ${I('x')} + ${qp(a)} = ${I('B')} là ${qh(x)}`,f:`Giá trị của ${I('x')} thỏa mãn ${I('x')} + ${qp(a)} = ${I('B')} là ${qh(qadd(B,a))===qh(x)?qh(qadd(x,Q(1))):qh(qadd(B,a))}`,why:`x = B − ${qp(a)} = ${qh(x)}.`}
  ],chk:()=>B[0]!==0||true});
});
DS7('ds7-real',2,'NB',r=>{
  const n=r.pick([2,3,5,6,7,10]),m=r.int(2,12),q=rq(r),p=Q(Math.abs(q[0]),q[1]),[aa,bb,s]=r.pick(REPS),v=r.int(1000,9999)/1000;
  return mkDS(r,{stem:'Xét tính đúng sai của các khẳng định sau:',items:[
    {t:`${rt(n)} là số vô tỉ`,f:`${rt(m*m)} là số vô tỉ`,why:`${n} không phải số chính phương nên ${rt(n)} là số vô tỉ; còn ${rt(m*m)} = ${m}.`},
    {t:`|${qh(Q(-p[0],p[1]))}| = ${qh(p)}`,f:`|${qh(Q(-p[0],p[1]))}| = ${qh(Q(-p[0],p[1]))}`,why:`Giá trị tuyệt đối của một số luôn không âm.`},
    {t:`${fr(aa,bb)} = ${s}`,f:`${fr(aa,bb)} = ${r.pick(REPS.filter(z=>z[2]!==s))[2]}`,why:`Chia ${aa} cho ${bb} được ${s}.`},
    {t:`Làm tròn số ${dec(v,3)} đến hàng phần trăm được ${dec(roundTo(v,2),2)}`,f:`Làm tròn số ${dec(v,3)} đến hàng phần trăm được ${dec(roundTo(v,2)+0.01,2)}`,why:`Chữ số hàng phần nghìn là ${Math.round(v*1000)%10} ${Math.round(v*1000)%10>=5?'≥':'<'} 5 nên được ${dec(roundTo(v,2),2)}.`}
  ]});
});
DS7('ds7-par',3,'TH',r=>{
  const al=r.pick([30,35,40,45,50,55,60,65,70,75,80,100,105,110,115,120,125,130,135,140,145,150]),i=r.int(1,4),given=angAt(i,al);
  const it=(P,j,why)=>{const v=angAt(j,al);return{t:`${ANGN(P,j)} = ${v}°`,f:`${ANGN(P,j)} = ${180-v===v?v+10:180-v}°`,why}};
  const j1=((i)%4)+1,j2=((i+1)%4)+1;
  return mkDS(r,{stem:`Cho hình vẽ, biết ${I('a')} // ${I('b')} và ${ANGN('A',i)} = ${given}°. Xét tính đúng sai của các khẳng định sau:${parFig()}`,items:[
    it('B',i,`${ANGN('B',i)} và ${ANGN('A',i)} là hai góc đồng vị nên bằng nhau.`),
    it('A',j2,`${ANGN('A',j2)} và ${ANGN('A',i)} là hai góc đối đỉnh nên bằng nhau.`),
    it('A',j1,`${ANGN('A',j1)} kề bù với ${ANGN('A',i)} nên bằng 180° − ${given}°.`),
    {t:`${ANGN('A',3)} + ${ANGN('B',2)} = 180°`,f:`${ANGN('A',3)} = ${ANGN('B',2)}`,why:`${ANGN('A',3)} và ${ANGN('B',2)} là hai góc trong cùng phía nên bù nhau${al===90?'':' (và không bằng nhau vì góc khác 90°)'}.`}
  ],chk:()=>al!==90});
});
DS7('ds7-tri',4,'TH',r=>{
  const N=r.pick(TRI_NAMES),iso=r.chance(.4);let a,b,c;
  if(iso){b=r.int(7,17)*5;c=b;a=180-2*b}else [a,b,c]=triAngles(r);
  const kind=Math.max(a,b,c)>90?'tù':Math.max(a,b,c)===90?'vuông':'nhọn';
  return mkDS(r,{stem:`Cho tam giác ${I(N)} có ${ANG(N[0])} = ${a}° và ${ANG(N[1])} = ${b}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${ANG(N[2])} = ${c}°`,f:`${ANG(N[2])} = ${c+10}°`,why:`${ANG(N[2])} = 180° − ${a}° − ${b}° = ${c}°.`},
    {t:`Góc ngoài tại đỉnh ${I(N[2])} bằng ${a+b}°`,f:`Góc ngoài tại đỉnh ${I(N[2])} bằng ${c}°`,why:`Góc ngoài tại ${N[2]} = ${ANG(N[0])} + ${ANG(N[1])} = ${a+b}°.`},
    {t:`Tam giác ${I(N)} là tam giác ${kind}`,f:`Tam giác ${I(N)} là tam giác ${kind==='nhọn'?'tù':'nhọn'}`,why:`Góc lớn nhất bằng ${Math.max(a,b,c)}°.`},
    {t:iso?`Tam giác ${I(N)} cân tại ${I(N[0])}`:`Tam giác ${I(N)} không phải tam giác cân`,f:iso?`Tam giác ${I(N)} không phải tam giác cân`:`Tam giác ${I(N)} cân tại ${I(N[0])}`,why:iso?`${ANG(N[1])} = ${ANG(N[2])} = ${b}° nên tam giác cân tại ${N[0]}.`:`Ba góc ${a}°, ${b}°, ${c}° đôi một khác nhau nên tam giác không cân.`}
  ],chk:()=>a+b+c===180&&(iso||new Set([a,b,c]).size===3)});
});
DS7('ds7-cong',4,'NB',r=>{
  const [P,M]=r.pick([['ABC','DEF'],['ABC','MNP'],['MNP','HIK']]);let x=r.int(3,9),y=r.int(4,11),z=r.int(Math.abs(x-y)+1,x+y-1);
  while(x===y||y===z||x===z){x=r.int(3,9);y=r.int(4,11);z=r.int(Math.abs(x-y)+1,x+y-1)}
  const ang=r.int(8,22)*5;
  return mkDS(r,{stem:`Cho ${I('Δ'+P)} = ${I('Δ'+M)}, biết ${I(P[0]+P[1])} = ${x} cm, ${I(P[1]+P[2])} = ${y} cm, ${I(P[0]+P[2])} = ${z} cm và ${ANG(P[1])} = ${ang}°. Xét tính đúng sai của các khẳng định sau:`,items:[
    {t:`${I(M[0]+M[1])} = ${x} cm`,f:`${I(M[0]+M[1])} = ${y} cm`,why:`${M[0]+M[1]} tương ứng với ${P[0]+P[1]}.`},
    {t:`${ANG(M[1])} = ${ang}°`,f:`${ANG(M[0])} = ${ang}°`,why:`${ANG(M[1])} tương ứng với ${ANG(P[1])}.`},
    {t:`Chu vi tam giác ${I(M)} bằng ${x+y+z} cm`,f:`Chu vi tam giác ${I(M)} bằng ${x+y+z+2} cm`,why:`Chu vi = ${x} + ${y} + ${z} = ${x+y+z} cm.`},
    {t:`${I(M[0]+M[2])} = ${z} cm`,f:`${I(M[0]+M[2])} = ${y} cm`,why:`${M[0]+M[2]} tương ứng với ${P[0]+P[2]}.`}
  ],chk:()=>x!==y&&y!==z&&x+y+z+2!==x+y+z});
});

/* ---------- Trả lời ngắn ---------- */
TLN7('t7-1-expr',1,'TH',r=>{
  for(;;){const a=rq(r,[2,4,5]),b=rq(r,[2,4,5,10]),c=rq(r,[2,4,5]),v=qadd(a,qmul(b,c));if(100%v[1])continue;
    return{kind:'tln',stem:`Tính giá trị của biểu thức ${qh(a)} + ${qp(b)} · ${qp(c)} (viết kết quả dưới dạng số thập phân).`,ans:qv(v),unit:'',
      sol:`${qp(b)} · ${qp(c)} = ${qh(qmul(b,c))}; ${qh(a)} + ${qp(qmul(b,c))} = ${qh(v)} = ${fmt(qv(v))}.`,chk:()=>Math.abs(qv(v)*100-Math.round(qv(v)*100))<1e-9}}
});
TLN7('t7-1-x',1,'VD',r=>{
  for(;;){const x=Q(r.nz(-40,40),r.pick([2,4,5,10])),a=rq(r,[2,4,5]),k=rq(r,[2,3,4,5]),rhs=qmul(qadd(x,a),k);if(!finiteDec(x)||qv(x)*100%1)continue;
    return{kind:'tln',stem:`Tìm ${I('x')}, biết ${qp(k)} · (${I('x')} + ${qp(a)}) = ${qh(rhs)} (viết kết quả dưới dạng số thập phân).`,ans:qv(x),unit:'',
      sol:`x + ${qp(a)} = ${qh(rhs)} : ${qp(k)} = ${qh(qadd(x,a))}, suy ra x = ${qh(x)} = ${fmt(qv(x))}.`,chk:()=>qeq(qmul(qadd(x,a),k),rhs)}}
});
TLN7('t7-1-pow',1,'TH',r=>{
  const b=r.pick([2,3,5]),m=r.int(2,6),n=r.int(2,5),k=r.int(1,4),e=m+2*n-k;
  if(e<1)return T.tln['t7-1-pow'].gen(r);
  return{kind:'tln',stem:`Tìm số tự nhiên ${I('n')}, biết ${b}${sup(m)} · ${b*b}${sup(n)} : ${b}${sup(k)} = ${b}${sup(I('n'))}.`,ans:e,unit:'',
    sol:`${b*b}${sup(n)} = ${b}${sup(2*n)} nên vế trái = ${b}${sup(`${m} + ${2*n} − ${k}`)} = ${b}${sup(e)}. Vậy n = ${e}.`,chk:()=>Math.abs(b**m*(b*b)**n/b**k-b**e)<1e-6};
});
TLN7('t7-2-abs',2,'VD',r=>{
  const a=r.nz(-9,9),bq=r.int(1,9),c=r.int(0,5),t=r.int(0,1);
  return{kind:'tln',stem:`Tìm ${t?'giá trị lớn nhất':'tổng các giá trị'} của ${I('x')} thỏa mãn |${I('x')} ${a<0?'+':MINUS} ${Math.abs(a)}| + ${c} = ${bq+c}.`,ans:t?a+bq:2*a,unit:'',
    sol:`|x ${a<0?'+':'−'} ${Math.abs(a)}| = ${bq} ⟺ x = ${sg(a)} + ${bq} = ${sg(a+bq)} hoặc x = ${sg(a)} − ${bq} = ${sg(a-bq)}. ${t?'Giá trị lớn nhất là '+sg(a+bq):'Tổng: '+sg(2*a)}.`,chk:()=>Math.abs((a+bq)-a)===bq};
});
TLN7('t7-2-sq',2,'TH',r=>{
  const S=r.pick([2,3,5,6,7,8,10,12,15,20,30,40,50]),v=r2(Math.sqrt(S));
  return{kind:'tln',stem:`Một mảnh đất hình vuông có diện tích ${S} m². Tính độ dài cạnh của mảnh đất (đơn vị: mét, làm tròn đến hàng phần trăm).`,ans:v,unit:'',
    sol:`Cạnh = ${rt(S)} ≈ ${fmt(v)} (m).`,chk:()=>Math.abs(v-Math.sqrt(S))<0.0051};
});
TLN7('t7-2-sqrt',2,'TH',r=>{
  const a=r.int(2,12),b=r.int(2,9),c=r.nz(-9,9),v=a-2*b+Math.abs(c);
  return{kind:'tln',stem:`Tính giá trị của biểu thức ${rt(a*a)} ${MINUS} 2${rt(b*b)} + |${sg(c)}|.`,ans:v,unit:'',sol:`= ${a} − 2·${b} + ${Math.abs(c)} = ${sg(v)}.`};
});
function zigFig(){
  const s=`<svg class="chart" viewBox="0 0 250 150" width="250" height="150" role="img" aria-label="Hình vẽ"><line x1="15" y1="35" x2="235" y2="35" stroke="#000" stroke-width="1.2"/><line x1="15" y1="115" x2="235" y2="115" stroke="#000" stroke-width="1.2"/>
<line x1="60" y1="35" x2="170" y2="75" stroke="#000" stroke-width="1.2"/><line x1="80" y1="115" x2="170" y2="75" stroke="#000" stroke-width="1.2"/>
<circle cx="60" cy="35" r="2" fill="#000"/><circle cx="80" cy="115" r="2" fill="#000"/><circle cx="170" cy="75" r="2" fill="#000"/>
<text x="55" y="28" font-size="12" font-style="italic">A</text><text x="75" y="131" font-size="12" font-style="italic">B</text><text x="176" y="79" font-size="12" font-style="italic">O</text>
<text x="228" y="30" font-size="12" font-style="italic">x</text><text x="228" y="110" font-size="12" font-style="italic">y</text><text x="15" y="30" font-size="12" font-style="italic">a</text><text x="15" y="110" font-size="12" font-style="italic">b</text></svg>`;
  return `<div class="figure">${s}</div>`;
}
TLN7('t7-3-zig',3,'VD',r=>{
  const al=r.int(5,14)*5,be=r.int(5,14)*5;
  return{kind:'tln',stem:`Cho hình vẽ, biết ${I('a')} // ${I('b')}, ${ANG('xAO')} = ${al}° và ${ANG('yBO')} = ${be}°.${zigFig()}Tính số đo ${ANG('AOB')} (đơn vị: độ).`,ans:al+be,unit:'',
    sol:`Qua O kẻ đường thẳng Oz // a (khi đó Oz // b). Ta có ${ANG('AOz')} = ${ANG('xAO')} = ${al}° và ${ANG('BOz')} = ${ANG('yBO')} = ${be}° (so le trong). Vậy ${ANG('AOB')} = ${al}° + ${be}° = ${al+be}°.`};
});
TLN7('t7-3-pair',3,'TH',r=>{
  const al=r.pick([30,35,40,45,50,55,60,65,70,75,80,100,105,110,115,120,125,130,135,140,145,150]),i=r.int(1,4),j=r.int(1,4),k=r.int(1,4);
  return{kind:'tln',stem:`Cho hình vẽ, biết ${I('a')} // ${I('b')} và ${ANGN('A',i)} = ${angAt(i,al)}°.${parFig()}Tính tổng ${ANGN('B',j)} + ${ANGN('A',k)} (đơn vị: độ).`,ans:angAt(j,al)+angAt(k,al),unit:'',
    sol:`Từ ${ANGN('A',i)} = ${angAt(i,al)}° suy ra các góc 1, 3 (tại A và B) bằng ${al}°, các góc 2, 4 bằng ${180-al}°. Vậy tổng = ${angAt(j,al)}° + ${angAt(k,al)}° = ${angAt(j,al)+angAt(k,al)}°.`};
});
TLN7('t7-3-pg',3,'TH',r=>{
  const al=r.int(4,30)*5;
  return{kind:'tln',stem:`Cho hai góc kề bù ${ANG('xOy')} và ${ANG("yOx'")}, biết ${ANG('xOy')} = ${al}°. Gọi ${I('Ot')} là tia phân giác của ${ANG("yOx'")}. Tính số đo ${ANG('xOt')} (đơn vị: độ).`,ans:al+(180-al)/2,unit:'',
    sol:`${ANG("yOx'")} = 180° − ${al}° = ${180-al}°, nên ${ANG('yOt')} = ${(180-al)/2}°. Vậy ${ANG('xOt')} = ${al}° + ${(180-al)/2}° = ${al+(180-al)/2}°.`};
});
TLN7('t7-4-ang',4,'TH',r=>{
  const b=r.int(7,17)*5,N=r.pick(TRI_NAMES);
  return{kind:'tln',stem:`Cho tam giác ${I(N)} cân tại ${I(N[0])} có ${ANG(N[1])} = ${b}°. Tính số đo góc ngoài của tam giác tại đỉnh ${I(N[0])} (đơn vị: độ).`,ans:2*b,unit:'',
    sol:`${ANG(N[2])} = ${ANG(N[1])} = ${b}°; góc ngoài tại ${N[0]} = ${ANG(N[1])} + ${ANG(N[2])} = ${2*b}°.`};
});
TLN7('t7-4-per',4,'TH',r=>{
  const x=r.int(3,9),y=r.int(4,11),z=r.int(Math.abs(x-y)+1,x+y-1);
  return{kind:'tln',stem:`Cho ${I('ΔABC')} = ${I('ΔMNP')}, biết ${I('AB')} = ${x} cm, ${I('NP')} = ${y} cm và ${I('MP')} = ${z} cm. Tính chu vi tam giác ${I('ABC')} (đơn vị: cm).`,ans:x+y+z,unit:'',
    sol:`BC = NP = ${y} cm, AC = MP = ${z} cm. Chu vi = ${x} + ${y} + ${z} = ${x+y+z} cm.`};
});
TLN7('t7-4-ext',4,'VD',r=>{
  let [a,b]=triAngles(r);if(a<b)[a,b]=[b,a];const N=r.pick(TRI_NAMES),e=a+b,d=a-b;
  return{kind:'tln',stem:`Cho tam giác ${I(N)} có góc ngoài tại đỉnh ${I(N[2])} bằng ${e}° và ${ANG(N[0])} ${MINUS} ${ANG(N[1])} = ${d}°. Tính số đo ${ANG(N[0])} (đơn vị: độ).`,ans:a,unit:'',
    sol:`Góc ngoài tại ${N[2]}: ${ANG(N[0])} + ${ANG(N[1])} = ${e}°. Kết hợp ${ANG(N[0])} − ${ANG(N[1])} = ${d}° được ${ANG(N[0])} = (${e}° + ${d}°) : 2 = ${a}°.`,chk:()=>(e+d)/2===a};
});
TLN7('t7-5-pie',5,'TH',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,80,120,200,400]),k=r.int(0,3),j=(k+r.int(1,3))%4,items=set.names.map((n,i)=>({name:n,pct:pcts[i]}));
  return{kind:'tln',stem:`Biểu đồ hình quạt tròn dưới đây biểu diễn kết quả khảo sát ${set.what} của ${N} học sinh.<div class="figure">${pieSVG(items)}</div>Số học sinh chọn “${set.names[k]}” nhiều hơn số học sinh chọn “${set.names[j]}” bao nhiêu bạn? (Nếu ít hơn thì ghi số âm.)`,ans:N*(pcts[k]-pcts[j])/100,unit:'',
    sol:`${N}·${pcts[k]}% − ${N}·${pcts[j]}% = ${N*pcts[k]/100} − ${N*pcts[j]/100} = ${N*(pcts[k]-pcts[j])/100}.`};
});

/* ---------- Tự luận (2 ý × 0,5 đ) ---------- */
TL7('tl7-alg1',1,'TH','alg',r=>{
  const a=rq(r,[2,3,4,6]),b=rq(r,[2,3,4]),c=rq(r,[2,3,5]),A=qadd(a,qdiv(b,c));
  const x=rq(r,[2,3,4,6]),p=rq(r,[2,3,4]),k=rq(r,[2,3,5]),rhs=qadd(qmul(k,x),p);
  return{kind:'tl',title:'Số hữu tỉ',parts:[
    {pts:.5,html:`Tính giá trị biểu thức ${I('A')} = ${qh(a)} + ${qp(b)} : ${qp(c)}.`},
    {pts:.5,html:`Tìm ${I('x')}, biết ${qh(k)}${I('x')} + ${qp(p)} = ${qh(rhs)}.`}],
    sol:[ptxt([[`${qp(b)} : ${qp(c)} = ${qp(b)} · ${qp(Q(c[1],c[0]))} = ${qh(qdiv(b,c))}`,.25],[`A = ${qh(a)} + ${qp(qdiv(b,c))} = ${qh(A)}`,.25]]),
      ptxt([[`${qh(k)}x = ${qh(rhs)} − ${qp(p)} = ${qh(qmul(k,x))}`,.25],[`x = ${qh(qmul(k,x))} : ${qp(k)} = ${qh(x)}`,.25]])],
    chk:()=>qeq(qadd(qmul(k,x),p),rhs)};
});
TL7('tl7-alg2',1,'VD','alg',r=>{
  const b=r.pick([2,3]),m=r.int(3,7),n=r.int(2,5),k=r.int(2,4),e=m+2*n-3*k;
  if(e<0||e>12)return T.tl['tl7-alg2'].gen(r);
  const q=r.pick([Q(2,3),Q(-2,3),Q(3,2),Q(-3,2),Q(1,2),Q(-1,2),Q(3,4),Q(-1,3)]),u=r.int(2,4),d=r.int(2,3),w=u+d,ans=Q(q[0]**d,q[1]**d);
  return{kind:'tl',title:'Lũy thừa của một số hữu tỉ',parts:[
    {pts:.5,html:`Tính ${fr(`${b}${sup(m)} · ${b*b}${sup(n)}`,`${b**3}${sup(k)}`)}.`},
    {pts:.5,html:`Tìm ${I('x')}, biết ${I('x')} · ${pr7(q)}${sup(u)} = ${pr7(q)}${sup(w)}.`}],
    sol:[ptxt([[`= ${fr(`${b}${sup(m)} · ${b}${sup(2*n)}`,`${b}${sup(3*k)}`)} = ${b}${sup(`${m} + ${2*n} − ${3*k}`)}`,.25],[`= ${b}${sup(e)} = ${b**e}`,.25]]),
      ptxt([[`${I('x')} = ${pr7(q)}${sup(w)} : ${pr7(q)}${sup(u)} = ${pr7(q)}${sup(w-u)}`,.25],[`${I('x')} = ${qh(ans)}`,.25]])],
    chk:()=>Math.abs(b**m*(b*b)**n/(b**3)**k-b**e)<1e-6&&closeN(qv(ans)*qv(q)**u,qv(q)**w)};
});
TL7('tl7-alg3',2,'TH','alg',r=>{
  const a=r.int(2,12),b=r.int(2,9),c=rq(r),v=Q(a*c[1]-b*c[1]+Math.abs(c[0]),c[1]);
  const [aa,bb,s]=r.pick(REPS.slice(0,9));
  return{kind:'tl',title:'Số thực',parts:[
    {pts:.5,html:`Tính ${rt(a*a)} ${MINUS} ${rt(b*b)} + |${qh(c)}|.`},
    {pts:.5,html:`Viết phân số ${fr(aa,bb)} dưới dạng số thập phân vô hạn tuần hoàn và làm tròn số đó đến hàng phần trăm.`}],
    sol:[ptxt([[`${rt(a*a)} = ${a}; ${rt(b*b)} = ${b}; |${qh(c)}| = ${qh(Q(Math.abs(c[0]),c[1]))}`,.25],[`Kết quả: ${a} − ${b} + ${qh(Q(Math.abs(c[0]),c[1]))} = ${qh(v)}`,.25]]),
      ptxt([[`${fr(aa,bb)} = ${s}`,.25],[`Làm tròn đến hàng phần trăm: ${dec(roundTo(aa/bb,2),2)}`,.25]])],
    chk:()=>Math.abs(qv(v)-(a-b+Math.abs(qv(c))))<1e-12};
});
TL7('tl7-shop',1,'VD','real',r=>{
  const p=r.pick([120,150,180,200,240,300]),d=r.pick([10,15,20,25]),n=r.int(2,4),q=r.pick([Q(1,4),Q(1,5),Q(2,5),Q(3,10)]),B=r.pick([500,1000]);
  const after=p*(100-d)/100,total=after*n,left=B-total;
  if(left<=0||(left*qv(q))%1)return T.tl['tl7-shop'].gen(r);
  return{kind:'tl',title:'Bài toán thực tế',parts:[
    {pts:.5,html:`Một cửa hàng giảm giá ${d}% cho mỗi chiếc áo có giá niêm yết ${p} nghìn đồng. Bạn Lan mua ${n} chiếc áo và đưa cho người bán ${B} nghìn đồng.<br>Tính số tiền Lan phải trả.`},
    {pts:.5,html:`Lan dùng ${fr(q[0],q[1])} số tiền thừa để mua sách. Hỏi Lan còn lại bao nhiêu tiền?`}],
    sol:[ptxt([[`Giá một chiếc áo sau khi giảm: ${p}·(100% − ${d}%) = ${after} (nghìn đồng)`,.25],[`Số tiền phải trả: ${n}·${after} = ${total} (nghìn đồng)`,.25]]),
      ptxt([[`Tiền thừa: ${B} − ${total} = ${left} (nghìn đồng); tiền mua sách: ${fr(q[0],q[1])}·${left} = ${fmt(left*qv(q))} (nghìn đồng)`,.25],[`Còn lại: ${left} − ${fmt(left*qv(q))} = ${fmt(left*(1-qv(q)))} (nghìn đồng)`,.25]])],
    chk:()=>Math.abs(left*(1-qv(q))*100-Math.round(left*(1-qv(q))*100))<1e-6};
});
TL7('tl7-road',1,'VD','real',r=>{
  const L=r.pick([120,180,240,360,480,600]),a=r.pick([Q(1,3),Q(1,4),Q(2,5),Q(1,6)]),b=r.pick([Q(1,2),Q(1,3),Q(2,3),Q(3,4)]);
  const d1=L*qv(a),rest=L-d1,d2=rest*qv(b),d3=rest-d2;
  if(d2%1||d3%1)return T.tl['tl7-road'].gen(r);
  return{kind:'tl',title:'Bài toán thực tế',parts:[
    {pts:.5,html:`Một đội công nhân sửa một con đường dài ${L} m. Tuần thứ nhất đội sửa được ${fr(a[0],a[1])} con đường.<br>Tính độ dài đoạn đường còn lại sau tuần thứ nhất.`},
    {pts:.5,html:`Tuần thứ hai đội sửa được ${fr(b[0],b[1])} đoạn đường còn lại. Hỏi sau hai tuần, đội còn phải sửa bao nhiêu mét đường nữa?`}],
    sol:[ptxt([[`Tuần 1 sửa: ${fr(a[0],a[1])}·${L} = ${d1} (m)`,.25],[`Còn lại: ${L} − ${d1} = ${rest} (m)`,.25]]),
      ptxt([[`Tuần 2 sửa: ${fr(b[0],b[1])}·${rest} = ${d2} (m)`,.25],[`Còn phải sửa: ${rest} − ${d2} = ${d3} (m)`,.25]])],
    chk:()=>d1+d2+d3===L};
});
TL7('tl7-data',5,'VD','real',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,80,120,200]),cnt=pcts.map(p=>N*p/100),k=pcts.indexOf(Math.max(...pcts));
  return{kind:'tl',title:'Dữ liệu và biểu đồ',parts:[
    {pts:.5,html:`Kết quả khảo sát ${set.what} của ${N} học sinh khối 7 được cho trong bảng sau:${tableHTML(['Lựa chọn',...set.names],[['Số học sinh',...cnt]])}Dữ liệu thu được là dữ liệu định tính hay định lượng? Tính tỉ lệ phần trăm học sinh chọn mỗi loại.`},
    {pts:.5,html:`Nếu biểu diễn dữ liệu trên bằng biểu đồ hình quạt tròn thì hình quạt ứng với “${set.names[k]}” chiếm bao nhiêu phần trăm hình tròn? Lựa chọn nào được nhiều học sinh yêu thích nhất?`}],
    sol:[ptxt([[`Dữ liệu “${set.what}” là dữ liệu định tính (không phải là số).`,.25],[`Tỉ lệ: ${set.names.map((n,i)=>`${n} ${cnt[i]}/${N} = ${pcts[i]}%`).join('; ')}.`,.25]]),
      ptxt([[`Hình quạt ứng với “${set.names[k]}” chiếm ${pcts[k]}% hình tròn.`,.25],[`Lựa chọn được yêu thích nhất là “${set.names[k]}”.`,.25]])],
    chk:()=>cnt.reduce((a,b)=>a+b,0)===N&&pcts.filter(p=>p===pcts[k]).length===1};
});
TL7('tl7-par',3,'VD','geo',r=>{
  const al=r.pick([30,35,40,45,50,55,60,65,70,75,80,100,105,110,115,120,125,130,135,140,145,150]),t=r.int(0,1);
  return{kind:'tl',title:'Hai đường thẳng song song',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình vẽ, đường thẳng ${I('c')} cắt hai đường thẳng ${I('a')}, ${I('b')} lần lượt tại ${I('A')}, ${I('B')}. Biết ${t?`${ANGN('A',3)} = ${al}° và ${ANGN('B',1)} = ${al}°`:`${ANGN('A',1)} = ${al}° và ${ANGN('B',2)} = ${180-al}°`}.${parFig()}Chứng minh ${I('a')} // ${I('b')}.`},
    {pts:.5,html:`Tính số đo các góc ${ANGN('B',3)} và ${ANGN('B',4)}.`}],
    sol:[t?ptxt([[`${ANGN('A',3)} và ${ANGN('B',1)} ở vị trí so le trong`,.25],[`Mà ${ANGN('A',3)} = ${ANGN('B',1)} = ${al}° nên a // b (dấu hiệu nhận biết).`,.25]])
          :ptxt([[`${ANGN('B',1)} = 180° − ${ANGN('B',2)} = ${al}° (kề bù); ${ANGN('A',1)} và ${ANGN('B',1)} ở vị trí đồng vị`,.25],[`Mà ${ANGN('A',1)} = ${ANGN('B',1)} = ${al}° nên a // b.`,.25]]),
      ptxt([[`${ANGN('B',3)} = ${ANGN('B',1)} = ${al}° (đối đỉnh)`,.25],[`${ANGN('B',4)} = 180° − ${al}° = ${180-al}° (kề bù với ${ANGN('B',3)})`,.25]])]};
});
TL7('tl7-zig',3,'VDC','geo',r=>{
  const al=r.int(5,14)*5,be=r.int(5,14)*5;
  return{kind:'tl',title:'Hai đường thẳng song song',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho hình vẽ, biết ${I('a')} // ${I('b')}, ${ANG('xAO')} = ${al}°, ${ANG('yBO')} = ${be}°.${zigFig()}Qua ${I('O')} kẻ tia ${I('Oz')} song song với ${I('Ax')}. Chứng minh ${I('Oz')} // ${I('By')}.`},
    {pts:.5,html:`Tính số đo ${ANG('AOB')}.`}],
    sol:[ptxt([[`Oz // Ax mà Ax nằm trên a nên Oz // a.`,.25],[`a // b nên Oz // b, tức là Oz // By (tiên đề Euclid).`,.25]]),
      ptxt([[`${ANG('AOz')} = ${ANG('xAO')} = ${al}° và ${ANG('BOz')} = ${ANG('yBO')} = ${be}° (các cặp góc so le trong).`,.25],[`${ANG('AOB')} = ${ANG('AOz')} + ${ANG('BOz')} = ${al+be}°.`,.25]])]};
});
TL7('tl7-dd',3,'TH','geo',r=>{
  const al=r.int(5,30)*4;
  return{kind:'tl',title:'Góc',note:GEO_NOTE,parts:[
    {pts:.5,html:`Hai đường thẳng ${I("xx'")} và ${I("yy'")} cắt nhau tại ${I('O')} sao cho ${ANG('xOy')} = ${al}°.<br>Tính số đo các góc ${ANG("x'Oy'")} và ${ANG("xOy'")}.`},
    {pts:.5,html:`Vẽ tia ${I('Ot')} là tia phân giác của ${ANG('xOy')}. Tính số đo ${ANG("tOx'")}.`}],
    sol:[ptxt([[`${ANG("x'Oy'")} = ${ANG('xOy')} = ${al}° (đối đỉnh)`,.25],[`${ANG("xOy'")} = 180° − ${al}° = ${180-al}° (kề bù)`,.25]]),
      ptxt([[`${ANG('xOt')} = ${al}° : 2 = ${al/2}°`,.25],[`${ANG("tOx'")} = 180° − ${al/2}° = ${180-al/2}° (kề bù)`,.25]])]};
});
TL7('tl7-cong1',4,'VD','geo',r=>{
  const N=r.pick(['ABC','DEF','MNP']),[A,B,C]=N,M=r.pick(['M','H','I'].filter(x=>!N.includes(x)));
  return{kind:'tl',title:'Tam giác bằng nhau',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I(N)} cân tại ${I(A)}. Gọi ${I(M)} là trung điểm của ${I(B+C)}.<br>Chứng minh ${I('Δ'+A+B+M)} = ${I('Δ'+A+C+M)}.`},
    {pts:.5,html:`Chứng minh ${I(A+M)} vuông góc với ${I(B+C)}.`}],
    sol:[ptxt([[`Xét ${A}${B}${M} và ${A}${C}${M}: ${A}${B} = ${A}${C} (tam giác cân), ${M}${B} = ${M}${C} (${M} là trung điểm), ${A}${M} là cạnh chung`,.25],[`Do đó Δ${A}${B}${M} = Δ${A}${C}${M} (c.c.c)`,.25]]),
      ptxt([[`Suy ra ${ANG(A+M+B)} = ${ANG(A+M+C)} (hai góc tương ứng), mà hai góc này kề bù nên tổng bằng 180°`,.25],[`Vậy ${ANG(A+M+B)} = ${ANG(A+M+C)} = 90°, tức là ${A}${M} ⊥ ${B}${C}.`,.25]])]};
});
TL7('tl7-cong2',4,'VDC','geo',r=>{
  const [A,B,M]=r.pick([['A','B','M'],['M','N','K'],['E','F','H']]);
  return{kind:'tl',title:'Tam giác bằng nhau',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho góc nhọn ${ANG('xOy')} có ${I('Ot')} là tia phân giác. Lấy điểm ${I(A)} trên tia ${I('Ox')}, điểm ${I(B)} trên tia ${I('Oy')} sao cho ${I('O'+A)} = ${I('O'+B)}; lấy điểm ${I(M)} trên tia ${I('Ot')} (${I(M)} khác ${I('O')}).<br>Chứng minh ${I('ΔO'+A+M)} = ${I('ΔO'+B+M)}.`},
    {pts:.5,html:`Gọi ${I('I')} là giao điểm của ${I(A+B)} và ${I('Ot')}. Chứng minh ${I('I')} là trung điểm của ${I(A+B)} và ${I(A+B)} ⊥ ${I('Ot')}.`}],
    sol:[ptxt([[`Xét ΔO${A}${M} và ΔO${B}${M}: O${A} = O${B}, ${ANG(A+'O'+M)} = ${ANG(B+'O'+M)} (Ot là phân giác), O${M} chung`,.25],[`Do đó ΔO${A}${M} = ΔO${B}${M} (c.g.c)`,.25]]),
      ptxt([[`Tương tự, ΔO${A}I = ΔO${B}I (c.g.c) nên I${A} = I${B} và ${ANG('OI'+A)} = ${ANG('OI'+B)}`,.25],[`Hai góc ${ANG('OI'+A)}, ${ANG('OI'+B)} kề bù và bằng nhau nên bằng 90°. Vậy I là trung điểm ${A}${B} và ${A}${B} ⊥ Ot.`,.25]])]};
});
TL7('tl7-cong3',4,'VD','geo',r=>{
  const [A,B,C]=r.pick(['ABC','DEF','HIK']),M=r.pick(['M','N']),D=r.pick(['D','E','P'].filter(x=>![A,B,C].includes(x)));
  return{kind:'tl',title:'Tam giác bằng nhau',note:GEO_NOTE,parts:[
    {pts:.5,html:`Cho tam giác ${I(A+B+C)}, ${I(M)} là trung điểm của ${I(B+C)}. Trên tia đối của tia ${I(M+A)} lấy điểm ${I(D)} sao cho ${I(M+D)} = ${I(M+A)}.<br>Chứng minh ${I('Δ'+A+M+B)} = ${I('Δ'+D+M+C)}.`},
    {pts:.5,html:`Chứng minh ${I(A+B)} // ${I(C+D)}.`}],
    sol:[ptxt([[`Xét Δ${A}${M}${B} và Δ${D}${M}${C}: ${M}${A} = ${M}${D}, ${M}${B} = ${M}${C}, ${ANG(A+M+B)} = ${ANG(D+M+C)} (đối đỉnh)`,.25],[`Do đó Δ${A}${M}${B} = Δ${D}${M}${C} (c.g.c)`,.25]]),
      ptxt([[`Suy ra ${ANG(M+A+B)} = ${ANG(M+D+C)} (hai góc tương ứng)`,.25],[`Hai góc này ở vị trí so le trong nên ${A}${B} // ${C}${D}.`,.25]])]};
});
TLN7('t7-5-total',5,'VD',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,80,120,200,400]),k=r.int(0,3),items=set.names.map((n,i)=>({name:n,pct:pcts[i]}));
  return{kind:'tln',stem:`Biểu đồ hình quạt tròn dưới đây biểu diễn kết quả khảo sát ${set.what} của học sinh khối 7 một trường.<div class="figure">${pieSVG(items)}</div>Biết có ${N*pcts[k]/100} học sinh chọn “${set.names[k]}”. Hỏi khối 7 có bao nhiêu học sinh tham gia khảo sát?`,ans:N,unit:'',
    sol:`${N*pcts[k]/100} học sinh ứng với ${pcts[k]}% nên tổng số học sinh là ${N*pcts[k]/100} : ${pcts[k]}% = ${N}.`};
});
