import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
      Pusher : typeof Pusher,
      Echo : Echo <any>,
    }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  window.Pusher = Pusher;

  const echo = new Echo({
      broadcaster: 'pusher',
      key: config.public.PUSHER_APP_KEY,
      cluster: config.public.PUSHER_APP_CLUSTER,
      wsHost: config.public.PUSHER_HOST,
      wsPort: config.public.PUSHER_PORT ?? 80,
      wssPort: config.public.PUSHER_PORT ?? 443,
      forceTLS: (config.public.PUSHER_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
      logToConsole : true
  });

  window.Echo = echo;

  return {
    provide : {
      echo,
    }
  }
})
