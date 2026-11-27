#!/usr/bin/env python3
"""Sinh các trang phụ dùng chung giao diện với can-cu.html và chèn chân trang thống nhất.

- Tạo: gioi-thieu.html, quyen-rieng-tu.html, 404.html, sitemap.xml (ở thư mục gốc dự án)
- Chèn chân trang chung vào: can-cu.html, huong-dan-thu-diem.html, thu-diem-email.html, thongke.html
  (giữa hai dấu <!--SITEFOOT--> ... <!--/SITEFOOT-->), và CSS chân trang trước </head>.
Chạy lại an toàn nhiều lần (build.sh gọi tự động).
"""
import re, pathlib, datetime

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = 'https://congdh24p1999-blip.github.io/phieu-toan/'
FORM = 'https://docs.google.com/forms/d/e/1FAIpQLScG0zNoYADPOzP44gIzj9ZEDqCIFE1xIKhIAtqUeOQQf_vBPw/viewform'
# Thông tin liên hệ công khai: điền vào thì trang Giới thiệu tự hiện, để trống thì ẩn.
CONTACT = {'email': '', 'fanpage': '', 'zalo': ''}
UPDATED = '27/11/2026'

FOOT_LINKS = [('./', 'Tạo đề'), ('./?tuluyen=1', 'Học sinh tự luyện'), ('gioi-thieu.html', 'Giới thiệu'),
              ('can-cu.html', 'Căn cứ và phương pháp'), ('huong-dan-thu-diem.html', 'Thu điểm về Google Sheet'),
              ('quyen-rieng-tu.html', 'Quyền riêng tư'), ('gioi-thieu.html#lien-he', 'Liên hệ, góp ý'),
              ('can-cu.html#nhat-ky', 'Nhật ký cập nhật')]

def foot_html(prefix=''):
    href = lambda h: (prefix + ('' if h == './' else h)) if prefix else h
    links = '\n'.join(f'    <a href="{href(h)}">{t}</a>' for h, t in FOOT_LINKS)
    return (f'<!--SITEFOOT-->\n<footer class="sitefoot">\n  <nav aria-label="Liên kết cuối trang">\n{links}\n  </nav>\n'
            f'  <p>© 2026 Xưởng đề Toán · Miễn phí, không quảng cáo, không cần tài khoản · Bảo lưu mọi quyền.</p>\n</footer>\n<!--/SITEFOOT-->')

FOOT_CSS = '''<style id="sitefoot-css">
.sitefoot{margin:26px auto 0;max-width:820px;padding:16px 4px 0;border-top:1px solid var(--line);color:var(--muted);font-size:.86rem;text-align:center}
.sitefoot nav{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 16px;margin-bottom:8px}
.sitefoot a{color:var(--accent);font-weight:600;text-decoration:none}
.sitefoot a:hover{text-decoration:underline}
.sitefoot p{margin:0 auto;max-width:none;font-size:.78rem}
@media print{.sitefoot{display:none}}
</style>'''

def inject(path, old_pat, keep=''):
    p = ROOT / path
    s = p.read_text(encoding='utf8')
    if '<!--SITEFOOT-->' in s:
        s = re.sub(r'<!--SITEFOOT-->.*?<!--/SITEFOOT-->', foot_html(), s, flags=re.S)
    else:
        s, n = re.subn(old_pat, lambda m: keep + foot_html(), s, count=1, flags=re.S)
        assert n == 1, (path, 'không tìm thấy chân trang cũ')
    if 'id="sitefoot-css"' not in s:
        s = s.replace('</head>', FOOT_CSS + '\n</head>', 1)
    p.write_text(s, encoding='utf8')

# ---------- khung trang dùng chung, lấy CSS của can-cu.html ----------
CANCU = (ROOT / 'can-cu.html').read_text(encoding='utf8')
STYLE = re.search(r'<style>(.*?)</style>', CANCU, re.S).group(1)
EXTRA = '''
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,15rem),1fr));gap:12px;margin:10px 0 6px}
.card{border:1px solid var(--line);border-radius:10px;padding:14px 16px;background:var(--bg)}
.card b{display:block;margin-bottom:4px}
.card p{margin:0;font-size:.95rem}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,9rem),1fr));gap:10px;margin:14px 0 4px}
.fact{border-left:3px solid var(--accent);padding:2px 0 2px 12px}
.fact b{display:block;font-family:var(--font-display);font-size:1.6rem;line-height:1.1}
.fact span{color:var(--muted);font-size:.9rem}
.btnlink{display:inline-block;background:var(--accent);color:#fff;font-weight:700;text-decoration:none;border-radius:999px;padding:9px 18px;margin:4px 8px 4px 0}
:root[data-theme="dark"] .btnlink{color:#10241e}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .btnlink{color:#10241e}}
.btnlink.alt{background:transparent;color:var(--accent);border:1px solid var(--accent)}
.stamp{color:var(--muted);font-size:.9rem;margin-top:6px}
'''

def page(fname, title, desc, h1, lead, body, toc=None, noindex=False, abs_links=False):
    canon = BASE + ('' if fname == 'index.html' else fname)
    pre = '/phieu-toan/' if abs_links else ''
    toc_html = ''
    if toc:
        toc_html = '<nav class="toc" aria-label="Mục lục">' + ''.join(f'<a href="#{i}">{t}</a>' for i, t in toc) + '</nav>'
    foot = foot_html(pre).replace('href="/phieu-toan/"', 'href="/phieu-toan/"')
    head_extra = '<meta name="robots" content="noindex">\n' if noindex else f'<link rel="canonical" href="{canon}">\n'
    return f'''<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="{desc}">
<title>{title}</title>
<link rel="icon" href="{pre}favicon.svg" type="image/svg+xml">
{head_extra}<meta property="og:type" content="article">
<meta property="og:site_name" content="Xưởng đề Toán">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{BASE}og.png">
<meta property="og:locale" content="vi_VN">
<meta name="theme-color" content="#1f6f5c">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap">
<style>{STYLE}{EXTRA}</style>
{FOOT_CSS}
</head>
<body>
<div class="wrap">
  <header class="top">
    <a class="brand" href="{pre or './'}">Xưởng <span>đề</span> Toán</a>
    <a class="back" href="{pre or './'}">← Về trang tạo đề</a>
  </header>
  <main class="sheet">
    <h1>{h1}</h1>
    <p class="lead">{lead}</p>
    {toc_html}
{body}
  </main>
{foot}
</div>
</body>
</html>
'''

# ---------- Giới thiệu ----------
contact_items = []
if CONTACT['email']:
    contact_items.append(f'<li>Email: <a href="mailto:{CONTACT["email"]}">{CONTACT["email"]}</a></li>')
if CONTACT['fanpage']:
    contact_items.append(f'<li>Fanpage: <a href="{CONTACT["fanpage"]}" rel="noopener" target="_blank">{CONTACT["fanpage"].split("//")[-1]}</a></li>')
if CONTACT['zalo']:
    contact_items.append(f'<li>Zalo: {CONTACT["zalo"]}</li>')
contact_list = ('<ul class="plain">' + ''.join(contact_items) + '</ul>') if contact_items else ''

ABOUT = f'''
    <section id="la-gi" aria-labelledby="h-la-gi">
      <h2 id="h-la-gi">Xưởng đề Toán là gì</h2>
      <p>Một công cụ miễn phí giúp thầy cô Toán lớp 6 – 12 tạo đề kiểm tra và phiếu bài tập bám chương trình hiện hành: có đáp án, hướng dẫn chấm, ma trận và bản đặc tả theo mẫu của Bộ, in thẳng ra khổ A4 hoặc tải file Word để chỉnh sửa. Học sinh dùng cùng trang để làm bài trực tuyến và tự luyện.</p>
      <div class="facts">
        <div class="fact"><b>6 – 12</b><span>bảy khối lớp, hai học kì</span></div>
        <div class="fact"><b>230</b><span>bài học được gắn dạng câu</span></div>
        <div class="fact"><b>gần 2.000</b><span>dạng câu, mỗi dạng sinh nhiều đề khác nhau</span></div>
        <div class="fact"><b>0 đồng</b><span>không quảng cáo, không cần tài khoản</span></div>
      </div>
    </section>

    <section id="danh-cho" aria-labelledby="h-danh-cho">
      <h2 id="h-danh-cho">Dành cho ai</h2>
      <div class="cards">
        <div class="card"><b>Thầy cô</b><p>Tạo đề giữa kì, cuối kì, đề ôn thi vào lớp 10 và tốt nghiệp THPT; phiếu bài tập theo bài học; hoán vị mã đề; gửi đường dẫn hoặc mã QR cho học sinh làm bài và nhận điểm về Google Sheet.</p></div>
        <div class="card"><b>Học sinh</b><p>Tự luyện theo bài học hoặc theo đề, biết đúng sai từng câu và xem lời giải; làm bài thầy cô giao trên điện thoại hoặc máy tính.</p></div>
      </div>
      <p><a class="btnlink" href="./">Tạo đề ngay</a><a class="btnlink alt" href="./?tuluyen=1">Học sinh tự luyện</a></p>
    </section>

    <section id="tac-gia" aria-labelledby="h-tac-gia">
      <h2 id="h-tac-gia">Người thực hiện</h2>
      <p>Trang do <b>thầy Công</b> xây dựng và duy trì, với mong muốn thầy cô bớt thời gian soạn đề để dành thời gian cho việc dạy, còn học sinh có thêm nguồn luyện tập sát chương trình. Trang được cập nhật thường xuyên dựa trên góp ý của thầy cô sử dụng.</p>
    </section>

    <section id="chat-luong" aria-labelledby="h-chat-luong">
      <h2 id="h-chat-luong">Giữ chất lượng câu hỏi thế nào</h2>
      <ol class="steps">
        <li><p><b>Bám chương trình.</b> Mỗi dạng câu gắn với một bài học và một mức độ (biết, hiểu, vận dụng); bản đặc tả ghi yêu cầu cần đạt theo Chương trình môn Toán 2018.</p></li>
        <li><p><b>Đối chiếu với sách và đề thật.</b> Dạng bài và bối cảnh thực tế được đối chiếu với bài tập sách giáo khoa, đề kiểm tra của các trường, đề tuyển sinh lớp 10 và đề thi tốt nghiệp chính thức.</p></li>
        <li><p><b>Kiểm tra tự động.</b> Mỗi dạng được sinh thử hàng trăm lần để kiểm tra đáp án, lời giải, phương án nhiễu không trùng nhau và số liệu hợp lí trước khi đưa lên trang.</p></li>
        <li><p><b>Sửa theo góp ý.</b> Thầy cô bấm “Báo lỗi đề này” khi gặp câu chưa đúng; lỗi đã sửa được ghi trong <a href="can-cu.html#nhat-ky">nhật ký cập nhật</a>.</p></li>
      </ol>
      <p class="muted" style="margin-top:14px">Đề do thuật toán sinh ra từ các dạng câu, nên thầy cô vẫn cần đọc lướt trước khi phát cho học sinh. Chi tiết căn cứ và giới hạn xem tại <a href="can-cu.html">Căn cứ và phương pháp</a>.</p>
    </section>

    <section id="lien-he" aria-labelledby="h-lien-he">
      <h2 id="h-lien-he">Liên hệ, góp ý</h2>
      <p>Thầy cô cần hỗ trợ, muốn góp ý hoặc đề xuất dạng bài mới, xin gửi qua phiếu góp ý. Mỗi góp ý đều được đọc và phản hồi bằng cách sửa trên trang.</p>
      {contact_list}
      <p><a class="btnlink" href="{FORM}" target="_blank" rel="noopener">Gửi góp ý</a></p>
      <p class="muted">Gặp câu sai trong một đề cụ thể, nên bấm “Báo lỗi đề này” ngay trên trang tạo đề để thông tin lớp, kì, mã đề được điền sẵn.</p>
    </section>
'''

PRIV = f'''
    <section id="tom-tat" aria-labelledby="h-tom-tat">
      <h2 id="h-tom-tat">Tóm tắt</h2>
      <ul class="plain">
        <li>Không cần tài khoản, không đăng nhập, không quảng cáo.</li>
        <li>Xưởng đề Toán là trang tĩnh, <b>không có máy chủ riêng để lưu dữ liệu</b> của thầy cô hay học sinh.</li>
        <li>Lựa chọn tạo đề, bài làm dở, lịch sử tự luyện chỉ lưu trong trình duyệt trên máy của chính người dùng.</li>
        <li>Khi thầy cô bật thu điểm, bài nộp của học sinh được gửi thẳng vào Google Sheet của chính thầy cô; trang không giữ bản sao.</li>
        <li>Trang đếm lượt truy cập bằng GoatCounter, không dùng cookie, không ghi họ tên hay bài làm.</li>
      </ul>
    </section>

    <section id="tren-may" aria-labelledby="h-tren-may">
      <h2 id="h-tren-may">Dữ liệu lưu trên máy của bạn</h2>
      <p>Để lần sau mở trang không phải chọn lại, trình duyệt lưu (bằng bộ nhớ cục bộ của trình duyệt) các thông tin sau trên chính máy đang dùng:</p>
      <ul class="plain">
        <li>Lựa chọn tạo đề: lớp, kì, cấu trúc, độ khó, thông tin đầu đề (tên trường, phòng giáo dục) mà thầy cô tự nhập.</li>
        <li>Lịch sử các mã đề đã tạo (để so sánh mức trùng lặp giữa các đề).</li>
        <li>Đường dẫn thu điểm Google Sheet thầy cô đã dán vào (để không phải dán lại).</li>
        <li>Bài làm đang dở và kết quả các lần tự luyện của học sinh trên máy đó.</li>
      </ul>
      <p>Các thông tin này không được gửi đi đâu. Có thể xoá bằng nút “Xoá lịch sử” trên trang hoặc xoá dữ liệu trang web trong phần cài đặt của trình duyệt.</p>
    </section>

    <section id="lam-bai" aria-labelledby="h-lam-bai">
      <h2 id="h-lam-bai">Khi học sinh làm bài trực tuyến</h2>
      <p><b>Nếu thầy cô không bật thu điểm:</b> bài làm và điểm chỉ hiện trên máy học sinh, không được gửi đi.</p>
      <p><b>Nếu thầy cô bật thu điểm về Google Sheet:</b> khi nộp bài, trình duyệt của học sinh gửi các thông tin sau đến đoạn mã Google Apps Script mà chính thầy cô đã cài trong tài khoản Google của mình, rồi ghi vào bảng tính của thầy cô:</p>
      <ul class="plain">
        <li>Họ và tên, lớp do học sinh tự nhập;</li>
        <li>Điểm, số câu đúng, thời gian làm bài, mã đề, đáp án học sinh đã chọn và đường dẫn xem lại bài làm.</li>
      </ul>
      <p>Xưởng đề Toán không nhận và không lưu bản sao các thông tin này. Bản thu điểm có gửi email tổng hợp dùng chính tài khoản Google của thầy cô để gửi thư. Hướng dẫn cài đặt: <a href="huong-dan-thu-diem.html">Thu điểm về Google Sheet</a>.</p>
    </section>

    <section id="gv" aria-labelledby="h-gv">
      <h2 id="h-gv">Lưu ý cho thầy cô khi thu điểm</h2>
      <p>Họ tên, lớp, điểm của học sinh là dữ liệu cá nhân, và thầy cô là người quản lý bảng tính chứa chúng. Luật Bảo vệ dữ liệu cá nhân (số 91/2025/QH15) có hiệu lực từ ngày 01/01/2026. Để thực hiện đúng, xin thầy cô lưu ý:</p>
      <ul class="plain">
        <li>Cho học sinh (và phụ huynh, khi cần) biết bài làm sẽ được ghi vào bảng điểm của thầy cô và dùng để làm gì.</li>
        <li>Chỉ chia sẻ bảng tính với người cần xem; không để chế độ “ai có đường liên kết cũng xem được”.</li>
        <li>Có thể cho học sinh nhập số thứ tự hoặc mã học sinh thay cho họ tên đầy đủ.</li>
        <li>Xoá các dòng hoặc bảng tính khi không còn cần dùng.</li>
      </ul>
      <p class="muted">Đây là gợi ý thực hành, không phải tư vấn pháp lý. Nhà trường có quy định riêng thì thầy cô làm theo quy định đó.</p>
    </section>

    <section id="dem-luot" aria-labelledby="h-dem-luot">
      <h2 id="h-dem-luot">Đếm lượt truy cập</h2>
      <p>Trang dùng <a href="https://www.goatcounter.com" rel="noopener" target="_blank">GoatCounter</a> để đếm số lượt mở trang và một số thao tác (in đề, tải file Word, bắt đầu hoặc nộp bài làm trực tuyến). GoatCounter không dùng cookie, không lập hồ sơ người dùng; trang không gửi họ tên, lớp hay nội dung bài làm vào số liệu này. Số liệu tổng hợp công khai tại trang <a href="thongke.html">Thống kê</a>.</p>
    </section>

    <section id="gop-y" aria-labelledby="h-gop-y">
      <h2 id="h-gop-y">Báo lỗi và góp ý</h2>
      <p>Phiếu báo lỗi, góp ý dùng Google Forms. Phiếu báo lỗi được điền sẵn lớp, kì, mã đề để biết đề nào cần sửa; các nội dung khác do người gửi tự nhập và không bắt buộc ghi email.</p>
    </section>

    <section id="ben-thu-ba" aria-labelledby="h-ben-thu-ba">
      <h2 id="h-ben-thu-ba">Dịch vụ bên ngoài trang sử dụng</h2>
      <ul class="plain">
        <li>GitHub Pages: nơi lưu và phát trang web.</li>
        <li>Google Fonts: phông chữ hiển thị.</li>
        <li>GoatCounter: đếm lượt truy cập.</li>
        <li>Google Forms: phiếu báo lỗi, góp ý.</li>
        <li>Google Sheets và Google Apps Script trong tài khoản của thầy cô: chỉ khi thầy cô bật thu điểm.</li>
      </ul>
      <p class="muted">Mỗi dịch vụ có chính sách quyền riêng tư riêng của nhà cung cấp.</p>
    </section>

    <section id="lien-he-rieng-tu" aria-labelledby="h-lien-he-rieng-tu">
      <h2 id="h-lien-he-rieng-tu">Liên hệ</h2>
      <p>Có câu hỏi về dữ liệu, xin gửi qua <a href="gioi-thieu.html#lien-he">phiếu góp ý</a>.</p>
      <p class="stamp">Cập nhật lần cuối: {UPDATED}.</p>
    </section>
'''

NOTFOUND = '''
    <p>Có thể đường dẫn bị gõ sai, hoặc trang đã được chuyển sang địa chỉ khác.</p>
    <p><a class="btnlink" href="/phieu-toan/">Về trang tạo đề</a><a class="btnlink alt" href="/phieu-toan/?tuluyen=1">Học sinh tự luyện</a></p>
    <p class="muted">Nếu thầy cô mở từ một đường dẫn bài làm học sinh, hãy kiểm tra đường dẫn đã được chép đầy đủ (đường dẫn bài làm luôn bắt đầu bằng …/phieu-toan/?lam=1).</p>
'''

(ROOT / 'gioi-thieu.html').write_text(page('gioi-thieu.html', 'Giới thiệu – Xưởng đề Toán',
    'Xưởng đề Toán: công cụ miễn phí tạo đề kiểm tra, phiếu bài tập Toán lớp 6 – 12 có đáp án, ma trận, bản đặc tả; ai làm, giữ chất lượng câu hỏi thế nào, liên hệ góp ý.',
    'Giới thiệu', 'Công cụ miễn phí tạo đề kiểm tra và phiếu bài tập Toán lớp 6 – 12, có đáp án, hướng dẫn chấm, ma trận và bản đặc tả.',
    ABOUT, toc=[('la-gi', 'Xưởng đề Toán là gì'), ('danh-cho', 'Dành cho ai'), ('tac-gia', 'Người thực hiện'), ('chat-luong', 'Chất lượng câu hỏi'), ('lien-he', 'Liên hệ, góp ý')]), encoding='utf8')
(ROOT / 'quyen-rieng-tu.html').write_text(page('quyen-rieng-tu.html', 'Quyền riêng tư – Xưởng đề Toán',
    'Xưởng đề Toán thu những dữ liệu nào, lưu ở đâu: không cần tài khoản, không có máy chủ lưu dữ liệu, điểm học sinh chỉ về Google Sheet của thầy cô.',
    'Quyền riêng tư', 'Trang thu những dữ liệu nào, lưu ở đâu và thầy cô cần lưu ý gì khi nhận điểm của học sinh.',
    PRIV, toc=[('tom-tat', 'Tóm tắt'), ('tren-may', 'Dữ liệu trên máy'), ('lam-bai', 'Làm bài trực tuyến'), ('gv', 'Lưu ý cho thầy cô'), ('dem-luot', 'Đếm lượt truy cập'), ('ben-thu-ba', 'Dịch vụ bên ngoài')]), encoding='utf8')
(ROOT / '404.html').write_text(page('404.html', 'Không tìm thấy trang – Xưởng đề Toán',
    'Không tìm thấy trang bạn cần trên Xưởng đề Toán.', 'Không tìm thấy trang', 'Trang bạn mở không tồn tại hoặc đã đổi địa chỉ.',
    NOTFOUND, noindex=True, abs_links=True), encoding='utf8')

# ---------- sitemap (gửi qua Google Search Console) ----------
today = datetime.date.today().isoformat()
urls = ['', '?tuluyen=1', 'gioi-thieu.html', 'can-cu.html', 'huong-dan-thu-diem.html', 'thu-diem-email.html', 'quyen-rieng-tu.html']
(ROOT / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    ''.join(f'  <url><loc>{BASE}{u.replace("&", "&amp;")}</loc><lastmod>{today}</lastmod></url>\n' for u in urls) + '</urlset>\n', encoding='utf8')

# ---------- chân trang chung cho các trang phụ có sẵn ----------
inject('can-cu.html', r'<p class="foot">.*?</p>')
inject('huong-dan-thu-diem.html', r'<p class="foot">.*?</p>')
inject('thu-diem-email.html', r'<p class="foot">.*?</p>')
inject('thongke.html', r'<p style="font-size:\.72rem;margin-top:10px">© 2026 Xưởng đề Toán · Bảo lưu mọi quyền\.</p>\s*</footer>', keep='</footer>\n')
tk = ROOT / 'thongke.html'
ts = tk.read_text(encoding='utf8')
if 'name="description"' not in ts:
    d = 'Số lượt dùng Xưởng đề Toán: lượt xem theo ngày, số đề được in, tải Word, số bài làm trực tuyến. Số liệu từ GoatCounter, không dùng cookie.'
    ts = ts.replace('</title>', f'</title>\n<meta name="description" content="{d}">\n<meta property="og:title" content="Thống kê – Xưởng đề Toán">\n<meta property="og:description" content="{d}">\n<meta property="og:image" content="{BASE}og.png">', 1)
    tk.write_text(ts, encoding='utf8')

# trang chuyển hướng cũ: không cho lập chỉ mục
for f in ('de-thi.html', 'phieu-lop-1.html'):
    p = ROOT / f
    s = p.read_text(encoding='utf8')
    if 'name="robots"' not in s:
        s = s.replace('<meta http-equiv="refresh"', '<meta name="robots" content="noindex">\n<meta http-equiv="refresh"', 1)
        p.write_text(s, encoding='utf8')
print('sitegen ok')
