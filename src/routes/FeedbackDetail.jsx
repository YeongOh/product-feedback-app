import { useLoaderData } from 'react-router-dom';
import { getFeedback } from '../api/firebase';
import styles from './FeedbackDetails.module.css';
import BackButton from '../components/ui/BackButton';
import LinkButton from '../components/ui/LinkButton';
import { useAuthContext } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';
import Feedback from '../components/Feedback';

export async function loader({ params }) {
  const feedback = await getFeedback(params.feedbackId);
  const commentsArray = feedback.comments
    ? Object.values(feedback.comments)
    : [];
  return { ...feedback, comments: commentsArray };
}

export default function FeedbackDetail() {
  const { currentUser } = useAuthContext();
  const uid = currentUser?.uid ?? '';
  const feedback = useLoaderData();
  const { uid: postUid } = feedback;

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <BackButton />
          </li>
          <li>
            {uid && uid === postUid && (
              <LinkButton to='./edit' color='blue' state={{ feedback }}>
                Edit Feedback
              </LinkButton>
            )}
          </li>
        </ul>
      </nav>

      <main className={styles.main}>
        <Feedback feedback={feedback} />
        <CommentSection feedback={feedback} />
      </main>
    </div>
  );
}
