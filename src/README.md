# Mã nguồn Xưởng đề Toán

`index.html` ở thư mục gốc được **ghép tự động** từ các file trong thư mục này. Không sửa trực tiếp `index.html`; sửa file nguồn rồi chạy lại `build.sh`.

## Ghép trang

```bash
cd src
./build.sh        # tạo core.js, ../index.html và page.js, kiểm tra cú pháp
```

Cần Node.js (≥ 18) và Python 3.

## Các file nguồn

| File | Nội dung |
|---|---|
| `head.html` | Giao diện, CSS (in A4), bảng chọn |
| `ui.js` | Điều khiển giao diện, trang đề, trang đáp án, ma trận |
| `core1.js`, `core2.js` | Hàm dùng chung (số, đa thức, định dạng), Toán 8 học kì I |
| `core11*.js` | Toán 11 (`core11k.js`: câu vận dụng cao bổ sung) |
| `core12a.js` … `core12e.js` | Toán 12 học kì I (a: Bài 1–2 và hàm vẽ đồ thị, bảng biến thiên; b: Bài 3–5; c: Chương II vectơ, toạ độ; d: Chương III; e: dạng bổ sung) |
| `core10a.js` … `core10c.js` | Toán 10 học kì I (a: Chương I mệnh đề, tập hợp và Chương II bất phương trình bậc nhất hai ẩn, hình miền nghiệm `hpFig()` gạch phần bỏ đi; b: Chương III hệ thức lượng, Chương IV vectơ; c: Chương V số đặc trưng của mẫu số liệu không ghép nhóm) |
| `core12f.js` … `core12h.js` | Toán 12 học kì II (f: Chương IV nguyên hàm, tích phân, kí hiệu tích phân `ig()`; g: Chương V toạ độ không gian; h: Chương VI xác suất có điều kiện và tự luận thực tiễn) |
| `core7*.js` | Toán 7 (`core7d.js`: dạng bổ sung theo bài tập SGK) |
| `core-ds.js` | Câu đúng sai lớp 7 |
| `core8a.js` … `core8i.js` | Toán 8 học kì II theo chương (a: VI, b: VII, c: VIII, d: IX, e: X); f–i: bổ sung, bài hình |
| `core9ext.js` | Danh sách câu mở rộng (ngoài SGK) và ghi chú |
| `core9les.js` | Đối chiếu mỗi dạng câu với bài học SGK Kết nối tri thức |
| `docx.js` | Xuất file Word (.docx): chuyển trang đề/đáp án sang Word, công thức thành công thức Word, hình vẽ thành ảnh |
| `core9ws.js` | Phiếu bài tập: chọn dạng câu theo bài học, chia loại câu, hạn chế lặp (ghép sau `core3.js`) |
| `core3.js` | Cấu trúc đề, ma trận, mức độ, cách chọn dạng câu — **phải đứng cuối** |

Mỗi dạng câu đăng kí bằng `reg(kind, id, ch, lv, gen, extra)` (qua các hàm `NLC`, `TL`, `N8`, `TL8`, `N7b`, `TL11`…). `gen(r)` nhận bộ sinh số ngẫu nhiên và trả về câu hỏi kèm lời giải; `chk()` tự kiểm tra đáp án.

## Kiểm tra trước khi đẩy lên

```bash
node sweep.js '.'                 # sinh 3000 lần mỗi dạng, kiểm tra đáp án, phương án trùng, kí tự lỗi
node sweep.js 'tl8-9'             # chỉ các dạng có id khớp
node test.js 300 chuan gk2,ck2    # sinh đề theo cấu trúc, kiểm tra ma trận, mức độ
node exttest.js                   # câu mở rộng bật/tắt
node rep.js 'gk1|ck1'             # vị trí câu nào chỉ có 1 dạng (đề nào cũng giống)
node show.js tl:tl8-9-perp        # xem nhanh một câu (kind:id)
node lst.js '^m7-'                # liệt kê các dạng
python3 ui3.py && python3 uiext.py   # thử giao diện bằng Playwright (ảnh lưu ở out/)
python3 pr8.py                    # in thử PDF A4 (lưu ở out/)
python3 wordtest.py 8 ck2 101 2    # tải thử file Word đề và đáp án (lớp, kì, mã đề, số mã đề)
python3 wstest.py                 # thử chế độ phiếu bài tập: mọi bài học đều tạo được phiếu, tải Word
python3 ui12.py                   # thử lớp 12 qua giao diện (đề, đáp án, ma trận)
python3 ui10.py                   # thử lớp 10 học kì I qua giao diện
node hyph.js '12'                 # tìm dấu trừ ASCII "-" lọt vào nội dung
node lv11.js 12gk1,12ck1          # tỉ lệ mức độ nhận thức theo độ khó
```

`tcmp.js` so sánh với bản trước: tạo `core_prev.js` từ `git show HEAD:index.html` (phần script trước `const LS_KEY=`) rồi chạy `node tcmp.js`.
