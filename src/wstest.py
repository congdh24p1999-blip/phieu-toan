# Thử chế độ phiếu bài tập qua giao diện: python3 wstest.py
import os,sys
from playwright.sync_api import sync_playwright
HERE=os.path.dirname(os.path.abspath(__file__));OUT=os.path.join(HERE,'out');os.makedirs(OUT,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1300,'height':1000},accept_downloads=True)
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.path.join(HERE,'..','index.html'));pg.evaluate("localStorage.clear()");pg.reload();pg.wait_for_timeout(300)
    pg.check('input[name=mode][value="ws"]',force=True);pg.wait_for_timeout(300)
    for g in ['7','8','11','12']:
        pg.check(f'input[name=grade][value="{g}"]',force=True);pg.wait_for_timeout(200)
        boxes=pg.query_selector_all('#lesBox input');print('lớp',g,'số bài',len(boxes),pg.inner_text('#meta'))
        for i,bx in enumerate(boxes):
            if bx.is_checked():pg.evaluate("e=>{e.checked=false;e.dispatchEvent(new Event('change',{bubbles:true}))}",bx)
            pg.evaluate("e=>{e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}))}",bx)
            n=pg.evaluate("document.querySelectorAll('#examOut .q').length")
            if n<10:print('  bài',bx.get_attribute('value'),'chỉ',n,'câu')
            pg.evaluate("e=>{e.checked=false;e.dispatchEvent(new Event('change',{bubbles:true}))}",bx)
    # một phiếu cụ thể
    G=sys.argv[1] if len(sys.argv)>1 else '8';L=sys.argv[2].split(',') if len(sys.argv)>2 else ['21','23']
    pg.check(f'input[name=grade][value="{G}"]',force=True);pg.wait_for_timeout(200)
    pg.click('#lesNone')
    for v in L:
        pg.evaluate(f"()=>{{const e=document.querySelector('#lesBox input[value=\"{v}\"]');e.checked=true;e.dispatchEvent(new Event('change',{{bubbles:true}}))}}")
    pg.check('input[name=wsn][value="15"]',force=True);pg.wait_for_timeout(300)
    print('meta',pg.inner_text('#meta'),'| warn:',pg.inner_text('#wsWarn'))
    pg.locator('#examOut .sheet').first.screenshot(path=os.path.join(OUT,'ws.png'))
    pg.click('#tabKey');pg.wait_for_timeout(200);pg.locator('#keyOut .sheet').first.screenshot(path=os.path.join(OUT,'wskey.png'))
    for what in ['Exam','Key']:
        with pg.expect_download() as d:pg.click('#word'+what)
        f=os.path.join(OUT,d.value.suggested_filename);d.value.save_as(f);print('saved',f)
    print('errors',errs)
    b.close()
