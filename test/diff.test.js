import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makePuzzle, SCENES, DIFF_COUNT } from '../public/lib/diff.js';
import { W, H } from '../public/lib/art.js';

const SEEDS = Array.from({ length: 300 }, (_, i) => i * 7919 + 1);

function each(fn) {
  SCENES.forEach((scene, si) => {
    for (const seed of SEEDS) fn(makePuzzle(seed, si), scene, seed);
  });
}

test('장면은 30개 이상이고 id 가 겹치지 않는다', () => {
  assert.ok(SCENES.length >= 30, `장면 ${SCENES.length}개`);
  assert.equal(new Set(SCENES.map((s) => s.id)).size, SCENES.length);
});

test('장면마다 후보가 충분하고 id 가 겹치지 않는다', () => {
  for (const scene of SCENES) {
    assert.ok(scene.diffs.length >= 15, `${scene.id}: 후보 ${scene.diffs.length}개`);
    assert.equal(new Set(scene.diffs.map((d) => d.id)).size, scene.diffs.length, scene.id);
  }
});

test('후보 하나하나가 실제로 그림을 바꾼다', () => {
  for (const scene of SCENES) {
    const base = scene.draw(new Set());
    for (const d of scene.diffs) {
      assert.notEqual(scene.draw(new Set([d.id])), base, `${scene.id}.${d.id} 를 켜도 그림이 그대로`);
    }
  }
});

test('후보끼리 서로 다른 부분을 바꾼다', () => {
  for (const scene of SCENES) {
    const outs = scene.diffs.map((d) => scene.draw(new Set([d.id])));
    assert.equal(new Set(outs).size, outs.length, scene.id);
  }
});

test('판정 원의 중심이 그림 안에 있다', () => {
  for (const scene of SCENES) {
    for (const d of scene.diffs) {
      assert.ok(d.cx > 0 && d.cx < W && d.cy > 0 && d.cy < H && d.r >= 20, `${scene.id}.${d.id}`);
    }
  }
});

test('같은 시드·장면이면 같은 퍼즐, 퍼즐의 seed 로 다시 만들어도 같다', () => {
  SCENES.forEach((_, si) => {
    for (const seed of SEEDS.slice(0, 30)) {
      const p = makePuzzle(seed, si);
      assert.deepEqual(makePuzzle(seed, si), p);
      assert.deepEqual(makePuzzle(p.seed, si), p);
    }
  });
});

test('틀린 곳은 정확히 5개이고 판정 원끼리 겹치지 않는다', () => {
  each((p, scene, seed) => {
    assert.equal(p.spots.length, DIFF_COUNT, `${scene.id} seed ${seed}`);
    assert.equal(new Set(p.spots.map((s) => s.id)).size, DIFF_COUNT);
    for (const [i, a] of p.spots.entries()) {
      for (const b of p.spots.slice(i + 1)) {
        assert.ok(Math.hypot(a.cx - b.cx, a.cy - b.cy) >= a.r + b.r, `${scene.id} seed ${seed}: ${a.id} / ${b.id}`);
      }
    }
  });
});

test('오른쪽 그림 = 원본에 고른 5곳만 바꾼 그림', () => {
  each((p, scene) => {
    const strip = (s, k) => s.replaceAll(`id="${k}-`, 'id="').replaceAll(`url(#${k}-`, 'url(#');
    assert.equal(strip(p.left, 'L'), scene.draw(new Set()));
    assert.equal(strip(p.right, 'R'), scene.draw(new Set(p.spots.map((s) => s.id))));
  });
});

test('왼쪽·오른쪽 그림의 id 가 서로 겹치지 않는다', () => {
  const p = makePuzzle(1, 0);
  const ids = (s) => [...s.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
  const left = new Set(ids(p.left));
  assert.ok(left.size > 0);
  for (const id of ids(p.right)) assert.ok(!left.has(id), id);
});
