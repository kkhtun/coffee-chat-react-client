import "./App.css";
import { useEffect, useState } from "react";
import Chat from "./components/Chat/Chat";
import GoogleAuth from "./components/GoogleAuth/GoogleAuth";
import { initializeSocket, SocketContext } from "./contexts/socket";
import { AuthContext } from "./contexts/auth";

function App() {
    const [auth, setAuth] = useState({});
    const [socket, setSocket] = useState({});

    useEffect(() => {
        const checkIfAuthExists = async () => {
            let localStorageAuth = await localStorage.getItem("chat-auth");
            let { token, email, userId } = localStorageAuth
                ? JSON.parse(localStorageAuth)
                : {};
            if (token && email && userId) {
                setAuth({ token, email, userId });
                setSocket(initializeSocket({ token }));
            } else {
                setAuth({});
            }
        };
        checkIfAuthExists();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <SocketContext.Provider value={{ socket, setSocket }}>
                <div className="App">
                    {auth.token && socket ? <Chat /> : <GoogleAuth />}
                </div>
            </SocketContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
