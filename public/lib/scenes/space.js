// 장면 10: 우주 탐험 — 달 표면의 우주비행사, 로켓, 외계인과 비행접시.

import { W, H, INK, pick, box, disc, oval, shape, line, star, sparkle, person, headPos } from '../art.js';

const ASTRO = { x: 170, y: 690, s: 0.95, hs: 1.2, hairStyle: 'short', hair: '#3a2630', top: '#f4f4f8', bottom: '#d8d8e6', arms: [120, 30], shoes: '#8d8fa8' };
const head = headPos(ASTRO);

const diffs = [
  { id: 'earth', label: '지구 대륙 색', cx: 90, cy: 96, r: 54 },
  { id: 'starGone', label: '큰 별', cx: 230, cy: 60, r: 26 },
  { id: 'starColor', label: '분홍 별 색', cx: 300, cy: 200, r: 26 },
  { id: 'comet', label: '혜성', cx: 330, cy: 82, r: 44 },
  { id: 'saturn', label: '토성 고리 색', cx: 520, cy: 90, r: 60 },
  { id: 'ufo', label: '비행접시 색', cx: 100, cy: 280, r: 50 },
  { id: 'ufoLight', label: '비행접시 불빛', cx: 100, cy: 350, r: 28 },
  { id: 'rocketTip', label: '로켓 머리 색', cx: 440, cy: 232, r: 40 },
  { id: 'rocketWindow', label: '로켓 창문', cx: 440, cy: 332, r: 32 },
  { id: 'rocketFin', label: '로켓 날개 색', cx: 372, cy: 500, r: 30 },
  { id: 'flame', label: '로켓 받침', cx: 440, cy: 560, r: 30 },
  { id: 'helmet', label: '헬멧 띠 색', cx: head.x, cy: head.y - 40, r: 30 },
  { id: 'suitBadge', label: '우주복 별 표시', cx: ASTRO.x, cy: ASTRO.y - 100, r: 24 },
  { id: 'flag', label: '깃발 색', cx: 40, cy: 500, r: 34 },
  { id: 'alien', label: '외계인 더듬이', cx: 320, cy: 590, r: 32 },
  { id: 'alienColor', label: '외계인 색', cx: 320, cy: 670, r: 36 },
  { id: 'rover', label: '탐사차 바퀴 색', cx: 490, cy: 744, r: 34 },
  { id: 'roverDish', label: '탐사차 안테나', cx: 520, cy: 640, r: 32 },
  { id: 'crater', label: '작은 분화구', cx: 64, cy: 742, r: 34 },
];

function background(v) {
  const dots = [[30, 190], [190, 150], [160, 40], [420, 30], [590, 200], [260, 300], [340, 420], [220, 420], [30, 430], [570, 340], [400, 150], [280, 500]];
  const land = pick(v, 'earth', '#5cc46e', '#ffb627');
  return (
    `<defs><linearGradient id="sp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14123c"/><stop offset="1" stop-color="#3f2f7c"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#sp-sky)"/>` +
    dots.map(([x, y]) => sparkle(x, y, 7)).join('') +
    disc(90, 96, 46, '#4fb3ff') + shape('M60 72Q84 60 96 80Q84 104 62 96Z', land, 3) + shape('M100 108Q124 96 130 116Q116 136 100 124Z', land, 3) +
    pick(v, 'starGone', star(230, 60, 20, '#fff'), '') +
    star(300, 200, 20, pick(v, 'starColor', '#ff9fd0', '#ffd23f')) +
    pick(v, 'comet', `<path d="M284 56L352 94" stroke="#bfe9ff" stroke-width="10" stroke-linecap="round"/><path d="M296 46L352 94M276 70L352 94" stroke="#fff" stroke-width="3"/>` + disc(358, 98, 15, '#ffe27a', 3), '')
  );
}

function saturn(v) {
  const ring = pick(v, 'saturn', '#ffd98a', '#7fe0c8');
  return `<ellipse cx="520" cy="94" rx="74" ry="16" fill="none" stroke="${INK}" stroke-width="16" transform="rotate(-14 520 94)"/>` +
    `<ellipse cx="520" cy="94" rx="74" ry="16" fill="none" stroke="${ring}" stroke-width="9" transform="rotate(-14 520 94)"/>` +
    disc(520, 94, 40, '#ff9f6b') + `<path d="M484 84Q520 76 556 84M482 102Q520 96 558 102" fill="none" stroke="#e8784a" stroke-width="5"/>` +
    `<path d="M446 112A74 16 -14 0 0 594 76" fill="none" stroke="${INK}" stroke-width="16"/><path d="M446 112A74 16 -14 0 0 594 76" fill="none" stroke="${ring}" stroke-width="9"/>`;
}

function ufo(v) {
  return pick(v, 'ufoLight', shape('M76 320L52 378H148L124 320Z', '#fff27a', 3), '') +
    shape('M62 278Q64 234 100 234Q136 234 138 278Z', '#bfe9ff') +
    oval(100, 290, 62, 22, pick(v, 'ufo', '#ff7aa8', '#5cc46e')) +
    disc(64, 292, 6, '#ffd23f', 2.5) + disc(100, 298, 6, '#ffd23f', 2.5) + disc(136, 292, 6, '#ffd23f', 2.5);
}

function moon() {
  return shape(`M0 590Q150 550 300 584T${W} 570V${H}H0Z`, '#c9c8d8') +
    oval(250, 770, 44, 14, '#a9a8bc', 3) + oval(390, 700, 30, 10, '#a9a8bc', 3);
}

function rocket(v) {
  const fin = pick(v, 'rocketFin', '#ff5b5b', '#4fb3ff');
  return shape('M380 470L346 540L392 524Z', fin) + shape('M500 470L534 540L488 524Z', fin) +
    pick(v, 'flame', box(392, 544, 96, 26, '#8d8fa8', 4), '') +
    shape('M384 274Q440 150 496 274L502 516Q440 556 378 516Z', '#f4f4f8') +
    shape('M400 240Q440 150 480 240Q440 262 400 240Z', pick(v, 'rocketTip', '#ff5b5b', '#ffd23f')) +
    disc(440, 332, 26, '#a7744a') + pick(v, 'rocketWindow', disc(440, 332, 16, '#7fd0f0', 3), disc(440, 332, 16, '#ffe27a', 3)) +
    `<path d="M380 430Q440 450 500 430" fill="none" stroke="#ff5b5b" stroke-width="10"/>` +
    line('M380 424Q440 444 500 424M380 438Q440 458 500 438', 3);
}

function astronaut(v) {
  return `<path d="M40 620V456" stroke="${INK}" stroke-width="6"/>` +
    shape('M42 462L88 478L42 504Z', pick(v, 'flag', '#ff5b5b', '#4fb3ff'), 3) +
    person({ ...ASTRO }) +
    pick(v, 'suitBadge', star(ASTRO.x, ASTRO.y - 100, 14, '#ffd23f', 2.5), '') +
    `<circle cx="${head.x}" cy="${head.y}" r="44" fill="#bfe9ff" fill-opacity="0.3" stroke="${INK}" stroke-width="5"/>` +
    `<path d="M${head.x - 36} ${head.y - 26}Q${head.x} ${head.y - 56} ${head.x + 36} ${head.y - 26}" fill="none" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>` +
    `<path d="M${head.x - 36} ${head.y - 26}Q${head.x} ${head.y - 56} ${head.x + 36} ${head.y - 26}" fill="none" stroke="${pick(v, 'helmet', '#ff8a3d', '#7b6cf6')}" stroke-width="9" stroke-linecap="round"/>`;
}

function alien(v) {
  const c = pick(v, 'alienColor', '#8ae06a', '#ff9fd0');
  return pick(v, 'alien', line('M304 620L290 584M336 620L350 584', 4) + disc(288, 578, 8, '#ffd23f', 3) + disc(352, 578, 8, '#ffd23f', 3), line('M320 618V584', 4) + disc(320, 578, 8, '#ffd23f', 3)) +
    box(296, 660, 48, 62, c, 16) + `<path d="M298 682L276 700M342 682L364 664" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>` +
    oval(320, 640, 36, 28, c) + disc(308, 636, 9, '#fff', 3) + disc(332, 636, 9, '#fff', 3) +
    `<circle cx="308" cy="637" r="4" fill="${INK}"/><circle cx="332" cy="637" r="4" fill="${INK}"/><path d="M312 654Q320 660 328 654" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
}

function rover(v) {
  const wheel = pick(v, 'rover', '#3d3b52', '#ff5b5b');
  return pick(v, 'roverDish', line('M520 680V646', 5) + shape('M496 636Q520 660 544 636Z', '#fff'), '') +
    box(432, 680, 136, 50, '#ffb627', 8) + box(446, 692, 40, 24, '#bfe9ff', 3, 3) + box(496, 692, 56, 24, '#3f7fd8', 3, 3) +
    disc(452, 748, 22, wheel) + disc(530, 748, 22, wheel) + disc(452, 748, 8, '#c9c8d8', 3) + disc(530, 748, 8, '#c9c8d8', 3);
}

function draw(v) {
  return (
    background(v) +
    saturn(v) +
    ufo(v) +
    moon() +
    pick(v, 'crater', oval(64, 742, 42, 14, '#a9a8bc', 3), '') +
    rocket(v) +
    astronaut(v) +
    alien(v) +
    rover(v)
  );
}

export default { id: 'space', title: '우주 탐험', diffs, draw };
