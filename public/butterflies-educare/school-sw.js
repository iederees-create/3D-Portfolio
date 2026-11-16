/* Network-only school app: never store profiles, API responses or submissions. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 if(event.request.mode!=='navigate'||event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(!url.href.startsWith(self.registration.scope))return;
 event.respondWith(fetch(event.request).catch(()=>new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Butterflies · Offline</title><body style="background:#f9f5ec;color:#244b3d;font:18px system-ui;padding:32px"><h1>You’re offline</h1><p>Connect to the internet to sign in, see current school information or save changes.</p><p>No submission has been sent from this offline page.</p><button onclick="location.reload()">Try again</button></body></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})));
});
