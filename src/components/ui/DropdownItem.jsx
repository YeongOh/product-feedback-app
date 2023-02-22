import styles from './DropdownItem.module.css';
import { ReactComponent as CheckIcon } from '../../assets/shared/icon-check.svg';

export default function DropdownItem({ children, selected }) {
  return (
    <button className={styles.button} type='button' name={children}>
      {children} {selected === children ? <CheckIcon /> : ''}
    </button>
  );
}
