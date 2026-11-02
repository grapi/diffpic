// 장면 15: 동물원 — 기린, 코끼리, 원숭이, 사자, 플라밍고, 풍선을 든 아이.

import { W, H, INK, pick, box, disc, oval, shape, line, sun, cloud, tree, balloon, person, headPos, handPos } from '../art.js';

const KEEPER = { x: 262, y: 590, s: 0.95, hairStyle: 'cap', top: '#7fae5a', bottom: '#8a6d3b', arms: [15, 45], shoes: '#7a5236' };
const KID = { x: 424, y: 786, s: 0.86, hs: 1.25, hairStyle: 'pigtails', hair: '#3a2630', bottom: '#ff7aa8', bottomType: 'skirt', arms: [20, 150], shoes: '#fff' };
const keeperHead = headPos(KEEPER);
const keeperHand = handPos(KEEPER, 1);
const kidHead = headPos(KID);
const kidHand = handPos(KID, 1);

const diffs = [
  { id: 'sunColor', label: '해 색', cx: 306, cy: 66, r: 46 },
  { id: 'cloudGone', label: '구름', cx: 440, cy: 60, r: 44 },
  { id: 'giraffeSpot', label: '기린 무늬 하나', cx: 120, cy: 330, r: 24 },
  { id: 'giraffeBow', label: '기린 나비넥타이', cx: 128, cy: 240, r: 24 },
  { id: 'giraffeHorn', label: '기린 뿔 색', cx: 150, cy: 66, r: 26 },
  { id: 'monkey', label: '원숭이 바나나', cx: 556, cy: 288, r: 28 },
  { id: 'monkeyColor', label: '원숭이 색', cx: 480, cy: 250, r: 40 },
  { id: 'parrot', label: '앵무새 색', cx: 372, cy: 206, r: 34 },
  { id: 'sign', label: '표지판 색', cx: 352, cy: 372, r: 44 },
  { id: 'elephant', label: '코끼리 모자 색', cx: 428, cy: 416, r: 32 },
  { id: 'elephantWater', label: '코끼리 코 물', cx: 340, cy: 520, r: 30 },
  { id: 'keeperCap', label: '사육사 모자 색', cx: keeperHead.x + 6, cy: keeperHead.y - 22, r: 34 },
  { id: 'keeperBucket', label: '사육사 양동이 색', cx: keeperHand.x, cy: keeperHand.y + 26, r: 26 },
  { id: 'lion', label: '사자 갈기 색', cx: 96, cy: 624, r: 62 },
  { id: 'lionTail', label: '사자 꼬리', cx: 216, cy: 682, r: 30 },
  { id: 'flamingo', label: '플라밍고 색', cx: 280, cy: 700, r: 36 },
  { id: 'duck', label: '연못 오리', cx: 340, cy: 760, r: 26 },
  { id: 'kidBow', label: '아이 리본 색', cx: kidHead.x, cy: kidHead.y - 20, r: 48 },
  { id: 'balloon', label: '풍선 색', cx: 528, cy: 528, r: 38 },
  { id: 'kidTop', label: '아이 옷 색', cx: KID.x, cy: KID.y - 86, r: 24 },
];

function background(v) {
  return (
    `<defs><linearGradient id="zo-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ad9f8"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#zo-sky)"/>` +
    sun(306, 66, 26, pick(v, 'sunColor', '#ffd23f', '#ff8a3d')) +
    pick(v, 'cloudGone', cloud(440, 60), '') +
    shape(`M0 420Q200 380 340 416T${W} 400V${H}H0Z`, '#a5d86a') +
    shape(`M0 590Q180 556 340 586T${W} 572V${H}H0Z`, '#8fce62')
  );
}

function giraffe(v) {
  const c = '#ffcf5c';
  const spots = [[100, 280], [136, 300], [108, 380], [90, 340], [60, 470], [110, 470], [160, 462]];
  return (
    box(44, 500, 22, 94, c, 5) + box(150, 500, 22, 94, c, 5) +
    oval(106, 462, 80, 52, c) +
    shape('M84 440L108 150L142 150L146 440Z', c) +
    spots.map(([x, y]) => oval(x, y, 11, 9, '#b5722e', 0)).join('') +
    pick(v, 'giraffeSpot', oval(120, 330, 13, 11, '#b5722e', 0), '') +
    line('M136 96L132 66M164 96L168 66', 5) +
    disc(131, 62, 7, pick(v, 'giraffeHorn', '#b5722e', '#ff5b8a'), 3) + disc(169, 62, 7, pick(v, 'giraffeHorn', '#b5722e', '#ff5b8a'), 3) +
    oval(112, 110, 17, 10, c, 3) +
    oval(150, 136, 38, 44, c) + oval(158, 160, 26, 20, '#ffe9b0', 3) +
    `<circle cx="138" cy="124" r="4.5" fill="${INK}"/><circle cx="166" cy="124" r="4.5" fill="${INK}"/><circle cx="152" cy="158" r="2.5" fill="${INK}"/><circle cx="166" cy="158" r="2.5" fill="${INK}"/>` +
    pick(v, 'giraffeBow', shape('M118 240L92 224V256ZM118 240L144 224V256Z', '#ff5b5b', 3) + disc(118, 240, 6, '#ff5b5b', 3), '')
  );
}

function monkeyTree(v) {
  const c = pick(v, 'monkeyColor', '#9c6b3e', '#c76bd6');
  return (
    tree(520, 440, 1.3, '#4caf50') +
    `<path d="M430 300L600 280" stroke="${INK}" stroke-width="16" stroke-linecap="round"/><path d="M430 300L600 280" stroke="#9c6b3e" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M512 280Q540 330 520 356" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M512 280Q540 330 520 356" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` +
    oval(490, 282, 26, 30, c) + disc(442, 242, 13, '#f0d9bd', 3) + disc(518, 242, 13, '#f0d9bd', 3) + disc(480, 240, 34, c) +
    oval(480, 250, 22, 18, '#f0d9bd', 0) + `<circle cx="470" cy="238" r="3.5" fill="${INK}"/><circle cx="490" cy="238" r="3.5" fill="${INK}"/><path d="M472 254Q480 260 488 254" fill="none" stroke="${INK}" stroke-width="3"/>` +
    `<path d="M344 246L440 298" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M344 246L440 298" stroke="#9c6b3e" stroke-width="7" stroke-linecap="round"/>` +
    pick(v, 'monkey', shape('M534 268Q566 268 576 300Q552 292 534 282Z', '#ffe27a', 3), '')
  );
}

function elephant(v) {
  const c = '#a8b3c9';
  return (
    box(404, 548, 34, 44, c, 6) + box(504, 548, 34, 44, c, 6) +
    oval(470, 510, 84, 58, c) +
    shape('M400 470Q360 462 356 514Q370 534 402 516Z', '#c0c9dc') +
    disc(428, 478, 44, c) +
    `<path d="M400 500Q372 520 366 556" fill="none" stroke="${INK}" stroke-width="26" stroke-linecap="round"/><path d="M400 500Q372 520 366 556" fill="none" stroke="${c}" stroke-width="18" stroke-linecap="round"/>` +
    `<circle cx="412" cy="470" r="4.5" fill="${INK}"/>` +
    box(400, 428, 56, 12, pick(v, 'elephant', '#ff5b5b', '#4fb3ff'), 4, 3) + box(410, 396, 36, 34, pick(v, 'elephant', '#ff5b5b', '#4fb3ff'), 4, 3) +
    pick(v, 'elephantWater', `<path d="M360 560Q340 530 346 500M352 566Q324 540 322 510" fill="none" stroke="#7fd0f0" stroke-width="7" stroke-linecap="round"/>`, '')
  );
}

function lion(v) {
  const mane = pick(v, 'lion', '#d9822b', '#c76bd6');
  const c = '#ffcf5c';
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    return disc(Math.round(96 + Math.cos(a) * 44), Math.round(624 + Math.sin(a) * 44), 22, mane, 3);
  }).join('');
  return (
    pick(v, 'lionTail', `<path d="M170 720Q226 712 216 664" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M170 720Q226 712 216 664" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` + disc(216, 658, 12, mane, 3), '') +
    oval(120, 722, 74, 50, c) + box(68, 744, 24, 44, c, 8) + box(148, 744, 24, 44, c, 8) +
    petals + disc(96, 624, 44, c) +
    `<circle cx="80" cy="616" r="5" fill="${INK}"/><circle cx="112" cy="616" r="5" fill="${INK}"/>` +
    shape('M88 632H104L96 642Z', INK, 2) + line('M96 642Q86 654 76 646M96 642Q106 654 116 646', 3)
  );
}

function flamingo(v) {
  const c = pick(v, 'flamingo', '#ff8fb0', '#7fd0f0');
  return oval(320, 762, 92, 34, '#7fd0f0') +
    pick(v, 'duck', oval(340, 762, 18, 12, '#ffe27a', 3) + disc(354, 748, 10, '#ffe27a', 3) + shape('M362 746L374 750L362 754Z', '#ff8a3d', 2), '') +
    line('M274 736L276 764M286 736V764', 4) +
    oval(278, 714, 26, 18, c) +
    `<path d="M296 706Q320 680 296 654" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M296 706Q320 680 296 654" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` +
    disc(294, 650, 11, c, 3) + shape('M284 650L268 662L284 658Z', INK, 2);
}

function draw(v) {
  return (
    background(v) +
    monkeyTree(v) +
    shape('M336 206Q338 176 370 176Q400 182 396 214Q388 244 362 240Q338 232 336 206Z', pick(v, 'parrot', '#4fe0a0', '#ff5b5b')) +
    shape('M392 214L420 256L384 236Z', '#ffd23f', 3) + `<circle cx="358" cy="200" r="4" fill="${INK}"/>` + shape('M336 200L322 208L338 214Z', '#ffb627', 2.5) +
    // 표지판
    `<path d="M352 410V470" stroke="${INK}" stroke-width="8"/>` +
    box(304, 344, 96, 58, pick(v, 'sign', '#7a5236', '#3f8f6b'), 8) +
    `<text x="352" y="382" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">동물원</text>` +
    elephant(v) +
    giraffe(v) +
    person({ ...KEEPER, hat: pick(v, 'keeperCap', '#3fae5f', '#ff8a3d') }) +
    shape(`M${keeperHand.x - 20} ${keeperHand.y + 8}H${keeperHand.x + 20}L${keeperHand.x + 14} ${keeperHand.y + 44}H${keeperHand.x - 14}Z`, pick(v, 'keeperBucket', '#9aa0b8', '#ff5b5b')) +
    lion(v) +
    flamingo(v) +
    balloon(528, 528, pick(v, 'balloon', '#ff5b8a', '#ffd23f'), kidHand.x, kidHand.y) +
    person({ ...KID, top: pick(v, 'kidTop', '#4fb3ff', '#ffd23f'), bows: pick(v, 'kidBow', '#ff5b8a', '#7b6cf6') })
  );
}

export default { id: 'zoo', title: '동물원', diffs, draw };
