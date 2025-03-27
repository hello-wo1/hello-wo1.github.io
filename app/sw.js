const CACHE_NAME = 'electricity-pwa-v3';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/icon-192.png',
    '/icon-512.png',
    '/logo-1024.svg',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://fonts.googleapis.com/css2?family=Dosis:wght@400;500;600&display=swap',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css',
    'https://unpkg.com/@zxing/library@0.18.6/umd/index.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js',
    // Payment logos
    'https://miro.medium.com/v2/resize:fit:720/format:webp/1*eKZ-IVjg4CXq3Ax4iCtQPw.png',
    'https://upload.wikimedia.org/wikipedia/en/a/ae/Octopus_Logo_%282017%29.png',
    'https://upload.wikimedia.org/wikipedia/commons/4/4c/PayMe_from_HSBC_wordmark.svg',
    'https://www.logo.wine/a/logo/Alipay/Alipay-Logo.wine.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7a/WeChat_Pay.png',
    'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1b/UnionPay_logo.svg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => caches.match('/index.html'))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
        ))
    );
});