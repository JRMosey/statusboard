import React from "react";

function MemberCard({ member, isCurrentUser, onChangeStatus }) {
    const statusColors = {
        "En ligne": "green",
        "Absent": "orange",
        "Occupé": "red"
    };

    return (
        <div className="member-card">
            <h3>{member.name}</h3>

            <p style={{ color: statusColors[member.status] }}>
                ● {member.status}
            </p>

            {isCurrentUser && (
                <div>
                    <button onClick={() => onChangeStatus("En ligne")}>En ligne</button>
                    <button onClick={() => onChangeStatus("Absent")}>Absent</button>
                    <button onClick={() => onChangeStatus("Occupé")}>Occupé</button>
                </div>
            )}
        </div>
    );
}

export default MemberCard;