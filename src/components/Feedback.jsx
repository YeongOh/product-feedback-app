import styles from './Feedback.module.css';
import CategoryButton from './ui/CategoryButton';
import CommentBubble from './ui/CommentBubble';
import UpvoteButton from './ui/UpvoteButton';

export default function Feedback({ feedback }) {
  const { title, description, category, upvotes, comments } = feedback;
  return (
    <li className={styles.feedback}>
      <div className={styles.title}>{title}</div>
      <p className={styles.description}>{description}</p>
      <CategoryButton className={styles.categoryButton}>
        {category}
      </CategoryButton>
      <div className={styles.footer}>
        <UpvoteButton>{upvotes}</UpvoteButton>
        <CommentBubble>{comments?.length}</CommentBubble>
      </div>
    </li>
  );
}
