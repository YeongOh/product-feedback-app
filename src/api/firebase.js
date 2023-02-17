import { initializeApp } from 'firebase/app';
import {
  get,
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  set,
  update,
  remove,
  push,
  child,
} from 'firebase/database';
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

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
      console.log('signed out');
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
        const comments = Object.values(snapshot.val().comments ?? {});
        return { ...snapshot.val(), comments };
      }
      throw new Error(`feedback id ${id} was not found`);
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

  await set(newFeedbackRef, {
    status: 'in-progress',
    id: newFeedbackRef.key,
    upvotes: 0,
    title,
    category,
    description,
    uid,
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
 * @param {number} postId
 * @param {object} currentUser
 * @param {string} commentText
 */
export async function addComment(postId, currentUser, commentText) {
  // const { name, username, image, uid } = currentUser;

  const commentRef = ref(database, `feedbacks/${postId}/comments/`);
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
