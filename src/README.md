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
| `site.js` | Nút "Báo lỗi đề này" (mở Google Form, tự điền hoặc chép sẵn lớp, kì, độ khó, mã đề, cấu trúc) và thống kê lượt in, tải Word bằng GoatCounter (không dùng cookie). Chỉ bật khi điền `SITE_CFG` ở đầu file. |
| `core09d.js` … `core09f.js` | Toán 9 học kì II (d: Chương VI hàm số y = ax², phương trình bậc hai, Viète, bài toán lập phương trình; e: Chương VII tần số, tần số tương đối, ghép nhóm và Chương VIII phép thử, xác suất; f: Chương IX góc nội tiếp, đường tròn ngoại tiếp – nội tiếp, tứ giác nội tiếp, đa giác đều và Chương X hình trụ, hình nón, hình cầu). Đề `9gk2` (Chương VI – VIII), `9ck2` (Chương VI – X) |
| `core09a.js` … `core09c.js` | Toán 9 học kì I (a: Chương I hệ hai phương trình bậc nhất hai ẩn, Chương II phương trình và bất phương trình bậc nhất một ẩn; b: Chương III căn bậc hai, căn bậc ba, Chương IV hệ thức lượng trong tam giác vuông, Chương V đường tròn; c: bổ sung dạng đúng/sai, trả lời ngắn, tự luận để mỗi vị trí câu có ít nhất 2 dạng). Đề `9gk1` (Chương I – III), `9ck1` (Chương I – V) |
| `core10a.js` … `core10c.js` | Toán 10 học kì I (a: Chương I mệnh đề, tập hợp và Chương II bất phương trình bậc nhất hai ẩn, hình miền nghiệm `hpFig()` gạch phần bỏ đi; b: Chương III hệ thức lượng, Chương IV vectơ; c: Chương V số đặc trưng của mẫu số liệu không ghép nhóm) |
| `core10d.js` … `core10f.js` | Toán 10 học kì II (d: Chương VI hàm số, hàm số bậc hai, dấu tam thức, phương trình chứa căn, bảng biến thiên `bbtQ10()`; e: Chương VII toạ độ phẳng: đường thẳng, đường tròn, ba đường conic; f: Chương VIII đại số tổ hợp, kí hiệu chỉnh hợp/tổ hợp `AH()`, `CH()`, và Chương IX xác suất cổ điển) |
| `core12i.js` | Dạng câu riêng cho đề ôn thi tốt nghiệp (`g:'tn'`): máy bay và ra-đa trong Oxyz, mô hình số lượng cá, tối ưu lợi nhuận, thể tích chiếc bát, khoảng cách trong phòng học, xếp sách, cấp số cộng. Đề `12tn` trong `core3.js` gom mẫu câu lớp 10, 11, 12 theo 10 chủ đề (`CHTN`, `TN_MIX`), đáp án trả lời ngắn tối đa 4 kí tự. Các dạng bám sát 22 câu của đề chính thức 2025 (mã 0101–0104: thuốc y′ = ky, vật chuyển động theo vectơ đơn vị, mật thư cấp số cộng, lợi nhuận vượt ngưỡng, bán hai thực đơn, khoảng cách AC – SD, xếp sách vào ngăn, chân đế chóp cụt khoét chỏm cầu) được ưu tiên ở từng vị trí Phần II, III qua `prefer`. Bảy câu xác suất vận dụng cao `tn-v-*` (Bayes chuyển bi, xét nghiệm hai lần, có điều kiện, cặp vợ chồng, số có 4 chữ số, trò chơi gieo xúc xắc, châu chấu nhảy) dùng cho câu cuối Phần III (mức Chuẩn) và hai câu cuối (mức Nâng cao). Phiếu ôn thi theo chuyên đề (lớp 12, mục 101 – 112 trong danh sách bài): `tnWsPool()` trong `core9ws.js` |
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
python3 ui10.py                   # thử lớp 10 (cả hai học kì) qua giao diện
python3 uitn.py                   # thử đề ôn thi tốt nghiệp THPT qua giao diện
node test.js 150 chuan 12tn tn    # kiểm tra đề ôn thi tốt nghiệp (luôn dùng cấu trúc 12 + 4 + 6)
node hyph.js '12'                 # tìm dấu trừ ASCII "-" lọt vào nội dung
node lv11.js 12gk1,12ck1          # tỉ lệ mức độ nhận thức theo độ khó
```

`tcmp.js` so sánh với bản trước: tạo `core_prev.js` từ `git show HEAD:index.html` (phần script trước `const LS_KEY=`) rồi chạy `node tcmp.js`.
