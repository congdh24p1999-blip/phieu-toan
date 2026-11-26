/* ================================================================
   Mã QR (ISO/IEC 18004) cho đường dẫn làm bài online: chế độ byte, mức sửa lỗi M,
   phiên bản 1 – 20 (tối đa 666 byte). Tự viết, không dùng thư viện ngoài.
   QR.svg(text, cỡ) trả về chuỗi <svg>.
   ================================================================ */
const QR=(()=>{
  /* [số khối, số byte dữ liệu mỗi khối, số khối loại 2 (thêm 1 byte), số byte sửa lỗi mỗi khối] – mức M */
  const BLK=[null,[1,16,0,10],[1,28,0,16],[1,44,0,26],[2,32,0,18],[2,43,0,24],[4,27,0,16],[4,31,0,18],[2,38,2,22],[3,36,2,22],[4,43,1,26],
    [1,50,4,30],[6,36,2,22],[8,37,1,22],[4,40,5,24],[5,41,5,24],[7,45,3,28],[10,46,1,28],[9,43,4,26],[3,44,11,26],[3,41,13,26]];
  const ALIGN=[null,[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],
    [6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90]];
  /* GF(256), đa thức 0x11d */
  const EXP=new Array(512),LOG=new Array(256);
  for(let i=0,x=1;i<255;i++){EXP[i]=x;LOG[x]=i;x<<=1;if(x&256)x^=0x11d}
  for(let i=255;i<512;i++)EXP[i]=EXP[i-255];
  const mul=(a,b)=>a&&b?EXP[LOG[a]+LOG[b]]:0;
  function rsGen(n){let g=[1];for(let i=0;i<n;i++){const ng=new Array(g.length+1).fill(0);g.forEach((c,j)=>{ng[j]^=c;ng[j+1]^=mul(c,EXP[i])});g=ng}return g}
  function rsRem(data,n){const g=rsGen(n),r=new Array(n).fill(0);
    data.forEach(d=>{const f=d^r[0];r.shift();r.push(0);if(f)for(let j=0;j<n;j++)r[j]^=mul(g[j+1],f)});return r}
  const cap=v=>{const b=BLK[v];return b[0]*b[1]+b[2]*(b[1]+1)};
  function encode(text){
    const bytes=[...new TextEncoder().encode(text)];
    let v=1;while(v<=20&&bytes.length+(v<10?2:3)>cap(v))v++;
    if(v>20)throw new Error('Đường dẫn quá dài để tạo mã QR');
    const bits=[];const put=(x,n)=>{for(let i=n-1;i>=0;i--)bits.push((x>>i)&1)};
    put(4,4);put(bytes.length,v<10?8:16);bytes.forEach(b=>put(b,8));
    const total=cap(v)*8;for(let i=0;i<4&&bits.length<total;i++)bits.push(0);
    while(bits.length%8)bits.push(0);
    const data=[];for(let i=0;i<bits.length;i+=8)data.push(parseInt(bits.slice(i,i+8).join(''),2));
    for(let p=0;data.length<cap(v);p^=1)data.push(p?0x11:0xEC);
    /* chia khối, thêm mã sửa lỗi, xen kẽ */
    const [n1,d1,n2,ec]=BLK[v],blocks=[];let k=0;
    for(let i=0;i<n1+n2;i++){const len=d1+(i>=n1?1:0),d=data.slice(k,k+len);k+=len;blocks.push({d,e:rsRem(d,ec)})}
    const out=[];for(let i=0;i<d1+1;i++)blocks.forEach(b=>{if(i<b.d.length)out.push(b.d[i])});
    for(let i=0;i<ec;i++)blocks.forEach(b=>out.push(b.e[i]));
    return{v,cw:out};
  }
  function matrix(text){
    const {v,cw}=encode(text),N=17+4*v,M=[...Array(N)].map(()=>new Array(N).fill(null)),F=[...Array(N)].map(()=>new Array(N).fill(false));
    const set=(r,c,b)=>{M[r][c]=b?1:0;F[r][c]=true};
    const finder=(r,c)=>{for(let i=-1;i<=7;i++)for(let j=-1;j<=7;j++){const y=r+i,x=c+j;if(y<0||x<0||y>=N||x>=N)continue;
      const on=i>=0&&i<=6&&j>=0&&j<=6&&(i===0||i===6||j===0||j===6||(i>=2&&i<=4&&j>=2&&j<=4));set(y,x,on)}};
    finder(0,0);finder(0,N-7);finder(N-7,0);
    for(let i=8;i<N-8;i++){set(6,i,i%2===0);set(i,6,i%2===0)}
    const A=ALIGN[v],L=A[A.length-1];A.forEach(r=>A.forEach(c=>{if((r===6&&c===6)||(r===6&&c===L)||(r===L&&c===6))return;   /* trùng ô định vị */
      for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++)set(r+i,c+j,Math.max(Math.abs(i),Math.abs(j))!==1)}));
    set(N-8,8,1);   /* ô tối cố định */
    for(let i=0;i<9;i++){if(!F[8][i])F[8][i]=true;if(!F[i][8])F[i][8]=true}
    for(let i=0;i<8;i++){F[8][N-1-i]=true;F[N-1-i][8]=true}
    if(v>=7)for(let i=0;i<6;i++)for(let j=0;j<3;j++){F[i][N-11+j]=true;F[N-11+j][i]=true}
    /* đặt dữ liệu theo đường zíc zắc */
    const bits=[];cw.forEach(b=>{for(let i=7;i>=0;i--)bits.push((b>>i)&1)});
    let bi=0,up=true;
    for(let c=N-1;c>0;c-=2){if(c===6)c--;
      for(let t=0;t<N;t++){const r=up?N-1-t:t;for(let d=0;d<2;d++){const x=c-d;if(F[r][x])continue;M[r][x]=bi<bits.length?bits[bi++]:0}}
      up=!up}
    const MASK=[(r,c)=>(r+c)%2===0,(r)=>r%2===0,(r,c)=>c%3===0,(r,c)=>(r+c)%3===0,(r,c)=>(Math.floor(r/2)+Math.floor(c/3))%2===0,
      (r,c)=>(r*c)%2+(r*c)%3===0,(r,c)=>((r*c)%2+(r*c)%3)%2===0,(r,c)=>((r+c)%2+(r*c)%3)%2===0];
    const bch=(x,gen,deg)=>{let y=x<<deg;const gl=Math.floor(Math.log2(gen));while(y>=(1<<deg))y^=gen<<(Math.floor(Math.log2(y))-gl);return(x<<deg)|y};
    function place(mask){
      const G=M.map((row,r)=>row.map((b,c)=>F[r][c]?b:(b^(MASK[mask](r,c)?1:0))));
      const fmtb=bch((0<<3)|mask,0x537,10)^0x5412;   /* mức M = 00 */
      const fb=i=>(fmtb>>i)&1;
      /* vị trí bit định dạng theo chuẩn (bit 0 là bit thấp nhất) */
      for(let i=0;i<=5;i++)G[i][8]=fb(i);
      G[7][8]=fb(6);G[8][8]=fb(7);G[8][7]=fb(8);
      for(let i=9;i<15;i++)G[8][14-i]=fb(i);
      for(let i=0;i<8;i++)G[8][N-1-i]=fb(i);
      for(let i=8;i<15;i++)G[N-15+i][8]=fb(i);
      G[N-8][8]=1;
      if(v>=7){const vb=bch(v,0x1F25,12);for(let i=0;i<18;i++){const b=(vb>>i)&1,r=Math.floor(i/3),c=N-11+i%3;G[r][c]=b;G[c][r]=b}}
      return G;
    }
    function penalty(G){let p=0;
      for(let r=0;r<N;r++){let run=1;for(let c=1;c<=N;c++){if(c<N&&G[r][c]===G[r][c-1])run++;else{if(run>=5)p+=run-2;run=1}}}
      for(let c=0;c<N;c++){let run=1;for(let r=1;r<=N;r++){if(r<N&&G[r][c]===G[r-1][c])run++;else{if(run>=5)p+=run-2;run=1}}}
      for(let r=0;r<N-1;r++)for(let c=0;c<N-1;c++){const b=G[r][c];if(b===G[r][c+1]&&b===G[r+1][c]&&b===G[r+1][c+1])p+=3}
      const pat=[1,0,1,1,1,0,1,0,0,0,0],pat2=[0,0,0,0,1,0,1,1,1,0,1];
      for(let r=0;r<N;r++)for(let c=0;c<=N-11;c++){let a=true,b=true;for(let k=0;k<11;k++){if(G[r][c+k]!==pat[k])a=false;if(G[r][c+k]!==pat2[k])b=false}if(a)p+=40;if(b)p+=40}
      for(let c=0;c<N;c++)for(let r=0;r<=N-11;r++){let a=true,b=true;for(let k=0;k<11;k++){if(G[r+k][c]!==pat[k])a=false;if(G[r+k][c]!==pat2[k])b=false}if(a)p+=40;if(b)p+=40}
      let dark=0;G.forEach(row=>row.forEach(b=>dark+=b));p+=Math.floor(Math.abs(dark*20/(N*N)-10))*10;
      return p}
    let best=null,bp=Infinity;for(let m=0;m<8;m++){const G=place(m),p=penalty(G);if(p<bp){bp=p;best=G}}
    return best;
  }
  function svg(text,size){
    const G=matrix(text),N=G.length,q=4,W=N+2*q;let d='';
    G.forEach((row,r)=>row.forEach((b,c)=>{if(b)d+=`M${c+q} ${r+q}h1v1h-1z`}));
    return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" width="${size||200}" height="${size||200}" shape-rendering="crispEdges" role="img" aria-label="Mã QR mở bài làm online"><rect width="${W}" height="${W}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`;
  }
  return{matrix,svg};
})();
