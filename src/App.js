import "./App.css";
import { useContext, useEffect } from "react";
import Chat from "./components/Chat/Chat";
import GoogleAuth from "./components/GoogleAuth/GoogleAuth";
import { SocketContext } from "./contexts/socket";
import { AuthContext } from "./contexts/auth";
import { getAuth } from "firebase/auth";
import app from "./firebase";
import { io } from "socket.io-client";
import { host } from "./environment";

function App() {
    const { auth, setAuth } = useContext(AuthContext);
    const { socket, setSocket } = useContext(SocketContext);

    useEffect(() => {
        getAuth(app).onIdTokenChanged((user) => {
            const { displayName, email, accessToken, photoURL } = user || {};
            if (accessToken) {
                setAuth({
                    photoURL,
                    accessToken,
                    email,
                    name: displayName || "Anonymous",
                });
                console.log("Previous token found on storage, set to context");
                const socket = io(host, {
                    auth: {
                        token: accessToken,
                    },
                })
                    .on("connection", console.log)
                    .once("connect_error", console.error);
                setSocket(socket);
            } else {
                setAuth({});
            }
        });
    }, [setAuth, setSocket]);

    return (
        <div className="App">
            {auth.accessToken && socket ? <Chat /> : <GoogleAuth />}
        </div>
    );
}

export default App;
