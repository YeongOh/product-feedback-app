import { initializeApp } from 'firebase/app';
import {
  get,
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  //   authDomain: "PROJECT_ID.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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
