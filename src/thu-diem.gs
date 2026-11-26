/**
 * Xưởng đề Toán – nhận kết quả làm bài online vào bảng tính này và báo qua email.
 * @OnlyCurrentDoc
 */

/* ===== CÀI ĐẶT EMAIL (sửa ở đây rồi bấm Lưu, chạy lại hàm caiDat) ===== */
// 'hang-ngay' : mỗi ngày một email tổng hợp các bài nộp mới (khuyên dùng)
// 'moi-bai'   : mỗi bài nộp một email (Gmail thường chỉ gửi được khoảng 100 email/ngày)
// 'tat'       : không gửi email, chỉ ghi vào bảng tính
const EMAIL_KIEU = 'hang-ngay';
const GIO_GUI = 20;      // giờ gửi email tổng hợp mỗi ngày (0 – 23, giờ Việt Nam)
const EMAIL_NHAN = '';   // để trống: gửi về Gmail của chính thầy cô; hoặc ghi địa chỉ khác
/* ===================================================================== */

const MUI_GIO = 'Asia/Ho_Chi_Minh';
const HEAD = ['Thời điểm nộp', 'Họ và tên', 'Lớp', 'Điểm (thang 10)', 'Điểm đạt', 'Tổng điểm',
  'Tự luận (HS tự chấm)', 'Số câu đúng', 'Số câu chấm tự động', 'Thời gian làm (phút)',
  'Hết giờ tự nộp', 'Chế độ', 'Mã đề', 'Điểm từng phần', 'Bài làm', 'Mã lượt làm'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let d, tab, isNew = false;
  try {
    d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    tab = String(d.sheet || 'Kết quả').replace(/[\[\]\*\?\/\\:]/g, ' ').slice(0, 90);
    const sh = ss.getSheetByName(tab) || ss.insertSheet(tab);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEAD);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEAD.length).setFontWeight('bold');
    }
    // chặn chuỗi bắt đầu bằng = + - @ để không bị hiểu thành công thức
    const safe = v => (typeof v === 'string' && /^[=+\-@]/.test(v)) ? "'" + v : v;
    const row = [new Date(), d.name, d.cls, d.score10, d.got, d.tot, d.tlSelf, d.nOK, d.n,
      d.minutes, d.autoSubmit ? 'có' : '', d.mode, d.code, d.parts, d.answers, String(d.id)]
      .map(v => safe(v == null ? '' : v));
    // cùng một lượt làm gửi lại (ví dụ sau khi tự chấm tự luận) thì ghi đè dòng cũ
    const n = sh.getLastRow() - 1;
    const hit = n > 0 ? sh.getRange(2, HEAD.length, n, 1).createTextFinder(String(d.id))
      .matchEntireCell(true).findNext() : null;
    if (hit) sh.getRange(hit.getRow(), 1, 1, row.length).setValues([row]);
    else { sh.appendRow(row); isNew = true; }
  } catch (err) {
    return ContentService.createTextOutput('loi: ' + err);
  } finally {
    lock.releaseLock();
  }
  // email từng bài: lỗi gửi email không làm mất kết quả đã ghi
  if (EMAIL_KIEU === 'moi-bai' && isNew) {
    try { guiEmailMotBai_(d, tab); } catch (err) { console.error(err); }
  }
  return ContentService.createTextOutput('ok');
}

function doGet() {
  return ContentService.createTextOutput('Xưởng đề Toán: web app thu điểm đang chạy.');
}

/* Chạy hàm này một lần sau khi dán mã (và mỗi lần đổi cài đặt email):
   cấp quyền, gửi email thử, bật hoặc tắt lịch gửi email tổng hợp hằng ngày. */
function caiDat() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'guiEmailTongHop')
    .forEach(t => ScriptApp.deleteTrigger(t));
  let lich = 'Không gửi email (chỉ ghi vào bảng tính).';
  if (EMAIL_KIEU === 'hang-ngay') {
    const gio = Math.min(23, Math.max(0, Math.floor(GIO_GUI)));
    ScriptApp.newTrigger('guiEmailTongHop').timeBased().everyDays(1).atHour(gio)
      .inTimezone(MUI_GIO).create();
    PropertiesService.getScriptProperties().setProperty('lanGuiTruoc', String(Date.now()));
    lich = 'Mỗi ngày khoảng ' + gio + ' giờ, một email tổng hợp các bài nộp mới (ngày không có bài nộp thì không gửi).';
  } else if (EMAIL_KIEU === 'moi-bai') {
    lich = 'Mỗi bài nộp mới một email.';
  }
  if (EMAIL_KIEU !== 'tat') {
    MailApp.sendEmail({
      to: nguoiNhan_(),
      subject: 'Xưởng đề Toán: đã cài đặt thu điểm',
      htmlBody: '<p>Bảng tính <b>' + esc_(SpreadsheetApp.getActiveSpreadsheet().getName()) +
        '</b> đã sẵn sàng nhận kết quả làm bài online.</p><p>Cách báo qua email: ' + esc_(lich) +
        '</p><p><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">Mở bảng tính</a></p>'
    });
  }
  console.log('Đã cài đặt. ' + lich);
}

/* Gửi email tổng hợp các bài nộp từ lần gửi trước; lịch hằng ngày tự gọi hàm này. */
function guiEmailTongHop() {
  const props = PropertiesService.getScriptProperties();
  const tu = Number(props.getProperty('lanGuiTruoc')) || (Date.now() - 24 * 3600 * 1000);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nhom = [];
  let tong = 0;
  ss.getSheets().forEach(sh => {
    if (sh.getLastRow() < 2) return;
    const v = sh.getDataRange().getValues();
    if (v[0][0] !== HEAD[0]) return;
    const moi = v.slice(1).filter(r => r[0] instanceof Date && r[0].getTime() > tu);
    if (!moi.length) return;
    tong += moi.length;
    nhom.push({ ten: sh.getName(), url: ss.getUrl() + '#gid=' + sh.getSheetId(), rows: moi });
  });
  props.setProperty('lanGuiTruoc', String(Date.now()));
  if (!tong) return;
  const diem = r => (r[3] !== '' && r[3] != null) ? Number(r[3]) : (Number(r[5]) ? Number(r[4]) / Number(r[5]) * 10 : NaN);
  const so = x => (Math.round(x * 10) / 10).toString().replace('.', ',');
  let html = '<p>Từ ' + Utilities.formatDate(new Date(tu), MUI_GIO, 'HH:mm dd/MM') + ' đến nay có <b>' + tong +
    '</b> bài nộp mới (tính cả bài gửi lại sau khi tự chấm).</p>';
  nhom.forEach(g => {
    const ds = g.rows.map(diem).filter(x => !isNaN(x));
    const tb = ds.length ? ds.reduce((a, b) => a + b, 0) / ds.length : NaN;
    html += '<h3 style="margin:18px 0 4px">' + esc_(g.ten) + '</h3><p style="margin:0 0 6px">' + g.rows.length + ' bài' +
      (ds.length ? ' · điểm trung bình ' + so(tb) + ' · thấp nhất ' + so(Math.min.apply(null, ds)) +
        ' · cao nhất ' + so(Math.max.apply(null, ds)) + ' (thang 10)' : '') +
      ' · <a href="' + g.url + '">Xem trong bảng</a></p>';
    const rows = g.rows.slice().sort((a, b) => String(a[2]).localeCompare(String(b[2]), 'vi') || String(a[1]).localeCompare(String(b[1]), 'vi'));
    html += '<table cellpadding="4" style="border-collapse:collapse;font-size:14px"><tr style="background:#eef3f1">' +
      '<th align="left">Họ và tên</th><th align="left">Lớp</th><th align="right">Điểm</th><th align="left">Nộp lúc</th></tr>' +
      rows.slice(0, 60).map(r => '<tr style="border-top:1px solid #ddd"><td>' + esc_(r[1]) + '</td><td>' + esc_(r[2]) +
        '</td><td align="right">' + (isNaN(diem(r)) ? '' : so(diem(r))) + '</td><td>' +
        Utilities.formatDate(r[0], MUI_GIO, 'HH:mm dd/MM') + '</td></tr>').join('') + '</table>' +
      (rows.length > 60 ? '<p>… và ' + (rows.length - 60) + ' bài khác, xem đủ trong bảng tính.</p>' : '');
  });
  html += '<p style="color:#666;font-size:13px;margin-top:18px">Email tự động từ bảng tính <a href="' + ss.getUrl() + '">' +
    esc_(ss.getName()) + '</a> (Xưởng đề Toán). Muốn đổi giờ gửi hoặc tắt email: sửa phần CÀI ĐẶT EMAIL trong Apps Script rồi chạy lại hàm caiDat.</p>';
  MailApp.sendEmail({
    to: nguoiNhan_(),
    subject: 'Xưởng đề Toán: ' + tong + ' bài nộp mới (' + Utilities.formatDate(new Date(), MUI_GIO, 'dd/MM') + ')',
    htmlBody: html
  });
}

function guiEmailMotBai_(d, tab) {
  if (MailApp.getRemainingDailyQuota() < 1) return;   // hết lượt gửi trong ngày: kết quả vẫn có trong bảng
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const so = x => String(x).replace('.', ',');
  const diem = (d.score10 !== '' && d.score10 != null) ? so(d.score10) + '/10' : so(d.got) + '/' + so(d.tot) + ' điểm';
  MailApp.sendEmail({
    to: nguoiNhan_(),
    subject: 'Bài nộp: ' + String(d.name || 'Không tên').slice(0, 60) + (d.cls ? ' (' + String(d.cls).slice(0, 12) + ')' : '') + ' – ' + diem,
    htmlBody: '<p><b>' + esc_(d.name) + '</b>' + (d.cls ? ', lớp ' + esc_(d.cls) : '') + ' vừa nộp bài <b>' + esc_(tab) + '</b>' +
      (d.code ? ' (mã ' + esc_(d.code) + ')' : '') + '.</p><p>Điểm: <b>' + esc_(diem) + '</b> · Thời gian làm ' + esc_(d.minutes) +
      ' phút' + (d.autoSubmit ? ' · hết giờ, tự nộp' : '') + '</p><p>Điểm từng phần: ' + esc_(d.parts) + '</p>' +
      '<p><a href="' + ss.getUrl() + '">Mở bảng tính</a></p>'
  });
}

function nguoiNhan_() { return EMAIL_NHAN || Session.getEffectiveUser().getEmail(); }
function esc_(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
