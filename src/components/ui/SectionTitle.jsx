import styles from './SectionTitle.module.css';

export default function SectionTitle({ children }) {
  return <div className={styles.div}>{children}</div>;
}
