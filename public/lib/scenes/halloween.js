// 장면 22: 할로윈 밤 — 마녀 모자를 쓴 아이, 호박 등, 귀여운 유령과 박쥐.

import { W, H, INK, pick, box, disc, oval, shape, line, star, person, headPos, handPos } from '../art.js';

const WITCH = { x: 150, y: 790, s: 0.9, hs: 1.25, hairStyle: 'long', hair: '#ff8a3d', top: '#7b6cf6', bottom: '#3d3b52', bottomType: 'skirt', arms: [40, -20], shoes: '#3d3b52' };
const DEVIL = { x: 330, y: 790, s: 0.9, hs: 1.25, hairStyle: 'spiky', hair: '#3a2630', top: '#ff5b5b', bottom: '#3d3b52', bottomType: 'shorts', arms: [10, 50], shoes: '#3d3b52' };
const witchHead = headPos(WITCH);
const devilHead = headPos(DEVIL);
const broomHand = handPos(WITCH, -1);
const bucketHand = handPos(DEVIL, 1);

const diffs = [
  { id: 'moon', label: '달 색', cx: 470, cy: 110, r: 60 },
  { id: 'bat', label: '박쥐', cx: 350, cy: 80, r: 30 },
  { id: 'batColor', label: '작은 박쥐 색', cx: 560, cy: 220, r: 30 },
  { id: 'ghost', label: '유령 표정', cx: 380, cy: 260, r: 40 },
  { id: 'web', label: '거미', cx: 60, cy: 104, r: 26 },
  { id: 'windowLight', label: '창문 불빛', cx: 90, cy: 360, r: 30 },
  { id: 'door', label: '문 색', cx: 210, cy: 488, r: 34 },
  { id: 'star', label: '노란 별', cx: 230, cy: 70, r: 24 },
  { id: 'pumpkinFace', label: '큰 호박 표정', cx: 460, cy: 640, r: 40 },
  { id: 'pumpkinStem', label: '큰 호박 꼭지 색', cx: 460, cy: 590, r: 20 },
  { id: 'smallPumpkin', label: '작은 호박', cx: 560, cy: 674, r: 28 },
  { id: 'hatBand', label: '마녀 모자 띠 색', cx: witchHead.x, cy: witchHead.y - 46, r: 30 },
  { id: 'broom', label: '빗자루', cx: broomHand.x - 10, cy: broomHand.y + 40, r: 30 },
  { id: 'horns', label: '머리띠 뿔 색', cx: devilHead.x, cy: devilHead.y - 46, r: 34 },
  { id: 'bucket', label: '사탕 바구니 색', cx: bucketHand.x, cy: bucketHand.y + 20, r: 28 },
  { id: 'catEyes', label: '고양이 눈 색', cx: 540, cy: 752, r: 24 },
  { id: 'candy', label: '사탕 하나', cx: 250, cy: 770, r: 22 },
];

function sky(v) {
  const bat = (x, y, s, color) => `<g transform="translate(${x} ${y}) scale(${s})">` +
    shape('M0 0Q-20 -18 -44 -8Q-34 -2 -36 8Q-24 2 -18 10Q-10 2 0 8Q10 2 18 10Q24 2 36 8Q34 -2 44 -8Q20 -18 0 0Z', color, 3) +
    disc(0, -4, 10, color, 3) + `<circle cx="-4" cy="-6" r="2.5" fill="#ffd23f"/><circle cx="4" cy="-6" r="2.5" fill="#ffd23f"/></g>`;
  return (
    `<defs><linearGradient id="hw-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1f4f"/><stop offset="1" stop-color="#8a4f9c"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#hw-sky)"/>` +
    disc(470, 110, 56, pick(v, 'moon', '#ffd98a', '#fff')) +
    pick(v, 'star', star(230, 70, 14, '#ffd23f'), '') + star(130, 200, 9, '#fff') + star(560, 300, 9, '#fff') +
    pick(v, 'bat', bat(350, 80, 1, '#3d3b52'), '') + bat(560, 220, 0.8, pick(v, 'batColor', '#3d3b52', '#ff8a3d')) +
    // 거미줄
    `<path d="M0 0L90 90M0 60Q36 50 60 60M0 30Q24 24 30 30M30 0Q34 30 30 30M60 0Q50 40 60 60" fill="none" stroke="#fff" stroke-width="2.5" opacity="0.8"/>` +
    pick(v, 'web', line('M60 60V96', 2) + disc(60, 104, 9, '#3d3b52', 2.5) + `<path d="M50 98L44 92M50 104L42 104M50 110L44 116M70 98L76 92M70 104L78 104M70 110L76 116" stroke="${INK}" stroke-width="2"/>`, '') +
    `<rect y="560" width="${W}" height="${H - 560}" fill="#3a6b4a"/>` + shape(`M0 560Q150 540 300 556T${W} 552V570H0Z`, '#3a6b4a')
  );
}

function house(v) {
  const win = (x, y, c) => box(x, y, 50, 56, c, 3, 3) + line(`M${x + 25} ${y}V${y + 56}M${x} ${y + 28}H${x + 50}`, 3);
  return box(210, 200, 34, 70, '#3d3b52') +
    box(30, 290, 260, 270, '#5a4a7e') + shape('M14 300L160 190L306 300Z', '#3d3b52') +
    win(64, 332, pick(v, 'windowLight', '#ffe27a', '#3d3b52')) + win(180, 332, '#ffe27a') +
    shape('M176 560V470Q210 440 244 470V560Z', pick(v, 'door', '#ff8a3d', '#5cc46e')) + disc(232, 516, 4, '#ffd23f', 2);
}

function ghost(v) {
  return shape('M340 300Q336 220 380 216Q424 220 420 300L410 290L400 304L390 290L380 304L370 290L360 304L350 290Z', '#fff') +
    `<circle cx="366" cy="252" r="5" fill="${INK}"/><circle cx="394" cy="252" r="5" fill="${INK}"/>` +
    pick(v, 'ghost', `<path d="M370 268Q380 278 390 268" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`, `<ellipse cx="380" cy="272" rx="6" ry="8" fill="${INK}"/>`) +
    `<ellipse cx="356" cy="264" rx="6" ry="4" fill="#ffb3c7"/><ellipse cx="404" cy="264" rx="6" ry="4" fill="#ffb3c7"/>`;
}

function pumpkins(v) {
  const face = pick(v, 'pumpkinFace',
    shape('M436 650Q460 676 484 650Q472 660 460 656Q448 660 436 650Z', '#ffe27a', 3),
    shape('M436 652L446 662L454 652L462 662L470 652L478 662L486 652L484 668H438Z', '#ffe27a', 3));
  return `<path d="M460 600Q458 586 468 580" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M460 600Q458 586 468 580" fill="none" stroke="${pick(v, 'pumpkinStem', '#3c9d5d', '#a7744a')}" stroke-width="5" stroke-linecap="round"/>` +
    oval(460, 640, 62, 46, '#ff8a3d') + `<path d="M440 598Q430 640 440 684M480 598Q490 640 480 684" fill="none" stroke="${INK}" stroke-width="3"/>` +
    shape('M436 620L448 632L436 636Z', '#ffe27a', 3) + shape('M484 620L472 632L484 636Z', '#ffe27a', 3) + face +
    pick(v, 'smallPumpkin', oval(560, 680, 32, 24, '#ffa24a') + `<path d="M560 656V646" stroke="#3c9d5d" stroke-width="5"/>`, '');
}

function witchHat(v, h) {
  const brimY = h.y - h.r * 0.62;
  return oval(h.x, brimY, h.r * 1.5, h.r * 0.32, '#3d3b52') +
    shape(`M${h.x - h.r * 0.8} ${brimY - 2}L${h.x + 14} ${h.y - h.r * 2.6}L${h.x + h.r * 0.8} ${brimY - 2}Z`, '#3d3b52') +
    shape(`M${h.x - h.r * 0.72} ${brimY - 6}L${h.x + h.r * 0.72} ${brimY - 6}L${h.x + h.r * 0.62} ${brimY - 22}L${h.x - h.r * 0.6} ${brimY - 22}Z`, pick(v, 'hatBand', '#ff8a3d', '#5cc46e'), 3);
}

function draw(v) {
  return (
    sky(v) +
    house(v) +
    ghost(v) +
    pumpkins(v) +
    pick(v, 'broom', `<path d="M${broomHand.x + 10} ${broomHand.y - 30}L${broomHand.x - 6} ${broomHand.y + 40}" stroke="#a7744a" stroke-width="7" stroke-linecap="round"/>` +
      shape(`M${broomHand.x - 20} ${broomHand.y + 36}L${broomHand.x + 6} ${broomHand.y + 40}L${broomHand.x - 2} ${broomHand.y + 76}L${broomHand.x - 30} ${broomHand.y + 70}Z`, '#f2cb5e', 3), '') +
    person(WITCH) +
    witchHat(v, witchHead) +
    person(DEVIL) +
    (() => {
      const c = pick(v, 'horns', '#ff3b3b', '#ffd23f');
      const h = devilHead;
      return shape(`M${h.x - 22} ${h.y - 34}L${h.x - 28} ${h.y - 60}L${h.x - 8} ${h.y - 40}Z`, c, 3) + shape(`M${h.x + 22} ${h.y - 34}L${h.x + 28} ${h.y - 60}L${h.x + 8} ${h.y - 40}Z`, c, 3);
    })() +
    oval(bucketHand.x, bucketHand.y + 22, 24, 20, pick(v, 'bucket', '#ff8a3d', '#4fb3ff')) + line(`M${bucketHand.x - 20} ${bucketHand.y + 12}Q${bucketHand.x} ${bucketHand.y - 14} ${bucketHand.x + 20} ${bucketHand.y + 12}`, 3) +
    pick(v, 'candy', shape('M240 770L232 762V778ZM260 770L268 762V778Z', '#ff7aa8', 2.5) + oval(250, 770, 11, 8, '#ff7aa8', 2.5), '') +
    // 검은 고양이
    line('M560 790Q600 770 590 730', 5) +
    oval(540, 772, 26, 22, '#3d3b52') + shape('M522 744L524 720L536 734ZM558 744L556 720L544 734Z', '#3d3b52', 3) + disc(540, 748, 19, '#3d3b52') +
    oval(533, 748, 4, 5, pick(v, 'catEyes', '#ffd23f', '#5cc46e'), 0) + oval(547, 748, 4, 5, pick(v, 'catEyes', '#ffd23f', '#5cc46e'), 0)
  );
}

export default { id: 'halloween', title: '할로윈 밤', diffs, draw };
