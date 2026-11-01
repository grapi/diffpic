// 장면 3: 부엌 요리 — 냄비를 젓는 아빠 요리사, 반죽 그릇을 든 아이, 냉장고와 선반.

import { W, H, INK, OL, pick, blob, tube, heart, cat, clock, person, headPos } from '../art.js';

const DAD = { x: 268, y: 452, s: 1.05, legs: false, hairStyle: 'chef', hair: '#3a2630', top: '#ffffff', mustache: '#3a2630', arms: [-20, 62], mouth: 'open' };
const KID = { x: 468, y: 440, s: 0.72, hs: 1.25, legs: false, hairStyle: 'bun', hair: '#3a2630', top: '#7fd0f0', arms: [-28, -28] };

const dadHead = headPos(DAD);
const kidHead = headPos(KID);
const POT = { x: 358, y: 396 };
const BOWL = { x: KID.x, y: 400 };
const JARS = [64, 116, 168];
const CLOCK = { x: 540, y: 96 };

const diffs = [
  { id: 'windowPlant', label: '창가 화분 꽃 색', cx: 386, cy: 152, r: 28 },
  { id: 'jarLid', label: '병뚜껑 색', cx: JARS[1], cy: 116, r: 24 },
  { id: 'shelfCup', label: '선반 위 컵', cx: 214, cy: 128, r: 24 },
  { id: 'clock', label: '시곗바늘', cx: CLOCK.x, cy: CLOCK.y, r: 42 },
  { id: 'utensil', label: '걸려 있는 뒤집개', cx: 104, cy: 262, r: 28 },
  { id: 'chefHat', label: '요리사 모자 높이', cx: dadHead.x, cy: dadHead.y - 72, r: 40 },
  { id: 'apron', label: '아빠 앞치마 색', cx: DAD.x - 6, cy: 366, r: 28 },
  { id: 'potColor', label: '냄비 색', cx: POT.x, cy: POT.y - 12, r: 32 },
  { id: 'steam', label: '냄비 김', cx: POT.x + 4, cy: POT.y - 70, r: 28 },
  { id: 'bowlColor', label: '그릇 색', cx: BOWL.x, cy: BOWL.y - 4, r: 30 },
  { id: 'kidBow', label: '아이 리본', cx: kidHead.x + 22, cy: kidHead.y - 28, r: 22 },
  { id: 'carrot', label: '도마 위 당근', cx: 120, cy: 382, r: 24 },
  { id: 'egg', label: '달걀 개수', cx: 560, cy: 384, r: 26 },
  { id: 'kettle', label: '주전자 색', cx: 46, cy: 368, r: 30 },
  { id: 'magnet', label: '냉장고 하트 자석', cx: 640, cy: 214, r: 22 },
  { id: 'drawing', label: '냉장고 그림 속 해', cx: 688, cy: 352, r: 30 },
  { id: 'catCollar', label: '고양이 목걸이', cx: 470, cy: 556, r: 26 },
];

function room() {
  return (
    `<defs><pattern id="kt-tile" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#fffaf0"/>` +
    `<path d="M0 0H40V40" fill="none" stroke="#f0d9a8" stroke-width="3"/></pattern>` +
    `<pattern id="kt-floor" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#ffe0cc"/>` +
    `<rect width="30" height="30" fill="#ffb899"/><rect x="30" y="30" width="30" height="30" fill="#ffb899"/></pattern></defs>` +
    `<rect width="${W}" height="${H}" fill="#ffd36b"/>` +
    `<rect y="230" width="580" height="180" fill="url(#kt-tile)"/>` +
    `<path d="M0 230H580" ${OL(3)}/>` +
    `<rect y="520" width="${W}" height="${H - 520}" fill="url(#kt-floor)"/>` +
    `<path d="M0 520H800" ${OL()}/>`
  );
}

function windowBox(v) {
  return (
    `<rect x="290" y="34" width="190" height="136" rx="6" fill="#fff" ${OL()}/>` +
    `<rect x="302" y="46" width="166" height="112" fill="#a8e2fb" ${OL(3)}/>` +
    blob([[330, 86, 12], [346, 78, 16], [364, 88, 12]], '#fff', 3) +
    `<path d="M385 46V158M302 102H468" ${OL()}/>` +
    `<rect x="280" y="166" width="210" height="12" rx="4" fill="#a7744a" ${OL()}/>` +
    // 창가 화분
    `<path d="M374 166L398 166L394 148L378 148Z" fill="#ff8a3d" ${OL(3)}/>` +
    `<path d="M386 148V134" stroke="#3c9d5d" stroke-width="4"/>` +
    blob([[386, 124, 8], [378, 132, 8], [394, 132, 8]], pick(v, 'windowPlant', '#ff5b8a', '#7b6cf6'), 3)
  );
}

function shelf(v) {
  const lids = ['#ff5b5b', pick(v, 'jarLid', '#5cc46e', '#ffd23f'), '#4fb3ff'];
  const fills = ['#ffe08a', '#ffffff', '#ffb899'];
  return (
    `<rect x="24" y="150" width="220" height="14" rx="4" fill="#a7744a" ${OL()}/>` +
    `<path d="M50 164L44 186M218 164L224 186" ${OL(5)}/>` +
    JARS.map((x, i) =>
      `<rect x="${x - 20}" y="102" width="40" height="48" rx="8" fill="#e9f7ff" ${OL()}/>` +
      `<rect x="${x - 16}" y="118" width="32" height="28" rx="5" fill="${fills[i]}"/>` +
      `<rect x="${x - 22}" y="94" width="44" height="14" rx="4" fill="${lids[i]}" ${OL()}/>`
    ).join('') +
    pick(v, 'shelfCup',
      `<path d="M200 112L228 112L224 148L204 148Z" fill="#ff9fbd" ${OL()}/><path d="M228 120Q240 122 238 132Q236 140 226 140" fill="none" ${OL(3.5)}/>`,
      '')
  );
}

function utensils(v) {
  const rail = `<rect x="34" y="210" width="190" height="8" rx="4" fill="#b8b8c8" ${OL(3)}/>`;
  const ladle = tube('M64 218V284', '#9aa0b8', 6) + `<path d="M50 284Q64 306 78 284Z" fill="#9aa0b8" ${OL(3)}/>`;
  const turner = tube('M104 218V264', '#ff8a3d', 6) + `<rect x="92" y="262" width="24" height="30" rx="4" fill="#9aa0b8" ${OL(3)}/>`;
  const whisk = tube('M146 218V256', '#ff8a3d', 6) + `<path d="M146 256Q130 286 146 300Q162 286 146 256ZM146 256Q138 286 146 300Q154 286 146 256Z" fill="none" ${OL(3)}/>`;
  const pan = tube('M190 218V246', '#3a2630', 6) + `<circle cx="190" cy="270" r="24" fill="#3d3b52" ${OL()}/><circle cx="190" cy="270" r="15" fill="#55536e"/>`;
  return rail + ladle + pick(v, 'utensil', turner, '') + whisk + pan;
}

function fridge(v) {
  return (
    `<rect x="596" y="160" width="176" height="370" rx="22" fill="#bfe6ff" ${OL()}/>` +
    `<path d="M596 292H772" ${OL()}/>` +
    `<rect x="606" y="220" width="10" height="50" rx="5" fill="#ffffff" ${OL(3)}/>` +
    `<rect x="606" y="310" width="10" height="70" rx="5" fill="#ffffff" ${OL(3)}/>` +
    pick(v, 'magnet', heart(640, 216, 26, '#ff5b8a'), '') +
    `<path d="M720 196L726 210L741 211L729 220L733 235L720 226L707 235L711 220L699 211L714 210Z" fill="#ffd23f" ${OL(3)}/>` +
    // 아이 그림
    `<rect x="646" y="316" width="100" height="78" fill="#fff" ${OL()}/>` +
    `<circle cx="688" cy="304" r="7" fill="#ff5b5b" ${OL(3)}/>` +
    `<circle cx="672" cy="342" r="11" fill="${pick(v, 'drawing', '#ffd23f', '#ff5b5b')}" stroke="#ffb627" stroke-width="2"/>` +
    `<path d="M652 384L684 352L702 370L716 356L740 384Z" fill="#5cc46e" stroke="#3c9d5d" stroke-width="2"/>` +
    `<path d="M710 334Q716 328 722 334Q728 328 734 334" fill="none" stroke="${INK}" stroke-width="2"/>`
  );
}

function counter(v) {
  return (
    `<rect x="-10" y="404" width="586" height="120" fill="#5ab4e8" ${OL()}/>` +
    [0, 1, 2, 3].map((i) =>
      `<rect x="${12 + i * 140}" y="424" width="122" height="86" rx="8" fill="#6fc2f0" ${OL(3)}/>` +
      `<rect x="${55 + i * 140}" y="438" width="36" height="8" rx="4" fill="#fff" ${OL(2.5)}/>`
    ).join('') +
    `<rect x="-10" y="394" width="596" height="18" rx="4" fill="#f4f1ea" ${OL()}/>` +
    // 주전자
    `<path d="M22 394Q16 352 46 346Q76 352 70 394Z" fill="${pick(v, 'kettle', '#ff5b5b', '#5cc46e')}" ${OL()}/>` +
    `<path d="M70 380L90 360" ${OL(6)}/><path d="M30 352Q46 326 62 352" fill="none" ${OL(4)}/>` +
    `<circle cx="46" cy="342" r="5" fill="${INK}"/>` +
    // 도마와 당근·토마토
    `<rect x="94" y="386" width="110" height="10" rx="4" fill="#d9a35b" ${OL(3)}/>` +
    pick(v, 'carrot', `<path d="M104 384L140 376L140 388Z" fill="#ff8a3d" ${OL(2.5)}/><path d="M140 380L150 372M140 382L152 380" stroke="#3c9d5d" stroke-width="3" stroke-linecap="round"/>`, '') +
    `<circle cx="178" cy="374" r="12" fill="#ff5b5b" ${OL(3)}/><path d="M172 364L178 368L184 364" stroke="#3c9d5d" stroke-width="3" fill="none"/>` +
    // 달걀
    `<path d="M528 394Q528 382 538 380L582 380Q592 382 592 394Z" fill="#c9b8a0" ${OL(3)}/>` +
    (v.has('egg') ? [546, 574] : [542, 560, 578]).map((x) => `<ellipse cx="${x}" cy="374" rx="8" ry="11" fill="#fff8ec" ${OL(3)}/>`).join('')
  );
}

function pot(v) {
  const { x, y } = POT;
  const color = pick(v, 'potColor', '#ff7a59', '#4fb3ff');
  return (
    pick(v, 'steam',
      [-14, 4, 22].map((dx) => `<path d="M${x + dx} ${y - 50}Q${x + dx - 8} ${y - 62} ${x + dx} ${y - 72}Q${x + dx + 8} ${y - 82} ${x + dx} ${y - 94}" fill="none" stroke="#a9b8d0" stroke-width="5" stroke-linecap="round"/>`).join(''),
      '') +
    `<path d="M${x - 20} ${y - 46}L${x - 38} ${y - 78}" ${OL(6)}/>` +
    `<rect x="${x - 40}" y="${y - 40}" width="80" height="40" rx="8" fill="${color}" ${OL()}/>` +
    `<rect x="${x - 46}" y="${y - 46}" width="92" height="12" rx="5" fill="${color}" ${OL()}/>` +
    `<path d="M${x - 46} ${y - 30}H${x - 56}M${x + 46} ${y - 30}H${x + 56}" ${OL(6)}/>`
  );
}

function bowl(v) {
  const { x, y } = BOWL;
  return (
    `<path d="M${x + 6} ${y - 18}L${x + 26} ${y - 56}" ${OL(5)}/>` +
    `<path d="M${x + 26} ${y - 56}Q${x + 16} ${y - 74} ${x + 30} ${y - 82}Q${x + 42} ${y - 70} ${x + 26} ${y - 56}Z" fill="none" ${OL(2.5)}/>` +
    `<path d="M${x - 40} ${y - 22}Q${x - 38} ${y + 6} ${x} ${y + 6}Q${x + 38} ${y + 6} ${x + 40} ${y - 22}Z" fill="${pick(v, 'bowlColor', '#ff9fbd', '#ffd23f')}" ${OL()}/>` +
    `<ellipse cx="${x}" cy="${y - 22}" rx="40" ry="8" fill="#fff4dc" ${OL(3)}/>`
  );
}

function draw(v) {
  return (
    room() +
    windowBox(v) +
    shelf(v) +
    clock(CLOCK.x, CLOCK.y, 36, '#4fb3ff', ...pick(v, 'clock', [90, 0], [210, 0])) +
    utensils(v) +
    fridge(v) +
    person({ ...DAD, hat: pick(v, 'chefHat', 18, 46), apron: pick(v, 'apron', '#ff7a59', '#5cc46e') }) +
    person({ ...KID, bow: pick(v, 'kidBow', '#ff5b8a', null) }) +
    counter(v) +
    pot(v) +
    bowl(v) +
    cat(470, 596, 0.78, '#9e9e9e', { collar: pick(v, 'catCollar', '#ff5b5b', null) })
  );
}

export default { id: 'kitchen', title: '부엌 요리', diffs, draw };
