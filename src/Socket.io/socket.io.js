import io from 'socket.io-client/dist/socket.io';
export const socket = io.connect('https://taskeepererver.herokuapp.com',{jsonp:false});
export const sockettest = io.connect('https://taskeeper-server-message.herokuapp.com',{jsonp:false});
