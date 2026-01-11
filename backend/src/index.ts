import dotenv from "dotenv";
dotenv.config();
import express, { type Request, type Response } from 'express';
import cors from "cors";
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { WSmsg } from './WebSocket/MessageType.js';
import { ConnectionManager } from './WebSocket/ConnectionManager.js';
import ClassRoomManager from './Types/ClassRoomManager.js';
import UsersManager from './Types/UsersManager.js';

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
const port = process.env.PORT || 3000;
let server = createServer(app);

let activeClassManager = new ClassRoomManager();
let userManager = new UsersManager();

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

app.get('/getattendees', (req, res) => {
    try {
        const attendees = activeClassManager.getAttendeesDTO();
        res.send({
            "success": "true",
            "data": {
                attendees,
            }
        })
        
    } catch (error) {
        console.log("error while fetching attendees", error)
        res.send({
            "success": "false",
            "data": {
                message: error
            }
        })
    }
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

app.post("/createnewuser", async (req, res) => {
    const { name,email,password,role } = req.body;
    try {
        await userManager.createUser(name, email, password, role);
        console.log("created new user with email", email)
        res.send({
            "success": "true",
            "data": {
                message: "Created new user"
            }
        })
    } catch (error) {
        console.log("error while creating new user", error)
        res.send({
            "success": "false",
            "data": {
                message: error
            }
        })
    }
})

app.post('/joinclass', (req, res) => {
    const { userId, className } = req.body;    
    //todo: validation/check for whether a student | teacher | guest
    //1) get the user details first
    //2) then add to class
    try {
        const user = userManager.getUserById(userId); 
        const uId = user?.getId() || "";
        const uName = user?.getName() || "";
        const uEmail = user?.getEmail() || "";
        const uRole = user?.getUserRole() || "";
        const newAttendee = activeClassManager.addAttendee(uId, uName, uEmail, uRole, className);
        res.send({
            "success": "true",
            "data": {
                message: `New user added ${newAttendee}`
            }
        })
        
    } catch (error) {
        console.log("error while joining class", error)
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