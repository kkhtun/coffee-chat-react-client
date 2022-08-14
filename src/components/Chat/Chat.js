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
import { LoaderContext } from "../../contexts/loader";
import { fireAlert } from "../../helpers/alerts";

export default function Chat() {
    const { socket } = useContext(SocketContext);
    const { setLoading } = useContext(LoaderContext);

    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState({});

    socket.on("list:channels", ({ data }) => {
        setChannels(data);
        setSelectedChannel(data[0] || {});
    });

    socket.on("new:channel", ({ data: newChannel }) => {
        setChannels([...channels, newChannel]);
        setLoading(false);
    });

    socket.on("deleted:channel", ({ _id }) => {
        if (selectedChannel._id === _id) {
            socket.emit("get:channels");
            fireAlert("This channel no longer exists!");
            setLoading(false);
        } else {
            setChannels(channels.filter(({ _id: chId }) => chId !== _id));
            setLoading(false);
        }
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
