import styles from './Button.module.css';
import { Link } from 'react-router-dom';

export default function Button({ color, children }) {
  let colorClass;

  switch (color) {
    case 'blue':
      colorClass = styles.blue;
      break;
    default:
      colorClass = styles.default;
  }

  return (
    <Link className={`${styles.link} ${colorClass}`} type='button'>
      {children}
    </Link>
  );
}
