import os
HERE=os.path.dirname(os.path.abspath(__file__))
PAGE='file://'+os.path.join(HERE,'..','index.html')
OUT=os.path.join(HERE,'out')+'/'
os.makedirs(OUT,exist_ok=True)
from playwright.sync_api import sync_playwright
errs=[]
S=OUT
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':900})
    pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
    pg.goto(PAGE);pg.wait_for_timeout(500)
    pg.check('input[name=grade][value="11"]',force=True);pg.wait_for_timeout(300)
    print('lớp 11 term disabled:',[pg.is_disabled(f'input[name=term][value={v}]') for v in ['gk1','ck1','gk2','ck2']],pg.inner_text('#gradeHint'))
    for t in ['gk2','ck2']:
        pg.check(f'input[name=term][value={t}]',force=True);pg.wait_for_timeout(500)
        print(t,pg.inner_text('#meta')[:100],'|',pg.inner_text('#scopeHint')[:140],'|',pg.inner_text('#diffHint')[:80])
        pg.screenshot(path=S+f'u3-{t}.png',full_page=True)
        pg.click('#tabKey');pg.wait_for_timeout(300)
        print('  ma trận:',pg.inner_text('table.mx')[:300].replace('\n',' ; '))
        pg.screenshot(path=S+f'u3-{t}-key.png',full_page=True);pg.click('#tabExam');pg.wait_for_timeout(200)
    pg.reload();pg.wait_for_timeout(400);print('sau reload',pg.eval_on_selector('input[name=term]:checked','e=>e.value'),pg.eval_on_selector('input[name=grade]:checked','e=>e.value'))
    pg.check('input[name=grade][value="8"]',force=True);pg.wait_for_timeout(300);print('lớp 8 ->',pg.eval_on_selector('input[name=term]:checked','e=>e.value'))
    m=b.new_page(viewport={'width':390,'height':800});m.goto(PAGE);m.wait_for_timeout(400)
    m.check('input[name=grade][value="11"]',force=True);m.check('input[name=term][value="ck2"]',force=True);m.wait_for_timeout(300)
    print('mobile overflow',m.evaluate('document.documentElement.scrollWidth>innerWidth'))
    b.close()
print('LỖI JS:',errs)
