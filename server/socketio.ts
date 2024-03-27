import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';

export class SocketioServer {
    public static instance: SocketioServer;

    public io: Server;

    constructor(httpServer: HttpServer) {
        SocketioServer.instance = this;
        this.io = new Server(httpServer, {
            cors: {
                origin: 'http://localhost:3000',
            },
        });
        this.io.listen(3000);
        this.io.on('connection', (socket: Socket) => {
            console.log('a user connected');
        }); 
    }

    public emit(event: string, data: any) {
        this.io.emit(event, data);
    }
}
