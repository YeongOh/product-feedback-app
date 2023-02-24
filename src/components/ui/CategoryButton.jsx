import styles from './CategoryButton.module.css';

export default function CategoryButton({
  children,
  selected,
  disableInteraction,
}) {
  const isSelected = selected === children ? styles.selected : '';

  return (
    <button
      className={`${styles.button} ${isSelected} ${
        disableInteraction && styles.disable
      }`}
      type='button'
      name={children}
      tabIndex={disableInteraction && '-1'}
    >
      {children}
    </button>
  );
}
