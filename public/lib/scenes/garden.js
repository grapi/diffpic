// 장면 21: 텃밭 — 물뿌리개로 물을 주는 할아버지, 딸기를 따는 아이, 해바라기와 새집.

import { W, H, INK, pick, blob, box, disc, oval, shape, line, sun, cloud, butterfly, person, headPos, handPos } from '../art.js';

const GRANDPA = { x: 380, y: 650, s: 1, hairStyle: 'sunhat', hair: '#d6d4de', top: '#5cc46e', bottom: '#8a6d3b', arms: [10, 60], shoes: '#7a5236', mouth: 'smile' };
const KID = { x: 290, y: 790, s: 0.85, hs: 1.25, hairStyle: 'bob', hair: '#3a2630', top: '#ff7aa8', bottom: '#4f7be0', bottomType: 'skirt', arms: [-30, -30], shoes: '#ffd23f' };
const gpHead = headPos(GRANDPA);
const canHand = handPos(GRANDPA, 1);
const kidHand = handPos(KID, 1);

const diffs = [
  { id: 'sunColor', label: '해 색', cx: 520, cy: 70, r: 46 },
  { id: 'cloudGone', label: '구름', cx: 300, cy: 60, r: 42 },
  { id: 'roof', label: '새집 지붕 색', cx: 50, cy: 236, r: 32 },
  { id: 'birdOnRoof', label: '새집 위 새', cx: 50, cy: 200, r: 24 },
  { id: 'bee', label: '꿀벌', cx: 486, cy: 236, r: 22 },
  { id: 'sunflower', label: '해바라기 가운데 색', cx: 556, cy: 300, r: 30 },
  { id: 'butterfly', label: '나비 색', cx: 250, cy: 300, r: 28 },
  { id: 'tomato', label: '토마토 개수', cx: 150, cy: 520, r: 26 },
  { id: 'pumpkin', label: '호박 색', cx: 220, cy: 626, r: 34 },
  { id: 'cabbage', label: '양배추', cx: 520, cy: 622, r: 32 },
  { id: 'ladybug', label: '무당벌레', cx: 470, cy: 616, r: 20 },
  { id: 'can', label: '물뿌리개 색', cx: canHand.x + 10, cy: canHand.y + 14, r: 28 },
  { id: 'water', label: '물줄기', cx: 492, cy: 562, r: 24 },
  { id: 'hat', label: '할아버지 모자 색', cx: gpHead.x, cy: gpHead.y - 26, r: 40 },
  { id: 'mustache', label: '할아버지 콧수염', cx: gpHead.x, cy: gpHead.y + 6, r: 26 },
  { id: 'strawberry', label: '딸기 하나', cx: 180, cy: 728, r: 22 },
  { id: 'basket', label: '아이 바구니 색', cx: kidHand.x, cy: kidHand.y + 16, r: 28 },
  { id: 'snail', label: '달팽이 껍데기 색', cx: 420, cy: 696, r: 22 },
  { id: 'barrow', label: '손수레 색', cx: 500, cy: 744, r: 38 },
];

function background(v) {
  return (
    `<defs><linearGradient id="gd-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ad9f8"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#gd-sky)"/>` +
    sun(520, 70, 28, pick(v, 'sunColor', '#ffd23f', '#ff8a3d')) +
    pick(v, 'cloudGone', cloud(300, 60, 0.9), '') + cloud(150, 130, 0.6) +
    `<rect y="410" width="${W}" height="${H - 410}" fill="#92d972"/>` + `<path d="M0 410H${W}" stroke="${INK}" stroke-width="4"/>` +
    box(-5, 360, W + 10, 12, '#c98a55', 3) + box(-5, 390, W + 10, 12, '#c98a55', 3) +
    [20, 120, 220, 320, 420, 520].map((x) => box(x, 344, 16, 70, '#a7744a', 3)).join('') +
    box(20, 600, 270, 56, '#8a5a3c', 10) + box(400, 600, 190, 56, '#8a5a3c', 10) + box(20, 724, 250, 56, '#8a5a3c', 10)
  );
}

function birdhouse(v) {
  return line('M50 290V420', 7) + box(26, 240, 48, 52, '#ffd98a') + disc(50, 266, 9, INK, 0) +
    shape('M18 244L50 214L82 244Z', pick(v, 'roof', '#ff5b5b', '#4fb3ff')) +
    pick(v, 'birdOnRoof', oval(50, 206, 14, 10, '#4fb3ff', 3) + disc(60, 198, 7, '#4fb3ff', 3) + shape('M66 197L74 200L66 203Z', '#ffb627', 2), '');
}

function sunflower(v) {
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const [x, y] = [Math.round(556 + Math.cos(a) * 34), Math.round(300 + Math.sin(a) * 34)];
    return `<g transform="rotate(${i * 30} ${x} ${y})">` + oval(x, y, 14, 9, '#ffd23f', 3) + `</g>`;
  }).join('');
  return `<path d="M556 600V330" stroke="${INK}" stroke-width="12"/><path d="M556 600V330" stroke="#3c9d5d" stroke-width="6"/>` +
    shape('M556 470Q520 440 510 460Q526 486 556 480Z', '#5cc46e', 3) + shape('M556 420Q592 392 600 412Q586 438 556 430Z', '#5cc46e', 3) +
    petals + disc(556, 300, 24, pick(v, 'sunflower', '#8a5a3c', '#ff5b5b')) +
    pick(v, 'bee', oval(486, 236, 12, 9, '#ffd23f', 2.5) + `<path d="M482 228V244M490 228V244" stroke="${INK}" stroke-width="3"/>` + oval(484, 224, 7, 5, '#fff', 2), '');
}

function crops(v) {
  const tomatoes = [[132, 500], [160, 520], [138, 548], [168, 470]];
  return (
    `<path d="M150 600V440" stroke="#a7744a" stroke-width="7"/>` +
    blob([[132, 500, 22], [168, 486, 22], [150, 540, 24], [140, 460, 20]], '#4caf50', 3) +
    tomatoes.map(([x, y], i) => (i === 1 && v.has('tomato') ? '' : disc(x, y, 10, '#ff3b3b', 3))).join('') +
    `<path d="M220 600Q214 590 222 586" fill="none" stroke="#3c9d5d" stroke-width="5"/>` +
    oval(220, 628, 42, 30, pick(v, 'pumpkin', '#ff8a3d', '#ffd23f')) + `<path d="M206 602Q200 628 206 654M234 602Q240 628 234 654" fill="none" stroke="${INK}" stroke-width="3"/>` +
    pick(v, 'cabbage', blob([[506, 626, 22], [534, 626, 22], [520, 608, 22]], '#8fd36a', 3) + `<path d="M520 610Q510 624 520 640" fill="none" stroke="#5cb85c" stroke-width="3"/>`, '') +
    pick(v, 'ladybug', disc(470, 616, 9, '#ff3b3b', 2.5) + `<path d="M470 607V625" stroke="${INK}" stroke-width="2"/><circle cx="466" cy="614" r="2" fill="${INK}"/><circle cx="474" cy="619" r="2" fill="${INK}"/>`, '') +
    [60, 100, 140, 180, 220].map((x) => (x === 180 && v.has('strawberry') ? '' : shape(`M${x - 10} 724Q${x} 714 ${x + 10} 724Q${x + 10} 740 ${x} 746Q${x - 10} 740 ${x - 10} 724Z`, '#ff3b5b', 2.5) + `<path d="M${x - 6} 720L${x} 726L${x + 6} 720" stroke="#3c9d5d" stroke-width="3" fill="none"/>`)).join('')
  );
}

function wateringCan(v) {
  const { x, y } = canHand;
  return pick(v, 'water', `<path d="M480 548L486 566M492 548L498 568M504 548L508 566" stroke="#4fb3ff" stroke-width="4" stroke-linecap="round"/>`, '') +
    `<path d="M${x + 22} ${y + 16}L476 540" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${x + 22} ${y + 16}L476 540" stroke="${pick(v, 'can', '#4fb3ff', '#ff5b8a')}" stroke-width="4" stroke-linecap="round"/>` +
    box(x - 14, y + 2, 40, 34, pick(v, 'can', '#4fb3ff', '#ff5b8a'), 6) + line(`M${x - 8} ${y + 2}Q${x + 6} ${y - 14} ${x + 20} ${y + 2}`, 4);
}

function barrow(v) {
  const c = pick(v, 'barrow', '#ff5b5b', '#7b6cf6');
  return line('M450 770L420 782M556 744L590 730', 5) + shape('M440 720H570L548 770H458Z', c) + disc(500, 778, 14, '#3d3b52') + disc(500, 778, 5, '#c9c8d8', 2);
}

function draw(v) {
  return (
    background(v) +
    birdhouse(v) +
    sunflower(v) +
    butterfly(250, 300, pick(v, 'butterfly', '#ff7aa8', '#7fd0f0')) +
    crops(v) +
    person({ ...GRANDPA, hat: pick(v, 'hat', '#ffe08a', '#ff7aa8'), mustache: pick(v, 'mustache', '#d6d4de', null) }) +
    wateringCan(v) +
    shape('M404 708H440Q442 694 430 694Z', '#c9a46c', 2.5) + disc(424, 692, 11, pick(v, 'snail', '#ff9f6b', '#7fd0f0'), 3) + line('M410 706L406 690M414 704L416 688', 2) +
    barrow(v) +
    person(KID) +
    shape(`M${kidHand.x - 26} ${kidHand.y + 4}H${kidHand.x + 26}L${kidHand.x + 20} ${kidHand.y + 34}H${kidHand.x - 20}Z`, pick(v, 'basket', '#e8b070', '#4fb3ff')) +
    line(`M${kidHand.x - 20} ${kidHand.y + 4}Q${kidHand.x} ${kidHand.y - 22} ${kidHand.x + 20} ${kidHand.y + 4}`, 3)
  );
}

export default { id: 'garden', title: '텃밭', diffs, draw };
