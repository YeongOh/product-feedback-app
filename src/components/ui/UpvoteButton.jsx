import styles from './UpvoteButton.module.css';
import { ReactComponent as ArrowUp } from '../../assets/shared/icon-arrow-up.svg';

export default function UpvoteButton({ children }) {
  return (
    <button className={styles.button}>
      <ArrowUp /> {children}
    </button>
  );
}
