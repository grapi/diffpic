// 생명·판 진행. DOM 을 모르는 순수 함수라 테스트에서 그대로 쓴다.
//
//   시작 생명 5, 최대 10. 틀린 곳이 아닌 데를 누르면 −1, 0 이 되면 게임 오버.
//   한 번도 안 틀리고(퍼팩트) 5개를 다 찾으면 그 자리에서 +1. 생명은 다음 판으로 이어진다.

export const START_LIVES = 5;
export const MAX_LIVES = 10;
export const SPOTS = 5;

export function newGame() {
  return { stage: 1, lives: START_LIVES, found: [], misses: 0, status: 'playing', perfect: false, bonus: 0 };
}

export function hit(state, i) {
  if (state.status !== 'playing' || state.found.includes(i)) return state;
  const found = [...state.found, i];
  if (found.length < SPOTS) return { ...state, found };
  const perfect = state.misses === 0;
  const lives = perfect ? Math.min(MAX_LIVES, state.lives + 1) : state.lives;
  return { ...state, found, status: 'cleared', perfect, bonus: lives - state.lives, lives };
}

export function miss(state) {
  if (state.status !== 'playing') return state;
  const lives = state.lives - 1;
  return { ...state, lives, misses: state.misses + 1, status: lives <= 0 ? 'over' : 'playing' };
}

export function nextStage(state) {
  if (state.status !== 'cleared') return state;
  return { ...newGame(), stage: state.stage + 1, lives: state.lives };
}

// 같은 판에서 그림만 바꾼다. 이 판에서 틀린 기록은 남아 퍼팩트 판정에 그대로 쓰인다.
export function reroll(state) {
  if (state.status !== 'playing') return state;
  return { ...state, found: [] };
}
