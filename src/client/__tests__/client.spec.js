import WS from 'jest-websocket-mock';
import WebSocketClient from '../';
import { CLIENT_SOCKET_MESSAGE } from '../event-types';

describe('WebSocketClient', () => {
  let server;
  let client;

  beforeEach(() => {
    server = new WS('ws://localhost:1337', { jsonProtocol: true });
  });


  beforeEach(() => {
    client = new WebSocketClient('ws://localhost:1337');
  });

  afterEach(() => {
    server.close();
    WS.clean();
  });

  it('should auto connect and send message', async () => {
    await client.send(JSON.stringify({ test: 'test' }));
    await client.send(JSON.stringify({ test: 'test1' }));

    await expect(server).toReceiveMessage({ test: 'test' });
    await expect(server).toReceiveMessage({ test: 'test1' });
  });

  it('should emit event on message', async () => {
    const listener = jest.fn();
    client.on(CLIENT_SOCKET_MESSAGE, listener);
    await client.connect();
    server.send({ test: 'test' });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(CLIENT_SOCKET_MESSAGE, JSON.stringify({ test: 'test' }));
  });

  it('should disconnect from server', async () => {
    await client.connect();
    const { socket } = client;
    client.disconnect();
    await server.closed;

    expect(socket.readyState).toBe(WebSocket.CLOSED);
  });
});
