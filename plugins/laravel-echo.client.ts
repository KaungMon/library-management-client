import Echo from 'laravel-echo';
// import axios from 'axios';
import Pusher, { type ChannelAuthorizationCallback } from 'pusher-js';

declare global {
    interface Window {
      Pusher : typeof Pusher,
      Echo : Echo<any>,
    }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  window.Pusher = Pusher;

  const echo = new Echo({
      broadcaster: 'pusher',
      key: config.public.PUSHER_APP_KEY,
      cluster: config.public.PUSHER_APP_CLUSTER ?? 'mt1',
      wsHost: config.public.PUSHER_HOST ? config.public.PUSHER_HOST : `ws-${config.public.PUSHER_APP_CLUSTER}.pusher.com`,
      wsPort: config.public.PUSHER_PORT ?? 80,
      wssPort: config.public.PUSHER_PORT ?? 443,
      forceTLS: (config.public.PUSHER_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
      /* authorizer: (channel:any, options:any) => {
        return {
            authorize: (socketId:string, callback: ChannelAuthorizationCallback) => {
                axios.post('/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                .then(response => {
                    callback(null, response.data);
                })
                .catch(error => {
                    callback(error,null);
                });
            }
        };
    }, */
  });

  window.Echo = echo;

  return {
    provide : {
      echo,
    }
  }
})
