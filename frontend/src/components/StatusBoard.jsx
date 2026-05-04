import React, { useState } from "react";
import MemberCard from "./MemberCard.jsx";

function StatusBoard({
                         members,
                         currentUserId,
                         onChangeStatus,
                         history,
                         messages,
                         onSendMessage
                     }) {
    const [message, setMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();

        if (message.trim() === "") return;

        onSendMessage(message);
        setMessage("");
    };

    return (
        <div>
            <h1>StatusBoard</h1>

            <h2>Membres connectés</h2>

            <div>
                {members.map((member) => (
                    <MemberCard
                        key={member.id}
                        member={member}
                        isCurrentUser={member.id === currentUserId}
                        onChangeStatus={onChangeStatus}
                    />
                ))}
            </div>

            <hr />

            <h2>Message global</h2>

            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Écrire un message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Envoyer</button>
            </form>

            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.name}</strong> : {msg.message}{" "}
                        <small>({msg.time})</small>
                    </p>
                ))}
            </div>

            <hr />

            <h2>Historique</h2>

            <ul>
                {history.map((event, index) => (
                    <li key={index}>
                        {event.text} à {event.time}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StatusBoard;