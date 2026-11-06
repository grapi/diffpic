// 장면 25: 공룡 박물관 — 커다란 공룡 뼈, 공룡 모형, 화석 진열장, 안내원과 아이들.

import { W, H, INK, pick, box, disc, oval, shape, line, tube, person, headPos } from '../art.js';

const GUIDE = { x: 500, y: 790, s: 1, hairStyle: 'bob', hair: '#3a2630', bottom: '#3d4f8f', bottomType: 'skirt', arms: [100, 10], shoes: '#3d3b52' };
const KID1 = { x: 120, y: 790, s: 0.9, hs: 1.25, hairStyle: 'cap', top: '#ff8a3d', bottom: '#3d4f8f', bottomType: 'shorts', arms: [150, 10], shoes: '#fff' };
const KID2 = { x: 300, y: 790, s: 0.9, hs: 1.25, hairStyle: 'pigtails', hair: '#5a3a2a', top: '#7fd0f0', bottom: '#ff7aa8', bottomType: 'skirt', bows: '#ffd23f', arms: [10, 10], shoes: '#ff5b5b' };
const guideHead = headPos(GUIDE);
const kid1Head = headPos(KID1);

const diffs = [
  { id: 'lamp', label: '천장 등 색', cx: 300, cy: 40, r: 30 },
  { id: 'paintSun', label: '그림 속 해', cx: 90, cy: 104, r: 22 },
  { id: 'frame', label: '오른쪽 액자 색', cx: 520, cy: 110, r: 40 },
  { id: 'sign', label: '공룡관 표지 색', cx: 300, cy: 120, r: 40 },
  { id: 'skull', label: '공룡 뼈 눈', cx: 470, cy: 286, r: 24 },
  { id: 'tail', label: '공룡 꼬리 끝 뼈', cx: 52, cy: 440, r: 28 },
  { id: 'rib', label: '갈비뼈 하나', cx: 320, cy: 340, r: 24 },
  { id: 'model', label: '공룡 모형 색', cx: 96, cy: 560, r: 38 },
  { id: 'spikes', label: '모형 등 가시 색', cx: 96, cy: 516, r: 24 },
  { id: 'egg', label: '공룡알 색', cx: 450, cy: 578, r: 26 },
  { id: 'fossil', label: '조개 화석', cx: 530, cy: 582, r: 24 },
  { id: 'rope', label: '줄 색', cx: 236, cy: 618, r: 24 },
  { id: 'post', label: '기둥 공 색', cx: 210, cy: 596, r: 22 },
  { id: 'guideGlasses', label: '안내원 안경', cx: guideHead.x, cy: guideHead.y, r: 32 },
  { id: 'guideTop', label: '안내원 옷 색', cx: GUIDE.x, cy: GUIDE.y - 100, r: 28 },
  { id: 'kidCap', label: '아이 모자 색', cx: kid1Head.x + 6, cy: kid1Head.y - 22, r: 34 },
  { id: 'backpack', label: '가방 색', cx: KID2.x + 34, cy: KID2.y - 96, r: 24 },
];

function hall(v) {
  return (
    `<rect width="${W}" height="${H}" fill="#f2e6d0"/>` +
    `<rect y="620" width="${W}" height="${H - 620}" fill="#d9cbb4"/>` + `<path d="M0 620H${W}M0 690H${W}M150 620V800M300 620V800M450 620V800" stroke="#c4b498" stroke-width="3"/>` +
    line('M300 0V20', 3) + shape('M270 50Q272 22 300 22Q328 22 330 50Z', pick(v, 'lamp', '#ffd23f', '#5cc46e')) +
    box(30, 70, 120, 90, '#a7744a', 4) + box(40, 80, 100, 70, '#bfe9ff', 0, 3) + shape('M40 150L80 112L110 134L140 110V150Z', '#5cc46e', 3) +
    pick(v, 'paintSun', disc(90, 104, 10, '#ffd23f', 2.5), '') +
    box(460, 62, 120, 96, pick(v, 'frame', '#ffd23f', '#ff5b8a'), 4) + box(472, 74, 96, 72, '#fff7e0', 0, 3) + oval(520, 120, 26, 14, '#7fcf6a', 3) + disc(536, 104, 10, '#7fcf6a', 3) +
    box(230, 96, 140, 48, pick(v, 'sign', '#3f8f6b', '#7b6cf6'), 8) + `<text x="300" y="129" font-size="26" font-weight="800" fill="#fff" text-anchor="middle">공룡관</text>`
  );
}

function skeleton(v) {
  const bone = (d) => tube(d, '#fffdf4', 10);
  const ribs = [200, 240, 280, 320, 360, 400].map((x) => (x === 320 && v.has('rib') ? '' : bone(`M${x} ${300 - (x - 300) * (x - 300) / 800}Q${x + 12} ${340} ${x} ${376}`)));
  return (
    box(150, 512, 300, 20, '#9aa0b8', 4) + box(290, 470, 20, 44, '#9aa0b8', 3) +
    bone('M140 320Q300 270 450 310') +
    bone('M140 320Q100 350 76 400') + pick(v, 'tail', bone('M76 400Q60 430 46 456'), '') +
    ribs.join('') +
    bone('M210 330L196 420L214 506') + bone('M380 330L392 420L372 506') + bone('M430 330L450 368') +
    shape('M440 300Q450 262 490 264Q526 268 524 296L506 304L520 312Q500 322 470 318Z', '#fffdf4') +
    `<path d="M480 300L484 310M492 302L496 312M504 302L508 312" stroke="${INK}" stroke-width="2.5"/>` +
    disc(474, 284, 7, pick(v, 'skull', INK, '#ff5b5b'), 0)
  );
}

function model(v) {
  const c = pick(v, 'model', '#5cc46e', '#ff8a3d');
  return box(30, 600, 140, 20, '#a7744a', 4) +
    shape('M60 596Q40 560 70 540L130 536Q160 540 156 580L150 596Z', c) +
    shape('M130 540Q150 500 140 470Q170 470 170 500Q166 530 146 548Z', c) + `<circle cx="156" cy="490" r="3.5" fill="${INK}"/>` +
    shape('M70 560Q30 570 14 560Q30 590 66 584Z', c) +
    [[80, 538], [98, 532], [116, 532]].map(([x, y]) => shape(`M${x - 8} ${y + 4}L${x} ${y - 14}L${x + 8} ${y + 4}Z`, pick(v, 'spikes', '#ffd23f', '#ff5b5b'), 3)).join('');
}

function caseBox(v) {
  return box(410, 600, 160, 22, '#a7744a', 4) + box(414, 546, 152, 56, '#e9f9ff', 4, 3) +
    oval(450, 580, 16, 20, pick(v, 'egg', '#fff2cf', '#a8e0ff'), 3) + `<path d="M440 574L446 580L452 572" fill="none" stroke="${INK}" stroke-width="2"/>` +
    pick(v, 'fossil', shape('M514 594Q530 562 546 594Z', '#c9b8a0', 3) + line('M530 594V576M522 594L524 580M538 594L536 580', 2), '');
}

function barrier(v) {
  const top = pick(v, 'post', '#ffd23f', '#4fb3ff');
  return [210, 390].map((x) => box(x - 5, 596, 10, 64, '#9aa0b8', 3) + disc(x, 594, 9, top, 3)).join('') +
    `<path d="M214 612Q300 640 386 612" fill="none" stroke="${INK}" stroke-width="10"/><path d="M214 612Q300 640 386 612" fill="none" stroke="${pick(v, 'rope', '#d9334a', '#3f8f6b')}" stroke-width="6"/>`;
}

function draw(v) {
  return (
    hall(v) +
    skeleton(v) +
    model(v) +
    caseBox(v) +
    barrier(v) +
    person({ ...GUIDE, top: pick(v, 'guideTop', '#5cc46e', '#ff7aa8'), glasses: !v.has('guideGlasses') }) +
    person({ ...KID1, hat: pick(v, 'kidCap', '#3b7dd8', '#ffd23f') }) +
    box(KID2.x + 20, KID2.y - 120, 32, 50, pick(v, 'backpack', '#ff5b5b', '#5cc46e'), 10) +
    person(KID2)
  );
}

export default { id: 'museum', title: '공룡 박물관', diffs, draw };
