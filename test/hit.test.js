import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pixelMask, maskHit, locate, MASK_SCALE, TOUCH_PAD } from '../public/lib/hit.js';

// 2×1 칸 그림. 오른쪽 칸만 색이 다르다.
test('pixelMask: 색이 달라진 칸만 표시하고 아주 작은 차이는 무시한다', () => {
  const a = [10, 10, 10, 255, 10, 10, 10, 255];
  const b = [12, 10, 10, 255, 200, 10, 10, 255];
  assert.deepEqual([...pixelMask(a, b, 2, 1).cells], [0, 1]);
});

// 장면 좌표 (40, 40) ~ (80, 80) 이 달라진 마스크
function squareMask() {
  const w = 40;
  const h = 40;
  const cells = new Uint8Array(w * h);
  for (let y = 10; y < 20; y++) for (let x = 10; x < 20; x++) cells[y * w + x] = 1;
  return { w, h, cells };
}

test('maskHit: 달라진 자리 어디든 맞고, 밖은 여유 안에서만 맞는다', () => {
  const m = squareMask();
  assert.ok(maskHit(m, 41, 41));
  assert.ok(maskHit(m, 79, 79));
  assert.ok(!maskHit(m, 90, 60));
  assert.ok(maskHit(m, 80 + TOUCH_PAD - MASK_SCALE, 60, TOUCH_PAD));
  assert.ok(!maskHit(m, 80 + TOUCH_PAD * 2, 60, TOUCH_PAD));
  assert.ok(!maskHit(m, -100, -100, TOUCH_PAD), '그림 밖에서도 오류 없이 false');
});

const FAR = { cx: 140, cy: 140, r: 20 };

test('locate: 판정 원에서 먼 곳이어도 달라진 자리를 누르면 맞다', () => {
  const spots = [{ cx: 45, cy: 45, r: 3 }];
  assert.equal(locate(spots, [squareMask()], [], 75, 75), 0);
  assert.equal(locate(spots, [squareMask()], [], 120, 120), -1);
});

test('locate: 판정 원은 달라진 자리 밖에서도 그대로 맞다', () => {
  assert.equal(locate([FAR], [squareMask()], [], 145, 145), 0);
});

test('locate: 그림 비교에 실패해 마스크가 없으면 판정 원으로만 판정한다', () => {
  assert.equal(locate([FAR], [], [], 145, 145), 0);
  assert.equal(locate([FAR], [], [], 60, 60), -1);
});

test('locate: 달라진 픽셀을 직접 누른 곳이 다른 곳의 판정 원보다 먼저다', () => {
  const circleOverMask = { cx: 60, cy: 60, r: 20 };
  assert.equal(locate([circleOverMask, { cx: 45, cy: 45, r: 3 }], [undefined, squareMask()], [], 60, 60), 1);
});

test('locate: 겹치는 곳이면 아직 못 찾은 곳을 고르고, 다 찾았으면 찾은 곳을 돌려준다', () => {
  const spots = [{ cx: 45, cy: 45, r: 3 }, { cx: 60, cy: 60, r: 20 }];
  const masks = [squareMask(), undefined];
  assert.equal(locate(spots, masks, [], 60, 60), 0);
  assert.equal(locate(spots, masks, [0], 60, 60), 1);
  assert.equal(locate(spots, masks, [0, 1], 60, 60), 0);
});
