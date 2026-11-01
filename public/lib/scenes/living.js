// 장면 1: 거실 파티 — 소파의 할머니·할아버지, 케이크를 든 엄마, 환호하는 아이들.

import { W, H, INK, OL, pick, r1, blob, heart, gift, balloon, cat, plant, clock, person, headPos, handPos } from '../art.js';

const FLAG_COLORS = ['#ff7aa8', '#ffd23f', '#7b6cf6', '#ff8a3d', '#ffffff'];
const FLAG_N = 8;
const FLAG_ODD = 5; // 색이 바뀌는 깃발

// 가랜드 줄: 2차 베지어 (-10,30) → (300,110) → (610,30)
function garland(t) {
  const u = 1 - t;
  return { x: r1(u * u * -10 + 2 * u * t * 300 + t * t * 610), y: r1(u * u * 30 + 2 * u * t * 110 + t * t * 30) };
}
const FLAGS = Array.from({ length: FLAG_N }, (_, i) => garland(0.07 + i * 0.123));

// 뒷줄은 소파에 앉은 할머니·할아버지, 앞줄은 엄마와 아이들
const MOM = { x: 110, y: 780, s: 1.1, hairStyle: 'bob', hair: '#3a2630', top: '#ffffff', bottom: '#f6c343', bottomType: 'skirt', arms: [-25, -25] };
const GRANDMA = { x: 242, y: 597, s: 0.95, sit: true, hairStyle: 'curly', hair: '#d6d4de', top: '#7fd0f0', bottom: '#6d7bd8', bottomType: 'skirt', glasses: true, collar: '#ffffff', arms: [5, 35], shoes: '#e9d7c0' };
const GRANDPA = { x: 358, y: 597, s: 0.95, sit: true, hairStyle: 'side', hair: '#d6d4de', top: '#4caf6a', bottom: '#33427a', arms: [35, 5], mouth: 'smile', shoes: '#7a5236' };
const GIRL = { x: 300, y: 790, s: 0.8, hs: 1.25, hairStyle: 'pigtails', hair: '#2b2233', top: '#ffd23f', bottom: '#ff7aa8', bottomType: 'skirt', arms: [150, 150] };
const BOY = { x: 480, y: 784, s: 0.82, hs: 1.25, hairStyle: 'cap', top: '#ff5b5b', stripes: '#ffffff', bottom: '#ffd23f', bottomType: 'shorts', arms: [155, 40], shoes: '#4fb3ff' };

const grandmaHead = headPos(GRANDMA);
const grandpaHead = headPos(GRANDPA);
const girlHead = headPos(GIRL);
const boyHead = headPos(BOY);
const boyHand = handPos(BOY, -1);
const momHand = handPos(MOM, -1);
const BALLOON = { x: 456, y: 404 };
const CAKE = { x: MOM.x, y: momHand.y + 14 }; // 촛불이 엄마 턱을 가리지 않을 만큼 내려 든다
const CLOCK = { x: 490, y: 180 };
const LAMP = { x: 548, y: 600 };
const FRAME = { x: 300, y: 230 };
const WIN = { x: 40, y: 150 }; // 창틀 왼쪽 위
const SOFA = { x: 122, y: 444 }; // 소파 팔걸이 왼쪽 위
const CAT = { x: 564, y: 792, s: 0.75 };

const diffs = [
  { id: 'flag', label: '가랜드 깃발 색', cx: FLAGS[FLAG_ODD].x, cy: FLAGS[FLAG_ODD].y + 15, r: 30 },
  { id: 'windowCloud', label: '창밖 구름', cx: WIN.x + 62, cy: WIN.y + 56, r: 34 },
  { id: 'heartGone', label: '벽의 하트', cx: 272, cy: 368, r: 26 },
  { id: 'frameHeart', label: '액자 속 하트 색', cx: FRAME.x, cy: FRAME.y, r: 52 },
  { id: 'clock', label: '시곗바늘', cx: CLOCK.x, cy: CLOCK.y, r: 46 },
  { id: 'lampShade', label: '스탠드 갓 색', cx: LAMP.x, cy: LAMP.y - 242, r: 38 },
  { id: 'cushion', label: '쿠션 색', cx: SOFA.x + 60, cy: SOFA.y + 42, r: 30 },
  { id: 'grandmaGlasses', label: '할머니 안경', cx: grandmaHead.x, cy: grandmaHead.y, r: 32 },
  { id: 'grandpaMustache', label: '할아버지 콧수염', cx: grandpaHead.x, cy: grandpaHead.y + 4, r: 30 },
  { id: 'grandpaTop', label: '할아버지 옷 색', cx: GRANDPA.x, cy: GRANDPA.y - 67, r: 30 },
  { id: 'girlBow', label: '여자아이 리본 색', cx: girlHead.x, cy: girlHead.y - 18, r: 46 },
  { id: 'girlShoes', label: '여자아이 신발 색', cx: GIRL.x, cy: GIRL.y - 6, r: 28 },
  { id: 'boyCap', label: '남자아이 모자 색', cx: boyHead.x + 6, cy: boyHead.y - 18, r: 36 },
  { id: 'balloon', label: '풍선 색', cx: BALLOON.x, cy: BALLOON.y, r: 38 },
  { id: 'cakeCandle', label: '케이크 초', cx: CAKE.x, cy: CAKE.y - 46, r: 32 },
  { id: 'momShoes', label: '엄마 신발 색', cx: MOM.x, cy: MOM.y - 6, r: 30 },
  { id: 'giftRibbon', label: '선물 리본 색', cx: 210, cy: 758, r: 38 },
  { id: 'giftGone', label: '작은 선물', cx: 392, cy: 772, r: 32 },
  { id: 'catTail', label: '고양이 꼬리', cx: CAT.x + 30 * CAT.s, cy: CAT.y - 30 * CAT.s, r: 30 },
  { id: 'plantFlower', label: '화분 꽃 색', cx: 44, cy: 498, r: 30 },
];

function cake(v) {
  const { x, y } = CAKE;
  const candles = pick(v, 'cakeCandle', [-16, 0, 16], [-16, 16]);
  return (
    `<ellipse cx="${x}" cy="${y + 4}" rx="48" ry="10" fill="#fff" ${OL()}/>` +
    `<rect x="${x - 36}" y="${y - 36}" width="72" height="38" rx="6" fill="#fff1e0" ${OL()}/>` +
    `<path d="M${x - 36} ${y - 24}Q${x - 28} ${y - 14} ${x - 20} ${y - 24}Q${x - 12} ${y - 12} ${x - 4} ${y - 24}Q${x + 4} ${y - 14} ${x + 12} ${y - 24}Q${x + 20} ${y - 12} ${x + 28} ${y - 24}Q${x + 33} ${y - 18} ${x + 36} ${y - 24}L${x + 36} ${y - 30}Q${x + 36} ${y - 36} ${x + 30} ${y - 36}L${x - 30} ${y - 36}Q${x - 36} ${y - 36} ${x - 36} ${y - 30}Z" fill="#ff9fbd" ${OL(3)}/>` +
    candles.map((dx) =>
      `<rect x="${x + dx - 3.5}" y="${y - 58}" width="7" height="22" fill="#7fd0f0" ${OL(2.5)}/>` +
      `<path d="M${x + dx} ${y - 72}Q${x + dx + 7} ${y - 62} ${x + dx} ${y - 58}Q${x + dx - 7} ${y - 62} ${x + dx} ${y - 72}Z" fill="#ffb627" ${OL(2)}/>`
    ).join('') +
    `<circle cx="${x - 22}" cy="${y - 8}" r="5" fill="#ff5b5b" ${OL(2)}/><circle cx="${x + 22}" cy="${y - 8}" r="5" fill="#ff5b5b" ${OL(2)}/>`
  );
}

function sofa(v) {
  const body = '#8a6cf0';
  const seat = '#9d84f5';
  return (
    `<g transform="translate(${SOFA.x} ${SOFA.y})">` +
    `<rect x="30" y="144" width="12" height="12" fill="${INK}"/><rect x="314" y="144" width="12" height="12" fill="${INK}"/>` +
    `<rect x="36" y="0" width="284" height="104" rx="24" fill="${body}" ${OL()}/>` +
    `<path d="M60 8Q58 40 74 52M296 8Q298 40 282 52" fill="none" stroke="#7458db" stroke-width="5" stroke-linecap="round"/>` +
    `<rect x="34" y="36" width="52" height="46" rx="12" transform="rotate(-10 60 59)" fill="${pick(v, 'cushion', '#ffd23f', '#4fb3ff')}" ${OL()}/>` +
    `<rect x="270" y="36" width="52" height="46" rx="12" transform="rotate(10 296 59)" fill="#ff8a3d" ${OL()}/>` +
    `<rect x="26" y="92" width="304" height="36" rx="12" fill="${seat}" ${OL()}/>` +
    `<rect x="18" y="118" width="320" height="28" rx="8" fill="${body}" ${OL()}/>` +
    `<rect x="0" y="52" width="50" height="94" rx="22" fill="${body}" ${OL()}/>` +
    `<rect x="306" y="52" width="50" height="94" rx="22" fill="${body}" ${OL()}/>` +
    `</g>`
  );
}

function windowBox(v) {
  return (
    `<g transform="translate(${WIN.x} ${WIN.y})">` +
    `<rect x="0" y="0" width="150" height="132" rx="6" fill="#fff" ${OL()}/>` +
    `<rect x="12" y="12" width="126" height="108" fill="#bfe9ff" ${OL(3)}/>` +
    pick(v, 'windowCloud', blob([[46, 58, 14], [62, 50, 18], [80, 60, 13]], '#ffffff', 3), '') +
    `<circle cx="114" cy="34" r="11" fill="#ffd23f" ${OL(3)}/>` +
    `<path d="M75 12V120M12 66H138" ${OL(4)}/>` +
    `<path d="M-12 -10Q0 42 -8 144L22 144Q16 52 30 -10Z" fill="#ff7aa8" ${OL()}/>` +
    `<path d="M162 -10Q150 42 158 144L128 144Q134 52 120 -10Z" fill="#ff7aa8" ${OL()}/>` +
    `<rect x="-20" y="-18" width="190" height="12" rx="6" fill="#a7744a" ${OL()}/>` +
    `</g>`
  );
}

function lamp(v) {
  const { x, y } = LAMP;
  return (
    `<path d="M${x} ${y - 4}V${y - 220}" ${OL(5)}/>` +
    `<ellipse cx="${x}" cy="${y}" rx="26" ry="8" fill="#a7744a" ${OL()}/>` +
    `<path d="M${x - 30} ${y - 264}L${x + 30} ${y - 264}L${x + 40} ${y - 220}L${x - 40} ${y - 220}Z" fill="${pick(v, 'lampShade', '#ffd23f', '#ff7aa8')}" ${OL()}/>`
  );
}

function bunting(v) {
  let s = `<path d="M-10 30Q300 110 610 30" fill="none" ${OL(3)}/>`;
  FLAGS.forEach((p, i) => {
    const color = i === FLAG_ODD ? pick(v, 'flag', FLAG_COLORS[i % 5], '#4fb3ff') : FLAG_COLORS[i % 5];
    s += `<path d="M${p.x - 20} ${p.y - 3}L${p.x + 20} ${p.y + 3}L${p.x + 2} ${p.y + 36}Z" fill="${color}" ${OL(3)}/>`;
  });
  return s;
}

function room() {
  const rug = 'M70 700L530 700L598 798L2 798Z';
  return (
    `<defs><pattern id="lv-dots" width="44" height="44" patternUnits="userSpaceOnUse">` +
    `<circle cx="11" cy="11" r="3.5" fill="#79d9cb"/><circle cx="33" cy="33" r="3.5" fill="#79d9cb"/></pattern>` +
    `<clipPath id="lv-rug"><path d="${rug}"/></clipPath></defs>` +
    `<rect width="${W}" height="${H}" fill="#5ccbbb"/>` +
    `<rect width="${W}" height="556" fill="url(#lv-dots)"/>` +
    `<rect y="556" width="${W}" height="${H - 556}" fill="#f5c29a"/>` +
    `<path d="M0 610H${W}M0 660H${W}" stroke="#e3a67c" stroke-width="3"/>` +
    `<rect x="-5" y="548" width="${W + 10}" height="14" fill="#3fae9f" ${OL()}/>` +
    `<g clip-path="url(#lv-rug)"><rect y="700" width="${W}" height="100" fill="#ffd1dc"/>` +
    [712, 734, 756, 778].map((y) => `<path d="M0 ${y}H${W}" stroke="#ff9fbd" stroke-width="7"/>`).join('') +
    `</g><path d="${rug}" fill="none" ${OL()}/>`
  );
}

function frame(v) {
  const { x, y } = FRAME;
  return (
    `<rect x="${x - 62}" y="${y - 46}" width="124" height="92" rx="4" fill="#ffd23f" ${OL()}/>` +
    `<rect x="${x - 48}" y="${y - 32}" width="96" height="64" fill="#fff7e0" ${OL(3)}/>` +
    heart(x, y + 2, 40, pick(v, 'frameHeart', '#ff5b8a', '#4fb3ff')) +
    `<path d="M${x} ${y - 46}L${x - 20} ${y - 70}L${x + 20} ${y - 70}Z" fill="none" ${OL(3)}/><circle cx="${x}" cy="${y - 72}" r="4" fill="${INK}"/>`
  );
}

function draw(v) {
  return (
    room() +
    bunting(v) +
    windowBox(v) +
    heart(232, 330, 26, '#ff5b8a') +
    pick(v, 'heartGone', heart(272, 372, 18, '#ffc2d4'), '') +
    heart(404, 322, 22, '#ff5b8a') +
    frame(v) +
    clock(CLOCK.x, CLOCK.y, 40, '#ff8a3d', ...pick(v, 'clock', [300, 60], [60, 300])) +
    lamp(v) +
    plant(44, 600, '#ff8a3d', pick(v, 'plantFlower', '#ff5b8a', '#ffd23f')) +
    sofa(v) +
    person(GRANDMA_V(v)) +
    person(GRANDPA_V(v)) +
    balloon(BALLOON.x, BALLOON.y, pick(v, 'balloon', '#ff5b8a', '#ffd23f'), boyHand.x, boyHand.y) +
    person(MOM_V(v)) +
    cake(v) +
    person({ ...BOY, hat: pick(v, 'boyCap', '#3b7dd8', '#3fae5f') }) +
    person({ ...GIRL, bows: pick(v, 'girlBow', '#ff5b8a', '#4fb3ff'), shoes: pick(v, 'girlShoes', '#ffffff', '#ff5b5b') }) +
    gift(210, 796, 64, 52, '#ff7aa8', pick(v, 'giftRibbon', '#ffd23f', '#4fb3ff')) +
    pick(v, 'giftGone', gift(392, 798, 46, 40, '#4fb3ff', '#ffffff'), '') +
    cat(CAT.x, CAT.y, CAT.s, '#f4a340', { tail: !v.has('catTail'), collar: '#ff5b5b' })
  );
}

const GRANDMA_V = (v) => ({ ...GRANDMA, glasses: !v.has('grandmaGlasses') });
const GRANDPA_V = (v) => ({ ...GRANDPA, mustache: pick(v, 'grandpaMustache', '#d6d4de', null), top: pick(v, 'grandpaTop', '#4caf6a', '#ff8a3d') });
const MOM_V = (v) => ({ ...MOM, shoes: pick(v, 'momShoes', '#ff7aa8', '#4fb3ff') });

export default { id: 'living', title: '거실 파티', diffs, draw };
