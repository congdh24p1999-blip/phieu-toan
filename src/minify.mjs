/* Nén mã JavaScript của trang khi xuất bản: bỏ chú thích, khoảng trắng, đổi tên biến cục bộ.
   Tên hàm, hằng ở cấp ngoài cùng giữ nguyên (các bộ kiểm tra gọi chúng). Bản dễ đọc vẫn ở src/. */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let esbuild;
for (const p of ['esbuild', '/opt/npm-tools/node_modules/esbuild']) { try { esbuild = require(p); break; } catch {} }
if (!esbuild) { console.error('Không tìm thấy esbuild – giữ nguyên bản chưa nén'); process.exit(0); }
const f = process.argv[2], html = readFileSync(f, 'utf8');
const m = html.match(/<script>\n([\s\S]*)<\/script>/);
const out = esbuild.transformSync(m[1], { minify: true, legalComments: 'none', charset: 'utf8', target: 'es2020',
  banner: '/*! © 2026 Xưởng đề Toán – bảo lưu mọi quyền. Không sao chép, phát hành lại khi chưa được đồng ý. */' });
writeFileSync(f, html.replace(m[0], '<script>\n' + out.code + '</script>'));
console.log('nén JS:', m[1].length, '→', out.code.length, 'kí tự');
