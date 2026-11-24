# Kiểm tra lớp 6 qua giao diện: python3 ui6.py
import os
from playwright.sync_api import sync_playwright
HERE=os.path.dirname(os.path.abspath(__file__));OUT=os.path.join(HERE,'out')+'/';os.makedirs(OUT,exist_ok=True)
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':900},accept_downloads=True)
    pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' and 'font' not in m.text.lower() and 'ERR_' not in m.text else None)
    pg.goto('file://'+os.path.join(HERE,'..','index.html'));pg.evaluate("localStorage.clear()");pg.reload();pg.wait_for_timeout(400)
    pg.check('input[name=grade][value="6"]',force=True);pg.wait_for_timeout(400)
    print('term disabled:',[pg.is_disabled(f'input[name=term][value={v}]') for v in ['gk1','ck1','gk2','ck2']],'|',pg.inner_text('#gradeHint'))
    for t in ['gk1','ck1','gk2','ck2']:
        pg.check(f'input[name=term][value={t}]',force=True);pg.wait_for_timeout(500)
        print(t,pg.inner_text('#meta')[:100],'|',pg.inner_text('#scopeHint')[:140])
        pg.screenshot(path=OUT+f'u6-{t}.png',full_page=True)
        pg.click('#tabKey');pg.wait_for_timeout(300)
        print('  ma trận:',pg.inner_text('table.mx')[:400].replace('\n',' ; '))
        pg.screenshot(path=OUT+f'u6-{t}-key.png',full_page=True);pg.click('#tabExam');pg.wait_for_timeout(200)
    print('school:',pg.inner_text('.school')[:60])
    b.close()
print('LỖI JS:',errs)
