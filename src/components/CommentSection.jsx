import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Feedback from '../components/feedback';
import Body from '../components/ui/Body';
import Comment from '../components/Comment';
import { addComment } from '../api/firebase';
import styles from './CommentSection.module.css';

export default function CommentSection({ feedback }) {
  const { currentUser } = useAuthContext();
  const [commentText, setCommentText] = useState('');
  //   const commentsArray = feedback.comments
  //     ? Object.values(feedback.comments)
  //     : [];
  const [comments, setComments] = useState(feedback.comments);

  const handleClick = async (event) => {
    event.preventDefault();
    if (!currentUser) return;
    if (!commentText.trim()) {
      console.log('empty');
      return;
    }

    const newComment = await addComment(feedback.id, currentUser, commentText);
    setComments([...comments, newComment]);
    setCommentText('');
    return;
  };

  return (
    <>
      <Body>
        {comments?.length > 0 ? (
          <>
            <div className={styles.commentLength}>
              {comments.length} Comments
            </div>
            <ul className={styles.comments}>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  feedbackId={feedback.id}
                />
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
            onChange={(event) => setCommentText(event.target.value)}
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
    </>
  );
}
