// 활동지 파일을 저장해 두고 인터넷 없이도 열리게 하는 서비스 워커입니다.
importScripts("weeks.js");
const CACHE = "ss-v5";
// 주차 페이지는 weeks.js 목록에서 가져오고, 그림은 처음 열 때 저장됩니다.
const FILES = ["./", "index.html", "weeks.js", "manifest.json",
  ...WEEKS.map(w => w.date + ".html"),
  "images/icon-192.png", "images/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// 새 내용이 있으면 먼저 받아 오고, 인터넷이 없으면 저장된 파일을 씁니다.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request, {ignoreSearch: true}))
  );
});
