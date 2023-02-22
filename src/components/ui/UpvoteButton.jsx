import styles from './UpvoteButton.module.css';
import { ReactComponent as ArrowUp } from '../../assets/shared/icon-arrow-up.svg';
import { likeFeedback, unlikeFeedback } from '../../api/firebase';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';

export default function UpvoteButton({
  feedbackId,
  likedUsers,
  upvotes: upvotesProp,
}) {
  const { uid } = useAuthContext();
  const [isLiked, setIsLiked] = useState(likedUsers && likedUsers[uid]);
  const [upvotes, setUpvotes] = useState(upvotesProp);

  const likedClassName = isLiked ? styles.liked : '';

  const handleClick = async () => {
    if (!isLiked) {
      const response = await likeFeedback(feedbackId, uid, upvotes);
      setIsLiked(response);
      setUpvotes((prev) => prev + 1);
      return;
    }
    const response = await unlikeFeedback(feedbackId, uid, upvotes);
    setIsLiked(response);
    setUpvotes((prev) => prev - 1);
  };

  return (
    <button
      className={`${styles.button} ${likedClassName}`}
      type='button'
      onClick={handleClick}
    >
      <ArrowUp className={`${styles.arrowUp} ${likedClassName}`} /> {upvotes}
    </button>
  );
}
