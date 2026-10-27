import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { contact } from './index.js';

const request = (body, origin = 'https://example.com') =>
  new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
const valid = {
  name: 'Visitor',
  email: 'visitor@example.com',
  message: 'Is honey available?'
};
const environment = (send = async () => {}) => ({
  EMAIL: { send },
  CONTACT_FROM: 'site@example.com',
  CONTACT_TO: 'owner@example.com',
  CONTACT_LIMITER: { limit: async () => ({ success: true }) }
});

test('sends only to the configured recipient and uses visitor as reply-to', async () => {
  let sent;
  const response = await contact(
    request({ ...valid, to: 'attacker@example.com' }),
    environment(async (mail) => {
      sent = mail;
    })
  );
  assert.equal(response.status, 200);
  assert.equal(sent.to, 'owner@example.com');
  assert.equal(sent.from, 'site@example.com');
  assert.equal(sent.replyTo, valid.email);
  assert.match(sent.text, /Is honey available/);
});
test('rejects cross-origin requests, invalid input, and oversized bodies', async () => {
  const env = environment(() => {
    assert.fail('must not send');
  });
  assert.equal(
    (await contact(request(valid, 'https://other.com'), env)).status,
    403
  );
  assert.equal(
    (await contact(request({ ...valid, email: 'bad\r\naddress' }), env)).status,
    400
  );
  assert.equal(
    (await contact(request({ ...valid, message: 'a'.repeat(17000) }), env))
      .status,
    413
  );
});
test('honeypot never sends; unavailable config and delivery failures are errors', async () => {
  assert.equal(
    (
      await contact(
        request({ ...valid, website: 'spam' }),
        environment(() => assert.fail('must not send'))
      )
    ).status,
    200
  );
  assert.equal((await contact(request(valid), {})).status, 503);
  assert.equal(
    (
      await contact(
        request(valid),
        environment(async () => {
          throw new Error('provider failure');
        })
      )
    ).status,
    502
  );
});
test('rate limit and method restrictions prevent sending', async () => {
  const env = environment(() => assert.fail('must not send'));
  env.CONTACT_LIMITER.limit = async () => ({ success: false });
  assert.equal((await contact(request(valid), env)).status, 429);
  assert.equal(
    (await contact(new Request('https://example.com/api/contact'), env)).status,
    405
  );
});
test('ordinary page requests pass to static assets', async () => {
  const response = await worker.fetch(new Request('https://example.com/bees'), {
    ASSETS: { fetch: async () => new Response('page') }
  });
  assert.equal(await response.text(), 'page');
});
