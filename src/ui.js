
/* ================= Giao diện ================= */
const LS_KEY='xuong-de-thi-v1';
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function defYear(){const d=new Date(),y=d.getFullYear();return d.getMonth()>=7?`${y} – ${y+1}`:`${y-1} – ${y}`}
function loadState(){try{return JSON.parse(localStorage.getItem(LS_KEY)||'{}')}catch(e){return{}}}
function saveState(){try{localStorage.setItem(LS_KEY,JSON.stringify(state))}catch(e){}}
const state=Object.assign({grade:8,kind:'gk1',code:'101',nv:1,dept:'',school:'',year:defYear(),time:90,sol:true,tab:'exam',diff:'chuan',struct:'chuan',cs:null,ext:false,mode:'exam',les:{},wsn:10,wsk:'mix'},loadState());
if(!['exam','ws'].includes(state.mode))state.mode='exam';
if(!state.les||typeof state.les!=='object')state.les={};
if(![10,15,20,30].includes(+state.wsn))state.wsn=10;state.wsn=+state.wsn;
if(!['mix','nlc','ds','tln','tl'].includes(state.wsk))state.wsk='mix';
if(state.term&&!loadState().kind){state.kind=/ck1/.test(state.term)?'ck1':'gk1'}   /* tương thích bản cũ */
delete state.term;
if(![6,7,8,9,10,11,12].includes(state.grade))state.grade=8;
if(!['gk1','ck1','gk2','ck2','tn'].includes(state.kind))state.kind='gk1';
Object.defineProperty(state,'term',{get(){return state.grade===8?state.kind:state.grade+state.kind},enumerable:false});
/* Chỉ lớp có đề học kì II mới chọn được kì II; các lớp khác quay về kì I tương ứng */
const termOf=(g,k)=>g===8?k:g+k;
const termOK=t=>!!BLUEPRINT[t]||t==='9tn';   /* 9tn: đề ôn thi vào lớp 10 (v10.js) */
function fixKind(){if(!termOK(state.term))state.kind=state.kind==='tn'?'ck1':state.kind.replace('2','1');if(!termOK(state.term))state.kind='gk1'}
fixKind();
const ROM10=['','I','II','III','IV','V','VI','VII','VIII','IX','X'];
if(!DIFFS[state.diff])state.diff='chuan';
if(!(state.struct==='custom'||state.struct==='tl100'||STRUCTS[state.struct]))state.struct='chuan';
if(!state.cs||typeof state.cs!=='object')state.cs={...STRUCTS.chuan};
['n1','n2','n3','n4','p1','p3'].forEach(k=>state.cs[k]=+state.cs[k]);
let lastGoodStruct=STRUCTS.chuan;
/* Cấu trúc đang dùng; nếu ô tuỳ chỉnh chưa hợp lệ thì giữ khung hợp lệ gần nhất. */
function curStruct(){
  const s=state.struct==='custom'?state.cs:STRUCTS[state.struct]||STRUCTS.chuan;
  if(!structCheck(s)){lastGoodStruct={...s};return lastGoodStruct}
  return lastGoodStruct;
}
state.code=String(state.code||'').replace(/\D/g,'').slice(0,3)||'101';
state.nv=Math.min(4,Math.max(1,+state.nv||1));
state.time=Math.min(180,Math.max(15,+state.time||90));
if(!['key','mx'].includes(state.tab))state.tab='exam';

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
    <div>${state.dept?esc(state.dept.toUpperCase()):bp.v10?'SỞ GIÁO DỤC VÀ ĐÀO TẠO '+dots(8):'PHÒNG GD&amp;ĐT '+dots(12)}</div>
    <div class="school">${state.school?'TRƯỜNG '+bp.school+' '+esc(state.school):'TRƯỜNG '+bp.school+' '+dots(12)}</div>
    <div class="rule"></div>
    <div class="code">Mã đề: ${esc(v.code)}</div>
  </div><div class="r">
    <div class="title">${bp.title}</div>
    <div class="sub">NĂM HỌC ${esc(state.year||dots(8))}</div>
    <div class="sub">${bp.v10?'MÔN: TOÁN':'MÔN: TOÁN – LỚP '+bp.grade}</div>
    <div><i>Thời gian làm bài: ${bp.v10&&state.time===90?120:state.time} phút (không kể thời gian phát đề)</i></div>
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
const UNIT_TXT=u=>u&&/^[A-Za-zÀ-ỹĐđ]/.test(u)?' '+u:(u||'');
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
  h+=`<section class="ksec"><h3>Tóm tắt ma trận của đề này</h3><p class="ksmall noprint">Ma trận và bản đặc tả đầy đủ theo mẫu Công văn 7991 ở thẻ <b>Ma trận</b>.</p><table class="kt mx"><tr class="hi"><th class="l">${bp.tn?'Chủ đề':'Chương'}</th>${cols.map(c=>`<th>Phần ${P.rom[c[0]]}<br>${c[2]}</th>`).join('')}<th>Điểm</th><th>Tỉ lệ</th></tr>`;
  bp.chapters.forEach(c=>{const r=m.rows[c];h+=`<tr><td class="l">${bp.tn?`Chủ đề ${c-100}`:`Chương ${ROM10[c]}`}. ${bp.chName[c]}</td>${cols.map(k=>`<td>${r[k[0]]}</td>`).join('')}<td>${pts(r.pts)}</td><td>${Math.round(r.pts*10)}%</td></tr>`});
  h+=`<tr class="hi"><td class="l"><b>Tổng</b></td>${cols.map(k=>`<td>${P[k[1]]*k[3]}</td>`).join('')}<td>${pts(tot)}</td><td>100%</td></tr></table>`;
  const lvTxt=['NB','TH','VD','VDC'].map(k=>`${LV_NAME[k]} ${pts(m.pt[k])} đ (${Math.round(m.pt[k]*10)}%)`).join(' · ');
  h+=`<p class="ksmall">Mức độ nhận thức (độ khó ${DIFFS[base.diff].name}): ${lvTxt}. Mức độ do người soạn gán cho từng dạng câu, có thể khác với phân loại của trường; “vận dụng cao” ở đây là bài hình học có thêm một bước suy luận, không phải bài thi học sinh giỏi.</p></section>`;
  /* Đối chiếu câu hỏi với bài học trong SGK (theo mã đề đầu tiên) */
  const byL={};[...v0.nlc.map((q,i)=>[i+1,q]),...v0.ds.map((q,i)=>[P.s2+i,q]),...v0.tln.map((q,i)=>[P.s3+i,q]),...v0.tl.map((q,i)=>[P.s4+i,q])].forEach(([n,q])=>(q.les||[]).forEach(l=>{(byL[l]=byL[l]||[]).push(n)}));
  const ls=Object.keys(byL).map(Number).sort((a,b)=>a-b);
  if(!bp.tn&&ls.length&&typeof LESSON_TITLES!=='undefined'&&LESSON_TITLES[bp.grade])h+=`<section class="ksec"><h3>Đối chiếu với bài học trong SGK Toán ${bp.grade} (Kết nối tri thức với cuộc sống)</h3><p class="ksmall">Theo mã đề ${esc(v0.code)}; một câu có thể dùng kiến thức của nhiều bài.</p><table class="kt mx"><tr class="hi"><th class="l">Bài học</th><th class="l">Câu</th></tr>${ls.map(l=>`<tr><td class="l">Bài ${l}. ${LESSON_TITLES[bp.grade][l]}</td><td class="l">${[...new Set(byL[l])].join(', ')}</td></tr>`).join('')}</table></section>`;
  return h+'</article>';
}

/* Kí hiệu toán học theo sách giáo khoa: góc viết có dấu mũ (Â, ABC với mũ rộng), song song ∥. */
function prettyMath(h){
  const hat=x=>{const t=x.replace(/<[^>]+>/g,'');return `<span class="hw ${t.length>1?'hn':'h1'}"><i>${t}</i></span>`;};
  return h
    .replace(/∠\s*(<i>[^<]*<\/i>|[A-Za-z]{1,3})/g,(m,x)=>hat(x))
    .replace(/(\s)\/\/(\s)/g,'$1∥$2')
    /* dấu trừ đứng ngay trước phân số: tách ra một chút cho dễ nhìn */
    .replace(/−<span class="fr">/g,'−<span class="fr ng">');
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

const DIFF_HINT7={co_ban:'Khoảng 32–35% nhận biết, 40–50% thông hiểu, 15–25% vận dụng, không có vận dụng cao.',chuan:'Theo mẫu Công văn 7991: khoảng 40% nhận biết, 30% thông hiểu, 30% vận dụng (trong đó 10% vận dụng cao).',nang_cao:'Khoảng 12–15% nhận biết, 25–40% thông hiểu, 35–50% vận dụng, 10% vận dụng cao.'};
const DIFF_HINT_TN={co_ban:'Phần I nghiêng về nhận biết; Phần II, III có nhiều câu thông hiểu hơn đề thật.',chuan:'Gần với mức độ đề thi chính thức năm 2025: Phần III gần như toàn câu vận dụng, câu cuối là câu xác suất vận dụng cao.',nang_cao:'Khó hơn đề thật: Phần II thiên về vận dụng, hai câu cuối Phần III là câu xác suất vận dụng cao.'};
const DIFF_HINT11={co_ban:'Khoảng 35% nhận biết, 35–50% thông hiểu, 15–30% vận dụng, không có vận dụng cao.',chuan:'Gần mẫu Công văn 7991: khoảng 40% nhận biết (lớp 10 khoảng 30%), 30% thông hiểu, 30% vận dụng (tối đa 10% vận dụng cao).',nang_cao:'Khoảng 15% nhận biết, 25% thông hiểu, 50% vận dụng, 10% vận dụng cao.'};
const DIFF_HINT={co_ban:'Khoảng 40% nhận biết, 35% thông hiểu, 25% vận dụng; không có câu vận dụng cao.',chuan:'Theo mẫu Công văn 7991: khoảng 40% nhận biết, 30% thông hiểu, 30% vận dụng (trong đó 10% vận dụng cao).',nang_cao:'Khoảng 20% nhận biết, 45–50% thông hiểu, 20–25% vận dụng, 10% vận dụng cao.'};

/* ================= Phiếu bài tập theo bài học ================= */
function wsSel(){/* các bài đang chọn của lớp hiện tại (hợp lệ) */
  const all=wsLessons(state.grade).map(l=>l.n);
  if(!Array.isArray(state.les[state.grade])){/* lần đầu: chọn sẵn bài đầu tiên có từ 10 dạng câu */
    const L=wsLessons(state.grade),f=L.find(l=>l.count>=10)||L[0];return[f.n];
  }
  return state.les[state.grade].map(Number).filter(n=>all.includes(n));
}
function renderLessonBox(){
  const L=wsLessons(state.grade),sel=new Set(wsSel()),names=WS_CH_NAMES[state.grade];
  const chs=[...new Set(L.map(l=>l.ch))];
  $('#lesBox').innerHTML=chs.map(c=>{const ls=L.filter(l=>l.ch===c),on=ls.some(l=>sel.has(l.n));
    return`<details${on?' open':''}><summary>${c===100?'Ôn thi tốt nghiệp THPT (theo đề chính thức 2025)':`Chương ${ROM10[c]}. ${esc(names[c])}`}</summary>${ls.map(l=>`<label><input type="checkbox" value="${l.n}"${sel.has(l.n)?' checked':''}><span>${lesLb(l.n)}. ${esc(l.title)} <span class="cnt">(${l.count} dạng)</span></span></label>`).join('')}</details>`}).join('');
}
const lesLb=n=>n>100?`Chuyên đề ${n-100}`:`Bài ${n}`;
const wsIsTN=les=>les.length&&les.every(n=>n>100);
function wsTitleLes(g,les){
  return les.length<=2?les.map(n=>`${lesLb(n)}. ${LESSON_TITLES[g][n]}`).join('; '):(wsIsTN(les)?`Chuyên đề ${les.map(n=>n-100).join(', ')}`:les.map(lesLb).join(', '));
}
function wsHTML(w){
  const g=w.grade;let n=0;
  let h=`<article class="sheet exam ws">`;
  h+=`<header class="eh"><div class="l">
    <div>${state.dept?esc(state.dept.toUpperCase()):'PHÒNG GD&amp;ĐT '+dots(12)}</div>
    <div class="school">${state.school?'TRƯỜNG '+(g>=10?'THPT':'THCS')+' '+esc(state.school):'TRƯỜNG '+(g>=10?'THPT':'THCS')+' '+dots(12)}</div>
    <div class="rule"></div>
    <div class="code">Mã phiếu: ${esc(w.code)}</div>
  </div><div class="r">
    <div class="title">${wsIsTN(w.lessons)?'PHIẾU ÔN THI TỐT NGHIỆP THPT':'PHIẾU BÀI TẬP'}</div>
    <div class="sub">MÔN: TOÁN – LỚP ${g}</div>
    <div><i>${esc(wsTitleLes(g,w.lessons))}</i></div>
  </div></header>
  <div class="nameline"><span>Họ và tên: ${dots(18)}</span><span>Lớp: ${dots(6)}</span><span>Ngày: ${dots(6)}</span></div>`;
  const R=['I','II','III','IV'];let r=0;
  if(w.nlc.length){h+=`<div class="part">${R[r++]}. Trắc nghiệm nhiều phương án lựa chọn<small>Khoanh tròn chữ cái đứng trước phương án đúng.</small></div>`;
    w.nlc.forEach(q=>{n++;h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b> ${q.stem}</div><div class="opts ${optClass(q.opts)}">${q.opts.map((o,i)=>`<div><b>${LET[i]}.</b> ${o}</div>`).join('')}</div></div>`})}
  if(w.ds.length){h+=`<div class="part">${R[r++]}. Trắc nghiệm đúng sai<small>Ghi Đ (đúng) hoặc S (sai) vào cuối mỗi ý a), b), c), d).</small></div>`;
    w.ds.forEach(q=>{n++;h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b> ${q.stem}</div><ol class="ys">${q.items.map((it,i)=>`<li><b>${'abcd'[i]})</b> ${it.text} …</li>`).join('')}</ol></div>`})}
  if(w.tln.length){h+=`<div class="part">${R[r++]}. Trả lời ngắn<small>Ghi kết quả vào chỗ trống.</small></div>`;
    w.tln.forEach(q=>{n++;h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b> ${q.stem}</div><div class="ansline">Đáp số: ${dots(14)}</div></div>`})}
  if(w.tl.length){h+=`<div class="part">${R[r++]}. Tự luận<small>Trình bày lời giải.</small></div>`;
    w.tl.forEach(q=>{n++;
      const sp=q.parts.length>1&&q.parts[0].html.includes('<br>')?q.parts[0].html.split('<br>'):null;
      h+=`<div class="q"><div class="qs"><b>Câu ${n}.</b>${sp?' '+sp[0]:''}</div>`;
      q.parts.forEach((p,j)=>{const ph=j===0&&sp?sp.slice(1).join('<br>'):p.html;h+=q.parts.length>1?`<div class="tl-part"><b>${'abc'[j]})</b> ${ph}</div>`:`<div class="tl-part">${ph}</div>`});
      h+='</div>'})}
  h+=`<div class="endmark">— HẾT —</div><div class="brandline">Xưởng đề Toán · Thầy Công · Phiếu ${esc(w.code)}</div></article>`;
  return h;
}
function wsKeyHTML(w){
  const g=w.grade,s2=w.nlc.length+1,s3=s2+w.ds.length,s4=s3+w.tln.length;
  let h=`<article class="sheet key"><div class="kh"><h2>Đáp án phiếu bài tập</h2><p><b>Toán ${g}</b> · ${esc(wsTitleLes(g,w.lessons))} · Mã phiếu ${esc(w.code)}</p></div>`;
  if(w.nlc.length)h+=`<div class="ksmall"><b>Trắc nghiệm nhiều phương án</b></div><table class="kt"><tr class="hi"><th>Câu</th>${w.nlc.map((_,i)=>`<th>${i+1}</th>`).join('')}</tr><tr><th>ĐA</th>${w.nlc.map(q=>`<td><b>${LET[q.ans]}</b></td>`).join('')}</tr></table>`;
  if(w.ds.length)h+=`<div class="ksmall"><b>Trắc nghiệm đúng sai</b></div><table class="kt"><tr class="hi"><th>Câu</th><th>a)</th><th>b)</th><th>c)</th><th>d)</th></tr>${w.ds.map((q,i)=>`<tr><th>${s2+i}</th>${q.items.map(it=>`<td><b>${it.truth?'Đ':'S'}</b></td>`).join('')}</tr>`).join('')}</table>`;
  if(w.tln.length)h+=`<div class="ksmall"><b>Trả lời ngắn</b></div><table class="kt"><tr class="hi"><th>Câu</th>${w.tln.map((_,i)=>`<th>${s3+i}</th>`).join('')}</tr><tr><th>ĐA</th>${w.tln.map(q=>`<td><b>${fmt(q.ans)}${UNIT_TXT(q.unit)}</b></td>`).join('')}</tr></table>`;
  const exts=[...w.nlc.map((q,i)=>[i+1,q]),...w.ds.map((q,i)=>[s2+i,q]),...w.tln.map((q,i)=>[s3+i,q]),...w.tl.map((q,i)=>[s4+i,q])].filter(([,q])=>q.ext);
  if(exts.length)h+=`<p class="ksmall"><b>Lưu ý câu mở rộng:</b> ${exts.map(([n,q])=>`Câu ${n} – ${q.ext}`).join('; ')}.</p>`;
  if(w.tl.length){h+=`<section class="ksec"><h3>Hướng dẫn giải phần tự luận</h3>`;
    w.tl.forEach((q,i)=>{h+=`<div class="lg"><div class="qs"><b>Câu ${s4+i}</b></div>`;q.parts.forEach((p,j)=>{h+=q.parts.length>1?`<div class="why"><b>${'abc'[j]})</b> ${q.sol[j]}</div>`:`<div class="why">${q.sol[j]}</div>`});h+='</div>'});
    h+='</section>'}
  if(state.sol&&w.nlc.length+w.ds.length+w.tln.length>0){
    h+=`<section class="ksec"><h3>Lời giải chi tiết phần trắc nghiệm</h3>`;
    w.nlc.forEach((q,i)=>{h+=`<div class="lg"><div class="qs"><b>Câu ${i+1}.</b> <b>Đáp án ${LET[q.ans]}:</b> ${q.opts[q.ans]}</div><div class="why small">${q.sol}</div></div>`});
    w.ds.forEach((q,i)=>{h+=`<div class="lg"><div class="qs"><b>Câu ${s2+i}.</b></div>${q.items.map((it,j)=>`<div class="why small"><b>${'abcd'[j]}) ${it.truth?'Đúng':'Sai'}.</b> ${it.why}</div>`).join('')}</div>`});
    w.tln.forEach((q,i)=>{h+=`<div class="lg"><div class="qs"><b>Câu ${s3+i}.</b> <b>Đáp án: ${fmt(q.ans)}${UNIT_TXT(q.unit)}</b></div><div class="why small">${q.sol}</div></div>`});
    h+='</section>'}
  /* phân bố theo bài và mức độ */
  const all=[...w.nlc,...w.ds,...w.tln,...w.tl],byL={},lv={NB:0,TH:0,VD:0,VDC:0};
  all.forEach(q=>{lv[q.lv]++;q.les.filter(l=>w.lessons.includes(l)).forEach(l=>byL[l]=(byL[l]||0)+1)});
  h+=`<section class="ksec"><h3>Thống kê phiếu</h3><p class="ksmall">${w.lessons.map(l=>`${lesLb(l)}: ${byL[l]||0} câu`).join(' · ')}.</p><p class="ksmall">Mức độ: ${['NB','TH','VD','VDC'].filter(k=>lv[k]).map(k=>`${LV_NAME[k]} ${lv[k]} câu`).join(' · ')}.</p></section>`;
  return h+'</article>';
}
function renderWS(){
  const les=wsSel();
  if(!les.length){
    const msg='<article class="sheet"><p style="text-align:center;margin:40px 0">Hãy chọn ít nhất một bài học ở cột bên trái để tạo phiếu.</p></article>';
    $('#examOut').innerHTML=msg;$('#keyOut').innerHTML=msg;$('#lesHint').textContent='Chưa chọn bài nào.';$('#wsWarn').textContent='';
    setModeLabels();return;
  }
  const w=buildWS({grade:state.grade,lessons:les,n:state.wsn,kind:state.wsk,diff:state.diff,code:state.code,ext:state.ext});
  $('#examOut').innerHTML=prettyMath(wsHTML(w));
  $('#keyOut').innerHTML=prettyMath(wsKeyHTML(w));
  const got=w.nlc.length+w.ds.length+w.tln.length+w.tl.length,tot=Object.values(w.pools).reduce((a,b)=>a+b,0);
  $('#lesHint').textContent=`Đang chọn ${les.length} mục: ${les.map(lesLb).join(', ')}. Có ${tot} dạng câu.`;
  const ww=[];
  if(got<state.wsn)ww.push(`Chỉ tạo được ${got} câu với lựa chọn này.`);
  if(w.repeats)ww.push(`Các bài đã chọn chưa đủ dạng câu khác nhau nên có ${w.repeats} câu cùng dạng với câu khác (khác số liệu). Chọn thêm bài${state.wsk==='mix'?' hoặc giảm số câu':', giảm số câu hoặc chọn “Trộn các loại”'} để ít lặp hơn.`);
  $('#wsWarn').textContent=ww.join(' ');
  $('#diffHint').textContent={co_ban:'Ưu tiên câu nhận biết, thông hiểu.',chuan:'Ưu tiên câu nhận biết, thông hiểu, vận dụng.',nang_cao:'Ưu tiên câu thông hiểu, vận dụng, vận dụng cao.'}[state.diff]+' Câu xếp từ dễ đến khó trong mỗi phần.';
  const wsName=wsIsTN(les)?'Phiếu ôn thi TN THPT':`Phiếu bài tập Toán ${state.grade}`;
  $('#meta').textContent=`${wsName} · ${got} câu · mã phiếu ${state.code}`;
  document.title=`${wsName} – mã ${state.code}`;
  $('#tagline').textContent='Tạo phiếu bài tập Toán theo từng bài học trong SGK, có đáp án và lời giải. Mỗi mã phiếu là một phiếu khác.';
  $('#noteTxt').textContent='Phiếu do thuật toán sinh ra từ các dạng câu gắn với bài học đã chọn; thầy cô nên đọc lướt trước khi phát cho học sinh.';
  $('#gradeHint').textContent=`Lớp ${state.grade}, sách Kết nối tri thức. Các lớp khác sẽ thêm sau.`;
}
function setModeLabels(){
  const ws=state.mode==='ws';document.body.dataset.mode=state.mode;
  $('#codeLbl').textContent=ws?'Mã phiếu':'Mã đề';
  $('#newBtn').textContent=ws?'Đổi phiếu khác':'Đổi đề khác';
  $('#tabExam').textContent=ws?'Phiếu':'Đề thi';
  $('#printExam').textContent=ws?'In phiếu':'In đề thi';
  $('#wordExam').textContent=ws?'Word – phiếu':'Word – đề';
}

function render(){
  setModeLabels();
  structOpts();
  if(state.mode==='ws'){renderLessonBox();renderWS();return}
  if(isV10()){renderV10();return}
  const err=state.struct==='custom'?structCheck(state.cs):'';
  let st=curStruct(),bp,ex;const base=state.code;
  ALLOW_EXT=!!state.ext;CUR_DIFF=state.diff;
  try{bp=bpOf(state.term,st);ex=buildExam(state.term,base,state.diff,st)}
  catch(e){st=STRUCTS.chuan;lastGoodStruct=st;bp=bpOf(state.term,st);ex=buildExam(state.term,base,state.diff,st)}
  if(ex.bp)bp=ex.bp;   /* đề ôn thi vào 10 có thể thay hai câu tự luận bằng một bài hình 2 điểm */
  const vs=[...Array(state.nv).keys()].map(v=>makeVariant(ex,v));
  $('#examOut').innerHTML=prettyMath(vs.map((v,i)=>examHTML(v,bp,i)).join(''));
  $('#keyOut').innerHTML=prettyMath(keyHTML(ex,vs,bp));
  $('#mxOut').innerHTML=prettyMath(mxHTML(ex,vs[0],bp));
  $('#scopeHint').textContent=bp.scope+'.';
  $('#diffHint').textContent=bp.tn?DIFF_HINT_TN[state.diff]:(bp.grade===8?DIFF_HINT:bp.grade===6||bp.grade===7||bp.grade===9?DIFF_HINT7:DIFF_HINT11)[state.diff];
  $('#histHint').textContent=histNote(ex);
  $('#meta').textContent=`${bp.short} · ${DIFFS[state.diff].name} · mã đề ${vs.map(v=>v.code).join(', ')}`;
  document.title=`Đề ${bp.mon} ${bp.short} – mã ${vs[0].code}`;
  $('#tagline').textContent='Tạo đề kiểm tra Toán cấp 2, cấp 3 có đáp án và hướng dẫn chấm. Mỗi lần bấm là một đề khác, in thẳng ra khổ A4.';
  const sh=$('#structHint'),sw=$('#structWarn');
  sh.textContent=`${state.struct==='custom'?'Tự chọn':(isVao10()&&V10_STRUCT_NAME[state.struct])||STRUCTS[state.struct].name}. Tổng ${pts(structTotal(st))} điểm; mỗi câu đúng/sai 1 điểm (4 ý), mỗi câu tự luận 1 điểm${bp.g3?'; riêng bài hình học (3 ý) 2 điểm, thay cho hai câu tự luận':''}.`;
  sw.textContent=err?`Chưa áp dụng: ${err} Đề vẫn dùng khung hợp lệ gần nhất.`:(bp.warn&&bp.warn.length?'Lưu ý: '+bp.warn.join('; ')+'.':'');
  $('#csBox').hidden=state.struct!=='custom'||!!bp.tn;
  /* Đề ôn thi tốt nghiệp luôn theo cấu trúc đề chính thức, không đổi cấu trúc */
  $('#struct').disabled=!!bp.tn;
  if(bp.tn){sh.textContent='Đề ôn thi tốt nghiệp luôn theo cấu trúc đề chính thức năm 2025: 12 câu nhiều lựa chọn (3 đ), 4 câu đúng/sai (4 đ), 6 câu trả lời ngắn (3 đ).';sw.textContent=''}
  $('#noteTxt').textContent=bp.note+' Đề do thuật toán sinh ra, thầy cô nên đọc lướt trước khi in.';
  $('#gradeHint').textContent=`Lớp ${bp.grade}, sách Kết nối tri thức, ${BLUEPRINT[bp.grade+'gk2']||bp.grade===8?'học kì I và II':'học kì I (học kì II sẽ thêm sau)'}${bp.grade===9?'; có đề ôn thi vào lớp 10':''}.`;
  termRadios();
}
function termRadios(){
  document.querySelectorAll('input[name=term]').forEach(i=>{const ok=termOK(termOf(state.grade,i.value));i.disabled=!ok;i.parentElement.classList.toggle('off',!ok)});
  $('#tnLbl').textContent=state.grade===9?'Ôn thi vào 10':'Ôn thi TN THPT';
}
function renderV10(){
  const ex=buildV10(state.code,state.diff),bp=v10BP();
  $('#examOut').innerHTML=prettyMath(v10HTML(ex));
  $('#keyOut').innerHTML=prettyMath(v10KeyHTML(ex));
  $('#mxOut').innerHTML=prettyMath(mxHTML(ex,{code:ex.code,nlc:[],ds:[],tln:[],tl:ex.tl},bp));
  $('#scopeHint').textContent='Toàn bộ chương trình Toán 9 (Kết nối tri thức), trọng tâm như đề tuyển sinh vào lớp 10 của nhiều tỉnh.';
  $('#diffHint').textContent={co_ban:'Chọn dạng dễ nhất trong mỗi ý, hợp với học sinh trung bình.',chuan:'Mức thường gặp trong đề thi thật; không có câu vận dụng cao.',nang_cao:'Ưu tiên dạng vận dụng và vận dụng cao, hợp với học sinh khá giỏi.'}[state.diff];
  $('#histHint').textContent='';
  $('#meta').textContent=`Ôn thi vào lớp 10 · ${DIFFS[state.diff].name} · mã đề ${ex.code}`;
  document.title=`Đề ôn thi vào lớp 10 môn Toán – mã ${ex.code}`;
  $('#tagline').textContent='Tạo đề kiểm tra Toán cấp 2, cấp 3 có đáp án và hướng dẫn chấm. Mỗi lần bấm là một đề khác, in thẳng ra khổ A4.';
  $('#structHint').textContent='100% tự luận, 6 bài, 10 điểm, 120 phút. Có thể chọn cấu trúc có trắc nghiệm như nhiều tỉnh năm 2026.';$('#structWarn').textContent='';
  $('#csBox').hidden=true;$('#struct').disabled=false;
  $('#noteTxt').textContent='Cấu trúc chung theo dạng đề phổ biến của nhiều tỉnh, không theo riêng tỉnh nào: biểu thức chứa căn; phương trình, hệ phương trình, Viète; giải bài toán bằng cách lập phương trình; thống kê – xác suất; hình học; bài toán thực tế. Đề do thuật toán sinh ra, thầy cô nên đọc lướt trước khi in. Đề này chỉ có một mã.';
  $('#gradeHint').textContent='Lớp 9, sách Kết nối tri thức, học kì I và II; có đề ôn thi vào lớp 10.';
  termRadios();
}
function syncInputs(){
  document.querySelectorAll('input[name=grade]').forEach(i=>i.checked=+i.value===state.grade);
  document.querySelectorAll('input[name=term]').forEach(i=>i.checked=i.value===state.kind);
  document.querySelectorAll('input[name=diff]').forEach(i=>i.checked=i.value===state.diff);
  document.querySelectorAll('input[name=nv]').forEach(i=>i.checked=+i.value===state.nv);
  $('#dept').value=state.dept;$('#school').value=state.school;$('#year').value=state.year;$('#time').value=state.time;
  $('#code').value=state.code;$('#sol').checked=!!state.sol;$('#ext').checked=!!state.ext;
  structOpts();
  document.querySelectorAll('input[name=mode]').forEach(i=>i.checked=i.value===state.mode);
  document.querySelectorAll('input[name=wsn]').forEach(i=>i.checked=+i.value===state.wsn);
  $('#wsk').value=state.wsk;
  ['n1','n2','n3','n4'].forEach(k=>$('#cs_'+k).value=state.cs[k]);
  $('#cs_p1').value=String(state.cs.p1);$('#cs_p3').value=String(state.cs.p3);
}
function setTab(t){
  if(t==='mx'&&state.mode==='ws')t='exam';
  state.tab=t;document.body.dataset.tab=t;document.body.dataset.print=t;
  $('#tabExam').setAttribute('aria-selected',t==='exam');$('#tabKey').setAttribute('aria-selected',t==='key');$('#tabMx').setAttribute('aria-selected',t==='mx');
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
/* Danh sách cấu trúc; với đề ôn thi vào lớp 10 ghi kèm tỉnh đã dùng cấu trúc đó (năm 2026) và thêm lựa chọn 100% tự luận */
const V10_STRUCT_NAME={chuan:'12 nhiều lựa chọn + 2 đúng/sai + 4 trả lời ngắn + 3 tự luận (như Khánh Hòa 2026)',tn:'Toàn trắc nghiệm: 12 + 4 đúng/sai + 6 trả lời ngắn (như đề thi thử Hải Phòng 2026)',tn37:'Trắc nghiệm 3 đ + tự luận 7 đ (như Quảng Ninh 2026)',ct:'20 nhiều lựa chọn (4 đ) + 2 đúng/sai + 4 tự luận (như đề tham khảo Cần Thơ 2026)'};
function isVao10(){return state.mode!=='ws'&&state.grade===9&&state.kind==='tn'}
function structOpts(){
  const v=isVao10();
  if(!v&&state.struct==='tl100')state.struct='chuan';
  const html=(v?'<option value="tl100">100% tự luận, 6 bài (gần kiểu Hà Nội, TP.HCM)</option>':'')+STRUCT_ORDER.map(k=>`<option value="${k}">${esc(v&&V10_STRUCT_NAME[k]||STRUCTS[k].name)}</option>`).join('')+'<option value="custom">Tự chọn số câu và điểm…</option>';
  const el=$('#struct');if(el.dataset.v!==String(v)){el.innerHTML=html;el.dataset.v=String(v)}
  el.value=state.struct;
}
structOpts();
$('#struct').addEventListener('change',e=>{
  const v=e.target.value;
  if(v==='custom'&&state.struct!=='custom')state.cs={...curStruct()};
  state.struct=v;syncInputs();update();
});
['n1','n2','n3','n4'].forEach(k=>$('#cs_'+k).addEventListener('input',e=>{state.cs[k]=e.target.value===''?NaN:+e.target.value;update()}));
['p1','p3'].forEach(k=>$('#cs_'+k).addEventListener('change',e=>{state.cs[k]=+e.target.value;update()}));
$('#newBtn').addEventListener('click',()=>{
  if(state.mode==='ws'||isV10()){let c=String(100+Math.floor(Math.random()*880));if(c===state.code)c=String(100+(+c-100+1)%880);state.code=c;syncInputs();update();return}
  const b=pickFreshCode(state.term,state.diff,loadHist(),150,Math.random,curStruct());
  let c=b?b.c:String(100+Math.floor(Math.random()*880));
  if(c===state.code)c=String(100+(+c-100+1)%880);
  state.code=c;recordHist(buildExam(state.term,c,state.diff,curStruct()));syncInputs();update();
});
$('#clearHist').addEventListener('click',()=>{if(confirm('Xoá lịch sử các đề đã tạo trong trình duyệt này? Các mã đề vẫn tái tạo được.')){saveHist([]);update()}});
$('#tabExam').addEventListener('click',()=>setTab('exam'));
$('#tabKey').addEventListener('click',()=>setTab('key'));
$('#tabMx').addEventListener('click',()=>setTab('mx'));
function doPrint(what){
  if(state.mode!=='ws')try{recordHist(buildExam(state.term,state.code,state.diff,curStruct()))}catch(e){}
  document.body.dataset.print=what;
  const back=()=>{document.body.dataset.print=state.tab;window.removeEventListener('afterprint',back)};
  window.addEventListener('afterprint',back);
  window.print();
}
$('#printExam').addEventListener('click',()=>doPrint('exam'));
$('#printKey').addEventListener('click',()=>doPrint('key'));
$('#printMx').addEventListener('click',()=>doPrint('mx'));
/* Tải file Word: dùng đúng nội dung đang hiển thị */
async function doWord(what,btn){
  const old=btn.textContent;btn.disabled=true;btn.textContent='Đang tạo file…';
  try{
    if(state.mode!=='ws')try{recordHist(buildExam(state.term,state.code,state.diff,curStruct()))}catch(e){}
    const kindTxt=isVao10()?'OnThiVao10':{gk1:'GK1',ck1:'CK1',gk2:'GK2',ck2:'CK2',tn:'OnThiTN'}[state.kind]||state.kind;
    const nm=state.mode==='ws'?`${what==='exam'?'Phieu':'DapAnPhieu'}_Toan${state.grade}_${wsIsTN(wsSel())?'OnThiTN_ChuyenDe'+wsSel().map(n=>n-100).join('-'):'Bai'+wsSel().join('-')}_ma${state.code}.docx`:`${{exam:'De',key:'DapAn',mx:'MaTran_DacTa'}[what]}_Toan${state.grade}_${kindTxt}_ma${state.code}.docx`;
    await DOCX.save($({exam:'#examOut',key:'#keyOut',mx:'#mxOut'}[what]),nm,{landscape:what==='mx'});
  }catch(e){alert('Chưa tạo được file Word: '+e.message)}
  finally{btn.disabled=false;btn.textContent=old}
}
$('#wordExam').addEventListener('click',e=>doWord('exam',e.currentTarget));
$('#wordKey').addEventListener('click',e=>doWord('key',e.currentTarget));
$('#wordMx').addEventListener('click',e=>doWord('mx',e.currentTarget));
document.querySelectorAll('input[name=mode]').forEach(i=>i.addEventListener('change',()=>{state.mode=i.value;if(state.mode==='ws'&&state.tab==='mx')setTab('exam');update()}));
document.querySelectorAll('input[name=wsn]').forEach(i=>i.addEventListener('change',()=>{state.wsn=+i.value;update()}));
$('#wsk').addEventListener('change',e=>{state.wsk=e.target.value;update()});
$('#lesBox').addEventListener('change',e=>{
  if(!e.target.matches('input[type=checkbox]'))return;
  state.les[state.grade]=[...document.querySelectorAll('#lesBox input:checked')].map(i=>+i.value);
  saveState();renderWS();/* không vẽ lại danh sách để giữ nguyên các chương đang mở */
});
$('#lesNone').addEventListener('click',()=>{document.querySelectorAll('#lesBox input').forEach(i=>i.checked=false);state.les[state.grade]=[];saveState();renderLessonBox();renderWS()});
syncInputs();setTab(state.tab);render();
