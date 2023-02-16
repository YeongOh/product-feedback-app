import styles from './Comment.module.css';
import placeholder from '../assets/user-images/image-elijah.jpg';

export default function Comment({ comment }) {
  return (
    <li key={comment.id} className={styles.comment}>
      <div className={styles.header}>
        <figure className={styles.figure}>
          <img
            className={styles.img}
            src={comment.user.image}
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
      <p className={styles.content}>{comment.content}</p>
      {comment.replies && (
        <ul className={styles.repliesContainer}>
          {comment.replies.map((reply) => {
            return (
              <li key={reply.content} className={styles.reply}>
                <div className={styles.header}>
                  <figure className={styles.figure}>
                    <img
                      className={styles.img}
                      src={placeholder}
                      alt={`${reply.user.name}'s profile`}
                    />
                    <figcaption>
                      <div className={styles.name}>{reply.user.name}</div>
                      <div>@{reply.user.username}</div>
                    </figcaption>
                  </figure>
                  <button className={styles.button} type='button'>
                    Reply
                  </button>
                </div>
                <p className={styles.content}>
                  <span className={styles.replyingTo}>@{reply.replyingTo}</span>
                  {reply.content}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
