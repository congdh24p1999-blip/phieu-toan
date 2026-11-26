
/* ================= Khung đề (theo mẫu 12 + 2 + 4 + 3) ================= */
const CH_NAME={1:'Đa thức nhiều biến',2:'Hằng đẳng thức đáng nhớ',3:'Tứ giác',4:'Định lí Thalès',5:'Dữ liệu và biểu đồ',6:'Phân thức đại số',7:'Phương trình bậc nhất và hàm số bậc nhất',8:'Mở đầu về tính xác suất của biến cố',9:'Tam giác đồng dạng',10:'Một số hình khối trong thực tiễn'};
const PTS={nlc:0.25,dsItem:0.25,tln:0.5,tl:1};
const G8={grade:8,school:'THCS',mon:'Toán 8',chName:CH_NAME,tlQ:[1,1,1],
  note:'Cấu trúc theo một mẫu tham khảo: 12 câu nhiều lựa chọn (3 đ), 2 câu đúng/sai (2 đ), 4 câu trả lời ngắn (2 đ), 3 câu tự luận (3 đ).'};
const CH11={1:'Hàm số lượng giác và phương trình lượng giác',2:'Dãy số. Cấp số cộng và cấp số nhân',3:'Mẫu số liệu ghép nhóm',4:'Quan hệ song song trong không gian',5:'Giới hạn. Hàm số liên tục',6:'Hàm số mũ và hàm số lôgarit',7:'Quan hệ vuông góc trong không gian',8:'Các quy tắc tính xác suất',9:'Đạo hàm'};
const G11={grade:11,school:'THPT',mon:'Toán 11',chName:CH11,tlQ:[1,1,1],
  note:'Cấu trúc theo khung đề cương ôn tập Toán 11 năm học 2026–2027: 12 câu nhiều lựa chọn (3 đ), 2 câu đúng/sai (2 đ), 4 câu trả lời ngắn (2 đ), 3 câu tự luận (3 đ, mỗi câu 2 ý).'};
const CH7={1:'Số hữu tỉ',2:'Số thực',3:'Góc và đường thẳng song song',4:'Tam giác bằng nhau',5:'Thu thập và biểu diễn dữ liệu',6:'Tỉ lệ thức và đại lượng tỉ lệ',7:'Biểu thức đại số và đa thức một biến',8:'Làm quen với biến cố và xác suất của biến cố',9:'Quan hệ giữa các yếu tố trong một tam giác',10:'Một số hình khối trong thực tiễn'};
const G7={...G8,grade:7,mon:'Toán 7',chName:CH7};
const CH6={1:'Tập hợp các số tự nhiên',2:'Tính chia hết trong tập hợp các số tự nhiên',3:'Số nguyên',4:'Một số hình phẳng trong thực tiễn',5:'Tính đối xứng của hình phẳng trong tự nhiên',6:'Phân số',7:'Số thập phân',8:'Những hình hình học cơ bản',9:'Dữ liệu và xác suất thực nghiệm'};
const G6={...G8,grade:6,mon:'Toán 6',chName:CH6};
const CH9={1:'Phương trình và hệ hai phương trình bậc nhất hai ẩn',2:'Phương trình và bất phương trình bậc nhất một ẩn',3:'Căn bậc hai và căn bậc ba',4:'Hệ thức lượng trong tam giác vuông',5:'Đường tròn',6:'Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn',7:'Tần số và tần số tương đối',8:'Xác suất của biến cố trong một số mô hình xác suất đơn giản',9:'Đường tròn ngoại tiếp và đường tròn nội tiếp',10:'Một số hình khối trong thực tiễn'};
const G9={...G8,grade:9,mon:'Toán 9',chName:CH9};
const CH12={1:'Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',2:'Vectơ và hệ trục toạ độ trong không gian',3:'Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm',4:'Nguyên hàm và tích phân',5:'Phương pháp toạ độ trong không gian',6:'Xác suất có điều kiện'};
const G12={grade:12,school:'THPT',mon:'Toán 12',chName:CH12,tlQ:[1,1,1],
  note:'Cấu trúc tham khảo: 12 câu nhiều lựa chọn (3 đ), 2 câu đúng/sai (2 đ), 4 câu trả lời ngắn (2 đ), 3 câu tự luận (3 đ, mỗi câu 2 ý). Có thể chọn cấu trúc “Kiểu thi tốt nghiệp THPT” (12 + 4 + 6, không tự luận) ở mục Cấu trúc đề.'};
const CH10={1:'Mệnh đề và tập hợp',2:'Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',3:'Hệ thức lượng trong tam giác',4:'Vectơ',5:'Các số đặc trưng của mẫu số liệu không ghép nhóm',6:'Hàm số, đồ thị và ứng dụng',7:'Phương pháp toạ độ trong mặt phẳng',8:'Đại số tổ hợp',9:'Tính xác suất theo định nghĩa cổ điển'};
const G10={grade:10,school:'THPT',mon:'Toán 10',chName:CH10,tlQ:[1,1,1],
  note:'Cấu trúc tham khảo: 12 câu nhiều lựa chọn (3 đ), 2 câu đúng/sai (2 đ), 4 câu trả lời ngắn (2 đ), 3 câu tự luận (3 đ, mỗi câu 2 ý). Có thể chọn cấu trúc “Kiểu thi tốt nghiệp THPT” (12 + 4 + 6, không tự luận) ở mục Cấu trúc đề.'};
/* Ôn thi tốt nghiệp THPT: chủ đề gộp nội dung lớp 10, 11, 12 theo cấu trúc đề chính thức năm 2025 */
const CHTN={101:'Ứng dụng đạo hàm, khảo sát hàm số (lớp 11, 12)',102:'Nguyên hàm, tích phân và ứng dụng',103:'Vectơ và phương pháp toạ độ trong không gian',104:'Hình học không gian: quan hệ song song, vuông góc (lớp 11)',
  105:'Thống kê: mẫu số liệu ghép nhóm (lớp 11, 12)',106:'Đại số tổ hợp và xác suất (lớp 10, 11, 12)',107:'Hàm số lượng giác, phương trình lượng giác (lớp 11)',108:'Dãy số, cấp số cộng, cấp số nhân (lớp 11)',109:'Hàm số mũ và hàm số lôgarit (lớp 11)',110:'Bất phương trình, hệ bất phương trình bậc nhất hai ẩn; hàm số bậc hai; đường conic (lớp 10)'};
const TN_MIX={101:[[12,1],[11,9],['tn',101]],102:[[12,4],['tn',102]],103:[[12,2],[12,5],['tn',103]],104:[[11,4],[11,7],['tn',104]],105:[[11,3],[12,3]],106:[[10,8],[10,9],[11,8],[12,6],['tn',106]],107:[[11,1]],108:[[11,2]],109:[[11,6]],110:[[10,2],[10,6],['tn',110]]};
const BLUEPRINT={
  '9gk1':{...G9,hk:1,short:'Giữa học kì I',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ I',scope:'Chương I – III (Kết nối tri thức)',chapters:[1,2,3],
    nlc:[1,1,1,1,2,2,2,2,3,3,3,3],ds:[1,3],tln:[1,2,3,3],
    tl:[{role:'alg',chs:[1,2]},{role:'real',chs:[1,2]},{role:'rad',chs:[3]}]},
  '9ck1':{...G9,hk:1,short:'Cuối học kì I',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ I',scope:'Chương I – V (Kết nối tri thức)',chapters:[1,2,3,4,5],
    nlc:[1,1,2,2,3,3,4,4,4,5,5,5],ds:[4,5],tln:[1,3,4,5],
    tl:[{role:'rad',chs:[3]},{role:'real',chs:[1,2,4]},{role:'geo',chs:[4,5]}]},
  '9gk2':{...G9,hk:2,short:'Giữa học kì II',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ II',scope:'Chương VI – VIII (Kết nối tri thức)',chapters:[6,7,8],
    nlc:[6,6,6,6,6,7,7,7,7,8,8,8],ds:[6,8],tln:[6,6,7,8],
    tl:[{role:'stat',chs:[7,8]},{role:'real',chs:[6]},{role:'alg',chs:[6]}]},
  '9ck2':{...G9,hk:2,short:'Cuối học kì II',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ II',scope:'Chương VI – X (Kết nối tri thức)',chapters:[6,7,8,9,10],
    nlc:[6,6,6,7,7,8,8,9,9,9,10,10],ds:[6,9],tln:[6,8,9,10],
    tl:[{role:'alg',chs:[6]},{role:'real',chs:[6,10]},{role:'geo',chs:[9]}]},
  /* Ôn thi vào lớp 10: cả năm lớp 9; cấu trúc chọn được (mặc định kiểu Khánh Hòa 2026 = khung Công văn 7991) */
  '9tn':{...G9,hk:0,v10:true,short:'Ôn thi vào lớp 10',title:'ĐỀ ÔN THI TUYỂN SINH VÀO LỚP 10',scope:'Cả chương trình Toán 9, Chương I – X (Kết nối tri thức)',chapters:[1,2,3,4,5,6,7,8,9,10],
    nlc:[1,2,3,3,4,5,6,6,7,8,9,10],ds:[6,7],tln:[1,4,6,10],
    tl:[{role:'rad',chs:[3]},{role:'real',chs:[1,2,6]},{role:'geo',chs:[5,9]}],
    /* khung toàn trắc nghiệm 12 + 4 + 6 (Hải Phòng, Lào Cai 2026): Đúng – Sai và trả lời ngắn lấy theo đúng các mạch nội dung của hai đề đó */
    fixed:{'12-0.25-4-6-0.5-0':{ds:[[7,2],[3],[5,9],[6,2]],tln:[[1,2],[6],[7,8],[5,9],[10],[6,3]]},
      /* khung mặc định 12 + 2 + 4 + 3 theo đúng mạch nội dung đề Khánh Hòa 2026 (đối chiếu đề mã 02) */
      /* 12 nhiều lựa chọn + 7 điểm tự luận theo mạch nội dung đề Sơn La 2026 */
      '12-0.25-0-0-0.5-7':{nlc:[1,2,2,3,3,3,4,6,9,9,10,10],tl:[{role:'rad',chs:[3],lv:{co_ban:'TH',chuan:'VD',nang_cao:'VDC'}},{role:'alg',chs:[6]},{role:'real',chs:[1,6],les:[3,21],lv:{co_ban:'TH',chuan:'VD',nang_cao:'VD'}},{role:'stat',chs:[8]},{role:'real',chs:[10]},{role:'geo',chs:[5,9]},{role:'geo',chs:[5,9]}]},
      /* 8 nhiều lựa chọn + 8 điểm tự luận theo mạch nội dung đề Lạng Sơn 2026 */
      '8-0.25-0-0-0.5-8':{nlc:[2,3,6,6,6,4,8,10],tl:[{role:'rad',chs:[3],lv:{co_ban:'TH',chuan:'VD',nang_cao:'VD'}},{role:'alg',chs:[6,1]},{role:'real',chs:[1,6],les:[3,21],lv:{co_ban:'TH',chuan:'VD',nang_cao:'VD'}},{role:'stat',chs:[7,8]},{role:'real',chs:[4]},{role:'real',chs:[10]},{role:'geo',chs:[5,9]},{role:'geo',chs:[5,9]}]},
      '12-0.25-2-4-0.5-3':{nlc:[1,3,4,5,6,6,7,7,8,8,9,9],ds:[7,6],tln:[3,2,10,5],tl:[{role:'alg',chs:[6,1]},{role:'real',chs:[6,1],les:[3,21]},{role:'geo',chs:[5,9]}]}},
    note:'Cấu trúc mặc định giống đề tuyển sinh lớp 10 Khánh Hòa 2026: 12 câu nhiều lựa chọn (3 đ), 2 câu đúng/sai (2 đ), 4 câu trả lời ngắn (2 đ), 3 câu tự luận (3 đ), 120 phút.'},
  '12tn':{grade:12,school:'THPT',mon:'Toán 12',chName:CHTN,tlQ:[],hk:0,tn:true,mix:TN_MIX,short:'Ôn thi tốt nghiệp THPT',title:'ĐỀ ÔN THI TỐT NGHIỆP THPT',
    scope:'Theo cấu trúc và phân bố chủ đề của đề thi tốt nghiệp THPT năm 2025 (cấu trúc giữ nguyên năm 2026): 12 câu nhiều lựa chọn, 4 câu đúng/sai, 6 câu trả lời ngắn; nội dung lớp 12 là chính, có lớp 10 và 11',
    chapters:[101,102,103,104,105,106,107,108,109,110],
    nlc:[101,102,102,103,103,103,104,104,105,107,108,109],ds:[101,102,106,103],tln:[101,110,104,102,106,106],tl:[],
    /* dạng bám sát từng câu đề chính thức 2025, được ưu tiên (khoảng 60%) ở từng vị trí của Phần II và III */
    prefer:{ds:[['ds12-2-seg','ds12-1-cubic'],['tn-ds-decay','tn-ds-solar','tn-ds-pump'],['ds12-19-test','ds12-19-factory'],['tn-ds-flight','tn-ds-motion','tn-ds-drone','tn-ds-guard','tn-ds-tower']],
      tln:[['tn-t-profit2','tn-t-profit'],['tn-t-menu','tn-t-ellipse','tn-t-truck','tn-t-sys3'],['tn-t-pyr','tn-t-room','tn-t-isotet'],['tn-t-stand','tn-t-bowl','tn-t-bead','tn-t-ring'],['tn-t-books','tn-t-shelf'],['tn-t-cipher','tn-t-ap','tn-t-lamp']]},
    note:'Cấu trúc theo đề chính thức năm 2025 và 2026 (giữ nguyên): Phần I 12 câu × 0,25 đ; Phần II 4 câu đúng/sai (mỗi câu tối đa 1 đ); Phần III 6 câu × 0,5 đ, đáp án ghi không quá 4 kí tự.'},
  '10gk1':{...G10,hk:1,short:'Giữa học kì I',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ I',scope:'Chương I – III (Kết nối tri thức)',chapters:[1,2,3],
    nlc:[1,1,1,1,2,2,2,2,3,3,3,3],ds:[1,3],tln:[1,2,3,3],
    tl:[{role:'a',chs:[1]},{role:'b',chs:[2]},{role:'c',chs:[3]}]},
  '10ck1':{...G10,hk:1,short:'Cuối học kì I',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ I',scope:'Chương I – V (Kết nối tri thức)',chapters:[1,2,3,4,5],
    nlc:[1,1,2,2,3,3,4,4,4,4,5,5],ds:[4,5],tln:[2,3,4,5],
    tl:[{role:'a',chs:[3]},{role:'b',chs:[4]},{role:'c',chs:[5]}]},
  '10gk2':{...G10,hk:2,short:'Giữa học kì II',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ II',scope:'Chương VI và Chương VII (Kết nối tri thức)',chapters:[6,7],
    nlc:[6,6,6,6,6,6,7,7,7,7,7,7],ds:[6,7],tln:[6,6,7,7],
    tl:[{role:'a',chs:[6]},{role:'b',chs:[7]},{role:'c',chs:[6]}]},
  '10ck2':{...G10,hk:2,short:'Cuối học kì II',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ II',scope:'Chương VI – IX (Kết nối tri thức)',chapters:[6,7,8,9],
    nlc:[6,6,6,7,7,7,8,8,8,9,9,9],ds:[8,9],tln:[6,7,8,9],
    tl:[{role:'b',chs:[7]},{role:'a',chs:[8]},{role:'c',chs:[9]}]},
  '6gk1':{...G6,hk:1,short:'Giữa học kì I',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ I',scope:'Chương I – II (Kết nối tri thức)',chapters:[1,2],
    nlc:[1,1,1,1,1,1,2,2,2,2,2,2],ds:[1,2],tln:[1,1,2,2],
    tl:[{role:'alg',chs:[1]},{role:'real',chs:[1,2]},{role:'num',chs:[2]}]},
  '6ck1':{...G6,hk:1,short:'Cuối học kì I',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ I',scope:'Chương I – V (Kết nối tri thức)',chapters:[1,2,3,4,5],
    nlc:[1,1,2,2,3,3,3,4,4,4,5,5],ds:[2,3],tln:[1,3,4,4],
    tl:[{role:'alg',chs:[3]},{role:'real',chs:[2,4]},{role:'num',chs:[1,2,3]}]},
  '6gk2':{...G6,hk:2,short:'Giữa học kì II',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ II',scope:'Chương VI – VII (Kết nối tri thức)',chapters:[6,7],
    nlc:[6,6,6,6,6,6,6,7,7,7,7,7],ds:[6,7],tln:[6,6,7,7],
    tl:[{role:'alg',chs:[6]},{role:'real',chs:[6,7]},{role:'num',chs:[6,7]}]},
  '6ck2':{...G6,hk:2,short:'Cuối học kì II',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ II',scope:'Chương VI – IX (Kết nối tri thức)',chapters:[6,7,8,9],
    nlc:[6,6,6,7,7,7,8,8,8,9,9,9],ds:[6,9],tln:[7,8,9,9],
    tl:[{role:'alg',chs:[6,7]},{role:'real',chs:[7,9]},{role:'geo',chs:[8]}]},
  '7gk1':{...G7,hk:1,short:'Giữa học kì I',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ I',scope:'Chương I – III (Kết nối tri thức)',chapters:[1,2,3],
    nlc:[1,1,1,1,2,2,2,2,3,3,3,3],ds:[1,3],tln:[1,1,2,3],
    tl:[{role:'alg',chs:[1,2]},{role:'real',chs:[1,2]},{role:'geo',chs:[3]}]},
  '7ck1':{...G7,hk:1,short:'Cuối học kì I',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ I',scope:'Chương I – V (Kết nối tri thức)',chapters:[1,2,3,4,5],
    nlc:[1,1,2,2,3,3,4,4,4,5,5,5],ds:[1,4],tln:[2,3,4,5],
    tl:[{role:'alg',chs:[1,2]},{role:'real',chs:[1,5]},{role:'geo',chs:[4]}]},
  '7gk2':{...G7,hk:2,short:'Giữa học kì II',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ II',scope:'Chương VI – VII (Kết nối tri thức, tập 2)',chapters:[6,7],
    nlc:[6,6,6,6,6,6,7,7,7,7,7,7],ds:[6,7],tln:[6,6,7,7],
    tl:[{role:'alg',chs:[6,7]},{role:'real',chs:[6,7]},{role:'alg',chs:[7]}]},
  '7ck2':{...G7,hk:2,short:'Cuối học kì II',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ II',scope:'Chương VI – X (Kết nối tri thức, tập 2)',chapters:[6,7,8,9,10],
    nlc:[6,6,7,7,7,8,8,9,9,9,10,10],ds:[7,9],tln:[6,8,9,10],
    tl:[{role:'alg',chs:[6,7]},{role:'real',chs:[6,8,10]},{role:'geo',chs:[9]}]},
  gk1:{...G8,hk:1,short:'Giữa học kì I',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ I',scope:'Chương I – IV (Kết nối tri thức)',chapters:[1,2,3,4],
    nlc:[1,1,1,1,2,2,2,3,3,3,3,4],ds:[2,3],tln:[1,2,3,4],
    tl:[{role:'alg'},{role:'real',chs:[1,3,4]},{role:'geo',chs:[3,4]}]},
  ck1:{...G8,hk:1,short:'Cuối học kì I',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ I',scope:'Chương I – V (Kết nối tri thức)',chapters:[1,2,3,4,5],
    nlc:[1,1,2,2,2,3,3,3,4,4,5,5],ds:[3,5],tln:[2,3,4,5],
    tl:[{role:'alg'},{role:'real',chs:[3,5]},{role:'geo',chs:[3,4]}]},
  gk2:{...G8,hk:2,short:'Giữa học kì II',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ II',scope:'Chương VI – VII (Kết nối tri thức, tập 2)',chapters:[6,7],
    nlc:[6,6,6,6,6,6,7,7,7,7,7,7],ds:[6,7],tln:[6,6,7,7],
    tl:[{role:'alg',chs:[6]},{role:'real',chs:[7]},{role:'alg',chs:[6,7]}]},
  ck2:{...G8,hk:2,short:'Cuối học kì II',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ II',scope:'Chương VI – X (Kết nối tri thức, tập 2)',chapters:[6,7,8,9,10],
    nlc:[6,6,7,7,7,8,8,9,9,9,10,10],ds:[7,9],tln:[6,8,9,10],
    tl:[{role:'alg',chs:[6]},{role:'real',chs:[7,8,9]},{role:'geo',chs:[9,10]}]},
  '11gk1':{...G11,hk:1,short:'Giữa học kì I',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ I',scope:'Chương I, II (đến cấp số cộng), IV (Kết nối tri thức)',chapters:[1,2,4],excl:['csn'],
    nlc:[1,1,1,1,1,2,2,2,4,4,4,4],ds:[1,4],tln:[1,1,2,2],
    tl:[{role:'a',chs:[1]},{role:'b',chs:[2]},{role:'c',chs:[4]}]},
  '11gk2':{...G11,hk:2,short:'Giữa học kì II',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ II',scope:'Chương VI – VII (Kết nối tri thức, tập 2)',chapters:[6,7],excl:['kc','tt'],
    nlc:[6,6,6,6,6,7,7,7,7,7,7,7],ds:[6,7],tln:[6,6,7,7],
    tl:[{role:'a',chs:[6]},{role:'c',chs:[7]},{role:'a',chs:[6]}]},
  '11ck2':{...G11,hk:2,short:'Cuối học kì II',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ II',scope:'Chương VI – IX (Kết nối tri thức, tập 2)',chapters:[6,7,8,9],
    nlc:[6,6,7,7,7,8,8,8,9,9,9,9],ds:[7,9],tln:[6,7,8,9],
    tl:[{role:'a',chs:[6]},{role:'c',chs:[7]},{role:'b',chs:[8,9]}]},
  '12gk1':{...G12,hk:1,short:'Giữa học kì I',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ I',scope:'Chương I và Chương II, bài 6 – 7 (Kết nối tri thức)',chapters:[1,2],excl:['b8'],
    nlc:[1,1,1,1,1,1,1,1,2,2,2,2],ds:[1,2],tln:[1,1,1,2],
    tl:[{role:'a',chs:[1]},{role:'b',chs:[1]},{role:'c',chs:[2]}]},
  '12ck1':{...G12,hk:1,short:'Cuối học kì I',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ I',scope:'Chương I – III (Kết nối tri thức)',chapters:[1,2,3],
    nlc:[1,1,1,1,1,2,2,2,2,3,3,3],ds:[1,2],tln:[1,1,2,3],
    tl:[{role:'a',chs:[1]},{role:'b',chs:[1,3]},{role:'c',chs:[2]}]},
  '12gk2':{...G12,hk:2,short:'Giữa học kì II',title:'ĐỀ KIỂM TRA GIỮA HỌC KÌ II',scope:'Chương IV và Chương V, bài 14 – 15 (Kết nối tri thức)',chapters:[4,5],excl:['v2'],
    nlc:[4,4,4,4,4,4,4,4,5,5,5,5],ds:[4,5],tln:[4,4,5,5],
    tl:[{role:'a',chs:[4]},{role:'b',chs:[4]},{role:'c',chs:[5]}]},
  '12ck2':{...G12,hk:2,short:'Cuối học kì II',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ II',scope:'Chương IV – VI (Kết nối tri thức)',chapters:[4,5,6],
    nlc:[4,4,4,4,4,5,5,5,5,6,6,6],ds:[5,6],tln:[4,4,5,6],
    tl:[{role:'a',chs:[4]},{role:'b',chs:[6]},{role:'c',chs:[5]}]},
  '11ck1':{...G11,hk:1,short:'Cuối học kì I',title:'ĐỀ KIỂM TRA CUỐI HỌC KÌ I',scope:'Chương I – V (Kết nối tri thức)',chapters:[1,2,3,4,5],
    nlc:[1,1,2,2,3,3,4,4,4,5,5,5],ds:[4,5],tln:[1,2,3,5],
    tl:[{role:'a',chs:[1,2]},{role:'b',chs:[5]},{role:'c',chs:[4]}]}
};

/* ===== Cấu trúc đề: khung có sẵn và tuỳ chỉnh =====
   Mỗi câu đúng/sai có 4 ý, tổng 1 đ; mỗi câu tự luận 1 đ (các ý và bước điểm đã gắn trong từng dạng câu). */
Object.values(BLUEPRINT).forEach(b=>{b.pn=PTS.nlc;b.pt=PTS.tln;b.sk=''});
const STRUCTS={
  chuan:{name:'12 nhiều lựa chọn + 2 đúng/sai + 4 trả lời ngắn + 3 tự luận',n1:12,p1:.25,n2:2,n3:4,p3:.5,n4:3},
  tn:{name:'Kiểu thi tốt nghiệp THPT: 12 + 4 đúng/sai + 6 trả lời ngắn',n1:12,p1:.25,n2:4,n3:6,p3:.5,n4:0},
  tn46:{name:'Trắc nghiệm 4 đ + tự luận 6 đ (16 câu + 6 câu)',n1:16,p1:.25,n2:0,n3:0,p3:.5,n4:6},
  tn55:{name:'Trắc nghiệm 5 đ + tự luận 5 đ (20 câu + 5 câu)',n1:20,p1:.25,n2:0,n3:0,p3:.5,n4:5},
  tn37:{name:'Trắc nghiệm 3 đ + tự luận 7 đ (12 câu + 7 câu)',n1:12,p1:.25,n2:0,n3:0,p3:.5,n4:7},
  ct:{name:'20 nhiều lựa chọn (4 đ) + 2 đúng/sai + 4 tự luận',n1:20,p1:.2,n2:2,n3:0,p3:.5,n4:4},
  /* chỉ hiện ở đề ôn thi vào lớp 10 (ui.js): đề toàn nhiều lựa chọn như Tuyên Quang 2026 */
  mc40:{name:'40 câu nhiều lựa chọn',n1:40,p1:.25,n2:0,n3:0,p3:.5,n4:0},
  ls8:{name:'Trắc nghiệm 2 đ + tự luận 8 đ (8 câu + 8 câu)',n1:8,p1:.25,n2:0,n3:0,p3:.5,n4:8}
};
const STRUCT_ORDER=['chuan','tn','tn46','tn55','tn37','ct'];
const structKey=s=>[s.n1,s.p1,s.n2,s.n3,s.p3,s.n4].join('-');
const structTotal=s=>Math.round((s.n1*s.p1+s.n2*4*PTS.dsItem+s.n3*s.p3+s.n4)*1000)/1000;
const DEF_SK=structKey(STRUCTS.chuan);
const fmtP=x=>String(Math.round(x*100)/100).replace('.',',');
function structCheck(s){
  if(![s.n1,s.n2,s.n3,s.n4].every(x=>Number.isInteger(x)&&x>=0))return'Số câu phải là số nguyên không âm.';
  if(s.n1>40||s.n2>8||s.n3>16||s.n4>10)return'Số câu quá lớn (tối đa 40, 8, 16 và 10 câu theo từng phần).';
  if(![.2,.25,.5].includes(s.p1))return'Điểm mỗi câu nhiều lựa chọn chỉ nhận 0,2; 0,25 hoặc 0,5.';
  if(![.25,.5,1].includes(s.p3))return'Điểm mỗi câu trả lời ngắn chỉ nhận 0,25; 0,5 hoặc 1.';
  if(s.n1+s.n2+s.n3+s.n4===0)return'Đề cần có ít nhất một câu.';
  const t=structTotal(s);
  if(Math.abs(t-10)>1e-9)return`Tổng điểm đang là ${fmtP(t)}, cần đúng 10.`;
  return'';
}
function structNote(s){
  const a=[];
  if(s.n1)a.push(`${s.n1} câu nhiều lựa chọn (${fmtP(s.n1*s.p1)} đ)`);
  if(s.n2)a.push(`${s.n2} câu đúng/sai (${fmtP(s.n2)} đ)`);
  if(s.n3)a.push(`${s.n3} câu trả lời ngắn (${fmtP(s.n3*s.p3)} đ)`);
  if(s.n4)a.push(`${s.n4} câu tự luận (${fmtP(s.n4)} đ)`);
  return`Cấu trúc do thầy cô chọn: ${a.join(', ')}. Đây là khung tham khảo, chưa phải khung chính thức của Bộ hay của trường.`;
}
/* Câu mở rộng (t.ext): chỉ dùng khi bật ALLOW_EXT hoặc đang tạo đề mức Nâng cao (CUR_DIFF). */
let ALLOW_EXT=false,CUR_DIFF='chuan';
const extOK=()=>ALLOW_EXT||CUR_DIFF==='nang_cao';
/* Đề ôn thi tốt nghiệp: gom mẫu câu của nhiều lớp, gán mã chủ đề của BLUEPRINT['12tn'] */
const MIX_CACHE={};
/* dạng trả lời ngắn hầu như luôn có đáp án dài quá 4 kí tự: không dùng trong đề ôn thi tốt nghiệp */
const TN_EXCL=new Set(['t12-12-profit','t11-6-compound']);
function mixPool(bp,kind){
  const ck=bp.title+'|'+kind;
  if(!MIX_CACHE[ck]){MIX_CACHE[ck]=[];for(const [top,L] of Object.entries(bp.mix))for(const t of Object.values(T[kind]))if(!TN_EXCL.has(t.id)&&L.some(([g,ch])=>(t.g||8)===g&&t.ch===ch))MIX_CACHE[ck].push({...t,ch:+top})}
  return MIX_CACHE[ck].filter(t=>!t.ext||extOK());
}
const poolOf=(bp,kind)=>bp.mix?mixPool(bp,kind):Object.values(T[kind]).filter(t=>(t.g||8)===bp.grade&&(!t.hk||!bp.hk||t.hk===bp.hk)&&!(bp.excl&&bp.excl.includes(t.sec))&&(!t.ext||extOK()));
/* Chia n câu cho các chương theo tỉ trọng, không vượt số dạng câu khác nhau của chương nếu còn chỗ ở chương khác. */
function apportion(n,w,cap){
  const chs=Object.keys(cap).map(Number).filter(c=>cap[c]>0),out={};
  chs.forEach(c=>out[c]=0);
  if(n<=0)return{out,over:0};
  if(!chs.length)return{out,over:n};
  const W=chs.reduce((a,c)=>a+(w[c]||1),0);
  const ex=chs.map(c=>({c,x:n*(w[c]||1)/W}));
  ex.forEach(e=>{out[e.c]=Math.floor(e.x)});
  let left=n-chs.reduce((a,c)=>a+out[c],0);
  ex.sort((a,b)=>(b.x-Math.floor(b.x))-(a.x-Math.floor(a.x))||a.c-b.c);
  for(let i=0;left>0;i++,left--)out[ex[i%ex.length].c]++;
  for(;;){
    const o=chs.filter(c=>out[c]>cap[c]).sort((a,b)=>(out[b]-cap[b])-(out[a]-cap[a]))[0];
    const r=chs.filter(c=>out[c]<cap[c]).sort((a,b)=>(cap[b]-out[b])-(cap[a]-out[a]))[0];
    if(o==null||r==null)break;out[o]--;out[r]++;
  }
  return{out,over:chs.reduce((a,c)=>a+Math.max(0,out[c]-cap[c]),0)};
}
const KIND_VI={nlc:'câu nhiều lựa chọn',ds:'câu đúng/sai',tln:'câu trả lời ngắn',tl:'câu tự luận'};
const BP_CACHE={};
/* Bản thiết kế đề theo cấu trúc đã chọn. Cấu trúc mặc định trả về đúng bản gốc, nên đề cũ không đổi. */
function bpOf(term,st){
  const base=BLUEPRINT[term],s=st||STRUCTS.chuan,sk=structKey(s);
  const fx=base.fixed&&base.fixed[sk];
  if((sk===DEF_SK&&!fx)||base.tn)return base;
  const ck=term+'|'+sk;if(BP_CACHE[ck])return BP_CACHE[ck];
  const w={};base.nlc.forEach(c=>w[c]=(w[c]||0)+1);
  const warn=[],lists={};
  [['nlc',s.n1],['ds',s.n2],['tln',s.n3]].forEach(([k,n])=>{
    if(fx&&fx[k]&&fx[k].length===n){lists[k]=fx[k];return}
    const pool=poolOf(base,k),cap={};
    base.chapters.forEach(c=>cap[c]=new Set(pool.filter(t=>t.ch===c).map(t=>t.grp)).size);
    const r=apportion(n,w,cap);
    lists[k]=base.chapters.flatMap(c=>Array(r.out[c]||0).fill(c));
    if(lists[k].length!==n)throw new Error('Không có dạng câu '+KIND_VI[k]+' cho phạm vi này');
    if(r.over>0)warn.push(`${r.over} ${KIND_VI[k]} sẽ lặp lại dạng đã dùng trong cùng đề (ngân hàng chưa đủ dạng khác nhau; số liệu vẫn khác)`);
  });
  const sl=base.tl,n4=s.n4;
  const tl=fx&&fx.tl&&fx.tl.length===n4?fx.tl:n4===sl.length?sl:n4===0?[]:n4<sl.length?Array.from({length:n4},(_,i)=>sl[n4===1?0:Math.round(i*(sl.length-1)/(n4-1))]):Array.from({length:n4},(_,i)=>sl[i%sl.length]);
  const dem={};tl.forEach(x=>{const k=x.role+'|'+(x.chs||[]).join(',');(dem[k]=dem[k]||{x,n:0}).n++});
  const tp=poolOf(base,'tl');let tover=0;
  Object.values(dem).forEach(d=>{const g=new Set(tp.filter(t=>t.role===d.x.role&&(!d.x.chs||d.x.chs.includes(t.ch))).map(t=>t.grp)).size;tover+=Math.max(0,d.n-g)});
  if(tover>0)warn.push(`${tover} ${KIND_VI.tl} sẽ lặp lại dạng đã dùng trong cùng đề (ngân hàng chưa đủ dạng khác nhau; số liệu vẫn khác)`);
  return BP_CACHE[ck]={...base,nlc:lists.nlc,ds:lists.ds,tln:lists.tln,tl,tlQ:Array(n4).fill(1),pn:s.p1,pt:s.p3,sk,struct:s,warn,note:sk===DEF_SK&&base.note?base.note:structNote(s)};
}
/* Mức nhận thức theo vị trí khi số câu khác khung gốc: ds, tln giữ tỉ lệ; tl giữ câu cuối là câu khó nhất. */
const lvProp=(a,n)=>a.length===n?a:Array.from({length:n},(_,i)=>a[Math.floor(i*a.length/n)]);
const lvTL=(a,n)=>{
  if(a.length===n||n===0)return n===0?[]:a;
  const rest=a.slice(0,-1);
  return Array.from({length:n-1},(_,i)=>rest[Math.floor(i*rest.length/(n-1))]).concat(a[a.length-1]);
};
/* Hai khối điểm tự luận theo lớp: tổng điểm phần IV */
const tlTotal=bp=>bp.tlQ.reduce((a,b)=>a+b,0);
const LV_RANK={NB:0,TH:1,VD:2,VDC:3};
const LV_NAME={NB:'Nhận biết',TH:'Thông hiểu',VD:'Vận dụng',VDC:'Vận dụng cao'};
/* Ba mức độ khó. Mỗi mức quy định mức nhận thức mong muốn cho từng vị trí câu trong đề.
   Chuẩn ≈ 40/30/30 (Biết/Hiểu/Vận dụng) theo mẫu ma trận kèm Công văn 7991/BGDĐT-GDTrH (17/12/2024). */
const DIFFS={
  co_ban:{name:'Cơ bản',nb:12,ds:{gk1:['TH','NB'],ck1:['TH','NB'],gk2:['NB','TH'],ck2:['TH','NB']},tln:{gk1:['TH','TH','TH','TH'],ck1:['TH','TH','TH','TH'],gk2:['NB','TH','TH','TH'],ck2:['TH','NB','TH','TH']},tl:['TH','VD','VD']},
  chuan:{name:'Chuẩn',nb:10,ds:{gk1:['TH','NB'],ck1:['TH','NB'],gk2:['NB','TH'],ck2:['TH','NB']},tln:{gk1:['VD','VD','NB','TH'],ck1:['VD','VD','TH','NB'],gk2:['NB','VD','TH','VD'],ck2:['VD','NB','VD','TH']},tl:['TH','VD','VDC']},
  nang_cao:{name:'Nâng cao',nb:4,ds:{gk1:['TH','NB'],ck1:['TH','NB'],gk2:['NB','TH'],ck2:['TH','NB']},tln:{gk1:['VD','VD','VD','TH'],ck1:['VD','VD','TH','TH'],gk2:['TH','VD','VD','VD'],ck2:['VD','TH','VD','VD']},tl:['TH','VD','VDC']}
};
/* Độ khó cho lớp 11 (cấu trúc 12 + 3 + 4 + 3 tự luận 0,5 / 0,5 / 1,0). */
const DIFFS11={
  co_ban:{name:'Cơ bản',nb:10,ds:['NB','TH'],tln:['TH','TH','TH','VD'],tl:['TH','TH','VD']},
  chuan:{name:'Chuẩn',nb:12,ds:['NB','TH'],tln:['TH','VD','TH','VD'],tl:['TH','VD','VDC']},
  nang_cao:{name:'Nâng cao',nb:6,ds:['TH','VD'],tln:['VD','VD','VD','VD'],tl:['VD','VD','VDC']}
};
/* Độ khó cho đề ôn thi tốt nghiệp: Phần I nhận biết – thông hiểu, Phần II tăng dần đến vận dụng, Phần III chủ yếu vận dụng (như đề 2025). */
const DIFFS_TN={
  co_ban:{name:'Cơ bản',nb:7,ds:['NB','TH','TH','TH'],tln:['TH','TH','TH','VD','VD','VD'],tl:[]},
  chuan:{name:'Chuẩn',nb:6,ds:['TH','TH','TH','VD'],tln:['TH','VD','VD','VD','VD','VDC'],tl:[]},
  nang_cao:{name:'Nâng cao',nb:4,ds:['TH','VD','VD','VD'],tln:['VD','VD','VD','VD','VDC','VDC'],tl:[]}
};
const dOf=(term,diff)=>{const b=BLUEPRINT[term];if(b.tn)return DIFFS_TN[diff];return b.grade===8?DIFFS[diff]:DIFFS11[diff]};
/* Gán mức cho 12 câu phần I: nb câu nhận biết, còn lại thông hiểu; câu thông hiểu ưu tiên cuối mỗi nhóm chương. */
function nlcLevels(chs,nb){
  const size={},idx=[];
  chs.forEach(c=>size[c]=(size[c]||0)+1);
  const seen={};
  chs.forEach((c,i)=>{seen[c]=(seen[c]||0)+1;idx.push({i,fromEnd:size[c]-seen[c],size:size[c]})});
  const order=[...idx].sort((a,b)=>a.fromEnd-b.fromEnd||b.size-a.size||a.i-b.i);
  const th=new Set(order.slice(0,Math.max(0,chs.length-nb)).map(o=>o.i));
  return chs.map((c,i)=>th.has(i)?'TH':'NB');
}
/* Đổi tên điểm (A,B,C… → chữ khác) cho các câu hình học, để cùng một dạng bài nhìn khác nhau.
   Dịch vòng tròn trên bảng chữ cái điểm, áp dụng đồng nhất cho đề bài, đáp án và lời giải. */
const PT_LETTERS='ABCDEFGHKLMNOPQRS';
const RELABEL_RE=/^(c3-|c4-|ds-rect|ds-rhombus|ds-trap|ds-thales|tln-c3-|tln-c4-|tl-geo-|tl-quad-real|k4-)/;
const PT_LETTERS11='ABCDEFGHKLMNOPQR'; /* lớp 11: giữ nguyên đỉnh chóp S */
const RELABEL_SKIP=new Set(['id','kind','role','unit','title','note','lv','ch']);
function relabelDeep(v,shift,L){
  L=L||PT_LETTERS;const n=L.length;
  const fix=str=>str.replace(/(?<![\p{L}])[A-Z]{1,4}(?![\p{L}])/gu,m=>[...m].map(ch=>{const i=L.indexOf(ch);return i<0?ch:L[(i+shift)%n]}).join(''));
  const walk=(x,key)=>{
    if(typeof x==='string')return RELABEL_SKIP.has(key)?x:fix(x);
    if(Array.isArray(x))return x.map(e=>walk(e,key));
    if(x&&typeof x==='object'){const o={};for(const k in x)o[k]=walk(x[k],k);return o}
    return x;
  };
  return walk(v,'');
}
function buildExam(term,base,diff,st){
  diff=DIFFS[diff]?diff:'chuan';CUR_DIFF=diff;
  const bp=bpOf(term,st),used=new Set(),usedId=new Set(),D=dOf(term,diff),G=bp.grade,S=bp.sk?'|'+bp.sk:'';
  const pickT=(kind,pred,want,pref)=>{
    const all=poolOf(bp,kind).filter(pred);
    if(!all.length)throw new Error('không có mẫu câu cho '+kind);
    if(pref&&pref.length&&!(want==='VDC'&&all.some(t=>t.lv==='VDC'))){const pp=all.filter(t=>pref.includes(t.id)&&!usedId.has(t.id)),rp=new RNG(`pref|${term}|${base}|${diff}|${kind}|${used.size}${S}`);
      if(pp.length&&rp.chance(diff==='co_ban'?.35:.6)){const t=pp[rp.int(0,pp.length-1)];used.add(t.grp);usedId.add(t.id);return t}}
    /* Chọn như cũ (đúng mức, ưu tiên chủ đề chưa dùng). Nếu trúng một dạng đã dùng trong đề thì chọn lại: đúng mức mà chưa dùng dạng, rồi khác mức mà chưa dùng dạng. */
    const w=LV_RANK[want],dist=t=>Math.abs(LV_RANK[t.lv]-w),best=Math.min(...all.map(dist));
    const near=all.filter(t=>dist(t)===best),fresh=near.filter(t=>!used.has(t.grp)),pool=fresh.length?fresh:near;
    const rr=new RNG(`pick|${term}|${base}|${diff}|${kind}|${used.size}${S}`);
    let t=pool[rr.int(0,pool.length-1)];
    if(usedId.has(t.id)){
      let p2=near.filter(x=>!usedId.has(x.id));
      if(!p2.length){const rest=all.filter(x=>!usedId.has(x.id));if(rest.length){const b=Math.min(...rest.map(dist));p2=rest.filter(x=>dist(x)===b)}}
      if(p2.length){const r2=new RNG(`pick2|${term}|${base}|${diff}|${kind}|${used.size}${S}`);t=p2[r2.int(0,p2.length-1)]}
    }
    used.add(t.grp);usedId.add(t.id);return t;
  };
  let seq=0;
  const make=(kind,t)=>{
    const rg=new RNG(`gen|${term}|${base}|${diff}|${kind}|${seq++}|${t.id}${S}`);
    let q=t.gen(rg);
    /* đề ôn thi tốt nghiệp: đáp án trả lời ngắn ghi không quá 4 kí tự (kể cả dấu − và dấu phẩy) */
    if(bp.tn&&kind==='tln')for(let k=0;k<40&&fmt(q.ans).length>4;k++)q=t.gen(new RNG(`gen|${term}|${base}|${diff}|${kind}|${seq}|${t.id}|re${k}${S}`));
    if(RELABEL_RE.test(t.id)){const L=G===11?PT_LETTERS11:PT_LETTERS,sh=rg.int(0,L.length-1);if(sh)q=relabelDeep(q,sh,L)}
    q.id=t.id;q.ch=t.ch;q.lv=t.lv;if(t.role)q.role=t.role;if(t.ext)q.ext=t.ext;if(t.les)q.les=t.les;return q;
  };
  /* Ôn thi vào 10 với phần nhiều lựa chọn dài (từ 16 câu, như đề Tuyên Quang, Bắc Ninh, Đồng Tháp 2026):
     tỉ lệ Biết – Hiểu – Vận dụng khoảng 50–40–10 (Cơ bản), 40–40–20 (Chuẩn), 30–40–30 (Nâng cao);
     câu vận dụng rải đều các chương có dạng vận dụng và xếp cuối phần I như đề thật. */
  const mcVD=bp.v10&&bp.nlc.length>=16,MCV={co_ban:[.5,.1],chuan:[.4,.2],nang_cao:[.3,.3]}[diff]||[.4,.2];
  const nb=mcVD?Math.round(MCV[0]*bp.nlc.length):Math.min(bp.nlc.length,Math.round(D.nb*bp.nlc.length/12)),nl=nlcLevels(bp.nlc,nb);
  if(mcVD){
    const vdG={};poolOf(bp,'nlc').filter(t=>t.lv==='VD').forEach(t=>(vdG[t.ch]=vdG[t.ch]||new Set()).add(t.grp));
    const byCh={};nl.forEach((l,i)=>{const c=bp.nlc[i];if(l==='TH'&&vdG[c])(byCh[c]=byCh[c]||[]).push(i)});
    let left=Math.round(bp.nlc.length*MCV[1]);const take={};
    for(let rd=0;left>0&&rd<10;rd++)for(const c of Object.keys(byCh)){if(left<=0)break;const u=take[c]||0;if(u<byCh[c].length&&u<vdG[c].size){nl[byCh[c][byCh[c].length-1-u]]='VD';take[c]=u+1;left--}}
  }
  const byT=x=>Array.isArray(x)?x:x[term];
  const nlc=bp.nlc.map((ch,i)=>make('nlc',pickT('nlc',t=>t.ch===ch,nl[i])));
  const order=bp.chapters;
  nlc.sort((a,b)=>(mcVD?(a.lv==='VD')-(b.lv==='VD'):0)||order.indexOf(a.ch)-order.indexOf(b.ch)||LV_RANK[a.lv]-LV_RANK[b.lv]);
  const PF=bp.prefer||{};
  /* Ôn thi vào 10 có từ 4 câu Đúng – Sai (Hải Phòng, Lào Cai 2026): các câu này ở mức Hiểu – Vận dụng như đề thật. */
  const dsLv=bp.v10&&bp.ds.length>=4?lvProp({co_ban:['NB','TH','TH','VD'],chuan:['TH','TH','VD','VD'],nang_cao:['TH','VD','VD','VD']}[diff]||['TH','TH','VD','VD'],bp.ds.length):lvProp(byT(D.ds),bp.ds.length);
  const inCh=ch=>t=>Array.isArray(ch)?ch.includes(t.ch):t.ch===ch;
  const ds=bp.ds.map((ch,i)=>make('ds',pickT('ds',inCh(ch),dsLv[i],PF.ds&&PF.ds[i])));
  const tlnLv=bp.v10&&bp.tln.length>=6?lvProp({co_ban:['TH','TH','TH','VD','VD','VD'],chuan:['TH','VD','TH','VD','VD','VD'],nang_cao:['VD','VD','VD','VD','VD','VD']}[diff]||['TH','VD','TH','VD','VD','VD'],bp.tln.length):lvProp(byT(D.tln),bp.tln.length);
  const tln=bp.tln.map((ch,i)=>make('tln',pickT('tln',inCh(ch),tlnLv[i],PF.tln&&PF.tln[i])));
  const tl=bp.tl.map((sl,i)=>make('tl',pickT('tl',t=>t.role===sl.role&&(!sl.chs||sl.chs.includes(t.ch))&&(!sl.les||(t.les||[]).some(l=>sl.les.includes(l))),sl.lv&&sl.lv[diff]||lvTL(byT(D.tl),bp.tl.length)[i])));
  /* Ôn thi vào 10 có từ 4 câu tự luận: gộp hai câu 1 điểm (ưu tiên câu hình) thành một bài hình học
     hoàn chỉnh 3 ý, 2 điểm (core09i.js), giống phần hình trong đề thật. Khung đề trả về theo đề này. */
  let tlOut=tl,bpx=bp;
  if(bp.v10&&tl.length>=4){
    const pool=Object.values(T.tl).filter(t=>t.role==='geo3'&&(!t.ext||extOK())),cand=pool.filter(t=>diff==='nang_cao'||t.lv!=='VDC');
    const g3=make('tl',cand[new RNG(`g3|${term}|${base}|${diff}${S}`).int(0,cand.length-1)]);
    const rm=[];bp.tl.forEach((sl,i)=>{if(sl.role==='geo'&&rm.length<2)rm.push(i)});
    for(let i=bp.tl.length-1;i>=0&&rm.length<2;i--)if(!rm.includes(i)&&bp.tl[i].role!=='rad')rm.push(i);
    const at=Math.min(...rm);
    tlOut=[];const slots=[],tq=[];
    bp.tl.forEach((sl,i)=>{if(i===at){tlOut.push(g3);slots.push({role:'geo3'});tq.push(2)}if(!rm.includes(i)){tlOut.push(tl[i]);slots.push(sl);tq.push(1)}});
    bpx={...bp,tl:slots,tlQ:tq,g3:true};
  }
  return{term,base,diff,grade:G,nlc,ds,tln,tl:tlOut,bp:bpx,sk:bp.sk};
}
/* Hoán vị mã đề: đảo thứ tự câu và đáp án phần I, đảo thứ tự ý phần II. */
function makeVariant(exam,v){
  if(v===0)return{...exam,code:exam.base};
  const r=new RNG(`var|${exam.term}|${exam.base}|${exam.diff}|${v}`);
  const nlc=r.shuffle(exam.nlc).map(q=>{
    if(q.fixed)return{...q};
    const idx=r.shuffle([0,1,2,3]);
    return{...q,opts:idx.map(i=>q.opts[i]),ans:idx.indexOf(q.ans)};
  });
  const ds=exam.ds.map(q=>({...q,items:r.shuffle(q.items)}));
  return{...exam,code:String(+exam.base+v),nlc,ds};
}
/* Ma trận đặc tả: số câu và điểm theo chương, theo mức độ. */
const qPts=q=>q.parts.reduce((a,p)=>a+p.pts,0);
function matrixOf(exam){
  const bp=exam.bp||BLUEPRINT[exam.term],rows={};
  bp.chapters.forEach(c=>rows[c]={nlc:0,ds:0,tln:0,tl:0,pts:0});
  const lv={NB:0,TH:0,VD:0,VDC:0};
  exam.nlc.forEach(q=>{rows[q.ch].nlc++;rows[q.ch].pts+=bp.pn;lv[q.lv]++});
  exam.ds.forEach(q=>{rows[q.ch].ds+=4;rows[q.ch].pts+=4*PTS.dsItem;lv[q.lv]+=4});
  exam.tln.forEach(q=>{rows[q.ch].tln++;rows[q.ch].pts+=bp.pt;lv[q.lv]++});
  exam.tl.forEach(q=>{rows[q.ch].tl++;rows[q.ch].pts+=qPts(q);lv[q.lv]++});
  return{rows,lv,pt:lvPts(exam)};
}
function lvPts(exam){
  const o={NB:0,TH:0,VD:0,VDC:0};
  const bp=exam.bp||BLUEPRINT[exam.term];
  exam.nlc.forEach(q=>o[q.lv]+=bp.pn);exam.ds.forEach(q=>o[q.lv]+=4*PTS.dsItem);
  exam.tln.forEach(q=>o[q.lv]+=bp.pt);exam.tl.forEach(q=>o[q.lv]+=qPts(q));
  return o;
}
/* ---- Tránh trùng câu với các đề đã tạo trước ---- */
const qText=q=>String(
  q.kind==='tl'?q.parts.map(p=>p.html).join('|')
  :(q.stem||'')+(q.opts?'#'+q.opts.slice().sort().join('#'):'')+(q.items?'#'+q.items.map(i=>i.t).sort().join('#'):'')
).replace(/<[^>]+>/g,'');
/* Dấu vân tay của đề: mỗi câu = mã dạng + mã băm nội dung (số liệu cụ thể). */
function examFP(ex){
  return [...ex.nlc,...ex.ds,...ex.tln,...ex.tl].map(q=>q.id+'|'+hashStr(qText(q)).toString(36));
}
/* Đếm số câu trùng nguyên văn / cùng dạng với các đề trong lịch sử (hist: mới nhất trước). */
function overlapOf(ex,hist){
  const fp=examFP(ex),exact=new Set(),kind=new Set();
  hist.forEach(h=>{const set=new Set(h.fp),ids=new Set(h.fp.map(x=>x.split('|')[0]));
    fp.forEach(x=>{if(set.has(x))exact.add(x);if(ids.has(x.split('|')[0]))kind.add(x)})});
  return{n:fp.length,exact:exact.size,kind:kind.size};
}
/* Điểm trùng: trùng nguyên văn bị phạt nặng; cùng dạng bị phạt nhẹ, đề càng mới phạt càng nặng. */
function overlapScore(ex,hist){
  const fp=examFP(ex);let sc=0;
  hist.forEach((h,i)=>{
    const set=new Set(h.fp),ids=new Set(h.fp.map(x=>x.split('|')[0])),w=Math.max(.25,1-i*.04);
    fp.forEach(x=>{if(set.has(x))sc+=12;else if(ids.has(x.split('|')[0]))sc+=w});
  });
  return sc;
}
/* Chọn mã đề (100–979) ít trùng nhất với lịch sử; mã vẫn tái tạo được đúng đề đó. */
const histKey=ex=>ex.term+(ex.sk?'~'+ex.sk:'');
function pickFreshCode(term,diff,hist,tries,rnd,st){
  tries=tries||150;rnd=rnd||Math.random;
  const sk=bpOf(term,st).sk,hk=term+(sk?'~'+sk:'');
  const usedCodes=new Set(hist.filter(h=>h.t===hk&&h.d===diff).map(h=>h.c));
  const H=hist.filter(h=>h.t===hk);
  let best=null;
  for(let i=0;i<tries;i++){
    const c=String(100+Math.floor(rnd()*880));
    if(usedCodes.has(c))continue;
    const ex=buildExam(term,c,diff,st),sc=overlapScore(ex,H);
    if(!best||sc<best.sc){best={c,sc,ex};if(sc===0)break}
  }
  return best;
}
/*CORE-END*/
