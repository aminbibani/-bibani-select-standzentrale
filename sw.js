// Bibani Select – Service Worker für die Standzentrale
// Push-Empfang und Benachrichtigungs-Klicks; kein Eingriff in Kasse oder Warenlager.

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (_) {
    payload = { body: event.data ? event.data.text() : '' };
  }

  const title = payload.title || 'Bibani Select';
  const options = {
    body: payload.body || 'Du hast eine neue Mitteilung.',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: { url: payload.url || './' },
    tag: payload.tag || 'bibani-select-notification',
    renotify: false
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(
    event.notification.data && event.notification.data.url
      ? event.notification.data.url
      : './',
    self.location.origin
  ).href;

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });

    for (const client of windows) {
      if (client.url.startsWith(self.location.origin) && 'focus' in client) {
        await client.focus();
        if ('navigate' in client && client.url !== target) {
          await client.navigate(target);
        }
        return;
      }
    }

    if (self.clients.openWindow) {
      await self.clients.openWindow(target);
    }
  })());
});
