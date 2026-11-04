
'use strict';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
// Kein Cache für angemeldete Waren- oder Verkaufsdaten.
self.addEventListener('push',event=>{let p={};try{p=event.data?.json()||{}}catch{}event.waitUntil(self.registration.showNotification(p.title||'Bibani Select',{body:p.body||'Neue Mitteilung in deiner Standzentrale.',icon:new URL('icon-192.png',self.registration.scope).href,tag:p.tag||'bibani',data:{url:self.registration.scope}}))});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil((async()=>{const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});const c=clients.find(c=>c.url.startsWith(self.registration.scope));if(c)return c.focus();return self.clients.openWindow(self.registration.scope)})())});
