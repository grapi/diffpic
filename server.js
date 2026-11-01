// public/ 을 그대로 내보내는 정적 서버. 외부 의존성 없음.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { networkInterfaces } from 'node:os';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), 'public');
const PORT = Number(process.env.PORT) || 3001;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^[/\\]+/, '');
  // 상위 디렉터리 탈출 차단
  if (rel.split(sep).includes('..')) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  const file = join(ROOT, rel === '' ? 'index.html' : rel);
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': MIME[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-cache',
    }).end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('404 Not Found');
  }
});

// 같은 와이파이의 태블릿·폰에서 접속할 주소. 기본 바인딩이 모든 인터페이스라 그대로 열린다.
function lanAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter((n) => n && n.family === 'IPv4' && !n.internal)
    .map((n) => n.address);
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`${PORT}번 포트를 이미 다른 프로그램이 쓰고 있습니다.`);
    console.error(`먼저 끄거나 다른 포트로 띄우세요:  PORT=3002 npm start`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  const lan = lanAddresses();
  console.log('\n  🔍 틀린그림 찾기\n');
  console.log(`  이 컴퓨터    http://localhost:${PORT}`);
  for (const ip of lan) console.log(`  태블릿·폰    http://${ip}:${PORT}`);
  if (!lan.length) console.log('  태블릿·폰    (네트워크에 연결되어 있지 않습니다)');
  console.log('\n  태블릿은 이 컴퓨터와 같은 와이파이에 있어야 합니다. 끄려면 Ctrl+C\n');
});
