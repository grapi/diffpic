// 장면 24: 학예회 무대 — 드럼·기타·노래하는 아이들, 조명과 음표, 객석.

import { W, H, INK, pick, box, disc, oval, shape, line, star, flower, person, headPos, handPos } from '../art.js';

const DRUMMER = { x: 300, y: 520, s: 0.8, hs: 1.25, sit: true, legs: false, hairStyle: 'spiky', hair: '#3a2630', top: '#5cc46e', arms: [130, 130] };
const GUITAR = { x: 120, y: 650, s: 0.9, hs: 1.25, hairStyle: 'cap', top: '#ffd23f', bottom: '#3d4f8f', arms: [-30, 30], shoes: '#fff' };
const SINGER = { x: 480, y: 650, s: 0.9, hs: 1.25, hairStyle: 'pigtails', hair: '#5a3a2a', top: '#ff7aa8', bottom: '#7b6cf6', bottomType: 'skirt', arms: [150, -10], shoes: '#ffd23f', mouth: 'o' };
const singerHead = headPos(SINGER);
const stickL = handPos(DRUMMER, -1);
const stickR = handPos(DRUMMER, 1);

const diffs = [
  { id: 'tassel', label: '커튼 끈 색', cx: 48, cy: 330, r: 26 },
  { id: 'bannerStar', label: '현수막 별 색', cx: 470, cy: 60, r: 26 },
  { id: 'spot', label: '조명 빛 색', cx: 170, cy: 200, r: 44 },
  { id: 'note1', label: '음표 색', cx: 220, cy: 270, r: 26 },
  { id: 'note2', label: '음표 하나', cx: 420, cy: 250, r: 26 },
  { id: 'drum', label: '큰북 색', cx: 300, cy: 500, r: 44 },
  { id: 'cymbal', label: '심벌즈', cx: 396, cy: 396, r: 30 },
  { id: 'drumHair', label: '드럼 아이 머리 색', cx: 300, cy: 360, r: 30 },
  { id: 'guitar', label: '기타 색', cx: 128, cy: 570, r: 34 },
  { id: 'guitarCap', label: '기타 아이 모자 색', cx: 128, cy: 470, r: 30 },
  { id: 'mic', label: '마이크 색', cx: 520, cy: 470, r: 22 },
  { id: 'singerBow', label: '노래하는 아이 리본 색', cx: singerHead.x, cy: singerHead.y - 18, r: 44 },
  { id: 'speaker', label: '스피커', cx: 560, cy: 600, r: 32 },
  { id: 'bouquet', label: '꽃다발 색', cx: 300, cy: 636, r: 26 },
  { id: 'glow', label: '응원봉 색', cx: 140, cy: 704, r: 26 },
  { id: 'balloon', label: '객석 풍선', cx: 470, cy: 690, r: 28 },
  { id: 'hat', label: '관객 모자', cx: 380, cy: 750, r: 28 },
];

function stage(v) {
  const tassel = pick(v, 'tassel', '#ffd23f', '#4fb3ff');
  return (
    `<rect width="${W}" height="${H}" fill="#3b2a5c"/>` +
    // 조명
    `<path d="M150 0L190 0L280 560L60 560Z" fill="${pick(v, 'spot', '#fff6b0', '#ffb3d9')}" opacity="0.35"/>` +
    `<path d="M410 0L450 0L540 560L320 560Z" fill="#fff6b0" opacity="0.35"/>` +
    // 커튼
    shape('M0 0H96Q60 200 92 330Q60 460 80 600H0Z', '#d9334a') + shape('M600 0H504Q540 200 508 330Q540 460 520 600H600Z', '#d9334a') +
    disc(48, 330, 12, tassel, 3) + disc(552, 330, 12, tassel, 3) +
    box(0, 20, W, 70, '#b3243b', 0) + `<text x="300" y="70" font-size="34" font-weight="800" fill="#fff" text-anchor="middle">학예회</text>` +
    star(130, 54, 16, '#ffd23f') + star(470, 54, 16, pick(v, 'bannerStar', '#ffd23f', '#7fe0c8')) +
    // 무대 바닥
    box(-5, 560, W + 10, 110, '#c98a55', 0) + `<path d="M0 600H${W}M0 634H${W}" stroke="#a7744a" stroke-width="3"/>`
  );
}

function notes(v) {
  const note = (x, y, c) => `<path d="M${x + 10} ${y}V${y - 40}L${x + 30} ${y - 46}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` + oval(x, y, 12, 9, c, 3);
  return note(210, 284, pick(v, 'note1', '#ffd23f', '#ff7aa8')) + pick(v, 'note2', note(410, 264, '#7fe0c8'), '');
}

function drums(v) {
  return (
    pick(v, 'cymbal', line('M396 400V520', 4) + oval(396, 396, 32, 8, '#ffd23f'), '') +
    person({ ...DRUMMER, hair: pick(v, 'drumHair', '#3a2630', '#ff8a3d') }) +
    line(`M${stickL.x} ${stickL.y}L${stickL.x + 18} ${stickL.y - 32}M${stickR.x} ${stickR.y}L${stickR.x - 18} ${stickR.y - 32}`, 5) +
    box(226, 470, 40, 34, '#fff', 6) + box(334, 470, 40, 34, '#fff', 6) +
    disc(300, 506, 48, pick(v, 'drum', '#4fb3ff', '#ff5b5b')) + disc(300, 506, 34, '#fff', 3) + star(300, 506, 18, '#ffd23f') +
    line('M260 552L250 572M340 552L350 572', 5)
  );
}

function audience(v) {
  const heads = [[40, 760], [110, 746], [190, 770], [260, 750], [330, 772], [400, 748], [470, 770], [540, 752]];
  return box(-5, 670, W + 10, 140, '#2a1f45', 0) +
    pick(v, 'balloon', `<path d="M470 714V748" stroke="#fff" stroke-width="2"/>` + oval(470, 694, 18, 22, '#ff5b8a', 3), '') +
    `<path d="M140 730L140 704" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M140 730L140 704" stroke="${pick(v, 'glow', '#7fe0c8', '#ff7aa8')}" stroke-width="6" stroke-linecap="round"/>` +
    heads.map(([x, y]) => disc(x, y, 30, '#4a3a6b', 3)).join('') +
    pick(v, 'hat', shape('M352 752Q354 718 380 718Q406 718 408 752Z', '#ff8a3d', 3), '');
}

function draw(v) {
  return (
    stage(v) +
    notes(v) +
    drums(v) +
    pick(v, 'speaker', box(530, 560, 60, 80, '#3d3b52', 6) + disc(560, 586, 13, '#9aa0b8', 3) + disc(560, 620, 8, '#9aa0b8', 3), '') +
    person({ ...GUITAR, hat: pick(v, 'guitarCap', '#ff5b5b', '#4fb3ff') }) +
    `<g transform="rotate(-30 128 574)">` + oval(128, 590, 34, 28, pick(v, 'guitar', '#ff8a3d', '#7b6cf6')) + disc(128, 584, 8, INK, 0) + box(122, 494, 12, 80, '#a7744a', 3, 3) + `</g>` +
    line(`M520 650V480`, 4) + line(`M500 650H540`, 5) +
    person({ ...SINGER, bows: pick(v, 'singerBow', '#ffd23f', '#4fb3ff') }) +
    disc(520, 470, 12, pick(v, 'mic', '#9aa0b8', '#ff5b5b'), 3) +
    flower(300, 624, pick(v, 'bouquet', '#ff5b8a', '#ffd23f')) +
    audience(v)
  );
}

export default { id: 'concert', title: '학예회 무대', diffs, draw };
