# Contact form on Cloudflare Pages

Confirmed deployment: `https://dev.berryhillbees.com` (Pages).
Confirmed recipient: `berryhillbees@gmail.com`.

## Current setup status

- Dedicated dev contact Worker deployed; EMAIL and CONTACT_LIMITER bindings created.
- CONTACT_TO and CONTACT_FROM configured on the Worker, with sender
  `website@berryhillbees.com`.
- Destination registration created and Cloudflare verification email requested.
  Mailbox verification still needs confirmation.
- Email Routing enable failed because non-Cloudflare MX records exist. The user
  confirmed the old domain mail host is unused and only Gmail is used.
- The current Wrangler login can deploy Workers but cannot manage DNS records
  (DNS API returned authentication error). Complete the domain email setup in
  the dashboard: remove the obsolete MX record when Cloudflare prompts, apply
  the required routing/SPF records, then recheck routing and test delivery.
- No inbox-delivery test has passed yet. This status is not proof the form works.

The site remains on Pages. Deploy a separate small Worker only on
`dev.berryhillbees.com/api/contact*`. The existing form already posts to this
same-origin endpoint, so it needs no frontend URL change or cross-origin setup.
Use `worker/wrangler.contact.jsonc`, not the root whole-site Worker config.
This configuration does not route any production-hostname requests.

## 1. Enable email and verify the mailbox

In Cloudflare Email Service / Email Routing for `berryhillbees.com`, add
`berryhillbees@gmail.com` as a destination and complete verification from Gmail.
The sender domain must be onboarded to Cloudflare Email Service. Follow the
dashboard's domain-verification/DNS requirements. Review any existing domain mail
configuration before changing MX or SPF records; don't replace another mail
provider's configuration blindly.

Suggested sender: `website@berryhillbees.com`, after Cloudflare authorizes that
domain. The visitor's email is Reply-To, not From. No visitor receives automatic
email. Sending is restricted to the one verified receiving mailbox.

## 2. Authenticate and deploy the contact Worker

Run from `bhb-new/` in a terminal signed into the correct Cloudflare account:

```sh
npx wrangler login
npm run contact:deploy
```

The Pages custom domain's DNS record must be proxied through Cloudflare for the
Worker route to run. Keep its existing Pages DNS target; do not replace it with
a new Worker custom domain. Check for an existing conflicting API Worker route.

## 3. Set Worker secrets

Set these on **berry-hill-bees-contact-dev**, not on the Pages project:

```sh
npm run contact:secret -- CONTACT_TO
npm run contact:secret -- CONTACT_FROM
```

Enter `berryhillbees@gmail.com` for CONTACT_TO and the authorized sender (for
example `website@berryhillbees.com`) for CONTACT_FROM. These are server-side only.
The EMAIL and CONTACT_LIMITER bindings are created by the dedicated config.

## 4. Verify routing and delivery

Opening `https://dev.berryhillbees.com/api/contact` should return JSON with
`Method not allowed.` and HTTP 405. HTML means the request is still reaching
Pages rather than this Worker. No email is sent by this check.

Submit one clearly labeled test message from the site's Contact page. Confirm
receipt in Gmail (including Spam) and that Reply addresses the visitor's email.
The sending UI alone cannot prove inbox delivery.

For failures, stream logs with:

```sh
npm run contact:logs
```

- 503: missing CONTACT_FROM, CONTACT_TO, EMAIL, or CONTACT_LIMITER.
- 502: send/binding failure; check domain onboarding, mailbox verification,
  sender authorization, and account limits.
- 429: wait a minute; the rate limit allows three sends per IP per minute.
- 403: submit from the same host as the API route, not a different preview URL.

Configuration creation and local tests do not deploy anything. After deployment,
record the actual result rather than assuming delivery works. Production rollout
requires a deliberate production route/configuration change and another test.

Official references: [Worker routes](https://developers.cloudflare.com/workers/configuration/routing/routes/),
[email bindings](https://developers.cloudflare.com/email-service/configuration/send-bindings/).
