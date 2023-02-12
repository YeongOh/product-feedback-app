import styles from './CategoryButton.module.css';

export default function CategoryButton({ children }) {
  return (
    <button className={styles.button} type='button'>
      {children}
    </button>
  );
}
