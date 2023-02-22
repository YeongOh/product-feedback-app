import { Link } from 'react-router-dom';
import styles from './Feedback.module.css';
import Body from './ui/Body';
import CategoryButton from './ui/CategoryButton';
import CommentBubble from './ui/CommentBubble';
import StatusTag from './ui/StatusTag';
import UpvoteButton from './ui/UpvoteButton';

export default function Feedback({ feedback, isInRoadmap }) {
  const {
    id,
    title,
    description,
    category,
    upvotes,
    comments,
    likedUsers,
    status,
  } = feedback;
  const statusClass = isInRoadmap && getStatusClassName(status);

  return (
    <li className={styles.feedback}>
      <div className={styles.bodyContainer}>
        <div className={`${styles.body} ${statusClass}`}>
          {isInRoadmap && <StatusTag status={status} />}
          <Link to={`/feedbacks/${id}`} className={styles.title}>
            {title}
          </Link>
          <p className={styles.description}>{description}</p>
          <CategoryButton className={styles.categoryButton}>
            {category}
          </CategoryButton>
          <div className={styles.footer}>
            <UpvoteButton
              feedbackId={id}
              likedUsers={likedUsers}
              upvotes={upvotes}
            />
            {comments && <CommentBubble>{comments?.length}</CommentBubble>}
          </div>
        </div>
      </div>
    </li>
  );
}

function getStatusClassName(status) {
  let statusClass = '';
  if (status === 'in-progress') statusClass = styles.inProgress;
  if (status === 'planned') statusClass = styles.planned;
  if (status === 'live') statusClass = styles.live;
  return statusClass;
}
