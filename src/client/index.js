import openSocket from '../open-socket';
import EventDispatcher from '../event-dispatcher';
import { CLOSE, MESSAGE } from '../websocket-event-types';
import { CLIENT_SOCKET_CLOSE, CLIENT_SOCKET_MESSAGE, CLIENT_SOCKET_OPEN } from './event-types';

class WebSocketClient extends EventDispatcher {
  constructor(url) {
    super();

    this.url = url;
    this.socket = null;
    this.connecting = null;
  }

  _emitMessage(data) {
    this.emit(CLIENT_SOCKET_MESSAGE, data);
  }

  _onSocketMessage({ data }) {
    this._emitMessage(data);
  }

  _onSocketClose(closeEvent) {
    this.disconnect();
    this.emit(CLIENT_SOCKET_CLOSE, closeEvent);
  }

  async _openSocket() {
    this.socket = await openSocket(this.url);
    this.socket.addEventListener(MESSAGE, (event) => this._onSocketMessage(event));
    this.socket.addEventListener(CLOSE, (event) => this._onSocketClose(event));
    return this;
  }

  disconnect() {
    if(this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  connect() {
    if(!this.socket && !this.connecting) {
      this.connecting = new Promise(async (resolve) => {
        resolve(await this._openSocket());
        this.emit(CLIENT_SOCKET_OPEN, this);
        this.connecting = null;
      });
    }
    return this.connecting;
  }

  async send(message) {
    if(!this.socket) {
      await this.connect();
    }
    this.socket.send(message);
  }
}

export default WebSocketClient;
