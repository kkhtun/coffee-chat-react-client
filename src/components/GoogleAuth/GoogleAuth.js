import { GoogleLogin } from "react-google-login";
import { host } from "../../environment";
import { useContext } from "react";

// Context
import { AuthContext } from "../../contexts/auth";
import { initializeSocket, SocketContext } from "../../contexts/socket";

export default function GoogleAuth() {
    const { setAuth } = useContext(AuthContext);
    const { setSocket } = useContext(SocketContext);

    const handleLogin = async (googleData) => {
        if (googleData.error) return;

        const res = await fetch(`${host}/auth/google`, {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // store returned auth info in localStorage
        const { token, userId, email } = await res.json();
        if (token && userId && email) {
            await localStorage.setItem(
                "chat-auth",
                JSON.stringify({ token, userId, email })
            );
            setSocket(initializeSocket({ token }));
            setAuth({ token, userId, email });
        } else {
            window.alert("Something went wrong during login");
        }
    };

    return (
        <>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={"single_host_origin"}
            />
        </>
    );
}
