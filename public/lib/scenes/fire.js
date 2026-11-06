// 장면 20: 소방서 — 사다리차와 소방관, 점박이 강아지, 나무 위 고양이.

import { W, H, INK, pick, box, disc, oval, shape, line, cloud, tree, tube, cat, dog, person, headPos, handPos } from '../art.js';

const FIREFIGHTER = { x: 130, y: 786, s: 1, hairStyle: 'cap', top: '#3d3b52', bottom: '#3d3b52', stripes: '#ffd23f', arms: [10, 60], shoes: '#3d3b52', mouth: 'open' };
const KID = { x: 380, y: 790, s: 0.84, hs: 1.25, hairStyle: 'pigtails', hair: '#5a3a2a', bottom: '#ff7aa8', bottomType: 'skirt', arms: [150, 150], shoes: '#fff' };
const ffHead = headPos(FIREFIGHTER);
const nozzle = handPos(FIREFIGHTER, 1);

const diffs = [
  { id: 'cloudGone', label: '구름', cx: 470, cy: 60, r: 42 },
  { id: 'bell', label: '종 색', cx: 210, cy: 124, r: 28 },
  { id: 'towerFlag', label: '탑 깃발 색', cx: 238, cy: 46, r: 26 },
  { id: 'doorWindow', label: '차고 문 창문', cx: 124, cy: 340, r: 30 },
  { id: 'inCab', label: '운전석의 소방관', cx: 530, cy: 566, r: 28 },
  { id: 'siren', label: '경광등 색', cx: 530, cy: 510, r: 24 },
  { id: 'rung', label: '사다리 칸', cx: 340, cy: 542, r: 22 },
  { id: 'stripe', label: '차 줄무늬 색', cx: 280, cy: 628, r: 26 },
  { id: 'hub', label: '바퀴 가운데 색', cx: 530, cy: 700, r: 28 },
  { id: 'headlight', label: '앞 등 색', cx: 578, cy: 640, r: 20 },
  { id: 'reel', label: '호스 감개 색', cx: 300, cy: 600, r: 28 },
  { id: 'helmet', label: '소방관 모자 색', cx: ffHead.x + 6, cy: ffHead.y - 22, r: 34 },
  { id: 'mustache', label: '소방관 콧수염', cx: ffHead.x, cy: ffHead.y + 6, r: 26 },
  { id: 'dogSpot', label: '강아지 눈 얼룩', cx: 478, cy: 728, r: 24 },
  { id: 'hydrant', label: '소화전 색', cx: 576, cy: 756, r: 26 },
  { id: 'catCollar', label: '나무 위 고양이 목걸이', cx: 520, cy: 352, r: 24 },
  { id: 'kidTop', label: '아이 옷 색', cx: KID.x, cy: KID.y - 88, r: 24 },
  { id: 'cone', label: '고깔', cx: 36, cy: 770, r: 26 },
];

function scene(v) {
  return (
    `<defs><linearGradient id="fr-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ad9f8"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#fr-sky)"/>` +
    pick(v, 'cloudGone', cloud(470, 60, 0.9), '') + cloud(330, 110, 0.6) +
    tree(530, 500, 1.25, '#4caf50') +
    cat(520, 404, 0.62, '#f4a340', { collar: pick(v, 'catCollar', '#4fb3ff', null) }) +
    // 소방서
    box(170, 92, 80, 68, '#d9483b') + shape('M162 94L210 60L258 94Z', '#a8302a') +
    `<path d="M238 62V26" stroke="${INK}" stroke-width="4"/>` + shape('M240 26L272 36L240 48Z', pick(v, 'towerFlag', '#ffd23f', '#5cc46e'), 3) +
    shape('M196 140Q196 108 210 108Q224 108 224 140Z', pick(v, 'bell', '#ffd23f', '#9aa0b8'), 3) +
    box(20, 160, 380, 400, '#d9483b') +
    box(100, 182, 220, 52, '#fff', 6) + `<text x="210" y="219" font-size="30" font-weight="800" fill="#d9483b" text-anchor="middle">소방서 119</text>` +
    box(44, 270, 160, 290, '#e9e9f2', 4) + box(216, 270, 160, 290, '#e9e9f2', 4) +
    `<path d="M44 360H204M44 420H204M44 480H204M216 360H376M216 420H376M216 480H376" stroke="#c9c8d8" stroke-width="4"/>` +
    pick(v, 'doorWindow', box(64, 290, 120, 50, '#bfe9ff', 3, 3), '') + box(236, 290, 120, 50, '#bfe9ff', 3, 3) +
    `<rect y="560" width="${W}" height="${H - 560}" fill="#c9c8d8"/>` + `<path d="M0 560H${W}" stroke="${INK}" stroke-width="4"/>`
  );
}

function truck(v) {
  const rungs = [280, 310, 340, 370, 400, 430, 460];
  return (
    box(250, 560, 260, 120, '#ff3b3b', 6) +
    box(480, 522, 100, 158, '#ff3b3b', 10) + box(498, 540, 64, 50, '#bfe9ff', 4, 3) +
    pick(v, 'inCab', disc(530, 570, 14, '#ffd8c2', 3) + box(514, 546, 32, 12, '#ffd23f', 4, 3), '') +
    box(510, 502, 40, 22, pick(v, 'siren', '#4fb3ff', '#ffb627'), 6) +
    line('M262 536H470M262 548H470', 6) +
    rungs.map((x) => (x === 340 && v.has('rung') ? '' : `<path d="M${x} 536V548" stroke="${INK}" stroke-width="5"/>`)).join('') +
    box(250, 620, 330, 16, pick(v, 'stripe', '#fff', '#ffd23f'), 0, 3) +
    disc(300, 600, 24, pick(v, 'reel', '#ffd23f', '#5cc46e')) + disc(300, 600, 9, '#c9c8d8', 3) +
    disc(578, 640, 11, pick(v, 'headlight', '#ffe27a', '#ff8a3d'), 3) +
    [310, 530].map((x) => disc(x, 700, 30, '#3d3b52') + disc(x, 700, 12, pick(v, 'hub', '#c9c8d8', '#ffd23f'), 3)).join('')
  );
}

function draw(v) {
  return (
    scene(v) +
    truck(v) +
    pick(v, 'cone', shape('M20 790L36 744L52 790Z', '#ff8a3d', 3) + `<path d="M28 768H44" stroke="#fff" stroke-width="5"/>`, '') +
    tube(`M300 600Q250 700 ${nozzle.x} ${nozzle.y}`, '#ffd23f', 8) +
    person({ ...FIREFIGHTER, hat: pick(v, 'helmet', '#ff3b3b', '#ffd23f'), mustache: pick(v, 'mustache', '#3a2630', null) }) +
    person({ ...KID, top: pick(v, 'kidTop', '#ffd23f', '#7fd0f0') }) +
    dog(470, 796, 0.85, '#fff', { patch: pick(v, 'dogSpot', INK, null) }) +
    shape('M562 790V744Q562 728 576 728Q590 728 590 744V790Z', pick(v, 'hydrant', '#ff3b3b', '#4fb3ff')) + box(556, 752, 40, 10, '#ffd23f', 3, 3)
  );
}

export default { id: 'fire', title: '소방서', diffs, draw };
