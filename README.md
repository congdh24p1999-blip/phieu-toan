# Xưởng đề Toán — Thầy Công

Công cụ miễn phí tạo đề kiểm tra Toán cấp 2, cấp 3 (hiện có lớp 6 đến lớp 12, cả học kì I và học kì II, sách Kết nối tri thức; lớp 12 có thêm đề "Ôn thi TN THPT" theo cấu trúc đề chính thức năm 2025; lớp 9 có thêm đề "Ôn thi vào 10", chọn được cấu trúc 100% tự luận hoặc có trắc nghiệm như đề các tỉnh năm 2026): chọn lớp, kì kiểm tra, cấu trúc đề, độ khó; mỗi lần bấm là một đề mới kèm đáp án, hướng dẫn chấm, nhiều mã đề, in khổ A4; có ma trận và bản đặc tả theo mẫu Công văn 7991, tải được file Word khổ ngang.

Câu hỏi bám theo SGK của khối lớp. Một số câu dùng kiến thức ngoài SGK (ví dụ đồng biến, nghịch biến ở lớp 8) được đánh dấu là câu mở rộng: chỉ xuất hiện ở mức Nâng cao hoặc khi bật tùy chọn "Cho phép câu mở rộng", và trang đáp án ghi rõ câu nào là câu mở rộng.

Trang đáp án có bảng đối chiếu mỗi câu với bài học trong SGK Kết nối tri thức với cuộc sống (ví dụ "Bài 23. Phép cộng và phép trừ phân thức đại số: Câu 15, 19"), giúp giáo viên biết câu nào kiểm tra bài nào.

**Phiếu bài tập theo bài học:** chọn "Phiếu bài tập", tick một hoặc vài bài trong SGK, chọn số câu (10–30) và loại câu. Trang tạo phiếu xếp từ dễ đến khó, kèm đáp án, lời giải; in hoặc tải Word như đề kiểm tra. Mỗi mã phiếu là một phiếu khác.

**Làm bài online:** bấm "Cho học sinh làm online" để lấy đường dẫn, mã QR của đề hoặc phiếu đang xem. Hai chế độ: làm bài kiểm tra (hẹn giờ, nộp là có điểm, bảng điểm theo phần, lời giải) và luyện tập (kiểm tra từng câu, làm câu khác cùng dạng). Câu tự luận được thay bằng câu trả lời ngắn cùng chương, hoặc giữ nguyên để học sinh làm ra giấy rồi tự chấm theo hướng dẫn chấm. Giáo viên có thể thu điểm về Google Sheet của mình (xem `huong-dan-thu-diem.html`, mã Apps Script ở `src/thu-diem.gs`).

**Tự luyện cho học sinh:** https://congdh24p1999-blip.github.io/phieu-toan/tu-luyen.html — học sinh tự chọn lớp, bài học hoặc đề (kiểm tra, ôn thi vào 10, tốt nghiệp), mức độ, rồi luyện ngay; lịch sử làm bài lưu trên máy.

Dùng ngay: https://congdh24p1999-blip.github.io/phieu-toan/

- `index.html`: Xưởng đề Toán (trang chính).
- `can-cu.html`: Căn cứ và phương pháp (văn bản căn cứ, cách tạo và kiểm tra đề, giới hạn, nhật ký cập nhật).
- `de-thi.html`, `phieu-lop-1.html`: chỉ chuyển hướng về trang chính, để link cũ vẫn dùng được (phiếu lớp 1 đã gỡ khỏi trang; bản cũ còn trong lịch sử git).
- `index.html?lam=1&...`: chế độ làm bài online (đề được tạo lại từ tham số trên đường dẫn).
- `tu-luyen.html`: đường dẫn ngắn tới trang Tự luyện (`index.html?tuluyen=1`).
- `huong-dan-thu-diem.html`: hướng dẫn từng bước tạo bảng Google Sheet nhận kết quả (bản mã cơ bản, `src/thu-diem-co-ban.gs`).
- `thu-diem-email.html`: nâng cao, bản mã có email tổng hợp (`src/thu-diem.gs`). `src/gsgen.py` sinh bản cơ bản và chèn mã vào hai trang.
- Toàn bộ chạy trên trình duyệt (HTML, CSS, JavaScript thuần), không cần máy chủ; bài tập tự soạn, không sao chép SGK.

## Bản quyền

© 2026 Xưởng đề Toán. Bảo lưu mọi quyền – mã nguồn công khai để xem, **không phải mã nguồn mở**. Không sao chép, chỉnh sửa, phát hành lại hay dựng trang khác khi chưa được đồng ý; xem [LICENSE](LICENSE). Giáo viên, học sinh được tự do dùng trang để tạo và in đề.
