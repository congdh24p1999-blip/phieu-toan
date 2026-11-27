/* ================================================================
   Làm gọn hình vẽ (áp dụng cho mọi mẫu câu sau khi sinh đề):
   - nhãn điểm (A, B′, M…) và nhãn số đo (8 cm, 60°, h…) bị đè lên nét vẽ, lên điểm hay lên
     nhãn khác thì được dời sang chỗ trống gần nhất; nhãn đang ổn thì giữ nguyên;
   - hình hình học (có nhãn điểm) được phóng to, nét đứt và chữ nhãn dễ đọc hơn.
   Biểu đồ cột, biểu đồ tròn, bảng biến thiên không có nhãn điểm nên không bị đổi.
   Chỉ xử lý chuỗi, không cần trình duyệt (chạy được trong node để kiểm thử).
   ================================================================ */
const FIG=(()=>{
  const A=(t,a)=>{const m=t.match(new RegExp('\\s'+a+'="([^"]*)"'));return m?m[1]:null};
  const N=(t,a,d=0)=>{const v=parseFloat(A(t,a));return Number.isFinite(v)?v:d};
  const PT_RE=/^(?:[A-Z][′'″]?|[a-z])$/;               /* nhãn điểm, tên đường thẳng (T2, Q1… là nhãn biểu đồ, không tính) */
  const MS_RE=/^(?:[−-]?\d+(?:[,.]\d+)?\s?(?:cm|mm|dm|m|km)|\d+(?:[,.]\d+)?°|[a-z]|\?)$/;   /* nhãn số đo */
  const plain=s=>s.replace(/<[^>]*>/g,'').replace(/&[a-z]+;/g,'x').trim();
  /* độ rộng chữ ước lượng (em) cho phông Times */
  const cw=c=>/[A-Z]/.test(c)?.68:/[mw]/.test(c)?.75:/[a-z0-9]/.test(c)?.5:/[ °,.′'″]/.test(c)?.3:.55;
  const tw=(s,fs)=>[...s].reduce((a,c)=>a+cw(c),0)*fs;
  /* ---- tách nét vẽ thành các đoạn thẳng ---- */
  function arcPts(x1,y1,rx,ry,phi,fa,fs,x2,y2){
    const c=Math.cos(phi),s=Math.sin(phi),dx=(x1-x2)/2,dy=(y1-y2)/2,xp=c*dx+s*dy,yp=-s*dx+c*dy;
    rx=Math.abs(rx);ry=Math.abs(ry);if(!rx||!ry)return[[x1,y1],[x2,y2]];
    const lam=xp*xp/(rx*rx)+yp*yp/(ry*ry);if(lam>1){rx*=Math.sqrt(lam);ry*=Math.sqrt(lam)}
    let k=Math.sqrt(Math.max(0,(rx*rx*ry*ry-rx*rx*yp*yp-ry*ry*xp*xp)/(rx*rx*yp*yp+ry*ry*xp*xp)));if(fa===fs)k=-k;
    const cxp=k*rx*yp/ry,cyp=-k*ry*xp/rx,cx=c*cxp-s*cyp+(x1+x2)/2,cy=s*cxp+c*cyp+(y1+y2)/2;
    const ang=(ux,uy,vx,vy)=>{const a=Math.atan2(ux*vy-uy*vx,ux*vx+uy*vy);return a};
    const t1=ang(1,0,(xp-cxp)/rx,(yp-cyp)/ry);let dt=ang((xp-cxp)/rx,(yp-cyp)/ry,(-xp-cxp)/rx,(-yp-cyp)/ry);
    if(!fs&&dt>0)dt-=2*Math.PI;if(fs&&dt<0)dt+=2*Math.PI;
    const n=Math.max(4,Math.ceil(Math.abs(dt)/(Math.PI/12))),out=[];
    for(let i=0;i<=n;i++){const t=t1+dt*i/n,X=rx*Math.cos(t),Y=ry*Math.sin(t);out.push([c*X-s*Y+cx,s*X+c*Y+cy])}
    return out;
  }
  function pathSegs(d,segs){
    const tk=d.match(/[MLHVCSQTAZmlhvcsqtaz]|-?\d*\.?\d+(?:e-?\d+)?/g)||[];let i=0,cmd='',x=0,y=0,sx=0,sy=0;
    const nx=()=>parseFloat(tk[i++]);const add=(a,b)=>segs.push([a[0],a[1],b[0],b[1]]);
    while(i<tk.length){
      if(/[A-Za-z]/.test(tk[i]))cmd=tk[i++];
      const rel=cmd===cmd.toLowerCase(),C=cmd.toUpperCase();
      if(C==='Z'){add([x,y],[sx,sy]);x=sx;y=sy;continue}
      if(i>=tk.length||/[A-Za-z]/.test(tk[i]))continue;
      if(C==='M'){x=nx()+(rel?x:0);y=nx()+(rel?y:0);sx=x;sy=y;cmd=rel?'l':'L'}
      else if(C==='L'||C==='T'){const X=nx()+(rel?x:0),Y=nx()+(rel?y:0);add([x,y],[X,Y]);x=X;y=Y}
      else if(C==='H'){const X=nx()+(rel?x:0);add([x,y],[X,y]);x=X}
      else if(C==='V'){const Y=nx()+(rel?y:0);add([x,y],[x,Y]);y=Y}
      else if(C==='C'||C==='S'||C==='Q'){const n=C==='C'?3:2,p=[[x,y]];for(let k=0;k<n;k++){const X=nx()+(rel?x:0),Y=nx()+(rel?y:0);p.push([X,Y])}
        let prev=[x,y];for(let t=1;t<=8;t++){const u=t/8;let q=p.map(a=>a.slice());while(q.length>1)q=q.slice(1).map((b,j)=>[q[j][0]+(b[0]-q[j][0])*u,q[j][1]+(b[1]-q[j][1])*u]);add(prev,q[0]);prev=q[0]}
        x=p[n][0];y=p[n][1]}
      else if(C==='A'){const rx=nx(),ry=nx(),ph=nx()*Math.PI/180,fa=nx(),fs=nx(),X=nx()+(rel?x:0),Y=nx()+(rel?y:0);
        const P=arcPts(x,y,rx,ry,ph,fa,fs,X,Y);for(let k=1;k<P.length;k++)add(P[k-1],P[k]);x=X;y=Y}
      else i++;
    }
  }
  function parse(svg){
    const segs=[],dots=[],texts=[];
    for(const m of svg.matchAll(/<line\b[^>]*>/g)){const t=m[0];segs.push([N(t,'x1'),N(t,'y1'),N(t,'x2'),N(t,'y2')])}
    for(const m of svg.matchAll(/<(polyline|polygon)\b[^>]*>/g)){const p=(A(m[0],'points')||'').trim().split(/[\s,]+/).map(Number);
      for(let k=2;k+1<p.length;k+=2)segs.push([p[k-2],p[k-1],p[k],p[k+1]]);if(m[1]==='polygon'&&p.length>=4)segs.push([p[p.length-2],p[p.length-1],p[0],p[1]])}
    for(const m of svg.matchAll(/<path\b[^>]*>/g)){const d=A(m[0],'d');if(d&&A(m[0],'fill')!=='#000')pathSegs(d,segs)}
    for(const m of svg.matchAll(/<rect\b[^>]*>/g)){const t=m[0],x=N(t,'x'),y=N(t,'y'),w=N(t,'width'),h=N(t,'height');if(w<40&&h<40)segs.push([x,y,x+w,y],[x+w,y,x+w,y+h],[x+w,y+h,x,y+h],[x,y+h,x,y])}
    for(const m of svg.matchAll(/<(circle|ellipse)\b[^>]*>/g)){const t=m[0],cx=N(t,'cx'),cy=N(t,'cy'),rx=N(t,'r')||N(t,'rx'),ry=N(t,'r')||N(t,'ry');
      if(rx<=3.2)dots.push([cx,cy]);else for(let k=0;k<36;k++){const a=k*Math.PI/18,b=(k+1)*Math.PI/18;segs.push([cx+rx*Math.cos(a),cy+ry*Math.sin(a),cx+rx*Math.cos(b),cy+ry*Math.sin(b)])}}
    for(const m of svg.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)){
      const at=m[1],inner=m[2],s=plain(inner),fs=N(m[0],'font-size',12),x=N(m[0],'x'),y=N(m[0],'y'),an=A(m[0],'text-anchor')||'start';
      const w=tw(s,fs),h=fs*.92,x0=an==='middle'?x-w/2:an==='end'?x-w:x;
      const kind=/\sx="/.test(inner)||/rotate|transform/.test(at)?'fix':PT_RE.test(s)?'pt':MS_RE.test(s)?'ms':/^[−-]?\d+(?:[,.]\d+)?$/.test(s)?'tk':'fix';
      texts.push({raw:m[0],at,inner,s,fs,kind,box:[x0,y-fs*.72,x0+w,y-fs*.72+h],x,y});
    }
    return{segs,dots,texts};
  }
  /* ---- hình học cơ bản ---- */
  const segBox=(s,b)=>{ /* đoạn thẳng cắt hình chữ nhật b? */
    const [x1,y1,x2,y2]=s,[l,t,r,bt]=b;
    if(Math.max(x1,x2)<l||Math.min(x1,x2)>r||Math.max(y1,y2)<t||Math.min(y1,y2)>bt)return false;
    const inB=(x,y)=>x>=l&&x<=r&&y>=t&&y<=bt;if(inB(x1,y1)||inB(x2,y2))return true;
    const cr=(ax,ay,bx,by,cx,cy,dx,dy)=>{const d=(bx-ax)*(dy-cy)-(by-ay)*(dx-cx);if(!d)return false;const u=((cx-ax)*(dy-cy)-(cy-ay)*(dx-cx))/d,v=((cx-ax)*(by-ay)-(cy-ay)*(bx-ax))/d;return u>=0&&u<=1&&v>=0&&v<=1};
    return cr(x1,y1,x2,y2,l,t,r,t)||cr(x1,y1,x2,y2,r,t,r,bt)||cr(x1,y1,x2,y2,l,bt,r,bt)||cr(x1,y1,x2,y2,l,t,l,bt);
  };
  const ov=(a,b)=>Math.max(0,Math.min(a[2],b[2])-Math.max(a[0],b[0]))*Math.max(0,Math.min(a[3],b[3])-Math.max(a[1],b[1]));
  const shrink=(b,d)=>[b[0]+d,b[1]+d,b[2]-d,b[3]-d];
  const dPS=(px,py,s)=>{const [x1,y1,x2,y2]=s,dx=x2-x1,dy=y2-y1,L=dx*dx+dy*dy||1,t=Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/L));return Math.hypot(px-x1-t*dx,py-y1-t*dy)};
  function tidySVG(svg,opt={}){
    const vb=(A(svg.match(/<svg\b[^>]*>/)[0],'viewBox')||'').split(/[\s,]+/).map(Number);if(vb.length<4)return svg;
    const [VX,VY,VW,VH]=vb,{segs,dots,texts}=parse(svg);
    const nPt=texts.filter(t=>t.kind==='pt').length,nMs=texts.filter(t=>t.kind==='ms').length,nFix=texts.filter(t=>t.kind==='fix').length;
    /* số trên trục chỉ dời khi là đồ thị hàm số (có nhãn O, x, y…), không đụng tới biểu đồ cột */
    if(!nPt)texts.forEach(t=>{if(t.kind==='tk')t.kind='fix'});
    const geo=nPt>=2||(nMs>=1&&nFix<=2&&!/<rect\b[^>]*height="(?:[2-9]\d|\d{3})/.test(svg));
    if(!nPt&&!geo)return svg;   /* không phải hình hình học */
    const mov=texts.filter(t=>t.kind!=='fix');
    /* tâm hình: ưu tiên đặt nhãn ra phía ngoài */
    let gx=0,gy=0,gn=0;segs.forEach(s=>{gx+=s[0]+s[2];gy+=s[1]+s[3];gn+=2});gx/=gn||1;gy/=gn||1;
    const outPen=(x,y,ax,ay)=>{const ux=x-ax,uy=y-ay,vx=ax-gx,vy=ay-gy,l1=Math.hypot(ux,uy)||1,l2=Math.hypot(vx,vy);if(l2<4)return 0;const c=(ux*vx+uy*vy)/(l1*l2);return c<0?-c*2.5:0};
    /* chữ nhãn to hơn một chút */
    if(geo)mov.forEach(t=>{if(t.kind==='tk')return;const f=t.kind==='pt'?Math.max(t.fs,12.5):Math.max(t.fs,11);if(f!==t.fs){const k=f/t.fs,cx=(t.box[0]+t.box[2])/2,cy=(t.box[1]+t.box[3])/2,w=(t.box[2]-t.box[0])*k,h=(t.box[3]-t.box[1])*k;t.box=[cx-w/2,cy-h/2,cx+w/2,cy+h/2];t.fs=f;t.chg=true}});
    const anchors=dots.slice();segs.forEach(s=>{anchors.push([s[0],s[1]],[s[2],s[3]])});
    const cost=(t,b)=>{
      let c=0;const bi=shrink(b,.6);
      for(const s of segs)if(segBox(s,bi))c+=10;
      for(const d of dots)if(d[0]>b[0]-1.5&&d[0]<b[2]+1.5&&d[1]>b[1]-1.5&&d[1]<b[3]+1.5)c+=12;
      for(const o of texts)if(o!==t){const a=ov([b[0]-2,b[1]-1.5,b[2]+2,b[3]+1.5],o.box);if(a>0)c+=8+20*a/Math.min((b[2]-b[0])*(b[3]-b[1]),(o.box[2]-o.box[0])*(o.box[3]-o.box[1])||1)}
      if(b[0]<VX+1||b[1]<VY+1||b[2]>VX+VW-1||b[3]>VY+VH-1)c+=30;
      return c};
    for(let pass=0;pass<2;pass++)for(const t of mov){
      const w=t.box[2]-t.box[0],h=t.box[3]-t.box[1],cx0=(t.box[0]+t.box[2])/2,cy0=(t.box[1]+t.box[3])/2;
      const c0=cost(t,t.box);if(c0<1)continue;
      const cand=[];
      /* neo: điểm gần nhất (chấm hoặc đầu mút đoạn thẳng) */
      let an=null,bd=1e9;if(t.kind==='pt')for(const a of anchors){const d=Math.hypot(a[0]-cx0,a[1]-cy0);if(d<bd){bd=d;an=a}}
      if(an&&bd<Math.max(w,h)+16){
        for(let k=0;k<24;k++){const u=k*Math.PI/12,ux=Math.cos(u),uy=Math.sin(u),ext=Math.abs(ux)*w/2+Math.abs(uy)*h/2;
          for(const g of[2.5,5,9]){const x=an[0]+ux*(g+ext),y=an[1]+uy*(g+ext);cand.push([x,y,g*.15+outPen(x,y,an[0],an[1])])}}
      }else if(t.kind==='tk'){
        for(let k=0;k<16;k++)for(const r of[3,5,8]){const u=k*Math.PI/8;cand.push([cx0+Math.cos(u)*r,cy0+Math.sin(u)*r,r*.2])}
      }else{
        let sg=null,sd=1e9;for(const s of segs){const d=dPS(cx0,cy0,s);if(d<sd){sd=d;sg=s}}
        if(sg&&sd<18&&Math.hypot(sg[2]-sg[0],sg[3]-sg[1])>14){
          const L=Math.hypot(sg[2]-sg[0],sg[3]-sg[1]),nx=-(sg[3]-sg[1])/L,ny=(sg[2]-sg[0])/L,ext=Math.abs(nx)*w/2+Math.abs(ny)*h/2;
          /* vị trí hiện tại chiếu lên đoạn */
          const t0=Math.max(.15,Math.min(.85,((cx0-sg[0])*(sg[2]-sg[0])+(cy0-sg[1])*(sg[3]-sg[1]))/(L*L)));
          for(const tt of[t0,.5,.4,.6,.3,.7,.22,.78])for(const sd2 of[1,-1])for(const g of[2.5,5,9]){
            const px=sg[0]+(sg[2]-sg[0])*tt,py=sg[1]+(sg[3]-sg[1])*tt,x=px+sd2*nx*(g+ext),y=py+sd2*ny*(g+ext);cand.push([x,y,Math.abs(tt-t0)*3+g*.15+outPen(x,y,px,py)*.4])}
        }
        for(let k=0;k<16;k++)for(const r of[4,8,13,18]){const u=k*Math.PI/8;cand.push([cx0+Math.cos(u)*r,cy0+Math.sin(u)*r,r*.12])}
      }
      let best=null,bc=c0;
      for(const [x,y,pen] of cand){const b=[x-w/2,y-h/2,x+w/2,y+h/2],c=cost(t,b)+pen;if(c<bc-.01){bc=c;best=b}}
      if(best){t.box=best;t.chg=true}
    }
    /* ghi lại */
    let out=svg;
    for(const t of texts)if(t.chg){
      const cx=(t.box[0]+t.box[2])/2,y=t.box[1]+t.fs*.72;
      let tag=`<text${t.at}>`.replace(/\s(x|y|text-anchor|font-size)="[^"]*"/g,'');
      tag=tag.replace('<text',`<text x="${cx.toFixed(1)}" y="${y.toFixed(1)}" font-size="${t.fs}" text-anchor="middle"`);
      out=out.replace(t.raw,tag+t.inner+'</text>');
    }
    if(geo){
      /* nét đứt rõ hơn; phóng to hình nhỏ (giữ tỉ lệ, chữ và nét to theo) */
      out=out.replace(/stroke-dasharray="4 3"/g,'stroke-dasharray="4.5 3"').replace(/(<line\b[^>]*stroke-width=")0\.9(")/g,'$11$2');
      const sc=opt.scale||1;
      if(sc!==1)out=out.replace(/<svg\b[^>]*>/,tg=>{const w=N(tg,'width'),h=N(tg,'height');if(!w||!h||w>=340)return tg;
        const k=Math.min(sc,340/w);return tg.replace(/\swidth="[^"]*"/,` width="${Math.round(w*k)}"`).replace(/\sheight="[^"]*"/,` height="${Math.round(h*k)}"`)});
    }
    return out;
  }
  const tidyHTML=(s,opt)=>typeof s==='string'&&s.includes('<svg')?s.replace(/<svg\b[\s\S]*?<\/svg>/g,m=>{try{return tidySVG(m,opt)}catch(e){return m}}):s;
  /* áp dụng cho kết quả của một mẫu câu: đề bài, các ý, lời giải phóng to; phương án giữ cỡ */
  function tidyQ(q){
    if(!q||typeof q!=='object')return q;
    const big={scale:1.22},sm={scale:1};
    for(const k of['stem','sol','html','why'])if(typeof q[k]==='string')q[k]=tidyHTML(q[k],big);
    if(Array.isArray(q.parts))q.parts.forEach(p=>{if(p&&typeof p.html==='string')p.html=tidyHTML(p.html,big)});
    if(Array.isArray(q.sol))q.sol=q.sol.map(s=>tidyHTML(s,big));
    if(Array.isArray(q.items))q.items.forEach(it=>{if(it){if(typeof it.text==='string')it.text=tidyHTML(it.text,big);if(typeof it.why==='string')it.why=tidyHTML(it.why,big)}});
    if(Array.isArray(q.opts))q.opts=q.opts.map(o=>tidyHTML(o,sm));
    return q;
  }
  function wrapAll(){
    for(const kind of Object.keys(T))for(const t of Object.values(T[kind])){
      if(t._tidy)continue;const g=t.gen;t.gen=function(r){return tidyQ(g.call(this,r))};t._tidy=true;
    }
  }
  return{tidySVG,tidyHTML,tidyQ,wrapAll,parse};
})();
FIG.wrapAll();
