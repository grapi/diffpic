import { makePuzzle, findSpot, SCENES } from './lib/diff.js';
import { W, H } from './lib/art.js';
import { newGame, hit, miss, nextStage, reroll, MAX_LIVES, SPOTS, PERFECT_POINTS } from './lib/game.js';
import { CHARACTERS, characterSvg, findCharacter } from './lib/characters.js';
import { addRecord, loadRecords, saveRecords } from './lib/records.js';
import { crayonPath, CRAYON_COLORS } from './lib/crayon.js';
import { makeRng } from './lib/rng.js';
import * as sound from './lib/sound.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const $ = (id) => document.getElementById(id);

const els = {
  left: $('left'), right: $('right'), board: $('board'),
  stageOut: $('stageOut'), stagesOut: $('stagesOut'), dots: $('dots'), hearts: $('hearts'), seedOut: $('seedOut'),
  scoreOut: $('scoreOut'), comboOut: $('comboOut'), avatar: $('avatar'),
  btnSound: $('btnSound'), btnNew: $('btnNew'),
  overlay: $('overlay'), ovEmoji: $('ovEmoji'), ovTitle: $('ovTitle'), ovMsg: $('ovMsg'), ovBtn: $('ovBtn'),
  start: $('start'), charList: $('charList'), btnStart: $('btnStart'), btnRecords: $('btnRecords'),
  end: $('end'), endAvatar: $('endAvatar'), endTitle: $('endTitle'), endMsg: $('endMsg'), endScore: $('endScore'),
  recForm: $('recForm'), recName: $('recName'), recList: $('recList'), recNone: $('recNone'), endBtn: $('endBtn'),
};
const pics = [els.left, els.right];

// 오답을 연달아 눌러 생명이 한꺼번에 깎이지 않도록, 오답 직후 잠깐은 오답을 무시한다.
const MISS_COOLDOWN_MS = 400;

const PLAYER_KEY = 'diffpic.player';
const MOOD_MS = 900;

let game = newGame(SCENES.length);
let puzzle = null;
// 한 게임에 모든 장면이 섞인 순서로 한 번씩 나온다. 판 번호가 곧 순서다.
let sceneOrder = [];
let missBlockedUntil = 0;
let onOverlayButton = null;
let player = loadPlayer();
let moodTimer = 0;

function loadPlayer() {
  try {
    const saved = JSON.parse(localStorage.getItem(PLAYER_KEY));
    return { character: findCharacter(saved?.character).id, name: String(saved?.name ?? '') };
  } catch {
    return { character: CHARACTERS[0].id, name: '' };
  }
}

function savePlayer() {
  try {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
  } catch {
    // 저장소를 못 쓰면 다음에 다시 고르면 된다
  }
}

const randSeed = () => (Math.random() * 0x7fffffff) >>> 0;
const seedLabel = (seed) => seed.toString(36).toUpperCase();

// ---------- 그림 ----------

function shuffleScenes() {
  sceneOrder = makeRng(randSeed()).shuffle(SCENES.map((_, i) => i));
}

function loadPuzzle() {
  puzzle = makePuzzle(randSeed(), sceneOrder[game.stage - 1]);
  els.left.querySelector('.scene').innerHTML = puzzle.left;
  els.right.querySelector('.scene').innerHTML = puzzle.right;
  for (const svg of pics) svg.querySelector('.marks').replaceChildren();
  els.seedOut.textContent = `${puzzle.title} #${seedLabel(puzzle.seed)}`;
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

function markPoints(svg, { cx, cy }, points) {
  const x = Math.min(W - 60, Math.max(60, cx));
  const y = Math.max(44, cy);
  const mark = svgEl('text', { class: 'points', x, y });
  mark.textContent = `+${points}`;
  svg.querySelector('.marks').append(mark);
  setTimeout(() => mark.remove(), 900);
}

function shake() {
  els.board.classList.remove('shake');
  void els.board.offsetWidth; // 연달아 틀려도 흔들림이 다시 시작되도록
  els.board.classList.add('shake');
}

// ---------- 상태줄 ----------

// heartAnims: [{ index, cls }] — 하트가 늘거나 줄 때 움직일 칸들
function renderHud(heartAnims = []) {
  els.stageOut.textContent = game.stage;
  els.stagesOut.textContent = `/${game.stages}`;
  els.scoreOut.textContent = game.score.toLocaleString();
  els.comboOut.hidden = game.combo < 2;
  els.comboOut.textContent = `🔥 ${game.combo}연속`;

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
  for (const { index, cls } of heartAnims) els.hearts.children[index]?.classList.add(cls);
  els.hearts.setAttribute('aria-label', `생명 ${game.lives}/${MAX_LIVES}`);
}

function setMood(mood) {
  clearTimeout(moodTimer);
  els.avatar.innerHTML = characterSvg(player.character, mood);
  const cls = mood === 'happy' ? 'bump' : mood === 'sad' ? 'droop' : '';
  els.avatar.classList.remove('bump', 'droop');
  if (!cls) return;
  void els.avatar.getBoundingClientRect(); // 연달아도 움직임이 다시 시작되도록
  els.avatar.classList.add(cls);
  moodTimer = setTimeout(() => setMood('idle'), MOOD_MS);
}

function popCombo() {
  els.comboOut.classList.remove('pop');
  void els.comboOut.offsetWidth;
  els.comboOut.classList.add('pop');
}

// ---------- 판 끝 ----------

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
  if (game.status === 'finished') {
    sound.perfect();
    showEnd();
  } else {
    loadPuzzle();
  }
}

function showCleared() {
  const hearts = Array.from({ length: game.bonus }, (_, i) => ({ index: game.lives - 1 - i, cls: 'gain' }));
  const heartMsg = game.bonus ? `생명 ❤️ +${game.bonus}` : `생명은 최대 ${MAX_LIVES}개`;
  const button = game.stage >= game.stages ? '결과 보기 ▶' : '다음 판 ▶';
  renderHud(hearts);
  setMood('happy');
  if (game.perfect) {
    sound.perfect();
    showOverlay({
      emoji: '🌟',
      title: '퍼팩트!',
      msg: `한 번도 안 틀렸어요! 보너스 +${PERFECT_POINTS.toLocaleString()}점 · ${heartMsg}`,
      button,
      then: goNext,
    });
  } else {
    sound.clear();
    showOverlay({
      emoji: '🎉',
      title: '다 찾았어요!',
      msg: `${game.misses}번 틀렸어요. ${heartMsg}`,
      button,
      then: goNext,
    });
  }
}

// ---------- 끝난 뒤 점수와 기록 ----------

function renderRecords(records, mine = -1) {
  els.recNone.hidden = records.length > 0;
  els.recList.hidden = records.length === 0;
  els.recList.replaceChildren(
    ...records.map((r, i) => {
      const li = document.createElement('li');
      if (i === mine) li.className = 'mine';
      const cell = (cls, text) => {
        const span = document.createElement('span');
        span.className = cls;
        span.textContent = text;
        return span;
      };
      const face = svgEl('svg', { class: 'face', viewBox: '0 0 120 120', 'aria-hidden': 'true' });
      face.innerHTML = characterSvg(r.character);
      li.append(
        cell('rank', i + 1), face, cell('who', r.name),
        cell('reach', r.completed ? '완주' : `${r.stage}판`), cell('pts', `${Number(r.score).toLocaleString()}점`)
      );
      return li;
    })
  );
}

function showEnd() {
  const completed = game.status === 'finished';
  els.endAvatar.innerHTML = characterSvg(player.character, completed ? 'happy' : 'sad');
  els.endTitle.textContent = completed ? '완주했어요!' : '게임 오버';
  els.endMsg.textContent = completed ? `그림 ${game.stages}개를 모두 찾았어요.` : `${game.stage}판까지 왔어요.`;
  els.endScore.textContent = `${game.score.toLocaleString()}점`;
  els.recForm.hidden = false;
  els.recName.value = player.name;
  renderRecords(loadRecords());
  els.endBtn.textContent = '기록하지 않고 처음으로';
  els.end.hidden = false;
}

function showRecordsOnly() {
  els.endAvatar.innerHTML = characterSvg(player.character, 'happy');
  els.endTitle.textContent = '🏆 기록';
  els.endMsg.textContent = '이 기기에서 세운 점수 상위 10개예요.';
  els.endScore.textContent = '';
  els.recForm.hidden = true;
  renderRecords(loadRecords());
  els.endBtn.textContent = '닫기';
  els.end.hidden = false;
}

els.recForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { records, rank } = addRecord(loadRecords(), {
    name: els.recName.value,
    character: player.character,
    score: game.score,
    stage: game.stage,
    completed: game.status === 'finished',
    date: new Date().toISOString().slice(0, 10),
  });
  saveRecords(records);
  player.name = els.recName.value.trim();
  savePlayer();
  els.recForm.hidden = true;
  els.recName.blur();
  renderRecords(records, rank);
  els.endMsg.textContent = rank >= 0 ? `${rank + 1}위에 올랐어요!` : '아쉽게도 10위 안에 들지 못했어요.';
  els.endBtn.textContent = '처음으로';
});

els.endBtn.addEventListener('click', () => {
  els.end.hidden = true;
  showStart();
});

// ---------- 시작 화면 ----------

function renderChars() {
  els.charList.replaceChildren(
    ...CHARACTERS.map((c) => {
      const on = c.id === player.character;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'char' + (on ? ' on' : '');
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', on);
      const face = svgEl('svg', { viewBox: '0 0 120 120', 'aria-hidden': 'true' });
      face.innerHTML = characterSvg(c.id, on ? 'happy' : 'idle');
      const name = document.createElement('span');
      name.textContent = c.name;
      btn.append(face, name);
      btn.addEventListener('click', () => {
        sound.unlock();
        player.character = c.id;
        savePlayer();
        renderChars();
      });
      return btn;
    })
  );
}

function showStart() {
  renderChars();
  els.start.hidden = false;
}

function startGame() {
  sound.unlock();
  game = newGame(SCENES.length);
  shuffleScenes();
  setMood('idle');
  loadPuzzle();
  els.start.hidden = true;
}

els.btnStart.addEventListener('click', startGame);
els.btnRecords.addEventListener('click', showRecordsOnly);

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
    markPoints(svg, puzzle.spots[i], game.lastPoints);
    sound.found();
    setMood('happy');
    renderHud();
    if (game.combo >= 2) popCombo();
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
  setMood('sad');
  renderHud([{ index: game.lives, cls: 'lost' }]);
  if (game.status === 'over') {
    setTimeout(() => {
      sound.over();
      showEnd();
    }, 600);
  }
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
showStart();
