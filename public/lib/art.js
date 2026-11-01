// 장면 일러스트에 쓰는 공용 그리기 도구. 굵은 외곽선 + 단색 면 + 볼터치의 플랫 일러스트 스타일.
// 모든 함수는 SVG 문자열을 돌려준다. 브라우저와 Node(테스트) 양쪽에서 그대로 import 된다.

export const W = 800;
export const H = 600;
export const INK = '#26213a';
export const SKIN = '#ffd8c2';
export const BLUSH = '#ff8a8a';

// 외곽선 속성
export const OL = (w = 4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// 틀린 곳 스위치: 오른쪽 그림에서 이 차이가 켜져 있으면 changed, 아니면 normal.
export const pick = (v, id, normal, changed) => (v.has(id) ? changed : normal);

export const r1 = (n) => Math.round(n * 10) / 10;

// 겹친 원 덩어리(나무 잎, 구름, 곱슬머리). 원마다 테두리를 그리면 안쪽에 선이 남으므로
// 테두리 있는 원을 깔고 같은 원을 테두리 없이 덮어 바깥선만 남긴다.
export function blob(circles, fill, w = 4) {
  return (
    circles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${OL(w)}/>`).join('') +
    circles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r - w / 2}" fill="${fill}"/>`).join('')
  );
}

// 굵은 선에 외곽선 두르기 (팔, 줄기, 손잡이 등)
export function tube(d, color, width, w = 4) {
  return (
    `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${width + w * 2}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`
  );
}

export function heart(x, y, size, color, w = 3) {
  const k = size / 16;
  return (
    `<path transform="translate(${x} ${y}) scale(${r1(k * 100) / 100})" ` +
    `d="M0 9C-15 -1 -15 -13 -7 -15C-3 -16 0 -13 0 -11C0 -13 3 -16 7 -15C15 -13 15 -1 0 9Z" ` +
    `fill="${color}" stroke="${INK}" stroke-width="${r1(w / k)}" stroke-linejoin="round"/>`
  );
}

export function sparkle(x, y, size, color = '#fff') {
  const s = size;
  return `<path d="M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z" fill="${color}"/>`;
}

// 선물상자. (x, y) 는 바닥 가운데.
export function gift(x, y, w, h, box, ribbon) {
  const l = x - w / 2;
  const top = y - h;
  return (
    `<rect x="${l}" y="${top + 10}" width="${w}" height="${h - 10}" fill="${box}" ${OL()}/>` +
    `<rect x="${l - 5}" y="${top}" width="${w + 10}" height="14" rx="2" fill="${box}" ${OL()}/>` +
    `<rect x="${x - 6}" y="${top}" width="12" height="${h}" fill="${ribbon}" ${OL(3)}/>` +
    `<path d="M${x} ${top}C${x - 22} ${top - 22} ${x - 26} ${top - 2} ${x} ${top}Z" fill="${ribbon}" ${OL(3)}/>` +
    `<path d="M${x} ${top}C${x + 22} ${top - 22} ${x + 26} ${top - 2} ${x} ${top}Z" fill="${ribbon}" ${OL(3)}/>`
  );
}

// 풍선. (x, y) 는 풍선 가운데, 줄은 (tx, ty) 까지.
export function balloon(x, y, color, tx, ty) {
  return (
    `<path d="M${x} ${y + 34}Q${x - 10} ${(y + 34 + ty) / 2} ${tx} ${ty}" fill="none" stroke="${INK}" stroke-width="2.5"/>` +
    `<path d="M${x - 5} ${y + 36}L${x + 5} ${y + 36}L${x} ${y + 28}Z" fill="${color}" ${OL(3)}/>` +
    `<ellipse cx="${x}" cy="${y}" rx="26" ry="31" fill="${color}" ${OL()}/>` +
    `<ellipse cx="${x - 9}" cy="${y - 12}" rx="5" ry="9" fill="#fff" opacity="0.55"/>`
  );
}

// 고양이 (앉은 모습). (x, y) 는 바닥 가운데.
export function cat(x, y, s, color, { tail = true, collar = null } = {}) {
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    (tail ? tube('M18 -12Q52 -14 44 -48', color, 8) : '') +
    `<ellipse cx="0" cy="-26" rx="26" ry="26" fill="${color}" ${OL()}/>` +
    `<path d="M-20 -66L-15 -90L-3 -76Z" fill="${color}" ${OL()}/>` +
    `<path d="M20 -66L15 -90L3 -76Z" fill="${color}" ${OL()}/>` +
    `<circle cx="0" cy="-62" r="21" fill="${color}" ${OL()}/>` +
    `<circle cx="-8" cy="-64" r="3" fill="${INK}"/><circle cx="8" cy="-64" r="3" fill="${INK}"/>` +
    `<ellipse cx="-14" cy="-56" rx="4" ry="2.5" fill="${BLUSH}" opacity="0.8"/><ellipse cx="14" cy="-56" rx="4" ry="2.5" fill="${BLUSH}" opacity="0.8"/>` +
    `<path d="M-4 -57Q0 -53 4 -57" fill="none" ${OL(2.5)}/>` +
    `<path d="M-28 -60L-16 -58M-28 -54L-16 -55M28 -60L16 -58M28 -54L16 -55" ${OL(1.5)}/>` +
    (collar ? `<path d="M-15 -44Q0 -36 15 -44" fill="none" stroke="${collar}" stroke-width="6" stroke-linecap="round"/>` : '') +
    `<ellipse cx="-11" cy="-2" rx="9" ry="5" fill="${color}" ${OL(3)}/><ellipse cx="11" cy="-2" rx="9" ry="5" fill="${color}" ${OL(3)}/>` +
    `</g>`
  );
}

// 강아지 (앉은 모습). (x, y) 는 바닥 가운데.
export function dog(x, y, s, color, { patch = '#8a5a3c', tongue = true } = {}) {
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    tube('M20 -16Q44 -24 40 -44', color, 8) +
    `<ellipse cx="0" cy="-28" rx="28" ry="28" fill="${color}" ${OL()}/>` +
    `<circle cx="0" cy="-70" r="25" fill="${color}" ${OL()}/>` +
    (patch ? `<ellipse cx="10" cy="-74" rx="10" ry="9" fill="${patch}"/>` : '') +
    `<path d="M-22 -86Q-40 -80 -34 -54Q-26 -60 -20 -72Z" fill="#8a5a3c" ${OL()}/>` +
    `<path d="M22 -86Q40 -80 34 -54Q26 -60 20 -72Z" fill="#8a5a3c" ${OL()}/>` +
    `<circle cx="-9" cy="-74" r="3.2" fill="${INK}"/><circle cx="10" cy="-74" r="3.2" fill="${INK}"/>` +
    `<ellipse cx="0" cy="-62" rx="6" ry="4.5" fill="${INK}"/>` +
    (tongue ? `<path d="M-4 -54Q0 -44 4 -54Z" fill="#ff7a8a" ${OL(2)}/>` : '') +
    `<ellipse cx="-12" cy="-2" rx="10" ry="6" fill="${color}" ${OL(3)}/><ellipse cx="12" cy="-2" rx="10" ry="6" fill="${color}" ${OL(3)}/>` +
    `</g>`
  );
}

// 화분. (x, y) 는 바닥 가운데.
export function plant(x, y, pot, flower) {
  return (
    `<g transform="translate(${x} ${y})">` +
    tube('M0 -40V-96', '#3c9d5d', 5) +
    `<path d="M0 -60Q-30 -66 -34 -88Q-8 -86 0 -64Z" fill="#5cc46e" ${OL(3)}/>` +
    `<path d="M0 -72Q28 -78 32 -100Q6 -98 0 -76Z" fill="#5cc46e" ${OL(3)}/>` +
    blob([[0, -116, 12], [-14, -104, 12], [14, -104, 12], [-9, -88, 12], [9, -88, 12]].map(([a, b, r]) => [a, b + 4, r]), flower, 3) +
    `<circle cx="0" cy="-98" r="7" fill="#ffd23f" ${OL(3)}/>` +
    `<path d="M-26 -42L26 -42L20 0L-20 0Z" fill="${pot}" ${OL()}/>` +
    `<rect x="-30" y="-50" width="60" height="12" rx="3" fill="${pot}" ${OL()}/>` +
    `</g>`
  );
}

// 벽시계. hour/minute 는 시계 방향 각도(도, 12시 = 0).
export function clock(x, y, r, rim, hour, minute) {
  const hand = (deg, len, w) => {
    const a = (deg * Math.PI) / 180;
    return `<path d="M${x} ${y}L${r1(x + Math.sin(a) * len)} ${r1(y - Math.cos(a) * len)}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const [c, s] = [Math.cos(a), Math.sin(a)];
    return `<path d="M${r1(x + s * r * 0.72)} ${r1(y - c * r * 0.72)}L${r1(x + s * r * 0.82)} ${r1(y - c * r * 0.82)}" stroke="${INK}" stroke-width="${i % 3 ? 2 : 4}" stroke-linecap="round"/>`;
  }).join('');
  return (
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${rim}" ${OL()}/>` +
    `<circle cx="${x}" cy="${y}" r="${r - 7}" fill="#fff" ${OL(3)}/>` +
    ticks + hand(hour, r * 0.42, 5) + hand(minute, r * 0.62, 3.5) +
    `<circle cx="${x}" cy="${y}" r="3.5" fill="${INK}"/>`
  );
}

// ---------- 사람 ----------
//
// (x, y) 는 두 발 사이 바닥. 단위는 s=1 기준 키 약 200.
// arms: [왼팔, 오른팔] 각도(도). 0 = 아래로 내림, 90 = 옆으로 뻗음, 150 = 위로 번쩍, 음수 = 몸 앞쪽으로 모음.

const SHOULDER_X = 27;
const SHOULDER_Y = -118;
const ARM = 56;

function armEnd(side, deg) {
  const a = (deg * Math.PI) / 180;
  return [side * (SHOULDER_X + Math.sin(a) * ARM), SHOULDER_Y + Math.cos(a) * ARM];
}

// 손 위치(장면 좌표). 들고 있는 물건을 손에 맞춰 그릴 때 쓴다. side: -1 왼쪽, 1 오른쪽.
export function handPos(p, side) {
  const [hx, hy] = armEnd(side, p.arms[side < 0 ? 0 : 1]);
  const s = p.s ?? 1;
  return { x: r1(p.x + hx * s), y: r1(p.y + (hy + (p.sit ? SIT_UP : 0)) * s) };
}

// 머리 중심(장면 좌표)과 반지름
export function headPos(p) {
  const s = p.s ?? 1;
  const hs = p.hs ?? 1;
  return { x: p.x, y: r1(p.y + (-124 - 30 * hs + (p.sit ? SIT_UP : 0)) * s), r: r1(32 * hs * s) };
}

// 앉으면 다리가 짧아 보이는 만큼 윗몸이 내려온다
const SIT_UP = 14;

function arm(side, deg, sleeve, skin) {
  const [ex, ey] = armEnd(side, deg);
  const sx = side * SHOULDER_X;
  return (
    tube(`M${sx} ${SHOULDER_Y}L${r1(ex)} ${r1(ey)}`, sleeve, 13) +
    `<circle cx="${r1(ex)}" cy="${r1(ey)}" r="9" fill="${skin}" ${OL(3.5)}/>`
  );
}

function hairBack(style, color) {
  switch (style) {
    case 'bob':
      return `<path d="M-39 14Q-46 -46 0 -44Q46 -46 39 14Q37 28 26 30L-26 30Q-37 28 -39 14Z" fill="${color}" ${OL()}/>`;
    case 'long':
    case 'sunhat':
      return `<path d="M-38 40Q-48 -46 0 -44Q48 -46 38 40Q20 48 0 44Q-20 48 -38 40Z" fill="${color}" ${OL()}/>`;
    case 'pigtails':
      return blob([[-40, -14, 15], [40, -14, 15]], color);
    default:
      return '';
  }
}

function hairFront(style, color, extra) {
  switch (style) {
    case 'short':
      return `<path d="M-33 -2Q-37 -42 0 -42Q37 -42 33 -2Q30 -22 14 -25Q0 -16 -18 -25Q-31 -20 -33 -2Z" fill="${color}" ${OL()}/>`;
    case 'spiky':
      return `<path d="M-33 -2Q-38 -30 -26 -38L-24 -50L-12 -42L-4 -54L6 -42L18 -52L22 -38Q37 -30 33 -2Q28 -22 12 -24Q0 -18 -16 -24Q-30 -20 -33 -2Z" fill="${color}" ${OL()}/>`;
    case 'bob':
    case 'long':
    case 'pigtails':
      return `<path d="M-33 2Q-37 -42 0 -42Q37 -42 33 2Q26 -16 10 -20Q-2 -12 -18 -20Q-29 -14 -33 2Z" fill="${color}" ${OL()}/>`;
    case 'curly':
      return blob([[-28, -12, 12], [-20, -28, 13], [-4, -36, 14], [14, -33, 13], [27, -18, 12]], color);
    case 'bun':
      return (
        `<circle cx="0" cy="-44" r="13" fill="${color}" ${OL()}/>` +
        `<path d="M-33 0Q-37 -40 0 -40Q37 -40 33 0Q24 -22 0 -24Q-24 -22 -33 0Z" fill="${color}" ${OL()}/>`
      );
    case 'side':
      return (
        `<path d="M-32 6Q-38 -22 -22 -30Q-26 -12 -25 6Z" fill="${color}" ${OL()}/>` +
        `<path d="M32 6Q38 -22 22 -30Q26 -12 25 6Z" fill="${color}" ${OL()}/>` +
        `<path d="M-10 -31Q0 -38 10 -31" fill="none" ${OL(3)}/>`
      );
    case 'cap':
      return (
        `<path d="M-34 -4Q-35 -44 0 -44Q35 -44 34 -4Z" fill="${extra}" ${OL()}/>` +
        `<path d="M16 -8Q46 -12 54 -2L18 -2Z" fill="${extra}" ${OL()}/>` +
        `<circle cx="0" cy="-44" r="5" fill="${extra}" ${OL(3)}/>`
      );
    case 'sunhat':
      return (
        `<ellipse cx="0" cy="-20" rx="56" ry="14" fill="${extra}" ${OL()}/>` +
        `<path d="M-30 -20Q-32 -54 0 -54Q32 -54 30 -20Z" fill="${extra}" ${OL()}/>` +
        `<path d="M-30 -26Q0 -18 30 -26" fill="none" stroke="#ff7aa8" stroke-width="7"/>`
      );
    case 'chef':
      // extra = 모자 높이(px)
      return (
        `<path d="M-30 -14Q-32 -36 -26 -${30 + extra}Q-40 -${44 + extra} -16 -${50 + extra}Q0 -${66 + extra} 16 -${50 + extra}Q40 -${44 + extra} 26 -${30 + extra}Q32 -36 30 -14Z" fill="#fff" ${OL()}/>` +
        `<rect x="-31" y="-26" width="62" height="16" rx="3" fill="#fff" ${OL()}/>`
      );
    default:
      return '';
  }
}

function face({ mouth = 'open', glasses = false, mustache = null }) {
  let s =
    `<circle cx="-11" cy="-2" r="4" fill="${INK}"/><circle cx="11" cy="-2" r="4" fill="${INK}"/>` +
    `<ellipse cx="-20" cy="9" rx="7.5" ry="4.5" fill="${BLUSH}" opacity="0.8"/>` +
    `<ellipse cx="20" cy="9" rx="7.5" ry="4.5" fill="${BLUSH}" opacity="0.8"/>`;
  if (mouth === 'open') s += `<path d="M-10 9Q0 26 10 9Z" fill="#d9473f" ${OL(3)}/>`;
  else if (mouth === 'o') s += `<ellipse cx="0" cy="14" rx="5" ry="6" fill="#d9473f" ${OL(3)}/>`;
  else s += `<path d="M-9 10Q0 19 9 10" fill="none" ${OL(3)}/>`;
  if (mustache) s += `<path d="M-15 8Q-7 1 0 6Q7 1 15 8Q8 13 0 10Q-8 13 -15 8Z" fill="${mustache}" ${OL(2.5)}/>`;
  if (glasses) {
    s +=
      `<circle cx="-12" cy="-2" r="10" fill="#fff" fill-opacity="0.25" ${OL(3)}/>` +
      `<circle cx="12" cy="-2" r="10" fill="#fff" fill-opacity="0.25" ${OL(3)}/>` +
      `<path d="M-2 -3L2 -3" ${OL(3)}/>`;
  }
  return s;
}

function bow(color, x = 24, y = -32) {
  return (
    `<path d="M${x} ${y}L${x - 14} ${y - 10}L${x - 14} ${y + 10}Z" fill="${color}" ${OL(3)}/>` +
    `<path d="M${x} ${y}L${x + 14} ${y - 10}L${x + 14} ${y + 10}Z" fill="${color}" ${OL(3)}/>` +
    `<circle cx="${x}" cy="${y}" r="5" fill="${color}" ${OL(3)}/>`
  );
}

// p: { x, y, s, hs(머리 비율), skin, hair, hairStyle, hat(모자 색/높이), top, bottom, bottomType('pants'|'skirt'|'shorts'),
//      shoes, arms:[왼,오], mouth, glasses, mustache(색), bow(색), bows(양쪽 리본 색), stripes(윗옷 줄무늬 색), collar(목걸이 색),
//      apron(앞치마 색), sit(앉은 자세), legs(false 면 하체 생략 — 탁자 뒤에 선 사람) }
export function person(p) {
  const {
    x, y, s = 1, hs = 1, skin = SKIN, hair = INK, hairStyle = 'short', hat, top = '#fff', bottom = '#3d4f8f',
    bottomType = 'pants', shoes = '#fff', arms = [10, 10], mouth = 'open', glasses = false, mustache = null,
    bow: bowColor = null, bows = null, stripes = null, collar = null, apron = null, sit = false, legs = true,
  } = p;
  const front = (deg) => deg < 20; // 몸 앞으로 오는 팔은 몸통 다음에 그린다
  let g = `<g transform="translate(${x} ${y}) scale(${s})">`;

  // 하체
  if (legs && sit) {
    const shin = bottomType === 'pants' ? bottom : skin;
    g +=
      `<rect x="-27" y="-42" width="18" height="36" fill="${shin}" ${OL(3)}/><rect x="9" y="-42" width="18" height="36" fill="${shin}" ${OL(3)}/>` +
      `<rect x="-36" y="-60" width="72" height="24" rx="9" fill="${bottom}" ${OL()}/>` +
      `<ellipse cx="-18" cy="-5" rx="15" ry="7.5" fill="${shoes}" ${OL()}/><ellipse cx="18" cy="-5" rx="15" ry="7.5" fill="${shoes}" ${OL()}/>`;
  } else if (legs) {
    if (bottomType === 'skirt') {
      g +=
        `<rect x="-19" y="-32" width="11" height="28" fill="${skin}" ${OL(3)}/><rect x="8" y="-32" width="11" height="28" fill="${skin}" ${OL(3)}/>` +
        `<path d="M-30 -68L30 -68L42 -28Q0 -22 -42 -28Z" fill="${bottom}" ${OL()}/>`;
    } else if (bottomType === 'shorts') {
      g +=
        `<rect x="-22" y="-40" width="14" height="36" fill="${skin}" ${OL(3)}/><rect x="8" y="-40" width="14" height="36" fill="${skin}" ${OL(3)}/>` +
        `<path d="M-31 -68L31 -68L33 -36L4 -36L0 -48L-4 -36L-33 -36Z" fill="${bottom}" ${OL()}/>`;
    } else {
      g += `<path d="M-31 -68L31 -68L29 -8L5 -8L1 -44L-1 -44L-5 -8L-29 -8Z" fill="${bottom}" ${OL()}/>`;
    }
    g += `<ellipse cx="-17" cy="-5" rx="15" ry="7.5" fill="${shoes}" ${OL()}/><ellipse cx="17" cy="-5" rx="15" ry="7.5" fill="${shoes}" ${OL()}/>`;
  }
  if (sit) g += `<g transform="translate(0 ${SIT_UP})">`;

  // 뒤로 가는 팔
  if (!front(arms[0])) g += arm(-1, arms[0], top, skin);
  if (!front(arms[1])) g += arm(1, arms[1], top, skin);

  // 몸통
  g += `<path d="M-30 -122Q-30 -132 -20 -132L20 -132Q30 -132 30 -122L33 -64L-33 -64Z" fill="${top}" ${OL()}/>`;
  if (stripes) {
    g += [-112, -96, -80].map((sy) => `<path d="M-31 ${sy}L31 ${sy}" stroke="${stripes}" stroke-width="7"/>`).join('');
    g += `<path d="M-30 -122Q-30 -132 -20 -132L20 -132Q30 -132 30 -122L33 -64L-33 -64Z" fill="none" ${OL()}/>`;
  }
  if (apron) {
    g += `<path d="M-20 -116L20 -116L24 -60L-24 -60Z" fill="${apron}" ${OL(3)}/>` +
      `<rect x="-10" y="-90" width="20" height="14" rx="3" fill="none" ${OL(2.5)}/>`;
  }
  g += `<path d="M-11 -132L0 -118L11 -132Z" fill="${skin}" ${OL(3)}/>`;
  if (collar) {
    g += [-14, -7, 0, 7, 14].map((cx, i) => `<circle cx="${cx}" cy="${-128 + Math.abs(i - 2) * -2 + 6}" r="3.6" fill="${collar}" ${OL(1.5)}/>`).join('');
  }

  // 앞으로 오는 팔
  if (front(arms[0])) g += arm(-1, arms[0], top, skin);
  if (front(arms[1])) g += arm(1, arms[1], top, skin);

  // 머리
  g += `<g transform="translate(0 ${-124 - 30 * hs}) scale(${hs})">`;
  g += hairBack(hairStyle, hair);
  g += `<circle cx="-33" cy="2" r="7" fill="${skin}" ${OL(3)}/><circle cx="33" cy="2" r="7" fill="${skin}" ${OL(3)}/>`;
  g += `<circle r="32" fill="${skin}" ${OL()}/>`;
  g += face({ mouth, glasses, mustache });
  g += hairFront(hairStyle, hair, hat);
  if (bows) g += bow(bows, -36, -26) + bow(bows, 36, -26);
  if (bowColor) g += bow(bowColor);
  g += '</g>';
  if (sit) g += '</g>';
  return g + '</g>';
}
