import styles from "./header.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth";

export default function Header() {
    const { auth, setAuth } = useContext(AuthContext);

    const logoutHandler = async () => {
        await localStorage.clear();
        setAuth({});
    };

    return (
        <section className={styles.header}>
            <button onClick={logoutHandler} className={styles.logoutButton}>
                Logout
            </button>
            <span className={styles.title}>
                Welcome To Coffee Chat - {auth ? auth.email : "Unknown"}
            </span>
        </section>
    );
}
