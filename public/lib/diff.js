// 장면 → 퍼즐. 장면마다 '바뀔 수 있는 곳' 후보가 15~20개 있고, 그중 5개를 무작위로 골라
// 오른쪽 그림에만 적용한다. 같은 장면도 매번 다른 문제가 된다.
//
// 보장하는 것 (test/diff.test.js 가 검증):
//   - 틀린 곳은 정확히 5개
//   - 판정 원끼리 겹치지 않는다 — 한 번 누른 곳이 두 군데로 판정되는 일이 없다
//   - 고른 5곳 말고는 두 그림이 완전히 같다

import { makeRng } from './rng.js';
import living from './scenes/living.js';
import picnic from './scenes/picnic.js';
import kitchen from './scenes/kitchen.js';
import classroom from './scenes/classroom.js';
import beach from './scenes/beach.js';
import playground from './scenes/playground.js';
import camping from './scenes/camping.js';
import snow from './scenes/snow.js';
import undersea from './scenes/undersea.js';
import space from './scenes/space.js';
import farm from './scenes/farm.js';
import bakery from './scenes/bakery.js';
import amusement from './scenes/amusement.js';
import bedroom from './scenes/bedroom.js';
import zoo from './scenes/zoo.js';
import rainy from './scenes/rainy.js';
import market from './scenes/market.js';
import vet from './scenes/vet.js';
import station from './scenes/station.js';
import fire from './scenes/fire.js';
import garden from './scenes/garden.js';
import halloween from './scenes/halloween.js';
import pool from './scenes/pool.js';
import concert from './scenes/concert.js';
import museum from './scenes/museum.js';
import forest from './scenes/forest.js';
import airport from './scenes/airport.js';
import artroom from './scenes/artroom.js';
import soccer from './scenes/soccer.js';
import bath from './scenes/bath.js';

export const SCENES = [
  living, picnic, kitchen, classroom, beach, playground, camping, snow, undersea, space, farm, bakery, amusement, bedroom, zoo,
  rainy, market, vet, station, fire, garden, halloween, pool, concert, museum, forest, airport, artroom, soccer, bath,
];
export const DIFF_COUNT = 5;
const MAX_ATTEMPTS = 50;

// 두 그림이 한 문서에 들어가므로 패턴·그라데이션 id 가 겹치지 않게 그림마다 접두어를 붙인다.
// (겹치면 한쪽이 숨겨졌을 때 다른 쪽 무늬까지 사라진다)
function scope(svg, prefix) {
  return svg.replace(/id="/g, `id="${prefix}-`).replace(/url\(#/g, `url(#${prefix}-`);
}

// 후보를 섞어 앞에서부터 판정 원이 겹치지 않는 것만 담는다.
function choose(scene, rng) {
  const chosen = [];
  for (const d of rng.shuffle(scene.diffs)) {
    if (chosen.every((c) => Math.hypot(c.cx - d.cx, c.cy - d.cy) >= c.r + d.r)) chosen.push(d);
    if (chosen.length === DIFF_COUNT) return chosen;
  }
  return null;
}

export function makePuzzle(seed, sceneIndex) {
  const scene = SCENES[sceneIndex];
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const s = (seed + attempt * 0x9e3779b1) >>> 0;
    const chosen = choose(scene, makeRng(s));
    if (!chosen) continue;
    return {
      seed: s,
      scene: scene.id,
      title: scene.title,
      left: scope(scene.draw(new Set()), 'L'),
      right: scope(scene.draw(new Set(chosen.map((d) => d.id))), 'R'),
      spots: chosen.map(({ id, label, cx, cy, r }) => ({ id, label, cx, cy, r })),
    };
  }
  throw new Error(`퍼즐을 만들지 못했습니다 (seed ${seed}, scene ${scene.id})`);
}

// i 번째 틀린 곳만 바꾼 그림. 달라진 자리를 찾는 데 쓴다 (lib/hit.js).
export function spotVariant(puzzle, i) {
  return SCENES.find((s) => s.id === puzzle.scene).draw(new Set([puzzle.spots[i].id]));
}
