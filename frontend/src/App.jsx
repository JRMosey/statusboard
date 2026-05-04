import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LoginForm from "./components/LoginForm.jsx";
import StatusBoard from "./components/StatusBoard.jsx";
import "./App.css";

const socket = io(import.meta.env.VITE_SOCKET_URL);

function App() {
    const [joined, setJoined] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");
    const [members, setMembers] = useState([]);
    const [history, setHistory] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            setCurrentUserId(socket.id);
        });

        socket.on("members:update", (data) => {
            setMembers(data);
        });

        socket.on("history:update", (data) => {
            setHistory(data);
        });

        socket.on("messages:update", (data) => {
            setMessages(data);
        });

        return () => {
            socket.off("connect");
            socket.off("members:update");
            socket.off("history:update");
            socket.off("messages:update");
        };
    }, []);

    const handleJoin = (name) => {
        socket.emit("user:join", { name });
        setJoined(true);
    };

    const handleChangeStatus = (status) => {
        socket.emit("status:change", { status });
    };

    const handleSendMessage = (message) => {
        socket.emit("message:send", { message });
    };

    return (
        <div className="app">
            {!joined ? (
                <LoginForm onJoin={handleJoin} />
            ) : (
                <StatusBoard
                    members={members}
                    currentUserId={currentUserId}
                    onChangeStatus={handleChangeStatus}
                    history={history}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                />
            )}
        </div>
    );
}

export default App;