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
        return Object.values(snapshot.val());
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getFeedback(feedbackId) {
  const id = typeof feedbackId === 'string' ? Number(feedbackId) : feedbackId;
  const feedbackRef = query(
    ref(database, 'feedbacks'),
    orderByChild('id'),
    equalTo(id)
  );
  return get(feedbackRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const result = Object.values(snapshot.val());
        return { ...result[0] };
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
  const numberOfFeedbacks = await get(ref(database, 'feedbacks'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.size;
      }
      return 0;
    })
    .catch((error) => {
      console.error(error);
    });

  // project requirement for id
  const id = numberOfFeedbacks + 1;

  await set(ref(database, `feedbacks/${id}`), {
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
  await update(ref(database, `feedbacks/${id}`), {
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
  const { name, username, image, uid } = currentUser;
  const user = { name, username, image, uid };
  const id = uuidv4();
  update(ref(database, `feedbacks/${postId}/comments/${id}`), {
    content: commentText,
    id,
    user,
  });
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
