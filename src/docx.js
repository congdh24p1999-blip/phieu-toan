/* ================= Xuất file Word (.docx) =================
   Tự tạo file .docx trong trình duyệt, không cần thư viện ngoài:
   - đọc trang đề/đáp án đang hiển thị (DOM), chuyển sang WordprocessingML;
   - phân số, căn, lim, hệ, góc có mũ → công thức Word (OMML), sửa được trong Word;
   - hình vẽ SVG → ảnh PNG;
   - đóng gói ZIP (không nén) bằng mã tự viết. */
const DOCX=(()=>{
  /* ---------- ZIP ---------- */
  const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
  const crc32=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRC[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
  const enc=s=>new TextEncoder().encode(s);
  function zip(files){/* files: [{name, data:Uint8Array}] */
    const parts=[],central=[];let off=0;
    const u16=v=>[v&255,(v>>8)&255],u32=v=>[v&255,(v>>8)&255,(v>>16)&255,(v>>>24)&255];
    for(const f of files){
      const nm=enc(f.name),c=crc32(f.data),sz=f.data.length;
      const lh=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(c),...u32(sz),...u32(sz),...u16(nm.length),...u16(0)]);
      parts.push(lh,nm,f.data);
      central.push(new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(c),...u32(sz),...u32(sz),...u16(nm.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(off)]),nm);
      off+=lh.length+nm.length+sz;
    }
    const cdSize=central.reduce((a,b)=>a+b.length,0);
    const end=new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(cdSize),...u32(off),...u16(0)]);
    return new Blob([...parts,...central,end],{type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
  }
  /* ---------- XML ---------- */
  const X=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const FONT='<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman" w:eastAsia="Times New Roman"/>';
  const NS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
  /* ---------- Kiểu chữ lấy từ CSS đang hiển thị ---------- */
  let BASE=16;
  const isEl=n=>n&&n.nodeType===1;
  const cs=el=>getComputedStyle(el);
  const has=(el,c)=>isEl(el)&&el.classList&&el.classList.contains(c);
  function fmtOf(el){/* định dạng chữ của phần tử */
    const s=cs(el),w=+s.fontWeight||(s.fontWeight==='bold'?700:400);
    return{b:w>=600,i:s.fontStyle==='italic',up:s.textTransform==='uppercase',sz:Math.max(14,Math.round(24*parseFloat(s.fontSize)/BASE)),
      va:el.closest&&el.closest('sup')?'superscript':el.closest&&el.closest('sub')?'subscript':''};
  }
  /* thứ tự phần tử theo lược đồ OOXML: rFonts, b, i, sz, szCs, vertAlign */
  const rPr=f=>`<w:rPr>${FONT}${f.b?'<w:b/>':''}${f.i?'<w:i/>':''}${f.sz&&f.sz!==24?`<w:sz w:val="${f.sz}"/><w:szCs w:val="${f.sz}"/>`:''}${f.va?`<w:vertAlign w:val="${f.va}"/>`:''}</w:rPr>`;
  const run=(t,f)=>`<w:r>${rPr(f)}<w:t xml:space="preserve">${X(f.up?t.toUpperCase():t)}</w:t></w:r>`;
  /* ---------- Công thức (OMML) ---------- */
  const mr=(t,f)=>t?`<m:r><m:rPr><m:nor/></m:rPr>${rPr({...f,va:'',sz:24,up:false})}<m:t xml:space="preserve">${X(t)}</m:t></m:r>`:'';
  const ME=a=>`<m:e>${a.join('')}</m:e>`;
  function mathEl(c,f){/* một phần tử → mảng phần tử OMML */
    const tag=c.tagName.toLowerCase();
    if(has(c,'fr')){const [a,b]=c.children;return[...(has(c,'ng')?[mr('\u2009',f)]:[]),`<m:f><m:num>${mathOf(a,f).join('')}</m:num><m:den>${mathOf(b,f).join('')}</m:den></m:f>`]}
    if(has(c,'rt')){const ov=c.querySelector('.ov');return[`<m:rad><m:radPr><m:degHide m:val="1"/></m:radPr><m:deg/>${ME(mathOf(ov,f))}</m:rad>`]}
    if(has(c,'lm')){const sm=c.querySelector('small');return[`<m:limLow>${ME([mr('lim',{...f,i:false})])}<m:lim>${mathOf(sm,f).join('')}</m:lim></m:limLow>`]}
    if(has(c,'cs')){const rows=[...c.querySelectorAll('.rows>span')];return[`<m:d><m:dPr><m:begChr m:val="{"/><m:endChr m:val=""/></m:dPr><m:e><m:eqArr>${rows.map(rw=>ME(mathOf(rw,f))).join('')}</m:eqArr></m:e></m:d>`]}
    if(has(c,'hw'))return[`<m:acc><m:accPr><m:chr m:val="̂"/></m:accPr>${ME(mathOf(c,f))}</m:acc>`];
    if(has(c,'ig')){const ib=c.querySelector('.ib'),ie=c.querySelector('.ie'),sm=ib?ib.children:[];
      return[`<m:nary><m:naryPr><m:chr m:val="∫"/>${ib?'':'<m:subHide m:val="1"/><m:supHide m:val="1"/>'}</m:naryPr><m:sub>${ib?mathOf(sm[1],f).join(''):''}</m:sub><m:sup>${ib?mathOf(sm[0],f).join(''):''}</m:sup>${ME(mathOf(ie,f))}</m:nary>`]}
    if(has(c,'ol'))return[`<m:bar><m:barPr><m:pos m:val="top"/></m:barPr>${ME(mathOf(c,f))}</m:bar>`];
    if(has(c,'vc'))return[`<m:acc><m:accPr><m:chr m:val="⃗"/></m:accPr>${ME(mathOf(c,f))}</m:acc>`];
    if(tag==='br')return[];
    const g={...f};if(tag==='i'||tag==='em')g.i=true;if(tag==='b'||tag==='strong')g.b=true;
    return mathOf(c,g);
  }
  function mathOf(node,f){/* nội dung con của node → mảng phần tử OMML */
    const out=[];
    for(const c of node.childNodes){
      if(c.nodeType===3){const t=c.nodeValue.replace(/\s+/g,' ');if(t)out.push(mr(t,f));continue}
      if(!isEl(c))continue;
      const tag=c.tagName.toLowerCase();
      if(tag==='sup'||tag==='sub'){const base=out.length?out.pop():'<m:r><m:t></m:t></m:r>',g={...f};const inner=mathOf(c,g);
        out.push(tag==='sup'?`<m:sSup>${ME([base])}<m:sup>${inner.join('')}</m:sup></m:sSup>`:`<m:sSub>${ME([base])}<m:sub>${inner.join('')}</m:sub></m:sSub>`);continue}
      out.push(...mathEl(c,f));
    }
    return out;
  }
  const isMath=el=>has(el,'fr')||has(el,'rt')||has(el,'lm')||has(el,'cs')||has(el,'hw')||has(el,'vc')||has(el,'ig')||has(el,'ol');
  /* ---------- Hình vẽ ---------- */
  let IMGS=[],imgMap=new Map();
  async function rasterize(svg){
    const vb=svg.viewBox&&svg.viewBox.baseVal,w=+svg.getAttribute('width')||(vb&&vb.width)||300,h=+svg.getAttribute('height')||(vb&&vb.height)||200;
    const cl=svg.cloneNode(true);cl.setAttribute('xmlns','http://www.w3.org/2000/svg');cl.setAttribute('width',w);cl.setAttribute('height',h);
    cl.setAttribute('style','font-family:"Times New Roman","Liberation Serif",serif;font-size:14px');
    const url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(cl));
    const img=new Image();await new Promise((ok,no)=>{img.onload=ok;img.onerror=no;img.src=url});
    const k=3,cv=document.createElement('canvas');cv.width=Math.round(w*k);cv.height=Math.round(h*k);
    const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);g.drawImage(img,0,0,cv.width,cv.height);
    const blob=await new Promise(ok=>cv.toBlob(ok,'image/png'));
    return{bytes:new Uint8Array(await blob.arrayBuffer()),w,h};
  }
  function drawing(svg){
    const im=imgMap.get(svg);if(!im)return'';
    const maxW=6000000,cx0=Math.round(im.w*9525),sc=Math.min(1,maxW/cx0),cx=Math.round(cx0*sc),cy=Math.round(im.h*9525*sc),id=im.n;
    return`<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${id}" name="Hinh ${id}"/><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${id}" name="hinh${id}.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdImg${id}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
  }
  /* ---------- Chữ trong đoạn ---------- */
  function inline(node){/* trả về chuỗi các w:r / m:oMath của nội dung inline */
    let s='';
    for(const c of node.childNodes){
      if(c.nodeType===3){let t=c.nodeValue.replace(/\s+/g,' ');if(t)s+=run(t,fmtOf(c.parentElement));continue}
      if(!isEl(c))continue;
      const tag=c.tagName.toLowerCase();
      if(cs(c).display==='none')continue;
      if(tag==='br'){s+='<w:r><w:br/></w:r>';continue}
      if(tag==='svg'){s+=drawing(c);continue}
      if(isMath(c)){s+=`<m:oMath>${mathEl(c,fmtOf(c)).join('')}</m:oMath>`;continue}
      s+=inline(c);
    }
    return s;
  }
  /* ---------- Khối ---------- */
  const pPr=o=>`<w:pPr>${o.keep?'<w:keepNext/>':''}${o.pb?'<w:pageBreakBefore/>':''}<w:spacing w:before="${o.before||0}" w:after="${o.after==null?40:o.after}" w:line="${o.line||264}" w:lineRule="auto"/>${o.ind?`<w:ind w:left="${o.ind}"/>`:''}${o.jc?`<w:jc w:val="${o.jc}"/>`:''}</w:pPr>`;
  const para=(content,o={})=>`<w:p>${pPr(o)}${content}</w:p>`;
  const BLOCK=new Set(['div','p','h1','h2','h3','h4','section','article','header','ol','ul','li','table','figure','main']);
  const isBlock=el=>BLOCK.has(el.tagName.toLowerCase())||['block','flex','grid','list-item','table'].includes(cs(el).display)&&el.tagName.toLowerCase()!=='span'||(el.tagName.toLowerCase()==='small'&&cs(el).display==='block');
  const TW=9638;/* bề rộng vùng in (twips) với lề 2 cm trên giấy A4 */
  function tbl(rows,{border=true,widths}={}){
    const n=Math.max(...rows.map(r=>r.length)),ws=widths||Array(n).fill(Math.floor(TW/n));
    const b=border?'single':'nil';
    return`<w:tbl><w:tblPr><w:tblW w:w="${TW}" w:type="dxa"/><w:jc w:val="center"/><w:tblBorders>${['top','left','bottom','right','insideH','insideV'].map(k=>`<w:${k} w:val="${b}" w:sz="4" w:space="0" w:color="000000"/>`).join('')}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="70" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${ws.map(w=>`<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>${rows.map(r=>`<w:tr>${r.map((c,i)=>`<w:tc><w:tcPr><w:tcW w:w="${ws[i]}" w:type="dxa"/>${c.shade?'<w:shd w:val="clear" w:color="auto" w:fill="EEEEEE"/>':''}</w:tcPr>${c.xml||para('')}</w:tc>`).join('')}</w:tr>`).join('')}</w:tbl>`;
  }
  function blocks(el,o={}){/* chuyển một phần tử khối thành chuỗi XML các đoạn/bảng */
    const tag=el.tagName.toLowerCase(),st=cs(el);
    if(st.display==='none')return'';
    const jc=st.textAlign==='center'?'center':st.textAlign==='right'?'right':'';
    /* các bố cục riêng */
    if(tag==='header'&&has(el,'eh')){
      const col=d=>[...d.children].filter(x=>!has(x,'rule')).map(x=>para(inline(x),{jc:'center',after:0})).join('');
      return tbl([[{xml:col(el.querySelector('.l'))},{xml:col(el.querySelector('.r'))}]],{border:false,widths:[4100,TW-4100]});
    }
    if(has(el,'nameline'))return para([...el.children].map(x=>inline(x)).join(run('      ',{})),{before:160,after:80});
    if(has(el,'opts')){
      const k=has(el,'c4')?4:has(el,'c2')?2:1,items=[...el.children],rows=[];
      for(let i=0;i<items.length;i+=k)rows.push(items.slice(i,i+k).map(x=>({xml:para(inline(x),{after:20})})));
      return tbl(rows,{border:false});
    }
    if(tag==='table'){
      const rows=[...el.querySelectorAll('tr')].map(tr=>[...tr.children].map(td=>({xml:para(inline(td),{jc:cs(td).textAlign==='left'?'':'center',after:0,line:240}),shade:tr.classList.contains('hi')})));
      return tbl(rows,{border:true})+para('',{after:40});
    }
    if(tag==='svg')return para(drawing(el),{jc:'center',after:60,keep:true});
    /* khối thường: gom chữ inline thành đoạn, khối con xử lí đệ quy */
    const ind=(o.ind||0)+(tag==='li'||has(el,'tl-part')||has(el,'why')?284:0);
    let out='',buf='';
    const pre=tag==='li'&&el.parentElement&&el.parentElement.tagName==='UL'&&cs(el).listStyleType!=='none'?run('– ',fmtOf(el)):'';
    const flush=()=>{if(buf.replace(/<[^>]+>/g,'').trim()||/<w:drawing|<m:oMath/.test(buf)){out+=para((out?'':pre)+buf,{jc,ind,keep:has(el,'part')||has(el,'qs')||/^h[1-4]$/.test(tag),before:has(el,'part')||/^h[23]$/.test(tag)?120:0,after:has(el,'qs')?20:40})}buf=''};
    for(const c of el.childNodes){
      if(c.nodeType===3){const t=c.nodeValue.replace(/\s+/g,' ');if(t.trim()||buf)buf+=t?run(t,fmtOf(el)):'';continue}
      if(!isEl(c))continue;
      if(cs(c).display==='none')continue;
      const t=c.tagName.toLowerCase();
      if(t==='br'){buf+='<w:r><w:br/></w:r>';continue}
      if(t==='svg'){flush();out+=para(drawing(c),{jc:'center',after:60,keep:true});continue}
      if(isMath(c)){buf+=`<m:oMath>${mathEl(c,fmtOf(c)).join('')}</m:oMath>`;continue}
      if(isBlock(c)){flush();out+=blocks(c,{ind});continue}
      buf+=inline(c);
    }
    flush();
    return out;
  }
  /* ---------- Tạo file ---------- */
  async function build(root){
    const sheets=[...root.querySelectorAll('.sheet')];
    BASE=parseFloat(cs(sheets[0]||root).fontSize)||16;
    IMGS=[];imgMap=new Map();
    let n=0;for(const svg of root.querySelectorAll('svg')){try{const im=await rasterize(svg);im.n=++n;IMGS.push(im);imgMap.set(svg,im)}catch(e){}}
    let body='';
    sheets.forEach((sh,i)=>{if(i>0)body+='<w:p><w:r><w:br w:type="page"/></w:r></w:p>';body+=blocks(sh)});
    const doc=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1021" w:right="1134" w:bottom="1021" w:left="1134" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
    const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr>${FONT}<w:sz w:val="24"/><w:szCs w:val="24"/><w:lang w:val="vi-VN"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="40" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style></w:styles>`;
    const settings=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"><w:defaultTabStop w:val="1134"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat><m:mathPr><m:mathFont m:val="Cambria Math"/><m:dispDef/></m:mathPr></w:settings>`;
    const ct=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;
    const rels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;
    const drels=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdSt" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdSe" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>${IMGS.map(im=>`<Relationship Id="rIdImg${im.n}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/hinh${im.n}.png"/>`).join('')}</Relationships>`;
    const now=new Date().toISOString().replace(/\.\d+Z$/,'Z');
    const core=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Đề Toán</dc:title><dc:creator>Xưởng đề Toán – Thầy Công</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${now}</dcterms:created></cp:coreProperties>`;
    return zip([{name:'[Content_Types].xml',data:enc(ct)},{name:'_rels/.rels',data:enc(rels)},{name:'word/document.xml',data:enc(doc)},{name:'word/styles.xml',data:enc(styles)},{name:'word/settings.xml',data:enc(settings)},{name:'word/_rels/document.xml.rels',data:enc(drels)},{name:'docProps/core.xml',data:enc(core)},...IMGS.map(im=>({name:`word/media/hinh${im.n}.png`,data:im.bytes}))]);
  }
  async function save(root,name){
    const blob=await build(root),a=document.createElement('a');
    a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();
    setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000);
  }
  return{build,save};
})();
