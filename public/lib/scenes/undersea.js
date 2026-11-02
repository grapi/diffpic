// 장면 9: 바닷속 — 잠수하는 아이와 물고기들, 문어, 거북, 보물상자.

import { W, H, INK, pick, box, disc, oval, shape, line, star, fish, person, headPos } from '../art.js';

const DIVER = { x: 300, y: 500, s: 0.9, hs: 1.25, hairStyle: 'short', hair: '#3a2630', bottom: '#3d4f8f', bottomType: 'shorts', arms: [110, 70], shoes: '#ffd23f' };
const diverHead = headPos(DIVER);

const diffs = [
  { id: 'boat', label: '수면 위 배 색', cx: 460, cy: 42, r: 40 },
  { id: 'jelly', label: '해파리 색', cx: 96, cy: 130, r: 44 },
  { id: 'bubble', label: '큰 물방울', cx: 322, cy: 148, r: 26 },
  { id: 'fish1', label: '노란 물고기 줄무늬', cx: 490, cy: 170, r: 42 },
  { id: 'fish2', label: '빨간 물고기 색', cx: 90, cy: 310, r: 44 },
  { id: 'fish3', label: '작은 물고기', cx: 520, cy: 320, r: 36 },
  { id: 'goggles', label: '물안경 색', cx: diverHead.x, cy: diverHead.y - 2, r: 36 },
  { id: 'tank', label: '산소통 색', cx: DIVER.x - 36, cy: DIVER.y - 88, r: 24 },
  { id: 'trunks', label: '수영복 색', cx: DIVER.x, cy: DIVER.y - 50, r: 26 },
  { id: 'turtle', label: '거북 등 색', cx: 490, cy: 480, r: 48 },
  { id: 'octopus', label: '문어 색', cx: 110, cy: 560, r: 52 },
  { id: 'octoBow', label: '문어 리본', cx: 146, cy: 516, r: 22 },
  { id: 'chest', label: '보물상자 색', cx: 300, cy: 700, r: 44 },
  { id: 'gem', label: '보물 보석 색', cx: 300, cy: 640, r: 24 },
  { id: 'coral', label: '산호 색', cx: 490, cy: 660, r: 42 },
  { id: 'seaweed', label: '해초', cx: 40, cy: 690, r: 32 },
  { id: 'starfish', label: '불가사리 색', cx: 180, cy: 752, r: 28 },
  { id: 'crab', label: '게', cx: 420, cy: 758, r: 32 },
  { id: 'shell', label: '조개 속 진주', cx: 552, cy: 752, r: 28 },
];

function water(v) {
  return (
    `<defs><linearGradient id="us-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fd3ee"/><stop offset="1" stop-color="#1f6fb8"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#us-sea)"/>` +
    `<path d="M120 0L60 640L200 640L220 0ZM340 0L320 640L470 640L440 0Z" fill="#fff" opacity="0.08"/>` +
    `<rect width="${W}" height="30" fill="#d9f4fd"/><path d="M0 30Q50 16 100 30T200 30T300 30T400 30T500 30T600 30" fill="none" stroke="${INK}" stroke-width="4"/>` +
    shape('M416 30L504 30L490 54Q460 60 430 54Z', pick(v, 'boat', '#ff5b5b', '#ffd23f')) +
    shape(`M0 700Q120 670 280 694T${W} 680V${H}H0Z`, '#f2d88f') +
    `<path d="M70 750h12M240 770h12M360 720h12M500 770h12M30 780h12" stroke="#d9b866" stroke-width="5" stroke-linecap="round"/>`
  );
}

function bubbles(v) {
  const b = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity="0.35" stroke="#fff" stroke-width="3"/>`;
  return b(330, 300, 10) + b(346, 250, 8) + b(322, 210, 12) + pick(v, 'bubble', b(322, 148, 20), '') + b(220, 90, 9) + b(560, 240, 10) + b(30, 440, 10);
}

function jelly(v) {
  const c = pick(v, 'jelly', '#ff9fd0', '#9fe08a');
  return `<path d="M72 150Q66 180 76 204M90 150Q96 186 88 214M108 150Q102 184 110 206M124 150Q130 176 120 198" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>` +
    shape('M60 152Q60 92 96 92Q132 92 132 152Q114 142 96 152Q78 142 60 152Z', c) +
    `<circle cx="84" cy="124" r="3.5" fill="${INK}"/><circle cx="108" cy="124" r="3.5" fill="${INK}"/><path d="M90 134Q96 139 102 134" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
}

function turtle(v) {
  return disc(546, 460, 22, '#7fd08a') + `<circle cx="554" cy="456" r="4" fill="${INK}"/>` +
    oval(452, 500, 24, 12, '#7fd08a') + oval(524, 512, 24, 12, '#7fd08a') + oval(438, 462, 22, 11, '#7fd08a') +
    oval(490, 480, 56, 40, pick(v, 'turtle', '#3c9d5d', '#ff8a3d')) +
    shape('M470 462L510 462L524 484L506 504L474 504L456 484Z', 'none', 3);
}

function octopus(v) {
  const c = pick(v, 'octopus', '#c76bd6', '#ff8a3d');
  const legs = ['M76 596Q44 620 60 660', 'M92 606Q78 640 92 672', 'M128 606Q142 640 128 672', 'M144 596Q176 620 160 660'];
  return legs.map((d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round"/>`).join('') +
    shape('M60 590Q52 510 110 508Q168 510 160 590Q140 612 110 610Q80 612 60 590Z', c) +
    disc(92, 556, 10, '#fff', 3) + disc(128, 556, 10, '#fff', 3) + `<circle cx="94" cy="557" r="4.5" fill="${INK}"/><circle cx="130" cy="557" r="4.5" fill="${INK}"/>` +
    line('M100 582Q110 592 120 582', 3) +
    pick(v, 'octoBow', shape('M146 516L128 504V528ZM146 516L164 504V528Z', '#ffd23f', 3) + disc(146, 516, 5, '#ffd23f', 3), '');
}

function chest(v) {
  const c = pick(v, 'chest', '#a7744a', '#7b6cf6');
  return shape('M286 668L300 628L314 668Z', pick(v, 'gem', '#ff5b8a', '#5cc46e'), 3) +
    shape('M252 668H348L356 690H244Z', '#ffd23f', 3) +
    box(244, 686, 112, 56, c, 6) + shape('M244 690Q250 660 262 672L338 672Q350 660 356 690Z', c) + box(288, 678, 24, 26, '#ffd23f', 3, 3);
}

function coral(v) {
  const c = pick(v, 'coral', '#ff6b6b', '#ffd23f');
  return ['M490 712V640', 'M490 680Q462 672 458 634', 'M490 672Q520 664 524 626', 'M458 650Q442 640 446 616', 'M524 644Q544 634 540 610']
    .map((d) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="22" stroke-linecap="round"/>`).join('') +
    ['M490 712V640', 'M490 680Q462 672 458 634', 'M490 672Q520 664 524 626', 'M458 650Q442 640 446 616', 'M524 644Q544 634 540 610']
      .map((d) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round"/>`).join('');
}

function weed(d) {
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="20" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#3fb56a" stroke-width="12" stroke-linecap="round"/>`;
}

function crab(x, y) {
  return line(`M${x - 22} ${y + 6}L${x - 34} ${y + 14}M${x + 22} ${y + 6}L${x + 34} ${y + 14}`, 4) +
    disc(x - 32, y - 12, 9, '#ff5b5b', 3) + disc(x + 32, y - 12, 9, '#ff5b5b', 3) + oval(x, y, 24, 16, '#ff5b5b') +
    disc(x - 8, y - 18, 5, '#fff', 2.5) + disc(x + 8, y - 18, 5, '#fff', 2.5);
}

function diver(v) {
  const { x, y } = DIVER;
  const head = diverHead;
  const goggle = pick(v, 'goggles', '#ff8a3d', '#4fb3ff');
  return box(x - 54, y - 126, 34, 76, pick(v, 'tank', '#ffd23f', '#ff5b8a'), 12) +
    person({ ...DIVER, top: '#7fd0f0', bottom: pick(v, 'trunks', '#ff5b5b', '#5cc46e') }) +
    shape(`M${x - 34} ${y + 2}L${x - 8} ${y + 2}L${x - 2} ${y + 26}L${x - 40} ${y + 26}Z`, '#ffd23f', 3) +
    shape(`M${x + 8} ${y + 2}L${x + 34} ${y + 2}L${x + 40} ${y + 26}L${x + 2} ${y + 26}Z`, '#ffd23f', 3) +
    box(head.x - 34, head.y - 14, 68, 26, goggle, 12) +
    `<ellipse cx="${head.x - 15}" cy="${head.y - 1}" rx="13" ry="10" fill="#bfe9ff" stroke="${INK}" stroke-width="3"/><ellipse cx="${head.x + 15}" cy="${head.y - 1}" rx="13" ry="10" fill="#bfe9ff" stroke="${INK}" stroke-width="3"/>` +
    `<circle cx="${head.x - 15}" cy="${head.y - 1}" r="3.5" fill="${INK}"/><circle cx="${head.x + 15}" cy="${head.y - 1}" r="3.5" fill="${INK}"/>`;
}

function draw(v) {
  return (
    water(v) +
    bubbles(v) +
    jelly(v) +
    fish(490, 170, 1.1, '#ffd23f', { dir: -1, stripe: pick(v, 'fish1', '#3d4f8f', '#ff5b5b'), fin: '#ff8a3d' }) +
    fish(90, 310, 1.15, pick(v, 'fish2', '#ff6b6b', '#4fe0c0'), { fin: '#ffb627' }) +
    pick(v, 'fish3', fish(520, 320, 0.8, '#7fe0a0', { dir: -1, fin: '#3c9d5d' }), '') +
    fish(150, 440, 0.6, '#ffa8d0', { fin: '#ff5b8a' }) +
    diver(v) +
    turtle(v) +
    octopus(v) +
    pick(v, 'seaweed', weed('M40 740Q16 710 40 680Q62 650 40 620'), '') +
    weed('M570 720Q550 690 570 660Q590 630 570 600') + weed('M220 730Q204 708 220 686') +
    chest(v) +
    coral(v) +
    star(180, 752, 24, pick(v, 'starfish', '#ff8a3d', '#ff5b8a')) +
    pick(v, 'crab', crab(420, 760), '') +
    shape('M522 776Q552 716 582 776Z', '#ffc2d4') +
    pick(v, 'shell', disc(552, 760, 11, '#fff', 3), '')
  );
}

export default { id: 'undersea', title: '바닷속', diffs, draw };
