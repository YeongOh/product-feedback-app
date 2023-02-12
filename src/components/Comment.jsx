import styles from './Comment.module.css';
import placeholder from '../assets/user-images/image-elijah.jpg';

export default function Comment({ comment }) {
  return (
    <li key={comment.id} className={styles.comment}>
      <div className={styles.header}>
        <figure className={styles.figure}>
          <img
            className={styles.img}
            src={placeholder}
            alt={`${comment.user.name}'s profile`}
          />
          <figcaption>
            <div className={styles.name}>{comment.user.name}</div>
            <div>@{comment.user.username}</div>
          </figcaption>
        </figure>
        <button className={styles.button} type='button'>
          Reply
        </button>
      </div>
      <p>{comment.content}</p>
      {comment.replies && (
        <ul>
          {comment.replies.map((reply) => {
            return <li key={reply.content}>{reply.content}</li>;
          })}
        </ul>
      )}
    </li>
  );
}
