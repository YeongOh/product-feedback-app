import { useLoaderData } from 'react-router-dom';
import { getFeedback } from '../api/firebase';
import Feedback from '../components/feedback';
import Body from '../components/ui/Body';
import styles from './FeedbackDetails.module.css';
import Comment from '../components/Comment';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';

export async function loader({ params }) {
  return getFeedback(params.feedbackId);
}

export default function FeedbackDetail() {
  const feedback = useLoaderData();
  const { comments } = feedback;

  return (
    <main className={styles.main}>
      <nav>
        <ul className={styles.ul}>
          <li>
            <BackButton />
          </li>
          <li>
            <Button color='blue'>Edit Feedback</Button>
          </li>
        </ul>
      </nav>
      <Feedback feedback={feedback} />
      <Body>
        {comments?.length > 0 ? (
          <>
            <div className={styles.numberOfComments}>
              {comments.length} Comments
            </div>
            <ul className={styles.comments}>
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ul>
          </>
        ) : (
          <div className={styles.comments}>No Comments yet!</div>
        )}
      </Body>
    </main>
  );
}
