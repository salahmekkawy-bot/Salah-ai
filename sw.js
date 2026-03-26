const cacheName = 'salah-hub-v4'; // تغيير الرقم ده بيجبر الكروم يرمي القديم

self.addEventListener('install', (e) => {
  self.skipWaiting(); // تفعيل النسخة الجديدة فوراً بدون انتظار
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(['./', './index.html']);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== cacheName) {
          return caches.delete(key); // مسح أي كاش قديم
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request)) // بيحاول يجيب الجديد من النت الأول، لو مفيش نت يفتح الكاش
  );
});
