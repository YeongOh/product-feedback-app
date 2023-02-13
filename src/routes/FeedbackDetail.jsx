import { useLoaderData } from 'react-router-dom';
import { getFeedback } from '../api/firebase';
import Feedback from '../components/feedback';
import Body from '../components/ui/Body';
import styles from './FeedbackDetails.module.css';
import Comment from '../components/Comment';
import BackButton from '../components/ui/BackButton';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/sectionTitle';

export async function loader({ params }) {
  return getFeedback(params.feedbackId);
}

export default function FeedbackDetail() {
  const feedback = useLoaderData();
  const { comments } = feedback;

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <BackButton />
          </li>
          <li>
            <Button color='blue'>Edit Feedback</Button>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <Feedback feedback={feedback} />
        <Body>
          {comments?.length > 0 ? (
            <>
              <SectionTitle>{comments.length} Comments</SectionTitle>
              <ul className={styles.comments}>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </ul>
            </>
          ) : (
            <SectionTitle>No Comments yet!</SectionTitle>
          )}
        </Body>
        <Body className={styles.addFeedback}>
          <SectionTitle>Add Comment</SectionTitle>
          <textarea></textarea>
        </Body>
      </main>
    </>
  );
}
