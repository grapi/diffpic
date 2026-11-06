// 장면 29: 축구 경기 — 골대 앞의 골키퍼, 공을 차는 아이, 카드를 든 심판, 점수판.

import { W, H, INK, pick, box, disc, oval, shape, line, sun, cloud, bird, person, headPos, handPos } from '../art.js';

const KEEPER = { x: 120, y: 560, s: 0.9, hs: 1.25, hairStyle: 'short', hair: '#3a2630', bottom: '#3d3b52', bottomType: 'shorts', arms: [120, 120], shoes: '#fff' };
const STRIKER = { x: 360, y: 700, s: 0.95, hs: 1.25, hairStyle: 'spiky', hair: '#5a3a2a', top: '#ff5b5b', bottom: '#fff', bottomType: 'shorts', arms: [60, 40], shoes: '#3d3b52' };
const REF = { x: 520, y: 790, s: 1, hairStyle: 'side', hair: '#3a2630', top: '#3d3b52', stripes: '#fff', bottom: '#3d3b52', bottomType: 'shorts', arms: [10, 150], shoes: '#3d3b52' };
const keeperHands = [handPos(KEEPER, -1), handPos(KEEPER, 1)];
const strikerHead = headPos(STRIKER);
const refHead = headPos(REF);
const cardHand = handPos(REF, 1);

const diffs = [
  { id: 'sunColor', label: '해 색', cx: 540, cy: 60, r: 42 },
  { id: 'cloudGone', label: '구름', cx: 120, cy: 50, r: 40 },
  { id: 'bird', label: '새', cx: 380, cy: 70, r: 28 },
  { id: 'score', label: '점수판 점수', cx: 330, cy: 160, r: 30 },
  { id: 'board', label: '점수판 색', cx: 250, cy: 136, r: 26 },
  { id: 'flag', label: '관중석 깃발 색', cx: 520, cy: 230, r: 26 },
  { id: 'fan', label: '관중 모자', cx: 440, cy: 270, r: 22 },
  { id: 'post', label: '골대 색', cx: 32, cy: 440, r: 26 },
  { id: 'gloves', label: '골키퍼 장갑 색', cx: keeperHands[0].x, cy: keeperHands[0].y, r: 24 },
  { id: 'keeperTop', label: '골키퍼 옷 색', cx: KEEPER.x, cy: KEEPER.y - 86, r: 26 },
  { id: 'number', label: '등번호', cx: STRIKER.x, cy: STRIKER.y - 90, r: 22 },
  { id: 'headband', label: '머리띠 색', cx: strikerHead.x, cy: strikerHead.y - 22, r: 30 },
  { id: 'ball', label: '공 무늬 색', cx: 440, cy: 690, r: 26 },
  { id: 'card', label: '심판 카드 색', cx: cardHand.x, cy: cardHand.y - 20, r: 24 },
  { id: 'whistle', label: '호루라기', cx: REF.x - 4, cy: REF.y - 126, r: 20 },
  { id: 'cone', label: '고깔', cx: 230, cy: 760, r: 24 },
  { id: 'bottle', label: '물병 색', cx: 60, cy: 740, r: 26 },
  { id: 'cornerFlag', label: '모서리 깃발 색', cx: 590, cy: 420, r: 22 },
];

function field(v) {
  return (
    `<defs><linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ad9f8"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#sc-sky)"/>` +
    sun(540, 60, 26, pick(v, 'sunColor', '#ffd23f', '#ff8a3d')) +
    pick(v, 'cloudGone', cloud(120, 50, 0.8), '') +
    pick(v, 'bird', line('M360 72Q370 60 380 72Q390 60 400 72', 4), '') +
    // 관중석
    box(-5, 210, W + 10, 120, '#c9c8d8', 0) + `<path d="M0 250H${W}M0 290H${W}" stroke="#a9a8bc" stroke-width="4"/>` +
    [40, 100, 160, 220, 280, 340, 400, 460, 560].map((x, i) => disc(x, 236 + (i % 2) * 40, 14, ['#ff7aa8', '#4fb3ff', '#ffd23f', '#5cc46e'][i % 4], 3)).join('') +
    pick(v, 'fan', shape('M424 280Q426 256 440 256Q454 256 456 280Z', '#ff5b5b', 3), '') + disc(440, 282, 14, '#ffd8c2', 3) +
    line('M520 250V210', 3) + shape('M522 210L552 220L522 232Z', pick(v, 'flag', '#ff5b5b', '#7b6cf6'), 3) +
    // 점수판
    line('M250 196V210M350 196V210', 5) +
    box(200, 110, 200, 90, pick(v, 'board', '#3d3b52', '#3f7fd8'), 8) +
    `<text x="300" y="174" font-size="44" font-weight="800" fill="#ffe27a" text-anchor="middle">2 : ${pick(v, 'score', '1', '2')}</text>` +
    // 잔디
    `<rect y="330" width="${W}" height="${H - 330}" fill="#6fc35a"/>` + `<path d="M0 330H${W}" stroke="${INK}" stroke-width="4"/>` +
    [0, 1, 2, 3, 4].map((i) => `<rect y="${360 + i * 90}" width="${W}" height="45" fill="#7fd06a"/>`).join('') +
    `<path d="M600 520Q480 560 420 640" fill="none" stroke="#fff" stroke-width="5"/>` +
    line('M590 440V400', 3) + shape('M592 400L616 408L592 418Z', pick(v, 'cornerFlag', '#ffd23f', '#ff5b5b'), 3)
  );
}

function goal(v) {
  const c = pick(v, 'post', '#fff', '#ffd23f');
  return `<path d="M30 380H210M30 410H210M30 440H210M30 470H210M30 500H210M30 530H210M60 360V560M100 360V560M140 360V560M180 360V560" stroke="#fff" stroke-width="2" opacity="0.8"/>` +
    box(20, 350, 200, 14, c, 3) + box(20, 350, 14, 214, c, 3) + box(206, 350, 14, 214, c, 3);
}

function ball(v) {
  const c = pick(v, 'ball', INK, '#4fb3ff');
  return disc(440, 690, 22, '#fff') + `<path d="M440 680L450 687L446 699H434L430 687Z" fill="${c}"/><path d="M440 668V680M450 687L460 682M446 699L452 708M434 699L428 708M430 687L420 682" stroke="${INK}" stroke-width="2"/>`;
}

function draw(v) {
  return (
    field(v) +
    goal(v) +
    person({ ...KEEPER, top: pick(v, 'keeperTop', '#ffd23f', '#5cc46e') }) +
    keeperHands.map((h) => disc(h.x, h.y, 12, pick(v, 'gloves', '#ff8a3d', '#4fb3ff'), 3)).join('') +
    person(STRIKER) +
    `<text x="${STRIKER.x}" y="${STRIKER.y - 80}" font-size="26" font-weight="800" fill="#fff" text-anchor="middle">${pick(v, 'number', '7', '9')}</text>` +
    box(strikerHead.x - 38, strikerHead.y - 30, 76, 12, pick(v, 'headband', '#4fb3ff', '#ffd23f'), 6, 3) +
    ball(v) +
    pick(v, 'cone', shape('M214 784L230 740L246 784Z', '#ff8a3d', 3) + `<path d="M222 762H238" stroke="#fff" stroke-width="5"/>`, '') +
    box(46, 712, 28, 56, pick(v, 'bottle', '#4fb3ff', '#ff7aa8'), 8) + box(52, 700, 16, 14, '#fff', 3, 3) +
    person(REF) +
    pick(v, 'whistle', line(`M${REF.x - 10} ${REF.y - 136}L${REF.x - 4} ${REF.y - 124}`, 2) + box(REF.x - 8, REF.y - 128, 16, 10, '#ffd23f', 3, 2.5), '') +
    box(cardHand.x - 12, cardHand.y - 38, 24, 32, pick(v, 'card', '#ffd23f', '#ff3b3b'), 3, 3)
  );
}

export default { id: 'soccer', title: '축구 경기', diffs, draw };
