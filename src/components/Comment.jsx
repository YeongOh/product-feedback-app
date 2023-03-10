import { useState } from 'react';
import { replyComment } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import styles from './Comment.module.css';
import Reply from './Reply';
import UserProfile from './ui/UserProfile';

export default function Comment({ comment, feedbackId }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuthContext();

  const repliesArray = comment.replies ? Object.values(comment.replies) : [];
  const [replies, setReplies] = useState(repliesArray);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) return setError('Please login to reply');
    if (replyText.trim() === '') return setError(`Reply can't be empty!`);
    const newReply = await replyComment(
      feedbackId,
      comment,
      currentUser,
      replyText
    );
    setReplies([...replies, newReply]);

    setReplyText('');
    setIsReplying(false);
  };

  const handleAddReply = (newReply) => {
    setReplies([...replies, newReply]);
  };

  return (
    <li className={styles.comment}>
      <div className={styles.header}>
        <UserProfile user={comment.user} />
        <button
          className={styles.button}
          type='button'
          onClick={() => setIsReplying((prev) => !prev)}
        >
          Reply
        </button>
      </div>

      <div
        className={`${replies.length > 0 && styles.border} ${
          styles.contentContainer
        }`}
      >
        <p className={styles.content}>{comment.content}</p>
        {isReplying && (
          <>
            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                className={`${styles.replyTextarea} ${
                  error && styles.errorFocus
                }`}
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                maxLength='250'
              />
              {error && <p className={styles.error}>{error}</p>}
              <div>
                <button
                  className={`${styles.submitButton} ${styles.submitReply}`}
                  type='submit'
                >
                  Post Reply
                </button>
              </div>
            </form>
          </>
        )}
        {replies && (
          <ul className={styles.repliesContainer}>
            {replies.map((reply) => (
              <Reply
                key={reply.id}
                reply={reply}
                feedbackId={feedbackId}
                commentId={comment.id}
                onAddReply={handleAddReply}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
