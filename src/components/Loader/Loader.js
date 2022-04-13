import styles from "./loader.module.css";
import loader from "../../loader.gif";
export default function Loader({ show }) {
    return (
        <>
            {show ? (
                <div className={styles.loader}>
                    <img src={loader} alt="loader" />
                    &nbsp;<span>Loading</span>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
