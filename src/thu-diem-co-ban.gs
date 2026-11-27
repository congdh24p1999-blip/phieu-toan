/**
 * Xưởng đề Toán – nhận kết quả làm bài online vào bảng tính này (bản cơ bản, không gửi email).
 * Mã chỉ đọc và ghi đúng bảng tính chứa nó, không đọc Gmail, không đọc tệp nào khác.
 * @OnlyCurrentDoc
 */

const HEAD = ['Thời điểm nộp', 'Họ và tên', 'Lớp', 'Điểm (thang 10)', 'Tự luận (GV chấm)', 'Tổng điểm (thang 10)',
  'Xem bài làm', 'Điểm máy chấm', 'Tự luận (HS tự chấm)', 'Điểm toàn bài', 'Số câu đúng', 'Số câu chấm tự động',
  'Thời gian làm (phút)', 'Hết giờ tự nộp', 'Chế độ', 'Mã đề', 'Điểm từng phần', 'Bài làm', 'Mã lượt làm'];

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
    // tìm cột theo tên; thẻ tạo bằng mã cũ thiếu cột nào thì thêm cột đó vào cuối
    const head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
    const col = {};
    HEAD.forEach(h => {
      let i = head.indexOf(h);
      if (i < 0) { head.push(h); i = head.length - 1; sh.getRange(1, i + 1).setValue(h).setFontWeight('bold'); }
      col[h] = i + 1;
    });
    // chặn chuỗi bắt đầu bằng = + - @ để không bị hiểu thành công thức
    const safe = v => (v == null ? '' : (typeof v === 'string' && /^[=+\-@]/.test(v)) ? "'" + v : v);
    const val = {
      'Thời điểm nộp': new Date(), 'Họ và tên': d.name, 'Lớp': d.cls, 'Điểm (thang 10)': d.score10,
      'Điểm máy chấm': d.auto, 'Tự luận (HS tự chấm)': d.tlSelf, 'Điểm toàn bài': d.all,
      'Số câu đúng': d.nOK, 'Số câu chấm tự động': d.n, 'Thời gian làm (phút)': d.minutes,
      'Hết giờ tự nộp': d.autoSubmit ? 'có' : '', 'Chế độ': d.mode, 'Mã đề': d.code,
      'Điểm từng phần': d.parts, 'Bài làm': d.answers, 'Mã lượt làm': String(d.id)
    };
    // cùng một lượt làm gửi lại (ví dụ sau khi tự chấm) thì ghi đè đúng các cột của trang, giữ điểm thầy cô đã gõ
    const n = sh.getLastRow() - 1;
    const hit = n > 0 ? sh.getRange(2, col['Mã lượt làm'], n, 1).createTextFinder(String(d.id))
      .matchEntireCell(true).findNext() : null;
    let r;
    if (hit) {
      r = hit.getRow();
      Object.keys(val).forEach(k => sh.getRange(r, col[k]).setValue(safe(val[k])));
    } else {
      const row = new Array(head.length).fill('');
      Object.keys(val).forEach(k => { row[col[k] - 1] = safe(val[k]); });
      sh.appendRow(row);
      r = sh.getLastRow();
    }
    // Tổng điểm: chưa gõ điểm tự luận thì bằng điểm online; gõ rồi thì = (điểm máy chấm + tự luận) quy về thang 10
    const c = h => colChu_(col[h]) + r;
    sh.getRange(r, col['Tổng điểm (thang 10)']).setFormula('=IF(' + c('Tự luận (GV chấm)') + '="",' + c('Điểm (thang 10)') +
      ',IF(N(' + c('Điểm toàn bài') + ')=0,"",ROUND((N(' + c('Điểm máy chấm') + ')+' + c('Tự luận (GV chấm)') + ')/' +
      c('Điểm toàn bài') + '*10,2)))');
    if (d.xem && /^https:\/\//.test(d.xem)) {
      sh.getRange(r, col['Xem bài làm']).setRichTextValue(
        SpreadsheetApp.newRichTextValue().setText('Xem bài làm').setLinkUrl(String(d.xem)).build());
    }
    return { tab, isNew: !hit };
  } finally {
    lock.releaseLock();
  }
}
function colChu_(c) { let s = ''; while (c > 0) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - 1) / 26); } return s; }


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
        mode: 'Thử kết nối', score10: 10, got: 10, tot: 10, auto: 10, all: 10, answers: 'Dòng này do trang hướng dẫn gửi thử' });
      out.ghi = true;
      out.bang = SpreadsheetApp.getActiveSpreadsheet().getName();
      out.url = SpreadsheetApp.getActiveSpreadsheet().getUrl();   // để trang hướng dẫn mở đúng bảng điểm
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
