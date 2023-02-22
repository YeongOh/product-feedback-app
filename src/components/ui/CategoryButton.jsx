import styles from './CategoryButton.module.css';

export default function CategoryButton({ children, selected }) {
  const isSelected = selected === children ? styles.selected : '';

  return (
    <button
      className={`${styles.button} ${isSelected}`}
      type='button'
      name={children}
    >
      {children}
    </button>
  );
}
