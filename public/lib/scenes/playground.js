// 장면 6: 놀이터 — 미끄럼틀, 그네, 시소, 모래놀이.

import { W, H, INK, pick, box, disc, shape, line, sun, cloud, tree, bird, butterfly, flower, dog, person, headPos } from '../art.js';

const TOP_KID = { x: 94, y: 330, s: 0.72, hs: 1.25, hairStyle: 'cap', top: '#ff5b5b', bottom: '#3d4f8f', bottomType: 'shorts', arms: [150, 150], shoes: '#fff' };
const SWING_KID = { x: 396, y: 486, s: 0.72, hs: 1.25, sit: true, hairStyle: 'pigtails', hair: '#3a2630', bottom: '#ff7aa8', bottomType: 'skirt', arms: [150, 150], shoes: '#fff' };
const SEE_KID = { x: 66, y: 690, s: 0.72, hs: 1.25, sit: true, hairStyle: 'bob', hair: '#5a3a2a', top: '#7b6cf6', bottom: '#ffd23f', bottomType: 'skirt', arms: [20, 20], shoes: '#ff5b5b' };
const SAND_KID = { x: 440, y: 762, s: 0.72, hs: 1.25, sit: true, hairStyle: 'spiky', hair: '#2b2233', top: '#ffd23f', bottom: '#4f7be0', bottomType: 'shorts', arms: [20, 70], shoes: '#5cc46e' };

const topHead = headPos(TOP_KID);
const seeHead = headPos(SEE_KID);

const diffs = [
  { id: 'sunColor', label: '해 색', cx: 520, cy: 70, r: 48 },
  { id: 'cloudGone', label: '구름', cx: 300, cy: 70, r: 44 },
  { id: 'bird', label: '그네 위 새 색', cx: 470, cy: 190, r: 30 },
  { id: 'roof', label: '미끄럼틀 지붕 색', cx: 94, cy: 106, r: 46 },
  { id: 'capColor', label: '꼭대기 아이 모자 색', cx: topHead.x + 6, cy: topHead.y - 20, r: 32 },
  { id: 'slide', label: '미끄럼판 색', cx: 216, cy: 470, r: 40 },
  { id: 'ladder', label: '사다리 칸', cx: 28, cy: 440, r: 26 },
  { id: 'seatEmpty', label: '빈 그네 색', cx: 514, cy: 482, r: 30 },
  { id: 'swingFrame', label: '그네 기둥 색', cx: 340, cy: 330, r: 26 },
  { id: 'swingTop', label: '그네 아이 옷 색', cx: SWING_KID.x, cy: SWING_KID.y - 58, r: 26 },
  { id: 'seesaw', label: '시소 색', cx: 180, cy: 716, r: 34 },
  { id: 'seeBall', label: '시소 끝 공 색', cx: 300, cy: 712, r: 30 },
  { id: 'seeGlasses', label: '시소 아이 안경', cx: seeHead.x, cy: seeHead.y, r: 30 },
  { id: 'bucket', label: '모래놀이 양동이 색', cx: 362, cy: 744, r: 26 },
  { id: 'castle', label: '모래성 꼭대기', cx: 540, cy: 716, r: 28 },
  { id: 'dogPatch', label: '강아지 눈 얼룩', cx: 268, cy: 572, r: 26 },
  { id: 'butterfly', label: '나비 색', cx: 290, cy: 200, r: 28 },
  { id: 'flower', label: '꽃 색', cx: 170, cy: 590, r: 26 },
  { id: 'fence', label: '울타리 판자', cx: 478, cy: 378, r: 24 },
];

function background(v) {
  const pickets = Array.from({ length: 16 }, (_, i) => 12 + i * 38);
  return (
    `<defs><linearGradient id="pg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ad9f8"/><stop offset="1" stop-color="#e1f7ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="420" fill="url(#pg-sky)"/>` +
    sun(520, 70, 30, pick(v, 'sunColor', '#ffd23f', '#ff8a3d')) +
    pick(v, 'cloudGone', cloud(300, 70), '') + cloud(180, 150, 0.7) +
    tree(530, 400, 1.05, '#57b85c') +
    box(-5, 372, W + 10, 12, '#fff', 0, 3) +
    pickets.map((x) => (x === 468 && v.has('fence') ? '' : shape(`M${x} 420V356L${x + 10} 344L${x + 20} 356V420Z`, '#fff', 3))).join('') +
    `<rect y="410" width="${W}" height="${H - 410}" fill="#92d972"/>` +
    `<path d="M0 410H${W}" fill="none" stroke="${INK}" stroke-width="4"/>` +
    `<path d="M240 450l6 -12l6 12M330 640l6 -12l6 12M20 580l6 -12l6 12M360 560l6 -12l6 12M210 780l6 -12l6 12" fill="none" stroke="#58a94f" stroke-width="3"/>`
  );
}

function slide(v) {
  const rungs = [370, 400, 430, 460, 490, 520];
  return (
    // 사다리
    line('M18 340V550M48 340V550', 7) +
    rungs.map((y) => (y === 430 && v.has('ladder') ? '' : `<path d="M18 ${y}H48" stroke="${INK}" stroke-width="6"/>`)).join('') +
    // 기둥과 지붕
    line('M48 150V330M140 150V330M140 330V550', 7) +
    shape('M30 152L94 66L158 152Z', pick(v, 'roof', '#ff8a3d', '#7b6cf6')) +
    // 미끄럼판
    shape('M136 330L170 330Q240 480 322 548L322 574L280 574Q190 460 136 366Z', pick(v, 'slide', '#4fb3ff', '#ffd23f')) +
    box(34, 330, 112, 16, '#ffd23f', 4)
  );
}

function swing(v) {
  const frame = pick(v, 'swingFrame', '#ff5b5b', '#5cc46e');
  const seat = (x, y, color) => line(`M${x - 22} 230V${y}M${x + 22} 230V${y}`, 3) + box(x - 30, y, 60, 12, color, 4, 3);
  return (
    shape('M332 226L350 226L366 570L346 570Z', frame) + shape('M546 226L564 226L550 570L530 570Z', frame) +
    box(322, 214, 252, 18, frame, 8) +
    seat(396, 486, '#ffb627') + seat(514, 470, pick(v, 'seatEmpty', '#7fd0f0', '#ff7aa8')) +
    bird(470, 190, pick(v, 'bird', '#ff7aa8', '#4fb3ff'))
  );
}

function seesaw(v) {
  return (
    shape('M152 762L180 708L208 762Z', '#a7744a') +
    `<g transform="rotate(4 180 700)">` + box(20, 690, 320, 18, pick(v, 'seesaw', '#ff5b8a', '#4fb3ff'), 8) + `</g>`
  );
}

function sandbox(v) {
  return (
    box(330, 682, 262, 110, '#f6dfa5', 6) +
    pick(v, 'castle', shape('M540 684L520 716H560Z', '#ff5b5b', 3), '') +
    box(516, 716, 48, 42, '#e8c47a', 2, 3) +
    shape('M340 730H384L378 768H346Z', pick(v, 'bucket', '#ff5b5b', '#ffd23f')) + line('M342 730Q362 708 382 730', 3)
  );
}

function draw(v) {
  return (
    background(v) +
    swing(v) +
    slide(v) +
    person({ ...TOP_KID, hat: pick(v, 'capColor', '#3b7dd8', '#3fae5f') }) +
    person({ ...SWING_KID, top: pick(v, 'swingTop', '#7fd0f0', '#ff8a3d') }) +
    butterfly(290, 200, pick(v, 'butterfly', '#ff7aa8', '#ffd23f')) +
    flower(170, 590, pick(v, 'flower', '#ff7aa8', '#7b6cf6')) +
    dog(262, 630, 0.8, '#f3d6a8', { patch: pick(v, 'dogPatch', '#8a5a3c', null) }) +
    seesaw(v) +
    person({ ...SEE_KID, glasses: !v.has('seeGlasses') }) +
    disc(300, 688, 26, pick(v, 'seeBall', '#ff5b5b', '#ffd23f')) +
    sandbox(v) +
    person(SAND_KID)
  );
}

export default { id: 'playground', title: '놀이터', diffs, draw };
