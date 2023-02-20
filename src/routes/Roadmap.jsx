import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Feedback from '../components/feedback';
import AddFeedbackButton from '../components/ui/AddFeedbackButton';
import BackButton from '../components/ui/BackButton';
import LinkButton from '../components/ui/LinkButton';
import LoginButton from '../components/ui/LoginButton';
import { useAuthContext } from '../context/AuthContext';
import styles from './Roadmap.module.css';

export default function Roadmap() {
  const { currentUser } = useAuthContext();
  const { feedbacks } = useLoaderData();
  // only in mobile
  const [filter, setFilter] = useState('planned');

  const filteredFeedbacks = filterFeedbacks(feedbacks, filter);

  const plannedLength = filterFeedbacks(feedbacks, 'planned').length;
  const inProgressLength = filterFeedbacks(feedbacks, 'in-progress').length;
  const liveLength = filterFeedbacks(feedbacks, 'live').length;

  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <BackButton />
          <div>Roadmap</div>
        </div>
        {currentUser && <AddFeedbackButton />}
        {!currentUser && <LoginButton />}
      </nav>
      <main>
        <div
          className={styles.filterBar}
          onClick={(event) => setFilter(event.target.name)}
        >
          <button
            name='planned'
            className={`${styles.filter} ${
              filter === 'planned' && styles.planned
            }`}
            type='button'
          >
            Planned ({plannedLength})
          </button>
          <button
            name='in-progress'
            className={`${styles.filter} ${
              filter === 'in-progress' && styles.progress
            }`}
            type='button'
          >
            In-Progress ({inProgressLength})
          </button>
          <button
            name='live'
            className={`${styles.filter} ${filter === 'live' && styles.live}`}
            type='button'
          >
            Live ({liveLength})
          </button>
        </div>
        {filter === 'planned' && (
          <section className={styles.section}>
            <div>Planned ({plannedLength})</div>
            <p>Ideas prioritized for research</p>
            <ul>
              {filteredFeedbacks.map((feedback) => (
                <Feedback key={feedback.id} feedback={feedback} />
              ))}
            </ul>
          </section>
        )}
        {filter === 'in-progress' && (
          <section className={styles.section}>
            <div>In-Progress ({inProgressLength})</div>
            <p>Currently being developed</p>
            <ul>
              {filteredFeedbacks.map((feedback) => (
                <Feedback key={feedback.id} feedback={feedback} />
              ))}
            </ul>
          </section>
        )}

        {filter === 'live' && (
          <section className={styles.section}>
            <div>live ({inProgressLength})</div>
            <p>Released features</p>
            <ul>
              {filteredFeedbacks.map((feedback) => (
                <Feedback key={feedback.id} feedback={feedback} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}

function filterFeedbacks(feedbacks, filter) {
  return feedbacks.filter(
    (feedback) => feedback.status.toLowerCase() === filter.toLowerCase()
  );
}
