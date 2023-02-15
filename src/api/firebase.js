import { initializeApp } from 'firebase/app';
import {
  get,
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
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
 *
 */
export async function addFeedback(title, category, description, user) {}

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
