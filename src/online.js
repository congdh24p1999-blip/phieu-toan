/* ================================================================
   Làm bài online (giai đoạn 1): học sinh làm đề hoặc phiếu ngay trên trang, nộp bài, xem điểm
   và lời giải. Không có máy chủ: đề sinh lại từ các tham số trên đường dẫn (cùng mã → cùng đề),
   bài làm lưu tạm trong trình duyệt của học sinh.
   Câu tự luận được thay bằng câu trả lời ngắn cùng chương, cùng mức độ, giữ nguyên số điểm;
   sau khi nộp, học sinh xem lại câu tự luận gốc kèm lời giải mẫu để học cách trình bày.
   ================================================================ */
const QZ_BASE='https://congdh24p1999-blip.github.io/phieu-toan/';
const QZ_LV={NB:0,TH:1,VD:2,VDC:3};
const DS_SCORE=[0,.1,.25,.5,1];

/* ---------- Đường dẫn: tham số ⇄ trạng thái ---------- */
function qzLinkParams(o){
  const p=new URLSearchParams({lam:'1'});
  if(state.mode==='ws'){p.set('m','ws');p.set('g',state.grade);p.set('les',wsSel().join('.'));p.set('n',state.wsn);p.set('wk',state.wsk)}
  else{p.set('g',state.grade);p.set('k',state.kind);p.set('s',state.struct);if(state.struct==='custom')p.set('cs',['n1','p1','n2','n3','p3','n4'].map(k=>state.cs[k]).join('_'))}
  p.set('d',state.diff);p.set('c',state.code);if(state.ext)p.set('x','1');
  p.set('t',o.time);p.set('sol',o.sol?'1':'0');if(o.mix)p.set('tron','1');
  return p;
}
function qzLink(o){return QZ_BASE+'?'+qzLinkParams(o).toString()}

/* ---------- Dựng bài làm từ tham số ---------- */
function qzPick(pool,q,used,key,i){
  const cand=pool.filter(t=>!used.has(t.id));
  let arr=cand.filter(t=>t.ch===q.ch);if(!arr.length)arr=cand;if(!arr.length)arr=pool;
  const d=t=>Math.abs((QZ_LV[t.lv]??1)-(QZ_LV[q.lv]??1)),m=Math.min(...arr.map(d));arr=arr.filter(t=>d(t)===m);
  const r=new RNG(`online|${key}|${i}`),t=arr[r.int(0,arr.length-1)];used.add(t.id);
  let n=t.gen(new RNG(`online|gen|${key}|${i}|${t.id}`));n.id=t.id;n.ch=t.ch;n.lv=t.lv;n.les=t.les||[];return n;
}
/* các câu trong bài làm: {kind,q,pts,orig?} */
function qzBuild(P){
  const g=+P.get('g')||8,diff=DIFFS[P.get('d')]?P.get('d'):'chuan',code=(P.get('c')||'101').replace(/\D/g,'').slice(0,3)||'101';
  ALLOW_EXT=P.get('x')==='1';CUR_DIFF=diff;
  const key=P.toString();let items=[],info={},chName={},tlOrig=[];
  const push=(kind,arr,pts)=>arr.forEach(q=>items.push({kind,q,pts:typeof pts==='function'?pts(q):pts}));
  if(P.get('m')==='ws'){
    const les=(P.get('les')||'').split('.').map(Number).filter(Boolean);
    const n=[10,15,20,30].includes(+P.get('n'))?+P.get('n'):10,wk=['mix','nlc','ds','tln','tl'].includes(P.get('wk'))?P.get('wk'):'mix';
    const w=buildWS({grade:g,lessons:les,n,kind:wk,diff,code,ext:ALLOW_EXT});
    push('nlc',w.nlc,1);push('ds',w.ds,1);push('tln',w.tln,1);
    const pool=Object.values(T.tln).filter(t=>(t.g||8)===g&&(!t.ext||ALLOW_EXT)&&(t.les||[]).some(l=>les.includes(l)));
    const pool2=pool.length?pool:Object.values(T.tln).filter(t=>(t.g||8)===g&&(!t.ext||ALLOW_EXT));
    const used=new Set(items.map(it=>it.q.id));
    w.tl.forEach((q,i)=>{items.push({kind:'tln',q:qzPick(pool2,q,used,key,i),pts:1,orig:q});tlOrig.push(q)});
    chName=WS_CH_NAMES[g]||{};
    info={title:wsIsTN(les)?'Phiếu ôn thi tốt nghiệp THPT':'Phiếu bài tập Toán '+g,sub:wsTitleLes(g,les),code,ws:true};
  }else{
    const kind=P.get('k')||'gk1',term=termOf(g,kind),s=P.get('s')||'chuan';
    if(g===9&&kind==='tn'&&V10LAYOUT[s]){
      const ex=buildV10(code,diff,s),bp=v10BP(),pool=poolOf(BLUEPRINT['9tn'],'tln'),used=new Set();
      ex.tl.forEach((q,i)=>{items.push({kind:'tln',q:qzPick(pool,q,used,key,i),pts:qPts(q),orig:q});tlOrig.push(q)});
      chName=bp.chName;info={title:'Đề ôn thi vào lớp 10',sub:'Toán 9 · '+(s==='tlhcm'?'100% tự luận kiểu TP.HCM':'100% tự luận kiểu Hà Nội'),code};
    }else{
      let st=STRUCTS[s]||STRUCTS.chuan;
      if(s==='custom'){const a=(P.get('cs')||'').split('_').map(Number),o={n1:a[0],p1:a[1],n2:a[2],n3:a[3],p3:a[4],n4:a[5]};if(!structCheck(o))st=o}
      let bp=bpOf(term,st);const ex=buildExam(term,code,diff,st);if(ex.bp)bp=ex.bp;
      let vi=0;if(P.get('tron')==='1'){const k='xdt-tron:'+key;try{vi=+localStorage.getItem(k);if(!(vi>=0&&vi<=3)||localStorage.getItem(k)===null){vi=Math.floor(Math.random()*4);localStorage.setItem(k,vi)}}catch(e){vi=Math.floor(Math.random()*4)}}
      const v=makeVariant(ex,vi);
      push('nlc',v.nlc,bp.pn);push('ds',v.ds,1);push('tln',v.tln,bp.pt);
      const pool=poolOf(bp,'tln'),used=new Set(items.map(it=>it.q.id));
      v.tl.forEach((q,i)=>{items.push({kind:'tln',q:qzPick(pool,q,used,key,i),pts:qPts(q),orig:q});tlOrig.push(q)});
      chName=bp.chName;info={title:(bp.tn||kind==='tn'?'Đề ':'Đề kiểm tra ')+bp.short.charAt(0).toLowerCase()+bp.short.slice(1),sub:bp.mon,code:v.code};
    }
  }
  const time=Math.min(180,Math.max(0,+P.get('t')||0));
  return{items,info,chName,tlOrig,time,sol:P.get('sol')!=='0',key};
}

/* ---------- Chấm ---------- */
function qzNum(s){
  if(s==null)return NaN;let t=String(s).trim().replace(/\s+/g,'').replace(/[−–]/g,'-');
  if(!t)return NaN;
  if(/^-?\d+\/\d+$/.test(t)){const [a,b]=t.split('/').map(Number);return b?a/b:NaN}
  if(/^-?\d{1,3}(\.\d{3})+$/.test(t))t=t.replace(/\./g,'');   /* 1.500 ⇒ 1500 khi có dấu chấm ngăn cách hàng nghìn */
  t=t.replace(',','.');
  return /^-?(\d+\.?\d*|\.\d+)$/.test(t)?Number(t):NaN;
}
function qzGrade(it,a){
  if(it.kind==='nlc'){const ok=a===it.q.ans;return{got:ok?it.pts:0,ok,done:a!=null}}
  if(it.kind==='ds'){const arr=a||[],k=it.q.items.filter((x,i)=>arr[i]!=null&&arr[i]===x.truth).length;return{got:DS_SCORE[k]*it.pts,ok:k===4,k,done:arr.filter(x=>x!=null).length===4}}
  const x=qzNum(a),ok=Number.isFinite(x)&&Math.abs(x-it.q.ans)<1e-6*Math.max(1,Math.abs(it.q.ans));
  return{got:ok?it.pts:0,ok,done:a!=null&&String(a).trim()!==''};
}

/* ---------- Giao diện học sinh ---------- */
const QZ={};
function qzStoreKey(){return 'xdt-lam:'+QZ.m.key}
function qzLoad(){try{return JSON.parse(localStorage.getItem(qzStoreKey())||'null')}catch(e){return null}}
function qzSave(){try{localStorage.setItem(qzStoreKey(),JSON.stringify(QZ.s))}catch(e){}}
const qzEl=()=>document.getElementById('qz');
const KIND_NAME={nlc:'Nhiều phương án lựa chọn',ds:'Đúng – Sai',tln:'Trả lời ngắn'};
function qzPartsOf(items){
  const parts=[];items.forEach((it,i)=>{const k=it.orig?'tl':it.kind;let p=parts[parts.length-1];if(!p||p.k!==k){p={k,idx:[]};parts.push(p)}p.idx.push(i)});return parts;
}
function qzPartTitle(p){
  if(p.k==='tl')return['Trả lời ngắn (thay cho phần tự luận)','Mỗi câu thay một câu tự luận của đề in, cùng chương, cùng mức độ và cùng số điểm. Gõ đáp số; số thập phân dùng dấu phẩy hoặc dấu chấm đều được.'];
  if(p.k==='nlc')return[KIND_NAME.nlc,'Chạm vào phương án em chọn.'];
  if(p.k==='ds')return[KIND_NAME.ds,'Với mỗi ý a), b), c), d), chọn Đúng hoặc Sai.'];
  return[KIND_NAME.tln,'Gõ đáp số; số thập phân dùng dấu phẩy hoặc dấu chấm đều được.'];
}
function qzQuestionHTML(it,i,ro){
  const q=it.q,a=QZ.s.ans[i];let h=`<section class="qzq" id="qzq${i}" data-i="${i}"><div class="qzq-h"><span class="qzn">Câu ${i+1}</span><span class="qzp">${pts(it.pts)} điểm</span></div><div class="qzs">${q.stem}</div>`;
  if(it.kind==='nlc'){
    h+=`<div class="qzopts ${optClass(q.opts)}" role="radiogroup" aria-label="Các phương án câu ${i+1}">${q.opts.map((o,j)=>`<button type="button" class="qzo${a===j?' on':''}" role="radio" aria-checked="${a===j}" data-a="${j}"${ro?' disabled':''}><b>${LET[j]}</b><span>${o}</span></button>`).join('')}</div>`;
  }else if(it.kind==='ds'){
    const arr=a||[];
    h+=`<ol class="qzys">${q.items.map((x,j)=>`<li><div class="qzy"><b>${'abcd'[j]})</b> ${x.text}</div><div class="qztf" role="radiogroup" aria-label="Ý ${'abcd'[j]}"><button type="button" class="qzb${arr[j]===true?' on':''}" data-j="${j}" data-v="1" aria-pressed="${arr[j]===true}"${ro?' disabled':''}>Đúng</button><button type="button" class="qzb${arr[j]===false?' on':''}" data-j="${j}" data-v="0" aria-pressed="${arr[j]===false}"${ro?' disabled':''}>Sai</button></div></li>`).join('')}</ol>`;
  }else{
    h+=`<label class="qzin"><span>Đáp số</span><input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" value="${a!=null?esc(a):''}" data-i="${i}"${ro?' disabled':''}>${q.unit?`<em>${UNIT_TXT(q.unit).trim()}</em>`:''}</label>`;
  }
  return h+'</section>';
}
function qzDone(i){const it=QZ.m.items[i],a=QZ.s.ans[i];return qzGrade(it,a).done}
function qzUpdateBar(){
  const n=QZ.m.items.length,d=QZ.m.items.filter((_,i)=>qzDone(i)).length;
  const c=document.getElementById('qzCount');if(c)c.textContent=`${d}/${n} câu`;
  document.querySelectorAll('#qzNav button').forEach(b=>b.classList.toggle('on',qzDone(+b.dataset.i)));
}
function qzClock(){
  const el=document.getElementById('qzTime');if(!el||!QZ.m.time||QZ.s.done)return;
  const left=Math.max(0,QZ.s.start+QZ.m.time*60000-Date.now()),m=Math.floor(left/60000),s=Math.floor(left%60000/1000);
  el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;el.classList.toggle('low',left<5*60000);
  if(left<=0){qzSubmit(true)}
}
function qzStartView(){
  const m=QZ.m,saved=qzLoad(),n=m.items.length,tot=m.items.reduce((a,it)=>a+it.pts,0);
  document.title=`Làm bài online – ${m.info.title} – mã ${m.info.code}`;
  const counts=['nlc','ds','tln'].map(k=>[k,m.items.filter(it=>it.kind===k&&!it.orig).length]).filter(x=>x[1]);
  const tl=m.items.filter(it=>it.orig).length;
  qzEl().innerHTML=`<div class="qzwrap"><div class="qzcard qzstart">
    <p class="qzbrand">Xưởng đề Toán · Làm bài online</p>
    <h1>${esc(m.info.title)}</h1><p class="qzsub">${esc(m.info.sub)} · Mã ${esc(m.info.code)}</p>
    <ul class="qzfacts"><li><b>${n}</b> câu</li><li><b>${m.time?m.time+' phút':'Không giới hạn'}</b> thời gian</li><li><b>${pts(tot)}</b> điểm</li></ul>
    <p class="qzsmall">${counts.map(([k,c])=>`${c} câu ${KIND_NAME[k].toLowerCase()}`).join(', ')}${tl?`, ${tl} câu trả lời ngắn thay cho phần tự luận của đề in`:''}. Nộp bài là có điểm và lời giải ngay.</p>
    ${saved&&saved.done?`<p class="qznote">${saved.auto?'Bài này đã hết giờ và được tự nộp':'Em đã nộp bài này'} lúc ${new Date(saved.end).toLocaleString('vi-VN')}.</p>`:saved?`<p class="qznote">Em đang làm dở bài này (đã trả lời ${Object.keys(saved.ans||{}).length} câu).</p>`:''}
    <div class="qzform"><label><span>Họ và tên</span><input id="qzName" type="text" autocomplete="name" maxlength="60" value="${esc(saved&&saved.name||'')}"></label><label><span>Lớp</span><input id="qzCls" type="text" maxlength="12" value="${esc(saved&&saved.cls||'')}"></label></div>
    <div class="qzbtns">${saved&&saved.done?`<button class="btn" id="qzSee" type="button">Xem kết quả</button><button class="btn alt" id="qzRedo" type="button">Làm lại từ đầu</button>`:`<button class="btn" id="qzGo" type="button">${saved?'Làm tiếp':'Bắt đầu làm bài'}</button>${saved?'<button class="btn alt" id="qzRedo" type="button">Làm lại từ đầu</button>':''}`}</div>
    <p class="qzsmall muted">Bài làm chỉ lưu trên máy này, không gửi đi đâu. Họ tên, lớp dùng để in trên phiếu kết quả.</p>
  </div></div>`;
  const nm=()=>({name:document.getElementById('qzName').value.trim(),cls:document.getElementById('qzCls').value.trim()});
  const go=document.getElementById('qzGo');if(go)go.onclick=()=>{QZ.s=Object.assign(saved||{ans:{},start:Date.now()},nm());if(!saved)QZ.s.start=Date.now();qzSave();qzTestView()};
  const see=document.getElementById('qzSee');if(see)see.onclick=()=>{QZ.s=Object.assign(saved,nm());qzSave();qzResultView()};
  const redo=document.getElementById('qzRedo');if(redo)redo.onclick=()=>{QZ.s=Object.assign({ans:{},start:Date.now()},nm());qzSave();qzTestView()};
}
function qzTestView(){
  const m=QZ.m,parts=qzPartsOf(m.items);
  let h=`<div class="qzbar" role="toolbar" aria-label="Thanh làm bài"><span class="qzt" id="qzTime" aria-live="off">${m.time?'':'Không giới hạn'}</span><span class="qzc" id="qzCount"></span><button type="button" class="btn alt sm" id="qzNavBtn" aria-expanded="false" aria-controls="qzNav">Danh sách câu</button><button type="button" class="btn sm" id="qzSubmit">Nộp bài</button></div>
  <nav class="qznav" id="qzNav" hidden aria-label="Chuyển nhanh đến câu">${m.items.map((_,i)=>`<button type="button" data-i="${i}">${i+1}</button>`).join('')}</nav><div class="qzwrap"><div class="qzhead"><b>${esc(m.info.title)}</b> · ${esc(m.info.sub)} · Mã ${esc(m.info.code)}${QZ.s.name?` · ${esc(QZ.s.name)}`:''}</div>`;
  parts.forEach((p,pi)=>{const [t,s]=qzPartTitle(p);h+=`<h2 class="qzpart">Phần ${['I','II','III','IV','V'][pi]}. ${t}<small>${s}</small></h2>`;h+=`<div class="sheet qzsheet">${p.idx.map(i=>qzQuestionHTML(m.items[i],i,false)).join('')}</div>`});
  h+=`<div class="qzend"><button type="button" class="btn" id="qzSubmit2">Nộp bài</button></div></div>`;
  qzEl().innerHTML=prettyMath(h);window.scrollTo(0,0);
  const root=qzEl();
  root.addEventListener('click',qzClick);root.addEventListener('input',qzInput);
  document.getElementById('qzSubmit').onclick=()=>qzSubmit(false);document.getElementById('qzSubmit2').onclick=()=>qzSubmit(false);
  const nb=document.getElementById('qzNavBtn'),nav=document.getElementById('qzNav');
  nb.onclick=()=>{nav.hidden=!nav.hidden;nb.setAttribute('aria-expanded',String(!nav.hidden))};
  nav.onclick=e=>{const b=e.target.closest('button');if(!b)return;document.getElementById('qzq'+b.dataset.i).scrollIntoView({behavior:'smooth',block:'start'});nav.hidden=true;nb.setAttribute('aria-expanded','false')};
  qzUpdateBar();clearInterval(QZ.tick);if(m.time){qzClock();QZ.tick=setInterval(qzClock,1000)}
}
function qzClick(e){
  if(QZ.s.done)return;
  const o=e.target.closest('.qzo'),b=e.target.closest('.qzb');
  if(o){const sec=o.closest('.qzq'),i=+sec.dataset.i,j=+o.dataset.a;QZ.s.ans[i]=QZ.s.ans[i]===j?undefined:j;if(QZ.s.ans[i]===undefined)delete QZ.s.ans[i];
    sec.querySelectorAll('.qzo').forEach(x=>{const on=+x.dataset.a===QZ.s.ans[i];x.classList.toggle('on',on);x.setAttribute('aria-checked',String(on))});qzSave();qzUpdateBar()}
  if(b){const sec=b.closest('.qzq'),i=+sec.dataset.i,j=+b.dataset.j,v=b.dataset.v==='1';const arr=QZ.s.ans[i]||[null,null,null,null];arr[j]=arr[j]===v?null:v;QZ.s.ans[i]=arr;
    sec.querySelectorAll(`.qzb[data-j="${j}"]`).forEach(x=>{const on=arr[j]===(x.dataset.v==='1');x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on))});qzSave();qzUpdateBar()}
}
function qzInput(e){
  const t=e.target;if(!t.matches('.qzin input')||QZ.s.done)return;const i=+t.dataset.i;
  if(t.value.trim())QZ.s.ans[i]=t.value;else delete QZ.s.ans[i];qzSave();qzUpdateBar();
}
function qzSubmit(auto){
  if(QZ.s.done)return;
  const n=QZ.m.items.length,miss=QZ.m.items.filter((_,i)=>!qzDone(i)).length;
  if(!auto&&miss&&!confirm(`Còn ${miss}/${n} câu chưa làm xong. Em vẫn nộp bài?`))return;
  clearInterval(QZ.tick);QZ.s.done=true;QZ.s.end=Date.now();QZ.s.auto=!!auto;qzSave();qzResultView();
}
function qzAnsTxt(it,a){
  if(it.kind==='nlc')return a==null?'(bỏ trống)':LET[a];
  if(it.kind==='ds')return(a||[]).length?'abcd'.split('').map((c,j)=>`${c}) ${a[j]==null?'–':a[j]?'Đ':'S'}`).join(' '):'(bỏ trống)';
  return a==null||String(a).trim()===''?'(bỏ trống)':esc(a);
}
function qzKeyTxt(it){
  if(it.kind==='nlc')return`${LET[it.q.ans]}`;
  if(it.kind==='ds')return it.q.items.map((x,j)=>`${'abcd'[j]}) ${x.truth?'Đ':'S'}`).join(' ');
  return fmt(it.q.ans)+UNIT_TXT(it.q.unit);
}
function qzResultView(){
  const m=QZ.m,res=m.items.map((it,i)=>qzGrade(it,QZ.s.ans[i])),got=res.reduce((a,r)=>a+r.got,0),tot=m.items.reduce((a,it)=>a+it.pts,0);
  const sc10=Math.round(got/tot*1000)/100,nOK=res.filter(r=>r.ok).length;
  const used=Math.round(((QZ.s.end||Date.now())-QZ.s.start)/60000);
  /* chương còn yếu: tỉ lệ điểm đạt theo chương */
  const byCh={};m.items.forEach((it,i)=>{const c=it.q.ch;(byCh[c]=byCh[c]||{got:0,tot:0,n:0}).got+=res[i].got;byCh[c].tot+=it.pts;byCh[c].n++});
  const chRows=Object.entries(byCh).map(([c,v])=>({c:+c,...v,r:v.got/v.tot})).sort((a,b)=>a.r-b.r);
  const chLabel=c=>{const nm=m.chName&&m.chName[c];return c>100?`Chủ đề ${c-100}${nm?'. '+nm:''}`:`Chương ${ROM10[c]||c}${nm?'. '+nm:''}`};
  const weak=chRows.filter(x=>x.r<.7).slice(0,5);
  const parts=qzPartsOf(m.items);
  let h=`<div class="qzwrap"><div class="qzcard qzres">
    <p class="qzbrand">Xưởng đề Toán · Kết quả làm bài online</p>
    <h1>${esc(m.info.title)}</h1><p class="qzsub">${esc(m.info.sub)} · Mã ${esc(m.info.code)}</p>
    <p class="qzwho">${QZ.s.name?`Học sinh: <b>${esc(QZ.s.name)}</b>`:'Học sinh: ……………………'}${QZ.s.cls?` · Lớp <b>${esc(QZ.s.cls)}</b>`:''} · Nộp lúc ${new Date(QZ.s.end).toLocaleString('vi-VN')}${QZ.s.auto?' (hết giờ, tự nộp)':''}</p>
    <div class="qzscore"><span class="big">${pts(sc10)}</span><span class="of">/ 10 điểm</span></div>
    <p class="qzsmall">Đúng hoàn toàn ${nOK}/${m.items.length} câu · Đạt ${pts(Math.round(got*100)/100)}/${pts(tot)} điểm của bài làm online · Thời gian làm ${used<1?'dưới 1':used} phút.</p>
    <table class="qztbl"><thead><tr><th scope="col">Phần</th><th scope="col">Số câu</th><th scope="col">Điểm</th></tr></thead><tbody>${parts.map((p,pi)=>{const g=p.idx.reduce((a,i)=>a+res[i].got,0),t=p.idx.reduce((a,i)=>a+m.items[i].pts,0);return`<tr><td>${['I','II','III','IV','V'][pi]}. ${qzPartTitle(p)[0]}</td><td>${p.idx.length}</td><td>${pts(Math.round(g*100)/100)}/${pts(t)}</td></tr>`}).join('')}</tbody></table>
    ${weak.length?`<h2 class="qzh2">Nội dung cần ôn lại</h2><ul class="qzweak">${weak.map(x=>`<li>${esc(chLabel(x.c))}: đạt ${Math.round(x.r*100)}% số điểm (${x.n} câu)</li>`).join('')}</ul>`:`<p class="qzgood">Em làm tốt đều các chương trong bài này.</p>`}
    ${m.tlOrig.length?`<p class="qzsmall muted">Điểm trên là điểm của bài làm online, trong đó phần tự luận của đề in được thay bằng câu trả lời ngắn; thi thật còn chấm cả cách trình bày.</p>`:''}
    <div class="qzbtns noprint"><button class="btn" id="qzPrint" type="button">In / lưu PDF phiếu kết quả</button><button class="btn alt" id="qzAgain" type="button">Làm lại bài này</button><button class="btn alt" id="qzNew" type="button">Làm đề khác cùng loại</button></div>
  </div>`;
  if(m.sol){
    h+=`<h2 class="qzpart">Xem lại từng câu</h2><div class="sheet qzsheet">`;
    m.items.forEach((it,i)=>{const r=res[i],q=it.q,st=r.ok?'ok':r.got>0?'part':'bad';
      h+=`<section class="qzq rv ${st}"><div class="qzq-h"><span class="qzn">Câu ${i+1}</span><span class="qzp">${st==='ok'?'Đúng':st==='part'?`Đúng ${r.k}/4 ý`:'Chưa đúng'} · ${pts(Math.round(r.got*100)/100)}/${pts(it.pts)} điểm</span></div><div class="qzs">${q.stem}</div>`;
      if(it.kind==='nlc')h+=`<div class="qzopts ${optClass(q.opts)}">${q.opts.map((o,j)=>`<div class="qzo ro${j===q.ans?' key':''}${QZ.s.ans[i]===j&&j!==q.ans?' wrong':''}"><b>${LET[j]}</b><span>${o}</span></div>`).join('')}</div>`;
      if(it.kind==='ds')h+=`<ol class="qzys">${q.items.map((x,j)=>{const a=(QZ.s.ans[i]||[])[j];return`<li class="${a==null?'':a===x.truth?'ok':'bad'}"><div class="qzy"><b>${'abcd'[j]})</b> ${x.text}</div><div class="qzv">Em chọn: <b>${a==null?'–':a?'Đúng':'Sai'}</b> · Đáp án: <b>${x.truth?'Đúng':'Sai'}</b></div><div class="qzwhy">${x.why}</div></li>`}).join('')}</ol>`;
      else h+=`<p class="qzv">Em trả lời: <b>${qzAnsTxt(it,QZ.s.ans[i])}</b> · Đáp án: <b>${qzKeyTxt(it)}</b></p>`;
      if(it.kind!=='ds')h+=`<div class="qzwhy"><b>Lời giải.</b> ${q.sol}</div>`;
      h+='</section>'});
    h+='</div>';
    if(m.tlOrig.length){
      h+=`<h2 class="qzpart">Phần tự luận trong đề in<small>Các câu dưới đây là câu tự luận gốc của đề, kèm lời giải mẫu và thang điểm. Em đọc để biết bài thi thật cần trình bày thế nào.</small></h2><div class="sheet qzsheet">`;
      m.tlOrig.forEach((q,k)=>{const sp=q.parts.length>1&&q.parts[0].html.includes('<br>')?q.parts[0].html.split('<br>'):null;
        h+=`<section class="qzq rv"><div class="qzq-h"><span class="qzn">Câu tự luận ${k+1}</span><span class="qzp">${pts(qPts(q))} điểm</span></div>${sp?`<div class="qzs">${sp[0]}</div>`:''}`;
        q.parts.forEach((p,j)=>{const ph=j===0&&sp?sp.slice(1).join('<br>'):p.html;h+=`<div class="qzs">${q.parts.length>1?`<b>${'abc'[j]})</b> `:''}${ph}</div><div class="qzwhy"><b>Lời giải${q.parts.length>1?' '+'abc'[j]+')':''} (${pts(p.pts)} điểm).</b> ${q.sol[j]}</div>`});
        h+='</section>'});
      h+='</div>';
    }
  }else h+=`<p class="qzsmall muted qzwrapnote">Thầy cô chưa mở phần lời giải cho bài này.</p>`;
  h+='</div>';
  qzEl().innerHTML=prettyMath(h);window.scrollTo(0,0);document.title=`Kết quả – ${m.info.title} – mã ${m.info.code}`;
  document.getElementById('qzPrint').onclick=()=>window.print();
  document.getElementById('qzAgain').onclick=()=>{QZ.s={ans:{},start:Date.now(),name:QZ.s.name,cls:QZ.s.cls};qzSave();qzTestView()};
  document.getElementById('qzNew').onclick=()=>{const P=new URLSearchParams(location.search);let c=+(P.get('c')||101);c=100+((c-100+Math.floor(Math.random()*800)+37)%900);P.set('c',String(c));location.search=P.toString()};
}
function qzInit(){
  const P=new URLSearchParams(location.search);if(P.get('lam')!=='1')return false;
  document.body.dataset.view='quiz';const el=qzEl();el.hidden=false;
  try{QZ.m=qzBuild(P)}catch(e){console.error(e);el.innerHTML=`<div class="qzwrap"><div class="qzcard"><h1>Không mở được bài làm</h1><p>Đường dẫn bài làm không đúng hoặc bị thiếu một phần. Em kiểm tra lại đường dẫn hoặc hỏi thầy cô đường dẫn mới nhé.</p></div></div>`;return true}
  if(!QZ.m.items.length){el.innerHTML='<div class="qzwrap"><div class="qzcard"><h1>Bài này chưa có câu hỏi</h1><p>Em hỏi lại thầy cô đường dẫn khác nhé.</p></div></div>';return true}
  const saved=qzLoad();
  if(saved&&!saved.done&&QZ.m.time&&Date.now()>saved.start+QZ.m.time*60000){QZ.s=saved;QZ.s.done=true;QZ.s.end=saved.start+QZ.m.time*60000;QZ.s.auto=true;qzSave()}
  qzStartView();return true;
}

/* ---------- Giáo viên: hộp “Làm bài online” trên trang tạo đề ---------- */
function qzShareOpen(){
  const dlg=document.getElementById('qzShare');
  const defT=state.mode==='ws'?0:(isVao10()&&state.time===90?120:state.time);
  dlg.querySelector('#qzT').value=String(defT);
  dlg.querySelector('#qzMix').closest('label').hidden=state.mode==='ws'||isV10();
  qzShareUpdate();dlg.hidden=false;dlg.querySelector('#qzLink').focus();
}
function qzShareUpdate(){
  const dlg=document.getElementById('qzShare'),o={time:+dlg.querySelector('#qzT').value||0,sol:dlg.querySelector('#qzSol').checked,mix:dlg.querySelector('#qzMix').checked&&state.mode!=='ws'&&!isV10()};
  const url=qzLink(o);dlg.querySelector('#qzLink').value=url;dlg.querySelector('#qzOpen').href=url.replace(QZ_BASE,location.origin+location.pathname);
  try{dlg.querySelector('#qzQR').innerHTML=QR.svg(url,180)}catch(e){dlg.querySelector('#qzQR').textContent=e.message}
  dlg.querySelector('#qzWhat').textContent=state.mode==='ws'?`Phiếu đang xem (mã ${state.code}).`:`Đề đang xem (mã ${state.code}${isV10()?'':', mã hoán vị đầu tiên'}). Phần tự luận của đề, nếu có, được thay bằng câu trả lời ngắn cùng nội dung.`;
}
(function(){
  if(qzInit())return;
  const b=document.getElementById('qzShareBtn');if(!b)return;
  const dlg=document.getElementById('qzShare');
  b.addEventListener('click',qzShareOpen);
  dlg.addEventListener('change',qzShareUpdate);
  dlg.querySelector('#qzClose').addEventListener('click',()=>{dlg.hidden=true;b.focus()});
  dlg.addEventListener('keydown',e=>{if(e.key==='Escape'){dlg.hidden=true;b.focus()}});
  dlg.querySelector('#qzCopy').addEventListener('click',e=>{const u=dlg.querySelector('#qzLink').value,btn=e.currentTarget;
    const ok=()=>{btn.textContent='Đã chép';setTimeout(()=>btn.textContent='Chép đường dẫn',2000)};
    try{navigator.clipboard.writeText(u).then(ok,()=>{dlg.querySelector('#qzLink').select();document.execCommand('copy');ok()})}catch(_){dlg.querySelector('#qzLink').select();document.execCommand('copy');ok()}});
})();
