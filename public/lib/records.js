// 점수 기록. 이 기기의 localStorage 에 상위 10개만 남긴다.

const STORE_KEY = 'diffpic.records';
export const MAX_RECORDS = 10;
export const MAX_NAME = 10;

export function cleanName(name) {
  return [...String(name ?? '').trim()].slice(0, MAX_NAME).join('') || '이름 없음';
}

// 점수 높은 순. 점수가 같으면 먼저 세운 기록이 앞선다. rank 는 0 부터, 10위 밖이면 -1.
export function addRecord(records, record) {
  const entry = { ...record, name: cleanName(record.name) };
  const sorted = [...records, entry].sort((a, b) => b.score - a.score);
  const rank = sorted.indexOf(entry);
  return { records: sorted.slice(0, MAX_RECORDS), rank: rank < MAX_RECORDS ? rank : -1 };
}

export function loadRecords() {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_KEY));
    return Array.isArray(list) ? list.filter((r) => r && Number.isFinite(r.score)) : [];
  } catch {
    return [];
  }
}

export function saveRecords(records) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(records));
  } catch {
    // 저장소를 못 쓰는 환경이면 이번 화면에만 보인다
  }
}
