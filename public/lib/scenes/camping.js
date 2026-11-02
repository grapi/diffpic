// 장면 7: 밤 캠핑 — 달과 별, 텐트, 모닥불에 마시멜로를 굽는 아이들.

import { W, H, INK, pick, box, disc, oval, shape, line, star, sparkle, pine, person, headPos, handPos } from '../art.js';

const DAD = { x: 150, y: 726, s: 1, sit: true, hairStyle: 'short', hair: '#3a2630', top: '#d9534f', bottom: '#3d4f8f', arms: [-20, 60], shoes: '#7a5236', mouth: 'open' };
const GIRL = { x: 442, y: 738, s: 0.78, hs: 1.25, sit: true, hairStyle: 'bob', hair: '#5a3a2a', top: '#ffd23f', bottom: '#4f7be0', arms: [10, -60], shoes: '#ff7aa8' };
const BOY = { x: 304, y: 784, s: 0.74, hs: 1.25, sit: true, hairStyle: 'cap', top: '#5cc46e', bottom: '#7a5236', arms: [70, 50], shoes: '#fff' };

const dadHead = headPos(DAD);
const girlHead = headPos(GIRL);
const boyHead = headPos(BOY);
const dadHand = handPos(DAD, 1);
const FIRE = { x: 306, y: 612 };

const diffs = [
  { id: 'moon', label: '달 모양', cx: 110, cy: 86, r: 50 },
  { id: 'starGone', label: '큰 별', cx: 254, cy: 72, r: 26 },
  { id: 'starColor', label: '노란 별 색', cx: 390, cy: 148, r: 26 },
  { id: 'shooting', label: '별똥별', cx: 490, cy: 66, r: 40 },
  { id: 'owl', label: '부엉이 눈 색', cx: 74, cy: 300, r: 32 },
  { id: 'pineStar', label: '뾰족나무 위 반딧불', cx: 556, cy: 370, r: 22 },
  { id: 'tent', label: '텐트 색', cx: 330, cy: 410, r: 44 },
  { id: 'tentFlag', label: '텐트 깃발', cx: 356, cy: 250, r: 26 },
  { id: 'lantern', label: '랜턴 빛 색', cx: 490, cy: 490, r: 32 },
  { id: 'backpack', label: '배낭 색', cx: 60, cy: 562, r: 36 },
  { id: 'rabbit', label: '토끼', cx: 556, cy: 590, r: 34 },
  { id: 'flame', label: '불꽃 색', cx: FIRE.x, cy: FIRE.y - 30, r: 34 },
  { id: 'log', label: '장작 개수', cx: FIRE.x + 56, cy: FIRE.y + 22, r: 22 },
  { id: 'marshmallow', label: '마시멜로', cx: dadHand.x + 40, cy: dadHand.y - 6, r: 24 },
  { id: 'dadMustache', label: '아빠 콧수염', cx: dadHead.x, cy: dadHead.y + 4, r: 30 },
  { id: 'girlBow', label: '여자아이 리본', cx: girlHead.x + 24, cy: girlHead.y - 28, r: 22 },
  { id: 'boyCap', label: '남자아이 모자 색', cx: boyHead.x + 6, cy: boyHead.y - 18, r: 32 },
  { id: 'mug', label: '컵 색', cx: 536, cy: 744, r: 28 },
];

function sky(v) {
  const dots = [[40, 170], [186, 34], [200, 170], [320, 40], [336, 200], [440, 210], [560, 170], [570, 40], [140, 220], [470, 130]];
  return (
    `<defs><linearGradient id="cp-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2257"/><stop offset="1" stop-color="#5a4a9c"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#cp-sky)"/>` +
    dots.map(([x, y]) => sparkle(x, y, 6)).join('') +
    pick(v, 'moon',
      disc(110, 86, 38, '#fff2b8') + `<circle cx="98" cy="76" r="7" fill="#f0dc90"/><circle cx="124" cy="100" r="9" fill="#f0dc90"/>`,
      shape('M122 50A38 38 0 1 0 122 122A30 30 0 1 1 122 50Z', '#fff2b8')) +
    pick(v, 'starGone', star(254, 72, 18, '#fff'), '') +
    star(390, 148, 18, pick(v, 'starColor', '#ffd23f', '#ff7aa8')) +
    pick(v, 'shooting', `<path d="M452 44L516 80" stroke="#bfe9ff" stroke-width="6" stroke-linecap="round"/>` + star(524, 86, 12, '#fff'), '') +
    shape(`M0 340L90 240L190 330L300 220L420 340L510 260L${W} 340V${H}H0Z`, '#3b3a78') +
    shape(`M0 500Q150 450 300 490Q450 450 ${W} 490V${H}H0Z`, '#2f7a56')
  );
}

function trees(v) {
  return (
    pine(56, 500, 1.1, '#23684a') + pine(180, 480, 0.8, '#23684a') + pine(470, 480, 0.8, '#23684a') + pine(556, 510, 1.1, '#23684a') +
    // 부엉이
    oval(74, 306, 25, 30, '#a7744a') + shape('M52 286L58 268L72 280ZM96 286L90 268L76 280Z', '#a7744a', 3) +
    disc(64, 298, 10, pick(v, 'owl', '#ffd23f', '#ff7aa8'), 3) + disc(86, 298, 10, pick(v, 'owl', '#ffd23f', '#ff7aa8'), 3) +
    `<circle cx="64" cy="298" r="3.5" fill="${INK}"/><circle cx="86" cy="298" r="3.5" fill="${INK}"/>` + shape('M70 310H80L75 318Z', '#ffb627', 2.5) +
    pick(v, 'pineStar', `<circle cx="556" cy="370" r="12" fill="#fff27a" opacity="0.5"/><circle cx="556" cy="370" r="6" fill="#fff27a"/>`, '')
  );
}

function tent(v) {
  const color = pick(v, 'tent', '#ff8a3d', '#4fb3ff');
  return (
    `<path d="M330 300V236" stroke="${INK}" stroke-width="5"/>` +
    pick(v, 'tentFlag', shape('M332 236L376 250L332 264Z', '#ffd23f', 3), '') +
    shape('M330 290L524 560H136Z', color) +
    shape('M330 290L392 560H268Z', '#3b2a4f') +
    shape('M330 290L268 560L236 560Z', '#ffc27a', 3) + shape('M330 290L392 560L424 560Z', '#ffc27a', 3) +
    line('M136 560L120 578M524 560L540 578', 4)
  );
}

function lantern(v) {
  const glow = pick(v, 'lantern', '#ffe27a', '#8be0c8');
  return `<circle cx="490" cy="490" r="34" fill="${glow}" opacity="0.3"/>` +
    box(476, 472, 28, 38, glow, 6) + box(472, 462, 36, 10, '#7a5236', 3, 3) + box(472, 510, 36, 10, '#7a5236', 3, 3) + line('M478 462Q490 442 502 462', 3) +
    `<path d="M490 520V560" stroke="${INK}" stroke-width="5"/>` + box(478, 556, 24, 8, '#7a5236', 2, 3);
}

function backpack(v) {
  return box(26, 520, 68, 84, pick(v, 'backpack', '#7b6cf6', '#ff5b5b'), 18) + box(36, 560, 48, 30, '#ffd23f', 8, 3) + line('M42 520Q60 498 78 520', 5);
}

function rabbit() {
  return oval(556, 600, 26, 22, '#fff') + oval(544, 560, 8, 24, '#fff', 3) + oval(568, 560, 8, 24, '#fff', 3) + disc(556, 584, 19, '#fff') +
    `<circle cx="550" cy="582" r="2.5" fill="${INK}"/><circle cx="562" cy="582" r="2.5" fill="${INK}"/><ellipse cx="556" cy="590" rx="3" ry="2" fill="#ff7aa8"/>`;
}

function fire(v) {
  const { x, y } = FIRE;
  const outer = pick(v, 'flame', '#ff8a3d', '#4fb3ff');
  const inner = pick(v, 'flame', '#ffd23f', '#bfe9ff');
  const logs = `<g transform="rotate(16 ${x} ${y})">` + box(x - 56, y + 2, 112, 18, '#7a5236', 8) + `</g><g transform="rotate(-16 ${x} ${y})">` + box(x - 56, y + 2, 112, 18, '#8a5a3c', 8) + `</g>`;
  return `<circle cx="${x}" cy="${y - 20}" r="74" fill="#ffb627" opacity="0.2"/>` +
    shape(`M${x - 34} ${y + 4}Q${x - 52} ${y - 38} ${x - 16} ${y - 58}Q${x - 14} ${y - 36} ${x} ${y - 36}Q${x - 6} ${y - 66} ${x + 12} ${y - 84}Q${x + 14} ${y - 48} ${x + 30} ${y - 40}Q${x + 48} ${y - 16} ${x + 34} ${y + 4}Z`, outer) +
    shape(`M${x - 16} ${y + 4}Q${x - 24} ${y - 18} ${x - 2} ${y - 34}Q${x + 2} ${y - 18} ${x + 12} ${y - 18}Q${x + 24} ${y - 6} ${x + 16} ${y + 4}Z`, inner, 3) +
    logs +
    pick(v, 'log', `<g transform="rotate(-4 ${x} ${y})">` + box(x + 26, y + 14, 52, 16, '#a7744a', 7) + `</g>`, '');
}

function draw(v) {
  return (
    sky(v) +
    trees(v) +
    tent(v) +
    lantern(v) +
    backpack(v) +
    pick(v, 'rabbit', rabbit(), '') +
    fire(v) +
    person({ ...DAD, mustache: pick(v, 'dadMustache', '#3a2630', null) }) +
    `<path d="M${dadHand.x} ${dadHand.y}L${dadHand.x + 52} ${dadHand.y - 6}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>` +
    pick(v, 'marshmallow', box(dadHand.x + 28, dadHand.y - 18, 26, 22, '#fff', 8, 3), '') +
    person({ ...GIRL, bow: pick(v, 'girlBow', '#ff5b8a', null) }) +
    person({ ...BOY, hat: pick(v, 'boyCap', '#3b7dd8', '#ffb627') }) +
    box(514, 722, 40, 44, pick(v, 'mug', '#ff7aa8', '#7fd0f0'), 6) + line('M554 734Q572 742 554 754', 5)
  );
}

export default { id: 'camping', title: '밤 캠핑', diffs, draw };
