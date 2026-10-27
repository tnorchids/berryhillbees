import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { pageMetadata } from '../src/data/pageMetadata.js';

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
  const html = template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escape(metadata.title)}</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(metadata.description)}" />`
    );
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);
}
console.log(
  `Generated metadata for ${Object.keys(pageMetadata).length} pages.`
);
