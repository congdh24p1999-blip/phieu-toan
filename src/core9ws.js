/* ===== Phiếu bài tập theo bài học SGK =====
   Chọn các dạng câu gắn với bài học (t.les, xem core9les.js), xếp từ dễ đến khó. */
const WS_CH_NAMES={7:CH7,8:CH_NAME,10:CH10,11:CH11,12:CH12};
/* Chuyên đề ôn thi tốt nghiệp THPT (chỉ ở lớp 12): 101 – 110 là các chủ đề của đề 12tn,
   111 là các dạng bám sát đề chính thức 2025, 112 là các câu xác suất vận dụng cao. Không có tự luận, đúng hình thức đề thi. */
const TN_WS_KINDS=['nlc','ds','tln'];
function tnWsPool(n,k){
  const bp=BLUEPRINT['12tn'];if(!TN_WS_KINDS.includes(k))return[];
  let P=mixPool(bp,k);
  if(n<=110)P=P.filter(t=>t.ch===n);
  else if(n===111){const ids=new Set([...bp.prefer.ds.flat(),...bp.prefer.tln.flat()]);P=P.filter(t=>ids.has(t.id)||(t.g==='tn'&&t.lv!=='VDC'))}
  else P=P.filter(t=>t.g==='tn'&&t.lv==='VDC');
  return P.map(t=>({...t,les:[n]}));
}
/* Danh sách bài học có câu hỏi của một lớp: [{n, title, ch, hk, count}] */
function wsLessons(g){
  const m={};
  for(const k in T)for(const id in T[k]){const t=T[k][id];if((t.g||8)!==g||!t.les)continue;
    for(const l of t.les){const o=m[l]=m[l]||{n:l,title:LESSON_TITLES[g][l],chs:{},hk:t.hk||1,count:0};o.count++;o.chs[t.ch]=(o.chs[t.ch]||0)+1}}
  const L=Object.values(m).map(o=>({...o,ch:+Object.entries(o.chs).sort((a,b)=>b[1]-a[1])[0][0]})).sort((a,b)=>a.n-b.n);
  if(g===12)for(let n=101;n<=112;n++)L.push({n,title:LESSON_TITLES[12][n],ch:100,hk:'tn',count:TN_WS_KINDS.reduce((s,k)=>s+tnWsPool(n,k).length,0)});
  return L;
}
const WS_LV={co_ban:['NB','TH'],chuan:['NB','TH','VD'],nang_cao:['TH','VD','VDC']};
const WS_KINDS=['nlc','ds','tln','tl'];
const WS_SHARE={nlc:.4,ds:.1,tln:.3,tl:.2};
/* Tạo phiếu: o={grade, lessons:[n], n, kind:'mix'|'nlc'|'ds'|'tln'|'tl', diff, code, ext} */
function buildWS(o){
  const g=o.grade,les=[...o.lessons].sort((a,b)=>a-b),S=`ws|${g}|${les.join(',')}|${o.kind}|${o.diff}|${o.code}|${o.n}`;
  ALLOW_EXT=!!o.ext;CUR_DIFF=o.diff==='nang_cao'?'nang_cao':'chuan';
  const lvOK=WS_LV[o.diff]||WS_LV.chuan;
  const base=k=>Object.values(T[k]).filter(t=>(t.g||8)===g&&t.les&&t.les.some(l=>les.includes(l))&&(!t.ext||extOK())).concat(g===12?les.filter(l=>l>100).flatMap(l=>tnWsPool(l,k)):[]);
  const pools={};for(const k of WS_KINDS)pools[k]=base(k);
  /* số câu mỗi loại */
  const want={nlc:0,ds:0,tln:0,tl:0};
  if(o.kind!=='mix')want[o.kind]=pools[o.kind].length?o.n:0;
  else{
    const ks=WS_KINDS.filter(k=>pools[k].length),tot=ks.reduce((a,k)=>a+WS_SHARE[k],0);
    let left=o.n;ks.forEach(k=>{want[k]=Math.floor(o.n*WS_SHARE[k]/tot);left-=want[k]});
    while(left>0&&ks.length){const k=ks.slice().sort((a,b)=>(pools[b].length-want[b])-(pools[a].length-want[a]))[0];want[k]++;left--}
    /* loại nào thiếu dạng thì chuyển phần thừa sang loại còn dạng chưa dùng, để hạn chế lặp */
    for(let it=0;it<8;it++)for(const k of ks){let ex=want[k]-pools[k].length;if(ex<=0)continue;
      for(const to of ['nlc','tln','ds','tl']){if(to===k||!pools[to].length)continue;const sp=pools[to].length-want[to];if(sp<=0)continue;const m=Math.min(sp,ex);want[to]+=m;want[k]-=m;ex-=m;if(!ex)break}}
  }
  const r=new RNG(S),out={nlc:[],ds:[],tln:[],tl:[]};let repeats=0,seq=0;
  for(const k of WS_KINDS){
    const P=r.shuffle(pools[k]);if(!want[k]||!P.length)continue;
    /* lần lượt theo từng bài học để phiếu phủ đều các bài */
    const used=new Map(),pick=[];let li=0,guard=0;
    const pref=t=>lvOK.includes(t.lv)?0:1;/* ưu tiên mức độ hợp với độ khó đã chọn */
    while(pick.length<want[k]&&guard++<1000){
      const l=les[li++%les.length],inL=P.filter(t=>t.les.includes(l));if(!inL.length)continue;
      let c=inL.filter(t=>!used.has(t.id));
      if(!c.length&&P.some(t=>!used.has(t.id)&&les.some(x=>x!==l&&t.les.includes(x))))continue;
      if(c.length){const b=Math.min(...c.map(pref));c=c.filter(t=>pref(t)===b)}
      else{const mn=Math.min(...inL.map(t=>used.get(t.id)||0));c=inL.filter(t=>(used.get(t.id)||0)===mn);const b=Math.min(...c.map(pref));c=c.filter(t=>pref(t)===b);repeats++}
      const t=c[r.int(0,c.length-1)];used.set(t.id,(used.get(t.id)||0)+1);pick.push(t);
    }
    for(const t of pick){
      const rg=new RNG(`${S}|gen|${k}|${seq++}|${t.id}`);let q=t.gen(rg);
      if(RELABEL_RE.test(t.id)){const L=g===11?PT_LETTERS11:PT_LETTERS,sh=rg.int(0,L.length-1);if(sh)q=relabelDeep(q,sh,L)}
      q.id=t.id;q.ch=t.ch;q.lv=t.lv;if(t.ext)q.ext=t.ext;q.les=t.les;out[k].push(q);
    }
    out[k].sort((a,b)=>LV_RANK[a.lv]-LV_RANK[b.lv]||Math.min(...a.les)-Math.min(...b.les));
  }
  return{...out,grade:g,lessons:les,code:o.code,diff:o.diff,repeats,want,pools:Object.fromEntries(WS_KINDS.map(k=>[k,pools[k].length]))};
}
