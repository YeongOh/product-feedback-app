import { useState } from 'react';
import { replyComment } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import styles from './Comment.module.css';
import Reply from './Reply';
import UserProfile from './ui/UserProfile';

export default function Comment({ comment, feedbackId }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { currentUser } = useAuthContext();

  const repliesArray = comment.replies ? Object.values(comment.replies) : [];
  const [replies, setReplies] = useState(repliesArray);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (replyText.trim() === '') return;
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
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              required
              maxLength='250'
            />
            <button className={styles.submitButton} type='submit'>
              Post Reply
            </button>
          </form>
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
