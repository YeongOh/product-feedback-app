import styles from './AddFeedbackButton.module.css';
import { ReactComponent as Plus } from '../../assets/shared/icon-plus.svg';
import { Link } from 'react-router-dom';

export default function AddFeedbackButton() {
  return (
    <Link className={styles.link} to='/feedbacks/add'>
      <Plus></Plus> Add Feedback
    </Link>
  );
}
