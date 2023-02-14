import { useLoaderData } from 'react-router-dom';
import { getFeedback } from '../api/firebase';
import Feedback from '../components/feedback';
import Body from '../components/ui/Body';
import styles from './FeedbackDetails.module.css';
import Comment from '../components/Comment';
import BackButton from '../components/ui/BackButton';
import LinkButton from '../components/ui/LinkButton';

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
            <LinkButton to='./edit' color='blue' state={{ feedback }}>
              Edit Feedback
            </LinkButton>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        <Feedback feedback={feedback} />
        <Body>
          {comments?.length > 0 ? (
            <>
              <div className={styles.commentLength}>
                {comments.length} Comments
              </div>
              <ul className={styles.comments}>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </ul>
            </>
          ) : (
            <div className={styles.commengLength}>No Comments yet!</div>
          )}
        </Body>
        <Body className={styles.addForm}>
          <div className={styles.addComment}>Add Comment</div>
          <textarea
            className={styles.textarea}
            placeholder='Type your comment here'
            maxLength='250'
          ></textarea>
          <div className={styles.footer}>
            <p>250 Characters left</p>
            <LinkButton>Post Comment</LinkButton>
          </div>
        </Body>
      </main>
    </>
  );
}
