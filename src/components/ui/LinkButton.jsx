import styles from './LinkButton.module.css';
import { Link } from 'react-router-dom';

export default function LinkButton({ color, to, children, state }) {
  let colorClass;

  switch (color) {
    case 'blue':
      colorClass = styles.blue;
      break;
    case 'dark-blue':
      colorClass = styles.darkBlue;
      break;
    default:
      colorClass = styles.purple;
  }

  return (
    <Link
      className={`${styles.link} ${colorClass}`}
      to={to}
      type='button'
      state={state}
    >
      {children}
    </Link>
  );
}
