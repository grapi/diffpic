// 장면 1: 거실 파티 — 소파의 할머니·할아버지, 케이크를 든 엄마, 환호하는 아이들.

import { W, H, INK, OL, pick, r1, blob, heart, gift, balloon, cat, plant, clock, person, headPos, handPos } from '../art.js';

const FLAG_COLORS = ['#ff7aa8', '#ffd23f', '#7b6cf6', '#ff8a3d', '#ffffff'];
const FLAG_N = 10;
const FLAG_ODD = 6; // 색이 바뀌는 깃발

// 가랜드 줄: 2차 베지어 (-10,30) → (400,120) → (810,30)
function garland(t) {
  const u = 1 - t;
  return { x: r1(u * u * -10 + 2 * u * t * 400 + t * t * 810), y: r1(u * u * 30 + 2 * u * t * 120 + t * t * 30) };
}
const FLAGS = Array.from({ length: FLAG_N }, (_, i) => garland(0.06 + i * 0.098));

const MOM = { x: 150, y: 522, s: 1.05, hairStyle: 'bob', hair: '#3a2630', top: '#ffffff', bottomType: 'skirt', arms: [-25, -25], shoes: '#ff7aa8' };
const GRANDMA = { x: 352, y: 505, s: 0.95, sit: true, hairStyle: 'curly', hair: '#d6d4de', top: '#7fd0f0', bottom: '#6d7bd8', bottomType: 'skirt', glasses: true, collar: '#ffffff', arms: [5, 35], shoes: '#e9d7c0' };
const GRANDPA = { x: 468, y: 505, s: 0.95, sit: true, hairStyle: 'side', hair: '#d6d4de', top: '#4caf6a', bottom: '#33427a', arms: [35, 5], mouth: 'smile', shoes: '#7a5236' };
const GIRL = { x: 410, y: 578, s: 0.72, hs: 1.25, hairStyle: 'pigtails', hair: '#2b2233', top: '#ffd23f', bottom: '#ff7aa8', bottomType: 'skirt', arms: [150, 150] };
const BOY = { x: 662, y: 562, s: 0.75, hs: 1.25, hairStyle: 'cap', top: '#ff5b5b', stripes: '#ffffff', bottom: '#ffd23f', bottomType: 'shorts', arms: [155, 40], shoes: '#4fb3ff' };

const grandmaHead = headPos(GRANDMA);
const grandpaHead = headPos(GRANDPA);
const girlHead = headPos(GIRL);
const boyHead = headPos(BOY);
const boyHand = handPos(BOY, -1);
const momHand = handPos(MOM, -1);
const BALLOON = { x: 598, y: 322 };
const CAKE = { x: MOM.x, y: momHand.y + 4 };
const CLOCK = { x: 652, y: 150 };
const LAMP = { x: 748, y: 512 };
const FRAME = { x: 405, y: 210 };

const diffs = [
  { id: 'flag', label: '가랜드 깃발 색', cx: FLAGS[FLAG_ODD].x, cy: FLAGS[FLAG_ODD].y + 15, r: 30 },
  { id: 'windowCloud', label: '창밖 구름', cx: 100, cy: 172, r: 34 },
  { id: 'heartGone', label: '벽의 하트', cx: 262, cy: 236, r: 26 },
  { id: 'frameHeart', label: '액자 속 하트 색', cx: FRAME.x, cy: FRAME.y, r: 52 },
  { id: 'clock', label: '시곗바늘', cx: CLOCK.x, cy: CLOCK.y, r: 46 },
  { id: 'lampShade', label: '스탠드 갓 색', cx: LAMP.x, cy: 268, r: 38 },
  { id: 'cushion', label: '쿠션 색', cx: 292, cy: 394, r: 30 },
  { id: 'grandmaGlasses', label: '할머니 안경', cx: grandmaHead.x, cy: grandmaHead.y, r: 32 },
  { id: 'grandpaMustache', label: '할아버지 콧수염', cx: grandpaHead.x, cy: grandpaHead.y + 4, r: 30 },
  { id: 'grandpaTop', label: '할아버지 옷 색', cx: GRANDPA.x, cy: 438, r: 30 },
  { id: 'girlBow', label: '여자아이 리본 색', cx: girlHead.x, cy: girlHead.y - 14, r: 44 },
  { id: 'girlShoes', label: '여자아이 신발 색', cx: GIRL.x, cy: GIRL.y - 6, r: 26 },
  { id: 'boyCap', label: '남자아이 모자 색', cx: boyHead.x + 6, cy: boyHead.y - 18, r: 34 },
  { id: 'balloon', label: '풍선 색', cx: BALLOON.x, cy: BALLOON.y, r: 38 },
  { id: 'cakeCandle', label: '케이크 초', cx: CAKE.x, cy: CAKE.y - 34, r: 32 },
  { id: 'momSkirt', label: '엄마 치마 색', cx: MOM.x, cy: 488, r: 26 },
  { id: 'giftRibbon', label: '선물 리본 색', cx: 236, cy: 552, r: 38 },
  { id: 'giftGone', label: '작은 선물', cx: 540, cy: 566, r: 32 },
  { id: 'catTail', label: '고양이 꼬리', cx: 760, cy: 548, r: 34 },
  { id: 'plantFlower', label: '화분 꽃 색', cx: 46, cy: 404, r: 30 },
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
    `<rect x="262" y="496" width="12" height="12" fill="${INK}"/><rect x="546" y="496" width="12" height="12" fill="${INK}"/>` +
    `<rect x="268" y="352" width="284" height="104" rx="24" fill="${body}" ${OL()}/>` +
    `<path d="M292 360Q290 392 306 404M528 360Q530 392 514 404" fill="none" stroke="#7458db" stroke-width="5" stroke-linecap="round"/>` +
    `<rect x="266" y="388" width="52" height="46" rx="12" transform="rotate(-10 292 411)" fill="${pick(v, 'cushion', '#ffd23f', '#4fb3ff')}" ${OL()}/>` +
    `<rect x="502" y="388" width="52" height="46" rx="12" transform="rotate(10 528 411)" fill="#ff8a3d" ${OL()}/>` +
    `<rect x="258" y="444" width="304" height="36" rx="12" fill="${seat}" ${OL()}/>` +
    `<rect x="250" y="470" width="320" height="28" rx="8" fill="${body}" ${OL()}/>` +
    `<rect x="232" y="404" width="50" height="94" rx="22" fill="${body}" ${OL()}/>` +
    `<rect x="538" y="404" width="50" height="94" rx="22" fill="${body}" ${OL()}/>`
  );
}

function windowBox(v) {
  return (
    `<rect x="40" y="118" width="150" height="132" rx="6" fill="#fff" ${OL()}/>` +
    `<rect x="52" y="130" width="126" height="108" fill="#bfe9ff" ${OL(3)}/>` +
    pick(v, 'windowCloud', blob([[86, 176, 14], [102, 168, 18], [120, 178, 13]], '#ffffff', 3), '') +
    `<circle cx="154" cy="152" r="11" fill="#ffd23f" ${OL(3)}/>` +
    `<path d="M115 130V238M52 184H178" ${OL(4)}/>` +
    `<path d="M28 108Q40 160 32 262L62 262Q56 170 70 108Z" fill="#ff7aa8" ${OL()}/>` +
    `<path d="M202 108Q190 160 198 262L168 262Q174 170 160 108Z" fill="#ff7aa8" ${OL()}/>` +
    `<rect x="20" y="100" width="190" height="12" rx="6" fill="#a7744a" ${OL()}/>`
  );
}

function lamp(v) {
  const { x, y } = LAMP;
  return (
    `<path d="M${x} ${y - 4}V292" ${OL(5)}/>` +
    `<ellipse cx="${x}" cy="${y}" rx="26" ry="8" fill="#a7744a" ${OL()}/>` +
    `<path d="M${x - 30} 248L${x + 30} 248L${x + 40} 292L${x - 40} 292Z" fill="${pick(v, 'lampShade', '#ffd23f', '#ff7aa8')}" ${OL()}/>`
  );
}

function bunting(v) {
  let s = `<path d="M-10 30Q400 120 810 30" fill="none" ${OL(3)}/>`;
  FLAGS.forEach((p, i) => {
    const color = i === FLAG_ODD ? pick(v, 'flag', FLAG_COLORS[i % 5], '#4fb3ff') : FLAG_COLORS[i % 5];
    s += `<path d="M${p.x - 20} ${p.y - 3}L${p.x + 20} ${p.y + 3}L${p.x + 2} ${p.y + 36}Z" fill="${color}" ${OL(3)}/>`;
  });
  return s;
}

function room() {
  return (
    `<defs><pattern id="lv-dots" width="44" height="44" patternUnits="userSpaceOnUse">` +
    `<circle cx="11" cy="11" r="3.5" fill="#79d9cb"/><circle cx="33" cy="33" r="3.5" fill="#79d9cb"/></pattern>` +
    `<clipPath id="lv-rug"><path d="M140 520L660 520L740 598L60 598Z"/></clipPath></defs>` +
    `<rect width="${W}" height="${H}" fill="#5ccbbb"/>` +
    `<rect width="${W}" height="460" fill="url(#lv-dots)"/>` +
    `<rect y="460" width="${W}" height="${H - 460}" fill="#f5c29a"/>` +
    `<path d="M0 500H800M0 548H800" stroke="#e3a67c" stroke-width="3"/>` +
    `<rect x="-5" y="450" width="810" height="14" fill="#3fae9f" ${OL()}/>` +
    `<g clip-path="url(#lv-rug)"><rect x="0" y="520" width="${W}" height="80" fill="#ffd1dc"/>` +
    [530, 548, 566, 584].map((y) => `<path d="M0 ${y}H800" stroke="#ff9fbd" stroke-width="7"/>`).join('') +
    `</g><path d="M140 520L660 520L740 598L60 598Z" fill="none" ${OL()}/>`
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
    heart(232, 196, 26, '#ff5b8a') +
    pick(v, 'heartGone', heart(262, 236, 18, '#ffc2d4'), '') +
    heart(560, 236, 22, '#ff5b8a') +
    frame(v) +
    clock(CLOCK.x, CLOCK.y, 40, '#ff8a3d', ...pick(v, 'clock', [300, 60], [60, 300])) +
    lamp(v) +
    plant(46, 506, '#ff8a3d', pick(v, 'plantFlower', '#ff5b8a', '#ffd23f')) +
    sofa(v) +
    person(GRANDMA_V(v)) +
    person(GRANDPA_V(v)) +
    person(MOM_V(v)) +
    cake(v) +
    balloon(BALLOON.x, BALLOON.y, pick(v, 'balloon', '#ff5b8a', '#ffd23f'), boyHand.x, boyHand.y) +
    person({ ...BOY, hat: pick(v, 'boyCap', '#3b7dd8', '#3fae5f') }) +
    person({ ...GIRL, bows: pick(v, 'girlBow', '#ff5b8a', '#4fb3ff'), shoes: pick(v, 'girlShoes', '#ffffff', '#ff5b5b') }) +
    gift(236, 590, 64, 52, '#ff7aa8', pick(v, 'giftRibbon', '#ffd23f', '#4fb3ff')) +
    pick(v, 'giftGone', gift(540, 592, 46, 40, '#4fb3ff', '#ffffff'), '') +
    cat(748, 592, 0.8, '#f4a340', { tail: !v.has('catTail'), collar: '#ff5b5b' })
  );
}

const GRANDMA_V = (v) => ({ ...GRANDMA, glasses: !v.has('grandmaGlasses') });
const GRANDPA_V = (v) => ({ ...GRANDPA, mustache: pick(v, 'grandpaMustache', '#d6d4de', null), top: pick(v, 'grandpaTop', '#4caf6a', '#ff8a3d') });
const MOM_V = (v) => ({ ...MOM, bottom: pick(v, 'momSkirt', '#f6c343', '#7b6cf6') });

export default { id: 'living', title: '거실 파티', diffs, draw };
