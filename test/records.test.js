import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addRecord, cleanName, MAX_RECORDS, MAX_NAME } from '../public/lib/records.js';

const rec = (score, name = '가') => ({ name, score });

test('점수 높은 순으로 들어가고 순위를 돌려준다', () => {
  let r = addRecord([], rec(100));
  assert.equal(r.rank, 0);
  r = addRecord(r.records, rec(300));
  assert.equal(r.rank, 0);
  r = addRecord(r.records, rec(200));
  assert.equal(r.rank, 1);
  assert.deepEqual(r.records.map((x) => x.score), [300, 200, 100]);
});

test('점수가 같으면 먼저 세운 기록이 앞선다', () => {
  const { records, rank } = addRecord([rec(100, '먼저')], rec(100, '나중'));
  assert.equal(rank, 1);
  assert.equal(records[0].name, '먼저');
});

test('10개까지만 남고, 밖으로 밀리면 순위는 -1', () => {
  const full = Array.from({ length: MAX_RECORDS }, (_, i) => rec(1000 - i));
  const low = addRecord(full, rec(1));
  assert.equal(low.rank, -1);
  assert.equal(low.records.length, MAX_RECORDS);
  const high = addRecord(full, rec(5000));
  assert.equal(high.rank, 0);
  assert.equal(high.records.length, MAX_RECORDS);
  assert.equal(high.records.at(-1).score, 992);
});

test('이름은 앞뒤 공백을 지우고 길이를 자르며, 비면 기본 이름', () => {
  assert.equal(cleanName('  지우  '), '지우');
  assert.equal(cleanName(''), '이름 없음');
  assert.equal(cleanName('   '), '이름 없음');
  assert.equal([...cleanName('가'.repeat(30))].length, MAX_NAME);
});
