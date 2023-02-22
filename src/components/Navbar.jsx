import { useState } from 'react';

import styles from './Navbar.module.css';
import hamburger from '../assets/shared/mobile/icon-hamburger.svg';
import close from '../assets/shared/mobile/icon-close.svg';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import LoginButton from './ui/LoginButton';
import CategoryNav from './CategoryNav';
import RoadmapNav from './RoadmapNav';

export default function Navbar({ filter, onFilterChange, feedbacks }) {
  const { currentUser, logout } = useAuthContext();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const activeClassName = isSidebarActive && styles.active;
  const menuImgSrc = isSidebarActive ? close : hamburger;

  if (isSidebarActive) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  const handleClickLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.banner}>
        <Link to='/' className={styles.link} title='move to Home'>
          <div className={styles.title}>Frontend Mentor</div>
          <div className={styles.location}>Feedback Board</div>
        </Link>
        <div
          className={styles.menuButton}
          aria-label='menu'
          role='button'
          onClick={() => setIsSidebarActive((prev) => !prev)}
        >
          <img src={menuImgSrc} alt='' />
        </div>
      </div>
      <div className={styles.nonMobile}>
        <CategoryNav filter={filter} onFilterChange={onFilterChange} />
      </div>
      <div className={styles.nonMobile}>
        <RoadmapNav feedbacks={feedbacks} />
      </div>

      <div
        className={`${styles.sidebarOverlay} ${activeClassName}`}
        onClick={() => setIsSidebarActive(false)}
      ></div>
      <div className={`${styles.sidebarMenu} ${activeClassName}`}>
        {!currentUser && <LoginButton />}
        <CategoryNav filter={filter} onFilterChange={onFilterChange} />
        <RoadmapNav feedbacks={feedbacks} />
        {currentUser && (
          <button onClick={handleClickLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
