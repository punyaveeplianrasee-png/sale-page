import assert from 'node:assert/strict';
import test from 'node:test';
import { weekDays, thaiDate, inNewYorkSession, eventsForDay, hasPassed, isNewsWeek, emptyWeek, visibleWeekDays } from '../app/news-analysis/calendar.ts';

test('verified next week can be previewed but stale and far-future weeks stay hidden', () => {
  const data = { ...emptyWeek, weekStart: '2026-09-21' };
  assert.equal(visibleWeekDays(data, Date.parse('2026-09-20T08:00:00+07:00'))[0], '2026-09-21');
  assert.equal(visibleWeekDays(data, Date.parse('2026-09-21T08:00:00+07:00'))[0], '2026-09-21');
  assert.equal(visibleWeekDays(data, Date.parse('2026-09-28T08:00:00+07:00'))[0], '2026-09-28');
  assert.equal(visibleWeekDays(data, Date.parse('2026-09-01T08:00:00+07:00'))[0], '2026-08-31');
});

test('Thai week rolls over at local Monday midnight, not UTC midnight', () => {
  assert.equal(weekDays(Date.parse('2026-09-20T16:59:59Z'))[0], '2026-09-14');
  assert.equal(weekDays(Date.parse('2026-09-20T17:00:00Z'))[0], '2026-09-21');
});
test('NY session follows DST and excludes weekends and out-of-session releases', () => {
  assert.equal(inNewYorkSession('2026-07-06T12:00:00Z'), true);
  assert.equal(inNewYorkSession('2026-01-05T12:00:00Z'), false);
  assert.equal(inNewYorkSession('2026-01-05T13:00:00Z'), true);
  assert.equal(inNewYorkSession('2026-07-06T21:00:00Z'), false);
  assert.equal(inNewYorkSession('2026-07-11T13:00:00Z'), false);
  assert.equal(thaiDate(Date.parse('2026-07-10T19:00:00Z')), '2026-07-11');
});
test('events group by Thai date, filter impact, and sort by timestamp', () => {
  const data = { ...emptyWeek, events: [
    { id: 'later', startsAt: '2026-07-06T15:00:00Z', importance: 3 },
    { id: 'low', startsAt: '2026-07-06T12:00:00Z', importance: 2 },
    { id: 'earlier', startsAt: '2026-07-06T12:30:00Z', importance: 3 },
  ] };
  assert.deepEqual(eventsForDay(data, '2026-07-06').map(e => e.id), ['earlier', 'later']);
  assert.deepEqual(eventsForDay(data, '2026-07-07'), []);
});
test('past status changes at release time and invalid payloads fail closed', () => {
  assert.equal(hasPassed('2026-09-21T12:30:00Z', Date.parse('2026-09-21T12:29:59Z')), false);
  assert.equal(hasPassed('2026-09-21T12:30:00Z', Date.parse('2026-09-21T12:30:00Z')), true);
  assert.equal(isNewsWeek(emptyWeek), true);
  assert.equal(isNewsWeek({ events: [] }), false);
  assert.equal(isNewsWeek({ ...emptyWeek, events: [{ importance: 3, startsAt: 'invalid' }] }), false);
});
