// 생명·점수·판 진행. DOM 을 모르는 순수 함수라 테스트에서 그대로 쓴다.
//
//   시작 생명 5, 최대 10. 틀린 곳이 아닌 데를 누르면 −1, 0 이 되면 게임 오버.
//   5개를 다 찾으면 생명 +1, 한 번도 안 틀렸으면(퍼팩트) +2. 생명은 다음 판으로 이어진다.
//   마지막 판까지 깨면 완주.
//
//   점수: 찾을 때마다 100점 + 연속 보너스(2연속 +50, 3연속 +100 … 최대 +500), 퍼팩트면 판 끝에 +1000.
//   연속은 틀리거나 '다시 섞기'를 누르기 전까지 다음 판으로도 이어진다.

export const START_LIVES = 5;
export const MAX_LIVES = 10;
export const SPOTS = 5;
export const CLEAR_HEARTS = 1;
export const PERFECT_HEARTS = 2;
export const HIT_POINTS = 100;
export const COMBO_STEP = 50;
export const COMBO_MAX = 500;
export const PERFECT_POINTS = 1000;

export const comboBonus = (combo) => Math.min(COMBO_MAX, COMBO_STEP * (combo - 1));

export function newGame(stages = 1) {
  return {
    stage: 1, stages, lives: START_LIVES, found: [], misses: 0, status: 'playing', perfect: false, bonus: 0,
    score: 0, stageStart: 0, combo: 0, lastPoints: 0,
  };
}

export function hit(state, i) {
  if (state.status !== 'playing' || state.found.includes(i)) return state;
  const found = [...state.found, i];
  const combo = state.combo + 1;
  const lastPoints = HIT_POINTS + comboBonus(combo);
  const next = { ...state, found, combo, lastPoints, score: state.score + lastPoints };
  if (found.length < SPOTS) return next;
  const perfect = state.misses === 0;
  const lives = Math.min(MAX_LIVES, state.lives + (perfect ? PERFECT_HEARTS : CLEAR_HEARTS));
  return { ...next, status: 'cleared', perfect, bonus: lives - state.lives, lives, score: next.score + (perfect ? PERFECT_POINTS : 0) };
}

export function miss(state) {
  if (state.status !== 'playing') return state;
  const lives = state.lives - 1;
  return { ...state, lives, misses: state.misses + 1, combo: 0, status: lives <= 0 ? 'over' : 'playing' };
}

export function nextStage(state) {
  if (state.status !== 'cleared') return state;
  if (state.stage >= state.stages) return { ...state, status: 'finished' };
  return { ...state, stage: state.stage + 1, found: [], misses: 0, status: 'playing', perfect: false, bonus: 0, stageStart: state.score, lastPoints: 0 };
}

// 같은 그림에서 틀린 곳만 다시 고른다. 찾은 곳을 또 찾아 점수를 쌓을 수 없도록 이 판에서 얻은 점수와
// 연속 기록은 사라지고, 틀린 기록은 남아 퍼팩트 판정에 그대로 쓰인다.
export function reroll(state) {
  if (state.status !== 'playing') return state;
  return { ...state, found: [], score: state.stageStart, combo: 0, lastPoints: 0 };
}
