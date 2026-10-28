import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getLegacyRedirect } from './legacyUrl.js';

test('converts legacy routes and the old purchase alias', () => {
  assert.equal(
    getLegacyRedirect('https://berryhillbees.com/#/about'),
    '/about'
  );
  assert.equal(
    getLegacyRedirect('https://berryhillbees.com/#/about/'),
    '/about'
  );
  assert.equal(getLegacyRedirect('https://berryhillbees.com/#/'), '/');
  assert.equal(
    getLegacyRedirect('https://berryhillbees.com/#/purchase'),
    '/buyonline'
  );
});
test('preserves queries and section links, preferring route query values', () => {
  assert.equal(
    getLegacyRedirect(
      'https://berryhillbees.com/?source=bookmark#/about?ref=old#story'
    ),
    '/about?ref=old&source=bookmark#story'
  );
  assert.equal(
    getLegacyRedirect('https://berryhillbees.com/?ref=outer#/about?ref=inner'),
    '/about?ref=inner'
  );
});
test('leaves clean URLs and ordinary anchors alone, and blocks external targets', () => {
  assert.equal(getLegacyRedirect('https://berryhillbees.com/about'), null);
  assert.equal(getLegacyRedirect('https://berryhillbees.com/about#main'), null);
  assert.equal(
    getLegacyRedirect('https://berryhillbees.com/#//example.com/about'),
    null
  );
  assert.equal(
    getLegacyRedirect('https://berryhillbees.com/#/\\example.com'),
    null
  );
});
