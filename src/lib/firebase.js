// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-99fCuFZhc-0en5VgU4OBpP3TFXVkfeE",
  authDomain: "rts-lms.firebaseapp.com",
  projectId: "rts-lms",
  storageBucket: "rts-lms.firebasestorage.app",
    // storageBucket: "rts-lms.appspot.com",
  messagingSenderId: "704888712109",
  appId: "1:704888712109:web:fa35dff4f43c5afc1dcf24",
  measurementId: "G-17KMPSRL0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db ,storage ,app};
