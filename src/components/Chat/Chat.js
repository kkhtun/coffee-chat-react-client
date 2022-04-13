// Libs
import { useEffect, useState, useContext } from "react";

// Styles and Configs
import styles from "./chat.module.css";

// Components
import ChannelList from "./ChannelList/ChannelList";
import MessageList from "./MessageList/MessageList";
import Header from "./Header/Header";

// Context
import { SocketContext } from "../../contexts/socket";

export default function Chat() {
    const { socket } = useContext(SocketContext);

    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState({});

    socket.on("list:channels", ({ data }) => {
        setChannels(data);
        setSelectedChannel(data[0] || {});
    });

    useEffect(() => {
        socket.emit("get:channels");
    }, [socket]);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <section className={styles.channelList}>
                    <ChannelList
                        channels={channels}
                        selectedChannel={selectedChannel}
                        setChannel={setSelectedChannel}
                    />
                </section>
                <section className={styles.messageList}>
                    {selectedChannel ? (
                        <MessageList channel={selectedChannel} />
                    ) : (
                        "Loading Messages..."
                    )}
                </section>
            </div>
        </>
    );
}
