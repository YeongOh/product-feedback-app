import styles from './BackButton.module.css';
import { ReactComponent as ArrowLeft } from '../../assets/shared/icon-arrow-left.svg';
import { Link, useNavigate } from 'react-router-dom';

export default function BackButton({ colorWhite }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Link className={styles.link} type='button' onClick={handleClick}>
      <ArrowLeft className={`${colorWhite && styles.whiteArrowLeft}`} />
      <span className={`${styles.span} ${colorWhite && styles.white}`}>
        Go Back
      </span>
    </Link>
  );
}
