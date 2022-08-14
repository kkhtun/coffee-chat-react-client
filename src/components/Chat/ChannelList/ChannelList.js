import styles from "./channel-list.module.css";
import classnames from "classnames";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../contexts/socket";
import { LoaderContext } from "../../../contexts/loader";
import { fireConfirm, fireError, firePrompt } from "../../../helpers/alerts";
export default function ChannelList({ channels, setChannel, selectedChannel }) {
    const { socket } = useContext(SocketContext);
    const { setLoading } = useContext(LoaderContext);
    useEffect(() => {
        if (selectedChannel) {
            socket.emit("join:room", { channelId: selectedChannel._id });
        }
    }, [socket, selectedChannel]);

    const createChannel = async () => {
        const { isConfirmed, value } = await firePrompt(
            "Give channel a name..."
        );
        if (!isConfirmed) return;
        if (!value) return fireError("Please fill a name!");
        setLoading(true);
        socket.emit("create:channel", { name: value });
    };

    const deleteChannel = async (_id) => {
        const { isConfirmed } = await fireConfirm(
            "Are you sure you want to remove this channel?"
        );
        if (isConfirmed) {
            setLoading(true);
            socket.emit("delete:channel", { _id });
        }
    };
    return (
        <>
            <button
                onClick={createChannel}
                className={styles.createChannelButton}
            >
                New +{" "}
            </button>
            <ul className={styles.channelList}>
                {channels
                    ? channels.map((channel) => (
                          <li
                              key={channel._id}
                              className={classnames(styles.channelItem, {
                                  [styles.activeChannelItem]:
                                      channel._id === selectedChannel._id,
                              })}
                          >
                              <button
                                  className={styles.deleteChannelButton}
                                  onClick={() => deleteChannel(channel._id)}
                                  title="Remove Channel"
                              >
                                  &#9746;
                              </button>
                              <span onClick={() => setChannel(channel)}>
                                  \{channel.name}
                              </span>
                          </li>
                      ))
                    : "Loading Channels..."}
            </ul>
        </>
    );
}
