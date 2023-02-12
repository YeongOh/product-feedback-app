import styles from './Home.module.css';
// icons
import hamburger from '../assets/shared/mobile/icon-hamburger.svg';
import close from '../assets/shared/mobile/icon-close.svg';
import arrowDown from '../assets/shared/icon-arrow-down.svg';
import plus from '../assets/shared/icon-plus.svg';
import empty from '../assets/images/illustration-empty.svg';
// components
import Feedback from '../components/Feedback';
import CategoryButton from '../components/ui/CategoryButton';
// hooks
import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { getFeedbacks } from '../api/firebase';

export async function loader() {
  const feedbacks = await getFeedbacks();
  return { feedbacks };
}

export default function Home() {
  const { feedbacks } = useLoaderData();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const activeClassName = isMenuActive ? styles.active : '';
  const menuImgSrc = isMenuActive ? close : hamburger;

  if (isMenuActive) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  return (
    <>
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
            onClick={() => setIsMenuActive((prev) => !prev)}
          >
            <img src={menuImgSrc} />
          </div>
        </div>
        <div
          className={`${styles.sidebarOverlay} ${activeClassName}`}
          onClick={() => setIsMenuActive(false)}
        ></div>
        <div className={`${styles.sidebarMenu} ${activeClassName}`}>
          <nav>
            <ul className={styles.categoryContainer}>
              <li>
                <CategoryButton>All</CategoryButton>
              </li>
              <li>
                <CategoryButton>UI</CategoryButton>
              </li>
              <li>
                <CategoryButton>UX</CategoryButton>
              </li>
              <li>
                <CategoryButton>Enhancement</CategoryButton>
              </li>
              <li>
                <CategoryButton>Bug</CategoryButton>
              </li>
              <li>
                <CategoryButton>Feature</CategoryButton>
              </li>
            </ul>
          </nav>
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
      </header>
      <div className={styles.sortContainer}>
        <div>
          Sort by: <span className={styles.sortOption}>Most Upvotes</span>
          {/* Least upvotes Most comments Least
        comments */}{' '}
          <img src={arrowDown} alt='' />
        </div>
        <button className={styles.feedbackBtn}>
          <img src={plus} alt='' />
          Add Feedback
        </button>
      </div>
      <main className={styles.main}>
        {(feedbacks?.length === 0 || !feedbacks) && (
          <div className={styles.noFeedback}>
            <img src={empty} alt='' />
            <h1 className={styles.noFeedbackTitle}>
              There is no feedback yet.
            </h1>
            <p>
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </p>
            <button className={styles.feedbackBtn}>Add Feedback</button>
          </div>
        )}
        {feedbacks?.length >= 0 && (
          <ul>
            {feedbacks.map((feedback) => (
              <Feedback key={feedback.id} feedback={feedback} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
