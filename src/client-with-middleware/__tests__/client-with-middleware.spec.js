import WS from 'jest-websocket-mock';
import WebSocketClientWithMiddleware from '../';
import { CLIENT_SOCKET_MESSAGE } from '../../client/event-types';

describe('WebSocketClientWithMiddleware', () => {
  let server;
  let client;

  beforeEach(() => {
    server = new WS('ws://localhost:1337', { jsonProtocol: true });
  });


  beforeEach(() => {
    client = new WebSocketClientWithMiddleware('ws://localhost:1337', {
      middleware: {
        pack: [JSON.stringify],
        unpack: [JSON.parse],
      },
    });
  });

  afterEach(() => {
    server.close();
    WS.clean();
  });


  it('should use middleware to transform data to and from server', async () => {
    const listener = jest.fn();
    client.on(CLIENT_SOCKET_MESSAGE, listener);
    client.send({ test: 'test' });
    await client.connect();
    server.send({ test: 1337 });

    await expect(server).toReceiveMessage({ test: 'test' });
    expect(listener).toBeCalledWith(CLIENT_SOCKET_MESSAGE, { test: 1337 });
  });
});
