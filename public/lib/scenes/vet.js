// 장면 18: 동물병원 — 진찰대 위의 강아지, 수의사 선생님, 토끼를 안은 아이, 어항.

import { W, H, INK, pick, box, disc, oval, shape, line, bird, clock, fish, dog, person, headPos } from '../art.js';

const VET = { x: 520, y: 650, s: 1, hairStyle: 'bun', hair: '#5a3a2a', top: '#fff', bottom: '#5ab4e8', arms: [60, 10], shoes: '#fff' };
const KID = { x: 110, y: 790, s: 0.9, hs: 1.25, hairStyle: 'bob', hair: '#3a2630', top: '#ffb627', bottom: '#4f7be0', bottomType: 'skirt', arms: [-30, -30], shoes: '#ff7aa8' };
const vetHead = headPos(VET);
const kidHead = headPos(KID);
const BUNNY = { x: 110, y: 716 };

const diffs = [
  { id: 'windowBird', label: '창밖 새 색', cx: 120, cy: 120, r: 30 },
  { id: 'poster', label: '발바닥 그림 색', cx: 280, cy: 146, r: 44 },
  { id: 'clock', label: '시곗바늘', cx: 530, cy: 86, r: 40 },
  { id: 'bottle', label: '약병 색', cx: 424, cy: 196, r: 26 },
  { id: 'bottleGone', label: '약병 하나', cx: 516, cy: 196, r: 26 },
  { id: 'fish', label: '어항 물고기 색', cx: 80, cy: 410, r: 32 },
  { id: 'fishGone', label: '작은 물고기', cx: 150, cy: 434, r: 26 },
  { id: 'weed', label: '어항 수초 색', cx: 182, cy: 440, r: 22 },
  { id: 'vetGlasses', label: '선생님 안경', cx: vetHead.x, cy: vetHead.y, r: 34 },
  { id: 'stethoscope', label: '청진기 색', cx: VET.x - 10, cy: VET.y - 98, r: 26 },
  { id: 'badge', label: '이름표 색', cx: VET.x + 16, cy: VET.y - 104, r: 20 },
  { id: 'dogTongue', label: '강아지 혀', cx: 332, cy: 512, r: 22 },
  { id: 'bandage', label: '강아지 반창고', cx: 314, cy: 480, r: 22 },
  { id: 'table', label: '진찰대 색', cx: 300, cy: 584, r: 30 },
  { id: 'kidBow', label: '아이 리본', cx: kidHead.x + 27, cy: kidHead.y - 36, r: 24 },
  { id: 'bunnyEar', label: '토끼 귀 속 색', cx: BUNNY.x, cy: BUNNY.y - 54, r: 28 },
  { id: 'plant', label: '화분 꽃 색', cx: 556, cy: 522, r: 26 },
  { id: 'mat', label: '바닥 매트 색', cx: 320, cy: 760, r: 40 },
];

function room(v) {
  return (
    `<rect width="${W}" height="${H}" fill="#d4f0ec"/>` +
    `<rect y="600" width="${W}" height="${H - 600}" fill="#e8d9c6"/>` + box(-5, 592, W + 10, 12, '#fff', 0) +
    box(30, 70, 150, 140, '#fff', 4) + box(40, 80, 130, 120, '#bfe9ff', 0, 3) + shape('M40 200V176Q80 156 120 176T170 172V200Z', '#7fcf6a', 3) +
    line('M105 80V200M40 140H170', 4) + bird(120, 120, pick(v, 'windowBird', '#ffd23f', '#ff5b5b')) +
    box(226, 84, 108, 124, '#fff7e0', 4, 3) +
    (() => {
      const c = pick(v, 'poster', '#ff7aa8', '#4fb3ff');
      return oval(280, 160, 24, 20, c, 3) + disc(256, 126, 9, c, 3) + disc(274, 116, 9, c, 3) + disc(292, 116, 9, c, 3) + disc(308, 128, 9, c, 3);
    })() +
    clock(530, 86, 34, '#ff8a3d', ...pick(v, 'clock', [90, 180], [270, 180])) +
    // 약 선반
    box(396, 226, 190, 12, '#a7744a', 3) +
    box(410, 176, 28, 50, pick(v, 'bottle', '#ff5b5b', '#5cc46e'), 6) + box(414, 166, 20, 12, '#fff', 3, 3) +
    box(456, 186, 28, 40, '#ffd23f', 6) + box(460, 176, 20, 12, '#fff', 3, 3) +
    pick(v, 'bottleGone', box(502, 176, 28, 50, '#7b6cf6', 6) + box(506, 166, 20, 12, '#fff', 3, 3), '') +
    box(548, 186, 28, 40, '#4fb3ff', 6) + box(552, 176, 20, 12, '#fff', 3, 3)
  );
}

function tank(v) {
  return (
    box(20, 470, 190, 124, '#c98a55') + line('M115 482V584', 3) + disc(100, 530, 4, '#fff', 2) + disc(130, 530, 4, '#fff', 2) +
    box(24, 360, 182, 110, '#bfe9ff', 6) + `<rect x="27" y="446" width="176" height="20" fill="#f2d88f"/>` +
    `<path d="M182 464Q174 446 182 430Q190 414 182 400" fill="none" stroke="${pick(v, 'weed', '#3fb56a', '#ff7aa8')}" stroke-width="8" stroke-linecap="round"/>` +
    fish(80, 410, 0.55, pick(v, 'fish', '#ff8a3d', '#ffd23f'), { fin: '#ff5b5b' }) +
    pick(v, 'fishGone', fish(150, 434, 0.4, '#7fe0a0', { dir: -1, fin: '#3c9d5d' }), '') +
    `<circle cx="110" cy="384" r="5" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="118" cy="372" r="3.5" fill="none" stroke="#fff" stroke-width="2.5"/>`
  );
}

function table(v) {
  return box(210, 600, 18, 150, '#9aa0b8', 3) + box(392, 600, 18, 150, '#9aa0b8', 3) + box(190, 566, 240, 36, pick(v, 'table', '#7fd0f0', '#ff9fbd'), 8);
}

function bunny(v) {
  const { x, y } = BUNNY;
  const inner = pick(v, 'bunnyEar', '#ffb3c7', '#ffe27a');
  return oval(x - 12, y - 50, 9, 24, '#fff', 3) + oval(x + 12, y - 50, 9, 24, '#fff', 3) +
    oval(x - 12, y - 50, 4, 15, inner, 0) + oval(x + 12, y - 50, 4, 15, inner, 0) +
    oval(x, y, 30, 24, '#fff') + disc(x, y - 22, 20, '#fff') +
    `<circle cx="${x - 7}" cy="${y - 24}" r="3" fill="${INK}"/><circle cx="${x + 7}" cy="${y - 24}" r="3" fill="${INK}"/><ellipse cx="${x}" cy="${y - 16}" rx="3" ry="2" fill="#ff7aa8"/>`;
}

function draw(v) {
  return (
    room(v) +
    tank(v) +
    shape('M536 594L576 594L570 556L542 556Z', '#ff8a3d') + line('M556 556V534', 4) + disc(556, 522, 12, pick(v, 'plant', '#ff5b8a', '#ffd23f'), 3) +
    oval(320, 760, 150, 26, pick(v, 'mat', '#ffd98a', '#a8e0ff'), 3) +
    person({ ...VET, glasses: !v.has('vetGlasses') }) +
    `<path d="M${VET.x - 14} ${VET.y - 128}Q${VET.x - 22} ${VET.y - 96} ${VET.x - 8} ${VET.y - 84}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M${VET.x - 14} ${VET.y - 128}Q${VET.x - 22} ${VET.y - 96} ${VET.x - 8} ${VET.y - 84}" fill="none" stroke="${pick(v, 'stethoscope', '#4fb3ff', '#ff5b5b')}" stroke-width="4" stroke-linecap="round"/>` +
    disc(VET.x - 8, VET.y - 82, 7, '#c9c8d8', 3) +
    box(VET.x + 6, VET.y - 112, 22, 14, pick(v, 'badge', '#ffd23f', '#ff7aa8'), 3, 2.5) +
    table(v) +
    dog(320, 568, 1, '#f3d6a8', { tongue: !v.has('dogTongue') }) +
    pick(v, 'bandage', `<g transform="rotate(-30 314 480)">` + box(298, 474, 32, 12, '#fff2cf', 3, 2.5) + `</g>`, '') +
    person({ ...KID, bow: pick(v, 'kidBow', '#ff5b8a', null) }) +
    bunny(v)
  );
}

export default { id: 'vet', title: '동물병원', diffs, draw };
