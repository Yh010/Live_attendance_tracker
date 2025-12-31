import express, { type Request, type Response } from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { WSmsg } from './WebSocket/MessageType.js';
import { ConnectionManager } from './WebSocket/ConnectionManager.js';

const app = express();
const port = process.env.PORT || 3000;
let server = createServer(app);

app.use(express.json());
let wss = new WebSocketServer({server: server , path: "/attend"});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const connectionManager = new ConnectionManager();

wss.on(WSmsg.connection, (ws, req) => {
    console.log('WS connected on', req.url);
    //ws.send('Welcome to web socket server');
    connectionManager.addClient(ws);
    connectionManager.broadCastConnectionCount();

    ws.on(WSmsg.close, function () {
        connectionManager.removeClient(ws);
        connectionManager.broadCastConnectionCount();
    })
});



server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});