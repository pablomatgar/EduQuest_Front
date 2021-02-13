import firebase from "firebase/app";
import "firebase/auth";
import "@firebase/firestore";

// Firebase Config
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // OPTIONAL
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export const db = firebase.firestore();
export default app;
