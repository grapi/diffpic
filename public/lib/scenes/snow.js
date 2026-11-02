// 장면 8: 눈 오는 마을 — 눈사람을 만드는 아이들, 썰매, 굴뚝에서 연기가 나는 집.

import { W, H, INK, pick, box, disc, oval, shape, line, pine, bird, person, headPos } from '../art.js';

const KID = { x: 142, y: 690, s: 0.84, hs: 1.25, hairStyle: 'side', hair: '#3a2630', bottom: '#3d4f8f', arms: [60, 30], shoes: '#7a5236' };
const SLED_KID = { x: 440, y: 716, s: 0.74, hs: 1.25, sit: true, hairStyle: 'pigtails', hair: '#5a3a2a', top: '#7b6cf6', bottom: '#ff5b8a', bottomType: 'skirt', arms: [150, 150], shoes: '#fff' };

const kidHead = headPos(KID);
const sledHead = headPos(SLED_KID);
const MAN = { x: 300, y: 660 };

const diffs = [
  { id: 'smoke', label: '굴뚝 연기', cx: 134, cy: 74, r: 36 },
  { id: 'roofSnow', label: '지붕 고드름', cx: 196, cy: 288, r: 28 },
  { id: 'door', label: '문 색', cx: 118, cy: 390, r: 34 },
  { id: 'wreath', label: '문 위 장식', cx: 118, cy: 330, r: 24 },
  { id: 'window', label: '창문 불빛', cx: 216, cy: 362, r: 30 },
  { id: 'mailbox', label: '우체통 색', cx: 40, cy: 454, r: 28 },
  { id: 'bird', label: '나뭇가지 새 색', cx: 390, cy: 190, r: 30 },
  { id: 'pineStar', label: '트리 꼭대기 별', cx: 500, cy: 144, r: 28 },
  { id: 'pineBall', label: '트리 장식 색', cx: 500, cy: 288, r: 22 },
  { id: 'hat', label: '눈사람 모자 색', cx: MAN.x, cy: MAN.y - 240, r: 40 },
  { id: 'nose', label: '눈사람 코', cx: MAN.x + 16, cy: MAN.y - 182, r: 24 },
  { id: 'scarf', label: '눈사람 목도리 색', cx: MAN.x - 18, cy: MAN.y - 140, r: 26 },
  { id: 'button', label: '눈사람 단추', cx: MAN.x, cy: MAN.y - 78, r: 22 },
  { id: 'armMitten', label: '눈사람 장갑 색', cx: MAN.x + 96, cy: MAN.y - 138, r: 24 },
  { id: 'kidTop', label: '아이 외투 색', cx: KID.x, cy: KID.y - 82, r: 28 },
  { id: 'kidHat', label: '아이 털모자', cx: kidHead.x, cy: kidHead.y - 26, r: 36 },
  { id: 'sled', label: '썰매 색', cx: 440, cy: 736, r: 40 },
  { id: 'sledBow', label: '썰매 아이 머리끈 색', cx: sledHead.x, cy: sledHead.y - 16, r: 44 },
  { id: 'snowball', label: '눈덩이 더미', cx: 82, cy: 752, r: 30 },
];

function background(v) {
  const flakes = [[30, 40], [230, 30], [330, 90], [430, 50], [560, 90], [270, 170], [40, 200], [340, 300], [580, 240], [420, 400], [20, 300], [510, 420]];
  return (
    `<defs><linearGradient id="sn-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ccbea"/><stop offset="1" stop-color="#e6f3fb"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#sn-sky)"/>` +
    flakes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff"/>`).join('') +
    shape(`M0 340Q150 290 300 340T${W} 330V${H}H0Z`, '#f4fbff') +
    pick(v, 'smoke', `<path d="M130 134Q112 112 132 94Q152 76 134 54Q124 40 136 26" fill="none" stroke="#b5c2d6" stroke-width="10" stroke-linecap="round"/>`, '')
  );
}

function house(v) {
  return (
    box(122, 128, 30, 60, '#a85a48') + box(116, 118, 42, 14, '#fff', 4, 3) +
    box(46, 288, 216, 150, '#ffcf8a') +
    shape('M20 300L154 160L288 300Z', '#c9574f') +
    shape('M20 300L154 160L288 300Q270 284 250 300Q226 278 200 300Q176 280 152 300Q128 280 104 300Q82 280 60 300Q40 284 20 300Z', '#fff') +
    pick(v, 'roofSnow', shape('M180 298L188 324L196 298ZM202 298L210 318L218 298Z', '#bfe9ff', 2.5), '') +
    box(92, 354, 52, 84, pick(v, 'door', '#5cc46e', '#4f7be0'), 6) + disc(134, 400, 4, '#ffd23f', 2) +
    pick(v, 'wreath', `<circle cx="118" cy="330" r="12" fill="none" stroke="${INK}" stroke-width="10"/><circle cx="118" cy="330" r="12" fill="none" stroke="#3c9d5d" stroke-width="6"/><circle cx="118" cy="319" r="4" fill="#ff5b5b"/>`, '') +
    box(186, 332, 60, 60, pick(v, 'window', '#ffe27a', '#6f88a8'), 3) + line('M216 332V392M186 362H246', 4) +
    // 우체통
    `<path d="M40 500V470" stroke="${INK}" stroke-width="8"/>` + shape('M16 472V446Q16 430 40 430Q64 430 64 446V472Z', pick(v, 'mailbox', '#ff5b5b', '#4fb3ff'))
  );
}

function trees(v) {
  const snowy = (x, y, s) => pine(x, y, s, '#3c9d6d');
  return (
    snowy(330, 350, 0.75) + snowy(578, 380, 0.9) + snowy(500, 420, 1.45) +
    pick(v, 'pineStar', shape('M500 112L508 134L532 136L513 150L520 174L500 160L480 174L487 150L468 136L492 134Z', '#ffd23f', 3), '') +
    disc(460, 340, 11, '#ff5b5b', 3) + disc(540, 340, 11, '#4fb3ff', 3) + disc(500, 288, 11, pick(v, 'pineBall', '#ffd23f', '#ff7aa8'), 3) + disc(472, 248, 9, '#7b6cf6', 3) + disc(528, 248, 9, '#ff7aa8', 3) +
    `<path d="M340 214H424" stroke="#7a5236" stroke-width="8" stroke-linecap="round"/>` +
    bird(390, 190, pick(v, 'bird', '#ff5b5b', '#4fb3ff'))
  );
}

function snowman(v) {
  const { x, y } = MAN;
  const hat = pick(v, 'hat', '#3d3b52', '#ff5b5b');
  return (
    line(`M${x - 40} ${y - 130}L${x - 92} ${y - 170}M${x + 40} ${y - 130}L${x + 92} ${y - 138}`, 6) +
    disc(x - 94, y - 172, 12, '#ff8a3d', 3) + disc(x + 96, y - 138, 13, pick(v, 'armMitten', '#ff8a3d', '#5cc46e'), 3) +
    disc(x, y - 56, 66, '#fff') + disc(x, y - 138, 50, '#fff') + disc(x, y - 194, 40, '#fff') +
    box(x - 42, y - 232, 84, 12, hat, 4) + box(x - 28, y - 272, 56, 42, hat, 4) +
    `<circle cx="${x - 13}" cy="${y - 200}" r="5" fill="${INK}"/><circle cx="${x + 13}" cy="${y - 200}" r="5" fill="${INK}"/>` +
    pick(v, 'nose', shape(`M${x - 4} ${y - 190}L${x + 36} ${y - 180}L${x - 4} ${y - 174}Z`, '#ff8a3d', 3), '') +
    line(`M${x - 14} ${y - 170}Q${x} ${y - 162} ${x + 14} ${y - 170}`, 3) +
    (() => {
      const c = pick(v, 'scarf', '#ff5b8a', '#ffd23f');
      return box(x - 44, y - 164, 88, 18, c, 8) + box(x - 30, y - 150, 22, 44, c, 5);
    })() +
    disc(x, y - 120, 6, INK, 0) + pick(v, 'button', disc(x, y - 78, 6, INK, 0), '') + disc(x, y - 36, 6, INK, 0)
  );
}

function sled(v) {
  return (
    box(370, 716, 140, 22, pick(v, 'sled', '#ff5b5b', '#4fb3ff'), 6) +
    line('M386 738V754M494 738V754', 6) +
    `<path d="M354 754H510Q532 754 534 732" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
  );
}

function draw(v) {
  return (
    background(v) +
    house(v) +
    trees(v) +
    snowman(v) +
    person({ ...KID, top: pick(v, 'kidTop', '#ff8a3d', '#4fb3ff'), hairStyle: pick(v, 'kidHat', 'cap', 'side'), hat: '#ff5b5b', hair: '#3a2630' }) +
    person({ ...SLED_KID, bows: pick(v, 'sledBow', '#ffd23f', '#4fb3ff') }) +
    sled(v) +
    pick(v, 'snowball', disc(60, 768, 18, '#fff') + disc(102, 768, 18, '#fff') + disc(82, 738, 18, '#fff'), '') +
    disc(214, 770, 16, '#fff')
  );
}

export default { id: 'snow', title: '눈 오는 마을', diffs, draw };
