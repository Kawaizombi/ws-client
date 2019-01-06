import { ERROR, OPEN } from '../websocket-event-types';

const addHandlers = (socket) => (resolve, reject) => {
  const handlers = { [OPEN]: resolve, [ERROR]: reject };
  const listener = ({ target, type }) => {
    handlers[type](target);
    socket.removeEventListener(OPEN, listener);
    socket.removeEventListener(ERROR, listener);
  };
  socket.addEventListener(OPEN, listener);
  socket.addEventListener(ERROR, listener);
};

const openSocket = (url) => new Promise((resolve, reject) => {
  const socket = new WebSocket(url);
  addHandlers(socket)(resolve, reject);
});

export default openSocket;
