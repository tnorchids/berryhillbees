# Berry Hill Bees: working guide

## Scope and established decisions

- Work in `bhb-new/` unless the user explicitly names another site. Run npm commands there.
- `bhb-legacy/` and `bhb-beta/` are reference sites. Consult their corresponding page and original photos when migrating content; beta contains some placeholders/sample announcements. Prefer real legacy content over invented copy. Preserve reference sources.
- New site: React + Vite + Tailwind v4, plain JavaScript/JSX. Favor small function components, native browser features, and data-driven content. Avoid adding a component library, router, state library, or backend without a concrete need.
- Geff Ivey is a hobby beekeeper and software developer by day, and the sole/head beekeeper. The apiary is in Solway, Knoxville, Tennessee. It has no storefront and offers no apiary tours. Keep copy personal and lightly humorous; don't invent business facts.
- Inventory is deliberately edited in code and redeployed. An admin page/database was discussed and deferred.
- Confirmed hosting: Cloudflare Pages at `dev.berryhillbees.com`. Contact recipient: `berryhillbees@gmail.com`. The dedicated contact Worker uses `worker/wrangler.contact.jsonc`; see `CONTACT-SETUP.md`. Prepared configuration is not evidence of live deployment or verified email delivery.

## Find the right file first

Paths below are relative to `bhb-new/`.

| Change                                                                  | Start here                                                    |
| ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| Navigation, shared header/footer, page selection                        | `src/App.jsx`                                                 |
| Page content                                                            | `src/pages/`                                                  |
| Colors, fonts, shared CSS                                               | `src/index.css`                                               |
| Prices, availability, PayPal merchant, purchase names, shipping weights | `src/data/shop.js`                                            |
| Announcements and display windows                                       | `src/data/updates.js`                                         |
| Date logic and automatic refresh                                        | `src/utils/updates.js`, `src/hooks/useUpdates.js`             |
| Titles, descriptions, noindex                                           | `src/data/pageMetadata.js`, `src/components/PageMetadata.jsx` |
| Canonical domain and Organization/WebSite JSON-LD                       | `src/data/site.js`                                            |
| Built HTML metadata, sitemap, robots                                    | `scripts/generate-page-metadata.js`                           |
| Legacy hash bookmark redirects                                          | `src/utils/legacyUrl.js`, invoked by `src/main.jsx`           |
| Responsive images and product lightbox                                  | `src/components/ResponsiveImage.jsx`, `ProductImage.jsx`      |
| Photo generation and provenance                                         | `scripts/prepare_photos.py`, `src/assets/photos/sources.json` |
| Contact delivery/backend tests                                          | `worker/index.js`, `worker/contact.test.js`                   |
| Hosting bindings                                                        | `wrangler.jsonc`                                              |

Navigation order: Home, Our Bees, Products, Local Retailers, Buy Online, About, Updates, Contact. Homepage purchase links also put Local Retailers before Buy Online.
Local Retailers uses `LocalRetailers.jsx` but retains `/wheretobuy`. Don't rename URLs casually.
`/buyonline/thankyou` is a hidden return route, not a navigation item, and is `noindex`.
Legacy `/#/about`-style URLs redirect to clean paths; `/purchase` within a legacy hash maps to `/buyonline`.

## Style and implementation preferences

- Copy tone is currently a trial: more direct and matter-of-fact, with restrained beekeeper humor (roughly 7/10 of the previous cuteness). Preserve the user's legacy stories and avoid promotional filler. Before-trial source snapshots are in `.wrangler/copy-tone-before/` for a targeted revert; check for subsequent edits before restoring anything.

- Single quotes in JS **and JSX**, no trailing commas. Use the existing Prettier config; JSON still requires double quotes.
- Match the restrained warm design: `paper`, `ink`, `muted`, `line`, `honey` tokens and Mate serif headings. Reuse existing layouts before inventing another pattern.
- Footer should remain compact. Elaborate columns, honeycomb art, gradients, and decorative arrows were tried and rejected. Current direction: warm solid background, small gold line, small existing logo in place of plain brand text, simple links.
- Keep update posts vertically compact. Use the shared `UpdatePost` component for page and homepage consistency.
- Use `page-intro` and `section-spacing` from `src/index.css` for compact, consistent vertical rhythm. Navigation uses a disclosure menu below 1280px (Escape closes and returns focus); desktop navigation stays on one row. Buy Online uses the same navigation styling as every other link; do not give it a special highlight. In-page shopping buttons can retain their dark call-to-action styling. Keep photos prominent: the user disliked smaller photos in the design refinement. Home keeps a full-width photo below the introduction; product photos use generous space and minimal padding. Long pages vary image placement and card/callout sections.
- Preserve accessible labels, keyboard focus, dialog Escape/close behavior, and responsive layouts. Product images enlarge in a native dialog; avoid an extra lightbox library.

## Data and integration invariants

- Updates use Knoxville (`America/New_York`) calendar dates, `YYYY-MM-DD`. Display window boundaries are inclusive; `showUntil: null` stays visible. Future publication dates remain hidden. Sort newest first. New badges last 30 calendar days, independently of visibility. Dates control display, not secrecy; content ships in public JS.
- Prefer higher photo quality over the smallest possible files. Generate responsive WebP at quality 94, correct EXIF orientation, preserve framing, and never upscale. Use larger legacy/beta originals where available; supplied originals live in `photo-sources/`. Full-width variants reach 2400px; smaller placements generally 1200px, capped at source resolution.
- `src/data/photos.js` and responsive WebPs are generated. Update the generator/source mapping, run `python scripts/prepare_photos.py` with Pillow, then format. Don't manually maintain generated manifests or regenerate all photos for unrelated edits.
- Preserve PayPal purchase names and shipping weights; shipping weight isn't the displayed net weight. The thank-you page is not proof of payment. Never mark an order paid from URL parameters or a page visit.
- Contact uses `/api/contact` and server-only `CONTACT_FROM`/`CONTACT_TO`, `EMAIL`, and `CONTACT_LIMITER` bindings. Keep validation, origin/size checks, honeypot, and rate limiting. Never put secrets in `VITE_` variables. Vite alone doesn't run this backend.
- Live email delivery, PayPal checkout/shipping/return behavior, and Cloudflare deployment still need actual integration verification. Passing a build or mocked tests doesn't establish those work live.
- SEO: add metadata whenever adding a route. Build emits route-specific HTML heads, canonical links, sitemap and robots; React still renders page bodies. Keep thank-you out of the sitemap. Don't invent addresses, hours, reviews, or guarantee Google sitelinks.

## Efficient workflow and verification

- Read this guide once, then inspect only the files relevant to the request. Read `bhb-new/README.md` for detailed setup when needed, not on every turn.
- Use targeted `rg` searches, excluding `node_modules`, `dist`, and generated image manifests unless relevant. Don't dump whole reference trees, lockfiles, minified bundles, or binary assets into context.
- Preserve unrelated user edits. Don't assume the workspace root is a Git repository; determine the actual repository boundary before Git operations.
- Reuse existing dependencies and installed runtimes. No install or web research is needed for ordinary copy/layout edits. Verify current external-service APIs against official documentation when changing integrations.
- Commands: `npm run lint`, `npm run format`, `npm run format:check`, `npm test`, `npm run build`. Build includes SEO generation; use the npm command rather than bare `vite build`.
- Scope checks to the change: formatting/build for simple JSX/layout work; lint and relevant tests for logic. Date logic, redirects, and backend behavior have Node tests. Don't add implementation-mirroring tests for simple copy/styles.
- After checks pass, don't repeat them without a new change or unresolved issue. Report concise outcomes and real limitations; never claim browser/live verification from static checks.
- No deployment, production configuration change, purchase, or real message sending is implied by routine local edits. Continue authorized reversible work without extra confirmation.
- Keep this guide short and current when a durable project decision changes. Put detailed setup in README instead of duplicating it here.
