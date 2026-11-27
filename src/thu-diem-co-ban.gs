/**
 * Xưởng đề Toán – nhận kết quả làm bài online vào bảng tính này (bản cơ bản, không gửi email).
 * Mã chỉ đọc và ghi đúng bảng tính chứa nó, không đọc Gmail, không đọc tệp nào khác.
 * @OnlyCurrentDoc
 */

const HEAD = ['Thời điểm nộp', 'Họ và tên', 'Lớp', 'Điểm (thang 10)', 'Điểm đạt', 'Tổng điểm',
  'Tự luận (HS tự chấm)', 'Số câu đúng', 'Số câu chấm tự động', 'Thời gian làm (phút)',
  'Hết giờ tự nộp', 'Chế độ', 'Mã đề', 'Điểm từng phần', 'Bài làm', 'Mã lượt làm'];

/* Bấm Chạy hàm này một lần sau khi dán mã để Google hỏi quyền ghi vào bảng tính này. */
function caiDat() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  console.log('Đã cài đặt. Bảng tính "' + ss.getName() + '" sẵn sàng nhận điểm.');
}

/* Ghi một kết quả vào trang tính của đề; trả về tên trang và có phải dòng mới không */
function ghiKetQua_(d) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tab = String(d.sheet || 'Kết quả').replace(/[\[\]\*\?\/\\:]/g, ' ').slice(0, 90);
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
    if (hit) { sh.getRange(hit.getRow(), 1, 1, row.length).setValues([row]); return { tab, isNew: false }; }
    sh.appendRow(row);
    return { tab, isNew: true };
  } finally {
    lock.releaseLock();
  }
}

/* Học sinh nộp bài: trang làm bài gửi kết quả tới đây */
function doPost(e) {
  try {
    ghiKetQua_(JSON.parse(e.postData.contents));
  } catch (err) {
    return ContentService.createTextOutput('loi: ' + err);
  }
  return ContentService.createTextOutput('ok');
}

/* Mở địa chỉ trong trình duyệt để xem web app có chạy không.
   Trang hướng dẫn gọi kèm ?thu=1&cb=… để ghi một dòng thử và nhận lại kết quả. */
function doGet(e) {
  const p = (e && e.parameter) || {};
  const out = { ok: true, ban: 2 };
  if (p.thu === '1') {
    try {
      ghiKetQua_({ id: 'thu-' + Date.now(), sheet: 'Thử kết nối', name: 'Học sinh thử', cls: 'Thử', code: '000',
        mode: 'Thử kết nối', score10: 10, got: 10, tot: 10, answers: 'Dòng này do trang hướng dẫn gửi thử' });
      out.ghi = true;
      out.bang = SpreadsheetApp.getActiveSpreadsheet().getName();
    } catch (err) {
      out.ok = false;
      out.loi = String(err);
    }
  }
  if (p.cb && /^[A-Za-z_$][\w$]{0,40}$/.test(p.cb)) {
    return ContentService.createTextOutput(p.cb + '(' + JSON.stringify(out) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput('Xưởng đề Toán: web app thu điểm đang chạy.');
}

/* Giữ chỗ: nếu trước đây đã cài bản có email thì lịch gửi cũ gọi vào đây và không làm gì. */
function guiEmailTongHop() {}
