import styles from "./channel-list.module.css";
import classnames from "classnames";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../contexts/socket";
export default function ChannelList({ channels, setChannel, selectedChannel }) {
    const { socket } = useContext(SocketContext);
    useEffect(() => {
        if (selectedChannel) {
            socket.emit("join:room", { channelId: selectedChannel._id });
        }
    }, [socket, selectedChannel]);
    return (
        <>
            <ul className={styles.channelList}>
                {channels
                    ? channels.map((channel) => (
                          <li
                              key={channel._id}
                              className={classnames(styles.channelItem, {
                                  [styles.activeChannelItem]:
                                      channel._id === selectedChannel._id,
                              })}
                              onClick={() => setChannel(channel)}
                          >
                              {channel.name}
                          </li>
                      ))
                    : "Loading Channels..."}
            </ul>
        </>
    );
}
