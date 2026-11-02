import { expect, test } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const slugs = (folder: string) =>
  readdirSync(path.join('content', folder))
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''));

const tracks = slugs('tracks');
const projects = slugs('projects');

const paths = [
  '/',
  '/work',
  '/experience',
  '/events',
  '/contact',
  '/footnotes',
  ...tracks.map((slug) => `/hire/${slug}`),
  ...projects.map((slug) => `/work/${slug}`)
];

const widths = [360, 768, 1440];

for (const prefix of ['', '/fr']) {
  for (const route of paths) {
    const url = prefix + route === '/fr/' ? '/fr' : prefix + route;

    test(`${url} renders`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('lang', prefix ? 'fr' : 'en');
    });

    for (const width of widths) {
      test(`${url} has no sideways scroll at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(url);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  }
}

test('each track resume link resolves', async ({ request }) => {
  for (const lang of ['en', 'fr'] as const) {
    for (const slug of tracks) {
      const entry = JSON.parse(readFileSync(path.join('content', 'tracks', `${slug}.json`), 'utf8'))[lang];
      const response = await request.get(entry.resume);
      expect(response.status(), `${slug} ${lang} resume`).toBe(200);
    }
  }
});

test('old URLs redirect', async ({ request }) => {
  const about = await request.get('/about', { maxRedirects: 0 });
  expect(about.status()).toBe(301);
  expect(about.headers().location).toContain('/experience');
  const old = await request.get('/fr/projects', { maxRedirects: 0 });
  expect(old.status()).toBe(301);
  expect(old.headers().location).toContain('/fr/work');
});

test('the business card flips and has a QR code', async ({ page }) => {
  await page.goto('/hire/web');
  const card = page.locator('button.card');
  await expect(card).toHaveAttribute('aria-pressed', 'false');
  await card.click();
  await expect(card).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.card .qr svg')).toHaveCount(1);
});

test('save contact downloads a vCard', async ({ request }) => {
  const response = await request.get('/card/web.vcf');
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain('BEGIN:VCARD');
});

for (const [prefix, lang, button] of [['', 'en', 'Résumé'], ['/fr', 'fr', 'CV']] as const) {
  test(`the résumé button asks which résumé, in ${lang}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${prefix}/`);
    await page.locator('header').getByRole('button', { name: button, exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const links = dialog.getByRole('link');
    await expect(links).toHaveCount(4);
    for (const href of await links.evaluateAll((els) => els.map((el) => el.getAttribute('href')))) {
      expect(href).toMatch(new RegExp(`-${lang}\.pdf$`));
    }
    await dialog.getByRole('button', { name: lang === 'en' ? 'Français' : 'English' }).click();
    const other = lang === 'en' ? 'fr' : 'en';
    expect(await links.first().getAttribute('href')).toMatch(new RegExp(`-${other}\.pdf$`));
  });
}
