// 장면 16: 비 오는 날 — 우산을 쓴 아이와 엄마, 비옷 입은 강아지, 물웅덩이.

import { W, H, INK, pick, blob, box, disc, oval, shape, line, dog, person, headPos, handPos } from '../art.js';

const KID = { x: 150, y: 772, s: 0.9, hs: 1.25, hairStyle: 'cap', top: '#ffd23f', bottom: '#3d4f8f', arms: [10, 165] };
const MOM = { x: 430, y: 748, s: 1, hairStyle: 'long', hair: '#3a2630', top: '#7b6cf6', bottom: '#3d4f8f', bottomType: 'skirt', arms: [10, 165], shoes: '#3d3b52' };
const kidHead = headPos(KID);
const kidHand = handPos(KID, 1);
const momHand = handPos(MOM, 1);
const momBagHand = handPos(MOM, -1);

const diffs = [
  { id: 'cloudGone', label: '먹구름', cx: 300, cy: 44, r: 44 },
  { id: 'lightning', label: '번개', cx: 420, cy: 130, r: 32 },
  { id: 'windowLight', label: '불 켜진 창문', cx: 145, cy: 325, r: 30 },
  { id: 'door', label: '문 색', cx: 100, cy: 490, r: 30 },
  { id: 'sign', label: '가게 간판 색', cx: 300, cy: 322, r: 40 },
  { id: 'awning', label: '차양 줄무늬 색', cx: 300, cy: 386, r: 30 },
  { id: 'windowCat', label: '창가 고양이', cx: 535, cy: 325, r: 30 },
  { id: 'balconyFlower', label: '베란다 꽃 색', cx: 470, cy: 378, r: 26 },
  { id: 'kidUmbrella', label: '아이 우산 색', cx: 160, cy: 540, r: 44 },
  { id: 'kidCap', label: '아이 모자 색', cx: kidHead.x + 6, cy: kidHead.y - 22, r: 34 },
  { id: 'kidBoots', label: '아이 장화 색', cx: KID.x, cy: KID.y - 6, r: 30 },
  { id: 'momDots', label: '엄마 우산 무늬', cx: 440, cy: 500, r: 48 },
  { id: 'momBag', label: '엄마 가방 색', cx: momBagHand.x, cy: momBagHand.y + 18, r: 26 },
  { id: 'dogCoat', label: '강아지 비옷 색', cx: 300, cy: 762, r: 28 },
  { id: 'duck', label: '물웅덩이 오리 색', cx: 330, cy: 690, r: 24 },
  { id: 'frog', label: '개구리', cx: 530, cy: 772, r: 28 },
  { id: 'snail', label: '달팽이', cx: 560, cy: 598, r: 26 },
];

const greyCloud = (x, y, s = 1) => blob([[x - 34 * s, y + 6 * s, 22 * s], [x - 6 * s, y - 8 * s, 30 * s], [x + 26 * s, y + 4 * s, 24 * s]], '#c9d3de');

function umbrella(cx, cy, r, color, hand, dots) {
  const scallop = `M${cx - r} ${cy}Q${cx - r} ${cy - r} ${cx} ${cy - r}Q${cx + r} ${cy - r} ${cx + r} ${cy}` +
    `Q${cx + r * 0.75} ${cy - 14} ${cx + r / 2} ${cy}Q${cx + r / 4} ${cy - 14} ${cx} ${cy}Q${cx - r / 4} ${cy - 14} ${cx - r / 2} ${cy}Q${cx - r * 0.75} ${cy - 14} ${cx - r} ${cy}Z`;
  return `<path d="M${hand.x} ${hand.y}L${cx} ${cy - r + 4}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
    shape(scallop, color) +
    (dots ? [[-r / 2, -r / 3], [0, -r * 0.62], [r / 2, -r / 3]].map(([dx, dy]) => disc(cx + dx, cy + dy, 7, '#fff', 2.5)).join('') : '') +
    line(`M${hand.x} ${hand.y}q0 12 -10 12`, 4);
}

function town(v) {
  const win = (x, y, c = '#6f88a8') => box(x, y, 50, 50, c, 3, 3) + line(`M${x + 25} ${y}V${y + 50}`, 3);
  return (
    `<rect width="${W}" height="${H}" fill="#a9bfd4"/>` +
    greyCloud(100, 54) + pick(v, 'cloudGone', greyCloud(300, 44), '') + greyCloud(500, 70) +
    pick(v, 'lightning', shape('M424 98L404 134L420 134L410 166L440 124L424 124L434 98Z', '#ffe27a', 3), '') +
    // 왼쪽 건물
    box(10, 180, 190, 352, '#f4b183') +
    win(40, 220) + win(120, 220) + win(40, 300) + win(120, 300, pick(v, 'windowLight', '#ffe27a', '#6f88a8')) + win(40, 380) + win(120, 380) +
    box(70, 450, 60, 82, pick(v, 'door', '#7a5236', '#5cc46e'), 4) +
    // 가게
    box(210, 240, 180, 292, '#a8c8e8') +
    box(240, 298, 120, 48, pick(v, 'sign', '#ff8a3d', '#5cc46e'), 6) +
    `<text x="300" y="331" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">우산 가게</text>` +
    [0, 1, 2, 3, 4, 5].map((i) => shape(`M${216 + i * 28} 370H${244 + i * 28}V392Q${230 + i * 28} 406 ${216 + i * 28} 392Z`, i % 2 ? '#fff' : pick(v, 'awning', '#ff5b5b', '#4fb3ff'), 3)).join('') +
    box(230, 412, 140, 110, '#e9f7ff', 3, 3) +
    // 오른쪽 건물
    box(400, 170, 190, 362, '#c9b6f2') + win(430, 210) + win(510, 210) + win(430, 300) + win(510, 300) +
    pick(v, 'windowCat', disc(535, 338, 13, '#f4a340', 3) + shape('M524 330L526 316L534 326ZM546 330L544 316L536 326Z', '#f4a340', 2.5), '') +
    box(420, 400, 150, 12, '#fff', 3, 3) + line('M430 412V440M470 412V440M510 412V440M550 412V440M420 440H570', 4) +
    shape('M460 400L480 400L476 384L464 384Z', '#ff8a3d', 3) + disc(470, 376, 9, pick(v, 'balconyFlower', '#ff5b8a', '#ffd23f'), 3) +
    // 보도
    `<rect y="530" width="${W}" height="${H - 530}" fill="#b8bfcc"/>` + `<path d="M0 530H${W}" stroke="${INK}" stroke-width="4"/>` +
    `<path d="M0 620H${W}M0 720H${W}M150 530V620M450 530V620M300 620V720" stroke="#a2aab8" stroke-width="3"/>` +
    oval(300, 700, 74, 16, '#8fb3d9', 3) + oval(530, 782, 64, 13, '#8fb3d9', 3)
  );
}

function rain() {
  const drops = [];
  for (let i = 0; i < 36; i++) {
    const x = (i * 97) % W;
    const y = 90 + ((i * 53) % 460);
    drops.push(`M${x} ${y}l-6 16`);
  }
  return `<path d="${drops.join('')}" stroke="#eef5fc" stroke-width="3" stroke-linecap="round"/>`;
}

function draw(v) {
  return (
    town(v) +
    rain() +
    pick(v, 'snail', shape('M540 610H584Q586 598 576 598Z', '#c9a46c', 2.5) + disc(566, 596, 12, '#ff9f6b', 3) + line('M548 610L544 594M552 608L554 592', 2), '') +
    (() => {
      const c = pick(v, 'duck', '#ffd23f', '#ff7aa8');
      return oval(330, 696, 16, 10, c, 3) + disc(340, 682, 9, c, 3) + shape('M348 680L358 684L348 688Z', '#ff8a3d', 2);
    })() +
    pick(v, 'frog', oval(530, 772, 22, 14, '#5cc46e') + disc(518, 756, 8, '#5cc46e', 3) + disc(542, 756, 8, '#5cc46e', 3) + `<circle cx="518" cy="756" r="3" fill="${INK}"/><circle cx="542" cy="756" r="3" fill="${INK}"/>`, '') +
    person({ ...KID, hat: pick(v, 'kidCap', '#ff5b5b', '#5cc46e'), shoes: pick(v, 'kidBoots', '#ff5b5b', '#4fb3ff') }) +
    umbrella(160, 572, 70, pick(v, 'kidUmbrella', '#4fb3ff', '#ff7aa8'), kidHand, false) +
    person(MOM) +
    box(momBagHand.x - 20, momBagHand.y + 2, 40, 34, pick(v, 'momBag', '#ff8a3d', '#5cc46e'), 6) +
    umbrella(440, 546, 82, '#ff5b8a', momHand, !v.has('momDots')) +
    dog(300, 792, 0.75, '#f3d6a8') +
    shape('M280 764Q300 742 320 764L318 778H282Z', pick(v, 'dogCoat', '#ffd23f', '#ff5b5b'), 3)
  );
}

export default { id: 'rainy', title: '비 오는 날', diffs, draw };
