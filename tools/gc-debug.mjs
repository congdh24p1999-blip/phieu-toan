/* Chẩn đoán API GoatCounter (không in khóa) */
const KEY=process.env.GOATCOUNTER_KEY,SITE=process.env.GOATCOUNTER_SITE||'xuongdetoan1',B=`https://${SITE}.goatcounter.com/api/v0`;
const urls=['/me','/sites','/stats/total','/stats/total?start=2026-11-24&end=2026-11-25','/stats/total?start=2026-11-24T00:00:00Z&end=2026-11-25T23:59:59Z','/stats/hits?limit=3','/stats/hits?start=2026-11-24&end=2026-11-25&limit=3','/stats/toprefs?limit=3','/stats/sizes?limit=3'];
for(const u of urls){const r=await fetch(B+u,{headers:{Authorization:`Bearer ${KEY}`,'Content-Type':'application/json'}});console.log(u,'→',r.status,(await r.text()).slice(0,300).replace(/\s+/g,' '));await new Promise(s=>setTimeout(s,400))}
