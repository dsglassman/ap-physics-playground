const CACHE='fitness-tracker-v1-20260905';
const CORE=["./","index.html","styles.css","app-core.js","app-views-a.js","app-views-b.js","app-runtime.js","live-data.js","data-loader.js","data-pack-1.js","data-pack-2.js","data-pack-3.js","data-pack-4.js","data-pack-5.js","data-pack-6.js","data-pack-7.js","data-pack-8.js","data-pack-9.js","data-pack-10.js","data-pack-11.js","data-pack-12.js","data-pack-13.js","data/recipes.v1.json","manifest.webmanifest","icon.svg"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match('index.html'))))});
