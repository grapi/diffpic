// 장면 30: 목욕 시간 — 거품 가득한 욕조의 아이, 고무 오리와 장난감 배, 세면대와 수건.

import { W, H, INK, pick, blob, box, disc, oval, shape, line, cloud, person, headPos } from '../art.js';

const KID = { x: 330, y: 640, s: 0.95, hs: 1.25, legs: false, hairStyle: 'short', hair: '#5a3a2a', top: '#ffd8c2', arms: [140, 140], mouth: 'open' };
const kidHead = headPos(KID);

const diffs = [
  { id: 'windowCloud', label: '창밖 구름', cx: 110, cy: 110, r: 30 },
  { id: 'plant', label: '창가 화분 꽃 색', cx: 180, cy: 152, r: 22 },
  { id: 'mirror', label: '거울 테두리 색', cx: 470, cy: 68, r: 24 },
  { id: 'cup', label: '양치컵 색', cx: 440, cy: 244, r: 22 },
  { id: 'toothbrush', label: '칫솔 색', cx: 446, cy: 212, r: 20 },
  { id: 'soap', label: '비누', cx: 520, cy: 252, r: 22 },
  { id: 'towel', label: '수건 색', cx: 70, cy: 320, r: 34 },
  { id: 'towelStripe', label: '수건 줄무늬', cx: 70, cy: 366, r: 24 },
  { id: 'shower', label: '샤워기 색', cx: 210, cy: 296, r: 26 },
  { id: 'drops', label: '샤워기 물방울', cx: 226, cy: 350, r: 24 },
  { id: 'hairFoam', label: '머리 위 거품', cx: kidHead.x, cy: kidHead.y - 48, r: 30 },
  { id: 'duck', label: '고무 오리 색', cx: 230, cy: 552, r: 28 },
  { id: 'duckGone', label: '작은 오리', cx: 470, cy: 556, r: 24 },
  { id: 'boat', label: '장난감 배 돛 색', cx: 410, cy: 530, r: 26 },
  { id: 'shampoo', label: '샴푸 병 색', cx: 560, cy: 560, r: 26 },
  { id: 'tub', label: '욕조 발 색', cx: 170, cy: 714, r: 22 },
  { id: 'mat', label: '발매트 색', cx: 330, cy: 760, r: 40 },
  { id: 'slippers', label: '슬리퍼 색', cx: 540, cy: 760, r: 30 },
];

function room(v) {
  return (
    `<defs><pattern id="bt-tile" width="50" height="50" patternUnits="userSpaceOnUse"><rect width="50" height="50" fill="#d8f1fb"/><path d="M0 0H50V50" fill="none" stroke="#b5dcef" stroke-width="3"/></pattern></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#bt-tile)"/>` +
    `<rect y="700" width="${W}" height="${H - 700}" fill="#f4e6d4"/>` + `<path d="M0 700H${W}" stroke="${INK}" stroke-width="4"/>` +
    box(40, 60, 150, 120, '#fff', 4) + box(50, 70, 130, 100, '#bfe9ff', 0, 3) + pick(v, 'windowCloud', cloud(110, 110, 0.6), '') + line('M115 70V170M50 120H180', 4) +
    box(30, 176, 170, 12, '#fff', 3, 3) + shape('M170 176L190 176L186 160L174 160Z', '#ff8a3d', 3) + disc(180, 152, 9, pick(v, 'plant', '#ff5b8a', '#ffd23f'), 3) +
    // 세면대
    box(420, 60, 100, 140, pick(v, 'mirror', '#ffd23f', '#7b6cf6'), 30) + box(432, 72, 76, 116, '#e9f9ff', 24, 3) +
    box(400, 264, 160, 20, '#fff', 6) + box(456, 284, 48, 110, '#fff', 4) +
    box(428, 232, 26, 32, pick(v, 'cup', '#ff7aa8', '#5cc46e'), 5) + line('M440 232L446 196', 5) + box(442, 190, 10, 12, pick(v, 'toothbrush', '#4fb3ff', '#ff8a3d'), 2, 2.5) +
    pick(v, 'soap', oval(520, 256, 18, 9, '#ffe27a', 3), '') +
    // 수건
    line('M20 290H130', 6) +
    shape('M30 292H110V390H30Z', pick(v, 'towel', '#ff9fbd', '#7fd0f0')) + pick(v, 'towelStripe', `<path d="M30 360H110M30 374H110" stroke="#fff" stroke-width="6"/>`, '') + box(30, 292, 80, 98, 'none', 0)
  );
}

function shower(v) {
  return `<path d="M260 0V240Q260 270 230 280" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M260 0V240Q260 270 230 280" fill="none" stroke="#c9c8d8" stroke-width="5" stroke-linecap="round"/>` +
    shape('M190 280L236 280L224 306L202 306Z', pick(v, 'shower', '#c9c8d8', '#ff8a3d')) +
    pick(v, 'drops', `<path d="M206 330V344M222 338V352M238 330V344M214 362V374M232 364V376" stroke="#4fb3ff" stroke-width="5" stroke-linecap="round"/>`, '');
}

function tub(v) {
  const foam = [[160, 540, 28], [200, 520, 30], [250, 532, 26], [400, 520, 30], [450, 536, 26], [490, 524, 26]];
  return blob(foam, '#fff', 3) +
    box(110, 546, 440, 150, '#fff', 30) + box(100, 540, 460, 22, '#fff', 11) +
    disc(170, 712, 14, pick(v, 'tub', '#ffd23f', '#ff5b5b')) + disc(490, 712, 14, pick(v, 'tub', '#ffd23f', '#ff5b5b'));
}

function toys(v) {
  const duck = (x, y, s, c) => oval(x, y, 22 * s, 14 * s, c, 3) + disc(x + 14 * s, y - 16 * s, 12 * s, c, 3) + shape(`M${x + 24 * s} ${y - 18 * s}L${x + 36 * s} ${y - 14 * s}L${x + 24 * s} ${y - 10 * s}Z`, '#ff8a3d', 2) + `<circle cx="${x + 16 * s}" cy="${y - 19 * s}" r="2.5" fill="${INK}"/>`;
  return duck(224, 548, 1.1, pick(v, 'duck', '#ffd23f', '#ff7aa8')) + pick(v, 'duckGone', duck(466, 552, 0.8, '#ffd23f'), '') +
    shape('M386 540H434L426 554H394Z', '#ff5b5b', 3) + line('M410 540V506', 3) + shape('M412 508L436 534H412Z', pick(v, 'boat', '#fff', '#4fb3ff'), 3);
}

function draw(v) {
  return (
    room(v) +
    shower(v) +
    person(KID) +
    pick(v, 'hairFoam', blob([[kidHead.x - 20, kidHead.y - 44, 16], [kidHead.x + 2, kidHead.y - 54, 18], [kidHead.x + 22, kidHead.y - 44, 15]], '#fff', 3), '') +
    tub(v) +
    toys(v) +
    box(544, 520, 32, 54, pick(v, 'shampoo', '#7b6cf6', '#5cc46e'), 8) + box(552, 508, 16, 14, '#fff', 3, 3) +
    oval(330, 762, 110, 24, pick(v, 'mat', '#ffd98a', '#a8e0ff'), 3) +
    oval(524, 764, 14, 22, pick(v, 'slippers', '#ff7aa8', '#5cc46e'), 3) + oval(556, 764, 14, 22, pick(v, 'slippers', '#ff7aa8', '#5cc46e'), 3)
  );
}

export default { id: 'bath', title: '목욕 시간', diffs, draw };
