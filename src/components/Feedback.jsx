import { Link } from 'react-router-dom';
import styles from './Feedback.module.css';
import CategoryButton from './ui/CategoryButton';
import CommentBubble from './ui/CommentBubble';
import UpvoteButton from './ui/UpvoteButton';

export default function Feedback({ feedback }) {
  const { id, title, description, category, upvotes, comments, likedUsers } =
    feedback;

  return (
    <li className={styles.feedback}>
      <div className={styles.bodyContainer}>
        <div className={styles.body}>
          <div className={styles.left}>
            <div>
              <Link to={`/feedbacks/${id}`} className={styles.title}>
                {title}
              </Link>
              <p className={styles.description}>{description}</p>
              <CategoryButton
                className={styles.categoryButton}
                disableInteraction
              >
                {category}
              </CategoryButton>
            </div>
            <div className={styles.upvoteContainer}>
              <div>
                <UpvoteButton
                  feedbackId={id}
                  likedUsers={likedUsers}
                  upvotes={upvotes}
                />
              </div>
            </div>
          </div>
          <div className={styles.commentContainer}>
            {comments && <CommentBubble>{comments?.length}</CommentBubble>}
          </div>
        </div>
      </div>
    </li>
  );
}
