// 효과음. 음원 파일 없이 Web Audio 로 합성한다 — 받아올 것이 없어 첫 소리부터 지연이 없다.
//
// iOS/iPadOS 는 사용자 조작(터치·클릭) 안에서만 오디오를 열 수 있다.
// 그래서 AudioContext 를 미리 만들지 않고 unlock() 이 불릴 때 만든다.
// 열리기 전에는 tone() 이 조용히 아무것도 하지 않는다.

const STORE_KEY = 'diffpic.sound';

let ctx = null;
let enabled = true;

try {
  enabled = localStorage.getItem(STORE_KEY) !== 'off';
} catch {
  /* 사생활 보호 모드 등 저장이 막힌 환경에서는 기본값(켜짐)을 쓴다 */
}

export function isEnabled() {
  return enabled;
}

export function setEnabled(on) {
  enabled = on;
  try {
    localStorage.setItem(STORE_KEY, on ? 'on' : 'off');
  } catch {
    /* 저장에 실패해도 이번 세션 동안은 동작한다 */
  }
}

export function unlock() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') ctx.resume();
}

function tone({ freq, dur, type = 'triangle', gain = 0.06, slideTo, delay = 0 }) {
  if (!enabled || !ctx || ctx.state !== 'running') return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  // 소리를 뚝 끊으면 '틱' 하는 잡음이 생긴다. 짧게 올렸다 부드럽게 내린다.
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(amp).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

// 찾았다! — 딩동
export function found() {
  tone({ freq: 880, dur: 0.12, gain: 0.08 });
  tone({ freq: 1318.5, dur: 0.22, gain: 0.08, delay: 0.09 });
}

// 틀린 곳이 아님 — 낮은 삐-익
export function miss() {
  tone({ freq: 220, dur: 0.28, type: 'square', gain: 0.05, slideTo: 110 });
  tone({ freq: 233, dur: 0.28, type: 'sawtooth', gain: 0.025, slideTo: 116 });
}

export function clear() {
  // 도-미-솔
  [523.25, 659.25, 783.99].forEach((freq, i) => tone({ freq, dur: 0.22, gain: 0.08, delay: i * 0.11 }));
}

export function perfect() {
  // 도-미-솔-도-미 상행, 끝음을 길게
  [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) =>
    tone({ freq, dur: i === 4 ? 0.5 : 0.18, gain: 0.08, delay: i * 0.09 })
  );
}

export function over() {
  // 솔-미-도 하행
  [392, 329.63, 261.63].forEach((freq, i) => tone({ freq, dur: 0.32, gain: 0.08, delay: i * 0.22 }));
}
