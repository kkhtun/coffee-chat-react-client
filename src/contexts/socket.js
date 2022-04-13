import socketClient from "socket.io-client";
import { host } from "../environment";
import { createContext } from "react";

const connectErrHandler = async (err) => {
    window.alert("Cannot connect to server, please login again!");
    localStorage.clear();
    window.location.reload();
};

export const initializeSocket = ({ token }) => {
    console.log("Init Socket Client");
    return socketClient(host, {
        auth: {
            token,
        },
    }).once("connect_error", connectErrHandler);
};
export const SocketContext = createContext({
    socket: {},
    setSocket: (socket) => {},
});
