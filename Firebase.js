// Import the functions you need from the SDKs you need
import { getApp, initializeApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa4IXOv5gypf0ENYNWtQGIbOSvnoN7GvU",
  authDomain: "twitter-clone-63b5c.firebaseapp.com",
  projectId: "twitter-clone-63b5c",
  storageBucket: "twitter-clone-63b5c.appspot.com",
  messagingSenderId: "392827847370",
  appId: "1:392827847370:web:52aa64aa3596d360a32a33"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
const storage = getStorage(app);
export default app;
export {db,storage};