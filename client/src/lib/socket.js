import { browser } from '$app/environment';
import { io } from 'socket.io-client';

if (browser) {
    socket = io('/socket', {
        path: '/socket',
        transports: ['websocket']
    });
}

export { socket };