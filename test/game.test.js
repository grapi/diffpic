import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newGame, hit, miss, nextStage, reroll, comboBonus, START_LIVES, MAX_LIVES, HIT_POINTS, PERFECT_POINTS, COMBO_MAX } from '../public/lib/game.js';

const findAll = (s) => [0, 1, 2, 3, 4].reduce(hit, s);
const STAGES = 15;

test('시작 생명은 5', () => {
  assert.equal(newGame(STAGES).lives, START_LIVES);
  assert.equal(START_LIVES, 5);
  assert.equal(MAX_LIVES, 10);
});

test('틀리면 생명 −1, 0 이 되면 게임 오버', () => {
  let s = newGame(STAGES);
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
  const s = hit(newGame(STAGES), 2);
  assert.equal(hit(s, 2), s);
});

test('퍼팩트면 생명 +2', () => {
  const s = findAll(newGame(STAGES));
  assert.equal(s.status, 'cleared');
  assert.equal(s.perfect, true);
  assert.equal(s.bonus, 2);
  assert.equal(s.lives, START_LIVES + 2);
});

test('틀린 적이 있어도 다 찾으면 생명 +1', () => {
  const s = findAll(miss(newGame(STAGES)));
  assert.equal(s.perfect, false);
  assert.equal(s.bonus, 1);
  assert.equal(s.lives, START_LIVES - 1 + 1);
});

test('생명은 10 을 넘지 않는다', () => {
  let s = { ...newGame(STAGES), lives: 9 };
  s = findAll(s);
  assert.equal(s.bonus, 1, '9 에서 퍼팩트면 1 만 는다');
  assert.equal(s.lives, MAX_LIVES);
  s = findAll(nextStage(s));
  assert.equal(s.perfect, true);
  assert.equal(s.bonus, 0);
  assert.equal(s.lives, MAX_LIVES);
});

test('다음 판으로 생명·점수·연속이 이어지고 판 기록은 초기화', () => {
  const c = findAll(miss(miss(newGame(STAGES))));
  const s = nextStage(c);
  assert.equal(s.stage, 2);
  assert.equal(s.lives, c.lives);
  assert.equal(s.score, c.score);
  assert.equal(s.combo, 5);
  assert.deepEqual(s.found, []);
  assert.equal(s.misses, 0);
  assert.equal(s.status, 'playing');
});

test('찾으면 기본 점수, 연속이면 보너스가 커진다', () => {
  let s = newGame(STAGES);
  s = hit(s, 0);
  assert.equal(s.lastPoints, HIT_POINTS);
  s = hit(s, 1);
  assert.equal(s.lastPoints, HIT_POINTS + 50);
  s = hit(s, 2);
  assert.equal(s.lastPoints, HIT_POINTS + 100);
  assert.equal(s.score, 3 * HIT_POINTS + 150);
});

test('틀리면 연속이 끊기지만 점수는 깎이지 않는다', () => {
  const a = hit(hit(newGame(STAGES), 0), 1);
  const b = miss(a);
  assert.equal(b.combo, 0);
  assert.equal(b.score, a.score);
  assert.equal(hit(b, 2).lastPoints, HIT_POINTS);
});

test('연속 보너스에는 상한이 있다', () => {
  assert.equal(comboBonus(1), 0);
  assert.equal(comboBonus(100), COMBO_MAX);
});

test('퍼팩트면 판 끝에 보너스 점수, 아니면 없다', () => {
  // 100 + 150 + 200 + 250 + 300
  assert.equal(findAll(newGame(STAGES)).score, 1000 + PERFECT_POINTS);
  assert.equal(findAll(miss(newGame(STAGES))).score, 1000);
});

test('연속은 다음 판으로 이어져 첫 곳부터 보너스가 붙는다', () => {
  const s = hit(nextStage(findAll(newGame(STAGES))), 0);
  assert.equal(s.combo, 6);
  assert.equal(s.lastPoints, HIT_POINTS + 250);
});

test('다시 섞기는 이 판의 점수와 연속을 되돌리고 틀린 기록은 남긴다', () => {
  const first = nextStage(findAll(newGame(STAGES)));
  const s = reroll(hit(miss(first), 0));
  assert.deepEqual(s.found, []);
  assert.equal(s.misses, 1);
  assert.equal(s.score, first.score);
  assert.equal(s.combo, 0);
});

test('마지막 판을 깨고 넘어가면 완주', () => {
  let s = newGame(2);
  s = nextStage(findAll(s));
  assert.equal(s.status, 'playing');
  s = findAll(s);
  assert.equal(s.status, 'cleared');
  s = nextStage(s);
  assert.equal(s.status, 'finished');
  assert.equal(s.stage, 2);
});
