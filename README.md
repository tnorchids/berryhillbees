# Berry Hill Bees — React + Tailwind

A site using React, Vite, and Tailwind CSS v4. Home (`/`), Products
(`/products`), Where to Buy (`/wheretobuy`), and About (`/about`) reuse content from beta and legacy,
with the original logo, Mate font, and optimized photographs.
Navigation uses standard links. Additional pages can be added in `src/pages/`
and registered in `src/App.jsx`.

Legacy hash bookmarks such as `/#/about` automatically redirect to `/about`
before React renders. The old `/#/purchase` route maps to `/buyonline`. Query
parameters and section anchors are preserved; normal anchors are unaffected.
The redirect replaces browser history so Back doesn't loop through the old URL.
Fragments aren't sent to the server, so this compatibility step runs in the
browser. Old routes without a replacement page still reach the not-found view.

Page titles and search descriptions live in `src/data/pageMetadata.js`. Add an
entry there when adding a route. `PageMetadata` updates browser metadata and
marks unknown routes `noindex`. The build also generates an HTML entry point for
each known route so metadata is available without JavaScript. Page content is
still rendered by React; this is not full server-side rendering. Vite development
uses the browser metadata, while production output includes the static tags.

SEO build output includes canonical links, `sitemap.xml` with all eight public
pages, and `robots.txt` pointing to the sitemap. The thank-you page is excluded
from the sitemap but remains crawlable so its `noindex` directive can be read.
Homepage JSON-LD identifies the Organization and WebSite, with the established
Facebook profile. `src/data/site.js` defines the production domain and identity.
No storefront address, opening hours, reviews, or other unverified details are
published in structured data. Future deployment to a different canonical domain
requires updating that file.

After launch, verify the domain in Google Search Console, submit
`https://berryhillbees.com/sitemap.xml`, and inspect the homepage and important
pages to confirm Google can render them. Staging/preview deployments should be
access-protected or configured `noindex` separately; a production canonical alone
does not keep a preview out of search. Sitelinks are selected automatically by
Google, not enabled by a markup switch. These changes support discovery and site
identity but do not guarantee a particular search appearance or ranking.

Updates (`/updates`) are maintained in `src/data/updates.js`. The homepage shows
the latest visible post; the navigation and recent posts show a New badge for
30 calendar days after `publishedOn`. The two initial posts are the active
September 14 and August 16, 2026 announcements from legacy, with original dates.

To add a post, give it a unique `id`, `title`, `text`, and `publishedOn` date in
`YYYY-MM-DD` format. Set `showFrom` to its first visible day and `showUntil` to its
last visible day, or `null` to keep it indefinitely. If `showFrom` is omitted,
publication day is used. A post never appears before its publication day.
Optional `link: { label, href }` adds a call to action without embedding HTML.
Keep dates valid and the end on or after the start. Posts sort newest first.

Scheduling and New badges use Knoxville's `America/New_York` calendar, evaluated
in the visitor's browser on load, on window focus, and once per minute. Existing
scheduled entries don't need a redeploy when their dates arrive; adding/editing
entries does. These dates control display only, so future text is still present
in the public JavaScript bundle. They are not a way to keep announcements secret.
Expired posts are hidden rather than archived. With no visible posts, the homepage
preview disappears and the Updates page shows an empty message.

Run `npm test` for update scheduling and Worker handler checks.

The About page restores the origin story and both family photographs from
`bhb-legacy/src/components/about/about.jsx` and `bhb-legacy/images/about/`;
the beta About page contained placeholder text only.

Our Bees (`/bees`) combines the legacy and beta copy with all four legacy
photographs, including the bees watching between the frames. The original spring apiary video uses a responsive,
lazy-loaded YouTube embed without an additional React video library.

Contact (`/contact`) includes an email form, Facebook link, and the legacy note
about no storefront or apiary tours. The form posts to `/api/contact`; the
Cloudflare Worker sends mail with the visitor's address as Reply-To. It validates
input, limits request size, checks origin, filters a honeypot, and limits each IP
to three attempts per minute. Failed sends retain the visitor's input.

### Cloudflare contact setup

Confirmed host: Cloudflare Pages at `dev.berryhillbees.com`. Use the dedicated
contact Worker instructions in [CONTACT-SETUP.md](CONTACT-SETUP.md) for this
deployment, with `worker/wrangler.contact.jsonc`. The whole-site Worker approach
below is an alternative, not the configuration to deploy over the Pages site.

`wrangler.jsonc` provides a Workers + Static Assets deployment, including SPA
routing and the email/rate-limit bindings. This is a Worker deployment, not a
Pages-only upload. If the existing site uses Pages, the contact API must instead
be routed to this Worker or adapted to that deployment before enabling the form.

1. Enable Cloudflare Email Service / Email Routing for your domain and verify
   your receiving mailbox. Configure a sender on that domain as Cloudflare requires.
2. Set Worker secrets `CONTACT_TO` (receiving mailbox) and `CONTACT_FROM`
   (authorized sender address). Do not use `VITE_` variables for these.
3. Build with `npm run build`, then deploy this folder using Wrangler. No deployment
   or Cloudflare account changes have been made by this project edit.
4. Send a real test message after deployment and confirm receipt and reply behavior.

Vite alone does not run the Worker. Use Wrangler local development to exercise
`/api/contact` with Cloudflare bindings; local tests use mocked delivery and do
not prove email receipt. Run handler tests with `node --test worker/contact.test.js`.

The contact receiving address is absent from browser code. The separate legacy
PayPal merchant email remains in `src/data/shop.js` because PayPal forms require
a merchant identifier. Replace it with the merchant's PayPal account ID if that
address must also be hidden; never guess the ID.

Buy Online (`/buyonline`) uses native PayPal cart forms. Edit
`src/data/shop.js` for product copy, images, prices, stock, shipping weights,
and the PayPal merchant account. The initial catalog preserves the three visible
legacy products and their availability: $11 flip-top honey, $14 Muth jar honey,
and sold-out $2 lip balm. Hidden legacy products remain omitted.
PayPal purchase names and shipping weight values are preserved from legacy;
weights are checkout configuration, not the displayed net product weight.
Confirm catalog values and merchant shipping settings before publishing.
Checkout requires the merchant's live PayPal configuration; a local build does
not verify payments or shipping charges.

The PayPal return page is `/buyonline/thankyou`, matching the legacy route
(including `/#/buyonline/thankyou` via bookmark compatibility). It is omitted
from navigation and marked `noindex`. Cart forms set this as their return URL,
use GET without payment variables (`rm=1`), and return cancellations to the shop.
The origin comes from the deployed site; test checkout on the intended domain.
The page is a thank-you and next-steps message, not payment verification.
PayPal receipt/account status remains authoritative. Confirm the merchant's
Auto Return settings and complete a checkout test before publishing.

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

Code quality commands:

```sh
npm run lint
npm run format
npm run format:check
```

ESLint checks JavaScript, JSX, React Hooks, and the Cloudflare Worker with the
appropriate environment globals. Prettier handles formatting with single quotes
in JavaScript and JSX and no trailing commas. JSON retains its required double
quotes. Generated output and local secrets are excluded from formatting.

Photo assets are high-quality WebP variants in `src/assets/photos/`. All photo
placements use `ResponsiveImage` with `srcSet` and layout-specific `sizes`, so
the browser selects an appropriate resolution for its screen and pixel density.
Full-width originals have variants up to 2400px; smaller placements up to 1200px,
limited to the available source resolution (no upscaling). WebP quality is 94.
The logo remains its original transparent PNG.

To regenerate photos, install Pillow in your Python environment and run
`python scripts/prepare_photos.py`, then `npm run format`. The script reads
untouched source photos from the sibling `bhb-beta` and `bhb-legacy` directories,
corrects EXIF orientation, applies the documented hive crops, and uses Lanczos
resizing. Source paths and output widths are recorded in
`src/assets/photos/sources.json`; `src/data/photos.js` is generated automatically.
The About-page beekeeper portrait uses the supplied `IMG_6171.jpeg`, preserved
as `photo-sources/geff-ivey.jpeg`. Responsive WebP versions use the full frame;
the source file is not copied into the production build.
Additional supplied photos are preserved in `photo-sources/`: `IMG_1750.jpeg`
as `bees-on-frames.jpeg`, `IMG_7971.jpeg` as `winter-hives.jpeg` (both on Our Bees),
and `IMG_2356.jpeg` as `capped-honey.jpeg` (on Products). These use uncropped,
orientation-corrected responsive WebP variants up to 1200px wide at quality 94.
The opening Our Bees photo uses `carniolan-oakleaf-v1.png`, preserved as
`photo-sources/bee-on-oakleaf.png`, with uncropped responsive variants up to its
2000px source width. The homepage retains its original apiary photograph.

Production output is written to `dist/`. Tailwind is integrated through its Vite
plugin, with theme tokens and the font definition in `src/index.css`.

Hosting must rewrite application paths such as `/products` to `/index.html`.
Vite handles this automatically during development and local preview.
