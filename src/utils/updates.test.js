import { test } from 'node:test';
import assert from 'node:assert/strict';
import { updates } from '../data/updates.js';
import {
  getKnoxvilleDay,
  getVisibleUpdates,
  isNewUpdate,
  formatUpdateDate
} from './updates.js';

const post = {
  id: 'test',
  publishedOn: '2026-10-01',
  showFrom: '2026-10-05',
  showUntil: '2026-10-27'
};
test('visibility includes both boundary days and excludes future and expired posts', () => {
  assert.equal(getVisibleUpdates([post], '2026-10-04').length, 0);
  assert.equal(getVisibleUpdates([post], '2026-10-05').length, 1);
  assert.equal(getVisibleUpdates([post], '2026-10-27').length, 1);
  assert.equal(getVisibleUpdates([post], '2026-10-28').length, 0);
  assert.equal(
    getVisibleUpdates([{ ...post, publishedOn: '2026-11-01' }], '2026-10-27')
      .length,
    0
  );
});
test('open-ended posts remain visible and sort newest first without changing source', () => {
  const newer = {
    ...post,
    id: 'newer',
    publishedOn: '2026-10-20',
    showUntil: null
  };
  const older = { ...post, showUntil: null };
  const source = [older, newer];
  assert.deepEqual(
    getVisibleUpdates(source, '2026-12-01').map(({ id }) => id),
    ['newer', 'test']
  );
  assert.equal(source[0].id, 'test');
});
test('new badge lasts 30 calendar days and never marks future dates', () => {
  assert.equal(isNewUpdate(post, '2026-09-30'), false);
  assert.equal(isNewUpdate(post, '2026-10-01'), true);
  assert.equal(isNewUpdate(post, '2026-10-30'), true);
  assert.equal(isNewUpdate(post, '2026-10-31'), false);
  assert.equal(isNewUpdate({ publishedOn: '2026-10-15' }, '2026-11-13'), true);
  assert.equal(isNewUpdate({ publishedOn: '2026-10-15' }, '2026-11-14'), false);
});
test('Knoxville dates handle midnight and daylight saving time', () => {
  assert.equal(getKnoxvilleDay(new Date('2026-10-28T03:59:00Z')), '2026-10-27');
  assert.equal(getKnoxvilleDay(new Date('2026-10-28T04:00:00Z')), '2026-10-28');
  assert.equal(getKnoxvilleDay(new Date('2026-11-02T04:59:00Z')), '2026-11-01');
  assert.equal(getKnoxvilleDay(new Date('2026-11-02T05:00:00Z')), '2026-11-02');
  assert.equal(formatUpdateDate('2026-09-14'), 'September 14, 2026');
});
test('catalog has unique IDs and valid date ranges; legacy posts are not new today', () => {
  assert.equal(new Set(updates.map(({ id }) => id)).size, updates.length);
  for (const update of updates) {
    for (const day of [
      update.publishedOn,
      update.showFrom,
      update.showUntil
    ].filter(Boolean)) {
      assert.match(day, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(
        new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10),
        day
      );
    }
    assert.ok(!update.showUntil || update.showFrom <= update.showUntil);
  }
  assert.equal(
    getVisibleUpdates(updates, '2026-10-27').some((update) =>
      isNewUpdate(update, '2026-10-27')
    ),
    false
  );
});
