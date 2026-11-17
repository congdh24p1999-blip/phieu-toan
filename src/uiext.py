import os
HERE=os.path.dirname(os.path.abspath(__file__))
PAGE='file://'+os.path.join(HERE,'..','index.html')
OUT=os.path.join(HERE,'out')+'/'
os.makedirs(OUT,exist_ok=True)
from playwright.sync_api import sync_playwright
U=PAGE
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1200,'height':900});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(U);pg.wait_for_timeout(500)
    pg.check('input[name=grade][value="8"]',force=True);pg.check('input[name=term][value="ck2"]',force=True);pg.wait_for_timeout(200)
    print('ext checkbox mặc định:',pg.is_checked('#ext'))
    found=None
    for c in range(101,140):
        pg.fill('#code',str(c));pg.press('#code','Enter');pg.wait_for_timeout(80)
        if 'Lưu ý câu mở rộng' in pg.evaluate("[...document.querySelectorAll('.sheet.key')].map(e=>e.textContent).join(' ')"): found=c;break
    print('Chuẩn, tắt: thấy ghi chú ở mã',found)
    pg.check('#ext',force=True);pg.wait_for_timeout(200)
    found=None
    for c in range(101,180):
        pg.fill('#code',str(c));pg.press('#code','Enter');pg.wait_for_timeout(80)
        if 'Lưu ý câu mở rộng' in pg.evaluate("[...document.querySelectorAll('.sheet.key')].map(e=>e.textContent).join(' ')"): found=c;break
    print('Chuẩn, bật: thấy ghi chú ở mã',found)
    if found:
        import re;t=pg.evaluate("[...document.querySelectorAll('.sheet.key')].map(e=>e.textContent).join(' ')");i=t.find('Lưu ý câu mở rộng');print(t[i:i+200])
    pg.reload();pg.wait_for_timeout(400);print('sau tải lại, ext =',pg.is_checked('#ext'))
    print('lỗi JS:',errs);b.close()
