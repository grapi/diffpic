// 시드 → 장면. 하늘·언덕·땅 배경 위에 물체를 겹치지 않게 흩어 놓는다.
// 같은 시드와 판 번호면 언제나 같은 장면이 나온다.

import { makeRng } from './rng.js';
import { KINDS, createObject, drawObject, radius } from './shapes.js';

export const W = 800;
export const H = 600;
export const HORIZON = 300;

const SKIES = [
  ['#9fdcff', '#e3f6ff'],
  ['#ffc9a3', '#fff0de'],
  ['#c9d8ff', '#f1e8ff'],
  ['#a8e6e0', '#effaf6'],
];
const GROUNDS = [
  ['#9bd46f', '#78bd52'],
  ['#b5dc84', '#8cc464'],
  ['#8fcf9a', '#66b37a'],
];

const SKY_KINDS = Object.keys(KINDS).filter((k) => KINDS[k].zone === 'sky' && k !== 'sun');
const GROUND_KINDS = Object.keys(KINDS).filter((k) => KINDS[k].zone === 'ground');

// 판이 올라갈수록 물체가 많아지고 작아진다.
export function stageProfile(stage) {
  return {
    count: Math.min(16, 9 + stage),
    scale: Math.max(0.85, 1.2 - (stage - 1) * 0.04),
  };
}

// 영역 안에서 중심 y 가 놓일 수 있는 범위
export function yRange(zone, r) {
  return zone === 'sky' ? [r + 10, HORIZON - 70] : [HORIZON + r * 0.4, H - r - 6];
}

// 다른 물체들과 경계 원이 (거의) 겹치지 않는 자리를 찾는다. 못 찾으면 null.
export function findSpace(rng, kind, s, others, { gap = 0.9, tries = 200, avoid = [] } = {}) {
  const r = KINDS[kind].R * s;
  const [y0, y1] = yRange(KINDS[kind].zone, r);
  for (let t = 0; t < tries; t++) {
    const x = rng.range(r + 6, W - r - 6);
    const y = rng.range(y0, y1);
    const clear =
      others.every((o) => Math.hypot(o.x - x, o.y - y) >= (radius(o) + r) * gap) &&
      avoid.every((c) => Math.hypot(c.cx - x, c.cy - y) >= c.r + r);
    if (clear) return { x, y };
  }
  return null;
}

export function makeScene(seed, stage = 1) {
  const rng = makeRng(seed);
  const { count, scale } = stageProfile(stage);
  const sky = rng.pick(SKIES);
  const ground = rng.pick(GROUNDS);
  const hills = [rng.range(220, 270), rng.range(250, 290), rng.range(220, 270)].map(Math.round);

  const objects = [];
  let nextId = 0;
  const sun = createObject('sun', rng, { id: nextId++, x: rng.pick([90, W - 90]), y: 80, s: 1 });
  objects.push(sun);

  const skyCount = rng.int(2, 3);
  for (let i = 1; i < count; i++) {
    const kind = rng.pick(i <= skyCount ? SKY_KINDS : GROUND_KINDS);
    const s = scale * rng.range(0.85, 1.15);
    const at = findSpace(rng, kind, s, objects);
    if (!at) continue; // 자리가 없으면 그 물체는 빼고 간다
    objects.push(createObject(kind, rng, { id: nextId++, ...at, s }));
  }

  return { seed, stage, bg: { sky, ground, hills }, objects, nextId };
}

function background({ sky, ground, hills }) {
  const [a, b, c] = hills;
  return (
    `<defs><linearGradient id="sky-${sky[0].slice(1)}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#sky-${sky[0].slice(1)})"/>` +
    `<path d="M0 ${a}Q200 ${b - 60} 400 ${b}T${W} ${c}V${H}H0Z" fill="${ground[1]}"/>` +
    `<rect y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="${ground[0]}"/>`
  );
}

// 아래쪽(앞쪽)에 있는 물체가 나중에 그려져 위로 오도록 밑변 기준으로 정렬한다.
export function renderScene(scene) {
  const sorted = scene.objects.slice().sort((p, q) => p.y + radius(p) - (q.y + radius(q)) || p.id - q.id);
  return background(scene.bg) + sorted.map(drawObject).join('');
}
