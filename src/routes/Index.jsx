import styles from './Index.module.css';
// icons
import empty from '../assets/images/illustration-empty.svg';
// components
import Feedback from '../components/Feedback';

// hooks
import { useLoaderData } from 'react-router-dom';
import { getFeedbacks } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sortbar from '../components/Sortbar';
import { useState } from 'react';

export async function loader() {
  const feedbacks = await getFeedbacks();
  return { feedbacks };
}

export default function Index() {
  const { currentUser } = useAuthContext();
  const { feedbacks } = useLoaderData();
  const [sort, setSort] = useState('Most Upvotes');

  const sortedFeedbacks = sortFeedbacks(feedbacks, sort);

  return (
    <>
      <Navbar />
      <main>
        <Sortbar onSortChange={setSort} sort={sort} />
        <div>
          {(feedbacks?.length === 0 || !feedbacks) && (
            <div className={styles.noFeedback}>
              <img src={empty} alt='' />
              <h1 className={styles.noFeedbackTitle}>
                There is no feedback yet.
              </h1>
              <p>
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </p>
              <button className={styles.feedbackBtn}>Add Feedback</button>
            </div>
          )}
          {feedbacks?.length >= 0 && (
            <ul>
              {sortedFeedbacks.map((feedback) => (
                <Feedback key={feedback.id} feedback={feedback} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

function sortFeedbacks(feedbacks, sort) {
  if (sort === 'Most Upvotes')
    return [...feedbacks].sort((a, b) => b.upvotes - a.upvotes);
  if (sort === 'Least Upvotes')
    return [...feedbacks].sort((a, b) => a.upvotes - b.upvotes);
  if (sort === 'Most Comments')
    return [...feedbacks].sort((a, b) => {
      if (!b.comments) return -1;
      return b.comments?.length - a.comments?.length;
    });
  if (sort === 'Least Comments')
    return [...feedbacks].sort((a, b) => {
      if (!a.comments) return -1;
      return a.comments?.length - b.comments?.length;
    });
}
