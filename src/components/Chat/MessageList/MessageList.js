import { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../../../contexts/socket";
import { AuthContext } from "../../../contexts/auth";
import Message from "../Message/Message";

import styles from "./message-list.module.css";

export default function MessageList({ channel }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const scrollRef = useRef();
    const { _id: channelId } = channel;

    const { socket } = useContext(SocketContext);
    const { auth } = useContext(AuthContext);
    const { userId } = auth;

    useEffect(() => {
        // get and receive messages
        socket.emit("get:messages", { channelId });
        scrollRef.current && scrollRef.current.scrollTo(0, 0);
    }, [socket, channelId]);

    socket.on("list:messages", ({ data }) => {
        setMessages([...data]);
    });

    socket.on("list:more-messages", ({ data }) => {
        setMessages([...messages, ...data]);
    });

    socket.on("new:message", ({ data }) => {
        setMessages([data, ...messages]);
    });

    socket.on("deleted:message", ({ data: _id }) => {
        setMessages(messages.filter((msg) => msg._id !== _id));
    });

    const submitHandler = (e) => {
        e.preventDefault();
        if (text !== "") {
            socket.emit("send:message", {
                body: text,
                channel_id: channelId,
                user_id: userId,
            });
            scrollRef.current && scrollRef.current.scrollTo(0, 0);
            setText("");
        }
    };

    const onScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (Math.abs(scrollTop) + clientHeight === scrollHeight) {
                socket.emit("get:more-messages", {
                    channelId,
                    skip: messages.length,
                });
            }
        }
    };

    return (
        <div>
            <section className={styles.messageContainer}>
                <ul
                    className={styles.messageList}
                    ref={scrollRef}
                    onScroll={onScroll}
                >
                    {messages
                        ? messages.map((msg) => (
                              <Message message={msg} key={msg._id} />
                          ))
                        : "Loading Messages..."}
                </ul>
            </section>
            <form onSubmit={submitHandler} className={styles.inputForm}>
                <input
                    className={styles.inputText}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something in wheat and coffee"
                />
                <button type="submit" className={styles.sendButton}>
                    Send
                </button>
            </form>
        </div>
    );
}
