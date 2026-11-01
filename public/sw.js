// 오프라인용 캐시. 한 번 열어두면 인터넷이 끊겨도 게임이 그대로 돌아간다.
// 파일을 고친 뒤에는 CACHE 이름의 숫자를 올려야 태블릿이 새 버전을 받는다.
const CACHE = 'diffpic-v3';

const ASSETS = [
  '.',
  'index.html',
  'style.css',
  'app.js',
  'lib/rng.js',
  'lib/art.js',
  'lib/scenes/living.js',
  'lib/scenes/picnic.js',
  'lib/scenes/kitchen.js',
  'lib/diff.js',
  'lib/crayon.js',
  'lib/game.js',
  'lib/sound.js',
  'manifest.webmanifest',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // 캐시 우선. 게임에 서버가 필요 없으니 항상 즉시 뜨고, 비행기 모드에서도 열린다.
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
