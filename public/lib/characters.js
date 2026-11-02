// 고를 수 있는 캐릭터. 모습만 다르고 규칙은 같다. viewBox 0 0 120 120 안에 그린다.
// mood: 'idle' 평소, 'happy' 맞혔을 때, 'sad' 틀렸을 때.

import { INK, BLUSH, OL } from './art.js';

function eyes(mood, y = 60, gap = 16, color = INK) {
  const line = `fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"`;
  if (mood === 'happy') {
    return `<path d="M${60 - gap - 7} ${y + 2}Q${60 - gap} ${y - 8} ${60 - gap + 7} ${y + 2}M${60 + gap - 7} ${y + 2}Q${60 + gap} ${y - 8} ${60 + gap + 7} ${y + 2}" ${line}/>`;
  }
  const dots = `<circle cx="${60 - gap}" cy="${y}" r="5" fill="${color}"/><circle cx="${60 + gap}" cy="${y}" r="5" fill="${color}"/>`;
  if (mood === 'sad') {
    return dots + `<path d="M${60 - gap - 8} ${y - 8}L${60 - gap + 5} ${y - 13}M${60 + gap + 8} ${y - 8}L${60 + gap - 5} ${y - 13}" ${line}/>`;
  }
  return dots;
}

function mouth(mood, y = 78) {
  if (mood === 'happy') return `<path d="M50 ${y - 3}Q60 ${y + 16} 70 ${y - 3}Z" fill="#d9473f" ${OL(3)}/>`;
  if (mood === 'sad') return `<path d="M51 ${y + 5}Q60 ${y - 6} 69 ${y + 5}" fill="none" ${OL(3)}/>`;
  return `<path d="M51 ${y}Q60 ${y + 9} 69 ${y}" fill="none" ${OL(3)}/>`;
}

const cheeks = (y = 72) =>
  `<ellipse cx="33" cy="${y}" rx="8" ry="5" fill="${BLUSH}" opacity="0.8"/><ellipse cx="87" cy="${y}" rx="8" ry="5" fill="${BLUSH}" opacity="0.8"/>`;
const head = (color) => `<circle cx="60" cy="66" r="38" fill="${color}" ${OL()}/>`;

function rabbit(mood) {
  const ear = (x, tilt) =>
    `<g transform="rotate(${tilt} ${x} 40)"><ellipse cx="${x}" cy="20" rx="11" ry="24" fill="#fff" ${OL()}/><ellipse cx="${x}" cy="22" rx="5" ry="15" fill="#ffb3c7"/></g>`;
  return ear(42, -8) + ear(78, 8) + head('#fff') + cheeks() + eyes(mood) + mouth(mood);
}

function bear(mood) {
  const ear = (x) => `<circle cx="${x}" cy="32" r="15" fill="#c98a55" ${OL()}/><circle cx="${x}" cy="32" r="7" fill="#f0c9a0"/>`;
  return ear(28) + ear(92) + head('#c98a55') + `<ellipse cx="60" cy="80" rx="20" ry="15" fill="#f0d9bd"/>` + cheeks(70) + eyes(mood, 56) +
    `<ellipse cx="60" cy="70" rx="6" ry="4.5" fill="${INK}"/>` + mouth(mood, 79);
}

function cat(mood) {
  const whiskers = `<path d="M14 64L30 67M14 76L30 74M106 64L90 67M106 76L90 74" ${OL(2)}/>`;
  return `<path d="M26 44L28 12L54 32Z" fill="#f4a340" ${OL()}/><path d="M94 44L92 12L66 32Z" fill="#f4a340" ${OL()}/>` +
    head('#f4a340') + `<path d="M48 30Q60 44 72 30" fill="#d9822b"/>` + cheeks() + eyes(mood) + whiskers + mouth(mood);
}

function dog(mood) {
  const ear = (d) => `<path d="${d}" fill="#8a5a3c" ${OL()}/>`;
  return head('#f3d6a8') + `<ellipse cx="78" cy="56" rx="15" ry="14" fill="#c99a6b"/>` +
    ear('M30 34Q6 40 12 76Q26 72 32 52Z') + ear('M90 34Q114 40 108 76Q94 72 88 52Z') + cheeks() + eyes(mood, 58) +
    `<ellipse cx="60" cy="70" rx="7" ry="5" fill="${INK}"/>` + mouth(mood, 80);
}

function penguin(mood) {
  return head('#39425e') + `<path d="M60 44Q42 34 32 60Q28 88 60 98Q92 88 88 60Q78 34 60 44Z" fill="#fff"/>` +
    `<circle cx="60" cy="66" r="38" fill="none" ${OL()}/>` + cheeks() + eyes(mood, 60, 14) +
    (mood === 'happy'
      ? `<path d="M49 72H71L60 90Z" fill="#ffb627" ${OL(3)}/>`
      : `<path d="M50 72H70L60 84Z" fill="#ffb627" ${OL(3)}/>`) +
    (mood === 'sad' ? `<path d="M52 92Q60 87 68 92" fill="none" ${OL(2.5)}/>` : '');
}

function fox(mood) {
  return `<path d="M24 50L18 10L54 32Z" fill="#f2703a" ${OL()}/><path d="M96 50L102 10L66 32Z" fill="#f2703a" ${OL()}/>` +
    `<path d="M25 37L24 20L39 32Z" fill="${INK}"/><path d="M95 37L96 20L81 32Z" fill="${INK}"/>` +
    head('#f2703a') + `<path d="M23 72Q40 62 60 84Q80 62 97 72Q88 104 60 104Q32 104 23 72Z" fill="#fff"/>` +
    `<circle cx="60" cy="66" r="38" fill="none" ${OL()}/>` + eyes(mood, 58) + `<ellipse cx="60" cy="74" rx="5.5" ry="4" fill="${INK}"/>` + mouth(mood, 82);
}

export const CHARACTERS = [
  { id: 'rabbit', name: '토리', draw: rabbit },
  { id: 'bear', name: '뭉치', draw: bear },
  { id: 'cat', name: '나나', draw: cat },
  { id: 'dog', name: '콩이', draw: dog },
  { id: 'penguin', name: '까망이', draw: penguin },
  { id: 'fox', name: '단비', draw: fox },
];

// 저장된 기록의 id 를 그대로 받으므로 모르는 id 면 첫 캐릭터로 그린다.
export const findCharacter = (id) => CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
export const characterSvg = (id, mood = 'idle') => findCharacter(id).draw(mood);
