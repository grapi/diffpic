// 장면 13: 놀이공원 — 대관람차와 천막, 풍선 장수, 솜사탕을 든 아이들.

import { W, H, INK, r1, pick, box, disc, oval, shape, line, cloud, balloon, person, headPos, handPos } from '../art.js';

const SELLER = { x: 86, y: 730, s: 1, hairStyle: 'cap', top: '#7b6cf6', stripes: '#ffd23f', bottom: '#3d4f8f', arms: [150, 10], shoes: '#ff5b5b', mustache: '#3a2630', mouth: 'open' };
const GIRL = { x: 290, y: 780, s: 0.88, hs: 1.25, hairStyle: 'pigtails', hair: '#2b2233', bottom: '#7fd0f0', bottomType: 'skirt', arms: [20, 120], shoes: '#fff' };
const BOY = { x: 464, y: 784, s: 0.88, hs: 1.25, hairStyle: 'spiky', hair: '#3a2630', bottom: '#ffd23f', bottomType: 'shorts', arms: [120, 20], shoes: '#4fb3ff' };

const sellerHead = headPos(SELLER);
const sellerHand = handPos(SELLER, -1);
const girlHand = handPos(GIRL, 1);
const girlHead = headPos(GIRL);
const boyHand = handPos(BOY, -1);
const boyHead = headPos(BOY);

const HUB = { x: 196, y: 226 };
const WHEEL_R = 150;
const CARS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4 + Math.PI / 8;
  return { x: r1(HUB.x + Math.cos(a) * WHEEL_R), y: r1(HUB.y + Math.sin(a) * WHEEL_R) };
});
const CAR_COLORS = ['#ff5b5b', '#ffd23f', '#5cc46e', '#4fb3ff', '#ff7aa8', '#ff8a3d', '#7b6cf6', '#39c6b5'];
const ODD = 7;
const PERSON_CAR = 6;

const diffs = [
  { id: 'airBalloon', label: '열기구 색', cx: 490, cy: 74, r: 54 },
  { id: 'cloudGone', label: '구름', cx: 372, cy: 54, r: 40 },
  { id: 'carColor', label: '관람차 칸 색', cx: CARS[ODD].x, cy: CARS[ODD].y + 16, r: 32 },
  { id: 'carPerson', label: '관람차 탄 사람', cx: CARS[PERSON_CAR].x, cy: CARS[PERSON_CAR].y + 4, r: 32 },
  { id: 'hub', label: '관람차 가운데 색', cx: HUB.x, cy: HUB.y, r: 28 },
  { id: 'tentFlag', label: '천막 깃발 색', cx: 490, cy: 196, r: 30 },
  { id: 'tent', label: '천막 줄무늬 색', cx: 490, cy: 320, r: 44 },
  { id: 'tentDoor', label: '천막 입구 별', cx: 490, cy: 416, r: 28 },
  { id: 'booth', label: '매표소 지붕 색', cx: 530, cy: 520, r: 38 },
  { id: 'boothSign', label: '매표소 글자', cx: 530, cy: 578, r: 26 },
  { id: 'boothFace', label: '매표소 직원', cx: 530, cy: 626, r: 28 },
  { id: 'balloon1', label: '풍선 색', cx: 44, cy: 454, r: 34 },
  { id: 'balloon2', label: '풍선 하나', cx: 146, cy: 448, r: 36 },
  { id: 'sellerCap', label: '풍선 장수 모자 색', cx: sellerHead.x + 6, cy: sellerHead.y - 22, r: 34 },
  { id: 'sellerMustache', label: '풍선 장수 콧수염', cx: sellerHead.x, cy: sellerHead.y + 6, r: 24 },
  { id: 'candy', label: '솜사탕 색', cx: girlHand.x + 8, cy: girlHand.y - 46, r: 38 },
  { id: 'girlTop', label: '여자아이 옷 색', cx: GIRL.x, cy: GIRL.y - 88, r: 24 },
  { id: 'girlBow', label: '여자아이 리본 색', cx: girlHead.x, cy: girlHead.y - 20, r: 48 },
  { id: 'iceCream', label: '아이스크림 색', cx: boyHand.x, cy: boyHand.y - 26, r: 28 },
  { id: 'boyTop', label: '남자아이 옷 색', cx: BOY.x, cy: BOY.y - 88, r: 24 },
];

function wheel(v) {
  const spokes = CARS.map((c) => `M${HUB.x} ${HUB.y}L${c.x} ${c.y}`).join('');
  return (
    `<path d="M${HUB.x} ${HUB.y}L104 560M${HUB.x} ${HUB.y}L288 560" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M${HUB.x} ${HUB.y}L104 560M${HUB.x} ${HUB.y}L288 560" stroke="#b8b8c8" stroke-width="5" stroke-linecap="round"/>` +
    `<circle cx="${HUB.x}" cy="${HUB.y}" r="${WHEEL_R}" fill="none" stroke="#fff" stroke-width="10"/><circle cx="${HUB.x}" cy="${HUB.y}" r="${WHEEL_R}" fill="none" stroke="${INK}" stroke-width="3"/>` +
    `<path d="${spokes}" fill="none" stroke="#fff" stroke-width="5"/>` +
    disc(HUB.x, HUB.y, 20, pick(v, 'hub', '#ffd23f', '#ff5b8a')) +
    CARS.map((c, i) => {
      const color = i === ODD ? pick(v, 'carColor', CAR_COLORS[i], '#ffffff') : CAR_COLORS[i];
      const rider = i === PERSON_CAR && !v.has('carPerson') ? disc(c.x, c.y - 8, 13, '#ffd8c2', 3) + `<circle cx="${c.x - 5}" cy="${c.y - 9}" r="2.2" fill="${INK}"/><circle cx="${c.x + 5}" cy="${c.y - 9}" r="2.2" fill="${INK}"/>` : '';
      return line(`M${c.x} ${c.y}V${c.y + 10}`, 3) + rider + shape(`M${c.x - 24} ${c.y + 12}H${c.x + 24}L${c.x + 18} ${c.y + 40}H${c.x - 18}Z`, color, 3) + box(c.x - 26, c.y + 2, 52, 8, color, 3, 3);
    }).join('')
  );
}

function tent(v) {
  const c = pick(v, 'tent', '#ff5b5b', '#4fb3ff');
  const panels = [0, 1, 2, 3, 4, 5].map((i) => `M${400 + i * 30} 450V340L${490} 240L${400 + (i + 1) * 30} 340V450Z`);
  return `<path d="M490 240V190" stroke="${INK}" stroke-width="5"/>` +
    shape('M492 180L530 196L492 212Z', pick(v, 'tentFlag', '#ffd23f', '#5cc46e'), 3) +
    panels.map((d, i) => shape(d, i % 2 ? '#fff' : c, 3)).join('') +
    shape('M400 340L490 240L580 340L556 332L534 344L512 332L490 344L468 332L446 344L424 332Z', c) +
    shape('M464 450V406Q490 376 516 406V450Z', '#3d3b52') +
    pick(v, 'tentDoor', shape('M490 396L495 410L510 411L498 420L502 434L490 426L478 434L482 420L470 411L485 410Z', '#ffd23f', 2.5), '');
}

function booth(v) {
  const roof = pick(v, 'booth', '#ff8a3d', '#5cc46e');
  return box(470, 560, 120, 110, '#fff2cf') +
    shape('M452 562L476 500H584L608 562Z', roof) + box(492, 562, 76, 30, '#fff', 3, 3) +
    `<text x="530" y="586" font-size="24" font-weight="800" fill="${INK}" text-anchor="middle">${pick(v, 'boothSign', '표', '문')}</text>` +
    box(494, 600, 72, 52, '#bfe9ff', 3, 3) +
    pick(v, 'boothFace', disc(530, 630, 17, '#ffd8c2', 3) + `<circle cx="524" cy="628" r="2.5" fill="${INK}"/><circle cx="536" cy="628" r="2.5" fill="${INK}"/><path d="M525 636Q530 641 535 636" fill="none" stroke="${INK}" stroke-width="2.5"/>`, '');
}

function candy(v, x, y) {
  return `<path d="M${x} ${y}L${x + 8} ${y - 32}" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M${x} ${y}L${x + 8} ${y - 32}" stroke="${INK}" stroke-width="2"/>` +
    [[0, 0, 22], [-16, 8, 16], [16, 8, 16], [-10, -14, 15], [12, -14, 15]].map(([dx, dy, r]) => disc(x + 8 + dx, y - 46 + dy, r, pick(v, 'candy', '#ff9fd0', '#8fd8f8'), 3)).join('') +
    [[0, 0, 22], [-16, 8, 16], [16, 8, 16], [-10, -14, 15], [12, -14, 15]].map(([dx, dy, r]) => `<circle cx="${x + 8 + dx}" cy="${y - 46 + dy}" r="${r - 1.5}" fill="${pick(v, 'candy', '#ff9fd0', '#8fd8f8')}"/>`).join('');
}

function draw(v) {
  return (
    `<defs><linearGradient id="am-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0f8"/><stop offset="1" stop-color="#ffe9d4"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#am-sky)"/>` +
    pick(v, 'cloudGone', cloud(372, 54, 0.9), '') + cloud(360, 170, 0.6) +
    // 열기구
    line('M466 114L478 138M514 114L502 138', 3) + box(476, 136, 28, 18, '#a7744a', 3, 3) +
    `<circle cx="490" cy="74" r="44" fill="${pick(v, 'airBalloon', '#ff8a3d', '#7b6cf6')}" stroke="${INK}" stroke-width="4"/>` +
    `<path d="M490 30Q470 74 490 118Q510 74 490 30Z" fill="#fff" stroke="${INK}" stroke-width="3"/>` +
    wheel(v) +
    `<rect y="450" width="${W}" height="${H - 450}" fill="#a5d86a"/><path d="M0 450H${W}" stroke="${INK}" stroke-width="4"/>` +
    shape(`M170 ${H}Q240 620 300 450L390 450Q420 640 430 ${H}Z`, '#efdcb4') +
    `<path d="M104 560L88 572H120ZM288 560L272 572H304Z" fill="#b8b8c8" stroke="${INK}" stroke-width="3"/>` +
    tent(v) +
    booth(v) +
    person({ ...SELLER, hat: pick(v, 'sellerCap', '#ff5b5b', '#3fae5f'), mustache: pick(v, 'sellerMustache', '#3a2630', null) }) +
    balloon(44, 454, pick(v, 'balloon1', '#ff5b8a', '#ffd23f'), sellerHand.x, sellerHand.y) +
    pick(v, 'balloon2', balloon(146, 448, '#4fb3ff', sellerHand.x, sellerHand.y), '') +
    balloon(92, 400, '#5cc46e', sellerHand.x, sellerHand.y) +
    person({ ...GIRL, top: pick(v, 'girlTop', '#ff7aa8', '#ffd23f'), bows: pick(v, 'girlBow', '#ff5b8a', '#4fb3ff') }) +
    candy(v, girlHand.x, girlHand.y) +
    person({ ...BOY, top: pick(v, 'boyTop', '#5cc46e', '#ff8a3d') }) +
    shape(`M${boyHand.x - 11} ${boyHand.y - 14}L${boyHand.x + 11} ${boyHand.y - 14}L${boyHand.x} ${boyHand.y + 14}Z`, '#f4c27a', 3) +
    disc(boyHand.x, boyHand.y - 26, 15, pick(v, 'iceCream', '#fff2b8', '#8be0c8'), 3)
  );
}

export default { id: 'amusement', title: '놀이공원', diffs, draw };
