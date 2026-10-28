import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { pageMetadata } from '../src/data/pageMetadata.js';
import { site, canonicalUrl, siteStructuredData } from '../src/data/site.js';

// Give crawlers and link previews page-specific metadata before JavaScript runs.
// These HTML entry points share the same Vite-built application and assets.
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const escape = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

for (const [path, metadata] of Object.entries(pageMetadata)) {
  const directory = resolve(dist, path.slice(1));
  let html = template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escape(metadata.title)}</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(metadata.description)}" />`
    );
  if (metadata.noindex)
    html = html.replace(
      '</head>',
      '<meta name="robots" content="noindex" /></head>'
    );
  const canonical = `<link rel="canonical" href="${escape(canonicalUrl(path))}" />`;
  const structuredData =
    path === '/'
      ? `<script type="application/ld+json" id="site-structured-data">${JSON.stringify(siteStructuredData).replaceAll('<', '\\u003c')}</script>`
      : '';
  html = html.replace('</head>', `${canonical}${structuredData}</head>`);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.entries(
  pageMetadata
)
  .filter(([, metadata]) => !metadata.noindex)
  .map(([path]) => `  <url><loc>${escape(canonicalUrl(path))}</loc></url>`)
  .join('\n')}\n</urlset>\n`;
await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
await writeFile(
  resolve(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
);
console.log(
  `Generated metadata for ${Object.keys(pageMetadata).length} pages.`
);
