import {io} from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("process.env.REACT_APP_BE_SOCKET:", process.env.REACT_APP_BE_SOCKET);
// const URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BE_SOCKET : 'http://localhost:5000';
const URL = process.env.REACT_APP_BE_SOCKET ? process.env.REACT_APP_BE_SOCKET : 'http://localhost:5000';

export const socket = io(URL, {
    autoConnect: false
});