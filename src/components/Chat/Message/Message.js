import { useContext } from "react";
import moment from "moment";

import classnames from "classnames";
import { SocketContext } from "../../../contexts/socket";
import { AuthContext } from "../../../contexts/auth";
import styles from "./message.module.css";

export default function Message({ message }) {
    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const { userId, email } = auth;
    const { _id, body, user_id, createdAt } = message;

    const deleteHandler = (_id) => {
        if (_id) {
            socket.emit("delete:message", { _id });
        }
    };

    const messageStyle = classnames(styles.message, {
        [styles.ownMessage]: user_id._id === userId,
    });
    const deleteButtonStyle = classnames(styles.buttonStyle, {
        [styles.buttonDisabled]: user_id._id !== userId,
    });

    return (
        <li className={messageStyle}>
            <div
                className={styles.messageBody}
                title={`Sent by ${user_id.email} about ${moment(
                    createdAt
                ).fromNow()}`}
            >
                {user_id.email !== email ? (
                    <span className={styles.messageInfo}>
                        <strong>{user_id.email.split("@")[0]}</strong> says:
                    </span>
                ) : (
                    ""
                )}
                {body}
            </div>
            <button
                onClick={() => deleteHandler(_id)}
                className={deleteButtonStyle}
            >
                x
            </button>
        </li>
    );
}
