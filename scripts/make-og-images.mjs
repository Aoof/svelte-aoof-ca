// Renders the share images (1200 x 630) with the site's own font. Run from the repo root.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const font = path.join(root, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2').replace(/\\/g, '/');
const out = path.join(root, 'static/og');
fs.mkdirSync(out, { recursive: true });

const icons = {
  coffee: `<path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" fill="#ffc933"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8 3v3M12 3v3"/>`,
  hat: `<ellipse cx="12" cy="16" rx="10.5" ry="3.5" fill="#ffc933"/><path d="M6 15c0-6 3-9.5 6-9.5s6 3.5 6 9.5" fill="#ffc933"/><path d="M6.5 12.5c3.5 1.2 7.5 1.2 11 0" stroke="#ff4d79" stroke-width="2.6"/>`,
  cat: `<path d="M4 4l4 3h8l4-3v10a8 8 0 0 1-16 0z" fill="#ffc933"/><circle cx="9" cy="13" r="1" fill="#111"/><circle cx="15" cy="13" r="1" fill="#111"/><path d="M11 16l1 1 1-1M7 17H3M17 17h4"/>`,
  code: `<rect x="2" y="3.5" width="20" height="17" rx="3" fill="#2ee59d"/><path d="M8.5 8.5L5 12l3.5 3.5M15.5 8.5L19 12l-3.5 3.5M13.5 7l-3 10"/>`
};

const tracks = {
  default: { accent: '#ff4d79', icon: 'coffee', pills: [['Web', '#5b7cff'], ['Game', '#b57bff'], ['QA', '#2ee59d'], ['Software', '#ffc933']] },
  web: { accent: '#5b7cff', icon: 'coffee', pills: [['Web developer', '#5b7cff']] },
  game: { accent: '#b57bff', icon: 'hat', pills: [['Game developer', '#b57bff']] },
  qa: { accent: '#2ee59d', icon: 'cat', pills: [['QA tester', '#2ee59d']] },
  software: { accent: '#ffc933', icon: 'code', pills: [['Software developer', '#ffc933']] }
};

const html = (t, solo) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Archivo; src: url("file:///${font}") format("woff2"); font-weight: 100 900; font-stretch: 62% 125%; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; font-family: Archivo, sans-serif; color: #111;
  background-color: #f1eeff; background-image: radial-gradient(#11111133 2px, transparent 2.2px); background-size: 26px 26px; overflow: hidden; }
.panel { position: absolute; left: 60px; top: 56px; width: 1070px; height: 500px; border: 7px solid #111; border-radius: 28px;
  background: ${solo ? t.accent : '#fff'}; box-shadow: 16px 16px 0 #111; padding: 52px 64px; }
h1 { font-stretch: 125%; font-weight: 900; font-size: ${solo ? 84 : 84}px; line-height: 0.95; letter-spacing: -2px; }
.pills { position: absolute; left: 64px; bottom: 128px; display: flex; gap: 16px; }
.pill { border: 5px solid #111; border-radius: 16px; padding: 10px 26px; font-stretch: 112%; font-weight: 800; font-size: 40px; box-shadow: 6px 6px 0 #111; }
.brand { position: absolute; left: 64px; bottom: 44px; border: 5px solid #111; border-radius: 14px; background: #ff4d79; padding: 4px 20px;
  font-stretch: 125%; font-weight: 900; font-size: 38px; box-shadow: 5px 5px 0 #111; rotate: -2deg; }
.where { position: absolute; left: 350px; bottom: 54px; font-stretch: 75%; font-weight: 600; font-size: 32px; }
.sticker { position: absolute; right: 60px; top: 56px; width: 170px; height: 170px; border: 7px solid #111; border-radius: 26px;
  background: ${solo ? '#fff' : t.accent}; box-shadow: 10px 10px 0 #111; rotate: 8deg; display: grid; place-items: center; }
svg { width: 120px; height: 120px; fill: none; stroke: #111; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
</style></head><body>
<div class="panel">
  <h1>Abdulrahman<br>Mousa</h1>
  <div class="pills">${t.pills.map(([n, c]) => `<span class="pill" style="background:${solo ? '#fff' : c}">${n}</span>`).join('')}</div>
  <span class="brand">aoof.ca</span><span class="where">Montréal, QC</span>
  <div class="sticker"><svg viewBox="0 0 24 24">${icons[t.icon]}</svg></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
const tmp = path.join(root, 'static/og/_tmp.html');
for (const [name, t] of Object.entries(tracks)) {
  fs.writeFileSync(tmp, html(t, name !== 'default'));
  await page.goto('file:///' + tmp.replace(/\\/g, '/'));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, `${name}.png`) });
}
fs.rmSync(tmp);
await browser.close();
console.log('og images written');
