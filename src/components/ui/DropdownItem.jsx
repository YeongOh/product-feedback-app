import styles from './DropdownItem.module.css';
import { ReactComponent as CheckIcon } from '../../assets/shared/icon-check.svg';

export default function DropdownItem({ children, selected }) {
  const childrenString = String(children);

  return (
    <button className={styles.button} type='button' name={childrenString}>
      {children} {selected === childrenString ? <CheckIcon /> : ''}
    </button>
  );
}
