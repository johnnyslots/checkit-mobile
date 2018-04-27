// export a socket instance from here and import into SendRec (to emit) and Books (to recieve with 'on');

window.navigator.userAgent = "react-native"
import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://172.16.21.200:8080', {jsonp: false});

socket.on('connect', () => {
  console.log('I am now connected to the server!');

  // socket.on('new-message', message => {
  //   store.dispatch(getMessage(message));
  // });



});

export default socket;
