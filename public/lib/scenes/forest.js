// 장면 26: 숲속 친구들 — 사슴, 다람쥐, 꿀단지를 든 곰, 고슴도치, 시냇물과 나무다리.

import { W, H, INK, pick, blob, box, disc, oval, shape, line, tree, pine, butterfly, flower, fish } from '../art.js';

const diffs = [
  { id: 'bird', label: '새 색', cx: 290, cy: 120, r: 28 },
  { id: 'nestEgg', label: '둥지 알 개수', cx: 470, cy: 214, r: 26 },
  { id: 'squirrelTail', label: '다람쥐 꼬리 색', cx: 120, cy: 262, r: 30 },
  { id: 'acorn', label: '다람쥐 도토리', cx: 162, cy: 280, r: 20 },
  { id: 'antler', label: '사슴뿔', cx: 140, cy: 400, r: 34 },
  { id: 'deerSpot', label: '사슴 점무늬', cx: 120, cy: 500, r: 30 },
  { id: 'honey', label: '꿀단지 색', cx: 460, cy: 520, r: 28 },
  { id: 'bee', label: '꿀벌', cx: 520, cy: 440, r: 22 },
  { id: 'bearEar', label: '곰 귀 색', cx: 432, cy: 404, r: 22 },
  { id: 'mushroom', label: '버섯 점 색', cx: 300, cy: 574, r: 30 },
  { id: 'mushroomGone', label: '작은 버섯', cx: 350, cy: 590, r: 22 },
  { id: 'bridge', label: '다리 색', cx: 200, cy: 680, r: 40 },
  { id: 'fish', label: '물고기', cx: 380, cy: 714, r: 30 },
  { id: 'hedgehog', label: '고슴도치 색', cx: 520, cy: 640, r: 36 },
  { id: 'bunnyEar', label: '토끼 귀', cx: 60, cy: 690, r: 28 },
  { id: 'flower', label: '꽃 색', cx: 560, cy: 760, r: 26 },
  { id: 'butterfly', label: '나비 색', cx: 330, cy: 420, r: 28 },
  { id: 'log', label: '통나무', cx: 260, cy: 780, r: 30 },
];

function woods(v) {
  return (
    `<rect width="${W}" height="${H}" fill="#cdeec0"/>` +
    `<path d="M240 0L300 0L380 560L180 560Z" fill="#fff" opacity="0.25"/>` +
    pine(380, 470, 1.4, '#3c8f5f') + pine(30, 470, 1.6, '#2f7d52') +
    tree(520, 520, 1.6, '#4caf50') + tree(120, 330, 1.2, '#5cbf62') +
    `<rect y="520" width="${W}" height="${H - 520}" fill="#8fce62"/>` + `<path d="M0 520H${W}" stroke="${INK}" stroke-width="4"/>` +
    shape(`M0 650Q150 630 300 660T${W} 650V740Q450 760 300 730T0 742Z`, '#7fd0f0')
  );
}

function nest(v) {
  return `<path d="M430 236H560" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M430 236H560" stroke="#9c6b3e" stroke-width="8" stroke-linecap="round"/>` +
    (v.has('nestEgg') ? [470] : [458, 482]).map((x) => oval(x, 214, 10, 13, '#bfe9ff', 3)).join('') +
    shape('M436 220Q470 250 504 220Q498 240 470 242Q442 240 436 220Z', '#a7744a') +
    // 새
    oval(290, 124, 20, 15, pick(v, 'bird', '#ff5b5b', '#4fb3ff')) + disc(306, 112, 10, pick(v, 'bird', '#ff5b5b', '#4fb3ff'), 3) + shape('M314 110L326 114L314 118Z', '#ffb627', 2) + `<circle cx="308" cy="109" r="2.5" fill="${INK}"/>`;
}

function squirrel(v) {
  return `<path d="M120 300Q90 290 96 254Q104 226 130 240" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/>` +
    `<path d="M120 300Q90 290 96 254Q104 226 130 240" fill="none" stroke="${pick(v, 'squirrelTail', '#c98a55', '#ff8a3d')}" stroke-width="22" stroke-linecap="round"/>` +
    oval(140, 290, 18, 22, '#c98a55') + disc(150, 260, 15, '#c98a55') + shape('M144 248L148 234L156 246Z', '#c98a55', 3) + `<circle cx="156" cy="258" r="2.5" fill="${INK}"/>` +
    pick(v, 'acorn', oval(162, 284, 8, 10, '#a7744a', 2.5) + shape('M154 278Q162 268 170 278Z', '#7a5236', 2.5), '');
}

function deer(v) {
  const c = '#d9a066';
  return box(80, 540, 14, 60, c, 4, 3) + box(150, 540, 14, 60, c, 4, 3) +
    oval(122, 510, 60, 36, c) + shape('M150 500L160 440L186 444L172 504Z', c) +
    oval(178, 432, 22, 18, c) + shape('M158 420L146 410L162 410Z', c, 3) +
    `<circle cx="184" cy="428" r="3" fill="${INK}"/><ellipse cx="198" cy="436" rx="4" ry="3" fill="${INK}"/>` +
    pick(v, 'antler', line('M170 416L156 384M162 398L144 392M184 414L194 380M190 394L208 388', 5), '') +
    pick(v, 'deerSpot', [[100, 496], [124, 488], [146, 500], [116, 516]].map(([x, y]) => disc(x, y, 5, '#fff', 0)).join(''), '');
}

function bear(v) {
  const c = '#9c6b3e';
  return disc(432, 404, 14, pick(v, 'bearEar', c, '#ffb3c7')) + disc(488, 404, 14, c) +
    oval(460, 500, 50, 56, c) + disc(460, 430, 34, c) + oval(460, 444, 16, 12, '#e8c49a', 0) +
    `<circle cx="448" cy="424" r="3.5" fill="${INK}"/><circle cx="472" cy="424" r="3.5" fill="${INK}"/><ellipse cx="460" cy="440" rx="5" ry="3.5" fill="${INK}"/>` +
    oval(430, 556, 18, 12, c) + oval(490, 556, 18, 12, c) +
    shape('M440 506H480L476 540H444Z', pick(v, 'honey', '#ffb627', '#7fd0f0')) + box(436, 498, 48, 12, '#fff', 3, 3) +
    pick(v, 'bee', oval(520, 440, 11, 8, '#ffd23f', 2.5) + `<path d="M516 433V447M524 433V447" stroke="${INK}" stroke-width="3"/>` + oval(518, 430, 6, 4, '#fff', 2), '');
}

function ground(v) {
  const mush = (x, y, s, spots) => box(x - 8 * s, y - 20 * s, 16 * s, 22 * s, '#fff2cf', 4, 3) +
    shape(`M${x - 26 * s} ${y - 18 * s}Q${x} ${y - 56 * s} ${x + 26 * s} ${y - 18 * s}Z`, '#ff3b3b') +
    `<circle cx="${x - 9 * s}" cy="${y - 30 * s}" r="${5 * s}" fill="${spots}"/><circle cx="${x + 9 * s}" cy="${y - 28 * s}" r="${4 * s}" fill="${spots}"/><circle cx="${x}" cy="${y - 42 * s}" r="${4 * s}" fill="${spots}"/>`;
  return (
    mush(300, 600, 1.2, pick(v, 'mushroom', '#fff', '#ffd23f')) + pick(v, 'mushroomGone', mush(350, 604, 0.7, '#fff'), '') +
    // 다리
    box(140, 640, 120, 18, pick(v, 'bridge', '#c98a55', '#ff7aa8'), 4) + box(140, 676, 120, 18, pick(v, 'bridge', '#c98a55', '#ff7aa8'), 4) + box(140, 712, 120, 18, pick(v, 'bridge', '#c98a55', '#ff7aa8'), 4) +
    pick(v, 'fish', fish(380, 710, 0.6, '#ff8a3d', { fin: '#ffb627' }), '') +
    // 고슴도치
    shape('M484 660Q484 612 520 610Q556 610 560 660Z', pick(v, 'hedgehog', '#8a6d4e', '#c76bd6')) +
    `<path d="M494 626L488 612M506 616L502 600M520 612V596M534 616L540 600M546 626L554 612" stroke="${INK}" stroke-width="3"/>` +
    oval(562, 650, 12, 10, '#f0d9bd', 3) + `<circle cx="566" cy="646" r="2.5" fill="${INK}"/>` +
    // 토끼
    oval(60, 770, 26, 20, '#fff') + disc(60, 740, 18, '#fff') + `<circle cx="54" cy="738" r="2.5" fill="${INK}"/><circle cx="66" cy="738" r="2.5" fill="${INK}"/>` +
    oval(50, 704, 7, 22, '#fff', 3) + pick(v, 'bunnyEar', oval(70, 704, 7, 22, '#fff', 3), shape('M66 724Q80 708 92 716Q86 726 70 728Z', '#fff', 3)) +
    pick(v, 'log', `<g transform="rotate(-6 260 780)">` + box(200, 764, 120, 34, '#a7744a', 16) + `</g>` + oval(318, 778, 12, 17, '#e8c49a', 3), '') +
    flower(560, 748, pick(v, 'flower', '#ff7aa8', '#7b6cf6'))
  );
}

function draw(v) {
  return woods(v) + nest(v) + squirrel(v) + deer(v) + bear(v) + butterfly(330, 420, pick(v, 'butterfly', '#ffd23f', '#ff7aa8')) + ground(v);
}

export default { id: 'forest', title: '숲속 친구들', diffs, draw };
