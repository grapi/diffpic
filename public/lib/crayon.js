// 색연필로 쓱 그린 동그라미. 완벽한 원 대신, 한 바퀴를 조금 넘게 돌며
// 반지름이 살짝 흔들리고 끝이 시작점을 지나쳐 겹치는 손그림 타원을 만든다.
// 질감(거친 가장자리)은 index.html 의 #crayon 필터가 맡는다.

export const CRAYON_COLORS = ['#e8322b', '#ff4d6d', '#f2572c'];

export function crayonPath(cx, cy, r, rng) {
  const turns = 1.1 + rng() * 0.12;
  const a0 = rng() * Math.PI * 2;
  const tilt = (rng() - 0.5) * 0.8;
  const sx = 1.04 + rng() * 0.1;
  const sy = 0.9 + rng() * 0.08;
  const phase = rng() * Math.PI * 2;
  const N = 56;

  let d = '';
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = a0 + t * turns * Math.PI * 2;
    // 손이 돌면서 조금씩 바깥으로 벌어지고, 미세하게 떨린다.
    const rr = r * (0.97 + t * 0.07 + 0.03 * Math.sin(a * 3 + phase));
    const px = Math.cos(a) * rr * sx;
    const py = Math.sin(a) * rr * sy;
    const x = cx + px * Math.cos(tilt) - py * Math.sin(tilt);
    const y = cy + px * Math.sin(tilt) + py * Math.cos(tilt);
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}
