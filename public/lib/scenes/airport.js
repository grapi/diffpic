// 장면 27: 공항 — 날아가는 비행기, 관제탑, 계단차 앞의 비행기, 조종사와 승무원.

import { W, H, INK, pick, box, disc, oval, shape, line, cloud, person, headPos, handPos } from '../art.js';

const PILOT = { x: 330, y: 790, s: 1, hairStyle: 'cap', top: '#3d4f8f', bottom: '#3d4f8f', arms: [10, 10], shoes: '#3d3b52', mouth: 'smile' };
const ATTENDANT = { x: 460, y: 790, s: 1, hairStyle: 'bun', hair: '#3a2630', top: '#ff5b5b', bottom: '#3d4f8f', bottomType: 'skirt', arms: [10, 30], shoes: '#3d3b52' };
const KID = { x: 150, y: 790, s: 0.9, hs: 1.25, hairStyle: 'side', hair: '#3a2630', top: '#ffd23f', bottom: '#4f7be0', bottomType: 'shorts', arms: [10, 150], shoes: '#ff5b5b' };
const pilotHead = headPos(PILOT);
const attHead = headPos(ATTENDANT);
const toyHand = handPos(KID, 1);

const diffs = [
  { id: 'flying', label: '날아가는 비행기 색', cx: 170, cy: 90, r: 44 },
  { id: 'cloudGone', label: '구름', cx: 380, cy: 70, r: 40 },
  { id: 'towerGlass', label: '관제탑 유리 색', cx: 520, cy: 150, r: 38 },
  { id: 'antenna', label: '관제탑 안테나', cx: 520, cy: 92, r: 24 },
  { id: 'windsock', label: '바람자루 줄무늬', cx: 76, cy: 272, r: 30 },
  { id: 'tail', label: '꼬리날개 색', cx: 74, cy: 362, r: 40 },
  { id: 'window', label: '비행기 창문 하나', cx: 300, cy: 410, r: 20 },
  { id: 'door', label: '비행기 문 색', cx: 430, cy: 420, r: 24 },
  { id: 'engine', label: '엔진 색', cx: 250, cy: 484, r: 34 },
  { id: 'stairs', label: '계단차 색', cx: 470, cy: 500, r: 36 },
  { id: 'light', label: '활주로 불빛 색', cx: 40, cy: 560, r: 22 },
  { id: 'badge', label: '조종사 모자 배지', cx: pilotHead.x, cy: pilotHead.y - 30, r: 22 },
  { id: 'scarf', label: '승무원 스카프 색', cx: ATTENDANT.x, cy: ATTENDANT.y - 128, r: 22 },
  { id: 'toyPlane', label: '아이 손의 장난감 비행기', cx: toyHand.x + 6, cy: toyHand.y - 6, r: 28 },
  { id: 'backpack', label: '아이 가방 색', cx: KID.x - 36, cy: KID.y - 90, r: 24 },
  { id: 'suitcase', label: '여행가방 색', cx: 560, cy: 734, r: 30 },
  { id: 'cone', label: '고깔', cx: 240, cy: 770, r: 24 },
];

function plane(x, y, s, color) {
  return `<g transform="translate(${x} ${y}) scale(${s})">` +
    shape('M-60 -4Q-20 -12 50 -8Q66 -4 50 4Q-20 8 -60 4Z', '#fff', 3) + shape('M-10 -6L-30 -34L-16 -34L10 -6Z', color, 3) + shape('M-10 4L-30 30L-16 30L10 4Z', color, 3) + shape('M-56 -2L-66 -22L-54 -22L-46 -4Z', color, 3) + `</g>`;
}

function sky(v) {
  return (
    `<defs><linearGradient id="ap-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fcdf6"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#ap-sky)"/>` +
    plane(170, 90, 1.1, pick(v, 'flying', '#ff5b5b', '#5cc46e')) +
    pick(v, 'cloudGone', cloud(380, 70, 0.8), '') + cloud(300, 200, 0.6) +
    // 관제탑
    box(500, 180, 40, 360, '#e9e9f2') + shape('M472 120H568L556 184H484Z', pick(v, 'towerGlass', '#7fd0f0', '#ffd98a')) + box(468, 110, 104, 14, '#9aa0b8', 3) +
    pick(v, 'antenna', line('M520 110V80', 4) + disc(520, 76, 5, '#ff3b3b', 2.5), '') +
    // 바람자루
    line('M40 560V250', 5) +
    shape('M42 254L110 262L108 290L42 296Z', '#fff', 3) + [[42, 58], [74, 90]].map(([a, b]) => shape(`M${a} ${254 + (a - 42) * 0.12}L${b} ${254 + (b - 42) * 0.12}L${b} ${296 - (b - 42) * 0.1}L${a} ${296 - (a - 42) * 0.1}Z`, pick(v, 'windsock', '#ff8a3d', '#4fb3ff'), 0)).join('') +
    `<rect y="540" width="${W}" height="${H - 540}" fill="#9aa0b8"/>` + `<path d="M0 540H${W}" stroke="${INK}" stroke-width="4"/>` +
    `<path d="M0 640H${W}" stroke="#fff" stroke-width="8" stroke-dasharray="40 30"/>` +
    disc(40, 560, 9, pick(v, 'light', '#ffd23f', '#5cc46e'), 3) + disc(160, 560, 9, '#ffd23f', 3) + disc(560, 560, 9, '#ffd23f', 3)
  );
}

function airliner(v) {
  const windows = [180, 220, 260, 300, 340, 380];
  return (
    shape('M60 400L40 312L96 312L140 400Z', pick(v, 'tail', '#4fb3ff', '#ff8a3d')) +
    shape('M50 400Q50 380 90 380H500Q560 384 580 420Q560 456 500 460H90Q50 460 50 440Z', '#fff') +
    shape('M500 384Q546 386 566 410H520Z', '#7fd0f0', 3) +
    windows.map((x) => (x === 300 && v.has('window') ? '' : disc(x, 410, 8, '#7fd0f0', 3))).join('') +
    box(418, 396, 26, 48, pick(v, 'door', '#e9e9f2', '#ffd23f'), 4, 3) +
    shape('M200 448L330 448L270 500L180 500Z', '#e9e9f2') +
    box(214, 470, 72, 30, pick(v, 'engine', '#9aa0b8', '#ff5b5b'), 14) + disc(286, 485, 12, '#3d3b52', 3) +
    disc(120, 470, 12, '#3d3b52') + disc(460, 470, 12, '#3d3b52')
  );
}

function stairs(v) {
  const c = pick(v, 'stairs', '#ffd23f', '#5cc46e');
  return shape('M444 444L456 444L520 540L506 540Z', c) + [460, 476, 492, 508].map((y) => `<path d="M${444 + (y - 444) * 0.66} ${y}H${474 + (y - 444) * 0.66}" stroke="${INK}" stroke-width="4"/>`).join('') +
    box(470, 530, 90, 30, c, 6) + disc(490, 566, 10, '#3d3b52') + disc(546, 566, 10, '#3d3b52');
}

function draw(v) {
  return (
    sky(v) +
    airliner(v) +
    stairs(v) +
    pick(v, 'cone', shape('M224 790L240 746L256 790Z', '#ff8a3d', 3) + `<path d="M232 768H248" stroke="#fff" stroke-width="5"/>`, '') +
    box(530, 700, 60, 70, pick(v, 'suitcase', '#7b6cf6', '#ff7aa8'), 8) + line('M548 700Q560 684 572 700', 4) +
    person(PILOT) +
    pick(v, 'badge', disc(pilotHead.x, pilotHead.y - 30, 7, '#ffd23f', 2.5), '') +
    person(ATTENDANT) +
    shape(`M${ATTENDANT.x - 14} ${ATTENDANT.y - 136}L${ATTENDANT.x} ${ATTENDANT.y - 120}L${ATTENDANT.x + 14} ${ATTENDANT.y - 136}L${ATTENDANT.x + 6} ${ATTENDANT.y - 110}L${ATTENDANT.x - 6} ${ATTENDANT.y - 110}Z`, pick(v, 'scarf', '#ffd23f', '#4fb3ff'), 3) +
    box(KID.x - 52, KID.y - 120, 32, 50, pick(v, 'backpack', '#5cc46e', '#ff5b5b'), 10) +
    person(KID) +
    pick(v, 'toyPlane', plane(toyHand.x + 6, toyHand.y - 8, 0.4, '#4fb3ff'), '')
  );
}

export default { id: 'airport', title: '공항', diffs, draw };
