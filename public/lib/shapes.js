// 장면에 들어가는 물체들. 물체는 데이터({ kind, x, y, s, flip, color, color2, parts })이고,
// 그리기는 여기서 SVG 문자열로 한다. 브라우저와 Node(테스트) 양쪽에서 그대로 import 된다.
//
// 모든 물체는 (0,0) 근처가 시각적 중심이 되도록 그리고, R 은 그 중심에서 물체를 덮는 반지름이다.
// 틀린 곳 판정 원과 배치 간격이 R 을 기준으로 정해진다.
//
// 종류별 정의:
//   R       덮는 반지름 (scale 1 기준)
//   zone    'sky' | 'ground' — 배치되는 영역
//   asym    좌우가 달라 '뒤집기'가 눈에 보이는지
//   colors  주 색 후보. '색 바꾸기'는 이 중 충분히 다른 색으로만 바꾼다
//   color2  보조 색 후보 (바뀌지 않음)
//   parts   { 이름: [초기값(rng), 바꾸기(값)] } — '부분 바꾸기' 대상

const INK = '#3b2f2f';
const LINE = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

const on = () => true;
const toggle = (v) => !v;

// 겹친 원으로 만든 덩어리(나무 잎, 구름)는 원마다 테두리를 그리면 안쪽에 선이 남는다.
// 테두리 있는 원을 먼저 깔고, 같은 원을 테두리 없이 한 번 더 덮어 바깥선만 남긴다.
function blob(circles, fill) {
  const outline = circles.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${LINE}/>`);
  const cover = circles.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r - 1.5}" fill="${fill}"/>`);
  return outline.join('') + cover.join('');
}

const APPLE_AT = [[-24, -4], [16, -30], [2, 2], [30, 6], [-8, -42]];

export const KINDS = {
  house: {
    R: 78, zone: 'ground', asym: true,
    colors: ['#f6d365', '#f4a6a6', '#a8d8ea', '#c3e6a8', '#fff3d6', '#d7b9f0'],
    color2: ['#d9534f', '#5b7bd5', '#7a5236', '#3c9d5d'],
    parts: { window: [on, toggle], door: [on, toggle], chimney: [on, toggle] },
    draw: (o) =>
      (o.parts.chimney ? `<rect x="22" y="-60" width="16" height="34" fill="${o.color2}" ${LINE}/>` : '') +
      `<rect x="-50" y="-10" width="100" height="70" fill="${o.color}" ${LINE}/>` +
      `<polygon points="-62,-8 0,-64 62,-8" fill="${o.color2}" ${LINE}/>` +
      (o.parts.door
        ? `<rect x="-36" y="18" width="26" height="42" rx="3" fill="#9c6b3e" ${LINE}/>` +
          `<circle cx="-15" cy="40" r="2.5" fill="${INK}"/>`
        : '') +
      (o.parts.window
        ? `<rect x="6" y="6" width="32" height="28" fill="#bfe6ff" ${LINE}/>` +
          `<path d="M22 6V34M6 20H38" stroke="${INK}" stroke-width="2"/>`
        : ''),
  },

  tree: {
    R: 68, zone: 'ground', asym: true,
    colors: ['#4caf50', '#f0a030', '#c0392b'],
    color2: ['#8b5a2b'],
    // 사과 개수. 하나가 없어지는 것이 가장 '틀린그림'다운 차이다.
    parts: { apples: [(rng) => rng.int(2, 5), (n) => (n > 1 ? n - 1 : 3)] },
    draw: (o) =>
      `<rect x="-10" y="10" width="20" height="56" fill="${o.color2}" ${LINE}/>` +
      blob([[-26, 0, 28], [26, 0, 28], [0, -24, 38]], o.color) +
      APPLE_AT.slice(0, o.parts.apples)
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#e53935" ${LINE}/>`)
        .join(''),
  },

  sun: {
    R: 50, zone: 'sky', asym: false,
    colors: ['#ffd23f', '#ff6b35'],
    color2: ['#ffd23f'],
    parts: { face: [on, toggle] },
    draw: (o) =>
      Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        const c = Math.cos(a), s = Math.sin(a);
        return `<path d="M${r1(c * 36)} ${r1(s * 36)}L${r1(c * 48)} ${r1(s * 48)}" stroke="${o.color}" stroke-width="6" stroke-linecap="round"/>`;
      }).join('') +
      `<circle r="30" fill="${o.color}" ${LINE}/>` +
      (o.parts.face
        ? `<circle cx="-10" cy="-6" r="3" fill="${INK}"/><circle cx="10" cy="-6" r="3" fill="${INK}"/>` +
          `<path d="M-11 7Q0 17 11 7" fill="none" ${LINE}/>`
        : ''),
  },

  cloud: {
    R: 52, zone: 'sky', asym: true,
    colors: ['#ffffff', '#9fb3c8'],
    color2: ['#ffffff'],
    parts: {},
    draw: (o) => blob([[-28, 6, 20], [0, -6, 28], [26, 4, 22], [6, 14, 18]], o.color),
  },

  flower: {
    R: 40, zone: 'ground', asym: true,
    colors: ['#ff6fa8', '#ffd23f', '#7e57c2', '#ff7043', '#42a5f5'],
    color2: ['#ffd23f', '#8d6e63'],
    parts: { leaf: [on, toggle] },
    draw: (o) =>
      `<path d="M0 -14V32" stroke="#3c8d40" stroke-width="4" stroke-linecap="round"/>` +
      (o.parts.leaf
        ? `<ellipse cx="10" cy="16" rx="11" ry="5" transform="rotate(-30 10 16)" fill="#5cb85c" ${LINE}/>`
        : '') +
      Array.from({ length: 5 }, (_, i) => {
        const a = ((i * 72 - 90) * Math.PI) / 180;
        return `<circle cx="${r1(Math.cos(a) * 13)}" cy="${r1(-14 + Math.sin(a) * 13)}" r="10" fill="${o.color}" ${LINE}/>`;
      }).join('') +
      `<circle cy="-14" r="8" fill="${o.color2}" ${LINE}/>`,
  },

  cat: {
    R: 50, zone: 'ground', asym: true,
    colors: ['#f4a340', '#9e9e9e', '#ffffff', '#555555'],
    color2: ['#ff9eb5'],
    parts: { tail: [on, toggle], collar: [(rng) => rng() < 0.5, toggle] },
    draw: (o) =>
      (o.parts.tail
        ? `<path d="M18 30Q48 26 40 -4" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
          `<path d="M18 30Q48 26 40 -4" fill="none" stroke="${o.color}" stroke-width="5" stroke-linecap="round"/>`
        : '') +
      `<ellipse cy="18" rx="24" ry="22" fill="${o.color}" ${LINE}/>` +
      `<polygon points="-17,-26 -13,-46 -2,-34" fill="${o.color}" ${LINE}/>` +
      `<polygon points="17,-26 13,-46 2,-34" fill="${o.color}" ${LINE}/>` +
      `<circle cy="-18" r="18" fill="${o.color}" ${LINE}/>` +
      `<circle cx="-7" cy="-21" r="2.5" fill="${INK}"/><circle cx="7" cy="-21" r="2.5" fill="${INK}"/>` +
      `<polygon points="-3,-14 3,-14 0,-11" fill="${o.color2}" stroke="${INK}" stroke-width="1.5"/>` +
      (o.parts.collar
        ? `<path d="M-14 -2Q0 6 14 -2" fill="none" stroke="#e53935" stroke-width="5" stroke-linecap="round"/>`
        : ''),
  },

  mushroom: {
    R: 45, zone: 'ground', asym: false,
    colors: ['#e53935', '#8e5bd0', '#f0a030'],
    color2: ['#fff3d6'],
    parts: { spots: [on, toggle] },
    draw: (o) =>
      `<rect x="-11" y="0" width="22" height="30" rx="6" fill="${o.color2}" ${LINE}/>` +
      `<path d="M-34 4Q-34 -34 0 -34Q34 -34 34 4Z" fill="${o.color}" ${LINE}/>` +
      (o.parts.spots
        ? `<circle cx="-16" cy="-12" r="6" fill="#fff"/><circle cx="4" cy="-22" r="5" fill="#fff"/>` +
          `<circle cx="18" cy="-6" r="6" fill="#fff"/>`
        : ''),
  },

  car: {
    R: 60, zone: 'ground', asym: true,
    colors: ['#e53935', '#1e88e5', '#fdd835', '#43a047'],
    color2: ['#bfe6ff'],
    parts: { window: [on, toggle], light: [on, toggle] },
    draw: (o) =>
      `<path d="M-30 -10L-18 -32L18 -32L32 -10Z" fill="${o.color}" ${LINE}/>` +
      `<path d="M-22 -12L-14 -27L-3 -27L-3 -12Z" fill="${o.color2}" stroke="${INK}" stroke-width="2"/>` +
      (o.parts.window
        ? `<path d="M3 -12L3 -27L15 -27L24 -12Z" fill="${o.color2}" stroke="${INK}" stroke-width="2"/>`
        : '') +
      `<rect x="-52" y="-12" width="104" height="30" rx="10" fill="${o.color}" ${LINE}/>` +
      (o.parts.light ? `<circle cx="46" cy="-1" r="5" fill="#ffe066" stroke="${INK}" stroke-width="2"/>` : '') +
      `<circle cx="-30" cy="20" r="12" fill="${INK}"/><circle cx="-30" cy="20" r="5" fill="#ccc"/>` +
      `<circle cx="30" cy="20" r="12" fill="${INK}"/><circle cx="30" cy="20" r="5" fill="#ccc"/>`,
  },

  balloon: {
    R: 46, zone: 'sky', asym: false,
    colors: ['#e53935', '#1e88e5', '#fdd835', '#8e5bd0', '#43a047'],
    color2: ['#ffffff'],
    parts: {},
    draw: (o) =>
      `<path d="M0 20Q-8 30 0 38Q8 46 0 54" fill="none" stroke="${INK}" stroke-width="2"/>` +
      `<polygon points="-5,20 5,20 0,13" fill="${o.color}" ${LINE}/>` +
      `<ellipse cy="-14" rx="22" ry="28" fill="${o.color}" ${LINE}/>` +
      `<ellipse cx="-8" cy="-24" rx="5" ry="9" fill="${o.color2}" opacity="0.6"/>`,
  },

  bird: {
    R: 35, zone: 'sky', asym: true,
    colors: ['#42a5f5', '#e53935', '#fdd835', '#8e5bd0'],
    color2: ['#ff9800'],
    parts: {},
    draw: (o) =>
      `<polygon points="-18,-2 -34,-12 -32,8" fill="${o.color}" ${LINE}/>` +
      `<ellipse rx="22" ry="15" fill="${o.color}" ${LINE}/>` +
      `<path d="M-10 -2Q0 -22 10 -2Z" fill="${o.color}" ${LINE}/>` +
      `<polygon points="20,-4 32,0 20,4" fill="${o.color2}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` +
      `<circle cx="12" cy="-5" r="2.5" fill="${INK}"/>`,
  },

  butterfly: {
    R: 32, zone: 'ground', asym: false,
    colors: ['#ff6fa8', '#42a5f5', '#fdd835', '#ff7043'],
    color2: ['#ffffff'],
    parts: { spots: [on, toggle] },
    draw: (o) =>
      `<ellipse cx="-14" cy="-8" rx="14" ry="12" fill="${o.color}" ${LINE}/>` +
      `<ellipse cx="14" cy="-8" rx="14" ry="12" fill="${o.color}" ${LINE}/>` +
      `<ellipse cx="-11" cy="10" rx="10" ry="9" fill="${o.color}" ${LINE}/>` +
      `<ellipse cx="11" cy="10" rx="10" ry="9" fill="${o.color}" ${LINE}/>` +
      (o.parts.spots
        ? `<circle cx="-14" cy="-8" r="4.5" fill="${o.color2}"/><circle cx="14" cy="-8" r="4.5" fill="${o.color2}"/>`
        : '') +
      `<ellipse rx="4" ry="18" fill="${INK}"/>` +
      `<path d="M-2 -16Q-6 -26 -10 -28M2 -16Q6 -26 10 -28" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`,
  },
};

function r1(n) {
  return Math.round(n * 10) / 10;
}

export function radius(o) {
  return KINDS[o.kind].R * o.s;
}

// 물체 하나를 새로 만든다. 위치·크기는 부르는 쪽이 정한다.
export function createObject(kind, rng, { id, x, y, s }) {
  const k = KINDS[kind];
  const parts = {};
  for (const [name, [init]] of Object.entries(k.parts)) parts[name] = init(rng);
  return {
    id, kind, x, y, s,
    flip: k.asym && rng() < 0.5 ? -1 : 1,
    color: rng.pick(k.colors),
    color2: rng.pick(k.color2),
    parts,
  };
}

export function drawObject(o) {
  return (
    `<g data-id="${o.id}" transform="translate(${r1(o.x)} ${r1(o.y)}) scale(${r1(o.s * o.flip * 100) / 100} ${r1(o.s * 100) / 100})">` +
    KINDS[o.kind].draw(o) +
    '</g>'
  );
}

// 두 색이 아이 눈에도 확실히 다르게 보이는지. RGB 거리로 충분하다.
export function colorDistance(a, b) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

export const MIN_COLOR_DISTANCE = 100;

export function alternativeColors(o) {
  return KINDS[o.kind].colors.filter((c) => colorDistance(c, o.color) >= MIN_COLOR_DISTANCE);
}
