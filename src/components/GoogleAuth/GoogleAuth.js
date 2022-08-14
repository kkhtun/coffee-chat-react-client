import { useContext } from "react";
import styles from "./google-auth.module.css";
import app from "../../firebase";

// Context
import Loader from "../Loader/Loader";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { LoaderContext } from "../../contexts/loader";
import { fireError } from "../../helpers/alerts";

export default function GoogleAuth() {
    const { loading, setLoading } = useContext(LoaderContext);

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => signInWithPopup(getAuth(app), provider);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithGoogle();
            if (result) {
                console.log("You are successfully logged in!");
            } else {
                throw new Error("Something went wrong during login");
            }
            setLoading(false);
        } catch (e) {
            // trigger if user close the popup
            fireError(e.message || "Something went wrong during login");
            setLoading(false);
            console.log(e);
        }
    };

    return (
        <>
            <Loader show={loading} />
            <section className={styles.login}>
                <div className={styles.card}>
                    <span className={styles.cardTitle}>
                        Welcome to Coffee Chat!
                    </span>
                    <button
                        className={styles.btnLoginSwitch}
                        onClick={handleLogin}
                    >
                        Login via Google
                    </button>

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
