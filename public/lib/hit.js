// 틀린 곳 판정. 텐트처럼 넓게 바뀐 곳은 판정 원 하나로 덮을 수 없으므로, 바꾸기 전후 그림을
// 픽셀로 비교해 '실제로 달라진 자리'(마스크)를 만들고 그 자리 어디를 눌러도 맞는 것으로 친다.
// 마스크를 쓰므로 장면을 새로 그려도 판정 영역을 손으로 적을 필요가 없다.

import { W, H } from './art.js';

export const MASK_SCALE = 4; // 마스크 한 칸 = 장면 좌표 4
export const TOUCH_PAD = 12; // 달라진 자리에서 이만큼 벗어나도 맞는 것으로 친다 (손가락, 바뀌지 않은 외곽선)
const COLOR_THRESHOLD = 16;

// 같은 크기의 RGBA 픽셀 배열 둘을 비교해 달라진 칸을 표시한다.
export function pixelMask(a, b, w, h) {
  const cells = new Uint8Array(w * h);
  for (let i = 0; i < cells.length; i++) {
    const p = i * 4;
    const delta = Math.abs(a[p] - b[p]) + Math.abs(a[p + 1] - b[p + 1]) + Math.abs(a[p + 2] - b[p + 2]) + Math.abs(a[p + 3] - b[p + 3]);
    if (delta > COLOR_THRESHOLD) cells[i] = 1;
  }
  return { w, h, cells };
}

// 장면 좌표 (x, y) 에서 pad 안에 달라진 칸이 있는가.
export function maskHit(mask, x, y, pad = 0) {
  const reach = Math.ceil(pad / MASK_SCALE);
  const cx = Math.floor(x / MASK_SCALE);
  const cy = Math.floor(y / MASK_SCALE);
  for (let dy = -reach; dy <= reach; dy++) {
    for (let dx = -reach; dx <= reach; dx++) {
      if (dx * dx + dy * dy > reach * reach) continue;
      const mx = cx + dx;
      const my = cy + dy;
      if (mx >= 0 && my >= 0 && mx < mask.w && my < mask.h && mask.cells[my * mask.w + mx]) return true;
    }
  }
  return false;
}

// 누른 자리가 몇 번째 틀린 곳인지. 아니면 -1. 달라진 픽셀을 직접 누른 것 → 판정 원 → 손가락 여유 순서로 보고,
// 넓은 곳끼리 겹칠 때 이미 찾은 곳이 아직 못 찾은 곳을 가리지 않게 못 찾은 곳을 먼저 고른다.
// masks 가 비어 있으면(그림 비교 실패) 판정 원만으로 판정한다.
export function locate(spots, masks, found, x, y) {
  const all = spots.map((_, i) => i);
  const onMask = (pad) => all.filter((i) => masks[i] && maskHit(masks[i], x, y, pad));
  const inCircle = all.filter((i) => Math.hypot(spots[i].cx - x, spots[i].cy - y) <= spots[i].r);
  const hits = [...onMask(0), ...inCircle, ...onMask(TOUCH_PAD)];
  return hits.find((i) => !found.includes(i)) ?? hits[0] ?? -1;
}

// ---------- 브라우저에서 그림을 픽셀로 ----------

function drawPixels(ctx, w, h, svg) {
  const doc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${w}" height="${h}">${svg}</svg>`;
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(ctx.getImageData(0, 0, w, h).data);
    };
    img.onerror = () => reject(new Error('그림을 불러오지 못했습니다'));
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(doc)}`;
  });
}

// 원본 그림과, 틀린 곳을 하나씩만 바꾼 그림들을 비교해 틀린 곳마다 마스크를 만든다.
export async function buildMasks(base, variants) {
  const w = W / MASK_SCALE;
  const h = H / MASK_SCALE;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const original = await drawPixels(ctx, w, h, base);
  const masks = [];
  for (const svg of variants) masks.push(pixelMask(original, await drawPixels(ctx, w, h, svg), w, h));
  return masks;
}
