# Thử tải file Word từ giao diện: python3 wordtest.py [lớp] [kì] [mã]
import os,sys
from playwright.sync_api import sync_playwright
HERE=os.path.dirname(os.path.abspath(__file__));OUT=os.path.join(HERE,'out');os.makedirs(OUT,exist_ok=True)
g=sys.argv[1] if len(sys.argv)>1 else '8';k=sys.argv[2] if len(sys.argv)>2 else 'ck2';code=sys.argv[3] if len(sys.argv)>3 else '101'
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1300,'height':900},accept_downloads=True)
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.path.join(HERE,'..','index.html'));pg.wait_for_timeout(400)
    pg.evaluate(f"""()=>{{localStorage.clear()}}""");pg.reload();pg.wait_for_timeout(300)
    pg.check(f'input[name=grade][value="{g}"]',force=True);pg.wait_for_timeout(200)
    pg.check(f'input[name=term][value="{k}"]',force=True);pg.wait_for_timeout(200)
    nv=sys.argv[4] if len(sys.argv)>4 else '1'
    if pg.query_selector(f'input[name=nv][value="{nv}"]'):pg.check(f'input[name=nv][value="{nv}"]',force=True);pg.wait_for_timeout(200)
    pg.fill('#code',code);pg.dispatch_event('#code','input');pg.wait_for_timeout(300)
    for what in ['Exam','Key']:
        import time;t0=time.time()
        with pg.expect_download() as d:
            pg.click('#word'+what)
        f=os.path.join(OUT,d.value.suggested_filename);d.value.save_as(f);print('saved',f,round(time.time()-t0,2),'s')
    print('errors',errs)
    b.close()
