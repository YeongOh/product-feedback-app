import { useState } from 'react';
import { replyReply } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import styles from './Reply.module.css';
import UserProfile from './ui/UserProfile';

export default function Reply({ reply, feedbackId, commentId, onAddReply }) {
  const { currentUser } = useAuthContext();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newReply = await replyReply(
      feedbackId,
      commentId,
      currentUser,
      replyText,
      reply.user.username
    );
    onAddReply(newReply);
    setIsReplying(false);
    setReplyText('');
    return;
  };

  console.log(reply.id);

  return (
    <li key={reply.id} className={styles.reply}>
      <div className={styles.header}>
        <UserProfile user={reply.user} />
        <button
          className={styles.button}
          type='button'
          onClick={() => setIsReplying((prev) => !prev)}
        >
          Reply
        </button>
      </div>
      <p className={styles.content}>
        <span className={styles.replyingTo}>@{reply.replyingTo}</span>
        {reply.content}
      </p>
      {isReplying && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            className={styles.textarea}
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            required
            maxLength='250'
          />
          <button
            className={`${styles.submitButton} ${styles.submitReply}`}
            type='submit'
          >
            Post Reply
          </button>
        </form>
      )}
    </li>
  );
}
