import socketClient from "socket.io-client";
import { host } from "../environment";
import { createContext } from "react";

export const initializeSocket = ({ token }) => {
    console.log("Init Socket Client");
    return socketClient(host, {
        auth: {
            token,
        },
    });
};
export const SocketContext = createContext({
    socket: {},
    setSocket: (socket) => {},
});
