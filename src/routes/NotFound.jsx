import Navbar from '../components/Navbar';
import LinkButton from '../components/ui/LinkButton';
import styles from './NotFound.module.css';
import empty from '../assets/images/illustration-empty.svg';
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
      <main>
        <Helmet>
          <title>Not Found | Product Feedback App</title>
        </Helmet>
        <div className={styles.error}>
          <div className={styles.errorBody}>
            <img src={empty} alt='' />
            <h1 className={styles.errorTitle}>Unexpected error occured!</h1>
            <p>We are sorry for your inconvenience.</p>
            <LinkButton to='/'>Navigate to Home</LinkButton>
          </div>
        </div>
      </main>
    </>
  );
}
