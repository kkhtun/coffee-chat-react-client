import { GoogleLogin } from "react-google-login";
import { host } from "../../environment";
import { useContext, useState } from "react";
import styles from "./google-auth.module.css";

// Context
import { AuthContext } from "../../contexts/auth";
import { initializeSocket, SocketContext } from "../../contexts/socket";
import Loader from "../Loader/Loader";

export default function GoogleAuth() {
    const [loading, setLoading] = useState(false);
    const { setAuth } = useContext(AuthContext);
    const { setSocket } = useContext(SocketContext);

    const handleLogin = async (googleData) => {
        if (googleData.error) return;
        setLoading(true);
        const data = await fetch(`${host}/auth/google`, {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        // store returned auth info in localStorage
        const { token, userId, email } = data;
        if (token && userId && email) {
            setLoading(false);
            await localStorage.setItem(
                "chat-auth",
                JSON.stringify({ token, userId, email })
            );
            setSocket(initializeSocket({ token }));
            setAuth({ token, userId, email });
        } else {
            window.alert("Something went wrong during login");
            window.location.reload();
        }
    };

    const handleFailure = (err) => {
        console.log("Login Failed ", err);
    };

    return (
        <>
            <Loader show={loading} />
            <section className={styles.login}>
                <div className={styles.card}>
                    <span className={styles.cardTitle}>
                        Welcome to Coffee Chat!
                    </span>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                    <div className={styles.loginNotice}>
                        <span>Notice: </span>
                        <ul>
                            <li>
                                By logging in, you agree to share your email and
                                google username.
                            </li>
                            <li>
                                I have used free heroku tiers to host this
                                development version of the chat, therefore it
                                might be slow and you may experience long
                                loading times compared to your typical
                                run-of-the-mill social media chat. I'm sorry for
                                the inconvenience.
                            </li>
                            <li>
                                The Chat is still in development, therefore you
                                may experience errors, please kindly report
                                errors to me to help with the development, your
                                help is greatly appreciated!
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
