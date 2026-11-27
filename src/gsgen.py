# Sinh mã Apps Script bản cơ bản (không email) từ thu-diem.gs và chèn cả hai bản vào trang hướng dẫn.
# Chạy: python3 gsgen.py  (build.sh gọi tự động)
import html,re,os
H=os.path.dirname(os.path.abspath(__file__))
full=open(os.path.join(H,'thu-diem.gs'),encoding='utf8').read()
def fn(name):
    i=full.index('function '+name+'(')
    # lấy cả chú thích ngay trên hàm
    j=full.rfind('\n\n',0,i)+2
    k=full.index('\n}\n',i)+3
    return full[j:k]
consts=full[full.index("const HEAD = "):full.index("];",full.index("const HEAD = "))+2]
basic=f'''/**
 * Xưởng đề Toán – nhận kết quả làm bài online vào bảng tính này (bản cơ bản, không gửi email).
 * Mã chỉ đọc và ghi đúng bảng tính chứa nó, không đọc Gmail, không đọc tệp nào khác.
 * @OnlyCurrentDoc
 */

{consts}

/* Bấm Chạy hàm này một lần sau khi dán mã để Google hỏi quyền ghi vào bảng tính này. */
function caiDat() {{
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  console.log('Đã cài đặt. Bảng tính "' + ss.getName() + '" sẵn sàng nhận điểm.');
}}

{fn('ghiKetQua_')}
/* Học sinh nộp bài: trang làm bài gửi kết quả tới đây */
function doPost(e) {{
  try {{
    ghiKetQua_(JSON.parse(e.postData.contents));
  }} catch (err) {{
    return ContentService.createTextOutput('loi: ' + err);
  }}
  return ContentService.createTextOutput('ok');
}}

{fn('doGet')}
/* Giữ chỗ: nếu trước đây đã cài bản có email thì lịch gửi cũ gọi vào đây và không làm gì. */
function guiEmailTongHop() {{}}
'''
open(os.path.join(H,'thu-diem-co-ban.gs'),'w',encoding='utf8').write(basic)
for f in ['huong-dan-thu-diem.html','thu-diem-email.html']:
    p=os.path.join(H,'..',f)
    s=open(p,encoding='utf8').read()
    for pid,code in [('gsCode',full),('gsCodeBasic',basic)]:
        pat=re.compile(r'(<pre id="'+pid+r'"[^>]*><code>)[\s\S]*?(</code></pre>)')
        if pat.search(s):s=pat.sub(lambda m:m.group(1)+html.escape(code,quote=False)+m.group(2),s)
    open(p,'w',encoding='utf8').write(s)
print('gs ok',len(basic),len(full))
