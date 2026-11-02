// 장면 14: 아이 방 — 침대에서 책 읽는 아이, 곰 인형, 장난감 선반, 밤하늘 창문.

import { W, H, INK, pick, box, disc, oval, shape, line, heart, star, clock, cat, person, headPos } from '../art.js';

const KID = { x: 400, y: 600, s: 0.9, hs: 1.25, sit: true, legs: false, hairStyle: 'bob', hair: '#3a2630', top: '#ffd23f', arms: [-30, -30] };
const kidHead = headPos(KID);
const BEAR = { x: 262, y: 592 };

const diffs = [
  { id: 'moon', label: '창밖 달 모양', cx: 118, cy: 116, r: 34 },
  { id: 'starGone', label: '창밖 별', cx: 76, cy: 196, r: 22 },
  { id: 'curtain', label: '커튼 색', cx: 26, cy: 170, r: 26 },
  { id: 'lights', label: '꼬마전구 색', cx: 350, cy: 52, r: 24 },
  { id: 'poster', label: '벽의 로켓 그림', cx: 338, cy: 170, r: 44 },
  { id: 'clock', label: '시곗바늘', cx: 530, cy: 104, r: 42 },
  { id: 'robot', label: '선반 로봇 색', cx: 480, cy: 240, r: 40 },
  { id: 'toyBall', label: '선반 공', cx: 552, cy: 256, r: 26 },
  { id: 'shelfBook', label: '선반 책 색', cx: 410, cy: 256, r: 28 },
  { id: 'kidBow', label: '아이 리본', cx: kidHead.x + 27, cy: kidHead.y - 36, r: 24 },
  { id: 'book', label: '아이 책 색', cx: KID.x, cy: 552, r: 34 },
  { id: 'pillow', label: '베개 색', cx: 520, cy: 492, r: 38 },
  { id: 'blanket', label: '이불 색', cx: 420, cy: 650, r: 44 },
  { id: 'bearBow', label: '곰 인형 나비넥타이', cx: BEAR.x, cy: BEAR.y + 2, r: 24 },
  { id: 'bearEar', label: '곰 인형 색', cx: BEAR.x, cy: BEAR.y - 42, r: 34 },
  { id: 'lamp', label: '스탠드 갓 색', cx: 72, cy: 400, r: 38 },
  { id: 'mug', label: '책상 위 연필꽂이', cx: 146, cy: 462, r: 26 },
  { id: 'blockC', label: '블록 맨 위 글자', cx: 90, cy: 640, r: 30 },
  { id: 'car', label: '장난감 자동차 색', cx: 210, cy: 750, r: 40 },
  { id: 'slippers', label: '슬리퍼 색', cx: 390, cy: 760, r: 40 },
  { id: 'catSpot', label: '고양이 목걸이', cx: 530, cy: 740, r: 26 },
];

function room(v) {
  const bulbs = [40, 110, 180, 250, 320, 390, 460, 530, 590];
  return (
    `<rect width="${W}" height="${H}" fill="#c9b6f2"/>` +
    `<rect y="600" width="${W}" height="${H - 600}" fill="#dba878"/>` + `<path d="M0 650H${W}M0 720H${W}" stroke="#c48e5e" stroke-width="3"/>` + box(-5, 592, W + 10, 12, '#fff', 0) +
    line(`M0 20Q150 60 300 30T${W} 30`, 3) +
    bulbs.map((x, i) => disc(x, i % 2 ? 44 : 42, 9, x === 320 ? pick(v, 'lights', '#ffd23f', '#ff5b5b') : '#ffd23f', 3)).join('') +
    // 창문
    box(30, 76, 160, 150, '#fff', 4) + box(40, 86, 140, 130, '#23245f', 0, 3) +
    pick(v, 'moon', disc(118, 116, 22, '#fff2b8', 3), shape('M126 94A22 22 0 1 0 126 138A18 18 0 1 1 126 94Z', '#fff2b8', 3)) +
    pick(v, 'starGone', star(76, 196, 12, '#ffd23f', 2.5), '') + star(66, 118, 8, '#fff', 2) + star(156, 180, 8, '#fff', 2) +
    line('M110 86V216M40 150H180', 4) +
    shape('M14 66Q38 140 18 236L52 236Q50 140 66 66Z', pick(v, 'curtain', '#ff9fbd', '#7fd0f0')) +
    shape('M206 66Q182 140 202 236L168 236Q170 140 154 66Z', pick(v, 'curtain', '#ff9fbd', '#7fd0f0')) +
    box(6, 58, 208, 12, '#a7744a', 6) +
    // 포스터
    box(286, 100, 104, 136, '#fff7e0', 3) +
    pick(v, 'poster',
      shape('M338 118Q360 150 356 196H320Q316 150 338 118Z', '#ff5b5b', 3) + shape('M320 180L306 212L322 200ZM356 180L370 212L354 200Z', '#4fb3ff', 3) + disc(338, 156, 8, '#bfe9ff', 2.5),
      heart(338, 178, 40, '#ff5b8a')) +
    clock(530, 104, 36, '#4fb3ff', ...pick(v, 'clock', [240, 0], [120, 0]))
  );
}

function shelf(v) {
  return (
    box(392, 276, 196, 14, '#a7744a', 3) +
    box(394, 216, 18, 60, pick(v, 'shelfBook', '#ff5b5b', '#5cc46e'), 2, 3) + box(412, 222, 16, 54, '#4fb3ff', 2, 3) + box(428, 216, 14, 60, '#ffd23f', 2, 3) +
    box(458, 236, 44, 40, pick(v, 'robot', '#9aa0b8', '#ff8a3d'), 6) + box(464, 202, 32, 30, pick(v, 'robot', '#9aa0b8', '#ff8a3d'), 6) + line('M480 202V190', 3) + disc(480, 186, 4, '#ff5b5b', 2.5) +
    `<circle cx="473" cy="216" r="3.5" fill="${INK}"/><circle cx="487" cy="216" r="3.5" fill="${INK}"/>` +
    pick(v, 'toyBall', disc(552, 254, 21, '#ff7aa8') + `<path d="M532 254H572" stroke="#fff" stroke-width="5"/>`, '')
  );
}

function desk(v) {
  return (
    box(10, 482, 190, 14, '#a7744a', 3) + box(22, 496, 14, 112, '#8a5a3c', 2, 3) + box(176, 496, 14, 112, '#8a5a3c', 2, 3) +
    line('M72 480V430', 6) + oval(72, 480, 24, 6, '#7a5236', 3) +
    shape('M40 424Q44 374 72 374Q100 374 104 424Z', pick(v, 'lamp', '#ffd23f', '#5cc46e')) +
    pick(v, 'mug', `<path d="M136 450L130 428M148 450V424M158 450L164 430" stroke="#ff8a3d" stroke-width="5" stroke-linecap="round"/>`, '') + box(128, 446, 38, 36, '#7fd0f0', 4)
  );
}

function bed(v) {
  return (
    box(556, 420, 30, 276, '#8a5a3c', 6) + box(212, 520, 26, 176, '#8a5a3c', 6) +
    box(222, 590, 350, 94, '#fff', 8) +
    oval(520, 500, 44, 28, pick(v, 'pillow', '#ff9fbd', '#ffd23f')) +
    box(232, 560, 330, 30, '#fff8ec', 8)
  );
}

function bear(v) {
  const { x, y } = BEAR;
  const c = pick(v, 'bearEar', '#c98a55', '#f4f4f8');
  return disc(x - 25, y - 56, 12, c, 3) + disc(x + 25, y - 56, 12, c, 3) + oval(x, y + 28, 30, 34, c) + disc(x, y - 34, 32, c) +
    oval(x, y - 24, 13, 10, '#f0d9bd', 0) + `<circle cx="${x - 10}" cy="${y - 40}" r="3.5" fill="${INK}"/><circle cx="${x + 10}" cy="${y - 40}" r="3.5" fill="${INK}"/><ellipse cx="${x}" cy="${y - 27}" rx="4" ry="3" fill="${INK}"/>` +
    pick(v, 'bearBow', shape(`M${x} ${y + 2}L${x - 18} ${y - 8}V${y + 12}ZM${x} ${y + 2}L${x + 18} ${y - 8}V${y + 12}Z`, '#ff5b5b', 3), '');
}

function blocks(v) {
  const b = (x, y, c, t) => box(x, y, 50, 50, c) + `<text x="${x + 25}" y="${y + 36}" font-size="30" font-weight="800" fill="#fff" text-anchor="middle">${t}</text>`;
  return b(36, 716, '#ff5b5b', 'A') + b(90, 716, '#4fb3ff', 'B') + b(62, 664, '#5cc46e', pick(v, 'blockC', 'C', 'D'));
}

function car(v) {
  const c = pick(v, 'car', '#ff5b5b', '#4fb3ff');
  return shape('M180 726Q196 696 226 700L250 726Z', '#bfe9ff') + box(160, 726, 104, 34, c, 10) + disc(186, 762, 13, '#3d3b52') + disc(240, 762, 13, '#3d3b52');
}

function draw(v) {
  const slip = pick(v, 'slippers', '#ff9fd0', '#8be0c8');
  return (
    room(v) +
    shelf(v) +
    desk(v) +
    bed(v) +
    person({ ...KID, bow: pick(v, 'kidBow', '#ff5b8a', null) }) +
    box(250, 610, 310, 72, pick(v, 'blanket', '#4fb3ff', '#ff8a3d'), 12) + `<path d="M270 640H540" stroke="#fff" stroke-width="6" stroke-dasharray="18 14"/>` +
    box(KID.x - 34, 530, 68, 44, pick(v, 'book', '#ff5b5b', '#5cc46e'), 4) + `<path d="M${KID.x} 530V574" stroke="${INK}" stroke-width="3"/>` +
    bear(v) +
    blocks(v) +
    car(v) +
    oval(366, 762, 24, 12, slip) + oval(414, 762, 24, 12, slip) +
    cat(530, 790, 0.8, '#f4f4f8', { collar: pick(v, 'catSpot', '#ff5b5b', null) })
  );
}

export default { id: 'bedroom', title: '아이 방', diffs, draw };
