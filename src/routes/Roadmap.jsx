import { useMediaQuery } from '@react-hook/media-query';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import RoadmapFeedback from '../components/RoadmapFeedback';
import AddFeedbackButton from '../components/ui/AddFeedbackButton';
import BackButton from '../components/ui/BackButton';
import LoginButton from '../components/ui/LoginButton';
import { useAuthContext } from '../context/AuthContext';
import styles from './Roadmap.module.css';

export default function Roadmap() {
  const { currentUser } = useAuthContext();
  const { feedbacks } = useLoaderData();
  // only in mobile
  const [filter, setFilter] = useState('planned');
  const tabletScreen = useMediaQuery('only screen and (min-width: 768px)');

  const plannedFeedbacks = filterFeedbacks(feedbacks, 'planned');
  const inProgressFeedbacks = filterFeedbacks(feedbacks, 'in-progress');
  const liveFeedbacks = filterFeedbacks(feedbacks, 'live');

  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <BackButton colorWhite />
          <div className={styles.title}>Roadmap</div>
        </div>
        {currentUser && <AddFeedbackButton />}
        {!currentUser && <LoginButton />}
      </nav>
      <main className={styles.main}>
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
            Planned ({plannedFeedbacks?.length})
          </button>
          <button
            name='in-progress'
            className={`${styles.filter} ${
              filter === 'in-progress' && styles.progress
            }`}
            type='button'
          >
            In-Progress ({inProgressFeedbacks?.length})
          </button>
          <button
            name='live'
            className={`${styles.filter} ${filter === 'live' && styles.live}`}
            type='button'
          >
            Live ({liveFeedbacks?.length})
          </button>
        </div>
        <div className={styles.allSections}>
          {(filter === 'planned' || tabletScreen) && (
            <section className={styles.section}>
              <div className={styles.desc}>
                <div className={styles.status}>
                  Planned ({plannedFeedbacks?.length})
                </div>
                <p className={styles.p}>Ideas prioritized for research</p>
              </div>
              <ul>
                {plannedFeedbacks.map((feedback) => (
                  <RoadmapFeedback key={feedback.id} feedback={feedback} />
                ))}
              </ul>
            </section>
          )}
          {(filter === 'in-progress' || tabletScreen) && (
            <section className={styles.section}>
              <div className={styles.desc}>
                <div className={styles.status}>
                  In-Progress ({inProgressFeedbacks?.length})
                </div>
                <p className={styles.p}>Currently being developed</p>
              </div>
              <ul>
                {inProgressFeedbacks.map((feedback) => (
                  <RoadmapFeedback key={feedback.id} feedback={feedback} />
                ))}
              </ul>
            </section>
          )}
          {(filter === 'live' || tabletScreen) && (
            <section className={styles.section}>
              <div className={styles.desc}>
                <div className={styles.status}>
                  live ({liveFeedbacks?.length})
                </div>
                <p className={styles.p}>Released features</p>
              </div>
              <ul>
                {liveFeedbacks.map((feedback) => (
                  <RoadmapFeedback key={feedback.id} feedback={feedback} />
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function filterFeedbacks(feedbacks, filter) {
  return feedbacks.filter(
    (feedback) => feedback.status.toLowerCase() === filter.toLowerCase()
  );
}
