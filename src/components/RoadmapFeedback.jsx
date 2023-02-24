import { Link } from 'react-router-dom';
import styles from './RoadmapFeedback.module.css';
import CategoryButton from './ui/CategoryButton';
import CommentBubble from './ui/CommentBubble';
import StatusTag from './ui/StatusTag';
import UpvoteButton from './ui/UpvoteButton';

export default function Feedback({ feedback }) {
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
  const statusClass = getStatusClassName(status);

  return (
    <li className={styles.feedback}>
      <div className={styles.bodyContainer}>
        <div className={`${styles.body} ${statusClass}`}>
          <div>
            <StatusTag status={status} />
            <Link to={`/feedbacks/${id}`} className={styles.title}>
              {title}
            </Link>
            <p className={styles.description}>{description}</p>
            <div>
              <div>
                <CategoryButton
                  className={styles.categoryButton}
                  disableInteraction
                >
                  {category}
                </CategoryButton>
              </div>
              <div className={styles.footer}>
                <div className={styles.mobile}>
                  <UpvoteButton
                    feedbackId={id}
                    likedUsers={likedUsers}
                    upvotes={upvotes}
                    isInRoadmap
                  />
                </div>
                {comments && <CommentBubble>{comments?.length}</CommentBubble>}
              </div>
            </div>
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
