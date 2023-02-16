import { useLoaderData } from 'react-router-dom';
import { addComment, getFeedback } from '../api/firebase';
import Feedback from '../components/feedback';
import Body from '../components/ui/Body';
import styles from './FeedbackDetails.module.css';
import Comment from '../components/Comment';
import BackButton from '../components/ui/BackButton';
import LinkButton from '../components/ui/LinkButton';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';

export async function loader({ params }) {
  return getFeedback(params.feedbackId);
}

export default function FeedbackDetail() {
  const { currentUser } = useAuthContext();
  const uid = currentUser?.uid ?? '';
  const feedback = useLoaderData();
  const { comments, uid: postUid } = feedback;
  const [commentText, seCommentText] = useState('');

  const handleClick = async (event) => {
    event.preventDefault();
    if (!currentUser) return;

    await addComment(feedback.id, currentUser, commentText);
    return;
  };

  console.log(comments);

  return (
    <>
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
          <form>
            <textarea
              className={styles.textarea}
              placeholder='Type your comment here'
              value={commentText}
              onChange={(event) => seCommentText(event.target.value)}
              maxLength='250'
            ></textarea>
            <div className={styles.footer}>
              <p>{250 - commentText.length} Characters left</p>
              <button
                className={styles.submitButton}
                onClick={handleClick}
                type='submit'
              >
                Post Comment
              </button>
            </div>
          </form>
        </Body>
      </main>
    </>
  );
}
