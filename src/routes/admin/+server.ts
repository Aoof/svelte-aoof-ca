import type { RequestHandler } from './$types';

const adminHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>aoof.ca CMS</title>
  </head>
  <body>
    <script src="https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js"></script>
  </body>
</html>`;

export const GET: RequestHandler = () => new Response(adminHtml, {
  headers: {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store'
  }
});