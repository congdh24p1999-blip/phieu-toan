#!/bin/bash
# Ghép các file nguồn thành ../index.html (trang chạy trên GitHub Pages).
# Thứ tự file quan trọng: core3.js (cấu trúc đề) phải đứng cuối vì dùng các mẫu câu đã đăng kí.
set -e
cd "$(dirname "$0")"
cat core1.js core2.js core11a.js core11b.js core11c.js core11d.js core11e.js core11e2.js core11f.js core11f2.js core11g.js core11h.js core11h2.js core11i.js core11j.js core11k.js core11l.js core12a.js core12b.js core12c.js core12d.js core12e.js core12f.js core12g.js core12h.js core09a.js core10a.js core10b.js core10c.js core10d.js core10e.js core10f.js core09b.js core09c.js core12i.js core7.js core7b.js core7c.js core7d.js core7e.js core7f.js core-ds.js core8a.js core8b.js core8c.js core8d.js core8e.js core8f.js core8g.js core8h.js core8i.js core8j.js core8k.js core9ext.js core9les.js core3.js core9ws.js > core.js
{ cat head.html; cat core.js ui.js docx.js site.js; printf '\n</script>\n</body>\n</html>\n'; } > ../index.html
node --check core.js && echo "core ok"
python3 - <<'PY'
import re
h=open('../index.html',encoding='utf-8').read()
m=re.search(r'<script>\n(.*)</script>',h,re.S)
open('page.js','w',encoding='utf-8').write(m.group(1))
PY
node --check page.js && echo "page ok" && wc -c ../index.html
