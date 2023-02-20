import styles from './LoginButton.module.css';
import { ReactComponent as Google } from '../../assets/shared/icon-google.svg';
import { useAuthContext } from '../../context/AuthContext';

export default function LoginButton() {
  const { login } = useAuthContext();

  return (
    <button className={styles.button} onClick={login} type='button'>
      <Google /> Login
    </button>
  );
}
