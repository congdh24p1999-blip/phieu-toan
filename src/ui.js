
/* ================= Giao diện ================= */
const LS_KEY='xuong-de-thi-v1';
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function defYear(){const d=new Date(),y=d.getFullYear();return d.getMonth()>=7?`${y} – ${y+1}`:`${y-1} – ${y}`}
function loadState(){try{return JSON.parse(localStorage.getItem(LS_KEY)||'{}')}catch(e){return{}}}
function saveState(){try{localStorage.setItem(LS_KEY,JSON.stringify(state))}catch(e){}}
const state=Object.assign({grade:8,kind:'gk1',code:'101',nv:1,dept:'',school:'',year:defYear(),time:90,sol:true,tab:'exam',diff:'chuan',struct:'chuan',cs:null,ext:false},loadState());
if(state.term&&!loadState().kind){state.kind=/ck1/.test(state.term)?'ck1':'gk1'}   /* tương thích bản cũ */
delete state.term;
if(![7,8,11].includes(state.grade))state.grade=8;
if(!['gk1','ck1','gk2','ck2'].includes(state.kind))state.kind='gk1';
Object.defineProperty(state,'term',{get(){return state.grade===8?state.kind:state.grade+state.kind},enumerable:false});
/* Chỉ lớp có đề học kì II mới chọn được kì II; các lớp khác quay về kì I tương ứng */
const termOf=(g,k)=>g===8?k:g+k;
function fixKind(){if(!BLUEPRINT[state.term])state.kind=state.kind.replace('2','1')}
fixKind();
const ROM10=['','I','II','III','IV','V','VI','VII','VIII','IX','X'];
if(!DIFFS[state.diff])state.diff='chuan';
if(!(state.struct==='custom'||STRUCTS[state.struct]))state.struct='chuan';
if(!state.cs||typeof state.cs!=='object')state.cs={...STRUCTS.chuan};
['n1','n2','n3','n4','p1','p3'].forEach(k=>state.cs[k]=+state.cs[k]);
let lastGoodStruct=STRUCTS.chuan;
/* Cấu trúc đang dùng; nếu ô tuỳ chỉnh chưa hợp lệ thì giữ khung hợp lệ gần nhất. */
function curStruct(){
  const s=state.struct==='custom'?state.cs:STRUCTS[state.struct];
  if(!structCheck(s)){lastGoodStruct={...s};return lastGoodStruct}
  return lastGoodStruct;
}
state.code=String(state.code||'').replace(/\D/g,'').slice(0,3)||'101';
state.nv=Math.min(4,Math.max(1,+state.nv||1));
state.time=Math.min(180,Math.max(15,+state.time||90));
if(state.tab!=='key')state.tab='exam';

const pts=n=>String(Math.round(n*100)/100).replace('.',',');
const LET='ABCD';
const dots=(n)=>'…'.repeat(n);

function optClass(opts){
  if(opts.some(o=>o.indexOf('class="fr"')>=0))return 'c2';
  const m=Math.max(...opts.map(o=>strip(o).length));
  return m<=12?'c4':m<=34?'c2':'c1';
}
function partTitles(bp){
  const nN=bp.nlc.length,nD=bp.ds.length,nT=bp.tln.length,nL=bp.tl.length;
  const p1=nN*bp.pn,p2=nD*4*PTS.dsItem,p3=nT*bp.pt,p4=tlTotal(bp);
  const rom={},R=['I','II','III','IV'];let r=0;
  [['nlc',nN],['ds',nD],['tln',nT],['tl',nL]].forEach(([k,n])=>{if(n>0)rom[k]=R[r++]});
  return{nN,nD,nT,nL,p1,p2,p3,p4,rom,s2:nN+1,s3:nN+nD+1,s4:nN+nD+nT+1};
}
function examHTML(v,bp,idx){
  const P=partTitles(bp);
  let n=0,h=`<article class="sheet exam${idx>0?' pb':''}">`;
  h+=`<header class="eh"><div class="l">
    <div>${state.dept?esc(state.dept.toUpperCase()):'PHÒNG GD&amp;ĐT '+dots(12)}</div>
    <div class="school">${state.school?'TRƯỜNG '+bp.school+' '+esc(state.school):'TRƯỜNG '+bp.school+' '+dots(12)}</div>
    <div class="rule"></div>
    <div class="code">Mã đề: ${esc(v.code)}</div>
  </div><div class="r">
    <div class="title">${bp.title}</div>
    <div class="sub">NĂM HỌC ${esc(state.year||dots(8))}</div>
    <div class="sub">MÔN: TOÁN – LỚP ${bp.grade}</div>
    <div><i>Thời gian làm bài: ${state.time} phút (không kể thời gian phát đề)</i></div>
  </div></header>
  <div class="nameline"><span>Họ và tên: ${dots(18)}</span><span>Lớp: ${dots(6)}</span><span>SBD: ${dots(6)}</span></div>`;
  if(P.nN)h+=`<div class="part">PHẦN ${P.rom.nlc}. Câu trắc nghiệm nhiều phương án lựa chọn. (${pts(P.p1)} điểm)<small>Thí sinh trả lời từ câu 1 đến câu ${P.nN}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.</small></div>`;
  v.nlc.forEach(q=>{
    n++;
    h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b> ${q.stem}</div><div class="opts ${optClass(q.opts)}">${q.opts.map((o,i)=>`<div><b>${LET[i]}.</b> ${o}</div>`).join('')}</div></div>`;
  });
  if(P.nD)h+=`<div class="part">PHẦN ${P.rom.ds}. Câu trắc nghiệm đúng sai. (${pts(P.p2)} điểm)<small>Thí sinh trả lời từ câu ${P.s2} đến câu ${P.s2+P.nD-1}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.</small></div>`;
  v.ds.forEach(q=>{
    n++;
    h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b> ${q.stem}</div><ol class="ys">${q.items.map((it,i)=>`<li><b>${'abcd'[i]})</b> ${it.text}</li>`).join('')}</ol></div>`;
  });
  if(P.nT)h+=`<div class="part">PHẦN ${P.rom.tln}. Câu trắc nghiệm trả lời ngắn. (${pts(P.p3)} điểm)<small>Thí sinh trả lời từ câu ${P.s3} đến câu ${P.s3+P.nT-1}. Chỉ ghi kết quả, không cần trình bày lời giải.</small></div>`;
  v.tln.forEach(q=>{
    n++;
    h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b> ${q.stem}</div></div>`;
  });
  if(P.nL)h+=`<div class="part">PHẦN ${P.rom.tl}. Tự luận. (${pts(P.p4)} điểm)<small>Thí sinh trình bày lời giải từ câu ${P.s4} đến câu ${P.s4+P.nL-1}.</small></div>`;
  v.tl.forEach(q=>{
    n++;
    const sp=q.parts.length>1&&q.parts[0].html.includes('<br>')?q.parts[0].html.split('<br>'):null;
    h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b> (${pts(q.parts.reduce((a,p)=>a+p.pts,0))} điểm)${sp?' '+sp[0]:''}</div>`;
    q.parts.forEach((p,j)=>{const ph=j===0&&sp?sp.slice(1).join('<br>'):p.html;h+=q.parts.length>1?`<div class="tl-part"><b>${'abc'[j]})</b> ${ph} <i>(${pts(p.pts)} điểm)</i></div>`:`<div class="tl-part">${ph}</div>`});
    h+='</div>';
  });
  h+=`<div class="endmark">— HẾT —</div><p class="endnote">Thí sinh không được sử dụng tài liệu. Cán bộ coi thi không giải thích gì thêm.</p><div class="brandline">Xưởng đề Toán · Thầy Công · Mã đề ${esc(v.code)}</div></article>`;
  return h;
}
const UNIT_TXT=u=>u==='cm'?' cm':(u||'');
function keyHTML(base,vs,bp){
  const P=partTitles(bp),tot=P.p1+P.p2+P.p3+P.p4;
  let h=`<article class="sheet key"><div class="kh"><h2>Đáp án và hướng dẫn chấm</h2><p><b>${bp.title}</b> · ${bp.mon} · Năm học ${esc(state.year)}</p><p>Tổng điểm: ${pts(tot)}</p></div>`;
  vs.forEach(v=>{
    h+=`<section class="kblock"><h3>Mã đề ${esc(v.code)}</h3>`;
    if(P.nN)h+=`<div class="ksmall"><b>Phần ${P.rom.nlc}</b> (${pts(P.p1)} đ, mỗi câu ${pts(bp.pn)} đ)</div><table class="kt"><tr class="hi"><th>Câu</th>${v.nlc.map((_,i)=>`<th>${i+1}</th>`).join('')}</tr><tr><th>ĐA</th>${v.nlc.map(q=>`<td><b>${LET[q.ans]}</b></td>`).join('')}</tr></table>`;
    if(P.nD)h+=`<div class="ksmall"><b>Phần ${P.rom.ds}</b> (${pts(P.p2)} đ). Mỗi câu: đúng 1 ý được 0,1 đ; 2 ý được 0,25 đ; 3 ý được 0,5 đ; cả 4 ý được 1,0 đ.</div><table class="kt"><tr class="hi"><th>Câu</th><th>a)</th><th>b)</th><th>c)</th><th>d)</th></tr>${v.ds.map((q,i)=>`<tr><th>${P.s2+i}</th>${q.items.map(it=>`<td><b>${it.truth?'Đúng':'Sai'}</b></td>`).join('')}</tr>`).join('')}</table>`;
    if(P.nT)h+=`<div class="ksmall"><b>Phần ${P.rom.tln}</b> (${pts(P.p3)} đ, mỗi câu ${pts(bp.pt)} đ)</div><table class="kt"><tr class="hi"><th>Câu</th>${v.tln.map((_,i)=>`<th>${P.s3+i}</th>`).join('')}</tr><tr><th>ĐA</th>${v.tln.map(q=>`<td><b>${fmt(q.ans)}${UNIT_TXT(q.unit)}</b></td>`).join('')}</tr></table>`;
    h+='</section>';
  });
  const v0=vs[0];
  /* Ghi chú các câu mở rộng (ngoài SGK) để giáo viên chủ động dặn học sinh */
  const exts=[...v0.nlc.map((q,i)=>[i+1,q]),...v0.ds.map((q,i)=>[P.s2+i,q]),...v0.tln.map((q,i)=>[P.s3+i,q]),...v0.tl.map((q,i)=>[P.s4+i,q])].filter(([,q])=>q.ext);
  if(exts.length)h+=`<section class="ksec"><p class="ksmall"><b>Lưu ý câu mở rộng</b> (theo mã đề ${esc(v0.code)}): ${exts.map(([n,q])=>`Câu ${n} – ${q.ext}`).join('; ')}.</p></section>`;
  if(P.nL)h+=`<section class="ksec"><h3>Phần ${P.rom.tl}. Tự luận (${pts(P.p4)} điểm)</h3><p class="ksmall">Mọi cách giải đúng khác đều cho điểm tối đa của ý đó. Điểm toàn bài không làm tròn.</p>`;
  v0.tl.forEach((q,i)=>{
    h+=`<div class="lg"><div class="qs"><b>Câu ${P.s4+i}</b> (${pts(q.parts.reduce((a,p)=>a+p.pts,0))} điểm)</div>`;
    q.parts.forEach((p,j)=>{h+=q.parts.length>1?`<div class="why"><b>${'abc'[j]})</b> (${pts(p.pts)} điểm) ${q.sol[j]}</div>`:`<div class="why">${q.sol[j]}</div>`});
    h+='</div>';
  });
  if(P.nL)h+='</section>';
  if(state.sol&&P.nN+P.nD+P.nT>0){
    h+=`<section class="ksec"><h3>Lời giải chi tiết phần trắc nghiệm (theo mã đề ${esc(v0.code)})</h3>`;
    v0.nlc.forEach((q,i)=>{
      h+=`<div class="lg"><div class="qs"><b>Câu ${i+1}.</b> ${q.stem} <b>Đáp án ${LET[q.ans]}:</b> ${q.opts[q.ans]}</div><div class="why small">${q.sol}</div></div>`;
    });
    v0.ds.forEach((q,i)=>{
      h+=`<div class="lg"><div class="qs"><b>Câu ${P.s2+i}.</b> ${q.stem}</div>${q.items.map((it,j)=>`<div class="why small"><b>${'abcd'[j]}) ${it.truth?'Đúng':'Sai'}.</b> ${it.why}</div>`).join('')}</div>`;
    });
    v0.tln.forEach((q,i)=>{
      h+=`<div class="lg"><div class="qs"><b>Câu ${P.s3+i}.</b> ${q.stem} <b>Đáp án: ${fmt(q.ans)}${UNIT_TXT(q.unit)}</b></div><div class="why small">${q.sol}</div></div>`;
    });
    h+='</section>';
  }
  const m=matrixOf(base);
  const cols=[['nlc','nN','(câu)',1],['ds','nD','(ý)',4],['tln','nT','(câu)',1],['tl','nL','(câu)',1]].filter(c=>P[c[1]]>0);
  h+=`<section class="ksec"><h3>Ma trận đặc tả sơ bộ của đề này</h3><table class="kt mx"><tr class="hi"><th class="l">Chương</th>${cols.map(c=>`<th>Phần ${P.rom[c[0]]}<br>${c[2]}</th>`).join('')}<th>Điểm</th><th>Tỉ lệ</th></tr>`;
  bp.chapters.forEach(c=>{const r=m.rows[c];h+=`<tr><td class="l">Chương ${ROM10[c]}. ${bp.chName[c]}</td>${cols.map(k=>`<td>${r[k[0]]}</td>`).join('')}<td>${pts(r.pts)}</td><td>${Math.round(r.pts*10)}%</td></tr>`});
  h+=`<tr class="hi"><td class="l"><b>Tổng</b></td>${cols.map(k=>`<td>${P[k[1]]*k[3]}</td>`).join('')}<td>${pts(tot)}</td><td>100%</td></tr></table>`;
  const lvTxt=['NB','TH','VD','VDC'].map(k=>`${LV_NAME[k]} ${pts(m.pt[k])} đ (${Math.round(m.pt[k]*10)}%)`).join(' · ');
  h+=`<p class="ksmall">Mức độ nhận thức (độ khó ${DIFFS[base.diff].name}): ${lvTxt}. Mức độ do người soạn gán cho từng dạng câu, có thể khác với phân loại của trường; “vận dụng cao” ở đây là bài hình học có thêm một bước suy luận, không phải bài thi học sinh giỏi.</p></section>`;
  /* Đối chiếu câu hỏi với bài học trong SGK (theo mã đề đầu tiên) */
  const byL={};[...v0.nlc.map((q,i)=>[i+1,q]),...v0.ds.map((q,i)=>[P.s2+i,q]),...v0.tln.map((q,i)=>[P.s3+i,q]),...v0.tl.map((q,i)=>[P.s4+i,q])].forEach(([n,q])=>(q.les||[]).forEach(l=>{(byL[l]=byL[l]||[]).push(n)}));
  const ls=Object.keys(byL).map(Number).sort((a,b)=>a-b);
  if(ls.length&&typeof LESSON_TITLES!=='undefined'&&LESSON_TITLES[bp.grade])h+=`<section class="ksec"><h3>Đối chiếu với bài học trong SGK Toán ${bp.grade} (Kết nối tri thức với cuộc sống)</h3><p class="ksmall">Theo mã đề ${esc(v0.code)}; một câu có thể dùng kiến thức của nhiều bài.</p><table class="kt mx"><tr class="hi"><th class="l">Bài học</th><th class="l">Câu</th></tr>${ls.map(l=>`<tr><td class="l">Bài ${l}. ${LESSON_TITLES[bp.grade][l]}</td><td class="l">${[...new Set(byL[l])].join(', ')}</td></tr>`).join('')}</table></section>`;
  return h+'</article>';
}

/* Kí hiệu toán học theo sách giáo khoa: góc viết có dấu mũ (Â, ABC với mũ rộng), song song ∥. */
function prettyMath(h){
  const hat=x=>{const t=x.replace(/<[^>]+>/g,'');return `<span class="hw ${t.length>1?'hn':'h1'}"><i>${t}</i></span>`;};
  return h
    .replace(/∠\s*(<i>[^<]*<\/i>|[A-Za-z]{1,3})/g,(m,x)=>hat(x))
    .replace(/(\s)\/\/(\s)/g,'$1∥$2');
}


/* ---- Lịch sử đề đã tạo (chỉ lưu trong trình duyệt này) ---- */
const HIST_KEY='xuong-de-thi-hist-v1',HIST_MAX=60;
function loadHist(){try{const a=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');return Array.isArray(a)?a.filter(h=>h&&Array.isArray(h.fp)):[]}catch(e){return[]}}
function saveHist(a){try{localStorage.setItem(HIST_KEY,JSON.stringify(a.slice(0,HIST_MAX)))}catch(e){}}
function recordHist(ex){
  const a=loadHist().filter(h=>!(h.t===histKey(ex)&&h.d===ex.diff&&h.c===ex.base));
  a.unshift({t:histKey(ex),d:ex.diff,c:ex.base,fp:examFP(ex)});saveHist(a);
}
function histNote(ex){
  const all=loadHist().filter(h=>h.t===histKey(ex)&&!(h.d===ex.diff&&h.c===ex.base));
  if(!all.length)return'Chưa có đề nào được lưu để so sánh. Đề được lưu khi bạn bấm “Đổi đề khác” hoặc in.';
  const o=overlapOf(ex,all);
  return `So với ${all.length} đề ${ex.bp.short} đã tạo: ${o.exact===0?'không có câu nào trùng nguyên văn':o.exact+'/'+o.n+' câu trùng nguyên văn'}; ${o.kind}/${o.n} câu cùng dạng bài (khác số liệu hoặc tên điểm)${o.kind>=o.n-2?`. Lặp dạng bài là bình thường khi đã tạo nhiều đề, vì ngân hàng hiện có ${Object.values(T).reduce((a,k)=>a+Object.keys(k).length,0)} dạng`:''}.`;
}

const DIFF_HINT7={co_ban:'Khoảng 32–35% nhận biết, 40–50% thông hiểu, 15–25% vận dụng, không có vận dụng cao.',chuan:'Khoảng 30% nhận biết, 40% thông hiểu, 20% vận dụng, 10% vận dụng cao.',nang_cao:'Khoảng 12–15% nhận biết, 25–40% thông hiểu, 35–50% vận dụng, 10% vận dụng cao.'};
const DIFF_HINT11={co_ban:'Khoảng 35% nhận biết, 35–50% thông hiểu, 15–30% vận dụng, không có vận dụng cao.',chuan:'Khoảng 30% nhận biết, 35–40% thông hiểu, 20–25% vận dụng, 10% vận dụng cao.',nang_cao:'Khoảng 15% nhận biết, 25% thông hiểu, 50% vận dụng, 10% vận dụng cao.'};
const DIFF_HINT={co_ban:'Khoảng 40% nhận biết, 35% thông hiểu, 25% vận dụng; không có câu vận dụng cao.',chuan:'Khoảng 30% nhận biết, 40% thông hiểu, 20% vận dụng, 10% vận dụng cao.',nang_cao:'Khoảng 20% nhận biết, 45–50% thông hiểu, 20–25% vận dụng, 10% vận dụng cao.'};

function render(){
  const err=state.struct==='custom'?structCheck(state.cs):'';
  let st=curStruct(),bp,ex;const base=state.code;
  ALLOW_EXT=!!state.ext;CUR_DIFF=state.diff;
  try{bp=bpOf(state.term,st);ex=buildExam(state.term,base,state.diff,st)}
  catch(e){st=STRUCTS.chuan;lastGoodStruct=st;bp=bpOf(state.term,st);ex=buildExam(state.term,base,state.diff,st)}
  const vs=[...Array(state.nv).keys()].map(v=>makeVariant(ex,v));
  $('#examOut').innerHTML=prettyMath(vs.map((v,i)=>examHTML(v,bp,i)).join(''));
  $('#keyOut').innerHTML=prettyMath(keyHTML(ex,vs,bp));
  $('#scopeHint').textContent=bp.scope+'.';
  $('#diffHint').textContent=(bp.grade===8?DIFF_HINT:bp.grade===7?DIFF_HINT7:DIFF_HINT11)[state.diff];
  $('#histHint').textContent=histNote(ex);
  $('#meta').textContent=`${bp.short} · ${DIFFS[state.diff].name} · mã đề ${vs.map(v=>v.code).join(', ')}`;
  document.title=`Đề ${bp.mon} ${bp.short} – mã ${vs[0].code}`;
  $('#tagline').textContent='Tạo đề kiểm tra Toán cấp 2, cấp 3 có đáp án và hướng dẫn chấm. Mỗi lần bấm là một đề khác, in thẳng ra khổ A4.';
  const sh=$('#structHint'),sw=$('#structWarn');
  sh.textContent=`${state.struct==='custom'?'Tự chọn':STRUCTS[state.struct].name}. Tổng ${pts(structTotal(st))} điểm; mỗi câu đúng/sai 1 điểm (4 ý), mỗi câu tự luận 1 điểm.`;
  sw.textContent=err?`Chưa áp dụng: ${err} Đề vẫn dùng khung hợp lệ gần nhất.`:(bp.warn&&bp.warn.length?'Lưu ý: '+bp.warn.join('; ')+'.':'');
  $('#csBox').hidden=state.struct!=='custom';
  $('#noteTxt').textContent=bp.note+' Đề do thuật toán sinh ra, thầy cô nên đọc lướt trước khi in.';
  $('#gradeHint').textContent=`Lớp ${bp.grade}, sách Kết nối tri thức, học kì I và II. Các lớp khác sẽ thêm sau.`;
  document.querySelectorAll('input[name=term]').forEach(i=>{const ok=!!BLUEPRINT[termOf(state.grade,i.value)];i.disabled=!ok;i.parentElement.classList.toggle('off',!ok)});
}
function syncInputs(){
  document.querySelectorAll('input[name=grade]').forEach(i=>i.checked=+i.value===state.grade);
  document.querySelectorAll('input[name=term]').forEach(i=>i.checked=i.value===state.kind);
  document.querySelectorAll('input[name=diff]').forEach(i=>i.checked=i.value===state.diff);
  document.querySelectorAll('input[name=nv]').forEach(i=>i.checked=+i.value===state.nv);
  $('#dept').value=state.dept;$('#school').value=state.school;$('#year').value=state.year;$('#time').value=state.time;
  $('#code').value=state.code;$('#sol').checked=!!state.sol;$('#ext').checked=!!state.ext;
  $('#struct').value=state.struct;
  ['n1','n2','n3','n4'].forEach(k=>$('#cs_'+k).value=state.cs[k]);
  $('#cs_p1').value=String(state.cs.p1);$('#cs_p3').value=String(state.cs.p3);
}
function setTab(t){
  state.tab=t;document.body.dataset.tab=t;document.body.dataset.print=t;
  $('#tabExam').setAttribute('aria-selected',t==='exam');$('#tabKey').setAttribute('aria-selected',t==='key');
  saveState();
}
function update(){saveState();render()}
document.querySelectorAll('input[name=grade]:not([disabled])').forEach(i=>i.addEventListener('change',()=>{state.grade=+i.value;fixKind();update();syncInputs()}));
document.querySelectorAll('input[name=term]').forEach(i=>i.addEventListener('change',()=>{state.kind=i.value;update()}));
document.querySelectorAll('input[name=diff]').forEach(i=>i.addEventListener('change',()=>{state.diff=i.value;update()}));
document.querySelectorAll('input[name=nv]').forEach(i=>i.addEventListener('change',()=>{state.nv=+i.value;update()}));
$('#dept').addEventListener('input',e=>{state.dept=e.target.value;update()});
$('#school').addEventListener('input',e=>{state.school=e.target.value;update()});
$('#year').addEventListener('input',e=>{state.year=e.target.value;update()});
$('#time').addEventListener('input',e=>{const v=+e.target.value;if(v>=15&&v<=180){state.time=v;update()}});
$('#code').addEventListener('input',e=>{const c=e.target.value.replace(/\D/g,'').slice(0,3);e.target.value=c;if(c.length===3){state.code=c;update()}});
$('#code').addEventListener('blur',e=>{if(e.target.value.length!==3)e.target.value=state.code});
$('#sol').addEventListener('change',e=>{state.sol=e.target.checked;update()});
$('#ext').addEventListener('change',e=>{state.ext=e.target.checked;update()});
$('#struct').innerHTML=STRUCT_ORDER.map(k=>`<option value="${k}">${esc(STRUCTS[k].name)}</option>`).join('')+'<option value="custom">Tự chọn số câu và điểm…</option>';
$('#struct').addEventListener('change',e=>{
  const v=e.target.value;
  if(v==='custom'&&state.struct!=='custom')state.cs={...curStruct()};
  state.struct=v;syncInputs();update();
});
['n1','n2','n3','n4'].forEach(k=>$('#cs_'+k).addEventListener('input',e=>{state.cs[k]=e.target.value===''?NaN:+e.target.value;update()}));
['p1','p3'].forEach(k=>$('#cs_'+k).addEventListener('change',e=>{state.cs[k]=+e.target.value;update()}));
$('#newBtn').addEventListener('click',()=>{
  const b=pickFreshCode(state.term,state.diff,loadHist(),150,Math.random,curStruct());
  let c=b?b.c:String(100+Math.floor(Math.random()*880));
  if(c===state.code)c=String(100+(+c-100+1)%880);
  state.code=c;recordHist(buildExam(state.term,c,state.diff,curStruct()));syncInputs();update();
});
$('#clearHist').addEventListener('click',()=>{if(confirm('Xoá lịch sử các đề đã tạo trong trình duyệt này? Các mã đề vẫn tái tạo được.')){saveHist([]);update()}});
$('#tabExam').addEventListener('click',()=>setTab('exam'));
$('#tabKey').addEventListener('click',()=>setTab('key'));
function doPrint(what){
  try{recordHist(buildExam(state.term,state.code,state.diff,curStruct()))}catch(e){}
  document.body.dataset.print=what;
  const back=()=>{document.body.dataset.print=state.tab;window.removeEventListener('afterprint',back)};
  window.addEventListener('afterprint',back);
  window.print();
}
$('#printExam').addEventListener('click',()=>doPrint('exam'));
$('#printKey').addEventListener('click',()=>doPrint('key'));
syncInputs();setTab(state.tab);render();
