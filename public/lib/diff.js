// 장면 → 퍼즐. 왼쪽은 원본, 오른쪽은 물체 5개에 변형을 하나씩 준 그림이다.
//
// 보장하는 것 (test/diff.test.js 가 검증):
//   - 틀린 곳은 정확히 5개, 변형 종류는 5개 모두 서로 다르다
//   - 판정 원끼리 겹치지 않는다 — 한 번 누른 곳이 두 군데로 판정되는 일이 없다
//   - 틀린 곳 말고는 두 그림이 완전히 같다

import { makeRng } from './rng.js';
import { KINDS, alternativeColors, createObject, radius } from './shapes.js';
import { makeScene, findSpace, stageProfile, W, H } from './scene.js';

export const DIFF_COUNT = 5;
export const TYPES = ['color', 'remove', 'scale', 'flip', 'part', 'add'];

// 손가락으로 눌러도 맞도록 판정 원을 물체보다 조금 크게 잡는다.
const PAD = 10;
// 너무 작은 물체의 변화는 눈에 안 띈다.
const MIN_VISIBLE_R = 24;
const MAX_ATTEMPTS = 30;
// 하나 더 추가할 때 쓰는 작은 물체들
const ADD_KINDS = ['flower', 'mushroom', 'butterfly', 'bird'];

const clone = (o) => ({ ...o, parts: { ...o.parts } });

const overlapsAny = (spot, spots) => spots.some((p) => Math.hypot(p.cx - spot.cx, p.cy - spot.cy) < p.r + spot.r);

// 변형 하나를 시도한다. 적용할 수 없으면 null, 적용하면 판정 원을 돌려준다.
function mutate(type, o, rng, objects) {
  const k = KINDS[o.kind];
  const r = radius(o);
  const spot = (rr = r) => ({ id: o.id, type, cx: o.x, cy: o.y, r: rr + PAD });

  switch (type) {
    case 'color': {
      const alts = alternativeColors(o);
      if (!alts.length) return null;
      return { spot: spot(), apply: (c) => { c.color = rng.pick(alts); } };
    }
    case 'remove':
      return { spot: spot(), apply: (c) => { c.removed = true; } };
    case 'flip':
      if (!k.asym) return null;
      return { spot: spot(), apply: (c) => { c.flip = -c.flip; } };
    case 'part': {
      const names = Object.keys(k.parts);
      if (!names.length) return null;
      const name = rng.pick(names);
      return { spot: spot(), apply: (c) => { c.parts[name] = k.parts[name][1](c.parts[name]); } };
    }
    case 'scale': {
      // 커지면 이웃을 덮거나 화면 밖으로 나갈 수 있어, 그럴 땐 작아지게 한다.
      const grow = o.s * 1.35;
      const rg = k.R * grow;
      const fits =
        o.x - rg > 0 && o.x + rg < W && o.y - rg > 0 && o.y + rg < H &&
        objects.every((p) => p.id === o.id || Math.hypot(p.x - o.x, p.y - o.y) >= (radius(p) + rg) * 0.8);
      const s = fits ? grow : o.s * 0.65;
      return { spot: spot(k.R * Math.max(o.s, s)), apply: (c) => { c.s = s; } };
    }
    default:
      return null;
  }
}

function tryMake(seed, stage) {
  const left = makeScene(seed, stage);
  const rng = makeRng((seed ^ 0x9e3779b9) >>> 0);
  const right = left.objects.map(clone);
  const spots = [];
  let nextId = left.nextId;

  for (const type of rng.shuffle(TYPES).slice(0, DIFF_COUNT)) {
    if (type === 'add') {
      const kind = rng.pick(ADD_KINDS);
      const s = Math.max(stageProfile(stage).scale, 0.85) * rng.range(0.95, 1.1);
      const at = findSpace(rng, kind, s, left.objects, { gap: 1, avoid: spots.map((p) => ({ ...p, r: p.r + PAD })) });
      if (!at) return null;
      const added = createObject(kind, rng, { id: nextId++, ...at, s });
      right.push(added);
      spots.push({ id: added.id, type, cx: at.x, cy: at.y, r: radius(added) + PAD });
      continue;
    }

    let done = false;
    for (const o of rng.shuffle(left.objects)) {
      if (spots.some((p) => p.id === o.id) || radius(o) < MIN_VISIBLE_R) continue;
      const m = mutate(type, o, rng, left.objects);
      if (!m || overlapsAny(m.spot, spots)) continue;
      m.apply(right.find((c) => c.id === o.id));
      spots.push(m.spot);
      done = true;
      break;
    }
    if (!done) return null;
  }

  return {
    seed,
    stage,
    left,
    right: { ...left, objects: right.filter((c) => !c.removed), nextId },
    spots,
  };
}

export function makePuzzle(seed, stage = 1) {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const p = tryMake((seed + attempt * 0x9e3779b1) >>> 0, stage);
    if (p) return p;
  }
  throw new Error(`퍼즐을 만들지 못했습니다 (seed ${seed}, stage ${stage})`);
}

// 장면 좌표 (x, y) 가 몇 번째 틀린 곳인지. 아니면 -1.
export function findSpot(spots, x, y) {
  return spots.findIndex((p) => Math.hypot(p.cx - x, p.cy - y) <= p.r);
}
