// 장면 11: 농장 — 빨간 헛간과 풍차, 소·돼지·닭·양, 트랙터와 농부.

import { W, H, INK, pick, box, disc, oval, shape, line, sun, cloud, flower, person, headPos } from '../art.js';

const FARMER = { x: 300, y: 610, s: 0.95, hairStyle: 'sunhat', hair: '#5a3a2a', bottom: '#3d6fb8', arms: [10, 60], shoes: '#7a5236' };
const farmerHead = headPos(FARMER);

const diffs = [
  { id: 'sunColor', label: '해 색', cx: 530, cy: 70, r: 48 },
  { id: 'cloudGone', label: '구름', cx: 300, cy: 64, r: 44 },
  { id: 'windmill', label: '풍차 날개 색', cx: 86, cy: 148, r: 60 },
  { id: 'barn', label: '헛간 색', cx: 430, cy: 300, r: 44 },
  { id: 'barnDoor', label: '헛간 문 무늬', cx: 430, cy: 396, r: 34 },
  { id: 'barnOwl', label: '헛간 창문 닭', cx: 430, cy: 214, r: 28 },
  { id: 'hay', label: '건초 더미', cx: 556, cy: 420, r: 34 },
  { id: 'farmerHat', label: '농부 모자 색', cx: farmerHead.x, cy: farmerHead.y - 26, r: 42 },
  { id: 'farmerTop', label: '농부 옷 색', cx: FARMER.x, cy: FARMER.y - 96, r: 28 },
  { id: 'bucket', label: '농부 양동이 색', cx: 372, cy: 548, r: 26 },
  { id: 'cowSpot', label: '소 얼룩', cx: 110, cy: 512, r: 36 },
  { id: 'cowBell', label: '소 방울 색', cx: 172, cy: 524, r: 22 },
  { id: 'pig', label: '돼지 색', cx: 490, cy: 566, r: 42 },
  { id: 'chick', label: '병아리', cx: 410, cy: 700, r: 26 },
  { id: 'hen', label: '닭 볏 색', cx: 325, cy: 652, r: 22 },
  { id: 'sheep', label: '양 얼굴 색', cx: 96, cy: 678, r: 36 },
  { id: 'tractor', label: '트랙터 색', cx: 490, cy: 742, r: 36 },
  { id: 'carrot', label: '밭의 당근', cx: 196, cy: 762, r: 26 },
  { id: 'flower', label: '꽃 색', cx: 330, cy: 754, r: 26 },
];

function background(v) {
  return (
    `<defs><linearGradient id="fm-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0f8"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#fm-sky)"/>` +
    sun(530, 70, 30, pick(v, 'sunColor', '#ffd23f', '#ff8a3d')) +
    pick(v, 'cloudGone', cloud(300, 64), '') + cloud(180, 200, 0.7) +
    shape(`M0 340Q160 290 300 340T${W} 320V${H}H0Z`, '#a5d86a') +
    shape(`M0 450Q200 420 300 446T${W} 440V${H}H0Z`, '#8fce62')
  );
}

function windmill(v) {
  const blade = pick(v, 'windmill', '#fff', '#ffd23f');
  const cx = 86, cy = 148;
  const b = (deg) => `<g transform="rotate(${deg} ${cx} ${cy})">` + shape(`M${cx - 4} ${cy}L${cx - 16} ${cy - 76}L${cx + 14} ${cy - 76}L${cx + 4} ${cy}Z`, blade, 3) + `</g>`;
  return shape('M64 160L108 160L126 380H46Z', '#e9d7c0') + box(72, 330, 28, 50, '#a7744a', 12, 3) + b(20) + b(110) + b(200) + b(290) + disc(cx, cy, 10, '#ff8a3d', 3);
}

function barn(v) {
  const c = pick(v, 'barn', '#d9483b', '#4f7be0');
  return (
    shape('M322 270L430 170L538 270L538 450H322Z', c) +
    shape('M308 280L430 160L552 280L540 292L430 184L320 292Z', '#fff') +
    box(404, 194, 52, 44, '#3d3b52', 3) +
    pick(v, 'barnOwl', disc(430, 222, 14, '#fff', 3) + shape('M424 210L430 200L436 210Z', '#ff5b5b', 2.5) + `<circle cx="426" cy="220" r="2.5" fill="${INK}"/><circle cx="434" cy="220" r="2.5" fill="${INK}"/>`, '') +
    box(380, 340, 100, 110, '#fff') +
    pick(v, 'barnDoor', `<path d="M380 340L480 450M480 340L380 450" stroke="${INK}" stroke-width="5"/>`, `<path d="M430 340V450" stroke="${INK}" stroke-width="5"/>`) +
    // 건초
    pick(v, 'hay', shape('M522 450Q528 392 556 392Q584 392 590 450Z', '#f2cb5e') + `<path d="M540 412L546 440M556 404V442M574 414L568 440" stroke="#c99a30" stroke-width="3"/>`, '')
  );
}

function fence() {
  const posts = [12, 72, 132, 192, 252];
  return box(-5, 462, 280, 12, '#fff', 2, 3) + box(-5, 492, 280, 12, '#fff', 2, 3) +
    posts.map((x) => shape(`M${x} 530V450L${x + 11} 438L${x + 22} 450V530Z`, '#fff', 3)).join('');
}

function cow(v) {
  return (
    box(46, 560, 18, 52, '#fff', 4, 3) + box(146, 560, 18, 52, '#fff', 4, 3) +
    `<path d="M40 510Q18 530 26 562" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
    box(36, 488, 146, 86, '#fff', 34) +
    pick(v, 'cowSpot', oval(100, 516, 28, 20, '#3d3b52', 0), '') + oval(60, 552, 14, 12, '#3d3b52', 0) +
    shape('M152 454L136 440L160 438ZM206 454L222 440L198 438Z', '#fff', 3) +
    `<path d="M150 452L140 430M208 452L218 430" stroke="#e8c47a" stroke-width="7" stroke-linecap="round"/>` +
    box(142, 442, 74, 66, '#fff', 26) + box(150, 482, 58, 34, '#ffc2d4', 16) +
    `<circle cx="164" cy="466" r="4.5" fill="${INK}"/><circle cx="194" cy="466" r="4.5" fill="${INK}"/><circle cx="170" cy="498" r="3" fill="${INK}"/><circle cx="188" cy="498" r="3" fill="${INK}"/>` +
    disc(172, 524, 11, pick(v, 'cowBell', '#ffd23f', '#4fb3ff'), 3)
  );
}

function pig(v) {
  const c = pick(v, 'pig', '#ffb3c7', '#c9a0e8');
  return box(440, 630, 16, 26, c, 3, 3) + box(508, 630, 16, 26, c, 3, 3) +
    line('M426 612Q408 604 416 590', 4) +
    oval(482, 610, 62, 42, c) + shape('M510 566L520 540L536 562Z', c, 3) + shape('M556 566L566 544L574 568Z', c, 3) +
    disc(540, 594, 34, c) + oval(552, 604, 15, 11, '#ff8fa8', 3) +
    `<circle cx="534" cy="582" r="3.5" fill="${INK}"/><circle cx="556" cy="582" r="3.5" fill="${INK}"/><circle cx="548" cy="604" r="2" fill="${INK}"/><circle cx="556" cy="604" r="2" fill="${INK}"/>`;
}

function hen(v) {
  const comb = pick(v, 'hen', '#ff5b5b', '#4fb3ff');
  return shape('M272 690Q244 664 256 650L280 672Z', '#fff', 3) + oval(300, 696, 34, 26, '#fff') +
    disc(324, 672, 19, '#fff') + shape('M316 654Q318 642 324 650Q330 642 334 654Z', comb, 3) +
    shape('M342 668L356 674L342 680Z', '#ffb627', 2.5) + `<circle cx="330" cy="668" r="3" fill="${INK}"/>` + line('M292 722V736M308 722V736', 4);
}

function sheep(v) {
  const wool = [[64, 668, 22], [96, 654, 24], [128, 668, 22], [58, 694, 20], [96, 700, 26], [132, 694, 20]];
  return box(70, 712, 12, 30, '#3d3b52', 3, 3) + box(112, 712, 12, 30, '#3d3b52', 3, 3) +
    wool.map(([x, y, r]) => disc(x, y, r, '#fff', 3)).join('') + wool.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r - 1.5}" fill="#fff"/>`).join('') +
    oval(96, 680, 19, 24, pick(v, 'sheep', '#3d3b52', '#a7744a')) + `<circle cx="88" cy="676" r="3.5" fill="#fff"/><circle cx="104" cy="676" r="3.5" fill="#fff"/>`;
}

function tractor(v) {
  const c = pick(v, 'tractor', '#5cc46e', '#ff8a3d');
  return box(428, 716, 146, 44, c, 10) + box(464, 664, 66, 58, '#bfe9ff') + box(456, 656, 82, 12, c, 4) + line('M558 716V682', 7) +
    disc(460, 762, 26, '#3d3b52') + disc(460, 762, 10, '#ffd23f', 3) + disc(552, 770, 18, '#3d3b52') + disc(552, 770, 7, '#ffd23f', 3);
}

function carrots(v) {
  const one = (x) => shape(`M${x - 10} 758L${x + 10} 758L${x} 786Z`, '#ff8a3d', 2.5) + `<path d="M${x} 758L${x - 8} 742M${x} 758V740M${x} 758L${x + 8} 742" stroke="#3c9d5d" stroke-width="4" stroke-linecap="round"/>`;
  return shape('M28 752H268L276 796H20Z', '#a7744a', 3) + one(70) + one(130) + (v.has('carrot') ? '' : one(196)) + one(244);
}

function draw(v) {
  return (
    background(v) +
    windmill(v) +
    barn(v) +
    fence() +
    cow(v) +
    person({ ...FARMER, hat: pick(v, 'farmerHat', '#ffe08a', '#ff7aa8'), top: pick(v, 'farmerTop', '#ff5b5b', '#ffd23f') }) +
    shape('M350 536H394L388 574H356Z', pick(v, 'bucket', '#9aa0b8', '#ff8a3d')) + line('M352 536Q372 510 392 536', 3) +
    `<g transform="translate(0 -44)">` + pig(v) + `</g>` +
    hen(v) +
    pick(v, 'chick', disc(410, 704, 15, '#ffe27a', 3) + shape('M423 700L434 704L423 708Z', '#ffb627', 2) + `<circle cx="414" cy="700" r="2.5" fill="${INK}"/>` + line('M406 719V728M414 719V728', 3), '') +
    sheep(v) +
    tractor(v) +
    carrots(v) +
    flower(330, 754, pick(v, 'flower', '#ff7aa8', '#7b6cf6'))
  );
}

export default { id: 'farm', title: '농장', diffs, draw };
