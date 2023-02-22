import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './RoadmapNav.module.css';
import StatusTag from './ui/StatusTag';

export default function RoadmapNav({ feedbacks }) {
  const plannedLength = useMemo(
    () => filterFeedbacks(feedbacks, 'planned').length,
    [feedbacks]
  );
  const inProgressLength = useMemo(
    () => filterFeedbacks(feedbacks, 'in-progress').length,
    [feedbacks]
  );
  const liveLength = useMemo(
    () => filterFeedbacks(feedbacks, 'live').length,
    [feedbacks]
  );

  return (
    <div className={styles.roadmapContainer}>
      <div className={styles.roadmapTitleSection}>
        <span className={styles.roadmapTitle}>Roadmap</span>
        <Link to='/roadmap' className={styles.roadmapLink}>
          View
        </Link>
      </div>
      <ul className={styles.roadmapList}>
        <li>
          <StatusTag status='planned' />
          <div>{plannedLength}</div>
        </li>
        <li>
          <StatusTag status='in-progress' />
          <div>{inProgressLength}</div>
        </li>
        <li>
          <StatusTag status='live' />
          <div>{liveLength}</div>
        </li>
      </ul>
    </div>
  );
}

function filterFeedbacks(feedbacks, filter) {
  return feedbacks.filter(
    (feedback) => feedback.status.toLowerCase() === filter.toLowerCase()
  );
}
