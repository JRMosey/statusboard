const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://statusboard-silk.vercel.app"
];

app.use(
    cors({
        origin: allowedOrigins
    })
);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    }
});

let members = [];
let history = [];
let messages = [];

app.get("/", (req, res) => {
    res.send("StatusBoard backend is running");
});

function addHistory(text) {
    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    history.push({ text, time });
    io.emit("history:update", history);
}

io.on("connection", (socket) => {
    console.log("Utilisateur connecté :", socket.id);

    socket.on("user:join", ({ name }) => {
        const member = {
            id: socket.id,
            name,
            status: "En ligne"
        };

        members.push(member);

        addHistory(`${name} a rejoint le board`);
        io.emit("members:update", members);
    });

    socket.on("status:change", ({ status }) => {
        const member = members.find((m) => m.id === socket.id);

        if (member) {
            member.status = status;
            addHistory(`${member.name} a changé son statut vers ${status}`);
            io.emit("members:update", members);
        }
    });

    socket.on("message:send", ({ message }) => {
        const member = members.find((m) => m.id === socket.id);

        if (member && message.trim() !== "") {
            const newMessage = {
                name: member.name,
                message,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            };

            messages.push(newMessage);
            io.emit("messages:update", messages);
        }
    });

    socket.on("disconnect", () => {
        const member = members.find((m) => m.id === socket.id);

        if (member) {
            addHistory(`${member.name} a quitté le board`);
        }

        members = members.filter((m) => m.id !== socket.id);
        io.emit("members:update", members);
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});