import express, { type Request, type Response } from 'express';
import cors from "cors";
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { WSmsg } from './WebSocket/MessageType.js';
import { ConnectionManager } from './WebSocket/ConnectionManager.js';
import ClassRoomManager from './Types/Class.js';

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
const port = process.env.PORT || 3000;
let server = createServer(app);

let activeClassManager = new ClassRoomManager();

app.use(express.json());
let wss = new WebSocketServer({server: server , path: "/attend"});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/getactiveclass', (req, res) => {
    if (activeClassManager.getClassId() !== "") {
        const response = {
            "success": "true",
            "data": {
                classId: activeClassManager.getClassId() 
            }
        }
        console.log("/getactiveclass response is", response)
        res.send(response)
    } else {
         const response = {
            "success": "true",
            "data": {
                classId: "",
            }
        }
        console.log("/getactiveclass response is", response)
        res.send(response)
    };
})

app.post("/createnewclass", (req, res) => {
    const { className } = req.body;
    try {
        activeClassManager.createNewClass(className);
        console.log("created new class", className)
        res.send({
            "success": "true",
            "data": {
                message: "Created new class"
            }
        })
    } catch (error) {
        console.log("error while creating new class", error)
        res.send({
            "success": "false",
            "data": {
                message: error
            }
        })
    }
})

const connectionManager = new ConnectionManager();

wss.on(WSmsg.connection, (ws, req) => {
    console.log('WS connected on', req.url);
    connectionManager.addClient(ws);
    connectionManager.broadCastConnectionCount();

    ws.on(WSmsg.close, function () {
        connectionManager.removeClient(ws);
        connectionManager.broadCastConnectionCount();
    })

    ws.on(WSmsg.message, function (raw) {
        const msg = JSON.parse(raw.toString());

        switch (msg.type) {
            case "custom":
                ws.send(
                    JSON.stringify({
                        type: "custom:response",
                        payload: "hey there",
                    })
                );
                break; 
            case "createUser":
                
        }
    })
});



server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});