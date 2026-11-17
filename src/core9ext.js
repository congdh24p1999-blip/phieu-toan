/* ===== Câu MỞ RỘNG: dùng kiến thức chưa có trong SGK của khối lớp đó.
   Chỉ xuất hiện khi chọn mức Nâng cao hoặc bật “Cho phép câu mở rộng”; trang đáp án có ghi chú. ===== */
const EXT_NOTES={
  nlc:{'m8-7-incdec':'đồng biến, nghịch biến – chưa có trong SGK Toán 8','m8-7-mono':'đồng biến, nghịch biến – chưa có trong SGK Toán 8',
       'm8-8-dice2':'phép thử gieo hai lần – chưa có trong SGK Toán 8','m8-8-coin':'phép thử tung nhiều lần – chưa có trong SGK Toán 8',
       'm7-8-coin':'phép thử tung nhiều lần – chưa có trong SGK Toán 7','m7-8-exp':'xác suất thực nghiệm – học ở lớp 6, SGK Toán 7 không có'},
  ds:{'ds7-8-exp':'xác suất thực nghiệm – học ở lớp 6, SGK Toán 7 không có'},
  tln:{'t8-8-two':'phép thử gieo hai lần – chưa có trong SGK Toán 8','t7-8-exp':'xác suất thực nghiệm – học ở lớp 6, SGK Toán 7 không có'},
  tl:{'tl8-7-vdc2':'biện luận phương trình theo tham số – nâng cao, ngoài SGK Toán 8','tl7-8-exp':'xác suất thực nghiệm – học ở lớp 6, SGK Toán 7 không có'}
};
Object.entries(EXT_NOTES).forEach(([k,o])=>Object.entries(o).forEach(([id,n])=>{if(!T[k][id])throw new Error('EXT: thiếu '+id);T[k][id].ext=n}));
