import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makePuzzle, findSpot, DIFF_COUNT } from '../public/lib/diff.js';
import { renderScene, W, H } from '../public/lib/scene.js';
import { drawObject } from '../public/lib/shapes.js';

const SEEDS = Array.from({ length: 300 }, (_, i) => i * 7919 + 1);
const STAGES = [1, 4, 8, 15];

function each(fn) {
  for (const stage of STAGES) for (const seed of SEEDS) fn(makePuzzle(seed, stage), seed, stage);
}

test('같은 시드·판이면 같은 퍼즐', () => {
  for (const seed of SEEDS.slice(0, 30)) {
    const a = makePuzzle(seed, 3);
    const b = makePuzzle(seed, 3);
    assert.deepEqual(a, b);
    assert.equal(renderScene(a.left), renderScene(b.left));
    assert.equal(renderScene(a.right), renderScene(b.right));
  }
});

test('퍼즐의 seed 로 다시 만들면 같은 퍼즐 (화면에 보이는 그림 번호로 재현)', () => {
  for (const seed of SEEDS.slice(0, 30)) {
    const p = makePuzzle(seed, 2);
    assert.deepEqual(makePuzzle(p.seed, 2), p);
  }
});

test('틀린 곳은 정확히 5개, 종류는 모두 다르다', () => {
  each((p, seed, stage) => {
    assert.equal(p.spots.length, DIFF_COUNT, `seed ${seed} stage ${stage}`);
    assert.equal(new Set(p.spots.map((s) => s.type)).size, DIFF_COUNT);
    assert.equal(new Set(p.spots.map((s) => s.id)).size, DIFF_COUNT);
  });
});

test('판정 원은 서로 겹치지 않고 중심이 그림 안에 있다', () => {
  each((p, seed, stage) => {
    for (const [i, a] of p.spots.entries()) {
      assert.ok(a.cx > 0 && a.cx < W && a.cy > 0 && a.cy < H, `seed ${seed} stage ${stage} spot ${i}`);
      for (const b of p.spots.slice(i + 1)) {
        assert.ok(Math.hypot(a.cx - b.cx, a.cy - b.cy) >= a.r + b.r, `seed ${seed} stage ${stage}`);
      }
    }
  });
});

test('틀린 곳의 물체만 다르고 나머지는 완전히 같다', () => {
  each((p, seed, stage) => {
    const L = new Map(p.left.objects.map((o) => [o.id, drawObject(o)]));
    const R = new Map(p.right.objects.map((o) => [o.id, drawObject(o)]));
    const changed = new Set(p.spots.map((s) => s.id));
    for (const id of new Set([...L.keys(), ...R.keys()])) {
      if (changed.has(id)) assert.notEqual(L.get(id), R.get(id), `seed ${seed} stage ${stage} id ${id}`);
      else assert.equal(L.get(id), R.get(id), `seed ${seed} stage ${stage} id ${id}`);
    }
  });
});

test('findSpot: 판정 원 안이면 그 번호, 밖이면 -1', () => {
  const p = makePuzzle(42, 1);
  p.spots.forEach((s, i) => {
    assert.equal(findSpot(p.spots, s.cx, s.cy), i);
    assert.equal(findSpot(p.spots, s.cx + s.r * 0.95, s.cy), i);
  });
  assert.equal(findSpot(p.spots, -50, -50), -1);
});
