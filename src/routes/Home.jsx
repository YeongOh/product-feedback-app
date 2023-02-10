import styles from './Home.module.css';
import hamburger from '../assets/shared/mobile/icon-hamburger.svg';
import close from '../assets/shared/mobile/icon-close.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const activeClassName = isMenuActive ? styles.active : '';
  const menuImgSrc = isMenuActive ? close : hamburger;

  return (
    <>
      <header className={styles.header}>
        <Link to='/' className={styles.link} title='move to Home'>
          <div className={styles.title}>Frontend Mentor</div>
          <div className={styles.location}>Feedback Board</div>
        </Link>
        <div
          className={styles.menuButton}
          aria-label='menu'
          role='button'
          onClick={() => setIsMenuActive((prev) => !prev)}
        >
          <img src={menuImgSrc} />
        </div>
      </header>
      <div
        className={`${styles.sidebarOverlay} ${activeClassName}`}
        onClick={() => setIsMenuActive(false)}
      ></div>
      <div className={`${styles.sidebarMenu} ${activeClassName}`}>
        <div className={styles.categoryContainer}>
          <button className={styles.category}>All</button>
          <button className={styles.category}>UI</button>
          <button className={styles.category}>UX</button>
          <button className={styles.category}>Enhancement</button>
          <button className={styles.category}>Bug</button>
          <button className={styles.category}>Feature</button>
        </div>
        <div className={styles.roadmapContainer}>
          <div className={styles.roadmapTitleSection}>
            <span className={styles.roadmapTitle}>Roadmap</span>
            <a className={styles.roadmapLink}>View</a>
          </div>
          <ul className={styles.roadmapList}>
            <li>Planned 2 </li> <li>In-Progress 3</li> <li>Live 1</li>
          </ul>
        </div>
      </div>
      <div className='sort'>
        Suggestions Sort by: Most upvotes Least upvotes Most comments Least
        comments
      </div>
      <main className='no-feedback'>
        Add Feedback There is no feedback yet. Got a suggestion? Found a bug
        that needs to be squashed? We love hearing about new ideas to improve
        our app. Add Feedback
      </main>
    </>
  );
}
