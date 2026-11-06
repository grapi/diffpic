// 장면 19: 기차역 — 승강장에 들어온 기차, 벤치의 할머니, 깃발을 든 역무원.

import { W, H, INK, pick, box, disc, oval, shape, line, cloud, bird, person, headPos, handPos } from '../art.js';

const GRANDMA = { x: 300, y: 712, s: 0.9, sit: true, hairStyle: 'curly', hair: '#d6d4de', top: '#ff9fbd', bottom: '#7b6cf6', bottomType: 'skirt', arms: [-20, -20], shoes: '#e9d7c0' };
const KID = { x: 100, y: 790, s: 0.9, hs: 1.25, hairStyle: 'cap', top: '#5cc46e', bottom: '#3d4f8f', bottomType: 'shorts', arms: [10, 40], shoes: '#fff' };
const CONDUCTOR = { x: 500, y: 790, s: 1, hairStyle: 'cap', top: '#3d4f8f', bottom: '#3d4f8f', arms: [10, 125], shoes: '#3d3b52', mouth: 'open' };
const grandmaHead = headPos(GRANDMA);
const kidHead = headPos(KID);
const condHead = headPos(CONDUCTOR);
const flagHand = handPos(CONDUCTOR, 1);

const diffs = [
  { id: 'cloudGone', label: '구름', cx: 100, cy: 40, r: 40 },
  { id: 'sign', label: '역 이름판 색', cx: 300, cy: 82, r: 44 },
  { id: 'clock', label: '시곗바늘', cx: 300, cy: 214, r: 38 },
  { id: 'roof', label: '지붕 줄무늬 색', cx: 120, cy: 150, r: 26 },
  { id: 'smoke', label: '굴뚝 연기', cx: 452, cy: 340, r: 40 },
  { id: 'cabNumber', label: '기관차 번호', cx: 515, cy: 425, r: 26 },
  { id: 'headlight', label: '앞 등 색', cx: 560, cy: 476, r: 22 },
  { id: 'wheel', label: '기관차 바퀴 색', cx: 480, cy: 560, r: 30 },
  { id: 'passenger', label: '창가 승객', cx: 300, cy: 488, r: 26 },
  { id: 'car', label: '노란 객차 색', cx: 110, cy: 500, r: 40 },
  { id: 'grandmaGlasses', label: '할머니 안경', cx: grandmaHead.x, cy: grandmaHead.y, r: 30 },
  { id: 'yarn', label: '털실 색', cx: 372, cy: 678, r: 24 },
  { id: 'kidCap', label: '아이 모자 색', cx: kidHead.x + 6, cy: kidHead.y - 22, r: 34 },
  { id: 'suitcase', label: '여행가방 색', cx: 172, cy: 744, r: 30 },
  { id: 'sticker', label: '가방 별 스티커', cx: 172, cy: 730, r: 22 },
  { id: 'condMustache', label: '역무원 콧수염', cx: condHead.x, cy: condHead.y + 6, r: 26 },
  { id: 'flag', label: '깃발 색', cx: flagHand.x + 16, cy: flagHand.y - 34, r: 26 },
  { id: 'pigeon', label: '비둘기 색', cx: 404, cy: 776, r: 28 },
];

function sky(v) {
  return (
    `<defs><linearGradient id="st-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ad9f8"/><stop offset="1" stop-color="#e6f8ff"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#st-sky)"/>` +
    pick(v, 'cloudGone', cloud(100, 40, 0.9), '') + cloud(500, 36, 0.8) +
    shape(`M0 400Q150 340 300 390T${W} 370V600H0Z`, '#9fd36a')
  );
}

function canopy(v) {
  const stripe = pick(v, 'roof', '#ff8a3d', '#4fb3ff');
  return (
    box(30, 150, 16, 440, '#9aa0b8', 3) + box(554, 150, 16, 440, '#9aa0b8', 3) +
    shape('M0 112H600V162H0Z', '#fff') +
    [0, 1, 2, 3, 4, 5].map((i) => shape(`M${i * 100} 112H${i * 100 + 50}V162H${i * 100}Z`, stripe, 3)).join('') +
    box(220, 58, 160, 48, pick(v, 'sign', '#3d4f8f', '#a8483b'), 8) +
    `<text x="300" y="91" font-size="26" font-weight="800" fill="#fff" text-anchor="middle">꿈나라역</text>` +
    line('M300 162V180', 4) + `<circle cx="300" cy="214" r="32" fill="#ffd23f" stroke="${INK}" stroke-width="4"/><circle cx="300" cy="214" r="25" fill="#fff" stroke="${INK}" stroke-width="3"/>` +
    (([h, m]) => line(`M300 214L${300 + h[0]} ${214 + h[1]}M300 214L${300 + m[0]} ${214 + m[1]}`, 4))(pick(v, 'clock', [[0, -14], [16, 0]], [[-12, 6], [0, -18]]))
  );
}

function train(v) {
  const car = (x, c, passengerAt) =>
    box(x, 450, 180, 100, c, 8) + [x + 16, x + 70, x + 124].map((wx) => box(wx, 468, 40, 38, '#bfe9ff', 4, 3)).join('') +
    (passengerAt ? disc(passengerAt, 494, 13, '#ffd8c2', 3) + `<circle cx="${passengerAt - 5}" cy="492" r="2.2" fill="${INK}"/><circle cx="${passengerAt + 5}" cy="492" r="2.2" fill="${INK}"/>` : '') +
    disc(x + 40, 560, 18, '#3d3b52') + disc(x + 140, 560, 18, '#3d3b52');
  const wheel = pick(v, 'wheel', '#3d3b52', '#ff5b5b');
  return (
    `<path d="M0 578H${W}M0 590H${W}" stroke="#7a5236" stroke-width="6"/>` +
    car(20, pick(v, 'car', '#ffd23f', '#5cc46e'), 0) +
    car(210, '#4fb3ff', v.has('passenger') ? 0 : 300) +
    pick(v, 'smoke', disc(430, 370, 16, '#fff', 3) + disc(448, 342, 20, '#fff', 3) + disc(476, 316, 24, '#fff', 3), '') +
    box(414, 392, 34, 54, '#3d3b52', 4) + box(408, 384, 46, 14, '#3d3b52', 4, 3) +
    box(470, 392, 92, 62, '#ff5b5b', 6) + box(488, 404, 56, 36, '#bfe9ff', 4, 3) +
    `<text x="515" y="436" font-size="26" font-weight="800" fill="${INK}" text-anchor="middle">${pick(v, 'cabNumber', '7', '1')}</text>` +
    box(400, 446, 176, 104, '#ff5b5b', 10) + box(400, 500, 176, 14, '#fff', 0, 3) +
    disc(560, 476, 13, pick(v, 'headlight', '#ffe27a', '#7fd0f0'), 3) +
    [430, 480, 530].map((x) => disc(x, 560, 22, wheel) + disc(x, 560, 7, '#c9c8d8', 3)).join('')
  );
}

function platform(v) {
  return (
    `<rect y="596" width="${W}" height="${H - 596}" fill="#e0d6c2"/><rect y="596" width="${W}" height="14" fill="#ffd23f"/><path d="M0 610H${W}" stroke="${INK}" stroke-width="3"/>` +
    box(220, 646, 170, 14, '#a7744a', 4) + box(214, 686, 182, 16, '#a7744a', 4) + line('M230 702V730M380 702V730', 6)
  );
}

function draw(v) {
  return (
    sky(v) +
    canopy(v) +
    train(v) +
    platform(v) +
    person({ ...GRANDMA, glasses: !v.has('grandmaGlasses') }) +
    disc(372, 674, 14, pick(v, 'yarn', '#ff5b5b', '#4fb3ff'), 3) + line('M362 666L382 682M364 680L380 666', 2) +
    person({ ...KID, hat: pick(v, 'kidCap', '#ff8a3d', '#7b6cf6') }) +
    box(144, 704, 58, 76, pick(v, 'suitcase', '#ff7aa8', '#7fd0f0'), 8) + line('M162 704Q173 688 184 704', 4) + disc(158, 786, 5, INK, 0) + disc(188, 786, 5, INK, 0) +
    pick(v, 'sticker', shape('M172 716L176 727L188 728L179 735L182 746L172 740L162 746L165 735L156 728L168 727Z', '#ffd23f', 2.5), '') +
    person({ ...CONDUCTOR, hat: '#3d4f8f', mustache: pick(v, 'condMustache', '#3a2630', null) }) +
    `<path d="M${flagHand.x} ${flagHand.y + 8}V${flagHand.y - 60}" stroke="${INK}" stroke-width="4"/>` +
    shape(`M${flagHand.x + 2} ${flagHand.y - 60}L${flagHand.x + 40} ${flagHand.y - 46}L${flagHand.x + 2} ${flagHand.y - 30}Z`, pick(v, 'flag', '#ff5b5b', '#5cc46e'), 3) +
    bird(404, 772, pick(v, 'pigeon', '#9aa0b8', '#ff9fbd'))
  );
}

export default { id: 'station', title: '기차역', diffs, draw };
