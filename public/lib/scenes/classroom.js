// 장면 4: 교실 — 칠판 앞의 선생님과 책상에 앉은 아이들.

import { W, H, pick, box, disc, shape, line, heart, star, clock, person, headPos } from '../art.js';

const TEACHER = { x: 552, y: 612, s: 1.05, hairStyle: 'bun', hair: '#3a2630', bottom: '#3d4f8f', bottomType: 'skirt', arms: [100, 10], shoes: '#ff5b5b', mouth: 'open' };
const KID1 = { x: 95, y: 772, s: 0.9, hs: 1.25, legs: false, hairStyle: 'pigtails', hair: '#2b2233', top: '#ff9fbd', arms: [-25, -25] };
const KID2 = { x: 295, y: 772, s: 0.9, hs: 1.25, legs: false, hairStyle: 'short', hair: '#5a3a2a', top: '#7fd0f0', arms: [-25, -25], mouth: 'smile' };
const KID3 = { x: 490, y: 772, s: 0.9, hs: 1.25, legs: false, hairStyle: 'bob', hair: '#c9622f', top: '#5cc46e', arms: [-25, -25] };

const teacherHead = headPos(TEACHER);
const head1 = headPos(KID1);
const head2 = headPos(KID2);
const head3 = headPos(KID3);

const diffs = [
  { id: 'boardSum', label: '칠판 덧셈 답', cx: 292, cy: 128, r: 32 },
  { id: 'boardFlower', label: '칠판 꽃 색', cx: 400, cy: 130, r: 44 },
  { id: 'boardStar', label: '칠판 별', cx: 170, cy: 212, r: 34 },
  { id: 'chalk', label: '분필 색', cx: 210, cy: 276, r: 24 },
  { id: 'eraser', label: '칠판지우개', cx: 410, cy: 276, r: 30 },
  { id: 'clock', label: '시곗바늘', cx: 535, cy: 86, r: 46 },
  { id: 'windowSun', label: '창밖 해', cx: 55, cy: 132, r: 28 },
  { id: 'poster', label: '벽보 별 색', cx: 535, cy: 208, r: 36 },
  { id: 'artHeart', label: '걸린 그림 속 하트', cx: 62, cy: 356, r: 32 },
  { id: 'artLine', label: '걸린 그림 하나', cx: 250, cy: 356, r: 34 },
  { id: 'globe', label: '지구본 색', cx: 88, cy: 462, r: 38 },
  { id: 'books', label: '맨 위 책 색', cx: 216, cy: 468, r: 32 },
  { id: 'pointer', label: '선생님 지시봉', cx: 442, cy: 392, r: 30 },
  { id: 'teacherGlasses', label: '선생님 안경', cx: teacherHead.x, cy: teacherHead.y, r: 34 },
  { id: 'teacherTop', label: '선생님 옷 색', cx: TEACHER.x, cy: TEACHER.y - 100, r: 30 },
  { id: 'kid1Bow', label: '왼쪽 아이 리본 색', cx: head1.x, cy: head1.y - 22, r: 50 },
  { id: 'kid2Glasses', label: '가운데 아이 안경', cx: head2.x, cy: head2.y, r: 34 },
  { id: 'kid3Bow', label: '오른쪽 아이 리본', cx: head3.x + 27, cy: head3.y - 36, r: 24 },
  { id: 'book', label: '책상 위 책 색', cx: 95, cy: 734, r: 34 },
  { id: 'pencil', label: '책상 위 연필', cx: 295, cy: 740, r: 34 },
  { id: 'apple', label: '책상 위 사과', cx: 490, cy: 732, r: 30 },
];

function room(v) {
  return (
    `<rect width="${W}" height="${H}" fill="#ffe9b8"/>` +
    `<rect y="600" width="${W}" height="${H - 600}" fill="#e8b27a"/>` +
    `<path d="M0 650H${W}M0 700H${W}M0 750H${W}" stroke="#d29a62" stroke-width="3"/>` +
    box(-5, 590, W + 10, 14, '#c98a55') +
    // 창문
    box(12, 74, 88, 186, '#fff', 4) + box(20, 82, 72, 170, '#bfe9ff', 0, 3) +
    pick(v, 'windowSun', disc(55, 132, 16, '#ffd23f', 3), '') +
    line('M56 82V252M20 166H92', 4)
  );
}

function board(v) {
  const chalkFlower = pick(v, 'boardFlower', '#ffb3c7', '#ffe27a');
  const petals = [[400, 106], [424, 124], [414, 152], [386, 152], [376, 124]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="none" stroke="${chalkFlower}" stroke-width="4"/>`).join('');
  return (
    box(108, 56, 364, 214, '#a7744a', 8) + box(122, 70, 336, 186, '#2f7d5b', 0, 3) +
    `<text x="272" y="146" font-size="50" font-weight="700" fill="#fff" text-anchor="end">2+3=</text>` +
    `<text x="276" y="146" font-size="50" font-weight="700" fill="#ffe27a">${pick(v, 'boardSum', '5', '6')}</text>` +
    petals + `<circle cx="400" cy="130" r="9" fill="none" stroke="#ffe27a" stroke-width="4"/>` +
    pick(v, 'boardStar', `<path d="M170 186L177 205L197 206L181 218L187 238L170 227L153 238L159 218L143 206L163 205Z" fill="none" stroke="#fff" stroke-width="4"/>`, '') +
    `<path d="M240 226Q290 190 340 226T440 226" fill="none" stroke="#bfe9ff" stroke-width="4"/>` +
    // 분필 받침
    box(100, 268, 380, 14, '#c98a55', 4) +
    box(160, 258, 34, 10, '#fff', 3, 3) + box(196, 258, 34, 10, pick(v, 'chalk', '#ff7aa8', '#4fb3ff'), 3, 3) +
    pick(v, 'eraser', box(386, 250, 50, 18, '#3d4f8f', 3, 3), '')
  );
}

function wall(v) {
  const art = (x, tilt, inner) =>
    `<g transform="rotate(${tilt} ${x} 330)">` + box(x - 34, 330, 68, 56, '#fff', 0, 3) + inner + `</g>`;
  return (
    clock(535, 86, 40, '#ff8a3d', ...pick(v, 'clock', [60, 0], [150, 0])) +
    box(490, 150, 90, 116, '#fff7e0', 4, 3) + star(535, 208, 32, pick(v, 'poster', '#ffd23f', '#ff5b8a')) +
    // 줄에 걸린 아이들 그림
    line('M4 322Q160 344 330 322', 3) +
    art(62, -3, heart(62, 362, 22, pick(v, 'artHeart', '#ff5b8a', '#7b6cf6'))) +
    art(156, 2, disc(146, 352, 9, '#ffd23f', 2.5) + shape('M128 382L156 354L184 382Z', '#5cc46e', 2.5)) +
    pick(v, 'artLine', art(250, -2, box(232, 358, 36, 24, '#ff8a3d', 2, 2.5) + shape('M228 358L250 340L272 358Z', '#ff5b5b', 2.5)), '')
  );
}

function teacherDesk(v) {
  return (
    disc(88, 462, 30, pick(v, 'globe', '#4fb3ff', '#ffb627')) +
    shape('M72 448Q90 438 96 456Q84 470 72 448ZM92 472Q108 464 110 480Q98 490 92 472Z', '#5cc46e', 2.5) +
    line('M88 492V506', 6) + box(62, 504, 52, 10, '#a7744a', 3, 3) +
    box(176, 488, 80, 26, '#ff7aa8', 3, 3) + box(184, 466, 66, 22, '#7fd0f0', 3, 3) +
    box(180, 444, 72, 22, pick(v, 'books', '#ffd23f', '#5cc46e'), 3, 3) +
    box(20, 514, 280, 18, '#b5804e', 4) + box(34, 532, 252, 72, '#c98a55', 0)
  );
}

function desk(x, inner) {
  return box(x - 88, 714, 176, 90, '#d9a35b') + box(x - 98, 700, 196, 18, '#f0c98a', 4) + inner;
}

function draw(v) {
  return (
    room(v) +
    board(v) +
    wall(v) +
    teacherDesk(v) +
    pick(v, 'pointer', `<path d="M466 478L418 302" stroke="#7a5236" stroke-width="7" stroke-linecap="round"/>`, '') +
    person({ ...TEACHER, top: pick(v, 'teacherTop', '#7b6cf6', '#ff8a3d'), glasses: !v.has('teacherGlasses') }) +
    person({ ...KID1, bows: pick(v, 'kid1Bow', '#ff5b8a', '#4fb3ff') }) +
    person({ ...KID2, glasses: !v.has('kid2Glasses') }) +
    person({ ...KID3, bow: pick(v, 'kid3Bow', '#ffd23f', null) }) +
    desk(95, box(58, 708, 74, 12, '#fff', 2, 3) + box(62, 720, 66, 34, pick(v, 'book', '#ff5b5b', '#4fb3ff'), 3, 3)) +
    desk(295, box(250, 722, 90, 30, '#fff', 3, 3) +
      pick(v, 'pencil', `<path d="M262 738L322 726" stroke="#ffb627" stroke-width="8" stroke-linecap="round"/><path d="M322 726L332 724" stroke="#26213a" stroke-width="5" stroke-linecap="round"/>`, '')) +
    desk(490, pick(v, 'apple', disc(490, 734, 18, '#ff5b5b') + line('M490 716Q492 708 500 706', 3), ''))
  );
}

export default { id: 'classroom', title: '교실 수업', diffs, draw };
