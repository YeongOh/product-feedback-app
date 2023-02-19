import styles from './UserProfile.module.css';

export default function UserProfile({ user }) {
  return (
    <figure className={styles.figure}>
      <img
        className={styles.img}
        src={user.image}
        alt={`${user.name}'s profile`}
        referrerPolicy='no-referrer'
      />
      <figcaption>
        <div className={styles.name}>{user.name}</div>
        <div>@{user.username}</div>
      </figcaption>
    </figure>
  );
}
