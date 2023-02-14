import { Link } from 'react-router-dom';
import styles from './Feedback.module.css';
import Body from './ui/Body';
import CategoryButton from './ui/CategoryButton';
import CommentBubble from './ui/CommentBubble';
import UpvoteButton from './ui/UpvoteButton';

export default function Feedback({ feedback }) {
  const { id, title, description, category, upvotes, comments } = feedback;
  return (
    <li className={styles.feedback}>
      <Body>
        <Link to={`feedbacks/${id}`} className={styles.title}>
          {title}
        </Link>
        <p className={styles.description}>{description}</p>
        <CategoryButton className={styles.categoryButton}>
          {category}
        </CategoryButton>
        <div className={styles.footer}>
          <UpvoteButton>{upvotes}</UpvoteButton>
          {comments && <CommentBubble>{comments?.length}</CommentBubble>}
        </div>
      </Body>
    </li>
  );
}
