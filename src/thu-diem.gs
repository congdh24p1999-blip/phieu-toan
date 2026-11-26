/**
 * Xưởng đề Toán – nhận kết quả làm bài online vào bảng tính này.
 * @OnlyCurrentDoc
 */
const HEAD = ['Thời điểm nộp', 'Họ và tên', 'Lớp', 'Điểm (thang 10)', 'Điểm đạt', 'Tổng điểm',
  'Tự luận (HS tự chấm)', 'Số câu đúng', 'Số câu chấm tự động', 'Thời gian làm (phút)',
  'Hết giờ tự nộp', 'Chế độ', 'Mã đề', 'Điểm từng phần', 'Bài làm', 'Mã lượt làm'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
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
    // cùng một lượt làm gửi lại thì ghi đè dòng cũ
    const n = sh.getLastRow() - 1;
    const hit = n > 0 ? sh.getRange(2, HEAD.length, n, 1).createTextFinder(String(d.id))
      .matchEntireCell(true).findNext() : null;
    if (hit) sh.getRange(hit.getRow(), 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('loi: ' + err);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('Xưởng đề Toán: web app thu điểm đang chạy.');
}
