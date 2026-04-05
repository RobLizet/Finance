// Financiën RL – Service Worker v2026
const CACHE = "financien-rl-v1";
const ASSETS = ["./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const url = e.request.url;
  // Altijd live: Firebase, Google fonts, CoinGecko, Tesseract
  if (url.includes("firestore.googleapis.com") ||
      url.includes("firebaseapp.com") ||
      url.includes("googleapis.com") ||
      url.includes("coingecko.com") ||
      url.includes("cdnjs.cloudflare.com") ||
      url.includes("fonts.gstatic.com")) return;
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
