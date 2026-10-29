import { test } from 'node:test';
import assert from 'node:assert/strict';
import api from './contact-api.js';

test('contact-only Worker handles the API without a Pages asset binding', async () => {
  const response = await api.fetch(
    new Request('https://dev.berryhillbees.com/api/contact'),
    {}
  );
  assert.equal(response.status, 405);
  assert.equal((await response.json()).message, 'Method not allowed.');
});

test('contact-only Worker never serves unrelated Pages routes', async () => {
  for (const path of ['/about', '/api/contact-extra', '/api/contact/']) {
    const response = await api.fetch(
      new Request(`https://dev.berryhillbees.com${path}`),
      {}
    );
    assert.equal(response.status, 404);
  }
});
