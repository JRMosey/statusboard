import React, { useState } from "react";

function LoginForm({ onJoin }) {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === "") {
            alert("Veuillez entrer un nom");
            return;
        }

        onJoin(name);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Rejoindre StatusBoard</h2>

            <input
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Rejoindre</button>
        </form>
    );
}

export default LoginForm;