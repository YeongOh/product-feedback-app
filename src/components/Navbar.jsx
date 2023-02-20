import { useState } from 'react';

import CategoryButton from '../components/ui/CategoryButton';
import styles from './Navbar.module.css';
import hamburger from '../assets/shared/mobile/icon-hamburger.svg';
import close from '../assets/shared/mobile/icon-close.svg';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import LoginButton from './ui/LoginButton';

export default function Navbar({ filter, onFilterChange }) {
  const { currentUser, logout } = useAuthContext();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const activeClassName = isSidebarActive ? styles.active : '';
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
    <header>
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
          <img src={menuImgSrc} />
        </div>
      </div>
      <div
        className={`${styles.sidebarOverlay} ${activeClassName}`}
        onClick={() => setIsSidebarActive(false)}
      ></div>
      <div className={`${styles.sidebarMenu} ${activeClassName}`}>
        {!currentUser && <LoginButton />}
        <nav>
          <ul
            className={styles.categoryContainer}
            onClick={(event) => {
              if (event.target.tagName.toLowerCase() === 'button') {
                onFilterChange(event.target.name);
                setIsSidebarActive(false);
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
        <div className={styles.roadmapContainer}>
          <div className={styles.roadmapTitleSection}>
            <span className={styles.roadmapTitle}>Roadmap</span>
            <Link to='/roadmap' className={styles.roadmapLink}>
              View
            </Link>
          </div>
          <ul className={styles.roadmapList}>
            <li>Planned 2 </li> <li>In-Progress 3</li> <li>Live 1</li>
          </ul>
        </div>
        {currentUser && (
          <button onClick={handleClickLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
