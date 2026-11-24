/* Lấy số liệu từ GoatCounter API và ghi ra stats.json cho trang thongke.html.
   Chạy: GOATCOUNTER_KEY=... GOATCOUNTER_SITE=xuongdetoan1 node tools/fetch-stats.mjs out/stats.json
   Khóa API chỉ cần quyền "Read statistics"; không bao giờ ghi khóa vào file. */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const KEY = process.env.GOATCOUNTER_KEY;
const SITE = process.env.GOATCOUNTER_SITE || 'xuongdetoan1';
const OUT = process.argv[2] || 'stats.json';
const SINCE = '2026-11-24';                     // ngày bắt đầu đếm
if (!KEY) { console.error('Thiếu GOATCOUNTER_KEY'); process.exit(1); }

const BASE = `https://${SITE}.goatcounter.com/api/v0`;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(path, params = {}) {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) (Array.isArray(v) ? v : [v]).forEach(x => u.append(k, x));
  const q = u.toString();
  for (let i = 0; i < 4; i++) {
    const r = await fetch(`${BASE}${path}${q ? '?' + q : ''}`, {
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' } });
    if (r.status === 429) { await sleep(1500 * (i + 1)); continue; }
    if (!r.ok) throw new Error(`${path}: HTTP ${r.status} ${await r.text()}`);
    await sleep(300);                            // giới hạn 4 yêu cầu/giây
    return r.json();
  }
  throw new Error(`${path}: quá giới hạn yêu cầu`);
}
/* Ngày theo giờ Việt Nam (UTC+7) */
const vnDay = (d = new Date()) => new Date(d.getTime() + 7 * 3600e3).toISOString().slice(0, 10);
const addDays = (s, n) => { const d = new Date(s + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

const today = vnDay();
const from30 = addDays(today, -29) < SINCE ? SINCE : addDays(today, -29);
const rng = (start, end = today) => ({ start: start + 'T00:00:00+07:00', end: end + 'T23:59:59+07:00' });

const tot30 = await api('/stats/total', rng(addDays(today, -29)));
const totAll = await api('/stats/total', rng(SINCE));
const days = [];
for (let d = addDays(today, -29); d <= today; d = addDays(d, 1)) {
  const s = (tot30.stats || []).find(x => x.day === d);
  if (d >= SINCE) days.push({ day: d, n: s ? s.daily : 0 });
}
const sumFrom = from => days.filter(x => x.day >= from).reduce((a, x) => a + x.n, 0);

/* Trang và sự kiện (In đề, Word…) trong toàn bộ thời gian */
const hits = [];
let more = true, guard = 0, exclude = [];
while (more && guard++ < 10) {
  const r = await api('/stats/hits', { ...rng(SINCE), limit: 100, ...(exclude.length ? { exclude_paths: exclude } : {}) });
  for (const h of r.hits || []) { hits.push({ path: h.path, title: h.title, event: !!h.event, n: h.count }); exclude.push(h.path_id); }
  more = r.more;
}
const top = async (page, limit = 12) => ((await api('/stats/' + page, { ...rng(SINCE), limit })).stats || [])
  .map(s => ({ name: s.name || '(không rõ)', n: s.count }));

const out = {
  site: SITE, since: SINCE, updated: new Date().toISOString(),
  today: sumFrom(today), d7: sumFrom(addDays(today, -6)), d30: sumFrom(from30),
  all: totAll.total ?? 0, events: totAll.total_events ?? 0,
  days,
  pages: hits.filter(h => !h.event).slice(0, 20),
  actions: hits.filter(h => h.event),
  refs: await top('toprefs'),
  browsers: await top('browsers', 8),
  systems: await top('systems', 8),
  sizes: await top('sizes', 6),
  locations: await top('locations', 12),
};
mkdirSync(dirname(OUT) || '.', { recursive: true });
writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log('Đã ghi', OUT, '— lượt xem:', out.all, '· sự kiện:', out.events, '· đường dẫn:', hits.length);
