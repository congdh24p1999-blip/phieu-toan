/* ================================================================
   Làm bài online: học sinh làm đề hoặc phiếu ngay trên trang, nộp bài, xem điểm và lời giải.
   Không có máy chủ: đề sinh lại từ các tham số trên đường dẫn (cùng mã → cùng đề),
   bài làm lưu tạm trong trình duyệt của học sinh.
   Tham số thêm:
     luyen=1  chế độ luyện tập: kiểm tra từng câu, xem lời giải ngay, làm câu khác cùng dạng
     tl=g     giữ câu tự luận gốc: học sinh làm ra giấy, nộp xong tự chấm theo hướng dẫn chấm
              (mặc định: thay bằng câu trả lời ngắn cùng chương, cùng mức độ, giữ số điểm)
     gs=<id>  gửi kết quả về Google Sheet của giáo viên (mã triển khai Apps Script)
   ================================================================ */
const QZ_BASE='https://congdh24p1999-blip.github.io/phieu-toan/';
const QZ_LV={NB:0,TH:1,VD:2,VDC:3};
const DS_SCORE=[0,.1,.25,.5,1];
const QZ_ROM=['I','II','III','IV','V','VI'];
const GS_RE=/^https:\/\/script\.google\.com\/(?:a\/[^/]+\/)?macros\/s\/([\w-]{20,})\/exec\/?$/;
const gsUrl=id=>`https://script.google.com/macros/s/${id}/exec`;

/* ---------- Đường dẫn: tham số ⇄ trạng thái ---------- */
function qzLinkParams(o){
  const p=new URLSearchParams({lam:'1'});
  if(state.mode==='ws'){p.set('m','ws');p.set('g',state.grade);p.set('les',wsSel().join('.'));p.set('n',state.wsn);p.set('wk',state.wsk)}
  else{p.set('g',state.grade);p.set('k',state.kind);p.set('s',state.struct);if(state.struct==='custom')p.set('cs',['n1','p1','n2','n3','p3','n4'].map(k=>state.cs[k]).join('_'))}
  p.set('d',state.diff);p.set('c',state.code);if(state.ext)p.set('x','1');
  if(o.practice)p.set('luyen','1');else p.set('t',o.time);
  p.set('sol',o.sol?'1':'0');if(o.mix)p.set('tron','1');if(o.keepTL)p.set('tl','g');if(o.gs)p.set('gs',o.gs);
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
/* các câu trong bài làm: {kind,q,pts,orig?} — kind 'tl' là câu tự luận giữ nguyên */
function qzBuild(P){
  const g=+P.get('g')||8,diff=DIFFS[P.get('d')]?P.get('d'):'chuan',code=(P.get('c')||'101').replace(/\D/g,'').slice(0,3)||'101';
  ALLOW_EXT=P.get('x')==='1';CUR_DIFF=diff;
  const key=P.toString(),keepTL=P.get('tl')==='g';let items=[],info={},chName={},tlOrig=[],tn4=false;
  const push=(kind,arr,pts)=>arr.forEach(q=>items.push({kind,q,pts:typeof pts==='function'?pts(q):pts}));
  const addTL=(q,i,pool,used,p)=>{if(keepTL)items.push({kind:'tl',q,pts:p,orig:q});else{items.push({kind:'tln',q:qzPick(pool,q,used,key,i),pts:p,orig:q});tlOrig.push(q)}};
  if(P.get('m')==='ws'){
    const les=(P.get('les')||'').split('.').map(Number).filter(Boolean);
    const n=[10,15,20,30].includes(+P.get('n'))?+P.get('n'):10,wk=['mix','nlc','ds','tln','tl'].includes(P.get('wk'))?P.get('wk'):'mix';
    const w=buildWS({grade:g,lessons:les,n,kind:wk,diff,code,ext:ALLOW_EXT});
    push('nlc',w.nlc,1);push('ds',w.ds,1);push('tln',w.tln,1);
    const pool=Object.values(T.tln).filter(t=>(t.g||8)===g&&(!t.ext||ALLOW_EXT)&&(t.les||[]).some(l=>les.includes(l)));
    const pool2=pool.length?pool:Object.values(T.tln).filter(t=>(t.g||8)===g&&(!t.ext||ALLOW_EXT));
    const used=new Set(items.map(it=>it.q.id));
    w.tl.forEach((q,i)=>addTL(q,i,pool2,used,1));
    chName=WS_CH_NAMES[g]||{};
    info={title:wsIsTN(les)?'Phiếu ôn thi tốt nghiệp THPT':'Phiếu bài tập Toán '+g,sub:wsTitleLes(g,les),code,ws:true,base:code};
  }else{
    const kind=P.get('k')||'gk1',term=termOf(g,kind),s=P.get('s')||'chuan';
    if(g===9&&kind==='tn'&&V10LAYOUT[s]){
      const ex=buildV10(code,diff,s),bp=v10BP(),pool=poolOf(BLUEPRINT['9tn'],'tln'),used=new Set();
      ex.tl.forEach((q,i)=>addTL(q,i,pool,used,qPts(q)));
      chName=bp.chName;info={title:'Đề ôn thi vào lớp 10',sub:'Toán 9 · '+(s==='tlhcm'?'100% tự luận kiểu TP.HCM':'100% tự luận kiểu Hà Nội'),code,base:code};
    }else{
      let st=STRUCTS[s]||STRUCTS.chuan;
      if(s==='custom'){const a=(P.get('cs')||'').split('_').map(Number),o={n1:a[0],p1:a[1],n2:a[2],n3:a[3],p3:a[4],n4:a[5]};if(!structCheck(o))st=o}
      let bp=bpOf(term,st);const ex=buildExam(term,code,diff,st);if(ex.bp)bp=ex.bp;tn4=!!bp.tn;
      let vi=0;if(P.get('tron')==='1'){const k='xdt-tron:'+key;try{vi=+localStorage.getItem(k);if(!(vi>=0&&vi<=3)||localStorage.getItem(k)===null){vi=Math.floor(Math.random()*4);localStorage.setItem(k,vi)}}catch(e){vi=Math.floor(Math.random()*4)}}
      const v=makeVariant(ex,vi);
      push('nlc',v.nlc,bp.pn);push('ds',v.ds,1);push('tln',v.tln,bp.pt);
      const pool=poolOf(bp,'tln'),used=new Set(items.map(it=>it.q.id));
      v.tl.forEach((q,i)=>addTL(q,i,pool,used,qPts(q)));
      chName=bp.chName;info={title:(bp.tn||kind==='tn'?'Đề ':'Đề kiểm tra ')+bp.short.charAt(0).toLowerCase()+bp.short.slice(1),sub:bp.mon,code:v.code,base:code};
    }
  }
  const practice=P.get('luyen')==='1',time=practice?0:Math.min(180,Math.max(0,+P.get('t')||0));
  const gm=(P.get('gs')||'').match(/^[\w-]{20,120}$/);
  const tag=`${practice?'luyen':'kt'}-${g}-${P.get('m')==='ws'?'phieu':(P.get('k')||'gk1')}${keepTL?'-tlg':''}${gm?'-sheet':''}${P.get('tu')==='1'?'-tu':''}`;
  return{items,base:items.map(it=>it.q),info,chName,tlOrig,time,sol:practice||P.get('sol')!=='0',key,keepTL,practice,tn4,gs:gm?gm[0]:'',tu:P.get('tu')==='1',tag};
}
/* câu khác cùng dạng (chế độ luyện tập): sinh lại từ đúng dạng câu đó với hạt giống mới */
function qzCanRegen(it){return !!(T[it.kind]&&T[it.kind][it.q.id])}
function qzRegen(it,seed){
  const t=T[it.kind]&&T[it.kind][it.q.id];if(!t)return null;
  let q=t.gen(new RNG(seed));
  if(QZ.m.tn4&&it.kind==='tln')for(let k=0;k<40&&fmt(q.ans).length>4;k++)q=t.gen(new RNG(seed+'|re'+k));
  q.id=t.id;q.ch=t.ch;q.lv=t.lv;if(t.les)q.les=t.les;return q;
}
function qzApplyReps(){
  const m=QZ.m,rep=(QZ.s&&QZ.s.rep)||{};
  m.items.forEach((it,i)=>{it.q=m.base[i];const n=rep[i]||0;if(n>0){try{const q=qzRegen(it,`luyen|${m.key}|${i}|${n}`);if(q)it.q=q}catch(e){console.error(e)}}
    if(it.kind==='tl')it.orig=it.q});
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
/* hướng dẫn chấm của câu tự luận, tách theo bước: [{j,pts,steps:[{html,pts}]}] */
function qzRubric(q){
  if(q._rb)return q._rb;
  const box=document.createElement('div');
  q._rb=q.parts.map((p,j)=>{box.innerHTML=q.sol[j]||'';
    let steps=[...box.querySelectorAll('ul.st > li')].map(li=>{const b=li.querySelector(':scope > b.pt');const v=b?parseFloat(b.textContent.replace(/[()đ\s]/g,'').replace(',','.')):0;if(b)b.remove();return{html:li.innerHTML.trim(),pts:v}});
    const sum=steps.reduce((a,s)=>a+(s.pts||0),0);
    if(!steps.length||steps.some(s=>!Number.isFinite(s.pts))||Math.abs(sum-p.pts)>1e-6)steps=[{html:q.sol[j]||'',pts:p.pts,whole:true}];
    return{j,pts:p.pts,steps}});
  return q._rb;
}
function qzSelf(i){   /* điểm tự chấm câu tự luận i, đã quy về số điểm của câu trong bài */
  const it=QZ.m.items[i],tk=(QZ.s.tick||{})[i]||{},rb=qzRubric(it.q);let g=0;
  rb.forEach(p=>p.steps.forEach((s,k)=>{if(tk[p.j+'.'+k])g+=s.pts}));
  return g*it.pts/qPts(it.q);
}
function qzGrade(it,a,i){
  if(it.kind==='tl'){if(!QZ.m.sol)return{got:0,ok:false,done:true,ungraded:true};const got=i==null?0:qzSelf(i);return{got,ok:Math.abs(got-it.pts)<1e-9,done:true,self:true}}
  if(it.kind==='nlc'){const ok=a===it.q.ans;return{got:ok?it.pts:0,ok,done:a!=null}}
  if(it.kind==='ds'){const arr=a||[],k=it.q.items.filter((x,i)=>arr[i]!=null&&arr[i]===x.truth).length;return{got:DS_SCORE[k]*it.pts,ok:k===4,k,done:arr.filter(x=>x!=null).length===4}}
  const x=qzNum(a),ok=Number.isFinite(x)&&Math.abs(x-it.q.ans)<1e-6*Math.max(1,Math.abs(it.q.ans));
  return{got:ok?it.pts:0,ok,done:a!=null&&String(a).trim()!==''};
}
function qzScore(){
  const m=QZ.m,res=m.items.map((it,i)=>qzGrade(it,QZ.s.ans[i],i));
  const done=m.items.map((it,i)=>!m.practice||!!QZ.s.chk[i]);   /* luyện tập: chỉ tính câu đã bấm Kiểm tra */
  const gr=m.items.map((it,i)=>!res[i].ungraded&&done[i]);
  const got=res.reduce((a,r,i)=>a+(gr[i]?r.got:0),0),tot=m.items.reduce((a,it,i)=>a+(gr[i]?it.pts:0),0),all=m.items.reduce((a,it)=>a+it.pts,0);
  const self=res.reduce((a,r)=>a+(r.self?r.got:0),0);
  return{res,gr,done,got,tot,all,self,ungraded:res.some(r=>r.ungraded),nDone:done.filter(Boolean).length,sc10:tot?Math.round(got/tot*1000)/100:0,nOK:res.filter((r,i)=>r.ok&&done[i]).length};
}

/* ---------- Đếm lượt dùng (không gửi họ tên, bài làm) và lịch sử làm bài trên máy ---------- */
function qzTrack(n,once){if(once){QZ.once=QZ.once||{};if(QZ.once[n])return;QZ.once[n]=1}if(typeof trackEv==='function')trackEv(`${n}/${QZ.m.tag}`)}
function qzHist(){try{const L=JSON.parse(localStorage.getItem('xdt-hist')||'[]');return Array.isArray(L)?L:[]}catch(e){return[]}}
function qzHistPut(extra){
  try{const m=QZ.m,L=qzHist().filter(x=>x.k!==m.key);
    L.unshift(Object.assign({k:m.key,q:location.search,t:m.info.title,s:m.info.sub,c:m.info.code,p:m.practice?1:0,at:Date.now()},extra));
    localStorage.setItem('xdt-hist',JSON.stringify(L.slice(0,12)))}catch(e){}
}
function qzHistDone(){const S=qzScore();qzHistPut({done:1,sc:S.ungraded||!S.tot?null:S.sc10,got:r2(S.got),tot:S.tot,nd:S.nDone,nt:QZ.m.items.length})}

/* ---------- Giao diện học sinh ---------- */
const QZ={};
function qzStoreKey(){return 'xdt-lam:'+QZ.m.key}
function qzLoad(){try{return JSON.parse(localStorage.getItem(qzStoreKey())||'null')}catch(e){return null}}
function qzSave(){try{localStorage.setItem(qzStoreKey(),JSON.stringify(QZ.s))}catch(e){}}
function qzNewState(nm){return Object.assign({ans:{},start:Date.now(),chk:{},rep:{},tick:{},aid:Date.now().toString(36)+Math.random().toString(36).slice(2,7)},nm||{})}
const qzEl=()=>document.getElementById('qz');
const KIND_NAME={nlc:'Nhiều phương án lựa chọn',ds:'Đúng – Sai',tln:'Trả lời ngắn'};

function qzPartsOf(items){
  const parts=[];items.forEach((it,i)=>{const k=it.kind==='tl'?'tlg':it.orig?'tl':it.kind;let p=parts[parts.length-1];if(!p||p.k!==k){p={k,idx:[]};parts.push(p)}p.idx.push(i)});return parts;
}
function qzPartTitle(p){
  if(p.k==='tlg')return['Tự luận',QZ.m.sol?'Em làm các câu này ra giấy. Nộp bài xong, em tự chấm theo hướng dẫn chấm bằng cách đánh dấu từng bước em làm đúng.':'Em làm các câu này ra giấy và nộp cho thầy cô chấm. Điểm online chưa tính phần này.'];
  if(p.k==='tl')return['Trả lời ngắn (thay cho phần tự luận)','Mỗi câu thay một câu tự luận của đề in, cùng chương, cùng mức độ và cùng số điểm. Gõ đáp số; số thập phân dùng dấu phẩy hoặc dấu chấm đều được.'];
  if(p.k==='nlc')return[KIND_NAME.nlc,'Chạm vào phương án em chọn.'];
  if(p.k==='ds')return[KIND_NAME.ds,'Với mỗi ý a), b), c), d), chọn Đúng hoặc Sai.'];
  return[KIND_NAME.tln,'Gõ đáp số; số thập phân dùng dấu phẩy hoặc dấu chấm đều được.'];
}
/* đề bài câu tự luận: tách phần dẫn chung nếu ý a) mở đầu bằng đoạn chung */
function qzTLStem(q){
  const sp=q.parts.length>1&&q.parts[0].html.includes('<br>')?q.parts[0].html.split('<br>'):null;
  return{lead:sp?sp[0]:'',parts:q.parts.map((p,j)=>j===0&&sp?sp.slice(1).join('<br>'):p.html)};
}
function qzTLBody(q,withPts){
  const s=qzTLStem(q);
  return(s.lead?`<div class="qzs">${s.lead}</div>`:'')+s.parts.map((h,j)=>`<div class="qzs">${q.parts.length>1?`<b>${'abcd'[j]})</b> `:''}${h}${withPts&&q.parts.length>1?` <span class="qzpp">(${pts(q.parts[j].pts)} điểm)</span>`:''}</div>`).join('');
}
function qzQuestionHTML(it,i,ro){
  if(QZ.m.practice&&QZ.s.chk[i])return qzReviewHTML(it,i,true);
  const q=it.q,a=QZ.s.ans[i];
  let h=`<section class="qzq" id="qzq${i}" data-i="${i}"><div class="qzq-h"><span class="qzn">Câu ${i+1}</span><span class="qzp">${pts(it.pts)} điểm</span></div>`;
  if(it.kind==='tl')h+=qzTLBody(q,true)+(QZ.m.practice?'':`<p class="qzpaper">Làm ra giấy</p>`);
  else h+=`<div class="qzs">${q.stem}</div>`;
  if(it.kind==='nlc'){
    h+=`<div class="qzopts ${optClass(q.opts)}" role="radiogroup" aria-label="Các phương án câu ${i+1}">${q.opts.map((o,j)=>`<button type="button" class="qzo${a===j?' on':''}" role="radio" aria-checked="${a===j}" data-a="${j}"${ro?' disabled':''}><b>${LET[j]}</b><span>${o}</span></button>`).join('')}</div>`;
  }else if(it.kind==='ds'){
    const arr=a||[];
    h+=`<ol class="qzys">${q.items.map((x,j)=>`<li><div class="qzy"><b>${'abcd'[j]})</b> ${x.text}</div><div class="qztf" role="radiogroup" aria-label="Ý ${'abcd'[j]}"><button type="button" class="qzb${arr[j]===true?' on':''}" data-j="${j}" data-v="1" aria-pressed="${arr[j]===true}"${ro?' disabled':''}>Đúng</button><button type="button" class="qzb${arr[j]===false?' on':''}" data-j="${j}" data-v="0" aria-pressed="${arr[j]===false}"${ro?' disabled':''}>Sai</button></div></li>`).join('')}</ol>`;
  }else if(it.kind==='tln'){
    h+=`<label class="qzin"><span>Đáp số</span><input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" value="${a!=null?esc(a):''}" data-i="${i}"${ro?' disabled':''}>${q.unit?`<em>${UNIT_TXT(q.unit).trim()}</em>`:''}</label>`;
  }
  if(QZ.m.practice&&!ro)h+=`<div class="qzact"><button type="button" class="btn sm" data-act="chk">${it.kind==='tl'?'Làm xong, xem hướng dẫn chấm':'Kiểm tra'}</button></div>`;
  return h+'</section>';
}
/* một câu ở dạng xem lại: đáp án, lời giải; câu tự luận có ô tự chấm */
function qzReviewHTML(it,i,live){
  const r=qzGrade(it,QZ.s.ans[i],i),q=it.q,a=QZ.s.ans[i];
  const st=it.kind==='tl'?(r.ungraded?'':'self'):r.ok?'ok':r.got>0?'part':'bad';
  const lab=it.kind==='tl'?(r.ungraded?'Thầy cô chấm':`Tự chấm: <span class="qzsg" data-i="${i}">${pts(r2(r.got))}</span>/${pts(it.pts)} điểm`)
    :`${st==='ok'?'Đúng':st==='part'?`Đúng ${r.k}/4 ý`:a==null||(it.kind==='ds'&&!(a||[]).some(x=>x!=null))?'Bỏ trống':'Chưa đúng'} · ${pts(r2(r.got))}/${pts(it.pts)} điểm`;
  let h=`<section class="qzq rv ${st}" id="qzq${i}" data-i="${i}"><div class="qzq-h"><span class="qzn">Câu ${i+1}</span><span class="qzp">${lab}</span></div>`;
  if(it.kind==='tl'){
    const s=qzTLStem(q),rb=qzRubric(q),tk=(QZ.s.tick||{})[i]||{};
    if(s.lead)h+=`<div class="qzs">${s.lead}</div>`;
    rb.forEach((p,j)=>{
      h+=`<div class="qzs">${q.parts.length>1?`<b>${'abcd'[j]})</b> `:''}${s.parts[j]}</div>`;
      if(r.ungraded){h+=`<div class="qzwhy"><b>Lời giải${q.parts.length>1?' '+'abcd'[j]+')':''} (${pts(p.pts)} điểm).</b> ${q.sol[j]}</div>`;return}
      h+=`<fieldset class="qzrb"><legend>Hướng dẫn chấm${q.parts.length>1?' ý '+'abcd'[j]+')':''} · ${pts(p.pts)} điểm. Đánh dấu bước em làm đúng:</legend>${p.steps.map((x,k)=>!x.pts&&!x.whole?`<div class="qzst0">${x.html}</div>`:`<label class="qzst"><input type="checkbox" data-i="${i}" data-s="${p.j}.${k}"${tk[p.j+'.'+k]?' checked':''}><span class="qzstt">${x.whole?'Em làm đúng toàn bộ ý này. <span class="qzwh">'+x.html+'</span>':x.html}</span><b>${pts(x.pts)} đ</b></label>`).join('')}</fieldset>`});
    return h+qzBugLink(it,i)+'</section>';
  }
  h+=`<div class="qzs">${q.stem}</div>`;
  if(it.kind==='nlc')h+=`<div class="qzopts ${optClass(q.opts)}">${q.opts.map((o,j)=>`<div class="qzo ro${j===q.ans?' key':''}${a===j&&j!==q.ans?' wrong':''}"><b>${LET[j]}</b><span>${o}</span></div>`).join('')}</div>`;
  if(it.kind==='ds')h+=`<ol class="qzys">${q.items.map((x,j)=>{const v=(a||[])[j];return`<li class="${v==null?'':v===x.truth?'ok':'bad'}"><div class="qzy"><b>${'abcd'[j]})</b> ${x.text}</div><div class="qzv">Em chọn: <b>${v==null?'–':v?'Đúng':'Sai'}</b> · Đáp án: <b>${x.truth?'Đúng':'Sai'}</b></div><div class="qzwhy">${x.why}</div></li>`}).join('')}</ol>`;
  else h+=`<p class="qzv">Em trả lời: <b>${qzAnsTxt(it,a)}</b> · Đáp án: <b>${qzKeyTxt(it)}</b></p>`;
  if(it.kind!=='ds')h+=`<div class="qzwhy"><b>Lời giải.</b> ${q.sol}</div>`;
  if(live&&qzCanRegen(it))h+=`<div class="qzact"><button type="button" class="btn alt sm" data-act="new">Làm câu khác cùng dạng</button></div>`;
  return h+qzBugLink(it,i)+'</section>';
}
/* học sinh báo câu sai: mở form báo lỗi, điền sẵn đề, số câu, dạng câu (không gửi họ tên, không gửi địa chỉ thu điểm) */
function qzBugUrl(it,i){
  if(typeof SITE_CFG==='undefined'||!SITE_CFG.form)return'';
  const m=QZ.m,P=new URLSearchParams(location.search);P.delete('gs');
  const n=(QZ.s.rep||{})[i]||0;
  const info=`Làm online · ${m.info.title} · ${m.info.sub} · mã ${m.info.code} · câu ${i+1} (${it.kind==='tl'?'tự luận':it.orig?'trả lời ngắn thay tự luận':KIND_NAME[it.kind].toLowerCase()}) · dạng ${it.q.id||'?'}${n?` · câu làm thêm lần ${n}`:''} · ${QZ_BASE}?${P.toString()}`;
  const q=new URLSearchParams({usp:'pp_url'});if(SITE_CFG.formInfo)q.set(SITE_CFG.formInfo,info);
  return SITE_CFG.form+'?'+q.toString();
}
function qzBugLink(it,i){const u=qzBugUrl(it,i);return u?`<p class="qzbugp noprint"><a class="qzbug" href="${esc(u)}" target="_blank" rel="noopener">Báo câu này sai</a></p>`:''}
function qzTLLive(it,i){   /* chế độ luyện tập: câu tự luận đã xem hướng dẫn chấm vẫn có nút câu khác */
  return qzCanRegen(it)?`<div class="qzact"><button type="button" class="btn alt sm" data-act="new">Làm câu khác cùng dạng</button></div>`:'';
}
function qzDone(i){const it=QZ.m.items[i];if(QZ.m.practice)return!!QZ.s.chk[i];return qzGrade(it,QZ.s.ans[i],i).done}
function qzUpdateBar(){
  const m=QZ.m,n=m.items.length,c=document.getElementById('qzCount');
  if(m.practice){const ck=m.items.map((_,i)=>i).filter(i=>QZ.s.chk[i]&&m.items[i].kind!=='tl'),ok=ck.filter(i=>qzGrade(m.items[i],QZ.s.ans[i],i).ok).length;
    if(c)c.textContent=`Kiểm tra ${Object.keys(QZ.s.chk).length}/${n} câu, đúng ${ok}`}
  else{const d=m.items.filter((it,i)=>it.kind!=='tl'&&qzDone(i)).length,nn=m.items.filter(it=>it.kind!=='tl').length;if(c)c.textContent=`Đã làm ${d}/${nn} câu`}
  document.querySelectorAll('#qzNav button').forEach(b=>{const i=+b.dataset.i;b.classList.toggle('on',m.items[i].kind!=='tl'?qzDone(i):!!QZ.s.chk[i])});
}
function qzClock(){
  const el=document.getElementById('qzTime');if(!el||!QZ.m.time||QZ.s.done)return;
  const left=Math.max(0,QZ.s.start+QZ.m.time*60000-Date.now()),m=Math.floor(left/60000),s=Math.floor(left%60000/1000);
  el.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;el.classList.toggle('low',left<5*60000);
  if(left<=0){qzSubmit(true)}
}
function qzStartView(){
  const m=QZ.m,saved=QZ.saved,n=m.items.length,tot=m.items.reduce((a,it)=>a+it.pts,0);
  document.title=`${m.practice?'Luyện tập':'Làm bài online'} – ${m.info.title} – mã ${m.info.code}`;
  const counts=['nlc','ds','tln'].map(k=>[k,m.items.filter(it=>it.kind===k&&!it.orig).length]).filter(x=>x[1]);
  const tl=m.items.filter(it=>it.orig&&it.kind!=='tl').length,tlg=m.items.filter(it=>it.kind==='tl').length;
  const what=counts.map(([k,c])=>`${c} câu ${KIND_NAME[k].toLowerCase()}`);
  if(tl)what.push(`${tl} câu trả lời ngắn thay cho phần tự luận của đề in`);
  if(tlg)what.push(`${tlg} câu tự luận làm ra giấy${m.sol?', nộp xong tự chấm theo hướng dẫn chấm':''}`);
  const how=m.practice?'Làm câu nào bấm Kiểm tra câu đó để biết đúng sai và xem lời giải ngay; câu nào sai có thể làm thêm câu khác cùng dạng.':'Nộp bài là có điểm'+(m.sol?' và lời giải':'')+' ngay.';
  qzEl().innerHTML=`<div class="qzwrap">${m.tu?'<a class="qzback" href="?tuluyen=1">← Chọn bài khác</a>':''}<div class="qzcard qzstart">
    <p class="qzbrand">Xưởng đề Toán · ${m.practice?'Luyện tập online':'Làm bài online'}</p>
    <h1>${esc(m.info.title)}</h1><p class="qzsub">${esc(m.info.sub)} · Mã ${esc(m.info.code)}</p>
    <ul class="qzfacts"><li><b>${n}</b> câu</li><li><b>${m.time?m.time+' phút':'Không giới hạn'}</b> thời gian</li><li><b>${pts(tot)}</b> điểm</li></ul>
    <p class="qzsmall">${what.join(', ')}. ${how}</p>
    ${saved&&saved.done?`<p class="qznote">${saved.auto?'Bài này đã hết giờ và được tự nộp':m.practice?'Em đã kết thúc lượt luyện tập này':'Em đã nộp bài này'} lúc ${new Date(saved.end).toLocaleString('vi-VN')}.</p>`:saved?`<p class="qznote">Em đang làm dở bài này (đã trả lời ${Object.keys(saved.ans||{}).length} câu).</p>`:''}
    <div class="qzform"><label><span>Họ và tên${m.gs?' (bắt buộc)':''}</span><input id="qzName" type="text" autocomplete="name" maxlength="60" value="${esc(saved&&saved.name||'')}"${m.gs?' required aria-required="true"':''}></label><label><span>Lớp</span><input id="qzCls" type="text" maxlength="12" value="${esc(saved&&saved.cls||'')}"></label></div>
    <p class="qzerr" id="qzErr" role="alert" hidden>Em nhập họ và tên để thầy cô biết bài của ai nhé.</p>
    <div class="qzbtns">${saved&&saved.done?`<button class="btn" id="qzSee" type="button">Xem kết quả</button><button class="btn alt" id="qzRedo" type="button">Làm lại từ đầu</button>`:`<button class="btn" id="qzGo" type="button">${saved?'Làm tiếp':m.practice?'Bắt đầu luyện tập':'Bắt đầu làm bài'}</button>${saved?'<button class="btn alt" id="qzRedo" type="button">Làm lại từ đầu</button>':''}`}</div>
    <p class="qzsmall muted">${m.gs?`Khi ${m.practice?'kết thúc':'nộp bài'}, họ tên, lớp và kết quả của em được gửi về bảng điểm của thầy cô. Bài đang làm lưu trên máy này.`:'Bài làm chỉ lưu trên máy này, không gửi đi đâu. Họ tên, lớp dùng để in trên phiếu kết quả.'}</p>
  </div></div>`;
  const nm=()=>({name:document.getElementById('qzName').value.trim(),cls:document.getElementById('qzCls').value.trim()});
  const need=()=>{if(m.gs&&!nm().name){const e=document.getElementById('qzErr');e.hidden=false;document.getElementById('qzName').focus();return false}return true};
  const go=document.getElementById('qzGo');if(go)go.onclick=()=>{if(!need())return;QZ.s=saved?Object.assign(saved,nm()):qzNewState(nm());qzFix();qzSave();qzApplyReps();qzTrack('hs-bat-dau');qzHistPut({done:0});qzTestView()};
  const see=document.getElementById('qzSee');if(see)see.onclick=()=>{QZ.s=Object.assign(saved,nm());qzFix();qzSave();qzApplyReps();qzResultView()};
  const redo=document.getElementById('qzRedo');if(redo)redo.onclick=()=>{if(!need())return;QZ.s=qzNewState(nm());qzSave();QZ.saved=null;qzApplyReps();qzTrack('hs-bat-dau');qzHistPut({done:0});qzTestView()};
}
function qzFix(){const s=QZ.s;s.ans=s.ans||{};s.chk=s.chk||{};s.rep=s.rep||{};s.tick=s.tick||{};if(!s.aid)s.aid=(s.start||Date.now()).toString(36)+Math.random().toString(36).slice(2,7)}
function qzTestView(){
  const m=QZ.m,parts=qzPartsOf(m.items);
  let h=`<div class="qzbar" role="toolbar" aria-label="Thanh làm bài"><span class="qzt" id="qzTime" aria-live="off"></span><span class="qzc" id="qzCount"></span><button type="button" class="btn alt sm" id="qzNavBtn" aria-expanded="false" aria-controls="qzNav"><span class="qznb-l">Danh sách câu</span><span class="qznb-s">Câu</span></button><button type="button" class="btn sm" id="qzSubmit">${m.practice?'Kết thúc':'Nộp bài'}</button></div>
  <nav class="qznav" id="qzNav" hidden aria-label="Chuyển nhanh đến câu">${m.items.map((_,i)=>`<button type="button" data-i="${i}">${i+1}</button>`).join('')}</nav><div class="qzwrap"><div class="qzhead"><b>${esc(m.info.title)}</b> · ${esc(m.info.sub)} · Mã ${esc(m.info.code)}${QZ.s.name?` · ${esc(QZ.s.name)}`:''}</div>`;
  parts.forEach((p,pi)=>{const [t,s]=qzPartTitle(p);h+=`<h2 class="qzpart">Phần ${QZ_ROM[pi]}. ${t}<small>${s}</small></h2>`;h+=`<div class="sheet qzsheet">${p.idx.map(i=>qzQuestionHTML(m.items[i],i,false)).join('')}</div>`});
  h+=`<div class="qzend"><button type="button" class="btn" id="qzSubmit2">${m.practice?'Kết thúc và xem tổng kết':'Nộp bài'}</button></div></div>`;
  qzEl().innerHTML=prettyMath(h);window.scrollTo(0,0);
  m.items.forEach((it,i)=>{if(m.practice&&QZ.s.chk[i]&&it.kind==='tl')qzAppendTLLive(i)});
  const root=qzEl();
  root.onclick=qzClick;root.oninput=qzInput;root.onchange=qzTick;
  document.getElementById('qzSubmit').onclick=()=>qzSubmit(false);document.getElementById('qzSubmit2').onclick=()=>qzSubmit(false);
  const nb=document.getElementById('qzNavBtn'),nav=document.getElementById('qzNav');
  nb.onclick=()=>{nav.hidden=!nav.hidden;nb.setAttribute('aria-expanded',String(!nav.hidden))};
  nav.onclick=e=>{const b=e.target.closest('button');if(!b)return;document.getElementById('qzq'+b.dataset.i).scrollIntoView({behavior:'smooth',block:'start'});nav.hidden=true;nb.setAttribute('aria-expanded','false')};
  qzUpdateBar();clearInterval(QZ.tick);if(m.time){qzClock();QZ.tick=setInterval(qzClock,1000)}
}
function qzAppendTLLive(i){const sec=document.getElementById('qzq'+i);if(sec)sec.insertAdjacentHTML('beforeend',qzTLLive(QZ.m.items[i],i))}
function qzRenderQ(i){
  const sec=document.getElementById('qzq'+i);if(!sec)return;
  const it=QZ.m.items[i],tmp=document.createElement('div');tmp.innerHTML=prettyMath(qzQuestionHTML(it,i,false));
  const n=tmp.firstElementChild;sec.replaceWith(n);
  if(QZ.m.practice&&QZ.s.chk[i]&&it.kind==='tl')qzAppendTLLive(i);
}
function qzClick(e){
  if(QZ.s.done)return;
  const act=e.target.closest('[data-act]');
  if(act){const sec=act.closest('.qzq'),i=+sec.dataset.i;
    if(act.dataset.act==='chk'){qzTrack('hs-kiem-tra',1);QZ.s.chk[i]=1;qzSave();qzRenderQ(i);qzUpdateBar();const s2=document.getElementById('qzq'+i);if(s2){const b=s2.querySelector('[data-act],input[type=checkbox]');if(b)b.focus({preventScroll:true})}}
    if(act.dataset.act==='new'){qzTrack('hs-cau-khac',1);QZ.s.rep[i]=(QZ.s.rep[i]||0)+1;delete QZ.s.chk[i];delete QZ.s.ans[i];delete QZ.s.tick[i];
      try{const q=qzRegen(QZ.m.items[i],`luyen|${QZ.m.key}|${i}|${QZ.s.rep[i]}`);if(q){QZ.m.items[i].q=q;if(QZ.m.items[i].kind==='tl')QZ.m.items[i].orig=q}}catch(err){console.error(err)}
      qzSave();qzRenderQ(i);qzUpdateBar();const s2=document.getElementById('qzq'+i);if(s2){s2.scrollIntoView({block:'start'});const f=s2.querySelector('button,input');if(f)f.focus({preventScroll:true})}}
    return}
  const o=e.target.closest('.qzo'),b=e.target.closest('.qzb');
  if(o&&!o.disabled&&!o.classList.contains('ro')){const sec=o.closest('.qzq'),i=+sec.dataset.i,j=+o.dataset.a;QZ.s.ans[i]=QZ.s.ans[i]===j?undefined:j;if(QZ.s.ans[i]===undefined)delete QZ.s.ans[i];
    sec.querySelectorAll('.qzo').forEach(x=>{const on=+x.dataset.a===QZ.s.ans[i];x.classList.toggle('on',on);x.setAttribute('aria-checked',String(on))});qzSave();qzUpdateBar()}
  if(b&&!b.disabled){const sec=b.closest('.qzq'),i=+sec.dataset.i,j=+b.dataset.j,v=b.dataset.v==='1';const arr=QZ.s.ans[i]||[null,null,null,null];arr[j]=arr[j]===v?null:v;QZ.s.ans[i]=arr;
    sec.querySelectorAll(`.qzb[data-j="${j}"]`).forEach(x=>{const on=arr[j]===(x.dataset.v==='1');x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on))});qzSave();qzUpdateBar()}
}
function qzInput(e){
  const t=e.target;if(!t.matches('.qzin input')||QZ.s.done)return;const i=+t.dataset.i;
  if(t.value.trim())QZ.s.ans[i]=t.value;else delete QZ.s.ans[i];qzSave();qzUpdateBar();
}
/* đánh dấu bước làm đúng trong hướng dẫn chấm (tự chấm câu tự luận) */
function qzTick(e){
  const t=e.target;if(!t.matches('.qzrb input[type=checkbox]'))return;
  qzTrack('hs-tu-cham',1);const i=+t.dataset.i;QZ.s.tick[i]=QZ.s.tick[i]||{};if(t.checked)QZ.s.tick[i][t.dataset.s]=1;else delete QZ.s.tick[i][t.dataset.s];qzSave();
  const g=document.querySelector(`.qzsg[data-i="${i}"]`);if(g)g.textContent=pts(r2(qzSelf(i)));
  if(document.getElementById('qzScoreBox')){qzScoreBoxRender();if(QZ.s.done)qzHistDone()}
  const sb=document.getElementById('qzSendBtn');if(sb&&QZ.m.gs){sb.hidden=false;sb.textContent='Gửi lại kết quả (đã tự chấm)'}
}
function qzSubmit(auto){
  if(QZ.s.done)return;
  const m=QZ.m,n=m.items.length;
  if(!auto){
    if(m.practice){const miss=n-Object.keys(QZ.s.chk).length;if(miss&&!confirm(`Còn ${miss}/${n} câu em chưa kiểm tra. Em vẫn kết thúc lượt luyện tập?`))return}
    else{const miss=m.items.filter((it,i)=>it.kind!=='tl'&&!qzDone(i)).length;if(miss&&!confirm(`Còn ${miss}/${m.items.filter(it=>it.kind!=='tl').length} câu chưa làm xong. Em vẫn nộp bài?`))return}
  }
  clearInterval(QZ.tick);QZ.s.done=true;QZ.s.end=Date.now();QZ.s.auto=!!auto;qzSave();qzTrack(auto?'hs-het-gio':'hs-nop');qzHistDone();qzResultView();
  if(m.gs)qzSend();
}
function qzAnsTxt(it,a){
  if(it.kind==='nlc')return a==null?'(bỏ trống)':LET[a];
  if(it.kind==='ds')return(a||[]).some(x=>x!=null)?'abcd'.split('').map((c,j)=>`${c}) ${a[j]==null?'–':a[j]?'Đ':'S'}`).join(' '):'(bỏ trống)';
  return a==null||String(a).trim()===''?'(bỏ trống)':esc(a);
}
function qzKeyTxt(it){
  if(it.kind==='nlc')return`${LET[it.q.ans]}`;
  if(it.kind==='ds')return it.q.items.map((x,j)=>`${'abcd'[j]}) ${x.truth?'Đ':'S'}`).join(' ');
  return fmt(it.q.ans)+UNIT_TXT(it.q.unit);
}
function qzChLabel(c){const nm=QZ.m.chName&&QZ.m.chName[c];return c>100?`Chủ đề ${c-100}${nm?'. '+nm:''}`:`Chương ${ROM10[c]||c}${nm?'. '+nm:''}`}
function qzScoreBoxHTML(){
  const m=QZ.m,S=qzScore(),parts=qzPartsOf(m.items);
  const byCh={};m.items.forEach((it,i)=>{if(!S.gr[i])return;const c=it.q.ch;(byCh[c]=byCh[c]||{got:0,tot:0,n:0}).got+=S.res[i].got;byCh[c].tot+=it.pts;byCh[c].n++});
  const weak=Object.entries(byCh).map(([c,v])=>({c:+c,...v,r:v.got/v.tot})).sort((a,b)=>a.r-b.r).filter(x=>x.r<.7).slice(0,5);
  const n=m.items.length;
  if(m.practice&&!S.nDone)return`<div class="qzscore"><span class="big">–</span><span class="of">chưa có điểm</span></div><p class="qzsmall">Em chưa bấm Kiểm tra câu nào nên chưa có điểm. Bấm “Luyện tiếp” để làm tiếp lượt này.</p>`;
  const big=m.practice?`<div class="qzscore"><span class="big" id="qzBig">${pts(S.sc10)}</span><span class="of">/ 10 điểm</span></div><p class="qzsmall">Tính trên ${S.nDone}/${n} câu em đã làm${S.nDone<n?'; các câu chưa làm không tính vào điểm':''}.</p>`
    :S.ungraded?`<div class="qzscore"><span class="big">${pts(r2(S.got))}</span><span class="of">/ ${pts(S.tot)} điểm phần chấm online</span></div><p class="qzsmall">Phần tự luận (${pts(S.all-S.tot)} điểm) do thầy cô chấm trên bài giấy.</p>`
    :`<div class="qzscore"><span class="big" id="qzBig">${pts(S.sc10)}</span><span class="of">/ 10 điểm</span></div>`;
  const nOKa=S.res.filter((r,i)=>r.ok&&S.done[i]&&m.items[i].kind!=='tl').length;
  const nAutoD=m.items.filter((it,i)=>it.kind!=='tl'&&S.done[i]).length;
  return big+`<p class="qzsmall">${nAutoD?`Đúng hoàn toàn ${nOKa}/${nAutoD} câu chấm tự động · `:''}Đạt ${pts(r2(S.got))}/${pts(S.tot)} điểm${m.practice?' của các câu đã làm':''}${S.self>0||m.items.some(it=>it.kind==='tl')&&m.sol?`, trong đó tự luận tự chấm ${pts(r2(S.self))} điểm`:''}.</p>
    <table class="qztbl"><thead><tr><th scope="col">Phần</th><th scope="col">Số câu</th><th scope="col">Điểm</th></tr></thead><tbody>${parts.map((p,pi)=>{const ix=p.idx.filter(i=>S.done[i]),g=ix.reduce((a,i)=>a+S.res[i].got,0),t=ix.reduce((a,i)=>a+m.items[i].pts,0);return`<tr><td>${QZ_ROM[pi]}. ${qzPartTitle(p)[0]}</td><td>${m.practice?`${ix.length}/${p.idx.length}`:p.idx.length}</td><td>${p.k==='tlg'&&!m.sol?'thầy cô chấm':ix.length?`${pts(r2(g))}/${pts(t)}`:'chưa làm'}</td></tr>`}).join('')}</tbody></table>
    ${weak.length?`<h2 class="qzh2">Nội dung cần ôn lại</h2><ul class="qzweak">${weak.map(x=>`<li>${esc(qzChLabel(x.c))}: đạt ${Math.round(x.r*100)}% số điểm (${x.n} câu)</li>`).join('')}</ul>`:`<p class="qzgood">Em làm tốt đều các chương trong bài này.</p>`}`;
}
function qzScoreBoxRender(){const b=document.getElementById('qzScoreBox');if(b)b.innerHTML=qzScoreBoxHTML()}
function qzResultView(){
  const m=QZ.m,used=Math.round(((QZ.s.end||Date.now())-QZ.s.start)/60000),hasTLg=m.items.some(it=>it.kind==='tl');
  let h=`<div class="qzwrap">${m.tu?'<a class="qzback noprint" href="?tuluyen=1">← Chọn bài khác</a>':''}<div class="qzcard qzres">
    <p class="qzbrand">Xưởng đề Toán · ${m.practice?'Tổng kết lượt luyện tập':'Kết quả làm bài online'}</p>
    <h1>${esc(m.info.title)}</h1><p class="qzsub">${esc(m.info.sub)} · Mã ${esc(m.info.code)}</p>
    <p class="qzwho">${QZ.s.name?`Học sinh: <b>${esc(QZ.s.name)}</b>`:'Học sinh: ……………………'}${QZ.s.cls?` · Lớp <b>${esc(QZ.s.cls)}</b>`:''} · ${m.practice?'Kết thúc':'Nộp'} lúc ${new Date(QZ.s.end).toLocaleString('vi-VN')}${QZ.s.auto?' (hết giờ, tự nộp)':''} · Thời gian làm ${used<1?'dưới 1':used} phút</p>
    <div id="qzScoreBox">${qzScoreBoxHTML()}</div>
    ${hasTLg&&m.sol?`<p class="qznote noprint">Phần tự luận: em đối chiếu bài làm trên giấy với hướng dẫn chấm ở cuối trang, đánh dấu các bước em làm đúng. Điểm ở trên tự cập nhật.</p>`:''}
    ${m.tlOrig.length?`<p class="qzsmall muted">Điểm trên là điểm của bài làm online, trong đó phần tự luận của đề in được thay bằng câu trả lời ngắn; thi thật còn chấm cả cách trình bày.</p>`:''}
    ${m.practice?`<p class="qzsmall muted">Trong chế độ luyện tập, câu em đổi sang câu khác cùng dạng được tính theo câu làm sau cùng.</p>`:''}
    ${m.gs?`<p class="qzsend" id="qzSend" role="status"></p>`:''}
    <div class="qzbtns noprint">${m.gs?`<button class="btn alt" id="qzSendBtn" type="button" hidden>Gửi lại kết quả</button>`:''}${m.practice&&Object.keys(QZ.s.chk).length<m.items.length?'<button class="btn" id="qzMore" type="button">Luyện tiếp</button>':''}<button class="btn${m.practice&&Object.keys(QZ.s.chk).length<m.items.length?' alt':''}" id="qzPrint" type="button">In / lưu PDF phiếu kết quả</button><button class="btn alt" id="qzAgain" type="button">Làm lại bài này</button><button class="btn alt" id="qzNew" type="button">Làm đề khác cùng loại</button></div>
  </div>`;
  if(m.sol){
    h+=`<h2 class="qzpart">Xem lại từng câu</h2><div class="sheet qzsheet">${m.items.map((it,i)=>qzReviewHTML(it,i,false)).join('')}</div>`;
    if(m.tlOrig.length){
      h+=`<h2 class="qzpart">Phần tự luận trong đề in<small>Các câu dưới đây là câu tự luận gốc của đề, kèm lời giải mẫu và thang điểm. Em đọc để biết bài thi thật cần trình bày thế nào.</small></h2><div class="sheet qzsheet">`;
      m.tlOrig.forEach((q,k)=>{const s=qzTLStem(q);
        h+=`<section class="qzq rv"><div class="qzq-h"><span class="qzn">Câu tự luận ${k+1}</span><span class="qzp">${pts(qPts(q))} điểm</span></div>${s.lead?`<div class="qzs">${s.lead}</div>`:''}`;
        q.parts.forEach((p,j)=>{h+=`<div class="qzs">${q.parts.length>1?`<b>${'abc'[j]})</b> `:''}${s.parts[j]}</div><div class="qzwhy"><b>Lời giải${q.parts.length>1?' '+'abc'[j]+')':''} (${pts(p.pts)} điểm).</b> ${q.sol[j]}</div>`});
        h+='</section>'});
      h+='</div>';
    }
  }else h+=`<p class="qzsmall muted qzwrapnote">Thầy cô chưa mở phần lời giải cho bài này.</p>`;
  h+='</div>';
  qzEl().innerHTML=prettyMath(h);window.scrollTo(0,0);document.title=`Kết quả – ${m.info.title} – mã ${m.info.code}`;
  const root=qzEl();root.onclick=null;root.oninput=null;root.onchange=qzTick;
  document.getElementById('qzPrint').onclick=()=>window.print();
  const more=document.getElementById('qzMore');if(more)more.onclick=()=>{QZ.s.done=false;delete QZ.s.end;delete QZ.s.auto;qzSave();qzHistPut({done:0});qzTestView();
    const i=m.items.findIndex((_,k)=>!QZ.s.chk[k]);const sec=i>=0&&document.getElementById('qzq'+i);if(sec)sec.scrollIntoView({block:'start'})};
  document.getElementById('qzAgain').onclick=()=>{QZ.s=qzNewState({name:QZ.s.name,cls:QZ.s.cls});qzSave();qzApplyReps();qzTestView()};
  document.getElementById('qzNew').onclick=()=>{const P=new URLSearchParams(location.search);let c=+(P.get('c')||101);c=100+((c-100+Math.floor(Math.random()*800)+37)%900);P.set('c',String(c));location.search=P.toString()};
  const sb=document.getElementById('qzSendBtn');if(sb)sb.onclick=()=>qzSend();
  if(m.gs)qzSendStatus();
}

/* ---------- Gửi kết quả về Google Sheet của giáo viên ---------- */
function qzPayload(){
  const m=QZ.m,S=qzScore(),parts=qzPartsOf(m.items);
  const ans=m.items.map((it,i)=>{const a=QZ.s.ans[i];if(it.kind==='tl')return`${i+1}:${S.res[i].ungraded?'giấy':'tự chấm '+pts(r2(S.res[i].got))}`;
    const t=it.kind==='nlc'?(a==null?'-':LET[a]):it.kind==='ds'?((a||[]).some(x=>x!=null)?a.map(x=>x==null?'-':x?'Đ':'S').join(''):'-'):(a==null||String(a).trim()===''?'-':String(a).trim().slice(0,20));
    return`${i+1}:${t}${S.res[i].ok?'✓':''}`}).join(' ');
  return{v:1,id:QZ.s.aid,sheet:`${m.info.title} – mã ${m.info.base}`.slice(0,90),name:QZ.s.name||'',cls:QZ.s.cls||'',code:m.info.code,
    mode:m.practice?`Luyện tập (làm ${S.nDone}/${m.items.length} câu)`:'Kiểm tra',score10:S.ungraded||!S.tot?'':S.sc10,got:r2(S.got),tot:S.tot,tlSelf:m.items.some(it=>it.kind==='tl')&&m.sol?r2(S.self):'',
    nOK:S.res.filter((r,i)=>r.ok&&m.items[i].kind!=='tl').length,n:m.items.filter(it=>it.kind!=='tl').length,
    minutes:Math.max(0,Math.round(((QZ.s.end||Date.now())-QZ.s.start)/60000)),autoSubmit:!!QZ.s.auto,
    parts:parts.map((p,pi)=>`${QZ_ROM[pi]}: ${p.k==='tlg'&&!m.sol?'giấy':pts(r2(p.idx.reduce((a,i)=>a+S.res[i].got,0)))+'/'+pts(p.idx.reduce((a,i)=>a+m.items[i].pts,0))}`).join('; '),answers:ans};
}
function qzSendStatus(){
  const el=document.getElementById('qzSend'),b=document.getElementById('qzSendBtn');if(!el)return;const st=QZ.s.sent;
  if(!st){el.textContent='Đang gửi kết quả cho thầy cô…';return}
  if(st.ok){el.className='qzsend ok';el.textContent=`Đã gửi kết quả cho thầy cô lúc ${new Date(st.at).toLocaleTimeString('vi-VN')}.`;if(b){b.hidden=!QZ.m.items.some(it=>it.kind==='tl')||!QZ.m.sol;b.textContent='Gửi lại kết quả (đã tự chấm)'}}
  else{el.className='qzsend bad';el.textContent='Chưa gửi được kết quả (mạng yếu hoặc mất kết nối). Em kiểm tra mạng rồi bấm “Gửi lại kết quả”.';if(b){b.hidden=false;b.textContent='Gửi lại kết quả'}}
}
function qzSend(){
  const m=QZ.m;if(!m.gs)return;const el=document.getElementById('qzSend');if(el){el.className='qzsend';el.textContent='Đang gửi kết quả cho thầy cô…'}
  const body=JSON.stringify(qzPayload());
  /* Apps Script không trả tiêu đề CORS: gửi dạng text/plain, no-cors; trình duyệt không đọc được phản hồi nên chỉ biết là đã gửi đi */
  fetch(gsUrl(m.gs),{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body,keepalive:body.length<60000})
    .then(()=>{QZ.s.sent={ok:true,at:Date.now()};qzSave();qzSendStatus();qzTrack('hs-gui-sheet',1)},()=>{QZ.s.sent={ok:false,at:Date.now()};qzSave();qzSendStatus()});
}

function qzInit(){
  const P=new URLSearchParams(location.search);if(P.get('lam')!=='1')return false;
  document.body.dataset.view='quiz';const el=qzEl();el.hidden=false;
  try{QZ.m=qzBuild(P)}catch(e){console.error(e);el.innerHTML=`<div class="qzwrap"><div class="qzcard"><h1>Không mở được bài làm</h1><p>Đường dẫn bài làm không đúng hoặc bị thiếu một phần. Em kiểm tra lại đường dẫn hoặc hỏi thầy cô đường dẫn mới nhé.</p></div></div>`;return true}
  if(!QZ.m.items.length){el.innerHTML='<div class="qzwrap"><div class="qzcard"><h1>Bài này chưa có câu hỏi</h1><p>Em hỏi lại thầy cô đường dẫn khác nhé.</p></div></div>';return true}
  document.addEventListener('click',e=>{if(e.target.closest('.qzbug'))qzTrack('hs-bao-loi')});
  const saved=qzLoad();QZ.saved=saved;
  if(saved){QZ.s=saved;qzFix();qzApplyReps()}
  if(saved&&!saved.done&&QZ.m.time&&Date.now()>saved.start+QZ.m.time*60000){QZ.s.done=true;QZ.s.end=saved.start+QZ.m.time*60000;QZ.s.auto=true;qzSave();qzHistDone();if(QZ.m.gs&&!QZ.s.sent){qzResultView();qzSend();return true}}
  if(saved&&saved.done&&QZ.m.gs&&saved.sent&&!saved.sent.ok){qzResultView();return true}
  qzStartView();return true;
}

/* ---------- Giáo viên: hộp “Làm bài online” trên trang tạo đề ---------- */
function qzGsGet(){try{return localStorage.getItem('xdt-gs')||''}catch(e){return''}}
function qzShareOpen(){
  const dlg=document.getElementById('qzShare');
  const defT=state.mode==='ws'?0:(isVao10()&&state.time===90?120:state.time);
  dlg.querySelector('#qzT').value=String(defT);
  dlg.querySelector('#qzMix').closest('label').hidden=state.mode==='ws'||isV10();
  let hasTL=false;try{hasTL=qzBuild(qzLinkParams({time:0,sol:true})).items.some(it=>it.orig)}catch(e){}
  dlg.dataset.tl=hasTL?'1':'';dlg.querySelector('#qzTLrow').hidden=!hasTL;
  const g=dlg.querySelector('#qzGs');if(!g.value)g.value=qzGsGet();
  qzShareUpdate();dlg.hidden=false;dlg.querySelector('#qzLink').focus();if(typeof track==='function')track('online-mo');
}
function qzShareUpdate(){
  const dlg=document.getElementById('qzShare'),$d=s=>dlg.querySelector(s);
  const practice=$d('#qzMode').value==='luyen',hasTL=!!dlg.dataset.tl;
  const gv=$d('#qzGs').value.trim(),gm=gv.match(GS_RE),gsBad=!!gv&&!gm;
  $d('#qzGsErr').hidden=!gsBad;$d('#qzGs').setAttribute('aria-invalid',String(gsBad));
  if(gm||!gv){try{gv?localStorage.setItem('xdt-gs',gv):localStorage.removeItem('xdt-gs')}catch(e){}}
  $d('#qzT').disabled=practice;$d('#qzSol').disabled=practice;if(practice)$d('#qzSol').checked=true;
  const o={time:+$d('#qzT').value||0,sol:$d('#qzSol').checked,mix:$d('#qzMix').checked&&state.mode!=='ws'&&!isV10(),practice,keepTL:hasTL&&$d('#qzTL').value==='g',gs:gm?gm[1]:''};
  const url=qzLink(o);$d('#qzLink').value=url;$d('#qzOpen').href=url.replace(QZ_BASE,location.origin+location.pathname);
  try{$d('#qzQR').innerHTML=QR.svg(url,180)}catch(e){$d('#qzQR').textContent=e.message}
  const tlTxt=!hasTL?'':o.keepTL?(o.sol?' Phần tự luận giữ nguyên: học sinh làm ra giấy, nộp xong tự chấm theo hướng dẫn chấm.':' Phần tự luận giữ nguyên: học sinh làm ra giấy, nộp cho thầy cô chấm.'):' Phần tự luận được thay bằng câu trả lời ngắn cùng nội dung.';
  $d('#qzWhat').textContent=(state.mode==='ws'?`Phiếu đang xem (mã ${state.code}).`:`Đề đang xem (mã ${state.code}${isV10()?'':', mã hoán vị đầu tiên'}).`)+(practice?' Chế độ luyện tập: học sinh kiểm tra từng câu, xem lời giải ngay, làm thêm câu cùng dạng.':'')+tlTxt;
  $d('#qzGsOk').hidden=!gm;
}
(function(){
  if(qzInit())return;
  const b=document.getElementById('qzShareBtn');if(!b)return;
  const dlg=document.getElementById('qzShare');
  b.addEventListener('click',qzShareOpen);
  dlg.addEventListener('change',qzShareUpdate);
  dlg.querySelector('#qzGs').addEventListener('input',qzShareUpdate);
  dlg.querySelector('#qzOpen').addEventListener('click',()=>{if(typeof track==='function')track('online-mo-thu')});
  dlg.querySelector('#qzClose').addEventListener('click',()=>{dlg.hidden=true;b.focus()});
  dlg.addEventListener('keydown',e=>{if(e.key==='Escape'){dlg.hidden=true;b.focus()}});
  dlg.addEventListener('click',e=>{if(e.target===dlg){dlg.hidden=true;b.focus()}});
  dlg.querySelector('#qzCopy').addEventListener('click',e=>{const u=dlg.querySelector('#qzLink').value,btn=e.currentTarget;
    const ok=()=>{btn.textContent='Đã chép';setTimeout(()=>btn.textContent='Chép đường dẫn',2000)};
    const P=new URLSearchParams(u.split('?')[1]||'');if(typeof trackEv==='function')trackEv(`online-chep/${P.get('luyen')?'luyen':'kt'}${P.get('tl')?'-tlg':''}${P.get('gs')?'-sheet':''}/${state.mode==='ws'?'phieu-':''}${state.grade}-${state.kind}`);
    try{navigator.clipboard.writeText(u).then(ok,()=>{dlg.querySelector('#qzLink').select();document.execCommand('copy');ok()})}catch(_){dlg.querySelector('#qzLink').select();document.execCommand('copy');ok()}});
})();
