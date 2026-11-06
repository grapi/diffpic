// 장면 23: 수영장 — 미끄럼틀, 구조요원 의자, 튜브를 탄 아이들과 고무 오리.

import { W, H, INK, pick, box, disc, oval, shape, line, sun, cloud, person, headPos } from '../art.js';

const GUARD = { x: 520, y: 290, s: 0.85, sit: true, hairStyle: 'cap', top: '#ff5b5b', bottom: '#ffd23f', bottomType: 'shorts', arms: [10, 60], shoes: '#fff', mouth: 'open' };
const SWIM1 = { x: 200, y: 644, s: 0.8, hs: 1.25, legs: false, hairStyle: 'pigtails', hair: '#3a2630', top: '#ff7aa8', bows: '#ffd23f', arms: [150, 150] };
const SWIM2 = { x: 430, y: 660, s: 0.8, hs: 1.25, legs: false, hairStyle: 'short', hair: '#5a3a2a', top: '#7fd0f0', arms: [100, 100] };
const guardHead = headPos(GUARD);
const head2 = headPos(SWIM2);

const diffs = [
  { id: 'sunColor', label: '해 색', cx: 90, cy: 78, r: 50 },
  { id: 'cloudGone', label: '구름', cx: 330, cy: 70, r: 42 },
  { id: 'flag', label: '깃발 색', cx: 294, cy: 160, r: 24 },
  { id: 'slide', label: '미끄럼틀 색', cx: 130, cy: 360, r: 40 },
  { id: 'ladder', label: '사다리 칸', cx: 40, cy: 330, r: 24 },
  { id: 'guardCap', label: '구조요원 모자 색', cx: guardHead.x + 6, cy: guardHead.y - 20, r: 30 },
  { id: 'whistle', label: '호루라기', cx: GUARD.x + 4, cy: GUARD.y - 94, r: 20 },
  { id: 'chair', label: '의자 색', cx: 520, cy: 370, r: 34 },
  { id: 'umbrella', label: '파라솔 색', cx: 330, cy: 300, r: 44 },
  { id: 'towel', label: '수건 줄무늬 색', cx: 236, cy: 432, r: 30 },
  { id: 'sandals', label: '슬리퍼 색', cx: 400, cy: 440, r: 26 },
  { id: 'ball', label: '공 무늬 색', cx: 560, cy: 470, r: 26 },
  { id: 'rope', label: '레인 줄 색', cx: 300, cy: 560, r: 26 },
  { id: 'tube', label: '튜브 색', cx: SWIM1.x, cy: 594, r: 44 },
  { id: 'goggles', label: '물안경', cx: head2.x, cy: head2.y - 2, r: 30 },
  { id: 'mattress', label: '에어매트 색', cx: 300, cy: 730, r: 40 },
  { id: 'duck', label: '오리 색', cx: 90, cy: 712, r: 26 },
  { id: 'duckGone', label: '오리 하나', cx: 520, cy: 740, r: 26 },
];

function background(v) {
  return (
    `<defs><linearGradient id="pl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fcdf6"/><stop offset="1" stop-color="#d9f4fd"/></linearGradient></defs>` +
    `<rect width="${W}" height="420" fill="url(#pl-sky)"/>` +
    sun(90, 78, 30, pick(v, 'sunColor', '#ffd23f', '#ff8a3d')) +
    pick(v, 'cloudGone', cloud(330, 70, 0.9), '') + cloud(470, 120, 0.6) +
    line('M140 140Q300 190 460 140', 3) +
    [[180, 156, '#ff5b5b'], [236, 166, '#ffd23f'], [294, 170, pick(v, 'flag', '#4fb3ff', '#ff7aa8')], [352, 166, '#5cc46e'], [408, 156, '#ff8a3d']]
      .map(([x, y, c]) => shape(`M${x - 16} ${y - 4}L${x + 16} ${y}L${x} ${y + 28}Z`, c, 3)).join('') +
    `<rect y="410" width="${W}" height="${H - 410}" fill="#f4efe4"/>` + `<path d="M0 410H${W}" stroke="${INK}" stroke-width="4"/>` +
    box(20, 486, 560, 300, '#5fd3ee', 14) +
    `<path d="M60 620Q90 610 120 620T180 620M300 680Q330 670 360 680T420 680M120 760Q150 750 180 760T240 760" fill="none" stroke="#bff0fa" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M24 560H576" stroke="${pick(v, 'rope', '#ff5b5b', '#ffd23f')}" stroke-width="8" stroke-dasharray="14 10"/>`
  );
}

function slide(v) {
  const rungs = [260, 300, 340, 380, 420];
  return line('M22 220V486M60 220V486', 6) +
    rungs.map((y) => (y === 340 && v.has('ladder') ? '' : `<path d="M22 ${y}H60" stroke="${INK}" stroke-width="5"/>`)).join('') +
    box(14, 210, 64, 14, '#ffd23f', 4) +
    shape('M60 214L96 214Q150 330 210 494L170 494Q120 350 60 250Z', pick(v, 'slide', '#ff8a3d', '#7b6cf6'));
}

function chair(v) {
  const c = pick(v, 'chair', '#fff', '#ffd23f');
  return shape('M482 300L494 300L476 470L464 470Z', c, 3) + shape('M558 300L546 300L564 470L576 470Z', c, 3) +
    `<path d="M472 380H568M470 430H570" stroke="${INK}" stroke-width="5"/>` + box(472, 284, 96, 16, c, 4);
}

function deck(v) {
  const stripe = pick(v, 'towel', '#ff5b8a', '#5cc46e');
  return `<path d="M330 410V300" stroke="${INK}" stroke-width="6"/>` +
    shape('M250 330Q262 254 330 252Q398 254 410 330Q390 318 370 330Q350 318 330 330Q310 318 290 330Q270 318 250 330Z', pick(v, 'umbrella', '#ffd23f', '#ff5b5b')) +
    box(186, 418, 100, 30, '#fff', 4, 3) + `<path d="M206 418V448M236 418V448M266 418V448" stroke="${stripe}" stroke-width="8"/>` + box(186, 418, 100, 30, 'none', 4, 3) +
    oval(388, 440, 12, 18, pick(v, 'sandals', '#4fb3ff', '#ff8a3d'), 3) + oval(414, 440, 12, 18, pick(v, 'sandals', '#4fb3ff', '#ff8a3d'), 3) +
    disc(560, 470, 22, '#fff') + shape('M560 448Q544 470 560 492Q540 488 538 470Q540 452 560 448Z', pick(v, 'ball', '#ff5b5b', '#7b6cf6'), 2.5);
}

function draw(v) {
  return (
    background(v) +
    slide(v) +
    chair(v) +
    person({ ...GUARD, hat: pick(v, 'guardCap', '#ffd23f', '#4fb3ff') }) +
    pick(v, 'whistle', line(`M${GUARD.x - 8} ${GUARD.y - 114}L${GUARD.x} ${GUARD.y - 96}`, 2) + box(GUARD.x - 4, GUARD.y - 100, 16, 10, '#ffd23f', 3, 2.5), '') +
    deck(v) +
    person(SWIM1) +
    `<ellipse cx="${SWIM1.x}" cy="594" rx="54" ry="20" fill="none" stroke="${INK}" stroke-width="30"/><ellipse cx="${SWIM1.x}" cy="594" rx="54" ry="20" fill="none" stroke="${pick(v, 'tube', '#ffd23f', '#5cc46e')}" stroke-width="22"/>` +
    person(SWIM2) +
    pick(v, 'goggles', box(head2.x - 32, head2.y - 12, 64, 22, '#ff8a3d', 10) +
      `<ellipse cx="${head2.x - 14}" cy="${head2.y - 1}" rx="12" ry="9" fill="#bfe9ff" stroke="${INK}" stroke-width="3"/><ellipse cx="${head2.x + 14}" cy="${head2.y - 1}" rx="12" ry="9" fill="#bfe9ff" stroke="${INK}" stroke-width="3"/>`, '') +
    `<rect x="${SWIM2.x - 70}" y="640" width="140" height="40" fill="#5fd3ee"/>` +
    `<path d="M${SWIM2.x - 70} 640Q${SWIM2.x} 628 ${SWIM2.x + 70} 640" fill="none" stroke="#bff0fa" stroke-width="5"/>` +
    box(210, 712, 180, 36, pick(v, 'mattress', '#ff9fbd', '#a8e0ff'), 18) + `<path d="M240 712V748M270 712V748M300 712V748M330 712V748M360 712V748" stroke="#fff" stroke-width="3"/>` +
    (() => {
      const duck = (x, y, c) => oval(x, y, 20, 13, c, 3) + disc(x + 12, y - 14, 11, c, 3) + shape(`M${x + 22} ${y - 16}L${x + 34} ${y - 12}L${x + 22} ${y - 8}Z`, '#ff8a3d', 2) + `<circle cx="${x + 14}" cy="${y - 17}" r="2.5" fill="${INK}"/>`;
      return duck(90, 716, pick(v, 'duck', '#ffd23f', '#ff7aa8')) + pick(v, 'duckGone', duck(520, 744, '#ffd23f'), '');
    })()
  );
}

export default { id: 'pool', title: '수영장', diffs, draw };
