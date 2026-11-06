// 장면 17: 슈퍼마켓 — 물건이 가득한 진열대, 카트를 미는 엄마, 바구니를 든 아이.

import { W, H, INK, pick, box, disc, oval, shape, line, clock, person, headPos, handPos } from '../art.js';

const MOM = { x: 500, y: 790, s: 1, hairStyle: 'bun', hair: '#3a2630', bottom: '#3d4f8f', bottomType: 'skirt', arms: [70, 20], shoes: '#ff5b5b' };
const KID = { x: 130, y: 790, s: 0.9, hs: 1.25, hairStyle: 'cap', top: '#7fd0f0', bottom: '#ffd23f', bottomType: 'shorts', arms: [100, -20], shoes: '#fff' };
const kidHead = headPos(KID);
const basketHand = handPos(KID, 1);

const diffs = [
  { id: 'banner', label: '할인 현수막 색', cx: 300, cy: 52, r: 44 },
  { id: 'clock', label: '시곗바늘', cx: 540, cy: 66, r: 40 },
  { id: 'cereal', label: '시리얼 상자 색', cx: 176, cy: 212, r: 30 },
  { id: 'milk', label: '가운데 우유', cx: 298, cy: 220, r: 28 },
  { id: 'jarLid', label: '잼 뚜껑 색', cx: 476, cy: 204, r: 24 },
  { id: 'can', label: '맨 위 통조림', cx: 118, cy: 310, r: 24 },
  { id: 'bottle', label: '가운데 병 색', cx: 254, cy: 326, r: 28 },
  { id: 'cheese', label: '치즈 구멍', cx: 400, cy: 340, r: 32 },
  { id: 'bread', label: '빵 색', cx: 524, cy: 336, r: 30 },
  { id: 'apple', label: '사과 개수', cx: 95, cy: 428, r: 26 },
  { id: 'price', label: '가격표 숫자', cx: 95, cy: 466, r: 24 },
  { id: 'banana', label: '바나나 색', cx: 256, cy: 432, r: 40 },
  { id: 'carrot', label: '당근 하나', cx: 440, cy: 428, r: 24 },
  { id: 'melon', label: '수박 무늬', cx: 530, cy: 454, r: 34 },
  { id: 'cart', label: '카트 색', cx: 336, cy: 660, r: 38 },
  { id: 'cartBread', label: '카트 속 바게트', cx: 296, cy: 594, r: 26 },
  { id: 'momTop', label: '엄마 옷 색', cx: MOM.x, cy: MOM.y - 100, r: 28 },
  { id: 'kidCap', label: '아이 모자 색', cx: kidHead.x + 6, cy: kidHead.y - 22, r: 34 },
  { id: 'basket', label: '아이 바구니 색', cx: basketHand.x, cy: basketHand.y + 16, r: 26 },
];

function room(v) {
  return (
    `<defs><pattern id="mk-floor" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#f4f4f8"/><rect width="40" height="40" fill="#dfe3ee"/><rect x="40" y="40" width="40" height="40" fill="#dfe3ee"/></pattern></defs>` +
    `<rect width="${W}" height="${H}" fill="#e6f4d9"/>` +
    `<rect y="540" width="${W}" height="${H - 540}" fill="url(#mk-floor)"/>` + `<path d="M0 540H${W}" stroke="${INK}" stroke-width="4"/>` +
    line('M240 0V26M360 0V26', 3) + box(196, 26, 208, 54, pick(v, 'banner', '#ff5b5b', '#4fb3ff'), 8) +
    `<text x="300" y="64" font-size="30" font-weight="800" fill="#fff" text-anchor="middle">오늘 할인</text>` +
    clock(540, 66, 34, '#5cc46e', ...pick(v, 'clock', [300, 180], [60, 180]))
  );
}

function shelves(v) {
  const board = (y) => box(14, y, 572, 12, '#a7744a', 3);
  const cereal = (x, c) => box(x, 176, 48, 74, c, 3) + box(x + 8, 192, 32, 22, '#fff', 3, 2.5);
  const milk = (x) => shape(`M${x} 250V196L${x + 10} 180H${x + 30}L${x + 40} 196V250Z`, '#fff') + `<path d="M${x + 2} 222H${x + 38}" stroke="#4fb3ff" stroke-width="8"/>`;
  const jar = (x, lid) => box(x, 206, 36, 44, '#ffb3c7', 6) + box(x - 3, 196, 42, 12, lid, 3, 3);
  const can = (x, y) => box(x, y, 36, 40, '#ff8a3d', 4, 3) + box(x, y + 12, 36, 14, '#fff', 0, 2.5);
  const bottle = (x, c) => box(x + 8, 282, 12, 22, c, 3, 3) + box(x, 300, 28, 70, c, 8);
  const apples = [30, 62, 94, 126, 158].map((x) => (x === 94 && v.has('apple') ? '' : disc(x + 8, 432, 15, '#ff5b5b', 3)));
  const banana = (dx) => shape(`M${200 + dx} 424Q${226 + dx} 452 ${262 + dx} 420Q${236 + dx} 438 ${208 + dx} 418Z`, pick(v, 'banana', '#ffd23f', '#9fd36a'), 3);
  const carrot = (x) => shape(`M${x - 9} 420H${x + 9}L${x} 454Z`, '#ff8a3d', 2.5) + `<path d="M${x} 420L${x - 6} 406M${x} 420L${x + 6} 406" stroke="#3c9d5d" stroke-width="4" stroke-linecap="round"/>`;
  return (
    box(14, 130, 572, 380, '#c98a55') + box(26, 140, 548, 360, '#f6e4c6', 0, 3) +
    board(250) + board(370) + board(490) +
    cereal(40, '#ff8a3d') + cereal(96, '#4fb3ff') + cereal(152, pick(v, 'cereal', '#5cc46e', '#ff5b8a')) +
    milk(230) + pick(v, 'milk', milk(278), '') + milk(326) +
    jar(410, '#ff5b5b') + jar(458, pick(v, 'jarLid', '#5cc46e', '#7b6cf6')) + jar(506, '#ffd23f') +
    can(40, 330) + can(80, 330) + can(120, 330) + can(60, 290) + pick(v, 'can', can(100, 290), '') +
    bottle(200, '#5cc46e') + bottle(240, pick(v, 'bottle', '#ff5b8a', '#4fb3ff')) + bottle(280, '#ffd23f') +
    shape('M360 370L440 370L440 322Z', '#ffd23f') +
    pick(v, 'cheese', `<circle cx="420" cy="354" r="5" fill="#e8b830"/><circle cx="432" cy="340" r="4" fill="#e8b830"/><circle cx="406" cy="362" r="3.5" fill="#e8b830"/>`, '') +
    box(486, 318, 76, 52, pick(v, 'bread', '#e8b070', '#a7744a'), 18) +
    // 과일 상자
    apples.join('') + box(26, 444, 150, 46, '#a7744a', 3) +
    box(58, 452, 74, 28, '#fff', 4, 3) + `<text x="95" y="473" font-size="18" font-weight="800" fill="${INK}" text-anchor="middle">${pick(v, 'price', '1000원', '100원')}</text>` +
    banana(0) + banana(20) + banana(40) + box(190, 444, 140, 46, '#a7744a', 3) +
    carrot(384) + carrot(412) + pick(v, 'carrot', carrot(440), '') + carrot(468) + box(360, 444, 130, 46, '#a7744a', 3) +
    oval(530, 454, 44, 32, '#3fae5f') + (v.has('melon') ? '' : `<path d="M500 436Q506 456 500 474M520 426Q528 454 520 484M542 426Q534 454 542 484M562 436Q556 456 562 474" fill="none" stroke="#1f6e3a" stroke-width="5"/>`)
  );
}

function cart(v) {
  const c = pick(v, 'cart', '#4fb3ff', '#ff8a3d');
  return pick(v, 'cartBread', `<g transform="rotate(-20 296 596)">` + box(284, 552, 24, 86, '#e8b070', 12) + `</g>`, '') +
    box(282, 600, 26, 40, '#fff', 4, 3) +
    shape('M250 606H424L408 700H266Z', c) + `<path d="M260 630H418M262 656H414M264 680H410M300 606V700M340 606V700M380 606V700" stroke="#fff" stroke-width="3"/>` +
    line('M266 700L276 746H406L408 700M424 606L448 590', 6) + disc(290, 760, 14, '#3d3b52') + disc(392, 760, 14, '#3d3b52');
}

function draw(v) {
  return (
    room(v) +
    shelves(v) +
    cart(v) +
    person({ ...MOM, top: pick(v, 'momTop', '#ff7aa8', '#5cc46e') }) +
    person({ ...KID, hat: pick(v, 'kidCap', '#ff5b5b', '#7b6cf6') }) +
    shape(`M${basketHand.x - 26} ${basketHand.y + 4}H${basketHand.x + 26}L${basketHand.x + 20} ${basketHand.y + 34}H${basketHand.x - 20}Z`, pick(v, 'basket', '#ff5b5b', '#ffd23f')) +
    line(`M${basketHand.x - 20} ${basketHand.y + 4}Q${basketHand.x} ${basketHand.y - 22} ${basketHand.x + 20} ${basketHand.y + 4}`, 3)
  );
}

export default { id: 'market', title: '슈퍼마켓', diffs, draw };
