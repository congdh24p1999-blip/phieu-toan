/* ================================================================
   Trang “Tự luyện” cho học sinh (?tuluyen=1): tự chọn lớp, bài học hoặc đề, mức độ,
   rồi luyện ngay ở chế độ làm bài online (online.js), không cần đường dẫn của giáo viên.
   Lựa chọn và lịch sử làm bài chỉ lưu trên máy học sinh.
   ================================================================ */
const TU_KEY='xdt-tuluyen';
const TU_KT={gk1:'Giữa kì I',ck1:'Cuối kì I',gk2:'Giữa kì II',ck2:'Cuối kì II'};
const TU_V10=[['chuan','Trắc nghiệm + tự luận','Khung đề có trắc nghiệm, đúng – sai, trả lời ngắn và tự luận như nhiều tỉnh năm 2026.'],
  ['tl100','100% tự luận kiểu Hà Nội','5 bài tự luận theo hình thức đề Hà Nội 2026.'],
  ['tlhcm','100% tự luận kiểu TP.HCM','8 bài tự luận, nhiều bài toán thực tế, theo hình thức đề TP.HCM 2026.'],
  ['mc40','40 câu trắc nghiệm','Toàn bộ là câu nhiều phương án lựa chọn.']];
let TU={};
function tuLoad(){let o={};try{o=JSON.parse(localStorage.getItem(TU_KEY)||'{}')||{}}catch(e){}
  TU=Object.assign({g:9,what:'bai',les:{},n:10,d:'chuan',mode:'luyen',tl:'tln',k:'gk1',s:'chuan'},o);
  if(!(TU.g>=6&&TU.g<=12))TU.g=9}
function tuSave(){try{localStorage.setItem(TU_KEY,JSON.stringify(TU))}catch(e){}}
function tuHasTN(g){return g===9||g===12}
function tuTerms(g){return Object.keys(TU_KT).filter(k=>termOK(termOf(g,k)))}
function tuLes(g){const all=wsLessons(g).map(l=>l.n);return(TU.les[g]||[]).filter(n=>all.includes(n))}
/* tham số đường dẫn bài làm ứng với lựa chọn hiện tại; null nếu chưa đủ */
function tuParams(){
  const g=TU.g,P=new URLSearchParams({lam:'1',tu:'1'});let time=90,hasTL=true;
  if(TU.what==='bai'){const les=tuLes(g);if(!les.length)return null;
    P.set('m','ws');P.set('g',g);P.set('les',les.join('.'));P.set('n',TU.n);P.set('wk','mix');time=TU.n*3;hasTL=!(g===12&&les.every(n=>n>100))}
  else if(TU.what==='tn'&&tuHasTN(g)){P.set('g',g);P.set('k','tn');const s=g===9?TU.s:'chuan';P.set('s',s);time=g===9?120:90;hasTL=g===9&&s!=='mc40'}
  else{const ks=tuTerms(g),k=ks.includes(TU.k)?TU.k:ks[0];P.set('g',g);P.set('k',k);P.set('s','chuan')}
  P.set('d',TU.d);P.set('c',String(100+Math.floor(Math.random()*900)));
  if(TU.mode==='luyen')P.set('luyen','1');else P.set('t',time);
  P.set('sol','1');if(hasTL&&TU.tl==='g')P.set('tl','g');
  return P;
}
function tuSeg(name,opts,val){
  return`<div class="seg tuseg" role="radiogroup">${opts.map(([v,t,dis])=>`<label${dis?' class="off"':''}><input type="radio" name="${name}" value="${v}"${String(v)===String(val)?' checked':''}${dis?' disabled':''}>${t}</label>`).join('')}</div>`;
}
function tuCards(name,opts,val){
  return`<div class="tucards" role="radiogroup">${opts.map(([v,t,d])=>`<label class="tucard"><input type="radio" name="${name}" value="${v}"${v===val?' checked':''}><b>${t}</b>${d?`<span>${d}</span>`:''}</label>`).join('')}</div>`;
}
function tuLesBox(){
  const g=TU.g,L=wsLessons(g),sel=new Set(tuLes(g)),names=WS_CH_NAMES[g]||{},chs=[...new Set(L.map(l=>l.ch))];
  return`<div class="tules">${chs.map(c=>{const ls=L.filter(l=>l.ch===c),on=ls.some(l=>sel.has(l.n));
    return`<details${on?' open':''}><summary>${c===100?'Ôn thi tốt nghiệp theo chuyên đề':`Chương ${ROM10[c]}. ${esc(names[c]||'')}`}${on?` <span class="tucnt">${ls.filter(l=>sel.has(l.n)).length} bài</span>`:''}</summary>${ls.map(l=>`<label><input type="checkbox" name="les" value="${l.n}"${sel.has(l.n)?' checked':''}><span>${lesLb(l.n)}. ${esc(l.title)}</span></label>`).join('')}</details>`}).join('')}</div>`;
}
function tuHistHTML(){
  const L=qzHist();if(!L.length)return'';
  const ago=t=>{const m=Math.round((Date.now()-t)/60000);return m<1?'vừa xong':m<60?m+' phút trước':m<1440?Math.round(m/60)+' giờ trước':new Date(t).toLocaleDateString('vi-VN')};
  return`<section class="qzcard tuhist" aria-labelledby="tuH"><h2 id="tuH" class="qzh2">Bài em đã làm gần đây</h2><ul>${L.map(x=>`<li><a href="${esc(x.q)}"><b>${esc(x.t)}</b><span>${esc(x.s)} · mã ${esc(x.c)}${x.p?' · luyện tập':''}</span></a><span class="tures">${x.done?(x.sc!=null?`<b>${pts(x.sc)}</b>/10`:`${pts(x.got)}/${pts(x.tot)} đ`):'đang làm'}<small>${ago(x.at)}</small></span></li>`).join('')}</ul><button type="button" class="linkbtn" id="tuClr">Xoá lịch sử trên máy này</button></section>`;
}
function tuRender(){
  const g=TU.g,root=document.getElementById('qz');
  const whats=[['bai','Theo bài học','Chọn một hay vài bài trong SGK, luyện từ dễ đến khó.'],['kt','Đề kiểm tra trên lớp','Đề giữa kì, cuối kì theo đúng chương trình.']];
  if(g===9)whats.push(['tn','Ôn thi vào lớp 10','Đề ôn theo hình thức đề tuyển sinh các tỉnh năm 2026.']);
  if(g===12)whats.push(['tn','Ôn thi tốt nghiệp THPT','Đề theo cấu trúc đề thi tốt nghiệp chính thức.']);
  if(TU.what==='tn'&&!tuHasTN(g))TU.what='kt';
  const ks=tuTerms(g);if(!ks.includes(TU.k))TU.k=ks[0];
  let body='';
  if(TU.what==='bai'){const nSel=tuLes(g).length;
    body=`<div class="tuf"><span class="tul" id="tuLesL">Chọn bài${nSel?` (đã chọn ${nSel})`:''}</span>${tuLesBox()}</div>
      <div class="tuf"><span class="tul">Số câu</span>${tuSeg('n',[[10,'10 câu'],[15,'15 câu'],[20,'20 câu']],TU.n)}</div>`}
  else if(TU.what==='kt')body=`<div class="tuf"><span class="tul">Kì kiểm tra</span>${tuSeg('k',Object.keys(TU_KT).map(k=>[k,TU_KT[k],!ks.includes(k)]),TU.k)}</div>`;
  else if(g===9)body=`<div class="tuf"><span class="tul">Hình thức đề</span>${tuCards('s',TU_V10,TU.s)}</div>`;
  const P=tuParams(),showTL=P?!(P.get('k')==='tn'&&(g===12||P.get('s')==='mc40'))&&!(g===12&&TU.what==='bai'&&tuLes(g).every(n=>n>100)):true;
  root.innerHTML=`<div class="qzwrap tuwrap">
    <header class="tutop"><a class="tubrand" href="./">Xưởng <span>đề</span> Toán</a><a class="tuteach" href="./">Thầy cô tạo đề</a></header>
    <div class="qzcard">
      <h1>Tự luyện Toán</h1>
      <p class="qzsub">Chọn lớp và nội dung rồi làm ngay trên điện thoại hoặc máy tính. Làm câu nào biết đúng sai câu đó, có lời giải từng câu. Không cần tài khoản.</p>
      <div class="tuf"><span class="tul">Lớp</span>${tuSeg('g',[6,7,8,9,10,11,12].map(x=>[x,String(x)]),g)}</div>
      <div class="tuf"><span class="tul">Em muốn luyện</span>${tuCards('what',whats,TU.what)}</div>
      ${body}
      <div class="tuf"><span class="tul">Mức độ</span>${tuSeg('d',[['co_ban','Cơ bản'],['chuan','Chuẩn'],['nang_cao','Nâng cao']],TU.d)}</div>
      <div class="tuf"><span class="tul">Cách làm</span>${tuCards('mode',[['luyen','Luyện từng câu','Bấm Kiểm tra là biết đúng sai, xem lời giải, làm thêm câu cùng dạng.'],['thi','Thi thử','Có hẹn giờ như làm bài thật, nộp xong mới có điểm và lời giải.']],TU.mode)}</div>
      ${showTL?`<div class="tuf"><span class="tul">Câu tự luận (nếu có)</span>${tuCards('tl',[['tln','Đổi thành câu trả lời ngắn','Gõ đáp số, máy chấm ngay. Hợp khi chỉ có điện thoại.'],['g','Làm ra giấy rồi tự chấm','Giữ đúng câu tự luận như đề thật; xong bài em đối chiếu với hướng dẫn chấm.']],TU.tl)}</div>`:''}
      <p class="qzerr" id="tuErr" role="alert" hidden>Em chọn ít nhất một bài học nhé.</p>
      <div class="qzbtns"><button type="button" class="btn tugo" id="tuGo">Bắt đầu</button></div>
      <p class="qzsmall muted">Mỗi lần bấm Bắt đầu là một bộ câu hỏi mới. Bài làm và lịch sử chỉ lưu trên máy này.</p>
    </div>
    ${tuHistHTML()}
  </div>`;
  document.title='Tự luyện Toán – Xưởng đề Toán';
}
function tuInit(){
  const Q=new URLSearchParams(location.search);if(Q.get('tuluyen')!=='1')return false;
  document.body.dataset.view='quiz';const root=document.getElementById('qz');root.hidden=false;
  tuLoad();tuRender();
  root.addEventListener('change',e=>{const t=e.target;if(!t.name)return;
    if(t.name==='les'){const g=TU.g,s=new Set(tuLes(g));t.checked?s.add(+t.value):s.delete(+t.value);TU.les[g]=[...s].sort((a,b)=>a-b);tuSave();
      const l=document.getElementById('tuLesL');if(l)l.textContent=`Chọn bài${s.size?` (đã chọn ${s.size})`:''}`;document.getElementById('tuErr').hidden=true;
      const d=t.closest('details'),c=d&&d.querySelectorAll('input:checked').length,sm=d&&d.querySelector('summary');
      if(sm){let b=sm.querySelector('.tucnt');if(c){if(!b){b=document.createElement('span');b.className='tucnt';sm.append(' ',b)}b.textContent=c+' bài'}else if(b)b.remove()}
      return}
    TU[t.name]=['g','n'].includes(t.name)?+t.value:t.value;tuSave();
    const y=window.scrollY;tuRender();window.scrollTo(0,y);const f=root.querySelector(`input[name="${t.name}"][value="${t.value}"]`);if(f)f.focus({preventScroll:true})});
  root.addEventListener('click',e=>{
    if(e.target.id==='tuGo'){const P=tuParams();if(!P){const er=document.getElementById('tuErr');er.hidden=false;er.scrollIntoView({block:'center'});return}
      if(typeof trackEv==='function')trackEv(`tu-luyen-bat-dau/${TU.mode}-${TU.g}-${TU.what==='kt'?P.get('k'):TU.what}${P.get('tl')?'-tlg':''}`);
      location.search=P.toString()}
    if(e.target.id==='tuClr'){try{localStorage.removeItem('xdt-hist')}catch(_){}const h=document.querySelector('.tuhist');if(h)h.remove()}
  });
  return true;
}
tuInit();
