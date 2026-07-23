// Self-destroying service worker.
//
// This path (/sw.js) previously hosted a third-party ad/push service worker
// (3nbf4.com) that injected ads into every page and kept running in returning
// visitors' browsers even after the source was removed. Browsers periodically
// re-fetch a registered worker's script from the network, so serving this
// replacement makes any still-registered client update to a worker that simply
// unregisters itself and clears its caches. This site ships no service worker
// of its own — once traffic has cycled through, this file can be deleted.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch (e) {
        /* ignore */
      }
      await self.registration.unregister();
    })(),
  );
});
