import { useAuthContext } from '../context/AuthContext';
import LinkButton from '../components/ui/LinkButton';
import styles from './Sortbar.module.css';
import { ReactComponent as Plus } from '../assets/shared/icon-plus.svg';
import { ReactComponent as ArrowDown } from '../assets/shared/icon-arrow-down.svg';
import { useState } from 'react';
import DropdownItem from './ui/DropdownItem';
import LoginButton from './ui/LoginButton';

export default function Sortbar({ sort, onSortChange }) {
  const { currentUser, login } = useAuthContext();
  const [openMenu, setOpenMenu] = useState(false);

  const handleClickLogin = () => {
    login();
  };

  return (
    <div className={styles.sortContainer}>
      <div
        className={styles.sortOptionButton}
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        Sort by: <span className={styles.sortOption}>{sort}</span>
        <ArrowDown />
      </div>
      {openMenu && (
        <div
          className={styles.dropdownMenu}
          onClick={(event) => {
            onSortChange(event.target.name);
            setOpenMenu(false);
          }}
        >
          <DropdownItem selected={sort}>Most Upvotes</DropdownItem>
          <DropdownItem selected={sort}>Least Upvotes</DropdownItem>
          <DropdownItem selected={sort}>Most Comments</DropdownItem>
          <DropdownItem selected={sort}>Least Comments</DropdownItem>
        </div>
      )}
      {currentUser && (
        <LinkButton to='/feedbacks/add'>
          <Plus></Plus> Add Feedback
        </LinkButton>
      )}
      {!currentUser && <LoginButton />}
    </div>
  );
}
