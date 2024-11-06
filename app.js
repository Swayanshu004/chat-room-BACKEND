import express from "express"
import { Server } from "socket.io";
import HTTP from "http"

const PORT = 3000;
const app = express();
const server = HTTP.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.get('/', (req, res)=>{
    res.send("HELLO FROM CODINGAASHRAM - SERVER")
})
io.on("connection",(socket)=>{
    console.log("Client Id : ",socket.id);
    socket.on("message", (data) => {
        console.log(data);
        // socket.broadcast.emit("receive-message", data);
        io.to(data.room).emit("receive-message", data.message);
    });
    socket.on("join-room", (room) => {
        socket.join(room);
    });
})

server.listen(PORT, ()=>{
    console.log("Server Started listening !! ",PORT);
})