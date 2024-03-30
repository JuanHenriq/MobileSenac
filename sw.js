const CACHE_NAME = 'TeChega';

// Add whichever assets you want to precache here:
const PRECACHE_ASSETS = [
  './index.html',
  './artigo-um.html',
  './artigo-dois.html',
  './artigo-tres.html',
  './feira.html',
  './left-sidebar.html',
  './museu.html',
  './teatro.html',

  './assets/css/main.css',
  './assets/css/noscript.css',
  './assets/images/arrow.svg',

  './assets/js/breakpoints.min.js',
  './assets/js/browser.min.js',
  './assets/js/jquery.dropotron.min.js',
  './assets/js/jquery.min.js',
  './assets/js/jquery.scrollex.min.js',
  './assets/js/jquery.scrolly.min.js',
  './assets/js/main.js',
  './assets/js/feiralivre.js',
  './assets/js/museu.js',
  './assets/js/teatro.js',

  './images/edit_compress.webp',
  './images/feiras.webp',
  './images/frevo.webp',
  './images/frevo2.webp',
  './images/frevo4.webp',
  './images/home_banner.webp',
  './images/museus.webp',
  './images/praia.webp',
  './images/teatros.webp',

  './images/header.jpg',
  './images/pic01.jpg',
  './images/pic02.jpg',
  './images/pic03.jpg',
  './images/pic04.jpg',
  './images/pic05.jpg',
  './images/pic06.jpg',
  './images/pic07.jpg',
  './images/pic08.jpg',
  './images/pic09.jpg',
  './images/pic10.jpg',
  './images/pic11.jpg',
  './images/pic12.jpg',
  './images/pic13.jpg',
  './images/pic14.jpg',
  './images/pic15.jpg',
  './images/pontes.jpg',

  './assets/icon/barraca.png',
  './assets/icon/house.png',
  './assets/icon/museu.png',
  './assets/icon/praia.png',
  './assets/icon/teatro.png',

  './assets/icon/marker.svg',

  './android/android-launchericon-48-48.png',
  './android/android-launchericon-72-72.png',
  './android/android-launchericon-96-96.png',
  './android/android-launchericon-144-144.png',
  './android/android-launchericon-192-192.png',
  './android/android-launchericon-512-512.png',

]

// Listener for the install event - precaches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(async () => {
      const cache = await caches.open(CACHE_NAME);

      // match the request to our cache
      const cachedResponse = await cache.match(event.request);

      // check if we got a valid response
      if (cachedResponse !== undefined) {
          // Cache hit, return the resource
          return cachedResponse;
      } else {
        // Otherwise, go to the network
          return fetch(event.request)
      };
  });
});