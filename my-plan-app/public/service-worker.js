// const CACHE_NAME = "my-app-cache-v5";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/offline.html",
//   "/manifest.json",
//   "/icons/icon-192x192.png",
//   "/icons/icon-512x512.png"
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
//   self.skipWaiting();
// });

// // Intercetta richieste di rete
// self.addEventListener("fetch", (event) => {
//   if (event.request.method !== "GET") return;

//   const apiUrl = "http://localhost:8080"; 
//   if (event.request.url.startsWith(apiUrl)) {
//     //Api
//     event.respondWith(
//       fetch(event.request)
//         .then((response) => {
//           return caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         })
//         .catch(() => caches.match(event.request))
//     );
//   } else {
//     //  file statici
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         return cachedResponse || fetch(event.request)
//           .then((response) => {
//             return caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, response.clone());
//               return response;
//             });
//           })
//           .catch(() => caches.match("/offline.html"));
//       })
//     );
//   }
// });

// // Cancella vecchie cache
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cache) => {
//           if (cache !== CACHE_NAME) {
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
//   self.clients.claim();
// });
