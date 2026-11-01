import { makePuzzle, findSpot } from './lib/diff.js';
import { renderScene, W, H } from './lib/scene.js';
import { newGame, hit, miss, nextStage, reroll, MAX_LIVES, SPOTS } from './lib/game.js';
import { crayonPath, CRAYON_COLORS } from './lib/crayon.js';
import { makeRng } from './lib/rng.js';
import * as sound from './lib/sound.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const $ = (id) => document.getElementById(id);

const els = {
  left: $('left'), right: $('right'), board: $('board'),
  stageOut: $('stageOut'), dots: $('dots'), hearts: $('hearts'), seedOut: $('seedOut'),
  btnSound: $('btnSound'), btnNew: $('btnNew'),
  overlay: $('overlay'), ovEmoji: $('ovEmoji'), ovTitle: $('ovTitle'), ovMsg: $('ovMsg'), ovBtn: $('ovBtn'),
};
const pics = [els.left, els.right];

// 오답을 연달아 눌러 생명이 한꺼번에 깎이지 않도록, 오답 직후 잠깐은 오답을 무시한다.
const MISS_COOLDOWN_MS = 400;

let game = newGame();
let puzzle = null;
let missBlockedUntil = 0;
let onOverlayButton = null;

const randSeed = () => (Math.random() * 0x7fffffff) >>> 0;
const seedLabel = (seed) => seed.toString(36).toUpperCase();

// ---------- 그림 ----------

function loadPuzzle() {
  puzzle = makePuzzle(randSeed(), game.stage);
  els.left.querySelector('.scene').innerHTML = renderScene(puzzle.left);
  els.right.querySelector('.scene').innerHTML = renderScene(puzzle.right);
  for (const svg of pics) svg.querySelector('.marks').replaceChildren();
  els.seedOut.textContent = seedLabel(puzzle.seed);
  renderHud();
}

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

// 찾은 곳에 양쪽 그림 모두 동그라미. 손으로 따로 그린 것처럼 두 동그라미 모양은 조금씩 다르다.
function drawCircle(i) {
  const spot = puzzle.spots[i];
  const color = CRAYON_COLORS[i % CRAYON_COLORS.length];
  for (const svg of pics) {
    const rng = makeRng(randSeed());
    const path = svgEl('path', { class: 'circle', d: crayonPath(spot.cx, spot.cy, spot.r - 4, rng), stroke: color });
    svg.querySelector('.marks').append(path);
    path.style.setProperty('--len', Math.ceil(path.getTotalLength()));
  }
}

function markMiss(svg, { x, y }) {
  const k = 16;
  const mark = svgEl('path', { class: 'miss-mark', d: `M${x - k} ${y - k}L${x + k} ${y + k}M${x + k} ${y - k}L${x - k} ${y + k}` });
  svg.querySelector('.marks').append(mark);
  setTimeout(() => mark.remove(), 700);
}

function shake() {
  els.board.classList.remove('shake');
  void els.board.offsetWidth; // 연달아 틀려도 흔들림이 다시 시작되도록
  els.board.classList.add('shake');
}

// ---------- 상태줄 ----------

function renderHud(heartAnim) {
  els.stageOut.textContent = game.stage;

  els.dots.replaceChildren(
    ...Array.from({ length: SPOTS }, (_, i) => {
      const d = document.createElement('span');
      d.className = 'dot' + (i < game.found.length ? ' on' : '');
      return d;
    })
  );
  els.dots.setAttribute('aria-label', `찾은 곳 ${game.found.length}/${SPOTS}`);

  els.hearts.replaceChildren(
    ...Array.from({ length: MAX_LIVES }, (_, i) => {
      const h = document.createElement('span');
      h.className = 'heart' + (i < game.lives ? ' full' : '');
      h.textContent = '♥︎'; // 이모지가 아닌 글자 하트로 — 색을 CSS 로 칠할 수 있게
      return h;
    })
  );
  if (heartAnim) els.hearts.children[heartAnim.index]?.classList.add(heartAnim.cls);
  els.hearts.setAttribute('aria-label', `생명 ${game.lives}/${MAX_LIVES}`);
}

// ---------- 판 끝 / 게임 오버 ----------

function showOverlay({ emoji, title, msg, button, then }) {
  els.ovEmoji.textContent = emoji;
  els.ovTitle.textContent = title;
  els.ovMsg.textContent = msg;
  els.ovBtn.textContent = button;
  onOverlayButton = then;
  els.overlay.hidden = false;
  els.ovBtn.focus();
}

function goNext() {
  game = nextStage(game);
  loadPuzzle();
}

function restart() {
  game = newGame();
  loadPuzzle();
}

function showCleared() {
  if (game.perfect) {
    sound.perfect();
    renderHud(game.bonus ? { index: game.lives - 1, cls: 'gain' } : null);
    showOverlay({
      emoji: '🌟',
      title: '퍼팩트!',
      msg: game.bonus ? '한 번도 안 틀렸어요! 생명 ❤️ +1' : `한 번도 안 틀렸어요! (생명은 최대 ${MAX_LIVES}개)`,
      button: '다음 판 ▶',
      then: goNext,
    });
  } else {
    sound.clear();
    showOverlay({
      emoji: '🎉',
      title: '다 찾았어요!',
      msg: `${game.misses}번 틀렸어요. 다음 판은 퍼팩트에 도전!`,
      button: '다음 판 ▶',
      then: goNext,
    });
  }
}

function showGameOver() {
  sound.over();
  showOverlay({
    emoji: '😢',
    title: '게임 오버',
    msg: `${game.stage}판까지 왔어요. 처음부터 다시 해 볼까요?`,
    button: '처음부터 다시',
    then: restart,
  });
}

// ---------- 누르기 ----------

function onPress(e) {
  if (e.button !== 0) return;
  sound.unlock();
  if (game.status !== 'playing' || !puzzle) return;

  const svg = e.currentTarget;
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(svg.getScreenCTM().inverse());
  if (p.x < 0 || p.y < 0 || p.x > W || p.y > H) return; // 그림 바깥 여백

  const i = findSpot(puzzle.spots, p.x, p.y);
  if (i >= 0) {
    if (game.found.includes(i)) return; // 이미 찾은 곳은 감점 없이 무시
    game = hit(game, i);
    drawCircle(i);
    sound.found();
    renderHud();
    if (game.status === 'cleared') setTimeout(showCleared, 650);
    return;
  }

  const now = performance.now();
  if (now < missBlockedUntil) return;
  missBlockedUntil = now + MISS_COOLDOWN_MS;
  game = miss(game);
  markMiss(svg, p);
  shake();
  sound.miss();
  renderHud({ index: game.lives, cls: 'lost' });
  if (game.status === 'over') setTimeout(showGameOver, 600);
}

for (const svg of pics) svg.addEventListener('pointerdown', onPress);

els.ovBtn.addEventListener('click', () => {
  els.overlay.hidden = true;
  onOverlayButton?.();
});

els.btnNew.addEventListener('click', () => {
  if (game.status !== 'playing') return;
  game = reroll(game);
  loadPuzzle();
});

function syncSoundButton() {
  els.btnSound.textContent = sound.isEnabled() ? '🔊' : '🔇';
}
els.btnSound.addEventListener('click', () => {
  sound.unlock();
  sound.setEnabled(!sound.isEnabled());
  syncSoundButton();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

syncSoundButton();
loadPuzzle();
