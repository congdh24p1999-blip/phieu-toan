/*CORE-START*/
'use strict';
/* ================= Tiện ích chung ================= */
function hashStr(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}return h>>>0}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
class RNG{
  constructor(seed){this.f=mulberry32(hashStr(String(seed)))}
  int(a,b){return a+Math.floor(this.f()*(b-a+1))}
  pick(a){return a[this.int(0,a.length-1)]}
  chance(p){return this.f()<p}
  sign(){return this.chance(.5)?1:-1}
  nz(a,b){let v=0;while(v===0)v=this.int(a,b);return v}
  shuffle(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=this.int(0,i);[b[i],b[j]]=[b[j],b[i]]}return b}
}
const MINUS='−';
/* Toán tử cộng/trừ kèm giá trị: pm('−3') → '+ 3', pm('4') → '− 4' (dùng khi viết “… − (giá trị có thể âm)”). */
const pm=h=>String(h).startsWith('−')?`+ ${String(h).slice(1)}`:`− ${h}`;
function sg(n){return n<0?MINUS+Math.abs(n):String(n)}
function fmt(n){
  if(Number.isInteger(n))return sg(n);
  const t=Math.round(n*100)/100;
  return sg(t).replace('.',',');
}
const I=s=>`<i>${s}</i>`;
const sup=s=>`<sup>${s}</sup>`;
const fr=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const strip=h=>h.replace(/<[^>]+>/g,'');
const pt=x=>String(x).replace('.',',')+' đ';
const stepsHTML=arr=>'<ul class="st">'+arr.map(([t,p])=>`<li>${t}${p?` <b class="pt">(${pt(p)})</b>`:''}</li>`).join('')+'</ul>';
const ang=(n)=>`${n}°`;

/* ================= Đa thức hai biến x, y ================= */
const Pl={
  C:c=>c?{'0,0':c}:{},
  m:(c,ex,ey)=>c?{[ex+','+(ey||0)]:c}:{},
  add(a,b){const r={...a};for(const k in b){const v=(r[k]||0)+b[k];if(v)r[k]=v;else delete r[k]}return r},
  neg(a){const r={};for(const k in a)r[k]=-a[k];return r},
  sub(a,b){return Pl.add(a,Pl.neg(b))},
  mul(a,b){let r={};for(const ka in a){const [ax,ay]=ka.split(',').map(Number);for(const kb in b){const [bx,by]=kb.split(',').map(Number);r=Pl.add(r,{[(ax+bx)+','+(ay+by)]:a[ka]*b[kb]})}}return r},
  pow(a,n){let r=Pl.C(1);for(let i=0;i<n;i++)r=Pl.mul(r,a);return r},
  sc:(a,c)=>Pl.mul(a,Pl.C(c)),
  ev(a,x,y){let s=0;for(const k in a){const [i,j]=k.split(',').map(Number);s+=a[k]*Math.pow(x,i)*Math.pow(y,j)}return s},
  isZero(a){for(const k in a)return false;return true},
  eq(a,b){return Pl.isZero(Pl.sub(a,b))},
  from(list){let r={};list.forEach(m=>{r=Pl.add(r,Pl.m(m.c,m.ex,m.ey))});return r}
};
function termsOf(p){return Object.keys(p).map(k=>{const [ex,ey]=k.split(',').map(Number);return{c:p[k],ex,ey}}).sort((a,b)=>(b.ex+b.ey)-(a.ex+a.ey)||b.ex-a.ex)}
function monoHTML(ex,ey){let s='';if(ex)s+=I('x')+(ex>1?sup(ex):'');if(ey)s+=I('y')+(ey>1?sup(ey):'');return s}
function termsHTML(list){
  if(!list.length)return '0';
  let out='';
  list.forEach((m,i)=>{
    const a=Math.abs(m.c),mh=monoHTML(m.ex,m.ey);
    const body=mh===''?String(a):(a===1?'':String(a))+mh;
    if(i===0)out+=(m.c<0?MINUS:'')+body;
    else out+=(m.c<0?' '+MINUS+' ':' + ')+body;
  });
  return out;
}
const ph=p=>termsHTML(termsOf(p));
const par=p=>'('+ph(p)+')';
const lin=(a,b)=>Pl.add(Pl.m(a,1,0),Pl.C(b));
function mutants(r,p){
  const t=termsOf(p),out=[];
  const add=l=>{const q=Pl.from(l);if(!Pl.isZero(q)&&!Pl.eq(q,p)&&!out.some(o=>Pl.eq(o,q)))out.push(q)};
  const cp=()=>t.map(z=>({...z}));
  t.forEach((m,i)=>{
    let l=cp();l[i].c=-l[i].c;add(l);
    l=cp();l[i].c+=l[i].c>0?1:-1;add(l);
    l=cp();l[i].c*=2;add(l);
    if(t.length>1){l=cp();l.splice(i,1);add(l)}
    l=cp();l[i].ex+=1;add(l);
    if(m.ex>0){l=cp();l[i].ex-=1;add(l)}
  });
  return r.shuffle(out);
}

/* ================= Dựng câu trắc nghiệm ================= */
function mkPoly(r,o){
  const wr=[];
  const tryAdd=w=>{if(Pl.isZero(w)||Pl.eq(w,o.correct)||wr.some(z=>Pl.eq(z,w)))return;wr.push(w)};
  for(const w of o.wrongs){tryAdd(w);if(wr.length===3)break}
  if(wr.length<3)for(const w of mutants(r,o.correct)){tryAdd(w);if(wr.length===3)break}
  if(wr.length<3)throw new Error('thiếu phương án nhiễu: '+o.stem);
  const all=r.shuffle([{h:ph(o.correct),ok:1},...wr.map(w=>({h:ph(w),ok:0}))]);
  return{kind:'nlc',stem:o.stem,opts:all.map(z=>z.h),ans:all.findIndex(z=>z.ok),sol:o.sol,chk:o.chk};
}
function mkTxt(r,o){
  const seen=new Set([o.correct]),wr=[];
  for(const w of o.wrongs){if(!seen.has(w)){seen.add(w);wr.push(w)}if(wr.length===3)break}
  if(wr.length<3)throw new Error('thiếu phương án nhiễu: '+o.stem);
  const all=r.shuffle([{h:o.correct,ok:1},...wr.map(w=>({h:w,ok:0}))]);
  return{kind:'nlc',stem:o.stem,opts:all.map(z=>z.h),ans:all.findIndex(z=>z.ok),sol:o.sol,chk:o.chk};
}
function mkNum(r,o){
  const f=o.f||fmt,okf=o.ok||(c=>c>0),seen=new Set([o.correct]),wr=[];
  for(const c of r.shuffle(o.cands||[])){
    if(Number.isFinite(c)&&!seen.has(c)&&okf(c)){seen.add(c);wr.push(c)}
    if(wr.length===3)break;
  }
  for(let k=1;wr.length<3&&k<50;k++){
    for(const d of [k,-k]){
      const c=o.correct+d*(o.step||1);
      if(!seen.has(c)&&okf(c)&&wr.length<3){seen.add(c);wr.push(c)}
    }
  }
  if(wr.length<3)throw new Error('thiếu phương án nhiễu số: '+o.stem);
  const all=[o.correct,...wr].sort((a,b)=>a-b);
  return{kind:'nlc',stem:o.stem,opts:all.map(f),ans:all.indexOf(o.correct),fixed:true,sol:o.sol,chk:o.chk};
}

/* Phương án dạng tích nhân tử: mỗi phương án đi kèm đa thức khai triển, tự loại phương án nhiễu trùng đáp án. */
function mkFac(r,o){
  const wr=o.wrongs.filter(w=>!Pl.eq(w[1],o.target));
  if(!Pl.eq(o.correct[1],o.target))throw new Error('đáp án nhân tử sai: '+o.stem);
  const seen=new Set([o.correct[0]]),pick=[];
  for(const w of wr){if(!seen.has(w[0])){seen.add(w[0]);pick.push(w[0])}if(pick.length===3)break}
  if(pick.length<3)throw new Error('thiếu phương án nhân tử: '+o.stem);
  const all=r.shuffle([{h:o.correct[0],ok:1},...pick.map(h=>({h,ok:0}))]);
  return{kind:'nlc',stem:o.stem,opts:all.map(z=>z.h),ans:all.findIndex(z=>z.ok),sol:o.sol};
}

/* ================= Biểu đồ SVG (in đen trắng vẫn đọc được) ================= */
function niceStep(max){return [1,2,5,10,20,25,50,100].find(s=>max/s<=5)||200}
function barSVG(cats,vals,o={}){
  const W=o.w||320,H=o.h||175,ml=34,mb=26,mt=16,mr=8;
  const step=niceStep(Math.max(...vals)),top=Math.ceil(Math.max(...vals)/step)*step+(Math.max(...vals)%step===0?step:0);
  const pw=W-ml-mr,ph_=H-mt-mb,bw=pw/cats.length*0.56;
  let s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Biểu đồ cột">`;
  for(let v=0;v<=top;v+=step){
    const y=mt+ph_-ph_*v/top;
    s+=`<line x1="${ml}" y1="${y}" x2="${W-mr}" y2="${y}" stroke="#bbb" stroke-width="0.6"/><text x="${ml-5}" y="${y+3.5}" font-size="9" text-anchor="end">${v}</text>`;
  }
  s+=`<line x1="${ml}" y1="${mt}" x2="${ml}" y2="${mt+ph_}" stroke="#000" stroke-width="1"/><line x1="${ml}" y1="${mt+ph_}" x2="${W-mr}" y2="${mt+ph_}" stroke="#000" stroke-width="1"/>`;
  cats.forEach((c,i)=>{
    const cx=ml+pw/cats.length*(i+.5),h=ph_*vals[i]/top,y=mt+ph_-h;
    s+=`<rect x="${cx-bw/2}" y="${y}" width="${bw}" height="${h}" fill="#777" stroke="#000" stroke-width="0.8"/>`;
    s+=`<text x="${cx}" y="${y-3}" font-size="9.5" text-anchor="middle" font-weight="bold">${vals[i]}</text>`;
    s+=`<text x="${cx}" y="${mt+ph_+13}" font-size="9.5" text-anchor="middle">${c}</text>`;
  });
  if(o.unit)s+=`<text x="${ml}" y="9" font-size="9" font-style="italic">${o.unit}</text>`;
  return s+'</svg>';
}
const SHADES=['#2b2b2b','#808080','#b5b5b5','#e6e6e6'];
function pieSVG(items){
  const W=320,H=140,cx=70,cy=70,R=60;
  let a0=-Math.PI/2,s=`<svg class="chart" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Biểu đồ hình quạt tròn">`;
  items.forEach((it,i)=>{
    const a1=a0+2*Math.PI*it.pct/100,large=it.pct>50?1:0;
    const x0=cx+R*Math.cos(a0),y0=cy+R*Math.sin(a0),x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);
    s+=`<path d="M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${R},${R} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z" fill="${SHADES[i%4]}" stroke="#000" stroke-width="0.9"/>`;
    a0=a1;
  });
  items.forEach((it,i)=>{
    const y=34+i*22;
    s+=`<rect x="150" y="${y-10}" width="14" height="14" fill="${SHADES[i%4]}" stroke="#000" stroke-width="0.9"/><text x="172" y="${y+1.5}" font-size="11">${it.name}: ${it.pct}%</text>`;
  });
  return s+'</svg>';
}
function tableHTML(head,rows){
  return `<table class="dt"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

/* ================= Bộ tạo ngẫu nhiên dùng chung ================= */
const TRI=[[3,4,5],[6,8,10],[9,12,15],[12,16,20],[15,20,25],[5,12,13],[10,24,26],[8,15,17],[7,24,25]];
function tri(r,even){const l=TRI.filter(t=>!even||t[2]%2===0),t=r.pick(l);return r.chance(.5)?[t[0],t[1],t[2]]:[t[1],t[0],t[2]]}
function thalesP(r){
  const [m,n]=r.pick([[1,2],[2,3],[1,3],[3,2],[2,1],[3,1],[3,4],[2,5],[4,3]]);
  return{m,n,rr:r.int(1,4),s:r.int(1,4),u:r.int(2,5)};
}
function pctSet(r){
  for(;;){
    const a=r.pick([10,15,20,25,30,35,40]),b=r.pick([10,15,20,25,30,35,40]),c=r.pick([10,15,20,25,30,35,40]),d=100-a-b-c;
    if(d>=10&&d<=45&&d%5===0&&new Set([a,b,c,d]).size===4)return[a,b,c,d];
  }
}
const CAT_SETS=[
  {what:'câu lạc bộ yêu thích',names:['Bóng đá','Cờ vua','Văn nghệ','Cầu lông']},
  {what:'môn học yêu thích',names:['Toán','Ngữ văn','Tiếng Anh','KHTN']},
  {what:'phương tiện đến trường',names:['Đi bộ','Xe đạp','Xe buýt','Xe máy']},
  {what:'hoạt động ngoại khóa yêu thích',names:['Đọc sách','Vẽ','Âm nhạc','Thể thao']}
];
function distinctInts(r,n,lo,hi){const s=new Set();while(s.size<n)s.add(r.int(lo,hi));return r.shuffle([...s])}

/* ================= Đăng ký mẫu câu ================= */
const T={nlc:{},ds:{},tln:{},tl:{}};
/* Đổi dấu gạch nối "-" đứng trước chữ số thành dấu trừ "−" trong phần chữ hiển thị (giữ nguyên thẻ HTML và hình SVG) */
const fixMinus=s=>s.indexOf('-')<0?s:s.split(/(<svg[\s\S]*?<\/svg>|<[^>]*>)/).map((p,i)=>i%2?p:p.replace(/(^|[^\w.\-−&;])-(?=\d)/g,'$1−')).join('');
const deepFixMinus=o=>{if(typeof o==='string')return fixMinus(o);if(Array.isArray(o))return o.map(deepFixMinus);if(o&&typeof o==='object'&&Object.getPrototypeOf(o)===Object.prototype){for(const k in o)if(typeof o[k]!=='function')o[k]=deepFixMinus(o[k]);}return o};
function reg(kind,id,ch,lv,gen,extra){T[kind][id]=Object.assign({id,ch,lv,gen:r=>deepFixMinus(gen(r)),grp:id},extra||{})}
const NLC=(id,ch,lv,gen,grp)=>reg('nlc',id,ch,lv,gen,grp?{grp}:null);

/* ---------- Chương I: Đa thức nhiều biến ---------- */
NLC('c1-deg',1,'NB',r=>{
  const pool=[];for(let i=0;i<=3;i++)for(let j=0;j<=3;j++)if(i+j>=1)pool.push([i,j]);
  const ms=r.shuffle(pool).slice(0,3).map(([ex,ey])=>({c:r.pick([-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8]),ex,ey}));
  const deg=Math.max(...ms.map(m=>m.ex+m.ey));
  return mkNum(r,{
    stem:`Bậc của đa thức ${I('P')} = ${termsHTML(ms)} là`,correct:deg,
    cands:[deg+1,deg-1,deg+2,ms[0].ex+ms[0].ey,3,Math.max(...ms.map(m=>Math.max(m.ex,m.ey)))],
    sol:`Bậc của đa thức là bậc lớn nhất trong các hạng tử: ${ms.map(m=>m.ex+m.ey).join('; ')} ⟹ bậc ${deg}.`,
    chk:()=>deg===Math.max(...ms.map(m=>m.ex+m.ey))
  });
});
NLC('c1-coef',1,'NB',r=>{
  const c=r.pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]),ex=r.int(1,3),ey=r.int(1,3),d=ex+ey;
  const f=(a,b)=>`${sg(a)} và ${b}`;
  return mkTxt(r,{
    stem:`Đơn thức ${termsHTML([{c,ex,ey}])} có hệ số và bậc lần lượt là`,correct:f(c,d),
    wrongs:[f(-c,d),f(c,d+1),f(c,Math.max(ex,ey)),f(c,ex*ey),f(-c,d-1)],
    sol:`Hệ số là ${sg(c)}; bậc là tổng số mũ của các biến: ${ex} + ${ey} = ${d}.`
  });
});
NLC('c1-eval',1,'TH',r=>{
  const pool=[[2,1],[1,1],[1,0],[0,1],[2,0],[0,2],[1,2],[3,0]];
  const ms=r.shuffle(pool).slice(0,3).map(([ex,ey])=>({c:r.pick([-5,-4,-3,-2,-1,1,2,3,4,5]),ex,ey}));
  const x=r.pick([-3,-2,-1,1,2,3]),y=r.pick([-3,-2,-1,1,2,3]);
  const val=ms.reduce((s,m)=>s+m.c*Math.pow(x,m.ex)*Math.pow(y,m.ey),0);
  const abs=ms.reduce((s,m)=>s+m.c*Math.pow(Math.abs(x),m.ex)*Math.pow(Math.abs(y),m.ey),0);
  const p=Pl.from(ms);
  return mkNum(r,{
    stem:`Giá trị của biểu thức ${I('A')} = ${ph(p)} tại ${I('x')} = ${sg(x)}, ${I('y')} = ${sg(y)} là`,correct:val,
    cands:[val+1,val-1,val+2,val-2,-val,abs,val+ms[0].c],ok:()=>true,
    sol:`Thay ${I('x')} = ${sg(x)}, ${I('y')} = ${sg(y)} vào ${I('A')} ta được ${I('A')} = ${sg(val)}.`,
    chk:()=>Pl.ev(p,x,y)===val
  });
});
NLC('c1-addsub',1,'TH',r=>{
  for(;;){
    const two=r.chance(.4),shapes=two?[[2,0],[1,1],[0,2]]:[[2,0],[1,0],[0,0]];
    const mk=()=>Pl.from(shapes.map(([ex,ey])=>({c:r.nz(-6,6),ex,ey})));
    const P=mk(),Q=mk(),minus=r.chance(.55),C=minus?Pl.sub(P,Q):Pl.add(P,Q);
    if(Pl.isZero(C))continue;
    const first=Pl.from([termsOf(Q)[0]]);
    const w=[minus?Pl.add(P,Q):Pl.sub(P,Q)];
    if(minus)w.push(Pl.add(Pl.sub(P,first),Pl.sub(Q,first)));
    return mkPoly(r,{
      stem:`Kết quả của phép tính ${par(P)} ${minus?MINUS:'+'} ${par(Q)} là`,correct:C,wrongs:w.concat(mutants(r,C)),
      sol:`Bỏ ngoặc${minus?' (đổi dấu mọi hạng tử trong ngoặc thứ hai)':''}, nhóm các hạng tử đồng dạng: ${ph(C)}.`,
      chk:()=>[[1,2],[2,-1],[-3,4]].every(([x,y])=>Pl.ev(C,x,y)===(minus?Pl.ev(P,x,y)-Pl.ev(Q,x,y):Pl.ev(P,x,y)+Pl.ev(Q,x,y)))
    });
  }
});
NLC('c1-mulmono',1,'TH',r=>{
  const shapes=r.shuffle([[2,0],[1,0],[0,0],[0,1],[1,1],[0,2]]).slice(0,3);
  const P=Pl.from(shapes.map(([ex,ey])=>({c:r.nz(-4,4),ex,ey})));
  const m={c:r.pick([2,3,-2,-3,4,5]),ex:r.int(1,2),ey:r.int(0,1)},M=Pl.from([m]);
  const C=Pl.mul(M,P),t=termsOf(P);
  const partial=Pl.add(Pl.mul(M,Pl.from(t.slice(0,-1))),Pl.from(t.slice(-1)));
  return mkPoly(r,{
    stem:`Kết quả của phép nhân ${termsHTML([m])}${par(P)} là`,correct:C,wrongs:[partial].concat(mutants(r,C)),
    sol:`Nhân đơn thức với từng hạng tử của đa thức: ${ph(C)}.`,
    chk:()=>[[1,2],[2,3],[-1,2]].every(([x,y])=>Pl.ev(C,x,y)===Pl.ev(M,x,y)*Pl.ev(P,x,y))
  });
});
NLC('c1-divmono',1,'TH',r=>{
  const shapes=r.shuffle([[2,0],[1,0],[0,0],[0,1],[1,1],[0,2]]).slice(0,r.pick([2,3]));
  const Q=Pl.from(shapes.map(([ex,ey])=>({c:r.nz(-4,4),ex,ey})));
  const m={c:r.pick([2,3,-2,-3,4,5,6]),ex:r.int(1,2),ey:r.int(0,2)},M=Pl.from([m]),P=Pl.mul(Q,M);
  return mkPoly(r,{
    stem:`Kết quả của phép chia ${par(P)} : ${termsHTML([m])} là`,correct:Q,wrongs:mutants(r,Q),
    sol:`Chia từng hạng tử của đa thức cho đơn thức: ${ph(Q)}.`,
    chk:()=>Pl.eq(Pl.mul(Q,M),P)
  });
});
NLC('c1-mulpoly',1,'TH',r=>{
  let A,B,L;
  if(r.chance(.5)){A=lin(r.pick([1,2,3]),r.nz(-5,5));B=lin(r.pick([1,2,3]),r.nz(-5,5))}
  else{A=lin(1,r.nz(-4,4));B=Pl.from([{c:1,ex:2,ey:0},{c:r.nz(-4,4),ex:1,ey:0},{c:r.nz(-4,4),ex:0,ey:0}])}
  const C=Pl.mul(A,B);
  return mkPoly(r,{
    stem:`Kết quả của phép nhân ${par(A)}${par(B)} là`,correct:C,wrongs:mutants(r,C),
    sol:`Nhân từng hạng tử của đa thức này với đa thức kia rồi thu gọn: ${ph(C)}.`,
    chk:()=>[0,1,2,-3].every(x=>Pl.ev(C,x,0)===Pl.ev(A,x,0)*Pl.ev(B,x,0))
  });
});
NLC('c1-like',1,'NB',r=>{
  const bx=r.int(1,3),by=r.int(0,2),base={c:r.nz(-6,6),ex:bx,ey:by};
  const near=[];for(let i=0;i<=3;i++)for(let j=0;j<=3;j++)if((i||j)&&!(i===bx&&j===by)&&Math.abs(i-bx)+Math.abs(j-by)<=2)near.push([i,j]);
  const ws=r.shuffle(near).slice(0,3).map(([i,j])=>termsHTML([{c:r.nz(-6,6),ex:i,ey:j}]));
  let gc=r.nz(-6,6);while(gc===base.c)gc=r.nz(-6,6);
  return mkTxt(r,{
    stem:`Đơn thức nào sau đây đồng dạng với đơn thức ${termsHTML([base])}?`,correct:termsHTML([{c:gc,ex:bx,ey:by}]),wrongs:ws,
    sol:`Hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến: ${monoHTML(bx,by)}.`
  });
});
NLC('c1-divisible',1,'NB',r=>{
  const bx=r.int(1,2),by=r.int(1,2),B={c:r.nz(-5,5),ex:bx,ey:by};
  const good=[],bad=[];
  for(let i=0;i<=3;i++)for(let j=0;j<=3;j++){
    if(i>=bx&&j>=by&&(i>bx||j>by))good.push([i,j]);
    else if((i<bx||j<by)&&(i||j))bad.push([i,j]);
  }
  const g=r.pick(good),ws=r.shuffle(bad).slice(0,3);
  const okDiv=([i,j])=>i>=bx&&j>=by;
  const f=([i,j])=>termsHTML([{c:r.nz(-6,6),ex:i,ey:j}]);
  return mkTxt(r,{
    stem:`Đơn thức nào sau đây chia hết cho đơn thức ${termsHTML([B])}?`,correct:f(g),wrongs:ws.map(f),
    chk:()=>okDiv(g)&&ws.every(w=>!okDiv(w)),
    sol:`Đơn thức A chia hết cho B khi mỗi biến của B đều có trong A với số mũ không nhỏ hơn số mũ trong B (B có ${monoHTML(bx,by)}).`
  });
});

/* ---------- Chương II: Hằng đẳng thức đáng nhớ ---------- */
NLC('c2-square',2,'NB',r=>{
  const two=r.chance(.35),a=r.pick([1,1,2,3]),b=r.int(1,6),s=r.sign();
  const A=Pl.m(a,1,0),B=two?Pl.m(b,0,1):Pl.C(b),E=Pl.add(A,Pl.sc(B,s)),sq=Pl.mul(E,E);
  const A2=Pl.mul(A,A),B2=Pl.mul(B,B),AB=Pl.mul(A,B),mid=Pl.sc(AB,2*s);
  const w=[Pl.add(A2,B2),Pl.add(Pl.sub(A2,mid),B2),Pl.add(Pl.add(A2,Pl.sc(AB,s)),B2),Pl.sub(Pl.add(A2,mid),B2)];
  return mkPoly(r,{
    stem:`Khai triển hằng đẳng thức ${par(E)}${sup(2)} ta được`,correct:sq,wrongs:w,
    sol:`${s>0?'(A + B)':'(A − B)'}² = A² ${s>0?'+':MINUS} 2AB + B² với A = ${ph(A)}, B = ${ph(B)}: ${ph(sq)}.`,
    chk:()=>[[1,2],[-2,3],[3,1]].every(([x,y])=>Pl.ev(sq,x,y)===Math.pow(Pl.ev(E,x,y),2))
  });
});
NLC('c2-diffsq',2,'NB',r=>{
  const two=r.chance(.35),a=r.pick([1,2,3]),b=r.int(1,6);
  const A=Pl.m(a,1,0),B=two?Pl.m(b,0,1):Pl.C(b),A2=Pl.mul(A,A),B2=Pl.mul(B,B),AB=Pl.mul(A,B);
  const D=Pl.sub(A2,B2);
  if(r.chance(.5)){
    return mkPoly(r,{
      stem:`Khai triển ${par(Pl.sub(A,B))}${par(Pl.add(A,B))} ta được`,correct:D,
      wrongs:[Pl.add(A2,B2),Pl.add(Pl.sub(A2,Pl.sc(AB,2)),B2),Pl.add(Pl.add(A2,Pl.sc(AB,2)),B2),Pl.sub(A2,Pl.sc(B2,2))],
      sol:`(A − B)(A + B) = A² − B² = ${ph(D)}.`,
      chk:()=>[[1,2],[-2,3]].every(([x,y])=>Pl.ev(D,x,y)===Pl.ev(Pl.sub(A,B),x,y)*Pl.ev(Pl.add(A,B),x,y))
    });
  }
  const Am=Pl.sub(A,B),Ap=Pl.add(A,B);
  return mkFac(r,{
    stem:`Phân tích đa thức ${ph(D)} thành nhân tử ta được`,target:D,
    correct:[`${par(Am)}${par(Ap)}`,Pl.mul(Am,Ap)],
    wrongs:[[`${par(Am)}${sup(2)}`,Pl.mul(Am,Am)],[`${par(Ap)}${sup(2)}`,Pl.mul(Ap,Ap)],[`${par(Am)}${par(Pl.add(A2,B2))}`,Pl.mul(Am,Pl.add(A2,B2))]],
    sol:`A² − B² = (A − B)(A + B) với A = ${ph(A)}, B = ${ph(B)}.`
  });
});
NLC('c2-cubes',2,'TH',r=>{
  const a=r.pick([1,1,2]),b=r.int(1,4),s=r.sign();
  const A=Pl.m(a,1,0),B=Pl.C(b),AB=Pl.mul(A,B),A2=Pl.mul(A,A),B2=Pl.mul(B,B);
  const A3=Pl.pow(A,3),B3=Pl.pow(B,3),S=Pl.add(A,Pl.sc(B,s)),Q=Pl.add(Pl.sub(A2,Pl.sc(AB,s)),B2),Q2=Pl.add(Pl.add(A2,Pl.sc(AB,s)),B2);
  const R=Pl.add(A3,Pl.sc(B3,s));
  if(r.chance(.5)){
    return mkPoly(r,{
      stem:`Rút gọn biểu thức ${par(S)}${par(Q)} ta được`,correct:R,
      wrongs:[Pl.sub(A3,Pl.sc(B3,s)),Pl.pow(S,3),Pl.pow(Pl.sub(A,Pl.sc(B,s)),3)],
      sol:`${s>0?'(A + B)(A² − AB + B²) = A³ + B³':'(A − B)(A² + AB + B²) = A³ − B³'} với A = ${ph(A)}, B = ${ph(B)}: ${ph(R)}.`,
      chk:()=>[[1,0],[-2,0],[3,0]].every(([x,y])=>Pl.ev(R,x,y)===Pl.ev(S,x,y)*Pl.ev(Q,x,y))
    });
  }
  const Sb=Pl.sub(A,Pl.sc(B,s));
  return mkFac(r,{
    stem:`Phân tích đa thức ${ph(R)} thành nhân tử ta được`,target:R,
    correct:[`${par(S)}${par(Q)}`,Pl.mul(S,Q)],
    wrongs:[[`${par(S)}${sup(3)}`,Pl.pow(S,3)],[`${par(S)}${par(Q2)}`,Pl.mul(S,Q2)],[`${par(Sb)}${par(Q)}`,Pl.mul(Sb,Q)]],
    sol:`${s>0?'A³ + B³ = (A + B)(A² − AB + B²)':'A³ − B³ = (A − B)(A² + AB + B²)'} với A = ${ph(A)}, B = ${ph(B)}.`
  });
});
NLC('c2-factor',2,'TH',r=>{
  const a=r.pick([1,2,3]),b=r.int(1,6),s=r.sign();
  const A=Pl.m(a,1,0),B=Pl.C(b),E=Pl.add(A,Pl.sc(B,s)),E2=Pl.mul(E,E),Ebar=Pl.sub(A,Pl.sc(B,s));
  const op=s>0?'+':MINUS;
  const Q=Pl.add(Pl.mul(A,A),Pl.C(s*b));
  return mkFac(r,{
    stem:`Phân tích đa thức ${ph(E2)} thành nhân tử ta được`,target:E2,
    correct:[`${par(E)}${sup(2)}`,Pl.mul(E,E)],
    wrongs:[[`${par(Ebar)}${sup(2)}`,Pl.mul(Ebar,Ebar)],[`${par(E)}${par(Ebar)}`,Pl.mul(E,Ebar)],[`(${ph(Pl.mul(A,A))} ${op} ${b})${sup(2)}`,Pl.mul(Q,Q)]],
    sol:`A² ${op} 2AB + B² = (A ${op} B)² với A = ${ph(A)}, B = ${b}, nên ${ph(E2)} = ${par(E)}².`
  });
});
NLC('c2-fill',2,'NB',r=>{
  const a=r.pick([1,1,2,3]),b=r.int(1,6),s=r.sign();
  const A=Pl.m(a,1,0),B=Pl.C(b),E=Pl.add(A,Pl.sc(B,s)),lhs=Pl.add(Pl.mul(A,A),Pl.sc(Pl.mul(A,B),2*s));
  return mkNum(r,{
    stem:`Biểu thức thích hợp điền vào chỗ trống: ${ph(lhs)} + … = ${par(E)}${sup(2)}`,correct:b*b,
    cands:[b,2*b,2*a*b,a*b,b*b+b,b*b-1],
    sol:`(A ${s>0?'+':MINUS} B)² = A² ${s>0?'+':MINUS} 2AB + B², nên chỗ trống là B² = ${b}² = ${b*b}.`,
    chk:()=>Pl.eq(Pl.add(lhs,Pl.C(b*b)),Pl.mul(E,E))
  });
});
NLC('c2-quick',2,'TH',r=>{
  if(r.chance(.5)){
    const s=r.sign(),k=r.int(2,6),n=100+s*k,ans=n*n;
    return mkNum(r,{
      stem:`Giá trị của ${n}${sup(2)} là`,correct:ans,
      cands:[10000+k*k,10000-s*200*k+k*k,10000+s*200*k-k*k,10000+s*100*k,ans+100],
      sol:`${n}² = (100 ${s>0?'+':MINUS} ${k})² = 100² ${s>0?'+':MINUS} 2·100·${k} + ${k}² = ${ans}.`,
      chk:()=>ans===n*n
    });
  }
  const sum=r.pick([100,100,50,200]),d=r.int(2,Math.min(30,sum/2-5)),x=(sum+d)/2,y=(sum-d)/2;
  if(!Number.isInteger(x))return T.nlc['c2-quick'].gen(r);
  const ans=(x-y)*(x+y);
  return mkNum(r,{
    stem:`Giá trị của biểu thức ${x}${sup(2)} ${MINUS} ${y}${sup(2)} là`,correct:ans,
    cands:[(x-y)*(x-y),ans+sum,ans-sum,ans+d,(x+y)*(x+y)/2],
    sol:`${x}² − ${y}² = (${x} − ${y})(${x} + ${y}) = ${x-y}·${x+y} = ${ans}.`,
    chk:()=>ans===x*x-y*y
  });
});
NLC('c2-value',2,'VD',r=>{
  const mode=r.int(1,3);
  if(mode===1){
    const a=r.int(2,9),d=r.pick([10,20,50,100]),t=a+d,ans=d*d;
    return mkNum(r,{
      stem:`Giá trị của biểu thức ${I('A')} = ${ph(Pl.from([{c:1,ex:2,ey:0},{c:-2*a,ex:1,ey:0},{c:a*a,ex:0,ey:0}]))} tại ${I('x')} = ${t} là`,correct:ans,
      cands:[t*t,d*d+a,ans-a*a,(t+a)*(t+a),ans+1],
      sol:`${I('A')} = (${I('x')} ${MINUS} ${a})² = (${t} ${MINUS} ${a})² = ${d}² = ${ans}.`
    });
  }
  const a=r.int(2,5),k=r.int(1,9),x=r.pick([2024,2025,2026]);
  if(mode===2){
    const ans=a*a*a+k;
    return mkNum(r,{
      stem:`Giá trị của biểu thức ${I('B')} = (${I('x')} + ${a})(${I('x')}${sup(2)} ${MINUS} ${a}${I('x')} + ${a*a}) ${MINUS} ${I('x')}${sup(3)} + ${k} tại ${I('x')} = ${x} là`,correct:ans,
      cands:[k-a*a*a,a*a+k,ans+x,2*a*a*a+k,ans+1],ok:()=>true,
      sol:`(${I('x')} + ${a})(${I('x')}² − ${a}${I('x')} + ${a*a}) = ${I('x')}³ + ${a*a*a}, nên ${I('B')} = ${a*a*a} + ${k} = ${sg(ans)}, không phụ thuộc vào ${I('x')}.`
    });
  }
  const ans=k-a*a;
  return mkNum(r,{
    stem:`Giá trị của biểu thức ${I('C')} = (${I('x')} ${MINUS} ${a})(${I('x')} + ${a}) ${MINUS} ${I('x')}${sup(2)} + ${k} tại ${I('x')} = ${x} là`,correct:ans,
    cands:[k+a*a,a*a-k,ans+x,ans+1,ans-1],ok:()=>true,
    sol:`(${I('x')} − ${a})(${I('x')} + ${a}) = ${I('x')}² − ${a*a}, nên ${I('C')} = ${k} − ${a*a} = ${sg(ans)}, không phụ thuộc vào ${I('x')}.`
  });
});

/* ---------- Chương III: Tứ giác ---------- */
NLC('c3-sumangle',3,'NB',r=>{
  for(;;){
    const A=r.int(60,120),B=r.int(70,120),C=r.int(50,110),D=360-A-B-C;
    if(D<40||D>140)continue;
    return mkNum(r,{
      stem:`Cho tứ giác ${I('ABCD')} có ∠${I('A')} = ${ang(A)}, ∠${I('B')} = ${ang(B)}, ∠${I('C')} = ${ang(C)}. Số đo ∠${I('D')} là`,correct:D,f:n=>ang(n),
      cands:[A+B+C,180-D,D+10,D-10,D+20,D-20],
      sol:`Tổng bốn góc của tứ giác bằng 360° nên ∠D = 360° − (${A}° + ${B}° + ${C}°) = ${D}°.`,
      chk:()=>A+B+C+D===360
    });
  }
});
NLC('c3-para',3,'TH',r=>{
  const A=r.pick([50,55,60,65,70,75,80,100,105,110,115,120,125]),t=r.pick(['B','C','D']),ans=t==='C'?A:180-A;
  return mkNum(r,{
    stem:`Cho hình bình hành ${I('ABCD')} có ∠${I('A')} = ${ang(A)}. Số đo ∠${I(t)} là`,correct:ans,f:n=>ang(n),
    cands:[A,180-A,360-A,90,2*A>170?A+20:2*A,ans+10,ans-10],
    sol:`Trong hình bình hành, các góc đối bằng nhau và hai góc kề một cạnh bù nhau, nên ∠${t} = ${ans}°.`,
    chk:()=>(t==='C')?ans===A:ans+A===180
  });
});
NLC('c3-trap',3,'TH',r=>{
  const D=r.pick([55,60,65,70,75,80]),t=r.pick(['A','B','C']),ans=t==='C'?D:180-D;
  return mkNum(r,{
    stem:`Cho hình thang cân ${I('ABCD')} (${I('AB')} // ${I('CD')}) có ∠${I('D')} = ${ang(D)}. Số đo ∠${I(t)} là`,correct:ans,f:n=>ang(n),
    cands:[D,180-D,90,D+10,D-10,180-D+10],
    sol:`Hình thang cân có hai góc kề một đáy bằng nhau nên ∠C = ∠D = ${D}°; ∠A = ∠B = 180° − ${D}° = ${180-D}° (hai góc kề cạnh bên bù nhau).`
  });
});
NLC('c3-prop',3,'NB',r=>{
  const v=r.int(0,3);
  if(v===0){
    const k=r.int(3,12);
    return mkNum(r,{
      stem:`Cho hình chữ nhật ${I('ABCD')} có hai đường chéo cắt nhau tại ${I('O')}. Biết ${I('AC')} = ${2*k} cm. Độ dài ${I('OB')} là`,correct:k,f:n=>`${n} cm`,
      cands:[2*k,k+1,k-1,4*k,k+2],
      sol:`Hình chữ nhật có hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường nên BD = AC = ${2*k} cm, OB = BD/2 = ${k} cm.`
    });
  }
  if(v===1){
    const m=r.int(8,20);
    return mkNum(r,{
      stem:`Cho hình thang cân ${I('ABCD')} (${I('AB')} // ${I('CD')}) có ${I('AC')} = ${m} cm. Độ dài đường chéo ${I('BD')} là`,correct:m,f:n=>`${n} cm`,
      cands:[m+2,m-2,2*m,m/2|0,m+1],
      sol:`Hình thang cân có hai đường chéo bằng nhau nên BD = AC = ${m} cm.`
    });
  }
  if(v===2){
    const a=r.int(4,12),b=r.int(3,10);
    return mkNum(r,{
      stem:`Cho hình bình hành ${I('ABCD')} có ${I('AB')} = ${a} cm, ${I('BC')} = ${b} cm. Chu vi của hình bình hành ${I('ABCD')} là`,correct:2*(a+b),f:n=>`${n} cm`,
      cands:[a+b,2*a+b,a+2*b,2*(a+b)+2,2*(a+b)-2,a*b],
      sol:`Hình bình hành có các cạnh đối bằng nhau nên chu vi = 2(AB + BC) = 2(${a} + ${b}) = ${2*(a+b)} cm.`
    });
  }
  const a=r.int(4,12),s=a+r.int(3,10);
  return mkNum(r,{
    stem:`Cho hình bình hành ${I('ABCD')} có chu vi ${2*s} cm và ${I('AB')} = ${a} cm. Độ dài cạnh ${I('BC')} là`,correct:s-a,f:n=>`${n} cm`,
    cands:[2*s-a,s,s-a+2,s-a-2,2*s-2*a],
    sol:`Chu vi = 2(AB + BC) = ${2*s} nên AB + BC = ${s}, suy ra BC = ${s} − ${a} = ${s-a} cm.`
  });
});
NLC('c3-rhombus-angle',3,'TH',r=>{
  if(r.chance(.5)){
    const B=r.pick([50,55,60,65,70,75,100,105,110,115,120]),ans=180-B;
    return mkNum(r,{
      stem:`Cho hình thoi ${I('ABCD')} có ∠${I('ABC')} = ${ang(B)}. Số đo ∠${I('BAD')} là`,correct:ans,f:n=>ang(n),
      cands:[B,2*B>170?B+20:2*B,90,ans+10,ans-10,B/2|0],
      sol:`Hình thoi là hình bình hành nên hai góc kề nhau bù nhau: ∠BAD = 180° − ${B}° = ${ans}°.`
    });
  }
  const x=r.pick([25,30,35,40,45,50]),ans=2*x;
  return mkNum(r,{
    stem:`Cho hình thoi ${I('ABCD')} có ∠${I('BAC')} = ${ang(x)}. Số đo ∠${I('BAD')} là`,correct:ans,f:n=>ang(n),
    cands:[x,90-x,180-ans,ans+10,ans-10,180-x],
    sol:`Đường chéo AC là tia phân giác của góc A nên ∠BAD = 2·∠BAC = 2·${x}° = ${ans}°.`
  });
});
const TRUE_Q=[
  'Hình chữ nhật có hai đường chéo bằng nhau.','Hình thoi có hai đường chéo vuông góc với nhau.','Hình bình hành có hai cạnh đối bằng nhau.',
  'Hình thang cân có hai đường chéo bằng nhau.','Tổng bốn góc của một tứ giác bằng 360°.','Hình vuông vừa là hình chữ nhật vừa là hình thoi.',
  'Hình bình hành có hai đường chéo cắt nhau tại trung điểm của mỗi đường.','Hình chữ nhật có bốn góc vuông.',
  'Tứ giác có hai cặp cạnh đối song song là hình bình hành.','Hình bình hành có một góc vuông là hình chữ nhật.',
  'Hình bình hành có hai cạnh kề bằng nhau là hình thoi.','Hình thang có hai góc kề một đáy bằng nhau là hình thang cân.',
  'Hình thoi có bốn cạnh bằng nhau.','Hình bình hành có hai đường chéo vuông góc là hình thoi.'
];
const FALSE_Q=[
  'Hình thoi có hai đường chéo bằng nhau.','Hình chữ nhật có hai đường chéo vuông góc với nhau.','Hình thang có hai cạnh bên song song.',
  'Hình bình hành có hai đường chéo bằng nhau.','Tứ giác có hai đường chéo bằng nhau là hình chữ nhật.','Tổng bốn góc của một tứ giác bằng 180°.',
  'Hình thang cân có hai cạnh bên song song.','Mọi hình thoi đều là hình chữ nhật.','Tứ giác có một cặp cạnh đối song song là hình bình hành.',
  'Mọi hình bình hành đều có bốn góc vuông.','Hình chữ nhật có bốn cạnh bằng nhau.','Hai đường chéo của hình bình hành luôn vuông góc với nhau.'
];
NLC('c3-stmt-true',3,'NB',r=>{
  const t=r.pick(TRUE_Q),f=r.shuffle(FALSE_Q).slice(0,3);
  return mkTxt(r,{stem:'Khẳng định nào sau đây là <b>đúng</b>?',correct:t,wrongs:f,sol:`Khẳng định đúng: “${t}” Ba khẳng định còn lại đều sai.`});
},'c3-stmt');
NLC('c3-stmt-false',3,'NB',r=>{
  const f=r.pick(FALSE_Q),t=r.shuffle(TRUE_Q).slice(0,3);
  return mkTxt(r,{stem:'Khẳng định nào sau đây là <b>sai</b>?',correct:f,wrongs:t,sol:`Khẳng định sai: “${f}” Ba khẳng định còn lại đều đúng.`});
},'c3-stmt');

/* ---------- Chương IV: Định lí Thalès ---------- */
NLC('c4-thales',4,'TH',r=>{
  const {m,n,rr,s}=thalesP(r),AM=m*rr,MB=n*rr,AN=m*s,NC=n*s;
  return mkNum(r,{
    stem:`Cho tam giác ${I('ABC')}, ${I('M')} thuộc ${I('AB')}, ${I('N')} thuộc ${I('AC')} sao cho ${I('MN')} // ${I('BC')}. Biết ${I('AM')} = ${AM} cm, ${I('MB')} = ${MB} cm, ${I('AN')} = ${AN} cm. Độ dài ${I('NC')} là`,correct:NC,f:x=>`${x} cm`,
    cands:[NC+1,NC-1,NC+2,NC-2,AN,MB,AM+AN],
    sol:`MN // BC nên ${fr('AM','MB')} = ${fr('AN','NC')} (định lí Thalès), suy ra NC = ${MB}·${AN}/${AM} = ${NC} cm.`,
    chk:()=>AM*NC===MB*AN
  });
});
NLC('c4-midline',4,'NB',r=>{
  const v=r.int(3,15);
  if(r.chance(.5)){
    const BC=2*v;
    return mkNum(r,{
      stem:`Cho tam giác ${I('ABC')} có ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AB')}, ${I('AC')}. Biết ${I('BC')} = ${BC} cm. Độ dài ${I('MN')} là`,correct:v,f:x=>`${x} cm`,
      cands:[BC,2*BC,v+1,v-1,BC+v],
      sol:`MN là đường trung bình của tam giác ABC nên MN = BC/2 = ${v} cm.`
    });
  }
  return mkNum(r,{
    stem:`Cho tam giác ${I('ABC')} có ${I('M')}, ${I('N')} lần lượt là trung điểm của ${I('AB')}, ${I('AC')}. Biết ${I('MN')} = ${v} cm. Độ dài ${I('BC')} là`,correct:2*v,f:x=>`${x} cm`,
    cands:[v,4*v,2*v+1,2*v-1,v+2],
    sol:`MN là đường trung bình của tam giác ABC nên BC = 2·MN = ${2*v} cm.`
  });
});
NLC('c4-bisector',4,'TH',r=>{
  for(;;){
    const [m,n]=r.pick([[1,2],[2,3],[3,4],[3,5],[2,5],[1,3],[3,2],[2,1],[5,3],[4,3]]),t=r.int(2,4),s=r.int(1,3);
    if(!(t>s&&Math.abs(m-n)*t<(m+n)*s))continue;
    const AB=m*t,AC=n*t,BC=(m+n)*s,DB=m*s,DC=n*s;
    return mkNum(r,{
      stem:`Cho tam giác ${I('ABC')} có ${I('AB')} = ${AB} cm, ${I('AC')} = ${AC} cm, ${I('BC')} = ${BC} cm. Tia phân giác của góc ${I('A')} cắt ${I('BC')} tại ${I('D')}. Độ dài ${I('BD')} là`,correct:DB,f:x=>`${x} cm`,
      cands:[DC,DB+1,DB-1,DB+2,DC+1],
      sol:`AD là phân giác nên ${fr('DB','DC')} = ${fr('AB','AC')} = ${fr(m,n)}, mà DB + DC = ${BC} nên DB = ${BC}·${m}/${m+n} = ${DB} cm.`,
      chk:()=>DB*AC===DC*AB&&DB+DC===BC
    });
  }
});
const PROP_T=[
  [fr('AM','AB'),fr('AN','AC')],[fr('AM','MB'),fr('AN','NC')],[fr('MB','AB'),fr('NC','AC')],[fr('AM','AN'),fr('AB','AC')],[fr('MN','BC'),fr('AM','AB')],[fr('AB','AM'),fr('AC','AN')]
];
const PROP_F=[
  [fr('AM','AB'),fr('AN','NC')],[fr('AM','MB'),fr('AN','AC')],[fr('MN','BC'),fr('AM','MB')],[fr('AM','MB'),fr('NC','AN')],[fr('AB','AM'),fr('AN','AC')],[fr('MB','AB'),fr('AN','AC')]
];
NLC('c4-prop',4,'NB',r=>{
  const eq=([a,b])=>`${a} = ${b}`,t=r.pick(PROP_T),f=r.shuffle(PROP_F).slice(0,3);
  return mkTxt(r,{
    stem:`Cho tam giác ${I('ABC')}, ${I('M')} thuộc ${I('AB')}, ${I('N')} thuộc ${I('AC')} sao cho ${I('MN')} // ${I('BC')}. Khẳng định nào sau đây là <b>đúng</b>?`,
    correct:eq(t),wrongs:f.map(eq),sol:`Theo định lí Thalès và hệ quả: ${eq(t)}.`
  });
});

/* ---------- Chương V: Dữ liệu và biểu đồ ---------- */
const QUAL=['Môn học yêu thích của học sinh','Màu sắc yêu thích của bạn','Xếp loại học lực (Tốt, Khá, Đạt)','Phương tiện đi học của học sinh','Tên các loại cây ở vườn trường','Quê quán của học sinh','Loại trái cây yêu thích'];
const QUAN=['Chiều cao của học sinh trong lớp','Số điểm 10 đạt được trong học kì','Cân nặng của các bạn trong tổ','Số anh chị em ruột của mỗi bạn','Số giờ tự học mỗi ngày','Nhiệt độ trung bình các ngày trong tuần','Số quyển sách trong thư viện lớp'];
NLC('c5-type',5,'NB',r=>{
  const quan=r.chance(.5),good=r.pick(quan?QUAN:QUAL),bad=r.shuffle(quan?QUAL:QUAN).slice(0,3);
  return mkTxt(r,{
    stem:`Dữ liệu nào sau đây là dữ liệu <b>${quan?'định lượng':'định tính'}</b>?`,correct:good,wrongs:bad,
    sol:quan?'Dữ liệu định lượng là dữ liệu có thể đo, đếm được, biểu diễn bằng số.':'Dữ liệu định tính là dữ liệu không phải là số (mô tả tính chất, tên gọi, loại).'
  });
});
const CHARTS=[
  ['Biểu đồ cột',['So sánh số học sinh của từng lớp khối 8 trong trường.','So sánh số huy chương vàng của năm đội trong hội thao.','So sánh sản lượng lúa của các xã trong một huyện.']],
  ['Biểu đồ cột kép',['So sánh số học sinh nam và số học sinh nữ của từng lớp khối 8.','So sánh số học sinh giỏi và số học sinh khá của từng lớp khối 8.','So sánh điểm trung bình học kì I và học kì II của từng môn.']],
  ['Biểu đồ hình quạt tròn',['Biểu diễn tỉ lệ phần trăm các loại học lực so với tổng số học sinh của lớp.','Biểu diễn tỉ lệ phần trăm các phương tiện học sinh dùng để đến trường.','Biểu diễn tỉ lệ phần trăm các khoản chi trong tổng chi tiêu của một gia đình.']],
  ['Biểu đồ đoạn thẳng',['Biểu diễn sự thay đổi nhiệt độ trung bình của một thành phố qua các tháng trong năm.','Biểu diễn sự thay đổi dân số của một tỉnh qua các năm.','Biểu diễn sự thay đổi chiều cao của một em bé theo từng tháng tuổi.']]
];
NLC('c5-chart',5,'NB',r=>{
  const k=r.int(0,3),[name,list]=CHARTS[k],use=r.pick(list);
  return mkTxt(r,{
    stem:`Để ${use.charAt(0).toLowerCase()+use.slice(1,-1)}, nên chọn loại biểu đồ nào là phù hợp nhất?`,correct:name,wrongs:CHARTS.filter((_,i)=>i!==k).map(c=>c[0]),
    sol:{0:'Biểu đồ cột dùng để so sánh các đại lượng cùng loại giữa nhiều đối tượng.',1:'Biểu đồ cột kép dùng để so sánh hai nhóm số liệu cho từng đối tượng.',2:'Biểu đồ hình quạt tròn dùng để biểu diễn tỉ lệ phần trăm của các phần trong một tổng thể.',3:'Biểu đồ đoạn thẳng dùng để biểu diễn sự thay đổi của một đại lượng theo thời gian.'}[k]
  });
});
const CLS=['8A','8B','8C','8D','8E'];
NLC('c5-bar',5,'TH',r=>{
  const vals=distinctInts(r,5,12,48),mx=Math.max(...vals),mn=Math.min(...vals),kind=r.int(0,2);
  const chart=barSVG(CLS,vals,{unit:'Số học sinh giỏi'});
  const stemTop=`Biểu đồ cột dưới đây cho biết số học sinh giỏi của năm lớp khối 8.<div class="figure">${chart}</div>`;
  if(kind===0){
    const ans=CLS[vals.indexOf(mx)];
    return mkTxt(r,{stem:stemTop+'Lớp có nhiều học sinh giỏi nhất là',correct:ans,wrongs:CLS.filter(c=>c!==ans).slice(0,3),sol:`Cột cao nhất ứng với lớp ${ans} (${mx} học sinh).`});
  }
  if(kind===1){
    const ans=CLS[vals.indexOf(mn)];
    return mkTxt(r,{stem:stemTop+'Lớp có ít học sinh giỏi nhất là',correct:ans,wrongs:CLS.filter(c=>c!==ans).slice(0,3),sol:`Cột thấp nhất ứng với lớp ${ans} (${mn} học sinh).`});
  }
  const tot=vals.reduce((a,b)=>a+b,0);
  return mkNum(r,{stem:stemTop+'Tổng số học sinh giỏi của cả năm lớp là',correct:tot,cands:[tot-mx,tot-mn,tot+10,tot-10,tot+5],
    sol:`Tổng = ${vals.join(' + ')} = ${tot}.`,chk:()=>tot===vals.reduce((a,b)=>a+b,0)});
});
NLC('c5-pie',5,'TH',r=>{
  const set=r.pick(CAT_SETS),pcts=pctSet(r),N=r.pick([40,60,80,100,120,160,200]);
  const items=set.names.map((name,i)=>({name,pct:pcts[i]})),k=r.int(0,3),ans=N*pcts[k]/100;
  return mkNum(r,{
    stem:`Biểu đồ hình quạt tròn dưới đây biểu diễn tỉ lệ ${set.what} của ${N} học sinh được khảo sát.<div class="figure">${pieSVG(items)}</div>Số học sinh chọn “${set.names[k]}” là`,
    correct:ans,cands:[pcts[k],N-ans,ans+N/20,ans-N/20,N/4],
    sol:`Số học sinh chọn “${set.names[k]}” = ${N} · ${pcts[k]}% = ${ans} học sinh.`,chk:()=>ans*100===N*pcts[k]
  });
});
