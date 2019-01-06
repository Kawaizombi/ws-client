import WebSocketClient from '../client';
import combineMiddleware from './combine-middleware';

class WebSocketClientWithMiddleware extends WebSocketClient {
  constructor(url, { middleware: { pack = [], unpack = [] } = {} } = {}) {
    super(url);
    this.packMiddleware = combineMiddleware(pack);
    this.unpackMiddleware = combineMiddleware(unpack);
  }

  toServerTransform(message) {
    return this.packMiddleware(message);
  }

  fromServerTransform(data) {
    return this.unpackMiddleware(data);
  }

  _emitMessage(data) {
    super._emitMessage(this.fromServerTransform(data));
  }

  async send(message) {
    return super.send(this.toServerTransform(message));
  }
}

export default WebSocketClientWithMiddleware;
