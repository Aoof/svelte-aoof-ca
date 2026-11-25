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
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://aoof.ca${url === '/' ? '/' : url}`
      );
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        'href',
        `https://aoof.ca${route === '/' ? '/' : route}`
      );
      await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
        'href',
        `https://aoof.ca${route === '/' ? '/fr' : `/fr${route}`}`
      );
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

for (const [prefix, labels] of [
  ['', ['Web Developer', 'Game Developer', 'QA Tester', 'Software Developer']],
  ['/fr', ['Développeur Web', 'Développeur de Jeux', 'Testeur AQ', 'Développeur Logiciel']]
] as const) {
  test(`role chooser uses concise labels ${prefix || 'en'}`, async ({ page }) => {
    await page.goto(`${prefix}/`);
    await expect(page.locator('.tiles .name')).toHaveText(labels);
  });
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
  await expect(page.locator('.card .role')).toHaveText('Web Developer');
  await expect(card).toHaveAttribute('aria-pressed', 'false');
  await card.click();
  await expect(card).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.card .qr svg')).toHaveCount(1);
});

test('work page uses its SEO summary', async ({ page }) => {
  const settings = JSON.parse(readFileSync(path.join('content', 'settings.json'), 'utf8'));
  await page.goto('/work');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', settings.ui.seo.work);
});

test('hire breadcrumb structured data uses real page URLs', async ({ page }) => {
  for (const [path, home, hire] of [
    ['/hire/web', 'Home', 'Hire a Web Developer'],
    ['/fr/hire/web', 'Accueil', 'Embaucher un Développeur Web']
  ] as const) {
    await page.goto(path);
    const breadcrumb = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent ?? ''))
        .find((schema) => schema['@type'] === 'BreadcrumbList')
    );
    expect(breadcrumb.itemListElement.map((item: { item: string }) => item.item)).toEqual([
      `https://aoof.ca${path.startsWith('/fr') ? '/fr' : '/'}`,
      `https://aoof.ca${path}`
    ]);
    expect(breadcrumb.itemListElement.map((item: { name: string }) => item.name)).toEqual([home, hire]);
  }
});

test('event structured data does not invent day-level dates from month-only content', async ({ page }) => {
  await page.goto('/events');
  const events = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts
      .map((script) => JSON.parse(script.textContent ?? ''))
      .filter((schema) => schema['@type'] === 'Event')
  );
  expect(events.length).toBeGreaterThan(0);
  for (const event of events) {
    expect(event.startDate).toBeUndefined();
    expect(event.description).not.toMatch(/<[^>]*>/);
  }
});

test('project structured data does not claim unknown day-level dates', async ({ page }) => {
  await page.goto('/work/holdemup');
  const work = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts
      .map((script) => JSON.parse(script.textContent ?? ''))
      .find((schema) => schema['@type'] === 'CreativeWork')
  );
  expect(work.datePublished).toBeUndefined();
  expect(work.dateModified).toBeUndefined();
});

test('save contact downloads a vCard', async ({ request }) => {
  const response = await request.get('/card/web.vcf');
  expect(response.status()).toBe(200);
  const card = await response.text();
  expect(card).toContain('BEGIN:VCARD');
  expect(card).toContain('TITLE:Web Developer');
});

test('robots and sitemap expose the public localized pages', async ({ request }) => {
  const [robots, sitemap] = await Promise.all([request.get('/robots.txt'), request.get('/sitemap.xml')]);
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: https://aoof.ca/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain('<loc>https://aoof.ca/</loc>');
  expect(xml).toContain('<loc>https://aoof.ca/fr</loc>');
  expect(xml).toContain('<loc>https://aoof.ca/hire/web</loc>');
  expect(xml).toContain('hreflang="fr" href="https://aoof.ca/fr/hire/web"');
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

for (const route of ['/', ...tracks.map((slug) => `/hire/${slug}`)]) {
  for (const width of [320, 360, 768, 1024, 1440, 1920]) {
    test(`stickers do not cover text on ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const hits = await page.evaluate(() => {
        const boxes = [...document.querySelectorAll('.sticker')].map((el) => el.getBoundingClientRect());
        const text = [...document.querySelectorAll('main h1, main h2, main h3, main p, main a, main button')]
          .filter((el) => !el.closest('.pieces'))
          .map((el) => ({ name: el.textContent?.trim().slice(0, 20), box: el.getBoundingClientRect() }))
          .filter(({ box }) => box.width > 0 && box.height > 0);
        const out: string[] = [];
        for (const a of boxes)
          for (const { name, box: b } of text)
            if (a.left < b.right - 2 && a.right > b.left + 2 && a.top < b.bottom - 2 && a.bottom > b.top + 2) out.push(String(name));
        return out;
      });
      expect(hits).toEqual([]);
    });
  }
}

test('work page filters by track on the client', async ({ page }) => {
  await page.goto('/work');
  const all = await page.locator('ul.list > li').count();
  await page.goto('/work?track=qa');
  const filter = page.locator('.filters a[aria-current="true"]');
  await expect(filter).toHaveCount(1);
  await expect(filter).not.toHaveText(/^\s*all\s*$/i);
  const qa = await page.locator('ul.list > li').count();
  expect(qa).toBeGreaterThan(0);
  expect(qa).toBeLessThan(all);
});

test('media files have clean slug names and content only points at files that exist', () => {
  const slug = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  const files = readdirSync(path.join('static', 'media'), { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
  for (const file of files) {
    const { name } = path.parse(file);
    expect(slug.test(name), `${file} is not a slug name`).toBe(true);
  }

  for (const folder of ['projects', 'events']) {
    for (const slugName of slugs(folder)) {
      const entry = JSON.parse(readFileSync(path.join('content', folder, `${slugName}.json`), 'utf8'));
      for (const lang of ['en', 'fr']) {
        const image: string | undefined = entry[lang].image;
        if (!image) continue;
        expect(files, `${folder}/${slugName} ${lang} image`).toContain(image.replace('/media/', ''));
      }
    }
  }
});

test('events page lists every event, even two with the same name', async ({ page }) => {
  await page.goto('/events');
  await expect(page.locator('h1').first()).toBeVisible();
  const expected = slugs('events').length;
  await expect(page.locator('main li')).toHaveCount(expected);
});
