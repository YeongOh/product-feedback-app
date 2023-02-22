import { initializeApp } from 'firebase/app';
import {
  get,
  getDatabase,
  ref,
  set,
  update,
  remove,
  push,
} from 'firebase/database';
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      console.log([errorCode, errorMessage, email, credential]);
    });
}

export function logout() {
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
}

export async function onUserStateChanged(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback();
    }
  });
}

export async function getFeedbacks() {
  return get(ref(database, 'feedbacks'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const feedbacks = Object.values(snapshot.val());
        return feedbacks.map((feedback) => {
          if (feedback.comments && !Array.isArray(feedback.comments)) {
            return { ...feedback, comments: Object.values(feedback.comments) };
          }
          return feedback;
        });
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getFeedback(feedbackId) {
  return get(ref(database, `feedbacks/${feedbackId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // const comments = Object.values(snapshot.val().comments ?? {});
        return snapshot.val();
      }
      throw new Error(`feedback ${id} was not found`);
    })
    .catch((error) => {
      console.error(error);
    });
}

/**
 * Adds a feedback by sending it to firebase
 *
 * @param {string} title
 * @param {string} category
 * @param {string} description
 * @param {string} user - currentUser from AuthContext
 * @return {string} id - newly created feedback's id
 */
export async function addFeedback(title, category, description, user) {
  const { uid } = user;
  const feedbackRef = ref(database, `feedbacks/`);
  const newFeedbackRef = push(feedbackRef);
  const id = newFeedbackRef.key;

  await set(newFeedbackRef, {
    status: 'in-progress',
    upvotes: 0,
    title,
    category,
    description,
    uid,
    id,
  });

  return id;
}

/**
 * Edit a feedback

 * @param {number} id
 * @param {string} title
 * @param {string} category
 * @param {string} description
 * @param {string} status
 * @return {string} id - edited feedback's id
 */
export async function editFeedback(id, title, category, description, status) {
  update(ref(database, `feedbacks/${id}`), {
    status,
    title,
    category,
    description,
  });
  return id;
}

/**
 * Delete a feedback
 * @param {number} id
 */
export async function deleteFeedback(id) {
  remove(ref(database, `feedbacks/${id}`));
}

/**
 * Add a comment
 *
 * @param {number} feedbackId
 * @param {object} currentUser
 * @param {string} commentText
 */
export async function addComment(feedbackId, currentUser, commentText) {
  const commentRef = ref(database, `feedbacks/${feedbackId}/comments/`);
  const newCommentRef = push(commentRef);

  const newComment = {
    content: commentText,
    id: newCommentRef.key,
    user: currentUser,
  };
  // console.log(newCommentRef);
  await set(newCommentRef, newComment);
  return newComment;
}

/**
 * Reply to a comment
 *
 * @param {number} feedbackId
 * @param {object} comment
 * @param {object} currentUser
 * @param {string} replyText
 */
export async function replyComment(
  feedbackId,
  comment,
  currentUser,
  replyText
) {
  const replyRef = ref(
    database,
    `feedbacks/${feedbackId}/comments/${comment.id}/replies`
  );
  const newReplyRef = push(replyRef);

  const newReply = {
    content: replyText,
    replyingTo: comment.user.username,
    id: newReplyRef.key,
    user: currentUser,
  };
  await set(newReplyRef, newReply);
  return newReply;
}

/**
 * Reply to a reply
 *
 * @param {number} feedbackId
 * @param {number} commentId
 * @param {object} currentUser
 * @param {string} replyText
 * @param {string} toUsername - reply.user.username
 */
export async function replyReply(
  feedbackId,
  commentId,
  currentUser,
  replyText,
  toUsername
) {
  const replyRef = ref(
    database,
    `feedbacks/${feedbackId}/comments/${commentId}/replies`
  );
  const newReplyRef = push(replyRef);

  const newReply = {
    content: replyText,
    replyingTo: toUsername,
    id: newReplyRef.key,
    user: currentUser,
  };
  await set(newReplyRef, newReply);
  return newReply;
}

export async function likeFeedback(feedbackId, uid, numberOfUpvotes) {
  try {
    const feedbackRef = ref(database, `feedbacks/${feedbackId}`);
    const updates = {};
    updates['upvotes'] = numberOfUpvotes + 1;
    updates[`likedUsers/${uid}`] = { status: true };
    await update(feedbackRef, updates);
  } catch (error) {
    console.log(error);
  }
  return true;
}

export async function unlikeFeedback(feedbackId, uid, numberOfUpvotes) {
  try {
    const feedbackRef = ref(database, `feedbacks/${feedbackId}`);
    const updates = {};
    updates['upvotes'] = numberOfUpvotes - 1;
    await Promise.all([
      update(feedbackRef, updates),
      remove(ref(database, `feedbacks/${feedbackId}/likedUsers/${uid}`)),
    ]);
  } catch (error) {
    console.log(error);
  }
  return false;
}

// /**
//  * This is a function.
//  *
//  * @param {string} n - A string param
//  * @param {string} [o] - A optional string param
//  * @param {string} [d=DefaultValue] - A optional string param
//  * @return {string} A good string
//  *
//  * @example
//  *
//  *     foo('hello')
//  */
