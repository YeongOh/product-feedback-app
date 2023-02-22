import styles from './Index.module.css';
import empty from '../assets/images/illustration-empty.svg';
import Feedback from '../components/Feedback';
import { useLoaderData } from 'react-router-dom';
import { getFeedbacks } from '../api/firebase';
import Navbar from '../components/Navbar';
import Sortbar from '../components/Sortbar';
import { useState } from 'react';
import AddFeedbackButton from '../components/ui/AddFeedbackButton';
import LoginButton from '../components/ui/LoginButton';
import { useAuthContext } from '../context/AuthContext';

export async function loader() {
  const feedbacks = await getFeedbacks();
  return { feedbacks };
}

export default function Index() {
  const { feedbacks } = useLoaderData();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Most Upvotes');
  const { currentUser } = useAuthContext();

  const filteredFeedbacks = filterFeedbacks(feedbacks, filter);
  const sortedFeedbacks = sortFeedbacks(filteredFeedbacks, sort);

  return (
    <>
      <Navbar
        onFilterChange={setFilter}
        filter={filter}
        feedbacks={feedbacks}
      />
      <main>
        <Sortbar
          onSortChange={setSort}
          sort={sort}
          totalFeedbacks={filteredFeedbacks?.length}
        />
        <div className={styles.noFeedback}>
          {(!feedbacks || sortedFeedbacks?.length === 0) && (
            <div className={styles.noFeedbackBody}>
              <img src={empty} alt='' />
              <h1 className={styles.noFeedbackTitle}>
                There is no feedback yet.
              </h1>
              <p>
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app. Please add a
                feedback after logging in!
              </p>
              {!currentUser && <LoginButton />}
              {currentUser && <AddFeedbackButton />}
            </div>
          )}
        </div>
        {sortedFeedbacks?.length >= 0 && (
          <ul>
            {sortedFeedbacks.map((feedback) => (
              <Feedback key={feedback.id} feedback={feedback} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

function filterFeedbacks(feedbacks, filter) {
  if (filter === 'All') return feedbacks;

  return feedbacks.filter(
    (feedback) => feedback.category.toLowerCase() === filter.toLowerCase()
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
