import { error } from "console";
import type { WebSocket } from "ws";

export class ConnectionManager{
    private clients: Set<WebSocket>;

    constructor() {
        this.clients = new Set();
    }
    
    addClient(ws:WebSocket) {
        this.clients.add(ws);
        console.log(`Client added. Total clients: ${this.clients.size}`);
    }

    getClientCount() {
        return this.clients.size;
    }

    broadCastConnectionCount() {
        this.clients.forEach((client) => {
            if (client.readyState === client.OPEN) {
                try {
                    client.send(`No of users are: ${this.getClientCount()} `)
                } catch (err) {
                    console.log(
                        {
                            errorMessage: err,
                            client : client
                        }
                    )
                }
            }
        })
    }
}