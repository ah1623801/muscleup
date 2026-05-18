const CACHE_NAME = 'muscleup-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn-icons-png.flaticon.com/512/2936/2936886.png'
];

// تثبيت ملفات الكاش (للعمل بدون إنترنت)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// استدعاء الملفات عند عدم وجود إنترنت
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
        .catch(() => {
            // رسالة أو واجهة بديلة في حال انقطاع النت كلياً
            return new Response('أنت الآن غير متصل بالإنترنت، ولكن التطبيق يعمل من الذاكرة.');
        })
    );
});