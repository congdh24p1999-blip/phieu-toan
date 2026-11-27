/* Kiểm tra từng dạng câu: sinh thử N lần (mặc định 150), báo lỗi khi
   – sinh câu bị lỗi, hàm kiểm tra chk() không đúng,
   – câu nhiều lựa chọn có phương án trùng, câu đúng/sai có ý trùng,
   – câu trả lời ngắn có đáp án không phải số.
   Chạy: node tools/kiem-tra-mau.js [N]   (sau khi chạy src/build.sh để có src/core.js). Thoát mã 1 nếu có lỗi. */
const fs=require('fs'),vm=require('vm'),path=require('path');
vm.runInThisContext(fs.readFileSync(path.join(__dirname,'../src/core.js'),'utf8')+';globalThis.__a={T,RNG};');
const {T,RNG}=globalThis.__a,N=+process.argv[2]||150;let tot=0,cnt=0;
for(const kind of ['nlc','ds','tln','tl'])for(const id in T[kind]){cnt++;let bad=0;const m=new Set();
  for(let s=1;s<=N;s++){let q;try{q=T[kind][id].gen(new RNG(s*7+3))}catch(e){bad++;m.add(e.message.slice(0,80));continue}
    let ok;try{ok=q.chk?q.chk():true}catch(e){ok='ERR '+e.message}
    if(ok!==true){bad++;m.add('chk '+ok)}
    if(kind==='nlc'&&new Set(q.opts).size!==4){bad++;m.add('phương án trùng')}
    if(kind==='ds'&&new Set(q.items.map(i=>i.text)).size!==4){bad++;m.add('ý đúng/sai trùng')}
    if(kind==='tln'&&!Number.isFinite(q.ans)){bad++;m.add('đáp án không phải số')}}
  if(bad){tot+=bad;console.log('LỖI',kind,id,bad,[...m].slice(0,2).join(' | '))}}
console.log(`Đã kiểm tra ${cnt} dạng × ${N} lần: ${tot} lỗi`);process.exit(tot?1:0);
