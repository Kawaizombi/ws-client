import WS from 'jest-websocket-mock';
import openSocket from '../';

describe('openSocket', () => {
  let server;

  beforeEach(() => {
    server = new WS('ws://localhost:1337');
  });

  afterEach(() => {
    server.close();
    WS.clean();
  });

  it('should open WebSocket for specified url resolve promise with websocket instance', async () => {
    const socket = await openSocket('ws://localhost:1337');

    expect(socket).toBeInstanceOf(WebSocket);
    expect(socket.readyState).toBe(WebSocket.OPEN);
  });

  it('should reject if server send error', async () => {
    const socketPromise = openSocket('ws://localhost:1337');

    server.error();
    await expect(socketPromise).rejects.toBeInstanceOf(WebSocket);
  });
});
