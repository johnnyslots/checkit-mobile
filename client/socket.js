// export a socket instance from here and import into SendRec (to emit) and Books (to recieve with 'on');

window.navigator.userAgent = "react-native"
import SocketIOClient from 'socket.io-client';
import ipAddress from './utils';

const socket = SocketIOClient(ipAddress, {jsonp: false});

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});

export default socket;
