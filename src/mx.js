/* ================================================================
   Ma trận và bản đặc tả đề kiểm tra định kì
   Theo mẫu tại Phụ lục kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024:
   – cột: TNKQ (Nhiều lựa chọn, "Đúng – Sai", Trả lời ngắn) và Tự luận, mỗi dạng chia 3 mức Biết / Hiểu / Vận dụng;
   – hàng: Chủ đề/Chương → Nội dung/đơn vị kiến thức (ở đây là bài học SGK);
   – mỗi ô: số câu (Đúng – Sai tính theo ý) và số thứ tự câu trong đề.
   Chỉ dùng khai báo function (được nâng lên đầu) để ui.js gọi được ngay khi tải trang.
   ================================================================ */
function mxLvl(lv){return lv==='NB'?0:lv==='TH'?1:2}            /* Biết / Hiểu / Vận dụng (gộp cả vận dụng cao) */
function mxKinds(){return['nlc','ds','tln','tl']}
function mxLow(s){return s?s.charAt(0).toLowerCase()+s.slice(1):s}
/* Năng lực chủ yếu (gợi ý): TD – tư duy và lập luận; MH – mô hình hoá; GQVĐ – giải quyết vấn đề toán học */
function mxNL(q,l){
  if(l<2)return 'TD';
  return q.role==='real'||/real|wp|thuc|cost|garden|pond|ladder|shadow|tower|price|money|bank|rent|trip|tank|field/.test(q.id||'')?'MH':'GQVĐ';
}
/* Yêu cầu cần đạt viết khái quát theo tên bài; giáo viên chỉnh lại theo chương trình và kế hoạch dạy học */
function mxYC(title,l){
  const t=mxLow(title);
  return [`Nhận biết được các khái niệm, kí hiệu, tính chất cơ bản về ${t}.`,
          `Hiểu và thực hiện được các tính toán, biến đổi hoặc suy luận trực tiếp về ${t}.`,
          `Vận dụng được kiến thức về ${t} để giải bài toán nhiều bước hoặc gắn với thực tiễn.`][l];
}
function mxPctTxt(x){return (Math.round(x*10)/10).toLocaleString('vi-VN')}

/* Gom các câu của một mã đề theo chương → bài, đếm theo dạng và mức độ */
function mxData(v,bp){
  const P=partTitles(bp),items=[];
  const push=(q,kind,n,cnt,p)=>items.push({q,kind,n,cnt,pts:p,l:mxLvl(q.lv)});
  v.nlc.forEach((q,i)=>push(q,'nlc',i+1,1,bp.pn));
  v.ds.forEach((q,i)=>push(q,'ds',P.s2+i,4,4*PTS.dsItem));
  v.tln.forEach((q,i)=>push(q,'tln',P.s3+i,1,bp.pt));
  v.tl.forEach((q,i)=>push(q,'tl',q.lbl||P.s4+i,1,qPts(q)));
  const LT=(typeof LESSON_TITLES!=='undefined'&&LESSON_TITLES[bp.grade])||{};
  const chs=bp.chapters.map(c=>({c,name:bp.tn?`Chủ đề ${c-100}. ${bp.chName[c]}`:`Chương ${ROM10[c]||c}. ${bp.chName[c]}`,rows:{}}));
  const byC=Object.fromEntries(chs.map(x=>[x.c,x]));
  const blank=()=>({cell:Object.fromEntries(mxKinds().map(k=>[k,[0,1,2].map(()=>({n:0,qs:[],nl:new Set()}))])),pts:0,lv:[0,0,0]});
  items.forEach(it=>{
    const ch=byC[it.q.ch];if(!ch)return;
    /* đề ôn thi tốt nghiệp: câu lấy từ dạng của lớp 10, 11, 12 nên tra tên bài theo lớp của dạng câu */
    const tg=bp.tn?(T[it.kind]&&T[it.kind][it.q.id]&&T[it.kind][it.q.id].g):bp.grade;
    const LTg=bp.tn?(typeof LESSON_TITLES!=='undefined'&&LESSON_TITLES[tg])||{}:LT;
    const ln=it.q.les&&it.q.les.length&&LTg[it.q.les[0]]?it.q.les[0]:0;
    const les=ln?(bp.tn?(+tg)*100+ln:ln):0;
    const r=ch.rows[les]=ch.rows[les]||Object.assign(blank(),{les,title:ln?`Bài ${ln}. ${LTg[ln]}${bp.tn?` (Toán ${tg})`:''}`:bp.chName[it.q.ch]});
    const c=r.cell[it.kind][it.l];c.n+=it.cnt;c.qs.push(it.n);c.nl.add(mxNL(it.q,it.l));
    r.pts+=it.pts;r.lv[it.l]+=it.cnt;
  });
  chs.forEach(ch=>{ch.list=Object.values(ch.rows).sort((a,b)=>a.les-b.les)});
  const used=chs.filter(ch=>ch.list.length);
  /* tổng theo cột */
  const tot={cnt:Object.fromEntries(mxKinds().map(k=>[k,[0,0,0]])),kpts:{nlc:0,ds:0,tln:0,tl:0},lpts:[0,0,0],lcnt:[0,0,0],all:0};
  items.forEach(it=>{tot.cnt[it.kind][it.l]+=it.cnt;tot.kpts[it.kind]+=it.pts;tot.lpts[it.l]+=it.pts;tot.lcnt[it.l]+=it.cnt;tot.all+=it.pts});
  return{used,tot,P};
}

/* Phần đầu bảng dùng chung cho ma trận và bản đặc tả */
function mxHead(first,extraLast){
  const sub=['Biết','Hiểu','Vận dụng'].map(x=>`<th>${x}</th>`).join('');
  const nTop=first.length;
  return `<thead>
<tr class="hi">${first.map(h=>`<th rowspan="4">${h}</th>`).join('')}<th colspan="12">${extraLast?'Số câu hỏi ở các mức độ đánh giá':'Mức độ đánh giá'}</th>${extraLast?'':'<th colspan="3" rowspan="3">Tổng</th><th rowspan="4">Tỉ lệ % điểm</th>'}</tr>
<tr class="hi"><th colspan="9">TNKQ</th><th colspan="3" rowspan="2">Tự luận</th></tr>
<tr class="hi"><th colspan="3">Nhiều lựa chọn</th><th colspan="3">“Đúng – Sai”</th><th colspan="3">Trả lời ngắn</th></tr>
<tr class="hi">${sub.repeat(extraLast?4:5)}</tr></thead>`;
}
function mxCell(c,withNL){
  if(!c.n)return '<td></td>';
  const qs=c.qs.map(n=>typeof n==='string'?n:'C'+n).join(', ');
  return `<td><b>${c.n}</b><br><small>${qs}</small>${withNL?`<br><small>${[...c.nl].join(', ')}</small>`:''}</td>`;
}
function mxFoot(d,withTotals){
  const {tot}=d,K=mxKinds();
  const cnt=K.map(k=>tot.cnt[k].map(n=>`<td><b>${n||''}</b></td>`).join('')).join('');
  const kp=K.map(k=>`<td colspan="3"><b>${pts(tot.kpts[k])}</b></td>`).join('');
  const kr=K.map(k=>`<td colspan="3"><b>${mxPctTxt(tot.kpts[k]*100/(tot.all||1))}</b></td>`).join('');
  const lc=withTotals?tot.lcnt.map(n=>`<td><b>${n}</b></td>`).join('')+'<td></td>':'';
  const lp=withTotals?tot.lpts.map(p=>`<td><b>${pts(p)}</b></td>`).join('')+`<td><b>${pts(tot.all)}</b></td>`:'';
  const lr=withTotals?tot.lpts.map(p=>`<td><b>${mxPctTxt(p*100/(tot.all||1))}</b></td>`).join('')+'<td><b>100</b></td>':'';
  const span=withTotals?3:4;
  return `<tr class="hi"><td class="l" colspan="${span}"><b>Tổng số câu</b></td>${cnt}${lc}</tr>
<tr class="hi"><td class="l" colspan="${span}"><b>Tổng số điểm</b></td>${kp}${lp}</tr>
<tr class="hi"><td class="l" colspan="${span}"><b>Tỉ lệ %</b></td>${kr}${lr}</tr>`;
}

function mxHTML(base,v0,bp){
  const d=mxData(v0,bp),K=mxKinds(),tot=d.tot.all||1;
  const school=state.school?esc(state.school).toUpperCase():'';
  let h=`<article class="sheet mxs"><header class="mxh">${school?`<p class="mxsc">${school}</p>`:''}
<h2>MA TRẬN VÀ BẢN ĐẶC TẢ ${esc(bp.title)}</h2>
<p><b>MÔN: TOÁN – LỚP ${bp.grade} – NĂM HỌC ${esc(state.year)}</b></p>
<p class="mxn">Theo mẫu tại Phụ lục kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT. Số thứ tự câu ghi theo mã đề ${esc(v0.code)}; thời gian làm bài ${bp.v10&&state.time===90?V10.time:esc(state.time)} phút.</p></header>`;

  /* ---------- I. Ma trận ---------- */
  h+=`<h3>I. Ma trận đề kiểm tra</h3><div class="mxwrap"><table class="kt mxt" data-w="3,9,14,${Array(15).fill(3.6).join(',')},5">${mxHead(['TT','Chủ đề/Chương','Nội dung/đơn vị kiến thức'],false)}<tbody>`;
  d.used.forEach((ch,ci)=>ch.list.forEach((r,ri)=>{
    h+='<tr>';
    if(ri===0)h+=`<td rowspan="${ch.list.length}">${ci+1}</td><td class="l" rowspan="${ch.list.length}">${esc(ch.name)}</td>`;
    h+=`<td class="l">${esc(r.title)}</td>${K.map(k=>r.cell[k].map(c=>mxCell(c,false)).join('')).join('')}`;
    h+=r.lv.map(n=>`<td>${n||''}</td>`).join('')+`<td>${mxPctTxt(r.pts*100/tot)}</td></tr>`;
  }));
  h+=mxFoot(d,true)+'</tbody></table></div>';

  /* ---------- II. Bản đặc tả ---------- */
  h+=`<h3 class="mxpb">II. Bản đặc tả đề kiểm tra</h3><div class="mxwrap"><table class="kt mxt" data-w="3,8,11,26,${Array(12).fill(3.6).join(',')}">${mxHead(['TT','Chủ đề/Chương','Nội dung/đơn vị kiến thức','Yêu cầu cần đạt'],true)}<tbody>`;
  d.used.forEach((ch,ci)=>ch.list.forEach((r,ri)=>{
    const lv=[0,1,2].filter(l=>K.some(k=>r.cell[k][l].n));
    /* lớp có bảng yêu cầu cần đạt theo từng bài (yccd9.js) thì dùng bảng đó, các lớp khác viết khái quát theo tên bài */
    const YT=!bp.tn&&typeof YCCD!=='undefined'&&YCCD[bp.grade]&&YCCD[bp.grade][r.les];
    const yc=lv.map(l=>`<b>– ${['Biết','Hiểu','Vận dụng'][l]}:</b> ${esc(YT?YT[l]:mxYC(r.title.replace(/^Bài \d+\.\s*/,'').replace(/\s*\((Toán \d+|lớp[^)]*)\)\s*$/,''),l))}`).join('<br>');
    h+='<tr>';
    if(ri===0)h+=`<td rowspan="${ch.list.length}">${ci+1}</td><td class="l" rowspan="${ch.list.length}">${esc(ch.name)}</td>`;
    h+=`<td class="l">${esc(r.title)}</td><td class="l yc">${yc}</td>${K.map(k=>r.cell[k].map(c=>mxCell(c,true)).join('')).join('')}</tr>`;
  }));
  h+=mxFoot(d,false)+'</tbody></table></div>';

  /* ---------- Ghi chú ---------- */
  const lvTxt=['Biết','Hiểu','Vận dụng'].map((x,l)=>`${x} ${mxPctTxt(d.tot.lpts[l]*100/tot)}%`).join(', ');
  const kTxt=[['nlc','nhiều lựa chọn'],['ds','đúng – sai'],['tln','trả lời ngắn'],['tl','tự luận']].map(([k,x])=>`${x} ${mxPctTxt(d.tot.kpts[k]*100/tot)}%`).join(', ');
  h+=`<section class="mxnote"><p><b>Ghi chú</b></p><ul>
<li>${bp.v10?'Mỗi ô ghi số ý; dòng dưới là vị trí trong đề, ví dụ II.1 là ý 1) của Bài II.':'Mỗi ô ghi số câu hỏi (phần “Đúng – Sai” ghi số ý, mỗi câu gồm 4 ý); dòng dưới là số thứ tự câu trong đề, ví dụ C5 là câu 5.'}</li>
<li>Tỉ lệ điểm của đề này theo mức độ: ${lvTxt}; theo dạng câu: ${kTxt}. Mẫu của Bộ gợi ý khoảng 40% – 30% – 30% theo mức độ và 30% – 20% – 20% – 30% theo dạng câu; nhà trường được điều chỉnh cho phù hợp.</li>
<li>Mức “Vận dụng” gồm cả các câu vận dụng cao. Mức độ do người soạn gán cho từng dạng câu, có thể khác cách phân loại của tổ chuyên môn.</li>
<li>Dòng cuối mỗi ô của bản đặc tả ghi năng lực chủ yếu (gợi ý): TD – tư duy và lập luận toán học; MH – mô hình hoá toán học; GQVĐ – giải quyết vấn đề toán học.</li>
<li>${typeof YCCD!=='undefined'&&YCCD[bp.grade]&&!bp.tn?'Cột “Yêu cầu cần đạt” viết theo từng bài, dựa trên yêu cầu cần đạt lớp '+bp.grade+' của Chương trình môn Toán 2018; thầy cô có thể chỉnh cho khớp kế hoạch dạy học của trường (tải bản Word để sửa).':'Cột “Yêu cầu cần đạt” được viết khái quát theo tên bài học. Thầy cô đối chiếu Chương trình môn Toán 2018 và kế hoạch dạy học của trường để chỉnh lại trước khi nộp; tải bản Word để sửa trực tiếp.'}</li>
</ul></section>`;
  return h+'</article>';
}
