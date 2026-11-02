// 장면 5: 바닷가 — 모래성을 쌓는 아이, 파라솔 아래의 엄마, 튜브를 든 아이.

import { W, H, INK, pick, box, disc, oval, shape, line, sun, cloud, star, person, headPos } from '../art.js';

const MOM = { x: 448, y: 640, s: 0.95, sit: true, hairStyle: 'long', hair: '#3a2630', top: '#ff7aa8', bottom: '#ffd23f', bottomType: 'skirt', arms: [10, 30], shoes: '#fff' };
const GIRL = { x: 230, y: 716, s: 0.8, hs: 1.25, hairStyle: 'pigtails', hair: '#5a3a2a', top: '#ffd23f', bottom: '#4fb3ff', bottomType: 'skirt', bows: '#ff5b8a', arms: [60, 70], shoes: '#ff7aa8' };
const BOY = { x: 512, y: 790, s: 0.8, hs: 1.25, hairStyle: 'spiky', hair: '#3a2630', top: '#7fd0f0', bottomType: 'shorts', arms: [20, 20], shoes: '#fff' };

const momHead = headPos(MOM);

const diffs = [
  { id: 'sunColor', label: '해 색', cx: 86, cy: 84, r: 54 },
  { id: 'cloudGone', label: '구름', cx: 300, cy: 70, r: 46 },
  { id: 'gull', label: '갈매기', cx: 480, cy: 92, r: 30 },
  { id: 'sail', label: '돛 색', cx: 244, cy: 280, r: 42 },
  { id: 'boatFlag', label: '배 깃발', cx: 262, cy: 212, r: 24 },
  { id: 'lighthouse', label: '등대 줄무늬 색', cx: 520, cy: 300, r: 42 },
  { id: 'coconut', label: '야자 열매', cx: 92, cy: 360, r: 24 },
  { id: 'umbrella', label: '파라솔 색', cx: 372, cy: 456, r: 42 },
  { id: 'momGlasses', label: '엄마 안경', cx: momHead.x, cy: momHead.y, r: 32 },
  { id: 'castleFlag', label: '모래성 깃발 색', cx: 96, cy: 628, r: 28 },
  { id: 'castleDoor', label: '모래성 문', cx: 96, cy: 752, r: 28 },
  { id: 'bucket', label: '양동이 색', cx: 322, cy: 762, r: 32 },
  { id: 'shovel', label: '삽', cx: 312, cy: 648, r: 26 },
  { id: 'ring', label: '튜브 색', cx: 512, cy: 722, r: 44 },
  { id: 'crab', label: '게 색', cx: 408, cy: 762, r: 34 },
  { id: 'starfish', label: '불가사리', cx: 190, cy: 520, r: 28 },
  { id: 'shell', label: '조개', cx: 36, cy: 560, r: 26 },
  { id: 'ball', label: '비치볼 무늬', cx: 300, cy: 566, r: 36 },
];

function background(v) {
  return (
    `<defs><linearGradient id="bc-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fcdf6"/><stop offset="1" stop-color="#d9f4fd"/></linearGradient></defs>` +
    `<rect width="${W}" height="340" fill="url(#bc-sky)"/>` +
    sun(86, 84, 34, pick(v, 'sunColor', '#ffd23f', '#ff8a3d')) +
    pick(v, 'cloudGone', cloud(300, 70), '') +
    cloud(400, 190, 0.8) +
    line('M452 92Q466 76 480 92Q494 76 508 92', 4) +
    pick(v, 'gull', line('M456 116Q466 104 476 116Q486 104 496 116', 4), '') +
    `<path d="M0 330H${W}V500H0Z" fill="#35b9d6"/>` +
    `<path d="M0 330H${W}" fill="none" stroke="#26213a" stroke-width="4"/>` +
    `<path d="M20 372Q44 360 68 372T116 372M330 396Q354 384 378 396T426 396M120 440Q144 428 168 440T216 440M440 448Q464 436 488 448T536 448" fill="none" stroke="#a9ecf5" stroke-width="5" stroke-linecap="round"/>` +
    shape(`M0 490Q90 462 200 484Q330 508 440 480Q530 462 ${W} 486V${H}H0Z`, '#ffe3a3') +
    `<path d="M60 610h14M140 700h14M380 560h14M540 600h14M450 700h14M250 780h14" stroke="#e8c47a" stroke-width="5" stroke-linecap="round"/>`
  );
}

function boat(v) {
  return (
    `<path d="M240 200V336" stroke="${INK}" stroke-width="5"/>` +
    pick(v, 'boatFlag', shape('M242 200L282 212L242 224Z', '#ff5b5b', 3), '') +
    shape('M246 232Q308 276 296 328L246 328Z', pick(v, 'sail', '#fff', '#ffd23f')) +
    shape('M234 244Q190 290 186 328L234 328Z', '#ff7aa8') +
    shape('M172 336H316L292 374H196Z', '#a7744a')
  );
}

function lighthouse(v) {
  const stripe = pick(v, 'lighthouse', '#ff5b5b', '#4fb3ff');
  return (
    shape(`M452 398Q470 360 520 366Q580 360 ${W} 390V420H452Z`, '#8d8fa8') +
    shape('M492 370L502 232L538 232L548 370Z', '#fff') +
    shape('M499 280L541 280L544 322L496 322Z', stripe, 3) +
    box(494, 222, 52, 12, stripe, 2, 3) + box(506, 192, 28, 30, '#ffe27a', 2, 3) + shape('M500 192L520 170L540 192Z', stripe, 3)
  );
}

function palm(v) {
  const leaf = (d) => shape(d, '#4caf50');
  return (
    shape('M66 560Q70 470 96 352L114 356Q92 470 92 560Z', '#a7744a') +
    leaf('M104 340Q60 290 6 322Q58 322 100 352Z') + leaf('M104 340Q150 286 204 316Q150 322 110 354Z') +
    leaf('M104 340Q80 386 26 412Q84 410 112 356Z') + leaf('M104 340Q134 386 190 408Q134 408 98 356Z') + leaf('M104 340Q96 284 128 256Q124 306 112 346Z') +
    disc(116, 358, 11, '#7a5236', 3) + pick(v, 'coconut', disc(92, 362, 11, '#7a5236', 3), '')
  );
}

function umbrella(v) {
  const color = pick(v, 'umbrella', '#ff5b5b', '#7b6cf6');
  return (
    `<path d="M372 646L370 440" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>` +
    shape('M262 490Q280 400 370 396Q462 400 480 490Q452 472 426 490Q398 472 370 490Q342 472 316 490Q288 472 262 490Z', color) +
    shape('M344 486Q346 420 370 396Q394 420 396 486Q384 474 370 490Q356 474 344 486Z', '#fff', 3) +
    box(350, 640, 190, 22, '#7fd0f0', 6)
  );
}

function castle(v) {
  const tower = (x, y, w, h) => box(x, y, w, h, '#f0c674') +
    shape(`M${x - 4} ${y}V${y - 14}H${x + w / 3}V${y}H${x + (2 * w) / 3}V${y - 14}H${x + w + 4}V${y}Z`, '#f0c674');
  return (
    `<path d="M96 660V620" stroke="${INK}" stroke-width="4"/>` +
    shape('M98 616L128 628L98 640Z', pick(v, 'castleFlag', '#ff5b5b', '#4fb3ff'), 3) +
    tower(14, 700, 50, 76) + tower(128, 700, 50, 76) + tower(60, 672, 72, 104) +
    pick(v, 'castleDoor', shape('M80 776V744Q96 722 112 744V776Z', '#a7744a'), '')
  );
}

function crab(x, y, color) {
  return (
    line(`M${x - 22} ${y + 6}L${x - 36} ${y + 14}M${x + 22} ${y + 6}L${x + 36} ${y + 14}M${x - 18} ${y + 12}L${x - 30} ${y + 22}M${x + 18} ${y + 12}L${x + 30} ${y + 22}`, 4) +
    disc(x - 34, y - 12, 9, color, 3) + disc(x + 34, y - 12, 9, color, 3) +
    oval(x, y, 26, 18, color) +
    disc(x - 8, y - 20, 5, '#fff', 2.5) + disc(x + 8, y - 20, 5, '#fff', 2.5)
  );
}

function ball(v) {
  const c = pick(v, 'ball', '#4fb3ff', '#5cc46e');
  return disc(300, 566, 30, '#fff') +
    shape('M300 536Q280 566 300 596Q272 590 270 566Q272 542 300 536Z', '#ff5b5b', 2.5) +
    shape('M300 536Q320 566 300 596Q328 590 330 566Q328 542 300 536Z', c, 2.5);
}

function draw(v) {
  return (
    background(v) +
    boat(v) +
    lighthouse(v) +
    palm(v) +
    umbrella(v) +
    person({ ...MOM, glasses: !v.has('momGlasses') }) +
    pick(v, 'starfish', star(190, 520, 24, '#ff8a3d'), '') +
    pick(v, 'shell', shape('M16 572Q36 534 56 572Z', '#ffc2d4', 3) + line('M36 572V552M26 572L30 556M46 572L42 556', 2), '') +
    ball(v) +
    castle(v) +
    person(GIRL) +
    pick(v, 'shovel', `<path d="M294 672L322 634" stroke="#ff5b5b" stroke-width="7" stroke-linecap="round"/>` + shape('M316 636L338 620L334 646Z', '#ffb627', 3), '') +
    shape('M296 742H348L342 790H302Z', pick(v, 'bucket', '#ff5b8a', '#ffd23f')) + line('M298 742Q322 712 346 742', 3) +
    crab(408, 762, pick(v, 'crab', '#ff5b5b', '#7b6cf6')) +
    person({ ...BOY, bottom: '#ff8a3d' }) +
    `<circle cx="512" cy="722" r="38" fill="none" stroke="${INK}" stroke-width="30"/>` +
    `<circle cx="512" cy="722" r="38" fill="none" stroke="${pick(v, 'ring', '#ffd23f', '#5cc46e')}" stroke-width="22"/>` +
    `<path d="M512 684A38 38 0 0 1 550 722" fill="none" stroke="#ff5b5b" stroke-width="22"/>`
  );
}

export default { id: 'beach', title: '바닷가', diffs, draw };
