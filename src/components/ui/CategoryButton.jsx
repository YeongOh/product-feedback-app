import { Link } from 'react-router-dom';
import styles from './CategoryButton.module.css';

export default function CategoryButton({ children }) {
  return (
    <Link className={styles.link} type='button'>
      {children}
    </Link>
  );
}
