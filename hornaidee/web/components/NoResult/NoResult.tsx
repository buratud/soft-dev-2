import styles from './NoResult.module.scss';
import {FaBan} from "react-icons/fa6";

export default function NoResult() {
  return (
    <div className={styles.container}>
      <FaBan className={styles.icon} />
      <h1 className={styles.text}>No Result</h1>
    </div>
  );
}
