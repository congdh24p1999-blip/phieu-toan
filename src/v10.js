/* ================================================================
   Đề ôn thi tuyển sinh vào lớp 10 – cấu trúc chung (100% tự luận, 10 điểm, 120 phút)
   Ghép từ các dạng tự luận Toán 9 đã có; mỗi ý lớn là một dạng (1 điểm, hai ý nhỏ a, b);
   riêng bài hình học phẳng là một bài hoàn chỉnh một hình, ba ý a, b, c (2 điểm).
   Khung đề theo dạng phổ biến của nhiều tỉnh: biểu thức chứa căn; phương trình, hệ phương trình,
   định lí Viète; giải bài toán bằng cách lập phương trình; thống kê – xác suất; hình học
   (hình khối thực tế và hình học phẳng với đường tròn); bài toán thực tế.
   ================================================================ */
const V10={
  title:'ĐỀ ÔN THI TUYỂN SINH VÀO LỚP 10',
  time:120,
  bai:[
    {t:'Biểu thức đại số chứa căn',items:[['tl9-8-calc','tl9-9-rad','tl9-7-cond'],['tl9-9-expr','tl9-9-expr2','tl9-9-max','tl9-9-min']]},
    {t:'Phương trình, hệ phương trình',items:[['tl9-2-sys','tl9-19-solve','tl9-4-eq','tl9-2-param','tl9-4-frac'],['tl9-20-m','tl9-20-new','tl9-20-min','tl9-20-abs']]},
    {t:'Giải bài toán bằng cách lập phương trình hoặc hệ phương trình',items:[['tl9-3-simple','tl9-21-rect','tl9-3-word','tl9-3-work','tl9-21-move','tl9-21-tree']]},
    {t:'Thống kê và xác suất',items:[['tl9-22-tab','tl9-26-coin','tl9-24-grp','tl9-26-dice','tl9-26-ball']]},
    {t:'Hình học',items:[['tl9-31-tank','tl9-32-ball','tl9-32-ice','tl9-15-fan'],['tl9-g3-tan','tl9-g3-alt','tl9-g3-diam','tl9-g3-sec','tl9-g3-semi','tl9-g3-rect']]},   /* ý 2: bài hình một hình, 3 ý (core09i.js) */
    {t:'Bài toán thực tế',items:[['tl9-18-fall','tl9-6-simple','tl9-6-real','tl9-12-real','tl9-12-two']]}
  ]
};
const V10_ROM=['I','II','III','IV','V','VI'];
const v10P=n=>(Math.round(n*100)/100).toFixed(n*10%1?2:1).replace('.',',');   /* 2 → 2,0; 1,5; 0,25 */
function isV10(){return state.mode!=='ws'&&state.grade===9&&state.kind==='tn'&&state.struct==='tl100'}
/* chọn một dạng trong nhóm theo độ khó: cơ bản lấy mức thấp nhất, chuẩn bỏ vận dụng cao, nâng cao lấy hai mức cao nhất */
function v10Pick(ids,diff,rng,used){
  const R={NB:0,TH:1,VD:2,VDC:3};
  let all=ids.filter(id=>T.tl[id]&&!used.has(id));if(!all.length)all=ids.filter(id=>T.tl[id]);
  const lv=all.map(id=>R[T.tl[id].lv]),lo=Math.min(...lv),hi=Math.max(...lv);
  let pool=diff==='co_ban'?all.filter(id=>R[T.tl[id].lv]===lo)
          :diff==='nang_cao'?all.filter(id=>R[T.tl[id].lv]>=Math.max(lo,hi-1))
          :all.filter(id=>T.tl[id].lv!=='VDC');
  if(!pool.length)pool=all;
  return pool[rng.int(0,pool.length-1)];
}
function buildV10(code,diff){
  diff=DIFFS[diff]?diff:'chuan';
  const used=new Set(),bai=[];let k=0;
  V10.bai.forEach((b,bi)=>{
    const items=b.items.map((ids,ii)=>{
      const id=v10Pick(ids,diff,new RNG(`v10|pick|${code}|${diff}|${bi}|${ii}`),used);used.add(id);
      const t=T.tl[id],q=t.gen(new RNG(`v10|gen|${code}|${diff}|${bi}|${ii}|${id}`));
      q.id=id;q.ch=t.ch;q.lv=t.lv;if(t.role)q.role=t.role;if(t.les)q.les=t.les;
      q.lbl=`${V10_ROM[bi]}.${ii+1}`;q.no=++k;return q;
    });
    if(items.length===1)items[0].lbl=V10_ROM[bi];   /* bài chỉ có một ý: ghi “III” thay cho “III.1” */
    bai.push({t:b.t,items,pts:items.reduce((a,q)=>a+qPts(q),0)});
  });
  return{code,diff,bai,tl:bai.flatMap(b=>b.items)};
}
/* khung giả dùng chung với thẻ Ma trận */
function v10BP(){
  return{grade:9,school:'THCS',mon:'Toán 9',title:V10.title,short:'Ôn thi vào lớp 10',chapters:[1,2,3,4,5,6,7,8,9,10],chName:CH9,tn:false,v10:true,
    nlc:[],ds:[],tln:[],tl:Array(10).fill(0),tlQ:Array(10).fill(1),pn:PTS.nlc,pt:PTS.tln};
}
/* một ý lớn: phần dẫn chung (nếu có) rồi các ý a), b) */
function v10Item(q,ii,withPts){
  const sp=q.parts.length>1&&q.parts[0].html.includes('<br>')?q.parts[0].html.split('<br>'):null;
  /* ii = -1: bài chỉ có một ý lớn, không ghi “1)” */
  let h=ii<0?(sp?`<div class="tl-part">${sp[0]}</div>`:''):`<div class="tl-part v10i"><b>${ii+1})</b> ${sp?sp[0]:''}</div>`;
  if(q.parts.length===1)return (ii<0?'':h.replace(/<\/div>$/,''))+`${ii<0?'<div class="tl-part">':' '}${q.parts[0].html}${withPts?` <i>(${pts(q.parts[0].pts)} điểm)</i>`:''}</div>`;
  q.parts.forEach((p,j)=>{const ph=j===0&&sp?sp.slice(1).join('<br>'):p.html;
    h+=`<div class="tl-part${ii<0?'':' v10s'}"><b>${'abc'[j]})</b> ${ph}${withPts?` <i>(${pts(p.pts)} điểm)</i>`:''}</div>`});
  return h;
}
function v10HTML(ex){
  const tm=state.time===90?V10.time:state.time;
  let h=`<article class="sheet exam"><header class="eh"><div class="l">
    <div>${state.dept?esc(state.dept.toUpperCase()):'SỞ GIÁO DỤC VÀ ĐÀO TẠO '+dots(8)}</div>
    <div class="school">${state.school?'TRƯỜNG THCS '+esc(state.school):'TRƯỜNG THCS '+dots(12)}</div>
    <div class="rule"></div>
    <div class="code">Mã đề: ${esc(ex.code)}</div>
  </div><div class="r">
    <div class="title">${V10.title}</div>
    <div class="sub">NĂM HỌC ${esc(state.year||dots(8))}</div>
    <div class="sub">MÔN: TOÁN</div>
    <div><i>Thời gian làm bài: ${tm} phút (không kể thời gian phát đề)</i></div>
  </div></header>
  <div class="nameline"><span>Họ và tên: ${dots(18)}</span><span>Số báo danh: ${dots(8)}</span></div>`;
  ex.bai.forEach((b,bi)=>{
    h+=`<div class="q"><div class="qs"><b>Bài ${V10_ROM[bi]}.</b> <i>(${v10P(b.pts)} điểm)</i></div>`;
    b.items.forEach((q,ii)=>{h+=v10Item(q,b.items.length>1?ii:-1,false)});
    h+='</div>';
  });
  h+=`<div class="endmark">— HẾT —</div><p class="endnote">Thí sinh không được sử dụng tài liệu. Cán bộ coi thi không giải thích gì thêm.</p><div class="brandline">Xưởng đề Toán · Thầy Công · Mã đề ${esc(ex.code)}</div></article>`;
  return h;
}
function v10KeyHTML(ex){
  let h=`<article class="sheet key"><div class="kh"><h2>Hướng dẫn chấm</h2><p><b>${V10.title}</b> · Môn Toán · Năm học ${esc(state.year)} · Mã đề ${esc(ex.code)}</p><p>Tổng điểm: 10</p></div>
<section class="ksec"><p class="ksmall">Mọi cách giải đúng khác đều cho điểm tối đa của ý đó. Điểm toàn bài không làm tròn.</p>`;
  ex.bai.forEach((b,bi)=>{
    h+=`<div class="lg"><div class="qs"><b>Bài ${V10_ROM[bi]}</b> (${v10P(b.pts)} điểm) – ${esc(b.t)}</div>`;
    b.items.forEach((q,ii)=>{
      if(b.items.length>1)h+=`<div class="qs" style="margin-top:4px"><b>${ii+1})</b> <i>(${v10P(qPts(q))} điểm)</i></div>`;
      q.parts.forEach((p,j)=>{h+=q.parts.length>1?`<div class="why"><b>${'abc'[j]})</b> (${pts(p.pts)} điểm) ${q.sol[j]}</div>`:`<div class="why">${q.sol[j]}</div>`});
    });
    h+='</div>';
  });
  h+='</section>';
  const lv={NB:0,TH:0,VD:0,VDC:0};ex.tl.forEach(q=>lv[q.lv]+=qPts(q));
  h+=`<section class="ksec"><p class="ksmall">Mức độ: ${['NB','TH','VD','VDC'].filter(k=>lv[k]).map(k=>`${LV_NAME[k]} ${pts(lv[k])} đ`).join(' · ')}.</p><p class="ksmall noprint">Ma trận và bản đặc tả đầy đủ ở thẻ <b>Ma trận</b>.</p></section>`;
  return h+'</article>';
}
