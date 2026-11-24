/* ================================================================
   Báo lỗi đề (Google Form) và thống kê lượt dùng (GoatCounter)
   Chỉ bật khi đã điền cấu hình bên dưới; để trống thì trang chạy như cũ.
   ================================================================ */
const SITE_CFG={
  /* Link form Google: phần trước "?" của link điền sẵn, ví dụ https://docs.google.com/forms/d/e/1FAIpQL.../viewform */
  form:'https://docs.google.com/forms/d/e/1FAIpQLScG0zNoYADPOzP44gIzj9ZEDqCIFE1xIKhIAtqUeOQQf_vBPw/viewform',
  /* Mã ô "Thông tin đề" trong link điền sẵn, ví dụ entry.123456789 */
  formInfo:'entry.1958293446',
  /* Tên tài khoản GoatCounter, ví dụ "xuongdetoan" ứng với https://xuongdetoan.goatcounter.com */
  goat:''
};
/* ---------- Báo lỗi ---------- */
function bugInfo(){
  const st=state.struct==='custom'?'tự chọn '+['n1','n2','n3','n4'].map(k=>state.cs[k]).join('-'):state.struct;
  return `Lớp ${state.grade} · ${$('#meta').textContent} · cấu trúc ${st}${state.ext?' · có câu mở rộng':''}${state.mode==='ws'?' · số câu '+state.wsn+' · loại '+state.wsk:''}`;
}
function bugUrl(){
  if(!SITE_CFG.form)return '';
  const q=new URLSearchParams({usp:'pp_url'});if(SITE_CFG.formInfo)q.set(SITE_CFG.formInfo,bugInfo());
  return SITE_CFG.form+'?'+q.toString();
}
(function(){
  if(!SITE_CFG.form)return;
  const mk=(cls,txt)=>{const a=document.createElement('a');a.className=cls;a.textContent=txt;a.target='_blank';a.rel='noopener';
    a.addEventListener('click',()=>{a.href=bugUrl();track('bao-loi');if(!SITE_CFG.formInfo)copyInfo()});a.href=bugUrl();return a};
  $('.stagehead').appendChild(mk('buglink','Báo lỗi đề này'));
  const f=$('.foot');if(f){const s=document.createElement('span');s.className='footsep';s.textContent='Thấy câu sai hoặc chưa hợp lý?';f.appendChild(s);f.appendChild(mk('','Gửi báo lỗi →'))}
})();
/* Form chưa có ô điền sẵn: chép thông tin đề vào bộ nhớ tạm để người dùng dán vào form */
function copyInfo(){
  const t=bugInfo();
  let n=$('#bugToast');if(!n){n=document.createElement('div');n.id='bugToast';n.className='bugtoast noprint';document.body.appendChild(n)}
  const show=m=>{n.textContent=m;n.classList.add('on');clearTimeout(n._t);n._t=setTimeout(()=>n.classList.remove('on'),9000)};
  show('Thông tin đề: '+t+'. Hãy ghi vào ô đầu tiên của form.');
  try{navigator.clipboard.writeText(t).then(()=>show('Đã chép thông tin đề: '+t+'. Hãy dán vào ô đầu tiên của form.'),()=>{})}catch(e){}
}
/* ---------- Thống kê (GoatCounter: không dùng cookie) ---------- */
function track(name){
  if(!SITE_CFG.goat||!window.goatcounter||!window.goatcounter.count)return;
  try{window.goatcounter.count({path:`${name}/${state.mode==='ws'?'phieu-':''}${state.grade}-${state.kind}`,title:name,event:true})}catch(e){}
}
(function(){
  if(!SITE_CFG.goat)return;
  const s=document.createElement('script');s.async=true;s.src='https://gc.zgo.at/count.js';
  s.dataset.goatcounter=`https://${SITE_CFG.goat}.goatcounter.com/count`;document.head.appendChild(s);
  [['#printExam','in-de'],['#printKey','in-dap-an'],['#wordExam','word-de'],['#wordKey','word-dap-an']].forEach(([id,n])=>{const b=$(id);if(b)b.addEventListener('click',()=>track(n))});
})();
