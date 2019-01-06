## ws-client: simple websocket client

### Usage

###### Basic ws client (raw)
```js
import { WebSocketClient, Events } from 'ws-client';
const client = new WebSocketClient(url);
client.connect().then(() => console.log('Connected!'));
```
```js
import { WebSocketClient, Events } from 'ws-client';

const client = new WebSocketClient(url);
client.send('test'); // client.connect() will be called automatic before sending

client.on(Events.CLIENT_SOCKET_MESSAGE, (eventType, message) => console.log(message));
```

###### Middleware ws client (json, blob, arrayBuffer)
```js
import { WebSocketClientWithMiddleware, Events } from 'ws-client';

const client = new WebSocketClientWithMiddleware(url, {
  middleware: {
    pack: [JSON.stringify],
    unpack: [JSON.parse],
  }
});

client.send({ toServer: 'some data' });

client.on(Events.CLIENT_SOCKET_MESSAGE, (eventType, message) => console.log(message.fromSever));
```

### API
* EventDispatcher
    * on(eventType, listener, once?)
    * off(eventType, listener)
    * once(eventType, listener)
    * emit(eventType)

* WebSocketClient extends EventDispatcher
    * new WebSocketClient(url)
    * send(message)
    * connect()
    * disconnect()
    * socket
    
* WebSocketClientWithMiddleware extends WebSocketClient
    * new WebSocketClientWithMiddleware(url, [options])
    
#### EventDispatcher
###### EventDispatcher.on(eventType: string, listener: Function, once?: boolean)
Register event listener
###### EventDispatcher.off(eventType: string, listener: Function)
Unregister event listener
###### EventDispatcher.once(eventType: string, listener: Function)
Register one time event listener
###### EventDispatcher.emit(eventType: string)
Trigger listeners of specific type


#### WebSocketClient(url: string)
###### WebSocketClient.send(message: string)
Send message to server
###### WebSocketClient.connect(): Promise\<this\>
Connect to server, return promise that will be resolved after connection
###### WebSocketClient.disconnect()
Disconnect from server
##### WebSocketClient.socket
WebSocket reference 

#### WebSocketClientWithMiddleware(url: string, options)
###### options.middleware
###### options.middleware.pack: Function[]
Chain of functions that will be called before message send to server
###### options.middleware.unpack: Function[] 
Chain of functions that will be called before emitting CLIENT_SOCKET_MESSAGE
