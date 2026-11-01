import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newGame, hit, miss, nextStage, reroll, START_LIVES, MAX_LIVES } from '../public/lib/game.js';

const findAll = (s) => [0, 1, 2, 3, 4].reduce(hit, s);

test('시작 생명은 5', () => {
  assert.equal(newGame().lives, START_LIVES);
  assert.equal(START_LIVES, 5);
  assert.equal(MAX_LIVES, 10);
});

test('틀리면 생명 −1, 0 이 되면 게임 오버', () => {
  let s = newGame();
  for (let i = 1; i <= 4; i++) {
    s = miss(s);
    assert.equal(s.lives, START_LIVES - i);
    assert.equal(s.status, 'playing');
  }
  s = miss(s);
  assert.equal(s.lives, 0);
  assert.equal(s.status, 'over');
  assert.equal(miss(s), s, '게임 오버 뒤에는 더 깎이지 않는다');
});

test('이미 찾은 곳을 다시 누르면 아무 일 없다', () => {
  const s = hit(newGame(), 2);
  assert.equal(hit(s, 2), s);
});

test('퍼팩트면 생명 +1', () => {
  const s = findAll(newGame());
  assert.equal(s.status, 'cleared');
  assert.equal(s.perfect, true);
  assert.equal(s.bonus, 1);
  assert.equal(s.lives, START_LIVES + 1);
});

test('한 번이라도 틀리면 퍼팩트 아님', () => {
  const s = findAll(miss(newGame()));
  assert.equal(s.perfect, false);
  assert.equal(s.bonus, 0);
  assert.equal(s.lives, START_LIVES - 1);
});

test('생명은 10 을 넘지 않는다', () => {
  let s = newGame();
  for (let i = 0; i < 12; i++) s = nextStage(findAll(s));
  assert.equal(s.lives, MAX_LIVES);
  const last = findAll(s);
  assert.equal(last.perfect, true);
  assert.equal(last.bonus, 0);
  assert.equal(last.lives, MAX_LIVES);
});

test('다음 판으로 생명이 이어지고 판 기록은 초기화', () => {
  const s = nextStage(findAll(miss(miss(newGame()))));
  assert.deepEqual(s, { ...newGame(), stage: 2, lives: 3 });
});

test('그림 바꾸기는 찾은 곳만 비우고 틀린 기록은 남긴다', () => {
  const s = reroll(hit(miss(newGame()), 0));
  assert.deepEqual(s.found, []);
  assert.equal(s.misses, 1);
  assert.equal(s.lives, START_LIVES - 1);
});
