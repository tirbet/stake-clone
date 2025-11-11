// public/sw.js

self.addEventListener('push', (event) => {
  let data = {
    title: 'Notification',
    body: 'You have a new message!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (err) {
      console.error('Push data parse error:', err);
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = '/'; // Navigate to your app root
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Focus if already open
      for (let client of windowClients) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      // Otherwise, open new window
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
