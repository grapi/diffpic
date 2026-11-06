// 장면 28: 미술 시간 — 이젤 앞에서 그림 그리는 아이, 찰흙을 빚는 아이, 물감과 붓.

import { W, H, INK, pick, box, disc, oval, shape, line, heart, star, clock, cloud, person, headPos, handPos } from '../art.js';

const PAINTER = { x: 140, y: 790, s: 0.95, hs: 1.25, hairStyle: 'bob', hair: '#3a2630', top: '#7fd0f0', bottom: '#3d4f8f', bottomType: 'skirt', arms: [10, 100], shoes: '#ff7aa8' };
const SCULPTOR = { x: 450, y: 680, s: 0.9, hs: 1.25, legs: false, hairStyle: 'spiky', hair: '#5a3a2a', top: '#ffd23f', arms: [-30, -30] };
const painterHead = headPos(PAINTER);
const brushHand = handPos(PAINTER, 1);
const sculptHead = headPos(SCULPTOR);

const diffs = [
  { id: 'garland', label: '가랜드 깃발 색', cx: 300, cy: 46, r: 26 },
  { id: 'windowCloud', label: '창밖 구름', cx: 96, cy: 150, r: 32 },
  { id: 'clock', label: '시곗바늘', cx: 520, cy: 110, r: 40 },
  { id: 'drawSun', label: '벽 그림 속 해', cx: 260, cy: 150, r: 24 },
  { id: 'drawStar', label: '벽 그림 별 색', cx: 380, cy: 160, r: 28 },
  { id: 'canvasTree', label: '이젤 그림 나무 색', cx: 290, cy: 400, r: 34 },
  { id: 'canvasHeart', label: '이젤 그림 하트', cx: 340, cy: 360, r: 22 },
  { id: 'beret', label: '베레모 색', cx: painterHead.x, cy: painterHead.y - 34, r: 32 },
  { id: 'apron', label: '앞치마 색', cx: PAINTER.x, cy: PAINTER.y - 94, r: 28 },
  { id: 'brushTip', label: '붓 끝 물감 색', cx: brushHand.x + 30, cy: brushHand.y - 24, r: 20 },
  { id: 'palette', label: '팔레트 물감', cx: 70, cy: 560, r: 26 },
  { id: 'jar', label: '붓통 색', cx: 330, cy: 610, r: 26 },
  { id: 'brushGone', label: '붓통 속 붓', cx: 342, cy: 574, r: 20 },
  { id: 'vase', label: '찰흙 꽃병 색', cx: 450, cy: 620, r: 30 },
  { id: 'cheek', label: '아이 볼의 물감', cx: sculptHead.x - 22, cy: sculptHead.y + 10, r: 20 },
  { id: 'pencils', label: '색연필 통 색', cx: 556, cy: 618, r: 24 },
  { id: 'spill', label: '바닥 물감 색', cx: 300, cy: 760, r: 34 },
  { id: 'plane', label: '종이비행기', cx: 470, cy: 260, r: 30 },
];

function room(v) {
  const flags = [80, 160, 240, 300, 360, 440, 520];
  return (
    `<rect width="${W}" height="${H}" fill="#fff3d6"/>` +
    `<rect y="660" width="${W}" height="${H - 660}" fill="#d9a877"/>` + `<path d="M0 660H${W}" stroke="${INK}" stroke-width="4"/>` +
    line('M0 20Q300 60 600 20', 3) +
    flags.map((x, i) => shape(`M${x - 16} ${30 + Math.round(Math.sin((x / 600) * Math.PI) * 18)}L${x + 16} ${32 + Math.round(Math.sin((x / 600) * Math.PI) * 18)}L${x} ${62 + Math.round(Math.sin((x / 600) * Math.PI) * 18)}Z`,
      x === 300 ? pick(v, 'garland', '#ff5b5b', '#5cc46e') : ['#ffd23f', '#4fb3ff', '#ff7aa8'][i % 3], 3)).join('') +
    box(30, 100, 140, 120, '#fff', 4) + box(40, 110, 120, 100, '#bfe9ff', 0, 3) + pick(v, 'windowCloud', cloud(96, 150, 0.6), '') + line('M100 110V210M40 160H160', 4) +
    clock(520, 110, 34, '#7b6cf6', ...pick(v, 'clock', [330, 0], [90, 0])) +
    box(216, 110, 90, 80, '#fff', 0, 3) + pick(v, 'drawSun', disc(260, 150, 16, '#ffd23f', 3), '') +
    box(330, 116, 100, 84, '#fff', 0, 3) + star(380, 160, 26, pick(v, 'drawStar', '#ff8a3d', '#4fb3ff'))
  );
}

function easel(v) {
  return line('M300 300L240 640M300 300L360 640M300 300V660', 7) +
    box(222, 300, 160, 140, '#fff', 4) +
    box(276, 400, 12, 32, '#a7744a', 2, 3) + disc(282, 392, 26, pick(v, 'canvasTree', '#5cc46e', '#ff8a3d'), 3) +
    pick(v, 'canvasHeart', heart(340, 362, 18, '#ff5b8a'), '') + box(216, 440, 172, 12, '#a7744a', 3);
}

function table(v) {
  return box(300, 640, 300, 16, '#c98a55', 4) + box(316, 656, 14, 120, '#a7744a', 3) + box(570, 656, 14, 120, '#a7744a', 3) +
    box(314, 596, 34, 44, pick(v, 'jar', '#ff7aa8', '#7fd0f0'), 6) +
    line('M322 596L316 566M334 596V560', 4) + pick(v, 'brushGone', line('M342 596L350 562', 4) + disc(350, 560, 4, '#5cc46e', 2), '') +
    shape('M428 640L472 640L466 610Q480 596 470 590H430Q420 596 434 610Z', pick(v, 'vase', '#d9822b', '#7b6cf6')) +
    box(540, 600, 32, 40, pick(v, 'pencils', '#5cc46e', '#ff5b5b'), 4) + `<path d="M546 600L544 584M556 600V580M566 600L568 584" stroke="#ff8a3d" stroke-width="5"/>`;
}

function draw(v) {
  return (
    room(v) +
    pick(v, 'plane', shape('M440 270L500 250L462 282Z', '#fff', 3) + line('M462 282L470 264', 2), '') +
    easel(v) +
    person({ ...PAINTER, apron: pick(v, 'apron', '#ff8a3d', '#5cc46e') }) +
    shape(`M${painterHead.x - 34} ${painterHead.y - 26}Q${painterHead.x - 30} ${painterHead.y - 54} ${painterHead.x + 6} ${painterHead.y - 52}Q${painterHead.x + 40} ${painterHead.y - 46} ${painterHead.x + 32} ${painterHead.y - 28}Z`, pick(v, 'beret', '#ff5b5b', '#4fb3ff')) +
    line(`M${brushHand.x} ${brushHand.y}L${brushHand.x + 28} ${brushHand.y - 22}`, 5) + disc(brushHand.x + 30, brushHand.y - 24, 6, pick(v, 'brushTip', '#ff5b5b', '#4fb3ff'), 2.5) +
    line('M44 600L36 660M96 600L104 660', 6) + box(28, 588, 84, 14, '#a7744a', 4) +
    oval(70, 566, 46, 22, '#e8c49a') + disc(86, 574, 6, '#fff2cf', 2.5) +
    disc(50, 562, 7, '#ff5b5b', 0) + disc(68, 556, 7, '#4fb3ff', 0) + pick(v, 'palette', disc(88, 558, 7, '#ffd23f', 0), '') +
    person(SCULPTOR) +
    pick(v, 'cheek', disc(sculptHead.x - 22, sculptHead.y + 10, 7, '#4fb3ff', 0), '') +
    table(v) +
    oval(300, 764, 46, 16, pick(v, 'spill', '#7b6cf6', '#ffd23f'), 3)
  );
}

export default { id: 'artroom', title: '미술 시간', diffs, draw };
