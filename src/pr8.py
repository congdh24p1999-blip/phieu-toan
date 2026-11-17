import os
HERE=os.path.dirname(os.path.abspath(__file__))
PAGE='file://'+os.path.join(HERE,'..','index.html')
OUT=os.path.join(HERE,'out')+'/'
os.makedirs(OUT,exist_ok=True)
from playwright.sync_api import sync_playwright
import subprocess,re
with sync_playwright() as p:
    b=p.chromium.launch()
    for g,kind,sid in [('8','gk2','chuan'),('8','ck2','chuan'),('8','ck2','tn'),('8','gk2','tn46'),('8','ck2','tn37')]:
        pg=b.new_page(viewport={'width':1100,'height':900})
        pg.goto(PAGE)
        pg.evaluate("([g,k,s])=>{const st=JSON.parse(localStorage.getItem('xuong-de-thi-v1')||'{}');st.grade=+g;st.kind=k;st.struct=s;st.nv=1;localStorage.setItem('xuong-de-thi-v1',JSON.stringify(st))}",[g,kind,sid])
        pg.reload();pg.wait_for_timeout(500)
        for what in ['exam','key']:
            pg.evaluate(f"document.body.dataset.print='{what}'")
            f=OUT+f'pr-{g}{kind}-{sid}-{what}.pdf'
            pg.pdf(path=f,format='A4',print_background=True,prefer_css_page_size=True)
            n=int(re.search(r'/Count (\d+)',open(f,'rb').read().decode('latin1')).group(1)) if True else 0
            print(g,kind,sid,what,'trang',n)
        pg.close()
    m=b.new_page(viewport={'width':390,'height':800});m.goto(PAGE);m.wait_for_timeout(300)
    m.select_option('#struct','custom');m.wait_for_timeout(200)
    print('mobile scrollWidth',m.evaluate('document.documentElement.scrollWidth'))
    b.close()
