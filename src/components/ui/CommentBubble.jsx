import styles from './CommentBubble.module.css';
import { ReactComponent as BubbleIcon } from '../../assets/shared/icon-comments.svg';

export default function CommentBubble({ children }) {
  return (
    <div className={styles.container}>
      <BubbleIcon />
      <span className={styles.number}>{children}</span>
    </div>
  );
}
