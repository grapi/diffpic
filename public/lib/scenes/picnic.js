// 장면 2: 공원 소풍 — 돗자리 위의 엄마와 아이, 연 날리는 남자아이, 강아지.

import { W, H, INK, OL, pick, blob, heart, sparkle, dog, person, headPos, handPos, bird, butterfly, flower } from '../art.js';

const MOM = { x: 150, y: 700, s: 1, sit: true, hairStyle: 'sunhat', hair: '#5a3a2a', top: '#ff9fbd', bottom: '#7fd0f0', bottomType: 'skirt', arms: [10, 70], shoes: '#ffffff' };
const GIRL = { x: 420, y: 712, s: 0.72, hs: 1.25, sit: true, hairStyle: 'bob', hair: '#5a3a2a', top: '#7b6cf6', bottom: '#ffd23f', bottomType: 'skirt', arms: [-10, 120], shoes: '#ff7aa8' };
const BOY = { x: 530, y: 600, s: 0.85, hs: 1.25, hairStyle: 'spiky', hair: '#3a2630', bottom: '#4f7be0', bottomType: 'shorts', arms: [150, 40], shoes: '#ff5b5b' };

const momHead = headPos(MOM);
const momHand = handPos(MOM, 1);
const girlHead = headPos(GIRL);
const cone = handPos(GIRL, 1);
const kiteHand = handPos(BOY, -1);
const KITE = { x: 420, y: 230 };
const BOWS = [[406, 324], [428, 354], [408, 386]];
const TREE_Y = 120; // 나무 전체를 아래로 내린 만큼
const APPLES = [[52, 196], [112, 222], [84, 160], [130, 176], [40, 238]].map(([x, y]) => [x, y + TREE_Y]);
const SUN = { x: 520, y: 90 };
const BIRD = { x: 196, y: 200 };
const BALL = { x: 56, y: 584 };
const DOG = { x: 100, y: 792 };

const diffs = [
  { id: 'sunGlasses', label: '해 선글라스', cx: SUN.x, cy: SUN.y, r: 50 },
  { id: 'cloudGone', label: '구름', cx: 312, cy: 128, r: 46 },
  { id: 'treeApple', label: '나무의 사과', cx: APPLES[1][0], cy: APPLES[1][1], r: 24 },
  { id: 'bird', label: '새 색', cx: BIRD.x, cy: BIRD.y, r: 30 },
  { id: 'kiteColor', label: '연 색', cx: KITE.x + 18, cy: KITE.y - 18, r: 34 },
  { id: 'kiteBow', label: '연 꼬리 리본', cx: BOWS[1][0], cy: BOWS[1][1], r: 22 },
  { id: 'boyShirt', label: '남자아이 옷 색', cx: BOY.x, cy: BOY.y - 83, r: 30 },
  { id: 'dogPatch', label: '강아지 눈 얼룩', cx: DOG.x + 8, cy: DOG.y - 59, r: 26 },
  { id: 'momHat', label: '엄마 모자 색', cx: momHead.x, cy: momHead.y - 26, r: 42 },
  { id: 'sandwich', label: '엄마 손의 샌드위치', cx: momHand.x + 6, cy: momHand.y - 4, r: 24 },
  { id: 'iceCream', label: '아이스크림 색', cx: cone.x, cy: cone.y - 24, r: 26 },
  { id: 'girlBow', label: '여자아이 리본', cx: girlHead.x + 22, cy: girlHead.y - 30, r: 22 },
  { id: 'basketApple', label: '바구니 사과', cx: 342, cy: 580, r: 22 },
  { id: 'juice', label: '주스 색', cx: 510, cy: 678, r: 26 },
  { id: 'watermelon', label: '수박 씨', cx: 270, cy: 706, r: 28 },
  { id: 'butterfly', label: '나비 색', cx: 250, cy: 420, r: 28 },
  { id: 'flower', label: '꽃 색', cx: 560, cy: 756, r: 28 },
  { id: 'ball', label: '공 무늬 색', cx: BALL.x, cy: BALL.y, r: 30 },
];

function sky(v) {
  return (
    `<defs><linearGradient id="pc-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0f8"/><stop offset="1" stop-color="#d4f1fd"/></linearGradient>` +
    `<pattern id="pc-check" width="36" height="36" patternUnits="userSpaceOnUse"><rect width="36" height="36" fill="#fff"/>` +
    `<rect width="18" height="18" fill="#ff6b6b"/><rect x="18" y="18" width="18" height="18" fill="#ff6b6b"/></pattern></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#pc-sky)"/>` +
    blob([[110, 80, 22], [136, 68, 28], [166, 82, 20]], '#fff') +
    pick(v, 'cloudGone', blob([[284, 136, 20], [310, 122, 28], [342, 134, 22]], '#fff'), '') +
    sun(v) +
    `<path d="M0 400Q140 330 300 390Q440 340 ${W} 380V${H}H0Z" fill="#86d17a" ${OL()}/>` +
    `<path d="M0 460Q150 436 300 452Q450 432 ${W} 456V${H}H0Z" fill="#a8e07e" ${OL()}/>` +
    [[230, 500], [470, 480], [580, 690], [20, 660], [210, 780], [470, 780]].map(([x, y]) =>
      `<path d="M${x - 10} ${y}L${x - 6} ${y - 12}L${x - 2} ${y}L${x + 2} ${y - 14}L${x + 6} ${y}L${x + 10} ${y - 10}" fill="none" stroke="#5cb85c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
    ).join('')
  );
}

function sun(v) {
  const { x, y } = SUN;
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5;
    return `<path d="M${(x + Math.cos(a) * 44).toFixed(1)} ${(y + Math.sin(a) * 44).toFixed(1)}L${(x + Math.cos(a) * 58).toFixed(1)} ${(y + Math.sin(a) * 58).toFixed(1)}" stroke="#ffb627" stroke-width="6" stroke-linecap="round"/>`;
  }).join('');
  return (
    rays +
    `<circle cx="${x}" cy="${y}" r="36" fill="#ffd23f" ${OL()}/>` +
    `<ellipse cx="${x - 20}" cy="${y + 10}" rx="7" ry="4.5" fill="#ff9a6a" opacity="0.8"/><ellipse cx="${x + 20}" cy="${y + 10}" rx="7" ry="4.5" fill="#ff9a6a" opacity="0.8"/>` +
    `<path d="M${x - 10} ${y + 12}Q${x} ${y + 24} ${x + 10} ${y + 12}" fill="none" ${OL(3)}/>` +
    pick(v, 'sunGlasses',
      `<circle cx="${x - 12}" cy="${y - 4}" r="4" fill="${INK}"/><circle cx="${x + 12}" cy="${y - 4}" r="4" fill="${INK}"/>`,
      `<path d="M${x - 28} ${y - 10}H${x + 28}" ${OL(3)}/>` +
      `<rect x="${x - 26}" y="${y - 12}" width="22" height="15" rx="6" fill="${INK}"/><rect x="${x + 4}" y="${y - 12}" width="22" height="15" rx="6" fill="${INK}"/>`)
  );
}

function tree(v) {
  return (
    `<g transform="translate(0 ${TREE_Y})">` +
    `<path d="M68 360L72 230L100 230L106 360Z" fill="#9c6b3e" ${OL()}/>` +
    `<path d="M86 270L118 246" ${OL(6)}/>` +
    blob([[40, 210, 46], [130, 206, 44], [86, 168, 58], [70, 236, 40], [116, 240, 36]], '#4caf50') +
    `</g>` +
    APPLES.map(([x, y], i) => (i === 1 && v.has('treeApple') ? '' : `<circle cx="${x}" cy="${y}" r="9" fill="#ff5b5b" ${OL(3)}/>`)).join('') +
    bird(BIRD.x, BIRD.y, pick(v, 'bird', '#4fb3ff', '#ff5b5b'))
  );
}

function kite(v) {
  const { x, y } = KITE;
  const t = [x, y - 58], r = [x + 42, y], b = [x, y + 70], l = [x - 42, y];
  const tri = (p, q, c) => `<path d="M${x} ${y}L${p[0]} ${p[1]}L${q[0]} ${q[1]}Z" fill="${c}" ${OL(3)}/>`;
  return (
    `<path d="M${b[0]} ${b[1]}Q${(b[0] + kiteHand.x) / 2 + 30} ${(b[1] + kiteHand.y) / 2} ${kiteHand.x} ${kiteHand.y}" fill="none" stroke="${INK}" stroke-width="2.5"/>` +
    `<path d="M${b[0]} ${b[1]}Q390 338 ${BOWS[1][0]} ${BOWS[1][1]}T${BOWS[2][0]} ${BOWS[2][1] + 14}" fill="none" stroke="${INK}" stroke-width="2.5"/>` +
    tri(t, l, '#ff5b5b') + tri(t, r, pick(v, 'kiteColor', '#ffd23f', '#5cc46e')) + tri(b, r, '#ff5b5b') + tri(b, l, '#ffd23f') +
    `<path d="M${t[0]} ${t[1]}L${r[0]} ${r[1]}L${b[0]} ${b[1]}L${l[0]} ${l[1]}Z M${t[0]} ${t[1]}L${b[0]} ${b[1]}M${l[0]} ${l[1]}L${r[0]} ${r[1]}" fill="none" ${OL()}/>` +
    BOWS.map(([bx, by], i) => (i === 1 && v.has('kiteBow') ? '' :
      `<path d="M${bx} ${by}L${bx - 12} ${by - 8}L${bx - 12} ${by + 8}ZM${bx} ${by}L${bx + 12} ${by - 8}L${bx + 12} ${by + 8}Z" fill="#7b6cf6" ${OL(2.5)}/>`)).join('')
  );
}

function blanket(v) {
  return (
    `<path d="M110 560L490 560L560 730L40 730Z" fill="url(#pc-check)" ${OL()}/>` +
    // 바구니
    `<g transform="translate(-10 150)">` +
    `<path d="M300 432Q336 380 372 432" fill="none" ${OL(9)}/><path d="M300 432Q336 380 372 432" fill="none" stroke="#c98a45" stroke-width="5"/>` +
    pick(v, 'basketApple', `<circle cx="352" cy="430" r="11" fill="#ff5b5b" ${OL(3)}/><path d="M352 419Q354 412 360 410" ${OL(2.5)}/>`, '') +
    `<path d="M318 428L330 404L340 408L330 432Z" fill="#f4c27a" ${OL(3)}/>` +
    `<path d="M292 432L380 432L370 474L302 474Z" fill="#d9a35b" ${OL()}/>` +
    `<path d="M296 446H376M299 460H373" stroke="#b07a3a" stroke-width="3"/>` +
    `</g>` +
    // 수박 접시
    `<g transform="translate(-60 178)">` +
    `<ellipse cx="330" cy="534" rx="46" ry="12" fill="#fff" ${OL()}/>` +
    `<path d="M300 528Q330 490 360 528Z" fill="#ff5b6e" ${OL(3)}/><path d="M298 530Q330 534 362 530" stroke="#5cc46e" stroke-width="6" stroke-linecap="round"/>` +
    pick(v, 'watermelon', `<circle cx="320" cy="518" r="2.5" fill="${INK}"/><circle cx="332" cy="512" r="2.5" fill="${INK}"/><circle cx="342" cy="520" r="2.5" fill="${INK}"/>`, '') +
    `</g>` +
    // 주스
    `<g transform="translate(-50 200)">` +
    `<rect x="546" y="456" width="28" height="46" rx="6" fill="${pick(v, 'juice', '#ffb627', '#8e5bd0')}" ${OL()}/>` +
    `<rect x="552" y="444" width="16" height="14" fill="#fff" ${OL(3)}/><path d="M566 444L572 424" ${OL(3)}/>` +
    `<rect x="546" y="470" width="28" height="14" fill="#fff" opacity="0.6"/>` +
    `</g>`
  );
}

function ball(v) {
  const { x, y } = BALL;
  const stripe = pick(v, 'ball', '#4fb3ff', '#5cc46e');
  return (
    `<circle cx="${x}" cy="${y}" r="26" fill="#fff" ${OL()}/>` +
    `<path d="M${x - 24} ${y - 10}Q${x} ${y - 4} ${x + 24} ${y - 10}L${x + 26} ${y + 2}Q${x} ${y + 8} ${x - 26} ${y + 2}Z" fill="#ff5b5b"/>` +
    `<path d="M${x - 20} ${y + 14}Q${x} ${y + 20} ${x + 20} ${y + 14}L${x + 14} ${y + 22}Q${x} ${y + 26} ${x - 14} ${y + 22}Z" fill="${stripe}"/>` +
    `<path d="M${x - 12} ${y - 22}Q${x} ${y - 18} ${x + 12} ${y - 22}L${x + 6} ${y - 25}Q${x} ${y - 24} ${x - 6} ${y - 25}Z" fill="${stripe}"/>` +
    `<circle cx="${x}" cy="${y}" r="26" fill="none" ${OL()}/>`
  );
}

function sandwich(x, y) {
  return (
    `<path d="M${x - 16} ${y + 8}L${x} ${y - 18}L${x + 16} ${y + 8}Z" fill="#ffe7a8" ${OL(3)}/>` +
    `<path d="M${x - 13} ${y + 3}L${x + 13} ${y + 3}" stroke="#5cc46e" stroke-width="4"/>`
  );
}

function iceCream(v, x, y) {
  return (
    `<path d="M${x - 11} ${y - 14}L${x + 11} ${y - 14}L${x} ${y + 14}Z" fill="#f4c27a" ${OL(3)}/>` +
    blob([[x, y - 26, 13], [x - 8, y - 18, 9], [x + 8, y - 18, 9]], pick(v, 'iceCream', '#ff9fbd', '#8be0c8'), 3) +
    `<circle cx="${x}" cy="${y - 42}" r="5" fill="#ff5b5b" ${OL(2)}/>`
  );
}

function draw(v) {
  return (
    sky(v) +
    tree(v) +
    butterfly(250, 420, pick(v, 'butterfly', '#ff7aa8', '#ffd23f')) +
    heart(300, 505, 18, '#ff7aa8') +
    sparkle(480, 190, 10) + sparkle(300, 250, 8) +
    kite(v) +
    blanket(v) +
    ball(v) +
    person({ ...MOM, hat: pick(v, 'momHat', '#ffe08a', '#7fd0f0') }) +
    pick(v, 'sandwich', sandwich(momHand.x + 6, momHand.y - 4), '') +
    person({ ...GIRL, bow: pick(v, 'girlBow', '#ff5b8a', null) }) +
    iceCream(v, cone.x, cone.y) +
    person({ ...BOY, top: pick(v, 'boyShirt', '#ffd23f', '#5cc46e') }) +
    dog(DOG.x, DOG.y, 0.8, '#f3d6a8', { patch: pick(v, 'dogPatch', '#8a5a3c', null) }) +
    flower(560, 756, pick(v, 'flower', '#ff7aa8', '#7b6cf6')) +
    flower(330, 762, '#ffd23f')
  );
}

export default { id: 'picnic', title: '공원 소풍', diffs, draw };
