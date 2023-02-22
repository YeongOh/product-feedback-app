import styles from './StatusTag.module.css';

export default function StatusTag({ status }) {
  let statusText = status;
  let statusClass = '';

  if (status === 'in-progress') {
    statusText = 'in progress';
    statusClass = styles.inProgress;
  }
  if (status === 'planned') statusClass = styles.planned;
  if (status === 'live') statusClass = styles.live;

  return (
    <div className={styles.div}>
      <span className={`${styles.span} ${statusClass}`}> &#9679; </span>{' '}
      {statusText}
    </div>
  );
}
