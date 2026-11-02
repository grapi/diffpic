// 장면 12: 빵집 — 진열장 뒤의 제빵사, 선반 가득한 빵, 빵을 사러 온 아이.

import { W, H, INK, pick, box, disc, oval, shape, line, clock, cat, person, headPos } from '../art.js';

const BAKER = { x: 245, y: 590, s: 1.05, legs: false, hairStyle: 'chef', hair: '#3a2630', top: '#fff', arms: [-30, 40], mouth: 'open' };
const KID = { x: 490, y: 786, s: 0.9, hs: 1.25, hairStyle: 'bob', hair: '#5a3a2a', top: '#ffd23f', bottom: '#7b6cf6', bottomType: 'skirt', arms: [150, 15], shoes: '#ff5b5b' };

const bakerHead = headPos(BAKER);
const kidHead = headPos(KID);

const diffs = [
  { id: 'awning', label: '차양 줄무늬 색', cx: 96, cy: 40, r: 32 },
  { id: 'sign', label: '간판 색', cx: 300, cy: 112, r: 54 },
  { id: 'clock', label: '시곗바늘', cx: 530, cy: 118, r: 42 },
  { id: 'lamp', label: '전등 색', cx: 70, cy: 136, r: 34 },
  { id: 'croissant', label: '선반 위 크루아상', cx: 76, cy: 240, r: 34 },
  { id: 'loaf', label: '식빵 색', cx: 176, cy: 340, r: 36 },
  { id: 'baguette', label: '바게트 통 색', cx: 74, cy: 366, r: 32 },
  { id: 'cake', label: '선반 케이크 색', cx: 476, cy: 236, r: 44 },
  { id: 'cherry', label: '케이크 체리', cx: 476, cy: 186, r: 22 },
  { id: 'jar', label: '병 뚜껑 색', cx: 386, cy: 340, r: 28 },
  { id: 'pie', label: '파이 무늬', cx: 500, cy: 346, r: 36 },
  { id: 'chefHat', label: '제빵사 모자 높이', cx: bakerHead.x, cy: bakerHead.y - 76, r: 42 },
  { id: 'mustache', label: '제빵사 콧수염', cx: bakerHead.x, cy: bakerHead.y + 4, r: 30 },
  { id: 'apron', label: '제빵사 앞치마 색', cx: BAKER.x, cy: BAKER.y - 90, r: 26 },
  { id: 'register', label: '금전등록기 색', cx: 420, cy: 510, r: 40 },
  { id: 'cupcake', label: '컵케이크 색', cx: 80, cy: 640, r: 34 },
  { id: 'donut', label: '도넛 색', cx: 190, cy: 646, r: 32 },
  { id: 'cookie', label: '쿠키 개수', cx: 300, cy: 650, r: 34 },
  { id: 'kidBow', label: '아이 리본', cx: kidHead.x + 27, cy: kidHead.y - 36, r: 24 },
  { id: 'bag', label: '아이 손의 빵 봉투', cx: 540, cy: 750, r: 34 },
  { id: 'catColor', label: '고양이 색', cx: 64, cy: 760, r: 36 },
];

function room(v) {
  const stripe = pick(v, 'awning', '#ff5b5b', '#4fb3ff');
  const stripes = Array.from({ length: 8 }, (_, i) => i).map((i) => shape(`M${i * 75} 0H${i * 75 + 75}V52Q${i * 75 + 37} 76 ${i * 75} 52Z`, i % 2 ? stripe : '#fff')).join('');
  return (
    `<defs><pattern id="bk-floor" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#fff3dc"/><rect width="30" height="30" fill="#e8c9a0"/><rect x="30" y="30" width="30" height="30" fill="#e8c9a0"/></pattern></defs>` +
    `<rect width="${W}" height="${H}" fill="#ffd8d0"/>` +
    `<rect y="700" width="${W}" height="${H - 700}" fill="url(#bk-floor)"/>` + `<path d="M0 700H${W}" stroke="${INK}" stroke-width="4"/>` +
    stripes +
    box(222, 80, 156, 64, pick(v, 'sign', '#7a5236', '#3f8f6b'), 10) +
    `<text x="300" y="127" font-size="38" font-weight="800" fill="#fff" text-anchor="middle">빵집</text>` +
    clock(530, 118, 36, '#ff8a3d', ...pick(v, 'clock', [300, 0], [30, 0])) +
    line('M70 76V116', 4) + shape('M42 150Q44 116 70 116Q96 116 98 150Z', pick(v, 'lamp', '#ffd23f', '#7b6cf6'))
  );
}

function shelves(v) {
  const board = (x, y, w) => box(x, y, w, 14, '#a7744a', 3);
  const croissant = shape('M46 258Q50 222 76 222Q102 222 106 258Q90 246 76 248Q62 246 46 258Z', '#f0b860');
  const cherry = disc(476, 188, 11, '#ff3b4f', 3);
  return (
    board(20, 262, 230) + board(20, 390, 230) + board(350, 262, 230) + board(350, 390, 230) +
    pick(v, 'croissant', croissant, '') +
    box(136, 218, 78, 44, '#f0c98a', 10) + `<path d="M154 218V262M176 218V262M196 218V262" stroke="#c99a50" stroke-width="3"/>` +
    box(142, 318, 70, 72, pick(v, 'loaf', '#f4d29a', '#c98a55'), 16) + box(150, 330, 54, 52, '#fff3dc', 10, 2.5) +
    // 바게트 통
    `<g transform="rotate(-10 60 340)">` + box(50, 298, 18, 80, '#e8b070', 9, 3) + `</g><g transform="rotate(8 84 340)">` + box(76, 300, 18, 80, '#e8b070', 9, 3) + `</g>` +
    box(42, 346, 62, 44, pick(v, 'baguette', '#ff8a3d', '#5cc46e'), 4) +
    // 케이크
    box(430, 208, 92, 54, pick(v, 'cake', '#ffc2d4', '#bfe9ff'), 8) + `<path d="M430 226Q442 240 453 226Q465 240 476 226Q488 240 499 226Q511 240 522 226" fill="none" stroke="#fff" stroke-width="7"/>` +
    pick(v, 'cherry', cherry, '') +
    box(366, 226, 32, 36, '#e9f7ff', 6) + box(362, 218, 40, 12, '#ff8a3d', 3, 3) +
    // 병
    box(366, 334, 42, 56, '#ffe27a', 8) + box(362, 322, 50, 14, pick(v, 'jar', '#ff5b5b', '#7b6cf6'), 3) +
    // 파이
    shape('M452 390L462 346Q500 322 538 346L548 390Z', '#e8b070') +
    pick(v, 'pie', `<path d="M476 340L470 388M500 334V388M524 340L530 388" stroke="#a7744a" stroke-width="4"/>`, `<circle cx="500" cy="362" r="12" fill="#ff5b5b" stroke="${INK}" stroke-width="3"/>`)
  );
}

function counter(v) {
  const cup = (x, c) => shape(`M${x - 22} 648L${x + 22} 648L${x + 15} 684H${x - 15}Z`, '#fff', 3) + blob3(x, 636, c) + disc(x, 618, 6, '#ff3b4f', 2.5);
  return (
    box(-5, 556, W + 10, 16, '#f4f1ea') + box(-5, 572, W + 10, 134, '#c98a55') +
    box(26, 586, 336, 110, '#e9f9ff', 4) +
    cup(80, pick(v, 'cupcake', '#ff9fbd', '#8be0c8')) +
    `<circle cx="190" cy="650" r="30" fill="${pick(v, 'donut', '#ffb627', '#c76bd6')}" stroke="${INK}" stroke-width="4"/><circle cx="190" cy="650" r="10" fill="#e9f9ff" stroke="${INK}" stroke-width="3"/>` +
    (v.has('cookie') ? [282, 318] : [272, 300, 328]).map((x) => disc(x, 662, 18, '#d9a35b', 3) + `<circle cx="${x - 5}" cy="658" r="2.5" fill="${INK}"/><circle cx="${x + 5}" cy="666" r="2.5" fill="${INK}"/>`).join('') +
    // 금전등록기
    shape('M380 556L388 490H452L460 556Z', pick(v, 'register', '#4fb3ff', '#ff7aa8')) + box(396, 472, 48, 24, '#fff', 3, 3) + box(402, 508, 36, 30, '#fff', 3, 3)
  );
}

function blob3(x, y, c) {
  return shape(`M${x - 26} ${y + 12}Q${x - 30} ${y - 6} ${x - 12} ${y - 8}Q${x - 8} ${y - 22} ${x + 8} ${y - 16}Q${x + 24} ${y - 12} ${x + 22} ${y}Q${x + 32} ${y + 6} ${x + 26} ${y + 12}Z`, c);
}

function draw(v) {
  return (
    room(v) +
    shelves(v) +
    person({ ...BAKER, hat: pick(v, 'chefHat', 18, 46), mustache: pick(v, 'mustache', '#3a2630', null), apron: pick(v, 'apron', '#ff9fbd', '#7fd0f0') }) +
    counter(v) +
    cat(64, 794, 0.85, pick(v, 'catColor', '#f4a340', '#9e9e9e'), { collar: '#ff5b5b' }) +
    person({ ...KID, bow: pick(v, 'kidBow', '#ff5b8a', null) }) +
    pick(v, 'bag', shape('M518 722H566L574 782H510Z', '#e8c9a0') + box(528, 704, 12, 24, '#e8b070', 5, 2.5) + box(544, 700, 12, 28, '#e8b070', 5, 2.5), '')
  );
}

export default { id: 'bakery', title: '빵집', diffs, draw };
