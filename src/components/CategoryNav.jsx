import styles from './CategoryNav.module.css';
import CategoryButton from './ui/CategoryButton';

export default function CategoryNav({ filter, onFilterChange }) {
  return (
    <nav>
      <ul
        className={styles.categoryContainer}
        onClick={(event) => {
          if (event.target.tagName.toLowerCase() === 'button') {
            onFilterChange(event.target.name);
          }
        }}
      >
        <li>
          <CategoryButton selected={filter}>All</CategoryButton>
        </li>
        <li>
          <CategoryButton selected={filter}>UI</CategoryButton>
        </li>
        <li>
          <CategoryButton selected={filter}>UX</CategoryButton>
        </li>
        <li>
          <CategoryButton selected={filter}>Enhancement</CategoryButton>
        </li>
        <li>
          <CategoryButton selected={filter}>Bug</CategoryButton>
        </li>
        <li>
          <CategoryButton selected={filter}>Feature</CategoryButton>
        </li>
      </ul>
    </nav>
  );
}
