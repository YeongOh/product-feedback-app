import { useAuthContext } from '../context/AuthContext';
import LinkButton from '../components/ui/LinkButton';
import styles from './Sortbar.module.css';
import { ReactComponent as Plus } from '../assets/shared/icon-plus.svg';
import { ReactComponent as ArrowDown } from '../assets/shared/icon-arrow-down.svg';
import { useState } from 'react';
import { ReactComponent as Suggestion } from '../assets/shared/icon-suggestions.svg';
import DropdownItem from './ui/DropdownItem';
import LoginButton from './ui/LoginButton';
import { useMediaQuery } from '@react-hook/media-query';
import { logout } from '../api/firebase';

export default function Sortbar({ sort, onSortChange, totalFeedbacks }) {
  const { currentUser } = useAuthContext();
  const [openMenu, setOpenMenu] = useState(false);
  const nonMobile = useMediaQuery('only screen and (min-width: 700px)');

  return (
    <div className={styles.sortContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.totalFeedback}>
          <Suggestion /> {totalFeedbacks} Suggestions
        </div>
        <div
          className={styles.sortOption}
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          Sort by: <span className={styles.sortOptionSpan}>{sort}</span>
          <ArrowDown className={styles.arrowDown} />
          {openMenu && (
            <div
              className={styles.dropdownMenu}
              onClick={(event) => {
                onSortChange(event.target.name);
              }}
            >
              <DropdownItem selected={sort}>Most Upvotes</DropdownItem>
              <DropdownItem selected={sort}>Least Upvotes</DropdownItem>
              <DropdownItem selected={sort}>Most Comments</DropdownItem>
              <DropdownItem selected={sort}>Least Comments</DropdownItem>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        {currentUser && (
          <LinkButton to='/feedbacks/add'>
            <Plus></Plus> Add Feedback
          </LinkButton>
        )}
        {currentUser && nonMobile && (
          <button
            className={styles.logoutButton}
            type='button'
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
      {!currentUser && <LoginButton />}
    </div>
  );
}
